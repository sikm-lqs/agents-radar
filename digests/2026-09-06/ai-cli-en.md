# AI CLI Tools Community Digest 2026-09-06

> Generated: 2026-09-06 15:33 UTC | Tools covered: 7

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

# AI CLI Tools Cross-Tool Comparison Report — 2026-09-06

## 1. Ecosystem Overview

The AI CLI category has consolidated into a production-infrastructure segment: subagents, skills/plugins, and MCP support are now baseline table stakes across all seven tracked tools rather than differentiators. Today's activity is dominated less by new capabilities than by **operational hardening** — multi-agent reliability, permission/sandbox integrity, and cost predictability are the top three recurring themes in every repo. Divergence is growing along two axes: **provider openness** (single-vendor Claude Code, Codex, Copilot CLI vs. multi-provider OpenCode and Pi) and **client convergence** (terminals expanding into desktop apps, web shells, IDE companions, and voice runtimes). Interop protocols are becoming the ecosystem's connective tissue — MCP for tool integration, ACP for agent clients — with Qwen Code already delegating subagent turns to Claude Code over ACP.

## 2. Activity Comparison

| Tool | Issues (24h) | PRs (24h) | Discussions (24h) | Release Status |
|---|---|---|---|---|
| **OpenAI Codex** | 50 updated (10 hot listed) | 27 (10 highlighted) | 8 (5 Ideas, 1 Q&A, 2 Show & Tell) | None in window |
| **Claude Code** | ~14 tracked (10 hot + 4 notable) | ~18 (10 detailed + 8 merged) | N/A — no data this window | v2.1.263 shipped (quiet reliability patch) |
| **Gemini CLI** | ~10 highlighted | 10 | N/A — none reported | v0.60.0 nightly (routine) |
| **Copilot CLI** | 15 updated | 0 | N/A — no data this window | None; 1.0.81–1.0.82 fallout in triage |
| **OpenCode** | ~10 highlighted | 10 | N/A — none reported | None |
| **Pi** | ~10 highlighted | 10 | 2 | None; 0.85.1 packaging regression open (#9226) |
| **Qwen Code** | ~10 highlighted | 10 | N/A — none reported | v0.23.1-preview.1 shipped; **CI failed 4×** |

*Counts marked "~" reflect digest-highlighted items, not exhaustive repo totals. N/A = channel data unavailable/not reported in this window, not confirmed inactivity. Copilot CLI's zero PRs reflects its closed-contribution model — momentum shows up in issue volume, not code review.*

## 3. Shared Feature Directions

- **Subagent/multi-agent reliability & observability (all 7 tools).** The single strongest cross-tool signal. Claude Code: duplicate worker fanout (#55586), token-burning ack loops (#47930), shared scratchpads (#87243). Gemini CLI: false `GOAL` success after `MAX_TURNS` (#22323), indefinite hangs (#21409). Codex: per-subagent model/effort visibility lost (#32283). Copilot CLI: `agentStop` misfiring on subagent turns (#3894). OpenCode: child-session events misrouted to parent (#46685). Common asks: deterministic fanout, per-agent state isolation, accurate termination reporting, per-run cost attribution.
- **Sandboxing & permission integrity (6 of 7).** Gemini CLI: zero-dependency OS sandboxing proposal (#19873), Windows git-arg validation (#29184). Claude Code: symlink-escape and shell-injection fixes (#68689, #68786). Qwen Code: `PreToolUse` hooks silently unenforced after `--continue` (#11180). Copilot CLI: ACP auto-approve regression (#4537). The pattern: permission models must survive resume/continue/reload paths.
- **Prompt-caching economics & cost transparency (5 of 7).** Claude Code: 33-token diff invalidating 5.3k cached tokens (#82739). Copilot CLI: BYOK silently disabling caching, ~5× cost (#4720). Pi: system-message *delta delivery* explicitly to preserve caches (#9117), plus gateway billing anomalies. OpenCode: quota-metering math bugs (#47547). Cost observability is now a feature request category of its own.
- **MCP lifecycle reliability (4 of 7).** OAuth token reuse failures (Copilot #4695), reauth loops (OpenCode #47636), RFC 9207 enforcement (Gemini #29117). MCP is ubiquitous; its auth/state handling is not yet boring.
- **Session durability & history hygiene (all 7).** Codex cross-device sync (61 👍, top discussion) and history deletion (#20476); per-prompt rewind (Claude #43755, Qwen #9911); resume/reload guards (Gemini #29195, Pi #9222, OpenCode #47629).
- **Voice input (2 tools, but resourced).** Codex is building a full WebRTC/Opus/Bazel voice runtime (~10 PRs); OpenCode has an active voice-MCP request (#41413). Early signal of the next input modality.

## 4. Differentiation Analysis

| Tool | Center of Gravity | Target User | Distinctive Approach |
|---|---|---|---|
| Claude Code | Agentic teamwork + plugin platform | Team/enterprise power users | Function Hooks middleware RFC (#91870, de-facto plugin v2); Agent Teams orchestration; daily quiet releases |
| Codex | Multi-client platform (TUI + Desktop + IDE + Web + voice) | ChatGPT subscribers | Voice runtime investment, Guardian safety layer, cross-device sync ambition; heavy Windows bet — and Windows pain |
| Gemini CLI | Security & token efficiency | Open-source, security-conscious devs | OS-native sandboxing embracing bash affinity; AST-aware tooling (#22745); disciplined P1–P3 triage |
| Copilot CLI | GitHub/enterprise-native | GHEC, org-managed, BYOK users | Data residency, org model-policy parity, ACP integration; closed development |
| OpenCode | Provider-agnostic + hosted Go tier | Multi-vendor & local-model users | Broad provider registry (NVIDIA NIM, llmman, Ollama); billing/metering is the current battleground |
| Pi | Extensible agent harness | Extension authors, router power users | Many provider adapters (Meta Muse OAuth, LLM Gateway); delta-based prompt delivery; Proxy-based UI wrapping |
| Qwen Code | Web-shell convergence & interop | GUI-preferring, multi-tool users | Web Shell exports, ACP delegation to external agents (Claude Code first), dynamic workflows |

Strategically: single-vendor tools compete on orchestration breadth and client surface; open/multi-provider tools compete on neutrality, local runtimes, and protocol interop. Qwen Code's ACP delegation to Claude Code and Pi's multi-vendor adapters show the ecosystem trending toward **composable agent stacks** rather than winner-take-all.

## 5. Community Momentum & Maturity

- **Highest raw volume: Codex** (50 issues / 27 PRs / 8 discussions) — broadest engineering surface, but the Windows backlog (WSL project creation, DWM corruption, sandbox git failures) is a significant drag.
- **Highest engagement density: Claude Code** — the Function Hooks thread (118 comments) and Team-tier pricing issue (131 👍) show the community effectively co-designing the roadmap; Agent Teams bugs are its credibility risk.
- **Fastest disciplined open-source iteration: Gemini CLI** — nightly cadence, same-day merged security fixes, priority-labeled triage. Process maturity exceeds its feature maturity.
- **Rapid but unstable: Qwen Code** — three release attempts in the window, four CI failures; compensating with release-engineering PRs (#10898, #11165).
- **Trust under pressure: OpenCode** — engineering output is healthy (10 PRs), but paying users report lockout-grade 429s, wrong quota math, and declined renewals; churn risk if unaddressed.
- **Signal-dense but small: Pi** — low volume, high architectural signal (caching deltas, extension API); attractive to tinkerers, not yet mainstream.
- **Momentum without transparency: Copilot CLI** — active issue tracker, zero PR visibility; the 1.0.81–1.0.82 regression cluster suggests ship-speed/QA tension with no external review pressure relief valve.

## 6. Trend Signals

1. **Multi-agent is in production, and cost-of-failure is the story.** A 443,914-token burn with zero tool calls (Claude #87293) and 5,400 wasted tool calls over 7h (#91242) are direct financial losses. Before adopting orchestration features, demand per-run token/cost accounting.
2. **Prompt-cache economics are now architecture, not optimization.** Cache-invalidation bugs (Claude #82739), BYOK caching silently off (Copilot #4720), and Pi's delta-delivery refactor all point one direction: cache-stable prompt design will separate expensive agents from cheap ones. BYOK users should verify `cached_tokens` behavior explicitly.
3. **The agent scaffold is an attack surface.** Permission bypasses on resume, telemetry leaking shell command lines (Qwen #11198), symlink escapes, hook RCE — treat CLI agent config (`.claude/`, skills, hooks) with the same scrutiny as CI credentials.
4. **Protocol interop is reducing lock-in.** MCP ubiquity plus ACP-based cross-vendor delegation (Qwen → Claude Code) means protocol-native tools retain option value; single-stack bets are riskier than a quarter ago.
5. **The "CLI" is becoming one face of a multi-surface client.** Voice runtimes (Codex), desktop apps, web shells (Qwen), and IDE companions everywhere — evaluate tools as platforms, not terminals.
6. **Windows remains a second-class platform** across Codex, Claude Code, and OpenCode (WSL path bugs, DWM corruption, sandbox gaps). Windows-first orgs should budget for platform-adjacent instability.
7. **Billing opacity is an emerging churn driver** — metering bugs, plan inconsistencies, and quota black boxes appear in 4 of 7 trackers (OpenCode, Copilot, Claude, Codex). Usage transparency is becoming a procurement criterion, not a nicety.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data as of:** 2026-09-06 | **Repository:** [anthropics/skills](https://github.com/anthropics/skills)

> *Note: comment counts for PRs are not present in the source dataset, so the PR ranking is based on recency, scope, and ecosystem significance, cross-referenced with Issues that surface community pain points.*

---

## 1. Top Skills Ranking

### 1. [#1298](https://github.com/anthropics/skills/pull/1298) — Fix `skill-creator`: `run_eval.py` 0% recall (Windows + signal)
**Status:** OPEN | Updated 2026-06-23
The highest-leverage PR in the queue. `run_eval.py` (and the description-optimization loop that consumes its output) has been reporting `recall=0%` regardless of skill content — see [Issue #556](https://github.com/anthropics/skills/issues/556) (12 comments, 7 👍). The fix repairs the eval artifact installation, Windows stream reading, trigger detection, and parallel workers. Without this landing, every skill-authoring iteration is training against noise.

### 2. [#1628](https://github.com/anthropics/skills/pull/1628) — Hivemind: Zero-Cost Multi-Agent Orchestration
**Status:** OPEN | Updated 2026-08-24
Lets Claude Code delegate mechanical work to headless [opencode](https://opencode.ai) workers running on free models while Claude remains the planner/reviewer/merger. Strongly aligned with the community's emerging interest in multi-agent patterns and token economics — "the expensive model's context is the scarce resource, not its intelligence."

### 3. [#1367](https://github.com/anthropics/skills/pull/1367) — Self-Audit (v1.3.0): mechanical verification + four-dimension reasoning quality gate
**Status:** OPEN | Updated 2026-07-02
A universal pre-delivery audit that first mechanically verifies every claimed output file, then runs a reasoning-quality audit in damage-severity priority order. Directly mirrors the proposal in [Issue #1385](https://github.com/anthropics/skills/issues/1385). High applicability across any tech stack.

### 4. [#83](https://github.com/anthropics/skills/pull/83) — `skill-quality-analyzer` + `skill-security-analyzer` (marketplace meta-skills)
**Status:** OPEN | Updated 2026-01-07
Two meta-skills for evaluating other Skills across structure/documentation and security dimensions. The clearest response to [Issue #492](https://github.com/anthropics/skills/issues/492) (43 comments — the most-discussed community concern), which highlights trust-boundary abuse via the `anthropic/` namespace.

### 5. [#1627](https://github.com/anthropics/skills/pull/1627) — Buffer API Agent Skill (social scheduling via GraphQL)
**Status:** OPEN | Updated 2026-09-05
Portable social-media scheduling/analytics skill built on Buffer's GraphQL API. Designed to work across multiple agent frameworks (Claude, Cursor, Codex, n8n, etc.). High workflow value and clean scope.

### 6. [#514](https://github.com/anthropics/skills/pull/514) — Document Typography Skill
**Status:** OPEN | Updated 2026-03-13
Typographic QC for AI-generated documents (orphan wrap, widow paragraphs, numbering misalignment). Affects every document Claude produces.

### 7. [#486](https://github.com/anthropics/skills/pull/486) — ODT (OpenDocument Text) Skill
**Status:** OPEN | Updated 2026-04-14
Fills the ODF/LibreOffice gap in the official skills collection. Covers creation, template filling, and ODT↔HTML parsing.

### 8. [#723](https://github.com/anthropics/skills/pull/723) — Testing Patterns Skill
**Status:** OPEN | Updated 2026-04-21
Comprehensive testing stack: Testing Trophy, unit testing, React component testing, etc. A developer-focused skill with broad framework applicability.

---

## 2. Community Demand Trends

**A. Skill infrastructure / meta-layer (strongest signal).** [#492](https://github.com/anthropics/skills/issues/492) (43 comments) drives demand for security/quality gating over community skills; [#83](https://github.com/anthropics/skills/pull/83), [#1367](https://github.com/anthropics/skills/pull/1367), and [#1385](https://github.com/anthropics/skills/issues/1385) all push for skills-that-audit-skills.

**B. Multi-agent orchestration & memory compression.** [#1628](https://github.com/anthropics/skills/pull/1628) (Hivemind) and [#1329](https://github.com/anthropics/skills/issues/1329) (compact-memory) reflect a shift toward skills that reduce token overhead and coordinate sub-agents.

**C. Distribution & lifecycle management.** [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 8 👍 — highest thumbs ratio) demands org-wide skill sharing in Claude.ai; [#62](https://github.com/anthropics/skills/issues/62) (10

---

# Claude Code Community Digest — 2026-09-06

## Today's Highlights

The community continues to push on the **plugin/hooks extensibility frontier** — the Function Hooks proposal (#91870) is now the most-discussed issue on the repo, signaling that developers want first-class middleware semantics inside Claude Code. Meanwhile, a cluster of **Agent Teams reliability bugs** (token-burning loops, duplicate worker spawning, shared-scratchpad races) has bubbled up as the top operational pain point, and v2.1.263 shipped a quiet reliability patch on top of it.

## Releases

**v2.1.263** — released in the last 24h. Changelog is intentionally minimal: *"Bug fixes and reliability improvements."* No release notes, diffs, or migration steps published. ([release](https://github.com/anthropics/claude-code/releases/tag/v2.1.263))

Given the volume of open Agent Teams bugs (#47930, #55586, #87243, #90930, #91242, #87293), this build is widely assumed to target orchestrator/subagent stability.

## Hot Issues

1. **[#91870 — Function Hooks: make plugins 10× more powerful](https://github.com/anthropics/claude-code/issues/91870)** — 118 comments, 74 👍. Proposes an Express/Koa-style middleware model with parameterized side-effect tracking over a `$` object. By far the loudest thread on the repo; effectively a community RFC for plugin v2.
2. **[#47509 — Team plan needs a Max 20× equivalent tier](https://github.com/anthropics/claude-code/issues/47509)** — 35 comments, **131 👍** (highest upvote ratio in the set). Power users on Team plans are capped at 6.25× Pro usage and want a CTO/lead-grade tier mirroring individual Max 20×.
3. **[#55586 — Agent Teams spawns 10–151 duplicate workers per teammate](https://github.com/anthropics/claude-code/issues/55586)** — 16 comments. A single teammate spawn fans out into hundreds of worker instances, each editing files independently. Closed, but mirrors several other Agent Teams bugs.
4. **[#26356 — OSC 8 hyperlinks work in IDE terminals but not Konsole](https://github.com/anthropics/claude-code/issues/26356)** — 15 comments, 5 👍. Statusline rendering diverges between real terminal emulators and IDE-shells; classic terminal-feature parity gap.
5. **[#30031 — Multiple-account login and switching (à la `gh auth switch`)](https://github.com/anthropics/claude-code/issues/30031)** — 13 comments, 66 👍. Consultants and contractors juggling personal + N client accounts want `claude auth switch`.
6. **[#87971 — Claude abuses bash for reads/writes/edits in Auto Mode (Windows/VS Code)](https://github.com/anthropics/claude-code/issues/87971)** — 10 comments, 50 👍. Auto Mode routes everything through `Bash` instead of the dedicated Read/Write/Edit tools, breaking permissions UX and audit logs.
7. **[#41121 — Max plan: Sonnet[1m] requires extra usage but Opus[1m] is included](https://github.com/anthropics/claude-code/issues/41121)** — 9 comments, 6 👍. Pricing-model inconsistency around 1M-context variants on Max subscriptions.
8. **[#47930 — Agent Teams lead burns 13–22% of input tokens on no-op acks](https://github.com/anthropics/claude-code/issues/47930)** — 8 comments, 8 👍. Lead session loops on idle notifications and duplicate `task_assignment` echoes, silently incinerating context.
9. **[#43755 — Per-prompt rewind/undo in Desktop App](https://github.com/anthropics/claude-code/issues/43755)** — 7 comments, 4 👍. Users want a granular undo across multi-step generations, not just full session checkpoints.
10. **[#87243 — Sibling subagents share ONE scratchpad directory](https://github.com/anthropics/claude-code/issues/87243)** — 4 comments. Generic filenames in the per-session scratchpad silently overwrite between siblings; a forked Skill inherits the *parent's* scratchpad. Documentation claims per-agent isolation that doesn't exist.

**Also notable (open, low-comment but high-signal):** [#90930](https://github.com/anthropics/claude-code/issues/90930) (post-fanout infinite sleep-timer loop), [#91242](https://github.com/anthropics/claude-code/issues/91242) (SendMessage routing failure → 5,400 wasted tool calls over 7h), [#87293](https://github.com/anthropics/claude-code/issues/87293) (subagent burns 443,914 tokens with zero tool calls), [#82739](https://github.com/anthropics/claude-code/issues/82739) (cache breakpoint ~5.3k tokens upstream of user message — 33-token prompt diff invalidates 5.3k cached tokens).

## Key PR Progress

A striking share of recent PRs come from a single maintainer (**AZERDSQ131**) and are quality/security hardening for the plugin ecosystem shipped in-tree:

1. **[#68707 — `feat(bug-reporter): add /bug` command](https://github.com/anthropics/claude-code/pull/68707)** — New in-CLI `/bug` slash command for filing GitHub issues on `anthropics/claude-code` from the terminal. Lowers friction for triage.
2. **[#68689 — Block symlink escape in security-guidance config reads](https://github.com/anthropics/claude-code/pull/68689)** — Closes a local file-disclosure vector where `.claude/claude-security-guidance.md` could be a symlink to `~/.ssh/id_rsa` etc. Real CVE-class fix.
3. **[#68786 — Shell injection via stdin redirection in `test-hook.sh`](https://github.com/anthropics/claude-code/pull/68786)** — Replaces unsafe string interpolation with stdin piping; closes a hook-dev RCE class.
4. **[#68785 — Hook JSON to stdout, tighten `su*` glob, fix CI/JSON injection in examples](https://github.com/anthropics/claude-code/pull/68785)** — Corrects the reference hook examples so they actually match production semantics.
5. **[#68693 — Duplicate label shouldn't wipe existing labels](https://github.com/anthropics/claude-code/pull/68693)** — `closeIssueAsDuplicate` was replacing the full label set via PATCH, silently dropping platform/area/priority labels. Classic destructive-API bug.
6. **[#68699 — `hookify`: Python wrapper + Windows path normalization](https://github.com/anthropics/claude-code/pull/68699)** — Handles Microsoft Store `python3` stub exit-49 and `CLAUDE_PLUGIN_ROOT` backslash separators.
7. **[#68701 — Strip CRLF from Python version probe on Windows](https://github.com/anthropics/claude-code/pull/68701)** — `[ "$v" = "3" ]` comparison was failing because of `\r\n` line endings.
8. **[#87077 — Repair invalid YAML frontmatter in pr-review-toolkit agents](https://github.com/anthropics/claude-code/pull/87077)** — Dialogue-style descriptions (`Daisy: "..."`) were being parsed as nested mappings, causing agents to load with empty frontmatter.
9. **[#87079 — `**` glob should match zero-depth paths in security-guidance](https://github.com/anthropics/claude-code/pull/87079)** — `fnmatch`'s `*` already crosses `/`, so `**/*.ts` silently excluded top-level files from security rules. Silent non-coverage in a *security* config is exactly the failure mode you don't want.
10. **[#68702 — `ralph-wiggum`: guard `PROMPT_PARTS` against `set -u` on bash 3.x](https://github.com/anthropics/claude-code/pull/68702)** — macOS default bash trips on empty-array expansion; canonical `${arr[*]:-}` fix.

**Also merged:** #68787 (no-arg error in `edit-issue-labels.sh`), #68694 (Windows `CLAUDE_PLUGIN_ROOT`), #68690 (typo in `ralph-wiggum` state path), #68686 (shadowed `field` var in `hookify`), #68682/#68680/#68678/#68673 (script/workflow hardening).

## Feature Request Trends

Distilled from the open issue backlog:

- **Plugin extensibility v2** — middleware-style Function Hooks, namespaced slash commands, and reliable plugin→agent loading. (#91870, #74363)
- **Team/Enterprise plan parity** — Max 20× equivalent for Team seats, transparent seat-type labeling, per-prompt cost ceilings. (#47509, #41121)
- **Multi-account UX** — `claude auth switch`, visible active-account indicator, per-account history. (#30031)
- **Agent Teams & subagents reliability** — true per-agent scratchpad isolation, terminal cleanup, deterministic worker fanout, prompt-cache alignment across siblings. (#87243, #87293, #82739, #55586, #47930, #90930, #91242)
- **Desktop App parity** — per-prompt undo/rewind, IDE-equivalent terminal rendering (OSC 8), better tool-routing in Auto Mode. (#43755, #26356, #87971)
- **Cost/observability** — concrete token-cost reporting on Agent Teams runs (currently a black box for "no-op ack" loops).

## Developer Pain Points

The signal from the last 24h is unusually concentrated:

1. **Agent Teams is not production-ready.** Six independent open bugs describe runaway token consumption, duplicate workers, infinite heartbeat loops, and zero-tool-call subagents. Engineers running agentic workflows at scale are paying real money for these loops. (#47930, #87293, #91242, #90930, #55586, #82739)
2. **The scratchpad abstraction lies.** Documentation says session-isolated, but siblings share one dir and Skills inherit parent state. Silent overwrite is the worst kind of bug. (#87243)
3. **Prompt-cache economics are opaque.** A 33-token prompt difference invalidating 5,308 cached tokens (#82739) is the kind of finding that should be surfaced by the tool itself.
4. **Auto Mode routes everything through Bash** on VS Code/Windows, breaking the dedicated-tool permissions model users configured. (#87971)
5. **Plan/policy inconsistencies** (Sonnet 1M vs. Opus 1M on Max; Team plan lacking a power-user tier) create unpredictable cost forecasting. (#41121, #47509)
6. **Plugin security hygiene** is real and being patched — symlink escapes, shell injection via `test-hook.sh`, glob semantics in security rules. The PR wave from AZERDSQ131 is closing a class of issues, but it took the community to file them.

---

*Digest compiled from GitHub activity on `anthropics/claude-code` for 2026-09-06. No Discussions data was available for this window.*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-06

## Today's Highlights

No new releases in the last 24 hours, but the repository is highly active with **27 PRs and 50 updated issues**, dominated by Windows platform bugs and a coordinated push to ship **Bazel-based native voice runtime/SDK infrastructure** on Windows, macOS, and Linux. Long-standing community pain points — multi-repo workspaces (32 👍), Windows WSL sandboxing, and missing subagent telemetry — continue to drive the most engagement.

---

## Releases

*No new releases in the last 24 hours.*

---

## Hot Issues

1. **[#26338](https://github.com/openai/codex/issues/26338) — Support parent workspaces containing multiple Git repositories** (12 comments, **32 👍**)
   A long-standing, highly-upvoted enhancement: Codex App currently forces one workspace = one Git repo, blocking monorepo-adjacent workflows. Repeatedly requested alongside #14218 and #15168.

2. **[#41463](https://github.com/openai/codex/issues/41463) — Windows + WSL: Cannot create projects (AbsolutePathBuf deserialized without base path)** (31 comments, **20 👍**)
   Hard blocker for Windows/WSL2 users on Codex Desktop `26.825.4187.0` — projects fail to initialize due to a path-handling bug in the app-server bridge.

3. **[#34227](https://github.com/openai/codex/issues/34227) — Windows pet overlay hit region desync** (28 comments)
   Cosmetic/UX bug where the animated desktop mascot's clickable hitbox drifts away from the visible sprite over time — degrades user trust in overlay interactions.

4. **[#31073](https://github.com/openai/codex/issues/31073) — Windows native sandbox: Git HTTPS remote operations fail** (20 comments)
   Local git works inside Codex, but any `git fetch/push/clone` over HTTPS crashes the sandbox — a critical capability gap for Windows-native developers.

5. **[#39280](https://github.com/openai/codex/issues/39280) — macOS Chrome browser use: policy verification blocks real-page actions** (18 comments, 5 👍)
   The bundled Chrome extension can list and claim tabs, but every real-page interaction is rejected before reaching Chrome — effectively disables browser-use on macOS.

6. **[#42215](https://github.com/openai/codex/issues/42215) — Windows ChatGPT Work: project context sync fails at filesystem stage** (15 comments)
   Existing ChatGPT Projects (23 files) can no longer start a local Work chat — a regression for power users on the Windows MSIX build `26.825.6671.0`.

7. **[#20476](https://github.com/openai/codex/issues/20476) — Ability to delete/clear Codex Web conversation history** (7 comments, **15 👍**)
   Privacy-sensitive feature request: Web conversations persist and sync into Codex App with no UI to purge them.

8. **[#32283](https://github.com/openai/codex/issues/32283) — Subagents panel no longer shows model or reasoning effort** (5 comments, **15 👍**)
   Regression in Codex Desktop `26.707.3748.0`; users cannot see which model each subagent is running. Reinforced by #32125 and #35027.

9. **[#39933](https://github.com/openai/codex/issues/39933) — Windows IDE extension: `helper_unknown_error: setup refresh had errors`** (12 comments)
   VS Code extension `26.818.31338` on Windows cannot execute any command, blocking all IDE-embedded workflows.

10. **[#40531](https://github.com/openai/codex/issues/40531) — Desktop app corrupts DWM compositor state on Windows 11** (11 comments)
    After 1–3 hours, the Codex desktop app triggers system-wide mouse/window stutter that **survives closing the app** — a serious OS-stability concern.

---

## Key PR Progress

1. **[#43120](https://github.com/openai/codex/pull/43120) — Add managed worktree creation to TUI session commands**
   Introduces `/worktree`, and lets `/new` and `/fork` offer current-checkout vs. new-worktree choices with optional conversation names — a significant TUI ergonomics upgrade.

2. **[#43113](https://github.com/openai/codex/pull/43113) — Save subagent and memory opt-ins through the app server**
   Routes subagent/memory prompts through server config writes so opt-ins survive correctly across new threads; addresses the subagents panel complaints.

3. **[#43178](https://github.com/openai/codex/pull/43178) — Allow guarded legacy resume with background migration enabled**
   Re-enables the TUI's cached legacy-resume shortcut during background rollout migration, fixing a workflow break.

4. **[#43177](https://github.com/openai/codex/pull/43177) — Use server model defaults for fresh TUI startup**
   Reuses server-effective model/reasoning settings on fresh startup instead of stale bootstrap cache; closes a divergence window.

5. **[#43147](https://github.com/openai/codex/pull/43147) — Gate experimental context by model capability at session startup**
   Adds model-capability checks before enabling experimental context; prevents child sessions from inheriting a parent's token-budget activation.

6. **[#43110](https://github.com/openai/codex/pull/43110) — Record reasoning effort changes in conversation history (behind flag)**
   Adds a `reasoning_effort_override` feature for `use_responses_lite` and appends a trusted `configuration_update` event — improves rollout auditability.

7. **[#43104](https://github.com/openai/codex/pull/43104) — Move Guardian thread context into `guardianv2` configuration**
   Renames `features.guardian_thread_context` → `features.guardianv2.thread_context`; default-off, controls thread-owned context for sync/async Guardian.

8. **[#43097](https://github.com/openai/codex/pull/43097) — Add a helper-backed realtime WebRTC session API**
   Introduces `RealtimeWebrtcSession` with cloneable handles for startup, SDP negotiation, audio controls, level meters, and error reporting — a foundation for voice sessions.

9. **[#43100](https://github.com/openai/codex/pull/43100) — Add bounded incoming Opus RTP handling to voice host**
   Caps outstanding media at 64 packets / 2 MiB and 64 KiB per packet; preserves arrival timestamps without doubling queue memory — important for voice stability.

10. **[#43144](https://github.com/openai/codex/pull/43144) — Add Windows MSVC Bazel targets for native voice libraries**
    Along with #43126, #43125, #43121, #43117, #43114, #43111, #43109, #43102, #43099, this is a coordinated effort to make native voice builds reproducible across Windows MSVC, macOS, and Linux GNU 2.28 via Bazel toolchains.

---

## Hot Discussions

### Ideas

- **[#14067](https://github.com/openai/codex/discussions/14067) — Synchronization of Codex Threads and Session Context Across Devices** (10 comments, **61 👍**)
  The most upvoted discussion in the recent window. Users want their Codex threads and session context to follow them across machines — currently locked to local environment.

- **[#37693](https://github.com/openai/codex/discussions/37693) — Keyboard shortcuts to jump between user messages** (1 comment, 3 👍)
  Companion to #28073 — proposes "jump to previous/next user message" anchors for navigating long conversations.

- **[#28073](https://github.com/openai/codex/discussions/28073) — Clickable user prompt navigator** (1 comment, 3 👍)
  A visual index/sidebar of user prompts within a single conversation.

- **[#42703](https://github.com/openai/codex/discussions/42703) — Long-horizon context: can history retrieval become self-referential?** (1 comment, 1 👍)
  Thoughtful concern about the new `history` / `notes` / `new_context` flow potentially creating recursive staleness across fresh context windows.

- **[#42992](https://github.com/openai/codex/discussions/42992) — OpenClaw subagent sessions appear as top-level sidebar chats** (1 comment, 1 👍)
  On macOS Codex Desktop, internal OpenClaw child sessions pollute the project sidebar and some can't be archived.

### Q&A

- **[#40740](https://github.com/openai/codex/discussions/40740) — Does rollout tracing capture which path produced a Declined exec status?** (2 comments, 1 👍)
  Investigates why `ExecApprovalRequest` / `ApplyPatchApprovalRequest` / `GuardianAssessment` are excluded from rollout persistence — a niche but important traceability question.

### Show and tell

- **[#41157](https://github.com/openai/codex/discussions/41157) — CodexFuse 1.2.0 — local Windows dashboard for Codex rate limits** (1 comment, 1 👍)
  An unaffiliated no-install Win32 dashboard (PT/EN) visualizing used/available quota, next reset, and hourly use — direct response to rate-limit visibility pain.

- **[#43224](https://github.com/openai/codex/discussions/43224) — NULLYARD — public MCP board with a static setup guide** (0 comments, 1 👍)
  An operator-created public plain-text MCP board with a no-login skill and integration guide.

---

## Feature Request Trends

- **Multi-repo / monorepo workspaces** — the single most upvoted enhancement this cycle (#26338, 32 👍), with related requests in #14218 and #15168.
- **Cross-device session sync** — #14067 has **61 👍**, by far the most-liked discussion in the window.
- **Subagent observability** — multiple issues (#32283, #32125, #35027, #43113 PR) all demanding visible model + reasoning effort per subagent.
- **Conversation hygiene** — ability to delete, archive, and navigate long conversation history (#20476, #37693, #28073).
- **Quota transparency & graceful stop** — #24927 (intelliJ) and #43222 (quota

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-06

## Today's Highlights

The ecosystem is heavily focused on **subagent reliability and sandboxing**: multiple P1 bugs (#22323, #21409, #21983) expose incorrect termination reporting, indefinite hangs, and platform-specific failures (Wayland), while a major enhancement proposal (#19873) introduces zero-dependency OS sandboxing to leverage Gemini 3's native bash affinity. Security hardening continues to dominate merged work, including Windows sandbox validation, MCP OAuth RFC 9207 enforcement, and several docs/symlink discovery fixes.

---

## Releases

**v0.60.0-nightly.20260906.g85aca163f** — Routine nightly build. View the full diff against [v0.60.0-nightly.20260905](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260905.g85aca163f...v0.60.0-nightly.20260906.g85aca163f). No major changelog notes published.

---

## Hot Issues

1. **#22323 — Subagent recovery after MAX_TURNS is reported as GOAL success** (p1, 13 comments)
   The `codebase_investigator` subagent reports `status: "success"` and `Termination Reason: "GOAL"` even after hitting the maximum turn limit before any analysis. This silently hides interruptions and misleads downstream orchestration. — [Link](https://github.com/google-gemini/gemini-cli/issues/22323)

2. **#19873 — Zero-Dependency OS Sandboxing & Post-Execution Intent Routing** (p2, 9 comments)
   Large effort to embrace Gemini 3's native bash training by chaining POSIX utilities (`grep`, `sed`, `awk`) inside sandboxed execution with intent-aware routing. Significant architectural implications for security/UX. — [Link](https://github.com/google-gemini/gemini-cli/issues/19873)

3. **#21409 — Generalist agent hangs indefinitely** (p1, 8 comments, 8 👍)
   Whenever the CLI defers to the generalist subagent on simple tasks (e.g., folder creation), it hangs forever — users report waiting an hour. Explicit "no subagents" instructions resolve it, pointing to a delegation/routing bug. — [Link](https://github.com/google-gemini/gemini-cli/issues/21409)

4. **#22745 — EPIC: Assess AST-aware file reads, search, and mapping** (p2, 7 comments)
   Tracks investigations into AST-aware tooling to precisely bound method reads, navigate codebases more efficiently, and reduce token noise. Likely precursor to `codebase_investigator` upgrades. — [Link](https://github.com/google-gemini/gemini-cli/issues/22745)

5. **#21968 — Gemini does not use skills and sub-agents enough** (p2, 6 comments)
   Users observe that even with explicit `gradle`/`git` skill descriptions, the model rarely invokes custom skills or subagents without direct prompting — surfacing a skill-discovery/prompting gap. — [Link](https://github.com/google-gemini/gemini-cli/issues/21968)

6. **#26525 — Auto Memory deterministic redaction and reduced logging** (p2, 5 comments)
   Auto Memory currently relies on the extractor model to redact secrets after content is already in context. Proposal adds deterministic redaction and tightens logging to prevent sensitive data exposure. — [Link](https://github.com/google-gemini/gemini-cli/issues/26525)

7. **#25166 — Shell command stuck on "Waiting input" after completion** (p1, 4 comments, 3 👍)
   Common, easy-to-reproduce hang: simple shell commands finish but the CLI keeps the prompt in "Awaiting user input" state. High user-frequency P1. — [Link](https://github.com/google-gemini/gemini-cli/issues/25166)

8. **#21983 — Browser subagent fails on Wayland** (p1, 4 comments)
   `browser_agent` exits with `Termination Reason: GOAL` on Wayland despite failure. Platform-specific display-server bug affecting Linux desktop users. — [Link](https://github.com/google-gemini/gemini-cli/issues/21983)

9. **#22232 — Browser agent resilience: session takeover and lock recovery** (p3, 4 comments)
   `BrowserManager` currently fail-fasts on locked persistent profiles. Proposal adds automatic session takeover to recover from orphaned/locked Chromium processes. — [Link](https://github.com/google-gemini/gemini-cli/issues/22232)

10. **#20079 — Symlinked `~/.gemini/agents/*.md` not recognized** (p2, 4 comments)
    Dotfile-managed users symlinking agent definitions are silently ignored. Simple file-discovery fix with broad impact for power users. — [Link](https://github.com/google-gemini/gemini-cli/issues/20079)

---

## Key PR Progress

1. **#29184 — Validate git args in Windows sandbox** (open, p1, security)
   Closes a silent-confirmation bypass: `git diff --output=<path>` ran without prompts in default mode on Windows because the family was treated as read-only. Arg-level validation now blocks destructive flags. — [Link](https://github.com/google-gemini/gemini-cli/pull/29184)

2. **#29106 — Flush final SSE event on EOF without trailing blank line** (closed)
   Fixes silent loss of `finishReason`/usage metadata when streams truncate or pass through non-conformant proxies. — [Link](https://github.com/google-gemini/gemini-cli/pull/29106)

3. **#29117 — Enforce RFC 9207 issuer identification in MCP OAuth** (closed)
   Adds `iss` parameter validation in OAuth flow to prevent unintended token routing and ensure response-origin consistency. — [Link](https://github.com/google-gemini/gemini-cli/pull/29117)

4. **#29195 — Degrade non-array history instead of crashing `/resume`** (open, p2)
   `loadCheckpoint` now gracefully handles valid JSON with a non-array `history` instead of throwing a raw `TypeError` on resume. — [Link](https://github.com/google-gemini/gemini-cli/pull/29195)

5. **#29098 — Keep `useInputHistoryStore` state updaters pure** (open, p1)
   Moves `setPastSessionMessages()` and `recalculateHistory()` out of the `setCurrentSessionMessages()` updater — React StrictMode was double-invoking impure updaters. — [Link](https://github.com/google-gemini/gemini-cli/pull/29098)

6. **#29205 — Submit MCP prompt text without JSON encoding** (open, p2)
   `McpPromptLoader` no longer wraps prompt response text in JSON, preserving embedded quotes/newlines verbatim. Adds regression test. — [Link](https://github.com/google-gemini/gemini-cli/pull/29205)

7. **#29125 — Convert hook timeout from seconds to milliseconds** (open, p2)
   Fixes a units mismatch in the Claude Code → Gemini CLI hooks migration (default 60s was being read as 60ms). — [Link](https://github.com/google-gemini/gemini-cli/pull/29125)

8. **#29163 — Prevent crash during auth inside Git repositories** (open, p1, security)
   `useGitBranchName` was crashing in macOS Seatbelt/restricted-permission environments where `.git` is unreadable. Now gracefully handles the failure. — [Link](https://github.com/google-gemini/gemini-cli/pull/29163)

9. **#28967 — Prevent clearing terminal scrollback on static refresh** (closed)
   `refreshStatic()` previously emitted `clearTerminal` on Linux terminals, wiping user scrollback. Restricts clearing to alternate-buffer mode only. — [Link](https://github.com/google-gemini/gemini-cli/pull/28967)

10. **#29126 — Mount `express.json()` before A2A SDK routes** (open)
    Fixes `req.body` being undefined on A2A `POST /` JSON-RPC parsing by reordering middleware in `packages/a2a-server/src/http/app.ts`. — [Link](https://github.com/google-gemini/gemini-cli/pull/29126)

---

## Feature Request Trends

- **AST-aware codebase tools** (#22745, #22746) — Multiple issues coalesce around replacing firehose file reads with surgical, AST-aware navigation. Signals appetite for tools like `tilth` or `glyph` integration.
- **Better subagent utilization** (#21968, #22598, #22323, #21763) — The community wants Gemini to invoke skills/subagents more aggressively, with visible trajectories (`/chat share`) and richer bug-report context.
- **Auto Memory hardening** (#26525, #26523, #26522, #26516) — A four-issue cluster indicates Auto Memory is a priority area, with focus on deterministic redaction, inbox validation, and avoiding infinite low-signal retries.
- **Sandboxing without dependencies** (#19873) — Replacing heavyweight sandbox infrastructure with OS-native primitives to embrace the model's bash affinity.
- **Persistent file-based task tracking** (#18836, #21000) — Continued push to retire in-context `WriteToDo` in favor of native CRUD file tools to fight context rot.
- **Agent self-awareness** (#21432) — The model should accurately surface its own CLI flags, hotkeys, and execution patterns to users.

---

## Developer Pain Points

- **Subagent hangs and silent failures** — Multiple P1s (#21409, #22323, #21983) show subagents either hanging indefinitely or reporting `GOAL` success after `MAX_TURNS`, undermining trust in delegation.
- **Shell command lifecycle bugs** — #25166's stuck "Awaiting user input" is a high-frequency frustration with simple shell invocations.
- **Tool count ceiling** — #24246: >400 tools yields a 400 error; users want smarter in-scope tool limiting.
- **Workspace pollution** — #23571: When shell execution is restricted, the model scatters tmp scripts across directories, complicating cleanup for clean commits.
- **Skills/subagent discovery gaps** — #21968, #20079 (symlinks ignored), #21983: Users repeatedly find that custom skills, symlinked agents, or browser subagents aren't being recognized or invoked.
- **Interactive prompt deadlocks** — #22465: Agents get stuck on interactive scaffolding prompts like `npm create vite`; users want behavioral-eval-driven prompt hardening.
- **Auto Memory secret-handling** — #26525/#26522: Content reaches model context before redaction, and low-signal sessions retry forever, both raising security and reliability concerns.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI — Community Digest
**Date:** 2026-09-06

---

## 1. Today's Highlights

No new releases shipped in the last 24 hours, but the issue tracker saw heavy activity — 15 issues updated, including several high-severity regressions tied to the **1.0.81–1.0.82** line (ACP permission flow, GHEC data-residency auth, WSL2 memory). Two previously closed reports around enterprise model availability and GHEC auth suggest the team is actively triaging the 1.0.82 fallout, while a fresh cluster of UX/IO bugs (#4735, #4738, #4706) points to lingering prompt-rendering and tool-call robustness gaps.

---

## 2. Releases

*No new releases in the last 24 hours.*

---

## 3. Hot Issues

1. **[#4695 — MCP OAuth tokens for HTTP servers not reliably reused across sessions](https://github.com/github/copilot-cli/issues/4695)** *(open, 5 comments)*
For HTTP-type MCP servers using OAuth PKCE (`clientSecret: null`), Copilot CLI mints duplicate cache-key entries instead of reusing the still-valid token, forcing repeated re-auth flows. High relevance for anyone chaining remote MCP servers into daily sessions.

2. **[#4692 — Default Enterprise model not honored in CLI](https://github.com/github/copilot-cli/issues/4692)** *(open, 4 comments)*
`MAI-Code-1.1-Flash` (and presumably other tenant-defaults) work in VS Code and GitHub Desktop but the CLI logs "not available for this account; using the default model instead." A clear enterprise-readiness regression versus the GUI clients.

3. **[#4527 — `copilot -p` 401 on GHEC data residency since 1.0.81-1](https://github.com/github/copilot-cli/issues/4527)** *(closed, 4 👍)*
Non-interactive mode hit `api.githubcopilot.com` instead of the tenant endpoint on `<tenant>.ghe.com`, while interactive mode worked. Closed this cycle — likely a meaningful fix for EU/GHEC-residency customers; worth confirming in the next changelog.

4. **[#4537 — ACP mode auto-approves tool calls again (regression of #845)](https://github.com/github/copilot-cli/issues/4537)** *(open, 2 👍)*
`session/request_permission` is no longer sent since 1.0.81-1, so shells/file edits execute unattended. A safety-critical regression for users running `--acp` against custom front-ends.

5. **[#4272 — New models greyed out and can't be selected](https://github.com/github/copilot-cli/issues/4272)** *(closed, 3 👍)*
Models were locked behind organization policy with no UI affordance to enable them. Closed this cycle; another 1.0.82-era enterprise fix.

6. **[#3894 — `agentStop` triggering on subagent turns breaks `/review`](https://github.com/github/copilot-cli/issues/3894)** *(open, 1 👍)*
A custom `agentStop` hook (e.g., the digivolution plugin) fires on subagent turns too, so commands like `/review` never return. Important for plugin authors building on the agent lifecycle.

7. **[#4738 — `ask_user` form discards typed answer on early Enter](https://github.com/github/copilot-cli/issues/4738)** *(open)*
High-severity UX data-loss: pressing Enter too early in the elicitation form silently nukes the in-progress answer. Asker flags autosave/restore and Enter-inserts-newline as candidates.

8. **[#4706 — Tool/function calls intermittently emit malformed invocation markup](https://github.com/github/copilot-cli/issues/4706)** *(open)*
Self-reported by the Copilot CLI agent itself (Claude Opus 4.8 on Windows/PowerShell, 1.0.82): occasional `court` / `<invoke>` fragments cause the call to silently no-op. A reminder that model-issued tool calls are still brittle in practice.

9. **[#4735 — Assistant text before a tool call is folded into "Thought for Ns"](https://github.com/github/copilot-cli/issues/4735)** *(open)*
Substantial user-facing prose that should appear before a tool call is instead summarized into the collapsed reasoning region, hiding output from the user. Significant for users who rely on visible explanations.

10. **[#4720 — BYOK silently disables prompt caching in 1.0.82 (~5× cost)](https://github.com/github/copilot-cli/issues/4720)** *(open)*
1.0.82 BYOK requests omit the prompt-cache declaration, so providers report `cached_tokens=0` on every turn. Worst-impact single issue in this batch — direct cost multiplier for BYOK users.

**Notable runners-up:** [#4694 WSL2 ~31 GB RSS / ~57% CPU on Opus 5 high-effort](https://github.com/github/copilot-cli/issues/4694), [#4733 events dropped when `max_output_tokens` is hit (BYOK)](https://github.com/github/copilot-cli/issues/4733), [#4734 "Worktree missing" on all sessions after desktop 2.98.0/runtime 1.1.15](https://github.com/github/copilot-cli/issues/4734), [#4736 Ctrl+E should accept inline autocomplete](https://github.com/github/copilot-cli/issues/4736), [#4737 "thx copilot"](https://github.com/github/copilot-cli/issues/4737).

---

## 4. Key PR Progress

*No pull requests were updated in the last 24 hours.*

---

## 5. Hot Discussions

*No discussion data was provided for this digest.*

---

## 6. Feature Request Trends

Aggregating across issues updated today, the strongest feature directions are:

- **Emacs/terminal-style keybinding parity** — Ctrl+E accepting inline suggestions (#4736) signals a broader expectation of familiar readline-style shortcuts in the prompt UI.
- **Safer elicitation/IO flows** — drafts, autosave, and explicit "insert newline" semantics for `ask_user` forms (#4738); clearer rendering separation between reasoning and user-facing prose around tool calls (#4735).
- **More reliable BYOK economics** — explicit prompt-cache declarations (#4720) and consistent `max_output_tokens` truncation/event emission (#4733) are the two highest-value asks for BYOK users.
- **Plugin/agent lifecycle clarity** — distinguishing parent vs. subagent stops (#3894) so custom hooks can opt in to the right scopes.
- **Deeper platform fidelity** — better parity with VS Code / Desktop for enterprise-managed defaults (#4692) and stable MCP OAuth session reuse (#4695).

---

## 7. Developer Pain Points

- **1.0.82 regressions cluster:** ACP auto-approve (#4537), GHEC data-residency 401 (#4527), greyed-out enterprise models (#4272), malformed tool markup (#4706), WSL2 memory blow-up (#4694) — the 1.0.82 line is clearly under community scrutiny.
- **Cost/predictability on BYOK:** #4720 and #4733 together mean BYOK users can both pay 5× more per turn *and* lose intermediate events on truncation, making the mode harder to trust for long sessions.
- **UX data loss & trust:** the `ask_user` Enter-early bug (#4738) and assistant-text-being-hidden (#4735) erode confidence in the prompt UI specifically.
- **Cross-client inconsistency:** the enterprise default-model mismatch (#4692) keeps surfacing — the CLI is treated as a second-class citizen versus VS Code/Desktop for org-managed policies.
- **Reliability in non-happy-path sessions:** OAuth re-auth churn (#4695), Worktree-missing after desktop upgrades (#4734), and subagent hook misfires (#3894) all point to session lifecycle handling that still has rough edges.

---

*Generated from `github.com/github/copilot-cli` activity on 2026-09-06. No releases or PR activity in the 24-hour window; digest focuses on issue trends and regressions tied to the 1.0.81–1.0.82 line.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-06

## Today's Highlights
A cluster of OpenCode Go subscription problems dominates the issue tracker, with multiple paying users reporting persistent HTTP 429 rate-limits, mis-calculated monthly usage (sum-of-percents vs. dollar limits), and stale weekly quotas blocking service after renewal. On the engineering side, the team is shipping a wave of stability fixes—MCP OAuth lifecycle logging, markdown agent prompt resolution, location retention during sessions, and provider-busy retry handling—indicating a focused effort on hardening session lifecycle and provider reliability.

## Releases
No new releases in the last 24 hours.

## Hot Issues

1. **[#45278](https://github.com/anomalyco/opencode/issues/45278) — Payment Declined After 3 Months (10 comments, 👍2)**
   A paying user reports sudden card declines despite 3 months of successful charges. High signal because it directly affects renewals and retention, with no card or bank-side changes from the user.

2. **[#10504](https://github.com/anomalyco/opencode/issues/10504) — Termux/Android aarch64 binary failure (10 comments, 👍7)**
   Native Termux execution fails due to wrong interpreter and non-PIE executable. Highest 👍-to-comment ratio in the list; significant for mobile/Linux-on-mobile developers.

3. **[#47613](https://github.com/anomalyco/opencode/issues/47613) — Go subscription: persistent HTTP 429 (5 comments)**
   Paying Go user locked out for ~3 days; every request returns 429 with a ~12h retry-after that keeps resetting. Indicates a backend throttling or quota-accounting bug.

4. **[#41413](https://github.com/anomalyco/opencode/issues/41413) — Feature: Voice input MCP server (5 comments)**
   Requests a terminal-friendly voice input layer, since TUI tools lack clickable mic affordances. Aimed at parity with GUI assistants and accessibility.

5. **[#39570](https://github.com/anomalyco/opencode/issues/39570) — TUI breaks during multiple MCP operations (5 comments)**
   Sequential `gitlab_list_merge_requests` calls degrade the TUI in v1.18.9 on Windows git-bash. Points to a concurrency/render-path issue in MCP batching.

6. **[#30310](https://github.com/anomalyco/opencode/issues/30310) — opencode-go qwen3.7-max intermittent 500s (4 comments)**
   Provider-side instability for a popular model, breaking even simple text-only requests. Repeated reports suggest an unflagged upstream regression.

7. **[#47547](https://github.com/anomalyco/opencode/issues/47547) — Go blocked at 100% usage due to per-model sum (4 comments, 👍1)**
   Quota display sums per-model percentages instead of comparing dollars vs. the $60 cap, falsely blocking users. Pure billing-metering bug.

8. **[#35112](https://github.com/anomalyco/opencode/issues/35112) — 6MB request body blocks image inputs (4 comments, 👍1)**
   A hard-coded body cap on Qwen3.7Plus rejects legitimate multimodal use. Limits a key advertised capability of the Go tier.

9. **[#46685](https://github.com/anomalyco/opencode/issues/46685) — Subagent events misreported on parent session (3 comments)**
   External integrations lose visibility of root-session progress when child sessions emit `permission.asked`/`question.asked`/`session.error`. Impacts SDK and automation reliability.

10. **[#44799](https://github.com/anomalyco/opencode/issues/44799) — Model IDs containing `/` not resolved (NVIDIA NIM) (3 comments)**
    Registry keys with vendor-prefixed slashes (e.g. `nvidia/nemotron-3-ultra-550b-a55b`) can't be referenced even though the resolver suggests them. Blocks all NVIDIA NIM models.

## Key PR Progress

1. **[#47630](https://github.com/anomalyco/opencode/pull/47630) — refactor(core): unify filesystem access policy**
   Centralizes the duplicated path/external-directory permission recipe used across filesystem tools and reworks `LocationMutation` so resolution and permission resources serve reads, searches, and mutations consistently.

2. **[#47636](https://github.com/anomalyco/opencode/pull/47636) — fix(core): log MCP OAuth and credential lifecycle**
   Adds logging around MCP OAuth rejection and credential persistence, addressing recurring `needs_auth` reauth loops that previously left no diagnostic trail.

3. **[#47595](https://github.com/anomalyco/opencode/pull/47595) — feat: enable/disable skills + preferences API**
   Adds persistent, server-wide skill enable/disable preferences with TUI controls. Builds on earlier capability-preference work in #43536.

4. **[#47635](https://github.com/anomalyco/opencode/pull/47635) — fix(opencode): resolve markdown agent prompts**
   Fixes silently-dropped frontmatter `prompt:` keys and missing `{file:...}`/`{env:...}` token substitution. Closes [#47616](https://github.com/anomalyco/opencode/issues/47616).

5. **[#47629](https://github.com/anomalyco/opencode/pull/47629) — fix(core): interrupt sessions before inactivity eviction** *(closed)*
   Prevents the 60-min inactivity deadline from evicting a location's service graph while a session is still awaiting a question/permission answer.

6. **[#47628](https://github.com/anomalyco/opencode/pull/47628) — docs: add llmman provider setup**
   Adds `llmman` (OCI-packaged local model runtime) to providers.mdx alongside llama.cpp, LM Studio, and Ollama.

7. **[#47626](https://github.com/anomalyco/opencode/pull/47626) — fix(core): retain locations while sessions are executing** *(closed)*
   Companion fix to #47629; prevents form-service detachment when idle cleanup races with a running tool that still holds the old form service.

8. **[#47611](https://github.com/anomalyco/opencode/pull/47611) — Retry provider-busy messages** *(closed/merged direction)*
   Treats plain-text provider-busy errors ("no eligible device", "no available device") as retryable via `SessionRetry`, using existing backoff and `Retry-After` honoring to avoid headless-session wedges.

9. **[#47554](https://github.com/anomalyco/opencode/pull/47554) — fix(core): allow reads of registered skill resources**
   Allows reading supporting files from installed skill directories (including symlinked `~/.opencode/skill`) without spurious external-directory approval prompts.

10. **[#47621](https://github.com/anomalyco/opencode/pull/47621) — fix(provider): enforce chunk timeout regardless of content type**
    Removes the `Content-Type` gate from the shared provider SDK response-body watchdog and renames `wrapSSE`→`wrapStream`. Fixes [#47605](https://github.com/anomalyco/opencode/issues/47605).

## Feature Request Trends

- **Runtime permission/approval toggles.** Both [#41909](https://github.com/anomalyco/opencode/issues/41909) (`/approve on|off`) and [#47579](https://github.com/anomalyco/opencode/issues/47579) (`/auto` slash command) push for Claude Code-style live permission switching without restart.
- **Voice input for terminal workflows.** [#41413](https://github.com/anomalyco/opencode/issues/41413) + ecosystem PR [#47625](https://github.com/anomalyco/opencode/pull/47625) (`voice-mcp`) indicate sustained demand for hands-free, accessibility-friendly input.
- **Better text summary expansion in the TUI.** [#47633](https://github.com/anomalyco/opencode/issues/47633) requests collapsible/expandable summaries to manage long agent output.
- **Skills & agent authoring ergonomics.** [#47595](https://github.com/anomalyco/opencode/pull/47595) (skill enable/disable) and [#47635](https://github.com/anomalyco/opencode/pull/47635) (frontmatter `prompt:` resolution) reflect the community authoring more complex agent pipelines and wanting first-class control surfaces.
- **Local/self-hosted provider onboarding.** `llmman` docs (#47628) and continued ecosystem entries (e.g. `opencode-memory-pro` in #47594) show strong interest in pluggable local runtimes and memory layers.

## Developer Pain Points

- **OpenCode Go reliability and metering.** The single biggest complaint cluster: persistent 429s ([#47613](https://github.com/anomalyco/opencode/issues/47613), [#47598](https://github.com/anomalyco/opencode/issues/47598), [#47634](https://github.com/anomalyco/opencode/issues/47634)), quota-display math errors ([#47547](https://github.com/anomalyco/opencode/issues/47547), [#47614](https://github.com/anomalyco/opencode/issues/47614)), body-size limits ([#35112](https://github.com/anomalyco/opencode/issues/35112)), and 500s on Qwen models ([#30310](https://github.com/anomalyco/opencode/issues/30310), [#47620](https://github.com/anomalyco/opencode/issues/47620)). Paying customers cannot reliably use their subscription.
- **Provider integration fragility.** Upstream validation mismatches (`name` field length in [#47619](https://github.com/anomalyco/opencode/issues/47619)) and chunk-timeout handling gaps ([#47621](https://github.com/anomalyco/opencode/pull/47621)) cause flaky multi-vendor setups.
- **MCP reliability.** OAuth reauth loops ([#47636](https://github.com/anomalyco/opencode/pull/47636)) and TUI degradation under MCP batch operations ([#39570](https://github.com/anomalyco/opencode/issues/39570)) make MCP integrations harder to trust in production pipelines.
- **TUI session/lifecycle bugs.** Esc interrupt broken in v2 ([#42960](https://github.com/anomalyco/opencode/issues/42960)), model picker traps session after typing ([#47615](https://github.com/anomalyco/opencode/issues/47615)), selection cleared by page-scroll ([#47632](https://github.com/anomalyco/opencode/issues/47632)), slow startup on Mac M5 ([#46976](https://github.com/anomalyco/opencode/issues/46976)), SIGILL on Linux/Bun standalone v1.18.25 ([#47037](https://github.com/anomalyco/opencode/issues/47037)), and silent mid-session hangs ([#47587](https://github.com/anomalyco/opencode/issues/47587), [#47606](https://github.com/anomalyco/opencode/issues/47606)).
- **Platform coverage gaps.** Termux/Android aarch64 still failing natively ([#10504](https://github.com/anomalyco/opencode/issues/10504)).
- **Agent authoring surprises.** Silently-ignored frontmatter ([#47616](https://github.com/anomalyco/opencode/issues/47616)) and unwanted tool-call storms from defaulting to system-instruction search waste tokens ([#47627](https://github.com/anomalyco/opencode/issues/47627)).
- **Billing/renewal frictions.** Subscription auto-renewals declined with no bank-side cause ([#45278](https://github.com/anomalyco/opencode/issues/45278)).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-06

## Today's Highlights

The community is focused on **transport-layer reliability and provider quirks** across OpenAI Codex, Anthropic via Vercel AI Gateway, and OpenCode Go — with multiple in-flight fixes for model auth resolution and gateway cost/billing accounting. On the **architecture side**, momentum continues around the stacked `system-role` / `system message deltas` work (mitsuhiko) and a new Meta provider with Muse subscription OAuth. A long-running `openai-codex` TUI hang issue (#4945) remains the most-discussed problem in the repo.

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. **[#4945](https://github.com/earendil-works/pi/issues/4945)** — `openai-codex` / `gpt-5.5` TUI hangs on `Working...` with no output, no error, recoverable only via Escape. **76 comments, 32 👍, in progress** — by far the highest-traffic issue, indicative of a deep streaming-state bug.
2. **[#8834](https://github.com/earendil-works/pi/issues/8834)** — Opt-in `pi.namespace` for unified skills/prompt-template resolution under `<namespace>:<name>`. Closed/no-action but reflects strong appetite for package-scoped resource naming.
3. **[#9165](https://github.com/earendil-works/pi/issues/9165)** — Claude Opus 5 via OpenRouter rejects per-message `output_config`. A regression vs. the Anthropic direct provider that affects one of the most-used model routes.
4. **[#8826](https://github.com/earendil-works/pi/issues/8826)** — Cap agent retry backoff during prolonged upstream outages (e.g., `503 Too many open files`). A practical quality-of-life fix for long-running sessions.
5. **[#8827](https://github.com/earendil-works/pi/issues/8827)** — TUI LaTeX legacy font switches (`\rm`, `\bf`, `\it`) force a whole-block raw fallback. Blocks proper rendering for math-heavy Markdown.
6. **[#8617](https://github.com/earendil-works/pi/issues/8617)** — Codex: store image bytes locally and send ChatGPT `file_id` references instead of base64. Author has a prototype ready.
7. **[#9212](https://github.com/earendil-works/pi/issues/9212)** — 13% of `edit` tool calls from `sonnet-5` via `vercel-ai-gateway` arrive schema-truncated to `edits:[{}]`; fable 0%. A reliability/cost-tracking concern.
8. **[#9209](https://github.com/earendil-works/pi/issues/9209)** — `github-copilot/gpt-6-astra` is incorrectly routed to `/chat/completions` and rejected. A concrete provider-catalog mapping bug.
9. **[#8791](https://github.com/earendil-works/pi/issues/8791)** — Expose `ModelRuntime` on `ExtensionContext` for in-process isolated sessions. **4 👍**, closed/no-action — but the demand (extensions building nested agents) is clear.
10. **[#9226](https://github.com/earendil-works/pi/issues/9226)** — 0.85.1 `./client` and `./experimental/plugin` exports point at un-shipped `src/*.ts` paths, breaking consumers with `ERR_PACKAGE_PATH_NOT_EXPORTED`. A blocking packaging regression.

## Key PR Progress

1. **[#9116](https://github.com/earendil-works/pi/pull/9116)** — `feat(ai): add mid-conversation system messages`. First layer of the #8998 split; lays the foundation for extensions injecting prompts mid-run without rewriting the top-level prompt.
2. **[#9117](https://github.com/earendil-works/pi/pull/9117)** — `feat(coding-agent): deliver prompt and tool changes as system message deltas`. Stacked on `system-role`; replaces full-prompt rewrites with incremental delta delivery (better prompt caching).
3. **[#9233](https://github.com/earendil-works/pi/pull/9233)** — `fix(coding-agent): resolve model auth live instead of from startup snapshot`. Closes a race where `hasConfiguredAuth()` reads an unsettled availability snapshot.
4. **[#9096](https://github.com/earendil-works/pi/pull/9096)** — `feat(ai,coding-agent): add Meta provider with Muse subscription OAuth`. Resolves #7543; includes quirks around daily re-minted identity tokens and "fake" streaming (full-output burst).
5. **[#7610](https://github.com/earendil-works/pi/pull/7610)** — `feat(ai): add LLM Gateway and LLM Gateway DevPass providers`. OpenRouter-style router as built-in `openai-completions`.
6. **[#9137](https://github.com/earendil-works/pi/pull/9137)** — `feat(coding-agent): add Nix flake`. WIP but signals broader packaging support (NixOS-friendly builds).
7. **[#9222](https://github.com/earendil-works/pi/pull/9222)** — `fix(coding-agent): reject reload during active session operations`. Prevents a class of "tool succeeded but wrapper reads invalidated runner" errors in RPC mode.
8. **[#9224](https://github.com/earendil-works/pi/pull/9224)** — `fix(ai): clamp OpenRouter :free maxTokens to base model`. Fixes 400s on `minimax/minimax-m3:free` where catalog inflates context windows.
9. **[#9214](https://github.com/earendil-works/pi/pull/9214)** — `Invoke skills and prompt templates mid-sentence`. Closes #8457; lets `/skill:name` and `/template` expand anywhere in the input, not only at the start.
10. **[#9219](https://github.com/earendil-works/pi/pull/9219)** — `fix(coding-agent): preserve host UI prototype methods and Proxy traps in wrapUIPromptContext`. Replaces object-spread (which dropped prototype methods) with a Proxy-based wrapper.

## Hot Discussions

**Ideas**
- **[#9207](https://github.com/earendil-works/pi/discussions/9207)** — *Suggestion: remove "Available tools" section from system message.* Proposes stripping the static tool list from the system prompt since tool schemas are already passed separately. **2 👍** — relevant given the ongoing #9116/#9117 delta-delivery work that touches prompt composition.
- **[#9213](https://github.com/earendil-works/pi/discussions/9213)** — *Embed Agent-Friendly Score badge in README.* Pi scored 86.2/100 on an agent-friendliness scorer; author offers a badge for the README. **1 👍.**

## Feature Request Trends

- **Provider/router expansion.** Strong demand for additional providers and routing layers: LLM Gateway (#7610), Meta + Muse OAuth (#9096), OpenCode Go (#9230/#9237 with `x-opencode-session` header), Copilot model catalog fixes (#9209).
- **Extension API surface growth.** A clear cluster of requests wants extensions to do more: cancel queued follow-ups (#9234), idempotent acknowledged user-turn delivery (#9236), switch TUI mode to fullscreen (#9238), access `ModelRuntime` (#8791), custom-tool confirmation flow (#9228).
- **Package/scoped resource naming.** Opt-in `pi.namespace` for skills/templates (#8834) plus mid-sentence `/skill` and `/template` expansion (#9214) point toward a more composable package ecosystem.
- **Gateway reliability & billing correctness.** A repeated theme: `vercel-ai-gateway` anomalies — `vercelGatewayRouting` inert (#9211), 1h cache writes billed at 5m rate (#9210), truncated `edit` tool calls (#9212). Together these suggest a focused effort on gateway correctness is needed.
- **Packaging hygiene.** Broken subpath exports in 0.85.1 (#9226), recursive `bun run eval` (#9223), esbuild pull-in via `@earendil-works/chord` (#9225) — community is surfacing real consumer-experience regressions.

## Developer Pain Points

- **TUI state streaming fragility.** Long-running streaming sessions in `openai-codex` can hang silently (#4945); mid-stream viewport changes cause destructive `ESC[3J` full redraws and lost scroll position (#9240); IME candidates stuck at the right edge in WezTerm (#5200); PageUp jumping to top instead of paging incrementally (#5786).
- **Provider-spec drift.** Models and gateways change faster than Pi's adapters — Claude Opus 5 `output_config` rejection (#9165), GPT-6 Astra wrong endpoint (#9209), OpenCode Go header now required (#9230/#9237), Ollama `qwen3.8:27b` `terminated` stream regression from 0.84.x to 0.85.x (#9216).
- **Startup-time auth/race conditions.** `hasConfiguredAuth()` reading an unsettled snapshot (#9233) and `refreshOnCreate: false` leaving empty snapshots (#9239) make cold-start behavior non-deterministic.
- **Inconsistent or undocumented UX.** TUI menu keybindings differ between `/` and `@` menus (#9199); Windows `shell_path` ignored (#9229); opaque `Unknown system error -122` on EDQUOT during extension loading (#9235); `bun run eval` infinite recursion (#9223).
- **Prompt caching vs. extension injection tension.** Extensions injecting system prompt content via `before_agent_start` get inconsistent prompts when `sendCustomMessage(triggerTurn:true)` skips that hook (#8712) — directly motivating the #9116/#9117 delta-delivery refactor.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-06

## Today's Highlights
The release pipeline is straining: **v0.23.1-preview.1** shipped (then failed four times in `integration_docker` and `quality`), and **#11109** documents that `release.yml` re-does work its own runs already completed, with one 20-minute step verifying nothing. Meanwhile, the security story continues to sharpen—**#11198** reveals the default-on RUM telemetry uploads raw tool errors (including shell command lines) without redaction, and **#11180** shows that a skill's `PreToolUse` hook silently stops enforcing after `--continue` even while its instructions remain in context.

## Releases
- **v0.23.1-preview.1** — `feat(web-shell): visualize and manage dynamic workflow runs` ([#10594](https://github.com/QwenLM/qwen-code/pull/10594)); `perf(web-shell): derive the session workflow project`. *Release failed 4× in CI (see issues #11166, #11170, #11173, #11179, #11185).*
- **v0.23.0-nightly.20260905.0c945a6136** — same web-shell workflow visualization change.
- **v0.23.1-preview.0** — same web-shell workflow visualization change.

## Hot Issues
1. **#11091** *(CLOSED, 7💬)* — Mermaid (~6 MB) still flattened into the exported transcript renderer. Follow-on to #9812/#11038; targeted at shrinking HTML exports. [link](https://github.com/QwenLM/qwen-code/issues/11091)
2. **#11031** *(CLOSED, 6💬, P1)* — `/export html` embeds the full Web Shell + React runtime (~19.5 MB) into every exported file, even for empty sessions. [link](https://github.com/QwenLM/qwen-code/issues/11031)
3. **#11109** *(OPEN, 4💬, P2)* — `release.yml` redoes work its previous runs already validated; two release runs timed out today. [link](https://github.com/QwenLM/qwen-code/issues/11109)
4. **#9911** *(OPEN, 4💬)* — Restore VS Code per-message edit/rewind after the WebShell cutover (was deliberately dropped in #9811). [link](https://github.com/QwenLM/qwen-code/issues/9911)
5. **#11180** *(OPEN, 3💬, P1/security)* — Skill `PreToolUse` hook stops enforcing after `--continue`, while the skill's instructions remain in context. [link](https://github.com/QwenLM/qwen-code/issues/11180)
6. **#11198** *(OPEN, 2💬, P1/security)* — Usage-statistics RUM channel uploads raw tool-error text (shell command lines included) with no redaction; pre-existing on `main`. [link](https://github.com/QwenLM/qwen-code/issues/11198)
7. **#10989** *(CLOSED, 3💬)* — The #9487 daemon prompt-authority fix is inert in the VS Code companion because `hasActivePrompt` is only polled where the sidebar is mounted. [link](https://github.com/QwenLM/qwen-code/issues/10989)
8. **#8542** *(OPEN, 3💬)* — ACP feature request: queue follow-up messages while a turn is still running, matching the CLI experience. [link](https://github.com/QwenLM/qwen-code/issues/8542)
9. **#11096** *(OPEN, 3💬)* — Exports built from `main` point at an unpkg URL that 404s because `@qwen-code/qwen-code@0.23.0` was published before #9812. [link](https://github.com/QwenLM/qwen-code/issues/11096)
10. **#10378** *(CLOSED, 3💬)* — Superseded daemon child still fires `onExit`, showing a false "Qwen Code stopped unexpectedly" banner. [link](https://github.com/QwenLM/qwen-code/issues/10378)

## Key PR Progress
1. **#10999** — Declarative reasoning-capability plumbing through the model registry, ACP, session restore, workspace previews, TUI effort controls, and the OpenAI-compatible request; native entry for `deepseek-v4-pro`. [link](https://github.com/QwenLM/qwen-code/pull/10999)
2. **#11003** — Subagent definitions can now declare an `executor` block to delegate a turn to an external coding agent over ACP (Claude Code first), re-published as the subagent's events. [link](https://github.com/QwenLM/qwen-code/pull/11003)
3. **#10898** — Adds a manual `promote_nightly` mode to the release workflow; reuses a validated nightly's successful checks and publishes from the same immutable source revision (fail-closed). [link](https://github.com/QwenLM/qwen-code/pull/10898)
4. **#11165** — Extracts release preparation/validation/packaging/publishing/failure-notification into executable repo scripts while preserving jobs, permissions, conditions, diagnostics, and exit semantics. [link](https://github.com/QwenLM/qwen-code/pull/11165)
5. **#11117** — Makes the Prettier lane a real CI gate and formats the backlog it had been silently rewriting. [link](https://github.com/QwenLM/qwen-code/pull/11117)
6. **#11068** — Skill `SKILL.md` frontmatter hooks now register on the `/<skill-name>` invocation path, not only when the model invokes the skill. [link](https://github.com/QwenLM/qwen-code/pull/11068)
7. **#11204** — Replaces the resident-agent continuation boolean with a typed outcome (`continued`, `cold-fallback`, `capacity-wait`, `wrong-state`); both runtimes now report capacity before mutation. [link](https://github.com/QwenLM/qwen-code/pull/11204)
8. **#8927** — Adds `sessionRotation` per channel (`maxTurns` / `maxAge`) so routes bound the lifetime of a reused session. [link](https://github.com/QwenLM/qwen-code/pull/8927)
9. **#10347** — Auto-retry 4xx network EOF errors where Ctrl+Y isn't available (extends bounded auto-retry to wrapped transport failures). [link](https://github.com/QwenLM/qwen-code/pull/10347)
10. **#10941** *(CLOSED)* — Grounds the Web Shell conversation-area loading indicator in the daemon's live `hasActivePrompt` instead of a 3-second silence heuristic. [link](https://github.com/QwenLM/qwen-code/pull/10941)

## Feature Request Trends
- **ACP parity with the terminal CLI**: queue messages during an active turn (#8542); preserve `resource_link` attachments through transcript normalization (#11178).
- **Subagent/agent delegation**: subagent turns delegated to external coding agents over ACP, with Claude Code as the first target (#11003), plus an external-input delivery identity for correlation (#11202).
- **Reasoning-effort control**: declarative reasoning capability carried through the model registry into ACP, session restore, workspace previews, TUI effort controls, and the wire request (#10999).
- **Channel/session lifecycle**: per-channel `sessionRotation` bounds (#8927); reclaim semantics for cron/goal/monitor-aware sessions (#11118).
- **Dynamic Workflows parity with Claude Code 2.1.260**: contract, entry/budget, resilience, and distribution gaps (#11013).
- **VS Code companion parity**: restoring per-message edit/rewind post-WebShell cutover (#9911).

## Developer Pain Points
- **Release pipeline fragility**: v0.23.1-preview.1 failed four consecutive times (#11166/#11170/#11173/#11179/#11185), and `release.yml` wastes wall-clock by redoing its own previous work (#11109).
- **Export payload bloat**: HTML transcripts ship the entire React + Web Shell runtime into every file (~19.5 MB empty) (#11031), with secondary 404s because the npm tag predates the unbundling fix (#11096).
- **Hook/skill enforcement gaps**: `PreToolUse` hooks on skills silently stop enforcing after `--continue` (#11180); frontmatter hooks missed the `/<skill-name>` path until #11068.
- **Telemetry that leaks sensitive context**: default-on RUM uploads raw tool-error text including shell command lines with no redaction (#11198).
- **CI test flakiness**: ongoing deflake work for macOS E2E shards (#11134), `/compress` event-budget timing (#11094), and PTY session cleanup (#11001).
- **Bot-maintained sprawl**: the Fleet Shepherd dashboard (#7167) and deferred-review debt issues (#9524, #10046, #10974, #11008) keep accumulating; a notable cleanup closes two majors of `react-markdown` in one tree (#11092).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*