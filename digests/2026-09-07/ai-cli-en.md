# AI CLI Tools Community Digest 2026-09-07

> Generated: 2026-09-07 13:28 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report: AI CLI Ecosystem — 2026-09-07

## 1. Ecosystem Overview

The AI CLI landscape has matured into two tiers: first-party vendor agents (Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI) competing on ecosystem depth, and independent clients (OpenCode, Pi, Qwen Code) competing on provider agility and architecture. Feature surface has largely converged — subagents, MCP support, sandboxing, hooks/plugins — so competition has shifted to reliability, cost transparency, and platform parity. Today's digests are dominated not by new capabilities but by regression clusters (Windows desktop, release-train breakage), capacity/rate-limit events across GPT-5/6 tiers, and paid-tier availability incidents (OpenCode Go 429 outage with compensation requests). Extensibility architecture (hooks, extension APIs, approval middleware) is where the most consequential engineering is happening.

## 2. Activity Comparison

| Tool | Issues (surfaced) | PRs (surfaced) | Discussions (surfaced) | Release (24h) |
|---|---|---|---|---|
| Claude Code | 10 | ~25 (10 key + 15+ merged batch) | N/A* | None |
| OpenAI Codex | 10 | ~18 (10 key + 8 related) | 7 | None |
| Gemini CLI | 14 (10 + 4 notable) | 14 (10 + 4) | N/A* | v0.60.0 nightly |
| Copilot CLI | 16 (10 + 6 tracked) | 3 | N/A (none returned in source) | None |
| OpenCode | 10 | 12 | N/A* | Not reported |
| Pi | 10 | 11 | 1 | None |
| Qwen Code | 10 | 11 | N/A* | 3 (v0.23.1-preview.2, cua-driver-rs 0.20.4, nightly) |

\* Digest did not surface a Discussions section; not reported as zero activity. Counts reflect curated top-N highlights, not exhaustive daily totals. No repo in this set has Issues/PRs disabled; Copilot CLI explicitly returned no Discussions for the period.

## 3. Shared Feature Directions

- **Windows/WSL parity — all seven tools.** The single most universal pain: Claude Code AppX/MSIX lockouts (#53247, #91763), Codex WSL bootstrap failure (#41463) and rollout corruption (#41566), Gemini CRLF/symlink fixes (#28975, #28983, #29132), Copilot session regressions (#4742, #4756), OpenCode cert/port issues (#17798, #41746), Pi's 57-comment triage megathread (#7547), Qwen's 347-process `conhost.exe` leak (#11303).
- **MCP as first-class integration surface — all seven.** Codex is extending protocol depth (auth-change notifications #43428, user-verification transport #43452); Copilot CLI and Qwen are fixing lifecycle regressions (#4753, #11272); OpenCode and Gemini are fixing exposure/registration gaps (#33027, #24246, #28971).
- **Undo/rewind and session recovery — 5 tools.** Codex's #9618 (119 👍, its top community ask) frames rewind as table stakes vs. Claude Code and OpenCode; Pi tracks a whole class of continuation bugs (#5886); Qwen preserves branch commits on hook failure (#11300); OpenCode adds last-turn diff review (#47795).
- **Cost/quota/capacity visibility — 5 tools.** Invisible Fable limits (Claude #92080), GPT-5/6 capacity events (Codex #43398, #43375), OpenCode Go 429 outage + Auto Router opacity (#47613, #47794), Bailian billing complaints (Qwen #44), provider-reported cost (Pi #6881). Third-party dashboards (CodexFuse) are filling the vendor gap.
- **Approval/permission middleware — 5 tools.** Codex consolidated its Guardian subsystem across 20+ PRs; OpenCode moved auto-permission server-side (#47754) and added plugin permission assertions (#46530); Copilot's ACP auto-approval regression (#4537) shows the same problem in reverse; Claude's Function Hooks (#91870) would formalize the pattern; Gemini faces destructive-command concerns (#22672).
- **Persistent memory & compaction — 4 tools.** Claude #91913, Gemini's Auto Memory workstream (#26516–#26525), Qwen's semantic memory proposal (#10684), OpenCode's compaction trilogy (#47322–#47324).

## 4. Differentiation Analysis

- **Claude Code** — Plugin-runtime depth is the strategic bet (Function Hooks, skills, marketplace). Largest issue volume and engagement, but Windows desktop quality is dragging the brand, and prompt-injection concerns (#80818) are trust-level risks.
- **OpenAI Codex** — Unique investment in safety middleware (Guardian V2 consolidation) and enterprise governance (signed work orders, #37637/#37611). Novel bets: desktop pets/overlay UI and iOS remote control — both currently regression-prone. Missing rewind is its biggest competitive gap.
- **Gemini CLI** — Token frugality as architecture: AST-aware reads (#22745) and model-first bash execution (#19873) attack per-turn context cost rather than wrapping tools. Automated nightly cadence signals strong CI discipline.
- **Copilot CLI** — Focus on protocol correctness for editor integration (ACP idle/permission signals) and a nascent extension SDK (#4746). Core is closed-source; the public repo functions as a triage channel, with only 3 PRs surfaced (one a sample/joke).
- **OpenCode** — Multi-provider broker positioning; pain concentrates in its paid Go backend rather than the client. Strong server/client split, plugin API push, and i18n (Farsi README).
- **Pi** — Transport resilience engineering (fallback provider chains, DNS pinning, retry caps) and extension-contract formalization. Small but expert user base; fastest fix latency of the set.
- **Qwen Code** — Most differentiated architecture: daemon orchestration (`qwen serve`), Web Shell workflow visualization, DingTalk channel integration, and a CUA (computer-use) driver. Strong China-ecosystem alignment; undergoing ink→OpenTUI renderer migration.

## 5. Community Momentum & Maturity

- **Volume leaders:** Claude Code (126 comments/197 👍 on a single issue) and Codex (119 👍 discussion; 20+ merged PRs in one batch) — the largest user bases and heaviest internal engineering throughput.
- **Fastest iteration:** Gemini CLI (nightly releases), Qwen Code (preview + driver + nightly in one day), OpenCode (12+ PRs including core refactors).
- **Copilot CLI** shows high issue inflow but minimal public PR throughput — consistent with a closed-source core — and its 1.1.15/1.0.83 regression cluster (5+ issues in 48h) suggests a release-QA gap.
- **Pi** is the smallest community but the most responsive: today's top bugs (Esc-cancel, Copilot routing, DNS) already have merged fixes; contributions from recognized practitioners (mitsuhiko) raise signal quality.
- **Maturity paradox:** the worst regressions cluster on the most mature releases (Copilot 1.0.83, Claude Desktop v2.1.x), while pre-1.0 tools (Gemini 0.60, Qwen 0.23) churn features with fewer user-facing breakages per release.

## 6. Trend Signals

1. **Extensibility is consolidating on middleware-style hooks** — Claude #91870, Pi's extension API, OpenCode's permission assertions, and Codex's extension decision API are converging on the same shape: intercept, decide, audit side effects.
2. **Approval/safety is becoming a dedicated subsystem**, not a prompt-level concern — Codex's Guardian consolidation is the clearest example; expect this pattern to propagate.
3. **Agent rewind is table stakes.** Codex's #1 community ask (119 👍) exists only because competitors already ship it.
4. **Observability gaps spawn third-party ecosystems** (CodexFuse, Blume.codes) — cost/quota APIs are an unmet vendor opportunity.
5. **Model capacity volatility is driving client-side resilience** — provider fallback chains (Pi), bounded auto-retry (Qwen #10347), and multi-provider routing are becoming hedges against single-vendor outages like today's GPT-5/6 event.
6. **Protocol migration pressure:** `chat/completions` → `responses` is actively breaking clients (Codex #7782, Pi #9253) — providers building on OpenAI-compatible surfaces should plan for this churn.
7. **Terminal UI frameworks are consolidating** around OpenTUI (Qwen's migration, OpenCode's stack) as the post-Ink default.
8. **Background/headless agents are the next frontier** — daemon workloads (Qwen `serve`), ACP idle signals (Copilot), and "Keep Waiting" auto-accept (Codex #32139) all target unattended operation.
9. **Windows remains the largest underserved reliability surface** across all seven communities — a concrete opportunity for whichever vendor treats it as first-class first.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
*Data as of 2026-09-07 | anthropics/skills repository*

---

## 1. Top Skills Ranking

The following PRs drew the most community attention. All remain **OPEN** pending review.

### 1.1 `skill-creator` Recall Bug Fix — PR #1298
**Author:** MartinCajiao | [anthropics/skills#1298](https://github.com/anthropics/skills/pull/1298)
Critical infrastructure fix: `run_eval.py` reports `recall=0%` for every skill description (10+ reproductions). Since `run_loop.py` and `improve_description.py` rely on this signal, the entire description-optimization loop is currently tuning against noise. Also addresses Windows stream reading, trigger detection, and parallel worker bugs. **Status: OPEN.** This PR addresses Issue #556.

### 1.2 `document-typography` — PR #514
**Author:** PGTBoos | [anthropics/skills#514](https://github.com/anthropics/skills/pull/514)
A quality-control skill that prevents common typographic defects in AI-generated documents: orphan word wrap (1–6 words spilling onto the next line), widow section headers, and numbering misalignment. Targets a defect that affects every document Claude generates. **Status: OPEN.**

### 1.3 `scnet-hpc` — PR #1615
**Author:** lql341 | [anthropics/skills#1615](https://github.com/anthropics/skills/pull/1615)
A skill for operating SCNet HPC clusters via profile-based SSH and Slurm workflows. Covers partition/memory/module/accelerator guidance, cluster discovery, and compute-node diagnostics. Represents the growing domain-specific workflow niche. **Status: OPEN.**

### 1.4 `ODT` (OpenDocument Format) — PR #486
**Author:** GitHubNewbie0 | [anthropics/skills#486](https://github.com/anthropics/skills/pull/486)
Adds native support for OpenDocument (.odt/.ods/ODF) creation, template filling, and ODT→HTML conversion. Triggers on mentions of "ODT", "OpenDocument", "LibreOffice", etc. Addresses the long-standing gap for ISO-standard, open-source office formats alongside the existing DOCX/PDF skills. **Status: OPEN.**

### 1.5 `frontend-design` Clarity Improvements — PR #210
**Author:** justinwetch | [anthropics/skills#210](https://github.com/anthropics/skills/pull/210)
Revises the `frontend-design` skill so every instruction is executable within a single conversation. Improves internal coherence and behavioral specificity without over-constraining Claude. **Status: OPEN.**

### 1.6 `skill-quality-analyzer` & `skill-security-analyzer` — PR #83
**Author:** eovidiu | [anthropics/skills#83](https://github.com/anthropics/skills/pull/83)
Two meta-skills added to `example-skills`. The first evaluates skills across five dimensions (structure, documentation, examples, resources, best practices). The second scans skills for security risks. Directly addresses two of the community's loudest concerns (security trust boundaries — Issue #492; quality assessment gaps). **Status: OPEN.**

### 1.7 `testing-patterns` — PR #723
**Author:** 4444J99 | [anthropics/skills#723](https://github.com/anthropics/skills/pull/723)
A comprehensive testing skill covering the Testing Trophy model, AAA pattern, React component testing (Testing Library), pure-function edge cases, and what *not* to test. **Status: OPEN.**

### 1.8 `Hivemind` Multi-Agent Orchestration — PR #1628
**Author:** Hanishchow | [anthropics/skills#1628](https://github.com/anthropics/skills/pull/1628)
Lets Claude Code delegate mechanical tasks to headless opencode workers on free models while remaining the sole planner/reviewer/merger. Targets the scarce-resource bottleneck of expensive-model context. Reflects strong community interest in zero-cost multi-agent orchestration. **Status: OPEN.**

---

## 2. Community Demand Trends

Distilled from the top Issues by comment volume:

### 2.1 Trust & Security Boundaries (HIGHEST PRIORITY)
- **[Issue #492](https://github.com/anthropics/skills/issues/492) — 43 comments:** Community skills distributed under the `anthropic/` namespace enable impersonation of official skills and abuse of elevated permissions. This is the single most-upvoted concern and indicates strong demand for **a vetting/namespacing policy** for third-party skills.
- **[Issue #1175](https://github.com/anthropics/skills/issues/1175) — 4 comments:** Concerns about security & context-window handling when embedding access-control logic in `SKILL.md` for SharePoint integrations.

### 2.2 Distribution & Sharing
- **[Issue #228](https://github.com/anthropics/skills/issues/228) — 16 comments:** Demand for **org-wide skill sharing** in Claude.ai without manual file transfers via Slack/Teams. 8 👍 reactions.
- **[Issue #189](https://github.com/anthropics/skills/issues/189) — 6 comments:** `document-skills` and `example-skills` plugins install identical content, creating duplicates that bloat the context window.

### 2.3 Evaluation Infrastructure Reliability
- **[Issue #556](https://github.com/anthropics/skills/issues/556) — 12 comments:** `run_eval.py`'s `claude -p` never triggers skills/commands → 0% trigger rate across all queries. Drives PR #1298, PR #1099, and PR #1050.
- **[Issue #1390](https://github.com/anthropics/skills/issues/1390) — 4 comments:** `mcp-builder/evaluation.py` fabricates tool-execution errors → 0/N scores against any real MCP server.

### 2.4 Reasoning Quality & Self-Audit
- **[Issue #1385](https://github.com/anthropics/skills/issues/1385) — 4 comments:** Three-gate pipeline proposal: pre-task calibration → adversarial review → delivery verification. Companion to PR #1367 (`self-audit` skill).
- **[Issue #412](https://github.com/anthropics/skills/issues/412) — closed with 6 comments:** `agent-governance` proposal (policy enforcement, threat detection, trust scoring, audit trails) — never landed.

### 2.5 Context Efficiency & Memory
- **[Issue #1329](https://github.com/anthropics/skills/issues/1329) — 9 comments:** `compact-memory` skill — symbolic notation for compact agent state to reduce long-running agent context cost.
- **[Issue #1487](https://github.com/anthropics/skills/issues/1487) — 4 comments:** `claude-api` skill eagerly injects ~156k tokens, exhausting context in a single tool call.

### 2.6 Integration & Exposure
- **[Issue #29](https://github.com/anthropics/skills/issues/29) — 4 comments:** Usage with AWS Bedrock — recurring demand for cross-platform parity.
- **[Issue #16](https://github.com/anthropics/skills/issues/16) — 4 comments:** Expose Skills as MCPs — community sees Skills and MCPs as complementary surfaces.

---

## 3. High-Potential Pending Skills

PRs with active engagement and clear demand that may land soon:

| PR | Skill | Why it's likely to merge |
|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | `skill-creator` eval fix | Fixes a 0%-recall blocker reported in Issue #556 (12 comments); also tackles the #1 evaluation-infrastructure complaint |
| [#83](https://github.com/anthropics/skills/pull/83) | `skill-quality-analyzer` + `skill-security-analyzer` | Directly responds to the most-upvoted community concern (Issue #492, 43 comments) |
| [#514](https://github.com/anthropics/skills/pull/514) | `document-typography` | Solves a universal quality defect; no current skill covers it |
| [#486](https://github.com/anthropics/skills/pull/486) | `ODT` skill | Fills a clear format gap parallel to existing DOCX/PDF coverage |
| [#210](https://github.com/anthropics/skills/pull/210) | `frontend-design` revision | Clarifies a high-traffic skill; long-standing, stable PR |
| [#723](https://github.com/anthropics/skills/pull/723) | `testing-patterns` | Fills a major gap (no existing testing-focused skill) |
| [#538](https://github.com/anthropics/skills/pull/538) / [#541](https://github.com/anthropics/skills/pull/541) / [#539](https://github.com/anthropics/skills/pull/539) | `pdf`/`docx`/`skill-creator` correctness fixes | Low-risk, well-scoped reliability fixes by recurring contributor `Lubrsy706` |
| [#1628](https://github.com/anthropics/skills/pull/1628) | `Hivemind` | Reflects strong demand for zero-cost multi-agent orchestration |

---

## 4. Skills Ecosystem Insight

**The community's most concentrated demand is for a trust-and-reliability layer — Skills that audit, secure, and verify the Skills ecosystem itself, plus rock-solid evaluation infrastructure, because without trustworthy measurement and vetting, no skill's value can be reliably assessed or safely adopted.**

---

*Report compiled from GitHub data for anthropics/skills — 50 PRs and 50 Issues analyzed as of 2026-09-07.*

---

# Claude Code Community Digest — 2026-09-07

## Today's Highlights

The community is buzzing around **#91870 "Function Hooks"** — a high-leverage enhancement proposal that would let plugins mutate Claude Code behavior through middleware-style hooks with side-effect tracking, already drawing 126 comments and 79 👍 since September 3. Separately, a **cluster of Windows desktop regressions** (always-on-top, MSIX lockouts, update failures) is dominating bug reports, while several plugin-dev fixes from contributor **AZERDSQ131** are landing rapidly across security-guidance, hookify, and ralph-wiggum.

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. **[#91870 — Function Hooks: make plugins 10x more powerful](https://github.com/anthropics/claude-code/issues/91870)** — Express/Koa-style hook chaining with parameterized `$` object and side-effect tracking. With 126 comments and 79 👍 in 4 days, this is the week's most-discussed thread and could reshape plugin extensibility. *Status: OPEN, enhancement.*

2. **[#85891 — Claude Desktop stays always-on-top on Windows 11](https://github.com/anthropics/claude-code/issues/85891)** — 89 comments, 197 👍 — the highest upvoted active issue. No in-app toggle to disable topmost behavior; marked `invalid` but still gathering significant traction, indicating community disagrees with the resolution. *Status: OPEN, marked invalid.*

3. **[#53247 — Claude Desktop fails to launch on Windows (HRESULT 0x80070020)](https://github.com/anthropics/claude-code/issues/53247)** — Orphaned AppX job objects survive crashes; only logoff/reboot recovers. 69 comments, 29 👍. *Status: OPEN, bug.*

4. **[#74715 — "Always allow" Claude-in-Chrome permissions persist as `once`](https://github.com/anthropics/claude-code/issues/74715)** — Approved-sites list stays empty so users re-prompt every action. A regression on the browser extension. *Status: OPEN.*

5. **[#76694 — Cowork lost "Choose a folder" after Chat/Cowork merge](https://github.com/anthropics/claude-code/issues/76694)** — Context menu replaced with upload-only knowledge menu; users can't point new projects at a local folder. *Status: OPEN, macOS.*

6. **[#90102 — Slash command autocomplete regression mid-input](https://github.com/anthropics/claude-code/issues/90102)** — Worked in v2.1.0, fixed in v2.1.136, regressed again by v2.1.228. A useful signal that autocomplete regression tests aren't catching middleware-level changes. *Status: OPEN, TUI.*

7. **[#92080 — Fable 5.1 weekly limit invisible to CLI](https://github.com/anthropics/claude-code/issues/92080)** — Client receives it, labels it 'Fable', drops it. Subscribers hit silent rate-limit walls with no statusline or `/usage` visibility. *Status: OPEN, duplicate.*

8. **[#91763 — `git fsmonitor--daemon` blocks MSIX relaunch](https://github.com/anthropics/claude-code/issues/91763)** — Daemon inherits the AppX container job, survives forced shutdown, and 0x80070020-locks the new version. Includes root cause + no-reboot workaround. *Status: OPEN, Windows.*

9. **[#87106 — Resuming completed subagents replays full transcripts](https://github.com/anthropics/claude-code/issues/87106)** — Burned 75% of a weekly limit in one afternoon. Calls out cost-amplification through `SendMessage` retries. *Status: OPEN.*

10. **[#80818 — Spurious "Exited Plan Mode" / "Auto Mode Active" notifications](https://github.com/anthropics/claude-code/issues/80818)** — Injected at prompt assembly layer across v2.1.186–v2.1.218, raising prompt-injection concerns. *Status: OPEN, core.*

## Key PR Progress

1. **[#26175 — fix: replace broken native installer bootstrap script](https://github.com/anthropics/claude-code/pull/26175)** — `curl … | bash` silently deletes existing npm install while failing to create `~/.local/bin/claude`. Important remediation for the official install path. *Status: CLOSED.*

2. **[#39043 — Remove "retro-futuristic" recommendation from Frontend Design Skill](https://github.com/anthropics/claude-code/pull/39043)** — A stylistic-only cleanup; notable because t3dotgg's PR title is just "Trust me on this one." *Status: OPEN.*

3. **[#87079 — fix(security-guidance): make `**` glob patterns match zero-depth paths](https://github.com/anthropics/claude-code/pull/87079)** — `fnmatch` semantics mean `**/*.ts` excludes top-level files; security rules then silently miss them. *Status: OPEN.*

4. **[#68707 — feat(bug-reporter): add `/bug` command](https://github.com/anthropics/claude-code/pull/68707)** — File GitHub issues directly from the terminal — a notable UX improvement for the issue-filing loop. *Status: CLOSED.*

5. **[#68786 — fix(plugin-dev): shell injection via stdin redirection in test-hook.sh](https://github.com/anthropics/claude-code/pull/68786)** — Real security fix for an embedded `$TEST_INPUT` inside single quotes in a `bash -c` string.

6. **[#68702 — fix(ralph-wiggum): guard PROMPT_PARTS against `set -u` on macOS bash 3.x](https://github.com/anthropics/claude-code/pull/68702)** — One-character fix that restores plugin setup on macOS default bash.

7. **[#68701 — fix(security-guidance): strip CRLF from Python version probe on Windows](https://github.com/anthropics/claude-code/pull/68701)** — `\r\n` line endings were breaking version comparison.

8. **[#68689 — fix(security-guidance): block symlink escape in extensibility config reads](https://github.com/anthropics/claude-code/pull/68689)** — Prevents `~/.ssh/id_rsa` exfiltration via symlinked `.claude/claude-security-guidance.md`.

9. **[#68699 — fix(hookify): Python wrapper + normalize plugin root paths on Windows](https://github.com/anthropics/claude-code/pull/68699)** — Backslash path separators + MS Store `python3` stub 49-exit issues resolved.

10. **[#68693 — fix(scripts): add duplicate label additively, not replace existing labels](https://github.com/anthropics/claude-code/pull/68693)** — `closeIssueAsDuplicate` was clobbering platform/area/priority labels on close.

*Note: A large batch of 15+ closed PRs from AZERDSQ131 on 2026-06-15 all merged in this window — collectively they harden the plugin-dev, hookify, security-guidance, and ralph-wiggum plugins, fix CI scripts, and correct triage logic for Claude Desktop issues (#68678).*

## Feature Request Trends

- **Plugin extensibility layer** is by far the dominant theme — #91870 (Function Hooks), #86763 (separate skill invocation paths), #84495 (plugin marketplace SSH), and #91417 (plugin-namespaced skill completion) all push toward a richer plugin runtime.
- **Cross-session memory and context** — #91913 (persistent CLI memory), #90887 (harness-enforced adversarial review on commit).
- **Multi-device and remote workflows** — #92416 (mobile Remote Control session takeover, Codex parity).
- **UI density and noise reduction** — #73413 (VS Code transcript view modes: Summary / Normal / Verbose).
- **Cost transparency** — #92080 (Fable weekly limits in `/usage`), #87106 (subagent resume cost).

## Developer Pain Points

- **Windows desktop reliability** dominates the issue tracker: always-on-top windows (#85891, #87895), orphaned AppX/MSIX job objects (#53247, #91763), broken update flow (#92099), Windows-specific hook path handling (#68694, #68699).
- **Authentication and onboarding friction** — #79808 reports verification emails being silently suppressed with no escalation path through support.
- **TUI regressions slipping past releases** — slash autocomplete (#90102), Linux copy upward (#92653), Bash tool stdout never surfacing (#86853).
- **Cost / quota opacity** — subagent resume replays (#87106) and invisible Fable limits (#92080) make planning long sessions risky.
- **Prompt hygiene concerns** — spurious "Plan Mode / Auto Mode" injections (#80818, #92659) raise prompt-injection flags and erode trust in system notifications.
- **Git/commit attribution** — `Claude-Session:` trailer still appended despite `includeCoAuthoredBy: false` (#91546), a regression of #66504.

---

*Digest generated from GitHub data for anthropics/claude-code on 2026-09-07.*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-07

## Today's Highlights

Today's activity is dominated by a coordinated internal cleanup of the Guardian approval/review subsystem across Codex (closing 20+ related PRs), paired with a surge of Windows and WSL bug reports affecting project creation, rollout pagination, and desktop pets. On the model side, multiple GPT-5/6 tier models are reporting "Selected model is at capacity" across Pro and Pro 20x plans, while community demand for `/rewind` and pet/input fixes continues to climb.

## Releases

No new releases in the last 24h.

## Hot Issues

1. **[#36040](https://github.com/openai/codex/issues/36040) — iOS Remote only lists projects with recent chats (34 comments)**
   A regression in ChatGPT mobile's Remote Control on iOS 26 paired with macOS Codex host hides projects that don't have active chat history. High visibility because it blocks the documented "use iPhone to drive your desktop Codex" workflow.

2. **[#41463](https://github.com/openai/codex/issues/41463) — Windows + WSL: Cannot create projects due to `AbsolutePathBuf` deserialization (33 comments, 👍23)**
   Codex Desktop on Windows 10/11 + WSL2 fails to bootstrap projects because `AbsolutePathBuf` is deserialized without a base path. Strong community reaction; this is a blocker for the Windows desktop onboarding flow.

3. **[#41566](https://github.com/openai/codex/issues/41566) — Windows: Paginated rollout emits duplicate ordinal after unfinished turn (20 comments)**
   A `duplicate ordinal` bug in Codex's rollout pagination permanently freezes thread history projection on Windows after an interrupted turn. Same family as #42027 and #42387 — looks like a systemic issue with rollout file rotation.

4. **[#42661](https://github.com/openai/codex/issues/42661) — Windows Pets: input region offset + click-through after reboot (17 comments, 👍3)**
   On multi-monitor Windows setups with DPI scaling, the desktop pet's hit-test region drifts from its rendered position and reverts to click-through after a reboot, blocking interaction entirely.

5. **[#32139](https://github.com/openai/codex/issues/32139) — TUI: Auto-accept "Keep Waiting" prompts (13 comments, 👍23)**
   Long-running tool calls frequently surface "Keep Waiting?" prompts that interrupt power users. Request is to auto-accept additional wait time after a model-side decision. High community support (23 👍).

6. **[#40902](https://github.com/openai/codex/issues/40902) — Windows 26.820.60940 regression: Java NIO `Selector.open` fails (13 comments, 👍3)**
   After installing Codex App 26.820.60940, Java NIO fails to open selectors with "Unable to establish loopback connection", breaking any tool that uses Java NIO and the embedded app-server.

7. **[#30043](https://github.com/openai/codex/issues/30043) — macOS: GUI apps launched from Codex sandbox abort at `_RegisterApplication` (12 comments, 👍3)**
   Sandbox-spawned macOS GUI apps (Chrome, LibreOffice) crash immediately with SIGABRT. Important because the sandbox is supposed to be transparent for app launches.

8. **[#10486](https://github.com/openai/codex/issues/10486) — Plan mode: Export plan to Markdown (12 comments, 👍23)**
   Highly-upvoted feature request to add a one-click "Export plan" action in Plan mode so plans can be saved or shared without manual copy-paste.

9. **[#43398](https://github.com/openai/codex/issues/43398) — GPT-5.5, GPT-5.6-Sol, GPT-6 Astra all at capacity (Sep 7 2026) (12 comments, 👍5)**
   Pro 20x user reports only `gpt-5.4-mini` works; every higher-tier model returns "Selected model is at capacity". One of several near-simultaneous capacity reports today.

10. **[#43375](https://github.com/openai/codex/issues/43375) — Multiple GPT-5/GPT-6 models return "Selected model is at capacity" (12 comments)**
    Confirms #43398 as a broader outage pattern across the GPT-5 and GPT-6 families on Sept 7, not a single-model issue.

## Key PR Progress

1. **[#43462](https://github.com/openai/codex/pull/43462) — Remove legacy Guardian approval review paths**
   Drops the old `fast_decision`/`full_review` hooks and the duplicate Guardian V2 fast-approval impl, leaving `ApprovalReviewContributor::decide` as the single approval interface.

2. **[#43458](https://github.com/openai/codex/pull/43458) — Centralize Guardian context mode and checkpoint policy**
   Resolves `GuardianContextMode` once per session and shares it across history retention, replay, evidence capture, compaction, and review — eliminates per-call re-derivation bugs.

3. **[#43432](https://github.com/openai/codex/pull/43432) — Route approvals through the extension decision API**
   Extensions can now choose cached approval, synchronous review, or a user prompt; core still enforces mandatory Guardian and fresh-review requirements.

4. **[#43447](https://github.com/openai/codex/pull/43447) — Route MCP elicitations through the shared approval decision path**
   MCP elications now go through `decide_approval`, carrying effective approval policy, reviewer, and synchronous-review requirements; unsupported form/URL elicitations are preserved for user review.

5. **[#43442](https://github.com/openai/codex/pull/43442) — Keep Guardian review evidence consistent and reject stale approvals**
   Fixes a race where concurrent parent compaction could remove evidence between checkpoint selection and prompt construction, and where new user input during review could invalidate an approval.

6. **[#43444](https://github.com/openai/codex/pull/43444) — Pin V8 release manifests and prevent published release replacement**
   Records trusted V8 artifact digests in-repo and forbids overwriting already-published release assets — addresses a supply-chain gap that checksum-only verification left open.

7. **[#43428](https://github.com/openai/codex/pull/43428) — Notify opted-in stdio MCP servers of auth changes**
   Advertises the experimental `codex/auth-change` capability and pushes `notifications/codex/authChanged` after init/on subsequent auth changes with credentials redacted.

8. **[#43452 / #43352](https://github.com/openai/codex/pull/43352) — Add opt-in MCP user-verification transport**
   Adds typed `openai/userVerification` elicitations (title/message/url) so device-authenticated flows can surface a real UI prompt instead of being auto-cancelled.

9. **[#43408](https://github.com/openai/codex/pull/43408) — Avoid WebSocket waits in Guardian v2 classification**
   Falls back to HTTP streaming when no healthy idle WebSocket is pooled, and replenishes the pool asynchronously — stops classification from stalling on handshakes.

10. **[#43360](https://github.com/openai/codex/pull/43360) — Use app-server metadata for TUI session restoration**
    Carries the working directory and model provider from `thread/list` / `thread/read` into resume/fork flows so the TUI no longer relies on local guesses that drift from server state.

*(Related in the same batch: [#43456](https://github.com/openai/codex/pull/43456) thread-idle wait in model-switching tests; [#43454](https://github.com/openai/codex/pull/43454) labelled shell-snapshot capture metrics; [#43423](https://github.com/openai/codex/pull/43423)/[#43421](https://github.com/openai/codex/pull/43421) app-server docs/README cleanup; [#43426](https://github.com/openai/codex/pull/43426) Luna HTTP handling in guardian tests; [#43376](https://github.com/openai/codex/pull/43376) defer resume picker to fresh TUI stack; [#43359](https://github.com/openai/codex/pull/43359) server-side provider ID in `/status`; [#43355](https://github.com/openai/codex/pull/43355) server-resolves implicit model settings on CLI fork; [#43340](https://github.com/openai/codex/pull/43340) remote named permission profile selection in TUI.)*

## Hot Discussions

### Ideas

- **[#9618 — How is there not a `/rewind` or `/revert` feature? (20 comments, 👍119)](https://github.com/openai/codex/discussions/9618)**
  By far the most upvoted open discussion in the repo. Users contrast Codex with OpenCode and Claude Code, both of which support undoing agent changes; without it, Codex is seen as near-unusable for non-trivial work.

- **[#7366 — Reference files that are gitignored (👍7)](https://github.com/openai/codex/discussions/7366)**
  Allow `@`-references to `.gitignore`d files, since "gitignored" means "don't commit", not "don't read".

- **[#37611 — Signed enterprise work orders for governed access to higher-capability Codex models](https://github.com/openai/codex/discussions/37611)**
  An enterprise operator proposes signed, auditable work orders so governed customers can access higher-capability models (Astra-tier and above) without bypassing cyber-policy safeguards.

### Q&A

- **[#43257 — How does experimental context management count history lookups against Codex usage limits?](https://github.com/openai/codex/discussions/43257)**
  Pro user on macOS GPT-6 Astra asks how multi-day threads that re-fetch prior history during context management affect their usage allowance. No answer yet — relevant to today's rate-limit threads.

### Show and tell

- **[#41157 — CodexFuse 1.2.0 (local Windows dashboard for Codex rate limits)](https://github.com/openai/codex/discussions/41157)**
  No-install, no-API-key Windows tray dashboard showing used/available quota, next reset, and hourly use (PT/EN).

- **[#43224 — NULLYARD: public MCP board with a static integration guide](https://github.com/openai/codex/discussions/43224)**
  Operator-built plain-text MCP board with a public `skill.md` and `mcp.md`, no login required.

- **[#43427 — Blume.codes: turns coding-agent sessions into better rules and skills](https://github.com/openai/codex/discussions/43427)**
  Tool that mines past Codex/agent sessions to extract reusable rules and skills, motivated by agent drift in the author's previous startup.

### General

- **[#7782 — Deprecating `chat/completions` support in Codex (👍21)](https://github.com/openai/codex/discussions/7782)**
  Reminder that OpenAI recommends migrating to the `responses` API for reasoning, multi-turn, and tool workflows.

## Feature Request Trends

- **Agent undo / rewind** (#9618, 119 👍) — by a wide margin the #1 community ask; considered table stakes vs. competing agents.
- **Plan-mode quality-of-life** — Export to Markdown (#10486, 23 👍) signals users want Plan mode to be a first-class artifact, not a transient step.
- **TUI friction reduction** — Auto-accept "Keep Waiting" (#32139, 23 👍) and broader TUI stack/defer improvements (#43376) point to demand for less interruption in long-running flows.
- **MCP as a first-class protocol** — Multiple PRs (auth change notifications, user-verification transport, shared approval routing) plus new community MCP boards (NULLYARD) indicate MCP is becoming a primary integration surface.
- **Enterprise governance** — Signed work orders for higher-capability models (#37611) suggests enterprise users want auditable, policy-compliant paths to GPT-6 Astra and beyond.
- **Better input handling for "pet" / overlay UIs** — Windows pet hit-testing (#42661, #42190) and macOS `Ctrl+Space` conflict (#42258, 23 👍) show the desktop companion UI needs OS-level polish.

## Developer Pain Points

- **Windows + WSL as a first-class environment.** Recurring breakage in project bootstrap (#41463), Node REPL sandbox paths (#29413), browser plugin bootstrapping (#35224), and app-server startup (#40972) makes Windows + WSL the most fragile supported combo.
- **Rollout file pagination and projection.** Multiple incidents on Windows (#41566, #42027, #42387) where duplicate ordinals after interrupted turns permanently break chat history — clearly a systemic issue rather than one-off corruption.
- **Windows desktop pets and overlays.** Hit-testing, drag/resize, reboot persistence (#42661, #42190, #42813, #42258) are all actively regressing.
- **Capacity / rate-limit visibility.** "Selected model is at capacity" on multiple GPT-5/6 tiers today (#43398, #43375, #43455) plus mismatched local telemetry vs. consumed quota on Astra (#43222, #43230) leave users guessing what they can actually run.
- **Java/embedded runtimes on Windows.** NIO selector regression (#40902) and persistent "ghost" conversations on macOS (#41987) point to lifecycle bugs in the bundled runtime stack.
- **Settings that silently revert.** `sansFontSize` resets on upgrade (#39781); abandoned projects after a Windows restart (#19615) — basic state durability is still uneven.
- **Documentation drift.** Removal of the app-server README and its `AGENTS.md` references (#43421, #43423) suggests the codebase has accumulated docs that no longer match the implementation, which hits new contributors first.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-07

## Today's Highlights

The v0.60.0 nightly (g85aca163f) shipped overnight with the usual automated version bump and dependency refresh, while engineering attention is firmly on agent reliability: the top-tracked issues this cycle cluster around **subagent recovery after MAX_TURNS** (#22323), **generalist agent hangs** (#21409), and **browser-agent stability across Wayland and settings overrides** (#21983, #22267). A new wave of PRs also landed or opened to address cross-platform line-ending bugs, symlinked workspace roots, MCP tool-name collisions, and an EOL Node 20 sandbox image — signaling a quality-and-platform-compat sweep heading into 0.60.

---

## Releases

- **v0.60.0-nightly.20260907.g85aca163f** — Automated nightly release. Diff against last night is incremental; full changelog: [compare view](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260906.g85aca163f...v0.60.0-nightly.20260907.g85aca163f). Companion version-bump PR: [#29233](https://github.com/google-gemini/gemini-cli/pull/29233).

---

## Hot Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent recovery after MAX_TURNS reports GOAL success** *(p1, agent, 13 comments)*
   When a subagent (e.g., `codebase_investigator`) hits its turn cap, it still surfaces `status: "success"` with `Termination Reason: "GOAL"`, masking the interruption. High-traffic because it directly breaks subagent trust signals used across workflows.

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent hangs indefinitely** *(p1, agent, 8 comments, 👍8)*
   Trivial tasks like folder creation freeze for an hour+ when the model defers to the generalist agent. Workaround (disabling subagent delegation) confirms the bug is in the delegation path.

3. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell command stuck on "Waiting input" after completion** *(p1, core, 4 comments, 👍3)*
   After a CLI finishes, Gemini keeps the shell marked active awaiting user input. Recurring for simple commands and a frequent source of stuck sessions.

4. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — Browser subagent fails on Wayland** *(p1, agent/browser, 4 comments)*
   Linux/Wayland users see the browser agent end with `Termination Reason: GOAL` but no actual work done. Important for cross-platform parity.

5. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — Zero-Dependency OS Sandboxing & Post-Execution Intent Routing** *(p2, agent, 9 comments)*
   Vision-track proposal to lean into Gemini 3's native bash affinity (grep/cat/sed/awk) with OS-level sandboxing, removing the need for model-side tool wrappers. High-leverage architectural idea.

6. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — EPIC: AST-aware file reads, search, and mapping** *(p2, agent, 7 comments)*
   Track for evaluating tools like `tilth` / `glyph` to do precise method-bounds reads and codebase mapping instead of firehosing context. Directly tied to token-frugality work.

7. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini rarely invokes custom skills / sub-agents** *(p2, agent, 6 comments)*
   Anecdotal but consistent: the model ignores well-described custom skills unless explicitly told to use them. Undermines the value of the skills system.

8. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) — Agent should stop destructive behavior** *(p2, agent, 3 comments, 👍1)*
   Cases where the model reaches for `git reset --force` or destructive DB ops when safer alternatives exist. Strong safety implications.

9. **[#22232](https://github.com/google-gemini/gemini-cli/issues/22232) — Browser agent: automatic session takeover & lock recovery** *(p3, agent, 4 comments)*
   Current "fail-fast" on a locked browser profile blocks persistent sessions. Requests automatic takeover/orphan recovery for `BrowserManager.ts`.

10. **[#20079](https://github.com/google-gemini/gemini-cli/issues/20079) — Symlinked agent files in `~/.gemini/agents/` not discovered** *(p2, agent, 4 comments)*
    Users maintaining dotfiles via symlinks can't get their agent definitions recognized — a small but consistently surprising papercut.

*(Also notable: [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) deterministic redaction for Auto Memory, [#26522](https://github.com/google-gemini/gemini-cli/issues/26522) Auto Memory retry storms, [#26516](https://github.com/google-gemini/gemini-cli/issues/26516) Memory system bugs tracker, [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 400 error with >128 tools, [#23571](https://github.com/google-gemini/gemini-cli/issues/23571) tmp-script sprawl.)*

---

## Key PR Progress

1. **[#29209](https://github.com/google-gemini/gemini-cli/pull/29209) — Skip non-numeric background PID lines (CLOSED)**
   Stops stray sysmond/warning lines from emitting `NaN` into `llmContent`, with regression coverage. Fixes [#29042](https://github.com/google-gemini/gemini-cli/issues/29042).

2. **[#28975](https://github.com/google-gemini/gemini-cli/pull/28975) — Keep glob results for symlinked workspace roots (CLOSED)**
   On macOS, `/tmp` → `/private/tmp` symlinks caused `glob` to falsely return `No files found`. Restores correctness for the default workspace path.

3. **[#28971](https://github.com/google-gemini/gemini-cli/pull/28971) — Keep truncated MCP tool names unique (CLOSED)**
   The 30+30 truncation was non-injective and collapsed distinct MCP tools into one registry entry; now made collision-safe.

4. **[#28983](https://github.com/google-gemini/gemini-cli/pull/28983) — Detect mixed line endings instead of CRLF-on-single-match (CLOSED)**
   `detectLineEnding()` was over-aggressive about CRLF; now handles mixed-endings files properly.

5. **[#28978](https://github.com/google-gemini/gemini-cli/pull/28978) — Document missing `HookDecision` values (CLOSED)**
   Hooks reference doc now covers `ask` and `approve` decisions, which were implemented but undocumented.

6. **[#28972](https://github.com/google-gemini/gemini-cli/pull/28972) — Guard `formatTruncatedToolOutput` against non-positive `maxChars` (CLOSED)**
   Adds a `maxChars > 0` guard that prevents corrupt head/tail slicing and Infinity output. Fixes [#28620](https://github.com/google-gemini/gemini-cli/issues/28620).

7. **[#28973](https://github.com/google-gemini/gemini-cli/pull/28973) — Bump sandbox image from EOL `node:20-slim` to `node:22-slim` (CLOSED)**
   Security hygiene: Node 20 reached EOL on 2026-04-30. Sandbox Dockerfile now builds on Node 22.

8. **[#29134](https://github.com/google-gemini/gemini-cli/pull/29134) — Protect the active session from `--delete-session` (OPEN)**
   Threads the active session ID into list/delete paths and matches on short-ID suffix to avoid false positives. Fixes [#29133](https://github.com/google-gemini/gemini-cli/issues/29133).

9. **[#29132](https://github.com/google-gemini/gemini-cli/pull/29132) — Normalize line endings in diff context snippets (OPEN)**
   Prevents `getDiffContextSnippet` from dumping 100% of a CRLF file on Windows edits. Fixes [#29130](https://github.com/google-gemini/gemini-cli/issues/29130).

10. **[#29229](https://github.com/google-gemini/gemini-cli/pull/29229) — Reject non-finite numbers in settings editor (OPEN)**
    `parseEditedValue('number', ...)` only filtered `NaN`; `1e309` quietly stored as `null`. Now uses `Number.isFinite`. Fixes [#29226](https://github.com/google-gemini/gemini-cli/issues/29226).

*(Also landed/active: [#29137](https://github.com/google-gemini/gemini-cli/pull/29137) Dependabot npm bump (77 packages), [#29230](https://github.com/google-gemini/gemini-cli/pull/29230) dead-anchor doc fixes, [#29231](https://github.com/google-gemini/gemini-cli/pull/29231) stale JSDoc params, [#28982](https://github.com/google-gemini/gemini-cli/pull/28982) Build Remote Agent phone-pairing extension.)*

---

## Feature Request Trends

- **AST-aware tooling is the single most-requested theme** this cycle ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746), [#19561](https://github.com/google-gemini/gemini-cli/issues/19561)). Developers want precise method/symbol-bounds reads to cut per-turn tokens and reduce misaligned-file churn.
- **Persistent, file-based task tracking** is a recurring replacement target for `WriteToDo` ([#18836](https://github.com/google-gemini/gemini-cli/issues/18836), [#21000](https://github.com/google-gemini/gemini-cli/issues/21000)) — driven by "context rot" and total memory loss across sessions.
- **Subagent observability & trajectory sharing** ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598), [#21763](https://github.com/google-gemini/gemini-cli/issues/21763)) — `/chat share` for subagents, and richer `/bug` reports including subagent context.
- **Auto Memory quality & safety** as a coherent workstream ([#26516](https://github.com/google-gemini/gemini-cli/issues/26516), [#26522](https://github.com/google-gemini/gemini-cli/issues/26522), [#26523](https://github.com/google-gemini/gemini-cli/issues/26523), [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)): redaction, retry storms, invalid-patch handling, and logging hygiene.
- **Native-model-first execution** ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873)) — leaning into Gemini 3's bash training rather than wrapping every shell call.
- **Browser agent maturity** ([#22232](https://github.com/google-gemini/gemini-cli/issues/22232), [#22267](https://github.com/google-gemini/gemini-cli/issues/22267)) — session takeover, lock recovery, and proper `settings.json` override propagation.
- **Agent self-awareness** ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)) — accurate CLI flag/hotkey recall so the agent can act as its own guide.

---

## Developer Pain Points

- **Subagent reliability is the #1 frustration.** Reports of hangs ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), false success on termination ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)), and unexplained non-use of available skills/agents ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968)) — three distinct symptoms of a trust-and-routing gap.
- **Browser agent is brittle on Linux and ignores user config** — Wayland failure ([#21983](https://github.com/google-gemini/gemini-cli/issues/21983)) and `settings.json` overrides being silently dropped ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)).
- **Shell/tool hang after completion** — multiple reports of "Waiting input" persisting past command exit ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)), forcing users to cancel.
- **Cross-platform line-ending & symlink bugs** — recurring enough to warrant three independent PRs ([#28983](https://github.com/google-gemini/gemini-cli/pull/28983), [#28975](https://github.com/google-gemini/gemini-cli/pull/28975), [#29132](https://github.com/google-gemini/gemini-cli/pull/29132)). macOS `/tmp` and Windows CRLF are the two biggest offenders.
- **Settings-editor silent corruption** ([#29229](https://github.com/google-gemini/gemini-cli/pull/29229)) — values like `1e309` quietly stored as `null` after passing validation.
- **Context blow-up from naive reads** ([#19561](https://github.com/google-gemini/gemini-cli/issues/19561), [#23571](https://github.com/google-gemini/gemini-cli/issues/23571)) — large file reads and tmp-script sprawl drive up per-turn token cost and complicate workspace cleanup.
- **Destructive-command safety** ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)) — users want the agent to prefer safe git/DB defaults without explicit instruction.

---
*Digest generated from GitHub activity on google-gemini/gemini-cli for 2026-09-07.*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-07

## Today's Highlights

The community is focused on a cluster of regressions in the just-shipped **Desktop app 1.1.15 / CLI 1.0.83** line — multiple users report session-creation failures in the Windows/macOS desktop apps, ACP mode silently auto-approving tool calls, and `session resume` prematurely canceling MCP connections. MCP and ACP integration continue to be the most fragile surface area, with three separate regressions opened in the last 48 hours.

## Releases

_No new releases in the last 24 hours._

## Hot Issues

1. **[#4742](https://github.com/github/copilot-cli/issues/4742)** — Desktop 1.1.15: cannot create a second Local session while one is running. Blocks a core multi-session workflow and is filed by a power user. (OPEN)
2. **[#4753](https://github.com/github/copilot-cli/issues/4753)** — v1.0.83: `session resume` cancels in-flight stdio MCP servers (timeout collapsed from ~16s to ~1s). Direct regression of session-handling behavior, silently disables MCP tools. (OPEN, 👍 1)
3. **[#4681](https://github.com/github/copilot-cli/issues/4681)** — MCP OAuth `initialize` request after login drops the `User-Agent` header, breaking custom-header authentication for remote MCP servers. (OPEN)
4. **[#4749](https://github.com/github/copilot-cli/issues/4749)** — Azure MCP `learn=true` calls now time out at 180s in CLI 1.0.83-5 (worked in 1.0.80). A clean regression isolating the v1.0.83 MCP transport changes. (OPEN)
5. **[#4537](https://github.com/github/copilot-cli/issues/4537)** — ACP mode auto-approves tool calls again (regression of #845); shell/file edits run unattended with no `session/request_permission` event. (OPEN, 👍 2)
6. **[#4555](https://github.com/github/copilot-cli/issues/4555)** — ACP `session/prompt` unconditionally aborts the session, killing background sub-agents. Interactive TUI is unaffected, isolating the bug to ACP. (OPEN)
7. **[#4743](https://github.com/github/copilot-cli/issues/4743)** — ACP returns `end_turn` while background shells are still running; no idle signal is observable. Compounds the ACP pain cluster. (OPEN)
8. **[#4757](https://github.com/github/copilot-cli/issues/4757)** — `--yolo`/`--allow-all` blocked session-wide by a fail-closed restriction applied even on accounts with no managed policy. (OPEN)
9. **[#4756](https://github.com/github/copilot-cli/issues/4756)** — Windows app (1.1.15) requires archiving every idle session before starting a new Local session; another 1.1.15 session-management regression. (OPEN)
10. **[#4755](https://github.com/github/copilot-cli/issues/4755)** — Session wedges permanently when a queued-lane message lands at turn end; idle finalization is suppressed and the queue never drains — kill-only recovery. (OPEN)

*Also worth tracking:* [#1665](https://github.com/github/copilot-cli/issues/1665) (project-scoped plugins, CLOSED after long discussion — 👍 18, 14 comments is the highest community signal of the day), [#2644](https://github.com/github/copilot-cli/issues/2644) (Shift+Arrow / Ctrl+A text selection), [#4709](https://github.com/github/copilot-cli/issues/4709) (multi-repo worktree association), [#4750](https://github.com/github/copilot-cli/issues/4750) (TUI CPU hog), [#4738](https://github.com/github/copilot-cli/issues/4738) (`ask_user` Enter discards typed input — data-loss severity), [#1999](https://github.com/github/copilot-cli/issues/1999) (German `@` keybinding, CLOSED).

## Key PR Progress

1. **[#4746](https://github.com/github/copilot-cli/pull/4746)** — *Add experimental next-action extension prototype.* Opt-in SDK example under `examples/next-best-action/` reusing foreground sessions via `joinSession()` with a no-tools `ui.extend`. Shows the team's intended shape for "next best action" agents without modifying the shipped CLI.
2. **[#4739](https://github.com/github/copilot-cli/pull/4739)** — *docs: propose terminal-owned macOS notifications.* Original MIT-licensed reference example with portable regression tests for the macOS notification-click problem. Explicitly framed as a proposal since this public repo doesn't carry the app implementation.
3. **[#4748](https://github.com/github/copilot-cli/pull/4748)** — *Add joke cli.* Lightweight PR; likely a first contribution / sample submission to exercise the contribution pipeline.

## Feature Request Trends

- **Per-repo / project-scoped configuration**: Plugin scope (#1665) and session filtering (#4693) — users want project-level rather than per-user settings for plugins, sessions, and prompts.
- **Native TUI ergonomics**: Shift+Arrow/Ctrl+A selection (#2644), better keyboard handling for non-US layouts (#1999), and CPU-efficient idle state (#4750) — the TUI still misses basic terminal conventions.
- **MCP maturity**: OAuth header fidelity (#4681), recoverable MCP connection state on resume (#4753), Azure MCP perf (#4749) — MCP is a high-value but still-fragile integration surface.
- **ACP correctness**: Three regressions in 24h (#4537, #4555, #4743) all call for stricter permission/idle signals so external editors can reason about agent state.
- **Form & input safety**: Multi-line / non-destructive Enter handling (#4738) is a recurring ask for any elicitation-style UI.

## Developer Pain Points

- **1.1.15 / 1.0.83 release regressions cluster** around session creation (#4742, #4756), session resume killing MCP (#4753), ACP auto-approvals (#4537), Azure MCP timeouts (#4749), and the TUI idle CPU spike (#4750) — a "broken in places" release on the desktop and CLI.
- **ACP mode is unreliable for editor integrations**: tools run without permission prompts, background tasks are aborted, and idle signals are missing — making ACP hard to trust as an automation surface.
- **MCP connection lifecycle is brittle**: resumption, OAuth headers, and Azure tool discovery all surfaced concrete failures in 24 hours; developers can't rely on MCP servers persisting across session resume.
- **Data loss in interactive forms**: Enter inside `ask_user` discards typed content (#4738) — small but high-impact trust issue.
- **Recovery from bad states often requires a process kill**: wedged sessions (#4755), deadlocked voice servers on Windows (#4740), and zombie session rows (#4754) all lack graceful in-app recovery.
- **Policy / permissions fail-closed surprises**: #4757 shows users without managed policies still getting restricted for `--yolo`/`--allow-all` for the session lifetime, with no UI to surface why.

*No Discussions were returned in the source data for this period.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-07

## 1. Today's Highlights

OpenCode Go's reliability has become the dominant pain point in the community, with a wave of overlapping reports covering HTTP 429 rate-limiting outages, 403/500 errors on individual models, and missing `x-opencode-session` headers causing 400 errors. On the engineering side, the core team is landing a series of refactors around provider compaction and unified filesystem access policy, alongside user-visible fixes for TUI key parsing and server-side auto-permission handling.

## 3. Hot Issues

1. **[#47613](https://github.com/anomalyco/opencode/issues/47613) — Go subscription: HTTP 429 outage on 2026-09-06** (13 comments)
   Multi-hour 429 outage on the paid Go endpoint with explicit compensation request. Highest-engagement issue today and the canonical thread for the Go reliability cluster.

2. **[#33027](https://github.com/anomalyco/opencode/issues/33027) — [BUG] MCP tools connected but not exposed to agent** (10 comments)
   MCP `pdfrag` server registers 6 tools via `tools/list`, but they never reach the agent. A long-standing integration gap that blocks a meaningful MCP use case.

3. **[#34473](https://github.com/anomalyco/opencode/issues/34473) — OpenCode randomly stops responses** (9 comments)
   On v1.17.11 desktop, responses silently end (session-complete sound, no error), sometimes mid-thinking. Quality-of-life blocker with 4 👍.

4. **[#42083](https://github.com/anomalyco/opencode/issues/42083) — GitHub Copilot provider shows zero models** (9 comments, 5 👍)
   `model_picker_enabled: false` for every Copilot model on 1.18.15; auth succeeds but `/models` and CLI list return nothing. Top-voted issue of the day.

5. **[#17798](https://github.com/anomalyco/opencode/issues/17798) — Windows ignores `NODE_EXTRA_CA_CERTS`** (6 comments, 4 👍)
   Enterprise users behind TLS-inspecting proxies cannot use OpenCode with internal PKI certs. Persistent cross-version regression with no clear workaround.

6. **[#31737](https://github.com/anomalyco/opencode/issues/31737) — TUI: pasting images via Ctrl+V has no effect** (4 comments)
   Image paste silently dropped in TUI mode. High-impact for users working with screenshots and vision models.

7. **[#36081](https://github.com/anomalyco/opencode/issues/36081) — Doesn't work under Termux** (4 comments)
   OpenCode fails to launch on Android Termux; widening terminal/environment compatibility gaps.

8. **[#40343](https://github.com/anomalyco/opencode/issues/40343) — OpenCode Go: 403 Forbidden for some models** (3 comments, 5 👍)
   `mimo-v2.5` and others fail with `Forbidden` despite active subscription and ample quota. Suggests per-model allowlisting or routing issue inside Go.

9. **[#47545](https://github.com/anomalyco/opencode/issues/47545) — Auto mode causes repeated false permission notifications** (3 comments)
   Auto approval happens client-side, after the server already emits `permission.asked`. Directly addressed by today's PR #47754.

10. **[#47794](https://github.com/anomalyco/opencode/issues/47794) — Improve Auto Router error messaging and model status indicators** (3 comments)
    Users can't tell which model Auto Router tried when a request fails; tagged `needs:compliance` and already gaining traction.

## 4. Key PR Progress

1. **[#47630](https://github.com/anomalyco/opencode/pull/47630) — refactor(core): unify filesystem access policy** *(closed)*
   Consolidates path-resolution and external-directory approval logic out of `LocationMutation` and into a single shared policy. Closes duplicated recipes across filesystem tools. *(Merged)*

2. **[#47324](https://github.com/anomalyco/opencode/pull/47324) — feat(core): schedule provider compaction automatically**
   Auto-triggers provider-mode compaction at safe Session boundaries; optional `threshold` clamped to the model's input ceiling. Pairs with #47323/#47322 as the compaction trilogy.

3. **[#47795](https://github.com/anomalyco/opencode/pull/47795) — feat(vcs): add last turn diff source**
   `GET /api/vcs/diff` gains `mode=turn` + `sessionID`, returning files touched in the session's most recent turn via existing per-step snapshots. No new durable state required.

4. **[#47792](https://github.com/anomalyco/opencode/pull/47792) — chore: bump gitlab-ai-provider to 6.15.0**
   Updates the pinned GitLab AI SDK across monorepo packages. Closes #47791.

5. **[#47789](https://github.com/anomalyco/opencode/pull/47789) — fix(tui): drop key events with no name before keymap matching**
   OpenTUI's `parseKeypress` can emit empty events from Device Status Report replies (`ESC[0n`); filters them before matching. Closes #42408.

6. **[#47635](https://github.com/anomalyco/opencode/pull/47635) — fix(opencode): resolve markdown agent prompts**
   Markdown loaders were overwriting frontmatter `prompt:` with body content and skipping sections. Closes #47616.

7. **[#27684](https://github.com/anomalyco/opencode/pull/27684) — feat: adjustable font size and line height for desktop/web**
   Long-standing UX request — new settings in Desktop and Web. Closes #26269, #16145, #10423.

8. **[#47754](https://github.com/anomalyco/opencode/pull/47754) — fix(opencode): decide auto permission approval on the server**
   Moves Auto permission handling server-side so auto-approved requests resolve before `permission.asked` fires. Closes #47545.

9. **[#46530](https://github.com/anomalyco/opencode/pull/46530) — feat(plugin): expose permission assertions**
   Plugin-only `ctx.permission.assert(input)` using the existing engine; pre-validates canonical browser URLs and server-file/external-directory reads. Strengthens plugin safety story.

10. **[#47776](https://github.com/anomalyco/opencode/pull/47776) — fix(cli): resolve background service port collision on Windows**
    `opencode2` hanging at "Starting background server…" on Windows traced to port collision + bind semantics. Closes #41746.

Notable also: **[#47783](https://github.com/anomalyco/opencode/pull/47783)** adds a Persian/Farsi README, closing #47775, and **[#46574](https://github.com/anomalyco/opencode/pull/46574)** introduces opt-in 1M-context variants (`gpt-5.6-sol-1m`, etc.) for GPT-5.6 OAuth.

## 6. Feature Request Trends

- **Auto Router transparency** — users want clear per-model status indicators and richer error messages (#47794).
- **Localization** — Persian/Farsi README added today (#47783/#47775), signaling continued demand beyond existing languages.
- **TUI ergonomics** — image paste (#31737), IME bypass for the leader key (#37167), and terminal-native progress indicator (#24807).
- **Desktop readability** — adjustable font size and line height (#27684) finally landing.
- **Plugin surface expansion** — permission assertions (#46530) and dialog option footers (#47780) reflect a steady push to make the plugin API first-class.
- **Compaction control** — explicit provider vs. local mode (#47323), automatic scheduling (#47324), and persisted context (#47322).

## 7. Developer Pain Points

- **OpenCode Go reliability is the single biggest frustration.** A coordinated spike of 429s (#47613, #47747, #47761), 403s on specific models (#40343, #47777), 500s on `gpt-5.6-luna` (#47778), and 400 `MissingSessionID` (#47755, #47756, #47763) suggests multiple compounding failures in the Go backend/edge layer — and customers are now asking for compensation.
- **Provider integrations are uneven.** GitHub Copilot returns zero models (#42083) or `Forbidden` (#26344), MCP tools register but never expose (#33027), and Cloudflare Workers AI omits the Account ID prompt (#30033).
- **Auto-mode UX bugs.** Spurious `permission.asked` notifications in Auto (#47545) erode trust in unattended operation — addressed in PR #47754.
- **TUI input regressions.** Image paste (#31737), empty key events from `ESC[0n` (#47789), and IME conflicts (#37167) all hit the TUI's input pipeline.
- **Windows & non-Linux environments.** `NODE_EXTRA_CA_CERTS` ignored (#17798), background-server hangs (#41746 → #47776), and Termux failures (#36081) continue to lag behind macOS/Linux support.
- **Silent model failures.** Random response stops (#34473), unanswered queries after "thinking" (#47767), and the missing Plan Mode in the client (#47733) all share a common theme: failures with no diagnostics.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-07

## 1. Today's Highlights

A heavy day for **provider-routing fixes and TUI polish**: the merged PRs route Copilot's `gpt-6-astra` through the Responses endpoint, repair streaming cancelation (`Esc`), and patch a `wordWrapLine` infinite recursion. Equally important, the **fallback provider chain** and **pin undici to system DNS** features both landed, giving sessions a way to survive transport errors and split-horizon resolvers like MagicDNS. The Windows experience remains the loudest open thread (#7547) with 57 comments and counting.

## 2. Releases

*No new releases in the last 24 hours.*

## 3. Hot Issues

| # | Title | Why it matters | Status | Link |
|---|-------|----------------|--------|------|
| **#7547** | [Windows] How do you use Pi on Windows? What issues are you seeing? | Triage megathread with **57 comments** — clearly the most-discussed topic in the repo, surfacing WSL, path, and terminal-keymap quirks. | OPEN | [earendil-works/pi#7547](https://github.com/earendil-works/pi/issues/7547) |
| **#5886** | AgentSession settlement/continuation and assistant-tail lifecycle bugs | Authored by mitsuhiko; meta-issue covering an entire class of post-run transcript continuation bugs. 11 comments, 4 👍. | OPEN | [earendil-works/pi#5886](https://github.com/earendil-works/pi/issues/5886) |
| **#6996** | Bug: Gemini 3.x models fail during tool use due to missing `thought_signature` | Caused breakages across an entire model family; closed once fixed, but high-signal because Gemini 3.x adoption is increasing. | CLOSED | [earendil-works/pi#6996](https://github.com/earendil-works/pi/issues/6996) |
| **#9052** | Fullscreen mode wheel scrolling is 3× slower than regular mode | Highlights a UX regression in the fixed-input-box fullscreen mode; 3 👍 for a clearly-felt pain. | OPEN | [earendil-works/pi#9052](https://github.com/earendil-works/pi/issues/9052) |
| **#8760** | OpenRouter `:free` models fail with 400 — `max_tokens` exceeds provider limit | Affects many free models; concrete fix is to clamp the catalog value. | OPEN | [earendil-works/pi#8760](https://github.com/earendil-works/pi/issues/8760) |
| **#8823** | Esc during streaming often fails to cancel until provider finishes | Reliability bug — users expect Esc to be hard-cancel. Fix shipped. | CLOSED | [earendil-works/pi#8823](https://github.com/earendil-works/pi/issues/8823) |
| **#9209** | GitHub Copilot GPT-6 Astra routed to unsupported Chat Completions | Triggered the routing fix in PR #9253. | CLOSED | [earendil-works/pi#9209](https://github.com/earendil-works/pi/issues/9209) |
| **#8643** | Bedrock: OpenAI models reject images nested in `toolResult.content` | Has a ready fix on a fork and a regression test; the contribution gate has historically blocked merging. | OPEN | [earendil-works/pi#8643](https://github.com/earendil-works/pi/issues/8643) |
| **#8826** | Cap agent retry backoff for prolonged transient outages | Backoff can grow unbounded under sustained `503`; cap is straightforward to add. | OPEN | [earendil-works/pi#8826](https://github.com/earendil-works/pi/issues/8826) |
| **#9229** | Windows: `shell_path` is ignored, prefers WSL bash even when WSL disabled | Concrete reproducible Windows config bug, shipped in a recent patch. | CLOSED | [earendil-works/pi#9229](https://github.com/earendil-works/pi/issues/9229) |

## 4. Key PR Progress

| # | Title | What it does | Status | Link |
|---|-------|--------------|--------|------|
| **#9253** | fix(ai): route Copilot GPT models through Responses (fixes astra) | Re-routes Copilot GPT-6 models off `/chat/completions`; future-proof for an empty GPT-4 catalog. | CLOSED (merged) | [earendil-works/pi#9253](https://github.com/earendil-works/pi/pull/9253) |
| **#9251 / #9249** | feat(coding-agent): hop to a fallback provider on transport errors | Opt-in fallback chain when the active provider hits DNS/timeout/connect-refused. **Closes #9242.** | CLOSED (merged) | [#9251](https://github.com/earendil-works/pi/pull/9251), [#9249](https://github.com/earendil-works/pi/pull/9249) |
| **#9252 / #9250** | fix(coding-agent): pin undici `connect.lookup` to `dns.lookup` | Fixes `ENOTFOUND` for MagicDNS/split-horizon hosts; pairs with #9244. | CLOSED (merged) | [#9252](https://github.com/earendil-works/pi/pull/9252), [#9250](https://github.com/earendil-works/pi/pull/9250) |
| **#9269** | fix(agent): end `agentLoop` stream with error result on loop rejection | Adds rejection handler so OAuth refresh / `convertToLlm` / `prepFn` failures surface instead of vanishing. | CLOSED (merged) | [earendil-works/pi#9269](https://github.com/earendil-works/pi/pull/9269) |
| **#9270** | fix(tui): stop `wordWrapLine` infinite recursion on unsplittable wide grapheme | Bounds recursion when `maxWidth=1` and segment is one emoji/CJK grapheme. | CLOSED (merged) | [earendil-works/pi#9270](https://github.com/earendil-works/pi/pull/9270) |
| **#9259** | feat(coding-agent): apply a steering message by interrupting the running turn | User corrections now take effect mid long-running tool calls rather than waiting for the turn to finish. | CLOSED (merged) | [earendil-works/pi#9259](https://github.com/earendil-works/pi/pull/9259) |
| **#9272** | fix(coding-agent): allow extensions to stream from custom providers | Exposes `stream`/`streamSimple` mirroring `complete`; fixes #8964. | CLOSED (merged) | [earendil-works/pi#9272](https://github.com/earendil-works/pi/pull/9272) |
| **#9261** | feat(ai): add `sendStrictToolField` compat flag | Lets Anthropic-compatible gateways (Bedrock proxies) accept strict `input_schema` without the `strict` field they reject. | CLOSED (merged) | [earendil-works/pi#9261](https://github.com/earendil-works/pi/pull/9261) |
| **#9077** | docs(coding-agent): document running pi in Docker Sandboxes | Adds a Docker Sandboxes section to `containerization.md`. Closes #8788. | CLOSED (merged) | [earendil-works/pi#9077](https://github.com/earendil-works/pi/pull/9077) |
| **#9179** | fix(coding-agent): reject tree navigation during compaction | Prevents races where navigation crosses compaction's branch rewrite. | CLOSED (merged, inprogress) | [earendil-works/pi#9179](https://github.com/earendil-works/pi/pull/9179) |
| **#9274** | fix(coding-agent): preserve indentation in rendered diffs | Edit tool's intra-line renderer drops indentation on inserted lines; adds regression test. | OPEN | [earendil-works/pi#9274](https://github.com/earendil-works/pi/pull/9274) |

## 5. Hot Discussions

**Ideas**
- **#9146** — *Per-repo override for API Key and ignore `auth.json`* — humphd wants a way to bypass the shared `auth.json` for individual repos (e.g. throwaway keys). 2 comments, 1 👍. [Discussion #9146](https://github.com/earendil-works/pi/discussions/9146)

## 6. Feature Request Trends

- **Cross-provider fallback / resilience.** #8826 (retry-backoff cap), #9242 (provider fallback chain), #9230 (OpenCode Go session header) all point at making long-running sessions robust against transient transport and protocol drift.
- **Per-provider reasoning controls.** #9016 (enable `reasoning_effort` for llama.cpp) and the `sendStrictToolField` PR (#9261) show a sustained push to surface per-request knobs for non-Anthropic, non-OpenAI providers.
- **Provider-native cost reporting.** #6881 — "use provider-reported cost when responses include it" — keeps gaining traction as a billing-accuracy improvement.
- **Cache-breakpoint optimization.** #9246 proposes spending Anthropic's unused 4th cache breakpoint on a stable conversation checkpoint — the first concrete attempt to lift Pi's prompt-cache hit rate.
- **Extension API surface.** #9272 (`stream`/`streamSimple` for custom providers), #9236 (acknowledged user-turn delivery), and #5732 (`allowCommands` in `sendUserMessage`) signal a coordinated push to formalize the extension contract.
- **Sandboxing & isolation.** #8788 / #9077 (Docker Sandboxes docs) plus #9247 (machine-readable failure classification for JSON/RPC) move Pi toward first-class sandbox runtimes.
- **OpenAI-compatible endpoint documentation.** #9271 proposes a worked example for Standard Compute in `models.md`.

## 7. Developer Pain Points

- **Windows ergonomics are the loudest recurring frustration** — `shell_path` being ignored (#9229), Shift+Enter submitting instead of inserting a newline (#7175), and the sprawling triage thread (#7547) all describe disjointed terminal/shell integration.
- **Provider routing bugs surface repeatedly** — Copilot `gpt-6-astra` Chat-vs-Responses mismatch (#9209, #9277), OpenRouter free models exceeding `max_tokens` (#8760), Claude Opus 5 via OpenRouter rejecting `output_config` (#9165), and Bedrock OpenAI models rejecting nested toolResult images (#8643). Each is small, but together they show that the model catalog churns faster than the routing layer.
- **TUI rendering glitches** — `wordWrapLine` infinite recursion (#9270), fullscreen scroll speed (#9052), destructive redraws that lose scroll position mid-task (#9240), fullscreen image clipping (#8306), Markdown images with empty alt hiding URLs (#9268), and resumed sessions re-rendering tool-result images at full size (#9256). All are "looks broken during real work" bugs that erode trust.
- **Reliability plumbing gaps** — `agentLoop` rejections going unhandled (#9269), uncapped exponential backoff (#8826), and Node fetch failing for system-DNS-only hosts (#9244) — devs want sessions that survive flaky networks rather than tearing down the turn.
- **Process friction around contributions** — #8643 explicitly notes "previously auto-closed per the contribution gate", echoing a developer pain that PRs targeting low-priority issues get shut before they can be reviewed.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-07

## Today's Highlights

The Qwen Code project pushed its second preview release of v0.23.1 alongside cua-driver-rs v0.20.4, with the headline feature being **visualization and management of dynamic workflow runs in Web Shell** (#10594). A critical P1 Windows issue surfaced showing the VS Code Companion extension leaking hundreds of headless `conhost.exe` processes over ~12h uptime, alongside several daemon session-management bugs causing wedged Web Shell sessions. Meanwhile, work continues on the broader ink → OpenTUI migration and prompt-cache preservation for deferred tools.

## Releases

- **[v0.23.1-preview.2](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.1-preview.2)** — Adds Web Shell visualization and management of dynamic workflow runs ([#10594](https://github.com/QwenLM/qwen-code/pull/10594)), plus performance work to derive the session workflow project.
- **[cua-driver-rs v0.20.4](https://github.com/QwenLM/qwen-code)** — Prebuilt Qwen CUA Driver binaries: codesigned + notarized macOS universal binary, unsigned Linux (x86_64/arm64, glibc 2.31+), and unsigned Windows UIAccess worker + native SDK payload.
- **[v0.23.0-nightly.20260906.92a8a8d179](https://github.com/QwenLM/qwen-code)** — Nightly tracking the same Web Shell workflow run visualization work.

## Hot Issues

1. **[#8662 — Migrate TUI rendering layer from ink to OpenTUI](https://github.com/QwenLM/qwen-code/issues/8662)** *(31 comments, P3 tracking)* — Long-running tracking issue to replace the heavily patched ink 7 + React 19 renderer with OpenTUI. Documents structural problems (flicker, etc.) that are hard to fix within ink.
2. **[#11119 — Background shell output and wake notifications silently dropped](https://github.com/QwenLM/qwen-code/issues/11119)** *(8 comments, P1, daemon/web-shell)* — In `qwen serve` Web Shell, background `run_shell_command` (e.g., CI polling) loses all output once the initiating turn ends, eventually wedging the session.
3. **[#11303 — Windows qwen-cli (VS Code Companion) leaks headless conhost.exe processes](https://github.com/QwenLM/qwen-code/issues/11303)** *(3 comments, P1)* — After ~12h uptime, a single qwen-cli had **347 leaked child processes holding ~2.8 GB RAM** that never release.
4. **[#8586 — Track activeWork and background Agent recovery](https://github.com/QwenLM/qwen-code/issues/8586)** *(9 comments, P2)* — Add an explicit `activeWork` fact to daemon health and build recovery paths for background Agents that outlive their foreground prompt or stop making progress.
5. **[#44 — 百炼收费陷阱 (Bailian billing complaint)](https://github.com/QwenLM/qwen-code/issues/44)** *(20 comments, closed)* — User reports being charged ¥11 for just a few Q&A requests; a recurring source of community frustration about pricing transparency.
6. **[#3361 — Agent misinterprets shell output as empty](https://github.com/QwenLM/qwen-code/issues/3361)** *(6 comments)* — Commands execute and produce visible output, but the agent concludes the output is empty (notably affects OpenAI-compatible API users).
7. **[#11272 — MCP stdio tool cancellation kills the MCP server (Channel mode)](https://github.com/QwenLM/qwen-code/issues/11272)** *(3 comments, P2)* — Cancelling a long-running MCP stdio tool from DingTalk Channel interactive cards kills the server process and never brings it back.
8. **[#10865 — Session workflow projection derived three times per render](https://github.com/QwenLM/qwen-code/issues/10865)** *(5 comments, P2)* — Performance follow-up: `SessionWorkflowCockpit.tsx` rebuilds a per-render index designed to be built once.
9. **[#10684 — First-class self-hosted semantic memory](https://github.com/QwenLM/qwen-code/issues/10684)** *(4 comments, P3)* — Bundle a local memory MCP server or add embedding-based recall to auto-memory, replacing the current keyword/title-based MEMORY.md recall.
10. **[#11118 — Sessions doing cron/goal/monitor work can never be reclaimed](https://github.com/QwenLM/qwen-code/issues/11118)** *(3 comments, P2, closed)* — `qwen serve` uses conflicting notions of "busy" between hold-set reporting and work that blocks settling, making idle session reclamation impossible for those workloads.

## Key PR Progress

1. **[#11207 — feat(serve): concurrent standalone daemons with session fencing](https://github.com/QwenLM/qwen-code/pull/11207)** — Lets updated daemons share `Conversations` while keeping #10924's mandatory single-writer lease per loaded session.
2. **[#10504 — feat(dingtalk): show dynamic lifecycle tags](https://github.com/QwenLM/qwen-code/pull/10504)** — Adds localized lifecycle reactions (👀 Thinking/Reading/Searching/Running/Editing/Retrying/Replying) to DingTalk messages without leaking raw tool I/O.
3. **[#11300 — fix(core): keep branch commits made by a failing post-checkout hook](https://github.com/QwenLM/qwen-code/pull/11300)** — Rollback now preserves a newly-created branch when a failing `post-checkout` hook already advanced it with commits.
4. **[#11262 — feat(web-shell): add unified session sources](https://github.com/QwenLM/qwen-code/pull/11262)** — Single Sources list merging uploaded files, workspace-file refs, and HTTP(S) links, with single-line rows and no duplicate display.
5. **[#10410 — feat(core): preserve prompt cache for deferred tools](https://github.com/QwenLM/qwen-code/pull/10410)** — Two-step bridge using `tool_search` to review a deferred tool's schema and `tool_call` to invoke it, keeping prompt-cache stable.
6. **[#10347 — feat(core): auto-retry transient network errors (EOF) where Ctrl+Y is unavailable](https://github.com/QwenLM/qwen-code/pull/10347)** — Treats wrapped low-level network failures (e.g., `400 network error ... EOF`) as retryable transport errors under the existing bounded auto-retry budget.
7. **[#11282 — feat(core): expand ${session_id} in per-provider customHeaders](https://github.com/QwenLM/qwen-code/pull/11282)** — Resolves `${session_id}` to `Config.getSessionId()` at request time, enabling per-conversation request headers for OpenAI-compatible gateways.
8. **[#11305 — feat(goal): size checkpoint verifier timeout for full claim list](https://github.com/QwenLM/qwen-code/pull/11305)** — Raises the Goal evidence-checkpoint verifier ceiling to 180 s, with a new `model.goalCheckpointTimeoutSeconds` setting (1–3600).
9. **[#10938 — feat(web-shell): make Session Workflow dependencies navigable](https://github.com/QwenLM/qwen-code/pull/10938)** — Closes navigation, shape, and docs gaps after #8583; the plan DAG now leads with the step rather than its status.
10. **[#11208 — feat(web-shell): continuous history and compact turn navigation](https://github.com/QwenLM/qwen-code/pull/11208)** — Adds bounded historical browsing and a Codex-style left rail with compact ticks, hover preview, and jump-to-turn.
11. **[#11302 — fix(build): remove heavy build/bundle from prepare hook](https://github.com/QwenLM/qwen-code/pull/11302)** *(bonus)* — `prepare` now only runs `husky` + `npm run generate`, eliminating redundant full builds on every `npm install`.

## Feature Request Trends

Distilled across the issue and PR backlog:

- **Web Shell / daemon UX** is the dominant theme: dynamic workflow visualization ([#10594](https://github.com/QwenLM/qwen-code/pull/10594)), unified sources ([#11262](https://github.com/QwenLM/qwen-code/pull/11262)), session-wide turn navigation ([#10750](https://github.com/QwenLM/qwen-code/issues/10750), [#11208](https://github.com/QwenLM/qwen-code/pull/11208)), and shared update state ([#11243](https://github.com/QwenLM/qwen-code/issues/11243)).
- **Background automation & agent lifecycle**: `activeWork` tracking and recovery ([#8586](https://github.com/QwenLM/qwen-code/issues/8586)), reclaimable sessions with cron/goal/monitor work ([#11118](https://github.com/QwenLM/qwen-code/issues/11118)), and channel ownership across scopes ([#11186](https://github.com/QwenLM/qwen-code/issues/11186)).
- **Smarter memory**: a first-class self-hosted semantic/embedding memory layer or bundled local MCP server ([#10684](https://github.com/QwenLM/qwen-code/issues/10684)).
- **OpenAI-compatible backend parity**: propagating `/effort` to non-native backends ([#11227](https://github.com/QwenLM/qwen-code/issues/11227)) and per-conversation `${session_id}` header templating ([#10995](https://github.com/QwenLM/qwen-code/issues/10995), [#11282](https://github.com/QwenLM/qwen-code/pull/11282)).
- **Configurable / declarative updates**: download base URL override for `qwen update` ([#11149](https://github.com/QwenLM/qwen-code/issues/11149)) and a compaction model for `/model` ([#6019](https://github.com/QwenLM/qwen-code/pull/6019)).
- **Decoupled Skill management in daemon** delivered as a sequence of sub-1000-line PRs ([#11274](https://github.com/QwenLM/qwen-code/issues/11274)).

## Developer Pain Points

- **TUI renderer instability** — ink 7 + React 19 requires a ~1037-line patch and still produces flicker; #8662 is the long-running tracking issue pushing toward OpenTUI.
- **Daemon session lifecycle bugs** — background shell output gets dropped ([#11119](https://github.com/QwenLM/qwen-code/issues/11119)), busy/idle definitions disagree ([#11118](https://github.com/QwenLM/qwen-code/issues/11118)), MCP stdio tools become unrecoverable after cancel ([#11272](https://github.com/QwenLM/qwen-code/issues/11272)), and the runtime can wedge — recurring daemon reliability concerns.
- **Resource leaks on Windows** — qwen-cli (VS Code Companion) leaking hundreds of headless `conhost.exe` processes ([#11303](https://github.com/QwenLM/qwen-code/issues/11303)) is the most severe new P1.
- **Billing transparency** — #44 (20 comments) and related threads show persistent user frustration with per-question pricing on Bailian.
- **OpenAI-compatible API gaps** — `/effort` not forwarded ([#11227](https://github.com/QwenLM/qwen-code/issues/11227)), shell output misinterpreted as empty ([#3361](https://github.com/QwenLM/qwen-code/issues/3361)), and no per-session header templating until [#11282](https://github.com/QwenLM/qwen-code/pull/11282).
- **Tool-scheduler race conditions** — pre-aborted requests stuck behind unrelated active batches ([#11146](https://github.com/QwenLM/qwen-code/issues/11146)) and silent cleanup skips on cancellation ([#11162](https://github.com/QwenLM/qwen-code/issues/11162)).
- **Build/UX friction** — `prepare` running full `build`+`bundle` on every `npm install` ([#11301](https://github.com/QwenLM/qwen-code/issues/11301), fixed in [#11302](https://github.com/QwenLM/qwen-code/pull/11302)); missing Git branch in CLI header/footer ([#1786](https://github.com/QwenLM/qwen-code/issues/1786)); mobile Web Shell session switching is janky ([#6181](https://github.com/QwenLM/qwen-code/issues/6181)).
- **CI fragility on macOS / Linux E2E** — frequent transient failures prompting bounded-retry patches ([#11134](https://github.com/QwenLM/qwen-code/pull/11134), [#11297](https://github.com/QwenLM/qwen-code/pull/11297), [#11306](https://github.com/QwenLM/qwen-code/pull/11306)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*