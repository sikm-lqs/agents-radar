# OpenClaw Ecosystem Digest 2026-09-15

> Issues: 434 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-15 11:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-15

## 1. Today's Overview

OpenClaw shows **very high triage/closure velocity but zero shipping output**: 934 items updated in the last 24h (434 issues + 500 PRs), with 397 net closures (175 issues + 222 PRs) versus 537 newly active items. Despite that churn, no new release has been cut — the project remains on the **2026.9.3 → 2026.9.4** release line, with a publicly tracked coordination issue ([#145252](https://github.com/openclaw/openclaw/issues/145252)) covering update/upgrade/Doctor/migration/rollback/restart reliability for that line. The dominant theme across both issues and PRs is **Gateway runtime stability** (memory leaks, event-loop blocking, zombie processes, MCP stdio cleanup, SQLite WAL growth), with several P0 release-blockers still open. Community health is mixed: many 5.x-era regressions have finally been closed, but a handful of long-standing P1 "diamond lobster" issues remain unresolved and continue to attract heavy discussion.

## 2. Releases

**No new releases in the last 24h.** The current shipping line is **2026.9.3 → 2026.9.4**. Users are reporting multiple update failures on this line:

- [#148614](https://github.com/openclaw/openclaw/issues/148614) — `runtime-verification-failed` on 2026.9.3 update (darwin/arm64) — **CLOSED**.
- [#146637](https://github.com/openclaw/openclaw/issues/146637) — 2026.9.3 → 2026.9.4 npm global install swap fails on Linux Mint (P0).
- [#146860](https://github.com/openclaw/openclaw/openclaw/issues/146860) — Windows Scheduled Task (`LogonType: InteractiveToken`) managed update handoff stalls (P0).
- [#145252](https://github.com/openclaw/openclaw/issues/145252) — Maintainer tracking issue for 2026.9.3/9.4 reliability.

**Migration note:** Several previously open P0 multi-agent/Codex migration crash-loops ([#123326](https://github.com/openclaw/openclaw/issues/123326)) closed today, indicating partial mitigation has shipped without an explicit version bump.

## 3. Project Progress

Today's merged/closed activity is heavily dominated by **steipete** (maintainer) landing a cluster of small, surgical fixes (mostly XS/S size) against the 9.x line. Notable landed work:

**Stability & runtime fixes**
- [#149036](https://github.com/openclaw/openclaw/pull/149036) — preserve the selected parent model in subagent spawns (fixes silent model reversion).
- [#149038](https://github.com/openclaw/openclaw/pull/149038) — restore Copilot credential-only login choices.
- [#149026](https://github.com/openclaw/openclaw/pull/149026) — preserve dotted keys (`acme.weather`) in API-key setup hints; closes [#148994](https://github.com/openclaw/openclaw/issues/148994).
- [#148993](https://github.com/openclaw/openclaw/pull/148993) — avoid redundant session reads when persisting turns.
- [#148984](https://github.com/openclaw/openclaw/pull/148984) — show where slow Codex catalog control calls spend time; closes [#148983](https://github.com/openclaw/openclaw/issues/148983).
- [#148623](https://github.com/openclaw/openclaw/pull/148623) — move project-registry removal to the state worker (deblocks Gateway event loop).
- [#148919](https://github.com/openclaw/openclaw/pull/148919) — avoid repeated Git scans during worktree cleanup.
- [#148773](https://github.com/openclaw/openclaw/pull/148773) — reuse compiled transcript metadata queries.
- [#148948](https://github.com/openclaw/openclaw/pull/148948) — queue board and progress-card writes behind native agent writer reservation.
- [#121022](https://github.com/openclaw/openclaw/pull/121022) — finish `config.patch` / `config.apply` RPC responses before restart emission; closes [#120408](https://github.com/openclaw/openclaw/issues/120408).
- [#149005](https://github.com/openclaw/openclaw/pull/149005) — wait for owned stdio cleanup without premature timeout (MCP/LSP shutdown); fixes [#148998](https://github.com/openclaw/openclaw/issues/148998).
- [#146645](https://github.com/openclaw/openclaw/pull/146645) — preserve `${VAR}` env keys during systemd startup (P0 fix for `OPENCLAW_SERVICE_MANAGED_CONFIG` change-detection).
- [#148834](https://github.com/openclaw/openclaw/pull/148834) — keep legacy catalog repair in Doctor.
- [#148248](https://github.com/openclaw/openclaw/pull/148248) — Side chat no longer times out searching session history.

**Test & diagnostics**
- [#149035](https://github.com/openclaw/openclaw/pull/149035) — distinguish model readiness from account health in Web UI regression checks.
- [#149039](https://github.com/openclaw/openclaw/pull/149039) — align model fixtures with runtime auth reads.
- [#149031](https://github.com/openclaw/openclaw/pull/149031) — cover reclamation and child-abort persistence.
- [#149008](https://github.com/openclaw/openclaw/pull/149008) — speed up legacy updater compatibility tests.
- [#149032](https://github.com/openclaw/openclaw/pull/149032) — remove duplicate Copilot registry keys (test fixture repair).
- [#148982](https://github.com/openclaw/openclaw/pull/148982) — repair account connection regression checks (superseded by [#149023](https://github.com/openclaw/openclaw/pull/149023)).

**UX & docs**
- [#147588](https://github.com/openclaw/openclaw/pull/147588) — use plain language for update checks ("Checking update health", "Checking Gateway startup").
- [#147557](https://github.com/openclaw/openclaw/pull/147557) — prohibit detached host update repairs in agent guidance.
- [#137828](https://github.com/openclaw/openclaw/pull/137828) — preserve acknowledged worker cleanup failures without replay (P1; still open, waiting on maintainer review).

## 4. Community Hot Topics

The most-discussed issues (40, 30, 25, 20 comments) all share a single underlying pattern: **the Gateway event loop is being blocked by synchronous, terminal-coupled work**, and users cannot get reliable delivery or runtime metrics when it happens.

- **[#25592 (40 comments, P1 🦞)](https://github.com/openclaw/openclaw/issues/25592)** — Text between tool calls leaks to messaging channels. Long-running UX complaint from `doomclaw`, tagged diamond lobster because it implicates session-state and security boundaries (internal narration routed as user-visible channel output).
- **[#97616 (30 comments, P1 🦪)](https://github.com/openclaw/openclaw/issues/97616)** — Unreaped hook/tool child processes accumulate as zombies, degrading runtime over time. Direct child of the event-loop-blocking theme.
- **[#91588 (25 comments, P1 🦪)](https://github.com/openclaw/openclaw/issues/91588)** — Gateway RSS grows 350MB → 15.5GB over days; OOM-killed and `launchd-handoff` restart cycles. Tagged stale/needs-info; no fix PR linked.
- **[#119720 (20 comments, P1 🦞)](https://github.com/openclaw/openclaw/issues/119720)** — Synchronous agent persistence / transcript maintenance block the Gateway event loop at scale. Acknowledges partial fixes via [#140231](https://github.com/openclaw/openclaw/issues/140231) and [#138984](https://github.com/openclaw/openclaw/issues/138984), but the rewrite is still under-maintainer-review.
- **[#102175 (19 comments, P2 🐚)](https://github.com/openclaw/openclaw/issues/102175)** — Embedded prompt cache invalidates across room-event, policy, and Responses boundaries, changing tool inventory between turns. Underlying need: stable provider cache reuse for long-lived embedded sessions.
- **[#144911 (16 comments, P1 🦞)](https://github.com/openclaw/openclaw/issues/144911)** — MCP server `initialize` timeout triggers unhandled rejection "service child cleanup identity lost", crashing the Gateway.
- **[#80520 (13 comments, CLOSED P1 🦐)](https://github.com/openclaw/openclaw/issues/80520)** — Telegram messages silently dropped (no `sendMessage` logged). Closed today; reflects the Telegram-adapter delivery fragility seen in [#125764](https://github.com/openclaw/openclaw/issues/125764).

On the PR side, the maintainer-driven XS/S cluster from **steipete** dominates the "ready for maintainer look" queue, signaling that the project is in **fix-and-prune** mode rather than feature mode.

## 5. Bugs & Stability

### Critical (P0, release-blocker)
| Issue | Status | Component | Fix PR |
|---|---|---|---|
| [#146860](https://github.com/openclaw/openclaw/issues/146860) | Open | Windows Scheduled Task update handoff | None linked |
| [#146637](https://github.com/openclaw/openclaw/issues/146637) | Open | npm global install swap 9.3→9.4 | None linked |
| [#145252](https://github.com/openclaw/openclaw/issues/145252) | Open (tracking) | 9.3/9.4 update reliability index | n/a |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | Open | Agent SQLite WAL grows 1.4–2.8 GB | None linked |
| [#148614](https://github.com/openclaw/openclaw/issues/148614) | **CLOSED** | `runtime-verification-failed` on 9.3 update | — |
| [#123326](https://github.com/openclaw/openclaw/issues/123326) | **CLOSED** | Multi-agent Codex migration startup crash-loop | — |

### High (P1) — open, no clear fix PR
- [#25592](https://github.com/openclaw/openclaw/issues/25592) Tool-call interstitial text leak (40 comments).
- [#97616](https://github.com/openclaw/openclaw/issues/97616) Zombie child processes.
- [#91588](https://github.com/openclaw/openclaw/issues/91588) Gateway RSS OOM leak (stale, needs info).
- [#119720](https://github.com/openclaw/openclaw/issues/119720) Sync persistence blocks event loop (partial fixes landed).
- [#144911](https://github.com/openclaw/openclaw/issues/144911) MCP stdio init timeout crash.
- [#139847](https://github.com/openclaw/openclaw/issues/139847) Active-run message dropped — "no active tool authority snapshot" (2026.9.2 regression).
- [#137332](https://github.com/openclaw/openclaw/issues/137332) Mixed terminal requester-settle batches retry forever.
- [#125764](https://github.com/openclaw/openclaw/issues/125764) Telegram adapter single-attempt dead-letter.
- [#125570](https://github.com/openclaw/openclaw/issues/125570) Skill Workshop update silently breaks skill routing.
- [#144809](https://github.com/openclaw/openclaw/issues/144809) claude-cli turns >`RUN_STALE_TAKEOVER_MS` lose entire reply.
- [#148755](https://github.com/openclaw/openclaw/issues/148755) 90s transient-retry window consumed by the retried attempt itself.
- [#148614](https://github.com/openclaw/openclaw/issues/148614) — see above (closed).

### High (P1) — closed today with fixes
- [#148584](https://github.com/openclaw/openclaw/issues/148584) Plugin-owned CLI backends skipped at startup — closed.
- [#148680](https://github.com/openclaw/openclaw/issues/148680) Control UI TTS supplement not merged with source message — closed.
- [#145152](https://github.com/openclaw/openclaw/issues/145152) Stuck-session recovery reports force-clear as abort (2026.7.1) — closed.

### Medium (P2) regressions worth watching
- [#146004](https://github.com/openclaw/openclaw/issues/146004) Subagent completion triggers spurious dashboard heartbeat on 9.3.
- [#118839](https://github.com/openclaw/openclaw/issues/118839) `restart recovery claim changed before agent adoption` regresses on 2026.7.2-beta.7.
- [#146391](https://github.com/openclaw/openclaw/issues/146391) Fresh Groq setup cannot resolve manifest model from an external plugin.
- [#102175](https://github.com/openclaw/openclaw/issues/102175) Embedded prompt cache boundary invalidation.
- [#112313](https://github.com/openclaw/openclaw/issues/112313) Dead-lettered outbound delivery queue entries are permanent (no CLI/RPC/TTL clears them).

## 6. Feature Requests & Roadmap Signals

- **[#143610](https://github.com/openclaw/openclaw/pull/143610)** — Selected-conversation actions on iOS (compose, send-confirmation, reconnects). Size XL, multi-app surface (iOS/macOS/Web-UI/Discord), maintainer `vincentkoc`. Strong signal that iOS-native UX parity is on the roadmap for the 9.x cycle.
- **[#148893](https://github.com/openclaw/openclaw/pull/148893)** — Sandbox file tools aligned with overlapping mounts (Windows + backend-specific paths). Indicates continuing sandbox hardening for `openshell` / `mxc` plugin surface.
- **[#112820](https://github.com/openclaw/openclaw/pull/112820)** — Plugin SDK method `api.runtime.talk.openSession(...)` for Gateway-managed realtime voice (closed). Signals Plugin SDK is the intended integration surface for new voice-capable plugins.
- **[#87584](https://github.com/openclaw/openclaw/issues/87584)** — Make group room-event steering configurable. Currently hard-gated behind `!isRoomEvent`; 2 👍 suggests pent-up demand from multi-user Discord/Slack deployments.
- **[#51572](https://github.com/openclaw/openclaw/issues/51572)** — Fire `session-memory` hook on session reset/prune, not just compaction. Long-standing (Mar 2026) feature request; 1 👍; aligns with the broader session-lifecycle refactor visible in [#119720](https://github.com/openclaw/openclaw/issues/119720).
- **[#60602](https://github.com/openclaw/openclaw/issues/60602)** — Per-agent Bedrock `requestMetadata` for multi-agent cost attribution. **CLOSED today**, suggesting partial or alt-route shipped.

**Prediction for the next version (likely 2026.9.5):** the maintainer's XS/S cluster points to a maintenance/quality

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem

**Date:** 2026-09-15 | **Projects analyzed:** OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The personal AI assistant landscape has converged on a common architecture: a long-running gateway/daemon runtime fronted by messaging channels (Telegram, Discord, Slack, Matrix) and web/TUI consoles, with MCP as the de facto tool-integration layer. Activity is sharply bifurcated — OpenClaw operates at ~10x the daily volume of any peer but is in fix-and-prune stabilization mode, while Hermes Agent just shipped a release, QwenPaw is approaching a Hub-centric release, and ZeroClaw is in a pre-release hardening push. The engineering frontier has clearly shifted from feature breadth to operational reliability of long-lived runtimes: state-store integrity, event-loop responsiveness, child-process lifecycle, and permission boundaries. IronClaw is a categorical outlier — an evaluation harness whose only signal today is automated benchmark telemetry.

---

## 2. Activity Comparison

| Project | Issues (24h: updated / closed) | PRs (24h: updated / closed) | Release status | Health score |
|---|---|---|---|---|
| **OpenClaw** | 434 / 175 (40%) | 500 / 222 (44%) | None; stuck on 2026.9.3→9.4 line with **2 open P0 update blockers** (#146637, #146860) | **B− (Watch)** — highest throughput in the ecosystem, but zero shipping and aging P1 debt |
| **Hermes Agent** | 50 / 28 (56%) | 50 / 23 (46%) | **v0.21.3 shipped 9/14** (~338-PR rollup, tag `v2026.9.14`) | **A−** — proven release cadence, closure ratio keeps pace with inflow |
| **IronClaw** | 1 / 0 (automated) | 0 / 0 | None | **C (Monitor)** — telemetry-only; no human activity this window |
| **QwenPaw** | 25 / 14 (56%) | 50 / 27 (54%) | None; on 2.2.x, Hub multi-tenant 2.2.0 pending | **B+** — strong merge velocity; 3 open P0s incl. a security-sensitive sandbox bypass |
| **ZeroClaw** | 34 / 18 (53%) | 50 / 16 (32%) | None; v0.8.5 stabilization line (tracker #9459) | **B** — well-prioritized pre-release push; S1 multimodal cluster unresolved |

*Health score = f(throughput, release discipline, blocker load). ZeroClaw's low PR-closure ratio reflects long-lived feature branches queued for v0.8.5, not stalled review.*

---

## 3. OpenClaw's Position

**Community scale — an order of magnitude ahead.** ~934 items updated daily vs 50–84 for peers; deepest discussion threads (40/30/25/20 comments vs max 14 at Hermes); tracker ID depth of ~149K vs ~111K (Hermes), ~11K (ZeroClaw), ~8K (IronClaw/QwenPaw) — an imperfect proxy, but directionally unambiguous.

**Advantages vs peers:**
- **Broadest deployment surface:** npm/systemd/launchd/Windows Scheduled Task install paths; Telegram, Discord, Slack adapters; iOS/macOS/Web UI; a Plugin SDK with a voice-capable `openSession` API.
- **Strongest maintainer throughput:** steipete's surgical XS/S cluster (subagent model preservation #149036, MCP stdio cleanup #149005, systemd env handling #146645) — 397 net closures in 24h.
- **Enterprise signals** peers lack: per-agent Bedrock cost attribution, sandbox overlapping-mount hardening, iOS-native parity PR (#143610, XL).

**Vulnerabilities vs peers:**
- **The only major project not shipping.** Hermes cut a stable 338-PR tag; OpenClaw has open P0 update blockers and is landing fixes *without a version bump* — a release-hygiene and supportability risk.
- **Systemic runtime debt:** event-loop blocking from sync persistence (#119720), RSS growth 350MB→15.5GB (#91588), zombie children (#97616), WAL growth to 1.4–2.8GB (#143524) — a defect class tied to its Node-style single event-loop gateway, contrasting with ZeroClaw's Rust supervision model.
- **Long-tail P1 "diamond lobster" issues** (e.g., #25592, 40 comments) attracting heavy discussion without fixes.

**Technical approach:** channel-adapter-first gateway + plugin SDK (OpenClaw) vs profile-multiplexed gateway with commercial model routing (Hermes) vs Python web-console + MCP (QwenPaw) vs Rust daemon with WIT-ABI-verified plugins (ZeroClaw).

---

## 4. Shared Technical Focus Areas

| Focus area | Projects | Specific needs (evidence) |
|---|---|---|
| **SQLite / state-store integrity under multi-writer** | OpenClaw, Hermes | WAL growth #143524, sync persistence #119720; Hermes #100896 state.db corruption ×4 in 5 weeks — both need single-writer semantics |
| **Event-loop blocking by sync I/O** | OpenClaw, QwenPaw | OpenClaw #119720/#148623; QwenPaw #7786 — NFS file browser freezes entire WebUI 5–6 min |
| **MCP transport correctness** | OpenClaw, QwenPaw, Hermes | stdio init crash #144911; gzip 4xx double-decompression #7735/#7787; server-name mismatch #111707 |
| **Telegram as production control plane** | OpenClaw, Hermes, ZeroClaw | Silent drops/dead-letter (#80520, #125764); CLOSE-WAIT sockets reported "connected" (#111727); unbounded voice retries (#10863), group-session scoping (#9772) |
| **Cancellation / stop semantics** | QwenPaw, OpenClaw, Hermes | Stop button no-op → 409 (#7567); stale-takeover reply loss (#144809); lifecycle guard gaps (#110422) |
| **Sandbox & permission hardening** | all 4 active | Sandbox bypass via kimi-code `Write` schema (#7727 — QwenPaw); CLI bypass of config write-protection (#59293 — Hermes); WIT ABI plugin verification (#10746), cross-agent memory ACLs (#10252), pairing entropy (#6613 — ZeroClaw) |
| **Prompt-cache / context efficiency** | OpenClaw, Hermes, ZeroClaw | Cache invalidation across boundaries (#102175); byte-stable cache markers (#111774); model-window-anchored compaction (#9535) |
| **Update / supervisor reliability** | OpenClaw, Hermes, ZeroClaw | The entire OpenClaw 9.3→9.4 P0 set; `fleet_restart_pending` (#111272); Windows daemon reload recovery (#10792) |
| **Rapid model onboarding (DeepSeek V4 Flash)** | QwenPaw, IronClaw | Capability catalog addition (#7736) same week IronClaw attributes 43 benchmark failures primarily to that model (#8100) |

---

## 5. Differentiation Analysis

| Dimension | OpenClaw | Hermes Agent | QwenPaw | ZeroClaw | IronClaw |
|---|---|---|---|---|---|
| **Feature focus** | Channel-first personal assistant, plugin SDK, iOS parity | Gateway/profile multiplexing, Nous model routing & Portal billing | Web console UX, Hub multi-tenant, MCP client/server | Security hardening, ZeroCode TUI, A2A interop, memory grants | Benchmark failure taxonomy |
| **Target user** | Power users/self-hosters, cross-OS, multi-channel | Self-hosters (Docker/NixOS/systemd), Nous ecosystem | Teams moving to multi-tenant (Hub 2.2.0), console-centric users | Security-conscious operators, desktop/Rust | Model & agent researchers |
| **Architecture** | Node-style event-loop gateway, SQLite WAL, plugin SDK | Multiplexed gateway, `profiles/`, state.db | Python stack (httpx), web console + daemon | Rust daemon, supervisor, WIT/WASM plugin ABI, bounded logging | Automated CI-style eval pipelines |

The sharpest architectural divergence is runtime substrate: OpenClaw's event-loop bottleneck vs ZeroClaw's Rust supervision model. The sharpest product divergence is audience trajectory: personal (OpenClaw, Hermes) → team (QwenPaw) → security/interop (ZeroClaw) → research (IronClaw).

---

## 6. Community Momentum & Maturity

- **Tier 1 — massive scale, stabilizing:** **OpenClaw.** Largest community and triage machine, but today's pattern is *closure velocity without shipping*. Key watch item: whether 2026.9.5 lands with P0 blockers cleared.
- **Tier 2 — rapid iteration, shipping:** **Hermes Agent** (best release discipline; risk concentrated in unresolved `needs-decision` security item #59293, open since July) and **QwenPaw** (merges exceed opens; Hub 2.2.0 is the catalyst; needs a hotfix for stop-button/NFS P0s).
- **Tier 2–3 — rapid iteration, pre-release:** **ZeroClaw.** PR-skewed pipeline (34 open) ahead of v0.8.5; unusually mature process signals for its size (RFC simplification, automated risk labels, supply-chain hygiene).
- **Dormant/automated:** **IronClaw.** One bot-generated telemetry issue; monitor 48–72h before drawing conclusions on maintainer bandwidth.

---

## 7. Trend Signals

1. **Runtime operability is the moat, not features.** Memory leaks, zombie processes, state-store corruption, and event-loop blocking dominate all four active projects. Agent gateways are daemons and now demand daemon-grade engineering.
2. **Telegram is production-critical infrastructure.** Three projects show delivery-silent-failure or false-health bugs; users need socket-truth health checks, delivery receipts, and bounded retries.
3. **MCP is table stakes; hardening has moved to edge cases** — stdio shutdown, gzip-decoding errors, server naming, health-status persistence.
4. **Agentic permissions are the security frontier:** sandbox guards must understand *every* runner's tool-call schema (QwenPaw's bypass), protection layers must not have CLI-shaped holes (Hermes), and plugin/memory access needs ABI verification and ACLs (ZeroClaw).
5. **Personal → team pivot:** multi-tenant Hub, Telegram group sessions, room-event steering — the assistant category is becoming collaborative.
6. **Model churn is absorbed in days** (DeepSeek V4 Flash), and IronClaw's taxonomy indicates task failures are predominantly *model-quality*, not framework — model selection rivals framework quality for end-to-end success.
7. **Silent-failure intolerance:** the highest-engagement bugs are *visible* reliability (streaming truncation, dropped files), and projects are converging on explicit "what to do" error messaging.
8. **Efficiency economics:** prompt-cache stability, window-anchored compaction, and per-agent cost attribution appear independently across three projects.

**Implications for agent developers:** budget for single-writer state, async I/O off the hot loop, child reaping, and bounded retries from day one; treat cancellation and channel delivery as first-class features; validate sandbox guards against third-party runner schemas; maintain cache-stable context tiers; and surface errors loudly rather than falling back silently.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-15

## 1. Today's Overview

Hermes Agent is in a high-velocity release window. **v0.21.3 (tag `v2026.9.14`)** shipped on 2026-09-14, rolling up roughly **338 merged PRs** since v0.21.2 into a stable tagged build for Docker/Cloud/hosted deployments, with the headline change being remote-gateway sign-in fixes. Last-24h activity is substantial: **50 issues** and **50 PRs** updated, with **28 issues closed** and **23 PRs merged/closed** — a closure ratio of ~46% on issues and ~46% on PRs, indicating the team is keeping pace with incoming load. The dominant themes are (a) state-store reliability (SQLite WAL corruption, session leases, message-delivery regressions), (b) gateway operability across multiplexed profiles and external supervisors (systemd, launchd, NixOS), and (c) cross-platform parity (Telegram, Slack, Discord, MCP/Desktop). A handful of long-standing items from June/July (#59293 security, #39797 SOUL.md, #65604 write_file) were touched again but not yet resolved, signalling they need explicit maintainer decisions.

## 2. Releases

### v2026.9.14 — Hermes Agent v0.21.3 (2026-09-14)

- **Type:** Patch.
- **Scope:** Tagged rollup of ~338 PRs merged since v0.21.2. Not a feature release; it exists to give Docker images, Hermes Cloud, and hosted downstream consumers a stable, reproducible build.
- **Headline change:** Remote-gateway sign-in fixes (referenced in the changelog).
- **Breaking changes:** None declared.
- **Migration notes:**
  - Standard `hermes update` flow restarts the gateway on the new code; if the post-update restart pathway leaves a `fleet_restart_pending` marker behind, see [Issue #111272](https://github.com/NousResearch/hermes-agent/issues/111272) (fixed in this window).
  - No action required for users who were already on a recent `main`; this tag is essentially `main @ 2026-09-14` with sign-in hardening.

## 3. Project Progress

Merged/closed in the last 24h (selected highlights, all PRs from the current cycle unless noted):

| PR | Title | Issue fixed |
|---|---|---|
| [#111351](https://github.com/NousResearch/hermes-agent/pull/111351) | Archiving a Bot Chat no longer locks its title | [#110871](https://github.com/NousResearch/hermes-agent/issues/110871) |
| [#111348](https://github.com/NousResearch/hermes-agent/pull/111348) | Leaked `<\|eos\|>` sentinel no longer hides MEDIA attachments | [#111046](https://github.com/NousResearch/hermes-agent/issues/111046) |
| [#111844](https://github.com/NousResearch/hermes-agent/pull/111844) | Cron "script not found" explains per-profile lookup; refuses bad jobs at creation | [#94821](https://github.com/NousResearch/hermes-agent/issues/94821), salvage of [#105775](https://github.com/NousResearch/hermes-agent/pull/105775) |
| [#111840](https://github.com/NousResearch/hermes-agent/pull/111840) | Nous routing overrides fail closed without a profile scope | Follow-up to [#111809](https://github.com/NousResearch/hermes-agent/issues/111809) (two P1s from review) |
| [#111831](https://github.com/NousResearch/hermes-agent/pull/111831) | Telegram: CJK can opt in to native rich messages | Salvage of [#56155](https://github.com/NousResearch/hermes-agent/pull/56155); also closes the older [#62448](https://github.com/NousResearch/hermes-agent/pull/62448) and [#85197](https://github.com/NousResearch/hermes-agent/pull/85197) lines |
| [#110281](https://github.com/NousResearch/hermes-agent/pull/110281) | Bot Screen ignores stale `display.status` replies | [#110037](https://github.com/NousResearch/hermes-agent/issues/110037) |
| [#109297](https://github.com/NousResearch/hermes-agent/pull/109297) | Kanban replays completions when sessions reconnect | (session-state sweep) |
| [#111837](https://github.com/NousResearch/hermes-agent/pull/111837) | Desktop MCP health snooze honored after restart | Companion to [#111830](https://github.com/NousResearch/hermes-agent/issues/111830) |
| [#105775](https://github.com/NousResearch/hermes-agent/pull/105775) | Validate cron script existence and fix profile-aware path in errors | [#105761](https://github.com/NousResearch/hermes-agent/issues/105761) |
| [#109231](https://github.com/NousResearch/hermes-agent/pull/109231) | Merge startup alias `base_url` into `_explicit_base_url` | [#107191](https://github.com/NousResearch/hermes-agent/issues/107191), [#103933](https://github.com/NousResearch/hermes-agent/issues/103933) |
| [#111838](https://github.com/NousResearch/hermes-agent/pull/111838) | Docs: align delegation docs with code defaults | (doc drift) |

**Features advanced (open):**
- [#111413](https://github.com/NousResearch/hermes-agent/pull/111413) `profile clone --sync-imports` (stacked on [#88855](https://github.com/NousResearch/hermes-agent/issues/88855)).
- [#111834](https://github.com/NousResearch/hermes-agent/pull/111834) `delegate_task` quota-wall ladder descent (`delegation.descent_order`).
- [#111849](https://github.com/NousResearch/hermes-agent/pull/111849) Atomic `hermes kanban ensure-escalation` to dedupe `[ESC]` cards.
- [#111850](https://github.com/NousResearch/hermes-agent/pull/111850) Platform-setup values routed through `.env` instead of `config.yaml`.
- [#111851](https://github.com/NousResearch/hermes-agent/pull/111851) User-facing "what to do" message on reasoning-model give-up (addresses [#61128](https://github.com/NousResearch/hermes-agent/issues/61128)).
- [#111819](https://github.com/NousResearch/hermes-agent/pull/111819) Desktop `titleBar.center` slot to stop kanban switcher overlapping pane tabs.

## 4. Community Hot Topics

**Highest-engagement items in the last 24h (by comments/reactions):**

1. [#100896](https://github.com/NousResearch/hermes-agent/issues/100896) — **state.db corruption ×4 in 5 weeks** (14 comments, P1). Multi-process WAL writers (gateway + dashboard) plus a `"5 live SessionDB handles"` warning 7 minutes before onset. Same defect class as [#90837](https://github.com/NousResearch/hermes-agent/issues/90837), [#100313](https://github.com/NousResearch/hermes-agent/issues/100313), [#89737](https://github.com/NousResearch/hermes-agent/issues/89737). **Underlying need:** reliable single-writer semantics for `state.db` under gateway+dashboard co-tenancy; current `journal_mode=delete` containment is reactive.
2. [#110912](https://github.com/NousResearch/hermes-agent/issues/110912) — **Nous Portal full-price billing despite active subscription credits** (10 comments, P2). A `glm`/`glm-flash`/`kimi` discount-route bug, not credit exhaustion. **Underlying need:** deterministic subscription-credit accounting on model routes that should fall under the Plus plan.
3. [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) — **`hermes config set` bypasses the v0.18.0 system-config write protection** (9 comments, P2, `needs-decision`). The shell-write path is gated; the CLI mutation isn't, so an agent with terminal access can disable the approval layer un-gated. **Underlying need:** the protection layer should not have a CLI-shaped hole.
4. [#100437](https://github.com/NousResearch/hermes-agent/issues/100437) — **v0.21.0 cron agent-jobs ignore model pin; Ollama fallback fails 64K context gate** (9 comments, P1). **Underlying need:** cron must honour the per-job `--provider`/`--model` and local Ollama must accommodate small models without 64K-capable prompt caches.
5. [#103483](https://github.com/NousResearch/hermes-agent/issues/103483) — **Muse Spark turns end mid-task on `finish_reason=stop`** (8 comments, **8 👍**, P2, Responses wire). Stream cuts to a single unrelated word. Highest community reaction of the day. **Underlying need:** stop-reason handling on the Responses wire should not let a stray final token close the turn prematurely.
6. [#109417](https://github.com/NousResearch/hermes-agent/issues/109417) — **Tracking: profile multiplexing as the only gateway mode** (6 comments, P2). A flagship gateway refactor; goal is a single `hermes gateway run` on the default profile serving every profile under `profiles/`.
7. [#111727](https://github.com/NousResearch/hermes-agent/issues/111727) — **Telegram gateway silently goes deaf (sockets in CLOSE-WAIT) while reporting "connected"** (3 comments, P1). **Underlying need:** health-check that reflects actual socket state, not just the unit's `active` flag, on multiplexed profiles.
8. [#96384](https://github.com/NousResearch/hermes-agent/issues/96384) — **Forwarded Slack messages silently lose text AND files** (2 comments, **2 👍**, `needs-repro`). Reporter self-severity P0; a core Slack workflow is broken.

**Patterns:** The hot topics converge on three systemic pain points — **(a) SQLite session-state integrity under multi-writer concurrency**, **(b) cross-platform parity regressions** (Telegram, Slack, Discord, MCP), and **(c) CLI/gateway surface consistency** (config, lifecycle, supervisor interactions). High 👍 counts on streaming/UX bugs (#103483, #96384) indicate users care most about *visible* reliability, not just backend correctness.

## 5. Bugs & Stability

Ranked by reported severity, restricted to items still open or surfaced in this window.

| Sev | Issue | Summary | Fix PR? |
|---|---|---|---|
| **P1** | [#100896](https://github.com/NousResearch/hermes-agent/issues/100896) | `state.db` corruption under multi-writer WAL; recurring on production | **No** — open, needs design |
| **P1** | [#100437](https://github.com/NousResearch/hermes-agent/issues/100437) | Cron agent-jobs ignore model pin; Ollama fallback fails 64K gate | **No** — open |
| **P1** | [#111727](https://github.com/NousResearch/hermes-agent/issues/111727) | Telegram sockets stuck in CLOSE-WAIT; gateway reports healthy and spins ~1 core | **No** — open |
| **P1** | [#110422](https://github.com/NousResearch/hermes-agent/issues/110422) | Lifecycle guard doesn't apply inert-heredoc masking to the referenced-script walk | Closed (fixed in this window) |
| P2 | [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) | `hermes config set` bypasses system-config write protection | **No** — `needs-decision` since July |
| P2 | [#103483](https://github.com/NousResearch/hermes-agent/issues/103483) | Muse Spark streams end on stray final token (Responses wire) | **No** — open, high 👍 |
| P2 | [#110912](https://github.com/NousResearch/hermes-agent/issues/110912) | Nous Portal full-price on `glm/glm-flash/kimi` despite credits | **No** — open |
| P2 | [#111707](https://github.com/NousResearch/hermes-agent/issues/111707) | Kanban Codex App Server fails on `mcp_servers.hermes-mcp` vs `hermes-tools` mismatch | **No** — open |
| P2 | [#100854](https://github.com/NousResearch/hermes-agent/issues/100854) | `opencode-go`: `qwen3.8-flash` HTTP 404 (gateway URL override) | **No** — open |
| P2 | [#111774](https://github.com/NousResearch/hermes-agent/issues/111774) | Static prompt-cache marker misses byte-stable context tier; compaction rewrites it | **No** — open (`type/perf`) |
| P2 (P0 per reporter) | [#96384](https://github.com/NousResearch/hermes-agent/issues/96384) | Slack forwarded messages drop text and files | **No** — `needs-repro

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-15

## 1. Today's Overview

Project activity on 2026-09-15 is at a notably low level. Only one issue was updated in the last 24 hours (#8100), and it remains open with no comments or reactions. No pull requests were updated and no new releases were tagged. This suggests a maintenance/observance day or a period between active development cycles, rather than a halt in progress — IronClaw's last activity indicates the project is still being monitored via automated benchmark analysis pipelines.

## 2. Releases

No new releases were published in the last 24 hours. No version bumps, tags, or release artifacts are reported.

## 3. Project Progress

No pull requests were opened, merged, or closed in the last 24 hours. No code-level progress can be reported for today's window.

## 4. Community Hot Topics

The only active conversation thread in the last 24 hours is:

- **#8100 — Daily ironclaw failure taxonomy — 2026-09-14** ([link](https://github.com/nearai/ironclaw/issues/8100))
  - Author: @pranavraja99 | Status: Open | Comments: 0 | 👍: 0
  - Content: An automated/templated benchmark analysis report covering the `officeqa` suite (43 non-pass tasks), attributing the failures primarily to genuine model-quality errors from the DeepSeek-V4-Flash model on navigate-style tasks.
  - **Underlying need:** The community (and likely maintainers) wants a systematic, daily classification of where IronClaw is failing — distinguishing model-quality issues from tool/agent/prompt/infrastructure failures. This is critical for prioritizing engineering effort.

## 5. Bugs & Stability

No user-reported bugs, crashes, or regressions were filed in the last 24 hours. The single activity item (#8100) is a diagnostic/observability artifact rather than a defect report — it catalogs that 43 officeqa tasks are failing primarily due to DeepSeek-V4-Flash model limitations, not IronClaw framework bugs.

**Severity assessment:** No active defects requiring triage today.

## 6. Feature Requests & Roadmap Signals

No explicit feature requests were submitted today. However, the recurring "Daily ironclaw failure taxonomy" issue (#8100) suggests an **emerging roadmap signal**: the project is investing in automated failure analysis and benchmark observability tooling. Expect continued investment in:
- Per-suite benchmark dashboards (referenced via `nearai.github.io/benchmarks`)
- Failure categorization taxonomies (model-quality vs. agent vs. tool vs. prompt failures)
- Integration of newer model backends (e.g., DeepSeek-V4-Flash) as evaluation targets

## 7. User Feedback Summary

With zero comments and zero reactions across all updated items, there is no direct user feedback signal from the last 24 hours. The lack of engagement on #8100 is consistent with it being a bot-generated or maintainer-automated telemetry report rather than a community discussion thread. No satisfaction or dissatisfaction trends can be inferred from today's data.

## 8. Backlog Watch

With only one open item and zero PRs, the immediate backlog is effectively clear. However, maintainer attention should be directed toward:

- **#8100** ([link](https://github.com/nearai/ironclaw/issues/8100)) — The failure classification linked to the `officeqa` suite showing 43 non-pass tasks attributed to DeepSeek-V4-Flash model-quality issues. While the underlying problem lies with the model rather than IronClaw, the report itself should be triaged to confirm whether any fraction of failures are actually attributable to agent/prompt/tooling bugs that warrant fixing.

---

**Project Health Snapshot:** Low surface activity, no code changes, no releases, but the observability pipeline continues to operate. The single activity item reflects ongoing quality monitoring rather than stalled development. Recommend monitoring the next 48–72 hours for PR activity to confirm whether this is a normal lull or an early signal of reduced maintainer bandwidth.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-15

## 1. Today's Overview

QwenPaw shows **elevated development activity** in the 24h window: 50 PRs touched (27 closed/merged, 23 still open) and 25 issues updated (14 closed, 11 still open). No new release was published, but the merge velocity on PRs is strong (more closed than open), indicating healthy maintainer throughput. The dominant themes are **QwenPaw Hub (multi-tenant 2.2.0) preparation**, **Web console ergonomics on small screens**, **MCP client/server robustness**, and **memory/long-running task correctness**. Overall project health is **stable and active**, with a balanced bug-to-feature PR ratio and clear maintainer responsiveness (multiple long-standing bugs closed today).

## 2. Releases

No new releases in the last 24h. The project remains on **2.2.x** (latest issues reference 2.2.0 / 2.2.1), with the upcoming **QwenPaw Hub multi-tenant edition** teased for **2.2.0** (see [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)).

## 3. Project Progress

**Merged / Closed PRs (today, 27):**

| PR | Title | Area |
|---|---|---|
| [#7737](https://github.com/agentscope-ai/QwenPaw/pull/7737) | Expand multi-agent collaboration trigger keywords | Skills / Agents |
| [#7736](https://github.com/agentscope-ai/QwenPaw/pull/7736) | Add DeepSeek V4 Flash capabilities | Providers |
| [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735) | Preserve decoded HTTP error responses (MCP) | MCP |
| [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) | Diagnose dropped subagent model overrides | Agents |
| [#7759](https://github.com/agentscope-ai/QwenPaw/pull/7759) | Restore visible link focus indicators | Console UI / a11y |
| [#7758](https://github.com/agentscope-ai/QwenPaw/pull/7758) | Align embedding timeout validation | Console UI |
| [#7756](https://github.com/agentscope-ai/QwenPaw/pull/7756) | Distinguish empty error notifications (memory) | Memory |
| [#7787](https://github.com/agentscope-ai/QwenPaw/pull/7787) | Avoid double-decompressing gzip 4xx MCP responses | MCP |
| [#7683](https://github.com/agentscope-ai/QwenPaw/pull/7683) | Audit login attempts and denied runtime creation | Hub / Security |
| [#7750](https://github.com/agentscope-ai/QwenPaw/pull/7750) | Show `send_file_to_user` files in response artifact list | Console UI |
| [#7704](https://github.com/agentscope-ai/QwenPaw/pull/7704) | Move chat files drawer to the right | Console UI |
| [#7682](https://github.com/agentscope-ai/QwenPaw/pull/7682) | Use semantic tokens in `SettingsCenter` | Console UI / Theming |

**Notable advances:**
- **Hub hardening landed** ([#7683](https://github.com/agentscope-ai/QwenPaw/pull/7683)) — audit logging for login attempts and denied runtime creation, closing an important security gap before the 2.2.0 Hub release.
- **MCP transport resilience improved** (two related fixes: [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735), [#7787](https://github.com/agentscope-ai/QwenPaw/pull/7787)) — both address double-decompression of gzip 4xx discover responses, a recurring cause of `httpx.DecodingError`.
- **Provider catalog expanded** ([#7736](https://github.com/agentscope-ai/QwenPaw/pull/7736)) — DeepSeek V4 Flash now advertises image input, 1M context, and reasoning effort metadata.
- **Console UX polish** ([#7750](https://github.com/agentscope-ai/QwenPaw/pull/7750), [#7704](https://github.com/agentscope-ai/QwenPaw/pull/7704), [#7682](https://github.com/agentscope-ai/QwenPaw/pull/7682), [#7759](https://github.com/agentscope-ai/QwenPaw/pull/7759)) — files now surface in the response area (not collapsed steps), drawer moved to right, theme tokens fixed in Settings, link focus restored for accessibility.

## 4. Community Hot Topics

| Rank | Item | Type | Comments / 👍 | Why it matters |
|---|---|---|---|---|
| 1 | [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) — *Hub multi-tenant roadmap discussion* | Discussion | 27 / 4 | Long-running shaping thread for the 2.2.0 Hub release (multi-user access, admin-managed skills). High 👍 count = strong community demand. |
| 2 | [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) — *Stop button doesn't actually stop execution* | Bug | 7 | Safety/UX hazard: users believe a task has stopped but the daemon keeps running. |
| 3 | [#5872](https://github.com/agentscope-ai/QwenPaw/issues/5872) — *Docker `browser_use` fails on dbus* | Bug (closed) | 6 | Multi-month old issue closed today; affects all containerized browser tooling. |
| 4 | [#7739](https://github.com/agentscope-ai/QwenPaw/issues/7739) — *Move history panel to the right* | Feature | 6 | Symptom of broader "small-screen cramping" problem; see also [#7700](https://github.com/agentscope-ai/QwenPaw/issues/7700). |
| 5 | [#3871](https://github.com/agentscope-ai/QwenPaw/issues/3871) — *Agent stuck in "Thinking" after completion* | Bug (closed) | 5 | Five-month-old SSE-closure bug finally closed; resolution retroactively affects a large user base. |
| 6 | [#7772](https://github.com/agentscope-ai/QwenPaw/issues/7772) — *Cannot connect via newapi proxy* | Question | 4 | Compatibility gap with a popular third-party gateway (`new-api v1.0.0-rc.26`). |
| 7 | [#7749](https://github.com/agentscope-ai/QwenPaw/issues/7749) — *Where is model failover configured?* | Question | 4 | Documentation discoverability gap for the 2.2.1 failover feature. |

**Underlying needs:**
- **Team / multi-user workflows** are the #1 aspirational theme (Hub discussion dominates comments and 👍).
- **Small-laptop UX** (13–14") is now a recurring complaint pattern (#7739, #7700, #7778).
- **Tool/MCP ergonomics** — users want explicit invocation similar to the existing `/skill` shortcut.
- **Diagnostics transparency** — failures like dropped subagent overrides (#7680), dagu MCP going inactive (#7764), and the max_iters silent termination (#7775) all reflect demand for *visible* errors, not silent fallbacks.

## 5. Bugs & Stability

Ranked by user-visible severity (P0 → P2). Linked PRs indicate whether a fix is in flight.

| Sev | Issue | Summary | Fix in flight? |
|---|---|---|---|
| **P0** | [#7786](https://github.com/agentscope-ai/QwenPaw/issues/7786) | Opening workspace file browser on Cloud/NFS freezes the whole instance 5–6 min; sync file I/O on the event loop. Blocks the entire WebUI. | No PR yet. |
| **P0** | [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | Stop button visually clears the in-flight marker, but the task keeps executing — user reissues an instruction and hits a 409. | No PR yet. |
| **P0** | [#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727) | Out-of-workspace write guard is blind to kimi-code's `Write` tool — `_paths` extraction doesn't recognize the runner's toolCall fields, so a sandbox bypass succeeded. | No PR yet. Security-sensitive. |
| **P1** | [#7767](https://github.com/agentscope-ai/QwenPaw/issues/7767) | Multiple guardrail-plugin regressions: stale blob on 2nd+ console image attachment, one-shot cron misfire drop, console tail-drop, `on_acting` never fires. | No PR yet. |
| **P1** | [#7689](https://github.com/agentscope-ai/QwenPaw/issues/7689) | PDF `DataBlock`s still serialized as `{"type":"file"}` to OpenAI-compatible `/chat/completions` endpoints (regression — partial fix in [#7621](https://github.com/agentscope-ai/QwenPaw/pull/7621)). | Yes — [#7636](https://github.com/agentscope-ai/QwenPaw/pull/7636) (open, under review). |
| **P1** | [#7775](https://github.com/agentscope-ai/QwenPaw/issues/7775) | ReAct turn exhausting `max_iters` ends silently with no final answer and no "max iterations" warning; forced finalization is preempted. | No PR yet. |
| **P1** | [#7764](https://github.com/agentscope-ai/QwenPaw/issues/7764) — *closed* | MCP client `dagu` stuck inactive due to `httpx.DecodingError: zlib incorrect header check`. | Resolved by [#7787](https://github.com/agentscope-ai/QwenPaw/pull/7787) / [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735). |
| **P2** | [#7771](https://github.com/agentscope-ai/QwenPaw/issues/7771) | Context-management compression / new-chat creates empty placeholder labels like "Compact Chat Session Title". | No PR yet. |
| **P2** | [#7743](https://github.com/agentscope-ai/QwenPaw/issues/7743) — *closed* | Hub-mode file preview returns 401 despite valid query-token login. | Tied to Hub token handling; no PR listed yet, but issue closed. |
| **P2** | [#5872](https://github.com/agentscope-ai/QwenPaw/issues/5872) — *closed* | Docker `browser_use` Chromium exits due to dbus connection failure. | Closed today; resolution path not enumerated in the issue. |
| **P2** | [#3871](https://github.com/agentscope-ai/QwenPaw/issues/3871) — *closed* | Agent stuck in "Thinking" bubble after response completes (SSE not closing). | Closed today after 5 months. |
| **P2** | [#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776) — *PR* | Playwright driver connection, once dead, never self-heals ("die once, dead forever"). | PR open since **2026-08-07** (~5 weeks), still needs maintainer review. |

**Trend:** The two P0 issues with no PR (stop-button, NFS file browser freeze) are the highest-impact reliability gaps and should be triaged for a hotfix or the 2.2.2 patch.

## 6. Feature Requests & Roadmap Signals

| Signal | Items | Likely version |
|---|---|---|
| **Realtime voice chat** | [#7785](https://github.com/agentscope-ai/QwenPaw/pull/7785) (open PR, just opened) | 2.3.0 candidate |
| **Memory plugin: OpenViking** | [#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613) (open, first-time contributor, under review) | 2.2.x or 2.3.0 |
| **Explicit tool invocation (`//` shortcut)** | [#7778](https://github.com/agentscope-ai/QwenPaw/issues/7778), [#7780](https://github.com/agentscope-ai/QwenPaw/issues/7780), [#7777](https://github.com/agentscope-ai/QwenPaw/issues/7777) — triplicate submissions | 2.2.x (mirrors the existing `/` skill shortcut; cheap to implement) |
| **Small-screen sidebar redesign** | [#7788](https://github.com/agentscope-ai/QwenPaw/pull/7788) (open PR) + [#7739](https://github.com/agentscope-ai/QwenPaw/issues/7739) / [#7700](https://github.com/agentscope-ai/QwenPaw/issues/7700) | 2.2.x |
| **Per-channel skill allow-list** | [#7746](https://github.com/agentscope-ai/QwenPaw/issues/7746) (closed today as enhancement) | 2.2.x or 2.3.0 |
| **Background self-update** | [#7543](https://github.com/agentscope-ai/QwenPaw/issues

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-15

## 1. Today's Overview

ZeroClaw shows intense engineering activity with **84 combined updates** across issues and PRs in the last 24 hours, indicating a heavy pre-release stabilization push rather than routine maintenance. The pipeline is heavily skewed toward PRs (**50 updated, 34 open**) versus issues (**34 updated, 16 open**), suggesting maintainers are racing to land long-running feature branches ahead of a release cut. Security hardening (host launchers, plugin verification, memory grants, channel approval routing) and ZeroCode TUI polish dominate the work, while no version was shipped today. Health assessment: **active and well-prioritized, but with several S1/P1 issues still open** in channels and provider image handling that warrant near-term resolution.

## 2. Releases

No new releases published on 2026-09-15. Tracker issue [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) remains the visible coordinate for the v0.8.5 finite weekly stabilization line.

## 3. Project Progress

The following PRs were merged or closed in the last 24 hours:

| PR | Title | Impact |
|---|---|---|
| [#10252](https://github.com/zeroclaw-labs/zeroclaw/pull/10252) | feat(memory): add category-scoped cross-agent grants | Implements the design proposed in [#8983](https://github.com/zeroclaw-labs/zeroclaw/issues/8983) — typed cross-agent memory grants with optional exact category scopes. Enforces scope across recall, point reads, and sibling-visible paths. |
| [#9772](https://github.com/zeroclaw-labs/zeroclaw/pull/9772) | feat(telegram): add per_user_session toggle for shared group-chat sessions | Allows Telegram group chats to share a single conversation across users instead of per-sender scoping. |
| (Issue) [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) → [#10604](https://github.com/zeroclaw-labs/zeroclaw/pull/10604) | OpenCode `x-opencode-session` affinity header | Resolves an S1 bug where ZeroClaw never sent the session header, breaking Go models and risking account flags. Follow-ups tracked in [#10853](https://github.com/zeroclaw-labs/zeroclaw/issues/10853). |
| (Issue) [#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) | `[media attachment]` placeholder leaked to users | Matrix channel no longer delivers a literal placeholder when a non-vision model is in use. |
| (Issue) [#6613](https://github.com/zeroclaw-labs/zeroclaw/issues/6613) | Stronger pairing codes | Pairing-code entropy significantly raised; defaults move well beyond 6 numeric digits. |
| (Issue) [#10585](https://github.com/zeroclaw-labs/zeroclaw/issues/10585) | Log sink regression races migration tests | Tracing-subscriber test lock contention under the parallel runner fixed. |
| (Issue) [#10232](https://github.com/zeroclaw-labs/zeroclaw/issues/10232) | Daemon diagnostics drop the underlying error chain | Supervisor now preserves `anyhow` cause chains in diagnostics. |
| (Issue) [#10488](https://github.com/zeroclaw-labs/zeroclaw/issues/10488) | Matrix TTS support | `TtsManager` now invoked on the Matrix channel, matching Telegram/WhatsApp Web behavior. |
| (Issue) [#9632](https://github.com/zeroclaw-labs/zeroclaw/issues/9632) | `--agent` for standalone ACP | Bare `zeroclaw acp --agent <alias>` sets the process-scoped default for alias-less `session/new` calls. |
| (Issue) [#10104](https://github.com/zeroclaw-labs/zeroclaw/issues/10104) | `zeroclaw-hardware` lib tests never ran in CI | CI now exercises the gated hardware feature in the appropriate job. |
| (Issue) [#9293](https://github.com/zeroclaw-labs/zeroclaw/issues/9293) | Anthropic refusal & safeguard fallback | Empty-success responses replaced with proper fallback routing. |
| (Issue) [#10606](https://github.com/zeroclaw-labs/zeroclaw/issues/10606) | Sanitized component errors in unauthenticated health responses | Public `GET /health` no longer leaks arbitrary `last_error` strings. |
| (Issue) [#10588](https://github.com/zeroclaw-labs/zeroclaw/issues/10588) | Default `multimodal.max_image_size_mb` raised to 20 | Aligns the default with the existing clamp ceiling and documents the rationale. |
| (Issue) [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796) | ZeroCode chat input ignored the Delete key | Minor TUI keymap repair. |
| (Issue) [#10789](https://github.com/zeroclaw-labs/zeroclaw/issues/10789) | Localize ZeroCode daemon startup diagnostics | i18n coverage added to startup notice. |
| (Issue) [#10792](https://github.com/zeroclaw-labs/zeroclaw/issues/10792) | Clarify Windows recovery after daemon reload refusal | Per-platform recovery instructions in `docs/book/src/ops/service.md`. |
| (Issue) [#10794](https://github.com/zeroclaw-labs/zeroclaw/issues/10794) | Advisory Windows nextest failure | Resolved flake in `publish_contract::published_crates_never_include_files_outside_their_own_directory`. |

Net direction: **provider reliability, channel parity (TTS, vision), security defaults, and multi-agent memory safety** all advanced today.

## 4. Community Hot Topics

| Rank | Item | Engagement | Underlying need |
|---|---|---|---|
| 1 | [#9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965) — harden runtime-written executable test fixtures | 12 comments, in-progress P1 | Cron test fixtures write an executable shim after forking a thread; reliability of the parallel test gate |
| 2 | [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — RFC voting simplification | 11 comments, in-progress RFC | Maintainers want to remove 48/72-hour mandatory discussion timers and let `REVISE` halt the current snapshot |
| 3 | [#9345](https://github.com/zeroclaw-labs/zeroclaw/issues/9345) — recalculate PR risk/size labels on every update | 6 comments, in-progress P2 | Manual label maintenance is error-prone; dynamic recomputation while preserving maintainer overrides |
| 4 | [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) — OpenCode session header | 3 👍 reactions (highest in window), closed | Strongest signal of user pain today: production breakage and account-flag risk on Go models |

**Takeaway:** the community's most pressing concerns are **(a) test-infrastructure flakiness under the parallel runner** and **(b) governance friction in the RFC process** — both maintainer-driven. On the user side, the OpenCode/Go-model breakage generated the strongest explicit approval signal (3 👍), confirming that provider reliability for "exotic" models is a high-value surface.

## 5. Bugs & Stability

### Open P1 / S1 issues (workflow-blocking)

| Issue | Title | Status | Fix in flight? |
|---|---|---|---|
| [#10858](https://github.com/zeroclaw-labs/zeroclaw/issues/10858) | `DateTimeSection` invalidates the entire cached prefix at midnight | in-progress | Not visible yet |
| [#10857](https://github.com/zeroclaw-labs/zeroclaw/issues/10857) | ZeroCode attaches images to non-vision sessions → provider 400 | accepted | Likely linked to [#10480](https://github.com/zeroclaw-labs/zeroclaw/pull/10480) |
| [#10854](https://github.com/zeroclaw-labs/zeroclaw/issues/10854) | Literal `[IMAGE:…]` marker in tool output promoted to malformed provider image | in-progress | Likely linked to [#10480](https://github.com/zeroclaw-labs/zeroclaw/pull/10480) |
| [#10863](https://github.com/zeroclaw-labs/zeroclaw/issues/10863) | Telegram retries rejected voice updates indefinitely | accepted | [#10640](https://github.com/zeroclaw-labs/zeroclaw/pull/10640) referenced |
| [#10673](https://github.com/zeroclaw-labs/zeroclaw/issues/10673) | Persist failed ACP turns on daemon RPC path (ZeroCode Code pane) | open | Companion to [#9378](https://github.com/zeroclaw-labs/zeroclaw/issues/9378) |
| [#9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965) | Runtime-written executable test fixtures under parallel gate | in-progress | Test-fixture hardening task |

### Open P2 / S2 issues

| Issue | Title | Status |
|---|---|---|
| [#10842](https://github.com/zeroclaw-labs/zeroclaw/issues/10842) | Telegram `reaction` tool silently no-ops | in-progress |
| [#10740](https://github.com/zeroclaw-labs/zeroclaw/issues/10740) | Ctrl+N vs `[+]` session semantics mismatch | accepted |
| [#10853](https://github.com/zeroclaw-labs/zeroclaw/issues/10853) | OpenCode session-header follow-ups (from #10604) | accepted, awaiting maintainer review |

**Severity skew:** four S1/P1 items filed on 2026-09-14 (the [#1085x](https://github.com/zeroclaw-labs/zeroclaw/issues/10858) cluster) reflect an end-to-end review of the multimodal/image path that has not yet been resolved by [#10480](https://github.com/zeroclaw-labs/zeroclaw/pull/10480) alone — these should be treated as one workstream.

## 6. Feature Requests & Roadmap Signals

**Likely candidates for the next release (v0.8.5 stabilization cut):**
- **SOP rename flow** — [#10233](https://github.com/zeroclaw-labs/zeroclaw/pull/10233) + [#10527](https://github.com/zeroclaw-labs/zeroclaw/pull/10527) (stacked, ~9-file reviewable surface + base 1,450 lines). Both have stayed open for >2 weeks, suggesting they are queued for v0.8.5.
- **Plugin load-verification at install** — [#10746](https://github.com/zeroclaw-labs/zeroclaw/pull/10746) gates `zeroclaw plugin install` against the host WIT ABI; egress denials now surface a fix path.
- **Channel session serialization** — [#10411](https://github.com/zeroclaw-labs/zeroclaw/pull/10411) eliminates concurrent turns on a shared session.
- **Context compaction anchored to model window** — [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) replaces the fixed 32,000-token budget.
- **A2A outbound client (Phase 1)** — [#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324) ships four `a2a_*` tools, a shared Serde wire model, and a default-closed `[a2a.client]` block.
- **Always-ask survives Full autonomy** — [#9724](https://github.com/zeroclaw-labs/zeroclaw/pull/9724) (Audacity88 refreshed branch) restores policy precedence.
- **Desktop daemon bounded logs** — [#10236](https://github.com/zeroclaw-labs/zeroclaw/pull/10236) introduces a hidden supervisor with secure bounded logging and authenticated upgrade restarts.

**Likely deferred (long-resident open issues):**
- **Native XMPP / Prosody channel** — [#9814](https://github.com/zeroclaw-labs/zeroclaw/issues/9814) (opened 2026-08-07, only 2 comments). Alignment with existing Matrix/Telegram/Discord adapters makes this a reasonable post-v0.8.5 candidate but currently has no PR.
- **ZeroCode subagent activity / expandable tool results** — [#8763](https://github.com/zeroclaw-labs/zeroclaw/issues/8763) (opened 2026-07-06). Real operator ergonomics demand, but no implementation PR is referenced.
- **RFC process simplification** — [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) is governance-internal; effects land in policy docs rather than binaries.

**Other notable items in the dependency/PR mix:** dependabot opened [#10873](https://github.com/zeroclaw-labs/zeroclaw/pull/10873) (similar 2.7.0→3.2.0), [#10872](https://github.com/zeroclaw-labs/zeroclaw/pull/10872) (hmac 0.12.1→0.13.0), [#10871](https://github.com/zeroclaw-labs/zeroclaw/pull/10871) (flate2/lettre/cpal), [#10870](https://github.com/zeroclaw-labs/zeroclaw/pull/10870) (codeql-action 3.36.2→4.38.0) — supply-chain hygiene continues at the usual cadence.

## 7. User Feedback Summary

**Pain points that surface repeatedly:**

1. **Provider protocol conformance gaps.** [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) (3 👍) — ZeroClaw didn't send a documented header that the OpenCode relay expects, breaking models and threatening account standing. The community reaction signals this category of bug has outsized cost.
2. **Multimodal / vision edge cases.** Four separate S1/S2 issues in a single 24-hour window ([#10857](https://github.com/zeroclaw-labs/zeroclaw/issues/10857), [#10854](https://github.com/zeroclaw-labs/zeroclaw/issues/10854), [#10858](https://github.com/zeroclaw-labs/zeroclaw/issues/10858), [#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625)) indicate the image-handling path is the current fault frontier. Users want graceful degradation, not 400s or literal placeholders.
3. **Telegram as a production-critical channel.** Three Telegram-specific issues ([#10842](https://github.com/zeroclaw-labs/zeroclaw/issues/10842), [#10863](https://github.com/zeroclaw-labs/zeroclaw/issues/10863), and the closed group-session [#9772](https://github.com/zeroclaw-labs/zeroclaw/pull/9772)) confirm Telegram is being used in multi-user workflows where silent no-ops and unbounded retries are unacceptable.
4. **ZeroCode TUI polish.** Small but visible papercuts ([#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796) Delete key, [#10740](https://github.com/zeroclaw-labs/zeroclaw/issues/10740) Ctrl+N semantics) keep accumulating. These are tagged `good first issue` / `help wanted

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*