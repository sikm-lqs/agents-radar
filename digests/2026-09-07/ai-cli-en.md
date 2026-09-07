# AI CLI Tools Community Digest 2026-09-07

> Generated: 2026-09-07 01:51 UTC | Tools covered: 7

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

# AI CLI Tools Cross-Comparison Report — 2026-09-07

## 1. Ecosystem Overview

The AI CLI coding-agent market has consolidated around seven actively maintained tools split into two cohorts: first-party clients tied to a single vendor's models and subscriptions (Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI) and open, multi-provider clients (OpenCode, Pi, Qwen Code). The dominant industry-wide tension is that agentic autonomy — multi-agent fan-out, long-running tasks, background execution — has outpaced the control plane: cost caps, undo, approval gates, and honest failure reporting are the top community asks nearly everywhere. A second systemic weak point is state transitions (resume, compaction, config reload), where both correctness and safety guarantees repeatedly leak. Meanwhile, vendor clients are differentiating on platform breadth (voice, device control, enterprise tenancy) while open clients compete on provider routing resilience and extensibility.

## 2. Activity Comparison

| Tool | Issues surfaced (digest) | PRs surfaced (digest) | Discussions | Release (last 24h) |
|---|---|---|---|---|
| **Claude Code** | 10 hot (top: 197💬, 151👍) | 10 (2 open / 8 closed) | N/A* | ✅ v2.1.263 (reliability rollup) |
| **OpenAI Codex** | 10 hot + 5 referenced | ~23 (~20 closed, 1 open) | 8 active threads | None |
| **Gemini CLI** | 10 hot (2 closed) | 10 (3 open / 7 closed) | N/A* | Nightly v0.60.0 (automated bump) |
| **Copilot CLI** | 14 (2 closed) | 1 | N/A* | None (last: 1.0.82 / desktop 1.1.15) |
| **OpenCode** | 10 hot | 14 | N/A* | None |
| **Pi** | 11 (6 closed) | 15 (6 open / 9 closed) | 1 | None |
| **Qwen Code** | 10 hot (1 closed) | 11 | N/A* | ⚠️ v0.23.1-preview.1 (release CI job failed) + 2 nightlies |

\* Digest source provided no Discussions feed for these repos; marked N/A per spec, not as inactive. All seven repos have Issues/PRs enabled this cycle. Counts reflect items surfaced per digest (typically top-10), not exhaustive tracker totals.

## 3. Shared Feature Directions

- **Cost visibility & spend controls (6/7 tools).** The loudest cross-ecosystem ask. Claude Code's #1 pain point — six converging issues for token caps, agent-spawn ceilings, and fan-out confirmation (#90664, #87178, #89596 et al.); Codex users build third-party dashboards (CodexFuse) and request quota-aware planning (#42182, #43257); Copilot BYOK silently disables prompt caching for ~5× cost (#4720); OpenCode Go quota math bugs (#42935, #47613, #47703); Pi plumbs provider-reported cost (#6881).
- **Windows parity & desktop stability (7/7 tools).** Codex's largest issue (#28919, 59👍, missing device-control tab) plus a five-issue Chrome native-host cluster; Pi's Windows meta-thread (57💬); OpenCode's 3–5s freezes; Claude Code's always-on-top bug and Windows path/CRLF hardening PRs; Gemini's headless `-p` silent failure and CRLF detection bugs.
- **Context compaction correctness & configurability (4 tools).** Claude Code loses behavioral rules on compaction (#67500) and wants tunable MEMORY.md caps (#91188); Codex compaction resurrects completed steering instructions (#29811) and AGENTS.md reload can brick sessions (#43295); Qwen stabilizes `/compress` and restructures memory recall (#10183, #11094); Gemini debates deterministic memory redaction (#26525).
- **Session safety, undo & portability (4 tools).** Codex holds the two highest-voted asks in the entire ecosystem: `/rewind` undo (118👍) and cross-device sync (61👍); Claude Code wants cross-account/cross-environment session continuity (#74662, #74671); OpenCode and Qwen iterate on session lifecycle and worktree-safe resets (#47652, #11015).
- **Permission/sandbox enforcement integrity (5 tools).** Copilot's ACP mode auto-approves tool calls (#4537); Qwen's `PreToolUse` hooks stop firing after `--continue` (#11180); OpenCode's documented `permission.ask` hook never fires (#7006) and wildcard precedence contradicts docs (#24335); Gemini patches a `git diff --output=` sandbox escape (#29184); Claude Code merges symlink-escape and shell-injection fixes (#68689, #68786).
- **MCP robustness at scale (4 tools).** Gemini fixes tool-name collisions and the >128-tool API rejection (#28971, #24246); OpenCode hits Anthropic 400s on `anyOf`/`oneOf` schemas (#46628) and ignored OAuth `resource_metadata` (#44790); Copilot fails to reuse MCP OAuth tokens (#4695); Pi exposes machine-readable failure classes for MCP clients (#9247).

## 4. Differentiation Analysis

| Dimension | First-party cohort | Open multi-provider cohort |
|---|---|---|
| **Feature focus** | Claude Code: plugin ecosystem hardening + agentic spend control. Codex: platform breadth — worktrees, voice (RTP playback), device control, user-verification APIs. Copilot: GitHub/enterprise tenancy (GHEC routing, org-managed models, repo-scoped plugins #1665 landing) and ACP for IDE interop. Gemini: sandbox hygiene, extensions (phone pairing), AST-aware tooling R&D (#22745). | Pi: provider-agnostic routing — cross-provider fallback chains (three duplicate PRs = consensus), bounded retries, rapid new-provider integrations (Meta Muse, LLM Gateway). OpenCode: desktop app performance (3-layer persistence rewrite #47704–06) and plugin/permission surface. Qwen Code: structural bets — ink→OpenTUI migration (#8662) and mesh multi-agent orchestration (#11225–11230). |
| **Target users** | Enterprise teams (Copilot, Claude Code), subscription power users (Codex Pro tiers), Google-workspace developers (Gemini). | Multi-model tinkerers, cost-sensitive users, and embedders (Pi's JSON/RPC and extension host; OpenCode's SDK; Qwen's web shell for mobile). |
| **Failure profile** | Entitlement & trust systems: cyber-safeguard false positives blocking approved orgs (Claude #84352, 197💬), Pro-tier capacity errors (Codex #41790/#43322), OAuth verification loops (Gemini #19936), release-regression clusters (Copilot 1.0.81–82). | Upstream provider flakiness (Pi's `openai-codex` hang #4945), billing/permission systems still maturing (OpenCode), and CI/pipeline instability under fast iteration (Qwen). |

## 5. Community Momentum & Maturity

- **Largest engaged user bases:** Claude Code (197-comment and 151-👍 threads) and Codex (118-👍 and 61-👍 discussion asks; the only repo with a substantive Discussions culture this cycle). Their pain is at platform scale: entitlement, capacity, and trust systems.
- **Highest engineering throughput:** Codex (~20 PRs/day, bot-assisted, spanning voice/worktrees/verification) and Qwen Code (structural rewrites shipping in parallel — OpenTUI parity, mesh foundations).
- **Fastest fix turnaround:** Pi — issues filed and fixed within the same 24h window (#9209 → PR #9253); 9 of 15 PRs closed on arrival. Gemini shows similar discipline on correctness/security fixes.
- **Steady-state mature:** Claude Code (routine reliability release + coordinated community hardening batch), Gemini (nightly cadence).
- **Watch items:** Copilot CLI's near-zero PR visibility (1 PR) contrasts with heavy issue inflow from 1.0.81–82 regressions; Qwen's failed release CI job (#11185) echoes its own pipeline-waste concerns (#11109). OpenCode punches above its size via concentrated contributors (Hona's persistence rewrite) but faces paying-customer trust erosion from billing bugs.

## 6. Trend Signals

1. **Autonomy is outpacing control — "guardrails" are the next feature battleground.** Spend caps, undo/rewind, and pre-fan-out confirmation are top-voted across cohorts; expect these to become table stakes within 1–2 release cycles.
2. **Entitlement and billing are now reliability surfaces.** Verification loops, capacity errors, quota-math bugs, and silent cache disablement drive real churn risk — and third-party mitigation tools (CodexFuse) fill first-party gaps.
3. **State transitions leak safety guarantees.** Rules dropped on compaction (Claude), steering resurrected post-compaction (Codex), hooks bypassed on `--continue` (Qwen), permissions dropped in ACP mode (Copilot). Any team productionizing agents should explicitly test resume/compact/reload paths.
4. **Silent false-success is the emerging trust killer** for headless/CI and multi-agent use (Qwen #11217, Gemini #22323, Copilot #4706) — exit-code and termination-reason honesty is becoming a competitive differentiator.
5. **Windows is the ecosystem's largest parity debt** (7/7 tools); first-class Windows support materially widens addressable users.
6. **Architectural bifurcation:** vendor clients double down on proprietary depth (voice, device control, enterprise tenancy), while open clients converge on provider-agnostic resilience — cross-provider fallback chains (Pi, watch for adoption in OpenCode/Qwen) are a direct hedge against exactly the capacity errors Codex Pro users hit this week.

**For decision-makers:** choose first-party clients for depth and enterprise integration where you accept single-vendor capacity/entitlement risk; choose open multi-provider clients for routing resilience and cost control. In both cases, budget-monitoring tooling and regression testing around session-state transitions should be treated as prerequisites, not extras.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data as of: 2026-09-07 | Source: github.com/anthropics/skills**

---

## 1. Top Skills Ranking — Most-Discussed Pull Requests

> **Note on data:** The scraped dataset did not include numeric comment counts for PRs (only Issues), so the ranking below is derived from PR sort order, the prominence of the underlying issues each PR addresses, and cross-referenced community activity. All listed PRs are currently **OPEN**.

### 🥇 #1 — [PR #1298: Fix `run_eval.py` reporting 0% recall (skill-creator)](https://github.com/anthropics/skills/pull/1298)
**Status:** OPEN | **Author:** MartinCajiao | **Created:** 2026-06-10
- **What it does:** Fixes the description-optimization loop in `skill-creator` so that `run_eval.py`, `run_loop.py`, and `improve_description.py` actually measure trigger rates correctly. Also addresses Windows pipe reading, trigger detection, and parallel workers.
- **Why it's hot:** Directly resolves Issue [#556](https://github.com/anthropics/skills/issues/556) (12 comments, 10+ independent reproductions). Without this fix, every skill's description is being optimized against pure noise — a foundational defect affecting the entire ecosystem's meta-tooling.

### 🥈 #2 — [PR #1602: Resolve evaluation serialization, encoding, and benchmark bugs](https://github.com/anthropics/skills/pull/1602)
**Status:** OPEN | **Author:** AbhiPra24 | **Created:** 2026-08-17
- **What it does:** Bundle fix for `mcp-builder` evaluation (TextContent extraction), reliability across the skills repo, and platform compatibility.
- **Why it's hot:** Directly addresses Issue [#1390](https://github.com/anthropics/skills/issues/1390) where `evaluation.py` silently fabricates tool errors and scores 0/N — a phantom-success hazard that masks broken MCP integrations.

### 🥉 #3 — [PR #1099: Windows subprocess pipe fix for `run_eval.py`](https://github.com/anthropics/skills/pull/1099)
**Status:** OPEN | **Author:** joshuawowk | **Created:** 2026-05-07
- **What it does:** Resolves `WinError 10038` crashes on Windows that cause every query to be marked "not triggered" (`precision=100% recall=0%`).
- **Why it's hot:** Closes the same Windows leg of Issue #556; complementary to PR #1298. Windows users represent a substantial portion of the contributor base unable to iterate on descriptions at all.

### 4. [PR #1050: Windows subprocess + encoding fixes (skill-creator)](https://github.com/anthropics/skills/pull/1050)
**Status:** OPEN | **Author:** gstreet-ops | **Created:** 2026-04-27
- **What it does:** Two-line fix for `subprocess.Popen(["claude", …])` failing on Windows (CLI ships as `claude.cmd`, PATHEXT not honored) plus encoding bugs.
- **Why it's hot:** Minimal-diff, high-leverage fix that unblocks Windows contributors — the kind of PR that lands quickly because of its surgical scope.

### 5. [PR #1628: Hivemind — Zero-Cost Multi-Agent Orchestration Skill](https://github.com/anthropics/skills/pull/1628)
**Status:** OPEN | **Author:** Hanishchow | **Created:** 2026-08-21
- **What it does:** A skill that delegates mechanical work to headless [opencode](https://opencode.ai) workers on free models while Claude Code retains planning/review/merge roles.
- **Why it's hot:** Captures the community's clearest narrative shift in 2026 — context window is the scarce resource, not intelligence. Multi-agent orchestration is the dominant new-skill theme.

### 6. [PR #514: Add `document-typography` skill](https://github.com/anthropics/skills/pull/514)
**Status:** OPEN | **Author:** PGTBoos | **Created:** 2026-03-04
- **What it does:** Typographic QC for AI-generated documents — orphan word wrap, widow paragraphs, numbering misalignment.
- **Why it's hot:** Targets a class of defects every Claude document exhibits; broad applicability and a clear, narrow scope make it a strong candidate to merge.

### 7. [PR #486: Add ODT skill (OpenDocument creation, template fill, ODT→HTML)](https://github.com/anthropics/skills/pull/486)
**Status:** OPEN | **Author:** GitHubNewbie0 | **Created:** 2026-03-01
- **What it does:** Native OpenDocument support — creates, fills, parses, and converts `.odt`/`.ods` files.
- **Why it's hot:** Long-standing gap in the format coverage (DOCX/PDF covered, ODT missing). Slow review velocity suggests reviewer capacity is a binding constraint on the maintainer side.

### 8. [PR #538: Fix PDF skill case-sensitive file references](https://github.com/anthropics/skills/pull/538)
**Status:** OPEN | **Author:** Lubrsy706 | **Created:** 2026-03-06
- **What it does:** Corrects 8 case-sensitivity mismatches in `skills/pdf/SKILL.md` (`REFERENCE.md` → `reference.md`, etc.) that break on case-sensitive filesystems.
- **Why it's hot:** Embarrassing-class bug with a trivial, unambiguous fix — sitting open for ~6 months signals reviewer bottleneck rather than technical dispute.

---

## 2. Community Demand Trends (from Issues)

Sorted by comment volume, the Issues surface five clear demand clusters:

### 🔒 A. Trust, Security & Namespace Integrity (highest urgency)
- **[#492 (43 comments, 2 👍)](https://github.com/anthropics/skills/issues/492)** — *Community skills distributed under `anthropic/` namespace enable trust boundary abuse.* By far the most-discussed issue. Users cannot reliably distinguish official from community skills, creating a phishing/permissions hazard.

### 🏢 B. Enterprise Distribution & Governance
- **[#228 (16 comments, 8 👍)](https://github.com/anthropics/skills/issues/228)** — *Org-wide skill sharing in Claude.ai.* Highest thumbs-up ratio in the dataset; clear enterprise demand for a shared-skill library or direct sharing link.
- **[#412 (6 comments)](https://github.com/anthropics/skills/issues/412)** — *Proposal: `agent-governance` skill for policy enforcement, threat detection, trust scoring, audit trails.*

### 🛠 C. Skill-Creator Reliability (the meta-tooling crisis)
- **[#556 (12 comments, 7 👍)](https://github.com/anthropics/skills/issues/556)** — *`run_eval.py` reports 0% trigger rate.* Pairs with PR #1298.
- **[#202 (8 comments)](https://github.com/anthropics/skills/issues/202)** — *`skill-creator` should be updated to best practice (token efficiency, operational tone).*
- **[#189 (6 comments, 9 👍)](https://github.com/anthropics/skills/issues/189)** — *`document-skills` and `example-skills` plugins install identical content.*

### 🧠 D. Memory, Context & Reasoning Quality
- **[#1329 (9 comments)](https://github.com/anthropics/skills/issues/1329)** — *Proposal: `compact-memory` — symbolic notation for compact agent state.*
- **[#1487 (4 comments)](https://github.com/anthropics/skills/issues/1487)** — *`claude-api` skill eagerly injects ~156k tokens, exhausting the context window in one tool call.*
- **[#1385 (4 comments)](https://github.com/anthropics/skills/issues/1385)** — *Proposal: Reasoning Quality Gate Pipeline (calibration → adversarial review → delivery verification).*

### 🔌 E. Interop: Skills as MCPs / External Platforms
- **[#16 (4 comments)](https://github.com/anthropics/skills/issues/16)** — *Expose Skills as MCPs.* Early signal that has matured into actual submissions (PR #1627 Buffer, PR #1628 Hivemind).
- **[#1175 (4 comments)](https://github.com/anthropics/skills/issues/1175)** — *Security/context concerns for SharePoint Online via Skills.*
- **[#29 (4 comments)](https://github.com/anthropics/skills/issues/29)** — *Usage with AWS Bedrock.*

**Demand headlines:**
1. **Trust & namespace safety** (#492 alone has 2.7× the comments of the next-highest issue)
2. **Multi-agent orchestration** (Hivemind + opencode + zero-cost pattern)
3. **Skill-creator meta-tooling must be repaired** before any description-optimization workflow is trustworthy
4. **Context-economy skills** (compact-memory, anti-eager-injection)
5. **Reasoning quality gates** as first-class deliverables

---

## 3. High-Potential Pending Skills (Likely to Land Soon)

These PRs are **OPEN, narrowly scoped, and address well-understood problems** — strong merge candidates:

| PR | Skill / Fix | Why it's high-potential |
|---|---|---|
| [#1050](https://github.com/anthropics/skills/pull/1050) | Windows subprocess + encoding (skill-creator) | 1-line surgical fix; unblocks a large contributor segment |
| [#538](https://github.com/anthropics/skills/pull/538) | PDF case-sensitivity fix | Trivial, unambiguous, embarrassing-class bug |
| [#539](https://github.com/anthropics/skills/pull/539) | YAML unquoted-description pre-parse validation | Prevents a silent-failure class that bites every skill author |
| [#541](https://github.com/anthropics/skills/pull/541) | DOCX tracked-change `w:id` collision fix | Real document-corruption bug with documented root cause |
| [#1298](https://github.com/anthropics/skills/pull/1298) | Comprehensive `run_eval.py` fix | Unblocks the entire description-optimization workflow |
| [#1607](https://github.com/anthropics/skills/pull/1607) | Mark retired models in `claude-api` skill | Documentation correctness; closes referenced issue #1603 |
| [#1595](https://github.com/anthropics/skills/pull/1595) | Add UIZZE to Partner Skills | Pure listing addition — low review burden |

**Stuck / high-friction candidates** (technically strong but slow to merge):
- [#514 document-typography](https://github.com/anthropics/skills/pull/514) — broad applicability, ~6 months open
- [#486 ODT skill](https://github.com/anthropics/skills/pull/486) — format coverage gap, ~6 months open
- [#83 skill-quality/security-analyzer](https://github.com/anthropics/skills/pull/83) — meta-skills, ~10 months open

---

## 4. Skills Ecosystem Insight

> **The community's most concentrated demand is for a trustworthy Skills foundation — namespace integrity, repair of the skill-creator evaluation loop, and context-economy patterns (multi-agent delegation, compact memory, quality gates) — signaling that 2026's center of gravity has shifted from "what new skills can Claude do?" to "how do we make the skills ecosystem itself safe, reliable, and token-efficient?"**

---

### Methodology Notes
- PR ranking was derived from sort order in the source dataset cross-referenced with the prominence of linked Issues (#556, #1390, etc.), since numeric comment counts were not populated in the scraped PR data.
- All 20 listed PRs are OPEN; the repository appears to have a notable reviewer-side bottleneck relative to its submission volume, which is itself a structural signal worth flagging to maintainers.

---

# Claude Code Community Digest — 2026-09-07

## Today's Highlights

The community is dominated by **cost-control and multi-agent safety concerns** — multiple high-impact issues describe autonomous agent loops burning through Max-plan quotas and weekly limits, prompting a wave of related feature requests for spending guards. A persistent **cyber-safeguard regression** continues to block approved organizations and Sonnet 5 users on legitimate code-analysis work. On the release side, v2.1.263 shipped as a low-key reliability rollup, while contributor **AZERDSQ131** landed a coordinated batch of plugin/script hardening fixes (Windows path handling, shell-injection, symlink escapes).

---

## Releases

- **[v2.1.263](https://github.com/anthropics/claude-code/releases/tag/v2.1.263)** — Routine bug fixes and reliability improvements. No new features called out in the changelog.

---

## Hot Issues

1. **[#84352 — CVP-approved org still hits cyber-safeguard blocks (197 comments, 27 👍)](https://github.com/anthropics/claude-code/issues/84352)**  
   A previously approved organization is back to being blocked; the Verification Portal shows the application as "Under review" again. This is the longest-running active thread and reflects a systemic trust/approval loop problem.

2. **[#26224 — Hangs/freezes of 5–20+ minutes on prompts (130 comments, 151 👍)](https://github.com/anthropics/claude-code/issues/26224)**  
   The highest-upvoted issue in the digest. Persistent unresponsiveness across sessions suggests a contention or queueing issue in the orchestration layer that affects power users disproportionately.

3. **[#62699 — TUI text copy broken via `Ctrl+Shift+C` and right-click (42 comments, 68 👍)](https://github.com/anthropics/claude-code/issues/62699)**  
   A baseline UX failure in the terminal interface: users cannot copy Claude's output without workarounds. High 👍/comment ratio indicates a broad, reproducible pain.

4. **[#91188 — Make MEMORY.md auto-compaction threshold configurable (28 comments)](https://github.com/anthropics/claude-code/issues/91188)**  
   Asks for the hardcoded 200-line / 25 KB cap to be tunable or suppressible. Reflects growing reliance on auto-memory and the need for project-specific budgets.

5. **[#89467 — Windows desktop app is always-on-top with no toggle (16 comments, 14 👍)](https://github.com/anthropics/claude-code/issues/89467)**  
   A blocking desktop UX defect on Windows with no documented escape hatch — affects every Desktop user on the platform.

6. **[#80015 — Task-list tools (TaskCreate/Update/List/Get) missing after update (14 comments, 13 👍)](https://github.com/anthropics/claude-code/issues/80015)**  
   A regression where the model can no longer see or invoke task tools, even though the UI still shows tasks. The 1:1 comment-to-👍 ratio signals reproducible breakage.

7. **[#67500 — Context compaction drops critical behavioral rules (12 comments)](https://github.com/anthropics/claude-code/issues/67500)**  
   Session status blocks, memory-write directives, and no-stop policies are silently lost after compaction — a correctness and trust issue for long-running workflows.

8. **[#85520 — Inline images don't render in VS Code extension sidebar (2 comments, recent)](https://github.com/anthropics/claude-code/issues/85520)**  
   Affects both `Read` and `SendUserFile` paths under Remote-WSL, with a secondary turn-injection bug. Important for any image-driven workflow in VS Code.

9. **[#92565 — Sonnet 5 safeguards blocking legitimate code analysis (2 comments, recent)](https://github.com/anthropics/claude-code/issues/92565)**  
   Fresh companion to #84352, surfacing the false-positive pattern on the model side and explicitly pointing users at the Cyber Verification Program.

10. **[#90301 — Sanctioned secret-handoff primitive (1 comment, deep analysis)](https://github.com/anthropics/claude-code/issues/90301)**  
    Maps 18 related requests and proposes a single minimal primitive for securely passing secrets to Claude — a well-articulated RFC-style enhancement that often catalyzes follow-on work.

---

## Key PR Progress

1. **[#87079 — `**` glob patterns must match zero-depth paths (OPEN)](https://github.com/anthropics/claude-code/pull/87079)**  
   `fnmatch` was making `**/*.ts` rules in `security-patterns.json` silently skip top-level files despite the docstring. Important because the failure mode is silent non-coverage of security rules.

2. **[#87077 — Repair invalid YAML frontmatter in pr-review-toolkit (OPEN)](https://github.com/anthropics/claude-code/pull/87077)**  
   Agents were loading with empty frontmatter because dialogue lines like `Daisy: "..."` were parsed as nested mappings. A correctness fix for the review toolkit.

3. **[#68707 — `/bug` slash command for filing GitHub issues from the terminal (CLOSED)](https://github.com/anthropics/claude-code/pull/68707)**  
   A new `bug-reporter` plugin that lets users file structured reports without leaving Claude Code — could materially improve the signal-to-noise ratio in the tracker.

4. **[#68786 — Avoid shell injection in `test-hook.sh` via stdin redirection (CLOSED)](https://github.com/anthropics/claude-code/pull/68786)**  
   Fixes a real injection vector where `$TEST_INPUT` was embedded inside a `bash -c` single-quoted string. Worth highlighting for plugin developers.

5. **[#68689 — Block symlink escape in extensibility config reads (CLOSED)](https://github.com/anthropics/claude-code/pull/68689)**  
   Closes a local file-disclosure vulnerability where `.claude/claude-security-guidance.md` could be a symlink to `~/.ssh/id_rsa` or similar. Notable security hardening.

6. **[#68785 — Hook JSON to stdout, tighten su* glob, fix CI detection (CLOSED)](https://github.com/anthropics/claude-code/pull/68785)**  
   Three example-hook bug fixes in `plugins/plugin-dev/`, important because these are reference implementations other plugin authors copy.

7. **[#68701 — Strip CRLF from Python version probe on Windows (CLOSED)](https://github.com/anthropics/claude-code/pull/68701)**  
   Fixed Windows-only breakage caused by `\r\n` from Python output. A small but high-frequency environment fix.

8. **[#68699 — Python wrapper and normalized plugin-root paths on Windows (CLOSED)](https://github.com/anthropics/claude-code/pull/68699)**  
   Tackles backslash `CLAUDE_PLUGIN_ROOT` paths breaking inline bash, and the Microsoft Store `python3` stub returning exit code 49 silently.

9. **[#68702 — Guard `PROMPT_PARTS` expansion under `set -u` on bash 3.x (CLOSED)](https://github.com/anthropics/claude-code/pull/68702)**  
   Restores the `ralph-wiggum` plugin on stock macOS bash 3.x. A reminder that Bash 3 is still the default on a meaningful share of developer machines.

10. **[#68693 — Add duplicate label additively, don't replace existing labels (CLOSED)](https://github.com/anthropics/claude-code/pull/68693)**  
    The `closeIssueAsDuplicate` flow was erasing platform/area/priority labels on PATCH — a low-level but important fix for triage hygiene.

---

## Hot Discussions

*No GitHub Discussions data was provided in the source. Section omitted per the digest spec.*

---

## Feature Request Trends

- **Spending & multi-agent controls.** The single most-requested direction. Six issues converge on this: token/cost limits, agent-spawning ceilings, runaway retry-loop guards, and explicit user confirmation before fan-out (#90664, #87178, #89964, #91682, #77964, #89596).
- **Configurability of hardcoded thresholds.** The MEMORY.md compaction cap (#91188) is a representative case — users want project-specific tuning rather than one-size-fits-all defaults.
- **Multi-account & session portability.** Desktop users running personal + work accounts need sidebar sessions to persist across logins (#74662). 
- **Cross-environment continuity.** Chrome tools not inheriting into `claude remote-control` sessions (#74671), and Android push broken in Remote Control (#87003) — the "start session in one place, resume in another" story is incomplete.
- **Safer secret handling.** A coherent ask for a first-class, audited secret-handoff primitive rather than ad-hoc env files (#90301).
- **Desktop/TUI ergonomics.** Project-chat sort order (#87723), always-on-top toggle (#89467), inline image rendering (#85520), and copy-paste (#62699) form a clear UX backlog.

---

## Developer Pain Points

- **Uncontrolled cost growth is the #1 frustration.** A consistent pattern: autonomous loops or multi-agent fan-out silently consume 20%–100% of a weekly Max quota, sometimes triggering subscription-blowout anxiety (#87178, #77964, #89596, #89964, #91682, #90664, #77943). Users want visible meters, hard caps, and explicit confirmation before sub-agent spawning.
- **Cyber-safeguard false positives.** Approved organizations and legitimate code-analysis tasks are being blocked; the Verification Portal appears to lose prior approvals (#84352, #92565). This is causing real workflow disruption and shaping model-selection behavior.
- **Reliability regressions after updates.** Task-list tools vanishing (#80015), behavior rules lost after compaction (#67500), and multi-minute hangs (#26224) suggest insufficient regression coverage

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-07

## 1. Today's Highlights

No new releases shipped in the last 24 hours, but development activity remains heavy: ~20 PRs closed, dominated by worktree management, voice-host audio playback, and experimental user-verification APIs. The community's loudest signal today is reliability — "Selected model is at capacity" errors are disrupting ChatGPT Pro/Pro 20x users across multiple reports (#41790, #43322), while the most-upvoted discussion remains the long-standing request for a `/rewind` undo feature (118 👍).

## 2. Releases

No new releases in the last 24 hours.

## 3. Hot Issues

1. **[#28919](https://github.com/openai/codex/issues/28919) — Windows app missing "Control other devices" tab (63 💬, 59 👍)**
   The single most-engaged issue in the tracker. Windows Pro users still lack the remote device-control tab available elsewhere in Settings > Connections. Nearly three months old and still open — a persistent platform parity gap that continues to accumulate frustrated subscribers.

2. **[#41790](https://github.com/openai/codex/issues/41790) — "Selected model is at capacity" interrupting Pro tasks (16 💬)**
   Frequent mid-task capacity errors on ChatGPT Pro since Aug 31. Fresh report [#43322](https://github.com/openai/codex/issues/43322) (filed today, Pro 20x, model switching to GPT-5.6-sol doesn't help) confirms this is an active, ongoing service-side problem rather than a one-off.

3. **[#29811](https://github.com/openai/codex/issues/29811) — Goal compaction resurrects completed manual steer (14 💬)**
   In long-running `/goal` sessions, context compaction re-injects already-completed steering instructions before continuation resumes, causing the agent to redo or contradict prior user guidance. A subtle but high-impact context-management correctness bug.

4. **[#40596](https://github.com/openai/codex/issues/40596) — Windows unified exec fails with `helper_unknown_error` (13 💬)**
   Plus-tier users on Windows can't launch the unified exec terminal at all (`setup refresh had errors`), blocking sandboxed tool calls entirely. Part of a broader pattern of Windows-specific runtime breakage.

5. **[#10571](https://github.com/openai/codex/issues/10571) — "Bad request" error (28 💬)**
   Long-running (since Feb) but still receiving comments daily on CLI 0.94 + gpt-5.2 xhigh. The longevity suggests the error class remains under-diagnosed.

6. **[#41874](https://github.com/openai/codex/issues/41874) — Windows desktop selectively loses session history (8 💬)**
   Newer local sessions vanish after updates while older legacy threads survive, alongside incomplete project-assignment migration. Data-loss-adjacent issues like this erode trust in the desktop app's storage layer.

7. **[#8317](https://github.com/openai/codex/issues/8317) — Time-based scheduling for commands/tasks (38 👍)**
   High-demand enhancement: delayed, recurring, and conditional-polling task execution (e.g., "run tests nightly," "poll until healthy"). Users currently resort to cron wrappers. Nearly 9 months open.

8. **[#43237](https://github.com/openai/codex/issues/43237) — GPT-6 Astra rejects `hi` with `invalid_prompt` (2 💬)**
   Filed yesterday with an unusually rigorous isolated-CLI + minimal-backend reproduction across Linux/macOS. A minimal-prompt rejection points to a model-serving or prompt-validation bug worth watching.

9. **[#43295](https://github.com/openai/codex/issues/43295) — AGENTS.md auto-reload can overflow and lock a session (2 💬)**
   Reloading a changed `AGENTS.md` appends the full updated bundle while the original stays in-context, potentially pushing a working session past its context limit and bricking it. Directly relevant to anyone iterating on project instructions.

10. **[#40228](https://github.com/openai/codex/issues/40228) — Chrome native host out of date; uninstall/feedback fail (10 💬)**
    Representative of a cluster of Windows Chrome-integration failures (see also [#40357](https://github.com/openai/codex/issues/40357), [#42520](https://github.com/openai/codex/issues/42520), [#40923](https://github.com/openai/codex/issues/40923), closed [#39466](https://github.com/openai/codex/issues/39466)): stale `chrome-native-hosts-v2` entries, missing `codexCliPath`, and version-mismatch rejections between extension and host keep browser control read-only or broken after updates.

## 4. Key PR Progress

*(Note: today's PR stream is dominated by `copyberry[bot]` automation; all listed are closed unless noted.)*

1. **[#43286](https://github.com/openai/codex/pull/43286) — Managed worktree browser in TUI:** Searchable "Browse worktrees" view listing checkouts from the repo's pool with owner metadata, thread resume, and worktree-path copy. Big usability win for the worktree workflow.
2. **[#43279](https://github.com/openai/codex/pull/43279) — Linked worktrees in TUI session discovery:** Directory-scoped lookup no longer misses conversations living in linked worktrees of the same repo; also moves Git work off the event loop. Pairs with [#43298](https://github.com/openai/codex/pull/43298), which defers worktree transitions to fresh TUI iterations to avoid blocking the UI.
3. **[#43289](https://github.com/openai/codex/pull/43289) — Capability-gated MCP user verification:** Handles `openai/userVerification` via `openai/elicitation/create` with strict field/size/encoding validation — the plumbing for a human-verification flow. Builds on the contract definitions in [#43265](https://github.com/openai/codex/pull/43265) (`status`/`enroll`/`delete`/`verify` behind `experimentalApi`).
4. **[#43248](https://github.com/openai/codex/pull/43248) + [#43244](https://github.com/openai/codex/pull/43244) — Voice-host RTP playback:** Incoming RTP audio was previously drained and discarded; now routed through a GStreamer pipeline with jitter buffering and a bounded `GstAudioSink` (partial writes, cancellation on speaker-epoch changes). [#43144](https://github.com/openai/codex/pull/43144) adds Windows MSVC x64/ARM64 Bazel targets for the native voice libs.
5. **[#43308](https://github.com/openai/codex/pull/43308) — Windows app-server shutdown via socket:** Replaces shutdown sentinel files with authenticated `/daemon/shutdown` requests requiring the server PID — cleaner lifecycle management that may help Windows desktop reliability.
6. **[#43315](https://github.com/openai/codex/pull/43315) — Unique session-label resolution:** Commands no longer silently target the first matching session when labels are duplicated; preview text is accepted when no name is set.
7. **[#43253](https://github.com/openai/codex/pull/43253) — Read-only conversations on active-writer conflict:** Resuming a thread open in another app now falls back to a read-only transcript instead of erroring out.
8. **[#43177](https://github.com/openai/codex/pull/43177) + [#43261](https://github.com/openai/codex/pull/43261) — Server model defaults for TUI:** Fresh startup and background tasks now respect app-server effective configuration instead of possibly stale client-side model/reasoning settings.
9. **[#43147](https://github.com/openai/codex/pull/43147) — Gate experimental context by model capability:** Experimental context activation now checks model support (not just provider/account), and child sessions no longer blindly inherit token-budget activation. Relevant to the context-management discussions below.
10. **[#31471](https://github.com/openai/codex/pull/31471) — `ConnectorRuntimeManager` extraction (OPEN):** The only human-authored PR still active today; part 1 of 4 in the "faster-connectors" effort, isolating the Apps tools cache behind an immutable snapshot scoped by account/user/workspace — groundwork for faster connector refreshes.

Honorable mention: build-infra improvements [#43282](https://github.com/openai/codex/pull/43282)/[#43304](https://github.com/openai/codex/pull/43304) (opt-in Bazel stamping for better remote cache reuse) and [#43281](https://github.com/openai/codex/pull/43281) (npm staging moved to a least-privilege workflow job).

## 5. Hot Discussions

### Ideas
- **[#9618](https://github.com/openai/codex/discussions/9618) — "How is there not a /rewind or /revert feature?" (118 👍, 20 💬):** The highest-signal feature ask in the repo. Users point to OpenCode and Claude Code undo support; without it, "commit on every change" is the only safety net. Still no official response pathway visible.
- **[#14067](https://github.com/openai/codex/discussions/14067) — Cross-device session/thread sync (61 👍):** Threads and context remain machine-local, breaking multi-device workflows (work ↔ home). Long-running and heavily upvoted.
- **[#42703](https://github.com/openai/codex/discussions/42703) — Long-horizon context recursion risk:** A thoughtful analysis of whether `history`/`notes`/`new_context` retrieval can become recursively self-referential as summaries accumulate across context windows.
- **[#7366](https://github.com/openai/codex/discussions/7366) — Reference gitignored files with `@`:** `.gitignore` semantics shouldn't prevent context inclusion of local dependency/library files.

### Q&A
- **[#43257](https://github.com/openai/codex/discussions/43257) — Does experimental context history lookup consume usage limits?** Multi-day Pro users want clarity on whether context-window rollovers and history retrieval burn quota. Ties directly to PR #43147's capability gating.
- **[#40740](https://github.com/openai/codex/discussions/40740) — Rollout tracing and `Declined` exec status:** Deep-dive into `rollout/src/policy.rs` persistence exclusions (ExecApprovalRequest, GuardianAssessment) and auditability of approval decisions.

### Show and Tell
- **[#41157](https://github.com/openai/codex/discussions/41157) — CodexFuse 1.2.0:** Local Windows dashboard for Codex rate-limit visibility (used/available, next reset, hourly use). Popular precisely because quota opacity is a pain point.
- **[#43224](https://github.com/openai/codex/discussions/43224) — NULLYARD:** Public, login-free MCP board with static skill/MCP integration guides.

## 6. Feature Request Trends

1. **Session safety & portability:** `/rewind`/undo (#9618) and cross-device sync (#14067) are the two highest-voted asks in the entire tracker — a clear mandate for transactional session state.
2. **Quota transparency & planning:** Proactive quota-aware task planning (#42182), third-party limit dashboards (CodexFuse), and questions about context-management billing (#43257) all converge on "make limits visible and plannable."
3. **Scheduling & autonomy:** Time-based/recurring/conditional task execution (#8317) for unattended workflows.
4. **Platform parity for device control:** Windows "control other devices" tab (#28919) and Linux Computer Use support (#42846).
5. **Context-management controls:** Safer AGENTS.md reload (#43295), predictable compaction behavior (#29811), and guardrails against recursive history inflation (#42703).
6. **Better approval UX:** Human-approval fallbacks when Auto-review denies escalations (#41462), rather than exact "magic sentence" retyping.

## 7. Developer Pain Points

- **Capacity errors on paid tiers:** "Selected model is at capacity" is now a multi-report pattern (#41790, #43322) breaking mid-task agent runs for Pro and Pro 20x users — the top reliability complaint this week.
- **Windows desktop fragility:** A disproportionate share of high-comment issues are Windows-specific: invisible windows after update (#42714), unified exec failures (#40596), session loss (#41874), and a five-issue cluster around Chrome native-host version/config mismatches (#40228, #40357, #42520, #40923, #39466).
- **Rate-limit opacity:** Wrong-model usage attribution (#13854), intermittent zero prompt-cache hits despite stable `prompt_cache_key` (#30425), and no first-party limit visibility — pushing users to third-party dashboards.
- **Context-management edge cases:** Compaction resurrecting completed instructions (#29811), AGENTS.md reload bricking sessions (#43295), and uncertainty about how history retrieval maps to quota (#43257).
- **Stream/connectivity instability:** Long-lived transport errors ("stream disconnected before completion," #29087) and generic "Bad request" failures (#10571) remain unresolved for months, with poor diagnosability.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-07

## Today's Highlights
The v0.60.0 nightly pipeline shipped a routine version bump today (no headline changelog), while community attention is centered on a long-running **Pro-account verification loop** (#19936, 19 comments) and a **subagent termination reporting bug** where `codebase_investigator` reports `GOAL` success despite hitting `MAX_TURNS` (#22323). On the PR side, maintainers merged a wave of correctness fixes targeting **MCP tool name collisions**, **symlinked workspace globs**, **CRLF line-ending detection**, and a **Node 20 → Node 22 sandbox image bump** addressing an EOL security risk.

## Releases
- **v0.60.0-nightly.20260907.g85aca163f** ([compare](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260906.g85aca163f...v0.60.0-nightly.20260907.g85aca163f)) — automated nightly bump via [#29233](https://github.com/google-gemini/gemini-cli/pull/29233); no human-authored changelog entries.

## Hot Issues

1. **[#19936](https://github.com/google-gemini/gemini-cli/issues/19936) — Pro subscription stuck in verification loop (19 💬 / 👍5)**
   The most-discussed open issue: Pro users complete browser-side auth successfully but the CLI re-prompts verification indefinitely. High impact because it blocks paying customers; community is asking for clearer error states when OAuth callback tokens are not persisted.

2. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent reports `GOAL` success after `MAX_TURNS` (13 💬 / 👍2, p1)**
   `codebase_investigator` lies about its termination reason when it never actually analyzed anything. Important for any user relying on multi-agent pipelines; needs retesting.

3. **[#28088](https://github.com/google-gemini/gemini-cli/issues/28088) — Sudden sign-out / OAuth rejecting licensed org accounts (12 💬 / 👍5, CLOSED)**
   Enterprise users on Standard licenses were forcibly re-authenticated and then rejected. Resolved but the thread documents a regression pattern in OAuth token refresh for managed accounts.

4. **[#27466](https://github.com/google-gemini/gemini-cli/issues/27466) — `-p/--print` headless mode silent on Windows (7 💬, CLOSED)**
   AGY 1.0.2 on Windows produces no stdout output despite successful API calls. Closed after fix landed.

5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — EPIC: AST-aware file reads, search, and codebase mapping (7 💬 / 👍1)**
   Long-running investigation into using AST tools (e.g. tilth/glyph) to reduce misaligned reads and token noise; relevant for performance-conscious users.

6. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Agent rarely invokes custom skills / sub-agents (6 💬, p1)**
   Anecdotal but persistent: even with explicit descriptions, the model does not pick up `gradle`/`git` skills unless told to. Tied to sub-agent auto-dispatch logic.

7. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Deterministic redaction for Auto Memory (5 💬, security, p2)**
   Auto Memory currently relies on the extraction model to redact secrets post-hoc. SandyTao520's tracking issue argues for deterministic redaction before content enters model context.

8. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell hangs with "Awaiting user input" after command exits (4 💬 / 👍3, p1)**
   Even trivial commands (e.g. `echo`) leave the CLI stuck on the "Waiting input" prompt. High community reaction count relative to discussion size.

9. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 400 error when >128 (user reports ~400) tools enabled (3 💬)**
   The agent should be smarter about scoping the enabled tool list to avoid API rejection. Matters for users with many MCP servers.

10. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) — Discourage destructive commands (`git reset --hard`, DB drops) (3 💬 / 👍1)**
    Feature request to have the agent prefer safer alternatives in complex git/DB scenarios.

## Key PR Progress

1. **[#28975](https://github.com/google-gemini/gemini-cli/pull/28975) — `glob` results lost on symlinked workspace roots** *(closed)*: macOS `/tmp` users (which is a symlink to `/private/tmp`) were seeing `No files found` for valid patterns. Real-world macOS DX fix.

2. **[#28971](https://github.com/google-gemini/gemini-cli/pull/28971) — Truncated MCP tool names can collide** *(closed)*: Two MCP tools whose names agreed on first/last 30 chars collapsed to the same registry name. Adds a deterministic disambiguation strategy.

3. **[#28983](https://github.com/google-gemini/gemini-cli/pull/28983) — Mis-classifying files as CRLF on a single `\r\n` match** *(closed)*: `detectLineEnding` now measures ratio rather than presence, avoiding wholesale line-ending rewrites on mixed files.

4. **[#28973](https://github.com/google-gemini/gemini-cli/pull/28973) — Bump sandbox image `node:20-slim` → `node:22-slim`** *(closed, p1, security)*: Node 20 hit EOL on 2026-04-30. Critical security hygiene fix.

5. **[#28972](https://github.com/google-gemini/gemini-cli/pull/28972) — Guard `formatTruncatedToolOutput` against non-positive `maxChars`** *(closed, p1)*: Negative budgets were producing corrupt output via `slice(0, negative)`.

6. **[#29134](https://github.com/google-gemini/gemini-cli/pull/29134) — Protect current session from deletion in `--delete-session`** *(open)*: Active session ID flows through listing/deletion; adds suffix-match precision and regression tests.

7. **[#29184](https://github.com/google-gemini/gemini-cli/pull/29184) — Validate `git` args in Windows sandbox to block `git diff --output=`** *(open, p1, security)*: A read-only git subcommand could silently truncate arbitrary files via `--output`. Worth flagging as a real escape from the sandbox.

8. **[#28982](https://github.com/google-gemini/gemini-cli/pull/28982) — Build Remote Agent phone pairing (`gbr/1`) extension** *(closed)*: Sample extension enabling a phone to spectate a desktop CLI session via QR pairing. Signals an extension ecosystem emerging around session sharing.

9. **[#29106](https://github.com/google-gemini/gemini-cli/pull/29106) — Flush final SSE event on EOF without trailing blank line** *(closed)*: `CodeAssistServer` was dropping the last buffered event (and `finishReason`/usage metadata) on truncated streams.

10. **[#29230](https://github.com/google-gemini/gemini-cli/pull/29230) — Fix dead anchors across 7 docs pages** *(open)*: Unnumbered headings + stale numbered anchors cleaned up across `docs/cli/plan-mode.md` and others. Small but reduces friction for new users.

## Feature Request Trends

- **AST-aware toolchain integration** — #22745 and #22746 are exploring AST-based reads and codebase mapping (tilth, glyph) to reduce misaligned reads and token overhead.
- **Sub-agent observability & control** — #22598 (subagent trajectories in `/chat share`), #22232 (`browser_agent` lock recovery), #22267 (browser agent honoring `settings.json` overrides).
- **Safer agent behavior** — #22672 (avoid destructive commands), #26525/#26522/#26523 (Auto Memory hygiene: deterministic redaction, retry caps, invalid patch quarantine).
- **Tool ecosystem improvements** — #24246 (handle >128 enabled tools gracefully), #21968 (better auto-dispatch to custom skills/sub-agents).
- **Auth/identity stability** — #19936, #28088, #28062 all surface Pro/Enterprise auth fragility.

## Developer Pain Points

- **Authentication brittleness** for paid Pro and managed org accounts: silent re-auth loops, OAuth callback failures, and license mis-detection are the single largest source of community friction this window.
- **Agent reliability & honesty**: sub-agents reporting `GOAL` success after hitting turn limits, models silently creating temp scripts, and shell hangs after command exit (#22323, #23571, #25166) all erode trust in long-running agentic workflows.
- **Cross-platform headless mode**: `--print` mode silently failing on Windows (#27466) is a recurring theme — Windows parity for non-interactive CI usage is still catching up.
- **Sandbox/security escape hatches**: silent `git diff --output=` truncation (#29184) and EOL Node 20 in the sandbox image (#28973) suggest the sandbox boundary still needs more argument-aware validation.
- **CRLF handling on Windows**: multiple PRs (#28983, #29131, #29132) and #22466 show that CRLF detection/normalization is a persistent source of subtle diff and rewrite bugs.
- **MCP tool name collisions and tool-count ceilings** (#28971, #24246) indicate the model-context tool surface is being pushed harder than the registration layer was originally designed for.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI — Community Digest
**Date:** 2026-09-07

---

## 🔥 Today's Highlights

Activity in the Copilot CLI repo on 2026-09-07 is dominated by a large batch of new issues filed on 2026-09-06 — most of them tied to **regressions and edge cases introduced in 1.0.81-1 / 1.0.82**, particularly in **ACP (Agent Client Protocol) mode**, **BYOK networking**, and **input/form handling**. Two long-standing, well-upvoted issues were closed: the long-running aarch64 exec error (#827) and the GHEC data-residency 401 in `copilot -p` (#4527), alongside the highly-requested project-scoped plugins feature (#1665). No new releases shipped in the last 24 hours.

---

## 📦 Releases

*No new releases in the last 24 hours.* (Last closed issues reference versions up to **1.0.82** and the desktop app at **1.1.15**.)

---

## 🐛 Hot Issues

1. **[#1665 — Support Copilot CLI Plugins Scoped to Project or Repository (CLOSED)](https://github.com/github/copilot-cli/issues/1665)**
   Author **willmarkley**. With **18 👍 and 14 comments**, this is by far the most upvoted item in today's batch. The closing (after months of feedback) signals that per-repo plugin scoping is landing — a major usability win for teams who want reproducible plugin setups across repositories instead of per-user `~/.copilot` configuration.

2. **[#4527 — `copilot -p` 401 on GHEC data residency since 1.0.81-1 (CLOSED)](https://github.com/github/copilot-cli/issues/4527)**
   Author **AvitalLivshits** (4 👍). Important regression for enterprise users: non-interactive prompt mode was hitting `api.githubcopilot.com` instead of the tenant `<tenant>.ghe.com` endpoint, breaking login. Closure means the tenant-routing fix is confirmed for GHEC Data Residency customers.

3. **[#4695 — MCP OAuth tokens not reused across sessions](https://github.com/github/copilot-cli/issues/4695)**
   Author **DaveHolden2025** (5 comments). For HTTP MCP servers using OAuth PKCE, duplicate cache-key entries force repeated re-authentication. This is a high-friction issue for users wiring Copilot CLI into tools like Atlassian, Sentry, or custom enterprise MCP servers.

4. **[#4692 — Enterprise default model not picked up in CLI](https://github.com/github/copilot-cli/issues/4692)**
   Author **muhssamy** (4 comments). VS Code and GitHub Desktop correctly honor `MAI-Code-1.1-Flash`, but the CLI ignores the org-managed default. A parity bug that undermines enterprise admin policy enforcement.

5. **[#2644 — Shift+Arrow / Ctrl+A selection in prompt input](https://github.com/github/copilot-cli/issues/2644)**
   Author **mu88** (2 👍, 3 comments). Basic TUX-style text selection is missing in the CLI input box. Long-standing quality-of-life issue — small but the kind of friction every power user hits daily.

6. **[#4537 — ACP mode auto-approves tool calls (regression of #845)](https://github.com/github/copilot-cli/issues/4537)**
   Author **richardjv-msft** (2 👍). Since 1.0.81-1, `--acp` no longer sends `session/request_permission`, so shell commands and file edits execute without user consent. Critical regression for any third-party ACP client (editors, IDEs) that rely on permission prompts for safety.

7. **[#4720 — BYOK silently disables prompt caching (~5× cost)](https://github.com/github/copilot-cli/issues/4720)**
   Author **Jianshui**. Copilot CLI 1.0.82 BYOK sends requests without prompt-cache declarations, so providers report `cached_tokens=0`. Direct, measurable financial impact for BYOK users on Anthropic/OpenAI.

8. **[#4694 — WSL2: ~31 GB RSS and ~57% CPU with Claude Opus 5](https://github.com/github/copilot-cli/issues/4694)**
   Author **stark-antonio-almeida**. Long-running sessions on WSL with high reasoning effort balloon memory. Likely tied to context/reasoning buffer handling — a blocker for users on Linux dev machines.

9. **[#4706 — Malformed tool-call markup silently no-ops](https://github.com/github/copilot-cli/issues/4706)**
   Author **MortenBoysen**. Tool/function calls occasionally emit `<invoke>` / `court` markup that gets dropped instead of erroring. Reliability issue that can cause agents to silently skip critical actions.

10. **[#4735 — Assistant text folded into "Thought for Ns" hidden reasoning region](https://github.com/github/copilot-cli/issues/4735)**
    Author **Defiect**. User-facing prose immediately preceding a tool call is being reclassified as reasoning and hidden. Erodes transparency — users lose visibility into what the model actually said.

*Other noteworthy but lower-traffic items:* **#4738** (ask_user form discards typed input on Enter — high-severity data loss), **#3894** (agentStop fires on subagent turns, breaking `/review`), **#4743** (ACP `end_turn` emitted before background shell completion), **#4741** (HydraFusion + Astra plan acceptance stalls).

---

## 🔧 Key PR Progress

Only one PR was updated in the last 24 hours:

1. **[#4739 — docs: propose terminal-owned macOS notifications](https://github.com/github/copilot-cli/pull/4739)** — Author **anujb-msft**. A reference proposal (not a code change to the shipped CLI) documenting the macOS notification-click-delivery problem and providing an MIT-licensed, portable terminal-notification example with regression tests. Useful prior art for the desktop app team.

*Note: No other PR activity was reported in the last 24 hours.*

---

## 💬 Hot Discussions

*No discussion data was provided in the source feed — this section is omitted per formatting rules.*

---

## 📈 Feature Request Trends

Aggregating today's issues and requests, the most-requested directions are:

- **Project / repository-scoped configuration** (#1665). Plugins, agents, hooks, and prompts that travel with the repo rather than living in `~/.copilot`.
- **First-class editor-grade input UX in the TUI** (#2644, #4736). Shift+Arrow selection, Ctrl+A, Ctrl+E accepting inline autocomplete suggestions.
- **Better reliability and visibility for ACP integrations** (#4537, #4555, #4743). Permission prompts, background-task lifecycle, and clear session-idle signals for third-party clients.
- **BYOK parity and cost transparency** (#4720, #4733). Prompt caching, max_output_tokens accounting, and predictable truncation behavior.
- **Enterprise/admin parity with VS Code and Desktop** (#4692). Org-managed default models and tenant routing must apply uniformly.
- **Safer interactive forms** (#4738). Autosave / recoverable elicitation to prevent data loss.
- **Render fidelity for model output** (#4735). Don't fold user-facing prose into collapsed reasoning blocks.

---

## 😤 Developer Pain Points

The recurring frustrations developers are hitting with Copilot CLI today:

1. **Regressions in 1.0.81-1 / 1.0.82.** Multiple distinct issues (ACP permissions, GHEC routing, desktop session creation) trace back to the same recent releases — making upgrade guidance and rollback paths a recurring ask.
2. **Silent cost amplification under BYOK.** Caching being disabled without notification leads to surprise bills.
3. **Linux/WSL resource usage.** High RSS under sustained Opus-class reasoning effort is a real blocker on constrained dev machines.
4. **Inconsistent behavior between interactive and non-interactive modes.** `copilot -p` and `copilot --acp` diverge from interactive `copilot` in auth routing, permission prompts, and session lifecycle.
5. **Hidden reasoning hiding user-facing content.** When "Thought for Ns" swallows actual prose, debugging and trust both suffer.
6. **Fragile permission model for ACP clients.** Auto-approval of destructive operations without explicit `session/request_permission` is a security/workflow regression.
7. **Data loss in interactive forms.** `ask_user` losing typed input on Enter is a high-severity UX defect.
8. **Tool-call markup occasionally malformed with no error.** Failures are silent rather than surfaced, making diagnosis painful.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-07

## 1. Today's Highlights

The OpenCode v2.0 desktop app is undergoing a major performance overhaul, with contributor **Hona** landing a three-layer persistence rewrite (#47704 → #47705 → #47706) that replaces the renderer's `electron-store` write path with VS Code-style `Memento` + per-resource backups, eliminating 3-5s main-process freezes on Windows. Meanwhile, **OpenCode Go subscribers are hitting a wave of billing and rate-limit pain**: at least three open issues (#42935, #47613, #47703) report quota exhaustion and persistent HTTP 429s despite low displayed usage. Plugin/permission ergonomics also continues to generate discussion, with the top issue of the day (#7006, 25 👍) highlighting that `permission.ask` is defined but never fires.

---

## 2. Releases

_No new releases in the last 24h._

---

## 3. Hot Issues

| # | Issue | Why it matters | Reaction |
|---|---|---|---|
| [#7006](https://github.com/anomalyco/opencode/issues/7006) | `permission.ask` plugin hook defined but never triggered | Breaks the entire plugin-customization story for the new Permissions system; users can't write auto-approval plugins | 💬16 · 👍25 |
| [#45278](https://github.com/anomalyco/opencode/issues/45278) | Payment declined after 3 successful months | Billing reliability on a paid product — no card or bank change | 💬12 · 👍2 |
| [#24335](https://github.com/anomalyco/opencode/issues/24335) | Wildcard `*` rule overwrites lower permissions | Permission docs promise "last rule wins" but implementation contradicts it | 💬10 · 👍5 |
| [#42935](https://github.com/anomalyco/opencode/issues/42935) | OpenCode Go quota exhausted in ~20 min on DeepSeek V4 Flash | Cache reads mysteriously dropped to 0; strong billing/caching smell | 💬8 · 👍3 |
| [#32202](https://github.com/anomalyco/opencode/issues/32202) | Skill duplicate roots change `available_skills` across restarts | Non-deterministic skill resolution makes plugin behavior flaky | 💬8 · 👍1 |
| [#47613](https://github.com/anomalyco/opencode/issues/47613) | Go HTTP 429 with 12 h `retry-after` for ~3 days | Paying customer essentially locked out; `retryAfterMs` keeps resetting | 💬7 |
| [#36454](https://github.com/anomalyco/opencode/issues/36454) | TreeSitter client destruction → memory leak | Recurring `warn: TreeSitter client destroyed`; potential long-running memory growth | 💬6 |
| [#46628](https://github.com/anomalyco/opencode/issues/46628) | MCP `anyOf`/`oneOf`/`allOf` schemas 400 on Anthropic; MCP tools never reach `tool.definition` | Whole tool family unusable against Claude; blocks many real MCP servers | 💬5 |
| [#43758](https://github.com/anomalyco/opencode/issues/43758) | [Feature] Session-scoped terminals + optional terminal context for the model | Highly requested ergonomics improvement; terminals stuck workspace-scoped since #12468 | 💬4 |
| [#47703](https://github.com/anomalyco/opencode/issues/47703) | Go blocked at $24.54 of $60 quota; free models also blocked | Console says 101% total but per-model usage doesn't sum to it — quota math bug | 💬1 |

---

## 4. Key PR Progress

| # | PR | What it does |
|---|---|---|
| [#47704](https://github.com/anomalyco/opencode/pull/47704) | **perf(app):** cache storage namespaces and batch writes in the renderer | Layer 1/3 of Hona's persistence rewrite — bulk load + Map reads + bulk flush window, modeled on VS Code's `Memento`. |
| [#47705](https://github.com/anomalyco/opencode/pull/47705) | **perf(app):** serialize persisted stores on a schedule, not per setter | Layer 2/3 — defers writes to a save window, owner cleanup, and page hide. |
| [#47706](https://github.com/anomalyco/opencode/pull/47706) | **perf(app):** externalize large draft text into content-addressed chunks | Layer 3/3 — large pastes become fixed-size chunks so per-save cost stays constant. |
| [#47695](https://github.com/anomalyco/opencode/pull/47695) | **fix(desktop):** persist renderer state in SQLite instead of `electron-store` | (closed) Root cause of the 3–5 s Windows freeze; superseded by the layer stack above. |
| [#47694](https://github.com/anomalyco/opencode/pull/47694) | **fix(app):** give worktree creation a setup-length request deadline | (closed) Cancels the new 60 s request abort for `POST /api/worktree`, which needs 90–120 s for `git worktree add` + `commands.start`. |
| [#47427](https://github.com/anomalyco/opencode/pull/47427) | **fix(desktop):** prevent large paste crashes | Caps paste handling so desktop prompt stops lagging/crashing on huge text dumps. |
| [#45424](https://github.com/anomalyco/opencode/pull/45424) | **fix(core):** dispatch providers whose AI SDK package has no native route | `SessionRunnerModel.fromCatalogModel` hardcoded only 3 packages; this routes the rest. Closes #45426. |
| [#47702](https://github.com/anomalyco/opencode/pull/47702) | **fix:** route Muse Spark models to Responses API instead of Chat Completions | Muse Spark 1.2/1.3 were returning 0 tokens / HTTP 500. Closes #44659. |
| [#45482](https://github.com/anomalyco/opencode/pull/45482) | **fix(task):** make async subagent tasks answer honestly, once, in order, and stop | Sends a trailing request-only confirmation when called agents have outstanding async children. Depends on #43510. |
| [#42223](https://github.com/anomalyco/opencode/pull/42223) | **fix(tui):** correct working directory when continuing a session in a new directory | `opencode -c` was showing stale dir; SDK `pick()` lacked config.dir fallback. |
| [#47699](https://github.com/anomalyco/opencode/pull/47699) | **fix(cli):** pass `--model` through to the TUI entry | Root command accepted `--model` but dropped it before TUI start. |
| [#47635](https://github.com/anomalyco/opencode/pull/47635) | **fix(opencode):** resolve markdown agent prompts | Frontmatter `prompt:` was being overwritten by an empty Markdown body. |
| [#47175](https://github.com/anomalyco/opencode/pull/47175) | **fix(core):** clarify the read tool's offset validation error | Better error when models hallucinate a negative `offset`. |
| [#47262](https://github.com/anomalyco/opencode/pull/47262) | **fix(workflows):** skip close-issues and close-prs jobs on forks | Adds the standard `if: github.repository == 'anomalyco/opencode'` guard. |

---

## 5. Hot Discussions

_No discussion data was provided for this period — section omitted._

---

## 6. Feature Request Trends

Distilled from the open feature requests and improvements raised this week:

- **Better session UX** — Favourite/star sessions (#47700), session-scoped terminals with optional terminal context for the model (#43758), project name decoupled from folder name (#47708), sessions surviving `.git` removal (#47652).
- **First-class plugin surface** — A reserved **plugin dataflow / metrics panel** for live, per-session data without polluting chat (#46156); opt-in discovery of Claude Code `agents/` and `commands/` from `.claude/` dirs (#47650).
- **Provider documentation & coverage** — Document the existing Standard Compute provider (#47475); add Nous Research portal integration (#47515).
- **Permission customization** — Make `permission.ask` actually fire so plugins can implement auto-approval (#7006); fix the documented-but-broken "last rule wins" wildcard semantics (#24335).
- **Performance & desktop stability** — Continued demand for the SQLite-backed renderer state (now landed) and large-paste protection (#47427).

---

## 7. Developer Pain Points

1. **OpenCode Go billing chaos** — Three independent reports (#42935, #47613, #47703) describe quota exhaustion, persistent 12 h 429s, and quota math that doesn't sum to the displayed total. This is the loudest single pain point for paying users.
2. **Permissions system is half-shipped** — The new permission model (from #6319) has documented semantics that don't match the implementation (wildcard precedence in #24335) and a plugin hook (`permission.ask`) that never fires (#7006), frustrating plugin authors.
3. **MCP integration gaps** — Anthropic 400s on `anyOf`/`oneOf`/`allOf` input schemas (#46628), MCP tools never reaching `tool.definition`, OAuth `resource_metadata` ignored breaking AWS Bedrock AgentCore (#44790), and intermittent request timeouts against Ghidra MCP (#47584).
4. **Desktop performance on Windows** — Repeated GPU process crashes on launch (#46691), 3–5 s main-process freezes on tab close from `electron-store` sync writes (#47695), and large-paste crashes (#47425 / #47427). The Hona persistence stack (#47704–#47706) directly addresses this.
5. **Session/directory lifecycle quirks** — `opencode -c` in a fresh dir shows a stale dir (#42221), sessions vanish from `/sessions` after a project's `.git` is removed (#47652), and `opencode run` returns opaque `UnknownError` when the configured default model is deprecated (#46760).
6. **TUI / shell overhead** — Main thread pinned at ~100% CPU on idle spinning a ~15 fps spinner writev (#42306), and TreeSitter client destruction warnings hinting at a memory leak (#36454).
7. **Configuration footguns** — `opencode2 serve` rejects configured Basic Auth (#45856), saving CLI preferences overwrites symlinked `cli.json` breaking Stow-style dotfile management (#45067), and local TUI plugins fail to load in the node build (#42481).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-07

## Today's Highlights

The 24-hour window was dominated by **provider reliability and routing fixes**: the long-running `openai-codex` stuck-on-`Working...` issue (#4945) continues to draw heavy discussion, while several urgent breakages around OpenCode Go's new `x-opencode-session` header, GitHub Copilot GPT-6 Astra routing, and Claude Opus 5 via OpenRouter landed alongside corresponding fixes. The community also pushed forward **cross-provider fallback** as the dominant resilience theme — the same proposal shipped as three duplicate PRs (#9251, #9249, #9248), signaling strong consensus on the direction. On the UX side, fullscreen TUI scroll regression (#9052) and Windows shell/terminal quirks surfaced again.

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. **[#4945](https://github.com/earendil-works/pi/issues/4945) — `openai-codex` Connection Reliability Issues** *(OPEN, in progress, 76 comments, 👍32)*
   The single most active thread. Users report `gpt-5.5` via `openai-codex` silently hanging the TUI on `Working...` with no streamed text, tool calls, or errors — recoverable only via Escape, which aborts the turn. Marked `inprogress`, but the volume indicates upstream-side flakiness rather than a clean repro.

2. **[#7547](https://github.com/earendil-works/pi/issues/7547) — How do you use Pi on Windows? What issues are you seeing?** *(OPEN, 57 comments, 👍2)*
   A meta-issue explicitly soliciting Windows user experiences so maintainers can prioritize fixes, docs, or out-of-core workarounds. Recent close activity on Windows-specific bugs (#9229, #7175) reflects the pressure this thread has created.

3. **[#9052](https://github.com/earendil-works/pi/issues/9052) — Fullscreen TUI wheel scrolling is 3× slower than regular mode** *(OPEN, 6 comments, 👍3)*
   A noticeable UX regression in the otherwise-popular fullscreen mode. Users explicitly switched to fullscreen for the fixed input box but find the scroll performance unacceptable.

4. **[#8826](https://github.com/earendil-works/pi/issues/8826) — Cap agent retry backoff for prolonged transient outages** *(OPEN, 4 comments)*
   Concrete ergonomics ask: bounded the unbounded exponential backoff in agent-level retries so long-running sessions don't wedge on transient upstream `503`s.

5. **[#9229](https://github.com/earendil-works/pi/issues/9229) — Windows: `shell_path` ignored, always prefer WSL bash** *(CLOSED, 4 comments)*
   On Windows 11 with WSL feature disabled, `settings.json` `shell_path` is ignored. Closed (likely shipped) — a clear win for Windows users.

6. **[#9209](https://github.com/earendil-works/pi/issues/9209) — GitHub Copilot GPT-6 Astra routed to unsupported `/chat/completions`** *(CLOSED, 4 comments)*
   Direct routing bug for the new Copilot model — already addressed by PR #9253 in the same window.

7. **[#9246](https://github.com/earendil-works/pi/issues/9246) — Anthropic: spend the unused 4th cache breakpoint on a stable checkpoint** *(CLOSED, 3 comments)*
   A nice cost/perf optimization for `anthropic-messages`: Anthropic accepts 4 breakpoints but Pi only emits 3, leaving a free cache hit on the table.

8. **[#9247](https://github.com/earendil-works/pi/issues/9247) — JSON/RPC: expose provider-native terminal failure classification** *(CLOSED, 3 comments)*
   Extension authors want machine-readable failure categories (context overflow, refusal, transient, unknown) on JSON/RPC assistant events.

9. **[#8306](https://github.com/earendil-works/pi/issues/8306) — Fullscreen TUI image rendering only shows top line** *(CLOSED, 3 comments)*
   Closed as `no-action` despite a clear visual bug — note for the community that some UX regressions in fullscreen mode remain unresolved.

10. **[#9165](https://github.com/earendil-works/pi/issues/9165) — Claude Opus 5 via OpenRouter rejects per-message `output_config`** *(CLOSED, 3 comments)*
    A provider-specific compatibility fix where Pi was sending a field that OpenRouter rejects for that model. Closed via workaround.

11. **[#8617](https://github.com/earendil-works/pi/issues/8617) — Codex: use file references for image-heavy tool results** *(OPEN, 3 comments)*
    Author has a working prototype; asks only whether to upstream the change. Could meaningfully cut payload size and latency for image-heavy sessions.

## Key PR Progress

1. **[#6881](https://github.com/earendil-works/pi/pull/6881) — `feat(ai)`: use provider-reported cost when responses include it** *(OPEN, in progress)*
    Plumbs `usage.cost` and BYOK upstream-inference cost into `usage.cost.total`, falling back to catalog rates. Important for accurate billing on BYOK and Vercel-style providers.

2. **[#9253](https://github.com/earendil-works/pi/pull/9253) — `fix(ai)`: route Copilot GPT models through Responses (fixes astra)** *(OPEN)*
    Fixes #9209. Future-proofs Copilot routing since `gpt-4` models are no longer in their catalog.

3. **[#9252](https://github.com/earendil-works/pi/pull/9252) / [#9250](https://github.com/earendil-works/pi/pull/9250) — Pin undici `connect.lookup` to system `dns.lookup`** *(CLOSED)*
    Fixes MagicDNS / split-horizon resolution (`#9244`). Duplicates merged — the fix is in.

4. **[#9251](https://github.com/earendil-works/pi/pull/9251) / [#9249](https://github.com/earendil-works/pi/pull/9249) / [#9248](https://github.com/earendil-works/pi/pull/9248) — Cross-provider fallback on transport errors** *(CLOSED, duplicates)*
    Implements #9242: an opt-in fallback chain so sessions hop to another registered provider/model on transport/DNS/timeout failures. Strong community signal on this direction.

5. **[#9080](https://github.com/earendil-works/pi/pull/9080) — `feat(tui)`: add jump-to-latest control** *(CLOSED)*
    Builds on `@dgtlntv`'s new-message-indicator branch — a long-asked UX win for long sessions.

6. **[#9233](https://github.com/earendil-works/pi/pull/9233) — Resolve model auth live instead of from startup snapshot** *(CLOSED)*
    Eliminates a race where the availability snapshot is unsettled at startup, causing false "no auth" failures. Real correctness fix.

7. **[#7610](https://github.com/earendil-works/pi/pull/7610) — Add LLM Gateway and LLM Gateway DevPass providers** *(OPEN)*
    OpenRouter-style router contributed by the LLM Gateway team. Continues Pi's pattern of shipping first-class provider integrations.

8. **[#9137](https://github.com/earendil-works/pi/pull/9137) — Add Nix flake** *(OPEN, WIP)*
    Author marked WIP. A frequently-requested packaging format on Linux/NixOS — worth watching.

9. **[#9224](https://github.com/earendil-works/pi/pull/9224) — Clamp OpenRouter `:free` `maxTokens` to base model** *(CLOSED)*
    `:free` catalog entries overstate limits, causing 400s on models with smaller context (e.g. `minimax-m3:free`). Small but high-impact provider hygiene.

10. **[#9222](https://github.com/earendil-works/pi/pull/9222) — Reject reload during active session operations** *(OPEN)*
    Fixes a subtle RPC race: tool succeeds but wrapper hits an invalidated runner, producing a spurious error sent back to the model.

11. **[#9096](https://github.com/earendil-works/pi/pull/9096) — Add Meta provider with Muse subscription OAuth** *(OPEN)*
    New provider with quirky daily re-minting auth and "burst" streaming. Resolves #7543.

12. **[#9219](https://github.com/earendil-works/pi/pull/9219) — Preserve host UI prototype methods and Proxy traps in `wrapUIPromptContext`** *(CLOSED)*
    Subtle but real: object spread was silently dropping host-provided methods on `ExtensionUIContext`, breaking embedders.

## Hot Discussions

### Ideas
- **[#9146](https://github.com/earendil-works/pi/discussions/9146) — Per-repo override for API Key and ignore `auth.json`** *(2 comments, 👍1)*
  Author wants to keep a 1Password-backed OpenRouter key globally, but pin a different key (and skip `auth.json`) on a specific repo. Use case is reproducible experiments / eval work where you don't want a personal key charged. Worth supporting alongside the existing `--provider` flag.

## Feature Request Trends

- **Provider resilience & portability** is the single loudest theme: cross-provider fallback chains (#9242/9251/9249/9248), bounded retry backoff (#8826), accurate provider-reported cost (#6881), live auth resolution (#9233), and per-call tool confirmation (#9227/#9228).
- **TUI polish**: fullscreen mode ergonomics (fixed input vs. scroll perf vs. image rendering — #9052, #8306, #9240), jump-to-latest (#9080), incremental scroll in conversation tree (#5786), and runtime TUI mode switching for extensions (#9238).
- **New

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-07

## 1. Today's Highlights

Qwen Code shipped **v0.23.1-preview.1**, headlined by Web Shell dynamic workflow visualization and management (#10594), though the release pipeline hit a snag — the `integration_docker` job failed (#11185), echoing broader CI efficiency concerns raised in #11109. Security took center stage in the issue tracker: a **P1 report (#11198)** that default-on usage-statistics telemetry uploads raw tool-error text (including shell command lines) without redaction, plus a P1 skills-hook enforcement bypass after `--continue` (#11180). Meanwhile, the **mesh orchestration** stack advanced rapidly with three fresh PRs (#11225, #11229, #11230), and the ink→OpenTUI migration (#8662, 30 comments) neared parity with #11152.

## 2. Releases

- **[v0.23.1-preview.1](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.1-preview.1)** — `feat(web-shell)`: visualize and manage dynamic workflow runs ([#10594](https://github.com/QwenLM/qwen-code/pull/10594) by @qqqys); `perf(web-shell)`: derive the session workflow project. Note: the release run's `integration_docker` job failed ([#11185](https://github.com/QwenLM/qwen-code/issues/11185)).
- **[v0.23.0-nightly.20260906.92a8a8d179](https://github.com/QwenLM/qwen-code/releases)** and **[v0.23.0-nightly.20260905.0c945a6136](https://github.com/QwenLM/qwen-code/releases)** — nightly builds carrying the same web-shell workflow changes.

## 3. Hot Issues

1. **[#8662](https://github.com/QwenLM/qwen-code/issues/8662) — Migrate TUI rendering from ink to OpenTUI (tracking)** · 30 comments. The most-discussed issue of the day: the current ink 7 + React 19 stack carries a ~1037-line patched renderer and structural flicker/responsiveness problems. This tracking issue charts the full migration; PR #11152 lands the final parity gaps.
2. **[#11198](https://github.com/QwenLM/qwen-code/issues/11198) — Telemetry uploads raw tool-error text without redaction (P1)** · Shell failure text, including full command lines, flows into the default-on RUM endpoint. Pre-existing on `main` and broader than the field flagged in #10916; marked ready-for-human.
3. **[#11180](https://github.com/QwenLM/qwen-code/issues/11180) — Skill `PreToolUse` hook stops enforcing after `--continue` (P1)** · A safety-gate hook that validates injected session IDs works initially but silently stops firing on resumed sessions while its instructions remain in context — a real security-envelope regression for skills-based workflows.
4. **[#6181](https://github.com/QwenLM/qwen-code/issues/6181) — Mobile session switching jank in Web Shell (P1)** · A four-layer cost stack (sidebar polling, uncompressed full-history loads, per-frame O(transcript) rendering) freezes the UI for seconds on large sessions during drawer close animations. Ready-for-agent.
5. **[#11031](https://github.com/QwenLM/qwen-code/issues/11031) — Exported HTML embeds the entire Web Shell runtime (P1, closed)** · Every `/export html` file shipped ~19.5 MB even for empty sessions due to the full dependency graph being inlined. Closed this cycle — a big win for shareable transcripts; follow-up leakage tracked in #11100.
6. **[#11217](https://github.com/QwenLM/qwen-code/issues/11217) — Anthropic SSE failures report successful headless JSON results (P2)** · Reproduces the false-success class from #8920 against Anthropic-compatible SSE: headless runs exit 0 with well-formed JSON despite stream failures. Badly breaks CI/automation trust.
7. **[#11146](https://github.com/QwenLM/qwen-code/issues/11146) — Pre-aborted tool requests stuck behind unrelated batches (P2)** · `CoreToolScheduler.schedule()` can leave an already-cancelled request queued behind an active batch; related cleanup gap in #11162.
8. **[#11109](https://github.com/QwenLM/qwen-code/issues/11109) — release.yml repeats work; a 20-minute step verifies nothing (P2)** · Two release runs timed out the day this was filed, making it directly relevant to today's failed v0.23.1-preview.1 release (#11185).
9. **[#11227](https://github.com/QwenLM/qwen-code/issues/11227) — `/effort` not propagated to OpenAI-compatible backends (P2)** · Reasoning-effort selection updates locally but never reaches the HTTP request for third-party OpenAI-compatible endpoints — a recurring compatibility pain point.
10. **[#10247](https://github.com/QwenLM/qwen-code/issues/10247) — Better Agent Team: stability audit follow-ups (P2)** · The single tracking point for multi-agent quality work, grouping race-condition fixes and `welcome-pr` items for contributors.

## 4. Key PR Progress

1. **[#11152](https://github.com/QwenLM/qwen-code/pull/11152) — OpenTUI parity closeout (dialogs, composer, shell mode)** · Closes the last known behavioral gaps versus the ink renderer — auth dialog auto-open, deferred updates, shell-mode behaviors — plus the acceptance harness that proves them.
2. **[#11225](https://github.com/QwenLM/qwen-code/pull/11225) — Mesh: hidden host session launcher** · Adds a workspace-scoped hidden mesh host with a private launch route, lock-based claiming, cross-launch reuse, and reaper-based restore.
3. **[#11229](https://github.com/QwenLM/qwen-code/pull/11229) / [#11230](https://github.com/QwenLM/qwen-code/pull/11230) — Mesh: run binding, turn prompt envelope, and thread status** · Pure, runtime-provable foundations (per-turn ambient run binding, close-obligation-derived thread status) landing ahead of the thread tools that depend on them.
4. **[#11086](https://github.com/QwenLM/qwen-code/pull/11086) — Scope extensions to workspace runtimes** · Reconciles the global extension catalog into per-workspace runtimes with workspace-qualified daemon/SDK access, updating the composer `@` menu and extension management.
5. **[#10183](https://github.com/QwenLM/qwen-code/pull/10183) — Structured on-demand memory recall** · Evolves auto-memory from flat prompt injection to a push/pull protocol: two-level corpus tree, query-focused metadata subtrees, and a dedicated recall tool.
6. **[#11015](https://github.com/QwenLM/qwen-code/pull/11015) — Named-session worktree reset (Channels Part 4B)** · `/clear`, `/new`, and `/reset` now work on worktree-isolated tasks while preserving daemon-attested worktree, files, and branch.
7. **[#10347](https://github.com/QwenLM/qwen-code/pull/10347) — Auto-retry transient network errors (EOF)** · Reclassifies wrapped low-level transport failures (e.g., `400 network error ... EOF`) as retryable, extending bounded auto-retry to channels where Ctrl+Y is unavailable.
8. **[#7957](https://github.com/QwenLM/qwen-code/pull/7957) — Paste copied Windows files** · File Explorer clipboard selections become image attachments or file references via the existing paste path.
9. **[#11169](https://github.com/QwenLM/qwen-code/pull/11169) — Local-files bridge trust-gate fixes** · Carries four review fixes that missed the squash merge of #10962, closing trust-gate and bystander gaps in the workspace-route judgement.
10. **[#10421](https://github.com/QwenLM/qwen-code/pull/10421) — Screen content filters at every authorized rewrite** · Ensures the efficacy probe's throwaway-tree rewrites all execute locally configured content filters; related hardening regression tracked in #11205.

## 5. Hot Discussions

*Omitted — no discussion data was provided in this cycle's dataset.*

## 6. Feature Request Trends

- **Web Shell performance & footprint**: export-size bloat (#11031, #11100), mobile jank (#6181), and transcript runtime decoupling dominate — the `roadmap/export-data` and `scope/web-shell` labels appear repeatedly.
- **Multi-agent orchestration**: the mesh series (#11225/#11229/#11230), Agent Team quality backlog (#10247), and channel/worktree isolation (#11015, #11186) show sustained investment in coordinated agent workflows.
- **Terminal UX modernization**: OpenTUI migration (#8662, #11152, #9305) is the clear UI theme of the quarter.
- **Third-party provider compatibility**: `/effort` propagation (#11227), Anthropic SSE error semantics (#11217, #11215), and ACP parity features like message queuing mid-turn (#8542).
- **Memory & context management**: structured recall (#10183) and `/compress` stabilization (#11094).

## 7. Developer Pain Points

- **Silent failure modes erode trust**: false-success headless JSON on SSE errors (#11217), `ask_user_question` reporting "User declined" without showing the question (#9011), and swallowed subcommand arguments at bootstrap (#11193).
- **Security gates that stop gating**: skills `PreToolUse` hooks bypassed via `--continue` (#11180) or not invoked via `/skill-name` (#11067, closed) — plus unredacted telemetry (#11198) — top the privacy/security frustrations.
- **CI flakiness and pipeline waste**: release timeouts (#11109, #11185), flat-timeout E2E kills under pool contention (#11209, closed; retry added in #11134), and autofix loops that can ship regressions for free (#10188, #11214).
- **Cancellation/abort edge cases**: a cluster of scheduler bugs around aborted tool requests (#11146, #11162, #11232) suggests the async cancellation path needs a dedicated audit.
- **Error-detail hygiene**: `[object Object]` in daemon logs (#11123) and dropped `resource_link` attachments on transcript replay (#11178) degrade debuggability and data fidelity for SDK consumers.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*