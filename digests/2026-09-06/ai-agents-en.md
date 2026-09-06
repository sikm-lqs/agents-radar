# OpenClaw Ecosystem Digest 2026-09-06

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-06 13:00 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-06

## 1. Today's Overview

OpenClaw shows **very high activity velocity**: 500 issues and 500 PRs updated within 24 hours, with 219 PRs merged/closed against 281 still open — a strong throughput signal for a project at this scale. A new release, **v2026.9.2**, landed today, focusing on chat/dashboard responsiveness by moving durable history reads off the Gateway event loop (#136862 et al.), continuing the hot streak after 2026.9.1. Core maintainer activity is concentrated and prolific — steipete alone opened ~10 PRs today spanning fixes, refactors, and a new plugin. The main health concerns are **recurring upgrade-path breakage** (three open P0s tied to version upgrades on Windows/macOS), a persistent cluster of **message-loss/session-state bugs**, and a large review queue where many issues carry `clawsweeper:needs-maintainer-review` / `needs-product-decision` tags.

## 2. Releases

### v2026.9.2 (`openclaw 2026.9.2`)
- **Highlights: Faster, more responsive chat** — keeps chat, dashboards, and session interactions responsive while long transcripts and disk usage are processed, via direct dashboard lookup, reduced cold-load work, and durable history reads moved **outside the Gateway event loop** (#136862, #138…, notes truncated in feed).
- **Migration notes:** None stated in the visible notes; no breaking changes flagged.
- **Caveat:** This release does **not** appear to address the P0 Windows startup regression from 2026.9.1 ([#137813](https://github.com/openclaw/openclaw/issues/137813), still open) — Windows Scheduled Task users should verify before upgrading.

## 3. Project Progress

Notable movement today (219 PRs merged/closed total):

- **Same-day fix cycle:** [#140104](https://github.com/openclaw/openclaw/pull/140104) *fix(memory): preserve keyword recall in project sessions* was opened and closed the same day (steipete) — resolving project-scoped memory search returning empty results.
- **Closed issue:** [#137056](https://github.com/openclaw/openclaw/issues/137056) *memory-core: move maintenance off search/watch hot paths* — a meaningful memory-subsystem latency fix reaching closure.
- **High-priority fixes staged for merge:**
  - [#139822](https://github.com/openclaw/openclaw/pull/139822) *(P1, XL)* fit compacted context + prioritize foreground replies — `👀 ready for maintainer look`.
  - [#137381](https://github.com/openclaw/openclaw/pull/137381) *(P1, XL)* `sessions_yield` keeps long transcript history available during cleanup.
  - [#140060](https://github.com/openclaw/openclaw/pull/140060) *(P1)* Android Talk restores selected agent after gateway reconnect.
- **New features:** [#139850](https://github.com/openclaw/openclaw/pull/139850) adds a **Team Reports plugin** (GitHub/Discord activity reports); [#139561](https://github.com/openclaw/openclaw/pull/139561) exposes Teams AI-feedback via typed plugin hooks.
- **Hygiene refactors** by steipete: plugin install validation dedup ([#140112](https://github.com/openclaw/openclaw/pull/140112)), Signal outbound encoding isolation ([#140116](https://github.com/openclaw/openclaw/pull/140116)), gateway reclaim type reuse ([#140113](https://github.com/openclaw/openclaw/pull/140113)), browser probe cleanup ([#140114](https://github.com/openclaw/openclaw/pull/140114)).

## 4. Community Hot Topics

Top issues by engagement (all updated today):

| Issue | Comments | Theme |
|---|---|---|
| [#96975](https://github.com/openclaw/openclaw/issues/96975) Subagent completion isolation | 12 | Parent context pollution from heavy subagent payloads |
| [#132762](https://github.com/openclaw/openclaw/issues/132762) Overflow retry ends on tool result, no final delivery | 12 | Message loss during recovery |
| [#113306](https://github.com/openclaw/openclaw/issues/113306) SQLite snapshot restore lacks crash/identity guarantees | 12 | Data-loss risk in snapshots |
| [#53408](https://github.com/openclaw/openclaw/issues/53408) write/exec params silently dropped after 15+ turns | 12 (+2👍) | Long-session reliability — open since March |
| [#137813](https://github.com/openclaw/openclaw/issues/137813) Windows gateway never starts after 2026.9.1 | 11 | P0 release blocker |
| [#135111](https://github.com/openclaw/openclaw/issues/135111) Malformed JSON tool args on v2026.8.1 (Sonnet 5) | 11 | Provider regression |
| [#48920](https://github.com/openclaw/openclaw/issues/48920) Live docs ahead of release | 10 (+4👍) | Docs/release alignment |

**Underlying needs:** The community's loudest pain is **trust in long-running, tool-heavy sessions** — silent param drops, lost final replies, subagent payload pollution, and snapshot integrity. There's also clear demand from operators running OpenClaw as always-on infrastructure (Windows/macOS services, multi-bot gateways) for **survivable upgrades** — the P0 threads are dominated by "my gateway didn't come back after update."

## 5. Bugs & Stability

Ranked by severity (all open unless noted):

1. **P0 — [#137813](https://github.com/openclaw/openclaw/issues/137813)** Windows gateway never starts after 2026.9.1: new `--task-supervisor` flag exits 0 silently, child never spawns. *No fix PR visible; highest urgency given it blocks the current release line on Windows.*
2. **P0 — [#136203](https://github.com/openclaw/openclaw/issues/136203)** Windows de-DE 2026.8.2 upgrade leaves Doctor maintenance blocked. Tagged `queueable-fix` — fix likely staged soon.
3. **P0 — [#115642](https://github.com/openclaw/openclaw/issues/115642)** Billing cooldown (~5h `disabledUntil`) outlives outages on subscription auth; requests fail instantly. *Fix PR exists:* [#120305](https://github.com/openclaw/openclaw/pull/120305) adds `models auth clear-cooldown` — awaiting proof.
4. **P0 — [#85027](https://github.com/openclaw/openclaw/issues/85027)** macOS 2026.5.6→2026.5.19 upgrade unrecoverable (Time Machine restore required). Open since May.
5. **P1 — [#132762](https://github.com/openclaw/openclaw/issues/132762)** `overflow-retry` "succeeds" on a toolResult with no final assistant delivery. `queueable-fix`.
6. **P1 — [#135111](https://github.com/openclaw/openclaw/issues/135111)** Intermittent "malformed JSON arguments" regression on 2026.8.1.
7. **P1 — [#97616](https://github.com/openclaw/openclaw/issues/97616)** Zombie child processes (`openclaw-hooks`, `bash`, `codex`) accumulate; runtime degradation.
8. **P1 — [#102534](https://github.com/openclaw/openclaw/issues/102534)** Cron scheduler timer permanently stops firing after timeout storms; survives restarts.
9. **P1 — [#135272](https://github.com/openclaw/openclaw/issues/135272)** macOS companion UI-control intermittently fails (`COMPANION_APP_UNAVAILABLE`), 2026.8.1 regression.
10. **New today — [#139714](https://github.com/openclaw/openclaw/issues/139714)** Post-core-update resume admits an `update_runs` row it can never finalize → `openclaw status` shows "update in progress" forever. Filed today; fresh updater-reliability signal.

**Recurring theme:** upgrade/rollback paths are the dominant crash/degradation source (also see [#92241](https://github.com/openclaw/openclaw/issues/92241) stale module paths after rollback).

## 6. Feature Requests & Roadmap Signals

Active requests and where they may land:

- **[#120305](https://github.com/openclaw/openclaw/pull/120305) auth cooldown recovery command** (needs proof) — pairs directly with P0 #115642; likely next release.
- **[#139822](https://github.com/openclaw/openclaw/pull/139822) compacted-context fit + foreground reply priority** (P1, ready for review) — candidate for 2026.9.x, aligns with the release line's responsiveness focus.
- **[#137381](https://github.com/openclaw/openclaw/pull/137381) `sessions_yield` history availability** (P1) — likely near-term given session-state bug pressure.
- **[#118466](https://github.com/openclaw/openclaw/pull/118466) route-model resolution caching** (ready for review since Aug 3) — perf win, plausibly next.
- **[#139850](https://github.com/openclaw/openclaw/pull/139850) Team Reports plugin** — new surface; watch for follow-up product decisions.
- **Watchlist requests:** session auto-titling ([#99583](https://github.com/openclaw/openclaw/issues/99583)), session TTL/auto-rotation ([#45390](https://github.com/openclaw/openclaw/issues/45390)), multi-Teams-bot gateways ([#71058](https://github.com/openclaw/openclaw/issues/71058)), dynamic allowlist identity resolution ([#58057](https://github.com/openclaw/openclaw/issues/58057)), context-engine strict failure policy ([#116716](https://github.com/openclaw/openclaw/issues/116716)).

The `clawsweeper:queueable-fix` tags on #132762, #136203, and #115354 suggest an automated fix queue — expect these next.

## 7. User Feedback Summary

- **Pain points:** (1) Silent failures — dropped messages, dropped tool params, dropped final replies are the most-reported dissatisfaction class; (2) upgrades that strand gateways (Windows Scheduled Task, macOS LaunchAgent users had no self-service recovery); (3) cost/latency inefficiency — prompt-cache churn on OpenAI ([#95610](https://github.com/openclaw/openclaw/issues/95610)), token over-estimation triggering premature truncation ([#101929](https://github.com/openclaw/openclaw/issues/101929)); (4) alert fatigue from cron failure notifications and "No reply was generated" fallback spam ([#116348](https://github.com/openclaw/openclaw/issues/116348)).
- **Use cases visible in reports:** multi-channel personal assistants (Feishu, Signal, Telegram, iMessage, Discord voice, Teams, QQ via plugin), k8s StatefulSet deployments, local models (LM Studio), cron-driven automations, and subagent/swarm workloads — a genuinely diverse production footprint.
- **Satisfaction:** Users are invested (detailed repros, logs, root-cause hypotheses like Feishu mention-stripping in #72504) — high engagement, moderate frustration with fix latency on March-era bugs.

## 8. Backlog Watch

Items needing maintainer attention, oldest first:

- [#53408](https://github.com/openclaw/openclaw/issues/53408) (Mar 24) write/exec param drops — 12 comments, still `no-new-fix-pr`.
- [#48920](https://github.com/openclaw/openclaw/issues/48920) (Mar 17) live docs ahead of release — 4👍, recurring trust issue.
- [#41201](https://github.com/openclaw/openclaw/issues/41201) (Mar 9) Control UI avatar broken image — needs security review, unresolved ~6 months.
- [#54488](https://github.com/openclaw/openclaw/issues/54488) (Mar 25) session lane starvation, 20–30 min inbound stalls.
- [#85027](https://github.com/openclaw/openclaw/issues/85027) (May 21) **P0** macOS upgrade unrecoverable — open 3+ months.
- [#95610](https://github.com/openclaw/openclaw/issues/95610) (Jun 21) prompt-cache churn — has linked open PR, pending review.
- [#96975](https://github.com/openclaw/openclaw/issues/96975) (Jun 26) subagent completion isolation — top-commented issue, awaiting product decision.
- **PR queue:** [#118466](https://github.com/openclaw/openclaw/pull/118466), [#119126](https://github.com/openclaw/openclaw/pull/119126), [#120248](https://github.com/openclaw/openclaw/pull/120248) (Bedrock perf) have been "ready for maintainer look" for ~a month; [#119833](https://github.com/openclaw/openclaw/pull/119833) (Anthropic transport accounting, P1) is stalled on author since Aug 6.

**Health verdict:** High-velocity, maintainer-engaged, and shipping daily — but upgrade reliability and silent message loss are systemic risks that outweigh the feature pace until the queued P0/P1 fixes land.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Personal AI Assistant / Agent Open-Source Ecosystem
**Snapshot date: 2026-09-06** · Projects: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The personal AI assistant / agent open-source landscape is in a high-velocity maturation phase: category projects are moving decisively from single-user CLI tools toward **always-on, multi-channel, multi-device server infrastructure**, and their bug backlogs now read like operations-engineering problem sets (durability, upgrades, delegation, cost control) rather than chatbot features. A clear convergence is visible around four recurring pain classes — session-state durability, upgrade/install reliability, long-context handling, and provider-layer correctness — across projects with otherwise distinct architectures. Activity is highly stratified: OpenClaw touches ~1,000 items/day and ships daily, Hermes and ZeroClaw sustain ~90–100 items/day, QwenPaw runs a smaller but unusually high-signal tracker, and IronClaw shows quiet, architecture-focused maintenance. Community behavior is also professionalizing — RFC processes, contributor-tier ladders, automated triage bots, and even AI-assisted RFC drafting are appearing in the healthier projects.

---

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | PRs merged/closed | Release status | Health score | Top risk |
|---|---|---|---|---|---|---|
| **OpenClaw** | 500 updated | 500 updated (281 open) | **219** | ✅ **v2026.9.2 shipped today** | **A−** | Upgrade-path P0s (Windows/macOS); silent message loss |
| **Hermes Agent** | 50 (39 open / 11 closed) | 50 (18 open) | 32 | ⏸ None today (last v2026.8.3) | **B+** | `state.db` SQLite corruption class; Windows update path |
| **ZeroClaw** | 39 (9 closed) | 50 (43 open, many XL) | 7 | ⏸ None (0.8.4; release gate #10048 closed → 0.8.5 near) | **B+** | Review/WIP bottleneck; 2 open S1 bugs |
| **QwenPaw** | 14 (11 open / 3 closed) | 6 (5 open) | 1 | ⏸ None (2.2.x staged rollout) | **B** | Context-loss cluster (#7579/#7584) unpatched; hardcoded context-size regression (#7576) in all releases |
| **IronClaw** | 0 | 2 | 0 | ⏸ None | **B−** (low-signal day) | Stacked-PR dependency: #8075 blocked on #7908 |

*Note: IronClaw's zero-activity day (a Sunday) limits assessment; its PR numbering (~8,0xx) implies a mature, historically high-throughput repo.*

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Throughput and cadence:** 219 PRs merged/closed in 24h — roughly 5× Hermes and 30× ZeroClaw — plus a release shipped *on the snapshot day*, continuing a daily-release hot streak. No peer matches this delivery rhythm.
- **Maintainer concentration:** steipete alone opened ~10 PRs spanning fixes, refactors, and a new Team Reports plugin, including a same-day open-and-close fix cycle (#140104). Execution speed on identified problems is best-in-class.
- **Production footprint breadth:** the widest deployment diversity observed — multi-channel assistants (Feishu, Signal, Telegram, iMessage, Discord voice, Teams, QQ), k8s StatefulSets, local models (LM Studio), cron automations, and subagent/swarm workloads.
- **Automation leverage:** `clawsweeper:queueable-fix` tagging suggests an automated fix-queue pipeline none of the peers visibly replicate.

**Technical approach differences:**
- **Gateway-centric architecture** with event-loop sensitivity (v2026.9.2's headline fix moved durable history reads off the Gateway event loop) — versus ZeroClaw's RFC-driven runtime-owned-session model and Hermes' desktop/CLI gateway hybrid.
- **Plugin-first extensibility** (Team Reports, typed Teams AI-feedback hooks) versus ZeroClaw's WASM sandboxed plugin runtime and IronClaw's pinned in-sandbox agent loop.
- **Weakness relative to peers:** upgrade/rollback reliability is OpenClaw's systemic sore spot — a P0 open since May (#85027) and three active upgrade P0s — where Hermes is converging on a *transactional deployment* architecture (#88683) and ZeroClaw gates releases behind explicit validation lanes (#10048). OpenClaw also carries March-era unresolved bugs (#53408, #48920), indicating review capacity, not velocity, is its constraint — the same bottleneck ZeroClaw at least manages explicitly via its #8692 decision queue.

**Community size:** OpenClaw is the largest by engagement volume (500 issues/day, multiple issues at 10–12 comments, 👍 reactions on backlog items). Hermes runs a smaller but *deeper* community — a 166-comment thread (#66616) and an 8👍 RFC — signaling concentrated, invested power users. ZeroClaw shows the most structured contributor pipeline; QwenPaw has the best issue *quality-per-capita*; IronClaw's community surface is not measurable today.

---

## 4. Shared Technical Focus Areas

| Emerging requirement | Projects | Specific evidence |
|---|---|---|
| **Session-state durability beyond SQLite** | OpenClaw, Hermes, QwenPaw, ZeroClaw | Hermes `state.db` corruption ×4 in 5 weeks (#100896) + SessionDB RFC (#23717, most-👍 item); QwenPaw `history.db` SIGBUS (#6814) and record-loss-after-restart (#7548); OpenClaw snapshot crash/identity gaps (#113306); ZeroClaw runtime-owned sessions + append-only event history RFCs (#9487/#9488) |
| **Survivable, transactional upgrades** | OpenClaw, Hermes, (ZeroClaw preventive) | OpenClaw: three P0s (#137813, #136203, #85027) + stuck `update_runs` row (#139714); Hermes: Windows mid-update crash (#104212), Desktop-deleting ZIP fallback (#90495), deployment RFC (#88683); ZeroClaw closes release-lane validation as an explicit gate (#10048) |
| **Long-context integrity (no silent loss)** | OpenClaw, QwenPaw, Hermes | QwenPaw: model can't see its own last reply (#7579/#7584), hardcoded 32k context fallback (#7576); OpenClaw: dropped tool params after 15+ turns (#53408), lost final replies (#132762); Hermes: compression-provider fallback hardening (#76370) |
| **Delegation / sub-agent supervision & security** | OpenClaw, QwenPaw, ZeroClaw | OpenClaw: subagent context pollution (#96975); QwenPaw: passive main-agent monitoring gap (#7450) + blocking-wait ask (#7580); ZeroClaw: delegate results without owner principal (#10644), unenforced sub-loop budgets (#10645) |
| **Provider-layer correctness & cost control** | OpenClaw, Hermes, ZeroClaw | Hermes P0 prompt-cache corruption on native Anthropic wire (14–20% of calls, #104284); OpenClaw malformed JSON on Sonnet 5 (#135111), cache churn (#95610); ZeroClaw incomplete responses reported as success (#9421), $10 ledger vs. "unbounded" UI mismatch (#10635) |
| **Always-on, headless, multi-device operation** | Hermes, OpenClaw, ZeroClaw | Hermes: headless group chats (#97681), session handoff (#104278); OpenClaw: gateway-operator upgrade complaints; ZeroClaw: background turns/resume-on-reconnect (#7759) |
| **Multi-tenancy / multi-profile** | QwenPaw, Hermes, OpenClaw | QwenPaw Hub multi-tenant edition (#7318); Hermes multi-profile env-leak security fix (#104265); OpenClaw multi-Teams-bot gateway request (#71058) |

---

## 5. Differentiation Analysis

- **Feature focus:** OpenClaw optimizes *breadth and responsiveness* (channel coverage, plugin ecosystem, dashboard latency). Hermes optimizes *multi-profile server operation* (session handoff, group chats, provider routing). ZeroClaw optimizes *architectural rigor* (sandboxing, WASM plugins, event-sourced sessions, governance). QwenPaw optimizes *console UX and ecosystem cohesion* (AgentScope integration, plugin store). IronClaw optimizes *benchmark reproducibility* (pinned sandbox runtime as boot default).
- **Target users:** OpenClaw → operators running always-on multi-channel assistants as infrastructure. Hermes → self-hosters running bot swarms across laptop/VPS/home-server hardware, Nous ecosystem users. QwenPaw → individual power users (incl. long-document/CJK workloads) transitioning to team deployments. ZeroClaw → developers wanting security boundaries, delegation economics, and formal governance. IronClaw → benchmark/eval consumers and Slack-centric shared-channel teams.
- **Architecture:** OpenClaw — Gateway-centric, plugin-surface, rapid-release. Hermes — Python, Desktop+CLI gateway multiplexing, profiles. ZeroClaw — Rust daemon, Tokio, WASM plugin runtime, RFC-driven evolution. QwenPaw — Python (PyInstaller-packaged backend), AgentScope platform integration. IronClaw — Bun/Pi agent-core pinned inside a sandbox image.

---

## 6. Community Momentum & Maturity

- **Tier 1 — hyperactive, rapidly iterating:** **OpenClaw** (~1,000 items/day, daily releases). Fastest feature velocity in the cohort, but carrying aged P0 debt; velocity is outrunning review capacity.
- **Tier 2 — high momentum:** **Hermes** (100 items/day, 11 fresh contributor PRs in one day, founder-level P0 engagement) and **ZeroClaw** (89 items/day, functioning contributor ladder, maintainer PR-repair culture). Hermes is iterating on product; ZeroClaw is iterating on *architecture and process* — the classic pre-1.0 consolidation pattern.
- **Tier 3 — steady, quality-dense:** **QwenPaw** — smallest tracker volume but exemplary behavior: highly detailed repros and a first-time contributor (kabishou11) converting bug reports to fix PRs within 24–48h. Stabilizing around its 2.2.x rollout.
- **Tier 4 — quiet/mature:** **IronClaw** — low-velocity, sequencing a deliberate architecture migration (#7908 → #8075); stable rather than stalled.

**Trajectory read:** OpenClaw and Hermes are compounding fast; ZeroClaw is the most likely to leapfrog on reliability once its RFC backlog lands; QwenPaw is a sleeper whose community quality exceeds its size; IronClaw is consolidating.

---

## 7. Trend Signals

1. **The persistence layer is the industry's next battleground.** SQLite limits are being hit simultaneously in three projects; the demand signal (Postgres/MySQL backends, append-only event histories, snapshot crash-guarantees) is unambiguous. Agent developers should design event-sourced, multi-writer-safe session storage from day one.
2. **Upgrades are a product feature, not an afterthought.** The loudest cross-project anger is "my assistant didn't come back after update." Transactional/atomic deployment (Hermes #88683) and validated release lanes (ZeroClaw #10048) will become table stakes.
3. **Delegation needs an economic and security model.** Cost budgets, owner principals, and per-sub-loop enforcement (ZeroClaw #10635/#10644/#10645) plus progress receipts — power users are stress-testing sub-agent systems faster than platforms are hardening them.
4. **Silent failure is the #1 trust killer.** Dropped messages, dropped tool params, lost replies, success-reported failures — this class, not missing features, dominates negative sentiment everywhere. Observability and fail-loud semantics are differentiators.
5. **Multi-tenancy is arriving at the "personal" assistant layer** (QwenPaw Hub, Hermes multi-profile, multi-bot gateways) — the "personal" category is becoming team infrastructure.
6. **Provider agnosticism requires wire-level paranoia.** Native-wire prompt-cache corruption (Hermes), model-specific enum breakage (ZeroClaw #10617), and malformed-JSON regressions (OpenClaw) show the provider abstraction layer is fragile and high-value.
7. **AI-assisted development is now visible inside these communities** — ZeroClaw's "Drafted with Codex" RFCs and OpenClaw's automated `clawsweeper` triage queue foreshadow agent-tooling projects eating their own dog food.
8. **Reproducibility is emergent as a first-class requirement** (IronClaw's pinned sandbox default) — expect benchmark-grade determinism to influence mainstream agent runtimes.

**Bottom line for developers:** durability (sessions, upgrades, provider calls), delegation economics, and in-flight progress visibility are where community demand is concentrated and underserved — the highest-leverage places to invest in any agent stack.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-06

---

## 1. Today's Overview

Hermes Agent shows **very high activity**: 100 tracked items updated in the last 24h (50 issues — 39 open, 11 closed; 50 PRs — 18 open, 32 merged/closed), with ~11 brand-new PRs filed today from a diverse set of contributors — an unusually strong intake day. The single most important item is a **P0 fix from teknium1** ([#104284](https://github.com/NousResearch/hermes-agent/pull/104284)) addressing Nous Portal prompt-cache corruption on the native Anthropic wire, indicating active maintainer attention to provider-level correctness. Thematically, the day is dominated by four clusters: **session-state durability** (SQLite `state.db` corruption), **install/update reliability** (especially Windows), **multi-profile security under gateway multiplexing**, and **session handoff/headless group chats**. Project health is good: a 64% PR closure ratio and same-day fixes for small bugs (e.g., [#104067](https://github.com/NousResearch/hermes-agent/issues/104067)) suggest a responsive, high-throughput development loop, though no release shipped today.

---

## 2. Releases

**No new releases today.** The most recent release referenced in tracker data remains `v2026.8.3` (0.20.0 "The Herald"), per [#80625](https://github.com/NousResearch/hermes-agent/issues/80625). The volume of merged fixes (fleet restart, auxiliary fallback, ANSI rendering) suggests these are accumulating toward the next tagged release.

---

## 3. Project Progress

**Merged/closed PRs today (landed progress):**

- [#76370](https://github.com/NousResearch/hermes-agent/pull/76370) — `fix(auxiliary)`: normalize resource-exhaustion fallback signals (`RESOURCE_EXHAUSTED`/`ResourceExhausted`/`resource-exhausted`), closing [#85649](https://github.com/NousResearch/hermes-agent/issues/85649). Improves compression-provider failover robustness.
- [#87504](https://github.com/NousResearch/hermes-agent/pull/87504) — `fix(cli)`: deferred "N commits behind" notice now rendered via prompt_toolkit, fixing the garbled ANSI output in [#83969](https://github.com/NousResearch/hermes-agent/issues/83969).
- [#101306](https://github.com/NousResearch/hermes-agent/pull/101306) — `fix(groups)`: recover room tasks across local state cleanup (terminal task recovery from bounded room logs, immutable fallback). Groundwork for resilient group sessions.

**Closed issues confirming fixes:** [#97345](https://github.com/NousResearch/hermes-agent/issues/97345) (SSH terminal pane regression from #95081), [#85651](https://github.com/NousResearch/hermes-agent/issues/85651) (fallback picker stranding temp route), [#87743](https://github.com/NousResearch/hermes-agent/issues/87743) (Slack native task cards `appendStream` failure), [#92353](https://github.com/NousResearch/hermes-agent/issues/92353) (Codex masked replay rejection bucketing), [#104067](https://github.com/NousResearch/hermes-agent/issues/104067) (profile_describer truncated JSON — same-day fix), and feature request [#47451](https://github.com/NousResearch/hermes-agent/issues/47451) (**GitLab Standard Webhooks signing support — implemented**).

**Advanced open work (all filed/updated today):** [#104284](https://github.com/NousResearch/hermes-agent/pull/104284) (P0 provider routing), [#104265](https://github.com/NousResearch/hermes-agent/pull/104265) (profile-scoped env vars, security), [#104278](https://github.com/NousResearch/hermes-agent/pull/104278) (same-gateway session handoff), [#104281](https://github.com/NousResearch/hermes-agent/pull/104281) (Vulkan auto-detect on AMD/Intel), [#104283](https://github.com/NousResearch/hermes-agent/pull/104283) / [#104285](https://github.com/NousResearch/hermes-agent/pull/104285) (paired fleet-restart fixes for #104249), plus Indonesian i18n seeding ([#92192](https://github.com/NousResearch/hermes-agent/pull/92192), [#93632](https://github.com/NousResearch/hermes-agent/pull/93632)).

---

## 4. Community Hot Topics

| Item | Activity | Signal |
|---|---|---|
| [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) Skills-index watchdog | 166 comments, open since 07-18 | Automated freshness probe still reports `degraded` (index ~30h old vs 26h limit); chronic CI/docs pipeline debt |
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) Automated Nous integration blocked | 70 comments | Recurring `cron/jobs.py` merge conflicts stall scheduled merges; ecosystem-integration friction |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) Group chats survive Desktop close | 24 comments | Strong demand for **headless multi-bot group chats** across devices — bots on laptop/VPS/home server, conversation continuity without Desktop running |
| [#23717](https://github.com/NousResearch/hermes-agent/issues/23717) RFC: Pluggable SessionDB | 21 comments, **8 👍** (highest reactions in dataset) | Users hitting SQLite's limits: the "hot-update death spiral" on `state.db`; PostgreSQL/MySQL backend request |
| [#88683](https://github.com/NousResearch/hermes-agent/issues/88683) Transactional deployment plan | 8 comments | Architecture proposal to unify install/update/bootstrap into one source of truth |
| [#22418](https://github.com/NousResearch/hermes-agent/issues/22418) macOS desktop/CLI gateway conflict | 8 comments | Discord token lock contention between Atomic Desktop and `--replace` CLI |

**Underlying needs analysis:** The community's center of gravity is shifting from single-user CLI usage toward **Hermes as a persistent, multi-profile, multi-device server**. Users want durable session storage beyond SQLite, session handoff between machines, group chats that don't depend on a GUI process, and an update mechanism that doesn't corrupt or forget the running deployment.

---

## 5. Bugs & Stability

Ranked by severity (new-today items flagged 🆕):

1. **P0 — Provider cache corruption** *(fix PR exists)*: [#104284](https://github.com/NousResearch/hermes-agent/pull/104284) — Nous Portal's native `/v1/messages` Anthropic route re-writes the prompt cache on **14–20% of calls** in concurrent tool loops. Fix: default `anthropic/*` to `chat/completions` behind `nous.anthropic_wire` knob. Filed today by teknium1.
2. **P1 — `state.db` corruption** *(no direct fix; RFC open)*: [#100896](https://github.com/NousResearch/hermes-agent/issues/100896) — 4 corruption incidents in 5 weeks under multi-writer WAL (gateway + dashboard); "5 live SessionDB handles" warning precedes onset. Part of tracked corruption class (#90837/#100313/#89737); structural fix is the SessionDB RFC [#23717](https://github.com/NousResearch/hermes-agent/issues/23717).
3. **P2 Security — cross-profile env leak** *(fix PR exists)*: [#104265](https://github.com/NousResearch/hermes-agent/pull/104265) — under multiplexing, all profiles share one `os.environ` with `override=True`; last-loading profile wins security-relevant vars.
4. 🆕 **P2 — Windows update crash**: [#104212](https://github.com/NousResearch/hermes-agent/issues/104212) — unhandled `WinError 5` on managed Node tree aborts update *after* git pull (code updated, deps/Desktop stale). No fix PR yet.
5. 🆕 **P2 — Permanent session hangs**: [#104243](https://github.com/NousResearch/hermes-agent/issues/104243) — `relay_runtime` scope-handle stack error in `end_turn()` leaves sessions unresponsive. No fix PR yet.
6. 🆕 **P2 — Kanban breakage after update**: [#104217](https://github.com/NousResearch/hermes-agent/issues/104217) — split Kanban modules depend on private helpers missing from `kanban_db.py`; dashboard HTTP 500. No fix PR yet.
7. **P2 — Degenerate tool calls executed**: [#103599](https://github.com/NousResearch/hermes-agent/issues/103599) — repetition guard only covers visible text, not tool-call args; related feature ask [#99743](https://github.com/NousResearch/hermes-agent/issues/99743).
8. **P2 — Update path data loss**: [#90495](https://github.com/NousResearch/hermes-agent/issues/90495) — ZIP fallback deletes Desktop app + web_dist and forgets Desktop was installed.
9. **P2 — Windows venv transaction recovery**: [#103822](https://github.com/NousResearch/hermes-agent/issues/103822).
10. **P2 — Fleet restart false positive**: [#98588](https://github.com/NousResearch/hermes-agent/issues/98588) *(fixes in flight: [#104283](https://github.com/NousResearch/hermes-agent/pull/104283)/[#104285](https://github.com/NousResearch/hermes-agent/pull/104285))*.
11. **P2 — UX/false positives**: [#85043](https://github.com/NousResearch/hermes-agent/issues/85043) (threat screen flags the word "havoc"), [#80625](https://github.com/NousResearch/hermes-agent/issues/80625) (SSH fails on Fish shell), [#22894](https://github.com/NousResearch/hermes-agent/issues/22894) (TUI thinking leak with `show_reasoning=false`).
12. **P3**: 🆕 [#104242](https://github.com/NousResearch/hermes-agent/issues/104242) (kanban watch latency), [#54088](https://github.com/NousResearch/hermes-agent/issues/54088) (worker crash on unresolvable skill).

---

## 6. Feature Requests & Roadmap Signals

- **Pluggable SessionDB ([#23717](https://github.com/NousResearch/hermes-agent/issues/23717), 8 👍)** — the highest-reaction item and structural answer to the P1 corruption cluster. **Most likely headline feature of the next major version**, possibly behind an experimental flag.
- **Headless group chats + session handoff ([#97681](https://github.com/NousResearch/hermes-agent/issues/97681))** — directly supported by today's [#104278](https://github.com/NousResearch/hermes-agent/pull/104278) (viewer/writer session separation) and merged [#101306](https://github.com/NousResearch/hermes-agent/pull/101306); near-term shipping probability is high.
- **Transactional deployment ([#88683](https://github.com/NousResearch/hermes-agent/issues/88683))** — the unifying architecture for the Windows/update bug cluster; likely internal priority given the flood of `area/install-update` items.
- **Agent loop hardening** ([#99743](https://github.com/NousResearch/hermes-agent/issues/99743)) — built-in repeat-command guard; pairs with the #103599 bug, suggesting a consolidated fix.
- **Profile-scoped resource ownership** — [#104279](https://github.com/NousResearch/hermes-agent/pull/104279) (proxy env scoping), [#21877](https://github.com/NousResearch/hermes-agent/issues/21877) (Kanban board ownership) show a consistent direction: killing global ambient state under multiplexing.
- **GitLab Standard Webhooks ([#47451](https://github.com/NousResearch/hermes-agent/issues/47451))** — completed today.
- **i18n expansion** — Indonesian docs locale ([#92192](https://github.com/NousResearch/hermes-agent/pull/92192), [#93632](https://github.com/NousResearch/hermes-agent/pull/93632)) continues steady localization momentum.

**Prediction for next release:** provider routing fix (#104284), profile-scoped env security (#104265), fleet-restart fixes (#104283/#104285), session handoff (#104278), and Windows update hardening.

---

## 7. User Feedback Summary

**Pain points (by frequency):**
- **Update reliability is the #1 recurring complaint**, overwhelmingly on Windows: crashes mid-update ([#104212](https://github.com/NousResearch/hermes-agent/issues/104212)), lost rollback boundaries ([#103822](https://github.com/NousResearch/hermes-agent/issues/103822)), deleted Desktop installs ([#90495](https://github.com/NousResearch/hermes-agent/issues/90495)), noisy warnings ([#98588](https://github.com/NousResearch/hermes-agent/issues/98588)).
- **Data integrity anxiety**: production users are losing `state.db` repeatedly ([#100896](https://github.com/NousResearch/hermes-agent/issues/100896)) and organizing around the SessionDB RFC — the most 👍-ed item in the dataset.
- **Always-on expectations**: users run bot swarms on mixed hardware (laptop/VPS/home server) and are frustrated that group chats and sessions die with the Desktop process.
- **Edge-case friction**: Fish-shell SSH remotes, threat-screen false positives blocking legitimate SOUL.md content, focus-stealing browser windows.

**Satisfaction signals:** Same-day triage/fix of [#104067](https://github.com/NousResearch/hermes-agent/issues/104067); founder-level engagement on the P0 provider issue; strong external contributor flow (11 PRs today); community-driven i18n. Reports are detailed and reproducible — an invested, technical user base.

---

## 8. Backlog Watch

Items aging without resolution that need maintainer attention:

- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — Skills-index degraded for **~50 days** (166 comments); the docs pipeline cron is chronically stale. Highest comment count in the project; symbolic debt.
- [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) — automated integration merge conflicts open ~3 weeks (70 comments).
- [#23717](https://github.com/NousResearch/hermes-agent/issues/23717) — SessionDB RFC stuck in `needs-decision` for **~4 months** despite 8 👍 and a P1 bug class depending on it.
- [#21877](https://github.com/NousResearch/hermes-agent/issues/21877), [#22418](https://github.com/NousResearch/hermes-agent/issues/22418), [#22894](https://github.com/NousResearch/hermes-agent/issues/22894) — all open since early May (~4 months).
- PR [#44368](https://github.com/NousResearch/hermes-agent/pull/44368) (Kanban decomposer refactor guard) open ~3 months.
- PR [#98564](https://github.com/NousResearch/hermes-agent/pull/98564) (Bedrock fix) was **rebased today because `main` changed underneath it** (dispatch-table refactor) — at risk of a second rebase; reviewer attention recommended.
- [#90495](https://github.com/NousResearch/hermes-agent/issues/90495) (update deletes Desktop), [#80625](https://github.com/NousResearch/hermes-agent/issues/80625) (Fish SSH), [#85043](https://github.com/NousResearch/hermes-agent/issues/85043) (threat false positive) — 3–4 weeks open, P2, no linked fix PRs.

---

**Health snapshot:** Activity 🔥 high (100 items/24h) · Throughput ✅ strong (32 PRs closed) · Releases ⏸ none today · Top risk: session-state durability + Windows update path · Top momentum: provider routing fix, session handoff, multi-profile security hardening.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-06

**Repo:** [nearai/ironclaw](https://github.com/nearai/ironclaw)

---

## Today's Overview

IronClaw had a quiet day: **zero issues** were opened or updated, **zero releases** were published, and **no PRs were merged or closed**. Activity was limited to **two open pull requests** — one a user-facing UX fix for Slack shared channels ([#8076](https://github.com/nearai/ironclaw/pull/8076)) and one a large architecture change making the embedded Pi sandbox loop the startup default ([#8075](https://github.com/nearai/ironclaw/pull/8075)). The low volume coincides with a Sunday, and both PRs come from distinct contributors (one flagged as core), suggesting steady but low-velocity weekend maintenance rather than a stall. The high PR numbering (8,0xx) indicates a mature repository with substantial historical throughput; overall project health appears stable, with current energy concentrated on sandbox architecture and channel-integration polish.

**Daily metrics:** PRs opened: 2 · PRs merged/closed: 0 · Issues opened: 0 · Releases: 0

---

## Project Progress

**No PRs were merged or closed today.** Two open PRs advanced:

- **[#8076](https://github.com/nearai/ironclaw/pull/8076) — `fix(assistant): distinguish disconnected shared channels`** (be-student). A correctness fix that distinguishes a paired user's *disconnected* shared channel from a genuinely *unpaired* account. It renders channel-specific guidance for both user messages and bot commands, keeps rejection classification consistent across the product, adapter, and OpenAI-compatible API surfaces, and updates Slack capabilities. This tightens behavioral parity across surfaces — a sign of maturing multi-frontend hygiene.

- **[#8075](https://github.com/nearai/ironclaw/pull/8075) — `feat: make the embedded Pi sandbox loop the startup default`** (serrrfirat, core contributor; size XL, risk low, scopes: sandbox/docs). Adds a **pinned Bun/Pi agent-core worker to the sandbox image** and makes it the default boot profile for fresh startup, explicitly to serve benchmark use. Notably **stacked on [#7908](https://github.com/nearai/ironclaw/pull/7908)** (base branch from the #7903 native-loop-sandbox spike) with an explicit "do not merge before the base PR" note — this is a deliberate, sequenced architecture migration, not an isolated patch.

**Assessment:** The sandbox initiative is the active front — IronClaw is moving toward an in-sandbox native agent loop as the default runtime, a significant architectural direction.

---

## Community Hot Topics

There is no measurable discussion activity today: **0 issues, 0 comments (undefined/none on both PRs), and 0 👍 reactions**. The two open PRs are the only community surfaces, and neither has drawn review traffic yet.

Underlying needs inferred from PR content:

- **[#8076](https://github.com/nearai/ironclaw/pull/8076):** Users of shared channels (Slack-first) need **accurate, actionable state communication** — being told an account is "unpaired" when the real problem is a disconnected channel is misleading. The consistent classification across product/adapter/OpenAI-compatible surfaces signals demand for a single source of truth on rejection reasons.
- **[#8075](https://github.com/nearai/ironclaw/pull/8075):** The change was "explicitly requested for benchmark use," indicating that **benchmark/reproducibility consumers are a driving constituency** and need a self-contained, pinned sandbox runtime as the out-of-the-box default.

---

## Bugs & Stability

Ranked by severity (only one candidate today; no crashes or regressions reported):

1. **Medium — Misclassified channel state in assistant surfaces.** Paired users with a disconnected shared channel were being treated as unpaired accounts, producing incorrect rejection messaging and bot-command guidance. **Fix PR exists and is open:** [#8076](https://github.com/nearai/ironclaw/pull/8076). Not a crash or data-loss bug, but a user-facing correctness issue affecting Slack integrations. Worth prioritizing review since it touches classification logic across three surfaces (product, adapter, OpenAI-compatible API).

No other bug reports, crashes, or regressions appeared in the 24-hour window.

---

## Feature Requests & Roadmap Signals

Signals from today's PRs (no issue-tracker feature requests available):

- **Sandbox-first runtime (strong signal):** Making the pinned Pi agent-core worker the default boot profile ([#8075](https://github.com/nearai/ironclaw/pull/8075)) is an explicit, requested direction. Expect this — along with its base [#7908](https://github.com/nearai/ironclaw/pull/7908) and docs updates — to define the next notable milestone once the stack merges.
- **Benchmark reproducibility:** The pinned-worker approach indicates a roadmap priority on deterministic, reproducible agent execution for evaluation.
- **Cross-surface API consistency:** [#8076](https://github.com/nearai/ironclaw/pull/8076)'s effort to keep rejection classification identical across product, adapter, and OpenAI-compatible surfaces suggests continued hardening of the OpenAI-compat layer — more parity PRs are likely.
- **Slack capability expansion:** Slack capability updates bundled in #8076 point to Slack as the most actively developed integration channel.

**Prediction:** The next release (the repo currently lists none) will likely center on the sandbox-default boot profile plus sandbox docs, with the shared-channel UX fix #8076 as a supporting item. Merge order will follow the stack: #7908 → #8075.

---

## User Feedback Summary

Direct user feedback is **unavailable today** — zero issues and zero recorded comments — so this section relies on indirect signals:

- **Benchmark/eval users** are clearly a key audience: the sandbox default change was made at their explicit request, implying prior friction running standardized benchmarks against a non-default runtime.
- **Slack shared-channel users** experienced confusing rejection messages (disconnected channel conflated with unpaired account), a mild dissatisfaction addressed by [#8076](https://github.com/nearai/ironclaw/pull/8076).
- No satisfaction/dissatisfaction trends can be quantified from this window; sentiment tracking should resume when issue/comment activity returns.

---

## Backlog Watch

- **🔴 Stacked-PR dependency — [#8075](https://github.com/nearai/ironclaw/pull/8075) is blocked on [#7908](https://github.com/nearai/ironclaw/pull/7908).** An XL-sized PR sitting on an unmerged base is the main throughput risk this week. If #7908 stalls, both the sandbox migration and its docs updates stall with it. Maintainer attention on the base PR is the highest-leverage action available.
- **🟡 [#8076](https://github.com/nearai/ironclaw/pull/8076) awaits first review** (0 comments as of digest time). It spans three API surfaces, so an early cross-area reviewer would de-risk it.
- **Data limitation:** With zero issues in this window, long-unanswered issues cannot be enumerated from today's snapshot; a multi-week trend view is recommended for a reliable backlog audit.

---

*Digest generated from GitHub activity data for the 24 hours ending 2026-09-06. Links: [PR #8076](https://github.com/nearai/ironclaw/pull/8076) · [PR #8075](https://github.com/nearai/ironclaw/pull/8075) · [PR #7908](https://github.com/nearai/ironclaw/pull/7908)*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-06

*Repository: [agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw) | Personal AI assistant & agent framework*

---

## 1. Today's Overview

2026-09-06 was an active but release-free day: **14 issues updated (11 open / 3 closed)** and **6 PRs updated (5 open / 1 closed)**, with 5 new issues and 2 new PRs filed today. The dominant theme is a **cluster of context/memory-reliability bugs on the 2.2.x line** — five separate reports of conversation state being lost or ignored (#7579, #7584, #7571, #7548, #7447), compounded by a hardcoded context-size regression affecting every published release (#7576). The strongest health signal is **community response velocity**: first-time contributor [kabishou11](https://github.com/agentscope-ai/QwenPaw/pull/7577) opened same-day fix PRs for two of today's reported bugs, on top of two channel fixes earlier in the week. Overall project health is **moderately good** — bug reports are unusually well-documented with repro steps, but the context-loss cluster is the top reputational risk for the 2.2.0 rollout.

## 2. Releases

**No new releases in this reporting window.** Version signals from issue reports: users are running **2.2.0** Desktop builds (Windows) while the hosted platform (`qwenpaw.platform.agentscope.io`) is still on **2.2beta3** — the 2.2.x line appears to be in staged rollout. The multi-tenant **QwenPaw Hub** edition is announced for the 2.2.0 line ([#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)).

## 3. Project Progress

**Closed today:**
- **PR [#2134](https://github.com/agentscope-ai/QwenPaw/pull/2134)** (feat: configurable heartbeat timeout) — the only PR to leave the open state today, closed after ~5.5 months (created 2026-03-23). Merge status not confirmed in the feed; if closed unmerged, the need remains open.
- **Issue [#6814](https://github.com/agentscope-ai/QwenPaw/issues/6814)** — macOS SIGBUS crash in SQLite WAL (`sqlite3WalFindFrame`) opening `history.db`; a crash-class bug opened 2026-08-08 now resolved.
- **Issues [#7447](https://github.com/agentscope-ai/QwenPaw/issues/7447)** (long-context early-history loss) and **[#7548](https://github.com/agentscope-ai/QwenPaw/issues/7548)** (nav records lost after restart; data present in `history.db` but not rendered) — both closed, suggesting active triage of the context/display cluster.

**Advanced today (open):**
- **PR [#7521](https://github.com/agentscope-ai/QwenPaw/pull/7521)** — fold consumed `ThinkingBlock` content under context pressure; directly targets the context-exhaustion class underlying today's worst bug reports.
- **PRs [#7546](https://github.com/agentscope-ai/QwenPaw/pull/7546)** (lazy-load builtin channels — cuts startup by avoiding eager imports like `lark_oapi`) and **[#7547](https://github.com/agentscope-ai/QwenPaw/pull/7547)** (recover stuck per-session queue consumers) — first-time contributor, channel reliability/performance.
- **PRs [#7577](https://github.com/agentscope-ai/QwenPaw/pull/7577)** and **[#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578)** — new today, community fixes for #7559 and #7572 respectively.

**Net movement:** console UX, observability, channel reliability, startup performance, and context management all advanced — entirely via community contributions.

## 4. Community Hot Topics

| Item | Engagement | Topic |
|---|---|---|
| [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) | **23 comments, 3 👍** (open since 8/26) | QwenPaw Hub multi-tenant edition — "what should we build next?" |
| [#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450) | 8 comments | Main agent passively waits for user prompt before checking sub-agent status |
| [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) | 5 comments | 409 error on follow-up messages during active task |

**Underlying needs:**
- **#7318** reveals sustained demand to move beyond single-user usage: multi-user access and admin-managed skills (linked [#2324](https://github.com/agentscope-ai/QwenPaw/issues/2324)) are the community's standing asks. QwenPaw is perceived as outgrowing its "personal assistant" origin.
- **#7450/#7580** expose a gap in **multi-agent orchestration UX**: users expect the main agent to autonomously supervise sub-agents (progress-checking, failure recovery) rather than requiring manual "how's it going?" prompts.
- **#7559** reflects an expectation of **asynchronous, queue-based messaging semantics** in the console rather than task-level mutual exclusion.
- Honorable mention: contributor kabishou11's four targeted PRs in three days (#7546, #7547, #7577, #7578) — each mapped to a filed issue — model behavior the project should actively cultivate.

## 5. Bugs & Stability

Ranked by severity (all reported/updated in window):

| # | Severity | Issue | Status / Fix |
|---|---|---|---|
| 1 | 🔴 **Critical** | [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) + escalation [#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584): persisted assistant replies missing from subsequent requests — model "can't see what it just said," causing tool-call → lost-result → re-call death loops and erratic behavior. Verified on backend 2.2.0. | **OPEN — no fix PR.** PR #7521 is adjacent (context pressure) but not confirmed as the fix. |
| 2 | 🟠 **High** | [#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576): `RetryChatModel` hardcodes a 32768-token `context_size` fallback → `CONTEXT_UNFIT` errors (>31130 tokens) for **all models**, confirmed in every published release v2.1.0–v2.2.0. | **OPEN — no fix PR.** |
| 3 | 🟠 **High** | [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571): agent chronically ignores persistent instructions (file locations, source-vs-runtime dirs) — user suffered real damage when an auto-deploy script overwrote runtime code with uncommitted source. | **OPEN — no fix PR, user explicitly stuck.** |
| 4 | 🟡 **Medium-High** | [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559): 409 rejection of follow-up messages during an active run. | Fix PR [#7577](https://github.com/agentscope-ai/QwenPaw/pull/7577) open (filed today). |
| 5 | 🟡 **Medium** | [#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572): `_coordinator.py` `_drain()` swallows exception stacks — only `str(exc)` returned to model, nothing logged. | Fix PR [#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578) open (filed today). |
| 6 | 🟡 **Medium** | [#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450): no autonomous sub-agent status monitoring. | OPEN — feature fix proposed in #7580. |
| 7 | ✅ Resolved | [#6814](https://github.com/agentscope-ai/QwenPaw/issues/6814) (SIGBUS crash), [#7447](https://github.com/agentscope-ai/QwenPaw/issues/7447), [#7548](https://github.com/agentscope-ai/QwenPaw/issues/7548) — closed today. | Closed. |

**Takeaway:** the two community fix PRs landed quickly, but the two highest-severity items (#7579/#7584, #7576) — both conversation-state integrity and both spanning all shipped releases — currently have no linked fix.

## 6. Feature Requests & Roadmap Signals

- **[#7580](https://github.com/agentscope-ai/QwenPaw/issues/7580)** — blocking built-in tool to wait for delegated agent tasks (replacing unreliable `check_agent_task` polling). Well-scoped, directly complements #7450 → **likely near-term**.
- **[#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582)** — plugin store overhaul: one-click bulk update, update notifications, no full-page refresh on install. Driven by users operating QwenPaw across **multiple machines**.
- **[#7583](https://github.com/agentscope-ai/QwenPaw/issues/7583)** — AgentScope community integration (login, inbox, agent-assisted bug-report refinement) in the Console; an ecosystem-cohesion play.
- **[#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)** — post-Hub roadmap: multi-user access, admin-managed skills.

**Prediction:** the next patch release (likely 2.2.1) will prioritize the context-loss cluster (#7579/#7584, possibly via #7521) plus the ready-made fixes #7577/#7578 and possibly #7546/#7547. The hardcoded context-size fix (#7576) is a low-effort, high-impact candidate for the same patch. Plugin-store UX and community features more plausibly land in the following minor cycle, alongside Hub maturation.

## 7. User Feedback Summary

- **Dominant pain point — memory/context reliability:** users describe the model forgetting its own last reply (#7579), losing hours of multi-day session context during long-document work (#7447 — 160-page Chinese Word OCR proofreading), and ignoring standing instructions (#7571). This cluster directly undermines trust for QwenPaw's core long-running-assistant use cases.
- **Multi-agent workflows feel under-supervised:** users must manually poll sub-agent progress (#7450) or want blocking waits (#7580).
- **Operational friction:** 409s on follow-up messages (#7559), click-heavy plugin management across multiple computers (#7582), and near-zero error visibility in logs (#7572).
- **Sentiment: critical but invested.** Reporters are sophisticated — one unpacked the PyInstaller backend's PYZ to verify the shipped version before filing (#7579) — and the community is converting complaints into fix PRs within 24–48h. Dissatisfaction is concentrated on 2.2.0 stability, not on product direction, which remains positively received (see Hub enthusiasm in #7318).
- **Observed use cases:** long-document OCR/typesetting QA, plugin development with source/runtime path separation, multi-PC fleet maintenance, and team deployments.

## 8. Backlog Watch

- **[#2134](https://github.com/agentscope-ai/QwenPaw/pull/2134)** — closed after 5.5 months. If closed unmerged, the configurable-heartbeat-timeout need (legitimate per the PR description: hardcoded 120s breaks long runs) remains unaddressed — verify whether superseded.
- **[#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576)** — affects every published release since v2.1.0 but has only 1 comment; needs maintainer triage. Small fix, broad impact.
- **[#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571)** — user states they don't know how to solve instruction-forgetting; needs maintainer guidance on memory persistence mechanisms.
- **PRs awaiting review:** #7546, #7547 (open since 9/4) and #7577, #7578 (today) — all from a first-time contributor; **timely review is important for contributor retention**. #7521 (context pressure fix) also needs attention given it may resolve the top-severity cluster.
- **[#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450)** — 8 comments, open since 9/1, no linked fix; should be triaged jointly with feature #7580.
- **[#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)** — the Hub discussion is approaching a decision point; the community expects a prioritization outcome before/with the Hub launch.

---
*Data note: PR comment counts were unavailable in the feed; PR engagement is inferred from update timestamps only. Issue/PR statuses reflect the 2026-09-06 snapshot.*

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-06

**Repo:** [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw) | **Reporting window:** last 24h

---

## 1. Today's Overview

ZeroClaw shows **very high sustained activity** — 89 items touched in 24 hours (39 issues updated, 9 closed; 50 PRs updated, 7 merged/closed) — with no release cut in this window (last tracked version remains **0.8.4** per the [#6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) rollout tracker). The day's work clusters around three themes: (a) continued **architecture RFC churn** on runtime-owned sessions, unified attachments, and an append-only event history (Revs 5/10/10 respectively); (b) a **delegation security-and-cost hardening wave** (#10644, #10645, #10635, #10391); and (c) a cluster of **P1 correctness bugs** including two S1 workflow blockers. Health signals are positive — active maintainer engagement (Audacity88 triaging and even repairing contributor branches), fresh contributor inflow (jstar0 and be-student each opened multiple PRs today), and a functioning contributor-tier ladder — but the 43-open-PR backlog (many XL-sized) and a long `needs-author-action`/`stale-candidate` tail indicate **review throughput is the main bottleneck**.

## 2. Releases

No new releases in this window. Notably, [Issue #10048](https://github.com/zeroclaw-labs/zeroclaw/issues/10048) (Rust 1.98.0 CI / cross-platform release-lane validation, an explicit pre-release gate) was **closed today**, suggesting the next release is approaching readiness.

## 3. Project Progress

Seven PRs merged/closed within the window (not itemized in the top-20 sample). Closed issues marking completed work streams:

- **Plugin TLS trust-store parity** — [#9653](https://github.com/zeroclaw-labs/zeroclaw/issues/9653): plugin `wasi:http` egress now reads OS trust roots, matching provider HTTPS behavior since #6528. Closed 2026-09-06.
- **TaskRecord single lifecycle owner refactor** — [#9593](https://github.com/zeroclaw-labs/zeroclaw/issues/9593): background delegation status unified in the control-plane task store. Closed.
- **Termux/Android install fix** — [#7911](https://github.com/zeroclaw-labs/zeroclaw/issues/7911): `install.sh` no longer selects the generic Linux aarch64 binary on Termux. Closed.
- **Rust 1.98.0 release lanes validated** — [#10048](https://github.com/zeroclaw-labs/zeroclaw/issues/10048). Closed.

Advancing open work:

- [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621) (XL, updated today): unified live-config authority across daemon RPC, gateway, channels, ACP, and CLI — a major lifecycle-coordination refactor.
- Newcomer burst: [PR #10657](https://github.com/zeroclaw-labs/zeroclaw/pull/10657) + [PR #10658](https://github.com/zeroclaw-labs/zeroclaw/pull/10658) (plugin test fixtures on Windows; expired dial-budget rejection) and [PR #10646](https://github.com/zeroclaw-labs/zeroclaw/pull/10646) (repo-wide docs link gate, implementing [#10580](https://github.com/zeroclaw-labs/zeroclaw/issues/10580)); [PR #10655](https://github.com/zeroclaw-labs/zeroclaw/pull/10655) (structured `tool_result_truncated` warnings) and [PR #10656](https://github.com/zeroclaw-labs/zeroclaw/pull/10656) (hardware-feature CI tests) from be-student.
- [#9345](https://github.com/zeroclaw-labs/zeroclaw/issues/9345) (auto-recalculate PR size/risk labels) progressed to in-progress — governance automation from the ratified #6808 RFC rolling out.

## 4. Community Hot Topics

| Item | Comments | Topic |
|---|---|---|
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | 33 | RFC: Runtime-owned sessions + transport adapters (Rev 5) |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | 26 | RFC: Unified file/attachment architecture (Rev 10) |
| [#6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) | 24 | RFC: Work lanes & board automation (ratified, Rev 26) |
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | 24 | RFC: Granular sandbox filesystem policy |
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 15 | Maintainer decision queue tracker |
| [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) | 9 | RFC: Composable WASM plugin runtime |

**Underlying needs:** The dominant thread is a **unified session/event model** — #9487, #9488, [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526), and #10076 collectively move session ownership from transports (WebSocket, Telegram, ACP) into the runtime, enabling reconnect-resilient turns ([#7759](https://github.com/zeroclaw-labs/zeroclaw/issues/7759)), consistent attachments across surfaces, and deterministic replay. High revision counts (Rev 5, Rev 10) show genuine design iteration, but also prompted the meta-RFC [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) to cut voting-window friction — a sign the governance process itself is straining under volume. #6808/#8692/#9345 all serve the same need: **scaling maintainer attention** as contribution volume grows. Note the visible "Drafted with Codex" attribution on #9488 — AI-assisted RFC drafting is an emerging pattern in this community.

## 5. Bugs & Stability

Ranked by severity (all reported/active within window):

1. **S1 — [#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)**: Daemon reload via Quickstart apply can abort a Tokio worker with a **stack overflow** during agent initialization (P1, `r:needs-repro`). *No fix PR visible yet.*
2. **S1 — [#9421](https://github.com/zeroclaw-labs/zeroclaw/issues/9421)**: Incomplete terminal provider responses reported as **success** to callers/delegation (P1). *Fix PR exists: [#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447) (open, needs-author-action since 2026-07-27).*
3. **P1 — [#10617](https://github.com/zeroclaw-labs/zeroclaw/issues/10617)**: `thinking.display: "updates"` returns **400 on Claude Fable 5.1** — wire enum narrowed to `summarized`/`omitted`. *No linked fix PR yet.*
4. **P1 — [#10644](https://github.com/zeroclaw-labs/zeroclaw/issues/10644)** / **[#10645](https://github.com/zeroclaw-labs/zeroclaw/issues/10645)**: Security follow-ups from #10601 — background delegate results persisted **without an owner principal**, and daily cost budget **not enforced in delegated sub-loops**. Both accepted; fixes pending.
5. **P1/S2 — [#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635)**: Runtime profile reports effectively unbounded daily cost limit while a $10 global ledger silently rejects turns — a **trust-breaking config mismatch**.
6. **S2 — [#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625)**: Literal `[media attachment]` placeholder leaked to users on non-vision models (accepted).
7. **S2 — [#10302](https://github.com/zeroclaw-labs/zeroclaw/issues/10302)**: ZeroCode TUI Code pane stuck in `Processing...` with elevated CPU while browsing history (in-progress).

**Resolved this window:** #9653 (plugin TLS), #7911 (Termux install).

## 6. Feature Requests & Roadmap Signals

- **Agent progress visibility** is a recurring user ask: [#10426](https://github.com/zeroclaw-labs/zeroclaw/issues/10426) (Telegram progress updates), [#10531](https://github.com/zeroclaw-labs/zeroclaw/issues/10531) (delegate sub-agent receipts/partial output).
- **Resilient sessions**: [#7759](https://github.com/zeroclaw-labs/zeroclaw/issues/7759) (background turns, resume on reconnect — accepted, in-progress) and [#6932](https://github.com/zeroclaw-labs/zeroclaw/issues/6932) (transcript-aware WebSocket persistence — accepted).
- **Provider polish**: [#9575](https://github.com/zeroclaw-labs/zeroclaw/issues/9575) (warm OpenAI-compatible connections via `/models` instead of `/chat/completions` — accepted).
- **Streaming surfaces**: [PR #10450](https://github.com/zeroclaw-labs/zeroclaw/pull/10450) (SSE streaming for webhook chat turns).
- **UX**: [#10641](https://github.com/zeroclaw-labs/zeroclaw/issues/10641) (per-field cron schedule input in web UI, `help wanted`); [#9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997) (Telegram secure model picker — stalled).

**Next-version prediction:** with #10048's release gates closed, the next release (likely 0.8.5) plausibly ships the delegate ownership/cost fixes (#10644/#10645), the Fable 5.1 thinking-display fix (#10617), #9575 warmup, and possibly #7759 background turns; the big RFC architectures (#9487/#9488/#10526/#10076) are longer-horizon (0.9+) work.

## 7. User Feedback Summary

- **Channel users feel "agent silence"**: Telegram goes quiet during long tool runs ([#10426](https://github.com/zeroclaw-labs/zeroclaw/issues/10426)); delegation is a black box until completion ([#10531](https://github.com/zeroclaw-labs/zeroclaw/issues/10531)); Matrix users on text-only models see raw placeholders ([#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625)). The strongest cross-cutting need is **transparency into in-flight agent work**.
- **Cost/config trust**: users hit a hard $10 ledger wall while the UI advertises an unbounded budget ([#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635)) — dissatisfaction centers on inconsistent truth between config and enforcement.
- **Power users on delegation** surfaced real security gaps (results readable workspace-wide, #10644) — sophisticated usage is stress-testing the model.
- **Edge-platform demand exists**: Termux/Android installs (fixed in #7911).
- **Sentiment toward maintainers is notably positive**: maintainer notes show Audacity88 repairing and re-basing external contributors' PRs in-place while preserving authorship ([#9753](https://github.com/zeroclaw-labs/zeroclaw/pull/9753), [#9283](https://github.com/zeroclaw-labs/zeroclaw/pull/9283), [#9739](https://github.com/zeroclaw-labs/zeroclaw/pull/9739)) — an unusually healthy contribution-care pattern.

## 8. Backlog Watch

Items aging with stalled states, needing maintainer or author attention:

- [PR #8966](https://github.com/zeroclaw-labs/zeroclaw/pull/8966) — provider identity on usage events / context-window resolution. **~8 weeks open**, needs-author-action. Highest-value stalled item.
- [PR #9283](https://github.com/zeroclaw-labs/zeroclaw/pull/9283) — web_fetch gzip/brotli decompression, since 2026-07-23, `stale-candidate` despite maintainer repair.
- [PR #9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447) — fix for S1 bug #9421, ~6 weeks in needs-author-action; **stability-critical**.
- [PR #9753](https://github.com/zeroclaw-labs/zeroclaw/pull/9753) — allowed_tools absent-vs-empty fail-closed semantics, `stale-candidate`.
- [PR #9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997) — Telegram model picker, `blocked` + `do-not-merge` since 2026-08-14; needs an explicit decision.
- [PR #9977](https://github.com/zeroclaw-labs/zeroclaw/pull/9977) — filesystem mutation confinement (security-relevant), needs-maintainer-review.
- [PR #10241](https://github.com/zeroclaw-labs/zeroclaw/pull/10241) — supervised shell approval routing across all channels, `blocked`.
- [PR #10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) — canonical principals (RFC #7141 stage 2), needs-author-action.
- **RFC decision debt**: #9487, #9488, #10076, and [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) all sit in needs-maintainer-review; the [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) queue exists for exactly this and should be worked down before the next release.

---

**Health verdict:** ZeroClaw is in a strong, growth-phase posture — high velocity, credible architecture direction, and excellent contributor stewardship — but carries elevated **WIP risk** (43 open PRs, many XL) and a **decision bottleneck** at the maintainer layer. Closing the S1 bug pair (#10230, #9421/#9447) and draining the #8692 RFC queue are the two highest-leverage actions before the next release.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*