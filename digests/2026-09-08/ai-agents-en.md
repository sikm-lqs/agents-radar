# OpenClaw Ecosystem Digest 2026-09-08

> Issues: 449 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-08 11:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-08

## 1. Today's Overview

OpenClaw is in a high-throughput but un-released state on 2026-09-08. **No new releases shipped**, while the repository logged **449 updated issues** (229 still open, 220 closed) and **500 updated pull requests** (286 open, 214 merged/closed) in the last 24 hours — a combined close rate near 46%. The activity skews heavily toward Telegram-channel durability, multi-agent session stability, SQLite/transaction contention on the Gateway event loop, and post-upgrade recovery paths. Multiple recurring bugs remain open across recent versions (2026.8.1, 2026.8.2, 2026.9.1, 2026.9.2), with several "diamond lobster"-rated regressions on the latest release that have no merged fix yet. Overall project health: **active and responsive, but shipping cadence is below bug-introduction rate**.

## 2. Releases

**None.** No new tagged releases in the last 24 hours, despite the existence of an open issue [#139485](https://github.com/openclaw/openclaw/issues/139485) where users report that the managed upgrade from 2026.9.1 → 2026.9.2 leaves the Gateway offline and requires snapshot rollback. The absence of a fresh release while P0/P1 regressions accumulate on 2026.9.2 is itself a notable signal.

## 3. Project Progress

Among the merged/closed items visible in the data, the day's substantive merges cluster around:

- **Provider metadata hardening** — [PR #142125](https://github.com/openclaw/openclaw/pull/142125) (closed): `perf(vllm): keep model metadata reads lightweight` — closes a slow-first-use path that was pulling replay/plugin code into the vLLM thinking policy.
- **Release tooling fixes** — [PR #142017](https://github.com/openclaw/openclaw/pull/142017) (closed): `fix(release): classify inconclusive Kova CPU evidence` so that harness-owned CPU intervals straddling a threshold are no longer misclassified as product regressions. [PR #142126](https://github.com/openclaw/openclaw/pull/142126) (closed): `fix(release): OpenShell preview fails on nested optional dependencies` — resolves an EOVERRIDE bundle assembly failure.
- **Test isolation** — [PR #142060](https://github.com/openclaw/openclaw/pull/142060) (closed): `fix(qa): finish stateful settled-tool continuations` — covers the Responses API stateful continuation shape where prior tool output is provided inline.

These are mostly infrastructure/perf and test-correctness commits; **no user-facing feature branches were merged today**. Larger refactors like [PR #142063](https://github.com/openclaw/openclaw/pull/142063) `refactor(models): read published catalog inventory through the Gateway` and [PR #141913](https://github.com/openclaw/openclaw/pull/141913) `Security/harden local security gateway` remain open awaiting proof.

## 4. Community Hot Topics

By comment volume on issues updated today:

| # | Issue | Comments | Theme |
|---|-------|----------|-------|
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | Subagent completion silently lost — no retry/notify/restart on timeout | 26 | Long-standing session-state reliability |
| [#135111](https://github.com/openclaw/openclaw/issues/135111) | Intermittent "malformed JSON arguments" from claude-sonnet-5 on v2026.8.1 | 18 | Provider/regression |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | OpenClaw leaks unreaped hook/tool child processes (zombies) | 16 | Runtime hygiene |
| [#126360](https://github.com/openclaw/openclaw/issues/126360) | `AgentSelectionRequiredError` floods logs under explicit multi-agent ownership | 16 | Multi-agent ownership model |
| [#115908](https://github.com/openclaw/openclaw/issues/115908) | Session transcript projection reconcile can livelock | 16 | Event-loop stall |
| [#43367](https://github.com/openclaw/openclaw/issues/43367) | Multi-agent orchestration unstable: overwrite, session-lock, detached children | 14 | Multi-agent core |
| [#127229](https://github.com/openclaw/openclaw/issues/127229) | Telegram: watchdog-released durable update falsely tombstoned | 13 | Telegram delivery |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | Synchronous agent persistence blocks the Gateway event loop at scale | 13 | Throughput ceiling |

**Underlying needs**: four user-level themes dominate the discussion. (a) *Durable, observable delivery* — multiple Telegram issues describe messages either silently lost, dead-lettered after one attempt, or stuck in `send_attempt_started`. (b) *Multi-agent predictability* — owners want guarantees about which agent handles a turn and that concurrent `agents add` does not corrupt config. (c) *Event-loop health* — synchronous maintenance tasks (transcript reconcile, SQLite writes) are the recurring root cause for main-thread stalls. (d) *Upgrade trust* — every minor bump from 2026.5.12 through 2026.9.2 has produced at least one user-reported "cannot start after upgrade" report, and the documented `doctor --fix` recovery often does not apply.

## 5. Bugs & Stability

Ranked by severity (P0/P1 and impact tags). Items already closed are flagged.

**Critical / release-blocking**
- [P0, **CLOSED**] [#137813](https://github.com/openclaw/openclaw/issues/137813) Windows gateway never starts after 2026.9.1; new `--task-supervisor` flag exits 0 silently. *Closed without a linked fix PR in the feed.*
- [P0] [#140908](https://github.com/openclaw/openclaw/issues/140908) `doctor --fix` / `gateway status --deep` fail with EACCES on `systemctl --user is-enabled` under `sudo -u`, blocking all post-upgrade migrations. **No fix PR.**
- [P0] [#111578](https://github.com/openclaw/openclaw/issues/111578) Gateway auth token dropped from service-env on update (recurred despite 2026.7.1 fix); CLI cannot auth locally. **No fix PR.**

**P1, "diamond lobster" regressions on latest release**
- [#139847](https://github.com/openclaw/openclaw/issues/139847) Message sent while reply run is active is dropped — `Reply operation has no active tool authority snapshot` (regression in 2026.9.2). **Fix PR open:** [#140158](https://github.com/openclaw/openclaw/pull/140158) `fix(agents): reply authority falls back to direct preparation when captured reply operation is retired` (closes #139847).
- [#139714](https://github.com/openclaw/openclaw/issues/139714) Post-core update resume child admits an `update_runs` row it can never finalize; `openclaw status` reports "update in progress" forever. **No fix PR.**
- [#137613](https://github.com/openclaw/openclaw/issues/137613) Pre-compaction memory flush disabled on CLI backends; obvious fix hits a `compactionCount` trap. **No fix PR.**
- [#119720](https://github.com/openclaw/openclaw/issues/119720) Synchronous agent persistence and transcript maintenance block the Gateway event loop at scale. **No fix PR.**
- [#126246](https://github.com/openclaw/openclaw/issues/126246) Telegram durable outbound deliveries remain stuck in `send_attempt_started` and are lost on restart. **No fix PR.**
- [#125764](https://github.com/openclaw/openclaw/issues/125764) Telegram: network-failed outbound sends dead-lettered after a single attempt — silent loss. **No fix PR.**
- [#139809](https://github.com/openclaw/openclaw/issues/139809) Telegram does not receive protected secrets prompt from Codex — `secrets` tool times out with `no_answer`. **No fix PR.**

**P1, durability / event loop / security**
- [#115908](https://github.com/openclaw/openclaw/issues/115908) Session transcript projection reconcile can livelock. **No fix PR.**
- [#117262](https://github.com/openclaw/openclaw/issues/117262) SQLite contention: 3 concurrent write handles on `state/openclaw.sqlite` cause ~33 s event-loop stalls (DEF-61). **No fix PR.**
- [#136311](https://github.com/openclaw/openclaw/issues/136311) memory-core: Gateway reacquires reindex lock on every start; 19 GB of orphaned `memory-reindex-*` temp DBs accumulate. **No fix PR.**
- [#97616](https://github.com/openclaw/openclaw/issues/97616) Unreaped hook/tool child processes; zombie accumulation and runtime degradation. **No fix PR.**
- [#123265](https://github.com/openclaw/openclaw/issues/123265) `role:"custom"` runtime-context carrier with `display:false` is serialized as a trailing `role:"user"` message on every request. **No fix PR.**
- [#92870](https://github.com/openclaw/openclaw/issues/92870) System event text leaked into user message attribution during compaction (trust-boundary violation). **No fix PR.**

**Closed today (P1)**
- [P1, **CLOSED**] [#137927](https://github.com/openclaw/openclaw/issues/137927) Internal context block (`<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>`) leaked into visible Telegram message text — security-impacting.
- [P1, **CLOSED**] [#133984](https://github.com/openclaw/openclaw/issues/133984) `2026.7.1-2 → 2026.8.1` leaves Gateway unstartable; `doctor --fix` skips config-key migrations non-interactively.
- [P1, **CLOSED**] [#134896](https://github.com/openclaw/openclaw/issues/134896) `2026.8.1` 5-blocker gateway restart cascade + `doctor --fix` self-referential failure.
- [P1, **CLOSED**] [#138965](https://github.com/openclaw/openclaw/issues/138965) Interrupted transcript rewrite makes stale history the active conversation.

The pattern is unmistakable: **regressions cluster at every minor release boundary, and the recovery tooling (`doctor --fix`) is repeatedly observed to be insufficient.**

## 6. Feature Requests & Roadmap Signals

Active "off-meta tidepool" (feature) and enhancement issues with traction:

- [P2, 🌊] [#96675](https://github.com/openclaw/openclaw/issues/96675) **Owner-signed responsibility gates** for assistant memory, actions, skills, and evidence reuse. Suggests explicit user-review before outputs become persistent memory or rules. (👍 2, 10 comments)
- [P2, 🌊] [#118785](https://github.com/openclaw/openclaw/issues/118785) **QA primary proof for containers and external app SDK** — tracks 23 container IDs and 31 external app SDK IDs; binding taxonomy on `app-sdk`.
- [P2, 🌊] [#60602](https://github.com/openclaw/openclaw/issues/60602) **Per-Agent Bedrock `requestMetadata`** injection for multi-agent cost attribution (linked PR open).
- [P2, 🌊] [#49223](https://github.com/openclaw/openclaw/issues/49223) **WhatsApp `inter_session`** delivery requests wrongly suppressed as `REPLY_SKIP`/`ANNOUNCE_SKIP`/`NO_REPLY`.
- [P3, 🌊] [#45503](https://github.com/openclaw/openclaw/issues/45503) **Manual context clearing for tool results** (TTL-only pruning today).
- [P3, 🌊] [#126781](https://github.com/openclaw/openclaw/issues/126781) **Detached managed Lobster runs after tool return** — partially addressed in 2026.9.1.
- [P2, 🌊] [#98084](https://github.com/openclaw/openclaw/issues/98084) **MiniMax M3 native video input** support (reference branch only).

**Likely to land next minor**: (i) Bedrock per-agent request metadata (linked PR exists, lowest blast radius), (ii) owner-signed responsibility gates — cross-cutting security/UX feature with sustained thumbs-up and recurring "trust-boundary" threads (#92870, #137927) feeding it, (iii) WhatsApp `inter_session` correctness fixes (high user impact, channel-specific). The QA primary proof and M3 video items are larger surface changes and are unlikely to ship in the next point release.

## 7. User Feedback Summary

**Recurring user pain points**, drawn from issue bodies:
- **"Upgrading breaks my gateway"** — reported across `2026.5.12 → 2026.7.1-2 → 2026.8.1 → 2026.9.1 → 2026.9.2`. Users repeatedly must perform manual dist-source inspection, multiple `openclaw` invocations, or OCM snapshot rollback ([#133984, #134896, #137813, #139485, #111578]).
- **"My Telegram messages disappear"** — at least five open diamond-lobster items describe silent loss on the Telegram channel: stuck `send_attempt_started` rows, single-attempt dead-lettering, watchdog-falsely-tombstoned durable updates, dropped secrets prompts, dropped mid-turn updates. The user-visible effect is the same regardless of root cause: messages vanish.
- **"My multi-agent setup is unstable"** — concurrent `agents add` overwrites config, session locks fail under parallel runs, logbook/Control UI/system-agent turns all lack an `agentId` target and flood logs with `AgentSelectionRequiredError` ([#126360, #43367]).
- **"The runtime stalls at scale"** — sustained writes cause the event loop to block for tens of seconds, blocking all channel transports ([#115908, #119720, #117262]).
- **"Internal scaffolding shows up in my user-visible chat"** — the `<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` block has now been confirmed to render as Telegram text in at least one production incident ([#137927], closed today but root pattern recurs in [#123265]).

**Satisfaction signals** — closed items today that closed cleanly include [#137927] (context leak fix), [#138965] (transcript rewrite interruption), [#134896] (cascade upgrade), [#133984] (config migration), suggesting maintainers are resolving high-severity items, but each required multiple comments and a real production incident to surface.

## 8. Backlog Watch

Items that are high-severity, long-lived, and currently lack maintainer engagement (multiple `needs-maintainer-review` / `no-new-fix-pr` labels):

- [#44925](https://github.com/openclaw/openclaw/issues/44925) (created 2026-03-13, 26 comments, 🦞)

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Open-Source AI Agent / Personal Assistant Ecosystem
**Snapshot date: 2026-09-08** · Sources: per-project community digests (OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw)

---

## 1. Ecosystem Overview

The open-source personal AI assistant space has consolidated around a common architectural template — a persistent agent runtime with a gateway/daemon, a SQLite-class state store, multi-channel messaging delivery, and provider-adapter layers — but projects differ sharply in maturity and execution. Activity is dominated by reliability work rather than net-new features: event-loop health, durable message delivery, cron correctness, and cache-aware context management account for the majority of P1 bugs across all active projects. QwenPaw and Hermes Agent show the healthiest fix-to-bug ratios, ZeroClaw is mid-cycle with a growing review backlog, and IronClaw has contracted to automated benchmark monitoring. OpenClaw remains the engagement-volume leader by an order of magnitude but is shipping slower than it is regressing.

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Release status | Health score |
|---|---|---|---|---|
| **OpenClaw** | 449 (229 open / 220 closed) | 500 (286 open / 214 merged, ~43%) | None; P0s open on 2026.9.2 | **6/10** — massive triage throughput, but 3 open P0s + 7 P1 regressions with no fix PR; bug-introduction outpaces shipping |
| **Hermes Agent** | 50 (41 open / 9 closed) | 50 (44 open / 6 merged) | **v0.21.1 patch shipped** (tavily packaging gap flagged) | **7/10** — same-day P0/P1 resolution (Debian install, WAL split-brain); backlog growing |
| **IronClaw** | 1 (automated taxonomy) | 0 | None | **3/10** — monitoring state; observability artifact only |
| **QwenPaw** | 31 (fast turnover) | 40 (16 open / 24 closed, **60% merge ratio**) | None; 2.2.0 line current | **8.5/10** — best merge velocity, closing legacy regressions, onboarding first-time contributors |
| **ZeroClaw** | 29 (24 open / 5 closed) | 50 (all open, **0 merged**) | None | **6.5/10** — high throughput but review bottleneck; governance RFC in flight |

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Community scale is unmatched** — 949 items touched in 24h vs. ~100 for the next-largest project, yielding the deepest real-world feedback loop (multi-channel production incidents, scale-induced SQLite contention that peers haven't hit yet).
- **Broadest surface coverage**: Telegram + WhatsApp channels, multi-agent orchestration, provider metadata hardening (vLLM, Bedrock), and a security roadmap (owner-signed responsibility gates, local security gateway) that no peer matches.
- **Responsive triage**: four P1s closed today, including a production context-leak fix.

**Weaknesses vs. peers:**
- Zero releases while QwenPaw merges at 60% and Hermes ships patch tags; **every minor boundary since 2026.5.12 has produced "cannot start after upgrade" reports**, and `doctor --fix` is repeatedly insufficient — Hermes resolved its equivalent Debian P0 same-day.
- Systemic event-loop/SQLite issues (#117262, #119720) lack fix PRs; Hermes already closed its analogous WAL split-brain (#104596).

**Technical approach**: OpenClaw is uniquely **server-product-shaped** — central Gateway, managed upgrades, durable event store, ops tooling (doctor, snapshots), multi-agent ownership registry. Peers are client-shaped (Hermes desktop-first, ZeroClaw IDE/ACP-first, QwenPaw console-first). This raises OpenClaw's operational surface and explains why upgrade trust dominates its issue stream.

## 4. Shared Technical Focus Areas

| Theme | Projects | Specific needs |
|---|---|---|
| **Non-blocking persistence / event-loop health** | OpenClaw (#117262: 33s SQLite stalls; #119720), QwenPaw (#7363: 120s startup freeze) | Async-native writes; Hermes' closed WAL fix (#104596) is the reference pattern |
| **Cron / scheduled-task reliability** | Hermes (#100401 self-fencing heartbeat), QwenPaw (#7589 feedback-loop pile-up), ZeroClaw (#10685 false-success reporting) | Idempotent scheduled turns; truthful outcome reporting; validated cron UX (#10641) |
| **Durable outbound channel delivery** | OpenClaw (5+ Telegram silent-loss issues), Hermes (#103575 dropped final response), ZeroClaw (#10689, #5514) | Retry-with-visibility and DLQ surfacing instead of silent loss |
| **Multi-agent / multi-session concurrency** | OpenClaw (#43367, #126360 `AgentSelectionRequiredError`), ZeroClaw (#9727 epic, #10695), Hermes (#86890 ordering) | Ownership/agentId guarantees; parallel observability |
| **Cache-aware context management** | ZeroClaw (#10660/#10674/#10701 cache breakpoints), QwenPaw (#7576 context fallback, #7628 budget compaction), OpenClaw (#137613) | Compaction that preserves provider cache prefixes; per-model context sizing |
| **Human-approval / trust gates** | OpenClaw (#96675 owner-signed gates), QwenPaw (#7526 protected execution contract), Hermes (#39609 blocked-task auto-promote) | Enforced approval states that cannot be bypassed by automation |
| **Windows parity** | OpenClaw (#137813), Hermes (#105145, #37594), QwenPaw (#7554) | First-class Windows CI and update-handoff testing |

## 5. Differentiation Analysis

- **OpenClaw** — *Always-on assistant platform*. Gateway-centric, multi-channel (Telegram/WhatsApp), multi-agent, security-forward. Target: self-hosters and operators running persistent assistants as infrastructure.
- **Hermes Agent** — *End-user multi-surface product*. CLI/desktop/TUI/phone-relay continuity, kanban-driven autonomous workflows, cron scheduling. Target: individual power users wanting desktop-to-mobile session handoff.
- **QwenPaw** — *Console- and ecosystem-first*. Plugin marketplace, Hub sandboxing, ReMe memory, deep Chinese-ecosystem provider support (QQ channel, DeepSeek, qwen weights, i18n). Target: Chinese-market developers on the AgentScope stack.
- **ZeroClaw** — *Developer/agent-coding focused*. ZeroCode ACP client, cost ledger and prompt-cache economics, plugin webhook governance, concentrated OpenAI Responses API push. Target: developers running agents against code.
- **IronClaw** — *Eval/benchmark observability* (officeqa failure taxonomies, model-quality attribution). Not user-facing; internal tooling published openly.

## 6. Community Momentum & Maturity

- **Tier 1 — Scale leader under strain**: **OpenClaw**. Largest community, but regression debt (open P0s with no fix PRs, no release) suggests firefighting mode; maturity risk if upgrade trust keeps eroding.
- **Tier 2 — Healthy rapid iteration**: **QwenPaw** (60% merge ratio, closing August-era regressions, first-time contributor PRs landing) and **Hermes Agent** (release cadence + same-day P0 resolution). These two are converting feedback to fixes fastest.
- **Tier 3 — High-WIP, process scaling**: **ZeroClaw**. 50 open PRs, zero merges in-window, and an accepted RFC renegotiating review evidence — a project outgrowing informal governance mid-cycle.
- **Tier 4 — Dormant**: **IronClaw**, automated daily reporting only.

**Rapidly iterating**: QwenPaw, ZeroClaw, Hermes. **Needs to stabilize**: OpenClaw. **Contracted**: IronClaw.

## 7. Trend Signals

1. **Async durability is becoming the moat.** The worst bugs in every active project are synchronous persistence stalling the runtime. Teams that solve this (Hermes' WAL fix) convert scale into advantage; those that don't (OpenClaw's open #117262/#119720) see it become a throughput ceiling.
2. **Prompt-cache economics are going mainstream.** ZeroClaw's cache-breakpoint cluster and QwenPaw's budget-aware compaction request signal that context management is now judged by *cost preserved*, not tokens trimmed.
3. **Trust gates are becoming product features.** Owner-signed responsibility gates (OpenClaw), protected execution contracts (QwenPaw), and kanban human-gate bypass reports (Hermes) indicate safety-as-UX is differentiating, driven by real incidents (internal-context leaks into user chat).
4. **Silent message loss is the #1 community trust killer** — the single largest cluster of high-severity, high-comment issues (OpenClaw Telegram, Hermes, ZeroClaw). Durable delivery queues with visible dead-lettering are table stakes.
5. **OpenAI Responses API is an emerging provider battleground** — ZeroClaw's coordinated 5-feature push (#10704–#10708) and OpenClaw's stateful-continuation test coverage both point there.
6. **Multi-agent demand is outpacing implementation maturity** everywhere it's attempted.
7. **Ops quality shapes retention**: OpenClaw's upgrade-breakage chain vs. Hermes' same-day install fixes shows recovery tooling quality directly drives community sentiment; Windows parity and reversible upgrades remain underinvested ecosystem-wide.

**For agent developers**: prioritize async-first persistence, cache-prefix-preserving compaction, observable delivery retries, explicit approval-state machines, and Windows CI — these are where user pain is concentrating across the entire ecosystem.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-08

## 1. Today's Overview

Hermes Agent (`nousresearch/hermes-agent`) shows a high-activity maintenance day with **50 issues** and **50 PRs** touched in the last 24h, dominated by bug fixes and small feature additions. One patch release was tagged (**v0.21.1 / v2026.9.7**), wrapping current `main` since v0.21.0 for downstream consumers. The closed-to-open ratio on issues (9 closed vs. 41 open) and PRs (6 merged/closed vs. 44 open) indicates a healthy triage cadence but a growing backlog of P1/P2 reliability issues spanning cron, Windows desktop, state-DB WAL, and gateway delivery. The project's overall signal is one of an actively-maintained, multi-surface product (CLI / desktop / gateway / TUI / phone-relay) where reliability and cross-platform correctness are the dominant themes.

## 2. Releases

**v2026.9.7 — Hermes Agent v0.21.1** (released 2026-09-07)
- Type: **Patch release**; rolls up current `main` since v0.21.0 for tagged deployments and downstream consumers.
- Pinned at commit `6178e9f4eed8d99f4fc550add939d58c7bed6206`.
- **No breaking changes or migration notes** were surfaced in the release notes; consumers on v0.21.0 should be able to adopt this tag directly.
- Release notes URL: [v2026.9.7](https://github.com/nousresearch/hermes-agent/releases/tag/v2026.9.7) (referenced via issue [#101865](https://github.com/nousresearch/hermes-agent/issues/101865), which notes a packaging regression where `plugins/web/tavily` is missing from this stable tag).

> ⚠️ Packaging gap flagged: [#101865](https://github.com/nousresearch/hermes-agent/issues/101865) — `plugins/web/tavily/` is missing from `v2026.8.31`/`v0.21.0` despite being present at `v2026.8.27` and on `main`. Worth verifying whether the same omission applies to v2026.9.7.

## 3. Project Progress

### Merged / closed PRs (last 24h)
- [#75060](https://github.com/nousresearch/hermes-agent/pull/75060) **`fix(install): link all console script launchers`** — installer now exposes the declared `hermes-agent` console script and extends the macOS launcher regression test to cover `hermes`, `hermes-acp`, and `hermes-agent`. Improves install reliability across surfaces.
- [#75616](https://github.com/nousresearch/hermes-agent/pull/75616) **`fix(desktop): stop sessions before deleting them`** — running turns are now properly terminated before durable session rows are deleted; releases blocked approval/clarify/sudo/secret waits.
- [#105728](https://github.com/nousresearch/hermes-agent/pull/105728) **`fix: clarify kanban operator review changes`** — scopes `request-changes` to active reviewer-owned runs; routes operator/manual review changes to `reopen-review` with regression coverage.

### Closed issues (last 24h, key resolutions)
- [#87093](https://github.com/nousresearch/hermes-agent/issues/87093) — Debian 13.6 install broken (`uv.lock` / `npm install`); P0 install-update resolved.
- [#104596](https://github.com/nousresearch/hermes-agent/issues/104596) — Single-process `state.db` WAL split-brain (P1 sessions) resolved.
- [#77142](https://github.com/nousresearch/hermes-agent/issues/77142), [#74389](https://github.com/nousresearch/hermes-agent/issues/74389), [#77033](https://github.com/nousresearch/hermes-agent/issues/77033), [#92163](https://github.com/nousresearch/hermes-agent/issues/92163), [#37594](https://github.com/nousresearch/hermes-agent/issues/37594), [#103049](https://github.com/nousresearch/hermes-agent/issues/103049) — performance / minor bugs closed (Anthropic client reuse, CLI import bloat, session search I/O, streamed text rebuild, IPv6 probe timeout, renderer-reload subagent wipe).

The day's progress is dominated by **perf + reliability cleanups** rather than net-new functionality.

## 4. Community Hot Topics

| Rank | Item | Type | Comments | Signal |
|---|---|---|---|---|
| 1 | [#88584](https://github.com/nousresearch/hermes-agent/issues/88584) — Scheduled Nous→Enterkey merge blocked | Issue (invalid, P3) | 77 | Most active thread, but labeled `[invalid]`; reflects an internal cross-fork integration conflict in `cron/jobs.py`, **not a community-facing bug**. The volume of comments is operational, not product-critical. |
| 2 | [#87093](https://github.com/nousresearch/hermes-agent/issues/87093) — Debian install broken | Issue (P0, **closed**) | 24 | Real installer pain; resolved same-day. Highlights recurring fragility of the `curl \| bash` install path on fresh Linux distros. |
| 3 | [#39609](https://github.com/nousresearch/hermes-agent/issues/39609) — Kanban `--initial-status blocked` auto-promoted to `ready` bypassing human gate | Issue (P2, open) | 13 | **High-trust / safety concern**: a task explicitly marked "blocked" auto-promotes ~1 s later with no actor, then is claimed and executed by the default worker. Suggests a gap in the human-approval gate on kanban state machine. |
| 4 | [#104596](https://github.com/nousresearch/hermes-agent/issues/104596) — state.db WAL split-brain | Issue (P1, **closed**) | 11 | Closed the same day it was active — meaningful durability fix shipped. |
| 5 | [#100401](https://github.com/nousresearch/hermes-agent/issues/100401) — cron fire-claim heartbeat deadlocks on its own fence | Issue (P1, open) | 8 | Jobs running >60s are killed as "Interrupted by shutdown" even when nothing has shut down. |
| 6 | [#105145](https://github.com/nousresearch/hermes-agent/issues/105145) — Windows `hermes update` exit 8 after successful update | Issue (P1, open) | 8 | Post-update verification resolves the wrong working directory; Windows desktop handoff reliability. |
| 7 | [#62774](https://github.com/nousresearch/hermes-agent/issues/62774) — Desktop streaming truncation with Portuguese accents | Issue (P1, open) | 4 | Encoding / streaming pipeline drops whole syllables around accented chars. |
| 8 | [#86890](https://github.com/nousresearch/hermes-agent/issues/86890) — Desktop chat timeline out of order with concurrent sessions | Issue (P2, open) | 4 | `terminal` events carry empty `session_id`, breaking ordering across concurrent sessions on the same profile. |

**Underlying need:** the loudest threads concentrate on **durability (state.db WAL), cron/heartbeat semantics, Windows desktop reliability, and cross-session ordering** — i.e. the infrastructure of trust for an autonomous agent, not surface features.

## 5. Bugs & Stability

### Open P1/P2 (severity-ranked)

| Sev | Issue | Component | Summary | Fix PR? |
|---|---|---|---|---|
| **P1** | [#100401](https://github.com/nousresearch/hermes-agent/issues/100401) | cron | Fire-claim heartbeat deadlocks on its own fence; jobs falsely reported "Interrupted by shutdown". | Not yet. |
| **P1** | [#105145](https://github.com/nousresearch/hermes-agent/issues/105145) | desktop / windows / install-update | `hermes update` always reports `FAILED (exit 8)` after a successful update. | Not yet. |
| **P1** | [#62774](https://github.com/nousresearch/hermes-agent/issues/62774) | desktop / streaming | Severe text truncation during streaming with accented (Portuguese) text. | Not yet. |
| **P1** | [#98588](https://github.com/nousresearch/hermes-agent/issues/98588) | cli / gateway / install-update | False-positive "gateways may still be serving pre-update modules" after launchd respawn on macOS. | Not yet. |
| **P2** | [#39609](https://github.com/nousresearch/hermes-agent/issues/39609) | cron | `--initial-status blocked` tasks auto-promote to `ready` ~1 s later, bypassing human approval gate. | Not yet. **Safety-relevant.** |
| **P2** | [#86890](https://github.com/nousresearch/hermes-agent/issues/86890) | desktop / sessions | Chat timeline out of order under concurrent sessions (empty `session_id` on terminal events). | Not yet. |
| **P2** | [#34143](https://github.com/nousresearch/hermes-agent/issues/34143) | auth / profiles | Profile Codex auth can ignore global credential pool when local state is stale. | Not yet. |
| **P2** | [#93633](https://github.com/nousresearch/hermes-agent/issues/93633) | cli | Classic CLI prints literal `[27;2;64~` for Shift+symbol keys under `modifyOtherKeys=2` on Ghostty/VS Code/iTerm2. | Not yet. |
| **P2** | [#62333](https://github.com/nousresearch/hermes-agent/issues/62333) | mcp / auth | OAuth `refresh_token` erased on every refresh — MCP servers die ~1 h after login. | Not yet. |
| **P2** | [#77797](https://github.com/nousresearch/hermes-agent/issues/77797) | gateway / cron | API-server wake retries can duplicate agent runs or pin durable delivery on a cached 502. | Not yet. |
| **P2** | [#103575](https://github.com/nousresearch/hermes-agent/issues/103575) | gateway / telegram | Final response dropped permanently after `_send_with_retry max_retries=2` exhausts on outage. | Not yet. |

### Notable closed (same-day) — durability wins
- [#104596](https://github.com/nousresearch/hermes-agent/issues/104596) state.db WAL split-brain — fixed.
- [#87093](https://github.com/nousresearch/hermes-agent/issues/87093) Debian install — fixed.

## 6. Feature Requests & Roadmap Signals

Open feature requests filed/updated today or recently:

- [#105740](https://github.com/nousresearch/hermes-agent/issues/105740) — **Visualization of Session per Bot** in Hermes Desktop App (bot↔session ownership clarity). → Low effort UI, likely to land soon.
- [#105734](https://github.com/nousresearch/hermes-agent/issues/105734) — Resume a **desktop-owned session from Hermes-Relay phone app** (cross-surface session-lease coordination). → Multi-surface handoff is a stated theme.
- [#105750](https://github.com/nousresearch/hermes-agent/issues/105750) — Graceful fallback when `hermes:readFileDataUrl` is called on a missing file (desktop). → Small fix.
- [#96455](https://github.com/nousresearch/hermes-agent/issues/96455) — **Default skill catalog to on-demand disk lookup** instead of injecting `<available_skills>` every turn (token efficiency). → Marked `innovation`/`needs-decision`. Likely next-version candidate as it reduces per-turn token cost.
- [#92500](https://github.com/nousresearch/hermes-agent/issues/92500) — Easy way to **close the preview/browser pane** in desktop. → Trivial.
- PR [#92213](https://github.com/nousresearch/hermes-agent/pull/92213) — Make group-chat **round/message/member/history limits per-room** (currently hard-coded module constants). → Likely to merge next minor.
- PR [#105753](https://github.com/nousresearch/hermes-agent/pull/105753) — **Inject per-session project context files from projects.db**. Stacked on `feature/context-file-includes`; depends on [#98614](https://github.com/nousresearch/hermes-agent/pull/98614). → Material feature: per-session context assembly.
- PR [#105630](https://github.com/nousresearch/hermes-agent/pull/105630) — `/access` command to **manage DM/group allowlists from chat** across Telegram/Discord/Slack/WhatsApp. → Likely roadmap candidate for v0.22.

**Roadmap prediction:** v0.22 candidates — per-room group-chat limits, `/access` allowlist command, per-session project-context files, lazy skill catalog. Reliability fixes (cron heartbeat, Windows update, OAuth refresh, MCP dedup, Telegram delivery) are also likely front-of-queue.

## 7. User Feedback Summary

**Pain points surfacing repeatedly:**
- **Cross-platform install/update fragility** — Debian install (now fixed), Windows desktop `hermes update` exit 8, macOS launchd false-positive post-update warning.
- **Windows-specific gaps** — desktop update handoff ([#105145](https://github.com/nousresearch/hermes-agent/issues/105145)), skill paths not POSIX-normalized ([#105747](https://github.com/nousresearch/hermes-agent/pull/105747)), IPv6 dual-stack timeouts on local-proxy startup ([#37594](https://github.com/nousresearch/hermes-agent/issues/37594)).
- **Streaming / encoding correctness** — Portuguese accent truncation in desktop streaming ([#62774](https://github.com/nousresearch/hermes-agent/issues/62774)).
- **Concurrency / multi-session correctness** — chat timeline out of order ([#86890](https://github.com/nousresearch/hermes-agent/issues/86890)), Telegram final-response dropped after retries ([#103575](https://github.com/nousresearch/hermes-agent/issues/103575)), API-server wake duplicate runs ([#77797](https://github.com/nousresearch/hermes-agent/issues/77797)).
- **Trust & safety gaps** — Kanban `blocked` task auto-promoted with no actor ([#39609](https://github.com

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-08

**Repository:** [nearai/ironclaw](https://github.com/nearai/ironclaw)

---

## 1. Today's Overview

IronClaw shows minimal GitHub activity in the 24 hours leading up to 2026-09-08. Only one issue was updated (#8081), no pull requests were opened or merged, and no new releases were published. The single activity point is an internal/automated failure taxonomy report rather than a community-driven bug report or feature discussion. Overall, the repository appears to be in a quiet maintenance or monitoring phase, with no active development signaling release-bound features.

---

## 2. Releases

No new releases in the last 24 hours. Section omitted per protocol.

---

## 3. Project Progress

No pull requests were opened, merged, or closed in the last 24 hours. Consequently, no features were advanced and no fixes were merged via the PR queue during this window. Progress (if any) would be occurring off-GitHub or in non-PR form.

---

## 4. Community Hot Topics

The only item updated in the last 24 hours is:

- **[#8081 — Daily ironclaw failure taxonomy — 2026-09-07](https://github.com/nearai/ironclaw/issues/8081)** (author: `pranavraja99`, 0 comments, 0 reactions)

**Analysis:** The title and partial summary suggest this is an automated or templated daily taxonomy report categorizing benchmark failure modes (specifically 42 officeqa non-pass results attributed to "DeepSeek-V4-Flas…[truncated]"). The truncated reference to "DeepSeek-V4-Flas…" likely indicates DeepSeek-V4-Flash model-quality numeric errors. The lack of comments and reactions indicates this is not driving community discussion but rather functioning as an internal observability artifact posted publicly. Underlying need: ongoing model-quality and benchmark reliability tracking.

---

## 5. Bugs & Stability

No new bugs, crashes, or regressions were reported in the last 24 hours. The sole updated issue (#8081) is a failure taxonomy report rather than a bug report, though it implicitly documents that **42 officeqa test cases failed**, primarily attributed to genuine model-quality numeric errors rather than infrastructure issues. No fix PRs were opened in response.

**Severity ranking:**
- **Low/Informational:** #8081 — Documents 42 officeqa benchmark failures; framed as model-quality issues, not system regressions.

---

## 6. Feature Requests & Roadmap Signals

No feature requests were filed or updated in the last 24 hours. No roadmap signals can be inferred from current GitHub activity.

---

## 7. User Feedback Summary

There is no community-sourced user feedback in the last 24 hours. The sole issue (#8081) has zero comments and zero reactions, indicating no external user engagement. Satisfaction/dissatisfaction cannot be assessed from this window alone.

---

## 8. Backlog Watch

- **[#8081](https://github.com/nearai/ironclaw/issues/8081)** — Created and last updated on the same day (2026-09-07); while not yet "long-unanswered," maintainers may want to confirm the daily taxonomy posting cadence is intended and verify the truncated summary text is rendering/completing as expected. If the issue remains without acknowledgment beyond the standard automated posting, it could join the backlog.

No other items currently require maintainer attention based on the 24-hour window.

---

**Summary assessment:** IronClaw is in a low-activity monitoring state. Single activity = automated daily benchmark failure taxonomy. No code movement, no community engagement signals.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-08

## 1. Today's Overview

QwenPaw shows very high activity on 2026-09-08, with 31 issues and 40 PRs updated in the last 24 hours and a healthy merged/closed-to-open ratio on PRs (24 closed vs. 16 open). Maintainers are actively shipping fixes across console, MCP, memory, agent runtime, and plugin subsystems, with no new tagged releases today. The community reports cluster around three themes: runtime fragility (sync calls freezing the event loop, heartbeat cron feedback loops, swallowed exception stacks), provider compatibility edge cases (Gemini, DeepSeek, OpenAI-compat PDF handling, MCP 401 handshakes), and Console UX (modal transparency, plugin store ergonomics, mobile agent selector). Overall project health looks strong — issue turnover is fast, multiple first-time contributors are landing PRs, and long-standing regressions (e.g., the IME crash from August) are now being closed.

## 2. Releases

No new releases in the last 24 hours. Latest tagged versions per issue reports are still in the `2.2.0` / `2.2.0b*` line.

## 3. Project Progress

The following PRs were merged/closed in the last 24 hours and represent concrete forward progress:

- **[#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610)** `fix(console): prevent chat submissions from bypassing the queue` — Closes the 409 "A task is already running" issue ([#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559)) by routing sender submissions through the localStorage queue.
- **[#7631](https://github.com/agentscope-ai/QwenPaw/pull/7631)** `fix(hub): authenticate CLI requests to the current local runtime` — Resolves [#7612](https://github.com/agentscope-ai/QwenPaw/issues/7612); built-in CLI commands no longer 401 inside Hub-managed sandboxes.
- **[#7598](https://github.com/agentscope-ai/QwenPaw/pull/7598)** `fix(shell): detach child stdin from interactive console` — Addresses [#7554](https://github.com/agentscope-ai/QwenPaw/issues/7554); child shell processes on Windows no longer hijack cmd's stdin.
- **[#7627](https://github.com/agentscope-ai/QwenPaw/pull/7627)** `fix(mcp): let the legacy handshake arbitrate a 401 discover probe` — Resolves [#7620](https://github.com/agentscope-ai/QwenPaw/issues/7620); legacy MCP servers (e.g., pkulaw) no longer falsely reported as "requires OAuth".
- **[#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605)** `fix(issue 7582 plugin manager)` — Preserves marketplace tab, surfaces updates, supports batch update ([#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582)).
- **[#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578)** `fix(tool_calls): log exceptions in coordinator _drain()` — Resolves [#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572); exception stacks in tool dispatch are now logged instead of being silently stringified.
- **[#7621](https://github.com/agentscope-ai/QwenPaw/pull/7621)** `fix(agents): handle PDF blocks for text-only models` — Resolves [#7617](https://github.com/agentscope-ai/QwenPaw/issues/7617); persisted PDF `DataBlock` history no longer permanently breaks text-only OpenAI-compat endpoints.
- **[#7482](https://github.com/agentscope-ai/QwenPaw/pull/7482)** `feat(agent-kanban): add Chinese and English localization` — Kanban PawApp now honors the host locale.
- **[#7502](https://github.com/agentscope-ai/QwenPaw/pull/7502)** `feat(console): redesign sidebar and settings experience` — Unified, configurable sidebar; preserves plugin registry/extension slots.
- **[#7521](https://github.com/agentscope-ai/QwenPaw/pull/7521)** `fix(agent): fold consumed thinking under context pressure` — Reduces `MODEL_EXECUTION_ERROR` from scroll/thinking overflow (related to [#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541)).
- **[#7526](https://github.com/agentscope-ai/QwenPaw/pull/7526)** `feat(agent): add protected execution contract` — Authorization/clarification contract applied ahead of workspace prompt files.

## 4. Community Hot Topics

Most-commented items (last 24h) and the underlying needs they reveal:

1. **[#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579)** — *"Model reply unexpectedly lost from context"* (6 comments, **OPEN**). Need: persistent, durable conversational memory across turns, especially when the assistant message appears saved but is invisible to the next request — points at a sync gap between `_maybe_stamp_finished_at` persistence and the next request's context assembly.
2. **[#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559)** — *409 conflict when sending chat during a running task* (5 comments, **CLOSED**, fixed by [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610)). Need: queue-first UX — users expect in-flight submissions to wait, not error.
3. **[#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363)** — *Sync calls freeze the event loop for ~120s on startup and on message send* (5 comments, **OPEN**). Need: async-native startup/health-check paths; configurable timeouts. This is a fundamental responsiveness regression.
4. **[#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597)** — *Tool-returned image/PDF as bare base64 triggers 400* (5 comments, **CLOSED**). Need: a single normalization pass that uploads/encodes tool-output media before reaching providers.
5. **[#7469](https://github.com/agentscope-ai/QwenPaw/issues/7469)** — *ReMe background embedding/indexing silently fails* (5 comments, **CLOSED**). Need: visibility into memory-job failures (loud, not silent), and proper dependency start ordering for OpenAI-compat embeddings.
6. **[#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576)** — *Hardcoded 32768 fallback in `RetryChatModel` causes `CONTEXT_UNFIT` for all models* (5 comments, **OPEN**). Need: per-model default context sizing, not a blanket fallback.
7. **[#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589)** — *Heartbeat cron session feedback loop — duplicate message pile-up, agent unresponsive ~2h* (4 comments, **OPEN**). Need: idempotency / dedup guards on scheduled cron-driven turns; severity: high.
8. **[#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541)** — *Scroll context compression uses `role=user` for `[context compressed]` marker, breaks DeepSeek* (4 comments, **CLOSED**). Need: provider-aware message-role mapping for injected system markers.

**Underlying theme:** Most hot topics are about *correctness at the seam between persistence, context assembly, and provider adapters* — users consistently hit edge cases when an unusual message shape (PDF data block, system marker, offloaded tool completion, base64 media) crosses that boundary.

## 5. Bugs & Stability

Ranked by severity (each line indicates whether a merged PR exists):

| Sev | Issue | Title | Fix PR? |
|---|---|---|---|
| **Critical** | [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) | Model "can't see its own just-said reply" — context assembly regression | **None yet (open)** |
| **High** | [#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589) | Heartbeat cron duplicate feedback loop; agent unresponsive ~2h | **None yet (open)** |
| **High** | [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) | Sync calls block the event loop 118–135s on startup; timeout never fires | **None yet (open)** |
| **High** | [#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576) | Hardcoded 32768 `context_size` fallback in `RetryChatModel` (v2.1.0–v2.2.0) | **None yet (open)** |
| **Medium** | [#7617](https://github.com/agentscope-ai/QwenPaw/issues/7617) | PDF `DataBlock` in tool result permanently breaks text-only OpenAI-compat endpoints | [#7621](https://github.com/agentscope-ai/QwenPaw/pull/7621) merged |
| **Medium** | [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) | 409 when submitting chat while a task is running | [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) merged |
| **Medium** | [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) | Tool-returned image/PDF as bare base64 → 400 | merged (no # shown) |
| **Medium** | [#7469](https://github.com/agentscope-ai/QwenPaw/issues/7469) | ReMe background embedding fails; new memories never indexed | merged |
| **Medium** | [#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572) | `_coordinator._drain` silently swallows stack traces | [#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578) merged |
| **Medium** | [#7620](https://github.com/agentscope-ai/QwenPaw/issues/7620) | MCP streamable-http 401 falsely reports "requires OAuth" | [#7627](https://github.com/agentscope-ai/QwenPaw/pull/7627) merged |
| **Medium** | [#6885](https://github.com/agentscope-ai/QwenPaw/issues/6885) | Console UI crashes on Chinese IME `compositionEnd` (v2.1.0b2) | **merged earlier; verified stable today** |
| **Low** | [#7554](https://github.com/agentscope-ai/QwenPaw/issues/7554) | Shell tool child inherits console stdin on Windows | [#7598](https://github.com/agentscope-ai/QwenPaw/pull/7598) merged |
| **Low** | [#7612](https://github.com/agentscope-ai/QwenPaw/issues/7612) | Built-in CLI commands 401 inside Hub local sandboxes | [#7631](https://github.com/agentscope-ai/QwenPaw/pull/7631) merged |
| **Low** | [#7619](https://github.com/agentscope-ai/QwenPaw/issues/7619) | qwen-35B-A3B-FP8 conversation ends without cause | **None yet (open)** |
| **Low** | [#7618](https://github.com/agentscope-ai/QwenPaw/issues/7618) | QQ channel bot no response in groups | **None yet (open)** |
| **Low** | [#7622](https://github.com/agentscope-ai/QwenPaw/issues/7622) | Modal background "transparent" in v2.2.0 web Console | **None yet (open)** |
| **Low** | [#7630](https://github.com/agentscope-ai/QwenPaw/issues/7630) | NumPy baseline optimizations crash on VM/cloud desktop (CPU detection) | **None yet (open)** |
| **Low** | [#7625](https://github.com/agentscope-ai/QwenPaw/issues/7625) | Gemini 400 after background tool completion | [#7629](https://github.com/agentscope-ai/QwenPaw/pull/7629) open (do-not-merge) |
| **Low** | [#7607](https://github.com/agentscope-ai/QwenPaw/issues/7607) | Cursor ACP Runner JSON-RPC protocol violation → stream crash | **None yet (open)** |
| **Low** | [#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633) | llama.cpp 5-digit build number → silent downgrade | **None yet (open)** |

## 6. Feature Requests & Roadmap Signals

User-facing requests observed in the last 24h, with likelihood of landing in the next minor (`2.2.x` patch or `2.3.0`):

- **[#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628)** — *Budget-aware context compaction with safe active-turn overflow handling.* Directly aligned with the closed [#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541) / merged [#7521](https://github.com/agentscope-ai/QwenPaw/pull/7521) work. **Very likely** in `2.2.1`/`2.3.0`.
- **[#7583](https://github.com/agentscope-ai/QwenPaw/issues/7583)** — *Integrate AgentScope community (login, inbox, feedback) into the Console.* Strategic, ecosystem play. **Likely** in a near-term Console release.
- **[#7479](https://github.com/agentscope-ai/QwenPaw/issues/7479)** — *Local feedback (with corrections) for unknown slash commands.* Already has a first-time-contributor PR [#7632](https://github.com/agentscope-ai/QwenPaw/pull/7632). **Likely** in `2.2.1`.
- **[#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582)** — *Plugin store: batch update + update notifications.* Already merged via [#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605). **Shipped**.
- **[#7623](https://github.com/agentscope-ai/QwenPaw/pull/7623)** — *Mobile agent selector with pinned-agent entry.* Open PR. **Likely** in `2.2.x` or `2.3.0`.
- **[#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399)** — *Reranker UI config panel on `Re

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-08

## 1. Today's Overview

ZeroClaw shows **high development throughput but zero release output** for 2026-09-08. The repository saw 29 issues touched (24 still open, 5 closed) and 50 pull requests touched (all still open, none merged/closed), indicating a heavy review backlog rather than a slow day. Closed work is concentrated on Telegram/WhatsApp channel fixes and provider cache-tuning refinements. Open work spans a coordinated batch of bootstrap/launcher foundation PRs, ZeroCode ACP/Code-pane fixes, and Anthropic-compatible provider cache-breakpoint work. The day reads as **mid-cycle stabilization** between releases, with maintainers clearing small bug fixes while stacked XL PRs await review.

## 2. Releases

**No new releases** in the last 24 hours. No version bump to report.

## 3. Project Progress

Five issues closed today, all bug/enhancement work:

| Issue | Title | Outcome |
|---|---|---|
| [#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670) | `heartbeat.target` rejects `<type>.<alias>` composite keys | Closed (P2, S1) — fix landed for channel routing |
| [#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660) | Third cache breakpoint at previous-turn's last message | Closed (P2) — Anthropic + compatible providers cache strategy extended |
| [#10688](https://github.com/zeroclaw-labs/zeroclaw/issues/10688) | WhatsApp Web voice notes never transcribed | Closed (P2) — orchestrator now wires the agent's transcription provider |
| [#10326](https://github.com/zeroclaw-labs/zeroclaw/issues/10326) | Reliable streaming errors report wrong model | Closed (P3) — diagnostic accuracy fix |
| [#10693](https://github.com/zeroclaw-labs/zeroclaw/issues/10693) | ZeroCode silently ignores Enter submissions | Closed (S1) — workflow-blocker resolved |

**Notable advancement:** A coherent slice of prompt-cache correctness landed via [#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660), paired with the still-open companion work in [#10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674) and [#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701). The provider/cache area is being hardened as a unit.

**No PRs merged today** — all 50 PRs touched remain in the review queue.

## 4. Community Hot Topics

The highest-engagement threads are concentrated around three themes: **PR review governance**, **ZeroCode ACP/Code-pane correctness**, and **Telegram channel UX**.

- [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) — *RFC: Clarify PR review evidence, freshness warnings, and author-action boundaries* (6 comments, accepted, high-risk). Reflects maintainer pain around ambiguous review evidence and merge-blocking decisions; the RFC even proposes an "expedited merge lane." This is process noise around PR governance, suggesting the project has outgrown informal review rules.
- [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — *Batch Telegram media groups into one multimodal turn* (7 comments, in progress, 5 months old). Users expect album-style attachments to be one LLM call; Zeroclaw currently fragments them. Clear UX expectation mismatch.
- [#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) — *Failed ACP turns disappear after switching sessions* (5 comments, P1, in progress). Operator workflow blocker when a Code/ACP session fails.
- [#10641](https://github.com/zeroclaw-labs/zeroclaw/issues/10641) — *Per-field cron schedule input* (3 comments, accepted). Web UI cron input is currently a raw cron string; users want guided, validated per-field entry.
- [#9727](https://github.com/zeroclaw-labs/zeroclaw/issues/9727) — *Epic: run and monitor multiple agents from a zerocode sidebar* (2 comments, in progress, high-risk). Demand for multi-agent parallelism surfaced through an epic-tracker issue.

**Underlying need:** users are outgrowing single-session, single-agent workflows (ZeroCode + ACP) and want parallel observability; meanwhile the maintainer community is renegotiating review rules to keep the PR queue moving.

## 5. Bugs & Stability

Ranked by severity:

**S1 / P1 (workflow-blocking):**
- [#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) — Failed ACP turns vanish after switching sessions. In progress, no fix PR linked yet.
- [#10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674) — History trimming stops at cap, defeating prompt caching for tool-heavy sessions. Accepted, high-risk, no linked fix PR.
- [#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697) — ZeroCode ACP transcript drops assistant text emitted before a tool call. P1, high-risk, no fix PR linked.
- [#10685](https://github.com/zeroclaw-labs/zeroclaw/issues/10685) — Tracker: Reliable agent delivery and cron outcome reporting (false success, duplicates, missing cron outcomes). P1, accepted.

**S2 / P2 (degraded behavior):**
- [#10667](https://github.com/zeroclaw-labs/zeroclaw/issues/10667) — ZeroCode duplicates streamed responses when prompt completion precedes TurnComplete. In progress.
- [#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689) — Telegram voice reply silently skipped when reply starts with `[` (ElevenLabs v3 audio tags).
- [#10694](https://github.com/zeroclaw-labs/zeroclaw/issues/10694) — PowerShell shell tests intermittently time out on Windows (CI flake).
- [#10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690) — Integrations page "Configure" link slugifies display name (Z.AI → `path_not_found`).
- [#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699) — Cost ledger prices cache writes at the plain input rate, understating every cache miss.
- [#10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700) — Cost records share a daemon-lifetime session id; per-conversation spend can't be separated.
- [#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701) — User message with image attachment invalidates the whole history cache prefix.
- [#10695](https://github.com/zeroclaw-labs/zeroclaw/issues/10695) — ZeroCode sessions changed by another client aren't refreshed on focus.
- [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — Telegram media groups not batched into one multimodal turn.

**S3 / P3 (minor):**
- [#10702](https://github.com/zeroclaw-labs/zeroclaw/issues/10702) — Token-budget trimmer has same hysteresis gap as message-cap trimmer.

**Fix PR coverage:** of the open P1/S1 bugs, none have a directly linked merged fix in today's data. [#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670) and [#10693](https://github.com/zeroclaw-labs/zeroclaw/issues/10693) closed, but the remaining P1 set (#9333, #10674, #10697, #10685) is **waiting on author work or maintainer review**.

## 6. Feature Requests & Roadmap Signals

Several feature requests cluster around OpenAI Responses enhancements, suggesting a near-term provider-surface push:

- [#10704](https://github.com/zeroclaw-labs/zeroclaw/issues/10704) — Async function tools on OpenAI Responses (let the model continue while approved tools run).
- [#10705](https://github.com/zeroclaw-labs/zeroclaw/issues/10705) — Explicit `max` reasoning effort for compatible OpenAI models (GPT-6 Astra).
- [#10706](https://github.com/zeroclaw-labs/zeroclaw/issues/10706) — Preserve opaque reasoning state across OpenAI Responses call paths.
- [#10707](https://github.com/zeroclaw-labs/zeroclaw/issues/10707) — Bounded programmatic tool calling through OpenAI Responses.
- [#10708](https://github.com/zeroclaw-labs/zeroclaw/issues/10708) — Active-response steering on OpenAI Responses WebSockets.

Five OpenAI-Responses features opened in the same 24-hour window by the same author (`IftekharUddin`) — this is a coordinated feature push, **high likelihood of landing in the next provider-adapter release**.

Other accepted/active feature work:
- [#10641](https://github.com/zeroclaw-labs/zeroclaw/issues/10641) — Per-field cron schedule input (web). Good next-minor-version candidate.
- [#9727](https://github.com/zeroclaw-labs/zeroclaw/issues/9727) — Multi-agent sidebar epic. Long-running, structural.
- [#10695](https://github.com/zeroclaw-labs/zeroclaw/issues/10695) — Refresh ZeroCode sessions changed by another connected client. Companion to [#9727](https://github.com/zeroclaw-labs/zeroclaw/issues/9727) and [#9739](https://github.com/zeroclaw-labs/zeroclaw/issues/9739).
- [#10709](https://github.com/zeroclaw-labs/zeroclaw/issues/10709) — Document Astra setup for API-key and Codex subscription providers.

**Next-release prediction:** the next tagged version will most plausibly bundle the OpenAI Responses feature cluster (#10704–#10708), the Anthropic cache-strategy refinements (#10660 + #10674 + #10701), and the closed bugfixes from today's sweep (#10670, #10688, #10693, #10326).

## 7. User Feedback Summary

Real user pain points visible from issue bodies and recent reports:

- **Cron UX is hostile.** Users get a raw cron expression with no validation or human-readable preview — [#10641](https://github.com/zeroclaw-labs/zeroclaw/issues/10641) directly reflects this.
- **Voice transcription is unreliable on chat channels.** WhatsApp Web voice notes never transcribed ([#10688](https://github.com/zeroclaw-labs/zeroclaw/issues/10688)), and Telegram voice replies silently skipped on `[`-prefixed outputs ([#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689)).
- **Cost visibility is too coarse.** Both cache-write token accounting ([#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699)) and session-id granularity ([#10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700)) block per-conversation spend analysis.
- **Single-session workflows don't scale.** Users want to watch multiple agents in parallel ([#9727](https://github.com/zeroclaw-labs/zeroclaw/issues/9727)) and have UI reflect concurrent edits from another client ([#10695](https://github.com/zeroclaw-labs/zeroclaw/issues/10695)).
- **Prompt caching is brittle on multimodal inputs.** Images invalidate more cache than they should ([#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)), and history-trim hysteresis defeats caching in tool-heavy sessions ([#10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674)).
- **ACP/Code-pane fidelity is leaking.** Assistant text before a tool call is dropped ([#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697)), failed turns vanish ([#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)), and streamed completions can double-render ([#10667](https://github.com/zeroclaw-labs/zeroclaw/issues/10667)).

No 👍 reactions are visible on any item today — engagement is comment-driven. Satisfaction signal is implicit: most open issues are tracked or in-progress, not stale-and-ignored.

## 8. Backlog Watch

Items needing maintainer attention — long-lived or large without clear progress:

| Item | Type | Age | Why it needs attention |
|---|---|---|---|
| [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) | Bug (P2) | 5 months | Telegram media batching has been "in progress" since April; oldest still-open item. |
| [#9341](https://github.com/zeroclaw-labs/zeroclaw/issues/9341) | PR (XL, needs-maintainer-review) | ~6 weeks | Code session-history vs persistent-memory isolation; large, marked needs-review. |
| [#8949](https://github.com/zeroclaw-labs/zeroclaw/issues/8949), [#8862](https://github.com/zeroclaw-labs/zeroclaw/issues/8862) | Stacked PRs (XL, needs-author-action) | ~9 weeks | Governed plugin webhook ingress — stacked, blocked on author action; foundational for the plugin ecosystem. |
| [#9002](https://github.com/zeroclaw-labs/zeroclaw/issues/9002) | PR (XL, needs-author-action) | ~8 weeks | Gateway keeps agent turns alive after viewer disconnect. |
| [#9222](https://github.com/zeroclaw-labs/zeroclaw/issues/9222) | PR (XL, needs-author-action) | ~7 weeks | Per-dimension LLM-judge eval grader. |
| [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) | RFC (accepted) | 2 weeks | PR review policy RFC with proposed expedited merge lane — community input still open. |
| [#10119](https://github.com/zeroclaw-labs/zeroclaw/issues/10119) | PR (

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*