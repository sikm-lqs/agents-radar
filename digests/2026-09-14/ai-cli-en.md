# AI CLI Tools Community Digest 2026-09-14

> Generated: 2026-09-13 23:30 UTC | Tools covered: 7

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

# AI CLI Tools Cross-Comparison Report — 2026-09-14

## 1. Ecosystem Overview

The AI CLI category has matured into a tiered market: Anthropic and OpenAI operate at enterprise scale with large issue backlogs and heavy desktop/IDE investment, Google and Qwen ship on aggressive nightly cadences, while OpenCode, Pi, and Copilot CLI occupy more focused niches (model-agnostic power users, embeddable TUI frameworks, and GitHub-native workflows respectively). The day's dominant themes are remarkably convergent: subagent orchestration reliability, Windows/desktop stability, OS-level sandboxing, and context/token economics. Notably, community-built tooling around session formats and agent supervision is now appearing without vendor coordination — a signal the category is becoming a platform layer rather than a set of terminal apps.

## 2. Activity Comparison

*Counts reflect items surfaced in each 24h digest window, not exhaustive repo totals. None of the digests indicate upstream-disabled Issues/PRs, so no N/A rows apply; Copilot CLI had no Discussions data provided this window.*

| Tool | Issues (24h) | PRs (24h) | Discussions (24h) | Release Status |
|---|---|---|---|---|
| **Claude Code** | ~50 updated; 15 surfaced (several stale-closed) | 5 | None surfaced | No release; stale-bot backlog culling |
| **OpenAI Codex** | 10 surfaced | 10 (from a 15-PR automated batch) | 10 active threads (Ideas / Show & Tell / General) | No release |
| **Gemini CLI** | 10 surfaced | 10 | None surfaced | **1 nightly** (v0.61.0) |
| **Copilot CLI** | 4 surfaced | 2 (Dependabot only) | No data this window | No release (v1.0.83 latest) |
| **OpenCode** | 14 surfaced (10 + 4 noteworthy) | 10 | None surfaced | No release |
| **Pi** | 10 surfaced | 9 | 1 (Show & Tell: Pi Heao GUI) | No release |
| **Qwen Code** | 10 surfaced | 10 | None surfaced | **2** (nightly + cua-driver-rs v0.20.6) |

## 3. Shared Feature Directions

- **Subagent reliability & observability (all 7 tools).** The single strongest convergent theme. Evidence: Gemini #22323 (subagents report `GOAL` success after `MAX_TURNS` exhaustion), Codex #42074 (`wait_agent` timeouts), Copilot #4829/#2254 (subagent token blowouts, no progress streaming), Claude Code #86370/#93345 (silent cross-session message drops, deleted worktrees), Qwen #11500/#11756/#11783 (TUI crashes under concurrent background agents), Pi #9561 (14k-tool-call error flooding; community `loop-guard` extension). Users want to know whether delegated work *actually completed*.
- **Sandboxing & execution isolation (Codex, Qwen, Gemini, Claude Code).** Qwen shipped the deepest work (bwrap kernel sandbox #11614, container-backed subagents #11711); Codex landed a 15-PR Windows sandbox hardening batch; Gemini is soliciting architecture feedback (#19873); Claude Code has devcontainer firewall edge cases (#91327).
- **Windows/desktop app stability (Claude Code, Codex, OpenCode, Qwen, Pi).** Claude #42776 (182 comments), Codex #41463/#36475 (WSL project creation, sandbox lock loops), OpenCode #34442/#48850, Qwen #11724 (7 GB memory blowups), Pi #9549. Every vendor with a desktop surface has Windows-specific pain.
- **Context & token economics (Copilot, Qwen, OpenCode, Pi, Gemini).** Prompt-cache preservation (Qwen #10410, Pi #9548), compaction modes (OpenCode #44264, Pi #9075), cache-busting subagent loops (Copilot #4829), AST-bounded reads to cut context bloat (Gemini #22745 EPIC).
- **Remote/mobile control (Codex, Claude Code).** Codex's top-voted idea (#9200, 190 👍); Claude Code shipped it but is absorbing backlash over default-on (#88094) and data loss (#93345).
- **Multi-provider flexibility (Pi, Qwen, OpenCode, Gemini).** Pi's `serverTools` + Azure Foundry push, Qwen's per-model wire-API selection (#11538), OpenCode provider-parity fixes, Gemini's pinned-model fix (#29222).

## 4. Differentiation Analysis

- **Claude Code** — Enterprise IDE surface breadth is the moat: VS 2026 parity is the repo's loudest ask (#15942, 437 👍), and fleet/per-agent configuration (#66402) targets multi-agent operators. Stale-bot culling suggests backlog management maturity.
- **OpenAI Codex** — Deepest sandbox engineering investment and the richest discussion ecosystem (10 active threads, 5 new community tools in 24h). Distinctive ChatGPT-integration trajectory (mobile remote control demand). Coordinated bot-driven PR batches indicate heavy internal automation.
- **Gemini CLI** — Positions as a platform/SDK (A2A server fixes, extensions API) rather than just a CLI. Disciplined P1/P2 triage and same-day issue→PR turnaround; strategic bets on Auto Memory and AST-aware tooling.
- **Copilot CLI** — Narrowest visible footprint this window: runtime regressions in v1.0.83 plus its differentiator, local voice mode (Nemotron ASR). GitHub-native workflow integration remains the value prop, not raw feature velocity.
- **OpenCode** — Model-agnostic BYO-key positioning with unique asks (crypto payments #23153, 51 👍). Currently consuming community goodwill via a forced V2 UI migration without an escape hatch.
- **Pi** — TUI craftsmanship and embeddability: session-tree navigation, viewport-diff rendering work, lazy extension loading for SDK use. Long-tail provider support (Zhipu GLM, llama.cpp, commandcode) no one else touches. High contributor sophistication (e.g., mitsuhiko's transcript-fidelity PR #9548).
- **Qwen Code** — Distinctive on three axes: OS-level isolation (bwrap/containers), desktop *automation* rather than just desktop apps (signed cua-driver-rs with Windows UIAccess), and an unusually automated dev pipeline (Fleet Shepherd autonomous fleet driving daily churn).

## 5. Community Momentum & Maturity

- **Highest raw engagement:** Claude Code (~50 issues updated/day, 437-👍 top issue, 182-comment thread) — the largest installed base, with mature (if slow) queue hygiene.
- **Strongest discussion ecosystem:** Codex — the only repo with substantial Ideas/Show & Tell traffic; third-party tooling is forming around its session format (#45238, #45251).
- **Fastest iteration:** Gemini CLI and Qwen Code — the only two with releases this window (nightly + a separate driver binary), and both landed 10 PRs. Gemini's issue-to-fix latency (hours) is best-in-class.
- **High signal-to-noise:** Pi — smaller volume but architecturally precise bug reports and quality PRs from expert users.
- **Under strain:** OpenCode — engaged community, but migration backlash plus a release-blocking regression (#48645) indicate QA gaps.
- **Quietest:** Copilot CLI (4 issues, 2 dependency bumps) — likely reflects internal development cadence rather than abandonment, but a single-day window is a weak sample.

## 6. Trend Signals

1. **Orchestration is the new reliability frontier.** Fake-success subagents, silent message drops, and hangs now outrank model quality complaints — trust in *delegation* is the bottleneck for autonomous workflows.
2. **Silent failure is the cardinal sin.** Across all tools, the angriest threads involve no-error failures (missing MCP servers, dropped sessions, stale history). Observability is a purchase criterion.
3. **Cost-awareness is reshaping architecture.** Prompt-cache preservation, compaction modes, and AST-bounded reads show token economics driving harness design, not just model choice.
4. **Sandboxing is moving to the OS layer.** bwrap, Windows MXC, and container-backed agents signal a shift from permission prompts toward structural isolation.
5. **Session formats are becoming APIs.** Community tools building on `~/.codex` and session exports — and explicitly requesting stability contracts (#45251) — indicate downstream ecosystem lock-in value.
6. **Windows is the differentiating market.** Whoever fixes Windows sandbox/desktop reliability first (Codex is investing hardest) captures an underserved enterprise segment.
7. **Agents are building agents.** copyberry batches (Codex) and Fleet Shepherd (Qwen) show vendors dogfooding their own tools in development — early evidence of the category's self-amplifying maturity curve.

*Recommendation for evaluators: weight subagent observability, Windows support quality, and cache/cost behavior heavily in near-term tooling decisions; these are where the roadmaps and the pain points are converging.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — Community Highlights Report
*Data as of 2026-09-14*

---

## 1. Top Skills Ranking

The most-watched PRs cluster around fixes to core meta-skills (`skill-creator`, `mcp-builder`, `claude-api`) rather than brand-new domain skills, indicating the community is focused on infrastructure reliability.

| Rank | PR / Skill | Functionality | Status | Link |
|------|------------|---------------|--------|------|
| 1 | **#1298 — skill-creator eval fix** | Resolves `run_eval.py` reporting 0% recall across 10+ reproductions (#556); fixes Windows stream reading, trigger detection, and parallel workers so the description-optimization loop trains against real signal. | OPEN (highly active, June→Sept) | [PR #1298](https://github.com/anthropics/skills/pull/1298) |
| 2 | **#1742 — mcp-builder mcp>=2 fix** | Adapts `connections.py` to the renamed `streamable_http_client` import and the new custom-headers API in MCP SDK v2.0.0. | OPEN | [PR #1742](https://github.com/anthropics/skills/pull/1742) |
| 3 | **#1607 — claude-api retired models** | Removes four stale model IDs (`claude-opus-4-1`, `claude-sonnet-4-0`, `claude-opus-4-0`, `claude-3-haiku-20240307`) still listed as active/deprecated. | OPEN | [PR #1607](https://github.com/anthropics/skills/pull/1607) |
| 4 | **#1628 — Hivemind multi-agent orchestration** | Delegates mechanical work to headless `opencode` workers on free models while Claude Code stays the planner/reviewer/merger. | OPEN | [PR #1628](https://github.com/anthropics/skills/pull/1628) |
| 5 | **#525 — Pyxel retro-game skill** | Skill for `pyxel-mcp` — write → run_and_capture → inspect → iterate loop for 8-bit/Python game development. | OPEN, kept alive (Sept update) | [PR #525](https://github.com/anthropics/skills/pull/525) |
| 6 | **#1367 — Self-audit skill (v1.3.0)** | Pre-delivery audit: mechanical file verification first, then four-dimension reasoning audit in damage-severity order. Universal across stacks. | OPEN | [PR #1367](https://github.com/anthropics/skills/pull/1367) |
| 7 | **#514 — Document-typography skill** | Catches orphan word wrap, widow paragraphs, and numbering misalignment in generated documents. | OPEN (long-running proposal) | [PR #514](https://github.com/anthropics/skills/pull/514) |
| 8 | **#486 — ODT skill** | Creates, fills, reads, and converts OpenDocument (.odt/.ods) files; alternative to DOCX for ISO/open-source workflows. | OPEN | [PR #486](https://github.com/anthropics/skills/pull/486) |

---

## 2. Community Demand Trends

Issues reveal what users *want* the Skills ecosystem to become. Ranked by comment volume:

| Rank | Issue | Theme | Comments | Link |
|------|-------|-------|----------|------|
| 1 | **#492 — Trust-boundary abuse via `anthropic/` namespace** | **Security & governance**: Community skills ship under `anthropic/` and impersonate official skills, creating a permission-trust vulnerability. Dominant concern of the community. | 43 | [Issue #492](https://github.com/anthropics/skills/issues/492) |
| 2 | **#228 — Org-wide skill sharing in Claude.ai** | **Distribution UX**: Replace Slack-shared `.skill` file uploads with native org-level skill libraries. | 16 | [Issue #228](https://github.com/anthropics/skills/issues/228) |
| 3 | **#556 — `run_eval.py` 0% trigger rate** | **Eval infrastructure**: Subprocess skill-invocation harness never fires, undermining every description-optimization loop. | 12 | [Issue #556](https://github.com/anthropics/skills/issues/556) |
| 4 | **#62 — Skills disappeared after rename** | **Persistence/UX**: User lost 12 skills after renaming a Downloads file — no recovery, no warning. | 10 | [Issue #62](https://github.com/anthropics/skills/issues/62) |
| 5 | **#1329 — compact-memory skill proposal** | **Long-context efficiency**: Symbolic notation to cut agent self-notes from prose-sized to compact. | 9 | [Issue #1329](https://github.com/anthropics/skills/issues/1329) |
| 6 | **#202 — skill-creator should follow its own best practices** | **Meta-quality**: The creator skill reads like developer docs rather than execution instructions. | 8 | [Issue #202](https://github.com/anthropics/skills/issues/202) |
| 7 | **#189 — `document-skills` and `example-skills` ship duplicates** | **Packaging hygiene**: Installing both plugins duplicates every skill in the context window. | 6 | [Issue #189](https://github.com/anthropics/skills/issues/189) |
| 8 | **#1487 — `claude-api` skill injects ~156k tokens** | **Context-window safety**: A single tool call exhausts context; eager loading must become lazy/sectioned. | 4 | [Issue #1487](https://github.com/anthropics/skills/issues/1487) |
| 9 | **#1390 — mcp-builder evaluation scores 0/N on real MCP servers** | **Eval correctness**: `TextContent` not JSON-serializable → fabricated tool errors → silent false zeros. | 4 | [Issue #1390](https://github.com/anthropics/skills/issues/1390) |
| 10 | **#16 — Expose Skills as MCPs** | **Composability**: Wrap skill APIs as MCPs so any agent can call them. | 4 | [Issue #16](https://github.com/anthropics/skills/issues/16) |

**Themes distilled:**
- **Security / trust boundaries** (skill namespace, SharePoint ACLs in #1175)
- **Org-level distribution** (sharing, duplicates, marketplaces)
- **Eval/measurement infrastructure** (the recurring `run_eval.py` and `evaluation.py` failures)
- **Long-running agent memory** (`compact-memory`, `Hivemind`)
- **Cross-platform parity** (Windows stream reading, pnpm ≥10 builds in #1362)
- **Reasoning quality gates** (self-audit, adversarial review)

---

## 3. High-Potential Pending Skills

Active PRs still open and likely to land soon (high recent activity or addresses widely-reported issues):

| PR | Skill | Why it has traction | Link |
|----|-------|---------------------|------|
| #1298 | skill-creator eval/Windows fixes | Closes 10+ reproductions of #556; affects every user running the description-optimization loop. | [PR #1298](https://github.com/anthropics/skills/pull/1298) |
| #1742 | mcp-builder mcp>=2 support | Breaks every user upgrading MCP SDK; tracked from #1668. | [PR #1742](https://github.com/anthropics/skills/pull/1742) |
| #1734 | Orphaned DOCX comment detection | Small, targeted fix; aligns with the active DOCX-quality theme. | [PR #1734](https://github.com/anthropics/skills/pull/1734) |
| #538 | pdf: case-sensitive SKILL.md references | Breaks on Linux; clear, low-risk merge candidate. | [PR #538](https://github.com/anthropics/skills/pull/538) |
| #539 | skill-creator YAML quoting guard | Catches a silent truncation class of bugs before they ship. | [PR #539](https://github.com/anthropics/skills/pull/539) |
| #541 | docx tracked-change ID collision | Prevents document corruption with existing bookmarks — addresses real OOXML edge case. | [PR #541](https://github.com/anthropics/skills/pull/541) |
| #1627 | buffer-api GraphQL skill | Production-grade, agent-agnostic scheduling skill — fits distribution demand. | [PR #1627](https://github.com/anthropics/skills/pull/1627) |
| #1602 | mcp-builder eval serialization/stability | Fixes the 0/N scoring bug (#1390) and several platform issues. | [PR #1602](https://github.com/anthropics/skills/pull/1602) |
| #1724 | mcp-builder default → claude-sonnet-5 | Routine but uncontroversial model default update. | [PR #1724](https://github.com/anthropics/skills/pull/1724) |
| #525 | pyxel retro-game skill | Repeatedly refreshed; signals a stable niche interest. | [PR #525](https://github.com/anthropics/skills/pull/525) |

---

## 4. Skills Ecosystem Insight

> **The community's most concentrated demand is *trust and reliability infrastructure for Skills themselves*** — fixing the broken eval harness, removing impersonation risk from the `anthropic/` namespace, and shipping lazy-loading/context-aware skill delivery — rather than new domain skills, because every other capability is gated on getting those primitives right first.

---

# Claude Code Community Digest — 2026-09-14

## Today's Highlights

- **No new releases shipped in the last 24h**, but community engagement remains high with 50 issues updated, including several long-standing IDE/Desktop bugs and feature requests with hundreds of upvotes.
- **Windows Desktop stability** continues to dominate the issue tracker: the orphaned-process file lock bug (#42776) has reached 182 comments, while VS Code auto-attach control (#24726) and VS 2026 integration (#15942) are the top-requested enhancements with 237 and 437 👍 respectively.
- **A wave of stale-bots closed several macOS/Linux issues** around OAuth/Keychain corruption, agent session routing, and Homebrew/apt update nags — signaling Anthropic is culling the backlog while focusing on the open IDE/Desktop pain points.

## Releases

_No new releases in the last 24 hours._

## Hot Issues

1. **[BUG] Claude Code Desktop fails to Relaunch on Windows due to orphaned process file lock** [#42776](https://github.com/anthropics/claude-code/issues/42776) — OPEN, invalid, 182 comments, 88 👍. The most-discussed issue in the digest window: Windows Desktop can't relaunch because of a stale process file lock. High engagement despite being flagged invalid, indicating the community wants the underlying UX fixed.

2. **Add support for Visual Studio 2026 Integration** [#15942](https://github.com/anthropics/claude-code/issues/15942) — OPEN, enhancement, 152 comments, **437 👍**. The single highest-upvoted item in the digest. A clear signal that Visual Studio parity with the VS Code extension is a top enterprise demand.

3. **VS Code extension: add setting to disable auto-attach of open file / selection** [#24726](https://github.com/anthropics/claude-code/issues/24726) — OPEN, 73 comments, 237 👍. Developers want granular control over context injection — the current always-on behavior is noisy.

4. **VSCode extension: add font size setting for chat panel** [#34196](https://github.com/anthropics/claude-code/issues/34196) — OPEN, 16 comments, 91 👍. Simple but popular UX request; 91 👍 on a 16-comment thread shows the request resonates with a much larger silent audience.

5. **/model and /effort mutate global settings.json — breaks agents/fleet view** [#66402](https://github.com/anthropics/claude-code/issues/66402) — OPEN, 16 comments, 14 👍. Architectural concern: per-agent model/effort config is impossible because commands write globally. Critical for power users running multi-agent workflows.

6. **Remote Control Being Turned on by Default** [#88094](https://github.com/anthropics/claude-code/issues/88094) — OPEN, 10 comments, 10 👍. Users surprised by opt-out default on a network-facing feature; ongoing privacy/safety discussion.

7. **Desktop scheduled tasks: model selection broken end-to-end** [#91884](https://github.com/anthropics/claude-code/issues/91884) — OPEN, 5 comments. Detailed bug report showing scheduled tasks ignore user model settings at three layers (spawn, UI picker, MCP tool) — a meaningful Desktop reliability gap.

8. **[MODEL] Sonnet 5 is flagging UserPromptSubmit as prompt injections** [#76026](https://github.com/anthropics/claude-code/issues/76026) — CLOSED stale, 4 comments. Model-level false positives break legitimate hook workflows; closed as stale rather than fixed, worth re-filing.

9. **iTerm2: CLI launches as daemon child session, blocking Agents panel / session switching** [#74699](https://github.com/anthropics/claude-code/issues/74699) — CLOSED stale, 4 comments. macOS terminal-integration regression affecting the new Agents panel.

10. **Cross-session messages silently dropped since 2.1.227** [#86370](https://github.com/anthropics/claude-code/issues/86370) — CLOSED, 4 comments. Sender gets success while recipient never receives — a silent-data-loss regression in the new agents/sessions API; closed as duplicate/stale.

11. **macOS CLI login loop: Keychain credentials blob has every accessToken/refreshToken blanked** [#84331](https://github.com/anthropics/claude-code/issues/84331) — CLOSED stale, 4 comments. Severe auth regression on macOS where all OAuth tokens get wiped from Keychain.

12. **VS Code extension: focus ping-pongs between two visible Claude panels** [#90936](https://github.com/anthropics/claude-code/issues/90936) — OPEN, 2 comments. Refiled per stale-bot; recurring UX bug with two panel instances.

13. **Devcontainer: init-firewall.sh aborts on boot when two allowlisted domains resolve to the same IP** [#91327](https://github.com/anthropics/claude-code/issues/91327) — OPEN, 1 comment. Reproducible sandboxing bug; `set -euo pipefail` + ipset duplicate kills the devcontainer on first boot for many real DNS setups.

14. **Skill loading: $1-$19 in a skill file are replaced with unrelated conversation text** [#94065](https://github.com/anthropics/claude-code/issues/94065) — OPEN, 1 comment. Skills aren't a safe place for literal `$N` placeholders; the loader appears to be applying shell-expansion-style substitution from the wrong context.

15. **Remote Control: session worktrees are deleted before the session is archived** [#93345](https://github.com/anthropics/claude-code/issues/93345) — OPEN, 1 comment. Data-loss / unresumable-sessions bug in the Remote Control bridge.

## Key PR Progress

1. **fix: add mandatory hookify. prefix to example rule filenames** [#79148](https://github.com/anthropics/claude-code/pull/79148) — OPEN. Fixes a silent docs/implementation mismatch: shipped hookify example files lack the required `.claude/hookify.*.local.md` prefix and are therefore silently ignored by the loader.

2. **validate-agent.sh: don't abort at the first warning** [#89404](https://github.com/anthropics/claude-code/pull/89404) — OPEN. Fixes public issue #83803. The plugin-dev skill's validator `set -euo pipefail` + `((count++))` interaction causes it to abort on the first warning and false-flag valid plugin-dev agent files.

3. **Add missing CLI build infrastructure and bundler configuration** [#41621](https://github.com/anthropics/claude-code/pull/41621) — CLOSED. Ambitious PR adding esbuild-based build docs and config to bundle the CLI from TypeScript sources into a single executable; closed without merge.

4. **mods: the diff, sec-default and telemetry tests move next to the mods** [#93951](https://github.com/anthropics/claude-code/pull/93951) — OPEN. Restructures behavior tests for three internal mods under `mods/<mod>/tests/` so each unit has co-located tests runnable via `claude plugin test`.

5. **mods: telemetry's types path is ./-relative like the other manifest paths** [#93932](https://github.com/anthropics/claude-code/pull/93932) — CLOSED. One-liner manifest-schemafix: `"types": "./types/index.d.ts"` to match sibling relative-path convention.

## Feature Request Trends

Distilled from open issues, the strongest signals are:

- **First-class Visual Studio support.** [#15942](https://github.com/anthropics/claude-code/issues/15942) (437 👍) is the loudest single ask in the repo — VS users want parity with the VS Code extension.
- **Granular IDE context-control.** [#24726](https://github.com/anthropics/claude-code/issues/24726) (237 👍) and the now-broken hide toggle [#94052](https://github.com/anthropics/claude-code/issues/94052) show users want explicit settings to opt out of auto-attached files/selection.
- **IDE UX basics.** Font-size settings [#34196](https://github.com/anthropics/claude-code/issues/34196) (91 👍), screen-reader mode [#87123](https://github.com/anthropics/claude-code/issues/87123) — accessibility and typography knobs that haven't shipped yet.
- **Per-agent/per-session model & effort configuration.** [#66402](https://github.com/anthropics/claude-code/issues/66402) — fleet workflows need isolation from global settings.
- **Plan-mode customization.** [#89291](https://github.com/anthropics/claude-code/issues/89291) wants a configurable filename template for plan files.
- **Desktop as a first-class surface.** Scheduled tasks [#91884](https://github.com/anthropics/claude-code/issues/91884) and `preview_start` reliability [#93508](https://github.com/anthropics/claude-code/issues/93508) show Desktop parity with CLI/VS Code is still incomplete.

## Developer Pain Points

- **Windows Desktop stability.** Orphaned-process file locks block relaunches (#42776, 182 comments) — the single largest active thread.
- **macOS auth & session reliability.** Keychain token corruption (#84331), iTerm2 daemon routing breaking the Agents panel (#74699), and silent cross-session message drops since 2.1.227 (#86370) all point to fragile macOS-side plumbing around OAuth, terminals, and the new sessions API.
- **Package-manager update nags.** Homebrew-cask (#86231) and apt (#87197) installs show persistent "Update available!" even when already current — small but chronic papercut.
- **Sandbox/devcontainer edge cases.** `init-firewall.sh` aborts on duplicate-IP allowlists (#91327) and `preview_start` fails in TCC-protected folders like `~/Documents` (#93508).
- **Skill / prompt context corruption.** Literal `$1`–`$19` in skill files get replaced with conversation fragments (#94065) — a subtle correctness bug that makes skills non-portable across repos.
- **Silent regressions from the Agents/Routing refactor.** The 2.1.227+ agent work introduced unresumable sessions (#93345), daemon-child-session misrouting (#74699), and silent cross-session drops (#86370) — power users running multi-agent flows are the hardest hit.
- **Remote Control opt-out & defaults.** Users are caught off-guard by Remote Control shipping on by default (#88094), and the feature itself has data-loss issues (#93345).
- **Hooks surface area gaps.** `AskUserQuestion` notifications fire under the wrong `notification_type` (#74052) and "empty Other" cancels the entire dialog (#78175) — both closed stale rather than fixed.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-14

## Today's Highlights

The Codex Windows Desktop experience is under heavy fire: the top issues of the day are dominated by Windows sandbox setup failures, WSL project-creation crashes, and elevated-mode credential problems — many blocking users from running tasks at all. On the engineering side, an unusually coordinated batch of 15 PRs (all from `copyberry[bot]`) landed in 24 hours, focusing on Windows sandbox hardening, TUI refinements, and tool-call metadata correctness. Community creativity is also visible, with five new "Show and tell" tools shipping in the same window.

## Releases

_No new releases in the last 24 hours._

## Hot Issues

1. **[#41463](https://github.com/openai/codex/issues/41463) — Windows + WSL: Cannot create projects (`AbsolutePathBuf` deserialization)** (54 comments, 33 👍). The single most-upvoted Windows bug of the cycle: `26.825.4187.0` desktop fails to even create projects in WSL2 because path serialization has no base. Effectively a blocker for Windows/WSL users.
2. **[#31073](https://github.com/openai/codex/issues/31073) — Windows native sandbox: Git HTTPS remotes fail/crash** (28 comments). Local Git works inside Codex, but HTTPS remote ops (`fetch`, `push`, `pull`) crash — yet run fine in plain PowerShell. Pure sandbox/credential isolation regression.
3. **[#44781](https://github.com/openai/codex/issues/44781) — Editing and resending a queued message breaks the queue** (22 comments, 26 👍). `26.903.9818.0` desktop on Windows: editing a queued follow-up surfaces "App-server queued follow-up no longer exists," silently losing the turn.
4. **[#44561](https://github.com/openai/codex/issues/44561) — Turn off Astra sparkle/whimsy effect by default** (15 comments, 31 👍). A configuration ergonomics request: users want `[tui] whimsy = false` to be the default, since the new Astra stars look like a glitch.
5. **[#37856](https://github.com/openai/codex/issues/37856) — VS Code extension: stale thread owner blocks chat** (13 comments, 9 👍). After a VS Code Web renderer reload, threads stay owned by a now-dead client and report "open in another application."
6. **[#36475](https://github.com/openai/codex/issues/36475) — Windows sandbox refresh fails with `helper_sandbox_lock_failed`** (11 comments). `SetNamedSecurityInfoW` returns `ERROR_ACCESS_DENIED` on an existing `.sandbox-bin`; the sandbox cannot refresh itself, so setup loops.
7. **[#20988](https://github.com/openai/codex/issues/20988) — Codex searches the web far too frequently** (10 comments, now closed). Confirms a long-running complaint: web search is triggered unnecessarily, burning user tokens on `gpt-5.3-codex`.
8. **[#32082](https://github.com/openai/codex/issues/32082) — Regression: Windows SSH worktree threads not grouped in sidebar** (9 comments). Regression of #10522 — SSH worktree tasks exist but don't appear under their saved project in the Windows app.
9. **[#44458](https://github.com/openai/codex/issues/44458) — macOS: CLI 0.154.0 experimental capability breaks bundled MCP servers** (9 comments, 3 👍). `gpt-6-astra` startup now fails for Messages and Computer History MCP servers — a regression tied to the 0.154.0 experimental capability flag.
10. **[#44035](https://github.com/openai/codex/issues/44035) — Windows app: recent chat history disappears** (9 comments). `read_thread` stays stale while the underlying rollout keeps newer messages; users see empty history after update to `26.901.6511.0`.

## Key PR Progress

1. **[#45276](https://github.com/openai/codex/pull/45276) — Add worktree session creation to the agents overview.** New `w` shortcut creates a worktree from the cached project default branch (preferring remote `HEAD`, then conventional branches) for local sessions.
2. **[#45271](https://github.com/openai/codex/pull/45271) — Preserve terminal scrollback when growing the TUI viewport.** Fixes `CSI S`-induced row loss in QTermWidget and xterm.js by emitting trailing newlines for `ScrollbackStrategy::Standard`.
3. **[#45262](https://github.com/openai/codex/pull/45262) — Route pastes into the active history search query.** Pasting during `Ctrl+R` now updates the search query and re-runs matching, instead of leaking into the composer.
4. **[#45255](https://github.com/openai/codex/pull/45255) — Open new sessions directly from the command center.** Replaces the inline composer with a session list; `n` opens a blank session in the selected checkout without interrupting running agents.
5. **[#45248](https://github.com/openai/codex/pull/45248) — Use captured step settings for request metadata and tool hooks.** Metadata now describes the step that issued the request/call, not the turn's initial model/effort.
6. **[#45224](https://github.com/openai/codex/pull/45224) — Register Windows desktop uninstall ownership before sandbox setup.** Ensures uninstall cleanup has an installation owner even when the user hasn't signed in or configured the sandbox.
7. **[#45185](https://github.com/openai/codex/pull/45185) — Bind direct tool-call metadata to invocation outputs.** Metadata stays attached even when call IDs are reused; completeness is computed from the recorded call inventory.
8. **[#45182](https://github.com/openai/codex/pull/45182) — Validate Windows sandbox token groups before copying SIDs.** Adds a shared `token_groups` helper that bounds-checks group entries and SID pointers before copy.
9. **[#45178](https://github.com/openai/codex/pull/45178) — Split Windows sandbox cleanup into preparation and completion phases.** Exposes `prepare_packaged_windows_sandbox_cleanup` and a `PreparedWindowsSandboxCleanup` guard, so cleanup happens under the setup lock.
10. **[#45176](https://github.com/openai/codex/pull/45176) — Wire the Windows MXC sandbox into command execution.** Adds explicit MXC backend selection, propagates its identity through exec-server reporting and violation classification.

## Hot Discussions

### Ideas
- **[#9200 — Remote-control Codex from the ChatGPT app](https://github.com/openai/codex/discussions/9200)** (46 comments, 190 👍). The long-running, top-voted idea: run Codex headless on a workstation and drive it from a phone. Still without an official status update.
- **[#42703 — Long-horizon context: can history retrieval become self-referential?](https://github.com/openai/codex/discussions/42703)** (1 comment, 1 👍). Thoughtful post on a failure mode for the new `history` / `notes` / `new_context` budget model across multiple context windows.
- **[#45284 — Optional persistent Codex session per GitHub PR](https://github.com/openai/codex/discussions/45284)** (0 comments, 1 👍). Each `@codex` mention currently spawns a new task; the proposal asks for an opt-in single-session-per-PR mode for iterative review.

### Show and tell
- **[#16329 — Awesome Codex CLI (150+ ecosystem tools)](https://github.com/openai/codex/discussions/16329)** (7 comments). A curated catalog for subagents, skills, plugins, and MCP servers; addresses the discoverability problem in the rapidly growing ecosystem.
- **[#45278 — Polter: one Codex supervises other AI CLIs](https://github.com/openai/codex/discussions/45278)** (0 comments, 1 👍). A forked-Ghostty supervisor terminal that hands work to Codex/Qwen/opencode and nags them when they stall.
- **[#45238 — codex-preserve: durable Codex session exports with fail-closed verification](https://github.com/openai/codex/discussions/45238)** (0 comments, 1 👍). Local-first Python CLI for exporting post-run `~/.codex` sessions with mechanical integrity checks.
- **[#45205 — Orchestrator: free Mac workspace for Codex + Kanban + review](https://github.com/openai/codex/discussions/45205)** (0 comments, 1 👍). Links Codex tasks to repo, conversation, and diff in one VS Code-style workspace.
- **[#44291 — Brain Scanner: understand what your coding agent did](https://github.com/openai/codex/discussions/44291)** (0 comments, 1 👍). Project map + recorded agent work + follow-ups, for handoff review.
- **[#44843 — SKILL.md → Codex plugin bundle converter](https://github.com/openai/codex/discussions/44843)** (1 comment, 1 👍). MIT, stdlib-only tool that turns Agent Skills `SKILL.md` folders into compliant Codex `.codex-plugin` bundles.

### General
- **[#45211 — Open statement: reopen Pro 20X, address Korean-language quality, clarify reset policy](https://github.com/openai/codex/discussions/45211)** (0 comments, 1 👍). User-facing call for OpenAI to publish a Pro 20X reopening plan and acknowledge reported Korean-language mixing bugs.

## Feature Request Trends

- **Windows setup / sandbox reliability is the #1 ask.** Almost half of the top Windows issues (helper_failed, sandbox lock, denied ACLs, broken setup before UAC) point to one underlying need: the first-run sandbox install must work without manual workarounds.
- **Configuration ergonomics > novelty.** The Astra "whimsy" request (15 comments / 31 👍) shows users want granular TUI config and saner defaults over decorative effects.
- **Cross-surface continuity.** Persistent sessions per PR (#45284), thread/grouping regressions (#32082, #44035), and "open in another application" lock-outs (#37856) all describe the same desire: state that survives reloads, app boundaries, and editor reloads.
- **Remote control from mobile/desktop ChatGPT** remains the single highest-upvoted idea in the repo (#9200, 190 👍) and was echoed again this week by `iOS remote control not working` (#40167).
- **Lower-noise tool use.** The closed web-search overuse issue (#20988) and "garbled output during waits" (#45268) indicate users want more conservative, predictable tool behavior.
- **Documented rollout format** is an emerging ask (#45251) — third-party tooling is being built on `~/.codex` sessions, and downstream consumers want a stability contract.

## Developer Pain Points

- **Windows sandbox is the dominant blocker.** Across `#41463, #31073, #36475, #40550, #42621, #45003, #45069, #42794, #45302, #45119`, the same symptoms recur: helper setup fails, ACL/SID handling breaks, elevated mode loses credentials, and queue/follow-up messaging silently drops. There is no single root cause but a coherent picture of under-tested Windows edge cases.
- **macOS sandbox regressions on bleeding-edge CLIs.** 0.154.0 broke bundled MCP servers (#44458) and `TIOCSTI` startup fails on 14.2 (#45119) — users running `alpha` channels need clearer gating.
- **Rate-limit accounting is opaque.** "86% drained in 26 minutes with 2 prompts" (#45073) and "Live Voice shows usage-limit error after Codex consumed quota" (#38507) both expose missing transparency around how Codex and ChatGPT share or display usage.
- **App-server ↔ desktop race conditions.** Multiple issues (#44781, #45075, #45069, #42794) describe torn state when the desktop app reloads or an active turn is interrupted — projectors, cursors, and queued follow-ups desync in ways users can see but not recover from.
- **Multi-agent primitives are flaky.** `wait_agent` timeouts after observable terminal state (#42074) make the new `multi_agent` feature hard to depend on.
- **Model behavior surprises.** Ignoring user instructions and exposing raw Python/tool output (#45289) and garbled streamed text during waits (#45268) erode trust in current `gpt-5.6-sol` variants.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-14

## Today's Highlights
Today's activity is dominated by **subagent reliability and Auto Memory hardening**. The most pressing issue is a P1 bug where subagents incorrectly report `GOAL` success after hitting `MAX_TURNS`, masking interruption from users, alongside a long-standing P1 report of the generalist agent hanging indefinitely. On the PR side, SDK and A2A-server stability fixes (unguarded `JSON.parse`, middleware ordering) landed within hours of the corresponding issue reports, and a notable config fix prevents explicit `--model gemini-2.5-flash` invocations from being silently rewritten on Vertex AI backends.

## Releases
- **v0.61.0-nightly.20260913.g9c1b0a610** — standard automated nightly bump; full diff against the prior nightly is available [here](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260912.g9c1b0a610...v0.61.0-nightly.20260913.g9c1b0a610). No notable changelog details surfaced in the snapshot.

## Hot Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent reports GOAL after hitting MAX_TURNS (P1, 13 comments)**  
   `codebase_investigator` returns `status: "success"` with `Termination Reason: "GOAL"` even when its own output admits it never analyzed anything because it exhausted the turn budget. This silently hides failed work from the user. P1 + maintainer-tracked.

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent hangs indefinitely (P1, 8 comments, 8 👍)**  
   Trivial operations (e.g. folder creation) hang for over an hour whenever the CLI defers to the generalist subagent. Highest like-to-comment ratio on the board; disabling subagent delegation is the only known workaround.

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — Zero-Dependency OS Sandboxing & Post-Execution Intent Routing (P2, 9 comments)**  
   Strategic enhancement to leverage Gemini 3's native bash affinity while keeping sandbox security guarantees. Frames a long-term architecture conversation.

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — EPIC: AST-aware file reads, search, and mapping (P2, 7 comments)**  
   Tracking issue for replacing whole-file reads with AST-bounded slices to cut context bloat. Spawned sibling issue #22746 (recommend `tilth` or `glyph`).

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini underutilizes custom skills and sub-agents (P2, 6 comments)**  
   Even with well-described skills installed, the model only invokes them on explicit user instruction. Highlights a gap between capability availability and autonomous discovery.

6. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell command stuck at "Awaiting user input" after completion (P1, 4 comments, 3 👍)**  
   Common, reproducible hang immediately after a finished CLI command. Tracked as `effort/medium`.

7. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Auto Memory: deterministic redaction & reduced logging (P2, 5 comments)**  
   Security-focused: Auto Memory sends transcript snippets to a background extractor *before* the model gets a chance to redact secrets. Wants deterministic scrubbing prior to dispatch.

8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 400 error with >128 tools (P2, 3 comments)**  
   As agent ecosystems grow, hitting the upstream tool-count ceiling produces opaque 400s. Request asks for smarter scope narrowing rather than global tool registration.

9. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — Browser subagent fails on Wayland (P1, 4 comments)**  
   `GOAL` termination reported on Wayland sessions, regressing Linux desktop users who aren't on X11.

10. **[#20079](https://github.com/google-gemini/gemini-cli/issues/20079) — Symlinked `~/.gemini/agents/*.md` not recognized (P2, 4 comments)**  
    Common dotfiles workflow (symlinking shared agents across machines) silently fails to register subagents.

## Key PR Progress

1. **[#29319](https://github.com/google-gemini/gemini-cli/pull/29319) — `fix(sdk)`: guard `JSON.parse` on tool-call args in `sendStream`**  
   Patches the unguarded `JSON.parse` from issue #29308; malformed tool args now emit a `_parseError` arg instead of killing the stream loop. Includes a regression test.

2. **[#29320](https://github.com/google-gemini/gemini-cli/pull/29320) — `fix(a2a-server)`: register `express.json` before A2A routes**  
   Re-orders middleware so JSON-RPC handlers receive a parsed `req.body`. Mirrors the previously-closed #29126.

3. **[#29286](https://github.com/google-gemini/gemini-cli/pull/29286) — Implement Google Search tool in `RobustAutonomousAgent`**  
   New capability adding grounded web search to the autonomous agent surface.

4. **[#29222](https://github.com/google-gemini/gemini-cli/pull/29222) — `fix(config)`: prevent rewriting explicitly pinned flash models**  
   `--model gemini-2.5-flash` was being silently remapped to `gemini-3.5-flash` on Vertex AI backends; this restores user intent and prevents 404s in restricted environments.

5. **[#29163](https://github.com/google-gemini/gemini-cli/pull/29163) — `fix(cli)`: prevent crash during auth in git repos under macOS Seatbelt**  
   Startup crash when `useGitBranchName` hook can't read `.git/` under restrictive sandboxes; addresses a common macOS dev friction.

6. **[#29304](https://github.com/google-gemini/gemini-cli/pull/29304) + [#29303](https://github.com/google-gemini/gemini-cli/pull/29303) — surrogate-pair safe truncation**  
   Two parallel fixes in `sanitizeForDisplay` and `ExpandableText` prevent UTF-16 surrogate-pair splits that silently dropped emojis from the TUI.

7. **[#29208](https://github.com/google-gemini/gemini-cli/pull/29208) — `fix(core)`: resilient `agents.json` loading**  
   Valid-but-mis-shaped `agents.json` (e.g. `null`, scalar, array) no longer throws raw `TypeError`s; load now validates shape and falls back.

8. **[#27862](https://github.com/google-gemini/gemini-cli/pull/27862) — `fix(cli)`: preserve executing subagent tool calls in UI**  
   Subagent tool calls were vanishing from the UI while still active; restored via `useToolScheduler` change.

9. **[#27863](https://github.com/google-gemini/gemini-cli/pull/27863) — `fix(core)`: prioritize structured display titles for tool invocations**  
   `getDisplayTitle()` now prefers `_toolDisplayName` over generic `_toolName`, giving extensions better UI real estate.

10. **[#29125](https://github.com/google-gemini/gemini-cli/pull/29125) — `fix(cli)`: convert hook timeout seconds → ms in migration**  
    `gemini hooks migrate` copied Claude Code's seconds-based timeout verbatim, producing a 30 ms effective timeout. Now converted.

## Feature Request Trends

- **AST-aware tooling is becoming a top theme.** Two linked issues (#22745 EPIC, #22746 platform investigation) plus #19561 ("Tactful Extraction" surgical reads) signal a community push to replace firehose-style `read_file` with semantic, context-bounded alternatives.
- **Auto Memory maturity.** Four clustered issues (#26516, #26522, #26523, #26525) describe a coordinated hardening pass covering secret redaction, retry loops, patch validation, and observability — treating Auto Memory as a first-class subsystem.
- **Subagent observability & DX.** #22598 (subagent trajectories in `/chat share`) and #21763 (subagent context in `/bug` reports) point to a recurring ask: make subagent behavior inspectable, not just invocable.
- **Safer default agent behavior.** #22672 (discourage destructive git/DB commands) and #23571 (model littering `tmp` scripts) reflect demand for built-in guardrails around side effects.
- **Browser agent hardening.** Three concurrent issues (#21983 Wayland, #22267 settings overrides, #22232 session takeover) show users pushing browser-agent from "demo" to "daily driver" reliability.
- **Sandboxing as a platform.** #19873's OS-level sandbox + intent routing represents a long-arc direction the maintainers are openly soliciting feedback on.

## Developer Pain Points

- **Hangs and silent terminations** are the single most-reported class of bug this cycle: generalist agent hangs (#21409), shell completion hangs (#25166), subagent fake-success (#22323), Wayland browser crash (#21983). The unifying theme is *the user can't tell whether work actually completed*.
- **Configuration drift / override failures.** Browser agent ignoring `settings.json` (#

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-14

## 1. Today's Highlights

No new releases were published in the last 24 hours, but community attention is firmly on **runtime correctness in v1.0.83**: a workspace `.mcp.json` discovery regression (Issue #4832), a hard crash in voice mode on Linux (Issue #4833), and a prompt-caching / token-cost pathology when subagents chain long tool-call sequences (Issue #4829) all surfaced in the same window. Meanwhile, two routine Dependabot bumps for `actions/stale` and `actions/github-script` were merged, signaling steady CI hygiene but no feature movement.

## 2. Releases

*No new releases in the last 24 hours. The latest tracked version referenced in newly filed bugs is `1.0.83`.*

## 3. Hot Issues

1. **[#4832 — Workspace `.mcp.json` is never loaded in CLI 1.0.83](https://github.com/github/copilot-cli/issues/4832)** — `copilot mcp list` no longer emits a `Workspace` group, and servers from a repo-root `.mcp.json` are silently never started. Important because it silently breaks local dev workflows that rely on per-repo MCP server definitions; the session log contains no error. New (0 👍).
2. **[#4833 — Voice mode crashes CLI with ONNX Runtime assertion in Nemotron ASR on Linux](https://github.com/github/copilot-cli/issues/4833)** — Voice input aborts with `SIGABRT` and dumps core on Linux x64 (Manjaro) via the local Nemotron speech model. Material for any Linux user of the new voice mode; severity is high since it is a hard crash, not a degraded path. New (0 👍).
3. **[#4829 — Subagents with long tool-call sequences break prompt caching and inflate tokens](https://github.com/github/copilot-cli/issues/4829)** — A subagent can issue hundreds of tool calls in one turn, busting prompt-cache reuse and compounding token spend (Windows 11 / PowerShell, Gemini 3.8 Flash). High economic impact for power users running autonomous `task`-style agents; only 1 comment but it touches cost + perf. New (0 👍).
4. **[#2254 — Add live progress streaming for background sub-agents](https://github.com/github/copilot-cli/issues/2254)** — Long-standing observability gap: when orchestrator agents run multi-phase plans, `/tasks` only exposes a tool-call counter. A real request for richer progress events has lingered since March; resurfaced today with maintainer attention (1 comment, updated 2026-09-13). 0 👍.

## 4. Key PR Progress

1. **[#4827 — build(deps): bump actions/stale from 9.1.0 → 11.0.0](https://github.com/github/copilot-cli/pull/4827)** — Routine Dependabot bump to the stale-issue workflow. Note v11 is a major version; worth scanning its release notes for behavior changes around `close-prs`, exemptions, or label handling. Merged/closed.
2. **[#4828 — build(deps): bump actions/github-script from 7.1.0 → 9.0.0](https://github.com/github/copilot-cli/pull/4828)** — Routine Dependabot bump of the GitHub Actions scripting helper. Major version jump, so any custom step scripts that relied on a specific Node runtime or `github-script` API surface should be re-tested. Merged/closed.

## 5. Hot Discussions

*No GitHub Discussions data was provided for this window — section omitted.*

## 6. Feature Request Trends

- **Sub-agent observability** — The most persistent open thread (Issue #2254) is for live, structured progress events from background sub-agents (phase, tool, elapsed time, intermediate artifacts), not just a tool-call counter.
- **Workspace-scoped MCP configuration reliability** — Implicit in #4832: developers want `.mcp.json` at repo root to be a first-class, predictable source of MCP servers with explicit, observable load status.
- **Cheaper, cache-friendly long-running agent loops** — #4829 highlights a clear demand for harness-level mitigations (compaction, turn splitting, cache-aware retries) so multi-hundred-call subagent runs don't burn cache and tokens.

## 7. Developer Pain Points

- **Silent regressions on documented config paths** (`.mcp.json` discovery in #4832): the most damaging failures here are the ones with no error, only an empty `mcp list` and missing servers.
- **Hard crashes on Linux voice mode** (#4833): a `SIGABRT` from ONNX Runtime in the Nemotron ASR path suggests the local-voice stack is still Linux-fragile.
- **Cost & cache ergonomics for autonomous agents** (#4829): long, single-turn subagent runs are breaking prompt-cache reuse, which is both a performance and a billable-cost pain point.
- **Limited observability into long-lived tasks** (#2254): operators driving multi-phase orchestrators effectively have to wrap their own logging because the CLI's `/tasks` surface is too thin.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-14

## Today's Highlights

The community is reacting strongly to a **forced V2 layout migration** on OpenCode Desktop, with multiple users reporting loss of productivity (no MCP toggle, no multi-worktree support, no way to revert). At the same time, a **critical regression in v1.18.30** (`TypeError` in `SystemPrompt.environment`) is breaking every prompt, and Zen's **Muse Spark family** is hitting `encrypted_content` errors on tool calls and image inputs.

## Releases

*No new releases in the last 24 hours.*

## Hot Issues

1. **[#4283](https://github.com/anomalyco/opencode/issues/4283) — Copy to clipboard not working** (133 💬, 124 👍). The single most-engaged issue on the board. Selecting assistant response text silently fails to copy, affecting basic terminal UX. Open since 2025-11; no clear resolution yet.
2. **[#48741](https://github.com/anomalyco/opencode/issues/48741) — Muse Spark critical errors on Zen (images & tool calls)** (21 💬). Provider-side `encrypted_request_error reasoning encrypted_content was not issued to this caller` blocks all Muse Spark models on Zen when any tool call or image is involved.
3. **[#23153](https://github.com/anomalyco/opencode/issues/23153) — Pay-Go with crypto** (22 💬, 51 👍). Long-standing feature request for crypto-based payments on opencode go; high community demand.
4. **[#43277](https://github.com/anomalyco/opencode/issues/43277) — Sessions permanently stuck, survive reboots** (14 💬). Sessions refuse new messages across full reboots and can't be cleared; points to server-side state corruption.
5. **[#39835](https://github.com/anomalyco/opencode/issues/39835) — No layout toggle for new users** (3 💬). New users see the V2 layout with no UI affordance to switch back; ties into the broader migration backlash.
6. **[#48645](https://github.com/anomalyco/opencode/issues/48645) — v1.18.30 regression: `TypeError` on every prompt** (4 💬). Every prompt crashes in `SystemPrompt.environment` reading `a.name`; 1.18.18 works fine. Bisected to the 1.18.30 release.
7. **[#46426](https://github.com/anomalyco/opencode/issues/46426) — MCP toggle missing in New UI** (3 💬). MCP servers configured in `config` cannot be enabled from the new Desktop UI; toggle only exists in legacy UI.
8. **[#34442](https://github.com/anomalyco/opencode/issues/34442) — Windows Desktop offline install is broken** (3 💬, 4 👍). `grep`, `glob`, `skill`, and `customize-opencode` fail without internet because `ripgrep` isn't bundled.
9. **[#38529](https://github.com/anomalyco/opencode/issues/38529) — Session list mixes unrelated non-git directories** (3 💬). `session list` and TUI filter expose sessions from unrelated non-git folders due to a missing directory filter.
10. **[#48850](https://github.com/anomalyco/opencode/issues/48850) — Desktop randomly marks turns as interrupted** (3 💬). Silent `AbortError` mid-turn on Windows with no UI feedback; turn simply stops.

Also noteworthy: **[#48805](https://github.com/anomalyco/opencode/issues/48805)** (same `encrypted_content` error on `muse-spark-1.3-contributor-free` when switching models mid-session), **[#48762](https://github.com/anomalyco/opencode/issues/48762)** (non-git Windows sessions hidden from TUI because `session.path` is absolute), and **[#48848](https://github.com/anomalyco/opencode/issues/48848)** (snapshot `index.lock` races wedge snapshots).

## Key PR Progress

1. **[#48871](https://github.com/anomalyco/opencode/pull/48871) — Fix: resolve directory to its project instead of global.** Closes #48870; `Project.resolve` will consult `project_directory` before falling back to `ID.global`, making sessions in non-git parent dirs attributable.
2. **[#44535](https://github.com/anomalyco/opencode/pull/44535) — Stop creating phantom "unknown" tool parts on re-emitted deltas.** Bug fix for #33618; only model-emitted tool calls will create tool parts.
3. **[#44264](https://github.com/anomalyco/opencode/pull/44264) — Add suffix compaction mode.** Experimental `compaction.mode: "suffix"` for session compaction, prepared by GPT-6 Astra.
4. **[#48867](https://github.com/anomalyco/opencode/pull/48867) — Make worktree APIs project-based.** All four worktree ops now require `projectID`; list/read uses saved inventory without activating plugins.
5. **[#45207](https://github.com/anomalyco/opencode/pull/45207) — TUI: show readable Effect errors.** Closes #34925; Effect `Cause` values no longer fall through to generic `JSON.stringify`.
6. **[#42319](https://github.com/anomalyco/opencode/pull/42319) — Recover corrupt snapshot index.** Snapshot capture recovers from an invalid private Git index after a failed capture.
7. **[#42326](https://github.com/anomalyco/opencode/pull/42326) — Accumulate step tokens instead of overwriting.** `processor.ts` was clobbering `assistantMessage.tokens` on every `step-finish`; now accumulates across steps.
8. **[#42340](https://github.com/anomalyco/opencode/pull/42340) — Stop `run` from sleeping through an exhausted quota.** Quota exhaustion now exits instead of hanging silently.
9. **[#42372](https://github.com/anomalyco/opencode/pull/42372) — Show tokens-per-second in context usage indicator.** Adds a live tok/s readout to the session header progress circle.
10. **[#42355](https://github.com/anomalyco/opencode/pull/42355) — Tolerate missing `{file:...}` config variables.** Missing file refs resolve to empty string instead of failing startup (fixes #15033).

## Feature Request Trends

- **Payment flexibility on OpenCode Go**: crypto / pay-as-you-go billing (#23153).
- **Layout / UI controls**: a working layout toggle and ability to revert from V2 (#39835, #48835, #48837, #48866).
- **Multi-worktree support in the new Desktop UI** (#48835).
- **MCP discoverability in the new UI**: an in-app toggle for MCP servers (#46426, #48859).
- **Better session/list hygiene**: directory-scoped session filtering, project attribution for non-git dirs (#38529, #48762, #48870).
- **Provider parity**: OpenAI-compatible replay support for PDF tool results (#48868); Gemini-compatible MCP schemas with nullable arrays (#48073).
- **Plugin ergonomics**: env injection for plugin `bash` (#11065), URL/file attachments preserved in v2 plugin tools (#47458).
- **Cosmetic UX polish**: wordmark entrance animation (#48841), tokens-per-second readout (#42372).
- **History controls**: option to clear recent projects/folders (#19546).

## Developer Pain Points

- **Migration without an escape hatch.** Forcing the V2 layout on existing users is producing concentrated backlash — broken MCP toggle, no multi-worktree, no revert — making the new UI a productivity regression for power users running 20+ sessions.
- **Release-quality regressions slipping through.** The v1.18.30 `TypeError` and the broken Windows offline installer show that core paths (system-prompt assembly, bundled dependencies) are not consistently validated before release.
- **Provider integration fragility.** `encrypted_content` errors on Muse Spark, the OpenAI-compatible 422 on PDF tool results, and Gemini rejecting MCP tools with nullable array schemas all point to cross-provider schema/feature handling that isn't robust.
- **Stuck state and silent failures.** Stuck sessions surviving reboots, randomly interrupted Desktop turns, and snapshots wedged by stale `index.lock` share a theme: errors aren't surfaced and recovery paths are missing.
- **Session/project attribution in non-git layouts.** Multiple recent issues (and PR #48871) describe sessions that are either hidden from the TUI, mixed across projects, or resolved to `ID.global` — developers with monorepos and non-git working directories feel this acutely.
- **Trivial regressions that linger.** Clipboard copy (#4283) has been open since November 2025 with 124 👍 and no shipped fix; copy-button-in-code-fence (#48839) is the same pattern in v2 web.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-14

## Today's Highlights
- A clear TUI-performance cluster emerged, with multiple reports of full-screen redraw storms, doubled thinking tokens, and crashes on large diffs/transcripts (#9255, #9549, #9542, #8036) — pointing to systemic rendering and streaming issues in long sessions.
- Major provider-expansion work landed or was proposed: Azure Foundry v3 support (#9558), server-side `serverTools` config (#9556/#9560), and ongoing Codex transport hardening (#9488, #9474).
- The community shipped several UX/quality improvements: session-tree branch deletion (#9531), human-readable model labels (#9541), and a loop-guard extension example (#9539).

## Releases
No new releases in the last 24 hours.

## Hot Issues
1. **#7739 — Set a startup-time budget targeting jcode-comparable latency and memory** [OPEN] — Long-running performance initiative using jcode's README benchmarks; the gap to pi 0.62.0 is quantified across 10 PTY launches. Matters because startup is a recurring complaint. [Link](https://github.com/earendil-works/pi/issues/7739)
2. **#8036 — Edit tool crashes TUI when rendering a large diff** [OPEN] — The built-in `edit` tool crashed the TUI on a 14.5 MB HTML diff; the crash also persists into session resume. High-impact stability bug for anyone editing large generated files. [Link](https://github.com/earendil-works/pi/issues/8036)
3. **#9255 — TuiMainScreen full-screen redraw storm on long transcripts** [OPEN] — `firstChanged < prevViewportTop → fullRender(true)` fires nearly every frame when a streaming thinking tail grows above the viewport, causing "doubled text" and violent jumps. Reproducible and architecturally precise. [Link](https://github.com/earendil-works/pi/issues/9255)
4. **#9075 — Compaction summarisation inherits session thinking level on adaptive models** [OPEN] — Thinking tokens count against `max_tokens` on Anthropic adaptive models, so high-effort compaction deterministically hits the output cap. Only issue this cycle with 👍 reactions (3). [Link](https://github.com/earendil-works/pi/issues/9075)
5. **#9474 — Codex transport: no non-resetting per-request total deadline** [OPEN] — Periodic SSE/WebSocket keep-alives defeat idle timeouts, leaving no wall-clock deadline against stalled streams. Affects Codex and the OpenAI-compatible path. [Link](https://github.com/earendil-works/pi/issues/9474)
6. **#9561 — Length-truncated response with many tool calls materializes one error toolResult per call** — A model collapse produced **14,408 tool calls** in one response, ending in a 14k-entry error wall that floods context. Highlights an error-amplification footgun in truncation paths. [Link](https://github.com/earendil-works/pi/issues/9561)
7. **#9565 — Unwritable jiti cache causes repeated extension recompilation and slow startup** — On multi-user Linux, `/tmp/jiti` symlinking into another user's `0700` dir forces recompiles every launch. Concrete, reproducible with `JITI_DEBUG=1`. [Link](https://github.com/earendil-works/pi/issues/9565)
8. **#9562 / #9563 — MCP adapter keychain + OAuth refresh races** — Keychain rewrites wipe external silent-read grants (#9562); concurrent sessions race OAuth refresh and invalidate the shared token chain (#9563). Both relate to MCP OAuth on macOS. [Links](https://github.com/earendil-works/pi/issues/9562)
9. **#9557 — Anthropic adapter drops root-level JSON Schema keywords (`anyOf`, `oneOf`, etc.)** — The non-strict `input_schema` path strips all root keywords beyond `type/properties/required`, silently breaking tools that rely on union schemas. Clear correctness bug with a one-line fix direction. [Link](https://github.com/earendil-works/pi/issues/9557)
10. **#9549 — Large transcripts re-render every frame; resize re-emits the whole transcript** — Verified with `pi -ne` (no extensions) on Windows 11 / 2 logical cores, saturating one CPU. Same family as #9255 but with a separate resize repro path. [Link](https://github.com/earendil-works/pi/issues/9549)

## Key PR Progress
1. **#9548 — Mid conversation system messages** [OPEN] — Records system prompt and tool changes in the transcript instead of silently rewriting its starting conditions, enabling proper restoration after resume/branch navigation and preserving cached prompt prefixes. Authored by mitsuhiko. [Link](https://github.com/earendil-works/pi/pull/9548)
2. **#9488 — Add canonical Codex turn attribution** [OPEN] — Adds provider-neutral `requestIdentity` (session/thread/turn/window/request-kind) so tool continuations, retries, steering, and compaction recovery can be correlated. Targets long-standing Codex attribution gaps. [Link](https://github.com/earendil-works/pi/pull/9488)
3. **#9556 — `serverTools`: declare provider server-side tools in model config** — Appends raw API-native tool entries verbatim to OpenAI Responses and Anthropic Messages; unlocks Zhipu GLM coding-plan `web_search`, Anthropic `web_search`, etc. Companion proposal in #9560. [Link](https://github.com/earendil-works/pi/pull/9556)
4. **#9531 — Permanent branch deletion from session tree** — `SessionManager.pruneBranch()` + `countSubtree()` plus `shift+d` in `/tree`; protects the active path and leaf, re-chains labels, re-points surviving compactions. [Link](https://github.com/earendil-works/pi/pull/9531)
5. **#9558 — Azure Foundry v3 support** — Anthropic on Azure Foundry, with stream/abort/empty/context-overflow/unicode/tool-call/image/total-tokens tests added to the AI test matrix. [Link](https://github.com/earendil-works/pi/pull/9558)
6. **#9543 — "Exit" tool for models** — Lets the model end the session so user intents like "bye" or `/exit` work without manual `/quit`. Pairs with the `/exit` alias discussion in #4538. [Link](https://github.com/earendil-works/pi/pull/9543)
7. **#9541 — Show human model labels** — Renders governed-catalog `name` as the primary label in model pickers instead of raw ids, with the technical id relegated to a detail line. [Link](https://github.com/earendil-works/pi/pull/9541)
8. **#9539 — `examples/extensions/loop-guard.ts`** — Reference extension that detects and breaks the "same tool + same arguments, repeated N times" failure mode common in agents that loop on failing verifications. [Link](https://github.com/earendil-works/pi/pull/9539)
9. **#9550 — Compact before send using system and tool tokens** [Withdrawn] — Author withdrew; superseded or replaced. Worth tracking as a near-miss on context-budget work. [Link](https://github.com/earendil-works/pi/pull/9550)

## Hot Discussions

### Show and tell
1. **#9552 — Pi Heao GUI: a Windows desktop client for pi** — Built on the existing `pi-agent-studio` chat UI rather than reimplementing it, packaged as a native Windows window for daily use. Worth a look for anyone running pi in TUI on Windows. [Link](https://github.com/earendil-works/pi/discussions/9552)

## Feature Request Trends
- **TUI rendering perf & correctness** dominates the issue list: fullscreen redraw storms (#9255), per-frame re-renders on resize (#9549), first thinking token rendered twice (#9542), ScrollView swallowing mouse events (#9538), edit-tool crash on huge diffs (#8036), and `compaction_end` wiping the transcript (#9555). The community is pushing hard toward viewport-diffing and immutable streaming snapshots.
- **Server-side / native provider tools** is becoming a first-class config axis: `serverTools` for OpenAI Responses and Anthropic Messages (#9556, #9560), plus extension APIs to inject live session views into the main transcript (#9551) and modal working-visibility leases (#9536).
- **Session-tree as a real navigation surface**: branch deletion (#9531), correcting parent-session nesting by `cwd` (#9547), and a feature-flagged `newSessionInherits` for model/effort carry-over (#9054).
- **Provider breadth**: Azure Foundry Anthropic (#9558), commandcode (#9553), llama.cpp live-model resolution for subagents (#9559), zai/glm-5.3-flash reasoning routing (#9554).
- **Reliability for SDK/embedded use**: custom-`agentDir` login status paths (#9537), lazy extension loader to keep `pi-coding-agent` embeddable without the full TUI (#9540).

## Developer Pain Points
- **Long sessions are fragile**: large transcripts trigger render storms, CPU saturation, and edit/diff crashes — a coherent pain point across #9255, #9549, #8036, #9542, #9538.
- **Compaction is brittle**: adaptive-model thinking leaks into the summariser (#9075), and `compaction_end` unconditionally clears the visible transcript (#9555).
- **MCP OAuth on macOS** has two distinct race/reset failure modes (#9562, #9563) that bite production fleets running many headless sessions.
- **Multi-user / locked-down environments** expose startup-time regressions via jiti cache permissions (#9565).
- **Tool-schema fidelity** drops silently on the Anthropic non-strict path (#9557), and error amplification on length-truncated runs can flood context (#9561) — both make tool-using agents harder to trust at scale.
- **GitHub Copilot OAuth** refresh intermittently 403s on Windows (#9546), suggesting transport/UA fingerprinting issues specific to that path.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-14

## Today's Highlights

The 0.23.3-nightly release ships alongside a **major new cua-driver-rs v0.20.6** providing signed macOS binaries and Windows UIAcess support, expanding the desktop automation footprint. A **cluster of P1 TUI crashes** (React #185 "Maximum update depth exceeded") tied to background agents dominated issue traffic, with three independent reproductions (#11500, #11756, #11783). Meanwhile, a **bwrap kernel sandbox backend** (#11614) and **container execution for subagents** (#11711) advanced the platform's security and isolation story.

## Releases

- **[v0.23.3-nightly.20260913.faa395885e](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3-nightly.20260913.faa395885e)** — Removes obsolete background response aggregation in DingTalk channels and reorganizes the `feat(channels)` surface.
- **[cua-driver-rs v0.20.6](https://github.com/QwenLM/qwen-code)** — Qwen CUA Driver prebuilt binaries (vendored under `packages/cua-driver`): macOS codesigned + notarized universal binary with `QwenCuaDriver.app`; Linux unsigned x86_64 + arm64 (glibc 2.31+); Windows unsigned UIAccess worker + native SDK payload (x86_64 + arm64).

## Hot Issues

1. **[#11500 — TUI exits silently with React #185 during concurrent background agents](https://github.com/QwenLM/qwen-code/issues/11500)** (P1, 12 comments) — Ink `useBoxMetrics` layout-listener enters a setState loop when multiple background agents complete close together; the TUI dies with no error UI. **Why it matters:** This is the central reproducible instance of a bug now reported across three issues today.
2. **[#11587 — Deferred review findings from PR #11562](https://github.com/QwenLM/qwen-code/issues/11587)** (6 comments) — Autofix-deferred review items kept the bar high on the one-shot system reminder fix.
3. **[#11465 — web-shell `session-workflow-cockpit-light` renders nondeterministically](https://github.com/QwenLM/qwen-code/issues/11465)** (P3, 5 comments) — 1.31% pixel diff on one run, 0% on next; visual preview publishing depends on perceptual diffs that the pipeline cannot trust.
4. **[#11777 — CI `Test` job SIGTERMs at workspace→test:scripts handoff](https://github.com/QwenLM/qwen-code/issues/11777)** (P1, 4 comments) — All tests pass green, then `npm run test:ci` is killed externally, marking the required check red.
5. **[#11718 — Desktop AppImage `PYTHONHOME`/`PYTHONPATH` leak into stdio MCP servers](https://github.com/QwenLM/qwen-code/issues/11718)** (P2, CLOSED, 4 comments) — Bundled Python env vars poisoned external Python interpreters spawned by MCP configs. **Why it matters:** A real packaging-time security boundary failure affecting every AppImage user.
6. **[#11756 — Virtualized history crashes with React #185](https://github.com/QwenLM/qwen-code/issues/11756)** (P1, 4 comments) — Confirms the background-agent React loop repros on stable 0.23.3 and main when Virtualized History is enabled.
7. **[#11724 — High memory usage (7.00 GB) crashes long-running sessions on Windows](https://github.com/QwenLM/qwen-code/issues/11724)** (P2, 4 comments) — Sessions die mid-task and cannot be resumed; user must rebuild progress from scratch.
8. **[#11590 — Auto-injected `metadata` field breaks non-Qwen models on DashScope OpenAI-compatible endpoint](https://github.com/QwenLM/qwen-code/issues/11590)** (P1, CLOSED, 4 comments) — Aggregated gateway forwards `metadata` to vendor backends that expect a `string`; causes 400 on every non-Qwen model.
9. **[#11736 — web-shell 200-record history-viewport smoke case times out at 60s budget](https://github.com/QwenLM/qwen-code/issues/11736)** (P2, CLOSED, 4 comments) — Single e2e case consumes 75–91% of its budget; turns an unrelated PR red.
10. **[#7167 — Fleet Shepherd Dashboard](https://github.com/QwenLM/qwen-code/issues/7167)** (3 comments) — Auto-maintained bot dashboard; tracks the autonomous fleet that drives the daily PR/issue churn.

## Key PR Progress

1. **[#11711 — feat(core): add container execution for subagents](https://github.com/QwenLM/qwen-code/pull/11711)** — Opt-in `QWEN_AGENT_EXECUTION_BACKEND=docker|podman`; agent definitions can require `executionBackend: container`. Significant security/isolation step.
2. **[#11614 — feat(cli): add bwrap kernel sandbox backend for Linux](https://github.com/QwenLM/qwen-code/pull/11614)** — Container-free, root-free, daemon-free, image-free sandbox using the kernel directly; opt-in by name, default behavior unchanged on any platform.
3. **[#11636 — feat: track background result execution across daemon and web shell](https://github.com/QwenLM/qwen-code/pull/11636)** — Explicit daemon lifecycle for background-result processing with replay, cancellation, and permissions support.
4. **[#11722 — feat(web-shell): add PWA installability and Android development shell](https://github.com/QwenLM/qwen-code/pull/11722)** — Production service worker + install metadata; content-addressed caching with strict revalidation rules for app HTML and authenticated traffic.
5. **[#11794 — fix(cli): honor output language in stateless generation](https://github.com/QwenLM/qwen-code/pull/11794)** — Workspace and `-p` generation now apply the user's output-language rule as a system instruction overriding the interface fallback.
6. **[#11538 — feat: select the OpenAI wire API per model](https://github.com/QwenLM/qwen-code/pull/11538)** — Per-model `wireApi: "chat-completions" | "responses"`; both APIs live in the `openai` provider group with cross-surface (CLI/ACP/daemon/Web Shell/VS Code) propagation.
7. **[#10410 — feat(core): preserve prompt cache for deferred tools](https://github.com/QwenLM/qwen-code/pull/10410)** — Replaces deferred-tool schema revelation with a `tool_search` / `tool_call` bridge that keeps the declared tool list stable, preserving prompt caching.
8. **[#11086 — feat(serve): scope extensions to workspace runtimes](https://github.com/QwenLM/qwen-code/pull/11086)** — Reconciles the global extension catalog into per-workspace runtimes; ~20 review rounds, now with deferred follow-ups in #11793.
9. **[#11782 — feat(web-shell): add manual compression to composer context hover](https://github.com/QwenLM/qwen-code/pull/11782)** — Adds View details + manual compression; shares compression state with the right context panel.
10. **[#11692 — feat(core): make the web_search budget configurable and bound the extractor fallback](https://github.com/QwenLM/qwen-code/pull/11692)** — `tools.webSearch.timeoutMs` (default 120s, env `WEB_SEARCH_TIMEOUT_MS`); bounds what the model sees when search exhausts its budget.

## Feature Request Trends

Distilled from recent issues and PR descriptions:

- **Sandboxing & isolation depth** — Kernel-level (bwrap) sandboxing (#11614) and container execution for subagents (#11711) are the two strongest directions; the open Bash allow-rule escape (#11764) reinforces demand for stronger sandbox primitives.
- **Non-Qwen model compatibility** — The DashScope `metadata` issue (#11590) and the SGLang `signature`-less thinking-block replay (#11772) both reflect a need for cleaner gateway/pipeline abstraction across third-party providers.
- **Web Shell maturation** — PWA installability (#11722), manual compression (#11782), deferred-task sidebar (#11635), scheduled-task visibility (#11738), and conversation-language explanations (#11791) point to a sustained push to make the Web Shell a first-class client.
- **Per-model wire-protocol control** — #11538's chat-completions vs responses selection responds to operators who run heterogeneous model fleets through one CLI.
- **Background automation durability** — Daemon turn-status polling (#11773), runtime-recycle retry semantics (#11767), and background-result lifecycle (#11636) all surface the same theme: making long-running agent runs observable and recoverable.

## Developer Pain Points

- **TUI render-loop instability under concurrent background agents** — Three independent reproductions (#11500, #11756, #11783) of React #185 in the same window; points at an Ink/Virtualized-History interaction that needs a structural fix, not patches.
- **CI flakiness on the required `Test (ubuntu-latest, Node 22.x)` lane** — SIGTERMs at handoff (#11777), `tsc --build` OOM at 3072 MB heap cap (#11780), and historic nondeterministic failures (#10490) are eroding trust in the lane.
- **Long-session memory blowups on Windows** — 7 GB peaks with no resume path (#11724, #11725); users cannot recover progress.
- **Auto-mode approval classifier broken** — Approvals never reach the classifier in API-driven hosts (#11019); approval mode silently reverts to AUTO on session rebuild.
- **LSP staleness after on-disk edits** — Hover still reports the pre-edit type (#11439); affects any native LSP integration.
- **AppImage env leaks** — Bundled Python `PYTHONHOME`/`PYTHONPATH` poisoning child MCP servers (#11718) — packaging hygiene needed across desktop builds.
- **Telemetry redaction gaps** — No value-level pin in `qwen-logger.test.ts` and missing attribution for non-command hook failures (#11760).
- **`/delete` leaves `logs.json` behind** — Session deletion is incomplete (#11762); users expecting full removal still leak conversation content.
- **Bash allow-rule escape** — A backslash inside single quotes lets a rule authorize a second, unconfirmed command (#11764).
- **Cross-platform runtime detection** — TUI silently dies on RHEL 10 with broken Intl.Segmenter / no full ICU data (#11747); no actionable diagnostic emitted.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*