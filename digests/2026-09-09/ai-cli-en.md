# AI CLI Tools Community Digest 2026-09-09

> Generated: 2026-09-09 11:30 UTC | Tools covered: 7

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

# AI CLI Tools Cross-Comparison Report — 2026-09-09

## 1. Ecosystem Overview

The AI CLI space has consolidated into seven actively-maintained tools spanning three tiers: vendor-flagship CLIs (Claude Code, Codex, Gemini CLI, Copilot CLI) racing to ship platform features (desktop apps, device fleets, SDKs), and independent/aggregator tools (OpenCode, Pi, Qwen Code) competing on provider neutrality, hackability, and self-hosted deployment. The center of gravity has visibly shifted from single-turn coding assistance toward **long-lived, unattended, multi-agent sessions** — and with it, the dominant engineering problems have shifted from prompt quality to session durability, cancellation semantics, and multi-agent coordination. Release cadence is aggressive across the board (13 releases tagged across seven repos in 24 hours), but every community is simultaneously paying down regression debt, particularly on Windows.

## 2. Activity Comparison

*Counts reflect items surfaced in today's digests (hot issues tracked, PRs highlighted, active discussion threads), not total repo volume. "N/A" = channel exists but no data provided in this window.*

| Tool | Hot Issues | PRs Highlighted | Discussion Threads | Release Status (24h) |
|---|---|---|---|---|
| **Claude Code** | 10 (9 open, 1 stale-closed) | 1 (closed, unmerged) | N/A — no data | v2.1.266 hotfix + v2.1.265 |
| **OpenAI Codex** | 10 (+3 mentions) | 10 (+2) | 10 | 4 alphas (rust-v0.154.0 line) |
| **Gemini CLI** | 10 | 10 (high merge rate) | N/A — no data | 3 (v0.59.0 stable, v0.60.0-preview, v0.61.0-nightly) |
| **Copilot CLI** | 10 | 2 | N/A — not reported | 2 patches (v1.0.84-2/-3) |
| **OpenCode** | 10 | 11 | N/A — not reported | v1.18.30 |
| **Pi** | 10 (7 closed in-window) | 10 (8 closed) | 2 | None in 24h |
| **Qwen Code** | 10 (+mentions) | 10 (+5 mentions) | N/A — no data | v0.23.2 (+SDK 0.1.10) |

**Reading:** Codex shows the widest simultaneous surface (issues + PRs + discussions + fastest tag cadence). Gemini CLI and Pi show the healthiest close rates. Claude Code's single-PR day signals triage/cleanup rather than stalled development — its digest explicitly notes the activity is "issue-side."

## 3. Shared Feature Directions

1. **Multi-agent orchestration** — *Claude Code, Codex, Qwen Code, Pi.* Claude Code users demand per-agent/fleet model config instead of global `settings.json` mutation (#66402, 👍14); Qwen Code's mesh PR (#11206) proposes persistent shared-thread agent identities with mid-run interjection; Codex's SDK adds `ExternalMessage` for agent-to-agent tool authority (#44086) and the community built `postbag` for Codex↔Claude messaging (#44109); Pi rendered concurrent per-model sub-agents (#9373). Coordination primitives are converging industry-wide.
2. **Long-session durability & recovery** — *all seven.* Codex pagination freezes lose turns on both macOS and Windows (#41566, #43124); Copilot OOMs on resume (#4664) and logs 13GB from a runaway FileWatch loop (#4612); Gemini's open PR #29265 targets context poisoning on interrupted turns; OpenCode sessions brick on 50-image limits (#47487); Pi fixed Esc-cancel and compaction races; Qwen drops background shell output on runtime recycle (#11119); Claude Cowork force-logouts every 24–36h (#81512). This is the ecosystem's #1 reliability battleground.
3. **Provider neutrality / BYOK** — *six of seven.* OpenCode's model auto-discovery is the single most-upvoted issue across all digests (#6231, 👍231); Codex users hit OpenAI-specific assumptions (Azure's required `tools[].description` #38573, hardcoded `codex-auto-review`); Copilot users want OpenRouter (#2943); Claude shipped gateway hotfixes; Pi merged provider-reported cost reporting (#6881, #9345); Qwen fixed local llama-server grammar regressions (#10530/#10435).
4. **MCP & tool-protocol maturation** — *five tools.* Codex is reusing dormant MCP bindings (#44121); Gemini enforced RFC 9207 OAuth issuer checks and exposed a >128-tool hard limit (#24246); Copilot fixed MCP OAuth startup reliability; Claude added multi-plugin folder loading but blocks self-hosted git marketplaces (#90141).
5. **Windows/cross-platform parity** — *six of seven.* Claude Cowork broke under September KB updates (#92958); Windows issues dominate Codex's top-10 (Remote Control, WSL bridging, Pets); Gemini mitigated NTFS 8.3 paths; OpenCode violates XDG spec (#27786).
6. **Permission & safety UX** — *five tools.* Claude's Auto Mode still prompts for `grep` (#91784) and its background dialog lacks an Accept button (#92974); Codex raised Guardian review limits but false-positive "cybersecurity" flags block legitimate security work (#34306); Copilot's Assisted-mode permissions expire after ~1h (#4764).

## 4. Differentiation Analysis

- **Claude Code** — Most enterprise-automation-oriented: device fleets (Cowork), routines, gateway telemetry, plugin marketplaces. Today exposed its structural weakness: global-config singletons and OS-patch fragility make unattended use risky.
- **Codex** — Broadest product surface (desktop apps, Computer Use, Remote Control, voice, even Pets) and fastest cadence, but breadth-over-polish: Windows is end-to-end fragile and the safety classifier has no recovery path. The Python SDK publishing pipeline signals platform ambitions.
- **Gemini CLI** — Most disciplined triage taxonomy (P1/P2/EPIC) and a unique correctness ethic: "subagent reports GOAL success after MAX_TURNS" (#22323) is framed as an honesty bug, not a hang. Differentiating R&D in AST-aware, token-frugal file access (#22745).
- **Copilot CLI** — GitHub-native integration (Mission Control, tasks, PR workflows) and finally paying down QoL debt (vim mode, 76👍 #13 closed after ~1 year). Weakest link: long-session memory stability and a native `tgrep` that OOM-kills hosts (#3976).
- **OpenCode** — The provider aggregator: DeepSeek, GLM, Bedrock, Azure, Zen, local models each get bespoke fixes. V2 API churn is actively breaking downstream consumers (CodeNomad, #48090) — a transition-risk cautionary tale.
- **Pi** — Minimal-core, extension-first philosophy (permission gating deliberately left to extensions, e.g., pi-verdict). Differentiates on adapter breadth, rigorous lifecycle semantics, and quantified perf budgets vs. competitors (#7739). Small but unusually high fix-close rate.
- **Qwen Code** — "Daemon-as-platform": `qwen serve`, Web Shell, custom frontend hosting (#11358), REST/SSE docs for integrators, and the most architecturally ambitious multi-agent PR (mesh). Local/open-model focus plus evident AI-assisted development process (autofix/takeover PR labels).

**Target users:** Claude → enterprise fleet automation; Codex → ChatGPT-subscriber desktop-first users; Gemini → Google-ecosystem, token-conscious power users; Copilot → GitHub-embedded enterprise devs; OpenCode → BYOK multi-provider users; Qwen → self-hosted/local-model operators; Pi → extension builders and minimalists.

## 5. Community Momentum & Maturity

- **Highest engagement:** Codex (66-comment Windows issue #28919; the 126👍 `/rewind` thread remains the repo's top-voted item) and OpenCode (231👍 on #6231 — the largest single-issue signal in the dataset).
- **Fastest iteration:** Codex (4 alphas/24h), Gemini CLI (3 release channels in one day), Copilot (2 patches), Claude Code (same-day hotfix on a gateway regression).
- **Best close discipline:** Pi (7/10 issues and 8/10 PRs closed in-window) and Gemini CLI (long-running P1s merged: Plan Mode hang, Seatbelt crash, a2a credential cleanup).
- **Maturity markers:** Claude and Codex are feature-mature but now manage scale-driven regressions; Gemini shows the most mature engineering process; Copilot is in debt-paydown mode; OpenCode is mid-V2-transition; Qwen is in aggressive platform buildout (with process smells — #11205 lost six hardenings in a merge).
- **Trust risks:** Claude's 14-day stale-bot closes live issues (the proposed 90-day fix, PR #63686, was closed unmerged); Gemini users routinely *disable subagents* to stay productive — a serious adoption-trust signal.

## 6. Trend Signals

1. **CLI agents are becoming headless platforms.** SDKs (Codex Python, Qwen TS), serve/daemon modes, REST/SSE surfaces, and custom frontend hosting are converging across tools. Choose tools with stable API contracts; watch OpenCode's V2 breakage for what API churn costs downstream.
2. **Session durability is the new evaluation criterion.** With sessions running hours-to-days, resume/compaction/OOM behavior matters more than demo quality. Vet tools on interrupt semantics and crash recovery (Pi and Gemini are explicitly engineering this).
3. **Provider portability is table stakes.** Gateway/proxy support, model auto-discovery, and per-provider cost observability (Pi's provider-reported cost) are where users are voting with upvotes.
4. **Multi-agent coordination is standardizing** — shared threads, inter-agent messaging, and external-message SDK types appeared independently in four repos this week.
5. **Safety UX needs recovery paths.** False-positive classifiers with no session recovery (Codex #34306) and permission models that silently expire (Copilot #4764) will increasingly block security-conscious professional adoption.
6. **Windows remains systemic ecosystem debt** — six of seven tools shipped Windows-specific fixes or regressions today.
7. **Token-efficiency engineering is a differentiator** — AST-aware reads (Gemini), dormant MCP binding reuse (Codex), and tool subsetting address the same cost pressure.
8. **The tools are building themselves** — Qwen's autofix/takeover automation and Codex's alpha sprint suggest AI-assisted tool development is becoming the meta-trend to watch.

---
*Sources: community digests for anthropics/claude-code, openai/codex, google-gemini/gemini-cli, github/copilot-cli, anomalyco/opencode, earendil-works/pi, QwenLM/qwen-code, 2026-09-09. Counts are digest-surfaced; upstream totals may differ.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report

**Reporting Period:** Data as of 2026-09-09
**Source:** [github.com/anthropics/skills](https://github.com/anthropics/skills) (official Claude Code Skills repo)

> *Note: PR comment counts are not exposed in the dataset, so PRs below are ranked by the feed order provided. Issue ranking uses verified comment counts.*

---

## 1. Top Skills Ranking

The most-discussed Skills and meta-improvements cluster into document-quality tooling, skill-creation reliability, and multi-agent orchestration.

**1. `skill-creator` Eval Pipeline Overhaul — PR [#1298](https://github.com/anthropics/skills/pull/1298)** *(OPEN)*
Author: MartinCajiao
Fixes a critical bug where `run_eval.py` reports `recall=0%` for every skill description (10+ independent reproductions, see Issue [#556](https://github.com/anthropics/skills/issues/556)). Because `run_loop.py` and `improve_description.py` consume this signal, the description-optimization loop has been optimizing against noise. Also addresses Windows stream-reading, trigger detection, and parallel-worker issues. **Status: open, foundational fix.**

**2. Document Typography Skill — PR [#514](https://github.com/anthropics/skills/pull/514)** *(OPEN)*
Author: PGTBoos
Proposes a typographic-quality skill that catches orphan word wrap, widow paragraphs, and numbering misalignment in Claude's generated documents. Argues these issues affect every document Claude produces and are rarely caught by users. **Status: open, high-impact UX improvement.**

**3. SCNet HPC Skill — PR [#1615](https://github.com/anthropics/skills/pull/1615)** *(OPEN)*
Author: lql341
Adds a profile-based SSH + Slurm workflow skill for SCNet HPC clusters, covering connection setup, partition/module/accelerator guidance, job generation, and cluster discovery. **Status: open, vertical/enterprise skill.**

**4. ODT (OpenDocument) Skill — PR [#486](https://github.com/anthropics/skills/pull/486)** *(OPEN)*
Author: GitHubNewbie0
Bridges the LibreOffice / ISO OpenDocument ecosystem by adding create/fill/parse support for `.odt` and `.ods` files. Expands the document-format coverage beyond the existing PDF/DOCX skills. **Status: open.**

**5. Frontend-Design Skill Clarification — PR [#210](https://github.com/anthropics/skills/pull/210)** *(OPEN)*
Author: justinwetch
Rewrites the existing `frontend-design` skill so every instruction is concretely executable within one conversation — reducing ambiguity and steering Claude's behavior more reliably. **Status: open.**

**6. Meta-Skills: Quality & Security Analyzers — PR [#83](https://github.com/anthropics/skills/pull/83)** *(OPEN)*
Author: eovidiu
Adds two marketplace meta-skills: a five-dimension quality analyzer (Structure, Documentation, Behavior, Performance, Security) and a security analyzer for inspecting Claude Skills. **Status: open, one of the oldest in the queue.**

**7. Hivemind — Zero-Cost Multi-Agent Orchestration — PR [#1628](https://github.com/anthropics/skills/pull/1628)** *(OPEN)*
Author: Hanishchow
Delegates mechanical work to headless `opencode` workers running on free models while Claude Code retains the planner/reviewer/merger role. Positions context, not intelligence, as the scarce resource. **Status: open.**

**8. `testing-patterns` Skill — PR [#723](https://github.com/anthropics/skills/pull/723)** *(OPEN)*
Author: 4444J99
Full-stack testing playbook: Testing Trophy philosophy, unit/React/component patterns, AAA, naming conventions, edge cases. Fills a clear gap in the Skills collection. **Status: open.**

---

## 2. Community Demand Trends

From Issues, the loudest community signals are:

**Trust Boundary & Namespace Abuse (43 comments) — Issue [#492](https://github.com/anthropics/skills/issues/492)**
The single hottest thread in the repo. Community skills distributed under the `anthropic/` namespace enable impersonation of official skills and privilege escalation. Calls for stricter trust signaling (signatures, badges, namespace separation).

**Enterprise Skill Sharing (16 comments) — Issue [#228](https://github.com/anthropics/skills/issues/228)**
Strong demand for org-wide skill distribution inside Claude.ai. Current workflow (download `.skill` → Slack → manual upload via Settings > Capabilities) does not scale for teams. A shared skill library or share-link is desired.

**Skill-Creator Reliability (12 comments) — Issue [#556](https://github.com/anthropics/skills/issues/556)**
`run_eval.py` cannot reliably determine whether a skill would be triggered; this breaks the entire description-optimization loop. Multiple fixes attempted across PRs [#1050](https://github.com/anthropics/skills/pull/1050), [#1099](https://github.com/anthropics/skills/pull/1099), [#1298](https://github.com/anthropics/skills/pull/1298), and related.

**Skill Loss & UX (10 comments) — Issue [#62](https://github.com/anthropics/skills/issues/62)**
Users report uploaded Skills silently disappearing after local filesystem changes, surfacing a gap in skill lifecycle/persistence UX.

**Plugin Conflicts (6 comments, 9 👍) — Issue [#189](https://github.com/anthropics/skills/issues/189)**
Installing both `document-skills` and `example-skills` plugins produces duplicate skills, cluttering the context window. README semantics need correction.

**Memory & Governance Skills (9 + 6 comments) — Issues [#1329](https://github.com/anthropics/skills/issues/1329), [#412](https://github.com/anthropics/skills/issues/412)**
Requests for `compact-memory` (symbolic notation for compact agent state) and `agent-governance` (policy enforcement, threat detection, trust scoring, audit trails). Both signal a maturing appetite for **meta-cognitive** and **safety-oriented** Skills.

**Tooling at Scale (4 comments) — Issue [#1487](https://github.com/anthropics/skills/issues/1487)**
The bundled `claude-api` skill eagerly injects ~156k tokens, exhausting context in one tool call. Demonstrates that Skills themselves need **lazy-loading and budgeting**.

**Cross-Platform & MCP Integration (4 comments each) — Issues [#29](https://github.com/anthropics/skills/issues/29), [#16](https://github.com/anthropics/skills/issues/16), [#1390](https://github.com/anthropics/skills/issues/1390)**
Bedrock support, Skills-as-MCPs, and `mcp-builder` evaluation bugs reflect demand for Skills to be portable, composable, and verifiable across runtimes.

**Quality Gates (4 comments) — Issue [#1385](https://github.com/anthropics/skills/issues/1385)**
Proposal for a three-gate pipeline (Pre-task Calibration → Adversarial Review → Delivery Verification) — echoes PR [#1367](https://github.com/anthropics/skills/pull/1367)'s `self-audit` skill.

---

## 3. High-Potential Pending Skills

PRs with sustained attention that are still open and likely to land once review unblocks:

| PR | Skill / Fix | Author | Why it matters |
|---|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | `run_eval.py` recall + Windows fixes | MartinCajiao | Unblocks the entire description-optimization loop |
| [#514](https://github.com/anthropics/skills/pull/514) | `document-typography` | PGTBoos | Improves every generated document by default |
| [#486](https://github.com/anthropics/skills/pull/486) | `odt` (OpenDocument) | GitHubNewbie0 | Extends document-format parity |
| [#83](https://github.com/anthropics/skills/pull/83) | `skill-quality-analyzer` + `skill-security-analyzer` | eovidiu | Directly addresses Issue [#492](https://github.com/anthropics/skills/issues/492)'s trust concerns |
| [#1628](https://github.com/anthropics/skills/pull/1628) | `hivemind` | Hanishchow | Lowers the cost ceiling for multi-agent workflows |
| [#1627](https://github.com/anthropics/skills/pull/1627) | `buffer-api` | JPeetz | First social-media scheduling Agent Skill; portable across Claude/Cursor/Codex |
| [#1367](https://github.com/anthropics/skills/pull/1367) | `self-audit` | YuhaoLin2005 | Output verification + 4-dim reasoning gate; pairs with Issue [#1385](https://github.com/anthropics/skills/issues/1385) |
| [#723](https://github.com/anthropics/skills/pull/723) | `testing-patterns` | 4444J99 | Fills the testing-strategy gap |
| [#1615](https://github.com/anthropics/skills/pull/1615) | `scnet-hpc` | lql341 | Vertical skill for HPC users |
| [#210](https://github.com/anthropics/skills/pull/210) | `frontend-design` rewrite | justinwetch | Tightens one of the most-used creative Skills |
| [#1362](https://github.com/anthropics/skills/issues/1362) | `web-artifacts-builder` pnpm/favicons/fonts fix | astradevkin | Critical build blocker for artifact workflows |

---

## 4. Skills Ecosystem Insight

> **The community's most concentrated demand is for trustworthy, lightweight, document- and reasoning-quality Skills — i.e., Skills that fix Claude's own output (typography, document formats, evaluation reliability, self-audit) and that establish a verified trust boundary between official and community contributions.**

Three structural pressures are converging: (a) `skill-creator` cannot reliably measure itself on Windows, so the Skill ecosystem's self-improvement loop is currently broken; (b) document generation is the highest-frequency use case, yet lacks typography/fidelity coverage and ships Skills (e.g. `claude-api`) that can exhaust context in a single tool call; and (c) the absence of namespace-level trust signals is already being exploited, making meta-Skills like the proposed quality/security analyzers and `self-audit` the most strategically important pending additions.

---

# Claude Code Community Digest — 2026-09-09

## Today's Highlights

- **Hotfix v2.1.266 ships a critical regression fix** for users routing Claude Code through LLM gateways and proxies — the undocumented `CLAUDE_CODE_USE_GATEWAY` env var was forcing Cloud-gateway sign-ins on its own in 2.1.265.
- **Cowork on Windows is taking a beating from the September 2026 cumulative updates**, with multiple open reports of broken Plan9 share attach and shell folder-mount after reboots or bridge interruptions (issues #92958, #93047).
- **Fleet / per-agent configuration is emerging as a top community pain point** — `/model` and `/effort` still mutate the global `settings.json`, leaving no supported path for independently configured agents (#66402, 👍14).

---

## Releases

**v2.1.266** — *Latest*
- Fix: Reverts a 2.1.265 regression where `CLAUDE_CODE_USE_GATEWAY` began forcing Cloud-gateway sign-in without requiring `ANTHROPIC_BASE_URL` + `ANTHROPIC_AUTH_TOKEN` to also be set. Gateway / proxy users should upgrade immediately.

**v2.1.265**
- Telemetry: Desktop and Cowork sessions now include `user.email` and `user.groups` when routed through a Claude apps gateway, matching the parity already present in terminal sessions.
- Plugins: `--plugin-dir` now accepts a folder of plugins — each child folder with a manifest is loaded, and additions/removals inside the directory are picked up live.

---

## Hot Issues

1. **[#92958] Cowork Windows — September 2026 cumulative update breaks Plan9 share attach** (19 comments, 👍1) — Open, has repro. Both ARM64 (KB5124012) and x64 (KB5124008) cumulative updates cause `device_bash` to die on Windows Cowork; confirmed via A/B rollback across five machines. High signal because it's a shipping-OS regression.
2. **[#66402] `/model` and `/effort` mutate global `settings.json`** (11 comments, 👍14) — Open. There's no supported way to run a fleet of agents with independent model/effort configs; one global file per host. Highest upvote ratio in today's batch.
3. **[#91784] Auto mode still prompts for `grep` tool authorization** (5 comments, 👍13) — Open, macOS. Regression from a prior build; a `grep` after `cd` halts the agent despite Auto Mode being on. Strong community reaction for a small but workflow-breaking regression.
4. **[#65781] Escape closes `/btw` modal and rejects pending file edits** (7 comments, 👍9) — Closed. UX bug in the TUI where `Esc` to dismiss the modal silently kills an unrelated pending edit. Recurring theme with #74959.
5. **[#81512] Cowork device session force-logged-out every ~24–36h** (4 comments, 👍0) — Closed. `elevated_auth` / `session_stale_relogin` is killing unattended automations. Closed (likely stale), but representative of reliability concerns in Cowork.
6. **[#90141] Self-hosted marketplace: desktop rejects non-allowlisted git hosts** (2 comments, 👍0) — Open. Enterprises running their own skills marketplaces hit hard blocks in the desktop app even with authenticated marketplaces configured. High importance for self-hosted environments.
7. **[#92974] background-mode permission dialog shows only a Deny button** (2 comments, 👍0) — Open, macOS. Reported today — background-mode permission flow is missing the Accept path, effectively a soft-block on tools while backgrounded.
8. **[#93047] Cowork Windows: cloud shell folder-mount never re-attaches after bridge interruption** (1 comment, 👍0) — Open, just filed. Companion to #92958 — Plan9/virtiofs mounts stay dead after reboot even when sibling ops recover.
9. **[#76841] Routines: no way to list/reopen a routine's session in mobile** (3 comments, 👍1) — Open. Once a routine's push notification expires, the session becomes unreachable from the mobile app — a real gap for routine-driven workflows.
10. **[#83455] Configurable naming convention for auto-generated session names** (1 comment, 👍1) — Open, enhancement. With concurrent sessions, default `<dir>-<2char>` and AI-summarized titles aren't distinguishable at a glance; `/rename` and `-n` are manual.

---

## Key PR Progress

1. **[#63686] Bump stale and autoclose timeouts from 14 → 90 days** — Closed (not merged). Adjusts both knobs in `scripts/issue-lifecycle.ts` / `scripts/sweep.ts`. Notable because it explains why so many of today's "stale"-tagged issues (e.g., #65781, #77377, #77022, #81512, #84377, #84538) closed recently even though they still receive replies.

> Only one PR moved in the last 24h. The activity today is overwhelmingly issue-side — a sign of triage / cleanup rather than active feature work.

---

## Hot Discussions

*No discussion data was provided for this digest window — section omitted.*

---

## Feature Request Trends

1. **Per-agent / per-fleet model & effort configuration** — Top of the list. `/model` and `/effort` writing to the global `~/.claude/settings.json` is widely seen as blocking multi-agent fleets (#66402). Likely needs a layered config model.
2. **Self-hosted plugin & skills marketplace** — A real enterprise gap: non-allowlisted git hosts are rejected by the desktop app, and authenticated marketplaces appear to require managed settings (#90141). Self-hosted-environments consumers are blocked.
3. **Routines ↔ mobile session continuity** — Surface routines' sessions in the mobile app after the notification expires, not just at notification time (#76841).
4. **Configurable session-naming conventions** — Default `<dir>-<2char>` and AI-summarized titles collide when many concurrent sessions are open (#83455).
5. **Permission UX improvements** — Background-mode permission dialog missing Accept (#92974); Auto Mode prompting for `grep` (#91784); `btw` Esc eating pending edits (#65781, #74959).
6. **Long-lived automation stability** — Cowork session force-logout (~24–36h, #81512), remote control offline every ~8h (#77022), revoked tokens still consuming Max usage (#85533) — all point to "unattended / agentic" workflows needing stronger reliability primitives.

---

## Developer Pain Points

- **Cowork on Windows + recent OS patches is fragile.** Two reports in 24 hours (#92958, #93047) describe Plan9/virtiofs shares dying after cumulative updates or bridge interruptions, while other ops (`device_list_dir`, `stage`, `commit`) recover. Forcing users into A/B rollback workflows.
- **Global settings.json is a footgun for agent fleets.** Anything mutating it from a command (`/model`, `/effort`) silently changes behavior for every other agent on the host (#66402).
- **TUI modal interactions leak side-effects.** `Esc` inside `/btw` rejects pending file edits / AskUserQuestion prompts (#65781, #74959). Users consistently find this confusing rather than expected.
- **Cowork / device sessions aren't durable enough for unattended use.** Periodic forced logouts, gateway drift on version bumps (2.1.265 regression), and Plan9 re-attach gaps stack up into a "don't trust it in cron" narrative.
- **Stale-bot churn vs. community engagement.** Many issues closed as "stale" still have recent comments and upvotes, suggesting the 14-day lifecycle is too aggressive for slow-moving bugs. PR #63686 (now closed) was the proposed mitigation.
- **Sandbox ergonomics missing.** Disk exhaustion in Cowork is silent and model-authored tests leak temp dirs at scale (#85576). A basic "disk pressure" signal would prevent hard failures.

---

*Digest generated from GitHub activity for `anthropics/claude-code` on 2026-09-09. Items referenced by `#NNNNN` link to `github.com/anthropics/claude-code/issues/NNNNN` and `.../pull/NNNNN`.*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-09

## Today's Highlights

The 0.154.0 alpha line is moving fast with four new pre-releases in the last 24 hours, accompanied by a large merge wave into the Python SDK (history selection, per-turn options, external messages, post-release publishing pipeline) and the credential broker/proxy layer. On the bug side, Windows continues to dominate top issue traffic, with recurring pain around Computer Use, MCP servers, the floating Pets feature, and a paginated-rollout session bug that can permanently freeze thread history on both macOS and Windows.

## Releases

Four new alpha builds were tagged on the `rust-v0.154.0` line in the last 24 hours, indicating an active stabilization sprint toward the next minor CLI:

- `rust-v0.154.0-alpha.11` — [Release](https://github.com/openai/codex/releases)
- `rust-v0.154.0-alpha.10.2` — [Release](https://github.com/openai/codex/releases)
- `rust-v0.154.0-alpha.8` — [Release](https://github.com/openai/codex/releases)
- `rust-v0.154.0-alpha.7` — [Release](https://github.com/openai/codex/releases)

## Hot Issues

1. **#28919 — Windows app missing “control other devices” tab in Settings > Connections** — 66 comments, 62 👍. Long-standing regression that blocks Remote Control setup for Pro users on Windows. Highest-voted open issue of the week. [Link](https://github.com/openai/codex/issues/28919)

2. **#41513 — [Windows] Built-in and custom floating Pets become click-through and undraggable** — 34 comments, 14 👍. Reproducible across the latest two desktop builds; the mascot is visible but clicks pass through to underlying windows, breaking the feature entirely. [Link](https://github.com/openai/codex/issues/41513)

3. **#25271 — Computer Use cannot determine Chrome URL on Windows** — 34 comments, 9 👍. Even `chrome://newtab/` cannot be resolved by Computer Use on Windows, undermining the core value prop of the cua_repl pipeline on the most popular desktop OS. [Link](https://github.com/openai/codex/issues/25271)

4. **#41566 — Paginated rollout emits duplicate ordinal after unfinished turn, freezing thread history** — 28 comments. A correctness bug where an unfinished turn can permanently desync session pagination; thread history never recovers without manual cleanup. [Link](https://github.com/openai/codex/issues/41566)

5. **#42215 — ChatGPT Work local chat: “Could not use this project for a local chat”** — 26 comments. Project context sync fails at the filesystem stage for projects with 20+ source files, blocking Work/Projects for a significant slice of users. [Link](https://github.com/openai/codex/issues/42215)

6. **#29639 — Browser Use / Node REPL fails on Windows Desktop with WSL workspace** — 23 comments, 7 👍. The auto-generated `node_repl` MCP server sends a Windows binary but a Linux/WSL `sandboxCwd`, a fundamental mismatch in the desktop ↔ WSL bridging layer. [Link](https://github.com/openai/codex/issues/29639)

7. **#34306 — False “cybersecurity” policy flag on legitimate requests (CLI)** — 20 comments, 14 👍. gpt-5.6-sol-xhigh trips the safety filter on benign work; the report template is unclear, leaving users unable to recover their session. [Link](https://github.com/openai/codex/issues/34306)

8. **#42683 — Alt+P keyboard shortcut crashes the Windows app** — 14 comments, 4 👍. Hard crash on a documented shortcut, last reproduced on `26.901.22334`. [Link](https://github.com/openai/codex/issues/42683)

9. **#43124 — macOS desktop history freezes at older turns (projection ordinal mismatch)** — 11 comments. macOS counterpart to #41566: paginated rollout reports `expected 3185, got 3184`, dropping recent turns from the UI while keeping them on disk. [Link](https://github.com/openai/codex/issues/43124)

10. **#38573 — Azure Responses API 400: `input[0].tools[0].description is empty`** — 10 comments, 3 👍. Custom-model users on Azure/Foundry are blocked because the Desktop client omits the `description` field the Azure Responses endpoint requires. [Link](https://github.com/openai/codex/issues/38573)

**Honorable mentions:** [#29546](https://github.com/openai/codex/issues/29546) `gpt-5.5` 404 (12 👍) shows model-version drift across App/CLI; [#24879](https://github.com/openai/codex/issues/24879) exposes that `codex-auto-review` is hardcoded and breaks for custom providers; [#42514](https://github.com/openai/codex/issues/42514) reports Computer Use is missing entirely on Intel Macs (x86_64).

## Key PR Progress

1. **#44121 — Reuse MCP bindings while cached servers remain dormant** — Stops the model from capturing a fresh MCP binding per step when a dormant server's tool catalog is still usable. Reduces startup latency and tool-call noise. [Link](https://github.com/openai/codex/pull/44121)

2. **#44086 — Add untrusted external messages to the Python SDK** — New `ExternalMessage` for sync/async `run(...)` and `run_streamed(...)` so apps can deliver tool-authority content from other agents without it being treated as user input. [Link](https://github.com/openai/codex/pull/44086)

3. **#44084 — Expose Python SDK history selection and per-turn options** — Callers can now control response-history loading and override the service tier for a single turn, with runtime version compatibility checks so old CLIs fail loudly rather than silently ignoring the option. [Link](https://github.com/openai/codex/pull/44084)

4. **#44067 — Publish Python packages after stable CLI releases** — Adds a downstream workflow that pins the SDK runtime dependency to the just-released CLI version and verifies the runtime on PyPI before publishing the SDK. [Link](https://github.com/openai/codex/pull/44067)

5. **#44061 — Build Python SDK artifacts before publishing the runtime** — Previously, an SDK build failure could leave the runtime published alone; this PR extracts a reusable SDK build workflow and reorders the pipeline. [Link](https://github.com/openai/codex/pull/44061)

6. **#44060 — Raise Guardian's action review limit to 200,000 bytes** — Increases `GUARDIAN_MAX_ACTION_BYTES` from 8,000 → 200,000 so large diffs/unified-exec actions can be reviewed, while keeping `MAX_STDIN_APPROVAL_BYTES` capped at 8,000. [Link](https://github.com/openai/codex/pull/44060)

7. **#44056 — Add configurable credential providers to the network proxy** — New `credential_providers` config for env vars, URL prefixes, and bearer/token/Basic auth, plus dummy-credential generation for HTTP `CONNECT`/SOCKS5 tunnels. Foundation for safer proxy workflows. [Link](https://github.com/openai/codex/pull/44056)

8. **#44072 — Support configured credential providers across shell snapshots** — Ensures credential destinations are retained even when shell env policy hides them from children, and that token rotation preserves original destination bindings. [Link](https://github.com/openai/codex/pull/44072)

9. **#44043 — Use `StartThreadOptions` across thread fork APIs** — Unifies rollout/loaded-history/prepared forks behind a single options struct and replaces `initial_history` with the fork snapshot, removing a class of “fork vs reload” config drift bugs. [Link](https://github.com/openai/codex/pull/44043)

10. **#44049 — Extract credential broker environment and registry helpers** — Splits environment/marker helpers into `credential_broker/environment.rs` and prioritization/selection into `credential_broker/registry.rs`, paving the way for more providers. [Link](https://github.com/openai/codex/pull/44049)

**Also notable:** [#44070](https://github.com/openai/codex/pull/44070) rejects empty audio payloads in data URLs with a clear error; [#44062](https://github.com/openai/codex/pull/44062) fixes voice-runtime Bazel `-c opt` builds and post-signing permissions.

## Hot Discussions

### Ideas
- **#9618 — `/rewind` or `/revert` feature** — Still the single most upvoted thread in the repo (126 👍, 21 comments). Users highlight that OpenCode and Claude Code both ship an undo, and the lack of one in Codex forces constant commits and makes long sessions “almost unusable.” [Link](https://github.com/openai/codex/discussions/9618)

### Q&A
- **#43891 — Fix for the macOS `SkyComputerUseService` spawn storm on Codex 26.820** — User-confirmed workaround and update that **26.901.51231** fixes the hundreds-of-processes / 10+ GB RAM / kernel-panic regression. Practical reference for anyone still pinned on 26.8xx. [Link](https://github.com/openai/codex/discussions/43891)
- **#43911 — AI analytical thinking and decision-making issues in a card game app** — Developer asking why four AI players fail to use available game state; signals a recurring thread of users confused about prompt/scaffolding for multi-agent game logic. [Link](https://github.com/openai/codex/discussions/43911)

### Show and Tell
- **#16329 — Awesome Codex CLI: 150+ ecosystem tools** — Community-maintained index of subagents, skills, plugins, and MCP servers. Useful jumping-off point for new users. [Link](https://github.com/openai/codex/discussions/16329)
- **#44109 — `postbag`: letters between Codex and Claude Code sessions via `codex queue`** — Lightweight inter-agent harness using each vendor's own wake-up mechanism (no daemon, no polling). Interesting primitive for multi-agent workflows. [Link](https://github.com/openai/codex/discussions/44109)
- **#44046 — Built with Codex: local CSV reconciliation (`csv-merge-dedupe`)** — Reproducible demo with HTML reports; good example of Codex-driven data tooling with deterministic outputs. [Link](https://github.com/openai/codex/discussions/44046)
- **#43908 — ManualMode: reserve a real repo task for manual practice alongside Codex** — Workflow where Codex proposes a small needed task and the developer implements it by hand; positioned for engineers who still want hands-on practice. [Link](https://github.com/openai/codex/discussions/43908)

### General
- **#14104 — Insert new line in Codex CLI** — Users want `Shift+Enter` instead of `Ctrl+J` for newline; 14 👍. [Link](https://github.com/openai/codex/discussions/14104)
- **#41527 — Successful native ChatGPT Linux app on SteamOS 3.8.16 (Steam Deck)** — Confirms the Linux preview runs on Arch-based SteamOS even though it isn't officially supported. [Link](https://github.com/openai/codex/discussions/41527)
- **#40132 — What are you building with Codex?** — Lightweight community round-up; helpful for newcomers looking for use-case patterns. [Link](https://github.com/openai/codex/discussions/40132)

## Feature Request Trends

Across issues and discussions, the highest-signal, repeatedly requested directions are:

1. **Session undo / checkpointing.** `/rewind` and `/revert` remain the #1 voted thread; users explicitly compare against Claude Code and OpenCode and frame the absence as a blocker for serious workflows.
2. **Stable Windows parity.** A long tail of bugs (Remote Control, Computer Use, MCP/WSL bridging, Pets, project sync, Alt+P crash, Arabic RTL) shows Windows users feel like a second-class platform.
3. **Reliable session/history pagination.** The duplicate-ordinal and projection-mismatch bugs (Windows + macOS) suggest the paginated rollout layer needs a recovery path and better durability of unfinished turns.
4. **Better provider/model portability.** Auto-review hardcoded to `codex-auto-review` and Azure Responses missing required fields show custom-provider users are repeatedly surprised by OpenAI-specific assumptions.
5. **Safer, more nuanced safety classifier.** Multiple false-positive “cybersecurity” / “cyber abuse” blocks (#34306, #30271) on legitimate engineering work push for clearer redaction/recovery and a less aggressive rule for verified users.
6. **TUI quality-of-life.** Newline binding (`Shift+Enter`), RTL rendering, and input-source shortcut conflicts indicate the TUI is being used heavily and needs platform-aware keymaps.
7. **MCP at rest.** Reuse bindings for dormant servers, config overrides for `cua_repl`, OAuth scope selection — all point toward a more configurable and recoverable MCP layer.
8. **Pets as a real product feature.** Multiple click-through reports and a macOS shortcut conflict suggest the feature needs its own stability pass before it can ship as more than an Easter egg.

## Developer Pain Points

- **Windows is fragile end-to-end.** The single biggest source of open issues: missing Remote Control tab, Computer Use URL resolution, WSL sandbox path bridging, Pets click-through, project sync, Chat composer disappearing, history projection freezes, crash on Alt+P, Arabic RTL in the TUI.
- **Session history can silently corrupt.** Both Windows and macOS Desktop apps can lose days of turns behind a paginated-rollout mismatch with no recovery surface.
- **Custom providers hit OpenAI-specific assumptions.** Hardcoded `codex-auto-review` model name, Azure Responses requiring `tools[].description`, `gpt-5.5` 404s in older builds — friction for anyone running against Azure/Foundry/local proxies.
- **Safety filters false-positive on security work.** Reverse engineering, vulnerability analysis, and adjacent benign workflows trip the cybersecurity classifier without a clear path back into the session.
- **Computer Use is uneven across platforms.** Works on Apple Silicon macOS, broken on Intel Mac, unreliable URL resolution on Windows, spawn-storm regression on older macOS builds.
- **MCP ergonomics need work.** OAuth DCR scope selection, elicitation notifications, `cua_repl` config overrides, and binding reuse all surfaced in the last 24h, indicating the MCP story is a top pain point for power users.
- **Python SDK release hygiene.** Several PRs this week are explicitly about ordering runtime → SDK publishing, gating on PyPI availability, and avoiding silent incompatibility — a sign developers were burned by prior broken SDK releases.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-09

## 1. Today's Highlights

Today shipped three releases, headlined by **v0.61.0-nightly** (NTFS short-name path mitigation, sandbox settings isolation) and **v0.60.0-preview.0** (web fetch routing hardening, RFC 9207 MCP OAuth issuer enforcement). A fresh **P1 report (#29257)** landed on the `cli_help` subagent hanging exactly 3 minutes on CLI meta-questions, adding to a cluster of high-priority subagent reliability issues. On the contributor side, a critical open PR (#29265) targets **session context poisoning on interrupted turns**, while several long-running P1/P2 fixes (Plan Mode non-interactive hang, macOS Seatbelt auth crash, a2a-server credential cleanup) were merged.

## 2. Releases

- **[v0.61.0-nightly.20260909](https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0-nightly.20260909.ged2ac40df)** — Mitigates NTFS 8.3 short-name (SFN) path issues on Windows ([PR #29116](https://github.com/google-gemini/gemini-cli/pull/29116)); isolates the settings directory inside sandbox containers ([PR #29216](https://github.com/google-gemini/gemini-cli/pull/29216)).
- **[v0.60.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-preview.0)** — Improves destination validation and connection routing in web fetch utilities ([PR #29120](https://github.com/google-gemini/gemini-cli/pull/29120)); enforces RFC 9207 issuer identification in the MCP OAuth flow — a notable security hardening for MCP integrations.
- **[v0.59.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0)** — Stable cut including changelog and version bump automation plus accumulated core fixes.

## 3. Hot Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent reports GOAL success after hitting MAX_TURNS (P1, 13 💬)**
   The `codebase_investigator` claims success while admitting it ran out of turns before doing any work. This is a correctness black hole: silently-interrupted agent runs look completed to orchestrators and users. Highest comment volume today; still awaiting retest confirmation.

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent hangs indefinitely (P1, 8 💬, 8 👍)**
   Most-upvoted issue in the batch. Deferral to the generalist subagent hangs even on trivial tasks like folder creation, for up to an hour. Users are forced to prompt "don't use subagents" — a strong signal that subagent deferral is actively degrading UX.

3. **[#29257](https://github.com/google-gemini/gemini-cli/issues/29257) — `cli_help` subagent hangs exactly 3 minutes (P1, filed yesterday)**
   New today. The built-in CLI self-help agent reliably stalls for 180s on any meta-question ("how do I upgrade?"), due to unbounded `thinkingBudget` and no per-turn timeout. The precise 3-minute repro makes this a likely quick fix — worth watching.

4. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — Zero-dependency OS sandboxing + post-execution intent routing (P2, 9 💬)**
   Architectural proposal to let Gemini 3's native bash affinity (grep/sed/awk chaining) run free behind OS-level sandboxing rather than custom tool wrappers. High engagement suggests the community wants fewer tool-call round trips per edit.

5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — AST-aware file reads, search, and codebase mapping (EPIC, P2, 7 💬)**
   Investigation epic into syntax-aware tools that read exact method bounds in one call instead of misaligned line ranges. Directly attacks token waste and multi-turn read correction; companion spike [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) evaluates `tilth`/`glyph` as starting points.

6. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Model barely uses skills and sub-agents autonomously (P2, 6 💬)**
   Custom `gradle`/`git` skills are ignored unless explicitly invoked, even on directly related tasks. A recurring theme: users invest in skill/agent definitions the model then fails to discover or route to.

7. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell execution stuck on "Waiting input" after command completes (P1, 4 💬, 3 👍)**
   Completed shell commands leave the UI showing an active "Awaiting user input" state. Combined with #22465 (hang on `create-vite` interactive prompt), shell/TTY lifecycle handling remains a top reliability gap.

8. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Auto Memory sends transcripts to model before redaction (P2, security, 5 💬)**
   Secret redaction happens *after* transcript content is already in the extraction model's context. Part of a broader memory-quality cluster (#26516, #26522, #26523) being tracked by one reporter; the privacy angle makes this the most sensitive of the set.

9. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — Browser subagent fails on Wayland (P1, 4 💬)**
   The browser agent terminates immediately on Wayland Linux sessions. Notable because it blocks an entire display-server population from a flagship subagent; awaiting retest.

10. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 400 error when >128 tools are registered (P2, 3 💬)**
    Heavy MCP/extension users hit an API hard limit with no client-side tool scoping. The request for smarter tool-subset selection per task overlaps with the token-efficiency trend below.

## 4. Key PR Progress

1. **[#29265](https://github.com/google-gemini/gemini-cli/pull/29265) — Prevent session context poisoning on interrupted turns (OPEN, P2)**
   Interrupting a stream (SIGINT, timeout, aborted tool call) currently corrupts chat history and breaks all subsequent prompts. This is the most impactful open PR today — it addresses the interrupt-path cousin of the hang issues above.

2. **[#29163](https://github.com/google-gemini/gemini-cli/pull/29163) — Fix startup crash during auth inside git repos (OPEN, P1, security)**
   The `useGitBranchName` hook crashes under macOS Seatbelt/restricted permissions when it can't read `.git`. Removes a hard startup failure for sandboxed macOS users.

3. **[#29063](https://github.com/google-gemini/gemini-cli/pull/29063) — Stop Plan Mode waiting for user feedback in non-interactive runs (CLOSED, P1)**
   Fixes `gemini -p ... -y` Plan Mode hanging forever because workflow instructions assumed an interactive user turn. Unblocks headless/CI usage.

4. **[#29067](https://github.com/google-gemini/gemini-cli/pull/29067) — Remove misleading security schemes & hardcoded credentials in a2a-server (CLOSED, P1/P2)**
   Strips fake auth metadata and insecure hardcoded creds from the coder agent card — important supply-chain-adjacent hygiene for the A2A surface.

5. **[#29151](https://github.com/google-gemini/gemini-cli/pull/29151) — Case-insensitive skill precedence and active-state tracking (OPEN, P1)**
   Workspace skills silently failed to override built-ins when casing differed (`Git` vs `git`). Directly relevant to issue #21968's "skills don't work" reports.

6. **[#29089](https://github.com/google-gemini/gemini-cli/pull/29089) — Forward abortSignal into retryWithBackoff (CLOSED, P2)**
   Cancellation now propagates through retries in `BaseLlmClient` (session summaries, compression, classifier) instead of orphaned retry loops — a structural fix contributing to fewer "hangs forever" classes.

7. **[#29087](https://github.com/google-gemini/gemini-cli/pull/29087) — Prevent concurrent extension install races (CLOSED)**
   Two Gemini CLI processes could interleave file copies and metadata writes for the same extension; now serialized via `proper-lockfile`. Good news for multi-terminal users.

8. **[#29088](https://github.com/google-gemini/gemini-cli/pull/29088) — Fix VS Code companion `stop()` never resolving (CLOSED)**
   The IDE server's MCP long-lived stream prevented shutdown drain, blocking extension deactivation. Fixes VS Code exit hangs.

9. **[#29156](https://github.com/google-gemini/gemini-cli/pull/29156) — Stop nullifying user git config in shell executions (OPEN)**
   Reverts a regression (from #28792) that pointed `GIT_CONFIG_GLOBAL`/`GIT_CONFIG_SYSTEM` at `/dev/null`, hiding `user.name`/`user.email` from every shell tool call — breaking commits authored by the agent.

10. **[#29248](https://github.com/google-gemini/gemini-cli/pull/29248) — Deduplicate history & telemetry after confirmations (OPEN)**
    Confirming a slash-command action (e.g., `/resume save <tag>` overwrite) no longer double-logs history/telemetry when messages raced the confirmation dialog.

*Also merged: [#29155](https://github.com/google-gemini/gemini-cli/pull/29155) (UTF-16/32 BOM decode fix for empty-plan detection) and nightly bump [#29258](https://github.com/google-gemini/gemini-cli/pull/29258). A batch of low-signal workflow-rename PRs (#29259–#29263) from one account were closed without merge.*

## 5. Hot Discussions

*Omitted — no Discussion-thread data was provided in this dataset.*

## 6. Feature Request Trends

- **Agent reliability & honest reporting**: Correct termination semantics (#22323), hang elimination (#21409, #29257), and interrupt-safe sessions (#29265) dominate. Users want subagent failures to be loud, not masked as "GOAL success."
- **AST-aware code intelligence**: The #22745/#22746 epic plus "Tactful Extraction" (#19561, surgical grep-first reads against a ~36.6k token/turn baseline) point to a strong push for token-frugal, structure-aware file access.
- **OS-native sandboxing over tool wrappers**: #19873 argues for letting the model use raw POSIX tools behind seatbeat/sandbox-style isolation — less custom tooling, more model-native operation.
- **Better skill/subagent discoverability**: #21968, #29151, and symlink support (#20079) all circle the same ask: "make the model actually use what I've configured."
- **Memory system maturation**: The #265xx cluster requests deterministic redaction, bounded retries, valid patch surfacing, and overall quality gates for Auto Memory.
- **Observability**: Shareable subagent trajectories via `/chat share` (#22598) and subagent context in `/bug` reports (#21763).
- **Safety guardrails**: Discourage destructive git/DB operations by default (#22672).

## 7. Developer Pain Points

- **Subagent hangs are the #1 frustration**: Generalist hangs (#21409), browser-on-Wayland (#21983), `cli_help` 3-minute stall (#29257), and vite interactive-prompt lockups (#22465) — users routinely disable subagents to stay productive.
- **Shell/TTY lifecycle bugs**: Commands report "Waiting input" after finishing (#25166); interrupting a turn can poison the whole session (#29265).
- **Workspace hygiene**: Shell-restricted configs cause the model to scatter temp edit scripts across random directories, complicating clean commits (#23571).
- **Config that silently doesn't apply**: Browser agent ignoring `settings.json` overrides like `maxTurns` (#22267) and symlinked agents not loading (#20079) erode trust in declarative configuration.
- **Privacy anxiety around Auto Memory**: Transcript content reaching the extraction model pre-redaction (#26525) is the loudest security concern this cycle.
- **Scaling limits for power users**: >128 registered tools triggers a hard 400 error with no client-side scoping (#24246).
- **Terminal UX polish**: Flicker/性能 on resize (#21924) and `\n` escape quirks (#22466) remain open quality irritants.

---
*Data source: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) · Digest generated 2026-09-09*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest
**Date: 2026-09-09**

---

## 🔥 Today's Highlights

- **Vim mode has officially shipped** in v1.0.84-2 — a long-standing community request (issue #13, 76 👍) closed after nearly a year.
- **Two patch releases (v1.0.84-2 & v1.0.84-3)** dropped in 24 hours, fixing `/copy` behavior, MCP OAuth reliability, and Windows sandbox audit logging.
- **Memory-related session bugs are escalating**: multiple high-priority issues describe OOM crashes, runaway loops, and unresumable sessions, signaling stability regressions on long-running workflows.

---

## 📦 Releases

### v1.0.84-3 (Latest)
- `/copy` now includes task completion messages when available.
- OAuth-authenticated MCP servers connect reliably during session startup.

### v1.0.84-2
- **New**: Vim mode is now generally available — enable with `/vim` or set `editorMode: "vim"`. Current mode is shown in the composer while typing.
- **Improved**: On supported Windows sandbox policies, interactive shell commands now record blocked accesses.

---

## 🚨 Hot Issues

1. **[#4742](https://github.com/github/copilot-cli/issues/4742)** — Desktop app 1.1.15 cannot create a second Local (branch) session while one is running. **Why it matters**: Hits users who try to manage parallel workstreams in the same project; a regression in the latest desktop release. *(10 comments, 5 👍)*

2. **[#4612](https://github.com/github/copilot-cli/issues/4612)** — Runaway FileWatch host-event loop freezes the TUI and inflates debug logs to 13 GB. **Why it matters**: Indicates an unbounded event-loop bug with serious disk and responsiveness consequences. *(9 comments, 1 👍)*

3. **[#4756](https://github.com/github/copilot-cli/issues/4756)** — Windows app forces archiving every idle project session before creating a new Local session. **Why it matters**: Strong 👍 score (19) suggests widespread workflow friction after the 1.1.15 desktop update. *(7 comments, 19 👍)*

4. **[#4664](https://github.com/github/copilot-cli/issues/4664)** — Copilot CLI crashes with JS heap OOM when resuming a long-standing session. **Why it matters**: Resume is a critical user journey; data loss risk for users with long histories. *(7 comments, 2 👍)*

5. **[#13](https://github.com/github/copilot-cli/issues/13)** — CLI input should have a vi/vim input mode. **CLOSED** today. **Why it matters**: Highest 👍 (76) of all listed issues — demonstrates massive pent-up demand for modal editing. *(11 comments, 76 👍)*

6. **[#4775](https://github.com/github/copilot-cli/issues/4775)** — Mission Control dashboard links 404: `/copilot/tasks/<uuid>` doesn't exist; real path is `/agents/tasks/<uuid>`. **Why it matters**: A broken product surface for remote session management on github.com. *(3 comments, 0 👍)*

7. **[#2943](https://github.com/github/copilot-cli/issues/2943)** — OpenRouter integration. **Why it matters**: Model-provider flexibility is in demand; users want a multi-provider escape hatch like competitors offer. *(3 comments, 14 👍)*

8. **[#3976](https://github.com/github/copilot-cli/issues/3976)** — Native `tgrep` indexer OOM-kills host on large monorepos (no memory cap). **Why it matters**: A native Rust tool that's *less* reliable than ripgrep it replaced; experiment gate is masking severity. *(3 comments, 0 👍)*

9. **[#4753](https://github.com/github/copilot-cli/issues/4753)** — v1.0.83 session resume cancels in-flight stdio MCP connections (~1s vs ~16s timeout). **Why it matters**: Silent MCP failure mode introduced in recent release; users lose tools without warning. *(3 comments, 1 👍)*

10. **[#2199](https://github.com/github/copilot-cli/issues/2199)** — Add Ctrl+Backspace to delete whole word. **Why it matters**: Basic editor ergonomics; consistent request across Windows (#3858) and Unix. *(3 comments, 7 👍)*

---

## 🔧 Key PR Progress

1. **[#4770](https://github.com/github/copilot-cli/pull/4770)** — *Document the WebSocket responses opt-out* (OPEN). Adds docs for an escape hatch when models default to WebSocket transports that fail with `400 input item ID does not belong to this connection`.

2. **[#4761](https://github.com/github/copilot-cli/pull/4761)** — *install: report unsupported operating systems* (CLOSED). Fixes `install.sh` reporting bogus "Windows detected" messages on platforms like FreeBSD.

---

## 📈 Feature Request Trends

Across today's issue list, several recurring themes emerge:

- **Modal / power-user editing**: Vim mode (#13 → shipped), Ctrl+Backspace (#2199, #3858), editor polish.
- **Editor / IDE ergonomics**: Visible TODO list (#1724), clearer waiting-for-input state (#4778), better notification/taskbar feedback (#4771, #4381).
- **Model & provider flexibility**: OpenRouter integration (#2943), Gemini MCP union-type tool schema fixes (#4623).
- **Plugin / extension ecosystem**: Marketplace plugin dependency resolution (#4487).
- **Enterprise controls**: Authenticated MCP registry reads (#3772).
- **Configuration discovery**: Reading `.mcp.json` and hooks from non-repo-root project directories (#4765).

---

## 😤 Developer Pain Points

- **Session instability**: Multiple related bugs — heap OOMs on resume (#4664), compaction crashes (#4780), stale connection IDs after interrupted responses (#4505), runaway FileWatch loops (#4612). Long sessions feel fragile.
- **Desktop app regressions (v1.1.15)**: Session creation conflicts (#4742, #4756), sticky notification badges (#4381).
- **Search/indexer reliability**: Native `tgrep` and built-in grep stalling or OOM-killing on real-world repos (#3976, #4448).
- **MCP friction**: OAuth scope bugs (#4582), redirect-handling failures (#4769), silent in-flight cancellations on resume (#4753), discovery issues (#4779).
- **Permission/approval model**: Assisted-mode permissions stop working after ~1 hour, requiring new sessions (#4764).
- **Cross-platform friction**: Windows-specific session behavior, Git env propagation (#4531), MallocStackLogging warnings (#4614), macOS clipboard over SSH (#4551).

> **Bottom line**: The CLI is shipping features fast (Vim mode, MCP OAuth fixes), but long-session stability and desktop/session lifecycle management are the current top pain points demanding triage attention.

---
*Digest generated from github.com/github/copilot-cli activity for 2026-09-09.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-09

## Today's Highlights

OpenCode v1.18.30 ships with the new Astra system prompt for GPT-6 models and several provider SDK updates. The community continues to push toward V2 stability, with notable activity around Zen provider model discovery, selective session-content deletion APIs, and provider-specific fixes for DeepSeek V4 token limits and caching behavior.

## Releases

### v1.18.30
- **Improvements**: Added the Astra system prompt for GPT-6 models.
- **Bugfixes**: Preserved Bedrock DeepSeek model IDs (including ARN-based IDs) for correct resolution (thanks @YeEmrick); updated Azure and OpenAI provider SDKs for compatibility fixes.
- [Release details](https://github.com/anomalyco/opencode/releases/tag/v1.18.30)

## Hot Issues

1. **[#6231](https://github.com/anomalyco/opencode/issues/6231)** — Auto-discover models from OpenAI-compatible provider endpoints (54 comments, 👍231). The most upvoted open issue; users want dynamic model discovery from local providers like LM Studio and Ollama instead of manual configuration.
2. **[#27786](https://github.com/anomalyco/opencode/issues/27786)** — XDG Base Directory Spec violation: `node_modules` installed in `~/.config` instead of `~/.local/share` (10 comments). Cross-platform packaging concern.
3. **[#38550](https://github.com/anomalyco/opencode/issues/38550)** — Manual todo management (9 comments, 👍7). Users want direct control over the todo list when the agent forgets to update or clear entries.
4. **[#7262](https://github.com/anomalyco/opencode/issues/7262)** — Session titles stopped auto-generating (CLOSED, 9 comments). Sessions stuck on "New session - timestamp" since early January.
5. **[#43805](https://github.com/anomalyco/opencode/issues/43805)** — DeepSeek-v4-flash-free missing from Zen provider dropdown despite being in `/zen/v1/models` API (8 comments).
6. **[#24298](https://github.com/anomalyco/opencode/issues/24298)** — Force immediate reading of queued messages (steering) (CLOSED, 7 comments, 👍8). Inspired by Copilot's pending message UX.
7. **[#48090](https://github.com/anomalyco/opencode/issues/48090)** — V2 selective session-content deletion missing after #48043 (5 comments). CodeNomad 0.20.0 adopted the removed API; community needs a supported replacement.
8. **[#39170](https://github.com/anomalyco/opencode/issues/39170)** — Desktop app does not render inline LaTeX math (`$...$`) on Windows (4 comments). Block math works; inline math shows raw source.
9. **[#47902](https://github.com/anomalyco/opencode/issues/47902)** — V2 tool call arguments corrupt across consecutive assistant turns (3 comments). A `patch` argument contained internal serialization markers; schema-invalid calls executed.
10. **[#47487](https://github.com/anomalyco/opencode/issues/47487)** — Agent bricked its own session by accumulating 51 images via read tool, hitting provider's 50-image limit (3 comments). No recovery path documented.

## Key PR Progress

1. **[#47973](https://github.com/anomalyco/opencode/pull/47973)** — `fix(core): close websocket after provider error frame` (CLOSED). Prevents stale Responses WebSocket channels from causing `delivery: ambiguous` failures on the next exchange.
2. **[#48132](https://github.com/anomalyco/opencode/pull/48132)** — `fix(core): report malformed glob patterns`. Surfaces ripgrep's `error parsing glob` instead of silently treating it as no match.
3. **[#38229](https://github.com/anomalyco/opencode/pull/38229)** — `fix(opencode): add DeepSeek system prompt` (CLOSED). DeepSeek models were inheriting conflicting generic instructions.
4. **[#38232](https://github.com/anomalyco/opencode/pull/38232)** — `fix(provider): preserve DeepSeek V4 output limit`. Stops `ProviderTransform.maxOutputTokens()` from capping DeepSeek V4 requests at 32K when it advertises 384K.
5. **[#48124](https://github.com/anomalyco/opencode/pull/48124)** — `feat(plugin): add select dialog shortcuts`. Structured shortcut metadata rendered in the same footer layout as the session picker.
6. **[#48130](https://github.com/anomalyco/opencode/pull/48130)** — `docs(go): update GLM-5.3-Flash allowance`. Ends the 2× promotion and updates Go docs/charts for the $60 monthly allowance.
7. **[#48129](https://github.com/anomalyco/opencode/pull/48129)** — `feat(plugin): support opening background tabs`. Adds an optional `focus` flag to `ctx.ui.tabs.open` for non-disruptive tab spawning.
8. **[#47289](https://github.com/anomalyco/opencode/pull/47289)** — `feat(tui): add manual todo management dialog` (closes #38550). Adds `/todo` command for cycling statuses, editing titles, adding, and deleting todos.
9. **[#48123](https://github.com/anomalyco/opencode/pull/48123)** — `feat(console): route migrated Go inference`. Forwards legacy Go keys and native service-account keys into Zen's ordinary inference path with preserved streaming and correlation IDs.
11. **[#47999](https://github.com/anomalyco/opencode/pull/47999)** — `fix(tui): keep saved tabs separate by server`. Prevents remote TUI sessions from overwriting local terminal selections.
12. **[#48125](https://github.com/anomalyco/opencode/pull/48125)** — `fix(app): restore session timeline scroll position after tab switches`. Resets to bottom when returning to a tab; restores the saved reading position.

## Feature Request Trends

- **Model discovery and management** — The single most-requested direction is automatic model discovery from OpenAI-compatible local providers (#6231), plus better model picker fidelity for Zen provider models that exist in the API but don't render in the UI (#43805, #48027).
- **V2 session APIs** — Multiple requests for supported APIs around selective session-content deletion (#48090), CLI `--server` accepting remote-only paths (#47665), and Code Mode catalog invocation (#48108). V2's API churn is breaking downstream consumers like CodeNomad.
- **UI flexibility** — Persistent V1/V2 layout toggle (#38230), manual todo management (#38550), restored tab scroll position (#48125), and in-page search (#48088).
- **Tool and execution ergonomics** — Pre-approved temp directories for skills/tools (#48100), right-click paste in TUI under mouse capture (#36456), and reliable execution approval when prompts are long (#48104).
- **Prompt caching and routing transparency** — Several requests expose that OpenCode Go doesn't cache prompts for `deepseek-v4-flash` and `qwen3.8-max` (#41125, #48116), driving users to ask for clearer per-model caching behavior.

## Developer Pain Points

- **Cross-platform packaging gaps** — XDG directory violations (#27786) and Windows background server port collisions (#47776) show rough edges in install and runtime behavior outside macOS.
- **Provider correctness** — Recurring reports of DeepSeek V4 output limits being capped (#38236), missing Zen models (#43805, #48027), `muse-spark-1.2-contributor-free` returning HTTP 500 (#44847), and missing prompt caching on Go (#41125, #48116) point to a recurring class of provider-specific regressions.
- **Session reliability** — Self-inflicted session bricks via image accumulation (#47487), event table bloat from per-update message snapshots (#41175), and silent task stops (#48127) leave users with no clear recovery path.
- **Agent correctness under V2** — Tool argument corruption across turns (#47902), missing MCP Code Mode tools despite catalog being injected (#48108), and plugin reload crashes on concurrent locations (#48121) indicate V2's tool execution layer still needs hardening.
- **UX inconsistencies between Desktop, TUI, and Web** — Inline LaTeX only in Desktop (#39170), `mod+f` search missing (#48088), and GUI preference for V1 over V2 (#48110) suggest the desktop/web surfaces lag behind the TUI.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-09

## Today's Highlights
Today's activity centers on provider-integration friction and reliability hardening. The OpenCode Go `x-opencode-session` header requirement generated three closely related reports (closed in 24h: #9230, #9326, #9371), and Anthropic OAuth usage reporting shipped as a merged feature (#9345). On the reliability front, WebSocket retry behavior, Esc-during-stream cancellation, and abort-after-compaction races all received fixes or closures, signaling a deliberate tightening of long-running session semantics.

## Releases
*No new releases in the last 24 hours.*

## Hot Issues

- **#7444 — WebSocket retry only handles two error codes** ([link](https://github.com/earendil-works/pi/issues/7444))
  Closed. `openai-codex-responses` only retried on `previous_response_not_found` and `websocket_connection_limit_reached`; any other `response.failed` frame terminated the turn. 10 comments of community discussion on resilience contract.

- **#8823 — Esc during active streaming fails to cancel** ([link](https://github.com/earendil-works/pi/issues/8823))
  Closed. Abort is registered but the HTTP request keeps streaming until the provider finishes; the turn persists with `stopReason: "aborted"` only after natural completion. 10 comments — top-of-mind UX concern.

- **#9052 — Fullscreen mode wheel scrolling is 3× slower** ([link](https://github.com/earendil-works/pi/issues/9052))
  Open. Users switching to fullscreen for a fixed input box hit ~3× scroll lag vs. regular TUI mode. 7 comments, 3 👍 — a clear ergonomic regression.

- **#9230 — `opencode-go` missing `x-opencode-session` header** ([link](https://github.com/earendil-works/pi/issues/9230))
  Closed. OpenCode Zen started requiring the header on 2026-09-06. 6 comments — part of a coordinated three-issue fix.

- **#7445 — `openai-responses` ties developer-role selection to `model.reasoning`** ([link](https://github.com/earendil-works/pi/issues/7445))
  Open, in-progress. `supportsDeveloperRole: true` is effectively ignored unless reasoning is enabled. 6 comments — affects prompt-routing fidelity.

- **#8928 — Parallel pi startup reports "No API key found" for ~48s** ([link](https://github.com/earendil-works/pi/issues/8928))
  Open, in-progress. With an expired OAuth credential in `auth.json`, multi-process launches stall ~48s and blame the active provider. 5 comments — meaningful for Nix/multi-agent setups.

- **#9326 — `@earendil-works/pi-ai` never sends `x-opencode-session`** ([link](https://github.com/earendil-works/pi/issues/9326))
  Closed. Mirror of #9230 in the SDK layer; reproduces the same `MissingSessionID` rejection.

- **#5581 — `pi.sendMessage({ triggerTurn: true })` bypasses `before_agent_start`** ([link](https://github.com/earendil-works/pi/issues/5581))
  Open, in-progress. Extension-driven turns skip lifecycle hooks that `prompt()` honors, creating inconsistent behavior for input-rewriting/blocking extensions. 5 comments, 1 👍.

- **#8826 — Cap agent retry backoff for prolonged outages** ([link](https://github.com/earendil-works/pi/issues/8826))
  Closed. Exponential retry could grow unbounded during `503 upstream call failed` storms. Request is for a configurable cap.

- **#7739 — Set startup-time budget targeting jcode-comparable latency** ([link](https://github.com/earendil-works/pi/issues/7739))
  Open. Targets the jcode README benchmark vs. pi 0.62.0; sets a quantified product goal rather than ad-hoc tuning.

## Key PR Progress

- **#9376 — fix(ai): use `reasoning_effort` for Mistral-hosted GLM** ([link](https://github.com/earendil-works/pi/pull/9376))
  Closed. Mistral ignores `prompt_mode: "reasoning"`; switches to `reasoning_effort` so GLM-5.2 actually reasons.

- **#9374 — fix(coding-agent): reject reload during active session operations** ([link](https://github.com/earendil-works/pi/pull/9374))
  Closed. Mirrors the existing TUI `isStreaming`/`isCompacting` guards into the RPC reload path; prevents successful tool results from becoming errors.

- **#9351 — Fix edit preview flicker on remote edits** ([link](https://github.com/earendil-works/pi/pull/9351))
  Open. Remote edit ops briefly show a red "Could not edit file" row before the real diff lands.

- **#9350 — fork-free executable lookup** ([link](https://github.com/earendil-works/pi/pull/9350))
  Closed. `which` and `<cmd> --version` probes no longer fork on the main thread; addresses Android/WSL deadlocks.

- **#9346 — fix(security): update Gondolin undici** ([link](https://github.com/earendil-works/pi/pull/9346))
  Closed. Bumps Gondolin's `undici` to 6.28.0 (moderate CVE) and cleans a stale `packages/web-ui/*` pre-commit pattern.

- **#9345 — feat(ai): expose Anthropic OAuth usage reports** ([link](https://github.com/earendil-works/pi/pull/9345))
  Closed. Provider-neutral `Models.getUsageReport("anthropic")` adapter with a five-minute partitioned cache and in-flight dedupe.

- **#6881 — feat(ai): use provider-reported cost** ([link](https://github.com/earendil-works/pi/pull/6881))
  Open, in-progress. `usage.cost` plus `cost_details.upstream_inference_cost` for BYOK upstream share; falls back to catalog rates when absent.

- **#9344 — feat(coding-agent): owner-safe UI overrides** ([link](https://github.com/earendil-works/pi/pull/9344))
  Closed. Owner-identity-based override stacking for themes/footers/editors; explicit selection clears temporary ownership cleanly.

- **#9341 — fix(coding-agent): update runtime dependencies** ([link](https://github.com/earendil-works/pi/pull/9341))
  Closed. Updates selected runtime deps (`minimatch` etc.) while pinning `diff`/`openai`/`highlight.js`; regenerates lockfiles.

- **#9337 — bound Case 3 compaction estimate + display on failed turns** ([link](https://github.com/earendil-works/pi/pull/9337))
  Closed. Backports three compaction/context-display fixes from a downstream fork to the official release line.

## Hot Discussions

**Show and tell**
- **#8803 — pi-verdict: minimal permission gate** ([link](https://github.com/earendil-works/pi/discussions/8803))
  jesset. Single-file allow/ask/deny gate in Claude-Code-auto-mode style, positioned as the confirmation flow Pi's README explicitly leaves to extensions. 1 👍.

- **#9373 — pi-agent-views: concurrent sub-agents rendered by pi** ([link](https://github.com/earendil-works/pi/discussions/9373))
  AllanZyne. Parallel agents each with their own model; `←` on an empty prompt switches view without losing state. 1 👍.

## Feature Request Trends

1. **OpenCode Zen / Go compatibility surface** — multiple threads converge on the `x-opencode-session` header and `MissingSessionID` rejection path (#9230, #9302, #9326, #9371), suggesting the team should standardize a session-header requirement across all OpenCode-family providers.
2. **Reliable cancellation semantics** — Esc-during-stream (#8823), `AgentSession.abort()` racing auto-compaction (#9340), and reload-during-tool (#9374/#9377) all point to a shared ask: lifecycle interrupts must be atomic and observably consistent.
3. **Bounded retry behavior** — backoff caps (#8826) and WebSocket error handling (#7444) reflect demand for predictable retry envelopes rather than open-ended ones.
4. **Provider-reported cost & usage visibility** — PR #6881 (cost) and PR #9345 (Anthropic usage reports) align with a broader request for first-party cost/usage signals instead of catalog-rate approximations.
5. **TUI polish and parity** — fullscreen scroll parity (#9052), CapsLock handling (#9362), `TruncatedText` width (#9359), and `Component.invalidate()` docs (#9358) all cluster around making the TUI feel uniform across modes.

## Developer Pain Points

- **Provider-specific auth quirks break across releases.** The OpenCode header chain in 24h is the clearest example: a vendor policy change on 2026-09-06 cascaded into three separate user-facing failures in the SDK and provider layer.
- **Streaming cancellation is unreliable across providers.** Esc-during-stream and SSE-fallback pinning (#8125) make it hard to reason about turn boundaries.
- **Credential resolution paths are brittle.** Parallel-startup stalls (#8928), read-only config dirs (#6406), and provider-attribution mismatches suggest `auth.json` lifecycle needs more explicit handling for multi-process and immutable-filesystem setups.
- **Long-session compaction has multiple, inconsistent entry-to-context projections** (#6451, #9337, #9340), making it hard to predict when and how context gets trimmed.
- **Performance has no published budget.** #7739 explicitly calls out the lack of a startup-time target relative to peers (jcode), leaving regressions to be discovered by users rather than caught in CI.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-09

## 1. Today's Highlights

v0.23.2 has shipped with a follow-up fix that isolates subprocess-heavy E2E tests from fork pressure, smoothing the release pipeline. Community attention is split between the long-running **ink → OpenTUI migration** tracking issue (33 comments) and a cluster of **daemon/Web Shell session-lifecycle bugs** that lose prompts, completion indicators, and background-shell output when sessions are refreshed or recycled. On the architecture side, a new **persistent shared-thread agent collaboration** ("mesh") feature landed in PR form, while the docs team is consolidating the daemon REST/SSE surface for integrators.

---

## 2. Releases

### v0.23.2 — Released
- **CI:** isolate subprocess-heavy E2E from fork pressure ([#11388](https://github.com/QwenLM/qwen-code/pull/11388)) by @yiliang114
- **Web Shell:** Improve split-view session navigation ([#11250](https://github.com/QwenLM/qwen-code/pull/11250)) by @wensha
- No breaking changes declared.

### v0.23.1 — Released earlier in the cycle
- **Breaking:** `refactor!: retire @qwen-code/webui` ([#9812](https://github.com/QwenLM/qwen-code/pull/9812)) — the deprecated webui is gone; integrators must move to `qwen serve` / Web Shell.
- **Web Shell:** visualize and manage dynamic resources.
- **Memory:** Managed memory availability now respects `memory.enableManagedAutoMemory` ([#6941](https://github.com/QwenLM/qwen-code/pull/6941)) — fixes a #11022 regression where disabled hosts were still seeing remember/dream requests.

### SDK TypeScript v0.1.9 / v0.1.10
- Bundles CLI 0.23.0 → 0.23.1 respectively; ships from the same source ref as the CLI. Same memory-setting improvement flows through.

---

## 3. Hot Issues

1. **[#8662](https://github.com/QwenLM/qwen-code/issues/8662) — Migrate TUI rendering layer from ink to OpenTUI** *(P3, OPEN, 33 comments)*
   The single most-discussed item. The current stack relies on a ~1037-line patch over ink 7 + React 19 plus a custom Virtual Viewport, producing flicker, layout drift, and rendering limits that are hard to fix in place. This tracking issue is the canonical place to follow the migration roadmap.

2. **[#11119](https://github.com/QwenLM/qwen-code/issues/11119) — `qwen serve` background shell output silently dropped on session runtime recycle** *(P1, OPEN, 10 comments)*
   A long-running background `run_shell_command` keeps producing output, but wake notifications and stdout never reach the Web Shell after the originating turn ends. Wedging the session is the worst-case failure mode here; needs a fix in the daemon-side runtime-recycle path.

3. **[#10530](https://github.com/QwenLM/qwen-code/issues/10530) — `400 Failed to initialize samplers` in 0.22.3** *(P2, CLOSED, 7 comments)*
   `Qwen 3.8 27b` and `Qwen 3.6 35b` via llama-server started failing with `failed to parse grammar` after 0.22.3; `gemma4-12b` unaffected. Triangulated with #10435.

4. **[#10435](https://github.com/QwenLM/qwen-code/issues/10435) — Same sampler-init regression on local llama-server** *(P2, CLOSED, 6 comments, 👍1)*
   Independent confirmation that grammar handling regressed between releases. Both #10530 and #10435 closed together suggest the fix shipped in v0.23.x.

5. **[#11328](https://github.com/QwenLM/qwen-code/issues/11328) — Follow-ups to provider-configured reasoning** *(P2, OPEN, blocked, 4 comments)*
   After PR #10999 shipped the deepseek-v4-pro declarative foundation, valid edge cases were deferred to keep under the 1k-line PR cap. Signals continued investment in provider-aware reasoning.

6. **[#8887](https://github.com/QwenLM/qwen-code/issues/8887) — WebShell planned SSE reconnect shows alarming banner** *(P3, CLOSED, 4 comments)*
   Even planned reconnects showed a red "Connection lost / 重新连接" chip in every session — a UX bug fixed in Web Shell.

7. **[#11410](https://github.com/QwenLM/qwen-code/issues/11410) — v0.23.1 API Error 400 on local models after Windows 11 update** *(P1, CLOSED, 4 comments)*
   LM Studio integration broke after a Windows update; closed likely via follow-up release. Tracks the broader fragility of local-provider compatibility.

8. **[#11465](https://github.com/QwenLM/qwen-code/issues/11465) — Web-shell visuals nondeterministic (1.31% diff → 0% on rerun)** *(P3, OPEN, 4 comments)*
   The `session-workflow-cockpit-light` preview rendered with non-deterministic pixel diffs across identical commits. A potential CI blocker for visual baselines.

9. **[#11358](https://github.com/QwenLM/qwen-code/issues/11358) — Support hosting a custom Web Shell distribution from `qwen serve`** *(P3, OPEN, 4 comments)*
   Integrators want to ship their own frontend against the daemon. A clear productization signal: `qwen serve` is becoming a platform, not just a UI host.

10. **[#11205](https://github.com/QwenLM/qwen-code/issues/11205) — Six hardenings lost when filter screen merged to main** *(P2, OPEN, 4 comments)*
    #10421's filter work was written against a richer screen; #9742 landed a screen for the same function on `main`, and the PR adopted it verbatim — losing read-order, EACCES, U+FFFD, spawn-timeout, candidate-cap, and retention hardening. A merge-policy/review-process smell.

Honorable mentions: [#11274](https://github.com/QwenLM/qwen-code/issues/11274) (decouple Skill management from ACP child, multi-PR plan), [#11359](https://github.com/QwenLM/qwen-code/issues/11359) + [#11427](https://github.com/QwenLM/qwen-code/issues/11427) (daemon REST/SSE docs for integrators), [#11448](https://github.com/QwenLM/qwen-code/issues/11448) (`ask_user_question` card lost across re-open).

---

## 4. Key PR Progress

1. **[#11468](https://github.com/QwenLM/qwen-code/pull/11468) — `fix(bridge)`: keep pending permission/question across refreshed session loads** *(review/self-reported)*
   Sessions parked on `ask_user_question` or a permission prompt now re-present the interactive card when a client re-opens them, instead of just replaying the persisted transcript. Directly closes the #11448-class bug.

2. **[#10906](https://github.com/QwenLM/qwen-code/pull/10906) — `feat(web-shell)`: show shell and monitor task output** *(autofix/takeover)*
   Persists Monitor stdout/stderr alongside Shell capture, and exposes a daemon endpoint scoped to live session owners for a sanitized tail. Big step for the Web Shell task-detail panel.

3. **[#11371](https://github.com/QwenLM/qwen-code/pull/11371) — `chore`: Playwright version parity + close deferred #11336 follow-ups** *(review/self-reported)*
   Pins Web Shell's `@playwright/test` to the root version, removing a known footgun. Work that was parked under #11101's "Critical-fixes-only" round-6 rule.

4. **[#11472](https://github.com/QwenLM/qwen-code/pull/11472) — `fix(serve)`: restore configured channels after restart** *(OPEN)*
   When `qwen serve` starts without an explicit channel, the workspace-configured startup channels are restored; explicit selection still wins. Closes a UX gap between the channel management UI and the daemon.

5. **[#11469](https://github.com/QwenLM/qwen-code/pull/11469) — `chore(release)`: v0.23.2** *(skip-changelog)*
   Automated release PR — the one that just landed.

6. **[#11206](https://github.com/QwenLM/qwen-code/pull/11206) — `feat(mesh)`: persistent shared-thread agent collaboration** *(OPEN)*
   Workspace-resident Agent identities that own shared threads: assign work, interject mid-run, attribute results, cancel, resolve blockers, mark reviewed. The most architecturally ambitious PR this cycle.

7. **[#11463](https://github.com/QwenLM/qwen-code/pull/11463) — `feat(sessions)`: record `kind` on session registration** *(OPEN)*
   Registry now carries `tui | headless | serve | external`. The first three non-TUI kinds are reserved for registrants that don't exist yet — scaffolding for future channel/SDK surfaces.

8. **[#10347](https://github.com/QwenLM/qwen-code/pull/10347) — `feat(core)`: auto-retry transient network errors (EOF)** *(review/self-reported, autofix/needs-human)*
   Reclassifies `400 network error ... EOF` as retryable transport rather than fail-fast client error. Critical in non-interactive channels where Ctrl+Y is unavailable.

9. **[#11163](https://github.com/QwenLM/qwen-code/pull/11163) — `feat(web-shell)`: manage git remotes from workspace branch picker** *(autofix/takeover)*
   Adds a "Manage Remotes" panel behind a two-click confirm — closes a real gap in the sidebar's git surface.

10. **[#11238](https://github.com/QwenLM/qwen-code/pull/11238) — `feat(web-shell)`: improve session overview navigation and details** *(autofix/takeover)*
    Sessions now show workspace/branch/PR under the title with distinct states, status filters, branch/PR search, and compact icons. A direct response to the "sessions panel is hard to scan" feedback.

Honorable mentions: [#10938](https://github.com/QwenLM/qwen-code/pull/10938) (Session Workflow navigability + DAG cleanup), [#11395](https://github.com/QwenLM/qwen-code/pull/11395) (preserve caller-owned mode after ACP reap), [#11470](https://github.com/QwenLM/qwen-code/pull/11470) (hide sidebar version label at compact breakpoint, closes #11453), [#11458](https://github.com/QwenLM/qwen-code/pull/11458) (drop legacy Stop-hook Goal routing).

---

## 5. Hot Discussions

_No GitHub Discussions data was provided in this digest window — section omitted._

---

## 6. Feature Request Trends

Distilled across all open issues and PRs:

- **Daemon-as-platform** — the most consistent request cluster. [#11358](https://github.com/QwenLM/qwen-code/issues/11358) (host custom Web Shell), [#11357](https://github.com/QwenLM/qwen-code/issues/11357) (config-driven branding), [#11359](https://github.com/QwenLM/qwen-code/issues/11359) + [#11427](https://github.com/QwenLM/qwen-code/issues/11427) (integrator REST/SSE docs) and [#

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*