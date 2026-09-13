# OpenClaw Ecosystem Digest 2026-09-14

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-13 23:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-14

## 1. Today's Overview

OpenClaw experienced an unusually high-traffic 24-hour window with 1,000 issue/PR events (500 issues, 500 PRs), but no new tagged releases despite multiple P0 release-blocker reports tied to the just-shipped 2026.9.3 and 2026.9.4 versions. The dominant theme is **update/upgrade reliability and install lifecycle hygiene**: at least seven P0 issues (#146394, #145252, #145192, #146958, #140162, #143334, #143524, #147160) describe failure modes around managed updates, Doctor verification, SQLite WAL growth, and rollback paths for the 9.2 → 9.3/9.4 transition. Secondary themes are persistent **session/transcript correctness** (subagent completion loss, stuck lanes, internal context leaking to channels) and **MCP/Codex integration regressions**. The repository is highly active but operationally stressed, with the `clawsweeper` triage bot carrying much of the routing load and many issues marked `needs-product-decision` / `needs-maintainer-review`.

## 2. Releases

**No new releases published in the last 24 hours.** Tagged versions referenced in today's issues and PRs span `2026.6.11` → `2026.9.4`. Two release-blocker tracking issues dominate:

- **[#145252]** — Tracking: 2026.9.3 / 2026.9.4 update, upgrade and recovery reliability ([openclaw/openclaw#145252](https://github.com/openclaw/openclaw/issues/145252))
- **[#147160]** — Update failure: finalize:doctor (2026.9.4) ([openclaw/openclaw#147160](https://github.com/openclaw/openclaw/issues/147160))
- **[#146394]** — Update failure: global-install-failed (2026.9.3) ([openclaw/openclaw#146394](https://github.com/openclaw/openclaw/issues/146394))

## 3. Project Progress

266 PRs were merged/closed in the last 24h. Notable landed or superseded work:

- **[#135111]** (closed) — Fixed intermittent "Provider completed tool call with malformed JSON arguments" on v2026.8.1 ([openclaw/openclaw#135111](https://github.com/openclaw/openclaw/issues/135111))
- **[#85030]** (closed) — MCP tools not injected into subagent (sessions_spawn) sessions ([openclaw/openclaw#85030](https://github.com/openclaw/openclaw/issues/85030))
- **[#137927]** (closed) — Internal context block leaked into visible Telegram message text ([openclaw/openclaw#137927](https://github.com/openclaw/openclaw/issues/137927))
- **[#27445]** (closed) — `announceTarget` option for sub-agent completion routing ([openclaw/openclaw#27445](https://github.com/openclaw/openclaw/issues/27445))
- **[#63216]** (closed) — Repeated hard resets on same session key despite high reserveTokensFloor ([openclaw/openclaw#63216](https://github.com/openclaw/openclaw/issues/63216))
- **[#79904] / [#79903] / [#79905]** (closed, related cluster) — SQLite cursored transcript read API, durable session lineage across rotations, typed transcript projections ([openclaw/openclaw#79904](https://github.com/openclaw/openclaw/issues/79904), [#79903](https://github.com/openclaw/openclaw/issues/79903), [#79905](https://github.com/openclaw/openclaw/issues/79905))
- **[#145503]** (closed) — `skill_workshop` tool not registered after 2026.9.3 Workshop migration ([openclaw/openclaw#145503](https://github.com/openclaw/openclaw/issues/145503))
- **[#79752]** (closed) — gzip decompression regression under Node v26 on macOS affecting Discord HTTP ([openclaw/openclaw#79752](https://github.com/openclaw/openclaw/issues/79752))
- **[#79047]** (closed) — Preserve conversation context across cross-backend model switches ([openclaw/openclaw#79047](https://github.com/openclaw/openclaw/issues/79047))
- **[#58057]** (closed) — Dynamic identity resolution for allowlists (`dmPolicy: dynamic`) ([openclaw/openclaw#58057](https://github.com/openclaw/openclaw/issues/58057))
- **[#146958]** (closed) — 2026.9.2 → 2026.9.3 update failure with explicit linked plugin load path ([openclaw/openclaw#146958](https://github.com/openclaw/openclaw/issues/146958))
- **[#147522]** (closed) — Speed up SQLite snapshot worker startup ([openclaw/openclaw#147522](https://github.com/openclaw/openclaw/pull/147522))
- **[#147529]** (closed) — Overlap isolated quota and key UI fixtures in test suite ([openclaw/openclaw#147529](https://github.com/openclaw/openclaw/pull/147529))
- **[#60381]** (closed) — Browser tool: `force` parameter for click and `evaluate` action ([openclaw/openclaw#60381](https://github.com/openclaw/openclaw/issues/60381))
- **[#26494]** (closed) — Telegram Bot: single message / stops typing with streaming: partial ([openclaw/openclaw#26494](https://github.com/openclaw/openclaw/issues/26494))

In-flight PRs most likely to land soon (status: ready for maintainer look, sufficient proof):

- **[#147540]** — feat(macos): collapse completed work above chat replies ([openclaw/openclaw#147540](https://github.com/openclaw/openclaw/pull/147540))
- **[#143882]** — feat(slack): render streamed reasoning as task cards ([openclaw/openclaw#143882](https://github.com/openclaw/openclaw/pull/143882))
- **[#143937]** — fix(redaction): replay only provenance-marked persisted masks ([openclaw/openclaw#143937](https://github.com/openclaw/openclaw/pull/143937)) — flagged compatibility/session-state/security-boundary risk
- **[#144836]** — fix(update): report dirty checkouts as failed updates ([openclaw/openclaw#144836](https://github.com/openclaw/openclaw/pull/144836))
- **[#147544]** — fix(update): preserve replaced clone directories ([openclaw/openclaw#147544](https://github.com/openclaw/openclaw/pull/147544))
- **[#147543]** — reuse tool schema normalization across requests ([openclaw/openclaw#147543](https://github.com/openclaw/openclaw/pull/147543))
- **[#147538]** — reduce CPU spent on streamed session events ([openclaw/openclaw#147538](https://github.com/openclaw/openclaw/pull/147538))
- **[#147532]** — speed up history reads with long interior marker runs ([openclaw/openclaw#147532](https://github.com/openclaw/openclaw/pull/147532))
- **[#147499]** — preserve automation management after subagent waits ([openclaw/openclaw#147499](https://github.com/openclaw/openclaw/pull/147499)) — security-boundary risk

## 4. Community Hot Topics

The comment-count leaders reveal where users are losing the most time and trust:

1. **[#25592]** — "Text between tool calls leaks to messaging channels" (40 comments, 1 👍, diamond lobster) ([openclaw/openclaw#25592](https://github.com/openclaw/openclaw/issues/25592)). Six months old, still active. The recurring pain: any internal narration or error-handling text becomes a visible Slack/iMessage message. Signals a missing channel-level separation between reasoning traces and user-visible output.

2. **[#97616]** — "OpenClaw leaks unreaped hook/tool child processes, causing zombie accumulation" (31 comments, 1 👍, silver shellfish) ([openclaw/openclaw#97616](https://github.com/openclaw/openclaw/issues/97616)). Operationally critical for any long-running gateway. Strong "claw-sweeper-recovery-stuck" trail indicates triage bot cannot auto-recover.

3. **[#44925]** — "Subagent completion silently lost — no retry, no notification, no auto-restart on timeout" (28 comments, 2 👍, diamond lobster) ([openclaw/openclaw#44925](https://github.com/openclaw/openclaw/issues/44925)). Multiple failure modes (E31, E42, E45) compound; users in forum-mode Telegram have no idea their delegated work failed.

4. **[#135111]** — Intermittent "Provider completed tool call with malformed JSON arguments" on v2026.8.1 (27 comments, closed) ([openclaw/openclaw#135111](https://github.com/openclaw/openclaw/issues/135111)). Recently resolved but historically very active.

5. **[#91009]** — Codex PreToolUse native hook relay spawns CPU-bound `openclaw-hooks` processes (23 comments, 2 👍, silver shellfish) ([openclaw/openclaw#91009](https://github.com/openclaw/openclaw/issues/91009)). Each tool call burns 100%+ CPU and stalls gateway RPC — a stable performance regression.

6. **[#119720]** — "Synchronous agent persistence and transcript maintenance block the Gateway event loop at scale" (19 comments, diamond lobster) ([openclaw/openclaw#119720](https://github.com/openclaw/openclaw/issues/119720)). Maintainer-flagged: prior partial repairs via #140231 / #138984 changed the rewrite implementation; comment thread is the canonical status note for the rewrite.

7. **[#69208]** — Umbrella: duplicate transcript, replay, and context assembly across channels (15 comments, maintainer flag) ([openclaw/openclaw#69208](https://github.com/openclaw/openclaw/issues/69208)). Aggregates a family of dup/replay bugs across MSTeams, webchat, Telegram, followup queue, delivery-mirror consumer, and bootstrap paths.

Underlying need: users want **deterministic, non-leaky, recoverable multi-agent orchestration across messaging channels** — the current architecture leaks between reasoning → transcript → channel output, and provides no observability into stuck subagents.

## 5. Bugs & Stability

**P0 (release-blocker) — active:**

| Issue | Title | Notes |
|---|---|---|
| [#146394](https://github.com/openclaw/openclaw/issues/146394) | Update failure: global-install-failed (2026.9.3) | linux/arm64, npm update cannot complete |
| [#145192](https://github.com/openclaw/openclaw/issues/145192) | 2026.9.2 → 2026.9.4 managed update fails at candidate-Doctor on v1 handoff lease | Tracked in [#145252] |
| [#146958](https://github.com/openclaw/openclaw/issues/146958) | 2026.9.2 → 9.3 update fails on `llm-task` package-owner metadata with linked plugin | Closed today but symptomatic |
| [#140162](https://github.com/openclaw/openclaw/issues/140162) | Windows: gateway restart kills ready/slow-booting gateway as "stale process" after 181s | Closed today |
| [#145563](https://github.com/openclaw/openclaw/issues/145563) | WeChat channel reply dispatch fails with `PreparedModelCatalogConfigReplacedError` | Closed today |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | Agent SQLite WAL grows to 1.4–2.8 GB in days despite `wal_autocheckpoint=1000`; blocks gateway startup (Windows) | No fix PR yet |
| [#147160](https://github.com/openclaw/openclaw/issues/147160) | Update failure: finalize:doctor (2026.9.4) | darwin/x64, Node 24.18.0 |
| [#143334](https://github.com/openclaw/openclaw/issues/143334) | Lost subagent completion delivery parks requester in settle-yield; restart recovery fails | 9.3 regression |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | Codex PreToolUse hook relay spawns CPU-bound `openclaw-hooks` processes, stalls gateway RPC | Silver shellfish |

**P1 (high) — most comment activity:**

- **[#44925]** Subagent completion silently lost ([openclaw/openclaw#44925](https://github.com/openclaw/openclaw/issues/44925)) — diamond lobster; no fix PR yet.
- **[#25592]** Tool-call text leaks to channels ([openclaw/openclaw#25592](https://github.com/openclaw/openclaw/issues/25592)) — diamond lobster; PR linked but not yet ready.
- **[#119720]** Sync persistence blocks event loop ([openclaw/openclaw#119720](https://github.com/openclaw/openclaw/issues/119720)) — diamond lobster; rewrite in flight, two prior PRs landed.
- **[#144911]** MCP server init timeout crashes Gateway (`service child cleanup identity lost`) ([openclaw/openclaw#144911](https://github.com/openclaw/openclaw/issues/144911)) — diamond lobster; candidate fix shape.
- **[#139847]** Mid-reply message dropped — "Reply operation has no active tool authority snapshot" (2026.9.2 regression) ([openclaw/openclaw#139847](https://github.com/openclaw/openclaw/issues/139847)) — diamond lobster.
- **[#137332]** Mixed terminal requester-settle batches retry forever ([openclaw/openclaw#137332](https://github.com/openclaw/openclaw/issues/137332)) — diamond lobster.
- **[#141474]** `sessions_yield` strands `agents_wait` forever; `outputSchema` silently inert on claude-cli ([openclaw/openclaw#141474](https://github.com/openclaw/openclaw/issues/141474)) — diamond lobster.
- **[#132765]** `agents_wait` ignores `timeoutSeconds` — dies after ~60s as tool error ([openclaw/openclaw#132765](https://github.com/openclaw/openclaw/issues/132765)) — diamond lobster.
- **[#145152]** Stuck-session recovery reports force-clear as abort, names no run/owner identity ([openclaw/openclaw#145152](https://github.com/openclaw/openclaw/issues/145152)) — diamond lobster.
- **[#144809]** claude-cli turns longer than `RUN_STALE_TAKEOVER_MS` lose their entire generated reply ([openclaw/openclaw#144809](https://github.com/openclaw/openclaw/issues/144809)).
- **[#146118]** Superseded-task compaction guard does not cover Codex-native or non-overflow compaction ([openclaw/openclaw#146118](https://github.com/openclaw/openclaw/issues/146118)) — directly regresses the partial repair shipped in #123737.
- **[#101929]** Context-overflow mid-turn precheck over-counts 2.3–2.6× vs billed usage ([openclaw/openclaw#101929](https://github.com/openclaw/openclaw/issues/101929)) — causes premature truncation on tool-heavy turns.
- **[#81182]** Overflow recovery should truncate tool results before waiting full auto-compaction timeout ([openclaw/openclaw#81182](https://github.com/openclaw/openclaw/issues/81182)) — linked PR open.
- **[#113701]** Context overflow: large tool outputs exceed window, compaction can't recover, sessions enter failure loop ([openclaw/openclaw#113701](https://github.com/openclaw/openclaw/issues/113701)).
- **[#86214]** Codex app-server client closes mid-turn during

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem
**Snapshot date: 2026-09-14** · Projects analyzed: OpenClaw, Hermes Agent, ZeroClaw, QwenPaw, IronClaw

---

## 1. Ecosystem Overview

The personal AI assistant / agent open-source ecosystem is consolidating around a shared architecture — a persistent local **gateway/daemon** owning sessions, transcripts (typically SQLite-backed), MCP tool integrations, and multi-provider model routing — but projects differ sharply in execution maturity. The dominant engineering phase across the board is **hardening rather than feature expansion**: update reliability, session durability, multi-tenant isolation, and reasoning/output separation dominate issue traffic. Activity follows a power-law distribution: OpenClaw generates roughly 10× the event volume of its nearest peers (Hermes, ZeroClaw), while IronClaw is effectively dormant. Notably, **all five projects shipped zero releases in this 24h window**, and three of the five have either open release-blockers or overdue milestones — evidence that the ecosystem is collectively paying down stability debt.

---

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | PRs Merged | Release Status | Health Score |
|---|---|---|---|---|---|
| **OpenClaw** | 500 events | 500 events | **266** | No release; 2026.9.3/9.4 blocked by 8+ P0 update/recovery bugs | **6/10** — massive throughput, operationally stressed |
| **Hermes Agent** | 50 (26 open / 24 closed) | 50 (35 open) | 15 | No release; v0.21.2 accumulating for coordinated v0.22.x | **6.5/10** — high fix velocity vs. self-inflicted multiplexing regressions |
| **ZeroClaw** | 37 | 50 (all open) | **0** | No release; v0.8.5 line ~2 weeks past Aug 30 target | **7/10** — disciplined, RFC-driven; review bottleneck forming |
| **QwenPaw** | 5 | 6 | 1 | No release; stabilizing v2.2.0/2.2.1 desktop line | **7/10** — light but healthy flow, strong newcomer on-ramp |
| **IronClaw** | 0 | 5 (all dependabot) | 0 | No release; zero human-authored activity | **4/10** — dormant; automated upkeep only |

*Scoring considers activity volume, fix velocity, open blocker severity, release cadence, and community engagement. ZeroClaw's 0 merges with 50 open PRs is the notable anomaly.*

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Scale and throughput:** 1,000 events and 266 merged PRs in 24h — an order of magnitude above Hermes/ZeroClaw and ~90× QwenPaw. Its deepest threads (40, 31, 28 comments) indicate the largest engaged user base.
- **Broadest integration surface:** native Telegram, Slack, Discord, iMessage, MSTeams, WeChat, plus Codex/claude-cli backends, browser tooling, and subagent orchestration (`sessions_spawn`, `agents_wait`). No peer matches the channel matrix.
- **Automated triage at scale:** the `clawsweeper` bot carries routing load that would overwhelm human maintainers at this volume — infrastructure peers lack.

**Technical approach differences:**
- OpenClaw is a **messaging-channel-first, managed-update Node.js gateway** (npm global install, Doctor verification, handoff leases, rollback paths). Hermes shares the gateway model but is pivoting to **one gateway multiplexing every profile**; ZeroClaw is a **Rust, RPC-centric runtime with formal RFC/ADR governance**; IronClaw is a **WASM-sandboxed (wasmtime/tokio) Rust execution runtime**; QwenPaw is a **consumer Windows desktop product** with a provider capability registry.
- OpenClaw's transcript architecture (SQLite cursored reads, typed projections, durable lineage — #79903–#79905) is the most ambitious session model in the set, but it is also the source of its worst instability (WAL growth to GB scale, #143524; event-loop blocking, #119720).

**Risks relative to peers:** the 9.2 → 9.3/9.4 update crisis (≥7 P0s: #146394, #145192, #147160) is a category no peer is experiencing at this severity. Channel leakage (#25592, 6 months open) and silent subagent failure (#44925) erode the trust its scale should command. ZeroClaw's governance rigor and QwenPaw's contributor frictionlessness are strengths OpenClaw's velocity-centric model doesn't yet replicate.

---

## 4. Shared Technical Focus Areas

| Focus Area | Projects | Specific Signals |
|---|---|---|
| **Session/transcript persistence & SQLite WAL durability** | OpenClaw, Hermes, QwenPaw, ZeroClaw | WAL growth blocking startup (OC #143524); cross-process WAL unlinking (HA #109727, #110106, #109946); session loss on desktop shutdown (QP #7724, #7708); failed turns erased from durable history (ZC #10788); ACP transcript pagination (ZC #10596) |
| **Reasoning-vs-user-visible output separation** | OpenClaw, QwenPaw | Internal text leaking to Slack/iMessage (OC #25592, #137927); task results swallowed into `thinking` blocks (QP #7709) |
| **Context window management** | OpenClaw, ZeroClaw, QwenPaw | Overflow precheck over-counting 2.3–2.6× (OC #101929); compaction anchored to model window ratio (ZC #9535); agent-autonomous context handover proposal (QP #7733) |
| **MCP integration reliability** | OpenClaw, Hermes, QwenPaw | MCP tools missing in subagents (OC #85030); MCP server init crash (OC #144911); misleading `mcp test` diagnostics (HA); HTTP error double-decompression (QP #7735) |
| **Update/upgrade lifecycle safety** | OpenClaw, Hermes, ZeroClaw | 7+ P0 update failures (OC); `hermes update` phantom-runtime exit (HA #109680); packaging/cargo-install follow-ups (ZC #9381) |
| **Subagent orchestration & observability** | OpenClaw, ZeroClaw, QwenPaw | Silent completion loss, no retry (OC #44925); delegate sub-loops bypassing cost budgets (ZC #10645); multi-agent first-turn misclassification (QP #3113) |
| **Multi-provider routing & relay compliance** | All active | Cross-backend context preservation (OC #79047); OpenCode missing session headers risking account flags (ZC #10603); DeepSeek V4 Flash registration (QP #7736); managed Nous gateway (HA) |
| **Windows as second-class platform** | OpenClaw, ZeroClaw, QwenPaw | Stale-process gateway kill (OC #140162); RPC stack overflow 0xc00000fd + symlink checkout failures (ZC #10734, #9381); QwenPaw's data-loss reports are Windows-desktop-specific |

---

## 5. Differentiation Analysis

- **OpenClaw** — *Always-on personal assistant across chat platforms.* Node.js managed-update gateway; deepest channel and subagent feature set; targets self-hosting power users who live in Slack/Telegram/iMessage. Differentiator: breadth; liability: update-path fragility.
- **Hermes Agent** — *Multi-profile gateway consolidation.* Its bet is `gateway.multiplex_profiles` + "one gateway owns every session" (#106742): many personas/accounts on one machine with strict isolation. Targets multi-profile users and Desktop/TUI/CLI parity; the entire bug load is the isolation tax of that bet.
- **ZeroClaw** — *Governed, security-auditable agent runtime.* Rust, RPC-first, OIDC-authenticated principals (#10259), shell permission policy (#10610), per-profile cost ledgers. Targets operators who need audit trails, budget enforcement, and formal RFC process — the only project with visible governance machinery.
- **QwenPaw** — *Consumer desktop product.* Windows-first, i18n (pt-BR), provider capability registry, skills; issues filed in Chinese indicate a distinct (likely Chinese-speaking) user base. Targets non-technical end users, not self-hosters.
- **IronClaw** — *Sandboxed execution substrate.* WASM (wasmtime) + tokio suggests isolation-first agent execution — architecturally unique, but with zero human signal it reads as a research/corporate (NEAR AI) project with no current community pull.

---

## 6. Community Momentum & Maturity

**Tier 1 — Hyper-velocity (rapidly iterating):** **OpenClaw.** Highest merge throughput (266/day), largest commenter base, bot-assisted triage. Iteration speed exceeds stabilization capacity — P0s are aging while features land.

**Tier 2 — Active iteration:** **Hermes Agent** is executing a coordinated multiplexing campaign (#109417) with unusually disciplined PR hygiene (linked issues, salvage attribution) — iterating fast against self-generated regressions, with a v0.22.x release visibly staging. **ZeroClaw** is iterating on process as much as code (RFC voting reform #10549, ADR inventory #8691) but shows a **review bottleneck**: 50 open PRs, zero merges in-window, several needs-author-action items open since July.

**Tier 3 — Steady stabilization:** **QwenPaw** is in patch-mode on v2.2.x; small scoped PRs, first-time contributors landing fixes same-day (healthy on-ramp), but its highest-impact bug (desktop session loss #7724) has no fix in flight.

**Tier 4 — Dormant:** **IronClaw.** Dependabot-only for weeks; wasm PR stale 22 days; no community to speak of.

---

## 7. Trend Signals

1. **Persistence is the ecosystem's systemic weak point.** Three of four active projects show SQLite WAL/session-durability failures (OpenClaw WAL bloat, Hermes cross-process WAL unlinking, QwenPaw session loss). *Developer takeaway: cross-process WAL fencing and crash-safe session persistence are table stakes; treat read-only consumers as first-class hazards.*
2. **Update reliability is a trust determinant, not a feature.** OpenClaw's 9.3/9.4 crisis shows users tolerate feature bugs but not updates that strand them between versions. Atomic, Doctor-verified, reversible updates are becoming a competitive requirement.
3. **Multi-tenancy/profile isolation is the next architectural frontier** — Hermes (profile multiplexing), ZeroClaw (RPC principals), OpenClaw (dynamic identity allowlists #58057). Isolation failures leak credentials and state; this is where security bugs cluster (Hermes Slack-token cross-profile leak #108493).
4. **Reasoning/output channel hygiene is a universal UX requirement.** Leaked narration (OpenClaw) and swallowed results in `thinking` blocks (QwenPaw) generate disproportionate community anger relative to technical severity — silent failure and visible internals both destroy trust.
5. **Context management is shifting from threshold-based to agent-autonomous** (QwenPaw #7733, ZeroClaw #9535) — mirroring industry movement toward long-running agents that manage their own eviction.
6. **Provider-agnostic routing carries compliance risk:** missing relay headers (ZeroClaw #10603) can flag accounts; sub-second 429 backoff (#10779) wastes quota. Provider registry correctness (QwenPaw #7736) is becoming a maintenance surface of its own.
7. **Windows remains an underserved segment** across three projects despite evident demand — a differentiation opportunity for any project that invests in first-class Windows support.
8. **Process maturity is emerging as a moat:** ZeroClaw's RFC/ADR discipline and OpenClaw's bot triage represent two different answers to scaling open agent projects; the RFC-reform debate (#10549) signals that governance throughput is now a recognized bottleneck class.

**Bottom line:** OpenClaw leads on scale and integration breadth but is paying a stability tax; Hermes is executing the most coherent architectural campaign; ZeroClaw is the most governance-mature with a merge-queue risk; QwenPaw serves a consumer niche with excellent contributor health; IronClaw is dormant. For AI agent developers, the highest-leverage investments indicated by this cross-section are durable session state, safe update paths, tenant isolation, and failure observability for delegated subagents.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-14

## 1. Today's Overview

Hermes Agent (`nousresearch/hermes-agent`) is in an intense stabilization phase centered on **profile multiplexing** (`gateway.multiplex_profiles`) — a single gateway serving every profile. The 24-hour window shows high throughput: 50 issues updated (26 open / 24 closed) and 50 PRs updated (35 open / 15 merged/closed), but **zero new releases**. Activity skews heavily toward bug-fixing rather than net-new features. The dominant theme across issues and PRs is "cross-profile contamination": session keys, WAL state, MCP servers, env bridges, prompt-cache scopes, and Slack tokens leaking between profiles. Severity is elevated: multiple P1 bugs around deleted WAL generations and broken Desktop session creation remain open. Overall project health is **active but unstable** — fix velocity is high, but the multiplexing rollout is producing a steady stream of regressions that need coordinated landing.

## 2. Releases

**No new releases in the last 24 hours.** Last observed version in user reports: `v0.21.2` (build tag `v2026.9.11`). The lack of a release tag given the volume of merged fixes (especially around profile isolation) suggests maintainers are accumulating changes for a coordinated `v0.22.x` cut rather than shipping piecemeal.

## 3. Project Progress

The following PRs were closed/merged today and represent net project advancement:

- **[#109502](https://github.com/NousResearch/hermes-agent/pull/109502)** — `hermes profile create --clone` no longer carries source-profile messaging bot credentials by default; `--clone-channels` opts back in. Adds `gateway.multiplex_profiles` config key recognition and an explicit `migrate --multiplex` flag. *Foundational for safe multiplexing adoption.*
- **[#108440](https://github.com/NousResearch/hermes-agent/pull/108440)** — Multiplexed profiles no longer poison each other via `config.yaml`→env bridges, the `TERMINAL_*` ambient latch, Yuanbao auto-home writes, write-guard path memos, and `terminal.env_passthrough` allowlist. Salvages 6 prior PRs.
- **[#108352](https://github.com/NousResearch/hermes-agent/pull/108352)** — Same-named MCP servers now get per-profile connections under multiplexing; `/reload-mcp` no longer strands co-tenants; `gateway start|install|restart`, `hermes status`, and `API_SERVER_KEY` honor the live multiplexer.
- **[#108294](https://github.com/NousResearch/hermes-agent/pull/108294)** — Secondary profiles retain session keys and write to their own `state.db` on every gateway/TUI/Desktop path. Fixes lost wake-ups, dead `/stop`/`/undo`, rejected QQ approval buttons, and default-profile rows landing in wrong `state.db`.
- **[#108501](https://github.com/NousResearch/hermes-agent/pull/108501)** — Prompt-cache scopes now keyed by profile identity (closes [#108494](https://github.com/NousResearch/hermes-agent/issues/108494)).
- **[#108500](https://github.com/NousResearch/hermes-agent/pull/108500)** — Slack token fallback can no longer cross profiles (closes [#108493](https://github.com/NousResearch/hermes-agent/issues/108493)).
- **[#110388](https://github.com/NousResearch/hermes-agent/pull/110388)** — Strips `message_id` / `platform_message_id` from provider-bound chat-completion payloads (preserved in durable history for platform dedup). Fixes cross-session contamination on shared API/Telegram sessions.
- **[#106742](https://github.com/NousResearch/hermes-agent/pull/106742)** — (Open, but the keystone change) "One gateway owns every local session": CLI, TUI, Desktop, API, ACP, bots, and cron all attach to one gateway-owned session instead of each spawning agents on the same `state.db`.

The closure pattern (7 of 8 merged PRs touch profile isolation/security boundaries) shows the multiplex campaign ([#109417](https://github.com/NousResearch/hermes-agent/issues/109417)) is mid-execution.

## 4. Community Hot Topics

The most-discussed threads in the last 24 hours cluster around three community needs:

**A. Desktop session creation is broken on multi-profile installs** — [#102792](https://github.com/NousResearch/hermes-agent/issues/102792) (11 comments, P1) and its duplicate [#108369](https://github.com/NousResearch/hermes-agent/issues/108369) (5 comments, P2). Clicking "+" on the project sidebar or tab-strip on a non-default profile mints a session with null owner metadata → immediate "Couldn't open this session" or "Session controls unavailable." Multiple users reproducing across macOS/Windows. Underlying need: **profile-aware session ownership must propagate to the tab-strip spawn path**, not just the main chat.

**B. State.db WAL generation is being trampled by secondary processes** — [#109727](https://github.com/NousResearch/hermes-agent/issues/109727) (6 comments, P1, Linux), [#110106](https://github.com/NousResearch/hermes-agent/issues/110106) (4 comments, P1), [#109946](https://github.com/NousResearch/hermes-agent/issues/109946) (1 comment, P1). Any second Hermes process that opens `state.db` (even read-only `hermes sessions list`) unlinks the live `state.db-wal`/`-shm`, stranding the gateway with `DeletedWalGenerationError`. Multiple concurrent `tui_gateway` processes on one profile thrash WAL retirement. Dashboard/Desktop all-profile sidebar polling can trigger the same. Underlying need: **read-only consumers must not race the gateway's WAL**; WAL handling needs cross-process fencing.

**C. WebUI/Dashboard profile switching is unreliable** — [#109480](https://github.com/NousResearch/hermes-agent/issues/109480) (4 comments, P2, needs-repro). After profile changes, restart fails or shows the new profile's gateway under "default"; chat continues routing to old gateway. Underlying need: **profile-switch must atomically repoint client + restart gateway + verify**.

Honorable mentions (3 comments each): [#108310](https://github.com/NousResearch/hermes-agent/issues/108310) browser_exec/Nous gateway routing split failure; [#108302](https://github.com/NousResearch/hermes-agent/issues/108302) (closed) managed Nous provider on bot profiles; [#107829](https://github.com/NousResearch/hermes-agent/issues/107829) (closed) `tui_gateway` crash on deleted profile; [#109680](https://github.com/NousResearch/hermes-agent/issues/109680) (closed) `hermes update` exit 1 from phantom gateway runtime; [#109546](https://github.com/NousResearch/hermes-agent/issues/109546) Bitwarden toggle; [#109891](https://github.com/NousResearch/hermes-agent/issues/109891) design proposal to make the local gateway a first-class Desktop backend.

## 5. Bugs & Stability

### P1 (critical, open unless noted)
| Issue | Status | Title | Fix PR |
|---|---|---|---|
| [#102792](https://github.com/NousResearch/hermes-agent/issues/102792) | **Closed** | Desktop "+" new session loses all owner metadata → "Couldn't open this session" | Linked fix not in current open set; verify close reason |
| [#109727](https://github.com/NousResearch/hermes-agent/issues/109727) | Open | Second Hermes process unlinks live `state.db-wal`/`-shm` (Linux, `DeletedWalGenerationError`) | None yet |
| [#110106](https://github.com/NousResearch/hermes-agent/issues/110106) | Open | Multiple concurrent `tui_gateway` thrash state.db WAL; sessions die mid-turn | None yet |
| [#109946](https://github.com/NousResearch/hermes-agent/issues/109946) | Open | Desktop/dashboard all-profile sidebar triggers deleted WAL in live profile gateways | None yet |
| [#108862](https://github.com/NousResearch/hermes-agent/issues/108862) | **Closed** | Cron delivery >30s starves fire-claim heartbeat → runs booked as failed | Closed (dup); fix candidate in [#108456](https://github.com/NousResearch/hermes-agent/pull/108456) cron hardening |

### P2 (high, notable)
- [#108369](https://github.com/NousResearch/hermes-agent/issues/108369) — Desktop tab-strip "+" unlisted session (closed, duplicate)
- [#109480](https://github.com/NousResearch/hermes-agent/issues/109480) — Profiles broken via WebUI
- [#108310](https://github.com/NousResearch/hermes-agent/issues/108310) — `browser_exec` with Nous managed gateway routing fails two ways
- [#108302](https://github.com/NousResearch/hermes-agent/issues/108302) — (closed) Managed Tool Gateway unavailable on bot profiles
- [#107829](https://github.com/NousResearch/hermes-agent/issues/107829) — (closed) `tui_gateway` crash on deleted profile
- [#109680](https://github.com/NousResearch/hermes-agent/issues/109680) — (closed) `hermes update` exit 1 from phantom gateway runtime
- [#109024](https://github.com/NousResearch/hermes-agent/issues/109024) — Multiplexed Docker `MEDIA:` resolves against ambient default → fix in [#109102](https://github.com/NousResearch/hermes-agent/pull/109102)
- [#108088](https://github.com/NousResearch/hermes-agent/issues/108088) — Desktop Bot Mode relay keeps unwanted local backend alive (WebSocket churn, focus loss); fix in [#108111](https://github.com/NousResearch/hermes-agent/pull/108111)
- [#110120](https://github.com/NousResearch/hermes-agent/issues/110120) — CLI agent not executing actions; UI/context tracking broken (needs-repro, likely local-model regression)
- [#110032](https://github.com/NousResearch/hermes-agent/issues/110032) — (closed) browser/computer_use caches keyed by session id alone → cross-profile leak

### P3 (medium)
- [#108383](https://github.com/NousResearch/hermes-agent/issues/108383) — (closed) Dashboard `/chat` sessions stuck "Setup Required" while CLI works
- [#108549](https://github.com/NousResearch/hermes-agent/issues/108549) — (closed) Kanban notifier runs 5s tick with no config gate
- [#108346](https://github.com/NousResearch/hermes-agent/issues/108346) — (closed) `profile` param accepts traversal-shaped names → path traversal risk
- [#109949](https://github.com/NousResearch/hermes-agent/issues/109949) — Bot Screen one-install lock is process-local
- [#108863](https://github.com/NousResearch/hermes-agent/issues/108863) — Desktop pool idle reaper SIGTERMs cron runs mid-flight
- [#109480](https://github.com/NousResearch/hermes-agent/issues/109480) — Profiles broken in Web UI (see P2)
- [#110336](https://github.com/NousResearch/hermes-agent/issues/110336) — Mermaid viewer opens huge diagrams off-canvas
- [#110374](https://github.com/NousResearch/hermes-agent/issues/110374) — Slack status indicator silently broken on `slack-sdk` ≥ 3.44 → fix in [#110391](https://github.com/NousResearch/hermes-agent/pull/110391) / [#110389](https://github.com/NousResearch/hermes-agent/pull/110389)

**Pattern:** The bulk of P1/P2 regressions trace to the multiplexing rollout — WAL state, session-key ownership, and profile-scoped resources. Cron delivery, MCP, and Desktop pool lifecycles are the next most fragile surfaces.

## 6. Feature Requests & Roadmap Signals

- **[#109891](https://github.com/NousResearch/hermes-agent/issues/109891)** — *Design proposal*: make the live local gateway a first-class Desktop backend per profile while retaining `hermes serve` as a compat path. Decision requested. Aligns directionally with [#106742](https://github.com/NousResearch/hermes-agent/pull/106742); expect this to land as part of the same release.
- **[#109417](https://github.com/NousResearch/hermes-agent/issues/109417)** — Tracking issue for "profile multiplexing as the only gateway mode" (Sep 10–12 campaign). End-state goal: a user on a multiplexed install cannot tell the difference from per-profile standalone gateways. Most likely the marquee feature of the next release.
- **[#106742](https://github.com/NousResearch/hermes-agent/pull/106742)** — One gateway owns every local session (CLI/TUI/Desktop/API/ACP/bots/cron). P1, broad sweep. If merged, it is *the* headline change.

**Predicting `v0.22.x` (next likely release):**
1. `gateway.multiplex_profiles` becoming the default, with `migrate --multiplex` opt-in flag.
2. "One gateway owns every local session" ([#106742](https://github.com/NousResearch/hermes-agent/pull/106742)).
3. WAL/cross-process state.db fencing (probably a new PR, given three open P1s without fixes).
4. Desktop local-backend integration ([#109891](https://github.com/NousResearch/hermes-agent/issues/109891) / [#108111](https://github.com/NousResearch/hermes-agent/pull/108111)).
5. Apple Container terminal backend ([#110390](https://github.com/NousResearch/hermes-agent/pull/110390), open) — likely deferred unless a backer ships it.
6. Slack SDK 3.44+ status compatibility ([#110389](https://github.com/NousResearch/hermes-agent/pull/110389) / [#110391](https://github.com/NousResearch/hermes-agent/pull/110391)).

## 7. User Feedback Summary

**Dominant pain points:**
- **Multi-profile is the single biggest source of user frustration.** Profile isolation failures (session keys, MCP, env vars, prompt-cache, Slack tokens) are consistently reported by users with multiple profiles — exactly the population that adopted multiplexing first.
- **Desktop UX on multi-profile installs is the loudest complaint.** Six of the top 12 issues by comment count involve Desktop session/tab/profile handling ([#102792](https://github.com/NousResearch/hermes-agent/issues/102792), [#108369](https://github.com/NousResearch/hermes-agent/issues/108369), [#109480](https://github.com/NousResearch/hermes-agent/issues/109480), [#109946](https://github.com/NousResearch/hermes-agent/issues/109946), [#109546](https://github.com/NousResearch/hermes-agent/issues/109546), [#108088](https://github.com/NousResearch/hermes-agent/issues/108088), [#108383](https://github.com/NousResearch/hermes-agent/issues/108383), [#110336](https://github.com/NousResearch/hermes-agent/issues/110336), [#109949](https://github.com/NousResearch/hermes-agent/issues/109949)). Users feel Desktop regressed substantially vs. the CLI.
- **CLI users on local models ([#110120](https://github.com/NousResearch/hermes-agent/issues/110120)) report a regression** where the agent no longer executes actions and behaves like a plain chat interface. This is undifferentiated feedback from Qwen3.5:9B / GPT-OSS:20B users — high churn risk if not addressed.
- **MCP stdio debugging friction ([#50395](https://github.com/Users/NousResearch/hermes-agent/issues/50395) / [#50418](https://github.com/NousResearch/hermes-agent/pull/50418) / [#110393](https://github.com/NousResearch/hermes-agent/pull/110393))** — `hermes mcp test` reporting ✓ healthy while the gateway spawn fails is repeatedly called out as a misleading diagnostic.
- **Positive signal:** contributors like `teknium1`, `JoaoMarcos44`, `DavidMetcalfe`, `isair`, and `KoNit-K` are landing tightly-scoped PRs with linked issue references and salvage-line attribution — the multiplex campaign is being executed with unusually good

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-14

## 1. Today's Overview

IronClaw (github.com/nearai/ironclaw) had an extremely quiet day with zero new issues, zero new releases, and all observed activity limited to automated dependency maintenance. The only human-authored signal in the data is absent — every PR that updated in the last 24 hours was opened by `dependabot[bot]`. Project velocity today is best characterized as **routine upkeep only**, with no feature development, bug reports, or community discussion visible in the public timeline. Health-wise this is not a red flag (no stale issues piling up, dependencies are actively tracked), but it is a signal that maintainer bandwidth and contributor activity are currently dormant.

## 2. Releases

No new releases in the last 24 hours. The Releases section is omitted per digest convention.

## 3. Project Progress

Only one PR changed status in the last 24 hours — and it was a **closure**, not a merge of new functionality:

- **[PR #8097](https://github.com/nearai/ironclaw/pull/8097) — CLOSED** (dependabot, "everything-else group, 24 updates")
  - This 24-package dependency bump was closed without merging. Given that **[PR #8099](https://github.com/nearai/ironclaw/pull/8099)** was opened on 2026-09-13 with a superset (25 updates, including a newer `uuid 1.26.1` versus the `1.26.0` in #8097), the closure is almost certainly a supersede by the newer batched update rather than a rejection. No user-facing features advanced today.

## 4. Community Hot Topics

**No community engagement to report.** All five active PRs have `Comments: undefined` and `👍: 0`. There are no open issues in the last 24 hours, and no reaction data is present on any item. This indicates:

- No active discussion threads are pulling contributor attention.
- The project's community-facing channels (issue triage, design discussion) are effectively idle today.
- All five PRs are `dependabot[bot]`-authored, so there is no human-authored conversation to summarize.

For the most recently updated items, ranked by recency:

1. [PR #8099](https://github.com/nearai/ironclaw/pull/8099) — 25-pkg Rust dependency bump (open, 2026-09-13)
2. [PR #8079](https://github.com/nearai/ironclaw/pull/8079) — 6-action GitHub Actions bump (open, 2026-09-13 update)
3. [PR #8078](https://github.com/nearai/ironclaw/pull/8078) — tokio-ecosystem bump (open, 2026-09-13 update)
4. [PR #7834](https://github.com/nearai/ironclaw/pull/7834) — wasmtime/wasm-tools group bump (open, 2026-09-13 update, **22 days old**)
5. [PR #8097](https://github.com/nearai/ironclaw/pull/8097) — closed duplicate batch (closed, 2026-09-13)

## 5. Bugs & Stability

**No bugs, crashes, or regressions were reported today.** No new issues were filed in the last 24 hours, and none of the open PRs address a reported defect — they are exclusively dependency bumps. Stability signal is therefore neutral; we cannot infer from this data whether the codebase is currently bug-free or whether users have simply not filed reports.

## 6. Feature Requests & Roadmap Signals

**No new feature requests surfaced today.** With zero issues opened and zero non-dependabot PRs updated, there is no signal in the last 24h to predict the content of the next release. Historical activity (the wasm-tokio-Rust stack indicated by the dependency groups) continues to suggest IronClaw remains a **Rust-based AI agent/assistant runtime with WASM sandboxing and tokio async I/O**, but no forward-looking roadmap evidence is present in today's data.

## 7. User Feedback Summary

**No user feedback captured today.** There are no issue threads, no PR comments, and no reactions to analyze. Pain points, use cases, and satisfaction levels cannot be inferred from the current data window. Recommend broadening the lookback window in future digests to surface trend-level feedback signals.

## 8. Backlog Watch

The following items deserve maintainer attention because they have been sitting open without engagement:

- **[PR #7834](https://github.com/nearai/ironclaw/pull/7834)** — `wasm` group dependency bump (wasmtime, wasmtime-wasi, wit-component, wit-parser). **Opened 2026-08-23, still open as of 2026-09-13 — ~3 weeks stale.** Labeled `size: L, risk: medium`. WASM runtime components are likely foundational to IronClaw's execution model, so a stalled large-bump dependency PR here is worth a maintainer review for either merge or close.
- **[PR #8078](https://github.com/nearai/ironclaw/pull/8078)** — tokio-ecosystem bump (`tower-http`, `tokio-tungstenite`). Open since 2026-09-06, low-risk networking stack.
- **[PR #8079](https://github.com/nearai/ironclaw/pull/8079)** — GitHub Actions group bump. Open since 2026-09-06. Notable: bumps `actions/setup-node` from `4.0.2` → `7.0.2`, a **major-version jump** that warrants CI verification before merge.

**Overall backlog health:** Mild concern. The wasm PR has lingered for 22 days, and the dependabot queue appears to be stacking faster than it is being drained (the closure of #8097 in favor of #8099 is a healthy deduplication, but it also shows that prior batches were not being merged in time).

---

*Digest generated from 24h GitHub activity window. All activity observed today is automated dependency maintenance; no human-authored issues, PRs, or comments were recorded.*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-14

## 1. Today's Overview

QwenPaw shows light development activity today with 5 issues and 6 pull requests updated, but no new releases published. The PR pipeline leans toward small, well-scoped fixes (i18n, ACP permission matching, MCP HTTP error handling, provider capabilities) with a healthy share of first-time contributors. Open issue traffic is dominated by user-reported stability problems—session loss, vanishing scheduled-task output, and persistent agent "forgetting"—suggesting the project is in a stabilization phase for the recently shipped v2.2.x line rather than a feature-expansion cycle.

## 2. Releases

No new releases in the last 24 hours. The most recent published versions referenced in user reports remain **v2.2.0 / v2.2.1** (Windows desktop builds).

## 3. Project Progress

- **PR #4009 — feat(i18n): add Brazilian Portuguese (pt-BR) locale support** ([link](https://github.com/agentscope-ai/QwenPaw/pull/4009)) — **Closed**. Merged into main. Immediately followed by a defect-repair PR (#7734) showing the original dictionary-based translation pass left broken strings in ~415 keys.
- **PR #7734 — fix(i18n): complete pt-BR translation and repair broken strings from #4009** ([link](https://github.com/agentscope-ai/QwenPaw/pull/7734)) — Open follow-up that brings pt-BR to 100% key parity with `en.json`; closes the loop on the localization feature.
- **PR #7732 — fix(acp): select permission options by protocol kind** ([link](https://github.com/agentscope-ai/QwenPaw/pull/7732)) — Open. Improves ACP allow-choice matching by keying on the protocol-stable `kind` instead of agent-specific IDs, reducing false interactive prompts.
- **PR #7735 — fix(mcp): preserve decoded HTTP error responses** ([link](https://github.com/agentscope-ai/QwenPaw/pull/7735)) — Open. Strips stale body-framing headers so HTTPX does not double-decompress MCP error payloads.
- **PR #7736 — feat(providers): add DeepSeek V4 Flash capabilities** ([link](https://github.com/agentscope-ai/QwenPaw/pull/7736)) — Open. Registers image input, 1M-token context, and reasoning-effort metadata for the new model.
- **PR #7737 — fix(skills): expand multi-agent collaboration trigger keywords** ([link](https://github.com/agentscope-ai/QwenPaw/pull/7737)) — Open. Reduces a documented first-turn misclassification (related #3113).

## 4. Community Hot Topics

- **Issue #7571 — "总是记不住，还是会遗忘。"** ([link](https://github.com/agentscope-ai/QwenPaw/issues/7571)) — *4 comments, most active issue today*. Plugin-development user reports that the agent repeatedly forgets two core instructions across sessions: (a) writing `TODO` files only to a specific subfolder, and (b) editing the source directory rather than the deployed plugin path. The author is effectively blocked. **Underlying need:** persistent, scoped project conventions the agent respects without re-prompting—hints at a gap between short-term session memory and durable project-level rules.
- **Issue #7724 — "会话丢失"** ([link](https://github.com/agentscope-ai/QwenPaw/issues/7724)) — *3 comments*. A v2.2.1 desktop user lost an evening's conversation, including the configured LLM endpoint, after a plugin redeploy + manual shutdown. **Underlying need:** crash-safe session persistence and clearer recovery semantics for desktop clients.
- **Issue #7709 — Scheduled task output often missing or hidden in thinking** ([link](https://github.com/agentscope-ai/QwenPaw/issues/7709)) — *2 comments*. **Underlying need:** reliable rendering of scheduled-task results separate from internal reasoning blocks.

## 5. Bugs & Stability

Ranked by user impact and reproducibility:

| Severity | Issue | Summary | Fix PR? |
|---|---|---|---|
| **High** | [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) | Conversation history lost after redeploy + shutdown on Windows desktop v2.2.1; LLM config also dropped. Repeat of #7708 pattern. | No |
| **Medium-High** | [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) | Scheduled-task output silently swallowed or folded into `thinking` blocks, also affects normal chat intermittently. | No |
| **Medium** | [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) | Agent does not retain developer-set file/folder conventions across sessions, leading to data overwrites in user's deployment pipeline. | No |
| **Low (already mitigated)** | MCP HTTP error response double-decompression (PR [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735)) | Decoded/freshly-encoded error bodies trigger HTTPX to decompress again. | **Yes — PR #7735 open** |
| **Low (already mitigated)** | ACP `approve_once` not recognized (PR [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732)) | Permission options matched by agent-specific IDs rather than stable protocol `kind`. | **Yes — PR #7732 open** |

## 6. Feature Requests & Roadmap Signals

- **#7733 — Agent-autonomous context management — a smooth handover across context eviction** ([link](https://github.com/agentscope-ai/QwenPaw/issues/7733)) — New enhancement proposing that the agent (rather than a token threshold) drive context compaction, with pre-eviction warnings and a richer handover payload. *Prediction: this is the kind of capability that could anchor a v2.3 "long-running agent" release; expect maintainers to label it `enhancement`/`discussion` and request a design doc.*
- **#3429 — Pre-install himalaya and other CLI tools in Docker image** ([link](https://github.com/agentscope-ai/QwenPaw/issues/3429)) — Closed today without merge; signals recurring user friction with container rebuilds and is likely to reappear as a PR.
- **#3113 (referenced by PR #7737)** — Multi-agent collaboration not triggered on first turn; PR #7737 is the first direct fix attempt and is a leading indicator this lands in v2.2.x patch.
- **DeepSeek V4 Flash support (PR #7736)** — Once merged, QwenPaw gains image-in + 1M-context reasoning, broadening enterprise use cases.

## 7. User Feedback Summary

**Pain points (concentrated on the Windows desktop v2.2.x line):**
- **Data integrity risk:** Plugin-development users report the agent editing the *runtime* path while the user assumed it was editing the *source* path, leading to silent overwrites (#7571). Users are explicitly asking for stronger path-discipline guarantees.
- **Trust erosion from session loss:** Multiple reports (#7724, prior #7708) of conversations and even configured LLM providers vanishing after routine operations like redeploy or shutdown. This is the highest-impact complaint in the last 24 hours and threatens desktop-product credibility.
- **Inconsistent output rendering:** Scheduled tasks and chat messages intermittently hide results inside `thinking` blocks, forcing users to scroll internals to verify completion (#7709).
- **Memory ≠ instructions:** Users conflate "session memory" with "remembering developer-set rules." The current architecture appears to satisfy neither, driving frustration in agentic / plugin workflows.

**Satisfaction signal:** First-time contributors (lorenzozanee, Jailtonfonseca) successfully opened and progressed PRs (#7735, #7736, #7737, #7734) on the same day, indicating low friction for new contributors and a healthy on-ramp.

## 8. Backlog Watch

- **#7733 — Agent-autonomous context management** ([link](https://github.com/agentscope-ai/QwenPaw/issues/7733)) — New, strategically important enhancement with only 1 comment. Needs a maintainer to triage, label, and ideally spawn a design-RFC issue; risk of being lost without early signal.
- **#7571 — Persistent project-convention memory** ([link](https://github.com/agentscope-ai/QwenPaw/issues/7571)) — Most-commented open issue today (4), has no owner reply recorded. Repeated "reinforced but forgotten" reports indicate it will keep recurring; recommend a maintainer response acknowledging it as a known gap.
- **#7724 — Session loss on desktop** ([link](https://github.com/agentscope-ai/QwenPaw/issues/7724)) — Repeat-class bug with prior #7708 reference; if not addressed in the next patch release it will continue to drive negative desktop sentiment.
- **#3429 — Pre-install common CLI tools in Docker** ([link](https://github.com/agentscope-ai/QwenPaw/issues/3429)) — Closed without resolution today; should be watched for reopening or a competing PR.

---

*Generated from 11 GitHub events on 2026-09-14 across issues #7571, #7724, #7709, #7733, #3429 and PRs #7737, #7736, #7735, #7734, #4009, #7732.*

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-14

## 1. Today's Overview

ZeroClaw is in a sustained high-velocity development cycle with no new releases issued in the last 24 hours despite substantial issue and PR churn (37 issues and 50 PRs touched). The project shows no merged PRs today — all 50 active PRs remain open, suggesting either a review bottleneck or coordinated staging around the ongoing v0.8.5 stabilization line. Bug-fix work is heavily concentrated on security, configuration validation, and provider reliability, while large architectural RFCs (RPC voting, PR review evidence, edge mesh) continue to draw maintainer attention. Community engagement is healthy with multiple tracker issues, several medium-engagement threads (5–15 comments), and no signs of abandonment.

## 2. Releases

No new releases in the last 24 hours. The most recent tracked milestone is the v0.8.5 finite weekly stabilization line ([Issue #9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)), whose ship target was August 30, 2026; intake froze on August 4.

## 3. Project Progress

No PRs were merged or closed in the last 24 hours — all 50 active PRs remain open. The following substantive advances are visible from recently closed **issues** (which represent resolved problems even if not yet shipped):

- **#10721** (CLOSED) — knowledge.db_path tilde expansion bug, fixed via home-prefix expansion in `all_tools_with_runtime`.
- **#10324** (CLOSED) — cron manual trigger / run-history TOCTOU across agent rename; security follow-up completed.
- **#10580** (CLOSED) — Docs link gate extended to scan the whole repo, not only changed lines.
- **#10533** (CLOSED) — `model_routing_config` now accepts `custom.*` and other valid provider slots, aligning tool validation with config schema.
- **#10837** (CLOSED) — RPC `config/set` validation gap addressed (gateway PATCH and CLI were already validated).

Several large **stacked** PRs are progressing toward merge readiness: [PR #8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965) (skills auto-activation) was restacked on master after #9563 merged; [PR #10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259) (authenticated principals on RPC, RFC #8289 stage 3) and its dependency [PR #10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255) (oidc token verification, stage 5) remain in the security hardening pipeline.

## 4. Community Hot Topics

Ranked by comment activity over the snapshot window:

1. **[Issue #8692 — Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** (15 comments, tracker) — The central maintainer-coordination thread. Itself a tracker, this issue is being used to triage RFCs and architectural decisions; the high comment count reflects its role as a meta-process artifact rather than a single feature debate.
2. **[Issue #10549 — RFC: Simplify RFC voting (remove mandatory windows; REVIZE stops snapshot)](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)** (10 comments, RFC) — Signals process friction: the community feels that fixed 48h/72h discussion windows often produce no extra review, and that REVISE should be a clean stop signal. This is a governance-quality-of-life topic with implications for project throughput.
3. **[Issue #10366 — RFC: PR review evidence, freshness warnings, author-action boundaries](https://github.com/zeroclaw-labs/zeroclaw/issues/10366)** (7 comments, RFC, in-progress, high risk) — Proposes an expedited merge lane for clean advisory reviews and clearer freshness/author-action semantics. Revision 2 already incorporates an expedited merge pathway.
4. **[Issue #10734 — RpcDispatcher::process_line near 2 MB stack guard (Windows)](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)** (7 comments, bug, p1, in-progress) — A genuine Windows native stack overflow surfacing in CI; reveals a real cross-platform memory hazard for the RPC dispatch hot path.

**Underlying need:** contributors are pushing for *less process friction* (faster RFCs, faster clean-PR merges) while simultaneously wanting *tighter review rigor* (clearer evidence, fresh approval). This is a classic tension in maturing open-core projects.

## 5. Bugs & Stability

Reported in the last 24 hours, ranked by severity:

### S1 / p0 / p1 (workflow-blocking or security-relevant)
- **[Issue #10066 — SOP engine promotes later steps before recording schema rejection](https://github.com/zeroclaw-labs/zeroclaw/issues/10066)** (p0, daemon/runtime, high risk). When a step's `output` schema rejects, subsequent steps still run and the rejection is recorded afterward. No fix PR linked. **Status: needs maintainer attention.**
- **[Issue #10603 — OpenCode providers never send `x-opencode-session`](https://github.com/zeroclaw-labs/zeroclaw/issues/10603)** (p1, security, in-progress, 👍 3). Affects Go models on the OpenCode relay and risks account flags. No fix PR linked yet.
- **[Issue #10635 — Runtime profile cost limit does not reflect effective global daily budget](https://github.com/zeroclaw-labs/zeroclaw/issues/10635)** (p1, security). A profile can report `max_cost_per_day_cents = 4294967295` while the global ledger still enforces `$10/day`. Confusing telemetry / potential cost-leak. No fix PR linked.
- **[Issue #10645 — Cost-tracking context missing in delegated sub-loops](https://github.com/zeroclaw-labs/zeroclaw/issues/10645)** (p1, follow-up to #10601). `check_tool_loop_budget` returns `None` for delegate children, so child loops can exceed scoped budgets.
- **[Issue #10788 — Failed Code/ACP turn discards prompt + completed tool exchanges from durable history](https://github.com/zeroclaw-labs/zeroclaw/issues/10788)** (p1, in-progress, ACP). On provider failure (not cancel), the entire turn vanishes from durable history. No fix PR linked.
- **[Issue #10785 — Notification lag cancels every running turn in zerocode](https://github.com/zeroclaw-labs/zeroclaw/issues/10785)** (p1, in-progress, ACP). A real production trace: 3 ACP + 1 fable session all cancelled within 1ms via `begin_notification_resync → session/cancel`. **Reproducible operational incident.**
- **[Issue #10734 — RpcDispatcher stack overflow](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)** (p1, in-progress). Genuine Windows 0xc00000fd in CI. See above.
- **[Issue #10828 — openai-codex --device-code 404](https://github.com/zeroclaw-labs/zeroclaw/issues/10828)** (p1, security). CLI uses obsolete device-auth endpoint.

### S2 / p2 (degraded)
- **[Issue #10793 — Three Windows-only test failures on advisory job, no code-under-test change](https://github.com/zeroclaw-labs/zeroclaw/issues/10793)** — flaky CI, not yet root-caused.
- **[Issue #10736 / #10787 — Reliable provider stream-recovery bugs](https://github.com/zeroclaw-labs/zeroclaw/issues/10736)** — single-candidate providers skip non-streaming fallback and ignore `provider_retries` on 529 overload. Both in-progress.
- **[Issue #10779 — OpenCode 429 quota exhausted retries with sub-second backoff](https://github.com/zeroclaw-labs/zeroclaw/issues/10779)** — should fail fast.
- **[Issue #10802 — `session/list-acp` vs `turn_end` `message_count` divergence](https://github.com/zeroclaw-labs/zeroclaw/issues/10802)** — two RPCs count different things.
- **[Issue #10821 — `zeroclaw service logs` shows stale stderr](https://github.com/zeroclaw-labs/zeroclaw/issues/10821)** — service-installed daemon emits no tracing without `--verbose`.

### S3 / p3
- **[Issue #10812 — WhatsApp PDFs lack jpegThumbnail](https://github.com/zeroclaw-labs/zeroclaw/issues/10812)** — preview regression on mobile clients.

**Fix-PR coverage:** Most p1 issues lack a paired open PR in this snapshot; the cluster around RPC config validation (#10320 → #10837) shows the typical pattern of issue → fix-PR → close, but the provider reliability and ACP-history bugs are still awaiting code.

## 6. Feature Requests & Roadmap Signals

Active in the last 24 hours:

- **[PR #10840 — feat(docs): generate llms.txt and llms-full.txt in mdBook](https://github.com/zeroclaw-labs/zeroclaw/pull/10840)** — improves LLM-discoverability of ZeroClaw docs; very likely to land first.
- **[PR #10407 — feat(sessions): persistent session prompt attachments](https://github.com/zeroclaw-labs/zeroclaw/pull/10407)** — opt-in, SQLite-backed; tagged needs-author-action, so still gated.
- **[PR #10596 — feat(runtime): paginate persisted ACP transcripts](https://github.com/zeroclaw-labs/zeroclaw/pull/10596)** — bounded cursor pagination; addresses long-context ACP pain.
- **[PR #9809 — feat(providers): multiple models per provider profile](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)** — `[providers.models.<family>.<alias>.models.<model_alias>]` subtable; longstanding contributor request.
- **[PR #9535 — feat(runtime): anchor context compaction to model window ratio](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)** — replaces the hardcoded 32k trim budget; contextual compaction is broadly useful.
- **[PR #10525 — feat(zerorelay): relay-terminated browser enrollment frontdoor (phase 1)](https://github.com/zeroclaw-labs/zeroclaw/pull/10525)** — opt-in pairing surface for browser enrollment.
- **[PR #10610 — feat(security): shell V1 permission policy (RFC #7155 Phase 0+1)](https://github.com/zeroclaw-labs/zeroclaw/pull/10610)** — five-commit accepted-RFC slice; very likely candidate for next stabilization cut.
- **[Issue #10822 — `config/set-many` atomic batch config mutation over RPC](https://github.com/zeroclaw-labs/zeroclaw/issues/10822)** — removes the multi-write non-atomicity hazard.
- **[Issue #10360 — RFC: opt-in household edge mesh with pull workers and signed receipts](https://github.com/zeroclaw-labs/zeroclaw/issues/10360)** — ambitious multi-host fan-out; long-horizon.
- **[Issue #10826 — Make ZeroCode session root selection explicit and preserve resumed roots](https://github.com/zeroclaw-labs/zeroclaw/issues/10826)** — follow-up to #10609 / #10565.

**Next-release prediction:** v0.8.6 or the next stabilization cut will likely pick up the llms.txt docs work, the shell V1 permission policy, `config/set-many`, ACP transcript pagination, and the cluster of validated-only RPC config writes. The OpenCode session-header and edge-mesh work appear further out.

## 7. User Feedback Summary

Concrete pain points extracted from the issue text:

- **Configuration safety is inconsistent.** Users can write out-of-range values via `zeroclaw config set` and `RPC config/set` (#[10320](https://github.com/zeroclaw-labs/zeroclaw/issues/10320)) but the gateway PATCH and CLI routes validate properly — a divergence that erodes trust in the config surface.
- **Provider reliability on the OpenCode relay is fragile.** Missing `x-opencode-session` header ([#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603)), 429-quota retries ([#10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779)), and stream-failure recovery gaps ([#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736), [#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787)) suggest users are encountering inconsistent behavior on what they consider a “supported” provider.
- **Windows ergonomics still weak.** Symlinks break checkout on Windows without developer mode ([#9381](https://github.com/zeroclaw-labs/zeroclaw/issues/9381)), stack overflow in RPC dispatch ([#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)), three flaky Windows-only test failures with no changed code ([#10793](https://github.com/zeroclaw-labs/zeroclaw/issues/10793)). Users running ZeroClaw on Windows are clearly second-class.
- **Cost controls are confusing.** Profiles that look “unbounded” actually obey a global daily cap ([#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635)) and delegate sub-loops bypass the policy ([#10645](https://github.com/zeroclaw-labs/zeroclaw/issues/10645)). This is a real operator-surprise hazard.
- **Durable history is not durable enough.** ACP failures can erase an entire turn including accepted prompt and completed tool exchanges ([#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788)).
- **Telegram reactions silently fake success** ([PR #10843](https://github.com/zeroclaw-labs/zeroclaw/pull/10843) — fixes #10842). The tool printed a fabricated confirmation without making an API call. This kind of silent-failure UX is a real trust issue.
- **Process friction acknowledged.** The high comment count on RFC voting simplification (#10549) is the clearest evidence that contributors feel the RFC process itself needs streamlining.

No direct satisfaction metrics (stars, NPS, etc.) are visible in the snapshot, but the comment distribution suggests engaged, technically substantive users — several issue authors produce detailed stack traces and reproducer links.

## 8. Backlog Watch

Long-running or maintainer-dependent items that need attention:

- **[Issue #9459 — v0.8.5 stabilization line tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)** — milestone was scoped through Aug 30, 2026 and is now two weeks past its nominal cutoff. Should be either closed-as-shipped or rolled forward explicitly.
- **[Issue #9381 — crates.io publishing, packaging, cargo-install follow-ups](https://github.com/zeroclaw-labs/zeroclaw/issues/9381)** — Windows symlink follow-up is real user impact and has been open since July 26.
- **[Issue #8691 — ADR inventory and accepted RFC decision records](https://github.com/zeroclaw-labs/zeroclaw/issues/8691)** — low comment count but it tracks durable decision-record follow-through for accepted RFCs; slow progress means accepted decisions may not have corresponding ADRs.
- **[PR #9109 — feat(providers): native Hailo-Ollama support](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)** — tagged `status:blocked, do-not-merge`; open since July 17. Either unblock or close to free up the contributor.
- **[PR #8965 — feat(skills): declarative auto-activation](https://github.com/zeroclaw-labs/zeroclaw/pull/8965)** — large, stacked, `needs-author-action`. Has been in flight since July 11.
- **[PR #9535 — feat(runtime): anchor context compaction to model window ratio](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)** — large, needs-author-action since July 29.
- **[PR #10407 — feat(sessions): persistent session prompt attachments](https://github.com/zeroclaw-labs/zeroclaw/pull/10407)** — XL, needs-author-action since August 27.
- **[PR #10337 — fix(tools): honor allowed roots for git operations](https://github.com/zeroclaw-labs/zeroclaw/pull/10337)** — security-relevant, needs-author-action, high risk.
- **[PR #9819 — fix(multimodal): pixel-level image validation](https://github.com/zeroclaw-labs/zeroclaw/pull/9819)** — high-risk, principal-contributor, needs-author-action, open since Aug 7.
- **[Issue #8692 — Maintainer decision queue](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — high comment count, role as the meta-tracker means slow movement here stalls downstream RFC decisions.

**Health signal:** ZeroClaw shows the profile of a mature, security-conscious, RFC-driven open-core project with active maintainers (notably Audacity88 and JordanTheJet) and a healthy stream of community-contributed PRs. The principal risk vector is the queue of large-XL PRs awaiting author or maintainer action, which if left unaddressed will compound the review bottleneck and delay the v0.8.6 stabilization line.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*