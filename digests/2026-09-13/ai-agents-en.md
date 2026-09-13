# OpenClaw Ecosystem Digest 2026-09-13

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-13 11:31 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-13

## 1. Today's Overview

OpenClaw had an extremely high-throughput day with **1,000 items updated** across issues and PRs in 24 hours, but with **zero new releases** — a notable signal given the backlog of P0 release-blockers. Roughly 45% of issues and PRs moved from open → closed in the same window, indicating maintainers are actively triaging. The activity is dominated by **stability and lifecycle bugs** in core subsystems (subagent sessions, SQLite state, Gateway restarts, MCP plugin lifecycle, and update reliability on the 2026.9.3/9.4 line). Community discussion is concentrated on a small set of diamond-lobster-rated regressions rather than a wide distribution of concerns, suggesting a coherent problem cluster rather than scattered complaints.

## 2. Releases

**No new releases in the last 24 hours.** Given multiple open P0 release-blockers (#145252, #145929, #112475, #145510, #140162), a 2026.9.5 patch line is plausibly imminent but has not shipped.

## 3. Project Progress

**Closed/advanced work today** (highlights from 226 closed PRs):

- **Subagent lifecycle refactor landed.** [#67777](https://github.com/openclaw/openclaw/issues/67777) (CLOSED) — completion-delivery can be lost on timeout/drain/orphan-prune. A long-running diamond-lobster issue closed in tandem with PR work.
- **Telegram internal-context leak fixed.** [#137927](https://github.com/openclaw/openclaw/issues/137927) — the `<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` block rendered visibly in user messages (security/UX P1) was resolved.
- **Provider malformed-JSON regression closed.** [#135111](https://github.com/openclaw/openclaw/issues/135111) — intermittent "malformed JSON arguments" on claude-sonnet-5 / v2026.8.1.
- **Cron session reaper event-loop fix shipped.** [#142476](https://github.com/openclaw/openclaw/issues/142476) (CLOSED) — synchronous `PRAGMA integrity_check` was blocking 14–76s on 632-agent gateways. (Closes the fix-for-#139583 thread.)
- **WeChat dispatch error closed.** [#145563](https://github.com/openclaw/openclaw/issues/145563) — `PreparedModelCatalogConfigReplacedError` on `openclaw-weixin`.
- **SQLite transcript companion features merged** (all from the #79902 umbrella): [#79904](https://github.com/openclaw/openclaw/issues/79904) cursored read API, [#79903](https://github.com/openclaw/openclaw/issues/79903) session lineage discovery, [#79905](https://github.com/openclaw/openclaw/issues/79905) typed projections. A coherent shipping of the SQLite-first session-store refactor (#78595).
- **Several Discord/Telegram bugs closed:** [#79752](https://github.com/openclaw/openclaw/issues/79752) gzip decode under Node v26, [#26494](https://github.com/openclaw/openclaw/issues/26494) Telegram single-message streaming regression, [#90444](https://github.com/openclaw/openclaw/issues/90444) stuck `task_runs` after subagent kill.
- **Auth/cross-backend feature work closed** but stale: [#78041](https://github.com/openclaw/openclaw/issues/78041) cold-path auth latency (4s), [#79047](https://github.com/openclaw/openclaw/issues/79047) cross-backend conversation context, [#58057](https://github.com/openclaw/openclaw/issues/58057) dynamic allowlist identity, [#60381](https://github.com/openclaw/openclaw/issues/60381) browser tool `force` click, [#71326](https://github.com/openclaw/openclaw/issues/71326) cross-exec stale file reads.
- **Retry runner timer fix merged:** PR [#145718](https://github.com/openclaw/openclaw/pull/145718) — uncapped `Retry-After` no longer collapses to 1 ms.
- **macOS launcher work, gateway uptime in debug overlay, browser session-tab refactor, scripts reliability fixes, Linux companion recovery state** all advanced through fresh PRs ([#146976](https://github.com/openclaw/openclaw/pull/146976), [#146960](https://github.com/openclaw/openclaw/pull/146960), [#146973](https://github.com/openclaw/openclaw/pull/146973), [#146857](https://github.com/openclaw/openclaw/pull/146857), [#146214](https://github.com/openclaw/openclaw/pull/146214) codex canonical sandbox policy).

## 4. Community Hot Topics

**Top by comment volume:**

1. **[#97616](https://github.com/openclaw/openclaw/issues/97616) — Hook/tool child-process zombie leak (31 comments, OPEN)** — A long-running P1 silver-shellfish bug about unreaped `openclaw-hooks`/`bash`/`codex` children accumulating under the parent. Underlying need: OpenClaw's hook execution model needs a reaper/wait-id abstraction, and the absence is degrading multi-day gateways.
2. **[#135111](https://github.com/openclaw/openclaw/issues/135111) — Malformed tool-call JSON on claude-sonnet-5 (27 comments, CLOSED)** — Community-driven reproduction across independent users narrowed the failure to provider-side argument truncation rather than tool-schema issues.
3. **[#44925](https://github.com/openclaw/openclaw/issues/44925) — Subagent completion silently lost (27 comments, OPEN, 2 👍)** — The flagship "diamond lobster" complaint about Telegram forum bots losing child completions with no retry/notification/restart. Closely mirrors #67777 (just closed), suggesting the fix didn't cover all code paths.
4. **[#137927](https://github.com/openclaw/openclaw/openclaw/issues/137927) — Internal context block leaked to Telegram (14 comments, CLOSED)** — Security-relevant (visible scaffolding reveals internal instructions); closed but the topic surfaced widespread concern about prompt-injection exposure.
5. **[#114612](https://github.com/openclaw/openclaw/issues/114612) — memory-core SQLite unbounded growth (14 comments, OPEN)** — Production evidence of unbounded `memory_index_chunks` + `memory_embedding_cache` tables; a ticking-disk-fill bomb for long-running installations.
6. **[#144911](https://github.com/openclaw/openclaw/issues/144911) — MCP init timeout crashes Gateway (13 comments, OPEN)** — Unhandled rejection in MCP child-cleanup takes the whole Gateway down; high-impact because MCP servers are increasingly load-bearing.
7. **[#139847](https://github.com/openclaw/openclaw/issues/139847) — Message dropped during active reply run (12 comments, OPEN)** — Regression in 2026.9.2: concurrent inbound messages on an active session key fail with "no active tool authority snapshot" and are silently dropped.
8. **[#144502](https://github.com/openclaw/openclaw/issues/144502) — WhatsApp TTS voice notes (12 comments, OPEN)** — Mobile WA rejects 48 kHz + Lavf vendor-tag audio; a media-pipeline bug affecting a user-visible feature.
9. **[#142476](https://github.com/openclaw/openclaw/issues/142476) — Cron reaper integrity_check blocking (12 comments, CLOSED)** — A 632-agent gateway pinning one core for tens of seconds; **classic operationally-expensive bug**, closed promptly with fix.
10. **[#136183](https://github.com/openclaw/openclaw/issues/136183) — ssh spawned by command executor hangs (12 comments, OPEN)** — Regression in 2026.8.1; the executor kills ssh before the server banner exchange completes. Underlying need: PTY/spawn semantics for long-lived interactive commands.

**Underlying community needs surfaced:** (a) a unified, hardened process-lifecycle manager for hooks/MCP/SSH; (b) retry + backoff semantics for subagent/orphan completion delivery (not just "first attempt"); (c) memory store size governance; (d) better tool-call authority tracking across overlapping reply runs on the same session key.

## 5. Bugs & Stability

**Severity-ranked (P0 release-blockers first):**

| Sev | Issue | Status | Notes |
|---|---|---|---|
| **P0** | [#145252](https://github.com/openclaw/openclaw/issues/145252) — 2026.9.3/9.4 update/upgrade/recovery tracking | OPEN | Umbrella for all update-related crashes; no committed fix yet. |
| **P0** | [#145929](https://github.com/openclaw/openclaw/issues/145929) — Auth-profile logout permanently fails (lock-may-be-busy) | OPEN | Lock state survives an interrupted self-update; zero competing processes. |
| **P0** | [#112475](https://github.com/openclaw/openclaw/issues/112475) — Device pairing recovery fails after removal | OPEN | Gateway 2026.7.1 / CLI 2026.6.9; full device scope upgrade blocked. |
| **P0** | [#145510](https://github.com/openclaw/openclaw/openclaw/issues/145510) — Update fails at `runtime-verification-failed` | OPEN | 2026.9.3 → 2026.9.4 on win32/x64. |
| **P0** | [#140162](https://github.com/openclaw/openclaw/issues/140162) — Windows gateway restart kills ready gateways (181s stale cleanup) | OPEN | Compounds during slow boots; affects foreground-managed gateways too. |
| **P0** | [#145072](https://github.com/openclaw/openclaw/issues/145072) — macOS npm update fails at global-install-swap | CLOSED | Rollback launcher backup failed (symlink mode + chmod). |
| **P0** | [#133331](https://github.com/openclaw/openclaw/pull/133331) — UI: stale session actions after agent switches (PR) | OPEN | Diamond-lobster UI correctness, has ready PR. |
| **P0** | [#145563](https://github.com/openclaw/openclaw/issues/145563) — WeChat `PreparedModelCatalogConfigReplacedError` | CLOSED | |
| **P1 diamond** | [#44925](https://github.com/openclaw/openclaw/issues/44925), [#144911](https://github.com/openclaw/openclaw/issues/144911), [#139847](https://github.com/openclaw/openclaw/issues/139847), [#137332](https://github.com/openclaw/openclaw/issues/137332), [#115367](https://github.com/openclaw/openclaw/issues/115367), [#132765](https://github.com/openclaw/openclaw/issues/132765), [#141474](https://github.com/openclaw/openclaw/issues/141474), [#145152](https://github.com/openclaw/openclaw/issues/145152), [#106704](https://github.com/openclaw/openclaw/issues/106704), [#118885](https://github.com/openclaw/openclaw/issues/118885) | OPEN | Subagent/session lifecycle, MCP, auth gates, swarm. None has a confirmed merged fix. |
| **P1 platinum** | [#63216](https://github.com/openclaw/openclaw/issues/63216), [#135111](https://github.com/openclaw/openclaw/issues/135111), [#144502](https://github.com/openclaw/openclaw/issues/144502), [#134993](https://github.com/openclaw/openclaw/issues/134993), [#86214](https://github.com/openclaw/openclaw/issues/86214), [#135858](https://github.com/openclaw/openclaw/issues/135858) | OPEN/CLOSED | Mix of regressions and platform-specific runtime issues. |

**Crash/regression hot-spots on the 2026.9.x line:** MCP child cleanup (#144911), cron reaper (#142476 ✅), 9.2 message drop (#139847), 9.3 WAL blow-up (#143524), 9.3/9.4 update path (#145252/#145510/#145072). **Five of seven 9.x-line bugs converge on SQLite or process lifecycle.**

## 6. Feature Requests & Roadmap Signals

- **Cursored SQLite transcript read API for companions** — [#79904](https://github.com/openclaw/openclaw/issues/79904) ✅ shipped today; expected to enable third-party UIs/TUIs that watch the canonical store.
- **Typed transcript projections + rebuild contract** — [#79905](https://github.com/openclaw/openclaw/issues/79905) ✅ shipped; signals the canonical-event store is the long-term read path.
- **Session lineage and `sessionId` discovery across rotations** — [#79903](https://github.com/openclaw/openclaw/issues/79903) ✅ shipped; closes a gap with the new SQLite runtime.
- **Configurable `memory_search` / `memory_get` deadline** — PR [#140933](https://github.com/openclaw/openclaw/pull/140933) (OPEN, diamond-lobster) makes the hard-coded 15s tunable. **High probability of inclusion in 2026.9.5.**
- **Skill Workshop proposal-context narrowing** — PR [#146977](https://github.com/openclaw/openclaw/pull/146977) (follows up on bug [#145503](https://github.com/openclaw/openclaw/issues/145503) from today).
- **Browser session-tab refactor for storage-worker cutover** — PR [#146973](https://github.com/openclaw/openclaw/pull/146973) (OPEN); signals storage-worker migration is mid-flight.
- **Long-standing roadmap ideas still pending:** bundled version-matched docs + native retrieval for onboarding ([#71301](https://github.com/openclaw/openclaw/issues/71301)), accessibility "linear persistent workspace" mode for blind users ([#82450](https://github.com/openclaw/openclaw/issues/82450)), browser tool `force` click ([#60381](https://github.com/openclaw/openclaw/issues/60381)), cross-backend conversation context ([#79047](https://github.com/openclaw/openclaw/issues/79047)), dynamic allowlist identity ([#58057](https://github.com/openclaw/openclaw/issues/58057)).
- **Codex canonical sandbox read policy** — PR [#146214](https://github.com/openclaw/openclaw/pull/146214) (XL, compatibility-risk) is the largest PR in flight; broad-area tagged, suggests a near-term Codex-platform release.

## 7. User Feedback Summary

**Pain points (real production users):**

- **Operational reliability:** Several users on multi-agent gateways (e.g., 632 agents) describe sub-second responsiveness degrading to 14–76s blocks because of synchronous SQLite operations or unhandled rejections. (#142476, #118885, #143524.)
- **Telegram forum users** are vocal: silently-lost subagent completions, internal context leaking to user-visible text, detached subagents running invisibly. (#44925, #137927, #101656.)
- **

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Personal AI Assistant / Agent Open-Source Ecosystem
**Snapshot date: 2026-09-13** · Projects: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The personal AI assistant layer is converging on a shared architecture — a long-lived daemon/gateway orchestrating LLM turns, tool/subagent processes, and a local SQLite-backed session store — and, as a result, is hitting a shared class of problems. Across all five projects, the dominant bug traffic on this date concerns **state-store concurrency, durable turn history, and child-process supervision**, not model quality or prompt behavior. Messaging-channel adapters (Telegram, WhatsApp, WeChat, Discord) and MCP/ACP protocol interop form the second major axis of work. Notably, **zero of the five projects cut a release in this window**: the ecosystem is in a fix-and-harden posture, with OpenClaw and Hermes in active hotfix cycles and ZeroClaw explicitly retooling its release process.

---

## 2. Activity Comparison

| Project | Issue activity (24h) | PR activity (24h) | Release status | Health score* |
|---|---|---|---|---|
| **OpenClaw** | ~1,000 combined issues+PRs¹ | 226 PRs closed; ~45% of touched items closed | None; 2026.9.5 plausibly imminent (5 open P0 blockers) | **7.5** — highest throughput and closure ratio in cohort, but P0 backlog concentrated on the update path |
| **Hermes Agent** | 50 updated | 50 updated; 12 merged/closed | None; v0.21.2 current (2026-09-11), v0.21.3 hotfix expected in 24–48h | **7.0** — exemplary incident convergence (6 competing fix PRs in one day), but v0.21.2 shipped a P0-class regression |
| **ZeroClaw** | 34 updated (6 closed) | 50 updated (12 merged/closed) | None; post-v0.8.5 stabilization cycle | **6.0** — steady hardening cadence, but every open P0 lacks a linked fix PR |
| **QwenPaw** | 8 touched | 2 open fixes, 0 merged | None | **5.5** — targeted protocol fixes stalled in review; user-facing durability complaints unanswered |
| **IronClaw** | 0 | 1 open PR (test-only) | None | **n/a** — insufficient signal |

¹OpenClaw's digest reports combined issue+PR volume; per-type split unavailable.
*Scores are relative, derived from throughput, closure ratio, P0 exposure, and maintainer responsiveness.

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Scale and throughput** are an order of magnitude beyond the cohort (~1,000 items/day vs. 50–100 for the next tier), with a ~45% same-day closure ratio indicating genuine triage capacity, not just backlog churn.
- **Deployment evidence** is unmatched: community reports reference 632-agent gateways, multi-day uptimes, and four live messaging channels (Telegram, WhatsApp, WeChat, Discord). No peer shows comparable production-scale usage in its tracker.
- **Architectical depth on the state layer**: today's landing of the SQLite-first session-store suite (#79904 cursored read API, #79903 lineage discovery, #79905 typed projections) explicitly targets a third-party companion/UI ecosystem — an ecosystem play no peer is making yet.

**Technical approach differences:** OpenClaw is betting on a canonical SQLite event store as the read path for external clients, with a storage-worker migration and Codex sandbox platform work in flight (#146973, #146214). Hermes multiplexes gateway + CLI + Desktop + cron writers onto one `state.db` (currently its failure mode); ZeroClaw is a Rust daemon with an RPC/ACP surface; QwenPaw centers a plugin-store + Driver architecture.

**Honest risk flag:** Five of seven OpenClaw 9.x-line bugs converge on SQLite or process lifecycle — the same subsystem class that produced Hermes' worst outage this week (#109509 → `DeletedWalGenerationError`). OpenClaw's larger investment mitigates this but does not exempt it; five open P0s sit on the update path (#145252, #145929, #112475, #145510, #140162).

**Community size:** Largest by every observable proxy — comment volume (31- and 27-comment threads), issue-ID lifetime volume (~146k vs. ~109k Hermes, ~10.8k ZeroClaw, ~7.7k QwenPaw), and breadth of platform-specific reporters.

---

## 4. Shared Technical Focus Areas

Requirements emerging across multiple projects:

| Emerging requirement | Projects | Evidence |
|---|---|---|
| **Multi-writer SQLite / session-state durability** | OpenClaw, Hermes, QwenPaw | Hermes: ~15 of 30 top issues are WAL/lock wedges from short-lived writers; OpenClaw: WAL blow-up (#143524), sync `integrity_check` blocking 14–76s (#142476); QwenPaw: session loss after redeploy (#7724, prior #7708) |
| **No-silent-loss turn/completion delivery** | OpenClaw, ZeroClaw, QwenPaw | OpenClaw: lost subagent completions (#44925), dropped messages on active runs (#139847); ZeroClaw: failed ACP turn wipes accepted prompt + tool history (#10788, #10673), resync cancels running turns (#10785) |
| **Child-process supervision (MCP/hooks/SSH)** | OpenClaw, Hermes | OpenClaw: zombie leak (#97616), MCP init timeout crashes Gateway (#144911), ssh hang (#136183); Hermes: `_refresh_tools` crash on MCP restart (#109824) |
| **MCP/ACP/A2A cross-SDK interop** | QwenPaw, OpenClaw, Hermes, ZeroClaw | QwenPaw: Java/Kotlin SDK error envelope (#7728/#7729), ACP permission matching (#7732), A2A roadmap demand (#7484); Hermes: SDK 2.x `readOnlyHint` casing, Zoho Calendar (#47963); ZeroClaw: ACP persistence cluster |
| **Update/packaging reliability** | OpenClaw, ZeroClaw, Hermes | OpenClaw: 5-member P0 update cluster; ZeroClaw: crates.io packaging + Windows symlinks (#9381), release-efficiency tracker (#10814); Hermes: false "update available" on shallow clones (#98214) |
| **Provider retry/backoff/fallback discipline** | ZeroClaw, OpenClaw, Hermes | ZeroClaw: no backoff on 529 (#10787), unused non-streaming fallback (#10736), 429 retried sub-second (#10779); OpenClaw: uncapped `Retry-After` → 1ms (#145718); Hermes: Copilot/Fireworks/key_cmd adapter fragility |
| **Resource governance (disk/cost)** | OpenClaw, ZeroClaw | OpenClaw: unbounded `memory_index_chunks` growth (#114612); ZeroClaw: cost-ledger undercounting (#10699), broken per-profile caps (#10635, #10645) |
| **Windows parity** | ZeroClaw, OpenClaw | ZeroClaw: stack overflow in RPC dispatcher (#10734), 3 advisory-job failures; OpenClaw: win32 update failure (#145510), gateway-restart kills (#140162) |

---

## 5. Differentiation Analysis

| Project | Core architecture | Primary surface | Evident target user |
|---|---|---|---|
| **OpenClaw** | Node gateway, SQLite-first canonical event store, multi-agent orchestration | 4 messaging channels, browser tool, skills workshop, companion UIs | Operators of production multi-agent assistants at gateway scale |
| **Hermes Agent** | Python, multi-process profile multiplexing (gateway/CLI/cron/Desktop) | TUI + Desktop GUI, broad provider matrix, kanban/cron automation | Power users with heterogeneous providers; thin-client Desktop direction (#50643, 👍14) |
| **IronClaw** | Turn-state metadata engine (`TurnRunState` lineage) | Not observable from window | Research/internal correctness-focused (NearAI) |
| **QwenPaw** | Plugin store + unified MCP/A2A Driver architecture | Console, plugin marketplace, Docker | Chinese-speaking users running multi-machine "maintenance butler" agents |
| **QwenPaw vs. ZeroClaw** contrast | — | — | QwenPaw optimizes plugin breadth; ZeroClaw optimizes daemon correctness, SOP workflows, and hard cost controls |
| **ZeroClaw** | Rust daemon, RPC/ACP, SOP engine, cost ledger | ZeroCode editor pane, TUI, service lifecycle | Developers wanting a self-hosted Rust daemon with enforceable budgets |

Key structural difference: OpenClaw and Hermes optimize for **conversational assistant breadth** (channels, providers, GUIs), ZeroClaw for **operational rigor** (ledger accuracy, durable history, deterministic releases), QwenPaw for **extensibility** (plugins, protocol Drivers). IronClaw is the only project showing pure correctness/QA investment with no user-visible surface in motion.

---

## 6. Community Momentum & Maturity

- **Tier 1 — Hyperactive iteration:** **OpenClaw** (~1,000 items/day; storage-worker migration, Codex platform PR, companion API all in flight) and **Hermes** (100 items/day; six competing fix PRs for one bug, coordinated supersession, community agents — "Team6" — submitting automated PRs). Both are shipping fast and breaking fast.
- **Tier 2 — Steady stabilization:** **ZeroClaw** — 12 PRs merged against durability/cost/packaging themes, plus a dedicated release-engineering tracker (#10814). This is a project maturing its process, not adding surface area.
- **Tier 3 — Low observable activity:** **QwenPaw** — correct priorities (protocol fixes) but zero merges this window and unanswered durability reports; **IronClaw** — single test PR, no community traction.
- **Maturity read:** OpenClaw shows the most mature triage machine but carries release debt (P0s open across two release lines); Hermes shows the fastest incident response but weakest pre-merge regression discipline; ZeroClaw shows the strongest release-discipline self-awareness.

---

## 7. Trend Signals

1. **The state layer is the battleground.** The single largest cross-project bug class is concurrent SQLite access from short-lived writers (Hermes' entire P0 day; OpenClaw's WAL/reaper cluster; QwenPaw's session loss). Durable, multi-writer-safe session stores are now table stakes, and projects without them (QwenPaw) are visibly bleeding trust.
2. **Durable turn history as a correctness contract.** "Silently dropped" is the recurring phrase across OpenClaw (#44925, #139847), ZeroClaw (#10788), and QwenPaw (#7724). Expect retry/backoff delivery semantics for turn completion to become a differentiating feature.
3. **Process supervision is an unsolved shared gap.** No project has a unified reaper/wait-id abstraction for hooks, MCP servers, and SSH children (OpenClaw #97616/#144911/#136183). This is a prime candidate for a shared library or spec.
4. **MCP fragmentation is real and widening.** SDK dialect mismatches (Java envelopes, casing of hints, error shapes) are generating adapter bugs in four of five projects; A2A is the next protocol queue-jumper (QwenPaw #7484, ZeroClaw's ACP work).
5. **Self-update reliability drives churn.** OpenClaw's P0 cluster, ZeroClaw's packaging tracker, and Hermes' false-positive update checks all show that install/update paths — not runtime — are where projects lose users.
6. **Cost and disk governance are emerging differentiators**, especially for always-on assistants (ZeroClaw's cost ledger trio; OpenClaw's unbounded memory growth #114612).
7. **Agents as contributors:** Hermes' community-managed agent opening automated PRs (#109768) is an early dogfooding signal worth tracking — the ecosystem's tools are beginning to maintain themselves.

**Bottom line for developers:** OpenClaw leads on scale, channel breadth, and ecosystem architecture but must clear its update-path P0s; Hermes is the fastest-moving but pays for it in regression risk; ZeroClaw is the correctness/ops benchmark; QwenPaw needs durability investment before its plugin ambitions compound the problem.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-13

## 1. Today's Overview

Hermes Agent had an exceptionally high-velocity day with **50 issues and 50 PRs updated in the last 24 hours**, despite shipping no new releases. The dominant signal is a **regression cluster caused by the permission-hardening merged in PR #109509**, which introduced a `_secure_state_db_files()` helper that inadvertently drops POSIX SQLite locks during open/fchmod/close cycles, producing cascading `DeletedWalGenerationError` wedges across Linux and macOS. Maintainers and community responders triaged the issue aggressively — at least **six P0/P1 PRs** addressing the WAL-lock problem were opened and closed in the same day (PRs [#109841](https://github.com/NousResearch/hermes-agent/pull/109841), [#109754](https://github.com/NousResearch/hermes-agent/pull/109754), [#109759](https://github.com/NousResearch/hermes-agent/pull/109759), [#109752](https://github.com/NousResearch/hermes-agent/pull/109752), [#109734](https://github.com/NousResearch/hermes-agent/pull/109734)). Overall activity suggests the project is in a **hot patch-and-release cycle** rather than feature development mode.

## 2. Releases

**No new releases in the last 24 hours.** The most recent published version mentioned in the data is **v0.21.2 (2026-09-11)**, the build currently triggering the WAL regression reports.

## 3. Project Progress

**Merged/Closed PRs (12 total)** — the day is dominated by emergency fixes for the state.db/WAL regression:

- [#109841](https://github.com/NousResearch/hermes-agent/pull/109841) — **Teknium's salvage fix** for state.db WAL unlinking by short-lived writers; closes [#109786](https://github.com/NousResearch/hermes-agent/issues/109786) and [#109687](https://github.com/NousResearch/hermes-agent/issues/109687). Switches from `os.open/fchmod` to direct `os.chmod`.
- [#109754](https://github.com/NousResearch/hermes-agent/pull/109754) — chmod(2)-based variant of the same fix; closes [#109727](https://github.com/NousResearch/hermes-agent/issues/109727), fixes [#109728](https://github.com/NousResearch/hermes-agent/issues/109728).
- [#109759](https://github.com/NousResearch/hermes-agent/pull/109759) and [#109752](https://github.com/NousResearch/hermes-agent/pull/109752) — duplicate **macOS-specific** lock-preservation fixes (one closed in favor of the other).
- [#109734](https://github.com/NousResearch/hermes-agent/pull/109734) — **Linux-specific** `_secure_state_db_files` lock-preservation fix; fixes [#109728](https://github.com/NousResearch/hermes-agent/issues/109728).
- [#109819](https://github.com/NousResearch/hermes-agent/pull/109819) — Kanban circuit breaker must emit `blocked` event (later superseded by [#109843](https://github.com/NousResearch/hermes-agent/pull/109843)).
- Plus five additional closed PRs covering telemetry/network/install-update refinements.

The pace of merged fixes suggests **v0.21.3 hotfix is imminent**, given the severity tags (two P0s) and the broad environment matrix (Linux ext4, macOS APFS, single- and multi-profile gateways).

## 4. Community Hot Topics

Most-discussed threads (by comments and reaction count):

- **WAL/Session-state wedge** — [#109786](https://github.com/NousResearch/hermes-agent/issues/109786) (9 comments, closed) and [#109687](https://github.com/NousResearch/hermes-agent/issues/109687) (9 comments, closed) report that a single short-lived CLI invocation permanently wedges a running gateway's `state.db` WAL generation. Both are now fixed via PR [#109841](https://github.com/NousResearch/hermes-agent/pull/109841).
- **Permission-hardening regression** — [#109728](https://github.com/NousResearch/hermes-agent/issues/109728) (7 comments, open) attributes the same outage class to [#109509](https://github.com/NousResearch/hermes-agent/pull/109509)'s owner-only hardening, with a fix candidate in flight.
- **Custom-provider context bug** — [#86097](https://github.com/NousResearch/hermes-agent/issues/86097) (5 comments, open) — `/api/model/info` misreports the 256,000 fallback as "Auto-detected" for `custom_providers` installs. Has been open since 2026-08-14 with no resolution.
- **GitHub Copilot OAuth regression** — [#49582](https://github.com/NousResearch/hermes-agent/issues/49582) (5 comments, open, since 2026-06-20) — `gho_` tokens succeed via direct calls but fail with "PAT not supported" through Hermes. Highlights provider-integration fragility.
- **Desktop-only install with remote gateway** — [#50643](https://github.com/NousResearch/hermes-agent/issues/50643) (👍 14, open) is the **highest-reaction feature request**: enabling a thin Desktop GUI client that connects to a remote gateway without local CLI/agent components.

**Underlying community need:** users want **session resilience across multi-writer topologies** (gateway + cron + CLI + Desktop sharing one `state.db`), and the day's traffic shows the current locking model is not robust to concurrent SQLite writers with short lifecycles.

## 5. Bugs & Stability

### P0 — Critical, session outage
- [#109786](https://github.com/NousResearch/hermes-agent/issues/109786) — `hermes doctor` / short-lived connections unlink live WAL → gateway SIGBUS-equivalent. **Fix: PR #109841 merged.**
- [#109687](https://github.com/NousResearch/hermes-agent/issues/109687) — single plain CLI orphans gateway WAL on Linux ext4. **Fix: PR #109841 merged.**

### P1 — Severe, regressions and wedges
- [#109728](https://github.com/NousResearch/hermes-agent/issues/109728) — `_secure_state_db_files()` drops POSIX locks during fchmod. **Fix: PR #109754 (closed) and #109734 (closed, Linux-scoped).**
- [#109825](https://github.com/NousResearch/hermes-agent/issues/109825) — Regression 337ef8f8: fchmod through throwaway fd drops WAL dead-man-switch lock → SIGBUS (👍 1).
- [#109790](https://github.com/NousResearch/hermes-agent/issues/109790) — macOS `DeletedWalGenerationError` wedge for ~1h on brand-new sessions.
- [#109824](https://github.com/NousResearch/hermes-agent/issues/109824) — Two WAL bugs: cron writer causes inode conflict every 30 min; `_refresh_tools` crashes on `None` session during MCP restart.
- [#109823](https://github.com/NousResearch/hermes-agent/issues/109823) and [#109809](https://github.com/NousResearch/hermes-agent/issues/109809) — recurring `DeletedWalGenerationError` sticky across gateway restarts; Desktop App unusable.
- [#109819](https://github.com/NousResearch/hermes-agent/pull/109819) (PR, closed) — kanban circuit breaker never emits `blocked` events.

### P2 — Notable stability/UX bugs
- [#86097](https://github.com/NousResearch/hermes-agent/issues/86097) — `/api/model/info` fallback misreport.
- [#49582](https://github.com/NousResearch/hermes-agent/issues/49582) — Copilot OAuth regression.
- [#78497](https://github.com/NousResearch/hermes-agent/issues/78497) — TUI notification poller bypasses session context.
- [#101418](https://github.com/NousResearch/hermes-agent/issues/101418) — `skill_manage` validation gives generic errors, causing agent retry loops.
- [#109774](https://github.com/NousResearch/hermes-agent/issues/109774) — Auxiliary `title_generation` sends `reasoning` to non-reasoning providers (Fireworks 400).
- [#109837](https://github.com/NousResearch/hermes-agent/issues/109837) — `key_cmd` providers send `repr(token)` or empty credentials in metadata/aux paths.
- [#107528](https://github.com/NousResearch/hermes-agent/issues/107528) — Desktop `active-profile.json` is stale on relaunch; messages leak into wrong profile.

### P3 — Minor
- [#103410](https://github.com/NousResearch/hermes-agent/issues/103410), [#79874](https://github.com/NousResearch/hermes-agent/issues/79874), [#109806](https://github.com/NousResearch/hermes-agent/issues/109806), [#109805](https://github.com/NousResearch/hermes-agent/issues/109805), [#109756](https://github.com/NousResearch/hermes-agent/issues/109756), [#105710](https://github.com/NousResearch/hermes-agent/issues/105710), [#98214](https://github.com/NousResearch/hermes-agent/issues/98214).

**Pattern:** Approximately **15 of 30 top issues today are session-state/WAL related**, indicating a single root-cause hotfix should resolve the majority of the day's P0/P1 backlog.

## 6. Feature Requests & Roadmap Signals

Open feature requests visible in today's traffic:

- **#39372 — Background/integration runs polluting user-visible session lists** (4 comments). Likely in next minor — fundamental to Desktop hygiene and aligned with the active `sweeper:risk-session-state` workstream.
- **#50662 — Close button should minimize to system tray** (2 comments, since 2026-06-22). A long-pending Desktop UX request; no PR open.
- **#50643 — GUI-only Desktop install for remote-gateway clients** (👍 14, since 2026-06-22). Strong community signal; aligns with PR [#109768](https://github.com/NousResearch/hermes-agent/pull/109768) ("reuse the gateway backend for profiles it already serves"), suggesting the **multiplex_profiles path may finally enable a thin remote-only Desktop client**.
- **#109746 — `kanban.wake_event_kinds` filter** (open PR) — additive config to suppress origin-agent wakes on noisy terminal events.
- **#109816 — Turn-end verification nudges gated only on file edits** — proposing verification hooks for answer-text-only turns.
- **#109066 — Camofox browser exec backend** (open PR) — adding an alternative to existing browser tools.

**Prediction:** The next release (likely **v0.21.3 hotfix within 24–48h**) will consolidate the WAL fix, plus possibly [#109746](https://github.com/NousResearch/hermes-agent/pull/109746) and [#109768](https://github.com/NousResearch/hermes-agent/pull/109768). The thin-client Desktop architecture (around [#50643](https://github.com/NousResearch/hermes-agent/issues/50643)) is plausibly queued for v0.22.

## 7. User Feedback Summary

**Satisfaction signals:**
- High community response speed — six competing PRs addressing one bug in 24h indicates a healthy maintainer/collaborator ecosystem.
- The PRs explicitly reference each other and supersede duplicates (#109843 supersedes #109819), showing coordinated landings.

**Pain points (concentrated):**
- **Multi-process session concurrency** is the loudest single complaint — users run gateway + cron + interactive CLI + Desktop against one `state.db` and the locking model fails them. Several reporters say "fresh gateway self-halts."
- **Permission hardening shipped without sufficient regression testing** — users note that #109509 was merged despite an open code path that breaks POSIX lock semantics on both Linux and macOS.
- **Cross-provider fragility** — Copilot, Fireworks, custom `key_cmd`, MCP SDK 2.x all surfaced adapter/SDK-version mismatch issues.
- **MCP tool integration** — Zoho Calendar and SDK 2.0 `readOnlyHint` (camelCase vs snake_case) issues suggest MCP adapter maintenance has lagged SDK releases.
- **Desktop profile management** — stale `active-profile.json` silently routes messages to the wrong profile store, a data-integrity risk.
- **Update/install UX** — shallow-clone update checks report false "Update available" ([#98214](https://github.com/NousResearch/hermes-agent/issues/98214)).

**Satisfaction:** A community-managed `agent` "Team6" is now opening automated PRs from daily use ([#109768](https://github.com/NousResearch/hermes-agent/pull/109768)), indicating trust and momentum around the project.

## 8. Backlog Watch

Issues with high importance but low maintainer attention (old + still open):

- [#86097](https://github.com/NousResearch/hermes-agent/issues/86097) — `/api/model/info` context-length misreport for custom providers (open since **2026-08-14**, 30 days).
- [#49582](https://github.com/NousResearch/hermes-agent/issues/49582) — GitHub Copilot `gho_` OAuth regression (open since **2026-06-20**, ~85 days).
- [#39372](https://github.com/NousResearch/hermes-agent/issues/39372) — Background sessions polluting history (open since **2026-06-04**, ~100 days; only 4 comments).
- [#50662](https://github.com/NousResearch/hermes-agent/issues/50662) — Minimize-to-tray on close (open since **2026-06-22**, duplicate of #46566).
- [#50643](https://github.com/NousResearch/hermes-agent/issues/50643) — GUI-only Desktop for remote gateway (open since **2026-06-22**, 👍 14, the most-upvoted feature request).
- [#47963](https://github.com/NousResearch/hermes-agent/issues/47963) — Zoho Calendar MCP failure (open since **2026-06-17**).
- [#78497](https://github.com/NousResearch/hermes-agent/issues/78497) — TUI notification poller context bypass (open since **2026-08-04**).
- [#107528](https://github.com/NousResearch/hermes-agent/issues/107528) — Stale `active-profile.json` data-integrity bug (open since **2026-09-10**, no fix PR yet).

**Recommendation for maintainers:** Prioritize **#49582 (Copilot OAuth)**, **#50643 (GUI-only Desktop)**, and **#107528 (profile pointer staleness)**. The first affects provider reach, the second has 14 👍 (highest community demand), and the third risks silent data loss across profiles.

---

**Project health summary:** Hermes Agent is in an active hotfix cycle. The single largest risk today — WAL/generation wedges caused by #109509 — has been addressed in the merge queue and is likely shipping imminently. Backlog items skew toward provider/MCP/Desktop polish rather than core functionality, suggesting the project's foundations are stabilizing while integration breadth is outpacing adapter maintenance.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-13

## 1. Today's Overview

IronClaw activity over the last 24 hours is minimal, with **no new issues opened, closed, or commented on** and **no new releases published**. The only repository event is a single open Pull Request ([PR #8098](https://github.com/nearai/ironclaw/pull/8098)) that adds an inverse regression test alongside an existing lineage test. From a project-health perspective, this is a low-velocity day rather than a negative signal: no crashes, regressions, or community escalations are present, and the lone change continues a quality-assurance track around `TurnRunState` metadata handling rather than touching user-visible behavior.

## 2. Releases

No new releases were published in the last 24 hours. This section is omitted per the digest guidelines.

## 3. Project Progress

**Merged/Closed PRs today:** None.

**Open PR activity:**
- [PR #8098 — test(turns): pin state-derived lineage drop](https://github.com/nearai/ironclaw/pull/8098) (author: huiq777, opened 2026-09-12) — Adds an inverse regression test pairing the existing terminal-rewrite lineage test. It asserts that initial turn metadata carries three lineage fields (`depth`, `activation provenance`, and `descendant cap`), while a subsequent `TurnRunState`-derived snapshot intentionally omits all three. The PR is currently open with no reactions or review comments yet, indicating it has just entered the review queue.

No feature- or bug-fix branches landed today; today's only contribution is test hardening.

## 4. Community Hot Topics

There are no Issues or Pull Requests with notable comment volume or reaction counts in the last 24 hours. [PR #8098](https://github.com/nearai/ironclaw/pull/8098) is the sole active item, has zero reactions, and has not yet attracted reviewer discussion. Because of this absence, **no underlying community need or pain point can be inferred from current activity** — the signal that does exist (lineage metadata discipline in turn-state snapshots) appears to be driven by internal correctness concerns rather than user-reported issues.

## 5. Bugs & Stability

**No bugs, crashes, or regressions were reported in the last 24 hours.** The open issue queue shows zero new or updated items, and no bug-fix PRs were merged. While the open [PR #8098](https://github.com/nearai/ironclaw/pull/8098) is itself a *test* PR (i.e., it encodes a previously identified or anticipated regression risk around `TurnRunState`-derived lineage fields being dropped), it is preventive in nature — pinning behavior rather than fixing a live defect — and should not be classified as an active bug.

**Severity ranking:** None to report.

## 6. Feature Requests & Roadmap Signals

No new feature requests were filed today, and no roadmap signals can be derived from the current data window. The single open PR ([#8098](https://github.com/nearai/ironclaw/pull/8098)) suggests continued investment in **turn-state metadata guarantees**, specifically the asymmetric handling between original turn metadata (carrying depth / activation provenance / descendant cap) and derived snapshots from `TurnRunState` (which drop those fields). If this test lands without follow-up, the most likely adjacent next-step work is making the lineage-drop behavior explicit in user-facing docs or surface-level telemetry — but with only one day's worth of data, this is speculative.

## 7. User Feedback Summary

There is **no new user feedback captured in the last 24 hours**: zero issues updated, zero comments logged, zero reactions recorded. As a result, no pain points, use cases, or satisfaction signals can be summarized from current activity. Any user-sentiment conclusions would require pulling from longer-window data outside today's digest scope.

## 8. Backlog Watch

With no updated issues and no merged PRs in the window, there are **no new items entering the backlog**. The one item requiring maintainer attention today is:

- [PR #8098 — test(turns): pin state-derived lineage drop](https://github.com/nearai/ironclaw/pull/8098) — Awaiting first reviewer pass; zero comments and zero reactions as of the snapshot. Because this is the only moving piece in the repository, a quick review here would clear the daily queue.

---

**Summary health assessment:** Quiet, stable day. Activity is restricted to one open test-only PR with no community traction yet; no release pressure, no regressions, no escalations.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-13

## 1. Today's Overview

QwenPaw (github.com/agentscope-ai/QwenPaw) showed moderate activity over the last 24 hours with 8 issues touched and 2 pull requests updated, but **no new releases** were published. The activity is skewed toward MCP/A2A protocol hardening (2 bug reports and 2 corresponding fix PRs) and ongoing user-reported stability problems with plugin development workflows and session persistence. Maintainers have not yet merged any PR in this window, suggesting the two open fixes are still under review. Overall, the project is in a steady bug-fix cadence rather than a feature-release cycle.

## 2. Releases

No new releases were published in the last 24 hours. No version bump to report.

## 3. Project Progress

No PRs were merged or closed today. Two open PRs are in flight and directly address recently filed bugs:

- **[#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732)** — `fix(acp): select permission options by protocol kind` *(axrelay-dev, updated today)*  
  Improves ACP permission matching by prioritizing stable `kind` over implementation-defined `optionId`, fixing false fallbacks to interactive prompts for safe tool calls. Still open, awaiting maintainer review.

- **[#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729)** — `fix(mcp): recognize Java jsonRpcError envelope on discover probe` *(kabishou11, updated 2026-09-12)*  
  Fixes the `_unwrap_jsonrpc_result` envelope check so Java/Kotlin MCP SDK responses (HTTP 500 + `jsonRpcError` body) are correctly parsed during Driver construction. Closes [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728).

Progress signal: the MCP/ACP protocol stack is receiving active, targeted fixes — a healthy sign for cross-SDK interoperability.

## 4. Community Hot Topics

The most commented items in the last 24h are dominated by user pain points around agent memory and session management:

- **[#7571 — "总是记不住，还是会遗忘"](https://github.com/agentscope-ai/QwenPaw/issues/7571)** *(4 comments, xiaohushi512)* — Despite repeated instructions, the agent repeatedly creates `TODO` files outside the configured path and even migrates source edits between the dev directory (A) and the runtime plugin path (C), causing overwrites of working runtime code via auto-deploy. Underlying need: stronger **workspace/path-scoped memory and instructions**, plus guardrails preventing the agent from operating outside declared development boundaries.
- **[#7724 — "会话丢失"](https://github.com/agentscope-ai/QwenPaw/issues/7724)** *(3 comments, xiaohushi512)* — After a plugin redeploy + shutdown mid-session, the prior conversation and configured LLM are missing; stopping/restarting does not restore the interrupted session. Underlying need: **session durability across plugin redeploys and shutdown events**, plus clearer model-config persistence.
- **[#7484 — "基于qwenpaw 2.x的A2A何时支持"](https://github.com/agentscope-ai/QwenPaw/issues/7484)** *(3 comments, qixinbo)* — Community asking when A2A protocol will join the existing MCP Driver support promised in the 2.x architecture docs. Underlying need: **roadmap transparency for the unified Driver mechanism**.
- **[#7582 — Plugin store UX](https://github.com/agentscope-ai/QwenPaw/issues/7582)** *(2 comments, One-sixth, now closed)* — Batch update, page-reset flicker, and missing update notifications make multi-plugin management tedious.
- **[#7728 — MCP Java SDK 500 error](https://github.com/agentscope-ai/QwenPaw/issues/7728)** *(2 comments, remotepan-design)* — Java/Kotlin MCP servers return HTTP 500 with non-standard error bodies, breaking Driver build.

## 5. Bugs & Stability

Ranked by user-visible severity:

| Severity | Issue | Description | Fix PR |
|----------|-------|-------------|--------|
| **High** | [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) | Conversation and model config loss after plugin redeploy + shutdown; no recovery path | None |
| **High** | [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) | Agent ignores path/instruction constraints, silently editing wrong directory and clobbering runtime code via auto-deploy | None |
| **Medium** | [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728) | `server/discover` HTTP 500 from Java/Kotlin MCP SDK breaks Driver construction | [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729) ✅ open |
| **Medium** | [#7730](https://github.com/agentscope-ai/QwenPaw/issues/7730) | Plugin catalog read failure (connection reset / CDN interruption) escapes the documented offline fallback and raises a server error | None |
| **Adjacent** | [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) | ACP permission selection misses safe options when `optionId` is non-standard — UX regression causing unnecessary prompts | PR itself is the fix |

Severity rationale: [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) and [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) cause **silent data/work loss**; [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728) breaks interop with a large class of MCP servers.

## 6. Feature Requests & Roadmap Signals

- **[#7484 A2A protocol support](https://github.com/agentscope-ai/QwenPaw/issues/7484)** — Strong signal that the unified Driver architecture is expected to ship A2A soon; maintainer response would clarify timing.
- **[#7582 Plugin store UX](https://github.com/agentscope-ai/QwenPaw/issues/7582)** (closed without merge yet) — Demands for: (1) no full-page reload on install, (2) one-click batch update, (3) update notifications for third-party plugins. These are reasonable to fold into the next 2.x minor.
- **[#7731 Files panel: dot-file toggle](https://github.com/agentscope-ai/QwenPaw/issues/7731)** — Small, low-risk Console enhancement.
- **[#3429 Pre-install CLI tools in Docker image](https://github.com/agentscope-ai/QwenPaw/issues/3429)** (closed today) — Long-standing request to bake `himalaya` and other CLIs into the official image; closure suggests it has landed or been declined.

**Prediction for the next release:** a 2.2.x patch likely containing the MCP envelope fix ([#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729)) and ACP permission fix ([#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732)), possibly bundled with the dot-file toggle ([#7731](https://github.com/agentscope-ai/QwenPaw/issues/7731)).

## 7. User Feedback Summary

- **Dissatisfaction — agent instruction adherence:** [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) shows the agent repeatedly forgets path/scope rules across sessions, leading to silent overwrite of working code. This is a recurring theme (the user even references earlier sessions).
- **Dissatisfaction — durability:** [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) and referenced [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) reveal persistent problems with model-config loss and session recovery after redeploy/shutdown — a pattern, not a one-off.
- **Dissatisfaction — plugin management UX:** [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582) highlights friction for users running QwenPaw as a "maintenance butler" across multiple machines (batch updates, update notifications).
- **Use case evidence:** Multi-machine plugin management (One-sixth), plugin development with strict dev/runtime separation (xiaohushi512), cross-SDK MCP interop (remotepan-design), Dockerized CLI workflows (MCQSJ) — QwenPaw is being adopted for **production-style agent housekeeping**, not just toy demos.

## 8. Backlog Watch

Items needing maintainer attention:

- **[#7571 (xiaohushi512)](https://github.com/agentscope-ai/QwenPaw/issues/7571)** — No 👍 reactions and no maintainer response yet, but the reported damage (auto-deploy overwrites) is severe. Needs triage on whether instruction scoping is a config, prompt, or runtime-guard issue.
- **[#7724 (xiaohushi512)](https://github.com/agentscope-ai/QwenPaw/issues/7724)** — Session-loss regression with prior history ([#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708)); needs confirmation whether this is a known 2.2.x regression.
- **[#7730 (anxkhn)](https://github.com/agentscope-ai/QwenPaw/issues/7730)** — Contracts reference an "offline fallback" that the implementation does not actually honor; documentation/code drift should be fixed.
- **[#7484 (qixinbo)](https://github.com/agentscope-ai/QwenPaw/issues/7484)** — A roadmap-level question that has gone unanswered; a short maintainer comment would set expectations.
- **[#7732 PR (axrelay-dev)](https://github.com/agentscope-ai/QwenPaw/pull/7732)** — Open fix targeting an ACP UX regression; reviewers needed.
- **[#3429 (MCQSJ)](https://github.com/agentscope-ai/QwenPaw/issues/3429)** — Closed today after ~5 months; worth a maintainer note confirming whether `himalaya` is now pre-installed.

---

**Bottom line:** QwenPaw's protocol stack is receiving solid, targeted fixes, but user-facing stability (session persistence, instruction adherence) is the dominant pain point and is currently under-served. Recommend prioritizing the [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) and [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) investigations, and fast-tracking [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729) / [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) into the next patch release.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-13

## 1. Today's Overview

ZeroClaw saw elevated triage activity in the last 24 hours, with **34 issues** updated (6 closed, 28 open) and **50 PRs** refreshed (12 merged/closed, 38 still open). The dominant theme is **runtime and daemon correctness on Windows and ACP/ZeroCode paths**: at least three open P0/P1 bugs touch ACP turn persistence, cost limits, and the SOP engine, while three additional issues address a Windows-specific stack overflow and recurring test failures in the `Advisory Windows nextest` job. A new release-efficiency tracker ([#10814](https://github.com/zeroclaw-labs/zeroclaw/issues/10814)) opened today, signaling an active post-v0.8.5 stabilization cycle. No new tagged releases were cut.

## 2. Releases

No new releases in the last 24 hours. The previous tagged release was **v0.8.4** (per [#9381](https://github.com/zeroclaw-labs/zeroclaw/issues/9381)), and the new tracker [#10814](https://github.com/zeroclaw-labs/zeroclaw/issues/10814) frames upcoming work as "release efficiency and repeatable publication" for the next cut (no version number announced yet).

## 3. Project Progress

Six issues and two notable PRs closed in the last 24 hours:

- **[#10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534) (closed)** — Bounded delegates silently stripping the `delegate` tool; runtime config now consistent with `delegation_policy`/`max_delegation_depth`.
- **[#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689) (closed)** — Telegram TTS voice replies dropped when the reply started with `[` (ElevenLabs v3 audio tags).
- **[#10277](https://github.com/zeroclaw-labs/zeroclaw/issues/10277) (closed)** — `zerorelay` Docker base tags pinned by digest (`rust:1.96.1-slim`, `gcr.io/distroless/cc-debian13:nonroot`); CI parity change.
- **[#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) (closed)** — `zeroclaw service logs` returning empty on macOS/Windows/OpenRC.
- **[#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699) (closed)** — Cost ledger under-counting cache misses by omitting a cache-write rate on `ModelCostRates`.
- **[#10436](https://github.com/zeroclaw-labs/zeroclaw/issues/10436) (closed)** — Native OpenRouter streaming responses cut off by total HTTP timeout on long reasoning turns.
- **[#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) (closed)** — PR for canonical principals and shared grant resolution (#8289 stage 2) — landed or withdrawn; its dependent #10255 / #10259 are still open.
- **[#10586](https://github.com/zeroclaw-labs/zeroclaw/pull/10586) (closed)** — Dependabot web minor/patch bump group (superseded by the larger [#10820](https://github.com/zeroclaw-labs/zeroclaw/pull/10820), still open).

Net effect: incremental hardening — cost accounting accuracy, cross-platform daemon hygiene, supply-chain pinning, and a couple of long-standing UX paper-cuts all advanced in one cycle.

## 4. Community Hot Topics

Ranked by issue/PR comment count over the last 24h:

1. **[#10734 — Windows stack overflow in `RpcDispatcher::process_line`](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)** (7 comments, P1, in-progress). Surfaced by the advisory Windows nextest job — `process_line_session_new_creates_session_on_two_mega…` hits the 2 MB stack guard (within 2%). Underlying need: Windows-specific test infra that occasionally wedges on otherwise-clean cron-only PRs.
2. **[#9381 — crates.io publishing, packaging, cargo-install follow-ups](https://github.com/zeroclaw-labs/zeroclaw/issues/9381)** (5 comments, P2 tracker, high-risk). Open since late July; the first follow-up (in-crate symlinks breaking Windows checkouts without Developer Mode) has real user impact and is now gating a more usable install path.
3. **[#10066 — SOP engine promotes later steps before recording output-schema rejection](https://github.com/zeroclaw-labs/zeroclaw/issues/10066)** (4 comments, P0, accepted). P0 workflow-blocker: downstream SOP steps execute against a result the engine has already determined invalid.
4. **[#10788 — Failed Code/ACP turn discards accepted prompt and completed tool exchanges](https://github.com/zeroclaw-labs/zeroclaw/issues/10788)** (3 comments, P1, in-progress). A provider error on an ACP turn wipes the accepted user prompt and any tool exchanges that had already completed — a durable-history integrity bug with both privacy and recovery implications.
5. **[#10814 — Release efficiency and repeatable publication tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/10814)** (new, P1). Fresh from today; aggregate of post-v0.8.5 release-engineering asks.

Common underlying need across these threads: **the daemon/turn pipeline is being audited for end-to-end durability and reproducibility** — what's recorded, what's persisted, what survives a failure, and how Windows/non-Linux paths are exercised in CI.

## 5. Bugs & Stability

### P0 / S1 (workflow-blocked, data loss, security)

| Issue | Area | Status | Fix PR? |
|---|---|---|---|
| [#10066](https://github.com/zeroclaw-labs/zeroclaw/issues/10066) | SOP engine — validation order | accepted | none linked |
| [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) | markdown memory backend — concurrent `store()` race silently drops entries | accepted (S0) | none |
| [#10673](https://github.com/zeroclaw-labs/zeroclaw/issues/10673) | Persist failed ACP turns on daemon RPC path (ZeroCode Code pane) | accepted | tracks [#9378](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) |
| [#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785) | `begin_notification_resync` cancels all running turns | in-progress | none |
| [#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635) | Runtime profile `max_cost_per_day_cents` reports `u32::MAX` while global ledger still rejects | accepted | none |

### P1 / S2 (degraded behavior)

| Issue | Area | Status | Fix PR? |
|---|---|---|---|
| [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) | Failed ACP turn wipes accepted prompt + tool history | in-progress | none |
| [#10645](https://github.com/zeroclaw-labs/zeroclaw/issues/10645) | Cost-tracking context not threaded into delegated sub-loops | accepted | none |
| [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) | Windows stack overflow in `RpcDispatcher::process_line` | in-progress | none |
| [#10793](https://github.com/zeroclaw-labs/zeroclaw/issues/10793) | Three Windows-only test failures on the advisory job | in-progress | none |
| [#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787) | Single-candidate stream recovery ignores `provider_retries`; 529 → one immediate retry, no backoff | in-progress | none |
| [#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736) | Pre-output stream failure skips advertised non-streaming fallback | in-progress | none |
| [#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721) | `knowledge.db_path` tilde expansion is global-replace, dropping the knowledge tool | open | none |
| [#10814](https://github.com/zeroclaw-labs/zeroclaw/issues/10814) | Release efficiency tracker | open | none |

### P2 / S3 (minor)

[#10802](https://github.com/zeroclaw-labs/zeroclaw/issues/10802) (mismatched `message_count` between `session/list-acp` and `turn_end`), [#10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779) (429 FreeUsageLimitError retried with sub-second backoff), [#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795) (interactive REPL never enables `IUTF8` → broken Backspace on multi-byte chars), [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796) (ZeroCode chat input ignores Delete), [#10794](https://github.com/zeroclaw-labs/zeroclaw/issues/10794) (publish_contract test fails on advisory Windows job), [#10741](https://github.com/zeroclaw-labs/zeroclaw/issues/10741) (ZeroCode pauses queue after clean response).

Closed today (now off the bug board): [#10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534), [#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689), [#10277](https://github.com/zeroclaw-labs/zeroclaw/issues/10277), [#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731), [#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699), [#10436](https://github.com/zeroclaw-labs/zeroclaw/issues/10436).

No PRs closed with `fix:` for the active P0 list — **every P0 above is still without a linked fix PR**, which is the most material risk signal in this digest.

## 6. Feature Requests & Roadmap Signals

Open feature/enhancement items with active maintainer or contributor traction:

- **crates.io publishing & Windows-safe packaging** — [#9381](https://github.com/zeroclaw-labs/zeroclaw/issues/9381). High-confidence candidate for the next release; the "symlinks break Windows checkouts" sub-task has real onboarding impact.
- **Configurable, authorization-aware Telegram unauthorized-sender notice** — [Issue #10400](https://github.com/zeroclaw-labs/zeroclaw/issues/10400) + [PR #10401](https://github.com/zeroclaw-labs/zeroclaw/pull/10401) (status: `needs-author-action`, `stale-candidate`). Likely next release if a maintainer revives the PR.
- **Persistent session prompt attachments** — [PR #10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407). Opt-in SQLite-backed attachments (≤ 4 per session), single-use approval for mutations. Needs author action.
- **Context compaction anchored to model window ratio** — [PR #9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535). Replaces a fixed 32k-token budget with `runtime_profiles.<name>.context_compact_ratio`. A natural fit with the recent `ModelCostRates` work.
- **Multiple models per provider profile** — [PR #9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809). `[providers.models.<family>.<alias>.models.<model_alias>]` subtable; long-standing `needs-author-action`.
- **Per-session message serialization in channels** — [PR #10411](https://github.com/zeroclaw-labs/zeroclaw/pull/10411). Eliminates concurrent same-session turns when `interrupt_on_new_message` is on.
- **Pixel-level image validation** — [PR #9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819). Defends providers from corrupt-image uploads by decoding with the `image` crate.
- **`/upload` slash command for the web composer** — [PR #10578](https://github.com/zeroclaw-labs/zeroclaw/pull/10578). Small, stacked, low-risk; likely to land quickly.

**Release-readiness prediction for the next tag:** The next published version will most plausibly bundle #10248-family principals groundwork (some already landed), the image-validation and multi-model provider work if their `needs-author-action` items resolve, and likely the Windows-publish and SOP fixes — but **not** the still-open P0 cost/SOP/memory bugs unless dedicated fix PRs appear in the next 48–72h.

## 7. User Feedback Summary

Concrete pain points visible from today's traffic:

- **Windows onboarding is fragile**: developers without Developer Mode can't check out crates with symlinked compile-time assets ([#9381](https://github.com/zeroclaw-labs/zeroclaw/issues/9381)); `service logs` is silent on Windows/macOS/OpenRC ([#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731), now closed); TUI Backspace is broken on multi-byte input ([#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795)).
- **Telegram is a high-friction channel**: voice replies silently dropped on `[`-prefixed outputs ([#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689), closed) and the unauthorized-sender notice is a non-localizable literal that doesn't reflect the actual authorization path ([#10400](https://github.com/zeroclaw-labs/zeroclaw/issues/10400)).
- **Durable history on ACP / ZeroCode is brittle**: failed turns lose the accepted prompt and completed tool exchanges ([#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788)), a clean-looking completion can still stall the queue ([#10741](https://github.com/zeroclaw-labs/zeroclaw/issues/10741)), and `session/list-acp` and `turn_end` report different counts ([#10802](https://github.com/zeroclaw-labs/zeroclaw/issues/10802)).
- **Cost control is leaky**: profile-local `max_cost_per_day_cents` doesn't reflect the effective global cap ([#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635)), delegated sub-loops run without a scoped cost context ([#10645](https://github.com/zeroclaw-labs/zeroclaw/issues/10645)), and cache-write tokens are unpriced ([#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699), closed).
- **Provider resilience is inconsistent**: 429-quota errors retried instead of failing fast ([#10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779)), single-candidate 529s get one no-backoff retry ([#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787)), and the non-streaming fallback is logged but not invoked ([#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736)).
- **Reliability-adjacent ergonomic asks**: Delete key in ZeroCode chat composer ([#10796](

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*