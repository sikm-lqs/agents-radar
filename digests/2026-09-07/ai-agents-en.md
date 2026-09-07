# OpenClaw Ecosystem Digest 2026-09-07

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-07 13:28 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-07

## 1. Today's Overview

OpenClaw exhibits **high-volume triage activity with a healthy close rate**: 500 issues and 500 PRs were touched in the last 24 hours, with 223 issues closed and 250 PRs merged/closed (≈45% close rate on issues, 50% on PRs). Maintainer presence is unusually strong — `steipete` is the author on roughly two-thirds of today's PRs, indicating a focused stabilization push around the `openclaw update` pipeline, gateway plugins, and TUI performance. The issue mix is dominated by **P1 regressions from versions 2026.8.1 / 2026.8.2 / 2026.9.2**, suggesting that recent releases are still landing hot despite no new version cut today. No new releases were published, but multiple PRs (#140981, #141109, #141146, #141175) explicitly aim to harden release verification and update-flow correctness, signaling an imminent patch release.

## 2. Releases

No new releases in the last 24 hours. However, PR #140981 ("fix(release): restore verification inputs and supported upgrade proof") and PR #141146 ("fix: catch published upgrade regressions before merging") are direct prerequisites for the next release, and #141109 specifically targets state-schema upgrade completion for users on 2026.9.2. A patch release is likely imminent.

## 3. Project Progress

**Merged/closed PR activity (selection by impact):**

- [#141109](https://github.com/openclaw/openclaw/pull/141109) — `fix(update): let 2026.9.2 finish state-schema upgrades`. Prevents the updater from reopening a migrated database with old code; closes the loop on [#140784](https://github.com/openclaw/openclaw/issues/140784). **P1 maintainer.**
- [#140981](https://github.com/openclaw/openclaw/pull/140981) — `fix(release): restore verification inputs and supported upgrade proof`. Restores CI job identity, browser setup, CPU accounting, and upgrade fixtures; Telegram deterministic-fixture work is included. **P2 maintainer.**
- [#141146](https://github.com/openclaw/openclaw/pull/141146) — `fix: catch published upgrade regressions before merging`. Catches the class of defects found by the AWS Crabbox matrix across 12 published npm releases (5 defects previously fixed by #140778/#140784/#140886/#140825). **P2 maintainer.**
- [#141175](https://github.com/openclaw/openclaw/pull/141175) — `fix(update): installed plugins fail candidate validation`. Fixes staged-host plugin-load failures on case-insensitive volumes. **P1 maintainer.**
- [#141011](https://github.com/openclaw/openclaw/pull/141011) — `fix(update): support Homebrew installs and preserve stable LaunchAgent paths`. Resolves `brew install openclaw-cli` failing `openclaw update` and LaunchAgent path drift. **P2.**
- [#140309](https://github.com/openclaw/openclaw/pull/140309) — `fix(gateway): Tailscale serve fails at boot before the daemon connects`. Closes [#139097](https://github.com/openclaw/openclaw/issues/139097). **P1.**
- [#121204](https://github.com/openclaw/openclaw/pull/121204) — `fix(discord): keep stale ambient backlog from starving live mentions after gateway recovery`. **P1.**
- [#141125](https://github.com/openclaw/openclaw/pull/141125) — `fix(mcp): keep session servers alive between turns`. Restores an MCP session-idle override after the 10-minute default eviction was rejected. **P2 maintainer.**
- [#141217](https://github.com/openclaw/openclaw/pull/141217) — `improve(nodes): reduce remote session completion delays`. Finalization-batching replacement for [#132180](https://github.com/openclaw/openclaw/issues/132180). **P2.**
- [#141244](https://github.com/openclaw/openclaw/pull/141244) — `improve(tui): reduce preparation work during text and picker updates`. **XS maintainer.**
- [#141240](https://github.com/openclaw/openclaw/pull/141240) — `fix(gateway): UTF-16-safe public session title and message truncation`. Fixes surrogate-pair half-character emissions in shared-session HTML. **P2.**
- [#141239](https://github.com/openclaw/openclaw/pull/141239) — `fix(gateway): trim device.scopes.waitUpgrade requestId`. **P2.**
- [#141210](https://github.com/openclaw/openclaw/pull/141210) — `improve(anthropic): reduce setup work for large tool rosters`. **P2 maintainer, closed.**

## 4. Community Hot Topics

**Top issues by comment volume (24h, deep links):**

1. [#97616 — OpenClaw leaks unreaped hook/tool child processes, causing zombie accumulation (15 comments)](https://github.com/openclaw/openclaw/issues/97616). Long-standing P1 regression; needs process-group reaping for hook/tool spawns. Symptom: long-lived gateways degrade; not yet linked to a PR.
2. [#79077 — Telegram bot-to-bot and guest-bot modes (15 comments, 👍8)](https://github.com/openclaw/openclaw/issues/79077). Feature request against Telegram's 2026-05-07 release; closed as stale but still surfaces in top-comment lists — the community clearly wants native OpenClaw support for these primitives.
3. [#135111 — Intermittent "Provider completed tool call with malformed JSON arguments" on v2026.8.1 (15 comments)](https://github.com/openclaw/openclaw/issues/135111). P1 regression from 2026.7.1-2 → 2026.8.1 on `claude-sonnet-5`; reproduces ~6 times per session. Needs a provider-side retry/validation hook.
4. [#43367 — Multi-agent orchestration is unstable (14 comments)](https://github.com/openclaw/openclaw/issues/43367). P1: concurrent `openclaw agents add` overwrites config; session-lock failures; detached child work. The clearest signal that multi-agent is *not* GA-ready.
5. [#74586 — AM embedded run aborts `memory_search` tool calls (14 comments, 👍3)](https://github.com/openclaw/openclaw/issues/74586). `active-memory` plugin classifies model-complete responses as timeouts.
6. [#119720 — Synchronous agent persistence blocks Gateway event loop at scale (12 comments)](https://github.com/openclaw/openclaw/issues/119720). Diamond-lobster rated; partial fixes landed via [#133925](https://github.com/openclaw/openclaw/issues/133925) and [#134062](https://github.com/openclaw/openclaw/issues/134062), but the main-thread persistence path remains open.
7. [#89278 — Codex OAuth refresh succeeds but cron/heartbeat fail with 10s timeout (11 comments, 👍2)](https://github.com/openclaw/openclaw/issues/89278). P0 with `ux-release-blocker` impact; OAuth probe slightly exceeds the 10s window. Demonstrates a sharp, fixable boundary condition.
8. [#136183 — Command executor hangs on `ssh` SIGTERM during banner exchange (10 comments)](https://github.com/openclaw/openclaw/issues/136183). Regression in 2026.8.1 that persists in 2026.8.2.
9. [#139714 — post-core update resume admits `update_runs` row it can never finalize (9 comments)](https://github.com/openclaw/openclaw/issues/139714). `openclaw status` reports "update in progress" forever. Tied to today's [#141109](https://github.com/openclaw/openclaw/pull/141109) fix.
10. [#140010 — Windows sleep/resume: WebSocket reconnects fail for 30–60s+ (9 comments)](https://github.com/openclaw/openclaw/issues/140010). Gateway wakes up but defers thaw recovery behind busy work; P1.

**Underlying community need:** users want (a) a stable multi-agent concurrency story, (b) provider-protocol resilience (OAuth/Codex/Anthropic malformed-JSON, App-server ownership), and (c) reliability in `openclaw update` so that upgrading never breaks an otherwise-healthy install.

## 5. Bugs & Stability

**P0 / P1 / P2 today, ranked by severity:**

| Severity | Issue | Title | Status |
|----------|-------|-------|--------|
| **P0** | [#89278](https://github.com/openclaw/openclaw/issues/89278) | Codex OAuth refresh succeeds but cron/heartbeat fail with 10s auth refresh timeout | Open, source-repro, linked PR open |
| **P0** | [#140497](https://github.com/openclaw/openclaw/issues/140497) | Discord setup accepts application ID as bot token | **Closed** in last 24h |
| **P0** | [#106920](https://github.com/openclaw/openclaw/issues/106920) | openclaw 2026.7.1 can't restart the gateway | **Closed** in last 24h (👍5) |
| **P1** | [#97616](https://github.com/openclaw/openclaw/issues/97616) | OpenClaw leaks unreaped hook/tool child processes | Open, no fix PR |
| **P1** | [#135111](https://github.com/openclaw/openclaw/issues/135111) | Intermittent malformed-JSON tool calls on v2026.8.1 (claude-sonnet-5) | Open, no fix PR |
| **P1** | [#43367](https://github.com/openclaw/openclaw/issues/43367) | Multi-agent orchestration is unstable | Open, linked PR open |
| **P1** | [#119720](https://github.com/openclaw/openclaw/issues/119720) | Synchronous agent persistence blocks Gateway event loop | Open, partial fixes only |
| **P1** | [#136183](https://github.com/openclaw/openclaw/issues/136183) | Command executor hangs when spawning ssh | Open, regression |
| **P1** | [#140010](https://github.com/openclaw/openclaw/issues/140010) | Windows sleep/resume: WebSocket reconnect 30–60s+ failure | Open |
| **P1** | [#137927](https://github.com/openclaw/openclaw/issues/137927) | `<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` leaks to Telegram visible text | Open |
| **P1** | [#117262](https://github.com/openclaw/openclaw/issues/117262) | SQLite contention: 3 concurrent write handles → 33s stalls (DEF-61) | Open |
| **P1** | [#118018](https://github.com/openclaw/openclaw/openclaw/issues/118018) | Stale subagent completion delivered into replaced requester lifecycle | Open |
| **P1** | [#127148](https://github.com/openclaw/openclaw/issues/127148) | Codex `sessions.compact` acquires second app-server, active-writer conflict | Open |
| **P1** | [#139847](https://github.com/openclaw/openclaw/issues/139847) | Message dropped while reply run active — "no active tool authority snapshot" (2026.9.2) | Open, regression |
| **P1** | [#139578](https://github.com/openclaw/openclaw/issues/139578) | llama.cpp EmbeddingGemma runs at server-default ubatch 512 in 2026.9.2 (regression) | Open |
| **P1** | [#99910](https://github.com/openclaw/openclaw/issues/99910) | Memory dreaming run pegs gateway event loop for ~10 min | Open |
| **P1** | [#121232](https://github.com/openclaw/openclaw/issues/121232) | memory-core dreaming ranker/applier disagreement — "Ranked N, Promoted 0" | Open, linked PR open |
| **P1** | [#140129](https://github.com/openclaw/openclaw/issues/140129) | 2026.9.2 Anthropic cache stuck at ~46k tools+system prefix | Open |
| **P1** | [#128637](https://github.com/openclaw/openclaw/issues/128637) | Multi-agent `AgentSelectionRequiredError` on ambient ops | Open, regression |
| **P1** | [#119454](https://github.com/openclaw/openclaw/issues/119454) | Stuck-session recovery self-suppresses on leaked idle embedded run | Open |
| **P1** | [#134896](https://github.com/openclaw/openclaw/issues/134896) | 2026.8.1 update: 5-blocker gateway restart cascade + `doctor --fix` self-referential failure | Open |
| **P1** | [#112160](https://github.com/openclaw/openclaw/issues/112160) | SSH sandbox does not stage inbound media into remote workspace | Open |
| **P2** | [#139714](https://github.com/openclaw/openclaw/issues/139714) | post-core update resume admits `update_runs` row it never finalizes | Open → fixed by [#141109](https://github.com/openclaw/openclaw/pull/141109) |

**Fixes already merged for today's issues:**
- [#140497](https://github.com/openclaw/openclaw/issues/140497) — closed (Discord setup token validation).
- [#106920](https://github.com/openclaw/openclaw/issues/106920) — closed (gateway restart).
- [#137024](https://github.com/openclaw/openclaw/issues/137024) — closed (NO_REPLY silence defeated by settled-turn fallback).
- [#136200](https://github.com/openclaw/openclaw/issues/136200) — closed (Feishu quoted merged-forward placeholder text).
- [#135970](https://github.com/openclaw/openclaw/issues/135970) — closed (codex `dist/extensions/codex` missing node_modules).
- [#140535](https://github.com/openclaw/openclaw/issues/140535) — closed (Discord `/new` "No reply was generated").
- [#123872](https://github.com/openclaw/openclaw/issues/123872) — closed (restart drain 300s vs systemd 30s).

**Highest-severity regression still open:** the 2026.9.2 message-drop regression [#139847](https://github.com/openclaw/openclaw/issues/139847) and the Anthropic cache-rewrite regression [#140129](https://github.com/openclaw/openclaw/issues/140129) — both directly affect user-visible chat reliability on the current stable release.

## 6. Feature Requests & Roadmap Signals

**Strong signals (multiple comments / 👍 or maintainer-tagged):**

- **Telegram bot-to-bot / guest-bot integration** ([#79077](https://github.com/openclaw/openclaw/issues/79077), 👍8). Closed as stale but withstanding demand suggests it should re-open as a scoped RFC.
- **Resolved backend model in `session_status` / agent runtime** ([#51441](https://github.com/openclaw/openclaw/issues/51441)). Universal need for any user running LiteLLM or routing proxies; small, contained change.
- **`session-memory` hook on session reset/prune, not just compaction** ([#51572](https://github.com/openclaw/openclaw/issues/51572)). Hook-surface completeness request.
- **Per-job elevated exec scoping for cron and heartbeat** ([#41484](https://github.com/openclaw/openclaw/issues/41484), 👍1) — closed; likely to re-surface as a security RFC.
- **Cron maintenance window with role isolation** ([#120244](https://github.com/openclaw/openclaw/issues/120244), follow-up to #79192 / #119575). Operationally motivated, not speculative.
- **Reason-aware cron guardrails** ([#14376](https://github.com/openclaw/openclaw/issues/14376)) — billing/quota vs transient vs rate-limit differentiation. Aligns with operator pain expressed across [#89278](https://github.com/openclaw/openclaw/issues/89278) and [#139465](https://github.com/openclaw/openclaw/issues/139465).
- **Reasoning stream UX** ([#42276](https://github.com/openclaw/openclaw/issues/42276)). The `/reason` stream cannot currently overwrite lines in some chat clients; competitive parity with OpenAI/Grok.
- **Manual context clearing for tool results** ([#45503](https://github.com/openclaw/openclaw/issues/45503), 👍2). Users want agent-controlled pruning beyond TTL.
- **`memory-lancedb` tool exposure** ([#84242](https://github.com/openclaw/openclaw/issues/84242), 👍3). Plugin registers tools but the Codex/OpenClaw surface does not expose them — a tool-surface contract bug masquerading as a feature request.
- **Roster-first Agents home in Control UI** ([#141097](https://github.com/openclaw/openclaw/pull/141097)) — already in flight; targets UX gap.
- **WhatsApp listen-only / hooks-only mode** ([#78963](https://github.com/openclaw/openclaw/issues/78963), 👍1) — closed; expect an RFC.

**Most likely next-version inclusions (high confidence):**
1. MCP session-idle override (#141125, in flight).
2. Homebrew/LaunchAgent-aware update (#141011, in flight).
3. Update-flow regression guard (#141146 + #140981, in flight).
4. Roster-first Control UI Agents home (#141097, in flight).
5. UTF-16-safe public session truncation (#141240, in

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Personal AI Assistant / Agent Open-Source Ecosystem
**Snapshot date: 2026-09-07** | Projects: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The personal AI assistant / agent open-source space is in a **collective hardening phase**: across all five projects, the dominant 24-hour activity is regression fixing, update-pipeline safety, and reliability work rather than net-new features. Common architectural commitments are converging — gateway/daemon runtimes, multi-channel delivery (Slack, Telegram, Discord, Feishu/WeCom), MCP integration, long-term memory subsystems, and scheduled autonomy (cron/heartbeat) — but each project is maturing at a different pace, from OpenClaw's hyperscale triage operation to IronClaw's quiet maintenance mode. The most consistent external dependency risk is **LLM provider variance** (OAuth boundaries, malformed tool-call JSON, prompt-cache economics, hardcoded context assumptions), and the most consistent internal risk is **maintainer concentration**. Notably, zero of the five projects shipped a release on this date.

---

## 2. Activity Comparison

| Project | Issues touched (24h) | PRs touched (24h) | Issue close rate | PR merge/close rate | Release status | Health score* |
|---|---|---|---|---|---|---|
| **OpenClaw** | 500 | 500 | ~45% (223 closed) | ~50% (250) | None; patch imminent | **7.5/10** |
| **Hermes Agent** | 50 | 50 | 52% | 38% | None; last v0.21.0 | **6.5/10** |
| **QwenPaw** | 40 | 47 | ~38% | ~38% | None; v2.2.1 overdue | **6.0/10** |
| **ZeroClaw** | 33 | 50 | 9% | **2%** | None; v0.8.5 line closed 8/30 | **5.5/10** |
| **IronClaw** | 0 | 13 | — | 23% | None | **7.0/10** |

*\*Analyst-derived composite of throughput, close rates, open P0/P1 load, fix-PR coverage, and bus-factor risk. Metric caveat: each digest counts "touched/updated" items slightly differently; OpenClaw's counts include label/bot churn but its 6-digit issue IDs confirm an order-of-magnitude-larger cumulative tracker than ZeroClaw/QwenPaw/IronClaw.*

---

## 3. OpenClaw's Position

**Advantages vs peers:**
- **Scale and velocity**: ~10x the daily throughput of any peer (500/500 vs 33–50 touches), with close rates (~45–50%) that still rival smaller projects. Cumulative tracker size (~141k issue/PR IDs) vs ~105k (Hermes) and ~8–11k (IronClaw, QwenPaw, ZeroClaw).
- **Breadth of surface**: only project simultaneously hardening Telegram, Discord, Feishu, Homebrew, Tailscale, MCP, Codex, and Anthropic integration paths — plus gateway, TUI, plugins, and memory.
- **P0 responsiveness**: two P0s (#140497, #106920) closed within 24h; systematic release-verification hardening in flight (#140981, #141146 — regression gates across 12 published npm releases).
- **Deep maintainer engagement**: `steipete` authoring ~2/3 of daily PRs (also a concentration risk, see below).

**Technical approach differences:** OpenClaw ships fast on calendar versioning (2026.x) and hardens post-hoc (e.g., AWS Crabbox upgrade matrix), whereas ZeroClaw is RFC-first with a 2% landing rate, QwenPaw invests in coverage sprints (+245 tests) and community onboarding, and IronClaw (Rust/wasmtime) prioritizes low-churn safety.

**Community size:** Largest by breadth — hot issues draw 9–15 comments across *many* threads. Hermes shows deeper single-thread intensity (74 comments on #88584) and ZeroClaw shows long-form design engagement (RFCs at 25–34 comments), but neither matches OpenClaw's distributed volume.

**Weaknesses:** highest open P0/P1 load (25+ table entries), recurring regression pattern across three consecutive releases, multi-agent explicitly **not GA-ready** (#43367), and current-release chat-reliability regressions (#139847, #140129).

---

## 4. Shared Technical Focus Areas

| Theme | Projects | Specific needs |
|---|---|---|
| **Update/upgrade pipeline safety** | OpenClaw, Hermes, QwenPaw | State-schema migration completion (#141109); updater mispinning on `ls-remote` exit 2 (Hermes #105042); CI merge-freeze during releases (QwenPaw #7603, post-beta.4 incident) |
| **Provider protocol resilience** | All 5 | Malformed-JSON tool-call retries (OpenClaw #135111); Codex OAuth 10s timeout (OpenClaw #89278); hardcoded 32k context (QwenPaw #7576); vLLM `max_tokens` injection (Hermes #105090); Bedrock cachePoint config (ZeroClaw #8720) |
| **Anthropic prompt-cache correctness** | ZeroClaw, OpenClaw | Third breakpoint + 1h TTL + OAuth prefix marker (ZeroClaw #10660–63); cache stuck at 46k prefix (OpenClaw #140129); cache-defeating history re-trims (ZeroClaw #10674) |
| **Cron/heartbeat reliability & truthful delivery** | OpenClaw, ZeroClaw, QwenPaw, Hermes | Silent cron non-execution and false "send success" (ZeroClaw #10599/#10600, tracker #10685); heartbeat feedback loop (QwenPaw #7589); reason-aware cron guardrails (OpenClaw #14376) |
| **Windows/desktop parity** | Hermes, ZeroClaw, QwenPaw, OpenClaw | 51s GIL stall (Hermes #58576); 74 Windows test failures w/ Linux-only CI (ZeroClaw #7462); sleep/resume WebSocket failures (OpenClaw #140010) |
| **Session/turn data loss** | QwenPaw, ZeroClaw, OpenClaw | Replies persisted but absent from context (QwenPaw #7579/#7584); S0 ACP turn loss (ZeroClaw #10121, #9333); message-drop regression (OpenClaw #139847) |
| **Event-loop blocking** | Hermes, QwenPaw, OpenClaw | 51s–135s UI freezes (Hermes #58576, QwenPaw #7363); sync persistence blocking gateway (OpenClaw #119720) |
| **MCP robustness** | All 5 | Session-server lifetime (OpenClaw #141125); cross-process OAuth corruption (Hermes #71335); egress-leak diagnostics (IronClaw #8077); tool-arg type coercion (QwenPaw #6936) |
| **Eval/QA industrialization** | ZeroClaw, QwenPaw, OpenClaw | 7-PR eval platform with LLM judges (ZeroClaw); +245-case coverage sprint (QwenPaw); published-upgrade regression gate (OpenClaw #141146) |

---

## 5. Differentiation Analysis

| Project | Feature focus | Target user | Architecture signature |
|---|---|---|---|
| **OpenClaw** | Broadest channel/plugin/provider matrix; multi-agent orchestration (pre-GA); `openclaw update` as first-class product | Self-hosted power users, operators | Gateway + TUI + plugin system; npm distribution; fast calendar-versioned patch cadence |
| **Hermes Agent** | Multi-frontend continuity (Desktop/VPS/gateway shared state); long-tail provider portability | Individuals running always-on bots across devices | Python; campaign-tracker "salvage" workflow; desktop + gateway split |
| **IronClaw** | WebUI slash-command polish; Slack multi-user pairing semantics; MCP egress safety boundary | Safety-conscious team operators | Rust; wasm/wasmtime plugin direction; deliberate low-churn maintenance |
| **QwenPaw** | Desktop app distribution; Chinese provider catalog (Qwen, Volcengine, MiMo, DeepSeek); Creator plugin (A/B compare, video scheduling) | Prosumers in the CN model ecosystem | PyInstaller desktop + console + Hub sandboxes; strong first-contributor onboarding |
| **ZeroClaw** | Runtime-owned sessions, unified attachments, WASM plugins, append-only event history, eval platform, ACP/ZeroCode | Developers building agent runtimes | RFC-driven design process; stacked XL PRs; explicit maintainer decision queue |

---

## 6. Community Momentum & Maturity

- **Tier 1 — Hyperscale iteration**: **OpenClaw**. Highest volume *and* highest close rates, but carrying the largest open P1 backlog; operationally mature, stability maturing.
- **Tier 2 — Rapid iteration with inflow**: **QwenPaw**. 5+ first-time contributors in one day and bot-driven QA investment; momentum is strong but ~22 of 25 open bugs lack fix PRs, including data-loss class defects.
- **Tier 2 — Hardening**: **Hermes Agent**. 52% issue closure in a day via campaign #104904, but P1s with no PRs and a 21-day cross-repo blocker (#88584) show the tail risk.
- **Tier 2 — Design phase**: **ZeroClaw**. Heavy engagement (50 PRs touched) but ~2% landing rate; bottleneck is explicitly maintainer decision cadence (#8692), not contribution volume.
- **Tier 3 — Steady maintenance**: **IronClaw**. Zero issues filed, Dependabot + one contributor's UX polish; stable but low community gravity.

**Maturity ≠ stability**: OpenClaw is the most mature by release history and scale yet holds the most open severe bugs; IronClaw is the most stable yet smallest. ZeroClaw (v0.8.x) is intentionally trading velocity for architectural correctness.

---

## 7. Trend Signals

1. **Reliability has displaced features as the ecosystem's work item.** All five digests are dominated by hardening; Hermes users' verdict — "documented behavior ≠ shipped behavior" — names the sector's core reputational risk.
2. **The updater is product surface.** Three projects devoted today's effort to upgrade-path safety and regression gating; expect "upgrade never breaks a healthy install" to become a competitive table stake.
3. **Always-on autonomy is the new reliability frontier.** Silent cron non-execution, false delivery-success, and OAuth expiry at scheduled-job time are spawning dedicated trackers (ZeroClaw #10685) — *outcome receipts* for scheduled agents are an emerging requirement.
4. **Provider variance is the top external dependency.** Malformed-JSON retries, boundary-timing OAuth failures, and hardcoded context windows recur everywhere; **prompt-cache correctness is now simultaneously a P1 bug (OpenClaw) and a feature batch (ZeroClaw)** — cache-aware history trimming directly cuts cost.
5. **Architectural convergence is visible**: session/transport separation, unified attachment models, WASM plugin runtimes (ZeroClaw, IronClaw), and append-only event history — all preconditions for multi-surface agents.
6. **Windows/desktop parity is systemic debt** in 4 of 5 projects, with ZeroClaw's Linux-only CI actively masking regressions.
7. **QA is industrializing**: LLM-judge eval platforms, coverage sprints, and published-release upgrade matrices are replacing ad-hoc testing.
8. **Bus-factor risk is quantifiable**: single maintainers drive ~2/3 of PRs at OpenClaw (`steipete`), most triage at Hermes (`teknium1`), and the webui cluster at IronClaw (`italic-jinxin`); ZeroClaw is the only project that has formalized the bottleneck.

**For agent developers**: design for provider failure modes first, treat your update pipeline and cron scheduler as user-facing reliability features, make caching behavior observable, and test on Windows before your users do.

---
*Methodology note: single-day snapshot derived from project digests of 2026-09-07; three digests (OpenClaw §6, QwenPaw §7, ZeroClaw §8) were truncated at source — conclusions rely on available sections only.*

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-07

## 1. Today's Overview

Hermes Agent maintained a high but polarized cadence on 2026-09-07: **50 issues** (24 open / 26 closed) and **50 PRs** (31 open / 19 closed) were touched, with no new release published. Activity skews heavily toward **bug-fix salvos and "salvage" PRs** rather than net-new features, and a clearly identifiable coordinated effort — campaign tracker [#104904](https://github.com/NousResearch/hermes-agent/issues/104904) — accounts for most of the open PR volume. With a 52% issue-closure rate and 38% PR-merge rate inside a single day, the project is shipping quickly, but a long-standing integration blocker (#88584, 74 comments) and several high-severity open P1 bugs signal that stability work is still incomplete. Overall health: **active, high-throughput, in a hardening phase**.

---

## 2. Releases

No new releases were published in the last 24 hours. The most recent referenced in current issues remains v0.21.0 (`693641a`) and v2026.8.3 / 0.20.0 ("The Herald"). Consumers should treat the live `main` branch as the source of fixes (see Campaign #104904 below).

---

## 3. Project Progress

PRs merged or closed today (selected, by significance):

| PR | Title | Significance |
|---|---|---|
| [#103109](https://github.com/NousResearch/hermes-agent/pull/103109) | **fix(gateway):** stop printing `sys.maxsize` as iteration cap | UX/cosmetic; status lines no longer show `9223372036854775807` as the cap |
| [#104982](https://github.com/NousResearch/hermes-agent/pull/104982) | **fix(desktop):** tool edits and failed rebuilds keep session profile | Stacked follow-up to #104842 — Desktop session stability |
| [#105096](https://github.com/NousResearch/hermes-agent/pull/105096) | **fmt(js):** `npm run fix` auto-fix | Bot auto-merge; routine |
| (campaign #104904 closures: #104445, #104537, #104729, #104536, #104509, #104176, #104242, #104275, #104249, #104093, #81584) | assorted bug fixes | Issue-side closures follow completed fix PRs |

**Net direction:** Gateway status formatting, Desktop profile persistence, Windows installer, MCP tool discovery, and several cron / session / billing fixes shipped through. Two substantive pieces of feature work remain *open*: **#97083 (sharded webhook durable-authority pipeline)** and **#98615 (read-only MCP tools in `execute_code`)** — both flagged `needs-decision`.

---

## 4. Community Hot Topics

| # | Title | Comments | Why it's hot |
|---|---|---:|---|
| [Issue #88584](https://github.com/NousResearch/hermes-agent/issues/88584) | Automated Nous-to-Enterkey integration blocked — merge conflicts in `cron/jobs.py` | **74** | Stale for ~3 weeks, blocks scheduled merge pipeline, dashboard updater pinned to last-tested Enterkey release. Operationally disruptive. |
| [Issue #97681](https://github.com/NousResearch/hermes-agent/issues/97681) | Bot Group Chats should keep working after Desktop closes | **27** | Cross-device continuity is a core pitch of Hermes; users expect bots on laptop / VPS / home server to keep running in a shared group chat. |
| [Issue #58576](https://github.com/NousResearch/hermes-agent/issues/58576) | `web_server` event loop stalls up to 51 s under heavy agent work (GIL pressure) | **10** | P1 Windows regression; freezes the Desktop UI for ~1 minute during heavy tool use. Visible to every heavy user. |
| [Issue #71335](https://github.com/NousResearch/hermes-agent/issues/71335) | Concurrent processes sharing `HERMES_HOME` corrupt rotating MCP OAuth grants (Notion) | **7** | P1; violates the documented promise that "all front ends share state" — a cross-process locking gap with security implications. |

**Underlying need:** the highest-engagement threads are all about **continuity / safety guarantees already promised in product docs**: continued background work, no UI freezes, no state corruption across front-ends, and a working scheduled-release pipeline. These aren't feature wishlists — they're regressions on documented behavior.

---

## 5. Bugs & Stability

Sorted by priority label, with the most impactful first:

### P1 (high severity, open)
- [#58576](https://github.com/NousResearch/hermes-agent/issues/58576) — **51s `web_server` event-loop stall** under heavy agent work on Windows 11 / Python 3.11.15. Causes visible Desktop UI freeze. **No PR linked yet.**
- [#71335](https://github.com/NousResearch/hermes-agent/issues/71335) — **Cross-process MCP OAuth token corruption** (Notion) when multiple agent processes share `HERMES_HOME`. **No PR linked yet.**
- [#98206](https://github.com/NousResearch/hermes-agent/issues/98206) — `skill_view` returns a dedup stub after compression prunes original skill content. **No PR linked yet.**

### P2 (open)
- [#105090](https://github.com/NousResearch/hermes-agent/issues/105090) — Private vLLM qwen3 models: `max_tokens=65536` injected from substring table, then **4 identical retries on a guaranteed HTTP 400**.
- [#80625](https://github.com/NousResearch/hermes-agent/issues/80625) — Desktop SSH remote backend fails when remote shell is **Fish** (Bash/POSIX syntax sent over SSH).
- [#105042](https://github.com/NousResearch/hermes-agent/issues/105042) — Desktop updater misinterprets `git ls-remote` **exit 2 as "branch merged/gone"** and silently re-pins to `main`. Risks unwanted downgrade for forks/feature branches.
- [#105052](https://github.com/NousResearch/hermes-agent/issues/105052) — Desktop chat input **loses focus seconds after click** during a running session.
- [#104093](https://github.com/NousResearch/hermes-agent/issues/104093) (CLOSED) — `memory_tool` dropped the documented `new_text` alias for `content`, breaking `replace`. Fix likely merged in campaign.
- [#104176](https://github.com/NousResearch/hermes-agent/issues/104176) (CLOSED) — `ContextCompressor._generate_summary()` signature change broke subclasses with `bypass_cooldown`. Closed today.
- [#104445](https://github.com/NousResearch/hermes-agent/issues/104445) (CLOSED) — `/goal` orphaned by idle/daily session expiry; `migrate_goal_to_session` not called. Closed today.
- [#104249](https://github.com/NousResearch/hermes-agent/issues/104249) (CLOSED) — Pending fleet restart silently discharged when no gateway is running. Closed today.

### P3 / platform-specific
- [#103793](https://github.com/Users/NousResearch/hermes-agent/issues/103793) — Windows local STT fails: **`cublas64_12.dll` not found**. Needs CUDA 12 wheels or CPU-forced fallback.
- [#105074](https://github.com/NousResearch/hermes-agent/issues/105074) — Dashboard heartbeat watchdog reports hour-long "GIL stalls" after Windows sleep/resume — needs a **power-aware baseline reset** (mirrors `gateway power_management.py`).
- [#104537](https://github.com/NousResearch/hermes-agent/issues/104537) (CLOSED) — Windows detached desktop update fails with **exit 124**; `_run_logged_subprocess` buffers output. Closed today.

**Bugs-with-fix-PR status:** roughly half of the day's closed issues map to merged/salvaged fix PRs in campaign #104904; the rest are P1/P2s with **no PR attached yet** — these are the genuine backlog risks.

---

## 6. Feature Requests & Roadmap Signals

| # | Title | Priority | Roadmap read |
|---|---|---|---|
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | Cross-device Bot Group Chats that survive Desktop closing | P2 | **Likely next minor** — high engagement, directly extends the "shared state" promise; needs gateway-side daemonization of bot lifecycles |
| [#97390](https://github.com/NousResearch/hermes-agent/issues/97390) | Per-channel background idle context compaction for gateway sessions | P3 / `needs-decision` | **Probable** — complement to #97681; reduces user-perceived latency on long-lived chat sessions |
| [#59784](https://github.com/NousResearch/hermes-agent/issues/59784) | Prominent approval-needed alert mode in Hermes Desktop | P3 | Low cost, UX win; likely a small follow-up release |
| [#104729](https://github.com/NousResearch/hermes-agent/issues/104729) (CLOSED) | Desktop slash-autocomplete full-description hover | P3 | Closed (likely shipped); expect in next release notes |
| [#104275](https://github.com/NousResearch/hermes-agent/issues/104275) (CLOSED) | Opt-out for passive update check (env var + config key) | P3 | Closed (likely shipped) — important for embedded / appliance users |

**Longer-cycle signals** (open, `needs-decision`, multi-week old):
- **PR [#97083](https://github.com/NousResearch/hermes-agent/pull/97083)** — shard the durable authority pipeline for webhooks. Architectural; composition gate dated 2026-08-30.
- **PR [#98615](https://github.com/NousResearch/hermes-agent/pull/98615)** — gated read-only MCP tool surface for `execute_code`. Security-bounded; likely lands after a policy review.
- **PR [#82243](https://github.com/NousResearch/hermes-agent/pull/82243)** — compose deferred MCP / plugin tools in `execute_code` via the Tool Search bridge.
- **PR [#85571](https://github.com/NousResearch/hermes-agent/pull/85571)** — `final_only` per-turn presentation policy for protected recipients (security / UX boundary).

**Prediction for the next tagged release** (likely 0.21.x or 0.22.0): read-only MCP exposure in code-exec, idle compaction, slash autocomplete polish, and a fistful of Desktop profile / session continuity fixes.

---

## 7. User Feedback Summary

**Satisfaction signals**
- Users actively write detailed repro steps with versions, OS, Python, and commit hashes — high engagement quality.
- Several feature requests (e.g. #104729 hover, #104275 opt-out) were closed within 24h of opening — responsiveness is strong on cosmetic / ergonomic items.
- Campaign #104904 demonstrates a deliberate "salvage pattern": prior PRs get redone with corrected bases rather than abandoned, which users track via linked campaign-tracker issues.

**Pain points (verbatim themes from today's issues)**
1. **"Documented behavior ≠ shipped behavior."** Multiple P1/P2 bugs (#71335 cross-process state, #104093 `new_text` alias, #104445 `/goal` orphaning) directly contradict claims in the README or docstrings. Trust gap is the dominant theme.
2. **Windows and WSL2 are second-class citizens.** [#58576](#58576), [#103793](#103793), [#105074](#105074), [#104537](#104537), [#104536](#104536) — five of the day's issues are Windows-specific, several are P1.
3. **Provider-portability friction.** vLLM token accounting (#105090), DeepSeek peak/off-peak billing (#88374), OpenCode Go `deepseek-v4-flash` (#81584, closed) — users run Hermes against a long tail of providers and routinely hit edge cases the codebase hasn't internalized.
4. **Update pipeline brittleness.** Desktop updater pinning on `ls-remote` exit 2 (#105042), Windows detached update exit 124 (#104537), pending fleet restart discharge (#104249), scheduled Nous merge blocked (#88584). Four separate update/install mechanisms each with their own failure mode.
5. **Session continuity.** `/goal` orphaning, Bot Group Chat survival after Desktop closes, profile loss on rebuild — users build long-running automations and find they quietly die.

---

## 8. Backlog Watch

Items most in need of maintainer attention (high-impact, no recent activity from a maintainer / no fix PR attached):

| Item | Age | Concern |
|---|---|---|
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) — Nous integration blocked, 74 comments | 21 days open, 0 👍 | Cross-repo coordination failure still unresolved; impacts release cadence |
| [#58576](https://github.com/NousResearch/hermes-agent/issues/58576) — 51s event-loop stall (P1) | ~2 months, 10 comments | No linked PR; GIL-pressure workaround / async-loop refactor not yet attempted |
| [#71335](https://github.com/NousResearch/hermes-agent/issues/71335) — MCP OAuth token corruption across processes (P1) | ~6 weeks, 7 comments | Security-flavored regression; needs cross-process lock or token-store redesign |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) — Bot Group Chat cross-device (P2) | 9 days, 27 comments | Strong demand; no design proposal on the issue yet |
| [#97390](https://github.com/NousResearch/hermes-agent/issues/97390) — Per-channel idle compaction (`needs-decision`) | 10 days, 3 comments | Awaiting maintainer decision on scope |
| **PR** [#97083](https://github.com/NousResearch/hermes-agent/pull/97083) — Sharded webhook durable authority | 10 days open, `needs-decision` | Architectural change; needs maintainer sign-off to merge |
| **PR** [#98615](https://github.com/NousResearch/hermes-agent/pull/98615) — Read-only MCP tools in `execute_code` | 8 days open, `needs-decision` | Security-bounded feature; sits behind a `needs-decision` label |
| **PR** [#82243](https://github.com/NousResearch/hermes-agent/pull/82243) — Deferred-tool composition in `execute_code` | ~1 month open, `needs-decision` | Stale; could use a maintainer review or close-with-rationale |
| [#105097](https://github.com/NousResearch/hermes-agent/issues/105097) — Gateway: gate interactive clarification on resumable webhook transport capability | 1 day open, 0 comments | Self-described as a transport-capability *gap report*, not a repro; needs maintainer triage to confirm scope |

**Maintainer bandwidth signal:** teknium1 is authoring most of today's open fix PRs; many PRs explicitly reference a campaign tracker ([#104904](https://github.com/NousResearch/hermes-agent/issues/104904)), suggesting a single driver is absorbing the bulk of the triage. Distributing review load or closing stale `needs-decision` PRs (#82243, #97083, #98615) would unblock progress on visible feature work.

---

*Digest generated 2026-09-07 from GitHub activity on [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent).*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-07

## 1. Today's Overview

IronClaw (github.com/nearai/ironclaw) shows a maintenance-heavy activity profile over the last 24 hours with no new issues filed and no releases published. The repository's pulse is dominated by pull request activity: 13 PRs touched, 10 still open and 3 closed/merged. A clear thematic split is visible — roughly half of the activity is automated dependency hygiene via Dependabot (Rust crates, GitHub Actions, wasm toolchain), while the other half is a coordinated batch of `webui` UX polish PRs authored by `italic-jinxin`, plus two substantive functional fixes (`#8076` for assistant channel pairing, `#8077` for MCP egress diagnostics). Overall project health reads as stable and well-tended: routine, low-risk churn with no escalations, no crashing regressions, and no unanswered maintainer-blocking items.

## 2. Releases

No new releases in the last 24 hours. The release pipeline is quiet while the dependency-rotation PRs (#8080, #8079, #8078, #7834) settle, which is typical ahead of a tagged cut that bundles webui UX fixes and MCP/assistant corrections.

## 3. Project Progress

Three PRs were closed/merged during the window:

- **[#8049](https://github.com/nearai/ironclaw/pull/8049)** — *chore(deps): bump the everything-else group (19 updates)* — Large, low-risk Rust dependency refresh covering `uuid`, `base64`, `toml`, and others. Successfully landed, indicating a healthy CI signal on the broad dependency surface.
- **[#7835](https://github.com/nearai/ironclaw/pull/7835)** — *chore(deps): bump the actions group (5 updates)* — Medium-risk CI bump including `anthropics/claude-code-action` and `actions/setup-node` to `7.0.0`. Closed cleanly, reinforcing the v7 Node action baseline.
- **[#7020](https://github.com/nearai/ironclaw/pull/7020)** — *chore(deps): bump tokio-tungstenite 0.29.0 → 0.30.0* — Long-lived token PR finally closing, consolidating the Tokio WebSocket stack at 0.30.x.

In addition, the open webui PR cluster ([#8071](https://github.com/nearai/ironclaw/pull/8071), [#8070](https://github.com/nearai/ironclaw/pull/8070), [#8069](https://github.com/nearai/ironclaw/pull/8069), [#8068](https://github.com/nearai/ironclaw/pull/8068)) constitutes a coordinated upgrade to the slash-command and command-result UI, advancing layout consistency, dismissal ergonomics, scroll-viewport correctness, and responsive metadata alignment — collectively raising the polish bar for the chat surface.

## 4. Community Hot Topics

No issues updated in the last 24 hours, and none of the listed PRs carry reaction or comment metrics, so quantitative "hotness" cannot be ranked from the provided snapshot. Qualitatively, the most engagement-relevant items are:

- **[#8077](https://github.com/nearai/ironclaw/pull/8077)** — *fix(mcp): classify response leak diagnostics* — Closes #8009 (host leak-blocking sentinel classification). The MCP lane is a high-visibility integration surface; this addresses a diagnostics correctness issue without compromising the safety boundary.
- **[#8076](https://github.com/nearai/ironclaw/pull/8076)** — *fix(assistant): distinguish disconnected shared channels* — Targets user confusion between paired-but-disconnected Slack channels and unpaired accounts, and aligns the rejection message across adapter, product, and OpenAI-compatible surfaces. This addresses a recurring UX pain point in multi-user Slack setups.
- **Webui PR cluster (#8068–#8071)** — Likely representing accumulated user friction around slash-command navigation, card dismissal, and layout shifts.

The underlying need across these threads is consistent: clearer in-product feedback (commands, diagnostics, channel state) so operators can act without guessing.

## 5. Bugs & Stability

No new issue reports in the last 24 hours. Among the PRs, the following are bug-class fixes (severity ranked by reach and impact):

| Severity | PR | Title | Reach | Fix Status |
|---|---|---|---|---|
| Medium | [#8076](https://github.com/nearai/ironclaw/pull/8076) | fix(assistant): distinguish disconnected shared channels | Cross-surface (Slack + OpenAI-compat) | Fix PR open |
| Medium | [#8077](https://github.com/nearai/ironclaw/pull/8077) | fix(mcp): classify response leak diagnostics (closes [#8009](https://github.com/nearai/ironclaw/issues/8009)) | MCP lane safety boundary | Fix PR open |
| Low | [#8068](https://github.com/nearai/ironclaw/pull/8068) | fix(webui): keep the active slash command visible | UI ergonomics | Fix PR open |
| Low | [#8069](https://github.com/nearai/ironclaw/pull/8069) | fix(webui): add dismiss actions to command result cards | UI state hygiene | Fix PR open |
| Low | [#8070](https://github.com/nearai/ironclaw/pull/8070) | fix(webui): align slash-command metadata | UI layout | Fix PR open |
| Low | [#8071](https://github.com/nearai/ironclaw/pull/8071) | fix(webui): preserve command result card height | UI layout | Fix PR open |

No crash, data-loss, or security-disclosure reports in this window.

## 6. Feature Requests & Roadmap Signals

No explicit feature-request issues surfaced in the last 24 hours. Implicit roadmap signals are nonetheless readable from the PR stream:

- **Slash-command UX maturity** — The four-PR webui batch (#8068–#8071) suggests the team is converging the chat command surface to a "v1" shape: predictable layout, keyboard-navigable menu, dismissable ephemeral cards, and outer-scroll discipline. A user-facing release note bundling these is plausible in the next tag.
- **MCP diagnostics precision** — Centralizing the `response_leak_blocked` sentinel ([#8077](https://github.com/nearai/ironclaw/pull/8077)) is foundational for richer MCP telemetry downstream; expect follow-on work that surfaces categorized reasons to clients.
- **Multi-user Slack pairing clarity** — [#8076](https://github.com/nearai/ironclaw/pull/8076) updates the Slack capability surface alongside the fix, hinting that pairing-state semantics are being formalized for external integrations, not just the in-product UI.
- **Dependency floor movement** — Multiple Dependabot PRs (Node `setup-node` → `7.0.0`, `wasmtime`/`wit-component`/`wit-parser` updates, `claude-code-action` 1.0.215) imply the next release will require maintainer attention to CI matrix compatibility rather than introduce user-facing features.

## 7. User Feedback Summary

No new issue-authored feedback in the last 24 hours, so direct user quotes are unavailable. The PR stream nonetheless encodes three recurrent user pain points the maintainers are responding to:

- **Ambiguous failure modes on shared channels** — Users (or operators) couldn't tell whether a Slack channel rejection meant the bot was disconnected from a paired account or simply unpaired. Addressed by [#8076](https://github.com/nearai/ironclaw/pull/8076).
- **Cryptic MCP egress blocks** — Hosts blocking leaks were being surfaced to MCP clients as a generic error; [#8077](https://github.com/nearai/ironclaw/pull/8077) restores a distinct, MCP-visible reason while preserving the host safety invariant.
- **Friction in the slash-command UX** — Cards collapsed, active options scrolled out of view, metadata misaligned, and ephemeral results had no dismiss affordance. The #8068–#8071 cluster targets each individually, suggesting sustained user testing of the chat surface.

There is no signal of dissatisfaction broad enough to indicate churn risk; tone of fixes is iterative polish rather than remediation.

## 8. Backlog Watch

- **[#7834](https://github.com/nearai/ironclaw/pull/7834)** — *chore(deps): bump the wasm group (4 updates, medium risk)* — Open since 2026-08-23, ~15 days stale. The wasmtime/wit-* updates are flagged medium-risk and warrant an explicit maintainer review pass before the next release.
- **Open webui cluster awaiting merge** — [#8068](https://github.com/nearai/ironclaw/pull/8068), [#8069](https://github.com/nearai/ironclaw/pull/8069), [#8070](https://github.com/nearai/ironclaw/pull/8070), [#8071](https://github.com/nearai/ironclaw/pull/8071) are all by the same core contributor (`italic-jinxin`) and touch adjacent components; a coordinated review would reduce the chance of layout-regression conflicts.
- **[#8076](https://github.com/nearai/ironclaw/pull/8076) and [#8077](https://github.com/nearai/ironclaw/pull/8077)** — Highest user-impact fixes in flight. Neither is stale, but both cross product boundaries (assistant ↔ Slack adapter, host ↔ MCP lane) and benefit from explicit reviewer sign-off on the cross-surface contracts.
- **[#8080](https://github.com/nearai/ironclaw/pull/8080)** — Newer superset of the closed #8049 (now 21 updates vs. 19). Should be validated against the post-#8049 baseline to avoid re-introducing churn.

No open issues require maintainer escalation today.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-07

## 1. Today's Overview

QwenPaw shows **elevated triage and stabilization activity** with 40 issues updated (25 open, 15 closed) and 47 PRs updated (29 open, 18 merged/closed), but **no new releases shipped**. The project is in a post-v2.2.0 patch cycle, with many user reports flagging **regressions introduced in v2.2.0** (working directory picker, idle-timeout hardcoding, model replies disappearing from context, dashboard slowness). First-time contributors are notably active (5+ first-time PRs in one day), signaling healthy community onboarding, while the maintainers' "QPQAT" bot account continues landing test, CI, and provider-catalog work. Overall health: **moderately concerning on stability, strong on momentum and contributor engagement**.

---

## 2. Releases

**No new releases in the last 24 hours.**

The project remains at **v2.2.0** (released around late August 2026). Multiple issues (#7604, #7588, #7601, #7594) point to a **v2.2.1 / v2.2.0-patch1 release being overdue**, particularly for the working-directory selector regression and the unconfigurable LLM stream idle timeout.

---

## 3. Project Progress

### Merged/Closed PRs (Today)

| PR | Title | Impact |
|---|---|---|
| [#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936) | fix(providers): coerce string-typed tool args emitted as JSON numbers | Closes [#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839); fixes MCP tool validation failures |
| [#7499](https://github.com/agentscope-ai/QwenPaw/pull/7499) | fix(console): unify nav and theme-toggle icons with Spark line series | UI consistency cleanup (closes #7376) |
| [#7530](https://github.com/agentscope-ai/QwenPaw/pull/7530) | test(console): expand console unit tests (+245 cases, +5.02pp coverage) | Fourth coverage-sprint batch — strong QA investment |
| [#7603](https://github.com/agentscope-ai/QwenPaw/pull/7603) | ci: freeze default-branch merges during releases | Prevents the v2.2.0-beta.4 incident where PR #7267 merged mid-release |
| [#7561](https://github.com/agentscope-ai/QwenPaw/pull/7561) | refactor(memory): unify automatic memory lifecycle and actions | Breaking refactor of memory-manager contract |
| [#6515](https://github.com/agentscope-ai/QwenPaw/pull/6515) | feat(providers): add Volcengine Agent Plan & MiMo V2.5 providers | Refreshes Volcengine / MiMo model catalogs (2026-08-24 official) |

### Features Still Advancing (Open PRs)

- **Memory**: [#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613) adds an OpenViking long-term memory backend; [#7606](https://github.com/agentscope-ai/QwenPaw/pull/7606) prepares Auto-Dream for ReMe 0.4.1.12.
- **Skills/Plugins**: [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609) exposes skill versions and validates declared deps; [#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605) adds update-detection for plugin manager.
- **Console UX**: [#7502](https://github.com/agentscope-ai/QwenPaw/pull/7502) redesigns sidebar and settings; [#7611](https://github.com/agentscope-ai/QwenPaw/pull/7611) fixes BiDi RTL/LTR text rendering.
- **Reliability**: [#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578) addresses the tool coordinator exception-swallowing bug (#7572); [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) prevents chat submissions from bypassing the localStorage queue (root cause of #7559).
- **Computer Use (macOS)**: [#7614](https://github.com/agentscope-ai/QwenPaw/pull/7614) adds a helper-restart action to recover from cached TCC permission denials.
- **Shell hardening**: [#7598](https://github.com/agentscope-ai/QwenPaw/pull/7598) detaches child stdin from the interactive console (Windows).
- **Creator app-plugin**: [#7486](https://github.com/agentscope-ai/QwenPaw/pull/7486) ships Creator 1.1.2 — runtime notification bus, multi-timeline A/B compare, T2V/I2V/S2V scheduling, Docker deployment.

---

## 4. Community Hot Topics

| Item | Type | Comments | Why it matters |
|---|---|---|---|
| [#7505](https://github.com/agentscope-ai/QwenPaw/issues/7505) | Question (closed) | 12 | LAN LLM-server reliability — recurring `client disconnect` driving retries and timeout when using LM Studio. Indicates fragile OpenAI-compat streaming on local networks. |
| [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) | Bug (open) | 5 | 409 "task already running" instead of queueing — UX expectation mismatch; PR [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) addresses this. |
| [#6820](https://github.com/agentscope-ai/QwenPaw/issues/6820) | Bug (closed) | 5 | Frontend UI hiding streaming output (tool calls, thinking) — a transparency/UX regression. |
| [#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576) | Bug (open) | 4 | **Hardcoded 32768 token context fallback in `RetryChatModel`** causes `CONTEXT_UNFIT` for every non-Qwen model — high blast radius, present in all published v2.1.0–v2.2.0 releases. |
| [#7587](https://github.com/agentscope-ai/QwenPaw/issues/7587) | Bug (open) | 4 | OpenAI-compat provider hits **Cloudflare 403** when listing models on WUSRouter — provider onboarding friction. |
| [#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839) | Bug (closed) | 4 | MCP tool calls send string-typed args as numbers — now fixed in [#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936). |
| [#7513](https://github.com/agentscope-ai/QwenPaw/issues/7513) | Bug (open) | 4 | DeepSeek-v4-pro replies interleaving with QwenPaw tool calls — suggests a tool-call boundary parser issue with certain models. |

**Underlying need**: Users want a **predictable, transparent streaming and queueing model** — both for tool calls and for human messages — across multiple LLM providers. The current system silently drops, interleaves, or hardcodes context windows, eroding trust.

---

## 5. Bugs & Stability

### Severity: High (data-loss / unrecoverable)

- **[#7579 / #7584](https://github.com/agentscope-ai/QwenPaw/issues/7579)** — **Model replies silently lost from context** in v2.2.0 desktop (PyInstaller backend). Assistant messages are persisted to DB but **absent from subsequent requests**, causing infinite tool-call loops and AI misbehavior. Author explicitly labels it "very serious." No fix PR yet.
- **[#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)** — "Stop" button hides the in-progress task UI but **execution continues server-side**; user then triggers 409 when resubmitting. No fix PR yet.
- **[#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576)** — **Hardcoded 32768 token context in `RetryChatModel.__init__`** forces `CONTEXT_UNFIT (>31130)` for all non-default models. Affects every released v2.1.x–v2.2.0 build. No fix PR yet.
- **[#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589)** — Heartbeat cron session **feedback loop / duplicate message pile-up** made agent unresponsive for ~2h and required manual restart (v2.0.1, verified on main). No fix PR yet.

### Severity: Medium

- **[#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363)** — Synchronous calls **freeze the event loop for 118–135s at startup and ~126s per message**, and `timeout` never fires (v2.1.1b1 Desktop).
- **[#7242](https://github.com/agentscope-ai/QwenPaw/issues/7242)** — Dashboard takes **6+ minutes to load** with 74 spawned agents on a single Docker instance.
- **[#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597)** — Tool-returned image/PDF binary sent as bare base64 (`type:"data"`) triggers **400 "file must have file_id or file_data"** on subsequent model calls.
- **[#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541)** — Scroll-context compression injects `[context compressed]` as `role=user` (should be `system`), causing DeepSeek to throw `MODEL_EXECUTION_ERROR`.
- **[#7513](https://github.com/agentscope-ai/QwenPaw/issues/7513)** — DeepSeek-v4-pro tool-call/output interleaving (Windows 11 desktop, 2.1.0).
- **[#7587](https://github.com/agentscope-ai/QwenPaw/issues/7587)** — OpenAI-compat provider gets Cloudflare 403 when fetching WUSRouter model list.
- **[#7612](https://github.com/agentscope-ai/QwenPaw/pull/7612)** — Built-in `qwenpaw agents list` and similar CLI commands **fail inside Hub-managed local sandboxes** due to `RuntimeBoundaryMiddle…` middleware.

### Severity: Low / Already Fixed

- **[#7505](https://github.com/agentscope-ai/QwenPaw/issues/7505)** (closed) — LM Studio LAN client disconnect; root cause identified.
- **[#6820](https://github.com/agentscope-ai/QwenPaw/issues/6820)** (closed) — UI hiding streaming output.
- **[#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839)** (closed) — MCP string-as-number — **fixed by [#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936)**.
- **[#7604](https://github.com/agentscope-ai/QwenPaw/issues/7604)** (closed) — Hardcoded LLM stream idle timeout in v2.2.0 — closed, presumably fixed.
- **[#7588](https://github.com/agentscope-ai/QwenPaw/issues/7588)** / **[#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601)** (closed) — Restore v2.1.0 working-directory text input — closed, fix presumably shipped.
- **[#3328](https://github.com/agentscope-ai/QwenPaw/issues/3328)**, **[#7006](https://github.com/agentscope-ai/QwenPaw/issues/7006)**, **[#7099](https://github.com/agentscope-ai/QwenPaw/issues/7099)**, **[#7594](https://github.com/agentscope-ai/QwenPaw/issues/7594)** — UI/console glitches, all closed.

**Fix-PR coverage summary**: Of 25 open bug issues, **only 3** have direct, ready PRs (#7572 → #7578; #7559 → #7610; #6839 → #6936 — the last is already merged). The remaining ~22 high/medium-severity bugs lack linked fix PRs — a maintainer-attention signal.

---

## 6. Feature Requests & Roadmap Signals

| Request | Source | Likely v2.2.1 / v2.3 candidate? |
|---|---|---|
| Restore v2.1.0 text-input working-directory picker | [#7588](https://github.com/agentscope-ai/QwenPaw/issues/7588), [#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601) | **High** — closed issues suggest work is already done or in flight |
| Telegram: auto-cleanup intermediate (thinking/tool) messages | [#7586](https://github.com/agentscope-ai/QwenPaw/issues/7586) | **Medium** — paired with #7585 |
| Feishu: auto-collapse thinking card after streaming | [#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570) | **Medium** — author has a working patch |
| UI font scaling & clickable file path links | [#4077](https://github.com/agentscope-ai/QwenPaw/issues/4077) (closed but not implemented) | **Low–Medium** — QoL, easy win |
| OpenViking long-term memory backend | [#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613) | **High** — first-time contributor PR, in review |
| Reranker UI in memory config | [#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399) | **Medium** |
| Skills versioning & marketplace validation | [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609) | **High** — complements plugin manager work |
| Protected execution / authorization contract | [#7526](https://github.com/agentscope-ai/QwenPaw/pull/7526) | **Medium** — safety/clarification story |

**Prediction for next minor (v2.2.1)**: Restore working-directory picker (#7588/#7601), config defaults for stream idle timeout (#7604), tool coordinator exception logging (#7572/#7578), and the OpenViking memory backend (#7613) are the most likely candidates.

---

## 7. User Feedback Summary

**Recurring pain points**
- **"Lost context" / "lost reply" anxiety**: [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) and [#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584) describe a workflow-d

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-07

## 1. Today's Overview

ZeroClaw shows elevated activity on 2026-09-07, with 33 issues and 50 PRs touched in the last 24 hours, but no new releases shipped. The merged/closed count is low (3 issues, 1 PR), which indicates a heavy review-and-discussion phase rather than a landing phase. The dominant theme across issues is a multi-month architecture and reliability drive — runtime-owned sessions, WASM plugin runtimes, append-only event history, Anthropic prompt-cache tuning, and ACP/ZeroCode turn-loss bugs. Multiple tracker issues (#8692, #9459, #10684, #10685) signal active coordination of large PR batches, including eval tooling, bootstrap launchers, and delivery/cron reliability. Overall, the project is healthy and busy, but the bottleneck is clearly maintainer decision throughput on RFCs and large stacked PRs.

## 2. Releases

No new releases in the last 24 hours. The most recent actively-tracked stabilization line is the **v0.8.5 finite weekly stabilization line** tracked in [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) (intake froze on August 4, line ends August 30, 2026), though it has been updated recently with only 1 comment. No tagged release activity is visible for today.

## 3. Project Progress

**Merged/Closed in the last 24h:**

- **Issue [#8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720)** (closed): Support request to disable `cachePoint` for Bedrock Nova 2 Lite — resolved as a config-file support thread.
- **Issue [#9575](https://github.com/zeroclaw-labs/zeroclaw/issues/9575)** (closed): Feature accepted — warm OpenAI-compatible providers through `GET /models` instead of `GET /chat/completions`. Net improvement for provider warmup correctness.
- **Issue [#10572](https://github.com/zeroclaw-labs/zeroclaw/issues/10572)** (closed): Documentation task for the WeCom (WeChat Work) channel.
- **PR (1 merged/closed)** out of 50 — a low landing-to-open ratio (≈2%), confirming the project is in review/stacking mode rather than merge mode.

**Features and fixes that meaningfully advanced today:**

- **Bootstrap foundation staged for merge**: [#10590](https://github.com/zeroclaw-labs/zeroclaw/pull/10590) (canonical release-target registry `zeroclaw-dist`) and the stacked [#10591](https://github.com/zeroclaw-labs/zeroclaw/pull/10591) (MCP launcher `zeroclaw-bootstrap`) — coordinated via tracker [#10684](https://github.com/zeroclaw-labs/zeroclaw/issues/10684).
- **Reliability batch (tracker [#10685](https://github.com/zeroclaw-labs/zeroclaw/issues/10685))**: [#10599](https://github.com/zeroclaw-labs/zeroclaw/pull/10599) records non-execution of recurring cron jobs so silent failures become visible; [#10600](https://github.com/zeroclaw-labs/zeroclaw/pull/10600) stops channel-layer false-positive "send success" reports; [#10604](https://github.com/zeroclaw-labs/zeroclaw/pull/10604) sends `x-opencode-session` to keep upstream prompt caches warm across turns.
- **UX wins**: [#10578](https://github.com/zeroclaw-labs/zeroclaw/pull/10578) (`/upload` slash command in web composer), [#10589](https://github.com/zeroclaw-labs/zeroclaw/pull/10589) (default `multimodal.max_image_size_mb` raised from 5 to 20 MiB so supported images no longer get silently dropped), [#10543](https://github.com/zeroclaw-labs/zeroclaw/pull/10543) (removal of the dead `sop-authoring` feature in ZeroCode).
- **Runtime authority**: [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621) (XL, risk:high) coordinates agent lifecycle mutations through one shared live-config authority across daemon RPC, gateway, channels, ACP admission, and CLI — a foundational refactor.
- **Eval platform stack** (multiple stacked XL PRs by IftekharUddin): [#9214](https://github.com/zeroclaw-labs/zeroclaw/pull/9214), [#9217](https://github.com/zeroclaw-labs/zeroclaw/pull/9217), [#9219](https://github.com/zeroclaw-labs/zeroclaw/pull/9219), [#9220](https://github.com/zeroclaw-labs/zeroclaw/pull/9220), [#9221](https://github.com/zeroclaw-labs/zeroclaw/pull/9221), [#9222](https://github.com/zeroclaw-labs/zeroclaw/pull/9222), [#9245](https://github.com/zeroclaw-labs/zeroclaw/pull/9245) — async Grader, live execution mode, run receipts, baselines, regression gating, LLM-judge graders, and judge calibration tooling.

## 4. Community Hot Topics

| Item | Title | Comments | Signal |
|---|---|---|---|
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | RFC: Runtime-owned conversation sessions and transport surface adapters (Rev. 5) | 34 | The single most-discussed thread. Underlying need: clean separation of session lifecycle from transport so any channel (ACP, ZeroCode, web, chat apps) can plug into one runtime without leaking surface-specific semantics. |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | RFC: Unified file and attachment architecture for conversation surfaces (Rev. 10) | 27 | Pairs with #9487. Need: one consistent model for files/attachments across web composer, ACP, ZeroCode, chat channels — currently fragmented. |
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | RFC: Granular sandbox policy — filesystem restrictions | 25 | Need: align app-layer path admission with OS-level sandboxes (Bubblewrap, Landlock, Seatbelt) and express workspace/path restrictions via the agent risk profile. |
| [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) | 74 test failures on Windows | 19 | Long-standing CI gap: Linux-only test job hides Windows regressions (path semantics, console encoding 936). |
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | Tracker: Maintainer decision queue for RFCs and design issues | 15 | Meta-thread indicating the RFC pipeline itself is congested and needs explicit decision cadence. |
| [#8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720) | Bedrock Nova 2 Lite cachePoint disabling | 12 (closed) | Real operator friction with provider cache markers and Bedrock error modes. |
| [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) | RFC: Composable WASM plugin runtime architecture | 10 | Need: typed, replaceable extension points so the WASM runtime doesn't ossify around a single provider shape. |

**Pattern:** four of the seven most-discussed items are architectural RFCs authored by `NiuBlibing` (often co-drafted with Codex), all gated by `needs-maintainer-review`. The community is pushing on **runtime ownership of sessions, attachments, plugin surfaces, and sandbox policy**, while the tracker-style issues show that the project's bottleneck is maintainer decision cadence — see [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) (RFC process simplification: drop mandatory discussion windows, make REVISE stop the current snapshot).

## 5. Bugs & Stability

**P1 / S0–S1 reported or in progress (highest severity):**

1. **[#10121](https://github.com/zeroclaw-labs/zeroclaw/issues/10121)** — *S0 data loss / security risk.* Partial Code/ACP turns disappear if the process exits before completion. **No fix PR linked today.**
2. **[#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)** — *S1 workflow blocked.* Daemon startup/reload stack overflows during agent initialization when applying Quickstart configs from ZeroCode. Needs repro.
3. **[#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)** — *S1.* Failed ACP turns vanish after switching sessions. **No fix PR linked today.**
4. **[#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191)** — *S1.* Cron agent jobs have no wall-clock timeout; in-flight locks only cleared at process start. **No fix PR linked today.**
5. **[#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)** — *S1.* Budget-exceeded Code turn loses visible progress after session restore. **No fix PR linked today.**
6. **[#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670)** — *S1.* `heartbeat.target` rejects channel instance composite keys (`<type>.<alias>`), so non-default instances can't be routed.
7. **[#9940](https://github.com/zeroclaw-labs/zeroclaw/issues/9940)** — *S2.* Turn-context directs agents to an unresolvable cron delivery channel and the delivery default repeats the mistake.
8. **[#10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115)** — *S2.* Tool-result truncation is invisible outside the model's context (logs/UI don't reflect the `[... N characters ...]` cut).
9. **[#10408](https://github.com/zeroclaw-labs/zeroclaw/issues/10408)** — *S2.* A second message during an active turn starts a parallel run in the same session → duplicate work and duplicate reply. **No fix PR linked today.**
10. **[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)** — *S2.* 74 Windows test failures (Unix-only test commands, path semantics, code page 936). CI is Linux-only.

**Reliability fixes already in PR review (no merge yet):**

- [#10600](https://github.com/zeroclaw-labs/zeroclaw/pull/10600) — false "send success" on channels.
- [#10599](https://github.com/zeroclaw-labs/zeroclaw/pull/10599) — silent cron non-execution.
- [#10604](https://github.com/zeroclaw-labs/zeroclaw/pull/10604) — missing `x-opencode-session` header.
- [#10241](https://github.com/zeroclaw-labs/zeroclaw/pull/10241) — restore supervised shell approval routing (status: blocked, awaiting maintainer unblock).

**Observability/security hardening in flight:** [#10606](https://github.com/zeroclaw-labs/zeroclaw/issues/10606) sanitizes component errors in unauthenticated `/health` responses; [#10644](https://github.com/zeroclaw-labs/zeroclaw/issues/10644) binds background delegate results to an owner principal (follow-up to #10601).

**Stability trend:** multiple S0/S1 issues with no linked fix PR, mostly in the ACP/ZeroCode turn-loss family. The trend is *known and being worked on through trackers (#10685, #10674)*, but no fix has landed today.

## 6. Feature Requests & Roadmap Signals

**Highly relevant for the next release line:**

- **Anthropic cache tuning** (PRs/Issues #10660, #10662, #10663) — third cache breakpoint at turn boundary, OAuth prefix marker below cache minimum, and a configurable 1-hour prompt-cache TTL. All from `Audacity88`, all opened 2026-09-06/07. Strong signal these will land together as a "Anthropic cache correctness" batch.
- **Reliable delivery + cron outcomes** [#10685](https://github.com/zeroclaw-labs/zeroclaw/issues/10685) — implementation batch tracker tying together the false-send-success, duplicate-reply, cron-outcome, and delivery-default bugs. Four fixes already in PR form.
- **Bootstrap launcher** [#10684](https://github.com/zeroclaw-labs/zeroclaw/issues/10684) — `zeroclaw-dist` registry + MCP launcher for Claude Code / Codex hosts.
- **History trimming + prompt caching** [#10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674) — fix trim boundary so tool-heavy sessions don't re-trim every few turns and defeat caching.
- **Eval platform** — the IftekharUddin eval stack (7 stacked PRs) is the largest feature surface in review and will likely land as a unified capability once the native stack merges.
- **Reasoning controls in ZeroCode** [#10636](https://github.com/zeroclaw-labs/zeroclaw/pull/10636) — effort + display session controls for adaptive thinking; stacked on #10611.
- **Channel documentation** [#10572](https://github.com/zeroclaw-labs/zeroclaw/issues/10572) (closed) — WeCom/WeChat Work docs finally written.

**Architectural RFCs awaiting maintainer decision (predict next-version candidates):** [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) (runtime-owned sessions), [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) (unified attachments), [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) (granular sandbox), [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) (WASM plugin runtime), [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) (append-only event history, now exclusive authority after #10076's revision).

## 7. User Feedback Summary

**Operator pain points (recurring in issues):**

- **False delivery / silent failure** is the single most common operator complaint: agents tell humans they paged them when they didn't (PR #10600), cron jobs disappear with no record (#9191, #10599), and channel send-success returns true even when nothing was sent (#10600). Tracker #10685 is the explicit response to this cluster.
- **Anthropic cache behavior** is fragile and opaque to operators — five-minute TTL default, OAuth prefix marker below cache minimum, only two breakpoints, no observable truncation ([#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660), [#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662), [#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663), [#10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115)). Operators are forced to either accept the defaults or hand-edit provider code paths.
- **Bedrock provider surprise** ([#8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720), closed) — Nova 2 Lite caching errors are not configurable today.
- **Cron delivery channel naming** ([#9940](https://github.com/zeroclaw-labs/zeroclaw/issues/9940), [#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670)) — the runtime tells agents to use channel aliases that don't resolve, and `heartbeat.target` rejects the very composite keys the delivery path requires.
- **ACP / Code turn loss** ([#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333), [#10121](https://github.com/zeroclaw-labs/zeroclaw/issues/10121), [#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)) — three separate paths lose work already shown to the user (failed turns after switch, abrupt exits, budget-exceeded). This is the highest-impact user dissatisfaction today.
- **ZeroCode UX gaps** — multi-session panes and Quickstart need repair; [#9739](https://github.com/zeroclaw-labs/zeroclaw/pull/9739) is a large XL PR tackling this and is already at "needs maintainer review".

**Positive signals:** the [#10578](https://github.com/zeroclaw-labs/zeroclaw/pull/10578) `/upload` slash command and [#10589](https://github.com/zeroclaw-labs/zeroclaw/pull/10589) 20 MiB default show responsiveness to small UX asks. Bedrock cachePoint, WeCom docs, and OpenAI-compatible warmup were closed in 24h, suggesting minor asks get handled quickly.

**Satisfaction signal:** thumbs-up counts are reported as 0 across the listed items — no quantified sentiment, but the comment volume on the architectural RFCs and tracker coordination shows an engaged contributor base willing to participate in long-form design discussions.

## 8. Backlog Watch — Items Needing Maintainer Attention

**Stale or stacked items most at risk of drifting:**

- **[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)** — 34 comments, Rev. 5 active vote snapshot, explicitly notes the prior Rev. 4 vote did not carry forward. Needs an explicit discussion-window reset.
- **[#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)** — 27 comments

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*