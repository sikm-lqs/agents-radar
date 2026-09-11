# OpenClaw Ecosystem Digest 2026-09-11

> Issues: 447 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-11 11:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-11

## 1. Today's Overview

OpenClaw is showing intense release-cycle activity following the v2026.9.4 publication, with **447 issues and 500 PRs updated in 24h** — among the highest daily volumes visible in recent weeks. The project is in a high-stress release-management phase: a P0 release blocker (#144742) was filed against v2026.9.4 the same day it shipped, and several other update-path regressions are still landing across the 2026.9.x line. The maintainer signal is strong (most queueable PRs carry the `fix-shape-clear` / `clawsweeper:source-repro` tags and ready-for-look status), but the regression rate on session-state, message-loss, and update flows remains elevated. Net activity assessment: **release under pressure, but with active triage and clear ownership signals on most new bugs.**

## 2. Releases

### v2026.9.4 — shipped 2026-09-11
The single new release is **v2026.9.4**, which highlights a "Recover from compatible failed updates" feature: when schema/config checks prove rollback is safe, the previous package and configuration are restored with the previous service. Database migrations still require a verified pre-update backup (PR #140339).

**️ Release blocker filed same day:** [Issue #144742](https://github.com/openclaw/openclaw/issues/144742) reports that the published 2026.9.4 does not contain the merged fix from #144208, leaving a retained version-1 handoff lease row that fails every config write (`assertSourceUnborrowed` scans the entire lease store). Filed by maintainer `steipete` and rated **P0 / diamond lobster / release blocker**. This effectively means v2026.9.4 is **not safe to install in production** until 2026.9.5 ships with #144208 included.

**Migration notes:** No breaking schema changes; the rollback feature is opt-in via the existing update path.

## 3. Project Progress

**Merged/closed in last 24h (186 PRs total) — notable closed items:**
- [PR #143276](https://github.com/openclaw/openclaw/pull/143276) — `fix(memory): preserve managed local service startup budget` (memory-core) — closed without merge, target #143169.
- [Issue #140971](https://github.com/openclaw/openclaw/issues/140971) — Feishu plugin tools silently dropped due to `feishu_chat` host restriction (regression 2026.7.1→2026.8.1) — **closed**.
- [Issue #140821](https://github.com/openclaw/openclaw/issues/140821) — Gateway restart hangs after 2026.9.2 update under systemd user service — **closed (fix-shaped, regression P1)**.
- [Issue #123326](https://github.com/openclaw/openclaw/issues/123326) — Multi-agent Codex migration crash-loops Gateway startup — **closed** (P0, gold shrimp).
- [Issue #96337](https://github.com/openclaw/openclaw/issues/96337) — `anthropic-vertex` route=native regression causing non-visible output — **closed** (platinum hermit).
- [Issue #96947](https://github.com/openclaw/openclaw/issues/96947) — OpenRouter Anthropic `cacheWrite` regression — **closed** (gold shrimp).
- [Issue #97021](https://github.com/openclaw/openclaw/issues/97021) — Telegram typing indicator stuck in forum/topic mode — **closed** (gold shrimp).
- [Issue #92405](https://github.com/openclaw/openclaw/issues/92405) — Subagent spawn persists raw provider instead of CLI runtime — **closed** (platinum hermit).
- [Issue #79553](https://github.com/openclaw/openclaw/issues/79553) — Wizard cross-overwrites multi-account plugin credentials — **closed** (diamond lobster).
- [Issue #76233](https://github.com/openclaw/openclaw/issues/76233) — `exec-approval-followup` races subagent bundle-mcp disposal — **closed** (diamond lobster).

**Open PRs advancing:**
- [PR #121668](https://github.com/openclaw/openclaw/pull/121668) — `feat(codex): config kill-switch for the native hook relay` (targets the P0 #91009 hook-relay issue).
- [PR #144768](https://github.com/openclaw/openclaw/pull/144768) — `fix(models): require provider-bound credentials for provider use` (XL, maintainer-ready, security-boundary flagged).
- [PR #144871](https://github.com/openclaw/openclaw/pull/144871) — `feat(sqlite): run Team Reports storage in owned workers` (maintainer, ready for look).
- [PR #144699](https://github.com/openclaw/openclaw/pull/144699) — `feat(memory): shared memory database for multi-agent deployments` (addresses #114612-style fan-out).
- [PR stack #143587 → #143610 → #143615 → #143631 → #143834](https://github.com/openclaw/openclaw/pull/143615) — Selected-conversation actions across iOS/macOS/web with Live Activities integration (vincentkoc).
- [PR #144688](https://github.com/openclaw/openclaw/pull/144688) — `fix(update): candidate snapshot fails on Windows when a registered agent path carries the extended-length prefix` (closes #144581).

## 4. Community Hot Topics

**Top by comment count (24h):**

| Rank | Item | Comments | Underlying need |
|------|------|----------|-----------------|
| 1 | [Issue #125626](https://github.com/openclaw/openclaw/issues/125626) — v2026.8.1 beta feedback | 24 | Aggregate beta triage; pinned for release validation |
| 2 | [Issue #91009](https://github.com/openclaw/openclaw/issues/91009) — Codex `PreToolUse` hook relay spawns CPU-bound `openclaw-hooks`, stalls gateway RPC | 22 | **Hook subsystem is unbounded under load**; needs process-pool or per-process timeouts |
| 3 | [Issue #119720](https://github.com/openclaw/openclaw/issues/119720) — Synchronous agent persistence blocks gateway event loop | 17 | **Core scalability ceiling**; the partial repairs in #140231/#138984 are insufficient |
| 4 | [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) — Leaked hook/tool child processes (zombie accumulation) | 15 | **Process lifecycle / reaping** is a recurring class (see also #91009, #144809) |
| 5 | [Issue #114612](https://github.com/openclaw/openclaw/issues/114612) — SQLite memory tables unbounded growth | 13 | **Long-term operational hygiene**; retention policy needed for memory_index_chunks and memory_embedding_cache |
| 6 | [Issue #49876](https://github.com/openclaw/openclaw/issues/49876) — Cron sessions deliver hallucinated output on tool failure | 12 | **Trust & safety**: silent fabrication is unacceptable in cron-triggered outputs |
| 7 | [Issue #40786](https://github.com/openclaw/openclaw/issues/40786) — Feature: `.gitignore`-style exclude patterns in `backup` CLI | 12 | Backup ergonomics; sensitive data + bloat concerns |
| 8 | [Issue #136183](https://github.com/openclaw/openclaw/issues/136183) — `ssh` exec hangs at banner (regression 2026.8.1→2026.8.2) | 11 | Subprocess I/O handling needs SIGTERM-safe cancellation |
| 9 | [Issue #141747](https://github.com/openclaw/openclaw/issues/141747) — Runtime `<system-reminder>` injects ~686 tokens/turn, no opt-out | 10 | **Cost & transparency**; users want token accounting control |
| 10 | [Issue #136203](https://github.com/openclaw/openclaw/issues/136203) — Windows de-DE 2026.8.2 upgrade leaves Doctor blocked | 9 | **Windows upgrade ergonomics** (locale-specific path) |
| 11 | [Issue #144712](https://github.com/openclaw/openclaw/issues/144712) — `npm update` fails at "global install swap"; intact rollback reported as unverified | 8 | **Same-day v2026.9.4 breakage**; update path is brittle |
| 12 | [Issue #139847](https://github.com/openclaw/openclaw/issues/139847) — Message during active reply run is dropped (regression 2026.9.2) | 8 | **Concurrency control between reply + ingress** is missing tool-authority snapshots |
| 13 | [Issue #135776](https://github.com/openclaw/openclaw/issues/135776) — Core/plugin version skew after update; Discord fails on missing `plugin-sdk/security-runtime` export | 7 | **Atomic core+plugin updates** is not enforced |

The dominant signal: **users are highly engaged on lifecycle/process bugs** (zombies, leaks, hangs) and on update/upgrade safety, not on missing features. The community treats 2026.9.x as a fragile transition line.

## 5. Bugs & Stability

### P0 / Release-blocker (immediate action)
- **[#144742](https://github.com/openclaw/openclaw/issues/144742)** — 2026.9.4 missing #144208; every config write fails. **No fix in current release.** ⚠️ Highest priority.
- **[#144712](https://github.com/openclaw/openclaw/issues/144712)** — `npm update` global install swap fails on 2026.9.3→2026.9.4 (2/2 deterministic). Rollback reports "unverified." P0 diamond lobster. Same-day regression.
- **[#136203](https://github.com/openclaw/openclaw/issues/136203)** — Windows de-DE 2026.8.2 upgrade leaves Doctor maintenance blocked; legacy workspace state preserved. P0 diamond lobster.
- **[#135776](https://github.com/openclaw/openclaw/issues/135776)** — Update leaves pinned plugins on prior release; Discord fails on missing `plugin-sdk/security-runtime` export. P0 platinum hermit.
- **[#91009](https://github.com/openclaw/openclaw/issues/91009)** — Codex `PreToolUse` hook relay spawns CPU-bound `openclaw-hooks` (100%+ CPU), stalls gateway RPC. P0 silver shellfish. **PR #121668 (kill-switch) is the staged fix.**
- **[#142476](https://github.com/openclaw/openclaw/issues/142476)** — 2026.9.3 cron session reaper runs synchronous `PRAGMA integrity_check` on every agent DB, blocks event loop 14-76s on a 632-agent gateway. P1 diamond lobster.

### P1 / Severe regressions
- **[#119720](https://github.com/openclaw/openclaw/issues/119720)** — Synchronous agent persistence + transcript maintenance block gateway event loop at scale (17 comments). Diamond lobster. Partial fixes #140231/#138984 landed; full rewrite ongoing.
- **[#97616](https://github.com/openclaw/openclaw/issues/97616)** — Unreaped hook/tool child processes accumulate as zombies (15 comments). Silver shellfish.
- **[#136183](https://github.com/openclaw/openclaw/issues/136183)** — `ssh` exec hangs at banner in 2026.8.1→2026.8.2. Silver shellfish.
- **[#140620](https://github.com/openclaw/openclaw/issues/140620)** — In-place 2026.7.1→2026.9.2 upgrade stalls session-transcript reconciliation at 27/~1500. P0 silver shellfish.
- **[#139847](https://github.com/openclaw/openclaw/issues/139847)** — Concurrent message during reply run is dropped: "Reply operation has no active tool authority snapshot." Diamond lobster.
- **[#137294](https://github.com/openclaw/openclaw/issues/137294)** — Preflight compaction (600s) aborted by 300s ingress adoption watchdog, message then dead-lettered. Diamond lobster.
- **[#137332](https://github.com/openclaw/openclaw/issues/137332)** — Mixed terminal requester-settle batches retry forever after ownership check. Diamond lobster.
- **[#140821](https://github.com/openclaw/openclaw/issues/140821)** — Gateway restart hangs under systemd user service on 2026.9.2 — **closed (fix-shaped)**.
- **[#116691](https://github.com/openclaw/openclaw/issues/116691)** — Volcengine long-conversation breakage via `openai-responses`: "missing `input.status` parameter." Silver shellfish.
- **[#144809](https://github.com/openclaw/openclaw/issues/144809)** — `claude-cli` turns longer than `RUN_STALE_TAKEOVER_MS` lose their entire generated reply. Gold shrimp.
- **[#103198](https://github.com/openclaw/openclaw/issues/103198)** — WebChat image attachments mapped to `image_0` instead of media-store path. Diamond lobster (3 👍 — highest community reaction in the bug list).
- **[#118839](https://github.com/openclaw/openclaw/issues/118839)** — "Restart recovery claim changed before agent adoption" reappears on 2026.7.2-beta.7 for WebChat → Telegram-bound sessions. Platinum hermit.

### P2 / Important but contained
- **[#141747](https://github.com/openclaw/openclaw/issues/141747)** — `<system-reminder>` injects ~686 tokens/turn with no opt-out (cost/transparency).
- **[#143980](https://github.com/openclaw/openclaw/issues/143980)** — `taskSuggestions.accept` fails for Docker-sandboxed agents (missing `/workspace`).
- **[#141233](https://github.com/openclaw/openclaw/issues/141233)** — Codex transcript mirror duplicates unkeyed user inputs from Chat Completions.
- **[#139098](https://github.com/openclaw/openclaw/issues/139098)** — One-shot automation session cannot be deleted (cloud worker placement identity changed).
- **[#143752](https://github.com/openclaw/openclaw/issues/143752)** — Interrupted package activation strands canonical CLI without package-only replay.
- **[#143757](https://github.com/openclaw/openclaw/issues/143757)** — Windows Scheduled Task default cannot run gateway unattended; readiness timeout (90/181s) shorter than cold boot. Platinum hermit.
- **[#136360](https://github.com/openclaw/openclaw/issues/136360)** — `<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` carrier leaks as visible user turn on Microsoft Teams (same class as #123265 Slack, #134240 Telegram, #115978 Feishu, #108409 Discord). Platinum hermit.
- **[#128971](https://github.com/openclaw/openclaw/issues/128971)** — Telegram final reply silently lost when terminal receipt returns `delivery_ambiguous`. Gold shrimp.
- **[#138260](https://github.com/openclaw/openclaw/issues/138260)** — Doctor `runtime-tool-schemas` self-check fails: temp doctor-lint state snapshot cleanup never completes on Windows. Platinum hermit.

### P0 Security/Stable
- **[#49876](https://github.com/openclaw/openclaw/issues/49876)** — **Cron hallucination**: isolated cron sessions fabricate plausible output on tool failure instead of failing cleanly. Platinum hermit, security-relevant. **Closed** but worth re-verifying because this is a trust-and-safety class issue.

## 6. Feature Requests & Roadmap Signals

**Most-discussed feature requests (open):**

1. **[#40786](https://github.com/openclaw/openclaw/issues/40786)** — `.gitignore`-style exclude patterns in `backup create` (12 comments). Highly likely for next minor; trivial scope, repeated user demand.
2. **[#12855](https://github.com/openclaw/openclaw/issues/12855)** — Built-in auto-update with schedule, confirmation, post-update notification. Strong appetite given current update fragility.
3. **[#79168](https://github.com/openclaw/openclaw/issues/79168)** — Content-based prompt injection scanning on tool output (8 comments). Closed without implementation; indirect injection defense is increasingly expected.
4. **[#141747](https://github.com/openclaw/openclaw/issues/141747)** — Opt-out / reduction of runtime scaffolding `<system-reminder>` injection. Will likely become a `scaffolding.enabled` or token-budget knob.
5. **[#107930](https://github.com/openclaw/openclaw/issues/107930)** — Upgrade experience when Node.js version requirement changes. P0, rated ux-release-blocker; tied to #144742 release-process pain.
6. **[#109370](https://github.com/openclaw/openclaw/issues/109370)** — Surface delivery correlation data on `message_sent` hooks. Necessary for plugin idempotency.
7. **[#114612](https://github.com/openclaw/openclaw/issues/114612)** — Retention policy for `memory_index_chunks` / `memory_embedding_cache`. P2 but operationally critical; **PR #144699 (shared multi-agent memory DB)** addresses the related fan-out issue.

**Predictions for v2026.9.5 / v2026.10.x:**
- `npm update` global install swap fix (likely rolled into the same patch as #144208)
- Codex native hook relay kill

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Ecosystem
**Snapshot date: 2026-09-11** · Sources: per-project community digests (OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw)

---

## 1. Ecosystem Overview

The self-hosted personal AI assistant space has converged on a common architectural template — a long-running gateway/daemon bridging chat channels (Telegram, Slack, Discord, WhatsApp, Teams) to LLM providers, MCP tools, and subagent runtimes — and competition has shifted from feature velocity to **operational hardening**. Today's activity across all five projects is dominated by lifecycle bugs (process leaks, zombies, event-loop blocking), update/rollback safety, and session-state integrity rather than new capabilities. Windows parity has emerged as the single most widespread quality gap, and MCP is transitioning from experimental integration to a first-class surface with its own auth, reconnect, and memory-cost failure modes. Meanwhile, the frontier is moving from single-user assistants toward fleet operation (OpenClaw's 632-agent gateways) and team multi-tenancy (QwenPaw Hub).

---

## 2. Activity Comparison

*Health score: composite 1–10 weighing throughput (30%), release quality/risk (25%), regression severity load (20%), community engagement (15%), backlog hygiene (10%). Estimates from digest data only.*

| Project | Issues touched (24h) | PRs touched (24h) | Closed/merged (24h) | Release status | Health | One-line status |
|---|---|---|---|---|---|---|
| **OpenClaw** | 447 | 500 | 186 PRs + multiple P0/P1 issue closures | v2026.9.4 shipped — **same-day P0 blocker** (#144742); flagged unsafe for prod | **6.5** | Max velocity, elevated release risk |
| **QwenPaw** | 16 | 43 | 17 PRs, 4 issues | **v2.2.1 stable shipped**; 2.2.2b1 cycle already started | **7.5** | Best release discipline; post-launch regression cluster needs hotfix |
| **Hermes Agent** | 50 (42 open / 8 closed) | 50 (41 open / 9 closed) | 9 PRs, 8 issues | None (patch plausible) | **6.5** | Fast desktop fix loop; backlog asymmetry 42:8 |
| **ZeroClaw** | 50 | 50 | 5 issues, 2 PRs | None | **7.0** | Healthy governed cadence; open S0 security + reviewer concentration |
| **IronClaw** | 1 | 8 | 2 PRs, 0 issues | None | **5.0** | Quiet maintenance mode; zero community engagement |

**Takeaway:** OpenClaw operates at ~5–10× the daily volume of any peer, but QwenPaw shows the best velocity-to-quality ratio today (stable release + 2,475 new tests, +5.02pp coverage, gated CI redesign).

---

## 3. OpenClaw's Position

**Advantages vs. peers**
- **Scale proof:** Only project with evidence of fleet-grade deployments (632-agent gateway in #142476); multi-agent shared memory DB in flight (#144699).
- **Triage machinery:** Formal severity labels (P0–P2), ownership tags (`fix-shape-clear`, `clawsweeper`), and release-blocker discipline — the most industrialized issue pipeline of the five.
- **Breadth:** Deepest channel matrix (Teams/Slack/Telegram/Feishu/Discord) and provider coverage (Anthropic Vertex, OpenRouter, Volcengine).
- **Fix throughput:** 186 PRs closed/day; most new bugs carry clear ownership signals.

**Liabilities vs. peers**
- **Release quality is the worst in class today:** v2026.9.4 shipped missing a merged fix (#144742, every config write fails), plus a deterministic `npm update` failure (#144712) — same-day regressions QwenPaw and ZeroClaw did not exhibit.
- **Unbounded hook architecture:** #91009 (CPU-bound `openclaw-hooks` stalling RPC) contrasts with ZeroClaw's deliberately bounded delegate design (#9833: 8 calls / 180s cap) — a philosophical gap in execution containment.
- **Regression rate on 2026.9.x** (message loss #139847, transcript reconciliation stall #140620) exceeds anything reported at Hermes, QwenPaw, or ZeroClaw today.

**Architecture & community:** Node gateway + systemd + npm distribution + SQLite memory, vs. Hermes's consumer desktop app, ZeroClaw's Rust daemon with wasmtime sandboxing, and QwenPaw's Tauri + hosted console + Hub stack. Community size is the largest by a wide margin (issue IDs in the ~144k range vs. ~108k Hermes, ~10–11k ZeroClaw/IronClaw/QwenPaw — a rough historical-volume proxy; numbering schemes differ).

---

## 4. Shared Technical Focus Areas

| Focus area | Projects | Specific needs (evidence) |
|---|---|---|
| **Windows platform parity** | OpenClaw, Hermes, QwenPaw, ZeroClaw | 74 CI failures (ZC #7462), 2MB stack overflows (ZC #10734/#10753), WSL bash hijack (H #108165), extended-length paths (OC #144688), Tauri session loss (QP #7698) |
| **Process lifecycle & resource leaks** | OpenClaw, Hermes, ZeroClaw | Zombie children (OC #97616), hook-relay CPU spin (OC #91009), 625MB MCP stdio grandchildren (H #108084), port-bound zombie daemon (ZC #8800), RSS growth from schema cloning (ZC #8642) |
| **Update/rollback safety** | OpenClaw, Hermes, QwenPaw, ZeroClaw | Missing-fix release + core/plugin version skew (OC #144742, #135776), permanent restart warnings (H #107402), config loss post-upgrade (QP #7708), wrong-binary remediation — fixed (ZC #10532) |
| **Session persistence & message integrity** | All five | Dropped concurrent messages (OC #139847), lost final Telegram replies (OC #128971), missing session JSON (QP #7698), context erased on stop (ZC #8794), session-ID leaks (H #108121/#108079) |
| **Subagent orchestration & tool authority** | OpenClaw, QwenPaw, ZeroClaw | Subagent timeouts + ignored `subagent_model` (QP #7678/#7676), delegate allowlist bypass — **S0** (ZC #8279), raw-provider persistence (OC #92405) |
| **MCP hardening** | Hermes, ZeroClaw (OpenClaw adjacent) | OAuth RFC 9207 `iss` failures (H #92758), empty tool registries on revive (H #108087), vision routing for image blocks (ZC #9521) |
| **Silent failure / trust** | OpenClaw, Hermes, QwenPaw | Cron output hallucination (OC #49876), "reports success, delivers nothing" pattern (H media links, MCP), Stop-button no-op with task still running (QP #7567) |
| **Context/token budget control** | OpenClaw, QwenPaw | ~686 tokens/turn scaffolding with no opt-out (OC #141747), `/compact` + provider-resolved context windows (QP #7679, #7652) |

---

## 5. Differentiation Analysis

| Project | Feature focus | Target user | Technical architecture |
|---|---|---|---|
| **OpenClaw** | Fleet/multi-agent ops, broad channel + provider matrix, update recovery | Operators running agent fleets at scale | Node gateway, systemd service, npm distribution, SQLite memory, hook-relay subprocess model |
| **Hermes Agent** | Desktop UX polish, voice (Fluid Voice, Hermes Radio), multi-provider LLM support (DeepSeek, xAI, Codex-compatible) | Individual enthusiasts self-hosting personal assistants | Consumer desktop app + gateway bridging Telegram/Signal/WhatsApp/Discord |
| **IronClaw** | Channel-pairing correctness, IME/i18n, benchmark-driven model QA (officeqa taxonomy) | Engineering/research-oriented users (nearai); thin external community | Rust core + WebUI, OpenAI-compatible API surface |
| **QwenPaw** | Onboarding portability (**PawPort** imports from Codex/Qoder), Hub multi-tenancy, per-agent model routing, mobile web | Prosumers → small teams; users switching from other harnesses | Tauri desktop + hosted console (`platform.agentscope.io`) + plugin ecosystem |
| **ZeroClaw** | Security (tool allowlists, wasmtime sandboxing, CVE hygiene), governance reform, plugin/channel runtime refactor | Technical operators who prioritize safety and process rigor | Rust daemon (`zeroclaw-runtime` crates), sandboxed delegates with explicit bounds, RFC-driven governance |

The sharpest strategic contrast: **QwenPaw is buying growth** (portability tooling, multi-tenant Hub, mobile), **ZeroClaw is buying trust** (S0 security triage, bounded execution, governance), **OpenClaw is buying scale** (fleet ops, channel breadth), while **Hermes optimizes the single-user experience** and **IronClaw remains benchmark-focused infrastructure**.

---

## 6. Community Momentum & Maturity

- **Tier 1 — massive velocity:** **OpenClaw** (~950 items/day touched). Mature triage machinery, but the 2026.9.x line shows the cost of velocity: repeated update-path regressions. Iterating fast, stabilizing poorly.
- **Tier 2 — rapid, disciplined iteration:** **QwenPaw** is the fastest healthy iterator — stable release, coverage sprint, next beta started same day, and a 26-comment de-facto roadmap RFC (#7318) showing real community pull. **Hermes** iterates quickly on desktop regressions (24–48h fix turnaround) but its open:close ratio (42:8) shows intake outpacing resolution. **ZeroClaw** shows governed momentum — closures, RFC pipeline — but reviewer concentration on 1–2 maintainers is its scaling risk.
- **Tier 3 — maintenance mode:** **IronClaw** — dependabot-driven, automated failure-taxonomy bots, zero user engagement in the snapshot; correctness PRs stalling at 5 days with no comments.

**Trajectory read:** QwenPaw and ZeroClaw are compounding (process + product); OpenClaw must convert throughput into release reliability; Hermes must close its Windows/MCP high-impact gaps before dissatisfaction grows; IronClaw risks community dormancy.

---

## 7. Trend Signals

1. **Update safety is now a product feature, not plumbing.** Same-day P0s at OpenClaw (#144742, #144712) and user demand for auto-update (#12855) show transactional, verifiable rollback (OpenClaw's v2026.9.4 feature, ZeroClaw's #10532) is table stakes. *Build atomic core+plugin update paths with pre-flight verification.*
2. **Bounded execution is the architectural lesson of the quarter.** OpenClaw's unbounded hook relay (#91009) vs. ZeroClaw's capped delegate loop (8 calls/180s) frames the design choice: every subprocess/hook/delegate invocation needs resource ceilings and reaping. Zombie/leak bugs appeared in 3 of 5 projects today.
3. **Windows is the graveyard of cross-platform agents.** Four projects reported Windows-specific failures (stack overflows, path prefixes, WSL hijacks, session loss). *A Windows CI matrix is a competitive moat, not hygiene.*
4. **MCP is entering its operational era:** OAuth interop (RFC 9207), reconnect hygiene, and memory cost of tool-schema handling are the new failure classes — treat MCP servers as untrusted, leak-prone long-lived processes.
5. **"Silent success" is the top trust killer.** Hallucinated cron output (OC #49876), UI showing stopped while tasks run (QP #7567), connected-but-empty MCP registries (H #108087) — users punish reported success with delivered failure more than loud errors. *Invest in failure observability and delivery-receipt semantics.*
6. **The market is shifting from personal to team/fleet:** QwenPaw Hub (multi-tenant, admin-governed skills) and OpenClaw's shared multi-agent memory (#144699) both point at team workflows as the next battleground.
7. **Portability is a growth weapon:** PawPort's import-from-Codex/Qoder flow shows switching-cost reduction being used explicitly as an acquisition strategy — expect harnesses to compete on ingestion of competitors' configs, skills, and history.
8. **Subagent security inheritance is an open frontier:** ZeroClaw's S0 delegate allowlist bypass (#8279) and OpenClaw's tool-authority snapshot failure (#139847) indicate that *how child agents inherit (or escape) parent policy* is unsolved ecosystem-wide — a priority area for anyone building delegation.

---

*All figures derived solely from the 2026-09-11 digests; health scores are analyst composites, not project-published metrics.*

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-11

## 1. Today's Overview

Hermes Agent shows a high-velocity day with **50 issues and 50 PRs updated in the last 24 hours**, but **no new releases were published**. The maintainers are clearly working through a thick backlog: 42 issues remain open while only 8 were closed, and PRs show the same asymmetry (41 open vs. 9 closed/merged). Activity is heavily concentrated in two areas: **Desktop app regressions around the titlebar/sidebar/z-index redesign** (a single recent commit `bbe212de9b` triggered a cluster of macOS and Windows UI bugs) and **MCP / session-state plumbing** on the gateway side. The single highest-traffic item (issue #88584, 87 comments) is a blocked automated merge from a downstream fork, which is a release-process concern rather than a product issue, and is skewing the "top discussion" metrics.

## 2. Releases

**No new releases in the last 24 hours.** Given the volume of merged UI and MCP fixes, a patch release is plausible in the coming days but cannot be confirmed from the available data.

## 3. Project Progress

Merged/closed PRs in the last 24h (representative, selected from the 9 closed):

- **[#107776](https://github.com/NousResearch/hermes-agent/pull/107776)** — `fix(desktop): ensure sidebar toggle stays above panel tabs (z-index)` — fixes the regression where the collapsed sidebar's "expand" button became unclickable. Closes [#107774](https://github.com/NousResearch/hermes-agent/issues/107774).
- **[#107823](https://github.com/NousResearch/hermes-agent/pull/107823)** — `fix(desktop): restore minimized sessions from sidebar toggle` — restores Cmd+B / sidebar toggle behavior when the sessions group was minimized.
- **[#107209](https://github.com/NousResearch/hermes-agent/pull/107209)** — `fix(desktop): restore minimized sidebar through sidebar controls` — companion fix to #107823, addresses the active-tab-not-switching edge case.
- **[#107217](https://github.com/NousResearch/hermes-agent/pull/107217)** — `fix(desktop): keep narrow sidebar tabs below window controls` — clipping fix at narrow widths.
- **[#107223](https://github.com/NousResearch/hermes-agent/pull/107223)** — `fix(desktop): keep left titlebar tabs from clipping beside window controls` — root-cause fix for the `bbe212de9b` regression, unblocks issue [#107196](https://github.com/NousResearch/hermes-agent/issues/107196).

Closed issues that shipped today:

- **[#65094](https://github.com/NousResearch/hermes-agent/issues/65094)** — Codex-compatible custom `/v1` providers now forward Hermes session headers.
- **[#108126](https://github.com/NousResearch/hermes-agent/issues/108126)** — Native DeepSeek provider profile preserves `thinking`/`reasoning_effort` for V4.1 Flash.
- **[#26832](https://github.com/NousResearch/hermes-agent/issues/26832)** — Feature request for workday-aware cron pre-conditions was marked "implemented-on-main."
- **[#107774](https://github.com/NousResearch/hermes-agent/issues/107774)** and **[#107196](https://github.com/NousResearch/hermes-agent/issues/107196)** — macOS titlebar/sidebar overlap regressions.

Net effect: roughly **6–8 desktop UI bugs closed today**, plus a small number of provider/config fixes. The Desktop cluster is being chipped down steadily.

## 4. Community Hot Topics

| Rank | Item | Type | Comments | Why it matters |
|---|---|---|---|---|
| 1 | [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) — Automated Nous integration blocked | Issue (invalid) | 87 | A misfiled automation ticket about a fork-to-fork merge conflict in `cron/jobs.py` — high comment count is procedural, not product signal. |
| 2 | [#84361](https://github.com/NousResearch/hermes-agent/issues/84361) — Desktop MEDIA file links dead | Issue (P2 bug) | 9 | Real user-facing breakage: chat media links silently fail because of a tag regex and `file://` string concat. Needs visibility — no PR yet. |
| 3 | [#65094](https://github.com/NousResearch/hermes-agent/issues/65094) — Codex custom providers drop session headers | Issue (closed) | 6 | Multi-provider session continuity is a recurring reliability theme. |
| 4 | [#17476](https://github.com/NousResearch/hermes-agent/issues/17476) — Consolidate live-time PRs around one ephemeral runtime context | Refactor / needs-decision | 6 | Architectural cleanup touching agent + gateway — maintainer decision required. |
| 5 | [#92758](https://github.com/NousResearch/hermes-agent/issues/92758) — MCP OAuth desktop fails on RFC 9207 `iss` | Issue (P2) | 5 | Interop with modern auth servers (e.g., Resend) — growing MCP surface area. |
| 6 | [#107402](https://github.com/NousResearch/hermes-agent/issues/107402) — `hermes update` leaves permanent "did not restart" warning | Issue (P2) | 5 | Update UX paper cut affecting fleet operators. |
| 7 | [#107196](https://github.com/NousResearch/hermes-agent/issues/107196) — macOS titlebar panel tabs clipped | Issue (closed) | 4 | Resolved today by PR #107223. |
| 8 | [#106619](https://github.com/NousResearch/hermes-agent/issues/106619) — Cannot connect `opencode-go` provider | Issue (P3) | 4 | Awaits reporter info — onboarding friction on a third-party provider. |

**Underlying themes:**
- **Provider proliferation pain.** DeepSeek, xAI/OAuth, OpenCode-Go, and Codex-compatible endpoints are generating parallel bugs (provider-specific quirks, OAuth refresh, session headers). A unified provider-config audit is overdue.
- **MCP is becoming a first-class surface.** Three of the top items touch MCP (OAuth, tool registration, Windows reconnect), suggesting it's now a primary integration target rather than an experimental one.
- **Cross-platform session identity** (`message_id`, `session_id`, `HERMES_CRON_SESSION`) is leaking across boundaries — a coherent identity model is needed.

## 5. Bugs & Stability

Ranked roughly by impact:

**High impact**
- **[#108084](https://github.com/NousResearch/hermes-agent/issues/108084)** — Windows MCP reconnect leaks stdio grandchildren (12 node.exe, ~625 MB across 3 generations). No fix PR yet. P2.
- **[#108085] cluster** — Windows desktop zone-collapse chevron leaves a durable input trap ([#108105](https://github.com/NousResearch/hermes-agent/issues/108105)). Survives Ctrl+R. No fix PR. P2.
- **[#108147](https://github.com/NousResearch/hermes-agent/issues/108147)** — TUI WebSocket send batches have no byte/frame bound; can grow unbounded. P2.
- **[#108165](https://github.com/NousResearch/hermes-agent/issues/108165)** — Windows: `shutil.which("bash")` resolves to WSL bash, breaking every terminal tool call. P2-equivalent operational breakage. No fix PR.

**Medium impact**
- **[#108122](https://github.com/NousResearch/hermes-agent/issues/108122)** — `xai-oauth` stale-token 403s abort gateway turns; 401-gated refresh never fires. P3 but breaks long-lived Telegram/Signal/WhatsApp deployments.
- **[#108121](https://github.com/NousResearch/hermes-agent/issues/108121)** — `HERMES_CRON_SESSION` leaks into gateway messages, blocking `execute_code` for human users (Discord/Telegram).
- **[#108079](https://github.com/NousResearch/hermes-agent/issues/108079)** — Slack `SessionSource` never populates `message_id` — `HERMES_SESSION_MESSAGE_ID` always empty.
- **[#108088](https://github.com/NousResearch/hermes-agent/issues/108088)** — Bot Mode relay keeps an unwanted local backend alive on remote-primary Desktop, with 30s WebSocket churn and focus loss.
- **[#108087](https://github.com/NousResearch/hermes-agent/issues/108087)** — `_register_discovered_tools_if_needed()` is unreachable due to a `_ready` guard bug — revived MCP servers serve empty tool registries.
- **[#108171](https://github.com/NousResearch/hermes-agent/issues/108171)** — `openai-codex` image provider silently ignores `aspect_ratio` and skips model-id validation.
- **[#108113](https://github.com/NousResearch/hermes-agent/issues/108113)** — Hermes Radio remains paused after Fluid Voice dictation confirmation (macOS 26.6.2).

**Low / cosmetic**
- **[#107196](https://github.com/NousResearch/hermes-agent/issues/107196)** — macOS titlebar panel-tab clipping — **fixed today** by PR #107223.
- **[#107774](https://github.com/NousResearch/hermes-agent/issues/107774)** — collapsed sidebar tab overlap — **fixed today** by PR #107776.
- **[#94703](https://github.com/NousResearch/hermes-agent/issues/94703)** — Linux ARM64 Desktop updater falsely reports GUI/backend skew.
- **[#108066](https://github.com/NousResearch/hermes-agent/issues/108066)** — Desktop OAuth refresh never clears rejected tokens (`fetchJson` drops `statusCode`).
- **[#108075](https://github.com/NousResearch/hermes-agent/issues/108075)** — `backgroundDone` native notification shows only the command's first line.
- **[#108163](https://github.com/NousResearch/hermes-agent/issues/108163)** — Smart-approval guardian's `max_tokens=16` empty-answers on reasoning models — **has fix PR** [#108168](https://github.com/NousResearch/hermes-agent/pull/108168).
- **[#108150](https://github.com/NousResearch/hermes-agent/issues/108150)** — `scripts/desktop-update/repro.sh gate` is not hermetic.

**Windows is disproportionately affected** — at least 5 of today's items are Windows-specific (MCP reconnect leak, bash resolution, desktop trap, ARM64 update, package-updater fallback). A Windows-platform sweeper pass would resolve a meaningful chunk of open P2s.

## 6. Feature Requests & Roadmap Signals

Active feature work and requests visible today:

- **[#79139](https://github.com/NousResearch/hermes-agent/pull/79139)** — Per-chat native-mention-only gating across Slack/Telegram/WhatsApp/DingTalk, plus teaching gateway agents that reply-gating is config-enforced. Likely to land soon; touches all major platforms.
- **[#58015](https://github.com/NousResearch/hermes-agent/pull/58015)** — Achievements: export endpoint and agent summary. Open PR, low-priority features but visible to users.
- **[#108169](https://github.com/NousResearch/hermes-agent/pull/108169)** — A2A inline push callbacks on loopback-bound inbound. Aligns Hermes with A2A Protocol 1.0 §3.2.2.
- **[#108170](https://github.com/NousResearch/hermes-agent/pull/108170)** — Kanban: preserve sticky block on `initial_status=blocked` tasks. Closed as completed.
- **[#26832](https://github.com/NousResearch/hermes-agent/issues/26832)** — Workday-aware cron pre-conditions (closed as **implemented-on-main**). Strong signal that locale-aware scheduling is on the roadmap.
- **[#92208](https://github.com/NousResearch/hermes-agent/issues/92208)** — Generalize "Add to chat" from terminal output to chat transcripts and image/artifact selections. Reasonable candidate for the next Desktop release.

**Prediction for the next release window (most likely):**
- Desktop titlebar/sidebar/z-index regression fixes (already merged; ready to ship).
- Smart-approval guardian token budget fix (PR #108168 ready).
- MCP tool-registration `_ready` guard fix once PR lands.
- Possibly the cron workday pre-condition if it clears review.

## 7. User Feedback Summary

**Pain points (real users):**
- **Desktop regression anxiety.** Multiple users report being "trapped" in the UI by the new titlebar tabs — zone collapse / strip-hide sequences that break settings, layout editor, and HUD inputs and survive Ctrl+R. Strongly worded "durable trap" and "unclickable" language across [#107774], [#108105], [#107196]. The redesign in `bbe212de9b` is being walked back piece by piece.
- **Update UX.** [#107402] and [#94703] show users running the updater encounter confusing permanent warnings ("did not restart gateways," "needs one more step"). A fleet/cluster operator's mental model is being punished by state strings.
- **Cross-platform provider fragility.** xAI OAuth, DeepSeek, OpenCode-Go, and Codex-compatible providers each have at least one bug filed today. Users on long-lived gateways (Telegram, Discord) are the most exposed because token/credential rotation interacts with session continuity.
- **Silent failures.** [#84361] (no path logged), [#108087] (MCP server "connected" with zero tools), [#108171] (silent aspect-ratio drop), [#108105] (clicks vanish) all share a pattern: Hermes reports success while delivering nothing. This is the single most consistent complaint.
- **MCP expectations.** [#92758] and [#108087] show users expect Hermes MCP to interoperate with modern auth servers and survive reconnects — both fail today.

**Satisfaction signal:**
- The cluster of closed macOS titlebar/clipping issues today, plus the maintainers' quick turnaround on companion PRs from `wukangcheng1994`, `KoNit-K`, `kokhlo`, and `MarionLiew`, indicates responsive maintainer engagement on Desktop regressions. Users complaining about specific clipping issues are getting fixes within ~24–48h.
- Conversely, no PR exists yet for any of the high-impact Windows items or the silent-failure MCP bug, which is where dissatisfaction is likely to grow.

## 8. Backlog Watch

Items needing explicit maintainer attention — either stale, decision-blocked, or high-impact with no owner:

- **[#88584](https://github.com/NousResearch/hermes-agent/issues/88584)** (87 comments, P3) — Marked `invalid` but is dominating discussion metrics; needs a maintainer note explaining why this is an external automation concern, or escalation to the fork owner. Comment volume is distorting signal.
- **[#17476](https://github.com/NousResearch/hermes-agent/issues/17476)** (P2, `needs-decision`) — Live-time ephemeral runtime context refactor. Touches agent + gateway. No PR; tagged `sweeper:risk-caching` and explicitly awaiting a maintainer architectural call. ~4.5 months old.
- **[#17476] family of timestamp/timezone PRs** — likely consolidating here; without a decision, multiple contributors are duplicating work.
- **[#106619](https://github.com/NousResearch/hermes-agent/issues/106619)** (awaiting-reporter) — `opencode-go` provider can't connect. Two days old, reporter input needed before triagers can act.
- **[#108084](https://github.com/NousResearch/hermes-agent/issues/108084)** (Windows MCP reconnect leak) — high impact, **no PR**. Resource leak in the default MCP path is exactly the kind of issue that should not age a week.
- **[#108087](https://github.com/NousResearch/hermes-agent/issues/108087)** (`needs-repro`) — MCP `_ready` guard makes tool registration unreachable. Needs a repro commit/tag to confirm, but the description is concrete.
- **[#80135](https://github.com/NousResearch/hermes-agent/pull/80135)** (open ~1 month) — `fix(update): preserve non-prefixed systemd gateway process`. Important for non-Docker fleet operators; still open.
- **[#108121](https://github.com/NousResearch/hermes-agent/issues/108121)** — `HERMES_CRON_SESSION` leaks into human chat. Marked duplicate but the underlying identifier-leak pattern appears in [#108079] and [#65094] — a single root-cause fix could close all three.
- **[#94703](https://github.com/NousResearch/hermes-agent/issues/94703)** (Linux ARM64 updater false skew) — niche but persistent; one-line fix likely.

**Maintainer time-saver:** Closing [#88584] cleanly (the 87-comment misfiled ticket) would dramatically improve the signal-to-noise ratio of the issue tracker and free up triage attention for the genuine Windows and MCP work.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-11

## 1. Today's Overview

IronClaw shows moderate maintenance activity with no releases shipped. The day's traffic is dominated by Dependabot-driven dependency updates (4 of 8 PRs) and small bug fixes, alongside a notable feature addition to the Telegram channel and an automated daily failure-taxonomy issue. Six PRs remain open awaiting review, while two PRs were closed (#8072 Telegram command menu feature, #8080 a Rust dependency batch superseded by #8097). Overall, this indicates a healthy but routine maintenance cadence rather than a major feature push.

## 2. Releases

No new releases in the last 24 hours. No version tags, changelogs, or migration notes to report.

## 3. Project Progress

Two PRs were closed in the last 24 hours:

- **[#8072](https://github.com/nearai/ironclaw/pull/8072) — feat(telegram): register the Bot API command menu at activation** (CLOSED)  
  Authored by `thisisjoshford`. Adds Telegram Bot API `setMyCommands` registration at extension activation for `/model`, `/status`, `/new`, `/stop`, `/interrupt`, with best-effort `deleteMyCommands` cleanup at deactivation. Labeled `size: L`, `risk: low`, `scope: docs, dependencies`, contributor tier: experienced. Improves discoverability of Telegram channel commands.

- **[#8080](https://github.com/nearai/ironclaw/pull/8080) — chore(deps): bump the everything-else group across 1 directory with 21 updates** (CLOSED)  
  Dependabot PR with 21 Rust crate bumps. Effectively superseded by the larger follow-up [#8097](https://github.com/nearai/ironclaw/pull/8097), which bumps 24 crates in the same group.

## 4. Community Hot Topics

Engagement (comments and 👍 reactions) is uniformly low across all listed items — none of today's issues or PRs have any recorded comments, and all show 0 reactions. The most substantive item by content volume is:

- **[#8093 — Daily ironclaw failure taxonomy — 2026-09-10](https://github.com/nearai/ironclaw/issues/8093)** (OPEN)  
  Authored by `pranavraja99`. Automated daily classification report of non-pass tasks across IronClaw benchmark suites (e.g., officeqa with 42 non-pass tasks). Summary attributes the failures to "genuine model errors" in DeepSeek-V4-Flash navigation, providing an ongoing, transparent view of model regressions rather than a user-facing bug. Linkage to a published benchmark dashboard indicates a structured evaluation feedback loop.

The lack of comment volume suggests minimal community discussion today; activity is engineering-driven rather than user-driven.

## 5. Bugs & Stability

Two open bug-fix PRs address user-facing defects:

| Severity | Item | Description |
|---|---|---|
| **Medium** | [#8092 — fix(webui): preserve IME composition in the chat composer](https://github.com/nearai/ironclaw/pull/8092) | Authored by `huiq777`. Restores IME composition handling that was being intercepted by command-menu and Enter-to-send handlers; also handles Safari's `keyCode === 229` case. Adds regression tests. Fix PR exists, ready for review. |
| **Medium** | [#8076 — fix(assistant): distinguish disconnected shared channels](https://github.com/nearai/ironclaw/pull/8076) | Authored by `be-student`. Disambiguates a paired user's disconnected shared channel from an unpaired account; renders channel-specific guidance across user messages, bot commands, and the OpenAI-compatible surface; aligns rejection classification across product, adapter, and capability files. Fix PR open. |

Both items are correctness fixes rather than crashes or data-loss issues. No critical-severity incidents reported.

## 6. Feature Requests & Roadmap Signals

The single closed feature PR is the most concrete roadmap signal for today's window:

- **Telegram chat menu command registration** ([#8072](https://github.com/nearai/ironclaw/pull/8072)) — now landed. Telegram now mirrors the same command surface (`/model`, `/status`, `/new`, `/stop`, `/interrupt`) already exposed on other channels, suggesting ongoing cross-channel feature parity work.

No external feature requests were filed in the last 24h. The weekly benchmark taxonomy issue ([#8093](https://github.com/nearai/ironclaw/issues/8093)) acts as a low-frequency signal of where model-quality improvements are most needed (currently the `officeqa` suite under DeepSeek-V4-Flash).

## 7. User Feedback Summary

No user-authored issues or feedback threads were opened in the last 24h. The two open bug-fix PRs ([#8092](https://github.com/nearai/ironclaw/pull/8092), [#8076](https://github.com/nearai/ironclaw/pull/8076)) reflect two recurring classes of pain points the project has clearly encountered before:

- **Internationalization / non-Latin input**: IME composition breakage in the WebUI composer is a long-standing class of issue in chat UIs; the fix targets both Chromium/Firefox and Safari paths.
- **Channel pairing state**: distinguishing disconnected-but-paired shared channels from completely unpaired accounts implies prior user confusion when channels silently failed to deliver messages.

No satisfaction or sentiment data is available from this snapshot.

## 8. Backlog Watch

Items that may need maintainer attention:

- **[#8097 — Rust everything-else group, 24 updates](https://github.com/nearai/ironclaw/pull/8097)** — Supersedes the closed #8080; reviewer should confirm the delta between the 21-update and 24-update batches before merging.
- **[#8096 — vitest 4.1.9 → 4.1.11](https://github.com/nearai/ironclaw/pull/8096)** — Patch-level JS test runner bump in the WebUI frontend.
- **[#8094 — js-yaml 4.3.1 → 4.3.2](https://github.com/nearai/ironclaw/pull/8094)** and **[#8095 — baseline-browser-mapping 2.10.17 → 2.11.22](https://github.com/nearai/ironclaw/pull/8095)** — Documentation/architecture-video submodule dependency bumps; low risk but a non-trivial version jump on `baseline-browser-mapping` warrants a glance.
- **[#8076 — distinguish disconnected shared channels](https://github.com/nearai/ironclaw/pull/8076)** — Open since 2026-09-06 with zero comments; a 5-day-old correctness fix touching product, adapter, and OpenAI-compatible surfaces should not stall.
- **[#8093 — Daily failure taxonomy](https://github.com/nearai/ironclaw/issues/8093)** — Automated, but its accompanying officeqa failure breakdown flags a recurring model-side issue worth a maintainer-level triage.

---

**Summary metrics**
- Open issues updated: 1 · Closed: 0
- Open PRs updated: 6 · Closed/merged: 2
- New releases: 0
- Total community engagement (comments + reactions): 0 across all listed items

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-11

## 1. Today's Overview

QwenPaw is in an active, high-tempo development cycle on the day the **v2.2.1 stable** release lands. Across 24 hours the repository saw 16 issues (12 open / 4 closed) and 43 PRs (26 open / 17 merged or closed), with the merge stream dominated by release engineering (version bump, release notes, CI gate slimming) and a large backend test-coverage push (+5.02pp statement coverage, 2,475 new pytest cases in #7653). Real-user bug inflow is heavy and concentrates on three themes — session/file synchronization, subagent routing and stopping semantics, and desktop/Tauri regressions in 2.2.1-beta.x — signaling a release still under post-launch hardening. Overall health is good: the release-duty bots closed v2.2.1-beta.2 verification and a new v2.2.1 stable verification issue (#7692) opened on schedule, and first-time contributors continue to land scoped fixes.

---

## 2. Releases

### v2.2.1 — Stable ([release](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1))

The 2.2.1 changelog highlights (partial — full notes tracked in [PR #7694](https://github.com/agentscope-ai/QwenPaw/pull/7694)):

- **Per-Agent model routing** — providers and fallback chain can now be configured independently per agent. ([#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501))
- **Auto Fin proactive memory review** with an upgraded **ReMe** memory backend.
- **Release-duty verification** opened by automation bot: [Issue #7692](https://github.com/agentscope-ai/QwenPaw/issues/7692) (deadline 2026-09-11 08:19 UTC, four checkpoint gates per platform).

**Migration / risk notes for users upgrading from 2.2.0 → 2.2.1:**

- The desktop `2.2.1-beta.2` build (Console bundle 2026-09-10) is already producing a **silent conversation-switch regression** on Windows ([Issue #7687](https://github.com/agentscope-ai/QwenPaw/issues/7687), closed). Stable users should watch for the same symptom until confirmed fixed in GA.
- Several user-reported v2.2.0 / v2.2.1 desktop bugs (model config loss, working-directory drift, ghost sessions) were filed **today** against the new release — verify settings after upgrade.

A follow-up beta line is already in motion: [PR #7695](https://github.com/agentscope-ai/QwenPaw/pull/7695) (closed) bumps version to **2.2.2b1**.

---

## 3. Project Progress

Merged / closed in the last 24 hours (selection, ordered by impact):

- **[PR #6960](https://github.com/agentscope-ai/QwenPaw/pull/6960) — `feat(pawport): import flow from other agent harnesses** (closed). Introduces **PawPort**, a portability subsystem that discovers, normalizes, validates and imports instructions, settings, skills, plugins, projects and recent work from Codex and Qoder into QwenPaw. Major onboarding improvement.
- **[PR #7653](https://github.com/agentscope-ai/QwenPaw/pull/7653) — `test(unit): coverage sprint batch 2` (+5.02pp)** (closed). 2,475 new backend pytest cases across channels, visual compression, routers, runtime and CLI; coverage of `src/qwenpaw` 64.41% → 69.43%.
- **[PR #7652](https://github.com/agentscope-ai/QwenPaw/pull/7652) — `fix(models): preserve provider-resolved context windows`** (closed). Restores model `context_size` from provider resolution, preventing premature compaction for providers that override AgentScope's 32 768 default.
- **[PR #7677](https://github.com/agentscope-ai/QwenPaw/pull/7677) — `fix(api): 422 for non-finite validation inputs`** (closed). Application-level `RequestValidationError` handler returns FastAPI-style structured 422 with JSON-safe error inputs.
- **[PR #7688](https://github.com/agentscope-ai/QwenPaw/pull/7688) — `fix(console): simplify grouped session pagination`** (closed). Removes "Collapse List"; replaces with **Load More** pagination that preserves scroll position when selecting a conversation deep in the list.
- **[PR #7694](https://github.com/agentscope-ai/QwenPaw/pull/7694) / #6994** (closed). Release notes for **v2.2.1** and historical **v2.1.0**.
- **[PR #7695](https://github.com/agentscope-ai/QwenPaw/pull/7695) — version bump to 2.2.2b1** (closed). Signals start of the next beta cycle.
- **[PR #7697](https://github.com/agentscope-ai/QwenPaw/pull/7697) — `ci: slim PR gate to Ubuntu backend tiers + release-time full test gate`** (open). Backend tier matrix reduced at PR time; full suite re-enabled at release. Faster PR feedback, same release confidence.

Net: a strong release-readiness push — versioning, notes, CI gate tuning, test coverage and the largest single feature merged today (PawPort).

---

## 4. Community Hot Topics

The community conversation is dominated by a single long-running thread:

- **[Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) — "QwenPaw Hub, the multi-tenant edition, is coming in 2.2.0: what should we build next?"** — 26 comments, 4 👍, last updated today.
  Author **rayrayraykk** explicitly frames Hub as QwenPaw's first response to repeated multi-user / admin-managed-skills requests, linking [#2324](https://github.com/agentscope-ai/QwenPaw/issues/2324). Discussion is shaping Hub's roadmap (skills governance, admin roles, tenant isolation). **Maintainer attention recommended** — this is effectively the de-facto roadmap RFC for the multi-tenant product line.

Active engineering threads just below:

- **[Issue #7177](https://github.com/agentscope-ai/QwenPaw/issues/7177)** (closed today, 10 comments) — Mobile/web UX on `platform.agentscope.io/deploy`: move top-level entry to top, reposition Stop behind Run. **Closed without an accepted fix on the thread; monitor for re-opening.**
- **[Issue #7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)** — Stop button is a no-op; UI shows stopped but the task continues (4 comments).
- **[Issue #7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)** — `spawn subAgent` tasks always fail/timeout (3 comments).
- **[PR #6776](https://github.com/agentscope-ai/QwenPaw/pull/6776)** — Browser backend self-heal for dead Playwright drivers ("die once, dead forever"), first-time contributor, ready for review.
- **[PR #7592](https://github.com/agentscope-ai/QwenPaw/pull/7592)** — Optional Telegram intermediate-message cleanup after the final response; opt-in default keeps 2.2.x behavior.

Underlying need across these threads: **predictable execution control** (Stop works, subAgents don't hang) and **multi-user team workflows** (Hub, mobile-friendly admin pages).

---

## 5. Bugs & Stability

Reported in the last 24 hours, ranked by severity / blast radius:

| # | Severity | Symptom | Notes / Fix |
|---|----------|---------|-------------|
| [Issue #7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | **High** — silent data corruption risk. Stop button reports stopped in UI, but task keeps executing; sending a corrective instruction throws HTTP 409. v2.2 web. | No PR linked yet. |
| [Issue #7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) | **High** — feature broken on Windows 2.2.0. Once a task triggers `spawn subAgent`, every attempt times out regardless of timeout setting. | Adjacent to [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) (`subagent_model` ignored — spawned subagents always inherit parent's `active_model`). Strong indicator of a systemic subagent-routing regression in 2.2.x. |
| [Issue #7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) | **High** — data loss. Tauri v2.2.1 Windows shows a 9/10 session in the sidebar but loads 9/9 content; the underlying session JSON is missing on disk. | Affects trust in local persistence; needs an index-rebuild story. |
| [Issue #7689](https://github.com/agentscope-ai/QwenPaw/issues/7689) | **Medium** — provider integration regression. After [#7621](https://github.com/agentscope-ai/QwenPaw/pull/7621), PDF document blocks are still serialized as `{"type":"file",...}` for **OpenAI-compatible `/chat/completions` multimodal endpoints** and rejected with HTTP error. | Half-fix; needs a follow-up PR. |
| [Issue #7687](https://github.com/agentscope-ai/QwenPaw/issues/7687) | **Medium — regression** in `2.2.1-beta.2` (Console bundle 2026-09-10). Switching agent silently sends to a new conversation. | **Closed today** (status TBD — verify fix in stable). |
| [Issue #7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) | **Medium**. Configured model disappears mid-session in 2.2.1 desktop; user must re-select. | No fix PR. |
| [Issue #7705](https://github.com/agentscope-ai/QwenPaw/issues/7705) | **Medium**. Default Agent working directory reverts to old path after restart; per-folder project-session UX is opaque. | No fix PR. |
| [Issue #7693](https://github.com/agentscope-ai/QwenPaw/issues/7693) | **Medium**. Creator (multi-image project): "审核通过" (approve) during image generation permanently parks the task in RUNNING; concurrency slot=1 prevents recovery. | No fix PR. |
| [Issue #7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) | **Medium**. `subagent_model` setting has no effect — spawned subagents always inherit parent's `active_model`. Affects `2.2.1-beta.1` and `2.2.1-beta.2`. | No fix PR. |

**Pattern:** the 2.2.1 desktop/Tauri build carries a cluster of state-persistence and subagent-routing regressions that need a coordinated hotfix release. Issue [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) is the most urgent — it can corrupt user state.

---

## 6. Feature Requests & Roadmap Signals

Direct user requests filed today, with likely next-version fit:

| # | Request | Likely target |
|---|---------|---------------|
| [Issue #7679](https://github.com/agentscope-ai/QwenPaw/issues/7679) | `/compact` command in loop target/task mode to compress long context before submission. | **Likely 2.2.2 / 2.3** — aligns with the new "Visual compaction" work in [PR #7703](https://github.com/agentscope-ai/QwenPaw/pull/7703). |
| [Issue #7700](https://github.com/agentscope-ai/QwenPaw/issues/7700) | Switch docs preview / browser panel to the right now that conversations live on the left. | **Likely 2.2.2** — matches [PR #7704](https://github.com/agentscope-ai/QwenPaw/pull/7704) (chat files drawer moved right). |
| [Issue #7707](https://github.com/agentscope-ai/QwenPaw/issues/7707) | Android input box: newline button should insert newline, not submit. | **Likely 2.2.2 mobile/console patch** — closed today, watch for re-open or PR. |
| [Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) | Hub multi-tenant: multi-user, admin-managed skills. | **Active roadmap thread**; [PR #7696](https://github.com/agentscope-ai/QwenPaw/pull/7696) (`qwenpaw hub --init-admin`) is the first concrete Hub drop. |
| [PR #7696](https://github.com/agentscope-ai/QwenPaw/pull/7696) | `qwenpaw hub --init-admin USERNAME` for headless first-admin bootstrap. | Hub capability pipeline. |
| [PR #7702](https://github.com/agentscope-ai/QwenPaw/pull/7702) | `bot-manager` plugin — unified multi-channel bot config (WeChat, DingTalk, …) with agent↔channel binding view. | Likely plugin ecosystem / next minor. |
| [PR #7592](https://github.com/agentscope-ai/QwenPaw/pull/7592) | Optional cleanup of Telegram intermediate messages after final answer. | Likely 2.2.2 — opt-in, default off. |

**Roadmap signal:** the cluster around "long-task context control" (#7679 + #7703 + #7652) suggests QwenPaw is converging on a first-class **context-engineering** story across compaction, visual compaction and provider-aware context windows.

---

## 7. User Feedback Summary

Pain points extracted from today's threads:

- **Execution control is unreliable.** Users cannot trust the Stop button ([#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)) and `spawn subAgent` hangs unpredictably ([#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678), [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676)). This is the strongest dissatisfaction signal of the day.
- **Local persistence is brittle.** Sessions can disappear from the index ([#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698)) and model configurations vanish ([#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708)). Users on Windows Tauri 2.2.1 feel settings do not "stick."
- **Mobile web is loved,

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-11

## 1. Today's Overview

ZeroClaw shows **high maintainer engagement but a heavy concentration of high-risk, security-adjacent work** in the last 24 hours. 50 issues and 50 PRs were touched, with the activity split almost evenly between active triage/decision work (RFCs, maintainer review queues, design trackers) and concrete bug fixes. No new releases were cut, but the project is in a healthy engineering cadence: 5 issues and 2 PRs were closed today, including the long-running Telegram media-group bug (#5514 / #8955). Windows-related issues dominate the top of the stack — stack overflows on constrained threads, port-binding zombies, and CI matrix gaps — indicating the team is actively expanding cross-platform coverage. The RFC pipeline (decision tracker #8692, RFC #10549 on voting simplification, RFC #10366 on PR review evidence) signals that governance/process is being deliberately re-shaped alongside code work.

## 2. Releases

No new releases in the last 24 hours.

## 3. Project Progress

**Issues closed today (5):**
- [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — *Bug: batch Telegram media groups into one multimodal turn* — S3 Telegram UX bug closed after the corresponding PR landed.
- [#9521](https://github.com/zeroclaw-labs/zeroclaw/issues/9521) — *Map MCP tools/call type:image content blocks into vision pipeline* — closed (status:blocked/follow-up) after the multimodal plumbing moved upstream.
- [#10532](https://github.com/zeroclaw-labs/zeroclaw/issues/10532) — *degraded-config remediation can invoke a different binary than the running daemon* — config onboarding correctness bug closed.
- Two additional minor closures completed the set.

**PRs closed today (2):**
- [#8955](https://github.com/zeroclaw-labs/zeroclaw/pull/8955) — *fix(telegram): batch media group attachments* — the XL Telegram change that closed #5514.
- One additional closure (not in the top-20 list).

**Net project movement:** Telegram media batching is now production-quality, multimodal vision routing via MCP is in place, and the CLI's degraded-config remediation no longer mis-targets binaries.

## 4. Community Hot Topics

| Rank | Item | Comments | Topic |
|------|------|----------|-------|
| 1 | [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) — 74 Windows test failures | 19 | Platform coverage |
| 2 | [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — Maintainer decision queue | 15 | Governance |
| 3 | [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — RFC: simplify RFC voting | 9 | Process reform |
| 4 | [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — Telegram media groups *(closed)* | 8 | Channel UX |
| 5 | [#6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) — Nextcloud Talk wrong bot API | 8 | Channel integration |
| 6 | [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) — RFC: PR review evidence | 7 | Reviewer trust model |
| 7 | [#7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108) — CI Rust cache improvements | 7 | Developer velocity |
| 8 | [#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) — wasmtime-wasi CVEs | 6 | Supply-chain security |

**Underlying needs revealed:**
- **Cross-platform parity** is the loudest single demand (#7462, #7461, #8800, #10753, #10734). Users on Windows 11 — and maintainers running the new advisory CI job — are now finding real stack-overflow and port-binding defects that Linux CI cannot catch.
- **Process/governance reform** is the second theme: maintainer attention is visibly being rationed through a decision tracker (#8692), and the RFC system itself is being redesigned (#10549, #10366). The community is signaling that the meta-process costs are now comparable to the code costs.
- **Channel correctness** (Telegram batching, Nextcloud Talk bot API) is a recurring class — third-party integrations keep needing bespoke fixes rather than fitting a shared abstraction.

## 5. Bugs & Stability

Ranked by severity × in-progress status:

| Priority | Issue | Title | Status | Fix PR? |
|----------|-------|-------|--------|---------|
| **S0** | [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) | delegate bypasses parent's tool allowlist | accepted, no-stale | None visible |
| **S1** | [#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559) | Web dashboard agent stops on chat-window exit | in-progress | [#9002](https://github.com/zeroclaw-labs/zeroclaw/pull/9002) covers the related #8794 |
| **S1** | [#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794) | Stopping agent mid-work erases tool calls/thinking from context | accepted | Linked to #9002 |
| **S1** | [#8800](https://github.com/zeroclaw-labs/zeroclaw/issues/8800) | Windows: killed zeroclaw leaves port bound (zombie LISTENING) | accepted | None yet |
| **S1** | [#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642) | MCP tool-schema cloning drives unbounded RSS in agent loop | accepted, no-stale | None visible (split from #5542) |
| **S2** | [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) | 74 Windows test failures (Unix-only commands) | in-progress | Linked to #7461 (CI matrix) |
| **S2** | [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) | process_line stack overflow on Windows thread | in-progress | None yet |
| **S2** | [#10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753) | session/new overflows 2 MB stack on Windows | open | None yet |
| **S2** | [#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) | `service logs` prints nothing on macOS/Windows/OpenRC | in-progress | None yet |
| **S2** | [#10532](https://github.com/zeroclaw-labs/zeroclaw/issues/10532) | degraded-config remediation wrong binary *(closed)* | closed | Yes |
| **S3** | [#6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) | Nextcloud Talk wrong bot API | blocked | None visible |
| **S3** | [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) | Telegram media groups *(closed)* | closed | #8955 |

**Pattern:** Four of the seven highest-severity open bugs are Windows-specific. The `process_line` / `session/new` stack overflow appears in three correlated issues (#10753, #10734, plus the #7462 CI job), suggesting a single root cause around Rust's 2 MB default thread stack on Windows. The two security bugs at S0 (#8279) and S1 (#8642) lack visible in-flight PRs.

## 6. Feature Requests & Roadmap Signals

**In-flight enhancements with PRs:**
- [#9002](https://github.com/zeroclaw-labs/zeroclaw/pull/9002) — *Gateway: keep agent turns alive after viewer disconnect* — would close both #8559 and #8794 if it lands cleanly.
- [#9143](https://github.com/zeroclaw-labs/zeroclaw/pull/9143) — *Channels: route plugin events through shared runtime* — a foundation PR in a stacked series (#9138, #9139, #9142, #9143) reshaping the plugin/channel architecture.
- [#9833](https://github.com/zeroclaw-labs/zeroclaw/pull/9833) — *New `web_research` delegate tool* with bounded sub-agent loop (8 calls / 180 s).
- [#9829](https://github.com/zeroclaw-labs/zeroclaw/pull/9829) — *web_fetch spills large responses to workspace files (>50 KB) instead of truncating*.
- [#9828](https://github.com/zeroclaw-labs/zeroclaw/pull/9828) — *Agent-facing config authoring with operator-approved policy previews* — large architectural change.
- [#9341](https://github.com/zeroclaw-labs/zeroclaw/pull/9341) — *ZeroCode Code pane: surface session-history vs persistent-memory isolation*.
- [#9283](https://github.com/zeroclaw-labs/zeroclaw/pull/9283) — *Decompress gzip/brotli/deflate web_fetch responses*.
- [#9229](https://github.com/zeroclaw-labs/zeroclaw/pull/9229) — *State-aware Ctrl+C in interactive REPL* (blocked).
- [#10771](https://github.com/zeroclaw-labs/zeroclaw/pull/10771) — *Share one config snapshot across tool-registry build* (perf XS).
- [#10775](https://github.com/zeroclaw-labs/zeroclaw/pull/10775) — *Preserve live sessions when mode replacement fails*.

**Tracking issues pointing at next-version scope:**
- [#9967](https://github.com/zeroclaw-labs/zeroclaw/issues/9967) — Harness evaluation framework (epic tracker).
- [#7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108) — Rust CI cache/critical-path work to drop PR CI from ~15-20 min.

**Predictions for the next release window:**
1. A Windows/macOS CI matrix rollout (#7461, #10734, #10753) — these are the visible blockers on the platform track.
2. The gateway viewer/turn separation (#9002) — addresses two S1 bugs simultaneously and the PR is XL but has distinguished-contributor traction.
3. Plugin-event routing foundation (#9138/#9139/#9142/#9143 stack) — gated on review but the architecture is converging.

## 7. User Feedback Summary

**Real pain points surfaced today:**

- **Windows users hit a wall** (#7462, #8800, #10753, #10734). The dominant complaint: tests pass on Linux, ship to Windows, the daemon can't bind its port or stack-overflows during normal RPC. One user explicitly contrasts green tests on 2026-09-07 with crashes on 2026-09-10 — fast-moving instability.
- **Agent control is brittle** (#8559, #8794). Users report that closing the dashboard tab or stopping the agent mid-thought silently discards context, forcing them to re-explain work. This is described as a workflow blocker, not a polish item.
- **Delegate security gap** (#8279). A power user discovered that `delegate` injects the *unfiltered* parent tool set, so a sub-agent can call tools the parent policy explicitly excluded — an S0 data-loss/security finding with broad architectural implications.
- **Memory growth in MCP** (#8642). Practitioners running long sessions on WSL2 report OOM; the root cause is cloned tool schemas per agent-loop iteration.
- **Configuration drift** (#10532, #7899). Users want `zeroclaw` to honor the env vars and the actual binary they invoked, not whichever one happens to win the PATH race.

**Satisfaction signals:** The two closed items today (Telegram batching, degraded-config fix) had clear, focused reports and clear resolutions — the maintainer workflow is working when issues are scoped. The Telegram PR took ~2 months from issue #5514 to close, which is on the slower side for a bug of this scope.

## 8. Backlog Watch

Items that are high-priority or high-risk but have gone multiple days without a clear resolution:

- [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) — **S0** security: delegate bypasses parent's tool allowlist. Opened 2026-06-24. No visible PR; the affected path is `crates/zeroclaw-runtime/src/tools/mod...`. Needs a maintainer-level review.
- [#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642) — **P1** memory growth via MCP tool-schema cloning. Opened 2026-07-03. Split from #5542 but still unfixed.
- [#6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) — **P2, status:blocked** Nextcloud Talk wrong bot API. Opened 2026-04-27. Blocked for ~4.5 months with no recent movement.
- [#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) — **P1** wasmtime-wasi CVE remediation + audit.toml/deny.toml drift. Opened 2026-06-30. Still tracking residual CVEs.
- [#9229](https://github.com/zeroclaw-labs/zeroclaw/pull/9229) — **distinguished contributor, status:blocked** PR for state-aware Ctrl+C. Stalled despite active iteration.
- [#10754](https://github.com/zeroclaw-labs/zeroclaw/issues/10754), [#10755](https://github.com/zeroclaw-labs/zeroclaw/issues/10755), [#10756](https://github.com/zeroclaw-labs/zeroclaw/issues/10756), [#10758](https://github.com/zeroclaw-labs/zeroclaw/issues/10758), [#10759](https://github.com/zeroclaw-labs/zeroclaw/issues/10759), [#10764](https://github.com/zeroclaw-labs/zeroclaw/issues/10764), [#10769](https://github.com/zeroclaw-labs/zeroclaw/issues/10769) — a cluster of seven **needs-maintainer-review** items opened by IftekharUddin on 2026-09-10/11 covering memory provenance, shell-marker preservation, cron delivery, docs freshness, and plugin payload hardening. None have maintainer responses yet; collectively they represent a substantial review load landing on a single maintainer (Audacity88).
- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — the maintainer decision queue itself is the single best signal of where attention is needed; tracking it is the cleanest way to see what's stuck.

**Overall project health signal:** Strong — the team is shipping, closing bugs, and deliberately re-engineering both code (plugin stack, web_fetch, delegate safety) and process (RFC #10549, #10366, decision tracker #8692). The risk to watch is reviewer concentration: a large share of recent critical fixes are gated on one or two maintainers, and the seven needs-maintainer-review items above will compete for the same reviewer slots.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*