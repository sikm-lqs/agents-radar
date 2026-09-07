# OpenClaw Ecosystem Digest 2026-09-08

> Issues: 482 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-07 23:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-08

## 1. Today's Overview

OpenClaw shows high development velocity with 482 issues and 500 PRs touched in the last 24 hours, split almost evenly between open/closed status on both sides (238/244 issues, 264/236 PRs). No new releases were published today, which combined with the volume of open P0/P1 regressions suggests the team is holding for a stabilization window before cutting the next version. The backlog skews heavily toward **event-loop blocking, child-process lifecycle, and provider/auth regressions** in the 2026.8.x → 2026.9.2 window, indicating a systemic performance-and-correctness theme rather than a single-component failure. Maintainer review and product decisions remain the dominant bottleneck — many high-severity issues carry `clawsweeper:needs-maintainer-review` / `needs-product-decision` labels without an open fix PR.

---

## 2. Releases

**No releases published in the last 24 hours.** The active development line appears to be 2026.9.2 (referenced in #139578, #140129, #140620, #140497) with prior stable references to 2026.7.1-2 and 2026.8.1/2026.8.2.

---

## 3. Project Progress

**Closed/merged PR activity (last 24h):** ~236 PRs merged or closed. Notable completed work:

- **Native Auth/CLI Models** — [PR #141654](https://github.com/openclaw/openclaw/pull/141654) `fix: preserve native CLI auth status in model lists` (obviyus)
- **Session recovery & test infra** — [PR #141629](https://github.com/openclaw/openclaw/pull/141629) `improve: reduce session recovery import overhead` (steipete); [PR #141650](https://github.com/openclaw/openclaw/pull/141650) `refactor(tests): remove duplicate memory resolver cases`; [PR #141637](https://github.com/openclaw/openclaw/pull/141637) `fix(test): preserve process snapshot selection`
- **Device UX** — [PR #141649](https://github.com/openclaw/openclaw/pull/141649) `fix(devices): use operator labels in node approval notices` (closes #141644)
- **Codex plugin distribution** — [PR #135970](https://github.com/openclaw/openclaw/issues/135970) closed (missing `node_modules` in `dist/extensions/codex`) — fix landed in pipeline.
- **Browser & UI polish** — [PR #135648](https://github.com/openclaw/openclaw/pull/135648) `perf(browser): prepare profile defaults in one map`; [PR #141632](https://github.com/openclaw/openclaw/pull/141632) `fix(ui): refresh selected usage details`; [PR #141543](https://github.com/openclaw/openclaw/pull/141543) `chore(i18n): refresh native locales` (closed)
- **macOS daemon** — [PR #133380](https://github.com/openclaw/openclaw/pull/133380) `fix(daemon): launchd gateway crash loop leaves no stderr` (ready for maintainer look)
- **CI frozen-version lane** — [PR #141640](https://github.com/openclaw/openclaw/pull/141640), [#141648](https://github.com/openclaw/openclaw/pull/141648), [#141652](https://github.com/openclaw/openclaw/pull/141652) all by RomneyDa: bind root Docker smoke to frozen source, accept legacy same-version updater contract, and use frozen-compatible Node runtime tests.

**Areas advanced:** CI/frozen-validation pipeline, native CLI auth UX, test de-duplication, browser profile perf, i18n refresh. Maintainer steipete was particularly active with 6+ small S/XS refactors.

---

## 4. Community Hot Topics

The top items by comment count cluster around three underlying needs:

**A. Provider/Auth reliability for Claude-Sonnet-5 and Codex OAuth**
- [#135111](https://github.com/openclaw/openclaw/issues/135111) — *17 comments* — Intermittent `Provider completed tool call with malformed JSON arguments` on v2026.8.1 (claude-sonnet-5); affects ~6% of runs, not tied to file. Platinum Hermit, needs live repro.
- [#89278](https://github.com/openclaw/openclaw/issues/89278) — *11 comments, 👍2* — Codex OAuth refresh succeeds but cron/heartbeat fail with 10s auth refresh timeout. Diamond Lobster, regression, linked-PR-open.

**B. Multi-agent lifecycle correctness**
- [#43367](https://github.com/openclaw/openclaw/issues/43367) — *14 comments, 👍1* — Concurrent `agents add/config` overwrites, session-lock failures, detached child work. Open since March 2026 — a long-standing stability gap.
- [#126360](https://github.com/openclaw/openclaw/issues/126360) — *16 comments* — `AgentSelectionRequiredError` floods logs under explicit multi-agent ownership (logbook plugin, Control UI global RPCs, system-agent turns). Needs product decision on default-agent policy.
- [#137332](https://github.com/openclaw/openclaw/issues/137332) — *6 comments* — Mixed terminal requester-settle batches retry forever after ownership check (Diamond Lobster, fix-shape-clear).

**C. Context-window & session transcript lifecycle**
- [#115908](https://github.com/openclaw/openclaw/issues/115908) — *16 comments* — Session transcript projection reconcile can livelock under sustained writes, blocking the main thread and stalling all channel transports (Diamond Lobster, source-repro confirmed).
- [#119720](https://github.com/openclaw/openclaw/issues/119720) — *13 comments* — Synchronous agent persistence and transcript maintenance block the Gateway event loop at scale. Related to #115908.
- [#117262](https://github.com/openclaw/openclaw/issues/117262) — *8 comments, 👍2* — SQLite contention: 3 concurrent write handles on `state/openclaw.sqlite` cause ~33s event-loop stalls (DEF-61).
- [#140620](https://github.com/openclaw/openclaw/openclaw/issues/140620) — *4 comments* — In-place upgrade 2026.7.1-2 → 2026.9.2: session-transcript reconciliation imports 27/~1500 sessions then stalls; pre-upgrade sessions unfindable via `sessions_search`. **Directly affects upgrade-path users.**

**Underlying community need:** users want reliable long-running, multi-channel agents that don't silently lose context, leak sessions, or stall event loops under sustained load. The transcript/ownership/auth axes are the three pillars of trust that need hardening before the next release.

---

## 5. Bugs & Stability

### P0 (Release blockers / release-blocking UX)

| Issue | Title | Fix PR? |
|---|---|---|
| [#140908](https://github.com/openclaw/openclaw/issues/140908) | `doctor --fix` / `gateway status --deep` fail with EACCES on `systemctl --user is-enabled` under systemd --user, blocking all post-upgrade migrations | None open |
| [#140620](https://github.com/openclaw/openclaw/issues/140620) | In-place upgrade 2026.7.1-2 → 2026.9.2 stalls session reconciliation at 27/~1500 sessions | None open |
| [#140497](https://github.com/openclaw/openclaw/issues/140497) | Discord setup accepts application ID as bot token, marks channel configured, never starts (lastError=null) | None open |
| [#89278](https://github.com/openclaw/openclaw/issues/89278) | Codex OAuth refresh succeeds but cron/heartbeat fail with 10s auth refresh timeout | Linked-PR-open |

### P1 (High severity)

| Issue | Title | Notes |
|---|---|---|
| [#135111](https://github.com/openclaw/openclaw/openclaw/issues/135111) | Intermittent malformed JSON arguments on claude-sonnet-5 (v2026.8.1) | Regression; needs live repro |
| [#97616](https://github.com/openclaw/openclaw/openclaw/issues/97616) | Unreaped hook/tool child processes → zombie accumulation | Regression since June 2026 |
| [#126360](https://github.com/openclaw/openclaw/openclaw/issues/126360) | `AgentSelectionRequiredError` floods logs under explicit ownership | Needs product decision |
| [#115908](https://github.com/openclaw/openclaw/openclaw/issues/115908) | Transcript reconcile livelock stalls main thread | Source-repro confirmed |
| [#119720](https://github.com/openclaw/openclaw/openclaw/issues/119720) | Synchronous agent persistence blocks Gateway event loop at scale | Diamond Lobster |
| [#136183](https://github.com/openclaw/openclaw/openclaw/issues/136183) | Command executor hangs spawning ssh — SIGTERM during banner (regression in 2026.8.1) | None open |
| [#140010](https://github.com/openclaw/openclaw/openclaw/issues/140010) | Sleep/resume on Windows: 30-60s+ reconnect failure post-wake | None open |
| [#137613](https://github.com/openclaw/openclaw/openclaw/issues/137613) | Pre-compaction memory flush disabled on CLI backends | Fix hits compactionCount trap |
| [#139578](https://github.com/openclaw/openclaw/openclaw/issues/139578) | llama.cpp managed EmbeddingGemma runs at ubatch 512 in 2026.9.2 | Possible regression from #134389 |
| [#137927](https://github.com/openclaw/openclaw/openclaw/issues/137927) | Internal context block leaks into Telegram message text (security-flavored) | None open |
| [#117262](https://github.com/openclaw/openclaw/openclaw/issues/117262) | SQLite contention 33s event-loop stalls (DEF-61) | None open |
| [#118018](https://github.com/openclaw/openclaw/openclaw/issues/118018) | Stale subagent completion delivered into replaced requester lifecycle | Diamond Lobster |
| [#101793](https://github.com/openclaw/openclaw/openclaw/issues/101793) | Assistant text preceding tool call dropped on Signal | Linked-PR-open |
| [#125764](https://github.com/openclaw/openclaw/openclaw/issues/125764) | Telegram adapter dead-letters outbound sends after one attempt | None open |
| [#121232](https://github.com/openclaw/openclaw/openclaw/issues/121232) | memory-core dreaming: ranker promotes 0 candidates forever | Diamond Lobster |
| [#113701](https://github.com/openclaw/openclaw/openclaw/issues/113701) | Context overflow: large tool outputs, compaction can't recover | Silver Shellfish |
| [#140129](https://github.com/openclaw/openclaw/openclaw/issues/140129) | 2026.9.2 Anthropic cache stuck at ~46k prefix, rewrites history fingerprints | None open |
| [#140971](https://github.com/openclaw/openclaw/openclaw/issues/140971) | All Feishu plugin tools silently dropped in message-driven runs (regression 2026.7.1-2 → 2026.8.1) | None open |

**Severity concentration:** 4× P0 + 15× P1 today. The cluster on **transcript/ownership/event-loop** is the dominant theme; a single coordinated fix in the projection reconcile + SQLite writer queue could move the needle on multiple top items simultaneously.

---

## 6. Feature Requests & Roadmap Signals

**Likely near-term (next 1–2 releases):**

- **Telegram bot-to-bot / guest-bot support** — [#79077](https://github.com/openclaw/openclaw/issues/79077) (closed-stale, 8 👍, 15 comments). Reflects Telegram's May-7 platform features; high 👍 suggests community appetite is strong; resurfacing likely with new channels SDK work.
- **Resolved backend model exposure** — [#51441](https://github.com/openclaw/openclaw/issues/51441) (8 comments, 1 👍) — `session_status` should report the *actual* model used when routing proxies (LiteLLM) alias. Practical for cost-tracking and debugging; aligns with the [`openclaw models status --agent --probe`](https://github.com/openclaw/openclaw/issues/89278) usage pattern.
- **Reasoning stream in chat** — [#42276](https://github.com/openclaw/openclaw/issues/42276) (6 comments). Streaming-style thinking indicators like OpenAI/Grok; has a `/reason` channel but doesn't overwrite live. Concrete UX win.
- **Detached managed Lobster runs after tool return** — [#126781](https://github.com/openclaw/openclaw/issues/126781) — author notes OpenClaw 2026.9.1 already covers "most of this request"; refines scope for follow-on.
- **WhatsApp listen-only / hooks-only mode** — [#78963](https://github.com/openclaw/openclaw/issues/78963) — archival/ETL use case without invoking LLM. Likely pairs with the broader hooks surface.
- **Make Workboard card notes clickable** — [#141472](https://github.com/openclaw/openclaw/issues/141472) — small UX win for Workboard adoption.

**Medium-term (likely roadmap, not imminent):**

- **Per-job elevated exec scoping for cron and heartbeat** — [#41484](https://github.com/openclaw/openclaw/issues/41484) — wildcard-only elevated scope is a multi-user security limitation; needs security review.
- **Detached managed Lobster runs** [#126781](https://github.com/openclaw/openclaw/issues/126781) — approvals, resume, cancellation tracking into TaskFlow.
- **Native cache reuse across sanitized history** — [#140129](https://github.com/openclaw/openclaw/issues/140129) is filed as a bug but contains a clear feature ask.

---

## 7. User Feedback Summary

**Dominant pain points (verbatim from issue bodies):**

1. **Multi-channel Telegram/Discord/Signal parity regressions.** Users explicitly cite v2026.8.1 / 2026.8.2 as breaking previously working channel behavior — quoted messages lose content (#101793 Signal), markdown leaks for `file://` URIs (#137705), internal context blocks leak as visible text (#137927), dead-lettered sends after a single attempt (#125764), and Discord `/new` returns "No reply was generated" without resetting the session (#140535). Sentiment: high frustration; channels are a flagship feature.

2. **Upgrade pain.** Multiple users (e.g., #135111, #140620, #140908, #106920 closed) hit blocking issues *immediately after* `openclaw update`. The 2026.7.x → 2026.8.x → 2026.9.x ladder has at least three documented break-on-upgrade paths. Trust in upgrade commands is degrading.

3. **macOS daemon silent failures.** [#140010](https://github.com/openclaw/openclaw/issues/140010) (Windows sleep/wake), [#133380](https://github.com/openclaw/openclaw/pull/133380) PR (launchd crash loop, stderr empty), [#97616](https://github.com/openclaw/openclaw/issues/97616) (zombie children on macOS) — the macOS LaunchAgent story is consistently reported as opaque.

4. **Provider lock-in concerns.** Several P1s (#89278 Codex OAuth, #135111 Claude-Sonnet-5) put a single provider outage into P1 territory. Users want clearer failure modes, not just retries.

5. **Positive signals:**
   - Heavy maintainer activity from steipete, vincentkoc, RomneyDa, fuller-stack-dev.
   - Quick turnaround on `i18n`, `tests`, and small refactors.
   - [#135970](https://github.com/openclaw/openclaw/issues/135970) (Codex `dist` missing `node_modules`) closed within 24h — fix shape was clear.
   - Active external contributor engagement (maintainer-allowed-edit policy working).

**Use-case signals:** Workboard/TaskFlow for kanban-style agent work ([\#141472](https://github.com/openclaw/openclaw/issues/141472)), automated archival via WhatsApp hooks ([\#78963](https://github.com/openclaw/openclaw/issues/78963)), routing proxies / cost observability ([\#51441](https://github.com/openclaw/openclaw/issues/51441)), and long-lived nightly memory consolidation ([\#121232](https://github.com/openclaw/openclaw/issues/121232)) — OpenClaw is being used as infrastructure, not a one-shot chat client.

---

## 8. Backlog Watch — Items Needing Maintainer Attention

**Long-unanswered high-priority items still open:**

| Item | Age | Why it stalls |
|---|---|---|
| [#43367](https://github.com/openclaw/openclaw/issues/43367) Multi-agent orchestration instability | Open since **2026-03-11** (6 months) | `needs-product-decision`, `needs-security-review`, `linked-pr-open` — foundational question of concurrent agent add/config semantics |
| [#42276](https://github.com/openclaw/openclaw/issues/42276) Reasoning stream | Open since 2026-03-10 | `needs-product-decision`, no linked PR — UX feature vs renderer rewrite trade-off |
| [#51441](https://github.com/openclaw/openclaw/issues/51441) Resolved backend model in session_status | Open since 2026-03-21 | `needs-product-decision` — touches session_status contract |
| [#74586](https://github.com/openclaw/openclaw/issues/74586) AM embedded run aborts memory_search | Open since 2026-04-29 (4+

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Personal AI Assistant / Agent Open-Source Ecosystem
**Data window: 2026-09-08 (24h) · Projects: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw**

---

## 1. Ecosystem Overview

The open-source personal AI assistant space has clearly matured from "chat client" to "always-on infrastructure": issue queues across all five projects are dominated by daemon lifecycle, cron/heartbeat scheduling, crash-recovery persistence, and in-place upgrade paths rather than conversational features. Four of five projects show severe open bugs in **context/transcript integrity** — silent context loss is now the ecosystem's #1 trust problem. Provider heterogeneity (BYO endpoints: LM Studio, DeepSeek, GLM, Bedrock, LiteLLM-style gateways, OAuth flows) is table stakes, and hard-coded model assumptions break in production within days (OpenAI's gpt-5.5 removal on 2026-09-07 disabled Hermes' image_gen plugin entirely). Finally, an unusual meta-trend is visible: projects are dogfooding AI agents against their own development (QwenPaw's QPQAT bot PRs, agent-drafted bug reports, IronClaw's automated failure taxonomy).

---

## 2. Activity Comparison

| Project | Issues 24h (open/closed) | PRs 24h (open/merged-closed) | Close ratio (issues/PRs) | Release status | Health score |
|---|---|---|---|---|---|
| **OpenClaw** | 482 (238/244) | 500 (264/236) | 51% / 47% | None; 2026.9.2 line held for stabilization | **B+** — Highest throughput by ~5–10x, but 4 P0 + 15 P1 open and maintainer review is the bottleneck |
| **QwenPaw** | 39 (23/16) | 48 (30/18) | 41% / 38% | v2.2.0 (~1 wk old); patch expected | **B+** — Healthiest balance: active triage of post-release regression wave, 3 first-time contributors, 3 criticals still unfixed |
| **Hermes Agent** | 50 (45/5) | 48 (48/2) | 10% / 4% | v0.21.1 patch shipped (rollup tag) | **B−** — Large in-flight changeset, patch discipline maintained, but P1 cluster on Windows update + profile isolation |
| **ZeroClaw** | 30 (26/4) | 50 (46/4) | 13% / 8% | None; on v0.8.5 | **C+** — Engaged power users filing precise reports, but 6:1 open/closed and an aging XL PR queue with an open S0 data-loss bug |
| **IronClaw** | 1 (1/0) | 5 (5/0) | 0% / 0% | None | **C** — Quiet maintainer-driven iteration; zero community engagement signal in window |

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Scale and community:** ~982 tracker items touched in 24h vs. 87 (QwenPaw), 100 (Hermes), 80 (ZeroClaw), 6 (IronClaw). No other project approaches this volume, giving OpenClaw the deepest bug discovery, feature-signal mining, and external contributor pool (maintainer-allowed-edit policy is working).
- **Breadth of surface:** only project with simultaneous depth in multi-agent orchestration, five messaging channels (Telegram/Discord/Signal/WhatsApp/Feishu), Workboard/TaskFlow, and memory consolidation — users treat it as infrastructure, not a client.
- **Fix velocity on clear-shape bugs:** #135970 (Codex `dist` packaging) closed within 24h.

**Disadvantages:**
- **Unresolved severity backlog:** 4 P0s (systemd EACCES blocking all migrations, upgrade stall at 27/~1500 sessions, Discord misconfiguration, Codex OAuth) with no open fix PRs; many P1s parked on `needs-product-decision` — review throughput, not engineering, is the constraint.
- **Architectural strain:** the Node.js single event-loop model is the systemic root of its top cluster (transcript reconcile livelock #115908, sync persistence blocking #119720, SQLite contention 33s stalls #117262). ZeroClaw's Rust/Tokio daemon avoids event-loop stalls (its failures are instead stack overflow on reload and turn-state machine bugs).
- **Upgrade trust erosion:** three documented break-on-upgrade paths in the 2026.7→2026.9 ladder — a sharper risk than QwenPaw's single post-v2.2.0 wave.

**Community size comparison:** OpenClaw > Hermes ≈ ZeroClaw (technical, precise reporters) > QwenPaw (broad, multi-channel, CJK-heavy) >>> IronClaw (effectively no community).

---

## 4. Shared Technical Focus Areas

| Focus area | Projects | Specific needs |
|---|---|---|
| **Context/transcript persistence integrity** | OpenClaw, QwenPaw, ZeroClaw, (Hermes: WAL split-brain #102589) | Crash-safe turn persistence (ZeroClaw #10121, S0), no silent reply drops (QwenPaw #7579), no reconcile livelock (OpenClaw #115908), upgrade-safe session migration (OpenClaw #140620) |
| **Heterogeneous provider / BYO-model support** | All 5 | LM Studio/DeepSeek/GLM/WUSRouter edge cases (QwenPaw), OAuth refresh timeouts (OpenClaw #89278), custom-provider timeout lookups (Hermes #105371), Bedrock cachePoint kill-switch (ZeroClaw #8720), no hard-coded model pins |
| **Multi-channel messaging parity** | All 5 | Voice transcription (ZeroClaw #10688/#10689), markdown/BiDi rendering (QwenPaw #2120, #7585), dead-letter retries (OpenClaw #125764), Slack channel-state disambiguation (IronClaw #8076) |
| **Concurrency / multi-agent correctness** | OpenClaw, ZeroClaw, QwenPaw, Hermes | Parallel-turn interleaving (ZeroClaw #10408), agent ownership policy (OpenClaw #126360), mid-task message queueing vs 409 (QwenPaw #7559), profile isolation on multiplexed gateways (Hermes #105396) |
| **Security & trust boundaries** | Hermes, ZeroClaw, QwenPaw, OpenClaw | Authenticated out-of-band channels (Hermes #81828 steer-marker forgery), workspace confinement and internal principals (ZeroClaw #9977, #10425), protected execution contracts (QwenPaw #7526), context-block leakage (OpenClaw #137927) |
| **Prompt-cache correctness & cost accounting** | ZeroClaw, OpenClaw | Configurable cache_control TTL/breakpoints (ZeroClaw #10663/#10662), stuck-prefix cache rewrites (OpenClaw #140129) |
| **Desktop/installer reliability** | Hermes, OpenClaw, QwenPaw | Windows update exit codes (Hermes #105145), launchd crash loops (OpenClaw #133380), macOS TCC (QwenPaw #7614) |
| **Memory as pluggable subsystem** | QwenPaw, OpenClaw | Memory backend plugin architecture with lifecycle contracts (QwenPaw #7561/#7616), reliable nightly consolidation (OpenClaw #121232) |

---

## 5. Differentiation Analysis

- **OpenClaw** — *Swiss-army infrastructure for self-hosters.* Broadest scope (multi-agent + channels + memory + kanban); TypeScript/Node gateway with SQLite state; scale is its moat, single-threaded blocking is its tax.
- **Hermes Agent** — *Desktop-first personal assistant with multi-tenant ambitions.* Strong on desktop packaging (Windows/macOS), profile-scoped isolation on shared gateways, and the most advanced **security-boundary thinking** (steer-marker authentication, egress authorization, file quarantine). NousResearch lineage shows model-adjacent experimentation (Collective Wisdom Agent V1, cross-org knowledge sharing).
- **IronClaw** — *Enterprise integration backend, not a community project.* Slack/shared-channel semantics and OpenAI-compatible surface parity; unique **benchmark-driven quality culture** (daily failure taxonomy attributing failures to upstream model quality vs. product defects). Effectively closed cadence.
- **QwenPaw** — *The BYO-model, CJK-market champion.* Deepest support for local/exotic endpoints and WeChat/QQ/Feishu channels; only project with a plugin/skill marketplace generating ecosystem activity, and the boldest architecture move (breaking memory-plugin refactor). Also the most explicit about AI-assisted development (QPQAT agent PR team).
- **ZeroClaw** — *Performance- and protocol-first operator tool.* Rust/Tokio; ACP/ZeroCode turn lifecycle for editor integration (Zed); uniquely focused on **Anthropic prompt-cache economics**. Weakest release cadence and heaviest stalled-PR load.

---

## 6. Community Momentum & Maturity

- **Tier 1 — Massive velocity, scaling strain (OpenClaw):** 5–10x peer volume; risk has shifted from "will people contribute" to "can maintainers review." Product-decision label backlog is the choke point.
- **Tier 2 — Healthy iteration (QwenPaw, Hermes):** QwenPaw is the ecosystem's best-run tracker today (41%/38% close ratios, contributor inflow, release-process hardening via merge-freeze CI). Hermes is in a transition quarter — patch shipped, big feature set in flight (v0.22 signals: subagent picker UX, scriptable model discovery).
- **Tier 3 — Engaged but stalled (ZeroClaw):** power users file line-precise S0 reports, but 8 XL PRs aged 3–8 weeks (three `do-not-merge`/`blocked`/`stale`) plus bus-factor concentration on one contributor (Audacity88) are warning signs.
- **Tier 4 — Quiet (IronClaw):** steady internal iteration, zero community signal; roadmap readable only through PR flow.

**Rapidly iterating:** OpenClaw, QwenPaw. **Stabilizing:** Hermes. **At risk of drift:** ZeroClaw (backlog), IronClaw (community absence).

---

## 7. Trend Signals

1. **Context integrity is the trust battleground.** Silent context loss or transcript drop appears in 4/5 projects with real-world costs ("deployed wrong code over runtime" — QwenPaw #7571). Crash-safe, concurrent-safe persistence should be a v1 concern for any agent builder, not a hardening pass.
2. **Providers are unstable dependencies.** Model deprecations (gpt-5.5), OAuth timeout regressions, and endpoint quirks dominate P1 queues everywhere. **Never pin model identifiers; resolve and expose actual routed models at runtime** (cf. OpenClaw #51441, Hermes #105435, ZeroClaw #8966 — three projects independently converging on this).
3. **Prompt-cache accounting is becoming a user-visible feature.** Cache-marker placement bugs surface as cost leakage; configurability (TTL, breakpoints, per-provider disable) is a near-term differentiator (ZeroClaw leading).
4. **Security is formalizing from prompts to primitives:** HMAC-authenticated out-of-band channels, internal-principal identity, workspace confinement, protected-execution contracts — expect these to become expected agent-platform primitives.
5. **Memory is becoming a pluggable, versioned subsystem**, not baked-in state (QwenPaw's breaking refactor is the leading indicator).
6. **Upgrade trust is a retention metric:** both OpenClaw and QwenPaw show regression waves measurably eroding goodwill; release-process hardening (merge-freeze, frozen-version CI lanes) is the emerging countermeasure.
7. **Agents building agents:** bot-submitted PRs, agent-drafted bug reports, and automated failure taxonomies are normalizing AI-assisted maintenance — a competitive advantage for projects that harness it safely.

**Bottom line:** OpenClaw leads on scale and breadth but must convert throughput into resolution before its next release; QwenPaw is the best-run mid-size project to watch; Hermes differentiates on security and multi-tenancy; ZeroClaw owns the performance/cost niche but needs review capacity; IronClaw is a quiet enterprise bet.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-08

## 1. Today's Overview

Hermes Agent (`NousResearch/hermes-agent`) shows very high development velocity over the last 24 hours, with 50 issues and 50 PRs touched. Activity skews heavily toward open work (45 issues, 48 PRs still active) versus closed (5 issues, 2 PRs merged/closed), indicating a large in-flight change-set rather than a stabilization cycle. One patch release shipped (v0.21.1 / tag v2026.9.7), described as a main-rollup since v0.21.0 — i.e., a downstream-stability tag rather than a feature drop. The dominant themes in today's traffic are: profile-scoped resource isolation under multiplexed gateways (MCP servers, state DBs, profiles), Windows desktop update/reliability defects, sandbox/tooling plumbing (cua, terminal env_type, kanban stop-guard), and a cluster of security/boundary concerns around steer-markers, file-quarantine, and relay egress authorization.

## 2. Releases

- **[v2026.9.7 — Hermes Agent v0.21.1](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.7)** (Sep 7, 2026)
  - Patch release; rolls up `main` since v0.21.0 for tagged deployments and downstream consumers.
  - Measured at commit `6178e9f4eed8d99f4fc550add939d58c7bed6206`.
  - **No breaking changes or migration notes stated.** This is a marker release, so v0.21.0 → v0.21.1 is drop-in.

## 3. Project Progress

The 2 merged/closed PRs in the last 24h are not visible in the top-20 PR sample by comment count; all 20 sampled PRs are still OPEN. The five issues closed today cluster around install/update flows and session/notification edge cases:

- [#101147 (closed)](https://github.com/NousResearch/hermes-agent/issues/101147) — Sealed venvs (uv2nix/wheel/Docker) were missing `hermes_state_registry` in `pyproject.toml`'s `py-modules`, leaving `state.db` unusable. Fix is registration-only; backports cleanly into v0.21.x.
- [#98680 (closed)](https://github.com/NousResearch/hermes-agent/issues/98680) — macOS Desktop ~30s keep-alive transcript tick that flashed the composer and stole caret focus.
- [#96070 (closed)](https://github.com/NousResearch/hermes-agent/issues/96070) — Async-delegation watch notification silently dropped for raw sessions without an `api_server` adapter.
- [#57645 (closed)](https://github.com/NousResearch/hermes-agent/issues/57645) — macOS in-app desktop update closing without installing (duplicate of an existing fix line).
- [#85575 (closed)](https://github.com/NousResearch/hermes-agent/issues/85575) — Kanban cards created by dispatcher-spawned sessions inheriting ephemeral notification target.

Net effect: today's closes address three state/lifecycle correctness bugs and two UX defects on macOS desktop; all are low-to-medium risk, and none implies a behavioral change visible to non-affected users.

## 4. Community Hot Topics

By comment volume, the most engaged threads today are configuration UX, isolation under multiplexing, and security:

1. **[#67347 — Guided picker for Subagent Model + Provider in Advanced Settings (9 comments)](https://github.com/NousResearch/hermes-agent/issues/67347)** — Author: DavidMetcalfe. The free-text `delegation.model` / `delegation.provider` fields in Desktop and Dashboard are confusing. Underlying need: first-class discovery UX for subagent routes, consistent with the parent model picker.
2. **[#96532 — Hide app-managed 'This device' gateway from fleet profile rail (5 comments, 👍2)](https://github.com/NousResearch/hermes-agent/issues/96532)** — Author: nikhilnair31. Windows Desktop users running only against a remote gateway still see the local runtime's auto-registered gateway in the sidebar. Need: opt-out from auto-registering the local app-managed connection.
3. **[#101147 — Sealed venvs miss `hermes_state_registry` (5 comments, closed)](https://github.com/NousResearch/hermes-agent/issues/101147)** — Author: Headscracher. Concrete packaging bug; closed after fix.
4. **[#92478 — `skills_guard` scores a skill's own denylist as an access (4 comments)](https://github.com/NousResearch/hermes-agent/issues/92478)** — Author: yotamleo. Skills that explicitly refuse to read credential-shaped files (e.g., `authorized_keys`, `~/.aws/credentials`) are themselves flagged critical. Indicates a parser-vs-semantics gap in the threat scanner.
5. **[#81828 — Steer-Marker self-fabricable by model (3 comments)](https://github.com/NousResearch/hermes-agent/issues/81828)** — Author: birle274. The static plaintext `[OUT-OF-BAND USER MESSAGE …]` marker can be reproduced by the model itself, breaking the trust boundary of `/steer`. Need: an authenticator (HMAC/nonce/secret) on out-of-band channels.

Cross-cutting takeaway: the loudest community signals are about *in-band trust* (skills_guard denylist false positives, steer-marker forgery, relay egress authorization in PR [#99220](https://github.com/NousResearch/hermes-agent/pull/99220)) and *cross-profile isolation* when a single gateway multiplexes multiple profiles (PRs [#104534](https://github.com/NousResearch/hermes-agent/pull/104534), [#105396](https://github.com/NousResearch/hermes-agent/issues/105396), [#105405](https://github.com/NousResearch/hermes-agent/issues/105405)).

## 5. Bugs & Stability

Ranked by P-level and impact:

### P1 — Must-fix
- **[#105145 — Windows `hermes update` always reports FAILED (exit 8) after success](https://github.com/NousResearch/hermes-agent/issues/105145)** — Author: rickykan. Post-update verification in `scripts/desktop-update/windows.ps1` resolves the wrong working directory. Affects every Windows Desktop user who updates via in-app handoff. **No fix PR visible.**
- **[#102589 — `cron/lifecycle_guard` raw-opens `state.db` and drops POSIX locks → WAL split-brain](https://github.com/NousResearch/hermes-agent/issues/102589)** — Author: aoeman84. A path-like token in a cron command triggers `os.open()` on the gateway's own `state.db`, releasing every POSIX lock held by the gateway. **P1, no fix PR in today's sample.**
- **[#105396 — Multiplexed gateway starves non-default profiles of MCP servers](https://github.com/NousResearch/hermes-agent/issues/105396)** — Author: wbrione. Scope-tagging tied to name-keyed discovery; `/reload-mcp` on non-default profile reports "No MCP servers connected". Likely fixed by PR [#104534](https://github.com/NousResearch/hermes-agent/pull/104534) (same area).
- **[#105228 — Errors in new and existing sessions in the default profile](https://github.com/NousResearch/hermes-agent/issues/105228)** — Author: DylanJMuller. `Profile '.hermes' does not exist` from TUI gateway startup. **P1, no fix PR visible.**

### P2 — Should-fix (selected)
- **[#104402 — Reasoning-model stale floor suppresses local-endpoint disarm](https://github.com/NousResearch/hermes-agent/issues/104402)** — Author: purewebs. Self-hosted models on a local endpoint get a 180s cloud-floor stale timeout. Configuration-vs-runtime contract issue.
- **[#105371 — Named custom providers ignore `stale_timeout_seconds` / `request_timeout_seconds`](https://github.com/NousResearch/hermes-agent/issues/105371)** — Author: JordiPosthumus. Provider lookup uses `providers["custom"]` instead of `providers["custom:<name>"]`.
- **[#105405 — Lock-order deadlock: `load_hermes_dotenv()` inside `_CONFIG_LOCK` vs `_SECRET_SOURCE_CACHE_LOCK` → watchdog exit 75](https://github.com/NousResearch/hermes-agent/issues/105405)** — Author: franciscoabad-founder. Gateway event-loop freeze under reload.
- **[#105427 — Gateway lifecycle scanner rejects Python directory literals and absolute interpreter binaries](https://github.com/NousResearch/hermes-agent/issues/105427)** — Author: RouteRefund. False positives in `cron/lifecycle_guard.py` for benign REST/RSS collectors.
- **[#105399 — `/skills diff <id>` returns empty batch context for pending create operations](https://github.com/NousResearch/hermes-agent/issues/105399)** — Author: arty-hlr.
- **[#105186 — TUI gateway crash: `FileNotFoundError: Profile 'hermes' does not exist`](https://github.com/NousResearch/hermes-agent/issues/105186)** — Background-thread crash in `tui_gateway/server.py`. Likely related to #105228.
- **[#105398 — `image_gen/openai-codex` hardcoded `gpt-5.5` host model breaks on accounts that lost gpt-5.5](https://github.com/NousResearch/hermes-agent/issues/105398)** — Author: zbabiarz. OpenAI removed `gpt-5.5` on 2026-09-07; the pin causes 100% failure of the plugin.
- **[#92478 — `skills_guard` scores a skill's own denylist (see §4)](https://github.com/NousResearch/hermes-agent/issues/92478)** — Fix PR is **[#92632](https://github.com/NousResearch/hermes-agent/pull/92632)** by jackulau, currently OPEN.

### P3 — Nice-to-fix
- **[#105383 — ACP model picker missing in Zed 1.18+ (adapter on legacy API)](https://github.com/NousResearch/hermes-agent/issues/105383)** — Author: iyabot. ACP v1.3.0 moved to `configOptions`; Hermes adapter is still on session-models.
- **[#105412 — Codex app-server double-counts cached input on v0.21.1](https://github.com/NousResearch/hermes-agent/issues/105412)** — Author: Atroci. Tracked by existing PR [#63654](https://github.com/NousResearch/hermes-agent/pull/63654); duplicate of #48801.
- **[#105404 — Tool-loop halt response refers users to invisible tool results](https://github.com/NousResearch/hermes-agent/issues/105404)** — Fix PR is **[#105424](https://github.com/NousResearch/hermes-agent/pull/105424)** (OPEN) by kokhlo.

Stability read: P1 cluster is concentrated on Windows/desktop update flows and on the multiplexed-gateway profile model. Several P2 bugs are *configuration-lookup* bugs (timeout/provider lookup), suggesting drift between declarative config and runtime resolution — a systemic area worth a maintainer pass.

## 6. Feature Requests & Roadmap Signals

User-driven feature requests filed today:

- **[#67347 — Guided picker for Subagent Model + Provider](https://github.com/NousResearch/hermes-agent/issues/67347)** — Already at 9 comments; consistent with PR [#105431](https://github.com/NousResearch/hermes-agent/pull/105431) (delegation reasoning in auxiliary-model setup) and [#105435](https://github.com/NousResearch/hermes-agent/pull/105435) (scriptable `hermes models --json`). **Likely in next minor.**
- **[#105235 — Streaming TTS: tune first sentence independently](https://github.com/NousResearch/hermes-agent/issues/105235)** — Author: francip. Short English openers delayed by steady-state batching.
- **[#105408 — Kanban orchestrators: native audited dependency-unlink tool](https://github.com/NousResearch/hermes-agent/issues/105408)** — Author: AKAICH00. The native Kanban surface exposes link but no unlink, although backend endpoints exist. Tool-surface parity gap.
- **[#105422 — PDF skill: professional document-generation defaults (duplicate)](https://github.com/NousResearch/hermes-agent/issues/105422)** — Author: TheSkyhan. Default PDF skill produces plain white pages; needs design-system defaults.
- **[#105420 — macOS: local terminal consistency + enforce tool calls with chat_completions (duplicate)](https://github.com/NousResearch/hermes-agent/issues/105420)** — Author: TheSkyhan.

PRs that already match these requests (advance signals):

- **[#105434 — Desktop: edit existing Goal/Loop/Heartbeat automation](https://github.com/NousResearch/hermes-agent/pull/105434)** — Stacks on #104716.
- **[#105431 — CLI: configure delegated reasoning in auxiliary model setup](https://github.com/NousResearch/hermes-agent/pull/105431)** — Closes the loop with #67347.
- **[#105435 — Models: scriptable provider model discovery (`hermes models --json`)](https://github.com/NousResearch/hermes-agent/pull/105435)** — Machine-readable model metadata for adapters.
- **[#75502 — Signal: shared accounts with disjoint group ownership](https://github.com/NousResearch/hermes-agent/pull/75502)** — Long-standing opt-in multi-profile Signal sharing.
- **[#94266 — Hermes Collective Wisdom Agent V1](https://github.com/NousResearch/hermes-agent/pull/94266)** — Cross-org knowledge sharing (private qualification → owner-reviewed publication → managed consumption). Needs-decision; this is the most ambitious feature in flight.

Predictions for the next minor (v0.22.x):

- Subagent picker guided UX + scriptable `hermes models --json` (#67347 → #105435/#

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-08

## 1. Today's Overview

Project activity on 2026-09-08 is **light-to-moderate and entirely pre-merge**. There were no new releases, no PRs closed or merged, and only a single automated Issue opened. Of the five PRs touched in the last 24 hours, four are small web UI polish fixes from a single core contributor (`italic-jinxin`), and one is a small assistant-side fix for Slack shared-channel disambiguation. The sole Issue is a recurring benchmark/failure-taxonomy report rather than community discussion. Overall, the project is in a steady maintenance-and-iteration phase with no shipping momentum today.

- Issues updated (24h): **1** (open: 1 / closed: 0)
- PRs updated (24h): **5** (open: 5 / merged: 0)
- Releases: **0**

## 2. Releases

No new releases in the last 24 hours. Section omitted per guidelines.

## 3. Project Progress

No PRs were merged or closed today, so no features formally advanced in the last 24 hours. However, the following in-flight PRs show active iteration and were all updated on 2026-09-07 — they represent the work most likely to land imminently:

- **[#8071](https://github.com/nearai/ironclaw/pull/8071)** — `fix(webui): preserve command result card height` (XS, low risk, core). Addresses collapsing structured command-result cards in the transcript flex column; also protects inline command notices and denial results; adds regression coverage. *Status: updated 2026-09-07, not yet merged.*
- **[#8070](https://github.com/nearai/ironclaw/pull/8070)** — `fix(webui): align slash-command metadata` (XS, low risk, docs/core). Replaces variable-width flex rows with a responsive grid in the slash-command menu; aligns titles/descriptions; stacks metadata on narrow screens; truncates long names; regression coverage included.
- **[#8069](https://github.com/nearai/ironclaw/pull/8069)** — `fix(webui): add dismiss actions to command result cards` (M, low risk, core). Adds accessible dismissal action across success, command-list, fallback, and denial results; threads callback through `Chat` → `MessageList` → `MessageBubble`; selectively removes only ephemeral command-result messages without disturbing durable chat messages.
- **[#8068](https://github.com/nearai/ironclaw/pull/8068)** — `fix(webui): keep the active slash command visible` (S, low risk, docs/core). Keeps the active slash-command option in viewport during keyboard nav; scrolls partially-hidden options into view on hover; includes regression coverage and a standalone Chromium test.
- **[#8076](https://github.com/nearai/ironclaw/pull/8076)** — `fix(assistant): distinguish disconnected shared channels` (size/risk not annotated, low inferred). Distinguishes a paired user's disconnected shared channel from an unpaired account; renders channel-specific guidance for both user messages and bot commands; keeps rejection classification consistent across product, adapter, and OpenAI-compatible surfaces; updates Slack capabilities docs.

Net effect: the webui conversation/command-result experience is being hardened across rendering, alignment, dismissal, and keyboard navigation in a coordinated batch, and a Slack-side clarification is queued. None of this has shipped yet.

## 4. Community Hot Topics

Engagement signals (reactions/comments) are uniformly **zero** across every item surfaced today, indicating either very low community participation or that this digest window is dominated by automated/curated activity rather than discussion.

Most notable items by intrinsic importance rather than engagement:

- **[Issue #8081](https://github.com/nearai/ironclaw/issues/8081)** — *Daily ironclaw failure taxonomy — 2026-09-07*. An automated-style report aggregating non-pass counts across benchmark suites (e.g., officeqa with 42 non-passes, attributed to genuine model-quality numeric errors in DeepSeek-V4-Flash). This is the recurring "ironclaw failure taxonomy" series — a transparent quality-reporting channel rather than a community discussion thread.
- **[PR #8069](https://github.com/nearai/ironclaw/pull/8069)** — *Add dismiss actions to command result cards*. The largest of today's open PRs (M size) and the most user-facing UX improvement; addresses a long-standing friction point where users cannot clear transient command outputs without losing chat history.
- **[PR #8076](https://github.com/nearai/ironclaw/pull/8076)** — *Distinguish disconnected shared channels*. Cross-surface (product + adapter + OpenAI-compatible) Slack fix that is likely the highest-leverage item for multi-user/enterprise deployments.

Underlying need read: maintainers appear to be driving the agenda today, with the community silent; the dominant themes are *UI affordances for ephemeral output* and *clearer error semantics in messaging channels*.

## 5. Bugs & Stability

Bugs explicitly addressed (PRs open today, not yet merged — no fix has landed yet):

| Severity | Item | Area | Fix PR status |
|---|---|---|---|
| Low | Slash-command menu layout drift / variable widths | webui rendering | [PR #8070](https://github.com/nearai/ironclaw/pull/8070) open |
| Low | Active slash-command option scrolls out of viewport during keyboard/pointer nav | webui a11y/UX | [PR #8068](https://github.com/nearai/ironclaw/pull/8068) open |
| Low | Command-result cards collapse inside transcript flex column | webui rendering | [PR #8071](https://github.com/nearai/ironclaw/pull/8071) open |
| Medium (UX) | No way to dismiss ephemeral command-result cards without losing chat | webui UX | [PR #8069](https://github.com/nearai/ironclaw/pull/8069) open |
| Low | Disconnected shared Slack channels indistinguishable from unpaired accounts | assistant/adapter | [PR #8076](https://github.com/nearai/ironclaw/pull/8076) open |

No crashes, security incidents, or regressions were reported today. The benchmark failure taxonomy ([#8081](https://github.com/nearai/ironclaw/issues/8081)) is *not* a product bug — it attributes the officeqa failures to upstream model-quality numeric errors rather than IronClaw defects, which is a useful signal that today's stability profile is clean at the application layer. All bug-related PRs remain open; **no fixes have been merged in the last 24 hours**.

## 6. Feature Requests & Roadmap Signals

No explicit user-submitted feature requests appear in today's window. However, the in-flight PRs themselves reveal roadmap direction:

- **Conversation hygiene UX** — the cluster of [#8069](https://github.com/nearai/ironclaw/pull/8069), [#8071](https://github.com/nearai/ironclaw/pull/8071), [#8068](https://github.com/nearai/ironclaw/pull/8068), [#8070](https://github.com/nearai/ironclaw/pull/8070) points to an internal push to make the slash-command/command-result surface first-class: dismissible, scannable, aligned, and keyboard-navigable. This looks like a near-term UI quality milestone, likely bundled into the next webui release.
- **Multi-surface consistency for channel state** — [#8076](https://github.com/nearai/ironclaw/pull/8076) (product + adapter + OpenAI-compatible surface parity) signals ongoing investment in IronClaw's role as a backend for third-party integrations, not just a UI.

Prediction: the next webui release will likely package the four `italic-jinxin` webui PRs together as a "command-result experience" pass; [#8076](https://github.com/nearai/ironclaw/pull/8076) is a candidate for a parallel assistant/adapter release line.

## 7. User Feedback Summary

User-feedback signal in today's 24-hour window is effectively **nil**: every item shows 0 reactions and 0 comments. No community pain points, satisfaction signals, or use-case descriptions were voiced in this period. The PRs in motion reflect *maintainer-perceived* UX gaps (command-result card collapse, dismissal affordance, slash-menu alignment, channel disambiguation) rather than user-reported complaints. Treat this section as data-sparse rather than as a verdict on user sentiment.

## 8. Backlog Watch

Items most in need of maintainer attention to avoid stalling:

- **[PR #8069](https://github.com/nearai/ironclaw/pull/8069)** — Largest of today's batch (M size); touches the `Chat` → `MessageList` → `MessageBubble` callback chain. Carries the highest review cost and the highest user-facing impact; should be prioritized for review to unblock the smaller dependent UI fixes.
- **[PR #8076](https://github.com/nearai/ironclaw/pull/8076)** — Cross-surface change (product, adapter, OpenAI-compatible, docs). Requires coordination across multiple owners and is the most likely candidate to be overlooked; merge risk increases the longer it sits.
- **[Issue #8081](https://github.com/nearai/ironclaw/issues/8081)** — Daily failure taxonomy. Routine acknowledgment / triage expected; otherwise it accumulates noise in the open-issue queue.
- **[PRs #8070](https://github.com/nearai/ironclaw/pull/8070), [#8068](https://github.com/nearai/ironclaw/pull/8068), [#8071](https://github.com/nearai/ironclaw/pull/8071)** — All three are XS/S, low-risk, with regression coverage already included. They are low-cost merges and could ship quickly once a reviewer signs off, especially if bundled.

No long-unanswered (multi-week) items surfaced in this 24-hour window, but the absence of any merged PR activity today is itself the backlog risk: five PRs across two contributors have been updated and are waiting on review.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-08

---

## 1. Today's Overview

QwenPaw shows **high and healthy activity**: 87 items updated in the last 24 hours (39 issues: 23 open/16 closed; 48 PRs: 30 open/18 merged or closed), with no new release shipped — the project remains on **v2.2.0**, roughly a week after its release. The dominant engineering theme today is a **major memory-subsystem refactor** (plugin migration, lifecycle unification, Auto-Dream/ReMe updates), while the issue tracker is dominated by **v2.2.0 regressions and context-management bugs**. Community contribution is notably strong: three first-time-contributor PRs landed today, plus continued automated agent-submitted PRs from the **QPQAT bot team** (e.g., 狄仁杰·Repairer, 小乔·FEUnit, 秦琼·CIOps) — an interesting case of the agent framework dogfooding itself. The issue-to-fix velocity (16 issues closed, 18 PRs closed) suggests maintainers are actively triaging the post-v2.2.0 bug wave.

---

## 2. Releases

No new releases today. **v2.2.0 remains the latest published version.** Notable context: issue [#7604](https://github.com/agentscope-ai/QwenPaw/issues/7604) references commit `ae092fdca6` and the v2.2.0-beta.4 release cycle (Aug 31), and closed CI PR [#7603](https://github.com/agentscope-ai/QwenPaw/pull/7603) implements merge-freezing during release windows — indicating the team is hardening release processes, likely ahead of a v2.2.1 patch or v2.3.0.

---

## 3. Project Progress

**Merged/Closed PRs today (18 total; highlights):**

| PR | Change | Significance |
|---|---|---|
| [#7561](https://github.com/agentscope-ai/QwenPaw/pull/7561) | `refactor(memory)`: unify automatic memory lifecycle & actions | Deliberate **breaking refactor** of the memory-manager contract — cornerstone of the memory rework |
| [#7603](https://github.com/agentscope-ai/QwenPaw/pull/7603) | `ci`: freeze default-branch merges during releases | Process hardening after a mid-release merge incident on Aug 31 |
| [#7530](https://github.com/agentscope-ai/QwenPaw/pull/7530) | `test(console)`: +245 unit tests, +5.02pp statement coverage | Fourth console coverage-sprint batch (AI-agent-submitted) |
| [#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936) | `fix(providers)`: coerce string-typed tool args emitted as JSON numbers | Fixes long-standing MCP tool-call failure [#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839) |
| [#7499](https://github.com/agentscope-ai/QwenPaw/pull/7499) | `fix(console)`: unify nav/theme icons | UI consistency fix for [#7376](https://github.com/agentscope-ai/QwenPaw/issues/7376) |

**Features advancing (open PRs):**
- [#7616](https://github.com/agentscope-ai/QwenPaw/pull/7616) — ADBPG & PowerContext memory backends migrated to plugins (completes core→plugin extraction)
- [#7486](https://github.com/agentscope-ai/QwenPaw/pull/7486) — Creator app-plugin v1.1.2: runtime notification bus, multi-timeline A/B compare, T2V/I2V/S2V scheduling, Docker deployment
- [#7502](https://github.com/agentscope-ai/QwenPaw/pull/7502) — full Console sidebar/settings redesign
- [#7526](https://github.com/agentscope-ai/QwenPaw/pull/7526) — protected execution / clarification / authorization contract for agents
- [#7521](https://github.com/agentscope-ai/QwenPaw/pull/7521) — fold consumed thinking blocks under context pressure (context-window preservation)
- [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609) — skill versioning + dependency validation
- First-time contributors: [#7614](https://github.com/agentscope-ai/QwenPaw/pull/7614) (macOS TCC helper restart for computer-use), [#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613) (OpenViking long-term memory backend), [#7611](https://github.com/agentscope-ai/QwenPaw/pull/7611) (BiDi RTL/LTR rendering fix)

---

## 4. Community Hot Topics

**Most-discussed issues:**

1. **[#7505](https://github.com/agentscope-ai/QwenPaw/issues/7505)** (12 comments, closed) — LAN LM Studio connections suffering repeated "client disconnect" → retry storms → timeout failure. *The single hottest thread of the day.*
2. **[#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576)** (5 comments, open) — `RetryChatModel` hardcodes a 32768-token context fallback, breaking all models with different windows (`CONTEXT_UNFIT` errors), confirmed in **all published releases v2.1.0–v2.2.0**.
3. **[#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579)** (5 comments, open) — assistant replies persisted but missing from subsequent requests ("model can't see what it just said"), with detailed PyInstaller reverse-engineering by the reporter.
4. **[#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559)** (5 comments, open) — sending a message mid-task returns HTTP 409 instead of queueing.
5. **[#6820](https://github.com/agentscope-ai/QwenPaw/pull/6820)** / [#6820](https://github.com/agentscope-ai/QwenPaw/issues/6820) (5 comments, closed) — Console UI showed no streaming output until task completion.

**Underlying needs analysis:** The hot topics cluster around two themes: **(a) self-hosted / third-party model integration** (LM Studio, DeepSeek, WUSRouter, Zhipu GLM users hitting provider-edge incompatibilities — a core persona for an open-source assistant), and **(b) context integrity** — users increasingly rely on QwenPaw for long-running, stateful tasks where silent context loss destroys trust. Multiple highly detailed, AI-assisted bug reports (e.g., [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597), drafted by an agent) show a technically sophisticated user base.

---

## 5. Bugs & Stability

Ranked by severity:

| Severity | Issue | Description | Fix status |
|---|---|---|---|
| 🔴 Critical | [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) / [#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584) (closed as dup) | Assistant replies silently dropped from context → tool-call death loops, erratic behavior | **No fix PR visible yet** |
| 🔴 Critical | [#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576) | Hardcoded 32k context fallback breaks all models with non-32768 windows; affects every release since v2.1.0 | **No fix PR yet** |
| 🔴 Critical | [#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589) | Heartbeat cron session feedback loop — duplicate message pile-up left agent unresponsive ~2 hours; verified still present on `main` | No fix PR yet |
| 🟠 High | [#7617](https://github.com/agentscope-ai/QwenPaw/issues/7617) | Single PDF DataBlock in tool-result history **permanently breaks** session for text-only endpoints (GLM error 1210) | No fix PR yet |
| 🟠 High | [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) | 409 on mid-task messages instead of queueing | ✅ Fix PR [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) open |
| 🟠 High | [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | Stop button shows stopped but task keeps executing | No fix PR yet |
| 🟡 Medium | [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) | Tool-returned image/PDF base64 sent as bare `"type":"data"` → 400 errors | No fix PR yet |
| 🟡 Medium | [#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572) | Coordinator `_drain()` swallows exception stacks — no logging, undebuggable | ✅ Fix PR [#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578) open (first-time contributor) |
| 🟡 Medium | [#7513](https://github.com/agentscope-ai/QwenPaw/issues/7513) | deepseek-v4-pro output interleaving with QwenPaw tool-call protocol | No fix PR yet |
| 🟡 Medium | [#7587](https://github.com/agentscope-ai/QwenPaw/issues/7587) | Cloudflare 403 challenge blocking WUSRouter model-list fetch | No fix PR yet |
| 🟢 Low | [#7242](https://github.com/agentscope-ai/QwenPaw/issues/7242) | Dashboard 6+ min load with 74 agents (Docker) | Open since Aug 24 |
| 🟢 Low | [#7585](https://github.com/agentscope-ai/QwenPaw/issues/7585) | Markdown tables render as raw `|`/`---` on Telegram | Open |
| 🟢 Low | [#2120](https://github.com/agentscope-ai/QwenPaw/issues/2120) | BiDi (Arabic/English) rendering broken | ✅ Fix PR [#7611](https://github.com/agentscope-ai/QwenPaw/pull/7611) open |

**Fixed/closed today:** [#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839) (MCP numeric-string args, via PR [#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936)), [#7604](https://github.com/agentscope-ai/QwenPaw/issues/7604) (hardcoded 30s stream idle timeout), [#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541) (context compression injected as `role=user` breaking DeepSeek), [#7594](https://github.com/agentscope-ai/QwenPaw/issues/7594) (triplicated task output), [#7505](https://github.com/agentscope-ai/QwenPaw/issues/7505) (LAN disconnects), [#6820](https://github.com/agentscope-ai/QwenPaw/issues/6820) (streaming UI).

**Stability verdict:** v2.2.0 shipped with a burst of regressions (working-directory picker, message queueing/409, stop-button semantics). Fix velocity is good, but the three critical context/session-integrity bugs (#7579, #7576, #7589) have **no fix PRs in flight** as of today and are the biggest open stability risks.

---

## 6. Feature Requests & Roadmap Signals

**User-requested:**
- [#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570) — auto-collapse Feishu streaming "thinking" cards (reporter already validated a working local patch — strong merge candidate)
- [#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601) / [#7588](https://github.com/agentscope-ai/QwenPaw/issues/7588) (both closed) — restore v2.1.0's typeable working-directory path input, removed in v2.2.0; closure suggests a fix is landing
- [#4077](https://github.com/agentscope-ai/QwenPaw/issues/4077) (closed) — UI font scaling & clickable file paths

**Roadmap signals from PR flow (likely v2.3.0 themes):**
1. **Memory as plugins** — [#7616](https://github.com/agentscope-ai/QwenPaw/pull/7616), [#7561](https://github.com/agentscope-ai/QwenPaw/pull/7561), [#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613), [#7606](https://github.com/agentscope-ai/QwenPaw/pull/7606): a full memory-backend plugin architecture with a reworked lifecycle contract (explicitly breaking).
2. **Agent safety/execution contracts** — [#7526](https://github.com/agentscope-ai/QwenPaw/pull/7526) (protected execution, clarification, authorization).
3. **Console UX overhaul** — [#7502](https://github.com/agentscope-ai/QwenPaw/pull/7502) sidebar/settings redesign.
4. **Skills ecosystem maturity** — [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609) versioning/dependency validation; [#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605) plugin update detection for marketplaces.

**Prediction:** a near-term **v2.2.1 patch** (working-directory regression, 409 queueing via [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610), stream timeouts, context-loss fix), followed by a **v2.3.0** centered on the memory plugin architecture and console redesign.

---

## 7. User Feedback Summary

- **Pain point — context reliability is the #1 trust killer.** [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579)/[#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584) ("session repeatedly loses state, AI behavior becomes erratic") and [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) ("it keeps forgetting rules I set — TODO files scattered everywhere, deployed wrong code over runtime") show users deploying QwenPaw for **real long-running dev-ops workflows** where memory failures have costly consequences.
- **Pain point — v2.2.0 UX regressions.** Users are direct and frustrated about the removed path-input selector ([#7588](https://github.com/agentscope-ai/QwenPaw/issues/7588): "why cut a useful design?"). Regression-sensitive releases are eroding goodwill among upgraders.
- **Pain point — heterogeneous provider support.** LM Studio, DeepSeek, WUSRouter, Zhipu GLM users all report integration friction; the BYO-endpoint crowd is a vocal core segment.
- **Positive signals:** strong multi-channel adoption (Telegram, Feishu, QQ, WeChat users filing channel-specific feedback); exceptional bug-report quality (repackaged-binary verification, reproducible traces); healthy inflow of first-time contributors; and the plugin/skill marketplace is generating enough activity that the team pinned a routing notice ([#7615](https://github.com/agentscope-ai/QwenPaw/issues/7615)).

**Overall sentiment:** engaged but strained — enthusiasm about the plugin ecosystem is tempered by v2.2.0 stability complaints.

---

## 8. Backlog Watch

Items needing maintainer attention:

1. **PR [#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399)** — reranker UI config panel for ReMeLightMemoryCard, open since **Jul 23 (~7 weeks)** under review. Risks bit-rotting against the concurrent memory refactors (#7561, #7616); needs a merge-or-close decision.
2. **[#2120](https://github.com/agentscope-ai/QwenPaw/issues/2120)** — BiDi rendering bug open since **March 2026 (~6 months)**; a first-time contributor fix ([#7611](https://github.com/agentscope-ai/QwenPaw/pull/7611)) now exists — a timely review would convert a stale thread into a positive contributor experience.
3. **[#7242](https://github.com/agentscope-ai/QwenPaw/issues/7242)** — dashboard 6-min+ load at scale (74 agents), open since Aug 24 with no assignee/fix; blocks production multi-agent deployments.
4. **[#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576)** — hardcoded context-size fallback confirmed across **all published releases**; high-impact, well-diagnosed, no fix PR yet.
5. **[#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571)** — instruction-retention/forgetting question with only 3 comments; reflects a fundamental product gap (persistent user rules) that deserves a roadmap answer rather than case-by-case support.
6. **[#7612](https://github.com/agentscope-ai/QwenPaw/issues/7612)** — built-in CLI commands failing inside Hub-managed local sandboxes (`RuntimeBoundaryMiddleware` interference), filed against `main` by a core contributor; small but architectural.

---

*Data basis: 39 issues + 48 PRs updated within 24h of 2026-09-08; 0 new releases. All links point to github.com/agentscope-ai/QwenPaw.*

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-08

## 1. Today's Overview

ZeroClaw had a high-velocity day with 30 issues and 50 PRs touched in the last 24 hours, but closed only 4 of each — the open/closed ratio (~6:1) suggests the project is in a triage-heavy phase rather than shipping mode. Zero new releases were cut, indicating work is concentrating on quality/regression fixes ahead of a release rather than new feature tags. Activity clusters tightly around three themes: (a) the ZeroCode/ACP (Agent Communication Protocol) turn-lifecycle story (transcript persistence, session restoration, parallel-run handling), (b) Anthropic + compatible-provider prompt-cache correctness (breakpoints, TTL, OAuth prefixes, cost accounting), and (c) channel-integrations plumbing (Telegram, WhatsApp, Matrix). One contributor — **Audacity88** — accounts for the majority of new filed issues and several of the highest-risk PRs, which is both a velocity signal and a bus-factor concern.

## 2. Releases

**No new releases in the last 24 hours.** The latest published version referenced in current bugs is **v0.8.5** ([Issue #10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690), [#10688](https://github.com/zeroclaw-labs/zeroclaw/issues/10688)).

## 3. Project Progress

Four issues and four PRs moved to a closed state in the window. Notably merged/closed items:

| Item | Type | Title |
|---|---|---|
| [#10671](https://github.com/zeroclaw-labs/zeroclaw/pull/10671) | PR (closed) | `fix(daemon): accept channel instance composite key in heartbeat.target` — fixes [#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670) |
| [#8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720) | Issue (closed) | Support: Disable cachePoint for Bedrock Nova 2 Lite model via config |
| [#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660) | Issue (closed) | Feature: third cache breakpoint on previous turn's last message |
| [#10693](https://github.com/zeroclaw-labs/zeroclaw/issues/10693) | Issue (closed) | ZeroCode silently ignores Enter submissions while showing Connected |

The closed issues were all paired with substantive fixes or absorbed into adjacent work; nothing was closed without progress. However, no PR landed in `master` today, which suggests the queue is dominated by large, blocked, or `needs-author-action` PRs awaiting input rather than ready-to-merge code.

## 4. Community Hot Topics

By comment count and reaction density, the most engaged threads are:

- **[#8720 — Support: Disable cachePoint for Bedrock Nova 2 Lite](https://github.com/zeroclaw-labs/zeroclaw/issues/8720)** (12 comments, most discussed) — A real operator keeps hitting cache-point errors on Bedrock and asks for a config-level kill switch. High reuse value for anyone running non-Anthropic models through the Bedrock provider.
- **[#10230 — Daemon startup/reload can stack-overflow during agent init](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)** (6 comments, S1) — Applying a Quickstart config while the daemon is running aborts a Tokio worker with a stack overflow. This is the same architectural class as several other "daemon-side configuration changes are unsafe at runtime" issues.
- **[#9333 — Failed ACP turns disappear after switching sessions](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)** (4 comments, S1) — A foundational ACP correctness bug; spawned follow-ups [#10673](https://github.com/zeroclaw-labs/zeroclaw/issues/10673), [#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659), [#10667](https://github.com/zeroclaw-labs/zeroclaw/issues/10667), [#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697). Indicates a deeper structural issue in how turns are persisted on the daemon RPC path.
- **[#10121 — Partial Code/ACP turns disappear if process exits before completion](https://github.com/zeroclaw-labs/zeroclaw/issues/10121)** (3 comments, S0 — data loss) — Data-loss severity; related PR [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) has been open since 2026-08-20.
- **[#10408 — Second message during active turn starts a parallel run](https://github.com/zeroclaw-labs/zeroclaw/issues/10408)** (3 comments, S1) — Concurrency bug in the same-session queue; no PR linked yet.

**Underlying need:** Operators running long-lived, multi-turn sessions on Anthropic-class providers want (1) lossless transcript persistence across crashes and session switches, (2) predictable cost/cache accounting, and (3) safe hot-reload of daemon config.

## 5. Bugs & Stability

### S0 — Data loss / security risk
- [#10121 Partial Code/ACP turns disappear if process exits before completion](https://github.com/zeroclaw-labs/zeroclaw/issues/10121) — **No merged fix yet.** Candidate PR [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) (open, `needs-maintainer-review`, XL).

### S1 — Workflow blocked
- [#10230 Daemon startup/reload can stack-overflow during agent init](https://github.com/zeroclaw-labs/zeroclaw/issues/10230) — No fix PR linked.
- [#9333 Failed ACP turns disappear after switching sessions](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) — Follow-up slice [#10673](https://github.com/zeroclaw-labs/zeroclaw/issues/10673) opened today; PR [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) addresses part of the family.
- [#10659 Budget-exceeded Code turn loses visible progress after session restore](https://github.com/zeroclaw-labs/zeroclaw/issues/10659) — No PR yet.
- [#10693 ZeroCode silently ignores Enter while showing Connected](https://github.com/zeroclaw-labs/zeroclaw/issues/10693) — **Issue closed** today.
- [#10670 `heartbeat.target` rejects channel instance composite key](https://github.com/zeroclaw-labs/zeroclaw/issues/10670) — **Fixed and closed** via PR [#10671](https://github.com/zeroclaw-labs/zeroclaw/pull/10671).

### S2 — Degraded behavior
- [#10408 Parallel run on second message in same session](https://github.com/zeroclaw-labs/zeroclaw/issues/10408) — No PR.
- [#9940 Cron delivery channel cannot resolve](https://github.com/zeroclaw-labs/zeroclaw/issues/9940) — Tracked under implementation batch [#10685](https://github.com/zeroclaw-labs/zeroclaw/issues/10685).
- [#10115 Tool-result truncation is invisible outside model's context](https://github.com/zeroclaw-labs/zeroclaw/issues/10115) — No PR.
- [#10689 Telegram voice reply skipped when reply starts with `[`](https://github.com/zeroclaw-labs/zeroclaw/issues/10689) — Edge case for ElevenLabs v3 audio tags.
- [#10688 WhatsApp Web voice notes never transcribed](https://github.com/zeroclaw-labs/zeroclaw/issues/10688) — **Fix PR exists:** [#10692](https://github.com/zeroclaw-labs/zeroclaw/pull/10692).
- [#10694 PowerShell shell tests intermittently time out on Windows](https://github.com/zeroclaw-labs/zeroclaw/issues/10694) — No PR.
- [#10667 ZeroCode duplicates streamed response when prompt completion precedes TurnComplete](https://github.com/zeroclaw-labs/zeroclaw/issues/10667) — No PR.

**Pattern:** Multiple concurrency/state issues are clustered around ACP turn lifecycle, suggesting the turn-state machine has not been audited under crash recovery.

## 6. Feature Requests & Roadmap Signals

- **Anthropic cache configurability** — [#10663 (1h TTL)](https://github.com/zeroclaw-labs/zeroclaw/issues/10663) and [#10662 (OAuth cache-min slot)](https://github.com/zeroclaw-labs/zeroclaw/issues/10662) indicate a clear near-term roadmap item: making `cache_control` markers fully controllable. PR [#10605 (Anthropic extended thinking via OpenAI-compatible gateways)](https://github.com/zeroclaw-labs/zeroclaw/pull/10605) (XL) reinforces this direction.
- **New search provider** — PR [#10679 Keenable web search](https://github.com/zeroclaw-labs/zeroclaw/pull/10679) is "the first provider besides DuckDuckGo that works with no configuration"; likely accepted as a default-friendly option.
- **Telegram UX** — PRs [#9997 (secure model picker)](https://github.com/zeroclaw-labs/zeroclaw/pull/9997) and [#10640 (passive group context)](https://github.com/zeroclaw-labs/zeroclaw/pull/10640) point to a coordinated Telegram improvement wave.
- **Health endpoint hardening** — [#10606 Sanitize component errors in unauthenticated health](https://github.com/zeroclaw-labs/zeroclaw/issues/10606) is a security ask that should land in the next patch.
- **Bootstrap launcher & release-target registry** — Tracker [#10684](https://github.com/zeroclaw-labs/zeroclaw/issues/10684) signals a packaging/distribution initiative for MCP hosts.

**Prediction for next release:** The next tagged version will likely bundle (a) ACP turn-persistence fixes ([#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) family), (b) WhatsApp transcription wiring ([#10692](https://github.com/zeroclaw-labs/zeroclaw/pull/10692)), (c) heartbeat-target composite-key fix ([#10671](https://github.com/zeroclaw-labs/zeroclaw/pull/10671)), and (d) one or more cache-control knobs.

## 7. User Feedback Summary

**Pain points most clearly voiced in the data:**

1. **Loss of work after crashes or session switches** — Multi-turn, long-running sessions on Anthropic are producing failed/cancelled turns that vanish from the transcript, costing operators real time and trust. (#10121, #9333, #10659, #10673, #10697)
2. **Cache invalidation surprises** — Users running compatible (LiteLLM-style) gateways or OAuth paths are silently losing cache hits because of where `cache_control` markers land; some only discover it via cost-leakage (#10699, #10701, #10662).
3. **Config-key inconsistency** — Integrations page slugifies display names instead of family keys, sending users to 404s ([#10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690)); `heartbeat.target` rejects keys it should accept ([#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670)). Suggests UI/config sources-of-truth are not aligned.
4. **Telegram + WhatsApp parity gaps** — Voice replies misfire on common model outputs (#10689); voice notes never transcribe (#10688); the operator experience is inconsistent across channels.
5. **Tool-result opacity** — Truncation happens inside the model's context but is invisible to the operator and to logs ([#10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115)).
6. **CI flakiness on Windows** — PowerShell timeouts ([#10694](https://github.com/zeroclaw-labs/zeroclaw/issues/10694)) and the `zeroclaw-hardware` feature never being exercised in CI ([#10104](https://github.com/zeroclaw-labs/zeroclaw/issues/10104)) are operational concerns that don't show in unit tests but erode release confidence.

Overall satisfaction signal is mixed: power-users are filing deeply technical, file-line-precise bug reports (high engagement), but several core workflows (ACP crash recovery, parallel-turn handling) remain broken at S0/S1.

## 8. Backlog Watch

PRs and issues that have been open a long time, are large, or are explicitly blocked and need maintainer attention:

- **[#10197 Persist interrupted turn progress (XL, `needs-maintainer-review`)](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)** — Open since 2026-08-20. Resolves the S0 data-loss class around ACP. Highest-impact unmerged PR in the queue.
- **[#10241 Restore supervised shell approval routing (XL, status:blocked)](https://github.com/zeroclaw-labs/zeroclaw/pull/10241)** — Open since 2026-08-22, blocked, security-domain. Touches every channel.
- **[#9997 Telegram secure model picker (XL, `do-not-merge`)](https://github.com/zeroclaw-labs/zeroclaw/pull/9997)** — Open since 2026-08-14, marked `do-not-merge`; needs design re-cut.
- **[#10325 Pre-turn tool-elicitation hints (XL, `stale-candidate`)](https://github.com/zeroclaw-labs/zeroclaw/pull/10325)** — Open since 2026-08-24, flagged stale. Second slice of an accepted RFC; needs author push.
- **[#10425 Internal-principal envelope & cron run outcomes (XL, RFC #6954, 1/3)](https://github.com/zeroclaw-labs/zeroclaw/pull/10425)** — Open since 2026-08-28, `needs-author-action`, `stale-candidate`. The first slice of a three-part security/architecture change; without a follow-up cadence the next two slices will drift.
- **[#9977 Confine filesystem mutations to workspace (XL, `needs-author-action` + `needs-maintainer-review`)](https://github.com/zeroclaw-labs/zeroclaw/pull/9977)** — Open since 2026-08-13. Security domain; both review gates unmet.
- **[#9283 Decompress gzip/brotli/deflate web_fetch responses (XL, dependencies, `needs-author-action`)](https://github.com/zeroclaw-labs/zeroclaw/pull/9283)** — Open since 2026-07-23; a maintainer has already done substantial repair work. Effectively ready to merge pending review.
- **[#8966 Live provider identity on usage events / correct context window (XL)](https://github.com/zeroclaw-labs/zeroclaw/pull/8966)** — Oldest in the active queue (since 2026-07-11); touches agent + gateway + ACP. Important for TUI/web context meter correctness.

**Maintainer attention recommendation:** prioritize [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197), [#9283](https://github.com/zeroclaw-labs/zeroclaw/pull/9283), and [#10692](https://github.com/zeroclaw-labs/zeroclaw/pull/10692) for the next patch — each closes a distinct S0/S1 class without depending on unmerged design work. The three `do-not-merge` / `blocked` / `stale-candidate` PRs ([#9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997), [#10241](https://github.com/zeroclaw-labs/zeroclaw/pull/10241), [#10325](https://github.com/zeroclaw-labs/zeroclaw/pull/10325)) need explicit maintainer triage — the queue will not drain on its own.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*