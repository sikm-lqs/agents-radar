# OpenClaw Ecosystem Digest 2026-09-10

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-10 11:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-10

## 1. Today's Overview

OpenClaw shows **high-velocity maintenance activity** with 1,000 total issue/PR updates in 24 hours (500 issues, 500 PRs), though open-issue inventory remains heavy at 310 active items versus 190 closed. The single release is the **final June 2026 LTS** (`v2026.6.35`), focused on hardened provider/channel input boundaries rather than new features — a clear signal that the project is in stabilization mode for the LTS branch while mainline development churns on memory-core, Gateway, and Android UI work. The 51.6% PR merge/close rate (258/500) is healthy, but the persistent presence of multi-month-old P1/P2 bugs (e.g. zombie processes #97616, SQLite contention #117262) indicates systemic stability debt that 24h fixes cannot resolve.

## 2. Releases

**v2026.6.35 — Final June 2026 Extended Stable (LTS)** (released 2026-09-10)

- **Safer provider and channel boundaries:** bundled providers and channel adapters now bound untrusted response bodies, reject oversized inputs before expensive work, and preserve safe recovery when transport is interrupted.
- **No new features or breaking changes** documented in the truncated changelog excerpt; release is a hardening rollup for the LTS branch.
- **Migration notes:** none explicit — this is the closing June LTS cut, so deployments on `2026.6.x` should adopt it as the patch target rather than jumping to `2026.9.x`.

The June-LTS cadence running in parallel with the rapid `2026.8.x → 2026.9.x` mainline cycle suggests the project is sustaining two supported branches, increasing the test/maintenance surface.

## 3. Project Progress

**Closed/merged PRs (24h):** 258 closed, including notable landing fixes:

- **#140296** (P0, ready for maintainer look) — `fix(doctor): session SQLite import drops Codex assistant messages from legacy transcripts`. Closes #140100.
- **#137008** (P1) — `fix: skip managed gateway stop on no-op openclaw update`. Closes #136997.
- **#142626** (P2, autormerge armed) — `fix(imessage): restore feedback after bridge recovery`. Closes #142603.
- **#143978** (refactor) — `refactor(memory-wiki): share deferred test fixtures` (closes duplicated fixture boilerplate across 6 suites).
- **#143982 / #143983 / #143969** — docs audit closures (53+20+1 rows of accuracy findings) and an unused-code cleanup.

**Active development themes (242 open PRs):**

- **Config schema derivation refactor series** by `RomneyDa` (#143985, #143986, #143987, #143988) — collapsing handwritten contract hierarchies into schema-derived types; net LOC reductions in each PR.
- **Android realtime client** hardening (#142297, #142298) — coordinating response and transcript state across delayed startup, agent work, and shutdown.
- **Memory-core & active-memory** reliability (#142545, #142693) — preventing over-promotion past bootstrap limits, and continuing recall past trigger-lookup timeouts.
- **Transcript redaction correctness** (#143937, P1) — replaying only provenance-marked persisted masks instead of feeding `***` / `first6…last4` back to the model as if they were real values.

## 4. Community Hot Topics

Most-commented Issues (top 5):

- **#135111** (CLOSED, 26 comments) — Intermittent "malformed JSON arguments" from `claude-sonnet-5` on `v2026.8.1`. Highlights how a single provider-tool-call parsing regression in a minor release can dominate noise. [link](https://github.com/openclaw/openclaw/issues/135111)
- **#97616** (OPEN, 15 comments, 🦪 silver shellfish) — Unreaped hook/tool child processes accumulating as zombies, degrading runtime. The high comment count over 3+ months suggests triage is stuck. [link](https://github.com/openclaw/openclaw/issues/97616)
- **#119720** (OPEN, 15 comments, 🦞 diamond lobster) — Synchronous persistence blocks the Gateway event loop at scale; this is a *systemic* scaling problem now partially remediated by #140231 and #138984 but still under active maintainer review. [link](https://github.com/openclaw/openclaw/issues/119720)
- **#137927** (CLOSED, 14 comments) — Internal `<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` block rendered as visible Telegram text — a **prompt-injection disclosure** that also doubles as a UX regression. [link](https://github.com/openclaw/openclaw/openclaw/issues/137927)
- **#43367** (OPEN, 14 comments) — Multi-agent orchestration instability: concurrent `agents add`, session-lock failures, detached children. [link](https://github.com/openclaw/openclaw/issues/43367)

**Underlying needs:** operators repeatedly surface the same pattern — *core runtime primitives (process lifecycle, SQLite locking, concurrent writes) are not yet production-grade*. The "clawsweeper" auto-triage labels (`needs-maintainer-review`, `needs-product-decision`, `no-new-fix-pr`) appear on roughly half of top issues, indicating maintainer attention is the binding constraint, not lack of diagnosis.

## 5. Bugs & Stability

Ranked by severity (P0/P1 first), only items updated today:

| Severity | Issue | Status | Fix PR? | Notes |
|---|---|---|---|---|
| **P0 / release blocker** | [#142585](https://github.com/openclaw/openclaw/issues/142585) — 2026.9.3 Doctor refuses valid legacy workspace setup | OPEN, needs-info | — | Migration blocker; awaiting maintainer info. |
| **P0 / release blocker** | [#137813](https://github.com/openclaw/openclaw/issues/137813) — Windows gateway never starts after 2026.9.1; `--task-supervisor` exits 0 silently | CLOSED | likely landed | Gateway.cmd regeneration regression. |
| **P0 / release blocker** | [#140162](https://github.com/openclaw/openclaw/issues/140162) — Windows `gateway restart` kills ready gateway as "stale process" after 181s; misses manually-started foreground gateways | OPEN, needs-live-repro | — | Compounded failure modes; outages on slow boots. |
| **P0 / release blocker** | [#101763](https://github.com/openclaw/openclaw/issues/101763) — Hosted Molty: model selector doesn't persist (`claude-opus-4.8` vs `4-8`) | CLOSED, needs-info | — | Provider-id dotted vs dashed regression. |
| **P0 / release blocker** | [#115642](https://github.com/openclaw/openclaw/issues/115642) — Billing cooldown outlives the outage on subscription auth (~5h `disabledUntil`) | OPEN, source-repro | — | Needs probe-based recovery + manual reset. |
| **P1 / crash-loop** | [#117262](https://github.com/openclaw/openclaw/issues/117262) — SQLite contention: 3 concurrent write handles → ~33s event-loop stalls (DEF-61) | OPEN, source-repro | linked-pr-open | The single highest-impact runtime bug. |
| **P1 / security** | [#115367](https://github.com/openclaw/openclaw/issues/115367) — Provider-owned read gate requires `origin: bundled` but Slack/Discord/Matrix/MSTeams/Feishu ship as external plugins | OPEN | — | Privilege boundary inconsistent post-2026.7.2-beta. |
| **P1 / session-state** | [#127148](https://github.com/openclaw/openclaw/issues/127148) — Codex `sessions.compact` acquires a second app-server, hits active-writer conflict | OPEN | — | |
| **P1 / memory-core** | [#136311](https://github.com/openclaw/openclaw/issues/136311) — Gateway reacquires reindex lock on every start; 19 GB of orphaned `memory-reindex-*` temp DBs | OPEN, needs-live-repro | — | |
| **P1 / memory-core** | [#143640](https://github.com/openclaw/openclaw/issues/143640) — Full index publish in single `IMMEDIATE` transaction exceeds 5s `busy_timeout` | OPEN, source-repro | — | Same SQLite contention theme. |
| **P1 / data-loss** | [#104719](https://github.com/openclaw/openclaw/issues/104719) — memory-wiki supplement exhaustive fallback ignores tool deadline | OPEN | linked-pr-open | |
| **P1 / message-loss** | [#139274](https://github.com/openclaw/openclaw/issues/139274) — Native `/codex bind` drops voice-note attachments and skips configured STT | OPEN, source-repro | — | |
| **P1 / gateway-hang** | [#138042](https://github.com/openclaw/openclaw/issues/138042) — Gateway control requests stall 157–276s, no OOM | OPEN | — | |
| **P1** | [#88757](https://github.com/openclaw/openclaw/issues/88757) — Proactive messages not visible in session context, desyncs conversation | OPEN | — | |
| **P1** | [#128637](https://github.com/openclaw/openclaw/issues/128637) — Multi-agent `AgentSelectionRequiredError` regression | OPEN | — | |

**Pattern:** SQLite contention / lock lifetime / process lifecycle is the dominant root-cause class across at least four P1s. No P0 is closed today without an explicit fix-PR mention; several P0s remain OPEN with `needs-info` gating.

## 6. Feature Requests & Roadmap Signals

Open enhancement requests updated today (top by engagement):

- **#6599** (P3, 11 comments, 👍1) — `/models test-fallback` command to verify fallback chain without waiting for a real failure. **High likelihood of next minor** — fits the "operational tooling" theme and is small enough to land.
- **#6757** (P3, 8 comments, 👍2) — Agent-triggered context compaction (self-compact tool). Aligns with the active memory-core / compaction rewrite (#132762 follow-ups). Likely as opt-in.
- **#46058** (P3, 6 comments, 👍1) — Chat-first Android surface discussion. Android effort is clearly ramping (#142297, #142298), so this discussion is timely.
- **#87584** (P2, 5 comments, 👍2) — Make group room-event steering configurable (currently hard-disabled for room events). Live operational concern; likely in 2026.9.x or 2026.10.
- **#8285** (P3, 5 comments) — Auto-send intent/acknowledgment text before agent processing.
- **#6625** (P3, 6 comments) — Graceful sub-agent timeout (pre-timeout warning). Operationally attractive; no replacement today.
- **#109657** (P1, 7 comments, **CLOSED**) — Adopt durable ingress drain on WhatsApp/Discord/Slack/Signal/iMessage. This already shipped in #108924 and the bulk PR #141283 closed; this is the natural **"durable ingress is now the default"** milestone.

**Predicted `2026.10.x` candidates:** fallback verification command (#6599), configurable group steering (#87584), self-compact tool (#6757), sub-agent pre-timeout warning (#6625). The PR backlog already contains the supporting refactors (#143985–#143988 schema derivations).

## 7. User Feedback Summary

**Dominant pain points** (extracted from issue summaries):

1. **Production deployments are pinned to old versions** because recent regressions are severe — `2026.5.12 → 2026.7.1-2 → 2026.8.x → 2026.9.x` each carry their own release-blocker class bugs. [#123799](https://github.com/openclaw/openclaw/issues/123799) explicitly asks for safe upgrade/backport guidance.
2. **SQLite is the throughput ceiling.** Three concurrent write handles in one process, unbounded growth of `memory_index_chunks` / `memory_embedding_cache` (#114612), 5s `busy_timeout` exceeded by full-publish transactions (#143640), 33s stalls under contention (#117262). Users are running into this *in production* with real field-evidence attached.
3. **Windows is a second-class citizen.** Three of the top open P0s/P1s are Windows-specific: gateway.cmd regeneration (#137813), `gateway restart` killing ready processes (#140162), plus the historical launchd regression (#90711, now closed).
4. **Channel adapter privilege boundaries are inconsistent.** The `origin: bundled` read gate (#115367) silently breaks Slack/Discord/Matrix/MSTeams/Feishu; Feishu specifically lost all 13 tools (#140971, regression).
5. **Memory-core is fragile under restarts.** Reindex lock never released (#136311), index publishing blocks the writer DB (#143640), 19 GB temp-DB orphans. Users want reliability more than new memory features.
6. **Operational visibility gaps.** Hidden stderr in launchd (#90711), missing diagnostics thresholds wiring (#87441), no trace context in plugin hooks (#50291). Operators cannot diagnose the issues in #1–#5.

**Satisfaction signal:** issue ratings skew heavily toward 🦞 *diamond lobster* and 🦐 *gold shrimp* on the most-upvoted items — these are not minor; they are the highest severity tier in the project's internal rating system, and several have been open for weeks-to-months.

## 8. Backlog Watch

Issues and PRs with persistent `clawsweeper` flags indicating need for **maintainer attention**:

- **#97616** (P1, OPEN since 2026-06-29, 15 comments) — Zombie process leak. Three months open, no fix PR. **Top priority for next maintainer sweep.**
- **#115642** (P0 release-blocker, OPEN since 2026-07-29, 8 comments) — Billing cooldown outlives outage. Clear product decision needed (`needs-product-decision`).
- **#115367** (P1 security, OPEN since 2026-07-28, 9 comments) — `origin: bundled` privilege boundary inconsistent. `needs-product-decision`.
- **#119720** (P1 scaling, OPEN since 2026-08-05, 15 comments) — Gateway event-loop blocking. Partial fixes landed but root cause still in review.
- **#50291** (P2, OPEN since 2026-03-19, 9 comments) — Plugin hooks missing trace context. `needs-product-decision`, no clear owner.
- **#43367** (P2 multi-agent, OPEN since 2026-03-11, 14 comments) — Concurrent `agents add`, session-lock failures. `linked-pr-open` exists but has not landed.
- **#6599** (P3, OPEN since 2026-02-01, 11 comments) — `/models test-fallback` command. Small enough to ship; just needs maintainer blessing.
- **#114612** (P2, OPEN since 2026-07-27, 12 comments) — SQLite unbounded growth. Production data attached; **retention policy is missing, not just a bug.**
- **#117262** (P1, OPEN since 2026-08-01, 10 comments) — SQLite contention 33s stalls. `linked-pr-open` but no merge.
- **PR #137008** (P1, OPEN since 2026-09-03) — `skip managed gateway stop on no-op openclaw update`. Status: `📣 needs proof`. Should be trivially testable; one proof run unblocks merge.

**Pattern:** roughly half of the top open issues carry `clawsweeper:no-new-fix-pr` *and* `clawsweeper:needs-maintainer-review`. The bottleneck is reviewer capacity, not diagnosis — every one of the items above has a clear, traceable root cause in the issue body.

---

*Digest generated from 2026-09-10 GitHub activity window (24h). Items shown are the highest-engagement subset; full inventory: 500 issues, 500 PRs.*

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Personal AI Assistant / Agent Open-Source Ecosystem
**Snapshot date: 2026-09-10** | Projects: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The personal AI assistant open-source landscape is stratified into clear tiers: one flagship at massive scale (OpenClaw, ~1,000 daily issue/PR updates), two fast-iterating mid-scale projects shipping features weekly (QwenPaw, Hermes Agent), one undergoing an RFC-governed architectural rewrite (ZeroClaw), and one in early foundational mode (IronClaw). Across all five, the product category has converged: agents are no longer CLI chat tools but always-on, multi-channel personal assistants with persistent memory, scheduled tasks, and desktop/mobile surfaces. Notably, the hard problems have also converged — storage contention, cross-channel session identity, sandbox/tenant isolation, and provider-routing fidelity appear independently in nearly every project, indicating the ecosystem has moved past novelty features and into infrastructure-grade reliability work. Maintainer review capacity, not diagnosis, is the universally cited bottleneck.

---

## 2. Activity Comparison

| Project | Issue Updates (24h) | PR Updates (24h) | Close/Merge Rate | Release Status | Health Score* |
|---|---|---|---|---|---|
| **OpenClaw** | 500 (310 open / 190 closed) | 500 | 51.6% PR close (258/500) | ✅ `v2026.6.35` — final June LTS shipped today; mainline `2026.9.x` in flight | **7.0** |
| **QwenPaw** | ~29 | 33 | 41% PR merge (13/33) | ✅ `v2.2.1-beta.2` shipped same day, with release-duty verification | **7.5** |
| **Hermes Agent** | 50 (14% closed) | 50 | 34% PR close (17/50) | ❌ No release; on `v0.21.1` | **6.5** |
| **ZeroClaw** | 26 (2 closed) | 50 | 14% PR close (7/50) | ❌ No release; design/stabilization phase | **6.0** |
| **IronClaw** | 1 | 4 (0 merged) | 0% | ❌ No release | **5.0** |

\* Composite of velocity, throughput ratio, backlog aging, and release cadence from the 24h window. QwenPaw edges out OpenClaw on balance (shipping + 41% merge + coordinated reliability sweep) despite OpenClaw's 16× activity volume; OpenClaw is docked for multi-month-old P1s (#97616 zombie processes, 3+ months) and a review bottleneck flagged on ~half of top issues. IronClaw's score reflects insufficient community signal rather than poor quality.

---

## 3. OpenClaw's Position

**Advantages vs peers:**
- **Scale leadership:** ~1,000 daily updates — roughly 10× the next-largest project (Hermes/QwenPaw at 50–100). Issue IDs in the 143k range vs. 8k–107k for peers indicate the deepest cumulative user base.
- **Only project with a formal LTS model:** dual supported branches (June LTS + `2026.9.x` mainline) — an enterprise-operability signal no peer currently matches.
- **Broadest channel coverage:** WhatsApp, Slack, Discord, Signal, iMessage, Telegram, Matrix, MSTeams, Feishu, plus Android and hosted (Molty) surfaces. Peers cover 1–3 channels each (QwenPaw: Feishu/WeCom/Telegram; ZeroClaw/IronClaw: Telegram; Hermes: WeChat/iLink).
- **Deepest memory stack:** dedicated memory-core, active-memory, and memory-wiki subsystems with provenance-marked transcript redaction — peers are earlier (QwenPaw ReMe commands; Hermes single MEMORY.md tool).
- **Automated triage at scale** (`clawsweeper` taxonomy) — unique operational tooling for an issue queue this size.

**Technical approach differences:** Gateway-centric monolith with pluggable channel adapters, vs. ZeroClaw's RFC-driven Rust crate re-architecture, IronClaw's extension/hosted-MCP model, and Hermes' desktop-first plugin catalog. OpenClaw optimizes for surface breadth and fast mainline churn; ZeroClaw explicitly trades ship velocity for design rigor.

**Candid risks:** SQLite contention (#117262, 33s stalls), Windows gateway P0s (#137813, #140162), and the `origin: bundled` privilege boundary break (#115367) mean production users are pinning old versions (#123799) — stability debt is the gap peers can exploit.

---

## 4. Shared Technical Focus Areas

| Theme | Projects | Specific evidence |
|---|---|---|
| **Blocking event loops / storage contention** | OpenClaw, Hermes, QwenPaw | 33s SQLite stalls (#117262), 51s GIL freezes (#58576), 118–135s sync-call freezes (#7363). The single most universal runtime problem. |
| **SQLite durability & corruption** | OpenClaw, QwenPaw, Hermes | FTS `SQLITE_CORRUPT_VTAB` (#7596), unbounded index growth (#114612), `BEGIN IMMEDIATE` retry primitives (#97863). Need: single-writer discipline + retention policy. |
| **Cross-channel session identity & silent failures** | QwenPaw, OpenClaw, Hermes, ZeroClaw | 3 of QwenPaw's top-5 issues (#7579, #7011, #7661); OpenClaw multi-agent lock failures (#43367); Hermes phantom sessions (#107069); Feishu deadlock (#7534). |
| **Sandbox, tenancy & privilege boundaries** | All five | QwenPaw Windows sandbox bypass (#7672, no fix PR); OpenClaw `origin: bundled` gate (#115367) + prompt-injection disclosure (#137927); ZeroClaw granular sandbox RFC (accepted); IronClaw multi-tenant MCP caller keying. |
| **Provider-routing fidelity & cost control** | OpenClaw, Hermes, ZeroClaw | Model-id mangling (OpenClaw #101763; Hermes DeepSeek cluster — 3 of 6 merges today); thinking-token waste 68% (#107260); cost-ledger pricing and budget enforcement (#10716, #10645). |
| **Windows platform parity** | OpenClaw, QwenPaw, ZeroClaw | Windows-specific P1/P0s in all three (gateway lifecycle, desktop freezes, `0xc00000fd` stack overflow #10734). |
| **Eval/regression gating** | ZeroClaw, QwenPaw | Replay regression suite as hard CI gate (#9212); QPQAT test initiative (+2,475 backend cases). |

---

## 5. Differentiation Analysis

| Project | Feature focus | Target user | Architecture signature |
|---|---|---|---|
| **OpenClaw** | Memory continuity, 10+ messaging channels, Android, hosted offering | Production self-hosters / operators | Gateway + memory-core monolith, dual LTS/mainline branches |
| **Hermes Agent** | Desktop UX, plugin catalog, DeepSeek/provider tuning, cron scheduling | Power users, model tinkerers (NousResearch lineage) | Plugin/dispatcher lifecycle; app-level plugin pivot underway |
| **IronClaw** | Hosted-MCP multi-tenancy, SEP-414 caller attribution, extension packaging | Hosted/shared deployment builders | Extension host with per-caller credential keying |
| **QwenPaw** | Chinese-channel ecosystem (WeCom, Feishu), console/mobile UX, PawPort import (Codex/Qoder) | Self-hosters, incl. CN market; desktop users | Channel adapters + console/desktop; heavy test-coverage investment |
| **ZeroClaw** | Runtime-owned sessions, append-only event history, WASM plugins, cost ledger, edge mesh | Architecture-minded technical users | Rust crates, formal RFC voting, deterministic replay evals |

**Key takeaway:** OpenClaw and QwenPaw compete on breadth and shipping; ZeroClaw and IronClaw compete on foundations (correctness, tenancy); Hermes competes on desktop experience and model-provider agility. Nobody yet owns "reliable multi-tenant hosted personal assistant" — IronClaw is positioning earliest for it.

---

## 6. Community Momentum & Maturity

- **Tier 1 — Scale + stabilization:** **OpenClaw**. Highest engagement (top issues at 14–26 comments), but in LTS-hardening mode with systemic stability debt; 24h throughput cannot clear a 310-issue open inventory.
- **Tier 2 — Rapid iteration:** **QwenPaw** (best momentum: same-day beta, 41% merge rate, first-time contributors landing fixes — a healthy contribution bar) and **Hermes** (maintainer-authored PRs, desktop-plugins pivot imminent; drag: 83-comment cross-fork release friction with Enterkey and stale P1s like the 67-day-old GIL stall).
- **Tier 3 — Deliberate architecture phase:** **ZeroClaw**. Deep design engagement (RFC threads at 19–37 comments, Rev. 5–10 documents) but 60% of active bugs lack fix PRs and a formal decision queue (#8692) exists because informal review has saturated.
- **Tier 4 — Foundational/early:** **IronClaw**. Zero comments/reactions across all items; high PR technical quality but community not yet formed.

---

## 7. Trend Signals

1. **The persistence layer is the ecosystem's ceiling.** SQLite contention/blocking appears independently in the three largest projects. Durable, single-writer, async storage (durable ingress in OpenClaw, append-only event history in ZeroClaw) is the emergent answer — build for it from day one.
2. **Event-sourcing for trust.** Provenance-marked redaction (OpenClaw #143937), deterministic replay with CI gating (ZeroClaw), and FTS integrity repair (QwenPaw) point to auditability/replayability as the reliability mechanism of record.
3. **Multi-channel is table stakes; session identity is the frontier.** The highest-engagement bug class everywhere is "agent state diverges across channel/UI switch." An authoritative session-identity model is unowned differentiation.
4. **Isolation and multi-tenancy are rising fast.** Sandbox-policy RFCs, MCP caller attribution (SEP-414), and privilege-boundary bugs signal personal assistants moving from single-user hosts to shared/hosted services.
5. **Cost observability is becoming a feature.** Thinking-token waste fixes, per-model `memory_model` separation, prompt-cache passthrough, and price-premium ledgers show token economics driving design.
6. **Windows parity is an open differentiator** — every major project carries Windows-specific P1/P2s; first mover gains a defensible segment.
7. **Reviewer capacity is the universal constraint.** Auto-triage bots (clawsweeper), decision queues, and `needs-maintainer-review` dominance across OpenClaw and ZeroClaw suggest strong demand for AI-assisted review/triage tooling — a meta-opportunity for agent developers.

---

*Sources: project-specific 24h digests dated 2026-09-10. Health scores are analyst-derived composites; all issue/PR references resolve to the cited repositories.*

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — Project Digest

**Date:** 2026-09-10
**Repository:** [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. Today's Overview

Hermes Agent saw elevated activity with **50 issues updated and 50 PRs updated in the last 24 hours**, indicating a high-velocity day despite no new releases being cut. The **close ratio is healthy**: 7 issues closed (14%) and 17 PRs merged/closed (34%) out of the active set, suggesting the maintainers are actively triaging and shipping. Recurring themes cluster around **provider routing bugs** (DeepSeek, OpenRouter), **plugin/dispatcher lifecycle issues** (Kanban, validation order), and **desktop UI regressions**. No new release artifacts were produced today, so all fixes remain in the PR queue awaiting the next version bump (currently on `v0.21.1` per issue context).

---

## 2. Releases

**No new releases in the last 24 hours.** The latest shipped version referenced in current issue reports is `v0.21.1` (see [#107238](https://github.com/NousResearch/hermes-agent/issues/107238)).

---

## 3. Project Progress — Merged/Closed PRs Today

Six PRs were merged/closed today, addressing a mix of provider quirks, session-state leaks, and cross-version compatibility:

| PR | Title | Impact |
|---|---|---|
| [#107295](https://github.com/NousResearch/hermes-agent/pull/107295) | DeepSeek provider no longer rewrites custom model ids (follow-up to #107206) | Vendor model names (`deepseek-flash`) now reach the API verbatim; only retired ids are remapped |
| [#107215](https://github.com/NousResearch/hermes-agent/pull/107215) | Keep vendor `deepseek-flash` instead of rewriting to retired `v4-flash` | Duplicate-of #107295 lineage; closes the model-id regression |
| [#107069](https://github.com/NousResearch/hermes-agent/pull/107069) | Stop background reviews creating phantom plugin sessions | Background skill/memory reviews no longer publish lifecycle events under the live conversation's session id |
| [#107144](https://github.com/NousResearch/hermes-agent/pull/107144) | Make `DaemonThreadPoolExecutor` compatible with Python 3.14 | Fixes `AttributeError` on the removed `_initializer`/`_initargs` — unblocks Py3.14 users |
| [#107260](https://github.com/NousResearch/hermes-agent/pull/107260) | Honor `effort: none` as thinking disabled alongside `enabled: false` | Resolves 68% thinking-token waste for DeepSeek desktop users |
| [#97863](https://github.com/NousResearch/hermes-agent/pull/97863) | Harden guest DB contention and journal ownership | Replaces #89420; introduces `BEGIN IMMEDIATE` retry primitive with bounded jitter |

A notable pattern: **three of six merges target DeepSeek provider quirks**, indicating a focused cleanup of that integration before the next release.

---

## 4. Community Hot Topics

The five most-discussed items (by comment count) reveal where users are pulling maintainer attention:

1. **[#88584](https://github.com/NousResearch/hermes-agent/issues/88584) — 83 comments** — *Automated Nous→Enterkey merge blocked*. Merge conflicts in `cron/jobs.py` are stalling the dashboard updater on an older Enterkey release. This is a **release-engineering** issue, not a user-facing bug, but its outsized comment count (4× the next item) suggests long-friction between the Nous and Enterkey forks.

2. **[#10421](https://github.com/NousResearch/hermes-agent/issues/10421) — 21 comments, 9 👍 (highest 👍 in dataset)** — *Feature: turn-level live time context*. Users want agents to have a stable "now/today/current weekday" sense without requiring an explicit tool call. Strong upvote signal indicates **broad, latent demand** for temporal grounding in prompts.

3. **[#100401](https://github.com/NousResearch/hermes-agent/issues/100401) — 13 comments** — *Cron fire-claim heartbeat deadlocks on its own run*. A cron delivery still in flight at the 60s heartbeat tick is killed 30s later as a phantom "shutdown." This is a **message-delivery risk** flagged by the project's own sweeper taxonomy.

4. **[#58576](https://github.com/NousResearch/hermes-agent/issues/58576) — 12 comments** — *`web_server` event loop stalls up to 51s under heavy agent work (GIL pressure)*. Desktop UI freezes for ~1 minute during tool-heavy sessions. Cross-component (CLI, TUI, Gateway, Dashboard, Desktop) impact, P1 severity.

5. **[#71650](https://github.com/NousResearch/hermes-agent/issues/71650) — 10 comments** — *Toolset validation runs before plugin load*. Plugins registering their own toolsets (e.g., `beads`) always trip the "Unknown toolsets" warning — a false positive that has clearly been irritating users for two months.

**Underlying need:** users want **deterministic, low-friction plugin and provider lifecycles** — they are hitting the seams between discovery, validation, and runtime that the framework's strict ordering creates.

---

## 5. Bugs & Stability — Reported Today, Ranked by Severity

### P1 (Critical / message-delivery risk)
- **[#100401](https://github.com/NousResearch/hermes-agent/issues/100401)** — Cron fire-claim self-deadlock; no PR linked yet.
- **[#58576](https://github.com/NousResearch/hermes-agent/issues/58576)** — 51s event-loop stall, GIL pressure on Windows; no PR linked yet.
- **[#88667](https://github.com/NousResearch/hermes-agent/issues/88667)** — Callable `api_key` from `key_cmd` crashes custom-provider resolution with `AttributeError` (auth/config boundary).

### P2 (Functional / risk-session-state, risk-compatibility)
- **[#74712](https://github.com/NousResearch/hermes-agent/issues/74712)** — `codex_app_server` system prompt never sent (SOUL.md, memory, channel_overrides silently inert).
- **[#105104](https://github.com/NousResearch/hermes-agent/issues/105104)** — Desktop Bot Mode sidebar click is a no-op non-deterministically (zero backend activity on failure).
- **[#106292](https://github.com/NousResearch/hermes-agent/issues/106292)** — Kanban CLI completion bypasses `pre_tool_call` hooks, allows premature root completion.
- **[#107238](https://github.com/NousResearch/hermes-agent/issues/107238)** — Desktop "Thinking: Off" toggle is ignored by DeepSeek plugin → **PR [#107260](https://github.com/NousResearch/hermes-agent/pull/107260) already merged ✅**.
- **[#107270](https://github.com/NousResearch/hermes-agent/issues/107270)** — `memory` tool falsely reports file drift when MEMORY.md is byte-identical to `.bak` (loops refusals).
- **[#107272](https://github.com/NousResearch/hermes-agent/issues/107272)** — `/steer` during image preprocessing is acknowledged but ignored.
- **[#100602](https://github.com/NousResearch/hermes-agent/issues/100602)** — Sessions wedge at "Summarizing session…" when the compression call fails/times out (no fail-soft).
- **[#107199](https://github.com/NousResearch/hermes-agent/issues/107199)** — Desktop Bot Chat reverts to `default` profile on history refresh.
- **[#101039](https://github.com/NousResearch/hermes-agent/issues/101039)** — WeChat/iLink "rate limited" false positive masks connection instability.
- **[#105719](https://github.com/NousResearch/hermes-agent/issues/105719)** — `hermes status` counts other users' gateway processes as the caller's (no UID filter on `/proc` scan).
- **[#103717](https://github.com/NousResearch/hermes-agent/issues/103717)** — `multiplex_profiles` drops follow-ups from secondary-profile owners (no profile scope on busy path).

### P3 (Cosmetic / warnings / low-impact)
- **[#107296](https://github.com/NousResearch/hermes-agent/issues/107296)** — systemd gateway unit PATH omits NixOS `/run/current-system/sw/bin`.
- **[#101160](https://github.com/NousResearch/hermes-agent/issues/101160)** — Buzz read-idle watchdog reconnects every 300s on healthy quiet relays.

**Recently closed P1s (resolved today):** [#106459](https://github.com/NousResearch/hermes-agent/issues/106459) — the "permanently uncompressible" pain cluster, which had been flagged via the weekly user-pain miner.

**Fix coverage:** Out of ~13 active bug issues today, **only one (#107238 → #107260) has a confirmed merge**. The P1 cluster remains largely **unfixed**, particularly the cron deadlock (#100401) and the GIL event-loop stall (#58576).

---

## 6. Feature Requests & Roadmap Signals

Open feature/enhancement requests worth noting for the next release:

| Feature | Issue/PR | Likelihood for v0.22 |
|---|---|---|
| Turn-level live time context | [#10421](https://github.com/NousResearch/hermes-agent/issues/10421) (9 👍) | **High** — strongest upvote signal in the dataset |
| Standalone Desktop plugins in the Plugin Catalog | [#107262](https://github.com/NousResearch/hermes-agent/issues/107262) + PR [#107314](https://github.com/NousResearch/hermes-agent/pull/107314) | **High** — PR already opened today |
| Operator-defined worker profiles for subagent delegation | [PR #103346](https://github.com/NousResearch/hermes-agent/pull/103346) | Medium — needs-decision label |
| Active provider in runtime footer | [PR #95135](https://github.com/NousResearch/hermes-agent/pull/95135) | Medium |
| Trusted scheduled-run hooks for cron | [PR #93977](https://github.com/NousResearch/hermes-agent/pull/93977) | Medium |
| Custom language servers in `lsp.servers` | [PR #103372](https://github.com/NousResearch/hermes-agent/pull/103372) | Medium |
| Markdown streaming redesign in classic CLI | [PR #107074](https://github.com/NousResearch/hermes-agent/pull/107074) | Medium |
| Run assistant shell blocks in terminal (Desktop) | [PR #92017](https://github.com/NousResearch/hermes-agent/pull/92017) | Low–Medium |

**Signal:** The maintainer `teknium1` opened two of today's PRs ([#107314](https://github.com/NousResearch/hermes-agent/pull/107314), [#107295](https://github.com/NousResearch/hermes-agent/pull/107295)), indicating a **desktop-plugins architectural pivot** (plugins moving to app-level scope) is imminent.

---

## 7. User Feedback Summary

**Recurring pain points (theme extraction from active issues):**

1. **Provider-routing surprise** — Multiple distinct issues (#59089, #74143, #88667, #99389) report that an explicitly chosen provider silently reroutes through OpenRouter or crashes on custom credentials. Users feel they are losing **control over model selection**.
2. **Silent plugin lifecycle gaps** — Plugin toolsets flagged as "unknown" (#71650, #91757 duplicate), desktop plugins failing on null SDK namespaces ([PR #107309](https://github.com/NousResearch/hermes-agent/pull/107309)), and Kanban completion bypassing hooks (#106292). Users want **deterministic plugin behavior**.
3. **Session-state leakage and compression fragility** — #106459 (closed), #100602 (open), #74712 (system prompt silently dropped). Users report **wasted tokens, lost context, and unrecoverable sessions** — high-impact frustration.
4. **Desktop UI flakiness** — #58576 (51s freeze), #105104 (no-op sidebar click), #107199 (wrong profile on refresh), #107238 (toggle ignored). The **desktop surface** is the highest-density regression zone.
5. **Multi-user / NixOS host edge cases** — #105719 (cross-user process scan), #107296 (systemd PATH on NixOS). Power-user friction.

**Satisfaction read:** No positive reactions (👍) on bug issues, and the strongest 👍 (9) is on a **feature** request (#10421), not a fix. The community is asking for **new capability**, not just stability work — a healthy signal for an active project, but the absence of 👍 on resolved bugs suggests users don't signal gratitude as readily as they signal feature demand.

---

## 8. Backlog Watch — Long-Unanswered or Maintainer-Attention Needed

| Item | Opened | Days Open | Concern |
|---|---|---|---|
| **[#10421](https://github.com/NousResearch/hermes-agent/issues/10421)** | 2026-04-15 | ~148 days | Highest 👍 feature; needs a maintainer `needs-decision` call |
| **[#58576](https://github.com/NousResearch/hermes-agent/issues/58576)** | 2026-07-05 | ~67 days | P1, multi-component, no PR — likely needs GIL-removal or async refactor |
| **[#71650](https://github.com/NousResearch/hermes-agent/issues/71650)** | 2026-07-26 | ~46 days | Trivial fix (reorder validation), two duplicate reports (#91757) accumulating — **quick win available** |
| **[#74712](https://github.com/NousResearch/hermes-agent/issues/74712)** | 2026-07-30 | ~42 days | `codex_app_server` system prompt never sent — entire SOUL/memory stack silently broken for that runtime |
| **[#67426](https://github.com/NousResearch/hermes-agent/pull/67426)** | 2026-07-19 | ~53 days | Open PR for `write_file` path-normalization; `needs-decision`, `blast-moderate` label, no merge |
| **[#10421](https://github.com/NousResearch/hermes-agent/issues/10421)** | — | — | Same as above; flagged `needs-decision` |
| **[#91981](https://github.com/NousResearch/hermes-agent/pull/91981)** | 2026-08-22 | ~19 days | Docker worker workspaces, security-boundary label, author discloses heavy AI use — needs careful human review |
| **[#88584](https://github.com/NousResearch/hermes-agent/issues/88584)** | 2026-08-17 | ~24 days | Cross-fork release pipeline (Nous→Enterkey); 83 comments but appears to require maintainer-coordination across orgs |

**Action items for maintainers:**
- Resolve [#71650](https://github.com/NousResearch/hermes-agent/issues/71650) — a one-line reorder would close 2 open issues.
- Triage [#100401](https://github.com/NousResearch/hermes-agent/issues/100401) and [#58576](https://github.com/NousResearch/hermes-agent/issues/58576) — both P1, both stale.
- Decide [#10421](https://github.com/NousResearch/hermes-agent/issues/10421) — 148 days old, 9 👍, has `needs-decision` flag.

---

*Digest generated from GitHub activity on 2026-09-10. All links resolve to NousResearch/hermes-agent issues and pull requests.*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-10

## 1. Today's Overview

IronClaw is in a low-volume but technically substantive development phase. Only 1 issue and 4 pull requests saw activity in the last 24 hours, with no new releases shipped. All 4 PRs remain open, indicating an active but non-concluding work-in-progress day. The technical content is high quality — the open work spans hosted-MCP correctness, extension packaging semantics, and Telegram UX — suggesting maintainer focus on foundational integrity rather than surface features. No critical outages or community escalation signals are present.

## 2. Releases

No new releases were published in the last 24 hours. No version bumps or changelog updates to report.

## 3. Project Progress

**No PRs were merged or closed today.** All active work remains in the open state:

- [#8090](https://github.com/nearai/ironclaw/pull/8090) — `fix(mcp): key discovered hosted-MCP catalogs per caller, not per extension` (updated 2026-09-10). Aims to fix a cross-tenant tool-list overwriting bug on hosted-MCP servers where tool discovery depends on caller credentials.
- [#8084](https://github.com/nearai/ironclaw/pull/8084) — `feat(mcp): opt-in SEP-414 caller attribution on outbound hosted-MCP calls` (updated 2026-09-09). Adds per-conversation attribution and retry-idempotency semantics to outbound MCP calls.
- [#8085](https://github.com/nearai/ironclaw/pull/8085) — `fix(extensions): treat operator-installed packages like host-bundled ones` (updated 2026-09-09). Reconciles an inconsistency between the extension constructor and validator regarding inline dynamic schemas.
- [#8072](https://github.com/nearai/ironclaw/pull/8072) — `feat(telegram): register the Bot API command menu at activation` (updated 2026-09-09). Adds native Telegram command menu registration (`setMyCommands` / `deleteMyCommands`) at extension lifecycle boundaries.

None of these have landed yet, so no features formally advanced into the codebase today.

## 4. Community Hot Topics

Engagement across all listed items is low — zero likes and zero comments on every issue and PR. No viral discussions or contested debates are visible. The most thematically prominent thread is the **hosted-MCP caller-keying work**, which spans two related PRs from the same author ([#8090](https://github.com/nearai/ironclaw/pull/8090), [#8084](https://github.com/nearai/ironclaw/pull/8084)) and reflects a coherent design direction: making hosted MCP servers correctly multi-tenant and retry-safe. Underlying community need being addressed: **safe deployment of IronClaw in multi-user / hosted environments**, where per-user isolation is mandatory.

## 5. Bugs & Stability

**One bug report filed/updated today:**

| Severity | Item | Description | Fix Available? |
|---|---|---|---|
| Medium (UX) | [#8091](https://github.com/nearai/ironclaw/issues/8091) | WebChat v2 sends a chat message when Enter is pressed to confirm an IME composition, leaking unfinished text. The reporter notes this appears to be a recurrence of a previously fixed behavior. | No PR linked yet. |

No crashes, data-loss issues, or security regressions were reported today. The single open bug is a localized input-handling regression in WebChat v2's IME flow.

## 6. Feature Requests & Roadmap Signals

No explicit user-submitted feature requests in the last 24 hours. However, maintainer-initiated PRs serve as forward roadmap signals:

- **Hosted MCP multi-tenancy** ([#8090](https://github.com/nearai/ironclaw/pull/8090), [#8084](https://github.com/nearai/ironclaw/pull/8084)) — strongly suggests an upcoming release will make IronClaw's MCP integration deployable as a shared hosted service with proper caller isolation and SEP-414-compliant attribution.
- **Extension packaging parity** ([#8085](https://github.com/nearai/ironclaw/pull/8085)) — indicates cleanup of extension install-time invariants, a precursor to broader distribution/deployment workflows.
- **Telegram native command menu** ([#8072](https://github.com/nearai/ironclaw/pull/8072)) — signals continued investment in the Telegram channel as a first-class surface.

Likelihood for next version: high for the Telegram command menu (low-risk, scoped, dependency-light); medium for the MCP caller-keying fix (architecturally important but may need additional review); the SEP-414 attribution feature is opt-in and likely to ship alongside the fix.

## 7. User Feedback Summary

User-facing signal volume today is minimal. The lone user-reported item, [#8091](https://github.com/nearai/ironclaw/issues/8091), expresses frustration with an input-handling regression affecting non-English / IME users on WebChat v2. The pain point is concrete and reproducible: a keystroke intended to finalize text composition accidentally submits the message. Satisfaction cannot be meaningfully assessed from the available engagement (0 reactions, 0 comments across all items), but the technical framing of the reporter's report is precise, suggesting an experienced user.

## 8. Backlog Watch

No items in today's activity set are stale — all are dated 2026-09-08 or 2026-09-09, well within the active-attention window. Items worth monitor-mode attention from maintainers:

- [#8091](https://github.com/nearai/ironclaw/issues/8091) — IME bug in WebChat v2; reported as a recurrence of prior fixed behavior, warrants prompt triage to confirm regression vs. new surface.
- [#8090](https://github.com/nearai/ironclaw/pull/8090) — Multi-tenant correctness fix on hosted-MCP; correctness impact is high (cross-user tool overwrites) and should be prioritized for review.
- [#8072](https://github.com/nearai/ironclaw/pull/8072) — Oldest of today's PRs (created 2026-09-04); labeled as low-risk, docs-and-dependencies scoped, experienced contributor — a quick-win candidate if reviewers can spare cycles.

No long-unanswered items surfaced from today's data set.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-10

## 1. Today's Overview

QwenPaw is in a high-activity, pre-release stabilization phase. The maintainers shipped **v2.2.1-beta.2** on the same day, accompanied by the usual release-duty verification issue (#7674). The pipeline shows **62 combined issue/PR updates** in 24 hours with a healthy 41% merge/close ratio (13 of 33 PRs), indicating active triage rather than a bottleneck. The work distribution skews toward **channel reliability** (Feishu deadlock, WeCom streaming, Telegram polling blackhole), **memory subsystem maturation** (ReMe commands, memory backend fallback, FTS corruption), and **test-coverage hardening** (multiple +2.4k and +382 case PRs landing). One critical Windows security-sandbox report (#7672) arrived today and warrants prompt triage. Overall project health: **active and shipping**, with concentrated risk on cross-session/multi-channel state machines.

## 2. Releases

### v2.2.1-beta.2 — Published 2026-09-10
- **Type:** Beta (pre-release)
- **Release page:** https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.2

**Changes:**
- `feat(console): improve mobile agent selector` — [#7623](https://github.com/agentscope-ai/QwenPaw/pull/7623) by @zhaozhuang521
- `chore: bump the version to 2.2.1b2` — [#7643](https://github.com/agentscope-ai/QwenPaw/pull/7643) by @cuiyuebing
- `fix(console): align qwenpaw CSS selectors` — by @zhaozh (PR truncated in feed)

**Migration notes:** Beta designation; users on 2.2.0 stable should not expect a forced upgrade. Release-duty checklist #7674 requires installation verification on all tier-1 platforms by 2026-09-10 14:20 UTC. No breaking schema or config changes are indicated in the changelog.

## 3. Project Progress (Merged/Closed PRs)

**Closed today (notable):**
- **#7647** — `fix(channels): support Base64 data URLs in outbound media` ([link](https://github.com/agentscope-ai/QwenPaw/pull/7647)) — resolves WeCom image-send crashes; pairs with #7516 and #7370.
- **#7663** — `fix(memory): fall back when plugin backend is unavailable` ([link](https://github.com/agentscope-ai/QwenPaw/pull/7663)) — memory UX resilience; configured backend preserved on disk.
- **#7658** — `fix(backup): preserve Unix permission bits during restore for SECRET_DIR and .master_key` ([link](https://github.com/agentscope-ai/QwenPaw/pull/7658)) — **security fix**, addresses silent permission degradation (`0o700→0o755`, `0o600→0o644`).
- **#7655** — `fix(history): repair FTS corruption and retention cleanup` ([link](https://github.com/agentscope-ai/QwenPaw/pull/7655)) — fixes #7596 (`SQLITE_CORRUPT_VTAB` in `history.db`).
- **#7641** — `fix(release): retry and verify desktop artifact downloads` ([link](https://github.com/agentscope-ai/QwenPaw/pull/7641)) — release-tooling reliability.
- **#7667** — `fix(files): show upload only in workspace` ([link](https://github.com/agentscope-ai/QwenPaw/pull/7667)) — frontend scope clarification.
- **#7645** — `test(e2e): rebuild the Environments suite for the unified env page` ([link](https://github.com/agentscope-ai/QwenPaw/pull/7645)) — keeps e2e green after #7538 refactor.
- **#7325** — `test(console): expand console unit tests` (+382 cases, +5.49pp) ([link](https://github.com/agentscope-ai/QwenPaw/pull/7325)) — quality uplift.
- **#6978** — `feat(commands): add session management slash commands` ([link](https://github.com/agentscope-ai/QwenPaw/pull/6978)) — first-time contributor; gives IM channels a `/sessions, /session` surface.

**Net effect:** A cluster of **memory + backup + history** durability fixes landed together, suggesting a coordinated reliability sprint; meanwhile the test-coverage initiative from QPQAT continues to expand (one PR alone adds 2,475 backend cases).

## 4. Community Hot Topics

| Rank | Item | Engagement | Underlying need |
|---|---|---|---|
| 1 | [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — Model reply disappears from context after persistence | 10 comments | Trust in conversation continuity; persistent UX of "the model can't see what it just said" |
| 2 | [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) — Optimise deploy page entrypoint placement | 9 comments | Mobile-first UX for the hosted deploy surface at platform.agentscope.io/deploy |
| 3 | [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) — Console stop cancels a Feishu session | 8 comments | Cross-channel session identity isolation |
| 4 | [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) — Bare-base64 tool outputs rejected with 400 | 7 comments | First-class multimodal support across agent→model contracts |
| 5 | [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) — Sync calls freeze event loop (118–135s) | 6 comments | Startup/responsiveness on Windows desktop |

**Cross-cutting signal:** Three of the top five concern **session/state correctness across UI surfaces and channels**. The community is implicitly asking for a single, authoritative session-identity model that survives UI switches and channel handoffs — a long-standing class of bug in QwenPaw.

## 5. Bugs & Stability

Ranked by blast radius and reproducibility:

| Severity | Issue | Component | Fix status |
|---|---|---|---|
| 🔴 Critical | [#7672](https://github.com/agentscope-ai/QwenPaw/issues/7672) — Security sandbox bypass on Windows | Core sandbox | **No fix PR yet** |
| 🔴 High | [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) — Event loop blocked 118–135s, timeout never fires | Runtime / desktop | No fix PR yet |
| 🔴 High | [#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) — Feishu queue consumer deadlock, session silently unresponsive | Feishu channel | No fix PR yet |
| 🟠 Medium | [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) — Tool-returned image/PDF as bare base64 → 400 | Tool contract | No direct fix in merged set today |
| 🟠 Medium | [#7596](https://github.com/agentscope-ai/QwenPaw/issues/7596) — `history.db` FTS corruption silent in integrity check | History/SQLite | **Fixed** by [#7655](https://github.com/agentscope-ai/QwenPaw/pull/7655) |
| 🟠 Medium | [#7445](https://github.com/agentscope-ai/QwenPaw/issues/7445) — QwenPaw Hub fails to connect on LAN/local URLs | Hub | No fix PR yet |
| 🟠 Medium | [#7507](https://github.com/agentscope-ai/QwenPaw/issues/7507) — WeCom 150ms char throttling | WeCom channel | No fix PR yet |
| 🟠 Medium | [#7668](https://github.com/agentscope-ai/QwenPaw/issues/7668) — Mail monitor `last_uid=0` re-processes entire INBOX | Mail monitor | No fix PR yet |
| 🟡 Lower | [#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642) — Chrome console streaming renders nothing | Console | Closed today |
| 🟡 Lower | [#7661](https://github.com/agentscope-ai/QwenPaw/issues/7661) — New conversation created twice on first ask | Console | No fix PR yet |
| 🟡 Lower | [#7666](https://github.com/agentscope-ai/QwenPaw/issues/7666) — Local model can't download from HF | Desktop | Closed (close-and-review-later) |
| 🟡 Lower | [#7662](https://github.com/agentscope-ai/QwenPaw/issues/7662) — Telegram polling dies silently behind proxy | Telegram channel | Closed today |

**Security item:** The Windows sandbox bypass report #7672 is a newly opened, single-comment issue that should not be allowed to age.

## 6. Feature Requests & Roadmap Signals

Active and likely candidates for the next minor (2.2.x → 2.3):

| Feature | Issue / PR | Likelihood | Reasoning |
|---|---|---|---|
| ReMe slash-command unification | [#7444](https://github.com/agentscope-ai/QwenPaw/pull/7444) | **High** | Rebased on landed #7561 foundation; chat-facing surface ready |
| Advisor Mode (dual-model worker/advisor loop) | [#7569](https://github.com/agentscope-ai/QwenPaw/pull/7569) | High | Self-contained loop mode; fits existing "Goal/Mission" picker pattern |
| PawPort import flow (Codex/Qoder) | [#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960) | Medium-High | Long-lived (open since 2026-08-13), actively updated |
| ntfy channel support | [#7657](https://github.com/agentscope-ai/QwenPaw/issues/7657) | Medium | Working implementation offered by author; fits self-hosting ethos |
| MCP `tls_verify` / `ca_file` | [#4175](https://github.com/agentscope-ai/QwenPaw/issues/4175) | Medium | 4-month-old; needed for enterprise/private CA deployments |
| Auto-downscale oversized images on attach | [#7671](https://github.com/agentscope-ai/QwenPaw/issues/7671) | Medium | Clear scope; replaces a frustrating UX cliff |
| Syntax highlighting in Files panel Preview | [#7670](https://github.com/agentscope-ai/QwenPaw/issues/7670) | Low-Medium | Cosmetic but easy |
| Separate `memory_model` in `MemoryConfig` | [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) | Medium | Cost-control narrative is compelling |
| Native mobile (Expo/RN) | [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) | Low (longer horizon) | Marked `[DO NOT MERGE]`; exploratory |
| Third-party durable-memory integration (MemCode) | [#7656](https://github.com/agentscope-ai/QwenPaw/issues/7656) | Low | Vendor-outreach issue; useful as ecosystem signal |

## 7. User Feedback Summary

- **Pain — Reliability over flash:** Today's hottest issues are all about silent failures (#7579, #7534, #7668, #7662). Users consistently cite scenarios where they cannot tell whether the agent is "thinking" or "stuck". A clear **session-liveness indicator + automatic recovery** is repeatedly implied.
- **Pain — Windows desktop experience:** #7363 (multi-minute freezes), #7672 (sandbox), #7666 (HF download) cluster on Windows, indicating that desktop parity with macOS/Linux is a real gap.
- **Pain — Mobile ergonomics:** #7177 and #7642 (Chrome-only streaming) show the mobile/browser Console still needs dedicated UX work — the v2.2.1b2 agent-selector tweak (#7623) is a step but not the destination.
- **Satisfaction signal:** #7569 (Advisor Mode), #7444 (ReMe commands), #6960 (PawPort) have all generated positive sustained engagement without complaint threads, suggesting the community approves the direction of **pluggable model roles** and **portability**.
- **Ecosystem goodwill:** First-time contributors (myselfAbdullah007, chenzier, LUOSENGWA) are landing meaningful fixes (#7611, #7614, #6978) — the contribution bar is healthy.

## 8. Backlog Watch

These items have aged past the point where they should still be open and unanswered:

| Item | Age | Why it matters | Action needed |
|---|---|---|---|
| [#3113](https://github.com/agentscope-ai/QwenPaw/issues/3113) — Team collaboration ignored on first request | **~5 months** (2026-04-08) | Confirmed reproducible; core advertised feature | Triage to a milestone or close with rationale |
| [#4175](https://github.com/agentscope-ai/QwenPaw/issues/4175) — `tls_verify`/`ca_file` in MCP client | **~4 months** (2026-05-10) | Blocks enterprise MCP integrations | Label `accepted` or `needs-design` |
| [#7507](https://github.com/agentscope-ai/QwenPaw/issues/7507) — WeCom 150ms char throttle | 8 days | Affects every WeCom user; easy perf win | Quick-fix candidate |
| [#7445](https://github.com/agentscope-ai/QwenPaw/issues/7445) — Hub local URL connection | 10 days | Hub is a flagship 2.2 feature | Needs ack + fix branch |
| [#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) — Feishu queue deadlock | 7 days | Session-killing; affects production users | Should not miss the next release |
| [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) — Sync event-loop block | 14 days | Cold-start UX regression | Needs maintainer-visible assignment |
| [#7672](https://github.com/agentscope-ai/QwenPaw/issues/7672) — Windows sandbox bypass | **<24h** | Security severity | Immediate triage and CVE evaluation |

---

**Bottom line:** QwenPaw is shipping (v2.2.1-beta.2 out the door) while running a deliberate reliability sweep on memory, history, and channel plumbing. The most material risks for the next stable cut are (1) the Windows sandbox report #7672, (2) the Feishu deadlock #7534, and (3) the recurring class of cross-session state bugs (#7579, #7011, #7661, #7231) — addressing the latter as a class rather than individually would yield outsized stability gains.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-10

## 1. Today's Overview

ZeroClaw shows an unusually high governance and architecture-heavy activity pattern. Across 26 issue updates and 50 PR updates, the project is dominated by **long-running RFCs** (Runtime sessions, file/attachment architecture, WASM plugin runtime, append-only event history) and **tracker items**, rather than a high volume of new feature landings. Two issues and several PRs were closed in the last 24 hours, but **no new releases** were published, indicating the project is in a design-and-stabilization phase rather than a ship phase. The activity is concentrated among a small set of high-impact contributors (Audacity88, NiuBlibing, IftekharUddin), with maintainer attention explicitly routed through issue #8692's decision queue.

## 2. Releases

**No new releases in the last 24 hours.** No version tags or release notes are available for digest.

## 3. Project Progress

PRs closed/merged in the last 24 hours (7 in total):

- **[#9212](https://github.com/zeroclaw-labs/zeroclaw/pull/9212)** — `feat(eval): gate CI on the replay regression suite` — Splits replay fixtures into `evals/regression/` and makes them a hard CI gate via `crates/zeroclaw-eval/tests/regression_suite.rs`, including a negative case (`no_tools_on_greeting.json`).
- **[#8546](https://github.com/zeroclaw-labs/zeroclaw/pull/8546)** — `fix(cli): localize status fragments` — Refreshed onto current master with missing-dashboard and filesystem-containment regression tests; CLI status now localized.
- **[#10730](https://github.com/zeroclaw-labs/zeroclaw/pull/10730)** — `chore(assets): optimize PR-evidence images via ImgBot lossless compression` — 14 PNG assets compressed losslessly.
- (4 additional closed PRs not shown in the top-20 comment list.)

Issues closed in the last 24 hours:

- **[#10548](https://github.com/zeroclaw-labs/zeroclaw/issues/10548)** — Mermaid diagram `aria-hidden` accessibility regression introduced by PR #10515; resolved.
- **[#10540](https://github.com/zeroclaw-labs/zeroclaw/issues/10540)** — `zeroclaw status` now reports Web dashboard asset availability.

Net progress signal: incremental, governance-leaning. No user-visible feature landed; the closed work was CI hardening, i18n, and diagnostics.

## 4. Community Hot Topics

| # | Item | Comments | Type |
|---|---|---|---|
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | RFC: Runtime-owned conversation sessions and transport surface adapters (Rev. 5) | 37 | RFC, p2 |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | RFC: Unified file and attachment architecture for conversation surfaces (Rev. 10) | 30 | RFC, p2 |
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | RFC: Granular sandbox policy — filesystem restrictions | 29 | RFC, p2, accepted |
| [#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396) | RFC: Make wire protocol first-class in provider construction | 19 | RFC, p2 |
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | Tracker: Maintainer decision queue for RFCs and design issues | 15 | Tracker |

**Underlying need:** the conversation and channel subsystem is being re-architected around a unified runtime-owned session model, unified attachment handling, and wire-protocol-as-first-class. This implies the project is mid-rewrite of its core agent ↔ channel boundary, and most community discussion energy is concentrated there. The maintainer decision-queue tracker (#8692) explicitly exists to absorb the decision backlog from these long-running RFCs — a signal that the project has hit the limit of informal review.

## 5. Bugs & Stability

Ranked by severity tag and risk:

| Severity | Issue | Description | Fix PR available? |
|---|---|---|---|
| **S1 (workflow blocked)** | [#10673](https://github.com/zeroclaw-labs/zeroclaw/issues/10673) | Failed ACP turns not persisted on daemon RPC path (ZeroCode Code pane) — remaining slice of #9333 | Related fix landed in #9378; no PR linked yet for this slice |
| **S1/P1** | [#10645](https://github.com/zeroclaw-labs/zeroclaw/issues/10645) | Cost-tracking context not threaded into delegated sub-loops; `check_tool_loop_budget` returns None | No fix PR linked |
| **High (dep)** | [#10728](https://github.com/zeroclaw-labs/zeroclaw/issues/10728) | `npm audit` failed — `js-yaml` high vulnerability | No PR linked |
| **S2** | [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) | `process_line` stack overflow on Windows nextest (`0xc00000fd`) in `zeroclaw-runtime::rpc::dispatch::tests` | No fix PR linked |
| **S2** | [#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) | `zeroclaw service logs` prints nothing on macOS/Windows/OpenRC | No fix PR linked |
| **S2** | [#10741](https://github.com/zeroclaw-labs/zeroclaw/issues/10741) | ZeroCode silently pauses queued work after a normal-looking completed response | No fix PR linked |
| **S2** | [#10740](https://github.com/zeroclaw-labs/zeroclaw/issues/10740) | `Ctrl+N` inconsistent with `[+]` sidebar for "new session" semantics | No fix PR linked |
| **S2** | [#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736) | Pre-output stream failure skips the advertised non-streaming fallback | No fix PR linked |
| **S2** | [#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689) | Telegram voice reply skipped when reply starts with `[` (ElevenLabs v3 audio tags) | No fix PR linked |
| **S2/Follow-up** | [#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662) | OAuth system-prefix cache marker below Anthropic's minimum, consumes a breakpoint slot | No fix PR linked |

**Pattern:** 6 of 10 active bugs have **no fix PR linked**. The most acute stability risks are (a) ACP turn-persistence loss in the daemon RPC path and (b) cost-enforcement gaps in delegated sub-loops — both security/correctness issues without a queued patch.

## 6. Feature Requests & Roadmap Signals

Active enhancement RFCs and feature work:

- **[#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076)** — Composable WASM plugin runtime architecture (Rev. 2026-09-01, session-history split out to #10526). **High likelihood of shaping a future release**; declared as the exclusive authority for append-only event vocabulary going forward.
- **[#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526)** — Append-only session event history with deterministic replay and derived agent streams. **Foundational for future memory continuity features.**
- **[#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)** — RFC voting simplification (remove mandatory discussion windows, REVISE stops current snapshot). Process change; likely fast to land.
- **[#10360](https://github.com/zeroclaw-labs/zeroclaw/issues/10360)** — Opt-in household edge mesh with pull workers and signed receipts. Larger architectural direction.
- **[#10346](https://github.com/zeroclaw-labs/zeroclaw/issues/10346)** — Gateway/channels adopting the heartbeat worker's MCP-registry-caching pattern (fixes 3× stdio spawn per boot).
- **[#9967](https://github.com/zeroclaw-labs/zeroclaw/issues/9967)** — Tracker for a harness evaluation framework (benchmark selection, config pinning, baseline on master).

Open PRs most likely to land in the next release:

- **[#10716](https://github.com/zeroclaw-labs/zeroclaw/pull/10716)** — Price cache writes at the configured write premium (cost ledger fix spanning 11 provider backends).
- **[#10480](https://github.com/zeroclaw-labs/zeroclaw/pull/10480)** — Quarantine provider-rejected images with typed adapter-recognized codes (Anthropic + compatible).
- **[#10640](https://github.com/zeroclaw-labs/zeroclaw/pull/10640)** — Passive Telegram group context (opt-in `passive_group_context`).
- **[#10623](https://github.com/zeroclaw-labs/zeroclaw/pull/10623)** — Anthropic prompt-cache passthrough for OpenAI-compatible providers.
- **[#10455](https://github.com/zeroclaw-labs/zeroclaw/pull/10455)** — Gateway config write invariants (security-relevant; distinguishes config write safety).
- **[#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)** — Anchor context compaction to model window ratio (XL change; touches many crates).
- **[#10553](https://github.com/zeroclaw-labs/zeroclaw/pull/10553)** — ZeroCode "Add to Chat" for transcript selection.

## 7. User Feedback Summary

Direct user/operator pain points visible from today's items:

- **Cross-platform daemon diagnostics are broken.** `zeroclaw service logs` is silent on macOS, Windows, and OpenRC while healthy ([#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731)). Operators cannot observe daemon state without jumping through `journalctl`-only assumptions.
- **Windows CI is fragile.** Stack overflow in `process_line` test on constrained Windows thread stacks ([#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)) shows the suite assumes Linux-friendly stack sizes.
- **Telegram UX gap.** ElevenLabs v3 audio tags (`[...]`) silently degrade to text-only voice replies with no log line ([#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689)).
- **ZeroCode TUI inconsistencies.** Ctrl+N semantics diverge from `[+]` sidebar ([#10740](https://github.com/zeroclaw-labs/zeroclaw/issues/10740)); queued work can silently stall after a clean response ([#10741](https://github.com/zeroclaw-labs/zeroclaw/issues/10741)).
- **Supply-chain concerns.** `js-yaml` high-severity audit finding ([#10728](https://github.com/zeroclaw-labs/zeroclaw/issues/10728)) is raised automatically by CI; resolution cadence matters for downstream operators.
- **Architectural ask.** Operators want a single-runtime expansion path via household edge mesh ([#10360](https://github.com/zeroclaw-labs/zeroclaw/issues/10360)) — the existing "one host" model is seen as a ceiling.

No explicit satisfaction/dissatisfaction comments were present in the dataset (all issues show 0 thumbs-up).

## 8. Backlog Watch

Items needing maintainer attention and not recently addressed:

- **[#10412](https://github.com/zeroclaw-labs/zeroclaw/pull/10412)** — XL PR extracting `SessionBackend::claim_session_agent_alias`; `needs-author-action`. Stale relative to peers (opened 2026-08-27).
- **[#10468](https://github.com/zeroclaw-labs/zeroclaw/pull/10468)** — XL PR exposing owned ACP sessions to session tools; `needs-maintainer-review`, `risk:high`. Security-relevant for ACP flows.
- **[#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819)** — XL multimodal PR adding pixel-level image validation; `needs-author-action`, `risk:high`. Important for preventing corrupt-image provider failures.
- **[#9214](https://github.com/zeroclaw-labs/zeroclaw/pull/9214)** — XL eval live-execution mode PR; depends on #9212 (now closed). Unblock likely.
- **[#9225](https://github.com/zeroclaw-labs/zeroclaw/pull/9225)** — XL eval PR adding boundary-backed replay cases; stacked on #9212 (closed), so likely actionable now.
- **[#10346](https://github.com/zeroclaw-labs/zeroclaw/issues/10346)** — RFC for gateway/channel sharing the MCP-registry caching pattern; `needs-author-action`. Stale (opened 2026-08-25).
- **[#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396)** — Wire-protocol-first-class RFC; `needs-author-action`, no maintainer movement since Rev. 15.
- **[#10645](https://github.com/zeroclaw-labs/zeroclaw/issues/10645)** — P1 cost-tracking bug; **no fix PR queued**, affects delegated sub-loop budget enforcement.

**Maintainer bottleneck signal:** `needs-maintainer-review` is the dominant gating label across the highest-impact RFCs and PRs. The active decision-queue tracker ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)) is the project's explicit mitigation; its throughput will determine the next release's shape.

---

*Digest generated from GitHub activity snapshot for 2026-09-10. Source: [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw).*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*