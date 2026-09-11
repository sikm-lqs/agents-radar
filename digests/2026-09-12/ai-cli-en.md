# AI CLI Tools Community Digest 2026-09-12

> Generated: 2026-09-11 23:30 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report — AI CLI Ecosystem, 2026-09-12

## 1. Ecosystem Overview

The AI CLI category has fully matured from terminal wrappers into multi-surface agent platforms — every major tool now spans CLI, desktop app, IDE extension, and cloud/remote execution, with the desktop surface generating a new class of lifecycle bugs (process leaks, update staging, file locks). Iteration cadence has bifurcated: OpenAI Codex is shipping 7 releases/day on alpha lines while Anthropic and GitHub hold slower, stable versioning with episodic feature drops. Community demand is converging on four fronts: agent governance (loop protection, cost caps, honest telemetry), portable memory/sessions, plugin & skill standardization, and Windows parity — the last remaining a shared gap across all seven tools. Meanwhile, Claude Code conventions (hooks, `AGENTS.md`, `SKILL.md`) are becoming the de facto interop contract that Qwen Code, OpenCode, and Copilot CLI are explicitly aligning to.

## 2. Activity Comparison

| Tool | Hot Issues (24h) | PR Activity (24h) | Discussions (24h) | Release Status |
|---|---|---|---|---|
| Claude Code | 10 (+4 notable closed) | 1 — unusually quiet | — † | v2.1.269 shipped |
| OpenAI Codex | 10 (+4 mentions) | 17 merged/updated | 14 (6 ideas, 8 showcase) | **7 releases** (0.155.0-alpha.3.x line + 0.154 patch) |
| Gemini CLI | 10 | 10 | — † | 1 nightly (0.61.0 line) |
| Copilot CLI | 10 (+2 mentions) | 0 reported | — † | v1.0.84-5 shipped |
| OpenCode | 10 | 10 | — † | None |
| Pi | 10 | 10 | — † | None |
| Qwen Code | 9 | 10 | — † | 1 nightly (0.23.3) |

† No Discussions data was provided for these repos in this window; several route all community traffic through Issues, so this is marked N/A rather than counted as inactivity.

**Peak engagement signals:** Claude Code #42776 (177 comments, ~5 months open — the largest single thread in this set), Pi #7547 (62 comments, Windows strategy hub), Codex #30408 (37 comments, 9+ GB MCP leak), Codex discussion #9618 (132 👍, rewind/undo). Highest upvoted issues per repo: Codex 132 👍, Claude #25947 39 👍, OpenCode #27110 32 👍, Copilot #4095 21 👍.

## 3. Shared Feature Directions

- **Session rewind/undo & history portability** — Codex's `/rewind` ask (132 👍, plus `thread/revert` consolidation in PR #44915), OpenCode's "undo message but keep file changes" (#7963, 12 👍), Copilot's just-shipped semantic JSONL session/memory import, and Qwen's session-metadata stability work (#11574, #11545). Common need: *selective* undo (conversation vs. filesystem) and upgrade-safe history.
- **Persistent, project-scoped memory** — Claude #25947 (39 👍, project-local `.claude/memory/`), Copilot #2436 (cross-session querying), Gemini's on-disk memory CRUD push (#18836, #21335) and Auto Memory redaction (#26525). Direction: gitignore-able, portable, version-controllable state.
- **Subagent/agent-loop governance** — Gemini's false "success" after MAX_TURNS (#22323) and generalist hangs (#21409); OpenCode's 364-call infinite grep loop (#45442) and parallel-subagent limits (#27110, 32 👍 — its top-voted issue); Claude's 4-day PR-watch budget drain (#77310); Codex's measured cost of false goal continuations (#44909). Universal demand: loop detection, hard cost/turn ceilings, and trustworthy termination telemetry.
- **Windows & desktop parity** — the only theme present in **all seven** digests: Claude #42776/#89992, Codex #40968/#43596, Copilot #4095 (21 👍)/#3700/#4652, Pi #7547 + PRs #9501/#9504, Qwen #9693/#11352, OpenCode's Windows signing sprint, Gemini's Windows sandbox git-arg validation.
- **Plugin/skill standards & hooks interop** — Claude ships `claude plugin eval` (marketplace QA infrastructure); Qwen explicitly targets hooks parity with Claude Code (#11610); OpenCode requests the Agent Plugins spec (#40993, 12 👍); Copilot is hardening `SKILL.md`/`AGENTS.md` semantics (#4438, #4822); Codex has a community SKILL.md→plugin converter.
- **Sandboxing & prompt-injection hardening** — Gemini's zero-dependency OS sandboxing epic (#19873) plus injection-defense PRs (#29250); Codex's Windows MXC sandbox PRs; Claude's Cowork VM regressions (#93507, #93221); Copilot's broken `--sandbox` on Windows 25H2.
- **MCP lifecycle & conformance** — Copilot's non-standard `server/discover` pre-init (#4370), OAuth callback mismatch (#4795), and resume-time connection teardown (#4753); Codex's 9+ GB per-thread MCP process leak (#30408); Qwen's STDIO failures and pooled-connection recovery (#9693, #11392); Claude's connector scoping leak across worktrees (#93722).

## 4. Differentiation Analysis

- **Claude Code** — Furthest along on *governance and ecosystem QA*: plugin eval scoring, output-style parity across local/cloud/remote. Enterprise- and compliance-oriented (rules enforcement #82184, proxy/CA networking issues). Slowest visible PR throughput but deepest issue backlog.
- **OpenAI Codex** — Highest velocity and broadest surface ambition: voice conversations promoted to stable, multi-account session lifecycle, Computer Use, personality→fixed model instructions. Consumer-desktop-first; alpha churn produces regression clusters (macOS renderer crashes, Windows send-button hangs).
- **Gemini CLI** — Most disciplined *security engineering* sprint: filesystem isolation, OAuth persistence, injection defenses, sandbox-denial bypass fixes, all in one window. Distinctive token-economics focus (AST-aware reads to cut ~36k tokens/turn).
- **Copilot CLI** — Leverages GitHub/VS Code entanglement; differentiates on *portable state* (semantic JSONL interchange) and cost-tier flexibility (OpenAI Flex tier request). Weakest on MCP spec conformance and Windows/WSL reliability.
- **OpenCode** — Provider-agnostic open-source play (vLLM auto-discovery, Go/Zen usage APIs, multi-provider metadata). Currently absorbing v1→v2 migration pain and billing-trust incidents; community pushes interoperability standards hardest.
- **Pi** — Lean, extension-API-centric core for tinkerers and local-model users (vLLM/llama.cpp sampling params, Bedrock Mantle). Shipping foundational architecture (mid-conversation system-message deltas) rather than features; small but high-signal community with core-dev participation (mitsuhiko).
- **Qwen Code** — Ecosystem-specific integration play: DashScope conversation caching, DingTalk channels, Chrome Native Messaging browser relay, VS Code companion. Carries the largest telemetry-privacy debt (three independent leak vectors).

## 5. Community Momentum & Maturity

**Momentum leaders:** OpenAI Codex is the clear velocity leader (7 releases, 17 PRs, 14 discussions in 24h) — but alpha-grade, with regression clusters as the cost. Gemini CLI shows the healthiest engineering rhythm (nightly + 10 substantive security PRs with rigorous p1/p2 triage).

**Depth over volume:** Claude Code has the most mature issue base — a 177-comment, 5-month thread signals sustained enterprise usage, and shipping eval infrastructure marks ecosystem maturation — though its PR pipeline was notably quiet today. Pi punches above its weight: a 62-comment strategy thread and stacked foundational PRs from core maintainers.

**Watch items:** OpenCode is mid-migration (v1→v2 regressions, billing sync failures eroding payer trust); Copilot CLI shows steady releases but zero visible PR activity and regression-heavy Windows/WSL coverage; Qwen Code has active engineering but accumulating CI and privacy hygiene debt.

## 6. Trend Signals

1. **The CLI-to-desktop shift is generating a new failure taxonomy** — process/disk leaks (Codex: 9 GB RSS, 559 GB staging), update-staging collisions (Claude MSIX, OpenCode signing), and file locks. Vendors that harden desktop lifecycle first will win long-session users.
2. **"Trust telemetry" is becoming a product requirement** — three tools independently reported agents falsely claiming success (Gemini, OpenCode, Codex). Expect verification layers to proliferate: Claude's plugin eval, community stop-hooks (`isitdone`), Pi's eval-driven docs.
3. **Interoperability is standardizing on Claude Code conventions** — hooks, `AGENTS.md`, `SKILL.md`, and the Agent Plugins spec. Writing extensions against these contracts is currently the safest portability bet.
4. **Memory is becoming a portable artifact** (Copilot's JSONL interchange, Claude's project-local ask) — plan for agent state you can export, diff, and version-control.
5. **Telemetry privacy is under scrutiny** ("off-by-default or prove redaction" — Qwen's three leak vectors, Gemini's Auto Memory redaction). Audit egress before pointing agents at credentials.
6. **Windows remains the shared gap** — an enterprise differentiation opportunity for whichever vendor closes it first.

**Practical guidance:** pin versions on Codex alpha lines; never trust subagent success status without external verification (tests/hooks); wrap long-running agents in explicit budget caps; and factor platform (Windows/WSL) heavily into tool selection today.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — Community Highlights Report
*Data snapshot: 2026-09-12 · Source: github.com/anthropics/skills*

---

## 1. Top Skills Ranking (Most-Discussed PRs)

The PR list reflects activity by recency, impact, and linkage to high-traffic Issues (PR comment counts were not surfaced in this snapshot, so ranking is derived from the prominence of the issues addressed, contributor engagement, and freshness).

### 1.1 [PR #1298] `skill-creator` — repair `run_eval.py` (0% recall bug)
- **What:** Fixes the description-optimization loop that currently optimizes against noise. Addresses Windows stream reading, trigger detection, parallel worker reliability, and installs the eval artifact as a real skill.
- **Discussion highlight:** Resolves the long-running [#556](https://github.com/anthropics/skills/issues/556) (12 comments, 10+ independent reproductions) — the single most-reported skill-creator bug.
- **Status:** OPEN (active since 2026-06-10, last updated 2026-09-11).
- 🔗 https://github.com/anthropics/skills/pull/1298

### 1.2 [PR #210] `frontend-design` — clarity & actionability overhaul
- **What:** Rewrites the frontend-design skill so every instruction is actionable within a single conversation; removes ambiguous guidance.
- **Discussion highlight:** One of the longest-standing open skill-quality improvements (open since 2026-01-05; latest activity 2026-03-07), reflecting sustained community interest in design-output quality.
- **Status:** OPEN.
- 🔗 https://github.com/anthropics/skills/pull/210

### 1.3 [PR #83] `skill-quality-analyzer` + `skill-security-analyzer` (marketplace meta-skills)
- **What:** Two meta-skills that evaluate any Claude Skill across five quality dimensions (Structure, Examples, Robustness, Performance, Maintainability) and perform security analysis.
- **Discussion highlight:** Directly addresses the community's #1 concern (Issue [#492](https://github.com/anthropics/skills/issues/492), 43 comments) around skill trust boundaries. Sits at the intersection of "quality" and "security" — the two dominant themes in the repo.
- **Status:** OPEN (since 2025-11-06).
- 🔗 https://github.com/anthropics/skills/pull/83

### 1.4 [PR #1367] `self-audit` — mechanical verification + reasoning quality gate
- **What:** A skill that audits AI output before delivery — mechanical file verification first, then a four-dimension reasoning audit in damage-severity order.
- **Discussion highlight:** Closely tracks the proposal in Issue [#1385](https://github.com/anthropics/skills/issues/1385) (4 comments) for a three-gate Reasoning Quality Pipeline. Universal, framework-agnostic.
- **Status:** OPEN (since 2026-06-28).
- 🔗 https://github.com/anthropics/skills/pull/1367

### 1.5 [PR #1628] `Hivemind` — zero-cost multi-agent orchestration
- **What:** Lets Claude Code delegate mechanical sub-tasks to headless [opencode](https://opencode.ai) workers running on free models, while Claude Code retains planning/review/merge control.
- **Discussion highlight:** Frames cost as a *context-budget* problem rather than a *capability* problem — a notable architectural framing for skills composition.
- **Status:** OPEN (since 2026-08-21).
-  https://github.com/anthropics/skills/pull/1628

### 1.6 [PR #514] `document-typography` — typographic quality control for generated documents
- **What:** Prevents orphan word wrap, widow paragraphs, and numbering misalignment in AI-generated documents — issues that affect every document Claude produces.
- **Discussion highlight:** Demonstrates the community's appetite for *output-quality* skills, complementing the existing `pdf`/`docx`/`pptx` skills.
- **Status:** OPEN (since 2026-03-04).
- 🔗 https://github.com/anthropics/skills/pull/514

### 1.7 [PR #1615] `scnet-hpc` — SCNet HPC cluster operations
- **What:** Profile-based SSH + Slurm workflows for SCNet HPC clusters, including job generation, cluster discovery, partition/module/memory guidance.
- **Discussion highlight:** Representative of the growing wave of *vertical / domain-specific* skills (HPC, finance, governance) being proposed for the marketplace.
- **Status:** OPEN (since 2026-08-20).
-  https://github.com/anthropics/skills/pull/1615

### 1.8 [PR #486] `ODT` — OpenDocument text creation & ODT↔HTML conversion
- **What:** Triggers on any mention of ODT, ODS, ODF, OpenDocument, or LibreOffice; supports creation, template filling, and HTML conversion.
- **Discussion highlight:** Extends the document-skill family beyond MS Office formats into ISO-standard open formats.
- **Status:** OPEN (since 2026-03-01).
-  https://github.com/anthropics/skills/pull/486

---

## 2. Community Demand Trends (Issues)

The Issues board surfaces **four clear demand vectors**:

### 2.1 Trust, Security & Namespace Integrity — 🔥 highest-volume signal
- **[#492](https://github.com/anthropics/skills/issues/492)** (43 comments, 2 👍): Community skills distributed under `anthropic/` namespace create trust-boundary abuse. **The single most-discussed issue in the repo.**
- **[#1175](https://github.com/anthropics/skills/issues/1175)** (4 comments, closed): SharePoint Online + skill-based access-control security concerns.
- **[#412](https://github.com/anthropics/skills/issues/412)** (6 comments, closed): Proposal for an `agent-governance` skill (policy enforcement, threat detection, audit trails).

### 2.2 Discovery, Distribution & Skill Lifecycle
- **[#228](https://github.com/anthropics/skills/issues/228)** (16 comments, 8 👍): Org-wide skill sharing in Claude.ai — currently requires manual download/upload round trips.
- **[#189](https://github.com/anthropics/skills/issues/189)** (6 comments, 9 👍): `document-skills` and `example-skills` plugins ship duplicate content, polluting the context window.
- **[#62](https://github.com/anthropics/skills/issues/62)** (10 comments): Users losing custom skills after file/folder renames — no persistence guarantees.

### 2.3 Skill-Creator & Evaluation Infrastructure Reliability
- **[#556](https://github.com/anthropics/skills/issues/556)** (12 comments, 7 👍): `run_eval.py` reports 0% trigger rate across all queries.
- **[#1390](https://github.com/anthropics/skills/issues/1390)** (4 comments): `mcp-builder` evaluation scores 0/N against any real MCP server.
- **[#1487](https://github.com/anthropics/skills/issues/1487)** (4 comments): `claude-api` skill eagerly injects ~156k tokens, blowing the context window.
- **[#202](https://github.com/anthropics/skills/issues/202)** (8 comments, closed): `skill-creator` reads as developer docs, not an executable skill.

### 2.4 New Capability Directions (proposals)
- **[#1329](https://github.com/anthropics/skills/issues/1329)** (9 comments): `compact-memory` — symbolic notation for compact long-running agent state.
- **[#1385](https://github.com/anthropics/skills/issues/1385)** (4 comments): Reasoning Quality Gate Pipeline (pre-task calibration → adversarial review → delivery verification).
- **[#16](https://github.com/anthropics/skills/issues/16)** (4 comments): Expose Skills as MCPs so skill capabilities become discoverable tool APIs.
- **[#29](https://github.com/anthropics/skills/issues/29)** (4 comments): Skills on AWS Bedrock — interop request.

---

## 3. High-Potential Pending Skills (likely to land soon)

These PRs are active, technically focused, and address high-traffic issues — strong candidates for imminent merge.

| PR | Skill / Change | Why it's close | Link |
|---|---|---|---|
| #1298 | `skill-creator` eval pipeline overhaul | Resolves the most-reproduced skill-creator bug (#556, 12 comments) | https://github.com/anthropics/skills/pull/1298 |
| #1742 | `mcp-builder`: `mcp>=2` `streamable_http_client` + custom headers | Compatibility fix for an actively-used dependency | https://github.com/anthropics/skills/pull/1742 |
| #1724 | `mcp-builder`: default eval model → claude-sonnet-5 | Routine model-bump update | https://github.com/anthropics/skills/pull/1724 |
| #1607 | `claude-api`: mark 4 retired model IDs as retired | Clean-up tied to issue #1603 | https://github.com/anthropics/skills/pull/1607 |
| #1602 | Evaluation serialization / encoding / script stability fixes | Aggregates multiple reliability bugs in one PR | https://github.com/anthropics/skills/pull/1602 |
| #1099 / #1050 | `skill-creator` Windows compatibility | Two parallel attempts to fix the same Windows-blocking bug | https://github.com/anthropics/skills/pull/1099 · https://github.com/anthropics/skills/pull/1050 |
| #538 / #541 / #539 | `pdf` / `docx` / `skill-creator` correctness fixes | All small, well-scoped fixes from a single active contributor | https://github.com/anthropics/skills/pull/538 · https://github.com/anthropics/skills/pull/541 · https://github.com/anthropics/skills/pull/539 |

---

## 4. Skills Ecosystem Insight

> **The community's most concentrated demand is for meta-skills that secure, audit, and govern the Skills ecosystem itself** — namespace trust (#492, 43 comments), skill quality/security analysis (PR #83), reasoning quality gates (PR #1367 / Issue #1385), and agent governance (Issue #412) — making "trust & quality assurance" the defining theme of the current Skills discourse, ahead of new domain capabilities or workflow automations.

---

# Claude Code Community Digest — 2026-09-12

## Today's Highlights

- **v2.1.269 shipped** with `claude plugin eval` (a new subcommand that runs a plugin's eval suite against Claude Code and produces scored JSON + HTML reports) and the `/output-style [name]` slash command for listing and switching output styles across Remote Control, cloud, and "ot" contexts.
- **macOS Cowork sandbox regression** (Issue #93507, since 2026-09-10 ~23:15 UTC) is the highest-profile active incident: VMs come up with no network route except local and the cloud egress proxy returns 403 for every domain even with "All domains" enabled — multiple follow-up issues surfaced in the same 24-hour window.
- The long-running **Windows Desktop relaunch/Orphaned process file lock** thread (#42776) crossed 177 comments and remains the most-trafficked open bug, sustaining community attention for ~5 months.

---

## Releases

**v2.1.269** (latest, last 24h)

- **`claude plugin eval`** — run a plugin's eval suite against Claude Code and get scored, reproducible results in both JSON and HTML report formats. Run `claude plugin eval --help` for options. (Likely aimed at plugin authors and Anthropic's plugin marketplace reviewers.)
- **`/output-style [name]`** — slash command to list and switch output styles. Works over Remote Control and in cloud and ot[her] contexts. (Release note appears truncated.)

Full changelog: github.com/anthropics/claude-code/releases/tag/v2.1.269

---

## Hot Issues

1. **#42776 — Claude Code Desktop fails to relaunch on Windows due to orphaned process file lock** (177 comments, 88 👍)
   *Why it matters:* The single most-discussed bug in the repo. Windows users are left unable to restart the desktop app cleanly because an old process retains a file lock. Sustained activity for half a year signals an architectural fix is needed, not a patch. [Link](https://github.com/anthropics/claude-code/issues/42776)

2. **#11897 — Claude Code on the Web .NET SDK binary downloads blocked by proxy even with "All domains" enabled** (21 comments, 25 👍)
   *Why it matters:* Cloud sandbox egress is supposed to honor the user's domain allow-list, but the .NET SDK bypasses it. High 👍/comment ratio shows strong user agreement this is a real regression, not a config error. [Link](https://github.com/anthropics/claude-code/issues/11897)

3. **#93507 — Cowork macOS: local sandbox VM has no network route and cloud egress proxy returns 403** (9 comments, 1 👍)
   *Why it matters:* Fresh regression explicitly timestamped to 2026-09-10 ~23:15 UTC — the cloud sandbox is effectively unusable on macOS. Triaged with repro + networking/sandbox labels. [Link](https://github.com/anthropics/claude-code/issues/93507)

4. **#25947 — Feature request: store project memory in project-local `.claude/memory/`** (9 comments, 39 👍)
   *Why it matters:* The highest-upvoted enhancement of the week. Project memory currently lives at `~/.claude/projects/<encoded-path>/memory/`, breaking portability and version-controllability. 39 👍 versus 9 comments indicates quiet, strong agreement. [Link](https://github.com/anthropics/claude-code/issues/25947)

5. **#93221 — Connected folders never mount inside VM: host reports Plan9 share added successfully, guest sees none** (8 comments, 1 👍)
   *Why it matters:* Cowork's mount/folder-flow is broken end-to-end on Windows + cowork. Pairs with #93507 as a cluster of Cowork regressions being surfaced this week. [Link](https://github.com/anthropics/claude-code/issues/93221)

6. **#82184 — Project rules treated as advisory: enforcement hooks self-neutralize, compaction drops governance while preserving narrative, auto-memory outranks project instructions** (3 comments, 0 👍)
   *Why it matters:* Substantive governance/control-plane report covering three distinct failure modes (hook self-neutralization, governance loss in compaction, auto-memory precedence). Author references multiple related issues. Important for any team relying on `.claude/rules*` for compliance. [Link](https://github.com/anthropics/claude-code/issues/82184)

7. **#89992 — Windows MSIX auto-update terminates running app — "Another program is currently using this file"** (5 comments, 1 👍)
   *Why it matters:* Documents that Electron 42 / Node 24 auto-update staging collides with the still-running MSIX process. Concrete versions (1.32352.x, 1.37937.1→.2→.3) make this actionable for maintainers. [Link](https://github.com/anthropics/claude-code/issues/89992)

8. **#93707 — Remote machine SSH fails with "No route to host" because TCC-disclaimed subprocess lacks Local Network permission** (2 comments, 0 👍)
   *Why it matters:* A real macOS-platform story (TCC / Local Network entitlement) that blocks SSH-to-LAN workflows in the desktop app. Worth watching as Apple expands Local Network enforcement. [Link](https://github.com/anthropics/claude-code/issues/93707)

9. **#93722 — Worktree sessions reload every claude.ai connector; per-project disable list does not follow worktrees** (1 comment, 0 👍)
   *Why it matters:* MCP/connector scoping model leaks across worktrees, and there's no settings-file key to suppress app-injected connectors. Practical for any team standardizing connector allow-lists per repo. [Link](https://github.com/anthropics/claude-code/issues/93722)

10. **#80846 — Plan mode: every read-only Bash command still requires manual approval — no auto-approve option** (1 comment, 2 👍)
    *Why it matters:* Plan mode's stated purpose is read-only exploration, yet there's no way to auto-approve `git log`, `jq`, etc. Friction multiplier for anyone using Plan mode as an inspection tool. [Link](https://github.com/anthropics/claude-code/issues/80846)

*Other notable activity (all closed/stale this window, but useful context): #85979 (persistent ECONNRESET on v2.1.228), #78834 (ugrep allocates 4–17 GB for bounded `.{N}` patterns), #77310 (unbounded hourly PR-watch check-in drained session budget over 4 days), #72714 (`/worktree` silently writes `core.hooksPath` into the main repo's shared `.git/config`).*

---

## Key PR Progress

Only **one PR** was updated in the repository in the last 24 hours, so the full list is short:

1. **#42205 — fix(hookify): normalize tool matcher parsing** (closed)
   - **Author:** Balajitechlabs
   - **What it does:** Trims matchers and normalizes each `OR` segment so patterns like `Edit space-or Write` compare correctly. Previously values were split but not trimmed before comparison.
   - **Status:** Closed (merged or superseded — author/reviewer not shown). Small but correctness-critical fix for anyone writing `hookify` config with whitespace.
   [Link](https://github.com/anthropics/claude-code/pull/42205)

*(No other PRs updated in the 24-hour window — pace was unusually quiet on the PR side even as issue activity was elevated.)*

---

## Feature Request Trends

Distilled from open Issues and enhancement labels in the 24-hour window:

1. **Project-scoped configuration** — Two requests point at the same gap:
   - Memory files stored under the global `~/.claude/projects/.../memory/` path instead of `<project>/.claude/memory/` (#25947, 39 👍).
   - Session/chat history keyed to the absolute filesystem path with no continuity when the folder is moved or renamed (#84918).
   → Direction: make Claude Code's state **project-local, gitignore-able, and portable** by default.

2. **Plan mode ergonomics** — Read-only Bash still triggers manual approvals (#80846). Direction: introduce a read-only allowlist and/or auto-approve flag for Plan mode.

3. **Enforceable project rules / governance** — #82184 argues for a real enforcement layer (hooks that don't self-neutralize, governance text surviving compaction, project rules outranking auto-memory). Direction: a first-class "rules are mandatory, not advisory" semantics.

4. **Plugin authoring surface area** — v2.1.269's `claude plugin eval` suggests a build-out (eval + scoring reports). Expect follow-ups: better plugin docs, hook introspection, marketplace grading.

5. **Output-style ergonomics** — The new `/output-style [name]` slash command and cross-context support (Remote Control, cloud, ot) suggest upcoming parity work between local and remote/cloud surfaces.

---

## Developer Pain Points

Recurring themes across the 24-hour window's open + recently-closed issues:

- **Windows desktop fragility.** The relaunch/MSIX/Code-tab triad (#42776, #89992, #86576) shows Windows users are disproportionately affected by lifecycle, packaging, and update-channel bugs. File-lock and MSIX-staging problems indicate the install model needs hardening.

- **macOS Cowork / TCC / Local Network regressions.** #93507, #93221, #93707, #80291, and the persistent EPERM/iCloud issue cluster around macOS sandboxing boundaries. Cloud/VM sandboxes that lose networking or fail to mount host folders are blocking core workflows.

- **Cost & runaway agents.** #77310 (hourly PR-watch self-check-in drained usage over 4 days with no cycle/cost ceiling) is a textbook agent-loop-without-guardrails incident. Expect more requests for hard usage caps on `send_later`-style harnesses.

- **Governance and rule enforcement.** #82184 captures a structural frustration: project rules feel advisory once hooks, compaction, and auto-memory start interfering. Teams that need compliance-grade guarantees are being asked to build workarounds.

- **Path-coupled state.** Memory and session history that follow the absolute folder path (no continuity after rename/move) frustrate anyone reorganizing repos or syncing via cloud drives.

- **Tooling bugs that disable adjacent tooling.** `/worktree` overwriting global `core.hooksPath` (#72714), ugrep OOMing on small files (#78834), `pkill -f` matching Claude's own bash wrapper (#93607) — each one is small individually, but together they erode trust in "Claude touched my git/tooling state."

- **Proxy / enterprise networking.** #11897 (cloud sandbox .NET SDK bypasses allow-list) and #86349 (MCP HTTP pre-check hangs with custom CA) signal that enterprise users continue to fight Claude Code's networking assumptions.

*Stale/closed volume is high this window* — a large share of recently-closed items carry the `stale` label. This is consistent with Anthropic's periodic triage sweeps and is a reminder that users should re-open or comment on stale issues if they reproduce, especially on the Windows-desktop and Cowork regressions.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-12

## Today's Highlights

Heavy alpha iteration continues with **7 new releases in 24 hours** centered on the `rust-v0.155.0-alpha.3.x` line, alongside a `0.154.0-alpha.6.2` patch. The most pressing community concern is a long-running **MCP server process leak in the desktop app** (consuming 9+ GB RSS), while the merge queue shows focused work on **TUI/voice quality-of-life fixes**, **Windows MXC sandbox hardening**, and **app-server API expansions** (account session lifecycle, disabled plugin settings, model access programs).

---

## Releases

- [`rust-v0.155.0-alpha.3`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.3) — Main line of the 0.155.0 alpha cycle
- [`rust-v0.155.0-alpha.3.7`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.3.7), [`.3.8`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.3.8), [`.3.9`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.3.9), [`.3.10`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.3.10) — Rapid follow-up patches on the .3 line
- [`rust-v0.155.0-alpha.2.3`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.2.3) — Backport track
- [`rust-v0.154.0-alpha.6.2`](https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.6.2) — Latest 0.154 patch for the previous alpha branch

The release notes were not populated in this data set, but the volume of `.3.x` releases strongly suggests hotfixing regressions uncovered by broader alpha testing — including Windows sandbox failures and a macOS renderer crash (see Hot Issues).

---

## Hot Issues

1. **[#30408 — MCP server processes leak: per-thread processes never cleaned up (9+ GB RSS)](https://github.com/openai/codex/issues/30408)** — 37 comments. Critical resource leak: `codex app-server` spawns global MCP processes per thread/conversation but never kills them on archive/close. Affects macOS Apple Silicon on 0.142.3+. A major stability complaint.

2. **[#40968 — Windows Codex desktop: Send button spins forever, prompts never submit](https://github.com/openai/codex/issues/40968)** — 36 comments. Blocks basic chat on Windows 11 build 26200 for Pro users; persistent follow-up regression.

3. **[#44720 — "ChatGPT hit a snag" bug reproduce](https://github.com/openai/codex/issues/44720)** — 31 comments, now closed. Mass-reproduced client crash on `26.908.31457` (macOS, 20x Pro). Strong correlation with [#44824] and [#44743] below.

4. **[#18693 — Desktop performance collapses with large local conversation histories](https://github.com/openai/codex/issues/18693)** — 20 comments, 9 👍. Long-standing issue: profiles with a few huge threads degrade typing, scrolling, thread list, and trigger random exits.

5. **[#42435 — Windows app reasoning effort resets from Extra High to Instant](https://github.com/openai/codex/issues/42435)** — 14 comments. Settings persistence regression on Windows Business builds.

6. **[#43596 — Windows Computer Use cannot access native apps: empty app inventory, sky RPC unavailable](https://github.com/openai/codex/issues/43596)** — 10 comments. Severely limits Computer Use utility on Windows.

7. **[#40060 — Windows execpolicy false positive on `Start-Process` + URL in same PowerShell script](https://github.com/openai/codex/issues/40060)** — 9 comments. Classifier regression affecting PowerShell workflows; still present on `main`.

8. **[#42236 — Deleted ChatGPT chats remain in Codex sidebar and cannot be removed](https://github.com/openai/codex/issues/42236)** — 9 comments. Sync/state issue across ChatGPT ↔ Codex desktop on Windows.

9. **[#44743 — macOS 26.908.31748: blank window — "r is not a function"](https://github.com/openai/codex/issues/44743)** — 8 comments, 4 👍. Renderer dies from `authed-route ↔ app-primary` circular import; rolling back to `26.901.51231` (codex-cli 0.153.4) fixes it — points at the 0.154 alpha cycle.

10. **[#39421 — Marketplace upgrade staging leak: 559 GB / 4,972 orphaned dirs in 41 days](https://github.com/openai/codex/issues/39421)** — 5 comments. Cleanup janitor exists for curated clones but not marketplaces; massive disk leak.

*Honorable mentions:* [#44783](https://github.com/openai/codex/issues/44783) (Windows sandbox `CreateProcessAsUserW` error 2 on 0.154.0), [#44824](https://github.com/openai/codex/issues/44824) (duplicate "ChatGPT hit a snag" modal), [#43820](https://github.com/openai/codex/issues/43820) (Code Mode host SIGSEGV on 57-bit VA / 200 GiB RLIMIT_AS Linux), [#39704](https://github.com/openai/codex/issues/39704) (Linux/NixOS GPU hang on launch).

---

## Key PR Progress

1. **[#44935 — Remove personality selection from the TUI](https://github.com/openai/codex/pull/44935)** — Drops `/personality`, the selection popup, and override-on-turn behavior. Pairs with PR #44930 below.

2. **[#44934 — Scenario snapshots for remote compaction and Code Mode tools](https://github.com/openai/codex/pull/44934)** — New `gpt-6-astra` integration tests covering remote compaction + image follow-up and a Code Mode release smoke.

3. **[#25383 — Add app-server account session lifecycle [2/2]](https://github.com/openai/codex/pull/25383)** — Ships the Rust lifecycle for Desktop multi-account profile switching: `accountSession/login|add|list|switch|logout`. Foundation for cross-account UX work.

4. **[#44933 — Remove Windows world-writable scans and warnings from the TUI](https://github.com/openai/codex/pull/44933)** — Cleans up startup/permission-change scan telemetry and dialogs in the TUI.

5. **[#44932 — Unify context snapshots and group requests into windows](https://github.com/openai/codex/pull/44932)** — Single renderer for captured requests, raw bodies, and input items; clearer snapshot boundaries in the request viewer.

6. **[#44930 — Embed friendly instructions in bundled GPT-5.4 and GPT-5.5](https://github.com/openai/codex/pull/44930)** — Replaces selectable personality templates for these models with fixed friendly instructions; personality selection becomes unavailable in the TUI for them.

7. **[#44928 — Preserve voice meter history through quiet samples](https://github.com/openai/codex/pull/44928)** — Fixes voice meter scrolling so quiet samples don't wipe earlier activity.

8. **[#44922 — Bundle native voice runtimes in Windows releases](https://github.com/openai/codex/pull/44922)** — Ships voice helper + native audio libs in Windows packages; fixes Realtime TLS on fresh installs (platform cert validation).

9. **[#44921 — Enable TUI voice conversations by default](https://github.com/openai/codex/pull/44921)** — Promotes `realtime_conversation` to stable; removes the experimental announcement.

10. **[#44915 — Remove the deprecated `thread/rollback` API](https://github.com/openai/codex/pull/44915)** — Deletes `thread/rollback`, types, bindings, and `Op::ThreadRollback`; redirects users to `thread/revert`.

*Also merged:* [#44905](https://github.com/openai/codex/pull/44905) (`disabledPluginIds` in app-server thread/turn APIs), [#44903](https://github.com/openai/codex/pull/44903) (native Windows MXC helper entry point), [#44872](https://github.com/openai/codex/pull/44872) (managed network policy in Windows MXC sandbox), [#44879](https://github.com/openai/codex/pull/44879) (Astra composer star fade + cursor stabilization), [#44883](https://github.com/openai/codex/pull/44883) (reject `token_budget.use_history_notes_extension` for models lacking `supports_experimental_context`), [#44893](https://github.com/openai/codex/pull/44893) (`availableAccessPrograms` in model discovery), [#44877](https://github.com/openai/codex/pull/44877) (return public-key metadata from `userVerification/enroll`).

---

## Hot Discussions

### 💡 Ideas

- **[#9618 — How is there not a `/rewind` or `/revert` feature?](https://github.com/openai/codex/discussions/9618)** — 23 comments, 132 👍. The single most upvoted discussion. Codifies the long-standing ask for built-in undo/rewind on top of `thread/revert`.
- **[#41716 — ChatGPT Planner & Codex Worker Orchestration](https://github.com/openai/codex/discussions/41716)** — 2 comments. Proposal for a native planner/worker split where ChatGPT drives one or more Codex instances.
- **[#27754 — Experiment: a Codex plugin for reusable project guidance maps in `AGENTS.md`](https://github.com/openai/codex/discussions/27754)** — 1 comment, 4 👍. Community plugin generating compact `AGENTS.md` action maps.
- **[#44797 — First-class, user-controlled browser extension management](https://github.com/openai/codex/discussions/44797)** — Asks Codex/ChatGPT to invoke extension popups, actions, and options.
- **[#44795 — Live integrations, secure sign-in, and low-latency computer use](https://github.com/openai/codex/discussions/44795)** — Comprehensive integration-layer feature request.
- **[#44792 — Universal live knowledge integration with Google services](https://github.com/openai/codex/discussions/44792)** — Drive/Calendar/Keep indexing with continuous sync.

### 🛠️ Show and Tell

- **[#44643 — CoCo: Codex Coordinator for parallel work across terminals and repositories](https://github.com/openai/codex/discussions/44643)** — Named workspaces for monitoring/resuming parallel Codex sessions.
- **[#44453 — Why `OPENAI_BASE_URL` doesn't redirect Codex with a `config.toml` (and OrcaReplay)](https://github.com/openai/codex/discussions/44453)** — Records and replays Codex sessions locally; documents a subtle config-vs-env precedence gotcha.
- **[#33807 — Codebase Argus: read-only Codex CLI review boundary on a real PR](https://github.com/openai/codex/discussions/33807)** — Deterministic review-desk pattern using a read-only Codex CLI boundary.
- **[#44153 — isitdone: Stop hook that blocks "done" until tests/typecheck/lint pass](https://github.com/openai/codex/discussions/44153)** — `npx isitdone init --agent codex` writes `.codex/hooks.json`; trusted on rollouts.
- **[#44843 — SKILL.md → Codex plugin bundle converter (MIT, stdlib-only)](https://github.com/openai/codex/discussions/44843)** — Enforces upload hard constraints (≤1024 description, reserved names).
- **[#44618 — Wayfinder: trace Codex work as a visual voyage map](https://github.com/openai/codex/discussions/44618)** — Local-first desktop UI for visualizing Codex session history.
- **[#44291 — Brain Scanner: see what calls a shared helper before Codex changes it](https://github.com/openai/codex/discussions/44291)** — Project map consumable by coding agents.
- **[#44756 — Let Codex observe and control Android and iOS apps at runtime](https://github.com/openai/codex/discussions/44756)** — Open-source mobile control integration for Codex.

---

## Feature Request Trends

Aggregating across Issues and Discussions, the most-requested directions are:

1. **Multi-account / profile switching across subscriptions** — [#25342](https://github.com/openai/codex/issues/25342), [#36454](https://github.com/openai/codex/issues/36454), and PR #25383 (`accountSession/*` routes) all signal that users want to separate work/personal sessions cleanly across desktop and iOS.
2. **Windows parity & Windows-native remote control** — [#34028](https://github.com/openai/codex/issues/34028) (Windows-to-Windows Codex Remote), [#42435](https://github.com/openai/codex/issues/42435), [#43596](https://github.com/openai/codex/issues/43596), [#42520](https://github.com/openai/codex/issues/42520). The Windows desktop experience lags macOS in stability and feature coverage.
3. **Reliable rewind/undo UX** — Driven by Discussion [#9618](https://github.com/openai/codex/discussions/9618) (132 👍); aligned with the `thread/revert` consolidation in PR #44915.
4. **First-class browser-integration / extension management** — [#44797](https://github.com/openai/codex/discussions/44797) plus [#42520](https://github.com/openai/codex/issues/42520) and [#42757](https://github.com/openai/codex/issues/42757).
5. **Persistent live integrations (Google, etc.)** — [#44792](https://github.com/openai/codex/discussions/44792), [#44795](https://github.com/openai/codex/discussions/44795).
6. **Mobile (Android/iOS) runtime control** — [#44756](https://github.com/openai/codex/discussions/44756).

---

## Developer Pain Points

- **Process and disk leaks in the desktop app** — MCP per-thread process leak ([#30408](https://github.com/openai/codex/issues/30408), 9+ GB RSS) and marketplace staging leak ([#39421](https://github.com/openai/codex/issues/39421), 559 GB / 4,972 dirs). These compound across long sessions and have no janitor in the marketplace path.
- **Windows stability & sandbox regressions** — Send-button hang ([#40968](https://github.com/openai/codex/issues/40968)), `CreateProcessAsUserW` failure ([#44783](https://github.com/openai/codex/issues/44783)), execpolicy false positive ([#40060](https://github.com/openai/codex/issues/40060)), reasoning-effort reset ([#42435](https://github.com/openai/codex/issues/42435)), and Computer Use unreachable on Windows ([#43596](https://github.com/openai/codex/issues/43596)).
- **macOS app regressions in the 0.154 / 26.908 alpha cycle** — Renderer crash [#44743](https://github.com/openai/codex/issues/44743), duplicate modal [#44824](https://github.com/openai/codex/issues/44824), mass "ChatGPT hit a snag" [#44720](https://github.com/openai/codex/issues/44720) — collectively pointing at build `26.908.31748` (codex-cli 0.154.0-alpha.6.1).
- **Large-history desktop performance** — [#18693](https://github.com/openai/codex/issues/18693) remains a chronic complaint: a few huge local threads degrade typing, scrolling, and thread switching.
- **Cross-device state desync** — [#41214](https://github.com/openai/codex/issues/41214), [#42236](https://github.com/openai/codex/issues/42236), [#36454](https://github.com/openai/codex/issues/36454): sidebar/archived-task resurrection, deleted chats reappearing, and iOS project list drifting from Desktop.
- **Rate-limit / cost transparency** — [#38332](https://github.com/openai/codex/issues/38332) (reset-date shifts), [#44168](https://github.com/openai/codex/issues/44168) (abuse vectors), [#44909](https://github.com/openai/codex/issues/44909) (measured cost of false goal continuations across 3,808 sessions).
- **Linux/edge-case runtime crashes** — Code Mode host SIGSEGV on 57-bit VA Linux ([#43820](https://github.com/openai/codex/issues/43820)), GPU hang on NixOS ([#39704](https://github.com/openai/codex/issues/39704)).
- **CLI install/integrity** — `npm install` exits 0 after tarball failure ([#41283](https://github.com/openai/codex/issues/41283)), leaving a broken `codex`.
- **`codex exec` exit semantics** — [#15536](https://github.com/openai/codex/issues/15536): exec returns 0 even when internal command execution fails, breaking CI exit-code contracts.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-12

## Today's Highlights

Nightly builds continue on the `0.61.0` line, with the team shipping a notable cluster of sandbox/auth hardening PRs (filesystem isolation, OAuth persistence, Windows git-arg validation, and indirect prompt injection defenses). On the issue side, the community is paying close attention to P1 agent reliability bugs—subagents misreporting success after MAX_TURNS, generalist-agent hangs, and shell execution freezing on "Awaiting user input"—while broader feature direction is converging around AST-aware tooling, persistent memory systems, and safer autonomous execution.

## Releases

- **[v0.61.0-nightly.20260911.ged2ac40df](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260910.ged2ac40df...v0.61.0-nightly.20260911.ged2ac40df)** — Automated nightly bump ([PR #29285](https://github.com/google-gemini/gemini-cli/pull/29285)). The previous-night diff against `v0.61.0-nightly.20260910.ged2ac40df` is the canonical changelog for what actually landed.

## Hot Issues

1. **[#22323 — Subagent recovery after MAX_TURNS reports GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** (p1, 13 comments) `codebase_investigator` reports `status: "success"` even after hitting the turn cap without doing real analysis—hiding failures from users. High-traffic discussion reflects concern about trust in subagent telemetry.
2. **[#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)** (p1, 8 comments, 8 👍) Simple tasks like folder creation stall indefinitely when delegating to the generalist agent. Strong upvote ratio signals widespread impact; workaround is to forbid sub-agent delegation.
3. **[#25166 — Shell command stuck on "Waiting input"](https://github.com/google-gemini/gemini-cli/issues/25166)** (p1, 4 comments, 3 👍) After completion of simple shell commands, the CLI hangs at an "Awaiting user input" prompt—classic stuck-IO bug affecting daily workflows.
4. **[#19873 — Zero-Dependency OS Sandboxing & Post-Execution Intent Routing](https://github.com/google-gemini/gemini-cli/issues/19873)** (p2, 9 comments) Strategic EPIC to leverage Gemini 3's native bash affinity while preserving sandbox safety via OS primitives (Seatbelt, bubblewrap, runsc).
5. **[#21968 — Gemini doesn't use skills/sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** (p2, 6 comments) Anecdotal but consistent: the model avoids user-defined skills and sub-agents unless explicitly instructed. Important for the customization story.
6. **[#22745 — AST-aware file reads, search, and mapping EPIC](https://github.com/google-gemini/gemini-cli/issues/22745)** (p2, 7 comments) Investigation track for surgical reads via AST tools (tilth/glyph) to slash per-turn tokens.
7. **[#26525 — Auto Memory deterministic redaction](https://github.com/google-gemini/gemini-cli/issues/26525)** (p2, 5 comments) Auto Memory already uploads transcripts to a model before redaction—security-sensitive; needs deterministic client-side scrubbing.
8. **[#21983 — Browser subagent fails on Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** (p1, 4 comments) Browser subagent exits with GOAL after failure on Wayland sessions, masking the real error.
9. **[#24246 — 400 error with >128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)** (p2, 3 comments) Tool overload breaks requests; needs smarter scoping of enabled tools per agent invocation.
10. **[#22672 — Agent should stop/discourage destructive behavior](https://github.com/google-gemini/gemini-cli/issues/22672)** (p2, 3 comments, 1 👍) Calls out risky commands like `git reset --force`; demands a safer default posture and better guidance in destructive contexts.

## Key PR Progress

1. **[#29282 — fix(auth): persist oauth credentials after login](https://github.com/google-gemini/gemini-cli/pull/29282)** (p2, security) Stops re-prompting Google sign-in by writing OAuth tokens immediately after a successful browser/user-code login flow.
2. **[#29283 — fix(sandbox): improve filesystem isolation & isolate runtime state](https://github.com/google-gemini/gemini-cli/pull/29283)** (large) Sandbox runs now get read-only config mounts and ephemeral runtime state across Docker/Podman/runsc/LXC/Seatbelt.
3. **[#29250 — fix(core): prevent indirect prompt injection via build-file & untrusted-flag handling](https://github.com/google-gemini/gemini-cli/pull/29250)** (large) Refactors `shell`, `edit`, and `write_file` to validate workspace boundaries against modified build configs and external parameters in restricted mode.
4. **[#29287 — feat(policy): map --yolo to allowedTools wildcard policy](https://github.com/google-gemini/gemini-cli/pull/29287)** (closes [#11303](https://github.com/google-gemini/gemini-cli/issues/11303)) Removes the special-case `ApprovalMode.YOLO` state; `--yolo` becomes a `["*"]` allowedTools policy.
5. **[#29184 — fix(core): validate git args in Windows sandbox](https://github.com/google-gemini/gemini-cli/pull/29184)** (p1, security) Blocks silent `git diff --output=<path>` truncation by validating flags before treating git subcommands as read-only on Windows.
6. **[#29192 — fix(checkpoint): contain legacy raw tag path](https://github.com/google-gemini/gemini-cli/pull/29192)** (p1, security) `/chat delete <tag>` no longer follows `../` outside the checkpoints directory.
7. **[#29186 — fix(core): correct exitCode null check in shell sandbox denial heuristic](https://github.com/google-gemini/gemini-cli/pull/29186)** (p1, security) `ExecutionResult.exitCode` is `number | null`, not `undefined`—fixes a sandbox-denial bypass (#29043).
8. **[#29187 — fix(core): safeLiteralReplace for LLM prompt template placeholders](https://github.com/google-gemini/gemini-cli/pull/29187)** (p2, security) Replaces `$`-special `String.prototype.replace` with a literal replacer to avoid template injection from user-controlled values (#29044).
9. **[#29188 — fix(core): match include patterns exactly in read-many-files](https://github.com/google-gemini/gemini-cli/pull/29188)** (p1, security) `String.includes` was being abused to treat binary assets as "explicitly requested" via directory-name fragment overlap; now does exact stem/extension matching.
10. **[#29110 — fix(core): route read_file content through FileSystemService](https://github.com/google-gemini/gemini-cli/pull/29110)** Routes `read_file` through the injected `FileSystemService`, restoring parity with `write_file`/`replace` so ACP clients with custom FS providers work correctly.

## Feature Request Trends

- **Subagent transparency & reliability** — visibility into subagent trajectories via `/chat share` ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)), accurate termination reasons ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)), and richer bug reports that include subagent context ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)).
- **AST-aware, token-frugal code navigation** — multiple linked issues ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746), [#19561](https://github.com/google-gemini/gemini-cli/issues/19561)) push for surgical reads via `tilth`/`glyph` to cut the ~36k token/turn baseline.
- **Persistent, file-based memory & task tracking** — replacing `WriteToDo`'s in-context list with on-disk CRUD ([#18836](https://github.com/google-gemini/gemini-cli/issues/18836)), making `/compress` persistent across resume ([#21335](https://github.com/google-gemini/gemini-cli/issues/21335)), and improving Auto Memory ([#26516](https://github.com/google-gemini/gemini-cli/issues/26516), [#26522](https://github.com/google-gemini/gemini-cli/issues/26522), [#26523](https://github.com/google-gemini/gemini-cli/issues/26523), [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)).
- **Safer autonomous execution** — OS-level zero-dep sandboxing ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873)), destructive-command guardrails ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)), and disciplined workspace scoping under heavy tool counts ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)).
- **Self-aware CLI surface** — accurate agent knowledge of its own flags/hotkeys for self-execution ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)).

## Developer Pain Points

- **Agent hangs and silent failures** — generalist-agent infinite waits ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)) and shell "Waiting input" stalls after command completion ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)) are recurring, workflow-breaking frustrations.
- **Misleading subagent telemetry** — `Termination Reason: GOAL` masking MAX_TURNS ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)) and unhandled crash on `get-shit-done` output ([#22186](https://github.com/google-gemini/gemini-cli/issues/22186)) erode trust in agent reports.
- **Browser-agent flakiness** — Wayland failures ([#21983](https://github.com/google-gemini/gemini-cli/issues/21983)), ignored `settings.json` overrides ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)), and brittle lock handling ([#22232](https://github.com/google-gemini/gemini-cli/issues/22232)) all degrade the browser subagent's reliability.
- **Workspace hygiene** — the model scattering temporary scripts across directories when shell tools are excluded ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)) complicates clean commits.
- **Skills/sub-agent discoverability** — Gemini not invoking available skills without explicit prompting ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968)) defeats the purpose of user customization.
- **File/configuration edge cases** — symlinked `~/.gemini/agents/*.md` not loaded ([#20079](https://github.com/google-gemini/gemini-cli/issues/20079)) and malformed `agents.json`/`checkpoint` shapes crashing the CLI ([#29208](https://github.com/google-gemini/gemini-cli/pull/29208), [#29195](https://github.com/google-gemini/gemini-cli/pull/29195)) cause avoidable startup failures.

---

*Note: No GitHub Discussions data was provided for the 24-hour window, so the Hot Discussions section is omitted.*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-12

## Today's Highlights
The team shipped **v1.0.84-5**, introducing session and memory import commands built on a semantic JSONL interchange format, alongside grammar-driven shell completions that fix long-standing inconsistencies in root flag and subcommand suggestions. Community attention remains dominated by a cluster of MCP protocol conformance bugs, several unresolved Windows regressions, and a wave of high-impact skills/plugins/sandboxing issues that need triage.

## Releases
**v1.0.84-5** — [Release](https://github.com/github/copilot-cli/releases)
- **Added:** Session and memory import commands for the semantic JSONL interchange format, enabling portable sharing and restore of agent state.
- **Improved:** Shell completions are now generated from the same grammar the CLI parses with, so `copilot <TAB>` exposes root flags alongside subcommands, and each subcommand offers only its own options.

## Hot Issues

1. **[#4095](https://github.com/github/copilot-cli/issues/4095) — Windows plugin update fails with `Access is denied (os error 5)`** (👍 21). VS Code's Copilot extension holds watcher handles on `installed-plugins`, blocking `copilot plugin update` even after the git fetch/checkout succeeds. With 21 upvotes this is currently the loudest pain point on the tracker.
2. **[#4438](https://github.com/github/copilot-cli/issues/4438) — `disable-model-invocation: true` makes a skill unreachable, not manual-only** (👍 7). Skills advertised via `copilot skill list` are invisible to the model's `skill()` tool — explicitly requested skills return `Skill not found`, contradicting the documented semantics of the frontmatter flag.
3. **[#4699](https://github.com/github/copilot-cli/issues/4699) — OOM (`JavaScript heap out of memory`) on long `--resume` sessions** (👍 5). CLI 1.0.82 hits the 4 GiB V8 ceiling roughly every few hours during long resumed sessions, and Node diagnostic dumps are written into the user's cwd — both a stability and cleanliness problem.
4. **[#4035](https://github.com/github/copilot-cli/issues/4035) — Voice installer hits private Azure Artifacts feed (HTTP 401)**. Enabling voice mode tries to fetch `Microsoft.AI.Foundry.Local.Core 1.2.3` from a private feed even though the package is public on nuget.org, breaking `/voice` for everyone without feed credentials.
5. **[#4753](https://github.com/github/copilot-cli/issues/4753) — v1.0.83: session resume cancels in-flight stdio MCP server connections** (≈1s timeout, was ≈16s in 1.0.82). The foreground-session handover tears down MCP servers that are still initializing, silently disabling them for the entire resumed session.
6. **[#3700](https://github.com/github/copilot-cli/issues/3700) — High-severity WSL2 regression: CLI spins at ~215% CPU while idle, TUI frozen**. Reproduces on every fresh session after a clean reboot on default usage; live output never paints until restart. Marked High severity and a regression of #2208.
7. **[#1168](https://github.com/github/copilot-cli/issues/1168) — "Authorization fatigue" during a single request**. A single high-level prompt (e.g. "investigate PR 727") can trigger more than a dozen authorization prompts, making assisted work impractical and frustrating.
8. **[#4764](https://github.com/github/copilot-cli/issues/4764) — Auto approval stops working after ~1 hour**. Assisted permissions mode silently degrades after ~60 minutes and only resets on `/clear` or a new session, severely limiting its usefulness for long-running workflows.
9. **[#4795](https://github.com/github/copilot-cli/issues/4795) — Atlassian MCP OAuth fails: callback URL mismatch**. The CLI opens the OAuth callback on a random ephemeral port rather than the registered `:33418`, making Atlassian MCP unusable out of the box on WSL Ubuntu 24.04.
10. **[#4370](https://github.com/github/copilot-cli/issues/4370) — MCP initialization fails when `server/discover` returns `-32602`** (👍 3). Copilot sends a proprietary `server/discover` pre-`initialize` request; spec-compliant servers (e.g. FastMCP) reject it, and Copilot treats the rejection as a hard init failure instead of falling back to the standard handshake.

*Honorable mentions:* [#4026](https://github.com/github/copilot-cli/issues/4026) (Windows native-runtime crashes since May 2026 across 4+ versions, unresolved) and [#4652](https://github.com/github/copilot-cli/issues/4652) (`--sandbox` rejected on Windows 25H2).

## Key PR Progress
No pull-request activity was reported in the last 24 hours.

## Hot Discussions
No discussion data was provided for this digest.

## Feature Request Trends
Several recurring themes are surfacing across the issue tracker:

- **Long-session & cross-session memory.** [#2436 (Cross-Session Context Querying)](https://github.com/github/copilot-cli/issues/2436) plus the OOM issues in [#4699](https://github.com/github/copilot-cli/issues/4699) and the just-shipped JSONL import format point to a community pushing toward persistent, portable, queryable agent memory.
- **Lifecycle / hook extensibility.** [#4820 (end-of-session hook)](https://github.com/github/copilot-cli/issues/4820) signals demand for first-class hooks around `/clear` and session boundaries, useful for autosaving summaries or running cleanup skills.
- **Model-tier flexibility & cost control.** [#4821 (OpenAI Flex tier support)](https://github.com/github/copilot-cli/issues/4821) makes a concrete case for exposing `service_tier: flex` in the CLI to halve token cost on background tasks.
- **MCP ecosystem maturity.** The steady stream of OAuth/refresh, lifecycle, and reconciliation bugs ([#4753](https://github.com/github/copilot-cli/issues/4753), [#4370](https://github.com/github/copilot-cli/issues/4370), [#4795](https://github.com/github/copilot-cli/issues/4795), [#4636](https://github.com/github/copilot-cli/issues/4636), [#4818](https://github.com/github/copilot-cli/issues/4818)) shows users building real workflows around MCP and wanting first-class, spec-conformant support.
- **Skills as first-class artifacts.** The `SKILL.md` frontmatter semantics ([#4438](https://github.com/github/copilot-cli/issues/4438), [#4637](https://github.com/github/copilot-cli/issues/4637), [#4823](https://github.com/github/copilot-cli/issues/4823)) and `AGENTS.md` discovery rules ([#4822](https://github.com/github/copilot-cli/issues/4822)) are being pushed toward stricter, more predictable behavior.

## Developer Pain Points
- **MCP protocol conformance and lifecycle handling.** Non-standard pre-init `server/discover` calls, brittle reconciliation, broken OAuth callbacks, and silent connection cancellations on session resume are blocking MCP adoption in production workflows.
- **Reliability on Windows and WSL2.** Recurring themes: plugin install/update `Access is denied`, sandbox unsupported on Windows 25H2, native-runtime crashes since May 2026, and a high-CPU TUI regression on WSL2 — together making Windows feel like a second-class platform.
- **Authorization/permissions UX.** Both "authorization fatigue" (too many prompts per request) and assisted permissions silently expiring after ~1 hour point to a missing session-scoped, granular trust model.
- **Long-session memory stability.** OOM crashes on `--resume`, crash dumps polluting cwd, and the lack of cross-session context querying make long-running, multi-session agent workflows fragile.
- **Skills & instructions discovery.** `disable-model-invocation` semantics, inconsistent `/skills list` formatting, `AGENTS.md` walking through symlinked ancestor dirs into unrelated repos, and exfiltration-protection false positives all suggest the custom-instructions system needs a hardening pass.
- **Installer friction.** PATH mutation on systems with PATH > 2047 chars ([#4816](https://github.com/github/copilot-cli/issues/4816)) and voice-mode 401s ([#4035](https://github.com/github/copilot-cli/issues/4035), [#4814](https://github.com/github/copilot-cli/issues/4814)) are repeatedly cited as first-run blockers.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-12

## Today's Highlights

A wave of **release-pipeline fixes** landed from `thdxr`, stabilizing Windows CLI signing, removing the experimental Node CLI from `latest`, and temporarily omitting v2 Windows desktop artifacts while Azure Trusted Signing is configured. Meanwhile, the community is pushing hard on **subagent governance** (loop protection, parallel limits) and **provider reliability** issues — especially around OpenCode Go, Muse Spark, and prompt caching on DeepSeek. Several top-voted feature requests (#27110 with 32 👍, #40993 with 12 👍) point toward standardization and cost control.

## Releases

_No new releases in the last 24h._

## Hot Issues

1. **[BUG] OpenCode Go subscription paid but workspace shows "Insufficient balance"** — [#37790](https://github.com/anomalyco/opencode/issues/37790) (18 comments)
   A paying user can't actually use Go because the workspace balance isn't reflecting Stripe payments. High community engagement; likely a critical UX/billing blocker.
2. **[FEATURE] Anything similar to Claude Code dynamic workflows?** — [#30308](https://github.com/anomalyco/opencode/issues/30308) (10 comments, 5 👍)
   Demand for declarative, multi-step workflows à la Claude Code docs — signals a clear product gap.
3. **[CLOSED] Error from provider (Console Go): Upstream request failed** — [#37231](https://github.com/anomalyco/opencode/issues/37231) (9 comments)
   Outage-style failure affecting CLI, desktop, and OpenChamber in VSCode across all Go models. Indicates reliability concerns at the provider layer.
4. **[FEATURE] Undo message only — keep file changes (like Claude Code)** — [#7963](https://github.com/anomalyco/opencode/issues/7963) (9 comments, 12 👍)
   Strongly requested parity with Claude Code's selective undo behavior.
5. **[2.0] subagent: infinite loop of identical tool calls for ~50 min** — [#45442](https://github.com/anomalyco/opencode/issues/45442) (8 comments, 1 👍)
   364 identical `grep` calls burned tokens uncontrollably; exposes the lack of loop protection — a serious cost-safety issue.
6. **[macOS v1.17.18] gpt-5.6-sol-fast/high repeatedly fails with reasoning part rs_*:0 not found** — [#36241](https://github.com/anomalyco/opencode/issues/36241) (7 comments, 2 👍)
   Streaming aborts on Codex OAuth paths with high reasoning effort — affects macOS users specifically.
7. **[CORE] Option to hide or resize the right-side status panel** — [#24373](https://github.com/anomalyco/opencode/issues/24373) (6 comments, 1 👍)
   Long-standing ergonomics complaint; status panel hogs terminal width on smaller screens.
8. **[FEATURE] Support the Agent Plugins standard (agent-plugins.org)** — [#40993](https://github.com/anomalyco/opencode/issues/40993) (6 comments, 12 👍)
   Multi-vendor packaging spec for Skills + MCP servers — community clearly wants OpenCode to lead on interoperability.
9. **[2.0] Copilot Legacy Plan fully consumed by a single prompt** — [#48330](https://github.com/anomalyco/opencode/issues/48330) (6 comments)
   Regression from v1 → v2: a 1500-req/month sub burns through in one session. Trust-breaking for paying users.
10. **[FEATURE] Setting to limit max number of parallel subagents** — [#27110](https://github.com/anomalyco/opencode/issues/27110) (5 comments, **32 👍**)
    Highest-liked issue in this batch — local-model users need a guardrail against memory/context overload.

## Key PR Progress

1. **feat(app): Codex-style sidebar navigation with live thread status, settle and pins** — [#48526](https://github.com/anomalyco/opencode/pull/48526)
   Optional persistent navigation sidebar gated behind Settings → General, mirroring Codex UX. New feature, still open.
2. **fix(release): omit node CLI from latest** — [#48568](https://github.com/anomalyco/opencode/pull/48568)
   Keeps experimental Node distribution off `latest`; dev/beta unchanged. Closed.
3. **fix(release): sign primary Windows CLI** — [#48567](https://github.com/anomalyco/opencode/pull/48567)
   Restricts Azure signing to primary V2 Windows CLI binaries. Closed.
4. **fix(release): sign v2 Windows CLI** — [#48566](https://github.com/anomalyco/opencode/pull/48566)
   Enables the V2 signer that was previously skipped. Closed.
5. **fix(release): omit v2 Windows desktop** — [#48564](https://github.com/anomalyco/opencode/pull/48564)
   Temp workaround while Azure Trusted Signing isn't wired to `v2`. Closed.
6. **fix: bash memory usage** — [#22660](https://github.com/anomalyco/opencode/pull/22660)
   Resource-efficiency improvements to the bash tool. Closed (beta).
7. **feat: expose Go and Zen usage** — [#41824](https://github.com/anomalyco/opencode/pull/41824)
   Adds `GET /api/usage` with normalized Go quota + Zen billing data, plus Promise/Effect client methods. Closed.
8. **refactor(core): centralize session message rows** — [#41830](https://github.com/anomalyco/opencode/pull/41830)
   New `SessionMessageRow` boundary in core persistence — cleaner decode/split semantics. Closed.
9. **feat(plugin): add session stopping hook** — [#41811](https://github.com/anomalyco/opencode/pull/41811)
   Plugins can append ordered context before a session goes idle (persisted as hidden turn). Closes #16626. Closed.
10. **fix(desktop): restore server CORS policy** — [#41803](https://github.com/anomalyco/opencode/pull/41803)
    Removes wildcard CORS/Stream rewrites in Electron, locks down `oc://renderer`. Closed.

## Feature Request Trends

- **Subagent governance**: parallel-agent limits (#27110, 32 👍), loop detection (#45442), and subagent cost controls dominate the top-voted requests.
- **Workflow orchestration**: Declarative/multi-step workflows à la Claude Code (#30308), session "continue inference" after interrupts/limits (#44921).
- **Plugin & interoperability standards**: Adoption of Agent Plugins spec (#40993, 12 👍), SKILL.md publishing pipeline (#48504), MCP ecosystem examples (#41829).
- **Provider ergonomics**: Auto-discovery for vLLM (#47344), better handling of OpenAI-compatible gateways rejecting `prompt_cache_key` (#45113).
- **UI/UX quality-of-life**: Sidebar toggle (#48569), hide/resize status panel (#24373), undo-message-without-file-revert (#7963, 12 👍), TUI console-output sanitization (#48520).
- **Mobile & cross-platform**: Native Android client showcase (#48556), Visual Studio 2026 support (#11902).

## Developer Pain Points

- **Billing/state sync**: Go subscription payments not reflecting in workspace balance (#37790); Copilot legacy quota burned in a single v2 session (#48330).
- **Provider flakiness**: Recurring Console Go upstream errors (#37231), GPT-5.6-sol reasoning streaming aborts on macOS (#36241), Muse Spark 500s on `/chat/completions` (#48512, #47237).
- **Prompt caching gaps**: DeepSeek cache_hit = 0 even on identical prompts via the Go endpoint (#41125, #43218) — hurts both cost and latency for power users.
- **TUI robustness**: ENOSPC crashes during file watch (#48384), library `console.*` output corrupting the alternate screen (#48520), audio engine infinite retries (#41770), VCS/session event cross-workspace bleed (#41842).
- **v1 → v2 regressions**: Silent prompts producing no output (#48503, #48506), splash overlay never hiding on desktop (#48553), `session.error` events ignored leaving UI stuck "busy" (#48530).
- **Documentation drift**: Italian docs lagging behind English and misrepresenting xAI auth paths (#48565).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-12

## 1. Today's Highlights

The community remains focused on **Windows compatibility**, with Issue [#7547](https://github.com/earendil-works/pi/issues/7547) now at 62 comments driving a coordinated push (PRs [#9504](https://github.com/earendil-works/pi/pull/9504), [#9501](https://github.com/earendil-works/pi/pull/9501)). On the architecture side, two stacked PRs from `mitsuhiko` ([#9116](https://github.com/earendil-works/pi/pull/9116), [#9117](https://github.com/earendil-works/pi/pull/9117)) landed mid-conversation system messages — a foundational change for how Pi handles extension-driven prompt and tool updates. Performance regressions in large sessions (#9410, #9265) continue to surface and are getting triage attention.

## 2. Releases

*No new releases in the last 24 hours.*

## 3. Hot Issues

| # | Issue | Comments | Why it matters |
|---|-------|---------:|----------------|
| [#7547](https://github.com/earendil-works/pi/issues/7547) | How do you use Pi on Windows? | 62 | Central hub for Windows pain points — shaping shell resolution, IME, and PATH strategy. |
| [#9323](https://github.com/earendil-works/pi/issues/9323) | Improve Fireworks-specific config | 14 | User-facing provider quirks (`last-read`) surfaced via structured bug report. |
| [#5323](https://github.com/earendil-works/pi/issues/5323) | Vertex + GCP metadata server support | 9 | Sync `existsSync` on `GOOGLE_APPLICATION_CREDENTIALS` blocks legitimate auth on GCP metadata servers. |
| [#7321](https://github.com/earendil-works/pi/issues/7321) | Multi-line paste broken on Termux | 5 | Bracketed-paste fallback missing — first `\r` triggers submit. Mobile users affected. |
| [#6108](https://github.com/earendil-works/pi/issues/6108) | `/reload` re-evaluates extension side effects | 5 | Duplicate theme/side-effect registration on every reload — reliability bug. |
| [#8810](https://github.com/earendil-works/pi/issues/8810) | Extension-registered providers ignored on fresh session | 5 | `defaultProvider`/`defaultModel` silently falls back — confusing for users on extension providers. |
| [#7658](https://github.com/earendil-works/pi/issues/7658) | Extension API for persisting API-key credentials | 4 | Long-standing gap: extensions can't write `auth.json`. Blocks OAuth/key workflows. |
| [#6930](https://github.com/earendil-works/pi/issues/6930) | Make `renderPage`/oauth HTML functions public | 4 | Extension authors want branded HTML surfaces without forking internals. |
| [#9045](https://github.com/earendil-works/pi/issues/9045) | Invalid `--mode` values silently ignored | 4 | `parseArgs(["--mode","yaml"])` returns `mode: undefined` — bad CLI hygiene. |
| [#9410](https://github.com/earendil-works/pi/issues/9410) | Escape on large sessions freezes TUI ~60s | 4 | Streaming interrupt on ~465k-token sessions is unworkable — likely tied to compaction path. |

## 4. Key PR Progress

| PR | Title | Status | Impact |
|----|-------|--------|--------|
| [#9116](https://github.com/earendil-works/pi/pull/9116) | `feat(ai):` add mid-conversation system messages | Open (stacked) | Layer 1 of #8998 — lets pi-ai carry a `system` role through the turn without rewriting the top-level prompt. |
| [#9117](https://github.com/earendil-works/pi/pull/9117) | `feat(coding-agent):` deliver prompt/tool changes as system deltas | Open (stacked) | Layer 2 — wires the agent to emit `system` deltas when tools/prompts change mid-session. Foundational. |
| [#9504](https://github.com/earendil-works/pi/pull/9504) | Accept Windows Store shell aliases | Open | Replaces `existsSync` with `accessSync(F_OK)` — fixes EACCES on Store aliases (#36790). |
| [#9501](https://github.com/earendil-works/pi/pull/9501) | Resolve Windows shells from installation dirs | Open | Unifies hardcoded/env/multi-fallback shell lookups; ships with Windows-docs cleanup. |
| [#9505](https://github.com/earendil-works/pi/pull/9505) | Honor `model.samplingParams` in openai-completions stream | Open | Fixes dropped per-model sampling (vLLM/llama.cpp `repetition_penalty`, `dry_multiplier_*`) on tool-using turns. |
| [#9489](https://github.com/earendil-works/pi/pull/9489) | Bedrock Converse: normalize gross `inputTokens` per family | Open | Distinguishes Anthropic (cache-net) vs other families for accurate cost/limit accounting. |
| [#9488](https://github.com/earendil-works/pi/pull/9488) | Add canonical Codex turn attribution | Open | Provider-neutral `requestIdentity` for Codex session/thread/turn/window metadata — improves steering, retry, and compaction recovery. |
| [#8572](https://github.com/earendil-works/pi/pull/8572) | Amazon Bedrock Mantle | Open | Adds Mantle surface (new OpenAI/GPT-OSS endpoints) alongside existing Converse path. |
| [#9442](https://github.com/earendil-works/pi/pull/9442) | Allow prompt cache keys for compatible proxies | Open | `compat.supportsPromptCacheKey` opt-in so OpenAI-compatible proxies can receive pi's session key on short retention. |
| [#9468](https://github.com/earendil-works/pi/pull/9468) | Deferred extension reload (`requestReload`) | Open | Reloads coalesce at settle (never mid-turn); `ReloadHandler.followUp` enables TUI auto-submit after reload. |

## 5. Hot Discussions

*No discussion data was provided for this digest.*

## 6. Feature Request Trends

- **First-class Windows support** — shell discovery, IME, paths on non-`C:` drives, Store aliases (issues #7547, #7175, #9490, #9497, #9507; PRs #9501, #9504).
- **Richer extension API surface** — `auth.json` persistence (#7658), public HTML helpers (#6930), explicit `customCwd`/ctx-cwd fallback (#9483), deferred reload (#9468).
- **Provider coverage & metadata** — Bedrock Mantle (#8572), Bedrock Converse input-token semantics (#9489), Vertex/GCP metadata (#5323), Fireworks config (#9323), Codex turn identity (#9488).
- **Mid-session context management** — system-message deltas for prompt/tool changes (#9116/#9117); bounded compaction input (#8371).
- **TUI ergonomics** — toggle for inline images (#9496), markdown heading/code style fix (#9473), Shift+Enter on Windows Terminal (#7175).
- **Eval-driven documentation** — PR #9491 introduces doc-lift evals for provider customization.

## 7. Developer Pain Points

- **Windows is still rough**: drive-letter edge cases (#9490), IME lag (#9497), Store alias EACCES, Shift+Enter mis-binding (#7175), libuv crash on RPC shutdown (#9507).
- **Performance cliffs at scale**: ~60s TUI freeze on Escape during large-context streaming (#9410) and O(n²) tool-call arg re-parsing on OpenAI stream (#9265).
- **Extension lifecycle surprises**: `/reload` repeats dependency side effects (#6108); `defaultProvider`/`defaultModel` ignored for extension-registered providers (#8810).
- **CLI quiet failures**: `--mode` with bogus values silently no-ops (#9045); `--no-extensions` vs `--no-extension` typo in shipped example (#9205).
- **Provider integration friction**: dropped `samplingParams` on tool turns (#9506), `EALLOWREMOTE` on `pi update --extensions` with URL deps (#9499), `build:offline` failing on Google's `TOO_MANY_TOOL_CALLS` finish reason (#9502).
- **Tooling ergonomics**: `read`+`edit` race yields "1-line EOF" error (#8318); unbounded compaction input can't be re-compacted (#8371); startup banner lists `disable-model-invocation` skills without per-project exclusion (#9493).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-12

## Today's Highlights

The nightly **v0.23.3-nightly.20250911** cut continues tightening the daemon/web-shell session lifecycle, while several high-severity bugs surfaced across the VS Code extension, Windows PTY layer, and telemetry pipeline. Community attention is concentrated on **session-history visibility (#11574)**, **VS Code Remote-SSH webview hangs (#11556)**, and a privacy-sensitive **telemetry leak of raw tool-error text including shell command lines (#11198)** — the last of which already has a remediation PR (#11649) in flight.

## Releases

**v0.23.3-nightly.20250911** ([#aaa6a32aae](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3-nightly.20250911.aaa6a32aae))
- Removes obsolete background response aggregation from the DingTalk channel ([#11570](https://github.com/QwenLM/qwen-code/pull/11570)).
- Continues the `feat(channels)!` refactor track; CHANGELOG truncated in source.

## Hot Issues

1. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500)** — TUI exits silently with **Minified React error #185** ("Maximum update depth exceeded") when multiple background sub-agents complete. P1 rendering bug caused by `Ink useBoxMetrics` layout-listener `setState` loop; users lose session continuity without any error feedback.
2. **[#9693](https://github.com/QwenLM/qwen-code/issues/9693)** — Qwen Desktop on Windows reports `MCP -32000 Connection closed` at startup for STDIO MCP servers, even when MCP isn't activated. Long-standing integration blocker for Windows users.
3. **[#8138](https://github.com/QwenLM/qwen-code/issues/8138)** — Inside a `git worktree`, saving settings writes to the **project-root** `settings.json` instead of the worktree's own `.qwen/settings.json`, breaking per-worktree isolation.
4. **[#11352](https://github.com/QwenLM/qwen-code/issues/11352)** — Windows web-terminal PTYs still leak `conhost.exe` on natural exit even after the shell-tool half was fixed by #11497. Scope narrowed to web-terminal PTYs, pending a backend fix.
5. **[#11574](https://github.com/QwenLM/qwen-code/issues/11574)** — VS Code 0.23.1 extension update **hides all prior session history** because the history dialog hardcodes a `sourceType=vscode` filter that older transcripts never set. Real-world data-loss perception for upgraders.
6. **[#11556](https://github.com/QwenLM/qwen-code/issues/11556)** — `vscode-ide-companion` 0.23.1 cannot work under Remote-SSH; the webview gets stuck loading. Cross-arch (x64 client → arm64 host) failure pattern emerging.
7. **[#11198](https://github.com/QwenLM/qwen-code/issues/11198)** — **Security/privacy:** default-on usage-statistics channel uploads raw tool-error text (including shell command lines, embedded URL credentials, Bearer tokens) to RUM without redaction. Pre-existing on `main`; wider than the previously flagged #10916 field.
8. **[#10850](https://github.com/QwenLM/qwen-code/issues/10850)** — `Dependency CVE audit` CI is failing repo-wide due to new advisories in `fast-uri`, `qs`, `uuid`. Repo hygiene P1 ready-for-human.
9. **[#11610](https://github.com/QwenLM/qwen-code/issues/11610)** — Hooks engine contract needs alignment with Claude Code: plain-text stdout, `stop_hook_active`, timeout unit, matchers, common input. Roadmap-level P1 for cross-tool portability.

## Key PR Progress

1. **[#11636](https://github.com/QwenLM/qwen-code/pull/11636)** — Adds an explicit daemon execution lifecycle for background-result processing across daemon and web shell. Closes a long-running gap in result continuation semantics.
2. **[#11649](https://github.com/QwenLM/qwen-code/pull/11649)** — Redacts error text in the usage-statistics telemetry sink — direct fix for [#11198](https://github.com/QwenLM/qwen-code/issues/11198). Critical privacy PR.
3. **[#11643](https://github.com/QwenLM/qwen-code/pull/11643)** — Runs web-terminal PTYs on the bundled ConPTY backend (`useConptyDll: true`), releasing the host reference immediately. Closes the residual half of [#11352](https://github.com/QwenLM/qwen-code/issues/11352).
4. **[#11242](https://github.com/QwenLM/qwen-code/pull/11242)** — `feat(browser-use)`: adds a Chrome Native Messaging relay that connects the Browser SDK to the user's existing Chrome via a local host + Qwen Chrome extension. Unblocks browser-use without a custom Chromium build.
5. **[#11086](https://github.com/QwenLM/qwen-code/pull/11086)** — `feat(serve)`: scopes extensions to workspace runtimes; reconciles extension state into live workspaces and updates `@`/composer surfaces.
6. **[#11392](https://github.com/QwenLM/qwen-code/pull/11392)** — `fix(mcp)`: recovers failed pooled MCP connections without replaying calls, restoring session tool/prompt/resource registrations in daemon/ACP contexts.
7. **[#11640](https://github.com/QwenLM/qwen-code/pull/11640)** — `fix(core)`: places the DashScope conversation cache breakpoint **before** reattached images so the "Recent images reattached" block no longer pollutes the cached conversation identity.
8. **[#11625](https://github.com/QwenLM/qwen-code/pull/11625)** — Adds consistency gates between `pnpm-lock` and `package-lock`, plus hoisted-import declarations. Finalizes the dual-lockfile setup from #10444.
9. **[#11001](https://github.com/QwenLM/qwen-code/pull/11001)** — `fix(test)`: makes the interactive PTY harness wait for each session it ends (rather than signaling and moving on), reducing flake in cleanup paths.
10. **[#6019](https://github.com/QwenLM/qwen-code/pull/6019)** — `feat(cli)`: adds `/model --compaction` for a dedicated auto-compact model — lets users tune compression quality/cost independently of their chat model.

## Feature Request Trends

- **Hooks parity with Claude Code** — contract alignment (plain-text stdout, `stop_hook_active`, timeout unit, matchers, common input) is now the highest-priority cross-tool portability ask ([#11610](https://github.com/QwenLM/qwen-code/issues/11610)).
- **Session history reliability across extensions** — both VS Code session history ([#11574](https://github.com/QwenLM/qwen-code/issues/11574)) and Web Shell "Continue interrupted sessions" ([#11545](https://github.com/QwenLM/qwen-code/pull/11545)) point to a unifying need: stable, migratable session metadata.
- **Web Search UX** — real page titles for cited sources ([#11564](https://github.com/QwenLM/qwen-code/issues/11564)), so the model can emit `[title](url)` rather than opaque URLs.
- **Standalone / worktree-aware sessions** — owner-scoped named sessions ([#10103](https://github.com/QwenLM/qwen-code/issues/10103)), worktree session lifecycle cleanup ([#11024](https://github.com/QwenLM/qwen-code/issues/11024)), and standalone-session-without-workspace serve mode ([#8908](https://github.com/QwenLM/qwen-code/issues/8908)) are converging into a "first-class multi-session" product surface.
- **Extension skill namespacing** — moving from flat global names to `extension:skill` qualified invocation, matching upstream gemini-cli ([#9408](https://github.com/QwenLM/qwen-code/issues/9408)).

## Developer Pain Points

- **Silent TUI death from background-agent storms.** React's "Maximum update depth exceeded" inside `Ink useBoxMetrics` ([#11500](https://github.com/QwenLM/qwen-code/issues/11500)) kills sessions with no user-visible error and loses context — recurring class of bug across concurrent-execution work.
- **Windows remains a second-class platform.** MCP STDIO failures ([#9693](https://github.com/QwenLM/qwen-code/issues/9693)), PTY/`conhost.exe` leaks ([#11352](https://github.com/QwenLM/qwen-code/issues/11352)), and Windows-only monitor debug directory permissions ([#11679](https://github.com/QwenLM/qwen-code/pull/11679)) all surfaced in the last 24h.
- **Telemetry / privacy visibility.** Default-on RUM is leaking raw tool errors and shell command lines ([#11198](https://github.com/QwenLM/qwen-code/issues/11198)), `api_request.request_text` ships despite `logPrompts=false` ([#11666](https://github.com/QwenLM/qwen-code/issues/11666)), and the Responses pipeline writes 500-char request-body prefixes unredacted ([#11667](https://github.com/QwenLM/qwen-code/issues/11667)). Three independent leak vectors — a clear "off-by-default or prove-redaction" demand.
- **Model/provider metadata collisions.** `Part.thoughtSignature` is shared across providers with no ownership marker ([#9453](https://github.com/QwenLM/qwen-code/issues/9453)); Responses cleanup can break reasoning/tool-call adjacency ([#11665](https://github.com/QwenLM/qwen-code/issues/11665)); reattached images pollute cache identity ([#11640](https://github.com/QwenLM/qwen-code/pull/11640)). Multi-provider correctness is a top reliability theme.
- **CI/CD fragility.** Stale ECS runner fleet ([#11633](https://github.com/QwenLM/qwen-code/issues/11633)), hk4-host label competition ([#10879](https://github.com/QwenLM/qwen-code/issues/10879)), macOS E2E shard death ([#11134](https://github.com/QwenLM/qwen-code/pull/11134)), and new CVE advisories ([#10850](https://github.com/QwenLM/qwen-code/issues/10850)) — release pipeline reliability is currently a top operational concern.
- **ACP / VS Code session UX.** Superseded-session force-close discarding in-flight work ([#11511](https://github.com/QwenLM/qwen-code/issues/11511)) and disconnect-escalation POSIX gaps ([#11510](https://github.com/QwenLM/qwen-code/issues/11510)) are blocking the IDE-integration roadmap track.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*