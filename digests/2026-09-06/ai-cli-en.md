# AI CLI Tools Community Digest 2026-09-06

> Generated: 2026-09-06 13:00 UTC | Tools covered: 7

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

# AI CLI Tools Cross-Comparison Report — 2026-09-06

*Sources: community digests for Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, OpenCode, Pi, Qwen Code*

---

## 1. Ecosystem Overview

The AI CLI category has consolidated into two strategic camps: big-lab clients (Claude Code, Codex, Gemini CLI, Copilot CLI, Qwen Code) competing on platform depth, and provider-agnostic independents (OpenCode, Pi) competing on openness and extensibility. All seven tools are converging on the same agent-platform feature set — multi-agent orchestration, skills/hooks, MCP, remote control, headless operation — while differentiating on distribution: Codex is building a native voice runtime, Qwen Code is pushing IM-channel control planes (DingTalk) and a daemon/WebShell architecture, and Copilot CLI is deepening enterprise/data-residency support. This cycle's defining story is that **reliability, not capability, is the bottleneck**: every tracker is dominated by session persistence, resume correctness, silent failure modes, and billing/quota trust issues. Windows is the single largest cross-ecosystem friction source, appearing in the pain list of all seven communities.

---

## 2. Activity Comparison

| Tool | Issues (hot / new today) | PRs (activity) | Discussions | Release (24h) |
|---|---|---|---|---|
| **Claude Code** | 10 / 3 | 4 (3 substantive, 1 spam) | N/A* | ✅ v2.1.263 |
| **OpenAI Codex** | 10 / 2 | ~32 closed | 5 active threads | — none |
| **Gemini CLI** | 10 / n.d. | 10 (6 open, 4 closed) | N/A* | ✅ v0.60.0-nightly |
| **Copilot CLI** | 10 / — | 0 (no updates) | N/A* | — none |
| **OpenCode** | 10 / ~4 | ~20 updated | N/A* | — none |
| **Pi** | 10 / — (≈20 of 30 tracked closed today) | ~15 (6 open, 9 closed) | 2 (via labeled issues) | — none |
| **Qwen Code** | 10 / 3 (+~9 auto-filed CI/release failures) | 12+ | N/A* | ⚠️ 2 shipped (v0.23.0-nightly, v0.23.1-preview.0); preview.1 failed 5× |

\* *N/A = no data provided for this channel in the digest cycle (channel unavailable or not ingested); this is explicitly **not** treated as inactivity. Issue/PR counts reflect items surfaced in today's digests, not total tracker volume.*

**Observations:**
- **Codex shows the highest engineering throughput** (~32 closed PRs, notably bot-authored) despite no release; Qwen ships the most builds but with CI debt (one release failed five consecutive times).
- **Pi shows the highest triage velocity**: roughly two-thirds of 30 tracked issues closed, including a same-day fix for a startup auth race (PR #9233).
- **Copilot CLI is the outlier**: entirely issue-driven this cycle — no releases, PRs, or discussion data — consistent with a vendor-paced, enterprise-oriented development model.

---

## 3. Shared Feature Directions

| Direction | Tools & Evidence |
|---|---|
| **Cross-device session sync & portability** | Codex #14067 (61👍, top-voted idea), Claude Code #81658/#47926, Copilot CLI #3498 (mobile rendering of remote sessions). Sessions are increasingly expected to be portable artifacts, not local state. |
| **Resume/session-history correctness** | Codex ordinal freezes unfixed in 0.153.4 (#41079, #43142, #43124); Qwen Code #11180 (hooks stop enforcing after `--continue`); Claude Code #82476 (directives lost at compaction); OpenCode wedged headless sessions (#47610). The most universal correctness theme. |
| **Skills/hooks lifecycle completeness** | Claude Code Function Hooks proposal #91870 (114💬) + arg-substitution bug #92457; Qwen Code #11180/#11068/#11184; Gemini CLI #21968 (skills unused without explicit prompting); OpenCode PR #47595 (persistent skill preferences). |
| **Unattended/headless agent operation** | OpenCode #47610/#47485 (retry-on-busy, compaction cost control); Claude Code #89439 (scheduled-task model pinning); Qwen Code daemon/`serve` work; Codex reproducible transcripts (PR #43110). CI/agent-substrate usage is now a first-class persona. |
| **Cost & quota transparency** | Copilot CLI #4720 (BYOK prompt caching silently disabled, ~5× cost), #4733 (truncation data loss); Codex #41957 (9× quota consumption) + community-built CodexFuse dashboard; OpenCode Go billing cluster (#47547, #47613, #47614, #45278). |
| **MCP auth & scale hardening** | Codex #39054/#42427 (OAuth retry loops, DCR discovery); Copilot CLI #4695 (token cache-key duplication); Gemini CLI #29117 (RFC 9207), #29205, #24246 (>128 tools → HTTP 400). |
| **Windows/WSL as first-class target** | Codex (#41463 WSL project creation, #27117 update plumbing, #28919 Remote Control parity), Claude Code MSIX/AppX cluster, Gemini CLI PR #29184 (sandbox validation), Pi #9229/#7547, Copilot CLI #4652 (Windows 25H2). |

---

## 4. Differentiation Analysis

| Tool | Center of Gravity | Distinctive Signal This Cycle |
|---|---|---|
| **Claude Code** | Deep extensibility for plugin power users | Function Hooks (#91870) proposes middleware-style (`next()`) interception — the most advanced extensibility discourse in the ecosystem; pain concentrated in Windows packaging and long-session context fidelity. Anthropic-model-bound. |
| **OpenAI Codex** | Platform breadth expansion | ~13-PR reproducible native **voice toolchain** (WebRTC/Opus, Windows-first Bazel targets), Remote Control, `/worktree` — the most aggressive surface-area growth; heavy bot automation in its contribution pipeline. |
| **Gemini CLI** | Correctness, security, and interop | Migration fixes targeting Claude Code users (hook timeout seconds→ms, PR #29125) plus sandbox/OAuth hardening — actively competing on **absorption of other tools' users**. |
| **Copilot CLI** | Enterprise & GitHub-native | GHEC data-residency fix (#4527), org model-policy parity (#4692); unique exposure on **BYOK cost mechanics** (#4720) given its bring-your-own-key positioning. |
| **OpenCode** | Provider-agnostic agent substrate | Engineering focused on storage/lifecycle (incremental SQLite auto-vacuum, SSE timeouts, retry budgets); biggest risk is **its own subscription billing reliability**, not the product. |
| **Pi** | Lightweight, multi-provider client | Pluggable backends (Ollama, OpenRouter, Vercel gateway, Meta Muse, LLM Gateway), extension-first architecture, Nix packaging culture; interestingly its top issues are **other vendors' reliability problems** (#4945 codex hangs, #9212 gateway truncation). |
| **Qwen Code** | Multi-channel distribution & daemon architecture | DingTalk interactive approval cards, WebShell workflow visualization, workspace-scoped daemon; fastest release cadence, but paying for it with CI determinism debt and a bot-triage backlog. |

---

## 5. Community Momentum & Maturity

- **Momentum leaders:** Codex (throughput + top-voted discussion), OpenCode (~20 PRs and 4 fresh billing reports in one day), Qwen Code (3+ community features filed today), Pi (highest close-rate and same-day fixes).
- **Engagement depth:** Claude Code's Function Hooks (114 comments over ~1 week) and Pi's codex-hang thread (76 comments over 4 months, #4945) show the most sustained expert engagement; Codex's sync request (61👍) is the strongest single demand signal.
- **Maturity debt:** Vendor-run repos accumulate long-tail issues — Claude Code #53247 (open since April) and #14131 (~9 months), Codex #28919 (~3 months) — and fast cadences generate recurring regressions (Claude Code peer-messaging break #92258; Copilot worktree regression #4734; Pi 0.85.1 broken exports #9226; Qwen preview.1 failing 5×).
- **Responsiveness as differentiator:** Pi closed ~2/3 of tracked issues within a day — small community, best signal-to-noise. Copilot CLI shows the slowest public iteration loop, balanced by tangible enterprise fixes (#4527, #4272 closed).

---

## 6. Trend Signals

1. **Silent failure is the #1 trust eroder.** False success states (Gemini #22323), user text swallowed into "Thought for Ns" (Copilot #4735), stalled-but-alive histories (Codex #41079), no-op tool calls (Copilot #4706), invisible 5× cost multipliers (Copilot #4720). *Reference value:* observability and honest state reporting will be the next competitive frontier — budget for it in tool selection and in your own agent builds.
2. **Hooks/skills are becoming a security surface.** Qwen's P1 (#11180 — safety-gate hooks silently unenforced after resume) shows policy enforcement must survive session lifecycle transitions; Claude Code's Function Hooks shows demand for middleware-grade interception. Treat hook enforcement gaps as vulnerabilities, not UX bugs.
3. **Agents as unattended CI substrates are now a standard persona.** Bounded retries, resume determinism, and compaction cost control (OpenCode #47610/#47485, Pi #8826) are becoming procurement criteria, not nice-to-haves.
4. **Token accounting ≠ real resource cost.** Codex #41338 (230 tokens but 4.2 MB on the wire) breaks context-management assumptions; users are already building their own quota dashboards (CodexFuse). Expect demand for first-party cost-telemetry APIs.
5. **Windows/WSL remains a systemic gap** across all seven tools — packaging (MSIX/AppX), DPI/input handling, and update plumbing are recurring liabilities. It is both the biggest user pain and the clearest differentiation opportunity.
6. **Cross-device sync is the loudest unsolved ask** (Codex #14067) — corroborated by Claude Code's sync-failure trust issues (#81658).
7. **AI is now building AI tools** — bot-authored PRs dominate Codex's merged work, autofix agents fight Qwen's CI, and Copilot's #4706 was filed by the agent itself. The efficiency gain is real, but so is triage noise (Qwen's deferred-findings backlog); communities that curate bot output will out-iterate those that drown in it.

---
*Report generated 2026-09-06 from per-repo community digests; issue/PR identifiers reference the respective upstream trackers.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — Community Highlights Report

**Repository:** [anthropics/skills](https://github.com/anthropics/skills) · **Data as of:** 2026-09-06

> **Data note:** PR comment counts were unavailable (`undefined`) in this dataset. The ranking below follows the repository's engagement-based ordering, corroborated by linked issue threads, update activity, and cross-references. All 20 top PRs remain **OPEN** (none merged).

---

## 1. Top Skills Ranking (Most-Discussed PRs)

1. **skill-creator eval overhaul — [PR #1298](https://github.com/anthropics/skills/pull/1298)**
   Fixes `run_eval.py` reporting `recall=0%` on every description — the root failure behind [Issue #556](https://github.com/anthropics/skills/issues/556) (12 comments, 10+ independent reproductions). Installs eval artifacts as real skills; fixes Windows stream reading, trigger detection, and parallel workers. Parallel fixes exist in [#1099](https://github.com/anthropics/skills/pull/1099) and [#1050](https://github.com/anthropics/skills/pull/1050). **Status: OPEN.**

2. **document-typography — [PR #514](https://github.com/anthropics/skills/pull/514)**
   Typographic quality control for AI-generated documents: orphan-word wrap, widow headers, numbering misalignment. Framed as an always-on polish layer users "rarely ask for but always expect." **Status: OPEN.**

3. **skill-quality-analyzer + skill-security-analyzer — [PR #83](https://github.com/anthropics/skills/pull/83)**
   Two meta-Skills grading SKILL.md structure, documentation, and security across weighted dimensions. Directly anticipates the repo's biggest trust concern ([Issue #492](https://github.com/anthropics/skills/issues/492)). Long-pending since Nov 2025. **Status: OPEN.**

4. **frontend-design clarity revision — [PR #210](https://github.com/anthropics/skills/pull/210)**
   Rewrites guidance so every instruction is single-conversation actionable — echoing the "skills should instruct, not educate" critique in [Issue #202](https://github.com/anthropics/skills/issues/202) (closed). **Status: OPEN.**

5. **ODT Skill — [PR #486](https://github.com/anthropics/skills/pull/486)**
   OpenDocument creation, template filling, and ODT→HTML conversion — extends the document suite beyond pdf/docx/xlsx/pptx into open formats. **Status: OPEN.**

6. **self-audit — [PR #1367](https://github.com/anthropics/skills/pull/1367)**
   Pre-delivery quality gate: mechanical file-existence verification, then a four-dimension reasoning audit in damage-severity order; companion proposal in [Issue #1385](https://github.com/anthropics/skills/issues/1385). **Status: OPEN.**

7. **Hivemind multi-agent orchestration — [PR #1628](https://github.com/anthropics/skills/pull/1628)**
   Delegates mechanical work to headless opencode workers on free models, with Claude Code as sole planner/reviewer/merger — a token-economics answer to context scarcity ([Issue #1487](https://github.com/anthropics/skills/issues/1487)). **Status: OPEN.**

8. **ServiceNow platform Skill — [PR #568](https://github.com/anthropics/skills/pull/568)**
   Broad enterprise coverage (ITSM, ITOM, SecOps, HRSD, CSM, IntegrationHub) rather than a narrow scripting helper; the longest-lived active submission (updates spanning Mar–Aug 2026). **Status: OPEN.**

*Honorable mention:* Lubrsy706's fix trio — [#538](https://github.com/anthropics/skills/pull/538) (pdf case-sensitivity), [#541](https://github.com/anthropics/skills/pull/541) (docx OOXML `w:id` collision corrupting documents), [#539](https://github.com/anthropics/skills/pull/539) (YAML description validation) — high-signal correctness fixes from one prolific contributor.

---

## 2. Community Demand Trends (from Issues)

- **Security & provenance verification** — the dominant theme. [#492](https://github.com/anthropics/skills/issues/492) (43 comments — the repo's most active thread) documents community skills impersonating official ones under the `anthropic/` namespace; reinforced by [#1175](https://github.com/anthropics/skills/issues/1175) (permission logic in SKILL.md). Demand: signed, verified namespaces.
- **Enterprise distribution & org sharing** — [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 👍8) wants native org skill libraries instead of Slack/Teams file handoffs; [#189](https://github.com/anthropics/skills/issues/189) (👍9) reports duplicate skills bloating context across plugins.
- **Dependable authoring & evaluation tooling** — [#556](https://github.com/anthropics/skills/issues/556) (12 comments) exposed a broken eval harness, spawning four fix PRs (#1298, #1099, #1050, #1602); [#202](https://github.com/anthropics/skills/issues/202) demanded best-practice skill-creator guidelines; [#1385](https://github.com/anthropics/skills/issues/1385) proposes reasoning-quality pipelines.
- **Context efficiency** — [#1487](https://github.com/anthropics/skills/issues/1487) reports `claude-api` eagerly injecting ~156k tokens; [#1329](https://github.com/anthropics/skills/issues/1329) proposes a **compact-memory** Skill (symbolic notation for agent state). Demand: token-budgeted, lazy-loading skills.
- **Orchestration & portability** — [#16](https://github.com/anthropics/skills/issues/16) (Skills-as-MCP), [#412](https://github.com/anthropics/skills/issues/412) (agent-governance, closed), [#29](https://github.com/anthropics/skills/issues/29) (Bedrock support).
- **Domain expansion niches** — enterprise platforms (ServiceNow), HPC/Slurm, retro game dev, social scheduling, typography, testing patterns.

---

## 3. High-Potential Pending Skills (Open, May Land Soon)

| PR | Skill | Why it may land soon |
|---|---|---|
| [#568](https://github.com/anthropics/skills/pull/568) | **servicenow** | 5-month active review window (Mar→Aug 2026); clear enterprise demand |
| [#1298](https://github.com/anthropics/skills/pull/1298) | **skill-creator eval fix** | Unblocks the repo's most-reproduced bug (#556); consolidates three prior fix attempts |
| [#1367](https://github.com/anthropics/skills/pull/1367) | **self-audit** | Mature v1.3.0, backed by active proposal #1385 |
| [#514](https://github.com/anthropics/skills/pull/514) | **document-typography** | Universally applicable, low-dependency, aligned with output-quality trend |
| [#486](https://github.com/anthropics/skills/pull/486) | **odt** | Fills the open-format gap in the document suite |
| [#723](https://github.com/anthropics/skills/pull/723) | **testing-patterns** | Comprehensive stack (Trophy model, AAA, RTL) matching test-generation demand |
| [#525](https://github.com/anthropics/skills/pull/525) | **pyxel** | Authored by the Pyxel engine creator; MCP-integrated |
| [#1628](https://github.com/anthropics/skills/pull/1628) / [#1627](https://github.com/anthropics/skills/pull/1627) | **Hivemind / buffer-api** | Fresh Aug-2026 wave targeting multi-agent orchestration and agent-agnostic APIs |

Also likely: small, low-risk fixes — [#1607](https://github.com/anthropics/skills/pull/1607) (retired model IDs, fixes #1603) and [#1602](https://github.com/anthropics/skills/pull/1602) (mcp-builder eval serialization, addresses [#1390](https://github.com/anthropics/skills/issues/1390)).

---

## 4. Skills Ecosystem Insight

**The community's most concentrated demand is not for more Skills but for trustworthy Skills infrastructure — verified namespaces/provenance, organizational distribution, and dependable authoring/evaluation tooling — signaling the ecosystem's shift from skill quantity to skill trust and lifecycle reliability.**

---

# Claude Code Community Digest — 2026-09-06

## 1. Today's Highlights

Claude Code shipped **v2.1.263** (bug fixes and reliability improvements), but community attention is on regressions rather than the release: cross-session peer messaging (`SendMessage`/`ListAgents`) broke for Windows desktop users after the 2.1.258→2.1.260 update, and three fresh bugs were filed today around multi-agent tooling. The dominant discussion remains the **Function Hooks** proposal (#91870, 114 comments), which sketches an Express/Koa-style continuation model for deeply extensible plugins. Meanwhile, the long-running Windows MSIX install/launch failure cluster continues to accumulate root-cause analyses from users.

## 2. Releases

- **v2.1.263** — Generic "bug fixes and reliability improvements" changelog; no itemized notes. Ships while users are still triaging the 2.1.258–2.1.260 peer-messaging regression ([#92258](https://github.com/anthropics/claude-code/issues/92258)), which several users note makes it hard to know whether a fix landed.

## 3. Hot Issues

1. **[Function Hooks — make plugins 10x more powerful](https://github.com/anthropics/claude-code/issues/91870)** (#91870, OPEN, 114 💬 / 73 👍) — The week's most active thread. A community design proposal for a `$`-object-based hook API with side-effect tracking and registration-order `next()` composition. Strong engagement suggests plugin authors want far deeper interception points than current hooks offer.

2. **[Claude Desktop fails to launch on Windows — orphaned Silo/Job Object](https://github.com/anthropics/claude-code/issues/53247)** (#53247, OPEN, 67 💬) — After an app crash, an orphaned job object blocks relaunch (HRESULT 0x80070020) until logoff/reboot. Open since April; new root-cause work in [#91763](https://github.com/anthropics/claude-code/issues/91763) implicates `git fsmonitor--daemon` inheriting the AppX container job and surviving forced update shutdowns — includes a no-reboot workaround.

3. **[German umlauts randomly replaced with ASCII substitutes](https://github.com/anthropics/claude-code/issues/14131)** (#14131, OPEN, 41 💬) — Long-standing localization bug where ä/ö/ü become ae/oe/ue nondeterministically. Has repro; still open after ~9 months, making it a touchpoint for non-English users.

4. **[Windows installer fails with 0x80073CF6 after inconsistent prior install](https://github.com/anthropics/claude-code/issues/49917)** (#49917, OPEN, 38 💬) — The hub issue for a cluster of MSIX failures (see also closed duplicates #68792, #73734, #87314). Users are sharing manual `C:\ProgramData\Packages` cleanup recipes since no official fix has shipped.

5. **[Cross-platform sync failure — Cowork conversations disappear](https://github.com/anthropics/claude-code/issues/81658)** (#81658, OPEN, 17 💬) — Suspected server-side incident causing chats to vanish across Desktop/Web/Android. Matters because it undermines trust in cloud-stored sessions.

6. **[SendMessage/ListAgents broken after 2.1.258 → 2.1.260](https://github.com/anthropics/claude-code/issues/92258)** (#92258, OPEN, regression) — Cross-session peer messaging stopped working after a background update on Windows. Related: [#92409](https://github.com/anthropics/claude-code/issues/92409) (SendMessage tool absent from toolset while ListAgents advertises it) and [#91139](https://github.com/anthropics/claude-code/issues/91139) (message delivery kills the recipient's in-flight background Bash tasks). A fragile spot in the multi-agent story.

7. **[Skill/command argument substitution off by one](https://github.com/anthropics/claude-code/issues/92457)** (#92457, OPEN, filed today, has repro) — `$0`/`$1` map to `args[0]`/`args[1]` instead of the documented 1-indexed convention, and `$2`–`$9` are never substituted. Directly breaks skill/command authors; small but high-leverage fix.

8. **[Opt-out for find→bfs / grep→ugrep shadow functions](https://github.com/anthropics/claude-code/issues/69736)** (#69736, OPEN, 12 💬) — The Bash tool silently replaces `find`/`grep` with bundled `bfs`/`ugrep` via shell snapshots. Users want transparency and an escape hatch when shim behavior diverges from system binaries.

9. **[Session rot, directive violations, and manual handover before autocompact](https://github.com/anthropics/claude-code/issues/82476)** (#82476, OPEN) — Latest in a well-documented series (#81988, #80938, #85754) on CLAUDE.md directives being silently dropped in long sessions/compaction, with no signal at transition and unverified handover. A recurring trust issue for power users.

10. **[Scheduled Tasks: "model" field not persisted](https://github.com/anthropics/claude-code/issues/89439)** (#89439, OPEN, has repro) — Model pinning is silently ignored for tasks in the `claude-code-sessions` workspace. Pairs with (now-closed) #78558 on headless task hangs — routines/cloud scheduling still feels under-hardened.

## 4. Key PR Progress

Only 4 PRs saw activity in the window; three are substantive community fixes to the plugin/agent validation toolchain:

1. **[fix(pr-review-toolkit): repair invalid YAML frontmatter in all agents](https://github.com/anthropics/claude-code/pull/87077)** (#87077) — Agent descriptions containing unquoted dialogue lines parsed as nested mappings, loading agents with empty frontmatter. Fixes silent breakage of the toolkit's agents.

2. **[fix(security-guidance): make `**` glob patterns match zero-depth paths](https://github.com/anthropics/claude-code/pull/87079)** (#87079) — `fnmatch`-based matching made `**/*.ts` require a literal `/`, silently excluding top-level files from security rules despite the documented "any depth" contract. Security-relevant because the failure mode is silent non-coverage.

3. **[validate-agent.sh: don't abort at first warning; stop false-flagging valid agents](https://github.com/anthropics/claude-code/pull/89404)** (#89404) — Fixes three `set -euo pipefail` interactions that made the plugin-dev skill's validator fail on its own agent files. Fixes public issue #83803.

4. **[#56176 "Claude/book outline bootstrap toolkit"](https://github.com/anthropics/claude-code/pull/56176)** — Title/body appear incoherent; likely spam or accidental submission. Maintainers will presumably close.

## 5. Hot Discussions

*Omitted — no discussion data was provided in this cycle's dataset.*

## 6. Feature Request Trends

- **Deeper plugin extensibility**: Function Hooks (#91870) is the clearest signal — developers want safe, composable interception of core behavior, not just lifecycle event hooks.
- **Session portability & sync resilience**: resuming sessions across devices (#47926, closed as duplicate of a tracked request) and reliable cloud sync (#81658).
- **Transparency and opt-outs for injected behavior**: escape hatches for `bfs`/`ugrep` shims (#69736); visible signals when server-side flags disable bundled skills (#83565).
- **Scheduled-task hardening**: persistent model pinning (#89439) and reliable headless execution.
- **Long-context fidelity**: keeping CLAUDE.md directives alive through compaction, plus verified/automated handover at context limits (#82476 and related series).
- **Fix-quality preferences**: prefer complete fixes over quick workarounds when effort is low (#80003).

## 7. Developer Pain Points

- **Windows packaging lifecycle is the #1 recurring pain**: a months-long cluster of MSIX/AppX failures (0x80073CF6 installs, 0x80070020 launches, ENAMETOOLONG in Cowork) with community-derived root causes (orphaned job objects, ACL-corrupted package dirs, daemons inheriting the AppX container) but no consolidated official fix. Reboot-free recovery remains user-discovered.
- **Regression risk in the fast release cadence**: 2.1.196 introduced the sandbox E2BIG regression (#73437); 2.1.258→2.1.260 broke peer messaging (#92258). Opaque release notes ("bug fixes and reliability improvements") make it hard to correlate fixes and regressions.
- **Silent context degradation**: directive loss after compaction with no user-visible signal (#81988/#80938/#82476/#85754) is eroding trust among long-session users; mitigations are currently manual and unverified.
- **Multi-session/multi-agent fragility**: tools missing from toolsets, messaging regressions, and message delivery killing background tasks (#92258, #92409, #91139) — the feature set is powerful but brittle.
- **Silent behavior substitution**: injected shell shims and server-side skill flags change behavior without disclosure (#69736, #83565).
- **Sandbox growing pains on macOS**: Seatbelt profile bloat with many worktrees (#73437, closed) and the sandbox blocking its own eval wrapper (#77466, closed) show the macOS sandbox path needs more testing with real-world repo layouts.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-06

## 1. Today's Highlights

No new release shipped in the last 24 hours, but engineering activity was intense: **32 PRs were closed**, dominated by a large, coordinated push to build out **native voice runtime infrastructure** (Bazel targets for Windows/macOS/Linux, a realtime WebRTC session API, Opus RTP handling) — a strong signal that voice mode is under active development. Meanwhile, session-history reliability remains the top community concern: two fresh reports today ([#43142](https://github.com/openai/codex/issues/43142), [#43124](https://github.com/openai/codex/issues/43124)) show paginated-thread ordinal freezes persisting in CLI 0.153.4, even as a guarded legacy-resume fix ([PR #43178](https://github.com/openai/codex/pull/43178)) landed. Windows users continue to drive the bulk of issue volume.

## 2. Releases

No releases in the last 24 hours.

## 3. Hot Issues

1. **[#28919](https://github.com/openai/codex/issues/28919) — Windows app missing "Control other devices" tab** (62 💬, 55 👍)
   The most-discussed open issue. Windows Pro users cannot access Remote Control settings that exist on other platforms, blocking device-pairing workflows entirely. Nearly three months old and still unresolved — a clear parity gap for Windows.

2. **[#41463](https://github.com/openai/codex/issues/41463) — [Windows + WSL] Cannot create projects: `AbsolutePathBuf` deserialization failure** (30 💬, 20 👍)
   A hard blocker: WSL2 users can't create projects at all because path deserialization lacks a base path. High 👍 velocity for a one-week-old report indicates broad impact on the Windows + WSL developer segment.

3. **[#27117](https://github.com/openai/codex/issues/27117) — Standalone update inherits `PSModulePath` from pwsh, breaking `Get-FileHash`** (31 💬, 21 👍)
   Deep Windows plumbing issue: launching `powershell.exe` from PowerShell 7 during updates causes module-path contamination and update failures. Symbolic of the broader Windows update-reliability problem cluster.

4. **[#41079](https://github.com/openai/codex/issues/41079) — Windows paginated thread history stalls on duplicate ordinal** (29 💬)
   The UI shows a stale snapshot while the rollout JSONL contains the full, completed conversation. Not data loss — a projection stall — but indistinguishable from data loss to affected users. Part of a cross-platform ordinal-duplication pattern (see #43142 below).

5. **[#41960](https://github.com/openai/codex/issues/41960) — Pets unresponsive to clicks/drags on Windows** (17 💬, 22 👍)
   Highest 👍 among recent issues; the Pets feature is effectively non-interactive for affected Windows users. Related: [#42661](https://github.com/openai/codex/issues/42661) (input region offset on multi-monitor/DPI setups) and [#42243](https://github.com/openai/codex/issues/42243) (overlay reappearing after "Tuck Away").

6. **[#41339](https://github.com/openai/codex/issues/41339) — Startup blocked 5+ minutes by pending in-app update policy after AppX transition** (15 💬)
   A post-Microsoft-Store-transition regression that makes the app appear hung at launch. Severe first-run/first-update experience degradation.

7. **[#35555](https://github.com/openai/codex/issues/35555) — CLI hard-fails at boot when `logs_2.sqlite` is write-locked** (10 💬)
   A telemetry database gating CLI startup with a flat 5s busy_timeout and no retry — the CLI dies before authentication even runs. Architecture smell: observability should never block the product.

8. **[#39054](https://github.com/openai/codex/issues/39054) — MCP OAuth: rejected refresh token retried forever, no re-auth prompt** (9 💬, 5 👍)
   Reproduced identically across five CLI versions (0.140 → 0.148-alpha). A rejected token stays marked "usable," so MCP servers silently fail instead of surfacing a login flow. Significant for MCP-heavy workflows.

9. **[#43142](https://github.com/openai/codex/issues/43142) — [0.153.4] Resume reuses rollout ordinals after trailing `token_count` records** (new today)
   Filed today against the latest CLI: resuming an interrupted task freezes desktop history at an older state. Paired with [#43124](https://github.com/openai/codex/issues/43124) (macOS, same day, ordinal mismatch 3185 vs 3184), this confirms the ordinal-duplication bug is **not yet fixed in current builds**.

10. **[#41338](https://github.com/openai/codex/issues/41338) — Inline image output costs ~230 tokens but 4.2 MB on the wire** (5 💬)
    Excellent forensic report: token-based context management can't see the payload that wedges threads, contradicting a hypothesis in the older #18629. Explains mysterious thread freezes after image-generating tool calls. Honorable mention: [#41957](https://github.com/openai/codex/issues/41957) reports ~9× Plus-quota consumption increase between comparable tasks.

## 4. Key PR Progress

*All PRs below are now closed (merged or completed) and were authored by `copyberry[bot]`.*

1. **[#43178](https://github.com/openai/codex/pull/43178) — Allow guarded legacy resume with background migration enabled**
   Restores the TUI's cached legacy-resume shortcut when the rollout maintenance lock can prevent migration during resume. Directly relevant to the ordinal/resume freeze reports above.

2. **[#43097](https://github.com/openai/codex/pull/43097) — Helper-backed realtime WebRTC session API**
   Adds `RealtimeWebrtcSession` with cloneable handles for negotiation, audio controls, and level meters — the core API surface for the upcoming voice mode.

3. **[#43100](https://github.com/openai/codex/pull/43100) — Bounded incoming Opus RTP handling**
   Intercepts incoming Opus RTP ahead of the track queue with strict limits (64 packets / 2 MiB outstanding, 64 KiB per packet) — memory-safety-conscious media pipeline work.

4. **[#43090](https://github.com/openai/codex/pull/43090) — Send processed microphone audio over RTP**
   Connects capture to the outgoing media track with resampling, mute-boundary preservation, and stale-audio limits — voice input now actually reaches the peer.

5. **[#43144](https://github.com/openai/codex/pull/43144) — Windows MSVC Bazel targets for native voice libraries**
   Explicit x64/ARM64 native build, runtime-prep, and link targets. Along with [#43126](https://github.com/openai/codex/pull/43126), [#43125](https://github.com/openai/codex/pull/43125), [#43121](https://github.com/openai/codex/pull/43121), [#43117](https://github.com/openai/codex/pull/43117), [#43114](https://github.com/openai/codex/pull/43114), [#43111](https://github.com/openai/codex/pull/43111), [#43109](https://github.com/openai/codex/pull/43109), [#43102](https://github.com/openai/codex/pull/43102), and [#43099](https://github.com/openai/codex/pull/43099), this is a ~13-PR cluster building a fully reproducible, receipt-verified cross-platform native voice toolchain — notable both for its scale and its Windows-first attention.

6. **[#43177](https://github.com/openai/codex/pull/43177) — Use server model defaults for fresh TUI startup**
   Fixes stale client-side model/reasoning settings leaking into fresh sessions, including the cleared-server-model edge case.

7. **[#43147](https://github.com/openai/codex/pull/43147) — Gate experimental context by model capability at session startup**
   Experimental context now checks actual model support, and child sessions no longer blindly inherit token-budget activation from parents.

8. **[#43120](https://github.com/openai/codex/pull/43120) — Managed worktree creation in TUI session commands**
   New `/worktree` command plus worktree options for `/new` and `/fork` — safe parallel experimentation with isolated checkouts, a meaningful workflow upgrade.

9. **[#43113](https://github.com/openai/codex/pull/43113) — Save subagent and memory opt-ins through the app server**
   Routes TUI opt-in prompts through server config writes, with explicit success/override/failure reporting — better config consistency for subagents and memory.

10. **[#43110](https://github.com/openai/codex/pull/43110) — Record reasoning-effort changes in conversation history (flagged)**
    Disabled-by-default `reasoning_effort_override` appends trusted `configuration_update` records — a step toward fully reproducible session transcripts. See also [#43104](https://github.com/openai/codex/pull/43104), consolidating Guardian thread context into `guardianv2` config.

## 5. Hot Discussions

**Ideas**
- **[#14067](https://github.com/openai/codex/discussions/14067) — Sync threads and session context across devices** (61 👍, 10 💬): The highest-voted idea in this cycle. Users working across multiple machines want threads/context untethered from local state — long-running and still active.
- **[#37693](https://github.com/openai/codex/discussions/37693) — Keyboard shortcuts to jump between user messages**: Anchor-based navigation skipping assistant/tool output.
- **[#28073](https://github.com/openai/codex/discussions/28073) — Clickable prompt navigator for the current conversation**: A visual index of user prompts within a thread; complements #37693.

**Q&A**
- **[#40740](https://github.com/openai/codex/discussions/40740) — Does rollout tracing capture which path produced a `Declined` exec status?**: A technically deep question about deliberate exclusions of approval events from rollout persistence.

**Show and tell**
- **[#41157](https://github.com/openai/codex/discussions/41157) — CodexFuse 1.2.0, local Windows dashboard for Codex rate limits**: Third-party, no-API-key tool showing used/available quota and reset times — evidence of unmet demand for quota visibility.

**General**
- **[#42992](https://github.com/openai/codex/discussions/42992) — OpenClaw subagent sessions appearing as top-level sidebar chats**: Internal child threads polluting the sidebar, some un-archivable; echoes sidebar-hygiene complaints in [#42236](https://github.com/openai/codex/issues/42236).

## 6. Feature Request Trends

- **Cross-device thread/session synchronization** — by far the strongest signal (61 👍 on #14067), compounded by Remote Control pain points (#28919, #36040).
- **Long-conversation navigation** — two active proposals (#37693, #28073) for jumping/indexing user prompts in lengthy threads.
- **Rate-limit and quota transparency** — 9× quota-consumption reports (#41957) plus a community-built monitoring dashboard (CodexFuse) indicate users lack reliable visibility into consumption.
- **Windows feature parity** — Remote Control tab (#28919), WSL project support (#41463), and MS Store update stability (#26792, #30015) dominate requests.
- **Desktop platform polish** — Linux native window decorations (#38595) and sidebar hygiene for subagent threads (#42992, #42236).

## 7. Developer Pain Points

- **Windows is the epicenter of friction.** Roughly half of the top-30 issues are Windows-specific: broken updates (#27117, #30015, #26792), 5+ minute startup hangs (#41339), WSL project-creation failures (#41463), invisible UI (#32926), and Defender false positives on unsigned `codex-computer-use.exe` (#31419). The MS Store/AppX transition is a recurring aggravator.
- **Paginated history ordinal freezes remain unfixed in current builds.** The duplicate-ordinal projection stall spans macOS and Windows (#41079, #40178) and two *new* reports today against CLI 0.153.4 (#43142, #43124) — despite shipped resume/migration PRs. This is the most persistent correctness issue in the tracker.
- **Resource & lifecycle leaks.** Duplicate MCP and `node_repl` process stacks when resuming subagent threads (#37453), and a telemetry SQLite lock that hard-gates CLI boot (#35555), both suggest lifecycle management needs hardening.
- **Token accounting ≠ actual resource cost.** Inline images costing ~230 tokens but 4.2 MB on the wire (#41338) break context-management assumptions and wedge threads invisibly.
- **Auth flows that fail silently.** MCP OAuth refresh-token retry loops with no re-auth prompt (#39054) and DCR discovery ignoring `WWW-Authenticate resource_metadata` (#42427) make MCP integrations fragile to debug.
- **The Pets feature shipped before input handling was solid on Windows** — three separate input bugs (#41960, #42243, #42661) affecting DPI/multi-monitor configurations, with notable 👍 counts.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-06

## 1. Today's Highlights

Agent reliability dominates the issue tracker this cycle: subagents falsely reporting success and generalist-agent deadlocks are the most-discussed open bugs, while Auto Memory drew fresh security scrutiny over secret redaction and logging behavior. On the contribution side, security hardening leads open PRs — including Windows sandbox git-argument validation (#29184) and an auth crash fix for restricted environments (#29163) — plus a notable cluster of Claude Code migration correctness fixes. Nightly `v0.60.0-nightly.20260906` shipped on schedule.

## 2. Releases

- **v0.60.0-nightly.20260906.g85aca163f** — routine nightly build; no itemized changelog published. [Compare with previous nightly](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260905.g85aca163f...v0.60.0-nightly.20260906.g85aca163f)

## 3. Hot Issues

| Issue | Why It Matters |
|---|---|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent MAX_TURNS reported as GOAL success (13💬, P1) | `codebase_investigator` returns `status: "success"` even after hitting the turn limit pre-analysis. Failure masking breaks orchestration trust; flagged for retesting. |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — Zero-Dependency OS Sandboxing & Intent Routing (9💬) | Architectural proposal: exploit Gemini 3's native bash affinity via OS-level sandboxing plus post-execution intent routing instead of reimplementing tools. |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent hangs (8💬, 👍8, P1) | Even trivial tasks (folder creation) hang indefinitely; users must explicitly forbid subagent delegation. High 👍 count signals broad impact. |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — AST-aware file reads/search/mapping EPIC (7💬) | Investigates AST tooling (tilth/glyph) to read exact method bounds in one call — fewer wasted turns, less token noise. |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Skills & sub-agents underused (6💬) | Model won't invoke custom skills (e.g., gradle/git) unless explicitly instructed — a routing/prompting gap affecting power users. |
| [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Auto Memory redaction & logging (5💬, security) | Secrets are redacted only *after* transcript content enters model context; calls for deterministic pre-send redaction and reduced logging. |
| [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell stuck on "Awaiting user input" (4💬, 👍3, P1) | Completed commands leave the CLI hanging; core workflow breaker affecting simple shell invocations. |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — Browser subagent fails on Wayland (4💬, P1) | Reports GOAL termination without doing work; Linux display-server compatibility gap. |
| [#20079](https://github.com/google-gemini/gemini-cli/issues/20079) — Symlinked agents not recognized (4💬) | `~/.gemini/agents/*.md` symlinks are ignored, blocking dotfile-repo management workflows. |
| [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 400 error with >128 tools (3💬) | Heavy MCP/tool registrations hit API limits; requests smarter dynamic tool scoping. |

*Also notable:* [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) GSD output-hook crash (P1), [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) guards against destructive git/DB operations, [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) browser agent ignoring `settings.json` overrides.

## 4. Key PR Progress

| PR | Description |
|---|---|
| [#29184](https://github.com/google-gemini/gemini-cli/pull/29184) (OPEN, P1/security) | Windows sandbox: validate git args so `git diff --output` can't silently truncate files in read-only-allowed, non-YOLO mode. |
| [#29163](https://github.com/google-gemini/gemini-cli/pull/29163) (OPEN, P1/security) | Prevent startup crash when running in git repos under macOS Seatbelt/restricted permissions (faulty `useGitBranchName` hook). |
| [#29098](https://github.com/google-gemini/gemini-cli/pull/29098) (OPEN) | React correctness: removes side effects from `useInputHistoryStore` updaters, which risked double-execution under StrictMode. |
| [#29125](https://github.com/google-gemini/gemini-cli/pull/29125) (OPEN) | Migration fix: Claude Code hook timeouts are in seconds, Gemini CLI in ms — migrated `"timeout": 30` was becoming 30ms. |
| [#29195](https://github.com/google-gemini/gemini-cli/pull/29195) (OPEN) | `/resume` no longer crashes with a raw `TypeError` on checkpoints with non-array history; now degrades gracefully. |
| [#29205](https://github.com/google-gemini/gemini-cli/pull/29205) (OPEN) | MCP prompts: submit response text directly instead of JSON-encoding, preserving embedded quotes/newlines. |
| [#29106](https://github.com/google-gemini/gemini-cli/pull/29106) (CLOSED) | SSE parser now flushes the final buffered event on EOF — previously `finishReason`/usage metadata could be silently dropped. |
| [#29117](https://github.com/google-gemini/gemini-cli/pull/29117) (CLOSED) | Enforces RFC 9207 issuer identification in the MCP OAuth flow to prevent unintended token routing. |
| [#28967](https://github.com/google-gemini/gemini-cli/pull/28967) (CLOSED) | Stops `refreshStatic()` from wiping terminal scrollback on Linux/Unix emulators in standard buffer mode. |
| [#28968](https://github.com/google-gemini/gemini-cli/pull/28968) (CLOSED) | Dedupes symlinked/junctioned skills directories (`.gemini` ↔ `.agents`) during discovery, fixing double-registration. |

*Also:* [#29126](https://github.com/google-gemini/gemini-cli/pull/29126) fixes a2a-server JSON-RPC body parsing by mounting `express.json()` before SDK routes. ⚠️ *Quality note:* several low-signal drive-by PRs (#29227 Jekyll workflow, #29193 empty template, #29127 "Compare") were closed this cycle — maintainer review bandwidth remains a cost.

## 5. Hot Discussions

*Omitted — no discussion data in this cycle's dataset.*

## 6. Feature Request Trends

- **Subagent observability & control** — shareable subagent trajectories ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)), subagent context in `/bug` reports ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)), honest termination states ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)).
- **AST-aware code intelligence** — precise method-bound reads and codebase mapping ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)) and token-frugal "tactful extraction" ([#19561](https://github.com/google-gemini/gemini-cli/issues/19561)).
- **Sandboxing & safety** — zero-dependency OS sandboxing ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873)) and guardrails against destructive git/DB operations ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)).
- **Auto Memory hardening** — deterministic redaction ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525)), invalid-patch quarantine ([#26523](https://github.com/google-gemini/gemini-cli/issues/26523)), retry limits for low-signal sessions ([#26522](https://github.com/google-gemini/gemini-cli/issues/26522)).
- **Config fidelity & interop** — honor `settings.json` overrides in browser agent ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)), symlink support ([#20079](https://github.com/google-gemini/gemini-cli/issues/20079)), agents-standard skills dedupe ([#28968](https://github.com/google-gemini/gemini-cli/pull/28968)).

## 7. Developer Pain Points

- **Hanging is the top frustration**: generalist-agent deadlocks ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), shell stuck on "Awaiting user input" after completion ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)), and stalls on interactive prompts like `create-vite` ([#22465](https://github.com/google-gemini/gemini-cli/issues/22465)).
- **Failure masking**: subagents report GOAL/success when actually interrupted ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323), [#21983](https://github.com/google-gemini/gemini-cli/issues/21983)), making failures hard to detect and debug.
- **Workspace hygiene**: models scatter temp edit scripts across random directories, complicating clean commits ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)).
- **Scale limits**: >128 tools triggers a 400 error ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)); skills/subagents go unused without explicit prompting ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968)).
- **Terminal UX**: flicker on resize ([#21924](https://github.com/google-gemini/gemini-cli/issues/21924)), scrollback wipes (fixed in [#28967](https://github.com/google-gemini/gemini-cli/pull/28967)), and `\n` escape quirks ([#22466](https://github.com/google-gemini/gemini-cli/issues/22466)).
- **Privacy concerns**: Auto Memory ships transcript content to the extraction model before redaction occurs ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525)) — the most pressing security-adjacent complaint this cycle.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-06

## 1. Today's Highlights

No releases or pull request activity landed in the past 24 hours — today's signal is entirely issue-driven. The dominant themes are **BYOK cost/reliability regressions in v1.0.82** (silent prompt-caching loss, truncated-turn data loss), a **fresh upgrade regression breaking worktree-backed sessions** (desktop 2.98.0 / runtime 1.1.15), and positive news on the enterprise front with two long-standing issues ([#4527](https://github.com/github/copilot-cli/issues/4527), [#4272](https://github.com/github/copilot-cli/issues/4272)) now closed.

## 2. Hot Issues

1. **[#4695](https://github.com/github/copilot-cli/issues/4695) — MCP OAuth tokens not reliably reused across sessions** *(authentication, mcp)*
   HTTP MCP servers using PKCE public clients mint duplicate token-cache entries under different cache-key hashes, forcing repeated re-auth. The most-commented issue today (5 comments) — a growing friction point as MCP server adoption expands.

2. **[#4692](https://github.com/github/copilot-cli/issues/4692) — Enterprise default model not honored by CLI** *(enterprise, models)*
   Org-managed default `MAI-Code-1.1-Flash` applies correctly in VS Code and GitHub Desktop, but the CLI warns and falls back (4 comments). Highlights a policy-parity gap between the CLI and other Copilot surfaces.

3. **[#4527](https://github.com/github/copilot-cli/issues/4527) — ✅ CLOSED: `copilot -p` fails with 401 on GHEC data-residency tenants**
   Since 1.0.81-1, non-interactive prompt mode fetched the model catalog from `api.githubcopilot.com` instead of the tenant endpoint while interactive mode worked. Closure (4 👍) is significant for GHEC DR customers running the CLI in CI.

4. **[#4272](https://github.com/github/copilot-cli/issues/4272) — ✅ CLOSED: New models greyed out by org policy** *(enterprise, models)*
   Models showed "disabled by your organization's policy" with a settings link containing no toggle (3 👍). Resolution suggests the policy/UX confusion has been addressed.

5. **[#4734](https://github.com/github/copilot-cli/issues/4734) — "Worktree missing" on all sessions after desktop 2.98.0 / runtime 1.1.15** *(sessions)*
   Filed yesterday; every worktree-backed session — existing *and* newly created — broke after auto-update. No responses yet; looks like a regression worth watching closely.

6. **[#4720](https://github.com/github/copilot-cli/issues/4720) — v1.0.82 BYOK silently disables prompt caching (~5x cost)** *(networking, models)*
   Chat requests carry no cache declaration; provider usage confirms `cached_tokens=0`, so every turn re-bills the full growing context. A direct cost multiplier for BYOK users, with no maintainer response yet.

7. **[#4694](https://github.com/github/copilot-cli/issues/4694) — WSL2: ~31 GB RSS and ~57% CPU on long session** *(platform-linux)*
   Long-running agent session (Claude Opus 5, high effort, ~47% context) ballooned memory on WSL2. Severe resource-footprint concern for extended agentic workflows.

8. **[#4706](https://github.com/github/copilot-cli/issues/4706) — Tool calls intermittently emit malformed invocation markup and silently no-op** *(tools)*
   Notable meta-detail: filed by the Copilot CLI agent itself (Claude Opus 4.8) on Windows/PowerShell. Silent tool-call failures erode trust in agent reliability and are hard to detect mid-task.

9. **[#4735](https://github.com/github/copilot-cli/issues/4735) — User-facing text before a tool call folded into "Thought for Ns"** *(terminal-rendering)*
   When a large reasoning block precedes a visible text block followed by a tool call, the renderer reclassifies the answer as reasoning and never shows it. Critical output can be silently hidden.

10. **[#4733](https://github.com/github/copilot-cli/issues/4733) — `max_output_tokens` truncation drops the response *and* the continuation** *(sessions)*
    In BYOK usage (65,536-token provider limit), truncation causes events to go un-emitted/unlogged and the follow-up "continue" request to be lost — a data-loss-class bug in continuation handling.

## 3. Key PR Progress

No pull requests were updated in the last 24 hours.

## 4. Feature Request Trends

- **Inline-suggestion keybinding ergonomics** — context-sensitive `Ctrl+E` to accept completions, matching Emacs-style terminal conventions ([#4736](https://github.com/github/copilot-cli/issues/4736)).
- **Mobile parity for remote sessions** — render remote session UI properly in GitHub Mobile on Android; WebSocket data arrives but isn't displayed ([#3498](https://github.com/github/copilot-cli/issues/3498), 3 👍).
- **Sandbox coverage on latest Windows** — recognize/support Windows 25H2 builds instead of warning "not supported on this host" ([#4652](https://github.com/github/copilot-cli/issues/4652)).
- **Hook/plugin lifecycle semantics** — correct `agentStop` behavior across subagent turns so post-turn hooks don't stall commands like `/review` ([#3894](https://github.com/github/copilot-cli/issues/3894)).
- **Enterprise admin experience** — clearer org model-policy toggles and consistent org defaults across CLI/VS Code/Desktop ([#4272](https://github.com/github/copilot-cli/issues/4272), [#4692](https://github.com/github/copilot-cli/issues/4692)).

## 5. Developer Pain Points

- **BYOK cost & reliability gaps:** prompt caching silently disabled (~5x bill) ([#4720](https://github.com/github/copilot-cli/issues/4720)); truncation handling losing entire turns ([#4733](https://github.com/github/copilot-cli/issues/4733)).
- **Enterprise/data-residency friction:** tenant endpoint routing (fixed in [#4527](https://github.com/github/copilot-cli/issues/4527)), org default model not honored ([#4692](https://github.com/github/copilot-cli/issues/4692)), opaque model policy UX ([#4272](https://github.com/github/copilot-cli/issues/4272)).
- **Auth/session persistence:** repeated OAuth flows for MCP servers due to cache-key duplication ([#4695](https://github.com/github/copilot-cli/issues/4695)).
- **Resource footprint:** extreme memory/CPU growth on long agentic sessions, worst on WSL2 ([#4694](https://github.com/github/copilot-cli/issues/4694)).
- **Output fidelity:** user-facing answers hidden inside collapsed reasoning ([#4735](https://github.com/github/copilot-cli/issues/4735)) and silent tool-call no-ops ([#4706](https://github.com/github/copilot-cli/issues/4706)).
- **Upgrade regressions:** worktree-backed sessions broken after desktop 2.98.0 / runtime 1.1.15 auto-update ([#4734](https://github.com/github/copilot-cli/issues/4734)) — the newest issue in today's batch and a candidate for rapid triage.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-06

## 1. Today's Highlights

No new release shipped in the last 24 hours, but the contributor pipeline is unusually active, with ~20 PRs updated — including fixes for headless-session resilience (provider retry, SSE timeouts), database maintenance (incremental auto-vacuum), and Desktop networking (13-request fan-out collapsed into one). On the issue tracker, the dominant theme is **OpenCode Go subscription reliability**: a cluster of fresh reports (#47547, #47613, #47614, #45278) describe blocked subscriptions, sticky 429s, and quota-accounting bugs affecting paying users. Meanwhile, the most-voted active bug remains the stale `@` file-mention index (#32747), now at 13 👍.

## 2. Releases

None in the last 24 hours.

## 3. Hot Issues

1. **[#32747](https://github.com/anomalyco/opencode/issues/32747) — `@` file mentions miss files created after startup** (15 💬, 13 👍). The most-engaged open bug this week: the TUI's file picker serves a stale search index, so newly created files are invisible until restart. High 👍 count signals this bites daily workflows.

2. **[#47547](https://github.com/anomalyco/opencode/issues/47547) — Go subscription blocked by percentage-sum accounting**. "Monthly Usage 100%" is computed as the sum of per-model percentages rather than actual dollars vs. the $60 limit, locking users out with ample budget remaining. Opened today with 4 comments already.

3. **[#45278](https://github.com/anomalyco/opencode/issues/45278) — Payment declined after 3 months of successful charges** (10 💬). Bank confirms nothing wrong on their side; renewal failures like this directly block paying customers and generate sustained community discussion.

4. **[#47613](https://github.com/anomalyco/opencode/issues/47613) — Persistent HTTP 429 (12h retry-after) on Go despite low usage**. Go "essentially unusable for ~3 days" for a paying subscriber; the retry window keeps resetting. Related French-language twin: [#47598](https://github.com/anomalyco/opencode/issues/47598).

5. **[#47614](https://github.com/anomalyco/opencode/issues/47614) — Weekly quota stuck at 100% after monthly renewal**. Monthly quota reset correctly but the weekly cap didn't, blocking usage — a billing-state bug distinct from #47547's accounting bug.

6. **[#47610](https://github.com/anomalyco/opencode/issues/47610) — Transient 503 kills the turn with no retry; headless sessions wedge**. A single provider "no eligible device" response ends the turn permanently, with no human to re-prompt in ACP/autonomous harnesses. A fix is already in flight ([PR #47611](https://github.com/anomalyco/opencode/pull/47611)).

7. **[#47566](https://github.com/anomalyco/opencode/issues/47566) — Concurrent processes fail with SQLITE_BUSY**. Multiple `opencode` instances against one data directory exceed the 5s `busy_timeout` and surface "Failed to execute statement" — a real problem for parallel-agent setups.

8. **[#47485](https://github.com/anomalyco/opencode/issues/47485) — `compaction.prune` never trims context in single-turn headless runs**. Long `opencode run --format json` jobs compact every ~10 minutes, burning 45–85k tokens per summary for hours. Directly hurts CI/agent costs.

9. **[#47587](https://github.com/anomalyco/opencode/issues/47587) — Mid-session, prompts silently stop reaching the model**. No UI feedback on whether the request was sent; reporter attached video. Similar wedge family as #47605 (missing `Content-Type` bypasses the body timeout, leaving sessions "busy" forever).

10. **[#46976](https://github.com/anomalyco/opencode/issues/46976) — Slow startup (5–20s) on recent Mac versions**. Regression-sized complaint on M-series hardware with a single MCP server; still active after several days. Honorable mentions in the stability bucket: [#47037](https://github.com/anomalyco/opencode/issues/47037) (SIGILL during TUI render) and [#42960](https://github.com/anomalyco/opencode/issues/42960) (broken Esc interrupt in V2, background task survives exit).

## 4. Key PR Progress

1. **[#47611](https://github.com/anomalyco/opencode/pull/47611) — Retry provider-busy plain-text errors**. Treats "no eligible device"-style messages as retryable via the existing SessionRetry schedule (Retry-After, backoff, attempt budget). Directly resolves the headless wedge in #47610.

2. **[#46802](https://github.com/anomalyco/opencode/pull/46802) — Honor `chunkTimeout` on HTTP SSE streams**. The setting was accepted in config but never read on the native path; this wires it into the HTTP transport, closing a real gap for stalled-stream hangs.

3. **[#47204](https://github.com/anomalyco/opencode/pull/47204) — Back off reconnects when the stream never connects**. Replaces the fixed 1s reconnect loop with proper backoff, stopping unauthenticated browser sessions from hammering the server.

4. **[#47589](https://github.com/anomalyco/opencode/pull/47589) — Incremental auto-vacuum for deleted DB pages**. Reclaims SQLite space progressively instead of requiring manual vacuum — addresses long-standing storage bloat (#31526/#33356 partially out of scope).

5. **[#47578](https://github.com/anomalyco/opencode/pull/47578) — Read a location's catalog in one request**. `data.location.sync` currently fans out to 13 endpoints per session tab, `/cd`, and reconnect; this consolidates them into a single round-trip. Notable perf win for Desktop.

6. **[#47595](https://github.com/anomalyco/opencode/pull/47595) — Skill enable/disable + preferences API**. Persistent server-wide skill preferences with UI controls — revival of the closed capability-abstraction work (#43536) in a slimmer form.

7. **[#47493](https://github.com/anomalyco/opencode/pull/47493) — Cap images per request, classify image-count limits as overflow**. Prevents screenshot-loop agents from accumulating 50+ attachments and blowing provider request limits.

8. **[#47592](https://github.com/anomalyco/opencode/pull/47592) — Graceful OAuth callback error handling**. Closes three issues at once (#47590, #40232, #39414) by handling cancelled/failed sign-ins instead of dead-ending.

9. **[#47607](https://github.com/anomalyco/opencode/pull/47607) — Optimize Levenshtein and bound edit locks**. Two-row DP instead of a full matrix in `edit.ts`, plus lock bounds — core-path performance hygiene.

10. **[#47599](https://github.com/anomalyco/opencode/pull/47599) — Dynamically size `DialogModel` to terminal width**. Fixes the model dialog defaulting to a 60-column "medium" on wide terminals. Also worth noting: [#47588](https://github.com/anomalyco/opencode/pull/47588) (closed/merged — Desktop sidecar credentials moved out of the renderer, eliminating CORS preflights on GETs) and [#46940](https://github.com/anomalyco/opencode/pull/46940) (friendly hint when `skill` tool is called with an agent name).

## 5. Hot Discussions

*Omitted — no discussion data provided.*

## 6. Feature Request Trends

- **Runtime permission controls**: Slash-command toggles for auto-approve (`/approve on|off`, `/auto`) are recurring asks (#41909, #47579 — the latter was closed after discovering/landing palette access, indicating demand outpaced discoverability).
- **Headless/agent-grade resilience**: Retry-on-busy (#47610), resumable failed subagents with task IDs (#39196), and controllable compaction for long single-turn runs (#47485) — users increasingly run OpenCode as an unattended agent substrate.
- **Provider/model compatibility breadth**: Slash-containing model IDs (NVIDIA NIM #44799), Copilot Enterprise third-party models (#34030), and MCP tool definitions for local OpenAI-compatible endpoints (#39164).
- **Memory & skills management**: Persistent skill preferences (#47595) plus a burst of community memory plugins seeking ecosystem listing (three separate docs PRs today: #47594, #47596, #47593).

## 7. Developer Pain Points

- **OpenCode Go billing/quota reliability is the loudest signal right now**: declined renewals (#45278), wrong quota math (#47547), sticky weekly caps (#47614), and multi-day 429 lockouts (#47613, #47598) — all from paying subscribers, compounding trust erosion.
- **Sessions that wedge silently**: missing retries (#47610), indefinite body waits (#47605), and mid-session dead UI (#47587) leave headless and interactive users alike without feedback or recovery.
- **Stale indexes and state**: the `@` mention bug (#32747), project source roots breaking after folder moves (#47603), and V2 sessions leaking background tasks after Esc/Ctrl+C (#42960).
- **Resource contention and bloat**: SQLITE_BUSY under concurrent processes (#47566) and runaway compaction token spend (#47485) hurt the multi-agent and CI use cases.
- **Startup and render regressions**: 5–20s cold starts on Mac (#46976) and SIGILL crashes on Linux Bun builds (#47037) suggest recent perf/stability regressions worth a focused triage pass.

---
*Data source: [anomalyco/opencode](https://github.com/anomalyco/opencode) · Generated 2026-09-06*

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-06

## 1. Today's Highlights

No new release shipped in the last 24 hours, but it was an unusually active triage day — roughly two-thirds of the 30 tracked issues were closed, many within a day of being filed. Reliability dominated traffic in both directions: a same-day fix for a startup auth-snapshot race ([PR #9233](https://github.com/earendil-works/pi/pull/9233)) landed alongside a still-escalating OpenAI-Codex hang report ([#4945](https://github.com/earendil-works/pi/issues/4945), 76 comments) and a clean 0.84→0.85 Ollama regression ([#9216](https://github.com/earendil-works/pi/issues/9216)). Time-sensitive for `opencode-go` users: OpenCode Go began requiring an `x-opencode-session` header **today** ([#9230](https://github.com/earendil-works/pi/issues/9230)).

## 2. Releases

None in the last 24 hours.

## 3. Hot Issues

1. **[#4945](https://github.com/earendil-works/pi/issues/4945) — openai-codex Connection Reliability Issues** (OPEN, in-progress). The repo's most-discussed issue (76 comments, 32 👍, open since May): `gpt-5.5` sessions hang on `Working...` with no stream, tool call, or error — only Escape recovers, logging an aborted turn. Still actively triaged; the canonical codex-stability thread.
2. **[#7547](https://github.com/earendil-works/pi/issues/7547) — Windows usage sink-thread** (OPEN, 52 comments). Maintainer-initiated thread to decide which of the many Windows installation paths deserve core investment vs. delegation to extensions. Timely, given several Windows-specific bugs filed this week.
3. **[#9230](https://github.com/earendil-works/pi/issues/9230) — opencode-go missing `x-opencode-session` header** (CLOSED). OpenCode Go started rejecting header-less requests on 2026-09-06; Pi's provider doesn't send one. Breaking-change-adjacent for anyone on that provider — check this if `opencode-go` errors today.
4. **[#9216](https://github.com/earendil-works/pi/issues/9216) — Ollama `qwen3.8:27b`: stream `terminated` errors, 0.84→0.85 regression** (CLOSED). Clean regression report: repeated zero-usage `terminated` failures plus auto-compaction silently stopping after the first run. High-value repro for local-model users.
5. **[#9212](https://github.com/earendil-works/pi/issues/9212) — sonnet-5 via Vercel AI Gateway: 13% of `edit` calls truncated to `edits:[{}]`** (CLOSED). Exemplary data-driven report: 18/134 failed calls over a week, with the same model at 0% via fable. Isolates a gateway-specific truncation path.
6. **[#8684](https://github.com/earendil-works/pi/issues/8684) — `PI_OFFLINE` silently disables all provider model discovery** (OPEN). Documented as housekeeping-only, but kills model-catalog network lookups for the whole session. Classic docs-vs-behavior drift that surprises offline/air-gapped users.
7. **[#9226](https://github.com/earendil-works/pi/issues/9226) — 0.85.1 `./client` and `./experimental/plugin` exports broken** (CLOSED). The `exports` map points at unpublished `src/*.ts` paths (`ERR_PACKAGE_PATH_NOT_EXPORTED`), breaking SDK consumers on the current release.
8. **[#9229](https://github.com/earendil-works/pi/issues/9229) — Windows: `shell_path` ignored, WSL bash preferred even with WSL disabled** (CLOSED). Pi keeps invoking `wsl.exe` despite an explicit `shell_path` override — a top pain point for native-Windows workflows.
9. **[#9220](https://github.com/earendil-works/pi/issues/9220) — Slash-command autocomplete async race with fast typing / IME** (CLOSED). Fast input (especially Chinese pinyin IME) submits `/re` as a literal message before the async autocomplete menu mounts. Recurring CJK-input friction.
10. **[#8826](https://github.com/earendil-works/pi/issues/8826) — Cap agent retry backoff for prolonged transient outages** (OPEN). Requests a configurable ceiling on exponential agent-level retries so long `503 upstream call failed` stretches settle at a bounded interval rather than exploding. Practical ops ask from heavy users.

## 4. Key PR Progress

1. **[#9233](https://github.com/earendil-works/pi/pull/9233) — Resolve model auth live instead of from startup snapshot** (CLOSED same-day). Fixes a race where an unawaited background refresh left `hasConfiguredAuth()` false at startup, wrongly filtering out usable models.
2. **[#9116](https://github.com/earendil-works/pi/pull/9116) + [#9117](https://github.com/earendil-works/pi/pull/9117) — Mid-conversation system messages** (OPEN, stacked). Layer 1 adds the `system` role mid-session in `pi-ai`; layer 2 rewires the coding agent to deliver prompt/tool-loadout changes as deltas instead of rewriting the top-level prompt — a meaningful token-efficiency and cache-stability architecture change (split from #8998).
3. **[#9096](https://github.com/earendil-works/pi/pull/9096) — Meta provider with Muse subscription OAuth** (OPEN). Adds a subscription-backed provider; quirks include daily re-minted API tokens and burst (non-incremental) streaming. Resolves #7543.
4. **[#7610](https://github.com/earendil-works/pi/pull/7610) — LLM Gateway + DevPass providers** (OPEN). Built-in `openai-completions` providers for an OpenRouter-style router, contributed on behalf of the LLM Gateway team; replaces the auto-closed #7480.
5. **[#9137](https://github.com/earendil-works/pi/pull/9137) — Nix flake** (OPEN, WIP by mitsuhiko). First-class Nix packaging, long-requested by the NixOS crowd.
6. **[#9163](https://github.com/earendil-works/pi/pull/9163) — Simplify clipboard handling** (CLOSED). Vendors away an overkill Rust clipboard dependency, unblocking NixOS builds — pairs naturally with the flake work.
7. **[#9214](https://github.com/earendil-works/pi/pull/9214) — Invoke skills and prompt templates mid-sentence** (CLOSED). Implements #8457: `/name args` now expands anywhere in the input, including for skills with `disable-model-invocation: true`.
8. **[#9222](https://github.com/earendil-works/pi/pull/9222) — Reject reload during active session operations** (OPEN). In RPC mode, an extension reload mid-tool-call left the wrapper touching an invalidated runner and sending spurious errors to the model; now guarded via `isStreaming` checks.
9. **[#9227](https://github.com/earendil-works/pi/pull/9227) — Per-call tool confirmation example extension** (CLOSED). Ships alongside issue #9228: opt-in confirmation for state-changing custom tools, complementing `permission-gate.ts`.
10. **[#9224](https://github.com/earendil-works/pi/pull/9224) — Clamp OpenRouter `:free` maxTokens to base model** (CLOSED). `:free` catalog entries advertise inflated context windows (e.g., minimax-m3:free ~943k vs. a real 524k cap), causing 400s; Pi now clamps to the base model's limit.

*Also closed:* zero-row custom footers ([#9215](https://github.com/earendil-works/pi/pull/9215)), scrolled-up transcript indicator ([#7970](https://github.com/earendil-works/pi/pull/7970)), Proxy-trap preservation in `wrapUIPromptContext` ([#9219](https://github.com/earendil-works/pi/pull/9219)), and the `--no-extensions` example fix ([#9208](https://github.com/earendil-works/pi/pull/9208)).

## 5. Hot Discussions

**Ideas**
- **[#9207](https://github.com/earendil-works/pi/issues/9207) — Remove the "Available tools" section from the system message.** Argues the tool listing is redundant with the tools API and wastes tokens on every request (2 👍). Ties directly into the system-message-delta work in PRs #9116/#9117.

**Show and tell**
- **[#9213](https://github.com/earendil-works/pi/issues/9213) — Embed Agent-Friendly Score badge in README.** An external project scored pi **86.2/100** for agent friendliness and offers a README badge. Light on comments, but a nice external validation signal.

## 6. Feature Request Trends

- **Provider ecosystem breadth & correctness:** New native providers keep arriving (Requesty [#5473](https://github.com/earendil-works/pi/issues/5473), LLM Gateway [#7610](https://github.com/earendil-works/pi/pull/7610), Meta Muse [#9096](https://github.com/earendil-works/pi/pull/9096)), alongside demands that gateway configs actually work (`vercelGatewayRouting` is inert [#9211](https://github.com/earendil-works/pi/issues/9211), 1h cache writes billed at 5m rates [#9210](https://github.com/earendil-works/pi/issues/9210)) and payload efficiency via image `file_id` references [#8617](https://github.com/earendil-works/pi/issues/8617).
- **Extension API maturation:** Expose `ModelRuntime` to extensions ([#8791](https://github.com/earendil-works/pi/issues/8791)), cancellation for queued follow-up sends ([#9234](https://github.com/earendil-works/pi/issues/9234)), per-call tool confirmation ([#9228](https://github.com/earendil-works/pi/issues/9228) → PR #9227), and readable extension-load errors ([#9235](https://github.com/earendil-works/pi/issues/9235)).
- **TUI interaction polish:** Mid-sentence invocation (shipped in #9214), incremental scrolling vs. jump-to-start ([#5786](https://github.com/earendil-works/pi/issues/5786)), consistent menu keybindings ([#9199](https://github.com/earendil-works/pi/issues/9199)), and rendering quality (legacy LaTeX font switches [#8827](https://github.com/earendil-works/pi/issues/8827), Mermaid [#8158](https://github.com/earendil-works/pi/pull/8158)).
- **Packaging & distribution:** Nix support (flake + clipboard vendoring), an esbuild-free runtime install path for SDK consumers ([#9225](https://github.com/earendil-works/pi/issues/9225)), and reliable published exports ([#9226](https://github.com/earendil-works/pi/issues/9226)).
- **Resilience under upstream flakiness:** Bounded retry backoff ([#8826](https://github.com/earendil-works/pi/issues/8826)), OpenAI async tool calling support ([#9113](https://github.com/earendil-works/pi/issues/9113)), and predictable offline semantics ([#8684](https://github.com/earendil-works/pi/issues/8684)).

## 7. Developer Pain Points

- **Silent upstream failures:** The dominant frustration — hangs with no error ([#4945](https://github.com/earendil-works/pi/issues/4945)), truncated tool-call arguments at the gateway ([#9212](https://github.com/earendil-works/pi/issues/9212)), terminated local streams ([#9216](https://github.com/earendil-works/pi/issues/9216)), and unbounded retry waits during outages ([#8826](https://github.com/earendil-works/pi/issues/8826)).
- **Windows remains second-class:** Ignored `shell_path`/WSL assumptions ([#9229](https://github.com/earendil-works/pi/issues/9229)), IME candidate-window and autocomplete races ([#5200](https://github.com/earendil-works/pi/issues/5200), [#9220](https://github.com/earendil-works/pi/issues/9220)), and fullscreen image rendering bugs ([#9169](https://github.com/earendil-works/pi/issues/9169)) — which is exactly why the maintainers opened the Windows sink-thread (#7547).
- **Docs promising more than the code delivers:** `PI_OFFLINE` scope ([#8684](https://github.com/earendil-works/pi/issues/8684)) and `vercelGatewayRouting` ([#9211](https://github.com/earendil-works/pi/issues/9211)) are both documented behaviors that don't match implementation.
- **Release/packaging hygiene:** 0.85.1 shipped broken subpath exports ([#9226](https://github.com/earendil-works/pi/issues/9226)), SDK installs drag in esbuild unnecessarily ([#9225](https://github.com/earendil-works/pi/issues/9225)), and `bun run eval` recursively re-invokes itself ([#9223](https://github.com/earendil-works/pi/issues/9223)).
- **Extension API gaps for serious integrations:** No cancellation of queued follow-ups ([#9234](https://github.com/earendil-works/pi/issues/9234)), opaque load failures like "Unknown system error -122" ([#9235](https://github.com/earendil-works/pi/issues/9235)), and no access to the underlying model runtime ([#8791](https://github.com/earendil-works/pi/issues/8791)) block builders of monitoring/multi-agent tooling.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-06

## 1. Today's Highlights

Two builds shipped in the last 24 hours — **v0.23.0-nightly** and **v0.23.1-preview.0** — both headlined by dynamic workflow run visualization in Web Shell ([PR #10594](https://github.com/QwenLM/qwen-code/pull/10594)). However, the follow-up **v0.23.1-preview.1 release failed repeatedly** (integration_docker / quality jobs), generating five tracked failure issues and a burst of test-determinism fixes. On the security front, a **P1 bug** was filed today revealing that skill `PreToolUse` hooks silently stop enforcing after `--continue`, with a fix PR already stacked and open for review.

## 2. Releases

- **[v0.23.0-nightly.20260905.0c945a6136](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.0-nightly.20260905.0c945a6136)**
  - `feat(web-shell)`: visualize and manage dynamic workflow runs ([PR #10594](https://github.com/QwenLM/qwen-code/pull/10594), by @qqqys)
  - `perf(web-shell)`: derive the session workflow project (perf follow-up)
- **[v0.23.1-preview.0](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.1-preview.0)** — same core changes promoted to the preview channel.
- ⚠️ Note: **v0.23.1-preview.1 failed to release** — see Issues below; blocking flaky tests are being addressed via [#11187](https://github.com/QwenLM/qwen-code/pull/11187) and [#11181](https://github.com/QwenLM/qwen-code/pull/11181).

## 3. Hot Issues

1. **[#11091](https://github.com/QwenLM/qwen-code/issues/11091) — Mermaid (~6 MB) still flattened into the exported transcript renderer** *(CLOSED, 7 comments)*
   The most-discussed issue of the day. Even after #9812 moved the export renderer to a CDN-loaded, SRI-pinned script, Mermaid's full bundle still bloats exports. Active discussion on stubbing/shaking it down; companion work continues in #11038.

2. **[#11180](https://github.com/QwenLM/qwen-code/issues/11180) — Skill `PreToolUse` hook stops enforcing after `--continue`** *(OPEN, P1, security)*
   Filed today by @TianYuan1024: a skill's safety-gate hook silently stops firing after session resume while its instructions remain in context — a genuine security-semantic hole. Fix is already in flight via [PR #11184](https://github.com/QwenLM/qwen-code/pull/11184).

3. **[#11096](https://github.com/QwenLM/qwen-code/issues/11096) — Exports built from `main` point at an unpkg URL that 404s** *(OPEN, P2)*
   The published `0.23.0` tarball predates the renderer split, so the derived unpkg URL 404s — a packaging/release-sequencing bug that breaks exported transcripts for current builds. Marked ready-for-human.

4. **[#9911](https://github.com/QwenLM/qwen-code/issues/9911) — Restore VS Code message edit & rewind after the WebShell cutover** *(OPEN, P2, roadmap/ide-integration)*
   Long-running IDE-parity request (4 comments, updated today). Users still lack per-message edit/rewind post-cutover; the path forward requires reconciling ACP runtime boundaries with daemon snapshot APIs.

5. **[#11186](https://github.com/QwenLM/qwen-code/issues/11186) — `qwen serve` channel ownership doesn't cover home-directory workspaces** *(OPEN, P2, filed today)*
   When the daemon binds to `$HOME`, workspace-scope settings are silently disabled and channel config becomes invisible. Directly related to open [PR #11083](https://github.com/QwenLM/qwen-code/pull/11083).

6. **[#11178](https://github.com/QwenLM/qwen-code/issues/11178) — SDK drops `resource_link` attachments during transcript normalization/replay** *(OPEN, P2, filed today)*
   Live UIs render linked-resource cards, but replayed SDK transcripts lose them — data-fidelity gap for anyone building on the daemon SDK.

7. **[#11185](https://github.com/QwenLM/qwen-code/issues/11185) (+ [#11179](https://github.com/QwenLM/qwen-code/issues/11179), [#11173](https://github.com/QwenLM/qwen-code/issues/11173), [#11170](https://github.com/QwenLM/qwen-code/issues/11170), [#11166](https://github.com/QwenLM/qwen-code/issues/11166)) — v0.23.1-preview.1 release failed, 5×** *(OPEN)*
   The same release run (34018769561) failed repeatedly on `integration_docker`, plus a `quality` job failure. Autofix agents are engaged; the community-visible symptom is release churn rather than product breakage.

8. **[#11183](https://github.com/QwenLM/qwen-code/issues/11183) (+ [#11176](https://github.com/QwenLM/qwen-code/issues/11176), [#11182](https://github.com/QwenLM/qwen-code/issues/11182), [#11168](https://github.com/QwenLM/qwen-code/issues/11168)) — Main-branch CI failures across four commits** *(OPEN)*
   E2E (OpenTUI renderer, docker shard) and unit test legs failing pre-report on `main` — consistent with the flakiness the determinism PRs below target.

9. **[#10378](https://github.com/QwenLM/qwen-code/issues/10378) — Superseded daemon child fires `onExit`, showing a false "stopped unexpectedly" banner** *(CLOSED)*
   A WebShell-cutover regression in the VS Code companion that eroded user trust with phantom crash banners; now resolved.

10. **[#11092](https://github.com/QwenLM/qwen-code/issues/11092) — Two majors of `react-markdown` in one tree** *(CLOSED)*
    Dependency-hygiene cleanup (9.x at root, 10.x nested under web-shell's chart package) — resolved, but emblematic of bundle-size pressure in the export/web-shell area.

## 4. Key PR Progress

1. **[#10983](https://github.com/QwenLM/qwen-code/pull/10983) — `fix(security)`: stop stripping unsafe env assignments in Bash allow matching**
   Closes two permission-bypass shapes where the command matcher's `stripLeadingVariableAssignments()` sanitized away assignments with execution/loader semantics. Security-critical; still open.

2. **[#11156](https://github.com/QwenLM/qwen-code/pull/11156) — `feat(channels)`: DingTalk interactive permission cards**
   Replaces plain-text `/approve` / `/deny` instructions with native interactive cards offering exactly the advertised decisions (allow once / always / deny). Filed today by @now-ing.

3. **[#11184](https://github.com/QwenLM/qwen-code/pull/11184) — `fix(skills)`: re-apply a Skill's side effects on session resume** *(stacked on #11068)*
   The direct fix for P1 issue #11180. Reviewers should scope to the single commit on the stacked branch.

4. **[#11068](https://github.com/QwenLM/qwen-code/pull/11068) — `fix(skills)`: register frontmatter hooks on the `/<skill-name>` path**
   Until now, a skill's declared hooks only registered on model invocation — not when invoked via slash command, leaving the same gate unenforced. Companion to the #11180 fix.

5. **[#11072](https://github.com/QwenLM/qwen-code/pull/11072) — `feat(ui)`: Agent Team status in CLI and WebShell**
   Adds a leader-facing team roster to the CLI live-agent panel and projects team state into WebShell's environment/workflow views, preserving teammate lifecycle semantics (idle ≠ completed).

6. **[#11086](https://github.com/QwenLM/qwen-code/pull/11086) — `feat(serve)`: scope extensions to workspace runtimes**
   Reconciles the global extension catalog into per-workspace runtimes, with workspace-qualified daemon/SDK access — significant architectural groundwork for multi-workspace daemons.

7. **[#11083](https://github.com/QwenLM/qwen-code/pull/11083) — `fix(serve)`: read channel settings from user scope when workspace is home**
   Fixes channel config invisibility for home-directory workspaces (issue #11186) by unifying read/write scope resolution in `WorkspaceChannelSettingsStore`.

8. **[#11117](https://github.com/QwenLM/qwen-code/pull/11117) — Turn the Prettier lane into a real gate**
   Makes the formatting check actually failable, formats the backlog it silently rewrote, and deletes the no-op release-workflow copy — notable CI-integrity cleanup.

9. **[#10941](https://github.com/QwenLM/qwen-code/pull/10941) — `fix(web-shell)`: keep daemon prompt state authoritative through silence**
   Observer panes no longer lose "running" state during silent tool calls; the 3-second silence heuristic no longer overrides the daemon's `hasActivePrompt` signal.

10. **[#11120](https://github.com/QwenLM/qwen-code/pull/11120) — `fix(serve)`: bound and diagnose a session reclaim that can never succeed**
    Stops the daemon from retrying an impossible session close on every report forever; adds diagnostics instead of silently spinning.

*Also worth noting:* [#11187](https://github.com/QwenLM/qwen-code/pull/11187) and [#11181](https://github.com/QwenLM/qwen-code/pull/11181) (both filed today) convert flaky BOM-read and spaced-path-write integration tests to deterministic, fake-server-driven flows to unblock the failed release.

## 5. Hot Discussions

*No discussion data was provided for this period — section omitted.*

## 6. Feature Request Trends

- **WebShell / IDE parity** — the dominant theme: VS Code per-message edit/rewind restoration ([#9911](https://github.com/QwenLM/qwen-code/issues/9911)), agent-team state projection ([PR #11072](https://github.com/QwenLM/qwen-code/pull/11072)), prompt-state fidelity ([PR #10941](https://github.com/QwenLM/qwen-code/pull/10941)).
- **Skills & hooks lifecycle completeness** — hooks must hold across all invocation paths and session resume/continue ([#11180](https://github.com/QwenLM/qwen-code/issues/11180), [PR #11068](https://github.com/QwenLM/qwen-code/pull/11068), [PR #11184](https://github.com/QwenLM/qwen-code/pull/11184)).
- **IM-channel deepening** — DingTalk moving from text commands to interactive approval cards and per-segment streaming ([PR #11156](https://github.com/QwenLM/qwen-code/pull/11156), [PR #10899](https://github.com/QwenLM/qwen-code/pull/10899)).
- **Multi-workspace daemon semantics** — settings scoping, extensions, and session reclamation for `qwen serve` ([#11186](https://github.com/QwenLM/qwen-code/issues/11186), [PR #11086](https://github.com/QwenLM/qwen-code/pull/11086), [PR #11120](https://github.com/QwenLM/qwen-code/pull/11120)).
- **Lightweight, self-contained exports** — shrinking the transcript renderer and fixing CDN resolution ([#11091](https://github.com/QwenLM/qwen-code/issues/11091), [#11096](https://github.com/QwenLM/qwen-code/issues/11096), [#11092](https://github.com/QwenLM/qwen-code/issues/11092)).

## 7. Developer Pain Points

- **Release pipeline instability:** v0.23.1-preview.1 failed five times ([#11185](https://github.com/QwenLM/qwen-code/issues/11185) et al.), and four separate `main` commits tripped CI ([#11183](https://github.com/QwenLM/qwen-code/issues/11183), [#11176](https://github.com/QwenLM/qwen-code/issues/11176), [#11182](https://github.com/QwenLM/qwen-code/issues/11182), [#11168](https://github.com/QwenLM/qwen-code/issues/11168)). Flaky integration/E2E tests are the root cause, spawning a steady stream of determinism fixes ([#11187](https://github.com/QwenLM/qwen-code/pull/11187), [#11181](https://github.com/QwenLM/qwen-code/pull/11181), [#11094](https://github.com/QwenLM/qwen-code/pull/11094), [#11134](https://github.com/QwenLM/qwen-code/pull/11134)).
- **Export fragility:** a 6 MB Mermaid payload ([#11091](https://github.com/QwenLM/qwen-code/issues/11091)) and 404-ing unpkg renderer URLs ([#11096](https://github.com/QwenLM/qwen-code/issues/11096)) make a flagship feature (shareable HTML transcripts) unreliable.
- **Skills/hooks trust gaps:** safety gates that silently stop enforcing after `--continue` or slash-command invocation ([#11180](https://github.com/QwenLM/qwen-code/issues/11180)) undermine confidence in policy-based workflows.
- **CI gating that verifies nothing:** the Prettier lane silently auto-formatted instead of failing ([PR #11117](https://github.com/QwenLM/qwen-code/pull/11117)) — symptomatic of quality gates that drifted into no-ops.
- **Bot-triage backlog noise:** numerous auto-filed "Deferred review findings" issues ([#10046](https://github.com/QwenLM/qwen-code/issues/10046), [#9695](https://github.com/QwenLM/qwen-code/issues/9695), [#11147](https://github.com/QwenLM/qwen-code/issues/11147), etc.) accumulate faster than they're triaged, making genuine signal harder to find; [PR #11080](https://github.com/QwenLM/qwen-code/pull/11080) aims to enrich them with assignable context.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*