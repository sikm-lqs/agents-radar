# AI CLI Tools Community Digest 2026-09-13

> Generated: 2026-09-13 11:31 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report — AI CLI Ecosystem
**Date: 2026-09-13 | Sources: Community digests for 7 major tools**

---

## 1. Ecosystem Overview

The AI CLI category has consolidated into two camps: first-party CLIs tied to model subscriptions (Claude Code, Codex, Gemini CLI, Copilot CLI) and provider-agnostic open-source harnesses (OpenCode, Pi, Qwen Code). Engineering attention is converging on the same hard problems everywhere — sandboxed execution, long-horizon context management, and subagent lifecycle guarantees — while **Windows platform parity remains the single largest source of top-severity bugs across every tool**. Interop is emerging bottom-up: Gemini CLI now migrates Claude Code's hooks format (#29124/#29125), Pi implements Codex's turn-attribution metadata (#9488), and OpenCode tunes against Anthropic's prompt-cache semantics (#48777). Velocity is uneven — nightly trains (Gemini, Qwen) and same-day hotfixes (OpenCode) contrast sharply with maintenance-only days (Copilot CLI).

---

## 2. Activity Comparison

*Counts are items surfaced in today's curated digests, not aggregate GitHub totals. All seven repos had active Issue/PR trackers this window (no N/A needed there); Discussions marked N/A where no data was provided.*

| Tool | Issues surfaced | PRs surfaced | Discussions | Release (24h) |
|---|---|---|---|---|
| **Claude Code** | 10 (+4 mentions) | 6 | N/A* | ✅ v2.1.270 (revert patch) |
| **OpenAI Codex** | 10 | 10 | 5 | None |
| **Gemini CLI** | 10 | 10 | N/A* | ✅ v0.61.0-nightly |
| **Copilot CLI** | 7 | 3 | N/A* | None |
| **OpenCode** | 10 | 10 | N/A* | None |
| **Pi** | 10 | 7 | 1 | None |
| **Qwen Code** | 10 | 10 | N/A* | ✅ v0.23.3-nightly + cua-driver-rs v0.20.6 |

\* *No discussion data in digest window — not evidence of inactivity.*

**Engagement superlatives:** Claude Code #85891 (239 👍, highest in dataset) and #42776 (180 comments); Codex #40700 (48 comments) and #21803 (37 👍, top feature ask); OpenCode #36942 (31 👍). Codex has the broadest discussion footprint, including a maintained 150+-tool ecosystem index (#16329).

---

## 3. Shared Feature Directions

1. **OS-level / containerized sandboxing** — the most converged direction, with 3 of 7 building concurrently: Codex (MXC backend wiring #45176, cleanup phases #45178, token-group hardening #45182), Gemini (Seatbelt/bubblewrap epic #19873, boundary hardening #29214), Qwen (harness/executor split #11695, docker/podman backends #11711, review leases #11540).
2. **Subagent reliability & lifecycle guarantees** — Gemini (P1 hang #21409, false `GOAL` success #22323/#21983), Claude Code (silent background-agent death on sleep #63023), Qwen (React #185 crash cluster #11500/#11732/#11756), Copilot (observability ask #2254), Codex (async messaging #45124), Pi (turn attribution #9481, loop-guard).
3. **Compaction safety & context-budget UX** — Codex (in-place transcript destruction #44363, ~150k cached-token replay #44386), Claude Code ("usage limit" masking compaction failure, PR #61716 open ~4 months), Qwen (capacity overview + manual compression #11700), Gemini (recursive-retrieval drift risk, discussion #42703).
4. **Prompt-cache / cost preservation** — OpenCode (frozen system prompt #48777, 0% cache via proxy #45750), Copilot (#4829), Codex (#45094). Cache-busting regressions now draw immediate reports — cost observability is a baseline expectation.
5. **Persistent / self-evolving agent memory** — Codex `/learn` RFC #40575 (29 comments), Gemini Auto Memory hardening (#26525 redaction, #26522 loop suppression), Qwen (#11280 skill re-application on resume).
6. **Windows parity** — Claude Code (#42776, #85891, #84792 MSIX), Codex (#40700 launch failure, #42299 global Alt+P capture), OpenCode (ConPTY exit corruption #48776, WSL #48796, non-git sessions #48762).
7. **Cross-device / thin-client reach** — Codex (#21803 cloud sync, 37 👍), Qwen (#11704 Android over ACP, #11548 remote daemon, #11086 workspace-scoped serve).
8. **Telemetry redaction** — Qwen (#11198, P1 security: unredacted tool-error upload) and Gemini (#26525) both face pressure to redact before transmission.

---

## 4. Differentiation Analysis

- **Claude Code** — largest community scale; differentiates via plugin ("mods") ecosystem formalization (per-mod test harness #93912/#93951, built-in UI parity #93452). Bottleneck: desktop packaging and Windows distribution quality.
- **Codex** — deepest systems engineering (sandbox internals, SID handling, supply-chain bumps) and a design-by-RFC culture. Risk surface: compaction is currently data-destructive (#44363).
- **Gemini CLI** — most disciplined triage (P1–P3, size labels, nightly automation); invests in foundational capability epics (AST-aware tooling #22745) rather than features, and explicitly implements competitors' formats — a de facto standard play.
- **Copilot CLI** — multi-model harness inside GitHub's platform (claude-opus-5, gpt-5.4 in play); today's activity was purely hygiene (SHA-pinned Actions, Dependabot). User asks center on observability and cost, not features.
- **OpenCode** — the provider-agnostic aggregator (Zen, Kimi, cerebras, proxies); fastest response loop in the dataset (issue #48776 → merged hotfix #48782 same day); unique TUI inclusivity investment (native RTL/bidi #48587).
- **Pi** — positioning as a protocol-compatibility layer: Codex turn-attribution parity, OAuth subscription logins (Antigravity, Cursor Pro, Meta/Muse), extension API, and a formal performance SLO (#7739). Targets extension authors and multi-provider power users.
- **Qwen Code** — most ambitious in-flight architecture refactor (harness/executor decoupling #11695, container execution #11711) plus a mobile/daemon strategy and separately-shipped native CUA driver; carries notable telemetry-privacy debt (#11198) and an unresolved TUI crash cluster.

**Target-user split:** first-party model subscribers (Claude, Codex, Gemini) vs. bring-your-own-model and self-hosters (OpenCode, Pi, Qwen; Copilot straddles both).

---

## 5. Community Momentum & Maturity

- **Engagement leaders:** Claude Code is an outlier (180-comment and 239-👍 threads — the price of scale is visible in Windows friction accumulating for months). Codex has the broadest discussion culture; OpenCode shows strong upvote-driven prioritization signals.
- **Fastest iteration:** Gemini (nightly + prioritized triage), Qwen (nightly plus an independently versioned native binary), OpenCode (same-day hotfixes), Codex (~10 merged PRs, bot-assisted merge throughput).
- **Slowest visible velocity:** Copilot CLI — 3 maintenance PRs, no releases, no discussions surfaced. A single window can't distinguish "stable product" from "development happens elsewhere," but it's the clearest outlier.
- **Pi** shows small comment volumes (≤6) but unusually high engineering density per thread — early-stage but healthy.
- **Maturity read:** Claude Code and Codex exhibit scale *and* scale-related pain (distribution, billing edge cases); Gemini/Qwen/OpenCode are iterating fastest on architecture; Pi is niche but strategically coherent.

---

## 6. Trend Signals

1. **Sandbox-or-bust.** Execution isolation is migrating from policy allow-lists to OS/container primitives. When evaluating tooling, weight a public sandbox roadmap heavily.
2. **De facto standards emerge bottom-up.** Claude Code's hooks format (now migrated by Gemini), Codex's session/turn metadata (implemented by Pi), and Anthropic cache semantics (tuned by OpenCode) are becoming interop layers — building on them reduces lock-in.
3. **Sessions are becoming long-lived, branchable resources.** Fork/branch ergonomics (Pi), resume fidelity bugs (everywhere), and Codex's compaction data-loss bug (#44363) mark durable transcripts and non-destructive compaction as the next competitive differentiator.
4. **Cost/cache observability is table stakes.** Silent cache-busting now generates same-day issue reports across three tools.
5. **Thin client, fat daemon, mobile companion.** Qwen's remote-daemon Web Shell and Android proposal plus Codex's top-voted sync request indicate remote-control protocols will matter in tool selection.
6. **Windows is table stakes nobody has cleared.** Windows-primary orgs should budget for platform-specific breakage today.
7. **Telemetry scrutiny is rising.** Default-on, unredacted telemetry (Qwen #11198) is now treated as a security issue by users — audit what your CLI uploads by default.

**Bottom line for evaluators:** shortlist on sandbox architecture, compaction safety, and cache transparency; treat Windows support maturity as a risk multiplier; and watch the interop standards above as the ecosystem's emerging common ground.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data snapshot:** 2026-09-13 | **Source:** github.com/anthropics/skills

> **Methodology note:** PR comment counts are unavailable in this snapshot (all marked `undefined`), so ranking uses a composite signal — issue linkage (referenced bugs/repros), update recency, and PR clustering around shared pain points. Issue-side engagement uses confirmed comment counts.

---

## 1. Top Skills Ranking (by community attention)

### 1. `skill-creator` — Eval Pipeline Repair (highest-volume thread)
- **PR #1298** — fix: `run_eval.py` always reports 0% recall ([link](https://github.com/anthropics/skills/pull/1298))
- **PR #1099** — Windows subprocess crash fix ([link](https://github.com/anthropics/skills/pull/1099))
- **PR #1050** — Windows subprocess + encoding bugs ([link](https://github.com/anthropics/skills/pull/1050))
- **Linked issue #556** — 12 comments, 10+ independent reproductions ([link](https://github.com/anthropics/skills/issues/556))
- **Discussion:** The description-optimization loop is currently optimizing against noise. Three separate PRs target the same `run_eval.py` defect, indicating this is the single most-reported failure in the repo. **Status:** All OPEN.

### 2. `mcp-builder` — Eval Harness & SDK Compatibility
- **PR #1742** — `mcp>=2` import path & custom headers ([link](https://github.com/anthropics/skills/pull/1742))
- **PR #1724** — bump default eval model to claude-sonnet-5 ([link](https://github.com/anthropics/skills/pull/1724))
- **PR #1602** — serialization, metrics, encoding, stability ([link](https://github.com/anthropics/skills/pull/1602))
- **Linked issue #1390** — 4 comments: Phase-4 eval scores 0/N on all real MCP servers ([link](https://github.com/anthropics/skills/issues/1390))
- **Discussion:** Eval tooling is broken end-to-end: scoring fabricates tool errors (`TextContent` not JSON-serializable), and the SDK it imports from has already moved underneath it. **Status:** All OPEN.

### 3. `claude-api` — Model Lifecycle Hygiene
- **PR #1607** — mark four retired model IDs as retired ([link](https://github.com/anthropics/skills/pull/1607))
- **Linked issue #1487** — 4 comments: skill eagerly injects ~156k tokens, exhausting context in one tool call ([link](https://github.com/anthropics/skills/issues/1487))
- **Discussion:** Documented models contradict current SDK reality, and eager injection breaks single-call workflows. **Status:** OPEN.

### 4. `pdf` — Case-Sensitive File References
- **PR #538** — correct case-sensitive file refs in SKILL.md ([link](https://github.com/anthropics/skills/pull/538))
- **Discussion:** 8 mismatches between documented (`REFERENCE.md`, `FORMS.md`) and actual (`reference.md`, `forms.md`) filenames — silently breaks on Linux. Quietly open since March. **Status:** OPEN.

### 5. `docx` — Tracked-Change & Bookmark ID Collisions
- **PR #541** — prevent `w:id` collision between tracked changes and bookmarks ([link](https://github.com/anthropics/skills/pull/541))
- **PR #1734** — detect orphaned docx comments ([link](https://github.com/anthropics/skills/pull/1734))
- **Discussion:** OOXML's shared ID space causes document corruption; the docx skill continues to attract low-level correctness fixes. **Status:** Both OPEN.

### 6. `frontend-design` — Skill Clarity Refactor
- **PR #210** — improve clarity and actionability ([link](https://github.com/anthropics/skills/pull/210))
- **Discussion:** A foundational creative skill being rewritten so instructions are actually executable inside one conversation. **Status:** OPEN.

### 7. `web-artifacts-builder` — Toolchain Drift
- **Linked issue #1362** — 3 comments: pnpm ≥10.1 ERR_PNPM_IGNORED_BUILDS, stale favicon strip, font inlining ([link](https://github.com/anthropics/skills/issues/1362))
- **Discussion:** Bundling scripts have fallen behind upstream package managers. **Status:** OPEN.

### 8. `document-typography` — New Skill Proposal
- **PR #514** — typographic quality control (orphans, widows, numbering) ([link](https://github.com/anthropics/skills/pull/514))
- **Discussion:** Targets a near-universal failure mode in AI-generated documents. Slow merge velocity suggests bar for new document-quality skills is high. **Status:** OPEN.

---

## 2. Community Demand Trends

| Rank | Theme | Evidence |
|---|---|---|
| 1 | **Security & trust boundaries** | Issue #492 — 43 comments, 2 👍: community skills distributed under `anthropic/` namespace enable impersonation ([link](https://github.com/anthropics/skills/issues/492)) |
| 2 | **Org-wide skill distribution** | Issue #228 — 16 comments, 8 👍: request for native sharing inside Claude.ai ([link](https://github.com/anthropics/skills/issues/228)) |
| 3 | **Multi-agent orchestration** | PR #1628 Hivemind ([link](https://github.com/anthropics/skills/pull/1628)); Issue #1385 Reasoning Quality Gate Pipeline ([link](https://github.com/anthropics/skills/issues/1385)) |
| 4 | **Cross-platform reliability (Windows)** | Three PRs (#1298, #1099, #1050) and multiple fixes against the same root cause |
| 5 | **Skill self-audit & quality** | PR #1367 self-audit ([link](https://github.com/anthropics/skills/pull/1367)); PR #83 skill-quality-analyzer ([link](https://github.com/anthropics/skills/pull/83)) |
| 6 | **Skills ↔ MCP bridge** | Issue #16 — "Expose Skills as MCPs", 4 comments ([link](https://github.com/anthropics/skills/issues/16)) |
| 7 | **Compact / token-efficient memory** | Issue #1329 — compact-memory proposal, 9 comments ([link](https://github.com/anthropics/skills/issues/1329)); Issue #1487 — 156k-token eager injection |
| 8 | **Cloud-platform portability** | Issue #29 — Bedrock usage, 4 comments ([link](https://github.com/anthropics/skills/issues/29)) |
| 9 | **Document workflow coverage** | PR #486 ODT ([link](https://github.com/anthropics/skills/pull/486)); PR #514 typography; PR #1627 Buffer API for content scheduling ([link](https://github.com/anthropics/skills/pull/1627)) |

---

## 3. High-Potential Pending Skills

These PRs are not yet merged but carry the strongest signals of imminent landing:

| PR | Skill | Why it's likely to land soon | Link |
|---|---|---|---|
| #1298 | skill-creator eval fix | Tied to issue #556 (12 comments), most-active thread in repo | [link](https://github.com/anthropics/skills/pull/1298) |
| #1742 | mcp-builder SDK compat | Tied to issue #1668; blocks all mcp-builder users on mcp≥2 | [link](https://github.com/anthropics/skills/pull/1742) |
| #1724 | mcp-builder model bump | Pure docs/default update, low risk | [link](https://github.com/anthropics/skills/pull/1724) |
| #1607 | claude-api retired models | Documentation hygiene, closes issue #1603 | [link](https://github.com/anthropics/skills/pull/1607) |
| #1602 | eval serialization fixes | Aggregates 4+ known defects in one PR | [link](https://github.com/anthropics/skills/pull/1602) |
| #1367 | self-audit skill | Proposes a universal reasoning-quality gate with mechanical verification | [link](https://github.com/anthropics/skills/pull/1367) |
| #83 | skill-quality-analyzer / security-analyzer | Meta-skills for the marketplace itself | [link](https://github.com/anthropics/skills/pull/83) |
| #486 | ODT skill | Extends document-format coverage into ODF | [link](https://github.com/anthropics/skills/pull/486) |
| #1627 | buffer-api skill | Portable GraphQL scheduling across agents | [link](https://github.com/anthropics/skills/pull/1627) |

---

## 4. Skills Ecosystem Insight

**The community's most concentrated demand is for trustworthy evaluation and distribution infrastructure for Skills** — the same eval pipeline that powers `skill-creator` and `mcp-builder` is broken across platforms (#1298, #1099, #1050, #1602, #1390), the namespace is being abused for trust-boundary attacks (#492), and there is no first-class way to share or audit Skills across an organization (#228, #83).

In short: **the bottleneck is no longer authoring Skills — it is verifying, trusting, and distributing them.**

---

# Claude Code Community Digest — 2026-09-13

## 📌 Today's Highlights
- **v2.1.270 ships** as a quick patch reverting a regression introduced in 2.1.269, where read-only git commands were re-prompting for permission mid-session — a small but operationally annoying fix for Bash-heavy workflows.
- **Windows/Desktop issues dominate the queue.** Two top-engagement threads (#42776 with 180 comments, #85891 with 239 👍) expose persistent problems with file-lock relaunch failures and always-on-top window behavior on Windows 11.
- **The "mods" plugin ecosystem is being consolidated.** poteat has pushed a cluster of closed PRs (#93912, #93452, #93932) plus one open reorganization PR (#93951) that move mods/diff, sec-default, and telemetry tests next to the mods themselves and align their type paths and UI with the built-ins.

---

## 🚀 Releases

### [v2.1.270](https://github.com/anthropics/claude-code/releases/tag/v2.1.270)
Single-line patch release:
- Fixed read-only git commands in Bash unexpectedly asking for permission after a session had been running for a while (regression in 2.1.269).

No feature additions — this is strictly a revert. Worth upgrading immediately if you were on 2.1.269 and rely on long-running sessions.

---

## 🔥 Hot Issues

1. **[#42776 — Claude Code Desktop fails to Relaunch on Windows due to orphaned process file lock](https://github.com/anthropics/claude-code/issues/42776)** *(OPEN, 180 comments, 88 👍)*
   Marked invalid but remains the single most-discussed bug. Windows-native installer users repeatedly hit orphaned file locks preventing Desktop relaunch; the thread has become a community log of reinstall/reboot workarounds. *Why it matters:* signals real friction with the Windows distribution story.

2. **[#85891 — Claude Desktop (Win11) main window stays always-on-top with no setting](https://github.com/anthropics/claude-code/issues/85891)** *(OPEN, 100 comments, 239 👍)*
   Windows counterpart to the macOS #66516. The window refuses to yield focus to other apps, and there's no toggle. The 239-upvote ratio is the highest in the dataset — *developers want a kill switch*, not just a fix.

3. **[#69044 — Recurring errors documented over months of daily Claude Code use](https://github.com/anthropics/claude-code/issues/69044)** *(OPEN, 48 comments)*
   A power user has assembled a structured German-language feedback document covering repeated error patterns across model areas. Useful as a longitudinal signal of recurring reliability issues, even if it isn't a single repro.

4. **[#63023 — Background agents silently die on session pause/resume](https://github.com/anthropics/claude-code/issues/63023)** *(OPEN, 9 comments)*
   Agents invoked with `run_in_background: true` are killed when the host session sleeps or idles, but **no completion notification ever arrives** — silent work loss. *Why it matters:* breaks the "laptop-close → resume-later" workflow that background agents exist for.

5. **[#74708 — WorktreeRemove hook never fires when a worktree is removed at session exit](https://github.com/anthropics/claude-code/issues/74708)** *(CLOSED, 9 comments)*
   Docs claim the hook fires on session-exit cleanup, but it doesn't on macOS 26.5. Common gotcha for teams whose CI hygiene depends on `WorktreeRemove`.

6. **[#74023 — `.claude/settings.json` resolves against literal cwd, not git root](https://github.com/anthropics/claude-code/issues/74023)** *(CLOSED, 8 comments)*
   Launching from a subdirectory silently drops all project-scoped settings. High-impact because it's invisible — devs think their `.claude/` config is loading when it isn't.

7. **[#71437 — `/clear` in Claude Desktop resets current session in-place instead of creating a new session](https://github.com/anthropics/claude-code/issues/71437)** *(CLOSED, 7 comments)*
   Desktop `/clear` behaves differently from CLI `/clear`, breaking muscle memory and any workflows that rely on archive-before-clear.

8. **[#79776 — Versionless official plugins re-trigger "Plugins updated" banner on every refresh](https://github.com/anthropics/claude-code/issues/79776)** *(OPEN, 4 comments)*
   Affects `skill-creator`, `frontend-design` and any plugin without a semver. Cosmetic but trains users to ignore the banner — bad security UX.

9. **[#86979 — Published coding scores conflate task solving with known-fix retrieval](https://github.com/anthropics/claude-code/issues/86979)** *(CLOSED/invalid, 4 comments)*
   An eval/transparency critique asking Anthropic to disclose leakage rates between harness-known fixes and true task solving. Closed as invalid but the discussion thread is a useful reference for benchmark methodology debates.

10. **[#93675 — Task tools off by model, with no settings key and no way to keep a session checklist by default](https://github.com/anthropics/claude-code/issues/93675)** *(OPEN enhancement, 1 comment)*
    Since 2.1.233, `TaskCreate`/`TaskList`/`TodoWrite` are unavailable on Opus 4.8, Sonnet 5, Fable 5 and newer unless `CLAUDE_CODE_ENABLE_TODO_TOOLS=1` is set. Users want this controlled via settings, not an env var. *Why it matters:* a real footgun for people who depend on task tracking in long sessions.

*Honorable mentions:* [#89026 (hookify skips non-ASCII on Windows)](https://github.com/anthropics/claude-code/issues/89026), [#92004 (auto-continue-at-limit only fires in one of N concurrent sessions)](https://github.com/anthropics/claude-code/issues/92004), [#93688 (Linux Desktop `.desktop` entry breaks `claude://` handoff)](https://github.com/anthropics/claude-code/issues/93688), and [#84792 (MSIX auto-update leaves app unlaunchable, 0x80070002)](https://github.com/anthropics/claude-code/issues/84792) — all small-comment but reproducible.

---

## 🛠️ Key PR Progress

1. **[#41621 — Add missing CLI build infrastructure and bundler configuration](https://github.com/anthropics/claude-code/pull/41621)** *(CLOSED)*
   Adds the full source tree, esbuild bundler config, and build docs so the CLI can be compiled from TypeScript into a single executable. Now closed — useful as a reference if you want a reproducible local build of Claude Code.

2. **[#93951 — mods: the diff, sec-default and telemetry tests move next to the mods](https://github.com/anthropics/claude-code/pull/93951)** *(OPEN)*
   Reorganizes the test layout so each mod's tests live in `mods/<mod>/tests/`, runnable via `claude plugin test`. Open and shaping up to be the canonical test pattern for the mods ecosystem.

3. **[#93932 — mods: telemetry's types path is `./`-relative like the other manifest paths](https://github.com/anthropics/claude-code/pull/93932)** *(CLOSED)*
   One-line consistency fix: `"types": "./types/index.d.ts"`. Closed — plugs a schema-validation gap that was rejecting the bare relative path used elsewhere.

4. **[#93452 — mods/diff: match the built-in `/diff` panel](https://github.com/anthropics/claude-code/pull/93452)** *(CLOSED)*
   Aligns the `/diff` mod's pane with the built-in diff panel: same hunks rendering, ✕ close button, row spacing, empty-state placement, narrow-terminal resize handling, and one-repo-probe-in-flight semantics.

5. **[#93912 — mods: unit tests for diff, sec-default and telemetry, typed against plugin declarations](https://github.com/anthropics/claude-code/pull/93912)** *(CLOSED)*
   Each test gets the engine's own `$` and `on`, with `mock.clock` / `mock.store` / `mock.env` helpers registered as needed. Sets up the test harness #93951 builds on.

6. **[#61716 — [docs] Add troubleshooting for false usage limit caused by context overflow](https://github.com/anthropics/claude-code/pull/61716)** *(OPEN, since 2026-05-23)*
   Documents that "usage limit reached" can actually be `/compact` failing on a 1M-context model, and that switching to a 1M model is the workaround. Closes #50321. *Why it matters:* a long-standing source of confusion with a tiny fix that has lingered open for ~4 months.

---

## 📈 Feature Request Trends

Aggregated from issues tagged `enhancement`, `feature`, and feature-style requests embedded in bug reports:

1. **Desktop windowing controls** — always-on-top toggle (#85891), focus/Yield behavior, multiple-window session handling (#92004). *Direction: treat Desktop as a first-class windowed app, not a wrapped TUI.*
2. **Plugin/marketplace polish** — versionless plugin banner suppression (#79776), hookify example file prefix docs (#79143), and consistent hook behavior across lifecycle events (#74708). *Direction: tighten the plugin DX contract.*
3. **Session lifecycle management** — archive/cleanup for disconnected remote-control sessions (#87877), parallel-session auto-continue at limit reset (#92004), background agent survival across pause/resume (#63023). *Direction: session is becoming a long-lived resource; users want lifecycle primitives.*
4. **Settings UI / discoverability** — task tools toggle in settings.json (#93675), settings that follow git root not cwd (#74023). *Direction: kill the env-var escape hatches in favor of declarative settings.*
5. **Licensing / account tiers** — household/family plan that bundles Claude Code seats (#75063). *Direction: more multi-user packaging.*
6. **Eval transparency** — disclose leakage between known-fix retrieval and true task solving (#86979). *Direction: not a product feature, but a recurring community ask.*

---

## 😤 Developer Pain Points

Recurring friction points the data surfaces repeatedly:

- **Windows desktop packaging is brittle.** A cluster of related issues — #42776 (file locks), #84792 (MSIX 0x80070002), #87097 (CLI auto-update blocks main thread), #89026 (non-ASCII skipped) — point to a Windows distribution story that isn't yet matching macOS/Linux reliability.
- **Hooks behavior is inconsistent with docs.** `WorktreeRemove` not firing at exit (#74708), hookify example files missing the mandatory prefix (#79143), hookify silently dropping non-ASCII on Windows (#89026). Anyone building serious CI around hooks is going to hit these.
- **Settings resolution is footgun-prone.** `.claude/settings.json` resolves against literal cwd (#74023), and new opt-in env vars like `CLAUDE_CODE_ENABLE_TODO_TOOLS` are surfacing instead of settings entries (#93675).
- **Background/parallel agents lack lifecycle guarantees.** Background agents vanish silently on sleep (#63023); only one of N concurrent Desktop sessions gets auto-continue at limit reset (#92004).
- **"Usage limit reached" is a misleading error.** It can actually mean `/compact` failed against a 1M-context model; the mislabeling is well-known (#50321, fixed-by-docs PR #61716 still open after months).
- **Plugin marketplace UX re-trains users to ignore banners.** Versionless plugins re-trigger the "Plugins updated" banner on every refresh (#79776) — a classic alert-fatigue path.
- **Source-build friction for power users.** Until #41621 landed, building Claude Code from source required non-trivial unrolling; the fact that PR exists at all tells you how often the community asks for it.
- **Cross-platform window/desktop conventions.** Always-on-top without a toggle (#85891), `.desktop` entry that breaks its own `claude://` handoff on Ubuntu (#93688) — desktop-platform conventions are still being learned on a per-bug basis.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-13

## Today's Highlights

The community focus today is dominated by **Windows platform regressions**: bundled `codex.exe` fails to relocate from WindowsApps, the Codex desktop process never spawns a window, and `Alt+P` is globally intercepted (breaking Unreal Engine Play). On the protocol/runtime side, **multiple context-compaction bugs are surfacing** — automatic compactions rewrite rollouts in place and destroy transcripts or resurrect obsolete instructions. Meanwhile, the `copyberry[bot]` automation merged a batch of **Windows sandbox refactors** wiring the new MXC backend into command execution, alongside a noteworthy RFC proposing a `/learn` mechanism for self-evolving `AGENTS.md`.

## Releases

*No new releases in the last 24 hours.*

## Hot Issues

1. **[#40700](https://github.com/openai/codex/issues/40700) — Codex Desktop cannot start: bundled codex.exe relocation from WindowsApps fails (48 comments)**
   Highest-volume bug of the day. Windows 11 24H2 users cannot launch Codex Desktop at all on build 26.820.7780.0; the bundled binary can't be relocated out of the WindowsApps sandbox, and the app cannot even render the About dialog. High-impact blocker for Plus users.

2. **[#40575](https://github.com/openai/codex/issues/40575) — [RFC] Self-Evolving Agents: `/learn` and Rule Metabolism for AGENTS.md (29 comments)**
   Ambitious design proposal for long-running agents that distill user corrections into persistent `AGENTS.md` rules, with explicit rule-eviction/merging semantics. Worth watching for direction of Codex memory evolution.

3. **[#34331](https://github.com/openai/codex/issues/34331) — Windows: path-bound deletion of ignored cache directories blocked under danger-full-access (15 comments)**
   Even when cache directories are explicitly ignored, the sandbox rejects their deletion. Affects Pro 20x users with elevated workspace-write profiles; contradicts user expectation of "ignored = deletable".

4. **[#38128](https://github.com/openai/codex/issues/38128) — Remote Control blocks ChatGPT Android enrollment on unrooted GrapheneOS (15 comments, 👍10)**
   Official GrapheneOS clients are incorrectly flagged during pairing. Notable given GrapheneOS's security reputation — likely a vendor-detection false positive in the safety check.

5. **[#42299](https://github.com/openai/codex/issues/42299) — Windows: Alt+P globally intercepted, closes Codex and blocks Unreal Engine Play (11 comments, 👍5)**
   Global hotkey capture leaks outside the app window, disrupting IDE/editor shortcuts. Classic Electron accelerator bug that needs scope fix.

6. **[#28361](https://github.com/openai/codex/issues/28361) — Windows: `codex mcp-server` and child MCP servers are never reaped (9 comments)**
   Long-standing process leak: every MCP request spawns a new `codex app-server` plus child MCP servers that are never cleaned up — hundreds accumulate on a long-running host like Claude Code.

7. **[#42466](https://github.com/openai/codex/issues/42466) — Browser Use fails on every site: admin-enforced policy could not be verified (9 comments)**
   New browser tool broken end-to-end across Chrome with the ChatGPT extension enabled. Blocks any browser-mediated automation flows.

8. **[#21803](https://github.com/openai/codex/issues/21803) — Cross-device sync for Codex Projects and Chats (8 comments, 👍37)**
   The single most upvoted feature in this window. Users with multiple Macs want cloud-synced Projects and Chats under one OpenAI account — basic continuity that is missing.

9. **[#44386](https://github.com/openai/codex/issues/44386) — Codex Desktop replays ~150k cached input per tool call, drains Plus usage (3 comments)**
   Each tool invocation appears to re-send ~150K cached tokens, dramatically inflating bills on Plus tier. Potential pricing/billing exploit vector or token-estimation regression.

10. **[#44363](https://github.com/openai/codex/issues/44363) — Context compaction rewrites stored rollout in place, permanently destroys transcript (3 comments)**
    Compaction silently overwrites the rollout file rather than archiving it. Users cannot recover history after a compaction fires mid-thread — a data-loss bug rather than a UX issue.

## Key PR Progress

1. **[#45185](https://github.com/openai/codex/pull/45185) — Bind direct tool-call metadata to invocation outputs**
   Keeps direct tool-call records (including reused call IDs) attached to the invocation that produced the output. Completeness now describes the call inventory independently of tool success.

2. **[#45182](https://github.com/openai/codex/pull/45182) — Validate Windows sandbox token groups before copying SIDs**
   Adds a shared `token_groups` helper with a caller-supplied size limit; closes an OOB walk when SID pointers don't fit the returned buffer.

3. **[#45180](https://github.com/openai/codex/pull/45180) — Extract shared network configuration and environment policy helpers**
   Introduces `PreparedNetworkConfig` to decouple proxy preparation from managed-network application, preserving preparation state on permission fallback.

4. **[#45178](https://github.com/openai/codex/pull/45178) — Split Windows sandbox cleanup into preparation and completion phases**
   `prepare_packaged_windows_sandbox_cleanup` disables sandbox accounts and stops processes before returning a `PreparedWindowsSandboxCleanup` guard that retains the setup lock.

5. **[#45176](https://github.com/openai/codex/pull/45176) — Wire the Windows MXC sandbox into command execution**
   Adds explicit MXC backend selection, threads identity through exec-server process reporting and violation classification. Signals a new sandbox backend going live on Windows.

6. **[#45169](https://github.com/openai/codex/pull/45169) — Extract Windows sandbox setup and installation storage into the library**
   Moves setup helpers and storage operations into `codex-windows-sandbox`, with the binary delegating to `setup_helper_main`.

7. **[#45149](https://github.com/openai/codex/pull/45149) — Use OpenSSL 3.6.4 for musl builds**
   Static OpenSSL bumped to 3.6.4 (security release) while preserving the 3.x ABI for `x86_64` and `aarch64` musl targets.

8. **[#45124](https://github.com/openai/codex/pull/45124) — Feature flag for asynchronous user messages**
   Adds `send_message_to_user_async` (disabled-by-default), scoped to root agents only — foundation for future subagent communication patterns.

9. **[#45094](https://github.com/openai/codex/pull/45094) — Estimate history tokens from content instead of serialized envelopes**
   Strips message IDs, metadata, and JSON escaping from token estimates — should reduce the inflated cache-input replay seen in #44386.

10. **[#45089](https://github.com/openai/codex/pull/45089) — Delay automatic recaps and compact their TUI layout**
    Bumps the auto-recap interval from 3 to 30 minutes and switches to a tighter italic `↳ Recap:` layout, addressing complaints about recap noise in long sessions.

## Hot Discussions

**Ideas**
- **[#42703](https://github.com/openai/codex/discussions/42703) — Long-horizon context: can history retrieval make history recursively self-referential?**
  Raises a subtle failure mode for the new token-budget/`history`/`notes`/`new_context` model — if each fresh window retrieves notes that themselves describe prior retrievals, threads may drift away from the original task. Worth reading before adopting the new context lifecycle.

**General**
- **[#45211](https://github.com/openai/codex/discussions/45211) — Open statement: reopen Pro 20X access, address Korean-language quality issues, clarify reset policy**
  Public call from a user about the Pro 20X signup pause, reported Korean language mixing, and $80 paid reset behaviour. Mirrors several rate-limit issues below.

**Show and tell**
- **[#16329](https://github.com/openai/codex/discussions/16329) — Awesome Codex CLI: curated list of 150+ ecosystem tools** (7 comments)
  Active community index of subagents, skills, MCP servers, and plugins. Useful entry point for new users.
- **[#45205](https://github.com/openai/codex/discussions/45205) — Orchestrator: free Mac workspace for Codex + Kanban + code review**
  Open-source Mac app linking Codex tasks to repo, conversation, and resulting diff.
- **[#44291](https://github.com/openai/codex/discussions/44291) — Brain Scanner: understand what your coding agent did before the next task**
  Surfaces recorded agent work alongside a project map and follow-up tasks.
- **[#45128](https://github.com/openai/codex/discussions/45128) — VibeFuse: free Windows canvas running Codex CLI as live widgets**
  Multi-agent desktop harness for Codex CLI, Claude Code, Gemini CLI, Cursor, and Qwen.

## Feature Request Trends

1. **Cross-device sync** — Projects/Chats that follow the user across machines (#21803, 37 👍). The single highest-leverage gap.
2. **Self-evolving / persistent agent memory** — `/learn` and rule metabolism for `AGENTS.md` (#40575), richer `notes`/`history` retrieval (#42703). Both push toward long-horizon task support.
3. **Better Windows sandbox ergonomics** — identifiable `openai_base_url` errors (#40435), letting `danger-full-access` actually delete ignored directories (#34331), and a sane default for `command` length below `CreateProcess` limits (#38985).
4. **Transparent usage & billing** — surface both 5-hour and weekly limits simultaneously (#41553), expose reset dates consistently (#44663), audit the 5× usage burn on Astra after paid resets (#44894).
5. **Subagent and tool-call lifecycle** — async user messages (#45124), trusted-approval paths for sub-agent reviews (#45167), preserving compaction transcripts (#44363, #42695).
6. **Cross-platform quality polish** — Apple Passwords AutoFill in in-app browser (#38004), proper global hotkey scoping (#42299), browser/computer-use parity across Edge/Chrome/WSL (#44169, #34458, #42466).

## Developer Pain Points

- **Windows remains the roughest surface area**: app won't start (#40700), Electron spawns never produce a window (#41125), sandbox payloads exceed `CreateProcess` limits (#38985), MXC backend wiring is still in flight (#45176), and Remote Control pairing fails on common Android devices (#42576, #42026) or GrapheneOS (#38128).
- **Context compaction is brittle and data-destructive**: rollouts get rewritten in place (#44363), obsolete instructions resurface after compaction (#42695), and tool-call replay inflates cached-input tokens (#44386).
- **Process and resource leaks in long-running hosts**: `codex mcp-server` and child MCP servers accumulate to hundreds (#28361); WSL `thread/list` timeouts during rollouts break Remote Control (#36416).
- **Usage telemetry is unreliable**: usage drops to 0% and stalls (#44278), limits UI hides the 5-hour window on Plus (#41553), and reset-date strings disagree with reality (#44663).
- **Global input capture and key bindings**: `Alt+P` leaking system-wide breaks Unreal Engine and other tools (#42299); multiline paste submits too early (#45116).
- **Browser/Computer Use integration**: broken across Edge (#44169), WSL Chrome (#34458), and against sites under managed policies (#42466).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-13

## Today's Highlights

The nightly train rolls on with **v0.61.0-nightly.20260913**, but the real signal is in the issue tracker: **subagent reliability is the dominant theme** — multiple P1 bugs report hangs, misleading `GOAL` success reports, and the generalist agent freezing indefinitely (#22323, #21409, #25166). On the Auto Memory front, a cluster of P2 issues (#26525, #26522, #26523, #26516) is reframing how the memory subsystem should handle redaction, retries, and patch validation.

## Releases

- **v0.61.0-nightly.20260913.g9c1b0a610** — Automated version bump ([PR #29300](https://github.com/google-gemini/gemini-cli/pull/29300)). Changelog is the standard nightly diff against `v0.61.0-nightly.20260912`.

## Hot Issues

1. **#22323 [P1, 13 💬]** — `codebase_investigator` subagent reports `status: "success"` / `Termination Reason: "GOAL"` after hitting `MAX_TURNS` without doing any work. A misleading recovery signal that hides real interruptions and breaks eval correctness. ([link](https://github.com/google-gemini/gemini-cli/issues/22323))
2. **#21409 [P1, 8 💬 👍=8]** — Generalist agent **hangs forever** on simple tasks like folder creation. Only workaround is to forbid subagent delegation. Highest thumbs-up in the batch — clear UX blocker. ([link](https://github.com/google-gemini/gemini-cli/issues/21409))
3. **#25166 [P1, 4 💬 👍=3]** — Shell commands complete but the CLI remains in "Awaiting user input" state. Reproducible on trivial commands. A core execution-loop defect. ([link](https://github.com/google-gemini/gemini-cli/issues/25166))
4. **#19873 [P2, 9 💬]** — *Zero-Dependency OS Sandboxing & Post-Execution Intent Routing* — an ambitious EPIC to let Gemini 3's bash affinity shine without sacrificing safety by leaning on OS-level sandboxes (Seatbelt, bubblewrap) rather than ad-hoc exclusions. ([link](https://github.com/google-gemini/gemini-cli/issues/19873))
5. **#22745 [P2, 7 💬]** — EPIC assessing **AST-aware file reads/search/mapping** (tilth/glyph) for fewer turns, tighter context, and better subagent navigation. A foundational capability request. ([link](https://github.com/google-gemini/gemini-cli/issues/22745))
6. **#21968 [P2, 6 💬]** — The model underutilizes custom skills and sub-agents unless explicitly told to — a discoverability/orchestration gap. ([link](https://github.com/google-gemini/gemini-cli/issues/21968))
7. **#26525 [P2, 5 💬]** — Auto Memory currently relies on the extractor model to redact secrets *after* content is in context. Request is to add **deterministic redaction** and reduce Auto Memory's logging surface. ([link](https://github.com/google-gemini/gemini-cli/issues/26525))
8. **#26522 [P2, 4 💬]** — Auto Memory can re-surface the same low-signal session indefinitely because unprocessed sessions are never marked done. ([link](https://github.com/google-gemini/gemini-cli/issues/26522))
9. **#2930 [P3, CLOSED, 9 💬]** — Long-standing request to **warn users on Node < 20** (Node 18 is EOL). Closed today — confirm in changelog whether the warning shipped. ([link](https://github.com/google-gemini/gemini-cli/issues/2930))
10. **#21983 [P1, 4 💬]** — `browser` subagent fails on Wayland; another misleading `GOAL` termination in the same family as #22323. ([link](https://github.com/google-gemini/gemini-cli/issues/21983))

## Key PR Progress

1. **#29303 [size/L]** — *Fix surrogate pairs at `ExpandableText` truncation boundaries.* Emoji labels were being silently dropped when the truncation slice hit a high surrogate. Closes #29296. ([link](https://github.com/google-gemini/gemini-cli/pull/29303))
2. **#29163 [P1, security]** — *Prevent crash during authentication inside Git repos under macOS Seatbelt / restricted perms.* `useGitBranchName` hook was failing uncaught when `.git` wasn't readable. ([link](https://github.com/google-gemini/gemini-cli/pull/29163))
3. **#29222 [P1/P2]** — *Stop silently rewriting `--model gemini-2.5-flash` to `gemini-3.5-flash` on backends that don't have 3.5 Flash access* (e.g., some Vertex environments). Pinned models should be honored. ([link](https://github.com/google-gemini/gemini-cli/pull/29222))
4. **#29294 [P2]** — *Tame terminal flicker when typing during a background command.* Diagnoses stdout contention + Ink reconciler cursor focus as the dual root cause. ([link](https://github.com/google-gemini/gemini-cli/pull/29294))
5. **#29208 [P2]** — *Resilient `agents.json` loader.* Corrupt-but-valid-JSON files (`null`, scalars, arrays) used to throw `TypeError` or silently drop state; now falls back to empty. ([link](https://github.com/google-gemini/gemini-cli/pull/29208))
6. **#29292 [P2]** — *Validate `history` is an array in `loadCheckpoint`.* Partial writes or hand-edited checkpoints (`{"history": null}`) used to pass type checks and break `/resume`. ([link](https://github.com/google-gemini/gemini-cli/pull/29292))
7. **#29214 [size/L/XL, CLOSED]** — *Harden sandbox filesystem boundaries and isolate runtime state* from host config dirs; realpath-based path-sensitivity checks. ([link](https://github.com/google-gemini/gemini-cli/pull/29214))
8. **#29125 [P2, CLOSED]** — *Hooks migration: convert timeout from seconds to ms.* Claude Code's `"timeout": 30` was being interpreted as 30 ms instead of 30 s, killing hooks instantly. ([link](https://github.com/google-gemini/gemini-cli/pull/29125))
9. **#29124 [P2, CLOSED]** — *Hooks migration: fix `SubagentStop` (lowercase `a`) event key.* Mapped as `SubAgentStop`, so Claude-style sub-agent-stop hooks were silently dropped. ([link](https://github.com/google-gemini/gemini-cli/pull/29124))
10. **#29230 [size/s]** — *Docs: fix dead anchors across seven guide pages* (e.g., stale numbered prefixes in `plan-mode.md`). Quality-of-life, but real friction for new users. ([link](https://github.com/google-gemini/gemini-cli/pull/29230))

## Feature Request Trends

- **AST-aware tooling** as a first-class capability (#22745, #22746) — better file bounds, codebase mapping, subagent navigation.
- **OS-level sandboxing** that lets the model chain `grep`/`sed`/`awk` natively without re-litigating safety (#19873).
- **Auto Memory hardening** — deterministic redaction, bounded retries, and surfacing (not silently dropping) invalid patches (#26525, #26522, #26523, #26516).
- **Subagent observability & control** — `/chat share` for subagent trajectories (#22598), `/bug` reports that include subagent context (#21763), agent self-awareness of its own CLI flags (#21432), and trajectory review for evals.
- **Browser agent resilience** — session takeover, lock recovery, and honoring `settings.json` overrides like `maxTurns` (#22232, #22267).

## Developer Pain Points

- **Hangs in agent execution** are the #1 frustration right now: generalist agent freezing (#21409) and the post-completion "Awaiting user input" stall (#25166) both block simple workflows.
- **Misleading subagent telemetry** — `GOAL` success after `MAX_TURNS` (#22323) and Wayland browser failures with the same termination reason (#21983) make it impossible to trust run output.
- **Auto Memory trust gap** — secrets reach the extractor before redaction (#26525), low-signal sessions loop forever (#26522), and invalid patches vanish silently (#26523).
- **Skills & subagents underused** unless the user explicitly names them (#21968) — discoverability is poor.
- **Cleanup tax** — restricted-shell prompting pushes the model to scatter tmp scripts in random dirs (#23571), and the agent occasionally reaches for `git reset --force` when safer alternatives exist (#22672).
- **Tool-set ceiling** — 400+ tools return a 400 error; the agent doesn't proactively scope tools (#24246).
- **Symlink-based agent configs aren't recognized** under `~/.gemini/agents/` (#20079).
- **Terminal ergonomics** — flicker under load (#29294) and broken doc anchors (#29230) compound during long sessions.
- **Migration surprises** — hooks carried over from Claude Code with second-vs-millisecond and `SubagentStop` casing bugs (#29125, #29124) silently disabled user hooks.

---
*No Discussions data was provided for this digest window, so the "Hot Discussions" section is omitted.*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest
**Date:** 2026-09-13
**Repository:** [github/copilot-cli](https://github.com/github/copilot-cli)

---

## 🔥 Today's Highlights

No new releases shipped in the last 24 hours, but community activity is strong around **agent observability, prompt caching efficiency, and platform stability**. The most pressing concerns are a recurring JavaScript heap out-of-memory crash on Linux (#4725) and a prompt-caching regression in long-running subagent tool-call sequences (#4829). On the maintenance side, all recent merged PRs focus on **dependency hygiene and supply-chain security** via Dependabot and SHA-pinned GitHub Actions.

---

## 📦 Releases

*No releases published in the last 24 hours.*

---

## 🐛 Hot Issues

1. **[#4725 – Frequent JavaScript heap out of memory (platform-linux)](https://github.com/github/copilot-cli/issues/4725)** *(OPEN)*
   Critical stability bug: the CLI crashes every few minutes on Linux with a V8 Mark-Compact OOM (~3.9 GB heap). With 4 comments and growing, this is a top-priority platform reliability issue.

2. **[#4829 – Subagents with long tool-call sequences fail prompt caching](https://github.com/github/copilot-cli/issues/4829)** *(OPEN)*
   Reports that autonomous subagents executing hundreds of tool calls in a single turn break prompt caching, compounding token costs. Highly relevant for cost-conscious users on Gemini/Claude models.

3. **[#2254 – Add live progress streaming for background sub-agents](https://github.com/github/copilot-cli/issues/2254)** *(OPEN)*
   Feature request for richer agent observability — `/tasks` currently only surfaces tool-call counts, leaving users blind to multi-phase orchestrator agents (plan → implement → deliver → review).

4. **[#4831 – claude-opus-5 stops viewing images after first paste](https://github.com/github/copilot-cli/issues/4831)** *(OPEN)*
   Regression on the Opus 5 model: after a single image is pasted, subsequent `view` calls hit a "maximum images viewed (1)" limit. Directly impacts multimodal workflows.

5. **[#4830 – Add /remove-dir command to revoke directory access](https://github.com/github/copilot-cli/issues/4830)** *(OPEN)*
   Small but valuable UX gap: `/add-dir` and `/list-dirs` exist, but there is no symmetric way to revoke directory access mid-session.

6. **[#4824 – ctrl-t enqueue prompt doesn't execute after agent finishes](https://github.com/github/copilot-cli/issues/4824)** *(OPEN)*
   Keybinding bug: enqueued prompts via Ctrl-T stay stuck on "Working" instead of executing after the prior turn completes — a friction point for power users.

7. **[#2147 – CAIP 400: input item ID does not belong to this connection](https://github.com/github/copilot-cli/issues/2147)** *(CLOSED)*
   Recently closed error against `gpt-5.4 (xhigh)`, suggesting upstream connector resilience improvements shipped.

---

## 🔧 Key PR Progress

1. **[#4808 – Pin GitHub Actions to commit SHAs](https://github.com/github/copilot-cli/pull/4808)** *(CLOSED)*
   Security hardening: pins 3 action references to immutable commit SHAs across 4 files — closes a supply-chain attack vector.

2. **[#4827 – build(deps): bump actions/stale 9.1.0 → 11.0.0](https://github.com/github/copilot-cli/pull/4827)** *(CLOSED)*
   Dependabot upgrade of the `actions/stale` workflow to v11.0.0.

3. **[#4828 – build(deps): bump actions/github-script 7.1.0 → 9.0.0](https://github.com/github/copilot-cli/pull/4828)** *(CLOSED)*
   Dependabot upgrade of `actions/github-script` to v9.0.0.

*Only 3 PRs were updated in the last 24h — all routine maintenance; no user-facing feature PRs landed.*

---

## 💡 Feature Request Trends

Synthesizing the open issues, the community is converging on three themes:

- **Agent Observability & Control** — Live streaming progress for background sub-agents (#2254), plus better diagnostics for long-running autonomous workflows.
- **Session Hygiene Commands** — Symmetric `/remove-dir` (#4830) to complement existing `/add-dir` and `/list-dirs`, enabling mid-session permission reduction.
- **Multimodal Reliability** — Fixing image-viewing limits on newer models like claude-opus-5 (#4831) so screenshots and file references work in a single session.

---

## 😤 Developer Pain Points

- **Stability on Linux**: The recurring V8 heap OOM (#4725) is making long sessions unusable for some users, with no workaround documented.
- **Token/Cost Inefficiency**: Subagent harnesses that break prompt caching (#4829) translate directly into higher bills for power users — a model-agnostic concern.
- **Keybinding Deadlocks**: Ctrl-T prompt queueing (#4824) leaves the UI in a permanent "Working" state, forcing session restarts.
- **Limited Image Handling**: The single-image cap on claude-opus-5 (#4831) blocks even simple "paste a screenshot, then read a file" flows.
- **No Mid-Session Permission Revocation**: Missing `/remove-dir` (#4830) means users must reset state to tighten access — a friction point for security-conscious workflows.
- **Weak Subagent Visibility**: `/tasks` only showing tool-call counts (#2254) makes it hard to debug or trust orchestrator-style agents.

---

*Have an issue or PR you'd like highlighted next time? Tag it `[triage]` or `[area:agents]` to help the maintainers route it faster.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-13

## 1. Today's Highlights

The community is dominated by a **wave of `encrypted_content` errors on OpenCode Zen's Muse Spark models**, generating multiple duplicate issue reports (#48741, #48773, #48795, #48800) within hours. Concurrently, maintainers pushed several high-quality TUI and provider fixes — including a terminal-reset hotfix for Windows ConPTY stacks (#48782) and reasoning-replay stripping for non-interleaved models (#48775) — alongside substantive new features like **native Arabic/RTL bidi support** (#48587/#48590/#48753) and an inline home footer slot for plugins (#48798).

## 2. Releases

No new releases in the last 24 hours.

## 3. Hot Issues

1. **#48741 — [2.0] Opencode Zen critical errors on Muse Spark family** (9 comments) — Brand-new, broad-impact Zen provider regression where any image/tool call on Muse Spark models fails with `reasoning 'encrypted_content' was not issued to this caller`. Likely to be a major user-facing outage.
2. **#36942 — [FEATURE] Vertical tabs** (17 comments, 31 👍) — Most upvoted issue in the cycle. Users report the new horizontal-only tab layout makes >5 sessions unreadable.
3. **#37815 — Kimi K3 upstream failure** (11 comments) — Kimi K3 model is selectable but every request fails upstream; isolated to that one model on Console Go.
4. **#23655 — Responses API support for Go service** (7 comments, 29 👍) — Long-standing, high-demand feature for parity with V1 on Anthropic-style Responses API.
5. **#45750 — Anthropic prompt caching not applied via proxy** (6 comments) — Prompt-cache hit rate stuck at 0% when routing Claude through third-party proxies; tied to PR #1305.
6. **#48776 — TUI leaves terminal in raw/corrupted state on /exit (Alacritty + Zellij on Windows)** (2 comments) — Immediate attention: hotfix PR #48782 was merged the same day.
7. **#48787 — LSP server cold-start returns no diagnostics** (2 comments) — Subtle silent false-negative: first write to a fresh LSP server reports clean even for files with errors.
8. **#48762 — Non-git projects on Windows hide sessions from TUI** (3 comments) — `session.path` written as absolute path breaks the session picker.
9. **#38644 — Silent failure: opencode provider 500 errors dropped without UI message** (4 comments, closed) — Agent silently stops responding with only a spinner; closed (likely fixed).
10. **#45938 — macOS exit/cleanup broadcasts SIGTERM to ALL user processes** (2 comments) — Quitting opencode took down Ghostty, Terminal.app, Chrome — `kill(-1, SIGTERM)` behavior in the cleanup path.

## 4. Key PR Progress

1. **#48782 — fix(tui): force terminal reset on any exit path** (closed) — Directly fixes #48776; guarantees alternate-screen/mouse/kitty-keyboard teardown under ConPTY.
2. **#48775 — fix(provider): strip reasoning replay for models without interleaved support** (closed) — Fixes the infinite retry loop on cerebras/qwen-3.8-27b by removing serialized `reasoning_content` from history.
3. **#48796 — fix(desktop): [v2] run WSL commands with --exec** (open) — Fixes the V2 Desktop WSL-server-add flow that never worked (`UnknownError`).
4. **#48798 — feat(tui): add inline home footer slot** (open) — Adds a typed `home.footer.status` slot so TUI plugins can render compact status in the same row as the built-in footer (closes #48797).
5. **#48777 — fix(session): freeze system prompt per session to preserve prefix cache** (open) — Caches the system prompt per session ID to keep Anthropic's prompt cache warm across turns.
6. **#48779 — fix(client): default SSE Accept headers** (open) — Defaults Promise SSE requests to `Accept: text/event-stream` so proxies stop returning HTML error pages (closes #48771).
7. **#48788 — fix(opencode): show actionable error details when `opencode serve` fails** (open) — Replaces opaque `Unexpected error` with port-in-use / permission-denied messages.
8. **#48791 — fix(app): query worktree inventory without booting locations** (open) — New `GET /api/worktree/inventory` endpoint enables the Worktrees screen to load without spinning up plugins/MCPs.
9. **#48587 / #48590 / #48753 — feat(tui): native Arabic and RTL (bidi) support** (open, dev + beta lines) — Long-awaited bidirectional text rendering across prompts and messages; closes four related issues.
10. **#48793 — feat(v2): allow disabling Anthropic thinking block binding** (open) — Lets users opt out of automatic thinking-block binding for non-Anthropic endpoints that reject it.

## 5. Hot Discussions

*No discussion data was provided in the source feed; this section is omitted.*

## 6. Feature Request Trends

- **UI/UX flexibility** dominates the top of the list: vertical tabs (#36942), ability to switch back from the new layout (#39835), and a restored file-tree button on new-session pages (#42031).
- **Provider parity and customization**: Responses API for Go (#23655), disable-tool-call config (#35432), opt-out for Anthropic thinking-block binding (#48793), opt-out for "train on request data" toggle (#47562).
- **TUI polish**: word-level diff highlighting (#44348), i18n infrastructure (#48731), native RTL/bidi (#48587), and an inline home footer plugin slot (#48797).
- **Performance/caching**: immutable system prompts to preserve Anthropic's prefix cache (#33246, #48777) — a recurring theme.
- **Diagnostics and schemas**: better config.json schema for standard JSON LSPs (#41014), non-silent LSP errors (#48787).

## 7. Developer Pain Points

- **Provider reliability is the #1 frustration today**: a flood of `encrypted_content` / `upstream request failed` errors on Zen's Muse Spark models suggests a regression in how reasoning is forwarded to Anthropic-compatible endpoints. Several users report being unable to use their paid Zen subscriptions (#48792).
- **The V2 layout migration is still rough**: new users have no way back (#39835), the new-session screen is missing the file tree (#42031), IME composition breaks on the first keystroke (#39632), and tool-call-disable config is ignored (#35432).
- **Desktop safety and predictability**: at least one report of the Desktop agent deleting an entire project directory when only a directory change was requested (#38191), and macOS exit logic broadcasting SIGTERM to all user processes (#45938).
- **Silent failures**: 500 errors from the opencode provider disappear without UI feedback (#38644), and the first write to a freshly started LSP server reports a false-clean result (#48787).
- **AI regression of manual edits**: developers report that after manually tweaking AI-generated code, subsequent prompts silently revert their changes (#48676) — a real workflow hazard when iterating with agents.
- **Cross-platform terminal hygiene**: exit paths leave terminals in raw/corrupted states on both Windows ConPTY (#48776) and macOS (#45938), affecting Alacritty, Zellij, Ghostty, and Terminal.app users.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-13

## Today's Highlights
The Pi ecosystem saw heavy activity across provider integrations and session-management ergonomics, with two notable OAuth providers landing (Google Antigravity, Cursor Pro) and meaningful progress on Codex-compatible turn attribution. A long-standing performance thread (#7739) continues to push for jcode-comparable startup latency, while several UI/streaming bugs were triaged and closed. Overall signal: the project is doubling down on multi-provider parity, session fidelity, and TUI polish.

## Releases
No new releases in the last 24h.

## Hot Issues

1. **[#7739](https://github.com/earendil-works/pi/issues/7739)** — Set a startup-time budget targeting jcode-comparable latency and memory. Establishes a formal performance target using jcode's README benchmark and frames concrete gap measurements. Important because it converts performance work from ad-hoc into a measurable SLO. (Open, 6 comments)

2. **[#9098](https://github.com/earendil-works/pi/issues/9098)** — Expose prompt disposition (`handled`/`queued`/`started`) in RPC responses. Affects every external integration and extension consumer; surfaces Pi's existing preflight decision rather than guessing from a generic success. (Open, 4 comments)

3. **[#9311](https://github.com/earendil-works/pi/issues/9311)** — Fullscreen mouse selection survives session switch, causing ghost selections in newly created sessions. Easy-to-reproduce UX bug with a clear one-line fix. (Open, 6 comments)

4. **[#9474](https://github.com/earendil-works/pi/issues/9474)** — Codex `openai-codex-responses` transport has no non-resetting per-request deadline; keep-alive frames defeat idle timeouts. Real reliability/UX concern for stalled streams. (Open, 3 comments)

5. **[#9243](https://github.com/earendil-works/pi/issues/9243)** — Session resume restores model from the last assistant message's echoed name rather than from `model_change`. Provider-name echoing corrupts session fidelity. (Open, 1 👍, 3 comments)

6. **[#9481](https://github.com/earendil-works/pi/issues/9481)** — Align Pi with Codex's canonical turn-attribution metadata so `turn_id` covers every request in a run (tools, retries, compaction). Foundational for cross-tool reasoning fidelity. (Open, 1 comment)

7. **[#9545](https://github.com/earendil-works/pi/issues/9545)** — Reuse whole-file normalization across batch-edit uniqueness checks; redundant `normalizeForFuzzyMatch()` calls are an easy performance win. (Open, 1 comment)

8. **[#9542](https://github.com/earendil-works/pi/issues/9542)** — Streaming UIs render the first thinking token twice because `message_start` snapshots share live mutable content. Concrete bug affecting every thinking-enabled client. (Closed/untriaged, 2 comments)

9. **[#9538](https://github.com/earendil-works/pi/issues/9538)** — `ScrollView` never forwards mouse events to its content; the inherited `Container.handleMouse` is bypassed by `dispatchMouseToLayout`. Important for interactive TUI extensions. (Closed/untriaged, 2 comments)

10. **[#9462](https://github.com/earendil-works/pi/issues/9462)** — `ctx.ui.notify` is racy and the extension API provides no co-existing alternative for multiple notifications. Extension-author pain point. (Closed/untriaged, 1 comment)

## Key PR Progress

1. **[#9529](https://github.com/earendil-works/pi/pull/9529)** — Adds **Google Antigravity** and **Cursor Pro** OAuth providers (no API keys, browser OAuth, local callback server on 51123). Expands zero-config login options.

2. **[#9488](https://github.com/earendil-works/pi/pull/9488)** — Adds canonical **Codex turn attribution** via a provider-neutral `requestIdentity` in stream options. Resolves attribution across tool continuations, retries, steering, and compaction recovery.

3. **[#9096](https://github.com/earendil-works/pi/pull/9096)** — Adds **Meta provider** with **Muse** subscription OAuth. Notable quirks: daily identity-token re-mint and "fake" burst streaming.

4. **[#9543](https://github.com/earendil-works/pi/pull/9543)** — Adds an **`exit` tool** so models can end chat when users say "bye" or `/exit`, removing the need for users to learn `/quit`.

5. **[#9531](https://github.com/earendil-works/pi/pull/9531)** — Implements permanent **branch deletion** in session tree via `SessionManager.pruneBranch()` and `shift+d` shortcut, with active-path protection and label re-chaining.

6. **[#9541](https://github.com/earendil-works/pi/pull/9541)** — TUI: render human-readable model and provider **names** as primary labels in pickers (governed catalogs already supply them). Small but high-quality-of-life.

7. **[#9539](https://github.com/earendil-works/pi/pull/9539)** — Adds `examples/extensions/loop-guard.ts`: detects repeated identical tool-call patterns and breaks runaway LLM verification loops.

8. **[#9533](https://github.com/earendil-works/pi/issues/9533)** *(related)* — `/fork` should support forking **from the current point**, not only from earlier messages. Frequently requested UX gap (paired with the new branch-deletion PR).

## Hot Discussions

**Show and Tell / Q&A**
- **[#3373](https://github.com/earendil-works/pi/discussions/3373)** — *Which plugins, add-ons, or extensions do you most enjoy using with the Pi agent?* (16 comments, 9 👍) An ongoing community roundup of favorite extensions; pairs naturally with the new `loop-guard` example.

## Feature Request Trends

- **Provider OAuth expansion**: Google Antigravity, Cursor Pro, Meta/Muse — clear momentum toward "no API key" subscription logins.
- **Session-tree ergonomics**: fork from current point, branch deletion, better parent-path/cwd nesting in the selector — the session manager is a focal area.
- **Codex parity**: canonical turn attribution, transport deadlines, request identity — Pi is converging on Codex's protocol metadata.
- **Model controls**: keep model/effort on `/new`, expose prompt disposition in RPC, restore model from `model_change` not echoed name — configuration fidelity is a recurring ask.
- **Built-in safety**: loop-guard extension and an `exit` tool are early signs of demand for "agent guardrails as first-class".

## Developer Pain Points

- **Startup performance gap** vs. jcode — repeatedly called out as the single largest UX regression (#7739).
- **Streaming/TUI bugs**: duplicate first thinking tokens (#9542), stale fullscreen selection (#9311), `ScrollView` mouse-event forwarding (#9538).
- **Provider quirks pile-up**: Vertex rejecting `THINKING_LEVEL_MINIMAL` on Gemini 3 Flash (#9535), OpenRouter dropping signature-only reasoning for Claude (#9534), llama.cpp ignoring reasoning level (#9528), GitHub Copilot OAuth 403 on Windows (#9546).
- **Session/state fidelity**: model restoration from echoed names (#9243), cross-CWD session nesting (#9547), global auth path leaking into SDK embed (#9537).
- **Extension API gaps**: racy `ctx.ui.notify` with no alternative channel (#9462), eager loading of `jiti` and full TUI graph at import time hurting embedders (#9540).
- **Latent redundancy**: per-edit full-file normalization during batch edits (#9545) — easy wins the community is asking the maintainers to take.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-13

## Today's Highlights

Today's traffic is dominated by a **cluster of P1 React #185 TUI crashes** under the 0.23.3 release, with three independent reports (#11500, #11732, #11756) all hitting "Maximum update depth exceeded" during background-agent workflows — the maintainers will need a coordinated fix before the next stable cut. On the architecture side, **#11695** opens the long-anticipated discussion on decoupling the agent harness from the execution environment, and **#11711** lands the first concrete piece of that direction (container execution for subagents).

## Releases

- **v0.23.3-nightly.20260912.54aa66834b** — Nightly cut. Notable changes:
  - `refactor(dingtalk): remove obsolete background response aggregation` ([#11570](https://github.com/QwenLM/qwen-code/pull/11570))
  - `feat(channels)!` — channel rotation work in progress ([release notes](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3-nightly.20260912.54aa66834b))
- **cua-driver-rs v0.20.6** — Qwen CUA Driver prebuilt binaries (vendored under `packages/cua-driver`). macOS is codesigned + notarized universal binary (`QwenCuaDriver.app`); Linux ships unsigned x86_64 + arm64 (glibc 2.31 floor); Windows ships an unsigned UIAccess worker + native SDK payload for x86_64 + arm64.

## Hot Issues

1. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500)** — *P1, OPEN* — TUI exits silently with uncaught React #185 when multiple background agents complete; Ink `useBoxMetrics` layout-listener `setState` loop. **12 comments, 👍 1.** Reproducible regression on resume; this is the canary issue for the 0.23.3 React-loop cluster.
2. **[#11732](https://github.com/QwenLM/qwen-code/issues/11732)** — *P1, OPEN* — Qwen Code 0.23.3 crashes with React #185 while the native monitor task keeps running. Two independent sessions, same failure pattern. **6 comments.**
3. **[#11756](https://github.com/QwenLM/qwen-code/issues/11756)** — *P1, OPEN* — Virtualized History enabled, current main and stable 0.23.3 both enter the recursive update loop during background-agent workflows. **4 comments.**
4. **[#11747](https://github.com/QwenLM/qwen-code/issues/11747)** — *P2, OPEN* — Interactive TUI silently / natively crashes on RHEL 10 when the host Node runtime lacks full ICU data; `Intl.Segmenter` is broken and Qwen does not detect or diagnose. **3 comments.** Real-world enterprise blocker.
5. **[#11695](https://github.com/QwenLM/qwen-code/issues/11695)** — *P2, OPEN, tracking* — Umbrella direction: separate the agent harness from the execution environment so the tool runtime becomes addressable. **5 comments, `roadmap/multi-agent`.** The strategic thread for the next several months of work.
6. **[#11704](https://github.com/QwenLM/qwen-code/issues/11704)** — *P3, OPEN, proposal* — Official Android companion client built as a thin client over `qwen serve` via ACP. Author is willing to implement the initial MVP. **5 comments.**
7. **[#11590](https://github.com/QwenLM/qwen-code/issues/11590)** — *P1, CLOSED* — Qwen Code inserts a top-level `metadata` object on requests to DashScope's OpenAI-compatible endpoint, which forwards it to non-Qwen vendors (e.g. `ZHIPU/GLM-5.3-Flash`) where `metadata` is a `string` — every such model returns 400. **4 comments.**
8. **[#11657](https://github.com/QwenLM/qwen-code/issues/11657)** — *P1, CLOSED* — Fireworks Qwen3 tool-call continuation fails 400 because of mirrored `messages[].reasoning`. Fixed by [#11662](https://github.com/QwenLM/qwen-code/pull/11662). **3 comments.**
9. **[#11718](https://github.com/QwenLM/qwen-code/issues/11718)** — *P2, CLOSED* — Desktop AppImage sets `PYTHONHOME`/`PYTHONPATH` globally, breaking every stdio MCP server that spawns its own Python interpreter. **4 comments, `scope/linux`.**
10. **[#11198](https://github.com/QwenLM/qwen-code/issues/11198)** — *P1, OPEN, security* — Default-on usage-statistics telemetry uploads raw tool-error text (including shell command lines) to RUM with no redaction. **3 comments.** Wider scope than the original #10916 finding.

## Key PR Progress

1. **[#11711](https://github.com/QwenLM/qwen-code/pull/11711)** — `feat(core): add container execution for subagents` — Operators can require `QWEN_AGENT_EXECUTION_BACKEND=docker|podman`; agent definitions and project declarations can mark `executionBackend: container`. First concrete block of the #11695 direction.
2. **[#11548](https://github.com/QwenLM/qwen-code/pull/11548)** — `feat(web-shell): connect to a selected remote daemon` — Standalone Web Shell now connects to one explicit remote daemon (address + optional bearer token) through the connection gate or Daemon Status.
3. **[#11700](https://github.com/QwenLM/qwen-code/pull/11700)** — `feat(web-shell): Improve context overview and add manual compression` — Composer tooltip shows exact remaining capacity; cards show used/total tokens and category breakdowns; historical cards are labeled as snapshots.
4. **[#11086](https://github.com/QwenLM/qwen-code/pull/11086)** — `feat(serve): scope extensions to workspace runtimes` — Global extension catalog is reconciled into the runtime selected per workspace; workspace-qualified daemon + SDK access; composer `@` menu updated.
5. **[#8927](https://github.com/QwenLM/qwen-code/pull/8927)** — `feat(channels): bound session lifetime with sessionRotation` — Per-channel `sessionRotation` (`maxTurns` or `maxAge`) starts a fresh session on the route once the bound is reached.
6. **[#11280](https://github.com/QwenLM/qwen-code/pull/11280)** — `fix(skills): re-apply a Skill's side effects when a session is resumed` — `--continue` / `--resume` now restores each Skill's `allowedTools` session allow rules and `hooks:`.
7. **[#11562](https://github.com/QwenLM/qwen-code/pull/11562)** — `fix(cli): keep one-shot system reminders out of the user's own message` — Reminders no longer leak into the transcript, ↑-recall history, or post-cancel composer refills. (Deferred review findings tracked in [#11587](https://github.com/QwenLM/qwen-code/issues/11587).)
8. **[#11540](https://github.com/QwenLM/qwen-code/pull/11540)** — `fix(review): fence base-tree reuse on state kept outside the mount` — Run identity and merge base move out of `.qwen/tmp` and onto host-side `.qwen/review-leases`, which the review sandbox does not bind-mount read-write.
9. **[#11538](https://github.com/QwenLM/qwen-code/pull/11538)** — `feat: select the OpenAI API per model` — Model-level `api: "chat-completions" | "responses"` for OpenAI-compatible providers; custom provider setup is unified to one OpenAI-compatible choice.
10. **[#11769](https://github.com/QwenLM/qwen-code/pull/11769)** — `fix(core): purge a deleted session's prompts from the log history` — `/delete` now also removes that session's prompts from `~/.qwen/tmp/<project-hash>/logs.json` via a new `Logger.removeSessionMessages(sessionId)`.

## Feature Request Trends

- **Harness / executor separation** — #11695 (umbrella), #11711 (container execution for subagents). The clearest architectural direction in the project right now.
- **Mobile / cross-device reach** — #11704 (Android companion client over ACP), #11548 (Web Shell → remote daemon), #11086 (workspace-scoped extensions for the serve runtime). The product is moving toward "thin client, fat daemon."
- **Context-window UX** — #11700 (Web Shell context overview + manual compression). Token-budget visibility is now a recurring ask.
- **Provider flexibility** — #11538 (per-model OpenAI API flavor), #11662 (Fireworks reasoning mirroring), #11590 (DashScope `metadata` field).
- **Session / log hygiene** — #11769 (purge deleted prompts), #11762 (`/delete` should clean `logs.json`), #11280 (Skill side effects on resume), #10953 (stale Todo plans when delegating to subagents).
- **Scheduled-task visibility** — #11635 (fixed-session scheduled tasks in the sidebar).

## Developer Pain Points

- **React #185 TUI crashes** — Four separate reports (#11500, #11732, #11756, #11724-adjacent) on 0.23.3 all hit the same `setState`-in-layout-listener loop during background-agent workflows; the TUI dies with no error rendered.
- **Memory growth on long sessions** — #11724 / #11725 (duplicates) report 7 GB+ working sets on v0.20.0 with Node 24; on overflow the CLI aborts mid-task and `/continue` cannot recover.
- **Third-party provider breakage** — #10065 (LM Studio "failed to parse grammar"), #11590 (DashScope + non-Qwen vendors 400), #11657 (Fireworks 400 on tool continuation). Qwen Code's request shape leaks assumptions about Qwen-native endpoints.
- **Linux packaging smells** — #11718 (AppImage `PYTHONHOME`/`PYTHONPATH` leak into MCP stdio servers), #11747 (TUI crashes when Node lacks full ICU on RHEL 10), #9037 (`/statusline` dialog clipped in short terminals).
- **Telemetry privacy** — #11198: the default-on RUM channel uploads raw tool-error text, including shell command lines, with no redaction.
- **Time-zone correctness** — #11720: cron next-fire calculation returns a past instant during the repeated DST hour.
- **Test infra flakiness** — #11736 (web-shell smoke times out at 75–91% of 60 s budget), #11465 (visual preview 1.31% pixel diff on the same commit), #11001 (interactive PTY children race cleanup).
- **Subagent delegation drift** — #10953: the persisted Todo plan froze for 55 m 44 s while work advanced through four plan nodes; the active-todo reminder never fires under subagent delegation.
- **LSP staleness** — #11439 (closed): native LSP queries return pre-edit document contents after on-disk edits.
- **Channel / runtime robustness** — #117

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*