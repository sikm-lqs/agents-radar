# OpenClaw Ecosystem Digest 2026-09-09

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-09 11:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-09

## 1. Today's Overview

OpenClaw saw an exceptionally high activity day with **500 issues updated (283 open, 217 closed)**, **500 PRs updated (286 open, 214 merged/closed)**, and a new release (`v2026.9.3`). The release focus on safer updates and the unusually high close ratio (~43% issues, ~43% PRs) suggests maintainers are running an aggressive triage sweep — likely a stabilization push after the 2026.9.x regressions flagged by users. The dominant themes are: (a) Codex/OAuth provider reliability, (b) update/install path brittleness across Windows, npm, and core/plugin skew, (c) multi-agent and embedded runtime bookkeeping bugs, and (d) memory subsystem index/recall regressions. A non-trivial share of issues carry P0/P1 priority with security or data-loss impact tags, indicating project health is under stress but actively defended.

---

## 2. Releases

### v2026.9.3 — Safer Updates
- **Highlights**: Core and plugin changes are now rehearsed in an isolated candidate state before activation; supports eligible migrations from 2026.9.2; recovers abandoned update records without stopping a healthy Gateway.
- **References**: #138839, #141109, #141175, #1415xx (partial in snippet).
- **Migration note**: Operators on 2026.9.2 should be eligible for the candidate-state rehearsal automatically. Windows de-DE installations specifically flagged as still leaving Doctor maintenance blocked (see #136203) may need additional manual steps.
- **Risk**: Improves safety of core/plugin version skew issues (e.g., #135776) but does not directly fix them.

---

## 3. Project Progress

**Merged/closed activity (highlights from PR list):**

| PR | Title | Impact |
|---|---|---|
| [#143063](https://github.com/openclaw/openclaw/pull/143063) | refactor(build): simplify package import path resolution | Codebase health |
| [#143059](https://github.com/openclaw/openclaw/pull/143059) | refactor(tests): remove duplicate warm chat metadata scenario | Test cleanup |

**Advanced features / fixes via ready-for-maintainer PRs (open but mature):**
- [#142933](https://github.com/openclaw/openclaw/pull/142933) — **feat(auth): import declared credentials during provider login** (XL, codex/openai, P2; ready for review). Reuses existing Codex keys during API-key login — directly addresses repeated re-paste friction.
- [#143006](https://github.com/openclaw/openclaw/pull/143006) — **fix(discord): restore OpenClaw delegation from guild messages** (P1, ready). Closes guild-message delegation failures (related #142922).
- [#143060](https://github.com/openclaw/openclaw/pull/143060) — **fix(agents): keep prepared music jobs alive through provider cleanup** (XL, P2, ready). Resolves music tool resource leaks.
- [#142668](https://github.com/openclaw/openclaw/pull/142668) — **feat(doctor): diagnose Tailscale mobile pairing readiness** (XL, P2, ready). Closes #142531 — operator UX win for mobile deployments.
- [#142626](https://github.com/openclaw/openclaw/pull/142626) — **fix(imessage): restore feedback after bridge recovery** (P2, automerge armed). Closes #142603.
- [#142810](https://github.com/openclaw/openclaw/pull/142810) — **fix(android): restore completed tool activity in chat** (XL, P2, screenshot proof). Closes #142805 — Android/Web parity.
- [#141570](https://github.com/openclaw/openclaw/pull/141570) — **fix(ui): reduce repeated session-list reads during sustained activity** (M, P2, ready). Performance fix.
- [#142693](https://github.com/openclaw/openclaw/pull/142693) — **fix: continue memory recall after optional trigger lookup times out** (S, P2). Closes #142479.

**Notable feature additions:**
- [#143068](https://github.com/openclaw/openclaw/pull/143068) and [#143069](https://github.com/openclaw/openclaw/pull/143069) — **GPT Image 2.5 (Flare/Sunburst) variants** added to OpenAI provider and fal integration.
- [#142740](https://github.com/openclaw/openclaw/pull/142740) — **feat(dictation): standalone OpenAI-compatible STT add-on** (extracted from #142706). Opt-in STT decoupled from realtime Talk.
- [#88504](https://github.com/openclaw/openclaw/pull/88504) — **feat(memory): add multi-slot memory role architecture** (XL, P2, showcase). Substantively rewrites the single-owner memory slot to support factual recall / auto-capture / compaction responsibilities independently.

---

## 4. Community Hot Topics (most commented)

| # | Title | Comments | Analysis |
|---|---|---|---|
| [#135111](https://github.com/openclaw/openclaw/issues/135111) | Intermittent "Provider completed tool call with malformed JSON arguments" on v2026.8.1 (claude-sonnet-5) | 23 | **CLOSED.** A long-running regression thread — interest in *why* it closed without a public root-cause note is high; needs a follow-up postmortem or it will keep recurring on user trust. |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | OpenClaw leaks unreaped hook/tool child processes → zombie accumulation | 16 | **OPEN, P1.** Long-term memory and runtime-degradation bug; no linked fix PR despite age (June). Underlying need: reliable process supervision primitives in agent/hook execution. |
| [#43367](https://github.com/openclaw/openclaw/issues/43367) | Multi-agent orchestration unstable: concurrent add/config overwrites, session-lock failures | 14 | **OPEN, P1.** Core multi-agent reliability. Linked PR exists (clawsweeper:linked-pr-open). Underlying need: first-class concurrency model for `agents add` and detached work. |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | Synchronous agent persistence blocks Gateway event loop at scale | 14 | **OPEN, P1.** Already partially repaired (#140231, #138984) — meaningful progress, but still cited as top concern. Need: async persistence path. |
| [#137927](https://github.com/openclaw/openclaw/issues/137927) | Internal context block leaks into visible Telegram text | 13 | **CLOSED.** Security-adjacent (internal-scaffolding leak). Need: regression tests asserting internal blocks never reach outbound. |
| [#85251](https://github.com/openclaw/openclaw/issues/85251) | Codex app-server emits turn/started then silent → wedges embedded run | 13 | **OPEN, P1.** Chronic stuck-session issue; "needs-product-decision" tag suggests it requires runtime behavior change. |
| [#41201](https://github.com/openclaw/openclaw/issues/41201) | Control UI Avatar not displaying (broken image) | 12 | **OPEN, P2 regression.** Long-standing UX regression. |

**Underlying community need:** *reliability and predictability* dominate. Five of the top seven are reliability regressions tied to a specific release boundary (8.1 / 8.2 / 9.2). Users want either fewer breaking release surfaces or better guardrails when upgrading.

---

## 5. Bugs & Stability (today's reported bugs, ranked by severity)

### P0 — Release blockers / security boundary
- [#89278](https://github.com/openclaw/openclaw/issues/89278) — Codex OAuth refresh succeeds but cron/heartbeat fail with 10s auth refresh timeout. Tagged `ux-release-blocker`. Linked PR open.
- [#136203](https://github.com/openclaw/openclaw/issues/136203) — Windows de-DE 2026.8.2 upgrade leaves Doctor maintenance blocked and legacy workspace state behind. `ux-release-blocker`.
- [#115642](https://github.com/openclaw/openclaw/issues/115642) — Billing cooldown outlives outage on subscription auth (5h fixed window). Needs probe-based recovery + manual reset. `ux-release-blocker`.
- [#141617](https://github.com/openclaw/openclaw/issues/141617) — 2026.9.2 npm update remains stuck at requested/running after supported repair. **No fix PR linked.**

### P1 — High-impact regressions
- [#142037](https://github.com/openclaw/openclaw/issues/142037) — Embedded runtime records explicit-route message-tool replies as "mute" on v2026.9.2 → Slack top-level threads misroute. **No fix PR.**
- [#141252](https://github.com/openclaw/openclaw/issues/141252) — 2026.9.2 regression: reply runs fail with "Reply operation has no active tool authority snapshot". Fallback chain misfires. **No fix PR.**
- [#135704](https://github.com/openclaw/openclaw/issues/135704) — iMessage reflections with reply_to_guid bypass echo cache. **No fix PR.**
- [#140971](https://github.com/openclaw/openclaw/issues/140971) — All Feishu plugin tools silently dropped in message-driven runs (regression 2026.7→2026.8). **No fix PR.**
- [#138342](https://github.com/openclaw/openclaw/issues/138342) — Official Discord plugin rejected by openKeyedStore trust check in 2026.9.1. **No fix PR.**
- [#142336](https://github.com/openclaw/openclaw/issues/142336) — Core `/dashboard` shadows Telegram Mini App launcher (2026.9.2+). **No fix PR.**
- [#140455](https://github.com/openclaw/openclaw/issues/140455) — google-meet 2026.9.2: agent voice broken (circular-JSON in-call crash). **No fix PR.**
- [#127148](https://github.com/openclaw/openclaw/issues/127148) — Codex sessions.compact acquires second app-server, hits active-writer conflict. **No fix PR.**
- [#125570](https://github.com/openclaw/openclaw/issues/125570) — Skill Workshop update apply overwrites live skill description, silently breaks skill routing. **No fix PR.**
- [#136311](https://github.com/openclaw/openclaw/issues/136311) — memory-core: Gateway reacquires reindex lock on every start → 19 GB orphaned temp DBs. **No fix PR.**
- [#112160](https://github.com/openclaw/openclaw/issues/112160) — SSH sandbox does not stage inbound media into existing remote workspace. **No fix PR.**
- [#94716](https://github.com/openclaw/openclaw/issues/94716) — Anthropic claude-cli provider sends stale user-agent → bearer auth fails. **No fix PR.**
- [#126906](https://github.com/openclaw/openclaw/issues/126906) — Denying write tool silently disables memory persistence; agent reports success anyway. Security/UX. **No fix PR.**
- [#115367](https://github.com/openclaw/openclaw/issues/115367) — Provider-owned read gate requires `origin: bundled`; external chat plugins locked to current conversation. Security/architectural. **No fix PR.**
- [#88757](https://github.com/openclaw/openclaw/issues/88757) — Proactive messages invisible in session context → desync. **No fix PR.**
- [#142549](https://github.com/openclaw/openclaw/issues/142549) — Messages duplicated 3-4 times in chat UI. UX-friction. **No fix PR.**

### P2 — Notable regressions
- [#142479](https://github.com/openclaw/openclaw/issues/142479) — Memory recall skipped on optional trigger lookup timeout. **Fix PR exists:** [#142693](https://github.com/openclaw/openclaw/pull/142693).
- [#139710](https://github.com/openclaw/openclaw/issues/139710) — Mid-turn plugin-generation supersede kills system-agent turn + planner fallback. **No fix PR.**
- [#99925](https://github.com/openclaw/openclaw/issues/99925) — WebChat new session loses prior context (AI "blind"). **No fix PR.**
- [#141747](https://github.com/openclaw/openclaw/issues/141747) — Runtime `<system-reminder>` injects ~686 tokens/turn with no opt-out. Cost/UX. **No fix PR.**

### Closed today (resolved)
- [#135111](https://github.com/openclaw/openclaw/issues/135111) — malformed JSON arguments regression.
- [#137927](https://github.com/openclaw/openclaw/issues/137927) — internal context leak to Telegram.
- [#142530](https://github.com/openclaw/openclaw/issues/142530) — Telegram animated/video stickers arrive empty.
- [#141694](https://github.com/openclaw/openclaw/issues/141694) — Silent-fallback reply hardcodes wrong provider name.
- [#116851](https://github.com/openclaw/openclaw/issues/116851) — Beta blocker: Codex final replies lost for canonical SQLite sessions (had linked PR).
- [#95121](https://github.com/openclaw/openclaw/issues/95121) — Codex/OAuth turns ~28s regression on 2026.6.8.
- [#87109](https://github.com/openclaw/openclaw/issues/87109) — Gateway heap growth to 1073MB+ at idle.

**Stability assessment:** The release-blocker / P1 list is still long (15+ open, none with confirmed merge ETA). The release pipeline appears to be running ahead of bug-fix coverage, which is a project-health risk if 2026.9.3 lands before the outstanding P0/P1 backlog is cleared.

---

## 6. Feature Requests & Roadmap Signals

- **Multi-slot memory architecture** ([#88504](https://github.com/openclaw/openclaw/pull/88504)) — already a substantial open PR, marked `showcase`. Likely candidate for 2026.10/2026.Q4; addresses repeated complaints about a single exclusive memory owner.
- **GPT Image 2.5 variant support** ([#143068](https://github.com/openclaw/openclaw/pull/143068), [#143069](https://github.com/openclaw/openclaw/pull/143069)) — both ready; reasonable to land in 2026.9.4 or 2026.10.
- **Standalone dictation (STT) add-on** ([#142740](https://github.com/openclaw/openclaw/pull/142740)) — opt-in, decoupled from realtime Talk. Reasonable next minor.
- **Tailscale mobile pairing Doctor check** ([#142668](https://github.com/openclaw/openclaw/pull/142668)) — ready; good candidate for next patch.
- **WhatsApp phone-code login** ([#85866](https://github.com/openclaw/openclaw/pull/85866)) — long-open (May), proof supplied but status `needs proof`. Suggests prioritized but not landing.
- **Cyclic `sessions_send` loop protection** ([#94594](https://github.com/openclaw/openclaw/pull/94594)) — gateway protocol schema change; security-boundary risk. Likely needs dedicated review window.
- **Skill Workshop description-preservation fix** — implied by [#125570](https://github.com/openclaw/openclaw/issues/125570) but no PR yet; expect a fix in 2026.9.x line.
- **Cursor activity scroll-boundary consolidation** ([#139120](https://github.com/openclaw/openclaw/pull/139120)) — UX polish; P2.
- **Heartbeat-only-when-file-exists** ([#83143](https://github.com/openclaw/openclaw/issues/83143)) — low-cost prompt-savings win; still no fix PR despite 👍 reactions.
- **Recipient-addressed outbound sends** ([#110872](https://github.com/openclaw/openclaw/issues/110872)) — closed but marked `off-meta tidepool`; conceptually attractive for security, not landing soon.
- **Android chat-first surface** ([#46058](https://github.com/openclaw/openclaw/issues/46058)) — exploratory; not for near-term roadmap.
- **Skip HEARTBEAT prompt when file missing** ([#83143](https://github.com/openclaw/openclaw/issues/83143)) — easy win, no PR yet.

**Prediction for next version (likely 2026.9.4 / 2026.10):** Tailscale Doctor check, GPT Image 2.5, dictation add-on, at least one of the credential-import flows, and *hopefully* a wave of P0/P1 reliability fixes from the current backlog.

---

## 7. User Feedback Summary

**Recurring pain points:**
1. **Update brittleness.** Multiple production users (e.g., #123799, #141617, #136203) describe needing manual recovery after npm upgrades. The 2026.9.3 release is a direct response to this — community will judge by whether v2026.9.3's candidate-state rehearsal actually helps in practice.
2. **Codex/OAuth flakiness.** Cross-cutting: timeouts ([#89278](https://github.com/openclaw/openclaw/issues/89278)), silent turns ([#85251](https://github.com/openclaw/openclaw/issues/85251)), compaction conflicts ([#127148](https://github.com/openclaw/openclaw/issues/127148)), stale profiles ([#91352](https://github.com/openclaw/openclaw/issues/91352)). Together they suggest the Codex integration is the single biggest source of operator dissatisfaction.
3. **"Silent success /

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent OSS Ecosystem
**Snapshot date: 2026-09-09** | Projects: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The open-source personal AI assistant space is split between **scale players** (OpenClaw, Hermes Agent) managing large regression backlogs across enormous integration surfaces, and **architecture-focused challengers** (ZeroClaw, IronClaw) investing in governance, isolation, and runtime design before scaling features. QwenPaw occupies a distinctive middle position, combining disciplined release cadence with rapid same-day triage. Across all five projects, the same technical problems recur — context budgeting, provider drift, upgrade safety, and multi-user isolation — indicating the category has converged on a shared problem set even as architectures diverge. Notably, **cost observability and update reliability have displaced raw capability as the top user complaints**, a clear signal the ecosystem is transitioning from early adoption to production operation.

---

## 2. Activity Comparison

*Health score: composite of triage responsiveness, release discipline, unresolved P0/P1 load, community breadth, and review throughput (1-day snapshot; treat as directional).*

| Project | Issues (24h) | PRs (24h) | Release Status | Close Ratio (Issues/PRs) | Health Score | Key Risk |
|---|---|---|---|---|---|---|
| **OpenClaw** | 500 (283 open / 217 closed) | 500 (286 open / 214 closed) | ✅ v2026.9.3 shipped | 43% / 43% | **6.5/10** | 15+ open P0/P1, most without fix PRs; release pace outstrips bug-fix coverage |
| **Hermes Agent** | 50 (26 closed) | 50 (9 closed) | ❌ No release; 5+ merged fixes unbundled | 52% / 18% | **7.0/10** | Open P0 `state.db` corruption; fixes not reaching users without a tag |
| **IronClaw** | 2 | 11 (5 closed) | ❌ No release | 0% / 45% | **6.0/10** | Single-contributor concentration (10/13 items); credential-bleed half of #6778 unresolved |
| **QwenPaw** | 20 (11 closed) | 34 (9 closed) | ✅ v2.2.1-beta.1 (already at 2.2.1b2) | 55% / 26% | **8.5/10** | Two high-severity unfixed bugs (#7579 context loss, #7633 silent rollback) |
| **ZeroClaw** | 37 (3 closed) | 50 (1 closed, 0 merged) | ❌ No release (v0.8.5 current) | 8% / 2% | **7.0/10** | Review bandwidth bottleneck (1:49 merged-to-open); two P1s with no fix PRs |

**Community scale proxy** (cumulative tracker numbering): OpenClaw ~143K PRs » Hermes ~106K issues » ZeroClaw ~10.7K » IronClaw ~8.1K » QwenPaw ~7.6K. OpenClaw and Hermes operate at an order of magnitude larger community than the rest.

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Integration breadth is unmatched.** Telegram, Discord, iMessage, Feishu, WhatsApp, Google Meet voice, Android/Web — no peer covers this channel matrix (QwenPaw is QQ-centric; ZeroClaw covers Telegram/Discord; Hermes has Telegram/WeCom).
- **Shipping velocity + safe-update engineering.** v2026.9.3's candidate-state rehearsal (rehearsing core/plugin changes in isolation before activation) is a differentiated answer to the update-brittleness problem that Hermes and QwenPaw are still addressing with conventional patching.
- **Deepest feature surface:** multi-slot memory architecture (#88504), Doctor diagnostics subsystem, standalone STT, first-to-support GPT Image 2.5 variants.

**Disadvantages vs. peers:**
- **Worst regression-to-release ratio in the cohort.** QwenPaw closes reported issues same-day; OpenClaw carries 15+ open P0/P1s, most with no fix PR, and closed its highest-comment bug (#135111) without a public root cause.
- **Codex/OAuth is the single largest dissatisfaction cluster** across timeouts, silent turns, and compaction conflicts — provider reliability Hermes manages with comparable intensity on a smaller surface.
- Peers are architecturally more rigorous: ZeroClaw's RFC-driven sandbox/filesystem confinement and IronClaw's per-caller isolation exceed anything visible in OpenClaw's current queue.

**Community size:** ~5–10× the daily tracker volume of any peer, and the only project where community engagement (23 comments on a top thread) is broad-based rather than concentrated in a few maintainers. This is OpenClaw's moat — and its stress test.

---

## 4. Shared Technical Focus Areas

| Focus Area | Projects | Specific Evidence |
|---|---|---|
| **Context/token budgeting & compaction** | **All 5** | OpenClaw #141747 (686 tokens/turn system-reminder), memory-recall regressions; Hermes #106338 (compaction never fires on 1M-token windows); ZeroClaw #9535 (window-ratio anchoring); QwenPaw #7628 (compaction exceeds provider budget); IronClaw #8087 (context-limit override), #8082 (PDF pointer mode, ~25k tokens/doc) |
| **Cost observability** | 4 (all but QwenPaw) | ZeroClaw: three simultaneous cost-ledger failures (#9816, #10699, #10700); Hermes: cost now a top complaint; OpenClaw: unoptoutable token injection |
| **Provider adapter drift** | 4 (all but IronClaw) | OpenClaw: Codex/OAuth cluster; Hermes: Copilot, Mistral, OpenRouter, GPT-5 Responses, OpenCode Zen; ZeroClaw: Anthropic cache pricing/TTL; QwenPaw: llama.cpp version misparsing (#7633) |
| **Update/upgrade safety** | 3 | OpenClaw: entire v2026.9.3 release; Hermes: managed-Node upgrade path, locale reset on update; QwenPaw: 2.1→2.2 regressions (modal styling, lost path field) |
| **Multi-agent / multi-tenant concurrency** | 4 | OpenClaw #43367 (concurrent `agents add` overwrites); IronClaw #6778/#8090 (per-caller catalog keying); ZeroClaw sandbox policy RFC #6996 + A2A; Hermes profile/cron governance |
| **MCP reliability** | 4 | IronClaw (core focus, SEP-414); Hermes #84772 (tools discoverable but unregistered in dispatch) + MCP SDK 2.1.1; QwenPaw #7649 (configurable timeout), #7650 (channel metadata passthrough); ZeroClaw WASM plugin runtime RFC |
| **Mobile / companion parity** | 3 | QwenPaw (mobile-first cluster #7177/#7378); OpenClaw (Android/Web parity #142810, Tailscale mobile pairing); Hermes (Desktop regressions) |

---

## 5. Differentiation Analysis

| Project | Feature Focus | Target User | Architecture |
|---|---|---|---|
| **OpenClaw** | Always-on multi-channel assistant; memory subsystems; image/STT add-ons | Prosumer operators running persistent agents across chat platforms | Gateway + plugin model, Doctor diagnostics, candidate-state update rehearsal |
| **Hermes Agent** | CLI/Desktop-first agent; profiles, cron governance, local-model support (llama.cpp, Ollama) | Developers self-hosting on local/cheap models; Nous ecosystem | Desktop backend + CLI parity, `state.db` session store, provider adapter layer |
| **IronClaw** | Multi-tenant hosted-MCP isolation; operator ergonomics | Operators running shared/multi-principal deployments | Rust, bundled extension packages, per-caller namespacing, SEP-414 attribution |
| **QwenPaw** | Polished web Console; App Market, skills versioning; QQ channel depth | Users wanting managed-UI agent deployment (China-market skew) | Console + plugin ecosystem, Expo/RN mobile push, test-coverage discipline (+5pp) |
| **ZeroClaw** | Runtime architecture, sandbox security, A2A protocol, WASM plugins | Architects and security-conscious builders | RFC-governed runtime refactor; granular FS sandboxing (Bubblewrap/Landlock/Seatbelt) |

**Sharpest contrasts:** OpenClaw optimizes *breadth-now* (ship channels/features, triage later); ZeroClaw optimizes *correctness-first* (49 open PRs, near-zero merges, heavy RFC revision). IronClaw is the only project treating multi-user isolation as its primary design constraint rather than a bug category.

---

## 6. Community Momentum & Maturity

- **Tier 1 — Massive scale, under stress:** **OpenClaw** (500/500 daily items). Aggressive triage sweeps (~43% close) defend health, but the release pipeline runs ahead of bug-fix coverage.
- **Tier 2 — High activity, diverging directions:** **Hermes** (50/50) is *stabilizing* — deliberate technical-debt paydown, though fixes languish unbundled. **ZeroClaw** (37/50) is *consolidating* — RFC revisions and governance simplification suggest a pre-0.9 architectural freeze.
- **Tier 3 — Rapid, healthy iteration:** **QwenPaw** (20/34) is the cohort's best velocity-to-stability ratio: beta cadence, same-day closures, measurable quality investment (coverage 64.4%→69.4%).
- **Tier 4 — Focused niche:** **IronClaw** (2/11) shows coherent single-author design momentum but near-zero community engagement (2 comments project-wide) and acute bus-factor risk.

**Trajectory call:** QwenPaw is compounding trust fastest; ZeroClaw's bottleneck is review bandwidth, not ideas; OpenClaw's next release cycle (P0/P1 burn-down vs. feature landings) will determine whether scale remains an asset.

---

## 7. Trend Signals

1. **Cost accounting is becoming a first-class subsystem.** ZeroClaw's triple cost-ledger failure and Hermes' cost complaints show users now audit spend per-conversation and per-cache-write. *Value: build ledger correctness and budget caps early; retro-fitting them is a trust repair exercise.*
2. **Update safety is a competitive feature, not plumbing.** OpenClaw dedicated an entire release to it; Hermes and QwenPaw users hit upgrade regressions the same week. *Value: isolated rehearsal/rollback paths materially reduce operator churn.*
3. **Silent failures are the #1 trust killer.** Silent success-on-denied-write (OpenClaw #126906), silent runtime rollback (QwenPaw #7633), $0.00 spend reporting (ZeroClaw), cancelled-but-still-running executors (Hermes #106179). *Value: explicit state confirmation beats optimistic reporting.*
4. **Provider drift is a permanent tax.** Four of five projects fought provider-API regressions today (GPT-5 Responses parameter rejection, Mistral padding, Anthropic cache pricing, llama.cpp versioning). *Value: invest in adapter isolation and contract tests per provider.*
5. **Multi-tenancy is moving from edge case to core requirement.** IronClaw designs for it; OpenClaw and ZeroClaw are paying for not having. *Value: per-principal keying and attribution belong in the data model from day one.*
6. **Context economics drive architecture.** Every project touched token budgeting — window-ratio compaction, pointer-mode attachments, multi-slot memory. *Value: memory and attachment design should be measured in tokens-per-turn, not just features.*
7. **Governance emerges at scale.** ZeroClaw's RFC voting simplification (#10549) signals that heavy process gets pruned once contributor volume grows. *Value: lightweight decision queues outlive formal RFC windows.*

---
*Methodology note: single-day snapshot; close ratios and health scores are directional. Cumulative tracker numbering used as a community-scale proxy.*

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-09

## 1. Today's Overview

Hermes Agent shows very high churn today with **100 tracked items updated in the last 24 hours** (50 issues, 50 PRs) and **no new releases**. The repository is in a heavy bug-stabilization phase: roughly 50% of updated issues were closed (26/50), and several long-standing P0/P1 defects around session state, gateway cancellation, Desktop reasoning-block leakage, and `state.db` corruption were triaged or fixed. Open work is dominated by Desktop/CLI regressions, cron-job governance, and provider-compatibility patches (Copilot, Mistral, OpenRouter, GPT-5 Responses, OpenCode Zen). The volume of unique bug IDs, follow-up reversals, and `sweeper:risk-*` labels on today's PRs indicates the maintainers are actively paying down technical debt rather than shipping new features.

## 2. Releases

**No new releases in the last 24 hours.** The most recent shipped versions referenced in issues are v0.20.6 (Copilot regression baseline, [#96925](https://github.com/NousResearch/hermes-agent/issues/96925)), v0.21.0/v0.21.1 (Desktop update path, [#105465](https://github.com/NousResearch/hermes-agent/issues/105465)), and v0.21.1 (OpenCode Zen headers, [#106495](https://github.com/NousResearch/hermes-agent/issues/106495)). Multiple merged fixes today (PRs #63800, #73992, #101723, #104535, #106478) have not yet been bundled into a tagged release.

## 3. Project Progress

Closed/merged PRs today (9 closed of the 50 active):

- [#63800](https://github.com/NousResearch/hermes-agent/pull/63800) — **fix(auxiliary): omit temperature for GPT-5 Responses.** Routes GPT-5 auxiliary requests correctly; GPT-5 Responses API rejects `temperature`.
- [#101723](https://github.com/NousResearch/hermes-agent/pull/101723) — **fix(sessions): map `lost_and_found` cells by physical column names.** Recovery no longer misaligns after in-place schema upgrades (`ALTER TABLE ADD COLUMN`).
- [#104535](https://github.com/NousResearch/hermes-agent/pull/104535) — **fix(worktree): never delete through a Windows junction.** Prevents silent data loss when `git worktree remove` follows a JUNCTION.
- [#73992](https://github.com/NousResearch/hermes-agent/pull/73992) — **fix(desktop): prevent stale project-scope yank in `followActiveSessionCwd`.** Stops `git init`/clone + `cd` chains from clobbering an active session's project binding.
- [#106478](https://github.com/NousResearch/hermes-agent/pull/106478) — **fix(profiles): `--clone-all` no longer copies cron jobs into the new profile.** Cloned profiles now start with an empty cron workspace.
- [#106495](https://github.com/NousResearch/hermes-agent/issues/106495) — closed as duplicate of related issue on HermesAgent headers with OpenCode Zen.
- Several others across CLI/profiles, sessions, and risk-classified regressions.

Net direction: **stability and regression fixes** rather than new feature surface.

## 4. Community Hot Topics

| Item | Comments | Status | Underlying Need |
|---|---|---|---|
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) — Scheduled Nous → Enterkey merge blocked on `cron/jobs.py` conflicts | **80** | OPEN, invalid-tagged but heavily commented | Cross-org release coordination and dashboard automation reliability |
| [#63472](https://github.com/NousResearch/hermes-agent/issues/63472) — Desktop `/v1/models` reports "no models" for llama.cpp while CLI works | 8 | CLOSED | OpenAI-compatible local endpoints parity between CLI and Desktop |
| [#26665](https://github.com/NousResearch/hermes-agent/issues/26665) — Desktop `pt-BR` language reset on restart | 6 | CLOSED | Cross-locale config persistence for non-English users |
| [#92837](https://github.com/NousResearch/hermes-agent/issues/92837) — Heartbeat ticks counted fired but never delivered after agent-cache evict | 5 | OPEN, P1 | Reliable scheduled wake-ups on long-lived Telegram/leader sessions |
| [#96925](https://github.com/NousResearch/hermes-agent/issues/96925) — Copilot duplicates tool calls after v0.20.6 | 5 | CLOSED | Provider adapter regression isolation |
| [#93817](https://github.com/NousResearch/hermes-agent/issues/93817) — Desktop reasoning OFF still dumps trace into transcript | 5 | CLOSED | User privacy/UX expectation that an explicit toggle is honored |

The dominant signal is **parity and persistence**: users expect toggles they set (language, reasoning blocks, model lists) to survive restart and to behave consistently across CLI / Desktop / Dashboard surfaces.

## 5. Bugs & Stability

**Critical / P0 (open):**
- [#100896](https://github.com/NousResearch/hermes-agent/issues/100896) — **state.db corruption x4 in 5 weeks**, gateway+dashboard multi-writer WAL; warning fires 7 min before onset; `journal_mode=delete` containment. No fix PR visible today.
- [#93817](https://github.com/NousResearch/hermes-agent/issues/93817) — Desktop reasoning-blocks OFF still leaks trace (P0 per reporter). CLOSED today — needs verification it actually shipped.
- [#106179](https://github.com/NousResearch/hermes-agent/issues/106179) — Hermes Console cancel leaves executor worker + LLM request running (P2). New today.

**P1 (open or just-closed):**
- [#92837](https://github.com/NousResearch/hermes-agent/issues/92837) — heartbeat fired-but-never-delivered, still OPEN, no fix PR visible.
- [#103054](https://github.com/NousResearch/hermes-agent/issues/103054) — Dashboard serves stale token after `--ssh-session-token-file` → Desktop 401 on every non-public `/api/*`. CLOSED.
- [#102504](https://github.com/NousResearch/hermes-agent/issues/102504) — `hermes serve` (Desktop backend) never registers `config.yaml` shell hooks; outbound/tenant/destructive guards silently absent. CLOSED.
- [#105663](https://github.com/NousResearch/hermes-agent/issues/105663) — Compression threshold can be exceeded by protected tail → sessions permanently unrecoverable. CLOSED as duplicate.
- [#103792](https://github.com/NousResearch/hermes-agent/issues/103792) — Desktop loses local backend after ready announcement on macOS (regression). CLOSED.
- [#101719](https://github.com/NousResearch/hermes-agent/issues/101719) — Bot Chat capability-refresh persists named-profile turns into launch-profile `state.db`. CLOSED.
- [#103623](https://github.com/NousResearch/hermes-agent/issues/103623) — Cloud gateway 503 "Auth provider 'nous' unreachable" on all inbound. CLOSED as duplicate.
- [#106331](https://github.com/NousResearch/hermes-agent/issues/106331) — Cron jobs fail on systemd <254 (Ubuntu 22.04) via OOMPolicy=kill in transient scopes. CLOSED as duplicate.

**Notable recurring defect classes (per `sweeper:risk-*` labels):**
- `risk-session-state`: state.db / sessions / compression — still the single largest risk cluster.
- `risk-message-delivery`: heartbeat, group-chat turns, WeCom streaming.
- `risk-compatibility`: provider drift across Copilot, OpenAI Responses, OpenRouter variants, OpenCode Zen, Mistral.

## 6. Feature Requests & Roadmap Signals

Open feature/enhancement PRs and issues today:

- [#106456](https://github.com/NousResearch/hermes-agent/issues/106456) — **Upgrade path for self-managed Node runtime (`~/.hermes/node`)** — directly matched by PR [#106498](https://github.com/NousResearch/hermes-agent/pull/106498) `upgrade_managed_node`. **Likely in next release.**
- [#106496](https://github.com/NousResearch/hermes-agent/pull/106496) / [#80648](https://github.com/NousResearch/hermes-agent/pull/80648) — `cron resnap` to adopt changed global default without pinning. Salvage work for [#44585](https://github.com/NousResearch/hermes-agent/pull/44585). **High likelihood of landing.**
- [#105863](https://github.com/NousResearch/hermes-agent/pull/105863) — **Claude OAuth DirectSDK provider** (delegation). Adds Anthropic auth path with native admission + Hermes compaction.
- [#101116](https://github.com/NousResearch/hermes-agent/pull/101116) — Swedish (`sv`) locale for web dashboard + Desktop.
- [#96942](https://github.com/NousResearch/hermes-agent/pull/96942) — WeCom tool-timer animation in native stream bubble.
- [#80850](https://github.com/NousResearch/hermes-agent/pull/80850) — Hindsight memory plugin: usage guidance in `system_prompt_block`.
- [#106502](https://github.com/NousResearch/hermes-agent/pull/106502) — Retry transient errors in group-chat member turns without consuming the mention.
- [#106497](https://github.com/NousResearch/hermes-agent/pull/106497) — `cron runs` / `cron notepad` accept job name (parity with other `cron` commands).
- [#105438](https://github.com/NousResearch/hermes-agent/pull/105438) — MCP SDK upgrade 2.0.0 → 2.1.1 for cross-revision responses.
- [#96408](https://github.com/NousResearch/hermes-agent/pull/96408) — `hermes update` should restart `hermes-webui*` systemd units.
- [#106483](https://github.com/NousResearch/hermes-agent/pull/106483) — Floor delegated-child stale timeout at 150s (P-0097).

**Predicted next version (likely 0.21.2 / 0.22.0):** managed-Node upgrade path, cron resnap, Windows junction guard, GPT-5 Responses temperature fix, stale project-scope fix, `--clone-all` cron exclusion, MCP 2.1.1, and Swedish locale.

## 7. User Feedback Summary

**Real pain points (verbatim categories):**

- **Privacy / leakage:** Users explicitly toggle "Reasoning Blocks OFF" and still get full traces dumped into transcripts ([#93817](https://github.com/NousResearch/hermes-agent/issues/93817)). The toggle must mean what it says.
- **Locale persistence:** Language preference resets to English across restarts and `hermes update` even though `display.language` is correctly persisted ([#26665](https://github.com/NousResearch/hermes-agent/issues/26665), [#105465](https://github.com/NousResearch/hermes-agent/issues/105465)). i18n regression is multi-language (pt-BR, zh).
- **Cost / context growth:** On ~1M-token windows, default compaction threshold never fires on long-lived always-on sessions → unbounded context per turn ([#106338](https://github.com/NousResearch/hermes-agent/issues/106338)). Heartbeat quiet hours are still enforced by the model after reading full context ([#106339](https://github.com/NousResearch/hermes-agent/issues/106339)). **Cost pain is now a top complaint.**
- **Provider fragility:** Free-tier rate-limit fingerprinting ([#106495](https://github.com/NousResearch/hermes-agent/issues/106495)), Mistral `p`-padding field breaks streaming ([#106006](https://github.com/NousResearch/hermes-agent/issues/106006)), OpenRouter `:nitro`/`:floor`/`:exacto`/`:online` suffix routing mismatches capability cache ([#106493](https://github.com/NousResearch/hermes-agent/pull/106500)).
- **Concurrency / data integrity:** `state.db` corruption recurring despite WAL mode ([#100896](https://github.com/NousResearch/hermes-agent/issues/100896)); sessions silently persist into the wrong profile's DB ([#101719](https://github.com/NousResearch/hermes-agent/issues/101719)); `cron` jobs fail under systemd <254 ([#106331](https://github.com/NousResearch/hermes-agent/issues/106331)).
- **Cancellation honesty:** Console cancel reports cancelled but executor + LLM request continue ([#106179](https://github.com/NousResearch/hermes-agent/issues/106179)).
- **Localization UX:** Swedish needed ([#101116](https://github.com/NousResearch/hermes-agent/pull/101116)).

**Satisfaction signal:** High engagement (50/50 issue + PR churn) and willingness to file detailed repros suggest users are invested; dissatisfaction centers on regression regressions-of-regressions rather than dissatisfaction with the overall direction.

## 8. Backlog Watch

Items needing maintainer attention that have lingered:

- **[#88584](https://github.com/NousResearch/hermes-agent/issues/88584)** — 80 comments, OPEN since 2026-08-17, tagged `invalid` despite heavy discussion. The Nous → Enterkey release-merge automation is still blocked on `cron/jobs.py` conflicts. Cross-org coordination, not user-fixable.
- **[#4170](https://github.com/NousResearch/hermes-agent/issues/4170)** — Open since 2026-03-31. **Security:** No network egress filtering on terminal commands. PR #4168 closed 5 of 11 audit findings; remaining 6 (credential-file deny list being the most critical) need architectural decisions.
- **[#61660](https://github.com/NousResearch/hermes-agent/issues/61660)** — Open since 2026-07-09, 1 👍. `codex_models.py` `DEFAULT_CODEX_MODELS` ships 8 slugs; `*-pro` slugs return HTTP 400 for ChatGPT accounts (100% repro).
- **[#84772](https://github.com/NousResearch/hermes-agent/issues/84772)** — Open since 2026-08-12. MCP tools discoverable via `hermes mcp test` but **not registered in the agent's main dispatch** — only callable via raw `tool_call`. A silent capability loss for MCP users.
- **[#71169](https://github.com/NousResearch/hermes-agent/issues/71169)** — Open since 2026-07-25. Desktop GUI "Models" panel silently drops models present in Ollama (`qwen3.6:35b` confirmed). Filter logic mismatch between CLI and GUI.
- **[#9297 / #92837 cluster](https://github.com/NousResearch/hermes-agent/issues/92837)** — Heartbeat / loop / scheduled

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-09

## 1. Today's Overview

IronClaw shows **moderate, focused development activity** over the past 24 hours: 2 issues updated and 11 PRs updated, with a 5:6 closed-to-open PR ratio indicating active triage and merging. There are no new releases. Nearly all activity is concentrated in the hands of a single contributor, `kirikov` (10 of 13 items), with one additional PR from `thisisjoshford`. The dominant technical theme across the day is **multi-tenant hosted-MCP isolation** — discovery catalogs, caller attribution, and package validation — alongside supporting work on configuration ergonomics (`env_or_override`), prompt context budgeting, and Telegram integration polish. The project is in a "shaking out subtle multi-user and deployment-shape bugs" phase rather than shipping headline features.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

Five PRs were closed/merged in the last 24 hours. Together they advance MCP packaging, operator ergonomics, and the MCP attribution story:

- **[#8088](https://github.com/nearai/ironclaw/pull/8088) — `feat(common): distinguish a set-but-empty env var from an unset one` (CLOSED).** Introduces a real distinction between `FOO=` and absent `FOO` in `env_or_override`. Removes a class of silent operator-typo failures for deployment-decision variables such as endpoint overrides.
- **[#8089](https://github.com/nearai/ironclaw/pull/8089) — `feat(extensions): bundle the agent-market hosted-MCP provider package` (CLOSED).** Adds the `agent.market` provider as a first-party package following the same shape as other bundled hosted-MCP packages: manifest + per-tool input schemas + static tool fallback for pre-discovery.
- **[#8083](https://github.com/nearai/ironclaw/pull/8083) — `fix(extensions): merge discovered hosted-MCP catalogs instead of replacing them` (CLOSED).** Direct fix for the cross-user tool catalog overwrite bug: discovered catalogs are now merged per extension rather than replaced, so one user's discovery no longer destroys another's tools.
- **[#6760](https://github.com/nearai/ironclaw/pull/6760) — `feat(extensions): bundle the agent-market marketplace extension` (CLOSED, superseded).** Original XL effort for bundling `agent-market` with env-configurable server URL. Closed because the package shape was reorganized into the single-crate model later realized in #8089.
- **[#6759](https://github.com/nearai/ironclaw/pull/6759) — `feat(mcp): SEP-414 _meta attribution on outbound hosted-MCP tools/list + tools/call` (CLOSED, needs rebase).** Early version of per-principal attribution. Closed in favor of the opt-in shape now proposed in #8084.

The day effectively **closes the chapter on three pre-existing efforts** (#6760, #6759, and the open PR #8083-era design) and **opens a cleaner follow-up wave** (#8089, #8084) targeting the same underlying problems with the new bundled-extension architecture.

## 4. Community Hot Topics

Engagement (comments + reactions) is unusually quiet: zero thumbs-up reactions on any item, and only 2 comments total — both on [Issue #6778](https://github.com/nearai/ironclaw/issues/6778). Because the standard engagement signals are flat, "hot" is best read as **topic centrality**, not comment volume:

- **[Issue #6778 — Hosted-MCP cross-user metadata exposure](https://github.com/nearai/ironclaw/issues/6778)** (2 comments; updated 2026-09-08; opened 2026-07-28). This is the **anchor issue** for nearly half of today's work. The bug is that `tools/list` discovery runs under the *activating* user's credential but the result is published keyed only by extension id, so a second principal's discovery silently overwrites the first. Two fix PRs (#8083 merged, #8090 still open) address the catalog-replacement half; the credential-bleed half (using User A's token to materialize User B's package metadata) remains the structural concern in the issue body.
- **[Issue #8086 — `ironclaw skills list` cannot see runtime-written skills](https://github.com/nearai/ironclaw/issues/8086)** (0 comments; updated 2026-09-08). Newly opened, no comments yet, but identifies two latent usability bugs in the same place: (1) agent-installed skills are invisible to the CLI; (2) the CLI only sees skills for the user it was configured with. Both point at missing index/state wiring between runtime and CLI.
- **[PR #8072 — Telegram Bot API command menu registration](https://github.com/nearai/ironclaw/pull/8072)** (OPEN, the day's only non-`kirikov` PR). Registers `/model`, `/status`, `/new`, `/stop`, `/interrupt` via `setMyCommands` on activation and `deleteMyCommands` on deactivation. The only item showing a non-trivial history (created 2026-09-04, last updated 2026-09-08) and authored by an experienced contributor — a small but user-facing UX upgrade.

**Underlying need:** operators and agents both want a *per-installation*, not per-package, view of extensions, tools, and skills, and the CLI/runner boundary keeps being one of the places that distinction leaks.

## 5. Bugs & Stability

Ranked roughly by severity (security/multi-user first):

| Severity | Item | Fix PR |
|---|---|---|
| **High** | [#6778](https://github.com/nearai/ironclaw/issues/6778): Hosted-MCP catalog published under activating user's credential but keyed only by extension id → cross-user metadata exposure on multi-principal servers | Partial: [#8083](https://github.com/nearai/ironclaw/pull/8083) merged (merge not replace); [#8090](https://github.com/nearai/ironclaw/pull/8090) open (key by caller, not extension). Credential-bound discovery still unfixed. |
| **Medium** | [#8086](https://github.com/nearai/ironclaw/issues/8086): `ironclaw skills list` returns empty for runtime-installed skills and for skills belonging to non-default users — debugger points the operator at the wrong problem | None yet. |
| **Low** | `env_or_override` collapses `FOO=` and unset `FOO` ([#8088](https://github.com/nearai/ironclaw/pull/8088)) — silent operator-typo failure mode | Fixed and closed. |
| **Low** | `from_host_bundled_manifest_with_inline_dynamic_schemas` vs `validate_consistency` disagree on which manifest sources may carry inline dynamic descriptor schemas ([#8085](https://github.com/nearai/ironclaw/pull/8085)) — operator-installed packages build but cannot be used | Fix PR open. |

No crash, panic, or regression reports in the last 24 hours. The dominant bug class is **state-keying mistakes in multi-user deployments**, not local correctness bugs.

## 6. Feature Requests & Roadmap Signals

The day's open PRs collectively describe a near-term shape that is clearly visible:

- **Per-caller isolation everywhere** — [#8090](https://github.com/nearai/ironclaw/pull/8090) (catalogs keyed per caller) and [#8084](https://github.com/nearai/ironclaw/pull/8084) (SEP-414 `_meta` caller attribution on outbound hosted-MCP calls) together push hosted-MCP toward a model where each installation is an isolated namespace with explicit per-call attribution. Both are open; #8084 is opt-in per provider manifest.
- **Configurable model context budget** — [#8087](https://github.com/nearai/ironclaw/pull/8087) moves `PromptContextTokenBudget::DEFAULT_CONTEXT_LIMIT_TOKENS` from a 128k constant to an override. Predictable next step: surface this override in the agent loop CLI config alongside other operator knobs.
- **Operator-installable packages treated like host-bundled ones** — [#8085](https://github.com/nearai/ironclaw/pull/8085) aligns validator and constructor on which manifest sources can carry inline dynamic schemas, removing an asymmetry that blocks an entire class of deployment-side packages from being used.
- **Document attachment "pointer mode"** — [#8082](https://github.com/nearai/ironclaw/pull/8082) lets operators opt out of inlining extracted PDF/DOCX text into every model request (one PDF ≈ 25k tokens). Pointer mode is the most likely *user-visible* affordance to land soon because the cost model is easy to explain.
- **Telegram menu polish** — [#8072](https://github.com/nearai/ironclaw/pull/8072) is the smallest and most self-contained of the open items and is a reasonable candidate for the next merge.

**Predicted next release content:** if a release ships in the next few days, expect it to bundle #8085, #8087, and #8072 as the "operator ergonomics + small channel polish" slice, with the MCP isolation work (#8089 already closed, #8090, #8084) likely landing in the release after.

## 7. User Feedback Summary

Feedback volume is low (only 2 comments project-wide today), and almost all of it is structured PR/issue prose rather than conversational replies. Distilled themes from the prose itself:

- **Multi-tenant operators are actively deploying IronClaw** and are the implicit audience for #6778, #8083, #8089, #8090, and #8084 — every one of those items frames the problem as "this works for a single user and breaks the moment a second one shows up." That is a positive signal for production-readiness of the deployment story and a warning that the per-installation data model is still under-specified.
- **CLI ergonomics remain the most pointed pain point.** Both the `env_or_override` fix (#8088) and the `skills list` bug (#8086) share a root cause: the operator-facing surface silently lies about the system's state. The skills-list issue is particularly visible because "I installed a skill and the CLI can't find it" is the first thing a debugger will hit.
- **Context-budget pain is concrete and quantified.** The author of #8082 and #8087 puts a number on it (~25k tokens/PDF, 128k default), which suggests these are being measured against real workloads rather than hypothesized.
- **Satisfaction signals:** none explicit; absence of negative reactions and the willingness of the same author to keep landing five closed PRs in one day suggests the contributor is building toward a coherent design rather than fighting the codebase.

## 8. Backlog Watch

Items that warrant maintainer attention because they have been open longer than today's burst of activity:

- **[Issue #6778 — Hosted-MCP cross-user metadata exposure](https://github.com/nearai/ironclaw/issues/6778)** — opened **2026-07-28**, ~6 weeks old before today's wave of activity touched it. The catalog-merge half was fixed today via #8083 and #8090, but the credential-bound discovery half (the most security-relevant claim in the issue) has no associated fix yet. **This is the item most deserving of an explicit maintainer response** stating whether the credential-bleed is in-scope for the project or out of scope.
- **[PR #6760](https://github.com/nearai/ironclaw/pull/6760)** — closed/superseded by #8089; verify the supersession is documented so future readers don't try to revive the original shape.
- **[PR #6759](https://github.com/nearai/ironclaw/pull/6759)** — closed in favor of #8084's opt-in shape; same supersession-tracking need.
- **[PR #8084 — SEP-414 caller attribution](https://github.com/nearai/ironclaw/pull/8084)** — opt-in per provider manifest. Maintainers should confirm whether the opt-in is the intended posture or whether attribution should be default-on for hosted providers, since the spec is precisely about cases where providers *want* attribution.
- **[PR #8090 — per-caller catalog keying](https://github.com/nearai/ironclaw/pull/8090)** — open, no comments yet. Co-evolves with the still-open credential question from #6778; a maintainer steer on whether the two should land together would unblock the author.
- **[Issue #8086 — `skills list` blind to runtime-written skills](https://github.com/nearai/ironclaw/issues/8086)** — fresh, but two-bugs-in-one (runtime install + non-default user) means it deserves an early triage response so the fix doesn't end up addressing only the easier half.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-09

## 1. Today's Overview

QwenPaw shows **high development velocity** with 20 issues and 34 PRs active in the last 24h, alongside the v2.2.1-beta.1 release. The activity is balanced across bug fixes (Console/modal styling, MCP, channels), new features (skills versioning, mobile UX, traffic light), and infrastructure work (memory plugin migration, test coverage sprint). The closure rate is strong (11/20 issues, 9/34 PRs closed), suggesting maintainers are actively triaging the v2.2.0 → v2.2.1 backlog. Overall project health is healthy with steady iteration toward v2.2.1 stable.

## 2. Releases

**v2.2.1-beta.1** was published ([Release](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.1)).

Notable changes pulled in:
- **feat**: add agent model routing settings ([#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501))
- **docs**: update website for v2.2.0 ([#7517](https://github.com/agentscope-ai/QwenPaw/pull/7517))
- **fix(chat)**: sync resolved sessions during streaming

Migration note — [#7643](https://github.com/agentscope-ai/QwenPaw/pull/7643) immediately bumped to `2.2.1b2`, indicating active iteration on this beta line. No breaking changes documented in this drop. Installation verification issue [#7635](https://github.com/agentscope-ai/QwenPaw/issues/7635) was closed after passing the four-checkpoint platform gate.

## 3. Project Progress

Merged/closed PRs today (9 total, top highlights):

| PR | Area | Outcome |
|---|---|---|
| [#7649](https://github.com/agentscope-ai/QwenPaw/pull/7649) | MCP | Configurable HTTP/SSE timeout added to `MCPClientConfig` |
| [#7651](https://github.com/agentscope-ai/QwenPaw/pull/7651) | Console/App Market | App "Installed" state now correctly shown (closes [#7228](https://github.com/agentscope-ai/QwenPaw/issues/7228)) |
| [#7646](https://github.com/agentscope-ai/QwenPaw/pull/7646) | Console CSS | `qwenpaw-*` selectors aligned with `prefixCls` (closes [#5688](https://github.com/agentscope-ai/QwenPaw/issues/5688)) |
| [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609) | Skills | Versions + dependency validation exposed (closes [#7557](https://github.com/agentscope-ai/QwenPaw/issues/7557)) |
| [#7643](https://github.com/agentscope-ai/QwenPaw/pull/7643) | Release | Version bump → `2.2.1b2` |

**Major features advanced but still in flight:**
- [#7616](https://github.com/agentscope-ai/QwenPaw/pull/7616) Memory plugin refactor (ADBPG, PowerContext)
- [#7382](https://github.com/agentscope-ai/QwenPaw/pull/7382) AgentScopeRuntimeWebUI 1.2 adaptation
- [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) Native mobile experience (Expo/React Native draft)
- [#7653](https://github.com/agentscope-ai/QwenPaw/pull/7653) Backend test coverage `64.41% → 69.43%` (+2475 cases)

## 4. Community Hot Topics

**Most-discussed issues (by comments):**

1. [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) — *Deployment page mobile UX* (8 comments, **open**). Repeated request to move the deploy entry to top and reposition "Open/Stop" controls for thumb-friendly mobile use. Multiple screenshots supplied; reflects a broader pattern of mobile-first feedback (see also [#5329](https://github.com/agentscope-ai/QwenPaw/issues/5329), [#7600](https://github.com/agentscope-ai/QwenPaw/issues/7600)).

2. [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — *Model replies lost from subsequent context* (8 comments, **open**, severity: high). Assistant messages are persisted but absent on the next turn, producing empty responses. A real correctness bug affecting production users.

3. [#7228](https://github.com/agentscope-ai/QwenPaw/issues/7228) — *App market hover state wrong* (6 comments, **closed**). Demonstrates clear maintainer responsiveness — fixed by [#7651](https://github.com/agentscope-ai/QwenPaw/pull/7651) on the same day.

4. [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) — *Tool-returned image/PDF as bare base64 returns "file must have a file_id or file_data"* (6 comments, **closed**). Indicates friction in the multimodal tool pipeline.

5. [#6460](https://github.com/agentscope-ai/QwenPaw/issues/6460) — *Edge on Wayland: single-tab high CPU on session pages* (5 comments, **closed**). Suggests WebSocket/render-loop optimization work landed.

**Underlying needs:** mobile/touch ergonomics, transparent install/version state, and stable multimodal + channel pipelines dominate the top of the queue.

## 5. Bugs & Stability

Ranked by user impact and activity:

| Sev | Issue | Status | Fix PR |
|---|---|---|---|
| **High** | [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — model loses own previous reply → empty responses | OPEN | none yet |
| **High** | [#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642) — Console streaming invisible in Chrome until turn end | OPEN | [#7382](https://github.com/agentscope-ai/QwenPaw/pull/7382) in flight |
| **High** | [#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633) — llama.cpp 5-digit build numbers misparsed → silent runtime rollback | OPEN | none yet |
| **Med**  | [#7622](https://github.com/agentscope-ai/QwenPaw/issues/7622) — v2.2.0 modal backgrounds transparent | CLOSED (likely via [#7646](https://github.com/agentscope-ai/QwenPaw/pull/7646)) | [#7646](https://github.com/agentscope-ai/QwenPaw/pull/7646) |
| **Med**  | [#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628) — context compaction can still exceed provider budget | OPEN | none yet |
| **Low**  | [#7618](https://github.com/agentscope-ai/QwenPaw/issues/7618) — QQ channel group chat not responding | CLOSED | n/a |
| **Low**  | [#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601) — Working-directory picker lost editable-path feature in 2.2.0 | CLOSED | likely pending; regression |

Note: [#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633) (silent runtime rollback) and [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) (context loss) are the two highest-priority unfixed defects of the day — both affect user data and trust.

## 6. Feature Requests & Roadmap Signals

Active requests clustered around a few themes:

**Mobile / multi-instance ergonomics** (likely to influence v2.2.x and v2.3):
- [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) — Deployment page mobile-first layout
- [#5329](https://github.com/agentscope-ai/QwenPaw/issues/5329) — Sidebar agent switcher + New-Chat in compact mode *(closed, aligns with [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) mobile draft)*
- [#7600](https://github.com/agentscope-ai/QwenPaw/issues/7600) — Traffic-light status indicator (avoid losing track of long-running tasks)
- [#7648](https://github.com/agentscope-ai/QwenPaw/issues/7648) — Customizable page title (multi-tab workflow with 7–8 instances)

**Configuration transparency:**
- [#7644](https://github.com/agentscope-ai/QwenPaw/issues/7644) — Make default-agent essential params (email, model routing) editable in UI
- [#3997](https://github.com/agentscope-ai/QwenPaw/issues/3997) — Configurable MCP timeout *(already delivered in [#7649](https://github.com/agentscope-ai/QwenPaw/pull/7649))*

**Integration / extensibility:**
- [#7650](https://github.com/agentscope-ai/QwenPaw/issues/7650) — Pass channel-level metadata (QQ ID, phone) through to MCP tools

**Predicted v2.2.1 stable / v2.3 inclusion:**
- Traffic light ([#7600](https://github.com/agentscope-ai/QwenPaw/issues/7600))
- Mobile UI refinements ([#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177), [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378))
- Reranker UI ([#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399))
- Default-agent editor surface ([#7644](https://github.com/agentscope-ai/QwenPaw/issues/7644))

## 7. User Feedback Summary

**Satisfaction signals:** Same-day closures on [#7228](https://github.com/agentscope-ai/QwenPaw/issues/7228), [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597), [#6460](https://github.com/agentscope-ai/QwenPaw/issues/6460), [#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601), [#5688](https://github.com/agentscope-ai/QwenPaw/issues/5688), and [#7618](https://github.com/agentscope-ai/QwenPaw/issues/7618) show responsive triage and reinforce confidence in the v2.2.1 line.

**Pain points:**
- *Mobile ergonomics* dominates feedback. Users clearly expect phone-class interaction parity (compact sidebar agent switcher, top-anchored deploy entry, non-destructive Stop button).
- *State transparency*: "Install" vs "Installed" mis-state and silent llama.cpp rollback both erode trust; users want explicit version/upgrade signals.
- *Regressions on upgrade*: 2.1.0 → 2.2.0 lost the editable working-directory path field ([#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601)) and introduced transparent modals ([#7622](https://github.com/agentscope-ai/QwenPaw/issues/7622)).
- *Multimodal fragility*: bare-base64 tool results can fail the provider contract with a 400 ([#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597)).
- *Multi-instance workflows*: power users running several QwenPaw panels in parallel need distinctive titles ([#7648](https://github.com/agentscope-ai/QwenPaw/issues/7648)).

## 8. Backlog Watch

Items requiring maintainer attention that are still open or stale:

- [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — Context-loss bug, high user impact, no PR yet.
- [#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633) — Silent runtime rollback; needs prompt triage before users hit it again.
- [#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628) — Context-compaction budget accuracy, no PR yet.
- [#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642) — Chrome streaming regression; depends on [#7382](https://github.com/agentscope-ai/QwenPaw/pull/7382) merge.
- [#3997](https://github.com/agentscope-ai/QwenPaw/issues/3997) — Filed **2026-05-02** (~4 months old). Closed today via [#7649](https://github.com/agentscope-ai/QwenPaw/pull/7649); flag as positive example of long-tail resolution.
- [#5329](https://github.com/agentscope-ai/QwenPaw/issues/5329) — Filed **2026-06-19**, closed today after ~2.5 months.
- [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) — Mobile draft marked **[DO NOT MERGE]**; needs design/maintainer review to define v2.3 mobile strategy.
- [#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399) — Reranker UI in **Under Review** since **2026-07-23**; awaiting merge to unblock ReMeLightMemory work.
- [#7057](https://github.com/agentscope-ai/QwenPaw/pull/7057) — `PATH` injection for service-mode subprocesses, **ready-for-human-review** since **2026-08-15**.
- [#7237](https://github.com/agentscope-ai/QwenPaw/pull/7237) —

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-09

## 1. Today's Overview

ZeroClaw shows a high-activity day with **37 issues** and **50 PRs** updated in the last 24 hours, despite **no new releases**. The project is firmly in an architectural refinement phase: the most-discussed threads are large RFCs on runtime-owned sessions, unified file/attachment architecture, granular sandbox policy, and a composable WASM plugin runtime — all carrying high risk tags and multiple revisions. Operationally, the team is closing out the **ZeroCode sidebar / multi-session workstream** (3 issues + 1 PR closed), while opening a fresh cluster of P1/P2 bugs around **Anthropic/OpenAI cost tracking**, ACP transcript rendering, and provider cache configuration. Activity assessment: **healthy and governance-heavy**, with strong RFC churn but thin merge throughput (1 closed PR vs. 49 open).

## 2. Releases

No new releases in the last 24 hours. The current production version referenced in bug reports is **v0.8.5**.

## 3. Project Progress

### Closed Issues
- [#9729](https://github.com/zeroclaw-labs/zeroclaw/issues/9729) — zerocode: track multiple concurrent live sessions per chat pane *(closed)*
- [#9730](https://github.com/zeroclaw-labs/zeroclaw/issues/9730) — zerocode: agent sidebar with status dots, add-picker, and click-to-switch *(closed)*
- [#9731](https://github.com/zeroclaw-labs/zeroclaw/issues/9731) — zerocode: move Quickstart from the mode bar into the sidebar *(closed)*

### Closed PR
- [#9739](https://github.com/zeroclaw-labs/zeroclaw/pull/9739) — `feat(zerocode): multi-session panes with agent sidebar and sidebar-launched quickstart` *(closed; XL, do-not-merge — original feature scope preserved on a contributor branch after bounded reconnect / lifecycle repairs)*

### Net movement
The three closed issues plus [#9739](https://github.com/zeroclaw-labs/zeroclaw/pull/9739) represent the closure of the **#9727 zerocode UX redesign epic** — sidebar-based agent selection, multi-session tracking, and relocation of the Quickstart wizard from the mode bar to the sidebar. No backend, provider, or security PRs landed today.

## 4. Community Hot Topics

Ranked by comment volume. Most traffic is concentrated on **architectural RFCs**, not bugs.

| Rank | Item | Type | Comments | Why it's hot |
|------|------|------|----------|--------------|
| 1 | [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) RFC: Runtime-owned conversation sessions and transport surface adapters | RFC | 36 | Revision 5 replacing Rev. 4 — the keystone RFC for ACP/chat session ownership; needs maintainer re-vote. |
| 2 | [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) RFC: Unified file and attachment architecture for conversation surfaces | RFC | 29 | Revision 10 — heavily iterated attachment model spanning tools, channels, security. |
| 3 | [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) RFC: Granular sandbox policy — filesystem restrictions | RFC | 26 | Resolves long-standing drift between `SecurityPolicy` and OS sandboxes (Bubblewrap/Landlock/Seatbelt). |
| 4 | [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) Maintainer decision queue for RFCs and design issues | Tracker | 15 | The meta-tracker driving which RFCs move forward; updated daily. |
| 5 | [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) RFC: Composable WASM plugin runtime architecture | RFC | 12 | Plugin-runtime shape for skills/tools; explicitly defers session history to #10526. |

**Underlying signal:** the project is consolidating governance — [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) (RFC voting simplification, 5 comments) wants to drop the mandatory discussion windows entirely, indicating reviewers feel current RFC process is over-engineered.

## 5. Bugs & Stability

### P1 (highest severity) — 2 items
| Issue | Title | Fix PR? |
|-------|-------|---------|
| [#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816) | Anthropic provider reports `$0.00` spend; budget caps never fire | No open PR specifically targeting this — [#10716](https://github.com/zeroclaw-labs/zeroclaw/pull/10716) addresses cache write pricing but not the underlying zero-cost bug. |
| [#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697) | ZeroCode ACP transcript drops assistant text emitted before a tool call | No matching PR. |

### P2 — bugs reported or updated today
- [#10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690) — Integrations page slugifies display name (Z.AI → `z-ai`) → **fixed in** [#10714](https://github.com/zeroclaw-labs/zeroclaw/pull/10714).
- [#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) — `[media attachment]` placeholder leaks to users on text-only models.
- [#10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700) — `CostTracker.session_id` is daemon-lifetime, blocks per-conversation spend breakdown.
- [#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699) — Cost ledger undervalues cache writes → **fix in** [#10716](https://github.com/zeroclaw-labs/zeroclaw/pull/10716).
- [#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701) — Image attachment invalidates entire compatible-provider cache prefix.
- [#10720](https://github.com/zeroclaw-labs/zeroclaw/issues/10720) — ZeroCode v0.8.5: agent responses render twice (display-only).
- [#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721) — `knowledge.db_path` tilde expansion is a global `replace`, not home-prefix.
- [#10548](https://github.com/zeroclaw-labs/zeroclaw/issues/10548) — Mermaid SVG loses accessibility inside zoom dialog.

### Stability verdict
**6 P2 fixes are unblocked by in-flight PRs**, but the **two P1 bugs have no targeted fix PRs**, which is the single biggest stability risk on the board today.

## 6. Feature Requests & Roadmap Signals

### Newly opened or actively-discussed features
- [#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663) — Configurable 1-hour prompt-cache TTL for Anthropic (native + passthrough) → strong fit with the next release cycle.
- [#10706](https://github.com/zeroclaw-labs/zeroclaw/issues/10706) — Preserve opaque reasoning state across OpenAI Responses paths.
- [#10707](https://github.com/zeroclaw-labs/zeroclaw/issues/10707) — Bounded programmatic tool calling via OpenAI Responses.
- [#10708](https://github.com/zeroclaw-labs/zeroclaw/issues/10708) — Active-response steering on OpenAI Responses WebSockets.
- [#10704](https://github.com/zeroclaw-labs/zeroclaw/issues/10704) — Asynchronous function tools for OpenAI Responses.
- [#8763](https://github.com/zeroclaw-labs/zeroclaw/issues/8763) — Subagent activity / expandable tool results in ZeroCode (accepted).

### Open PRs advancing features
- [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) — Anchor context compaction to **model window ratio** instead of fixed token budget (XL, principal contributor).
- [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) — **Multiple models per provider profile** (XL).
- [#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324) — **A2A outbound client** with shared wire-model and four `a2a_*` tools (phase 1 of #9106).
- [#10623](https://github.com/zeroclaw-labs/zeroclaw/pull/10623) — Anthropic prompt-cache **passthrough** for OpenAI-compatible providers.
- [#10727](https://github.com/zeroclaw-labs/zeroclaw/pull/10727) — CI: compose X / Discord announcements from release notes (release hygiene).
- [#10729](https://github.com/zeroclaw-labs/zeroclaw/pull/10729) — Bump `js-yaml` to 4.3.2 (clears a known advisory that has kept `npm audit` red).
- [#10680](https://github.com/zeroclaw-labs/zeroclaw/pull/10680) — `rust-all` dependency bump, 44 packages (incl. clap, tokio-util).

### Next-version prediction
Most likely to land in **v0.8.6** or **v0.9.0**:
1. Anthropic cache TTL configurability ([#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663) ↔ [#10623](https://github.com/zeroclaw-labs/zeroclaw/pull/10623))
2. Cache write pricing in cost ledger ([#10716](https://github.com/zeroclaw-labs/zeroclaw/pull/10716))
3. Pixel-level image validation ([#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819))
4. Context compaction ratio ([#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535))
5. A2A outbound tools ([#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324))

## 7. User Feedback Summary

**Dominant pain points surfaced today:**
- **Cost transparency is broken across the board.** Three independent threads today ([#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816), [#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699), [#10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700)) report that the cost ledger is simultaneously reporting zero spend, mispricing cache writes, and attributing all transactions to a single daemon-lifetime session ID. Users cannot trust `zeroclaw status` or budget caps.
- **Cache-control ergonomics with Anthropic.** Both native ([#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662)) and compatible ([#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663), [#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)) providers are leaking the 5-minute default and wasting cache breakpoints — a recurring source of dissatisfaction for cost-sensitive operators.
- **ZeroCode v0.8.5 regressions.** [#10720](https://github.com/zeroclaw-labs/zeroclaw/issues/10720) (duplicate replies) and [#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697) (dropped pre-tool text in ACP) are fresh UX regressions that landed with the just-released version.
- **Telegram media batching** ([#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514)) has been open since **April 2026** — an indication that channel-layer turn aggregation is a chronic gap.
- **Dashboard routing fragility** ([#10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690)) — display-name slugification broke every "Configure" link for Z.AI, suggesting fragile coupling between UI display strings and provider keys.

Overall sentiment: **architecturally ambitious but operationally brittle around cost and the latest UI release**.

## 8. Backlog Watch

Items open longest that still need active maintainer attention:

| Item | Age | Why it matters | Last activity |
|------|-----|----------------|---------------|
| [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) Telegram media batching | **5 months** (2026-04-08) | Affects every Telegram user; bypasses multimodal grouping entirely. Updated today but in-progress for months. | 2026-09-09 |
| [#8546](https://github.com/zeroclaw-labs/zeroclaw/pull/8546) `fix(cli): localize status fragments` | **2+ months** | Status output is the primary user-facing CLI surface for cost/runtime info; needs-author-action. Maintainer has already reworked the branch. | 2026-09-09 |
| [#10241](https://github.com/zeroclaw-labs/zeroclaw/pull/10241) `fix(channels): restore supervised shell approval routing` | Status: **blocked** | High-risk security regression in supervised shell across **9 channels**; cannot merge until maintainer review completes. | 2026-09-09 |
| [#9977](https://github.com/zeroclaw-labs/zeroclaw/pull/9977) `fix(tools): confine filesystem mutations to workspace` | XL, needs-maintainer-review | Foundational security boundary for tools; symlink/FS escape hardening. | 2026-09-09 |
| [#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324) A2A outbound client (phase 1) | Needs-author-action | First deliverable of an accepted RFC; blocking A2A ecosystem work. | 2026-09-09 |
| [#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819) Pixel-level image validation | Needs-author-action | Prevents corrupt-image provider failures — common multimodal regression. | 2026-09-09 |
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) Granular sandbox policy RFC | Open since 2026-05-28 | Receives continuous comment traffic but no merged resolution yet. | 2026-09-08 |

**Backlog health:** the closed-PR-to-open-PR ratio today is **1:49**, which is healthy breadth but signals that **maintainer review bandwidth** — not contributor supply — is the bottleneck. The Maintainer Decision Queue tracker ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)) is the right place to watch for triage movement.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*