# OpenClaw Ecosystem Digest 2026-09-15

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-14 17:02 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-15

## 1. Today's Overview

OpenClaw shows **extremely high triage churn but no shipped release** in the 24-hour window: 500 issues updated (305 open, 195 closed) and 500 PRs updated (341 open, 159 merged/closed), with zero new tagged releases. The activity is dominated by **post-2026.9.3 / 2026.9.4 hot-fix work** — the recently opened tracking issue [openclaw/openclaw#145252](https://github.com/openclaw/openclaw/issues/145252) coordinates update, upgrade, Doctor, migration, rollback, and restart reliability around those releases, indicating the project is in a **stabilization phase following a problematic dot-release**. Recurring themes across today's top items are Gateway event-loop stalls, child-process leaks, Codex-app-server regressions, Windows-specific update/hand-off bugs, and SQLite WAL growth on Windows — collectively pointing to **real-world reliability regressions that have not yet been fully contained**.

## 2. Releases

**No new releases in the last 24 hours.** The most recent shipping activity centers around version lines **2026.9.2 / 2026.9.3 / 2026.9.4**, which multiple open issues identify as the source of regressions ([#145252](https://github.com/openclaw/openclaw/issues/145252), [#145510](https://github.com/openclaw/openclaw/issues/145510), [#146860](https://github.com/openclaw/openclaw/issues/146860), [#143524](https://github.com/openclaw/openclaw/issues/143524)). Operators currently on those builds should monitor the tracking issue before further `openclaw update` runs.

## 3. Project Progress

A large batch of **merged/closed PRs landed today** by maintainer `steipete` and contributor `RomneyDa`, focused on hotfixes, test-matrix compaction, and refactors with no user-visible behavior changes:

- [#148126](https://github.com/openclaw/openclaw/pull/148126) — `fix: Doctor maintenance closes unrelated database clients` (XL, marked *proof: sufficient*).
- [#148289](https://github.com/openclaw/openclaw/pull/148289) — `fix: retry ambiguous Gemini current-quota 429s`.
- [#147978](https://github.com/openclaw/openclaw/pull/147978), [#147979](https://github.com/openclaw/openclaw/pull/147979), [#147980](https://github.com/openclaw/openclaw/pull/147980), [#147981](https://github.com/openclaw/openclaw/pull/147981) — `refactor: compact runtime test matrices` series (reply, OpenAI transport, update lifecycle, runtime environment). Net result: ~267 lines of test scaffolding removed with no contract changes.
- [#148118](https://github.com/openclaw/openclaw/pull/148118) — `fix(plugins): preserve live ClawHub package metadata` (closes defect in Docker-fixture-isolated validation lane).
- [#147457](https://github.com/openclaw/openclaw/pull/147457) — `fix(matrix): persist private crypto state before key uploads` (closes [#147450](https://github.com/openclaw/openclaw/issues/147450)).

Several **closed issues** also confirm progress against previously blocking bugs: the Codex app-server turn-completion stall regression [#88312](https://github.com/openclaw/openclaw/issues/88312), the 2026.7.1 gateway-start failure [#108435](https://github.com/openclaw/openclaw/issues/108435), the 2026.9.2 reply authority regression [#141252](https://github.com/openclaw/openclaw/issues/141252), and the macOS npm `global install swap` rollback failure [#145072](https://github.com/openclaw/openclaw/issues/145072).

## 4. Community Hot Topics

The issues attracting the most community attention all expose **runtime integrity problems under realistic load**:

- **[#25592 — "Text between tool calls leaks to messaging channels"](https://github.com/openclaw/openclaw/issues/25592)** (40 comments, 🦞). Diamonds-rated because internal agent narration/error text is being routed to Slack/iMessage as if it were user-visible output. Underlying need: a clean separation between *model-visible narration* and *channel-deliverable content*; likely requires a routing-policy refactor.
- **[#97616 — "OpenClaw leaks unreaped hook/tool child processes"](https://github.com/openclaw/openclaw/issues/97616)** (30 comments, 🦪). Zombie accumulation (`openclaw-hooks`, `bash`, `codex`) tied to long-running gateway sessions. Underlying need: deterministic lifecycle/cleanup of spawned children.
- **[#91009 — Codex `PreToolUse` native hook relay spawns CPU-bound `openclaw-hooks` and stalls Gateway RPC](https://github.com/openclaw/openclaw/issues/91009)** (23 comments, P0). Directly compounds [#97616](https://github.com/openclaw/openclaw/issues/97616); suggests the Codex relay path needs process-pooling or synchronous in-process handling.
- **[#88312 — Codex turn-completion regression on 2026.5.27](https://github.com/openclaw/openclaw/issues/88312)** (22 comments, closed; follow-up of #84076 → #85107). High community signal because it bisects to a single dot-release.
- **[#119720 — "Synchronous agent persistence and transcript maintenance block the Gateway event loop at scale"](https://github.com/openclaw/openclaw/issues/119720)** (20 comments, 🦞). Calls for moving persistence and compaction off the request path.
- **[#102175 — Embedded prompt cache breaks across room/policy/Responses boundaries](https://github.com/openclaw/openclaw/issues/102175)** (19 comments, P2). Long-running embedded sessions lose provider cache reuse, inflating cost and latency.
- **[#144911 — MCP server init timeout crashes the Gateway](https://github.com/openclaw/openclaw/issues/144911)** (15 comments, ). Unhandled rejection in child-cleanup; a stability cliff on a single misbehaving MCP server.

## 5. Bugs & Stability

**P0 (release-blocker-class):**

| Issue | Title | Status | Fix PR? |
|---|---|---|---|
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | Codex `PreToolUse` relay stalls Gateway RPC | OPEN | None linked |
| [#146860](https://github.com/openclaw/openclaw/issues/146860) | Windows: managed update handoff stalls under InteractiveToken task | OPEN | None linked |
| [#145510](https://github.com/openclaw/openclaw/issues/145510) | Update failure: `runtime-verification-failed` (2026.9.3) | OPEN | None linked |
| [#123326](https://github.com/openclaw/openclaw/issues/123326) | Explicit multi-agent Codex migration crash-loops Gateway | OPEN | None linked |
| [#125333](https://github.com/openclaw/openclaw/issues/125333) | `totalTokens` inflation on 2026.8.1-beta.2 (only `cli` path fixed) | OPEN | Partial — [#123065](https://github.com/openclaw/openclaw/issues/123065) covered only one API path |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | SQLite WAL grows to 1.4–2.8 GB; blocks Gateway startup on Windows | OPEN | None linked |

**P1 (high severity):**

| Issue | Title | Status | Fix PR? |
|---|---|---|---|
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP init timeout crashes Gateway (unhandled rejection) | OPEN | None linked |
| [#125570](https://github.com/openclaw/openclaw/issues/125570) | Skill Workshop `update` silently overwrites live skill `description` | OPEN | None linked |
| [#125764](https://github.com/openclaw/openclaw/issues/125764) | Telegram: transient send failure dead-letters after one attempt | OPEN | None linked |
| [#134993](https://github.com/openclaw/openclaw/issues/134993) | Gateway busy-loops in filesystem discovery on large fleets | OPEN | None linked |
| [#145152](https://github.com/openclaw/openclaw/openclaw/issues/145152) | Stuck-session recovery names no run/owner identity | OPEN | None linked |
| [#144876](https://github.com/openclaw/openclaw/issues/144876) | Tool-backed dashboard sessions end silently after length finalize failure | OPEN | None linked |
| [#102175](https://github.com/openclaw/openclaw/issues/102175) | Embedded prompt cache breaks across boundaries | OPEN | None linked |
| [#104719](https://github.com/openclaw/openclaw/issues/104719) | `memory-wiki` exhaustive fallback ignores tool deadline | OPEN | None linked |

**Closed today (regressions resolved):** [#108435](https://github.com/openclaw/openclaw/issues/108435) (2026.7.1 gateway start failure), [#141252](https://github.com/openclaw/openclaw/issues/141252) (2026.9.2 reply authority), [#145072](https://github.com/openclaw/openclaw/issues/145072) (macOS npm `global install swap`), [#135776](https://github.com/openclaw/openclaw/issues/135776) (core/plugin version skew on `openclaw update`).

**Stability read:** the bug load is dominated by **process/resource lifecycle** (zombies, busy-loops, WAL growth, child-cleanup crashes), **update/upgrade mechanics** (interactive-token tasks, runtime-verification, plugin/core skew), and **Codex-app-server regressions**. Process-lifecycle issues (#97616, #91009, #97616 family) appear to share an architectural root cause that has not yet been addressed with a single fix PR.

## 6. Feature Requests & Roadmap Signals

Most active feature requests:

- **[#52640 — Persistent task-status surface for long-running channel turns](https://github.com/openclaw/openclaw/issues/52640)** (8 👍): Discord-first abstraction, then generic. Highly likely to land in a near-term release given recurring user complaints about typing indicators and heartbeat spam.
- **[#48788 — Centralized filename-encoding utility for multi-encoding Content-Disposition](https://github.com/openclaw/openclaw/issues/48788)** (20 comments): follow-up to merged PR #48578; architectural cleanup likely to ship alongside Feishu/LINE/JP-KR locale work.
- **[#27445 — `announceTarget` option for sub-agent completion routing](https://github.com/openclaw/openclaw/issues/27445)** (5 👍): enables parent-orchestrated workflows via `sessions_spawn`. PR open; tractable.
- **[#51028 — Sessions panel: sort by last meaningful activity](https://github.com/openclaw/openclaw/issues/51028)**: Web UI ergonomics; cheap to ship.
- **[#74077 — Slash command to toggle preview streaming](https://github.com/openclaw/openclaw/issues/74077)** (closed): shipped via PR link.
- **[#74100 — Skill Graph on-demand dependency loading](https://github.com/openclaw/openclaw/issues/74100)**: token-efficiency push; large change, not imminent.
- **[#27445 — `announceTarget`](https://github.com/openclaw/openclaw/issues/27445)**: paired PR already open.

**Most likely to ship in the next minor:** `announceTarget` ([#27445](https://github.com/openclaw/openclaw/issues/27445)) and the persistent task-status surface ([#52640](https://github.com/openclaw/openclaw/issues/52640)) — both have linked implementation work and high 👍 ratios.

## 7. User Feedback Summary

- **Pain: agent narration leaks into DMs.** [#25592](https://github.com/openclaw/openclaw/issues/25592) — operators running in Slack/iMessage are seeing internal `error handling` text surface to end users; trust impact is high.
- **Pain: long-running gateways degrade silently.** [#97616](https://github.com/openclaw/openclaw/issues/97616), [#91009](https://github.com/openclaw/openclaw/issues/91009), [#134993](https://github.com/openclaw/openclaw/issues/134993), [#143524](https://github.com/openclaw/openclaw/issues/143524) — all describe hours-to-days timescales before failure, making diagnosis hard.
- **Pain: updates are now risky.** [#145510](https://github.com/openclaw/openclaw/issues/145510), [#145252](https://github.com/openclaw/openclaw/issues/145252), [#146860](https://github.com/openclaw/openclaw/issues/146860), [#135776](https://github.com/openclaw/openclaw/issues/135776), [#145072](https://github.com/openclaw/openclaw/issues/145072) — the act of upgrading itself is a source of incidents on macOS, Windows, and Linux.
- **Pain: Codex-app-server integration is brittle.** Multiple regressions against specific dot-releases (#88312, #84037, #123326) erode confidence in the Codex path.
- **Pain: cross-user privacy regressions.** [#77292](https://github.com/openclaw/openclaw/issues/77292) (closed; cross-DM context leak), [#25592](https://github.com/openclaw/openclaw/issues/25592) (channel misrouting) — security and privacy regressions surface repeatedly.
- **Use cases surfacing:** Discord-first long-running task UX, persistent follow-up sub-sessions ([#148012](https://github.com/openclaw/openclaw/pull/148012)), WearOS / mobile gateway companions ([#143216](https://github.com/openclaw/openclaw/pull/143216)).
- **Satisfaction signal:** `steipete`-authored PRs dominate the merged set today and carry the maintainer trust label; the contributor pipeline is healthy.

## 8. Backlog Watch

**Stale P1/P0 items without maintainer look or fix PR — at risk of slipping:**

- [#25592](https://github.com/openclaw/openclaw/issues/25592) — diamond-lobster, `clawsweeper:no-new-fix-pr`, open since 2026-02-24. Routing/narration leak is security-adjacent and a community centerpiece.
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — `clawsweeper:no-new-fix-pr`, open since 2026-06-29. Child-process lifecycle; no clear owner.
- [#125570](https://github.com/openclaw/openclaw/issues/125570) — Skill Workshop silently breaks skill routing via `description` overwrite; no PR.
- [#125764](https://github.com/openclaw/openclaw/issues/125764) — Telegram dead-letter on first failure; high-impact for production Telegram deployments.
- [#143524](https://github.com/openclaw/openclaw/issues/143524) — SQLite WAL runaway on Windows; blocks startup.
- [#146860](https://github.com/openclaw/openclaw/issues/146860) — Windows InteractiveToken scheduled-task handoff stall.
- [#91009](https://github.com/openclaw/openclaw/issues/91009) — Codex relay CPU/RPC stall; shares root cause with [#97616](https://github.com/openclaw/openclaw/issues/97616).
- [#125333](https://github.com/openclaw/openclaw/issues/125333) — `totalTokens` ratchet: prior fix was incomplete; memory-flush path unguarded.

**PRs awaiting maintainer look or author action:** [#145074](https://github.com/openclaw/openclaw/pull/145074) (`⏳ waiting on author`), [#147724](https://github.com/openclaw/openclaw/pull/147724) (`⏳ waiting on author`, screenshot proof attached), [#147188](https://github.com/openclaw/openclaw/pull/147188) (`📣 needs proof`, Telegram e2e), [#67421](https://github.com/openclaw/openclaw/pull/67421) (`📣 needs proof`, per-agent SSRF overrides — security-relevant).

**Tracking issue that should be watched by every operator on 2026.9.x:** [#145252](https://github.com/openclaw/openclaw/issues/145252).

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem
**Snapshot date: 2026-09-15** | Projects: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The personal AI assistant landscape currently splits into an **end-user assistant layer** (OpenClaw, Hermes Agent, QwenPaw, ZeroClaw) and an **execution-runtime layer** (IronClaw's Rust/wasm host). Across all active backlogs, engineering energy has decisively shifted from feature expansion to **reliability engineering**: state-database integrity, long-running process hygiene, update safety, and MCP integration hardening dominate every digest. Messaging-channel bridging (Telegram, Matrix, Slack, WhatsApp, XMPP, Feishu) remains the primary integration surface, and the self-hosted operator — not the casual consumer — is the dominant user profile. Governance is visibly maturing (RFC processes, contributor ladders, release trains), even as two of five projects sit in regression-driven or deliberate stabilization phases.

---

## 2. Activity Comparison

| Project | Issues touched (24h) | PRs touched (24h) | Release status | Health score* | Key risk |
|---|---|---|---|---|---|
| **OpenClaw** | 500 (305 open / 195 closed) | 500 (341 open / 159 merged) | None; post-2026.9.3/.4 hotfix mode | **7.0/10** | 6 open P0s, 5 without fix PRs; active regression tracker [#145252](https://github.com/openclaw/openclaw/issues/145252) |
| **Hermes Agent** | 50 | 50 | ✅ **v0.21.3** shipped 09-14 (~338 PRs rolled up) | **7.5/10** | 5 of 7 open P1s have no in-flight fix |
| **QwenPaw** | 45 (31% closed) | 50 (22% merged) | None; v2.2.1 line in bug-fix wave | **7.0/10** | Three P0-class data-loss/OOM issues open |
| **ZeroClaw** | 26 (6 closed) | 50 (48 open / 2 closed) | None; v0.8.5 line, intake frozen | **6.5/10** | Two S1s with no PR; decision-queue bottleneck; XL PRs aging 50–77 days |
| **IronClaw** | 1 | 6 (4 = Dependabot; 1 closed) | None | **4.5/10** | Near-zero substantive output and zero community engagement |

\* Composite of throughput, backlog risk (P0/S1 fix coverage), release cadence, engagement, and review latency. Counts are 24h-touched items and appear window-capped for the largest repos (OpenClaw at 500/500; others at 50), so OpenClaw's true volume is likely understated relative to peers.

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Community scale (~10x nearest peer).** Top-issue engagement runs 40 / 30 / 23 comments vs. Hermes 17, ZeroClaw 15, QwenPaw 6, IronClaw 0. Cumulative issue numbering (~#148k vs. ~#111k Hermes, ~#10k ZeroClaw/IronClaw, ~#7.7k QwenPaw) implies the largest historical user base by a wide margin.
- **Delivery throughput.** 159 PRs merged in the window — an order of magnitude above the rest combined — with maintainer-led review (steipete) and enforced proof labels, indicating rigorous (if strained) QA process.
- **Operational tooling maturity.** Doctor diagnostics, managed update/rollback machinery, tracking issues, and a plugin marketplace (ClawHub) that no peer matches in completeness.

**Technical approach differences:** OpenClaw is a **monolithic gateway hub** — central Gateway process, multi-channel bridging, plugin/skill ecosystem, and deep Codex app-server integration. Hermes shares the gateway/fleet DNA at ~1/10 scale and is in consolidation mode. QwenPaw is **desktop-app-first** with a memory subsystem. ZeroClaw is **protocol/channel-first** with governance overhead. IronClaw is infrastructure, not an assistant. Notably, OpenClaw's deepest integration (Codex app-server) is also its most productive bug source (#88312, #123326, #91009).

**Vulnerabilities:** quality debt is real — 6 open P0s mostly without linked fixes, the update mechanism itself is an incident vector across three OSes, and security-adjacent narration-leak #25592 has been open since 2026-02-24. OpenClaw is the ecosystem leader under sustained regression pressure.

---

## 4. Shared Technical Focus Areas

| Focus area | Projects | Specific emerging requirement |
|---|---|---|
| **MCP reliability & isolation** | **All five** | Init-timeout crash containment (OpenClaw #144911), connection-recovery that doesn't poison state (ZeroClaw #10807), standardized error envelopes incl. Java SDK (QwenPaw #7728/#7716), egress-leak classification (IronClaw #8077), reload-without-restart (Hermes #110976) |
| **SQLite/WAL state integrity** | OpenClaw, Hermes | Single-writer guards, WAL checkpoint/truncation (1.4–2.8 GB growth on Windows), pre-onset telemetry; Hermes's lazy-flock fix is field-verified and transferable |
| **Update/migration safety** | OpenClaw, Hermes, QwenPaw | Deferred-restart terminal states that don't read as failure (Hermes #107402), runtime verification, data/skill preservation on profile distribution (QwenPaw #7724, Hermes #110920) |
| **Long-running resource hygiene** | OpenClaw, QwenPaw, Hermes | Child-process reaping (OpenClaw #97616), bounded buffers/keep-alive pools (QwenPaw: 20.7 GB growth, ~1 MB/s leak), turn-lease/session cleanup (Hermes #110985) |
| **Content-boundary hygiene** | OpenClaw, ZeroClaw, QwenPaw | Separation of model-visible narration from channel-deliverable text (OpenClaw #25592); multimodal placeholders/markers must never reach users (ZeroClaw #10625/#10854); scheduled-task output must not silently vanish (QwenPaw #7709) |
| **Runaway-agent containment** | ZeroClaw, Hermes, QwenPaw | Execution-tree iteration budgets (ZeroClaw #10351), soft wake-not-kill timeouts (Hermes #111035), doom-loop gates and overflow recovery (QwenPaw #7748) |
| **Windows parity** | OpenClaw, QwenPaw, Hermes, ZeroClaw | Update handoff stalls, WAL blocking, sub-agent spawn timeouts, CI flakiness — Windows remains the second-class platform ecosystem-wide |

---

## 5. Differentiation Analysis

| Project | Feature focus | Target user | Architecture |
|---|---|---|---|
| **OpenClaw** | Gateway + channel bridging + plugins/skills + Codex integration | Operators running always-on assistants bridged to Slack/iMessage/Discord | Node gateway hub, plugin marketplace, Doctor tooling |
| **Hermes Agent** | Fleet gateway, profiles, approvals, Feishu/Slack/Telegram | Self-hosters; Docker/Cloud downstream consumers | Same gateway DNA, consolidation-tag release model (~338 PRs per patch) |
| **QwenPaw** | Desktop app, memory subsystem (ReMe/dream digest), data analytics (QwenPaw-Data 0.3), Hub, ACP | End users on Windows/macOS, incl. non-English locales (vi, pt-BR) | Desktop native host + Python 3.11 runtime + console UI |
| **ZeroClaw** | Multi-channel self-hosting, local-first compute (edge-mesh RFC), config invariants | Home-lab / self-hosting hobbyists | Daemon-based, channel-per-module, RFC/ADR governance |
| **IronClaw** | Sandboxed execution, MCP egress security, benchmark harness | Developers / platform teams | Rust + wasmtime/wasm sandboxing — infrastructure layer, not an assistant |

The clearest architectural split: OpenClaw/Hermes compete in the **always-on gateway** category; QwenPaw owns the **desktop consumer** niche; ZeroClaw courts **self-hosters with hardware**; IronClaw supplies the **execution substrate** others could build on.

---

## 6. Community Momentum & Maturity

- **Tier 1 — Hyperscale churn, forced stabilization:** **OpenClaw**. Massive triage throughput but no release; stabilizing after problematic dot-releases rather than by choice.
- **Tier 2 — Shipping velocity:** **Hermes** (only release in the window; remediation chain reporter-verified as fixed — the strongest closed-loop signal in the ecosystem) and **QwenPaw** (parallel feature sprint — QwenPaw-Data 0.3, visual compaction — plus security tightening; 22–31% closure ratios are healthy).
- **Tier 3 — Deliberate consolidation:** **ZeroClaw**. Pre-release merge freeze with maturing governance (RFC voting reform, expedited merge lanes, contributor ladder), but the maintainer decision queue is the project's acknowledged bottleneck.
- **Tier 4 — Maintenance/internal:** **IronClaw**. Healthy Dependabot cadence and benchmark observability, but no community and no shipped substance — likely an internal-harness phase.

**Maturity paradox worth noting:** ZeroClaw is the most *processually* mature (governance, invariants, contributor ladder) at the smallest assistant scale, while OpenClaw has the most *operationally* mature tooling with the weakest regression containment. Hermes shows the healthest contributor trajectory — users now arrive with patch-level PRs, not just tickets.

---

## 7. Trend Signals

1. **Uptime engineering has replaced the feature race.** The dominant bugs everywhere are days-scale degradations (zombie processes, WAL bloat, memory creep, event-loop stalls) — evidence the category has shifted from demos to production deployment.
2. **MCP is simultaneously the universal integration surface and the universal failure surface** (all five projects). Timeout isolation, connection recovery, and error-envelope standardization are now table stakes for any agent runtime.
3. **Self-update is an incident class of its own.** Deferred-restart semantics, rollback, runtime verification, and user-data preservation during distribution are unsolved across OpenClaw, Hermes, and QwenPaw — a greenfield opportunity for shared tooling.
4. **Zero tolerance for silent failure.** Users explicitly demand loud errors: no-op trait defaults (ZeroClaw #10842), "completed with no content" (QwenPaw #7715), cron daemons dying silently (Hermes #111010), single-attempt dead-lettering (OpenClaw #125764).
5. **Content-boundary hygiene is a trust issue.** Model narration leaking into DMs and multimodal placeholders reaching end users (OpenClaw #25592, ZeroClaw #10625/#10854) show that separating *model-visible* from *user-deliverable* content needs to be an architectural primitive, not a patch.
6. **Agent containment economics.** Iteration budgets, soft timeouts, and doom-loop gates across three projects reflect rising cost/latency sensitivity — provider prompt-cache breakage (OpenClaw #102175, Hermes #105236) compounds this directly.
7. **Local-first/edge appetite.** ZeroClaw's household edge-mesh RFC and OpenClaw's WearOS/mobile gateway companions signal demand for compute sovereignty beyond a single host.
8. **Benchmark-attributed model quality.** IronClaw's failure taxonomy separating harness bugs from model failures (DeepSeek-V4-Flash navigation) previews the observability layer agent builders will need as model choice becomes a tunable.

**Bottom line for builders:** the differentiating work in this ecosystem over the next quarter is reliability infrastructure — MCP fault isolation, multi-writer state guards, safe self-update, and content-boundary enforcement — and the project that industrializes these first (Hermes is closest on verification loop-closure; OpenClaw has the scale to force the issue) will set the reference pattern.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-15

## Today's Overview

Hermes Agent shows **elevated development velocity and concentrated stability work** in the 24h window, with 50 issues and 50 PRs touched and the release of v0.21.3 — a patch that rolls up ~338 merged PRs since v0.21.2 into a stable tagged build for downstream Docker/Cloud consumers. Activity skews heavily toward bug remediation rather than feature expansion: of the open issues, the majority cluster around three systemic pain points — `state.db` corruption under multi-writer WAL, gateway/cron lifecycle handling during fleet restarts, and profile-distribution logic that wipes user skills on update. The backlog carries several **P1 production-affecting bugs** still open, including cron silently dying on startup ([#111010](https://github.com/NousResearch/hermes-agent/issues/111010)) and delivery obligations never being retried on a live gateway ([#91653](https://github.com/NousResearch/hermes-agent/issues/91653)), while the prompt-cache and WAL fix chain has begun to land in commits. Maintainers appear to be triaging a coordinated, multi-PR push against the database-corruption class.

## Releases

**v0.21.3 (v2026.9.14)** — released 2026-09-14. This is a **patch / consolidation tag**, not a feature release. It bundles ~338 PRs merged since v0.21.2 into a tagged build for downstream consumers (Docker images, Hermes Cloud, hosted deployments). The release notes emphasize **remote-gateway sign-in fixes** as the primary motivation for the cut.

- **Breaking changes:** None documented.
- **Migration notes:** Standard upgrade path; the v0.21.2 → v0.21.3 jump primarily affects downstream packaging and sign-in flows. Users should consult #107402 regarding deferred-restart behavior on `hermes update` from inside a gateway process.
- **Notable included fixes** (inferred from merged PR activity): WAL hand-off chain ([#109841](https://github.com/NousResearch/hermes-agent/pull/109841), [#110544](https://github.com/NousResearch/hermes-agent/pull/110544)), `command_allowlist` rule-key matching, Slack clarification-card cancellation, terminal approvals false-positive, `relativeTime`/`ago` V8 finite-value guards.

## Project Progress

**Merged / closed in window (4 of 50):**
- [#103339](https://github.com/NousResearch/hermes-agent/issues/103339) — *closed*: Second-writer corruption via `doctor --fix` / `repair_state_db_schema`; the lazy flock single-writer gate proposal has been verified in the field, closing out a branch of the multi-writer corruption class.
- [#105236](https://github.com/NousResearch/hermes-agent/issues/105236) — *closed*: Consolidated prompt-cache breakage investigation; five cache root causes plus one related non-cache finding were triaged and resolved.
- [#96776](https://github.com/NousResearch/hermes-agent/issues/96776) — *closed*: `approvals` hardline block false-positive on grep bracket class containing a quote.
- [#75281](https://github.com/NousResearch/hermes-agent/pull/75281) — *closed*: Native workflow aggregates (Kanban). Closed rather than merged, suggesting the maintainers declined the scope or redirected the work.
- [#111024](https://github.com/NousResearch/hermes-agent/pull/111024) — *closed*: V8 "Invalid time value" deprecation guards (extracted from [#108179](https://github.com/NousResearch/hermes-agent/issues/108179)).

**Active PRs advancing today (open, 46):**
- [#111040](https://github.com/NousResearch/hermes-agent/pull/111040) — Feishu inbound dedup flush moved onto adapter-owned pool (fixes "dead default executor" family).
- [#111031](https://github.com/NousResearch/hermes-agent/pull/111031) — Cross-surface auto-yield with preemptible, epoch-fenced session leases in `tui_gateway`.
- [#110854](https://github.com/NousResearch/hermes-agent/pull/110854) — `hermes gateway migrate --multiplex` preserves the system service `User=` identity.
- [#110933](https://github.com/NousResearch/hermes-agent/pull/110933) — **P1 fix**: profile distribution now *merges* skills on update rather than deleting the existing tree — directly addresses [#110920](https://github.com/NousResearch/hermes-agent/issues/110920).
- [#110859](https://github.com/NousResearch/hermes-agent/pull/110859) — PTY session recovery after socket send failures (desktop dashboard).
- [#111022](https://github.com/NousResearch/hermes-agent/pull/111022) — Codex OAuth usage endpoint recovery after revoked-token 401.
- [#111037](https://github.com/NousResearch/hermes-agent/pull/111037) — Display-metadata writes (reactions) no longer rewrite entire session history.
- [#111035](https://github.com/NousResearch/hermes-agent/pull/111035) — Soft-timeout for background tasks (wake the agent instead of killing).
- [#111036](https://github.com/NousResearch/hermes-agent/pull/111036) — Opt-in approval gate for persistent control-file changes.
- [#92122](https://github.com/NousResearch/hermes-agent/pull/92122) — Linux `.desktop` launcher resolves a Hermes-capable interpreter reliably.

## Community Hot Topics

The discussion is dominated by users documenting **field-verified corruption** and proposing concrete mitigations, with three issues generating the most back-and-forth:

1. **[#107402 — `hermes update` leaves a permanent "did not restart running gateways" warning (17 comments, P1)](https://github.com/NousResearch/hermes-agent/issues/107402)** — Author Rotifunk. The core UX issue: when updating from inside the gateway's own process tree, the restart is correctly deferred until in-flight work finishes, but the updater verifies the fleet *immediately* and stamps `state: stale`, ending the run `partial` and leaving a permanent `fleet_restart…` warning. *Underlying need:* a clear "deferred restart" terminal state that does not read as failure, plus reporter clarity on what `partial` means.
2. **[#109966 — WAL generation hand-off leaves long-lived holders on deleted `-wal/-shm` and blocks every new opener (11 comments, P2)](https://github.com/NousResearch/hermes-agent/issues/109966)** — Author SuperMax110. A reporter update confirms the WAL hand-off chain is **no longer reproducible** on `743140cd8` after [#109841](https://github.com/NousResearch/hermes-agent/pull/109841) and [#110544](https://github.com/NousResearch/hermes-agent/pull/110544) landed. *Underlying need:* closing the issue once the remaining hand-off paths are covered; this is a positive signal that the database-corruption remediation push is taking effect.
3. **[#100896 — Recurring `state.db` corruption × 4 in 5 weeks (10 comments, P1)](https://github.com/NousResearch/hermes-agent/issues/100896)** — Author bronder. A data point in the corruption cluster (#90837, #100313, #89737). The author surfaces two new elements: a **7-minute-early warning signature** ("5 live SessionDB handles"), and the observation that `journal_mode=delete` contains the corruption but loses WAL concurrency benefits. *Underlying need:* a single authoritative multi-writer guard and observable telemetry before onset.
4. **[#103339 (CLOSED) — Second writer via `doctor --fix` corrupts live-WAL `state.db` (9 comments)](https://github.com/NousResearch/hermes-agent/issues/103339)** — Author RChina. Closed after the lazy-flock single-writer gate was field-verified. A canonical example of a user supplying both reproduction and patch-level fix.
5. **[#79649 — npm vulnerabilities in agent-browser / web / ui-tui (8 comments, P2)](https://github.com/NousResearch/hermes-agent/issues/79649)** — Long-running thread; `hermes doctor --fix` reports 6 vulnerabilities that do not go away after `npm audit fix` because workspace pinning is broken. *Underlying need:* an automated lockfile refresh in the install path.

**Underlying theme:** users are increasingly *proposing code-level fixes* alongside their bug reports (lazy flock, soft-timeout wrappers, opt-in approval gates, merge-not-delete distribution) — the community is now contributing at the patch-PR level, not just filing tickets.

## Bugs & Stability

Ranked by severity (P1 first). Each row notes whether a fix PR exists in the open set:

| Sev | Issue | Title | Fix PR |
|---|---|---|---|
| **P1** | [#107402](https://github.com/NousResearch/hermes-agent/issues/107402) | `hermes update` leaves "did not restart running gateways" warning | None open |
| **P1** | [#100896](https://github.com/NousResearch/hermes-agent/issues/100896) | `state.db` corruption ×4 in 5 weeks (multi-writer WAL) | Partial — WAL hand-off chain landed ([#109841](https://github.com/NousResearch/hermes-agent/pull/109841), [#110544](https://github.com/NousResearch/hermes-agent/pull/110544)); lazy flock single-writer gate closed in [#103339](https://github.com/NousResearch/hermes-agent/issues/103339) |
| **P1** | [#91653](https://github.com/NousResearch/hermes-agent/issues/91653) | Failed delivery obligations never retried while owning process alive | None open |
| **P1** | [#110920](https://github.com/NousResearch/hermes-agent/issues/110920) | Profile distribution wipes skills on update | **Yes** — [#110933](https://github.com/NousResearch/hermes-agent/pull/110933) (merge-instead-of-delete) |
| **P1** | [#111010](https://github.com/NousResearch/hermes-agent/issues/111010) | Cron scheduler daemon thread silently dies on gateway startup | None open |
| P2 | [#109966](https://github.com/NousResearch/hermes-agent/issues/109966) | WAL hand-off blocks every new opener (now non-reproducible) | Landed |
| P2 | [#79649](https://github.com/NousResearch/hermes-agent/issues/79649) | npm vulnerabilities not auto-fixed | None open |
| P2 | [#46771](https://github.com/NousResearch/hermes-agent/issues/46771) | Hermes incompatible with modern Qwen CLI OAuth (v0.18.1) | None open |
| P2 | [#110970](https://github.com/NousResearch/hermes-agent/issues/110970) | Managed SSH update leaves connection paused forever (Windows) | None open |
| P2 | [#99631](https://github.com/NousResearch/hermes-agent/issues/99631) | `cron list` false "Gateway not running" on profile-scoped homes | None open |
| P2 | [#96180](https://github.com/NousResearch/hermes-agent/issues/96180) | `hermes update` rebuilds venv, drops optional messaging extras → cron Telegram fails | None open |
| P2 | [#110985](https://github.com/NousResearch/hermes-agent/issues/110985) | Turn lease leaked by `/stop` wedges session until restart | None open |
| P2 | [#108564](https://github.com/NousResearch/hermes-agent/issues/108564) | Bot-mode DM to `default` profile resolves into `profiles/default/` | None open |
| P2 | [#110961](https://github.com/NousResearch/hermes-agent/issues/110961) | `command_allowlist` rule keys are inert | None open |
| P2 | [#111022 (auth)](https://github.com/NousResearch/hermes-agent/pull/111022) | Codex usage 401 after revoked token | **Yes** — [#111022](https://github.com/NousResearch/hermes-agent/pull/111022) |
| P3 | [#99640](https://github.com/NousResearch/hermes-agent/issues/99640) | Plugin context-engine cloning ignores `clone_for_agent()` | None open |
| P3 | [#110402](https://github.com/NousResearch/hermes-agent/issues/110402) | Hermes ignores loaded skill files (skill-adherence) | None open |
| P3 | [#110996](https://github.com/NousResearch/hermes-agent/issues/110996) | Cards created under blocked parent are unclaimable | None open |
| P3 | [#111012](https://github.com/NousResearch/hermes-agent/issues/111012) | Langfuse SDK plugin: placeholder API key silent failure | None open |
| P3 | [#58425](https://github.com/NousResearch/hermes-agent/issues/58425) | Feishu batch flush errors surface as unhandled loop exceptions | **Partial** — inbound side fixed by [#111040](https://github.com/NousResearch/hermes-agent/pull/111040); Feishu adapter exception consumption still open |
| P3 | [#110979](https://github.com/NousResearch/hermes-agent/issues/110979) | Intact `/steer` OOB marker on short tool result misread as corrupted | None open |
| P3 | [#50305](https://github.com/NousResearch/hermes-agent/issues/50305) | (Feature, see below) | — |

**Summary of fix coverage:** Of 7 P1 bugs in the active set, only 2 have open fix PRs (skills-wipe and Codex auth, the latter is P2). The remaining five P1s — deferred-restart warning, recurring state.db corruption on multi-writer, unrecovered delivery obligations, skills-wipe-on-distribution, and silent cron death — are all open without an in-flight PR. This is the single largest maintainer-side gap.

## Feature Requests & Roadmap Signals

**Likely v0.21.4 (or v0.22) candidates** (open PRs with maintainer interest or close-to-merge quality):
- [#111031](https://github.com/NousResearch/hermes-agent/pull/111031) — *Cross-surface auto-yield, preemptible session leases* (`tui_gateway`). High-traffic architecture change, multiple component tags (agent/gateway/tui), session-state and message-delivery sweepers flagged.
- [#111036](https://github.com/NousResearch/hermes-agent/pull/111036) — *Opt-in approval gate for persistent control-file changes*. Default-off; addresses a security-boundary class.
- [#111035](https://github.com/NousResearch/hermes-agent/pull/111035) — *Soft-timeout for background tasks*. Direct user request; replaces the current ~10-minute hard kill with a wake-the-agent flow.
- [#110824](https://github.com/NousResearch/hermes-agent/pull/110824) — *Opt-in full terminal commands*, with secret redaction and Slack task-card progress. Configurable at global and per-platform scope.
- [#90964](https://github.com/NousResearch/hermes-agent/pull/90964) — *Discord configurable rich presence activity*.
- [#111023](https://github.com/NousResearch/hermes-agent/pull/111023) — *Open files with OS default app* in desktop file tree / preview rail.

**User-submitted feature requests awaiting triage** (open issues, ranked by likelihood of near-term inclusion):

| Issue | Title | Predict |
|---|---|---|
| [#110868](https://github.com/NousResearch/hermes-agent/issues/110868) | Trigger-based module loading for user `AGENTS.md` (cache-safe, pre-LLM injection) | **High** — addresses concrete pain (129 KB persona files silently truncated), cache-safe framing fits existing prompt-builder patterns |
| [#67031](https://github.com/NousResearch/hermes-agent/issues/67031) | Support per-channel `reasoning_effort` in `channel_overrides` | **High** — small, well-scoped extension to existing `channel_overrides` schema, already has a 👍 |
| [#110976](https://github.com/NousResearch/hermes-agent/issues/110976) | Expose MCP reload via signal / control-socket (no chat message needed) | **Medium** — operationally important, but touches gateway core |
| [#110662](https://github.com/NousResearch/hermes-agent/issues/110662) | Desktop attachment storage follows configured profile workspace | **High** — small fix, clear UX win, profile-aware |
| [#50305](https://github.com/NousResearch/hermes-agent/issues/50305) | Show remaining OpenRouter credit in terminal banner | **Medium** — purely additive |
| [#110402](https://github.com/NousResearch/hermes-agent/issues/110402) | Hermes ignores loaded skill files (skill-adherence) | **High** for users; classified needs-repro |

**Not in this window but adjacent:** [#106460](https://github.com/NousResearch/hermes-agent/issues/106460) (Bot Mode group threads sharing one session — salvage PR #93580) is part of the `from-pain-miner` cluster and likely informs the cross-surface lease work in [#111031](https://github.com/NousResearch/hermes-agent/pull/111031).

## User Feedback Summary

**Dominant pain points (verbatim themes):**

- *Database integrity in multi-process deployments.* The state.db / WAL / multi-writer corruption class is by far the loudest theme. At least four separate issues (#100896, #103339, #109966, #91653-adjacent) describe production data loss with field reproduction. Users are reporting exact warning signatures (e.g. "5 live SessionDB handles" 7 minutes before onset) and proposing patch-level fixes. *Satisfaction signal:* the fix chain is landing — [#109966](https://github.com/NousResearch/hermes-agent/issues/109966)'s reporter marked the WAL hand-off chain as no longer reproducible on the latest commit, and [#103339](https://github.com/NousResearch/hermes-agent/issues/103339)

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-15

## 1. Today's Overview

IronClaw shows **moderate, maintenance-leaning activity** over the last 24 hours, with 1 issue and 6 pull requests updated. The pipeline is dominated by automated dependency bumps (4 of 6 active PRs are Dependabot), consistent with a healthy but low-velocity day. Substantive engineering attention is concentrated on a single MCP egress diagnostic fix, while a freshly opened daily failure-taxonomy report surfaces a 43-task failure cluster in the `officeqa` benchmark suite that is largely attributed to model-quality errors in `DeepSeek-V4-Flash`. No releases were cut, and overall engagement metrics (comments/reactions) are at zero across the board.

## 2. Releases

*No new releases in the last 24 hours.*

## 3. Project Progress

The only closed/merged PR in the window was a routine dependency bump that was effectively superseded by a follow-up:

- **[#8097](https://github.com/nearai/ironclaw/pull/8097) — closed (2026-09-13)**: Dependabot batch of 24 Rust dependency updates in the `everything-else` group (e.g., `uuid 1.24.0→1.26.0`). Closed without merge, replaced by the newer superseding PR.
- **[#8099](https://github.com/nearai/ironclaw/pull/8099) — open (2026-09-13)**: Successor batch in the same group with 25 updates (`uuid 1.24.0→1.26.1`, `base64 0.22.1→0.23.1`, etc.), now the live candidate for that dependency lane.

No feature PRs merged today; the pipeline shows a clean but slow state with no user-facing deliverables shipped.

## 4. Community Hot Topics

Engagement is unusually low: **zero comments and zero reactions** on every item updated in the window. The most substantively discussed thread, by virtue of being the only non-dependency update, is:

- **[#8100 — Daily ironclaw failure taxonomy — 2026-09-14](https://github.com/nearai/ironclaw/issues/8100)** (pranavraja99, opened 2026-09-14): Categorizes non-passing tasks across suites, flagging that 43 of the failures in `officeqa` are predominantly genuine model-quality errors stemming from `DeepSeek-V4-Flash` navigation behavior.

The lack of replies indicates the issue likely serves as an internal/observability artifact rather than a community-discussed thread. Underlying need: structured, recurring visibility into benchmark regressions to separate harness failures from model-quality issues.

## 5. Bugs & Stability

| Severity | Item | Status | Notes |
|----------|------|--------|-------|
| Medium | [PR #8077 — fix(mcp): classify response leak diagnostics](https://github.com/nearai/ironclaw/pull/8077) | Open, updated 2026-09-14 | Closes [#8009](https://github.com/nearai/ironclaw/issues/8009). Centralizes the `response_leak_blocked` sentinel in `ironclaw_host_api::http` and teaches the MCP lane to classify it distinctly. Addresses a security-adjacent correctness gap where host leak-blocking could collide with MCP-visible error semantics. |
| Low (observability) | [Issue #8100 — Failure taxonomy](https://github.com/nearai/ironclaw/issues/8100) | Open | Not a defect per se, but a 43-task failure cluster in `officeqa` suggests ongoing stability concerns with the `DeepSeek-V4-Flash` model on navigation-heavy tasks. No fix PR linked. |

No crashes or regressions were filed by external users today. The MCP fix is the only active corrective change and carries no associated risk flags.

## 6. Feature Requests & Roadmap Signals

No explicit feature requests appear in the 24-hour window. However, two implicit roadmap signals can be inferred:

1. **MCP diagnostic hardening (PR #8077)** — The refactor that centralizes a shared sentinel and reintroduces MCP-classifiable error reasons suggests an ongoing investment in the MCP integration surface. Likely next steps: extending the same pattern to additional egress lanes or adding structured error reasons to MCP tool responses.
2. **Daily failure taxonomy (Issue #8100)** — The existence of a recurring, automated failure-classification issue series points to an internal quality dashboard / reporting pipeline (linked to `nearai.github.io/benchmarks`). A reasonable prediction is that this taxonomy may be promoted into a CI-gated report or release-blocking check in a future version.

## 7. User Feedback Summary

The 24-hour data window contains effectively **no end-user feedback**: zero comments, zero reactions, and the single human-authored issue (#8100) reads as an internal QA post rather than user-reported pain. Pain points and use cases are therefore not directly observable in this snapshot. The closest signal is the dependency churn itself, which suggests downstream consumers may face recurring lockfile updates — a low-grade friction point typical of a rapidly evolving Rust codebase.

## 8. Backlog Watch

Items updated in the last 24 hours that have lingered without resolution and warrant maintainer attention:

- **[PR #7834 — chore(deps): bump the wasm group (4 updates)](https://github.com/nearai/ironclaw/pull/7834)** — Created **2026-08-23**, refreshed on 2026-09-13. ~3 weeks old. Tagged `size: L`, `risk: medium`, `contributor: experienced`. Touches `wasmtime`, `wasmtime-wasi`, `wit-component`, `wit-parser`. The size and risk labels combined with the staleness suggest this may need a maintainer review or a rebase before it can land.
- **[PR #8077 — fix(mcp): classify response leak diagnostics](https://github.com/nearai/ironclaw/pull/8077)** — Open since 2026-09-06. Closes an issue (#8009) and is the only non-dependency substantive change in flight; lack of reviews is the bottleneck.
- **[PR #8078 — chore(deps): bump the tokio-ecosystem group](https://github.com/nearai/ironclaw/pull/8078)** — Open since 2026-09-06 alongside #8077/#8079; part of the same Dependabot cluster that has not converged.
- **[PR #8079 — chore(deps): bump the actions group (6 updates)](https://github.com/nearai/ironclaw/pull/8079)** — Open since 2026-09-06; includes a notable bump of `actions/setup-node 4.0.2→7.0.0`, which is a major-version jump warranting a glance at CI compatibility.

**Project health signal**: Activity is steady but not novel. The Dependabot cadence is healthy (regular bumps landing within ~3 days of availability), but the lack of merged substantive work and zero community engagement in the window suggests IronClaw is in a stabilization or internal-harness-iteration phase rather than an active community-release cycle.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-15

## 1. Today's Overview

QwenPaw (github.com/agentscope-ai/QwenPaw) shows **high-velocity maintenance activity** with 45 issues and 50 PRs touched in the trailing 24 hours, though no new releases shipped. The open/closed ratio is healthy: 14 of 45 issues (31%) were closed and 11 of 50 PRs (22%) were merged/closed. Work is concentrated in three themes: (1) **memory subsystem stability** (vector-store sync, ReMe/dream digest interaction, long-running memory growth), (2) **MCP/ACP protocol hardening** (Java SDK compatibility, permission-option parsing, HTTP error framing), and (3) **security tightening on Windows Desktop & Hub** (local-API authentication, audit logging, file-preview auth). A cluster of UX complaints from a single power user (xiaohushi512) around model-config loss, session loss, and workspace-path reset is the most visible end-user pain point.

## 2. Releases

No new releases in the past 24 hours. The most recent line visible in active issues/PRs is **v2.2.1 / v2.2.1-beta.2** (Desktop, Windows & macOS), which remains the development target for the current bug-fix wave.

## 3. Project Progress

Eleven PRs were merged/closed in the last 24 hours (specific items not all surfaced in the top-20 listing). Substantive **open-but-active PRs** advancing the codebase include:

- **[#7637](https://github.com/agentscope-ai/QwenPaw/pull/7637)** — *feat(qwenpaw-data): QwenPaw-Data app 0.3.0*: integrates QPD 0.3 as managed/external analysis engine and embeds the Data Console as the primary PawApp UI. A significant architectural change (new first-party analytics surface).
- **[#7704](https://github.com/agentscope-ai/QwenPaw/pull/7704)** — *feat(console): move chat files drawer to the right*: directly addresses the user feature request [#7739](https://github.com/agentscope-ai/QwenPaw/issues/7739); rewires resize handle, motion, and adds a regression assertion for right-side pointer resize.
- **[#7750](https://github.com/agentscope-ai/QwenPaw/pull/7750)** — *feat(console): show send_file_to_user files in response artifact list*: surfaces delivered files outside the collapsed "Completed N steps" group.
- **[#7681](https://github.com/agentscope-ai/QwenPaw/pull/7681)** — *fix(console): persist sidebar collapsed state across reloads*: fixes state held only in `useState` and reset by the mobile viewport effect.
- **[#7703](https://github.com/agentscope-ai/QwenPaw/pull/7703)** — *feat(context): Improving visual compaction*: scoped compaction (history, system, tool schemas, tool results), stable image batches, source-text recall, readable compression presets.
- **[#7752](https://github.com/agentscope-ai/QwenPaw/pull/7752)** — *fix(console): make vi and pt-BR language selection work*: backend `_VALID_LANGUAGES` was missing two of seven languages advertised.
- **[#7753](https://github.com/agentscope-ai/QwenPaw/pull/7753)** — *fix(skill): update make-skill to v2.1*: requires persisted `plan_id` from `create_plan.py` before draft creation.
- **[#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729)** — *fix(mcp): recognize Java jsonRpcError envelope on discover probe*: fixes [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728).
- **[#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735)** — *fix(mcp): preserve decoded HTTP error responses*: fixes [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716).
- **[#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732)** — *fix(acp): select permission options by protocol kind*: fixes #7726 root cause.
- **[#7748](https://github.com/agentscope-ai/QwenPaw/pull/7748)** — *fix: preserve loop warnings and correct budget and overflow recovery*: doom-loop warnings, budget reads, overflow reset.
- **[#7769](https://github.com/agentscope-ai/QwenPaw/pull/7769)** — *fix(desktop): authenticate local API requests in the native host*: process-scoped Desktop session required before business handlers run.
- **[#7683](https://github.com/agentscope-ai/QwenPaw/pull/7683)** — *fix(hub): audit login attempts and denied runtime creation*.
- **[#7766](https://github.com/agentscope-ai/QwenPaw/pull/7766)** — *fix(hub): authenticate native file preview requests*.
- **[#7770](https://github.com/agentscope-ai/QwenPaw/pull/7770)** — *fix(pawport): restore the missing PawPort entry in More settings*.
- **[#7763](https://github.com/agentscope-ai/QwenPaw/pull/7763)** — *fix(plugins): handle catalog response read failures* (fixes [#7730](https://github.com/agentscope-ai/QwenPaw/issues/7730)).
- **[#7751](https://github.com/agentscope-ai/QwenPaw/pull/7751)** — *fix(docker): align app Python runtime with desktop* (Python 3.11 standalone, OpenSSL pinned).
- **[#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723)** — *fix(console): emit an error event when stream_one fails*.
- **[#7682](https://github.com/agentscope-ai/QwenPaw/pull/7682)** — *fix(console): use semantic tokens in SettingsCenter* (21 dangling `var(--color*)` references after [#7487](https://github.com/agentscope-ai/QwenPaw/issues/7487)).
- **[#7211](https://github.com/agentscope-ai/QwenPaw/pull/7211)** — *fix(runtime): prevent injected context from persisting as user chat history*.

## 4. Community Hot Topics

**Issues with most comments / engagement (last 24h, top 6):**

1. **[#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709)** (6 comments) — Scheduled-task output silently collapsed into `thinking`/steps, sometimes lost entirely. A quality-of-output regression on v2.2.1.
2. **[#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)** (6 comments) — `spawn subAgent` universally times out on Windows 2.2.0 regardless of timeout setting. Core multi-agent functionality is broken for this user.
3. **[#7571](https://github.com/agentscope-ai/QwenPaw/issues/7577)** (6 comments) — Agent "forgets" path constraints (A=source, B=workspace, C=runtime); produces TODO files across all three paths and even develops in the wrong deployment path, causing overwrites.
4. **[#7660](https://github.com/agentscope-ai/QwenPaw/issues/7660)** (4 comments) — Installation failure (screenshot only; root cause not yet identified).
5. **[#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722)** (4 comments) — Three compounding memory-exhaustion paths (unbounded stream buffers, keep-alive instance stacking, doom-loop gate evasion). Author provided controlled repro + minimal fixes.
6. **[#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715)** (4 comments) — ReMe `daily_paper` cron fails silently when arxiv.org is unreachable; misleads user with "completed with no returned content" instead of surfacing `httpx.ConnectError`.

**Underlying needs surfaced:** reliable multi-agent spawning, **deterministic memory + path discipline**, transparent error reporting (no silent "completed with no content"), and **UI space efficiency** on small laptops ([#7739](https://github.com/agentscope-ai/QwenPaw/issues/7739)).

## 5. Bugs & Stability

Ranked by severity (P0 = data loss / OOM in production; P1 = broken feature; P2 = UX/data integrity; P3 = cosmetic).

| Sev | Issue | Component | Fix PR / Status |
|---|---|---|---|
| **P0** | [#7222](https://github.com/agentscope-ai/QwenPaw/issues/7222) — backend memory grows to **20.7 GB** over ~2 days | Backend runtime | Open; related [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) offers minimal patches |
| **P0** | [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) — three compounding memory-exhaustion paths, ~1 MB/s growth → OOM | Backend / MCP keep-alive | Open; repro + minimal fixes supplied |
| **P0** | [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) — **session loss** after plugin redeploy + shutdown; **model config also wiped** | Desktop Windows | Open; user reports repeated occurrence |
| **P1** | [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) — `spawn subAgent` always times out | Multi-agent runtime | Open |
| **P1** | [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) — configured model "lost" mid-session, requires re-selection | Desktop config persistence | Open; likely same root cause as #7724 |
| **P1

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-15

## 1. Today's Overview

ZeroClaw is in an active stabilization phase centered on the v0.8.5 release line, with governance work (RFC/ADR processes) advancing in parallel with bug-fix velocity. The repository shows healthy triage throughput: 26 issues touched (20 still open, 6 closed) and 50 PRs touched (48 still open, 2 closed) within the last 24 hours, but **zero new releases** — signaling that work is consolidating rather than shipping. The mix is heavily weighted toward security hardening (provider headers, daemon diagnostics, config validation), channel ergonomics (Telegram, Matrix, WhatsApp, XMPP), and architectural governance (RFC voting simplification, execution-tree budgets, agent lifecycle coordination). Overall project health appears strong but pre-release: maintainers are deliberately deferring merges while closing out review/follow-up items before cut.

## 2. Releases

**No new releases in the last 24 hours.** The v0.8.5 weekly stabilization line ([Issue #9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)) remains the active milestone; intake froze August 4, 2026 and weekly cuts are shipping ready work without waiting on every milestone item.

## 3. Project Progress

Two PRs moved to closed state in the trailing 24 hours:

- **[PR #9678 — fix(config): harden Git shell policy arguments](https://github.com/zeroclaw-labs/zeroclaw/pull/9678)** (closed, `security:policy`, risk:high, size:XL). Normalizes command words at the policy boundary so executable allowlisting, Git risk classification, environment-assignment checks, and workspace-path inspection share one quote- and escape-aware representation. **Notable as security-relevant closure.**
- **[PR #10747 — refactor(channels): build every channel's transcription manager one way](https://github.com/zeroclaw-labs/zeroclaw/pull/10747)** remains OPEN but is the canonical consolidation that resolved four serially-fixed identical bugs (#9153, #10032, #10487, #10494) across eight native channels.

Six issues closed in the same window — all bug-class:

- [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) — OpenCode providers missing `x-opencode-session` header (S1, fixed via #10604).
- [#10232](https://github.com/zeroclaw-labs/zeroclaw/issues/10232) — Daemon diagnostics dropping the underlying error chain.
- [#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721) — `knowledge.db_path` tilde expansion as a global replace (S2).
- [#10324](https://github.com/zeroclaw-labs/zeroclaw/issues/10324) — cron manual trigger check-then-act race across agent rename (S2, security).
- [#10087](https://github.com/zeroclaw-labs/zeroclaw/issues/10087) — memory-postgres tests running in required CI.
- [#10837](https://github.com/zeroclaw-labs/zeroclaw/issues/10837) — RPC `config/set` skipping validation (dup of #10320).

The closed-set is overwhelmingly **observability, validation, and security hardening**, not feature work — consistent with a stabilization line.

## 4. Community Hot Topics

Most active threads by comment count and reactions:

| Item | Type | Activity | Why it matters |
|------|------|----------|----------------|
| [Issue #8692 — Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | Tracker | 15 comments | The literal decision queue for governance. Bottleneck of the project — anything stuck here is the project's stuck-work. |
| [Issue #10549 — RFC: Simplify RFC voting](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) | RFC | 10 comments | Acknowledges friction in the current RFC process — fixed timers that "often do not produce more review." Stacked with [PR #10855](https://github.com/zeroclaw-labs/zeroclaw/pull/10855). |
| [Issue #10366 — RFC: Clarify PR review evidence & freshness warnings](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) | RFC | 8 comments | Adds an expedited merge lane and stricter freshness rules. Revision 2 dated 2026-08-27 — this is governance plumbing for fast-moving PRs. |
| [Issue #10603 — OpenCode providers never send x-opencode-session](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) | Bug (S1) | 3 comments, 3 👍 | Highest-reaction item in the window. Risk of OpenAI account flagging drove urgency — closed with fix. |
| [Issue #10360 — RFC: opt-in household edge mesh](https://github.com/zeroclaw-labs/zeroclaw/issues/10360) | RFC | 4 comments | Cross-host compute sharing without buying a GPU. Distinctly a *user-pull* signal — many operators have idle hardware. |
| [Issue #10625 — `[media attachment]` placeholder leaking](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) | Bug (S2) | 3 comments | UX-facing: literal placeholder reaching end users in non-vision flows. |

Underlying need: contributors are voting with comments on **process (RFCs, merge lanes)** as much as on code — indicating a maturing project where governance lag is starting to dominate technical review.

## 5. Bugs & Stability

Ranked by severity (S1 first), with fix availability noted:

| Severity | Issue | Component | Fix status |
|----------|-------|-----------|-----------|
| **S1** | [#10854 — Literal image marker promoted into malformed provider image](https://github.com/zeroclaw-labs/zeroclaw/issues/10854) | provider | **No PR yet** (opened today, 0 comments) |
| **S1** | [#10807 — MCP connection permanently poisoned by one failed recovery](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) | tools (MCP) | No PR yet |
| S1 | [#10603 — OpenCode `x-opencode-session` header missing](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) | provider | **Closed via #10604**; follow-ups tracked in [#10853](https://github.com/zeroclaw-labs/zeroclaw/issues/10853) |
| S2 | [#10625 — `[media attachment]` placeholder leaked to users](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) | channel (Matrix) | No PR yet |
| S2 | [#10821 — `zeroclaw service logs` shows stale stderr](https://github.com/zeroclaw-labs/zeroclaw/issues/10821) | runtime/daemon | No PR yet |
| S2 | [#10842 — Telegram reaction tool silently no-ops](https://github.com/zeroclaw-labs/zeroclaw/issues/10842) | channel (Telegram) | No PR yet |
| S2 | [#10320 — `config set` / RPC persist values without validation](https://github.com/zeroclaw-labs/zeroclaw/issues/10320) | config / CLI / RPC | Partial fix landed via #10837; sibling [#10822](https://github.com/zeroclaw-labs/zeroclaw/issues/10822) proposing atomic `config/set-many` |
| S3 | [#10828 — `openai-codex --device-code` returns 404](https://github.com/zeroclaw-labs/zeroclaw/issues/10828) | gateway/api | No PR yet |
| S3 | [#10585 — log sink regression races migration tests](https://github.com/zeroclaw-labs/zeroclaw/issues/10585) | tooling/ci | No PR yet |
| S3 | [#10805 — control_plane liveness tests race on Windows](https://github.com/zeroclaw-labs/zeroclaw/issues/10805) | tooling/ci | No PR yet |

**Stability signal:** Two new S1 bugs in 24 hours with no linked PR — MCP recovery poisoning and image-marker preprocessing. The MCP issue is particularly concerning because it affects every user with an upstream tool server.

## 6. Feature Requests & Roadmap Signals

User-driven and maintainer-proposed items with plausible v0.8.6+ landing paths:

| Signal | Item | Likelihood |
|--------|------|------------|
| Native XMPP/Prosody channel | [#9814](https://github.com/zeroclaw-labs/zeroclaw/issues/9814) | Medium — self-hosted home-lab community keeps asking; existing native-channel precedent (Matrix, Telegram, Discord) makes engineering cost bounded. |
| Household edge mesh (cross-host compute) | [RFC #10360](https://github.com/zeroclaw-labs/zeroclaw/issues/10360) | Medium — aligns with "local-first, hardware-capable" philosophy; `risk:high` and `p3` suggest deferral past v0.8.x. |
| Atomic `config/set-many` RPC | [#10822](https://github.com/zeroclaw-labs/zeroclaw/issues/10822) | **High** — direct follow-up to today's #10837 / #10320 closure; already in `in-progress`. |
| ZeroCode explicit session root | [#10826](https://github.com/zeroclaw-labs/zeroclaw/issues/10826) | High — continuation of recently-merged #10565. |
| WhatsApp PDF inline preview (`jpegThumbnail`/`pageCount`) | [#10812](https://github.com/zeroclaw-labs/zeroclaw/issues/10812) | Medium — UX-only, no protocol risk. |
| Anthropic refusal → typed fallback notices | [PR #9272](https://github.com/zeroclaw-labs/zeroclaw/pull/9272) | Medium — open since 2026-07-23, awaiting review. |
| Telegram `multi_message` streaming mode | [PR #8561](https://github.com/zeroclaw-labs/zeroclaw/pull/8561) | Medium — open since 2026-06-30, has feature parity with Discord/Matrix. |
| Native Hailo-Ollama provider | [PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) | Medium — adds a new provider class. |
| Matrix voice replies (MSC3245) | [PR #10489](https://github.com/zeroclaw-labs/zeroclaw/pull/10489) | Medium — completes TTS parity across channels. |
| Execution-tree iteration budgets | [PR #10351](https://github.com/zeroclaw-labs/zeroclaw/pull/10351) | **High** — large, distinguished-contributor PR in active review; central runtime safety feature. |
| Agent lifecycle coordination | [PR #10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621) | **High** — unifies RPC/gateway/channel/ACP mutation authority. The single biggest architectural PR currently open. |

## 7. User Feedback Summary

**Satisfaction drivers**
- Active governance (RFCs, ADRs, decision queue) gives contributors a visible process — multiple maintainers with "distinguished contributor" / "trusted contributor" / "principal contributor" tags indicate a working contributor ladder.
- Fast triage on S1 items (OpenCode header fixed within a day) shows responsiveness on blocking issues.

**Pain points surfaced today**
1. **Silent no-ops hiding in trait defaults.** [#10842](https://github.com/zeroclaw-labs/zeroclaw/issues/10842) (Telegram reaction) and [#10854](https://github.com/zeroclaw-labs/zeroclaw/issues/10854) (image marker promotion) reveal a pattern where inherited defaults produce no error and no work. Users want louder failures.
2. **Validation gaps in config writes.** Two open items (#10320, #10837) plus the [PR #10822 atomic-batch proposal](https://github.com/zeroclaw-labs/zeroclaw/issues/10822) show users are explicitly asking for **stronger invariants** at write surfaces — not just the GUI/CLI, but RPC.
3. **Multimodal edge cases are bleeding into user-visible output.** Both [#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) (placeholder leakage) and [#10854](https://github.com/zeroclaw-labs/zeroclaw/issues/10854) (malformed image promotion) are degradation paths the user shouldn't see.
4. **Test flakiness on Windows and under parallel runners.** [#10585](https://github.com/zeroclaw-labs/zeroclaw/issues/10585), [#10805](https://github.com/zeroclaw-labs/zeroclaw/issues/10805) — contributors can't land PRs cleanly through CI without retries.
5. **Hardware owner appetite for distributed compute.** RFC #10360 signals that hobbyist / home-lab operators feel constrained by single-host ceilings. This is a *use-case* emerging in user comments, not a maintainer push.

## 8. Backlog Watch

Items with high importance but stalled or awaiting maintainer action:

| Item | Opened | Why it needs attention |
|------|--------|------------------------|
| [PR #9272 — feat(anthropic): handle refusals with fallback notices](https://github.com/zeroclaw-labs/zeroclaw/pull/9272) | 2026-07-23 (54 days) | XL size, untouched in review; affects every Anthropic user on `stop_reason: refusal`. |
| [PR #8561 — feat(channels/telegram): add multi_message streaming mode](https://github.com/zeroclaw-labs/zeroclaw/pull/8561) | 2026-06-30 (77 days) | Long-standing parity gap with Discord/Matrix; not labeled `needs-author-action` but no maintainer-side movement. |
| [PR #9451 — refactor(observability)!: retire dormant DORA telemetry](https://github.com/zeroclaw-labs/zeroclaw/pull/9451) | 2026-07-27 | Breaking-change PR (`!`) — needs explicit maintainer sign-off; sitting idle. |
| [Issue #10320 — config set / RPC persist values without validation](https://github.com/zeroclaw-labs/zeroclaw/issues/10320) | 2026-08-24 | Although #10837 closed against it, the broader feature work (#10822) needs maintainer direction on RPC transactionality. |
| [Issue #10807 — MCP connection permanently poisoned by one failed recovery](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) | 2026-09-12 | **S1 with no PR** and no explicit maintainer review yet. Every MCP user is exposed. |
| [Issue #10854 — Literal image marker promoted into malformed provider image](https://github.com/zeroclaw-labs/zeroclaw/issues/10854) | 2026-09-14 (today) | S1, brand new, zero comments, no PR — risk that it ages. |
| [Issue #9814 — Native XMPP/Prosody channel](https://github.com/zeroclaw-labs/zeroclaw/issues/9814) | 2026-08-07 | Tagged `risk:high` and waiting 38+ days for maintainer triage despite clear user demand. |
| [Tracker #8692 — Maintainer decision queue](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 2026-07-04 | The bottleneck of bottlenecks — 15 comments suggests RFCs/designs are queueing faster than being resolved. Worth surfacing in the next maintainer sync. |

**Bottom line:** The repo is healthy in motion but concentrated risk lives in (a) two open S1 bugs with no PR, (b) the maintainer decision queue, and (c) a small set of large XL PRs that have waited over a month for review. Shipping a v0.8.5 cut or a v0.8.6 stabilization pass would benefit from explicit maintainer time on those three lanes.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*