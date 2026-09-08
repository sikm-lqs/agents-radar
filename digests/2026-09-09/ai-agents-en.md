# OpenClaw Ecosystem Digest 2026-09-09

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-08 23:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-09

## 1. Today's Overview

OpenClaw shipped **v2026.9.3** today, a release squarely focused on hardening the update/finalization path (isolated candidate state, abandoned-run recovery, and 2026.9.2 migration support — [release notes](https://github.com/openclaw/openclaw/releases/tag/v2026.9.3)). Activity is high and sustained: **500 issues** and **500 PRs** touched in 24h with **269 PRs merged/closed** vs. **231 still open**, indicating faster triage than new intake. The backlog is dominated by update-recovery and multi-agent orchestration defects, several dating back ~6 months. The project's overall health is **stable but stressed** — release engineering is being actively reshaped in response to multiple P0/P1 upgrade incidents from the 2026.9.1 / 2026.9.2 line.

---

## 2. Releases

### v2026.9.3 — published 2026-09-09
- **Safer updates:** Core and plugin changes are now rehearsed in an isolated candidate state before activation; eligible 2026.9.2 migrations are supported; abandoned update records can be recovered without stopping a healthy matching Gateway.
- **Refs:** #136997, #138839, #141109, #141175.
- **Migration notes:** Operators coming from 2026.9.1/2026.9.2 on multi-platform or multi-agent installs should run `openclaw doctor --fix` after the upgrade to apply the new migration path; managed-upgrade users on OCM-style environments should review the partial-finalizer fix path before rolling forward.
- **Risk profile:** Low behavioral risk, high reliability improvement — directly addresses the cascade of `gateway restart`, `doctor --fix`, and `update_runs` stuck-state incidents filed in the last 30 days.

No other releases in the window.

---

## 3. Project Progress

A high PR throughput (269 merged/closed vs. 231 open) reflects a very active merge pipeline today. Notable directions advanced:

**Update / Doctor toolchain** (direct response to the recent release incidents):
- **#142672** `fix(update): preserve Doctor diagnostics when finalization times out`
- **#142675** `fix(doctor): omit unrelated diagnostics during update repair`
- **#142668** `feat(doctor): diagnose Tailscale mobile pairing readiness` (closes #142531)
- **#142631** `fix(update): restart Git installs upgrading from 2026.9.1`

**Codex runtime hardening:**
- **#142628** `fix(codex): reuse completed OAuth access rotations` (supersedes #122566)
- **#142670** `fix(codex): prevent native node inference failures under managed sandbox policy`
- **#142621** `fix(codex): tolerate transient native-home auth state on homeScope=user`

**Performance / scalability:**
- **#142534** `fix(state): gate SQLite integrity checks to explicit verification paths` — addresses the 14–76s event-loop block from `sweepCronRunSessions` on a 632-agent install
- **#141869** `fix: configured model fallbacks are skipped when the primary model times out`
- **#142500** `fix(plugins): reuse prewarmed catalog presentation`

**Web UI polish batch** (mostly maintainer @vyctorbrzezowski + @steipete): #142635 (message widths), #142671 (file attachment placement), #142555 (ClawHub Markdown in skill readers), #142540 (skill import source controls), #142536 / #142658 / #142667 / #142613 (composer & phone layouts), #142422 (duplicate final replies after hydration), #142674 (Mac text editing shortcuts).

**Channel plugin fixes:** #142678 (IMAP HTML-only messages), #138537 (workboard false `isError` on blocked status), #142679 (Crabbox advertises Windows WSL2 workers).

**CI / dev infra:** #141851 (macOS CodeQL under hosted limits), #142645 (e2e onboarding diagnostics), #142677 (labeler docs splits), #142659 (shared release-note fixtures).

A previously open UI PR **#142550** `fix(ui): size skill readers to content and compact headers` was **closed** today (likely superseded by the stacked pass #142555 → #142540 → #142536).

---

## 4. Community Hot Topics

The most active threads reveal **four converging pressure points** on OpenClaw today.

### (a) Silent loss of agent output
- **[#44925](https://github.com/openclaw/openclaw/issues/44925)** — "Subagent completion silently lost — no retry, no notification, no auto-restart on timeout" — **26 comments**, diamond-lobster rated, open since 2026-03-13. Multiple E-code failure modes (E31/E42/E45…) drop results without user visibility.
- **[#119720](https://github.com/openclaw/openclaw/issues/119720)** — Synchronous agent persistence blocks the Gateway event loop at scale — **14 comments**, also diamond-lobster, with prior partial repairs (#140231, #138984) but still open.
- **[#85251](https://github.com/openclaw/openclaw/issues/85251)** — Codex `notification:turn/started` followed by silence wedges embedded runs for the full 360s recovery window.

### (b) Upgrade & migration pain across the 2026.7→2026.9 line
- **[#137813](https://github.com/openclaw/openclaw/issues/137813)** (closed) — Windows Gateway never starts after 2026.9.1 (`--task-supervisor` exits 0 silently). **12 comments**.
- **[#133984](https://github.com/openclaw/openclaw/issues/133984)** (closed) — `2026.7.1-2 → 2026.8.1` leaves Gateway unstartable; `doctor --fix` skips config migrations non-interactively.
- **[#134896](https://github.com/openclaw/openclaw/issues/134896)** (closed) — 2026.8.1 update cascade: 5-blocker restart chain + doctor self-referential failure.
- **[#139714](https://github.com/openclaw/openclaw/issues/139714)** — `update_runs` row admitted but never finalized → `openclaw status` reports "update in progress" forever.
- **[#141617](https://github.com/openclaw/openclaw/issues/141617)** — 2026.9.2 npm update stuck at requested/running even after supported repair.
- **[#139485](https://github.com/openclaw/openclaw/issues/139485)** — Managed upgrade leaves gateway offline while finalization remains nonterminal.
- **[#136203](https://github.com/openclaw/openclaw/issues/136203)** (closed) — Windows de-DE 2026.8.2 leaves Doctor blocked on legacy workspace state.

### (c) Telegram channel bookkeeping
- **[#127229](https://github.com/openclaw/openclaw/issues/127229)** — Telegram watchdog-released durable update falsely tombstoned (diamond lobster).
- **[#126246](https://github.com/openclaw/openclaw/issues/126246)** — Telegram durable outbound deliveries stuck in `send_attempt_started`.
- **[#139809](https://github.com/openclaw/openclaw/issues/139809)** — Telegram does not receive protected secrets prompt from Codex.
- **[#142037](https://github.com/openclaw/openclaw/issues/142037)** — Embedded runtime records explicit-route Slack replies as "mute" on v2026.9.2.
- **[#142336](https://github.com/openclaw/openclaw/issues/142336)** — Core `/dashboard` shadows Telegram Mini App launcher in 2026.9.2+.
- **[#142530](https://github.com/openclaw/openclaw/issues/142530)** (closed) — Telegram animated/video stickers arrive as empty bodies.

### (d) Auth, providers, and trust boundaries
- **[#135111](https://github.com/openclaw/openclaw/issues/135111)** — Intermittent "Provider completed tool call with malformed JSON arguments" on v2026.8.1 / claude-sonnet-5 — **23 comments**, regression since 2026.7.1-2.
- **[#115642](https://github.com/openclaw/openclaw/issues/115642)** — Billing cooldown outlives the outage on subscription auth; no probe-based recovery.
- **[#138342](https://github.com/openclaw/openclaw/issues/138342)** — Official Discord plugin rejected by `openKeyedStore` trust check in 2026.9.1.
- **[#115367](https://github.com/openclaw/openclaw/issues/115367)** — Provider-owned read gate requires `origin: bundled`, but all privileged chat surfaces are now external plugins.
- **[#136311](https://github.com/openclaw/openclaw/issues/136311)** — Gateway reacquires reindex lock on every start, accumulating 19 GB of orphaned `memory-reindex-*` temp DBs.

**Underlying need:** Operators want OpenClaw to behave as a *recoverable runtime*, not a brittle daemon — durable retries, idempotent upgrades, visible subagent lifecycle, and per-channel delivery accounting.

---

## 5. Bugs & Stability

### P0 (release-blocker)
| Issue | Title | Fix PR? |
|---|---|---|
| [~~#137813~~](https://github.com/openclaw/openclaw/issues/137813) | Windows gateway never starts after 2026.9.1 | **Closed today** |
| [#115642](https://github.com/openclaw/openclaw/issues/115642) | Billing cooldown outlives the outage | No linked PR |
| [#140908](https://github.com/openclaw/openclaw/issues/140908) | `doctor --fix` fails with EACCES on `systemctl --user` under sudo -u | No linked PR |
| [#136203](https://github.com/openclaw/openclaw/issues/136203) | Windows de-DE 2026.8.2 upgrade leaves Doctor blocked | **Closed today** |
| [#141617](https://github.com/openclaw/openclaw/issues/141617) | 2026.9.2 npm update stuck at requested/running | No linked PR |

### P1 (high impact)
| Issue | Title | Fix PR? |
|---|---|---|
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | Subagent completion silently lost | Linked PR open (#43367 chain), no dedicated fix |
| [#135111](https://github.com/openclaw/openclaw/issues/135111) | Malformed JSON tool-call args on v2026.8.1 | No linked PR |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Unreaped hook/tool child processes (zombies) | No linked PR |
| [#43367](https://github.com/openclaw/openclaw/issues/43367) | Multi-agent orchestration unstable (config overwrite, session-lock, detached children) | Linked PR open |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | Sync persistence blocks event loop at scale | Partial: #140231, #138984 landed; still open |
| [#85251](https://github.com/openclaw/openclaw/issues/85251) | Codex `turn/started` then silent (wedge) | No linked PR |
| [#127229](https://github.com/openclaw/openclaw/issues/127229) | Telegram watchdog-released update tombstoned | No linked PR |
| [#127148](https://github.com/openclaw/openclaw/issues/127148) | Codex `sessions.compact` acquires 2nd app-server | No linked PR |
| [#136183](https://github.com/openclaw/openclaw/issues/136183) | ssh SIGTERM during banner (regression 2026.8.1→8.2) |

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem
**Snapshot date: 2026-09-09** | Sources: per-project community digests (OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw)

---

## 1. Ecosystem Overview

The personal AI assistant/agent open-source space is consolidating around a common runtime archetype — a persistent gateway/daemon orchestrating LLM agents across messaging channels, MCP tools, and local sandboxes — while projects differentiate on deployment surface (desktop, hosted, fleet) and provider strategy. Activity is unevenly distributed: OpenClaw operates at roughly an order of magnitude more volume than any peer, and is the only project shipping a stable release today, while the others are in beta, hardening, or design phases. Notably, the same defect classes recur across unrelated codebases — upgrade nonterminality, silent loss of agent output, event-loop blocking at scale, and prompt-cache thrash — indicating these are now ecosystem-level engineering problems, not project-specific ones. MCP has clearly become the default integration layer, with multi-tenant isolation emerging as its sharpest edge.

---

## 2. Activity Comparison

*Counts = items updated in the 24h window per each digest. Health score is analyst-assessed (1–10) from triage velocity, incident load, release cadence, and contributor dispersion.*

| Project | Issues (24h) | PRs (24h) | PRs merged/closed | Release status | Health score |
|---|---|---|---|---|---|
| **OpenClaw** | 500 | 500 | **269** (231 open) | **v2026.9.3 shipped 2026-09-09** | **7/10** — stable but stressed; unresolved P0s (#115642, #140908, #141617) |
| **Hermes Agent** | 50 | 50 | 1 | None; pre-release hardening | **6/10** — active input, review bottleneck (1/50 merged); P1 Windows update bug |
| **QwenPaw** | 30 | 45 | **24** | v2.2.1-beta.1 (2026-09-08) | **7.5/10** — active and improving; 50% same-day issue closure, no outage reports |
| **ZeroClaw** | 24 | 47 | 3 | None; v0.8.5 latest | **6/10** — engineering healthy, delivery gated by RFC governance |
| **IronClaw** | 2 | 11 | 3 | None; refactor landing on trunk | **5/10** — quiet pre-release window; single-contributor bus factor |

---

## 3. OpenClaw's Position

**Advantages vs peers**
- **Scale and triage capacity:** 500 issues/500 PRs touched daily with 269 merged — ~10× the volume of the nearest peer (Hermes, 50/50), and the only intake that is being closed faster than it arrives.
- **Release engineering maturity:** Isolated candidate-state update rehearsal, abandoned-run recovery, `doctor --fix` toolchain, and managed-upgrade (OCM-style) paths — no peer has an equivalent operational surface; Hermes is still fixing update verification running in the wrong CWD (#105145).
- **Breadth:** widest channel matrix (Telegram, Slack, IMAP, Crabbox, Discord) and proven fleet scale (a 632-agent install is actively debugged).
- **Community depth:** multi-maintainer (@steipete, @vyctorbrzezowski et al.) and distributed contributors — vs. Hermes (Xipong: 12+ PRs in one day) and IronClaw (kirikov: near-total authorship), both carrying concentration risk.

**Liabilities**
- An upgrade-incident cascade across 2026.7→2026.9 (multiple closed P0s plus open #141617, #139485) shows release velocity outpacing validation.
- Oldest unpatched criticals in the cohort: #44925 (subagent completion silently lost, open since March, 26 comments) and #119720 (sync persistence blocks the event loop).
- QwenPaw ships faster with fewer visible P0s; ZeroClaw is designing cleaner structural answers (runtime-owned sessions, append-only events) that OpenClaw would need retrofits to match.

**Technical approach:** monolithic Gateway daemon + plugin channels with rehearsal-based updates. Hermes is desktop-process-first with self-hosted LLM affinity; IronClaw bundles hosted-MCP providers as one-crate-per-extension; QwenPaw pluginizes memory backends behind a Hub; ZeroClaw is RFC-driving a modular substrate (WASM plugins, OS sandboxes).

---

## 4. Shared Technical Focus Areas

| # | Theme | Projects | Specific needs (evidence) |
|---|---|---|---|
| 1 | **Recoverable updates / idempotent migrations** | OpenClaw, Hermes | Nonterminal `update_runs` (#139714, #141617, #139485); Windows update verification in wrong CWD (#105145/#105883) |
| 2 | **Silent loss of session/agent output** | OpenClaw, QwenPaw, ZeroClaw | Subagent results dropped, no retry (#44925, #85251); model loses own reply (#7579); ACP failed turns vanish on session switch (#9333); RFC #9487/#10526 as the structural answer |
| 3 | **Event-loop blocking at scale** | OpenClaw, QwenPaw | 14–76s blocks on a 632-agent install (#119720, #142534); 118–135s desktop freezes, timeouts never fire (#7363) |
| 4 | **MCP isolation, scoping, teardown** | IronClaw, Hermes, QwenPaw | Cross-user catalog exposure on hosted MCP (#6778 → PR #8090 per-caller keying); anyio transport reconnect loop (#31987); profile state leakage (#106005); 401-probe misclassification (#7620/#7627) |
| 5 | **Prompt-cache stability & cost attribution** | ZeroClaw, Hermes, (QwenPaw) | One image wipes the cache prefix (#10701); trimming defeats caching (#10674/#10702); wrong cache-write pricing (PR #10716); daemon-lifetime cost session ids (#10700); per-conversation `session_id` for cache affinity (#106113) |
| 6 | **Windows/WSL parity** | OpenClaw, Hermes, QwenPaw | WSL drive-path and GPU/ANGLE fixes (Hermes); `CREATE_NEW_PROCESS_GROUP` shell handling (#7554/#7598); Windows gateway start failures (#137813, #136203) |
| 7 | **Multi-agent / per-agent model routing** | OpenClaw, QwenPaw, ZeroClaw | Orchestration instability (#43367); agent routing settings + per-session models (#7501, #5992); multi-agent sidebar epic (#9727) |

---

## 5. Differentiation Analysis

| Project | Feature focus | Target user | Architecture signature |
|---|---|---|---|
| **OpenClaw** | Channel breadth, fleet update orchestration, multi-agent ops | Operators of persistent multi-channel agent gateways (incl. 600+ agent installs, OCM-managed estates) | Monolithic Gateway daemon; plugin channels; candidate-state update rehearsal; doctor toolchain |
| **Hermes Agent** | Desktop UX/performance, email gateway sessions, remote control (`computer_use`) | Individual desktop power users, esp. Windows; self-hosters | Desktop-first app + gateway; Ollama/LiteLLM provider affinity |
| **IronClaw** | Hosted-MCP provider bundling, multi-tenant isolation, SEP-414 attribution | Hosted platform / multi-principal operators | One crate per bundled extension; per-caller registries; agent-market integration |
| **QwenPaw** | Plugin/skill marketplace, memory-backend pluginization, multimodal normalization | Plugin-ecosystem builders; zh/en users; open-weight model users (qwen-35B-FP8) | Hub with runtime-token boundary; OpenAI-compatible content-block normalization; packaged memory backends (OpenViking, ADBPG) |
| **ZeroClaw** | Sandboxing, governance, cost accounting | Architecture-minded contributors; security-sensitive deployments | RFC-driven substrate: runtime-owned sessions, WASM plugins, OS sandboxes (Bubblewrap/Landlock/Seatbelt), append-only event logs |

Key contrast: **OpenClaw optimizes operational scale, ZeroClaw architectural correctness, QwenPaw ecosystem modularity, Hermes end-user desktop experience, IronClaw multi-tenant hosting.**

---

## 6. Community Momentum & Maturity

- **Tier 1 — hyperscale, iterating under fire:** **OpenClaw.** Patch cadence of 2026.9.1→9.3 within days, driven by P0 incidents rather than roadmap; momentum is real but reactive.
- **Tier 2 — shipping:** **QwenPaw.** Best merge-to-intake ratio (24/45), beta pipeline with automated install verification (#7635), half of issues closed same-day. Rapidly converging on 2.2.1 stable.
- **Tier 2 — stabilizing, pre-cut:** **Hermes Agent.** High-quality input (paired issue+fix PRs within 24h) but 1/50 merge rate signals review-capacity mismatch; a 0.22 "Desktop performance & reliability" release theme is forming.
- **Tier 2 — design-mature, delivery-throttled:** **ZeroClaw.** RFCs at Revision 5–10 with 26–35 comments each; the explicit bottleneck is governance throughput (#8692 decision queue, #10549 process RFC), not engineering.
- **Tier 3 — incubating:** **IronClaw.** Deliberate consolidation (three July PRs superseded by same-day replacements) by a single author; near-zero community engagement (≤2 comments, zero reactions).

Maturity read: OpenClaw is the most *operationally* mature; ZeroClaw the most *process*-mature (arguably over-processed); QwenPaw shows the best velocity/stability balance.

---

## 7. Trend Signals

1. **The "recoverable runtime" contract is now table stakes.** The loudest complaints across four projects are not wrong answers but *silent* ones — dropped subagent results, nonterminal upgrades, vanished turns. Design for durable retries, idempotent state transitions, and visible terminal states from day one.
2. **Token economics is becoming an observability feature.** Cache-prefix stability, cache-write pricing accuracy (1.25×/2× TTL), per-conversation cost ledgers, and session-affinity routing are appearing as first-class issues. Agent developers should instrument cost like latency.
3. **MCP is both the integration frontier and the failure frontier.** Assume multi-principal use early: per-caller catalog keying (IronClaw), clean transport teardown (Hermes), and OAuth-vs-static-token arbitration (QwenPaw) are all live lessons.
4. **Async discipline determines scale ceiling.** Blocking persistence on the agent event loop is the shared P0 class — it surfaces at 632 agents (OpenClaw) and at one desktop user (QwenPaw, 118s freezes). Move persistence and reaping off-loop before scaling concurrency.
5. **Windows/WSL is a first-class demand surface,** not a rounding error — three of five projects shipped Windows-specific process/update fixes on the same day.
6. **Channel breadth taxes delivery accounting.** OpenClaw's Telegram durable-delivery/tombstone cluster shows that every added channel needs outbox semantics, not best-effort sends.
7. **Governance must scale with community.** ZeroClaw's RFC vote-snapshot churn throttles a technically strong project; OpenClaw's 269-merge triage machine is the counter-example. Process debt is as real as technical debt.

**Bottom line for builders:** durability + cost telemetry + multi-tenant MCP isolation + non-blocking runtime is the emerging baseline stack for competitive agent frameworks in late 2026.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — Project Digest (2026-09-09)

## 1. Today's Overview

Hermes Agent shows high, concentrated activity with **50 issues** and **50 PRs updated in the last 24 hours**, all of which remain open (issues) or open (PRs) except one PR merged. The work is dominated by **Desktop bug fixes and performance improvements**, with a clear focus on **Windows-specific defects** (update verification, WSL path resolution, GPU/ANGLE) and **MCP tool integration issues**. The email gateway is also undergoing active refactoring around per-subject session isolation. Despite the volume of activity, **no new releases were published**, suggesting the project is in a stabilization phase ahead of the next version cut.

## 2. Releases

No new releases in the past 24 hours. (No releases to report.)

## 3. Project Progress

**Merged/Closed PRs:** 1 (out of 50 updated today)

The merged PR is not detailed in the top-20 list shown. Among the 49 still-open PRs, the most material progress is concentrated in two areas:

- **Email gateway threading/cron fixes** — [#103196](https://github.com/NousResearch/hermes-agent/pull/103196) introduces subject-scoped sessions with `/new` reset and auto-rotation; [#104625](https://github.com/NousResearch/hermes-agent/pull/104625) and [#100583](https://github.com/NousResearch/hermes-agent/pull/100583) fix cron reports inheriting sender subjects.
- **Desktop performance & correctness** — A coordinated series from contributor Xipong addresses: MCP health-sweep coalescing ([#106136](https://github.com/NousResearch/hermes-agent/pull/106136)), concurrent roster/profile fetching ([#106134](https://github.com/NousResearch/hermes-agent/pull/106134)), SSH platform probe reuse ([#106132](https://github.com/NousResearch/hermes-agent/pull/106132)), WSL drive-path short-circuiting ([#106130](https://github.com/NousResearch/hermes-agent/pull/106130)), tool-call indexing during streaming ([#106126](https://github.com/NousResearch/hermes-agent/pull/106126)), bot-relay retention cleanup ([#106037](https://github.com/NousResearch/hermes-agent/pull/106037), [#106038](https://github.com/NousResearch/hermes-agent/pull/106038)), status-rail stabilization ([#106040](https://github.com/NousResearch/hermes-agent/pull/106040)), and draft-suggestion lifecycle fixes ([#106041](https://github.com/NousResearch/hermes-agent/pull/106041), [#106042](https://github.com/NousResearch/hermes-agent/pull/106042)).
- **Gateway reliability** — [#106142](https://github.com/NousResearch/hermes-agent/pull/106142) isolates global broadcasts from slow peers; [#106161](https://github.com/NousResearch/hermes-agent/pull/106161) flushes TTS acknowledgments at tool boundaries.
- **Update pipeline hardening** — [#105883](https://github.com/NousResearch/hermes-agent/pull/105883) validates gateway config attribute contract on stash-restore to prevent post-update gateway crashes on Windows.

## 4. Community Hot Topics

The single highest-engagement item is a long-standing Windows update bug:

- **[#105145](https://github.com/NousResearch/hermes-agent/issues/105145) — Windows desktop `hermes update` always reports FAILED (exit 8) (14 comments).** The post-update verification step runs in the wrong working directory (`$HERMES_HOME` instead of install root). Marked P1 and actively triaged; [#106097](https://github.com/NousResearch/hermes-agent/issues/106097) is a duplicate filed the same day, and [#105883](https://github.com/NousResearch/hermes-agent/pull/105883) is the associated Windows-focused fix.

Other discussion clusters:
- **MCP connectivity reliability** — [#31987](https://github.com/NousResearch/hermes-agent/issues/31987) (5 comments) reports an anyio `RuntimeError` in HTTP `streamable_http_client` cleanup that triggers a reconnect loop; [#106005](https://github.com/NousResearch/hermes-agent/issues/106005) (3 comments) finds multiplex profiles share MCP state across profiles; [#101007](https://github.com/NousResearch/hermes-agent/issues/101007) (2 comments) reports `mcp_servers.<name>.lazy` never engages due to `ttl_ms: 0`. Underlying need: **per-profile isolation and clean teardown of MCP transports** for stable multi-profile workflows.
- **Prompt-cache locality for self-hosted gateways** — [#106113](https://github.com/NousResearch/hermes-agent/issues/106113) requests forwarding per-conversation `session_id` in chat-completion metadata for deployment affinity (LiteLLM Proxy pattern).

## 5. Bugs & Stability

Reported in the last 24 hours, ranked by severity:

| Severity | Issue | Title | Fix PR? |
|---|---|---|---|
| P1 | [#105145](https://github.com/NousResearch/hermes-agent/issues/105145), [#106097](https://github.com/NousResearch/hermes-agent/issues/106097) | Windows desktop update always reports FAILED — wrong CWD | [#105883](https://github.com/NousResearch/hermes-agent/pull/105883) |
| P2 | [#31987](https://github.com/NousResearch/hermes-agent/issues/31987) | MCP HTTP transport anyio RuntimeError causing reconnect loop | None |
| P2 | [#106005](https://github.com/NousResearch/hermes-agent/issues/106005) | Multiplex profiles not scoped — only first profile gets MCP tools | None |
| P2 | [#101007](https://github.com/NousResearch/hermes-agent/issues/101007) | `mcp_servers.<name>.lazy` never engages (`ttl_ms: 0`) | None |
| P2 | [#106009](https://github.com/NousResearch/hermes-agent/issues/106009) | Desktop Sessions sidebar near-zero width; focus_pane no-op | None |
| P2 | [#106063](https://github.com/NousResearch/hermes-agent/issues/106063) | Quick-command alias → skill never runs on Desktop/TUI | None |
| P2 | [#106066](https://github.com/NousResearch/hermes-agent/issues/106066) | WhatsApp quote parser drops text in `ephemeralMessage` | None |
| P2 | [#106120](https://github.com/NousResearch/hermes-agent/issues/106120) | Length-continuation retries make prompt longer, 4 attempts worse | None |
| P2 | [#106010](https://github.com/NousResearch/hermes-agent/issues/106010) | Auxiliary `provider: ollama` + empty `api_key` errors since refactor | None |
| P2 | [#106096](https://github.com/NousResearch/hermes-agent/issues/106096) | `cron.update_job` keeps `repeat.times=1` after switching to recurring | None |
| P2 | [#106077](https://github.com/NousResearch/hermes-agent/issues/106077) | Compression drops clarify answers before summarization | None |
| P2 | [#106103](https://github.com/NousResearch/hermes-agent/issues/106103) | CI advisory public-surface check can timeout blocking Windows job | None |
| P3 | [#70444](https://github.com/NousResearch/hermes-agent/issues/70444), [#103569](https://github.com/NousResearch/hermes-agent/issues/103569), [#106117](https://github.com/NousResearch/hermes-agent/issues/106117), [#106098](https://github.com/NousResearch/hermes-agent/issues/106098), [#106127](https://github.com/NousResearch/hermes-agent/issues/106127), [#106129](https://github.com/NousResearch/hermes-agent/issues/106129), [#106131](https://github.com/NousResearch/hermes-agent/issues/106131), [#106135](https://github.com/NousResearch/hermes-agent/issues/106135), [#45709](https://github.com/NousResearch/hermes-agent/issues/45709) | Desktop UI regressions and Feishu/whatsapp edge cases | Several with paired Xipong fix PRs |

**Stability signal:** Several issues stem from recent refactors (e.g., `auxiliary_client` in [#106010](https://github.com/NousResearch/hermes-agent/issues/106010), `compression` in [#106077](https://github.com/NousResearch/hermes-agent/issues/106077)), suggesting **regression risk from late-stage internal cleanups** that should be paired with stronger release-test coverage.

## 6. Feature Requests & Roadmap Signals

Open feature requests and likely next-release candidates:

- **[#103196](https://github.com/NousResearch/hermes-agent/pull/103196) — Email: subject-scoped sessions with `/new` reset and auto-rotation.** Strong candidate for next minor release given paired fix PRs ([#104625](https://github.com/NousResearch/hermes-agent/pull/104625), [#100583](https://github.com/NousResearch/hermes-agent/pull/100583)) from the same author.
- **[#103653](https://github.com/NousResearch/hermes-agent/pull/103653) — `computer_use` provider factory seam and remote desktop transport.** Targets `main`; relevant for remote-control workflows.
- **[#93180](https://github.com/NousResearch/hermes-agent/pull/93180) — Dashboard auth: trusted reverse-proxy (`X-Remote-User`) via `supports_request_auth`.** Adds a security-friendly auth seam; flagged `needs-decision` — likely deferred for design review.
- **[#106113](https://github.com/NousResearch/hermes-agent/issues/106113) — Per-conversation `session_id` in chat-completions metadata** for prompt-cache locality on self-hosted gateways.
- **[#106152](https://github.com/NousResearch/hermes-agent/pull/106152) — Desktop pane tabs: Chrome-style curved tabs with hover previews.** UX/visual feature.

**Performance-focused PRs** ([#106134](https://github.com/NousResearch/hermes-agent/pull/106134), [#106126](https://github.com/NousResearch/hermes-agent/pull/106126), [#106062](https://github.com/NousResearch/hermes-agent/issues/106062), [#106123](https://github.com/NousResearch/hermes-agent/issues/106123), [#106125](https://github.com/NousResearch/hermes-agent/issues/106125), [#106064](https://github.com/NousResearch/hermes-agent/issues/106064)) suggest a **0.22 release theme of "Desktop performance & reliability"** is emerging.

## 7. User Feedback Summary

Pain points surfaced by users in real usage:

- **Windows update/install flows are fragile.** Two P1 bugs within 24h on `hermes update` post-update verification (wrong CWD), plus general update-stash race conditions; users have had to hand-audit their installs (see [#45556](https://github.com/NousResearch/hermes-agent/issues/45556)).
- **MCP is a high-value but high-fragility integration.** Three independent failure modes (transport cleanup lock, profile scoping, lazy-init `ttl_ms`) indicate users are running MCP in non-trivial topologies (multi-profile, HTTP, lazy).
- **Message-delivery gateways still have edge cases.** WhatsApp quote parsing on `ephemeralMessage` ([#106066](https://github.com/NousResearch/hermes-agent/issues/106066)) and Feishu `kanban notify-subscribe` silent-drop ([#103569](https://github.com/NousResearch/hermes-agent/issues/103569)) point to platform-protocol parsing gaps.
- **Desktop UX regressions cause real disorientation.** Project list reordering ([#70444](https://github.com/NousResearch/hermes-agent/issues/70444)), zero-width sidebar ([#106009](https://github.com/NousResearch/hermes-agent/issues/106009)), and quick-command aliases silently dropping skill execution ([#106063](https://github.com/NousResearch/hermes-agent/issues/106063)) break muscle memory.
- **Compression loses decision context.** [#106077](https://github.com/NousResearch/hermes-agent/issues/106077) highlights an enterprise-grade concern: summarizers never see clarification answers, breaking decision continuity.
- **Sustained contributor engagement** (notably Xipong's 12+ desktop PRs in one day) and kiwipaulrob's email rework indicate **community investment in the Desktop and gateway surfaces** — satisfaction with the product direction is high enough that contributors are filing paired issues and fixes within the same 24h window.

## 8. Backlog Watch

Long-running issues still open that warrant maintainer attention:

- **[#31987](https://github.com/NousResearch/hermes-agent/issues/31987)** — MCP HTTP `streamable_http_client` cleanup RuntimeError (open since 2026-05-25, 5 comments). No PR. This is a real production-grade MCP reliability blocker.
- **[#45709](https://github.com/NousResearch/hermes-agent/issues/45709)** — Hermes Link fails to sync web-originated messages in attached conversations (open since 2026-06-13). Cross-surface sync bug with no activity in the PR queue.
- **[#70444](https://github.com/NousResearch/hermes-agent/issues/70444)** — Desktop project list reordering (open since 2026-07-24). UX-affecting; no PR yet despite `needs-decision` label.
- **[#45556](https://github.com/NousResearch/hermes-agent/issues/45556)** — Local audit notes an unsafe CLI CWD workaround still observable and stale update cache producing false "behind" counts. `needs-repro`.
- **[#81707](https://github.com/NousResearch/hermes-agent/pull/81707)** — WhatsApp rapid text merge message-id carry (open since 2026-08-08). Long-lived P2 PR awaiting review.
- **[#93180](https://github.com/NousResearch/hermes-agent/pull/93180)** — Dashboard reverse-proxy auth seam (open since 2026-08-23). Flagged `needs-decision`; a security-relevant feature that should not stall.
- **[#105145](https://github.com/NousResearch/hermes-agent/issues/105145)** — Despite an in-flight fix PR ([#105883](https://github.com/NousResearch/hermes-agent/pull/105883)) and a duplicate filed same-day ([#106097](https://github.com/NousResearch/hermes-agent/issues/106097)), a P1 Windows update failure is still the loudest signal in the project — **should be cut into the next patch release with priority.**

---

**Bottom line:** Hermes Agent is in an active hardening phase. A coordinated Desktop/perf effort is converging, MCP and Windows update paths are the most visible pain, and a release that bundles the email-thread rework plus Windows-update fix would meaningfully reset user confidence.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-09

## 1. Today's Overview

IronClaw shows a high-velocity, single-contributor-driven day of activity concentrated on the **hosted-MCP extension surface**. Eleven PRs were updated in the last 24 hours (3 closed, 8 open), alongside 2 issue updates and **no new releases**. Almost all activity originates from a single author (`kirikov`), who both authored the two open issues and is driving a coordinated rewrite of the hosted-MCP tool-catalog and provider-bundling model. The pattern of older July-era PRs being closed and immediately superseded by same-day replacements indicates an in-progress refactor rather than routine maintenance. No releases shipped today, signaling that changes are still landing on trunk without a tagged cut.

## 2. Releases

*No new releases in the last 24 hours.* Section omitted per digest rules.

## 3. Project Progress

Three PRs closed today, all as part of a deliberate consolidation toward a cleaner hosted-MCP design:

- **[#8083](https://github.com/nearai/ironclaw/pull/8083) — CLOSED**: `fix(extensions): merge discovered hosted-MCP catalogs instead of replacing them`. The fix was rejected in favor of a stricter per-caller keying strategy; effectively superseded by [#8090](https://github.com/nearai/ironclaw/pull/8090), which solves the same class of bug with a different design (key by caller rather than merge by append).
- **[#6760](https://github.com/nearai/ironclaw/pull/6760) — CLOSED**: `feat(extensions): bundle the agent-market marketplace extension (env-configurable server URL)`. Closed as **superseded in shape**, with the underlying intent carried forward by [#8089](https://github.com/nearai/ironclaw/pull/8089), which adopts the new "one crate per bundled extension" convention introduced since the original PR was opened.
- **[#6759](https://github.com/nearai/ironclaw/pull/6759) — CLOSED**: `feat(mcp): SEP-414 `_meta` attribution on outbound hosted-MCP tools/list + tools/call`. Closed with the explicit note that it needs a rebase. Functionally succeeded by [#8084](https://github.com/nearai/ironclaw/pull/8084), which restates the feature as **opt-in per provider manifest** rather than globally enabled.

Net effect: the hosted-MCP stack is being tightened around **per-caller scoping**, **opt-in metadata**, and a unified bundled-extension packaging convention. No user-facing features merged today.

## 4. Community Hot Topics

Engagement is low in absolute terms (no item has more than 2 comments and no item has any 👍 reactions), but topic-level concentration is notable:

- **[#6778](https://github.com/nearai/ironclaw/issues/6778)** — *2 comments*. The most-discussed thread of the day. Frames a real multi-tenant security concern: on hosted-MCP servers, one user's `tools/list` discovery overwrites another's. Linked to the fix chain [#8083](https://github.com/nearai/ironclaw/pull/8083) → [#8090](https://github.com/nearai/ironclaw/pull/8090).
- **[#8086](https://github.com/nearai/ironclaw/issues/8086)** — *0 comments but freshly opened*. Operator-facing CLI observability gap: `ironclaw skills list` cannot see skills the runtime writes, sending debuggers down the wrong path. No associated PR yet.
- **Hosted-MCP theming dominates the queue.** Of 11 PRs, 6 are scoped to `mcp` / `extensions` for hosted-MCP behavior. The repeated cross-cutting concern is **isolation between principals sharing a hosted-MCP server**, which has now generated one issue, two superseded fix PRs, and one live fix PR within ~36 hours.

The underlying community need is clear: deployments are moving from single-user to multi-principal scenarios, and the current per-extension-id registry is the wrong granularity.

## 5. Bugs & Stability

Ranked by severity and scope:

| # | Severity | Item | Status | Fix PR |
|---|----------|------|--------|--------|
| 1 | **High — security/data-isolation** | [#6778](https://github.com/nearai/ironclaw/issues/6778): cross-user tool catalog exposure on hosted-MCP | OPEN | [#8090](https://github.com/nearai/ironclaw/pull/8090) OPEN |
| 2 | **Medium — observability** | [#8086](https://github.com/nearai/ironclaw/issues/8086): `ironclaw skills list` invisible to runtime-installed skills | OPEN | None yet |
| 3 | **Medium — installability** | [#8085](https://github.com/nearai/ironclaw/pull/8085): operator-installed packages build but cannot be used (manifest-schema validator mismatch) | OPEN (PR) | Self-fix in PR |
| 4 | **Low — silent misconfig** | [#8088](https://github.com/nearai/ironclaw/pull/8088): `FOO=` treated identically to unset `FOO`, masking operator typos | OPEN (PR) | Self-fix in PR |

No crash reports or regressions in today's data. The two genuine bugs (issues, not PRs) both have plausible root causes in registry-key design and CLI/runtime data-scope asymmetry, respectively.

## 6. Feature Requests & Roadmap Signals

While no item is formally tagged as a feature request, several open PRs read as forward-looking capability work:

- **SEP-414 caller attribution** ([#8084](https://github.com/nearai/ironclaw/pull/8084)) — opt-in per-provider metadata for outbound hosted-MCP calls. Likely to ship in the next release that bundles hosted-MCP provider packages.
- **Pointer mode for document attachments** ([#8082](https://github.com/nearai/ironclaw/pull/8082)) — addresses the ~25k-token cost of inlining PDFs into model context; should land before any deployment that handles attachments routinely.
- **Configurable prompt-context limit** ([#8087](https://github.com/nearai/ironclaw/pull/8087)) — promotes the hard-coded 128k token constant to an operator-tunable value. Low risk, near-universal benefit for larger-context models.
- **Telegram Bot API command menu** ([#8072](https://github.com/nearai/ironclaw/pull/8072)) — `setMyCommands` at extension activation, registered by `thisisjoshford`. Steady UX polish for the Telegram channel.
- **`agent-market` provider package** ([#8089](https://github.com/nearai/ironclaw/pull/8089)) — completes the bundled first-party hosted-MCP provider set alongside the security fixes.

Predicted next-release shape: a hosted-MCP hardening release consolidating #8090, #8084, #8088, and #8089, with #8082 and #8087 following close behind as standalone operator-quality improvements.

## 7. User Feedback Summary

Today's data contains no first-person end-user reports. The signals that exist are operator/developer pain points encoded by the issue author:

- **Debugging dead-ends**: [#8086](https://github.com/nearai/ironclaw/issues/8086) — the CLI is the natural first stop when a skill is missing, but returns an empty list for runtime-installed skills, "pointing them at the wrong problem."
- **Silent fallback defaults**: [#8088](https://github.com/nearai/ironclaw/pull/8088) — operator typos in deployment-critical env vars (e.g., endpoint overrides) silently select defaults rather than failing loudly.
- **Multi-tenant trust breakage**: [#6778](https://github.com/nearai/ironclaw/issues/6778) — the implicit contract of a per-extension-id registry breaks the moment more than one principal is involved on a hosted-MCP server.

No community satisfaction or sentiment metrics are exposed in the supplied data; the small comment counts (≤2 per item, zero reactions) suggest the project is currently in a quiet pre-release window rather than a community-wide discussion phase.

## 8. Backlog Watch

No long-unanswered items appeared in the 24-hour window. However, two adjacent items deserve maintainer attention because they are **active but have no fix path yet**:

- **[#8086](https://github.com/nearai/ironclaw/issues/8086)** — open <24h, 0 comments, no linked PR. A CLI/runtime visibility mismatch of this kind tends to fester because each side "looks right" in isolation. Worth a triage note clarifying whether the runtime should write into the CLI's listing scope, or whether the CLI should accept a `--user` / scope flag.
- **[#8085](https://github.com/nearai/ironclaw/pull/8085)** — a PR-as-bug-report for operator-installed packages that build but cannot be used, with the validator and constructor disagreeing on which manifest sources may carry inline dynamic descriptor schemas. This is the kind of asymmetry that grows worse as more package sources are added, so it should land before #8089 introduces another bundled provider.

Two older July items ([#6759](https://github.com/nearai/ironclaw/pull/6759), [#6760](https://github.com/nearai/ironclaw/pull/6760)) were today resolved via supersede — both effectively moved off the backlog rather than left unanswered.

---

*Digest generated from IronClaw GitHub activity for 2026-09-09. All PR/issue identifiers are linked to github.com/nearai/ironclaw.*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-09

## 1. Today's Overview

QwenPaw shows high development velocity with **30 issues** and **45 PRs** updated in the last 24 hours, alongside the publication of the **v2.2.1-beta.1** pre-release. Maintainers are clearly in a stabilization phase for the 2.2.x line: roughly half of all incoming issue traffic has been closed in the same window (15/30), and a large share of merged PRs target regressions and UX papercuts introduced in v2.2.0. The codebase is currently most pressured in three areas — **multimodal/content-block normalization for third-party OpenAI-compatible endpoints**, **shell/sandbox process isolation on Windows**, and **plugin/skill marketplace ergonomics** — all of which have active merged fixes today. Overall, project health is **active and improving**, with no large-scale outage reports.

---

## 2. Releases

### v2.2.1-beta.1 (Beta, published 2026-09-08)

A beta pre-release cutting the 2.2.1 line. Visible changelog includes:

- **feat: add agent model routing settings** — [#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501) (author @zhaozhuang521). Introduces configurable routing for which model a delegated agent uses; pairs with the long-standing [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) (per-session model overrides, open since 2026-07-12).
- **docs: update website for v2.2.0** — [#7517](https://github.com/agentscope-ai/QwenPaw/pull/7517) (author @cuiyuebing).
- **fix(chat): sync resolved sessions during streaming** — partial author @zhaozhuang521. Likely the same fix that landed in [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) ("prevent chat submissions from bypassing the queue") — the message-queue / streaming synchronization bug is being addressed at the runtime boundary.

**Verification:** A release-duty issue [#7635](https://github.com/agentscope-ai/QwenPaw/issues/7635) was opened by `github-actions[bot]` with a 4-hour install-verification deadline; it has already been closed, indicating the bot pipeline ran cleanly.

**Migration notes:** No explicit breaking changes listed. Because this is a *beta*, production deployments should remain on v2.2.0 until 2.2.1 stable lands. Several v2.2.0 regressions being patched here (sidebar redesign, queue bypass, modal transparency, MCP 401 probe) mean the upgrade is low risk but worth a smoke test on the Console UI and any custom MCP servers.

---

## 3. Project Progress

### Merged / Closed PRs (selected, 24 closed in window)

| Area | PR | Summary |
|---|---|---|
| Multimodal normalization | [#7621](https://github.com/agentscope-ai/QwenPaw/pull/7621) | Treats `application/pdf` DataBlocks as media during request normalization so text-only models don't receive unsupported OpenAI `{"type":"file"}` parts. Pairs with [#7617](https://github.com/agentscope-ai/QwenPaw/issues/7617). |
| Message queue | [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) | Adds a chat run-status endpoint backed by `TaskTracker`; routes attachments and resubmissions into the localStorage queue instead of triggering 409s. Fixes [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559). |
| Hub CLI auth | [#7631](https://github.com/agentscope-ai/QwenPaw/pull/7631) | Built-in CLI commands (`qwenpaw agents list`, etc.) now pick up the Hub runtime boundary token instead of failing with 401 inside local sandboxes. Fixes [#7612](https://github.com/agentscope-ai/QwenPaw/issues/7612). |
| Shell tool | [#7598](https://github.com/agentscope-ai/QwenPaw/pull/7598) | Detaches child stdin from interactive console on Windows and adds `CREATE_NEW_PROCESS_GROUP` handling. Fixes [#7554](https://github.com/agentscope-ai/QwenPaw/issues/7554). |
| MCP | [#7627](https://github.com/agentscope-ai/QwenPaw/pull/7627) | Lets the legacy MCP handshake arbitrate a 401 "discover probe" so static-token endpoints don't get falsely flagged as "requires OAuth". Fixes [#7620](https://github.com/agentscope-ai/QwenPaw/issues/7620). |
| Console UI | [#7502](https://github.com/agentscope-ai/QwenPaw/pull/7502) | Redesigns sidebar and settings experience; replaces simple/full sidebar modes with one configurable sidebar; preserves plugin slots. |
| Plugin manager | [#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605) | Preserves marketplace tab/context after install/update, detects available updates for official + community plugins, and adds batch update. Fixes [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582). |
| Localization | [#7482](https://github.com/agentscope-ai/QwenPaw/pull/7482) | Adds zh/en localization to the Agent Kanban PawApp, following the live QwenPaw language setting. |

### Open PRs advancing the roadmap

- **Memory backend plugin architecture:** [#7616](https://github.com/agentscope-ai/QwenPaw/pull/7616) completes the migration of ADBPG and PowerContext out of core into independently packaged memory plugins.
- **New memory backend:** [#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613) adds an optional **OpenViking** long-term memory backend (REST-based scope from #7252).
- **Skills metadata:** [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609) exposes optional skill versions and validates MCP/env/bin declarations, logging+skipping unavailable skills.
- **Mobile UX:** [#7623](https://github.com/agentscope-ai/QwenPaw/pull/7623) adds a pinned-agents entry in the mobile sidebar.
- **Per-session models:** [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) (open since July 12) is still under review.

---

## 4. Community Hot Topics

By comment volume in the last 24 hours:

1. **[#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — Model's reply unexpectedly lost from context (8 comments, OPEN).** Reports that assistant replies persist but vanish from subsequent requests, producing empty responses on v2.2.0. The author already verified `_maybe_stamp_finished_at` is present in `runtime/executor.py`. This is a session-state persistence bug — the highest-impact open issue of the day, no fix PR visible yet.
2. **[#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) — Tool-returned image/PDF binary as bare base64 (`"type":"data"`) triggers 400 (6 comments, CLOSED).** Drafted with AI assistance; describes a content-block shape mismatch with OpenAI-compatible providers. Closed, likely via the same PDF-blocks normalization line as #7621 / #7636.
3. **[#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) — 409 on new messages during task execution (5 comments, CLOSED).** A user expectation conflict: the user expects a queue, the server returned `409 {"detail":"A task is already running"}`. Closed after [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) redirected submissions into the existing queue.
4. **[#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) — Synchronous calls freeze event loop, timeout never fires (5 comments, OPEN since 2026-08-27).** Windows Desktop 2.1.1b1 freezes 118–135 s at startup and ~126 s on send. A long-running, high-impact **open** bug — see *Backlog Watch*.
5. **[#7469](https://github.com/agentscope-ai/QwenPaw/issues/7469) — ReMe background embedding/indexing job fails: `as_embedding:default` accessed before start (5 comments, CLOSED).** Silent failure on OpenAI-compatible embeddings. Closed without an explicit PR link in the visible data.
6. **[#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589) — Heartbeat cron session feedback loop / duplicate message pile-up (4 comments, OPEN).** High severity per author: agent became unresponsive for ~2 hours and required manual intervention. Regression on v2.0.1 still present on `main` as of 2026-09-06.
7. **[#7615](https://github.com/agentscope-ai/QwenPaw/issues/7615) — Where to ask about third-party plugins / skills / deployment (1 comment, 3 reactions, OPEN).** Lightweight but the most *reacted-to* item today — signals user demand for clearer off-repo support channels and points to the AgentScope Platform community.

**Underlying needs across the top items:** users want (a) reliable session persistence so models can "see" their own prior output, (b) graceful queuing instead of error responses under load, (c) the event loop / async runtime to actually honor timeouts rather than freezing the UI, and (d) better discoverability of where to file issues for plugins/skills.

---

## 5. Bugs & Stability

Ranked by user-reported severity:

### High severity — open, no merged fix visible

- **[#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589) — Heartbeat cron duplicate pile-up.** Agent rendered unresponsive for ~2 hours. Affects deployed v2.0.1; verified reproducible on `main`. *No PR linked.*
- **[#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — Model loses its own reply from context.** Persistent session history contradicts the live request; produces empty model responses. *No PR linked.*
- **[#7619](https://github.com/agentscope-ai/QwenPaw/issues/7619) — Conversation ends unexpectedly on Windows 11 with qwen-35B-A3B-FP8.** Reproduces on v2.2.0; no diagnostic data in the issue body. *No PR linked.*
- **[#7625](https://github.com/agentscope-ai/QwenPaw/issues/7625) — Gemini 400 after background tool completion.** "Requests ending with a model turn are not supported"; reproducible after a tool is offloaded/interrupted. *No PR linked.*
- **[#7363](https://github.com/agentscope-ai/QwenPaw/issues

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-09

## 1. Today's Overview

ZeroClaw shows intense architectural and stability work on 2026-09-09, with 24 issues updated and 47 open PRs but no releases shipped. Activity is dominated by mature RFC discussion (sessions, plugins, sandboxing, file attachments) reaching Revision 5/10 stages, plus a wave of P1 bug reports around prompt-cache invalidation and history trimming that directly affect token cost and provider compatibility. Three PRs closed in the last 24 hours, but the queue remains heavy on `needs-maintainer-review` and `needs-author-action` items, signalling a project in deep design refinement rather than rapid delivery.

## 2. Releases

No new releases in the past 24 hours. The most recent reference in the data set is `v0.8.5` (referenced in [Issue #10688](https://github.com/zeroclaw-labs/zeroclaw/issues/10688)).

## 3. Project Progress

**Merged / Closed PRs in the last 24h:**

- **[PR #10718](https://github.com/zeroclaw-labs/zeroclaw/pull/10718) — `feat(cost): attribute ledger records to the chat conversation`** (closed). Advances per-conversation cost attribution by fixing the daemon-lifetime session id; partially resolves [Issue #10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700), with trace correlation remaining open.
- **[PR #10719](https://github.com/zeroclaw-labs/zeroclaw/pull/10719) — `fix(providers): preserve tool image references through normalization`** (closed). Prevents loss of original path/URL when tools emit image markers, helping agents deliver or chain image attachments.
- **[PR #10717](https://github.com/zeroclaw-labs/zeroclaw/pull/10717) — `Feat/native security and helpers v2`** (closed). Bundle of native security/helper changes spanning channels, memory, cron, runtime, and provider layers.

**Notable PRs advancing in review but still open:**

- [PR #10716](https://github.com/zeroclaw-labs/zeroclaw/pull/10716) — Prices cache writes at the configured write premium (Anthropic 1.25x / 2x TTL); closes a real cost-tracking gap.
- [PR #10605](https://github.com/zeroclaw-labs/zeroclaw/pull/10605) — Anthropic extended thinking passthrough on OpenAI-compatible gateways, unlocking LiteLLM-style routing.
- [PR #9977](https://github.com/zeroclaw-labs/zeroclaw/pull/9977) — Workspace-confined filesystem mutations with symlink-safe enforcement.
- [PR #9724](https://github.com/zeroclaw-labs/zeroclaw/pull/9724) — `always_ask` survives Full autonomy in approval policy.
- [PR #9320](https://github.com/zeroclaw-labs/zeroclaw/pull/9320) — Wall-clock timeout on cron agent jobs that releases the lock.

## 4. Community Hot Topics

| # | Item | Title | Comments |
|---|------|-------|----------|
| 1 | [Issue #9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | RFC: Runtime-owned conversation sessions and transport surface adapters | 35 |
| 2 | [Issue #9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | RFC: Unified file and attachment architecture for conversation surfaces | 28 |
| 3 | [Issue #6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | RFC: Granular sandbox policy - filesystem restrictions | 26 |
| 4 | [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | Tracker: Maintainer decision queue for RFCs and design issues | 15 |
| 5 | [Issue #10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) | RFC: Composable WASM plugin runtime architecture | 11 |

**Analysis:** The most-discussed threads are RFCs converging on three structural needs: (a) a single runtime-owned session model (replacing mutable conversation messages), (b) a unified file/attachment surface across channels (Telegram, WhatsApp, ACP), and (c) a granular filesystem sandbox that reconciles application-layer policy with OS-level backends (Bubblewrap, Landlock, Seatbelt). The maintainer decision tracker [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) and the RFC-process simplification RFC [Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) point to community pressure to streamline governance itself. Underlying need: contributors want a stable substrate (sessions + files + plugins) so downstream channel/provider/tool work becomes additive rather than re-architectural.

## 5. Bugs & Stability

Ranked by severity (P1 first), with linked fix PRs where present:

| Sev | Issue | Title | Status | Linked PR |
|-----|-------|-------|--------|-----------|
| **P1** | [#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) | Failed ACP turns disappear after switching sessions | In progress | — |
| **P1** | [#10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674) | History trimming stops at the cap, defeating prompt caching | Accepted | — |
| **P2** | [#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701) | Image attachments invalidate the whole history cache prefix | Open | [PR #10719](https://github.com/zeroclaw-labs/zeroclaw/pull/10719) closed today |
| **P2** | [#10702](https://github.com/zeroclaw-labs/zeroclaw/issues/10702) | Token-budget history trimming stops at the first fit (same hysteresis gap) | Open | — |
| **P2** | [#10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700) | Cost records carry a daemon-lifetime session id | Open | [PR #10718](https://github.com/zeroclaw-labs/zeroclaw/pull/10718) closed today (partial) |
| **P2** | [#10667](https://github.com/zeroclaw-labs/zeroclaw/issues/10667) | ZeroCode duplicates streamed response when prompt completion precedes TurnComplete | In progress | — |
| **P3** | [#10702-related #10674/#10702]** | (already listed above) | — | — |
| **P3** | [#10326](https://github.com/zeroclaw-labs/zeroclaw/issues/10326) | Reliable streaming errors report requested model, not served pinned model | Accepted (closed today) | — |
| Closed | [#10688](https://github.com/zeroclaw-labs/zeroclaw/issues/10688) | WhatsApp Web voice notes never transcribed | Closed today | — |

**Pattern:** Today's most acute correctness bugs cluster around prompt-cache prefix stability and history trimming ([#10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674), [#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701), [#10702](https://github.com/zeroclaw-labs/zeroclaw/issues/10702)) — these directly inflate Anthropic/compatible-provider costs and need a coordinated fix, not three independent patches. The ACP turn-disappearance bug [#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) remains the highest-impact workflow blocker.

## 6. Feature Requests & Roadmap Signals

A cluster of OpenAI Responses enhancements from contributor IftekharUddin suggests the next release cycle will harden the Astra/Responses adapter path:

- [#10704](https://github.com/zeroclaw-labs/zeroclaw/issues/10704) — Asynchronous function tools on Responses
- [#10705](https://github.com/zeroclaw-labs/zeroclaw/issues/10705) — `max` reasoning effort for compatible OpenAI models
- [#10706](https://github.com/zeroclaw-labs/zeroclaw/issues/10706) — Preserve opaque reasoning state across Responses call paths
- [#10707](https://github.com/zeroclaw-labs/zeroclaw/issues/10707) — Bounded programmatic tool calling via Responses
- [#10708](https://github.com/zeroclaw-labs/zeroclaw/issues/10708) — Active-response steering on Responses WebSockets
- [#10709](https://github.com/zeroclaw-labs/zeroclaw/issues/10709) — Docs: Astra setup for API-key and Codex subscription

Other near-term feature signals:

- [#10715](https://github.com/zeroclaw-labs/zeroclaw/issues/10715) — Passive group context for Telegram (parity with WhatsApp Web [#8379](https://github.com/zeroclaw-labs/zeroclaw/issues/8379)).
- [#10641](https://github.com/zeroclaw-labs/zeroclaw/issues/10641) — Per-field cron schedule input in the Web UI (help wanted).
- [#9727](https://github.com/zeroclaw-labs/zeroclaw/issues/9727) — Epic: multi-agent sidebar in ZeroCode.
- [PR #10553](https://github.com/zeroclaw-labs/zeroclaw/pull/10553) — "Add selected text to chat" in ZeroCode (already a draft PR).
- [PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) — Native Hailo-Ollama provider support.

**Prediction:** The next minor release is likely to land Responses reasoning-state preservation ([#10706](https://github.com/zeroclaw-labs/zeroclaw/issues/10706)) and the cost cache-write pricing fix ([PR #10716](https://github.com/zeroclaw-labs/zeroclaw/pull/10716)) together, since both touch the same provider-cost path. Multi-agent ZeroCode ([#9727](https://github.com/zeroclaw-labs/zeroclaw/issues/9727)) is a larger epic and unlikely to ship in one cycle.

## 7. User Feedback Summary

Real pain points expressed in today's items:

- **Cost invisibility / inaccuracy.** Users cannot separate spend per conversation because `CostTracker.session_id` is daemon-lifetime ([#10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700)), and cache writes are billed at the wrong rate ([PR #10716](https://github.com/zeroclaw-labs/zeroclaw/pull/10716)).
- **Prompt-cache thrash on multimodal turns.** Adding a single image to a long session wipes the cache prefix, multiplying token spend on Anthropic gateways ([#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)).
- **Telegram multi-image UX.** Sending multiple images produces N independent LLM turns instead of one multimodal turn ([#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514)).
- **WhatsApp voice notes never transcribed** on v0.8.5 regardless of config ([#10688](https://github.com/zeroclaw-labs/zeroclaw/issues/10688)).
- **ACP workflows silently lose failed turns** when the user navigates between sessions ([#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)) — flagged S1, workflow blocked.
- **Cron scheduling UX** is a freeform text field with no validation or human-readable preview ([#10641](https://github.com/zeroclaw-labs/zeroclaw/issues/10641)) — community labelled "help wanted".
- **ZeroCode stream duplication** when prompt completion races TurnComplete ([#10667](https://github.com/zeroclaw-labs/zeroclaw/issues/10667)).

No explicit satisfaction signals were captured in the last-24h sample; sentiment is dominated by bug and feature requests rather than positive feedback.

## 8. Backlog Watch

Items needing maintainer attention, ordered by staleness and impact:

| # | Item | Created | Why it needs attention |
|---|------|---------|------------------------|
| 1 | [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 2026-07-04 | Maintainer decision queue itself; 5+ RFCs are blocked behind this tracker. |
| 2 | [Issue #9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | 2026-07-28 | Revision 5 RFC, 35 comments; the prior vote is invalid and must be re-snapshotted. |
| 3 | [Issue #9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | 2026-07-28 | Revision 10 RFC, 28 comments; same vote-snapshot churn. |
| 4 | [Issue #6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | 2026-05-28 | Granular sandbox RFC in-progress since May; foundational for any filesystem PR ([PR #9977](https://github.com/zeroclaw-labs/zeroclaw/pull/9977), [PR #10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337)) downstream. |
| 5 | [Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) | 2026-09-02 | Process-level RFC asking to drop mandatory discussion windows; affects velocity of every other RFC. |
| 6 | [Issue #10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) | 2026-08-18 | WASM plugin RFC, revised 2026-09-01; gates all plugin-system work. |
| 7 | [Issue #10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) | 2026-09-01 | Append-only session events RFC; designated by #10076 as authoritative. |
| 8 | [PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) | 2026-07-17 | Native Hailo-Ollama provider — flagged `do-not-merge`, no movement in ~7 weeks. |
| 9 | [PR #10241](https://github.com/zeroclaw-labs/zeroclaw/pull/10241) | 2026-08-22 | Channel shell-approval routing — status `blocked`, touches 11 channels. |
| 10 | [PR #9212](https://github.com/zeroclaw-labs/zeroclaw/pull/9212) | 2026-07-20 | Eval regression CI gate — `do-not-merge`, ~7 weeks stale. |

**Health signal:** The bottleneck is governance throughput, not engineering capacity. Six RFCs have moved to Revision ≥5/Revision ≥10 because old vote snapshots keep invalidating; resolving [Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) and clearing [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) would unblock a large fraction of open work.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*