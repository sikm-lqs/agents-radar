# AI CLI Tools Community Digest 2026-09-10

> Generated: 2026-09-09 23:30 UTC | Tools covered: 7

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

# AI CLI Tools Cross-Comparison Report — 2026-09-10

*Coverage: Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, OpenCode, Pi, Qwen Code*

---

## 1. Ecosystem Overview

The AI CLI space has fully matured from single-turn coding assistants into multi-surface agent platforms — every major tool now spans CLI, desktop app, and daemon/headless execution, with subagents, skills/plugins, and cross-session state as standard infrastructure. Competition has shifted from "which model" to platform qualities: sandboxing rigor, extensibility hooks, session durability, and Windows support. Two structural growing pains dominate the cycle: **scale diseases** (GB-scale session storage, backend routing outages, regression clusters) and **governance gaps** (plan-mode escapes, prompt injection, permission scoping). Notably, the tools are now interoperating and benchmarking against each other — Qwen delegates subagent turns to Claude Code over ACP, Copilot models its plugin dependency resolution on Claude Code, and Codex users cite OpenCode/Claude Code rewind as the parity bar.

---

## 2. Activity Comparison

*Counts reflect items surfaced in the 24h digest window; "N/A" indicates no data in the feed, not repo inactivity.*

| Tool | Issues (24h) | PRs (24h) | Discussions | Release Status |
|---|---|---|---|---|
| **Claude Code** | 10 hot tracked (top: 154 comments) | 1 (closed) — unusual low; feature-freeze before Function Hooks | N/A (not in feed) | **2 stable releases** (v2.1.267, v2.1.266) |
| **OpenAI Codex** | 10 hot tracked (top: **1,123 comments**) | 10 (closed/merged) | ~10 active (top idea: 190 👍) | v0.154.0 stable + 3 alphas |
| **Gemini CLI** | 10 hot tracked | 10 (3 closed) | N/A (not in feed) | Nightly only (v0.61.0) |
| **GitHub Copilot CLI** | **47 updated** / 10 hot | 1 (open) | N/A (not in feed) | v1.0.84-3 prerelease |
| **OpenCode** | 10 hot tracked (top ask: 96 👍) | 10 (5 open / 5 closed) | N/A (not in feed) | v1.18.30 stable |
| **Pi** | 10 tracked (5 open / 5 closed) | 6 (5 merged) | 2 (show-and-tell) | None |
| **Qwen Code** | 10 tracked (**6 P1**) | 10 | N/A (not in feed) | **4 releases** (v0.23.2 + nightly + TS SDK + cua-driver-rs) |

**Read:** Codex has the largest raw engagement; Copilot has the highest issue churn but near-zero visible PR flow (development happens behind GitHub's closed process); Qwen and OpenCode show the highest engineering throughput relative to community size; Pi is small but signal-dense.

---

## 3. Shared Feature Directions

| Direction | Tools & Evidence |
|---|---|
| **Windows is the weakest platform — universally** | All 7 tools report Windows-specific P1/P2 issues: Claude Code (Plan9/sandbox mount failures #92984, #92977), Codex (app freezes #20214 87👍; Store-update headless start #41539), Copilot (forced session archiving #4756 19👍; sandbox git errors #4788), Qwen (ConPTY `conhost.exe` leaks — 347 procs/2.8 GB, #11303/#11352), Gemini (NTFS 8.3 collisions #29116), OpenCode (frozen terminal pane, MSI packaging) |
| **Sandbox hardening & prompt-injection defense** | Gemini (build-file injection PR #29250, sandbox isolation #29214), Codex (WSL interop escape blocking #44286, root-read validation #44327), OpenCode (plan-mode bash heredoc bypass #39491), Copilot (fail-closed `--yolo` policy), Qwen (daemon guard false-positives #11503), Pi (community permission-gate `pi-verdict`) |
| **Autonomous / goal-mode + daemonized remote operation** | Codex (goal blocked-state #44320, daemon thread recovery #44314, remote-control idea 190👍 #9200), OpenCode (event-sourced goal mode #48239/#48240), Qwen (goal-runtime checkpoint retry #11365, `qwen serve` scheduled runs), Claude Code (Function Hooks #91870, idle channel-wake agents #44380), Gemini (subagent reliability epic) |
| **Session storage hygiene at scale** | Codex (tens–hundreds GiB rollouts #34337/#42648), OpenCode (5.8 GB `message.updated` bloat; pruning PR #48245), Qwen (embedded SQLite indexing #11433/#11493), Copilot (opaque session lifecycle #4756/#1467) |
| **Multi-provider portability / BYO gateway** | Claude Code (Bedrock/Vertex/Foundry effort caps; gateway hotfix v2.1.266), OpenCode (Bedrock DeepSeek ARNs, Azure, GPT-6 Astra prompt), Codex (GPT-6-Astra on Bedrock), Pi (OpenRouter/Mistral-hosted GLM catalog fixes), Gemini (routing must not override explicit model choice, PR #29266), Qwen (provider-configured reasoning #11328) |
| **Subagent orchestration & parallelism** | Qwen (ACP delegation to external agents incl. Claude Code, #11003), Pi (parallel multi-model agent views), OpenCode (subagent permission scoping #41730), Gemini (hang/false-success reporting #21409/#22323), Codex (resume-time process-tree leaks #37453) |
| **Token/context economics** | Codex (polling re-sends full history #13733; 60s blocking limit #31935; compaction wipes history #36642), Gemini (AST-aware reads, "tactful extraction"), Claude Code (effort caps, 200K-vs-1M misreporting), OpenCode (summary diff capping) |

---

## 4. Differentiation Analysis

- **Claude Code** — *Enterprise platform play.* Fastest hotfix cadence (regression fixed within one release), provider-federation settings (`maxEffortLevel` across Bedrock/Vertex/Foundry), and a strategic bet on **Function Hooks** as the extensibility moat (published as source plugins already, PR #93215). Pain concentrates in Cowork/Windows sandbox plumbing and auth-state desync.
- **OpenAI Codex** — *Largest surface, largest install base.* ChatGPT-subscription integration, alpha-driven release train, goals/daemon architecture, voice experiments. Weakest backend reliability signal of the group (1,123-comment 404 outage) and deep Windows app debt; Unix-only lifecycle assumptions still baked into the app server.
- **Gemini CLI** — *Security-first open-source.* The only tool where hardening work (injection, sandbox isolation, redaction-before-extraction) dominates the merged-PR stream; distinctively investing in model-intelligence features (complexity routing, AST-aware tooling, skill invocation).
- **Copilot CLI** — *GitHub-native, enterprise-policy-aware.* Strong MCP/OAuth posture for enterprise, but the tracker functions as a feedback channel (1 visible PR); long-standing accessibility debt (light theme #135/#3773 open ~1 year) indicates slower papercut response.
- **OpenCode** — *Community-driven, provider-agnostic, mid-rewrite.* v2 app (sidebar, mission control) plus aggressive performance work (session-load, event pruning); top community ask is config **hot-reload** (96👍) — a DX expectation others already meet.
- **Pi** — *Minimalist, extension-first core.* Differentiates on provider catalog hygiene, SDK purity, and now **supply-chain governance** (package-report workflow flagging `pi-safe-compact`). Smallest community, highest expert density.
- **Qwen Code** — *Most ambitious infrastructure footprint:* daemon (`qwen serve`), web shell with previews and scheduled runs, Playwright Browser SDK, computer-use driver binaries, ACP interop, ECS fleet management. Engineering output outpaces community engagement; Windows ConPTY leaks are the critical liability.

---

## 5. Community Momentum & Maturity

- **Highest engagement:** **Codex** (by far — 1,123-comment outage, 190👍 feature idea) and **Claude Code** (154-comment hooks thread with responsive vendor updates and visible roadmap influence).
- **Fastest iteration:** **Qwen Code** (4 releases/day incl. SDK and native driver artifacts) and **Claude Code** (2 same-day releases; deliberate freeze ahead of a major feature).
- **Strong velocity vs. size:** **OpenCode** (10 PRs, maintainer-led architecture design) and **Gemini CLI** (10 PRs, steady community merges, security-focused).
- **Feedback-loop lag:** **Copilot CLI** processes issues (47/day) but ships few visible PRs; chronic theming issues erode trust.
- **Maturity tiering:** Claude Code and Codex are mature at scale — and now exhibiting scale diseases (storage bloat, backend outages, regression clusters). OpenCode and Qwen are rapid mid-stage builders; Gemini is consolidating with hardening; Copilot is enterprise-polished but community-slow; Pi is a high-signal niche player.

---

## 6. Trend Signals

1. **Agents become services, not REPLs.** Remote control from mobile (Codex #9200), daemon session registries (Qwen #11488), idle-wake channels (Claude #44380), headless CI observability (`agent-watch`). → *Design for daemonized, long-horizon execution and resumability from day one.*
2. **Windows is the decisive reliability battleground.** ConPTY leaks, Store-update breakage, junction/symlink containment false-positives affect every tool. → *Windows-first QA is a competitive moat; current leaders are weakest here.*
3. **Governance and sandboxing are the enterprise differentiators.** Injection-resistant file ops, fail-closed defaults, plan-mode enforcement, and permission scoping dominate PR streams across Gemini, Codex, OpenCode, and Copilot.
4. **Token economics are now product features.** Effort caps, AST-scoped reads, server-side polling, and compaction-correctness fixes show cost control shaping architecture, not just UX.
5. **Interoperability era: ACP + MCP as connective tissue.** Qwen driving Claude Code subagents over ACP; Copilot copying Claude Code's plugin model; opencode.ai header enforcement rippling into Pi extensions. → *Build against open protocols; proprietary extension formats are a liability.*
6. **State durability is the new hidden cost.** GB-scale session logs (Codex, OpenCode) are pushing the field toward event pruning and SQLite indexing — treat session storage as a first-class engineering problem.
7. **Model portability is table stakes.** Cross-hosted models (GPT-6-Astra on Bedrock, GLM on Mistral) mean catalog hygiene and provider-agnostic routing decide power-user adoption — the core of OpenCode's and Pi's positioning.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report

*Data snapshot: 2026-09-10 — anthropics/skills official repository*

---

## 1. Top Skills Ranking

The following PRs represent the highest-impact Skill work currently moving through the repository. Each is sorted by its strategic relevance to the ecosystem (critical infrastructure fixes, broadly-applicable utilities, and architectural primitives).

### 1. skill-creator Reliability Overhaul — [PR #1298](https://github.com/anthropics/skills/pull/1298) — OPEN
**Author:** MartinCajiao
**Functionality:** Repairs `run_eval.py` so skill descriptions are evaluated against real recall signals rather than noise. Fixes Windows pipe/stream reading, trigger detection, and parallel worker behavior so the optimization loop becomes usable.
**Why it matters:** This is the *meta-skill that powers every other Skill's description tuning*. Multiple PRs (e.g. #1099, #1050, #1390) and the top-ranked Issue #556 all trace back to the same 0%-recall defect — landing #1298 unblocks the entire evaluation infrastructure.

### 2. document-typography — [PR #514](https://github.com/anthropics/skills/pull/514) — OPEN
**Author:** PGTBoos
**Functionality:** Detects and corrects typographic defects in AI-generated documents — orphan word wrap, widow paragraphs, and numbering misalignment.
**Discussion highlight:** Frames the problem as universal ("affects every document Claude generates"). Strong evidence of broad, recurring user pain across formatting-heavy workflows.

### 3. ODT Skill — [PR #486](https://github.com/anthropics/skills/pull/486) — OPEN
**Author:** GitHubNewbie0
**Functionality:** Create, fill, read, and convert OpenDocument files (`.odt`, `.ods`) and parse ODT to HTML.
**Why it matters:** Closes a long-standing gap — Anthropic's doc-skills collection historically lacked first-class ISO-standard OpenDocument support, leaving LibreOffice/ODF users underserved.

### 4. Hivemind Multi-Agent Orchestration — [PR #1628](https://github.com/anthropics/skills/pull/1628) — OPEN
**Author:** Hanishchow
**Functionality:** Delegates mechanical work to headless opencode workers on free models while Claude Code retains the planner/reviewer/merger role — a "zero-cost" delegation primitive.
**Discussion highlight:** The premise ("expensive model context is the scarce resource, not its intelligence") resonates with the broader cost-routing direction several other proposals share (see Issues #228, #16).

### 5. self-audit Quality Gate — [PR #1367](https://github.com/anthropics/skills/pull/1367) — OPEN
**Author:** YuhaoLin2005
**Functionality:** Pre-delivery audit combining mechanical file verification with a four-dimension reasoning quality check (severity-ordered). Universal — works with any stack or model.
**Why it matters:** Companion to Issue #1385, the author's broader "Reasoning Quality Gate Pipeline" proposal. Positions Skills as the natural home for *delivery-time* verification rather than generation-time prompting.

### 6. skill-quality-analyzer + skill-security-analyzer — [PR #83](https://github.com/anthropics/skills/pull/83) — OPEN
**Author:** eovidiu
**Functionality:** Two meta-skills that score Skills across five quality dimensions and surface security weaknesses.
**Discussion highlight:** Directly addresses the trust-boundary concerns in top-ranked Issue #492 (43 comments). Landing these gives the maintainers an automated way to gate community Skills at review time.

### 7. testing-patterns — [PR #723](https://github.com/anthropics/skills/pull/723) — OPEN
**Author:** 4444J99
**Functionality:** End-to-end testing guidance — testing trophy model, AAA patterns, React component testing with Testing Library, and what *not* to test.
**Why it matters:** Fills an obvious developer-experience gap; testing workflows are among the most-requested patterns in Claude Code usage outside of Skills.

### 8. scnet-hpc — [PR #1615](https://github.com/anthropics/skills/pull/1615) — OPEN
**Author:** lql341
**Functionality:** Operate SCNet HPC clusters via profile-based SSH + Slurm workflows, with cluster discovery and compute-node guidance.
**Discussion highlight:** Demonstrates Skills evolving from generic utilities into *vertical*, infrastructure-aware capabilities — a likely direction for the ecosystem in 2026.

---

## 2. Community Demand Trends

Distilled from the top 15 community Issues (sorted by comment volume):

| Demand Vector | Anchor Issue(s) | Comment Volume |
|---|---|---|
| **Trust & security boundaries for community Skills** | [#492](https://github.com/anthropics/skills/issues/492) — Skills impersonating Anthropic under the `anthropic/` namespace | 43 |
| **Org-wide skill distribution** | [#228](https://github.com/anthropics/skills/issues/228) — Share Skills across teams without manual `.skill` file passing | 16 |
| **Reliable Skill trigger / recall** | [#556](https://github.com/anthropics/skills/issues/556) — `run_eval.py` records 0% recall across all queries | 12 |
| **Persistent agent memory in compact notation** | [#1329](https://github.com/anthropics/skills/issues/1329) — `compact-memory` symbolic notation for agent state | 9 |
| **Skill-creator best-practice rewrite** | [#202](https://github.com/anthropics/skills/issues/202) — Token-heavy, human-explaining instead of instructing | 8 |
| **Agent governance & safety patterns** | [#412](https://github.com/anthropics/skills/issues/412) — Policy enforcement, threat detection, audit trails | 6 |
| **Plugin deduplication** | [#189](https://github.com/anthropics/skills/issues/189) — `document-skills` vs `example-skills` install identical content | 6 |
| **Skills ↔ MCP protocol alignment** | [#16](https://github.com/anthropics/skills/issues/16) — Expose Skills as MCPs for cross-agent portability | 4 |
| **Context-window / token discipline** | [#1487](https://github.com/anthropics/skills/issues/1487) — `claude-api` injects ~156k tokens eagerly | 4 |
| **Platform coverage** | [#29](https://github.com/anthropics/skills/issues/29) Bedrock, [#1175](https://github.com/anthropics/skills/issues/1175) SharePoint | 4 each |

**Patterns emerging:**

- **Quality infrastructure dominates demand.** Three of the top five issues (#556, #492, #189) concern *how Skills are evaluated, trusted, and de-duplicated* — not which Skills exist.
- **Distribution > authoring.** Issue #228's 16 comments indicate the community's biggest near-term friction is *sharing* Skills, not *creating* them.
- **Cost-aware multi-agent delegation** is a rising vector, surfacing in #16 (Skills-as-MCPs), #1329 (compact-memory), and #1628 (Hivemind).

---

## 3. High-Potential Pending Skills

PRs that have substantial scope, active engagement, and remain OPEN — likely candidates for near-term landing:

| Skill | PR | Focus | Notes |
|---|---|---|---|
| skill-creator eval reliability | [#1298](https://github.com/anthropics/skills/pull/1298) | Core infra fix | Unblocks 3+ dependent bugs |
| document-typography | [#514](https://github.com/anthropics/skills/pull/514) | Doc QA | Broad applicability |
| ODT | [#486](https://github.com/anthropics/skills/pull/486) | Open format support | Closes ecosystem gap |
| Hivemind | [#1628](https://github.com/anthropics/skills/pull/1628) | Multi-agent orchestration | New architectural primitive |
| self-audit | [#1367](https://github.com/anthropics/skills/pull/1367) | Output verification | Tied to Issue #1385 proposal |
| skill-quality-analyzer + skill-security-analyzer | [#83](https://github.com/anthropics/skills/pull/83) | Meta tooling | Direct response to #492 |
| testing-patterns | [#723](https://github.com/anthropics/skills/pull/723) | Dev productivity | High reuse potential |
| scnet-hpc | [#1615](https://github.com/anthropics/skills/pull/1615) | Vertical HPC ops | Demonstrates domain depth |

Two adjacent *bug-fix* PRs worth flagging: [#539](https://github.com/anthropics/skills/pull/539) (YAML-quote validation in `skill-creator`) and [#538](https://github.com/anthropics/skills/pull/538) (case-sensitivity in pdf SKILL.md) — small, low-risk, and clear unblockers for affected workflows.

---

## 4. Skills Ecosystem Insight

**The community's most concentrated demand is for Skills that govern other Skills — evaluation, security, deduplication, and org-wide distribution — rather than for new domain-specific capabilities.** The 43-comment dominance of Issue #492, paired with the simultaneous push toward `skill-quality-analyzer` (#83), `skill-creator` reliability (#1298), and cross-agent Skills-as-MCPs (#16), signals a maturing ecosystem where the next bottleneck is *trust and operational hygiene*, not content coverage.

---

# Claude Code Community Digest — 2026-09-10

## Today's Highlights
Two rapid releases landed in 24 hours — **v2.1.267** introduced `maxEffortLevel` (capping effort across Bedrock/Vertex/Foundry) and `--system-prompt-snapshot off`, while **v2.1.266** fixed a regression that broke LLM-gateway/proxy users. The community also received a major update on the most-discussed issue of the cycle: **Function Hooks (#91870)** is committed to ship "on the scale of weeks," confirming community-driven design feedback has materially shaped the roadmap.

---

## Releases

- **v2.1.267** — Adds `maxEffortLevel` setting (top-level or per-model under `modelSettings`) that caps effort level across every provider (Bedrock, Vertex, Foundry); users can still pick a lower level. Also adds `--system-prompt-snapshot off` to render the system prompt fresh on every request.
- **v2.1.266** — Hotfix: a 2.1.265 regression where the undocumented `CLAUDE_CODE_USE_GATEWAY` environment variable began forcing Cloud-gateway sign-in on its own (previously required both `ANTHROPIC_BASE_URL` and `ANTHROPIC_AUTH_TOKEN`). This unblocks LLM-gateway and proxy setups.

---

## Hot Issues

1. **[#91870 — Function Hooks: make plugins 10x more powerful](https://github.com/anthropics/claude-code/issues/91870)** (154 comments, 90 👍)
   The most-discussed thread on the repo. Anthropic posted a community update (Sep 9) confirming function hooks are committed to ship "in weeks," crediting high-signal feedback for shaping the design. Why it matters: function hooks turn plugins into first-class automation primitives — a 10x capability jump for any team building on Claude Code plugins.

2. **[#92984 — Cowork (Windows): Plan9 shares fail after KB5124008](https://github.com/anthropics/claude-code/issues/92984)** (27 comments, 12 👍)
   After Windows update KB5124008 (26200.9445), all Plan9 mounts in Cowork fail with "Plan9 mount failed: invalid argument." Uninstalling the KB fixes it. High-impact for Windows Cowork users — points to OS-update interaction with sandbox plumbing.

3. **[#64568 — Esc rejects tool-use prompt instead of exiting /btw mode](https://github.com/anthropics/claude-code/issues/64568)** (13 comments, 9 👍)
   Open since June, regressed behavior where pressing Esc to exit `/btw` mode also declines the pending tool-use prompt. Reproduced on macOS. A classic "modal escape routing" bug that hurts muscle memory.

4. **[#44380 — Channel messages don't wake idle sessions (--channels plugin)](https://github.com/anthropics/claude-code/issues/44380)** (12 comments, 6 👍)
   Telegram messages display in the terminal but never trigger Claude processing when idle — REPL waits for keyboard input instead of interrupting. Long-standing plugin bug that blocks real "agent on standby" workflows.

5. **[#76577 — Persist Transcript view mode (Desktop) across sessions](https://github.com/anthropics/claude-code/issues/76577)** (10 comments, 6 👍)
   Simple but high-quality-of-life: Desktop forgets transcript view mode every session. A consistent ask from power users.

6. **[#92977 — Cowork local sandbox not mounting (Windows Desktop 1.49585.0.0)](https://github.com/anthropics/claude-code/issues/92977)** (7 comments, 1 👍)
   Regression in the latest Desktop build — local sandbox won't mount on Windows. Part of a cluster of Cowork/sandbox regressions landing this week.

7. **[#90117 — Mic button disappears after first dictation on macOS desktop](https://github.com/anthropics/claude-code/issues/90117)** (6 comments, 3 👍)
   Voice input becomes unusable until the user manually clears the input box. Labeled invalid, but the UX papercut is real.

8. **[#79810 — Custom sidebar groups disappear after switching accounts](https://github.com/anthropics/claude-code/issues/79810)** (5 comments, 4 👍)
   Desktop app loses sidebar organization on account switch — a persistence/state-management bug that erodes user trust.

9. **[#93219 — Effort slider inert on Desktop macOS (all models stuck at Max)](https://github.com/anthropics/claude-code/issues/93219)** (2 comments, 0 👍)
   Fresh bug coinciding with v2.1.267's `maxEffortLevel` introduction — users can no longer lower effort from the UI. Worth watching for regressions in the new setting.

10. **[#92893 — Injected commit/PR attribution overrides CLAUDE.md trailer rule](https://github.com/anthropics/claude-code/issues/92893)** (1 comment, 0 👍)
    A system-reminder at session start overrides project-level CLAUDE.md guidance for git commit trailers. A philosophical concern: CLI should not dictate project-level attribution policy.

---

## Key PR Progress

Only **1 PR** is in the latest activity window; it was already closed:

- **[#93215 — Add mods: sec-default, diff and telemetry (CLOSED)](https://github.com/anthropics/claude-code/pull/93215)** by poteat
  Published three hooks-module plugins as source: `sec-default` (org-level outermost plugin), `diff` (`/diff`), and `telemetry` (`$.telemetry`). Loads only where function hooks are enabled — a real-world preview of what plugins look like under the new hooks system announced in #91870.

> *Note: PR volume is unusually low (1 in 24h). The repo appears to be in a feature-freeze / stabilization period while Function Hooks work finalizes.*

---

## Feature Request Trends

Distilled from the issue list:

- **Function hooks / plugin extensibility** (#91870) — by far the loudest request, and now officially on the roadmap.
- **Cross-session and cross-device continuity** (#85150 closed, #44380) — persistent sessions, agent messaging across sessions, mobile handoff.
- **Desktop UX persistence** — transcript view mode (#76577), sidebar groups (#79810), effort slider (#93219).
- **Cowork/sandbox reliability on Windows** — multiple reports (#92984, #92977, #93071) all within 24h, suggesting a single root-cause wave.
- **1M context window reporting** — repeated requests to fix the 200K vs 1M window mismatch for Opus 5 (#81693) and Sonnet 5 (#84310).
- **Account/auth resilience** — gateway regression (#92984 area), OAuth redirect mismatches (#88877), subscription state desync (#83639).
- **Attribution / project policy overrides** (#92893) — letting project `CLAUDE.md` win over CLI defaults.

---

## Developer Pain Points

The recurring frustrations across the issue tracker:

1. **Regressions cluster on Cowork/Windows sandbox** — three separate Plan9 / sandbox-mount bugs opened in a single day indicate a fragile interaction with the Windows ecosystem (KB updates, Desktop build 1.49585.0.0). **Action:** users on Windows should pin a known-good version or uninstall recent Windows KBs as a workaround.
2. **Modal/keyboard routing edge cases** — `/btw` mode (#64568), fullscreen sticky prompt bar (#91024), Esc handling. The TUI has grown complex enough that input routing needs dedicated QA.
3. **Subscription and auth state desync** — multiple "Not logged in" mid-session reports (#83639), Fable 5 missing after re-login (#76237), OAuth redirect path mismatch (#88877). The auth layer needs hardening.
4. **Context window misreporting** — Claude Code reports 200K for 1M-context models, breaking statusline gauges and confusing `/compact` behavior. Affects both Opus 5 and Sonnet 5.
5. **Long-running issues ignored** — #64568 (June), #44380 (April), #85167 (Opus 5 reliability) all show comments drifting without resolution. **Action:** star/upvote to surface them — the team appears responsive to high-comment threads (cf. #91870).
6. **Gateway/proxy ecosystem fragility** — the v2.1.265→2.1.266 fix shows how a single undocumented env var change can break enterprise gateway users. **Action:** if you operate a proxy, upgrade to ≥2.1.266 immediately.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-10

## 1. Today's Highlights

- **Codex CLI 0.154.0 is out**: GPT-6-Astra is now in the model picker and Amazon Bedrock catalogs, and experimental worktree support (`--worktree` / `/worktree`) is shipped, letting users create isolated checkouts for new or forked sessions. ([release](https://github.com/openai/codex/releases/tag/rust-v0.154.0))
- **A massive connectivity bug report is dominating the queue**: Issue [#28756](https://github.com/openai/codex/issues/28756) — `404 Not Found` from `chatgpt.com/backend-api/codex/responses` on GPT-5.4 xhigh sessions — now has 1,123 comments and 83 👍, signaling a broad, persistent outage that has yet to be resolved.
- **Storage growth and Windows reliability remain the dominant pain points**: A new tracking issue, [#42648](https://github.com/openai/codex/issues/42648), calls out unbounded Codex local session storage across multiple interacting mechanisms, joining the existing [#34337](https://github.com/openai/codex/issues/34337) and a wave of Windows-only app bugs.

## 2. Releases

**`rust-v0.154.0`** ([release notes](https://github.com/openai/codex/releases/tag/rust-v0.154.0))
- **GPT-6-Astra** is now selectable from the model picker and from the Amazon Bedrock model catalog. [#42879](https://github.com/openai/codex/pull/42879), [#42619](https://github.com/openai/codex/pull/42619)
- **Experimental worktree support**: create isolated checkouts for new or forked sessions using `--worktree` (CLI) or `/worktree` (TUI), then browse and resume them. [#42652](https://github.com/openai/codex/pull/42652), [#43069](https://github.com/openai/codex/pull/43069), [#43120](https://github.com/openai/codex/pull/43120), [#43…

Pre-release line **`0.154.0-alpha.6.1`**, **`0.154.0-alpha.10.2`**, and **`0.154.0-alpha.11`** were published ahead of the stable cut. ([alpha.6.1](https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.6.1), [alpha.10.2](https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.10.2), [alpha.11](https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.11))

## 3. Hot Issues

1. **[#28756 — `unexpected status 404 Not Found` on `chatgpt.com/backend-api/codex/responses`](https://github.com/openai/codex/issues/28756)** — 1,123 comments. Persistent backend 404s during GPT-5.4 xhigh sessions on macOS arm64 (Pro x20). The volume and the `cf-ray` Cloudflare headers point to a server-side routing failure rather than a client misconfiguration.
2. **[#20214 — Codex App freezes/stutters on Windows 11 Pro](https://github.com/openai/codex/issues/20214)** — 111 comments, 87 👍. The most upvoted Windows perf complaint, on a Ryzen 5 / 32 GB machine — symptoms suggest a render-loop or IPC issue, not resource exhaustion.
3. **[#25178 — Windows Computer Use screenshot fails on Windows 10 22H2](https://github.com/openai/codex/issues/25178)** — 53 comments. `SetIsBorderRequired failed: 不支持此接口 (0x80004002)` blocks `get_window_state`. The same error re-appears in newer builds (see #43259).
4. **[#13733 — Background process polling wastes tokens](https://github.com/openai/codex/issues/13733)** — 40 comments, 40 👍. Every `write_stdin` poll re-sends the full conversation history to the API, scaling cost with history × poll count. A long-standing request for server-side status polling.
5. **[#34337 — Codex CLI/Desktop sessions can silently grow to tens–hundreds of GiB](https://github.com/openai/codex/issues/34337)** — 11 comments. Rollouts are co-located between CLI and Desktop, with no practical cap or rotation. Now complemented by tracking issue #42648.
6. **[#41539 — Windows app starts headless ~12 min after Store auto-update](https://github.com/openai/codex/issues/41539)** — 8 comments. Update-policy gate plus synchronous `cua_node` runtime re-extraction block window creation, freezing the main process event loop.
7. **[#42669 — Windows Codex desktop: processes launch but no window appears](https://github.com/openai/codex/issues/42669)** — 8 comments. `Artifact Session host Unix-socket transport is not available on Windows` indicates the Windows app-server still has Unix-only lifecycle assumptions baked in.
8. **[#37453 — Opening/resuming historical subagent threads spawns duplicate MCP + node_repl stacks on Windows](https://github.com/openai/codex/issues/37453)** — 8 comments. Lifecycle/refresh handling for MCP and subagents leaks process trees when resuming history.
9. **[#36642 — Auto-compaction silently discards all conversation history since 0.145.0](https://github.com/openai/codex/issues/36642)** — 6 comments, 2 👍. A regression in compaction that wipes context instead of summarizing it — a serious correctness/UX risk on Pro plans.
10. **[#31935 — Remove the 60-second limit on blocking waits](https://github.com/openai/codex/issues/31935)** — 5 comments, 11 👍. Asks OpenAI to drop the `>60s blocking sleep` guidance in the GPT-5.6 developer prompt, which forces long-running commands into wasteful polling.

## 4. Key PR Progress

1. **[#44332 — Persist disabled plugin IDs in thread settings](https://github.com/openai/codex/pull/44332)** — Adds `disabled_plugin_ids` to thread startup options, snapshots, and persisted turn contexts; restores the selection on resume. (Closed)
2. **[#44331 — Expose voice conversations in experimental features](https://github.com/openai/codex/pull/44331)** — Marks `realtime_conversation` as experimental and labels it "Voice conversations" in `/experimental`, with an announcement pointing to `/voice`. (Closed)
3. **[#44327 — Prevent filesystem-root read denies in the Windows sandbox](https://github.com/openai/codex/pull/44327)** — Validates effective `:root` read access before elevated Windows sandbox setup; service provisioning refuses roots that deny reads, fixing a class of foot-guns. (Closed)
4. **[#44320 — Block goals after three empty automatic continuation turns](https://github.com/openai/codex/pull/44320)** — Marks a goal as `blocked` after three consecutive empty final answers with no other activity, stopping silent spin loops. (Closed)
5. **[#44318 — Independent MCP protocol opt-in for hosted Codex Apps](https://github.com/openai/codex/pull/44318)** — Adds `features.codex_apps_mcp_2026_07_28`, disabled by default, so the host-owned Codex Apps MCP server can pick a protocol independently. (Closed)
6. **[#44314 — Restore saved threads when the managed daemon restarts](https://github.com/openai/codex/pull/44314)** — Consumes the recovery snapshot at startup so active goals continue without waiting for a client reconnect. (Closed)
7. **[#44311 — Honor shared `Retry-After` deadlines for remote control](https://github.com/openai/codex/pull/44311)** — Centralizes server delay tracking so pairing, auth changes, reconnects, and token refresh all respect the same deadline. (Closed)
8. **[#44307 — Opt-in provisioned macOS CLI release candidates](https://github.com/openai/codex/pull/44307)** — A `CODEX_PROVISIONED_MACOS_CANDIDATE`-gated workflow packaging `CodexCLI.app` for Apple Silicon and Intel. (Closed)
9. **[#44286 — Block WSL interop escapes from restricted filesystem sandboxes](https://github.com/openai/codex/pull/44286)** — Masks WSL interop sockets in `bubblewrap…` so an enabled network cannot be used to escape back into root. (Closed)
10. **[#44288 — Prevent command hooks from hanging on blocked stdin](https://github.com/openai/codex/pull/44288)** — Writes stdin concurrently with output draining and inside the hook timeout, eliminating deadlocks when pipe buffers fill. (Closed)

## 5. Hot Discussions

### Ideas
- **[#9200 — Remote-control Codex from the ChatGPT app](https://github.com/openai/codex/discussions/9200)** — 190 👍, 46 comments. The single most upvoted idea: a headless Codex daemon that the mobile ChatGPT UI can drive, replacing the user's current Tailscale + Terminus workaround.
- **[#9618 — How is there not a /rewind or /revert feature?](https://github.com/openai/codex/discussions/9618)** — 128 👍, 22 comments. A persistent call for undo/rewind, framed as a parity gap with OpenCode and Claude Code.
- **[#38834 — Reader Mode with Read Aloud for Codex and ChatGPT desktop](https://github.com/openai/codex/discussions/38834)** — Proposes an audio-first listening mode for long assistant outputs (plans, reviews, logs).

### Q&A / General
- **[#3057 — Codex using Python to make edits to files](https://github.com/openai/codex/discussions/3057)** — 34 👍. Users compare the CLI's preference for shelling out to Python vs. using its built-in File Edit tool; speculation about fallback behavior when the edit tool is unavailable.
- **[#14104 — Insert new line in Codex CLI](https://github.com/openai/codex/discussions/14104)** — 16 👍. Pushes for `Shift+Enter` instead of `Ctrl+J` for newlines in the TUI.
- **[#40132 — What are you building with Codex?](https://github.com/openai/codex/discussions/40132)** — Open thread inviting workflows and tips from the community.
- **[#41527 — Successful native ChatGPT Linux app on SteamOS 3.8.16](https://github.com/openai/codex/discussions/41527)** — Confirms the official Linux preview runs natively on Steam Deck, an Arch-based distro not on the support matrix.

### Show and tell
- **[#42041 — agent-watch: telling DONE, FAILED, and STALL apart when you run `codex exec` in the background](https://github.com/openai/codex/discussions/42041)** — Distinguishes a worker that finished, died, or silently stalled waiting for approval — a common CI/agent-orchestration pain.
- **[#44291 — Brain Scanner: inspect recorded coding-agent work, then queue the next fix](https://github.com/openai/codex/discussions/44291)** — Hosted project workspace that connects a project graph, agent context, and change history.
- **[#44247 — Codex Voice for Intel Mac users](

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-10

## Today's Highlights

A security-focused day for Gemini CLI: the v0.61.0 nightly ships a sandbox hardening fix that isolates the settings directory inside containers, while fresh PRs address prompt injection via build files and a crash on authentication in restricted-permission git repos. Meanwhile, the agent ecosystem remains the most active area — multiple open issues track subagent reliability (hanging generalist agent, false "GOAL success" after MAX_TURNS, browser subagent failures on Wayland) and Auto Memory quality improvements.

---

## Releases

**v0.61.0-nightly.20260909.ged2ac40df**
- `fix(core)`: Mitigate NTFS 8.3 short-name (SFN) path collisions (#29116)
- `fix(cli)`: Isolate the settings directory inside sandbox containers (#29216)

🔗 [View release](https://github.com/google-gemini/gemini-cli/pull/29116)

---

## Hot Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — *Subagent recovery after MAX_TURNS is reported as GOAL success* (p1, 13 comments, 👍2)
   The `codebase_investigator` subagent reports `status: "success"` even when it hit the turn limit before analyzing anything. A misleading success signal that hides interruptions; flagged `status/need-retesting`.

2. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — *Zero-Dependency OS Sandboxing & Post-Execution Intent Routing* (p2, 9 comments, 👍1)
   Proposes leveraging Gemini 3's native bash training via OS-level sandboxing (Seatbelt/Bubblewrap) instead of in-process restrictions, balancing model affinity with safety.

3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — *Generalist agent hangs* (p1, 8 comments, 👍8)
   Gemini CLI hangs indefinitely whenever it defers to the generalist agent — even for trivial folder creation. The highest community-upvoted active bug; users report waiting an hour before cancelling.

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — *Assess the impact of AST-aware file reads, search, and mapping* (p2, 7 comments, 👍1)
   EPIC tracking whether AST-aware tooling (method-bounded reads, structured search) can reduce wasted turns and token noise.

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** — *Gemini does not use skills and sub-agents enough* (p2, 6 comments)
   Despite well-described "gradle" and "git" skills, the model rarely invokes them without explicit user instruction — undermines the value of the skill system.

6. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)** — *Add deterministic redaction and reduce Auto Memory logging* (p2 security, 5 comments)
   Auto Memory streams transcript content into the extraction model *before* redaction prompts run, and skill service can log pre-redaction content. A privacy-relevant hardening item.

7. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)** — *Shell command stuck at "Waiting input" after command completes* (p1, 4 comments, 👍3)
   Even trivial CLI invocations leave the shell tool in `Awaiting user input` state after completion — a recurring UX bug with 👍3 signal.

8. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** — *Browser subagent fails on Wayland* (p1, 4 comments, 👍1)
   Browser subagent reports `Termination Reason: GOAL` without doing work under Wayland — blocks Linux desktop users on non-X11 sessions.

9. **[#22232](https://github.com/google-gemini/gemini-cli/issues/22232)** — *Browser agent session takeover and lock recovery* (p3, 4 comments)
   `BrowserManager.ts` currently fails fast on locked profiles. Feature request asks for automatic session takeover / orphaned-process recovery.

10. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** — *Gemini CLI encounters 400 error with > 128 tools* (p2, 3 comments)
    Hard limit on tool count surfaces as a 400 from the upstream API. Asks for smarter scoping of tools presented to the agent.

---

## Key PR Progress

1. **[#29250](https://github.com/google-gemini/gemini-cli/pull/29250)** — *Prevent indirect prompt injection via build file modifications and untrusted flags* (size/xl)
   Refactors `shell`, `edit`, and `write_file` to validate workspace boundaries against build-config files and external command params under restricted mode.

2. **[#29214](https://github.com/google-gemini/gemini-cli/pull/29214)** — *Harden sandbox filesystem boundaries and isolate runtime state* (size/l-xl)
   Replaces host directory mounts with sanitized config files inside the sandbox; standardizes `realpath` resolution for path-sensitivity checks.

3. **[#29265](https://github.com/google-gemini/gemini-cli/pull/29265)** — *Prevent session context poisoning on interrupted turns* (size/m)
   Fixes a critical bug where SIGINT, aborts, or aborted tool executions leave corrupted content in the active chat history, breaking subsequent prompts.

4. **[#29266](https://github.com/google-gemini/gemini-cli/pull/29266)** — *Prevent complexity routing from overriding manually selected concrete models* ✅ (CLOSED)
   Resolves b_556300139: when `CliComplexityBasedRouting__enabled`, the GCA was silently downgrading explicit `gemini-3-1-pro-preview-paid-tier` selections to 2.5 Flash.

5. **[#29163](https://github.com/google-gemini/gemini-cli/pull/29163)** — *Prevent crash during authentication in git repositories* (size/l)
   `useGitBranchName` hook no longer crashes when run inside a repo on macOS Seatbelt or other restricted permission environments.

6. **[#29156](https://github.com/google-gemini/gemini-cli/pull/29156)** — *Stop nullifying user git config in shell executions* (size/m)
   `ShellExecutionService.prepareExecution` was redirecting `GIT_CONFIG_GLOBAL`/`GIT_CONFIG_SYSTEM` to `/dev/null` for every shell command. This restores `user.name`/`user.email` resolution inside the tool.

7. **[#29155](https://github.com/google-gemini/gemini-cli/pull/29155)** — *Decode BOM-encoded content correctly in `isEmpty`* (size/m)
   UTF-16/UTF-32 BOM-prefixed whitespace-only plan files were being misclassified as non-empty, blocking plan checks.

8. **[#29151](https://github.com/google-gemini/gemini-cli/pull/29151)** — *Handle skill precedence and active state case-insensitively* (size/m)
   `SkillManager` precedence overrides and active tracking now ignore casing differences — fixes workspace skills silently losing to built-ins.

9. **[#29262](https://github.com/google-gemini/gemini-cli/pull/29262)** — *Add dynamic toggle for alternate buffer mode* ✅ (CLOSED, p1, size/xl)
   Prevents yoga-wasm OOB crashes by avoiding synchronous history unmounts and eliminates duplicated footer artifacts when exiting alternate buffer.

10. **[#29067](https://github.com/google-gemini/gemini-cli/pull/29067)** — *Remove misleading security schemes and hardcoded credentials from a2a-server* ✅ (CLOSED, p1/p2)
    `coderAgentCard` previously advertised security schemes for unauthenticated local dev endpoints and `customUserBuilder` shipped hardcoded insecure defaults.

---

## Hot Discussions

*No Discussion data was provided in the source feed — section omitted.*

---

## Feature Request Trends

Across the issue tracker, the strongest demand clusters around three themes:

- **AST-aware tooling** (#22745, #22746) — symbol-bounded reads, codebase mapping, and structured search to cut wasted turns and token cost.
- **Surgical / token-frugal context loading** (#19561 "Tactful Extraction") — explicit grep-first, then scoped read hierarchy to replace "firehose" file reads.
- **Self-awareness & persistent task tracking** (#21432, #18836, #21000) — accurate CLI flag knowledge, replacing in-context `WriteToDo` with persistent file-based CRUD, and integrating `/chat share` with subagent trajectories (#22598).
- **Browser subagent maturity** (#22232, #21983) — resilient session takeover, lock recovery, and Wayland support.
- **Auto Memory hygiene** (#26525, #26522, #26523, #26516) — deterministic redaction, stop-retry semantics, invalid patch quarantine, and broader quality improvements.

---

## Developer Pain Points

- **Agent hangs and silent failures**: The generalist-agent hang (#21409, 👍8) and shell command "Waiting input" stalls (#25166) are the most visible reliability regressions — users can't trust long-running sessions.
- **Subagent termination reporting**: MAX_TURNS, aborts, and failure modes (#22323, #26525, #26522) report misleading success — destroys observability and post-mortem via `/bug` (#21763).
- **Sandboxing & permissions friction**: macOS Seatbelt (#29163), NTFS 8.3 SFN collisions (#29116), and the missing settings-dir isolation inside containers (#29216) all point to rough edges around cross-platform restricted modes.
- **Tool count ceiling**: >128 tools causes upstream 400s (#24246); users with many extensions/skills hit a hard wall.
- **Skill/sub-agent underuse**: Even with well-described skills (#21968), the model rarely invokes them unless told — undermines user investment in customization.
- **Git config nullification** (#29156): The shell tool was wiping `GIT_CONFIG_GLOBAL`/`GIT_CONFIG_SYSTEM`, breaking `user.name`/`email` in any downstream git command — a particularly subtle source of confusion for contributors.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest
**Date:** 2026-09-10

---

## 1. Today's Highlights

The CLI shipped **v1.0.84-3** with two fixes addressing `/copy` task-completion capture and reliable OAuth MCP server connections at session startup. Community attention is dominated by long-standing **light-theme rendering bugs** (#135, #3773) that remain unresolved across multiple versions, alongside a cluster of fresh Windows-specific and MCP authentication regressions filed in the last 72 hours. Several enterprise/policy edge cases (#4757, #4793) have already been closed, suggesting the maintainers are actively triaging the triage backlog.

---

## 2. Releases

**[v1.0.84-3](https://github.com/github/copilot-cli/releases/tag/v1.0.84-3)** — prerelease
- **`/copy` includes task completion messages when available** — ensures copied session output captures the final assistant turn rather than truncating at the last user-visible block.
- **OAuth-authenticated MCP servers connect reliably during session startup** — fixes a race where OAuth-protected MCP servers could fail to bind before the agent begins its first tool-discovery call.

---

## 3. Hot Issues

| # | Issue | Why it matters |
|---|---|---|
| [#135](https://github.com/github/copilot-cli/issues/135) — *Light theme doesn't work* (12 👍) | Open since 2025-09; 12 comments indicate long-standing frustration with light-terminal rendering. Pairs with #3773 below. |
| [#4535](https://github.com/github/copilot-cli/issues/4535) — `store_memory` fails in v1.0.81 prereleases | Affects the experimental memory toolchain — `Instance id is required` blocks any agent that relies on persistent memory. |
| [#4756](https://github.com/github/copilot-cli/issues/4756) — Windows app requires archiving every idle project session (19 👍) | High community signal; Windows users must manually archive before every new Local session. |
| [#3773](https://github.com/github/copilot-cli/issues/3773) — Broken light theme | Accessibility impact — low-contrast prompt and selection highlight are unreadable. |
| [#3700](https://github.com/github/copilot-cli/issues/3700) — WSL2 regression: 215% CPU + frozen TUI | High severity; marked as a regression of #2208 and reproduces on every clean reboot. |
| [#3976](https://github.com/github/copilot-cli/issues/3976) — Native `tgrep` indexer OOM-kills host | Experimental `copilot_cli_tgrep` daemon has no memory cap; dangerous on monorepos. |
| [#4775](https://github.com/github/copilot-cli/issues/4775) — Mission Control dashboard 404s | Production dashboard links point to `/copilot/tasks/<uuid>` but live sessions are at `/agents/tasks/<uuid>`. |
| [#2199](https://github.com/github/copilot-cli/issues/2199) — Add Ctrl+Backspace to delete whole word (7 👍) | Quality-of-life request that mirrors long-standing Unix/Windows editor convention. |
| [#3858](https://github.com/github/copilot-cli/issues/3858) — Ctrl+Backspace broken on Windows (6 👍) | Cross-platform inconsistency; only Alt+Backspace works as a workaround. |
| [#4769](https://github.com/github/copilot-cli/issues/4769) — MCP OAuth fails when metadata URL is redirected | Affects any MCP server that serves `.well-known/openid-configuration` behind an HTTP redirect — common in enterprise setups. |

*Closed this cycle:* [#2147](https://github.com/github/copilot-cli/issues/2147) (CAIP 400 input-item error), [#367](https://github.com/github/copilot-cli/issues/367) (multi-account switching — closed as `more-info-needed`), [#4757](https://github.com/github/copilot-cli/issues/4757) (`--yolo`/`--allow-all` blocked by fail-closed policy).

---

## 4. Key PR Progress

Only **one PR** is currently active in the 24h window:

- **[#4786 — Revise notice regarding third-party services](https://github.com/github/copilot-cli/pull/4786)** *(open)* — updates the third-party services disclosure to clarify access requirements and terms. Low-scope but relevant for compliance review.

---

## 5. Hot Discussions

*No discussion data was provided in the source feed — section omitted.*

---

## 6. Feature Request Trends

Across open issues, several request themes are converging:

1. **Theming control** — #4620 (pin light/dark), #135/#3773 (fix light theme). Users want the GitHub palette decoupled from OS/terminal appearance.
2. **Multi-account workflows** — #367 (account switching), #4791 (switching produces irrecoverable 400 errors).
3. **Input ergonomics parity** — #2199 + #3858 (Ctrl+Backspace), #4794 (visible command history for demos).
4. **Plugin ecosystem maturity** — #4487 (inter/intra marketplace dependency resolution, modeled after Claude Code).
5. **Enterprise MCP integration** — #3772 (authenticated registry reads), #4769 / #4793 / #4795 (OAuth flow robustness, callback port consistency).
6. **Session lifecycle polish** — #1467 (auto-resume last session), #4756 (no manual archive on Windows), #4764 (assisted-permissions mode expires after ~1h).
7. **CLI demo/UX** — #4794 (visible command line above input for live audiences), #4789 (Ctrl+C should copy selected text, not cancel confirmations).

---

## 7. Developer Pain Points

- **Light theme is effectively unusable** — repeated reports across #135 and #3773 show this has not been prioritized despite high 👍 counts; the same screenshot patterns recur over many releases.
- **Windows is consistently the weakest platform surface** — session creation (#4756), taskbar presence stuck in `taskState 0` (#4771), Windows sandbox `git status` permission errors (#4788), and Ctrl+Backspace (#3858) all converge into a pattern of Windows-specific regressions.
- **MCP authentication is fragile** — three new OAuth failures filed in 48h (#4769, #4793, #4795), covering redirected metadata URLs, callback port drift, and provider-side callback mismatches. v1.0.84-3's fix for MCP OAuth startup reliability is a positive signal but these adjacent flows remain open.
- **Session management is opaque** — users cannot distinguish recent sessions by recency (#1467), `assisted` permissions silently expire (#4764), and Mission Control links to dead paths (#4775).
- **Resource-exhaustion risks in experimental tools** — `tgrep` (#3976) and the unreleased autopilot taskbar card (#4771) both expose termination/stuck-state bugs with no user-visible safeguards.
- **Demo and accessibility friction** — disappearing input commands (#4794), unreadable light-mode contrast (#3773), and Ctrl+C copying inside confirmations (#4789) all degrade the "watch a colleague use it" experience.

---

*Digest generated from GitHub data for `github/copilot-cli` covering the 24h window ending 2026-09-10. 47 issues updated; 1 PR updated; 1 prerelease published.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-10

## Today's Highlights
OpenCode shipped **v1.18.30**, landing Astra system-prompt support for GPT-6 plus targeted provider fixes for Bedrock (DeepSeek ARN IDs), Azure, and OpenAI SDKs. The community focus has shifted heavily to **v2 quality-of-life work**: TUI file/mention indexing, session-load performance, and aggressive session-event bloat reduction (a single long session can already generate ~5.8 GB of `message.updated` events). A recurring theme across issues and PRs is "goal/plan-mode escape hatches" — the AI routinely bypasses plan mode via bash or sub-agents, prompting multiple governance proposals.

## Releases
### v1.18.30
- **Core**: Added the Astra system prompt for GPT-6 models.
- **Bugfixes**:
  - Bedrock DeepSeek model IDs (including ARN-based IDs) now resolve correctly. (@YeEmrick)
  - Azure provider SDK updated to pick up compatibility fixes.
  - OpenAI provider SDK updated to pick up the latest changes.

## Hot Issues

1. **[#8751](https://github.com/anomalyco/opencode/issues/8751) — Hot-reload agents, skills and commands** (23 comments, 👍 96)
   The most upvoted open feature request. Users want config invalidation/reload while OpenCode is running to iterate on agents, skills, and commands without restarts. Community reaction is overwhelmingly positive, signaling hot-reload is treated as a baseline DX expectation.

2. **[#32747](https://github.com/anomalyco/opencode/issues/32747) — `@` file mentions exclude files created after startup** (16 comments, 👍 14)
   A long-standing TUI bug: the `@` picker uses a stale search index until restart. High comment volume reflects how often this trips up daily workflows, and the reporter already pinpoints the likely code path.

3. **[#18654](https://github.com/anomalyco/opencode/issues/18654) — Cannot change or remove email in OpenCode Zen** (7 comments, 👍 16)
   Account-management friction when GitHub emails change creates duplicate identities. Highlights a gap in Zen's self-service profile flows.

4. **[#34040](https://github.com/anomalyco/opencode/issues/34040) — TUI autocomplete stops at reference aliases** (6 comments, 👍 2)
   When a configured `@home` alias points to an external directory, autocomplete doesn't recurse into it. Important for monorepo and multi-machine setups.

5. **[#42739](https://github.com/anomalyco/opencode/issues/42739) — Unhandled crash in `Provider.list` with Cloudflare env vars and no `CLOUDFLARE_API_TOKEN`** (5 comments)
   Provider initialization crashes the TUI at startup. Demonstrates the need for graceful validation rather than implicit assumptions about configured providers.

6. **[#39491](https://github.com/anomalyco/opencode/issues/39491) — Plan mode can write and edit files via bash** (5 comments)
   A real safety gap: the model "forgets" plan mode and uses `cat > file << EOF` to bypass write restrictions. High-severity given that plan mode is a trust boundary users rely on.

7. **[#47034](https://github.com/anomalyco/opencode/issues/47034) — Gemini 3.8 Flash 400 after a model turn** (5 comments)
   `Requests ending with a model turn are not supported` blocks streaming for a popular model. Error classifier needs a new `isRetryable` mapping.

8. **[#47013](https://github.com/anomalyco/opencode/issues/47013) — OpenCode fails to launch on bad internet** (CLOSED, 5 comments)
   Desktop version hangs during version checks. Reflects wider demand for offline-first / resilient update paths.

9. **[#48237](https://github.com/anomalyco/opencode/issues/48237) — Auto-accept toggle greyed out with no session open** (4 comments)
   `createPermissionScopeController` resolves its directory only from session lineage, leaving settings unusable on home/draft screens. A fix-design PR (#48244) is already open.

10. **[#48239](https://github.com/anomalyco/opencode/issues/48239) — Goal-mode round driver re-claims blindly after errors/cancel** (3 comments)
    `SessionPrompt.loop` misuses normal `ensureRunning` returns to decide re-claim, causing orphan rounds on quit/cancel. Part of a broader push toward an autonomous "goal mode" the maintainer (johnhenry030888) is actively designing.

## Key PR Progress

1. **[#48223](https://github.com/anomalyco/opencode/pull/48223) — `fix(app): reduce cold and warm session load work`** (CLOSED)
   Reuses up to 16 rendered timelines per workspace with inactive-view guards and scroll restoration; defers collaborator animations. Targets the slow-entry-into-large-session complaint.

2. **[#48245](https://github.com/anomalyco/opencode/pull/48245) — `fix(session): cap summary diffs; prune superseded message.updated events`** (OPEN)
   Caps `SessionSummary.summarize` diffs and prunes superseded events. Direct response to the 5.8 GB / 1063-event bloat bug from #42748 / #48241. A high-leverage fix for long sessions.

3. **[#48244](https://github.com/anomalyco/opencode/pull/48244) — `fix(app): auto-accept toggle fallback directory when no session`** (OPEN)
   Adds a `fallbackDirectory` (session lineage → route directory) and threads `directory()` from `DialogRoute`. Fixes #48237.

4. **[#48243](https://github.com/anomalyco/opencode/pull/48243) — `fix(app): hide outgoing browser when switching sessions`** (CLOSED)
   Captures browser registration in its cleanup effect so native views don't bleed across session switches, while keeping tabs alive for restoration.

5. **[#46670](https://github.com/anomalyco/opencode/pull/46670) — `feat(app): add session history sidebar`** (OPEN)
   Replaces floating session tabs in the v2 layout with a persistent project + session sidebar — addresses complaints that the sidebar was missing (#48206) in newer builds.

6. **[#48236](https://github.com/anomalyco/opencode/pull/48236) — `feat(app): add mission control`** (CLOSED)
   New app-level surface area for v2. Status details not in the summary, but it's a structural app addition.

7. **[#48235](https://github.com/anomalyco/opencode/pull/48235) — `fix(tui): guard location refresh against startup race`** (OPEN)
   The TUI Data provider fires 8 concurrent location refreshes on startup; the PR serializes them. Closes #40002.

8. **[#48225](https://github.com/anomalyco/opencode/pull/48225) — `fix(acp): restore session options and reasoning boundaries`** (OPEN)
   Restores ACP reasoning-budget semantics and preserves session options across the protocol layer. Fixes regressions behind #31961.

9. **[#41449](https://github.com/anomalyco/opencode/pull/41449) — `feat(tool): add interactive terminal tool with vscode auto-attach`** (CLOSED)
   A new `terminal` tool that drives a real PTY and auto-attaches sessions into VS Code. Expands agent tool surface meaningfully.

10. **[#41431](https://github.com/anomalyco/opencode/pull/41431) — `fix(desktop): bundle CLI in release apps`** (CLOSED)
    Packages the embedded V2 CLI as an external executable for dev, beta, and production. Resolves desktop startup failures caused by a missing bundled CLI.

## Feature Request Trends

Several recurring directions are emerging across issues and PRs:

- **Hot-reload of configs, agents, skills, and commands** (#8751) — the single most-requested capability, treated as baseline DX.
- **Goal / autonomous long-horizon mode** (#48240, #48239) — proposals for an event-sourced single-goal domain with CAS revisions, model-facing goal tools, and a same-session round driver. Plan mode's bash bypass (#39491) accelerates the case for stricter governance.
- **Session storage and event hygiene** (#48245, #48241, #42748) — the community is pushing hard on capping diff/event growth that produces gigabyte-scale session logs.
- **Desktop distribution polish** (#48099 MSI installer; #48202 frozen terminal pane; #47013 offline launch failures; #25701 PWA theming) — packaging, update resilience, and Mac/Windows-specific fixes dominate Desktop feedback.
- **Indexer / autocomplete correctness** (#32747, #34040) — TUI `@` picker must reflect runtime filesystem state, including external reference directories.
- **Notification UX** (#35282 bell on completion) — multiple users want audibly signaling completion, à la Grok Build.
- **Subagent permission scoping** (#41730) — auto-approve flags don't cascade to subagents, breaking common automation patterns.

## Developer Pain Points

- **Long-session bloat**: Single runs emitting GBs of `message.updated` events break storage and downstream JSONL consumers (#42238, #48241).
- **Provider fragility**: Crash loops from incomplete environment configuration (#42739), unrecoverable 400s on Gemini (#47034), and Azure image-count caps not routed to the media-strip compaction path (#39677).
- **TUI staleness**: `@` mentions and reference aliases don't track post-startup file changes (#32747, #34040).
- **Plan mode trust boundary**: Models trivially escape plan mode via bash heredocs (#39491).
- **Desktop reliability**: Terminal pane freezes (#48202), offline failures (#47013), and missing/incomplete sidebar (#48206) generate frequent user dissatisfaction posts.
- **Auto-approve permissions UX**: Toggle greyed out without an active session (#48237), and `opencode run --auto` doesn't propagate to subagents (#41730).
- **Session UX**: Mac desktop interrupts running turns instead of queueing follow-ups (#48203); TUI fires duplicate concurrent location refreshes at startup (#48235).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-10

## Today's Highlights

The community's focus remains on provider compatibility edge cases and multi-process reliability, with high-engagement threads on Anthropic session hangs, OpenRouter `:free` model 400s, and expired OAuth credentials causing 48s startup delays. On the docs/tooling side, the merged PRs lean into UX polish (cursor positioning, navigation validation) and a notable supply-chain flag on `pi-safe-compact` highlights the value of the new package-report workflow.

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. **#5291 — Sessions hang on "Working..." with Anthropic subscription** (CLOSED, 10 comments, 👍 3)
   Intermittent hangs where sessions get stuck mid-turn under Anthropic Enterprise; resume only partially recovers. Core reliability issue affecting a high-volume provider. [Link](https://github.com/earendil-works/pi/issues/5291)

2. **#8928 — Parallel pi startup reports "No API key found" for ~48s with expired OAuth** (OPEN, 6 comments)
   Deterministic repro + timing data showing multi-process setups amplify a known auth-lookup issue (#1871, #4919, #6880). The error is misattributed to the active provider, hampering diagnosis. [Link](https://github.com/earendil-works/pi/issues/8928)

3. **#5105 — Compaction summarization ignores configured transport** (CLOSED, 6 comments)
   Compaction rebuilds stream options without `sessionId`/`transport`, breaking `openai-codex-responses` users whose configured transport differs from `auto`. A subtle but high-impact regression for power users. [Link](https://github.com/earendil-works/pi/issues/5105)

4. **#8760 — OpenRouter `:free` models fail with 400 (max_tokens above provider limit)** (OPEN, 5 comments)
   Pi sends `maxOutputTokens` from the catalog, which exceeds the upstream provider's hard limit on multiple `:free` models. Affects any user selecting these interactively. [Link](https://github.com/earendil-works/pi/issues/8760)

5. **#9381 — Package Report: pi-safe-compact flagged for malicious/unsafe behavior** (CLOSED, 5 comments)
   Report against `pi-safe-compact@0.6.3` citing an unavailable maintainer (`primp9053`) — a real-world test of the new package-report flow. Worth watching as a precedent for supply-chain triage. [Link](https://github.com/earendil-works/pi/issues/9381)

6. **#9290 — Extension API `modelRegistry.complete()` missing `x-opencode-session` header** (CLOSED, 5 comments)
   opencode.ai began enforcing this header on 2026-09-06; every extension-driven request now fails until Pi forwards it. Important for extension authors on opencode-go models. [Link](https://github.com/earendil-works/pi/issues/9290)

7. **#9294 — `claude-fable-5` allowedFallbackModels lists a rejected model** (OPEN, 4 comments)
   Built-in fallback still references `claude-opus-4-8`, which the API now rejects with 400. Every request with `--model claude-fable-5` fails immediately — a built-in catalog bug. [Link](https://github.com/earendil-works/pi/issues/9294)

8. **#8810 — Extension-registered providers: fresh sessions ignore defaultProvider/defaultModel** (OPEN, 4 comments, 👍 1)
   Pi silently falls back to another provider's default when the configured default is registered via `pi.registerProvider`. Intermittent and hard to reproduce — a trust issue for extension-based workflows. [Link](https://github.com/earendil-works/pi/issues/8810)

9. **#9311 — Fullscreen mouse selection persists across session switches** (OPEN, 4 comments)
   TUI selection state leaks into new sessions after a switch, causing accidental overwrites. Simple to fix (clear selection on switch) but a papercut in daily use. [Link](https://github.com/earendil-works/pi/issues/9311)

10. **#9394 — Remove `gpt-5.4` from openai-codex catalog** (CLOSED, 3 comments)
    Both `gpt-5.4` and `gpt-5.4-mini` no longer work on Codex (ChatGPT) accounts. Catalog drift needs cleanup. [Link](https://github.com/earendil-works/pi/issues/9394)

## Key PR Progress

1. **#9380 — docs: validate documentation navigation and reachability** (MERGED)
    Makes `packages/coding-agent/docs/docs.json` the canonical nav manifest, validating structure, slugs, local links, and reachability in the test suite — plus discovers doc eval cases. [Link](https://github.com/earendil-works/pi/pull/9380)

2. **#9382 — Always place cursor at the end while navigating through history** (MERGED)
    Aligns history-navigation behavior with bash: cursor stays at end on Up-arrow recall. Removes Pi's inconsistent logic. [Link](https://github.com/earendil-works/pi/pull/9382)

3. **#9376 — fix(ai): use `reasoning_effort` for Mistral-hosted GLM (zai-glm-5-2)** (MERGED)
    Mistral advertises `reasoning: true` but only honors `reasoning_effort` for GLM-5.2. Fixes reasoning for Mistral-hosted GLM via `prompt_mode: "reasoning"`. [Link](https://github.com/earendil-works/pi/pull/9376)

4. **#9374 — fix(coding-agent): reject reload during active session operations** (MERGED)
    Adds `isStreaming`/`isCompacting` guards in the reload path so RPC extensions can't invalidate the runner mid-tool-call — closes a state-corruption hole. [Link](https://github.com/earendil-works/pi/pull/9374)

5. **#9370 — docs: extract interactive testing and release guidance into skills** (MERGED)
    Pulls interactive testing and release workflows out of long-form docs into reusable skills, lowering the contributor on-ramp. [Link](https://github.com/earendil-works/pi/pull/9370)

6. **#9368 — (accidental PR)** (CLOSED)
    Closed by author; no changes. Worth noting as a reminder to enable branch-protection / draft-by-default. [Link](https://github.com/earendil-works/pi/pull/9368)

## Hot Discussions

**Show and tell**
- **#8803 — pi-verdict: a minimal permission gate for pi** by jesset
  Single-file, zero-dep "allow / ask / deny" hook for every tool call — explicitly positioned as the confirmation flow the README says you must build yourself. [Link](https://github.com/earendil-works/pi/discussions/8803)
- **#9373 — pi-agent-views: concurrent sub-agents, rendered by pi** by AllanZyne
  Run several agents in parallel (each with its own model) and switch between them without losing context, mirroring Claude Code's agent view. [Link](https://github.com/earendil-works/pi/discussions/9373)

## Feature Request Trends

- **Provider/model catalog hygiene**: A persistent drumbeat — `gpt-5.4` removal (#9394), Claude fallback cleanup (#9294), OpenRouter `:free` token limits (#8760), Mistral reasoning format (#9376). Demand for automated catalog validation is implicit.
- **TUI/UX polish**: Cursor positioning in history (#9382), fullscreen selection persistence (#9311), configurable scroll speed (#9315), collapsible code blocks (#9397), extension-widget ordering (#9401) — incremental but consistent.
- **Extension API maturation**: Persistent asks for stable `registerProvider` semantics (#8810), `modelRegistry.complete()` header forwarding (#9290), explicit `persist` flags on RPC model/thinking commands (#9393), and SDK-only exports without CLI side-effects (#9286).
- **Docs as code**: PR #9380 and #9370 show a clear push toward validated docs and skill-based workflows over prose.

## Developer Pain Points

- **Cross-provider reliability noise**: Sessions hanging, wrong-attribution auth errors, and catalog drift force users to debug Pi rather than their work (#5291, #8928, #8760, #9294).
- **Multi-process / startup races**: The expired-OAuth-credential slow path is a known recurring issue with overlapping duplicates (#1871, #4919, #6880 → #8928).
- **Extension ↔ core contract gaps**: New requirements (opencode session headers, default-provider resolution, SDK import shape) keep catching extension authors after release (#9290, #8810, #9286).
- **Context / state corruption**: Reload-during-stream (#9374) and aborted tool calls leaving unmatched `toolCall` blocks (#9306) both produce subtle, hard-to-recover session breakage.
- **Node.js version sensitivity**: `node:fs` named-import breakage on Node 20 surfaces as a hard CLI failure (#9400, #9402) — regressions in modern-Node ESM imports remain a friction point.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-10

## Today's Highlights

Today ships **v0.23.2** with web-shell split-view navigation improvements and a checkpoint retry fix that avoids claim-budget stalls, alongside the SDK TypeScript v0.1.11 bundle and cua-driver-rs v0.20.5 prebuilt binaries. A cluster of **P1 Windows/ConPTY process-leak issues** (#11303, #11352) is dominating the queue, and a fresh **P1 regression that drops all conversation history when the VS Code Companion extension upgrades from v0.21.x → v0.23.x** (#11489) is drawing attention. The TUI also surfaced an **uncaught React #185 crash** when multiple background subagents complete in close succession (#11500).

## Releases

- **v0.23.2** — web-shell split-view session navigation improvements (#11250) plus a goal-runtime fix that retries a checkpoint that overran the claim budget instead of spending a stall (#11365). [Release notes](https://github.com/QwenLM/qwen-code/pull/11250)
- **v0.23.2-nightly.20260909.2e212144d3** — rolling nightly tracking the above.
- **sdk-typescript-v0.1.11** — bundles CLI 0.23.2 (built from the same ref as the SDK).
- **cua-driver-rs-v0.20.5** — codesigned/notarized macOS universal binary + `QwenCuaDriver.app`, Linux glibc 2.31+ unsigned (x86_64/arm64), Windows UIAccess worker + native SDK payload.

## Hot Issues

1. **[P1] #11303** — Windows `qwen-cli` (VS Code Companion) leaks headless `conhost.exe` ConPTY processes: 347 children / ~2.8 GB after ~12h uptime. Triage-ready, root cause split into the node-pty half (#11352). (12 comments) [Link](https://github.com/QwenLM/qwen-code/issues/11303)
2. **[P1] #11119** — `qwen serve`: background shell output and wake notifications are silently dropped when the session runtime recycles, wedging the web-shell session. (10 comments) [Link](https://github.com/QwenLM/qwen-code/issues/11119)
3. **[P1] #11489** — VS Code Companion extension update v0.21.x → v0.23.x drops all recorded conversation history from the sidebar; entries still exist in `state.vscdb` but the new client cannot read them. (4 comments) [Link](https://github.com/QwenLM/qwen-code/issues/11489)
4. **[P1] #11500** — Interactive TUI exits silently (uncaught minified React error #185, "Maximum update depth exceeded") when several background subagents complete in close succession; resumed CLI reports "Previous session appears corrupted". (3 comments) [Link](https://github.com/QwenLM/qwen-code/issues/11500)
5. **[P1] #11352** — `@lydell/node-pty` 1.2.0-beta.10 leaks the ConPTY host (`conhost.exe`) on natural shell exit because the baton is erased before `onExit`, so `ClosePseudoConsole` is unreachable from JS. (4 comments) [Link](https://github.com/QwenLM/qwen-code/issues/11352)
6. **[P1] #11403** — ECS runner fleet update to 0.23.1 failed; pools `ecs-update-hk-2`, `ecs-update-...` still pinned to an older CLI than the release asked for. (4 comments) [Link](https://github.com/QwenLM/qwen-code/issues/11403)
7. **[P2] #11186** — `serve`: the channel ownership model does not cover a home-directory-bound workspace reading user-scope settings; setting-loader attributes the shared settings file to user scope even though the daemon should mediate. (4 comments) [Link](https://github.com/QwenLM/qwen-code/issues/11186)
8. **[P2] #11503** — Daemon guard denies read-only `git status`/`log`/`diff` against the session's own workspace when `.git` is an NTFS junction/symlink to another volume — a Windows-only containment false positive. (3 comments) [Link](https://github.com/QwenLM/qwen-code/issues/11503)
9. **[P2] #11328** — Follow-up to provider-configured reasoning: PR #10999 deliberately limited its surface; remaining edge cases need to be tracked for deepseek-v4-pro and beyond. (4 comments) [Link](https://github.com/QwenLM/qwen-code/issues/11328)
10. **[P3] #11475** — Feature request: supported remote-folder workflow for `qwen serve` — local interactive client, remote daemon/workspace/agent. (3 comments) [Link](https://github.com/QwenLM/qwen-code/issues/11475)

## Key PR Progress

1. **#11488** `feat(acp): register daemon-managed sessions in the session registry and let them send peer messages` — `qwen serve`-driven sessions now appear in `qwen sessions ps` and another session's `list_agents`, can be addressed by name, and can reach a terminal via `send_message`. [PR](https://github.com/QwenLM/qwen-code/pull/11488)
2. **#11241** `feat(browser-use): add Playwright-based Browser SDK` — typed, model-facing Browser SDK running in the persistent Node REPL; combines Codex-style semantic Playwright locators, DOM snapshot refs, and visual coordinates as three identification modes. [PR](https://github.com/QwenLM/qwen-code/pull/11241)
3. **#11003** `feat: delegate a subagent turn to an external agent over ACP (Claude Code first)` — subagent definitions can declare an `executor` block; the turn is driven over ACP in the external process and re-published as the subagent's stream. [PR](https://github.com/QwenLM/qwen-code/pull/11003)
4. **#11276** `feat(web-shell): add web previews with saved delivery history` — Web preview panel with desktop/mobile widths, refresh, and external-open; standalone Web Shell enables it for workspace sessions by default. [PR](https://github.com/QwenLM/qwen-code/pull/11276)
5. **#11490** `refactor(core): split the web_search DashScope client into a backend and surface page titles` — search results carry page titles, and the DashScope client sits behind a backend interface so the search-side model can open with a `Sources:` block. [PR](https://github.com/QwenLM/qwen-code/pull/11490)
6. **#11396** `feat(web-shell): route scheduled runs by model and group` — Web Shell scheduled tasks can now pick a configured model and an existing/new session group when "New session each run" is selected; routing is persisted with the durable task. [PR](https://github.com/QwenLM/qwen-code/pull/11396)
7. **#11455** `fix(acp): Preserve submitted prompt provenance for auto recall` — passes the original non-blank submission text to `UserPromptSubmit` hooks for fresh ACP user turns, enabling a Mem0 Auto Recall hook in daemon sessions. [PR](https://github.com/QwenLM/qwen-code/pull/11455)
8. **#9466** `refactor: anchor rewind mapping to stable prompt identity` — rewind now resolves a target prompt through persisted prompt identity instead of positional turn order, surviving surfaces that renumber/reorder (resume, headless `-p --resume`, etc.). [PR](https://github.com/QwenLM/qwen-code/pull/9466)
9. **#10906** `feat(web-shell): show shell and monitor task output` — captured Shell/Monitor output is now persisted and exposed via a live-session-owner-scoped endpoint that returns a sanitized tail. [PR](https://github.com/QwenLM/qwen-code/pull/10906)
10. **#10347** `feat(core): auto-retry transient network errors (EOF) where Ctrl+Y is unavailable` — classifies 4xx wrappers around low-level network failures (e.g., `400 network error ... EOF`) as retryable transport errors so bounded auto-retry applies in headless runs. [PR](https://github.com/QwenLM/qwen-code/pull/10347)

## Feature Request Trends

- **Remote-development mode for `qwen serve`** (#11475) — local interactive client, remote daemon/workspace, building on existing remote web-shell and multi-workspace APIs.
- **Embedded SQLite for session/prompt indexing at scale** (#11433, #11493) — long conversations, many sessions, exact prompt queries, transcript replay, reconnect/attach; the index-cache admission cliff (64 MiB hard cap, no LRU eviction) is the gating complaint.
- **Browser-use SDK** (#11241 — landed) — a typed Playwright-backed Browser SDK exposed to the model inside the persistent Node REPL.
- **Reuse WebShell transcript UI in the VS Code Companion** (#9187) — share the web-shell conversation stream while keeping ACP transport and VS Code-specific affordances.
- **Durable cross-session memory** (#11502) — third-party memory layer proposal to preserve repo conventions, preferences, and decisions across sessions and model upgrades.
- **Session Workflow DAG navigation + chrome cleanup** (#10938) — make dependency edges navigable and quiet the inspector chrome.
- **Web previews with saved delivery history** (#11276 — landed) — browser-reachable URLs viewable inside the web shell.

## Developer Pain Points

- **Windows ConPTY / `conhost.exe` process leaks** — the most-cited P1 cluster today (#11303, #11352); root cause partly outside JS reach at the pinned `@lydell/node-pty` version, leaving only a containment fix path.
- **Conversation history lost on extension upgrade** (#11489) — `state.vscdb` still contains the rows but v0.23.x cannot read them; classic data-migration regression.
- **TUI crashes on concurrent background-agent completions** (#11500) — Ink `useBoxMetrics` listener `setState` loop triggers React #185 with no surfaced error.
- **Daemon channel-ownership model misses workspace/user settings interactions** (#11186) — especially when `qwen serve` is bound to `$HOME` and the workspace scope is disabled.
- **Daemon guard false-positives on junctioned/symlinked `.git` metadata** (#11503) — Windows-only containment bug blocking the session's own read-only git.
- **Provider-configured reasoning edge cases** (#11328)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*