# OpenClaw Ecosystem Digest 2026-09-10

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-09 23:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-10

## 1. Today's Overview

OpenClaw shows very high repository velocity: **500 issues and 500 PRs updated within the last 24h** (310/190 issue split, 262/238 PR split), with no tagged release cut in this window. Activity skews heavily toward **stabilization of the 2026.9.x line** — nearly every P0/P1 from today involves regressions introduced between 2026.7.1-2 and 2026.9.3, particularly around the Gateway event loop, memory-core SQLite growth, OAuth/Codex flows, and channel plugins (Telegram, Slack, Discord, Feishu). Maintainer review bandwidth is the dominant constraint: many high-priority bugs have linked fix PRs in "ready for maintainer look" or "needs proof" status but no merge activity today. The community is clearly in a regression-burndown phase rather than a feature-expansion phase.

## 2. Releases

**No new releases in the last 24h.** The latest tagged versions referenced in the issue stream are 2026.8.1, 2026.8.2, 2026.9.1, 2026.9.2, and 2026.9.3 (commit `1391f7c`); the 2026.9.x line in particular has been the source of several "release blocker" regressions in the last 24h — see [Issue #137813](https://github.com/openclaw/openclaw/issues/137813) (Windows gateway never starts), [Issue #142336](https://github.com/openclaw/openclaw/issues/142336) (`/dashboard` shadows Telegram Mini App), and [Issue #142585](https://github.com/openclaw/openclaw/issues/142585) (Doctor refuses valid legacy workspace setup on 2026.9.3).

## 3. Project Progress

Only a small number of PRs closed/merged today relative to the activity volume. The notable closed PRs are all low-blast-radius internal improvements:

- [PR #143451](https://github.com/openclaw/openclaw/pull/143451) — `fix(sessions): identify slow SQLite writer operations` (XL, docs/gateway/commands/agents). Operationally meaningful: addresses the "no trace context for slow writers" gap referenced in [Issue #119720](https://github.com/openclaw/openclaw/issues/119720) (Gateway event-loop stalls).
- [PR #143472](https://github.com/openclaw/openclaw/pull/143472) — `docs(gateway): lift non-family sections out of RPC method families` (XS). Documentation-only cleanup.
- [PR #143469](https://github.com/openclaw/openclaw/pull/143469) — `improve(test): reduce Gateway worktree fixture setup` (S). Test-infrastructure speedup, no runtime behavior change.

Other notable PRs sitting in the open queue, "ready for maintainer look," and not yet merged include: [PR #141072](https://github.com/openclaw/openclaw/pull/141072) (idle-timed-out settled turns should be `failed`), [PR #143433](https://github.com/openclaw/openclaw/pull/143433) (heartbeat MCP child-process leak), [PR #142626](https://github.com/openclaw/openclaw/pull/142626) (iMessage feedback after bridge recovery — armed for automerge), [PR #142768](https://github.com/openclaw/openclaw/pull/142768) (draining ingress claims), [PR #142888](https://github.com/openclaw/openclaw/pull/142888) (OpenAI completions text doubling), and [PR #143437](https://github.com/openclaw/openclaw/pull/143437) (Control UI Stop-button persistence).

## 4. Community Hot Topics

The top-of-stream items by comment count and reaction count concentrate around the same recurring pain points: **tool-call reliability**, **multi-agent orchestration**, **memory-core SQLite growth**, **OAuth/Codex regression**, and **prompt-cache invalidation**.

- [Issue #135111](https://github.com/openclaw/openclaw/issues/135111) (26 comments) — Intermittent `Provider completed tool call with malformed JSON arguments` on v2026.8.1 with claude-sonnet-5. **Need:** model-side retry/tolerance for partial JSON tool arguments and provider-version pinning documentation.
- [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) (16 comments, 👍1) — Unreaped hook/tool child processes accumulate as zombies under `openclaw`. **Need:** explicit lifecycle/cleanup contract for child processes spawned during tool/hook execution.
- [Issue #119720](https://github.com/openclaw/openclaw/issues/119720) (15 comments) — Synchronous agent persistence and transcript maintenance block the Gateway event loop at scale. **Need:** async/queue-decoupled persistence path.
- [Issue #43367](https://github.com/openclaw/openclaw/issues/43367) (14 comments, 👍1) — Multi-agent orchestration instability: concurrent `agents add/config` overwrites, session-lock failures, detached child work. **Need:** per-agent config locking and idempotent CLI semantics.
- [Issue #89278](https://github.com/openclaw/openclaw/issues/89278) (12 comments, 👍2) — Codex OAuth refresh succeeds but cron/heartbeat fail with a 10s timeout. **Need:** a refresh-timeout knob aligned to the actual probe duration.
- [Issue #95610](https://github.com/openclaw/openclaw/issues/95610) (12 comments, 👍2) — Prompt-cache prefix churn on OpenAI models: per-turn dynamic injections defeat automatic prefix caching. **Need:** cache-aware layout (manual `cache_control` breakpoints or hoisting the volatile block out of the prefix).
- [Issue #88757](https://github.com/openclaw/openclaw/issues/88757) (6 comments, 👍3 — highest reactions of the day) — Proactive messages are not visible in session context, causing desynchronization. **Need:** proactive-send bookkeeping written back into the session transcript.
- [Issue #126906](https://github.com/openclaw/openclaw/issues/126906) (5 comments) — Denying the write tool silently disables memory persistence and the agent still reports success. **Need:** explicit operator-visible warning + agent-visible error when `tools.deny` collides with a system-critical tool.

## 5. Bugs & Stability

Reported today or updated today, ranked by P-level and `impact:*` tags. P0/P1 first.

### P0 / release-blocker regressions (2026.9.x line)
- **[Issue #137813](https://github.com/openclaw/openclaw/issues/137813)** — Windows gateway never starts after 2026.9.1 update; new `--task-supervisor` flag exits 0 silently. *No fix PR linked yet.*
- **[Issue #89278](https://github.com/openclaw/openclaw/issues/89278)** — Codex OAuth 10s refresh-timeout failure inside cron/heartbeat. Linked PR exists but is not in the closed set today.
- **[Issue #115642](https://github.com/openclaw/openclaw/issues/115642)** — Billing cooldown outlives the outage on subscription auth; requests fail with `Provider anthropic is in cooldown (suspending lanes) (billing)` for 5h after a transient billing error. *No fix PR linked yet.*
- **[Issue #142585](https://github.com/openclaw/openclaw/issues/142585)** — 2026.9.3 Doctor refuses valid legacy workspace setup and attestation import when canonical rows are absent. *No fix PR linked yet.*

### P1 platform/stability
- **[Issue #97616](https://github.com/openclaw/openclaw/issues/97616)** — Zombie hook/tool child processes. Open since 2026-06-29.
- **[Issue #119720](https://github.com/openclaw/openclaw/issues/119720)** — Synchronous persistence blocks Gateway event loop. Recent comments note partial repairs landed via [#140231](https://github.com/openclaw/openclaw/issues/140231) and [#138984](https://github.com/openclaw/openclaw/issues/138984).
- **[Issue #140010](https://github.com/openclaw/openclaw/issues/140010)** — Windows sleep/resume: WebSocket reconnects can fail for 30–60s+.
- **[Issue #138042](https://github.com/openclaw/openclaw/issues/138042)** — Gateway control requests can stall for 157–276s.
- **[Issue #127148](https://github.com/openclaw/openclaw/issues/127148)** — `sessions.compact` acquires a second app-server, hits active-writer conflict.
- **[Issue #136311](https://github.com/openclaw/openclaw/issues/136311)** — `memory-core` Gateway reacquires reindex lock on every start; 19 GB of orphaned `memory-reindex-*` temp DBs.
- **[Issue #114612](https://github.com/openclaw/openclaw/issues/114612)** — `memory_index_chunks` + `memory_embedding_cache` tables have no retention policy.
- **[Issue #125570](https://github.com/openclaw/openclaw/issues/125570)** — Skill Workshop update apply overwrites the live skill's description, silently breaking skill routing.
- **[Issue #139274](https://github.com/openclaw/openclaw/issues/139274)** — Native `/codex bind` drops voice-note attachments and skips configured STT.
- **[Issue #115367](https://github.com/openclaw/openclaw/issues/115367)** — Provider-owned read gate requires `origin: bundled`, but slack/discord/matrix/msteams/feishu now ship as external plugins → reads locked to current conversation.
- **[Issue #123799](https://github.com/openclaw/openclaw/issues/123799)** — Production deployment on 2026.5.12 still blocked by Codex compact 404; needs explicit upgrade/backport guidance.

### P1 regressions closed today (residual risk)
- **[Issue #135111](https://github.com/openclaw/openclaw/issues/135111)** — Malformed JSON tool call (closed).
- **[Issue #137927](https://github.com/openclaw/openclaw/issues/137927)** — Internal `<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` block leaked to Telegram message text (closed).
- **[Issue #140971](https://github.com/openclaw/openclaw/issues/140971)** — All 13 Feishu plugin tools silently dropped in message-driven runs (closed).
- **[Issue #133692](https://github.com/openclaw/openclaw/issues/133692)** — Isolated cron rejects superseded prepared runtime generation before dispatch (closed, PR linked).
- **[Issue #141617](https://github.com/openclaw/openclaw/issues/141617)** — 2026.9.2 npm update stuck at `requested/running` after supported repair (closed).

### P2 channel/UX regressions
- **[Issue #142037](https://github.com/openclaw/openclaw/issues/142037)** — Embedded runtime records explicit-route `message`-tool replies as "mute" in Slack.
- **[Issue #142336](https://github.com/openclaw/openclaw/issues/142336)** — `/dashboard` shadows Telegram Mini App launcher.
- **[Issue #143278](https://github.com/openclaw/openclaw/issues/143278)** — Heartbeat internal output leaks to Telegram user chat on 2026.9.3.
- **[Issue #139714](https://github.com/openclaw/openclaw/issues/139714)** — `updateCommand()` admits an `update_runs` row that can never finalize → `openclaw status` reports "update in progress" forever.
- **[Issue #44502](https://github.com/openclaw/openclaw/issues/44502)** — Discord routing/mention-gating permissive regression.
- **[Issue #112160](https://github.com/openclaw/openclaw/issues/112160)** — SSH sandbox does not stage inbound media into existing remote workspace.
- **[Issue #128637](https://github.com/openclaw/openclaw/issues/128637)** — Multi-agent setup `AgentSelectionRequiredError` on Exec/agent-less operations.
- **[Issue #99925](https://github.com/openclaw/openclaw/issues/99925)** — WebChat new session loses all prior conversation context (Windows).
- **[Issue #53628](https://github.com/openclaw/openclaw/issues/53628)** — `${XDG_CONFIG_HOME}` not processed when installing a skill (open since 2026-03-24).
- **[Issue #41201](https://github.com/openclaw/openclaw/issues/41201)** — Control UI Avatar broken image (open since 2026-03-09).

### Severity pattern
The dominant failure mode is **operator-visible regressions introduced by the 2026.7 → 2026.9 migration**: stricter plugin-origin gating ([#115367](https://github.com/openclaw/openclaw/issues/115367)), `--task-supervisor` silent exit on Windows ([#137813](https://github.com/openclaw/openclaw/issues/137813)), command shadowing ([#142336](https://github.com/openclaw/openclaw/issues/142336)), and Doctor refusing legacy state ([#142585](https://github.com/openclaw/openclaw/issues/142585)). Memory-core regressions on the SQLite path are the second cluster ([#136311](https://github.com/openclaw/openclaw/issues/136311), [#114612](https://github.com/openclaw/openclaw/issues/114612), [#50611](https://github.com/openclaw/openclaw/issues/50611)).

## 6. Feature Requests & Roadmap Signals

Feature requests updated today are mostly long-lived items that have not yet received a maintainer product decision (most carry the `clawsweeper:needs-product-decision` tag).

- **[Issue #6599](https://github.com/openclaw/openclaw/issues/6599)** — Add `/models test-fallback` command. *Likely to land in the next minor*: low-risk, high-utility, fits the existing `/models` surface.
- **[Issue #6757](https://github.com/openclaw/openclaw/issues/6757

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Open-Source Personal AI Assistant Ecosystem
**Data window: 2026-09-10 (24h) | Projects: OpenClaw, Hermes Agent, QwenPaw, ZeroClaw, IronClaw**

---

## 1. Ecosystem Overview

The personal AI assistant/agent category has moved past the feature-land-grab phase into **consolidation and stabilization** — all five tracked projects shipped zero releases in the window, and four of five are either in regression burndown (OpenClaw, QwenPaw) or architecture/RFC cycles (ZeroClaw). Convergence is striking: independent codebases are hitting the same walls simultaneously — context compaction budgets, memory-store growth, provider cost/prompt-cache economics, MCP standardization, Windows parity, and mobile reach. The universal bottleneck is no longer ideation or contribution volume but **maintainer review bandwidth**, with every project showing fix-PRs queued in "ready for review" or "needs author/maintainer action" states. For builders, this is a maturing market where reliability engineering and trust boundaries — not new capabilities — are the competitive frontier.

---

## 2. Activity Comparison

*Counts = items updated in the 24h window (not newly filed); merges = PRs merged/closed in window.*

| Project | Issues (24h) | PRs (24h) | Merged PRs | Release status | Health (0–10) |
|---|---|---|---|---|---|
| **OpenClaw** | ~500 (310 open / 190 closed) | ~500 (262 / 238) | ~3 | None; latest 2026.9.3, line generating release blockers | **6.5** — unmatched velocity & adoption, but unfixed P0s and ~0.6% merge conversion |
| **Hermes Agent** | 50 (46 / 4) | 50 (42 / 8) | 8 | None; release pipeline blocked (#88584, 24 days) | **7.0** — best fix-merge discipline; Windows debt + blocked releases |
| **QwenPaw** | 22 (11 / 11) | 34 (26 / 8) | 8 | None; stabilizing v2.2.0 (2.2.0b7) | **7.5** — best balance of throughput, triage speed, and feature pipeline; 3 high-sev bugs lack fix PRs |
| **ZeroClaw** | 33 open | 49 open | 1 | None; ZeroCode v0.8.5 shipping regressions | **6.0** — strongest design culture; ~2% merge ratio, months-old accepted bugs |
| **IronClaw** | 1 | 6 (4 open / 2 merged) | 2 | None | **5.0** — clean and stable but single-contributor concentration, zero community engagement |

---

## 3. OpenClaw's Position

**Advantages vs. peers**
- **Scale is not close:** ~10x the daily issue/PR volume of any peer. Cumulative tracker numbering (~#143k vs. Hermes ~#106k, ZeroClaw ~#10.7k, IronClaw ~#8k, QwenPaw ~#7.6k*) confirms the largest historical contributor and user base. \*numbering conventions differ; directional proxy only.
- **Widest integration surface:** Telegram, Slack, Discord, Feishu, Matrix, MS Teams, iMessage, WebChat, plus heartbeat/cron, memory-core, and a multi-agent CLI. Enterprise-shaped pain (billing cooldowns, Feishu tool drops, subscription auth) signals production adoption peers don't yet show.
- **Structured triage maturity:** product-decision gating tags and per-impact labeling indicate institutionalized process.

**Weaknesses**
- **Throughput conversion:** ~3 merges against 500 updated PRs; Hermes merged 8 with one-tenth the volume. Multiple P0s (Windows gateway startup #137813, billing cooldown #115642, Doctor refusing legacy workspaces #142585) have no linked fix PR while sitting atop the queue.
- **Release-train regressions:** the 2026.7→2026.9 migration produced repeated release blockers — a cadence problem, not a one-off.

**Technical approach differences:** OpenClaw is a **gateway-centric monolith with plugin-ized channels** — maximal integration value, but the gateway event loop is itself the recurring failure surface (#119720 sync persistence stalls, #138042 157–276s control stalls). ZeroClaw is explicitly redesigning away from this (runtime-owned sessions + transport adapters, RFC #9487); QwenPaw pairs a polished Console/Desktop with swappable local runtimes; Hermes runs a cross-fork delivery pipeline; IronClaw is a hosted-MCP platform layer.

**Community:** OpenClaw's engagement is broad-but-shallow per item (hot threads at 12–26 comments, reactions ≤3👍); Hermes shows concentrated deep threads (81-comment process debate); QwenPaw has the healthiest newcomer funnel (first-time contributor shipping meaningful fixes).

---

## 4. Shared Technical Focus Areas

| Theme | Projects | Specific evidence & need |
|---|---|---|
| **Context compaction & session integrity** | OpenClaw, QwenPaw, ZeroClaw, Hermes | Sync persistence blocking event loops (OpenClaw #119720); compaction exceeding provider budgets (QwenPaw #7628, PR #7652); stale context after compression (Hermes #94001); compaction-ratio PR stalled (ZeroClaw #9535). Need: budget-aware, async persistence paths. |
| **Memory store growth & retention** | OpenClaw, QwenPaw, Hermes, ZeroClaw | 19 GB orphaned reindex DBs + no retention policy (OpenClaw #136311, #114612); FTS corruption + silent purge failure (QwenPaw #7596/PR #7655); memory-consolidation opt-in (Hermes #106919); append-only history design (ZeroClaw #10526). |
| **Provider cost & prompt-cache economics** | OpenClaw, ZeroClaw, Hermes | Cache-prefix churn defeating OpenAI caching (OpenClaw #95610); Anthropic spend reporting $0.00 so budget caps never fire (ZeroClaw #9816); 1h cache TTL + cache-write pricing (ZeroClaw #10663/#10699). |
| **MCP maturation** | IronClaw (core), QwenPaw, Hermes, ZeroClaw | SEP-414 caller attribution, per-caller catalogs (IronClaw #8084/#8090); configurable HTTP/SSE timeouts (QwenPaw #7649); bridge approval wiring (Hermes #56971); WASM plugin runtime (ZeroClaw #10076). |
| **Windows platform parity** | OpenClaw, Hermes, QwenPaw | Gateway never starts (#137813, OpenClaw); 5 of 13 Hermes bugs Windows-specific; 118–135s event-loop freeze (QwenPaw #7363, 2 weeks, no fix PR). |
| **Process lifecycle / zombie handling** | OpenClaw, Hermes | Zombie tool/hook children (OpenClaw #97616, open since June); MCP child leak (#143433); gateway zombie + TCP exhaustion (Hermes #106359). |
| **Mobile & multi-device reach** | Hermes, QwenPaw, OpenClaw | Native mobile + voice (Hermes #11911); Expo/RN client in draft (QwenPaw #7378, DO-NOT-MERGE); mobile-web ergonomics complaints (QwenPaw #7177, #5329); Telegram Mini App shadowing (OpenClaw #142336). |
| **Granular trust & safety** | Hermes, OpenClaw, ZeroClaw | Per-tool YOLO scopes (Hermes #106267); sub-agent verification pattern (Hermes #356); denied write-tool silently breaking memory (OpenClaw #126906); sandbox-policy unification RFC (ZeroClaw #6996). |

---

## 5. Differentiation Analysis

| Dimension | OpenClaw | Hermes Agent | QwenPaw | ZeroClaw | IronClaw |
|---|---|---|---|---|---|
| **Feature focus** | Channel breadth, gateway, multi-agent orchestration | Desktop UX, local-model interop (Ollama/Qwen), trust controls, voice | End-user product: Console, Desktop, app/skill market, Advisor Mode (dual-model) | Architecture correctness: sandboxing, session/transport separation, cost ledger, protocol parity (OpenAI Responses, A2A) | Hosted-MCP provider platform, extension lifecycle |
| **Target user** | Self-hosters & production operators running many channels | Desktop-first users, local-model hobbyists | Less-technical end users; self-hosted panels; China-ecosystem channels (QQ) | Developers, security-conscious operators, TUI/CLI users | Platform integrators embedding agent infrastructure |
| **Architecture** | Monolithic gateway event loop + plugin channels | Gateway + aux retry/compression stack; cross-fork release pipeline | Console + Desktop clients over swappable local runtimes (llama.cpp) | Rust daemon, RFC-driven, TUI (ZeroCode/ACP) | Bundled extension/provider packages, multi-tenant catalogs |
| **Quality posture** | Volume-driven; regression-prone release train | Maintainer-led hotfix discipline | QA-gap on minors, fast triage closure | Design-first, execution-starved | Small, clean, low-churn |

**Net:** OpenClaw and QwenPaw compete for end-user breadth (integration-first vs. UX-first); ZeroClaw competes for architectural correctness; Hermes and IronClaw occupy developer/platform niches.

---

## 6. Community Momentum & Maturity

- **Tier 1 — Scale (OpenClaw):** highest raw momentum, but in a *stabilizing* regression-burndown phase; community energy absorbed by migration fallout rather than new capability.
- **Tier 2 — Balanced iteration (QwenPaw, Hermes):** the fastest real movers. QwenPaw runs dual-track (v2.2.0 cleanup + major bets: Advisor Mode, Mobile, Data 0.3, backend pluginization) with the best newcomer funnel. Hermes merges at 16% of updated-PR volume with same-day P1 closure (#105145), capped by a 24-day blocked release pipeline.
- **Tier 3 — Design-heavy (ZeroClaw):** engaged core (36- and 29-comment RFCs at Rev 5/Rev 10) but design throughput outpaces merge throughput (~1 merge/day vs. 49 open PRs); multiple accepted issues open since April–May.
- **Tier 4 — Maintenance (IronClaw):** steady internal churn, but 4 of 6 PRs and both merges from one contributor (`kirikov`), zero external comments/reactions — a bus-factor risk, not a community.

**Rapidly iterating:** QwenPaw, Hermes. **Stabilizing:** OpenClaw, QwenPaw (simultaneously). **Architecture phase:** ZeroClaw. **Dormant-adjacent:** IronClaw.

---

## 7. Trend Signals

1. **Review bandwidth is the ecosystem's scarcest resource.** Every project shows fix-ready PRs stalled on maintainer attention (OpenClaw's "ready for maintainer look" queue; ZeroClaw's XL PR backlog; Hermes' 2-month-old security PRs). *Implication:* contribution is easy, landing is hard — triage automation and review capacity are the highest-leverage investment.
2. **Cost observability is becoming table stakes.** Broken budget caps (ZeroClaw #9816), cache-write pricing gaps, and cache-prefix churn (OpenClaw #95610) appear independently across projects. *Implication:* build cache-aware prompt layouts and honest cost ledgers from day one.
3. **Memory/context engineering is unsolved at scale.** Four of five projects hit storage growth, retention, or compaction-budget failures this week. *Implication:* retention policies and budget-aware compaction are differentiators, not hygiene.
4. **MCP is standardizing fast — assume multi-caller.** SEP-414 attribution, per-caller catalogs (IronClaw), timeout configurability (QwenPaw). *Implication:* hosted/multi-tenant MCP correctness will be an expectation within quarters.
5. **Mobile is the next battleground.** Two native clients in flight (Hermes #11911, QwenPaw #7378) plus persistent mobile-web complaints. 
6. **Trust is going granular.** Per-tool permission scopes, sandbox-policy unification, and sub-agent verification patterns all surfaced this week — all-or-nothing autonomy modes are being rejected by power users.
7. **Silent failure is the #1 trust-killer.** The most community-volatile bugs are hidden failures: silent runtime rollback (QwenPaw #7633), silently disabled knowledge tool (ZeroClaw #10721), denied-tool-but-reports-success (OpenClaw #126906). *Implication:* operator-visible errors on every degradation path should be a design requirement.
8. **Windows remains an open differentiator** — three projects carry active Windows P1s; first mover to parity captures an underserved segment.

---

*Methodology note: all figures derive from each project's 2026-09-10 digest covering the prior 24h. "Updated" counts include long-lived items receiving comments/labels, not solely new arrivals; merge-ratio comparisons should be read with that caveat. Health scores synthesize velocity, fix-PR linkage for high-severity bugs, release cadence, and contributor/community diversification.*

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — Project Digest (2026-09-10)

## 1. Today's Overview

Hermes Agent shows **high-velocity maintenance activity** with 100 updates across issues and PRs in the last 24 hours (50 issues: 46 open / 4 closed; 50 PRs: 42 open / 8 merged/closed). No new release was published, but the changelog-shaped traffic is dominated by Windows desktop regressions, gateway/session lifecycle fixes, and a coordinated refactor of the auxiliary retry/compression stack (PRs #106866, #106955). Several long-standing P1 bugs around Windows packaging, OAuth, and update handoff remain open. Maintainer @teknium1 is highly active, personally merging critical reliability fixes (compression, OAuth, lint policy) rather than shipping them through the release branch.

## 2. Releases

**No new releases in the last 24 hours.** A pending release-engineering issue (#88584) continues to block the scheduled Nous→Enterkey merge, leaving the dashboard updater pinned on the last tested Enterkey release.

## 3. Project Progress

**Merged/Closed PRs today (8 total, top visible):**

| PR | Title | Impact |
|---|---|---|
| [#106866](https://github.com/NousResearch/hermes-agent/pull/106866) | fix: compression no longer times out silently on aux retries (#98466) | P1 — reliability for OpenAI-backed sessions; salvages earlier attempt #98480 |
| [#106955](https://github.com/NousResearch/hermes-agent/pull/106955) | fix(auxiliary): origin-scoped session-key shield, task overrides, negotiation-only stream fallback | P2 — follow-up security hardening to #106866 |
| [#106953](https://github.com/NousResearch/hermes-agent/pull/106953) | fix(cli): stop gateway `start()` blocking on non-TTY prompts and double-spawning | P2 — unblocks `hermes gateway restart` from agents/cron on Windows |
| [#103776](https://github.com/NousResearch/hermes-agent/pull/103776) | fix(tools): guide malformed tool_call without `name` to direct tool (Ollama/Qwen) | Tool-call robustness for local model backends |
| [#106646](https://github.com/NousResearch/hermes-agent/pull/106646) | fix(gateway): preserve `x-opencode-session` on `llm.oneshot` for OpenCode Go | Fresh-install provider crash fix |
| [#106885](https://github.com/NousResearch/hermes-agent/pull/106885) | fix(release): correctly strip scoped conventional prefixes in `clean_subject` | Release-notes generation correctness |
| (2 additional closed PRs not shown in top-20) | — | — |

**Net effect:** measurable reliability improvements for compression, Windows gateway startup, OpenCode/Ollama provider interop, and release tooling. No new user-facing features shipped today.

## 4. Community Hot Topics

| Rank | Item | Comments / 👍 | Underlying Need |
|---|---|---|---|
| 1 | [Issue #88584](https://github.com/NousResearch/hermes-agent/issues/88584) — "Automated Nous integration is blocked" | 81 💬 / 0 👍 | Process / coordination friction: scheduled Enterkey↔Nous merges keep failing on `cron/jobs.py`; no release branch moved. Community wants automated cross-fork delivery to work. |
| 2 | [Issue #105145](https://github.com/NousResearch/hermes-agent/issues/105145) — "Windows desktop-driven `hermes update` always reports FAILED (exit 8)" | 17 💬 / 0 👍 | Update-channel UX broken on Windows: success but wrong exit code; resolves wrong working directory. P1, already closed as part of this wave. |
| 3 | [Issue #11911](https://github.com/NousResearch/hermes-agent/issues/11911) — "Native Mobile App (iOS & Android) with Voice Calling" | 7 💬 / 2 👍 | Long-term product vision: hands-free voice access to Hermes assistant from phones. Low effort, high impact on adoption. |
| 4 | [Issue #70421](https://github.com/NousResearch/hermes-agent/issues/70421) — "Desktop: show all chats under a project (remove 3-session cap)" | 5 💬 / 7 👍 | Real productivity pain: hidden sessions force drill-in navigation. Highest 👍/💬 ratio today — clear demand. |
| 5 | [Issue #48860](https://github.com/NousResearch/hermes-agent/issues/48860) — "OAuth prompt sanitizer greedy-replaces docs URL → NXDOMAIN" | 5 💬 / 1 👍 | Anti-evasion sanitizer collateral damage: product-name rewrite breaks valid documentation URLs (NXDOMAIN). P1, unfixed. |
| 6 | [Issue #106267](https://github.com/NousResearch/hermes-agent/issues/106267) — "per-tool-scope YOLO mode via `/yolo allow/deny`" | 5 💬 / 0 👍 | Power-user safety control: fine-grained trust, instead of all-or-nothing session bypass. |
| 7 | [Issue #356](https://github.com/NousResearch/hermes-agent/issues/356) — "Acceptance Criteria & Independent Judge for Sub-agent Delegation" (closed today) | 3 💬 / 2 👍 | Quality-gating pattern from OpenPlanter (`IMPLEMENT-THEN-VERIFY`). Closed, but represents a recurring community ask for sub-agent verification. |

**Common thread:** the community is increasingly pushing for **trust boundaries** (per-tool YOLO, sub-agent verification, OAuth sanitization) and **multi-device parity** (mobile, desktop chat list completeness), alongside the ongoing reliability complaints.

## 5. Bugs & Stability

Ranked by severity, fix-PR status noted:

| Severity | Issue | Summary | Fix PR? |
|---|---|---|---|
| **P1** | [#105145](https://github.com/NousResearch/hermes-agent/issues/105145) | Windows `hermes update` always reports FAILED (exit 8) after success | **Closed today** |
| **P1** | [#105629](https://github.com/NousResearch/hermes-agent/issues/105629) | Windows desktop build: electron-builder asar integrity rewrite → rcedit `Unable to commit changes` | None |
| **P1** | [#48860](https://github.com/NousResearch/hermes-agent/issues/48860) | OAuth sanitizer rewrites docs URL → `claude-code.nousresearch.com` NXDOMAIN | None |
| **P2** | [#106909](https://github.com/NousResearch/hermes-agent/issues/106909) | Rootless Docker: iron-proxy binds `127.0.0.1`, unreachable from `host.docker.internal` | None |
| **P2** | [#102958](https://github.com/NousResearch/hermes-agent/issues/102958) | Cron: malformed script path (missing separators) for `--no-agent` jobs in non-default profiles (regression 04/09/2026) | None |
| **P2** | [#79833](https://github.com/NousResearch/hermes-agent/issues/79833) | Desktop: stuck inline embed (X/Twitter card) overlays UI across views | None |
| **P3** | [#94001](https://github.com/NousResearch/hermes-agent/issues/94001) | Desktop status-bar context usage stale after compression, cross-session contamination | None |
| **P3** | [#106292](https://github.com/NousResearch/hermes-agent/issues/106292) | `hermes kanban complete` bypasses `pre_tool_call` hooks → premature root completion | None |
| **P3** | [#106285](https://github.com/NousResearch/hermes-agent/issues/106285) | Windows Desktop window becomes transparent across mixed-DPI displays | None |
| **P3** | [#106359](https://github.com/NousResearch/hermes-agent/issues/106359) | Gateway zombie on Windows: TCP port exhaustion freezes event loop | None |
| **P3** | [#99533](https://github.com/NousResearch/hermes-agent/issues/99533) | Firecrawl `web_extract` flattens 4xx/5xx into successful empty result (no `metadata.statusCode` check) | None |
| **P3** | [#89700](https://github.com/NousResearch/hermes-agent/issues/89700) | Desktop: unpinning a session doesn't stick — shifts to bottom of Pinned | None |
| **P3** | [#45983](https://github.com/NousResearch/hermes-agent/issues/45983) | Chatloop after ~19 turns in skill-heavy orchestrator profiles (bg-review + Compressor collision) | None |

**Stability picture:** 13 distinct bugs filed/active today. **All four P1s except the closed Windows update have no fix PR.** Windows desktop remains the dominant failure surface (5 of 13). Gateway/session eviction correctness is being actively addressed in PRs [#106966](https://github.com/NousResearch/hermes-agent/pull/106966) and [#106964](https://github.com/NousResearch/hermes-agent/pull/106964).

## 6. Feature Requests & Roadmap Signals

| Feature | Issue | Predicted Horizon |
|---|---|---|
| Native iOS/Android mobile app + voice calling | [#11911](https://github.com/NousResearch/hermes-agent/issues/11911) | **Long-term** (1–2 quarters). Heavy infra cost; not on near-term radar. |
| Desktop: remove 3-session preview cap | [#70421](https://github.com/NousResearch/hermes-agent/issues/70421) | **Next minor** (0.21.x / 0.22). Low-risk UX change, strong 👍 signal (7). |
| Per-tool-scope `/yolo allow/deny` | [#106267](https://github.com/NousResearch/hermes-agent/issues/106267) | **Near-term**. Natural extension of existing YOLO plumbing. |
| Slash-command NL resolution against live options (`"switch to grok oauth"` → `/model xai-oauth`) | [#106258](https://github.com/NousResearch/hermes-agent/issues/106258) | **Near-term**. Aligns with broader model-switching UX work. |
| Cron: `start_at` for recurring jobs | [#106908](https://github.com/NousResearch/hermes-agent/issues/106908) | **Near-term**. Eliminates documented unsafe workaround. |
| `feat(voice): Codex OAuth STT/TTS/live voice` | [PR #106640](https://github.com/NousResearch/hermes-agent/pull/106640) | **Next minor**, if merged. |
| Background memory consolidation opt-in + `/memory` policy display | [#106919](https://github.com/NousResearch/hermes-agent/issues/106919), [#106918](https://github.com/NousResearch/hermes-agent/issues/106918) | **Near-term**. Builds directly on #106310. |
| Dynamic workspace bindings to terminal env-provider plugins | [#104163](https://github.com/NousResearch/hermes-agent/issues/104163) | **Medium-term**, requires out-of-tree plugin ecosystem maturity. |
| Computer-use provider factory seam + remote desktop transport | [PR #103653](https://github.com/NousResearch/hermes-agent/pull/103653) | **Medium-term**, foundation work — not a user-facing feature yet. |
| Desktop Fast toggle reframed as priority lane | [#106253](https://github.com/NousResearch/hermes-agent/issues/106253) | **Next minor**. Pure UI/copy fix. |
| `feat(delegate)`: per-parent-session child cap | [PR #59233](https://github.com/NousResearch/hermes-agent/pull/59233) | **Imminent** — closes runaway-spawn path from #52484. |

## 7. User Feedback Summary

**Satisfaction signals:**
- Strong appreciation for fast P1 turnaround on Windows update (Issue #105145 closed same day).
- High 👍 on Desktop session-list expansion (#70421: 7 likes, 5 comments) indicates pent-up demand for a small, obvious UX gap.
- Acceptance of OpenPlanter-style sub-agent verification (#356 closed, 2 likes) — community receptive to quality-gate patterns.

**Pain points (recurring themes):**
1. **Windows is the weakest platform.** Five distinct Windows-specific bugs in 24h (update handoff, electron-builder, DPI transparency, gateway zombie, Kanban worker). Users feel desktop quality lags behind macOS/Linux.
2. **Trust boundaries are inconsistent.** OAuth sanitizer over-fires (#48860), YOLO is all-or-nothing (#106267), Kanban CLI bypasses hooks (#106292). Users want explicit, scoped trust controls.
3. **Session/context state desync.** Status bar stale after compression (#94001), cross-session contamination, slow refresh — users can't trust what the UI says.
4. **CLI friction with slash commands** (#106258): users want NL-style resolution, not exact token typing.
5. **Documentation/URL breakage** from anti-evasion rewrites (#48860): security tooling is breaking legitimate docs links.

**Dissatisfaction:** concentrated around (a) Windows desktop quality and (b) opacity of how the agent decides what counts as "trusted." No community backlash on the closed feature #356 — closure was acceptable.

## 8. Backlog Watch

Items needing **maintainer attention** due to age, severity, or stalled progress:

| Item | Age | Status | Why it needs attention |
|---|---|---|---|
| [Issue #88584](https://github.com/NousResearch/hermes-agent/issues/88584) | 24 days | **Open**, 81 comments | Automated Nous→Enterkey merge blocked on `cron/jobs.py` conflicts; blocks scheduled release delivery. Largest active thread by far — community expects resolution. |
| [PR #59233](https://github.com/NousResearch/hermes-agent/pull/59233) — `fix(delegate): cap total subagent children per parent session` | 2 months | **Open**, P2, blast-moderate | Closes a documented runaway-spawn path (#52484); low-risk guardrail, long review. |
| [PR #56971](https://github.com/NousResearch/hermes-agent/pull/56971) — `fix(mcp): wire bridge approval tools to the gateway` | 2 months | **Open**, P2, needs-decision | Security-boundary fix; MCP bridge currently cannot see gateway approvals. |
| [Issue #45983](https://github.com/NousResearch/hermes-agent/issues/45983) — Chatloop in skill-heavy profiles | ~3 months | **Open**, P3 | bg-review + Compressor collision on 247-skill profiles; only fully reproducible on large homelab profiles. |
| [Issue #42289](https://github.com/NousResearch/hermes-agent/issues/42289) — Windows Kanban worker false 'pid not alive' | ~3 months

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-10

## 1. Today's Overview

IronClaw saw moderate, mostly plumbing-focused activity in the last 24 hours, with **6 PRs updated** (2 merged, 4 still open) and **1 issue** updated (the only open bug). Activity is concentrated in a single internal area — **hosted-MCP provider and extension lifecycle work** — with four of the six PRs (and both merged items) authored by the same contributor (`kirikov`). No releases were tagged, and all updated issues/PRs carry zero reactions or comments, suggesting low external community engagement on these specific items despite steady internal churn. Overall, the project shows healthy maintenance velocity but a narrow topical focus and an absence of external contributor signal.

## 2. Releases

*No new releases in the last 24 hours.* Nothing to report.

## 3. Project Progress

Two PRs were closed/merged:

- **#8088 — feat(common): distinguish a set-but-empty env var from an unset one** ([link](https://github.com/nearai/ironclaw/pull/8088))
  - Fixes `env_or_override` collapsing `FOO=` and absent `FOO` into the same case. Operators setting deployment-meaningful variables (e.g., endpoint overrides) will no longer have a typo silently fall back to defaults. Author: `kirikov`.

- **#8089 — feat(extensions): bundle the agent-market hosted-MCP provider package** ([link](https://github.com/nearai/ironclaw/pull/8089))
  - Adds a first-party bundled package for the `agent.market` hosted-MCP provider in the same shape as other bundled providers, with a manifest, per-tool input schemas, and static tool declarations as a pre-discovery fallback. Author: `kirikov`. Note: the summary states it "reopens" an earlier thread, indicating this is a re-submission of prior work.

Net effect: small but real reliability gains in env handling and incremental expansion of the bundled MCP catalog.

## 4. Community Hot Topics

By GitHub-native engagement metrics (comments, reactions), **no items in today's update carry any comments or 👍 reactions**. Every entry shows 0 comments and 0 thumbs-up, so "hot" must be inferred from topic clustering rather than user signals:

- **Hosted-MCP provider infrastructure** is the dominant theme:
  - #8084 [open] — SEP-414 caller attribution ([link](https://github.com/nearai/ironclaw/pull/8084))
  - #8090 [open] — catalog keyed per caller, not per extension ([link](https://github.com/nearai/ironclaw/pull/8090))
  - #8089 [merged] — bundle agent.market provider ([link](https://github.com/nearai/ironclaw/pull/8089))
- **Extension lifecycle / packaging consistency**: #8085 [open] ([link](https://github.com/nearai/ironclaw/pull/8085))
- **Channel UX (Telegram)**: #8072 [open] ([link](https://github.com/nearai/ironclaw/pull/8072))

**Underlying need:** the bundled-MCP model is being hardened against multi-tenant and multi-caller confusion (catalog contention, retry attribution, operator-installed package parity). The Telegram PR is the only user-facing change today.

## 5. Bugs & Stability

| # | Title | Status | Severity | Fix PR? |
|---|-------|--------|----------|---------|
| [#8091](https://github.com/nearai/ironclaw/issues/8091) | bug(webchat-v2): Enter sends the message while confirming IME composition | OPEN, 0 comments | Low–Medium (UX, recurrence of prior behavior) | None linked |

**Notes on #8091:** WebChat v2 fires the send action on Enter even when the keystroke is meant to finalize an IME candidate, sending an unfinished message. The reporter flags this as a recurrence of a previously fixed user-visible behavior. No fix PR has been opened in the last 24h. Severity is modest (data corruption unlikely; minor annoyance and accidental send), but it's the only open bug surfacing today and warrants a maintainer response.

No crashes, regressions, or data-loss reports were filed in the window.

## 6. Feature Requests & Roadmap Signals

No explicit "feature request" issues were opened today. From open PRs, the following forward signals are visible:

- **#8084 — SEP-414 caller attribution on outbound hosted-MCP calls** ([link](https://github.com/nearai/ironclaw/pull/8084)): aligns IronClaw with an emerging MCP spec extension so hosted servers can correlate calls to conversations and detect retries. Likely to ship alongside #8090 if both review clean.
- **#8090 — per-caller hosted-MCP catalog keying** ([link](https://github.com/nearai/ironclaw/pull/8090)): removes a multi-user catalog contention bug. Strong candidate for next release.
- **#8072 — Telegram Bot API command menu registration** ([link](https://github.com/nearai/ironclaw/pull/8072)): registers `/model`, `/status`, `/new`, `/stop`, `/interrupt` on activation; clears on deactivation. User-visible improvement to Telegram UX.

**Prediction:** the next tagged release, when it comes, will plausibly include #8084, #8090, and #8088 as a hosted-MCP / common-utility batch, with #8072 either included or held for a follow-up channel-UX release. #8085 (extension packaging consistency) depends on a cross-module agreement between constructor and validator and may need additional review.

## 7. User Feedback Summary

External user feedback volume in the last 24h is **effectively zero**: no comments, no reactions on any updated item. The only user-originated content is the **#8091** bug report from `supermomonga`, which surfaces a concrete WebChat v2 UX pain point (IME + Enter collision) and notes it is a **recurrence** of an earlier fix. This is a soft signal of dissatisfaction with WebChat v2's input handling robustness.

Implicit needs inferred from open work:
- Multi-tenant correctness in hosted MCP deployments (operators hosting services to multiple users).
- Clearer distinction between "configured" and "default" in deployment env vars.
- Discoverable command menus on chat platforms (Telegram) rather than memorized slash commands.

## 8. Backlog Watch

Items that may need maintainer attention due to lack of engagement, ambiguity, or reviewer dependency:

- **#8091 (issue)** — open bug with 0 comments since creation; reporter explicitly notes it is a regression. **Needs a maintainer triage and a confirming/rejecting PR**, especially given the prior-fix reference.
- **#8072 (PR)** — labeled `[size: L, risk: low, scope: docs, scope: dependencies, contributor: experienced]`; last updated 2026-09-09 but still open. Large but low-risk docs/dependency work that is unlikely to be controversial; could be merged with one maintainer pass.
- **#8085 (PR)** — addresses an inconsistency between two extension-manifest functions; reviewer should confirm which side is canonical before merge.
- **#8084 (PR)** — references an emerging MCP spec (SEP-414); would benefit from a maintainer confirming alignment before merge, given spec-status uncertainty.
- **#8090 (PR)** — correctness fix with clear motivation; low-risk and a natural pair with #8084 for a single review pass.
- **Contributor concentration risk:** 4 of 6 PRs and both merges today are from `kirikov`. No external contributor signals (comments, reactions, reviews) were captured in this window. Maintainers may want to track bus-factor exposure for the hosted-MCP and extension layers.

---

*Data window: last 24h ending 2026-09-10. Generated from public GitHub activity for `nearai/ironclaw`.*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-10

## 1. Today's Overview

QwenPaw shows **moderate-to-high activity** with 22 issues (11 open / 11 closed) and 34 pull requests (26 open / 8 merged or closed) updated in the last 24 hours, despite no new release. The pattern strongly reflects **post-release stabilization for v2.2.0**: a majority of closed items target regressions and UX issues introduced by the recent version bump (modal backdrops, FTS corruption, console streaming, MCP timeout). At the same time, several ambitious feature PRs (Advisor Mode, QwenPaw Mobile, QwenPaw-Data 0.3, ADBPG/PowerContext pluginization) continue to mature in the review pipeline, indicating sustained roadmap momentum. Overall project health is good: bug reports are being acknowledged and triaged quickly, with at least three open bugs already paired with fix PRs.

## 2. Releases

**No new releases in the last 24 hours.** The most recent version referenced across issues and PRs remains **v2.2.0** (including pre-releases `2.2.0b7`), with the legacy **v2.1.1b1** line still cited by Windows Desktop users.

## 3. Project Progress

Eight pull requests were merged or closed in the last 24 hours, advancing several themes:

| PR | Title | Impact |
|---|---|---|
| [#7577](https://github.com/agentscope-ai/QwenPaw/pull/7577) (closed) | fix(console): enqueue follow-up messages when chat task is running | Resolves a long-standing UX friction: follow-up text/file messages sent while a chat is running now queue instead of returning HTTP 409. |
| [#7649](https://github.com/agentscope-ai/QwenPaw/pull/7649) (closed) | feat(mcp): support configurable timeout for HTTP/SSE clients | Adds an optional `http_timeout` to `MCPClientConfig` and propagates it through the DriverCard and handlers; closes the long-standing issue [#3997](https://github.com/agentscope-ai/QwenPaw/issues/3997). |
| [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609) (closed) | feat(skills): expose versions and validate declared dependencies | Implements skill versioning and dependency validation (addresses the request in [#7557](https://github.com/agentscope-ai/QwenPaw/issues/7557)). |
| Other closed | smaller fixes | Likely routine cleanups and dependency updates. |

**Significant open PRs progressing in review:**
- [#7655](https://github.com/agentscope-ai/QwenPaw/pull/7655) — FTS corruption + retention cleanup (fixes [#7596](https://github.com/agentscope-ai/QwenPaw/issues/7596))
- [#7639](https://github.com/agentscope-ai/QwenPaw/pull/7639) — Performance fix avoiding repeated history integrity scans
- [#7652](https://github.com/agentscope-ai/QwenPaw/pull/7652) — Preserve provider-resolved context windows to prevent premature compaction
- [#7641](https://github.com/agentscope-ai/QwenPaw/pull/7641) — Retry and verify desktop artifact downloads (release hardening)
- [#7647](https://github.com/agentscope-ai/QwenPaw/pull/7647) — Support Base64 data URLs in outbound media across channels
- [#7616](https://github.com/agentscope-ai/QwenPaw/pull/7616) — Refactor: migrate ADBPG and PowerContext memory backends to plugins
- [#7569](https://github.com/agentscope-ai/QwenPaw/pull/7569) — Advisor Mode (dual-model loop mode)
- [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) — QwenPaw native mobile experience (Expo/React Native)
- [#7637](https://github.com/agentscope-ai/QwenPaw/pull/7637) — QwenPaw-Data 0.3 integration
- [#7653](https://github.com/agentscope-ai/QwenPaw/pull/7653) — +2,475 backend pytest cases (+5.02pp coverage)

## 4. Community Hot Topics

By comment count (last 24h):

| Rank | Item | Comments | Why it matters |
|---|---|---|---|
| 1 | [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) — Deploy page UX (rerbin) | 8 | Repeated pain point about mobile/web UI ergonomics on the deployment page (button placement, accidental stop-run). |
| 2 | [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) — Tool-returned binary as bare base64 (CLOSED) | 7 | Cross-cutting schema contract issue: tool results carrying base64 images/PDFs were rejected with HTTP 400; affects any multimodal agent pipeline. |
| 3 | [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) — Sync calls freeze the event loop (Windows) | 6 | A high-severity regression in Desktop 2.1.1b1: 118–135s startup stalls, ~126s message latency. |
| 4 | [#7228](https://github.com/agentscope-ai/QwenPaw/issues/7228) — App market "Install" button shown for installed apps (CLOSED) | 6 | A visual bug undermining trust in the in-app marketplace. |
| 5 | [#5329](https://github.com/agentscope-ai/QwenPaw/issues/5329) — Sidebar agent switcher in compact mode (CLOSED) | 5 | Mobile browser users want sidebar control in compact mode. |
| 6 | [#6460](https://github.com/agentscope-ai/QwenPaw/issues/6460) — High CPU in Edge+Wayland (CLOSED) | 5 | Renderer-related: large result sets or WebSocket push appear to spike CPU on Edge under Wayland. |
| 7 | [#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642) — Console streaming broken in Chrome | 4 | Browser-specific streaming regression that "just works" in Safari on the same session. |

**Underlying needs** the discussion surfaces: (a) **mobile-first ergonomics** — several of the top complaints are mobile users; (b) **multimodal/tool-result schema stability**; (c) **runtime responsiveness on Windows**; (d) **cross-browser parity** for the new Console UI.

## 5. Bugs & Stability

Ranked by likely user impact:

| Severity | Issue | Summary | Fix PR |
|---|---|---|---|
| **High** | [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) | Sync calls freeze QwenPaw Desktop 2.1.1b1 event loop for 118–135s on startup and ~126s on send; timeout never fires. | None linked yet |
| **High** | [#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633) | llama.cpp 5-digit build numbers fail version parsing; QwenPaw silently rolls the user-upgraded runtime back to a 4-digit snapshot within ~40 min, with no warning. | None linked yet |
| **High** | [#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642) | Console streaming renders nothing until turn completes **only in Chrome** (Safari fine). Affects all Chrome users on v2.2.0. | None linked yet |
| **High** | [#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628) | Context compaction can exceed the complete provider request budget and fail mid-turn on v2.2.0b7. | None linked yet (related direction in [#7652](https://github.com/agentscope-ai/QwenPaw/pull/7652) for context window preservation) |
| **Medium** | [#7596](https://github.com/agentscope-ai/QwenPaw/issues/7596) — *closed* | `history.db` FTS corruption undetected by integrity check; retention purge fails silently. | [#7655](https://github.com/agentscope-ai/QwenPaw/pull/7655) open |
| **Medium** | [#7622](https://github.com/agentscope-ai/QwenPaw/issues/7622) — *closed* | v2.2.0 modal backdrop "transparent"; background content shows through (official style issue, not plugin-caused). | None linked |
| **Medium** | [#7618](https://github.com/agentscope-ai/QwenPaw/issues/7618) — *closed* | QQ Channel: bot works in DMs but is silent in group chats. | None linked |
| **Low–Medium** | [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) — *closed* | Tool-returned image/PDF as bare base64 (`type:"data"`) triggers HTTP 400. | None linked |
| **Low** | [#5688](https://github.com/agentscope-ai/QwenPaw/issues/5688) — *closed* | CSS prefix mismatch `ant-` vs `qwenpaw-` (question about styling correctness). | None linked |
| **Low** | [#6460](https://github.com/agentscope-ai/QwenPaw/issues/6460) — *closed* | Edge+Wayland single-tab CPU spike. | None linked |
| **Low** | [#7228](https://github.com/agentscope-ai/QwenPaw/issues/7228) — *closed* | App-market "Install" hover state wrong for installed apps. | None linked |
| **Low** | [#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601) — *closed* | v2.2.0 lost manual path-edit field in directory picker (regression from 2.1.0). | None linked |

**Observations:** Three high-severity bugs (llama.cpp rollback, Chrome streaming, context budget) currently have **no linked fix PRs**, which is the main area of risk for the next patch release. Conversely, the FTS corruption and history purge path has a high-quality fix in flight.

## 6. Feature Requests & Roadmap Signals

User-submitted requests from the last 24 hours (and adjacent recent ones):

| Request | Source | Likelihood in next minor |
|---|---|---|
| **ntfy channel support** (push notifications, self-hosted) | [#7657](https://github.com/agentscope-ai/QwenPaw/issues/7657) — working implementation offered | **High** — author signals a ready PR; fits self-hosted audience |
| **Custom page title for Console tabs** (multi-project users) | [#7648](https://github.com/agentscope-ai/QwenPaw/issues/7648) | **High** — trivial, addresses clear tab-management pain |
| **Default agent parameter editing in UI** | [#7644](https://github.com/agentscope-ai/QwenPaw/issues/7644) | **Medium-High** — common admin pain point |
| **Traffic-light status indicator** (long-running task awareness) | [#7600](https://github.com/agentscope-ai/QwenPaw/issues/7600) | **Medium** — could ship as a small UX improvement |
| **Durable cross-session memory** (MemCode integration) | [#7656](https://github.com/agentscope-ai/QwenPaw/issues/7656) | **Low-Medium** — external integration proposal |
| **Channel request metadata → MCP tools** (e.g. QQ ID, phone) | [#7650](https://github.com/agentscope-ai/QwenPaw/issues/7650) | **Medium** — reasonable developer-experience ask |
| **QwenPaw Mobile native client** (Expo/RN) | [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) | **Medium** — PR is `DO NOT MERGE` draft but signals product direction |
| **Skills versioning / metadata** | [#7557](https://github.com/agentscope-ai/QwenPaw/issues/7557) / [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609) | **Already landed** (PR closed) |
| **Configurable MCP HTTP/SSE timeout** | [#3997](https://github.com/agentscope-ai/QwenPaw/issues/3997) / [#7649](https://github.com/agentscope-ai/QwenPaw/pull/7649) | **Already landed** (PR closed) |
| **Scroll-back pagination for compacted chats** | [#7542](https://github.com/agentscope-ai/QwenPaw/pull/7542) (first-time contributor) | **Medium** — addresses "silent mid-conversation" UX bug |
| **Deploy-page UX** (mobile button placement, open vs. stop ordering) | [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) | **Medium** — repeated asks suggest this is on maintainers' radar |
| **QQ Channel group chat support** | [#7618](https://github.com/agentscope-ai/QwenPaw/issues/7618) — *closed* | Status post-fix unclear; re-open risk |

**Roadmap signal:** the three areas with the most converging signals are (a) **mobile / mobile-browser UX**, (b) **MCP ecosystem maturation** (timeout, structuredContent, channel metadata), and (c) **long-running task observability** (traffic light, context budget).

## 7. User Feedback Summary

**Pain points reported today:**

- **Mobile is consistently harder to use than desktop.** Multiple issues ([#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177), [#5329](https://github.com/agentscope-ai/QwenPaw/issues/5329), [#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601)) complain that key controls are unreachable on phone-sized screens, the directory picker no longer supports manual entry, and modal actions can be triggered by accident. Users are clearly using mobile browsers as a primary interface and feel second-class.
- **v2.2.0 regressions are the loudest theme.** Modal transparency ([#7622](https://github.com/agentscope-ai/QwenPaw/issues/7622)), broken Chrome streaming ([#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642)), lost directory picker field ([#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601)) — each closed quickly, but their accumulation suggests a pre-release QA gap.
- **Power-user transparency concerns.** [#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633) (silent runtime rollback) and [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) (event-loop freeze with no timeout feedback) both describe scenarios where the application hides failure from the user — a recurring trust issue.
- **Multi-project workflows are underserved.** [#7648](https://github.com/agentscope-ai/QwenPaw/issues/7648) (custom titles) and [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) (deploy page) come from users running 7–8+ QwenPaw panels in parallel; they need identity signals the UI does not provide.

**Positive signals:**

- The MCP-timeout and Skills-versioning feature requests were closed within 24h, indicating maintainers are responsive to well-scoped proposals.
- A first-time contributor ([PR #7577](https://github.com/agentscope-ai/QwenPaw/pull/7577)) is shipping meaningful Console UX fixes — community onboarding appears healthy.

## 8. Backlog Watch

Items that are either long-unanswered, high-impact, or pending maintainer attention:

| Item | Age | Concern |
|---|---|---|
| [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) — Desktop event-loop freeze | ~2 weeks | High-severity Windows regression, no fix PR yet. |
| [#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633) — llama.cpp silent rollback | ~2 days | Data-loss-class UX bug; needs explicit "do not auto-update this binary" toggle. |
| [#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628) — Context compaction exceeds budget | ~2 days | Can fail active turns mid-conversation; closely related to [#7652](https://github.com/agentscope-ai/QwenPaw/pull/7652). |
| [#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642) — Chrome-only streaming regression | ~1 day | All-Chrome users affected on the latest version. |
| [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) — Deploy page UX | ~3 weeks | 8 comments, no implementation yet despite clear consensus. |
| [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) — QwenPaw Mobile native | ~2 weeks | Marked `DO NOT MERGE`; needs maintainer product decision (is mobile a 2026 priority?). |
| [#6460](https://github.com

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-10

## 1. Today's Overview

ZeroClaw shows **high design-intensity activity but no shipped output**: 33 issues and 49 PRs remain open with only 1 merged PR and 3 closed issues in the last 24 hours, and no new releases were tagged. The active workstream is dominated by long-form RFCs and architecture trackers (notably NiuBlibing's conversation-surfaces, session-history, and WASM-plugin proposals) plus a cluster of P1/P2 bugs around the Anthropic provider's cost accounting, ZeroCode ACP transcripts, and a recurring CI security alert. Activity is healthy and engaged, but the open/merged ratio suggests the project is in a **proposal-heavy, throughput-constrained** phase rather than a release cycle.

## 2. Releases

*No new releases in the last 24 hours.* The most recent shipped work is via merged issues (ZeroCode multi-session tracking batch) rather than a tagged version.

## 3. Project Progress

Three ZeroCode issues tied to the multi-session sidebar initiative (`#9727`) closed today, marking a concrete advancement in the TUI/agent sidebar work:

- [#9729](https://github.com/zeroclaw-labs/zeroclaw/issues/9729) — Track multiple concurrent live sessions per chat pane (P2, accepted, size:XL)
- [#9730](https://github.com/zeroclaw-labs/zeroclaw/issues/9730) — Agent sidebar with status dots, add-picker, click-to-switch (P2, accepted)
- [#9731](https://github.com/zeroclaw-labs/zeroclaw/issues/9731) — Move Quickstart from mode bar into the sidebar (P2, accepted)

Only one PR merged/closed in the window; no PR landed with merged status today, indicating review friction on the long-pending security, ACP, and provider-side change sets.

## 4. Community Hot Topics

The conversation is dominated by architecture RFCs in their revision cycles:

- [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) — **RFC: Runtime-owned conversation sessions and transport surface adapters (Rev 5)** — 36 comments. Highest-engagement thread. Underlying need: clean separation between runtime-owned session state and transport adapters so channels (Telegram, WhatsApp, ACP, web) can plug in without leaking session semantics.
- [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) — **RFC: Unified file and attachment architecture for conversation surfaces (Rev 10)** — 29 comments. Repeated revision cycles indicate the maintainers are still reconciling attachment semantics across channels.
- [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) — **RFC: Granular sandbox policy — filesystem restrictions** — 28 comments, in-progress. Community wants a single source of truth between application-layer `SecurityPolicy` and OS-level sandboxes (Bubblewrap, Landlock, Seatbelt).
- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — **Maintainer decision queue for RFCs and design issues** — 15 comments. A coordination tracker itself; meta-discussion about process.
- [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) — **RFC: Composable WASM plugin runtime architecture** — 12 comments. Signal that the team is investing in a typed, replaceable provider/plugin surface.

The pattern: **maintainer bandwidth on long-running RFC review is the bottleneck**, not ideation volume.

## 5. Bugs & Stability

**P1 (highest severity, open today):**

- [#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816) — Anthropic provider reports `$0.00` spend, so daily/monthly budget caps can never fire. **Accepted, in-progress.** Silent budget-cap failure is a real safety issue for cost-controlled deployments. *No fix PR linked in the open list today.*
- [#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697) — ZeroCode ACP transcript drops assistant text emitted before a tool call; only post-last-tool text renders. P1, high risk. **No fix PR yet.**

**P2 (notable):**

- [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — Telegram media groups batched as N separate turns instead of one multimodal turn (in-progress).
- [#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) — `[media attachment]` placeholder leaks to users on non-vision models (accepted).
- [#10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690) — Integrations "Configure" link slugifies display name (Z.AI → `z-ai`) instead of family key (accepted).
- [#10720](https://github.com/zeroclaw-labs/zeroclaw/issues/10720) — ZeroCode v0.8.5 renders agent reply twice (in-progress).
- [#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721) — `knowledge.db_path` tilde expansion is a global replace, not a home prefix — silently drops the knowledge tool.
- [#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) — `zeroclaw service logs` prints nothing on macOS/Windows/OpenRC; platform regression in daemon log selection.
- [#10728](https://github.com/zeroclaw-labs/zeroclaw/issues/10728) — **CI: npm audit failed (js-yaml high severity)**. Fix landed immediately: [#10729](https://github.com/zeroclaw-labs/zeroclaw/pull/10729) bumps `js-yaml` to 4.3.2.

**PRs fixing related bugs (open, awaiting merge):**

- [#10732](https://github.com/zeroclaw-labs/zeroclaw/pull/10732) — Fixes #10731 (daemon log selection by content, not existence).
- [#10733](https://github.com/zeroclaw-labs/zeroclaw/pull/10733) — Voice replies opening with expressive audio tag (Telegram/WhatsApp).
- [#10442](https://github.com/zeroclaw-labs/zeroclaw/pull/10442) — Keeps OpenRouter streams alive (custom client, no reqwest timeout).
- [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) — Honors allowed roots for git operations.
- [#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391) — Bounded delegate filesystem tools respect target workspace.

## 6. Feature Requests & Roadmap Signals

Strong demand for **provider cost/observability maturity** and **OpenAI Responses feature parity**:

- [#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663) — Configurable 1-hour prompt-cache TTL for Anthropic cache markers. Aligns with [#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662) (OAuth system-prefix cache marker below Anthropic's minimum) and [#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699) (cache-write pricing missing from cost ledger). **Prediction:** Anthropic cache work will land as a bundle in the next release — three related issues, two touching the same module.
- [#10706](https://github.com/zeroclaw-labs/zeroclaw/issues/10706), [#10708](https://github.com/zeroclaw-labs/zeroclaw/issues/10708), [#10704](https://github.com/zeroclaw-labs/zeroclaw/issues/10704) — A coordinated set from IftekharUddin: opaque reasoning replay, active-response steering over WebSockets, async function tools, and bounded programmatic tool calling for OpenAI Responses. **Prediction:** These will be reviewed together; expect either a single PR or a sequenced rollout.
- [#8763](https://github.com/zeroclaw-labs/zeroclaw/issues/8763) — Subagent activity and expandable tool results in ZeroCode. Accepted, complements the just-closed multi-session work.
- [#10277](https://github.com/zeroclaw-labs/zeroclaw/issues/10277) — Pin published `zerorelay` image base tags by digest. Supply-chain hygiene; small change but security-motivated.

Long-horizon signals (likely **post-0.9**): WASM plugin runtime (#10076), append-only session event history (#10526), and the unified conversation/attachment architecture (#9488, #9487).

## 7. User Feedback Summary

**Pain points expressed by issue authors and reporters:**

- *Cost visibility broken on Anthropic* ([#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)) — Operators have no working budget cap, eroding trust in `zeroclaw status` as a source of truth.
- *ZeroCode ACP transcript loses pre-tool text* ([#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697)) and *duplicate render* ([#10720](https://github.com/zeroclaw-labs/zeroclaw/issues/10720)) — v0.8.5 is shipping with visible regressions in the flagship TUI; reported within 48h of release, indicating active user testing.
- *Telegram voice/elevenlabs collisions* and *media batching* — Power-user channel flows (audio tags, multi-image) are not handled.
- *Cross-platform daemon log inspection* ([#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731)) — macOS/Windows users effectively have no daemon log access today.
- *Knowledge tool silently disabled by tilde-expansion bug* ([#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721)) — High-impact "silent failure" pattern that user joalvaradon flagged.

No explicit satisfaction/dissatisfaction threads surfaced in the 24h window beyond technical reports; the community signal is **frustration with execution speed on accepted work** (multiple "accepted, in-progress" issues have been open for months, e.g. #6996 from May, #5514 from April).

## 8. Backlog Watch

Items that have been open longest yet remain material and lack a merged fix:

- [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — Telegram media batching bug, opened **2026-04-08** (~5 months open). Status: in-progress, no merged PR in the 24h window.
- [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) — Granular sandbox policy RFC, opened **2026-05-28**. High-risk security architecture; in-progress but no landing PR.
- [#8546](https://github.com/zeroclaw-labs/zeroclaw/pull/8546) — Localize CLI status fragments. Refreshed by maintainer Audacity88, but needs maintainer review.
- [#8966](https://github.com/zeroclaw-labs/zeroclaw/pull/8966) — Live provider identity on usage events; opened 2026-07-11, large XL, needs author action.
- [#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324) — A2A outbound client, opened 2026-07-24, needs author action, XL.
- [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) — Context compaction to model-window ratio, opened 2026-07-29, needs author action.
- [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) — Token accounting on history-trim events, **blocked / do-not-merge**.
- [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) — ACP interrupted-turn persistence, needs maintainer review, high risk.
- [#10214](https://github.com/zeroclaw-labs/zeroclaw/pull/10214) — Log entry-count rotation, needs author action, high risk.
- [#10381](https://github.com/zeroclaw-labs/zeroclaw/pull/10381) — Resolve host launchers before workspace cwd (security), needs maintainer review, XL.
- [#10358](https://github.com/zeroclaw-labs/zeroclaw/pull/10358) — Mattermost approval prompts, blocked / do-not-merge.
- [#10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430) — Gemini speech-to-speech broker (PR1), needs author action, XL.
- [#10405](https://github.com/zeroclaw-labs/zeroclaw/issues/10405) — Implementation batch tracker for #9998 (session-scoped prompt attachments). Accepted but execution home has not produced merges.

**Pattern:** The queue is full of **large (XL) security-and-architecture PRs that need author or maintainer review** — not abandoned work, but blocked on human bandwidth. This is the project's primary health risk: design throughput outpaces review throughput.

---

*Digest generated 2026-09-10 from GitHub data covering the preceding 24 hours. All counts and links reference items active in the observation window.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*