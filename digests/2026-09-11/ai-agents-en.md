# OpenClaw Ecosystem Digest 2026-09-11

> Issues: 421 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-10 23:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-11

## 1. Today's Overview

OpenClaw is in an active stabilization phase following the release of **v2026.6.35**, the final June 2026 LTS cut. Repository activity remains very high, with **421 issues updated** (236 open, 185 closed) and **500 PRs touched** (241 open, 259 merged/closed) in the last 24 hours. The issue mix is dominated by P0/P1 regressions in **memory-core** (SQLite locking, unbounded growth, reindex lock leaks) and **codex/codex-cli** integration (zombie child processes, voice-note drops, transcript mirror duplication), suggesting these two subsystems are the current technical-debt hot spots. Maintainer triage is visible — many recent issues carry `clawsweeper` queueing labels (`fix-shape-clear`, `queueable-fix`, `needs-maintainer-review`), indicating deliberate grooming rather than ad-hoc firefighting.

## 2. Releases

**v2026.6.35 — `openclaw 2026.6.35`** (final June 2026 Extended Stable / LTS)

- **Safer provider & channel boundaries:** bundled providers and channel adapters now bound untrusted response bodies, reject oversized inputs before expensive work, and preserve safe recovery when transient failures occur during transport. Operators on the LTS track should see fewer crash loops tied to malformed upstream payloads.
- This is tagged as the **terminal June LTS**, so it will receive only critical/security backports going forward; users wanting new features should plan a migration to the rolling 2026.9.x line (currently at 2026.9.3).

No migration notes are public beyond the standard `openclaw doctor` recommendations. ([Release link](https://github.com/openclaw/openclaw/releases/tag/v2026.6.35))

## 3. Project Progress

The merge/close velocity (259 of 500 PRs touched) reflects healthy throughput. Notable landed work in the last 24h:

- **[#144292](https://github.com/openclaw/openclaw/pull/144292) — `fix(agents): avoid sibling output limits for unlisted models`** (merged/closed, diamond-lobster). Custom-provider unlisted models no longer inherit the first listed row's `max_tokens` cap. (Closes [#144160](https://github.com/openclaw/openclaw/issues/144160).)
- **[#144438](https://github.com/openclaw/openclaw/pull/144438) — `fix(agents): preserve captured fallback model selections`** (closed, platinum-hermit). Resolves the `entry → middle → final` alias double-consumption that could materialize the wrong fallback tier.
- **[#144367](https://github.com/openclaw/openclaw/pull/144367) — `fix(doctor): repair fails after removing a bundled plugin alias`** (closed, P1). Sorts already-selected migration owners so the immutable-plan check no longer rejects valid finalizations after Doctor plugin cleanup.
- **[#144478](https://github.com/openclaw/openclaw/pull/144478) — `chore(ui): refresh control ui locales`** (closed). Bot-generated locale sync PR, kept on reviewable path.
- **[#142626](https://github.com/openclaw/openclaw/pull/142626) — `fix(imessage): restore feedback after bridge recovery`** (open, automerge armed). iMessage typing indicators and read receipts will return after the private bridge recovers from a stall. (Closes [#142603](https://github.com/openclaw/openclaw/issues/142603).)
- **[#144495](https://github.com/openclaw/openclaw/pull/144495) — `fix(memory): keep lexical recall available during failed upgrades`** (open). Memory search no longer returns zero results when an automatic chunking upgrade fails to rebuild; the last published lexical index stays queryable.

## 4. Community Hot Topics

The most-commented threads cluster around systemic, multi-issue classes rather than isolated bugs:

- **[#125626](https://github.com/openclaw/openclaw/issues/125626) — OpenClaw 2026.8.1 beta feedback** (closed, 24 comments, Patrick-Erichsen, maintainer-curated). The single largest engagement thread of the day; aggregate field reports for the August beta, used by maintainers to triage the September line.
- **[#91009](https://github.com/openclaw/openclaw/issues/91009) — Codex PreToolUse hook relay spawns CPU-bound `openclaw-hooks` processes and stalls gateway RPC** (open, 22 comments, P0 🦪). On 2026.6.1, hook relay processes for Codex consumed 100%+ CPU each, blocking gateway RPC. Underlying need: a clean process-lifecycle contract for native provider hooks with bounded CPU/IO budgets.
- **[#97616](https://github.com/openclaw/openclaw/issues/97616) — OpenClaw leaks unreaped hook/tool child processes** (open, 16 comments, P1 🦞). Zombies (`openclaw-hooks`, `bash`, `codex`) accumulate as children of the main process, degrading runtime. Combined with #91009, this points to a systemic child-reaping gap that the team will need to address as one feature.
- **[#114612](https://github.com/openclaw/openclaw/issues/114612) — `memory-core` SQLite unbounded growth** (open, 13 comments, P2 🦞). `memory_index_chunks` and `memory_embedding_cache` have no retention policy — production instance already showing multi-GB growth. Underlying need: retention/eviction + observability for memory storage.
- **[#139714](https://github.com/openclaw/openclaw/issues/139714) — `update_runs` row is admitted but never finalized** (closed, 13 comments). Post-core update resume child reports "update in progress" forever. A clear, narrow bug with a likely one-line fix and a documented state-machine gap.
- **[#132762](https://github.com/openclaw/openclaw/issues/132762) — overflow retry ends successfully on tool result without final delivery** (closed, 12 comments). Multi-stage document workflow produces a `toolResult` final item but no assistant response, so no user-visible delivery.

**Underlying community need:** durable delivery semantics, bounded background work, and visible state for both users and operators. The volume of "stuck in pending state" and "leaked resource" reports indicates OpenClaw is being trusted with longer-running workflows than its lifecycle model was originally designed for.

## 5. Bugs & Stability

Ranked by severity × impact × open status:

### P0 — Crash-loop / release-blocker
- **[#142585](https://github.com/openclaw/openclaw/issues/142585)** — `2026.9.3 Doctor refuses valid legacy workspace setup and attestation import when canonical rows are absent` (open, 🦐 gold shrimp). Migration blocker from 2026.7.1-2 → 2026.9.3. Fix PR: **none observed yet** — needs maintainer triage.
- **[#140162](https://github.com/openclaw/openclaw/issues/140162)** — Windows gateway restart kills a ready/slow-booting gateway as "stale process" after 181s timeout (open, 🦚 platinum hermit). No fix PR.
- **[#91009](https://github.com/openclaw/openclaw/issues/91009)** — Codex hook relay CPU-bound stall (see §4). No fix PR linked.
- **[#101763](https://github.com/openclaw/openclaw/issues/101763)** — Hosted Molty model selector doesn't persist; API receives `claude-opus-4.8` (with dot) instead of `claude-opus-4-8` (closed, 🦐 gold shrimp). Closed today, presumably fixed.

### P1 — Session-state / message-loss
- **[#97616](https://github.com/openclaw/openclaw/issues/97616)** — Child-process leak / zombie accumulation. No fix PR.
- **[#136183](https://github.com/openclaw/openclaw/issues/136183)** — SSH hang on SIGTERM during banner exchange, regression in 2026.8.1 → 2026.8.2 (open). No fix PR.
- **[#117262](https://github.com/openclaw/openclaw/issues/117262)** — SQLite contention: 3 concurrent write handles cause ~33s event-loop stalls (DEF-61) (open, 🦞). Likely the root-cause pattern behind multiple memory issues. No fix PR.
- **[#136311](https://github.com/openclaw/openclaw/issues/136311)** — `memory-core` reindex lock reacquired on every Gateway start; 19 GB of orphaned temp DBs (open, 🐚 platinum hermit). No fix PR.
- **[#139847](https://github.com/openclaw/openclaw/issues/139847)** — Message dropped while reply run is active (`Reply operation has no active tool authority snapshot`) — regression in 2026.9.2 (open, 🦞). No fix PR.
- **[#142476](https://github.com/openclaw/openclaw/issues/142476)** — 2026.9.3 cron session reaper runs synchronous `PRAGMA integrity_check` on all 632 agent DBs, blocking event loop 14–76 s (open, 🦞). No fix PR.
- **[#144424](https://github.com/openclaw/openclaw/issues/144424)** — Heartbeat-lane storm trips real Anthropic 429s and backoff not honored (open, 🦞). Self-sustaining failure mode. No fix PR.
- **[#137366](https://github.com/openclaw/openclaw/issues/137366)** — `memory_search` triggers full source reconciliation while dirty, causing CPU starvation and timeouts (open, 🦞). No fix PR.
- **[#144269](https://github.com/openclaw/openclaw/pull/144269)** — `fix(agents): preserve tool restrictions across session sends` (PR open, P0 🦐, security-boundary risk). Sub-delegated turns can regain tools the sender had removed. **PR is open and labelled "needs proof" — strong candidate to fast-track.**
- **[#121617](https://github.com/openclaw/openclaw/issues/121617)** — Post-compaction "Already compacted" guard misclassifies terminal failure (open, 🦞). No fix PR.
- **[#139274](https://github.com/openclaw/openclaw/issues/139274)** — Native `/codex` bind drops voice-note attachments and skips STT (open, 🦞). No fix PR.
- **[#128971](https://github.com/openclaw/openclaw/issues/128971)** — Telegram final reply silently lost when terminal receipt returns `delivery_ambiguous` (open, 🦐 gold shrimp). No fix PR.
- **[#112110](https://github.com/openclaw/openclaw/issues/112110)** — **Security**: improper authorization check on subagent MCP tool execution; child tool scopes evaluated against parent session (open, P1 🦪, `impact:security`). Stale label flagged; **security review requested but no fix PR**.

### P2 — UX / state hygiene
- **[#143752](https://github.com/openclaw/openclaw/issues/143752)** — Interrupted package activation can strand canonical CLI without package-only replay (open, 🦞). No fix PR.
- **[#136360](https://github.com/openclaw/openclaw/issues/136360)** — Internal `<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` carrier leaks as visible user-role turn on Microsoft Teams (open, 🐚). Same class as Slack/Telegram/Feishu/Discord precedents, no fix PR for msteams.
- **[#143640](https://github.com/openclaw/openclaw/issues/143640)** — memory-core full index publish in single `IMMEDIATE` transaction exhausts the 5 s busy timeout (open, 🦞). No fix PR.

**Pattern:** most P0/P1 crashes are SQLite-bound (locks, busy timeouts, write-handle contention) and concentrated in `memory-core`; the lack of fix PRs on the highest-severity items is the biggest risk to the next 2026.9.x patch release.

## 6. Feature Requests & Roadmap Signals

- **[#12855](https://github.com/openclaw/openclaw/issues/12855)** — Built-in auto-update with configurable schedule, confirmation, and post-update notification (P2, enhancement, security review needed, 8 comments, 👍 0). The current primitives (`update.checkOnStart`, `update.channel`, `gateway.update.run`) exist but no built-in workflow. Likely roadmap candidate for the **2026.10/2026.11** timeframe, especially given the launchd/Windows scheduler complaints below.
- **[#109657](https://github.com/openclaw/openclaw/issues/109657)** — Adopt the core durable ingress drain on WhatsApp, Discord, Slack, Signal, iMessage (closed, P1, maintainer). Following [#108924](https://github.com/openclaw/openclaw/pull/108924) which landed for core, this issue was actively driving the rollout. Status indicates progress — expect durable ingress on these channels in the next two minor releases.
- **[#109370](https://github.com/openclaw/openclaw/issues/109370)** — Surface delivery correlation data (`MessageReceipt`, queue logical id, retry count, originating `runId`) on `message_sent` hooks (P2, enhancement, security review, 5 comments, 👍 1). Enables plugin-side idempotent delivery reconciliation. Likely a follow-on to the durable-ingress work.
- **[#141747](https://github.com/openclaw/openclaw/issues/141747)** — Runtime scaffolding (`<system-reminder>`) injects ~686 tokens/turn with no opt-out (P2, 🦪). User-visible token-cost complaint; expect a config knob (`agents.runtime.scaffolding` or similar) in 2026.10 or 2026.11.
- **[#8285](https://github.com/openclaw/openclaw/issues/8285)** — Auto-send intent/acknowledgment message before agent processing (P3, 5 comments). Long-standing, low-traction — probably not on the roadmap.
- **[#144491](https://github.com/openclaw/openclaw/pull/144491)** — `feat(auth): sign in to OpenRouter from private chat` (XL PR by obviyus). If accepted, this becomes the first chat-native OAuth completion path, removing the Control UI handoff. Likely lands in 2026.10 if proof passes.
- **[#144480](https://github.com/openclaw/openclaw/pull/144480)** — Browser sidebar asset download action (L PR by Patrick-Erichsen). UX polish for the macOS/web sidebar.
- **[#144439](https://github.com/openclaw/openclaw/pull/144439)** — Configurable prompt-section overrides (L PR). Operators will be able to append/prepend/replace/disable individual system-prompt sections without forking.

**Predicted near-term additions:**
1. Durable ingress drain on remaining channels (driven by #109657).
2. Memory-core retention policy + memory storage observability (driven by #114612, #143640, #136311).
3. Child-process lifecycle + CPU/IO budgets (driven by #91009, #97616).
4. SQLite write-handle consolidation / `busy_timeout` tuning (driven by #117262, DEF-61).
5. Configurable runtime-scaffolding opt-out (driven by #141747).

## 7. User Feedback Summary

**Dominant pain points (sampled from top-comment threads):**

- **Memory subsystem reliability.** Multiple users report production instances with multi-GB memory DBs (#114612), unrepairable indexes (#136311, 19 GB temp DB accumulation), and self-inflicted SQLite lock storms (#117262, #143640). This is the single largest source of P0/P1 reports and reflects trust being placed in `memory-core` beyond its current stability envelope.
- **Slow boot / restart fragility on Windows and macOS.** #140162 (Windows stale-process kill after 181s), #143757 (Windows Scheduled Task defaults that can't run unattended), #90711 (macOS launchd plist hardcoded `StandardErrorPath` to `/dev/null`, hiding diagnostics). Operators are flying blind or being killed by their own restart logic.
- **Provider-integration surprises.** #101763 (model-id dot vs dash on hosted Molty), #116691 (Volcano Engine openai-responses long-context `input.status` regression), #123009 (native Codex subscription recheck blocks every 5 minutes despite low usage), #101445 (embedded Ollama reports `incomplete_result` with valid tool_calls). Each is small in isolation but together signal that the provider adapter matrix needs a structured regression suite.
- **Channel-UI / delivery ambiguity.** #128971 (Telegram `delivery_ambiguous` silently loses the final reply), #136360 (Microsoft Teams internal-context leak — same class as Slack/Telegram/Feishu/Discord), #136183 (SSH banner SIGTERM regression). Users experience these as "the bot froze" or "the bot lied about delivery."
- **Token-cost transparency.** #141747 (686 tokens/turn of internal scaffolding with no opt-out) is a clear ask for cost control and visibility.
- **Operational ergonomics.** #87441 (diagnostics thresholds parameter exists but no caller passes it — dead config), #139847 (no active tool authority snapshot), #138409 (Dutch report — `gateway-active-work` deadlock during plugin updates) point to a class of "the code knows the right answer but no caller uses it" issues.

**Satisfaction signal:** Closed-vs-open ratio on issues (185/236 ≈ 44 % closed within 24h on a 421-issue pool) is reasonable for a project of this size. The `clawsweeper:fix-shape-clear` and `clawsweeper:queueable-fix` labels indicate maintainers are actively converting bug reports into queueable, well-scoped fix candidates rather than leaving them in a triage swamp.

**Dissatisfaction signal:** Several P0/P1 items (#140162, #142585, #91009, #144424, #137366, #112110) still have **no fix PR after multiple days** of maintain

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem
**Snapshot date: 2026-09-11** · Projects: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The open-source personal AI assistant space has split into distinct strategic camps: OpenClaw operates at near-commercial scale with a dual LTS/rolling release discipline; QwenPaw is converging on a stable 2.2.1 while pivoting from personal to team/enterprise use; ZeroClaw is in a security-first architectural rewrite gated behind an 8-deep PR stack; Hermes Agent shows healthy triage but stalled shipping; and IronClaw is in quiet maintenance mode. Common across all five: the technical frontier has moved from "can the agent chat" to **durable delivery, memory reliability, cost accounting, multi-tenancy, and security boundaries** — the infrastructure qualities required for assistants to be trusted with long-running, real workloads.

---

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Close/Merge Rate | Release Status | Health Score |
|---|---|---|---|---|---|
| **OpenClaw** | 421 (185 closed) | 500 (259 merged) | ~44% / ~52% | ✅ v2026.6.35 LTS shipped; rolling at 2026.9.3 | **7.5/10** — massive throughput, but P0/P1 items lacking fix PRs; memory-core debt |
| **QwenPaw** | 28 (10 closed) | 35 (6+ merged) | ~36% / healthy | ✅ v2.2.1-beta.2 shipped | **7/10** — shipping cadence good; 3 High bugs open with no fix PRs |
| **IronClaw** | 1 (daily taxonomy report) | 8 (5 automated Dependabot) | n/a / 1 real merge | ❌ No release | **6.5/10** — stable, low-risk, low momentum |
| **Hermes Agent** | 50 (~90% still open) | 50 (2 closed) | Low / ~4% | ❌ No release (overdue) | **6/10** — active triage but release cadence stalled; Windows regressions escaping CI |
| **ZeroClaw** | 50 (0 closed) | 50 (0 merged) | 0% / 0% | ❌ No release (last: v0.8.3) | **5/10** — high engagement, zero throughput; open S0 security bugs unaddressed |

**Key metric:** OpenClaw touched 921 items in 24h vs. ~50–100 for mid-tier projects — roughly **5–9× peer activity**.

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Scale and throughput** — 259 merged PRs in 24h exceeds the total activity of every other project combined; issue/PR ID space (~144k) indicates the largest historical contributor base.
- **Release discipline** — the only project running a formal LTS + rolling dual track (terminal June LTS v2026.6.35, rolling 2026.9.3), with migration tooling (`openclaw doctor`) and security-review gating on features.
- **Structured triage** — `clawsweeper` queueing labels convert bug reports into scoped fix candidates; maintainer-curated beta feedback threads (#125626) show deliberate release QA.
- **Widest integration matrix** — channels span WhatsApp/Discord/Slack/Signal/iMessage/Teams/Telegram/Feishu; no peer matches this breadth.

**Technical approach differences:** Node/TypeScript plugin-and-gateway architecture with SQLite-backed `memory-core`, vs. Hermes' Python/Electron fleet desktop, QwenPaw's Python IM-first stack, and the Rust multi-crate designs of ZeroClaw/IronClaw. OpenClaw optimizes for breadth (providers, channels, plugins); ZeroClaw optimizes for formal security posture (RFC-driven, attestation, plane isolation); Hermes for operator cost governance.

**Weaknesses relative to peers:** memory-core is the ecosystem's single largest instability cluster (SQLite lock storms, 19 GB orphaned temp DBs, multi-GB unbounded growth) — a scale problem peers haven't hit yet. Windows restart fragility (#140162) lags QwenPaw's desktop attention; no mobile story vs. QwenPaw's clear mobile push; security-boundary bugs (#112110 subagent MCP authz, #144269 tool-restriction regain) mirror ZeroClaw's S0s but with less formal process.

**Community size:** OpenClaw > Hermes ≈ ZeroClaw ≈ QwenPaw (mid-tier) > IronClaw (small). Hermes' 85-comment coordination thread and QwenPaw's 24-comment roadmap thread show engaged but smaller bases; IronClaw recorded zero comments/reactions all day.

---

## 4. Shared Technical Focus Areas

| Emerging requirement | Projects | Specific needs |
|---|---|---|
| **Memory subsystem reliability + cost** | OpenClaw, QwenPaw, Hermes, ZeroClaw | SQLite contention & retention policy (OpenClaw #117262, #114612; Hermes #107688); cheap background memory model (QwenPaw #7664); memory startup fallback (QwenPaw #7663); lineage cost accounting (Hermes #107775) |
| **Windows / cross-platform parity** | OpenClaw, Hermes, ZeroClaw, QwenPaw | ZeroClaw: 74 Windows test failures (#7462); Hermes: 8+ Windows bugs incl. AppHangB1 & orphaned Chrome; OpenClaw: gateway stale-process kill (#140162); QwenPaw: Windows sandbox bypass (#7672) |
| **Subagent / delegation authorization** | OpenClaw, ZeroClaw, (QwenPaw) | Delegate allowlist bypass (ZeroClaw #8279), shell symlink escape (#9247); subagent MCP tool scope evaluated against parent (OpenClaw #112110); tool restrictions regained on sub-delegation (OpenClaw #144269); subagent_model ignored (QwenPaw #7676) |
| **Durable channel delivery semantics** | OpenClaw, QwenPaw, ZeroClaw, Hermes | Durable ingress drain (OpenClaw #109657); Feishu queue deadlock (QwenPaw #7534); A2A empty-text resolution (Hermes #87822); ACP turn loss (ZeroClaw #9333); Telegram media batching (ZeroClaw #5514) |
| **Token-cost observability** | Hermes, OpenClaw, QwenPaw, ZeroClaw | Hermes: 4 converging threads (per-session retention, per-task kanban, compression lineage, models.dev fallback); OpenClaw: 686-token/turn scaffolding with no opt-out (#141747); ZeroClaw: context meter undercounts images (#9332) |
| **Process lifecycle hygiene** | OpenClaw, Hermes | Zombie hook/codex children + CPU-bound relay (OpenClaw #97616, #91009); 200+ orphaned Chrome processes, reaper misses two lanes (Hermes #32047, #100855) |
| **Multi-tenancy / fleet** | QwenPaw, Hermes, IronClaw, ZeroClaw | Hub team edition roadmap (QwenPaw #7318 — hottest thread); fleet profile governance (Hermes); per-caller hosted-MCP catalog keying (IronClaw #8090 — cross-user leak); principal memory + plane isolation (ZeroClaw #10268) |

---

## 5. Differentiation Analysis

| Dimension | OpenClaw | Hermes | IronClaw | QwenPaw | ZeroClaw |
|---|---|---|---|---|---|
| **Feature focus** | Broadest provider/channel matrix, plugin ecosystem, migration tooling | Fleet ops, kanban, cost accounting, A2A | Telegram polish, hosted MCP, benchmark QA | IM-first (Feishu/WeCom/QQ + int'l), mobile UX, team Hub | Security model, local models (Qwen3.6 JIT, Hailo), attestation |
| **Target users** | Power users/self-hosters + LTS enterprises | Fleet/desktop operators (Windows-heavy) | Small hosted deployments | IM-resident assistant users → teams | Security-conscious, local/edge, governance-oriented |
| **Architecture** | Node gateway + SQLite memory-core, plugin adapters | Python + Electron + WS gateway | Rust core + WebUI extensions | Python Console/TUI + IM channels + ClawHub | Rust multi-crate workspace, RFC-driven |
| **Maturity signal** | LTS program exists | Release cadence broken | Quietly stable | Beta → stable transition | Pre-1.0, mid-rewrite |

**Notable contrast:** ZeroClaw treats security as architecture (RFC #7141 rewrite touches every crate), while OpenClaw treats security as review-gating on a broad surface — with correspondingly more perimeter (channel leaks like Teams #136360, subagent authz gaps). QwenPaw is the only project with a clear mobile-native trajectory; Hermes is the only one where cost governance is the organizing release theme.

---

## 6. Community Momentum & Maturity

- **Tier 1 — Hyperactive (OpenClaw):** sustained 400+ issue / 500 PR daily volume with active maintainer grooming; debt is scale-driven, not neglect-driven.
- **Tier 2 — Active (Hermes, ZeroClaw, QwenPaw):** Hermes and ZeroClaw show *motion without shipping* — 0 releases, near-0 merges — for different reasons (organizational block #88584 vs. deliberate refactor gate). QwenPaw is the healthiest mid-tier: beta shipping, 36% issue close rate, constructive roadmap engagement.
- **Tier 3 — Maintenance (IronClaw):** Dependabot-dominated, single substantive merge (Telegram command menu), daily benchmark taxonomy as the main pulse.

**Rapidly iterating:** OpenClaw, QwenPaw. **Stabilizing:** IronClaw (already stable), Hermes (needs to convert merged work into a release). **Refactor-gated:** ZeroClaw — nothing lands until the 8-deep security stack merges; risk concentration is high.

---

## 7. Trend Signals

1. **Windows parity is the ecosystem's biggest unmet need** — explicit failures in 4 of 5 projects (CI gaps, process leaks, restart fragility). Developers targeting broad adoption should treat Windows CI and process lifecycle as first-class, not port-later.
2. **Cost observability is becoming table stakes** — four projects show user demand for per-session/per-task token accounting, cheap background models for memory writes, and scaffolding-token transparency. Expect "cost governance" to be a named release theme (Hermes' likely v0.22 is the leading indicator).
3. **The personal→team transition is industry-wide** — Hub editions, fleet profiles, hosted-MCP tenant isolation, and principal plane isolation all appeared this cycle. Multi-user correctness (per-credential keying, cross-session isolation) is the next competitive battleground.
4. **Memory subsystems are the #1 technical-debt hotspot** — SQLite contention, retention, and fallback behavior recur across four projects; bounded growth and observability are the emerging requirements.
5. **Delegation security is a systemic gap** — three projects have open subagent/sandbox authorization bypasses. Any framework exposing sub-agents or tool allowlists should audit parent→child scope propagation now.
6. **Durable delivery semantics outrank new features** — queue deadlocks, ambiguous receipts, and lost final replies dominate complaint threads; users describe these as trust failures, not bugs.
7. **Infrastructure diversification** — EU-hosted providers (mittwald), edge accelerators (Hailo), and local JIT models signal demand for sovereignty and on-device options alongside the hosted-API default.

**Bottom line for technical decision-makers:** OpenClaw offers the most mature, best-supported foundation today but carries visible memory-subsystem risk; QwenPaw is the strongest rising alternative for IM- and mobile-centric deployments; ZeroClaw is one to watch post-security-rewrite; Hermes and IronClaw currently serve narrower, more specific operator profiles.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-11

## 1. Today's Overview

Hermes Agent shows **elevated triage activity but no shipped releases** on 2026-09-11: 50 issues and 50 PRs were touched in the last 24 hours, with a 90% open ratio on both sides. The dominant theme is **Windows desktop regression noise** — at least four P1/P2 issues filed today describe the same packaged-build plugin-loader crash (`Object.keys(undefined)` in SDK GLOBALS), which is sapping maintainer bandwidth even though fixes are already staged in adjacent PRs (#107776, #107773). Reliability work on the cron subsystem, gateway message delivery, and per-session cost accounting continues, while a sustained stream of feature requests (kanban usage aggregation, fleet profile governance, mittwald provider) signals an active ecosystem but also growing product surface area.

## 2. Releases

**No new releases in the last 24 hours.** No version tags, no changelog updates. Given the volume of merged fixes on `main` (cost accounting, kanban notifications, sidebar z-index, FastMCP callbacks), the next patch release is likely overdue.

## 3. Project Progress

Two PRs are recorded as merged/closed, but the dataset does not surface their merge commits explicitly. Substantive open work advancing today:

| PR | Title | Impact |
|---|---|---|
| [#84236](https://github.com/NousResearch/hermes-agent/pull/84236) | fix(agent): visible closing message and structured stop_kind for interrupted turns | Improves gateway UX when turns are interrupted |
| [#107776](https://github.com/NousResearch/hermes-agent/pull/107776) | fix(desktop): ensure sidebar toggle stays above panel tabs (z-index) | Closes #107774 |
| [#107775](https://github.com/NousResearch/hermes-agent/pull/107775) | fix(state): sum lineage costs in `_project_compression_tips` and include continuations in usage_totals | Cost auditability fix for compressed sessions |
| [#107777](https://github.com/NousResearch/hermes-agent/pull/107777) | fix(tools): hosted OCR resolves `FIRECRAWL_API_KEY` through the profile secret scope | Final stray tool credential moves onto `secret_scope` |
| [#107779](https://github.com/NousResearch/hermes-agent/pull/107779) | feat(kanban): carry worker follow-ups into terminal notifications | Closes a documented gap in fleet kanban ops |
| [#107773](https://github.com/NousResearch/hermes-agent/pull/107773) | fix(desktop): commit Quick Entry route before submitting | Fixes renderer/React race in New-session flow |
| [#67037](https://github.com/NousResearch/hermes-agent/pull/67037) | fix: share compression budget with context engines | Aligns external engine capacity with `ContextCompressor` |
| [#56625](https://github.com/NousResearch/hermes-agent/pull/56625) | fix(dashboard): add models.dev pricing fallback for unknown providers | Resolves `n/a` cost for custom endpoints |
| [#56628](https://github.com/NousResearch/hermes-agent/pull/56628) | feat(cli): expand `/sessions` with delete, rename, prune subcommands | In-TUI session housekeeping |
| [#107755](https://github.com/NousResearch/hermes-agent/pull/107755) | feat: add mittwald AI Hosting as a first-class provider | EU-hosted OpenAI-compatible inference |
| [#107778](https://github.com/NousResearch/hermes-agent/pull/107778) | feat(catalog): add four ChuggiesMart plugins | Community plugin catalog expansion |
| [#107748](https://github.com/NousResearch/hermes-agent/pull/107748) | fix(git): carry user `safe.directory` past non-interactive config isolation | Prevents git ownership errors in internal plumbing |

## 4. Community Hot Topics

The most-discussed threads concentrate on **infrastructure fragility** rather than new features:

1. **[#88584 — Automated Nous integration is blocked](https://github.com/NousResearch/hermes-agent/issues/88584)** — 85 comments, by far the loudest thread. A scheduled Nous→Enterkey merge has conflicts in `cron/jobs.py`, blocking automated integration. The high comment count despite zero reactions signals **organizational friction** between the Nous and Enterkey tracks; this is not a bug but a coordination bottleneck that maintainers have not resolved in nearly a month. 🔗 <https://github.com/NousResearch/hermes-agent/issues/88584>

2. **[#84361 — Desktop MEDIA file links dead](https://github.com/NousResearch/hermes-agent/issues/84361)** — 8 comments. Two independent defects (tag regex absorbing trailing markdown + `file://` URL string concat) silently break media link clicks. No fix PR visible.

3. **[#32047 — agent-browser leaves 200+ orphaned Chrome processes](https://github.com/NousResearch/hermes-agent/issues/32047)** — 6 comments. A significant resource leak on Windows, related to the newer [#100855](https://github.com/NousResearch/hermes-agent/issues/100855) which proves the orphan reaper misses the `browser_exec` / real-profile lanes structurally. Underlying need: **process lifecycle hygiene on Windows**.

4. **[#43073 — .sh cron scripts fail on Windows](https://github.com/NousResearch/hermes-agent/issues/43073)** — 5 comments. Backslash path mangling through `str(path)` in the scheduler-to-bash bridge.

5. **[#65094 — Custom Codex-compatible /v1 providers omit Hermes session headers](https://github.com/NousResearch/hermes-agent/issues/65094)** — 5 comments. `ResponsesApiTransport.build_kwargs()` swallows `session_id` for third-party OpenAI-compatible endpoints. 🔗 <https://github.com/NousResearch/hermes-agent/issues/65094>

6. **[#37632 — `hermes -z` SIGABRT on exit](https://github.com/NousResearch/hermes-agent/issues/37632)** — 5 comments. Honcho memory daemon threads blocked in httpx I/O during interpreter finalization — a classic daemon-shutdown race. 🔗 <https://github.com/NousResearch/hermes-agent/issues/37632>

## 5. Bugs & Stability

### P1 (Critical — Production-blocking)

| Issue | Component | Symptom | Fix PR? |
|---|---|---|---|
| [#103786](https://github.com/NousResearch/hermes-agent/issues/103786) | Desktop / Windows | Gateway-retry loop blocks Electron main thread → AppHangB1; remote WS freezes with ~900 KB unread buffer | None |
| [#107484 (closed)](https://github.com/NousResearch/hermes-agent/issues/107484), [#107304 (closed)](https://github.com/NousResearch/hermes-agent/issues/107304), [#107721](https://github.com/NousResearch/hermes-agent/issues/107721) | Desktop plugins | Packaged Windows build: ALL runtime disk plugins fail with `Object.keys(undefined)` in SDK GLOBALS | PR exists in [#107721](https://github.com/NousResearch/hermes-agent/issues/107721) thread; no canonical fix merged yet |
| [#107688](https://github.com/NousResearch/hermes-agent/issues/107688) | Dashboard | Unconditional writable SessionDB open at startup exposes documented concurrent-FTS-rebuild corruption vector | None |

### P2 (Major)

| Issue | Summary | Fix PR? |
|---|---|---|
| [#107559](https://github.com/NousResearch/hermes-agent/issues/107559) | Cron `run` re-fire permanently blocked by stale in-memory firing lock after completed manual run | None |
| [#107666](https://github.com/NousResearch/hermes-agent/issues/107666) | Desktop cron lists jobs with `profile=all` but saves with the active profile — non-owner scope 404s | None |
| [#107685](https://github.com/NousResearch/hermes-agent/issues/107685) | Windows self-update reports a healthy install as FAILED (exit 8) on the run carrying its own verify fix | None |
| [#103633](https://github.com/NousResearch/hermes-agent/issues/103633) | MCP OAuth code→token exchange never completes for `/mcp`-path servers; retry crashes on "callback port already in use" | None |
| [#91547](https://github.com/NousResearch/hermes-agent/issues/91547) | `hermes gateway restart` races its own port, then runs indefinitely with no API server | None |
| [#87822](https://github.com/NousResearch/hermes-agent/issues/87822) | a2a: fast single-turn `message/send` resolves `TASK_STATE_COMPLETED` with empty text (notify resolution loses to fallback) | None |
| [#95753](https://github.com/NousResearch/hermes-agent/issues/95753) | A2A reply text has first 1-2 characters stripped from persisted conversations | None |

**Pattern:** Of the day's ~12 high-severity bugs, **only 2-3 have an open fix PR**. The plugin-loader regression in particular has three duplicate reports filed the same day but no shipped fix — a worrying regression-tracking gap.

## 6. Feature Requests & Roadmap Signals

Active feature work today maps cleanly to two themes: **fleet/enterprise governance** and **observability/cost accounting**.

| Signal | Issues/PRs | Next-version likelihood |
|---|---|---|
| **Per-session cost retention** after finalization (#102848), per-task kanban token aggregation (#107744), compression-tip cost summing (#107775), models.dev pricing fallback (#56625) | 4 parallel efforts | **High** — all small, internally consistent, and three already in PR review |
| **Fleet profile governance** — typo-tolerant profile switcher + fleet view (#107681); deleted Desktop bot profile durability (#94842); cross-profile cron isolation (#107666) | 3 issues, 1 PR | **Medium** — desktop UX work, likely patch in next desktop release |
| **Secrets model clarification** — source-apply vs. wrap contracts (#107700), docs warning (#107698) | 2 paired docs/feature issues | **High** — pure documentation work, low risk |
| **Provider expansion** — mittwald EU hosting (#107755), Xiaomi MiMo via models.dev (#56625) | 2 PRs | **Medium** — community-driven, will land as catalog additions |
| **Kanban worker follow-up notifications** (#107779) | 1 PR | **High** — small, targeted |
| **In-TUI session manager** (`/sessions delete/rename/prune`) (#56628) | 1 PR | **Medium** — UX polish, already in review since July |
| **Trusted scheduled-run hooks** (#93977) | 1 PR, `needs-decision` | **Low–Medium** — `needs-decision` label is the bottleneck |
| **Hillclimb playbook skill** (#47156) | 1 issue, no PR | **Low** — long-stalled since June |

The strongest signal is **cost observability**: four independent threads (#102848, #107744, #107775, #56625) all push the same direction (per-session, per-task, per-lineage), suggesting a coordinated v0.22 cost-governance release.

## 7. User Feedback Summary

**Real pain points (verbatim themes):**

- **Windows desktop is the failure surface.** At least 8 of today's issues are Windows-specific (AppHangB1, orphaned Chrome, plugin loader crash, backslash path mangling, self-update false-FAIL, .sh cron, desktop cron profile scope, gateway WS freeze). Maintainers are clearly under-indexed on Windows CI coverage.
- **Cron subsystem is a multi-front liability.** Profile scoping (#107666), in-memory lock leaks (#107559), usage-audit bypass (closed [#96391](https://github.com/NousResearch/hermes-agent/issues/96391)), Docker/Kanban import failures (#107661, #107758), and the Nous→Enterkey merge block (#88584) all converge on the same module.
- **Plugin ecosystem is brittle at packaging time.** The same regression (SDK GLOBALS captured before namespace assignment) broke every on-disk plugin in the packaged Windows build, with three users discovering it independently the same day — a sign the bundled-build path is not part of standard CI.
- **Cost auditing is incomplete and inconsistent.** Users report usage rows purged on session finalize (#102848), manual cron runs invisible to audit ([#96391](https://github.com/NousResearch/hermes-agent/issues/96391)), compression lineage under-counted (#107775), and unknown providers showing `n/a` (#56091→#56625). Pain is concrete: "spend is not auditable locally."
- **Gateway message-delivery edge cases are a recurring tail.** `message/send` empty-text bug (#87822), `/model` payload multi-line bug (#22982), `/title` mid-turn (#98177), `/stop` silent stops (#84236), A2A text truncation (#95753). Each is small individually; together they paint a picture of a gateway with many rough edges.
- **Quick Entry race** (#107773) is the kind of low-severity UX bug that nonetheless degrades first-run impression — new sessions occasionally land in the wrong state.

**Satisfaction signal:** Despite the bug density, several users are pushing **constructive fleet features** (per-task cost aggregation #107744, profile typo hardening #107681, kanban notifications #107779), indicating engaged operator-tier users who are investing in the platform.

## 8. Backlog Watch

Items with clear value but **no recent maintainer response or decision**:

| Item | Age | Why it needs attention |
|---|---|---|
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) | ~25 days, 85 comments | **Highest comment count, zero reactions.** A blocked integration between Nous and Enterkey is generating sustained discussion with no resolution. Owner coordination, not code. |
| [#84361](https://github.com/NousResearch/hermes-agent/issues/84361) | ~30 days, 8 comments | MEDIA link dead in desktop chat — first-impression bug, no fix PR. |
| [#32047](https://github.com/NousResearch/hermes-agent/issues/32047) | ~109 days, 6 comments | 200+ orphaned Chrome processes on Windows. Resource leak, structurally related to #100855 which proves the reaper misses two lanes. Needs a structural fix, not a patch. |
| [#93977](https://github.com/NousResearch/hermes-agent/pull/93977) | ~18 days, `needs-decision` | Trusted scheduled-run hooks PR — framework work, awaiting maintainer design decision. |
| [#47156](https://github.com/NousResearch/hermes-agent/issues/47156) | ~87 days, 1 comment | Hillclimb playbook skill proposal, originally based on a Cursor plugin commit. Low engagement but concrete and self-contained. |
| [#102848](https://github.com/NousResearch/hermes-agent/issues/102848) | ~7 days | Per-session cost retention feature — coordinates naturally with #107775 and #107744; merits a tracking issue. |
| [#107484](https://github.com/NousResearch/hermes-agent/issues/107484) / [#107304](https://github.com/NousResearch/hermes-agent/issues/107304) (closed as duplicates) | closed today, but **root cause not visibly fixed** | Plugin loader regression produced three duplicate reports in 24h. The duplicates are closed; the underlying bug remains open. Risk: users see "closed" and assume resolved. |

---

**Project health scorecard (qualitative):** Triage throughput is healthy (50/50 issues & PRs touched daily), but **release cadence has stalled** (0 releases) and **Windows-desktop regressions are not caught pre-merge**. The plugin-loader and cron subsystems need dedicated hardening sprints. Cost-accounting work is converging toward a coherent next release and should be prioritized. The #88584 coordination block is the single most-visible trust risk and warrants a maintainer-level response.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-11

## 1. Today's Overview

IronClaw activity on 2026-09-11 reflects a maintenance-heavy day rather than headline feature development. Of the 8 PRs touched in the trailing 24 hours, 5 are automated Dependabot dependency bumps (Rust crates, vitest, js-yaml, baseline-browser-mapping), and only 3 are substantive human-authored changes. One new issue was filed — a recurring daily failure taxonomy report rather than a bug report. No new releases were published. Overall project health appears stable, with a focus on dependency hygiene and incremental UX/correctness fixes across the Telegram extension, WebUI chat composer, and MCP catalog integration.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

Two PRs were closed/merged during the period:

- **[#8080](https://github.com/nearai/ironclaw/pull/8080)** — *closed*: Dependabot batch that bundled 21 Rust crate updates across the main directory. Superseded by [#8097](https://github.com/nearai/ironclaw/pull/8097), which carries 24 updates including the same `uuid`/`base64`/`rust_decimal` upgrades plus additional packages. Closing without merge likely signals Dependabot's auto-supersede behavior.
- **[#8072](https://github.com/nearai/ironclaw/pull/8072)** — *closed*: `feat(telegram): register the Bot API command menu at activation` by @thisisjoshford. This is the most substantive merge in the window: Telegram's chat menu button (the "hamburger" near the composer) now lists the channel's declared commands — `/model`, `/status`, `/new`, `/stop`, `/interrupt` — registered via `setMyCommands` at extension activation and cleared best-effort via `deleteMyCommands` at deactivation. Classified as `size: L`, `risk: low`, scope: docs + dependencies, contributor: experienced. This is a tangible UX improvement for Telegram users.

Net progress: 1 merged feature (Telegram command menu), 1 closed-and-superseded Dependabot PR.

## 4. Community Hot Topics

Engagement (comments + reactions) is uniformly low across all items today — every entry shows 0 comments and 0 reactions. The most substantively discussed topic, by content rather than by comment count, is:

- **PR [#8090](https://github.com/nearai/ironclaw/pull/8090)** — `fix(mcp): key discovered hosted-MCP catalogs per caller, not per extension` by @kirikov (created 2026-09-08, updated 2026-09-10). Underlying need: **multi-tenancy correctness on hosted-MCP servers**. When the tool list depends on the user's credential, all users currently share one slot in the registry keyed by extension id, so the last writer overwrites prior discoveries. This is a cross-user data-leakage / availability bug on shared infrastructure, and the underlying need — per-credential isolation in the MCP catalog registry — likely affects any production hosted deployment.
- **Issue [#8093](https://github.com/nearai/ironclaw/issues/8093)** — *Daily ironclaw failure taxonomy — 2026-09-10* by @pranavraja99. This is a recurring operational report (not a community discussion) categorizing non-pass tasks in the officeqa benchmark suite (42 failures attributed primarily to genuine model errors on DeepSeek-V4-Flash). Underlying need: **systematic observability of benchmark regressions**, useful for maintainers triaging upstream model behavior.

## 5. Bugs & Stability

Two open bug-fix PRs are notable:

| Severity | Item | Issue | Fix PR |
|---|---|---|---|
| Medium | IME composition broken in WebUI chat composer (CJK input methods, Safari quirks with `keyCode 229`/`isComposing=false`) | UX regression for non-Latin users | [#8092](https://github.com/nearai/ironclaw/pull/8092) by @huiq777 (open) |
| High | Hosted-MCP catalog collisions across users — tool list leaks/overwrites per credential | Cross-user state corruption on hosted servers | [#8090](https://github.com/nearai/ironclaw/pull/8090) by @kirikov (open) |

Neither has a corresponding user-reported issue in the visible data window — both surfaced directly as PRs with detailed root-cause analysis. Both fixes are still open and awaiting maintainer review/merge.

The Telegram "command menu" PR ([#8072](https://github.com/nearai/ironclaw/pull/8072)) was closed/merged, suggesting that work landed successfully. No new crash reports or regressions were filed in the window.

## 6. Feature Requests & Roadmap Signals

No explicit feature-request issues were opened in the last 24 hours. However, the merged work hints at near-term priorities:

- **Telegram-native UX polish** — the Bot API command-menu registration ([#8072](https://github.com/nearai/ironclaw/pull/8072)) suggests Telegram is being treated as a first-class surface; future versions are likely to continue aligning Telegram behavior with native Bot API conventions.
- **Hosted-MCP multi-tenant hardening** — [#8090](https://github.com/nearai/ironclaw/pull/8090) signals that hosted/server deployments are a real usage pattern, and per-caller keying is the first step toward proper tenant isolation. Likely to be followed by additional audit/auth work in this area.
- **WebUI internationalization** — [#8092](https://github.com/nearai/ironclaw/pull/8092) (IME composition) implies the WebUI has CJK users; expect more input-method and RTL fixes.

No public roadmap updates or release-tagged feature lists were issued.

## 7. User Feedback Summary

Direct user feedback (comments, reactions, issue text from non-maintainers) is sparse in this 24-hour window:

- **Pain point surfaced via PR, not issue**: the hosted-MCP catalog collision ([#8090](https://github.com/nearai/ironclaw/pull/8090)) — a multi-user scenario where "users overwrite each other's tools" — indicates dissatisfaction with the current single-slot discovery model on shared infrastructure.
- **Pain point surfaced via PR**: the IME composition bug in the chat composer ([#8092](https://github.com/nearai/ironclaw/pull/8092)) — Safari's `isComposing=false` + `keyCode 229` quirk breaks natural typing for CJK input users; the PR explicitly adds regression cases for plain text and IME scenarios, suggesting prior user complaints.
- **Operational signal**: the daily failure-taxonomy issue ([#8093](https://github.com/nearai/ironclaw/issues/8093)) indicates that benchmark non-passes are being triaged daily, with model errors (DeepSeek-V4-Flash navigation) dominating the officeqa run. This is maintainer-driven observability rather than end-user feedback.

No satisfaction/dissatisfaction metrics are derivable from the available data.

## 8. Backlog Watch

Within the 24-hour window, no long-unanswered items were updated — all activity is fresh. Items worth maintainer attention that remain open and unmerged:

- **[#8097](https://github.com/nearai/ironclaw/pull/8097)** — bulk Dependabot PR with 24 package updates; needs review/conflict resolution before merge to avoid further supersede churn.
- **[#8090](https://github.com/nearai/ironclaw/pull/8090)** — multi-tenant MCP catalog fix; high-impact for hosted deployments, should be prioritized for security/correctness.
- **[#8092](https://github.com/nearai/ironclaw/pull/8092)** — IME composition fix; affects international users, low-risk merge candidate.
- **[#8096](https://github.com/nearai/ironclaw/pull/8096)**, **[#8094](https://github.com/nearai/ironclaw/pull/8094)**, **[#8095](https://github.com/nearai/ironclaw/pull/8095)** — routine JS/dev-dependency bumps in `ironclaw_webui/frontend` and `docs/internal/architecture-video`; safe but currently clogging the open-PR queue alongside substantive work.

No older issues or PRs were touched in this window that would indicate backlog aging.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-11

## 1. Today's Overview

QwenPaw is in an active beta-cycle phase, with the project publishing its second beta build of the 2.2.1 line ([v2.2.1-beta.2](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.2)) within the last 24 hours. Community activity is healthy: 28 issues and 35 PRs were touched in the last day, with a healthy close/open ratio on issues (10 closed vs. 18 open) suggesting good triage velocity. The release signal is dominated by mobile and Console refinements (mobile agent selector, CSS selector alignment), while backend work spans MCP reliability, memory backend fallbacks, and FTS history corruption. A small but notable cluster of cross-session and channel-correctness bugs (Feishu, WeCom, Telegram, mail monitor) were closed, indicating the team is systematically working through channel stability debt ahead of a stable 2.2.1.

## 2. Releases

### [v2.2.1-beta.2](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.2)

A beta cut of the 2.2.1 line, with the following notable changes pulled in:

- **Console mobile agent selector improved** ([PR #7623](https://github.com/agentscope-ai/QwenPaw/pull/7623)) — better UX when picking an agent on mobile devices.
- **Console CSS selectors aligned** — stability/maintainability fix for the web UI.
- **Version bump to 2.2.1b2** ([PR #7643](https://github.com/agentscope-ai/QwenPaw/pull/7643)).

> Note: This is a beta, not a stable release. A pre-release installation-verification duty is tracked in [Issue #7674](https://github.com/agentscope-ai/QwenPaw/issues/7674), with a 4-hour pass/fail window after publish. No breaking-change notes were published alongside this release.

## 3. Project Progress

Closed PRs and landed work over the last 24 hours:

| PR | Title | Impact |
|---|---|---|
| [#7647](https://github.com/agentscope-ai/QwenPaw/pull/7647) | fix(channels): support Base64 data URLs in outbound media | Resolves the WeCom "OSError [Errno 36] File name too long" class of bugs; agents can now emit images as `data:<mime>;base64,...` safely. |
| [#7663](https://github.com/agentscope-ai/QwenPaw/pull/7663) | fix(memory): fall back when plugin backend is unavailable | Memory layer no longer hard-fails workspace startup when a configured plugin is missing; built-in ReMeLight is used as a graceful fallback. |
| [#7667](https://github.com/agentscope-ai/QwenPaw/pull/7667) | fix(files): show upload only in workspace | Frontend scope cleanup — upload action no longer leaks into read-only tabs (Profile, Daily, Digest). |
| [#6978](https://github.com/agentscope-ai/QwenPaw/pull/6978) | feat(commands): add session management slash commands (`/sessions`, `/session`) | Brings session listing/switching to IM channels (Matrix, QQ, Telegram) where previously only Console/TUI could manage sessions. |

Merged fixes collectively cover three reliability themes: **channel media handling** (Base64), **memory startup resilience**, and **session management parity across surfaces**.

## 4. Community Hot Topics

Most-discussed/reaction items in the last day:

1. **[Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) — *QwenPaw Hub multi-tenant roadmap* (24 comments, 4 👍, OPEN)**
   The single hottest conversation. Community is shaping what the Hub (team/enterprise) edition should ship next. Themes: multi-user access, admin-managed skills, and team workspace primitives. **Underlying need:** the personal-assistant roots are blocking team adoption, and the maintainers are explicitly soliciting input — a healthy open-governance signal.

2. **[Issue #7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — *Model replies silently drop out of context* (10 comments, CLOSED)**
   Severe correctness bug where the assistant's own messages were persisted but missing from subsequent turns, producing empty responses. **Underlying need:** deterministic round-trip persistence of multi-turn history.

3. **[Issue #7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) — *Improve the platform deploy landing page* (9 comments, OPEN)**
   UX feedback on `platform.agentscope.io/deploy` mobile ergonomics (entry placement, "Stop" placement risk). **Underlying need:** the deploy flow's first impression and touch ergonomics — a strong indicator of growing non-desktop usage.

4. **[Issue #7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) — *Console stop cancels an active Feishu session* (8 comments, CLOSED)**
   Cross-session identity leakage in the Console UI. **Underlying need:** stronger isolation between concurrent Console tabs/sessions, especially when IM channels are bound to the same backend.

5. **[Issue #7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) — *Feishu queue consumer stuck, session silently dies* (4 comments, OPEN)**
   A high-priority message path blocks the queue consumer without exception, freezing the DM. **Underlying need:** bounded queues with timeouts/watchdogs on Feishu message processing.

## 5. Bugs & Stability

| Severity | Issue | Component | Status | Fix PR? |
|---|---|---|---|---|
| **High** | [#7672](https://github.com/agentscope-ai/QwenPaw/issues/7672) Windows security sandbox bypass | Desktop / security | OPEN | None |
| **High** | [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) `subagent_model` ignored — subagents always inherit parent `active_model` | Core / agents | OPEN | None |
| **High** | [#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) Feishu queue consumer deadlocks session | Channel | OPEN | None |
| **Medium** | [#7661](https://github.com/agentscope-ai/QwenPaw/issues/7661) New conversation auto-duplicates on second prompt | Console | OPEN | None |
| **Medium** | [#7660](https://github.com/agentscope-ai/QwenPaw/issues/7660) Installation failure | Install | OPEN | None |
| **Medium** | [#7507](https://github.com/agentscope-ai/QwenPaw/issues/7507) WeCom streams character-by-character (150 ms throttle) | Channel | OPEN | None |
| **Medium** | [#7668](https://github.com/agentscope-ai/QwenPaw/issues/7668) `last_uid=0` defeats mail monitor first-run guard | Channel (mail) | OPEN | None |
| **Medium** | [#7445](https://github.com/agentscope-ai/QwenPaw/issues/7445) QwenPaw Hub fails to connect to local model service (2.2.0-beta.5) | Hub | OPEN | None |
| **Low** | [#3113](https://github.com/agentscope-ai/QwenPaw/issues/3113) Initial team-collaboration instruction ignored | Core | OPEN (long-lived) | None |

**Recently closed (already resolved):** [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) (context loss), [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) (cross-session cancel), [#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642) (Chrome streaming), [#7666](https://github.com/agentscope-ai/QwenPaw/issues/7666) (HF download), [#7662](https://github.com/agentscope-ai/QwenPaw/issues/7662) (Telegram proxy watchdog), [#3254](https://github.com/agentscope-ai/QwenPaw/issues/3254) (chat UUID race), [#7231](https://github.com/agentscope-ai/QwenPaw/issues/7231) (cross-session mix-up), [#7516](https://github.com/agentscope-ai/QwenPaw/issues/7516) & [#7370](https://github.com/agentscope-ai/QwenPaw/issues/7370) (WeCom Base64), [#7634](https://github.com/agentscope-ai/QwenPaw/issues/7634) (ClawHub duplicate-name install). All correspond to merged PRs ([#7647](https://github.com/agentscope-ai/QwenPaw/pull/7647) covers the WeCom media cluster).

**Pattern:** open bugs skew toward *cross-session / cross-channel identity* and *channel resilience*, while fixes are landing fastest on *media payload handling* and *frontend race conditions*. No open High-severity issue currently has a linked fix PR.

## 6. Feature Requests & Roadmap Signals

Today's open enhancements:

- **[#7671](https://github.com/agentscope-ai/QwenPaw/issues/7671) Auto-downscale oversized attached images instead of dropping them** — high-demand, low-risk change. Likely candidate for 2.2.x patch or 2.2.2.
- **[#7670](https://github.com/agentscope-ai/QwenPaw/issues/7670) Syntax highlighting in Files panel Preview** — pure UI/quality-of-life; feasible for a minor release.
- **[#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) RemeLight: dedicated `memory_model` config** — economical solution to the expensive-LLM-for-background-memory problem. Aligns with active ReMe work (see [PR #7444](https://github.com/agentscope-ai/QwenPaw/pull/7444) and [PR #6399](https://github.com/agentscope-ai/QwenPaw/pull/6399)).
- **[#7657](https://github.com/agentscope-ai/QwenPaw/issues/7657) ntfy channel support (working impl ready)** — self-hosted push fits the project's user base; a turnkey PR is offered.
- **[#7656](https://github.com/agentscope-ai/QwenPaw/issues/7656) Durable cross-session memory (3rd-party integration)** — interest in MemCode as an optional memory layer.
- **[#4175](https://github.com/agentscope-ai/QwenPaw/issues/4175) MCP client: `tls_verify` and `ca_file`** — long-standing enterprise networking ask.
- **[#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) `platform.agentscope.io/deploy` homepage overhaul** — UX request with growing mobile user base.

**Prediction for the next minor release (likely 2.2.1 stable or 2.2.2):** image auto-downscale, MCP TLS support, RemeLight `memory_model`, and at least one channel addition (ntfy is a strong candidate given a ready implementation). Hub roadmap signals from [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) are likely to shape a 2.3.x release.

## 7. User Feedback Summary

**Pain points emerging today:**

- **Mobile UX is being asked for everywhere** — Console mobile agent selector ([PR #7623](https://github.com/agentscope-ai/QwenPaw/pull/7623)), deploy-page mobile ergonomics ([#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177)), and a draft native mobile experience ([PR #7378](https://github.com/agentscope-ai/QwenPaw/pull/7378), DO NOT MERGE) all surfaced in the same window. This is the dominant unmet need.
- **Channel reliability is uneven.** WeCom streaming feels sluggish ([#7507](https://github.com/agentscope-ai/QwenPaw/issues/7507)), Feishu queues deadlock silently ([#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534)), Telegram can die behind proxies ([#7662](https://github.com/agentscope-ai/QwenPaw/issues/7662), already closed), and the mail monitor can re-process the entire inbox ([#7668](https://github.com/agentscope-ai/QwenPaw/issues/7668)). Users running QwenPaw as their IM-resident assistant are the loudest group.
- **Cost ergonomics matter.** Users on flagship LLMs are asking for cheaper background models for memory writes ([#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664)) — a direct signal that memory/backend cost has become a real-world friction.
- **Install/upgrade friction is real.** [#7660](https://github.com/agentscope-ai/QwenPaw/issues/7660) (install fail) and [#7666](https://github.com/agentscope-ai/QwenPaw/issues/7666) (HF model download from desktop) both within the last 24 hours.
- **Satisfaction signals:** the Hub discussion ([#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)) is constructive rather than frustrated — the maintainer team appears to be doing well at engaging the community on roadmap items.

## 8. Backlog Watch

Items with disproportionate age or attention deficit that warrant maintainer triage:

- **[#3113](https://github.com/agentscope-ai/QwenPaw/issues/3113) Team-collaboration instruction ignored (opened 2026-04-08)** — ~5 months old, still affecting a flagship "team mode" promise. No linked fix PR.
- **[#4175](https://github.com/agentscope-ai/QwenPaw/issues/4175) MCP `tls_verify` / `ca_file` (opened 2026-05-10)** — a routine enterprise-networking ask that has stalled for ~4 months. No linked fix PR.
- **[#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) Per-session model overrides (PR, opened 2026-

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-11

## 1. Today's Overview

ZeroClaw shows **high activity but zero throughput** in the 24-hour window: 50 issues and 50 PRs were updated, yet **0 issues were closed and 0 PRs were merged**, with no new releases. The activity surface is dominated by **S0/S1 security bugs** (delegate allowlist bypass, shell workspace boundary bypass, emergency-stop not wired into runtime, audit logging defaults to enabled-but-noisy) and a **long-running stacked PR series (#8289)** that rewrites the entire auth/security model around RFC #7141. CI/cross-platform hardening (Windows test parity, Rust cache critical path, release attestation consolidation) is also a major theme. Health-wise, the project is in active refactor mode rather than ship mode — high engagement, low velocity.

## 2. Releases

**No new releases** in the 24-hour window. The most recent documented release context references v0.8.3 (which shipped with three parallel provenance/signing mechanisms — see Issue [#9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101)).

## 3. Project Progress

**No PRs were merged or closed in the last 24 hours.** The merged-PR column is empty, so there is no feature advancement or fix landing to report today. All 50 PRs listed remain open.

Notable in-flight PRs (open, awaiting review/merge):
- [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) — fix(tools): honor allowed roots for git operations (security, XL)
- [#10511](https://github.com/zeroclaw-labs/zeroclaw/pull/10511) — feat(quickstart): block persist when the provider rejects the credential
- [#10768](https://github.com/zeroclaw-labs/zeroclaw/pull/10768) — feat(channels): add Sendblue iMessage/SMS channel (new channel)
- [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) — feat(providers): native Hailo-Ollama support (do-not-merge)
- [#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248), [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255), [#10265](https://github.com/zeroclaw-labs/zeroclaw/pull/10265), [#10268](https://github.com/zeroclaw-labs/zeroclaw/pull/10268), [#10270](https://github.com/zeroclaw-labs/zeroclaw/pull/10270), [#10274](https://github.com/zeroclaw-labs/zeroclaw/pull/10274), [#10275](https://github.com/zeroclaw-labs/zeroclaw/pull/10275), [#10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321) — staged stack for RFC #7141 security overhaul (8 deep chain)

## 4. Community Hot Topics

**Top by comment volume (Issues):**

1. [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) — **74 test failures on Windows** (19 comments). The single most-discussed issue. Root need: Windows is treated as second-class — CI only runs tests on Linux while users run Windows/macOS daily. Symptom: Unix-only test commands, path semantics, console encoding (code page 936) all break.
2. [#9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) — **Consolidate release attestation** (9 comments). Need: simplify the triplicate signing story (cosign + GitHub attestations + slsa-github-generator) down to one mechanism and ~20 release assets.
3. [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — **RFC: Simplify RFC voting** (8 comments). Need: drop mandatory 48h/72h discussion windows and let REVISE halt the current snapshot — i.e., reduce process overhead.
4. [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — **Batch Telegram media groups into one multimodal turn** (8 comments). Need: multi-image messages should be one LLM call, not N calls.
5. [#6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) — **Nextcloud Talk bot message API wrong** (8 comments, blocked). Need: actual message delivery on Nextcloud Talk channel.

**Top by structure (PRs):** The 8-deep PR stack for [RFC #7141](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) (JordanTheJet) dominates PR activity — it touches every crate (agent, channel, config, daemon, gateway, memory, runtime, security, tool, tests) and represents the largest cross-cutting refactor visible in the dataset.

## 5. Bugs & Stability

Ranked by severity (S0 = data loss / security risk, S1 = workflow blocked):

| Sev | Issue | Component | Fix PR? |
|-----|-------|-----------|---------|
| **S0** | [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) delegate bypasses parent's tool allowlist — sub-agent can invoke tools parent policy excludes | tool/delegate, security | None linked |
| **S0** | [#9247](https://github.com/zeroclaw-labs/zeroclaw/issues/9247) Shell tool workspace boundary bypass via symlink | tool/shell, security:policy | None linked |
| **S1** | [#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559) Agents stop when exiting chat window in web dashboard | web dashboard | None linked |
| **S1** | [#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207) `web_fetch` returns garbage for gzip/brotli/deflate | tool/web | None linked |
| **S1** | [#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) Failed ACP turns disappear after switching sessions | channel/acp | None linked |
| **S1** | [#9421](https://github.com/zeroclaw-labs/zeroclaw/issues/9421) Incomplete terminal responses reported as successful | runtime, multiple providers | None linked |
| **S1** | [#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794) Stopping agent mid-work erases tool calls & thinking from context | web dashboard | None linked |
| **S1** | [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) Cron agent jobs have no wall-clock timeout | runtime/cron | None linked |
| **S2** | [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) 74 Windows test failures (see above) | tooling/ci | Linked to [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) |
| **S2** | [#9284](https://github.com/zeroclaw-labs/zeroclaw/issues/9284) config flush can overwrite concurrent writes | runtime/daemon | None linked |
| **S2** | [#8800](https://github.com/zeroclaw-labs/zeroclaw/issues/8800) Killed zeroclaw process leaves port bound on Windows | gateway | None linked |
| **S2** | [#7899](https://github.com/zeroclaw-labs/zeroclaw/issues/7899) OpenAI STT provider ignores env-based credentials | channel | None linked |
| **S2** | [#9089](https://github.com/zeroclaw-labs/zeroclaw/issues/9089) Tool output supports `[IMAGE:]` but not `[AUDIO:]` markers | provider | None linked |
| **S2** | [#9332](https://github.com/zeroclaw-labs/zeroclaw/issues/9332) Multimodal context meter undercounts image-heavy requests | zerocode | None linked |
| **S2** | [#9177](https://github.com/zeroclaw-labs/zeroclaw/issues/9177) JIT loading fails for Qwen3.6-35B-A3B with "Engine protocol startup was aborted" | runtime | None linked |
| **S2** | [#9390](https://github.com/zeroclaw-labs/zeroclaw/issues/9390) Emergency stop is a CLI-only state file that no runtime path reads | cli/security | None linked |
| **S2** | [#9391](https://github.com/zeroclaw-labs/zeroclaw/issues/9391) Command audit logging defaults to enabled and writes nothing | security/audit | None linked |
| **S3** | [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) Telegram media groups not batched (above) | channel/telegram | None linked |
| **S3** | [#6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) Nextcloud Talk wrong API (above, blocked) | channel/nextcloud-talk | None linked |
| **S3** | [#9198](https://github.com/zeroclaw-labs/zeroclaw/issues/9198) Discord typing indicator stuck after daemon reload | channel/discord | None linked |
| **S3** | [#9363](https://github.com/zeroclaw-labs/zeroclaw/issues/9363) Config metadata remains English in localized UI | zerocode/web | None linked |

**Adjacent security findings** (filed by `belumume` from a host audit, no explicit severity tag but all reference security primitives):
- [#9393](https://github.com/zeroclaw-labs/zeroclaw/issues/9393) Bluesky and Reddit have no sender authorization and no central gate (P1)
- [#9390](https://github.com/zeroclaw-labs/zeroclaw/issues/9390) Emergency stop (see above)
- [#9391](https://github.com/zeroclaw-labs/zeroclaw/issues/9391) Audit log writes nothing (see above)
- [#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) Reconcile cargo-audit/deny drift + wasmtime-wasi CVEs (P1)

**Note on close-loops:** Of 22+ bug issues updated today, **zero have an explicitly linked fix PR merged or closed**. The stacked [#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) → [#10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321) chain will likely cover several of these when it lands, but it is still stacked 8 deep.

## 6. Feature Requests & Roadmap Signals

**Strong roadmap signals (PRs already in flight, likely next release):**
- **Sendblue iMessage/SMS channel** ([#10768](https://github.com/zeroclaw-labs/zeroclaw/pull/10768)) — non-Apple-host route onto iMessage.
- **Hailo-Ollama native provider** ([#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109), do-not-merge) — Hailo accelerator support.
- **Quickstart credential preflight** ([#10511](https://github.com/zeroclaw-labs/zeroclaw/pull/10511)) — block persist when provider rejects credentials.
- **OIDC `oidc.<alias>` token-verification provider** ([#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255)) — RFC #7141 stage 5.
- **Browser PKCE + cross-surface enrollment** ([#10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321)) — auth overhaul.
- **Browserless OIDC device-grant + client_credentials** ([#10270](https://github.com/zeroclaw-labs/zeroclaw/pull/10270)).
- **Private principal memory + plane isolation** ([#10268](https://github.com/zeroclaw-labs/zeroclaw/pull/10268)).
- **Retire Nevis/iam_policy** ([#10275](https://github.com/zeroclaw-labs/zeroclaw/pull/10275)) — replaces with shim.
- **Deferred RFC vote cycles docs** ([#10288](https://github.com/zeroclaw-labs/zeroclaw/pull/10288)) — governance update (FND-003 Rev. 17).

**Open enhancement issues (RFEs/feature requests) likely to convert to PRs soon:**
- [#9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) Consolidate release attestation (P1)
- [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) Telegram media-group batching
- [#7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108) Improve cached Rust builds / CI critical path
- [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) Run test suite on Windows/macOS in CI
- [#9089](https://github.com/zeroclaw-labs/zeroclaw/issues/9089) `[AUDIO:]` marker support (close to [#10480](https://github.com/zeroclaw-labs/zeroclaw/pull/10480) which quarantines rejected images)
- [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) RFC voting simplification
- [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) PR review evidence/freshness (has Rev. 2 with expedited merge lane)

**Predicting the next release:** v0.8.4 or v0.9.0 is most likely to land **only when the [#8289 stack](https://github.com/zeroclaw-labs/zeroclaw/pull/10248)** merges — that stack touches the security boundary of every surface. Until then, expect incremental bug-fix releases gated on [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337), [#9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635), [#10511](https://github.com/zeroclaw-labs/zeroclaw/pull/10511), and [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) (ACP interrupted turn recovery).

## 7. User Feedback Summary

**Recurring pain points (across issues):**

1. **Windows is a second-class citizen.** Three of the most-commented issues ([#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462), [#8800](https://github.com/zeroclaw-labs/zeroclaw/issues/8800), [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461)) explicitly involve Windows-specific bugs or test gaps. Users report killed processes leaving zombie LISTENING/CLOSE_WAIT ports on Windows 11 25H2.
2. **Security model has visible holes.** Multiple S0 issues filed by `belumume` from a host audit — emergency-stop file is CLI-only and unread by runtime, command audit logging is enabled by default but writes nothing, Bluesky/Reddit channels have no sender authorization. The audit is public and detailed (every cited line was opened and quoted from HEAD before filing). This signals low user trust in default security posture.
3. **Process friction.** Issue [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) explicitly complains that the 48h/72h RFC discussion windows "often does not produce more review" — community wants lighter governance.
4. **Web dashboard UX.** Three S1 web-dashboard bugs ([#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559), [#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794), [#9198](https://github.com/zeroclaw-labs/zeroclaw/issues/9198)) suggest the dashboard is brittle around session/cancel semantics — agents stop when user leaves, context is lost on cancel, typing indicators get stuck after reload.
5. **Channel reliability.** Telegram, Discord, Nextcloud Talk all have open bugs. The Telegram one ([#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514)) is dated 2026-04-08 — over 5 months open — suggesting low channel-team bandwidth.
6. **Multimodal gaps.** Users are pushing the multimodal story ([#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514), [#9089](https://github.com/zeroclaw-labs/zeroclaw/issues/9089), [#9332](https://github.com/zeroclaw-labs/zeroclaw/issues/9332), [#10480](https://github.com/zeroclaw-labs/zeroclaw/pull/10480)) — image batching

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*