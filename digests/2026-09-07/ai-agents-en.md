# OpenClaw Ecosystem Digest 2026-09-07

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-07 01:16 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-07

## 1. Today's Overview

OpenClaw is in a high-velocity but turbulent period. With **500 issues** and **500 PRs** updated in the last 24 hours (377 open issues / 304 open PRs remaining), the project is processing an unusually large backlog, much of it through an automated triage workflow tagged `clawsweeper`. Despite **196 merged/closed PRs** in the same window, **zero new releases** were shipped, and at least two release-blocker (P0) issues remain open, including a Windows-only gateway startup failure and a stale-docs regression. The dominant theme is **post-upgrade regressions from the 2026.9.1 / 2026.9.2 line**, alongside persistent concerns about session-state integrity, memory subsystem reliability, and the Gateway event loop. Community activity remains healthy and engagement metrics (👍, comments) are strong, but maintainer attention is clearly spread thin across many simultaneous fronts.

---

## 2. Releases

**No new releases in the last 24 hours.** This is notable given the volume of bug reports explicitly tied to recent versions (2026.9.1, 2026.9.2, 2026.8.1, 2026.8.2). The absence of a hotfix despite multiple P0 release-blockers suggests maintainers are either:
- Holding a coordinated patch release for the Windows-gateway regression cluster (notably [#137813](https://github.com/openclaw/openclaw/issues/137813), [#136203](https://github.com/openclaw/openclaw/issues/136203), [#114967](https://github.com/openclaw/openclaw/issues/114967))
- Still investigating the upstream interaction between the `claude-cli` provider and `codex` session compaction (see [#132720](https://github.com/openclaw/openclaw/issues/132720), [#127148](https://github.com/openclaw/openclaw/issues/127148))

---

## 3. Project Progress

**Merged/Closed PRs today: 196** (exact titles not enumerated in the data feed, but signal is strong). Several PRs in the **open-but-ready** column represent meaningful production changes poised to land:

| PR | Title | Status | Significance |
|----|-------|--------|--------------|
| [#138803](https://github.com/openclaw/openclaw/pull/138803) | fix(ui): prevent Talk E2E audio capture stalls | 👀 Ready for maintainer look | Resolves flaky Gemini/blocked-camera test runs in Control UI Talk |
| [#140318](https://github.com/openclaw/openclaw/pull/140318) | fix(signal): use the declared WebSocket runtime under Bun | Open, maintainer | Signal plugin Bun compatibility fix |
| [#126932](https://github.com/openclaw/openclaw/pull/126932) | fix(config): stop auto-restoring hand-authored configs missing meta (#126806) | 👀 Ready, P1, sufficient proof | Closes a footgun where dotfiles/Ansible-deployed configs were silently overwritten by stale `.bak` files |
| [#137936](https://github.com/openclaw/openclaw/pull/137936) | fix: Empty system-owned heartbeats wait behind busy queues | 📣 Needs proof, P1 | Targets the heartbeat retry-storm pattern that surfaced in [#137492](https://github.com/openclaw/openclaw/issues/137492) |
| [#129186](https://github.com/openclaw/openclaw/pull/129186) | fix(talk): bind realtime delegation ownership | 📣 Needs proof, P1 | Prevents Talk from racing embedded runs; stack 2/3 of a multipart fix |
| [#140553](https://github.com/openclaw/openclaw/pull/140553) | fix(update): preserve Git runtime staging across source fences | 👀 Ready, P2 | Fixes dirty-checkout false negatives in package-to-Git updates |
| [#114032](https://github.com/openclaw/openclaw/pull/114032) | fix(ui): open new threads instantly | ⏳ Waiting on author | Closes UX lag on Control UI "New session" — addresses a long-standing friction issue |

The merge skew toward **memory lifecycle**, **update robustness**, and **cross-platform (Windows/Bun/macOS)** correctness suggests maintainers are methodically working through upgrade-pain regressions rather than shipping net-new features.

---

## 4. Community Hot Topics

### Top Issues by Engagement
| # | Title | Comments | 👍 | Link |
|---|-------|----------|-----|------|
| #97616 | Leaked unreaped hook/tool child processes → zombies | 14 | 1 | [link](https://github.com/openclaw/openclaw/issues/97616) |
| #135111 | Intermittent "malformed JSON arguments" on v2026.8.1 | 14 | 0 | [link](https://github.com/openclaw/openclaw/issues/135111) |
| #119720 | Sync agent persistence/transcript blocks Gateway event loop at scale | 12 | 0 | [link](https://github.com/openclaw/openclaw/issues/119720) |
| #96975 | Isolate subagent completion from parent context | 12 | 1 | [link](https://github.com/openclaw/openclaw/issues/96975) |
| #132762 | Overflow retry can succeed on tool result without final delivery | 12 | 0 | [link](https://github.com/openclaw/openclaw/issues/132762) |
| #113306 | SQLite snapshot restore lacks end-to-end crash/identity guarantees | 12 | 0 | [link](https://github.com/openclaw/openclaw/issues/113306) |
| #48920 | Live Docs ahead of release (Heartbeat `IsolatedSessions`) | 10 | 4 | [link](https://github.com/openclaw/openclaw/issues/48920) |

### Underlying Needs
- **Process & resource hygiene** (#97616): Long-running deployments accumulate zombies. The community needs a real `reaper` and observable `process tree` metrics — this is foundational infrastructure, not a feature.
- **Provider contract stability** (#135111, [#95610](https://github.com/openclaw/openclaw/issues/95610)): Both `claude-sonnet-5` malformed-JSON errors and OpenAI prompt-cache prefix churn show that **provider-spec drift is eroding user trust**. Users want explicit `cache_control` boundaries and redaction of dynamically injected hints.
- **Session/lane isolation** (#96975, [#127148](https://github.com/openclaw/openclaw/issues/127148), [#54488](https://github.com/openclaw/openclaw/issues/54488), [#115354](https://github.com/openclaw/openclaw/issues/115354)): A cluster of issues across subagent completion, codex compaction, followup drain, and binding precedence all reveal the same root anxiety — **users cannot reason about which session owns what**. The recurring request is for "status + child link only" UI semantics.
- **Documentation trust** (#48920, 4 👍): When documented features (`IsolatedSessions`) don't ship, users lose confidence in the docs as a reference.

### Top PR by Engagement
- [#140431](https://github.com/openclaw/openclaw/pull/140431) `feat(audit): record runtime skill selection metadata` — multi-area, broad label coverage. Reflects a community push for **observability into the skill-injection pipeline**, a gap users have flagged in earlier issues.

---

## 5. Bugs & Stability

### P0 (Release Blockers)
| Issue | Title | Status | Fix PR? |
|-------|-------|--------|---------|
| [#137813](https://github.com/openclaw/openclaw/issues/137813) | Windows gateway never starts after 2026.9.1 — `--task-supervisor` exits 0 silently | OPEN, 🦪 silver shellfish | None visible |
| [#48920](https://github.com/openclaw/openclaw/issues/48920) | Live Docs are ahead of release (`IsolatedSessions` missing) | OPEN | Docs-side fix likely trivial |
| [#136203](https://github.com/openclaw/openclaw/issues/136203) | Windows de-DE 2026.8.2 upgrade leaves Doctor maintenance blocked | OPEN, 🦞 diamond lobster | None visible |
| [#114967](https://github.com/openclaw/openclaw/issues/114967) | Live update left `launchctl submit` keepalive force-restarting gateway every ~2 min | OPEN, 🦞 diamond lobster | None visible |
| [#139847](https://github.com/openclaw/openclaw/issues/139847) | Message sent during active reply run dropped — "no active tool authority snapshot" (2026.9.2 regression) | OPEN, 🦞 diamond lobster | None visible |
| [#132720](https://github.com/openclaw/openclaw/issues/132720) | `claude-cli` 410 `session_expired` on 2026.9.1-beta.1 with valid paste-token; Doctor migrates primary off | OPEN, 🦞 diamond lobster | None visible |
| [#128637](https://github.com/openclaw/openclaw/issues/128637) | Multi-agent `AgentSelectionRequiredError` regressions | OPEN, 🦞 diamond lobster | None visible |

### P1 (High-Severity, Not Yet Blocking Release)
| Issue | Title | Fix PR? |
|-------|-------|---------|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Zombie process accumulation | None |
| [#135111](https://github.com/openclaw/openclaw/issues/135111) | Intermittent malformed JSON on v2026.8.1 | None |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | Sync persistence blocks Gateway event loop | Partial — [#133925](https://github.com/openclaw/openclaw/pull/133925), [#134062](https://github.com/openclaw/openclaw/pull/134062) landed, scope still open |
| [#132762](https://github.com/openclaw/openclaw/issues/132762) | Overflow retry success without final delivery | None |
| [#139714](https://github.com/openclaw/openclaw/issues/139714) | `updateCommand()` admits `update_runs` row it can never finalize | None |
| [#140010](https://github.com/openclaw/openclaw/issues/140010) | Windows sleep/resume WebSocket reconnect failures 30–60s+ | None |
| [#139578](https://github.com/openclaw/openclaw/issues/139578) | llama.cpp EmbeddingGemma ubatch 512 regression | None |
| [#140535](https://github.com/openclaw/openclaw/issues/140535) | Discord `/new` returns "No reply was generated", session not reset | None |
| [#113701](https://github.com/openclaw/openclaw/issues/113701) | Context overflow with large tool outputs — compaction failure loop | None |
| [#134896](https://github.com/openclaw/openclaw/issues/134896) | 2026.8.1 update cascade: 5-blocker restart + Doctor self-ref | None |
| [#134579](https://github.com/openclaw/openclaw/issues/134579) | Active Memory `before_prompt_build` `requiresToolAuthority` never dispatched (2026.8.1 regression) | None |
| [#139215](https://github.com/openclaw/openclaw/issues/139215) | Cron scheduler silently swallows ticks since 2026.9.1 | None |
| [#99910](https://github.com/openclaw/openclaw/issues/99910) | Memory dreaming run pegs gateway event loop ~10 min | None |
| [#127148](https://github.com/openclaw/openclaw/issues/127148) | `codex sessions.compact` acquires second app-server, active-writer conflict | None |
| [#115354](https://github.com/openclaw/openclaw/issues/115354) | Catch-all binding overrides ACP configured bindings | None |
| [#101929](https://github.com/openclaw/openclaw/issues/101929) | `context-overflow-midturn-precheck` over-counts ~2.3–2.6× | None |
| [#137927](https://github.com/openclaw/openclaw/issues/137927) | Internal `<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` leaks into Telegram text | None |
| [#112160](https://github.com/openclaw/openclaw/issues/112160) | SSH sandbox does not stage inbound media into remote workspace | None |
| [#92241](https://github.com/openclaw/openclaw/issues/92241) | Gateway holds stale module import paths after update/rollback (ERR_MODULE_NOT_FOUND) | None |

### P2 (Stability / UX)
[#41201](https://github.com/openclaw/openclaw/issues/41201), [#95610](https://github.com/openclaw/openclaw/issues/95610), [#90378](https://github.com/openclaw/openclaw/issues/90378), [#124393](https://github.com/openclaw/openclaw/issues/124393), [#119454](https://github.com/openclaw/openclaw/issues/119454), [#49381](https://github.com/openclaw/openclaw/issues/49381), [#44130](https://github.com/openclaw/openclaw/issues/44130), [#120006](https://github.com/openclaw/openclaw/issues/120006), [#120244](https://github.com/openclaw/openclaw/issues/120244), [#137729](https://github.com/openclaw/openclaw/issues/137729)

**Severity Pattern:** The "diamond lobster" (🦞) tier dominates the P0/P1 list, indicating the most severe issues are systemic rather than edge-case. Many are **regressions tied to specific versions** (#135111→2026.8.1, [#139847](https://github.com/openclaw/openclaw/issues/139847)→2026.9.2, [#139215](https://github.com/openclaw/openclaw/issues/139215)→2026.9.1, [#134579](https://github.com/openclaw/openclaw/issues/134579)→2026.8.1-beta.3), suggesting the release-train cadence is outrunning the regression-test suite, particularly on Windows and around the memory-core / context-overflow boundary.

---

## 6. Feature Requests & Roadmap Signals

The volume of `enhancement` and `feature`-tagged issues suggests a maturing backlog. Candidates most likely to land soon based on engagement + linked-PR maturity:

| Issue | Title | Why it's likely |
|-------|-------|-----------------|
| [#96975](https://github.com/openclaw/openclaw/issues/96975) | Isolate subagent completion — return status + child link only | 12 comments, P2, aligned with active session-lane work in [#127148](https://github.com/openclaw/openclaw/issues/127148) + [#54488](https://github.com/openclaw/openclaw/issues/54488) |

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Personal AI Assistant / Agent Open-Source Ecosystem
**Snapshot date: 2026-09-07** · Source: per-project community digests (24h activity windows)

---

## 1. Ecosystem Overview

The personal AI assistant landscape on this date is stratified into three clear velocity tiers: OpenClaw operating at ~10× the activity volume of any peer, Hermes Agent and ZeroClaw in active mid-scale development, and IronClaw in quiet dependency-hygiene mode (QwenPaw produced no digest data). Notably, **zero projects shipped a release in the window** — all energy is going into regression fixes, consolidation, or forward design work, indicating the category has shifted from feature-race to correctness-and-architecture phase. The hard problems are converging across projects: session-state integrity, provider contract drift, cost-budget enforcement, and Windows platform parity. The dominant failure mode has evolved from crashes to **silent data loss and misleading state**, the signature of infrastructure maturing into long-running daemon territory.

---

## 2. Activity Comparison

| Project | Issues touched (24h) | PRs touched (24h) | Merged/Closed (24h) | Open backlog | Releases (24h) | Health Score* |
|---|---|---|---|---|---|---|
| **OpenClaw** | 500 | 500 | 196 | 377 issues / 304 PRs | 0 (7 P0s open, no hotfix) | **7/10** — elite throughput, strained QA |
| **Hermes Agent** | 50 | 50 | 5 (3 PRs, 2 issues) | not stated | 0 (fixes queued for v0.21.1/v0.22) | **7/10** — balanced fix discipline, stale core P1s |
| **ZeroClaw** | 33 | 50 | 6 PRs + 3 issues | 44 open PRs | 0 (v0.8.5 weekly stabilization line) | **6.5/10** — strong design rigor, fresh budget-bug cluster |
| **IronClaw** | 0 | 9 | 3 (all Dependabot) | minimal | 0 | **5/10** — clean but community-silent |
| **QwenPaw** | — | — | — | — | — | N/A (digest unavailable) |

\* Qualitative composite of velocity, community engagement, defect-backlog pressure, and release discipline from this snapshot; not a longitudinal measure.

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Scale and breadth**: 500 issues/500 PRs touched and 196 PRs merged in 24h — an order of magnitude above the nearest peer. Broadest runtime surface: multi-channel gateways (Telegram, Discord, Signal), Control UI, memory subsystem with dreaming/compaction, skills pipeline, SSH sandbox, ACP support.
- **Automated triage at scale** (`clawsweeper`): the only project visibly scaling maintainer bandwidth through automation — a structural advantage as volume grows.
- **Engagement depth distributed widely** vs. Hermes's single concentrated meta-thread.

**Risks relative to peers:**
- **7 open P0 release-blockers with no hotfix shipped** — the release train (2026.8.x → 2026.9.x) is demonstrably outrunning the regression suite, especially on Windows and the memory-core/context-overflow boundary. ZeroClaw's RFC-first model and Hermes's fix-consolidation mode avoid this failure pattern.
- Documentation trust erosion (#48920: live docs ahead of release).

**Community size**: Largest by raw throughput and platform coverage. Hermes shows higher per-thread intensity (a 169-comment watchdog meta-bug vs. OpenClaw's top issue at 14 comments), suggesting Hermes has fewer but deeply invested operators, while OpenClaw has the broadest user base with the widest fault-report surface.

**Technical approach**: Ship-fast, triage-automated, fix-regressions-post-hoc. Contrast with ZeroClaw (design via contested RFC before code) and Hermes (consolidation releases batching correctness fixes).

---

## 4. Shared Technical Focus Areas

| Focus area | Projects | Specific signals |
|---|---|---|
| **Session-state integrity & persistence** | OpenClaw, Hermes, ZeroClaw | OpenClaw #119720/#96975/#113306; Hermes #104653 (duplicate turns), #104442 (lost `/steer`); ZeroClaw #7759, #10197, RFC #10526 (append-only event history) |
| **Provider contract drift** (Anthropic/OpenAI/local) | OpenClaw, Hermes, ZeroClaw | OpenClaw #135111 (malformed JSON on claude-sonnet-5), #95610 (cache-prefix churn); Hermes #104622 (token pool steals Claude Code OAuth), #104603 (llama.cpp tool parsing); ZeroClaw #10617/#10662 (Anthropic wire enum, cache minimums) |
| **Cost/budget enforcement** | OpenClaw, Hermes, ZeroClaw | ZeroClaw cluster #10635/#10645/#10659 (displayed ≠ enforced limits; delegates untracked); Hermes #99398 (~42% context inflation); OpenClaw #101929 (2.3–2.6× over-count) |
| **Windows platform parity** | OpenClaw, Hermes, ZeroClaw | OpenClaw #137813 (gateway never starts), #140010; Hermes #104666 (Codex spawn ignores PATHEXT); ZeroClaw #7462 (74 silent Windows test failures — CI Linux-only) |
| **Daemon/UI lifecycle decoupling** | Hermes, ZeroClaw, OpenClaw | Hermes #97681 (bots survive Desktop close); ZeroClaw #7759 (WebSocket lifetime vs. turn lifecycle); OpenClaw heartbeat/session-lane work |
| **Plugin security & sandboxing** | All four | ZeroClaw #6996/#10076/#10644 (Bubblewrap/Landlock/Seatbelt, WASM, cross-principal leak); Hermes #70093/#69882 (secret retention, provenance); IronClaw #8077 (response-leak sentinel); OpenClaw #112160 (SSH sandbox) |
| **Silent-failure observability** | OpenClaw, Hermes, ZeroClaw | OpenClaw #140431 (skill-selection audit), #139215 (cron swallows ticks); Hermes #66616 (watchdog ownership); ZeroClaw #10426/#10531 (Telegram/delegate progress) |

---

## 5. Differentiation Analysis

| Project | Feature focus | Target user | Architecture signature |
|---|---|---|---|
| **OpenClaw** | Full-stack assistant: memory, skills, multi-channel, Talk, fleet updates | Power users / self-hosters at scale | High-cadence gateway + Control UI; event-loop-centric; automated triage |
| **Hermes Agent** | Delivery integrity, credential pooling, Desktop UX, local-model DX (llama.cpp) | Multi-bot operators, desktop-first users, heterogeneous hardware | Gateway + Desktop + plugin receipts; v0.x, pre-consolidation |
| **ZeroClaw** | Correctness-first runtime: sandboxing, session model, WASM plugin future | Architects and tinkerers who want provable isolation | Rust/Tokio daemon; RFC-gated; ZeroCode UI; weekly stabilization cuts |
| **IronClaw** | MCP safety diagnostics, wasm sandboxing toolchain | Security-conscious / enterprise-adjacent deployments | Rust host; minimal surface; quiet upstream-dependency tracking |
| **QwenPaw** | Undetermined (no data) | — | — |

The sharpest architectural divergence: **ZeroClaw is willing to slow feature delivery for design guarantees** (sandbox policy RFC open since May), while **OpenClaw trades regression risk for velocity**, and **Hermes optimizes for operational correctness of what already ships**.

---

## 6. Community Momentum & Maturity

- **Tier 1 — Rapidly iterating (turbulent)**: **OpenClaw**. Highest velocity in the ecosystem, but the 7-open-P0/no-hotfix state and version-pinned regression clusters show iteration outpacing verification.
- **Tier 2 — Actively developing, stabilizing**: **ZeroClaw** (structured v0.8.5 weekly cuts, v0.9 RFC groundwork — but the RFC process itself is overloaded, per #8692/#10549) and **Hermes** (fix-accumulation phase ahead of a v0.21.1/v0.22 release; two P1s and a June-vintage dashboard crash still open).
- **Tier 3 — Maintained/dormant**: **IronClaw**. Dependency hygiene is current (3 Dependabot merges), but zero issues, zero discussion, and only 2 human PRs signal a small or internal-facing community. The 15-day-stale wasm-group PR #7834 deserves maintainer attention.
- **Unmeasured**: QwenPaw — missing digest prevents assessment.

---

## 7. Trend Signals

1. **Session/event-sourcing is the core architecture battleground.** All three active projects are independently converging on durable conversation state — ZeroClaw's append-only replay RFC, OpenClaw's session-lane ownership issues, Hermes's persistence fixes. *For agent developers: invest in a durable event log and explicit session-ownership semantics before adding features; "which session owns what" is the #1 user anxiety.*
2. **Cost enforcement is becoming a safety feature, not a setting.** ZeroClaw's displayed-vs-enforced budget divergence and untracked delegate loops show budgets that lie are worse than no budgets. Thread cost context into every sub-agent call.
3. **Provider abstraction is a liability surface.** Malformed-JSON errors, cache-breakpoint waste, OAuth token theft across tools, and wire-enum drift (all observed this week) argue for explicit provider contracts, pinned cache-control boundaries, and per-provider regression tests.
4. **Headless-first assistants.** Two of four projects are decoupling daemon lifetime from desktop UI — bots as standalone daemons with optional UI is the emerging deployment norm.
5. **Plugin trust models are converging** on sandboxing + provenance + leak sentinels (WASM runtimes, credential-retention, response-leak classification). Early standardization opportunity.
6. **Windows is the ecosystem-wide blind spot.** Three projects reported fresh Windows-specific P1/P2 failures in one day; CI that only runs Linux guarantees silent regressions. Low-effort differentiation for any project here.
7. **Silent failures erode more trust than crashes.** Dropped messages, swallowed cron ticks, discarded in-progress text on budget caps, and stale indexes dominate feedback. Delivery receipts, progress streaming, and clear watchdog ownership are the highest-leverage UX investments.

---
*Report basis: 2026-09-07 community digests for OpenClaw, Hermes Agent, IronClaw, and ZeroClaw. QwenPaw excluded from analysis due to missing data. All issue/PR references per source digests.*

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-07

## 1. Today's Overview

Hermes Agent shows **very high maintenance activity** today with 50 issues and 50 PRs updated within 24 hours, yet zero new releases — a classic pattern of accumulated fixes waiting for the next tagged version. Of the 50 issues, only 2 closed (both P2 bugs), and of 50 PRs, 3 closed (one a duplicate Discord cleanup feature). The bulk of the new work targets **session-state correctness** (duplicate persistence, double-counted reasoning, dropped MCP tools), **gateway delivery integrity** (Discord attachments 404, reply-context staleness), and **desktop/TUI regressions** (caret vanishing, WAL churn). Two P1 bugs surfaced today: ACP-provided MCP tools being dropped from model requests, and a Windows + npm-Codex spawn failure — neither with a merged fix yet.

## 2. Releases

No new releases in the last 24 hours. The most recent tagged version referenced in issues remains v0.21.0 (cited in [#104453](https://github.com/NousResearch/hermes-agent/issues/104453), [#104666](https://github.com/NousResearch/hermes-agent/issues/104666)), which itself is the source of two P1 regressions today (systemd 249 cron failure, Windows Codex spawn).

## 3. Project Progress

**Merged/Closed today:**

- **PR #104600** (closed as duplicate): Discord `delete_message` so `cleanup_progress` works on Discord — superseded by PR [#42661](https://github.com/NousResearch/hermes-agent/pull/42661), which is still open and addresses the same adapter-level fix.
- **PR #99398** (closed as duplicate): Preflight estimator double-charging `reasoning` and inflating context ~42% — flagged as a duplicate of the existing compaction-loop fix work.
- **PR #70328** (closed as duplicate): Flat 1500-token image pricing in compression triggers — closed as duplicate; the same vision-heavy 64K-context compaction fix appears consolidated elsewhere.

**Notable open PRs advancing functionality:**

- **[#104673](https://github.com/NousResearch/hermes-agent/pull/104673) (P1)** — Fixes [#104653](https://github.com/NousResearch/hermes-agent/issues/104653): inbound user turns persisted twice (gateway + agent flush) on Telegram. Critical data-integrity fix.
- **[#104669](https://github.com/NousResearch/hermes-agent/pull/104669)** — Fixes [#104652](https://github.com/NousResearch/hermes-agent/issues/104652): renders reply-context anchor age across Telegram/Discord/Signal gateways.
- **[#104646](https://github.com/NousResearch/hermes-agent/pull/104646)** — Suppresses redundant `turnhold_deferred` notice when a compression-failure cooldown is already active.
- **[#104677](https://github.com/NousResearch/hermes-agent/pull/104677)** — Caps per-conversation batch ordinals in long-lived processes (follow-up to #104187), preventing unbounded inner-dict growth on session-less parents.
- **[#104676](https://github.com/NousResearch/hermes-agent/pull/104676)** — Desktop background windows stay silent on `preview.act.request`/`tour.request`, preventing first-response race in multi-window sessions.
- **[#104283](https://github.com/NousResearch/hermes-agent/pull/104283)** — Fleet restart logic: instead of declaring "nothing to restart" when no gateway PID is alive, actually start parked units (the marker previously cleared prematurely).
- **[#104121](https://github.com/NousResearch/hermes-agent/pull/104121)** — Passes ClawHub `?owner=` hint so ambiguous multi-owner slugs stop returning 409.
- **[#104112](https://github.com/NousResearch/hermes-agent/pull/104112)** — Bumps `brotlicffi` 1.2.0.1 → 1.2.0.2 to repair chunked brotli stream decoder regression.
- **[#103665](https://github.com/NousResearch/hermes-agent/pull/103665)** — Hosts a persistent WAL keeper in the hosted-room driver so the dashboard poll loop stops deleting shm generations out from under a peer gateway.
- **[#104672](https://github.com/NousResearch/hermes-agent/pull/104672)** — Desktop "Add to chat" selection annotation action with separate annotation section and source URL.
- **[#104668](https://github.com/NousResearch/hermes-agent/pull/104668)** — New bounded `engineering-evidence` plugin connecting HEAD/test/learning receipts to existing Hermes agents.
- **[#101420](https://github.com/NousResearch/hermes-agent/pull/101420)** — Cross-OS install/update E2E matrix (Windows/macOS/Linux).
- **[#102765](https://github.com/NousResearch/hermes-agent/pull/102765)** — Unified package manager (clean lineage): winrt dep, wheel fix, upstream merge across CLI/gateway/desktop/Docker/plugin admission.
- **[#70093](https://github.com/NousResearch/hermes-agent/pull/70093)** (security) — Retains raw secret candidates across stream boundaries for WhatsApp/Signal/WeCom to prevent credential fragments being published outside their original token context.

## 4. Community Hot Topics

1. **[#66616 — Skills index is stale or degraded (29.8h old, limit 26h)](https://github.com/NousResearch/hermes-agent/issues/66616)** — 169 comments, the runaway leader. This is an automated `skills-index-watchdog` probe failure: the unified skills index isn't being rebuilt on the 6/18-UTC cron because the deploy-site workflow appears to be the actual rebuild path now. The thread is a meta-bug whose resolution requires either restoring the cron path or updating the watchdog's source-of-truth expectation. Underlying need: **observability and ownership clarity over site-build pipelines**.

2. **[#97681 — Bot Group Chats should keep working after Desktop closes](https://github.com/NousResearch/hermes-agent/issues/97681)** — 25 comments. Feature request to decouple group-chat lifecycle from a running Desktop instance so bots on heterogeneous hardware (laptop/home server/VPS) survive a desktop shutdown. Underlying need: **continuity-of-service for multi-bot workflows**, particularly for users who treat Hermes as a distributed runtime rather than a single-machine app.

3. **[#73327 — Customizable cron response wrapping template](https://github.com/NousResearch/hermes-agent/issues/73327)** — 6 comments, 3 👍. The hardcoded "Cronjob Response: {task_name} (job_id: ...)" header/footer in `cron/scheduler.py` is a localization/UX pain point; users want to template their own delivery wrapper. Underlying need: **i18n and presentation control for scheduled-task outputs**.

## 5. Bugs & Stability

### P1 (highest severity, no merged fix today)

- **[#42719 — ACP-provided MCP tools registered but dropped from model request](https://github.com/NousResearch/hermes-agent/issues/42719)** (since 2026-06-09). Tools disappear between registration and the chat-completions wire request. No associated PR. **Long-untouched P1 in core protocol path.**
- **[#104653 — Inbound user turns persisted twice (gateway + agent flush)](https://github.com/NousResearch/hermes-agent/issues/104653)** (2026-09-07). Has a fix PR: [#104673](https://github.com/NousResearch/hermes-agent/pull/104673).
- **[#104442 — Mid-turn `/steer` text never persists, 75–85% prompt-cache miss](https://github.com/NousResearch/hermes-agent/issues/104442)** (2026-09-06). `apply_pending_steer_to_tool_results` writes to a non-persisted field; user instructions are lost on rehydration. No PR.
- **[#104453 — Restart-safe cron dispatch broken on systemd 249 (Ubuntu 22.04)](https://github.com/NousResearch/hermes-agent/issues/104453)** (2026-09-06). v0.21.0 regression: `OOMPolicy=kill` rejected on transient scopes, breaks **all** cron jobs. No PR.
- **[#104653 — Duplicate persistence on Telegram**, see above.

### P2 (significant)

- **[#100302 — Desktop DOM normalizer removes Chromium's active caret node](https://github.com/NousResearch/hermes-agent/issues/100302)** (2026-09-01). Typing stops mid-burst; contenteditable stays focused but cannot accept input. No PR.
- **[#104357 — Discord cron attachments 404 (Unknown Channel)](https://github.com/NousResearch/hermes-agent/issues/104357)** (2026-09-06). Text delivers, media silently drops. No PR.
- **[#104176 — Inherited `ContextCompressor._generate_summary` overrides break on `bypass_cooldown`](https://github.com/NousResearch/hermes-agent/issues/104176)** (2026-09-06). Third-party engines break on the new signature. No PR.
- **[#100836 — `hermes doctor --fix` self-detects as a live writer; leaked COUNT(*) connection](https://github.com/NousResearch/hermes-agent/issues/100836)** (2026-09-02). Repair tool refuses to repair an idle DB. No PR.
- **[#104622 — `resolve_anthropic_token()` borrows Claude Code login before Hermes pool, logging Claude Code out](https://github.com/NousResearch/hermes-agent/issues/104622)** (2026-09-06). Authentication boundary violation on shared machines. No PR.
- **[#94921 — Shift+letter leaks raw `ESC[27;2;<cp>~` on Ghostty](https://github.com/NousResearch/hermes-agent/issues/94921)** (2026-08-25). Regression from #87630; `modifyOtherKeys=2` path inserts literal ANSI into the prompt. No PR.
- **[#104666 — `codex_app_server` never starts on Windows with npm-installed Codex](https://github.com/NousResearch/hermes-agent/issues/104666)** (2026-09-07). Windows spawn ignores PATHEXT. No PR. P1.

### P3 (lower severity)

- **[#104641 — hermes-talk rejects valid OpenAI keys with two wrong error messages](https://github.com/NousResearch/hermes-agent/issues/104641)** (2026-09-07).
- **[#104603 — Desktop fails to parse function-calling hooks from local llama.cpp](https://github.com/NousResearch/hermes-agent/issues/104603)** (2026-09-06). Raw JSON text appears instead of parsed tool calls.
- **[#45125 — Dashboard crashes on load with React error #520 on every tab](https://github.com/NousResearch/hermes-agent/issues/45125)** (since 2026-06-12, still open, recurring theme).
- **[#104591 — Startup update check spawns interactive ssh host-key prompt that hijacks CLI input](https://github.com/NousResearch/hermes-agent/issues/104591)** (2026-09-06). `GIT_CONFIG_GLOBAL=/dev/null` mismatch leaves `/dev/tty` open.
- **[#104637 — Credential pool `request_count` only increments under `least_used`](https://github.com/NousResearch/hermes-agent/issues/104637)** (2026-09-06). Metric starved under `fill_first`.

**Pattern**: today's bug profile is dominated by **session-state and delivery-path correctness** — the kind of issues that don't crash loudly but quietly corrupt or lose data.

## 6. Feature Requests & Roadmap Signals

Most-requested themes with traction (👍, comments, or paired PR):

1. **Gateway ↔ Desktop decoupling** — [#97681](https://github.com/NousResearch/hermes-agent/issues/97681). Strong signal for a v0.22 architectural shift: bots as standalone daemons with optional Desktop UI.
2. **Cron template customization** — [#73327](https://github.com/NousResearch/hermes-agent/issues/73327) (3 👍). Likely to land alongside a cron-config refactor.
3. **Credential-pool ergonomics** — three near-simultaneous requests [#104636](https://github.com/NousResearch/hermes-agent/issues/104636), [#104637](https://github.com/NousResearch/hermes-agent/issues/104637), [#104638](https://github.com/NousResearch/hermes-agent/issues/104638) all opened by `0xble` in 24h. **Likely next version**: `hermes auth list/remove` gains entry-id display; `request_count` tracking normalizes across strategies; `hermes auth add --priority` lets users order fill_first explicitly.
4. **Atomic disabled-job creation in cron** — [#104572](https://github.com/NousResearch/hermes-agent/issues/104572). Tightly scoped API addition, very likely to land.
5. **Profile-scoped `AGENTS.md` loading** — [#104640](https://github.com/NousResearch/hermes-agent/issues/104640). Likely to land once prompt-builder is touched for any reason.
6. **Plugin provenance / authenticated context** — [#69882](https://github.com/NousResearch/hermes-agent/issues/69882). Plugin security story; coupled with #70093 secret-retention work suggests a broader plugin trust model coming.
7. **Selection annotation in Desktop** — [#104672](https://github.com/NousResearch/hermes-agent/pull/104672) PR already exists, low-risk UX win.

**Likely next-release contents** (v0.21.1 or v0.22):
- P1 bug fixes: duplicate turn persistence (#104673), restart-safe cron on systemd 249, ACP/MCP drop (#42719), Windows Codex spawn (#104666).
- A cron-cluster of fixes (Discord attachments, reply-context age, terminal wrapper).
- brotlicffi bump (#104112).
- Credential-pool UX improvements.

## 7. User Feedback Summary

**Pain points:**

- **Cross-platform brittleness dominates**: Windows Codex spawn (#104666), Windows TUI npm PATH (#104092), systemd 249 cron (#104453), Ubuntu 22.04 versus newer systemd. Users running Hermes on non-macOS hosts report a steady stream of platform-specific regressions.
- **Telemetry/observability debt**: the watchdog issue #66616 is fundamentally a "who owns this rebuild" problem — the rebuild path silently migrated to deploy-site, but the watchdog was never told.
- **Authentication boundary confusion**: Anthropic token resolution steals Claude Code's OAuth (#104622); credential-pool priority is invisible (#104637/#104638/#104636); Talk product mis-handles valid keys (#104641). Users on shared or multi-tenant machines feel the friction.
- **Persistence invisibility**: duplicate writes (#104653), missing `/steer` persistence (#104442), summary-override breaks (#104176). When something goes wrong, history simply doesn't match what the user said.
- **Local-model DX is rough**: Desktop tool-use with llama.cpp emits raw JSON (#104603); image token pricing is flat and breaks 64K-context local workflows (#70328).
- **Dashboard reliability**: React #520 crash on every tab (#45125) has been open since June.

**Satisfaction signal**: PR #104668 (engineering-evidence plugin) and the engineering quality of the stream-secret retention work (#70093, [security] tag) suggest a community of contributors who care about bounded, well-scoped plugin surfaces — a positive counterweight to the bug stream.

## 8. Backlog Watch

Issues and PRs most in need of maintainer attention, ranked by age × severity:

1. **[#42719 (P1)](https://github.com/NousResearch/hermes-agent/issues/42719)** — ACP/MCP tools dropped from model request. Open since **2026-06-09** (~3 months). Core protocol correctness; no PR attached.
2. **[#45125 (P3)](https://github.com/NousResearch/hermes-agent/issues/45125)** — Dashboard React #520 crash on every tab. Open since **2026-06-12**. Affects first-run UX across all platforms.
3. **[#44963 (P3)](https://github.com/NousResearch/hermes-agent/issues/44963)** — Memory Write Gate approvals should be explicit and staged. Open since **2026-06-12**. Security/UX for memory writes.
4. **[#426

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-07

## 1. Today's Overview

Project activity in the last 24 hours is low and dominated by automated dependency maintenance rather than community-driven work. All 9 updated PRs were touched in the past day, but 7 of them are Dependabot dependency bumps (Rust crates and GitHub Actions), while only 2 represent meaningful code changes from human contributors. No issues were opened, commented on, or closed, and no new releases were tagged. The overall signal is that IronClaw is in a maintenance/dependency-hygiene phase, with two targeted bug fixes shipping in parallel.

## 2. Releases

No new releases were published in the last 24 hours. Section omitted.

## 3. Project Progress

Three PRs were merged/closed today, all of them Dependabot dependency updates with no functional code changes:

- **[#8049](https://github.com/nearai/ironclaw/pull/8049)** — Closed. Bumped the `everything-else` Rust dependency group with 19 updates (uuid 1.24.0 → 1.26.0, base64 0.22.1 → 0.23.1, toml, etc.). Low risk.
- **[#7835](https://github.com/nearai/ironclaw/pull/7835)** — Closed. Bumped the GitHub Actions group with 5 updates (including `anthropics/claude-code-action` 1.0.183 → 1.0.210 and `actions/setup-node` 4.0.2 → 7.0.0). Medium risk due to a major-version bump of `setup-node`.
- **[#7020](https://github.com/nearai/ironclaw/pull/7020)** — Closed. Bumped `tokio-tungstenite` from 0.29.0 to 0.30.0. Low risk, single-package update.

No feature PRs landed today.

## 4. Community Hot Topics

There are **no hot topics** by the usual metrics (comments or reactions). Every PR in today's activity has 0 comments and 0 👍, indicating either silent reviewer workflows or that activity is dominated by automation that doesn't generate discussion. The two human-authored PRs most likely to attract review attention are:

- **[#8077](https://github.com/nearai/ironclaw/pull/8077)** — `fix(mcp): classify response leak diagnostics` (author: linhongyu510) — closes issue #8009 (not visible in current data) and introduces a shared `response_leak_blocked` sentinel. Suggests there is an outstanding concern around MCP egress diagnostics that has been waiting on a fix.
- **[#8076](https://github.com/nearai/ironclaw/pull/8076)** — `fix(assistant): distinguish disconnected shared channels` (author: be-student) — refines how Slack shared channels present disconnected-vs-unpaired states and keeps rejection classification consistent across product, adapter, and OpenAI-compatible surfaces. Indicates ongoing UX correctness work for the assistant's Slack integration.

## 5. Bugs & Stability

Two bug-fix PRs are open and pending review:

| Severity | PR | Area | Description | Fix Status |
|---|---|---|---|---|
| Medium | [#8077](https://github.com/nearai/ironclaw/pull/8077) | MCP / host API | Response-leak diagnostics could conflate "host leak blocked" with MCP-visible error reasons, weakening safety signal. Centralizes a `response_leak_blocked` sentinel and classifies it correctly in the MCP lane. | Open, awaiting merge; closes #8009. |
| Medium | [#8076](https://github.com/nearai/ironclaw/pull/8076) | Assistant / Slack | A paired user's disconnected shared channel was not distinguished from an unpaired account, producing misleading rejection messages. Adds channel-specific guidance and unifies classification across product, adapter, and OpenAI-compatible surfaces; updates Slack capability descriptors. | Open, awaiting review. |

No crash, regression, or security incident was reported in the last 24 hours. Both open bugs are correctness/UX-class rather than stability-class, and each has a concrete fix PR in flight.

## 6. Feature Requests & Roadmap Signals

**No new feature requests or roadmap signals** can be derived from the last 24 hours of data. There are zero open or updated issues, and the only non-dependabot PRs are bug fixes. To extract roadmap signals, maintainers would need to look outside the 24-hour window (e.g., previously merged features, milestones, or discussions on open issues not updated today). No near-term version prediction is justified by the current data.

## 7. User Feedback Summary

**No user feedback data is available in the last 24 hours.** No issues were opened or commented on, and all PRs show 0 comments / 0 reactions. The two human PRs (#8077, #8076) are contributor-initiated bug fixes rather than responses to public user reports. Any satisfaction/dissatisfaction signal from end users is absent from this snapshot.

## 8. Backlog Watch

The following items are open and have not seen recent activity or review attention:

- **[#7834](https://github.com/nearai/ironclaw/pull/7834)** — `chore(deps): bump the wasm group` (wasmtime, wasmtime-wasi, wit-component, wit-parser). **Open since 2026-08-23, ~15 days stale.** Sized L, medium risk, contributor experienced. The wasm toolchain is a meaningful surface area for IronClaw's sandboxing story, so leaving this stale increases drift from upstream `bytecodealliance`. Maintainers should prioritize review or close with a follow-up plan.
- **[#8078](https://github.com/nearai/ironclaw/pull/8078)** — Dependabot bump of the `tokio-ecosystem` group (tower-http 0.7.0 → 0.7.1, tokio-tungstenite). Opened 2026-09-06, not yet triaged.
- **[#8079](https://github.com/nearai/ironclaw/pull/8079)** — Dependabot bump of the GitHub Actions group with 6 updates, including a major-version bump of `actions/setup-node` (4.0.2 → 7.0.0). Opened 2026-09-06, not yet triaged. Major-version CI bumps historically are the highest-risk item in this set.
- **[#8080](https://github.com/nearai/ironclaw/pull/8080)** — Dependabot `everything-else` group with 21 Rust updates (uuid, base64, rust_decimal, …). Opened 2026-09-06. Likely a follow-up to the just-closed #8049 and may need to be merged/dismissed to avoid duplicated churn.

**Maintainer attention recommended on:** #7834 (longest-stale) and #8079 (major-version CI action bump, highest regression risk).

---

*Snapshot generated from GitHub activity for `nearai/ironclaw` covering the 24-hour window ending 2026-09-07. Data sources: issues and pull requests via the GitHub API.*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>



</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-07

## 1. Today's Overview

ZeroClaw shows **high architectural activity** with 33 issues and 50 PRs updated in the last 24 hours, though no new releases shipped. The project is in a deep RFC/design phase, dominated by maintainers @NiuBlibing and @Audacity88 advancing the v0.8.5+ stabilization line and laying groundwork for v0.9 (session/event history, WASM plugin runtime, unified file/attachment architecture, gateway transport decoupling). 44 PRs remain open with 6 closed/merged, including a notable set of bug fixes around Matrix channel transcription, CLI memory factory, and Discord STT dispatch. The activity profile signals a healthy but heavy maintainer load — many XL/L PRs are blocked on maintainer review or author action, and there is a cluster of P1/S1 stability bugs in daemon startup, budget enforcement, and Anthropic provider parsing that need triaging.

## 2. Releases

No new releases in the last 24 hours. The active stabilization line is tracked in [#9459 (v0.8.5 finite weekly stabilization line)](https://github.com/zeroclaw-labs/zeroclaw/issues/9459), with weekly cuts through August 30, 2026.

## 3. Project Progress

**Closed/Merged PRs (visible from the top activity list):**

- **[#10487](https://github.com/zeroclaw-labs/zeroclaw/pull/10487) — `fix(channels/matrix): resolve transcription providers from live config` (merged)** by @sebkraemer. Resolved a regression where Matrix channel captured a `TranscriptionConfig` snapshot at construction time, so typed `[providers.transcription.<type>.<alias>]` entries were never registered.
- **[#10650](https://github.com/zeroclaw-labs/zeroclaw/pull/10650) — `ci(channels/matrix): execute every Matrix lib test` (merged)** by @sebkraemer. Fixed CI so `channel-matrix` lib tests are actually executed (previously only one module ran via a filtered step).
- **[#10668](https://github.com/zeroclaw-labs/zeroclaw/pull/10668) — `fix(ci): scope Windows tests for locale resources` (XS)** by @Audacity88. Part of the broader Windows locale/encoding work tracked in [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462).

**Closed issues (3):**
- **[#9575](https://github.com/zeroclaw-labs/zeroclaw/issues/9575) — Warm OpenAI-compatible connections through `/models`** (NiuBlibing). Accepted and shipped.
- **[#9653](https://github.com/zeroclaw-labs/zeroclaw/issues/9653) — `plugin wasi:http` trust-store gap** (ZiBibro). Closed, likely via the follow-ups referenced ([#9395](https://github.com/zeroclaw-labs/zeroclaw/issues/9395), PR #9137).
- **[#10572](https://github.com/zeroclaw-labs/zeroclaw/issues/10572) — Document the WeCom (WeChat Work) channel** (JordanTheJet, `good first issue`).

**Features advanced (in review, not yet merged):**
- WebSocket lifetime decoupling ([#7759](https://github.com/zeroclaw-labs/zeroclaw/issues/7759)) — tracked in [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) (ACP turn persistence).
- Multi-session ZeroCode panes ([#9739](https://github.com/zeroclaw-labs/zeroclaw/pull/9739)) — bounced through maintainer repair and re-merged with master.
- Bounded delegate filesystem tools now respect target's own workspace ([#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391)).

## 4. Community Hot Topics

**Most active issues (by comment count):**

1. **[#9487 — RFC: Runtime-owned conversation sessions and transport surface adapters (Rev 5)](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)** — 34 comments. Author: @NiuBlibing. This is a **material replacement of Rev 4**; the open vote does not carry forward, requiring a new discussion window and snapshot. The recurring churn here signals that the conversation-session model is the project's central architectural debate and that maintainers need a stable snapshotting convention.

2. **[#9488 — RFC: Unified file and attachment architecture for conversation surfaces (Rev 10)](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)** — 27 comments. Also on **Rev 10** with the same "no vote carry-forward" pattern. Indicates chronic revision churn in the same area, suggesting the project may benefit from [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)'s proposal to simplify RFC voting.

3. **[#6996 — RFC: Granular sandbox policy — filesystem restrictions](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)** — 25 comments, in-progress. A high-risk RFC reconciling application-layer `SecurityPolicy` and OS-level sandboxes (Bubblewrap, Landlock, Seatbelt). Open since May; needs maintainer convergence.

4. **[#7462 — 74 test failures on Windows](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)** — 19 comments, P1 in-progress. The CI Test job runs only on Linux, so Windows regressions are silent.

5. **[#8692 — Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — 15 comments. A tracker issue that is itself indicative of the maintainer-load problem.

**Underlying need:** the community is signaling that **the RFC process is itself overloaded** — multiple simultaneous high-stakes architectural proposals (session history [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526), WASM plugins [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076), sandbox policy, conversation surfaces) compete for the same review bandwidth, and revisions keep restarting.

## 5. Bugs & Stability

**S1 — workflow blocked (highest severity):**

- **[#10230 — Daemon startup or reload can overflow during agent initialization](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)** (P1, `r:needs-repro`). Applying a Quickstart configuration from ZeroCode while the daemon is running can abort a Tokio runtime worker with a stack overflow. **No fix PR linked yet.**
- **[#9421 — Incomplete terminal responses can be reported as successful](https://github.com/zeroclaw-labs/zeroclaw/issues/9421)** (P1, in-progress). A provider can end a turn without a trustworthy final answer while runtime still presents success. **Fix PR: [#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447)** by @vrurg (classify incomplete terminal responses), in author-action state.
- **[#9191 — Cron agent jobs have no wall-clock timeout](https://github.com/zeroclaw-labs/zeroclaw/issues/9191)** (P1, accepted, in-progress). `run_agent_job` awaits `agent::run` with no outer timeout; shell jobs have a 120s cap. **No fix PR linked yet.**
- **[#10670 — `heartbeat.target` rejects a channel instance composite key](https://github.com/zeroclaw-labs/zeroclaw/issues/10670)** (S1, fresh today). **Fix PR: [#10671](https://github.com/zeroclaw-labs/zeroclaw/pull/10671)** by @metalmon — already opened the same day, good turnaround.
- **[#10659 — Budget-exceeded Code turn loses visible progress after session restore](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)** (P1, fresh). Runtime emits a terminal failed-turn event and discards unfinished assistant text on the daily-cost cap. Likely related to the cost-tracking cluster below.
- **[#10644 — Background delegate results not bound to an owner principal](https://github.com/zeroclaw-labs/zeroclaw/issues/10644)** (P1, follow-up from #10601). Workspace-level JSON files can leak across principals.

**S2 — degraded behavior:**

- **[#7462 — 74 test failures on Windows](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)** (P1, accepted). Multiple follow-ups and PRs in flight ([#10668](https://github.com/zeroclaw-labs/zeroclaw/pull/10668)).
- **[#10635 — Runtime profile cost limit does not reflect effective global daily budget](https://github.com/zeroclaw-labs/zeroclaw/issues/10635)** (P1). Profile reports effectively unbounded but agent turns still rejected at the process-wide $10 ledger.
- **[#10645 — Cost-tracking context not threaded into delegated sub-loops](https://github.com/zeroclaw-labs/zeroclaw/issues/10645)** (P1). `check_tool_loop_budget` returns `None` for delegates.
- **[#10617 — `thinking.display = "updates"` returns 400 on Claude Fable 5.1](https://github.com/zeroclaw-labs/zeroclaw/issues/10617)** (P1). Live probing narrowed the wire enum to `summarized`/`omitted`.
- **[#10302 — ZeroCode Code pane can stay in Processing state while browsing history](https://github.com/zeroclaw-labs/zeroclaw/issues/10302)** (P2, follow-up to #10141). CPU stays elevated.
- **[#10662 — OAuth system-prefix cache marker is below Anthropic's cache minimum](https://github.com/zeroclaw-labs/zeroclaw/issues/10662)** (P2). Wastes one of the four cache-breakpoint slots.

**Stability trend:** the dominant bug cluster is **cost/budget enforcement + Anthropic provider semantics** — three related P1 issues (#10635, #10645, #10617) plus [#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659) and [#10644](https://github.com/zeroclaw-labs/zeroclaw/issues/10644) point to a systemic gap between profile-level, process-level, and delegate-scoped budgets.

## 6. Feature Requests & Roadmap Signals

**Likely v0.8.6 / next-cut candidates (small, low-risk, directly addressable):**

- **[#10426 — Show user-facing agent progress in Telegram](https://github.com/zeroclaw-labs/zeroclaw/issues/10426)** (P2). Long-running tools look stalled; addressable via streaming receipts.
- **[#10580 — Docs links gate should catch dangling internal links repo-wide](https://github.com/zeroclaw-labs/zeroclaw/issues/10580)** (P2, low risk, CI-only). Cheap CI hardening.
- **[#9575](https://github.com/zeroclaw-labs/zeroclaw/issues/9575) (closed)** — `/models` warmup already accepted, will ship in next release.

**Medium-term (v0.9 candidates, requiring RFC convergence):**

- **[#7759 — Decouple gateway WebSocket lifetime from agent turn lifecycle](https://github.com/zeroclaw-labs/zeroclaw/issues/7759)** (P1, accepted, in-progress). Background turn execution + resume-on-reconnect. PR [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) (ACP interrupted-turn persistence) is the natural co-ship.
- **[#6932 — Persist gateway WebSocket sessions as full conversation transcripts](https://github.com/zeroclaw-labs/zeroclaw/issues/6932)** (P2, accepted). Natural follow-on to #7759.
- **[#10531 — Expose delegate sub-agent progress to the parent](https://github.com/zeroclaw-labs/zeroclaw/issues/10531)** (P2). Partial output + tool receipts from background delegate.
- **[#10356 — AnySearch web search provider](https://github.com/zeroclaw-labs/zeroclaw/pull/10356)** (enhancement, blocked). Opt-in `[web_search]` provider, no-auth by default.

**Long-term (post-v0.9 architectural):**

- **Runtime-owned conversation sessions & transport adapters** ([#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487))
- **Unified file/attachment architecture** ([#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488))
- **Composable WASM plugin runtime** ([#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076))
- **Append-only session event history & deterministic replay** ([#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526))
- **Granular sandbox policy** ([#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996))
- **Persistent session prompt attachments** ([#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407), XL)
- **Multi-session ZeroCode panes with agent sidebar** ([#9739](https://github.com/zeroclaw-labs/zeroclaw/pull/9739), XL, distinguished contributor)
- **Secure model picker for Telegram** ([#9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997), blocked, do-not-merge)
- **Third cache breakpoint on the previous turn's last message** ([#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660), Anthropic caching)

## 7. User Feedback Summary

**Pain points surfaced today:**

- **Silent UX on long Telegram tasks** ([#10426](https://github.com/zeroclaw-labs/zeroclaw/issues/10426)) — users perceive the agent as stalled during long searches/tool calls; the channel gives no intermediate signal.
- **Daemon instability on quickstart reload** ([#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)) — applying Quickstart while the daemon runs is a hard workflow-blocker; CPU literally halts.
- **Cost-budget surprise** ([#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635), [#10645](https://github.com/zeroclaw-labs/zeroclaw/issues/10645)) — the *displayed* daily limit diverges from the *enforced* limit, undermining the safety affordance the budget was supposed to provide.
- **Lost progress on budget cap** ([#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)) — failing turns discard the assistant text the user has already seen, breaking trust.
- **Cross-principal delegate result leakage** ([#106

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*