# AI CLI Tools Community Digest 2026-09-08

> Generated: 2026-09-07 16:38 UTC | Tools covered: 7

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

# AI CLI Tools Cross-Tool Comparison Report — 2026-09-08

## 1. Ecosystem Overview

The AI coding-agent CLI category has split into two competing generations: first-party corporate CLIs (Claude Code, Codex, Gemini CLI, Copilot CLI) competing on breadth and platform integration, and independent/open-source challengers (OpenCode, Pi, Qwen Code) competing on openness, provider agnosticism, and automation surfaces. Across all seven, the center of gravity has shifted from raw coding capability to **operational concerns** — durable multi-day sessions, cost governance, permission calibration, and MCP integration hardening. Tellingly, the day's highest-engagement threads are demands for *control*, not capability: Codex's `/rewind` request (119 👍) and Claude Code's middleware-hooks proposal (129 comments). Windows/desktop has become the shared expansion frontier, and upstream provider/API drift (OpenCode Go's new session header, Copilot's Responses-only routing) emerged within 48 hours as a distinct operational risk class.

## 2. Activity Comparison

| Tool | Issues (24h) | PRs (24h) | Discussions (24h) | Releases (24h) |
|---|---|---|---|---|
| **Claude Code** | 10 hot (peak: #91870 — 129 comments / 80 👍) | 3 active — flagged "unusually thin" | N/A† | None |
| **Codex** | 10 hot (peak: #25178 — 46 comments) | 10 | 9 threads (peak: #9618 — 119 👍) | None |
| **Gemini CLI** | 10 hot, incl. 5 P1 | 11 | N/A† | 1 (nightly v0.60.0) |
| **Copilot CLI** | 26 updated / 10 hot | 3 (2 MS prototypes, 1 off-topic) | N/A† | None |
| **OpenCode** | 50 updated / 10 hot | 50 updated | N/A† | None |
| **Pi** | 10 hot (peak: #4945 — 77 comments / 32 👍) | 10 (7 open / 3 closed) | N/A† | None |
| **Qwen Code** | 10 hot, incl. 2 P1 | 16 (10 key + 6 notable) | N/A† | 3 (preview, nightly, cua-driver-rs v0.20.4) |

† Discussions data is absent from the dataset for these repos (channel not provided/enabled upstream); **N/A ≠ inactive**. Codex is the only repo with Discussions data this cycle.
*Note: "hot" counts are editorial top-10 selections; raw updated counts shown where the digest provides them (OpenCode 50/50, Copilot 26).*

## 3. Shared Feature Directions

- **Session durability & lifecycle recovery** *(all seven)* — Sessions are becoming multi-day durable workspaces, and every state machine is showing cracks: Copilot (#4755 wedged queue, #4742 single-active-session limit), Codex (#41566 duplicate ordinals, #38787 quadratic resume), Qwen (#11119 dropped background-shell output), Pi (#5886 settlement/continuation meta-issue), OpenCode (#47510 event compaction, #47567 SQLite lock retries).
- **Undo / rewind / time-travel** — Loudest unmet demand at Codex (#9618, 119 👍 — users explicitly cite Claude Code and OpenCode as already having it); Qwen is implementing it (#9466, rewind anchored to stable prompt identity).
- **Hard cost governance** — Claude Code wants enforced circuit breakers with per-source attribution (#85422); OpenCode documents $14.82 wasted on a cache-bust bug (#40790, 22.5% bust rate) plus stuck quotas (#47614); Codex users face capacity instability (#43398); Qwen users demand billing transparency (#44). Cost is moving from dashboards to runtime enforcement.
- **Permissions 2.0** — Both directions are broken: over-eager blocks without opt-outs (Claude #44657 filename heuristic, Copilot #4757 fail-closed false positive on `--yolo`) and under-enforcement (Codex #42253 destructive action with no popup, #33282 auto-approval not inherited; Claude #53223 advisory-only `CLAUDE.md`/`AGENTS.md`). Codex is consolidating into a single Guardian approval interface (#43462, #43458); OpenCode adds URL-pattern `webfetch` rules (#46611).
- **MCP production hardening** — Cancellation/lifecycle is the #1 gap (Copilot #4753 resume kills stdio servers; Qwen #11272 cancel permanently kills server in Channel mode), followed by auth (OpenCode #47814 refresh-token binding — mirroring Codex's `validate_refresh_token_issuer`; Codex #43428/#43447) and scale ceilings (Gemini #24246 128-tool 400 error, #28971 truncated-name collisions).
- **Context & cache economics** — Explicit compaction knobs (Claude #75335, #82761), model-aware windows (Codex #16140), token-frugal AST-aware reads (Gemini #22745), cache-hit engineering (OpenCode #47816 moves the date out of the cached prompt; Pi #9116/#9117 system-message deltas for cache locality).
- **Windows & desktop parity** *(all seven)* — Codex's largest cluster (screenshots #25178, sandbox regression #43313, pet overlay #34227), Qwen's ConPTY leak (#11303, ~2.8 GB/12h), Copilot's archive-before-new-session (#4756), Claude's always-on-top window (#89467), OpenCode's CA-cert blocker (#17798), Pi's 57-comment Windows meta-issue (#7547).
- **Subagent reliability & exit-state honesty** — Gemini's agents report false `GOAL` success after `MAX_TURNS` (#22323, #21983) or hang for hours (#21409); Codex fixes dropped subagents on resume (#43491); Qwen requests background-agent recovery (#8586); Claude has a silent task-tool regression (#80015).
- **Memory maturation** — Gemini hardens Auto Memory (cluster #26516–#26525), Qwen wants semantic/embedding recall (#10684), Claude users want instruction files treated as enforced contracts (#53223).

## 4. Differentiation Analysis

| Tool | Strategic focus | Differentiator | Current friction |
|---|---|---|---|
| **Claude Code** | Composability + surface breadth (hooks, plugins, Chrome, desktop, remote control) | Largest, most vocal community; #91870 middleware-hooks proposal sets the API agenda | Guardrail calibration without opt-outs; triage-only public PR channel |
| **Codex** | Approval/safety architecture + consumer-leaning desktop | Guardian V2 consolidation, supply-chain digest pinning (#43444), thread persistence work | Windows cluster; capacity instability (#43398); no `/rewind` yet |
| **Gemini CLI** | OSS-first stability + research | Only major-vendor repo visibly merging community PRs; disciplined P1–P3/EPIC triage | Subagent exit-state dishonesty; 128-tool MCP ceiling |
| **Copilot CLI** | GitHub-native enterprise governance | Fail-closed managed-policy posture; ACP protocol for embedders | v1.0.83 + desktop 1.1.15 regression cluster; weakest external PR channel |
| **OpenCode** | Open multi-provider core + paid Go routing | Highest raw throughput (50/50); provider-agnostic breadth | Go routing instability (429/403 storm); cache-bust cost leaks |
| **Pi** | Minimal, architect-led core; SDK-first | Mid-conversation system-message substrate (#9116/#9117), doc evals, startup perf budgets vs. jcode | Provider drift outpacing its catalog; small community |
| **Qwen Code** | Headless/channel automation + local inference | Web Shell, DingTalk channels, `qwen serve` OpenAPI (#11314), signed CUA driver binaries; 3 releases/24h | TUI substrate rot (ink→OpenTUI, #8662); incoherent daemon lifecycle |

**Target-user split:** governed enterprises → Copilot/Codex (policy, work orders); extension authors and tinkerers → Pi/Claude Code; CI/channel automation and local models → Qwen/OpenCode; OSS contributors → Gemini CLI/OpenCode.

## 5. Community Momentum & Maturity

- **Volume leaders:** OpenCode (50 issues / 50 PRs updated) and Claude Code (deepest single-thread engagement: 129 comments). Codex is the most balanced across issues + PRs + Discussions.
- **Fastest iteration:** Qwen Code (3 releases in 24h including signed/notarized binaries), Gemini CLI (nightly + multiple merged community fixes in-window), OpenCode (rapid close-out: #47743, #47806, #47808 landed same-day).
- **Maturity signals:** Claude Code has entered the *guardrail-tuning* phase — complaints shifted from "doesn't work" to "too restrictive," a hallmark of a mature, heavily-adopted product. Gemini CLI shows the most mature OSS process (labeled priorities, EPICs). Codex/Copilot show strain in release-regression management.
- **Contribution-model divergence is sharp:** corporate repos (Claude: 3 PRs; Copilot: 3 PRs, one a joke) run as feedback sinks with fixes landing internally — high-quality community PRs sit unreviewed (Claude #87079). Pi shows the highest per-capita velocity, driven by a principal architect (mitsuhiko) shipping foundational refactors.

## 6. Trend Signals

1. **Sessions → durable workspaces.** Rewind, checkpoints, background-agent recovery, resume-across-restart are the new battleground. *Reference:* treat agent session state as production data; invest in persistence and idempotent replay now.
2. **Cost control shifts from observability to enforcement.** Hard caps, per-source attribution (hooks/plugins/subagents), cache-bust detection with dollar-level evidence. *Reference:* budget attribution will become a procurement criterion.
3. **Permissions enter 2.0.** Object-scoped rules (URL patterns), centralized approval pipelines (Guardian), and mandatory opt-outs for heuristic blocks — both over-blocking and under-enforcing erode trust symmetrically.
4. **MCP is the universal dependency and the universal weak point.** Cancellation semantics, auth rotation, and tool-count ceilings fail across all seven. *Reference:* contract-test your MCP integrations; don't assume cancel actually cancels.
5. **Instruction files are treated as trust boundaries but enforced as suggestions.** Claude #53223 and the injection-shaped #44778 (system events as user-role messages fabricating consent) predict runtime enforcement of `AGENTS.md`-class policies as a coming differentiator.
6. **Provider drift is a new ops risk.** Upstream contract changes (OpenCode Go's required header, Copilot's Responses-only routing) broke clients within 24 hours. *Reference:* multi-provider tools need versioned contract tests and adaptation layers.
7. **Windows/desktop is where the next wave of users is** — and every vendor is paying the same ConPTY/sandbox/session tax simultaneously.
8. **Subagent exit-state honesty is becoming a trust metric.** False "success" (Gemini's `GOAL` bugs) undermines orchestration; verifiable termination reasons will matter to anyone building multi-agent systems.

**Bottom line for decision-makers:** for governed enterprise adoption, Copilot CLI or Codex (with Guardian-class approvals); for CI/headless and channel automation, Qwen Code or OpenCode; for extensibility and custom agent stacks, Pi or Claude Code (pending the hooks API); for OSS contribution and influence on roadmap, Gemini CLI and OpenCode currently offer the most permeable repositories.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
*Data snapshot: 2026-09-08*

> **Note on data:** Per-PR comment counts were not available in this snapshot (rendered `undefined`); the PR list below is ranked by the dataset's own ordering (most-discussed first), supported by recency, scope, and cross-references to highly-commented Issues. Issue data is complete.

---

## 1. Top Skills Ranking (most-discussed PRs)

**1. [PR #1298](https://github.com/anthropics/skills/pull/1298) — `skill-creator`: Repair `run_eval.py` (0% recall + Windows)**
- Fixes the core evaluation harness so it actually installs the eval artifact as a real skill; addresses Windows stream reading, trigger detection, and parallel-worker failures.
- **Why it matters:** The skill-description optimization loop was optimizing against noise (recall=0% always). Cross-references the heavily-commented Issue #556 (12 comments, 👍7) and 10+ independent reproductions.
- **Status:** OPEN — high priority because it unblocks the entire `skill-creator` feedback loop.

**2. [PR #514](https://github.com/anthropics/skills/pull/514) — Add `document-typography` Skill**
- Typographic quality control for generated docs: orphan-word wrapping, widow paragraphs, and numbering misalignment.
- **Why it matters:** Targets a quality issue that affects *every* document Claude generates and is rarely requested by users.
- **Status:** OPEN.

**3. [PR #1615](https://github.com/anthropics/skills/pull/1615) — Add `scnet-hpc` Skill**
- Operates SCNet HPC clusters via profile-based SSH and Slurm workflows (partitions, modules, accelerators, job generation, cluster discovery).
- **Why it matters:** Domain-specific infra skill pattern (profile-driven) is reusable for other HPC/cloud targets.
- **Status:** OPEN.

**4. [PR #538](https://github.com/anthropics/skills/pull/538) — Fix `pdf` SKILL.md case-sensitivity**
- 8 mismatches (`REFERENCE.md`/`FORMS.md` → lowercase) breaking on case-sensitive filesystems.
- **Why it matters:** Small but high-blast-radius fix for cross-platform PDF skill reliability.
- **Status:** OPEN.

**5. [PR #486](https://github.com/anthropics/skills/pull/486) — Add `odt` Skill (OpenDocument creation/filling/HTML conversion)**
- Covers `.odt`/`.ods`/ODF: creation, template filling, and ODT→HTML parsing.
- **Why it matters:** Closes a long-standing gap for open-standard document formats next to the existing PDF/DOCX skills.
- **Status:** OPEN.

**6. [PR #210](https://github.com/anthropics/skills/pull/210) — Improve `frontend-design` skill clarity**
- Rewrites the skill so every instruction is executable within a single conversation; removes ambiguity that produced inconsistent behavior.
- **Why it matters:** Quality-of-life for one of the most-used creative skills.
- **Status:** OPEN.

**7. [PR #83](https://github.com/anthropics/skills/pull/83) — Add `skill-quality-analyzer` & `skill-security-analyzer` to marketplace**
- Two meta-skills scoring Skills across five dimensions (structure, docs, examples, security posture, etc.).
- **Why it matters:** Directly responds to the trust-boundary concerns in Issue #492 (43 comments, top issue).
- **Status:** OPEN.

**8. [PR #1628](https://github.com/anthropics/skills/pull/1628) — Add `hivemind` (zero-cost multi-agent orchestration)**
- Delegates mechanical work to headless opencode workers on free models while Claude Code remains the sole planner/reviewer/merger.
- **Why it matters:** Addresses the cost-vs-context trade-off that defines multi-agent Skills design.
- **Status:** OPEN.

---

## 2. Community Demand Trends (from Issues)

| Demand theme | Anchor issue(s) | Signal |
|---|---|---|
| **Security & trust boundaries for community Skills** | [#492](https://github.com/anthropics/skills/issues/492) (43 comments, 👍2) | #1 issue by a wide margin. Community skills distributed under the `anthropic/` namespace impersonate official ones and abuse elevated permissions. Drives demand for `skill-security-analyzer` (#83) and clearer provenance. |
| **Org-wide Skill sharing in Claude.ai** | [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 👍8) | Top upvoted. Users want a shared skill library instead of `.skill`-file Slack handoffs. |
| **Skill evaluation & trigger reliability** | [#556](https://github.com/anthropics/skills/issues/556) (12 comments, 👍7), [#1390](https://github.com/anthropics/skills/issues/1390) (4 comments), [#1487](https://github.com/anthropics/skills/issues/1487) (4 comments) | The eval harness and the skills it evaluates are mutually broken: `run_eval.py` reports 0% trigger rate; `mcp-builder/evaluation.py` scores 0/N; `claude-api` injects ~156k tokens in a single tool call. |
| **Self-audit & quality-gate pipelines** | [#1385](https://github.com/anthropics/skills/issues/1385) (4 comments, 👍1), [PR #1367](https://github.com/anthropics/skills/pull/1367) | Pre-task calibration → adversarial review → delivery verification as a built-in Skills primitive. |
| **Skills-as-MCP / cross-agent portability** | [#16](https://github.com/anthropics/skills/issues/16) (4 comments), [PR #1627](https://github.com/anthropics/skills/pull/1627) | Repackaging Skills as MCPs (e.g., Buffer GraphQL) so they run in Claude, Cursor, Codex, OpenClaw, Hermes, n8n. |
| **Domain Skill proposals** | [#1329](https://github.com/anthropics/skills/issues/1329) `compact-memory` (9 comments), [#412](https://github.com/anthropics/skills/issues/412) `agent-governance` (6 comments, CLOSED) | Memory notation and safety/governance patterns for long-running agents. |
| **Distribution hygiene / packaging bugs** | [#189](https://github.com/anthropics/skills/issues/189) duplicate skills (6 comments, 👍9), [#1362](https://github.com/anthropics/skills/issues/1362) pnpm ≥10 failures, [#62](https://github.com/anthropics/skills/issues/62) skills disappearing (10 comments) | Indicates the marketplace/installer layer is a major pain point. |
| **Cloud-vendor integration** | [#29](https://github.com/anthropics/skills/issues/29) AWS Bedrock (4 comments), [#1175](https://github.com/anthropics/skills/issues/1175) SharePoint security (4 comments, CLOSED) | Demand beyond Anthropic's own surfaces. |

**Largest "anticipation gaps" the marketplace hasn't filled yet:** a security-analyzer skill with clear provenance reporting; an org-share primitive in Claude.ai; a working evaluation harness; and Skills that ship as portable MCPs.

---

## 3. High-Potential Pending Skills (active, unmerged)

These PRs are recent, substantive new Skills (not fixes) most likely to land soon:

| Skill | PR | What it adds | Why it's high-potential |
|---|---|---|---|
| `skill-quality-analyzer` + `skill-security-analyzer` | [#83](https://github.com/anthropics/skills/pull/83) | Meta-skills that score other Skills on structure/docs/security | Directly addresses #492, the #1 issue |
| `document-typography` | [#514](https://github.com/anthropics/skills/pull/514) | Typographic QC for generated docs | Universal applicability; recurring user complaint |
| `odt` | [#486](https://github.com/anthropics/skills/pull/486) | ODT/ODS/ODF create + template-fill + HTML | Closes open-format gap alongside PDF/DOCX |
| `self-audit` (v1.3.0) | [#1367](https://github.com/anthropics/skills/pull/1367) | Mechanical file verification + 4-dimension reasoning gate | Complements the quality-gate proposal in #1385 |
| `testing-patterns` | [#723](https://github.com/anthropics/skills/pull/723) | Full testing stack: unit, React, integration | High-demand developer workflow |
| `scnet-hpc` | [#1615](https://github.com/anthropics/skills/pull/1615) | Profile-driven HPC SSH + Slurm | Pattern reusable for other HPC targets |
| `buffer-api` Agent Skill | [#1627](https://github.com/anthropics/skills/pull/1627) | Buffer GraphQL scheduling, portable to multiple agents | First-class example of Skills-as-MCPs (#16) |
| `hivemind` | [#1628](https://github.com/anthropics/skills/pull/1628) | Multi-agent orchestration on free models | Addresses cost-as-feature demand |
| `frontend-design` (revision) | [#210](https://github.com/anthropics/skills/pull/210) | Clarity/actionability rewrite | Affects every frontend task |

---

## 4. Skills Ecosystem Insight

**The community's most concentrated demand at the Skills level is for a self-verifying Skill layer — meta-Skills that audit, score, and secure other Skills, plus an evaluation harness that actually works — because the existing creator/eval tooling is currently optimizing and judging against noise (0% recall, 0/N scores, 156k-token injections), which blocks every other workflow that depends on it.**

---

*Report generated from public GitHub data on anthropics/skills (snapshot 2026-09-08). All links point to the canonical PR/Issue URLs.*

---

# Claude Code Community Digest — 2026-09-08

## Today's Highlights
The standout conversation of the day is **#91870** proposing a Function Hooks API with Express/Koa-style middleware semantics — at 129 comments and 80 thumbs-up it is by far the most-discussed thread, signaling strong community demand for a more composable hooks system. Two further threads reflect an ongoing tension between cost and capability: **#85422**'s "token-burn circuit breaker" request and **#44778**'s security report about system events masquerading as user-role messages, both pointing to areas where Claude Code's guardrails are felt to be too permissive.

## Releases
No new releases in the last 24h.

## Hot Issues

1. **[#91870 — Function Hooks: make plugins 10x more powerful](https://github.com/anthropics/claude-code/issues/91870)** — A polished proposal for middleware-style hooks with a parameterized `$` object, side-effect tracking, and registration-order `next` chaining. *Why it matters:* 129 comments and 80 👍 make this the single hottest thread on the repo; if adopted it would let plugins modify behavior deeply while remaining safe. *Reaction:* broad community buy-in with concrete API sketch.

2. **[#85422 — Token-burn circuit breaker: runtime-enforced spend caps](https://github.com/anthropics/claude-code/issues/85422)** — Requests a *hard* stop, not a warning, with per-source attribution (hooks, plugins, subagents). *Why it matters:* addresses the loudest recurring pain point in AI dev tools — runaway token costs from misbehaving automation. *Reaction:* 28 comments, but 👍 count is 0, suggesting upvote fatigue rather than disagreement.

3. **[#53223 — CLAUDE.md/AGENTS.md instruction compliance is architecturally unenforced](https://github.com/anthropics/claude-code/issues/53223)** — A security-tagged bug consolidating 10+ independent reports that documented memory/instruction files are advisory at best. *Why it matters:* users are treating these files as trust boundaries; the gap is a footgun for teams. *Reaction:* 21 comments, label `[SECURITY]`.

4. **[#42700 — TTS readback + voice mode for Remote Control sessions](https://github.com/anthropics/claude-code/issues/42700)** — Speaks responses aloud for remote/mobile sessions where the screen is not the primary surface. *Why it matters:* accessibility + mobile ergonomics; 26 👍 alongside 19 comments. *Reaction:* strong support, low controversy.

5. **[#89467 — Windows: desktop app window is always-on-top with no toggle](https://github.com/anthropics/claude-code/issues/89467)** — Direct repro for [#87895] (which was closed as invalid but is clearly *not* invalid). *Why it matters:* blocking OS-level workflow for desktop users; 23 👍 and 18 comments. *Reaction:* frustration that a duplicate was incorrectly closed.

6. **[#80015 — Task-list tools no longer exposed to the model after recent update](https://github.com/anthropics/claude-code/issues/80015)** — `TaskCreate`/`TaskUpdate`/`TaskList`/`TaskGet` disappeared from the tool surface; UI still shows tasks. *Why it matters:* silent capability regression affecting agent-driven workflows. *Reaction:* 14 comments, 14 👍 — perfectly symmetric and concerning.

7. **[#44778 — System events delivered as user-role messages cause model to fabricate user consent](https://github.com/anthropics/claude-code/issues/44778)** — When task notifications arrive while the model awaits input, it generates plausible "yes, do it" continuations. *Why it matters:* a concrete prompt-injection-shaped failure mode in agent loops. *Reaction:* 11 👍 — security-shaped concern.

8. **[#52477 — Claude overrode explicit pronouns in user memory and defaulted to male bias](https://github.com/anthropics/claude-code/issues/52477)** — Model-behaviour bug: stored identity from memory was overridden. *Why it matters:* touches both personalisation correctness and bias. *Reaction:* 14 comments, 4 👍.

9. **[#44657 — Subagent Write tool rejects `.md` files named "report"/"summary"/"findings"/"analysis"](https://github.com/anthropics/claude-code/issues/44657)** — A heuristic block with no opt-out, breaking legitimate report-writing workflows. *Why it matters:* over-eager guardrail; 18 👍 on a bug is unusually high. *Reaction:* community clearly wants a kill-switch.

10. **[#74715 — "Always allow" for Claude-in-Chrome persists as `duration:"once"`](https://github.com/anthropics/claude-code/issues/74715)** — Browser-extension permission grants never persist, forcing per-action re-prompts. *Why it matters:* makes the Chrome extension nearly unusable for repeated workflows.

## Key PR Progress

Only 3 PRs were active in the last 24h — overall repo contribution velocity is low:

1. **[#26175 — fix: replace broken native installer bootstrap script (CLOSED)](https://github.com/anthropics/claude-code/pull/26175)** — Documents a real defect: `curl … | bash` silently removes the existing npm install while failing to write `~/.local/bin/claude`. Worth re-opening or re-filing if still reproducible.

2. **[#39043 — Remove "retro-futuristic" recommendation from Frontend Design Skill (OPEN)](https://github.com/anthropics/claude-code/pull/39043)** — Small but stylistically interesting: one-liner with author commentary "Trust me on this one." Highlights community desire to steer away from homogenised aesthetics.

3. **[#87079 — fix(security-guidance): make `**` glob patterns match zero-depth paths (OPEN)](https://github.com/anthropics/claude-code/pull/87079)** — A genuine security bug in `security-patterns.json`: `**/*.ts` excludes top-level files, so rules silently don't apply. Worth merging — the failure mode is non-coverage of protected paths.

> *Note: PR throughput to this repo is unusually thin (3 active PRs in a 24h window). Most fixes appear to be landing internally; the public repo is primarily a triage surface.*

## Hot Discussions
*No GitHub Discussions data was provided in this dataset — section omitted.*

## Feature Request Trends

- **Composable hooks** — the most-requested direction by far: function-style hooks (#91870), filesystem-scoped hooks (#87356), and original-input recovery in `PostToolUse` after `PreToolUse` rewrites (#77851) all point at the same gap.
- **Hard cost controls** — soft warnings aren't enough; #85422 wants enforced circuit breakers with per-source attribution.
- **Voice & a11y in the desktop app** — TTS readback (#42700), in-app font sizing (#78635), and Cowork dictation fixes (#91202) cluster around making the desktop surface usable for non-default input modalities.
- **Tunable context-window behaviour** — auto-compact threshold (#75335) and `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` silently becoming a no-op (#82761) — users want explicit, durable knobs instead of implicit thresholds.
- **Non-interactive session ergonomics** — `--wait-on-usage-limit` (#41502) signals that remote/automated usage is outgrowing interactive prompts.

## Developer Pain Points

- **Silent regressions in tool/API surface** — both #80015 (task tools) and #82761 (autocompact env var) disappeared without changelog entries; developers depend on these for production agents.
- **Permission UX on desktop** — the always-on-top window (duplicated across #87895 and #89467, one wrongly closed) blocks normal Windows workflows.
- **Over-eager heuristics without opt-out** — the subagent `.md` filename block (#44657) and the Chrome `duration:"once"` persistence bug (#74715) both reflect a "guard the user from themselves, always" pattern that breaks legitimate work.
- **Instruction files treated as trusted but not enforced** — #53223 shows teams treating `CLAUDE.md`/`AGENTS.md` as a contract; the architecture disagrees.
- **Prompts shaped like injections** — #44778 (system events as `role:"user"`) and the always-running Claude Issue Triage workflow emails (#81632) are both manifestations of the same underlying issue: signal/noise separation in agent loops.
- **Sparse public PR channel** — with only 3 PRs active in 24h, contributors report a triage-only experience; several high-quality community fixes (e.g. #87079) sit unreviewed.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-08

## Today's Highlights
The Codex repository shows heavy internal maintenance activity around the **Guardian review/approval subsystem** (multiple PRs restructuring approval paths, evidence consistency, and context mode centralization), alongside a cluster of **Windows desktop regressions** affecting Computer Use, Remote control, and the Send button. Meanwhile, the long-standing demand for a **`/rewind`/`/revert` feature** continues to gain traction as the highest-voted open discussion (119 👍).

## Releases
*No new releases in the last 24 hours.*

## Hot Issues

1. **#25178** — Windows Computer Use screenshot fails with `SetIsBorderRequired failed: 不支持此接口 (0x80004002)` on Windows 10 22H2. (46 comments, 22 👍) — blocks any `get_window_state` that needs a screenshot.
2. **#34227** — Windows pet/mascot overlay hit region desynchronizes from the visible sprite over time, breaking clicks. (28 comments)
3. **#41566** — Paginated rollout emits duplicate ordinals after an unfinished turn, permanently freezing thread history projection on Windows. (22 comments)
4. **#42215** — "Could not use this project for a local chat" — Windows ChatGPT Work projects repeatedly fail at the filesystem sync stage. (17 comments)
5. **#33282** — Codex Desktop `create_thread` does not inherit auto-approval mode for worktree tasks, forcing manual confirmation. (16 comments, 6 👍)
6. **#39947** — Android Remote control of a Windows host frequently reports the host as disconnected; long tasks won't open. (15 comments, 6 👍)
7. **#10486** — Plan mode: add "Export plan to Markdown" option. (13 comments, 23 👍) — long-requested quality-of-life feature.
8. **#43398** — Selected model "at capacity" — GPT-5.5, GPT-5.6-Sol/Terra/Luna, and GPT-6 Astra all failing on 2026-09-07; only 5.4-mini responds (Pro 20x). (13 comments, 5 👍)
9. **#38787** — `thread/resume` is effectively quadratic on large active threads, causing Remote steering timeouts. (7 comments)
10. **#35156** — VS Code extension: clicking Review produces no visible diff. (6 comments, 40 👍) — high-impact for the Plus tier review workflow.

## Key PR Progress

1. **#43504** — Treat zombie processes as inactive in the Unix PID backend so exited app-server/updater processes stop appearing alive. ([PR](https://github.com/openai/codex/pull/43504))
2. **#43495** — Add `ThreadManager::fork_internal_session` to fork internal sessions from caller-selected committed history without disturbing an in-flight parent turn. ([PR](https://github.com/openai/codex/pull/43495))
3. **#43494** — `RolloutReferenceIndex::scan_unarchived_threads` limits archive rollout reads to the requested threads, reducing I/O on unrelated compressed files. ([PR](https://github.com/openai/codex/pull/43494))
4. **#43491** — Multi-agent v2 roster now includes unloaded child agents with full agent paths, fixing dropped subagents after cold resume / compaction. ([PR](https://github.com/openai/codex/pull/43491))
5. **#43462** — Remove legacy Guardian `fast_decision`/`full_review` hooks and the duplicate Guardian V2 fast-approval implementation; `ApprovalReviewContributor::decide` becomes the single approval interface. ([PR](https://github.com/openai/codex/pull/43462))
6. **#43458** — Centralize `GuardianContextMode` resolution at session construction and share it across retention, replay, evidence capture, compaction, and review. ([PR](https://github.com/openai/codex/pull/43458))
7. **#43447** — Route MCP elicitations through `decide_approval` so policy/reviewer/review requirements are honored; preserve unsupported form/URL elicitations for the user. ([PR](https://github.com/openai/codex/pull/43447))
8. **#43432** — Let approval extensions pick between cached approval, synchronous review, and a user prompt, with a `review_reason` field; core still enforces mandatory Guardian and fresh-review. ([PR](https://github.com/openai/codex/pull/43432))
9. **#43428** — Advertise experimental `codex/auth-change` capability to stdio MCP servers and emit `notifications/codex/authChanged` on subsequent auth changes. ([PR](https://github.com/openai/codex/pull/43428))
10. **#43444** — Pin V8 release manifests with trusted digests and prevent overwriting published release assets, hardening the supply-chain download path. ([PR](https://github.com/openai/codex/pull/43444))

## Hot Discussions

**Ideas**
- **#9618** — *"How is there not a /rewind or /revert feature?"* (20 comments, 119 👍). Still the most upvoted thread on the repo; users compare unfavorably to OpenCode and Claude Code, which already support undo without committing every change.
- **#7366** — *"Reference files that are gitignored"* (2 comments, 7 👍). `@`-references are blocked for `.gitignore`d paths; users want to inspect dependency source without committing it.
- **#37611** — *"Signed enterprise work orders for governed access to higher-capability Codex models"* (2 comments, 1 👍). Proposes cryptographically signed work orders as an enterprise governance primitive aligned with OpenAI's next-frontier cyber safeguards.

**General**
- **#7782** — *"Deprecating `chat/completions` support in Codex"* (14 comments, 21 👍). Official guidance that the `responses` API replaces `chat/completions`; users ask about migration timelines for tooling.

**Q&A**
- **#43257** — *"How does experimental context management count history lookups against Codex usage limits?"* (0 comments, 2 👍). Multi-day Pro/Astra users want clarity on whether history lookups in a new context window consume allowance.

**Show and tell**
- **#41157** — *CodexFuse 1.2.0* — local Windows tray dashboard for Codex rate-limit usage, resets, and hourly use; no API key needed. ([link](https://lilmark777.itch.io/codexfuse))
- **#43224** — *NULLYARD* — public, no-login MCP board with a static skill and integration guide.
- **#43427** — *Blume.codes* — turns past coding-agent sessions into reusable rules and skills to combat agent drift.

## Feature Request Trends

- **Time travel / undo for agent actions** — `/rewind` or `/revert` is by far the most upvoted unmet need; users want to back out a bad tool call without committing each step.
- **Plan-mode export and persistence** — exporting plans to Markdown for sharing/reference (#10486).
- **Model-aware configuration** — context window and auto-compaction limits should follow the active model, not be a single global value (#16140).
- **Better `@`-references for ignored/dependency files** — unblock looking up implementation in `.gitignore`d vendor code (#7366).
- **First-class mobile/Remote CLI control** — connect the ChatGPT mobile app to a running native Windows Codex CLI session while keeping the terminal in charge (#43273).
- **Governed enterprise access** — signed work orders for invoking higher-capability models in regulated environments (#37611).

## Developer Pain Points

- **Windows desktop regressions** are the loudest theme this week: broken Computer Use screenshots (#25178), pet overlay hit-test drift (#34227), Send button dead after 26.820 (#41081), Remote pairing drops (#39947), Composer disappearing (#42963), and elevated sandbox re-prompting for UAC every session (#42213).
- **Thread/session durability** — duplicate ordinals (#41566), quadratic `thread/resume` (#38787), and stale "newest-first" lookups (#43129) all suggest the rollout/thread persistence layer needs hardening as sessions grow multi-day.
- **Approval & sandbox bypass concerns** — destructive actions executing without the configured approval popup (#42253), and auto-approval not propagating to worktree child threads (#33282).
- **macOS UI quirks** — toolbar/terminal invisible after reinstall (#42664), composer hidden after scrolling (#42776), Computer History waking sleeping displays every 10 minutes (#42902).
- **Code-review ergonomics** — diffs not rendering (#35156) and over-eager cybersecurity warnings on routine OSS reviews (#41466) are eroding trust in the review workflow.
- **Capacity / availability instability** — multiple model tiers reported "at capacity" simultaneously (#43398), undermining Pro/Pro Max reliability expectations.
- **Cross-platform sandbox regression** — `CreateProcessAsUserW failed: 2` introduced between 0.132.0 and 0.153.4 on Windows (#43313) is breaking long-time users.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-08

## Today's Highlights

The community continues to focus on **subagent reliability and the Auto Memory system**. High-priority bugs around subagents reporting false success after `MAX_TURNS` (#22323), the generalist agent hanging indefinitely (#21409), and shell commands getting stuck in "Waiting input" (#25166) signal persistent stability concerns. Meanwhile, the maintainers shipped a steady stream of targeted fixes — particularly around line endings, MCP tool name truncation, sandbox isolation, and the Node 20 → 22 sandbox image upgrade (#28973).

## Releases

- **v0.60.0-nightly.20260907.g85aca163f** — Automated nightly version bump; incremental change over the previous nightly. ([compare](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260906.g85aca163f...v0.60.0-nightly.20260907.g85aca163f))

## Hot Issues

1. **#22323 — Subagent recovery after `MAX_TURNS` reports `GOAL` success (P1 bug, 13 comments)** — `codebase_investigator` reports `status: "success"` even when it hit the turn limit without doing analysis, masking interruptions from the user. Important because users can't trust subagent exit signals. ([link](https://github.com/google-gemini/gemini-cli/issues/22323))
2. **#21409 — Generalist agent hangs (P1 bug, 8 comments, 👍 8)** — Highest community engagement of the batch. Any delegation to the generalist agent can hang for over an hour. Workaround (disabling subagent deferral) implies a deeper routing bug. ([link](https://github.com/google-gemini/gemini-cli/issues/21409))
3. **#25166 — Shell command execution stuck in "Waiting input" after completion (P1 bug, 4 comments, 👍 3)** — Common UX hit: simple shell commands finish but CLI keeps the prompt locked, blocking further work. ([link](https://github.com/google-gemini/gemini-cli/issues/25166))
4. **#21983 — Browser subagent fails on Wayland (P1 bug, 4 comments)** — Reports `Termination Reason: GOAL` despite failure, the same class of misleading exit-state bug as #22323, but on the browser agent specifically. ([link](https://github.com/google-gemini/gemini-cli/issues/21983))
5. **#22186 — `get-shit-done` output hook causes crash (P1 bug, 3 comments)** — Third-party workflow integrations hitting edge cases; signals need for better hook stability. ([link](https://github.com/google-gemini/gemini-cli/issues/22186))
6. **#19873 — Zero-Dependency OS Sandboxing & Post-Execution Intent Routing (P2 enhancement, 9 comments)** — Major architectural proposal to let Gemini 3 use native bash chaining without compromising safety. ([link](https://github.com/google-gemini/gemini-cli/issues/19873))
7. **#22745 — AST-aware file reads, search, and mapping (EPIC, P2, 7 comments)** — Investigations into tools that could cut wasted tokens from misaligned reads. Sister issue #22746 explores specific tools (tilth, glyph). ([link](https://github.com/google-gemini/gemini-cli/issues/22745))
8. **#21968 — Gemini does not use skills/sub-agents enough (P2 bug, 6 comments)** — Despite skills and subagents being configured, the model rarely invokes them autonomously — undermining user investment in customization. ([link](https://github.com/google-gemini/gemini-cli/issues/21968))
9. **#24246 — Gemini CLI 400 error with > 128 tools (P2 bug, 3 comments)** — Hard tooling cap creates a wall for power users with large MCP / extension setups. ([link](https://github.com/google-gemini/gemini-cli/issues/24246))
10. **#22232 — `browser_agent` resilience: session takeover & lock recovery (P3 feature, 4 comments)** — Asks for a fail-fast → fail-tolerant posture when browser profiles are locked. ([link](https://github.com/google-gemini/gemini-cli/issues/22232))

## Key PR Progress

1. **#28973 — Bump sandbox image from EOL `node:20-slim` to `node:22-slim` (P1 security, closed)** — Closes #28584; addresses Node 20 reaching EOL on 2026-04-30. Critical security maintenance. ([link](https://github.com/google-gemini/gemini-cli/pull/28973))
2. **#28972 — Guard `formatTruncatedToolOutput` against non-positive `maxChars` (P1, closed)** — Closes #28620; prevents silent corruption of tool output when budgets are 0 or negative. ([link](https://github.com/google-gemini/gemini-cli/pull/28972))
3. **#29216 — Isolate settings directory in sandbox containers (size L, open)** — Stops the sandbox from mounting host `~/.gemini` directly, preventing OAuth/credential leak via the user's own container setup. ([link](https://github.com/google-gemini/gemini-cli/pull/29216))
4. **#28971 — Keep truncated MCP tool names unique (P2, closed)** — Fixes collisions when two MCP tools share the same first/last 30 characters — eliminates a real registry ambiguity bug. ([link](https://github.com/google-gemini/gemini-cli/pull/28971))
5. **#28975 — Keep glob results for symlinked workspace roots (P2, closed)** — macOS users hit `/tmp` symlink to `/private/tmp` and saw `No files found` for matches; broad impact. ([link](https://github.com/google-gemini/gemini-cli/pull/28975))
6. **#28983 — Detect mixed line endings instead of flagging CRLF on a single match (P2, closed)** — Repairs a too-eager CRLF classification that misreported normal files. ([link](https://github.com/google-gemini/gemini-cli/pull/28983))
7. **#29229 — Reject non-finite numbers in settings editor (size S, open)** — Closes #29226; stops `1e309`-style inputs from silently serializing to `null` and corrupting settings. ([link](https://github.com/google-gemini/gemini-cli/pull/29229))
8. **#29131/#29132 — Normalize line endings in diff context snippets (open, duplicate tracks)** — Prevents 100%-of-file diffs when comparing CRLF and LF files — a Windows-specific papercut fixed twice. ([PR #29131](https://github.com/google-gemini/gemini-cli/pull/29131), [PR #29132](https://github.com/google-gemini/gemini-cli/pull/29132))
9. **#29237 — Fix `list_background_processes` printing `(Exit Code: null)` for signal-killed processes (P3, open)** — Better diagnostic output when background processes are killed by signals. ([link](https://github.com/google-gemini/gemini-cli/pull/29237))
10. **#29134 — Protect current session from deletion (P2, open)** — Closes #29133; `--delete-session` no longer lets users accidentally delete the session they are currently in. ([link](https://github.com/google-gemini/gemini-cli/pull/29134))

## Feature Request Trends

- **AST-aware tooling** for surgical reads, search, and codebase mapping to cut wasted tokens (#22745, #22746, #19561).
- **Subagent observability & robustness** — trajectories via `/chat share` (#22598), bugreport subagent context (#21763), resilience & settings overrides (#22232, #22267).
- **Auto Memory hardening** — deterministic redaction (#26525), bounded retries (#26522), invalid-patch surfacing (#26523), consolidated tracking (#26516).
- **Sandbox & security** — zero-dep OS sandboxing (#19873), container settings isolation (#29216), EOL Node sandbox upgrade (#28973).
- **Task tracking modernization** — replacing in-context `WriteToDo` with persistent file-based CRUD (#18836) and a native-file task tracker experiment (#21000).
- **Agent self-awareness** — accurate CLI flag/hotkey knowledge (#21432), discouraging destructive `git reset --force` patterns (#22672).

## Developer Pain Points

- **Misleading termination signals** — both subagents (#22323) and the browser subagent (#21983) report `GOAL` even when they fail or hit `MAX_TURNS`, making debugging painful.
- **Agent hangs** — generalist agent delegation can hang for hours (#21409); shell commands get stuck in "Waiting input" after completion (#25166).
- **Auto Memory reliability** — a cluster of related bugs around redaction, retries, and invalid patches (#26516, #26522, #26523, #26525) suggests the system is functional but rough around edge cases.
- **Tool count ceilings** — large MCP / extension setups hit a 400-tool / 128-tool 400-error wall (#24246).
- **Line-ending churn** — recurring Windows/macOS pain with CRLF, mixed line endings, and full-file diffs (#22466, #28983, #29131, #29132).
- **Skills/subagent under-utilization** — users invest in custom skills and agents but the model rarely invokes them unless told (#21968).
- **Browser agent fragility** — Wayland failures (#21983), locked-profile handling (#22232), and ignored `settings.json` overrides (#22267).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-08

## 1. Today's Highlights

The Copilot CLI community surface today is dominated by **post-release regressions in v1.0.83** — Azure MCP `learn=true` timeouts (Issue #4749), MCP stdio connections being canceled on session resume (Issue #4753), and the desktop app 1.1.15 forcing users to archive every idle session before opening a new one (Issue #4756) are all clustered around the latest build. Meanwhile, the desktop app's session-management layer continues to surface painful state-machine bugs (permanently wedged sessions, no-op session deletes, single-active-Local-session restriction) and the ACP protocol is emerging as a recurring theme — three separate issues (#4555, #4743, #4740) describe concurrency, idle-signal, and lifecycle bugs unique to ACP mode. No new releases shipped in the last 24 hours.

## 2. Releases

_No new releases in the last 24 hours._

## 3. Hot Issues

| # | Issue | Why it matters |
|---|-------|----------------|
| [#1665](https://github.com/github/copilot-cli/issues/1665) | Support project/repository-scoped plugins (not just per-user) — **CLOSED** | The most-upvoted plugin-config request (👍18, 14 comments). Teams want plugins checked into the repo, not globally installed. |
| [#4756](https://github.com/github/copilot-cli/issues/4756) | Windows desktop app requires archiving every idle project session before creating a new Local session (👍6) | Painful UX regression on the freshly-shipped 1.1.15 desktop app that blocks normal multi-tasking on Windows. |
| [#4757](https://github.com/github/copilot-cli/issues/4757) | `--yolo` / `--allow-all` blocked for the whole session by fail-closed restriction on an account with **no managed policy** | Policy-engine false positive that permanently disables bypass mode even when no policy is configured — a security/permissions regression. |
| [#4742](https://github.com/github/copilot-cli/issues/4742) | Desktop app 1.1.15: cannot create a second Local session while one is running | "This project already has an active Local workspace" error actively breaks parallel-session workflows. |
| [#4753](https://github.com/github/copilot-cli/issues/4753) | v1.0.83: session resume cancels in-flight stdio MCP servers (~1s vs. ~16s previously) | **Confirmed regression** in MCP session resumption; stdio MCP servers become silently unavailable after resume. |
| [#4749](https://github.com/github/copilot-cli/issues/4749) | Azure MCP `learn=true` calls time out after 180s in 1.0.83-5 (worked in 1.0.80) | Another **regression on v1.0.83** — Azure-specific MCP hierarchical discovery goes from 0.2s to 180s timeout. |
| [#4755](https://github.com/github/copilot-cli/issues/4755) | Session permanently wedges when a queued-lane message lands at turn end | Process does not crash but accepts no further input and the queue never drains — only kill recovers. |
| [#4738](https://github.com/github/copilot-cli/issues/4738) | `ask_user` form: pressing Enter discards in-progress typed answer (data loss) | **High-severity data-loss bug** in elicitation forms; erodes trust in the form UI. |
| [#4750](https://github.com/github/copilot-cli/issues/4750) | Copilot TUI hogs CPU even when idle | Multi-CPU background load while idle on 1.0.83 — likely an event-loop or render-poll issue. |
| [#4555](https://github.com/github/copilot-cli/issues/4555) | ACP `session/prompt` unconditionally aborts session, cancelling background sub-agents | ACP behavior diverges from interactive TUI — agent builders lose running background tasks on each prompt. |

Honorable mention: [#1999](https://github.com/github/copilot-cli/issues/1999) (German keyboard `@` unusable — closed) and [#2644](https://github.com/github/copilot-cli/issues/2644) (Shift+Arrow / Ctrl+A selection) remain stubborn **internationalization and text-editing UX gaps**.

## 4. Key PR Progress

Only three PRs are currently open in the last 24h, all prototypes / docs:

- **[#4746](https://github.com/github/copilot-cli/pull/4746)** — *Add experimental next-action extension prototype* (by `anujb-msft`). Opt-in SDK extension example for model-inferred next actions; lives under `examples/next-best-action/` outside auto-discovery and does not modify the shipped CLI. Uses `joinSession()` with a no-tools UI.
- **[#4739](https://github.com/github/copilot-cli/pull/4739)** — *docs: propose terminal-owned macOS notifications* (by `anujb-msft`). Documents the macOS notification-click problem and ships an MIT-licensed terminal notification example with portable regression tests. **Reference proposal, not a CLI change.**
- **[#4748](https://github.com/github/copilot-cli/pull/4748)** — *Add joke cli* (by `tnk7899xd-create`). No description; likely a low-effort contribution not aligned with the project's direction.

## 5. Hot Discussions

_No discussion data was provided — this section is omitted._

## 6. Feature Request Trends

Across the 26 updated issues, the most-requested feature directions cluster around:

1. **Project-/repository-scoped configuration** — plugins (#1665), agents (#4752 — `--add-dir` agents not picked up by `--agent`, #4754 — session storage), and session tabs (#4693 — filter/scope by repo) all want the same thing: per-repo lifecycle for state that today is global-per-user or global-per-app.
2. **ACP protocol maturity** — three ACP-mode issues (#4555, #4743, and #4759 around MCP cancellation) point to a consistent ask: the ACP transport needs proper background-task awareness, observable idle signals, and standards-compliant MCP behavior.
3. **Standard text-editing / i18n in the TUI** — Shift+Arrow selection (#2644), German keyboard `@` (#1999), `ask_user` form Enter-handling (#4738) all converge on "the CLI input UX should match a normal terminal".
4. **Cancellation & lifecycle signals everywhere** — MCP cancellation (#4759), session wedge recovery (#4755), queue draining, and ACP idle signals (#4743) reflect demand for **proper async/cancel primitives** across the stack.
5. **Multi-repo / collection workspaces** — #4709 (worktree association when default branches differ) and #4693 (filter session list by repo) signal growing adoption of multi-repo projects that today's session model handles poorly.

## 7. Developer Pain Points

- **v1.0.83 release regressions are the loudest complaint of the day.** MCP `learn=true` timeouts (#4749) and MCP stdio cancel-on-resume (#4753) broke previously-working integrations; #4750 (CPU hog) and #4756/4742 (desktop session restrictions) suggest the 1.1.15 desktop update regressed alongside the CLI.
- **The desktop app's session-management layer is brittle.** Wedge on queued-lane message (#4755), no-op deletes (#4754), single-active-Local restriction (#4742), and mandatory idle-archive (#4756) all point to an in-memory session map that doesn't reconcile with `data.db` properly.
- **MCP integration friction is broad and recurring.** Auth (User-Agent header missing — #4681), transport (stdio cancel — #4753), cancellation signaling (#4759), and discovery latency (#4749) mean MCP authors are hitting walls at every layer.
- **The CLI input/edit layer is sub-terminal.** No Shift+Arrow selection (#2644), broken Alt-Gr (#1999), Enter-discards-form-input (#4738), and the long-running missing-VOICE-mode-pid-file deadlock (#4740) form a single consistent complaint: **the interactive surface needs polish parity with a normal shell**.
- **Policy/fail-closed posture is over-eager.** #4757 (--yolo blocked on accounts with no managed policy) shows the safety rails firing when nothing actually failed, trapping users into a degraded mode with no recovery path other than killing the session.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-08

## Today's Highlights
A wave of **OpenCode Go provider reliability issues** dominated the issue tracker (HTTP 429 outages, 403 Forbidden on specific models, missing `x-opencode-session` header), pointing to a partial degradation in the paid tier's routing layer. On the core side, two important **database/storage fixes** advanced — SQLite write-lock retries and event-snapshot compaction — alongside a security-hardening PR that **binds MCP OAuth refresh tokens to their issuing authorization server**.

## Releases
No new releases in the last 24 hours.

## Hot Issues

1. **[#47613](https://github.com/anomalyco/opencode/issues/47613)** — HTTP 429 outage on OpenCode Go (2026-09-06, multi-hour). The most-discussed thread of the day with **14 comments**; paying subscribers are requesting compensation. Signals a real outage on the Go endpoint `opencode.ai/zen/go/v1/messages`.

2. **[#47634](https://github.com/anomalyco/opencode/issues/47634)** — Console Go returns constant `rate_limit_exceeded` even with quota <60% used. Likely related to the same Go routing incident; UI auto-retries fail repeatedly, breaking flow for paying users.

3. **[#40343](https://github.com/anomalyco/opencode/issues/40343)** — OpenCode Go: some models return `403 Forbidden: {"model":"<model>"}` (👍 5). Reproducible against `mimo-v2.5` with active subscription; reproduces a class of "Forbidden" reports flooding the tracker (#47777, #47801).

4. **[#17798](https://github.com/anomalyco/opencode/issues/17798)** — Windows ignores `NODE_EXTRA_CA_CERTS` (👍 4). Blocks enterprise users behind TLS-inspecting proxies using internal PKI; a high-impact deployment blocker.

5. **[#40790](https://github.com/anomalyco/opencode/issues/40790)** — Anthropic cache bust bug causes **$14.82 wasted across 3 sessions** (22.5% bust rate). Production evidence the known cache invalidation issue (#24841) is still live; financially significant for Opus 5 users.

6. **[#47168](https://github.com/anomalyco/opencode/issues/47168)** — Unimplemented `commentary` channel in `gpt.txt` ends turns on chat-completions models. Root cause of intermittent assistant truncation; fix is on the way via PR #47355.

7. **[#47545](https://github.com/anomalyco/opencode/issues/47545)** — Auto mode triggers repeated false permission notifications in terminals. Auto-approval happens client-side after the server already emitted a permission request — UX bug, not a security bug.

8. **[#31737](https://github.com/anomalyco/opencode/issues/31737)** — TUI: pasting images via `Ctrl+V` has no effect (👍 2). Long-standing friction for screenshot-driven workflows.

9. **[#47614](https://github.com/anomalyco/opencode/issues/47614)** — Weekly usage quota stuck at 100% after monthly cycle renewal. Billing/quota state bug blocking legitimate usage.

10. **[#17044](https://github.com/anomalyco/opencode/issues/17044)** — Updates install into `%LOCALAPPDATA%` regardless of actual install path (CLOSED, 7 comments). Long-standing Windows portability issue resolved.

> Honorable mentions: [#47778](https://github.com/anomalyco/opencode/issues/47778) (`gpt-5.6-luna` persistent HTTP 500), [#12436](https://github.com/anomalyco/opencode/issues/12436) (OpenRouter "No cookie auth credentials found" — closed).

## Key PR Progress

1. **[#47510](https://github.com/anomalyco/opencode/pull/47510)** — **Compact superseded durable event snapshots**. Closes #47223 and addresses 5 related issues; bounds the unbounded `event` table growth that long-running sessions hit.

2. **[#47567](https://github.com/anomalyco/opencode/pull/47567)** — **Retry SQLite statements on lock timeout**. Prevents `database is locked` from being treated as fatal when multiple opencode processes share a DB.

3. **[#47814](https://github.com/anomalyco/opencode/pull/47814)** — **Bind MCP OAuth refresh tokens to their issuing authorization server**. Follow-up to #47743; mirrors Codex's `validate_refresh_token_issuer` to prevent refresh-token mix-up attacks.

4. **[#47795](https://github.com/anomalyco/opencode/pull/47795)** — **Turn diff route** (`GET /api/session/:id/diff`). New `session.diff` API returning `FileDiff.Info[]` for a turn, computed on demand — no new persistence. Useful foundation for review/UI features.

5. **[#47355](https://github.com/anomalyco/opencode/pull/47355)** — **Omit channel prompt for chat models**. Closes #47168; removes the `commentary` prompt that was terminating turns on chat-completions providers.

6. **[#47818](https://github.com/anomalyco/opencode/pull/47818)** — **Preserve remote launch directories in CLI**. Fixes `opencode2 <dir> --server <url>` for paths that only exist on the remote.

7. **[#47805](https://github.com/anomalyco/opencode/pull/47805)** — **Surface actionable quota errors in ACP**. Stops hours-long silent quota retries when `OPENCODE_CLIENT=acp`; closes #47804.

8. **[#47816](https://github.com/anomalyco/opencode/pull/47816)** — **Move daily date out of the cached system prompt**. Closes #29672; improves prompt-cache hit rate by removing the time-sensitive date from the cached prefix.

9. **[#46611](https://github.com/anomalyco/opencode/pull/46611)** — **Granular `webfetch` permissions with URL patterns**. Closes #35565; aligns `webfetch` with object-rule authorization while keeping `websearch` as a simple allow/deny.

10. **[#44558](https://github.com/anomalyco/opencode/pull/44558)** — **Serialize database init/migrations across processes**. Reproduced a 5/6-process "database is locked" race; enables WAL before `busy_timeout` in both drivers.

> Also landed (closed): [#47743](https://github.com/anomalyco/opencode/pull/47743) (MCP CIMD client metadata doc), [#47806](https://github.com/anomalyco/opencode/pull/47806) (retry transient provider compaction failures), [#47808](https://github.com/anomalyco/opencode/pull/47808) (merge `model.request.headers` into SDK options), [#29102](https://github.com/anomalyco/opencode/pull/29102) (follow symlinks in `@file` scan).

## Feature Request Trends

- **Better error messaging & quota UX** — auto-router should name the model it tried (#47794), ACP must surface quota errors instead of stalling (#47804/#47805).
- **Localization** — Persian (`fa`) README translation requested (#47775); signals global user growth beyond EN/ZH.
- **Desktop App UX** — configurable startup behavior (new session vs. resume last vs. landing) (#47807).
- **Image paste** — TUI Ctrl+V and VSCode extension both fail silently (#31737, #47762).
- **Granular permissions** — URL-pattern `webfetch` rules (#35565, #46611).
- **Session lifecycle CLI** — `session list` / `session delete` (restored from dev branch via #47812).
- **Terminal-native progress indicators** — ConEmu/WT spinner integration (#24807).

## Developer Pain Points

- **OpenCode Go provider instability** — the single largest source of friction this week: 429 storms (#47613, #47634), 403 Forbidden on specific models (#40343, #47777, #47801), and routing failures from a missing `x-opencode-session` header (#47763, #47755, #47756).
- **Financial waste from caching bugs** — the Anthropic cache-bust issue is costing real money (#40790, $14.82 / 3 sessions); Opus 5 users want a fix.
- **Windows-specific rough edges** — `NODE_EXTRA_CA_CERTS` ignored (#17798), updates writing to `%LOCALAPPDATA%` instead of install path (#17044), image paste broken (#47762).
- **ACP error transparency** — actionable provider/quota errors swallowed, leaving clients to hang or time out (#47804, #47805).
- **Quota/billing state bugs** — weekly quota not resetting after monthly renewal (#47614), persistent 500s on specific models (#47778).
- **Auto mode false permission pings** — server emits requests that auto-approval then immediately resolves, creating noise (#47545).
- **TUI parity gaps** — image paste (#31737), prompt/channel mismatches breaking chat-completions providers (#47168).

*Compiled from 50 issues and 50 PRs updated in the last 24 hours.*

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-08

## Today's Highlights

Provider integration fragility dominates the day's activity: a cluster of issues emerged around the newly-required `x-opencode-session` header for OpenCode Go (#9230, #9237, #9290), and Copilot's `gpt-6-astra` model was found misrouted to `/chat/completions` (already fixed via #9253). On the architecture side, mitsuhiko pushed the first two layers of a substantial split from #8998, introducing mid-conversation system messages (#9116) and wiring prompt/tool changes as system message deltas (#9117) — a foundational shift in how the coding agent composes its request payload.

## Releases

_No new releases in the last 24 hours._

## Hot Issues

1. **[#4945 — openai-codex Connection Reliability Issues](https://github.com/earendil-works/pi/issues/4945)** (OPEN, in progress, 77 comments, 👍 32)
   The longest-running and most-upvoted thread of the day: `openai-codex`/`gpt-5.5` intermittently leaves the TUI stuck on `Working...` with no streamed output and no visible error, recoverable only via Escape. Marked in-progress.

2. **[#7547 — How do you use Pi on Windows? What issues are you seeing?](https://github.com/earendil-works/pi/issues/7547)** (OPEN, 57 comments)
   A meta-issue aimed at consolidating the fragmented Windows usage story. Petertroll is seeking signal on which run modes (native, WSL, container) deserve first-class fixes vs. which should be delegated to extensions.

3. **[#5886 — AgentSession settlement/continuation and assistant-tail lifecycle bugs](https://github.com/earendil-works/pi/issues/5886)** (OPEN, 11 comments, 👍 4)
   Filed by mitsuhiko as a meta-issue for a recurring class of bugs where post-run logic tries to continue an agent from a transcript that is no longer the active branch. Likely to drive coordinated fixes in the agent loop.

4. **[#9052 — Fullscreen mode wheel scrolling is 3× slower than regular mode](https://github.com/earendil-works/pi/issues/9052)** (OPEN, 6 comments, 👍 3)
   Fullscreen mode's fixed input box is praised, but wheel scrolling regresses ~3× vs. regular mode. Signals that fullscreen is gaining real adoption despite UX rough edges.

5. **[#8760 — OpenRouter `:free` models fail with 400: Pi sends `max_tokens` above provider limit](https://github.com/earendil-works/pi/issues/8760)** (OPEN, 5 comments)
   Multiple OpenRouter `:free` models are blocked because Pi forwards the catalog `maxOutputTokens` value, exceeding the upstream provider cap. A clean, narrow bug with a likely trivial fix.

6. **[#8643 — Bedrock: OpenAI models reject images nested in `toolResult.content`](https://github.com/earendil-works/pi/issues/8643)** (OPEN, 5 comments, 👍 1)
   Author already has a fix + regression test on a fork (previously blocked by the contribution gate). Highlights Bedrock's stricter tool-result shape relative to first-party OpenAI.

7. **[#9230 — OpenCode Go provider does not send the required `x-opencode-session` header](https://github.com/earendil-works/pi/issues/9230)** (CLOSED, 3 comments, 👍 1)
   OpenCode Go started requiring a stable per-conversation id on 2026-09-06. This triggered the cluster around #9237 and #9290, including the `pi-opencode-bridge` npm package and the `modelRegistry.complete()` extension path.

8. **[#8826 — Cap agent retry backoff for prolonged transient outages](https://github.com/earendil-works/pi/issues/8826)** (OPEN, 4 comments)
   During extended upstream failures (e.g. `503 upstream call failed: Connect: Too many open files`), unbounded exponential backoff leaves Pi effectively idle. Proposal: a configurable cap so retries settle at a bounded interval.

9. **[#7739 — Set a startup-time budget targeting jcode-comparable latency and memory](https://github.com/earendil-works/pi/issues/7739)** (OPEN, 3 comments)
   Targets the gap measured by jcode's README benchmark against Pi 0.62.0 on median PTY-launch latency and RSS. Establishes a regression-grade performance budget.

10. **[#9016 — Enable `reasoning_effort` for the built-in `llama.cpp` provider](https://github.com/earendil-works/pi/issues/9016)** (OPEN, 2 comments)
    `llama.cpp` added `reasoning_effort` via its OpenAI-compatible API in July 2026 (PR #26045); the Pi provider was created before that feature landed. A small, well-scoped feature request.

## Key PR Progress

1. **[#9117 — Deliver prompt and tool changes as system message deltas](https://github.com/earendil-works/pi/pull/9117)** (OPEN)
   Second layer of the #8998 split. Moves coding-agent prompt/tool loadout changes onto system message deltas instead of rewriting the top-level system prompt — better context-cache locality across turns.

2. **[#9116 — Add mid-conversation system messages](https://github.com/earendil-works/pi/pull/9116)** (OPEN)
   Foundation for the above: adds the new role to pi-ai and threads it through pi-agent-core so the coding agent integration can land cleanly without breakage.

3. **[#9280 — Add implementation-backed documentation evals](https://github.com/earendil-works/pi/pull/9280)** (OPEN)
   Generates one implementation audit per Markdown page cataloged by `docs/index.md`, validates catalog coverage deterministically, and captures schema-validated verdicts through a terminating custom tool. A substantive step toward doc/code drift detection.

4. **[#9253 — Route Copilot GPT models through Responses (fixes astra)](https://github.com/earendil-works/pi/pull/9253)** (CLOSED)
   Resolves #9209: built-in Copilot models now go through the Responses endpoint. Notes that the change is safe because Copilot's catalog no longer lists gpt-4 class models in relevant positions.

5. **[#9272 — Allow extensions to stream from custom providers](https://github.com/earendil-works/pi/pull/9272)** (CLOSED, fixes #8964)
   Exposes `stream(...)` and `streamSimple(...)` alongside `complete(...)`, closing a long-standing API asymmetry for extension authors.

6. **[#9269 — End agentLoop stream with error result on loop rejection](https://github.com/earendil-works/pi/pull/9269)** (CLOSED)
   `agentLoop()`/`agentLoopContinue()` were launching the loop via `void runAgentLoop(...).then(...)` with no rejection handler — unhandled rejections from `streamFn`, OAuth refresh failures, or context transforms were silently dropped. Now properly surfaces them as `stopReason: "error"`.

7. **[#9270 — Stop `wordWrapLine` infinite recursion on unsplittable wide graphemes](https://github.com/earendil-works/pi/pull/9270)** (CLOSED)
   A single wide atomic grapheme (e.g. CJK/emoji, width 2) combined with `maxWidth: 1` caused unbounded recursion. Clean fix with a regression test.

8. **[#9155 — Reject prompts during tree navigation](https://github.com/earendil-works/pi/pull/9155)** (OPEN, in progress)
   Adds an explicit rejection for direct `AgentSession.prompt()` calls during active tree navigation, mirroring the existing `isCompacting` guard for the TUI.

9. **[#9179 — Reject tree navigation during compaction](https://github.com/earendil-works/pi/pull/9179)** (CLOSED, in progress)
   The companion race: rejects tree navigation while compaction is active, and retains the compaction summary on the branch from which it was prepared.

10. **[#9259 — Apply a steering message promptly by interrupting the running turn](https://github.com/earendil-works/pi/pull/9259)** (CLOSED)
    Currently steering messages are queued and only applied after the in-progress turn finishes — painful during long tool calls. This interrupts the running turn to deliver steering promptly.

## Feature Request Trends

- **Mid-conversation system messages**: The #9116/#9117 pair establishes this as the new substrate for prompt/tool deltas, extension-injected reminders, and steering — expect extension authors to start relying on it.
- **Provider parity for `reasoning_effort`**: llama.cpp (#9016) joins the list of providers needing per-request reasoning knobs; the trend suggests a unified provider-level knob is overdue.
- **Multi-model pricing for routers** (#9291): As routing services (cost/latency optimization) proliferate, users want per-model `cost` entries on a single configured model.
- **Configurable startup display sections** (#9289): Power users with large model registries want fine-grained control over what the startup screen surfaces.
- **Better Windows DX** (#7547): Continued demand for first-class native Windows support and clearer documentation of supported run modes.
- **Device-code UX** (#9282): Letting providers opt into opening the verification page and copying the user code on a best-effort basis.

## Developer Pain Points

- **Provider integration drift**: OpenCode Go's new session-header requirement (#9230/#9237/#9290) and Copilot's Responses-only `gpt-6-astra` (#9209/#9277) both landed within 24 hours — providers are tightening API contracts faster than Pi's provider catalog can absorb them.
- **`max_tokens`/`maxOutputTokens` mismatches** (#8760): Catalog values are forwarded verbatim and exceed real provider caps, especially on `:free` tiers.
- **Stream cancellation is unreliable** (#8823, #4945): Esc frequently doesn't actually cancel the in-flight request, leaving users pressing it repeatedly during outages.
- **TUI image rendering regressions** (#9052, #9169, #9256, #9268): Fullscreen scroll speed, fullscreen image rendering, resumed-session image re-rendering, and empty-alt markdown images are all open — image handling in the TUI feels like a patchwork.
- **Agent session lifecycle** (#5886, #9269, #9155, #9179): Multiple bugs cluster around continuation, settlement, and concurrent state mutations; the recent PRs suggest this is an active cleanup area.
- **Streaming performance** (#9063): Three adapters re-parse the entire accumulated tool-call args on every delta — O(n²) on long tool outputs.
- **SDK ergonomics for embeds** (#9286): `import 'pi'` still evaluates CLI `main`, and the esbuild native binary is a hard install even for users only calling `createAgentSession` / `@earendil-works/chord/context`.
- **Cross-repo reference rot** (#9278, closed): Long-lived references to `earendil-works/pi-mono` needed a global sweep to `earendil-works/pi`.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-08

## Today's Highlights

The 0.23 line continues to evolve with a fresh preview (`v0.23.1-preview.2`) and nightly (`v0.23.0-nightly.20260906.92a8a8d179`), both centered on Web Shell's new dynamic workflow visualization and a derived session-workflow projection. A parallel `cua-driver-rs v0.20.4` ships signed/universal CUA driver binaries for macOS, Linux, and Windows. On the bug front, two P1 issues demand attention: a wedged daemon session that silently drops background-shell output (#11119), and a Windows-only ConPTY process leak in the VS Code Companion that can balloon to ~2.8 GB after half a day (#11303).

## Releases

- **[v0.23.1-preview.2](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.1-preview.2)** — Adds visualization/management for dynamic workflow runs in Web Shell (#10594) and derives the session-workflow project.
- **[v0.23.0-nightly.20260906.92a8a8d179](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.0-nightly.20260906.92a8a8d179)** — Same Web Shell workflow improvements over the nightly train.
- **[cua-driver-rs v0.20.4](https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.20.4)** — Vendored CUA driver prebuilts: macOS universal (codesigned + notarized `.app`), Linux x86_64/arm64 (glibc 2.31+), Windows x86_64/arm64 (UIAccess worker + native SDK).

## Hot Issues

1. **[#8662 — Migrate TUI from ink to OpenTUI (tracking)](https://github.com/QwenLM/qwen-code/issues/8662)** (31 comments, P3, OPEN) — Long-running tracking issue for moving off the heavily patched `ink 7 + React 19` renderer; structural flicker, resize, and focus bugs make ink effectively a dead end. The community clearly wants this migration prioritized.
2. **[#44 — 百炼收费陷阱 (billing complaint)](https://github.com/QwenLM/qwen-code/issues/44)** (20 comments, CLOSED) — High-traffic user complaint about per-question billing on Bailian. Closed after feedback, but illustrates ongoing cost-transparency concerns.
3. **[#11119 — Background shell output silently dropped when session runtime recycles](https://github.com/QwenLM/qwen-code/issues/11119)** (8 comments, P1, OPEN) — Daemon-hosted `qwen serve` Web Shell loses background-shell output and wake notifications after a turn ends; the session wedges unrecoverably. Critical for any long-running CI/automation use case.
4. **[#11303 — Windows qwen-cli leaks 347 headless conhost.exe processes](https://github.com/QwenLM/qwen-code/issues/11303)** (6 comments, P1, OPEN) — VS Code Companion ConPTY process leak eats ~2.8 GB after 12 h. High-impact on Windows power users.
5. **[#10530 — "400 Failed to initialize samplers" in 0.22.3](https://github.com/QwenLM/qwen-code/issues/10530)** (6 comments, P2, OPEN) — Regression introduced in 0.22.3 breaks llama-server with Qwen 3.x 27b/35b models; companion to #10435. Local-inference users are blocked.
6. **[#3361 — Agent misinterprets shell output as empty](https://github.com/QwenLM/qwen-code/issues/3361)** (6 comments, OPEN) — Long-standing (Apr 2026) OpenAI-compatible-API bug where successful commands are treated as empty. Affects agent reliability.
7. **[#8586 — Track activeWork and background Agent recovery](https://github.com/QwenLM/qwen-code/issues/8586)** (9 comments, P2, OPEN) — Feature request to expose `activeWork` in daemon health and build a proper recovery path for background Agents that outlive their foreground prompt.
8. **[#10865 — Session workflow projection derived 3× per render](https://github.com/QwenLM/qwen-code/issues/10865)** (5 comments, P2, OPEN) — Follow-up to #8583; performance bug in the new Web Shell cockpit. Matters because the same projection is rebuilt on every render even though it's designed to be built once.
9. **[#10684 — First-class self-hosted semantic memory](https://github.com/QwenLM/qwen-code/issues/10684)** (4 comments, P3, OPEN) — Asks for either a bundled memory MCP server template or embedding-based recall in auto-memory. Strong signal for semantic (not just keyword) recall.
10. **[#11272 — Cancelling a long-running stdio MCP call kills the server permanently](https://github.com/QwenLM/qwen-code/issues/11272)** (3 comments, P2, OPEN) — Reported from a DingTalk Channel deployment; in Channel mode the MCP server never comes back after a card-cancel. Production-grade concern for channel integrators.

## Key PR Progress

1. **[#11314 — feat(serve): `--api-profile` + OpenAPI contract for REST integrators](https://github.com/QwenLM/qwen-code/pull/11314)** — Adds an `--api-profile` flag and a stable OpenAPI surface so external teams can build on Qwen Code over HTTP without Web Shell.
2. **[#10942 — feat(cli): list managed Agent View sessions in `qwen sessions ps`](https://github.com/QwenLM/qwen-code/pull/10942)** — Surfaces richer Agent View lifecycle state in the CLI alongside the existing interactive sessions.
3. **[#11308 — fix(channels): restore worktree-task routes through managed load path](https://github.com/QwenLM/qwen-code/pull/11308)** — Cold-start session restoration in channel workers now re-attaches worktree-task routes via workspace-root + daemon worktree attestation, not the generic path.
4. **[#9466 — refactor: anchor rewind mapping to stable prompt identity](https://github.com/QwenLM/qwen-code/pull/9466)** — Rewind resolves targets by persisted prompt identity, surviving resume/headless/session chains that renumber turns.
5. **[#11086 — feat(serve): scope extensions to workspace runtimes](https://github.com/QwenLM/qwen-code/pull/11086)** — Global extension catalog becomes available through each workspace's selected runtime; updates composer add menu and `@` mentions.
6. **[#11083 — fix(serve): read channel settings from user scope when workspace is home](https://github.com/QwenLM/qwen-code/pull/11083)** — Fixes invisible channel config when `qwen serve` is bound to `$HOME`; resolves one settings scope for reads and writes.
7. **[#11305 — feat(goal): size checkpoint verifier timeout to claim list + operator setting](https://github.com/QwenLM/qwen-code/pull/11305)** — Bumps verifier ceiling from 30 s → 180 s and adds `model.goalCheckpointTimeoutSeconds`.
8. **[#11304 — fix(goal): count a checkpoint the verifier never answers as a stall](https://github.com/QwenLM/qwen-code/pull/11304)** — Overflowing evidence windows now count toward the stall limit, not just max-claim verifiers.
9. **[#11277 — feat(ipc): meter inbound peer messages, drop with a `dropped` outcome](https://github.com/QwenLM/qwen-code/pull/11277)** — Adds a fourth IPC outcome plus per-sender and global rate gates; sender is notified once.
10. **[#10449 — perf(dev): opt-in pnpm worktree bootstrap foundation](https://github.com/QwenLM/qwen-code/pull/10449)** — Frozen pnpm dependency bootstrap for additional worktrees while preserving all npm build/CI/publishing paths.

(Other notable PRs: [#11070](https://github.com/QwenLM/qwen-code/pull/11070) preserves ACP approval mode across cold resume; [#11309](https://github.com/QwenLM/qwen-code/pull/11309) reaps owned worktrees on session delete; [#11169](https://github.com/QwenLM/qwen-code/pull/11169) closes trust-gate/bystander gaps in the local-files bridge; [#10347](https://github.com/QwenLM/qwen-code/pull/10347) auto-retries transient network EOF errors in channel flows.)

## Feature Request Trends

- **Semantic, structured memory** — Strong interest in moving beyond the keyword-based `MEMORY.md` index to embedding-based recall, with bundled MCP server templates or first-class embedding hooks (#10684).
- **Stable HTTP/REST surface** — External integrators want a documented, stable OpenAPI contract and a profile flag so they don't have to crawl ~110 routes (#11314).
- **Better cost / session transparency** — `customHeaders` with `${session_id}` template (#10995), proper `/effort` propagation to OpenAI-compatible backends (#11227), and clearer Bailian/per-question billing context (#44) all share the same theme: users want their model-router state to be visible and configurable end-to-end.
- **Session navigation & recovery** — Codex-style session-wide turn navigation (#10750, just closed) and explicit `activeWork`/background Agent recovery (#8586) show users expect long-running sessions to behave like durable workspaces, not disposable prompts.
- **Worktree-as-first-class** — Restoration via managed load path (#11308), worktree reap on session delete (#11309), and pnpm worktree bootstrap (#10449) indicate worktrees are becoming a core unit of session identity, not a side feature.

## Developer Pain Points

- **Local-inference regressions** — Two near-duplicate reports (#10530, #10435) of `400 Failed to initialize samplers: failed to parse grammar` introduced in 0.22.3 block llama-server users; other harnesses are unaffected, which points to a Qwen-Code-specific grammar/template regression.
- **TUI substrate rot** — The OpenTUI migration tracking issue (#8662) sits at 31 comments and the community consensus is that the patched `ink` layer is no longer fixable in place; CI failures on the "OpenTUI renderer (bun)" E2E shard (#11219, #11210, #11203, #11197, #11183) suggest the migration is non-trivial.
- **Daemon session reliability** — Background-shell output silently dropped (#11119), sessions running cron/goal/monitor work that can't be reclaimed (#11118, closed), MCP servers killed by cancel and never recovered in Channel mode (#11272), and ownership gaps when workspace == $HOME (#11186) form a single cluster of "the daemon's session lifecycle isn't fully coherent yet."
- **Windows-specific pain** — ConPTY process leak in the VS Code Companion (#11303) is severe, and Windows CI is brittle enough to need a retry-after-shard-death band-aid (#11134).
- **Agent correctness on shell output** — Misinterpreting successful shell output as empty (#3361) keeps recurring across OpenAI-compatible backends, eroding trust in agentic actions.
- **CI / E2E flake** — A stack of auto-generated "Main CI failed on commit …" issues (#11307, #11040, #11249, #11231, #11219, #11210, #11203, #11197, #11183) — several closed quickly — indicates the autofix pipeline is working but the underlying test shards are still racing or unstable, particularly around the OpenTUI renderer and macOS shard 2/2.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*