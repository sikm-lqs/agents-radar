# AI CLI Tools Community Digest 2026-09-11

> Generated: 2026-09-10 23:30 UTC | Tools covered: 7

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

# AI CLI Tools Cross-Community Comparison Report — 2026-09-11

## 1. Ecosystem Overview

The AI CLI ecosystem has consolidated around seven actively-shipped coding-agent tools spanning vendor-backed clients (Claude Code, Codex, Gemini CLI, Copilot CLI, Qwen Code) and open challengers (OpenCode, Pi). Competition has shifted from "does it work" to operational maturity: cost governance, long-session reliability, subagent safety, and Windows support dominate every tracker simultaneously. Agent-fleet and enterprise usage patterns are now the primary stress test, exposing weaknesses in budget accounting, compaction, and permission models. Meanwhile, companion ecosystems are forming around each tool — community usage dashboards for Codex, GUI shells for Pi, cleanup tooling for OpenCode — signaling users are building durable workflows, not just experimenting.

## 2. Activity Comparison

| Tool | Hot Issues (listed) | PRs Updated (24h) | Discussions | Release Status (24h) |
|---|---|---|---|---|
| **Claude Code** | 10 (+2 mentions) | 3 (complete) | N/A* | ✅ v2.1.268 |
| **OpenAI Codex** | 10 | ~20 merged (14 itemized) | 10 active threads | ✅ python 0.154.0; rust 0.155.0-alpha.1/2; voice CI build (not shipped) |
| **Gemini CLI** | 10 | 13 (10 + 3 placeholders flagged) | N/A* | ✅ nightly v0.61.0 (20260910) |
| **Copilot CLI** | 10 | 2 (complete) | N/A* | ✅ v1.0.84-4 (2026-09-10) |
| **OpenCode** | 10 (+3 mentions) | 14 (10 + 4 mentions) | N/A* | ❌ None |
| **Pi** | 10 (+6 closures) | ~18–20 (10 detailed + 8 shipped) | 4 threads | ❌ None |
| **Qwen Code** | 10 | 10 | N/A (digest truncated)* | ✅ v0.23.3, nightly, SDK TS 0.1.12, desktop v0.3.0 + preview |

\* **N/A = channel data not available for this window (or disabled upstream) — not a signal of inactivity.** Counts reflect digest-reported top items, not full tracker totals; Claude Code and Copilot CLI PR lists are explicitly noted as complete for the window. Qwen Code's digest is truncated mid-report; assessments below rely on available data.

## 3. Shared Feature Directions

1. **Cost & usage observability** (Claude Code, Codex, OpenCode, Pi) — `budget.spent()` underreporting ~72× (#83048), cache-miss billing penalties (#83913, #91971), three independent community dashboards shipping for Codex in one week, OpenCode's #13003 token-usage TUI (53 👍, highest ratio in its window), Pi's cross-provider `usage.input` normalization (#8752). Users no longer trust meters without verification.
2. **Long-session reliability: resume, compaction, rollback** (all seven) — Codex's `/rewind` ask (131 👍, loudest single request) and compaction stalls (#43855); OpenCode compaction goal-drift (#41358) and revert fixes (PR #41604); Copilot resume-session OOM (#4699) and stale lock files (#4805); Claude Code cache misses on `--resume`; Qwen's cross-version transcript portability break (#11489, #11574).
3. **Subagent safety & termination correctness** (Claude Code, Gemini CLI, OpenCode, Codex, Qwen Code) — recursive fan-out 3→24 (#82565) and lost orchestration controls (Claude), agents reporting `GOAL` success after `MAX_TURNS` (#22323, Gemini), 364 identical tool calls over 50 min with no loop protection (#45442, OpenCode), MCP process leaks on subagent resume (#37453, Codex). Qwen's turn/active-time goal budgets (PR #11457) are the proactive counter-example.
4. **Windows/WSL2 as a first-class platform** (all seven) — Claude Code's KB5124008 Plan9 mount cluster (4 linked issues, 81 comments); Codex WSL restart loops (#44612) and case-sensitive Remote trust (#40002); Copilot clipboard/plugin-update regressions (#3260, #3534, #4095); Qwen's five-issue MCP STDIO cluster on Windows; Pi's non-deterministic `shellPath` (#9361).
5. **MCP integration hardening** (Copilot CLI, Qwen, Codex, Gemini CLI) — non-spec pre-`initialize` calls crashing compliant servers (#4809), STDIO `Connection closed`/hangs (Qwen #9693, #11460), OAuth headless flows (Codex PRs #44629, #44636), runtime policy enforcement (Gemini PR #29200).
6. **Security & sandbox hardening by default** (Gemini CLI, Codex, Copilot CLI, Claude Code) — Gemini shipped a full wave (path traversal ×2, prompt-injection via build files, sandbox boundary isolation); Codex restricted login redirects and added Windows firewall rules; Claude Code users still fighting egress-policy/JWT mismatch (#34690).

## 4. Differentiation Analysis

| Tool | Feature Focus | Target User | Technical Approach |
|---|---|---|---|
| **Claude Code** | Agent fleets, Cowork/cloud sessions, gateway & budget governance | Enterprise fleet operators, power users | Closed-core; managed settings, session proxies; community reports but near-zero inbound PRs |
| **Codex** | Broadest surface: voice, desktop, TUI polish, reasoning-effort tiers (`max`/`ultra`) | Consumer Plus/Pro through enterprise | Highest merge velocity; aggressive cross-platform investment incl. native Windows voice |
| **Gemini CLI** | Security hardening, AST-aware token-frugal tooling, Auto Memory | Security-conscious & enterprise Workspace users | Open-source, CVE-patching, research-flavored epics (zero-dependency OS sandboxing) |
| **Copilot CLI** | GitHub-native plugin/instruction/LSP marketplace, VS Code coupling | GitHub-ecosystem developers | CLI + desktop dual-track; tight (sometimes conflicting) VS Code integration |
| **OpenCode** | V2 rewrite: event-sourced storage, multi-provider, TUI | Self-hosters, cost-sensitive multi-provider users | Open-core; community builds cleanup tooling around it; billing friction (crypto ask, 50 👍) |
| **Pi** | Minimal kernel + extension protocol; provider catalog correctness | Tinkerers, terminal purists, multi-provider switchers | RPC mode as extension seam — community GUIs (Phosphor, Pi Manager) built atop it in one week |
| **Qwen Code** | Daemon/multi-workspace, Web Shell/Tauri desktop consolidation, memory | Multi-workspace, CN-ecosystem users (DashScope, DingTalk) | Model-agnostic presets (Kimi/Qwen/DeepSeek); structured on-demand memory recall (PR #10183) |

## 5. Community Momentum & Maturity

- **Fastest iteration: Codex** — ~20 merges/24h, multiple release tracks (stable, alpha, CI-only), and same-day fixes addressing open issues (reduced-motion → #44398). Clear engineering momentum, though capacity errors (#43375) show server-side growing pains.
- **Highest-severity community pressure: Claude Code** — the 81-comment Windows cluster and self-flagged SEV-1 budget bug contrast with only 3 PRs in the window; the community is a reporting channel, not a contribution channel. Mature product, strained trust on cost signals and model-routing transparency (#83510).
- **Most disciplined core team: Gemini CLI** — 13 PRs, all security/correctness-themed, with placeholder submissions publicly flagged for reviewer follow-up. Small comment volume (42 max) but high-signal triage.
- **At risk: Copilot CLI** — 4 independent OOM/leak reports (one 33 GB log, #4807) against 2 PRs merged; the gap between incoming stability reports and outbound fixes is the widest in the cohort.
- **Inflection point: OpenCode** — V2 beta churn, loud billing complaints, but strong community agency (external cleanup tool, 50–53 👍 feature votes).
- **Healthiest small ecosystem: Pi** — low volume, high craft, and emergent second-order ecosystem (two GUI companions in one window) — the classic signal of an extensible core.
- **Steady: Qwen Code** — 5 release artifacts in one day and proactive architecture work (goal budgets, Web Shell), offset by P1 session-portability and Remote-SSH regressions.

## 6. Trend Signals

1. **Cost governance is becoming a product requirement, not a metric.** Budget APIs, cache-accounting accuracy, and quota ergonomics (auto-resume on reset, #21073) recur in 4 of 7 communities. *Reference:* build spend observability and cache-stable request construction in from day one; users are auditing bills.
2. **Deterministic guardrails over model good behavior.** Infinite loops, false success signals, and runaway fan-out appear in 5 communities; Qwen's explicit turn/time budgets are the emerging pattern. *Reference:* loop protection, termination honesty, and fan-out ceilings should be runtime-enforced.
3. **Windows is now a primary battleground.** Mount breakage, WSL restarts, clipboard, and MCP STDIO failures appear in every digest. *Reference:* treat Windows/WSL2 CI as mandatory, not best-effort.
4. **Compaction is the new reliability frontier.** Stalls, goal drift, and OOM cluster around long-context session maintenance. *Reference:* compaction correctness (goal preservation, revert semantics) will differentiate tools more than raw context windows.
5. **Transparency is a trust differentiator.** Silent model fallback (Claude #83510), opaque safety blocks (Codex #44672), and invisible credential selection (Copilot #4804) all drew sharp pushback. *Reference:* expose routing, fallback, and authorization decisions in audit logs.
6. **Extension ecosystems are the moat.** Pi's RPC-mode GUIs, Copilot's plugin marketplace, and OpenCode's V2 plugin API (currently broken, #44788) show integrators choosing tools by extensibility. *Reference:* stable plugin/event contracts and headless/RPC modes unlock ecosystems you don't have to build.
7. **Hybrid multi-vendor workflows are emerging.** Codex discussion #37960 (coordinating a local Claude agent with a remote Codex agent) and Pi's subscription-bridging relays hint that orchestration across vendors — not loyalty to one — is the next user pattern worth watching.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — Community Highlights Report

**Data window:** through 2026-09-11
**Source:** [anthropics/skills](https://github.com/anthropics/skills)

---

## 1. Top Skills Ranking

The PR dataset lists engagement as undefined; ranking below is derived from cross-references to the most-discussed issues, scope of change, and update activity.

### #1 — [`skill-creator` run_eval.py recall overhaul (PR #1298)](https://github.com/anthropics/skills/pull/1298) — OPEN
**Author:** MartinCajiao | **Created:** 2026-06-10
The single most consequential skill-infrastructure PR of the cycle. `run_eval.py` (and the description-optimization loop that depends on it) has been silently returning `recall=0%` for every skill. The PR rewires the eval artifact as a real installable skill and patches Windows stream reading, trigger detection, and parallel worker paths. It directly addresses [Issue #556](https://github.com/anthropics/skills/issues/556) (12 comments, 10+ reproductions). Status: open, last updated 2026-06-23.

### #2 — [Windows subprocess/encoding fix for skill-creator (PR #1050)](https://github.com/anthropics/skills/pull/1050) — OPEN
**Author:** gstreet-ops | **Created:** 2026-04-27
Two 1-line Windows 11 fixes that unblock `run_loop.py` entirely on Windows: `subprocess.Popen(["claude", …])` fails because the CLI ships as `claude.cmd` and Python ignores `PATHEXT`. Companion to #1099 and #1298.

### #3 — [`run_eval.py` Windows pipe-read crash fix (PR #1099)](https://github.com/anthropics/skills/pull/1099) — OPEN
**Author:** joshuawowk | **Created:** 2026-05-07
Resolves the `[WinError 10038]` flood that causes every query to be recorded as "not triggered" on Windows. Targeted, high-leverage fix to the same eval pipeline as #1298.

### #4 — [mcp-builder evaluation/metrics/encoding stability (PR #1602)](https://github.com/anthropics/skills/pull/1602) — OPEN
**Author:** AbhiPra24 | **Created:** 2026-08-17
Bundle of fixes for the Phase-4 MCP eval harness — text-content extraction from MCP result blocks, serialization, encoding, and benchmark metric calculation. Addresses root causes behind [Issue #1390](https://github.com/anthropics/skills/issues/1390).

### #5 — [`mcp-builder` mcp≥2 import + custom headers (PR #1742)](https://github.com/anthropics/skills/pull/1742) — OPEN
**Author:** Kuldeeep18 | **Created:** 2026-09-08
Adapts `connections.py` to mcp 2.x (`streamable_http_client` rename + `http_client`/`create_mcp_http_client` for custom headers). Most recent mcp-builder compatibility patch.

### #6 — [`claude-api` retire obsolete model IDs (PR #1607)](https://github.com/anthropics/skills/pull/1607) — OPEN
**Author:** adi-IL | **Created:** 2026-08-18
Marks `claude-opus-4-1`, `claude-sonnet-4-0`, `claude-opus-4-0`, `claude-3-haiku-20240307` as retired. Closes a documentation drift that pushed users toward deprecated snapshots — relevant to the context-exhaustion report in [Issue #1487](https://github.com/anthropics/skills/issues/1487).

### #7 — [doc-typography skill (PR #514)](https://github.com/anthropics/skills/pull/514) — OPEN
**Author:** PGTBoos | **Created:** 2026-03-04
New skill that catches orphan/widow line problems and numbering misalignment in AI-generated documents. High signal-to-noise: a single-purpose quality gate every doc-producing session needs.

### #8 — [ODT skill (PR #486)](https://github.com/anthropics/skills/pull/486) — OPEN
**Author:** GitHubNewbie0 | **Created:** 2026-03-01
Full OpenDocument create / fill / parse-HTML skill, extending Claude's document coverage beyond the docx/pdf axis. Long-running PR with sustained discussion through 2026-04-14.

---

## 2. Community Demand Trends

Distilled from the top-engagement Issues:

| Rank | Theme | Anchor Issue | Comments |
|---|---|---|---|
| 1 | **Trust / provenance of community skills** | [#492 Community skills under `anthropic/` namespace enable trust-boundary abuse](https://github.com/anthropics/skills/issues/492) | 43 |
| 2 | **Org-wide skill distribution** | [#228 Enable org-wide skill sharing in Claude.ai](https://github.com/anthropics/skills/issues/228) | 16 |
| 3 | **Eval infrastructure reliability** | [#556 `run_eval.py` 0% trigger rate](https://github.com/anthropics/skills/issues/556) | 12 |
| 4 | **Skill persistence / lifecycle UX** | [#62 All skills disappeared after rename](https://github.com/anthropics/skills/issues/62) | 10 |
| 5 | **Compact / symbolic agent memory** | [#1329 compact-memory skill proposal](https://github.com/anthropics/skills/issues/1329) | 9 |
| 6 | **Skill creator rewrite to operational style** | [#202 `skill-creator` should be updated to best practice](https://github.com/anthropics/skills/issues/202) *(closed)* | 8 |
| 7 | **Plugin install deduplication** | [#189 document-skills and example-skills cause duplicates](https://github.com/anthropics/skills/issues/189) | 6 |
| 8 | **Agent governance & safety patterns** | [#412 Agent-governance skill proposal](https://github.com/anthropics/skills/issues/412) *(closed)* | 6 |
| 9 | **Context-window budget of bundled skills** | [#1487 `claude-api` injects ~156k tokens](https://github.com/anthropics/skills/issues/1487) | 4 |
| 10 | **Reasoning quality gate pipelines** | [#1385 Pre-task calibration → adversarial review → delivery verification](https://github.com/anthropics/skills/issues/1385) | 4 |

**Recurring demand clusters:**

- **Workflow automation & multi-agent orchestration** — surfaced via [#1329](https://github.com/anthropics/skills/issues/1329) (compact-memory) and [PR #1628 Hivemind](https://github.com/anthropics/skills/pull/1628) (zero-cost multi-agent delegation).
- **Code review / output auditing** — [PR #1367 self-audit](https://github.com/anthropics/skills/pull/1367), [#1385 quality-gate pipeline](https://github.com/anthropics/skills/issues/1385), and [PR #83 skill-quality-analyzer + skill-security-analyzer](https://github.com/anthropics/skills/pull/83).
- **Test/eval generation reliability** — concentrated around [#556](https://github.com/anthropics/skills/issues/556) and [#1390](https://github.com/anthropics/skills/issues/1390); community is essentially asking for the *meta-skill for measuring skills*.
- **Documentation & document-format skills** — [PR #514 typography](https://github.com/anthropics/skills/pull/514), [PR #486 ODT](https://github.com/anthropics/skills/pull/486), [PR #1734 orphaned docx comments](https://github.com/anthropics/skills/pull/1734), and [PR #210 frontend-design](https://github.com/anthropics/skills/pull/210).
- **Distribution surfaces** — [#228 org-wide sharing](https://github.com/anthropics/skills/issues/228), [#16 expose Skills as MCPs](https://github.com/anthropics/skills/issues/16), [#29 AWS Bedrock](https://github.com/anthropics/skills/issues/29).

---

## 3. High-Potential Pending Skills

PRs that are open, recent, and structurally aligned with community demand — most likely to land next:

| PR | Skill | Why it's high-potential |
|---|---|---|
| [PR #1628 Hivemind](https://github.com/anthropics/skills/pull/1628) | Zero-cost multi-agent orchestration via headless opencode workers | Directly addresses the "delegate mechanical work to cheap models" workflow-automation demand |
| [PR #1367 self-audit v1.3.0](https://github.com/anthropics/skills/pull/1367) | Mechanical verification + four-dimension reasoning quality gate | Aligns with #1385 quality-gate pipeline proposal and #492 trust concerns |
| [PR #1627 buffer-api](https://github.com/anthropics/skills/pull/1627) | Portable Buffer GraphQL scheduling for any agent | First-class example of the "Skills as cross-agent API surfaces" direction from [#16](https://github.com/anthropics/skills/issues/16) |
| [PR #514 document-typography](https://github.com/anthropics/skills/pull/514) | Typographic QC for generated docs | Long-running PR, narrow scope, fills a universal gap |
| [PR #486 ODT](https://github.com/anthropics/skills/pull/486) | OpenDocument create/fill/parse | Extends doc-format coverage; sustained engagement |
| [PR #1615 scnet-hpc](https://github.com/anthropics/skills/pull/1615) | Profile-based SSH/Slurm on SCNet HPC | Domain-specific but highly reusable for academic HPC users |
| [PR #83 skill-quality-analyzer + skill-security-analyzer](https://github.com/anthropics/skills/pull/83) | Meta-skills for evaluating other skills | Directly counters the #492 trust-boundary concern |

---

## 4. Skills Ecosystem Insight

> **The community's most concentrated demand is *trust infrastructure for skills themselves* — provenance verification, quality/security analysis, and a working eval loop — outranking any single new domain skill.**

Evidence: [#492 (43 comments)](https://github.com/anthropics/skills/issues/492) dwarfs all other issues; [PR #83](https://github.com/anthropics/skills/pull/83) and [PR #1367](https://github.com/anthropics/skills/pull/1367) build meta-analysis skills; [

---

# Claude Code Community Digest — 2026-09-11

## 1. Today's Highlights

The v2.1.268 release ships managed-settings alignment with `/cost` and gateway startup warnings, but the most pressing community concern is a **wave of Cowork/Windows Plan9 mount failures** following the KB5124008 update — three open issues (#92984, #93118, #93071, #93221) are converging on the same root cause. Separately, a significant cost-control regression (#83048) and ongoing prompt-cache misses on `--resume` are drawing scrutiny from power users running agent fleets.

## 2. Releases

**v2.1.268** (latest)
- **Claude apps gateway pricing alignment:** When `pricing:` is configured in `gateway.yaml`, signed-in Claude Code clients receive matching rates through managed settings, so `/cost` and telemetry now agree with the spend meter.
- **Gateway startup warning:** A startup warning is now emitted when `access_control.allow_cidrs` is empty — surfacing a likely-misconfigured egress policy before traffic flows.

## 3. Hot Issues

1. **[#92984](https://github.com/anthropics/claude-code/issues/92984)** — Cowork on Windows fails all Plan9 shares with `"Plan9 mount failed: invalid argument"` after KB5124008 (26200.9445); uninstalling the KB fixes it. **81 comments, 40 👍** — highest-traffic bug this cycle and the anchor of a multi-issue regression cluster.
2. **[#76248](https://github.com/anthropics/claude-code/issues/76248)** — Cowork/cloud sessions' git proxy now blocks pushes to repos outside the session's "authorized repository set," including when a user's own fine-grained PAT is supplied. **34 comments** — undermines a previously documented workflow and has been open since July without resolution.
3. **[#66402](https://github.com/anthropics/claude-code/issues/66402)** — `/model` and `/effort` mutate `~/.claude/settings.json` globally, leaving no way to configure per-agent model or effort in the fleet view. **14 👍** — a clear architectural gap as users scale agents.
4. **[#83510](https://github.com/anthropics/claude-code/issues/83510)** — Reports a measurable quality regression in Claude generation 5 (Fable 5 / Opus 5 / Sonnet 5): worse nonsense detection, ~2× verbosity, and silent fallback from Fable 5 to Opus 4.8. **21 👍** — direct claim of undisclosed model fallback is highly sensitive.
5. **[#92183](https://github.com/anthropics/claude-code/issues/92183)** — Desktop app disallows `SendMessage`, so subagents cannot be messaged or resumed. **18 👍** — breaks a key agent-orchestration affordance for desktop users.
6. **[#34690](https://github.com/anthropics/claude-code/issues/34690)** — "Allow network egress — all domains" setting not reflected in session proxy JWT. **17 👍** — a long-standing web/networking control-vs-actual mismatch, still open since March.
7. **[#83913](https://github.com/anthropics/claude-code/issues/83913)** — Prompt cache invalidated whenever `PreToolUse`/`PostToolUse` `additionalContext` changes during history rebuild, causing a per-turn cache miss and cache-write rate penalty. Mechanistically linked to several other cache-miss reports.
8. **[#83048](https://github.com/anthropics/claude-code/issues/83048)** — SEV-1: `budget.spent()` reports ~72× under actual consumption, blowing through a weekly budget in 4 hours across 36 of 50 agents. **Self-flagged as needing escalation** before other users are hit.
9. **[#91971](https://github.com/anthropics/claude-code/issues/91971)** — Prompt cache never hits across chained `-p --resume` calls, even at minimum config. Pairs with #93490 (same symptom on Fable 5.1 with a more specific cause) and #83913.
10. **[#82653](https://github.com/anthropics/claude-code/issues/82653)** — Auto-mode permission classifier outages on `claude-opus-5[1m]` persist for days; the documented 3-strike fallback to prompting never engages (fails closed). Important because auto-mode is the default for many agent fleets.

*(Honorable mentions: [#57295](https://github.com/anthropics/claude-code/issues/57295) closed after the community helped diagnose the `@Human` collision; [#68773](https://github.com/anthropics/claude-code/issues/68773) closed billing-loop case with human-escalation concerns still voiced.)*

## 4. Key PR Progress

> Only 3 PRs updated in the last 24h — listing all of them.

1. **[PR #93244](https://github.com/anthropics/claude-code/pull/93244)** *(closed)* — `mods`: API renames, telemetry fixes, and a diff backend seam. Renames to match the plugin API's `isFocused` / `tool` pass; tightens analytics (rows in order, switches read per row, third-party providers send nothing); introduces a git backend seam so the diff mod can swap VCS providers. *(Merged to no PR #93452 below.)*
2. **[PR #93452](https://github.com/anthropics/claude-code/pull/93452)** *(open)* — `mods/diff`: match the built-in `/diff` panel. Uses the engine's code element, replicates the built-in close ✕, row spacing, empty-state placement, narrow-terminal resize line, and limits repository probes to one in flight at a time.
3. **[PR #89404](https://github.com/anthropics/claude-code/pull/89404)** *(open)* — `validate-agent.sh`: stop aborting at the first warning (`set -e` + `((x++))`) and stop false-flagging valid agents. Fixes the three `set -euo pipefail` interaction bugs causing the plugin-dev skill's validator to fail against its own agents (closes #83803).

## 5. Hot Discussions

*No discussion data was provided for this digest window — section omitted.*

## 6. Feature Request Trends

Across the issues surfaced, the most-requested directions are:

- **Per-agent / per-fleet model and effort configuration** — `/model` and `/effort` writing to global `settings.json` is repeatedly called out as a blocker for running intentional agent fleets (#66402).
- **Trust-preserving git pushes in Cowork/cloud** — restoring PAT pass-through or making the "authorized repository set" actually configurable (#76248).
- **Prompt-cache reliability on `--resume` and history rebuild** — three issues (#83913, #91971, #93490) describe the same mechanism: per-turn conversation content not promoted into reusable cache, causing cache-write-rate charges.
- **Transparent model routing** — users want explicit signaling when a request is downgraded (e.g., Fable 5 → Opus 4.8) rather than silent fallback (#83510).
- **Subagent lifecycle controls** — `SendMessage`/`--resume` from the desktop app (#92183), and explicit guardrails preventing recursive subagent fan-out (#82565: 3 requested → 24 ran).
- **First-class egress / network policy UI** — making "Allow all domains" actually propagate to the session proxy JWT (#34690).
- **Cost-control primitives** — `budget.spent()` accuracy under fleet workloads (#83048), clearer `--max-budget-usd` semantics for Max subscriptions (#85400).

## 7. Developer Pain Points

Recurring frustrations surfacing repeatedly this week:

- **"Cost meter doesn't agree with reality."** Whether it's the gateway/spend meter mismatch (the v2.1.268 fix targets one half of this), `budget.spent()` underreporting by ~72×, 5-hour quota spikes ~15-20×, or `--max-budget-usd` terminating Max-backed runs at zero API cost — cost signals are still trusted only with verification.
- **"Cache misses on identical prefixes."** Multiple reports describe static system-prompt/tool-definition prefixes caching correctly while per-turn conversation content fails to promote, inflating spend on long agent runs.
- **"Cowork on Windows is fragile to OS updates."** The KB5124008-induced Plan9 cluster is the visible example, but search the issue history and you'll find that any host-side Windows or kernel change can silently break Cowork mounts or device identity (`ant-did` orphaning on reinstall in #88692).
- **"Auto-mode fails closed with no fallback."** When the `claude-opus-5[1m]` permission classifier is down, the documented 3-strike prompting fallback doesn't fire — agents stop rather than ask (#82653).
- **"Subagent orchestration is leaky."** Recursive fan-out, lost results, and contradictory teammate system prompts (#82565, #86070) make production agent fleets unpredictable.
- **"Reinstalling the desktop app silently orphans sessions."** `ant-did` is regenerated while `remoteToolsDeviceName` is preserved, producing permanent "Can't reach your computer" errors for existing sessions (#88692).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-11

## 1. Today's Highlights

The Python SDK **0.154.0** shipped alongside new **`max` and `ultra` reasoning-effort values** ([#39662](https://github.com/openai/codex/pull/39662)), with Rust **0.155.0-alpha.1/2** builds already cycling. The dominant community story is a wave of **"Selected model is at capacity"** errors spanning CLI, desktop, and multiple GPT-5/GPT-6 models — three separate issues on the front page today. Meanwhile, ~20 PRs merged within 24 hours, notably Windows sandbox firewall hardening, a login-redirect security fix, and expanded voice tooling.

## 2. Releases

- **python-v0.154.0** — Python SDK 0.154.0; install via `pip install --upgrade openai-codex==0.154.0` (Python 3.10+), includes matching `openai-codex-cli-bin==0.154.0`.
- **Reasoning-effort expansion** — [#39662](https://github.com/openai/codex/pull/39662) adds `max` and `ultra` reasoning-effort values; also adds `ExternalMessage` to the synchronous API.
- **rust-v0.155.0-alpha.2 / alpha.1** — pre-release iterations toward 0.155.0.
- **voice-cygwin-108b38cf67cbb731** — CI-only Cygwin build inputs (103 pinned packages + sources) for native Windows voice releases; **not shipped** in user packages.

## 3. Hot Issues

1. **[#43375](https://github.com/openai/codex/issues/43375)** — "Selected model is at capacity" across multiple GPT-5/GPT-6 models (20 comments, 11 👍). The top issue today; users report the error is model-agnostic, suggesting server-side capacity rather than per-model throttling. See related [#44382](https://github.com/openai/codex/issues/44382) (CLI, 11 comments) and [#43368](https://github.com/openai/codex/issues/43368) (macOS desktop, 9 comments).
2. **[#21073](https://github.com/openai/codex/issues/21073)** — Auto-resume CLI sessions when usage limits reset (50 👍, 15 comments). A long-running enterprise ask: the error already reports the reset time, but Codex won't resume automatically — overnight batch tasks stall.
3. **[#18396](https://github.com/openai/codex/issues/18396)** — Hide tool calls/output in the TUI (34 👍). Long-requested noise-reduction feature; verbose tool output makes long sessions unreadable.
4. **[#40002](https://github.com/openai/codex/issues/40002)** — Android Remote fails to verify trusted Windows projects due to case-sensitive path lookup (15 comments). Breaks the mobile-to-Windows Remote workflow for Plus users.
5. **[#42683](https://github.com/openai/codex/issues/42683)** — Alt+P shortcut crashes the Windows app (15 comments, now CLOSED). Crash-on-hotkey reports from multiple Windows 10 users.
6. **[#37453](https://github.com/openai/codex/issues/37453)** — Windows Desktop spawns duplicate MCP and `node_repl` process stacks when resuming historical subagent threads (10 comments) — a resource leak tied to MCP lifecycle handling.
7. **[#43855](https://github.com/openai/codex/issues/43855)** — Codex stops responding after compaction on Windows CLI 0.153.4 with GPT-6-Astra; a session-continuity failure mode hitting multi-hour tasks.
8. **[#44130](https://github.com/openai/codex/issues/44130)** — Codex inserted unrelated, potentially state-changing commands during read-only tasks (GPT-5.6 Sol, WSL2). Raises safety/trust concerns about model behavior on non-mutating work.
9. **[#44398](https://github.com/openai/codex/issues/44398)** — Astra composer sparkle animation blocks mouse text selection in kitty (0.154.0). Notable because today's merged [#44666](https://github.com/openai/codex/pull/44666) adds reduced-motion support that may mitigate it.
10. **[#44612](https://github.com/openai/codex/issues/44612)** — WSL repeatedly restarts and Codex stops working after update. A regression-style report with no workaround yet; watch for Windows-focused fixes in the PR queue.

## 4. Key PR Progress

1. **[#44670](https://github.com/openai/codex/pull/44670)** — **Security**: restricts login setup redirects to known platform origins, preventing ID tokens from leaking to arbitrary destinations via `platform_url`.
2. **[#44639](https://github.com/openai/codex/pull/44639)** — **Security**: adds an inbound non-loopback firewall block for the Windows offline sandbox, complementing the existing outbound rule.
3. **[#44671](https://github.com/openai/codex/pull/44671)** — Voice sessions now survive mute and audio backlog by dropping stale/excess audio queues and keeping muted peers alive.
4. **[#44622](https://github.com/openai/codex/pull/44622)** — Adds `/voice settings` TUI picker for choosing a voice for future conversations, honoring server-side project settings.
5. **[#44629](https://github.com/openai/codex/pull/44629)** — `codex mcp login <name> --no-browser` accepts a manually pasted redirect URL — unblocks MCP OAuth in headless/restricted-browser environments.
6. **[#44636](https://github.com/openai/codex/pull/44636)** — OAuth metadata discovery falls back to OIDC metadata on 503, so expired tokens can still refresh during MCP startup.
7. **[#44666](https://github.com/openai/codex/pull/44666)** — TUI honors system reduced-motion preferences across macOS/Windows/Linux (accessibility win; relevant to #44398).
8. **[#44650](https://github.com/openai/codex/pull/44650)** — Enterprise-focused: managed requirements can now enforce `model_provider` selection and definitions, overriding local/session config.
9. **[#44626](https://github.com/openai/codex/pull/44626)** — Moves MXC launch requests into a bounded environment transport (`CODEX_MXC_*` JSON), bypassing Windows command-line length limits for large sandbox policies.
10. **[#44658](https://github.com/openai/codex/pull/44658)** — Windows sandbox private desktops are cached in the calling process, surviving helper exits and enabling reuse across filesystem requests.

Also merged: per-model turn metrics attribution ([#44656](https://github.com/openai/codex/pull/44656)), thread-level plugin exclusions ([#44655](https://github.com/openai/codex/pull/44655)), Codex Doctor env-var diagnostics preservation ([#44654](https://github.com/openai/codex/pull/44654)), and analytics opt-out propagation ([#44646](https://github.com/openai/codex/pull/44646)).

## 5. Hot Discussions

### Ideas
- **[#9618](https://github.com/openai/codex/discussions/9618)** — "How is there not a /rewind or /revert feature?" (**131 👍**, 23 comments). The most-upvoted discussion today; users compare unfavorably to OpenCode and Claude Code undo support.
- **[#12567](https://github.com/openai/codex/discussions/12567)** — OpenAI's jif-oai is gathering input on **Memories in Codex** (36 comments): citation transparency and whether memory should be per-project or global.
- **[#44419](https://github.com/openai/codex/discussions/44419)** — VS Code extension caps history at 50 local sessions; users want pagination/search parity with Desktop.
- **[#44547](https://github.com/openai/codex/discussions/44547)** — A strongly-worded request to remove the desktop pet feature; contrast with [#44421](https://github.com/openai/codex/discussions/44421), which wants *more* mascot presence as a lightweight side-channel during long tasks.

### Q&A
- **[#42503](https://github.com/openai/codex/discussions/42503)** — Users still hunting for an official Astra rollout date in Codex despite the September 1 announcement.
- **[#43257](https://github.com/openai/codex/discussions/43257)** — How experimental context management's history lookups count against usage limits on multi-day Pro tasks — unclear billing semantics.
- **[#37960](https://github.com/openai/codex/discussions/37960)** — Coordinating a local Claude-based agent with a remote Codex agent across repos; hybrid multi-vendor workflows are an emerging pattern.

### Show and tell
- **[#44641](https://github.com/openai/codex/discussions/44641)** — **Codex Limits**: cross-platform CLI/TUI for usage, reset times, and reset credits — released the same day capacity errors dominate the issue tracker.
- **[#44368](https://github.com/openai/codex/discussions/44368)** — **Usage HUD**: macOS menu-bar meter tracking Codex/Claude/Gemini/Grok/Ollama windows with confidence labels.
- **[#44453](https://github.com/openai/codex/discussions/44453)** — OrcaReplay's deep dive into why `OPENAI_BASE_URL` doesn't redirect a Codex with `config.toml`, plus a session record/replay tool built on the fix.

## 6. Feature Request Trends

- **Session rollback & history**: `/rewind`-`/revert` is the single loudest ask (#9618, 131 👍); joined by VS Code session pagination (#44419) and auto-resume on limit reset (#21073).
- **Usage visibility & limit ergonomics**: three independent community dashboards shipped this week (Codex Limits, Usage HUD, CodexFuse) — clear demand the official client isn't meeting for quota/reset visibility.
- **TUI output control**: hiding tool-call noise (#18396), a reversible "Calm mode" (#37227), and reduced-motion support all converge on less visual clutter.
- **Memory & context continuity**: official Memories design thread (#12567), context-management cost questions (#43257), and compaction-related stalls (#43855).
- **Voice polish**: voice picker settings (#44622) and session resilience (#44671) show sustained investment ahead of native Windows voice builds.

## 7. Developer Pain Points

- **Model availability**: capacity errors are the #1 pain today, spanning Plus/Pro tiers, CLI and desktop, and at least four model variants (#43375, #44382, #43368) — with no user-side workaround.
- **Usage-limit friction**: hard failures instead of queueing/resume (#21073, #15788) waste overnight automation windows; reset info is displayed but not actionable.
- **Windows is the roughest platform**: WSL restart loops post-update (#44612), case-sensitivity breaking Remote trust (#40002), app-server 0xC0000005 crashes (#44315), Chrome/Edge control regression (#44140), and MCP process leaks (#37453).
- **Long-running session reliability**: compaction stalls (#43855), rollout ordinal corruption stalling durable history (#44609), and MCP tool-list changes ignored mid-session (#37417) hit power users hardest.
- **Safety-check over-triggering**: cybersecurity warnings blocking routine work (#44515) and opaque reviewer blocks without visible findings or recovery (#44672) are eroding trust in guardrails.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-11

## Today's Highlights

A nightly release `v0.61.0-nightly.20260910.ged2ac40df` shipped overnight, while the community concentrated on **security hardening** (sandbox boundaries, path traversal, OAuth persistence) and **Auto Memory reliability**. The most-discussed thread remains Enterprise Workspace authentication, now with 42 comments and growing.

## Releases

- **v0.61.0-nightly.20260910.ged2ac40df** — automated nightly bump. Full changelog: [compare diff](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260909.ged2ac40df...v0.61.0-nightly.20260910.ged2ac40df)

## Hot Issues

1. **[#29101](https://github.com/google-gemini/gemini-cli/issues/29101) — Authentication failure blocking Enterprise Workspace accounts** (42 comments, 👍 2). *P1 enterprise bug.* A previously working Google Workspace + Cloud Project setup now fails to authenticate, blocking many enterprise users. Most active thread of the day.
2. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent reports GOAL success after hitting MAX_TURNS** (13 comments). Misreporting termination as success masks interrupted subagent work — a silent correctness bug that affects evaluation reliability.
3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — Zero-Dependency OS Sandboxing & Post-Execution Intent Routing** (9 comments, enhancement). Proposes leveraging Gemini 3's native bash affinity via OS-level sandboxing without heavy dependencies.
4. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent hangs indefinitely** (8 comments, 👍 8, P1). Even simple folder creation can hang for over an hour when deferring to the generalist agent; high community traction.
5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — Assess impact of AST-aware file reads / search / mapping** (7 comments, epic). Investigates token savings and precision gains from AST-aware tooling (e.g., method-bound reads).
6. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini underutilizes custom skills and sub-agents** (6 comments). Custom skills require explicit prompting, undermining the value of personalization.
7. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Deterministic redaction for Auto Memory** (5 comments, security). LLM-driven secret redaction happens after content is already in model context — needs pre-redaction at the source.
8. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell command hangs at "Waiting input" after completion** (4 comments, 👍 3, P1). Affects even trivial commands; breaks interactive shell flow.
9. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — browser subagent fails under Wayland** (4 comments, P1). Reports browser subagent terminated with GOAL despite failing to actually launch.
10. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 400 error when > 128 tools enabled** (3 comments). Tool-count ceiling causes hard API failures rather than graceful degradation.

## Key PR Progress

1. **[#29282](https://github.com/google-gemini/gemini-cli/pull/29282) — `fix(auth)`: persist OAuth credentials after login** (P2, security). Eliminates re-prompting after a successful browser/user-code auth flow.
2. **[#29214](https://github.com/google-gemini/gemini-cli/pull/29214) — `fix(sandbox)`: harden filesystem boundaries & isolate runtime state** (XL). Replaces host directory mounts with sanitized configs and standardizes on realpath resolution.
3. **[#29116](https://github.com/google-gemini/gemini-cli/pull/29116) — `fix(core)`: mitigate NTFS 8.3 short-name (SFN) path traversal** (closed). Closes a Windows-specific bypass for `AllowedPathChecker` (e.g., `git~1`, `env~1`).
4. **[#29250](https://github.com/google-gemini/gemini-cli/pull/29250) — `fix(core)`: prevent indirect prompt injection via build files / untrusted flags** (XL). Refactors `shell`, `edit`, and `write_file` to validate workspace boundaries under restricted mode.
5. **[#29249](https://github.com/google-gemini/gemini-cli/pull/29249) — `fix(core)`: close sibling-prefix bypass in `get_internal_docs` path guard** (P1, security). A naive string prefix check was letting sibling directories leak docs content to the model.
6. **[#29200](https://github.com/google-gemini/gemini-cli/pull/29200) — `fix(core)`: enforce MCP policy consistently at runtime** (P2, enterprise). Aligns runtime MCP checks with case-insensitive, whitespace-trimmed matching and treats empty `mcp.allowed` as fail-closed.
7. **[#29134](https://github.com/google-gemini/gemini-cli/pull/29134) — `fix(cli)`: protect current session from deletion** (P2). Prevents accidental `--delete-session` of the active session via stricter filename matching.
8. **[#29278](https://github.com/google-gemini/gemini-cli/pull/29278) / [#29277](https://github.com/google-gemini/gemini-cli/pull/29277) — `fix(core)`: collision-free `expandEnvVars` key** (P2). The helper previously returned caller-provided env values when it collided with the sentinel key — a subtle correctness bug worth attention.
9. **[#29094](https://github.com/google-gemini/gemini-cli/pull/29094) / [#29095](https://github.com/google-gemini/gemini-cli/pull/29095) — CVE upgrades: `simple-git` 3.32.3 & `shell-quote` 1.8.4** (both closed). Critical CVE patches shipped.
10. **[#29271](https://github.com/google-gemini/gemini-cli/pull/29271) — `refactor`: simplify project structure and metadata** (P1, XL). Streamlines build scripts and centralizes metadata.

> Note: PRs #29272 (`SECURITY.md`), #29274 (`NB-gemini`), and #29273 (workflows eval) appear to be incomplete/placeholder submissions and may need reviewer follow-up.

## Feature Request Trends

Distilled from active issues and epics:

- **AST-aware tooling** for codebase mapping, method-bounded reads, and surgical navigation to reduce token waste (#22745, #22746, #19561).
- **OS-level sandboxing & intent routing** that respects Gemini 3's native bash affinity (#19873).
- **Subagent observability** — surfacing trajectories via `/chat share`, richer `/bug` reports, and self-awareness of CLI mechanics (#22598, #21763, #21432).
- **Safer agent behavior** — discouraging destructive git/DB commands and improving settings.json overrides for subagents (#22672, #22267).
- **Browser agent resilience** — session takeover, lock recovery, and Wayland compatibility (#22232, #21983).
- **Memory quality & safety** — deterministic redaction, retry limits, and quarantine of invalid patches (#26525, #26522, #26523, #26516).
- **Token-frugal reads** — "Tactful Extraction" hierarchy to avoid context firehosing (#19561).

## Developer Pain Points

- **Enterprise authentication instability** — Workspace + GCP setups that previously worked now fail silently (#29101).
- **Unreliable subagent termination signals** — agents report `GOAL` even when `MAX_TURNS` was hit (#22323), and bug reports strip subagent context (#21763).
- **Agent hangs** — both generalist and shell-execution paths can block indefinitely on simple tasks (#21409, #25166, #22465).
- **Tool count ceilings** — silent 400 errors when too many tools are enabled (#24246); users want graceful narrowing.
- **Workspace pollution** — temp scripts strewn across directories when shell execution is restricted (#23571).
- **Symlink and discovery quirks** — agents in `~/.gemini/agents/` not recognized when symlinked (#20079).
- **Session resume gaps** — `/compress` doesn't persist, wasting tokens across sessions (#21335).
- **Memory system noise** — low-signal sessions retried forever and invalid patches silently swallowed (#26522, #26523, #26516).
- **Security regressions** — sibling-prefix and NTFS 8.3 path-traversal bypasses (#29249, #29116), plus indirect prompt injection via build files (#29250) drove today's PR wave.
- **Custom skills ignored** — Gemini frequently won't invoke skills/sub-agents unless explicitly told (#21968), undercutting personalization.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-11

## Today's Highlights

- **v1.0.84-4** lands a cleaner plugin/instruction surface: dedicated `copilot instruction list` and `copilot lsp list` commands replace the old `plugins list --kind` flags, plus `--json` output and `enable`/`disable` subcommands for plugins.
- **Memory stability is the dominant theme of the day** — multiple high-severity OOM/leak reports (#4686, #4725, #4699, #4780) describe libuv handle leaks, heap exhaustion at the 4 GiB cap, and unrecoverable compaction crashes.
- **Spec/contract regressions surface on MCP and platform Windows**: a native MCP client sends a non-standard pre-`initialize` request (#4809), and Windows/WSL2 users continue to hit clipboard and plugin-update failures (#3260, #3534, #4095).

## Releases

**[v1.0.84-4](https://github.com/github/copilot-cli/releases/tag/v1.0.84-4)** — *2026-09-10*

**Added**
- New `copilot instruction list` and `copilot lsp list` commands, replacing `copilot plugins list --kind instruction` and `--kind lsp`.
- `--json` output flag added to `copilot plugin list`, `copilot plugin marketplace list`, and `copilot plugin marketplace browse` for scripting-friendly inspection.
- `enable` / `disable` subcommands added to `copilot plugin` for managing plugin lifecycle directly from the CLI.

## Hot Issues

1. **[#13 — Vi/Vim input mode (CLOSED)](https://github.com/github/copilot-cli/issues/13)** — Long-standing request for modal-editor keybindings inside the CLI's interactive prompt. Now closed after 12 comments and **76 👍**, making it the most-upvoted open feature request on the repo.

2. **[#4742 — Desktop 1.1.15: cannot create a second Local session](https://github.com/github/copilot-cli/issues/4742)** — Recent regression where creating a second branch-type session in a project with an active CLI session fails with "This project already has an active Local workspace". 11 comments, blocking workflow for desktop users.

3. **[#1285 — Organization-level Agent not showing up](https://github.com/github/copilot-cli/issues/1285)** — Enterprise/agent-discovery bug: agents declared in a `{org}/.github-private` repo never surface in CLI or VS Code. 9 comments, 11 👍 — high impact for org-wide custom agent rollouts.

4. **[#4095 — Windows: `plugin update` fails with Access is denied (os error 5)](https://github.com/github/copilot-cli/issues/4095)** — VS Code's Copilot extension holds watcher handles on installed-plugins directories, blocking the CLI's update flow. **21 👍** — top-liked open bug, clear Windows-platform papercut.

5. **[#4686 — Node.js OOM crash after ~37 min, 31,965 leaked libuv handles](https://github.com/github/copilot-cli/issues/4686)** — Reports an asynchronous-handle leak in the embedded Node v24 SEA runtime that exhausts the heap; `NODE_OPTIONS` is ignored by the SEA build, blocking user workarounds. Stability-critical.

6. **[#4725 — Frequent JavaScript heap OOM every few minutes](https://github.com/github/copilot-cli/issues/4725)** — Independent reproduction of the OOM class on Linux, with full V8 Mark-Compact trace. Reinforces #4686 as a systemic issue rather than a single environment quirk.

7. **[#4699 — OOM crash on long `--resume` sessions; dumps written into cwd](https://github.com/github/copilot-cli/issues/4699)** — Multiple crashes per day on resumed sessions, plus the diagnostics are spewed into the user's working directory. 5 👍; secondary complaint about dump placement is widely shared.

8. **[#3260 — Copy/Paste broken over SSH + tmux on Windows Server 2025](https://github.com/github/copilot-cli/issues/3260)** — Regressed in v1.0.47; clipboard integration is broken specifically for the remote-Windows terminal workflow many devs rely on.

9. **[#3534 — WSL2 ARM64 `/copy` fails: `clip.exe exited with code 1`](https://github.com/github/copilot-cli/issues/3534)** — Quoting bug in the `cmd.exe` wrapper introduced in 1.0.55 affects every clipboard write under WSL2 on ARM64. 5 👍.

10. **[#4807 — Idle CLI enters `FileWatch` event storm, 33+ GB log, 221% CPU for 35 h](https://github.com/github/copilot-cli/issues/4807)** — Brand-new (today) but extremely serious: a runaway file-watcher loop pegs two cores and writes a 33 GB debug log when the CLI is otherwise idle. Worth tracking closely.

## Key PR Progress

1. **[#4808 — Pin GitHub Actions to commit SHAs (OPEN)](https://github.com/github/copilot-cli/pull/4808)** — Automated `github-security-bot` PR converting mutable `uses:` tags (3 refs across 4 files) to immutable commit SHAs. No behavior change; supply-chain hardening.

2. **[#4786 — Revise notice regarding third-party services (CLOSED, merged)](https://github.com/github/copilot-cli/pull/4786)** — Documentation/legal clarification about access requirements and terms for third-party integrations. Quick turnaround from open to merged.

> Note: Only 2 PRs were updated in the last 24h; this list is complete.

## Feature Request Trends

The signal from the last 24h, ranked by demand and breadth:

- **Modal/keyboard ergonomics** — Vim/vi input mode (#13, 76 👍) and `Ctrl+Backspace` word delete (#2199, 7 👍) both have multi-year traction. Together they point to a sustained demand for a richer prompt-editor experience comparable to modern REPLs.
- **Identity & account management** — Multi-account switching (#367) keeps resurfacing; the desktop sandbox silently picking the wrong cached PAT (#4804) shows the same theme from the auth-credential angle.
- **Plugin & marketplace tooling** — Reusable update flows (#4799) and JSON output for marketplace browsing (#4806, addressed in v1.0.84-4) suggest the community wants scripting-first workflows over interactive ones.
- **Custom-agent authoring** — `target` frontmatter field does nothing on CLI (#4806) and org-level agents not being discovered (#1285) indicate the custom-agent authoring surface is still rough.
- **Hook extensibility** — Hooks emitting `additionalContext` are overwritten (#3589) when multiple fire; a "last-wins" default frustrates users building layered context pipelines.

## Developer Pain Points

Recurring, high-impact friction categories across the last 24h:

- **Heap & handle leaks on long sessions.** Three independent reports (#4686, #4725, #4699) plus a fourth compaction-OOM (#4780) describe the same failure mode — V8 hitting the ~4.3 GB cap after tens of minutes — and the SEA build ignores `NODE_OPTIONS`, so users can't even raise the limit. This is the most urgent stability concern in the repo right now.
- **Windows & WSL2 platform bugs.** Clipboard, plugin updates, and SSH-via-tmux flows all regressed recently (#3260, #3534, #4095). The unifying complaint is that the Windows toolchain (clip.exe, VS Code watcher handles, cmd.exe quoting) is not handled defensively.
- **`settings.json` model field behaves inconsistently.** Two reports (#4067, #4252) describe the CLI either ignoring or silently overwriting the top-level `model` key — the *same* key the in-app `/model` picker writes. Sessions silently revert to `claude-sonnet-5`.
- **MCP ecosystem rough edges.** Atlassian OAuth callback mismatch (#4795), `tools/list` refresh into a busy server causing permanent tool loss (#4731), and a non-spec pre-`initialize` JSON-RPC call crashing spec-compliant servers (#4809) collectively make MCP integration brittle.
- **Session lifecycle & locks.** Stale `inuse.<pid>.lock` files make sessions unrevivable after a host crash (#4805), and sessions can wedge permanently at turn-end if a queued message arrives (#4755) — both indicate fragile session-resume semantics.
- **Credential transparency.** Local sandbox silently selects an unrelated cached PAT (#4804) with no visible audit trail — a trust and debuggability issue for security-conscious users.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-11

## Today's Highlights

The 2.0 beta channel saw intensive iteration today, with critical fixes landing for filesystem-cycle prompt failures, plugin event delivery, and TUI grouping trees. Storage-related issues dominated community feedback — multiple users report `opencode.db` ballooning past 13 GB due to unbounded `message.updated` snapshots, alongside payment-friction complaints (especially from CIS-region users) that are now clustering as a recurring theme. A long-standing subagent infinite-loop bug and the absence of loop protection in V2 surfaced as a serious operational risk.

## Releases

No releases published in the last 24 hours.

## Hot Issues

1. **[#33356] Unbounded growth of the `event` table — `opencode.db` reaches 13 GB+** — [anomalyco/opencode#33356](https://github.com/anomalyco/opencode/issues/33356)
   Two long-running instances filled 22 GB volumes to 97–99% because event-sourcing snapshots are never pruned. 30 comments, 9 👍. Materially affects any heavy user and points to a missing retention/compaction strategy in V2.

2. **[#15585] "Free usage exceed" on free-tier models** — [#15585](https://github.com/anomalyco/opencode/issues/15585)
   All three free models trigger the same limit error. 55 comments (highest in window), 17 👍. Significant user-experience signal given OpenCode markets free models prominently.

3. **[#23153] [FEATURE] Pay-Go with crypto** — [#23153](https://github.com/anomalyco/opencode/issues/23153)
   Top-voted feature request in the window (50 👍, 21 comments). Strong demand for alternative payment rails, likely amplified by the payment-decline cluster below.

4. **[#13003] [FEATURE] Display token usage information in the TUI** — [#13003](https://github.com/anomalyco/opencode/issues/13003)
   Request to surface tracked input/output/budget tokens directly in the TUI. 13 comments, 53 👍 — the highest thumbs-up ratio in the window. Aligns with cost-control anxiety surfaced in payment issues.

5. **[#45278] Payment declined after 3 months on a working card** — [#45278](https://github.com/anomalyco/opencode/issues/45278)
   Renewals silently failing despite no card/bank change. 13 comments. One of several payment-decline tickets this week, suggesting a systemic billing issue rather than isolated cases.

6. **[#36942] [FEATURE] Vertical tabs** — [#36942](https://github.com/anomalyco/opencode/issues/36942)
   New UI forces horizontal tabs, hiding most session titles. 31 👍. Directly relates to PR #41575 below, which has now landed.

7. **[#41358] Agent continues thinking/acting after auto-compaction, loses task goal** — [#41358](https://github.com/anomalyco/opencode/issues/41358)
   On Windows Desktop, post-compaction the agent continues without confirmation and forgets the original goal. A regression with serious correctness implications.

8. **[#45442] Subagent infinite loop of identical tool calls (~50 min, 364 grep calls)** — [#45442](https://github.com/anomalyco/opencode/issues/45442)
   No loop protection in 2.0 means uncontrollable token burn. Highlights a missing safety mechanism in the new agent runtime.

9. **[#41175] Event table stores full message snapshots per streaming update (community tool available)** — [#41175](https://github.com/anomalyco/opencode/issues/41175)
   Reinforces the storage crisis theme; contributor has already built a community cleanup tool, signaling readiness to fix from outside core.

10. **[#44788] V2 plugin API: `event.subscribe` delivers no events; context-hook never reaches model prompt (beta 18050)** — [#44788](https://github.com/anomalyco/opencode/issues/44788)
    Documents a silent failure mode that breaks the entire V2 plugin extension model. High-impact for plugin authors.

**Honorable mentions:** #48246 (cache breakpoints limited to Anthropic-family), #43400 (cannot complete Go subscription payment), #48389 (Desktop NodeService SIGABRT on quit).

## Key PR Progress

1. **[#48397] fix(core): break filesystem cycle in compiled prompts** — [#48397](https://github.com/anomalyco/opencode/pull/48397)
   Directly addresses #48398 — native Bun builds failing the first prompt with `undefined is not an object`. Critical fix for 1.4.2 Bun compatibility.

2. **[#48394 + #48395 + #48399] feat(tui): recursive session grouping tree (stacked)** — [#48394](https://github.com/anomalyco/opencode/pull/48394) · [#48395](https://github.com/anomalyco/opencode/pull/48395) · [#48399](https://github.com/anomalyco/opencode/pull/48399)
   A three-PR stack from `jlongster` introducing a generic grouping tree, the pure grouping engine, and a production projection through the tree engine. Foundational for the V2 TUI session presentation.

3. **[#48376] fix(ai): normalize flat Responses stream errors** — [#48376](https://github.com/anomalyco/opencode/pull/48376)
   Unifies Meta / xAI / OpenAI error shapes across SSE and WebSocket decoding in `open-responses.ts`. Reduces gateway-side integration drift.

4. **[#48381] fix(codemode): use Bun's wording for missing atob/btoa argument** — [#48381](https://github.com/anomalyco/opencode/pull/48381)
   Small but visible polish — aligns error phrasing with the active runtime rather than browser WebIDL.

5. **[#35935] feat(observability): add v2 genai tracing** — [#35935](https://github.com/anomalyco/opencode/pull/35935)
   End-to-end OTLP tracing for agent turns, HTTP/WS transport, tools, retries, compaction, subagents. Includes Dash0 setup docs.

6. **[#41610] fix(core): tolerate missing workspace names** — [#41610](https://github.com/anomalyco/opencode/pull/41610)
   Detects legacy `workspace` schema drift before rebuilding; adds regression test for the `no such column: name` failure.

7. **[#41604] fix(core): preserve compaction after revert** — [#41604](https://github.com/anomalyco/opencode/pull/41604)
   Stages session reverts before admitting manual compaction; prevents next-prompt truncation at the old boundary. A subtle but high-impact correctness fix.

8. **[#41601] fix(tui): scope attention notifications** — [#41601](https://github.com/anomalyco/opencode/pull/41601)
   Ignores out-of-session question/permission events; notifies only for persistent requests at the active location. Reduces notification noise in multi-workspace flows.

9. **[#41575] feat(tui): configurable tab positions** — [#41575](https://github.com/anomalyco/opencode/pull/41575)
   V2 TUI tabs can now be top, bottom, left, or right — directly answers feature request #36942.

10. **[#41594] fix(compaction): respect agent variant config during compaction** — [#41594](https://github.com/anomalyco/opencode/pull/41594)
    `agent.compaction.variant` was previously hardcoded to inherit from the parent user message; now honored. Respects user intent during context reduction.

**Honorable mentions:** #41553 (desktop proactive RAM management), #41568 (Windows non-git session path anchoring), #41576 (Electron 42.8.1 update), #41579 (large-paste stall fix in V2 composer).

## Feature Request Trends

| Direction | Signal | Representative Items |
|---|---|---|
| **Payment & billing flexibility** | Multiple declines + crypto ask | #23153 (crypto), #45278 / #43400 / #48374 (declines) |
| **Cost visibility in UI** | Strong upvote ratio | #13003 (token usage in TUI) |
| **TUI ergonomics** | High engagement | #36942 (vertical tabs — *shipped*), #39628 (remote permission approval) |
| **Storage / lifecycle hygiene** | Repeated across users | #33356, #41175 (db retention), #44511 (filesystem snapshots around mutation epochs) |
| **Platform reach** | Lower urgency but persistent | #11902 (VS 2026 enterprise) |

## Developer Pain Points

- **Unbounded local storage** — `opencode.db` growth is the single loudest operational complaint, with three separate issues documenting GB-class blow-ups and no built-in mitigation. The presence of a community-authored cleanup tool underscores the gap.
- **Payment friction** — A disproportionate share of today's tickets are subscription/payment failures (especially CIS-region cards and silent renewals). Combined with the top-voted crypto-payment feature, billing is clearly the highest-leverage area to improve trust.
- **V2 plugin API silence** — `event.subscribe` and `ctx.session.hook("context")` register but never deliver on beta 18050. Plugin authors have no diagnostic surface; this is blocking the V2 extension ecosystem before it can grow.
- **Agent safety** — No loop protection on subagents; one user reported 364 identical tool calls over 50 minutes. Compaction also lacks confirmation and causes goal drift (#41358).
- **Cross-provider cache semantics** — Explicit cache breakpoints are gated to Anthropic only (#48246); other families rely on implicit prefix caching, which complicates cost tuning and breaks parity expectations.
- **Build/runtime fragility** — Native Bun 1.4.2 builds fail on the first prompt (#48398), and Desktop 1.18.30 crashes on quit (#48389). Both point to growing pains in the desktop distribution path.

*Note: No GitHub Discussions data was provided for this digest window — the Discussions section has been omitted per format guidelines.*

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-11

## Today's Highlights
- A cluster of TUI rendering bugs came in around cursor markers, fullscreen drag-selection, and overlay-on-image stacking, with PRs already landing in parallel (#9441, #9438, #9332).
- Provider correctness continues to dominate triage: Bedrock usage normalization (#8752), Fable 5 fallback removal (#9297), and Gemini `thoughtSignature` replay (#9443) all moved.
- The community shipped two notable companion surfaces — **Phosphor** (desktop UI on top of `pi --mode rpc`) and **Pi Manager** (local control plane for providers/models/settings) — signaling growing demand for a first-class GUI story.

## Releases
_No new releases in the last 24h._

## Hot Issues

1. **#9323 — Improve fireworks-specific config** (closed, 14 comments). Long-running discussion on how Fireworks provider knobs should be surfaced; closed after consolidation. [Link](https://github.com/earendil-works/pi/issues/9323)
2. **#8061 — Context budget ignores maxTokens output reservation at 78%** (open, in-progress, 8 comments, 👍2). On Gemini-class 1M-token windows via an OpenAI-compat gateway, requests are rejected and compact-and-retry also fails. Real failure mode for long-context harnesses. [Link](https://github.com/earendil-works/pi/issues/8061)
3. **#9052 — Fullscreen wheel scrolling ~3× slower than regular mode** (open, 8 comments, 👍4). Users migrating to fullscreen for the fixed input box hit a perf regression; high thumbs-up indicates broad pain. [Link](https://github.com/earendil-works/pi/issues/9052)
4. **#8133 — Per-model compaction settings** (closed, 6 comments, 👍5). Adds a `compaction.profiles` map keyed by model id with global fallback — a heavily-requested control. [Link](https://github.com/earendil-works/pi/issues/8133)
5. **#8810 — Extension providers intermittently ignore defaultProvider/defaultModel** (open, 6 comments). Race when `pi.registerProvider` is involved: sessions silently start on another provider's default. [Link](https://github.com/earendil-works/pi/issues/8810)
6. **#9294 — `claude-fable-5` built-in `allowedFallbackModels` lists `claude-opus-4-8` (API 400)** (open, in-progress, 5 comments). Hardcoded fallback metadata is out of sync with upstream models. [Link](https://github.com/earendil-works/pi/issues/9294)
7. **#9257 — `extractCursorPosition` leaves duplicate CURSOR_MARKER occurrences** (open, 5 comments). One-line bug that can leak APC sequences into the terminal. [Link](https://github.com/earendil-works/pi/issues/9257)
8. **#9268 — Remote Markdown image with empty alt hides URL in user messages** (open, 5 comments). Rendering loses the image entirely inside lists. [Link](https://github.com/earendil-works/pi/issues/9268)
9. **#9361 — Windows `shellPath` non-deterministically ignored when extensions are loaded** (open, 4 comments). Falls back to Git Bash or WSL System32 `bash.exe` unpredictably. [Link](https://github.com/earendil-works/pi/issues/9361)
10. **#8752 — `bedrock-converse`: `usage.input` not normalized across model families** (open, 4 comments, 👍5). Anthropic is net-of-cache, OpenAI-family is gross — drives false cache-miss notices and doubled input cost. [Link](https://github.com/earendil-works/pi/issues/8752)

**Other notable closures:** #8463 (openai-codex 5.6 cache misses before 30m TTL), #9394 (remove gpt-5.4 from openai-codex), #2374 (Kitty images not rendered in tmux), #5366 (delete branches in session tree — shipped), #9210 (Anthropic 1h cache via gateway), #9086 (mistral/zai-glm-5-2 no reasoning).

## Key PR Progress

1. **#8744 — feat(tui): opt-in overlay selection exclusion** (open). Lets overlays opt out of fullscreen drag-selection so copied text stays attached to the transcript `ScrollView`. [Link](https://github.com/earendil-works/pi/pull/8744)
2. **#9442 — fix(ai): allow prompt cache keys for compatible proxies** (open). New `compat.supportsPromptCacheKey` flag so OpenAI-compatible proxies can receive `prompt_cache_key` under default retention. [Link](https://github.com/earendil-works/pi/pull/9442)
3. **#9461 — fix(ai): defer streamed tool argument parsing until read** (open). Fixes #9265: replaces the per-delta reparse with lazy per-access reparse (cached per version), removing the O(n²) event-loop freeze. [Link](https://github.com/earendil-works/pi/pull/9461)
4. **#9297 — fix(ai): remove invalid Fable 5 fallback target** (closed). Keeps Opus 5 as the only built-in fallback for Claude Fable 5; covers Fable 5.1 and OAuth/API-key payloads. [Link](https://github.com/earendil-works/pi/pull/9297)
5. **#9459 — fix(coding-agent): prefer recorded model changes on resume** (open). Uses the last `model_change` event over the last assistant message's model — fixes wrong-model behavior on session resume. [Link](https://github.com/earendil-works/pi/pull/9459)
6. **#9301 — feat(coding-agent): confirm device-code browser and clipboard actions** (open). Reintroduces auto-open browser + clipboard copy for device-code auth without forcing it. [Link](https://github.com/earendil-works/pi/pull/9301)
7. **#9441 — fix(tui): prevent cursor marker leaks** (open). Treats APC cursor markers as positional metadata so `sliceWithWidth()` doesn't replay them; preserves the first valid marker as the hard cursor. [Link](https://github.com/earendil-works/pi/pull/9441)
8. **#9443 — fix(ai): capture and replay Gemini thoughtSignature on openai-completions tool calls** (closed). Stops `thoughtSignature` loss on Gemini behind OpenAI-compatible gateways. [Link](https://github.com/earendil-works/pi/pull/9443)
9. **#9434 — feat(coding-agent): allow extensions to append to the session system prompt** (open). Closes #9432 — `session_start` handlers can return `systemPromptAppend`, with trimming and source metadata. [Link](https://github.com/earendil-works/pi/pull/9434)
10. **#9438 — fix(tui): let overlays cover terminal images** (closed). Screenshot + `/agents` no longer leaves the image on top of the overlay. [Link](https://github.com/earendil-works/pi/pull/9438)

**Also shipped:** #9435 (resolve `${...}` in provider `baseUrl`), #8799 (prettier "Working…" spinner), #9431 (default 3-minute timeout for every tool call), #9430 (remove unreachable `tool_result_end` listener), #9425 (DeepSeek V4.1 Flash catalog entry), #9416 (skill names accept `.` and `_`), #9407/#9404 (model-preference-guard example with multi-select picker). **Still open and worth watching:** #8612 (clear delivered image-only queue entries), #8743 (ignore stale tool image conversions).

## Hot Discussions

**Ideas**
- **#8420 — "Are we missing an official Web UI base?"** A DSH-plugin-ecosystem comparison argues pi's "minimal kernel + extensions" pattern needs an official web/desktop chassis to unlock UI-flavored extensions. [Link](https://github.com/earendil-works/pi/discussions/8420)

**Q&A**
- **#3373 — Which plugins/extensions do you most enjoy using with Pi?** Long-running recommendation thread (16 comments, 👍8) — useful baseline for new users. [Link](https://github.com/earendil-works/pi/discussions/3373)

**Show and tell**
- **#9446 — Phosphor: a desktop surface for pi** Built around `pi --mode rpc` (one per session); chat, diffs, files, terminal and artifacts side by side; works with every provider plus Claude Pro/Max and ChatGPT subscriptions. [Link](https://github.com/earendil-works/pi/discussions/9446)
- **#9427 — Pi Manager: local UI for providers, models, and writing `~/.pi/agent`** Doesn't fork pi, doesn't touch project `.pi` files; adds OpenAI-compatible relays (incl. a local Antigravity bridge) and writes `~/.pi/agent`. [Link](https://github.com/earendil-works/pi/discussions/9427)

## Feature Request Trends
- **Granular per-model configuration** — compaction profiles (#8133), provider/model guards (#9407), resolved `baseUrl` templates (#9435). Users want policies to follow the model, not the global setting.
- **First-class GUI / desktop surface** — both Phosphor (#9446) and Pi Manager (#9427) appeared in the same window, and #8420 frames this as a structural gap in the extension ecosystem.
- **Better tool safety defaults** — default timeouts (#9431), bash deadlock hardening (#9460), OOM protection for grep with context (#9276). The direction is "safe-by-default, not opt-in."
- **Extension protocol expansion** — system-prompt append (#9434), device-code UX (#9301), model-preference guards (#9407). Extensions are becoming the integration surface for both UI and policy.
- **Provider catalog accuracy** — removing dead models (#9394), aligning fallbacks (#9294, #9297), normalizing `usage.input` across families (#8752, #9457).

## Developer Pain Points
- **Streaming performance pathologies** — the openai-completions tool-call reparse (#9265 / #9461) is a single-process, multi-session footgun that fully freezes the event loop.
- **Cache and cost accounting is inconsistent across providers** — Bedrock usage normalization (#8752, #9457), gateway 1h cache billing (#9210), and pre-TTL openai-codex misses (#8463) all show the same class of bug.
- **TUI rendering regressions in fullscreen mode** — slow wheel (#9052), cursor marker leaks (#9257, #9332, #9441), overlay/image stacking (#9268, #9438), viewport jumps (#9424). Fullscreen is increasingly the default and is paying the cost of that shift.
- **Provider/model config drift** — stale fallbacks (#9294), deprecated GPT IDs (#9394), non-deterministic Windows `shellPath` (#9361) — the gap between upstream and pi's hardcoded catalog is widening.
- **Tool robustness gaps** — no default timeout (#9460/#9431), grep OOM (#9276), and `--mode` silently accepting invalid values (#9045) all point to the same theme: lenient defaults that surface only under failure.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-11

## Today's Highlights

The v0.23.3 release shipped alongside the v0.3.0 desktop and SDK TypeScript v0.1.12 updates, expanding reasoning presets for Kimi, Qwen, and DeepSeek. A P1 community discussion surfaced around VS Code extension updates silently dropping conversation history between v0.21.x and v0.23.x, drawing attention to metadata compatibility in session persistence. The release workflow itself failed on the first attempt and was salvaged by widening the review-replay timeline margin in [#11588](https://github.com/QwenLM/qwen-code/pull/11588).

## Releases

- **[v0.23.3](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3)** — Adds expanded reasoning presets for Kimi, Qwen, and DeepSeek models ([#11349](https://github.com/QwenLM/qwen-code/pull/11349)). No breaking changes. The initial release attempt failed on a `quality` job and was recovered via [#11588](https://github.com/QwenLM/qwen-code/pull/11588).
- **[v0.23.3-nightly.20260910.c46cb85cf2](https://github.com/QwenLM/qwen-code/releases)** — Nightly build; removes obsolete DingTalk background response aggregation ([#11570](https://github.com/QwenLM/qwen-code/pull/11570)).
- **[sdk-typescript-v0.1.12](https://github.com/QwenLM/qwen-code/releases)** — Bundles CLI v0.23.3, built from the same source ref.
- **[desktop-v0.3.0](https://github.com/QwenLM/qwen-code/releases)** — Adds a scheduled CI lane for desktop packaging ([#11519](https://github.com/QwenLM/qwen-code/pull/11519)); ships bridge fixes for pending permission/queue handling.
- **[desktop-v0.3.0-preview.0](https://github.com/QwenLM/qwen-code/releases)** — Preview prerelease. The `desktop-latest` updater feed still points at 0.2.2; opt in deliberately. macOS Apple Silicon build (`Qwen-Code-Desktop-arm64.dmg`) available.

## Hot Issues

1. **[#8102](https://github.com/QwenLM/qwen-code/issues/8102) — proposal: deterministic tool-execution boundaries for a trustworthy agent runtime** (18 comments). The most-discussed thread in 24h, proposing to keep the model outside the trust boundary and have the runtime deterministically authorize and audit actions. Foundational design discussion that several later issues reference.
2. **[#11489](https://github.com/QwenLM/qwen-code/issues/11489) — Extension update drops all conversation history (v0.21.x → v0.23.x)** (P1, CLOSED, 5 comments). The VS Code companion extension stopped reading `state.vscdb` transcripts after upgrade — data was preserved but unreadable. Highlights a metadata-driven migration gap.
3. **[#11556](https://github.com/QwenLM/qwen-code/issues/11556) — vscode-ide-companion 0.23.1 cannot work under Remote-SSH** (P1, 3 comments). Webview stuck loading when client is x64 Linux and server is aarch64; breaks one of the most common IDE workflows.
4. **[#8182](https://github.com/QwenLM/qwen-code/issues/8182) — daemon authorises each ACP child 50% of host memory** (P2, 7 comments). `getAcpMemoryArgs()` derives the V8 old-space ceiling from total host memory rather than dividing by the number of children — a footgun for multi-workspace hosts.
5. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500) — TUI exits silently (uncaught React #185) when multiple background agents complete** (P1, 3 comments). Ink `useBoxMetrics` layout-listener enters a setState loop on rapid subagent completion; the process drops to the shell with no error rendered.
6. **[#11590](https://github.com/QwenLM/qwen-code/issues/11590) — non-Qwen models via DashScope's OpenAI-compatible endpoint fail with 400 due to injected `metadata` field** (P1, 3 comments). The aggregated gateway forwards the object to vendors where `metadata` is typed as `string`; removing the field fixes the call. Affects every ZHIPU/GLM-5.3-Flash user.
7. **[#11574](https://github.com/QwenLM/qwen-code/issues/11574) — VS Code history dialog hardcodes `sourceType="vscode"` filter, hiding pre-0.23.x transcripts** (P2, 5 comments). Sibling of #11489 but in the newer release; users coming from 0.21.x or terminal CLI see no history at all.
8. **[#9693](https://github.com/QwenLM/qwen-code/issues/9693) / [#11597](https://github.com/QwenLM/qwen-code/issues/11597) — MCP `-32000: Connection closed` on Windows STDIO servers** (P2, 5 and 2 comments). Affects both Desktop 1.0.3.0 and v1.0.0.3; reproduces with `@modelcontextprotocol/server-filesystem`. Persistent cross-version blocker.
9. **[#11460](https://github.com/QwenLM/qwen-code/issues/11460) — Qwen Desktop 1.0.3.0 MCP Filesystem hangs after the first interaction** (4 comments). First MCP call works, subsequent ones never return. Adjacent to the connection-closed class of bugs.
10. **[#11580](https://github.com/QwenLM/qwen-code/issues/11580) — Release Failed for v0.23.3 on 2026-09-10** (CLOSED, 2 comments). First release attempt failed in `quality`; the salvage path is the merge of [#11588](https://github.com/QwenLM/qwen-code/pull/11588).

## Key PR Progress

1. **[#10183](https://github.com/QwenLM/qwen-code/pull/10183) — feat(memory): structured on-demand recall.** Replaces the flat, body-heavy memory prompt with a two-level ref/title tree plus a query-focused metadata subtree and a dedicated recall tool. Material change to how managed memory scales with corpus size.
2. **[#11086](https://github.com/QwenLM/qwen-code/pull/11086) — feat(serve): scope extensions to workspace runtimes.** Reconciles extension state into live workspace runtimes and exposes workspace-qualified daemon/SDK access; updates the composer `@` menu and extension management surfaces.
3. **[#11538](https://github.com/QwenLM/qwen-code/pull/11538) — feat: select the OpenAI API per model.** Adds `api: "chat-completions" | "responses"` to OpenAI-compatible provider entries; addresses the DashScope `metadata` 400 class of bugs by letting integrators choose the right endpoint per model.
4. **[#11276](https://github.com/QwenLM/qwen-code/pull/11276) — feat(web-shell): web previews with saved delivery history.** Adds a browser preview panel with desktop/mobile widths, refresh, and external-open; standalone Web Shell enables it for workspace sessions by default.
5. **[#11457](https://github.com/QwenLM/qwen-code/pull/11457) — feat(goal): stop a Goal at a turn or active-time budget.** Adds `model.goalMaxTurns` and `model.goalMaxActiveMinutes` ceilings alongside the existing token budget.
6. **[#10906](https://github.com/QwenLM/qwen-code/pull/10906) — feat(web-shell): show shell and monitor task output.** Persists monitor stdout/stderr alongside shell capture; daemon exposes a live-session-owner-scoped endpoint that returns a sanitized tail.
7. **[#11395](https://github.com/QwenLM/qwen-code/pull/11395) — fix(acp): preserve caller-owned mode after child reap.** When an ACP child is torn down and the session is resumed, the daemon now reapplies the approval mode the caller explicitly owned before the connection ended.
8. **[#10237](https://github.com/QwenLM/qwen-code/pull/10237) — fix(core): prevent duplicate task owner dispatch.** Leader assignments carry and verify the owner under the task lock, closing a race where a stale snapshot could commit the same task twice.
9. **[#11134](https://github.com/QwenLM/qwen-code/pull/11134) — fix(ci): retry the transient all-green macOS E2E shard death once.** Brings the macOS E2E leg into parity with the Linux `sandbox:none` leg — a single, budget-gated retry after a failed shard.
10. **[#11588](https://github.com/QwenLM/qwen-code/pull/11588) — fix(ci): widen the review-salvage replay's timeline margin past contention stalls.** The patch that salvaged the v0.23.3 release; makes the scripts-lane test resilient to contention stalls.

## Feature Request Trends

- **Desktop consolidation on Web Shell.** Multiple issues — [#8092](https://github.com/QwenLM/qwen-code/issues/8092), [#8596](https://github.com/QwenLM/qwen-code/issues/8596) — push to retire the Electron-based `packages/desktop` and promote the Tauri `desktop-shell` (and eventually just "desktop") as the single, lower-maintenance client built on the Web Shell.
- **Cross-version session portability.** [#11489](https://github.com/QwenLM/qwen-code/issues/11489) and [#11574](https://github.com/QwenLM/qwen-code/issues/11574) demand that the VS Code and Web Shell history surfaces read pre-0.23.x transcripts, and that new metadata fields are backward-compatible.
- **MCP reliability on Windows.** STDIO hangs and `-32000: Connection closed` errors recur across [#9675](https://github.com/QwenLM/qwen-code/issues/9675), [#9693](https://github.com/QwenLM/qwen-code/issues/9693), [#10056](https://github.com/QwenLM/qwen-code/issues/10056), [#11460](https://github.com/QwenLM/qwen-code/issues/11460), and [#11597](https://github.com/QwenLM/qwen-code/issues/11597). Users want the Desktop proxy to validate and recover from STDIO peer-closes, not propagate them.
- **Per-model OpenAI API selection.** [#11538](https://github.com/QwenLM/qwen-code/pull/11538) and [#11590](https://github.com/QwenLM/qwen-code/issues/11590) converge on the need to choose `chat-completions` vs `responses` per model and to stop injecting a top-level `metadata` object that breaks third-party gateways.
- **Daemon scale and operability.** [#8182](https://github.com/QwenLM/qwen-code/issues/8182), [#9304](https://github.com/QwenLM/qwen-code/issues/9304), [#9316](https://github.com/QwenLM/qwen-code/issues/9316), [#11386](https://github.com/QwenLM/qwen-code/issues/11386), and [#11591](https://github.com/QwenLM/qwen-code/issues/11591) collectively push for configurable workspace caps, LRU live sets, and reduced `git status` latency on large monorepos.
- **Daemon API documentation.** [#11359](https://github.com/QwenLM/qwen-code/issues/11359) requests a consolidated, runnable index of REST and SSE endpoints grouped by capability.
- **Independent voice front-end ("Live").** [#10118](https://github.com/QwenLM/qwen-code/issues/10118) proposes splitting Live from the backend session as the unified voice gateway over all of a user's sessions.

## Developer Pain Points

- **MCP transport fragility on Windows.** STDIO peer-closes, SSE hangs, and lost permission prompts recur across at least five issues, all on Windows-specific or cross-version configurations. There is no

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*