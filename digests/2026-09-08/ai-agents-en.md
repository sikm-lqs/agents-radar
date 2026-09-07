# OpenClaw Ecosystem Digest 2026-09-08

> Issues: 473 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-07 16:38 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-08

## 1. Today's Overview

OpenClaw shows very high triage throughput (473 issues and 500 PRs touched in 24h) with an open/closed split of roughly 54%/46% on both tracks, indicating sustained maintenance velocity. However, the qualitative signal is concerning: a large cluster of regressions is reported against the **2026.8.1 / 2026.8.2** releases — spanning malformed provider tool-call JSON, SQLite write contention, OAuth refresh timeouts, OAuth stale user-agent, channel-side breakage (Discord, Telegram, Feishu), and session/state bugs — while the **2026.9.2** line is surfacing new install-time defects (e.g. Discord setup mis-validating application IDs as tokens, embedded llama.cpp ubatch regression). No new release was cut in the window, which is consistent with a stabilization sprint ahead of the next train. Project health: **active but under regression pressure**, with the maintainer `steipete` carrying a disproportionate share of the open PR queue.

## 2. Releases

*No new releases in the last 24 hours. The current published line remains 2026.9.2, with the 2026.8.x branch under active regression repair.*

## 3. Project Progress

Although no PRs landed as a release, several notable PRs moved forward or were closed in the last 24h:

- **Maintenance / observability**
  - [#141329](https://github.com/openclaw/openclaw/pull/141329) — `openclaw status --all` log summarization speedup (closed/merged).
  - [#141216](https://github.com/openclaw/openclaw/pull/141216) — Control UI usage-timeline counter accuracy (closed/merged).
  - [#141127](https://github.com/openclaw/openclaw/pull/141127) — `reef`: parked-message recovery across live frames (closed/merged).
  - [#141334](https://github.com/openclaw/openclaw/pull/141334) — iOS Siri/Shortcuts intent metadata retention in dead-code scans (closed/merged).

- **Provider & inference**
  - [#141114](https://github.com/openclaw/openclaw/pull/141114) — Reuse warm prefixes for single-chunk compaction (Anthropic/OpenAI Responses).
  - [#141113](https://github.com/openclaw/openclaw/pull/141113) — Honor self-hosted model context metadata (vLLM/SGLang `max_model_len`).
  - [#141354](https://github.com/openclaw/openclaw/pull/141354) — `openclaw models status` no longer mis-reports resolved credentials as missing.
  - [#135366](https://github.com/openclaw/openclaw/pull/135366) — Firecrawl self-hosted DNS-failure diagnostics.
  - [#128642](https://github.com/openclaw/openclaw/pull/128642) — Amazon Bedrock `toolUse.input` sanitization on replay.
  - [#118896](https://github.com/openclaw/openclaw/pull/118896) — Stop advertising unsupported Gemini web-search filters.

- **Channels & integrations**
  - [#141086](https://github.com/openclaw/openclaw/pull/141086) — File-transfer archive policy honors admitted member identities (fixes display-escape spoof on macOS bsdtar).
  - [#140989](https://github.com/openclaw/openclaw/pull/140989) — Backup skips macOS AppleDouble `._*.sqlite` sidecars.
  - [#121050](https://github.com/openclaw/openclaw/pull/121050) — Control UI retains webchat context across `config.apply/patch` restarts.

- **Agents / sessions / memory**
  - [#138984](https://github.com/openclaw/openclaw/pull/138984) — Publish complete transcript rewrites without reset amplification.
  - [#133693](https://github.com/openclaw/openclaw/pull/133693) — Prevent isolated cron runs from failing during runtime refresh.
  - [#133376](https://github.com/openclaw/openclaw/pull/133376) — Code Mode `skills.read` loads files under the skill root.
  - [#141352](https://github.com/openclaw/openclaw/pull/141352) — Avoid duplicate agent turns for already-acknowledged completions.
  - [#141353](https://github.com/openclaw/openclaw/pull/141353) — Preserve diagnostics for large command output (fixes RangeError on 17 MiB blobs).

- **Release pipeline**
  - [#141146](https://github.com/openclaw/openclaw/pull/141146) — Catch published upgrade regressions before merging (AWS Crabbox matrix across 12 npm releases found 5 defects already fixed by #140778, #140784, #140886, #140825).
  - [#136761](https://github.com/openclaw/openclaw/pull/136761) — Consolidate frozen target harness contracts.
  - [#141175](https://github.com/openclaw/openclaw/pull/141175) — Installed plugins fail candidate validation during update.

The headline architectural PR — [#135599](https://github.com/openclaw/openclaw/pull/135599) "manage and reload plugins without restarting the Gateway" — remains open and explicitly split into landable slices; #139775 and #1398xx partials have already landed, but the full lifecycle is not yet shipped.

## 4. Community Hot Topics

Top issues by comment volume in the last 24h, all clustered around the 2026.8.x regression wave:

1. **[#135111](https://github.com/openclaw/openclaw/issues/135111)** (17 comments, P1) — Intermittent *"Provider completed tool call with malformed JSON arguments"* on v2026.8.1 with `claude-sonnet-5`. Tagged platinum hermit, no-new-fix-pr, needs-live-repro. **Underlying need:** provider-level tool-call validation must not silently truncate structured arguments; users want a stable LLM-error taxonomy rather than intermittent tool failures.
2. **[#97616](https://github.com/openclaw/openclaw/issues/97616)** (15 comments, P1) — Unreaped hook/tool child processes accumulate as zombies, degrading runtime. **Need:** proper process lifecycle ownership across hook exec, with deterministic SIGCHLD/reaping behavior.
3. **[#79077](https://github.com/openclaw/openclaw/issues/79077)** (15 comments, 8 👍, closed) — Telegram Guest Bots + Bot-to-Bot Communication (May-7 2026 Telegram spec). Now closed/stale pending product decision. **Need:** first-class support for new Telegram bot platform primitives.
4. **[#43367](https://github.com/openclaw/openclaw/issues/43367)** (14 comments, P1) — Multi-agent orchestration instability: concurrent `openclaw agents add` config overwrites, session-lock failures, detached children. **Need:** a real concurrency model for `agents` config writes plus atomic session locking.
5. **[#74586](https://github.com/openclaw/openclaw/issues/74586)** (14 comments, 3 👍, P2) — `active-memory` embedded run aborts `memory_search` and mis-classifies as timeout. **Need:** separate "tool completed but driver timed out" from "tool didn't respond".
6. **[#119720](https://github.com/openclaw/openclaw/issues/119720)** (12 comments, diamond lobster) — Synchronous agent persistence/transcript maintenance blocks Gateway event loop at scale. Linked fixes #133925 and #134062 partial but not closed. **Need:** off-thread persistence for the hot gateway path.
7. **[#89278](https://github.com/openclaw/openclaw/issues/89278)** (11 comments, P0, ux-release-blocker) — Codex OAuth refresh succeeds but cron/heartbeat fail with 10s refresh timeout. **Need:** timeouts aligned to actual probe latency, and no false "usable" status when downstream paths can't fit the budget.
8. **[#136183](https://github.com/openclaw/openclaw/issues/136183)** (10 comments, P1) — `ssh` spawned by command executor hangs at banner exchange (2026.8.1 → 2026.8.2 regression). **Need:** signal-safe I/O during child stdin/stdout drain.
9. **[#139714](https://github.com/openclaw/openclaw/issues/139714)** (9 comments, diamond lobster, bulk-filed) — `updateCommand()` admits an `update_runs` row it can never finalize; `openclaw status` reports "update in progress" forever. **Need:** atomic admission/commit of update_runs rows.
10. **[#140010](https://github.com/openclaw/openclaw/issues/140010)** (9 comments, P1) — Windows sleep/resume: 30–60s+ WebSocket reconnect failures after wake. **Need:** thaw-recovery that does not queue behind a busy gateway.

Cross-cutting need emerging from the top set: **the Gateway event loop is the bottleneck in three of the top seven threads** (#119720, #140010, #117262), all describing different symptoms of the same root cause — synchronous persistence, SQLite write contention, and thaw/recovery deferral.

## 5. Bugs & Stability

Ranked by severity (P0 first), with fix-PR linkage noted:

### P0 — Release-blocker
- **[#89278](https://github.com/openclaw/openclaw/issues/89278)** — Codex OAuth refresh 10s timeout breaks cron/heartbeat. *No linked fix PR.* Tagged ux-release-blocker.
- **[#140497](https://github.com/openclaw/openclaw/issues/140497)** — Discord setup accepts application ID as bot token, channel reports enabled/stopped with `lastError=null`. Closed in window but repro still requested (`needs-live-repro`).
- **[#140550](https://github.com/openclaw/openclaw/pull/140550)** — Discord guild allowlist writes don't apply until restart; `stop/start` keeps stale runtime config. PR open, ready-for-look.
- **[#106920](https://github.com/openclaw/openclaw/issues/106920)** — `openclaw 2026.7.1` can't restart gateway post-update. *Closed in window* after sustained 5-👍 pressure.

### P1 — High-impact regressions / data loss
- **[#135111](https://github.com/openclaw/openclaw/issues/135111)** — Intermittent malformed tool-call JSON. *No fix PR.*
- **[#43367](https://github.com/openclaw/openclaw/issues/43367)** — Multi-agent orchestration concurrency. Linked PRs open but incomplete.
- **[#119720](https://github.com/openclaw/openclaw/issues/119720)** — Synchronous persistence blocks event loop. Partial via #133925, #134062; not closed.
- **[#117262](https://github.com/openclaw/openclaw/issues/117262)** — SQLite contention: 3 concurrent write handles on `state/openclaw.sqlite` causing ~33s stalls (DEF-61). *No fix PR.*
- **[#118018](https://github.com/openclaw/openclaw/issues/118018)** — Stale subagent completion delivered into replaced requester lifecycle.
- **[#97616](https://github.com/openclaw/openclaw/issues/97616)** — Child process zombies.
- **[#89278](https://github.com/openclaw/openclaw/issues/89278)** — OAuth 10s timeout (also listed above).
- **[#136183](https://github.com/openclaw/openclaw/issues/136183)** — `ssh` SIGTERM during banner.
- **[#140010](https://github.com/openclaw/openclaw/issues/140010)** — Windows sleep/resume reconnect stalls.
- **[#140971](https://github.com/openclaw/openclaw/issues/140971)** — All Feishu plugin tools silently dropped on message-driven runs (regression 2026.7.1-2 → 2026.8.1).
- **[#139578](https://github.com/openclaw/openclaw/issues/139578)** — llama.cpp managed `EmbeddingGemma` runs at server-default ubatch 512 (regression from #134389).
- **[#137927](https://github.com/openclaw/openclaw/issues/137927)** — Internal context block leaks into visible Telegram message text (security-adjacent).
- **[#137332](https://github.com/openclaw/openclaw/issues/137332)** — Mixed terminal requester-settle batches retry forever after ownership check.
- **[#113701](https://github.com/openclaw/openclaw/issues/113701)** — Context overflow + failed compaction → session failure loop.
- **[#121232](https://github.com/openclaw/openclaw/issues/121232)** — `memory-core` dreaming ranker/applier disagreement ("Ranked N, Promoted 0").
- **[#119454](https://github.com/openclaw/openclaw/issues/119454)** — Stuck-session recovery self-suppresses on leaked embedded run.
- **[#94716](https://github.com/openclaw/openclaw/issues/94716)** — Anthropic `claude-cli` sends stale `claude-cli/2.1.75` user-agent → bearer auth fails.
- **[#140129](https://github.com/openclaw/openclaw/issues/140129)** — 2026.9.2 Anthropic cache stuck at ~46k tools+system prefix; `session:sanitized` rewrites history fingerprints.
- **[#99910](https://github.com/openclaw/openclaw/issues/99910)** — Memory dreaming pegs gateway event loop ~10 min; short-term recall never persists.

### P2 — Behavior bugs / regressions
- **[#74586](https://github.com/openclaw/openclaw/issues/74586)** — `memory_search` timeout mis-classification.
- **[#137705](https://github.com/openclaw/openclaw/issues/137705)** — Telegram streaming leaks raw `file:///` Markdown (security-adjacent).
- **[#140971](https://github.com/openclaw/openclaw/issues/140971)** — Feishu plugin tool drop.
- **[#115256](https://github.com/openclaw/openclaw/issues/115256)** — Desktop app boot-loops gateway; `doctor` fix is immediately reverted.
- **[#45469](https://github.com/openclaw/openclaw/issues/45469)** — `scheduleReconnect()` has no max retry limit.
- **[#120006](https://github.com/openclaw/openclaw/issues/120006)** — CLI session reset drops tool history; concurrent CLI sessions collide on same key.
- **[#126874](https://github.com/openclaw/openclaw/issues/126874)** — **Windows CI runs 66 of 10,979 test files (0.60%)**; `checks-windows` passes when skipped. Critical infrastructure coverage gap.
- **[#68264](https://github.com/openclaw/openclaw/issues/68264)** — Canvas/Browser UI visualization regression (closed, stale).

**Pattern:** the **2026.8.1 → 2026.8.2** train is implicated in at least seven regressions (provider JSON, ssh banner, OAuth timeout, embedded ubatch, Feishu tools, Telegram Markdown leak, internal-context leak). Two of the most severe P0s (#89278, #140550) and several P1s (#94716, #140129) are still **without an open fix PR** in the queue.

## 6. Feature Requests & Roadmap Signals

Enhancement and product-direction items active in the window:

- **[#79077](https://github.com/openclaw/openclaw/issues/79077)** — Telegram Guest Bots + Bot-to-Bot Communication. Closed as stale, but spec is real and operator demand is high (8 👍). Likely to return for 2026.Q4.
- **[#78963](https://github.com/openclaw/openclaw/issues/78963)** — WhatsApp listen-only / hooks-only mode for ETL/archival plugins (closed/stale, needs security review).
- **[#51441](https://github.com/openclaw/openclaw/issues/51441)** — Expose resolved backend model in `session_status` and agent runtime (LiteLLM transparency). Persistent need across the proxy-provider user base.
- **[#51572](https://github.com/openclaw/openclaw/issues/51572)** — Fire `session-memory` hook on reset/prune, not only compaction. Strong "long memory" use case.
- **[#42276](https://github.com/openclaw/openclaw/issues/42276)** — Visible reasoning stream with overwrite lines (OpenAI/Grok-style). Long-standing UX request.
- **[#45503](https://github.com

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Personal AI Assistant / Agent Ecosystem
**Snapshot date: 2026-09-08** | Projects: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The personal AI assistant / agent open-source landscape on 2026-09-08 is uniformly in a **stabilization phase** — none of the five projects shipped a release in the window, and all are absorbing regression debt from recent trains (OpenClaw 2026.8.x, QwenPaw v2.2.0, Hermes v0.21.0). The category has converged on a common architecture — gateway/daemon + multi-channel adapters + memory subsystem + cron + desktop/TUI — so competition is shifting from feature land-grab to **reliability engineering**: durable transcripts, unattended-execution trust, and provider-edge-case hardening. Activity scale varies by ~70× (OpenClaw's 973 touched items vs. IronClaw's 14), indicating a maturing market with one reference implementation and several differentiated challengers. Bus-factor risk is now the dominant health variable: OpenClaw (steipete) and Hermes (Teknium's sole merge gate on the 51-issue resolution campaign) both concentrate review authority in single maintainers.

---

## 2. Activity Comparison

| Project | Issues touched (24h) | PRs touched (24h) | PRs merged/closed | Release status | Health score* |
|---|---|---|---|---|---|
| **OpenClaw** | 473 (≈46% closed) | 500 (≈46% closed) | ~230 | None; 2026.9.2 current, 2026.8.x under regression repair | **6/10** — unmatched throughput, but 2 P0s with no fix PR (#89278, #140550 line), 7+ regressions from one train, 0.6% Windows CI coverage (#126874) |
| **Hermes Agent** | 50 (38% closed) | 50 (36% closed) | 18 | None; release imminent but gated on Teknium's campaign review | **7/10** — best close-rate balance; P1 #104653 (double-persisted turns) unfixed |
| **IronClaw** | 1 | 13 | 3 | None; routine dep refreshes | **7/10** — stable, low-risk, but dep-bot-driven and near-zero community engagement |
| **QwenPaw** | 41 | 48 | 5 | None; v2.2.0 regression wave; v2.2.1 patch advised | **5.5/10** — high velocity + test-coverage investment (+5pp), but 2 criticals open with no fix (#7579, #7589) |
| **ZeroClaw** | 26 (3 closed) | 50 | 1 (~2% merge rate) | None; v0.8.5 weekly cuts continue | **6/10** — disciplined trackers, but XL-PR review latency (esp. #9378) gates an entire S0/S1 bug cluster |

*Derived from the 24h snapshot: bug severity vs. fix availability, merge throughput, maintainer concentration, regression pressure.

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Scale (≈10× nearest competitor):** 473 issues / 500 PRs touched daily vs. Hermes' 50/50 — the largest community, triage throughput, and issue-taxonomy maturity (P0–P2 labels, fix-PR linkage, cross-cutting root-cause analysis).
- **Broadest integration surface:** six+ channels (Discord, Telegram, Feishu, WhatsApp), providers spanning Anthropic/OpenAI/Bedrock/vLLM/SGLang/Gemini, Control UI, iOS Siri/Shortcuts intents, and a plugin lifecycle architecture (#135599 hot-reload, partially landed).
- **Release-engineering lead:** the pre-merge upgrade-regression matrix (#141146) caught 5 defects across 12 npm releases before shipping — no peer has an equivalent published mechanism.

**Technical approach differences:** TypeScript/npm distribution vs. Rust (IronClaw, ZeroClaw) and Python (QwenPaw); monolithic gateway + plugin system vs. ZeroClaw's Tokio daemon + ACP TUI or Hermes' desktop-first hybrid.

**Weaknesses relative to peers:** (1) The Gateway event-loop bottleneck (sync persistence #119720, SQLite contention #117262, thaw recovery #140010) appears in 3 of the top 7 threads while ZeroClaw is actively building a session-ownership contract (#10412) for the same class of problem; (2) the 2026.8.1→8.2 train shipped 7+ regressions — worse release hygiene this cycle than QwenPaw, which responded to its beta.4 incident with a merge-freeze policy (#7603); (3) Windows CI covers 0.60% of tests (#126874), whereas Hermes at least fields Windows fixes promptly. **Community size:** by activity proxy, OpenClaw (973 items/day) > Hermes (~100) > QwenPaw (~89) > ZeroClaw (~76) > IronClaw (14).

---

## 4. Shared Technical Focus Areas

| Focus area | Projects | Specific evidence |
|---|---|---|
| **Durable, exactly-once transcript persistence** | OpenClaw, Hermes, QwenPaw, ZeroClaw | OpenClaw #119720/#140129/#120006; Hermes #104653 (turns written twice) + #94486 (dropped prompt); QwenPaw #7579 (model forgets own reply); ZeroClaw #9333/#10121/#10659 (S0 data loss) — fix #9378 stalled |
| **Non-blocking event loop / hot path** | OpenClaw, QwenPaw, ZeroClaw | OpenClaw #117262 (~33s SQLite stalls); QwenPaw #7363 (118–135s blocking); ZeroClaw #10230 (daemon stack overflow) |
| **Cron / unattended-run reliability + outcome reporting** | All five | OpenClaw #89278 (OAuth timeout kills cron) + #139714 (stuck "update in progress"); Hermes #100437/#105188; ZeroClaw #9191/#9940 + tracker #10685 ("false send success, duplicate replies"); QwenPaw #7589 (2h heartbeat lockup) |
| **Tool-call argument robustness at the LLM boundary** | OpenClaw, Hermes, QwenPaw | OpenClaw #135111 (malformed JSON args, 17 comments); Hermes #105189 (stream drop dispatches `{}` args — side-effect danger); QwenPaw #6936 (fixed: string-type coercion) |
| **Provider-real token accounting & cache-aware context management** | Hermes, QwenPaw, ZeroClaw, OpenClaw | Hermes #104462/#80246 (`bytes/4` ignores `reasoning_content`); QwenPaw #7576 (hardcoded 32768 fallback → false CONTEXT_UNFIT); ZeroClaw #10663/#10660/#10674 (cache TTL, 3rd breakpoint, trim-vs-cache); OpenClaw #113701/#140129 |
| **Windows / desktop packaging fragility** | Hermes, OpenClaw, QwenPaw | Hermes #105184 (white screen) + #105145 (exit 8) + #46332 (WSL vs Git Bash); OpenClaw #140010 + #126874; QwenPaw v2.2.0 work-dir picker regression |
| **Multi-session concurrency & ownership** | OpenClaw, ZeroClaw, Hermes | OpenClaw #43367 (config overwrite races); ZeroClaw #10408/#10412/#10670; Hermes #97681 (multi-device group chat, 27 comments) |

---

## 5. Differentiation Analysis

- **OpenClaw** — *Breadth leader.* Feature focus: maximal channel/provider matrix + plugin ecosystem. Target: self-hosters and integrators wanting one gateway for everything. Architecture: TypeScript monorepo, npm release train, embedded memory "dreaming" subsystem.
- **Hermes Agent** — *Frontier-model velocity + desktop UX.* First to land GPT-6 Astra Responses contract (#103016), Poolside provider, reasoning-model fixes; Electron app, credential pools, Kanban task model, Honcho memory. Target: power users and Nous-community tinkerers running bots across devices. Sole-maintainer merge gate is the structural cost.
- **QwenPaw** — *Memory-first, China-market stack.* Differentiates on pluggable memory backends (ReMe 0.4.1.12 prep, ADBPG/PowerContext → plugins #7616, OpenViking #7613) and domestic/local providers (Zhipu GLM, DeepSeek, WUSRouter, LM Studio over LAN). Python + PyInstaller desktop; heavy console-UI investment.
- **ZeroClaw** — *Cost and trust engineering.* Deepest work on Anthropic prompt-cache economics (TTL, breakpoints, trim-awareness) and delivery guarantees (outcome reporting tracker #10685); MCP-installable release targets (#10684); security ceremonies (egress grants #9584, sandbox launcher resolution #10381). Rust/Tokio daemon + ACP multi-pane TUI. Target: cost-sensitive operators.
- **IronClaw** — *Eval-driven and security-scoped.* Unique daily failure-taxonomy discipline (#8081: 42 officeqa non-passes attributed to DeepSeek-V4-Flash numeric errors); MCP host-leak classification (#8077); WASM sandboxing stack. Target: managed/enterprise Slack users on nearai. Lowest community energy of the five.

---

## 6. Community Momentum & Maturity

- **Tier 1 — Scale leader:** **OpenClaw** dominates volume but is under regression pressure; health depends on distributing load beyond `steipete`.
- **Tier 2 — Rapid iterators:** **Hermes** (best closure ratio, organized 15-lane campaign) and **QwenPaw** (high velocity plus deliberate test-debt paydown — +245 cases, 4th coverage sprint) — both moving fast with open criticals.
- **Tier 3 — Architectural stabilizers:** **ZeroClaw** — 49 of 50 PRs still open, dominated by size:XL refactors; weekly v0.8.5 cuts keep it shipping, but the 2% merge rate means deep bugs (#9378 cluster) wait on review capacity.
- **Tier 4 — Quiet maintenance:** **IronClaw** — dep automation and WebUI polish; stable but showing no growth signals this window.

Maturity note: calver release trains (OpenClaw 2026.9.x) imply the highest cadence discipline; ZeroClaw (v0.8.x) and Hermes (v0.21.x) remain pre-1.0 despite substantial surface area.

---

## 7. Trend Signals

1. **Release trains are the #1 regression source** across OpenClaw, QwenPaw, and Hermes — driving adoption of pre-merge upgrade-regression testing (OpenClaw #141146) and release-window merge freezes (QwenPaw #7603). *Developer takeaway: regression-test the upgrade path, not just main.*
2. **Heuristic token counting is dead** — reasoning models (`reasoning_content`, effort levels) expose `bytes/4`-style estimates and hardcoded context fallbacks as false-overflow bugs (Hermes, QwenPaw). Provider-reported usage must drive compaction.
3. **Prompt-cache economics are becoming a user-facing feature** (configurable TTLs, breakpoint placement, trim-aware history) — ZeroClaw leads; expect others to follow as Anthropic caching behavior evolves.
4. **Durable transcripts are the trust primitive:** lost, duplicated, or vanished agent turns are the single most common critical bug across four projects. Exactly-once persistence on crashed/killed turn boundaries should be an architectural requirement, not a patch.
5. **Unattended execution needs outcome reporting:** "false send success," missing cron outcomes, and absent wall-clock timeouts (ZeroClaw #10685, Hermes #105188) show operators can't yet trust agents to run alone.
6. **Windows is systemically underserved** in an otherwise cross-platform category — a durable differentiation opportunity.
7. **Memory is becoming pluggable** (QwenPaw's backend plugins, Hermes' Honcho, OpenClaw's dreaming) — memory-as-plugin is the emerging interface standard.

**Bottom line:** OpenClaw remains the ecosystem reference on scale and integration breadth, but this cycle its advantage is eroded by regression debt and the same event-loop/persistence problems peers are solving more systematically. ZeroClaw and Hermes offer the most credible alternatives on trust/cost and frontier-model velocity respectively.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-08

## 1. Today's Overview

Hermes Agent shows high development velocity with **50 issues and 50 PRs updated in the last 24 hours**, indicating a very active maintenance cycle. The closure rate is healthy at 38% for issues (19/50) and 36% for PRs (18/50), though no new releases were published, suggesting the team is in a stabilization phase between version cuts. Activity is distributed broadly across the stack — agent runtime, desktop app, gateway, CLI, cron, auth/credential pools, and provider integrations — with multiple high-priority (P1/P2) bugs being triaged alongside feature work. A maintainer-driven "resolution campaign" (#104868) covering 51 issues across 15 implementation lanes signals an organized cleanup effort alongside reactive bug-fixing.

**Activity assessment: High churn / moderate health** — large volume of small-to-medium fixes, with several concerning regressions in desktop update flows and message persistence that warrant release attention.

---

## 2. Releases

**No new releases in the last 24 hours.** Despite substantial merged code, the team has not cut a tagged version. Notable closed work that would normally roll up into a release includes Poolside provider fixes (#58374, #58367), Czech i18n (#56521, #104670), GPT-6 Astra Responses contract (#103016), and multiple cron/CLI/auth improvements — suggesting a release may be imminent or the team is gating on the "resolution campaign."

---

## 3. Project Progress

### Merged/Closed PRs (significant ones)
- **[#103016](https://github.com/NousResearch/hermes-agent/pull/103016)** — Account-gated GPT-6 Astra model and Responses contract landed (parent tracker [#103015](https://github.com/NousResearch/hermes-agent/issues/103015)).
- **[#56521](https://github.com/NousResearch/hermes-agent/pull/56521)** / [#104670](https://github.com/NousResearch/hermes-agent/pull/104670)** — Complete Czech (cs) localization across CLI, web dashboard, and Electron desktop app, rebased onto latest main.
- **[#58374](https://github.com/NousResearch/hermes-agent/pull/58374)** / [#58367](https://github.com/NousResearch/hermes-agent/pull/58367)** — Poolside (Laguna) first-class provider support with integer `finish_reason` and `tool_call.id` normalization.
- **[#104572](https://github.com/NousResearch/hermes-agent/pull/104572)** — Atomic disabled-job creation for cron scheduler (closes race window between create and pause).
- **[#104637](https://github.com/NousResearch/hermes-agent/pull/104637)** / [#104638](https://github.com/NousResearch/hermes-agent/pull/104638)** / [#104634](https://github.com/NousResearch/hermes-agent/pull/104634)** / [#104635](https://github.com/NousResearch/hermes-agent/pull/104635)** — Credential pool improvements: `request_count` now increments across all strategies; `auth priority` / `auth refresh` / `auth reset` gain targeted subcommands.
- **[#104693](https://github.com/NousResearch/hermes-agent/issues/104693)** — Honcho automatic recall no longer injects results for the previous user message (hybrid mode fix).
- **[#104782](https://github.com/NousResearch/hermes-agent/issues/104782)** — `kanban_complete` is no longer unreachable during `handle_max_iterations`' toolless summary (false circuit-breaker strike eliminated).
- **[#103556](https://github.com/NousResearch/hermes-agent/issues/103556)** — GPT-6 Astra `MAX` reasoning is no longer silently clamped to `xhigh` on `openai-codex`.
- **[#104711](https://github.com/NousResearch/hermes-agent/issues/104711)** — Streaming crash from list-shaped `reasoning_content` (Grok / OpenAI-compatible relays) fixed.
- **[#104448](https://github.com/NousResearch/hermes-agent/issues/104448)** — Stale `latest.json` fleet-restart warning after successful update retry replaced.

### Open PRs advancing
- **[#105197](https://github.com/NousResearch/hermes-agent/pull/105197)** — Bot-mode Group Chat recovery after host loss (draft implementation for [#97681](https://github.com/NousResearch/hermes-agent/issues/97681)).
- **[#105203](https://github.com/NousResearch/hermes-agent/pull/105203)** — Loud failure when desktop renderer chunk is not valid ESM (addresses #105184 white-screen regression).
- **[#105200](https://github.com/NousResearch/hermes-agent/pull/105200)** — Telegram gateway deletes abandoned streaming preview when final lands.
- **[#105199](https://github.com/NousResearch/hermes-agent/pull/105199)** — Desktop task panel works after `todo_list` rename; subagent progress survives `display.tool_progress: off`.
- **[#105201](https://github.com/NousResearch/hermes-agent/pull/105201)** — Desktop profile editors explain missing `SOUL.md`.
- **[#92437](https://github.com/NousResearch/hermes-agent/pull/92437)** — Claude Code-style ask/allow/deny approval rules (long-standing user ask).
- **[#104687](https://github.com/NousResearch/hermes-agent/pull/104687)** — Windows desktop update preserves ownership and relaunches.

---

## 4. Community Hot Topics

| Item | Type | Comments | Underlying Need |
|---|---|---|---|
| [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) | Bug (automated) | 173 | **Skills index freshness watchdog** — index is 29.8h old vs 26h limit, blocking the Skills Hub. A long-standing infrastructure signal that the rebuild cron (6/18 UTC) is unreliable. |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | Feature | 27 | **Multi-device Bot Group Chat continuity** — users want group conversations to outlive any single host so they can move between laptop / home server / VPS without losing context. |
| [#80246](https://github.com/NousResearch/hermes-agent/issues/80246) | Bug (closed) | 9 | **Token-estimator ignoring `reasoning_content`** — DeepSeek/Kimi long-thinking sessions hit false "context overflow" because the Web UI undercounts. Highlights the need for provider-real usage. |
| [#103015](https://github.com/NousResearch/hermes-agent/issues/103015) | Feature tracker | 6 | **GPT-6 Astra roll-out** — broad cross-cutting integration with provider-native async tools, steering, effort-cache changes, compaction. |
| [#100437](https://github.com/NousResearch/hermes-agent/issues/100437) | Bug | 5 | **v0.21.0 cron regression** — agent-type cron jobs ignore model pin and Ollama 64K context gate fails. Signals broken release path needing point-fix. |
| [#46332](https://github.com/NousResearch/hermes-agent/issues/46332) | Bug (Windows) | 5 | **`shutil.which("bash")` resolves WSL over Git Bash** — Windows-native cron with `.sh` scripts is broken; MSYS also eats backslashes. |

**Analysis:** The two largest topics (Skills index watchdog, multi-device Group Chat) represent two very different layers of pain — infrastructure freshness vs. user-facing resilience. Both deserve dedicated engineering ownership rather than ad-hoc fixes.

---

## 5. Bugs & Stability

### Critical / P1
- **[#104653](https://github.com/NousResearch/hermes-agent/issues/104653)** — **Inbound user turns persisted twice** (gateway + agent flush) on Telegram/gateway sessions, with `platform_message_id` set on one row and NULL on the other. History rehydration shows every user message twice. No fix PR yet. **Highest severity open bug.**

### High / P2
- **[#105184](https://github.com/NousResearch/hermes-agent/issues/105184)** — **Desktop in-app update emits corrupted renderer bundle** → white screen with `Uncaught SyntaxError`. Build reports success. Fix PR [#105203](https://github.com/NousResearch/hermes-agent/pull/105203) open.
- **[#105145](https://github.com/NousResearch/hermes-agent/issues/105145)** — **Windows desktop-driven `hermes update` always reports FAILED (exit 8)** despite successful update; post-update verification resolves wrong working directory. Fix PR [#104687](https://github.com/NousResearch/hermes-agent/pull/104687) open.
- **[#105176](https://github.com/NousResearch/hermes-agent/issues/105176)** — **Desktop steer message echoes in wrong conversation window** (session/state mismatch). No PR yet.
- **[#105202](https://github.com/NousResearch/hermes-agent/issues/105202)** — **Delegated subagents inherit `HERMES_KANBAN_TASK`** and can `kanban_complete` parent task, deleting workspace prematurely. Existing ownership guard fails. No PR yet.
- **[#105189](https://github.com/NousResearch/hermes-agent/issues/105189)** — **Mid-tool-call stream drop replaces incomplete args with `{}`** and dispatches call — dangerous for side-effecting tools. No PR yet.
- **[#100437](https://github.com/NousResearch/hermes-agent/issues/100437)** — v0.21.0 cron agent-jobs ignore model pin; Ollama 64K context gate fails. No PR yet.
- **[#46332](https://github.com/NousResearch/hermes-agent/issues/46332)** — Windows cron `.sh` scripts fail (WSL vs Git Bash precedence). No PR yet.
- **[#94486](https://github.com/NousResearch/hermes-agent/issues/94486)** — **Switching model mid-session drops next user prompt** (message-alternation repair + missing `row_id`). No PR yet.
- **[#104505](https://github.com/NousResearch/hermes-agent/issues/104505)** — **Nous Portal subscription proxy blocks `/v1/responses`** even though upstream supports it; Codex CLI broken on Nous subscriptions. No PR yet.

### Medium / P3
- **[#104693](https://github.com/NousResearch/hermes-agent/issues/104693)** (CLOSED) — Honcho recall injects previous message's context.
- **[#105052](https://github.com/NousResearch/hermes-agent/issues/105052)** (CLOSED) — Desktop chat input loses focus mid-run.
- **[#96219](https://github.com/NousResearch/hermes-agent/issues/96219)** — Animations freeze when window is unfocused (UX regression).
- **[#104653](https://github.com/NousResearch/hermes-agent/issues/104653)** overlaps with several session-state reports.

**Severity ranking:** P1 #104653 > desktop update corruption chain (#105184 + #105145) > #105202 / #105189 / #105176 (state/delegation safety) > provider regressions (#100437, #104505) > Windows ergonomics (#46332).

---

## 6. Feature Requests & Roadmap Signals

### Strong signals (likely next release)
- **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681) Bot Group Chat continuity** — PR [#105197](https://github.com/NousResearch/hermes-agent/pull/105197) draft implementation already in review.
- **[#92437](https://github.com/NousResearch/hermes-agent/pull/92437) Claude Code-style ask/allow/deny** — long-open PR, clearly high user demand for nuanced approvals.
- **GPT-6 Astra baseline support** ([#103015](https://github.com/NousResearch/hermes-agent/issues/103015) / #103016) — partially landed, tracker still open for provider-native async/steering/effort-cache.

### Moderate signals
- **[#96219](https://github.com/NousResearch/hermes-agent/issues/96219)** — Option to keep animations running when window is unfocused (low effort, high polish).
- **[#105188](https://github.com/NousResearch/hermes-agent/issues/105188)** — Wall-clock bound on progress-making agent turn (safety request).
- **[#104462](https://github.com/NousResearch/hermes-agent/issues/104462)** — Token accounting refactor: every compaction decision driven by provider's real usage, not `bytes/4`. Strong maintainer ownership (Teknium).
- **[#105204](https://github.com/NousResearch/hermes-agent/pull/105204)** — `unread` flag surfaced in API client projection (small but coherent with session UX).

### Lower priority / speculative
- More locales beyond Czech (no other PRs but the pattern suggests continued i18n expansion).
- Poolside becoming a first-class provider ([#58374](https://github.com/NousResearch/hermes-agent/pull/58374) closed — may ship under a "first-class provider" feature flag).

---

## 7. User Feedback Summary

### Pain points (recurring themes)
1. **Windows desktop update flow is fragile** — multiple bug reports (#105145, #105184, #46332, #104687) describe in-app updates silently corrupting bundles, resolving wrong working directories, or selecting the wrong `bash`. Users feel the Linux/Mac story is solid but Windows is a stepchild.
2. **Cron / scheduling regressions after v0.21.0** — model pins ignored, local Ollama fallback broken, kanban tasks closed prematurely (#100437, #105202, #104782). Users explicitly cite "after updating to v0.21.0."
3. **Reasoning-model context handling** — DeepSeek/Kimi/XAI users (#80246, #104711) hit false overflows and streaming crashes because Hermes assumes `reasoning_content` is a string and ignores its token cost. Clear demand: provider-real token accounting.
4. **Session / message-state consistency** — double-persisted turns (#104653), steer messages landing in wrong window (#105176), dropped prompts on model switch (#94486). Users describe "I see messages I never typed" / "my prompt disappeared" — high trust impact.
5. **Credential pool ergonomics** — auth reset / refresh / priority subcommands all landed today; users were previously forced to wait for `last_error_reset_at` to elapse or wipe pools entirely (#89415, #44799 referenced). The four merged auth PRs directly address this.
6. **Multi-device Bot workflows** — [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) shows users are deploying Bots across machines and want Group Chat state to be resilient to host loss. High aspirational value.

### Satisfaction signals
- Czech localization is welcomed and merged cleanly (rebased twice — strong review hygiene).
- Auth / credential pool PRs by `0xble` show a tight feedback loop between user-reported pain and CLI improvements.
- Honcho recall fix (#104693) closes a subtle but annoying off-by-one memory injection.

---

## 8. Backlog Watch

### Needs maintainer attention (no PR or activity yet)
- **[#104653](https://github.com/NousResearch/hermes-agent/issues/104653)** — P1, message double-write on all gateway platforms. **Must-fix before next release.** No PR yet despite being the highest-severity open issue.
- **[#105202](https://github.com/NousResearch/hermes-agent/issues/105202)** — Delegated subagent can close parent Kanban task and delete workspace. Safety-critical; no PR.
- **[#105189](https://github.com/NousResearch/hermes-agent/issues/105189)** — Tool calls dispatched with `{}` after stream drop; dangerous for side-effecting tools. No PR.
- **[#105176](https://github.com/NousResearch/hermes-agent/issues/105176)** — Steer message routed to wrong chat window in Desktop. Trust-impacting; no PR.
- **[#100437](https://github.com/NousResearch/hermes-agent/issues/100437)** — v0.21.0 cron regression. Needs confirmation whether a point-fix or revert is planned.
- **[#104505](https://github.com/NousResearch/hermes-agent/issues/104505)** — Nous Portal `/v1/responses` block. Blocks Codex CLI on Nous subscriptions.
- **[#46332](https://github.com/NousResearch/hermes-agent/issues/46332)** — Long-standing (since 2026-06-14) Windows cron `.sh` issue. Has 5 comments but no PR.

### Aging / stale
- **[#66616](https://github.com/NousResearch/hermes-agent/issues/66616)** — Skills index watchdog at 173 comments is likely automated bot churn, but it indicates the rebuild workflow needs reliability work rather than per-incident triage.
- **[#94486](https://github.com/NousResearch/hermes-agent/issues/94486)** — Open since 2026-08-25, mid-session model-switch drops prompt. No PR.
- **[#104192](https://github.com/NousResearch/hermes-agent/issues/104192)** referenced (commit `8d4b7f874d5`) — already merged but cited as precedent for the broader token-accounting refactor [#104462](https://github.com/NousResearch/hermes-agent/issues/104462).

### Resolution campaign tracker
- **[#104868](https://github.com/NousResearch/hermes-agent/issues/104868)** — Teknium's 51-issue / 15-lane cleanup is explicitly **no merge authorization** — every PR returns to Teknium for review. This is a bottleneck; expect cadence to be gated by maintainer availability.

---

*Digest generated from GitHub activity snapshot for 2026-09-08 (24h window). All links point to NousResearch/hermes-agent.*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-08

## 1. Today's Overview

IronClaw showed moderate, maintenance-oriented activity over the past 24 hours with **1 issue** and **13 PRs** updated, no new releases. The PR mix is dominated by **automated dependency bumps** (5 of 13) and a coordinated batch of **WebUI polish work** (4 PRs by `italic-jinxin`) targeting command result cards, slash-command menus, and keyboard navigation. Feature-level fixes advanced on the assistant layer (Slack shared-channel disambiguation) and the MCP lane (response-leak diagnostic classification). Overall project health appears stable — steady housekeeping rather than reactive firefighting — though the daily failure-taxonomy issue surfaces ongoing model-quality regressions in `officeqa`.

## 2. Releases

**No new releases in the past 24 hours.** No version tags reported.

## 3. Project Progress

Three PRs were closed/merged today, all routine dependency refreshes:

| PR | Title | Type |
|---|---|---|
| [#8049](https://github.com/nearai/ironclaw/pull/8049) | chore(deps): bump the everything-else group (19 Rust updates, e.g. `uuid` 1.24.0→1.26.0, `base64` 0.22.1→0.23.1, `toml`) | Deps (closed) |
| [#7835](https://github.com/nearai/ironclaw/pull/7835) | chore(deps): bump the actions group (5 GitHub Actions updates incl. `actions/setup-node` 4.0.2→7.0.0) | CI/Deps (closed) |
| [#7020](https://github.com/nearai/ironclaw/pull/7020) | chore(deps): bump tokio-tungstenite 0.29.0→0.30.0 (tokio-ecosystem) | Deps (closed) |

These close out a Rust ecosystem refresh wave and an Actions toolchain bump; no user-facing feature merges were recorded today.

## 4. Community Hot Topics

Engagement across today's items is low (0 reactions/comments on all listed items), but the following threads are operationally meaningful:

- **[Issue #8081 — Daily ironclaw failure taxonomy — 2026-09-07](https://github.com/nearai/ironclaw/issues/8081)** (open). The recurring daily taxonomy of benchmark failures. Today's cut shows **42 non-passes in `officeqa`** described as "overwhelmingly genuine model-quality numeric errors" attributed to **DeepSeek-V4-Flash**. Underlying need: continuous visibility into model regressions and a structured failure taxonomy to triage suites.
- **[PR #8077 — fix(mcp): classify response leak diagnostics](https://github.com/nearai/ironclaw/pull/8077)** (open, closes [#8009](https://github.com/nearai/ironclaw/issues/8009)). Centralizes the `response_leak_blocked` sentinel in `ironclaw_host_api::http` and teaches the MCP lane to distinguish host-blocked from MCP-visible reasons — a signal that operator visibility into security-relevant block decisions is being prioritized.
- **[PR #8076 — fix(assistant): distinguish disconnected shared channels](https://github.com/nearai/ironclaw/pull/8076)** (open). Addresses ambiguity in Slack adapters between paired-but-disconnected and never-paired channels, indicating community pressure for clearer pairing-state UX.

## 5. Bugs & Stability

| Severity | Item | Status | Notes |
|---|---|---|---|
| Medium | [PR #8077 — MCP response-leak diagnostic classification](https://github.com/nearai/ironclaw/pull/8077) | Fix proposed (closes #8009) | Host leak-blocking was over-collapsing reasons; MCP now exposes a distinct classification. Security-adjacent. |
| Medium | [PR #8076 — Disconnected shared-channel disambiguation](https://github.com/nearai/ironclaw/pull/8076) | Fix proposed | Could cause users to retry pairing on already-paired channels; guidance text + Slack capability doc updated. |
| Low | [PR #8071 — Command-result card height collapse](https://github.com/nearai/ironclaw/pull/8071) | Fix proposed (XS) | Layout regression in transcript flex column. |
| Low | [PR #8070 — Slash-command metadata alignment](https://github.com/nearai/ironclaw/pull/8070) | Fix proposed (XS) | Variable-width rows broke responsive grid; narrow-viewport truncation added. |
| Low | [PR #8069 — Missing dismiss actions on command result cards](https://github.com/nearai/ironclaw/pull/8069) | Fix proposed (M) | Accessibility gap; threading callback through `Chat`→`MessageList`→`MessageBubble`. |
| Low | [PR #8068 — Active slash command not kept in scroll viewport](https://github.com/nearai/ironclaw/pull/8068) | Fix proposed (S) | Keyboard-navigation UX regression. |

**Model-quality signal (non-code):** [#8081](https://github.com/nearai/ironclaw/issues/8081) flags systematic numeric failures from **DeepSeek-V4-Flash** on `officeqa`. Not a code bug, but a reliability concern for downstream users relying on that model.

## 6. Feature Requests & Roadmap Signals

No explicit feature-request issues were opened today. However, the merged PR direction suggests near-term themes:

- **WebUI command-result ergonomics**: The four `italic-jinxin` PRs ([#8068](https://github.com/nearai/ironclaw/pull/8068), [#8069](https://github.com/nearai/ironclaw/pull/8069), [#8070](https://github.com/nearai/ironclaw/pull/8070), [#8071](https://github.com/nearai/ironclaw/pull/8071)) collectively ship dismiss actions, scroll containment, responsive alignment, and keyboard-navigation polish. Likely candidates for the next release's WebUI changelog.
- **MCP diagnostic surface area**: [#8077](https://github.com/nearai/ironclaw/pull/8077) signals a broader investment in clearer MCP-host boundary error reporting — expect more in this area.
- **Cross-surface parity for assistant states**: [#8076](https://github.com/nearai/ironclaw/pull/8076) mentions "consistent rejection classification across product, adapter, and OpenAI-compatible surfaces," suggesting an ongoing unification effort.

## 7. User Feedback Summary

Concrete feedback channels are quiet (0 comments across all items today), but inferred user pain points:

- **WebUI ergonomics**: A cluster of four tightly-scoped WebUI fixes indicates recent user (or QA) reports around command-result cards collapsing, slash-command misalignment on narrow viewports, missing dismiss affordances, and keyboard-navigation losing active options — typical high-frequency friction in chat transcripts.
- **Channel-pairing confusion** ([#8076](https://github.com/nearai/ironclaw/pull/8076)): Users cannot distinguish "disconnected" from "unpaired" shared channels, leading to wasted pairing attempts.
- **MCP black-boxing** ([#8077](https://github.com/nearai/ironclaw/pull/8077)): Operators could not tell why a response was blocked — privacy vs. host policy reasons were collapsed.
- **Model-quality dissatisfaction** (via [#8081](https://github.com/nearai/ironclaw/issues/8081)): DeepSeek-V4-Flash's numeric accuracy on `officeqa` is a recurring weak spot; users depending on deterministic numeric answers may need a model-router or warning.

No explicit satisfaction signals captured today.

## 8. Backlog Watch

- **[#7834 — chore(deps): bump the wasm group (4 updates)](https://github.com/nearai/ironclaw/pull/7834)** — Open since **2026-08-23** (~16 days). `wasmtime`, `wasmtime-wasi`, `wit-component`, `wit-parser` updates have been pending; medium-risk and depended on by core WASM tooling. Worth a maintainer push.
- **[#8081 — Daily ironclaw failure taxonomy](https://github.com/nearai/ironclaw/issues/8081)** — Recurring triage issue; ensure daily taxonomies are being reviewed by model-evaluation maintainers and not just auto-archived.
- **[#8009](https://github.com/nearai/ironclaw/issues/8009)** — Referenced as closing issue for [#8077](https://github.com/nearai/ironclaw/pull/8077); confirm merge leaves no follow-up diagnostics gaps.
- No high-priority issues appear stuck without maintainer attention today; the backlog risk is concentrated in dependency staleness rather than user-reported blockers.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-08

## 1. Today's Overview

QwenPaw shows a **high-activity, high-bug-density day** with 41 issues and 48 PRs updated in the last 24 hours, despite no new releases shipped. Community signal is dominated by **v2.2.0 regression reports** — particularly around context/memory handling, work-directory UX, and stream-timeout configurability — alongside an active refactor wave around memory backends (ReMe 0.4.1.12 prep, ADBPG/PowerContext plugin migration, OpenViking integration). Maintainer throughput remains healthy: 5 PRs merged/closed today (including a tool-arg coercion fix, sidebar icon unification, console test coverage +5pp, CI release-window freeze, and a memory-lifecycle refactor), while 30 PRs remain open for review. **Overall project health: active but visibly strained**, with several open critical-severity bugs (lost-context loop, heartbeat feedback pile-up) that have not yet received a fix.

## 2. Releases

**No new releases in the last 24 hours.**

The most recent version referenced across issues is **v2.2.0** (PyInstaller-packed desktop backend). Multiple "regression from 2.1.0 → 2.2.0" reports have appeared in the same window (work-directory picker, LLM stream idle timeout hardcoded, lost-context bug). Maintainers may want to consider a **v2.2.1 patch** or a documented workaround set if these cluster into a single release.

## 3. Project Progress

**Merged/Closed PRs (5 total):**

| PR | Area | Impact |
|---|---|---|
| [#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936) — fix(providers): coerce string-typed tool args | Providers / MCP | Resolves [#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839). Models that emit unquoted numbers for `type: string` schema fields (e.g. `"assetInfo": 1.000001`) are now coerced before jsonschema validation, eliminating a class of MCP tool-call failures. |
| [#7499](https://github.com/agentscope-ai/QwenPaw/pull/7499) — unify nav and theme-toggle icons | Console UI | Closes the visual inconsistency in #7376 by aligning three off-family sidebar icons to the Spark thin-line series. |
| [#7530](https://github.com/agentscope-ai/QwenPaw/pull/7530) — console unit tests +245 cases | Test infra | Statement coverage +5.02pp; fourth sprint in the ongoing frontend-coverage campaign. |
| [#7603](https://github.com/agentscope-ai/QwenPaw/pull/7603) — ci: freeze default-branch merges during releases | Release infra | Prevents the v2.2.0-beta.4 incident where #7267 was merged into `main` while the release pipeline was still running. Artifacts were SHA-pinned (correct), but the policy now enforces a release-window merge freeze. |
| [#7561](https://github.com/agentscope-ai/QwenPaw/pull/7561) — refactor(memory): unify automatic memory lifecycle and actions | Memory core | **Breaking refactor.** Replaces the summarization-based capture with a unified automatic-memory lifecycle (capture / recall / background execution / optional backend actions). Pairs with [#7616](https://github.com/agentscope-ai/QwenPaw/pull/7616) (ADBPG + PowerContext → plugins). |

## 4. Community Hot Topics

**Top by comment volume (last 24h):**

1. **[#7505](https://github.com/agentscope-ai/QwenPaw/issues/7505) — LAN LLM client disconnects (12 comments, closed)**
   The single most-discussed item today. QwenPaw→LM Studio on LAN triggers frequent client-disconnects → retry storms → final timeout. Underlying need: **graceful handling of long-running LAN LLM streams** and configurable retry budget. Closed without a code fix noted; users on similar topologies are still affected.

2. **[#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — Model "forgets" its own reply (5 comments, OPEN, HIGH severity)**
   Persisted assistant replies vanish from subsequent requests → empty responses and tool-call loops. This is the same root issue as [#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584) (closed dup). Multiple users reporting identical symptoms → **systemic context-persistence bug in v2.2.0**, not an isolated case.

3. **[#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) — 409 on new messages during a running task (5 comments, OPEN)**
   Users expect queued messages; the API instead returns `409 {"detail":"A task is already running..."}`. Directly motivates [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) — chat submissions routed into a localStorage queue that waits for backend idle. Strong UX consensus: this is wrong default behavior.

4. **[#6820](https://github.com/agentscope-ai/QwenPaw/issues/6820) — Frontend UI hides model output until task completes (5 comments, closed)**
   Streaming is happening on the backend but not rendered until the run finishes. Echoes [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) symptom (user sees "nothing", then a flood).

5. **[#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839) — MCP tool arg coercion (4 comments, closed via [#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936))**
   Good example of issue→PR closure within the window.

**Underlying need pattern:** users want QwenPaw to behave predictably under (a) long-running streams, (b) concurrent user input during a task, and (c) model output that the assistant itself just generated. The "lost context" cluster is the most concerning because it is both frequent and silent (no surfaced error).

## 5. Bugs & Stability

Ranked by severity × user impact. Fix availability noted.

| Severity | Issue | Status | Fix PR? |
|---|---|---|---|
| 🔴 Critical | [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) / [#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584) — assistant reply lost from context, causes tool-call loops and "ai 行为错乱" | Open (dup closed) | None yet. **Top-priority fix candidate.** |
| 🔴 Critical | [#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589) — Heartbeat cron session feedback loop causes ~2-hour agent unresponsiveness | Open | None |
| 🟠 High | [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) — sync calls block event loop 118–135s on startup, 126s per message; timeout never fires | Open (since 08-27) | None |
| 🟠 High | [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) — tool-returned image/PDF as bare base64 (`type: data`) hits 400 "file must have file_id or file_data" | Open | None |
| 🟠 High | [#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576) — `RetryChatModel` hardcoded 32768 fallback forces every model into CONTEXT_UNFIT at 31130 tokens | Open | None |
| 🟠 High | [#7617](https://github.com/agentscope-ai/QwenPaw/issues/7617) — PDF DataBlock in tool result permanently breaks text-only OpenAI-compat endpoints (Zhipu GLM code 1210) | Open | None |
| 🟠 High | [#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541) — scroll compression injects `[context compressed]` as `role=user` → MODEL_EXECUTION_ERROR on DeepSeek | Open (since 07-29) | None |
| 🟠 High | [#7587](https://github.com/agentscope-ai/QwenPaw/issues/7587) — OpenAI-compat provider gets Cloudflare 403 (managed challenge) connecting to WUSRouter | Open | None |
| 🟡 Medium | [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) — 409 on new messages during running task | Open | [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) in review |
| 🟡 Medium | [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) — stop button shows stopped but task keeps running | Open | None |
| 🟡 Medium | [#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572) — tool dispatch `_drain()` swallows exception stack (only `str(exc)` returned to model) | Open | [#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578) in review (first-time contributor) |
| 🟡 Medium | [#7513](https://github.com/agentscope-ai/QwenPaw/issues/7513) — DeepSeek-v4-pro output interleaves with QwenPaw tool calls (mixed markdown) | Open | None |
| 🟡 Medium | [#7585](https://github.com/agentscope-ai/QwenPaw/issues/7585) — Telegram channel renders `|` and `---` literally for markdown tables | Open | None |
| 🟢 Low | [#7604](https://github.com/agentscope-ai/QwenPaw/issues/7604) — LLM stream idle timeout (30s) hardcoded, not configurable via WebUI/envs.json in v2.2.0 | Closed | Likely addressable by exposing envs.json setting |
| 🟢 Low | [#7099](https://github.com/agentscope-ai/QwenPaw/issues/7099) — dark-mode channel tag unreadable (LESS selector bug) | Closed | None noted |
| 🟢 Low | [#7006](https://github.com/agentscope-ai/QwenPaw/issues/7006) — language option list mismatch between top-right dropdown and settings gear | Closed | None noted |
| 🟢 Low | [#7594](https://github.com/agentscope-ai/QwenPaw/issues/7594) — single task output duplicated 3× across an hour (web) | Closed | None noted |

**Pattern:** A disproportionate share of today's high-severity bugs concern **context persistence, schema coercion for tool arguments, and event-loop blocking**. None of the top 5 critical/high items have a published fix PR.

## 6. Feature Requests & Roadmap Signals

**Likely v2.2.1 / v2.3.0 candidates** (multiple users, recurring complaints, fix PRs already in flight):

| Signal | Issue / PR | Why likely soon |
|---|---|---|
| Sidebar + settings redesign | [#7502](https://github.com/agentscope-ai/QwenPaw/pull/7502) — feat(console): redesign sidebar and settings experience | Open PR by maintainer-area contributor; addresses [#7588](https://github.com/agentscope-ai/QwenPaw/issues/7588) and [#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601) (work-directory UX regression) |
| Queue, don't 409 | [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) — fix(console): prevent chat submissions from bypassing the queue | Directly resolves [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) |
| Reranker config UI | [#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399) — feat: reranker UI panel in ReMeLightMemoryCard | Under Review since 07-23, slow-track |
| Plugin manager update flow | [#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605) — fix/issue 7582 plugin manager | Update detection + per-plugin / "Update All" |
| Skill version + dependency validation | [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609) — feat(skills): expose versions and validate declared deps | Closes gap surfaced by [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) (agent "forgets" project layout conventions) |
| OpenViking long-term memory backend | [#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613) | First-time-contributor, REST scope from #7252 |
|

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-08

## 1. Today's Overview

ZeroClaw is in a heavy stabilization and architectural convergence phase. While no new release shipped in the last 24 hours, the project logged **26 issue updates** (23 open, 3 closed) and **50 PR updates** (49 open, 1 merged/closed), with new tracker issues defining implementation batches for "reliable agent delivery and cron outcome reporting" (#10685) and a "bootstrap launcher and release-target registry" (#10684). The work concentrates on three areas: ACP/ZeroCode turn persistence, Anthropic prompt-cache strategy refinement, and runtime/session-ownership hardening. Activity intensity is high — sustained triaging on the v0.8.5 line (#9459) plus forward-looking security, caching, and MCP-bootstrap design.

## 2. Releases

No new releases published in the last 24 hours. The v0.8.5 stabilization tracker (#9459) remains the active release line, with weekly cuts shipping ready work without waiting on every milestone item.

## 3. Project Progress

Only **1 PR merged/closed** in the last 24 hours, but the volume of code movement is significant:

- **#10649 — `fix(ci): allow PR size label updates`** — Grants the PR Size Labeler workflow `pull-requests: write` and removes the redundant `issues: write` scope. A small but important CI hygiene fix that unblocks future automation.
- **Closed Issues (3):** #8720 (Bedrock Nova 2 Lite `cachePoint` toggle via config), #9575 (warm OpenAI-compatible connections via `/models`), #10572 (WeCom/WeChat Work channel documentation).

The merge-to-open-PR ratio (~2%) reflects that most submitted work is still in review or awaiting author action; the open stack is dominated by **size:XL** architectural refactors (e.g., #10621, #10407, #10381, #10591, #9584, #9739) — typically the kind of work that takes more than one review cycle.

## 4. Community Hot Topics

The most engaged thread is a support issue, not a bug:

- **[Issue #8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720)** — *Disable cachePoint for Bedrock Nova 2 Lite via config* — **12 comments**, closed today after community configuration discussion. Underlying need: users need per-provider/model runtime overrides for caching behavior, not just global toggles.
- **[Issue #10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)** — *Daemon stack overflow on Quickstart apply* — **6 comments**. Workflow-blocker severity; tracks a Tokio worker crash during live config reload.
- **[Issue #9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)** — *Failed ACP turns vanish after session switch* — **4 comments**. This thread spawned derivative work: #10121, #10659, #10673 — it is the canonical user-impact bug for the ZeroCode Code pane.
- **[Issue #10408](https://github.com/zeroclaw-labs/zeroclaw/issues/10408)** — *Parallel runs from a second message in same session* — **3 comments**. Duplicate-work bug hitting real users.
- **[Issue #10121](https://github.com/zeroclaw-labs/zeroclaw/issues/10121)** — *Partial ACP turns lost on process exit* — **3 comments**. Data-loss severity.
- **[Issue #9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191)** — *Cron jobs lack wall-clock timeout* — **3 comments**. Long-standing reliability concern.
- **[Issue #9575](https://github.com/zeroclaw-labs/zeroclaw/issues/9575)** — *Warm OpenAI-compatible through `/models`* — **3 comments**, closed today. Healthy feedback loop: community flagged a wasteful warmup path, PR followed.

**Underlying need:** users want the runtime to behave predictably across concurrent sessions and on crashed turn boundaries. The cluster around ACP/Code-pane persistence (#9333, #10121, #10659, #10673, #10667) is the single biggest UX theme of the week.

## 5. Bugs & Stability

Ranked by user impact and severity tags:

| Severity | Issue | Component | Fix Status |
|---|---|---|---|
| **S0 — data loss** | [#10121](https://github.com/zeroclaw-labs/zeroclaw/issues/10121) partial ACP turns lost on exit | ZeroCode/TUI | Related work: #9378 (open, `needs-author-action`) |
| **S1 — workflow blocked** | [#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230) daemon stack overflow on Quickstart | Daemon/Tokio | No matching PR linked |
| **S1 — workflow blocked** | [#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) failed ACP turns vanish on session switch | channel:acp | Partial fix in #9378; #10673 is the remaining slice |
| **S1 — workflow blocked** | [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) cron jobs have no wall-clock timeout | runtime/daemon | No fix PR |
| **S1 — workflow blocked** | [#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659) budget-exceeded Code turn loses progress | ZeroCode/TUI | No fix PR |
| **S1 — workflow blocked** | [#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670) `heartbeat.target` rejects composite channel keys | runtime/daemon | No fix PR |
| **S2 — degraded** | [#10408](https://github.com/zeroclaw-labs/zeroclaw/issues/10408) parallel agent runs on second message | runtime/daemon | No fix PR |
| **S2 — degraded** | [#9940](https://github.com/zeroclaw-labs/zeroclaw/issues/9940) cron delivery channel can't resolve | runtime/daemon | No fix PR |
| **S2 — degraded** | [#10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115) tool-result truncation invisible in logs | runtime/daemon | No fix PR |
| **S2 — degraded** | [#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689) Telegram TTS drops replies starting with `[` | channel/telegram | No fix PR |
| **S2 — degraded** | [#10688](https://github.com/zeroclaw-labs/zeroclaw/issues/10688) WhatsApp Web never transcribes voice notes | channel/whatsapp | No fix PR |
| **S2 — degraded** | [#10667](https://github.com/zeroclaw-labs/zeroclaw/issues/10667) ZeroCode duplicates streamed response | ZeroCode/TUI | No fix PR |
| **S2 — security/cost** | [#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662) OAuth system-prefix cache marker too small | provider:anthropic | No fix PR |
| **S3 — minor** | [#10104](https://github.com/zeroclaw-labs/zeroclaw/issues/10104) `zeroclaw-hardware` lib tests never run in CI | tooling/ci | No fix PR |

**Pattern:** S1 bugs outnumber fix PRs. The single ACP persistence fix PR (#9378, marked `needs-author-action`, `stale-candidate`) is the bottleneck for several of the highest-severity reports. Health assessment: **stability risk is elevated**; weekly v0.8.5 cuts are absorbing work but the deepest bugs are waiting on maintainer review of XL PRs.

## 6. Feature Requests & Roadmap Signals

New enhancement requests in the last 24 hours cluster around prompt caching, configuration, and observability:

- **[#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663)** — *Configurable 1-hour prompt-cache TTL for Anthropic markers (native + passthrough)* — Anthropic now supports configurable TTLs; users want to stop paying the 5-minute default penalty.
- **[#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660)** — *Third cache breakpoint on previous-turn last message* — A two-marker scheme is leaving cache wins on the table; the author proposes three breakpoints.
- **[#10606](https://github.com/zeroclaw-labs/zeroclaw/issues/10606)** — *Sanitize component errors in unauthenticated `/health`* — Security-oriented: today the gateway health endpoint leaks arbitrary `last_error` strings from any component.
- **[#10665](https://github.com/zeroclaw-labs/zeroclaw/issues/10665)** — *Make ZeroCode's per-pane session limit configurable* — Currently hard-coded at 8.
- **[#10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674)** — *History trimming stops at the cap, defeating prompt cache* — Not labeled enhancement, but the description frames a fix request.

**Roadmap signal:** The newly-opened tracker [#10685](https://github.com/zeroclaw-labs/zeroclaw/issues/10685) ("Reliable agent delivery and cron outcome reporting") groups four distinct fixes — false send success, duplicate replies, missing cron outcomes, delivery channel — indicating an upcoming v0.8.6 or v0.9.0 batch cut focused on operator trust. Tracker [#10684](https://github.com/zeroclaw-labs/zeroclaw/issues/10684) bundles the canonical release-target registry (#10590) with the MCP bootstrap launcher (#10591), pointing to the next release exposing ZeroClaw as an MCP-installable target. **Likely-in-next-version predictions:** configurable Anthropic cache TTL (#10663), sanitized health responses (#10606), history-trim cache awareness (#10674), and at least one ACP persistence fix from #9378.

## 7. User Feedback Summary

Recurring real-world pain points expressed in today's thread traffic:

- **ACP / ZeroCode Code pane is fragile.** Five separate issues (#9333, #10121, #10659, #10667, #10673) describe turn-loss modes — failed, cancelled, budget-exceeded, process-killed — and the same loss-mode taxonomy recurs. Users want durable, replayable transcripts even when the daemon dies.
- **Cron is silently unreliable.** #9191 (no timeout), #9940 (delivery channel mis-resolution), and the new tracker #10685 explicitly cite "false send success" and "duplicate replies." Operators report they cannot tell whether unattended work ran or reached the intended recipient.
- **Concurrency is under-specified.** #10408 (parallel runs on second message) and #10670 (heartbeat target rejects multi-instance channel keys) show that users do try to run multiple instances and chat panes simultaneously; the system currently treats them as a misconfiguration rather than the norm.
- **Provider-side quirks are real.** Bedrock Nova 2 Lite cachePoint (#8720), ElevenLabs v3 audio tags being misinterpreted as Markdown by Telegram (#10689), WhatsApp Web having no transcription wiring at all (#10688) — the provider zoo keeps producing edge cases that users discover in production.
- **Configurability, not magic.** The closed #8720 and the new #10663 / #10665 / #10606 all share a theme: users want explicit knobs (TTL, session limit, sanitization policy) instead of implicit defaults.
- **Satisfaction signal:** the swift closure of #8720 and #9575 with concrete config knobs and the WeCom docs task (#10572) closing the same day indicate that when bugs are well-scoped, the maintainer loop is responsive. Dissatisfaction is concentrated on the larger architectural bugs where no PR exists yet.

## 8. Backlog Watch

These high-impact items have been open long enough or carry maintainer-action flags that warrant attention:

- **[PR #9378](https://github.com/zeroclaw-labs/zeroclaw/pull/9378)** — `fix(acp): persist failed and cancelled turn transcripts` — size:XL, flagged `needs-author-action` and `stale-candidate`. This PR is the missing piece for at least four open issues (#9333, #10121, #10659, #10673). Stalling here blocks the entire ACP-persistence cluster.
- **[PR #10381](https://github.com/zeroclaw-labs/zeroclaw/pull/10381)** — `fix(security): resolve host launchers before workspace cwd` — size:XL, `needs-maintainer-review`. High security risk; covers Firejail/Bubblewrap/Docker sandbox paths.
- **[PR #10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337)** — `fix(tools): honor allowed roots for git operations` — size:XL, `needs-author-action`. Security-boundary issue.
- **[PR #10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407)** — `feat(sessions): add persistent session prompt attachments` — size:XL, `needs-author-action`. Blocks session-ergonomics work; tagged across many subsystems.
- **[PR #10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391)** — `fix(delegate): bounded delegate filesystem tools respect target workspace` — size:XL, `needs-author-action`. Resolves #9872.
- **[PR #10412](https://github.com/zeroclaw-labs/zeroclaw/pull/10412)** — `feat(session): extract atomic session-ownership claim into SessionBackend contract` — size:XL, `needs-author-action`. Architectural foundation for multi-session fixes.
- **[PR #10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621)** — `feat(runtime): coordinate agent lifecycle mutations` — size:XL. Touches daemon, gateway, ACP, CLI; foundational.
- **[PR #9739](https://github.com/zeroclaw-labs/zeroclaw/pull/9739)** — `feat(zerocode): multi-session panes with agent sidebar` — size:XL, `needs-maintainer-review`. Maintainer note indicates review repairs were completed in place; awaiting final sign-off.
- **[PR #9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584)** — `feat(cli): add the egress grant ceremony to plugin install and list` — size:XL. Awaiting maintainer review.
- **[Issue #10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)** — Budget-exceeded Code turn loses visible progress after session restore. Only 1 comment but S1 severity; brand-new (2026-09-06), no PR yet — needs triage to confirm whether existing #9378 fixes it.
- **[Issue #10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)** — Daemon stack overflow on Quickstart reload. S1, no linked fix.
- **[Issue #9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191)** — Cron wall-clock timeout. Open since 2026-07-20, S1, no fix PR.

**Health call:** ZeroClaw is shipping small, well-scoped fixes quickly but accumulating XL architectural PRs whose review latency is now visibly gating multiple high-severity bug reports. Prioritizing review of #9378, #10381, #10412, and #10391 is the single highest-leverage move available to the maintainer team this week.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*