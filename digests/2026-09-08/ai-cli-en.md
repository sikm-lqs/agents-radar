# AI CLI Tools Community Digest 2026-09-08

> Generated: 2026-09-08 11:30 UTC | Tools covered: 7

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

# AI CLI Tools Cross-Comparison Report — 2026-09-08

## 1. Ecosystem Overview

The AI CLI space has consolidated into three tiers: vendor-flagship CLIs (Claude Code, Codex, Gemini CLI) with massive user bases and broad product matrices; ecosystem-anchored tools (Copilot CLI, Qwen Code) leveraging GitHub and Chinese-market integrations respectively; and smaller, fast-moving challengers (OpenCode, Pi) competing on provider neutrality and extensibility. All seven communities are converging on the same hard problems — persistent memory, multi-agent orchestration reliability, context compaction, and Windows parity — while differentiating on surface strategy (TUI vs. desktop vs. daemon/web). Notably, issue velocity now substantially exceeds fix velocity at the largest vendors, with stale-bot auto-closures becoming a visible friction point. Meanwhile, a third-party ecosystem of session-audit and context-routing tools is forming around these agents, signaling maturation of the category.

## 2. Activity Comparison

| Tool | Issues (surfaced) | PRs (surfaced) | Discussions (surfaced) | Release (last 24h) |
|---|---|---|---|---|
| **Claude Code** | 50 (top 30 shown) | 1 (closed) | N/A — no data in pull | None |
| **OpenAI Codex** | 14 | 17 | 12 (4 Ideas, 3 Q&A, 5 Show & Tell) | `rust-v0.154.0-alpha.6` (pre-release) |
| **Gemini CLI** | 10 | 14 | n/r | `v0.60.0-nightly.20260908` |
| **Copilot CLI** | 10 | 3 | n/r | None |
| **OpenCode** | 10 | 12 | n/r | None |
| **Pi** | 15 | 15 | 2 (1 Show & Tell, 1 Idea) | None |
| **Qwen Code** | 10 | 11 | n/r | `v0.23.0-nightly.20260907` |

> *Counts reflect items surfaced in each digest, not absolute repo totals. "n/r" = channel not reported in the digest; none of the seven repos have Issues/PRs disabled upstream. Claude Code's digest explicitly omitted Discussions data.*

**Key reads:** Codex shows the strongest engineering throughput (17 PRs, including coordinated architecture waves). Gemini CLI and Qwen Code maintain nightly cadence. Copilot CLI is in a quiet landing window (3 PRs, self-noted as unusual). Claude Code shows the highest issue volume but near-zero PR/release activity today.

## 3. Shared Feature Directions

1. **Persistent agent memory** — *Claude Code, Codex, Gemini CLI, Copilot CLI, Pi.* Codex shipped Memory v2 (configurable versions, tiered evidence selection, isolated storage — #43797–#43800); Gemini CLI is maturing Auto Memory (redaction, bounded retries — #26516–#26525); Claude Code users demand configurable `MEMORY.md` thresholds (#91188); Copilot CLI surfaced a cross-repo memory **leakage** bug (#3945); Pi is researching post-compaction decision memory (#9312). The shared needs: explicit scoping, privacy guarantees, and user control.
2. **Compaction & long-session reliability** — *all seven.* Pi's compaction can permanently brick sessions on Anthropic (#8667); Copilot CLI's `/compact` fails after 3 retries (#2861); OpenCode's auto-compaction aborts draining on `invalid_prompt` (#47939); Codex fixed reasoning-effort leakage across compaction (#43796); Claude Code miscomputes context % on 1M windows (#73399); Gemini CLI's `/compress` doesn't survive resume (#21335).
3. **Multi-agent orchestration & observability** — *Claude Code, Codex, Gemini CLI, OpenCode, Qwen Code.* Recurring pattern: **silent success masking real failure** — Gemini CLI reports `GOAL`/`success` on MAX_TURNS exhaustion (#22323, #21983); Claude Code's `SendMessage` returns `success: true` while orphaning messages (#85949); Codex's coordinator abandons runs after side questions (#43750). OpenCode is building agent-activity panels (#27995, #47455); Qwen Code visualizes workflow runs (#10594).
4. **Windows parity** — *5 of 7 tools.* Pi's 61-comment Windows survey (#7547), Qwen Code's ConPTY process leaks (347 children / ~2.8 GB, #11303–#11353), Codex's Windows desktop cluster (pets, project sync, marketplace), Claude Code's TUI path resolution (#91129), Copilot CLI's session blocks (#4756).
5. **Permission & safety configurability** — *all seven.* Demand for observable, reversible, opt-out-able controls: Claude Code's ClAudit false positives (#85375–#85392) and browser hard-blocks (#90724); Codex's invisible site "soft blacklist" (#29343, #43068); Copilot CLI's fail-closed `--yolo` (#4757); Gemini CLI's sandbox hardening PRs; OpenCode's per-session reversible Yolo (#47918); Qwen Code's DingTalk permission cards (#10457).
6. **Cost/quota transparency** — *Codex, OpenCode.* Codex's simultaneous all-model "capacity" errors (#43368) and usage-API requests (#43788); OpenCode's Forbidden-on-paid-plan and disputed billing (#47787, #47934).

## 4. Differentiation Analysis

| Tool | Focus today | Target user | Technical approach |
|---|---|---|---|
| **Claude Code** | Multi-agent teammates, hooks, IDE/Desktop/Browser surfaces | Enterprise power users | Opinionated defaults; broadest surface matrix; issue triage under strain |
| **Codex** | Voice as first-class surface, Memory v2, user-verification pipeline | Consumer-to-Pro ChatGPT subscribers | Highest internal PR velocity; desktop/mobile/browser/voice breadth |
| **Gemini CLI** | Sandbox hardening, correctness fixes, AST-aware token efficiency | Open-source developers | Nightly cadence; accepts external contributor PRs (docs wave); research-driven EPICs |
| **Copilot CLI** | Permissions governance, MCP reliability, session lifecycle | GitHub-ecosystem enterprise | Policy-aware (managed policies, fail-closed postures); quiet release rhythm |
| **OpenCode** | Desktop plugin modularization, multi-provider catalog | Provider-neutral tinkerers | Extension-architecture refactor; Go/Zen multi-model billing surface |
| **Pi** | Provider adapter breadth, extension API completeness | Extension/agent developers | Small-team fast turnaround; OpenAI-compat normalization; community GUIs on top |
| **Qwen Code** | Web Shell/daemon as integration platform | Integrators (channels, IM, headless) | `qwen serve` platform strategy; autofix automation loops; DingTalk channel UX |

The sharpest strategic split: **Codex and Qwen Code are building platforms** (voice, app-server, daemon/web surfaces), **Gemini CLI and Pi are hardening cores** (sandbox, streaming, provider correctness), while **Claude Code's differentiation (teammates, hooks) is also where its worst silent-failure bugs live**.

## 5. Community Momentum & Maturity

- **Velocity leaders:** Codex (17 PRs, coordinated Memory-v2 + TUI-verification waves), Gemini CLI (14 PRs + nightly, including external contributors), Qwen Code (11 PRs + nightly + automated autofix loop).
- **Engagement leaders:** Claude Code (50 issues surfaced; issue IDs in the 91k range indicate an order-of-magnitude larger cumulative volume than peers; 38-comment top thread) and OpenCode (141-comment/109👍 memory megathread with maintainer-led triage).
- **Healthiest ecosystem signals:** Codex's Discussions host five active third-party tools (CodexFuse, deja-vu, Compact Context, Blume.codes, DoneAudit); Pi closed a partner-reported breaking change (#9290) within the same cycle.
- **Caution flags:** Claude Code auto-closed ~10 daemon/agent-view issues as stale without maintainer response, and multiple high-reaction bugs (#36146, #44657) have sat for months — engagement is high, responsiveness appears bottlenecked. Copilot CLI's 3-PR day is a low but likely transient.

## 6. Trend Signals

1. **Memory is becoming standard infrastructure — before its security model settles.** Cross-repo leakage (Copilot #3945) and redaction-after-context (Gemini #26525) mean agent memory should be treated as a new data boundary by security teams now, not later.
2. **"Silent success" is the dominant failure class in orchestration.** Across Gemini, Claude, and Codex, workflows *appear* to succeed while failing. The emergence of verification tools (DoneAudit) marks the start of a trust-but-verify market for agent self-reporting — expect first-class termination-reason provenance to become a competitive differentiator.
3. **Compaction is the new crash.** With six of seven tools hit by compaction-related correctness bugs, long-session stability is gated on compaction quality — a key evaluation criterion for production adoption.
4. **CLIs are becoming headless platforms.** `qwen serve`, Codex's app-server, and OpenCode's managed server signal demand for embedding agents in CI, IM channels, and custom frontends; per-session request tagging (Qwen #10995) is an early integrator requirement.
5. **Windows remains the industry-wide second-class platform** — a reliable predictor of where each tool's next churn will come from.
6. **Cost transparency is under-supplied.** Misleading capacity errors and opaque quota accounting (Codex #43368, OpenCode billing cluster) are eroding subscription trust; expect pressure for pre-flight cost surfaces and usage APIs.
7. **Session data is an emerging asset class.** Tools indexing and distilling sessions across 24 agents (deja-vu) suggest developers should treat session logs as portable, auditable artifacts rather than disposable state.

**For decision-makers:** Codex and Gemini CLI offer the fastest improvement rates this cycle; Claude Code offers the deepest multi-agent surface but carries orchestration-reliability risk pending fixes; OpenCode and Pi are credible provider-neutral bets if extension ecosystems matter; Copilot CLI suits policy-governed enterprise environments despite its quieter cadence.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data as of:** 2026-09-08 | **Source:** github.com/anthropics/skills

---

## 1. Top Skills Ranking

Ranked by community discussion volume and topical impact (PR comment counts were not retrievable for this snapshot, so ranking reflects combination of listed priority and signal strength from cross-referenced Issues).

### 1. skill-creator: Fix `run_eval.py` 0% Recall Bug — [PR #1298](https://github.com/anthropics/skills/pull/1298)
- **Author:** MartinCajiao | **Status:** OPEN
- **Functionality:** Repairs the evaluation harness used by `skill-creator` so that `run_eval.py`, `run_loop.py`, and `improve_description.py` produce meaningful recall signals instead of reporting 0% for every description.
- **Discussion highlights:** Cross-references Issue #556 with 10+ independent reproductions; the description-optimization loop has been "optimizing against noise" — a critical infrastructure bug for anyone iterating on Skill descriptions.

### 2. Add document-typography Skill — [PR #514](https://github.com/anthropics/skills/pull/514)
- **Author:** PGTBoos | **Status:** OPEN
- **Functionality:** Typographic quality control that prevents orphan word wrap, widow paragraphs, and numbering misalignment in AI-generated documents.
- **Discussion highlights:** Frames typographic problems as "issues that affect every document Claude generates" — argues users rarely request quality, so it must be enforced proactively.

### 3. Add skill-quality-analyzer and skill-security-analyzer — [PR #83](https://github.com/anthropics/skills/pull/83)
- **Author:** eovidiu | **Status:** OPEN (since 2025-11-06, longest-pending in top set)
- **Functionality:** Meta-skills scoring Claude Skills across five quality dimensions (Structure, Examples, etc.) plus a security-focused analyzer.
- **Discussion highlights:** Direct response to growing ecosystem maturity concerns; complements Issue #492's trust-boundary concerns with actionable tooling.

### 4. Add Hivemind: Zero-Cost Multi-Agent Orchestration — [PR #1628](https://github.com/anthropics/skills/pull/1628)
- **Author:** Hanishchow | **Status:** OPEN
- **Functionality:** Delegates mechanical sub-tasks to headless opencode workers on free models while Claude Code remains the planner/reviewer/merger — argues "expensive context is scarcer than expensive intelligence."
- **Discussion highlights:** Architectural pattern with cost-optimization framing; addresses cost concerns implicit in Issue #1487 (token bloat).

### 5. Improve frontend-design Skill — [PR #210](https://github.com/anthropics/skills/pull/210)
- **Author:** justinwetch | **Status:** OPEN
- **Functionality:** Revises the frontend-design skill so every instruction is actionable within a single Claude conversation; reduces ambiguity and over-specification.
- **Discussion highlights:** Touches a high-traffic skill; reform targets coherence rather than feature additions.

### 6. Add ODT (OpenDocument) Skill — [PR #486](https://github.com/anthropics/skills/pull/486)
- **Author:** GitHubNewbie0 | **Status:** OPEN
- **Functionality:** Create, fill, read, and convert ODT/ODS files via LibreOffice; supports ISO-standard open document formats.
- **Discussion highlights:** Fills a notable format gap alongside existing PDF/DOCX skills; relevant for users in open-source/government ecosystems.

### 7. Add testing-patterns Skill — [PR #723](https://github.com/anthropics/skills/pull/723)
- **Author:** 4444J99 | **Status:** OPEN
- **Functionality:** Comprehensive testing-stack guidance — Testing Trophy philosophy, AAA pattern, React component testing, pure-function heuristics.
- **Discussion highlights:** Aligns with strong practitioner demand for engineering best-practice skills (see Trend #2 below).

### 8. Add self-audit Skill (v1.3.0) — [PR #1367](https://github.com/anthropics/skills/pull/1367)
- **Author:** YuhaoLin2005 | **Status:** OPEN
- **Functionality:** Pre-delivery audit combining mechanical file verification with four-dimension reasoning quality gate, ordered by damage severity.
- **Discussion highlights:** Mirrors Issue #1385 (Reasoning Quality Gate Pipeline proposal); signals convergence around "delivery verification" as a category.

---

## 2. Community Demand Trends

Distilled from the top 15 Issues (sorted by comment count):

| Trend | Evidence | Comment Volume |
|---|---|---|
| **Security & trust boundaries for community Skills** | [Issue #492](https://github.com/anthropics/skills/issues/492) — community skills under `anthropic/` namespace enable impersonation | **43** comments |
| **Org-wide Skill distribution & sharing** | [Issue #228](https://github.com/anthropics/skills/issues/228) — currently requires manual .skill file transfer via Slack | 16 comments |
| **Reliable Skill evaluation tooling** | [Issue #556](https://github.com/anthropics/skills/issues/556) (12), [#1390](https://github.com/anthropics/skills/issues/1390) (4), [#1487](https://github.com/anthropics/skills/issues/1487) (4) — eval harnesses return 0% / swallow errors / inject 156k tokens | 20+ combined |
| **Compact agent memory & context efficiency** | [Issue #1329](https://github.com/anthropics/skills/issues/1329) — symbolic notation for compact agent state | 9 comments |
| **Quality gating & adversarial review pipelines** | [Issue #1385](https://github.com/anthropics/skills/issues/1385) — pre-task calibration → adversarial review → delivery verification | 4 comments |
| **Agent governance & safety patterns** | [Issue #412](https://github.com/anthropics/skills/issues/412) (closed, 6) + [Issue #1175](https://github.com/anthropics/skills/issues/1175) (closed, 4) — SharePoint permissions, audit trails | 10 combined |
| **Skills-as-MCPs interop** | [Issue #16](https://github.com/anthropics/skills/issues/16) — package Skills behind MCP-shaped APIs | 4 comments |
| **Plugin packaging hygiene** | [Issue #189](https://github.com/anthropics/skills/issues/189) — `document-skills` and `example-skills` ship identical content | 6 comments |

**Net signal:** Workflow automation, code/test generation, and documentation are *served* by existing Skills; the unserved frontier is **meta-infrastructure** — security, distribution, evaluation, memory, and quality-gating around Skills themselves.

---

## 3. High-Potential Pending Skills

Open PRs with strong signal but not yet merged (selection criterion: combines topical importance, recency, and absence of obvious blockers):

| PR | Skill | Why likely to land |
|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator `run_eval.py` fix | Resolves a confirmed bug with 10+ reproductions (Issue #556); blocks other description-optimization work |
| [#83](https://github.com/anthropics/skills/pull/83) | skill-quality-analyzer + skill-security-analyzer | Directly answers the highest-comment issue (#492, 43 comments) with concrete tooling |
| [#514](https://github.com/anthropics/skills/pull/514) | document-typography | Wide applicability to "every document Claude generates"; clear value proposition |
| [#723](https://github.com/anthropics/skills/pull/723) | testing-patterns | Strong practitioner demand for engineering best-practice skills |
| [#486](https://github.com/anthropics/skills/pull/486) | ODT | Clear format-coverage gap alongside existing PDF/DOCX skills |
| [#1628](https://github.com/anthropics/skills/pull/1628) | Hivemind | Differentiated architectural pattern (cost-optimized orchestration) |
| [#1367](https://github.com/anthropics/skills/pull/1367) | self-audit v1.3.0 | Aligns with Issue #1385 quality-gate proposal |

---

## 4. Skills Ecosystem Insight

**The community's most concentrated demand is for meta-Skills — tooling that secures, validates, distributes, and audits the Skills ecosystem itself, rather than skills that perform end-user tasks.**

---

*Report compiled from PRs #83, #210, #486, #514, #538, #539, #541, #723, #1050, #1099, #1298, #1367, #1595, #1602, #1607, #1615, #1627, #1628, #1724, #1734 and Issues #16, #29, #62, #189, #202, #228, #412, #492, #556, #1175, #1329, #1362, #1385, #1390, #1487.*

---

# Claude Code Community Digest — 2026-09-08

## 1. Today's Highlights

Activity in the Claude Code repository was dominated by **long-running bug threads and feature requests rather than fresh releases**, with no new versions published in the last 24 hours. The most active discussion remains a feature request to make auto-memory `MEMORY.md` compaction thresholds configurable (#91188), while a high-upvote VS Code extension UI bug (first-message pinning, #36146) continues to gather community attention. A cluster of stale issues around the agents view, background daemons, and ClAudit false positives were closed automatically without maintainer response.

## 2. Releases

*No new releases in the last 24 hours. Latest activity on the PR side is limited to a single closed PR (#26175) from earlier in the year replacing the native installer bootstrap script — no merged changes to report today.*

## 3. Hot Issues

1. **[#91188](https://github.com/anthropics/claude-code/issues/91188) — Configurable auto-memory compaction threshold (OPEN, 38 comments)**
   The most-discussed thread this cycle. Users want the hardcoded 200-line / 25KB `MEMORY.md` reminder threshold to be adjustable (or independently suppressible). The current behavior produces disruptive compaction prompts for workflows that intentionally maintain larger memory files.

2. **[#36146](https://github.com/anthropics/claude-code/issues/36146) — VS Code extension: first message pinned to top of chat (OPEN, 28 comments, 42 👍)**
   A long-standing UX bug: the user's opening message remains "sticky" at the top of the VS Code chat panel, with no obvious way to dismiss or scroll it away. High upvote count signals significant community frustration with the IDE experience.

3. **[#44657](https://github.com/anthropics/claude-code/issues/44657) — Subagent Write tool rejects report-named `.md` files (OPEN, 10 comments, 19 👍)**
   Subagents spawned via the `Agent` tool are blocked from writing `.md` files whose names start with `report`, `summary`, `findings`, or `analysis`. There is no opt-out. This is breaking legitimate documentation workflows and is one of the most reacted-to open bugs.

4. **[#73399](https://github.com/anthropics/claude-code/issues/73399) — Context usage % miscalculated for 1M-context model variants (OPEN, 6 comments)**
   When using `claude-fable-5[1m]`, the statusline computes context usage against the 200K window rather than the actual 1M window. A meaningful UX regression for long-context users.

5. **[#85949](https://github.com/anthropics/claude-code/issues/85949) — Forked-skill teammate subagents cannot reply to parent (OPEN, 4 comments)**
   A subtle deadlock bug: `SendMessage` to `"team-lead"` reports `success: true` but the message is silently orphaned. Parent agents hang indefinitely waiting for replies that will never arrive — a reliability concern for multi-agent orchestration.

6. **[#82665](https://github.com/anthropics/claude-code/issues/82665) — `TeammateIdle` hook fires for worker forks with parent identity (OPEN, 2 comments)**
   Hook payloads for forked workers are byte-identical to the parent's, with no `agent_id` distinction. This makes feedback-loop logic for hooks unsatisfiable in fork topologies.

7. **[#79934](https://github.com/anthropics/claude-code/issues/79934) — `SendMessage` to `"main"` resolves to root session, not dispatcher (OPEN, 2 comments)**
   Nested subagents sending reports via `SendMessage({to: "main"})` deliver to the root session, bypassing the orchestrator that actually spawned them — a routing bug that breaks nested agent flows.

8. **[#91129](https://github.com/anthropics/claude-code/issues/91129) — Windows TUI: clickable file paths resolve against wrong base dir (OPEN, 1 comment)**
   In the Windows terminal UI, clickable file-path links point to the repo subfolder instead of the session CWD, producing "file-not-found" errors. Small but breaks a basic interaction.

9. **[#90724](https://github.com/anthropics/claude-code/issues/90724) — Claude in Chrome extension hard-blocked on docs.google.com (OPEN, 1 comment)**
   The browser extension refuses to load `docs.google.com` with no permission override available. Disappointing for Google Workspace workflows.

10. **[#92113](https://github.com/anthropics/claude-code/issues/92113) — Desktop 1.44121.x silently dropped Remote Control auto-enable (OPEN, 1 comment, 1 👍)**
    A regression report: Desktop 1.44121.1 removed implicit auto-enable of Remote Control for scheduled-task sessions. Author asks for an opt-in toggle and a release note. Indicates ongoing friction between Desktop and CLI configuration contracts.

*Notable cluster: roughly ten issues from the same `agent-view`/`background-daemon` area (#83554, #83050, #82129, #81630, #81456, #80923, #81071) were all auto-closed as stale during this window, suggesting either reduced maintainer attention on daemon reliability or stricter staleness enforcement.*

## 4. Key PR Progress

Only **one PR** appears in the activity window, and it is already closed:

- **[#26175](https://github.com/anthropics/claude-code/pull/26175) — fix: replace broken native installer bootstrap script (CLOSED)**
  Targets the `curl … | bash` installer path that was silently failing to symlink `~/.local/bin/claude` while deleting the user's existing npm global install. PR is closed without merge status visible in the data, but it represents an important correctness fix for first-time installation.

## 5. Hot Discussions

*No Discussion data was provided in this data pull — section omitted.*

## 6. Feature Request Trends

Distilling the open feature requests and enhancement-labeled issues:

- **Configurability of hardcoded limits.** `#91188` (memory compaction threshold) joins a broader pattern of users wanting escape hatches for hardcoded behavior — context windows, file-size caps, and reminder thresholds.
- **Clipboard / image input ergonomics.** `#92824` requests direct screenshot paste into the console on Windows, replacing the current save-then-drag dance.
- **Agent addressing / routing semantics.** `#79934` and `#85949` both call for clearer, more deterministic addressing in nested-agent `SendMessage` flows (`"main"` vs dispatcher, teammate mailboxes).
- **Permission UX for browser/desktop surfaces.** `#90724` (Chrome docs.google.com block) and `#92113` (Remote Control opt-in) point toward wanting finer-grained, discoverable permission controls for Claude-in-browser and Desktop flows.
- **Hook payload richness.** `#82665` requests agent identification in `TeammateIdle` payloads — a recurring ask for hooks observability.

## 7. Developer Pain Points

Recurring frustrations surfaced across today's issues:

- **Long-running open bugs with no movement.** Multiple issues (e.g., #36146 from March, #44657 from April, #73399 from July) remain open for months with substantive discussion but no resolution or maintainer acknowledgment.
- **Stale-bot auto-closing reliability reports.** A large batch of agent-view / background-daemon issues closed as stale in one day. Developers working on multi-agent / daemon features perceive these areas as under-maintained.
- **Multi-agent orchestration has rough edges.** Reply routing, parent/fork identity in hooks, and context-window accounting for the 1M variant are all producing silent failures or wrong numbers — the worst class of bug because workflows appear to succeed.
- **IDE/Desktop integration regressions.** VS Code and Desktop apps are introducing behavior changes (sticky messages, dropped auto-enables) that are perceived as undocumented regressions rather than intentional UX changes.
- **ClAudit false positives blocking legitimate work.** A series of identical-pattern cyber-flag reports (#85375–#85392) describe session-halting safety-filter over-triggers, particularly with Opus 4.8, frustrating power users in defensive-security contexts.
- **No opt-outs for "helpful" defaults.** Both #44657 (subagent filename restrictions) and #91188 (memory compaction) reflect a wider complaint: Claude Code makes opinionated behavior choices and offers no way to disable them.

---

*Digest generated from GitHub data for `anthropics/claude-code` covering activity ending 2026-09-08. Item counts: 50 issues (top 30 shown), 1 PR.*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-08

## Today's Highlights

A coordinated wave of internal PRs landed today, formalizing a **Memory v2 system** (configurable versions, isolated storage, tiered evidence selection, summary-only extraction) and a complete **TUI user-verification pipeline** (request bookkeeping, prompt component, MCP enablement, app-server device probe). Voice experience also got a substantial upgrade with split-flap transcript animation, configurable mute shortcuts, voice composer strip, and stabilized meter sampling.

On the bug side, the community is still battling **Windows-specific Computer Use / Browser Use instability**, **TUI session resume failures**, and a recurring **"Selected model is at capacity"** symptom across Pro-tier models — the latter drawing 6 👍 in under 24 hours.

---

## Releases

- **[rust-v0.154.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.6)** — Pre-release of the Codex Rust core; no changelog body provided in the digest source. Track alongside bundled `codex-cli 0.153.x` builds in the field.

---

## Hot Issues

1. **[#41513 — Windows Pets become click-through and undraggable](https://github.com/openai/codex/issues/41513)** (32 comments, 14 👍) — Both built-in and custom floating pets lose hit-testing on Windows desktop; reproducible across two builds. High visibility because the pets feature is recent and visually prominent.
2. **[#18404 — Computer Use plugin unavailable on macOS Intel](https://github.com/openai/codex/issues/18404)** (27 comments, 17 👍) — Despite the MCP server being toggled ON, Computer Use refuses to activate on x86_64 Macs. The highest-upvoted issue today and a long-standing parity gap.
3. **[#42215 — Windows ChatGPT Work local chat fails on project context sync](https://github.com/openai/codex/issues/42215)** (23 comments) — A 23-file project triggers repeated filesystem-stage sync failures; the user is now blocked from starting any new local Work chat in that project.
4. **[#29343 — Chrome/browser/computer use silently refuses certain sites](https://github.com/openai/codex/issues/29343)** (21 comments, 7 👍) — A long-running complaint about a "soft blacklist" with no user-facing signal. Tied to the safety-check system also flagged in #43068.
5. **[#42853 — GPT-6 Astra missing from model picker for eligible Pro accounts](https://github.com/openai/codex/issues/42853)** (18 comments, 4 👍) — Windows desktop 26.901.4073.0 does not expose Astra to Pro users; same tier on macOS does. A model-rollout parity bug.
6. **[#37754 — TUI resume fails: `list_turns is not supported yet`](https://github.com/openai/codex/issues/37754)** (16 comments, 4 👍) — `thread/resume` calls an unsupported method during TUI bootstrap, blocking resumption of any existing local session on CLI 0.147.0.
7. **[#22851 — Mobile pairing stuck on "Waiting for desktop"](https://github.com/openai/codex/issues/22851)** (13 comments, 5 👍) — Remote-control daemon cannot use the configured proxy, leaving iOS/Android pairing in an indefinite wait state.
8. **[#43368 — "Selected model is at capacity" across Terra, Luna, Sol, Astra](https://github.com/openai/codex/issues/43368)** (7 comments, 6 👍) — Pro 20x desktop users report *all* top-tier models at capacity simultaneously, suggesting a quota/account-state bug rather than real saturation.
9. **[#24222 — Move threads between General and Projects](https://github.com/openai/codex/issues/24222)** (5 comments, 9 👍) — The most-upvoted enhancement today: users want a reversible, explicit flow to relocate threads across project scopes.
10. **[#43750 — Coordinator ends an unfinished multi-agent run after a side question](https://github.com/openai/codex/issues/43750)** (5 comments) — Subagent orchestration stops early when the user asks a follow-up mid-run, leaving delegated work orphaned.

**Honorable mentions:** [#41986](https://github.com/openai/codex/issues/41986) durable-rollout task-history wipe; [#43017](https://github.com/openai/codex/issues/43017) Android Remote thread-list duplication; [#31592](https://github.com/openai/codex/issues/31592) `SKILL.md` symlink discovery bug; [#43068](https://github.com/openai/codex/issues/43068) Browser Use irrecoverable security block.

---

## Key PR Progress

1. **[#43800 — Summary-only extraction for memory v2](https://github.com/openai/codex/pull/43800)** — Dedicated extraction prompts that preserve task history and correction scope without over-generalizing into user claims.
2. **[#43799 — Prioritize human evidence in memory v2 extraction](https://github.com/openai/codex/pull/43799)** — Tiered selection: human input and assistant final responses outrank commentary/context/tool output under the rollout budget.
3. **[#43798 — Batch non-user history eviction](https://github.com/openai/codex/pull/43798)** — Stops per-append evictions from invalidating Guardian's transcript cursor, restoring delta-mode sync.
4. **[#43797 — Configurable memory versions with isolated storage](https://github.com/openai/codex/pull/43797)** — Introduces `memories.version` (`v1` default, `v2` opt-in) and routes generation/summaries/retrieval through the selected version with lazy `memories_v2` migration.
5. **[#43796 — Preserve reasoning effort through compaction, reset on success](https://github.com/openai/codex/pull/43796)** — Closes a leakage bug where old pinned effort survived into the new context window.
6. **[#43795 — Pin request reasoning effort while configuration overrides are active](https://github.com/openai/codex/pull/43795)** — Keeps request baseline stable while `configuration_update` items carry the selected effort.
7. **[#43702 — TUI user-verification prompt component](https://github.com/openai/codex/pull/43702)** — New `UserVerificationView` with explicit verify/cancel choices, request details, and a waiting state.
8. **[#43712 — Enable MCP user verification in the TUI](https://github.com/openai/codex/pull/43712)** — Stops the TUI from auto-canceling verification, surfacing prompts on both active and inactive threads.
9. **[#43715 — Enable user verification for the bundled TUI on supported devices](https://github.com/openai/codex/pull/43715)** — Replaces the always-`false` device-support probe with `native::device_supported`.
10. **[#43656 — Animate live voice transcripts with split-flap tiles](https://github.com/openai/codex/pull/43656)** — Split-flap effect with brief speaker-colored highlights; supports a companion fix in [#43699](https://github.com/openai/codex/pull/43699) that preserves animation state across scrolls.

**Other notable voice/TUI work merged today:** [#43651](https://github.com/openai/codex/pull/43651) `Ctrl+X` voice mute + recording indicators; [#43676](https://github.com/openai/codex/pull/43676) spoken-prompt styling and file-link rendering; [#43683](https://github.com/openai/codex/pull/43683) dedicated voice composer strip; [#43690](https://github.com/openai/codex/pull/43690) configurable voice-mute keymap; [#43695](https://github.com/openai/codex/pull/43695) stabilized realtime voice meter; [#43708](https://github.com/openai/codex/pull/43708) TUI request bookkeeping for verification; [#43790](https://github.com/openai/codex/pull/43790) app-server storage metrics scoped to session dirs.

---

## Hot Discussions

### Ideas
- **[#43788 — Codex usage transparency and a subscription-based API](https://github.com/openai/codex/discussions/43788)** — Asks for pre-flight cost estimates and an official API surface for subscription users; surfaces a recurring complaint that deprecation/silent model switching is opaque.
- **[#43696 — Wake on LAN for the mobile remote app](https://github.com/openai/codex/discussions/43696)** — Wants the mobile client to gracefully wake a sleeping host before pairing.
- **[#42965 — Track source turn/window provenance for persisted world state](https://github.com/openai/codex/discussions/42965)** — Proposes recording which turn/context window each persisted state entry originated from, to make diffs and rollbacks coherent.
- **[#37611 — Signed enterprise work orders for governed access to higher-capability models](https://github.com/openai/codex/discussions/37611)** — Long-running thread on enterprise-grade authorization for frontier-tier models.

### Q&A
- **[#43257 — How does experimental context management count history lookups against limits?](https://github.com/openai/codex/discussions/43257)** — Pro users on macOS want clarity on whether resumed context-window history lookups eat into their 5h budget.
- **[#41714 — Specifying a new default project root directory in the ChatGPT Codex app](https://github.com/openai/codex/discussions/41714)** — Confirms a UX gap: projectless task directory is configurable, but the default *project* root is not.
- **[#10045 — Session isolation and model configuration](https://github.com/openai/codex/discussions/10045)** — Older but still active: per-project model pinning behavior.

### Show and tell
- **[#41157 — CodexFuse 1.2.0](https://github.com/openai/codex/discussions/41157)** — Local Windows dashboard surfacing Codex rate-limit usage/resets. MIT, no API key, EN+PT.
- **[#41642 — Compact Context](https://github.com/openai/codex/discussions/41642)** — MIT-licensed local repo router that hands Codex up to five likely files before a turn.
- **[#43427 — Blume.codes](https://github.com/openai/codex/discussions/43427)** — Tool that distills coding-agent sessions into rules and skills, targeting agent-drift problems.
- **[#43598 — deja-vu](https://github.com/openai/codex/discussions/43598)** — Go binary that indexes Codex + 23 other agents' on-disk sessions and gives Codex recall across them.
- **[#43532 — DoneAudit](https://github.com/openai/codex/discussions/43532)** — Verifies the actual evidence behind an agent's "done" claim before trusting it.

---

## Feature Request Trends

- **Thread & project lifecycle ergonomics** — Moving threads between General and Projects (#24222), marking threads unread (#31082, closed), and clearer new-thread context selection are the most upvoted product asks.
- **Usage and cost transparency** — Pre-flight cost estimates, deprecation visibility, and clearer 5h window accounting (Discussions #43788, #43257, #42983) all point at a unified "what will this cost / is this within budget" surface.
- **Voice as a first-class orchestration surface** — Issue #38504 and the entire merged voice PR cluster (#43651–#43699) signal a strategic push to treat Live Voice as a serious work surface, not just chat.
- **Multi-agent robustness** — Coordinator continuing through side questions (#43750) and subagent provenance tracking (Discussion #42965) show demand for more reliable long-running agent loops.
- **Remote/host management** — Wake-on-LAN (#43696), proxy-aware mobile pairing (#22851), and Android Remote parity (#43017) are recurring mobile-remote friction points.
- **Memory v2 with explicit scoping** — The merged PR set (#43797–#43800) reflects a community request for memories that capture task history and corrections without leaking task-specific facts into the global user profile.

---

## Developer Pain Points

- **Windows desktop is a second-class citizen for agentic features.** Floating pets (#41513), ChatGPT Work project sync (#42215), Computer Use missing native-app inventory (#43596), Computer Use `setup refresh had errors` (#43373), Browser Use Chrome URL mapping (#42766), and the broken bundled marketplace state (#26501) all converge on the same surface: Windows desktop builds regress or fail to expose features that work on macOS.
- **macOS Intel parity is regressing.** Computer Use plugin gating (#18404) is the headline, but it joins a wider pattern of macOS x86_64 falling behind arm64.
- **Browser / Computer Use safety checks are not observable or reversible.** #29343, #43068, and #42766 all describe a model that silently or permanently refuses sites with no recheck path and no user signal.
- **TUI session continuity is fragile.** Resume failure (#37754) and the list of merged TUI verification fixes today indicate the TUI's app-server contract is still in flux.
- **Model capacity errors are misleading.** #43368's "all four top models at capacity" pattern suggests quota/account-state bugs that surface as generic 5xx-style errors.
- **Memory & context management is opaque.** Discussion #43257 and Issue #41986 (durable-rollout task-history wipe) both highlight that the new context-compaction / memory systems are not yet transparent enough for users to trust.
- **Skill discovery edge cases.** #31592 (symlinked `SKILL.md`) is a small but visible papercut for users who maintain one canonical skill across multiple agent directories.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-08

## Today's Highlights

A new nightly build `v0.60.0-nightly.20260908.g85aca163f` is out, continuing the rapid iteration on the v0.60 line. The community is heavily focused on agent reliability and sandbox security this week, with multiple P1 bugs around subagent termination, hangs, and shell execution receiving sustained maintainer attention. A new "Auto Memory" feature cluster (issues #26516, #26522, #26523, #26525) signals growing investment in persistent agent memory, alongside its first round of correctness and redaction fixes.

## Releases

- **v0.60.0-nightly.20260908.g85aca163f** — Nightly release. Diff vs. previous nightly available [here](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260907.g85aca163f...v0.60.0-nightly.20260908.g85aca163f). (Automated version bump PR: [#29243](https://github.com/google-gemini/gemini-cli/pull/29243))

## Hot Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — *Subagent recovery after MAX_TURNS is reported as GOAL success* (13 comments). `codebase_investigator` reports `status: "success"` / `Termination Reason: "GOAL"` even when it hit the turn cap before doing analysis. **Why it matters:** this masks real agent interruptions from users and breaks observability for any failure-mode analysis. P1, maintainer-tracked.

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — *Generalist agent hangs* (8 comments, 8 👍). When the generalist agent is invoked, simple operations like folder creation hang indefinitely. **Why it matters:** a high-affect P1 reliability bug with broad repro; bypass workaround is explicit "don't use sub-agents" prompting.

3. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)** — *Shell command execution stuck at "Waiting input"* (4 comments, 3 👍). P1 core bug where a finished shell command leaves the CLI showing "Awaiting user input". Common enough to be a recurring developer pain point.

4. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** — *Browser subagent fails in Wayland* (4 comments). Termination reason reports `GOAL` despite failure — same family of misleading-subagent-status issues as #22323.

5. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — *Zero-Dependency OS Sandboxing & Post-Execution Intent Routing* (9 comments). Proposes leveraging Gemini 3's native bash affinity via OS-level sandboxing rather than restricting the model. **Why it matters:** strategic, large-effort P2 enhancement that defines a long-term security/UX direction.

6. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — *Assess the impact of AST-aware file reads, search, and mapping* (7 comments). EPIC for token-frugal, precision reads using AST-aware tools (paired with [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)). **Why it matters:** directly targets the ~36.6k-token/turn context bloat problem.

7. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** — *Gemini does not use skills and sub-agents enough* (6 comments). Anecdotal but widely relatable: the model only uses custom skills when explicitly told. Signals a discoverability/dispatch gap in the agent tool registry.

8. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)** — *Deterministic redaction and reduce Auto Memory logging* (5 comments). Auto Memory currently relies on model-side redaction after content is already in context — a meaningful privacy/security concern for the new memory subsystem.

9. **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)** — *Stop Auto Memory from retrying low-signal sessions indefinitely* (4 comments). Sessions the extractor chooses to skip are resurfaced every cycle. Part of a tightly clustered memory-quality workstream.

10. **[#22232](https://github.com/google-gemini/gemini-cli/issues/22232)** — *Browser agent resilience: automatic session takeover and lock recovery* (4 comments). `BrowserManager` currently fails fast on locked profiles; users want graceful takeover, especially under `sessionMode: 'persistent'`.

## Key PR Progress

1. **[#29244](https://github.com/google-gemini/gemini-cli/pull/29244)** — *fix(core): make tool file writes atomic and serialize same-path writes*. Two concurrent `replace` calls on one file currently both report success while silently losing one edit; this serializes writes. P1, large change — addresses a real data-loss hazard in parallel tool execution.

2. **[#29180](https://github.com/google-gemini/gemini-cli/pull/29180)** — *fix(core): avoid tildeifying sibling home paths*. Sibling directories whose names share a prefix with `$HOME` (e.g. `/home/user-build`) were incorrectly displayed as `~`-relative. Subtle but pervasive display bug.

3. **[#29242](https://github.com/google-gemini/gemini-cli/pull/29242)** — *fix(core): stop matching 401 as a substring in isAuthenticationError*. Any error string containing `401` (e.g. port `4012`) was triggering spurious logout. Small, surgical P2 fix.

4. **[#29166](https://github.com/google-gemini/gemini-cli/pull/29166)** — *fix(extensions): back up the extension dir before update so rollback restores it*. The rollback path was copying an empty temp dir back, so failed updates silently destroyed extensions.

5. **[#29214](https://github.com/google-gemini/gemini-cli/pull/29214)** — *fix(sandbox): harden filesystem boundaries and isolate runtime state*. Replaces host-dir mounts with sanitized read-only configs, resolves symlinks during path checks, decouples container env. Part of the broader sandbox-hardening wave.

6. **[#29022 (closed)](https://github.com/google-gemini/gemini-cli/pull/29022)** — *feat(tool): retain ask_user question in text history*. Implements `ui.keepAskUserQuestionsInHistory` so questions and answers survive session resume and `/chat share`. Clear UX win for repeatability.

7. **[#28935 (closed)](https://github.com/google-gemini/gemini-cli/pull/28935)** — *fix(sandbox): isolate Docker and container runtime sockets and binaries in macOS Seatbelt*. Denies container-daemon UDS, CLI binaries, Mach/XPC lookups, and POSIX shared memory to block sandbox escape via Docker Desktop's VirtioFS mounts.

8. **[#29008 (closed)](https://github.com/google-gemini/gemini-cli/pull/29008)** — *fix(core): strip execution-affecting GIT_* env vars in getSafeGitEnv*. Closes a gap where `.env`-loaded `GIT_*` variables (e.g. `GIT_DIR`, `GIT_INDEX_FILE`) could hijack git operations inside a "trusted" project.

9. **[#28995 (closed)](https://github.com/google-gemini/gemini-cli/pull/28995)** & **[#29004 (closed)](https://github.com/google-gemini/gemini-cli/pull/29004)** — *fix(core): prevent formatTruncatedToolOutput output inflation on negative maxChars*. Negative slice indices caused truncation to *double* the output; both PRs guard against non-positive `maxChars`.

10. **[#27636 (closed)](https://github.com/google-gemini/gemini-cli/pull/27636)** — *perf: optimize VirtualizedList and fix click handling*. Targets the long-standing terminal-resize flicker/performance pain tracked in [#21924](https://github.com/google-gemini/gemini-cli/issues/21924).

Also notable: a docs cleanup wave from `harshil-mistry` ([#29009](https://github.com/google-gemini/gemini-cli/pull/29009), [#29011](https://github.com/google-gemini/gemini-cli/pull/29011), [#29013](https://github.com/google-gemini/gemini-cli/pull/29013), [#29015](https://github.com/google-gemini/gemini-cli/pull/29015)) addressing missing CLI flags, ACP flag table errors, env-var redaction key typos, and unscoped workflow permissions.

## Feature Request Trends

- **AST-aware code tooling** ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746), [#19561](https://github.com/google-gemini/gemini-cli/issues/19561)). The community is converging on "surgical" file reads, search, and codebase mapping to fight context bloat — currently ~36.6k tokens per turn baseline.
- **Persistent / external task tracking** ([#18836](https://github.com/google-gemini/gemini-cli/issues/18836), [#21000](https://github.com/google-gemini/gemini-cli/issues/21000)). Deprecating the in-context `WriteToDo` in favor of file-based CRUD task tracking, including native-file tool variants.
- **Auto Memory maturation** ([#26516](https://github.com/google-gemini/gemini-cli/issues/26516) and its three siblings). Beyond the bug fixes, the trajectory points toward transparent patch surfaces, deterministic secret redaction, and bounded retries.
- **Subagent observability** ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598), [#21763](https://github.com/google-gemini/gemini-cli/issues/21763)). Users want subagent trajectories in `/chat share`, in `/bug` reports, and trustworthy termination reasons.
- **Agent self-awareness** ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)). A push to make the CLI accurately recall its own flags, hotkeys, and invocation patterns.
- **Local subagent maturity** ([#20195](https://github.com/google-gemini/gemini-cli/issues/20195)). Sprint-1 scope for broader local-subagent adoption, paired with [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) on better skill/agent dispatch.
- **OS-level sandboxing of bash affinity** ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873)). Rather than neutering the model's native bash skills, sandbox the execution environment and route intent afterward.

## Developer Pain Points

- **Misleading subagent termination signals.** Multiple open issues ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323), [#21983](https://github.com/google-gemini/gemini-cli/issues/21983)) report `GOAL`/`success` statuses masking real failures (`MAX_TURNS`, Wayland browser errors). Undermines trust in agent telemetry and bug reports.
- **Agent hangs in routine flows.** The generalist agent hanging on folder creation ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)) and shell commands sticking at "Awaiting user input" after completion ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)) are recurring reliability hits.
- **Tool registry overload.** Hitting a 400 error with >128 tools ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)) reflects a need for smarter scoping when extensions stack up.
- **Workspace pollution.** The model frequently writes temp scripts to arbitrary directories ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)) when shell execution is restricted, making clean commits painful.
- **Interactive-prompt stalls.** Gemini CLI gets stuck at interactive prompts during things like `npm create vite` ([#22465](https://github.com/google-gemini/gemini-cli/issues/22465)).
- **Sandbox escape surfaces.** Multiple high-priority security fixes this week ([#28935](https://github.com/google-gemini/gemini-cli/pull/28935), [#29214](https://github.com/google-gemini/gemini-cli/pull/29214), [#29005](https://github.com/google-gemini/gemini-cli/pull/29005)) indicate the sandbox story is still maturing, especially around container-runtime isolation and `DEBUG` env-var truthiness.
- **State persistence gaps.** `/compress` not surviving session resume ([#21335](https://github.com/google-gemini/gemini-cli/issues/21335)) and `get-shit-done` output hooks crashing ([#22186](https://github.com/google-gemini/gemini-cli/issues/22186)) round out a pattern of fragile session/extension state.
- **Documentation drift.** Multiple PRs just to fix docs ([#29009](https://github.com/google-gemini/gemini-cli/pull/29009), [#29011](https://github.com/google-gemini/gemini-cli/pull/29011), [#29013](https://github.com/google-gemini/gemini-cli/pull/29013)) — undocumented flags, incorrect redaction keys, stale ACP entries — show that the CLI surface is outpacing its reference docs.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-08

## Today's Highlights
- The long-running **vi/vim input mode** request (Issue #13, 76 👍, dating back to Sept 2025) was finally **CLOSED** — a notable milestone for power users.
- A wave of session-management regressions has been reported around the **1.0.83 / Desktop 1.1.15** releases, including orphaned session-state folders, wedged queues, stale connection item IDs, and an MCP OAuth flow that silently fails on non-first-party servers.
- Permissions ergonomics are a recurring friction point: `/permissions assisted` and `--yolo`/`--allow-all` are dropping mid-session, with conflicting fail-closed postures on accounts without managed policies.

## Releases
No new releases in the last 24 hours.

## Hot Issues

1. **[#13] CLI input should have a vi/vim input mode** — *Closed*
   The most-upvoted feature in the corpus (~76 👍, 10 comments) is finally closed. Signals strong demand for modal-editor ergonomics inside the CLI.
   👉 https://github.com/github/copilot-cli/issues/13

2. **[#4742] Desktop 1.1.15: cannot create a second Local session while one is running**
   High-impact regression: "This project already has an active Local workspace" blocks legitimate parallel work.
   👉 https://github.com/github/copilot-cli/issues/4742

3. **[#2861] Compaction fails: empty model response (Opus 4.6)**
   `/compact` retries 3x and dies — breaks long-session workflow on a flagship model.
   👉 https://github.com/github/copilot-cli/issues/2861

4. **[#4756] Windows: archiving every idle session required before new Local session**
   Companion to #4742 but Windows-specific (13 👍) — points to systemic session-state handling problems.
   👉 https://github.com/github/copilot-cli/issues/4756

5. **[#4753] v1.0.83: session resume cancels in-flight stdio MCP servers (~1s vs 16s)**
   Aggressive timeout regression silently disables MCP tools across the resumed session.
   👉 https://github.com/github/copilot-cli/issues/4753

6. **[#4438] `disable-model-invocation: true` makes a skill unreachable, not manual-only**
   Semantic mismatch between documented intent and runtime behavior — confusing for skill authors.
   👉 https://github.com/github/copilot-cli/issues/4438

7. **[#4757] `--yolo` / `--allow-all` blocked by fail-closed bypass restriction (no managed policy)**
   Permission gating applies a "missing policy = deny" posture that never lifts during the session.
   👉 https://github.com/github/copilot-cli/issues/4757

8. **[#3945] Memories are leaking between repositories**
   Privacy-relevant: brand-new repos appear to inherit stored "facts" from elsewhere — trust-impacting.
   👉 https://github.com/github/copilot-cli/issues/3945

9. **[#4017] MCP OAuth: non-first-party HTTP servers never launch the browser flow**
   Atlassian/incident.io-style integrations are silently dead in the Desktop app — no popup, no error.
   👉 https://github.com/github/copilot-cli/issues/4017

10. **[#4755] Session wedges permanently when a queued-lane message lands at turn end**
    Recovery requires killing the process — affects stability guarantees of long sessions.
    👉 https://github.com/github/copilot-cli/issues/4755

## Key PR Progress

1. **[#4761] install: report unsupported operating systems** — *Open*
   Surfaces FreeBSD (and other non-macOS/Linux) as unsupported rather than misleadingly pointing users at `winget`.
   👉 https://github.com/github/copilot-cli/pull/4761

2. **[#4762] install: report unsupported operating systems** — *Closed*
   An earlier version of the same fix; closed (likely superseded or merged differently than #4761).
   👉 https://github.com/github/copilot-cli/pull/4762

3. **[#4100] shangti0168** — *Closed*
   Security-labeled change ("安全性"); closed without merge — minimal public description.
   👉 https://github.com/github/copilot-cli/pull/4100

> Note: PR volume in the last 24h is unusually low (3 items). Consider this a quiet landing window.

## Feature Request Trends

- **Modal-editor ergonomics**: vi/vim input mode finally closed, but expect follow-ups on keybinding discoverability and config.
- **TUI richness**: collapsible per-type output sections (#1787), per-element theming for prompts vs. responses (#4767), reduced idle CPU (#4750).
- **MCP maturity**: scoped **MCP Profiles** (#2235), proper **cancellation propagation** (#4759), and **OAuth flow reliability** (#4017).
- **Cross-platform install**: clearer messaging on unsupported OSes (#4761/#4762), path-separator correctness on Windows (#4702).
- **Permission UX**: persistent `/permissions assisted` (#4764) and `--yolo`/`--allow-all` (#4696, #4757).

## Developer Pain Points

- **Session lifecycle fragility**: orphaned `~/.copilot/session-state` folders (#2836), wedges from queued-lane finalization (#4755), silent delete-no-ops (#4754), stale connection item IDs after resume (#4505).
- **Permissions volatility**: bypass modes drop after idle, on resume, or due to over-eager fail-closed enforcement (#4696, #4757, #4764).
- **MCP integration brittleness**: aggressive resume timeouts (#4753), unreachable skills due to frontmatter semantics (#4438), OAuth dead-ends (#4017), Azure `learn=true` timeouts (#4749).
- **Cross-repo context leakage**: memory persistence across repositories is producing surprising, privacy-sensitive behavior (#3945).
- **Windows + non-mainstream OS friction**: path-separator bugs (#4702), session-creation blocks (#4756), misleading install paths on FreeBSD (#4761).
- **Initial-prompt handling regression**: `-i`/`--interactive` prompts being silently dropped after CLI start (#4766).
- **Configuration scope ambiguity**: CLI failing to pick up `.mcp.json`/hooks when cwd is not the repo root (#4765).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-08

## Today's Highlights
The **Memory Megathread (#20695)** continues to dominate community attention with 141 comments and 109 likes, as maintainer `thdxr` consolidates scattered heap-snapshot reports into a single triage pipeline. A surge of **subscription- and model-availability bugs** (Forbidden errors on mimo-v2.5, missing DeepSeek-v4-flash-free in the Zen dropdown, unexpected DeepSeek V4 Pro token charges) signals growing friction in the OpenCode Go billing surface. On the engineering side, **`Hona`'s desktop-extension refactor series** (#47935 → #47947 → #47948 → #47936) lays the architectural groundwork for modularizing the desktop shell into independently packaged plugins.

## Releases
No new releases in the last 24 hours.

## Hot Issues

1. **[#20695 Memory Megathread](https://github.com/anomalyco/opencode/issues/20695)** — 141 comments / 109 👍. Central triage thread for scattered heap/memory reports; maintainer explicitly asks for heap snapshots rather than LLM-generated theories. The single most-watched issue on the repo right now.
2. **[#47787 Sudden "Forbidden: mimo-v2.5" despite active Go subscription](https://github.com/anomalyco/opencode/issues/47787)** — Active subscribers being locked out of a flagship free-tier model; ties into a wave of access-control complaints.
3. **[#47777 "Forbidden" error on free neural models](https://github.com/anomalyco/opencode/issues/47777)** — Sibling report; `mimo-v2.5-free` failing consistently across the free plan, indicating a likely provider-side regression.
4. **[#43805 DeepSeek-v4-flash-free missing from Zen dropdown](https://github.com/anomalyco/opencode/issues/43805)** — Model is reachable via `/zen/v1/models` and the config layer, but not exposed in the TUI picker — a clear UI/state-sync gap.
5. **[#42729 [FEATURE] Add Qwen3.8-27B](https://github.com/anomalyco/opencode/issues/42729)** — 12 👍. Community push to bring the new Qwen3.8-27B open-weight model into the Go catalog.
6. **[#47934 Unexpected token usage for DeepSeek V4 Pro on Go](https://github.com/anomalyco/opencode/issues/47934)** — $6.57 / 43.8% of the monthly cap attributed to a model the user claims not to have invoked — billing-trust red flag.
7. **[#47932 Rate-limit exceeded on Console Go](https://github.com/anomalyco/opencode/issues/47932)** — Paid users waiting 40+ seconds between turns; tagged `needs:compliance`.
8. **[#41696 [2.0] opencode2 stuck starting managed background server](https://github.com/anomalyco/opencode/issues/41696)** — Repeated `serve --service` spawns with no surfaced error; blocks the v2 startup path.
9. **[#27995 [FEATURE] Agent Activity Panel](https://github.com/anomalyco/opencode/issues/27995)** — Long-standing request for a sidebar view that surfaces live status of `explore`/`librarian`/`oracle` background agents without polling `background_output()`.
10. **[#43697 clipboard.write() never settles on X11 with xclip](https://github.com/anomalyco/opencode/issues/43697)** — Copy works, but the promise hangs for minutes — classic leak that compounds across a session.

## Key PR Progress

1. **[#47935 feat(plugin): explore desktop extension primitives](https://github.com/anomalyco/opencode/pull/47935)** — Foundational draft for splitting desktop features (browser, review/files, context) into independently packaged extensions sharing a TUI slot resolver with five placement modes.
2. **[#47947 refactor(app): extract review and file viewer extension](https://github.com/anomalyco/opencode/pull/47947)** — Moves diffs, file trees, line comments, and "Open in" actions into `@opencode/plugin-review-desktop`; host keeps panel/focus/annotation state.
3. **[#47948 refactor(app): extract context usage extension](https://github.com/anomalyco/opencode/pull/47948)** — Context button, statistics, system-prompt display, and export move to `@opencode/plugin-context-desktop` behind a closed-by-default panel.
4. **[#47936 refactor(desktop): extract the browser extension package](https://github.com/anomalyco/opencode/pull/47936)** — Application of the new extension model to the in-app browser; isolates it from App/Desktop/Core imports.
5. **[#47286 fix(app): align desktop agent and model switching](https://github.com/anomalyco/opencode/pull/47286)** *(closed)* — Brings the #47260 switching semantics to the shared V2 renderer, persisting per-agent model/variant per session.
6. **[#47455 fix(app): link background subagents to their sessions](https://github.com/anomalyco/opencode/pull/47455)** — Subagent rows and timeline notices become real navigation links to child sessions, with parent-tab retention on Escape.
7. **[#47942 fix(mcp): preserve tool discovery failure details](https://github.com/anomalyco/opencode/pull/47942)** — Keeps the original `tools/list` error in MCP status/logs and avoids wiping cached tools on a failed refresh (closes #47644).
8. **[#46667 feat(ui): support loading a custom theme from a URL](https://github.com/anomalyco/opencode/pull/46667)** — Settings → General gains a "Custom theme URL" row for private `DesktopTheme` JSONs.
9. **[#47293 feat(core): add console web search](https://github.com/anomalyco/opencode/pull/47293)** — Registers a hosted Console v2 web-search descriptor with endpoint-ownership validation and redirect rejection.
10. **[#47257 feat(core): add keenable web search](https://github.com/anomalyco/opencode/pull/47257)** — Adds Keenable alongside Exa/Firecrawl/Parallel/Tavily using the same provider shape as `tavily.ts`.
11. **[#47640 feat: preview and text extraction for office files and pdf](https://github.com/anomalyco/opencode/pull/47640)** — Offline document preview plus text extraction for Office/PDF attachments — addresses a long-standing attachment-handling gap.
12. **[#42433 fix(opencode): preserve response model metadata](https://github.com/anomalyco/opencode/pull/42433)** — Keeps the AI SDK's structured model ID instead of arbitrary response headers (closes #42420).

## Feature Request Trends

- **Broader model coverage in Go/Zen**: Qwen3.8-27B (#42729), DeepSeek-v4-flash-free surfaced in the UI (#43805), broader DeepSeek V4 Pro billing transparency (#47934).
- **Multi-agent observability**: Agent Activity Panel (#27995), better linking from parent session to subagent sessions (#47455).
- **Desktop modularization & theming**: Custom theme URLs (#46667), transparent background toggle (#5657), extension-based split of review/context/browser (#47935/#47947/#47948/#47936).
- **Internationalization**: Persian README (#47783), Indonesian README (#47910), Italian copy fixes (#47941).
- **Safer automation controls**: Per-session reversible Yolo via ACP `configOptions` / `session/set_config_option` (#47918).
- **Richer attachments**: Office + PDF preview/extraction (#47640).
- **Quality-of-life TUI**: Token-speed indicator in the status bar (#47921), compact tab rail (#47938), clear-screen command (#47928), tool-call filtering on Markdown export (#47929).

## Developer Pain Points

- **Memory & stability**: The Memory Megathread (#20695), TUI `localeCompare` crash (#47903), and the v2 managed-server hang (#41696) all point to a stability tier that needs a dedicated engineering lane.
- **Subscription trust**: "Forbidden" on paid plans (#47787, #47777), rate-limit waits on Go (#47932), and unexpected DeepSeek V4 Pro charges (#47934) erode confidence in the billing surface.
- **Linux desktop fragility**: Clipboard never settling on X11/xclip (#43697) and silent success on GNOME Wayland with no helpers installed (#47900) — both surface after the fact, hiding real failures.
- **TUI/Desktop parity drift**: Auto-resume behavior contradicting documented `opencode -c` semantics (#47892), Desktop "stuck thinking" while TUI works (#19083).
- **Silent data persistence**: "Revert to this message" retaining the supposed-to-be-reverted state without telling the user (#47909) — a UX safety issue, not just a bug.
- **Permissions rigidity**: Agent plugins cannot grant access to specific skills under a root default-deny (#47946), and ACP-side per-session Yolo is still missing (#47918).
- **Compaction reliability**: Automatic compaction can surface a raw OpenAI `invalid_prompt` error and abort draining (#47939) instead of recovering.
- **Localization gaps**: Multiple CLOSED feature requests for full translations indicate the project still has no first-class i18n pipeline.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-08

## Today's Highlights

Pi saw a heavy bug-bashing day with **no new release** shipping, but a wave of provider-integration fixes (notably around the new OpenCode Go `x-opencode-session` header requirement and Z.AI reasoning handling) and TUI polish landed. Discussions highlight two new community projects building atop Pi: a desktop GUI (Eco Coding) and a context-memory tracing experiment. The longest-running community thread — Windows UX and packaging — continues to dominate engagement with 61 comments.

---

## Releases

_No new releases in the last 24 hours._

---

## Hot Issues

1. **#7547 — [Windows] How do you use Pi on Windows? What issues are you seeing?** (61 comments, 👍 2)
   The highest-traffic thread on the repo. Maintainers are actively soliciting a Windows usage survey to triage packaging bugs, docs gaps, and what should be delegated to extensions. Strong signal that Windows is an under-served platform with many latent users.
   https://github.com/earendil-works/pi/issues/7547

2. **#5363 — Add `amazon-bedrock-mantle` provider for OpenAI-compatible models** (inprogress, 19 comments, 👍 15)
   Most-liked issue. Adds a sibling to the existing `amazon-bedrock` provider for Bedrock Mantle models, which use an OpenAI-compatible endpoint and are incompatible with Converse. Community is keen on broader AWS Bedrock coverage.
   https://github.com/earendil-works/pi/issues/5363

3. **#8823 — Esc during streaming often fails to cancel in-flight request** (8 comments)
   A real UX regression: `stopReason: "aborted"` is persisted, but the HTTP request continues until the provider returns. Multiple reports, no upvotes yet — indicates it may be subtle to reproduce but matters to interactive users.
   https://github.com/earendil-works/pi/issues/8823

4. **#7010 — Normalize optional object tool schemas for OpenAI-compatible providers** (7 comments)
   `@earendil-works/pi-ai` ships tool schemas with `required` arrays that don't account for optional properties, breaking strict providers. Affects every chat-completions-style provider, so impact is broad.
   https://github.com/earendil-works/pi/issues/7010

5. **#8684 — `PI_OFFLINE` silently disables all provider model discovery** (6 comments)
   The flag's documented scope (startup housekeeping) diverges from implementation (kills all model-catalog fetches). A correctness + docs bug with concrete repro.
   https://github.com/earendil-works/pi/issues/8684

6. **#9290 — Extension API: `modelRegistry.complete()` doesn't send `x-opencode-session`** (closed)
   Closed quickly after a partner report (#9230). Caused every extension call into opencode-go models to fail with `MissingSessionID`. Worth noting as a fast turn-around on a breaking external change.
   https://github.com/earendil-works/pi/issues/9290

7. **#8706 — zai thinking handler sends `disabled` for forced-thinking GLM 5.3/5.3-flash, leaking reasoning** (closed)
   When users toggle `/thinking off`, the adapter still emits `thinking: {type: "disabled"}` on models whose thinking is mandatory, causing reasoning text to bleed into the final answer.
   https://github.com/earendil-works/pi/issues/8706

8. **#8928 — Parallel `pi` startup can report "No API key found" for ~48s when `auth.json` has an expired OAuth credential** (4 comments)
   Deterministic repro of a multi-process race where the error message points at the *active* provider even though the underlying cause is an unrelated expired OAuth record. Linked to #1871, #4919, #6880.
   https://github.com/earendil-works/pi/issues/8928

9. **#9055 — EventStream has quadratic CPU cost when draining buffered events** (closed)
   `shift()`-based dequeue becomes O(n) per element, which punishes long-running server workloads. Replaced with an index-pointer or linked structure.
   https://github.com/earendil-works/pi/issues/9055

10. **#8667 — Stale compaction entry permanently bricks the session (Anthropic 400 unexpected tool_use_id)** (3 comments, 👍 1)
    Auto-compaction can drop a `CompactionEntry` between an assistant `toolCall` and its `toolResult`, producing a mid-pair that Anthropic then rejects. A correctness bug with high blast radius for long sessions.
    https://github.com/earendil-works/pi/issues/8667

_Honorable mentions_: #9276 (grep tool OOM with context lines), #9267 (fuzzy session-search scan), #8700 (Mistral Medium `reasoning prompt mode` 400), #9230 (opencode-go session header — closed), #8706 closed for Z.AI.

---

## Key PR Progress

1. **#8635 — `fix(ai)`: preserve aborted stop reason during lazy setup** (open, fixes #8409)
   Threads the abort signal through lazy stream setup wrappers so that an abort before auth setup is reported as `aborted` rather than a generic error. Includes regression test.
   https://github.com/earendil-works/pi/pull/8635

2. **#9116 — `feat(ai)`: add mid-conversation system messages** (open)
   First half of the #8998 split — adds a system-message role to `pi-ai` so changes during a session (tool loadouts, prompt edits) can be communicated mid-stream rather than via prompt rewriting. Architectural.
   https://github.com/earendil-works/pi/pull/9116

3. **#9117 — `feat(coding-agent)`: deliver prompt/tool changes as system message deltas** (open)
   Second half of the split. Wires the coding agent to use the new system-message channel above, so subsequent requests only diff the changed tool list rather than re-emitting the whole system prompt. Big token-efficiency win.
   https://github.com/earendil-works/pi/pull/9117

4. **#8627 — Use `ctx.cwd` for cwd-sensitive tools** (closed)
   `read`, `write`, `edit`, `grep` (etc.) now resolve paths against `ctx.cwd` when extensions supply one, falling back to creation-time cwd. Aligns behavior with how the agent loop thinks about paths.
   https://github.com/earendil-works/pi/pull/8627

5. **#9316 — `fix(ai, coding-agent)`: three easy fixes (#8919, #8717, #8720)** (closed)
   Bundled PR: allows zero-row custom footers in fullscreen mode, plus two related small fixes. Convenient landing for low-risk cleanups.
   https://github.com/earendil-works/pi/pull/9316

6. **#9152 — DRAFT: forks streaming** (open)
   Streaming variant of the forks feature. Still WIP, but signals where the session-tree UX is heading.
   https://github.com/earendil-works/pi/pull/9152

7. **#9329 / #9307 — Detect Orca terminal as Kitty-image capable** (open/closed)
   Two near-duplicate PRs (one closed duplicate) recognizing `TERM_PROGRAM=Orca` for inline images, true color, and OSC 8 hyperlinks. PR #9329 is the surviving one.
   https://github.com/earendil-works/pi/pull/9329

8. **#7742 — `feat(ai)`: Ollama Cloud support** (open)
   Adds Ollama Cloud as an `OLLAMA_API_KEY`-based provider, leaving hybrid local+cloud flows to the `ollama launch pi` path. Long-pending community ask finally moving.
   https://github.com/earendil-works/pi/pull/7742

9. **#9301 — `feat(coding-agent)`: confirm device-code browser + clipboard actions** (open, fixes #9282)
   Brings back the "auto-open verification page / copy code to clipboard" convenience for device-code login (Copilot etc.) but as opt-in to avoid the regression that previously removed it.
   https://github.com/earendil-works/pi/pull/9301

10. **#256 — Implement XDG Base Directory Specification with auto-migration** (closed)
    XDG-compliant config/data/state dirs with one-shot migration from `~/.pi/`. Long-requested Linux/Unix hygiene improvement.
    https://github.com/earendil-works/pi/pull/256

_Honorable mentions_: #9297 (drop invalid Fable 5 fallback), #9319 (guard `MouseRegion.invalidate()` for extension components), #9310 (clear stale mouse selection on session switch), #9303 (resume before closing selector), #9292 (manual retry api/command).

---

## Hot Discussions

### Show and tell
- **#9327 — Eco Coding, a GUI for Pi (vision split, teams, browser, computer use + mobile)** — Open-source desktop GUI wrapping Pi's agent loop, adding dedicated vision channels, browser automation, and a mobile companion. Worth tracking if multi-modal routing and team workflows matter to you.
  https://github.com/earendil-works/pi/discussions/9327

### Ideas
- **#9312 — Pi Context Memory: tracing decisions back to the original conversation** — Experiments with preserving "why" across compaction. The problem framing (post-compaction, can the agent still justify earlier decisions?) is broadly applicable; idea-level discussion.
  https://github.com/earendil-works/pi/discussions/9312

---

## Feature Request Trends

Distilled from issues and discussions updated in the last 24h:

1. **Broader provider coverage & first-class OpenAI-compat adapters** — Amazon Bedrock Mantle (#5363), Ollama Cloud (#7742), LongCat (#9308). The community is consistently pulling Pi toward "any OpenAI-shaped endpoint should be plug-and-play."
2. **Better provider ergonomics** — Tool-schema normalization (#7010), forced-thinking detection (#8706), `PI_OFFLINE` scope clarity (#8684). These are not features per se but blockers that prevent new providers from being usable.
3. **Multi-modal / team workflows** — Eco Coding (#9327) signals demand for shared agents, vision routing, and GUI surfaces. No first-party roadmap yet, but the appetite is clear.
4. **Long-session correctness** — Compaction-related bugs (#8667, #6100) and context-memory research (#9312) show users want sessions that survive both length and time.
5. **Windows as a tier-1 target** — #7547 is the loudest signal that Windows packaging, docs, and bug-fixing need a dedicated track.
6. **TUI polish** — Mouse selection (#9310, #7973, #8744), terminal-capability detection (#9307, #9329), fullscreen configuration (#9315). Small UX wins that compound.
7. **Extension API completeness** — Header propagation (#9290, #9302), `cwd` propagation (#8627), mid-session system messages (#9116/#9117), window focus events (#2924). Extensions are becoming a first-class surface area, and the community is asking for parity with the native agent loop.

---

## Developer Pain Points

1. **External API changes break extensions silently.** The `x-opencode-session` header rollout (#9230, #9290, #9302) hit three different code paths in 24 hours and required coordinated fixes; this same pattern is likely to repeat with other evolving providers.
2. **Streaming control surface is fragile.** Esc-during-stream not reliably aborting (#8823), `EventStream` quadratic drain (#9055), and aborted stop reasons being lost during lazy setup (#8635) all point to a streaming layer that needs hardening before more provider integrations land on top of it.
3. **Auth and offline semantics are underspecified.** `PI_OFFLINE` doing more than documented (#8684), parallel startups blocking ~48s on stale OAuth (#8928), and tool schemas being rejected by strict providers (#7010) all stem from implicit behavior.
4. **Long sessions are a reliability minefield.** Compaction can brick sessions on Anthropic (#8667), grep with context OOMs the heap (#9276), fuzzy session search scans character-by-character (#9267). These scale with usage and are easy to underestimate.
5. **Windows is still a second-class experience.** The 61-comment thread (#7547) plus the related firehose of Windows-shaped bugs indicates a real developer-friction cost that no single PR can resolve.
6. **Extension authoring requires defensive coding.** `MouseRegion.invalidate` (#9319), boolean-flag positioning (#7139), `cwd` resolution (#8627), and steering-vs-prompt event semantics (#8718) all demonstrate that extensions must paper over missing or surprising native APIs.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-08

## Today's Highlights
Qwen Code shipped nightly **v0.23.0-nightly.20260907.f1ed3bc31a**, headlined by a new **Web Shell workflow visualization and dynamic run management** (PR #10594). Maintenance on **Windows ConPTY/PTY resource leaks** dominated the conversation — three related issues (#11303, #11352, #11353) hit P1 this week, with the long-running **Ink → OpenTUI TUI migration** (#8662) continuing to draw the deepest thread in the tracker.

## Releases
- **[v0.23.0-nightly.20260907.f1ed3bc31a](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.0-nightly.20260907.f1ed3bc31a)** — Web Shell gains dynamic workflow run visualization and management ([#10594](https://github.com/QwenLM/qwen-code/pull/10594)) plus session-derivation performance work; release notes auto-generated from `.github/release.yml`.

## Hot Issues

1. **[#8662 — Migrate TUI from ink to OpenTUI (tracking)](https://github.com/QwenLM/qwen-code/issues/8662)** · 33 comments · P3 · OPEN
   The single most-discussed tracker in the repo. Documents structural problems with the patched ink 7 + React 19 renderer (~1037-line patch) — flicker, layout breakage, alt-screen artifacts, and a brittle custom Virtual Viewport. OpenTUI is being scoped as the replacement.

2. **[#11119 — `qwen serve` background shell output silently dropped on session recycle](https://github.com/QwenLM/qwen-code/issues/11119)** · 10 comments · P1 · OPEN
   A `run_shell_command` background loop in a daemon-hosted Web Shell wedges the session: the shell keeps running and emitting output, but after the originating turn ends nothing reaches the client and no wake notifications fire. Core reliability issue for the daemon/web-shell stack.

3. **[#11303 — Windows VS Code Companion leaks headless conhost.exe ConPTY processes](https://github.com/QwenLM/qwen-code/issues/11303)** · 8 comments · P1 · OPEN · ready-for-human
   347 child processes / ~2.8 GB RAM after ~12h of qwen-cli uptime. Concrete repro from VS Code Companion, blocking for Windows integrators.

4. **[#11352 — node-pty leaks ConPTY host on natural shell exit (blocked)](https://github.com/QwenLM/qwen-code/issues/11352)** · 3 comments · P1 · OPEN
   Split out of #11303 because this half cannot be fixed from QC — `@lydell/node-pty` 1.2.0-beta.10 erases the baton before `onExit`, so JS can't reach `ClosePseudoConsole`. Awaiting upstream.

5. **[#11353 — `WebTerminalRegistry` holds PTY resources up to 15 min past exit](https://github.com/QwenLM/qwen-code/issues/11353)** · 2 comments · P2 · OPEN
   Second half of the PTY teardown story — independent of the host defect, this is about *when* release runs. Fixable on QC's side.

6. **[#10530 — 400 Failed to initialize samplers in 0.22.3](https://github.com/QwenLM/qwen-code/issues/10530)** · 6 comments · P2 · OPEN · ready-for-human
   Regression that broke Qwen 3.8 27b / Qwen 3.6 35b via llama-server (`failed to parse grammar`) — gemma4-12b unaffected. Important because it tells users that 0.22.x broke specific provider/model combinations.

7. **[#11335 — Web Shell transcript drifts off composer axis when turn-rail is visible](https://github.com/QwenLM/qwen-code/issues/11335)** · 4 comments · P3 · OPEN
   Cosmetic but visible to every user who completes a turn. Directly paired with fix PR #11338 below.

8. **[#10995 — `customHeaders` `${session_id}` template support](https://github.com/QwenLM/qwen-code/issues/10995)** · 3 comments · P1 (👍) · CLOSED
   Requested template substitution in `generationConfig.customHeaders` so per-conversation request headers can ride along. Shows integrators want fine-grained request tagging without per-request patching.

9. **[#11274 — Tracking: decouple daemon Skill management from child, in sub-1000-line PRs](https://github.com/QwenLM/qwen-code/issues/11274)** · 3 comments · P3 · OPEN
   Architectural split between daemon (dir/persistence/admin) and ACP child (config/execute/reporting). Three identified coupling points; staged delivery.

10. **[#11205 — Filter screen on `main` lost six hardenings from #10421's branch](https://github.com/QwenLM/qwen-code/issues/11205)** · 3 comments · P2 · OPEN
    Important security/reliability thread: read order, EACCES, U+FFFD handling, spawn timeouts, candidate cap, retention — all absent from the version that landed via #9742.

## Key PR Progress

1. **[#10594 — feat(web-shell): visualize and manage dynamic workflow runs](https://github.com/QwenLM/qwen-code/pull/10594)** — The headline nightly change. Surfaces running/completed workflow runs and their state in the Web Shell. (Merged into v0.23.0-nightly.20260907.)

2. **[#10347 — feat(core): auto-retry transient network errors (EOF) where Ctrl+Y is unavailable](https://github.com/QwenLM/qwen-code/pull/10347)** · review/self-reported, needs-human
   Reclassifies `400 network error ... EOF` (peer-closed mid-request) as a retryable transport error so the existing bounded auto-retry applies. Removes a dead-end where channel/API users were stranded without the Ctrl+Y escape hatch.

3. **[#10938 — feat(web-shell): Session Workflow dependencies navigable + chrome cleanup](https://github.com/QwenLM/qwen-code/pull/10938)** · autofix/takeover
   Closes the navigation/shape/doc gaps left by #8583. Plan DAG leads with the *step*, not its status — a meaningful interaction design shift.

5. **[#10410 — feat(core): preserve prompt cache for deferred tools](https://github.com/QwenLM/qwen-code/pull/10410)** · autofix/takeover
   Replaces deferred-tool schema revelation with a two-step `tool_search` + `tool_call` bridge. Cuts wasted prompt-cache invalidations on deferred tools.

4. **[#10457 — feat(dingtalk): native interactive cards for tool permission requests](https://github.com/QwenLM/qwen-code/pull/10457)** · review/self-reported
   DingTalk-side UX upgrade — attended permission prompts render as cards with allow/deny/persistent-allow, bound to the originating user and live run.

5. **[#11333 — feat(channels): add final-only and process output modes](https://github.com/QwenLM/qwen-code/pull/11333)**
   Adds a shared channel output-mode switch: **Final result only** (default, one delivery at turn end) vs **Process and results** (each complete assistant output delivered separately). Affects all integration channels.

6. **[#11341 — fix(web-shell): require answers before submitting questions](https://github.com/QwenLM/qwen-code/pull/11341)**
   Disables Submit until every Web Shell question has a non-whitespace answer; applies the same gate to Enter / Ctrl+Enter. Preserves cancel + retry-after-failure.

7. **[#11338 — fix(web-shell): keep transcript column on composer axis while turn-rail is visible](https://github.com/QwenLM/qwen-code/pull/11338)** · review/self-reported
   Direct fix for #11335 — moves the rail into flow next to the scroller so centering re-anchors correctly.

8. **[#11342 — feat(web-shell): model role and context window configuration](https://github.com/QwenLM/qwen-code/pull/11342)**
   Web Shell Settings grows a per-role model picker (Advisor / image / voice) with sensible defaults and endpoint-aware behavior, including custom-provider paths.

9. **[#10188 — fix(autofix): charge regressions to the brake and gate test weakening](https://github.com/QwenLM/qwen-code/pull/10188)** · autofix/takeover
   Closes two holes where a round could ship a regression for free. Brings cost accounting in line with the loop's stated guarantees.

10. **[#11134 — fix(ci): retry transient all-green macOS E2E shard death once (#11131)](https://github.com/QwenLM/qwen-code/pull/11134)** · review/self-reported, needs-human
    Ports the Linux `sandbox:none` retry pattern (#10572) onto macOS shards — single, budget-gated retry after failure. Targets the recurring macOS E2E flake.

11. **[#9983 — fix(review): keep host-trusted state out of the container's writable surface](https://github.com/QwenLM/qwen-code/pull/9983)** · autofix/takeover
    Moves worktree leases out of `.qwen/tmp` (rw bind-mount) and stops host-side git from resolving through a pointer that lives inside it. Hardens the review sandbox boundary.

## Feature Request Trends

- **Web Shell polish + integrator surfaces.** Five+ open requests cluster around Web Shell as a productizable surface: custom branding (#11357), hosting a custom Web Shell distribution on `qwen serve` (#11358), consolidated REST/SSE docs for integrators (#11359), and session-live-state SSE subscriptions (#11327). The daemon is being treated as a *platform* by external integrators.
- **Per-conversation / per-request context in transports.** The `${session_id}` template in `customHeaders` (#10995) is the leading edge — integrators want stable IDs that ride on every outbound request without per-call plumbing.
- **Channel output semantics.** "Final-only vs Process and results" (#11333) signals a real divergence in how downstream channels want to consume agent output; expect this distinction to spread.
- **Skill lifecycle and daemon/child decoupling.** #11274 formalizes a long-running complaint: Skill state is currently entangled across daemon + ACP child.
- **TUI rendering replacement.** The Ink→OpenTUI migration (#8662) is the largest single architectural request on the board and keeps attracting focused comments.

## Developer Pain Points

- **Windows PTY lifecycle is the loudest current pain.** Three linked issues (#11303, #11352, #11353) cover process leaks, host-handle loss on natural exit, and late resource release — and at least one (#11352) cannot be fixed without an upstream `node-pty` change. VS Code Companion users feel this first.
- **Session/background-shell reliability in `qwen serve`.** #11119 — output and wake notifications disappear when the session runtime recycles. Background automation workflows (CI polling, scheduled tasks) are first in line.
- **Provider/model regressions ship silently.** #10530 broke two specific Qwen models via llama-server in 0.22.3 — exactly the kind of narrow regression that's hard to catch in CI without a model matrix.
- **CI flakiness on macOS and E2E.** Multiple bots report CI failures (#11367, #11364, #11307); PR #11134 and #11094 are the dedicated deflake work.
- **Upstream-anchored defects with no local fix path.** #11352 (node-pty) and parts of #11303 are explicitly flagged as blocked by pinned dependencies — developers want a clearer story for when "fix in our repo" turns into "fix upstream and bump".
- **Small UI drifts that look like regressions.** Transcript-column alignment (#11335) and sidebar group nesting (#11354) both surfaced within 24h — dogfooding is finding the seams between newly-added chrome (turn rail, group headers) and existing content layouts.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*