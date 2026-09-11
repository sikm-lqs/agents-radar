# OpenClaw Ecosystem Digest 2026-09-12

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-11 23:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-12

## 1. Today's Overview

OpenClaw shipped **v2026.9.4** with the headline change being safe recovery from compatible failed updates (#140339), but the release itself triggered a fresh wave of upgrade-related blockers. Activity is high: 500 issues and 500 PRs touched in 24h (266/234 and 265/235 split), with the issue tracker dominated by **session-state regressions, update/migrations failures, and Gateway crash-loops**. Maintainers (led by `steipete`) are landing a coordinated batch of fixes targeting the upgrade path (`#145043`, `#145044`, `#145379`, `#145369`, `#133884`) and several auth/model-resolution issues (`#145196`, `#144768`, `#145051`, `#145248`).

## 2. Releases

**v2026.9.4** (openclaw 2026.9.4) — published 2026-09-11. ([Release notes](https://github.com/openclaw/openclaw/releases/tag/v2026.9.4))

- **Recover from compatible failed updates**: on a failed `openclaw update`, retain the previous package and restore it with the previous configuration and service when schema/config checks prove rollback is safe. Database migrations still require a verified pre-update backup. (#140339)

⚠️ **Compatibility note**: the shipped v2026.9.4 does **not** contain [#144208](https://github.com/openclaw/openclaw/issues/144742), which merged on `main` after the release branch was cut. A retained version-1 handoff lease row fails every config write; [#145192](https://github.com/openclaw/openclaw/issues/145192) and [#144742](https://github.com/openclaw/openclaw/issues/144742) document the resulting rollback-onto-9.4-migrated-state failure on the 9.2 → 9.4 path. Operators running managed updates should hold off or apply [#144208](https://github.com/openclaw/openclaw/pull/145043)-dependent fixes once available.

## 3. Project Progress

Closed/merged in the last 24h (selected, no public comment counts on most PRs but visible merge state):

- **[#144712](https://github.com/openclaw/openclaw/issues/144712)** — Closed: `npm update` failing at "global install swap" with intact rollback reported as "recovery is unverified".
- **[#140908](https://github.com/openclaw/openclaw/issues/140908)** — Closed: `doctor --fix`/`gateway status --deep` failing under `systemd --user` with `EACCES` on `systemctl --user is-enabled`.
- **[#140971](https://github.com/openclaw/openclaw/issues/140971)** — Closed: All 13 Feishu plugin tools silently dropped in message-driven runs (regression 2026.7.1-2 → 2026.8.1).
- **[#140821](https://github.com/openclaw/openclaw/issues/140821)** — Closed: Gateway restart hangs after 2026.9.2 upgrade under systemd user service.
- **[#137377](https://github.com/openclaw/openclaw/issues/137377)** — Closed: Doctor `--fix` on Windows 2026.8.2 always fails at final restart.
- **[#144581](https://github.com/openclaw/openclaw/issues/144581)** — Closed: Windows `openclaw update` fails at candidate snapshot on dev/git channel.
- **[#49876](https://github.com/openclaw/openclaw/issues/49876)** — Closed (stale): Cron sessions deliver hallucinated output when tool calls fail.
- **[#40786](https://github.com/openclaw/openclaw/issues/40786)** — Closed: `.gitignore`-style exclude patterns for backup CLI feature request (revisit pending).
- **[#79168](https://github.com/openclaw/openclaw/issues/79168)** — Closed (stale): Content-based prompt-injection scanning on tool output.
- **[#92405](https://github.com/openclaw/openclaw/issues/92405)** — Closed: subagent spawn persists raw provider instead of CLI runtime.
- **[#96337](https://github.com/openclaw/openclaw/issues/96337)** — Closed: anthropic-vertex regression on pure text responses.
- **[#96947](https://github.com/openclaw/openclaw/issues/96947)** — Closed: OpenRouter Anthropic cacheWrite regression post-2026.6.10.
- **[#97021](https://github.com/openclaw/openclaw/issues/97021)** — Closed: Telegram typing indicator stuck in forum/topic mode.
- **[#92367](https://github.com/openclaw/openclaw/issues/92367)** — Closed: Scope-bound gateway auth tokens feature request.
- **[#136827](https://github.com/openclaw/openclaw/pull/136827)** — Merged: moves `qs` override off two published moderate dependency advisories.
- **[#129157](https://github.com/openclaw/openclaw/pull/129157)** — Merged: Web UI shows nested tool activity and failure details.

Open PRs advancing (status: 👀 ready / ⏳ waiting on author / 📣 needs proof):
- [#145043](https://github.com/openclaw/openclaw/pull/145043) — Prevent stale Codex migrations from blocking upgrades (closes [#123326](https://github.com/openclaw/openclaw/issues/123326)).
- [#145044](https://github.com/openclaw/openclaw/pull/145044) — Unattended update repair on newer candidate state.
- [#145379](https://github.com/openclaw/openclaw/pull/145379) — Keep open `groupPolicy` as a warning so 9.3 → 9.4 Doctor lint passes.
- [#145369](https://github.com/openclaw/openclaw/pull/145369) — Keep unavailable plugin requirements visible after updates.
- [#133884](https://github.com/openclaw/openclaw/pull/133884) — Recover managed plugin release pins during updates (closes the [#135776](https://github.com/openclaw/openclaw/issues/135776) plugin version-skew class).
- [#144768](https://github.com/openclaw/openclaw/pull/144768) — Provider credentials enable model use only when bound to that provider.
- [#145196](https://github.com/openclaw/openclaw/pull/145196) — Await durable OAuth refresh transitions.
- [#145051](https://github.com/openclaw/openclaw/pull/145051) — Make chat login and model-access recovery actionable.
- [#145248](https://github.com/openclaw/openclaw/pull/145248) — Honor `compat.supportedReasoningEfforts` in thinking-level resolution.
- [#145377](https://github.com/openclaw/openclaw/pull/145377) — Radius provider with browser sign-in and native streaming (Pi protocol).
- [#132769](https://github.com/openclaw/openclaw/pull/132769) — LINE: apply a group's `requireMention` to every message.
- [#145391](https://github.com/openclaw/openclaw/pull/145391) — Preserve complete voice-note transcription (removes 1,200 s decoder cap).
- [#145316](https://github.com/openclaw/openclaw/pull/145316) — Show how each provider is signed in inside the model picker.
- [#145384](https://github.com/openclaw/openclaw/pull/145384) — Cache successful Gateway catalog reads to avoid repeated waits.
- [#145043](https://github.com/openclaw/openclaw/pull/145043), [#145044](https://github.com/openclaw/openclaw/pull/145044), [#145379](https://github.com/openclaw/openclaw/pull/145379) ship as a coordinated upgrade-path hardening cluster.

## 4. Community Hot Topics

| Rank | Item | Comments | Underlying need |
|---|---|---|---|
| 1 | [#119720](https://github.com/openclaw/openclaw/issues/119720) — Synchronous agent persistence and transcript maintenance block the Gateway event loop at scale | 17 | Need non-blocking persistence that survives multi-agent (600+ agents) deployments without `integrity_check` stalling the loop |
| 2 | [#97616](https://github.com/openclaw/openclaw/issues/97616) — OpenClaw leaks unreaped hook/tool child processes (zombie accumulation) | 16 | Need reliable process reaping for long-running Gateway hosts |
| 3 | [#96834](https://github.com/openclaw/openclaw/issues/96834) — WhatsApp 1:1 inbound image wedges main lane ~3 min | 15 | Multimodal ingress must not stall the active_reply/queued_work lanes |
| 4 | [#140620](https://github.com/openclaw/openclaw/issues/140620) — In-place 7.1-2 → 9.2 stalls session-transcript reconciliation at 27/~1500 | 12 | Pre-8.x transcript (`.trajectory.jsonl`) import needs bounded progress and resumability |
| 5 | [#144712](https://github.com/openclaw/openclaw/issues/144712) — `npm update` fails at "global install swap" with intact rollback misreported as "recovery unverified" | 12 | Update handoff must distinguish "package restored but verification skipped" from "package restored safely" |
| 6 | [#127148](https://github.com/openclaw/openclaw/issues/127148) — Codex `sessions.compact` acquires a second app-server → active-writer conflict | 12 | Compaction must run on the owning thread/client |
| 7 | [#142585](https://github.com/openclaw/openclaw/issues/142585) — 2026.9.3 Doctor refuses valid legacy workspace state | 12 | Doctor migration path needs to canonicalize legacy rows or skip when attestation is valid |
| 8 | [#49876](https://github.com/openclaw/openclaw/issues/49876) — Cron sessions deliver hallucinated output on tool failure | 12 | Trust/safety: isolated cron must fail closed, not fabricate |
| 9 | [#40786](https://github.com/openclaw/openclaw/issues/40786) — `.gitignore`-style exclude patterns for `openclaw backup create` | 12 | Backup ergonomics + secrets safety |
| 10 | [#141252](https://github.com/openclaw/openclaw/issues/141252) — 2026.9.2 regression: "Reply operation has no active tool authority snapshot" | 11 | Busy-session/queued replies lose their authority snapshot on scheduling hop |
| 11 | [#141747](https://github.com/openclaw/openclaw/issues/141747) — Runtime scaffolding `<system-reminder>` injects ~686 tokens/turn with no opt-out | 11 | Token-cost transparency and opt-out for chat-only deployments |

**Underlying need analysis**: the community is coalescing around three persistent themes — (a) **upgrade/migration safety** (top items #4, #5, #7, #10 all stem from the 7.x → 8.x → 9.x storage and config evolution), (b) **Gateway event-loop discipline** (#1, #3), and (c) **tool-authority and session-state correctness** (#6, #10, #11).

## 5. Bugs & Stability

Ranked by severity (P0 / `ux-release-blocker` / `crash-loop` / `diamond lobster`):

| Sev | Issue | Impact | Fix PR? |
|---|---|---|---|
| 🔴 P0 release-blocker | [#144742](https://github.com/openclaw/openclaw/issues/144742) — 2026.9.4 ships without [#144208](https://github.com/openclaw/openclaw/pull/145043); v1 handoff lease row fails every config write | All 2026.9.4 users on prior versions | Pending [#145043](https://github.com/openclaw/openclaw/pull/145043) (unqualified draft) |
| 🔴 P0 release-blocker | [#145192](https://github.com/openclaw/openclaw/issues/145192) — 9.2 → 9.4 managed update fails at candidate-Doctor, then rolls back onto 9.4-migrated state | macOS/npm-global users upgrading to 9.4 | Same as above |
| 🔴 P0 release-blocker | [#140620](https://github.com/openclaw/openclaw/issues/140620)

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem

**Window:** 2026-09-12 · **Projects:** OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The open-source personal AI assistant category has decisively outgrown the single-user CLI agent: all five tracked projects now run as persistent, gateway-hosted services embedded in messaging platforms (Telegram, WhatsApp, Feishu, WeChat, LINE, Mattermost), and engineering effort has shifted to the operational consequences of that model — safe upgrades, tenant isolation, session-state durability, and token-cost control. Four of five projects shipped or staged releases within 24 hours of this window, indicating a maturing release-train culture. A competitive portability layer is emerging simultaneously: QwenPaw's PawPort actively imports Codex and Qoder users, while OpenClaw maintains Codex-migration compatibility — evidence of consolidation and user poaching. Finally, security is professionalizing: OIDC principal stacks (ZeroClaw), cross-profile credential isolation closures (Hermes), and fail-closed approval-gate semantics are now table stakes rather than differentiators.

---

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Release status | Health score |
|---|---|---|---|---|
| **OpenClaw** | 500 touched | 500 touched | v2026.9.4 (9/11) shipped **with two P0 upgrade blockers** (#144742, #145192); managed-update hold advisory | **7/10** — unmatched scale and velocity, but release discipline slipped and 7.x→9.x migration debt dominates |
| **Hermes Agent** | 50 (21 closed) | 50 (34 merged) | v0.21.2 patch (9/11) targeting state.db concurrent-writer corruption | **8/10** — best closure ratio (68% of PRs merged), security hardening milestone; structural profile-identity debt (#88715) still open |
| **IronClaw** | 0 | 1 (unreviewed) | None in window | **4/10\*** — single PR (#8076) awaiting review since 9/6; *\*low confidence — likely inter-cycle lull, not abandonment* |
| **QwenPaw** | 21 | 41 (18 closed) | v2.2.1 stable (9/11) — per-agent model routing, memory upgrades | **7.5/10** — strong cadence and contributor pipeline, but three unfixed HIGH regressions (#7567, #7678, #7708) |
| **ZeroClaw** | 50 | 50 | None; v0.8.5 current with ≥3 known regressions | **6.5/10** — deep OIDC/security momentum (#8289), but governance queue (#8692) stalls merges and regressions await release |

*Methodology: health = throughput, closure ratio, release discipline, open P0/P1 load, backlog hygiene, weighted from the 24h digest data only.*

---

## 3. OpenClaw's Position

**Advantages vs peers:**
- **Scale (~10x peers):** ~1,000 items touched daily vs 50–100 for Hermes/ZeroClaw and 62 for QwenPaw; hot-topic threads draw 11–17 comments each, indicating deep operator engagement rather than drive-by reporting.
- **Broadest surface matrix:** WhatsApp, Telegram, Feishu, LINE, a new Radius provider (Pi protocol), voice transcription — no peer covers this many transports and providers.
- **Update machinery as a product feature:** v2026.9.4's recover-from-failed-updates capability (#140339) is unique; no competitor treats reversible updates as a headline release.
- **Proven scale headroom:** 600+ agent deployments stress-testing the event loop (#119720) — problems peers have not yet encountered.

**Technical approach differences:** OpenClaw is gateway-centric with execution lanes (active_reply/queued_work) and tool-authority snapshots — vs Hermes' multiplexed profiles on one host, ZeroClaw's Rust RPC-core with formal RFC governance, and QwenPaw's desktop/console + Hub product layer.

**Weaknesses:** Release discipline — v2026.9.4 shipped without #144208, creating both P0s. Its upgrade-path pain (7.x→9.x storage evolution: #140620, #142585, #144712) dwarfs peers' migration issues; event-loop blocking and zombie reaping (#97616) are scale taxes. Ironically, several OpenClaw problems are artifacts of being further along the adoption curve.

**Community size:** Clearly the largest by activity volume and contributor breadth; a maintainer bench (led by `steipete`) capable of landing a coordinated five-PR fix cluster (#145043/#145044/#145379/#145369/#133884) in one day.

---

## 4. Shared Technical Focus Areas

| Theme | Projects | Specific needs / evidence |
|---|---|---|
| **Multi-tenancy, profile isolation & principal auth** | Hermes, ZeroClaw, QwenPaw, OpenClaw | Hermes: ~2/3 of closures in multiplex cohort; late-bound identity meta-issue #88715; cross-profile credential leaks #65940/41 closed. ZeroClaw: 8-PR OIDC stack #8289 (principal attribution, session ownership, private memory). QwenPaw: Hub RBAC roadmap #7318 + admin bootstrap #7696. OpenClaw: scope-bound tokens #92367, authority snapshots #141252. |
| **Session-state durability & storage concurrency** | Hermes, OpenClaw, ZeroClaw | Hermes: state.db WAL corruption from secondary writers, fail-open guards (#103339). OpenClaw: blocking persistence at 600+ agents (#119720), transcript reconciliation stalls (#140620). ZeroClaw: durable history discarded on failed turn (#10788). |
| **Upgrade/migration safety** | OpenClaw, Hermes, QwenPaw | OpenClaw: dominant theme; coordinated hardening cluster in flight. Hermes: v0.21.x repair releases. QwenPaw inverts this — migration as growth vector (PawPort imports from Codex/Qoder, #6960). |
| **Token-cost control & cache integrity** | ZeroClaw, OpenClaw, QwenPaw | ZeroClaw: Anthropic cache-prefix invalidation cluster (#10777/#10778/#10701), compaction removed (#10780). OpenClaw: ~686 tokens/turn hidden `<system-reminder>` (#141747). QwenPaw: `/compact` request (#7679), premature-compaction fix (#7652). |
| **Subagent orchestration & per-task model routing** | QwenPaw, OpenClaw, ZeroClaw | QwenPaw: `spawn_subagent` 100% timeout (#7678), `subagent_model` silently ignored (#7676/#4901); per-agent routing shipped in v2.2.1. OpenClaw: compaction active-writer conflict (#127148). ZeroClaw: per-agent tool scoping (#9746). |
| **Fail-closed trust semantics** | Hermes, OpenClaw, ZeroClaw | Hermes: `--initial-status blocked` auto-promotes, bypassing human approval (#39609, **open, no PR**). OpenClaw: cron hallucination on tool failure (#49876). ZeroClaw: memory authorship misclassification (#10754). |
| **Messaging multimodal ingress** | OpenClaw, ZeroClaw, QwenPaw, Hermes | OpenClaw: WhatsApp image wedges main lane 3 min (#96834). ZeroClaw: media-group batching (#5514), image-cap cache eviction (#10778). QwenPaw: Telegram rich rendering (#7713). Hermes: Mattermost voice transcoding (#108653). |

---

## 5. Differentiation Analysis

- **OpenClaw** — *The operator's platform.* Always-on, self-hosted personal assistant at fleet scale; broadest transport/provider matrix; productized update/rollback machinery. Target: self-hosters and operators running persistent assistants, including 600+ agent deployments.
- **Hermes Agent** — *The multi-persona host.* Differentiates on multiplexed profiles per host (multiple personas sharing infrastructure), an external plugin API with invocation-scoped context, and Nous inference integration. Target: power users running several distinct agent profiles on one machine.
- **QwenPaw** — *The productized team play.* Polished desktop/console UX, China-market channel coverage (WeChat/DingTalk alongside Telegram), and a strategic bet on multi-tenant Hub (shared workspaces, RBAC). PawPort makes inbound switching frictionless — the most aggressively growth-oriented project.
- **ZeroClaw** — *The security/governance maximalist.* Rust core (RPC dispatcher, stack guards), formal RFC process, deep OIDC/principal architecture, ZeroCode desktop client. Slower release cadence, deeper architectural investment. Target: security-conscious self-hosters.
- **IronClaw** — OpenAI-compatible assistant surface with Slack capability expansion in flight (#8076); insufficient window signal to characterize strategy.

Architecture splits meaningfully: OpenClaw and Hermes are gateway-daemon designs (Node/Python ecosystems respectively), ZeroClaw is compiled-core with heavier process discipline, QwenPaw ships an end-user desktop/console product on top of its agent runtime.

---

## 6. Community Momentum & Maturity

**Activity tiers:**
- **Tier 1 (massive):** OpenClaw — ~1,000 items/day; uniquely deep maintainer bench.
- **Tier 2 (high):** Hermes and ZeroClaw (~100/day each), QwenPaw (~62/day with strong merge throughput).
- **Tier 3 (dormant window):** IronClaw — likely cyclical, but the unreviewed cross-cutting PR #8076 warrants maintainer attention.

**Rapidly iterating:** QwenPaw — release-train cadence, feature velocity, and the healthiest first-time contributor pipeline (5+ first PRs in one day: #7712, #7713, #6499, #6776, #7592). OpenClaw — daily coordinated fix clusters despite P0 load.

**Stabilizing/consolidating:** Hermes — post-rewrite consolidation mode (34 merges/day, overwhelmingly isolation fixes rather than features); risk of patching symptoms while the structural #88715 fix is deferred. ZeroClaw — pre-release stacking of security architecture; velocity is gated by governance throughput (#8692 decision queue, 15 comments), not engineering capacity.

**Maturity markers:** field-verified diagnostics from operators (Hermes #103339), RFC discipline with explicit design ratification (ZeroClaw #8289), two-way roadmap negotiation with users (QwenPaw #7318), and coordinated multi-PR repair strategy (OpenClaw). IronClaw cannot be assessed on maturity from this window.

---

## 7. Trend Signals

1. **Single-user agent → multi-tenant service.** Identity/principal work appears in 4 of 5 projects (Hermes multiplex, ZeroClaw OIDC, QwenPaw Hub, OpenClaw scoped tokens). *Developer takeaway:* canonicalize identity at the system boundary — Hermes' late-bound-identity debt (#88715, ~20 downstream bugs) is the cautionary tale.
2. **Portability as competitive strategy.** PawPort's inbound migration from Codex/Qoder and OpenClaw's Codex-compat maintenance show switching costs falling. Data gravity is shifting toward whichever agent owns the user's session history and config.
3. **Token-cost accountability is now a product requirement.** Cache-prefix invalidation (ZeroClaw's four-issue cluster), hidden per-turn token overhead (OpenClaw #141747), and compaction controls (QwenPaw #7679) all generate user anger when absent. Silent cost = churn.
4. **Autonomy demands fail-closed semantics.** Hermes' approval-gate bypass (#39609) and OpenClaw's cron hallucination (#49876) define the trust frontier: scheduled/autonomous paths must fail visibly, never fabricate or auto-promote.
5. **Messaging platforms are the runtime; multimodal ingress is the new bug frontier.** Image handling (WhatsApp wedges, cache eviction, media batching) dominates new high-severity reports across four projects.
6. **Upgrade safety builds operator trust.** OpenClaw's reversible-update machinery points where the ecosystem is heading; Hermes' corruption-during-repair incidents show the cost of getting it wrong. Single-writer discipline for state stores is non-negotiable.
7. **Maintainer bandwidth and governance are the scaling bottleneck.** ZeroClaw's decision queue and OpenClaw's need for coordinated fix clusters show process design now gates velocity as much as code — contributor onboarding pipelines (QwenPaw's strength) are a strategic asset.

**Bottom line:** OpenClaw leads on scale and surface breadth but must fix release discipline; Hermes and QwenPaw offer the best responsiveness-to-users ratios; ZeroClaw is making the deepest architectural bet on security; IronClaw's position is unassessable this window.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — Project Digest (2026-09-12)

**Source:** github.com/NousResearch/hermes-agent · **Window:** Last 24 hours

---

## 1. Today's Overview

Hermes Agent saw a high-intensity maintenance day: **50 issues updated (29 open, 21 closed)** and **50 PRs updated (16 open, 34 closed/merged)**, anchored by the **v0.21.2 "state.db Patch Release"** that shipped on 2026-09-11. The dominant theme is the fallout from the v0.21.0 multiplexed-gateway/session-store rewrite — issues opened or closed today concentrate on **profile isolation in multiplex mode**, **concurrent-writer corruption of `state.db`**, and **late-bound profile identity across transport/session/storage paths**. Severity is skewed toward **P1/P2** with several security-adjacent items (`sweeper:risk-session-state`, `risk-security-boundary`). Overall project health looks **active and responsive**, but the same architectural seams are being patched repeatedly, suggesting the underlying fix needs a structural rather than incremental resolution.

---

## 2. Releases

### v0.21.2 (v2026.9.11) — *The state.db Patch Release* — 2026-09-11

A **patch release** targeting fragility in `state.db` introduced by the v0.21.0 session-store connection rewrite. For some installs, secondary writers were cancelling each other's locks and corrupting live WAL state. **No breaking changes** advertised; this is intended to be a drop-in fix.

**Migration notes / advisory** (inferred from concurrent issues):
- Deployments running **multiplexed gateways** (`gateway.multiplex_profiles: true`) with multiple profile gateways on one host are the highest-risk group. [#103339](https://github.com/NousResearch/hermes-agent/issues/103339) reports **7 state.db corruptions in 4 days (9/2–9/5)** on such a setup and proposes a lazy `flock` single-writer gate. Operators on this topology should upgrade before the next concurrent operation (e.g. `hermes update`, `doctor --fix`, hosted-room worker restart).
- Watch for upstream guards that are "fail-open" (i.e. permissive on error). Patch + `#107688` (dashboard unconditional writable `SessionDB` open at startup) both target this class of bug.
- Cron restart-safety on multiplexed gateways also touched ([#107399](https://github.com/NousResearch/hermes-agent/issues/107399)).
- No callouts to config-file changes; v0.21.x should be self-consistent.

> Note: The release notes snippet in the data feed was truncated mid-sentence ("healthy…"). A full release-notes read on GitHub is recommended before applying to a production multi-profile host.

---

## 3. Project Progress — Merged/Closed PRs Today

The 34 closed/merged PRs (top representatives below) cluster around three pillars: **profile-scope correctness**, **session-state hygiene**, and **small platform/provider fixes**.

| PR | Title | Theme |
|---|---|---|
| [#108645](https://github.com/NousResearch/hermes-agent/pull/108645) | Add invocation-scoped context and availability for plugin slash commands | Plugin API slice — host-created invocation-local context for external plugins (profile/session/platform bound) |
| [#108653](https://github.com/NousResearch/hermes-agent/pull/108653) | fix(gateway): keep Mattermost voice replies playable on iOS | Gateway delivery — transcode OGG/Opus → MP3 when ffmpeg is available |
| [#108627](https://github.com/NousResearch/hermes-agent/pull/108627) | fix(managed-uv): strip UV_PYTHON_PREFERENCE from managed_python_env() | Install/update — `hermes update` no longer fails when the user has `UV_PYTHON_PREFERENCE` set (Python 3.14 workaround for pip-audit SIGABRT) |
| [#63962](https://github.com/NousResearch/hermes-agent/pull/63962) | fix(feishu): preserve profile scope for SDK-thread callbacks | Profile isolation — Feishu's SDK threads no longer drop the multiplexed adapter's profile `ContextVar` |
| [#56508](https://github.com/NousResearch/hermes-agent/pull/56508) | security(gateway): re-resolve hooks directory per call | Profile isolation — `gateway/hooks.py` `HOOKS_DIR` was frozen at import time |
| [#56315](https://github.com/NousResearch/hermes-agent/pull/56315) | fix(security): re-resolve checkpoint/sticker-cache paths per call | Profile isolation — `CHECKPOINT_BASE` and `CACHE_PATH` no longer leak across profiles in multiplexed gateway |
| [#107688](https://github.com/NousResearch/hermes-agent/issues/107688) *(closed issue, fix likely coupled to patch release)* | Dashboard does unconditional writable SessionDB open at startup | Session-state — closes documented concurrent-FTS-rebuild corruption vector |
| [#91654](https://github.com/NousResearch/hermes-agent/issues/91654) *(closed issue)* | MCP session/circuit-breaker registries keyed by server name only | Profile isolation — closes registry collision in multiplexed gateways |
| [#107327](https://github.com/NousResearch/hermes-agent/issues/107327) *(closed issue)* | Process-global path memoisation in multiplexed gateway | Profile isolation — protected-instruction gate and config.yaml hard-block no longer profile-tainted |
| [#106005](https://github.com/NousResearch/hermes-agent/issues/106005) *(closed issue)* | Multiplex profiles: MCP connections not profile-scoped | Profile isolation — first/last-profile wins |
| [#102120](https://github.com/NousResearch/hermes-agent/issues/102120) *(closed issue)* | hosted_room_worker corrupts shared state.db on multi-profile gateway restart | Session-state — restart path no longer races |
| [#71344](https://github.com/NousResearch/hermes-agent/issues/71344) *(closed issue)* | Messaging panel "gateway stopped" for named profiles | Profile isolation |
| [#107399](https://github.com/NousResearch/hermes-agent/issues/107399) *(closed issue)* | Passthrough env key breaks restart-safe cron dispatch | Profile isolation |
| [#103717](https://github.com/NousResearch/hermes-agent/issues/103717) *(closed issue)* | Feishu busy-session follow-ups from secondary owners unauthorized | Profile isolation |
| [#65940](https://github.com/NousResearch/hermes-agent/issues/65940) *(closed issue)* | Credential pool can use another profile's API key | **Security** — credential pool no longer falls back to a process-wide env var from a different profile |
| [#65941](https://github.com/NousResearch/hermes-agent/issues/65941) *(closed issue)* | Nous requests can use another profile's endpoint | **Security** — Nous inference endpoint override is profile-scoped |
| [#107422](https://github.com/NousResearch/hermes-agent/issues/107422) *(closed issue)* | Multiplexed dashboard one-shot TERMINAL_* ambient bridge | Profile isolation — Docker policy no longer latches a secondary profile |
| [#98292](https://github.com/NousResearch/hermes-agent/issues/98292) *(closed issue)* | QQBot approval buttons rejected in named-profile sessions | Profile isolation |
| [#82903](https://github.com/NousResearch/hermes-agent/issues/82903) *(closed issue)* | session_search tool ignores 'profile' arg in gateway | Profile isolation |
| [#102526](https://github.com/NousResearch/hermes-agent/issues/102526) *(closed issue)* | Desktop launch backend binds to another profile's state.db | Profile isolation — `HERMES_HOME` override race fixed |
| [#99121](https://github.com/NousResearch/hermes-agent/issues/99121) *(closed issue)* | mem0 plugin fails closed on self-hosted OSS | Profile isolation — `UnscopedSecretError` fixed |
| [#2825](https://github.com/NousResearch/hermes-agent/issues/2825) *(closed issue)* | Installation in Termux/proot Ubuntu 25.10 | Setup |

**Net movement:** Roughly **two-thirds of the day's closures sit in the multiplex/profile-isolation cohort** — a clear, focused effort. Security closure of #65940 / #65941 (cross-profile credential/endpoint leakage) is a meaningful hardening milestone.

---

## 4. Community Hot Topics

Sorted by comment volume (last 24h), all issues:

| # | Issue | Comments | Underlying need |
|---|---|---:|---|
| [#39609](https://github.com/NousResearch/hermes-agent/issues/39609) | Tasks created with `--initial-status blocked` auto-promote to `ready` ~1s later with no actor — **human approval gate bypassed** | **14** | **Trust boundary**: a kanban `--initial-status` flag is supposed to express a human gate, but the gate auto-resolves silently. This is a UX/safety expectation that the scheduler is silently contradicting. |
| [#67605](https://github.com/NousResearch/hermes-agent/issues/67605) | Dashboard/desktop profile switch is partial — MCP tools never load, secrets/`${VAR}` resolve from launch profile, not selected one | **11** | **Profile identity** is not canonical before stateful use; users selecting a profile in the UI get a hybrid. This is the same class of complaint as #88715 (identity late-bound) but from the end-user perspective. |
| [#103339](https://github.com/NousResearch/hermes-agent/issues/103339) | Second writer via `doctor --fix` / `repair_state_db_schema` / hosted_rooms corrupts live-WAL state.db — **upstream guards are fail-open** (field-verified) | **8** | **Operational reliability**: maintainer-side utilities themselves can corrupt the session store. Proposes a lazy `flock` single-writer gate. Directly motivates v0.21.2. |
| [#106005](https://github.com/NousResearch/hermes-agent/issues/106005) | Multiplex profiles: MCP connections / toolset resolution not profile-scoped | **6** | **Multi-tenancy**: only the first profile gets MCP tools; later profiles silently inherit or get nothing. Closed today, suggesting a fix landed. |
| [#87739](https://github.com/NousResearch/hermes-agent/issues/87739) | `/hatch` burns paid image requests retrying unsegmentable animation rows | **6** | **Cost control / petdex UX**: known-unsegmentable rows still incur paid image retries; user-visible cost pain. |
| [#89412](https://github.com/NousResearch/hermes-agent/issues/89412) | MCP OAuth flow never triggers for servers that don't challenge unauthenticated requests (e.g. Google Gmail MCP) | **5** | **Integration reach**: OAuth is wired reactively on 401; providers that don't 401-probe fail silently — Google Gmail/Developer Productivity confirmed. |
| [#88715](https://github.com/NousResearch/hermes-agent/issues/88715) | Multiplex: profile identity is **late-bound** across transport, session, storage, control paths | **5** | **Architectural synthesis**: this is the meta-issue tying #67605, #91654, #106005, #65940/41, #102526 together — there is no single canonicalization point. |

**Pattern:** Three of the top seven issues (#103339, #39609, #67605) have comments that read like maintainer-vs-operator negotiation (concrete repros, code-level proposals, security framing). The community is contributing **field-verified diagnostics and patches**, not just bug reports — a healthy sign for project resilience.

---

## 5. Bugs & Stability — Reported Today, Ranked by Severity

### P1 (production-impact)

| Issue | Summary | Fix PR? |
|---|---|---|
| [#103339](https://github.com/NousResearch/hermes-agent/issues/103339) | Second writer (`doctor --fix`, `repair_state_db_schema`, hosted_rooms) corrupts live-WAL `state.db`; fail-open guards; 7 corruptions / 4 days in field | **Partial — addressed in v0.21.2**; reporter's proposed lazy `flock` gate still pending as a structural fix |
| [#102120](https://github.com/NousResearch/hermes-agent/issues/102120) | hosted_room_worker corrupts shared state.db on simultaneous multi-profile gateway restart | **Closed today** (likely fixed by/around the patch release) |
| [#91654](https://github.com/NousResearch/hermes-agent/issues/91654) | MCP session/circuit-breaker registries collide across multiplexed profiles (server-name key only) | **Closed today** |
| [#102526](https://github.com/NousResearch/hermes-agent/issues/102526) | Desktop launch backend binds to another profile's state.db (`HERMES_HOME` race) — default bot opens wrong chat | **Closed today** |
| [#107688](https://github.com/NousResearch/hermes-agent/issues/107688) | Dashboard does unconditional writable `SessionDB` open at startup, exposing the concurrent-FTS-rebuild corruption vector | **Closed today** (almost certainly addressed by v0.21.2) |
| [#107422](https://github.com/NousResearch/hermes-agent/issues/107422) | Multiplexed dashboard one-shot TERMINAL_* ambient bridge latches secondary-profile Docker policy | **Closed today** |

### P2 (significant)

| Issue | Summary | Status |
|---|---|---|
| [#39609](https://github.com/NousResearch/hermes-agent/issues/39609) | `--initial-status blocked` auto-promotes to `ready` ~1s later — **human approval gate bypassed** | **Open**, no PR yet — high-impact trust issue still unfixed |
| [#67605](https://github.com/NousResearch/hermes-agent/issues/67605) | Dashboard profile switch is hybrid (MCP/tools/secrets from launch profile) | Open |
| [#106005](https://github.com/NousResearch/hermes-agent/issues/106005) | MCP not profile-scoped in multiplex | Closed today |
| [#89412](https://github.com/NousResearch/hermes-agent/issues/89412) | MCP OAuth never triggers for non-challenging servers (Gmail/Developer Prev.) | Open |
| [#88715](https://github.com/NousResearch/hermes-agent/issues/88715) | Profile identity late-bound across all paths | Open — structural |
| [#107485](https://github.com/NousResearch/hermes-agent/issues/107485) | SSH-isolated cron backend's idle-exit kills running cron + skips slots |

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-12

**Repository:** [github.com/nearai/ironclaw](https://github.com/nearai/ironclaw)

---

## 1. Today's Overview

Project activity on 2026-09-12 is extremely low across all tracked vectors. No issues were opened, updated, or closed in the last 24 hours, and no new releases were published. Only one pull request ([#8076](https://github.com/nearai/ironclaw/pull/8076)) saw activity, and it remains open with no review engagement (zero reactions, no discussion captured). The overall signal points to a quiet day in the repository — possibly a weekend, holiday, or a period between release cycles — rather than any sign of stalled maintenance, since the existing open work is narrowly scoped and recent.

---

## 2. Releases

No new releases in the last 24 hours. The release pipeline appears idle; there is nothing to version, migrate, or document at this time.

---

## 3. Project Progress

No pull requests were merged or closed today, so no features were formally advanced into the codebase. The single active PR ([#8076](https://github.com/nearai/ironclaw/pull/8076)) — *fix(assistant): distinguish disconnected shared channels* — is still under review and has not landed.

---

## 4. Community Hot Topics

There are no high-engagement threads to report. The only recently updated item is:

- **[PR #8076 — fix(assistant): distinguish disconnected shared channels](https://github.com/nearai/ironclaw/pull/8076)** — `0` 👍, comments undefined
  *Analysis:* Despite zero public reactions, the topic itself is meaningful. The PR signals that IronClaw's assistant is being refined to correctly differentiate between (a) a paired user's shared channel that has been disconnected, and (b) an account that was never paired at all. Underlying need: clearer error semantics and consistent rejection messaging across the assistant itself, its adapters, and any OpenAI-compatible surface — a classic developer-experience fix that reduces ambiguous bot replies.

---

## 5. Bugs & Stability

No new bugs, crashes, or regressions were filed in the last 24 hours. The only stability-adjacent work is the still-open [PR #8076](https://github.com/nearai/ironclaw/pull/8076), which addresses a misclassification bug in how disconnected (but previously paired) shared channels are handled — a low-to-moderate severity UX defect rather than a crash or data-loss issue. No severity ranking can be produced from current data.

---

## 6. Feature Requests & Roadmap Signals

No new feature requests were submitted today. The only forward-looking signal is contained inside [PR #8076](https://github.com/nearai/ironclaw/pull/8076), which mentions "update the Slack capabili[t]…" — suggesting that a Slack capability expansion is bundled with the bug fix and may ship together once the PR merges. No predictions about the next version can be made from a single open PR with no release commit.

---

## 7. User Feedback Summary

No user-submitted issues or reactions were captured in the last 24 hours, so there is no fresh qualitative feedback to summarize. The absence of thumbs-up or thumbs-down on [PR #8076](https://github.com/nearai/ironclaw/pull/8076) suggests maintainers have not yet triaged it publicly.

---

## 8. Backlog Watch

- **[PR #8076 — fix(assistant): distinguish disconnected shared channels](https://github.com/nearai/ironclaw/pull/8076)**
  *Status:* Open since 2026-09-06, last updated 2026-09-11 (~1 day before this digest). No reviewer comments, no reactions.
  *Recommendation:* Maintainer attention recommended. The change touches the assistant core, an adapter layer, and an OpenAI-compatible surface, which together make it a cross-cutting fix worth a timely review to avoid merge conflicts.

No long-stale issues were surfaced today, but the overall issue backlog was not refreshed in this window, so prior unresolved items cannot be assessed from the provided data slice.

---

*Digest generated from 24-hour GitHub activity window; figures reflect only what was updated in the last day, not cumulative repository state.*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-12

## 1. Today's Overview

QwenPaw shows **high development velocity** with 62 tracked updates in the last 24h (21 issues, 41 PRs) and the stable launch of **v2.2.1**. The project is in an active stabilization phase following the v2.2.0 multi-tenant Hub announcement, with the team shipping both feature additions (per-agent model routing, proactive memory upgrades) and rapid bug-fix responses to community-reported regressions in the 2.2.x line. Community engagement is healthy — the top discussion (#7318) on Hub roadmap has 26 comments and 4 reactions, while first-time contributors are landing their first PRs in tools, providers, and Telegram integrations. Overall, this indicates a **mature release cadence** with a healthy first-time-contributor pipeline and a few notable regressions that need continued triage.

## 2. Releases

### v2.2.1 (Stable) — Released 2026-09-11
Release verification confirmed closed ([Issue #7692](https://github.com/agentscope-ai/QwenPaw/issues/7692)).

**Highlights**
- **Per-agent model routing** ([#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501)): Each Agent can now declare its own provider preferences and fallback chain independently of global defaults.
- **Proactive memory review (Auto Fin)**: New automatic review pass for long-term memory.
- **ReMe upgrade**: Memory subsystem refreshed for higher recall and stability.

**Migration notes**
- Per-agent provider config takes precedence over global provider settings — existing single-agent setups should keep working but multi-agent users should audit model assignments.
- No documented breaking API changes in the release notes excerpt; beta.2 → stable changes are bug-fix focused.

## 3. Project Progress

**Merged/closed PRs (last 24h)** — 18 closed, key items:

| PR | Area | Impact |
|---|---|---|
| [#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960) | PawPort import flow | Major portability win — first-party migration from Codex and Qoder into QwenPaw (instructions, settings, skills, plugins, projects, recent work) |
| [#7652](https://github.com/agentscope-ai/QwenPaw/pull/7652) | Models | Fixes premature context compaction by restoring provider-resolved context windows when model reports `32768` |
| [#7688](https://github.com/agentscope-ai/QwenPaw/pull/7688) | Console UX | Replaces collapse-all with page-by-page "Load More" pagination; preserves scroll position on selection |
| [#7677](https://github.com/agentscope-ai/QwenPaw/pull/7677) | API | Returns structured 422 for non-finite validation inputs instead of 500 |
| [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) | Telegram | Markdown tables now render as `<pre>` blocks instead of raw pipes (fixes #7585) |
| [#6994](https://github.com/agentscope-ai/QwenPaw/pull/6994) | Release notes | Backfilled v2.1.0 release notes |
| [#7674](https://github.com/agentscope-ai/QwenPaw/issues/7674), [#7692](https://github.com/agentscope-ai/QwenPaw/issues/7692) | Release duty | Beta-2 and stable v2.2.1 verification closed |

The **PawPort merge is the most strategically important PR of the day** — it formalizes cross-tool agent portability as a product surface.

## 4. Community Hot Topics

| Topic | Thread | Engagement |
|---|---|---|
| **QwenPaw Hub roadmap** | [Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) | 26 comments, 4 👍 |
| **Mobile Web UX optimization** | [Issue #7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) | 10 comments (closed) |
| **Spawn subagent failure cluster** | [Issue #7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) + [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) + [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) | 3+3+3 comments |

**Underlying needs:**
- **#7318 — Multi-tenant governance**: Teams want shared workspaces, admin-managed skills, RBAC. Maintainers opened the discussion thread to scope v2.2.0+ Hub features; expect concrete RFCs soon. Linked PR [#7696](https://github.com/agentscope-ai/QwenPaw/pull/7696) (local admin bootstrap) shows work already in flight.
- **#7177 — Mobile ergonomics**: Web console on phones needs the run/stop toggle at the top (not buried) and a separate submit button from the newline key — recurring theme in [#7707](https://github.com/agentscope-ai/QwenPaw/issues/7707).
- **Subagent model selection**: Three converging threads (#4901, #6302 parent, #7676 regression) indicate **per-task model dispatch is a priority feature** that isn't fully wired up — `subagent_model` field exists but is ignored, which is now a confirmed bug in 2.2.1-beta.1/2.

## 5. Bugs & Stability

Severity-ranked bugs from the last 24h:

| Sev | Issue | Symptom | Fix in flight? |
|---|---|---|---|
| 🔴 **HIGH** | [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | Stop button removes UI indicator but task keeps running; resubmit then 409s. **Execution control integrity issue.** | None yet |
| 🔴 **HIGH** | [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) | `spawn_subagent` 100% timeout failure in 2.2.0; even extended timeouts don't help | None yet |
| 🔴 **HIGH** | [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) | Configured model silently disappears mid-session in 2.2.1 desktop; user must re-select | None yet |
| 🟠 MEDIUM | [#7689](https://github.com/agentscope-ai/QwenPaw/issues/7689) | PDF blocks still serialized as `{"type":"file"}` for multimodal models on OpenAI-compatible `/chat/completions` after #7621 only patched the non-multimodal path | None yet |
| 🟠 MEDIUM | [#7687](https://github.com/agentscope-ai/QwenPaw/issues/7687) | Switching agents silently routes message to a new conversation in 2.2.1-beta.2 — closed as resolved but worth monitoring | Likely already fixed in v2.2.1 |
| 🟠 MEDIUM | [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) | Scheduled task output is folded into steps/thinking or disappears entirely in v2.2.1 | None yet |
| 🟠 MEDIUM | [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) | `subagent_model` config silently ignored in 2.2.1-beta.1/2; subagents always inherit parent model | None yet — links to #4901 |
| 🟠 MEDIUM | [#7705](https://github.com/agentscope-ai/QwenPaw/issues/7705) | Default agent working directory setting ignored for new tasks; old path persists | None yet |
| 🟢 LOW | [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) | "Ghost sessions" — index/file mismatch | Closed as invalid |

**Pattern**: v2.2.1 introduces more HIGH-severity stability regressions than typical releases, especially around execution lifecycle control (stop, working dir, model persistence) and the subagent stack. The release verification PRs (#7674, #7692) closed cleanly, so these issues likely surfaced in broader community testing post-release rather than gating the ship.

## 6. Feature Requests & Roadmap Signals

**Likely in v2.2.2 (next patch, given active PRs):**
- **Serply as third `web_search` provider** — both the [issue #7711](https://github.com/agentscope-ai/QwenPaw/issues/7711) and [PR #7712](https://github.com/agentscope-ai/QwenPaw/pull/7712) are already paired (googio).
- **Telegram Rich Messages for Markdown tables** ([#7713](https://github.com/agentscope-ai/QwenPaw/pull/7713)) — supersedes #7590's `<pre>` approach with native rich rendering.
- **Bot-manager unified plugin** ([#7702](https://github.com/agentscope-ai/QwenPaw/pull/7702)) — single console for WeChat/DingTalk/multi-channel binding.

**Likely in v2.3.0 (Hub release train):**
- **Hub local admin bootstrap** ([#7696](https://github.com/agentscope-ai/QwenPaw/pull/7696)) — first concrete Hub feature.
- **Console history groups for inter-agent & proactive messages** ([#7710](https://github.com/agentscope-ai/QwenPaw/issues/7710)) — required for Hub's "per-agent inbox" UX.
- **Per-task model dispatch for subagents** ([#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901)) — long-standing, unblocked once #7676 is fixed.

**Strong signals from community:**
- **Loop context-compaction command (`/compact`)** ([#7679](https://github.com/agentscope-ai/QwenPaw/issues/7679)) — token-cost-conscious power users want explicit compact triggers for long goal/task runs.
- **Customizable default Loop mode** ([#7714](https://github.com/agentscope-ai/QwenPaw/issues/7714)) — rename "默认" → "标准", allow any template as default.
- **Console layout: docs preview on the right** ([#7700](https://github.com/agentscope-ai/QwenPaw/issues/7700)) — pairs with PR #7704 (chat files drawer → right).
- **Atlas Cloud provider** ([#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499)) — first-time-contributor, awaiting review since July; likely lands soon.
- **Visual compaction improvements** ([#7703](https://github.com/agentscope-ai/QwenPaw/pull/7703)) — co-evolves with the `/compact` request.

## 7. User Feedback Summary

**Pain points (real, recurring):**
- **Stop button lies** ([#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)): Users are reluctant to hit stop because the indicator change doesn't reflect backend status — creates anxiety about wasted tokens and race conditions with re-submission.
- **Subagent is broken in 2.2.0** ([#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)): "没有一个执行的下去" — zero successful runs. This blocks a major advertised capability.
- **Model config silently resets** ([#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708)): Users must restart the app to recover. Erodes trust in the desktop client.
- **Token blow-up on long Loop sessions** ([#7679](https://github.com/agentscope-ai/QwenPaw/issues/7679)): Power users see massive token usage because every submission resends the full long context.
- **Mobile (Android) input UX** ([#7707](https://github.com/agentscope-ai/QwenPaw/issues/7707)): No way to insert a newline in the chat input — every Enter submits.
- **Ghost sessions** ([#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698)): Index/file desync causes data-loss perception.

**Satisfaction signals:**
- v2.2.1 mobile Web is described as "已经比较好了" ([#7707](https://github.com/agentscope-ai/QwenPaw/issues/7707)) — overall positive, with one specific friction.
- Strong first-time contributor activity (5+ open first-time PRs today: #7712, #7713, #7592, #6499, #6776) indicates an inviting contribution flow.
- Hub direction is actively solicited by the community, not just pushed by maintainers — [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) is a two-way conversation.

## 8. Backlog Watch

Items needing maintainer attention (high-impact, low recent activity):

| Item | Days Open | Why it matters |
|---|---|---|
| [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) **spawn_subagent per-task model** | ~100 days | Top-voted subagent enhancement; #7676 confirms it's actually broken, not just missing |
| [#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499) **Atlas Cloud provider** | ~47 days | First-time-contributor PR, complete and well-scoped, just needs review |
| [#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776) **Playwright self-heal** | ~36 days | Fixes a "die-once, dead-forever" browser backend bug; marked ready-for-human-review |
| [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) **Hub roadmap RFC** | ~17 days | Active discussion but no decision yet; convert to an issue with action items or close with summary |

**Risk flag**: The cluster of unfixed HIGH-severity regressions in 2.2.1 (#7567, #7678, #7708) combined with the unaddressed [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) / [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) subagent model gap suggests the 2.2.x line needs a quick v2.2.2 patch before the team commits fully to Hub work for 2.3.0.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-12

## 1. Today's Overview

ZeroClaw shows elevated triage and development activity with 50 issues and 50 PRs touched in the last 24 hours, and an open/closed ratio of roughly 3.5:1 on both sides — a sign of heavy concurrent in-flight work rather than a burn-down day. No new releases were published, consistent with a development phase focused on landing stacked security work (the RFC #7141 / #8289 OIDC track) and resolving a cluster of provider/cache-prefix regressions. The hottest open thread is the maintainer decision queue (#8692), and the most active engineering work is concentrated on Anthropic cache invalidation, Windows stack overflow, and the multi-stage OIDC principal overhaul. Project health: **active and stable**, with several p1/p2 issues requiring coordinated fixes across the stacked PR chain.

## 2. Releases

No new releases in the last 24 hours. Last referenced production version in issues is **v0.8.5**, with at least three known regressions against it (cache prefix rewriting, inert config keys, `service logs` empty output).

## 3. Project Progress

Three PRs were merged/closed today, plus several tracker/inert-config issues closed without code changes:

- **[#10786 — CLOSED]** `anthropic: dropping previous-turn thinking blocks rewrites cached history at every turn boundary` — confirmed the mechanism behind #10778 / #10777 cache churn. Closed likely as a tracking reference rather than a code fix.
- **[#10676 — OPEN→likely merged]** `fix(ci): compare publish exceptions as paths` — Audacity88. Cross-platform CI fix (Windows/Unix) for the publish-contract exception matcher; adds a Windows regression test. Size XS.
- **[#10790 — OPEN]** `chore(assets): optimize PR-evidence images via ImgBot lossless compression` — repo hygiene; 5 PNGs under `.pr-evidence/`.
- Closed non-code items: **#9047** (ZeroCode session/memory isolation clarification), **#10690** (Integrations "Configure" slugification bug), **#10532** (degraded-config remediation invoking wrong binary), **#9092** (ZeroCode keystroke lag), **#10786** (Anthropic thinking-block cache rewrite — tracked separately).

The substantive engineering that advanced: **#10732** (`service logs` selecting daemon log by content on macOS/Windows/OpenRC), **#10640** (passive Telegram group context), and the entire **#8289 stage 3–6 PR stack** (principal attribution, session ownership, private memory, browserless OIDC, gateway auth, Nevis/iam_policy retirement) remained open but active.

## 4. Community Hot Topics

The comment distribution skews to governance and process discussions rather than feature debates:

| Rank | Item | Comments | Why it's hot |
|---|---|---|---|
| 1 | [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — Maintainer decision queue (RFCs/design) | 15 | Bottleneck for accepting/rejecting in-flight RFCs and design trackers; explicit request for maintainer/code-owner attention. |
| 2 | [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — RFC: drop mandatory RFC discussion windows | 9 | A meta-process proposal that, if accepted, would accelerate the pipeline feeding #8692. |
| 3 | [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — batch Telegram media groups | 8 | Long-standing UX pain (multiple images → multiple LLM turns). Status moved to `in-progress`. |
| 4 | [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) — Windows 2 MB stack overflow in `RpcDispatcher::process_line` | 6 | CI reliability; surfaces on `Advisory Windows nextest`. |
| 5 | [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) — OIDC milestone tracker | 3 | Anchors the entire 8-PR security stack landed this window. |

**Underlying need:** the community is signalling that (a) governance throughput is the limiting factor on merging large architectural work, (b) Telegram multimodal batching is a frequently-requested UX fix, and (c) the Windows CI story is brittle enough to need explicit guard tests.

## 5. Bugs & Stability

Ranked by severity (S1 → S3) and tagged with whether a fix PR exists:

**S1 / S2 — p1 priority, behavior blocking or degraded**

- **[#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788)** — Failed Code/ACP turn discards accepted prompt + completed tool exchanges from durable history. *No fix PR linked.*
- **[#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785)** — `zerocode` notification lag cancels every running turn (begin_notification_resync → session/cancel). *No fix PR linked.*
- **[#10782](https://github.com/zeroclaw-labs/zeroclaw/issues/10782)** — channel reply-intent precheck discards LLM usage; classifier cost never recorded. *No fix PR linked.*
- **[#10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780)** — Token-budget context compaction removed; `keep_recent`/`collapse_tool_results` inert. *Fix expected to follow #10781.*
- **[#10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778)** — Multimodal image cap eviction rewrites earlier history messages, invalidating cache prefix from that point. *Mechanism identified; linked to #10701; no fix PR yet.*
- **[#10777](https://github.com/zeroclaw-labs/zeroclaw/issues/10777)** — `thinking/effort` request config flips between turns and rewrites cached history segment. *No fix PR linked.*
- **[#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)** — `RpcDispatcher::process_line` runs at 2% of its 2 MB stack guard on Windows. *Fix implied by #10753 (closed) and #10676 (CI).*
- **[#10759](https://github.com/zeroclaw-labs/zeroclaw/issues/10759)** — SOP `run-detail` RPC omits retained `failure_reason`. *Linked to PR #9930.*
- **[#10754](https://github.com/zeroclaw-labs/zeroclaw/issues/10754)** — Memory authorship vs transport conflated when classifying preferences (`TurnOrigin::user_authored`). *No fix PR linked.*

**S2/S3 — p2 priority**

- **[#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787)** — Single-candidate stream recovery ignores `provider_retries`; 529 gets one immediate retry with no backoff. *No fix PR linked.*
- **[#10757](https://github.com/zeroclaw-labs/zeroclaw/issues/10757)** — `agent-browser` availability probe timeouts indistinguishable from missing-CLI errors. *No fix PR linked.*
- **[#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736)** — Pre-output stream failure skips advertised non-streaming fallback. *Status: in-progress.*
- **[#10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779)** — OpenCode `FreeUsageLimitError` (429) retried with sub-second backoff instead of failing fast. *No fix PR linked.*
- **[#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)** — Image attachment invalidates full history cache prefix, not just the new message. *Mechanism now in #10778.*

**Closed bugs (last 24h):** #5514 (in-progress, not yet merged fix), #10753 (Windows stack overflow, fixed), #10690 (Integrations slugification), #10532 (degraded-config wrong binary), #10609 (zerocode launch directory, S1), #10115 (tool-result truncation invisibility), #9092 (ZeroCode keystroke lag).

**Pattern:** A clear Anthropic-provider cache-rewrite cluster (#10777, #10778, #10786, #10701) needs a single root-cause fix, and the context-compaction removal (#10780/#10781) is the highest-impact user-facing regression.

## 6. Feature Requests & Roadmap Signals

- **[#8289 OIDC milestone](https://github.com/zeroclaw-labs/zeroclaw/issues/8289)** — *In active delivery.* Stages 2–6 are represented by the open PR stack (#10248, #10255, #10259, #10263, #10265, #10268, #10270, #10274, #10275, #10321). High confidence this lands in the next release once the stack merges.
- **[#9809 — support multiple models per provider profile](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)** — Adds `[providers.models.<family>.<alias>.models.<model_alias>]`. Size XL, needs author action. Likely next-release candidate.
- **[#10640 — passive Telegram group context](https://github.com/zeroclaw-labs/zeroclaw/pull/10640)** — Opt-in `passive_group_context`, default `false`. Pairs naturally with #5514 (media batching). Likely next minor.
- **[#9109 — native Hailo-Ollama support](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)** — Opt-in typed provider. Marked `do-not-merge`, so this likely defers.
- **[#9713 — token accounting on history-trim events](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)** — Addresses #9619; `tokens_before`/`tokens_after` exposure. Marked `do-not-merge` and `blocked`.
- **[#9967 — harness evaluation framework](https://github.com/zeroclaw-labs/zeroclaw/issues/9967)** — Roadmap tracker; benchmark pinning + per-turn instrumentation. Strategic, longer horizon.
- **[#10781 — remove or implement inert config keys](https://github.com/zeroclaw-labs/zeroclaw/issues/10781)** — `context_compression.*`, `history_pruning.keep_recent`, `collapse_tool_results`, `keep_tool_context_turns`. Either-or cleanup; expected in next release.
- **[#10780 — restore proactive token-budget compaction](https://github.com/zeroclaw-labs/zeroclaw/issues/10780)** — Highest-impact missing feature; almost certainly next-release if accepted.
- **[#10214 — entry-count rotation + multi-segment log queries](https://github.com/zeroclaw-labs/zeroclaw/pull/10214)** — New `log_persistence_max_entries_per_segment` config. Size XL, needs author action.

**Prediction for next minor (likely v0.8.6 or v0.9.0):** OIDC stack landing, passive Telegram group context, Telegram media batching (#5514), `service logs` cross-platform fix (#10732), inert-config cleanup (#10781), and a partial Anthropic cache-prefix fix.

## 7. User Feedback Summary

- **Telegram users** are the loudest cohort: media-group batching (#5514, 8 comments) is a recurring friction point and #10640's passive group context is a direct response.
- **Long-session ACP/ZeroCode users** are hitting latency walls: #9092 (keystroke lag), #10785 (notification-lag mass cancellation), #10788 (lost history on failure). Indicates the renderer and turn-cancel paths need separate attention.
- **Provider/cache-prefix pain** dominates engineering discussion: #10701, #10777, #10778, #10786 all describe real cost/quota impact for Anthropic users. The fact that the same root cause is being filed repeatedly signals insufficient user-side workaround.
- **Inert config keys** (#10780/#10781) generate user frustration because users reasonably expect documented config to take effect. This is a documentation-trust issue as much as a code issue.
- **Windows support** is uneven: stack overflow (#10734/#10753), `service logs` empty output (#10731/#10732), and the publish-exception path mismatch (#10676) all surface in the same 48h window.
- **Positive signal:** the OIDC stack (#8289) shows sustained, multi-PR execution by a single principal contributor (`JordanTheJet`) with explicit design ratification, suggesting strong architectural momentum.

## 8. Backlog Watch

Items needing explicit maintainer attention — either stale, blocked, or carrying risk without a clear owner:

- **[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — Maintainer decision queue itself. Until this is processed, downstream RFCs (#10549) and design acceptances stall. **Owner: maintainers collectively.**
- **[#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)** — RFC voting simplification. Needs `needs-maintainer-review` disposition.
- **[#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)** — Hailo-Ollama, marked `do-not-merge`, open since 2026-07-17 (~2 months). Needs a merge/defer decision.
- **[#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)** — Token accounting on trim events, `blocked` + `do-not-merge` since 2026-08-03. Awaiting unblock.
- **[#9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635)** — `fix(config): resolve git subcommand past global options` — `needs-author-action`, risk:high, security:policy, since 2026-08-01.
- **[#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337)** — `fix(tools): honor allowed roots for git operations` — `needs-author-action`, risk:high, security:policy.
- **[#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736)** — Pre-output stream failure skipping fallback, `in-progress` but no linked PR.
- **[#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787)** — `provider_retries` ignored on 529, just opened today but is the practical counterpart to #10736.
- **[#9521](https://github.com/zeroclaw-labs/zeroclaw/issues/9521)** — Map MCP `image` content into vision pipeline, `blocked` since 2026-07-28.
- **[#10754](https://github.com/zeroclaw-labs/zeroclaw/issues/10754)** — Memory authorship/transport classification, `needs-maintainer-review`, security-relevant, opened yesterday.
- **[#10777](https://github.com/zeroclaw-labs/zeroclaw/issues/10777)** / **[#10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778)** — Anthropic cache-prefix invalidation cluster, `needs-maintainer-review`. Highest user-cost impact in the open set.
- **[#10214](https://github.com/zeroclaw-labs/zeroclaw/pull/10214)** — Log rotation, `needs-author-action`, open since 2026-08-21.
- **[#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)** — Multi-model provider profile, `needs-author-action`, size XL, open since 2026-08-07.
- **[#9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746)** — Per-agent ownership scoping for session tools + `discord_search`, `needs-maintainer-review`, security domain, open since 2026-08-04.

**Common thread:** the security/auth track is healthy and moving; the Anthropic cache-prefix cluster and the context-compaction regression are the two areas where the next release most needs decisive maintainer input to avoid a 0.8.5 → 0.8.6 churn pattern.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*