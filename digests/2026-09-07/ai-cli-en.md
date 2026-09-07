# AI CLI Tools Community Digest 2026-09-07

> Generated: 2026-09-07 01:16 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report: AI CLI Developer Tools Ecosystem
**Report date:** 2026-09-07 | **Coverage:** Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, OpenCode, Pi, Qwen Code

---

## 1. Ecosystem Overview

The AI CLI category has consolidated around seven actively maintained tools that now share a common frontier problem set: governing autonomous agent behavior (spend, permissions, safety gates) rather than basic coding capability. Every community in today's snapshot is grappling with second-order consequences of agentic autonomy — runaway token spend, silent tool-call failures, context loss after compaction, and multi-agent observability gaps. Simultaneously, all seven vendors are pushing beyond the terminal into desktop apps and cross-device experiences, and that expansion is producing a measurable quality debt, most acutely on Windows. Security and privacy defaults (telemetry redaction, sandbox escapes, OAuth conformance, secrets handling) have moved from niche concerns to P1-labeled issues in at least four projects.

---

## 2. Activity Comparison

*Counts reflect items surfaced in each 24h digest (curated highlights, not raw repo totals). "N/A" = channel not enabled/not surfaced in the source digest — not an indicator of inactivity.*

| Tool | Issues (24h) | PRs (24h) | Discussions (24h) | Release Status |
|---|---|---|---|---|
| **Claude Code** | 10 hot (top: #84352, 197 comments) | 10 (2 open, 8 closed) | N/A | ✅ v2.1.263 (reliability-only) |
| **OpenAI Codex** | 10 hot (top: #28919, 63 comments) | 10 highlighted; **19 merged** in wave | 8 threads (top: #9618, 118 👍) | ❌ None |
| **Gemini CLI** | 10 hot (P1/P2-labeled triage) | 10 (2 closed) | N/A | 🌙 v0.60.0-nightly |
| **Copilot CLI** | 10 hot (2 closed; 1.1.15 regression cluster) | 1 (pipeline quiet at release-cut) | N/A | ❌ None (desktop 1.1.15 fallout) |
| **OpenCode** | 10 hot (top: #7006, 25 👍) | 13 (4 closed) | N/A | ❌ None |
| **Pi** | 10 (5 closed) | 10 (6 open, 4 closed) | 1 Q&A | ❌ None |
| **Qwen Code** | 11 (1 closed) | 11 | N/A | ⚠️ 3 tags (v0.23.1-preview.1 **failed CI**, auto-rolled back; 2 nightlies) |

**Engagement leaders:** Claude Code owns raw thread volume (197- and 130-comment issues); Codex owns vote-weighted feature demand (#9618 `/rewind` at 118 👍, #14067 cross-device sync at 61 👍). Copilot CLI's issue spike is event-driven (desktop 1.1.15), while its PR surface is thin — development appears largely internal. Pi shows the tightest issue→PR loop (three fallback-chain PRs filed against #9242 within 24 hours).

---

## 3. Shared Feature Directions

| Direction | Tools | Evidence & Specific Needs |
|---|---|---|
| **Cost & spend governance** | Claude Code, Copilot CLI, OpenCode, Codex, Pi | Claude Code: subagent fleets silently inheriting Opus-tier models, burning weekly quotas overnight (#87815, #77943); asks for hard caps and per-agent tier selection. Copilot CLI: BYOK silently disabling prompt caching, ~5× cost (#4720). OpenCode: Go quota exhaustion with cache reads at 0 (#42935), 12h-persistent 429s (#47613). Codex: unclear accounting of context-history lookups vs limits (#43257). Pi: cache-breakpoint utilization (#9246), provider-reported costs (#6881). |
| **Windows / desktop parity** | Codex, Pi, Claude Code, OpenCode, Copilot CLI, Gemini | Codex is hardest-hit (7-issue cluster: #28919, #41465, #40596, #42299...). Pi's maintainers are explicitly soliciting Windows feedback (#7547). Claude Code WSL2 OOM misreads (#92448), OpenCode tab-close freezes, Copilot 31 GB RSS on WSL2 (#4694). |
| **Multi-agent orchestration reliability & observability** | Gemini, Claude Code, Qwen, OpenCode, Codex, Copilot | Gemini: agents report `status: success` after hitting turn caps (#22323); generalist deadlocks (#21409). Claude Code: task tools vanishing from the model (#80015). Qwen: deterministic thread-status/close-obligation model (#11230). OpenCode: subagents must "answer honestly, once, in order" (#45482). Codex: sidebar spam per subagent run (#34090). |
| **Context persistence across compaction/resume** | Claude Code, Codex, Qwen, Gemini | Claude Code: behavioral rules silently dropped after `/compact` (#67500). Codex: compaction resurrects completed steering (#29811); self-referential `notes`/`history` retrieval (#42703). Qwen: structured push/pull memory recall (#10183). Gemini: AST-aware reads to cut the 36.6k-token/turn firehose (#22745). |
| **MCP & OAuth standards conformance** | Gemini, OpenCode, Copilot CLI, Codex, Pi | RFC 9207 issuer validation (Gemini #29117), RFC 9728 `resource_metadata` (OpenCode #44790), Anthropic `oneOf/anyOf` schema sanitization (OpenCode #46628), token reuse across sessions (Copilot #4695), elicitation-based user verification (Codex #43289). |
| **Security & telemetry hardening** | Qwen, Gemini, Claude Code, Copilot, Pi | Qwen: raw tool errors with shell commands uploaded to RUM (#11198, P1); safety hooks silently disabled after `--continue` (#11180, P1). Gemini: transcripts reach the model pre-redaction (#26525); sandbox `git --output` bypass (#29184). Claude Code: symlink escape and shell-injection fixes in plugin examples (#68689, #68786). Copilot: ACP auto-approval regression (#4537). |

---

## 4. Differentiation Analysis

- **Claude Code** — Deepest enterprise penetration and the loudest governance backlash. Unique pain: safety-layer over-firing on approved orgs (#84352) and cyber-safeguard regressions — problems only a tool with heavy enterprise security workflows would surface. Plugin/marketplace hygiene is a distinct second front.
- **OpenAI Codex** — Heaviest engineering investment in **build/system rigor** (Bazel cache hygiene, socket-based shutdown, least-privileged release jobs) and **managed worktrees** as a first-class primitive. Most invested in cross-device control and identity verification APIs. Community channel split (Ideas with 118-👍 votes) shows a product shaped by user proposals.
- **Gemini CLI** — Most disciplined triage (explicit P1/P2 security labels); current sprint is security hardening + subagent trust. Distinctive bet: OS-level zero-dep sandboxing to unlock native bash affinity (#19873) and AST-aware context tooling.
- **Copilot CLI** — Most enterprise-conditions-driven: GHEC data residency, BYOK economics, ACP as a protocol contract for third-party UIs. Regression waves track desktop releases rather than CLI versions — the desktop companion is now the primary risk surface.
- **OpenCode** — Only tool with a **billing-trust crisis** (three independent payment/quota regressions in 24h) — the cost of running its own Go subscription layer. Strongest open-source plugin-v2 momentum; SQLite renderer-state migration shows architectural maturity in Desktop.
- **Pi** — Positioned as a **provider-agnostic orchestration layer**: cross-provider fallback chains, per-repo API keys, DNS-level resilience (MagicDNS/Tailscale), OpenRouter/gateway providers. Smallest community but uniquely focused on multi-provider plumbing nobody else prioritizes.
- **Qwen Code** — Making the largest architectural bets: full ink→OpenTUI renderer rewrite (#8662), a formalized multi-agent "mesh" with provable run-binding semantics, structured memory recall, and strong CN-market localization (DingTalk lifecycle tags, IME composition handling #6213).

---

## 5. Community Momentum & Maturity

- **Volume & maturity leaders:** **Claude Code** (highest comment/reaction density; enterprise-grade issue depth) and **Codex** (19 PRs merged in one day; highest vote-weighted feature demand). Both show communities sophisticated enough to file reproducible, well-evidenced regressions.
- **Fastest iteration:** **Qwen Code** (3 release tags in 24h — though the failed preview workflow signals CI growing pains) and **Gemini CLI** (steady nightly cadence, clean P1/P2 hygiene). **OpenCode** sustains the highest open-source PR throughput (13 surfaced).
- **Event-driven / opaque:** **Copilot CLI** activity is dominated by a single release's regression cluster; its near-empty public PR pipeline suggests the real development happens internally — external community is a bug-report channel, not a contribution channel.
- **Small but efficient:** **Pi** demonstrates the best maintainer responsiveness ratio (same-day issue→PR turnaround), typical of a focused team with an engaged power-user base.

---

## 6. Trend Signals

1. **Autonomy without budget controls is the ecosystem's #1 liability.** Five of seven communities independently reported discovering runaway spend *after the fact* (Claude Code quota burn, Copilot 5× cache costs, OpenCode 20-minute quota exhaustion). Expect per-agent spend caps, tier pinning, and real-time cost telemetry to become table-stakes procurement criteria in 2026–2027.
2. **Compaction is now a correctness problem, not an optimization.** Silent rule loss (Claude Code #67500), instruction resurrection (Codex #29811), and self-referential history inflation (#42703) mean long-horizon agent reliability is bounded by context-persistence design. Structured memory (Qwen #10183) and AST-scoped reads (Gemini #22745) are the two competing answers worth tracking.
3. **Windows is systematically under-served.** Six of seven tools show active Windows/WSL2 bug clusters despite evident demand. For teams standardizing on Windows, this is a near-term selection criterion — and a differentiator opportunity for whichever vendor closes the gap first.
4. **Protocol conformance (MCP, OAuth RFC 9207/9728, ACP) is becoming a moat.** Integrators are already punishing non-conformant behavior; tools treating specs as contracts (Gemini, OpenCode) will win the third-party client ecosystem.
5. **Default telemetry and safety gates are under audit.** Qwen's P1 raw-error uploads and silently-disabled PreToolUse hooks, plus Gemini's pre-redaction transcripts, indicate a coming norm: security-relevant regressions treated with CVE-grade urgency.
6. **Desktop companions are the new regression epicenter.** Three of seven tools (Codex, Copilot CLI, OpenCode) saw desktop-app updates trigger their worst issue waves — terminal-first architectures are being ported to GUIs faster than quality processes are adapting. Teams should treat desktop release trains as their highest-risk change category.

---

*Sources: per-repo community digests, 2026-09-06 → 2026-09-07. All issue/PR references link to the respective repositories.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report

**Repository:** [anthropics/skills](https://github.com/anthropics/skills) | **Snapshot:** 2026-09-07

---

## 1. Top Skills Ranking

The community's most-watched PRs cluster around three themes: **fixing the `skill-creator` evaluation pipeline**, **expanding document-format coverage**, and **meta-skills for skill quality**.

1. **[#1298 — Fix `run_eval.py` always reporting 0% recall](https://github.com/anthropics/skills/pull/1298)** (MartinCajiao, open)
   Repairs the `skill-creator` evaluation harness so `run_loop.py` and `improve_description.py` optimize against real signals rather than noise. Bundles fixes for Windows stream reading, trigger detection, and parallel workers — referenced by 10+ independent reproductions of the underlying bug.

2. **[#514 — `document-typography` skill](https://github.com/anthropics/skills/pull/514)** (PGTBoos, open)
   Typographic quality control for AI-generated documents: orphan/widow handling and numbering alignment. Addresses a problem every Claude user eventually hits.

3. **[#1615 — `scnet-hpc` skill](https://github.com/anthropics/skills/pull/1615)** (lql341, open)
   Profile-based SSH + Slurm operations on SCNet HPC clusters. Latest in a wave of cluster/cloud-platform skills.

4. **[#538 — Fix PDF skill case-sensitive file references](https://github.com/anthropics/skills/pull/538)** (Lubrsy706, open)
   Eight mismatches between `SKILL.md` and actual filenames — a reminder that case-sensitive filesystems (Linux) break uppercase references silently.

5. **[#486 — ODT (OpenDocument) skill](https://github.com/anthropics/skills/pull/486)** (GitHubNewbie0, open)
   Create, fill, parse, and convert `.odt`/`.ods` files. Fills a major gap for open-format document workflows.

6. **[#210 — Improve `frontend-design` skill clarity](https://github.com/anthropics/skills/pull/210)** (justinwetch, open)
   Tightens instructions so each directive is actionable in a single conversation, reducing ambiguity in the frontend generation loop.

7. **[#83 — `skill-quality-analyzer` and `skill-security-analyzer`](https://github.com/anthropics/skills/pull/83)** (eovidiu, open)
   Two meta-skills scoring other Skills across structure, documentation, and security dimensions — directly responds to trust-boundary concerns in the community.

8. **[#1628 — Hivemind: Zero-Cost Multi-Agent Orchestration](https://github.com/anthropics/skills/pull/1628)** (Hanishchow, open)
   Delegates mechanical work to headless [opencode](https://opencode.ai) workers on free models while Claude Code stays the planner/reviewer. Reframes the cost problem as a context-budget problem.

---

## 2. Community Demand Trends

Reading the highest-engagement Issues, demand concentrates on five directions:

- **Cross-user / org-wide skill sharing** — [#228 (16 💬, 8 👍)](https://github.com/anthropics/skills/issues/228) wants a shared library in Claude.ai instead of `.skill`-file hand-offs via Slack/Teams. This is the single most-upvoted demand in the tracker.
- **Trust, namespace, and security boundaries** — [#492 (43 💬)](https://github.com/anthropics/skills/issues/492) flags community skills impersonating the `anthropic/` namespace; [#412 (CLOSED, 6 💬)](https://github.com/anthropics/skills/issues/412) proposed an `agent-governance` skill for policy enforcement and threat detection.
- **Reasoning quality & evaluation infrastructure** — [#1385 (4 💬)](https://github.com/anthropics/skills/issues/1385) proposes a 3-gate pipeline (pre-task calibration → adversarial review → delivery verification); [#1390](https://github.com/anthropics/skills/issues/1390) and [#556 (12 💬, 7 👍)](https://github.com/anthropics/skills/issues/556) surface that current `evaluation.py` / `run_eval.py` silently score 0/N on real workloads.
- **Compact agent memory & state representation** — [#1329 (9 💬)](https://github.com/anthropics/skills/issues/1329) proposes `compact-memory`, a symbolic notation to compress long-running agent notes.
- **Plugin hygiene & packaging standards** — [#189 (6 💬, 9 👍)](https://github.com/anthropics/skills/issues/189) reports `document-skills` and `example-skills` shipping identical content, wasting context. Packaging and deduplication are unresolved.

Underneath these sit recurring operational pain: [#1487](https://github.com/anthropics/skills/issues/1487) (~156k-token eager injection of `claude-api`), [#62](https://github.com/anthropics/skills/issues/62) (skills disappearing after rename), [#16](https://github.com/anthropics/skills/issues/16) (Skills-as-MCPs), and [#29](https://github.com/anthropics/skills/issues/29) (AWS Bedrock usage).

---

## 3. High-Potential Pending Skills

PRs with active iteration in the last few weeks and clear paths to merge:

- **[#1628 — Hivemind multi-agent orchestration](https://github.com/anthropics/skills/pull/1628)** — Aug 21; cost-routing concept aligns with sustained demand.
- **[#1627 — `buffer-api` Agent Skill](https://github.com/anthropics/skills/pull/1627)** — Aug 21; portable social scheduling via Buffer GraphQL.
- **[#1615 — `scnet-hpc` skill](https://github.com/anthropics/skills/pull/1615)** — Aug 20; domain-specific but cleanly scoped.
- **[#1607 — Mark four retired Claude model IDs](https://github.com/anthropics/skills/pull/1607)** — Aug 18; closes [#1603](https://github.com/anthropics/skills/issues/1603); a near-certain fast merge.
- **[#1602 — Evaluation/serialization/encoding fixes](https://github.com/anthropics/skills/pull/1602)** — Aug 17; targets the same broken-eval class of bug as #1298/#1099/#1050.
- **[#1734 — Detect orphaned docx comments](https://github.com/anthropics/skills/pull/1734)** — Sep 6; fresh DOCX integrity improvement.
- **[#1367 — `self-audit` skill v1.3.0](https://github.com/anthropics/skills/pull/1367)** — Jun 28; mechanical verification + 4-dim reasoning audit; complements the quality-gate theme from [#1385](https://github.com/anthropics/skills/issues/1385).

---

## 4. Skills Ecosystem Insight

**The community's most concentrated demand is for trustworthy, self-validating skill-development infrastructure — bug-for-bug fixes to `skill-creator`/`run_eval.py`, meta-skills that score quality and security, and a namespace model that stops impersonation.**

---

*Note: PR comment counts were not exposed in the snapshot data; rankings above use update recency, age, and cross-reference to high-comment Issues as engagement proxies.*

---

# Claude Code Community Digest — 2026-09-07

## Today's Highlights

Today's v2.1.263 ships as a quiet reliability-only release, but the issue tracker tells a louder story: the community is overwhelmingly focused on **cost/governance of autonomous multi-agent runs** and **broken core workflows** — hanging prompts (#26224), removed task-list tools (#80015), context-compaction memory loss (#67500), and unflagged runaway subagent spend (#87815, #77964, #87178). The cyber-safeguard regression for already-approved CVP organizations (#84352, 197 comments) remains the single most-upvoted thread of the week.

---

## Releases

- **v2.1.263** — "Bug fixes and reliability improvements." No changelog detail provided. ([release notes](https://github.com/anthropics/claude-code/releases/tag/v2.1.263))

---

## Hot Issues

1. **[#26224](https://github.com/anthropics/claude-code/issues/26224)** — *Claude Code hangs/freezes on prompts for 5–20+ minutes.* **130 comments, 151 👍 — the highest-reacted open issue.** Long-running reliability complaint with multiple reproductions across CLI versions.
2. **[#84352](https://github.com/anthropics/claude-code/issues/84352)** — *CVP-approved organization still hits cyber-safeguard blocks in Claude Code.* **197 comments, 27 👍.** Approved applications regressed to "Under review"; blocking legitimate security work.
3. **[#62699](https://github.com/anthropics/claude-code/issues/62699)** — *Cannot copy text from output via `Ctrl+Shift+C` or right-click.* **42 comments, 68 👍.** Core TUX regression — basic clipboard flow broken on a stable platform label.
4. **[#91188](https://github.com/anthropics/claude-code/issues/91188)** — *Feature: make `MEMORY.md` auto-compaction threshold configurable.* **28 comments.** Auto-memory hard-limits at 200 lines / 25 KB; users want per-project knobs or suppression.
5. **[#80015](https://github.com/anthropics/claude-code/issues/80015)** — *TaskCreate/TaskUpdate/TaskList/TaskGet no longer exposed to the model after recent update.* **14 comments, 13 👍.** Tasks still render in UI, but model lost the tools entirely — breaks agentic task management.
6. **[#67500](https://github.com/anthropics/claude-code/issues/67500)** — *Context-compaction recovery drops critical behavioral rules* (session status block, memory writes, no-stop policy). **12 comments.** Reproducible across sessions; rules silently vanish after `/compact`.
7. **[#89467](https://github.com/anthropics/claude-code/issues/89467)** — *Windows desktop app window is always-on-top with no toggle.* **16 comments, 14 👍.** No setting, shortcut, or menu to disable; impacts multi-monitor workflows.
8. **[#87815](https://github.com/anthropics/claude-code/issues/87815)** — *Parallel subagent fleets silently inherit session model tier — burned full weekly Fable + Opus allocation in one evening.* Cost-design complaint about implicit tier inheritance.
9. **[#77943](https://github.com/anthropics/claude-code/issues/77943)** — *Workflow `code-review` burns 1.1M+ tokens for 5 files and returns empty results.* Highlights that workflow-level token accounting is invisible to the user.
10. **[#64613](https://github.com/anthropics/claude-code/issues/64613)** — *API requests consuming personal token quota when subscription tokens are available.* Cost-routing bug; "Claude is stealing money" framing from user.

---

## Key PR Progress

1. **[#87079](https://github.com/anthropics/claude-code/pull/87079)** — *fix(security-guidance): make `**` glob patterns match zero-depth paths.* **OPEN.** `fnmatch`-delegated `**` was silently excluding top-level files from `security-patterns.json` rules — a quiet failure mode in security configuration.
2. **[#87077](https://github.com/anthropics/claude-code/pull/87077)** — *fix(pr-review-toolkit): repair invalid YAML frontmatter in all agents.* **OPEN.** Dialogue-style descriptions like `Daisy: "..."` were parsed as nested mappings, leaving agents with empty `name`/`description`/`model`.
3. **[#68707](https://github.com/anthropics/claude-code/pull/68707)** — *feat(bug-reporter): add `/bug` slash command to file GitHub issues from the terminal.* **CLOSED.** New plugin with manifest, README, and issue templates — streamlines the report-bug loop.
4. **[#68689](https://github.com/anthropics/claude-code/pull/68689)** — *fix(security-guidance): block symlink escape in extensibility config reads.* **CLOSED.** A committed symlink at `.claude/claude-security-guidance.md` could expose `~/.ssh/id_rsa` etc.
5. **[#68786](https://github.com/anthropics/claude-code/pull/68786)** — *fix(plugin-dev): avoid shell injection in `test-hook.sh` via stdin redirection.* **CLOSED.** `$TEST_INPUT` was embedded inside single quotes inside a double-quoted `bash -c`, enabling injection.
6. **[#68785](https://github.com/anthropics/claude-code/pull/68785)** — *fix(plugin-dev): hook JSON to stdout, tighten `su*` glob, fix CI detection.* **CLOSED.** Example hooks were writing decision JSON to stderr and accepting overly broad patterns.
7. **[#68694](https://github.com/anthropics/claude-code/pull/68694)** — *fix(security-guidance): normalize `CLAUDE_PLUGIN_ROOT` path separators on Windows.* **CLOSED.** Backslashes broke bash inline scripts in hook commands.
8. **[#68699](https://github.com/anthropics/claude-code/pull/68699)** — *fix(hookify): add Python wrapper and normalize plugin root paths on Windows.* **CLOSED.** Worked around the Microsoft Store `python3` stub returning exit code 49 in non-TTY contexts.
9. **[#68787](https://github.com/anthropics/claude-code/pull/68787)** — *fix(scripts): add error message to `edit-issue-labels.sh` when called with no label arguments.* **CLOSED.** Silent exit-code-1 made CI debugging painful.
10. **[#68678](https://github.com/anthropics/claude-code/pull/68678)** — *fix(triage): don't mark Claude Desktop issues as invalid.* **CLOSED.** Triage flow was rejecting valid Desktop-app reports.

---

## Feature Request Trends

Distilled from the issue body keywords and labels in the last 24h:

- **Cost / spend governance.** The single loudest theme. Concrete asks: hard caps on token spend per session/agent (#90664), per-agent model-tier selection rather than silent inheritance (#87815, #77964), visible billing breakdown for workflow & security-guidance layers (#85421, #87178), correct rate-limit error mapping (#75730).
- **Memory & compaction control.** Configurable `MEMORY.md` thresholds and per-rule survival across `/compact` (#91188, #67500).
- **Multi-agent / Remote Control UX.** Chrome extension propagation into spawned sessions (#74671), reliable Android push delivery (#87003), better project/chat sorting in Cowork (#87723).
- **Secret & configuration security.** [#90301](https://github.com/anthropics/claude-code/issues/90301) catalogs 18 prior requests for a sanctioned channel to hand Claude a secret — convergent pressure for a primitive that unblocks them all.
- **Windows / Desktop polish.** Always-on-top opt-out (#89467), missing Stop button (#72489), `CREATE_NO_WINDOW` for child processes (#70200).
- **Plugin / marketplace reliability.** Silent "synced but never downloaded" state (#90329), plugin manifests path handling (#90301).

---

## Developer Pain Points

- **Unpredictable autonomy = unpredictable cost.** Multiple independent reports describe a single autonomous session burning an entire weekly Max/Opus/Fable quota via fan-out, redundant self-validation, or default-on security layers (#87815, #77964, #89596, #87178, #85421, #77943, #89964). The pattern is consistent: users discover the spend *after* it happens.
- **Core regressions in basic flows.** Copy-from-output (#62699), always-on-top window (#89467), task-list tools disappearing (#80015), and the long-standing hanging prompt problem (#26224) all sit on top of `bug` labels and have substantial reaction counts.
- **Cyber safeguards over-firing on legitimate work.** Two parallel threads (#84352, #92565) show even CVP-approved organizations and ordinary code analysis get blocked — eroding trust in the safety layer.
- **Context loss after compaction.** #67500 reports session rules (memory writes, no-stop policy, status block) being silently dropped after `/compact`, a reliability hazard for long-running workflows.
- **Windows / WSL2 rough edges.** Beyond the desktop-app issues, #92448 reports background tasks being OOM-killed with 26 GB free, suggesting a misreading of cgroup/memory limits in the WSL2 harness.
- **Plugin ecosystem hygiene.** Several PRs this week (#87079, #87077, #68785, #68786) show that *example* plugins and security-config defaults ship with real bugs — squelching glob matching, YAML frontmatter parse errors, hook output going to stderr — which become reference implementations users copy into production.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-07

## Today's Highlights

The Windows desktop experience continues to dominate community pain, with the top three most-discussed bugs all stemming from the same build family: missing "Control other devices" tab (#28919), click-through floating pet (#41465), and a regression in Chrome browser-agent control (#41764). On the engineering side, the codebase saw an unusually heavy merge wave of 19 PRs — mostly build-system hygiene and a clear UX push around managed worktrees, user-verification APIs, and voice-host audio playback. Cross-device thread sync and a `/rewind`/`/revert` primitive remain the two most upvoted feature ideas, signaling persistent gaps in session continuity.

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. **#28919 — Windows Codex app missing "Control other devices" tab** — 63 comments, 👍 59. Long-standing regression on Windows where the device-control entry point vanished from Settings. Highest engagement issue today; subscription/feature parity with macOS is the core ask. [Link](https://github.com/openai/codex/issues/28919)
2. **#10571 — "Bad request" error on Codex CLI 0.94.0 with gpt-5.2 xhigh** — 27 comments, 👍 9. Intermittent transport-level rejection on macOS arm64 that leaves sessions unrecoverable. High comment count but low vote count likely reflects developer frustration rather than broad consensus. [Link](https://github.com/openai/codex/issues/10571)
3. **#41465 — Windows floating pet remains click-through and cannot be dragged** — 22 comments, 👍 34. UX-blocking bug for the desktop companion feature on Windows; pet feature is unusable on the platform. [Link](https://github.com/openai/codex/issues/41465)
4. **#29811 — Goal compaction resurrects completed manual steer** — 14 comments, 👍 8. Long-running `/goal` sessions re-inject finished steering instructions after compaction, producing looped/buggy agent behavior. [Link](https://github.com/openai/codex/issues/29811)
5. **#40596 — Windows unified exec fails with `helper_unknown_error: setup refresh had errors`** — 13 comments. Sandbox/unified-exec path is broken on Windows builds, blocking the tool-call subsystem. [Link](https://github.com/openai/codex/issues/40596)
6. **#40228 — Chrome native host out of date; uninstall + feedback upload fail** — 10 comments. Browser control surface is degraded to read-only; reinstall does not recover native-host trust. [Link](https://github.com/openai/codex/issues/40228)
7. **#41874 — Windows desktop selectively loses historical local sessions** — 8 comments. Sessions newer than legacy threads vanish from the sidebar while project-assignment migration is incomplete. [Link](https://github.com/openai/codex/issues/41874)
8. **#8317 — Add time-based scheduling (delay, interval, conditional polling)** — 7 comments, 👍 38. The highest-voted enhancement in the list; users want first-class cron/interval/polling semantics in Codex CLI. [Link](https://github.com/openai/codex/issues/8317)
9. **#29087 — Stream disconnected before completion: `error decoding response body`** — 7 comments. Transport-level streaming drop that loses partial model output mid-response. [Link](https://github.com/openai/codex/issues/29087)
10. **#42299 — Windows: Alt+P globally intercepted by Codex, blocking Unreal Engine Play** — 4 comments, 👍 2. App captures Alt+P system-wide and closes itself; breaks an industry-standard editor hotkey. [Link](https://github.com/openai/codex/issues/42299)

## Key PR Progress

1. **#43315 — Resolve session labels uniquely before acting on them** — Prevents the first-match heuristic from targeting the wrong conversation when duplicate labels exist; app-server label lookup is now shared across CLI and Desktop. [Link](https://github.com/openai/codex/pull/43315)
2. **#43308 — Replace Windows app-server shutdown files with socket requests** — Replaces fragile file-based shutdown signaling with `/daemon/shutdown` over the local control socket, including PID validation and drain acknowledgment. [Link](https://github.com/openai/codex/pull/43308)
3. **#43304 — Isolate Bazel build commit metadata from Rust compilation inputs** — Stamped workspace-status values (user, host, timestamp) no longer poison the remote cache for Rust binaries. [Link](https://github.com/openai/codex/pull/43304)
4. **#43298 — Defer managed worktree transitions to fresh TUI loop iterations** — Splits the heavy `ChatWidget` constructor path so worktree setup/checkout no longer blocks the event loop. [Link](https://github.com/openai/codex/pull/43298)
5. **#43289 — Add capability-gated MCP user-verification handling** — Routes `openai/userVerification` through `openai/elicitation/create` when the client advertises support, with strict field/size/base64url validation. [Link](https://github.com/openai/codex/pull/43289)
6. **#43286 — Add a managed worktree browser to the TUI** — A new searchable `/worktree` flow that lists pool checkouts, lets users resume an owner thread, or copy a worktree to clipboard. [Link](https://github.com/openai/codex/pull/43286)
7. **#43282 — Make Bazel binary stamping opt-in** — New `stamped_binaries` list on `codex_rust_crate` so binaries that don't need build identity stop invalidating caches. [Link](https://github.com/openai/codex/pull/43282)
8. **#43281 — Move npm package staging into a separate release workflow job** — Stages npm tarballs in a least-privileged job and gates `release` on success; reduces permission surface in release. [Link](https://github.com/openai/codex/pull/43281)
9. **#43279 — Include linked worktrees in TUI session discovery** — Directory-scoped lookup now reaches sessions in linked worktrees of the same repo; also defers Git work off the TUI loop. [Link](https://github.com/openai/codex/pull/43279)
10. **#43265 — Add experimental user verification API contracts** — Adds `userVerification/{status,enroll,delete,verify}` behind the `experimentalApi` capability with typed error schemas. [Link](https://github.com/openai/codex/pull/43265)

## Hot Discussions

### Ideas

- **#9618 — `/rewind` or `/revert` feature** — 20 comments, 👍 118. The single most-upvoted thread in the digest. Users frame the missing primitive as making Codex "almost unusable" without committing every change; OpenCode and Claude Code are cited as the bar. [Link](https://github.com/openai/codex/discussions/9618)
- **#14067 — Synchronization of Codex Threads and Session Context Across Devices** — 10 comments, 👍 61. Strong demand for cloud-synced sessions so multi-machine workflows feel continuous. [Link](https://github.com/openai/codex/discussions/14067)
- **#7366 — Reference files that are gitignored via `@`** — 2 comments, 👍 7. Asks that `@`-references work for files excluded by `.gitignore`; current behavior makes library-source lookups painful. [Link](https://github.com/openai/codex/discussions/7366)
- **#42703 — Long-horizon context: can history retrieval become self-referential?** — 1 comment, 👍 1. Thoughtful critique of the new token-budget / `notes` / `history` flow: worried that retrieval of `notes` itself becomes history and inflates budgets across context windows. [Link](https://github.com/openai/codex/discussions/42703)

### Q&A

- **#40740 — Does rollout tracing capture which path produced a `Declined` exec status?** — 2 comments, 👍 1. Reader noticed that `ExecApprovalRequest`/`ApplyPatchApprovalRequest`/`GuardianAssessment` are deliberately excluded from `rollout/src/policy.rs` and asks whether denial paths can be reconstructed. [Link](https://github.com/openai/codex/discussions/40740)
- **#43257 — How does experimental context management count history lookups against usage limits?** — 0 comments, 👍 2. Multi-day Pro user with GPT-6 Astra wants clarity on whether `new_context` history retrievals count against the rate-limit budget. [Link](https://github.com/openai/codex/discussions/43257)

### Show and Tell

- **#41157 — CodexFuse 1.2.0** — 2 comments, 👍 1. Independent local Windows dashboard showing Codex rate-limit usage (used/available, next reset, hourly use); PT/EN; no install/API key. [Link](https://github.com/openai/codex/discussions/41157)
- **#43224 — NULLYARD** — 1 comment, 👍 1. Public, plain-text MCP board with a static integration guide; ships a `skill.md` and `mcp.md`. [Link](https://github.com/openai/codex/discussions/43224)

## Feature Request Trends

- **Session continuity primitives**: a `/rewind`/`/revert` action (#9618) and cross-device thread sync (#14067) dominate the vote-weighted wish list. Both are about making long-lived, multi-device work reliable.
- **Scheduling and automation**: time-based scheduling (#8317) and recurring/conditional polling are repeatedly asked for; users want Codex CLI to act as a lightweight job runner, not just an interactive agent.
- **Linux parity**: official Computer Use on the Linux desktop (#42846) and Linux-first feature parity keep appearing.
- **Context management ergonomics**: clearer accounting around `experimental context` (#43257), recoverable `AGENTS.md` reloads (#43295), and self-reference concerns in `notes`/`history` (#42703) point to a community wanting finer-grained, debuggable context budgets.
- **Better references in prompts**: `@`-references for `.gitignore`d files (#7366) is a small but recurring ask.

## Developer Pain Points

- **Windows desktop quality**: a clear cluster — missing "Control other devices" tab (#28919), click-through pet (#41465), Chrome native host out-of-date (#40228, #40357, #42520, #39466), unified-exec failures (#40596), session loss (#41874), Alt+P hijack (#42299), and app vanishing (#42510). Windows-specific bugs are over-represented relative to platform share.
- **Stream and transport reliability**: intermittent "Bad request" (#10571) and mid-response `error decoding response body` disconnects (#29087) on the CLI cause unrecoverable output loss.
- **Session/subagent sidebar hygiene**: each automated subagent run getting its own sidebar entry with no grouping (#34090), and `wait_threads` losing the `:true` flag that `read_thread` preserves (#42831), make automation hard to monitor.
- **Auto-review authorization UX**: users report being forced to type an exact "magic sentence" instead of getting a native approval dialog (#41462).
- **Prompt-cache observability**: developers cannot tell whether intermittent zero-cache-hit behavior (#30425) is expected or a regression, and want better diagnostics.
- **Legacy session migration**: incomplete project-assignment migration (#41874) and empty assistant messages on resumed threads (#28751) leave long-time users distrustful of upgrades.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-07

## Today's Highlights
- Nightly `v0.60.0-nightly.20250906.g85aca163f` shipped, continuing the v0.60 development track with small incremental changes from the prior nightly.
- Agent reliability dominates the discussion: P1 bugs around **subagent hang on MAX_TURNs reporting success** (#22323), **generalist-agent deadlocks** (#21409), and **shell command hangs after completion** (#25166) all saw fresh activity.
- Security hardening is progressing — Auto Memory logging/redaction (#26525), Windows sandbox git-arg validation (#29184), and RFC 9207 OAuth issuer checks (#29117) are all landing or in flight.

## Releases
- **v0.60.0-nightly.20250906.g85aca163f** — Nightly continuation; full diff against the previous nightly is incremental ([compare](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20250905.g85aca163f...v0.60.0-nightly.20250906.g85aca163f)).

## Hot Issues

1. **[#22323 — Subagent recovery after MAX_TURNS reports GOAL success (P1, bug)](https://github.com/google-gemini/gemini-cli/issues/22323)** — *matei-anghel, 13 comments.* `codebase_investigator` returns `status: "success"` / `Termination Reason: "GOAL"` even though it hit the turn cap before any analysis. Misleading telemetry undermines trust in agent reports and incident reproduction.

2. **[#21409 — Generalist agent hangs (P1, bug)](https://github.com/google-gemini/gemini-cli/issues/21409)** — *turmanticant, 8 comments, 👍8.* Trivial tasks (creating a folder) hang for over an hour when deferred to the generalist agent. Wide community agreement (highest thumbs-up among issues) signals a systemic issue with subagent dispatch.

3. **[#21983 — Browser subagent fails under Wayland (P1, bug)](https://github.com/google-gemini/gemini-cli/issues/21983)** — *sigmaSd, 4 comments.* Browser subagent exits with `Termination Reason: GOAL` while reporting failure — same misleading reporting pattern as #22323, suggesting a shared bug surface.

4. **[#25166 — Shell command stuck on "Waiting input" after completion (P1, bug)](https://github.com/google-gemini/gemini-cli/issues/25166)** — *rnett, 4 comments, 👍3.* Even trivial commands (e.g. `ls`) leave Gemini waiting for input after they exit. High-frequency annoyance blocking interactive sessions.

5. **[#26525 — Add deterministic redaction & reduce Auto Memory logging (P2, security)](https://github.com/google-gemini/gemini-cli/issues/26525)** — *SandyTao520, 5 comments.* Auto Memory sends transcript content to the background model before secrets are redacted, and service-side logging can persist skill secrets. Real privacy risk for users.

6. **[#19873 — Zero-dep OS sandboxing & post-execution intent routing (P2, enhancement)](https://github.com/google-gemini/gemini-cli/issues/19873)** — *abhipatel12, 9 comments.* Proposes letting Gemini 3 chain native POSIX tools without compromising sandbox guarantees. Strategic direction for unlocking the model's bash affinity.

7. **[#22745 — Assess AST-aware file reads/search/mapping (P2, feature)](https://github.com/google-gemini/gemini-cli/issues/22745)** — *gundermanc, 7 comments.* EPIC exploring whether AST tooling can shrink reads, reduce turn count, and navigate large codebases more efficiently. Could cut token costs meaningfully.

8. **[#21968 — Gemini under-uses custom skills & sub-agents (P2, bug)](https://github.com/google-gemini/gemini-cli/issues/21968)** — *rnett, 6 comments.* User-defined skills are ignored unless the user explicitly invokes them. Affects every team investing in skill libraries.

9. **[#24246 — 400 error when tool count exceeds 128 (P2, bug)](https://github.com/google-gemini/gemini-cli/issues/24246)** — *gundermanc, 3 comments.* Heavy MCP / extension users hit a hard tool-limit ceiling. Needs smarter in-context tool scoping.

10. **[#21763 — Bug report omits subagent context (P1, bug)](https://github.com/google-gemini/gemini-cli/issues/21763)** — *rkj, 2 comments.* `/bug` only captures the parent session; triage for subagent failures is essentially impossible without manually gathering logs.

## Key PR Progress

1. **[#29137 — Bulk npm dependency bump (76 updates)](https://github.com/google-gemini/gemini-cli/pull/29137)** — *dependabot.* XL dependency refresh including `simple-git`, `@modelcontextprotocol/sdk`, and many others. Worth scanning for behavioral shifts.

2. **[#29184 — Validate git args in Windows sandbox to block silent `git diff --output`](https://github.com/google-gemini/gemini-cli/pull/29184)** — *PakCyberbot.* P1 security fix: Windows sandbox currently treats all `git status|log|diff|show|branch` as read-only regardless of args; `--output=` could truncate arbitrary files.

3. **[#29106 — Flush final SSE event on EOF without trailing blank line (CLOSED)](https://github.com/google-gemini/gemini-cli/pull/29106)** — *AnupamKumar-1.* Fixes silent loss of `finishReason`/usage metadata on truncated streams or non-conformant proxies.

4. **[#29117 — Enforce RFC 9207 issuer identification in MCP OAuth (CLOSED)](https://github.com/google-gemini/gemini-cli/pull/29117)** — *jvargassanchez-dot.* Closes an OAuth token-routing foot-gun by validating response `iss` against the request origin in MCP OAuth flows.

5. **[#29163 — Prevent auth crash inside git repos under macOS Seatbelt (P1)](https://github.com/google-gemini/gemini-cli/pull/29163)** — *ehsan-fj.* Startup `useGitBranchName` hook can crash in restricted-permission environments; fixed to fail gracefully.

6. **[#29098 — Make `useInputHistoryStore` state updaters pure](https://github.com/google-gemini/gemini-cli/pull/29098)** — *Eswar809.* Side-effecting `recalculateHistory()` was being called inside a `setState` updater; under React StrictMode this double-invokes and corrupts input history.

7. **[#29195 — Degrade non-array checkpoint history instead of crashing `/resume`](https://github.com/google-gemini/gemini-cli/pull/29195)** — *soroush5.* Resumes no longer throw raw `TypeError` on valid-JSON-but-malformed checkpoint files.

8. **[#29125 — Convert hook timeout from seconds to milliseconds](https://github.com/google-gemini/gemini-cli/pull/29125)** — *0717lee.* Migrated hook configs from Claude Code (seconds) now get 1000× shorter timeouts than expected. Important for anyone importing hooks.

9. **[#29205 — Submit MCP prompt text without JSON encoding](https://github.com/google-gemini/gemini-cli/pull/29205)** — *CoralGarden52.* Preserves newlines/quotes from MCP servers verbatim instead of double-encoding them.

10. **[#29229 — Reject non-finite numbers in settings editor](https://github.com/google-gemini/gemini-cli/pull/29229)** — *bunnysayzz.* Inputs like `1e309` were silently serialized to `null`, corrupting the setting the dialog had just "accepted".

## Feature Request Trends

- **AST-aware tooling** (#22745, #22746): precise file reads, codebase mapping, and "tactful extraction" (#19561) to replace the current 36.6k-token-per-turn firehose.
- **Agent self-awareness** (#21432): the agent should accurately know and teach its own CLI flags, hotkeys, and invocation patterns.
- **Subagent observability** via `/chat share` (#22598) and richer bug-report context (#21763).
- **Local subagents / Sprint 1** (#20195): enabling user-defined subagents as first-class citizens.
- **Safer destructive behavior** (#22672): discourage `git reset --force` and other risky defaults when safer alternatives exist.
- **OS-level sandboxing** for native bash affinity (#19873).

## Developer Pain Points

- **Unreliable subagent dispatch & reporting**: agents silently succeed on errors (#22323), hang indefinitely (#21409), or fail on Wayland (#21983). This is the most-cited frustration category.
- **Stuck interactive sessions**: simple commands block on "Awaiting user input" (#25166); interactive scaffolders like `create-vite` deadlock (#22465).
- **Skills and sub-agents ignored by default** (#21968): custom skill libraries require explicit prompting, eroding their value.
- **Tool limit cliff**: a hard 400 error around 128 tools (#24246) breaks power users with large MCP setups.
- **Workspace hygiene**: model scatters temp scripts across directories (#23571), complicating clean commits.
- **Insecure defaults**: silent `--output` writes via git (#29184), transcripts-with-secrets reaching the model (#26525), missing subagent context in bug reports (#21763).
- **Hook migration surprises**: Claude-Code-style hooks (seconds) silently become millisecond timeouts (#29125, #29122).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI — Community Digest
**Date:** 2026-09-07

---

## 🔥 Today's Highlights

The desktop app update to **1.1.15** triggered a cluster of session/worktree regressions — including a 30-second blocking regression in `session.create` and broken worktree resolution — which is dominating today's issue traffic. Meanwhile, two long-standing pain points were closed: **per-project scoped plugins (#1665)** and **GHEC data-residency auth failure in prompt mode (#4527)**. The community also flagged a serious BYOK regression in 1.0.82 that **silently disables prompt caching**, inflating costs roughly 5×.

---

## 📦 Releases

*No new releases in the last 24 hours.*

---

## 🚨 Hot Issues

1. **[#4744] Desktop 1.1.15: every session creation blocks ~30s inside `session.create`** — Freshly opened regression (0.6–0.9s → ~30s) affecting all session types after the latest desktop update. **Why it matters:** a hard latency regression on the most fundamental CLI operation.
   🔗 https://github.com/github/copilot-cli/issues/4744

2. **[#4734] "Worktree missing" on all project sessions after upgrade to desktop 2.98.0 / runtime 1.1.15** — Every worktree-backed session breaks after the auto-update. **Why it matters:** existing user state is effectively orphaned.
   🔗 https://github.com/github/copilot-cli/issues/4734

3. **[#4742] Desktop 1.1.15: cannot create a second Local (branch) session while one is running** — Single-active-session limit newly enforced. **Why it matters:** breaks multi-branch workflows users relied on.
   🔗 https://github.com/github/copilot-cli/issues/4742

4. **[#4720] Copilot CLI 1.0.82 BYOK silently disables prompt caching (~5× cost)** — Provider `usage` shows `cached_tokens=0` because chat requests carry no cache declaration. **Why it matters:** invisible cost multiplier for BYOK users; no warning surfaced.
   🔗 https://github.com/github/copilot-cli/issues/4720

5. **[#4695] MCP OAuth tokens for HTTP servers not reliably reused across sessions — duplicate cache-key entries force repeated re-auth** — PKCE public-client flows mint new cache keys instead of reusing valid ones. **Why it matters:** repeated interactive OAuth prompts degrade MCP UX significantly.
   🔗 https://github.com/github/copilot-cli/issues/4695

6. **[#4694] WSL2: Copilot CLI 1.0.82 consumes ~31 GB RSS and ~57% CPU** — Memory blow-up at ~47% context with Claude Opus 5 on High Effort. **Why it matters:** platform-Linux users on WSL are effectively blocked from long sessions.
   🔗 https://github.com/github/copilot-cli/issues/4694

7. **[#1665] (CLOSED) Support Copilot CLI Plugins Scoped to Project or Repository** — 18 👍, 14 comments — the **top community-voted issue** of the digest, now shipped. **Why it matters:** repo-scoped plugins unlock team-shareable configurations instead of per-user global installs.
   🔗 https://github.com/github/copilot-cli/issues/1665

8. **[#4527] (CLOSED) `copilot -p` fails with 401 on GHEC data residency since 1.0.81-1** — 4 👍. Prompt mode was hitting `api.githubcopilot.com` instead of the tenant endpoint. **Why it matters:** GHEC data-residency customers regain CI/automation compatibility.
   🔗 https://github.com/github/copilot-cli/issues/4527

9. **[#4537] ACP mode auto-approves tool calls again — `session/request_permission` not sent since 1.0.81-1 (regression of #845)** — 2 👍. **Why it matters:** ACP clients lose any chance to prompt before destructive operations; a security-relevant regression.
   🔗 https://github.com/github/copilot-cli/issues/4537

10. **[#4738] `ask_user` form: pressing Enter early submits/cancels and permanently discards the in-progress typed answer** — High-severity data-loss bug in elicitation forms. **Why it matters:** users lose substantial typed input with no autosave; trust erosion in the form UI.
    🔗 https://github.com/github/copilot-cli/issues/4738

---

## 🔧 Key PR Progress

*Only one PR was updated in the last 24h; included below with related open proposals surfaced for context.*

1. **[#4739] docs: propose terminal-owned macOS notifications** — Reference proposal (MIT-licensed) that documents the macOS notification-click problem and supplies a portable, terminal-driven notification example with regression tests. Not a shipped-CLI change, but a useful pattern for maintainers and plugin authors.
  🔗 https://github.com/github/copilot-cli/pull/4739

> Note: Only this single PR saw activity in the 24-hour window; the rest of the pipeline appears quiet at release-cut time.

---

## 💡 Feature Request Trends

Aggregated from open issues across the snapshot:

- **Project/repo-scoped configuration & plugins** — #1665 (now closed) topped the chart with 18 👍, signaling strong demand for team-shareable setups over per-user globals.
- **Editor-grade input ergonomics** — Shift+Arrow / Ctrl+A selection (#2644), Ctrl+E accepting inline suggestions (#4736), and Emacs-style bindings are a coherent cluster of TUX polish requests.
- **Terminal-owned UX** — macOS notifications (#4739) and improved prompt input suggest developers want the CLI to feel like a first-class terminal citizen rather than a wrapper.
- **Reliable ACP (Agent Client Protocol) contract** — Multiple issues (#4537, #4555, #4743) call for stable permission, sub-agent, and idle semantics so ACP integrations can trust the protocol.
- **BYOK transparency & cost controls** — Cache declaration (#4720) and max_output_tokens continuation (#4733) indicate users want explicit, predictable model-economics behavior.
- **Voice / desktop integration stability** — Voice-server pid deadlock (#4740) and desktop-app regressions (#4742, #4744, #4734) reflect demand for more robust cross-platform lifecycle handling.

---

## 😤 Developer Pain Points

- **Desktop 1.1.15 regression wave** — Three separate issues (#4742, #4744, #4734) all filed in a 48-hour window after the same auto-update, breaking session creation, worktrees, and concurrent branches.
- **ACP protocol flakiness** — Tool calls auto-approved without `session/request_permission` (#4537); `session/prompt` aborts running sub-agents (#4555); `end_turn` fires before background shells complete (#4743). ACP integrators cannot build reliable UIs on top.
- **Silent cost/performance regressions** — BYOK prompt caching disabled without notice (#4720); WSL2 RSS ballooning to 31 GB (#4694); tool invocations silently no-op due to malformed markup (#4706). All three are "the user can't tell something is wrong until the bill or OOM hit."
- **MCP OAuth churn** — Duplicate cache keys forcing re-auth every session (#4695) makes HTTP MCP servers painful to use.
- **Data loss in elicitation forms** — Enter-submit discarding typed answers (#4738) is a recurring class of "no autosave, no undo" UX failures.
- **Enterprise model routing inconsistency** — Default enterprise model correctly applied in VS Code/GitHub Desktop but rejected in CLI (#4692); tenants see confusing "not available for this account" fallbacks.

---

*Digest generated from github.com/github/copilot-cli activity between 2026-09-06 and 2026-09-07. Items are selected based on recency, 👍 reaction weight, comment volume, and relevance to active developer workflows.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-07

## Today's Highlights

The 24-hour window was dominated by **billing/quotability regressions on OpenCode Go** (sudden quota exhaustion, persistent 429s) and a wave of **Desktop stability fixes** landing in Tabs, paste handling, and SQLite-backed renderer state. On the platform side, the long-standing **plugin `permission.ask` hook** gap and **Anthropic MCP `oneOf/anyOf` 400 errors** kept trending as the most painful integration bugs for power users.

---

## Releases

*No new releases published in the last 24 hours.*

---

## Hot Issues

1. **[#7006 — `permission.ask` plugin hook is defined but not triggered](https://github.com/anomalyco/opencode/issues/7006)** — The new permission system (PR #6319) advertises a `permission.ask` plugin hook, but it never fires, blocking a whole class of custom auto-approval plugins. 16 comments, 25 👍 — the highest-reaction issue in the window and a clear blocker for the v2 plugin story.
2. **[#45278 — Payment Declined After 3 Months Despite No Issue With Card or Bank](https://github.com/anomalyco/opencode/issues/45278)** — Renewals failing on previously-working cards; a trust-critical billing regression. 12 comments, 2 👍.
3. **[#42935 — OpenCode Go quota exhausted in ~20 minutes after DeepSeek V4 Flash cache reads dropped to 0](https://github.com/anomalyco/opencode/issues/42935)** — Cache billing appears to have fallen back to full-token charging, burning a Go quota in 20 minutes. Strong evidence in usage history. 8 comments, 3 👍.
4. **[#47613 — Go subscription: persistent HTTP 429 (12h retry-after) despite low usage](https://github.com/anomalyco/opencode/issues/47613)** — `https://opencode.ai/zen/go/v1/messages` returning 429 with a resetting 12h backoff for ~3 days, making Go "essentially unusable" for a paying subscriber. 7 comments.
5. **[#32202 — Skill duplicate roots can change `available_skills` across restarts](https://github.com/anomalyco/opencode/issues/32202)** — Non-deterministic skill discovery when two skill roots contain the same name; sorting happens after duplicate resolution, so resolution is unstable. 8 comments, 1 👍.
6. **[#36454 — Is the destruction of the TreeSitter client causing a memory leak?](https://github.com/anomalyco/opencode/issues/36454)** — Repeated `TreeSitter client destroyed` warnings during teardown, with stack traces pointing at `finalizeDestroy`. Cross-references #47696 (the trust/scripts cleanup). 6 comments.
7. **[#46628 — MCP tool schemas are not sanitized for Anthropic: root-level anyOf/oneOf/allOf 400s](https://github.com/anomalyco/opencode/issues/46628)** — Any MCP tool whose `inputSchema` uses root-level union types fails every Anthropic request with `input_schema does not support oneOf, anyOf, allOf`. Also reports `tool.definition` never seeing MCP tools. 4 comments.
8. **[#46760 — `opencode run` returns `{UnknownError}` when the configured default model is deprecated](https://github.com/anomalyco/opencode/issues/46760)** — New users following the docs pick `x-preview-f-free` from the Zen page; once it's retired, `opencode run` returns an opaque error instead of a guided recovery. 4 comments.
9. **[#44790 — Remote MCP OAuth: `resource_metadata` URL from `WWW-Authenticate` is ignored](https://github.com/anomalyco/opencode/issues/44790)** — RFC 9728 conformance gap: only the domain-root `.well-known/oauth-protected-resource` is consulted, breaking AWS Bedrock AgentCore runtimes that publish metadata at a different URL. 3 comments.
10. **[#46156 — Plugin dataflow panel — reserved UI space for per-session metrics and data logs](https://github.com/anomalyco/opencode/issues/46156)** — Feature request to give plugins a real dashboard surface instead of dumping into the chat stream. 3 comments, 1 👍 — a recurring theme across the v2 plugin work.

---

## Key PR Progress

1. **[#45424 — fix(core): dispatch providers whose AI SDK package has no native route](https://github.com/anomalyco/opencode/pull/45424)** — `SessionRunnerModel.fromCatalogModel` only routed 3 AI SDK packages; anything else was silently dropped. Fixes #45426 and unblocks new providers.
2. **[#47310 — feat(desktop): improve worktree UI](https://github.com/anomalyco/opencode/pull/47310)** — Consistent worktree controls across new-session location, session details, move menus, and settings. Closes a long-standing UX gap in Desktop.
3. **[#45482 — fix(task): make async subagent tasks answer honestly, once, in order, and stop](https://github.com/anomalyco/opencode/pull/45482)** — Depends on #43510. Replaces the current "spurious confirmation messages" with a single trailing, request-only user message once all children settle. Closes #45480.
4. **[#47695 — fix(desktop): persist renderer state in SQLite instead of electron-store (CLOSED)](https://github.com/anomalyco/opencode/pull/47695)** — Closing a tab could freeze the desktop app 3–5 s on Windows because every `persisted()` write went through synchronous electron-store on the main thread. Migrated to SQLite.
5. **[#47427 — fix(desktop): prevent large paste crashes](https://github.com/anomalyco/opencode/pull/47427)** — Large pastes were making the desktop prompt lag, freeze, or crash. Closes #47425.
6. **[#47699 — fix(cli): pass `--model` through to the TUI entry](https://github.com/anomalyco/opencode/pull/47696)** — `opencode --model <id> --prompt ...` accepted `--model` on the root command but dropped it before the TUI launched, so the session opened with the default model. Fixes #47172.
7. **[#47262 — fix(workflows): skip close-issues and close-prs jobs on forks](https://github.com/anomalyco/opencode/pull/47262)** — Adds `if: github.repository == 'anomalyco/opencode'` to scheduled close jobs so forks don't auto-close contributor PRs. Closes #35666.
8. **[#42223 — fix(tui): correct working directory when continuing session in a new directory](https://github.com/anomalyco/opencode/pull/42223)** — `opencode -c` in a fresh directory showed a stale directory; SDK `pick()` wasn't falling back to `config.directory`. Closes #42221 and #41562.
9. **[#47696 — chore: stop trusting tree-sitter install scripts (CLOSED)](https://github.com/anomalyco/opencode/pull/47696)** — Removes `tree-sitter`, `tree-sitter-bash`, `tree-sitter-powershell`, and `web-tree-sitter` from `trustedDependencies`. V2 only loads the shipped `.wasm`, so native install scripts are no longer needed. Security tightening tied to #36454.
10. **[#34947 — feat(opencode): add dispatch controls to the task tool](https://github.com/anomalyco/opencode/pull/34947)** — 7 changes to per-dispatch Task controls (model param, variant preservation, etc.); closes #17595, #6651, #26925, #29984, #24757 and supersedes #29447 and #32122. Largest scope task-tool refactor in flight.

Also worth noting:
- **[#47694 — fix(app): give worktree creation a setup-length request deadline (CLOSED)](https://github.com/anomalyco/opencode/pull/47694)** — After #47572 added a 60s response-header abort, `POST /api/worktree` (which runs `git worktree add` plus `commands.start` → 90–120s on Windows) needed its own deadline.
- **[#47676 — fix(util): bound opencode.log by trimming its head in place (CLOSED)](https://github.com/anomalyco/opencode/pull/47676)** — `opencode.log` has been append-only since #31310; long-lived installs grew to 500 MB–1 GB. Now trims head once it exceeds `LOG_MAX_BYTES` (50 MB).
- **[#47635 — fix(opencode): resolve markdown agent prompts](https://github.com/anomalyco/opencode/pull/47635)** — Markdown agent/mode loaders overwrote frontmatter `prompt:` with the (possibly empty) Markdown body. Closes #47616.

---

## Hot Discussions

*No discussion data was provided in the source — section omitted.*

---

## Feature Request Trends

- **First-class plugin surfaces**: a dedicated plugin dataflow/metrics panel (#46156), opt-in discovery of Claude Code agents/commands from `.claude/` dirs (#47650), and ecosystem plugin registrations (#44509 opencode-dejavu, #43353 opencode-autorecord). The v2 plugin story is clearly the most active area of extension.
- **Session management UX**: favourite/star sessions (#47700), worktree UI polish (#47310), and recovering sessions orphaned by a deleted `.git` (#47652).
- **Provider catalog coverage**: docs + integration asks for Standard Compute (#47475) and Nous Research's inference API (#47515); dispatch routing for AI SDK packages without native routes (#45424).
- **OAuth/MCP conformance**: RFC 9728 `resource_metadata` honoring (#44790), Anthropic MCP schema sanitization (#46628), ChatGPT OAuth context-window correction (#47646).
- **Operational hygiene**: log rotation (#47676), safer `tree-sitter` install posture (#47696), fork-safe scheduled jobs (#47262).

---

## Developer Pain Points

- **Billing trust erosion on OpenCode Go** — quota exhaustion with cache reads dropping to 0 (#42935), persistent 12h 429s despite low usage (#47613), and silent renewals declining previously-working cards (#45278). Three independent reports in 24h — this is the #1 trust issue.
- **Hook and plugin surface mismatches** — `permission.ask` documented but not dispatched (#7006); MCP tools never appear in `tool.definition` while their schemas 400 Anthropic (#46628); local TUI plugins failing on the node build (#42481).
- **Desktop stability on Windows** — GPU process crash loop (#46691), tab-close freezes from electron-store (#47695), large-paste crashes (#47427), and 60s header-deadline hitting slow `git worktree add` + `bun install` flows (#47694).
- **Opaque error paths for deprecated config** — `opencode run` returns `{UnknownError}` on a deprecated default model (#46760); TUI shows wrong CWD on `opencode -c` (#42223); CLI drops `--model` before TUI start (#47699).
- **Skill discovery non-determinism** — duplicate skill roots produce different `available_skills` across restarts (#32202), making plugins and prompt caching flaky.
- **Background CPU / TUI performance** — main thread pinned at ~100% redrawing a spinner with no active output (#42306), and recurring TreeSitter destroy warnings pointing at finalize-destroy leaks (#36454).
- **Dotfile/config management breakage** — saving CLI preferences replaces a symlinked `cli.json` with a regular file (#45067), breaking GNU Stow and similar workflows.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-07

## Today's Highlights

The community saw a flurry of closed issues and PRs addressing provider routing, DNS resolution, and cross-provider reliability — most notably fixes for GitHub Copilot GPT-6 Astra routing (#9253) and MagicDNS-style hostname resolution via undici (#9250/#9252). Several reliability-oriented issues remain open, with the long-running `openai-codex` connection reliability thread (#4945, 76 comments) continuing to dominate engagement. Discussion also surfaced around a per-repo override for API keys (#9146) and a growing desire for opt-in cross-provider fallback chains (#9242).

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. **[#4945](https://github.com/earendil-works/pi/issues/4945) — openai-codex Connection Reliability Issues** (OPEN, in progress, 76 comments, 32 👍). The TUI gets stuck on "Working…" with no streamed text or tool call when using `openai-codex`/`gpt-5.5`; users must press Esc to abort. Highest-traffic thread of the day — a clear ongoing reliability pain point.
2. **[#7547](https://github.com/earendil-works/pi/issues/7547) — How do you use Pi on Windows? What issues are you seeing?** (OPEN, 56 comments). Maintainers are explicitly soliciting Windows feedback to prioritize fixes — a strategic thread for any Windows-based developer.
3. **[#9258](https://github.com/earendil-works/pi/issues/9258) — Orchestration DX: `models.json` `apiKey: "$ENV"` not resolved** (closed). `$ENV` interpolation in `~/.pi/agent/models.json` returns the literal string, causing 401s. Important for programmatic / harness usage.
4. **[#9242](https://github.com/earendil-works/pi/issues/9242) — Cross-provider fallback chain on transport/unreachable errors** (closed). Request for an opt-in provider/model fallback when the current one is unreachable. Three PRs (#9248/#9249/#9251) were filed against this in 24 hours.
5. **[#8826](https://github.com/earendil-works/pi/issues/8826) — Cap agent retry backoff for prolonged transient outages** (OPEN). Exponential backoff during long upstream outages never settles; a configurable cap is needed.
6. **[#8827](https://github.com/earendil-works/pi/issues/8827) — TUI LaTeX legacy font switches force whole-block raw fallback** (OPEN). Blocks like `\rm` and `\bf` cause Pi to fall back to raw source instead of unicode math rendering.
7. **[#8617](https://github.com/earendil-works/pi/issues/8617) — Codex: Use file references for image-heavy tool results** (OPEN). Decouple image storage from provider payload; send `file_id` refs instead of base64 every request.
8. **[#9237](https://github.com/earendil-works/pi/issues/9237) — `pi-opencode-bridge@0.2.1` sends no `x-opencode-session` header** (closed). A community package is breaking prompt-cache affinity against OpenCode Go. The issue doubles as a request for host-based auto-inject in core.
9. **[#8791](https://github.com/earendil-works/pi/issues/8791) — Expose the model runtime to extensions** (closed, 4 👍). Extensions building in-process agent sessions need read-only access to the backing `ModelRuntime`.
10. **[#9209](https://github.com/earendil-works/pi/issues/9209) — GitHub Copilot GPT-6 Astra routed to unsupported Chat Completions endpoint** (closed). Already fixed in-flight by PR #9253 — a tight example of issue→PR turnaround.

## Key PR Progress

1. **[#9253](https://github.com/earendil-works/pi/pull/9253) — fix(ai): route Copilot GPT models through Responses** (OPEN). Routes Copilot GPT models to the Responses endpoint, fixing #9209. Future-looking: there are no GPT-4 models in the GitHub catalog anymore, so the change is safe.
2. **[#6881](https://github.com/earendil-works/pi/pull/6881) — feat(ai): use provider-reported cost when responses include it** (OPEN, in progress). Prefers `usage.cost` / `cost_details.upstream_inference_cost` over catalog rates, falling back to `calculateCost`. Affects OpenAI completions primarily.
3. **[#9096](https://github.com/earendil-works/pi/pull/9096) — feat(ai, coding-agent): add Meta provider with Muse subscription OAuth** (OPEN). Adds Meta + Muse OAuth subscription provider. Notes an unusual refresh-token mechanism (daily re-mint from identity token) and "fake" streaming that bursts output.
4. **[#7610](https://github.com/earendil-works/pi/pull/7610) — feat(ai): add LLM Gateway and LLM Gateway DevPass providers** (OPEN). OpenRouter-style router added as built-in `openai-completions` providers, contributed by the LLM Gateway team.
5. **[#9137](https://github.com/earendil-works/pi/pull/9137) — feat(coding-agent): add Nix flake** (OPEN, WIP). Reproducible Nix packaging for the coding agent.
6. **[#9222](https://github.com/earendil-works/pi/pull/9222) — fix(coding-agent): reject reload during active session operations** (OPEN). Prevents reload during streaming from invalidating the runner and sending spurious errors to the model.
7. **[#9251](https://github.com/earendil-works/pi/pull/9251) — feat(coding-agent): hop to a fallback provider on transport errors** (CLOSED). One of three rapid iterations to implement #9242; introduces a provider fallback helper and session wiring.
8. **[#9252](https://github.com/earendil-works/pi/pull/9252) — fix(coding-agent): pin undici connect lookup to system `dns.lookup`** (CLOSED). Resolves #9244 — MagicDNS / Tailscale / split-horizon names that resolve via system DNS now work.
9. **[#9224](https://github.com/earendil-works/pi/pull/9224) — fix(ai): clamp OpenRouter `:free` maxTokens to base model** (CLOSED). Catalog `:free` entries advertise larger `max_tokens` than the underlying model supports; Pi now clamps to the base value to avoid 400s.
10. **[#9233](https://github.com/earendil-works/pi/pull/9233) — fix(coding-agent): resolve model auth live instead of from startup snapshot** (CLOSED). Avoids races with the background `configuredProviders` refresh that could leave auth gating in an unsettled state at startup.

## Hot Discussions

**Q&A**
- **[#9146](https://github.com/earendil-works/pi/discussions/9146) — Provide a per-repo override for API Key and ignore auth.json** (1 👍). The author uses a 1Password-managed OpenRouter key in `auth.json` but wants a way to override per repo (e.g., for evaluation harnesses). Signals a growing need for scoped / per-project auth configuration rather than a single global `auth.json`.

## Feature Request Trends

- **Cross-provider fallback chains**: A clear, repeated demand (#9242 plus three PR iterations in one day) to hop between providers on transport-level errors rather than failing hard.
- **Better Anthropic cache utilization**: #9246 asks to spend the unused 4th cache breakpoint on a stable conversation checkpoint — a low-effort, high-leverage caching improvement.
- **Extension surface for TUI/runtime**: Multiple requests (#9238 `setTuiMode`, #8791 model runtime, #9236 acknowledged delivery, #9247 JSON/RPC failure classification) point toward a richer extension API.
- **Image-handling refinements for Codex**: #8617 (file references) and #9256 (resumed sessions re-rendering tool-result images inline) together suggest image pipelines need a coherent refactor.
- **Custom-tool safety controls**: #9228 / #9227 ask for opt-in per-call confirmation flows for untrusted tool output.
- **Reliability knobs for long outages**: #8826 (retry backoff cap) and #9240 (TUI scroll position preservation) reflect a theme of hardening sessions against prolonged upstream instability.

## Developer Pain Points

- **Windows friction dominates**: Shift+Enter submitting instead of newline (#7175), `shell_path` ignored when WSL is disabled (#9229), and TUI image rendering errors (#8306) form a recurring Windows-specific complaint cluster — reinforced by the maintainer call in #7547.
- **OpenAI Codex reliability regressions**: #4945 is the single most-engaged thread, and users are still hitting silent hangs requiring manual Esc recovery.
- **Provider-specific quirks**: GPT-6 Astra on Copilot needs Responses routing (#9209/#9253); Claude Opus 5 via OpenRouter rejects per-message `output_config` (#9165); OpenRouter `:free` models overflow max tokens (#9224); OpenCode Go requires a new `x-opencode-session` header (#9230/#9237).
- **DNS resolution gaps**: MagicDNS / Tailscale / split-horizon hosts fail because undici doesn't pin `dns.lookup` (#9244, fixed by #9252).
- **Session restore inconsistencies**: Resumed sessions can re-render images at full size (#9256) and overwrite the active model from the wrong field of the last assistant message (#9243).
- **Programmatic orchestration rough edges**: `$ENV` interpolation in `models.json` not resolving (#9258) and lack of exported `package.json` paths are friction points for harness builders.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-07

## 1. Today's Highlights

The community is heavily focused on **architectural consolidation**: the long-running ink → OpenTUI TUI migration (#8662) closed another major gap with the parity closeout PR (#11152), while the **multi-agent mesh** initiative took a concrete step forward with per-turn run binding and thread-status derivation (#11229, #11230). On the quality side, multiple P1 issues surfaced around **skill `PreToolUse` hooks** silently failing after `--continue` (#11180) and **telemetry leaking raw tool errors** to RUM (#11198) — both demand prompt security attention. The v0.23.1-preview.1 release was published but its workflow failed in `integration_docker` (#11185), currently auto-rolled back.

## 2. Releases

- **v0.23.1-preview.1** — Preview release. [Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.1-preview.1) (workflow failed; see [#11185](https://github.com/QwenLM/qwen-code/issues/11185))
- **v0.23.0-nightly.20260906.92a8a8d179** — Nightly. [Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.0-nightly.20260906.92a8a8d179)
- **v0.23.0-nightly.20260905.0c945a6136** — Nightly. [Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.0-nightly.20260905.0c945a6136)

All three carry the **Web Shell dynamic-workflow visualization** (#10594) and session-workflow derivation work from @qqqys.

## 3. Hot Issues

| # | Issue | Priority | Why it matters |
|---|-------|----------|----------------|
| [#8662](https://github.com/QwenLM/qwen-code/issues/8662) | Migrate TUI rendering from ink to OpenTUI (tracking) | P3 | 30-comment tracking epic for the largest TUI rewrite in the project; the patched ink renderer (~1k lines) is the root cause of structural flicker/VP bugs. |
| [#11031](https://github.com/QwenLM/qwen-code/issues/11031) | `/export html` embeds 19.5 MB Web Shell runtime per file | P1 (closed) | Export-data cost regression — every HTML carries the full React/daemon graph even for empty sessions. Closed after fix. |
| [#11100](https://github.com/QwenLM/qwen-code/issues/11100) | `web-shell/transcript` still pulls daemon React runtime | P2 | Read-only transcript shouldn't depend on the daemon SDK; breaks the new transcript bundle's purpose. |
| [#11146](https://github.com/QwenLM/qwen-code/issues/11146) | Pre-aborted tool requests queue behind unrelated batches | P2 | Core scheduler logic bug — cancelled requests can stall behind active work, leading to confusing hangs. |
| [#11109](https://github.com/QwenLM/qwen-code/issues/11109) | `release.yml` repeats work, one step verifies nothing | P2 | Two release runs timed out on the same day; CI redoes work and contains a no-op verification step. |
| [#6181](https://github.com/QwenLM/qwen-code/issues/6181) | Mobile session switching in Web Shell is janky | P1 | Full sync transcript render + 2 s sidebar polling + per-frame O(transcript) cost inside a 200 ms drawer animation — multi-second freezes on phones. |
| [#11180](https://github.com/QwenLM/qwen-code/issues/11180) | Skill `PreToolUse` hook stops enforcing after `--continue` | P1 (security) | Safety gate silently disabled when resuming sessions, while skill instructions remain in context. |
| [#11186](https://github.com/QwenLM/qwen-code/issues/11186) | `qwen serve` channel ownership model leaks user-scope settings | P2 | Home-directory workspace disables workspace scope, attributing shared settings to user scope — a real multi-tenant isolation gap. |
| [#11198](https://github.com/QwenLM/qwen-code/issues/11198) | Telemetry uploads raw tool-error text (incl. shell command lines) to RUM | P1 (security) | Default-on telemetry path lacks redaction; pre-existing on `main`. Predecessor of #10916. |
| [#10247](https://github.com/QwenLM/qwen-code/issues/10247) | Agent Team — stability audit follow-ups & experience backlog | P2 | Tracking issue for the multi-agent quality work; consolidates scattered bugs into `welcome-pr` items for contributors. |

## 4. Key PR Progress

| # | PR | What it does |
|---|----|----|
| [#11229](https://github.com/QwenLM/qwen-code/pull/11229) | mesh: per-turn run binding & turn prompt envelope | Mesh step 5a — pure, provable without a runtime, lands before the thread tools (5b) that depend on it. |
| [#11230](https://github.com/QwenLM/qwen-code/pull/11230) | mesh: thread status from every run's close obligation | Replaces "whichever run finished last" with a deterministic close-obligation model (`blocked`/`review`/`waiting`/`unclosed`/`failure`). |
| [#11152](https://github.com/QwenLM/qwen-code/pull/11152) | OpenTUI parity closeout (dialogs, composer, shell mode) | Closes the last behavioral gaps vs. the ink renderer with an acceptance harness — auth dialog, deferred updates, etc. |
| [#10504](https://github.com/QwenLM/qwen-code/pull/10504) | DingTalk: localized dynamic lifecycle tags | Status reactions (Thinking/Reading/Running/Editing/Retrying/...) without exposing raw tool input or reasoning. |
| [#11103](https://github.com/QwenLM/qwen-code/pull/11103) | CI: stop failing Test job on vitest worker IPC flake alone | New `classify-infra-flake.mjs` distinguishes infra flake from real failure; emits `::warning::` instead of red. |
| [#11171](https://github.com/QwenLM/qwen-code/pull/11171) | VS Code: return the edit when a permission diff is closed | `onDidCloseTextDocument` routed to `DiffManager.cancelDiff`; closes the dead-end "approve a vanished diff" UX gap. |
| [#11086](https://github.com/QwenLM/qwen-code/pull/11086) | `serve`: scope extensions to workspace runtimes | Reconciles global extension catalog into live workspace runtimes; exposes workspace-qualified daemon/SDK. |
| [#10916](https://github.com/QwenLM/qwen-code/pull/10916) | core: halt turns on repeated identical tool errors | Always-on guard in the loop detector — fingerprint `functionResponse.response.error`, route through `LoopDetected`. |
| [#10183](https://github.com/QwenLM/qwen-code/pull/10183) | memory: structured on-demand recall (push/pull) | Replaces flat memory with a two-level ref/title tree + query-focused metadata subtree + dedicated recall tool. |
| [#6213](https://github.com/QwenLM/qwen-code/pull/6213) | CLI: handle IME composition (clean pinyin intermediates) | Action keys during IME composition no longer fire normal handlers; makes Chinese IME usable. |
| [#11169](https://github.com/QwenLM/qwen-code/pull/11169) | web-shell: close trust-gate & bystander gaps in local-files bridge | Carries four late review fixes for #10962; reserves a "still resolving" workspace-route judgement state. |

## 5. Hot Discussions

*No GitHub Discussions data was provided in the source — section omitted.*

## 6. Feature Request Trends

- **Multi-agent mesh orchestration** is the dominant forward-looking direction: per-turn run binding, deterministic thread status, and stable close-obligation semantics are arriving as coherent design steps (#11229, #11230, #10247).
- **Structured memory as a first-class recall protocol** is being formalized: a push/pull model with a ref/title tree plus a query-aware metadata subtree and a dedicated tool, replacing the flat body-heavy memory prompt (#10183).
- **ACP/IDE parity with the terminal CLI** — the long-standing ask is to be able to **queue messages while a turn runs** in the IDE, matching `qwen` CLI ergonomics (#8542). Closely linked: turn-time lifecycle visibility (#10504 for DingTalk).
- **Project-scoped (vs. user-scoped) extensions** — the design proposal (#4790) is finally getting attention after months of dormant code paths (`Storage.getExtensionsDir`, `loadExtensionsFromDir`) that were never wired.
- **Offline / standalone licensing** for air-gapped customer packages (#4318) — first-launch activation, bundled signed license, no network.
- **Bounded notification overflow** without silent result loss (#7805) — recurring async-system design interest.

## 7. Developer Pain Points

- **Hook/skill lifecycle inconsistencies**: `PreToolUse` hooks silently fail to fire under `/<skill-name>` (#11067) and after `--continue` (#11180) while the skill body still runs — a major trust issue for skills-as-safety-gates.
- **TUI key-handling broadcast model**: `KeypressContext` is a fire-and-forget broadcast that discards handler return values (#11228), so an open right-click context menu cannot consume keys, leading to composer/dialog race conditions.
- **CI flakiness and redundant work**: `release.yml` redoes work and contains a no-op verification step (#11109); the `web-shell E2E Smoke` job is the only one on the ECS pool still using a flat 20-minute timeout and gets killed under contention (#11209); the autofix loop starts a doomed route job when an issue already has a create-time assignee (#11214).
- **Web Shell daemon/Runtime coupling leaks**: the read-only transcript bundle still pulls the daemon React SDK (#11100); HTML export inflates to 19.5 MB (#11031); mobile session switching is O(transcript) per frame inside a 200 ms animation (#6181); VS Code loses prompt-authority polling when the sidebar isn't mounted (#10989).
- **Scheduler / cancellation correctness**: pre-aborted requests can be stranded behind unrelated batches (#11146), and normal queued cancellation skips completion cleanup (#11162).
- **False-success HTTP/SSE errors**: statusless SSE throttling errors skip rate-limit retry (#11215), and Anthropic SSE failures report successful headless JSON results (#11217) — a recurrent class of bug in the headless CLI path.
- **Security/telemetry gaps**: usage-statistics uploads raw tool-error text including shell command lines without redaction (#11198); the content-filter screen on `main` lost six hardenings relative to #10421's branch (#11205); `.qwen/tmp` cache sibling writers remain (#10974).
- **Localization gaps**: `/effort` is not propagated to generic OpenAI-compatible backends (#11227); the CLI bootstrap help/version intercepts silently swallow a subcommand's free-text argument and exit 0 (#11193).
- **UX regressions in dialogs**: dialog clipping in short terminals (#9040) and bottom-stuck VP content showing a blank gap above the composer (#9305) continue to be filed as small but high-frequency annoyances.

---
*Generated from GitHub data for QwenLM/qwen-code on 2026-09-07. 50 issues and 50 PRs scanned; 30/20 shown by activity.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*