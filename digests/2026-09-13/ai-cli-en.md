# AI CLI Tools Community Digest 2026-09-13

> Generated: 2026-09-12 23:30 UTC | Tools covered: 7

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

# AI CLI Tools Cross-Comparison Report — 2026-09-13

## 1. Ecosystem Overview

The AI CLI ecosystem has decisively moved past single-session coding assistance toward **persistent, multi-agent orchestration** — subagent delegation, background tasks, and remote/headless execution now dominate every tracker. Two archetypes have crystallized: **first-party vendor tools** (Claude Code, Codex, Gemini CLI, Copilot CLI, Qwen Code) bundled with model subscriptions, and **provider-agnostic clients** (OpenCode, Pi) competing on extensibility and multi-vendor access. Convergent investment is visible in three areas: sandboxed/pluggable execution environments, quota/cost transparency, and programmatic surfaces (RPC/ACP/app-server) that turn CLIs into embeddable services. Notably, users now cross-shop vendors openly — Codex's #45013 and Claude Code's #93894 each cite the competitor's pricing model as the benchmark — meaning switching costs are falling.

## 2. Activity Comparison

| Tool | Issues (24h) | PRs (24h) | Discussions (24h) | Release Status |
|---|---|---|---|---|
| **Claude Code** | 10 hot (+8 ClAudit cluster) | 3 | N/A* | ✅ v2.1.270 (regression patch) |
| **OpenAI Codex** | 10 | 18 (15+ merged) | 6 | — none |
| **Gemini CLI** | 10 | 14 | N/A* | ✅ v0.61.0-nightly (security-focused) |
| **Copilot CLI** | 8 | 3 | N/A* | — none |
| **OpenCode** | 10 | 9 | N/A* | — none |
| **Pi** | 10 (12 closed) | 8 (7 substantive) | 3 | — none |
| **Qwen Code** | 10 (+8 notable) | 22 (10 key + 12 moving) | N/A* | ✅ v0.23.3-nightly |

\* *No Discussions data in the source feed — marked N/A, not inferred as inactive. Counts reflect digest-surfaced activity, not full tracker volume. Codex and Qwen Code show the highest merged-PR throughput; Pi shows the highest triage closure rate (12 issues closed in 24h).*

## 3. Shared Feature Directions

1. **Subagent orchestration reliability & observability** — the single most universal gap.
   - Gemini CLI: indefinite hangs (#21409), false-success on MAX_TURNS (#22323), under-invocation of configured agents (#21968)
   - Qwen Code: stale todo plans during delegation (#10953); container execution for subagents (#11711)
   - OpenCode: subagent IDs invisible to models (#36761); errors masked as success (#38866)
   - Copilot CLI: subagent tool-call bursts break prompt caching (#4829)

2. **Quota/cost transparency** — a response to sustained user revolt.
   - Codex: token/USD display in command center (#44970), accurate history token estimation (#45094) — both direct responses to #41220 (40 comments)
   - Claude Code: Fable 5.1 budget blowouts (#93894), token-consumption regressions (#84750)
   - Copilot CLI: OTel emission of per-phase model/verdict/credit (#4825)
   - Qwen Code: prompt-cache preservation for deferred tools (#10410)

3. **Sandboxed / pluggable execution environments.**
   - Qwen Code's #11695 umbrella (local/container/SSH backends, #11711/#11746) is the most ambitious; Gemini CLI shipped a sandbox rewrite isolating runtime state (#29214) and maps `--yolo` to a uniform policy engine (#29287); Codex is hardening deny-rule handling (#43929)

4. **Programmatic/headless surfaces (RPC, ACP, app-server).**
   - Pi's `--mode rpc` is now the backbone of third-party projects (#9525); Qwen Code proposes an Android thin client over `qwen serve` via ACP (#11704); Codex is refining app-server task lifecycle (#44969, #45124, #25383); Gemini CLI has an open ACP session-ID interop blocker with Zed (#29288)

5. **MCP correctness** — Gemini CLI (#29200, #29205), Qwen Code (#7771, #11499, #11718, #10834), Copilot CLI (#4759), OpenCode (53 duplicate MCP process spawns, #43845).

6. **Terminal/TUI robustness** — silent exits and rendering bugs recur everywhere: Qwen's React #185 crash (#11500/#11732), Gemini's flicker and stuck-shell bugs (#29294, #25166), Pi's fullscreen scroll regression (#9052), Claude Code's OSC 8 statusline regression (#70161).

## 4. Differentiation Analysis

| Tool | Center of Gravity | Distinguishing Signal |
|---|---|---|
| Claude Code | Enterprise/cloud sessions (Cowork), desktop | Only tool with chronic **safety-filter over-firing** (ClAudit cluster) and a `--worktree`/FleetView fleet story; auth-token leakage (#79427) is a unique CI/multi-account risk |
| Codex | Managed multi-surface consumer product | Highest feature velocity; converging surfaces (CLI/desktop/iPad) via app-server; controversial **Pets UI** removal request is the top-upvoted item (48👍, #34349) |
| Gemini CLI | Security & policy architecture | Only tracker where **prompt-injection hardening** (#29250) and policy-engine unification lead the release; strategic AST-aware tooling epics (#22745) target token efficiency |
| Copilot CLI | Multi-model routing harness | Model-agnostic by design — issues cite `claude-opus-5` and Gemini 3.8 Flash; differentiates on observability (OTel) and protocol correctness, not model access |
| OpenCode | Provider-agnostic desktop/TUI | BYOK focus (NVIDIA, DeepSeek, local providers); the **clipboard failure class** (131-comment #4283) remains its defining liability |
| Pi | Extensibility-first client | Adding **subscription-backed OAuth providers** (Meta Muse #9096, Google Antigravity & Cursor Pro #9529) — aggregating consumer subscriptions as model access; session-tree forking ergonomics |
| Qwen Code | Execution-environment separation | Most architecturally bold move of the cycle: decoupling agent harness from execution (#11695) with container/SSH backends; also carries the most serious **telemetry privacy defect** (#11198) |

## 5. Community Momentum & Maturity

- **Volume leaders (mature, high-noise):** Claude Code and Codex. Claude Code's #80444 (111 comments) and Codex's #41220 (40 comments) show large, vocal user bases — but also chronic unresolved platform/pain issues lasting months.
- **Fastest iteration:** Codex (15+ merged PRs/day) and Qwen Code (22 moving PRs) are shipping architecture-level changes weekly; Gemini CLI's nightly cadence delivers security hardening at production quality.
- **Small but exceptionally responsive:** Pi — 12 issues closed in 24h, maintainer-tagged `[inprogress]` items, and third parties building products on its RPC surface.
- **Under-resourced relative to user base:** OpenCode — a 131-comment, 123-upvote clipboard bug still open signals a deep cross-platform technical problem or a resourcing gap.
- **Quietest tracker:** Copilot CLI — triage-stage activity and Dependabot-dominated PRs; feature requests (#4830, #4825) are sensible but pace is clearly slower than peers.

## 6. Trend Signals

1. **Cost attribution is becoming table stakes.** Every vendor is building token/cost surfacing (Codex #44970, Copilot #4825, Qwen #10410) under user pressure. For teams: budget monitoring should move from vendor dashboards into your own OTel pipeline now.
2. **The agent harness is separating from the execution environment.** Qwen's container/SSH backends, Gemini's sandbox rewrite, and Codex's sandbox hardening all point one direction: tool calls will run in isolated, addressable runtimes. Design automation assuming isolation, not shared process state.
3. **CLIs are becoming services.** RPC (Pi), ACP (Qwen, Gemini/Zed), and app-server (Codex) surfaces mean headless integration is the growth edge — but each has lifecycle bugs (Gemini #29288, Codex #45131). Treat async/headless flows as early-stage.
4. **Subscription aggregation is emerging.** Pi adding Meta/Cursor/Google OAuth providers signals a future where clients route over consumer subscriptions, not just API keys — a pricing-disruption vector to watch.
5. **Status fields lie; silent failure is the dominant failure class.** False success (Gemini #22323, OpenCode #38866), stuck "Working" states (Pi #4945, Codex #44781, Copilot #4824), and misreported usage limits (Claude #77469) mean downstream automation must verify outcomes independently, never trust agent self-report.
6. **Windows is the weakest platform across all seven tools** (Claude #80444, Codex's regression cluster, OpenCode #35258, Pi #9262, Qwen #11724). For Windows-first teams, Linux/WSL-local-native mismatches remain a real selection criterion.
7. **Security scrutiny is shifting to the tools themselves:** prompt injection (Gemini #29250), telemetry leaks (Qwen #11198), auth-token inheritance (Claude #79427), and Actions supply-chain pinning (Copilot #4808). Vendor CLI telemetry defaults warrant an audit before enterprise deployment.

**Bottom line:** Codex and Qwen Code are iterating fastest; Gemini CLI leads on security architecture; Claude Code owns the enterprise surface but carries the heaviest legacy-bug load; Pi and OpenCode prove the multi-provider client niche is viable — Pi on extensibility, OpenCode despite its clipboard debt. For evaluators, the differentiators in 2026 are quota transparency, execution isolation, and programmatic surface maturity — not raw model access.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
*Data as of 2026-09-13*

---

## 1. Top Skills Ranking (Most-Watched PRs)

**Note:** The provided PR list shows "Comments: undefined" for all entries, so ranking is based on signal density (recency, multiple updates, and linkage to high-traffic Issues). All listed PRs remain OPEN.

| Rank | PR | Skill / Theme | Status & Highlights |
|------|----|--------------|---------------------|
| 1 | [#1298](https://github.com/anthropics/skills/pull/1298) | **skill-creator fix — `run_eval.py` 0% recall** | OPEN. Resolves [#556](https://github.com/anthropics/skills/issues/556) (12 comments, 10+ reproductions). Fixes Windows stream reading, trigger detection, parallel workers. Critical because `improve_description.py` and `run_loop.py` were optimizing against noise. |
| 2 | [#1628](https://github.com/anthropics/skills/pull/1628) | **Hivemind — Zero-Cost Multi-Agent Orchestration** | OPEN. Lets Claude Code delegate mechanical work to headless opencode workers on free models while remaining the sole planner/reviewer. Novel multi-agent delegation pattern. |
| 3 | [#1615](https://github.com/anthropics/skills/pull/1615) | **scnet-hpc — SCNet HPC cluster skill** | OPEN. Profile-based SSH and Slurm workflows, partition/memory/module/accelerator guidance, compute-node discovery. Vertical skill for HPC users. |
| 4 | [#514](https://github.com/anthropics/skills/pull/514) | **document-typography — typographic quality control** | OPEN. Prevents orphan word wrap, widow paragraphs, numbering misalignment in every Claude-generated document. Universal quality layer. |
| 5 | [#486](https://github.com/anthropics/skills/pull/486) | **ODT — OpenDocument text skill** | OPEN. Create/fill/parse `.odt` and `.ods`. ISO-standard open format support complements the existing DOCX/PDF skills. |
| 6 | [#210](https://github.com/anthropics/skills/pull/210) | **frontend-design clarity & actionability** | OPEN. Revises frontend-design so every instruction is executable in a single conversation; moves from descriptive to operational. |
| 7 | [#1367](https://github.com/anthropics/skills/pull/1367) | **self-audit — mechanical verification + reasoning gate v1.3.0** | OPEN. Universal quality gate (any tech stack/model). Backed by [#1385](https://github.com/anthropics/skills/issues/1385). |
| 8 | [#1627](https://github.com/anthropics/skills/pull/1627) | **buffer-api — Buffer GraphQL scheduling** | OPEN. Portable agent skill for social scheduling; works across Claude/Cursor/Codex/OpenClaw/Hermes/n8n — early MCP-style portability pattern. |

---

## 2. Community Demand Trends (from Issues)

- **Security & trust boundaries** — [#492](https://github.com/anthropics/skills/issues/492) (43 comments, top issue): community skills impersonating `anthropic/` namespace. The single most-discussed concern in the repo.
- **Org-wide distribution & lifecycle** — [#228](https://github.com/anthropics/skills/issues/228) (16 comments): org-wide skill sharing in Claude.ai; [#62](https://github.com/anthropics/skills/issues/62) (10 comments): skills disappearing without trace. **Install / share / version management** is a clear pain point.
- **Eval & self-improvement infrastructure** — [#556](https://github.com/anthropics/skills/issues/556) (12 comments): `run_eval.py` never triggers; [#1390](https://github.com/anthropics/skills/issues/1390): `evaluation.py` silently fabricates errors; [#202](https://github.com/anthropics/skills/issues/202) (CLOSED): skill-creator should be best-practice operational, not documentation. Strong demand for **reliable description optimization & evaluation harness**.
- **Reasoning quality gates / governance** — [#1385](https://github.com/anthropics/skills/issues/1385) and [#1329](https://github.com/anthropics/skills/issues/1329) (compact-memory, 9 comments): proposals for pre-task calibration, adversarial review, symbolic agent state.
- **Token efficiency / context hygiene** — [#1487](https://github.com/anthropics/skills/issues/1487): `claude-api` injects ~156k tokens in one tool call; [#189](https://github.com/anthropics/skills/issues/189): duplicate skills across `document-skills`/`example-skills`. Community wants **lean skill loading & dedup**.
- **Portability / deployment** — [#16](https://github.com/anthropics/skills/issues/16): expose Skills as MCPs; [#29](https://github.com/anthropics/skills/issues/29): Bedrock usage. Cross-runtime and cross-cloud skill portability.

---

## 3. High-Potential Pending Skills

These OPEN PRs are most likely to land soon based on issue linkage, recent activity, and review momentum:

| PR | Skill | Why High-Potential |
|----|-------|---------------------|
| [#1742](https://github.com/anthropics/skills/pull/1742) | **mcp-builder — `mcp>=2` compatibility** | Direct fix for [#1668](https://github.com/anthropics/skills/issues/1668); updated 2026-09-11. Required for the mcp>=2 line. |
| [#1734](https://github.com/anthropics/skills/pull/1734) | **docx — orphaned comment detection** | Recent (2026-09-06) and active. Targeted, low-risk DOCX robustness fix. |
| [#1724](https://github.com/anthropics/skills/pull/1724) | **mcp-builder — default model → claude-sonnet-5** | Straightforward modernization; pairs with [#1607](https://github.com/anthropics/skills/pull/1607) (mark retired models). |
| [#1607](https://github.com/anthropics/skills/pull/1607) | **claude-api — mark retired models** | Closes [#1603](https://github.com/anthropics/skills/issues/1603); low-risk docs/data fix. |
| [#1602](https://github.com/anthropics/skills/pull/1602) | **mcp-builder eval serialization/encoding** | Addresses [#1390](https://github.com/anthropics/skills/issues/1390); broad reliability impact. |
| [#1099](https://github.com/anthropics/skills/pull/1099) / [#1050](https://github.com/anthropics/skills/pull/1050) | **Windows compatibility for skill-creator** | Overlaps [#1298](https://github.com/anthropics/skills/pull/1298) and [#556](https://github.com/anthropics/skills/issues/556); will likely be consolidated into the umbrella fix. |
| [#1595](https://github.com/anthropics/skills/pull/1595) | **docs — add UIZZE partner skill** | Lightweight partner-list update. |
| [#83](https://github.com/anthropics/skills/pull/83) | **skill-quality-analyzer + skill-security-analyzer** | Long-pending meta-skills; community has clear demand (#492) for security analyzers — strong alignment. |

---

## 4. Skills Ecosystem Insight

> The community's most concentrated demand is **trust, safety, and reliability infrastructure for Skills themselves** — namespace authenticity (Issue #492), Windows + cross-platform stability (PRs #1050/#1099/#1298), and trustworthy evaluation harnesses (Issues #556/#1390) — outranking demand for new domain-specific capabilities.

---

# Claude Code Community Digest — 2026-09-13

## Today's Highlights

Today's release **v2.1.270** ships a quick patch for a regression introduced in 2.1.269 where read-only git commands unexpectedly prompted for permission mid-session. Meanwhile, the community continues to focus on three persistent concerns: the unresolved Windows desktop GPU-process crash (#80444, 111 comments), fragile Cowork/cloud-session GitHub integration (#84581, #91805), and rising cost anxiety with the Fable 5.1 model on subscription plans (#93894).

## Releases

### v2.1.270
- Fixed read-only git commands in Bash unexpectedly asking for permission after a session had been running for a while (regression from 2.1.269).
- 📦 [Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.270)

## Hot Issues

1. **[#80444 — Desktop app GPU crash leaves MSIX unlaunchable on Windows](https://github.com/anthropics/claude-code/issues/80444)** *(OPEN, 111 comments, 👍17)*
   By far the loudest thread in the tracker. The Electron-based desktop app crashes inside the in-app Browser tab (NVIDIA RTX 2080, Win 11), corrupting MSIX state (`appxState=2`) until the user runs Repair. With 17 upvotes and active daily updates, this is the top blocker for Windows desktop users.

2. **[#84581 — Cowork cloud sessions can't access any GitHub repo](https://github.com/anthropics/claude-code/issues/84581)** *(OPEN, 8 comments, 👍5)*
   The git proxy tells agents to call a nonexistent `add_repo` tool, leaving cloud sessions functionally unable to operate against any repository. Pairs directly with #91805 and #86828.

3. **[#93894 — Fable 5.1 burns through $100/mo session budget on a single review](https://github.com/anthropics/claude-code/issues/93894)** *(OPEN, 2 comments)*
   Highlights a growing pricing/UX complaint: high-effort tasks on Fable 5.1 consume the entire session allowance on the $100 tier, and users are explicitly comparing Anthropic unfavorably to OpenAI's weekly-cap model.

4. **[#91805 — No repositories in Claude Code web repo picker](https://github.com/anthropics/claude-code/issues/91805)** *(OPEN, 3 comments)*
   Even with the GitHub App installed, web users see an empty repo list. Another data point that the web/Cowork GitHub integration story is fragmented.

5. **[#79427 — Shared `claude daemon` leaks `ANTHROPIC_AUTH_TOKEN` across sessions](https://github.com/anthropics/claude-code/issues/79427)** *(CLOSED, high-priority)*
   A security regression where the first session's auth-bearing env vars are inherited by every later daemon-spawned session, leading to silent wrong-account billing. Tagged `area:security` and `high-priority`.

6. **[#86280 — All Cowork projects lost after macOS update/reboot](https://github.com/anthropics/claude-code/issues/86280)** *(CLOSED, `data-loss`)*
   Local-agent-mode sessions were recreated empty, and the `cleanupPeriodDays=30` default silently purged session transcripts. A reminder that retention policies need user-facing visibility.

7. **[#86828 — Cloud sessions GitHub gate overrides "Full" network access](https://github.com/anthropics/claude-code/issues/86828)** *(CLOSED)*
   The egress proxy hard-special-cases GitHub and ignores the environment's "Unrestricted" network policy, swallowing user Authorization headers. Reinforces the Cowork/networking pain point.

8. **[#93124 — Claude in Chrome unusable from WSL; desktop app forces WSL runtime](https://github.com/anthropics/claude-code/issues/93124)** *(OPEN, has repro)*
   On Windows + WSL2, browser tools cannot be exercised because the agent spawns inside WSL where Chrome integration is auto-disabled. See also #79655.

9. **[#84750 — Abnormal token consumption regression](https://github.com/anthropics/claude-code/issues/84750)** *(CLOSED)*
   Tokens-per-task roughly doubled in the prior two weeks; users reference #13552. Cost transparency regressions remain a recurring class.

10. **[#70161 — Statusline OSC 8 hyperlinks not clickable (regression in 2.1.181)](https://github.com/anthropics/claude-code/issues/70161)** *(CLOSED, has repro)*
    Custom statusline programs emitting OSC 8 hyperlinks now render as plain text. Small but visible quality-of-life regression that affects many power users with custom statuslines.

> A notable cluster of issues from user `@sworrl` (#85369, #85354, #85385, #85365, #85381, #85352, #85348, #85346) report **ClAudit false positives** flagging legitimate sysadmin work (UDR networking, AD operations, MySQL installs) as cyber/AUP violations, with session-halt severity. Worth a glance if you do ops/security-adjacent work.

## Key PR Progress

1. **[#93452 — `mods/diff`: match the built-in `/diff` panel](https://github.com/anthropics/claude-code/pull/93452)** *(CLOSED)*
   Aligns the `/diff` mod pane with the native panel: engine code-element hunks, built-in ✕ close, row spacing, empty-state placement, narrow-terminal resize line, and a single in-flight repo probe. Reduces divergent UX between mods and the native UI.

2. **[#93912 — `mods`: unit tests for diff, sec-default, and telemetry](https://github.com/anthropics/claude-code/pull/93912)** *(CLOSED)*
   Tests now execute where the mod runs, using the engine's `$` and hook registrations. Runnable via `claude plugin test <dir>`. Signals the plugin/mod test infrastructure is maturing.

3. **[#61716 — docs: troubleshooting for false usage limit caused by context overflow](https://github.com/anthropics/claude-code/pull/61716)** *(OPEN)*
   Documents that `/compact` failing on 1M-context windows is mis-mapped to a "usage limit reached" error, and offers a workaround. Closes #50321 — a great example of community-written docs filling a confusing UX gap.

> Note: only 3 PRs were updated in the last 24h; the section above reflects the full set.

## Feature Request Trends

Reading across open issues and recent requests, the strongest pressure is on:

- **Claude in Chrome on WSL/Windows-native flows** — both a stability report (#93124) and an enhancement (#79655) request first-class support; users currently have to drop to native Linux Chrome via WSLg as a workaround.
- **Cowork persistence & reliability** — open tasks persisting across sessions (#93910), better data-loss protection (#86280), and an integrated GitHub repo picker (#91805/#84581) all point at Cowork needing hardening as a primary surface, not a beta.
- **Predictable cost & usage-limit UX** — Fable 5.1 budget blowouts (#93894), token-consumption regressions (#84750), and contradictory reset-time banners (#77469, #74165) point to a need for an in-product cost/limit explanation layer.
- **FleetView / agent-view ergonomics** — separate pinned-section rendering (#83013), reachable pinned sessions (#86864), and non-leaky `/exit` semantics for `--worktree` (#82192).
- **Docs & troubleshooting surface** — community PRs (#61716) and recurring "false usage limit" reports suggest a dedicated troubleshooting section for limit/auth/permission errors is overdue.

## Developer Pain Points

- **Permissions regressions break flow.** Permission prompts on read-only git (v2.1.269 → 2.1.270) and stale workspace-trust dialogs (#86857) repeatedly interrupt long-running sessions.
- **Cowork / cloud-session GitHub integration is fragile.** Three open issues (#84581, #91805, #86828) all describe variations of "the proxy swallows, redirects, or fails to enumerate GitHub", making cloud sessions a poor substitute for local CLI.
- **Usage-limit messaging is unreliable.** Reset times can be 3–4 hours later than actual recovery (#77469, #74165), and `/compact` failures are misreported as usage limits — users lose real working time waiting.
- **Cost regressions are opaque.** Per-task token usage jumps (#84750) and high-effort models consume entire budgets in one task (#93894) with no per-task cost preview.
- **Safety filters over-fire on legitimate ops work.** A wave of ClAudit false positives flags network diagnostics, AD operations, MySQL installs, and crypto-secrets workflows as cyber/AUP violations, halting sessions.
- **Cross-platform gaps on Windows.** GPU-crash on desktop (#80444), `pwsh` window flashes from background PTY hosts (#78189), and Claude-in-Chrome unusable on WSL (#93124/#79655) collectively make Windows the roughest target.
- **Data-loss risk in Cowork.** Silent 30-day cleanup of session transcripts and lost local-mode sessions after reboot (#86280) erode trust in the desktop product.
- **Auth/billing hygiene.** Shared-daemon env-var leakage (#79427) is a high-priority security regression — anyone running multiple accounts or CI pools should pin versions and audit env scoping.

*No discussion data was provided in the source feed, so the Discussions section is omitted from this digest.*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-13

## 1. Today's Highlights

The Codex team shipped **15+ closed PRs** focused on the agent command center, context snapshots, and recap UX refinements — including token/cost displays, model grouping, and read-only history for externally-managed tasks. The community is grappling with **persistent quota/accounting inconsistencies** (issue #41220 hit 40 comments) and a cluster of **Windows-specific app regressions** across the desktop client. On a more positive note, an open feature request to **completely disable the "Pets" UI** (#34349) has become the most upvoted item this week with 48 👍.

## 2. Releases

*No new releases in the last 24 hours.*

## 3. Hot Issues

1. **[#41220](https://github.com/openai/codex/issues/41220) — Abnormal Codex usage/quota depletion (Meta)**
   The cross-report tracker for users seeing subscription quota drain far faster than expected. 40 comments, 14 👍 — this is the community's loudest complaint right now and signals systemic usage-accounting inconsistencies across Pro/Plus/Max tiers.

2. **[#34349](https://github.com/openai/codex/issues/34349) — Allow users to completely disable Pets**
   Feature request to remove the Pets UI entirely. **48 👍** (highest in this window) — strong sentiment that the feature clutters the sidebar with no clear productivity value.

3. **[#25820](https://github.com/openai/codex/issues/25820) — Codex CLI login blocked by phone-verification rate limit**
   Pro subscribers can't complete `codex login` → "Sign in with ChatGPT". 15 comments — recurring auth friction blocking CLI adoption for paid users.

4. **[#44781](https://github.com/openai/codex/issues/44781) — Editing/resending queued messages triggers "App-server queued follow-up no longer exists"**
   Desktop Windows users can't reliably edit queued prompts. 17 👍 suggests this is hitting a wide audience.

5. **[#43924](https://github.com/openai/codex/issues/43924) — GPT struggles to access browser tabs**
   Desktop browser integration is unreliable on Apple silicon — affects Max subscribers trying to use the browser-access feature.

6. **[#41695](https://github.com/openai/codex/issues/41695) — iPad App freezes on remote Codex sessions**
   iPad OS 27 beta users hit constant freezes when accessing remote sessions — a critical mobile workflow break.

7. **[#43938](https://github.com/openai/codex/issues/43938) — Codex tool IPC decoding failure (`failed to decode code-mode`)**
   Every tool invocation fails on Linux app-server 26.901.51231 — a hard blocker for enterprise users.

8. **[#42973](https://github.com/openai/codex/issues/42973) — Regression: headless SSH tasks lose thread/delegation tools**
   After the Desktop update, remote SSH workflows silently lose `send_message_to_user` and delegation tools — a major break for HPC/remote users.

9. **[#45073](https://github.com/openai/codex/issues/45073) — ~86% of 5h window consumed in ~26 minutes with only 2 prompts**
   Extreme quota drain on `gpt-5.6-sol medium fast` (CLI 0.154.0, Windows). Compounds the meta-issue #41220 with a concrete, reproducible data point.

10. **[#43929](https://github.com/openai/codex/issues/43929) — Linux sandbox `bwrap "Bad file descriptor"` with multiple denied files**
    Sandbox aborts at startup when a workspace contains 2+ files matched by `deny` filesystem rules — a configuration correctness bug with security implications.

## 4. Key PR Progress

1. **[#45124](https://github.com/openai/codex/pull/45124) — Add feature flag for asynchronous user messages**
    Adds the disabled-by-default `send_message_to_user_async` flag, letting root agents use async messaging without catalog support. Foundational plumbing for the async question flow.

2. **[#45094](https://github.com/openai/codex/pull/45094) — Estimate history tokens from content instead of serialized envelopes**
    More accurate token accounting (excludes message IDs, metadata, JSON escaping). Directly relevant to the quota complaints in #41220.

3. **[#44970](https://github.com/openai/codex/pull/44970) — Show task tokens and usage estimates in the agent command center**
    Surfaces input/output tokens + estimated credits/USD cost in task details. A user-facing response to the "where is my quota going?" frustration.

4. **[#44969](https://github.com/openai/codex/pull/44969) — Open tasks managed elsewhere as read-only history**
    Command center previously refused to open tasks from another app server; now falls back to a frozen read-only snapshot.

5. **[#44957](https://github.com/openai/codex/pull/44957) — Add model grouping to the agent command center**
    Cycle grouping through project/status/model with `Ctrl+S`; groups tasks by model with recent activity first.

6. **[#45108](https://github.com/openai/codex/pull/45108) — Cancel pending thread title generation after manual renames**
    Stops the lingering progress indicator after a user manually renames a thread.

7. **[#45090](https://github.com/openai/codex/pull/45090) — Preserve conversation context and separate next actions in recaps**
    Restructures the 900-byte recap prompt to keep completed work, unresolved caveats, and pending actions distinct.

8. **[#45089](https://github.com/openai/codex/pull/45089) — Delay automatic recaps and compact their TUI layout**
    Increases auto-recap delay from 3 → 30 minutes and uses an italic `↳ Recap:` layout with hanging indent.

9. **[#44946](https://github.com/openai/codex/pull/44946) — Retire Friendly and Pragmatic personality selection**
    Switches to literal model instruction templates and reports `supports_personality: false`. Simplifies the model-preset surface.

10. **[#31471](https://github.com/openai/codex/pull/31471) — Extract apps cache logic into `ConnectorRuntimeManager`**
    Scoped Codex Apps cache by account/user/workspace/home with stale-context discard — foundational cleanup of the faster-connectors effort.

*(Other notable merged work: #45116 multiline report notes, #44952 voice captions persistence, #44948 context snapshots for async questions, #44976 snapshot text rendering consistency, #45051 consolidated artifact downloads, #25383 app-server account session lifecycle, #35882 rust-toolchain 1.95→1.97.1.)*

## 5. Hot Discussions

### Show and tell
- **[#44153](https://github.com/openai/codex/discussions/44153) — `isitdone`: Stop hook that blocks "done" until tests/typecheck/lint pass**
  A clever safety-net hook that re-runs repo checks at stop time and rejects completion with the real failure output (up to 3 retries).
- **[#45128](https://github.com/openai/codex/discussions/45128) — VibeFuse: free Windows canvas running Codex CLI (and others) as live widgets**
  Drag-and-drop multi-agent harness combining Codex CLI, Claude Code, Gemini CLI, Cursor, and Qwen on one canvas.
- **[#44618](https://github.com/openai/codex/discussions/44618) — Wayfinder: trace Codex work as a visual voyage map**
  Open-source, local-first desktop app that visualizes the path a Codex session took to a result.
- **[#44291](https://github.com/openai/codex/discussions/44291) — Brain Scanner: pre-change call-graph context for shared helpers**
  Lets an agent (and human) inspect what calls a helper before refactoring it — addresses the "blind refactor" failure mode.

### General
- **[#45062](https://github.com/openai/codex/discussions/45062) — "thx you've listened"**
  Positive community signal that prior feedback around Android/iOS work has landed.
- **[#45013](https://github.com/openai/codex/discussions/45013) — Codex review: don't subscribe, wasting money**
  Heated critique flagging that Codex's coding quality is fine but the **usage limit** is the blocker — cites ~8× smaller conversations vs. Claude on the same workflow. Reinforces the quota-depletion theme from issue #41220.

## 6. Feature Request Trends

- **Quota transparency & control** — dominant theme: usage dashboards in the command center (#44970), history token estimation (#45094), and visibility into why a session consumes so many credits (#41220, #45073, #45013).
- **Pets removal / UI decluttering** — the most upvoted single item (#34349, 48 👍); users want the sidebar trimmed to productive surfaces.
- **Multi-account / profile switching** — landed on the Rust app-server (#25383); still a recurring ask for users juggling personal/work accounts.
- **Better remote & SSH workflows** — read-only history (#44969), preserved thread messaging on headless SSH (#42973), clipboard routing in tmux over SSH (#45068), async questions from remote sessions (#45124, #44948).
- **Mobile/iOS maturity** — iPad freezes (#41695), Android follow-up praise (#45062); mobile is still settling.
- **Connector ecosystem hardening** — `ConnectorRuntimeManager` extraction (#31471) signals broader plans for third-party integrations.

## 7. Developer Pain Points

1. **Quota accounting feels broken.** The single biggest source of frustration — multiple reports of single-digit prompts consuming 80%+ of a 5-hour window. Developers can't predict cost, can't trust dashboards, and many are publicly reconsidering their subscription.
2. **Windows-specific regressions dominate new bug reports.** From elevated sandbox setup (helper_failed / SetNamedSecurityInfoW error 5) to thread-store "os error 2" to vanished project chats, Windows users are getting hit hard.
3. **Auth friction on CLI.** Phone-verification rate limits are blocking legitimate Pro subscribers from authenticating — a critical adoption barrier.
4. **Remote/SSH workflows keep breaking.** Thread/messaging tools silently disappear after updates; tmux-based SSH clipboard routing is wrong; read-only history was missing; headless tasks lose delegation tools.
5. **TUI polish gaps.** Cursor jumps when Astra is selected (#44444), screen redraw artifacts (#11458), multiline paste submitting too early (#45116).
6. **Async question lifecycle is incomplete.** Cancelling questions leaves them pending with no agent-visible resolve operation (#45131) — undermines the headless-agent story.
7. **Sandbox correctness.** Multiple `deny`-rule and elevated-sandbox edge cases (#43929, #40550, #39245) suggest the sandbox security model needs another hardening pass.
8. **App-server IPC fragility.** `failed to decode code-mode` (#43938) and missing `code_mode_host_duration_ns` (#44379) point to schema/version drift between CLI and app-server.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-13

## Today's Highlights
The nightly release v0.61.0 lands two significant security hardening changes — indirect prompt injection mitigation via build-file modifications and untrusted flags (PR #29250), plus a sandbox rewrite that isolates runtime state from host configuration directories (PR #29214). Meanwhile, agent reliability remains the dominant theme: the generalist-agent hang (#21409) and the MAX_TURNS mis-reporting bug (#22323) continue to draw active maintainer attention, signaling that subagent orchestration is the most actively iterated area of the codebase.

## Releases

**v0.61.0-nightly.20260912.g9c1b0a610** — [release](https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0-nightly.20260912.g9c1b0a610)
- [`#29250`](https://github.com/google-gemini/gemini-cli/pull/29250) **fix(core): prevent indirect prompt injection via build file modifications and untrusted flags** (@villahernandez-coder) — Closes a vector where build scripts and untrusted CLI flags could smuggle prompt content into model context.
- [`#29214`](https://github.com/google-gemini/gemini-cli/pull/29214) **fix(sandbox): harden filesystem boundaries and isolate runtime state** (@diegogodinezr) — Replaces host-directory mounts with sanitized configs and standardizes on realpath resolution for path sensitivity checks.

## Hot Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent reports GOAL success after hitting MAX_TURNS (p1, 13 comments)** `area/agent, kind/bug`
   `codebase_investigator` finishes with `status: "success"` even when its result text says it ran out of turns. Important because it silently masks real failures, breaking downstream automation that trusts the status field.

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent hangs indefinitely (p1, 8 comments, 👍8)** `area/agent, kind/bug`
   Trivial folder-creation tasks never terminate when the model defers to the generalist subagent; users have waited an hour. High community agreement that this is a blocking regression for everyday use.

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — Zero-Dependency OS Sandboxing & Post-Execution Intent Routing (p2, 9 comments)** `area/agent, kind/enhancement, effort/large`
   Proposes letting Gemini 3 exploit its native bash affinity without giving up safety. Strategic direction that ties together model capability, sandboxing, and command-post-processing.

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — EPIC: AST-aware file reads, search, and mapping (p2, 7 comments)** `area/agent, kind/feature`
   Tracks an investigation into AST-driven tooling (precision reads, token savings, codebase mapping). Linked companion epic: [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) on using tilth/glyph.

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini under-uses custom skills and sub-agents (p2, 6 comments)** `area/agent, kind/bug`
   Model only invokes configured skills/agents when explicitly told. Disclosure is the missing piece — points at a discoverability prompt-engineering gap.

6. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Deterministic redaction + reduced Auto Memory logging (p2, 5 comments)** `area/security, kind/bug`
   Auto Memory currently trusts a post-hoc model-side redaction step; transcripts (and existing skill content) can leak into logs before that step runs.

7. **[#29288](https://github.com/google-gemini/gemini-cli/issues/29288) — ACP session/load fails with "Invalid session identifier" under Zed (p1, 4 comments)** `area/non-interactive, kind/bug`
   Zed-as-ACP-client cannot resume any session because the agent writes a self-generated `sessionId` instead of the client-provided one. Concrete interoperability blocker for editor integrations.

8. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell command stuck on "Awaiting user input" after completion (p1, 4 comments, 👍3)** `area/core, kind/bug`
   Even trivial, non-interactive commands leave the shell marked active. Frequent reproduction makes this a top user-visible annoyance.

9. **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) — Auto Memory retries low-signal sessions indefinitely (p2, 4 comments)** `area/agent, kind/bug`
   Sessions the extractor decides not to read stay "unprocessed" forever and keep re-surfacing in the inbox.

10. **[#22232](https://github.com/google-gemini/gemini-cli/issues/22232) — browser_agent: automatic session takeover & lock recovery (p3, 4 comments)** `area/agent, kind/feature`
    Currently fail-fast on a locked persistent profile; users want graceful takeover of orphaned sessions.

## Key PR Progress

1. **[#29250](https://github.com/google-gemini/gemini-cli/pull/29250) — fix(core): prevent indirect prompt injection via build file modifications and untrusted flags** *OPEN, p1* — Security: closes a prompt-injection path through project build configurations.

2. **[#29214](https://github.com/google-gemini/gemini-cli/pull/29214) — fix(sandbox): harden filesystem boundaries and isolate runtime state** *CLOSED* — Sandbox rewrite: realpath-resolved path checks, sanitized config injection, runtime state isolated from host.

3. **[#29294](https://github.com/google-gemini/gemini-cli/pull/29294) — fix(cli): prevent terminal flickering from stdout contention and cursor focus** *OPEN, p2* — Diagnoses two ink-reconciler bottlenecks (stdout contention + cursor focus) that cause tearing during fast typing while a background command runs. Closes [#29295].

4. **[#29217](https://github.com/google-gemini/gemini-cli/pull/29217) — fix(config): don't rewrite explicit `gemini-2.5-flash` model selection** *OPEN, p1/p2* — `isFlashModel()`'s `endsWith('flash')` heuristic was silently upgrading the explicitly pinned 2.5 Flash; now an exact-match guard preserves user intent.

5. **[#29287](https://github.com/google-gemini/gemini-cli/pull/29287) — feat(policy): map `--yolo` to `allowedTools: ["*"]` policy** *CLOSED, xl* — Removes the special `ApprovalMode.YOLO` state in favor of a uniform policy-engine wildcard; fulfills [#11303].

6. **[#29201](https://github.com/google-gemini/gemini-cli/pull/29201) — fix(cli): preserve approved shell commands across confirmation retries** *OPEN, p1/p2* — Fixes a loop where multiple `!{...}` injections in a TOML command kept prompting even after "always allow".

7. **[#29203](https://github.com/google-gemini/gemini-cli/pull/29203) — fix(security): strip shell wrappers carrying extra flags** *OPEN, p2* — `stripShellWrapper` now recognizes `bash -c` / `powershell … -Command` even with extra flags, so policy re-checks the inner command correctly.

8. **[#29200](https://github.com/google-gemini/gemini-cli/pull/29200) — fix(core): enforce MCP policy consistently at runtime** *OPEN, p2* — Case-insensitive/whitespace-trimmed server-name matching, and an explicitly empty `mcp.allowed` list is now fail-closed.

9. **[#29208](https://github.com/google-gemini/gemini-cli/pull/29208) — fix(core): fall back to empty on malformed agents.json shape** *OPEN, p2* — A corrupt `agents.json` (e.g. `null`, scalar, or array) no longer crashes `isAcknowledged`/`acknowledge`; closes [#29207].

10. **[#29205](https://github.com/google-gemini/gemini-cli/pull/29205) — fix(cli): submit MCP prompt text without JSON encoding** *OPEN, p2* — `McpPromptLoader` was double-encoding responses; embedded quotes and newlines are now preserved verbatim from the MCP server.

*(Honorable mentions: [#29292](https://github.com/google-gemini/gemini-cli/pull/29292) array-shape guard for checkpoint history; [#29211](https://github.com/google-gemini/gemini-cli/pull/29211) stops scheduling state updates from inside a state updater; [#29114](https://github.com/google-gemini/gemini-cli/pull/29114) duplicate `handleExit` re-entrancy guard; [#29118](https://github.com/google-gemini/gemini-cli/pull/29118) extension repo parsing now treats `.git` as a trailing suffix only.)*

## Feature Request Trends

- **Subagent observability & orchestration** — trajectory surfacing via `/chat share` ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)), subagent context in `/bug` reports ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)), native-file-based task tracking ([#21000](https://github.com/google-gemini/gemini-cli/issues/21000)), and self-aware flag/hotkey guidance ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)).
- **Smarter tool selection** — auto-pruning when tool count exceeds API limits ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)), and AST-aware reads/search to reduce token firehosing ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746), [#19561](https://github.com/google-gemini/gemini-cli/issues/19561)).
- **Sandbox & execution safety** — OS-level sandboxing with bash-affinity preservation ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873)) and discouraging destructive commands ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)).
- **Memory system quality** — better redaction, retry bounds, and quarantine of invalid patches ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525), [#26522](https://github.com/google-gemini/gemini-cli/issues/26522), [#26523](https://github.com/google-gemini/gemini-cli/issues/26523), [#26516](https://github.com/google-gemini/gemini-cli/issues/26516)).
- **Editor/ACP integration** — durable, client-established session identifiers across ACP transports (echoed by [#29288](https://github.com/google-gemini/gemini-cli/issues/29288)).
- **UI/UX polish** — flicker-free terminal resize ([#21924](https://github.com/google-gemini/gemini-cli/issues/21924)) and persistent `/compress` ([#21335](https://github.com/google-gemini/gemini-cli/issues/21335)).

## Developer Pain Points

- **Subagent reliability** is the most-reported friction: indefinite hangs ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), false-success reports ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)), and the model ignoring configured agents/skills ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968)).
- **Browser agent** keeps recurring — Wayland failures ([#21983](https://github.com/google-gemini/gemini-cli/issues/21983)), `settings.json` overrides ignored ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)), and locked-profile dead-ends ([#22232](https://github.com/google-gemini/gemini-cli/issues/22232)).
- **Shell/exec plumbing** — commands that finish but never release the prompt ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)), duplicate `handleExit` on spawn failure (PR #29114), interactive prompts trapping the model (e.g. `create-vite`, [#22465](https://github.com/google-gemini/gemini-cli/issues/22465)), and stray tmp scripts cluttering the workspace ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)).
- **Auto Memory** edge cases dominate the security/quality backlog — silent leakage of unredacted transcripts (#26525), infinite retry of low-signal sessions (#26522), invalid-patch ingestion (#26523), and the umbrella [#26516](https://github.com/google-gemini/gemini-cli/issues/26516).
- **Tooling limits** — the 128-tool API ceiling still surfaces as 400 errors for power users ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)), reinforcing demand for AST-aware, surgical reads.
- **ACP/editor integration** — session-ID mismatch breaks resume in Zed ([#29288](https://github.com/google-gemini/gemini-cli/issues/29288)), and config still misroutes explicit `gemini-2.5-flash` selections (PR #29217).
- **Security/policy UX** — TOML custom commands with multiple shell injections loop on confirmation (PR #29201), and shell wrappers with extra flags bypass re-check (PR #29203).

---

*No `github.com/google-gemini/gemini-cli/discussions` data was provided for this window — the Hot Discussions section has been omitted accordingly.*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest
**Date:** 2026-09-13

---

## 1. Today's Highlights

Today's activity is dominated by **triage-stage bug reports and feature requests** rather than releases — no new versions were published in the last 24 hours. Notable themes include a **memory-leak crash on Linux** (#4725), **broken session UX** around queued prompts (#4824) and image attachments (#4831), and several requests for **better session control primitives** such as `/remove-dir` (#4830) and richer observability via OpenTelemetry (#4825). On the PR side, the dependency bot is steadily modernizing GitHub Actions, while a security-focused PR pinning actions to commit SHAs was closed (#4808).

---

## 2. Releases

*No new releases in the last 24 hours.*

---

## 3. Hot Issues

| # | Issue | Status | Why It Matters |
|---|---|---|---|
| [#4725](https://github.com/github/copilot-cli/issues/4725) | Frequent JavaScript heap out of memory | OPEN | High-impact stability bug — the CLI crashes every few minutes on Linux, making it unreliable for long sessions. |
| [#4829](https://github.com/github/copilot-cli/issues/4829) | Subagents fail prompt caching on long tool-call sequences | OPEN | Affects token efficiency and cost for users of autonomous custom agents (task tool); cited on Gemini 3.8 Flash and Claude-class models. |
| [#4831](https://github.com/github/copilot-cli/issues/4831) | `claude-opus-5` only views 1 image per session | OPEN | Productivity regression for multimodal workflows; the CLI silently drops additional images with an unclear UX message. |
| [#4824](https://github.com/github/copilot-cli/issues/4824) | `ctrl-t` enqueue prompt hangs at "Working" | OPEN | Breaks a widely-used batching shortcut; affected users lose flow during multi-step agent work. |
| [#2147](https://github.com/github/copilot-cli/issues/2147) | CAPI 400: input item ID does not belong to connection | CLOSED | Long-standing bug from March; closure with 7 comments signals upstream-side resolution. |
| [#4759](https://github.com/github/copilot-cli/issues/4759) | Copilot CLI should send MCP cancellation requests | CLOSED | Addresses correctness of MCP protocol behavior during user-initiated cancellation — relevant to MCP-integrated workflows. |
| [#4830](https://github.com/github/copilot-cli/issues/4830) | Add `/remove-dir` command to revoke directory access | OPEN | Complements existing `/add-dir` and `/list-dirs`; an obvious parity gap in session permission management. |
| [#4825](https://github.com/github/copilot-cli/issues/4825) | HydraFusion: emit per-phase model/verdict/credit to OpenTelemetry | OPEN | Observability ask — wants routing decisions in `events.jsonl` exposed via OTel for cost attribution and debugging. |

---

## 4. Key PR Progress

| # | PR | Status | Description |
|---|---|---|---|
| [#4828](https://github.com/github/copilot-cli/pull/4828) | build(deps): bump `actions/github-script` 7.1.0 → 9.0.0 | OPEN | Routine Dependabot upgrade; major version jump — worth checking for breaking script API changes. |
| [#4827](https://github.com/github/copilot-cli/pull/4827) | build(deps): bump `actions/stale` 9.1.0 → 11.0.0 | OPEN | Keeps issue triage automation current; v11 brings notable behavior changes for stale handling. |
| [#4808](https://github.com/github/copilot-cli/pull/4808) | Pin GitHub Actions to commit SHAs | CLOSED | Supply-chain hardening: pins 3 action references in 4 files to immutable SHAs to mitigate tag-mutation risk. |

---

## 5. Hot Discussions

*No discussion data was provided for this period — section omitted.*

---

## 6. Feature Request Trends

Three convergent themes emerge from this week's issues:

- **Session-level permission control**: The gap between `/add-dir`/`/list-dirs` and the missing `/remove-dir` (#4830) highlights demand for **runtime, reversible trust boundaries** during a session.
- **Telemetry & cost attribution**: #4825 wants per-phase routing, verdict, and credit metadata surfaced via OpenTelemetry, pointing to a broader need for **fine-grained observability** of multi-model agent execution.
- **Concurrency & queue UX**: #4824's `ctrl-t` enqueue behavior shows users want **first-class batched/pipelined prompting** with predictable execution semantics.

---

## 7. Developer Pain Points

- **Runtime stability on Linux**: Recurring JS heap-OOM crashes (#4725) make long sessions fragile.
- **Token economics on autonomous agents**: Subagent tool-call bursts bypass prompt caching (#4829), inflating costs.
- **Silent UX failures**: Image dropping after one attachment (#4831) and indefinite "Working" states after queueing (#4824) are reported without actionable error messages.
- **Session-state management**: No way to revoke previously granted directory access mid-session (#4830).
- **Observability blind spots**: Multi-model routing decisions (HydraFusion) are opaque to external monitoring (#4825).

---

*Digest generated from github.com/github/copilot-cli public activity for the 24h window ending 2026-09-13.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-13

## Today's Highlights

The **clipboard failure saga continues to dominate community attention** — the top 4 active issues (#4283, #13984, #41470, #26459) all report variants of "Copied to clipboard" notifications that don't actually copy, across native terminals, VS Code Server, code-server, and GitHub Codespaces. A related **desktop sidecar crash loop** (#48715) is being actively patched in #48716, addressing repeated 0xC0000409 failures under memory pressure. Meanwhile, V2 architecture issues are emerging — particularly around SSE stream resilience (#47258), MCP server spawning per project directory (#43845), and subagent error propagation (#38866).

## Releases

_No new releases in the last 24h._

## Hot Issues

1. **[#4283](https://github.com/anomalyco/opencode/issues/4283)** — Copy-to-clipboard not working in terminal (131 comments, 123 👍). The grandfather of all clipboard bugs; ongoing since 1.0.62 with extensive reproduction info.
2. **[#13984](https://github.com/anomalyco/opencode/issues/13984)** — Cannot copy/paste in CLI (57 comments). Notification claims success but `Ctrl+V` yields nothing — likely related to #4283.
3. **[#41470](https://github.com/anomalyco/opencode/issues/41470)** — "Copied to clipboard" doesn't work in VSCode Server Docker (22 comments). Adds another environment (containerized VS Code) where clipboard silently fails.
4. **[#26459](https://github.com/anomalyco/opencode/issues/26459)** — Clipboard fails in web-based VSCode terminals (14 comments). Comprehensive enumeration of affected environments: code-server, Codespaces, Remote SSH, Gitpod.
5. **[#26602](https://github.com/anomalyco/opencode/issues/26602)** — Desktop hits 5-minute Headers Timeout with slow local providers (12 comments). Configured `"timeout": false` is ignored; OpenCode Desktop aborts exactly at 300s.
6. **[#36761](https://github.com/anomalyco/opencode/issues/36761)** — V2 subagent tool doesn't expose valid IDs to model (7 comments). Models guess plausible IDs causing failed delegation — a core architectural gap in V2.
7. **[#32985](https://github.com/anomalyco/opencode/issues/32985)** — OpenCode broken inside GNU Screen (5 comments). No truecolor, broken copy/paste, no mouse support — terminal multiplexer compatibility gap.
8. **[#48661](https://github.com/anomalyco/opencode/issues/48661)** — Desktop double-click pane maximize (JetBrains-style) (4 comments). Recreated after auto-close; signals a recurring UX request.
9. **[#35258](https://github.com/anomalyco/opencode/issues/35258)** — Paste (right-click & Ctrl+V) broken on Windows terminals (4 comments). Significant UX blocker for Windows users.
10. **[#39588](https://github.com/anomalyco/opencode/issues/39588)** — Copy/paste broken on VS Code Extension for Mac (4 comments). Extension beta has no working copy/paste path on macOS 15.7.7.

## Key PR Progress

1. **[#48716](https://github.com/anomalyco/opencode/pull/48716)** — `fix(desktop): respawn crashed sidecar; classify image-count errors as overflow`. Directly addresses #48715 crash loops (0xC0000409) by adding automatic sidecar restart and treating "Too many images" as a recoverable overflow condition.
2. **[#48730](https://github.com/anomalyco/opencode/pull/48730)** — `fix(core): keep locations with running terminals out of eviction`. Closes #48691 — prevents `LocationActivity` from evicting locations after 60 minutes simply because terminals don't emit session events.
3. **[#48729](https://github.com/anomalyco/opencode/pull/48729)** — `fix(session): keep todo list current for non-Claude models`. Fixes #27560 — non-Anthropic models never received todo-update instructions, leaving items stuck in `in_progress`.
4. **[#48727](https://github.com/anomalyco/opencode/pull/48727)** — `feat(app): move tab layout to general settings`. Promotes tab layout selector from Experimental to General, with search metadata and regression coverage updates.
5. **[#48724](https://github.com/anomalyco/opencode/pull/48724)** — `fix(desktop): migrate mac beta to stable installer`. Routes macOS Beta users to the signed Stable DMG, resolving Squirrel.Mac issues with differently-identified app bundles.
6. **[#46165](https://github.com/anomalyco/opencode/pull/46165)** — `fix(app): keep archived sessions open in their tabs`. Closes #35058 — archiving was acting as a navigation command; now archives only update metadata without closing tabs.
7. **[#48726](https://github.com/anomalyco/opencode/pull/48726)** — `docs: add BYOT to ecosystem projects`. Docs-only ecosystem addition.
8. **[#48722](https://github.com/anomalyco/opencode/pull/48722)** — `docs(ecosystem): add lintlang plugin`. Docs-only ecosystem addition for `lintlang` plugin.
9. **[#48721-opened](https://github.com/anomalyco/opencode/issues/48721)** (Issue) — `ProviderModelNotFoundError suggests identical model string`. Multi-segment model keys with slashes (e.g., `nvidia/nemotron-...`) surface as opaque "Unexpected server error".
10. **[#48712](https://github.com/anomalyco/opencode/pull/48712)** — `feat(tui): render latex math blocks via kitty graphics` *(closed)*. MathJax → SVG → resvg-wasm → kitty/sixel pipeline; falls back to raw markdown in tmux. Suggests maintainers preferred the feature direction but closed without merge — likely needs rework.

## Feature Request Trends

- **Cross-platform clipboard unification**: The most-requested invisible feature — a robust clipboard path that works across native terminals, web VSCode, macOS, Windows, and remote/SSH sessions.
- **Remote approval workflows**: #39628 specifically asks for mobile/second-device approval of permission prompts — addressing long-running sessions that block unattended.
- **TUI fidelity improvements**: LaTeX/math rendering (#48712, closed), `tok/s` throughput display (#42112, closed), and logical-text-preserving mouse copy (#44056, #47165) indicate users want the TUI to behave more like a rich client.
- **Pane and tab ergonomics**: Double-click pane maximize (#48661), session renaming from context menu (#46915, closed draft), and "open session selector with `-s` no ID" (#48718) point to a push toward JetBrains/IDE-grade UX.
- **Provider ergonomics**: Better quota/window accounting (DeepSeek 4.1 Flash #48687), proper NVIDIA auth (#48728), and friendlier model-key error messages (#48721).

## Developer Pain Points

1. **Clipboard silently failing across every environment** — the single most-reported class of bug, with no unified fix yet visible.
2. **Stream/SSE instability** — memory growth on long sessions (#31087, closed), no auto-resume after tab backgrounding (#47258), and zero-chunk provider stalls with no timeout/retry (#48675).
3. **V2 service resource waste** — #43845 reports the V2 background service spawning ~53 sets of local MCP stdio processes on startup, one per cataloged project directory.
4. **Subagent opacity** — Models can't discover valid subagent IDs (#36761), and stream errors can surface as empty successful-looking `<task_result>` (#38866).
5. **Desktop instability** — Sidecar crash loops under memory pressure (#48715) and image-count errors that brick sessions entirely.
6. **Terminal compatibility gaps** — GNU Screen support (#32985), web-VSCode clipboard (#26459), Windows paste (#35258).
7. **Provider timeout handling** — Slow local OpenAI-compatible providers can't escape the 5-minute Desktop timeout regardless of config (#26602).
8. **Lost-work UX** — `Ctrl+C` discarding composed prompt drafts with no recovery (#48636, closed) and SSE disconnects requiring manual refresh (#47258).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-13

## Today's Highlights
The Pi repository saw high triage velocity today with **12 issues closed** within 24 hours, particularly around OAuth provider onboarding (Google Antigravity, Cursor Pro) and TUI event observability for blocking prompts. The long-running `openai-codex` connection reliability thread (#4945, 78 comments, 33 👍) remains the dominant pain point, while cross-platform friction (Windows path handling, bash timeout kill) continues to surface in bug reports.

## Releases
*No new releases in the last 24 hours.*

## Hot Issues

1. **[#4945](https://github.com/earendil-works/pi/issues/4945) — openai-codex Connection Reliability Issues** (78 comments, 33 👍, OPEN)
   `gpt-5.5` via `openai-codex` frequently leaves the TUI stuck on `Working...` with no streamed output or visible error; only Escape recovers. Most-discussed issue by a wide margin and marked `[inprogress]`, indicating active debugging.

2. **[#9052](https://github.com/earendil-works/pi/issues/9052) — Fullscreen mode wheel scrolling is 3× slower** (9 comments, 4 👍)
   Scrolling in fullscreen TUI is markedly slower than regular mode despite users adopting it for the persistent input box. Signals a render-path performance regression.

3. **[#8928](https://github.com/earendil-works/pi/issues/8928) — Parallel pi startup "No API key found" for ~48s with expired OAuth** (7 comments, OPEN)
   Multi-process setups report a misleading "No API key found" while expired OAuth credentials are silently re-checked. Deterministic repro attached; `[inprogress]`.

4. **[#9311](https://github.com/earendil-works/pi/issues/9311) — Fullscreen mouse selection survives session switch** (6 comments)
   Text selections persist into newly opened/created sessions, leaking state across contexts. Fix is conceptually trivial (clear selection on switch).

5. **[#5372](https://github.com/earendil-works/pi/issues/5372) — Allow custom OAuth callback page rendering** (5 comments)
   External callers of Pi's OAuth flow want to plug in their own `oauthSuccessHtml` / `oauthErrorHtml` renderers instead of the hardcoded internal `renderPage()`.

6. **[#9098](https://github.com/earendil-works/pi/issues/9098) — Expose prompt disposition in RPC responses** (4 comments)
   Wants `data.disposition: "handled" | "queued" | "started"` on successful `prompt` RPC responses using Pi's preflight decision, so downstream tooling can distinguish started vs. intercepted prompts.

7. **[#9267](https://github.com/earendil-works/pi/issues/9267) — Reduce fuzzy session-search scan cost without changing ranking** (4 comments, 1 👍)
   Proposes replacing the per-char scan loop in `fuzzyMatch()` with `String.indexOf()` for a non-trivial speedup. Includes a concrete patch in the issue.

8. **[#9262](https://github.com/earendil-works/pi/issues/9262) — find tool: Windows-style glob patterns silently return no results** (4 comments)
   `find` accepts `src\**\*.ts` without error and returns nothing — agents and users copying native Windows paths get misleading empty results. Follow-up to #6817.

9. **[#9243](https://github.com/earendil-works/pi/issues/9243) — Session resume restores wrong model** (3 comments, 1 👍)
   `getSessionContextSettings` allows every assistant message to overwrite `model`, so an echoed model name from a provider response wins over the original routing decision on resume.

10. **[#7629](https://github.com/earendil-works/pi/issues/7629) — tui.select.pageUp/pageDown not handled in all select lists** (3 comments)
    Remapped `tui.select.pageDown`/`pageUp` bindings work in some pickers but not others, breaking keyboard-only workflows on keyboards without Page keys.

## Key PR Progress

1. **[#9096](https://github.com/earendil-works/pi/pull/9096) — feat(ai,coding-agent): add Meta provider with Muse subscription OAuth** *(OPEN)*
    Resolves #7543. Subscription-style OAuth with an unusual daily identity-token refresh rather than rolling refresh tokens; streaming is currently burst-flush behavior.

2. **[#9529](https://github.com/earendil-works/pi/pull/9529) — feat(ai): add Google Antigravity and Cursor Pro OAuth providers** *(CLOSED)*
    Adds two subscription-backed providers with browser OAuth (no API keys); Antigravity uses a local callback server on port 51123 plus manual-code fallback. Closes #9530.

3. **[#9517](https://github.com/earendil-works/pi/pull/9517) — feat(tui): group long tool-call runs** *(CLOSED)*
    Collapses ≥6 consecutive tool calls into an aggregate transcript row with click-to-expand, retaining failures. Includes rendering tests.

4. **[#9514](https://github.com/earendil-works/pi/pull/9514) — fix(tui): route hardcoded keys through configurable bindings** *(CLOSED)*
    Replaces hardcoded shortcuts in the editor/input/model picker with configurable keybindings, plus `Ctrl+C` clear-search and Shift-modified delete behavior.

5. **[#9531](https://github.com/earendil-works/pi/pull/9531) — feat(tree): add permanent branch deletion from session tree** *(CLOSED)*
    `SessionManager.pruneBranch()` + `countSubtree()`: removes an off-path entry and its whole subtree while preserving active path; `shift+d` shortcut wired to the selector.

6. **[#9523](https://github.com/earendil-works/pi/pull/9523) — Fix #9522: Pi's own blocking prompts now emit ui_prompt_start/_end** *(CLOSED)*
    Status integrations previously saw "waiting for user" for extension prompts but "running" for Pi's own model picker / settings / resume selectors; both paths now funnel through `showSelector()`.

7. **[#8635](https://github.com/earendil-works/pi/pull/8635) — fix(ai): preserve aborted stop reason during lazy setup** *(OPEN)*
    Threads the request abort signal through lazy stream setup wrappers and reports setup failures as aborted when the signal is already aborted; adds a regression test. Fixes #8409.

8. **[#9532](https://github.com/earendil-works/pi/pull/9532) — mahendra** *(CLOSED)*
    Empty/test PR, closed.

## Hot Discussions

**Q&A**
- **[#3373](https://github.com/earendil-works/pi/discussions/3373) — Which plugins/add-ons/extensions do you most enjoy using with the Pi agent?** (16 comments, 9 👍)
  Long-running thread soliciting extension recommendations; useful signal for the maintainers about which ecosystem add-ons are most valued.

**Show and Tell**
- **[#9525](https://github.com/earendil-works/pi/discussions/9525) — Thank you — `--mode rpc` is the backbone of a new open-source project** (0 comments, 1 👍)
  The author built [`web-agent`](https://github.com/kamilakis/web-agent), a phone-friendly dashboard + Siri/Matrix bridges around one persistent Pi session. Strong validation that the RPC mode is becoming a stable integration surface.

**General / Compatibility**
- **[#9516](https://github.com/earendil-works/pi/discussions/9516) — openai-responses: tool-result images in `function_call_output` dropped by compatible gateways** (1 comment, 1 👍)
  Mirror of issue #9518, surfacing that the Responses encoding differs from Completions and is being dropped by intermediate gateways.

## Feature Request Trends

- **More subscription-based OAuth providers** (Meta/Muse, Google Antigravity, Cursor Pro) — recurring demand to lower the API-key friction.
- **Improved session-tree ergonomics** — permanent branch deletion (#9531), fork-from-current-point (#9533), `Ctrl+F` to clone from `/resume` (#9521).
- **Extension/RPC API completeness** — prompt disposition in responses (#9098), blocking-prompt event coverage (#9522), non-racy notification alternatives (#9462), custom OAuth callback rendering (#5372).
- **Cross-platform parity (especially Windows)** — glob separators (#9262), bash timeout kill (#9129), and broader Windows QA.
- **Configurable TUI behavior** — keybindings for fullscreen scroll/paging (#9052, #7629, #9514) and window-relative compaction budgets (#9415).

## Developer Pain Points

- **Silent failures**: invalid prompt-template frontmatter (#9354), Windows globs (#9262), `stream_read_error` not classified as retryable (#9520), `user_bash` falling back to host on extension exception (#9068). Users consistently ask for parity with skill-style warnings.
- **Provider / transport fragility**: `openai-codex` stuck-stream #4945 (by far the loudest), Codex transport lacking a non-resetting per-request deadline (#9474), Vertex rejecting `THINKING_LEVEL_MINIMAL` on Gemini 3 Flash (#9535), OpenRouter dropping signature-only reasoning (#9534).
- **Cross-platform bugs**: Windows glob paths, MSYS2 pipeline orphans on bash timeout (#9129), Bun-installer ending up on Node (#5365, now closed).
- **API inconsistency / observability gaps**: prompt disposition not exposed (#9098), blocking-prompt events missing for Pi's own dialogs (#9522), `ctx.ui.notify` last-wins races (#9462).
- **Performance regressions reported by users**: 3× slower wheel scroll in fullscreen (#9052) and fuzzy-search scan cost (#9267) — both with measurable repros and proposed fixes.
- **Session restoration correctness**: wrong model restored from echoed assistant messages (#9243); false-positive `Cache miss` notices on local vLLM after a cloud model (#9013).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-13

## Today's Highlights

The Qwen Code team shipped nightly **v0.23.3-nightly.20260912** and landed several architecturally important PRs, most notably **container-based execution for subagents** (#11711) and **structured on-demand memory recall** (#10183). On the issue side, a recurring **React #185 crash in the TUI when background agents complete** (#11500, #11732) and a **telemetry data-privacy leak that ships raw tool errors to RUM** (#11198) are the two highest-priority signals to watch. The umbrella direction of **separating the agent harness from the execution environment** (#11695) is now backed by concrete Track A and Track B PRs, marking the most significant runtime refactor of this cycle.

---

## Releases

- **v0.23.3-nightly.20260912.54aa66834b** — DingTalk channel cleanup (removed obsolete background response aggregation, #11570) and continued work on channel removals. No user-facing changelog summary was published for this nightly.
  - Release: https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3-nightly.20260912.54aa66834b

---

## Hot Issues

1. **#11500 — TUI exits silently with React #185 when background agents complete** *(P1, OPEN, 10 comments)*
   Multiple background subagents finishing in quick succession trigger Ink's `useBoxMetrics` layout-listener `setState` loop and overflow React's update depth. The process drops back to the shell with no rendered error. A second report (#11732) confirms the same crash on a long-running monitor task. Highest-impact stability bug of the cycle.
   https://github.com/QwenLM/qwen-code/issues/11500

2. **#10065 — LM Studio 0.4.21 fails to parse grammar with no MCP / empty tools.core** *(P2, CLOSED)*
   Local-inference users on LM Studio hit `failed to parse grammar` even with `tools.core=[]`. Closure signals a fix landed; users should retest against the current nightly.
   https://github.com/QwenLM/qwen-code/issues/10065

3. **#7771 — Persisted `mcp_config` not loaded into the main-process MCP proxy on restart** *(CLOSED)*
   Qwen Desktop's Electron main process drops the persisted MCP config on launch, breaking IPC into MCP tools after a restart. Affects every Desktop user with saved servers.
   https://github.com/QwenLM/qwen-code/issues/7771

4. **#11732 — Qwen Code 0.23.3 crashes with React #185 while a native monitor task is still running** *(P1, OPEN)*
   Independent reproduction of #11500: the crash interleaves with long-running native monitor output rather than only on simultaneous subagent completions. Strengthens the case that the root cause is in shared layout metrics, not in the subagent pipeline.
   https://github.com/QwenLM/qwen-code/issues/11732

5. **#11695 — Tracking: separate the agent harness from the execution environment** *(P2, OPEN, 5 comments, umbrella)*
   The umbrella direction backing PRs #11711 (container backend) and #11746 (SSH backend). Frames the next-architecture story: tools should run in an addressable runtime, not in the agent's own process. Critical read for anyone touching subagents or sandboxes.
   https://github.com/QwenLM/qwen-code/issues/11695

6. **#11704 — Proposal: official Android companion client for `qwen serve` over ACP** *(P3, OPEN, 5 comments)*
   Author offers to build and maintain an MVP. As a thin ACP client on top of `qwen serve` rather than embedding the full runtime, this is the first credible mobile story. Community reception is engaged; worth tracking for scope and review.
   https://github.com/QwenLM/qwen-code/issues/11704

7. **#11465 — `session-workflow-cockpit-light` renders nondeterministically (1.31% pixel diff)** *(P3, OPEN)*
   Visual-preview smoke CI flips between clean and diff runs of the same commit, blocking publication. Indicator that deterministic-snapshot tooling for the web-shell preview still has gaps.
   https://github.com/QwenLM/qwen-code/issues/11465

8. **#10953 — Todo plan goes stale while work is delegated to subagents** *(CLOSED)*
   A Todo plan froze for 55m44s while four subagent nodes advanced; `todo_write` mirror stayed correct, but the active-todo reminder never fired. Important dogfooding signal for subagent roadmap.
   https://github.com/QwenLM/qwen-code/issues/10953

9. **#11728 — Close the remaining fail-open gaps in the REST docs contract guard** *(P3, OPEN)*
   The new contract guard can pass while the property in its name doesn't hold. Follow-up to #11592; CI-quality bar work.
   https://github.com/QwenLM/qwen-code/issues/11728

10. **#11198 — Telemetry uploads raw tool-error text (incl. shell command lines) to RUM without redaction** *(P1, OPEN, security)*
    Default-on usage stats ship shell command lines and unredacted error bodies. The most serious privacy finding of the cycle; complements the closed #11666 (`logPrompts=false` violation).
    https://github.com/QwenLM/qwen-code/issues/11198

Other notable: **#11720** (cron returns a past instant during repeated DST hour, CLOSED), **#11718** (Desktop AppImage `PYTHONHOME`/`PYTHONPATH` leak into stdio MCP servers), **#11499** (`${VAR}` placeholders in `.mcp.json` not expanded), **#11724** (7 GB memory ceiling in long-running CLI), **#11710** (VP mode leaves dirty terminal state on exit), **#10834** (MCP tool images bypass `read_file` image budget).

---

## Key PR Progress

1. **#11711 — Container execution for subagents** *(OPEN)*
   Opt-in Docker/Podman backend via `QWEN_AGENT_EXECUTION_BACKEND`, selectable per `Agent` tool invocation with `execution_backend: "container"` and optional `isolation: "worktree"`. This is the **Track A** implementation of #11695 and the foundation the SSH backend (#11746) will build on.
   https://github.com/QwenLM/qwen-code/pull/11711

2. **#11746 — SSH transport for the execution worker** *(OPEN, blocked on #11711)*
   Adds a third `ExecutionEnvironment` (alongside `local` and `container`) that reaches remote hosts over SSH. Deliberately not part of #11698; carries the discussion of how Track A and Track B interlock.
   https://github.com/QwenLM/qwen-code/pull/11746

3. **#10183 — Structured on-demand memory recall** *(OPEN)*
   Replaces the flat auto-memory body dump with a two-level ref/title tree pushed on corpus change, a query-focused metadata subtree on relevant turns, and a dedicated recall tool. Significant shift in how managed memory scales.
   https://github.com/QwenLM/qwen-code/pull/10183

4. **#11538 — Select the OpenAI API per model** *(OPEN)*
   Adds `api: "chat-completions" | "responses"` to model entries under `modelProviders.openai`, letting the same provider mix endpoints per model. Closes a long-standing gap with the Responses endpoint.
   https://github.com/QwenLM/qwen-code/pull/11538

5. **#11540 — Move review base-tree reuse fence off the bind-mounted sandbox dir** *(OPEN)*
   Persists run identity and the capture's merge base in `.qwen/review-leases` (host-side, unmounted) instead of `.qwen/tmp` (read-write inside the sandbox). Closes a real correctness gap in `/review`.
   https://github.com/QwenLM/qwen-code/pull/11540

6. **#11289 — Keep mid-turn messages the daemon rejects at idle** *(OPEN)*
   When a typed message is refused because the session has already gone idle, the daemon now tells the client to send it as an ordinary prompt instead of returning a bare refusal.
   https://github.com/QwenLM/qwen-code/pull/11289

7. **#11686 — Record a default deadline in `/review` plans** *(OPEN)*
   Every `/review` run — not just CI-launched ones — now gets a wall clock; default is sized from diff topology when the caller doesn't pass `--deadline`.
   https://github.com/QwenLM/qwen-code/pull/11686

8. **#10410 — Preserve prompt cache for deferred tools** *(OPEN)*
   Replaces the "reveal schema by mutating the tool list" hack with a two-step `tool_search` / `tool_call` bridge that keeps the declared tool list stable. Material token-cost reduction for tool-heavy agents.
   https://github.com/QwenLM/qwen-code/pull/10410

9. **#11692 — Configurable `web_search` budget + bounded extractor fallback** *(OPEN)*
   New `tools.webSearch.timeoutMs` (env `WEB_SEARCH_TIMEOUT_MS`), default raised to 120s, with a bounded fallback the model sees when the search times out.
   https://github.com/QwenLM/qwen-code/pull/11692

10. **#9466 — Anchor rewind mapping to stable prompt identity** *(OPEN)*
    Rewind now resolves a target prompt through persisted prompt identity rather than positional turn order, surviving resume, headless `-p --resume`, and any surface that reorders turns.
    https://github.com/QwenLM/qwen-code/pull/9466

Other moving PRs: **#11086** (scope extensions to workspace runtimes), **#10906** (show shell + monitor output in web-shell), **#11727** (let the producer's own budget size shell output), **#11644** (web-shell loads metadata on demand), **#11731** (retry transient `npm ci` failures), **#11745** (gate DST tests off Windows), **#11557** (realign two suites with shipped behavior to unbreak main CI), **#9305** (bottom-align short VP content), **#10455** (don't crash startup when output-language file is unwritable).

---

## Hot Discussions

*No Discussions data was provided in this digest's source.* If the project enables GitHub Discussions, expect the next digest to include threads on the agent-harness split (#11695) and the Android companion proposal (#11704).

---

## Feature Request Trends

Across issues and PRs, the same directions keep converging:

- **Pluggable, addressable execution environments.** Subagent tools should run in `local`, `container`, or `ssh` backends selected per invocation (#11695, #11711, #11746).
- **Thin-client over `qwen serve`.** Mobile / external surfaces connect via ACP rather than re-hosting the runtime (#11704).
- **Structured memory instead of flat dumps.** On-demand recall trees with explicit ref/title metadata (#10183).
- **Stable tool-list semantics.** Prompt cache survives deferred-tool revelation via `tool_search`/`tool_call` (#10410).
- **Per-model API selection on OpenAI-compatible providers.** `chat-completions` vs `responses` at the model entry (#11538).
- **Bounded, configurable tool budgets.** `web_search` timeout (#11692), shell-output sizing (#11727), MCP image budget (#10834).
- **Claude-Code-compatible hook contract.** Plain-text stdout, `stop_hook_active`, timeout units, matchers, common input (#11610).
- **Rewind anchored to identity, not position.** Stable across resume, headless, and reordering surfaces (#9466).

---

## Developer Pain Points

- **TUI crashes that look like silent exits.** React #185 from Ink's `useBoxMetrics` listener is the dominant crash signature this week; reproductions in two independent setups (#11500, #11732).
- **Telemetry / privacy leaks.** Raw tool-error text including shell command lines is being uploaded to RUM by default (#11198); `logPrompts=false` is also being violated (#11666). Telemetry redaction is clearly under-tested.
- **MCP correctness gaps.** Persisted config not loaded on restart (#7771), `${VAR}` placeholders not expanded (#11499), image results bypassing the visual budget (#10834), AppImage `PYTHONHOME` leaking into stdio servers (#11718). MCP integration is fragile across surfaces.
- **Provider / model interoperability.** LM Studio grammar parsing (#10065) and Fireworks tool-call continuation 400s (#11657) show the provider-compat matrix still has rough edges.
- **Cron & time-zone correctness.** Next-fire calculation during the repeated autumn DST hour returns a past instant (#11720); channel loops can re-fire in the same scheduled minute.
- **Long-session resource ceiling.** 7 GB memory on Windows with no crash-safe resume path (#11724) is a real blocker for "leave it running" workflows.
- **CI flake on macOS E2E shards.** Bounded retry recipe being propagated from Linux → macOS (#11134); also `npm ci` transient failures (#11731) and web-shell smoke budget overruns (#11736).
- **Deterministic visual previews.** Nondeterministic rendering of the same commit at 1.31% pixel diff (#11465)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*