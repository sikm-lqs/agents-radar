# OpenClaw Ecosystem Digest 2026-09-12

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-12 11:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-12

## 1. Today's Overview

OpenClaw shows **high-velocity triage activity** with 500 issues and 500 PRs touched in the last 24 hours, split nearly evenly between open (267 issues / 290 PRs) and closed (233 issues / 210 PRs). Despite no new releases, the project is in an **active hotfix window** around the 2026.9.x line: a cluster of P0 regression and migration-blocker issues (notably #142585, #144742, #145192, #142770) has driven most of today's traffic, accompanied by a surge of small-to-medium targeted PRs addressing update budgets, model catalog refresh, and Doctor recovery flows. Overall health reads as **stable but strained**: maintainers are moving quickly to close upgrade-path defects, but several "release blocker" issues remain open and the absence of a tagged release signals caution against shipping until those are resolved.

## 2. Releases

**No new releases in the last 24 hours.** The most recent published versions referenced in the issue stream are `2026.9.3 (1391f7c)` and `2026.9.4 (15285e57a4f)`, but several P0 blockers indicate `2026.9.4` shipped incomplete (see #144742 — missing the fix from #144208). A `2026.9.5` (or hotfix) is likely pending maintainer review before publishing.

## 3. Project Progress

Closed/merged PRs and the issues they advance:

- **#145810** (closed) — *fix(logging): preserve pinned redaction and public URL boundaries*. Restores form-body and Digest credential protection lost after #145553; rated 🦞 diamond lobster, P1. Important security/privacy regression fix.
- **#145872** (closed) — *fix(config): report unavailable runtime values as unset*. Repairs `openclaw config get` returning `null`/exit 0 for unset keys (cosmetic correctness).
- **#145809** (closed) — *fix: canceled steering messages still reach active runs*. Closes #145727 — fixes `chat.send` in steer mode delivering input after `chat.abort`.
- **#145807** (closed) — *fix(openai): correct spoken-update guidance for public GPT-Live*. Aligns Live voice backend updates with public API speech markers.
- **#145349** (closed) — *fix(update): preserve matching artifact no-op*. Stops unnecessary rebuild when installed semver matches selection (🦞 diamond lobster, P2).
- **#145427** (closed) — *fix(macos): keep debug actions on the selected Gateway route*. Prevents stale work interrupting newer Gateway route during Mac SSH debug reset.
- **#145783** (closed) — *fix(cron): report failed runs when scheduled accounts are unavailable*. References #145689 — surfaces silent cron failures.
- **#140620** (closed) — Upgrade-session-reconciliation stall (P0, 🦪 silver shellfish) closed without a fix PR linked — resolution path not visible in the data.
- **#145266** (closed) — Git/dev Doctor Codex refresh shadows rebuilt bundled plugin; closed (P1, 🐚 platinum hermit).
- **#144712** (closed) — `npm update` global-install-swap failure; rollback reports "recovery unverified" (P0, 🦞 diamond lobster).

## 4. Community Hot Topics

Most-commented items cluster around **upgrade pain and migration tooling**:

1. **#142585** — *[Regression] 2026.9.3 Doctor refuses valid legacy workspace setup and attestation import* — 17 comments. P0, 🦐 gold shrimp, `impact:ux-release-blocker`. [openclaw/openclaw#142585](https://github.com/openclaw/openclaw/issues/142585)
2. **#97616** — *OpenClaw leaks unreaped hook/tool child processes (zombie accumulation)* — 15 comments. P1, 🦪 silver shellfish. [openclaw/openclaw#97616](https://github.com/openclaw/openclaw/issues/97616)
3. **#96834** — *WhatsApp 1:1 inbound image wedges main lane ~3min* — 15 comments. P1, 🦪 silver shellfish. [openclaw/openclaw#96834](https://github.com/openclaw/openclaw/issues/96834)
4. **#140620** — *In-place upgrade 2026.7.1-2 → 2026.9.2: session-transcript reconciliation stalls* — 12 comments. [openclaw/openclaw#140620](https://github.com/openclaw/openclaw/issues/140620)
5. **#144712** — *`npm update` fails at "global install swap"; rollback reports "recovery unverified"* — 12 comments. [openclaw/openclaw#144712](https://github.com/openclaw/openclaw/issues/144712)
6. **#127148** — *Codex `sessions.compact` acquires a second app-server, hits active-writer conflict* — 12 comments. 🦞 diamond lobster. [openclaw/openclaw#127148](https://github.com/openclaw/openclaw/issues/127148)
7. **#141252** — *2026.9.2 regression: "Reply operation has no active tool authority snapshot"* — 11 comments. [openclaw/openclaw#141252](https://github.com/openclaw/openclaw/issues/141252)
8. **#139847** — *Message sent while reply run is active is dropped* (companion to #141252) — 10 comments. [openclaw/openclaw#139847](https://github.com/openclaw/openclaw/issues/139847)
9. **#96007** — *Discord: subsequent message content truncated after inline error text* — 10 comments. [openclaw/openclaw#96007](https://github.com/openclaw/openclaw/issues/96007)
10. **#136203** — *Windows de-DE 2026.8.2 upgrade leaves Doctor maintenance blocked* — 10 comments. [openclaw/openclaw#136203](https://github.com/openclaw/openclaw/issues/136203)

**Underlying need:** Users are asking for **trustworthy, non-destructive upgrades**. The recurring complaint pattern is "upgrade partially succeeds, then Doctor blocks recovery, then rollback claims success but reports unverified state." This indicates the upgrade/Doctor toolchain needs a clearer contract for partial success.

## 5. Bugs & Stability

Ranked by severity (P0 release blockers first):

### P0 — Release blockers (most without a published fix)
| Issue | Title | Rating | Fix PR? |
|---|---|---|---|
| [#142585](https://github.com/openclaw/openclaw/issues/142585) | Doctor refuses valid legacy workspace + attestation import (2026.9.3) | 🦐 gold shrimp | ❌ `clawsweeper:needs-info` |
| [#144742](https://github.com/openclaw/openclaw/issues/144742) | 2026.9.4 ships without #144208 — v1 handoff lease blocks every config write | 🦪 silver shellfish | ❌ referenced but not yet merged |
| [#145192](https://github.com/openclaw/openclaw/issues/145192) | 2026.9.2 → 2026.9.4 managed update fails at candidate-Doctor on live v1 handoff lease | 🦪 silver shellfish | ❌ |
| [#142770](https://github.com/openclaw/openclaw/issues/142770) | 2026.9.3 failed update leaves forward-migrated Workshop state on 9.2 rollback | 🦞 diamond lobster | ❌ |
| [#136203](https://github.com/openclaw/openclaw/issues/136203) | Windows de-DE 2026.8.2 upgrade leaves Doctor blocked | 🦞 diamond lobster | ❌ |
| [#112475](https://github.com/openclaw/openclaw/issues/112475) | Device pairing recovery fails after removal (Gateway 7.1 / CLI 6.9) | 🦪 silver shellfish | ❌ |
| [#125333](https://github.com/openclaw/openclaw/issues/125333) | `totalTokens` inflation on 2026.8.1-beta.2 — #123065 fix incomplete | 🦞 diamond lobster | ⚠️ `linked-pr-open` |
| [#123326](https://github.com/openclaw/openclaw/issues/123326) | Explicit multi-agent Codex migration crash-loops Gateway startup | 🦞 diamond lobster | ❌ |

### P1 — High severity
- [#141252](https://github.com/openclaw/openclaw/issues/141252) and [#139847](https://github.com/openclaw/openclaw/issues/139847) — "Reply operation has no active tool authority snapshot" regression (🦞 diamond lobster) — **no fix PR**.
- [#142476](https://github.com/openclaw/openclaw/issues/142476) — Cron session reaper blocks event loop 14–76s on a 632-agent Gateway (🦞 diamond lobster).
- [#144911](https://github.com/openclaw/openclaw/issues/144911) — MCP server init timeout crashes Gateway with unhandled rejection in child cleanup (🦞 diamond lobster).
- [#138139](https://github.com/openclaw/openclaw/issues/138139) — `providerConfigMatchesRuntimeSnapshot` recursive hashing causes event-loop starvation with large model catalogs (🦞 diamond lobster).
- [#127148](https://github.com/openclaw/openclaw/issues/127148) — Codex `sessions.compact` acquires second app-server, active-writer conflict (🦞 diamond lobster).
- [#126246](https://github.com/openclaw/openclaw/issues/126246) — Telegram durable outbound stuck in `send_attempt_started`, lost on restart (🦞 diamond lobster).
- [#140455](https://github.com/openclaw/openclaw/issues/140455) — google-meet 2026.9.2: circular-JSON in-call crash + audio routing (🦞 diamond lobster).
- [#94716](https://github.com/openclaw/openclaw/issues/94716) — `claude-cli` provider sends stale user-agent, OAuth bearer auth fails (🦞 diamond lobster, `linked-pr-open`).
- [#137377](https://github.com/openclaw/openclaw/issues/137377) — Windows Doctor `--fix` final restart fails (closed; likely worked around).

### Crash loops & data integrity
- [#140908](https://github.com/openclaw/openclaw/issues/140908) — Doctor `--fix`/`gateway status --deep` fails with EACCES under systemd `--user` service account — closed (🐚 platinum hermit).
- [#72948](https://github.com/openclaw/openclaw/issues/72948) — `gateway stop` doesn't kill foreground-launched gateway — closed.
- [#123326](https://github.com/openclaw/openclaw/issues/123326) and [#142770](https://github.com/openclaw/openclaw/issues/142770) remain **unfixed** and P0.

**Assessment:** A non-trivial fraction of today's P0/P1 backlog is **fix-shape-clear** (clear root cause) but **no fix PR is open**. Maintainer attention is the bottleneck, not diagnosis.

## 6. Feature Requests & Roadmap Signals

- **#9016** — *Expose OpenRouter usage cost to agent runtime* (8 👍; closed without merge). Strong signal that operators want per-message cost attribution visible to the agent itself; likely re-filed.
- **#77798** — *Collaborative Markdown Editor via Canvas embed* (2 👍; closed). UX feature; off-meta tidepool but trending.
- **#126876** — *Accessibility audit: 13 screen reader barriers* (closed, needs maintainer review). A first blind user filed concrete setup blockers — likely to inform a near-term accessibility pass.
- **#131457** — *Feishu progress streaming mode* (P3). Aligns Feishu with Slack/Discord/Telegram streaming; low effort, likely next minor.
- **#59109** — *Session fork, resume, continue* (parity with open-agent-sdk). A meta-capability request that has been open since April.
- **#8724** — *Per-model generation timeout config*. Mitigates Gemini Flash infinite-thinking loops; recurring P3 ask, likely to ship alongside a model-catalog refresh.
- **#8285** — *Auto-send intent/acknowledgment text before agent processing*. Latency UX win; long-standing tidepool ask.
- **#7476** — *WhatsApp sticker send support*. Channel parity; minor but visible.
- **#145562** — *available_skills missing from native Gemini `systemInstruction` despite report claiming included*. This is technically a bug but reads as a "feature gap" between Gemini native and Anthropic-native agent plumbing.

**Prediction for the next release:** The next tag will prioritize **upgrade-path integrity** (#144208 fix, Doctor recovery, npm-swap reliability) before any new features. Once shipped, the most likely next-minor additions are Feishu progress streaming (#131457), per-model timeouts (#8724), and possibly the first leg of the Gemini skills parity (#145562).

## 7. User Feedback Summary

**Pain points (recurring):**
- **"Upgrade ate my state."** Multiple users report partial migration of transcript tables, Codex threads, Workshop state, and handoff leases, with rollback claiming success but leaving forward-migrated artifacts (#142770, #140620, #145192, #142585, #136203).
- **"Doctor says fix, then fails on its own fix."** #145503 (skill_workshop not registered after Workshop migration; Doctor recommends an `alsoAllow` fix its resolver rejects). #137377 (Windows final restart).
- **"Silent message loss."** #139847/#141252 (replies dropped while busy), #126246 (Telegram stuck in `send_attempt_started`), #59618 (auto-compaction silently abandons task execution).
- **"Multi-agent Gateway is fragile."** #123326 (migration crash-loops), #142476 (event-loop blocked by cron reaper PRAGMA on 632-agent config).
- **"Channel parity gaps."** Discord truncates after inline errors (#96007); WhatsApp wedge on inbound images (#96834); Telegram 409 cascade on IPv6→IPv4 fallback (#89954); Feishu missing progress mode.
- **"Doctor is hostile to system services."** #140908 (`EACCES` under `sudo -u` systemd `--user`); #72948 (`gateway stop` doesn't kill foreground process).

**Satisfaction signals:**
- Several recent fixes are landing in close-to-issue cycles (e.g., #145727 → #145809, #145689 → #145783), suggesting responsive triage.
- The Discord inline-error truncation (#96007), the Feishu card footer parsing (#59360), and the macOS debug-route issue (#145427) are all closed with reported satisfaction.
- Long-form positive signals come from operator-facing PRs (#141276 Prometheus provider usage windows, #140897 disk-pressure cleanup) — these reflect an active operator ecosystem building on top.

**Tone:** Frustration is concentrated around **2026.9.x upgrade paths**; otherwise the community appears constructive, with maintainers actively shepherding fixes and external contributors providing high-quality reproductions.

## 8. Backlog Watch

Issues and PRs that have lingered without maintainer action despite high importance:

| Item | Age (approx.) | Why it needs attention |
|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | ~2.5 months | Zombie-process leak; P1, 🦪 silver shellfish; affects every long-running install. No fix PR linked. |
| [#59662](https://github.com/openclaw/openclaw/issues/59662) | ~5 months | Anthropic Max usage alerts leak into channels as assistant messages; closed stale, but the underlying model-stream filtering question is unresolved. |
| [#59618](https://github.com/openclaw/openclaw/issues/59618) | ~5 months | Auto-compaction silently abandons ongoing turn execution; closed stale. |
| [#89954](https://github.com/openclaw/openclaw/issues/89954) | ~3 months | Telegram 409 cascade on IPv6 fallback; closed stale, no documented mitigation. |
| [#114158](https://github.com/openclaw/openclaw/issues/114158) | ~2 months | `fs-safe` hardcoded `0o600` ignores umask, breaks NFS/SMB shared workspaces (🦐 gold shrimp, security-tagged). No PR. |
| [#77798](https://github.com/openclaw/openclaw/issues/77798) | ~4 months | Collaborative Markdown editor (Canvas embed); 2 👍, closed stale despite clear product value. |
| [#59109](https://github.com/openclaw/openclaw/issues/59109) | ~5 months | Session fork/resume/continue parity with `open-agent-sdk`; closed stale. |
| [#9016](https://github.com/openclaw/openclaw/issues/9016) | ~7 months | OpenRouter cost attribution; closed stale despite 8 👍. |
| [#125333](https://github.com/openclaw/openclaw/issues/125333) | ~1 month | `totalTokens` ratchet via memory-flush transcript path; P0, 🦞 diamond lobster, PR linked but unmerged. |
| [#94716](https://github.com/openclaw/openclaw/issues/94716) | ~3 months | `claude-cli` stale user-agent OAuth failure; PR linked but unmerged. |
| [#126876](https://github.com/openclaw/openclaw/issues/126876) | ~3 weeks | Accessibility audit from blind user; closed but `needs-maintainer-review` — risk of being lost without a triage owner. |
|

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem
**Date: 2026-09-12 | Projects: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw**

---

## 1. Ecosystem Overview

The personal AI assistant/agent open-source space is consolidating around a shared architecture — desktop or TUI frontends, a gateway/runtime layer, multi-provider LLM routing, and messaging-channel adapters — but projects sit at sharply different maturity points. Today's data shows a common battleground: **post-release regression management** (OpenClaw 2026.9.x, QwenPaw 2.2.x, ZeroClaw v0.8.5, Hermes v0.21.x all dealing with upgrade-induced defects), with silent failures and state loss as the dominant trust-eroders. Recurring user demands — multi-model cost routing, non-destructive upgrades, first-class Windows support, and "loud" failure modes — cut across every active project. One entrant (IronClaw) shows near-zero engagement, suggesting either an internal development model or waning community traction.

---

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Closure Rate (Issues) | Release Status | Health Score |
|---|---|---|---|---|---|
| **OpenClaw** | 500 (267 open / 233 closed) | 500 (290 open / 210 closed) | ~47% | No release; 2026.9.3/9.4 live, hotfix pending | **Strained-Stable** — high throughput, but 8 open P0 blockers without fix PRs |
| **Hermes Agent** | 50 (50 open / 0 closed) | 50 (46 open / 4 merged) | 0% | v0.21.2 shipped 2026-09-11 | **Stressed** — fresh P1 plugin-SDK regression (5 duplicate reports), zero top-severity fixes in flight |
| **IronClaw** | 0 | 1 closed (not merged) | n/a | None | **Dormant** — 24h window too small to judge, but zero signal |
| **QwenPaw** | 20 (16 open / 4 closed) | 9 (8 open / 1 merged) | 20% | No release; v2.2.1 verification passed | **Amber-Green** — elevated 2.2.x regressions, but clean issue→PR traceability |
| **ZeroClaw** | 33 (26 open / 7 closed) | 50 (49 open / 1 merged) | 21% | No release; v0.8.5 latest | **Strained** — backlog growing (26 open vs 7 closed); S0 data-loss bug; RFC queue bottleneck |

**Key reading:** Activity volume ≠ health. OpenClaw moves 10–20× the traffic of any peer and closes ~47% of touched issues daily, while Hermes touched 50 issues and closed none — a churn signal. QwenPaw's smaller volume carries the best fix-traceability ratio (every closed ticket has an open PR counterpart).

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Triage throughput:** 210 PR closures in 24h vs. 4 (Hermes), 1 (QwenPaw), 1 (ZeroClaw). Close issue→fix cycles are measured in days (#145727→#145809, #145689→#145783).
- **Operator-grade surface:** Only project with a dedicated self-repair subsystem (Doctor), managed update/rollback machinery (handoff leases, attestation import, install-swap budgets), and fleet-scale telemetry (Prometheus usage windows, 632-agent Gateway configs in the wild).
- **Process maturity:** Structured P0–P3 severity + impact-rating taxonomy; no peer has equivalent triage discipline.
- **Channel breadth:** Discord, WhatsApp, Telegram, Feishu, Google Meet voice — the widest messaging matrix in the cohort.

**Technical approach differences:** OpenClaw is uniquely a **multi-agent, self-healing orchestration platform** (Gateway + Doctor + managed migrations), while peers are single-user-first: Hermes is desktop/plugin-centric, QwenPaw is cost-aware orchestration, ZeroClaw is a Rust-native runtime with TUI/ACP emphasis. This complexity is double-edged — OpenClaw's dominant pain (upgrade-path P0s like #142585, #145192, #142770) is self-inflicted surface no peer has.

**Community size:** Cumulative tracker volume (issues+PRs, shared numbering) — OpenClaw ~145k items, Hermes ~109k, ZeroClaw ~11k, QwenPaw ~7.7k, IronClaw ~8k. OpenClaw and Hermes are an order of magnitude ahead; OpenClaw leads on multi-participant threads (17-comment P0 discussions) and an external operator/ contributor ecosystem building telemetry on top.

---

## 4. Shared Technical Focus Areas

| Requirement | Projects | Specific needs |
|---|---|---|
| **Non-destructive upgrades** | OpenClaw (dominant), QwenPaw, ZeroClaw | OpenClaw: rollback leaves forward-migrated state (#142770, #145192). QwenPaw: 2.2.x upgrade silently broke MCP (#7716). ZeroClaw: v0.8.5 removed documented `context_compression` keys (#10780/#10781). |
| **"Loud failures" / observability** | All 4 active projects | QwenPaw: Daily Paper silent fail (#7715), `subagent_model` dropped silently (#7676). Hermes: Yuanbao false success (#107227). OpenClaw: silent message loss (#139847). ZeroClaw: silent memory-store data loss (#10797). |
| **Multi-model cost routing** | QwenPaw (dominant), OpenClaw, ZeroClaw | QwenPaw: 3 independent threads want cheap models for subagents/memory (#4901, #7664, #7717). OpenClaw: agent-visible cost attribution (#9016). ZeroClaw: unrecorded classifier usage breaks cost dashboards (#10782). |
| **Windows as first-class** | OpenClaw, Hermes, ZeroClaw | ZeroClaw: 4 stack-overflow/CI issues in one day (#10753, #10793, #10794, #10734). Hermes: `.cmd` subprocess hang, missing Bots tab. OpenClaw: de-DE upgrade blocks Doctor (#136203). |
| **Session/state persistence** | All 4 active | QwenPaw: models/sessions vanish (#7708, #7724). ZeroClaw: failed turn discards accepted history (#10788). Hermes: `state.db` lock loss. OpenClaw: transcript reconciliation stalls (#140620). |
| **Memory as a distinct subsystem** | ZeroClaw, QwenPaw, OpenClaw | QwenPaw: separate `memory_model` (PR #7719). ZeroClaw: MarkdownMemory race (S0) + token accounting on trims. OpenClaw: compaction abandoning tasks (#59618). |
| **Channel parity** | All 4 active | Telegram appears in all four; album/media-group splitting (ZeroClaw #10776), rich formatting (QwenPaw #7713), inbound-image wedges (OpenClaw #96834). |
| **Stop/cancel semantics** | QwenPaw, OpenClaw, ZeroClaw | QwenPaw: "Stop button lies" (#7567). OpenClaw: canceled steering still reaches runs (#145727). ZeroClaw: notification lag cancels live turns (#10785). |

---

## 5. Differentiation Analysis

| Project | Feature Focus | Target User | Architecture Signature |
|---|---|---|---|
| **OpenClaw** | Multi-agent Gateway, Doctor self-repair, managed updates, channel fleet | Self-hosters / operators at fleet scale | Node/npm; upgrade machinery, handoff leases, cron reapers, Prometheus |
| **Hermes Agent** | Desktop UX, plugin SDK, kanban orchestrator, Matrix platform | Desktop end-users + plugin authors | Vite/Rolldown desktop bundle; multi-profile gateway; provider plugins |
| **IronClaw** | Slack channel-state modeling, OpenAI-compatible API | (Unclear — enterprise/Slack-centric) | Adapter + API surface; low public signal |
| **QwenPaw** | Cost-aware orchestration, subagents, memory (ReMeLight), scheduled tasks | Cost-sensitive power users, Telegram-first | Desktop + agent runtime; per-task model routing (emerging) |
| **ZeroClaw** | ZeroCode TUI, ACP sessions, OIDC auth, context compaction | Terminal-native developers, Anthropic-extended-context users | **Rust** (only one in cohort); stacked-PR engineering; egress-grant security model |

The sharpest architectural divide: OpenClaw/Hermes/QwenPaw optimize the **assistant experience** (channels, personas, state), while ZeroClaw optimizes the **runtime substrate** (stack safety, auth ceremony, streaming lifetimes). IronClaw's only visible contribution (unmerged PR #8076 — distinguishing disconnected shared Slack channels) hints at channel-state modeling none of the others prioritize.

---

## 6. Community Momentum & Maturity

- **Tier 1 — Hyperactive:** **OpenClaw**. Unmatched volume and closure rate; but the open-P0-without-fix-PR backlog shows maintainer bandwidth, not diagnosis, is the bottleneck.
- **Tier 2 — Active:** **ZeroClaw** (rapidly iterating: OIDC stack of 8 PRs, 49 open PRs, strong stewardship signals) and **Hermes** (reactive mode: patch release + same-day P1 regression cluster it hasn't answered; plugin-author trust visibly eroding).
- **Tier 3 — Steady, healthy:** **QwenPaw** — 5 of 9 PRs from first-time contributors, same-day issue→PR response; the best contributor funnel in the cohort.
- **Tier 4 — Dormant:** **IronClaw** — one unmerged PR is the entire day; needs a 7-day window to confirm, but currently no community heartbeat.

**Stabilizing:** OpenClaw (hotfix window before next tag), Hermes (v0.21.2→v0.21.3 stabilization). **Rapidly iterating:** ZeroClaw, QwenPaw. **At-risk:** Hermes (duplicate P1 cluster + zero 👍 on top-30 issues), IronClaw (engagement collapse).

---

## 7. Trend Signals

1. **Upgrades are the #1 churn moment.** The strongest cross-project signal: users forgive bugs but not state-eating migrations and "unverified" rollbacks (OpenClaw's entire P0 board). Treat upgrades as transactions — atomic, verifiable, with symmetric rollback.
2. **Silent fallbacks destroy trust faster than errors.** Four of five projects have users explicitly demanding visible failure over graceful degradation. Loud failure modes are now table stakes.
3. **Cost attribution is becoming a product surface, not a setting.** Per-model routing, subagent/task-level model selection, and agent-visible usage data (QwenPaw's dominant theme, OpenClaw #9016, ZeroClaw #10782) — the cohort is converging on token economics as a first-class capability.
4. **Windows support is a credibility gate.** Three of four active projects show disproportionate Windows pain; teams that fix this will convert an underserved, vocal cohort.
5. **Memory is splitting out as an independent subsystem** — with its own model, serialization contract, and failure semantics (three projects, three memory bugs in one day).
6. **Security posture is moving from reactive to architectural** — ZeroClaw's egress grants and allowed-roots, QwenPaw's sandbox-bypass reports, Hermes' 12-HIGH advisory debt — with dependency hygiene now publicly criticized by users.
7. **Messaging channels remain the primary human interface** (Telegram spans all four active projects), and real-time control expectations are rising — users now assume stop/cancel actually stops.

**For agent developers:** the highest-leverage investments emerging from this cohort are transactional upgrade paths, loud-failure instrumentation, pluggable per-task model routing with honest cost accounting, serialized memory backends, and a Windows CI lane from day one.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-12

## 1. Today's Overview

Hermes Agent shows **elevated activity with a stabilization focus**: 50 issues and 50 PRs were updated in the last 24 hours, all 50 issues remain open (0 closed), and 4 of 50 PRs were merged/closed. The project shipped a patch release (v0.21.2) yesterday to address `state.db` fragility introduced by the v0.21.0 session-store rewrite, but that release appears to coincide with a **new critical regression** in the desktop plugin SDK affecting every runtime/disk-loaded plugin. Maintainers are clearly in reactive mode, triaging multiple duplicate P1 reports rather than pushing feature work.

## 2. Releases

**v2026.9.11 — Hermes Agent v0.21.2 (state.db Patch Release)** — Released 2026-09-11

- **Type:** Patch
- **Scope:** `state.db` connection-handling fragility inherited from the v0.21.0 session-store rewrite. The earlier release caused second writers to cancel each other's locks, producing lock loss and stuck state.
- **Migration notes:** No breaking schema changes. Operators on v0.21.0 / v0.21.1 should upgrade.
- **Caveat:** The patch does **not** address a separate P1 regression that surfaced the same day ([#107288](https://github.com/NousResearch/hermes-agent/issues/107288), [#107312](https://github.com/NousResearch/hermes-agent/issues/107312), [#107352](https://github.com/NousResearch/hermes-agent/issues/107352), [#107336](https://github.com/NousResearch/hermes-agent/issues/107336), [#107291](https://github.com/NousResearch/hermes-agent/issues/107291)) — desktop runtime plugins failing with `TypeError: Cannot convert undefined or null to object` after the `#107212` "one Plugins surface" refactor. A v0.21.3 or v0.21.2.x hotfix is likely imminent.

## 3. Project Progress

**Merged/Closed PRs (4):** Activity was dominated by churn rather than closure — most open PRs are recent fixes, and several long-running ones (Matrix platform work) remain open from July/August.

Noteworthy PR movement:
- [PR #109027](https://github.com/NousResearch/hermes-agent/pull/109027) — `feat(kanban): first-class kanban_archive orchestrator tool` (new, 2026-09-12)
- [PR #109009](https://github.com/NousResearch/hermes-agent/pull/109009) — `feat(kanban): add tree command` (new, 2026-09-12, 15 tests passing)
- [PR #109028](https://github.com/NousResearch/hermes-agent/pull/109028) — `fix(gateway): resolve Docker media in routed profile` (new, 2026-09-12)
- [PR #109005](https://github.com/NousResearch/hermes-agent/pull/109005) — `fix(gateway): throttle restart drain notices` (new, 2026-09-12)
- [PR #108986](https://github.com/NousResearch/hermes-agent/pull/108986) — `feat(whatsapp_cloud): length-proportional human-pacing delay` (new, 2026-09-12)
- [PR #108948](https://github.com/NousResearch/hermes-agent/pull/108948) — `fix(whatsapp): spawn bridge process via asyncio.to_thread` (new, 2026-09-12)
- [PR #108899](https://github.com/NousResearch/hermes-agent/pull/108899) — `fix(state): retire a lost-generation handle unclosed when setconfig raises` (new, 2026-09-12, addresses #106840 review follow-up)

The narrative arc: a **cluster of v0.21.2 follow-up fixes** is converging on session-state, gateway restart semantics, and platform adapters, while kanban continues to mature as a first-class orchestrator surface.

## 4. Community Hot Topics

Ranked by comment volume on updated items:

1. **[#107288 (6 comments)](https://github.com/NousResearch/hermes-agent/issues/107288)** — *P1 Desktop plugin SDK module cycle.* The single highest-impact thread: every runtime (disk) plugin fails on desktop boot after PR #107212 refactor. Multiple reporters, including [mr-NFA (#107312)](https://github.com/NousResearch/hermes-agent/issues/107312), [CHEN-CR-JS (#107352)](https://github.com/NousResearch/hermes-agent/issues/107352), [Linyuxujun (#107336)](https://github.com/NousResearch/hermes-agent/issues/107336), and [Yzz2023 (#107291)](https://github.com/NousResearch/hermes-agent/issues/107291), have filed duplicates tagging it P1. **Underlying need:** robust plugin SDK packaging that survives Vite/Rolldown DCE — the bug is reportedly due to `installPluginSdk()` calls being tree-shaken out of the bundle.

2. **[#101535 (6 comments)](https://github.com/NousResearch/hermes-agent/issues/101535)** — *Bot Mode "Bots" tab missing on Windows Desktop v0.21.0.* Long-running since 2026-09-02, still unresolved. **Need:** reliable multi-profile UI on Windows installer builds.

3. **[#107356 (5 comments)](https://github.com/NousResearch/hermes-agent/issues/107356)** — *Security audit: 12/18 advisories HIGH severity, npm packages stale.* **Need:** an upstream dependency-refresh policy and possibly Dependabot/Renovate, especially for `@vitest/mocker` and related test-only packages that ship into runtime bundles.

4. **[#107238 (4 comments)](https://github.com/NousResearch/hermes-agent/issues/107238)** — *"Thinking: Off" UI toggle does not propagate to DeepSeek plugin.* **Need:** a single source of truth for reasoning/think flags between the desktop toggle and provider plugins (multiple providers will hit this same gap).

5. **[#107259 (3 comments)](https://github.com/NousResearch/hermes-agent/issues/107259)** — *`/v1/responses` streaming drops reasoning/thinking content.* **Need:** OpenAI Responses API parity for reasoning traces on the gateway.

6. **[#107232 (3 comments)](https://github.com/NousResearch/hermes-agent/issues/107232)** — *Windows subprocess hang in `_agent_browser_session_cmd` when invoking `.cmd` files.* **Need:** correct process-tree handling for Windows shell-script invocations.

7. **[#107149 (3 comments)](https://github.com/NousResearch/hermes-agent/issues/107149)** — *Killed git child leaves `<index>.lock` behind — checkpoints fail forever.* **Need:** checkpoint_manager.py must run git with cleanup traps and `O_EXCL` recovery.

## 5. Bugs & Stability

**Severity-ranked, with fix availability:**

| Severity | Issue | Title | Fix PR? |
|---|---|---|---|
| **P1** | [#107288](https://github.com/NousResearch/hermes-agent/issues/107288) | Desktop plugin SDK module cycle — all runtime plugins fail | None open (duplicates [#107312](https://github.com/NousResearch/hermes-agent/issues/107312), [#107336](https://github.com/NousResearch/hermes-agent/issues/107336), [#107352](https://github.com/NousResearch/hermes-agent/issues/107352), [#107291](https://github.com/NousResearch/hermes-agent/issues/107291)) |
| **P1** | [#107312](https://github.com/NousResearch/hermes-agent/issues/107312) | SDK `Object.keys(undefined)` + sidebar toggle stuck | None open |
| **P2** | [#101535](https://github.com/NousResearch/hermes-agent/issues/101535) | Bots tab missing in v0.21.0 Windows install | None |
| **P2** | [#107238](https://github.com/NousResearch/hermes-agent/issues/107238) | Thinking toggle not reaching DeepSeek | None |
| **P2** | [#107232](https://github.com/NousResearch/hermes-agent/issues/107232) | Windows `.cmd` subprocess hang | None |
| **P2** | [#107149](https://github.com/NousResearch/hermes-agent/issues/107149) | Stuck git index locks on killed child | None |
| **P2** | [#107343](https://github.com/NousResearch/hermes-agent/issues/107343) | disk-cleanup deletes user `scripts/` test_*/tmp_* | None |
| **P2** | [#107270](https://github.com/NousResearch/hermes-agent/issues/107270) | Memory tool false-positive "drift" against identical bytes | None |
| **P2** | [#107224](https://github.com/NousResearch/hermes-agent/issues/107224) | `respawn-argv` restart mechanism unimplemented | None |
| **P2** | [#107199](https://github.com/NousResearch/hermes-agent/issues/107199) | Bot Chat reverts to default profile on refresh | None |
| **P2** | [#100610](https://github.com/NousResearch/hermes-agent/issues/100610) | UI pip install broken (e.g. `ddgs`) inside podman quadlet | None |
| **P2** | [#107227](https://github.com/NousResearch/hermes-agent/issues/107227) | Yuanbao silently reports success on rejected long replies | None |
| **P2** | [#107391](https://github.com/NousResearch/hermes-agent/issues/107391) | Copilot models hidden — failed catalog fetch poisons 1h cache | None |
| **P3 / Security** | [#107356](https://github.com/NousResearch/hermes-agent/issues/107356) | 12 HIGH npm advisories outstanding | None |
| **P3 / Security** | [#101351](https://github.com/NousResearch/hermes-agent/issues/101351) | Background-review can persist live credentials into working repo | None |

**Assessment:** This is a **worse-than-usual stability day**. The single most concerning pattern is the four-way duplicate P1 around the desktop plugin SDK regression — it indicates the v0.21.0 refactor was merged without sufficient regression coverage for third-party plugin authors. None of the top-severity bugs have a corresponding open PR yet, which suggests the team is still diagnosing rather than fixing.

## 6. Feature Requests & Roadmap Signals

Concrete feature work in flight:

- **[PR #109027](https://github.com/NousResearch/hermes-agent/pull/109027)** — `kanban_archive` orchestrator tool — likely lands next.
- **[PR #109009](https://github.com/NousResearch/hermes-agent/pull/109009)** — `hermes kanban tree` (ASCII/Mermaid) — read-only, 15 tests passing, low-risk.
- **[PR #108986](https://github.com/NousResearch/hermes-agent/pull/108986)** — WhatsApp Cloud human-pacing delays — opt-in, addresses UX complaint about bot-like immediacy.
- **[#107354](https://github.com/NousResearch/hermes-agent/issues/107354)** — TUI/CLI status-bar field showing active pooled credential label (auth observability).
- **[#107233](https://github.com/NousResearch/hermes-agent/issues/107233)** — Enforce `image_generation` tool spec on the Codex OAuth image route (one 👍 reaction so far).
- **Matrix platform family** (open since July): [PR #68199](https://github.com/NousResearch/hermes-agent/pull/68199) compact approval cards, [PR #99040](https://github.com/NousResearch/hermes-agent/pull/99040) coalesced turn pane, [PR #61511](https://github.com/NousResearch/hermes-agent/pull/61511) activity list pane, [PR #61218](https://github.com/NousResearch/hermes-agent/pull/61218) compact matrix tools, plus fixes [#61210](https://github.com/NousResearch/hermes-agent/pull/61210), [#61206](https://github.com/NousResearch/hermes-agent/pull/61206), [#61219](https://github.com/NousResearch/hermes-agent/pull/61219). The Matrix story is shaping up as a coherent v0.22 release surface.

**Prediction for next version (v0.21.3 hotfix or v0.22):**
- Hotfix: plugin SDK DCE bug (#107288 family) — must ship before v0.22.
- Likely in v0.22: kanban_archive + kanban tree (both new, low-risk, test-covered), WhatsApp Cloud pacing, several state.db follow-ups ([PR #108899](https://github.com/NousResearch/hermes-agent/pull/108899)).
- Possible: TUI status-bar account field, Matrix compact-cards set (if dependencies resolve).

## 7. User Feedback Summary

**Pain points (real, from issue text):**

- **Windows users feel second-class.** [#107232](https://github.com/NousResearch/hermes-agent/issues/107232) (browser `.cmd` hang), [#101535](https://github.com/NousResearch/hermes-agent/issues/101535) (missing Bots tab), [#107198](https://github.com/NousResearch/hermes-agent/issues/107198) (Chromium fork detection for Helium/Arc), [#101190](https://github.com/NousResearch/hermes-agent/issues/101190) (`target="_blank"` no-op in integrated browser) — Windows-specific rough edges are repeatedly reported and rarely fixed in the same window.
- **Profile/multi-tenant UX is brittle.** [#107199](https://github.com/NousResearch/hermes-agent/issues/107199) (profile reverts on refresh), [#107238](https://github.com/NousResearch/hermes-agent/issues/107238) (toggle doesn't propagate), [#97586](https://github.com/NousResearch/hermes-agent/issues/97586) (multiple gateways collide on default port), [#100610](https://github.com/NousResearch/hermes-agent/issues/100610) (podman quadlet pip install broken) — operators juggling profiles/containers/gateways hit constant friction.
- **Plugin author trust is eroding.** The five-issue duplicate cluster around the desktop SDK regression (all P1, all content-independent) is the kind of regression that makes external plugin authors lose confidence. Hermes ships "the desktop plugins are first-class," but a single refactor silently broke every user-authored plugin.
- **Provider parity gaps frustrate.** DeepSeek thinking toggle, OpenAI Responses reasoning-streaming, Copilot catalog staleness, Codex OAuth image spec — each provider has its own quirks, and the gateway's "honest about success" posture regressed on Yuanbao ([#107227](https://github.com/NousResearch/hermes-agent/issues/107227)) and SMS ([#107430](https://github.com/NousResearch/hermes-agent/issues/107430)), which are exactly the surfaces where silent failure damages customer trust.
- **Dependency hygiene is publicly criticized.** [#107356](https://github.com/NousResearch/hermes-agent/issues/107356) is bluntly titled "Keeps Stacking up" — community patience for unmaintained transitive deps is running thin.

**Satisfaction signal:** Low. There are zero 👍 reactions across all top-30 issues, suggesting even acknowledged pain points aren't being upvoted (perhaps because the report authors are the only participants). The one 👍-bearing item is [#107233](https://github.com/NousResearch/hermes-agent/issues/107233) (Codex image spec) — a feature request, not a bug.

## 8. Backlog Watch

Issues that are old, important, but stalled (low or no recent maintainer engagement):

- **[#100268](https://github.com/NousResearch/hermes-agent/issues/100268)** — `/proc/uptime` missing on host after v0.21.0 (3 comments, opened 2026-09-01). Breaks host-monitoring scripts; needs maintainer investigation of container/sandbox mount policy.
- **[#100610](https://github.com/NousResearch/hermes-agent/issues/100610)** — UI pip install broken in podman quadlet (2 comments, opened 2026-09-01). No fix PR.
- **[#101351](https://github.com/NousResearch/hermes-agent/issues/101351)** — Background-reviewer can persist live credentials into `.git/config` (1 comment, opened 2026-09-02, marked `needs-repro`). **Security-sensitive** — should not require a reproducer to begin a credential-redaction fix.
- **[#101190](https://github.com/NousResearch/hermes-agent/issues/101190)** — `target="_blank"` no-op in integrated browser (1 comment, opened 2026-09-02). Cheap fix, stale.
- **[#97586](https://github.com/NousResearch/hermes-agent/issues/97586)** — Multiple gateways collide on default port (1 comment, opened 2026-

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-12

## 1. Today's Overview

Activity in the IronClaw repository was minimal over the last 24 hours. No new issues were opened or closed, no new releases were published, and only one pull request saw activity — PR #8076, which was closed without merging. With zero open issues and zero merged PRs, the project appears to be in a low-activity maintenance phase rather than active feature development. The single closed PR suggests disciplined triage, though its non-merge outcome may signal disagreement on scope or approach.

- [github.com/nearai/ironclaw](https://github.com/nearai/ironclaw)

## 2. Releases

No new releases were published today. There is nothing to report.

## 3. Project Progress

No pull requests were merged in the last 24 hours. One PR was closed:

- **PR #8076** — *fix(assistant): distinguish disconnected shared channels* ([link](https://github.com/nearai/ironclaw/pull/8076))
  - Author: be-student | Created: 2026-09-06 | Updated: 2026-09-12 | Status: **Closed (not merged)**
  - Proposed changes: distinguish a paired user's disconnected shared channel from an unpaired account; render channel-specific guidance for user messages and bot commands; keep rejection classification consistent across product, adapter, and OpenAI-compatible surfaces; update Slack capabilities.
  - Outcome: Closed without merge. No commits were recorded as landed, so no code from this PR is in mainline.

## 4. Community Hot Topics

There are no open or recently active Issues, and the single PR (#8076) recorded zero reactions. There is no measurable community discussion to analyze today. The lack of comments on the closed PR — combined with its closure rather than merge — may indicate the maintainer team addressed the underlying need through a different channel or decided not to pursue this particular approach.

## 5. Bugs & Stability

No bug reports, crash reports, or regression issues were filed or updated in the last 24 hours. The closed PR #8076 referenced a Slack-related ambiguity (disconnected shared channels being indistinguishable from unpaired accounts), which is a real but narrow UX/integration edge case. Because the PR was not merged, no fix is currently shipping via this pull request, though the issue may have been resolved internally or deferred.

## 6. Feature Requests & Roadmap Signals

No explicit feature requests were raised today. The closed PR #8076 touched on areas that could inform future roadmap decisions if revisited:

- **Unified rejection/error classification** across product surface, adapter layer, and OpenAI-compatible API — suggesting demand for consistent error semantics across surfaces.
- **Slack channel state UX** — distinguishing paired-but-disconnected channels from unpaired accounts points to a need for richer channel-state modeling in the Slack adapter.

Given the closure without merge, these signals should be treated as low confidence. Predictions about the next release are not warranted based on a single day of activity.

## 7. User Feedback Summary

There is no public user feedback — comments, reactions, or new issue threads — from the last 24 hours. No pain points, use cases, or satisfaction signals can be extracted from today's data. Any conclusions about user sentiment would require longer-term trend analysis.

## 8. Backlog Watch

No long-unanswered items were surfaced today because the issue and PR backlogs appear thin relative to the single-day window. However, two items warrant follow-up monitoring:

- **PR #8076** ([link](https://github.com/nearai/ironclaw/pull/8076)) — Closed without merge; if the underlying Slack channel-distinction problem still exists, a new PR with revised scope may be needed. Maintainers should clarify whether this is being addressed elsewhere.
- The general absence of activity (0 open issues, 0 merged PRs) over 24 hours should be cross-checked against a longer window to determine whether this reflects a healthy, stable codebase or reduced community engagement.

---

**Overall health signal:** Neutral-to-quiet. One PR closed without merge is the only activity of the day. No regressions, no new bugs filed, no releases cut. Recommend monitoring over a 7-day window before drawing strong conclusions about project velocity or community engagement.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-12

## 1. Today's Overview

QwenPaw shows **high daily activity** with 20 issues updated and 9 PRs touched in the last 24 hours (16 open / 4 closed issues; 8 open / 1 closed PR). No new releases shipped today, but the project is in the middle of stabilizing the **v2.2.1** line, as evidenced by the just-closed Release Duty verification issue ([#7692](https://github.com/agentscope-ai/QwenPaw/issues/7692)). The dominant theme today is **post-release regression hunting**: several 2.2.x bugs involve data loss (model/session disappearance), silent failures (Daily Paper, MCP registration), and severe resource issues (memory exhaustion, server-freezing file watcher). On the constructive side, four feature PRs are queued (Serply provider, ReMeLight model split, Telegram Rich Messages, Atlas Cloud), and a second first-time-contributor cohort is actively shipping.

## 2. Releases

No new releases in the last 24 hours. The most recent stable line is **v2.2.1**, whose Installation Verification report ([#7692](https://github.com/agentscope-ai/QwenPaw/issues/7692)) closed successfully today.

## 3. Project Progress

**Merged/Closed PRs (1):**
- [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) — `fix(telegram): render Markdown tables as <pre> instead of raw pipes` (first-time contributor, Bruce-Yii). Closes [#7585](https://github.com/agentscope-ai/QwenPaw/issues/7585). Fixes Telegram's raw-pipe rendering of GFM tables.

**Closed Issues indicating progress (4):**
- [#7692](https://github.com/agentscope-ai/QwenPaw/issues/7692) — Release Duty verification for v2.2.1 stable passed.
- [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) — `subagent_model` override silently dropped. Diagnosed; awaiting code fix in [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680).
- [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) — "Ghost session" desync closed as invalid (likely user-side report, but the symptom remains a known concurrency weakness).
- [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) — Feature request for a separate `memory_model` is closed as the implementation PR [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) is now open.

**Merging pattern:** Issues-to-PRs traceability is unusually clean today: every closed feature/bug ticket above has an open PR counterpart, suggesting maintainers are triaging in real time.

## 4. Community Hot Topics

Most-engaged threads in the last 24h (by comments):

| # | Item | Comments | Title |
|---|------|---------:|-------|
| 1 | [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | 6 | Stop button lies — task continues executing in the background |
| 2 | [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) | 3 | Configured LLM model vanishes mid-session |
| 3 | [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) | 3 | Daily Paper silently fails on arxiv unreachable — error hidden |
| 4 | [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) | 3 | `subagent_model` override ignored |
| 5 | [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) | 3 | `spawn_subagent` per-task model selection (since 2026-06-02) |
| 6 | [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) | 3 | Ghost sessions / sidebar-session desync |
| 7 | [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | 2 | Memory exhaustion: three compounding paths |
| 8 | [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) | 2 | ReMeLight independent memory model |
| 9 | [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) | 2 | MCP can't connect on 2.2.x (regression from 2.1.1b3) |
| 10 | [#7710](https://github.com/agentscope-ai/QwenPaw/issues/7710) | 2 | History groups for inter-agent/proactive chats |

**Underlying needs reflected:**
- **Cost control on flagship models.** [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901), [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664), [#7717](https://github.com/agentscope-ai/QwenPaw/issues/7717) — users want to route cheap tasks (subagents, memory writes, summaries) to cheaper models. This is the single most consistent theme across multiple unrelated issues.
- **Visibility into failures.** [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) and [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) — silent swallow-and-fall-back is now being actively reported; this matches PRs [#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723) and [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680).
- **Session/model persistence reliability.** [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708), [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698), [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) all share a root of state being lost across the desktop's restart boundaries.

## 5. Bugs & Stability

Ranked by severity (data loss > availability > silent failure > UX):

| Severity | Issue | Title | Fix PR? |
|---|---|---|---|
| **Critical** | [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | Memory exhaustion via 3 paths (unbounded streams + keep-alive stacking + doom-loop gate evasion); ~1MB/s leak | Partial — [#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723) addresses only the silent-error path |
| **Critical** | [#7721](https://github.com/agentscope-ai/QwenPaw/issues/7721) | File browser freezes entire server (`watchfiles.awatch` RustNotify blocks event loop) | ✅ [#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725) open |
| **High** | [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) | MCP cannot connect since 2.2.x upgrade (regression vs 2.1.1b3) | ❌ none yet |
| **High** | [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | Stop button reports stopped but task keeps running; causes 409 on next input | ❌ none yet |
| **High** | [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) / [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) | LLM model config + sessions vanish unexpectedly during use | ❌ none yet |
| **High (security)** | [#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727) | Out-of-workspace write hard-block bypassed by kimi-code (path-field parsing blind spot) | ❌ none yet |
| **High (security)** | [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726) | ACP `trusted: true` silently degrades to interactive prompts (optionId mismatch) | ❌ none yet |
| **Medium** | [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) | Daily Paper fails with misleading "completed, no content" — arxiv unreachable, no proxy knob | ❌ none yet |
| **Medium** | [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) | `subagent_model` override silently ignored | ✅ [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) open |
| **Medium** | [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) | Scheduled tasks produce no visible output — result hidden in `thinking`/steps | ❌ none yet |

**Stability signal:** 5 of the top 10 most-active threads are bugs from v2.2.x users; this is a normal post-release regression cluster, but the rate is elevated. Two issues are also security-relevant ([#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726), [#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727)) and should be prioritized over cosmetic work.

## 6. Feature Requests & Roadmap Signals

Open features with PR backing (likely to land in v2.2.2 or v2.3.0):

| Feature | Issue | PR | Likelihood |
|---|---|---|---|
| Serply as 3rd `web_search` provider | [#7711](https://github.com/agentscope-ai/QwenPaw/issues/7711) | [#7712](https://github.com/agentscope-ai/QwenPaw/pull/7712) | **High** — issue + PR same day, narrow scope |
| Separate model for ReMeLight memory writes | [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) | [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) | **High** — cost-control demand, PR ready |
| Atlas Cloud as built-in OpenAI-compatible provider | — | [#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499) | **Medium** — older PR (since July), but simple preset |
| Telegram Rich Messages for Markdown tables | — | [#7713](https://github.com/agentscope-ai/QwenPaw/pull/7713) | **Medium** — depends on Rich Messages rollout |
| Per-task model selection in `spawn_subagent` | [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) | — | **Medium** — strategic but no PR yet |
| History groups for inter-agent / proactive chats | [#7710](https://github.com/agentscope-ai/QwenPaw/issues/7710) | — | **Medium** — UX polish, clear demand |
| Serply + DeepSeek capability metadata | [#7717](https://github.com/agentscope-ai/QwenPaw/issues/7717) | — | **Low** — proposal-stage, 4 sub-asks |

**Roadmap signal:** Cost optimization (multi-model routing) is now a *recurring* theme across 3 independent threads ([#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901), [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664), [#7717](https://github.com/agentscope-ai/QwenPaw/issues/7717)). Treat it as a candidate **theme** for the next minor release.

## 7. User Feedback Summary

**Pain points surfaced today:**

1. **State persistence is fragile on desktop.** Three independent reports ([#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708), [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724), [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698)) describe lost model configs and sessions after normal use, often paired with plug-in redeployment. Users perceive the desktop as **untrustworthy for long sessions**.
2. **MCP integration broke in 2.2.x.** [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) — users who depended on `qwenpaw-hub` MCP connections (working in 2.1.1b3) lost that capability silently on upgrade. This is a **regression-driven trust erosion**.
3. **Silent failures erode debuggability.** [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715), [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676), [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) — multiple bug reports converge on "the system swallowed the error and pretended success". A clear demand for **loud failures** rather than tolerant fallbacks.
4. **Token cost on flagship models is a real friction.** [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) explicitly cites *economic* harm from background memory writes using the chat model.
5. **Satisfaction signals:** First-time contributor throughput is healthy (5 of 9 PRs tagged `[first-time-contributor]`). PRs are landing same-day for issues, suggesting responsive maintainer triage.

**Use cases implied:** long-running desktop sessions with mixed-model orchestration; external tool/MCP integrations; scheduled/automated memory jobs; Telegram as a primary interface.

## 8. Backlog Watch

Items needing maintainer attention:

| Item | Age | Reason |
|---|---|---|
| [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) `spawn_subagent` per-task model | 2026-06-02 → 2026-09-11 (~3.5 months) | Highest-impact strategic feature request; no PR yet despite 3 comments |
| [#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499) Atlas Cloud provider | 2026-07-27 → 2026-09-11 (~7 weeks) | PR sits open with no review activity |
| [#7692](https://github.com/agentscope-ai/QwenPaw/issues/7692) closed-release-duty + every open 2.2.x regression ([#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567), [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708), [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716), [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724)) | 0–7 days | High user impact, no fix PR for most; recommend triage in next release cut |
| [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726) / [#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727) —

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-12

## 1. Today's Overview

ZeroClaw is showing very high development velocity with 33 issues and 50 PRs updated in the last 24 hours, though only one PR was merged/closed and no new releases were published. Activity is dominated by bug reports around Windows CI stability, ZeroCode (TUI/Code pane) regressions, provider-side reliability (Anthropic, OpenRouter, OpenCode), and proactive token-budget context compaction that was removed in v0.8.5. The project has 26 open issues actively being worked on versus only 7 closed in the last day, indicating the backlog is growing faster than it is being drained. Overall health: **active but strained** — many high-severity bugs are landing while larger architectural work (OIDC, session ownership, ACP recovery) remains in progress.

## 2. Releases

No new releases in the last 24 hours. The most recent tagged version mentioned in issue text is v0.8.5.

## 3. Project Progress

Closed issues today reflect a mix of fixes and acceptance:

- **[#10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753)** — `session/new` 2 MB stack overflow on Windows guard test (closed).
- **[#10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690)** — Integrations page "Configure" link slugification bug for Z.AI (closed; minor S3).
- **[#9047](https://github.com/zeroclaw-labs/zeroclaw/issues/9047)** — Clarification of Code session history vs. persistent-memory isolation (closed; documentation/feature).
- **[#10609](https://github.com/zeroclaw-labs/zeroclaw/issues/10609)** — `zerocode` ignoring launch directory (closed).
- **[#10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115)** — Tool-result truncation invisibility outside model context (closed; observability improvement).
- **[#10786](https://github.com/zeroclaw-labs/zeroclaw/issues/10786)** — Anthropic dropping previous-turn thinking blocks (closed).
- **[#9092](https://github.com/zeroclaw-labs/zeroclaw/issues/9092)** — ZeroCode keystroke lag in long sessions (closed).

One PR was merged/closed during the window (not in the top-20 list); the broader PR backlog remains entirely open (49 open / 1 closed).

## 4. Community Hot Topics

The most commented items point to two recurring pain points: maintainer triage and Windows/CI reliability.

- **[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — *Maintainer decision queue for RFCs and design issues* (15 comments, p2, tracker). The longest-running coordination thread. Signal: maintainers need a higher-throughput RFC acceptance process; without it, design discussions stall across multiple sub-issues.
- **[#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)** — *RpcDispatcher::process_line within 2% of 2 MB stack guard on Windows* (6 comments, p1, in-progress). An important correctness signal: even the advisory Windows nextest job is finding genuine Windows stack-overflow bugs (`0xc00000fd`).
- **[#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289)** — *OIDC milestone tracker* (3 comments, p2, high-risk). Multiple stacked PRs (`#10248`, `#10255`, `#10270`, `#10274`) feed this tracker; community interest is on canonical principals and inbound authentication.
- **[#10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753)** — Windows guard test regression between 2026-09-07 and 2026-09-10 (3 comments; closed).
- **[#10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690)** and **[#9047](https://github.com/zeroclaw-labs/zeroclaw/issues/9047)** — both 2 comments, both closed today.

Underlying need: a coordinated Windows test pipeline and a maintainer RFC funnel are both gating faster throughput.

## 5. Bugs & Stability

Ranked by severity (most severe first):

| Severity | Issue | Summary | Fix PR? |
|---|---|---|---|
| **S0 — data loss** | [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) | `MarkdownMemory::store` silently loses entries when `store()` calls overlap (no write serialization or verification). | None yet |
| **S1 — workflow blocked** | [#10609](https://github.com/zeroclaw-labs/zeroclaw/issues/10609) | `zerocode` forces agent workspace as cwd regardless of launch directory. | Closed today |
| **S2 — degraded behavior** | [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) | Failed Code/ACP turn discards the accepted prompt and tool exchanges from durable history. | Tracked alongside [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) (persist interrupted turn progress) |
| **S2** | [#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785) | `zerocode` notification lag cancels every running turn on multi-session instances. | None visible |
| **S2** | [#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787) | Single-candidate stream recovery ignores `provider_retries`; Anthropic 529 gets one immediate retry with no backoff. | None visible |
| **S2** | [#10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778) | Multimodal image cap eviction rewrites earlier history messages and invalidates Anthropic cache prefix. | Follow-up to [#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701) |
| **S2** | [#10777](https://github.com/zeroclaw-labs/zeroclaw/issues/10777) | `thinking`/`effort` config flips between turns rewrite the cached history segment. | None visible |
| **S2** | [#10782](https://github.com/zeroclaw-labs/zeroclaw/issues/10782) | Channel reply-intent precheck discards LLM usage; classifier cost never recorded. | None visible |
| **S2** | [#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736) | Pre-output stream failure skips advertised non-streaming fallback. | Status: in-progress |
| **S2** | [#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795) | `zeroclaw agent` interactive REPL never enables terminal `IUTF8`, breaking multi-byte Backspace. | None visible |
| **S2** | [#10776](https://github.com/zeroclaw-labs/zeroclaw/issues/10776) | Telegram albums spanning polling pages split into multiple turns. | None visible |
| **S2 (was open)** | [#10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753) | Windows 2 MB stack overflow. | **Closed today** |
| **S3 — minor** | [#10794](https://github.com/zeroclaw-labs/zeroclaw/issues/10794), [#10793](https://github.com/zeroclaw-labs/zeroclaw/issues/10793) | Three Windows-only nextest failures with no code change; `publish_contract` Windows backslash path. | [#10676](https://github.com/zeroclaw-labs/zeroclaw/pull/10676) open |
| **S3** | [#10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779) | OpenCode FreeUsageLimitError (429 exhausted quota) is retried with sub-second backoff instead of failing fast. | None visible |
| **S3** | [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796) | ZeroCode chat input ignores the Delete key. | None visible |

The single most concerning item is **[#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797)** (S0 data loss) — a `read-modify-write` race in the markdown memory backend with no serialization or write verification.

## 6. Feature Requests & Roadmap Signals

Strong signals for the next release:

- **Proactive token-budget context compaction** — [#10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780) (p1, high-risk) explicitly calls for restoration of `context_compression` with `keep_recent`/`collapse_tool_results` semantics. Likely targets v0.8.6.
- **Inert config cleanup** — [#10781](https://github.com/zeroclaw-labs/zeroclaw/issues/10781) requests either implementing or removing inert context/history config keys (`context_compression.*`, `history_pruning.keep_recent`, `collapse_tool_results`, `keep_tool_context_turns`). Will probably ship as docs+behavior change in the same release.
- **Token accounting on history-trim events** — [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) (blocked, XL) has been waiting since 2026-08-03; addresses [#9619](https://github.com/zeroclaw-labs/zeroclaw/issues/9619) where whole-turn cuts looked like ordinary turns consuming the full token budget.
- **OIDC canonical principals / inbound auth (Stage 5)** — [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) tracker; stacked PRs [#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) → [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255) → [#10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259) → [#10263](https://github.com/zeroclaw-labs/zeroclaw/pull/10263) → [#10265](https://github.com/zeroclaw-labs/zeroclaw/pull/10265) → [#10268](https://github.com/zeroclaw-labs/zeroclaw/pull/10268) → [#10270](https://github.com/zeroclaw-labs/zeroclaw/pull/10270) → [#10274](https://github.com/zeroclaw-labs/zeroclaw/pull/10274) form the largest pending change set. Earliest realistic merge after all stack layers.
- **Server-Sent Events for webhook chat turns** — [#10450](https://github.com/zeroclaw-labs/zeroclaw/pull/10450) (XL) opt-in streaming for `POST /webhook`.
- **Egress grant ceremony for plugin install/list** — [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) (XL) after [#9582](https://github.com/zeroclaw-labs/zeroclaw/pull/9582) merged.
- **Edge TTS owner-only artifact permissions** — [#10449](https://github.com/zeroclaw-labs/zeroclaw/pull/10449) (security fix, S) — small, plausible for next patch.
- **OpenRouter streaming lifetime fix** — [#10442](https://github.com/zeroclaw-labs/zeroclaw/pull/10442) (S) — also small, likely patch.
- **QQ channel one-off sends / cron delivery / health-check bot probe** — [#10799](https://github.com/zeroclaw-labs/zeroclaw/pull/10799), [#10798](https://github.com/zeroclaw-labs/zeroclaw/pull/10798) (XS/S) — newly opened today.
- **ZeroCode: "Add to Chat" from text selection** — [#10553](https://github.com/zeroclaw-labs/zeroclaw/pull/10553) (XL).
- **Atomic `SessionBackend` ownership contract** — [#10412](https://github.com/zeroclaw-labs/zeroclaw/pull/10412) (XL).
- **Persist interrupted Code/ACP turn progress** — [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) (XL); addresses [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788).
- **Allowed-roots for git operations** — [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) (XL security).

## 7. User Feedback Summary

Real, recurring pain points from today's signals:

- **Windows users are disproportionately affected.** Four separate issues today are Windows-only (`#10753`, `#10793`, `#10794`, plus the in-progress `#10734`). The `Advisory Windows nextest` job is now producing genuine stack-overflow bugs on cron-touching PRs with no code change. Users perceive the Windows pipeline as brittle and under-invested.
- **Token-budget context control was a regression.** [#10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780) and [#10781](https://github.com/zeroclaw-labs/zeroclaw/issues/10781) explicitly call out that v0.8.5 removed or silently neutered documented config keys (`context_compression`, `keep_recent`, `collapse_tool_results`, `keep_tool_context_turns`). Users feel they are configuring options that do nothing.
- **Long ACP sessions are fragile.** [#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785) reports that *three* concurrent ~200k-token ACP sessions got cancelled in unison, and [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) reports accepted prompts and tool exchanges vanishing from durable history on a failed turn. Power users on Anthropic-native with extended contexts are the most affected cohort.
- **ZeroCode UX regressions.** [#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795) (multi-byte Backspace broken) and [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796) (Delete key ignored) suggest the TUI input layer is regressing on simple key handling.
- **Cost/quota visibility gap.** [#10782](https://github.com/zeroclaw-labs/zeroclaw/issues/10782) reports the channel reply-intent classifier makes a real billable call but records zero usage — users cannot trust their cost dashboards.
- **OpenCode free-tier users hit retry storms** ([#10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779)) because HTTP 429 from quota exhaustion is retried with sub-second backoff.
- **Telegram album splitting** ([#10776](https://github.com/zeroclaw-labs/zeroclaw/issues/10776)) continues to frustrate power users even after earlier fixes (#8955, #5514).
- **Satisfaction:** maintainers closed 7 issues in a day including several S2s (#10609, #10115, #10753, #9092), and review-attentive PRs (e.g., Audacity88's scope correction on [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584)) suggest active, careful stewardship.

## 8. Backlog Watch

Issues and PRs awaiting maintainer attention, ordered by staleness × impact:

- **[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — Maintainer decision queue (since 2026-07-04, 15 comments). Highest-leverage process item; without throughput here, sub-issues age out.
- **[#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)** — Token accounting on history-trim events (blocked, since 2026-08-03, XL). Blocked status is itself the signal.
- **[#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819)** — Multimodal image pixel-level validation (since 2026-08-07, XL, `needs-author-action`). Long-running, security-relevant.
- **[#10417

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*