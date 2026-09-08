# AI CLI Tools Community Digest 2026-09-09

> Generated: 2026-09-08 23:30 UTC | Tools covered: 7

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

# AI CLI Tools Cross-Comparison Report — 2026-09-09

## 1. Ecosystem Overview

The AI coding-agent CLI market has matured into a crowded field of at least seven actively maintained tools spanning closed vendor products (Claude Code, Codex, Copilot CLI), big-tech open-source projects (Gemini CLI, Qwen Code), and independent open-source challengers (OpenCode, Pi). Competition has shifted decisively from core agent-loop capability toward **reliability engineering** — session resumption, context compaction, sandboxing, and runaway-agent protection dominate every issue tracker simultaneously. A second clear axis is **surface expansion**: nearly every vendor is wrapping its CLI core in desktop apps, web shells, SDKs, and extension frameworks, and those wrappers are today's dominant source of regressions. Finally, extensibility (plugins, skills, MCP, extension SDKs) is emerging as the primary differentiation battleground as model capability commoditizes.

## 2. Activity Comparison

| Tool | Issues (24h digest) | PRs (24h) | Discussions (24h) | Release Status |
|---|---|---|---|---|
| **Claude Code** | 10 hot issues | 1 | N/A* | **v2.1.265 shipped** (telemetry + plugin-dir) |
| **OpenAI Codex** | 10 hot issues | 10 (+3 noted) | 13 (4 ideas / 5 Q&A / 4 show-and-tell) | 2 alphas (rust-v0.154.0-alpha.7/.8) |
| **Gemini CLI** | 10 hot issues | 10 | N/A* | 3 releases (v0.59.0 stable, preview, nightly) |
| **Copilot CLI** | 10 (+6 tracked) | 4 | N/A* | v1.0.84-2 (Vim mode GA) |
| **OpenCode** | 10 hot issues | 10 | N/A* | None in last 24h |
| **Pi** | 10 hot issues | 10 (+4 noted) | 3 (show-and-tell) | None in last 24h |
| **Qwen Code** | 10 hot issues | 10 (+2 noted) | N/A* | 4 releases (v0.23.1, preview, SDK 0.1.9/0.1.10) |

\* *N/A = no discussion data surfaced for this period; not indicative of channel inactivity. Counts reflect items surfaced in each 24h digest (typically top-10 lists), not exhaustive GitHub totals.*

**Notable:** Claude Code's lone PR (#63686, stale timeout 14→90 days) reflects its issue-tracker-centric, closed-contribution model; its version number (2.1.**265**) implies the fastest underlying release cadence in the set. Codex is the only tool with a fully populated Discussions channel.

## 3. Shared Feature Directions

- **Session resume & continuity** — *Claude Code, Copilot CLI, Codex, OpenCode, Gemini CLI.* The single most universal pain class: Claude Desktop silently nulls `cliSessionId` (#92825) and kills background work on relaunch (#92687); Copilot resume triggers OOM (#4664), stale connection IDs (#4505), and killed MCP servers (#4753); Gemini's `/compress` doesn't survive resume (#21335); OpenCode users want session unarchive (#24153).
- **Sandbox & permission-model refinement** — *all seven tools.* Gemini is hardening filesystem boundaries (#29214); Codex's `workspace-write` DENY ACL blocks legitimate Git worktree writes (#32880); Copilot's `--yolo` state is non-deterministic (#4757, #4696); Qwen's pattern denies over-generalize (#11405); Claude Code infers permission into forbidden folders from unrelated statements (#92947).
- **Security hardening** — *Gemini CLI, Codex, Qwen, Pi, Copilot CLI.* Indirect prompt injection fixes (#29250), RFC 9207 OAuth issuer enforcement, unauthenticated `a2a-server` with hardcoded credentials (#29001), MCP OAuth refresh-token loops (#39054), and lost review hardenings landing on `main` (#11205).
- **Persistent memory / agent learning** — *Codex, Gemini CLI, OpenCode, Pi.* Codex's `/learn` + AGENTS.md "rule metabolism" RFC (#40575), Gemini's Auto Memory deterministic-redaction push (#26525), OpenCode's 144-comment Memory Megathread closing, Pi's Context Memory tracing experiment.
- **Usage & cost transparency** — *Codex, Pi, OpenCode.* Capacity errors despite available allowance (#43337), subscription-billed API asks (#43788), provider-reported billing costs (#6881), tokens/sec display (109👍, #5374).
- **Loop/runaway-agent protection** — *OpenCode, Gemini, Qwen.* 364 identical subagent `grep` calls (#45442), MAX_TURNS interruptions misreported as success (#22323), prompt-level anti-polling guidance (#48041).

## 4. Differentiation Analysis

- **Claude Code** — Enterprise surface expansion: Desktop/Cowork gateway telemetry (`user.email`/`user.groups`), folder-based plugin discovery, hooks automation. Pain concentrated in the Desktop wrapper, not the CLI core. Target: professional teams; issue-tracker-first community model.
- **OpenAI Codex** — Deepest infrastructure investment: Rust CLI rewrite in alpha cadence, voice-session metrics, Apps-tool live refresh, tracing everywhere. Strongest research-oriented community (self-evolving agents RFC) and largest backlog of high-👍 asks (LSP: 481👍). Windows is its loudest pain surface by far.
- **Gemini CLI** — Most security-forward: a full hardening wave (path traversal, injection, OAuth, atomic writes) plus strategic bets on zero-dependency OS sandboxing (#19873) and AST-aware tooling (#22745) — the only tool pair with Codex explicitly pursuing language-server grounding.
- **Copilot CLI** — GitHub/enterprise integration moat: Entra ID OAuth, managed policies, sandbox audit logging. Milestone-driven UX shipping (Vim mode GA closing a 76👍 request). Strong demand for model-provider extensibility (OpenRouter, #2943) it doesn't yet offer.
- **OpenCode** — Open, model-agnostic challenger in a performance-rehabilitation phase (CPU/OOM cluster) while pre-architecting v2 desktop as composable plugin packages (#47935–47948).
- **Pi** — Minimal-core, extension-first design for power users: broadest provider-protocol coverage push (Bedrock Mantle, Kimi wire format, Codex bearer tokens), explicit startup-latency SLOs (#7739), compaction correctness work. Highest ratio of deep, single-maintainer-quality contributions.
- **Qwen Code** — Embeddability focus: daemon/ACP architecture, Web Shell for third-party frontends, SDK release cadence, QR-based remote pairing (#11172), and dense multi-provider reasoning-effort presets (GPT-5/6, Kimi, Qwen, DeepSeek). Notable engineering rigor (16-round reviews, fork-pressure CI isolation).

## 5. Community Momentum & Maturity

- **Engagement leaders: Codex and OpenCode.** Codex posts the day's largest raw numbers (481👍 LSP request, 122👍 `/rewind` discussion, 46-comment WSL thread); OpenCode's Memory Megathread (144 comments/110👍) and CPU regression thread (51 comments) show a highly vocal user base actively co-debugging.
- **Release velocity: Claude Code and Qwen Code.** Claude Code's patch numbering implies near-continuous shipping; Qwen shipped 4 artifacts in 24h across CLI and SDK; Gemini runs a stable/preview/nightly pipeline.
- **Contribution-model split is decisive.** Open-source tools (Gemini, OpenCode, Pi, Qwen) show 10+ substantive PRs/day including external contributors; vendor repos show mostly internal/process PRs, concentrating community energy in issues.
- **Maturity signals:** Claude Code and Copilot exhibit enterprise-scale concerns (identity, telemetry, policy, triage lifecycle — note Claude's stale-timeout relaxation 14→90 days). Pi and Qwen show earlier-stage architectural definition; OpenCode is mid-transition. Gemini's proactive security PR wave, closing issues before exploitation, is the strongest engineering-hygiene signal of the set.

## 6. Trend Signals

1. **Session state is the new critical infrastructure.** Every tool's worst bugs this cycle involve resume, handover, or compaction corrupting conversation state. When evaluating tools, test the resume path under load first — it predicts real-world durability better than benchmark scores.
2. **Desktop wrappers around CLI cores are the systemic regression zone** (Claude Desktop, Copilot 1.1.15, OpenCode sidecar, Codex desktop). The CLI remains the most stable surface across all vendors.
3. **Sandboxing is converging on OS-level isolation, but over-reach is the new usability tax.** Expect tighter defaults and plan for legitimate-operation exemptions (Git worktrees, linked paths) in CI and agent policies.
4. **Windows is a second-class citizen industry-wide** — ConPTY leaks, WSL breakage, path-escaping bugs, MSIX failures, session lockouts. WSL-first workflows remain the pragmatic default.
5. **Quota/billing opacity is an emerging complaint class** (Codex capacity errors, Luna-vs-Astra accounting, provider-reported cost APIs in Pi). Cost observability will become a selection criterion.
6. **Provider-agnosticism and BYOK demand keeps rising** (OpenRouter into Copilot, Bedrock/Kimi/DeepSeek support in Pi and Qwen) — lock-in pressure from vendors is being actively resisted by communities.
7. **Memory systems are moving from prompt-heuristics to deterministic, auditable mechanisms** — treat any tool's "auto memory" without deterministic redaction and loop caps as immature for sensitive repos.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
*Data snapshot: 2026-09-09 · Source: github.com/anthropics/skills*

> **Note on data:** PR comment counts were not exposed in the source feed (all PRs show `Comments: undefined`). The PR list below is therefore ranked by the dataset's own ordering (which combines recency and engagement signals). Issue comment counts are complete and used for Issue-based analysis.

---

## 1. Top Skills Ranking — Most-Watched PRs

| # | PR | Skill / Topic | Status | Why it drew attention |
|---|---|---|---|---|
| 1 | [#1298](https://github.com/anthropics/skills/pull/1298) | **skill-creator: fix `run_eval.py` recall=0% bug** (also Windows stream reading, parallel workers) | OPEN | Fixes the canonical eval pipeline used to *optimize every skill's description*. With recall=0% the optimization loop has been training against noise for months (10+ reproductions of bug #556). Author MartinCajiao. |
| 2 | [#514](https://github.com/anthropics/skills/pull/514) | **document-typography** — typographic quality control (orphans, widows, numbering) | OPEN | Addresses a defect *every* Claude-generated document exhibits. High-leverage because it improves output quality across all skills that produce prose. |
| 3 | [#1615](https://github.com/anthropics/skills/pull/1615) | **scnet-hpc** — Slurm/SSH workflows for SCNet HPC clusters | OPEN | Brings HPC domain coverage (a major vertical) into the marketplace with profile-based cluster discovery. |
| 4 | [#83](https://github.com/anthropics/skills/pull/83) | **skill-quality-analyzer + skill-security-analyzer** marketplace additions | OPEN | Meta-skills for evaluating *other* skills. Signals the ecosystem is mature enough to need self-validation tooling. |
| 5 | [#486](https://github.com/anthropics/skills/pull/486) | **odt** — OpenDocument (.odt/.ods) read, write, template-fill | OPEN | Extends file-format coverage to the ISO-standard, LibreOffice ecosystem — a frequent user request. |
| 6 | [#210](https://github.com/anthropics/skills/pull/210) | **frontend-design** clarity/actionability rewrite | OPEN | Long-running revision to make every instruction concretely executable inside one conversation. |
| 7 | [#1628](https://github.com/anthropics/skills/pull/1628) | **Hivemind** — multi-agent orchestration using free headless opencode workers | OPEN | Proposes a cost-management pattern: expensive Claude stays as planner/reviewer, cheap workers handle mechanical work. |
| 8 | [#723](https://github.com/anthropics/skills/pull/723) | **testing-patterns** — Testing Trophy, unit/React/E2E guidance | OPEN | Comprehensive cross-stack testing skill; fills a known gap in developer-workflow coverage. |

---

## 2. Community Demand Trends (from Issues)

Ranked by comment volume:

- **🔒 Security & trust in the skills distribution model** — [#492](https://github.com/anthropics/skills/issues/492) (43 comments, the issue with the most engagement in the dataset) argues that community skills published under the `anthropic/` namespace create a trust-boundary vulnerability. The thread has outlasted nearly every other issue and is the de-facto top-of-mind concern.
- **Enterprise sharing workflows** — [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 8 👍) wants org-wide skill libraries in Claude.ai so teams stop circulating `.skill` files over Slack.
- **Reliability of the evaluation harness itself** — [#556](https://github.com/anthropics/skills/issues/556) (12 comments, 7 👍) — `run_eval.py` never triggers skills during eval. Directly motivates PR #1298, #1099, #1050.
- **Compact / symbolic agent state** — [#1329](https://github.com/anthropics/skills/issues/1329) (9 comments) proposes `compact-memory` to reduce the token cost of long-running agents' prose notes.
- **Plugin deduplication & hygiene** — [#189](https://github.com/anthropics/skills/issues/189) (6 comments, 9 👍) — `document-skills` and `example-skills` ship overlapping content; users hit duplicate-skills pollution.
- **Agent governance / safety patterns** — [#412](https://github.com/anthropics/skills/issues/412) (6 comments, closed without merge) — proposal for policy-enforcement, threat-detection, audit-trail patterns.
- **Reasoning Quality Gate Pipeline** — [#1385](https://github.com/anthropics/skills/issues/1385) (4 comments) — pre-task calibration → adversarial review → delivery verification; ties to PR #1367.
- **Context-window pressure from bundled skills** — [#1487](https://github.com/anthropics/skills/issues/1487) (4 comments) — `claude-api` eagerly injects ~156k tokens and exhausts context in one tool call.
- **Skills ↔ MCP interop** — [#16](https://github.com/anthropics/skills/issues/16) (4 comments) — expose skills as MCPs for portable agent APIs.
- **Cloud-platform parity** — [#29](https://github.com/anthropics/skills/issues/29) (4 comments) — Skills on AWS Bedrock remains unresolved.

**Recurring demand vectors:** *quality assurance tooling, security/trust boundaries, multi-agent & cost-control patterns, document/file-format breadth, org-level distribution.*

---

## 3. High-Potential Pending Skills

PRs still OPEN, recently active, and likely to land soon:

| PR | Skill | Why it's likely to merge |
|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator eval fix | Unblocks every skill that depends on `run_loop.py`; closes the canonical #556 bug. |
| [#1724](https://github.com/anthropics/skills/pull/1724) | mcp-builder → claude-sonnet-5 default | Mechanical model-ID refresh; very low risk. |
| [#1607](https://github.com/anthropics/skills/pull/1607) | claude-api retired-model cleanup | Doc-only fix removing four deprecated model IDs. |
| [#538](https://github.com/anthropics/skills/pull/538) + [#541](https://github.com/anthropics/skills/pull/541) + [#539](https://github.com/anthropics/skills/pull/539) | pdf/docx/skill-creator correctness fixes | Tight, well-scoped bug fixes from Lubrsy706; low reviewer friction. |
| [#1734](https://github.com/anthropics/skills/pull/1734) | Detect orphaned docx comments | Targeted defect detection; complements existing docx skills. |
| [#1595](https://github.com/anthropics/skills/pull/1595) | UIZZE partner skill listing | Partner-section addition; precedent exists. |
| [#1367](https://github.com/anthropics/skills/pull/1367) | self-audit v1.3.0 | Mechanical verification + reasoning quality gate; complements Issue #1385. |
| [#514](https://github.com/anthropics/skills/pull/514) | document-typography | Universal applicability; reviewed since March 2026. |
| [#83](https://github.com/anthropics/skills/pull/83) | quality + security analyzers | Meta-value is high; aligns with the #492 trust discussion. |

---

## 4. Skills Ecosystem Insight

> **The community's most concentrated demand at the Skills level is for a trustworthy quality-and-security layer around the skill ecosystem itself** — i.e. skills that *evaluate* skills (Issue #492's 43 comments + PRs #83, #1367, #1385, #1298, #556 all converge on this), reflecting that the marketplace has matured past "more skills" and is now asking "how do we trust, measure, and govern the skills we already have."

---

*Report generated from 20 PRs and 15 Issues in the 2026-09-09 snapshot. PR comment counts were unavailable in the source feed and have been inferred from update recency and engagement signals.*

---

# Claude Code Community Digest — 2026-09-09

## Today's Highlights
Claude Code shipped **v2.1.265**, expanding telemetry fields to include `user.email` and `user.groups` for the Desktop/Cowork gateway, and adding folder-based plugin discovery for `--plugin-dir`. The community signal today is dominated by **Desktop-app regressions**: the most-upvoted open issue (#92016) reports that Claude Desktop auto-denies the CLI-native `SendMessage` tool, breaking subagent resumption across the new "session-to-session" replacement. Several additional open issues describe **silent session-loss paths** in Desktop (nulled `cliSessionId`, stale filesystem views, killed background work on relaunch), suggesting that the Desktop surface area is the current center of gravity for bug reports.

## Releases
**v2.1.265** — [Release notes](https://github.com/anthropics/claude-code/releases)
- Telemetry sent via the Claude apps gateway (Claude Desktop and Cowork) now includes `user.email` and `user.groups`, matching terminal-session telemetry.
- `--plugin-dir` now accepts a folder of plugins; each child folder that contains a manifest is loaded, and additions/removals of children are picked up dynamically.

## Hot Issues

1. **[#92016](https://github.com/anthropics/claude-code/issues/92016)** — *OPEN · regression · 20 comments · 8 👍*
   Claude Desktop (macOS) auto-denies the CLI-native `SendMessage` tool, and the desktop "replacement" only covers session-to-session calls — breaking CLI-native subagent resumption. Highest comment volume and likes today; this is the most active community-reported regression.

2. **[#86829](https://github.com/anthropics/claude-code/issues/86829)** — *OPEN · has repro · 4 comments · 8 👍*
   VS Code extension chat-panel markdown links to files with **non-ASCII names** never open (the percent-encoded href is never decoded). High like-to-comment ratio suggests broad community agreement on the impact for non-ASCII repos.

3. **[#92825](https://github.com/anthropics/claude-code/issues/92825)** — *OPEN · data-loss · 2 comments*
   Desktop session transcripts silently become **permanently unavailable** — `cliSessionId` is nulled and there's no local recovery. Filed as a follow-up to #79044, indicating a cluster of related session-loss defects.

4. **[#92517](https://github.com/anthropics/claude-code/issues/92517)** — *OPEN · enhancement · 2 comments*
   Feature request to **pool plan usage across accounts** and share session context for small teams working on one project. Notable as a direction request rather than a bug.

5. **[#92687](https://github.com/anthropics/claude-code/issues/92687)** — *OPEN · has repro · 1 comment*
   On Linux over SSH, relaunching the Desktop app SIGTERMs the running `ccd-cli --resume`, silently killing in-flight background work. A second critical data-integrity path on the Desktop surface.

6. **[#92947](https://github.com/anthropics/claude-code/issues/92947)** — *OPEN · 1 comment*
   Claude **infers permission to touch an explicitly forbidden folder** from an unrelated general statement. Important for trust/safety framing of agentic permissions.

7. **[#91214](https://github.com/anthropics/claude-code/issues/91214)** — *OPEN · has repro · 1 comment*
   Desktop sessions read a **stale, isolated filesystem view** that never re-syncs — yet another "Desktop app diverges from disk reality" report.

8. **[#91731](https://github.com/anthropics/claude-code/issues/91731)** — *OPEN · regression · 1 comment · 1 👍*
   After an update, VS Code extension icons render as **blank squares** in Remote-SSH sessions on Linux. Regression tag suggests a recent change broke the icon asset path.

9. **[#80692](https://github.com/anthropics/claude-code/issues/80692)** — *OPEN · area:hooks · 1 comment · 1 👍*
   `EnterWorktree` should fire `CwdChanged` hooks — the absence breaks downstream hook chains that depend on directory context updates.

10. **[#89687](https://github.com/anthropics/claude-code/issues/89687)** — *OPEN/invalid · 6 comments*
    Windows Desktop MSIX updater force-registers into a live AppX container at quit, leaving the app **unlaunchable (0x80070020)** until sign-out. Despite the `invalid` label, the 6 comments indicate real Windows-Desktop update pain and a routing problem (this is filed against the Claude Code repo because there's no better public channel).

## Key PR Progress

Only one PR was updated in the last 24h, and it reflects process rather than product:

- **[#63686](https://github.com/anthropics/claude-code/pull/63686)** — Bumps the `stale` and `autoclose` timeouts in `scripts/issue-lifecycle.ts` and `scripts/sweep.ts` from **14 days to 90 days**. Contextually important: this explains why so many issues in today's digest are tagged `stale` and CLOSED despite recent community activity — the lifecycle policy is being relaxed to keep more reports alive long enough to be triaged.

## Hot Discussions
*No discussion data was provided for this period — section omitted.*

## Feature Request Trends
- **Multi-account / team pooling** — strongest directional signal in #92517: pooled plan limits attached to a project plus shared session context, aimed at small teams each running their own subscription.
- **Cross-surface session continuity** — recurring asks (#85932) to expose VS Code's human-readable session names in the CLI and to move sessions across project contexts.
- **Better hooks coverage** — #80692 wants `EnterWorktree` to emit `CwdChanged` so users can build reliable worktree-aware automation.
- **Plugin ergonomics** — v2.1.265's `--plugin-dir` folder-of-plugins behavior is implicitly aligned with community asks for simpler plugin distribution.

## Developer Pain Points
- **Desktop app session reliability is the dominant complaint.** Across #92016, #92825, #92687, #91214, and the earlier #78838, developers report that the Desktop surface silently drops, denies, or desyncs sessions in ways the CLI does not — and there is often no local recovery path.
- **Stale filesystem / sandbox views in Desktop** (#91214) — sessions appear to operate on an out-of-date snapshot, undermining trust in file-edit operations performed through Desktop.
- **Cybersecurity safeguard false positives** — multiple reports today (#85434, #85444, #85549, #85929) describe Opus 4.8 / Sonnet 5 blocking authorized work such as local storage breakdown, launcher-alias configuration, and benign Go code. This is a recurring, high-friction category that halts sessions.
- **Non-ASCII path handling in the VS Code extension** (#86829) — purely ASCII repos are an unrealistic assumption and the silent failure mode (click does nothing) is hard to debug.
- **Issue lifecycle churn** — the 14→90 day timeout bump in #63686 plus the volume of `stale` CLOSED issues today suggests developers feel reports are being closed before they're properly triaged.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest
**Date:** 2026-09-09

---

## Today's Highlights
The Codex team shipped two alpha cuts of the upcoming Rust CLI (`v0.154.0-alpha.7` and `alpha.8`) along with a dense batch of internal infrastructure PRs touching TUI metrics, sandbox permission helpers, shell-snapshot safety, and model catalog caching. On the community side, the long-standing **LSP integration** request crossed 480 👍 and 60+ comments, while Windows users continue to surface a wave of regressions in pets, WSL, Git writes, and Computer Use. A new RFC proposes turning Codex into a "self-evolving agent" via `/learn` and AGENTS.md rule metabolism.

---

## Releases
- **rust-v0.154.0-alpha.8** — Latest alpha pre-release of the Rust-based Codex CLI. ([release](https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.8))
- **rust-v0.154.0-alpha.7** — Prior alpha in the 0.154 series. ([release](https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.7))

> No published changelog summaries are available for these alphas; treat as unstable previews.

---

## Hot Issues

1. **[#8745] Built-in LSP support with auto-detect + auto-install** — 481 👍 / 64 comments. The single most upvoted feature request on the repo: users want Codex CLI to consume LSP diagnostics and symbol info for stronger code generation. [openai/codex#8745](https://github.com/openai/codex/issues/8745)

2. **[#41290] Windows WSL: project create/remove fails after switching Agent Environment to WSL** — 46 comments. A regression that breaks the core WSL workflow after toggling the agent environment. [openai/codex#41290](https://github.com/openai/codex/issues/41290)

3. **[#41513] Windows Pets: built-in & custom floating pets become click-through and un-draggable** — 33 comments. Reported across multiple desktop builds. [openai/codex#41515](https://github.com/openai/codex/issues/41513)

4. **[#43337] Account-specific capacity errors despite available weekly allowance** — 28 comments. Pro 20x users on `gpt-6-astra` and `gpt-5.6-luna` are seeing capacity rejections even when their allowance should permit work. [openai/codex#43337](https://github.com/openai/codex/issues/43337)

5. **[#40575] [RFC] Self-evolving agents via `/learn` and AGENTS.md rule metabolism** — 19 comments. A conceptual proposal for persistent, interactive instruction distillation that survives across sessions. [openai/codex#40575](https://github.com/openai/codex/issues/40575)

6. **[#43832] Windows: Claude Code fails to launch from Codex with "Access is denied"** — 12 comments. Cross-tool interop is breaking under the sandbox on Windows. [openai/codex#43832](https://github.com/openai/codex/issues/43832)

7. **[#39054] MCP OAuth: rejected refresh token stays "usable" → endless retry loop** — 11 comments. Reproduced across five CLI versions including `0.147.0` and `0.148.0-alpha.20`. [openai/codex#39054](https://github.com/openai/codex/issues/39054)

8. **[#41486] Windows: `Z:\AREA_01` is sent to the model as `Z:\AREA\_01`** — 9 comments. Pure client-side serialization bug; UI shows the right path, model context gets a corrupted one. [openai/codex#41486](https://github.com/openai/codex/issues/41486)

9. **[#32880] Windows desktop regression: Git writes blocked by `workspace-write` DENY ACL for linked worktrees** — 8 comments. Sandboxing over-broadly blocks linked-worktree Git operations. [openai/codex#32880](https://github.com/openai/codex/issues/32880)

10. **[#42088] `responses: function_call_output` emitted without `call_id` → 400 on strict upstreams** — 7 comments. Breaks compatibility with custom OpenAI-compatible endpoints (e.g., DeepSeek, llama.cpp Responses adapter). [openai/codex#42088](https://github.com/openai/codex/issues/42088)

---

## Key PR Progress

1. **[#43939] Add executor-context filesystem permission helpers** — Moves read-denial/glob resolution into an execution-host context so remote sandbox policies resolve paths correctly. [PR](https://github.com/openai/codex/pull/43939)

2. **[#43937] Tag TUI startup metrics with terminal & multiplexer categories** — Adds `terminal_name` and `multiplexer` to `codex.tui.start` for better instrumentation. [PR](https://github.com/openai/codex/pull/43937)

3. **[#43936] Stabilize subagent and unified-exec test fixtures** — Fixes flake-prone grandchild baseline tests and replaces sleep-based terminal output with newline-delimited stdin. [PR](https://github.com/openai/codex/pull/43936)

4. **[#43934] Track voice session lifecycle metrics in the TUI** — Emits `codex.voice.session.*` for starts, connections, failures, endings, and active duration. [PR](https://github.com/openai/codex/pull/43934)

5. **[#43930] Avoid Windows sandbox setup for irrelevant proxy port changes** — Skips elevated firewall reconfigs when neither side of a proxy change needs port-specific loopback rules. [PR](https://github.com/openai/codex/pull/43930)

6. **[#43927] Rename `thread_artifacts` → `thread_attachments` in state DB** — Schema migration to make the data model more semantically accurate. [PR](https://github.com/openai/codex/pull/43927)

7. **[#43925] Add cancellation for native user-verification RPCs** — Prevents a canceled proof from being delivered after outbound-queue drain. [PR](https://github.com/openai/codex/pull/43925)

8. **[#43921] Show streaming reasoning summaries in the TUI status row** — The status heading now tracks the latest usable reasoning line across tool activity, and restores after resume. [PR](https://github.com/openai/codex/pull/43921)

9. **[#43913] Add tracing for `AGENTS.md` discovery + filesystem sandbox operations** — Spans now record instruction byte limits and file-operation characteristics. [PR](https://github.com/openai/codex/pull/43913)

10. **[#43900] Propagate Apps tool refreshes to existing threads** — Live tool catalogs are pushed to clients so refreshed Apps become available on the next turn without a new thread. [PR](https://github.com/openai/codex/pull/43900)

> Honorable mention: **#43912** keeps Guardian reviewers on summary-based compaction (avoiding silent context rollover), and **#43909/#43907** harden shell snapshot capture/replay under credential brokerage — both relevant to sandbox-safety regressions users have been hitting.

---

## Hot Discussions

### 💡 Ideas
- **[#9618] `/rewind` or `/revert` feature** — 122 👍. Users compare Codex unfavorably to Claude Code/OpenCode for lack of safe undo. Strong, sustained demand for a first-class turn revert. [discussion](https://github.com/openai/codex/discussions/9618)
- **[#42965] Track source turn/window provenance for persisted world state** — Proposes tracking which turn/window produced a given persisted artifact. [discussion](https://github.com/openai/codex/discussions/42965)
- **[#43788] Usage transparency & a subscription-based API** — User wants predictable per-task cost estimates and an API tier that bills against the existing ChatGPT subscription. [discussion](https://github.com/openai/codex/discussions/43788)
- **[#43696] Wake-on-LAN from the mobile Remote app** — Convenience request to wake a desktop machine from the mobile client. [discussion](https://github.com/openai/codex/discussions/43696)

### ❓ Q&A
- **[#41714] How to change the default project root directory?** — No obvious way to set the default project root in the ChatGPT/Codex app. [discussion](https://github.com/openai/codex/discussions/41714)
- **[#43257] Do history lookups under experimental context management count against usage limits?** — A common, unanswered Pro user question. [discussion](https://github.com/openai/codex/discussions/43257)
- **[#42983] "Usage limits feel off" — Luna low burns quota at near-Astra-high rates** — A growing sentiment thread around quota accounting. [discussion](https://github.com/openai/codex/discussions/42983)
- **[#10045] Session isolation & per-session model configuration** — Answered: settings per thread do not isolate from prior sessions. [discussion](https://github.com/openai/codex/discussions/10045)
- **[#43911] AI analytical thinking / decision-making regressing in a card-game app** — Generic model-behavior question from a newer user. [discussion](https://github.com/openai/codex/discussions/43911)

### 🌟 Show and tell
- **[#16329] Awesome Codex CLI — curated list of 150+ ecosystem tools** — Subagents, skills, plugins, MCP servers in one place. [discussion](https://github.com/openai/codex/discussions/16329)
- **[#41642] Compact Context — a local five-file starting map for Codex** — MIT-licensed local router that proposes up to five likely files per turn. [discussion](https://github.com/openai/codex/discussions/41642)
- **[#43908] ManualMode — reserve real repo tasks for hands-on practice alongside Codex** — Pairs Codex with a small, human-owned implementation slot. [discussion](https://github.com/openai/codex/discussions/43908)
- **[#43891] macOS fix for the `SkyComputerUseService` spawn storm on Codex 26.820** — Confirms OpenAI shipped a fix in **26.901.51231**. [discussion](https://github.com/openai/codex/discussions/43891)

---

## Feature Request Trends
- **First-class turn revert / `/rewind`** — The single most consistently requested UX feature, now at 122 👍.
- **Native LSP integration with auto-install** — Long-standing, very high-demand enhancement that would unlock richer diagnostics and symbol awareness.
- **Self-evolving / persistent memory** — The `/learn` + AGENTS.md rule-metabolism RFC and related proposals point at durable, learned agent behavior across sessions.
- **Deeper Research / task-mode support** — A "native Deep Research" task type inside the Mac app & CLI (rather than just model selection).
- **Pricing & quota transparency** — Predictable cost estimates, clearer accounting for sub-models (e.g., Luna vs Astra), and subscription-billed API access.
- **Cross-tool & cross-platform polish** — Better Claude Code interop on Windows, fullscreen TUI mode, and Linux/Plasma/Wayland fixes.
- **Worktree / Git UX** — Git-init guidance before worktree creation, and sandbox rules that don't break linked worktrees.

---

## Developer Pain Points
- **Windows is the loudest pain surface.** In just 24h: WSL project create/remove broken, pets un-draggable, Computer Use event duplication, Git writes blocked, Claude Code launch denied, desktop reconnect loops, and a path-escaping bug corrupting model context.
- **Sandbox over-reach.** The Windows `workspace-write` DENY ACL blocks legitimate Git operations against linked worktrees; MCP OAuth refresh tokens loop forever because rejection is treated as a transient error.
- **Custom-model & strict-upstream compatibility.** Two separate bugs (`function_call_output` without `call_id`, `mcp__<server>__<tool>` rejected) break Codex against any non-OpenAI-compliant Responses endpoint — relevant to llama.cpp, DeepSeek, MiniMax-M3, and similar setups.
- **Opaque usage accounting.** Users on Pro / Pro 20x report quota being consumed in ways that don't match advertised model tiers (Luna low burning like Astra high; historic context lookups under "experimental context management").
- **No safe undo.** Without `/rewind` or `/revert`, every Codex turn is effectively a commit-or-keep decision, which materially affects willingness to let the agent run.
- **LSP-free default experience.** Without language-server awareness, Codex produces weaker symbol-grounded edits than competitors that ship first-class LSP integration.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-09

## Today's Highlights

Today's digest is dominated by **security hardening**. The release of **v0.59.0** and **v0.60.0-preview.0** ships with stricter sandbox filesystem isolation, RFC 9207 OAuth issuer enforcement, and improved web fetch validation, while a wave of new PRs targets path traversal, indirect prompt injection, and race conditions on parallel file writes. Meanwhile, the agent ecosystem continues to mature: longstanding issues around subagent hangs, browser agent failures, and Auto Memory reliability are all seeing active triage.

---

## Releases

- **[v0.59.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0)** — Stable. Includes nightly version bumps and a `core` fix (changelog truncated in source).
- **[v0.60.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-preview.0)** — Preview. Notable changes:
  - Improved destination validation and connection routing in web fetch utilities ([#29120](https://github.com/google-gemini/gemini-cli/pull/29120))
  - RFC 9207 issuer identification enforced in MCP OAuth flow
- **[v0.60.0-nightly.20260908.g85aca163f](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-nightly.20260908.g85aca163f)** — Nightly build continuing the 0.60 line.

---

## Hot Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — *Subagent recovery after MAX_TURNS is reported as GOAL success* (p1, 13 comments) — A critical correctness bug where `codebase_investigator` masks interrupted runs as successful, undermining trust in subagent termination reporting.
2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — *Generalist agent hangs* (p1, 8 comments, 8 👍) — A user-reported regression where deferring to the generalist agent freezes indefinitely even on trivial operations like folder creation.
3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — *Zero-Dependency OS Sandboxing & Post-Execution Intent Routing* (p2, 9 comments) — Strategic proposal to lean into Gemini 3's native bash affinity with proper OS-level sandboxing rather than exclusion-based tool restriction.
4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — *Assess the impact of AST-aware file reads, search, and mapping* (p2, 7 comments) — Epic evaluating AST-aware tooling (`tilth`, `glyph`) for more precise method-level reads and token-efficient codebase navigation.
5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** — *Gemini does not use skills and sub-agents enough* (p2, 6 comments) — Anecdotal but persistent frustration: the model ignores well-defined custom skills and sub-agents unless explicitly prompted.
6. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)** — *Add deterministic redaction and reduce Auto Memory logging* (p2, 5 comments, security) — Auto Memory's prompt-based secret redaction is insufficient since content already reaches the model before redaction; needs deterministic stripping.
7. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)** — *Shell command execution stuck with "Waiting input" after command completes* (p1, 4 comments, 3 👍) — Common UX bug where the CLI fails to detect command completion and hangs waiting for user input.
8. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** — *Browser subagent fails in Wayland* (p1, 4 comments) — Browser subagent reports `Termination Reason: GOAL` but fails on Linux/Wayland setups.
9. **[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)** — *`~/.gemini/agents/filename.md` not recognized as an agent if it's a symlink* (p2, 4 comments) — Limits how users can organize their agent configurations.
10. **[#29001](https://github.com/google-gemini/gemini-cli/issues/29001)** — *`a2a-server` HTTP API never enforces authentication; hardcoded public credentials* (p2, security) — High-severity: the A2A server advertises security schemes but doesn't actually enforce them, and ships with `valid-token` / `admin:password` literals.

---

## Key PR Progress

1. **[#29214](https://github.com/google-gemini/gemini-cli/pull/29214)** — `fix(sandbox): harden filesystem boundaries and isolate runtime state` (XL, open) — Replaces host directory mounts with sanitized config files and standardizes on realpath resolution during sensitivity checks. Major security hardening.
2. **[#29250](https://github.com/google-gemini/gemini-cli/pull/29250)** — `fix(core): prevent indirect prompt injection via build file modifications and untrusted flags` (XL, open) — Secures built-in tool paths (`shell`, `edit`) under restricted/workspace modes against indirect injection.
3. **[#29244](https://github.com/google-gemini/gemini-cli/pull/29244)** — `fix(core): make tool file writes atomic and serialize same-path writes` (L, open) — Fixes the silent data-loss race where two concurrent `replace` calls on the same file both report success.
4. **[#29249](https://github.com/google-gemini/gemini-cli/pull/29249)** — `fix(core): close sibling-prefix bypass in get_internal_docs path guard` (S, open) — Path traversal: the docs tool previously accepted sibling directories whose names *started with* the docs directory name.
5. **[#29247](https://github.com/google-gemini/gemini-cli/pull/29247)** — `fix(core): make isWithinRoot case-insensitive on Windows` (S/M, open) — Reuses `isSubpath()` so Windows path casing (`C:\` vs `c:\`) no longer breaks ACP/IDE routing.
6. **[#29248](https://github.com/google-gemini/gemini-cli/pull/29248)** — `fix(cli): avoid duplicate history and telemetry after confirmation` (M, open) — Prevents duplicate slash-command history entries when a user confirms an action like `/resume save <tag>`.
7. **[#29252](https://github.com/google-gemini/gemini-cli/pull/29252)** — `fix(core): preserve explicit versioned Flash model IDs` (M, closed/merged) — Stops silently remapping `--model gemini-3.5-flash@*` pins to the rollout default.
8. **[#29137](https://github.com/google-gemini/gemini-cli/pull/29137)** — `chore(deps): bump the npm-dependencies group with 77 updates` (XL, open) — Routine but large maintenance bump including `simple-git` → 3.36.0 and `@modelcontextprotocol/sdk` updates.
9. **[#29216](https://github.com/google-gemini/gemini-cli/pull/29216)** — `fix(cli): isolate settings directory in sandbox containers` (L, closed) — Prevents leaking host `~/.gemini` OAuth tokens into container sandboxes.
10. **[#29215](https://github.com/google-gemini/gemini-cli/pull/29215)** — `fix(core): enforce envelope metadata provenance for untrusted tool outputs` (L, closed) — System prompt update so MCP/external outputs are evaluated using verified envelope properties only, mitigating identity spoofing.

---

## Feature Request Trends

Reading across the open issues, the most-requested directions cluster into five themes:

- **AST-aware tooling** — Method-bounded reads, AST-aware search, and codebase mapping (`#22745`, `#22746`, `#19561`). The community sees AST as a path to fewer turns and lower token cost.
- **Sandbox & execution safety** — Zero-dep OS sandboxing, intent routing, restricted-mode hardening (`#19873`, `#22672`, indirect prompt injection mitigations).
- **Auto Memory quality & safety** — Deterministic redaction, inbox quarantine, retry cap, and overall quality tracking (`#26525`, `#26522`, `#26523`, `#26516`).
- **Subagent observability** — Visible trajectories via `/chat share`, subagent context in `/bug` reports, accurate termination status (`#22598`, `#21763`, `#22323`).
- **Agent self-awareness** — Correct CLI flag knowledge, hotkey accuracy, and the ability to instruct itself (`#21432`, `#21000`).

---

## Developer Pain Points

Recurring frustrations evident from the issue volume and bug cluster:

- **Subagent reliability** — Hangs, false `GOAL` success states, and generalist-agent deferral freezes are among the most-reported problems (`#22323`, `#21409`, `#21968`).
- **Browser agent fragility** — Wayland failures, ignored `settings.json` overrides, locked-profile recovery, and session takeover all remain pain points (`#21983`, `#22267`, `#22232`).
- **Stuck shell commands** — "Awaiting user input" after command completion breaks workflow on simple commands (`#25166`, `#22465` for vite interactive prompts).
- **Workspace hygiene** — The model litters `/tmp`-style scripts across random directories when sandboxed by exclusion (`#23571`).
- **Memory system trust** — Auto Memory's soft redaction, retry loop on low-signal sessions, and silent skip of invalid patches make it hard to rely on (`#26525`, `#26522`, `#26523`).
- **Path & filesystem security edge cases** — Symlink agents, Windows case-sensitivity, NTFS short names, and sibling-prefix bypasses all surface as real-world breakage (`#20079`, `#29247`, `#29116`, `#29249`).
- **Session persistence gaps** — `/compress` not surviving a resume; auto-memory model pinning remapped silently (`#21335`, `#29252`).
- **Tool count limits** — 400-tool limit produces hard 400 errors with no graceful degradation (`#24246`).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-09

## Today's Highlights
- **Vim mode ships in v1.0.84-2**, finally closing one of the oldest and most upvoted feature requests ([#13](https://github.com/github/copilot-cli/issues/13), 76 👍). The mode can be toggled with `/vim` or `editorMode: vim` in the composer.
- **A cluster of session-resume regressions** is causing significant friction in v1.0.83 / 1.1.15 desktop builds — OOM crashes ([#4664](https://github.com/github/copilot-cli/issues/4664)), MCP stdio timeouts ([#4753](https://github.com/github/copilot-cli/issues/4753)), stale connection IDs ([#4505](https://github.com/github/copilot-cli/issues/4505)), and "active workspace" lockouts ([#4742](https://github.com/github/copilot-cli/issues/4742), [#4756](https://github.com/github/copilot-cli/issues/4756)) are all trending.
- The WebSocket responses transport opt-out is now being formally documented ([PR #4770](https://github.com/github/copilot-cli/pull/4770)), giving users a clear escape hatch when WebSocket paths trigger `400 input item ID does not belong to this connection`.

---

## Releases

### [v1.0.84-2](https://github.com/github/copilot-cli) — 2026-09-08
**New**
- **Vim mode for the composer** is now generally available. Enable it interactively with `/vim` or set `editorMode: vim` in config. The current mode (normal/insert/visual) is displayed while typing. This closes the long-standing request in [Issue #13](https://github.com/github/copilot-cli/issues/13).

**Improved**
- On supported Windows sandbox policies, interactive shell commands now log blocked-access events, improving auditability of sandbox denials.

---

## Hot Issues

1. **[#13 — CLI input should have a vi/vim input mode (CLOSED)](https://github.com/github/copilot-cli/issues/13)** — 11 comments, **76 👍**. This was the canonical "vim mode" request; its closure with v1.0.84-2 marks a major UX milestone for keyboard-driven CLI users.
2. **[#4742 — Desktop 1.1.15 cannot create a 2nd Local session](https://github.com/github/copilot-cli/issues/4742)** — 10 comments. A regression after the 1.1.15 desktop auto-update blocks parallel Local (branch) sessions in the same project. High-impact for users running multiple concurrent sessions.
3. **[#4612 — Runaway FileWatch host-event loop freezes TUI / 13 GB log](https://github.com/github/copilot-cli/issues/4612)** — 9 comments. Long-running sessions can hit a tight debug loop that freezes the TUI and explodes log volume. Severity is high — process is unrecoverable without kill.
4. **[#4664 — JS heap OOM resuming long session](https://github.com/github/copilot-cli/issues/4664)** — 7 comments. Resuming large/old sessions crashes Node before the user can interact. Indicates missing streaming or chunked deserialization on session load.
5. **[#2861 — /compact fails with empty model response on Opus 4.6](https://github.com/github/copilot-cli/issues/2861)** — 6 comments. Manual `/compact` on Opus 4.6 fails three times in a row in short sessions. Tied to model output handling during context compaction.
6. **[#4756 — Windows app: must archive every idle project session to create a new Local session](https://github.com/github/copilot-cli/issues/4756)** — 5 comments, **19 👍**. Windows users are being forced into tedious cleanup workflows that aren't required elsewhere — friction with the new session-lock policy.
7. **[#4438 — `disable-model-invocation: true` makes a skill unreachable instead of manual-only](https://github.com/github/copilot-cli/issues/4438)** — 4 comments. Semantics for the `disable-model-invocation` frontmatter flag diverge from documented behavior; skills become silently unavailable rather than user-only.
8. **[#2943 — OpenRouter integration](https://github.com/github/copilot-cli/issues/2943)** — 3 comments, **14 👍**. A persistent, well-liked request to plug OpenRouter (and its catalog of models) into Copilot CLI the way Copilot Chat already supports.
9. **[#4753 — v1.0.83 session resume cancels in-flight stdio MCP connections](https://github.com/github/copilot-cli/issues/4753)** — 3 comments. The 1s timeout (down from 16s in 1.0.82) silently kills initializing MCP servers during the foreground-session handover. Easy to miss — servers simply appear absent.
10. **[#4505 — Resumed session retains stale connection item IDs after interrupted response](https://github.com/github/copilot-cli/issues/4505)** — 3 comments. Every prompt in a resumed session fails with `CAPIError: 400 input item ID does not belong to this connection`. `/fork` does not recover — points to a handover-time handshake gap.

**Honorable mentions worth tracking:** [#4582](https://github.com/github/copilot-cli/issues/4582) (Entra ID `AADSTS900144` from missing OAuth `scope`), [#4757](https://github.com/github/copilot-cli/issues/4757) (fail-closed bypass posture for accounts with no managed policy), [#3945](https://github.com/github/copilot-cli/issues/3945) (memories leaking across repos), [#4750](https://github.com/github/copilot-cli/issues/4750) (idle TUI hogging multiple CPU cores), [#4755](https://github.com/github/copilot-cli/issues/4755) (session wedges permanently when queued-lane message lands at turn end).

---

## Key PR Progress

1. **[PR #4770 — Document the WebSocket responses opt-out (OPEN)](https://github.com/github/copilot-cli/pull/4770)** — Adds user-facing docs for disabling the WebSocket responses endpoint, useful when networks block WSS or when the transport produces `400 input item ID does not belong to this connection`. Mirrors the live escape hatch behind a `--no-websocket` flag.
2. **[PR #4761 — install: report unsupported operating systems (CLOSED)](https://github.com/github/copilot-cli/pull/4761)** — Fixes `install.sh` misreporting `Windows detected but winget not found` on FreeBSD and other non-macOS/Linux platforms; now reports them as unsupported.
3. **[PR #4762 — install: report unsupported operating systems (CLOSED)](https://github.com/github/copilot-cli/pull/4762)** — A second, near-identical fix for the same FreeBSD-classification bug (likely superseded by #4761). Useful reference for the resolved error wording.
4. **[PR #4100 — shangti0168 (CLOSED)](https://github.com/github/copilot-cli/pull/4100)** — Tagged "安全性" (security). Merged quickly with no public discussion; watch release notes for the corresponding security note.

*(Only 4 PRs were updated in the last 24h; all are listed above.)*

---

## Feature Request Trends

Across issues, the strongest recurring themes are:

- **Editor / TUX ergonomics parity with desktop IDEs.** Vim mode (now shipped), collapsible output sections by type ([#1787](https://github.com/github/copilot-cli/issues/1787)), visible TODO list ([#1724](https://github.com/github/copilot-cli/issues/1724)) — users want the CLI TUI to feel like a modern IDE.
- **Model provider extensibility.** OpenRouter ([#2943](https://github.com/github/copilot-cli/issues/2943)) is the standout request, driven by users who want to use Copilot CLI with non-GitHub models.
- **Session and memory hygiene.** Compaction reliability on Opus 4.6 ([#2861](https://github.com/github/copilot-cli/issues/2861)), cross-repo memory leakage ([#3945](https://github.com/github/copilot-cli/issues/3945)), and resume-time OOM ([#4664](https://github.com/github/copilot-cli/issues/4664)) point to a need for first-class session lifecycle management.
- **MCP as a first-class subsystem.** MCP Profiles ([#2235](https://github.com/github/copilot-cli/issues/2235)), proper cancellation requests ([#4759](https://github.com/github/copilot-cli/issues/4759)), and reliable discovery ([#4773](https://github.com/github/copilot-cli/issues/4773)) indicate users are scaling beyond the "one MCP server" model.
- **Permissions and trust model clarity.** Fail-closed `--yolo` posture with no managed policy ([#4757](https://github.com/github/copilot-cli/issues/4757)) and allow-all resetting after idle ([#4696](https://github.com/github/copilot-cli/issues/4696)) show users want predictable, documented permission semantics.

---

## Developer Pain Points

- **Resuming a session is a minefield.** Between OOM crashes ([#4664](https://github.com/github/copilot-cli/issues/4664)), killed MCP servers ([#4753](https://github.com/github/copilot-cli/issues/4753)), stale connection IDs ([#4505](https://github.com/github/copilot-cli/issues/4505)), and orphaned state folders ([#2836](https://github.com/github/copilot-cli/issues/2836)), long-running workflows are fragile — and the failures are often silent.
- **The 1.1.15 desktop / 1.0.83 CLI combo introduced a wave of session-creation regressions** on Windows ([#4742](https://github.com/github/copilot-cli/issues/4742), [#4756](https://github.com/github/copilot-cli/issues/4756)) that force users into manual archiving just to start a new chat.
- **Resource leaks degrade idle sessions.** TUI CPU hogging ([#4750](https://github.com/github/copilot-cli/issues/4750)) and runaway 13 GB debug logs ([#4612](https://github.com/github/copilot-cli/issues/4612)) are blocking-class issues for users who leave sessions open across the day.
- **Permission state is non-deterministic.** `--yolo` quietly drops after idle ([#4696](https://github.com/github/copilot-cli/issues/4696)) and is unconditionally suppressed when no managed policy exists ([#4757](https://github.com/github/copilot-cli/issues/4757)). Developers can't reason about what mode they're in.
- **Config and skill discovery are leaky.** Repo-root `.github/hooks/*.json` is silently ignored ([#4520](https://github.com/github/copilot-cli/issues/4520)), non-repo-root working directories fail to load `.mcp.json` ([#4765](https://github.com/github/copilot-cli/issues/4765)), `disable-model-invocation: true` breaks skills in unintended ways ([#4438](https://github.com/github/copilot-cli/issues/4438)), and `copilot skill list` reports "Found 0 tools" for already-loaded namespaces ([#4773](https://github.com/github/copilot-cli/issues/4773)) — each individual issue is small, but the cumulative effect is a config layer that feels unreliable.
- **MCP + multi-model edge cases.** Gemini rejecting union-typed array `items` schemas ([#4623](https://github.com/github/copilot-cli/issues/4623)) and Entra ID OAuth misalignments ([#4582](https://github.com/github/copilot-cli/issues/4582)) show cross-model and cross-IDP integrations need dedicated testing tracks, not best-effort handling.

---

*Generated from the last 24h of activity on `github/copilot-cli`. No discussion data was available for this period; the Hot Discussions section is omitted.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-09

## Today's Highlights

Today's activity is dominated by reliability and performance concerns rather than new releases. The closure of the **Memory Megathread** (#20695, 144 comments / 110 👍) marks a notable milestone for OpenCode's long-running memory investigation, while **high-CPU regressions** across the TUI and desktop sidecar (V8 OOM) continue to generate new bug reports. On the feature side, a maintainer-led push to refactor the desktop app into plugin packages (Review, Files, Browser, Context Usage) is in flight, signaling a structural cleanup of the desktop codebase ahead of v2.

## Releases

No new releases published in the last 24 hours.

## Hot Issues

1. **[#20695](https://github.com/anomalyco/opencode/issues/20695) — Memory Megathread (CLOSED)** — thdxr. The single most engaged issue (144 comments / 110 👍). Centralizes scattered memory leak reports and is now closed, suggesting the maintainers have enough heap snapshots to act on. Keep an eye on follow-up PRs.

2. **[#30086](https://github.com/anomalyco/opencode/issues/30086) — High CPU usage in newer versions (OPEN)** — 51 comments / 27 👍. Reports CPU spikes severe enough that "3 sessions" now strain a system that previously ran 10+. Likely overlaps with #42306 below.

3. **[#37012](https://github.com/anomalyco/opencode/issues/37012) — Keep legacy layout option (OPEN)** — 43 comments / 47 👍. Strong up-vote-to-comment ratio indicates broad user preference for the old sidebar-first layout vs. the newer nested navigation.

4. **[#5374](https://github.com/anomalyco/opencode/issues/5374) — Feature: Show tokens/second (OPEN)** — 21 comments / 109 👍. Highest like-to-comment ratio in the issue set; users clearly want provider/throughput comparisons at a glance.

5. **[#26220](https://github.com/anomalyco/opencode/issues/26220) — Infinite loop after tool calls complete (OPEN)** — 11 comments. Zen/"big-pickle" branch hits a stuck-after-tools state that burns context. Related family of issues is multiplying.

6. **[#45442](https://github.com/anomalyco/opencode/issues/45442) — [2.0] Subagent infinite loop of identical tool calls (OPEN)** — A `general` subagent issued 364 identical `grep` calls over ~50 minutes. Concrete evidence that v2 still lacks loop protection.

7. **[#24153](https://github.com/anomalyco/opencode/issues/24153) — Feature: Unarchive/restore for archived sessions (OPEN)** — 10 comments / 11 👍. One-way archive is biting users; a restore primitive is requested.

8. **[#42306](https://github.com/anomalyco/opencode/issues/42306) — TUI main thread ~100% CPU redraw (OPEN)** — Confirmed via `strace`: the TUI main thread holds a full core with no user activity. Concrete reproduction for the wider "high CPU" theme.

9. **[#41964](https://github.com/anomalyco/opencode/issues/41964) — Desktop sidecar V8 OOM crashes (OPEN)** — Windows desktop sidecar repeatedly OOMs, leaving the local server red and sessions inaccessible.

10. **[#40747](https://github.com/anomalyco/opencode/issues/40747) — `opencode run` hangs on quota exhaustion (OPEN)** — Despite the error being known within ~170 ms internally, the process hangs indefinitely. Clean fix candidate.

## Key PR Progress

1. **[#48041](https://github.com/anomalyco/opencode/pull/48041) — fix(core): discourage polling background shell commands** — Strengthens prompt guidance to avoid `sleep`-and-`tail` polling loops; a direct mitigation for issues like #45442.
2. **[#48040](https://github.com/anomalyco/opencode/pull/48040) — refactor(cli): remove console command** — thdxr removes `opencode2 console` and its login handler; cleanup aligned with the v2 CLI surface.
3. **[#48037](https://github.com/anomalyco/opencode/pull/48037) — fix(server): reject malformed message cursors** — Closes #48034 by switching pagination decoding to Effect's strict Base64URL, preventing silent acceptance of malformed cursors.
4. **[#48039](https://github.com/anomalyco/opencode/pull/48039) — fix(plugin): normalize promise API inputs** — Normalizes Promise plugin requests through JSON to match the generated client boundary; adds an integration test for `session.create`.
5. **[#47935](https://github.com/anomalyco/opencode/pull/47935) — feat(plugin): explore desktop extensions and manager** — Foundational work introducing a desktop extension SDK, settings panel, and host-owned slots.
6. **[#47947](https://github.com/anomalyco/opencode/pull/47947) — refactor(app): extract review and file viewer extension** — Pulls Git review, file trees, diffs, and line comments into `@opencode/plugin-review-desktop`.
7. **[#47948](https://github.com/anomalyco/opencode/pull/47948) — refactor(app): extract context usage extension** — Moves the context-usage button, stats, system-prompt display, and export into `@opencode/plugin-context-desktop`.
8. **[#47936](https://github.com/anomalyco/opencode/pull/47936) — refactor(desktop): extract the browser extension package** — Draft application of the extension SDK pattern; isolates the embedded browser from the host app.
9. **[#48031](https://github.com/anomalyco/opencode/pull/48031) — fix(app): reveal scrollbar in settings dialog panels** — Closes #34108 by replacing `scrollbar-width: none` with a styled but visible scrollbar.
10. **[#47783](https://github.com/anomalyco/opencode/pull/47783) — docs: add Persian (fa) README translation** — Adds `README.fa.md` and links `فارسی` into the language nav (closes #47775). Continues the documentation internationalization effort.

## Hot Discussions

No discussion data was provided for this digest.

## Feature Request Trends

- **Observability / performance introspection:** #5374 (tokens/second) is the standout, with 109 likes — users want first-class throughput metrics to compare providers.
- **Layout / UX continuity:** #37012's request for a legacy layout option indicates broad dissatisfaction with the new navigation model.
- **Session lifecycle:** #24153 (unarchive/restore) and #7262 (auto-generated titles regression) point to gaps in session management.
- **Cross-platform parity:** #27659 (custom/MCP tool output in desktop) and #27837 (web UI session list) show repeated demand to bring desktop/web up to TUI capabilities.
- **Desktop extensibility:** The cluster of PRs #47935/#47947/#47948/#47936 is laying groundwork for a real extension ecosystem — likely to surface as user-facing features soon.
- **Internationalization:** The new Persian README (#47783) continues a steady stream of localization contributions.

## Developer Pain Points

- **Performance regressions are the dominant frustration.** Multiple issues converge on the same theme — high idle CPU (#30086, #42306), V8 OOM on desktop (#41964), hangs on quota (#40747), and infinite tool-call loops (#26220, #45442). Together they paint a picture of a client that is increasingly resource-hungry in recent versions.
- **Loop protection is missing or inconsistent.** Subagents can repeat identical tool calls for tens of minutes with no breaker; even synchronous spawn failures (#41301, recently closed) left sessions busy.
- **Session reliability.** Silent SSE drops (#41299), stuck "busy" sessions, missing Content-Type handling (#47605), and one-way archive together degrade trust in long-running sessions.
- **Configuration fragility.** Unknown config fields silently load (#41319), `config.model` silently overrides the TUI-selected model (#47968), and workspace model IDs get double-prefixed (#47690). The config surface needs stricter validation.
- **Desktop/server drift.** Bugs like session list empty in web (#27837), custom icon not persisting (#32708, #34301), default `vlocal` password unknown (#34752), and post-update "unexpected server error" (#48042) suggest the desktop wrapper still lags behind server behavior.
- **Provider/model glue.** Provider-specific failures (Deepseek image input #47994, Nemotron 3.5 #47976, regional blocks #47971, thinking-budget for Anthropic #48019) and silent fallback routing (#47968) indicate fragile provider integrations.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-09

## Today's Highlights
The day's activity centers on **provider stability and protocol expansion**: a major proposal to add `amazon-bedrock-mantle` as an OpenAI-compatible Bedrock provider (#5363) gained the strongest community traction (👍15, 19 comments), while two high-impact bug clusters were closed out — Codex WebSocket reliability (#7444, #8125) and streaming cancellation (#8823). On the contribution side, Anthropic OAuth usage reporting (#9345) and provider-reported billing cost (#6881) advance subscription UX, and a wave of small UI fixes (#9316, #9344, #9310, #9319) ship together.

## Releases
No new releases in the last 24h.

## Hot Issues

1. **[#5363](https://github.com/earendil-works/pi/issues/5363) — Add `amazon-bedrock-mantle` provider (OPEN, in progress)**
   The existing `amazon-bedrock` provider only speaks Converse; Mantle models expose an OpenAI-compatible Responses endpoint at `bedrock-mantle.{region}.api.aws/openai/v1/responses`. 19 comments and 15 👍 make this the day's highest-engagement thread — Bedrock users want Mantle coverage.

2. **[#7444](https://github.com/earendil-works/pi/issues/7444) — Codex WebSocket retry only handles two error codes (CLOSED)**
   Any `response.failed` other than `previous_response_not_found` / `websocket_connection_limit_reached` hard-aborts the turn instead of retrying. Fixed for transient failures.

3. **[#8823](https://github.com/earendil-works/pi/issues/8823) — Esc during streaming fails to cancel request (CLOSED)**
   Esc registered the abort, but the HTTP request kept streaming until the provider finished naturally — wasting tokens and time. Now reliably cancels.

4. **[#9052](https://github.com/earendil-works/pi/issues/9052) — Fullscreen scroll wheel 3× slower than inline mode (OPEN)**
   Users migrating from inline TUI to fullscreen (for the fixed input box) hit a major scroll regression. 3 👍 confirms the pain.

5. **[#7445](https://github.com/earendil-works/pi/issues/7445) — `openai-responses` ties developer role to `model.reasoning` (OPEN, in progress)**
   Pi emits `context.systemPrompt` as `developer` only when `model.reasoning` is true, overriding `supportsDeveloperRole: true`. Breaks OpenAI providers that want the `developer` role on non-reasoning models.

6. **[#5152](https://github.com/earendil-works/pi/issues/5152) — Codex websocket with bearer tokens via `models.json` (CLOSED, no-action)**
   Pi assumes the Codex token is a JWT and tries to extract `chatgpt_account_id`, blocking third-party Codex-compatible providers that use plain bearer auth.

7. **[#5581](https://github.com/earendil-works/pi/issues/5581) — `pi.sendMessage({ triggerTurn: true })` bypasses `before_agent_start` (OPEN, bug)**
   Custom messages with `triggerTurn` call `_runAgentPrompt` directly instead of `prompt()`, so input-rewriting/blocking extensions never see them. Affects extension authors.

8. **[#9212](https://github.com/earendil-works/pi/issues/9212) — sonnet-5 via Vercel AI Gateway: 13% of edit tool calls truncated (CLOSED)**
   18 of 134 edits in a week arrived as `{"path":"...","edits":[{}]}`. `fable` showed 0%. Real provider inconsistency users need to know about.

9. **[#7739](https://github.com/earendil-works/pi/issues/7739) — Set a startup-time budget targeting jcode-comparable latency/memory (OPEN)**
   Formal proposal: close the startup-perf gap measured by jcode's README benchmark against pi 0.62.0. Treats launch latency as a tracked SLO.

10. **[#8919](https://github.com/earendil-works/pi/issues/8919) — Fullscreen mode reserves a blank line for zero-row custom footers (CLOSED)**
    `pi.ui.setFooter` with zero rows still occupies one row in fullscreen because `minSize: 1` is hardcoded. Inline mode handled it correctly.

## Key PR Progress

1. **[#9351](https://github.com/earendil-works/pi/pull/9351) — Fix edit preview flicker on remote edits (OPEN)**
   When the edit tool uses injected remote ops, the tool row briefly flashes a local "Could not edit file" error before the remote diff replaces it. Smooths the UI.

2. **[#9350](https://github.com/earendil-works/pi/pull/9350) — Fork-free executable lookup (CLOSED)**
   `findExecutableOnPath()` (spawns `which`) and `commandExists()` (spawns `<cmd> --version`) could deadlock multi-threaded processes on Android under low-memory. Replaces with in-process lookups.

3. **[#9347](https://github.com/earendil-works/pi/pull/9347) / [#9346](https://github.com/earendil-works/pi/pull/9346) — Gondolin `undici` security bump + stale hook cleanup (CLOSED)**
   Updates Gondolin's `undici` 6.27.0 → 6.28.0 (moderate CVE) and removes the stale `packages/web-ui/*` pre-commit hook pattern.

4. **[#9345](https://github.com/earendil-works/pi/pull/9345) — Expose Anthropic OAuth usage reports (CLOSED)**
   Adds `Models.getUsageReport("anthropic")` with a 5-minute token-partitioned cache, in-flight dedupe, and `GET /api/oauth/usage`. Sets up a provider-neutral usage-report interface.

5. **[#6881](https://github.com/earendil-works/pi/pull/6881) — Use provider-reported cost when available (OPEN, in progress)**
   When responses include `usage.cost` (and `cost_details.upstream_inference_cost` for BYOK), use it for `usage.cost.total` instead of catalog rates. Falls back to `calculateCost` unchanged.

6. **[#9344](https://github.com/earendil-works/pi/pull/9344) — Owner-safe interactive UI overrides (CLOSED)**
   Themes/footers/editors now have object-identity owners; stale releases no longer change the active override, and explicit theme selection clears temporary ownership.

7. **[#9341](https://github.com/earendil-works/pi/pull/9341) — Runtime dependency updates (CLOSED, by mitsuhiko)**
   Updates `minimatch` and other runtime deps while keeping `diff`/`openai`/`highlight.js`. Regenerates root lockfile, coding-agent shrinkwrap, and installer lock.

8. **[#9337](https://github.com/earendil-works/pi/pull/9337) — Bound Case 3 compaction estimate + fix context-usage display (CLOSED)**
   Ports three compaction/display fixes from a downstream fork onto upstream `main` so they ship in official releases.

9. **[#9329](https://github.com/earendil-works/pi/pull/9329) / [#9307](https://github.com/earendil-works/pi/pull/9307) — Recognize Orca terminal capabilities (OPEN)**
   `TERM_PROGRAM=Orca` was treated as unknown, so OSC 8 hyperlinks expanded to text and images fell back. Adds Orca to the Kitty-image/true-color/OSC-8 capable set.

10. **[#9316](https://github.com/earendil-works/pi/pull/9316) — Three easy fixes: #8919, #8717, #8720 (CLOSED)**
    Bundles zero-row fullscreen footer (#8919) plus two more small TUI fixups for review convenience.

Also worth noting: **[#8635](https://github.com/earendil-works/pi/pull/8635)** preserves aborted stop reason during lazy stream setup (fixes #8409); **[#9319](https://github.com/earendil-works/pi/pull/9319)** guards optional `MouseRegion.invalidate()` for extension-supplied components; **[#9310](https://github.com/earendil-works/pi/pull/9310)** clears mouse selection on session switch; **[#8627](https://github.com/earendil-works/pi/pull/8627)** makes extension-registered `read/write/edit` tools resolve paths against `ctx.cwd`.

## Hot Discussions

**Show and tell**
- **[#8803 — pi-verdict: minimal permission gate for pi](https://github.com/earendil-works/pi/discussions/8803)** — A Claude Code "auto mode" style allow/ask/deny gate as a single-file extension, addressing pi's deliberate lack of permission popups.
- **[#9327 — Eco Coding: GUI for Pi](https://github.com/earendil-works/pi/discussions/9327)** — Open-source desktop GUI on top of pi's agent loop, featuring a vision split, teams, browser, computer-use, and mobile.
- **[#9312 — Pi Context Memory experiment](https://github.com/earendil-works/pi/discussions/9312)** — Tracing post-compaction decisions back to the original conversation so the agent can re-explain *why* an earlier choice was rejected.

## Feature Request Trends

- **Provider & protocol coverage** is the loudest thread: Bedrock Mantle (#5363), Kimi Responses wire format (#9338), Codex bearer tokens via `models.json` (#5152), and Anthropic OAuth usage reports (#9345) all ask for first-class support for providers Pi doesn't yet handle natively.
- **Billing transparency**: both #9345 (Anthropic usage reports) and #6881 (use provider-reported cost) push toward surfacing real spend rather than catalog estimates.
- **Extension API maturity**: idempotent acknowledged user-turn delivery (#9236), extension events for window focus/blur (#2924), `before_agent_start` parity for `triggerTurn` (#5581), and cwd-sensitive tool paths via `ctx.cwd` (#8627) all extend what extensions can build.
- **Startup / runtime performance budgets**: #7739 explicitly proposes treating launch latency and memory as tracked SLOs.
- **Fullscreen TUI polish**: zero-row footers (#8919), slower wheel (#9052), compaction-block click-to-expand (#9356), hardware cursor stability (#9339) — fullscreen mode is getting real adoption and its rough edges are surfacing.

## Developer Pain Points

- **Provider-specific silent failures**: Sonnet-5 tool-call truncation (#9212), GLM forced-thinking leakage (#8706), Mistral reasoning on non-reasoning models (#8700), Z.AI `thinking` format mismatches — these don't throw cleanly and corrupt agent state.
- **WebSocket / streaming reliability**: Codex WebSocket retry gaps (#7444), transient WS failure pinning sessions to SSE (#8125), Esc not actually cancelling in-flight HTTP (#8823) — long-running agent turns are fragile.
- **Compaction correctness**: stale `CompactionEntry` placement bricks sessions with `unexpected tool_use_id` (#8667), `AgentSession.abort()` can still kick off auto-compaction (#9340), Case 3 estimate unbounded (#9337) — compaction is the highest-risk code path.
- **Extension authoring friction**: `pi.sendMessage({ triggerTurn: true })` skipping `before_agent_start` (#5581), `steer`/`follow_up` RPC not firing `input` event (#8718), `MouseRegion.invalidate()` crashing on extension components without that method (#9319).
- **Config management**: read-only `~/.pi/agent` can't even read credentials because locks are taken on reads (#6406); `lastChangelogVersion` polluting git-tracked `settings.json` (#6415); mixing pi-managed and user-managed settings (#4212).
- **Terminal / TUI UX drift**: UI jumbling on resize (#9357), hardware cursor drift on WezTerm (#9339), Orca unknown capabilities (#9329/#9307), variable WebSocket recovery semantics.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-09

## Today's Highlights

Qwen Code shipped **v0.23.1 stable** alongside SDK TypeScript **v0.1.10**, with the headline breaking change being the retirement of `@qwen-code/webui`. A preview **v0.23.2-preview.0** follows immediately to isolate subprocess-heavy E2E from fork pressure. The biggest community focus remains a critical **Windows ConPTY process leak** affecting the VS Code companion, with multiple linked issues (#11303, #11352) tracing the defect to `@lydell/node-pty` 1.2.0-beta.10.

---

## Releases

- **[v0.23.1](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.1)** — Stable release featuring the retirement of `@qwen-code/webui` (#9812) and `feat(web-shell): visualize and manage dyna…` enhancements. Bundled in the latest SDK releases with managed-memory and prompt-cache fixes.
- **[v0.23.2-preview.0](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.2-preview.0)** — Preview cut containing CI fix #11388 (isolate subprocess-heavy E2E from fork pressure).
- **[sdk-typescript-v0.1.10](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.10)** — Bundles CLI 0.23.1; honors `memory.enableManagedAutoMemory` setting (#6941) so hosts that disable managed auto memory no longer see remember/dream requests admitted.
- **sdk-typescript-v0.1.9** — Immediately prior SDK release, also bundling CLI 0.23.0 with the same managed-memory and prompt-cache (#8464) fixes.

---

## Hot Issues

1. **[#11303](https://github.com/QwenLM/qwen-code/issues/11303) — [P1] Windows ConPTY process leak (10 comments)**
   `qwen-cli` in the VS Code Companion leaks headless `conhost.exe` processes; 347 children / ~2.8 GB after ~12 h uptime. Highest-impact open bug of the cycle and the reason the maintainer split out #11352.

2. **[#11205](https://github.com/QwenLM/qwen-code/issues/11205) — [P2] Filter screen on main lost six hardenings**
   A 16-round review of a content-filter screen in #10421 was bypassed when #9742's independently-written version landed verbatim; raises concerns about read order, EACCES, U+FFFD handling, spawn timeouts, candidate cap, and retention.

3. **[#11335](https://github.com/QwenLM/qwen-code/issues/11335) — [P3, CLOSED] Web Shell transcript column drift**
   In `qwen serve`, the transcript content column drifts half a rail-width off the composer axis once the turn-navigation rail becomes visible. Quickly closed after a known CSS fix path.

4. **[#11410](https://github.com/QwenLM/qwen-code/issues/11410) — [P1] Local models broken after Windows 11 update**
   LM Studio / local model connections throw `API Error 400` on v0.23.1 after a recent Windows 11 update; multiple users likely affected and ready-for-human triage.

5. **[#11405](https://github.com/QwenLM/qwen-code/issues/11405) — [P2] Denied tool pattern over-generalizes**
   A pattern-based deny (e.g. `Bash(npm view *)`) makes the model treat the entire tool family as forbidden, producing broken recovery loops.

6. **[#11394](https://github.com/QwenLM/qwen-code/issues/11394) — [P2] SDK TS docker E2E leg shares `QWEN_HOME`**
   Memory prefetch consumes fake-server scripted responses, causing 15/20 deterministic-shaped assertions to fail in `permission-control.test.ts` — only in the docker leg.

7. **[#11386](https://github.com/QwenLM/qwen-code/issues/11386) — [P2] Scale daemon workspaces past 25**
   Updated measurement (1/25/256 capacity) reverses earlier LRU recommendation; now proposes decoupling registration from live runtimes via an LRU live set.

8. **[#11352](https://github.com/QwenLM/qwen-code/issues/11352) — [P1, blocked] node-pty leaks `conhost.exe` on natural shell exit**
   The baton is erased before `onExit`, so `ClosePseudoConsole` is unreachable from JS at the pinned dependency version — a blocker for the #11303 fix.

9. **[#11022](https://github.com/QwenLM/qwen-code/issues/11022) — [P2, CLOSED] Publish new SDK with managed-memory fixes**
   Resolved by the v0.1.9 / v0.1.10 SDK releases — useful historical context for users on older SDK versions.

10. **[#11274](https://github.com/QwenLM/qwen-code/issues/11274) — [P3] Decouple Skill management from ACP child**
    Multi-PR refactor (each ≤1000 lines) to split daemon skill state from ACP child; tracking issue already being shaped with explicit interface contracts and acceptance criteria.

---

## Key PR Progress

1. **[#10347](https://github.com/QwenLM/qwen-code/pull/10347) — Auto-retry transient network errors (EOF)**
   Classifies wrapped low-level network failures (`400 network error … EOF`) as retryable so existing bounded auto-retry applies; critical for `Ctrl+Y`-unavailable channels.

2. **[#10455](https://github.com/QwenLM/qwen-code/pull/10455) — Don't crash on unwritable output-language file (#10453)**
   Stops CLI startup failures when the global config dir is read-only or has root-owned leftovers — a recurring CI runner gotcha.

3. **[#10938](https://github.com/QwenLM/qwen-code/pull/10938) — Session Workflow dependencies navigable**
   Plan DAG leads with the step (not its status), inspector chrome quieted; closes navigation/shape/doc gaps left after #8583.

4. **[#11295](https://github.com/QwenLM/qwen-code/pull/11295) — Support GPT-5 and GPT-6 reasoning effort**
   Adds model-specific reasoning-effort config for GPT-5 family + GPT-6 Astra with shared normalization handling prefixes, routing tags, dated snapshots.

5. **[#11349](https://github.com/QwenLM/qwen-code/pull/11349) — Expand Kimi, Qwen, DeepSeek reasoning presets**
   Moonshot K3 (low/high/max), K2.7 Code (thinking-only), K2.6 native toggle; Qwen 3.8 (low/medium/xhigh); DeepSeek V4 Pro and Flash presets.

6. **[#11391](https://github.com/QwenLM/qwen-code/pull/11391) — Isolate serve route E2E from fork pressure**
   Runs `qwen serve` route E2E alone in a single Vitest fork after the main Linux batch — directly addresses #11389.

7. **[#11172](https://github.com/QwenLM/qwen-code/pull/11172) — One-command remote start with QR pairing**
   Non-loopback `qwen serve` now generates an ephemeral 128-bit bearer (22 URL-safe chars), prints once, supports same-origin shell access and a pairing QR.

8. **[#11169](https://github.com/QwenLM/qwen-code/pull/11169) — Close trust-gate / bystander gaps in local-files bridge**
   Carries the four deferred review fixes from #10962's branch; reserves "still resolving" judgement in the workspace route.

9. **[#11291](https://github.com/QwenLM/qwen-code/pull/11291) — Retry status-less upstream errors**
   Recovers from SSE-embedded errors that arrive without an HTTP status, preventing premature turn termination.

10. **[#11281](https://github.com/QwenLM/qwen-code/pull/11281) — Enumerate installed extension skills locally**
    Daemon-local workspace catalog now lists installed extension Skills before an ACP child publishes a snapshot — direct contribution to #11274.

*Honorable mentions:* [#11381](https://github.com/QwenLM/qwen-code/pull/11381) (remove obsolete channel block-streaming), [#11300](https://github.com/QwenLM/qwen-code/pull/11300) (preserve branch commits made by failing post-checkout hook — now merged).

---

## Hot Discussions

*No GitHub Discussions data was surfaced in the provided snapshot — section omitted.*

---

## Feature Request Trends

- **Reasoning-effort configurability** is the dominant theme: closed-set presets for GPT-5/GPT-6 (#11295), mainstream Kimi models + filled-out Qwen/DeepSeek (#11349), and `customHeaders` template variables like `${session_id}` for per-conversation headers (#10995).
- **Custom Web Shell distribution hosting** — `qwen serve` as an embeddable shell for third-party Agent frontends while retaining QC daemon APIs (#11358).
- **Daemon scalability** — lifting the 25-workspace ceiling (#11386) and decoupling Skill management from ACP children (#11274).
- **One-command remote pairing** — generated bearer tokens + QR codes for non-loopback `qwen serve` (#11172), enabling "just works" LAN/WAN use.
- **ACP/Zed parity** — proper AskUserQuestion UI inside Zed, not just "Raw Input" (#11361).
- **Subagent UX in Web Shell** — sidebar session spinner during background-agent notification turns (#11385), and the broader Session Workflow navigation overhaul (#10938).

---

## Developer Pain Points

- **Windows-specific fragility.** ConPTY process leaks (#11303, #11352) and local-model breakage after Windows 11 updates (#11410) are the loudest community complaints, with several flagged P1 and one officially blocked at the pinned `node-pty` version.
- **CI flakiness, especially in forks.** Subprocess-heavy E2E flakes under fork pressure motivate three parallel hardening PRs (#11388 → v0.23.2-preview.0, #11391, #11134, #11297) plus the Fleet Shepherd bot (#7167).
- **Permission model ergonomics.** Pattern-based `deny` rules overgeneralize and break tool selection (#11405); separately, security review findings (#11205, #9558) show recurring risk that hardening landed in branches never makes it to `main`.
- **SDK release cadence.** Users still tracking which `enableManagedAutoMemory` and prompt-cache fixes have shipped where (#11022 → addressed in v0.1.9 / v0.1.10).
- **Docker E2E determinism.** Shared `QWEN_HOME` in SDK TS docker leg silently steals scripted fake-server responses (#11394), tripping 75% of permission-control tests.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*