# OpenClaw Ecosystem Digest 2026-09-07

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-07 01:51 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-07

## 1. Today's Overview

OpenClaw is in an active but **strained** development cycle on 2026-09-07, with substantial churn across the issue tracker and pull-request queues: 500 issues touched in the last 24 hours (375 still open, 125 closed) and 500 PRs touched (310 open, 190 merged/closed). **No new releases shipped in the 24-hour window**, but the volume of P0/P1 activity — particularly around the 2026.9.x line, Windows gateway startup, and session/state lifecycle — suggests maintainers are still working through regressions introduced by recent versions rather than cutting new tags. The project is healthy in terms of throughput (high merge/close rate, many cross-linked fix PRs ready for maintainer review) but the issue backlog skews heavily toward **stability, session integrity, and provider/auth regressions** rather than new features. Overall, the project is in a stabilization phase following the 2026.9.1 and 2026.9.2 cadence.

---

## 2. Releases

**No new releases in the last 24 hours.** The most recent versions referenced in the data are 2026.9.1 (`ad6fe23`) and 2026.9.2, both of which are involved in multiple open P0/P1 regressions — notably:

- **2026.9.1**: Windows gateway fails to start ([#137813](https://github.com/openclaw/openclaw/issues/137813)); cron scheduler silently swallows ticks ([#139215](https://github.com/openclaw/openclaw/issues/139215)); claude-cli 410 session_expired ([#132720](https://github.com/openclaw/openclaw/issues/132720)).
- **2026.9.2**: `updateCommand` admits an `update_runs` row it can never finalize ([#139714](https://github.com/openclaw/openclaw/issues/139714)); concurrent-reply message drop with `Reply operation has no active tool authority snapshot` ([#139847](https://github.com/openclaw/openclaw/openclaw/issues/139847)); llama.cpp EmbeddingGemma ubatch regression ([#139578](https://github.com/openclaw/openclaw/issues/139578)).

The 2026.9.x line is the dominant regression frontier, and many of the open fix PRs in the queue are explicitly targeting it.

---

## 3. Project Progress

Approximately **190 PRs were merged or closed** in the last 24 hours, and a large number of fresh fix PRs opened on 2026-09-07 are queued for maintainer review. Notable merged/closed work and in-flight progress:

- **PR #140566 (closed)** — *fix(anthropic): preserve resumed CLI caches across Git changes* ([link](https://github.com/openclaw/openclaw/pull/140566)) by VACInc. Disables Claude Code's startup Git snapshot for resumed CLI runs to prevent prompt-cache misses after workspace changes.
- **Issue #124991 (closed)** — CLI session reseed inert on SQLite session stores ([link](https://github.com/openclaw/openclaw/issues/124991)). Confirms the `loadCliSessionEntries` legacy-JSONL path was inert for SQLite installs.
- **Issue #137056 (closed)** — `memory-core`: move maintenance off search/watch hot paths and keep invalidation per-file ([link](https://github.com/openclaw/openclaw/issues/137056)).

Fresh PRs opened or updated today that are likely to land soon (most are "ready for maintainer look"):

- **PR #140589** — *fix(ci): avoid Linux packaging on pull requests* (vincentkoc) — CI cost/speed optimization.
- **PR #140593** — *fix(windows): avoid compiler-triggered gateway startup failures* (steipete) — Windows AV/compiler interference, related to [#139468](https://github.com/openclaw/openclaw/issues/139468).
- **PR #140603** — *fix(onboarding): load installed runtime for first dashboard chat* (steipete) — fixes Codex plugin onboarding.
- **PR #140531** — *fix(discord): reject numeric application ID pasted as bot token during setup* — addresses setup footgun.
- **PR #140458** — *fix(infra): start source workers outside the package directory* — fixes `ERR_MODULE_NOT_FOUND` for `tsx` for source installs.
- **PR #140235** — *fix(cli): reject blank numeric options across inference and scans* — closes a silent-shell-variable class of bugs.
- **PR #140563** — *fix(transcripts): preserve fixed and legacy capture history* — prevents archive re-opens.
- **PR #140412** — *fix: clear stale task progress when resetting a conversation* — UX cleanup.
- **PR #140598** — *fix(update): complete same-version Git-to-package switches* — release-engineering fix.
- **PR #140558** — *fix: identify workers behind slow session-write warnings* — observability.
- **PR #140602** — *refactor(telegram): unify delivery ownership and remove retired paths* (obviyus) — closes [#140601](https://github.com/openclaw/openclaw/issues/140601); relevant to the open Telegram internal-context leak [#137927](https://github.com/openclaw/openclaw/issues/137927).
- **PR #140597** — *fix(plugins): reduce bundled catalog lookup overhead* (steipete) — performance.
- **PR #140600** — *refactor(plugins): reuse immutable installed-index preparation* — startup perf.
- **PR #140599** — *refactor: consolidate LINE markdown parser coverage* — test/maintenance cleanup.
- **PR #140596** — *refactor(plugin-sdk): simplify approval forwarding mode resolution* — follow-up to [#135868](https://github.com/openclaw/openclaw/issues/135868).
- **PR #140594** — *fix(exec): accept no-pager overrides without executable lookup* — fixes `GIT_PAGER=cat` rejection.
- **PR #140585** — *fix(ci): keep routine iOS checks on a build smoke* — CI optimization.

Two more substantive PRs updated today and still open:

- **PR #136820** — *fix(subagents): keep in-flight announce handoffs retryable* (leilei3167) — addresses duplicate-handoff idempotency issue #136513; needs proof.
- **PR #134547** — *fix: prevent Codex compaction from stalling replies* (jarbas-marco) — closes #127148-class bug.

---

## 4. Community Hot Topics

The highest-traction issues in the last 24 hours cluster around **session integrity, provider malformation, and Windows gateway startup**. The underlying user need is clear: OpenClaw sessions, particularly those driven by `claude-cli` and Codex providers, are frequently ending up in unrecoverable or silently-degraded states, and the Windows install path is brittle.

| Rank | Issue | Comments | 👍 | Underlying need |
|---|---|---|---|---|
| 1 | [#97616](https://github.com/openclaw/openclaw/issues/97616) — OpenClaw leaks unreaped hook/tool child processes (zombies) | 14 | 1 | Process lifecycle hygiene; users want a stable, long-running Gateway. |
| 2 | [#135111](https://github.com/openclaw/openclaw/issues/135111) — Intermittent "Provider completed tool call with malformed JSON arguments" on v2026.8.1 | 14 | 0 | Provider robustness on `claude-sonnet-5`; users want reliable tool calls. |
| 3 | [#119720](https://github.com/openclaw/openclaw/issues/119720) — Sync agent persistence blocks Gateway event loop at scale | 12 | 0 | Performance/scale; Gateway responsiveness under load. |
| 4 | [#96975](https://github.com/openclaw/openclaw/issues/96975) — Isolate subagent completion from parent context | 12 | 1 | Subagent ergonomics; users want clean handoffs. |
| 5 | [#132762](https://github.com/openclaw/openclaw/issues/132762) — Overflow retry can end successfully on a tool result without final delivery | 12 | 0 | Correctness of retry/recovery semantics. |
| 6 | [#113306](https://github.com/openclaw/openclaw/issues/113306) — SQLite snapshot restore lacks crash/identity guarantees | 12 | 0 | Data durability for snapshot/restore. |
| 7 | [#41201](https://github.com/openclaw/openclaw/issues/41201) — Control UI Avatar not displaying (broken image) | 11 | 1 | Cosmetic but long-standing UX bug (open since 2026-03-09). |
| 8 | [#95610](https://github.com/openclaw/openclaw/openclaw/issues/95610) — Prompt-cache prefix churn on OpenAI models | 11 | 2 | Cost-of-operation; users want prompt-cache reuse. |
| 9 | [#137813](https://github.com/openclaw/openclaw/issues/137813) — Windows gateway never starts after 2026.9.1 | 11 | 0 | **Critical** Windows install/upgrade blocker. |
| 10 | [#48920](https://github.com/openclaw/openclaw/issues/48920) — Live Docs are ahead of release | 10 | 4 | Documentation/release hygiene. |

The common thread is **trust in the runtime**: zombie processes, malformed tool arguments, blocked event loops, dropped messages, and broken upgrades are all variants of "the Gateway should not silently degrade."

---

## 5. Bugs & Stability

**Severity-ranked summary of new/recently active P0 and P1 bug reports (with fix-PR availability):**

| Severity | Issue | Summary | Fix PR? |
|---|---|---|---|
| **P0 / release-blocker** | [#137813](https://github.com/openclaw/openclaw/issues/137813) | Windows gateway never starts after 2026.9.1; `--task-supervisor` exits 0 silently. | Not yet. |
| **P0 / release-blocker** | [#136203](https://github.com/openclaw/openclaw/issues/136203) | Windows de-DE 2026.8.2 upgrade leaves Doctor maintenance blocked. | Not yet. |
| **P0 / release-blocker** | [#114967](https://github.com/openclaw/openclaw/issues/114967) | agent-driven live update left `launchctl submit` keepalive force-restarting gateway every ~2 min. | Not yet. |
| **P0 / release-blocker** | [#48920](https://github.com/openclaw/openclaw/issues/48920) | Live Docs (Heartbeat IsolatedSessions) ahead of release 2026.3.13 — long-standing. | Not yet. |
| **P1** | [#97616](https://github.com/openclaw/openclaw/issues/97616) | Hook/tool child-process leak → zombie accumulation and runtime degradation. | Not yet. |
| **P1** | [#135111](https://github.com/openclaw/openclaw/issues/135111) | Intermittent malformed JSON tool-call args on v2026.8.1 (`claude-sonnet-5`). | Not yet. |
| **P1** | [#119720](https://github.com/openclaw/openclaw/issues/119720) | Sync agent persistence/transcript maintenance blocks Gateway event loop at scale. | Partial — runtime bulk deletion (#133925) and Doctor migration (#134062) landed; Gateway-thread perf still open. |
| **P1** | [#132762](https://github.com/openclaw/openclaw/issues/132762) | Overflow retry ends "success" on a tool result with no final delivery. | Not yet. |
| **P1** | [#127148](https://github.com/openclaw/openclaw/issues/127148) | Codex `sessions.compact` acquires a second app-server and hits active-writer conflict. | **PR #134547** open, needs proof. |
| **P1** | [#134579](https://github.com/openclaw/openclaw/issues/134579) | Active Memory `before_prompt_build` handler with `requiresToolAuthority` never dispatched (regression in 2026.8.1). | Not yet. |
| **P1** | [#112259](https://github.com/openclaw/openclaw/issues/112259) | Visible inbound channel turn silently dropped (zero-payload dispatch). | Not yet. |
| **P1** | [#99910](https://github.com/openclaw/openclaw/issues/99910) | Memory dreaming run pegs gateway event loop for ~10 min; short-term recall never persists. | Not yet. |
| **P1** | [#54488](https://github.com/openclaw/openclaw/issues/54488) | Session lane starvation — followup drain monopolizes lane, blocks inbound 20-30 min. | Not yet. |
| **P1** | [#132720](https://github.com/openclaw/openclaw/issues/132720) | `claude-cli` 410 `session_expired` on 2026.9.1-beta.1 with valid paste-token; Doctor migrates primary off `claude-cli`. | Not yet. |
| **P1** | [#101929](https://github.com/openclaw/openclaw/issues/101929) | `context-overflow-midturn-precheck` over-counts ~2.3–2.6x vs billed usage. | Not yet. |
| **P1** | [#92241](https://github.com/openclaw/openclaw/issues/92241) | Gateway holds stale module import paths after update/rollback → messages dropped. | **PR #140458** addresses the source-trees variant. |
| **P1** | [#124991](https://github.com/openclaw/openclaw/issues/124991) | CLI session reseed inert on SQLite session stores. | **Issue closed in 24h**; fix presumably landed. |
| **P1** | [#128637](https://github.com/openclaw/openclaw/issues/128637) | Multi-agent ambient operations fail with `AgentSelectionRequiredError`. | Not yet. |
| **P1** | [#112160](https://github.com/openclaw/openclaw/issues/112160) | SSH sandbox does not stage inbound media into existing remote workspace. | Not yet. |
| **P1** | [#90378](https://github.com/openclaw/openclaw/issues/90378) | 5.28 → 6.1 cron store migrated to SQLite silently; new jobs default to `delivery.mode=announce` causing channel errors. | Not yet. |
| **P1** | [#137813](https://github.com/openclaw/openclaw/issues/137813) / [#140010](https://github.com/openclaw/openclaw/issues/140010) | Sleep/resume on Windows leaves WebSocket reconnect failing for 30-60s+ on busy gateway. | Not yet. |
| **P1** | [#139847](https://github.com/openclaw/openclaw/issues/139847) | Message sent while a reply run is active is dropped (regression in 2026.9.2). | Not yet. |
| **P1** | [#139215](https://github.com/openclaw/openclaw/issues/139215) | Cron scheduler silently swallows scheduled ticks since 2026.9.1. | Not yet. |
| **P1** | [#140535](https://github.com/openclaw/openclaw/issues/140535) | Discord `/new` returns "No reply was generated" and does not reset channel session. | Not yet. |
| **P1** | [#134896](https://github.com/openclaw/openclaw/issues/134896) | 2026.8.1 update: 5-blocker gateway restart cascade + doctor `--fix` self-referential failure. | Not yet. |
| **P1** | [#140535](https://github.com/openclaw/openclaw/issues/140535) | (already listed above) | — |
| **P1** | [#140010](https://github.com/openclaw/openclaw/issues/140010) | (already listed above) | — |
| **P1** | [#139714](https://github.com/openclaw/openclaw/issues/139714) | post-core update resume child admits an `update_runs` row

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem
**Data window:** 2026-09-06 → 2026-09-07 UTC | Projects: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The personal AI assistant ecosystem has consolidated around a common runtime shape — a gateway/desktop core orchestrating LLM providers, messaging channels (Telegram, Discord, Slack, Matrix, Feishu), scheduled autonomy (heartbeat/cron), and multi-agent delegation — but the five projects are at visibly different maturity points. Notably, **none of the five shipped a release in the window**: the ecosystem is in a collective stabilization phase, absorbing regressions from prior rapid cadences (OpenClaw 2026.9.x, Hermes v0.21.0, QwenPaw v2.2.0-beta.7, ZeroClaw v0.8.5 weekly trains). The engineering battleground has shifted from feature breadth to **runtime trust** — session integrity, scheduled-task delivery, token-accounting correctness, and Windows parity. Community engagement remains strong, but maintainer review bandwidth is now the explicitly named constraint at two of five projects (ZeroClaw's decision queue #8692; OpenClaw's 310 open PRs).

---

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Release status | Health score* |
|---|---|---|---|---|
| **OpenClaw** | 500 touched (375 open / 125 closed) | 500 touched (310 open / 190 merged·closed) | None; 2026.9.x stabilization, multiple P0s open without fix PRs | **7/10** — highest throughput in ecosystem; strained by regression backlog |
| **Hermes Agent** | 50 (94% of touched items still open) | 50 | None; v0.21.0 latest; v0.21.1 candidate cluster forming | **7/10** — same-day fix velocity; triage-heavy day |
| **ZeroClaw** | 33 | 50 (~6 merged/closed) | None; v0.8.5 weekly stabilization line (#9459) | **6/10** — strong momentum; maintainer-bandwidth bottleneck |
| **QwenPaw** | 24 | 12 (2 merged) | None; v2.2.0-beta.7 in install verification | **6/10** — good velocity + first-time contributor influx; severe bugs unowned |
| **IronClaw** | 0 | 9 (3 closed — all dependency bumps) | None | **5/10** — maintenance mode; Dependabot-dominated |

\* Composite of throughput, fix-PR availability for top-severity bugs, regression backlog, and review bandwidth.

---

## 3. OpenClaw's Position

**Advantages vs peers:**
- **Scale (~10× any peer):** 500 issues + 500 PRs touched in 24h; 190 PRs merged/closed alone exceeds the total activity of every other project in the set.
- **Broadest surface matrix:** providers (claude-cli, Codex, llama.cpp), channels (Discord, Telegram, LINE), plugin SDK, self-update/doctor machinery, background memory consolidation. No peer matches the breadth.
- **Deep fix-PR pipeline:** most P1s already have cross-linked fix PRs awaiting review within days of report.

**Weaknesses vs peers:**
- **P0 closure lag:** Windows gateway startup (#137813), cron tick swallowing (#139215), and launchctl keepalive loop (#114967) have no fix PRs — while Hermes shipped same-day fixes for its top P1 (#104653 → PR #104673) and ZeroClaw same-day patched its heartbeat key bug (#10670 → #10671). OpenClaw is fast at the PR queue, slower at P0 closure.
- **Release hygiene drift:** Live Docs ahead of release since March (#48920); 310 open PRs is review-queue debt of the kind ZeroClaw explicitly complains about.

**Community size:** Issue-number space (~140k vs Hermes ~104k, ZeroClaw ~10.6k, IronClaw ~8.1k, QwenPaw ~7.6k) plus daily volume confirm the largest user base. Caveat: per-thread engagement depth is higher elsewhere (Hermes #97681 at 25 human comments; ZeroClaw RFCs at 25–34) — OpenClaw's breadth exceeds its depth.

**Technical approach:** monolithic, gateway-centric runtime with provider adapters and calendar-versioned releases — vs ZeroClaw's RFC-governed event-sourcing ambitions, IronClaw's Rust security-first host isolation, QwenPaw's desktop-first orchestration, and Hermes' desktop+gateway hybrid with local-model emphasis.

---

## 4. Shared Technical Focus Areas

| Focus area | Projects | Evidence |
|---|---|---|
| **Session persistence / rehydration integrity** | OpenClaw, Hermes, QwenPaw, ZeroClaw | OpenClaw #139847, #124991; Hermes #104653 (duplicate turns on rehydrate); QwenPaw #7584/#7579 (model blind to own last message), #7447; ZeroClaw #9487 RFC, #10526 append-only history |
| **Heartbeat/cron reliability** | Same 4 | OpenClaw #139215, #99910; Hermes #92837, #104453; QwenPaw #7589 (agent bricked ~2h); ZeroClaw #9191, #10670 |
| **Windows parity** | Same 4 | OpenClaw #137813, #140010; Hermes #104666; QwenPaw #7363 (UI frozen 118–135s); ZeroClaw #7462 (74 test failures) |
| **Token accounting / compression correctness** | OpenClaw, Hermes, QwenPaw | OpenClaw #101929 (2.3–2.6× over-count); Hermes #99398 (42% reasoning inflation, closed); QwenPaw #6541 (compression breaks DeepSeek API contract) |
| **Provider-side brittleness** | OpenClaw, Hermes, QwenPaw, ZeroClaw | OpenClaw #135111, #132720; Hermes #42719, #104678; QwenPaw #7513; ZeroClaw #10617 |
| **Delegation semantics (progress, ownership, budget)** | OpenClaw, QwenPaw, ZeroClaw | OpenClaw #96975, #128637; QwenPaw #7450, #7580; ZeroClaw #10644/#10645 |
| **Plugin isolation / egress security** | ZeroClaw, IronClaw | ZeroClaw #6996, #10076, #10391; IronClaw #8077 (leak-blocked sentinel classification) |

The strongest signal: **4 of 5 projects (all except IronClaw) simultaneously carry active bugs in scheduled autonomy and session state** — these are now table-stakes subsystems where none of the projects are production-grade.

---

## 5. Differentiation Analysis

| Project | Feature focus | Target user | Architecture |
|---|---|---|---|
| **OpenClaw** | Broadest assistant surface: multi-provider, multi-channel, plugin SDK, self-update/doctor | Power users running always-on personal assistants | Gateway-centric monolith (TS), calver cadence |
| **Hermes Agent** | Persistent conversational bots, delegation, skills hub | Home-server / VPS bot-fleet operators; local-model users | Desktop + gateway + CLI hybrid (Python); NousResearch lineage |
| **IronClaw** | Security/egress control, MCP host isolation, Slack surfaces | Security-conscious / enterprise operators | Rust, host-API boundary, WASM tooling |
| **QwenPaw** | Multi-agent orchestration, desktop UX, plugin store, Feishu | Desktop-first prosumers, CJK market (Chinese doc workflows visible) | Desktop-centric app with agent runtime; AgentScope-adjacent |
| **ZeroClaw** | Architecture rigor: sessions RFC, sandbox policy, WASM plugins, Matrix, edge hardware (Hailo/Ollama) | Self-hosting tinkerers, privacy-focused users | RFC-governed, weekly stabilization trains, pre-1.0 (v0.8.x) |

---

## 6. Community Momentum & Maturity

- **Tier 1 — Massive scale, absorbing strain:** OpenClaw. Unmatched throughput, but currently spending it on 2026.9.x regression cleanup rather than new surface.
- **Tier 2 — Rapid iteration:** Hermes (same-day bug→fix cycles; delegation PR stack consolidating; loudest feature ask = sessions that outlive the Desktop app) and ZeroClaw (same-day patches, weekly trains, but RFC convergence is slow and the maintainer decision queue is itself the top meta-topic).
- **Tier 3 — Growth under pressure:** QwenPaw. Most open fix PRs come from **first-time contributors** — a healthy onboarding signal — but severe context-loss and heartbeat-loop bugs have no owner ahead of v2.2.0 GA.
- **Tier 4 — Maintenance mode:** IronClaw. Dependabot-only activity plus two targeted security/UX fixes; no user-facing community signal in the window.

**Maturity read:** OpenClaw is operationally most mature (update/doctor/plugin machinery) but shows maturity strain — regression cadence outpacing QA. Hermes has the best responsiveness ratio. ZeroClaw is least mature version-wise but most rigorous in process. QwenPaw is numerically v2.x yet process-wise still stabilizing. **Rapidly iterating:** Hermes, ZeroClaw. **Stabilizing:** OpenClaw, QwenPaw. **Flat:** IronClaw.

---

## 7. Trend Signals

1. **Event-sourced sessions are becoming the reference architecture.** Silent state loss appeared at 4/5 projects in one 24h window; ZeroClaw's append-only event-history RFC (#10526) and Hermes' persistent-session demand (#97681) point the direction. *Value:* design sessions as durable event logs with dedup at the write boundary and deterministic rehydration; treat "model can't see its own last message" (QwenPaw #7584) as P0-class.
2. **Proactive agents are shipped everywhere, trusted nowhere.** Heartbeat/cron defects at 4/5 projects — silently dropped ticks, no wall-clock timeout, feedback loops bricking agents for hours. *Value:* scheduled autonomy needs delivery-ack semantics, idempotent ticks, hard timeouts, and runaway-loop circuit breakers before it's production-grade.
3. **Windows parity is a universal tax.** 4/5 projects carry Windows-specific P0/P1s. Hermes' cross-OS E2E install/update matrix PR (#101420) is the countermeasure others should replicate. *Value:* Windows CI must precede GA, not follow it.
4. **Token accounting is a trust and cost surface.** Over-counting (OpenClaw 2.3–2.6×; Hermes' 42% reasoning double-charge) and API-invalid compression payloads erode confidence silently. *Value:* instrument estimated-vs-billed tokens; contract-test compressed message structures.
5. **Provider churn demands defensive adapters.** Malformed tool-call JSON, enum narrowing (Anthropic `thinking.display`), and latched billing states broke runtimes across 4 projects simultaneously. *Value:* normalize/validate provider responses at the adapter boundary; gate provider-beta behavior behind flags.
6. **Delegation requires identity and budget propagation.** ZeroClaw's owner-principal and cost-threading gaps, plus the industry-wide absence of blocking wait primitives (QwenPaw #7580), show sub-agents still run outside the accounting model — a security and cost exposure.
7. **Deployment model is shifting to always-on.** The loudest human ask in the ecosystem (Hermes #97681: group chats that survive Desktop shutdown) plus OpenClaw's gateway-centric design confirm assistants are becoming server-resident services, not desktop apps. Plugin isolation (WASM sandboxing, egress sentinels, approval flows) is the emerging trust frontier that will separate the next generation of runtimes.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-07

## 1. Today's Overview

Hermes Agent (NousResearch/hermes-agent) is showing elevated triage activity with **100 items updated in 24 hours** (50 issues, 50 PRs), but the **open/closed ratio is high (94/6)**, suggesting a backlog-heavy maintenance day rather than a shipping day. The queue is dominated by **session-state, message-delivery, and context-compression** issues spanning the gateway, agent runtime, and desktop clients. No new release was cut, and most merged/closed PRs are superseded checkpoints or bug fixes for newly filed regressions, indicating active but pre-release churn. Multiple P1s filed today (#42719, #104453, #104653) point to an ongoing reliability theme around provider integration and platform-specific dispatch.

## 2. Releases

No new releases in the last 24 hours. Last published version referenced in the data is **v0.21.0** (cited in #104453 and #104666), against `main @ 820106d4a5`. Update-channel and `hermes update` paths remain the source of friction (see Bugs section).

## 3. Project Progress

**Closed/Merged today (6 items):**

- [#104426](https://github.com/NousResearch/hermes-agent/pull/104426) — Closed (superseded). Delegation inject-delivery port onto #104299 completion units.
- [#104419](https://github.com/NousResearch/hermes-agent/pull/104419) — Closed (superseded wrong-base). Delegation minimal inject policy.
- [#99398](https://github.com/NousResearch/hermes-agent/issues/99398) — Closed. Preflight estimator double-charged `reasoning`, causing ~42% context inflation and a compaction loop.
- [#70328](https://github.com/NousResearch/hermes-agent/issues/70328) — Closed. Flat 1500-token image pricing in compression trigger caused vision-heavy 64K local-model sessions to 400 before compaction.

**Net progress:** Two real bugs were closed (reasoning double-count, image token cost), and the delegation feature work ([#85648](https://github.com/NousResearch/hermes-agent/issues/85648)) consolidated onto a single landing target ([#104434](https://github.com/NousResearch/hermes-agent/pull/104434)) with two earlier drafts correctly retired. This is a cleanup day rather than a feature-merge day.

## 4. Community Hot Topics

| # | Item | Type | Comments | Why it matters |
|---|------|------|----------|----------------|
| [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) | Skills index freshness probe degraded | Issue (auto) | **169** | Automated watchdog; index 29.8h old vs. 26h limit. Skills Hub docs are downstream — this is an infrastructure reliability concern, not a user-reported bug. |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | Bot Group Chats must keep working after Desktop closes | Feature | **25** | The top *human* request: persistent multi-bot group chat that survives the local Desktop lifecycle. Signals a strong push toward server-resident / VPS deployment. |
| [#26277](https://github.com/NousResearch/hermes-agent/issues/26277) | Email session isolation by normalized subject | Feature | 9 (👍2) | Email gateway currently lumps all messages from one sender into one session — request for opt-in subject-keyed isolation. |
| [#73327](https://github.com/NousResearch/hermes-agent/issues/73327) | Customizable cron response wrapper template | Feature | 6 (👍3) | Hardcoded `Cronjob Response:` header/footer; users want their own branding/format. |
| [#92837](https://github.com/NousResearch/hermes-agent/issues/92837) | Heartbeat ticks counted as fired but never delivered | Bug (P2) | 4 | A subtle state-machine defect: `last_fired_at`/`fire_count` advance even when delivery is dropped, with wakes also lost after agent-cache idle-evict. |

**Underlying need:** The two loudest human topics — persistent group chats and email subject isolation — share a common thread: users want Hermes sessions to feel like **long-lived, addressable conversations** rather than transient message-handler invocations. The skills-index thread, despite the comment count, is an internal CI/cron signal, not a community ask.

## 5. Bugs & Stability

### P1 (filed or active today)

- **[#104653](https://github.com/NousResearch/hermes-agent/issues/104653)** — Inbound user turns persisted **twice** (gateway on receipt + agent runtime at flush); `platform_message_id` set on one row, NULL on the other; history load does not dedupe → model sees each user message twice on every rehydration. **Fix PR exists:** [#104673](https://github.com/NousResearch/hermes-agent/pull/104673) by BrunoBza, opened same day. This is the highest-impact issue today.
- **[#104453](https://github.com/NousResearch/hermes-agent/issues/104453)** — Restart-safe cron dispatch broken on **systemd 249 (Ubuntu 22.04)**: `OOMPolicy=kill` rejected on transient scopes. Filed against v0.21.0; affects all cron jobs after upgrade. **No fix PR yet.**
- **[#42719](https://github.com/NousResearch/hermes-agent/issues/42719)** — ACP-provided **MCP tools registered but dropped from the model request** — tools show up in registration/refresh but not in the actual chat-completions payload. Older but still open and high-priority.

### P2 (selected, with fix-PR coverage where available)

| Issue | Title | Fix PR |
|---|---|---|
| [#92837](https://github.com/NousResearch/hermes-agent/issues/92837) | Heartbeat fired-but-never-delivered, wakes lost after idle-evict | — |
| [#94921](https://github.com/NousResearch/hermes-agent/issues/94921) | CLI Shift+letter leaks raw `ESC[27;2;<cp>~` on Ghostty (regression from #87630) | — |
| [#100302](https://github.com/NousResearch/hermes-agent/issues/100302) | Desktop composer caret disappears (DOM normalizer removes Chromium active caret) | — |
| [#104357](https://github.com/NousResearch/hermes-agent/issues/104357) | Discord cron attachments 404 (Unknown Channel) while text delivers fine | — |
| [#104176](https://github.com/NousResearch/hermes-agent/issues/104176) | Inherited `ContextCompressor` summary overrides break on `bypass_cooldown` (3rd-party subclass regression) | — |
| [#100836](https://github.com/NousResearch/hermes-agent/issues/100836) | `hermes doctor --fix` false-positive "live writer" — leaked `COUNT(*)` connection | — |
| [#104169](https://github.com/NousResearch/hermes-agent/issues/104169) | `refresh_agent_mcp_tools()` re-derives tool array, silently drops per-session assembly context | — |
| [#104678](https://github.com/NousResearch/hermes-agent/issues/104678) | Anthropic Pro/Max billing-exhaustion latches `failure_reason=billing` with no expiry | — |
| [#104666](https://github.com/NousResearch/hermes-agent/issues/104666) | `codex_app_server` won't start on Windows with npm-installed Codex (subprocess ignores PATHEXT) | — |
| [#104671](https://github.com/NousResearch/hermes-agent/issues/104671) | Background-completion backlog creates one full agent turn per stale/dead process | [#104686](https://github.com/NousResearch/hermes-agent/pull/104686) ✅ |
| [#104591](https://github.com/NousResearch/hermes-agent/issues/104591) | Startup update check spawns interactive `ssh` host-key prompt that hijacks CLI input | — |
| [#100680](https://github.com/NousResearch/hermes-agent/pull/100680) *(the Desktop switch bug)* | Stuck remote gateway switch clears local state | [#104680](https://github.com/NousResearch/hermes-agent/pull/104680) ✅ |

**Severity ranking (today):** P1 = duplicate user turns (#104653) > P1 cron regression (#104453) ≈ P1 ACP/MCP tool drop (#42719). P2 cluster is dominated by state-machine and platform-specific defects; the duplicate-write (#104653 → #104673) and the CLI background-completion storm (#104671 → #104686) both shipped same-day fixes, which is a positive velocity signal.

## 6. Feature Requests & Roadmap Signals

**Top signal: persistent, server-resident session state** — [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) (25 comments) is the loudest human ask. Expect a follow-up release to make "Group Chat outlives Desktop" a first-class story; the framing already implies VPS-friendly per-bot model/tool/credential isolation.

**Likely near-term:**
- **Email subject-keyed sessions** [#26277](https://github.com/NousResearch/hermes-agent/issues/26277) — low-risk, opt-in, isolated scope. Probable next minor.
- **Cron wrapper template** [#73327](https://github.com/NousResearch/hermes-agent/issues/73327) — small UX fix; the only complaint is the hardcoded footer.
- **Uniform channel-capabilities injection in system prompt** [#45122](https://github.com/NousResearch/hermes-agent/issues/45122) — already has a matching PR ([#104685](https://github.com/NousResearch/hermes-agent/pull/104685)) opening today; expect merge in the next release.
- **macOS LaunchAgent lifecycle for the dashboard** [#104022](https://github.com/NousResearch/hermes-agent/pull/104022) — implements [#44106](https://github.com/NousResearch/hermes-agent/issues/44106); same-day PR suggests imminent.
- **Credential pool priority ordering** [#104638](https://github.com/NousResearch/hermes-agent/issues/104638) + **request_count parity across strategies** [#104637](https://github.com/NousResearch/hermes-agent/issues/104637) — a coherent credential-pool hardening batch.

**Medium-term:**
- **Delegation timing — ready dependencies affect unfinished parent work** [#85648](https://github.com/NousResearch/hermes-agent/issues/85648) / [#76230](https://github.com/NousResearch/hermes-agent/pull/76230) / [#104434](https://github.com/NousResearch/hermes-agent/pull/104434) — three-PR stack actively converging; the PR graph is consolidating onto #104434. Land when reviewer availability permits.
- **Unified package manager** [#102765](https://github.com/NousResearch/hermes-agent/pull/102765) — large, cross-cutting (CLI/gateway/desktop/Docker/plugin admission); needs-decision and cross-platform.
- **Restart-safe cron on systemd 249** [#104453](https://github.com/NousResearch/hermes-agent/issues/104453) — must ship before next release tag given the regression on v0.21.0.

## 7. User Feedback Summary

**Pain points (concrete):**
- **Sessions feel transient** — users running bots in Telegram, Discord, and Feishu are losing continuity (heartbeats silently dropped, wakes lost on idle-evict, duplicate rows on rehydration, Discord cron attachments 404). The pain is most acute on long-lived gateway sessions.
- **Email gateway is too coarse** — one sender = one session is wrong for normal email; users want subject-keyed isolation ([#26277](https://github.com/NousResearch/hermes-agent/issues/26277)).
- **v0.21.0 regressions** — the systemd-249 cron break ([#104453](https://github.com/NousResearch/hermes-agent/issues/104453)), Ghostty Shift+letter raw ANSI ([#94921](https://github.com/NousResearch/hermes-agent/issues/94921), regression from #87630), and `hermes doctor --fix` false-positive ([#100836](https://github.com/NousResearch/hermes-agent/issues/100836)) cluster tightly on the latest tag, suggesting inadequate Linux/terminal matrix coverage in pre-release QA.
- **Update UX is hostile** — [#104591](https://github.com/NousResearch/hermes-agent/issues/104591) describes the update check hijacking interactive input via an orphaned `ssh` child. Users feel unsafe running `hermes update` in shared terminals.
- **Compression is opaque** — billing-tier fallback double-counts `reasoning` (closed today as #99398) and image tokens are flat-priced (closed today as #70328); the 42% inflation and provider 400s are exactly the kind of silent context failure that erodes trust.

**Positive signals:**
- Several same-day fix PRs for same-day reports ([#104673](https://github.com/NousResearch/hermes-agent/pull/104673) for #104653; [#104686](https://github.com/NousResearch/hermes-agent/pull/104686) for #104671; [#104680](https://github.com/NousResearch/hermes-agent/pull/104680) for the Desktop switch bug) — responsiveness is good.
- Cross-OS E2E install/update matrix PR ([#101420](https://github.com/NousResearch/hermes-agent/pull/101420)) directly addresses the v0.21.0 regression cluster.

**Use cases emerging:** home-server / VPS-resident bot fleets; long-lived group chats across multiple devices; cron-driven report/attachment delivery to Discord; email as a Hermes session substrate.

## 8. Backlog Watch

Items that are **old, important, and still unaddressed:**

- **[#66616](https://github.com/NousResearch/hermes-agent/issues/66616)** — Skills index staleness (opened 2026-07-18, 169 comments). Despite the comment volume this is an automated probe, but the underlying workflow (`skills-index.yml` cron at 6/18 UTC + `deploy-site.yml`) is not auto-recovering; needs a maintainer to add a self-healing run or shorten the cron.
- **[#42719](https://github.com/NousResearch/hermes-agent/issues/42719)** — ACP/MCP tools registered but dropped from the model request (P1, opened 2026-06-09, 3 comments). High impact on any ACP-based IDE integration; no PR linked.
- **[#45125](https://github.com/NousResearch/hermes-agent/issues/45125)** — Dashboard crashes on load with React error #520 on all tabs (P3, opened 2026-06-12). Distinct from the Chat-tab-only bug #41739; means the React minification is *broadly* unstable. A maintainer should distinguish whether this is a build/bundling regression or a runtime DOM contract change.
- **[#26277](https://github.com/NousResearch/hermes-agent/issues/26277)** — Email subject isolation (opened 2026-05-15, 2 👍). Low-risk, well-scoped; the fact that it has lingered ~4 months is the most surprising backlog item.
- **[#73327](https://github.com/NousResearch/hermes-agent/issues/73327)** — Cron wrapper template (opened 2026-07-28, 3 👍). Trivial fix, repeated 👍, no PR.
- **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)** — Bot Group Chats across devices (opened 2026-08-29, 25 comments). This is now the single most-vocal community thread and still has no linked design doc or PR.
- **[#92837](https://github.com/NousResearch/hermes-agent/issues/92837)** — Heartbeat fired-but-never-delivered (P2, opened 2026-08-23, 4 comments). A subtle but severe state-machine defect; no fix PR.
- **[#69882](https://github.com/NousResearch/hermes-agent/issues/69882)** — Authenticated gateway request context for plugin tool handlers (P3, opened 2026-07-23, needs-decision, security-boundary). The "needs-decision" tag has not been actioned; this blocks third-party plugins that need provenance.

**Maintainer attention recommended:** the cluster around (a) gateway session persistence (#97681, #92837, #104653, #104176), (b) v0.21.0 release regressions (#104453, #94921, #100836), and (c) credential pool consistency (#104637, #104638, #104678) forms a coherent "next patch release" set. If a v0.21.1 is on the table, the systemd-249 cron fix and the duplicate-user-turn fix are the two non-negotiables; the rest are strong candidates.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-07

**Repository:** [nearai/ironclaw](https://github.com/nearai/ironclaw)

---

## 1. Today's Overview

IronClaw showed **low-to-moderate automated activity** over the 24-hour window ending 2026-09-07, with **9 PRs updated** and **0 issues touched**. The activity was overwhelmingly dominated by **Dependabot-driven dependency hygiene**: 7 of the 9 PRs are routine chore/deps updates covering Rust crates, the tokio ecosystem, WASM tooling, and GitHub Actions. The remaining 2 PRs are **targeted bug fixes** in the MCP egress diagnostic pipeline and the assistant's shared-channel handling (Slack-adjacent). No new releases were published and no issues are awaiting triage, indicating a quiet, maintenance-mode day rather than a sprint of new feature work.

---

## 2. Releases

**No new releases in the last 24 hours.** The releases section is omitted per the digest guidelines.

---

## 3. Project Progress

Three PRs were **closed/merged** in the 24-hour window. All three were dependency updates closed without merges into the main line (per Dependabot convention these are typically superseded by a later rebase or rebatched update):

- **[PR #8049](https://github.com/nearai/ironclaw/pull/8049)** — `chore(deps): bump the everything-else group across 1 directory with 19 updates` (CLOSED, 2026-09-06)
  Bulk Rust dependency refresh covering 19 packages. Superseded by the larger follow-up PR #8080 below.
- **[PR #7835](https://github.com/nearai/ironclaw/pull/7835)** — `chore(deps): bump the actions group across 1 directory with 5 updates` (CLOSED, 2026-09-06)
  GitHub Actions bump (5 packages) — closed in favor of the 6-update PR #8079.
- **[PR #7020](https://github.com/nearai/ironclaw/pull/7020)** — `chore(deps): bump tokio-tungstenite from 0.29.0 to 0.30.0 in the tokio-ecosystem group across 1 directory` (CLOSED, 2026-09-06)
  Notable for being **35 days old** before closure — the tokio-tungstenite 0.30.0 bump. Likely merged via the newer #8078 which bundles the same crate.

**Net progress in shipped logic:** **None directly.** The closed PRs replaced one another; no new feature or behavior landed today.

---

## 4. Community Hot Topics

**Data limitation:** All 9 PRs report `Comments: undefined` and zero reactions (👍: 0). There is **no new issue activity** to rank by engagement. Below are the PRs most likely to attract attention based on size, risk, and topical relevance:

| Rank | PR | Why it stands out |
|---|---|---|
| 1 | **[#8077 `fix(mcp): classify response leak diagnostics`](https://github.com/nearai/ironclaw/pull/8077)** | Closes a referenced issue (#8009, not in the 24h feed). Touches security-relevant egress/host-leak classification — these PRs tend to draw security review attention. |
| 2 | **[#8076 `fix(assistant): distinguish disconnected shared channels`](https://github.com/nearai/ironclaw/pull/8076)** | User-visible Slack/assistant behavior fix; cross-surface (product, adapter, OpenAI-compatible). Likely to receive product/UX scrutiny. |
| 3 | **[#7834 `chore(deps): bump the wasm group`](https://github.com/nearai/ironclaw/pull/7834)** | Largest open PR (size: L, risk: medium), still open since 2026-08-23. WASM bumps are notoriously breakage-prone. |

**Underlying need signals:** Today’s non-dependabot PRs both point to **state-classification ambiguity** — IronClaw currently conflates "leak-blocked" responses with other failure modes (#8077), and conflates "unpaired user" with "paired-but-disconnected" shared-channel state (#8076). This is a recurring need: clearer diagnostic sentinels and more granular user/account state.

---

## 5. Bugs & Stability

Two bug-fix PRs opened in the last 24h. No regressions or crash reports were filed.

| Severity | PR | Component | Description | Fix Status |
|---|---|---|---|---|
| **Medium** (security-adjacent) | [#8077](https://github.com/nearai/ironclaw/pull/8077) | MCP / host HTTP API | The `response_leak_blocked` sentinel was being conflated with other MCP-visible error reasons, weakening both the safety guarantee and the user-facing error message. Centralizes the sentinel in `ironclaw_host_api::http` and gives the MCP lane a distinct classification. | **Fix PR open**; closes #8009. |
| **Medium** (UX / correctness) | [#8076](https://github.com/nearai/ironclaw/pull/8076) | Assistant / Slack adapter | A paired user's disconnected shared channel was indistinguishable from an unpaired account, producing incorrect rejections and inconsistent messaging across the product, adapter, and OpenAI-compatible surfaces. | **Fix PR open.** |

**Stability risk watch:** [PR #7834](https://github.com/nearai/ironclaw/pull/7834) (size L, risk medium) bundles a 4-package WASM bump and has been **open for 15 days** — WASM ecosystem major/minor bumps historically carry the highest regression probability in this codebase and warrants a designated reviewer.

---

## 6. Feature Requests & Roadmap Signals

**No feature-request issues were filed in the 24-hour window.** Indirect roadmap signals can be inferred from the two open bug fixes:

- **#8076** indicates the project is investing in **multi-surface consistency** (product UI, adapters, OpenAI-compatible endpoints) for assistant state — a likely precursor to broader Slack-channel feature work in the next cycle.
- **#8077** indicates continued hardening of the **MCP egress / host-isolation boundary** — expect more diagnostic-clarity refinements in the next release cycle.
- The pace of Dependabot churn (4 fresh chore PRs in 24h, 3 of them targeting `/`) signals an **active release branch** receiving continuous dependency refreshes, consistent with preparation for an upcoming tagged release despite none being cut today.

No new feature PRs were opened, so no near-term version features can be confidently predicted beyond dependency-bundle housekeeping.

---

## 7. User Feedback Summary

**No user-submitted issues or comments are available in the 24-hour feed.** The only available signal is implicit, through the two bug fixes:

- **Pain point — unclear failure reasons in MCP:** Users/operators of the MCP lane were receiving ambiguous errors when host leak-blocking intervened. (#8077 addresses this.)
- **Pain point — confusing rejection states in shared channels:** Paired Slack users whose shared channel had disconnected were being told they were "unpaired," leading to misdirected remediation. (#8076 addresses this.)

**Satisfaction signal:** The fact that both fixes are landing **with explicit cross-surface consistency** (host API ↔ MCP, product ↔ adapter ↔ OpenAI-compatible) suggests maintainer responsiveness to multi-surface UX complaints, even though no direct user comments are visible today.

---

## 8. Backlog Watch

Items in the 24-hour feed that warrant maintainer attention due to **age, size, or risk**:

| Item | Age (as of 2026-09-07) | Concern | Link |
|---|---|---|---|
| **[PR #7834](https://github.com/nearai/ironclaw/pull/7834)** — WASM group bump (4 pkgs) | **15 days** | Size L, risk medium; WASM bumps have historically been the highest-risk category in this repo. No reviewer engagement visible. | [Open PR](https://github.com/nearai/ironclaw/pull/7834) |
| **PR #7020** — tokio-tungstenite 0.30.0 bump | Was open **35 days** before closure on 2026-09-06. | Resolved today via the consolidated PR #8078, but the long dwell time suggests the crate was blocked on something (likely CI matrix or downstream API change) and a similar stall risk applies to remaining WASM work. | [Closed PR](https://github.com/nearai/ironclaw/pull/7020) |
| **Issue #8009** (referenced by #8077) | Not in 24h feed, but the issue behind the leak-classification fix. | Once #8077 merges, confirm the referenced issue is closed and any follow-up security-disclosure notes are attached. | [PR #8077](https://github.com/nearai/ironclaw/pull/8077) |

**No long-unanswered issues surfaced in today’s data** (the issues feed was empty for the window), so the primary backlog pressure is on the open WASM dependency PR, not on issue triage.

---

*Digest generated 2026-09-07. Data window: 2026-09-06 → 2026-09-07 UTC. All PRs and links reflect the state captured in the source data feed.*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-07

## 1. Today's Overview

QwenPaw shows **high bug-triage activity but no new release**: 24 issues and 12 PRs updated in the last 24 hours, with most effort concentrated on stabilizing the recently released v2.2.0 line (currently at `v2.2.0-beta.7`). The issue mix leans heavily toward **context/memory loss regressions** and **multi-agent orchestration edge cases**, while the PR queue is dominated by **first-time contributors** (Bruce-Yii, kabishou11) delivering targeted, well-scoped fixes and small UX restorations. Overall project health is **active but under pressure**: velocity is strong, but several reported bugs are marked severe (agent behavior loops, silent exception swallowing, unresponsive heartbeat sessions).

---

## 2. Releases

**No new releases published today.** Release-duty tracking issue [#7503](https://github.com/agentscope-ai/QwenPaw/issues/7503) confirms v2.2.0-beta.7 is undergoing installation verification (deadline 2026-09-02 14:50 UTC). Based on PR/issue volume, the v2.2.0 GA line is the focus of current stabilization work.

---

## 3. Project Progress

Two PRs were closed today:

- **[#7163](https://github.com/agentscope-ai/QwenPaw/pull/7163) — feat: refine session thinking and model management** (zhaozhuang521, since 2026-08-20)
  - Inline editing of agent names via edit icon, removed separate edit entry point.
  - Retained fallback model configuration during agent creation.
  - Optimized agent-model/fallback interaction.

- **[#2134](https://github.com/agentscope-ai/QwenPaw/pull/2134) — feat(heartbeat): Support configurable heartbeat timeout** (dai-junjie, since 2026-03-23)
  - Replaces hardcoded 120s heartbeat run timeout with per-run configurable timeout exposed in the console.
  - Closes a long-standing backlog item (~5.5 months from creation).

These represent incremental improvements to model/session UX and long-awaited heartbeat flexibility — modest but useful progress.

---

## 4. Community Hot Topics

Ranked by comment volume in the last 24h:

| Item | Title | Comments | Link |
|------|-------|----------|------|
| Issue #7450 | Main agent + multi sub-agent only checks sub-agent status when asked | 8 | [link](https://github.com/agentscope-ai/QwenPaw/issues/7450) |
| Issue #7559 | 409 error when sending new message during task execution | 5 | [link](https://github.com/agentscope-ai/QwenPaw/issues/7559) |
| Issue #7363 | Synchronous calls freeze event loop; timeout never fires (118–135s startup, ~126s per message) | 4 | [link](https://github.com/agentscope-ai/QwenPaw/issues/7363) |
| Issue #6814 *(closed)* | SIGBUS in sqlite3WalFindFrame opening Scroll history.db on macOS | 4 | [link](https://github.com/agentscope-ai/QwenPaw/issues/6814) |
| Issue #7513 | deepseek-v4-pro response mixes with QwenPaw tool calls | 3 | [link](https://github.com/agentscope-ai/QwenPaw/issues/7513) |
| Issue #6541 | scroll context compression injects `[context compressed]` as `role=user`, breaks DeepSeek | 3 | [link](https://github.com/agentscope-ai/QwenPaw/issues/6541) |
| Issue #7447 *(closed)* | Early context records completely lost in long sessions | 3 | [link](https://github.com/agentscope-ai/QwenPaw/issues/7447) |
| Issue #7584 | Severe: model reply lost from context → AI behavior loops, repeated tool calls | 2 | [link](https://github.com/agentscope-ai/QwenPaw/issues/7584) |
| Issue #7589 | Heartbeat cron session feedback loop (~2h unresponsive) | 1 | [link](https://github.com/agentscope-ai/QwenPaw/issues/7589) |

**Underlying need**: users rely on QwenPaw for **long-running, multi-agent, long-context workflows** (OCR proofreading, plugin development, document processing), and the platform's **context-management, async coordination, and observability** are not yet robust enough for these workloads. Several top threads are essentially the same class of problem — "the system silently drops state, and I only notice when the model behaves strangely."

---

## 5. Bugs & Stability

### Critical / High severity (no fix PR yet)

- **[#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584)** / **[#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579)** — Assistant reply is persisted but missing from later requests; model cannot "see its own last message," causing tool-call → result-lost → re-tool-call loops. Cross-referenced. **No PR.**
- **[#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589)** — Heartbeat cron session feedback loop produces duplicate message pile-up; agent unresponsive ~2h, requires manual restart. Verified against `main` 2026-09-06. Severe, agent-bricking. **No PR.**
- **[#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450)** — Main agent only queries sub-agent status when user explicitly asks; long silent hangs on complex multi-agent tasks. High-comment thread. **No PR.**
- **[#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363)** — Synchronous calls block the event loop on Windows desktop (QwenPaw Desktop 2.1.1b1), making the UI unresponsive for 118–135s at startup and ~126s per send; configured timeouts never fire. **No PR.**

### Medium severity (some with fix PRs merged or open)

- **[#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559)** — 409 on follow-up message while task running. **Fix PR: [#7577](https://github.com/agentscope-ai/QwenPaw/pull/7577)** (open, enqueue instead of reject).
- **[#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572)** — `tool_calls/_coordinator.py` `_drain()` swallows exceptions into a single string, no `logger.exception`, no re-raise. **Fix PR: [#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578)** (open).
- **[#7585](https://github.com/agentscope-ai/QwenPaw/issues/7585)** — Telegram Markdown tables render as raw `|`/`---`. **Fix PR: [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590)** (open).
- **[#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)** *(closed)* — Stop button shows stopped but task continues executing.
- **[#7594](https://github.com/agentscope-ai/QwenPaw/issues/7594)** *(closed)* — Task execution status emitted 3 times at different timestamps.
- **[#7548](https://github.com/agentscope-ai/QwenPaw/issues/7548)** *(closed)* — Navigation records lost after conversation switch or restart; history.db content intact but UI doesn't show it.
- **[#7447](https://github.com/agentscope-ai/QwenPaw/issues/7447)** *(closed)* — Early context completely lost on long sessions (~160-page docs).
- **[#6814](https://github.com/agentscope-ai/QwenPaw/issues/6814)** *(closed)* — SIGBUS crash in SQLite WAL on macOS when opening Scroll history.db.

### Lower severity but notable

- **[#7513](https://github.com/agentscope-ai/QwenPaw/issues/7513)** — Tool-call fragments interleaving with model output for deepseek-v4-pro.
- **[#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541)** — Scroll strategy + DeepSeek: `[context compressed]` block uses `role=user`, API rejects → `MODEL_EXECUTION_ERROR`.
- **[#7587](https://github.com/agentscope-ai/QwenPaw/issues/7587)** — OpenAI-compatible provider hits Cloudflare 403 when listing models from WUSRouter.
- **[#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571)** — Agent repeatedly forgets user-stated rules about TODO file paths and dev-vs-deploy paths, despite repeated instructions.

**Pattern**: Context/memory integrity, multi-agent task lifecycle, and observability of failures are the dominant stability themes. Roughly half of medium-severity bugs already have a targeted PR opened, mostly by first-time contributors — a positive sign for maintainer bandwidth.

---

## 6. Feature Requests & Roadmap Signals

Open feature/enhancement issues and the PRs addressing them:

| Request | Title | Likely next-version inclusion | Link |
|---------|-------|-------------------------------|------|
| #7588 | Restore v2.1.0 working-directory direct input | **High** — PR [#7593](https://github.com/agentscope-ai/QwenPaw/pull/7593) already open (first-time contributor) | [issue](https://github.com/agentscope-ai/QwenPaw/issues/7588) |
| #7586 | Telegram: auto-clean/hide streaming intermediate messages after final reply | **High** — PR [#7592](https://github.com/agentscope-ai/QwenPaw/pull/7592) open | [issue](https://github.com/agentscope-ai/QwenPaw/issues/7586) |
| #7570 | Feishu streaming card: auto-collapse reasoning after finalize | **High** — PR [#7591](https://github.com/agentscope-ai/QwenPaw/pull/7591) open (validates collapsible_panel works) | [issue](https://github.com/agentscope-ai/QwenPaw/issues/7570) |
| #7580 | Add a blocking tool to wait for delegated agent task completion (avoid `check_agent_task` polling) | **Medium** — aligns with multi-agent stability push after #7450/#7589 | [issue](https://github.com/agentscope-ai/QwenPaw/issues/7580) |
| #7583 | AgentScope community linkage (login, inbox, fast feedback) | **Medium** — community-platform feature, likely 2.3+ | [issue](https://github.com/agentscope-ai/QwenPaw/issues/7583) |
| #7582 | Plugin store UX: one-click updates, update notifications, less page-refresh | **Low–Medium** — quality-of-life; possible 2.2.x patch | [issue](https://github.com/agentscope-ai/QwenPaw/issues/7582) |
| PR #7502 *(open)* | Console sidebar & settings redesign (configurable sidebar, plugin registry preserved) | **Medium** — significant UX surface change pending review | [PR](https://github.com/agentscope-ai/QwenPaw/pull/7502) |

**Predictions**:
- **v2.2.x patch release** is likely to bundle the three Telegram/Feishu/Directory PRs from Bruce-Yii, the channel queue fix [#7547](https://github.com/agentscope-ai/QwenPaw/pull/7547), the lazy-import fix [#7546](https://github.com/agentscope-ai/QwenPaw/pull/7546), and the message-enqueue fix [#7577](https://github.com/agentscope-ai/QwenPaw/pull/7577).
- **v2.3.0 candidates** that align with multiple user pain points: the blocking wait-agent-task tool (#7580), heartbeat feedback-loop hardening (#7589), and the context-loss / thinking-fold mechanism ([#7521](https://github.com/agentscope-ai/QwenPaw/pull/7521)).
- The **AgentScope community integration** (#7583) and the **plugin-store overhaul** (#7582) read as longer-horizon roadmap items.

---

## 7. User Feedback Summary

**Recurring pain points (real-world use cases)**:

- *Long-running document workflows* (160-page Chinese Word OCR proofreading in [#7447](https://github.com/agentscope-ai/QwenPaw/issues/7447), [#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450)) — users push context to ~1M tokens, manually compress, and **still lose earlier context**, sometimes within a day.
- *Multi-agent orchestration* — users expect delegated agents to report progress automatically; instead the main agent idles silently until prompted, and there is no blocking wait primitive, forcing unreliable polling ([#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450), [#7580](https://github.com/agentscope-ai/QwenPaw/issues/7580)).
- *Persistence vs. UI inconsistency* — content exists in `history.db` but disappears from the conversation ([#7548](https://github.com/agentscope-ai/QwenPaw/issues/7548), [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579)).
- *v2.1 → v2.2 UX regressions* — loss of direct-path input in the working-directory picker and removal of editable agent fields are explicitly called out as downgrades ([#7588](https://github.com

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-07

## 1. Today's Overview

ZeroClaw showed a high-volume coordination day with **33 issues** and **50 PRs** updated in the last 24h, indicating an active architectural phase rather than a release push. Activity is concentrated on long-running RFCs (conversation session architecture, sandbox policy, WASM plugin runtime) and on hardening the agent runtime/ACP-Code session path against incomplete turns, cost-budget drift, and delegation ownership gaps. No new releases shipped, which is consistent with the project being mid-cycle on the v0.8.5 stabilization line ([#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)). Overall project health is **moderate**: a healthy stream of incoming fixes, but a growing backlog of `needs-maintainer-review` and `do-not-merge` PRs signals maintainer bandwidth is becoming a constraint.

## 2. Releases

No new releases in the last 24h. The active tracker is the **v0.8.5 finite weekly stabilization line** (intake frozen Aug 4, weekly cuts), tracked in [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459).

## 3. Project Progress

Six PRs were merged/closed. Visible in the top-20 listing:

- **[#10487](https://github.com/zeroclaw-labs/zeroclaw/pull/10487)** `fix(channels/matrix): resolve transcription providers from live config` — CLOSED. Resolves the Matrix STT path so typed `[providers.transcription.<type>.<alias>]` entries actually register. (Note: closed rather than merged; the live follow-up is in [#10669](https://github.com/zeroclaw-labs/zeroclaw/pull/10669), which adds a Discord equivalent regression test, and [#10627](https://github.com/zeroclaw-labs/zeroclaw/pull/10627) which corrects Matrix `opus_duration` for non-zero-pre_skip layouts.)
- **3 closed issues** (lightweight wins): [#9575](https://github.com/zeroclaw-labs/zeroclaw/issues/9575) (warmup via `/models`), [#9653](https://github.com/zeroclaw-labs/zeroclaw/issues/9653) (plugin `wasi:http` OS trust store — security follow-up), [#10572](https://github.com/zeroclaw-labs/zeroclaw/issues/10572) (WeCom channel documentation).

Other in-flight PRs advancing the codebase (still open, but with movement):
- [#10671](https://github.com/zeroclaw-labs/zeroclaw/pull/10671) — Fix for [#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670) heartbeat composite-key validation (same-day patch).
- [#10668](https://github.com/zeroclaw-labs/zeroclaw/pull/10668) — Windows test selector scoped to package locale resources, advancing the Windows test failure cleanup ([#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)).
- [#10652](https://github.com/zeroclaw-labs/zeroclaw/pull/10652) — CLI memory factory now routes postgres/qdrant backends correctly.
- [#10669](https://github.com/zeroclaw-labs/zeroclaw/pull/10669) — Discord STT dispatch regression test.

## 4. Community Hot Topics

Most-discussed items all revolve around **session/runtime architecture and process**:

1. **[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)** — RFC: Runtime-owned conversation sessions and transport surface adapters. **34 comments**, currently at Revision 5, with the Rev-4 vote invalidated. The largest open architectural discussion in the repo.
2. **[#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)** — RFC: Unified file and attachment architecture for conversation surfaces. **27 comments**, Revision 10. Heavily revised; same convergence pattern of "material replacement restarts the vote."
3. **[#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)** — RFC: Granular sandbox policy (filesystem restrictions). **25 comments**, `in-progress`. The longest-lived open RFC (opened 2026-05-28).
4. **[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)** — Bug: 74 test failures on Windows. **19 comments**, `accepted/in-progress`. Strong indicator that the project is still primarily Linux-validated.
5. **[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — Tracker: Maintainer decision queue. **15 comments**. The queue itself is the hot topic — meta-discussion of review bandwidth.
6. **[#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076)** — RFC: Composable WASM plugin runtime architecture. **10 comments**. Notably stripped session-history decisions and yielded to [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) as the sole authority.

**Underlying need:** the community is pushing toward a single coherent model for sessions, attachments, events, and sandbox policy that survives provider churn, channel diversity, and delegation depth. The repeated "Revision N" pattern on the top RFCs suggests contributors are converging but reaching consensus slowly.

## 5. Bugs & Stability

S1 (workflow blocked) issues reported/active today:

| Issue | Title | Fix PR? |
|---|---|---|
| [#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230) | Daemon startup/reload can overflow during agent initialization | No matching PR in feed |
| [#9421](https://github.com/zeroclaw-labs/zeroclaw/issues/9421) | Incomplete terminal responses reported as successful | **Yes — [#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447)** (XL, `needs-author-action`) |
| [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) | Cron agent jobs have no wall-clock timeout | None in feed |
| [#10644](https://github.com/zeroclaw-labs/zeroclaw/issues/10644) | Background delegate results not bound to owner principal | None in feed |
| [#10645](https://github.com/zeroclaw-labs/zeroclaw/issues/10645) | Cost-tracking context not threaded into delegated sub-loops | None in feed |
| [#10617](https://github.com/zeroclaw-labs/zeroclaw/issues/10617) | `thinking.display="updates"` returns 400 on Claude Fable 5.1 | None in feed |
| [#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659) | Budget-exceeded Code turn loses visible progress after session restore | **Partial — [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)** covers interrupted turn persistence |
| [#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670) | `heartbeat.target` rejects `<type>.<alias>` composite key | **Yes — [#10671](https://github.com/zeroclaw-labs/zeroclaw/pull/10671)** (same-day fix) |

S2 (degraded):
- [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) — 74 Windows test failures; [#10668](https://github.com/zeroclaw-labs/zeroclaw/pull/10668) is incremental progress.
- [#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635) — Runtime profile cost limit doesn't reflect effective global daily budget.
- [#10302](https://github.com/zeroclaw-labs/zeroclaw/issues/10302) — ZeroCode Code pane stuck in `Processing` while browsing history.

**Pattern:** the highest-severity bugs cluster around **(a) provider response finality classification** ([#9421](https://github.com/zeroclaw-labs/zeroclaw/issues/9421), [#10617](https://github.com/zeroclaw-labs/zeroclaw/issues/10617), [#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659), [#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662)) and **(b) delegation/scope leak of cost, workspace, and owner principal** ([#10644](https://github.com/zeroclaw-labs/zeroclaw/issues/10644), [#10645](https://github.com/zeroclaw-labs/zeroclaw/issues/10645), [#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635), [#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391)). These appear to share a root cause: the runtime treats turns as the unit of accounting but delegates across turn boundaries inconsistently.

## 6. Feature Requests & Roadmap Signals

Near-certain for the **next stabilization cut** (already being implemented):

- **Persistent ACP/Code turn transcripts including failed and cancelled turns** ([#9378](https://github.com/zeroclaw-labs/zeroclaw/pull/9378), [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)).
- **Native Hailo-Ollama provider** ([#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109), `do-not-merge` — needs maintainer hand-hold).
- **Session prompt attachments** ([#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407), XL).
- **Web fetch gzip/brotli/deflate decompression** ([#9283](https://github.com/zeroclaw-labs/zeroclaw/pull/9283), stale-candidate, maintainer already merged master and repaired).
- **Telegram configurable unauthorized notice** ([#10401](https://github.com/zeroclaw-labs/zeroclaw/pull/10401)).
- **Matrix `opus_duration` correction** ([#10627](https://github.com/zeroclaw-labs/zeroclaw/pull/10627)).
- **CLI memory factory backend routing** ([#10652](https://github.com/zeroclaw-labs/zeroclaw/pull/10652)).

Likely next minor after RFC convergence:

- **Telegram model picker** ([#9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997), `blocked/do-not-merge`).
- **AnySearch web provider** ([#10356](https://github.com/zeroclaw-labs/zeroclaw/pull/10356), `blocked/do-not-merge`).
- **Telegram agent-progress visibility** ([#10426](https://github.com/zeroclaw-labs/zeroclaw/issues/10426)).
- **Delegate sub-agent progress to parent** ([#10531](https://github.com/zeroclaw-labs/zeroclaw/issues/10531)).
- **Third Anthropic cache breakpoint** ([#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660)).

Architectural (won't land in v0.8.x; targeted at v0.9+):
- Runtime-owned conversation sessions ([#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)).
- Unified file/attachment architecture ([#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)).
- Granular sandbox policy ([#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)).
- Composable WASM plugin runtime ([#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076)).
- Append-only session event history ([#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526)).

## 7. User Feedback Summary

Pain points discernible from the issue/PR text:

- **Channel opacity during long agent runs.** Users on Telegram want to see *what the agent is doing*, not just final output ([#10426](https://github.com/zeroclaw-labs/zeroclaw/issues/10426)). This is the most explicit end-user-facing complaint of the day.
- **Delegation feels like a black box.** Parents cannot observe sub-agent progress ([#10531](https://github.com/zeroclaw-labs/zeroclaw/issues/10531)), and tool-registry reuse means child agents can act under the parent's workspace/credentials — a security and trust concern surfaced in [#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391).
- **Cost budget is surprising.** A runtime profile reporting `max_cost_per_day_cents = 4294967295` while still rejecting turns at $10/day ([#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635)) — onboarding UX issue.
- **Provider-side regressions hurt quickly.** A thinking-display enum narrowing by Anthropic broke Claude Fable 5.1 users ([#10617](https://github.com/zeroclaw-labs/zeroclaw/issues/10617)) — a reminder that provider beta features are brittle.
- **Windows is treated as second-class.** 74 test failures uncaught by CI ([#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)) — a real adoption blocker for non-Linux users.
- **RFC process friction.** Even maintainers acknowledge mandatory discussion windows rarely produce more review ([#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)).

No explicit positive satisfaction posts are visible in the data; the tracker/issue cadence suggests **sustained engagement rather than celebration** — the community is investing in architecture, not celebrating a release.

## 8. Backlog Watch

Items that are high-importance but stalled or queue-bound, deserving maintainer triage:

- **[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — The maintainer decision queue tracker itself. The fact that it's a tracker with 15 comments suggests the queue *is* the bottleneck

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*