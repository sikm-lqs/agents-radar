# OpenClaw Ecosystem Digest 2026-09-13

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-12 23:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-13

## 1. Today's Overview

OpenClaw is in a high-activity but turbulent period surrounding the 2026.9.3 → 2026.9.4 release line. In the last 24 hours, **500 issues and 500 PRs were updated**, with roughly **55% open and 45% closed** in both streams — a closure rate consistent with a stable project, but the comment concentration on P0/P1 release-blockers signals significant release stress. The dominant theme is **update, upgrade, and recovery reliability** (coordinated in [roboclaw-bot/opencraw#145252](https://github.com/openclaw/openclaw/issues/145252)), accompanied by recurring **subagent/sessions_yield orchestration defects**, **process-leak and crash-loop regressions**, and **provider/channel parity gaps**. No new releases shipped today; momentum is concentrated in PR review and incident triage on the 9.4 line.

## 2. Releases

**No new releases in the last 24 hours.** The current shipping artifacts referenced across all issues and PRs are **2026.9.2 (3928bad)**, **2026.9.3 (1391f7c)**, and **2026.9.4 (15285e57a4f, 1391f7c candidate)**. Multiple users report failed updates targeting 2026.9.4 from 2026.9.3 on Windows, macOS, and Linux npm-global installs ([#145510](https://github.com/openclaw/openclaw/issues/145510), [#145782](https://github.com/openclaw/openclaw/issues/145782), [#144739](https://github.com/openclaw/openclaw/issues/144739)).

## 3. Project Progress

### Merged/Closed PRs (high-signal today)
- **[#146384](https://github.com/openclaw/openclaw/pull/146384) — `improve(cron): avoid loading retained history during settlement`** (steipete, CLOSED) — Reduces up to 64 receipt IDs fetched per pruning pass; closes [roboclaw/openclaw#146197](https://github.com/openclaw/openclaw/pull/146197).
- **[#142888](https://github.com/openclaw/openclaw/pull/142888) — `fix(openai-completions): live assistant text doubles when a provider resends full content in one delta`** (Richard355168, ready for maintainer look) — Closes [#136262](https://github.com/openclaw/openclaw/issues/136262); prevents mid-message text duplication in OpenAI-compatible providers.
- **[#145639](https://github.com/openclaw/openclaw/pull/145639) — `fix(bonjour): stop ENODEV log bursts when transient interfaces disappear`** (tontoko) — Closes [#144796](https://github.com/openclaw/openclaw/issues/144796); cleans up mDNS log noise from Docker/CI interfaces.
- **[#144902](https://github.com/openclaw/openclaw/pull/144902) — `fix: restore media uploads through protected egress`** (roboclaw-bot) — Fixes rejected uploads at length-required destinations behind the protected egress proxy.
- **[#146356](https://github.com/openclaw/openclaw/pull/146356) — `fix(nextcloud-talk): reject excess concurrent webhook reads`** (eleqtrizit) — Bounded pre-auth reader concurrency on the Nextcloud Talk webhook (auth-failure DoS hardening).

### Notable Open PRs (ready for maintainer look)
- **[#146512](https://github.com/openclaw/openclaw/pull/146512) — `fix: avoid repeated agent database integrity scans`** (P1) — Eliminates stall-on-reopen for large agent DBs.
- **[#146542](https://github.com/openclaw/openclaw/pull/146542) — `fix(agents): keep subagent reconciliation scoped and current`** — Split from [#130741](https://github.com/openclaw/openclaw/pull/130741); addresses whole-store snapshot staleness.
- **[#146491](https://github.com/openclaw/openclaw/pull/146491) — `fix: keep I/O responsive during queued session writes`** — Addresses the microtask-drain pattern behind the event-loop blocking class of bugs.
- **[#146547](https://github.com/openclaw/openclaw/pull/146547) — `refactor(transcripts): run stored lookups in the shared SQLite worker`** — Moves transcript/utterance reads off the Gateway event loop.
- **[#146246](https://github.com/openclaw/openclaw/pull/146246) — `fix(update): preserve migrated default agent across restarts`** (Fixes [#146195](https://github.com/openclaw/openclaw/issues/146195)) — Important for users on the 9.3→9.4 path.
- **[#143234](https://github.com/openclaw/openclaw/pull/143234) — `fix(agents): Code Mode deadline expiry during a tool call is reported as an internal failure`** — Fixes timeout classification for in-flight tool calls.
- **[#146516](https://github.com/openclaw/openclaw/pull/146516) — `docs(plugins): remove obsolete Gateway restart guidance`** — Aligns 113 docs files; touches every channel/extension/plugin.
- **[#145167](https://github.com/openclaw/openclaw/pull/145167) — `fix(ui): unify chat collapse chevron direction`** — UX consistency fix.

## 4. Community Hot Topics

1. **[#44925 — Subagent completion silently lost](https://github.com/openclaw/openclaw/issues/44925)** (27 comments, 🦞 diamond lobster) — Multi-pattern loss of subagent results: failed announce (E31/E42/E45), drained/restored sessions, and orphan-prune cases with **no retry, notification, or auto-restart on timeout**. Linked [#67777](https://github.com/openclaw/openclaw/issues/67777) (CLOSED, 16 comments) closed without the desired durability layer.

2. **[#97616 — Unreaped hook/tool child processes / zombie accumulation](https://github.com/openclaw/openclaw/issues/97616)** (28 comments, 🦪 silver shellfish) — OpenClaw leaks `openclaw-hooks`, `bash`, `codex`, and other child processes; degradation compound over time.

3. **[#142585 — Doctor refuses valid legacy workspace setup in 2026.9.3](https://github.com/openclaw/openclaw/issues/142585)** (17 comments, 🦐 gold shrimp, P0, ux-release-blocker) — Upgrades from `2026.7.1-2` cannot migrate attestation state, blocking users on the upgrade path.

4. **[#78308 — Channel-mediated approval for MCP tool calls](https://github.com/openclaw/openclaw/issues/78308)** (16 comments, 🦞 diamond lobster, feature) — Demands the existing `/approve <id>` shell-exec pattern be extended to MCP tools that mutate external state (email, vault writes). Indicates a real demand for **uniform tool-consent UX** across the plugin boundary.

5. **[#115367 — Provider-owned read gate locks out external chat plugins](https://github.com/openclaw/openclaw/issues/115367)** (10 comments, 🦞 diamond lobster, P1) — The `enforceMessageActionConversationReadGate` (`origin: bundled`) chokepoint means slack/discord/matrix/msteams/feishu plugins — now all external — cannot perform provider-owned reads on past conversation context.

**Underlying need:** users want **durable, observable, multi-channel subagent orchestration** plus **safe-by-default plugin integration**. The top three discussions are really one product question: *what guarantees does OpenClaw offer about completion delivery and side-effect approval when work crosses session, channel, and process boundaries?*

## 5. Bugs & Stability (ranked by severity, fix-PR availability)

| Severity | Issue | Title | Fix PR? |
|---|---|---|---|
| **P0 / release-blocker** | [#145252](https://github.com/openclaw/openclaw/issues/145252) | 2026.9.3/9.4 update & recovery reliability tracking | Tracking issue |
| **P0** | [#145192](https://github.com/openclaw/openclaw/issues/145192) | 2026.9.2 → 9.4 managed update fails at candidate-Doctor on handoff lease | Partial: [#146246](https://github.com/openclaw/openclaw/pull/146246) |
| **P0** | [#145510](https://github.com/openclaw/openclaw/issues/145510) | Update failure: runtime-verification-failed (2026.9.3 → 9.4) | None visible |
| **P0** | [#145782](https://github.com/openclaw/openclaw/issues/145782) | Update failure: repairing (2026.9.3 → 9.4, darwin/arm64) | None visible |
| **P0** | [#144739](https://github.com/openclaw/openclaw/issues/144739) | 2026.9.3 → 9.4 npm update runs 9.3 against schema-17 candidate state | None visible |
| **P0** | [#145929](https://github.com/openclaw/openclaw/issues/145929) | Auth profile logout/write permanently fails with lock-may-be-busy | None visible |
| **P0** | [#112475](https://github.com/openclaw/openclaw/issues/112475) | Device pairing recovery fails after removal | None visible |
| **P1 / crash-loop** | [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP server init timeout crashes Gateway ("service child cleanup identity lost") | [#146561](https://github.com/openclaw/openclaw/pull/146561) (preserves cause only) |
| **P1** | [#139847](https://github.com/openclaw/openclaw/issues/139847) | Message dropped while a reply run is active ("no active tool authority snapshot") | None visible |
| **P1** | [#136183](https://github.com/openclaw/openclaw/issues/136183) | Command executor hangs spawning ssh (regression 2026.8.1) | None visible |
| **P1** | [#144502](https://github.com/openclaw/openclaw/issues/144502) | WhatsApp mobile can't play TTS voice notes (48 kHz + Lavf tag) | None visible |
| **P1** | [#115367](https://github.com/openclaw/openclaw/issues/115367) | Provider-owned read gate locks out external plugins | None visible |
| **P1** | [#142476](https://github.com/openclaw/openclaw/issues/142476) (CLOSED) | Cron session reaper blocks event loop 14–76s | Fixed (closed today) |
| **P1** | [#67777](https://github.com/openclaw/openclaw/issues/67777) (CLOSED) | Subagent completion delivery lost on direct-announce timeout | Closed without fix per user |
| **P1** | [#140620](https://github.com/openclaw/openclaw/issues/140620) (CLOSED) | Session-transcript reconciliation stalls mid-import | Closed |
| **P2** | [#106704](https://github.com/openclaw/openclaw/issues/106704) | `sessions_yield` on a leaf's first turn finalizes silently with empty result | None visible |
| **P2** | [#118776](https://github.com/openclaw/openclaw/issues/118776) | Leaf sub-agents keep `sessions_yield` but lose tools that produce events | None visible |
| **P2** | [#141474](https://github.com/openclaw/openclaw/issues/141474) | Collector child strands `agents_wait` forever | None visible |
| **P2** | [#137332](https://github.com/openclaw/openclaw/issues/137332) | Mixed terminal requester-settle batches retry forever | None visible |
| **P2** | [#146096](https://github.com/openclaw/openclaw/issues/146096) (CLOSED) | Agent whole-file writes accept stale read-derived content | Closed |
| **P2** | [#145266](https://github.com/openclaw/openclaw/issues/145266) (CLOSED) | Git/dev Doctor refreshes Codex from npm and shadows bundled plugin | Closed |
| **P2** | [#145689](https://github.com/openclaw/openclaw/issues/145689) (CLOSED) | Existing cron update blocked by tool-policy migration | Closed |
| **P2** | [#100941](https://github.com/openclaw/openclaw/issues/100941) (CLOSED) | Gateway drops concurrent tool WebSocket under parallel fan-out | Closed |
| **P2** | [#141558](https://github.com/openclaw/openclaw/issues/141558) | Heartbeat polls occurring despite `every: 0m` | None visible |
| **P2** | [#122019](https://github.com/openclaw/openclaw/issues/122019) | `openclaw update status` omits plugin availability & migration risk | None visible |
| **P2** | [#145993](https://github.com/openclaw/openclaw/issues/145993) | Codex prompt annotation fingerprints prepared content | None visible |
| **P2** | [#145192](https://github.com/openclaw/openclaw/issues/145192) | Already listed above | — |
| **P2** | [#138260](https://github.com/openclaw/openclaw/issues/138260) | Doctor runtime-tool-schemas self-check fails on Windows | None visible |
| **P2** | [#117243](https://github.com/openclaw/openclaw/issues/117243) | Allow-listed plugin excluded from gateway startup is invisible | None visible |

**Pattern signal:** Today’s crash-loop and event-loop blocking class ([#142476](https://github.com/openclaw/openclaw/issues/142476), [#144911](https://github.com/openclaw/openclaw/issues/144911), [#136183](https://github.com/openclaw/openclaw/issues/136183), [#100941](https://github.com/openclaw/openclaw/issues/100941)) all trace to **synchronous SQLite / child-process cleanup / SSH-style I/O on the Gateway event loop** — a structural problem the team is now addressing holistically in the [#130741](https://github.com/openclaw/openclaw/pull/130741) → [#146491](https://github.com/openclaw/openclaw/pull/146491) → [#146547](https://github.com/openclaw/openclaw/pull/146547) → [#146512](https://github.com/openclaw/openclaw/pull/146512) → [#146542](https://github.com/openclaw/openclaw/pull/146542) chain.

## 6. Feature Requests & Roadmap Signals

- **[#78308 — Channel-mediated approval for MCP tool calls](https://github.com/openclaw/openclaw/issues/78308)** (P2, security diamond lobster) — Strong, specific demand with a proposed `consent envelope` shape. **Likely target for the 2026.9.5 / 2026.10 cycle** given the convergence with [#115367](https://github.com/openclaw/openclaw/issues/115367).
- **[#126876 — Accessibility audit: 13 screen reader barriers](https://github.com/openclaw/openclaw/issues/126876)** (P0 release-blocker, first-person blind-user report) — Concrete VoiceOver barriers; four changes would unlock most. Strong chance of inclusion in 9.5 if a maintainer picks it up; absent otherwise.
- **[#131457 — Progress streaming mode for Feishu (Lark)](https://github.com/openclaw/openclaw/issues/131457)** (P3) — The last major channel without the `streaming.progress` config; parity completion.
- **[#101656 — Telegram detached subagents run silently](https://github.com/openclaw/openclaw/issues/101656)** (P2, 2 👍) — User-visible liveness feedback for detached children; aligns with the broader subagent observability theme.
- **[#77798 — Collaborative Markdown Editor via Canvas](https://github.com/openclaw/openclaw/issues/77798)** (P2, 2 👍, closed today) — Closed without implementation; **deferred**.
- **[#78308 / #115367 cross-cut](#)** suggests a near-term **plugin security & consent model** release scope.

**Prediction:** the next version line (2026.9.5) is most likely to ship: (a) the shared SQLite-worker refactor ([#146547](https://github.com/openclaw/openclaw/pull/146547), [#146557](https://github.com/openclaw/openclaw/pull/146557)), (b) `sessions_yield` durability / orphan-restart, and (c) plugin consent-envelope MVP

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Open-Source Personal AI Assistant / Agent Ecosystem
**Date: 2026-09-13 | Sources: 24h community digests for OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw**

---

## 1. Ecosystem Overview

The personal AI assistant / agent open-source landscape is in a **consolidation-and-hardening phase**: none of the five tracked projects shipped a release in the last 24 hours, and activity is dominated by reliability, security, and interoperability fixes rather than forward features. MCP/ACP has clearly won as the universal tool-integration surface — and is equally universal as a source of defects (OAuth triggers, non-canonical envelopes, poisoned connections) across four of five projects. Architecturally, the category has converged on a **long-lived gateway/daemon process fronting multiple messaging channels** (Telegram, WhatsApp, Slack, Feishu, QQ, Discord), which makes durable state management and process-lifecycle hygiene the category's core engineering problem. Activity scale varies by two orders of magnitude (OpenClaw ~1,000 updated items/day vs. IronClaw's 2), but the *same trust themes* — silent failure, consent boundaries, state durability — recur everywhere.

---

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Release Status | Health Score* |
|---|---|---|---|---|
| **OpenClaw** | 500 updated (~55% open) | 500 updated (~55% open) | None; 2026.9.4 blocked by P0 update-failure cluster | **7.0** — huge throughput, 45% closure rate, but P0 release-blockers and structural event-loop debt |
| **Hermes Agent** | 50 | 50 (45 open / 5 closed) | None; v0.21.2 (09-11), 0.21.0→0.21.2 in 11 days | **5.5** — fast cadence but 10% PR closure, growing backlog, 4 P1s (3 security) with no fix |
| **IronClaw** | 0 | 2 (1 merged / 1 open) | None | **4.0** — stable but minimal energy; insufficient signal to score confidently |
| **QwenPaw** | 17 (3 closed) | 7 (0 merged, all awaiting review) | None; 2.2.x line in active beta/stable hardening | **7.5** — 100% critical-bug-to-fix-PR coverage, healthy first-time-contributor inflow; state-loss trust erosion is the drag |
| **ZeroClaw** | 24 (18 open / 6 closed) | 50 (39 open / 11 merged) | None | **7.5** — 25% issue closure in 24h, supply-chain/security discipline; S0 data-loss bug (#10797) still unfixed |

\* Composite of throughput, closure/merge rate, fix-PR coverage for critical bugs, and contributor inflow.

---

## 3. OpenClaw's Position

**Advantages vs. peers**
- **Scale and community gravity:** ~500 issues + 500 PRs/day is roughly **10× Hermes or ZeroClaw, ~30× QwenPaw's issue volume, and ~250× IronClaw** — the richest bug discovery and validation engine in the field.
- **Broadest channel matrix:** Slack, Discord, Matrix, MS Teams, Feishu, WhatsApp, Telegram, Nextcloud Talk — no peer matches this breadth, and OpenClaw is *externalizing* channels into plugins while peers still hardcode adapters.
- **Architectural self-correction at depth:** the #130741 → #146491 → #146547 → #146512 → #146542 chain shows the team fixing the *class* (synchronous SQLite/child-process I/O on the Gateway event loop) rather than individual symptoms.
- **Consent-model leadership:** #78308's proposed `consent envelope` for MCP tool approval is the most concrete cross-channel consent design in the ecosystem; only ZeroClaw (ADR-014 egress authority) is comparably explicit.

**Weaknesses vs. peers**
- **Release reliability is currently the worst in class:** a P0 cluster (#145510, #145782, #144739, #142585) means users cannot complete 9.3→9.4 upgrades across all three OSes — ZeroClaw's digest-pinned, cosign-signed supply chain and Hermes' 11-day patch cadence both look more dependable right now.
- **Node/TypeScript event-loop fragility** is a structural tax that Rust-based ZeroClaw does not pay (its platform cost shows up instead as Windows stack-depth issues, #10734).
- A P0 accessibility blocker (#126876, 13 screen-reader barriers) has no owner — a gap no peer currently exposes.

**Technical approach differences:** OpenClaw = TypeScript Gateway + `sessions_yield` subagent orchestration + externalized plugin ecosystem. Hermes = Python gateway + Desktop-centric UX + local-model lane. QwenPaw = Python/Docker monolith with memory subsystem (ReMeLight) + creator tooling. ZeroClaw = Rust daemon/control plane with formal ADRs and supply-chain signing. IronClaw = narrow, enterprise Slack-integration focus.

---

## 4. Shared Technical Focus Areas

| Focus Area | Projects | Specific Evidence |
|---|---|---|
| **Durable state / fail-loud delivery** | All 5 | OpenClaw #44925 (subagent completion silently lost); ZeroClaw #10788 (failed ACP turn drops completed tool history), #10797 (S0 memory data loss); QwenPaw #7724/#7708 (conversation + model-config loss); Hermes #102945 (silent config fallback, now fixed); IronClaw #8098 (pinning turn-state lineage contracts) |
| **MCP/ACP interoperability** | OpenClaw, Hermes, QwenPaw, ZeroClaw | QwenPaw #7728 (Java SDK `jsonRpcError` envelope), #7727 (kimi-code write-bypass); Hermes #89412 (OAuth never triggers without 401); ZeroClaw #10807 (connection poisoned after one retry); OpenClaw #144911 (MCP init timeout crash) |
| **Tool-consent & security boundaries** | OpenClaw, Hermes, QwenPaw, ZeroClaw | OpenClaw #78308/#115367 (consent envelope, read gate); Hermes #39609 (approval gate 1s race), #109440 (cross-origin API-key leak), #109422 (OAuth identity bleed); QwenPaw #7726 (`trusted:true` falls back to prompts); ZeroClaw #10726/#10449/#10091 (supply chain, file perms) |
| **Subagent / multi-agent orchestration** | OpenClaw, Hermes, QwenPaw | OpenClaw `sessions_yield` cluster (#106704, #118776, #141474, #137332); Hermes #97681 (bot mesh surviving Desktop closure, 28 comments) + #98470 (worker contracts); QwenPaw #7676/#4901 (per-subagent model) |
| **Event-loop blocking / resource lifecycle** | OpenClaw, QwenPaw, Hermes | OpenClaw #142476 (reaper blocks 14–76s), #97616 (process leaks); QwenPaw #7721 (watchfiles freezes server), #7722 (3-path OOM); Hermes #82304 (unbounded missions lose rented GPUs) |
| **Channel parity & voice/TTS** | All 5 | OpenClaw #144502 (WhatsApp TTS codec), #131457 (Feishu streaming); ZeroClaw #10689 (ElevenLabs bracket tags), #10812 (WhatsApp thumbnails); QwenPaw #7718 (Telegram approval cards); Hermes #109423 (Telegram allowlist); IronClaw #8076 (Slack disconnect states) |
| **Upgrade / packaging reliability** | OpenClaw, Hermes, QwenPaw | OpenClaw's entire P0 board; Hermes #94375/#83673 (doctor --fix, dependency hygiene); QwenPaw #7582 (fleet plugin updates) |
| **Cost observability** | ZeroClaw, QwenPaw | ZeroClaw #10699 (cache-write pricing); QwenPaw #7664→#7719 (dedicated cheap memory model) |

---

## 5. Differentiation Analysis

| Project | Primary Differentiator | Target User | Architecture Center of Gravity |
|---|---|---|---|
| **OpenClaw** | Channel breadth + plugin ecosystem + scale | Power users & self-hosters wanting one assistant everywhere | TypeScript Gateway, externalized channel plugins, `sessions_yield` orchestration |
| **Hermes Agent** | Multi-bot collaboration & local-model investment | Tinkerers running local LLMs, multi-bot Desktop workflows | Python gateway + multiplexed profiles + Desktop; VOICEVOX TTS, RFC 8252 mobile OAuth |
| **IronClaw** | Enterprise Slack correctness; turn-state lineage contracts | Slack-centric enterprise deployments | Assistant/adapter layer with explicit `TurnRunState` semantics |
| **QwenPaw** | Chinese channel coverage (Feishu/QQ/OneBot) + memory subsystem + creator workflow | CN-market users; maintenance-agent fleets; content creators | Python/Docker monolith, ReMeLight memory, unified MCP/ACP/A2A driver ambition |
| **ZeroClaw** | Security & supply-chain rigor; formal governance | Security-conscious self-hosters | Rust daemon + control plane; cosign-signed images, ADR process, cost ledger |

The sharpest split is **integration-breadth-first (OpenClaw, QwenPaw) vs. trust-and-correctness-first (ZeroClaw, IronClaw)**, with Hermes pursuing a **multi-agent/local-inference** lane none of the others occupies.

---

## 6. Community Momentum & Maturity

- **Tier 1 — Massive / mature-but-strained:** **OpenClaw.** Highest volume and closure rate at scale, but release stress (9.4 blockers) and event-loop debt show the cost of breadth.
- **Tier 2 — Active hardening:** **ZeroClaw** (25% issue closure in 24h; merged PRs all discipline-flavored: digest pinning, permissions, CI fixtures) and **Hermes** (fast 0.21.x cadence, but only 5 of 50 PRs closed — backlog is growing faster than it's clearing).
- **Tier 3 — Rapid iteration on a fresh line:** **QwenPaw.** The 2.2.x beta→stable cycle shows the fastest *feature* cadence, with every critical bug filed in 24h already carrying a fix PR — the best triage discipline ratio in the set.
- **Tier 4 — Quiet stabilization:** **IronClaw.** Zero issues, one merged correctness fix, one test-hardening PR; either mature-and-stable or coasting — insufficient signal to distinguish.

**Rapidly iterating:** QwenPaw, Hermes. **Stabilizing:** ZeroClaw, OpenClaw. **Dormant/low-energy:** IronClaw.

---

## 7. Trend Signals

1. **Durability is the category's trust currency.** Every project's hottest threads involve silently lost work — subagent completions (OpenClaw), turn history (ZeroClaw), conversations (QwenPaw), scheduled jobs (Hermes). *Developer takeaway:* design error-path state retention and fail-loud notifications before adding features; "no retry, no notification, no auto-restart" (OpenClaw #44925) is the anti-pattern users punish.
2. **Consent UX for tool side-effects is the next competitive frontier.** OpenClaw's consent envelope, ZeroClaw's ADR-014, Hermes' approval-gate races, and QwenPaw's ACP `trusted:true` failures all point one direction: **uniform, channel-mediated approval for state-mutating tools** is becoming a purchase-decision criterion, not a nice-to-have.
3. **MCP won the protocol war; interop rigor decides who wins on MCP.** Real deployments hit Java SDK envelopes, kimi-code schemas, non-401 OAuth, and transient-failure poisoning. Assume *nothing* canonical about remote MCP servers.
4. **Multi-agent is moving from in-process fan-out to durable, cross-gateway meshes** (Hermes #97681/#98470; OpenClaw sessions_yield). Completion-delivery guarantees across process/session boundaries are the unsolved core.
5. **Runtime architecture leaks into bug lists.** Synchronous SQLite and child-process cleanup on Node/Python event loops generate entire bug *classes* (OpenClaw, QwenPaw, Hermes); Rust shifts the cost to platform parity (Windows stack depth, teardown races). Offload I/O from the main loop on day one.
6. **Cost observability is arriving as a feature** (ZeroClaw's ledger, QwenPaw's dedicated memory model) — users increasingly separate "thinking model" from "background model" spend.
7. **Update reliability is the new deployment problem.** At scale, self-updating daemons (OpenClaw's P0 board, Hermes doctor, QwenPaw fleet requests) need the same rigor as the runtime itself.
8. **Channel quirks are permanent engineering load** — ElevenLabs bracket tags, WhatsApp codecs/thumbnails, Telegram parse modes — arguing for OpenClaw-style externalized adapters rather than in-tree surfaces.

---
*Bottom line: OpenClaw remains the ecosystem's center of gravity on scale and breadth, but on 2026-09-13 it is the least dependable upgrader in the set; ZeroClaw and QwenPaw show the best engineering discipline per unit of activity; Hermes is betting on multi-bot + local models; IronClaw is statistically silent.*

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — Project Digest (2026-09-13)

## 1. Today's Overview

Hermes Agent showed **high-volume maintenance churn** in the last 24 hours with 50 issues and 50 PRs touched, but no new releases shipped. The signal is dominated by **bug-fix and security-hardening work** rather than forward feature development: a striking share of newly opened items are flagged `duplicate`, and several P1 security-boundary issues surfaced around multiplexed profiles and OAuth/MCP integrations. Development tempo is healthy (45 open PRs spanning CLI, gateway, cron, agent, MCP, and Desktop), but the **closed PR count is only 5** and the issue backlog continues to grow. Project health reads as "actively working through debt" rather than "shipping new capability."

## 2. Releases

**No new releases in the last 24 hours.** The most recent tagged baseline referenced in new reports is Hermes Agent **v0.21.2** (`1021a032`, dated 2026-09-11); the prior **v0.21.0** (2026-08-31) is the version on which several open bug reproductions are still being filed.

## 3. Project Progress

Five PRs were closed in the window; of those, two are clearly user-facing fixes that landed:

- **[#109463](https://github.com/NousResearch/hermes-agent/pull/109463)** — *fix(config): recover last good config.yaml instead of defaults.* Re-closes a longstanding fault-tolerance gap (issue [#102945](https://github.com/NousResearch/hermes-agent/issues/102945)) where a malformed `config.yaml` silently fell back to defaults and erased user overrides. ([PR #109463](https://github.com/NousResearch/hermes-agent/pull/109463))
- **[#109299](https://github.com/NousResearch/hermes-agent/pull/109299)** — *fix(cli): unroute the old name before renaming a multiplexed profile.* Resolves a "ghost served profile" left behind by `rename_profile` when the gateway was multiplexing. ([PR #109299](https://github.com/NousResearch/hermes-agent/pull/109299))

Two further closed PRs were marked **duplicate** and three closed issues (e.g. [#101975](https://github.com/NousResearch/hermes-agent/issues/101975), [#109448](https://github.com/NousResearch/hermes-agent/issues/109448), [#108883](https://github.com/NousResearch/hermes-agent/issues/108883)) were test/cleanup items rather than user-visible regressions.

**Feature work in flight (not yet merged):**
- **[#98470](https://github.com/NousResearch/hermes-agent/pull/98470)** — `feat(agent): validated worker collaboration contracts` (large cross-cutting agent/gateway/cron/Desktop change, marked needs-decision).
- **[#108914](https://github.com/NousResearch/hermes-agent/pull/108914)** — `feat: Bot Screen` — per-bot Xfce desktop streamed into Hermes Desktop for shared human/bot sessions (needs-decision).
- **[#103353](https://github.com/NousResearch/hermes-agent/pull/103353)** — advanced local-model runtime and gateway routes (needs-decision).
- **[#109281](https://github.com/NousResearch/hermes-agent/pull/109281)** — sentence-level VOICEVOX streaming for Desktop TTS.
- **[#109467](https://github.com/NousResearch/hermes-agent/pull/109467)** — allowlisted custom-scheme redirect URIs for RFC 8252 native OAuth (unblocks iOS/Android native sign-in).
- **[#109457](https://github.com/NousResearch/hermes-agent/pull/109457)** — add ClixRx prescription discount MCP catalog entry.
- **[#99757](https://github.com/NousResearch/hermes-agent/pull/99757)** — *fix(security): scope `key_cmd` subprocess environment* — important hardening that prevents helper subprocesses from inheriting unrelated provider credentials.

## 4. Community Hot Topics

The most engaged threads all share a pattern: **silent-failure or trust-boundary defects that turn the system into a black box for the user.**

| Item | Title | Comments | Why it's hot |
|---|---|---|---|
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | Bot Group Chats should keep working after Desktop closes | **28** | Highest-traffic thread of the day. Wants bots on different gateways to collaborate continuously without a Desktop instance acting as the always-on host — a multi-device, persistent bot-mesh use case. |
| [#109243](https://github.com/NousResearch/hermes-agent/issues/109243) | cron: external-worker handoff requires 5s ack but cold start is ~12s | **17** | Reproducible loss of scheduled jobs; engineers are weighing in on ack-vs-handshake semantics. |
| [#39609](https://github.com/NousResearch/hermes-agent/issues/39609) | `--initial-status blocked` tasks auto-promote to `ready` ~1s later, no actor recorded | **16** | Approval-gate bypass with a 1-second deterministic race — P1 because it invalidates a security/operational promise. |
| [#94375](https://github.com/NousResearch/hermes-agent/issues/94375) | `hermes doctor --fix` leaves npm apps insecure | **7** | User frustration with package hygiene; recurring campaign by user `@eabase` who is also driving [#83673](https://github.com/NousResearch/hermes-agent/issues/83673) and [#102563](https://github.com/NousResearch/hermes-agent/issues/102563). |
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) | `hermes config set` bypasses system-config write protection | **6** | The CLI writes through the front door what a shell write gets blocked for — undermines the approval layer. |
| [#89412](https://github.com/NousResearch/hermes-agent/issues/89412) | MCP OAuth flow never triggers for servers that don't 401 first (e.g. Gmail MCP) | **6** | Real integration gap with a flagship Google MCP server. |

**Underlying need:** users want **fail-loud, isolated, recoverable behavior** across config, scheduling, and multi-profile OAuth — and they want bot workflows that survive client disconnects.

## 5. Bugs & Stability

Ranked by severity (P1 first), then by activity. Fix PRs are noted where one exists in the open-PR set.

**P1 — critical / security / data correctness**

| Issue | Title | Fix PR |
|---|---|---|
| [#109440](https://github.com/NousResearch/hermes-agent/issues/109440) | `hermes chat -q -m <alias>` sends the alias's API key to the default provider's host (cross-origin credential leak), v0.21.2 | none open |
| [#109422](https://github.com/NousResearch/hermes-agent/issues/109422) | Multiplexed profiles sharing an OAuth MCP server URL silently adopt each other's identity | none open |
| [#39609](https://github.com/NousResearch/hermes-agent/issues/39609) | `--initial-status blocked` auto-promotes to `ready` ~1s later, no actor — approval gate bypassed | none open |
| [#107191](https://github.com/NousResearch/hermes-agent/issues/107191) | `model_aliases:` custom `base_url` dropped at CLI startup → 401 from OpenRouter | none open |

**P2 — high**

| Issue | Title | Fix PR |
|---|---|---|
| [#109243](https://github.com/NousResearch/hermes-agent/issues/109243) | cron external-worker handoff 5s ack vs ~12s cold start — jobs intermittently never run | none open |
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) | `hermes config set` bypasses system-config write protection | none open |
| [#89412](https://github.com/NousResearch/hermes-agent/issues/89412) | MCP OAuth flow never triggers for non-401 servers (Gmail MCP) | none open |
| [#102945](https://github.com/NousResearch/hermes-agent/issues/102945) | Unparseable `config.yaml` silently falls back to defaults | **[#109463](https://github.com/NousResearch/hermes-agent/pull/109463)** (merged) ✅ |
| [#109258](https://github.com/NousResearch/hermes-agent/issues/109258) | `/save md …` fails in Telegram UI (`'GatewayRunner' object has no attribute 'get_adapter'`) | none open |
| [#108302](https://github.com/NousResearch/hermes-agent/issues/108302) | Managed Tool Gateway unavailable on every bot profile (auth fallback skipped) | none open |
| [#96610](https://github.com/NousResearch/hermes-agent/issues/96610) | `tool_call` bridge arguments arrive empty on constrained-backends (Kimi) | none open |
| [#95078](https://github.com/NousResearch/hermes-agent/issues/95078) | Nested Hermes inherits stale `TERMINAL_CWD` | none open |
| [#90679](https://github.com/NousResearch/hermes-agent/issues/90679) | Docker terminal backend: new desktop session fails with `cd: D:\.hermes: No such file or directory` | none open |
| [#109215](https://github.com/NousResearch/hermes-agent/issues/109215) | Native memory stages already-invalid proposals | **[#109280](https://github.com/NousResearch/hermes-agent/pull/109280)** (complementary fix) |
| [#108659](https://github.com/NousResearch/hermes-agent/issues/108659) | Vision turns can return a previous request's answer when `extra_body` forces cache_prompt | none open |
| [#109423](https://github.com/NousResearch/hermes-agent/issues/109423) | Telegram `allowed_chats` stored as JSON string is mis-parsed → group msgs silently dropped | none open |

**P3 — notable**

| Issue | Title | Fix PR |
|---|---|---|
| [#109452](https://github.com/NousResearch/hermes-agent/issues/109452) | Kanban re-promotes non-sticky blocked card every dispatcher tick — 30 runs in 30 min | none open |
| [#94375](https://github.com/NousResearch/hermes-agent/issues/94375) | `hermes doctor --fix` breaks; leaves insecure npm apps | none open |
| [#84235](https://github.com/NousResearch/hermes-agent/issues/84235) | Concurrent turns on same session act on stale snapshots → duplicate side effects | none open |
| [#82304](https://github.com/NousResearch/hermes-agent/issues/82304) | Unattended autonomous missions lack resource lifecycle; lose rented GPU + finished work | none open |

**Summary:** 4 P1s opened or active today, **none with a merged or open fix PR** (except config-recovery which just landed). The P1 cluster is concentrated in **credential-leak / identity-isolation failures** under `gateway.multiplex_profiles` and the CLI alias path — these should be the top priority for the next patch release.

## 6. Feature Requests & Roadmap Signals

- **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)** (P2, 28 comments) — **Bot Group Chats that survive Desktop closure**, multi-gateway bot collaboration, file handoff between bots. This is the strongest roadmap signal in the window and aligns directly with the in-flight Bot Screen work in **[#108914](https://github.com/NousResearch/hermes-agent/pull/108914)**. Likely a 0.22 feature.
- **[#83673](https://github.com/NousResearch/hermes-agent/issues/83673)** / **[#102563](https://github.com/NousResearch/hermes-agent/issues/102563)** — User-driven push for a **release-time dependency hygiene gate** (npm outdated + npm audit) and venv staleness reporting. The pattern of complaints suggests the maintainers should land CI checks; relatively cheap win.
- **[#103353](https://github.com/NousResearch/hermes-agent/pull/103353)** — advanced local-model runtime controls + safe gateway publication (KV cache type, MTP, inference slots, planner). Signals a "self-hosted first" roadmap lane.
- **[#109281](https://github.com/NousResearch/hermes-agent/pull/109281)** — sentence-level VOICEVOX streaming for Desktop → signals an investment in **low-latency, multilingual Desktop TTS**.
- **[#109467](https://github.com/NousResearch/hermes-agent/pull/109467)** — allow custom-scheme OAuth redirects → unblocks **native mobile sign-in** (a platform-expansion signal).
- **[#98470](https://github.com/NousResearch/hermes-agent/pull/98470)** — worker-collaboration contracts (evidence, objectives, capabilities, consensus) → multi-agent coordination is being formalized at the protocol level.

**Next-release prediction (0.21.3 / 0.22.0):** expect the multiplex-profile credential/OAuth P1 cluster ([#109440](https://github.com/NousResearch/hermes-agent/issues/109440), [#109422](https://github.com/NousResearch/hermes-agent/issues/109422), [#108302](https://github.com/NousResearch/hermes-agent/issues/108302)) plus the cron-handshake ([#109243](https://github.com/NousResearch/hermes-agent/issues/109243)) and blocked-task race ([#39609](https://github.com/NousResearch/hermes-agent/issues/39609)) fixes. Bot Screen (#108914) and worker contracts (#98470) are likely too large for a patch.

## 7. User Feedback Summary

**Recurring pain points:**

1. **Silent failures.** Across config ([#102945](https://github.com/NousResearch/hermes-agent/issues/102945)), Telegram allowlist ([#109423](https://github.com/NousResearch/hermes-agent/issues/109423)), model auto-correction ([#101975](https://github.com/NousResearch/hermes-agent/issues/101975), closed), MCP OAuth ([#89412](https://github.com/NousResearch/hermes-agent/issues/89412)), and vision cache ([#108659](https://github.com/NousResearch/hermes-agent/issues/108659)), users complain that Hermes drops behavior with at most a one-line stderr note. The newly-merged **#109463 "last good config" recovery** directly addresses the loudest of these.
2. **Approval layer / trust-boundary inconsistencies.** Users actively call out asymmetry: the same mutation through the shell is blocked, through `hermes config set` is not ([#59293](https://github.com/NousResearch/hermes-agent/issues/59293)); one profile's OAuth identity is silently adopted by another ([#109422](https://github.com/NousResearch/hermes-agent/issues/109422)); an alias's API key is sent to the wrong host ([#109440](https://github.com/NousResearch/hermes-agent/issues/109440)). This is the **single biggest trust concern** in the issue stream.
4. **Cron / kanban reliability.** Multiple high-traffic items (#109243, #39609, #109452, #82304, #109468) describe jobs that never run, run too many times, or skip approval gates. Several users report **lost rented GPU and finished work** — real money impact.
5. **Dependency hygiene.** User `@eabase` has filed a sustained campaign (#83673, #94375, #102563) about stale venv packages and `hermes doctor --fix` not working. This is the most visible **dissatisfaction signal** in the window.
6. **Tool-call ergonomics.** Provider-specific breakage (#96610 Kimi, #108659 llama.cpp vision, #107191 custom `base_url`) shows that the **custom-provider surface is fragile** to backend quirks.

**Satisfaction signals:** the high-traffic feature thread [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) (28 comments) and the Bot Screen PR [#108914](https://github.com/NousResearch/hermes-agent/pull/108914) indicate strong enthusiasm for the multi-bot / shared-desktop direction.

## 8. Backlog Watch

Items with high importance but **no fix or maintainer response visible today**:

- **[#39609

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-13

## 1. Today's Overview

IronClaw (nearai/ironclaw) saw minimal activity over the past 24 hours, with only two pull requests updated and no new issues or releases recorded. The merged PR (#8076) addresses a classification issue around disconnected shared channels in the assistant/Slack integration, suggesting continued refinement of multi-channel messaging behavior. One new test-only PR (#8098) was opened to pin behavior of state-derived lineage metadata in turn runs. Overall project momentum appears low but stable, with work concentrated on test coverage and integration correctness rather than new feature development.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

**Merged/Closed PRs (1):**

- **PR #8076 — fix(assistant): distinguish disconnected shared channels** ([link](https://github.com/nearai/ironclaw/pull/8076)) — *Author: be-student*
  - Differentiates a paired user's disconnected shared channel from an unpaired account, preventing ambiguous rejection states.
  - Adds channel-specific guidance for both user messages and bot commands.
  - Maintains consistent rejection classification across the product UI, adapter layer, and OpenAI-compatible surfaces.
  - Updates the Slack capability manifest to reflect the new behavior.
  - **Impact:** Improves correctness and user experience in the Slack integration path, reducing misclassification of disconnections.

## 4. Community Hot Topics

Community engagement was light in the last 24 hours. Neither the open nor closed PR received any comments or reactions (👍: 0 for both). Notable work:

- **PR #8098 — test(turns): pin state-derived lineage drop** ([link](https://github.com/nearai/ironclaw/pull/8098)) — *Author: huiq777, Open*
  - Adds an inverse regression test alongside an existing terminal-rewrite lineage test.
  - Asserts that claimed metadata initially carries `depth`, activation provenance, and a descendant cap, and that a subsequent `TurnRunState`-derived snapshot deliberately omits all three lineage fields.
  - **Underlying need:** Locking in intentional omissions in state-derived snapshots to prevent silent regressions in lineage propagation — a sign that the team is hardening internal contracts around turn execution semantics.

## 5. Bugs & Stability

No bugs, crashes, or regression reports were filed or updated in the last 24 hours. One bug-class fix was merged:

- **PR #8076** (merged) — Addressed a misclassification where disconnected shared channels were not properly distinguished from unpaired accounts. This is a correctness fix in the assistant's Slack/channel handling path; severity appears moderate (user-visible but not crash-level). No open follow-up issue was raised.

## 6. Feature Requests & Roadmap Signals

No new feature requests or issues were submitted in the last 24 hours, so no roadmap signals can be inferred from fresh user demand. The only active PR (#8098) is a test hardening change rather than a user-facing feature. Predictive commentary is therefore not warranted for this period.

## 7. User Feedback Summary

There is no direct user feedback to summarize — no issues were filed and no PR comments or reactions were recorded in the last 24 hours. The absence of activity limits insight into current user sentiment. The merged fix in PR #8076 suggests the maintainers (or a contributor) identified internal friction around disconnected-channel UX, which may have originated from earlier user reports outside this snapshot window.

## 8. Backlog Watch

- **PR #8098 ([link](https://github.com/nearai/ironclaw/pull/8098))** — Newly opened test PR with zero comments/reactions; would benefit from a maintainer review to confirm the pinned invariants align with the intended turn-state contract before merge.
- **PR #8076 ([link](https://github.com/nearai/ironclaw/pull/8076))** — Closed/merged today; worth verifying in production telemetry that the rejection classification is now consistent across all surfaces and that the Slack manifest update does not require downstream consumer coordination.

No long-unanswered issues exist in this 24-hour window to flag. Maintainer attention is recommended primarily on confirming the test invariants in #8098 and post-merge validation of #8076.

---

**Summary metrics for 2026-09-13:**
- Active issues: 0 | Active PRs: 1 | Closed PRs: 1 | Releases: 0
- Project activity level: **Low** — concentrated on test coverage and integration correctness.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-13

## 1. Today's Overview

QwenPaw (agentscope-ai/QwenPaw) shows elevated triage activity with **17 issues and 7 PRs updated in the last 24 hours**, yet no new releases were published. The activity is concentrated around the recently shipped **2.2.x line** (beta.1, beta.2, and stable 2.2.1 on Desktop), where multiple regression reports — model-config loss, MCP connection breakage, server freezes on large workspaces — surface alongside their corresponding fix PRs. The overall pattern is healthy: every high-severity bug filed today has an associated open PR attempting to land in the next 2.2.x patch, indicating an actively triaged release pipeline. Community engagement (comments) is moderate but concentrated in a small number of recurring pain points (model persistence, plugin store UX, MCP interoperability).

## 2. Releases

No new releases were published in the last 24 hours. The most recent tagged versions discussed across issues are:
- **2.2.1-beta.2** (Desktop, Windows 10) — referenced in #7715, #7676
- **2.2.1-beta.1** / **2.2.1b1** (Console) — referenced in #7676, #7720
- **2.2.1** (Desktop) — referenced in #7708, #7721, #7724
- **2.2.0** (Desktop, macOS arm64; Docker `agentscope/qwenpaw:latest`) — referenced in #7726, #7727, #7728, #7717, #7722
- **2.1.1b3** — referenced in #7716 as last version with working MCP

## 3. Project Progress

No PRs were merged or closed today; all 7 open PRs are first-time or follow-up contributions awaiting review:

| PR | Title | Area | Status |
|---|---|---|---|
| [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) | fix(acp): select permission options by protocol kind | ACP client | OPEN — fixes #7726 |
| [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729) | fix(mcp): recognize Java jsonRpcError envelope on discover probe | MCP driver | OPEN — fixes #7728 |
| [#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725) | fix(workspace): replace blocking watchfiles.awatch SSE watcher with threaded polling | Workspace SSE | OPEN — fixes #7721 |
| [#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723) | fix(console): emit an error event when stream_one fails | Console SSE | OPEN — first-time contributor |
| [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) | feat(memory): allow a separate model for ReMeLight memory writing | Memory/ReMe | OPEN — implements #7664 |
| [#7718](https://github.com/agentscope-ai/QwenPaw/pull/7718) | fix(telegram): render approval-card markdown via HTML parse_mode | Telegram channel | OPEN — first-time contributor |
| [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) | fix(agents): diagnose dropped subagent model overrides | Subagent spawning | OPEN — first-time contributor, fix for #7676 |

The **three closed issues today (#7676, #7582, #7664)** all carry matching implementation PRs in the open queue, indicating a clean convert-to-PR pattern.

## 4. Community Hot Topics

Top issues by comment volume in the last 24h:

1. **[#7484 — A2A support timeline on 2.x](https://github.com/agentscope-ai/QwenPaw/issues/7484)** (3 comments). User asks when the A2A protocol — promised alongside MCP/ACP under a unified Driver mechanism — will ship. Signals demand for **multi-protocol agent interoperability** beyond MCP.
2. **[#7708 — Configured LLM model disappears during use](https://github.com/agentscope-ai/QwenPaw/issues/7708)** (3 comments). Desktop 2.2.1 users report the model selection silently drops mid-session. Echoed in #7724 and historically repeated — indicates a **persistent state-persistence defect**.
3. **[#7715 — Daily Paper fails silently when arxiv is unreachable](https://github.com/agentscope-ai/QwenPaw/issues/7715)** (3 comments). Reveals missing proxy/endpoint config in `reme_daily_paper`; surface error is misleading. Underlying need: **graceful degradation + operator-visible diagnostics** for scheduled background jobs.
4. **[#7676 — `subagent_model` has no effect (CLOSED)](https://github.com/agentscope-ai/QwenPaw/issues/7676)** (3 comments). Spawned subagents always inherit the parent's `active_model`. Now has diagnosis PR #7680. Indicates demand for **per-task / per-subagent model selection** (related issue #4901 still open).
5. **[#7582 — Plugin store UX lacks batch ops (CLOSED)](https://github.com/agentscope-ai/QwenPaw/issues/7582)** (2 comments). Multi-machine power users want one-click updates + update notifications. Underlying need: **manageability of QwenPaw-as-maintenance-agent** deployments across fleets.

## 5. Bugs & Stability

Ranked by severity and impact:

**🔴 Critical (server-blocking or data-loss)**
- **[#7721 — Workspace file browser freezes entire server](https://github.com/agentscope-ai/QwenPaw/issues/7721)** (Docker, v2.2.1). `watchfiles.awatch` performs a synchronous recursive baseline scan inside its `__init__`, blocking the event loop and hanging WebUI + all channels (Feishu/QQ/OneBot). **Fix PR:** [#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725) — replaces with threaded polling.
- **[#7722 — Memory exhaustion via three compounding paths](https://github.com/agentscope-ai/QwenPaw/issues/7722)** (v2.2.0, Docker). Container fills at ~1 MB/s then OOMs. Author documents controlled repros and minimal fixes for: unbounded stream buffers, keep-alive instance stacking, doom-loop gate evasion. **No fix PR yet.**

**🟠 High (functional regression)**
- **[#7728 — `server/discover` HTTP 500 from Java MCP SDK servers](https://github.com/agentscope-ai/QwenPaw/issues/7728)** (v2.2.0, macOS). Non-standard `jsonRpcError` envelope is rejected by `_unwrap_jsonrpc_result`. **Fix PR:** [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729).
- **[#7716 — MCP cannot connect/register since 2.2.x](https://github.com/agentscope-ai/QwenPaw/issues/7716)**. qwenpaw-hub worked on 2.1.1b3; broken since upgrade. Companion to #7728.
- **[#7724 — Conversation loss + cascading model loss](https://github.com/agentscope-ai/QwenPaw/issues/7724)** (Desktop 2.2.1, Win10). A 9 pm session vanishes after a plugin reinstall + shutdown cycle; related model-config loss recurs (#7708). **No fix PR.**
- **[#7676 — `subagent_model` override dropped — CLOSED](https://github.com/agentscope-ai/QwenPaw/issues/7676)**. **Diagnosis PR:** [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680).

**🟡 Medium (security/UX correctness)**
- **[#7727 — Out-of-workspace write hard-block bypassed via kimi-code ACP](https://github.com/agentscope-ai/QwenPaw/issues/7727)** (v2.2.0, macOS). `_paths` extraction misses kimi toolCall fields. **No fix PR.**
- **[#7726 — ACP `trusted:true` silently falls back to interactive prompts](https://github.com/agentscope-ai/QwenPaw/issues/7726)** (v2.2.0). `_pick_allow_option` only matches `allow_*` optionIds, missing `approve_once`-style ids. **Fix PR:** [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732).
- **[#7720 — Creator hides prompt-sync blocker behind `GATED` and lacks manual image acceptance](https://github.com/agentscope-ai/QwenPaw/issues/7720)** (Console 2.2.1b1, Creator 1.2.0). Blocks progression to 分镜图. **No fix PR.**
- **[#7715 — Daily Paper silent failure](https://github.com/agentscope-ai/QwenPaw/issues/7715)** (already noted).
- **[#7708 — Configured LLM model disappears](https://github.com/agentscope-ai/QwenPaw/issues/7708)** (already noted).
- **[#7718-equivalent: Telegram approval card renders raw markdown](https://github.com/agentscope-ai/QwenPaw/pull/7718)** — fix PR open.

## 6. Feature Requests & Roadmap Signals

| Request | Issue | Likely next-version candidate? |
|---|---|---|
| A2A protocol (peer of MCP/ACP) under unified Driver | [#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) | High — already promised in 2.x architecture docs; absence is conspicuous. |
| Separate `memory_model` for ReMeLight (summarize/dream) | [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) (closed) | **Already in-flight** — [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719). |
| DeepSeek native capability metadata, prompt-prefix stability, KV-cache observability | [#7717](https://github.com/agentscope-ai/QwenPaw/issues/7717) | Medium — provider-level change, likely 2.3+ unless bundled. |
| Files panel: toggle dot-prefixed files | [#7731](https://github.com/agentscope-ai/QwenPaw/issues/7731) | Low effort, **likely in 2.2.2 / 2.3**. |
| Plugin store: batch update + update notifications | [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582) (closed) | **No PR linked** — needs maintainer pickup. |
| Per-task model selection (subagent model effective) | [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) (closed), [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) (open) | **Diagnosis PR open** (#7680); full feature likely 2.3. |
| Plugin catalog offline fallback (real) | [#7730](https://github.com/agentscope-ai/QwenPaw/issues/7730) | Medium — robustness ask. |

**Prediction:** the most realistic **2.2.2 patch** will bundle [#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725), [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729), [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732), [#7718](https://github.com/agentscope-ai/QwenPaw/pull/7718), [#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723), and possibly [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719). A2A support and plugin-store batch ops are likeliest for **2.3**.

## 7. User Feedback Summary

- **Power-user / fleet operator pain (#7582):** QwenPaw-as-maintenance-agent on multiple machines exposes a lack of bulk plugin management; manual one-by-one updates are untenable at fleet scale.
- **Cost-conscious user pain (#7664 → #7719):** Users running flagship LLMs for chat pay premium token costs for background memory writes; explicit demand for a cheaper dedicated memory model.
- **Reliability of background jobs (#7715, #7722):** Operators running scheduled jobs (Daily Paper, Memory) report silent failures and unbounded resource growth; demand for **transparent status + bounded resources**.
- **Persistence/state-loss frustration (#7708, #7724):** Multiple Desktop users losing both model selection and conversation history without an obvious cause points to a **trust-damaging state-management defect** that has now appeared across multiple releases.
- **Multi-protocol interop (#7484, #7716, #7727, #7728):** Real deployments exercise MCP/ACP against heterogeneous SDKs (Java/Kotlin, kimi-code) — QwenPaw's MCP/ACP code paths are revealed to assume canonical encodings and a single tool schema vocabulary.
- **First-time-contributor activity is healthy:** #7723, #7718, #7680 are all `[first-time-contributor]` PRs landing alongside experienced maintainers — a positive community health signal.

## 8. Backlog Watch

Issues and PRs most likely to slip if not picked up soon:

- **[#7484 — A2A support](https://github.com/agentscope-ai/QwenPaw/issues/7484)** — High-traffic architecture promise with no maintainer response; needs a public timeline.
- **[#7722 — Three-path memory exhaustion](https://github.com/agentscope-ai/QwenPaw/issues/7722)** — Severity critical; comes with controlled repros but no fix PR.
- **[#7727 — kimi-code OOB write hard-block bypass](https://github.com/agentscope-ai/QwenPaw/issues/7727)** — Security-relevant, no PR yet.
- **[#7720 — Creator prompt-sync `GATED` blocker](https://github.com/agentscope-ai/QwenPaw/issues/7720)** — Blocks an end-to-end workflow, low comment count likely because affected users churn rather than file tickets.
- **[#7730 — Plugin catalog offline fallback escape](https://github.com/agentscope-ai/QwenPaw/issues/7730)** — Reliability ask with only 1 comment despite architectural impact.
- **[#7717 — DeepSeek provider enhancements](https://github.com/agentscope-ai/QwenPaw/issues/7717)** — Substantive proposal (4 enhancements) referencing `deepseek-harness` design; needs maintainer scoping.
- **[#4901 — Per-task model selection](https://github.com/agentscope-ai/QwenPaw/issues/4901)** — Long-standing, still open; #7680 only diagnoses one slice of the broader ask.
- **[#7582 (closed) → Plugin store UX](https://github.com/agentscope-ai/QwenPaw/issues/7582)** — Closed without an implementation PR; risk of dropping off the radar.
- **PR review backlog (all open, awaiting maintainer triage):** [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732), [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729), [#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725), [#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723), [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719), [#7718](https://github.com/agentscope-ai/QwenPaw/pull/7718), [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680). All are surgical, low-risk fixes with matching bug reports — well-positioned for a single 2.2.2 cut.

---

**Bottom line:** QwenPaw's 2.2.x line is in active hardening. Every critical bug filed in the last 24 hours has either a matching open PR or is queued behind a closed issue awaiting implementation. The main risks to project health are (a) **state-persistence regressions** eroding user trust (#7708,

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-13

## 1. Today's Overview

ZeroClaw (github.com/zeroclaw-labs/zeroclaw) saw a high-activity 24-hour period with 24 issues and 50 pull requests touched, but **no new releases shipped**. Activity is concentrated in runtime stability fixes (RPC dispatcher, ACP session durability, memory backend), the Windows CI advisory suite (4+ distinct failures), and a substantial set of merged maintainer-driven PRs from distinguished contributors. One **S0 (data loss / security)** bug was opened (#10797) on the markdown memory backend, and two P1 runtime bugs (#10734, #10788, #10785) remain in progress. The signal is "heavy maintenance + hardening" rather than forward feature work — appropriate for a project with this much in-flight surface area (RPC, gateway, plugins, ACP, channels).

## 2. Releases

*No new releases in the last 24 hours. This section is omitted per the template.*

## 3. Project Progress

Six PRs were merged/closed in the last 24h. Substantive merged work:

- **#10726** `ci(zerorelay): pin published relay base images by digest` — closes the follow-up from issue #10277; eliminates mutable base tags (`rust:1.96.1-slim`, `distroless/cc-debian13:nonroot`) on the cosign-signed relay image. Supply-chain hardening.
- **#10449** `fix(channels): create Edge TTS artifact with owner-only permissions` — narrows synthesized-audio file mode from `0o644` to owner-only, completing a small but real local-privacy fix.
- **#10091** `fix(memory): harden response cache storage permissions` — gives the response cache the same owner-only protection already used by the audit DB; closes the data-at-rest permission gap.
- **#9577** `test(plugins): prove typed config end to end with an in-tree tool fixture` — replaces a hand-provisioned, never-CI-built `reference-plugin.wasm` with a built-from-source `wasm32-wasip2` fixture. Improves plugin-config CI coverage.
- **#10676** `fix(ci): compare publish exceptions as paths` — repairs a Windows-only regression in the publish-contract CI check.
- **#10169** `docs(adr): file ADR-014 plugin egress authority as proposed` — closes documentation gap on plugin egress authority.

Net effect: forward motion on **security hardening, supply-chain pinning, and CI reliability**, plus one ADR landed. No user-facing feature work merged in the window.

## 4. Community Hot Topics

The most-discussed items are all P1 / S0 bugs, not feature PRs. By comment count:

- **#10734** [Bug] `RpcDispatcher::process_line` runs within 2% of its 2 MB stack guard on Windows nextest — 6 comments. Author: Project516. Surfaces a real `0xc00000fd` stack overflow in `RpcDispatcher::process_line_session_new_creates_session_on_two_mega…`. ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/10734))
- **#10788** [Bug] Failed Code/ACP turn discards the accepted prompt and completed tool exchanges from durable history — 2 comments. Author: Audacity88. On provider failure (not cancellation), the entire turn — including tool work that already succeeded — is silently dropped from durable history. ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/10788))
- **#10534** [Bug] Bounded delegates silently strip the `delegate` tool (CLOSED) — 2 comments. Author: Audacity88. Now fixed. ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/10534))
- **#10689** [Bug] Telegram voice reply silently skipped when reply starts with `[` (ElevenLabs v3 audio tags) (CLOSED) — 2 comments. Author: badbat75. ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/10689))

**Underlying need:** the cluster shows users care deeply about *durable state correctness* — they want to know that what they typed, what tools ran, and what history is preserved behaves predictably across provider errors and platform differences. Voice/ACP delegates and TTS channels are clearly in production use.

## 5. Bugs & Stability

Ranked by severity (P1/S0 first), with fix-PR linkage where it exists:

| Severity | Issue | Summary | Status / Linked PR |
|---|---|---|---|
| **S0 / data loss** | [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) | `MarkdownMemory::store` rewrites from a stale snapshot with no writer serialization — concurrent `store()` calls can lose entries. | OPEN, accepted. **No fix PR yet.** |
| P1 / S2 | [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) | `RpcDispatcher::process_line` stack overflow on Windows nextest. | OPEN, in-progress. |
| P1 / S2 | [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) | Failed Code/ACP turn drops everything (prompt + completed tools) from history. | OPEN. **No fix PR linked.** |
| P1 / S2 | [#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785) | ZeroCode `begin_notification_resync` cancels every running turn due to notification lag. | OPEN, in-progress. |
| P1 / S2 | [#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) | `zeroclaw service logs` prints nothing on macOS/Windows/OpenRC when daemon is healthy (CLOSED). | Fixed. |
| P2 | [#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787) | Single-candidate Reliable provider stream recovery ignores `provider_retries`; 529 gets one immediate retry, no backoff. | OPEN, in-progress, follow-up. |
| P2 | [#10793](https://github.com/zeroclaw-labs/zeroclaw/issues/10793) | Three Windows-only test failures on advisory job with no code change under test. | OPEN, in-progress. |
| P2 | [#10794](https://github.com/zeroclaw-labs/zeroclaw/issues/10794) | `publish_contract::published_crates_never_include_files_outside_their_own_directory` fails on Windows. | OPEN, in-progress. |
| P2 | [#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795) | `zeroclaw agent` REPL never enables terminal `IUTF8`; Backspace deletes bytes instead of characters. | OPEN, accepted. |
| P2 | [#10805](https://github.com/zeroclaw-labs/zeroclaw/issues/10805) | `control_plane` liveness tests race process teardown on Windows advisory job. | OPEN. |
| P2 | [#10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) | MCP connection permanently poisoned by one failed recovery attempt (single retry, then dead). | OPEN. **No fix PR yet.** |
| P2 | [#10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534) | Bounded delegates silently strip `delegate` tool (CLOSED). | Fixed. |
| P2 | [#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689) | Telegram voice reply dropped when reply begins with `[` (ElevenLabs v3 tags) (CLOSED). | Fixed. |
| P2 | [#10277](https://github.com/zeroclaw-labs/zeroclaw/issues/10277) | Pin published `zerorelay` image base tags by digest (CLOSED). | Fixed via PR #10726. |
| P2 | [#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699) | Cost ledger prices cache writes at plain input rate, understating cache misses (CLOSED). | Fixed. |
| P2 | [#10436](https://github.com/zeroclaw-labs/zeroclaw/issues/10436) | Native OpenRouter streaming uses total request timeout and cuts off active responses (CLOSED). | Fixed. |
| P3 | [#10802](https://github.com/zeroclaw-labs/zeroclaw/issues/10802) | `session/list-acp` reports different `message_count` than `turn_end` for same session. | OPEN. |
| P3 | [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796) | ZeroCode chat input ignores Delete key. | OPEN, good first issue. |
| P3 | [#10789](https://github.com/zeroclaw-labs/zeroclaw/issues/10789) | Localize ZeroCode daemon startup diagnostics. | OPEN, good first issue, follow-up. |
| P3 | [#10792](https://github.com/zeroclaw-labs/zeroclaw/issues/10792) | Clarify Windows recovery after daemon reload refusal (docs). | OPEN, good first issue, follow-up. |
| P3 | [#8733](https://github.com/zeroclaw-labs/zeroclaw/issues/8733) | `models.dev` catalog is parsed for model IDs only — per-model capabilities (vision) discarded. | OPEN, no-stale (lingering). |
| P2 | [#10812](https://github.com/zeroclaw-labs/zeroclaw/issues/10812) | Populate `DocumentMessage.jpegThumbnail` so PDFs preview on WhatsApp phones. | OPEN, feature. |

**Top concern:** Issue **#10797 (S0 data loss)** is the highest-severity item with no fix PR yet — concurrent `store()` calls on the markdown memory backend can silently drop entries. Maintainers should triage this before any feature merge that touches `MarkdownMemory`.

## 6. Feature Requests & Roadmap Signals

Two explicit feature requests and one adjacent enhancement PR surfaced in the window:

- **#10812** Populate `DocumentMessage.jpegThumbnail` / `pageCount` so PDFs sent over WhatsApp preview on mobile clients. ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/10812)) — Strong "ready-to-ship" signal: the WhatsApp wire format explicitly supports it.
- **#10400** / PR **#10401** Make the Telegram unauthorized-sender notice configurable + authorization-aware. ([issue](https://github.com/zeroclaw-labs/zeroclaw/issues/10400), [PR](https://github.com/zeroclaw-labs/zeroclaw/pull/10401)) — Long-running. Has a stale-candidate flag; needs author action.
- **#8733** Treat per-model capabilities (e.g., vision) from the `models.dev` catalog as first-class. ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/8733)) — Open since 2026-07-05; consistently resurfacing indicates real-world need.

**Prediction for next version:** none of these will ship without an explicit push. The highest-likelihood merges in the next 1–2 weeks are the **P1 runtime fixes** (#10734, #10788, #10785) and the **S0 memory backend fix** (#10797), because they are the loudest open items with no current PR. WhatsApp thumbnail (#10812) is the most plausible user-visible feature to land next, since it is a small, isolated change.

## 7. User Feedback Summary

Pain points observed in the last 24h:

- **Durability anxiety (high).** Users and maintainers are repeatedly finding that the runtime drops user inputs and tool results on error paths (#10788, #10797, #10785). Implication: users are trusting ZeroClaw with long-lived sessions and need predictable state behavior.
- **Windows parity (high).** Four separate Windows-specific issues filed in 24h (#10734, #10793, #10794, #10805, plus #10795 REPL UTF-8). Maintainers are clearly treating this seriously (advisory job is non-required but actively triaged), but it remains a real ergonomic gap.
- **Provider reliability knobs (medium).** #10787 — single-candidate Reliable provider ignores `provider_retries`; 529s have no backoff. Users who chose Reliable for resilience want their retry config honored.
- **TTS voice channel (low–medium, but user-facing).** #10689 (now fixed) shows ElevenLabs v3 bracketed audio tags are used in real workflows and need to survive the TTS pipeline.
- **Localization hygiene.** #10789 (Fluent catalogue for ZeroCode daemon diagnostics) — small but indicative of a multi-language user base.

No net-promoter-style signals in the data; satisfaction is best inferred from "did the maintainer already ship the fix?" — which is **yes for 6 of 24 issues** within 24h, a healthy closure rate.

## 8. Backlog Watch

Items open longest that still need maintainer attention:

- **#8733** — Open since **2026-07-05** (~2.5 months). `models.dev` catalog capabilities discarded, `supports_vision()` falls back to per-family bool. Status: `no-stale`. No PR linked. ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/8733))
- **#10797** — Highest-severity open item (S0). **No fix PR exists.** Triage before any memory-touching change ships.
- **#10807** — MCP HTTP/SSE single-retry-then-poisoned behavior; effectively a workflow blocker (S1) when MCP servers have any blip. No PR.
- **#10805** — `control_plane` liveness tests race teardown on Windows; flaky advisory job, but related to PR #10262 reload-cancellation work.
- **#10400 / PR #10401** — Telegram unauthorized notice work has been open since **2026-08-26** with a `stale-candidate` flag and `needs-author-action`. Worth a ping.
- **#10787** — Provider retry/backoff semantics, follow-up from #10736. Needs design decision (should `provider_retries` apply to stream-recovery paths?).
- **#10791** — Pre-existing, nonblocking follow-up from PR #10262; local RPC connections aren't retired after terminal writer failure. Quietly aging.

Items most in need of a maintainer eyeball *today*: **#10797 (S0)**, **#10788 (P1, no PR)**, **#10807 (S1, no PR)**, and **#8733 (long-tail capability loss)**.

---

*Digest generated from 24 issues and 50 PRs updated on 2026-09-12–13 UTC. No releases in window. Activity split: 18 open / 6 closed issues; 39 open / 11 merged-or-closed PRs.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*