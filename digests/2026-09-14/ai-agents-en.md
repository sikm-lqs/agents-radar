# OpenClaw Ecosystem Digest 2026-09-14

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-14 11:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-14

## 1. Today's Overview

OpenClaw shows exceptionally high triage activity with **500 issues and 500 PRs touched in the last 24h**, suggesting an active release-stabilization cycle around the 2026.9.x series. Despite zero new releases today, the project is processing a heavy backlog: 296 issues remain open while 204 were closed in the same window. A large share of today's surfaced items are **P0/P1 release-blocker regressions** tied to the 2026.9.3/9.4 update path, Gateway crash-loops, and Codex/MCP integration problems — indicating the project is mid-stabilization rather than in a feature sprint. The volume of `clawsweeper:*` automation labels reflects mature triage tooling, but the density of unfixed diamond-lobster-rated bugs signals meaningful technical debt.

## 2. Releases

**No new releases in the last 24 hours.** The most recent shipped versions referenced in active issues are 2026.9.2, 2026.9.3, and 2026.9.4, with multiple high-severity reports indicating the 2026.9.3→2026.9.4 transition is not yet considered stable for all platforms (Windows, macOS, Linux/arm64, npm-managed installs).

## 3. Project Progress

**157 PRs merged/closed today.** Notable merged/closed items in the visible top-window:

- [#141252](https://github.com/openclaw/openclaw/issues/141252) — *Closed*: 2026.9.2 regression "Reply operation has no active tool authority snapshot" (P1 diamond lobster, message-loss impact).
- [#108435](https://github.com/openclaw/openclaw/issues/108435) — *Closed*: Gateway failed to start on 2026.7.1 (P0).
- [#88312](https://github.com/openclaw/openclaw/issues/88312) — *Closed (regression of #84076)*: Codex app-server turn-completion stall on 2026.5.27 (P1 platinum hermit).
- [#145072](https://github.com/openclaw/openclaw/issues/145072) — *Closed*: macOS npm update failure at "global install swap" due to launcher symlink fingerprint (P0 diamond lobster).
- [#135776](https://github.com/openclaw/openclaw/issues/135776) — *Closed*: Update left exact-pinned channel plugins on previous release, causing Discord plugin load failure (P0 release-blocker).
- [#140162](https://github.com/openclaw/openclaw/issues/140162) — *Closed*: Windows gateway restart kills slow-booting gateway after 181s (P0).
- [#76038](https://github.com/openclaw/openclaw/issues/76038) — *Closed*: Stuck Session Recovery double-failure mechanism (P1).

**Open PRs awaiting maintainer review** (notable high-quality, "ready for maintainer look" status):
- [#147941](https://github.com/openclaw/openclaw/pull/147941) — Bypass managed proxy for canary readiness (P1, fixes [#147860](https://github.com/openclaw/openclaw/issues/147860)).
- [#145043](https://github.com/openclaw/openclaw/pull/145043) — Prevent stale Codex migrations from blocking upgrades (P1, addresses [#123326](https://github.com/openclaw/openclaw/issues/123326)).
- [#146913](https://github.com/openclaw/openclaw/pull/146913) — Isolate deferred config reload context (P1).
- [#145940](https://github.com/openclaw/openclaw/pull/145940) — Stop terminal subagent flow rewrites after Gateway restart (P2).
- [#110450](https://github.com/openclaw/openclaw/pull/110450) — Bound dreaming markdown reads in memory-core (XL, security-boundary risk flagged).
- [#147971](https://github.com/openclaw/openclaw/pull/147971) — Speed up repeated schema validation (cross-cutting refactor).

## 4. Community Hot Topics

The highest-engagement issues all cluster around **runtime reliability and silent failure modes**:

| Issue | Title | Comments | Rating | Why It Matters |
|---|---|---|---|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | Text between tool calls leaks to messaging channels | 40 | 🦞 P1 | Cross-channel UX bug; affects every messaging adapter |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Unreaped hook/tool child processes / zombie accumulation | 31 | 🦪 P1 | Long-running Gateway degradation; affects macOS/Linux |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | Subagent completion silently lost — no retry/notification | 28 | 🦞 P1 | Multi-agent orchestration silently drops results |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | Codex PreToolUse native hook relay stalls Gateway RPC | 23 | 🦪 P0 | Codex integration stall, ~100% CPU per hook process |
| [#88312](https://github.com/openclaw/openclaw/issues/88312) | Codex turn-completion stall regression (2026.5.27) | 22 | 🐚 P1 | Regression of previously fixed issue (#84076) |
| [#119720](https://github.com/openclaw/openclaw/openclaw/issues/119720) | Synchronous persistence blocks Gateway event loop at scale | 20 | 🦞 P1 | Architectural scaling concern |
| [#48788](https://github.com/openclaw/openclaw/issues/48788) | Centralized filename encoding utility (Feishu etc.) | 20 | 🌊 P3 | Non-blocking but multi-channel reach |
| [#102175](https://github.com/openclaw/openclaw/issues/102175) | Embedded prompt cache breaks across boundaries | 19 | 🐚 P2 | Cost/perf implications for embedded sessions |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP server init timeout crashes the Gateway | 15 | 🦞 P1 | Unhandled rejection crash; needs-proof status |

**Underlying community need:** Users want predictable, observable agent runs. The dominant theme is *silent failure* — context loss, dropped subagent results, tool text leaking into user channels, update paths that rollback without explanation. Reliability > features.

## 5. Bugs & Stability

**P0 / Release-Blocker (open or recently active):**

- [#144911](https://github.com/openclaw/openclaw/issues/144911) — MCP `initialize` timeout triggers Gateway unhandled-rejection crash (P1 diamond lobster, **no fix PR linked yet**).
- [#146394](https://github.com/openclaw/openclaw/issues/146394) — Update failure: global-install-failed on 2026.9.3 (linux/arm64, P0 release-blocker).
- [#145252](https://github.com/openclaw/openclaw/issues/145252) — Tracking umbrella for 2026.9.3/9.4 update/recovery reliability (P0).
- [#146860](https://github.com/openclaw/openclaw/issues/146860) — Windows: managed update handoff stalls on `InteractiveToken` Scheduled Task (P0 release-blocker).
- [#145510](https://github.com/openclaw/openclaw/issues/145510) — Update failure: runtime-verification-failed on 2026.9.3 → 9.4 (Windows x64, P0).
- [#145192](https://github.com/openclaw/openclaw/issues/145192) — 2026.9.2 → 9.4 managed update fails at candidate-Doctor (macOS, P0).
- [#123326](https://github.com/openclaw/openclaw/issues/123326) — Multi-agent Codex migration crash-loops Gateway startup (P0 diamond lobster; fix candidate [#145043](https://github.com/openclaw/openclaw/pull/145043) in review).
- [#125333](https://github.com/openclaw/openclaw/issues/125333) — `totalTokens` inflation on memory-flush path; #123065 fix only covers `api === "cli"` (P0 diamond lobster; **no fix PR linked**).
- [#91009](https://github.com/openclaw/openclaw/issues/91009) — Codex PreToolUse relay stalls Gateway RPC (P0 silver shellfish; **no fix PR linked**).
- [#143524](https://github.com/openclaw/openclaw/issues/143524) — Agent SQLite WAL grows to 1.4–2.8 GB despite autocheckpoint (P0 release-blocker, Windows; **no fix PR linked**).

**P1 Notable:**

- [#97616](https://github.com/openclaw/openclaw/issues/97616) — Zombie process leak (no fix PR linked).
- [#25592](https://github.com/openclaw/openclaw/issues/25592) — Tool-call text leakage to channels (no fix PR linked).
- [#44925](https://github.com/openclaw/openclaw/issues/44925) — Subagent silent loss on Telegram forum bot (no fix PR linked).
- [#119720](https://github.com/openclaw/openclaw/issues/119720) — Synchronous persistence blocking event loop at scale (partial repair via #140231/#138984, still flagged diamond lobster).
- [#134993](https://github.com/openclaw/openclaw/issues/134993) — Gateway busy-loop in filesystem discovery with large skill/agent fleets (P1 gold shrimp; **no fix PR linked**).
- [#113701](https://github.com/openclaw/openclaw/issues/113701) — Context overflow, compaction can't recover, sessions enter failure loop (P1; **no fix PR linked**).
- [#104719](https://github.com/openclaw/openclaw/issues/104719) — memory-wiki exhaustive fallback ignores tool deadline (P1 diamond lobster; PR-linked).
- [#101929](https://github.com/openclaw/openclaw/issues/101929) — `context-overflow-midturn-precheck` over-estimates tokens 2.3–2.6× (P1 diamond lobster; **no fix PR linked**).

**Pattern:** Update reliability (npm, macOS launcher, Windows Scheduled Task, Doctor runtime verification) and Gateway stability under load (event-loop stalls, zombie children, SQLite WAL, context estimation) dominate. Many high-rated bugs have no PR yet — a maintainer-attention bottleneck.

## 6. Feature Requests & Roadmap Signals

Active enhancement/feature requests with meaningful comment engagement:

- [#27445](https://github.com/openclaw/openclaw/issues/27445) — *Closed*: `announceTarget` option for sub-agent completion routing. Likely **shipping in next minor** (already CLOSED with linked PR).
- [#48788](https://github.com/openclaw/openclaw/issues/48788) — Centralized multi-encoding `Content-Disposition` utility (Shift-JIS, EUC-KR, GB18030). Strong fit for an upcoming channel-adapter refactor PR like [#147971](https://github.com/openclaw/openclaw/pull/147971).
- [#52640](https://github.com/openclaw/openclaw/issues/52640) — Persistent task-status surface for long-running channel turns (Discord first). Aligns with web-ui task progress work in PRs like [#148014](https://github.com/openclaw/openclaw/pull/148014).
- [#51028](https://github.com/openclaw/openclaw/issues/51028) — Sessions panel: sort by "last meaningful activity." UX-friction item, low-cost.
- [#74077](https://github.com/openclaw/openclaw/issues/74077) — *Closed*: `/stream` slash command for per-session preview streaming mode (P3; closed likely after design decision).

**Predicted in next release (2026.9.5 or 2026.10.0):**
- Gateway event-loop hardening (zombie reaping, deferred-reload context isolation [#146913](https://github.com/openclaw/openclaw/pull/146913), schema-validation speedup [#147971](https://github.com/openclaw/openclaw/pull/147971)).
- Subagent completion routing (`announceTarget`).
- Auto session load balancing across paired devices [#148099](https://github.com/openclaw/openclaw/pull/148099).
- Memory: vector replacement overhead [#148201](https://github.com/openclaw/openclaw/pull/148201), note metadata isolation [#148190](https://github.com/openclaw/openclaw/pull/148190).

## 7. User Feedback Summary

**Recurring pain points (sourced from issue bodies):**

1. **Silent failures are the #1 complaint.** Subagent results, prompts, and context vanish without user-visible notification (#44925, #25592, #144876, #101929). Users repeatedly request *observability* over *more features*.
2. **Update/install paths are brittle, especially cross-platform.** macOS launcher fingerprint/symlink bugs (#145072), Windows Scheduled Task identity handoff (#146860), npm-managed proxy failures (#147860), plugin-vs-core version skew (#135776). Users want predictable, rollback-safe updates with clearer diagnostic output.
3. **Channel adapter inconsistencies.** Telegram polling 409 conflicts (#75852), Telegram Mini App `/dashboard` shadowing (#142336), Feishu streaming cards unsearchable (#74767), WhatsApp event-loop blocking (#77443), Mattermost 0xC0000409 crash (#71699), cross-user Telegram DM contamination (#77292). Community asks for a uniform channel abstraction.
4. **Context window estimation is unreliable.** Both over-counting (#101929, #125333) and under-handling of large tool outputs (#113701) cause compaction failures and false overflow alarms. Token economics are a top concern for power users.
5. **Codex / MCP integrations regress frequently.** Subagent thread-binding detection crashes (#123326), PreToolUse relay stalls (#91009), app-server turn-completion stall regressions (#88312), MCP init timeout crashes Gateway (#144911).

**Satisfaction signals:** Mature triage automation (`clawsweeper` bot), responsive close-on-fix behavior (#88312 closed within the window), active refactors addressing scalability ([#147971](https://github.com/openclaw/openclaw/pull/147971), [#148017](https://github.com/openclaw/openclaw/pull/148017)). Dissatisfaction is concentrated in the 2026.9.3/9.4 update experience and Codex ecosystem.

## 8. Backlog Watch

High-importance items lacking recent maintainer attention:

- [#25592](https://github.com/openclaw/openclaw/issues/25592) — Tool-call text leakage (P1 diamond lobster, 40 comments, created 2026-02-24, **no fix PR**). Nearly 7 months open.
- [#44925](https://github.com/openclaw/openclaw/issues/44925) — Subagent silent-loss umbrella (P1 diamond lobster, 28 comments, since 2026-03-13).
- [#119720](https://github.com/openclaw/openclaw/issues/119720) — Synchronous persistence blocks event loop at scale (P1 diamond lobster, since 2026-08-05, partial repair landed but still rated diamond lobster).
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — Zombie child-process leak (P1 silver shellfish, 31 comments, since 2026-06-29, **no fix PR**).
- [#113701](https://github.com/openclaw/openclaw/issues/113701) — Context overflow / compaction failure loop (P1 silver shellfish, since 2026-07-25, **no fix PR**).
- [#101929](https://github.com/openclaw/openclaw/issues/101929) — Token estimator over-counts 2.3–2.6× (P1 diamond lobster, since 2026-07-08, **no fix PR**).
- [#125333](https://github.com/openclaw/openclaw/issues/125333) — `totalTokens` ratchet on memory-flush path (P0 diamond lobster, since 2026-08-17, **no fix PR**).
- [#91009](https://github.com/openclaw/openclaw/issues/91009) — Codex hook relay CPU stall (P0 silver shellfish, since 2026-06-06, **no fix PR**).
- [#143524](https://github.com/openclaw/openclaw/issues/143524) — SQLite WAL unbounded growth (P0 release-blocker, since 2026-09-09, **no fix PR**).
- [#69208](https://github.com/openclaw/openclaw/issues/69208) — Umbrella: duplicate transcript/replay across channels (P1, since 2026-04-20, awaits maintainer product decision).
- [#114414](https://github.com/openclaw/openclaw/issues/114414) — Dated TODO sweep (P3,

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Personal AI Assistant / Agent Open-Source Ecosystem
**Date: 2026-09-14 | Projects: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw**

---

## 1. Ecosystem Overview

The personal AI assistant landscape has converged on a common architecture — persistent gateway/daemon core, pluggable messaging-channel adapters, MCP tool integration, and long-term memory subsystems — and notably, **all five projects are in stabilization mode with zero releases shipped in the last 24 hours**. The dominant engineering theme across the ecosystem is reliability of "boring" infrastructure: update paths, config persistence, process lifecycle, and memory management, rather than new capabilities. MCP has become the universal integration seam — and equally the universal source of regressions, appearing in every project's bug list today. Community expectations have visibly shifted from feature velocity toward observability and the elimination of silent failure modes.

---

## 2. Activity Comparison

| Project | Issues (24h touched) | PRs (24h touched) | Closed / Merged | Release Status | Health Score |
|---|---|---|---|---|---|
| **OpenClaw** | 500 (204 closed, 296 open) | 500 (157 merged/closed) | 31% PR landing rate | No release; 2026.9.3→9.4 mid-stabilization | 🟡 **6.5/10** — unmatched throughput, but 10+ open P0 release-blockers and multi-month unfixed P1s |
| **Hermes Agent** | 50 (7 closed) | 50 (1 merged) | 2% PR landing rate | No release; head ~472 commits past v0.21.2 | 🟡 **6/10** — technically deep community, but unresolved secret-leak cluster and a reopened "fixed" regression |
| **IronClaw** | 0 | 5 open, 1 closed | 1 dependency PR only | No release; no tags in window | 🟢 **7.5/10** — clean hygiene, near-zero community; review-latency risk on dep bumps |
| **QwenPaw** | 44 (13 closed) | 50 (13 merged/closed) | 26% PR landing rate | No release; v2.2.0 / v2.2.1-beta.2 line | 🟡 **6/10** — best fix-velocity-to-size ratio, but critical 20 GB memory leak and MCP upgrade regression open |
| **ZeroClaw** | 25 (5 closed, 20 open) | 50 (1 closed) | 2% PR landing rate | No release; post-v0.8.5 hardening | 🟢 **7/10** — governance-mature, config-correctness push, but two open S1s without fix PRs |

**Key read:** OpenClaw and QwenPaw are actively landing code; Hermes and ZeroClaw are in review/decision mode; IronClaw is in passive maintenance.

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Scale is an order of magnitude ahead.** 500+500 tracker events/day vs. ≤100 for every peer; issue IDs at ~148k vs. Hermes ~110k, ZeroClaw ~10.8k, QwenPaw ~7.7k, IronClaw ~8k. Hot threads reach 40 comments (peaks of 6–15 elsewhere).
- **Broadest surface coverage:** adapters for Discord, Telegram, WhatsApp, Feishu, Mattermost, plus Codex integration, web UI, session recovery, and multi-device pairing — no peer matches the channel breadth.
- **Most mature triage automation:** the `clawsweeper` bot with a structured severity taxonomy (P0–P3, shellfish ratings) and close-on-fix behavior (#88312 closed within window).

**Weaknesses vs. peers:**
- **Release quality is the worst in class today.** A dense cluster of P0 update-path failures (#146394, #146860, #145510, #145192, #145072) contrasts with ZeroClaw's systematic central fix for config-write correctness (PR #10499) and IronClaw's clean bug sheet.
- **Maintainer-attention bottleneck:** P0s #144911, #125333, #91009, #143524 have no fix PR; #25592 is ~7 months old with 40 comments.

**Technical approach differences:** Gateway-centric TypeScript architecture distributed via npm with managed updates (Doctor verification, canary readiness, channel-pinned plugins), SQLite persistence, and a memory-core with "dreaming" — vs. Hermes' Python plugin model (ContextEngine hooks, Hindsight memory), IronClaw's Rust host + WASM sandbox with egress leak-blocking, QwenPaw's desktop-app-first product with Hub runtime and ReMe memory, and ZeroClaw's Rust daemon with RFC-governed config schemas.

**Community size:** Largest in the ecosystem by engagement volume; Hermes is second (highest repro quality per report); ZeroClaw is small but process-intense; IronClaw has effectively no visible community.

---

## 4. Shared Technical Focus Areas

| Focus Area | Projects | Specific Needs |
|---|---|---|
| **MCP reliability & recovery** | All 5 | Init-timeout crash handling (OpenClaw #144911), connection poisoning after failed recovery (ZeroClaw #10807), upgrade regressions (QwenPaw #7716, #7728), dependency conflicts (Hermes #95855), diagnostic classification (IronClaw #8077) |
| **Silent-failure observability** | OpenClaw, QwenPaw, Hermes, ZeroClaw | Subagent result loss (OpenClaw #44925), scheduled tasks swallowing output (QwenPaw #7709), plugin failures mis-reported as success (QwenPaw #7715), errors only visible at DEBUG (Hermes #109482), stale service logs (ZeroClaw #10821) |
| **Update & config persistence safety** | OpenClaw, Hermes, QwenPaw, ZeroClaw | Rollback-safe cross-platform updates (OpenClaw's entire P0 cluster), autostash sweeping live state (Hermes #110668), LLM config vanishing mid-session (QwenPaw #7708/#7724), validate-on-write semantics (ZeroClaw #10320/#10837) |
| **Memory subsystem stability** | OpenClaw, QwenPaw, Hermes | 20.7 GB runtime growth (QwenPaw #7222/#7722), SQLite WAL bloat (OpenClaw #143524), Hindsight daemon restarts (Hermes #107324) |
| **Sub-agent orchestration** | OpenClaw, QwenPaw, Hermes | Silent result drops (OpenClaw), spawn timeouts on Windows (QwenPaw #7678), chatloops in 247-skill profiles (Hermes #45983) |
| **Token accounting & compaction** | OpenClaw, ZeroClaw, QwenPaw, Hermes | 2.3–2.6× estimator overcount (OpenClaw #101929), window-ratio-anchored compaction (ZeroClaw PR #9535), prompt-cache passthrough (ZeroClaw #10623), tiered long-context pricing (Hermes #110793) |
| **Agent–host security boundary** | Hermes, IronClaw, QwenPaw, ZeroClaw | Secret redaction in config dumps (Hermes #84106/#110758), egress leak-blocking (IronClaw), policy-guarded destructive commands (QwenPaw #7757) |

---

## 5. Differentiation Analysis

| Project | Feature Focus | Target User | Architecture |
|---|---|---|---|
| **OpenClaw** | Multi-channel messaging assistant, Codex/MCP integration, multi-device | Power users self-hosting assistants across many chat platforms | TS gateway + npm distribution, extensive channel-adapter layer |
| **Hermes Agent** | Plugin/memory ecosystem, provider breadth (OpenRouter, Z.AI, Codex Responses), CLI/Desktop/gateways | Security-conscious homelab operators, plugin authors | Python, ContextEngine extension model, multi-profile |
| **IronClaw** | Host sandboxing, egress leak prevention, MCP diagnostics | Runtime/infra builders embedding agent hosts | Rust host API + WASM/wasmtime sandbox — a lower stack layer than peers |
| **QwenPaw** | End-user product: desktop app, Docker, Hub runtime, ReMe memory, Daily Paper, skill marketplace | Less-technical desktop-first end users | Desktop app + backend service, venv/runtime alignment work |
| **ZeroClaw** | Config correctness, governance/RFC process, A2A protocol, edge mesh, prompt-cache economics | Operators and protocol-focused enthusiasts | Rust daemon + gateway, schema-validated config authority |

** sharpest contrast:** IronClaw plays infrastructure (sandbox/host hardening) while the other four compete on the assistant application layer; ZeroClaw is the only project investing visibly in **process capital** (RFC reform) as a product feature.

---

## 6. Community Momentum & Maturity

- **Tier 1 — Massive scale, mid-crisis stabilization:** **OpenClaw**. Highest velocity in the ecosystem, but the 2026.9.3/9.4 update failures show scale outpacing release engineering. Rapid iteration with accumulated debt.
- **Tier 2 — Active iteration:** **QwenPaw** landed 13 PRs and closed 13 issues today — the highest *relative* fix throughput — but is paying for it with critical memory-leak and MCP-regression exposure on the v2.2.x line.
- **Tier 2 — Deep but triage-heavy:** **Hermes Agent** is closing stale reports (7:1 close-to-merge ratio) while a large unreviewed fix queue accumulates ahead of an overdue 0.21.3+ release.
- **Tier 3 — Deliberate stabilization:** **ZeroClaw** — RFC reform, release-efficiency tracking, and config-write hardening signal a project transitioning from feature phase to sustained maintenance.
- **Tier 4 — Quiet maintenance:** **IronClaw** — healthy dependabot cadence, one substantive PR in flight, zero organic community signal. Risk is bus factor and PR-review latency, not code quality.

---

## 7. Trend Signals

1. **MCP reliability is now table stakes.** All five projects hit MCP failures in a single 24h window — init crashes, connection poisoning, upgrade breakage, dependency skew. *Developer value:* invest in init timeouts, poison-resistant recovery, and IronClaw-style error classification (#8077 is the reference pattern) before adding MCP features.
2. **Observability beats features.** The top-engagement threads everywhere are silent failures, not missing capabilities (OpenClaw #44925, QwenPaw #7709). Users explicitly ask for visible task status and honest error reporting — a durable product differentiator.
3. **Update safety is a retention mechanism.** Broken update paths are the #1 P0 source in the ecosystem (OpenClaw, Hermes, QwenPaw). Atomic config writes (ZeroClaw #10499/#10822) and state-preserving updates (Hermes #110668) should be treated as trust infrastructure.
4. **Memory systems are at an inflection from differentiator to liability.** Every memory-rich project reported leaks, index desync, or silent review rollback this week. Expect a wave of memory-subsystem hardening releases next cycle.
5. **The agent–host security boundary is the next battleground.** Secret leakage through agent-readable config (Hermes), egress leak-blocking (IronClaw), and policy-guarded tools (QwenPaw) indicate safe-by-default isolation will separate production-grade agents from hobby projects.
6. **Token economics drive power-user loyalty.** Accurate estimators, compaction anchored to real model windows, and prompt-cache passthrough appear in three projects — cost predictability is a competitive feature, not plumbing.
7. **Governance and automation scale communities.** ZeroClaw's RFC reform and OpenClaw's triage bot show that process tooling determines whether large contributor bases accelerate or bottleneck a project.

---
*Data basis: 2026-09-14 community digests per project; 24-hour observation windows; health scores are analyst judgments weighted toward open-severity debt vs. fix throughput.*

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — Project Digest (2026-09-14)

## 1. Today's Overview

Hermes Agent shows **high triage velocity** with 100 tracker events (50 issues + 50 PRs) in the last 24 hours, but no new release has been cut. Activity skews heavily toward **bug reports and security findings** across gateway, MCP, and CLI surfaces, with a meaningful cluster of platform-specific (Windows/macOS/Linux) regressions. Closed items outnumber merged PRs by a wide margin (7 closed issues vs. 1 merged PR), indicating the maintainers are closing stale/duplicate reports rather than shipping new features. No releases today suggests version **0.21.x** remains the head while a wave of fixes accumulates on `main`.

## 2. Releases

**No new releases in the last 24 hours.** The most recent tagged version referenced in the data is **v0.21.2** (PR #110668), and **v0.19.1** (issue #76541) is still the version users are reporting regressions against. The dependency pins on `mcp==2.0.0` / `fastmcp` conflict (issue #95855, PR #107324) means any new release should ship with a coordinated pyproject bump.

## 3. Project Progress

Only **1 PR merged/closed** in the last 24 hours; the rest (49) remain open. Notable closed issue activity (not PR merges) today:

- **#23837 [CLOSED]** — ContextEngine per-turn observation hook feature request was closed, likely as addressed/implemented. ([issue](https://github.com/NousResearch/hermes-agent/issues/23837))
- **#29418 [CLOSED]** — Nous inference streaming timeout was closed as "implemented on main," but **immediately re-opened** by a different reporter in **#110769**, who says the bug still reproduces on commit `5eb99eb2` (~472 commits past v0.21.2). ([reopen](https://github.com/NousResearch/hermes-agent/issues/110769))
- **#76541 [CLOSED]** — v0.19.1 Telegram gateway watchdog kills now closed as implemented on main.
- **#110719 [CLOSED]** — opencode-go MissingSessionID gateway image pre-analysis.
- **#110722 [CLOSED]** — Multiplex-profile MCP tools include/exclude discrepancy (0.21.1/0.21.2).

Open PRs that **advanced real engineering work** today:

- **#110668** — `fix(update): ignore flat-install runtime state so autostash cannot sweep the live state.db` (P1, sweeper:risk-session-state) — addresses a critical data-loss path on flat installs. ([PR](https://github.com/NousResearch/hermes-agent/pull/110668))
- **#107324** — `fix(memory/hindsight): stop the per-session embedded daemon restart` — directly addresses issue #95855 by fixing the `fastmcp`/`mcp` version conflict. ([PR](https://github.com/NousResearch/hermes-agent/pull/107324))
- **#110780** — Slack `channel_*`/`pinned_item` housekeeping subtypes gated by conversational allowlist. ([PR](https://github.com/NousResearch/hermes-agent/pull/110780))
- **#110795** — Codex Responses API now drops truncated tool arguments instead of executing them. ([PR](https://github.com/NousResearch/hermes-agent/pull/110795))
- **#110794** — CLI now accepts `--yolo` on `gateway` and `gateway run`. ([PR](https://github.com/NousResearch/hermes-agent/pull/110794))
- **#110793** — OpenRouter tiered pricing overrides applied for long-context cost estimates. ([PR](https://github.com/NousResearch/hermes-agent/pull/110793))
- **#110792** — Z.AI streamed reasoning now preserved in session history. ([PR](https://github.com/NousResearch/hermes-agent/pull/110792))
- **#110775** — Hermes Desktop routes raw external anchors through the audited opener (closes dead docs/sign-in links). ([PR](https://github.com/NousResearch/hermes-agent/pull/110775))
- **#110788** — Windows VBS launcher now propagates gateway exit code to Task Scheduler. ([PR](https://github.com/NousResearch/hermes-agent/pull/110788))

## 4. Community Hot Topics

The most-discussed threads (by comment count) all point to **structural fragility in the gateway's auth, memory, and provider layers**:

| Rank | Item | Comments | Theme |
|---|---|---|---|
| 1 | [#95855](https://github.com/NousResearch/hermes-agent/issues/95855) Hindsight `local_embedded` broken | 7 | Plugin dependency conflict (mcp/fastmcp) silently disables local memory after every update |
| 2 | [#23837](https://github.com/NousResearch/hermes-agent/issues/23837) ContextEngine observation hook | 6 | Plugin authors forced to abuse `compress()` as a backdoor for per-turn context observation |
| 3 | [#45983](https://github.com/NousResearch/hermes-agent/issues/45983) Chatloop in skill-heavy profiles | 6 | 247-skill profile enters chatloop after ~19 turns due to bg-review + built-in Compressor collision |
| 4 | [#84106](https://github.com/NousResearch/hermes-agent/issues/84106) `config get mcp_servers` leaks secrets | 5 | `security.redact_secrets` ignored for MCP creds; agent sessions can exfiltrate via terminal tool |
| 5 | [#42997](https://github.com/NousResearch/hermes-agent/issues/42997) Email gateway IMAP marks unread as read | 5 | IMAP `RFC822` FETCH is not a peek — design-level misuse of the IMAP protocol |
| 6 | [#73403](https://github.com/NousResearch/hermes-agent/issues/73403) Windows ACP adapter hangs | 5 | First terminal tool hangs forever on Windows Git Bash startup probing |
| 7 | [#110591](https://github.com/NousResearch/hermes-agent/issues/110591) Discord Markdown rendering | 5 | GitHub-style tables render poorly; request for embed-field promotion |

**Underlying needs:** (a) memory/plugin reliability across updates, (b) safe-by-default config dumps for agent-driven terminals, (c) first-class plugin extension points instead of backdoor reuse, (d) platform parity on Windows and macOS.

## 5. Bugs & Stability

Ranked by **explicit severity labels** in the data:

### P1 (Highest)
- **#73403** — Windows ACP adapter hangs on terminal tool. Fix exists: **PR #69083**. ([issue](https://github.com/NousResearch/hermes-agent/issues/73403))
- **#110668** (PR) — Flat-install `state.db` swept by `autostash` during `hermes update`. ([PR](https://github.com/NousResearch/hermes-agent/pull/110668))
- **#76541 [CLOSED]** — Telegram gateway repeatedly killed by shutdown watchdog on v0.19.1. Closed as implemented.

### P2 (High)
- **#84106** — `hermes config get mcp_servers` exposes resolved MCP secrets even with `redact_secrets: true`. **No fix PR.** ([issue](https://github.com/NousResearch/hermes-agent/issues/84106))
- **#110690** — `gateway.allow_all_users` in `config.yaml` is silently ignored; runtime reads env vars only. **No fix PR.** ([issue](https://github.com/NousResearch/hermes-agent/issues/110690))
- **#110758** — `hermes config get providers` prints API keys in plaintext, logged in session transcripts. Duplicate of #84106 in scope. **No fix PR.** ([issue](https://github.com/NousResearch/hermes-agent/issues/110758))
- **#110769** — Streaming still hangs on agent-sized context (reopening #29418). **No fix PR.** ([issue](https://github.com/NousResearch/hermes-agent/issues/110769))
- **#109837** — `key_cmd` providers send `repr(CommandTokenSource)` as Bearer token on metadata probes; async aux clients send empty key. **No fix PR.** ([issue](https://github.com/NousResearch/hermes-agent/issues/109837))
- **#110689** — Background memory-review emits unsupported `"action": "patch"` → entire batch rolls back and strands in `pending`. **No fix PR.** ([issue](https://github.com/NousResearch/hermes-agent/issues/110689))
- **#110695** — `command.dispatch` cannot invoke secondary-profile skills (4018 routing bug). **No fix PR.** ([issue](https://github.com/NousResearch/hermes-agent/issues/110695))
- **#110737** — `busy_input_mode: interrupt` silently drops interrupt messages carrying image attachments. **No fix PR.** ([issue](https://github.com/NousResearch/hermes-agent/issues/110737))
- **#110276** — macOS `DeletedWalGenerationError` suicide-restart loop from single-process multi-handle WAL split (every 16-30 s). **No fix PR.** ([issue](https://github.com/NousResearch/hermes-agent/issues/110276))
- **#103665** (PR) — `fix(tui-gateway): hold a persistent WAL keeper` — addresses #110276 root cause. ([PR](https://github.com/NousResearch/hermes-agent/pull/103665))
- **#104851** — `computer_use` `element_token` fallback needed for cua-driver ≥0.23.2. **No fix PR.** ([issue](https://github.com/NousResearch/hermes-agent/issues/104851))
- **#91742** (PR) — Responses API input messages missing `type=message`. ([PR](https://github.com/NousResearch/hermes-agent/pull/91742))
- **#75562** (PR) — Gateway streams reasoning echo instead of real content. ([PR](https://github.com/NousResearch/hermes-agent/pull/75562))
- **#100765** (PR) — Wayland clipboard image fallback for Desktop. ([PR](https://github.com/NousResearch/hermes-agent/pull/100765))

### P3 (Standard)
- **#95855** — Hindsight `local_embedded` broken by mcp/fastmcp version skew. **Fix PR: #107324.** ([issue](https://github.com/NousResearch/hermes-agent/issues/95855))
- **#45983** — Chatloop in skill-heavy orchestrator profiles. **No fix PR.**
- **#42997** — Email gateway IMAP FETCH marks unread Gmail as read. **No fix PR.**
- **#109482** — `hermes update` silently swallows sibling profile migration errors at DEBUG. **No fix PR.**
- **#110766** — Desktop exposes `compression.threshold` but hides `codex_gpt55_autoraise` override. **No fix PR.**
- **#103062** — systemd user unit timing check reads DEFAULT 90s → false "stale" warning. **No fix PR.**
- **#80336** — Matrix transient TLS/timeout misclassified as permanent auth error. **No fix PR.**
- **#76362** — SimpleX adapter drops inline base64 images. **No fix PR.**

## 6. Feature Requests & Roadmap Signals

**Likely near-term (within next 1–2 minor releases), based on linked PRs and topic clustering:**

- **#110591** — Discord Markdown rendering for tables/status fields. Discord gateway gap; no PR yet but high discussion. ([issue](https://github.com/NousResearch/hermes-agent/issues/110591))
- **#23837 [CLOSED]** — ContextEngine per-turn observation hook — closed status implies a real API is coming. ([issue](https://github.com/NousResearch/hermes-agent/issues/23837))
- **#110767 (PR)** — `feat(plugins): register browser login backends` for Proton Pass, KeePassXC, etc. ([PR](https://github.com/NousResearch/hermes-agent/pull/110767))
- **#110736** — Bot Mode Group Chat add/remove members (`groups.add_member`). ([issue](https://github.com/NousResearch/hermes-agent/issues/110736))
- **#110789 (PR)** — Show effective OpenRouter provider pins on `/model` switch. ([PR](https://github.com/NousResearch/hermes-agent/pull/110789))
- **#110726** — Installer should not invoke `sudo` for already-installed dependencies. ([issue](https://github.com/NousResearch/hermes-agent/issues/110726))

**Likely medium-term:**

- **#110731** — Make `hermes-agent` itself disable-able via `.no-bundled-skills` / `skills.disabled` (currently it is hard-coded as essential). Touches core skill semantics. ([issue](https://github.com/NousResearch/hermes-agent/issues/110731))

## 7. User Feedback Summary

**Pain points (recurring themes from comments):**

1. **Update reliability.** Multiple users report `hermes update` *silently breaks* working features — Hindsight memory, sibling profile configs (#109482), flat-install state.db (#110668). The pattern: regressions are surfaced only in DEBUG logs or when re-running `hermes doctor` *after* the damage.
2. **Secret leakage through CLI.** A coherent cluster of issues (#84106, #110690, #110758) shows the community is concerned that `hermes config get …` and `gateway.allow_all_users` are effectively "open by default" — a meaningful security boundary failure when an agent can invoke its own terminal.
3. **Streaming and reasoning on long context.** #29418 → #110769 indicates the community feels a closed-as-fixed issue remains unresolved; this is trust-damaging if not addressed.
4. **Cross-platform fragility.** Windows ACP (#73403), macOS WAL (#110276), Wayland clipboard (#100765 / #85782), systemd user timing (#103062) — users on each platform report isolated but severe failure modes.
5. **Plugin author ergonomics.** #23837 explicitly calls out the lack of a first-class per-turn observation hook; users are forced into workaround patterns. The Hermes-Mneme author is essentially doing system-call-level integration.

**Use cases represented:**

- Self-hosted multi-profile homelabs (247-skill profile in #45983; multi-handle WAL in #110276).
- Mobile-first messaging gateways (Telegram, Discord, Slack, SimpleX, Matrix) with image attachments and `free_response_channels`.
- Long-context billing transparency via OpenRouter (PR #110793 — users want correct cost reporting above 272K tokens).
- Browser-mediated credential vaults (Proton Pass, KeePassXC via PR #110767).

**Satisfaction signal:** Healthy. Most issues include reproduction steps, environment info, and even unit-test-grade detail (e.g., issue #103062 includes exact probe path and code references). Several are filed by users who then also file the fix PR, indicating an engaged, technically-deep community.

## 8. Backlog Watch

Items with **high impact, low activity, and no fix PR** that maintainers should triage:

| Item | Created | Comments | Why it matters |
|---|---|---|---|
| [#84106](https://github.com/NousResearch/hermes-agent/issues/

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-14

## 1. Today's Overview

IronClaw shows **low-to-moderate activity** over the last 24 hours, driven entirely by pull request churn rather than issue discussions. No issues were opened, updated, or closed, and no new releases were tagged, suggesting a quiet maintenance period. The pipeline is dominated by routine dependency bumps (Rust crates, GitHub Actions, WASM toolchain) orchestrated by `dependabot[bot]`, with one substantive engineering change in flight: PR #8077, which centralizes MCP response-leak diagnostics. The healthy ratio of routine PRs to functional PRs and the absence of open bug reports indicate stable project hygiene, though limited community discussion (zero 👍 reactions and undefined comment counts across the board) signals low external engagement at present.

## 2. Releases

No new releases published in the last 24 hours. No version tags reported.

## 3. Project Progress

**Closed/merged activity (last 24h): 1 PR**

- **#8097** — [`chore(deps): bump the everything-else group with 24 updates`](https://github.com/nearai/ironclaw/pull/8097) (dependabot, closed 2026-09-13): Routine 24-package dependency update. This was effectively **superseded by #8099** the same day (a follow-up bumping to newer patch versions of the same crates). No code semantics changed.

**Substantive PR advancing today (open):**

- **#8077** — [`fix(mcp): classify response leak diagnostics`](https://github.com/nearai/ironclaw/pull/8077) (linhongyu510, last updated 2026-09-14): Refactors host response-leak blocking to introduce a centralized `response_leak_blocked` sentinel in `ironclaw_host_api::http` and teaches the MCP lane to classify that sentinel distinctly, preserving an MCP-visible failure reason while keeping host leak-blocking semantics safe. Closes #8009. This is the only non-dependency change in flight.

**Open dependency bumps still pending review (updated 2026-09-13):**

- [#8099 — everything-else group, 25 updates](https://github.com/nearai/ironclaw/pull/8099)
- [#8079 — actions group, 6 updates](https://github.com/nearai/ironclaw/pull/8079)
- [#8078 — tokio-ecosystem group, 2 updates](https://github.com/nearai/ironclaw/pull/8078)
- [#7834 — wasm group, 4 updates (ageing)](https://github.com/nearai/ironclaw/pull/7834)

## 4. Community Hot Topics

There are **no issues** and **no human comment activity** on any tracked item over the observation window. All five open PRs carry **0 👍 reactions** and undefined comment counts, indicating no measurable community discussion. The single "hottest" thread by update recency is:

- [#8077 (MCP response-leak fix)](https://github.com/nearai/ironclaw/pull/8077) — the only non-mechanical PR, and the closest thing to a current discussion topic. Underlying need: clearer, debuggable MCP error reporting when host egress policy blocks a response, without weakening the host's leak-prevention guarantees.

Apart from dependabot's automated cadence, there is **no organic community demand signal** visible in the 24-hour window.

## 5. Bugs & Stability

- **No bug issues** were filed or updated in the last 24 hours.
- **PR #8077** is the only stability-related change currently in review. It addresses a diagnostic-classification gap in MCP egress leak handling (referenced issue #8009, not present in the current data slice). Severity: appears to be a **correctness/observability fix** rather than a crash or data-loss bug — host leak-blocking remains intact; only the surfaced reason is being made more precise.
- No regressions or crash reports are visible. **Risk note:** with five dependabot PRs open simultaneously and overlapping crate updates, there is a non-trivial chance of integration friction if they are merged out of order; #8099 already supersedes #8097, suggesting the bot is self-correcting but maintainers should batch-merge with CI verification.

## 6. Feature Requests & Roadmap Signals

- **No feature-request issues** were filed in the last 24 hours, and no historical issues surface in the data slice. No roadmap signal can be inferred from issue activity alone.
- The only directional inference is from PR #8077: a small but deliberate investment in **MCP-layer diagnostic clarity**, suggesting ongoing work on the MCP integration surface within `ironclaw_host_api::http`. This points to MCP interop as an active area rather than a new feature push.
- The breadth of the dependabot groups (`everything-else`, `actions`, `tokio-ecosystem`, `wasm`) implies maintainers care about keeping the full Rust + WASM + GH Actions toolchain current — likely a standing commitment rather than a roadmap item.

## 7. User Feedback Summary

There is **no observable user feedback** in the 24-hour window: zero comments, zero reactions, zero new issues. No pain points, use-case reports, or satisfaction signals are present in the data. Any user-sentiment analysis would require pulling a longer historical window.

## 8. Backlog Watch

- **PR #7834** ([wasm group bump, 4 updates](https://github.com/nearai/ironclaw/pull/7834)) — created **2026-08-23**, last touched 2026-09-13. At ~3 weeks old this is the **oldest unmerged PR** in the visible set. WASM (`wasmtime`, `wasmtime-wasi`, `wit-component`, `wit-parser`) is a core runtime dependency, so delays here can compound with later groups; recommend a maintainer review for batch merging with #8078 / #8099.
- **PR #8079** ([actions group, 6 updates](https://github.com/nearai/ironclaw/pull/8079)) — includes a major-version bump of `actions/setup-node` from **4.0.2 → 7.0.1** and `anthropics/claude-code-action` from 1.0.183 → 1.0.221. Major-version CI action bumps deserve explicit maintainer sign-off; flagging for attention.
- **PR #8077** ([MCP response-leak diagnostics](https://github.com/nearai/ironclaw/pull/8077)) — only non-trivial code change in flight, 8 days old, no comments yet. Closes #8009; reviewer attention needed to unblock the bug-fix chain.
- **No orphaned issues** are visible in the current data slice, so no unanswered issue backlog can be reported.

---

**Overall health signal:** 🟢 Stable but quiet. Maintainer-side maintenance is healthy (active dependabot cadence, in-flight diagnostic fix), but community-side engagement is flat. The primary risk is **PR-review latency on overlapping dependency bumps and a major-version CI action update**, not code quality or open bugs.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-14

## 1. Today's Overview

QwenPaw shows **high-velocity maintenance activity** in the last 24 hours: 44 issues and 50 PRs updated across the `agentscope-ai/QwenPaw` repository, with no new release published. The activity profile is roughly balanced between new bug triage (31 open issues) and active development (37 open PRs), suggesting the project is in a stabilization phase following the v2.2.x line. A large cluster of fixes targets memory subsystems, MCP/ACP protocol handling, and runtime resilience, while the community surfaces persistent pain around configuration persistence, scheduled-task output reliability, and Docker/MCP upgrade regressions. Overall project health is **active but strained**, with several high-severity memory-leak and protocol-compat bugs still open despite matching PRs in flight.

## 2. Releases

No new releases published in the last 24 hours. Last known user-reported versions in active issues are **v2.2.0** and **v2.2.1 / 2.2.1-beta.2**; no tag-cut is reflected in the data feed.

## 3. Project Progress

13 issues closed and 13 PRs merged/closed in the last 24 hours. Notable merged/closed items that shipped fixes:

- [#4354](https://github.com/agentscope-ai/QwenPaw/issues/4354) — Large Excel-file read interrupt bug closed (v1.1.6 era).
- [#4220](https://github.com/agentscope-ai/QwenPaw/issues/4220) — `auto_memory_interval` wrote memory files without syncing the vector index; closed after `memory_search` consistency was addressed.
- [#3995](https://github.com/agentscope-ai/QwenPaw/issues/3995) — Memory management & recall enhancement request closed (likely addressed by ongoing ReMe / vector-index work).
- [#7199](https://github.com/agentscope-ai/QwenPaw/issues/7199) — `daily_paper` `write_atomic` surrogate-character crash fixed.
- [#4710](https://github.com/agentscope-ai/QwenPaw/issues/4710) — Vector-store naive-datetime vs UTC metadata inconsistency closed.
- [#5122](https://github.com/agentscope-ai/QwenPaw/issues/5122) — Context-compression stats vs actual API payload divergence closed (skills/MCP-induced inflation addressed).
- [#6840](https://github.com/agentscope-ai/QwenPaw/issues/6840), [#6222](https://github.com/agentscope-ai/QwenPaw/issues/6222), [#4208](https://github.com/agentscope-ai/QwenPaw/issues/4208), [#3801](https://github.com/agentscope-ai/QwenPaw/issues/3801), [#7594](https://github.com/agentscope-ai/QwenPaw/issues/7594), [#7666](https://github.com/agentscope-ai/QwenPaw/issues/7666) — assorted questions / invalid / Hugging Face download issues closed.

Open PRs landing features and fixes (no PR in the feed is marked merged today, but the following are actively under review):

- [#7751](https://github.com/agentscope-ai/QwenPaw/pull/7751) — Align Docker app venv with desktop Python 3.11 standalone runtime; keeps Debian Python for entrypoint compatibility.
- [#7748](https://github.com/agentscope-ai/QwenPaw/pull/7748) — Doom-loop warnings delivered before next model call; budget and overflow recovery corrected (relates to [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722)).
- [#7766](https://github.com/agentscope-ai/QwenPaw/pull/7766) — Hub personal Runtime authenticates native browser file previews via query-string token.
- [#7763](https://github.com/agentscope-ai/QwenPaw/pull/7763) — Plugin catalog now survives `ConnectionResetError` / `IncompleteRead`.
- [#7753](https://github.com/agentscope-ai/QwenPaw/pull/7753) — `make-skill` upgraded to v2.1 with mandatory stored-plan step before draft creation.
- [#7757](https://github.com/agentscope-ai/QwenPaw/pull/7757) — Governance: `PolicyGuardedTool` now runs destructive-command classifier and system-credential guards end-to-end.
- [#7737](https://github.com/agentscope-ai/QwenPaw/pull/7737) — Multi-agent collaboration skill trigger keywords expanded (fixes [#3113](https://github.com/agentscope-ai/QwenPaw/issues/3113)).
- [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735), [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732), [#7684](https://github.com/agentscope-ai/QwenPaw/pull/7684), [#7762](https://github.com/agentscope-ai/QwenPaw/pull/7762), [#7761](https://github.com/agentscope-ai/QwenPaw/pull/7761), [#7765](https://github.com/agentscope-ai/QwenPaw/pull/7765), [#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725), [#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723), [#7211](https://github.com/agentscope-ai/QwenPaw/pull/7211), [#7756](https://github.com/agentscope-ai/QwenPaw/pull/7756), [#7759](https://github.com/agentscope-ai/QwenPaw/pull/7759), [#7760](https://github.com/agentscope-ai/QwenPaw/pull/7760), [#7758](https://github.com/agentscope-ai/QwenPaw/pull/7758) — additional MCP/ACP protocol fixes, console UX, CLI shutdown drain, glob brace expansion, etc.

## 4. Community Hot Topics

The most-discussed threads (by comment count) cluster around **memory reliability**, **sub-agent orchestration**, and **silent failure modes**:

- [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) — **Scheduled tasks frequently produce no output**; results get folded into `thinking` or omitted entirely on v2.2.1. (6 comments) — Underlying need: deterministic, user-visible scheduled-task output and a less aggressive thinking-collapsing heuristic.
- [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) — **`spawn subAgent` always times out** regardless of timeout length on Win v2.2.0. (6 comments) — Underlying need: dependable sub-agent dispatch, not just configurable timeouts.
- [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) — **Agent keeps "forgetting"** project conventions (e.g., TODO file locations, dev vs deploy path), even after explicit instructions. (6 comments) — Underlying need: stronger long-term project conventions that survive across sessions, plus user-visible rules.
- [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) — **Memory exhaustion via three compounding paths**: unbounded stream buffers, keep-alive instance stacking, and doom-loop gate evasion (controlled repro included). (4 comments) — High-quality technical report proposing minimal fixes; matches [#7222](https://github.com/agentscope-ai/QwenPaw/issues/7222) (20 GB+ runtime growth). PR [#7748](https://github.com/agentscope-ai/QwenPaw/pull/7748) addresses part of the surface.
- [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) — **Daily Paper plugin silently fails** when arxiv.org is unreachable; user sees "completed with no returned content" instead of a network error. (4 comments) — Underlying need: honest error reporting and a proxy/endpoint config knob. PRs [#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723) and [#7756](https://github.com/agentscope-ai/QwenPaw/pull/7756) target related surfaces.
- [#7739](https://github.com/agentscope-ai/QwenPaw/issues/7739) — **UX**: history sidebar to the right on narrow laptop screens. (4 comments)
- [#7749](https://github.com/agentscope-ai/QwenPaw/issues/7749) — **Where is model failover configured?** User cannot find the UI for the new v2.2.1 failover feature. (3 comments)
- [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708), [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) — **Configured LLM "disappears"** mid-session on v2.2.1 desktop; downstream: lost conversation linked to same root cause. (4 comments each)

## 5. Bugs & Stability

Ranked by severity and impact (all OPEN unless noted):

| Sev | Issue | Summary | Fix in flight? |
|---|---|---|---|
| **Critical** | [#7222](https://github.com/agentscope-ai/QwenPaw/issues/7222) — Long-running `qwenpaw-backend` memory grows to **20.7 GB** over 2 days (runtime accumulation, not startup leak). | Sustained denial-of-service for self-hosters. | Partial via [#7748](https://github.com/agentscope-ai/QwenPaw/pull/7748); stream-buffer and keep-alive paths still open. |
| **Critical** | [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) — Memory exhaustion via **three compounding paths**; ~1 MB/s growth, OOM hangs. Reproducible. | Same root family as #7222; report includes minimal fix sketches. | [#7748](https://github.com/agentscope-ai/QwenPaw/pull/7748) partial. |
| **High** | [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) — `spawn subAgent` always times out on Win v2.2.0. | Blocks all multi-agent workflows. | No targeted PR. |
| **High** | [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) — Scheduled tasks silently lose output. | Core scheduled-task value-prop broken. | No targeted PR. |
| **High** | [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) / [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) — Configured LLM and conversations vanish mid-session on Win v2.2.1. | Data-loss-adjacent; multiple users. | No targeted PR. |
| **High** | [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) — **MCP cannot connect since upgrade to 2.2.x** (worked in 2.1.1b3). | Major capability regression. | [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735) addresses HTTP error framing; root cause still under investigation. |
| **High** | [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728) — `server/discover` HTTP 500 from Java MCP SDK servers treated as protocol error, Driver build fails. | Ecosystem compatibility regression. | No merged PR; related work in MCP area. |
| **Medium** | [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) — Daily Paper silent failure on unreachable arxiv. | Plugin mis-reports success. | [#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723), [#7756](https://github.com/agentscope-ai/QwenPaw/pull/7756). |
| **Medium** | [#7745](https://github.com/agentscope-ai/QwenPaw/issues/7745) — Agent switch deletes `lastChatIdByAgent`, history becomes unclickable on 2.2.1-beta.2. | Regression in console session bookkeeping. | No PR. |
| **Medium** | [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726) — ACP `trusted: true` falls back to interactive prompts (`_pick_allow_option` only matches `allow_*`). | Trusted-mode promise broken. | [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) open. |
| **Medium** | [#7705](https://github.com/agentscope-ai/QwenPaw/issues/7705) — Agent working directory ignores user-set default; reverts to old path on restart. | Persistence bug. | No PR. |
| **Low/Closed** | [#4354](https://github.com/agentscope-ai/QwenPaw/issues/4354), [#4220](https://github.com/agentscope-ai/QwenPaw/issues/4220), [#4710](https://github.com/agentscope-ai/QwenPaw/issues/4710), [#5122](https://github.com/agentscope-ai/QwenPaw/issues/5122), [#7199](https://github.com/agentscope-ai/QwenPaw/issues/7199) — all closed today. | Resolved. | — |

## 6. Feature Requests & Roadmap Signals

- **Right-side history sidebar** ([#7739](https://github.com/agentscope-ai/QwenPaw/issues/7739)) — Strong likelihood for next minor release; trivial UI change with measurable UX gain on small screens.
- **Skills × custom channels** scoping ([#7746](https://github.com/agentscope-ai/QwenPaw/issues/7746)) — Allow custom-channel skills; naturally aligns with the Skills/Channels components already labeled. Plausible for a v2.3.
- **Honest failure reporting for scheduled jobs & plugins** ([#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715)) — Should be considered a stability fix; expect it alongside the memory-error work already in PR.
- **Memory archive policy / conflict detection** ([#3995](https://github.com/agentscope-ai/QwenPaw/issues/3995), closed) — Recent closures around memory timestamps, vector-index sync, and digest design suggest these are landing incrementally.
- **ReMe4 roadmap (Auto-Link, tri-modal search, 4-category digest)** ([#6840](https://github.com/agentscope-ai/QwenPaw/issues/6840)) — Closed question; user awaiting roadmap timeline.
- **`make

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-14

## 1. Today's Overview

ZeroClaw is in an active post-v0.8.5 stabilization cycle with a strong governance and quality theme. The last 24 hours show 25 issue updates (5 closed, 20 open) and 50 PR updates (only 1 closed), indicating that the bulk of in-flight work is review/decision rather than landing. No new releases were shipped. A recurring focus on **config-write validation gaps**, **RFC process reform**, and **release-efficiency follow-ups** dominates activity, while several P1/S1 bugs (MCP recovery poisoning, OpenCode session headers, OpenAI device-code 404) remain open and warrant maintainer attention.

## 2. Releases

No new releases were published in the last 24 hours. The v0.8.5 stabilization line tracked in [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) continues to anchor work, and a new release-efficiency tracker [#10814](https://github.com/zeroclaw-labs/zeroclaw/issues/10814) was opened to reduce repeated builds and shorten recovery for the next cut.

## 3. Project Progress

Five issues were closed, indicating concrete resolution of previously reported defects:

- [#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721) — Fixed: `knowledge.db_path` tilde expansion no longer performs a global replace; the knowledge tool was silently dropping paths before.
- [#10324](https://github.com/zeroclaw-labs/zeroclaw/issues/10324) — Fixed: cron manual trigger and run-history reads no longer leave a check-then-act race across an agent rename (filed at S2 deliberately).
- [#10580](https://github.com/zeroclaw-labs/zeroclaw/issues/10580) — Fixed: docs CI link gate now scans repo-wide internal links, not only added lines, so pre-existing dangling links no longer rot silently.
- [#10533](https://github.com/zeroclaw-labs/zeroclaw/issues/10533) — Fixed: `model_routing_config` tool now accepts `custom.*` and other valid provider slots, aligning tool validation with the config schema.
- [#10837](https://github.com/zeroclaw-labs/zeroclaw/issues/10837) — Fixed: RPC `config/set` no longer persists values that `Config::validate()` rejects; parity with gateway PATCH and CLI restored.

One PR closed today: [#10742](https://github.com/zeroclaw-labs/zeroclaw/pull/10742) (rust-all dependency bump superseded by [#10852](https://github.com/zeroclaw-labs/zeroclaw/pull/10852)). Several large architecture PRs continue to advance in review but have not yet landed.

## 4. Community Hot Topics

The most actively discussed threads are governance/RFC reform rather than runtime bugs — a strong signal that the project is investing in process as well as code:

- [#8692 — Maintainer decision queue for RFCs and design issues (15 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/8692): the highest-traffic tracker; reflects a need for faster, more transparent triage.
- [#10549 — RFC: Simplify RFC voting by removing mandatory discussion windows (10 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/10549): community sentiment that fixed 48h/72h timers add friction without producing more review.
- [#10366 — RFC: Clarify PR review evidence, freshness warnings, and author-action boundaries (8 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/10366): an "expedited merge lane" for clean exact-head advisory review is being shaped.
- [#10360 — RFC: opt-in household edge mesh with pull workers and signed receipts (4 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/10360): users want to compose idle hardware into a secure mesh without new GPUs.

**Underlying need:** the community is asking for a lighter-weight governance loop and clearer authority boundaries — the kind of "plumbing maturity" that signals the project is moving from a feature phase into a sustained-maintenance phase.

## 5. Bugs & Stability

Open P1 bugs (highest severity, ranked by workflow impact):

1. **S1 — Workflow blocked** [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) — `x-opencode-session` header is never sent, breaking Go models and risking account flags (👍 3). No linked fix PR yet.
2. **S1 — Workflow blocked** [#10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) — MCP HTTP/SSE connection is permanently poisoned after a single failed recovery; operators must restart to recover.
3. **S1-style regression** [#10320](https://github.com/zeroclaw-labs/zeroclaw/issues/10320) — `config set` and RPC `config/set` persist out-of-range values with exit 0; a partial fix landed for the RPC path ([#10837](https://github.com/zeroclaw-labs/zeroclaw/issues/10837)), and a broader fix is staged in PR [#10499](https://github.com/zeroclaw-labs/zeroclaw/pull/10499).
4. **P1** [#10828](https://github.com/zeroclaw-labs/zeroclaw/issues/10828) — `openai-codex --device-code` hits an obsolete endpoint and returns 404.
5. **P1** [#10533 (closed)](https://github.com/zeroclaw-labs/zeroclaw/issues/10533) — routing tool rejected valid providers; resolved today.

Notable S2 stability items:
- [#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) — `[media attachment]` placeholder leaks to users under non-vision models.
- [#10842](https://github.com/zeroclaw-labs/zeroclaw/issues/10842) — Telegram `reaction` tool silently no-ops via default trait.
- [#10821](https://github.com/zeroclaw-labs/zeroclaw/issues/10821) — `zeroclaw service logs` displays stale stderr because service-installed daemon emits no tracing without `--verbose`.
- [#10585](https://github.com/zeroclaw-labs/zeroclaw/issues/10585) — log-sink race against migration tests in default parallel runner.

**Stability signal:** the validation/persistence class of bug recurs across CLI, RPC, and gateway surfaces — a structural rather than one-off issue, addressed centrally by the in-flight [PR #10499](https://github.com/zeroclaw-labs/zeroclaw/pull/10499) and follow-up enhancement [#10822](https://github.com/zeroclaw-labs/zeroclaw/issues/10822) for atomic `config/set-many`.

## 6. Feature Requests & Roadmap Signals

Open enhancement issues (most likely to land soonest, based on PR coupling):

- **High probability, next minor:** [#10822](https://github.com/zeroclaw-labs/zeroclaw/issues/10822) — `config/set-many` atomic batch config mutation (already in-progress, paired with [#10499](https://github.com/zeroclaw-labs/zeroclaw/pull/10499)).
- **High probability:** [#10826](https://github.com/zeroclaw-labs/zeroclaw/issues/10826) — explicit ZeroCode session-root selection; follows up on [#10609](https://github.com/zeroclaw-labs/zeroclaw/issues/10609)/[#10565](https://github.com/zeroclaw-labs/zeroclaw/pull/10565).
- **Likely after RFC acceptance:** opt-in household edge mesh [#10360](https://github.com/zeroclaw-labs/zeroclaw/issues/10360); expedited merge lane from #10366 implementation PR [#10677](https://github.com/zeroclaw-labs/zeroclaw/pull/10677) is docs-only and ready to merge.
- **Operational/quality:** [#10814](https://github.com/zeroclaw-labs/zeroclaw/issues/10814) — release efficiency and repeatable publication tracker.
- **Long-tail:** [#10812](https://github.com/zeroclaw-labs/zeroclaw/issues/10812) — populate `DocumentMessage.jpegThumbnail` so WhatsApp PDFs preview on phones.

Large PRs that, if accepted, materially expand ZeroClaw's surface area:
- [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621) — shared live-config authority across daemon RPC, gateway, channels, ACP, CLI (XL).
- [#10623](https://github.com/zeroclaw-labs/zeroclaw/pull/10623) — Anthropic prompt-cache passthrough for OpenAI-compatible providers (XL).
- [#10636](https://github.com/zeroclaw-labs/zeroclaw/pull/10636) — ZeroCode effort and display session controls (XL).
- [#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324) — A2A outbound client phase 1 (XL).
- [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) — context compaction anchored to model window ratio (XL).
- [#10637](https://github.com/zeroclaw-labs/zeroclaw/pull/10637) — gateway WS memory consolidation on the agent's own provider (M).

## 7. User Feedback Summary

Pain points echoed across today's items:

- **Validation gaps erode trust.** Operators persistently find that `config set` (CLI and RPC) silently accepts invalid values, forcing manual cleanup. The community is pushing toward an atomic batched RPC and full validate-on-write semantics.
- **Channel integrations are uneven.** Telegram's `reaction` tool, WhatsApp PDF previews, and OpenAI device-code login all surfaced correctness or UX defects within a 24-hour window — the channel layer looks thinner than the core.
- **Observability is hard when running as a service.** Service-installed daemons emit nothing to stderr by default, making `zeroclaw service logs` misleading.
- **MCP resilience is a single point of failure.** One transient outage permanently poisons an MCP connection; operators must restart. This is the highest-impact operator pain point among open issues.
- **Process friction on the contributor side.** Contributors actively want shorter mandatory discussion windows and an expedited merge lane for clean advisory reviews — a sign that the RFC/PR funnel is the next bottleneck to relieve.

## 8. Backlog Watch

Items at risk of stalling that deserve maintainer attention:

- [#10640 — feat(channels): passive Telegram group context (blocked, do-not-merge)](https://github.com/zeroclaw-labs/zeroclaw/pull/10640): status:blocked since 2026-09-05; needs a clear unblocking decision.
- [#10613 — feat(vi): align constraint tags, cnf.jwk.kid, L3 header with spec (blocked, do-not-merge)](https://github.com/zeroclaw-labs/zeroclaw/pull/10613): high-risk spec-alignment PR waiting on dependencies.
- [#9772 — feat(telegram): per_user_session toggle (blocked, do-not-merge)](https://github.com/zeroclaw-labs/zeroclaw/pull/9772): long-standing XL, blocked since 2026-08-05.
- [#9535 — feat(runtime): context compaction anchored to model window ratio (needs-author-action)](https://github.com/zeroclaw-labs/zeroclaw/pull/9535): XL, open since 2026-07-29, recurring "needs-author-action" tag suggests reply latency.
- [#9324 — feat(a2a): outbound client config phase 1 (needs-author-action)](https://github.com/zeroclaw-labs/zeroclaw/pull/9324): XL, open since 2026-07-24.
- [#10603 — OpenCode `x-opencode-session` missing header (P1, 👍 3)](https://github.com/zeroclaw-labs/zeroclaw/issues/10603): highest-reaction open bug, no linked fix PR yet — account-flag risk makes this time-sensitive.
- [#10807 — MCP connection permanently poisoned (S1)](https://github.com/zeroclaw-labs/zeroclaw/issues/10807): open since 2026-09-12, no fix PR visible.
- [#8692 — Maintainer decision queue tracker (15 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/8692): by comment volume this is the project's primary coordination backlog and should be triaged actively.

**Overall project health:** the merge of [#10837](https://github.com/zeroclaw-labs/zeroclaw/issues/10837) plus the staged PR [#10499](https://github.com/zeroclaw-labs/zeroclaw/pull/10499) signal a focused push to harden config-write correctness; governance reform is converging via #10549 and #10366. The main risks are (a) the open S1 items [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) and [#10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) without visible fix PRs, and (b) a growing set of `blocked` / `needs-author-action` XL PRs that, if not unblocked, will slow the post-v0.8.5 release cadence.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*