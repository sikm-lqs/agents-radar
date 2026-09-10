# AI CLI Tools Community Digest 2026-09-10

> Generated: 2026-09-10 11:30 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report: AI CLI Coding Agents — 2026-09-10

## 1. Ecosystem Overview

The AI CLI tooling landscape has decisively shifted from "chat wrapper" to **agentic workbench**: across all seven communities, the dominant themes are long-running agent control, session durability, MCP integration, and permission governance rather than basic code generation. New frontier models landed nearly simultaneously today (GPT-6 Astra in Codex, `gemini-3.8-flash` as Gemini CLI default, DeepSeek V4.1 Flash in Pi), intensifying pressure on multi-provider catalog freshness. First-party tools (Claude Code, Codex, Gemini CLI, Copilot CLI) are converging on enterprise governance features, while provider-agnostic clients (OpenCode, Pi, Qwen Code) compete on configurability and model breadth. Reliability debt is clustering in predictable places: Windows, long sessions, and MCP/OAuth plumbing.

## 2. Activity Comparison

*Counts reflect items surfaced in today's digest (hot/updated), not repository totals. "N/A" = no data provided in the source feed for that channel — not evidence the channel is disabled or inactive.*

| Tool | Hot Issues | Active PRs | Discussions | Release Status (24h) |
|---|---|---|---|---|
| **Claude Code** | 10 (2 closed) | 3 (2 open, 1 merged) | N/A — none in feed | ✅ v2.1.267 |
| **OpenAI Codex** | 10 | 12 | 11 (5 Ideas / 3 Q&A / 3 Show & Tell) | ✅ rust-v0.154.0 + alpha |
| **Gemini CLI** | 10 | 10 | N/A — none in feed | Nightly bump only (no notable changes) |
| **GitHub Copilot CLI** | 10 (+4 same-day reports) | 1 | N/A — none in feed | ❌ None |
| **OpenCode** | 10 | 10 (+3 mentions) | N/A — none in feed | ❌ None (v1.18.x stable; 2.0 in flight) |
| **Pi** | 10 of 50 triaged | 12 touched (10 listed) | 2 (Show & Tell) | ❌ None |
| **Qwen Code** | 10 | 10 | 7 (5 Roadmap / 2 Q&A) | ✅ 5 releases (desktop v0.3.0, CLI nightly, TS SDK, cua-driver) |

**Read:** Codex, Pi, and Qwen Code show the highest engineering throughput; Copilot CLI is in a visibly low merge window with zero releases and a regression-heavy tracker; Claude Code shipped one strategically significant release despite low PR volume.

## 3. Shared Feature Directions

1. **Background-agent control & observability** — *All tools.* Claude Code users demand prompt/task queuing with explicit Codex-parity framing (#33323, 44👍); Codex ships agents-overview hygiene (#44433/#44424 archive/hide) while its top idea is remote control from mobile (190👍); Qwen Code is building persistent mesh collaboration threads (#11206); OpenCode added idle/turn-diff projections (#47821); community tools (agent-watch, isitdone, Usage HUD) fill gaps vendors haven't. Orchestrating non-interactive agents is now table stakes.
2. **Session durability, resume & rewind** — *Codex, Copilot CLI, Qwen, Pi, Gemini CLI, OpenCode.* Codex has a rollout-ordinal bug cluster freezing history on resume/fork (#43142, #43124, #42027); Copilot CLI's compaction OOM permanently corrupts sessions (#4780, #4699); Qwen lost user history on extension upgrade (#11489) and is evaluating SQLite session stores (#11433); Pi has data-loss windows (#9413, #9426). Undo/rewind is an explicit cross-tool benchmark — Codex users cite Claude Code and OpenCode parity (#9618, 129👍).
3. **MCP reliability & auth** — *Copilot CLI, OpenCode, Qwen, Gemini CLI, Codex.* Three independent OAuth callback bugs in Copilot CLI (#4795/#4796/#4800); OpenCode OAuth browser failure (#26195) and connect-timeout deadlocks (#46813); Qwen's Windows MCP cluster (#9693, #11460); Gemini CLI enforcing fail-closed policy (#29200); Codex bounding MCP descriptions out of Guardian budgets (#44493). MCP is universal — and universally flaky at the edges.
4. **Permission & effort governance** — *Claude Code, Codex, Gemini CLI, Copilot CLI, Pi.* Claude Code's cross-provider `maxEffortLevel` cap, Codex's Guardian + allow-list requests (#31929), Gemini CLI's sandbox/policy hardening wave, Copilot CLI permission-lifetime complaints (#4764), and Pi's community-built `pi-verdict` gate all point to enterprises demanding formal, auditable control planes.
5. **Quota/usage transparency** — *Codex, Claude Code, OpenCode.* Codex meta-issue #41220 (33 comments), weekly-reset drift (#44443), Claude Code Team-tier meter miscounts (#85682) and the 138👍 Max-20x-for-Teams ask (#47509), and OpenCode plan-limit documentation gaps (#48266). Subscription metering opacity is an ecosystem-wide trust problem.
6. **Configurability over hardcoded limits** — *OpenCode, Codex, Pi, Gemini CLI.* Retry policy (#43596), webfetch size (#46812), MCP timeouts (#46813) in OpenCode; recap opt-out in Codex (#41622, 60👍); compaction budgets in Pi (#9415); Gemini CLI fixed silent model-swap overrides (#29266).

## 4. Differentiation Analysis

- **Claude Code** — Most enterprise-forward: cross-provider effort governance, plugin/mod ecosystem foundations (`sec-default`, telemetry, VCS-pluggable diff backend). Community pressure is commercial (Team-tier ceilings), not technical capability.
- **OpenAI Codex** — Highest ship velocity and strongest ideas community (190👍/129👍 discussions). Differentiators: Guardian review layer, worktree sessions, multi-surface (CLI/desktop/IDE). Weakness: Windows is demonstrably under-tested, and quota accounting is opaque.
- **Gemini CLI** — Today was a security-hardening day: path-traversal, prompt-injection, and sandbox-boundary PRs, plus strategic bets on AST-aware codebase navigation (#22745) and zero-dependency OS sandboxing (#19873). Targets efficiency (token/turn reduction) more than surface area.
- **GitHub Copilot CLI** — GitHub-native enterprise entry point, but currently carrying first-order stability debt (embedded-Node SEA OOM cluster, no `NODE_OPTIONS` escape hatch) and a prerelease memory subsystem (#4535). Theming accessibility (#135) remains its top-engagement issue.
- **OpenCode** — The provider-agnostic hub: OpenRouter suffix routing, xAI WebSockets, custom gateways, Bedrock. Philosophy is "make every magic number configurable." Mid-transition to 2.0 with cross-client session-sync gaps (#45011) and a 72 GB storage regression (#47022).
- **Pi** — Minimal core + maximal extension API; strongest community triage culture (50 issues/12 PRs touched in one day). Serves long-tail and local/relay model users (DeepSeek, Bedrock, llama-server) that first-party tools underserve.
- **Qwen Code** — Broadest surface ambition: desktop consolidation toward Web Shell/Tauri, Playwright Browser SDK, voice as a global layer (#10118), and mesh agent collaboration — 5 releases in one day. The cost is quality debt concentrated in Windows and session migrations.

## 5. Community Momentum & Maturity

- **Fastest iterating:** Codex (12 PRs + stable release + alpha), Pi (12 PRs + heavy triage, all-discipline contributor base), Qwen Code (5 releases across four artifact types).
- **Most mature signals:** Claude Code and Codex exhibit *second-order* product work — governance knobs, UI hygiene, plugin ecosystems — rather than core-functionality fixes. Claude Code's #47509 (138👍) shows a monetized, invested user base.
- **Solid and steady:** Gemini CLI's security-focused PR wave suggests disciplined engineering cadence even on a no-release day.
- **Under strain:** Copilot CLI — 1 PR, no release, and four overlapping OOM/data-loss bugs with no recovery path; its digest explicitly flags a "low-volume merge window."
- **Caveat:** Missing Discussions data for four repos limits engagement comparison; where available, Codex's discussion vote counts (190/129👍) substantially exceed issue-vote engagement elsewhere.

## 6. Trend Signals

1. **The battleground has moved to orchestration.** Queuing, background-agent lifecycle, HUDs, and archive/hide affordances across every tool signal that non-interactive, long-horizon agents are now the primary workflow — vendors should treat agent-state UI as core product, not accessory.
2. **Agent self-reporting cannot be trusted yet.** Gemini subagents claiming success after MAX_TURNS (#22323), Claude Code "ghost edits," Pi dropping `isError`, Copilot CLI silent permission degradation — expect demand for verification layers, exit-code discipline, and post-hoc validation hooks (cf. community tool `isitdone`).
3. **Windows is the ecosystem-wide blind spot.** Four of seven tools had same-day P1 Windows regressions (Claude #92984, Qwen #11303, Copilot #3700, Codex's #25271 cluster). First-class Windows CI and ConPTY/Plan9 expertise are a genuine differentiator for tool selection.
4. **Governance features are procurement gates.** Effort caps, allow-lists, fail-closed MCP policy, and sandbox hardening appearing simultaneously across independent roadmaps indicate enterprise compliance requirements are now shaping CLI design.
5. **Model churn rewards provider-agnostic clients.** Same-day Astra rollout asymmetries (missing on Windows Pro), catalog drift (gpt-5.4 removal), and per-provider regressions (Bedrock image replay) favor tools like OpenCode and Pi that normalize many providers — and push first-party tools toward faster, more uniform rollouts.
6. **Local state hygiene is the new technical debt.** 72 GB databases, unbounded `.qwen` growth, and unresumable sessions show desktop-class agents accumulating state without retention policy — session stores are becoming durable user assets requiring migration, versioning, and portability guarantees.

---
*Sources: community digests for anthropics/claude-code, openai/codex, google-gemini/gemini-cli, github/copilot-cli, anomalyco/opencode, earendil-works/pi, QwenLM/qwen-code — 2026-09-10.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
*Data snapshot: 2026-09-10 · Source: github.com/anthropics/skills*

---

## 1. Top Skills Ranking

The following PRs represent the most-discussed Skill activity in the repository, based on community attention, cross-linking with hot Issues, and breadth of engagement.

### 1.1 #1298 — Fix skill-creator `run_eval.py` (0% recall bug)
**Link:** https://github.com/anthropics/skills/pull/1298 · Status: **OPEN**
The headline pain point in the Skills ecosystem right now. The evaluation harness (`run_eval.py`), and by extension `run_loop.py` and `improve_description.py`, reports `recall=0%` for every skill description — meaning the description-optimization loop is optimizing against noise. This PR bundles 10+ reproductions of Issue #556 into a single comprehensive fix that installs the eval artifact as a real Skill, fixes Windows stream reading, trigger detection, and parallel workers. Closely tracked by [Issue #556](https://github.com/anthropics/skills/issues/556) (12 comments).

### 1.2 #514 — `document-typography` Skill (typographic QA)
**Link:** https://github.com/anthropics/skills/pull/514 · Status: **OPEN**
A new Skill that prevents common typographic regressions in AI-generated documents — orphan word wrap, widow headers, and numbering misalignment. Affects every document Claude produces, framing typography as a default expectation rather than an opt-in. Strong "universal applicability" pitch.

### 1.3 #1615 — `scnet-hpc` Skill (HPC cluster operations)
**Link:** https://github.com/anthropics/skills/pull/1615 · Status: **OPEN**
Profile-based SSH and Slurm workflows for SCNet HPC clusters. Covers partition/memory/accelerator selection, job generation, cluster discovery, and compute-node refresh. Represents the niche-but-deep pattern: one Skill per specialized operational domain.

### 1.4 #83 — `skill-quality-analyzer` & `skill-security-analyzer` (meta-Skills)
**Link:** https://github.com/anthropics/skills/pull/83 · Status: **OPEN**
Two meta-Skills proposed for the `example-skills` collection: one evaluates Skill quality across five dimensions (structure, examples, resources, etc.), the other audits security posture. Reflects the community's push toward **Skills that audit other Skills** — a self-policing layer for the marketplace.

### 1.5 #1628 — `Hivemind`: Zero-Cost Multi-Agent Orchestration
**Link:** https://github.com/anthropics/skills/pull/1628 · Status: **OPEN**
Delegates mechanical sub-tasks to headless [opencode](https://opencode.ai) workers on free models, while Claude Code retains planner/reviewer/merger role. The thesis: *"expensive-model context is the scarce resource, not its intelligence."* A blueprint for cost-aware agent orchestration Skills.

### 1.6 #486 — `odt` Skill (OpenDocument creation & parsing)
**Link:** https://github.com/anthropics/skills/pull/486 · Status: **OPEN**
Creates, fills, reads, and converts `.odt`/`.ods` files. Closes a long-standing gap in the open-source document format story — DOCX and PDF are covered; ODF/ODT was the missing piece for ISO-standard open workflows.

### 1.7 #1367 — `self-audit` Skill (mechanical + 4-dim reasoning QA, v1.3.0)
**Link:** https://github.com/anthropics/skills/pull/1367 · Status: **OPEN**
A universal pre-delivery audit pipeline: Step 0 mechanically verifies every claimed file exists; subsequent steps audit reasoning in damage-severity priority order. Stack-agnostic, model-agnostic. Paired with [Issue #1385](https://github.com/anthropics/skills/issues/1385) proposing a three-gate reasoning quality pipeline.

### 1.8 #538 / #539 / #541 — Correctness fixes to PDF/DOCX/SKILL frontmatter
- https://github.com/anthropics/skills/pull/538 — PDF: case-sensitive file reference fixes
- https://github.com/anthropics/skills/pull/539 — skill-creator: YAML unquoted-description validator
- https://github.com/anthropics/skills/pull/541 — DOCX: `w:id` collision with bookmarks (data-corruption fix)

All **OPEN**. Authored by Lubrsy706, this cluster of fixes addresses silent breakage in core Skills — broken file paths on case-sensitive filesystems, silent YAML parse failures, and document corruption when tracked changes meet existing bookmarks.

---

## 2. Community Demand Trends

Distilling the most-discussed Issues, five demand vectors dominate:

### 2.1 Trust & Security Boundaries (highest-volume Issue)
[Issue #492](https://github.com/anthropics/skills/issues/492) — **43 comments**. Community Skills distributed under the `anthropic/` namespace enable impersonation of official Skills, creating a trust-boundary vulnerability. The community is asking for an explicit separation between first-party and contributed Skills, plus a verification mechanism.

### 2.2 Distribution & Sharing
[Issue #228](https://github.com/anthropics/skills/issues/228) — **16 comments**. Enterprise users want org-wide Skill libraries and direct share-links, replacing the current "download .skill → Slack it → manual upload" workflow. Clear demand for a first-party Skill marketplace/distribution layer.

### 2.3 Skill-Creator Tooling Quality
A cluster of high-comment Issues: [#556](https://github.com/anthropics/skills/issues/556) (12 comments, 0% trigger rate), [#202](https://github.com/anthropics/skills/issues/202) (8 comments, "reads like dev docs not an operational Skill"), [#1390](https://github.com/anthropics/skills/issues/1390) (4 comments, evaluation scores 0/N). The meta-tooling for **creating and evaluating Skills** is widely viewed as broken or sub-best-practice.

### 2.4 Context-Window Discipline & Skill Proliferation
[Issue #1487](https://github.com/anthropics/skills/issues/1487) — `claude-api` Skill eagerly injects ~156k tokens and exhausts context in one call. [Issue #189](https://github.com/anthropics/skills/issues/189) — `document-skills` and `example-skills` install **identical Skills**, causing duplicates. As the catalog grows, context-economy and de-duplication have become first-order concerns.

### 2.5 Platform/Interoperability Gaps
[Issue #29](https://github.com/anthropics/skills/issues/29) (AWS Bedrock support), [Issue #16](https://github.com/anthropics/skills/issues/16) (expose Skills as MCPs), [Issue #1362](https://github.com/anthropics/skills/issues/1362) (pnpm ≥10.1 breaks web-artifacts-builder). Demand for Skills to live across runtimes (Bedrock, Cursor, Codex, MCP) is rising sharply.

---

## 3. High-Potential Pending Skills

PRs that are active-comment, not yet merged, and likely to land soon — these define the **near-term surface area** of the marketplace:

| PR | Skill | Why it's high-potential | Status |
|---|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator eval fix | Unblocks the entire description-optimization workflow; 10+ reproductions cited | OPEN |
| [#1615](https://github.com/anthropics/skills/pull/1615) | `scnet-hpc` | Targeted HPC niche; profile-driven design pattern | OPEN |
| [#1628](https://github.com/anthropics/skills/pull/1628) | `Hivemind` | Cost-aware multi-agent orchestration; strong thesis | OPEN |
| [#1627](https://github.com/anthropics/skills/pull/1627) | `buffer-api` | First portable Agent Skill for social scheduling; cross-agent (Claude/Cursor/Codex/n8n) | OPEN |
| [#1367](https://github.com/anthropics/skills/pull/1367) | `self-audit` | Universal QA gate; pairs with Issue #1385 proposal | OPEN |
| [#83](https://github.com/anthropics/skills/pull/83) | `skill-quality-analyzer` / `skill-security-analyzer` | Meta-Skills that audit the marketplace itself | OPEN |
| [#1734](https://github.com/anthropics/skills/pull/1734) | DOCX orphaned-comment detection | Addresses real-world docx corruption edge case | OPEN |
| [#1742](https://github.com/anthropics/skills/pull/1742) | mcp-builder: `mcp>=2` compatibility | Required upgrade; fixes the renamed `streamable_http_client` import | OPEN |

---

## 4. Skills Ecosystem Insight

> **The community's most concentrated demand at the Skills level is a trustworthy, self-policing infrastructure layer — fix the broken Skill-creation/evaluation tooling, establish clear first-party vs. community trust boundaries, and ship meta-Skills that audit quality and security across the marketplace — before further domain-specific Skills can be adopted with confidence.**

---

*Report generated from 50 PRs and 50 Issues in anthropics/skills as of 2026-09-10. PR comment counts were not available at snapshot time; ranking is therefore based on cross-Issue attention, reproduction breadth, and ecosystem impact.*

---

# Claude Code Community Digest — 2026-09-10

## Today's Highlights

The v2.1.267 release introduces **`maxEffortLevel`**, a cross-provider cap that works across Bedrock, Vertex, and Foundry — a notable step toward consistent effort governance for enterprise deployments. A high-impact **Windows Cowork regression** (Plan9 mounts failing after KB5124008) is generating heavy discussion, while a long-standing **Team-plan power-user request** for a Max 20x tier is now the most upvoted open issue in the corpus.

---

## Releases

### v2.1.267
- **`maxEffortLevel` setting** — Now configurable top-level or per model under `modelSettings`. Caps effort level on every provider (Bedrock, Vertex, Foundry) while still allowing users to dial down manually. Useful for orgs that need hard ceilings.
- **`--system-prompt-snapshot off`** — Re-renders the system prompt fresh on every request, useful for debugging or when prompt caching behavior is unwanted.

🔗 [Release notes](https://github.com/anthropics/claude-code)

---

## Hot Issues

1. **[#92984 — Cowork (Windows): all Plan9 shares fail after KB5124008](https://github.com/anthropics/claude-code/issues/92984)** · 56 comments, 25 👍
   A Windows update breaks every Plan9 mount in Cowork; uninstalling the KB restores function. With 56 comments in <24h it's the fastest-moving thread of the day — likely to drive an urgent patch.

2. **[#47509 — Team plan needs a Max 20x equivalent tier](https://github.com/anthropics/claude-code/issues/47509)** · 138 👍
   The highest-upvoted issue in this batch. Senior devs and team leads say the current 6.25x Premium ceiling is too low for sustained agentic workflows; they want a Team-side equivalent of individual Max 20x.

3. **[#69044 — Recurring errors documented over months of daily use](https://github.com/anthropics/claude-code/issues/69044)** · 39 comments
   A structured, long-running feedback dump covering patterns observed in daily Claude Code usage. Less a bug report than a meta-aggregation — useful signal for prioritizing reliability work.

4. **[#33323 — Task queue for queuing multiple prompts/tasks](https://github.com/anthropics/claude-code/issues/33323)** · 44 👍
   Users want to submit the next 3–5 instructions while a turn is still running. Codex CLI already has this; pressure on Anthropic to ship parity is mounting.

5. **[#20324 — VSCode extension leaves locked tab groups](https://github.com/anthropics/claude-code/issues/20324)** · 19 comments · *CLOSED*
   Resolved: opening Claude tabs in VSCode/Cursor no longer orphans other files in locked panels. The fix adds an explicit Auto-open API parity with sibling extensions.

6. **[#77697 — macOS Keychain writes credential without trusted-application list](https://github.com/anthropics/claude-code/issues/77697)** · 9 👍
   OAuth creds re-prompt the user on every read because the keychain ACL is too narrow. Real friction for daily users; security/UX correctness concern.

7. **[#88864 — Qemu/KVM hangs on x86 with KVM, crashes on x86-only](https://github.com/anthropics/claude-code/issues/88864)** · 2 comments
   Reproduces cleanly across arm64 (OK), x86+KVM+AVX2 (OK), x86+KVM (hang), x86 (crash). Useful matrix for sandbox/VM users.

8. **[#87741 — X11 PRIMARY selection pastes twice in JetBrains terminal](https://github.com/anthropics/claude-code/issues/87741)** · 2 comments
   Middle-click paste duplicated inside JetBrains' integrated terminal on Linux/X11. Niche but reproducible.

9. **[#92598 — Linux .deb Recommends non-existent `kwalletd6`](https://github.com/anthropics/claude-code/issues/92598)** · *CLOSED (invalid)*
   A packaging bug that pulled `gnome-keyring` onto KDE installs. Worth flagging to package maintainers even though closed.

10. **[#80834 — Background Bash notification copy is misleading for orphanable subagents](https://github.com/anthropics/claude-code/issues/80834)** · 3 comments · *CLOSED*
    The string "you will be notified when it completes" can cause subagents to be silently orphaned, while proper agent-children resume the parent correctly. Documentation/copy asymmetry flagged.

---

## Key PR Progress

1. **[#93244 — mods: API renames, telemetry fixes, and a diff backend seam](https://github.com/anthropics/claude-code/pull/93244)** · OPEN
   Follows the plugin-API naming pass (`isFocused`, `tool`), hardens telemetry (no third-party provider leaks), and introduces a git-backed diff mod backend so VCSes other than git can plug in later.

2. **[#89404 — `validate-agent.sh`: don't abort at the first warning](https://github.com/anthropics/claude-code/pull/89404)** · OPEN
   Three `set -euo pipefail` interactions were producing false positives on valid plugin-dev agents; bumps count-up counters and lets the script reach a real verdict.

3. **[#93215 — Add mods: sec-default, diff and telemetry](https://github.com/anthropics/claude-code/pull/93215)** · *CLOSED*
   Landed: three built-in hook-module plugins — `sec-default` (org-wide outermost plugin), `diff` (`/diff`), and `telemetry` (`$.telemetry`). Foundation for the mod ecosystem.

---

## Hot Discussions

*No discussion data was provided in the source feed for this period.*

---

## Feature Request Trends

- **Task / prompt queuing** — The single most-requested UX upgrade this cycle (#33323, 44 👍). Users on long agentic runs want to line up follow-up instructions the way Codex CLI already permits.
- **Higher Team-plan usage tiers** — A Max 20x-class multiplier for power users on shared plans (#47509, 138 👍) is now the most-upvoted open ask overall.
- **Cleaner permission-mode introspection** — Sessions need a programmatic way to read their own effective mode (related: #85699) rather than relying on the status bar or stamping peer messages.
- **VCS-pluggable diff backend** — Recent mod work (#93244) hints at a future where non-git backends can register a diff provider.

---

## Developer Pain Points

- **Platform-specific regressions still hit hardest**: Windows update interactions (#92984), macOS Keychain UX (#77697), and JetBrains/X11 paste (#87741) are all moving in the last 24h.
- **Edit/Write transparency gaps**: Several reports describe the harness claiming success while on-disk state diverges (#85700, ghost edits; #74636, spurious "file modified" reminders). Trust in tool-result fidelity is the recurring concern.
- **Cost/usage meter confusion**: The 5-hour session meter visibly miscounts on Team plans for some Asia-region users (#85682), amplifying the Tier-mismatch pain point in #47509.
- **Self-address & permission ambiguity in agent communication**: Self-send via `SendMessage` succeeds silently (#85690), and sessions can't introspect their own mode (#85699) — both are subtle correctness issues for multi-agent workflows.
- **Networking/updater quirks in restricted networks**: c-ares vs system resolver on split-DNS VPNs (#71699), and DNS retry amplification when Datadog telemetry is blocked (#85707) keep surfacing — relevant for enterprise rollouts.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-10

## Today's Highlights
The headline release of `rust-v0.154.0` brings **GPT-6 Astra** to the Codex model picker and Amazon Bedrock catalogs, alongside **experimental worktree support** (`--worktree` / `/worktree`) for isolated session checkouts. Behind the scenes, a wave of reliability fixes landed across the agent overview (archive/delete/hide shortcuts, Guardian retries, MCP description scoping), but community attention remains fixed on persistent **Windows desktop regressions** (computer use, browser control, app-launch failures) and a **cross-report Meta issue** tracking quota depletion anomalies.

## Releases
- **rust-v0.154.0** ([#42879](https://github.com/openai/codex/issues/42879), [#42619](https://github.com/openai/codex/issues/42619), [#42652](https://github.com/openai/codex/issues/42652), [#43069](https://github.com/openai/codex/issues/43069), [#43120](https://github.com/openai/codex/issues/43120)): Adds **GPT-6 Astra** to the model picker and Bedrock catalog; introduces experimental **worktree sessions** that can be created, browsed, and resumed.
- **rust-v0.154.0-alpha.6.1**: Pre-release cut of the 0.154 line.

## Hot Issues
1. **[#25271](https://github.com/openai/codex/issues/25271)** — *Computer Use cannot determine Chrome URL on Windows* (37 comments, 9 👍). Long-standing blocker for Windows browser automation, affecting even `chrome://newtab/`.
2. **[#41220](https://github.com/openai/codex/issues/41220)** — *Meta: Abnormal Codex usage / quota depletion* (33 comments, 13 👍). Cross-report tracker aggregating complaints of unexplained quota burn and inconsistent usage accounting.
3. **[#42853](https://github.com/openai/codex/issues/42853)** — *GPT-6 Astra missing from model picker on Windows for Pro accounts* (19 comments, 4 👍). Direct fallout from today's Astra rollout; Pro subscribers on Windows don't see the new model.
4. **[#43142](https://github.com/openai/codex/issues/43142)** — *Resume reuses rollout ordinals, freezing desktop history* (18 comments). Pattern of **rollout-ordinal bugs** is now appearing across macOS and Windows.
5. **[#40902](https://github.com/openai/codex/issues/40902)** — *Java NIO Selector.open fails on Windows 26.820.60940* (15 comments, 3 👍). Loopback connection regression in the latest Windows desktop build.
6. **[#41622](https://github.com/openai/codex/issues/41622)** — *Disable automatic conversation recaps* (14 comments, **60 👍**). Most-upvoted enhancement this cycle: power users want a `config.toml` knob to turn off recaps.
7. **[#43124](https://github.com/openai/codex/issues/43124)** — *macOS desktop history freezes at older turns* (12 comments). Same family of projection/ordinal bugs as #43142, on Apple Silicon.
8. **[#42027](https://github.com/openai/codex/issues/42027)** — *Side chat fork fails after interrupted turn* (11 comments). Forked threads break history projection on Windows.
9. **[#41520](https://github.com/openai/codex/issues/41520)** — *Cannot use gpt-reserve* (11 comments, 3 👍). Reserve-model access reportedly broken on Plus tier.
10. **[#14162](https://github.com/openai/codex/issues/14162)** — *Stale / orphaned thread entries on macOS* (8 comments). Months-old issue still seeing active reports — a thread-state hygiene problem.

## Key PR Progress
1. **[#44493](https://github.com/openai/codex/pull/44493)** — *Bound MCP descriptions separately from Guardian action JSON*. Moves `tool_description` / `connector_description` to optional metadata so they don't consume Guardian review input budget.
2. **[#44492](https://github.com/openai/codex/pull/44492)** — *Distinguish HTTP quota errors from rate limits*. Maps `insufficient_quota`, `credit_balance`, and usage-limit codes to usage-limit errors rather than retry-limit errors.
3. **[#44489](https://github.com/openai/codex/pull/44489)** — *Reset cached WebSocket state when auth ownership changes*. Prevents Responses WebSocket reuse across account switches.
4. **[#44487](https://github.com/openai/codex/pull/44487)** — *Preserve incoming prompts when pre-turn compaction fails*. Avoids lost user input on compaction failure.
5. **[#44482](https://github.com/openai/codex/pull/44482)** — *Improve Guardian retries and review failure reporting*. Retries transient rate-limit / exhausted-stream errors; stops reporting high-risk on no-result.
6. **[#44472](https://github.com/openai/codex/pull/44472)** — *Harden Code Mode tool-call completeness tracking*. Fixes reuse/ambiguity bugs in tool-call completion state across cells.
7. **[#44433](https://github.com/openai/codex/pull/44433)** — *Archive and delete actions in agents overview*. New `Ctrl+E` (archive) and `Delete` shortcuts; exposes `agents.archive` / `agents.delete`.
8. **[#44424](https://github.com/openai/codex/pull/44424)** — *Hide shortcut in agents overview*. `Ctrl+W` hides a task without stopping it; persists across refreshes; `agents.hide` exposed in keymap config.
9. **[#31644](https://github.com/openai/codex/pull/31644)** — *Linux sandbox: route DNS through managed proxy*. Opt-in `enable_dns` setting; native DNS clients don't honor proxy vars, so a DNS adapter is added inside the bubblewrap namespace.
10. **[#44400](https://github.com/openai/codex/pull/44400)** — *Start Python SDK turn subscriptions at attachment point*. Events are now delivered from the moment of attachment, including pre-response events.
11. **[#44392](https://github.com/openai/codex/pull/44392)** — *Opt-in model discovery for OpenAI API keys*. New default-off `api_key_model_discovery` feature surfaces API-key model metadata.
12. **[#44349](https://github.com/openai/codex/pull/44349)** — *Distinguish forked sessions in session-start hooks*. Adds `fork` and `resume` to `SessionSource` so startup hooks don't re-run on inherited context.

## Hot Discussions

### Ideas
- **[#9200](https://github.com/openai/codex/discussions/9200)** — *Remote control Codex from the ChatGPT app* (46 comments, **190 👍**). The most-upvoted idea on the board; users want first-party mobile/remote control instead of Tailscale + SSH workarounds.
- **[#9618](https://github.com/openai/codex/discussions/9618)** — *Where is /rewind or /revert?* (23 comments, **129 👍**). Strong demand for undo/rewind parity with OpenCode and Claude Code.
- **[#12567](https://github.com/openai/codex/discussions/12567)** — *Memories in Codex* (36 comments). Maintainer-authored; gauging how aggressively Codex should cite prior threads when using memory.
- **[#44421](https://github.com/openai/codex/discussions/44421)** — *Persistent lightweight chat with Codex mascot during long tasks*. A side-channel UI when the main thread is busy.
- **[#44419](https://github.com/openai/codex/discussions/44419)** — *VS Code Codex history pagination beyond 50 sessions*. Older local sessions exist but can't be opened from the extension.

### Q&A
- **[#40385](https://github.com/openai/codex/discussions/40385)** — *Windows → Connections → control other devices missing*. User regression on Remote Connections UI.
- **[#43257](https://github.com/openai/codex/discussions/43257)** — *How does experimental context management count history lookups against usage?*. Pricing/usage opacity is now a recurring theme.
- **[#42503](https://github.com/openai/codex/discussions/42503)** — *Any news on when Astra is coming to Codex?* — Effectively resolved by today's 0.154.0 release in the model picker.

### Show and Tell
- **[#42041](https://github.com/openai/codex/discussions/42041)** — *agent-watch*. Distinguishes DONE / FAILED / STALL for background `codex exec` runs.
- **[#44368](https://github.com/openai/codex/discussions/44368)** — *Usage HUD*. Native macOS menu-bar meter across Codex + Claude + Gemini + Grok + Ollama with confidence labels.
- **[#44153](https://github.com/openai/codex/discussions/44153)** — *isitdone*. A Stop hook that blocks completion until tests/typecheck/lint pass.

## Feature Request Trends
The community is consistently asking for:

1. **First-class undo / session rewind** — [#9618](https://github.com/openai/codex/discussions/9618) (129 👍) and related threads remain the most-requested capability gap.
2. **Mobile / ChatGPT-app remote control** — [#9200](https://github.com/openai/codex/discussions/9200) (190 👍) dominates the Ideas board.
3. **Cross-session memory with explicit citation** — [#12567](https://github.com/openai/codex/discussions/12567).
4. **Configurable recap and Worktree workflows** — opt-out recap ([#41622](https://github.com/openai/codex/issues/41622), 60 👍); isolated worktree sessions (now shipping as experimental).
5. **Agents overview hygiene** — archive/delete/hide, focus restoration on Esc, Right-arrow to open ([#44433](https://github.com/openai/codex/pull/44433), [#44424](https://github.com/openai/codex/pull/44424), [#44360](https://github.com/openai/codex/pull/44360), [#44344](https://github.com/openai/codex/pull/44344)).
6. **VS Code parity with Desktop** — pagination past 50 local sessions ([#44419](https://github.com/openai/codex/discussions/44419)).
7. **Persistent lightweight chat surface** for long-running tasks ([#44421](https://github.com/openai/codex/discussions/44421)).
8. **Allow-list on top of Full Access / danger-full-access** ([#31929](https://github.com/openai/codex/issues/31929)).
9. **Reader Mode with Read Aloud** ([#38834](https://github.com/openai/codex/discussions/38834)).
10. **Better quota / reset visibility** for Pro/Pro 20x subscribers ([#44443](https://github.com/openai/codex/issues/44443), [#41220](https://github.com/openai/codex/issues/41220)).

## Developer Pain Points
1. **Windows desktop regressions dominate the issue tracker.** Computer Use URL detection (#25271), Browser/Computer Use `nodeRepl.fetch request failed` (#44135, #44500), Java NIO loopback (#40902), app stuck on splash animation (#41015), second message hanging (#43366), Computer Use after trusted Node exit (#43373), `cua_node` runtime relocation breaking auto-update (#42412), and Modern Standby Job Object errors (#44503). Windows is clearly the under-tested path.
2. **Session-history projection is brittle.** A cluster of issues (#43142, #43124, #42027, #42241, #14162) shows that **rollout ordinals** go out of sync after resume/fork/interrupted turns, freezing desktop history on both macOS and Windows. Today's PRs target adjacent concerns, but the ordinal pipeline itself still appears unaddressed.
3. **Quota and usage accounting are opaque.** Meta issue #41220, weekly-reset drift (#44443), and contextual-management charging questions (#43257) all point to the same underlying complaint: developers cannot reconcile Codex usage with their token bill.
4. **Model-availability and access bugs.** GPT-6 Astra missing on Windows Pro (#42853), `gpt-reserve` unavailable for Plus (#41520), and the now-closed `gpt-5.5` not-found error (#44098) show that **rollouts lag across tiers and platforms**.
5. **CLI/TUI polish gaps.** Cursor jumps when Astra is selected in the TUI (#44444); auto-recap noise that power users want disabled (#41622).
6. **Cross-model / cross-machine orchestration is hard.** #37960 (coordinating local Claude and remote Codex) and multiple "build your own watcher/HUD" tools (#44368, #42041, #44153) indicate that reliable, observable background-agent orchestration is still a do-it-yourself affair.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-10

## 1. Today's Highlights
The community is heavily focused on **agent reliability and subagent behavior**, with high-engagement bugs around termination reporting, hanging generalist agents, and shell-command stalls dominating the issue tracker. On the security side, a wave of PRs is hardening path guards, MCP policy enforcement, sandbox boundaries, and prompt-injection defenses, while a notable model upgrade lands `gemini-3.8-flash` as the default flash model.

---

## 2. Releases
- **v0.61.0-nightly.20260910.ged2ac40df** — automated nightly bump. Diff vs. previous nightly is empty/no notable changes listed.
  → [Compare](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260909.ged2ac40df...v0.61.0-nightly.20260910.ged2ac40df)

---

## 3. Hot Issues

| # | Issue | Why it matters | Comments / 👍 |
|---|---|---|---|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent reports `status: "success"` / `GOAL` after hitting `MAX_TURNS` | Masks real interruption as success — dangerous for CI pipelines and debugging; correctness-of-execution issue. | 13 / 2 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent hangs indefinitely on simple folder creation | High community pain — 8 👍 signals strong agreement; blocks basic workflows. | 8 / 8 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | Zero-Dependency OS Sandboxing & Post-Execution Intent Routing | Strategic enhancement to leverage Gemini 3's native bash affinity without compromising security. | 9 / 1 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | EPIC: AST-aware file reads, search, and codebase mapping | Could significantly reduce token bloat and turn count for code navigation. | 7 / 1 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini does not autonomously use skills/sub-agents | Affects discoverability of custom configs — a UX/awareness gap. | 6 / 0 |
| [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) | Shell command hangs at "Waiting input" after completion | Reproducible, blocking; breaks interactive shell flows. | 4 / 3 |
| [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) | Deterministic redaction + reduce Auto Memory logging | Security/privacy improvement for the Auto Memory feature. | 5 / 0 |
| [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) | browser_agent: automatic session takeover & lock recovery | Resiliency fix for `BrowserManager` "fail-fast" UX with persistent sessions. | 4 / 0 |
| [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) | Agent should stop/discourage destructive behavior | Safety regression — `git reset --force` and similar patterns need guardrails. | 3 / 1 |
| [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | 400 error when >128 (or per OP, >400) tools enabled | Hard limit issue; needs smarter tool scoping instead of brute count. | 3 / 0 |

---

## 4. Key PR Progress

| # | PR | What it does |
|---|---|---|
| [#29249](https://github.com/google-gemini/gemini-cli/pull/29249) | **fix(core):** close sibling-prefix bypass in `get_internal_docs` path guard | Path-traversal fix — naive prefix match accepts sibling dirs starting with the docs dir name. **Security-critical.** |
| [#29200](https://github.com/google-gemini/gemini-cli/pull/29200) | **fix(core):** enforce MCP policy consistently at runtime | Aligns server-name matching (case-insensitive, trimmed); treats empty `mcp.allowed` as fail-closed; distinguishes omitted vs. explicit allowlist. |
| [#29250](https://github.com/google-gemini/gemini-cli/pull/29250) | **fix(core):** prevent indirect prompt injection via build file modifications & untrusted flags | Refactors `shell`, `edit`, `write_file` to validate workspace boundaries under restricted mode. **Security XL.** |
| [#29214](https://github.com/google-gemini/gemini-cli/pull/29214) | **fix(sandbox):** harden filesystem boundaries and isolate runtime state | Sanitized config mounts + realpath-based path sensitivity checks. |
| [#29172](https://github.com/google-gemini/gemini-cli/pull/29172) | **feat(core):** add `gemini-3.8-flash` as default flash model | Registers `gemini-3.5-flash-lite` → `3.8-flash` aliases; promotes 3.8-flash to default. |
| [#29166](https://github.com/google-gemini/gemini-cli/pull/29166) | **fix(extensions):** back up extension dir before update so rollback restores it | Existing rollback copied an empty temp dir back — actually a no-op; this fixes it. |
| [#29266](https://github.com/google-gemini/gemini-cli/pull/29266) | **fix(config):** prevent complexity routing from overriding manual model selection | Stops GCA from silently swapping a user-selected concrete model for 2.5 Flash. *(Closed)* |
| [#29093](https://github.com/google-gemini/gemini-cli/pull/29093) | **fix:** in-memory cache + subtree pruning in `getIgnoredPaths` | Big perf win for large repos with many gitignore rules. *(Closed)* |
| [#29094](https://github.com/google-gemini/gemini-cli/pull/29094) | **fix:** upgrade `simple-git` to 3.32.3 (CVE-2026-28292, CRITICAL) | Dependency security bump. *(Closed)* |
| [#29095](https://github.com/google-gemini/gemini-cli/pull/29095) | **fix:** upgrade `shell-quote` to 1.8.4 (CVE-2026-9277, CRITICAL) | Dependency security bump. *(Closed)* |

---

## 5. Hot Discussions
*No GitHub Discussions data was provided in the source — section omitted.*

---

## 6. Feature Request Trends
- **Smarter, surgical code reading** — AST-aware reads, "Tactful Extraction" (#19561), codebase mapping (#22746) to fight context bloat and turn waste.
- **Stronger sandboxing + execution intent** — OS-level zero-dep sandboxing (#19873), post-execution intent routing, and hard workspace-boundary validation (#29250, #29214).
- **Agent self-awareness & UX polish** — accurate CLI flags/hotkeys in agent guidance (#21432), subagent trajectory export via `/chat share` (#22598), bug reports that include subagent context (#21763).
- **Browser agent robustness** — session takeover / lock recovery (#22232), settings.json overrides (#22267), Wayland support (#21983).
- **Memory system quality** — invalid patch quarantine (#26523), retry fatigue (#26522), deterministic secret redaction (#26525).
- **Local subagent authoring** — symlink support (#20079), agent self-discovery (#21968), sprint-1 local subagent effort (#20195).

---

## 7. Developer Pain Points
- **Unreliable agent termination signals** — subagents report success even when they never completed (#22323); users can't trust `Termination Reason`.
- **Hangs and stalls** — generalist agent hangs on trivial ops (#21409, 8 👍); shells freeze after completion (#25166); interactive CLI prompts cause permanent stalls (#22465).
- **Token / turn inefficiency** — model dumps full files into context (#19561) and litters workspaces with throwaway tmp scripts (#23571).
- **Tool-count ceiling** — 400-error when too many tools registered; no automatic pruning or scoping (#24246).
- **Skills/subagent discoverability** — custom skills are essentially ignored unless explicitly invoked (#21968).
- **Security regressions** — path-prefix traversal in core tools (#29249), indirect prompt injection via build files (#29250), sandbox filesystem leakage (#29214), destructive git commands (#22672).
- **Session/memory hygiene** — `/compress` not persisted across resume (#21335); Auto Memory retries low-signal sessions indefinitely (#26522); 401 mid-session auth failures (#29275).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-10

## 1. Today's Highlights

The dominant signal across the issue tracker today is a **cluster of memory/stability regressions on long-running sessions** (issues #4686, #4725, #4699, #4780) — V8 heap exhaustion after 30+ minutes, libuv handle leaks in the embedded Node SEA, and compaction OOMs that permanently corrupt sessions. **MCP authentication is the second hot spot**, with three independent reports of OAuth/callback mismatches against Atlassian, Entra, and CIMD servers (#4795, #4796, #4800), plus a request for TLS-insecure bypass for self-hosted servers (#4801). Light/dark theme discoverability (#135, #3773, #4620) remains the highest-engagement paper-cut of the week.

## 2. Releases

No new releases in the last 24 hours.

## 3. Hot Issues

1. **[#135] Light theme doesn't work** — 12 comments / 👍12. The single highest-engagement issue on the repo. Affects v0.0.330; user prompt and selection highlight render with low contrast on light terminals. Long-lived but still unresolved → [github/copilot-cli#135](https://github.com/github/copilot-cli/issues/135)
2. **[#4535] `store_memory` fails in v1.0.81 prereleases with "Instance id is required"** — 8 comments. Context-memory subsystem regression in the prerelease channel, blocks the new memory tool end-to-end → [#4535](https://github.com/github/copilot-cli/issues/4535)
3. **[#4686] Node.js OOM crash after ~37 min — 31,965 leaked async libuv handles (SEA ignores `NODE_OPTIONS`)** — 3 comments. Reproducible on Linux EC2 with embedded Node v24.20.0; the SEA distribution cannot apply `NODE_OPTIONS` workarounds, so users have no escape hatch → [#4686](https://github.com/github/copilot-cli/issues/4686)
4. **[#4725] Frequent JavaScript heap out of memory** — 3 comments / 👍1. Same V8 OOM pattern as #4686 but on different platforms; crashes every few minutes at the 4 GB cap → [#4725](https://github.com/github/copilot-cli/issues/4725)
5. **[#3773] [theming-accessibility] Broken light theme** — 4 comments / 👍4. A second light-theme report with screenshots showing black-on-black prompt background; complements #135 → [#3773](https://github.com/github/copilot-cli/issues/3773)
6. **[#3700] [HIGH] 1.0.60 WSL2 regression: MainThread spins at ~215% CPU while idle, TUI output frozen** — 3 comments / 👍2. Marked regression of #2208; reproduces on every fresh session → [#3700](https://github.com/github/copilot-cli/issues/3700)
7. **[#4699] OOM crash on long `--resume` sessions; crash dumps written into cwd** — 2 comments / 👍5. Two issues in one: the OOM itself, and crash-reports polluting the user's working directory → [#4699](https://github.com/github/copilot-cli/issues/4699)
8. **[#4780] Session compaction OOMs and never completes, leaving the session permanently unresumable** — 1 comment / 👍3. Compaction enters a crash-loop, and `--resume` re-triggers it; effectively data loss → [#4780](https://github.com/github/copilot-cli/issues/4780)
9. **[#4764] Auto approval stops working after ~1 hour** — 3 comments. `/permissions assisted` silently degrades mid-session on v1.0.83, forcing a session restart → [#4764](https://github.com/github/copilot-cli/issues/4764)
10. **[#4755] Session wedges permanently when a queued-lane message lands at turn end** — 2 comments. Idle-finalization is suppressed, queue never drains, only `kill -9` recovers → [#4755](https://github.com/github/copilot-cli/issues/4755)

**Honorable mentions (new, same day):** [#4796](https://github.com/github/copilot-cli/issues/4796) (desktop 1.1.17 `COPILOT_ENTRA_AUTH_AUD` breaks MCP Entra sign-in while CLI works), [#4800](https://github.com/github/copilot-cli/issues/4800) (CIMD OAuth redirect-URI mismatch because CLI picks a random port), [#4801](https://github.com/github/copilot-cli/issues/4801) (rustls has no `--insecure` path for MCP HTTP), [#4609](https://github.com/github/copilot-cli/issues/4609) (Docker sandboxes silently bypass `/permissions` approval).

## 4. Key PR Progress

Only one PR was updated in the last 24 hours; not enough for a top-10. Flagging as a low-volume merge window.

1. **[#4786] Revise notice regarding third-party services** — *open*. Documentation/legal notice update clarifying access requirements and terms for third-party integrations. No review activity yet → [#4786](https://github.com/github/copilot-cli/pull/4786)

## 5. Hot Discussions

*No discussion data was provided for this digest window — section omitted.*

## 6. Feature Request Trends

Across the 30 most-active issues, the most-requested directions are:

- **Long-session stability** — explicit asks for: graceful heap management, session compaction that doesn't crash (#4780), resumable sessions after OOM (#1467, #4699), and `--resume` UX that distinguishes fresh vs. recent sessions (#1467).
- **MCP maturity** — TLS-insecure bypass for self-hosted HTTP MCP servers (#4801), predictable OAuth callback ports (#4800, #4795), and correct MCP tool discovery that doesn't report "Found 0 tools" for already-loaded namespaces (#4773).
- **Theming control** — explicit dark/light pin override independent of OS preference (#4620), and fixing the broken light palette (#135, #3773).
- **Permissions UX** — predictable lifetime for `/permissions assisted` (#4764), correct application of fail-closed posture only when policy actually exists (#4757), and correct command normalization so `git -C <dir> --no-pager <sub>` is recognized as safe (#4797).
- **Agent onboarding** — welcome/activation cards for custom Copilot CLI agents (#4798), and fixing multi-hook `additionalContext` injection so every sessionStart/subagentStart contributes (#3589).
- **Update reliability** — reuse already-downloaded update packages on install failure (#4799).
- **Multi-account workflows** — easy switching between multiple GitHub identities (#367, closed but recurring theme).

## 7. Developer Pain Points

1. **Unrecoverable sessions.** Four overlapping OOM bugs (#4686, #4725, #4699, #4780) all surface during normal long-running work, with no recovery path short of `kill -9`; in the worst pattern, compaction OOMs corrupt the session so `--resume` cannot repair it. Crash dumps writing into `$PWD` (#4699) make the pain worse for project cleanliness.
2. **Light-theme accessibility.** Developers on light terminals get effectively unreadable prompts (#135, #3773); there is no override to force a palette independent of OS preference (#4620).
3. **Permissions and approvals are inconsistent.** Assisted mode silently deactivates after ~1 hour (#4764); `--yolo` is blocked by fail-closed posture even on accounts with no managed policy (#4757); Docker sandboxes skip approval entirely (#4609); and the command-legitimacy checker fails to parse standard `git` global options (#4797). Each is individually small; collectively they make "what will this session actually let the agent do?" hard to predict.
4. **MCP integration friction.** Three independent OAuth callback/port bugs against different IdPs (#4795, #4796, #4800), misleading "Found 0 tools" discovery (#4773), and no TLS-insecure escape hatch (#4801) all push users away from self-hosted MCP.
5. **Config churn.** Launch-time `model` value silently overwrites manual edits to `settings.json` on session exit (#4252), and `--no-pager`/`-C` on `git` are mis-parsed by the legitimacy checker (#4797) — both small but indicative of "the CLI mutates things I didn't ask it to mutate."
6. **Self-update loop.** Failed installs force a full re-download instead of reusing the cached package (#4799), wasting bandwidth on metered connections.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-10

## 1. Today's Highlights

Today's activity is dominated by **provider-integration and runtime-reliability issues** rather than releases. Several long-standing bugs (Bun install breakage, MCP OAuth, Bedrock image handling) saw fresh comment activity, while the PR pipeline focused on **making session behavior and provider defaults configurable** (retry policy, webfetch size, MCP connect timeouts, auto-accept permissions) plus a notable rewrite of the xAI Responses WebSocket transport. No new tagged releases shipped in the last 24 hours.

---

## 2. Releases

No new releases in the last 24 hours. Latest available version remains **v1.18.x** (per issues referencing 1.18.29 / 1.18.30), with the next-major **OpenCode 2.0** branch seeing active TUI/provider work tracked under `[2.0]` labels.

---

## 3. Hot Issues

1. **[#27906 — v1.15.1+ Breaks Bun Installs](https://github.com/anomalyco/opencode/issues/27906)** — 25 comments, 16 👍
   The most-upvoted issue of the day. v1.15.1 enabled postinstall lifecycle scripts, which Bun blocks for global installs by default. Hits a large segment of the Bun-based user base and remains open.

2. **[#26195 — `opencode mcp auth` fails to open browser for OAuth (Google Drive MCP)](https://github.com/anomalyco/opencode/issues/26195)** — 9 comments, 11 👍
   OAuth flow prints "Authentication successful!" but never actually completes — no browser window, no tokens persisted. High signal-to-noise ratio.

3. **[#45011 — Web UI: CLI/TUI-created sessions never appear in Home](https://github.com/anomalyco/opencode/issues/45011)** — 7 comments
   Sessions created from `opencode run`, TUI, or agents don't show in the web client because the project registry is client-side-only. Blocks cross-client workflows.

4. **[#42739 — Crash in `Provider.list` when Cloudflare env vars exist without `CLOUDFLARE_API_TOKEN`](https://github.com/anomalyco/opencode/issues/42739)** — 6 comments
   A generic "Unexpected server error" surfaces as an unhandled exception; masks the real misconfiguration from users.

5. **[#43596 — Configurable retry policy](https://github.com/anomalyco/opencode/issues/43596)** — 5 comments, 7 👍
   `RETRY_MAX_RETRIES = 5` is hardcoded after #41939. Quota-bounded providers abort turns prematurely; user wants `maxRetries / initialDelay / backoffFactor / maxDelay` exposed via config.

6. **[#47965 — DeepSeek V4 Flash Vision capped at 4 images on OpenCode Go](https://github.com/anomalyco/opencode/issues/47965)** — 4 comments
   Provider-side limit (not a model limit) leaks into user sessions, failing multi-image requests with HTTP 400.

7. **[#48069 — Bedrock `gpt-6-astra` fails after `read` tool returns an image](https://github.com/anomalyco/opencode/issues/48069)** — 3 comments
   Replay of a user-message image on the next turn returns 400 from Bedrock ConverseStream; the model actually rejects the `image` field.

8. **[#47494 — Desktop 1.18.29: Cannot rename local "global" project](https://github.com/anomalyco/opencode/issues/47494)** — 3 comments
   Renaming and icon-color changes silently no-op on plain local folders in the Electron build.

9. **[#47022 — OpenCode database grew to ~72 GB in ~two weeks](https://github.com/anomalyco/opencode/issues/47022)** — 2 comments
   Severe local-storage regression on Desktop; macroscopic bloat that consumes disk without a documented retention policy.

10. **[#42891 — `[2.0]` opencode2 upgrade command missing/broken](https://github.com/anomalyco/opencode/issues/42891)** — 2 comments, 2 👍
    `opencode2 upgrade` throws `ENOENT`; `--version` reports `v0.0.0-next-17400`. No first-class self-update path for the 2.0 line yet.

---

## 4. Key PR Progress

1. **[#48117 — fix(provider): resolve OpenRouter route-modifier suffixes in model IDs](https://github.com/anomalyco/opencode/pull/48117)**
   Closes #48016. Correctly parses `:floor`, `:nitro`, `:exacto`, `:online` suffixes on OpenRouter slugs — an easy-to-miss footgun for routing.

2. **[#48324 — fix(provider,skill): omit textVerbosity on custom gateways + skill prompt budget](https://github.com/anomalyco/opencode/pull/48324)**
   Drops the unconditional `textVerbosity="low"` for `gpt-5.*` on custom OpenAI-compatible gateways (Experiential Labs, Cloudflare AI Gateway) and enforces a skill-prompt budget.

3. **[#48300 — feat(tui): add minimal and hidden tool call modes](https://github.com/anomalyco/opencode/pull/48300)**
   New **Settings → Session → Tool calls** with `show | minimal | hidden` modes. Default behavior preserved.

4. **[#47821 — feat(session): add turn diff route + `idle` projection](https://github.com/anomalyco/opencode/pull/47821)**
   Adds `Session.Message.Idle` events with `outcome: succeeded|failed|interrupted` and a turn-diff API. Supersedes #47795 with a clean history.

5. **[#48318 — fix(ai): make xAI Responses websockets work and re-enable them](https://github.com/anomalyco/opencode/pull/48318)**
   Re-enables the WebSocket transport for xAI Responses (disabled in #48231) by fixing incremental `previous_response_id` handling.

6. **[#46812 — feat: make webfetch max response size configurable](https://github.com/anomalyco/opencode/pull/46812)**
   Adds `webfetch.max_response_size` (bytes) to ConfigV1; removes the hard 5MB cap. Closes #15459.

7. **[#46813 — fix: bound MCP connect so `mcp list` cannot hang](https://github.com/anomalyco/opencode/pull/46813)**
   Adds timeouts to MCP `create()` and `mcp.status()` so a stuck server can't deadlock the CLI. Closes #43484.

8. **[#47104 — fix: honor settings auto-accept on new sessions](https://github.com/anomalyco/opencode/pull/47104)**
   Per-directory auto-accept in Desktop Settings now actually applies to freshly created sessions, not just the prompt-bar toggle.

9. **[#47983 — feat(desktop): redesign settings navigation and project editing](https://github.com/anomalyco/opencode/pull/47983)**
    Reorganizes Settings into **client preferences / servers / projects** with explicit back-navigation; addresses multiple rename/icon bugs (e.g., #47494).

10. **[#47867 — fix(core): use local time for log timestamps](https://github.com/anomalyco/opencode/pull/47867)**
    Switches file and stderr logs to Effect's local-time `DateTime` formatter (ms preserved). Closes #21330 — a long-standing papercut.

*Honorable mentions:* [#48225 (ACP reasoning/session-option restoration)](https://github.com/anomalyco/opencode/pull/48225), [#45103 (deep-link to existing Desktop sessions)](https://github.com/anomalyco/opencode/pull/45103), [#48208 (Anthropic provider auth docs)](https://github.com/anomalyco/opencode/pull/48208).

---

## 5. Hot Discussions

No discussion data was provided in this dataset. Section omitted.

---

## 6. Feature Request Trends

Across open issues and merged PRs, the strongest feature directions are:

- **Configurable runtime limits** — retry policy ([#43596](https://github.com/anomalyco/opencode/issues/43596), [#48298](https://github.com/anomalyco/opencode/issues/48298)), webfetch size ([#46812](https://github.com/anomalyco/opencode/pull/46812)), MCP connect timeouts ([#46813](https://github.com/anomalyco/opencode/pull/46813)). Pattern: stop hardcoding magic numbers in the provider/session layer.
- **TUI usability** — tool-call visibility modes ([#48300](https://github.com/anomalyco/opencode/pull/48300)), per-message dye + hover preview in MessageNav ([#48292](https://github.com/anomalyco/opencode/issues/48292)), `/copy` reliability for large transcripts ([#48320](https://github.com/anomalyco/opencode/issues/48320)).
- **Desktop UX overhaul** — settings redesign ([#47983](https://github.com/anomalyco/opencode/pull/47983)), deep-link sessions ([#45103](https://github.com/anomalyco/opencode/pull/45103)), correct auto-apply of settings ([#47104](https://github.com/anomalyco/opencode/pull/47104)).
- **Provider parity & diagnostics** — explicit errors when custom gateways reject defaults ([#48324](https://github.com/anomalyco/opencode/pull/48324)), OpenRouter route-suffix parsing ([#48117](https://github.com/anomalyco/opencode/pull/48117)), better crash surfaces for missing credentials ([#42739](https://github.com/anomalyco/opencode/issues/42739)).
- **Model registry extensibility** — user-defined/custom Ollama models in the UI ([#48279](https://github.com/anomalyco/opencode/issues/48279), [#48282](https://github.com/anomalyco/opencode/issues/48282)).
- **OpenCode 2.0 foundations** — turn diff route ([#47821](https://github.com/anomalyco/opencode/pull/47821)), upgrade command ([#42891](https://github.com/anomalyco/opencode/issues/42891)), headless `--agent` honoring declared model ([#42561](https://github.com/anomalyco/opencode/issues/42561)).

---

## 7. Developer Pain Points

- **Install / packaging friction on Bun** — [#27906](https://github.com/anomalyco/opencode/issues/27906): postinstall scripts are blocked by default, breaking the global-install path for a sizable share of users.
- **Silent failures & generic errors** — [#42739](https://github.com/anomalyco/opencode/issues/42739), [#48261](https://github.com/anomalyco/opencode/issues/48261), [#48294](https://github.com/anomalyco/opencode/issues/48294): users see `Unexpected server error` or `CommandNotFoundException` without actionable diagnostics.
- **Cross-client session visibility** — [#45011](https://github.com/anomalyco/opencode/issues/45011), [#39667](https://github.com/anomalyco/opencode/issues/39667): the web UI and CLI/TUI share project state only loosely, leading to lost sessions and mislabeled tabs.
- **Local resource bloat** — [#47022](https://github.com/anomalyco/opencode/issues/47022): ~72 GB SQLite growth in two weeks with no documented retention; mirrors the broader pain of database-driven desktops without housekeeping.
- **Provider-specific regressions** — Bedrock GPT-6 image replay ([#48069](https://github.com/anomalyco/opencode/issues/48069)), GitHub Copilot thinking display ([#46593](https://github.com/anomalyco/opencode/issues/46593)), DeepSeek vision 4-image cap ([#47965](https://github.com/anomalyco/opencode/issues/47965)). Each model family has its own quirks; OpenCode often surfaces them as opaque 4xx errors.
- **Windows + non-NPM toolchains** — [#48307](https://github.com/anomalyco/opencode/issues/48307), [#42724](https://github.com/anomalyco/opencode/issues/42724): PowerShell PATH handling and Bun plugin stacktraces remain recurring friction.
- **Upgrade / self-update story for 2.0** — [#42891](https://github.com/anomalyco/opencode/issues/42891), [#48310](https://github.com/anomalyco/opencode/issues/48310): no first-class upgrade path, and binary-file handling still leaks garbage into context.
- **Pricing/plan clarity** — [#48266](https://github.com/anomalyco/opencode/issues/48266): Go plan limits ($60/mo) vs Omen Alpha ($100/mo) are documented inconsistently, eroding trust in billing.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-10

## Today's Highlights

A heavy triage day for the project, with 50 issues updated and 12 PRs touched, signaling strong contributor momentum. The maintainer team closed a wave of no-action issues filed under the contribution gate, while shipping tangible improvements: a DeepSeek V4.1 Flash model addition, default 3-minute tool call timeouts, broader skill-name support, and documentation navigation validation. Several still-open issues point to real stability concerns — including a TUI freeze on interrupt (#9410) and sessions wedging permanently on reasoning models at the context ceiling (#9409) — that will likely shape the next release.

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. **[#9052] Fullscreen mode wheel scrolling 3× slower than regular mode** — 8 comments, 4 👍. A real usability regression in the fullscreen TUI that users are migrating toward. The fixed input box is loved but the scroll experience is making it impractical. ([link](https://github.com/earendil-works/pi/issues/9052))
2. **[#9331] Bedrock: OpenAI reasoning effort never sent to the model** — 4 comments. High-impact correctness bug: changing thinking level has no effect on OpenAI models routed through Bedrock, breaking benchmarks and user expectation. ([link](https://github.com/earendil-works/pi/issues/9331))
3. **[#9410] Escape to interrupt streaming causes ~60s TUI freeze** — 2 comments. Severe interactivity regression in v0.85.1 on large-context Gemini sessions; the editor becomes unresponsive while the spinner stays on `Working`. ([link](https://github.com/earendil-works/pi/issues/9410))
4. **[#9409] Sessions wedge permanently at the context ceiling on reasoning models** — 2 comments. Auto-compaction fails silently with `Truncated response recovery failed after one compact-and-retry attempt`; user-facing loop with no recovery path. ([link](https://github.com/earendil-works/pi/issues/9409))
5. **[#9394] Remove gpt-5.4 from openai-codex catalog** — 3 comments. Catalog drift: gpt-5.4/gpt-5.4-mini no longer available via ChatGPT accounts, current users hit hard errors. ([link](https://github.com/earendil-works/pi/issues/9394))
6. **[#9381] Package Report: pi-safe-compact (malicious or unsafe behavior)** — 5 comments. Security supply-chain alert: the listed GitHub user is no longer reachable. Worth watching for any upstream action. ([link](https://github.com/earendil-works/pi/issues/9381))
7. **[#9396] pi exits immediately inside tmux with `sessions should be nested with care`** — 2 comments. Discovered while filing for the contribution gate; reflects a real ergonomic surprise for tmux users. ([link](https://github.com/earendil-works/pi/issues/9396))
8. **[#9395] openai-completions drops isError on tool results** — 2 comments. Permission-gate extensions can't distinguish blocked/failed tool calls from normal output on OpenAI-compatible endpoints (including local llama-server). ([link](https://github.com/earendil-works/pi/issues/9395))
9. **[#9426] Newer-version session files are silently accepted** — 1 comment. Forward-compat hazard: `migrateToCurrentVersion` returns silently when version is greater than current; no warning, no migration. ([link](https://github.com/earendil-works/pi/issues/9426))
10. **[#9413] Fresh session not persisted until first assistant reply** — 1 comment. Data-loss window: an interrupted or killed pre-reply session vanishes entirely; clean low-risk fix candidate. ([link](https://github.com/earendil-works/pi/issues/9413))

## Key PR Progress

1. **[#9431] feat(agent): default 3-minute timeout for every tool call** — Closed. Fills a real gap: only `bash`/`powershell` had opt-in timeouts, other tools could hang the agent forever. Includes a concrete hung-bash trace motivating the change. ([link](https://github.com/earendil-works/pi/pull/9431))
2. **[#9425] feat(ai): add DeepSeek V4.1 Flash** — Closed. Adds the latest DeepSeek Flash model to the native catalog with both `deepseek-flash` and `deepseek-v4.1-flash` ids and proper thinking-level mapping. ([link](https://github.com/earendil-works/pi/pull/9425))
3. **[#9416] fix(coding-agent): accept dots and underscores in skill names** — Closed. Extends the Agent Skills alphabet so shared skill directories from Claude Code-style harnesses import cleanly. ([link](https://github.com/earendil-works/pi/pull/9416))
4. **[#8799] feat(tui): prettier Working... spinner** — Closed. Spinner is now drawn in the input editor border, color-matched to the active thinking level, with a dedicated retrying state. ([link](https://github.com/earendil-works/pi/pull/8799))
5. **[#9430] fix(coding-agent): remove unreachable tool_result_end listener in subagent example** — Closed. Quiet dead-code cleanup with the right call: pi never emits that event. ([link](https://github.com/earendil-works/pi/pull/9430))
6. **[#9380] docs: validate documentation navigation and reachability** — Closed. Makes `docs.json` the canonical navigation manifest and validates it in the test suite, catching broken local links and unreachable pages. ([link](https://github.com/earendil-works/pi/pull/9380))
7. **[#9382] Always place cursor at the end while navigating history** — Closed. Aligns up-arrow history navigation with bash/standard terminal behavior. ([link](https://github.com/earendil-works/pi/pull/9382))
8. **[#8744] feat(tui): add opt-in overlay selection exclusion** — OPEN. Lets overlays opt out of fullscreen text selection so copy/paste still pulls from the transcript `ScrollView` rather than the composed screen. ([link](https://github.com/earendil-works/pi/pull/8744))
9. **[#8612] fix(coding-agent): clear delivered image-only queue entries** — OPEN. Closes #8581: image-only steering messages now drop delivered entries and keep pending counts in sync. ([link](https://github.com/earendil-works/pi/pull/8612))
10. **[#8743] fix(coding-agent): ignore stale tool image conversions** — OPEN. Ties Kitty image conversion cache to its source image so a late partial conversion can't overwrite a newer one. ([link](https://github.com/earendil-works/pi/pull/8743))

## Hot Discussions

**Show and tell**

- **[#8803] pi-verdict — a minimal permission gate for pi** — A zero-dependency allow/ask/deny file-based extension that implements the "build your own confirmation flow" path the README explicitly leaves open. Positions itself as Pi's analogue to Claude Code's auto-mode gating. ([link](https://github.com/earendil-works/pi/discussions/8803))
- **[#9427] Pi Manager — a local UI for providers, models, and `~/.pi/agent`** — A non-forking local control plane for managing OpenAI-compatible relays (including an Antigravity bridge), native provider sign-ins, catalogs/cycle lists/thinking maps, and writing/backup of `~/.pi/agent`. ([link](https://github.com/earendil-works/pi/discussions/9427))

## Feature Request Trends

- **TUI polish & stability**: fullscreen scroll speed (#9052), viewport jumps in regular mode (#9424), cursor hidden after fullscreen exit (#9419), dual caret on hosts that draw their own cursor (#9429), image-only message counts drifting out of sync (#8612).
- **Reasoning-model reliability**: Bedrock OpenAI reasoning effort not honored (#9331), permanent wedge at context ceiling (#9409), 60s freeze on interrupt in large sessions (#9410).
- **Extension API expansion**: persist flag on RPC model/thinking commands (#9393), `extensionPaths` in `MainOptions` (#9406), bounded abort/force-idle primitive (#9386), `systemPromptAppend` from `session_start` (#9432), default tool timeouts (#9431).
- **Configuration flexibility**: window-relative compaction budgets (#9415), value resolution for `baseUrl` in models.json (#9422), grouping skill bundles in the startup list (#9420).
- **Forward-compat & session lifecycle**: silent acceptance of future-version sessions (#9426), no persistence until first assistant reply (#9413), graceful migration of newer session schemas.

## Developer Pain Points

- **Inconsistent scroll/cursor behavior across fullscreen vs regular TUI modes** is the most consistent UX complaint — it affects users who rely on fullscreen to keep the input box visible.
- **Reasoning models are brittle at scale**: large contexts expose streaming-interrupt freezes, permanent context-ceiling wedges, and missing thinking-level propagation through Bedrock — a cluster worth prioritizing together.
- **OpenAI-compatible providers are second-class in subtle ways**: error body normalization, dropped `isError` on tool results, wrong `baseUrl` defaults for non-batch Anthropic models on OpenRouter, and HTML 520 pages surfaced verbatim to the transcript — all reported in the last 24h.
- **Extension authors need better primitives**: bounded aborts, explicit persistence flags, host-aware caret handling, and stable base-system-prompt append points were all raised on the same day, signaling real pressure on the current extension surface.
- **Catalog drift is a recurring tax**: gpt-5.4 removal (#9394) and missing DeepSeek V4.1 Flash (#9428/#9425) show the catalog needs an automated freshness check, especially for providers with hardcoded model definitions.
- **Data-loss windows in session lifecycle** (#9413, #9426) are low-hanging, low-risk fixes that several contributors are explicitly ready to land via the contribution gate.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-10

## Today's Highlights

Qwen Code shipped a heavy release wave with **desktop-v0.3.0** (alongside preview v0.3.0-preview.0), **CLI nightly v0.23.2**, **TypeScript SDK v0.1.11**, and **cua-driver-rs v0.20.5**. The most visible pain points remain Windows-specific: a P1 ConPTY process leak (347 zombies / 2.8 GB) in the VS Code companion, MCP connection-closed errors on Windows, and a TUI crash (React #185) when multiple background agents complete. On the feature side, the **Browser SDK** (Playwright-based) and **persistent mesh collaboration threads** landed new PRs, and the **VS Code "auto-add opened file to context"** regression got an immediate fix.

## Releases

- **[desktop-v0.3.0](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.3.0)** — Stable desktop release. CI now exercises desktop packaging on a schedule (#11519) and the bridge keeps pending permission/question state across restarts.
- **[desktop-v0.3.0-preview.0](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.3.0-preview.0)** — Preview build; the `desktop-latest` updater feed still points at 0.2.2, so existing installs are intentionally not auto-migrated. macOS arm64 build named `Qwen-Code-Desktop-arm64.d…`.
- **[v0.23.2-nightly.20260909.2e212144d3](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.2-nightly.20260909.2e212144d3)** — Includes a Goal-runtime fix (#11365) so a checkpoint that overruns its claim budget is retried instead of stalling the loop.
- **[sdk-typescript-v0.1.11](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.11)** — Bundles CLI 0.23.2 (built from source on the SDK branch).
- **[cua-driver-rs-v0.20.5](https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.20.5)** — macOS universal codesigned/notarized binary + `QwenCuaDriver.app`; Linux x86_64 + arm64 (glibc 2.31+); Windows UIAccess worker + native SDK payload (x86_64 + arm64), all under `packages/cua-driver`.

## Hot Issues

1. **[#11303 — P1] ConPTY process leak on Windows (VS Code Companion)** ([link](https://github.com/QwenLM/qwen-code/issues/11303)) — 14 comments. A single qwen-cli instance accumulates ~347 headless `conhost.exe` processes and ~2.8 GB RAM after ~12 h. Highest-impact open bug right now; affects every Windows+VS Code user long-running.
2. **[#11500 — P1] TUI exits silently with React error #185** ([link](https://github.com/QwenLM/qwen-code/issues/11500)) — TUI dies when multiple background agents complete simultaneously (Ink `useBoxMetrics` setState loop). Worst kind of failure: no error rendered, just drops to a shell prompt; resume reports "previous session appears…".
3. **[#11489 — P1, closed] VS Code extension v0.21.x → v0.23.x drops conversation history** ([link](https://github.com/QwenLM/qwen-code/issues/11489)) — Data is still in `state.vscdb` but the new extension version can't read it. A migration regression on a paid feature surface (history persistence).
4. **[#11556 — P1] VS Code companion 0.23.1 broken under Remote-SSH** ([link](https://github.com/QwenLM/qwen-code/issues/11556)) — Webview stuck loading on linux-arm64 server hosts. Important because Remote-SSH is the dominant workflow for many devs.
5. **[#11558 — P2] Any opened file in VS Code is auto-added to context** ([link](https://github.com/QwenLM/qwen-code/issues/11558)) — Reported on 0.23.1: clicking a file to remove it from context is undone when the next file is opened. Quick-fix already incoming via #11568.
6. **[#9693 — P2] MCP -32000 Connection closed on Windows at startup** ([link](https://github.com/QwenLM/qwen-code/issues/9693)) — STDIO MCP servers (filesystem, sequential-thinking) fail to start on Windows even when MCP is not activated. Reproducible across multiple servers.
7. **[#8596 — P2, need-discussion] Deprecate Electron desktop, rename `desktop-shell` → `desktop`** ([link](https://github.com/QwenLM/qwen-code/issues/8596)) — 6 comments. Directional signal that **Tauri is the future desktop**; raises questions about the Electron migration timeline and packaging.
8. **[#8092 — feature-request] Build a lower-maintenance desktop around Web Shell** ([link](https://github.com/QwenLM/qwen-code/issues/8092)) — 6 comments. Companion thread to #8596: consolidate desktop surface area by reusing Web Shell rather than maintaining a parallel Electron UI.
9. **[#11550 — P2] Prompt re-processing on memory write** ([link](https://github.com/QwenLM/qwen-code/issues/11550)) — Performance regression: a memory write forces the prompt to be re-processed. Latency/throughput cost on every memory mutation.
10. **[#11460 — P2] Qwen Desktop 1.0.3 MCP Filesystem hangs after first interaction** ([link](https://github.com/QwenLM/qwen-code/issues/11460)) — Adds to a cluster of MCP-on-Windows bugs (#9693, #10056, #9675, #7771); clearly the top Windows integration pain area.

## Key PR Progress

1. **[#11568 fix(vscode): preserve active file exclusion](https://github.com/QwenLM/qwen-code/pull/11568)** — Direct response to #11558. After a user excludes the active file, switching editors no longer silently re-enables automatic inclusion.
2. **[#11464 feat(web-shell): render URLs in user messages as clickable links](https://github.com/QwenLM/qwen-code/pull/11464)** — Closed/merged. User messages now linkify URLs (matching assistant-message behavior); opens in system browser for packaged desktop shell.
3. **[#11241 feat(browser-use): add Playwright-based Browser SDK](https://github.com/QwenLM/qwen-code/pull/11241)** — Adds a typed Browser SDK living inside the persistent Node REPL, with semantic Playwright locators, DOM snapshot refs, and visual coordinates. Pairs with #11526's MCP-server bundling proposal.
4. **[#11206 feat(mesh): add persistent shared-thread agent collaboration](https://github.com/QwenLM/qwen-code/pull/11206)** — Workspace-scoped Agent identities collaborate on shared threads: assign work, interject mid-run, inspect attributed results, cancel, resolve blockers. The most ambitious UX change in the queue.
5. **[#11086 feat(serve): scope extensions to workspace runtimes](https://github.com/QwenLM/qwen-code/pull/11086)** — Reconciles global extension catalog into per-workspace runtimes; workspace-qualified daemon and SDK access; updates composer `@`-menu and extension management.
6. **[#11342 feat(web-shell): add model role and context window configuration](https://github.com/QwenLM/qwen-code/pull/11342)** — Endpoint-aware pickers for Advisor/image/voice models in Web Shell Settings; custom setup now covers conversation, image generation, and transcription purposes.
7. **[#11360 feat(goal): start approved Web Shell proposals after their owning turn](https://github.com/QwenLM/qwen-code/pull/11360)** — Allow/Reject panel now actually executes approved Goals once the proposing turn ends cleanly. Follow-up slice after #11284.
8. **[#10906 feat(web-shell): show shell and monitor task output](https://github.com/QwenLM/qwen-code/pull/10906)** — Captured shell/monitor stdout+stderr persisted alongside existing shell capture; daemon exposes a live-session-owner-scoped endpoint serving a sanitized tail. Fixes a real observability gap.
9. **[#11480 feat(web-shell): add source footnote citation cards](https://github.com/QwenLM/qwen-code/pull/11480)** — Renders `source-*` GFM footnotes as compact citation controls; deduplicates adjacent sources into a single knowledge icon with paginated hover/focus cards.
10. **[#11169 fix(web-shell): close trust-gate and bystander gaps in local-files bridge](https://github.com/QwenLM/qwen-code/pull/11169)** — Picks up four review fixes that were stranded on the feature branch when #10962 squash-merged prematurely; tightens workspace-route judgement and bystander handling.

## Hot Discussions

*Grouped by category. These are issues that are explicitly framed as `need-discussion` / roadmap-level rather than discrete bug fixes.*

### Ideas / Roadmap
- **[#10118] Split "Live" into a standalone voice app — single voice entry point for all sessions** ([link](https://github.com/QwenLM/qwen-code/issues/10118))) — Live decouples from backend session injection; becomes a single hotkey-invoked voice front-end that can list/create/command any user session. Design converged, entering scheduling.
- **[#11433] Evaluate embedded SQLite for Session/Prompt indexing at scale** ([link](https://github.com/QwenLM/qwen-code/issues/11433))) — RFC-style thread on whether Qwen Code should ship an embedded SQLite layer for long conversations, many sessions, exact-prompt queries, transcript replay, reconnect/attach.
- **[#8596] Deprecate Electron desktop, rename `desktop-shell` → `desktop`** ([link](https://github.com/QwenLM/qwen-code/issues/8596))) — See Hot Issues #7; open design question on freeze/migration policy.
- **[#11564] `web_search`: design page titles for cited sources (split from #11490)** ([link](https://github.com/QwenLM/qwen-code/issues/11564))) — Move from URL-only citations to `[title](url)` form per the tool description; design split out after two review rounds.
- **[#10641] Mechanism to auto-clean `.qwen` directory** ([link](https://github.com/QwenLM/qwen-code/issues/10641))) — Users report `.qwen` keeps growing; proposal for age-based or size-based pruning.

### Q&A
- **[#9831] Relationship with `craft-agents-oss`?** ([link](https://github.com/QwenLM/qwen-code/issues/9831))) — Community asking whether Qwen Code and `craft-agents-oss` are forks/forks of each other, given near-identical appearance and shared sessions.
- **[#11489] VS Code extension history loss on upgrade** ([link](https://github.com/QwenLM/qwen-code/issues/11489))) — Now closed, but the thread is the canonical place to follow the migration plan for `.vscdb` state.

## Feature Request Trends

Aggregating across Issues and PRs, the highest-velocity request areas are:

1. **Consolidate desktop onto Web Shell / Tauri.** #8596, #8092, and the merged-by-default direction in `desktop-v0.3.0-preview.0` all point at killing the Electron app's parallel UI surface and reusing the Web Shell.
2. **MCP on Windows, end-to-end.** A cluster of bugs (#9693, #10056, #11460, #9675, #7771) plus #11526's request to bundle the Node REPL as a versioned MCP server show Windows MCP reliability is a top demand.
3. **Session/history portability.** #11433 (SQLite for sessions), #11489 (history migration), #10118 (cross-session voice control), #11206 (shared-thread collaboration) — all reflect a community asking Qwen Code to handle multi-session, long-lived workflows properly.
4. **Browser automation as a first-class tool.** #11241 (Playwright Browser SDK), #11526 (bundling), the original PR #7859 series — a clear "Browser Use should ship with Qwen Code" trend.
5. **Voice / realtime as a global interaction layer.** #10118 (Live split), #11342 (voice model config in Web Shell) — voice is moving from a single feature into a cross-cutting input modality.
6. **Citation-aware web research.** #11564 (page titles in citations), #11480 (footnote citation cards in Web Shell) — improving how `web_search` results are surfaced.
7. **Background-automation UX.** #11360 (Goals auto-start after their owning turn), #11547 (Web Shell spinner never clears after background shell + errored turn) — polish around long-running agents.

## Developer Pain Points

Recurring frustrations surfacing repeatedly in the last 24h:

- **Windows-specific instability.** ConPTY leak (#11303), MCP `-32000` startup (#9693), filesystem MCP hang (#11460), SSE MCP permission loss (#10056), Remote-SSH webview stuck (#11556). A disproportionate share of P1/P2 bugs are Windows-only — desktop-on-Windows remains the roughest edge.
- **Session/upgrade data migrations.** v0.21.x → v0.23.x lost conversation history (#11489) even though the SQLite store retained it; switching Responses models can brick a saved session (#9452). Users want forward-compatible session formats.
- **TUI robustness under concurrency.** React #185 (#11500), background-shell spinner not clearing after errors (#11547), pending `ask_user_question` cards lost on session re-open (#11448) — the interactive UI is fragile when turns and background tasks interleave.
- **Silent context mutation in VS Code.** #11558 (active file always re-added to context) is a "did the model just see my file?" trust issue — the fix in #11568 is welcome but signals a broader need for explicit context control.
- **Cross-provider reasoning leakage.** #9453 (`Part.thoughtSignature` lacks an origin marker so model switches can splice one provider's metadata into another call) is a correctness concern for anyone switching models mid-session.
- **Build/CI reliability.** macOS E2E shard deaths (#11134), tests racing against PTY cleanup (#11001), unwritable config dir crashing startup (#10455), regression-cost accounting in autofix (#10188) — most are `autofix/needs-human` indicating the automated loop is mature enough to flag but still needs a human for the actual fix.
- **Hidden storage growth.** `.qwen` directory keeps accumulating (#10641); no built-in retention policy means users hand-clean.

---

*Generated from GitHub data for `QwenLM/qwen-code` on 2026-09-10. Items sorted by community signal (comment count, priority, and topical relevance).*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*