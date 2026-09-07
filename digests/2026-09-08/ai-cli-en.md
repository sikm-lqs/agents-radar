# AI CLI Tools Community Digest 2026-09-08

> Generated: 2026-09-07 23:30 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report — AI CLI Ecosystem, 2026-09-08

## 1. Ecosystem Overview

The AI coding-agent CLI market has consolidated around two archetypes: vendor-tethered flagships (Claude Code, Codex, Gemini CLI, Copilot CLI) that monetize subscriptions and first-party models, and provider-agnostic challengers (OpenCode, Pi, Qwen Code) competing on openness, local inference, and multi-provider routing. Across all seven projects, the engineering frontier has shifted from "can the agent code" to "can the agent's *session* survive" — durability, resume, undo, and retention dominate every tracker. Interop standards (ACP for agent-to-agent, MCP for tooling) are becoming the connective tissue of the ecosystem, with Qwen already delegating subagent turns to Claude Code over ACP. Meanwhile, shared growing pains — Windows as a second-class platform, quota/billing opacity, and resource-discipline failures (20 GB rollout files, OOMs, futex storms) — remain unsolved industry-wide.

## 2. Activity Comparison

*Counts reflect items surfaced in today's digest (hot-issue / key-PR lists), not total repo activity. Discussions marked N/A where the feed provided no data — several repos route community traffic through Issues instead.*

| Tool | Issues (tracked) | PRs (tracked) | Discussions | Release Status |
|---|---|---|---|---|
| Claude Code | 10 | 2 | N/A (not in feed) | None in last 24h |
| OpenAI Codex | 12 (10 + 2 tracked) | 16 (10 + 6-part Guardian refactor) | 8 (3 ideas, 1 official, 4 show-and-tell) | ✅ rust-v0.154.0-alpha.6 |
| Gemini CLI | 10 | 10 | N/A (not in feed) | ✅ v0.60.0-nightly.20260907 |
| Copilot CLI | 21 (10 + 11 notable) | 2 | N/A (not in feed) | None (1.0.83/1.1.15 regressions active) |
| OpenCode | 10 | 10 | N/A (not in feed) | None |
| Pi | 10 | 10 | N/A (not in feed) | None |
| Qwen Code | 10 | 12 | N/A (not in feed) | ✅✅ 3 (preview.2, nightly, cua-driver-rs v0.20.4) |

**Notable:** Codex shows the highest engineering throughput; Qwen shipped the most artifacts; Copilot CLI shows the highest issue inflow against near-zero external PR activity — a signature of closed, rapid release churn.

## 3. Shared Feature Directions

- **Session durability & recovery** — *all seven tools*. Claude Code transcript deletion (#59248/#62476), Copilot CLI permanently wedged sessions (#4755) and workspace locks (#4742/#4756), OpenCode reboot-surviving `busy` locks (#43277), Qwen daemon reclaim/busy-idle reconciliation (#8586, #11118, #11119, #11070), Gemini unpersisted `/compress` (#21335), Pi settlement/continuation bugs (#5886), Codex mid-turn abort gaps (#4945-analog demand).
- **Undo / rewind / change safety** — Codex's top community ask (#9618, 119 👍) explicitly cites Claude Code and OpenCode as having it; OpenCode is actively hardening snapshot revert (#47861). Table-stakes feature with a clear laggard.
- **Multi-agent orchestration via ACP** — Qwen delegates subagent turns to external agents over ACP (#11003) and builds an in-product agent mesh (#11206); Copilot CLI has ACP contract violations (#4743); OpenCode emits ACP plan updates (#41132); Codex users request cross-agent intent maps (#36719); Claude Code exposes `ListAgents`/`SendMessage` gaps (#84894).
- **Persistent memory systems** — Claude Code MEMORY.md threshold control (#91188), Gemini Auto Memory redaction-before-context and retry loops (#26522–#26525), Qwen semantic-memory MCP for local hosts (#10684), plus Codex community tooling (Blume.codes) converting session history into rules.
- **Multi-provider routing & BYO/local inference** — Pi's whole-day theme (Copilot GPT-6 Astra routing #9253, Fable 5 fallback #9297, OpenRouter free-tier caps #8760, Bedrock image nesting #8643); OpenCode provider breaks (Mistral GLM-5.2 #43199, Bedrock #40663) and an OpenAI-compatible endpoint ask (#31724); Qwen llama-server grammar regressions (#10530); Claude Code `ANTHROPIC_BASE_URL` gateway support (#84852).
- **Quota/billing transparency** — Codex capacity errors despite visible quota (#43337) spawning third-party dashboards (CodexFuse); Claude fast-mode exclusion from Max plans (#83302); OpenCode Go-plan Zen-balance fallback failure (#42938); Qwen Bailian billing complaints (#44).

## 4. Differentiation Analysis

**Vendor flagships:**
- **Claude Code** — Enterprise-managed-desktop focus (MSIX, apps gateway, IT policy keys #83723) and subscription ergonomics. Closed core (2 PRs, one novelty). Current crisis is *trust*: silent 30-day transcript deletion with no opt-out is a data-governance liability, not just a bug.
- **Codex** — Broadest surface (TUI + desktop + iOS remote + WebRTC voice #43581) and deepest internal architecture work (6-PR Guardian context-registry consolidation, user-verification provider stack). Also the only project shipping novelty UX (Pets) that generates net-negative signal (#41513, #34349).
- **Gemini CLI** — Most security-forward: sandbox filesystem hardening, host-credential isolation (#29214/#29216), EOL runtime bumps. Strategic bets on AST-aware, token-frugal tooling (#22745) against a 36.6k-token/turn baseline.
- **Copilot CLI** — Protocol-compliance focus (MCP OAuth/cancellation/User-Agent #4759/#4681/#4017; ACP) and enterprise fail-closed policy posture (#4757). Differentiated by regression velocity: the 1.0.83 cluster (stdio timeouts #4753, Azure MCP #4749, TUI CPU #4750) is pushing automated-workflow users to pin 1.0.82.

**Open challengers:**
- **OpenCode** — Positioning as the provider-agnostic hub; loudest demand is IDE integration (#11176, 147 👍) and BYOK exposure (#27303). Architecturally converging CLI/TUI/web sessions.
- **Pi** — Power-user/extension-author focus: mid-conversation system-message refactor (#9116/#9117), extension streaming APIs (#9272), headless SDK performance budgets (O(n²) fixes, grep OOM #9276). Fastest provider-catalog correction loop.
- **Qwen Code** — Most aggressive roadmap: Web Shell as a full work IDE (previews, split-view, git management), multi-agent mesh, cross-tool ACP delegation, local inference, and China-specific surfaces (DingTalk channels, Bailian). Undergoing a structural renderer migration (ink→OpenTUI, #8662) that currently taxes CI.

## 5. Community Momentum & Maturity

- **Highest shipping velocity:** Codex (16 PRs + alpha + 8 discussion threads) and Qwen (12 PRs, 3 releases) are iterating fastest; Gemini and Pi show steady, well-triaged throughput (P1/P2 labels; named maintainers).
- **Highest engagement signals:** OpenCode #11176 (147 👍), Codex #9618 (119 👍), Pi #4945 (77 comments), Qwen #8662 (32 comments), Claude #59248 (41 comments) — deep, sustained threads rather than drive-by +1s.
- **Adoption-maturity markers:** Claude Code and Codex issue queues are dominated by billing, enterprise deployment, and retention policy — symptoms of mainstream, paid, organization-scale usage. Gemini (pre-0.60) and Copilot CLI (1.x regression churn) are in hardening phases; OpenCode and Pi are community-led and architect-driven; Qwen is the most experimental, with a major renderer migration in flight.
- **Risk pattern:** Copilot CLI's combination of high issue inflow, near-zero external contributions, and version-pinned users indicates release cadence outpacing QA. Claude Code's low PR throughput with high issue engagement is expected for a closed core, but the unresolved data-loss cluster is eroding goodwill (32 👍 in a day).

## 6. Trend Signals

1. **Sessions are becoming stateful infrastructure.** Every tool's worst bugs are lifecycle bugs (stuck, wedged, deleted, unrecoverable). Durability, resume, and *undo* are the new baseline; Codex's 119-👍 rewind thread shows users now assume it.
2. **A verification/audit tooling market is forming around agents.** DoneAudit (claim verification), deja-vu (cross-agent recall), Blume.codes (drift countermeasures), CodexFuse (quota dashboards) all emerged in one feed — third parties are monetizing the trust gap.
3. **ACP and MCP are the interop seams — and the risk surface.** Cross-agent delegation (Qwen→Claude Code) is live, but protocol-compliance gaps (Copilot's missing MCP cancellation, ACP `end_turn` ordering) break integrations. Treat agent interop contracts as you would API contracts.
4. **Provider-agnostic routing is a durable moat for open tools.** Local inference demand (llama-server, BYOK, OpenAI-compatible endpoints) keeps growing while hosted billing opacity (four separate billing complaints today) drives churn.
5. **Windows remains underserved everywhere** — deadlocks, process leaks (Qwen's 347 conhost children / 2.8 GB), install breakage, and Code Integrity blocks span five of seven tools. A meaningful differentiation opportunity.
6. **Agent resource discipline is now a production concern** — 20 GB rollout files (Codex #37346), grep OOMs (Pi #9276), 1.18M futex calls/sec (Codex #43170), idle-CPU burn (Copilot #4750).

**For technical decision-makers:** pin versions during regression windows (Copilot 1.0.83), treat transcripts/memory as data-governance surfaces (Claude's retention behavior), commit-often until undo is universal, and standardize on MCP/ACP-compliant tooling — the ecosystem's compatibility seams are where the next quarter of breakage and opportunity will concentrate.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Reporting period through 2026-09-08 | Source: github.com/anthropics/skills**

*Note: PR comment counts were not available in the dataset, so the PR ranking below is based on content significance, breadth of impact, and update recency. Issue comment counts are real and used directly.*

---

## 1. Top Skills Ranking

Based on impact scope, technical depth, and engagement signals in the data window:

**① skill-creator: fix run_eval.py — #1298** — [OPEN](https://github.com/anthropics/skills/pull/1298)
Critical infrastructure fix: `run_eval.py` was reporting `recall=0%` for every skill, rendering the description-optimization loop useless (10+ reproductions, see #556). The PR also resolves Windows subprocess streaming and parallel worker bugs. **Impact:** unblocks the entire skill-quality tooling pipeline.

**② document-typography — #514** — [OPEN](https://github.com/anthropics/skills/pull/514)
New skill preventing typographic defects in AI-generated documents (orphan words, widows, numbering misalignment). Positioned as universal — "affects every document Claude generates."

**③ Improve frontend-design — #210** — [OPEN](https://github.com/anthropics/skills/pull/210)
Revision of an existing popular skill to make instructions concretely actionable within a single conversation. Long-lived discussion (last updated 2026-03-07), indicating ongoing iteration pressure.

**④ skill-quality-analyzer & skill-security-analyzer — #83** — [OPEN](https://github.com/anthropics/skills/pull/83)
Two meta-skills: a 5-dimension quality analyzer and a security analyzer. Notable because they self-reflect on the skill ecosystem — directly relevant to the trust-boundary concerns raised in #492.

**⑤ Hivemind — Multi-Agent Orchestration — #1628** — [OPEN](https://github.com/anthropics/skills/pull/1628)
Delegates mechanical work to free headless workers via opencode while keeping Claude Code as planner/reviewer. Innovative pattern addressing the "expensive model context is scarce" framing.

**⑥ self-audit (v1.3.0) — #1367** — [OPEN](https://github.com/anthropics/skills/pull/1367)
Pre-delivery verification skill: mechanical file checks first, then four-dimension reasoning audit in damage-severity order. Universal across stacks/models — maps to Issue #1385's "Quality Gate Pipeline" proposal.

**⑦ ODT skill — #486** — [OPEN](https://github.com/anthropics/skills/pull/486)
Fills the OpenDocument gap: create, fill, read, and convert .odt/.ods files. Important for ISO/open-source document workflows.

**⑧ testing-patterns — #723** — [OPEN](https://github.com/anthropics/skills/pull/723)
Comprehensive testing skill covering Testing Trophy, AAA pattern, React Testing Library, etc. Strong developer-workflow signal.

**Honorable mentions:** [scnet-hpc #1615](https://github.com/anthropics/skills/pull/1615) (HPC domain), [buffer-api #1627](https://github.com/anthropics/skills/pull/1627) (agent-portable social scheduling), [web-artifacts-builder fixes #1362](https://github.com/anthropics/skills/issues/1362) (pnpm ≥10 compatibility).

---

## 2. Community Demand Trends (from Issues)

| Demand Signal | Issue | Comments | 👍 | Insight |
|---|---|---|---|---|
| **Trust & authenticity** | [#492](https://github.com/anthropics/skills/issues/492) | **43** | 2 | **Highest-volume issue.** Community skills distributed under `anthropic/` namespace impersonate official skills — users grant elevated permissions by mistake. Strong demand for a verifiable skill provenance/signing system. |
| **Enterprise distribution** | [#228](https://github.com/anthropics/skills/issues/228) | 16 | **8** | Org-wide skill sharing in Claude.ai — no more Slack-distributed `.skill` files. Highest thumbs-up; enterprise onboarding is the bottleneck. |
| **Eval / skill-creator reliability** | [#556](https://github.com/anthropics/skills/issues/556) | 12 | 7 | `claude -p` never triggers skills — evaluation harness is broken. Strongly linked to PR #1298. |
| **Skill persistence / UX** | [#62](https://github.com/anthropics/skills/issues/62) | 10 | 2 | User skills disappearing after file rename — fragile lifecycle UX. |
| **Compact memory / context efficiency** | [#1329](https://github.com/anthropics/skills/issues/1329) | 9 | 0 | Proposal for symbolic notation to compress agent state and free context. Aligns with #1487. |
| **Duplicate plugin packaging** | [#189](https://github.com/anthropics/skills/issues/189) | 6 | **9** | `document-skills` and `example-skills` ship the same content — duplicate context injection. **Highest thumbs-up in mid-tier.** |
| **Context-window blowout** | [#1487](https://github.com/anthropics/skills/issues/1487) | 4 | 0 | `claude-api` skill eagerly injects ~156k tokens in a single tool call. |
| **MCP-scoring correctness** | [#1390](https://github.com/anthropics/skills/issues/1390) | 4 | 0 | `mcp-builder/evaluation.py` scores 0/N on real MCP servers due to a swallowed TextContent serialization bug. |
| **Reasoning quality gates** | [#1385](https://github.com/anthropics/skills/issues/1385) | 4 | 1 | Pre-task calibration → adversarial review → delivery verification pipeline. |
| **Skills-as-MCPs** | [#16](https://github.com/anthropics/skills/issues/16) | 4 | 0 | Package skill behavior as a typed MCP surface for interop with other agents. |

**Recurring demand axes:**
- **Trust & provenance** (43 comments) — by far the loudest signal.
- **Distribution UX** (org sharing, plugin packaging).
- **Evaluation correctness** (run_eval, mcp-builder eval) — the community cannot iterate skills when the loop is broken.
- **Context efficiency** (compact memory, lazy/eager skill loading).
- **Cross-agent interop** (Skills as MCPs).

---

## 3. High-Potential Pending Skills

Active PRs that have not yet been merged but show strong fit with the demand signals above:

- **[#1298 — skill-creator run_eval fix](https://github.com/anthropics/skills/pull/1298)** — unblocks description optimization; touches the pain point of #556 (12 comments, 7 👍). Highest-impact blocker in the queue.
- **[#1724 — mcp-builder update to claude-sonnet-5](https://github.com/anthropics/skills/pull/1724)** — keeps evaluation reference current; complements #1602.
- **[#1628 — Hivemind multi-agent skill](https://github.com/anthropics/skills/pull/1628)** — aligns with the cross-agent / orchestration demand axis.
- **[#1627 — buffer-api agent skill](https://github.com/anthropics/skills/pull/1627)** — portable inter-agent integration skill; matches the Skills-as-MCPs theme from #16.
- **[#1615 — scnet-hpc](https://github.com/anthropics/skills/pull/1615)** — domain-vertical HPC workflow; useful for research clusters.
- **[#1367 — self-audit v1.3.0](https://github.com/anthropics/skills/pull/1367)** — directly implements part of the pipeline proposed in #1385 (Reasoning Quality Gate).
- **[#83 — skill-quality-analyzer / skill-security-analyzer](https://github.com/anthropics/skills/pull/83)** — long-pending meta-skill that would answer a substantial part of #492's trust-boundary concern.
- **[#514 — document-typography](https://github.com/anthropics/skills/pull/514)** — content-quality gap that affects every generated document.

**Pattern:** The most strategically valuable pending items are not "new shiny skills" but **infrastructure and quality-control skills** (#1298, #83, #1367, #1724). New-format skills (#1615, #1627, #486, #514) form a secondary tier.

---

## 4. Skills Ecosystem Insight

> **The community's most concentrated demand at the Skills level is *meta-skills that make the ecosystem self-trusting, self-measuring, and context-efficient* — skill provenance/signing, working evaluation harnesses, compact memory, and pre-delivery audit pipelines outrank any individual domain skill in attention.**

---

*Compiled from 20 top-engagement PRs and 15 top-engagement issues on anthropics/skills. Issue comment counts are authoritative from the dataset; PR engagement was inferred from content depth, recency, and linkage to high-comment issues.*

---

# Claude Code Community Digest — 2026-09-08

## 1. Today's Highlights

No new releases in the last 24 hours, but the community is mobilizing around a cluster of **silent data-loss bugs** affecting session transcripts and auto-memory. The most upvoted open issue of the day (#59248, 32 👍) documents a retention-cleanup path that destroys conversation history without warning, and a closely related report (#62476) confirms the 30-day default deletion policy. Memory ergonomics (#91188) and subscription-billing ergonomics (#83302, fast-mode inclusion) round out the most-debated topics.

## 2. Releases

*No new versions published in the last 24 hours.*

## 3. Hot Issues

1. **#59248 — Silent retention cleanup deletes session transcripts with no warning, opt-in, or recovery**  
   [OPEN, 41 comments, 32 👍] — A user on Cursor + Claude Code 2.1.141 lost the ability to resume *all* prior workspace transcripts after a background retention sweep. The thread has become the canonical report for the 30-day transcript-deletion behavior.  
   👉 https://github.com/anthropics/claude-code/issues/59248

2. **#91188 — Make the auto-memory MEMORY.md compaction reminder threshold configurable**  
   [OPEN, 35 comments] — Auto-memory hard-loads the first 200 lines / 25 KB of MEMORY.md and emits a compaction nudge when approaching the limit. Users want the threshold (and the nudge) tunable.  
   👉 https://github.com/anthropics/claude-code/issues/91188

3. **#62476 — Claude Code silently deletes conversation transcripts after 30 days by default**  
   [OPEN, 25 comments, 24 👍] — Reproduces the same transcript-loss path as #59248 with explicit version data; effectively the second pole of the data-loss campaign.  
   👉 https://github.com/anthropics/claude-code/issues/62476

4. **#88323 — Claude Desktop (Windows MSIX) bricks itself: vk_swiftshader.dll blocked by Code Integrity**  
   [CLOSED, 14 comments] — Sideloaded Windows MSIX installs fail when Windows Defender Application Control flags vk_swiftshader.dll, after which the package reports "Modified" and won't launch. Critical for enterprise MS-distributed deployments.  
   👉 https://github.com/anthropics/claude-code/issues/88323

5. **#67051 — Assistant text before/between tool calls is silently dropped from the CLI**  
   [CLOSED, 7 comments, 7 👍] — Pre-tool narration is visible to the model and to hooks, but never rendered in the TUI. Hook authors are tuning behavior on text the user can't actually see.  
   👉 https://github.com/anthropics/claude-code/issues/67051

6. **#91712 — Code tab usage ring should report session context, not only the 5-hour window**  
   [OPEN, 3 comments, 3 👍] — Footer context meter in Claude Desktop's Code tab is tied to the rolling 5h quota, hiding how much of the 1M-token session window is consumed. Relevant for `opus[1m]` users.  
   👉 https://github.com/anthropics/claude-code/issues/91712

7. **#83723 — Apps gateway desktop overlay has no `chatTabEnabled` key, breaking managed Chat tab**  
   [CLOSED, 3 comments, 1 👍] — IT-managed policies can toggle Cowork and Claude Code tabs but not Chat; introducing the key fails gateway boot. Real blocker for organizations standardizing on the gateway.  
   👉 https://github.com/anthropics/claude-code/issues/83723

8. **#84894 — Session display names not exposed in ListAgents or accepted by SendMessage**  
   [OPEN] — Sessions have user-facing display names in the VS Code extension, but the programmatic API only accepts opaque IDs, breaking cross-tool automation.  
   👉 https://github.com/anthropics/claude-code/issues/84894

9. **#83302 — Fast mode excluded from subscription plans**  
   [OPEN, 12 👍] — Max subscribers want at least a capped fast-mode allowance so the headline subscription covers the feature they'd actually use most.  
   👉 https://github.com/anthropics/claude-code/issues/83302

10. **#77973 — Background worker can't read Keychain after foreground→background handoff (2.1.211 regression)**  
    [CLOSED] — Sending a session to the background suddenly fails with "Not logged in · Please run /login" because the child process loses Keychain access after the handoff.  
    👉 https://github.com/anthropics/claude-code/issues/77973

## 4. Key PR Progress

1. **#26175 — fix: replace broken native installer bootstrap script**  
   [CLOSED] — The official `curl … | bash` bootstrap silently fails to create `~/.local/bin/claude` *and* wipes the user's existing npm global install as "cleanup". Replaces the install path with a working one. Long-standing source of "nothing happens after install" reports.  
   👉 https://github.com/anthropics/claude-code/pull/26175

2. **#39043 — Remove "retro-futuristic" recommendation from Frontend Design Skill**  
   [OPEN] — One-line PR with the entire justification being "Trust me on this one." Now a community litmus test for the design skill's editorial taste.  
   👉 https://github.com/anthropics/claude-code/pull/39043

## 5. Hot Discussions

*No discussion data was provided in today's source — section omitted.*

## 6. Feature Request Trends

- **Memory transparency & control** — Configurable MEMORY.md threshold, suppression of compaction nudges, and visibility into retention/cleanup behavior are the single largest cluster of requests (#91188, #59248, #62476).
- **Subscription plan breadth** — Multiple asks (#87063, #83302) for fast-mode credits to be folded into Max/Max-20 tiers rather than billed separately.
- **First-class programmatic agent APIs** — Session display names surfaced through `ListAgents` / `SendMessage` (#84894) and a stable public agent-discovery surface.
- **Local / BYO-model workflows** — VS Code extension honoring `ANTHROPIC_BASE_URL` + `disableLoginPrompt` (#84852) so teams can run against internal gateways without the OAuth wall.
- **Managed-desktop completeness** — A documented `chatTabEnabled` key for the apps gateway so IT policies can control all three tabs (#83723).
- **Context-aware quota UI** — Distinguish session-window consumption from the 5h rolling quota in the footer meter (#91712).

## 7. Developer Pain Points

- **Silent, unrecoverable data loss** is the dominant theme: conversation transcripts vanish after 30 days by default (#59248, #62476) and there's no warning, opt-out, or recycle path.
- **Background / agent-view flakiness**: dropped `SendMessage(to: "main")` (#76382), Keychain loss on handoff (#77973), Keychain failure when logged out (#79511), SSH failures (#77678), and a `Ctrl+b` double-event in agent view (#79036) all show that the new background-session architecture is brittle on macOS and Windows.
- **TUI/hook contract drift**: text the model emits is invisible to the user but visible to hooks (#67051), making hook-based governance policies act on content users never see.
- **Memory & context blow-ups**: auto-memory thresholds are hardcoded (#91188), and large-file context accumulation trips safety filters (#74295) — both force users into manual workarounds.
- **Authentication & feedback friction**: `/feedback` returning 403 (#84313) blocks users from reporting the very safeguard false-positives they're hitting (#84821), creating a feedback loop where the only workaround is filing tracker issues.
- **Packaging & install reliability**: the native installer bootstrap silently breaks and uninstalls npm globals (#26175), and the Windows MSIX path is bricked by Code Integrity (#88323) — both hurt fresh installs more than upgrades.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-08

## 📌 Today's Highlights

Codex shipped **rust-v0.154.0-alpha.6** on the alpha channel, while the merged-PR pipeline showed heavy investment in three areas: **TUI voice conversations (WebRTC)**, **app-server daemon lifecycle configurability**, and a large **Guardian context-registry refactor**. On the issue tracker, community attention concentrated on Windows desktop Pets becoming click-through (#41513, 28 comments), rate-limit capacity errors despite available quota (#43337), and persistent Linux desktop performance problems.

---

## 🚀 Releases

- **[rust-v0.154.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.6)** — Alpha pre-release on the cutting-edge Rust channel; no changelog body provided. The accompanying PR stream (tmux resize recovery, voice mode, daemon update controls) suggests what's landing in this line.

---

## 🔥 Hot Issues

1. **[#41513](https://github.com/openai/codex/issues/41513) — Windows Pets become click-through and undraggable** (28 💬, 13 👍)
 The most-discussed issue of the day. Both built-in (Codey) and custom floating pets lose click/drag interaction on Windows builds `26.825.x`, making the feature effectively unusable. High engagement signals broad reproduction.

2. **[#21653](https://github.com/openai/codex/issues/21653) — Multi-line status line support in TUI** (19 💬, 76 👍)
 Long-running enhancement with the highest 👍 count today. Configured statuslines with multiple items get truncated with no wrapping — a quality-of-life gap for power CLI users that keeps drawing votes months after filing.

3. **[#43337](https://github.com/openai/codex/issues/43337) — Capacity errors despite fully available weekly allowance** (10 💬)
 ChatGPT Pro 20x users hit account-specific capacity errors on `gpt-6-astra` and `gpt-5.6-luna` at `low` reasoning with quota showing available. New, actively reproducing as of Sep 7 — directly blocks paid-tier work.

4. **[#42902](https://github.com/openai/codex/issues/42902) — Computer History polling wakes sleeping macOS displays every 10 minutes** (8 💬)
 The Computer Use helper's status polling defeats display sleep — a battery/privacy-adjacent regression with no user-facing workaround.

5. **[#43347](https://github.com/openai/codex/issues/43347) — Closing last Browser Use tab crashes the Windows desktop app** (4 💬)
 Full app termination reproduced twice across builds `26.901.5280` and `26.901.6511`, surviving a Microsoft Store update. Data-loss-class severity.

6. **[#34349](https://github.com/openai/codex/issues/34349) — Request: fully disable Pets and hide the menu entry** (4 💬, 28 👍)
 Strong sentiment that Pets should be optional. Combined with #41513/#42857, Pets is generating disproportionate negative signal this week.

7. **[#43170](https://github.com/openai/codex/issues/43170) — app-server burns 1.18M futex calls/sec on musl `__malloc_lock`** (3 💬)
 Deep technical report: 53M futex calls in 45 seconds, >50% kernel CPU from allocator contention across Tokio workers on the musl Linux build. Excellent diagnostics; likely needs allocator strategy change (e.g., switch from musl default).

8. **[#37346](https://github.com/openai/codex/issues/37346) — Runaway inline image duplication during compaction → 20+ GB rollout files** (3 💬)
 Context compaction duplicating inline images until rollout files balloon to 20+ GB. Disk-exhaustion risk on long sessions.

9. **[#37526](https://github.com/openai/codex/issues/37526) — app-server drops remote clients on full outbound queue (128 msgs)** (3 💬, 2 👍)
 Regression report: the #18203 fix missed a code path; slow remote-control connections still get disconnected mid-turn on 0.147+ including `main`.

10. **[#43536](https://github.com/openai/codex/issues/43536) — iOS Remote: host lists tasks but messages fail to load** (2 💬)
 New breakage in the iOS Remote client (`1.2026.237`) against desktop `26.901.51231` — pairs with #37526 to sketch a fragile remote-control story.

*Worth tracking:* [#43041](https://github.com/openai/codex/issues/43041) (suspected false safety pause with Astra after explicit deploy permission) and [#42804](https://github.com/openai/codex/issues/42804) (Linux regular-chat reasoning stuck at "Instant").

---

## 🔧 Key PR Progress

1. **[#43581](https://github.com/openai/codex/pull/43581) — Live WebRTC voice conversations in the TUI**
 Feature-gated `/voice`, `/voice mute`, `/voice stop` commands with local WebRTC audio, app-server signaling, live transcripts, and mic/speaker levels. The standout feature PR of the day.

2. **[#43562](https://github.com/openai/codex/pull/43562) — Explicit `app-server daemon update` command**
 On-demand check for latest stable even with auto-updates disabled; reports `updated`/`noUpdate` outcomes.

3. **[#43542](https://github.com/openai/codex/pull/43542) — Configurable daemon auto-updates**
 New `updater.autoUpdateEnabled` and `updater.updateIntervalMinutes` settings replace the fixed hourly cadence.

4. **[#43572](https://github.com/openai/codex/pull/43572) — Configurable app-server shutdown grace period**
 `shutdownGraceSeconds` in daemon settings replaces the hardcoded 60s force-kill window.

5. **[#43547](https://github.com/openai/codex/pull/43547) + [#43568](https://github.com/openai/codex/pull/43568) — User-verification provider stack**
 New `codex-user-verification` crate with provider abstractions, then wiring the previously stubbed `userVerification/*` RPCs to the native provider — credential status, enrollment, deletion, challenge signing.

6. **[#43603](https://github.com/openai/codex/pull/43603) — Recover missed tmux resize notifications**
 500ms background size monitor delivers stale-dimension fixes as resize events — directly addresses a classic tmux TUI annoyance.

7. **[#43604](https://github.com/openai/codex/pull/43604) — Strip `base_instructions` from bundled model catalog**
 Slims `models.json` and guards the release-prepare workflow against regressions.

8. **[#43558](https://github.com/openai/codex/pull/43558) — Completion timestamps after TUI turns**
 Turn separators replaced with dim `done 2:32 PM` metadata (with date/year as needed) — nice session-audit affordance.

9. **[#43576](https://github.com/openai/codex/pull/43576) — Group adjacent computer actions in TUI**
 Adjacent `cua_repl` calls collapse into compact "Using computer" groups with failure/screenshot-prioritized previews.

10. **[#43619](https://github.com/openai/codex/pull/43619) — Stable TUI/app-server version comparison helper**
 `is_official_server_older` enforces strict 3-component semver parsing — plumbing for safer mixed-version setups.

*Also notable:* the Guardian refactor series ([#43595](https://github.com/openai/codex/pull/43595), [#43597](https://github.com/openai/codex/pull/43597), [#43599](https://github.com/openai/codex/pull/43599), [#43601](https://github.com/openai/codex/pull/43601), [#43602](https://github.com/openai/codex/pull/43602), [#43570](https://github.com/openai/codex/pull/43570)) systematically centralizes review evidence, tool metadata, and image selection into `codex-guardian-context` — a significant internal architecture consolidation.

---

## 💬 Hot Discussions

### Ideas
- **[#9618](https://github.com/openai/codex/discussions/9618) — "How is there not a /rewind or /revert feature?"** (119 👍, 20 💬)
 The dominant community ask. Users point to OpenCode/Claude Code undo support; without it, "commit on every change" is the only safety net. Highest-engagement thread of the day.
- **[#7366](https://github.com/openai/codex/discussions/7366) — Reference gitignored files via `@`** (7 👍)
 `.gitignore` ≠ "don't use"; users want `@`-references to reach ignored files (e.g., vendored library sources).
- **[#37611](https://github.com/openai/codex/discussions/37611) — Signed enterprise work orders for governed high-capability model access**
 A thoughtful proposal tying OpenAI's frontier-cyber safeguards discussion to enterprise governance workflows.

### General
- **[#7782](https://github.com/openai/codex/discussions/7782) — Deprecating `chat/completions` support in Codex** (official, 21 👍)
 Long-running official migration thread to the Responses API; still collecting user migration friction.

### Show and tell
- **[#43598](https://github.com/openai/codex/discussions/43598) — deja-vu**: Go binary indexing session files from Codex and ~23 other agents into one local recall layer.
- **[#43532](https://github.com/openai/codex/discussions/43532) — DoneAudit**: MIT-licensed tool that verifies agent "done, all tests pass" claims against actual evidence.
- **[#43427](https://github.com/openai/codex/discussions/43427) — Blume.codes**: converts agent session history into improved rules/skills to fight agent drift.
- **[#41157](https://github.com/openai/codex/discussions/41157) — CodexFuse 1.2.0**: local Windows dashboard for Codex rate-limit visibility — notable given today's rate-limit issues.

---

## 📈 Feature Request Trends

1. **Undo/rewind for agent actions** — #9618's 119 👍 makes session-level revert the clearest unmet demand.
2. **Pets opt-out and stabilization** — disable entirely (#34349, 28 👍), fix interaction bugs (#41513, #42857).
3. **Linux desktop parity** — native window decorations (#38595), Computer Use support (#42846), tilable voice controls (#43577), Wayland hotkey portals (#38126).
4. **TUI ergonomics** — multi-line statusline (#21653, 76 👍), better turn metadata.
5. **Daemon/app-server configurability** — the team is already landing this (update cadence, grace periods), matching user demand for control.
6. **Multi-agent coordination** — cross-agent intent maps to prevent overlapping edits (#36719).

---

## ⚠️ Developer Pain Points

- **Rate-limit opacity and errors**: capacity errors despite visible quota (#43337), shifting 5h reset times (#22133), and third-party dashboards (CodexFuse) filling the visibility gap.
- **Linux desktop instability cluster**: inotify exhaustion with zero watches (#39123), musl allocator futex storms (#43170), compositor crashes on Pantheon (#43424), reasoning-mode resets (#42804), Projects missing (#42228). Linux is the noisiest platform by volume today.
- **Remote/iOS reliability**: outbound-queue disconnects (#37526) and iOS message-load failures (#43536) undermine the remote-control story.
- **Session/context bloat**: 20+ GB rollout files from image duplication during compaction (#37346).
- **Resource discipline on macOS**: background polling waking displays (#42902).
- **Trust friction**: false safety pauses after explicit permission (#43041) and final answers that lose the quality of interim commentary (#42017) erode confidence in agent output.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-08

## 1. Today's Highlights

- **Nightly release shipped**: `v0.60.0-nightly.20260907.g85aca163f` was cut overnight, continuing the pre-0.60 stabilization cycle.
- **Security hardening is the theme of the week**: Multiple PRs target sandbox isolation (filesystem boundaries, settings directory separation, EOL Node image), addressing a cluster of related issues around credential exposure and container escape risk.
- **Subagent & Auto Memory quality dominates the issue tracker**: Long-standing bugs around subagent termination reporting, agent hangs, and Auto Memory redaction/retries are getting active maintainer attention.

## 2. Releases

- **[v0.60.0-nightly.20260907.g85aca163f](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-nightly.20260907.g85aca163f)** — Automated nightly bump. Diff against the previous nightly is incremental; expect routine test/dependency churn ahead of the 0.60 stable cut. ([Full Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260906.g85aca163f...v0.60.0-nightly.20260907.g85aca163f))

## 3. Hot Issues

1. **[#25306 — "The caller does not have permission" 403 errors](https://github.com/google-gemini/gemini-cli/issues/25306)** — 33 comments, 12 👍, closed. The most-discussed thread of the window; a recurring auth/permissions 403 from the API with requests to attach chat history JSON for triage.
2. **[#22323 — Subagent recovery after MAX_TURNS reports GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** — P1, 13 comments. `codebase_investigator` masks turn-limit exhaustion as a clean `GOAL` termination, hiding broken runs from users.
3. **[#21409 — Generalist agent hangs indefinitely](https://github.com/google-gemini/gemini-cli/issues/21409)** — P1, 8 👍. Trivial operations (folder creation) freeze for up to an hour when the generalist agent is invoked. Workaround is to forbid subagent deferral, which is impractical.
4. **[#25166 — Shell command "Waiting input" after command completes](https://github.com/google-gemini/gemini-cli/issues/25166)** — P1. Common CLI workflows get stuck in a phantom "Awaiting user input" state even after the shell command has returned cleanly.
5. **[#21968 — Gemini doesn't use skills and sub-agents proactively](https://github.com/google-gemini/gemini-cli/issues/21968)** — Behavioral gap: well-described custom skills (gradle, git, etc.) are ignored unless explicitly invoked. Affects the perceived value of the subagent ecosystem.
6. **[#19873 — Zero-Dependency OS Sandboxing & Post-Execution Intent Routing](https://github.com/google-gemini/gemini-cli/issues/19873)** — Large effort design proposal aligning sandbox boundaries with Gemini 3's native bash affinity; addresses both UX and security.
7. **[#26525 — Deterministic redaction for Auto Memory](https://github.com/google-gemini/gemini-cli/issues/26525)** — P2 security. Current redaction happens after transcript content already reaches model context; needs pre-extraction scrubbing.
8. **[#26522 / #26523 — Auto Memory retry & invalid-patch handling](https://github.com/google-gemini/gemini-cli/issues/26522)** — A coordinated set of P2 bugs around the background extraction agent looping on low-signal sessions and silently dropping malformed patches.
9. **[#24246 — 400 error when >128 tools registered](https://github.com/google-gemini/gemini-cli/issues/24246)** — Practical ceiling hit on real-world MCP-heavy setups; needs smarter in-context tool scoping.
10. **[#22745 — EPIC: AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)** — Strategic investigation into tree-sitter/typed tooling to reduce the 36.6k-token/turn baseline and misaligned file reads.

## 4. Key PR Progress

1. **[#29214 — fix(sandbox): harden filesystem boundaries and isolate runtime state](https://github.com/google-gemini/gemini-cli/pull/29214)** — Replaces host directory mounts with sanitized read-only configs, resolves symlinks during path checks, decouples container env. Pairs with #29216.
2. **[#29216 — fix(cli): isolate settings directory in sandbox containers](https://github.com/google-gemini/gemini-cli/pull/29216)** — Stops leaking host `~/.gemini` (OAuth tokens, credentials) into container sandboxes; closes a real credential-exposure vector.
3. **[#28973 — fix(sandbox): bump sandbox image from EOL node:20-slim to node:22-slim](https://github.com/google-gemini/gemini-cli/pull/28973)** — Node 20 hit EOL on 2026-04-30; this brings the runtime back into security maintenance.
4. **[#29239 — fix(cli): prevent ghost text wrapping infinite loop at narrow widths](https://github.com/google-gemini/gemini-cli/pull/29239)** — Fixes #19985: `InputPrompt.tsx`'s `getGhostTextLines` while-loop hangs at very narrow terminal widths.
5. **[#29237 — Fix: list_background_processes prints (Exit Code: null) for signal-killed processes](https://github.com/google-gemini/gemini-cli/pull/29237)** — Guards against `exitCode: null` for signal-terminated background tasks, improving `/bg` listing UX.
6. **[#29134 — fix(cli): protect current session from deletion](https://github.com/google-gemini/gemini-cli/pull/29134)** — Prevents the active session from being deleted via `--delete-session`; matches only on proper short-ID suffix.
7. **[#29132 / #29131 — Normalize line endings in diff context snippets](https://github.com/google-gemini/gemini-cli/pull/29132)** — Two converging fixes: CRLF/CR normalization before diff computation to avoid full-file dumps back into context on Windows.
8. **[#28975 — fix(core): keep glob results for symlinked workspace roots](https://github.com/google-gemini/gemini-cli/pull/28975)** — Resolves "No files found" under `/tmp` on macOS (symlinked to `/private/tmp`); broader impact than the original ticket suggested.
9. **[#28971 — fix(core): keep truncated MCP tool names unique](https://github.com/google-gemini/gemini-cli/pull/28971)** — The first-30/last-30 truncation wasn't injective and could collide MCP tool names; now guarantees uniqueness in the registry.
10. **[#29137 — chore(deps): bump the npm-dependencies group (77 updates)](https://github.com/google-gemini/gemini-cli/pull/29137)** — Notable bumps include `simple-git 3.28.0 → 3.36.0` and `@modelcontextprotocol/sdk 1.x`; worth eyeballing for behavioral changes before merge.

## 5. Hot Discussions

*No GitHub Discussions data was provided in the source feed. Section omitted.*

## 6. Feature Request Trends

- **Smarter agent composition & skill discovery**: [#21968](https://github.com/google-gemini/gemini-cli/issues/21968), [#21432 (Agent Self-Awareness)](https://github.com/google-gemini/gemini-cli/issues/21432), [#22598 (subagent trajectories via /chat share)](https://github.com/google-gemini/gemini-cli/issues/22598) — users want the agent to proactively leverage custom skills/subagents and to surface richer observability for those delegated runs.
- **Token-frugal, structurally aware tooling**: [#22745 (AST-aware reads/mapping)](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746 (AST CLI tools for codebase mapping)](https://github.com/google-gemini/gemini-cli/issues/22746), [#19561 (Tactful Extraction for surgical reads)](https://github.com/google-gemini/gemini-cli/issues/19561) — a clear appetite to retire firehose file reads in favor of grep → symbol → AST-based retrieval.
- **Sandboxing that aligns with model behavior**: [#19873](https://github.com/google-gemini/gemini-cli/issues/19873), plus closed PRs [#29214](https://github.com/google-gemini/gemini-cli/pull/29214) and [#29216](https://github.com/google-gemini/gemini-cli/pull/29216) — zero-dep OS-level boundaries, post-execution intent routing, and host-config isolation.
- **Browser agent maturity**: [#22232 (lock recovery / session takeover)](https://github.com/google-gemini/gemini-cli/issues/22232), [#21983 (Wayland failure)](https://github.com/google-gemini/gemini-cli/issues/21983), [#22267 (settings.json ignored)](https://github.com/google-gemini/gemini-cli/issues/22267) — resilience, platform coverage, and configuration plumbing.
- **Memory system quality**: the [#26516 / #26522 / #26523 / #26525 cluster](https://github.com/google-gemini/gemini-cli/issues/26516) shows users asking for a more reliable, less loop-prone Auto Memory with stronger secret handling.

## 7. Developer Pain Points

- **Agent hangs are the #1 frustration**: [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) (generalist) and [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) (shell "Waiting input") both describe minutes-to-hours of dead time on simple operations, eroding trust.
- **Termination reporting lies about success**: [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) and [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) show subagents returning `GOAL` while actually exhausted or failed, complicating eval and incident triage.
- **Workspace pollution from scratch scripts**: [#23571](https://github.com/google-gemini/gemini-cli/issues/23571) — `gemini` littering `tmp` scripts across directories makes for painful commit hygiene.
- **Configuration not respected**: [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) (Browser Agent ignores `settings.json`) and [#20079](https://github.com/google-gemini/gemini-cli/issues/20079) (symlinked agent definitions not recognized) — users can't trust their own config to take effect.
- **Interactive prompts trap the CLI**: [#22465](https://github.com/google-gemini/gemini-cli/issues/22465) (vite app creation hangs at interactive prompt) — a recurring class of issue where the agent doesn't pre-set non-interactive flags.
- **Sandbox/credential leakage concerns**: [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) plus the host-mount issues addressed by [#29214](https://github.com/google-gemini/gemini-cli/pull/29214)/[#29216](https://github.com/google-gemini/gemini-cli/pull/29216) — developers running inside Docker/Podman have been unknowingly exposing host secrets.
- **Tool-count ceilings**: [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — the 128-tool wall breaks MCP-heavy workflows with no automatic fallback.
- **Session continuity regressions**: [#21335 (/compress not persisted)](https://github.com/google-gemini/gemini-cli/issues/21335), [#21763 (bugreport lacks subagent context)](https://github.com/google-gemini/gemini-cli/issues/21763) — resume and reporting flows are losing important state.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-08

## Today's Highlights

- **MCP ecosystem reliability dominates the queue**: multiple reports of OAuth failures, broken stdio handovers on session resume, and missing `User-Agent`/`cancellation` requests against the MCP spec.
- **Desktop app 1.1.15 introduces a workspace contention regression** where a second `Local` (branch) session can no longer be created while another is live — affecting both macOS (#4742) and Windows (#4756).
- **CLI 1.0.83 ships several regressions**: shortened MCP stdio timeouts (#4753), degraded Azure MCP `learn=true` performance (#4749), subagent event ordering changes (#4760), and a TUI idle-CPU regression (#4750).

## Releases

_No releases in the last 24 hours._

## Hot Issues

1. **[#4757](https://github.com/github/copilot-cli/issues/4757) — `--yolo` / `--allow-all` blocked for the whole session by a fail-closed bypass restriction applied on an account with NO managed policy** *(open, 3 comments)* — A safety/UX regression where an absent managed policy is treated as "fail-closed" for bypass modes, with no per-session escape hatch. Important for any enterprise user of autonomy flags.
2. **[#4756](https://github.com/github/copilot-cli/issues/4756) — Windows app requires archiving every idle project session before creating a new Local session** *(open, 7 👍, 2 comments)* — A direct Windows counterpart to #4742; users on 1.1.15 are forced to archive sessions to create new ones, blocking normal workflow.
3. **[#4755](https://github.com/github/copilot-cli/issues/4755) — Session wedges permanently when a queued-lane message lands at turn end (idle finalization suppressed, queue never drains)** *(open, 1 comment)* — Severe reliability bug: session enters a stuck non-idle/non-running state with only `kill` as recovery. Data loss / unsaved work risk.
4. **[#4753](https://github.com/github/copilot-cli/issues/4753) — v1.0.83: session resume cancels in-flight stdio MCP server connections (~1s timeout, was ~16s in v1.0.82)** *(open, 2 comments, 1 👍)* — Major 1.0.83 regression breaking MCP integrations on session resume; many tools silently become unavailable.
5. **[#4752](https://github.com/github/copilot-cli/issues/4752) — `--agent <name>` doesn't recognize custom agents loaded via `--add-dir`** *(open, 0 comments)* — Sub-agent discovery via `--add-dir` works for prompt-time delegation but not the top-level `--agent` flag, breaking multi-agent workflows.
6. **[#4749](https://github.com/github/copilot-cli/issues/4749) — Azure MCP `learn=true` calls time out after 180s in Copilot CLI 1.0.83-5** *(open, 0 comments)* — A clean A/B between 1.0.80 (0.2s) and 1.0.83-5 (timeout); isolates the regression to the new version.
7. **[#4750](https://github.com/github/copilot-cli/issues/4750) — Copilot TUI hogs CPU** *(open, 0 comments)* — Idle TUI consumes ~6–7% of one core and multiplies after prompts on v1.0.83; likely a render/event-loop regression.
8. **[#4743](https://github.com/github/copilot-cli/issues/4743) — ACP: `end_turn` precedes background-shell completion and autonomous follow-up tool calls; no observable session-idle signal** *(open, 0 comments)* — Breaks the Agent Client Protocol contract for ACP integrations; related to #4555 but distinct.
9. **[#4742](https://github.com/github/copilot-cli/issues/4742) — Desktop app 1.1.15: cannot create a second Local (branch) session while one is running** *(open, 7 comments)* — Active session lock regression blocking parallel work; explicitly named as triggered by the 1.1.15 auto-update.
10. **[#4740](https://github.com/github/copilot-cli/issues/4740) — Voice server permanent deadlock when pid file is deleted while server process survives** *(open, 0 comments)* — Platform/Windows edge case: a stale pid-file cleanup triggers an irrecoverable bind-loser deadlock with no recovery path.

Other notable items:
- **[#1665](https://github.com/github/copilot-cli/issues/1665) — Plugins scoped to project/repo (CLOSED, 18 👍, 14 comments)** — high-traffic feature request for project-scoped (not just user-scoped) plugin configuration; recently closed.
- **[#1999](https://github.com/github/copilot-cli/issues/1999) — Cannot enter `@` on German keyboard (CLOSED, 10 comments)** — long-standing internationalization bug; now closed.
- **[#4017](https://github.com/github/copilot-cli/issues/4017) — MCP OAuth: non-first-party HTTP servers cancel host-token then never launch the runtime browser flow** *(open, 3 👍, 3 comments)* — major interoperability gap with Atlassian/incident.io MCP servers.
- **[#4681](https://github.com/github/copilot-cli/issues/4681) — MCP OAuth `initialize` request omits User-Agent header** *(open, 2 comments)* — spec-compliance issue breaking servers that gate on UA.
- **[#4759](https://github.com/github/copilot-cli/issues/4759) — Copilot CLI should send MCP cancellation requests** *(open, 1 comment)* — MCP-spec compliance gap with real UX consequences (browser auth flows hang after user cancel).
- **[#4670](https://github.com/github/copilot-cli/issues/4670) — Tool call hangs after extension startup fails** *(open, 1 comment)* — extension lifecycle hygiene: a failed `joinSession()` should remove the tool from offer list.
- **[#4754](https://github.com/github/copilot-cli/issues/4754) — Deleting an evicted session silently no-ops; ON DELETE CASCADE never fires** *(open, 0 comments)* — SQLite/data-layer bug with persistent UI staleness.
- **[#4709](https://github.com/github/copilot-cli/issues/4709) — Multi-repo collection workspace never associates a worktree when member repos have different default branches** *(open, 1 comment)* — multi-repo agents are unusable across `main` vs `master` mixes.
- **[#4738](https://github.com/github/copilot-cli/issues/4738) — `ask_user` form: pressing Enter early submits/cancels and permanently discards typed answer** *(open, 0 comments)* — high-severity data-loss UI bug.
- **[#4693](https://github.com/github/copilot-cli/issues/4693) — Filter/scope session tabs & resume list by repository/solution** *(open, 0 comments)* — UX scaling request from heavy users.
- **[#4760](https://github.com/github/copilot-cli/issues/4760) — Background subagent start events deferred until parent task completes (1.0.83)** *(open, 0 comments)* — observability/event-timing regression in subagent lifecycle.

## Key PR Progress

Only 2 PRs were updated in the last 24h; both are early-stage and worth tracking:

1. **[#4748](https://github.com/github/copilot-cli/pull/4748) — Add joke cli** *(open, 0 👍)* — Community PR adding a novelty "joke" CLI to the repo; likely a low-pri contribution aimed at onboarding contributors.
2. **[#4746](https://github.com/github/copilot-cli/pull/4746) — Add experimental next-action extension prototype** *(open, 0 👍)* — Microsoft-authored opt-in SDK extension example under `examples/next-best-action/` that joins an existing session via `joinSession()` and a no-tools UI surface to surface model-inferred next actions. Lives outside extension auto-discovery and doesn't modify the installed CLI — a safe pattern for prototypes.

## Hot Discussions

_No discussion data was provided — section omitted._

## Feature Request Trends

- **Project/repository-scoped configuration**: per-repo plugins (#1665) and per-repo session filtering (#4693) both highlight demand for scoping CLI state away from global, per-user state.
- **Multi-agent ergonomics**: `--add-dir` agent discovery, custom agent selection via `--agent` (#4752), and better subagent lifecycle observability (#4760).
- **MCP protocol compliance**: explicit cancellation requests (#4759), User-Agent forwarding (#4681), and runtime browser flow recovery (#4017) — users want MCP servers (especially non-first-party) to "just work".
- **Workspace/session parallelism**: ability to run multiple Local sessions in the same project (#4742, #4756).
- **Refinement/UX affordances**: the recurring `/refine` 400 from unsupported `reasoning_effort` on `gpt-4o-mini` (#4747) suggests demand for graceful capability negotiation with model downgrades.

## Developer Pain Points

- **Session lifecycle fragility**: stuck queued-lane turns (#4755), silent eviction/delete (#4754), worktree association failures in mixed-default-branch collections (#4709), and a workspace lock preventing parallel sessions (#4742, #4756) — the most common failure mode across the 1.x line.
- **1.0.83 regressions cluster**: shorter MCP stdio timeouts on resume (#4753), Azure MCP `learn=true` 180s timeouts (#4749), subagent event reordering (#4760), and TUI idle CPU spikes (#4750). Users with automated workloads are being pushed to pin to 1.0.82.
- **MCP authentication is brittle**: OAuth flows drop tokens silently (#4017), strip configured headers (#4681), and don't propagate cancellation (#4759) — particularly painful for non-first-party servers.
- **Fail-closed policy posture is overzealous**: bypass modes (`--yolo`/`--allow-all`) being disabled when no policy is configured (#4757) breaks personal-account workflows.
- **Extension lifecycle gaps**: tools from crashed extensions remain on offer (#4670), and `--add-dir` discovery is inconsistent across flag surfaces (#4752).
- **Platform/edge-case deadlocks**: Windows voice-server pid-file deadlock (#4740) and Windows session-archiving requirement (#4756) point to insufficient lifecycle hardening on Windows specifically.
- **Input/UX data loss**: `ask_user` form Enter handling discards typed content (#4738); German `Alt-Gr` `@` unusable (#1999, now closed).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-08

## Today's Highlights

The community's two dominant threads remain the **long-standing request for an official VS Code extension** (issue #11176) and a wave of **session/recovery regressions** where OpenCode sessions get stuck in a permanent `busy` state that survives reboots — often linked to dropped subagent permission requests or silent SSE stream failures. On the provider side, **Go subscription billing edge cases** (Zen balance fallback) and **compatibility breaks** with Mistral GLM-5.2, Tencent WorkBuddy, and next-channel Bedrock are generating the most noise.

---

## Releases

_No new releases in the last 24 hours._

---

## Hot Issues

1. **[#11176 — Official OpenCode VS Code extension](https://github.com/anomalyco/opencode/issues/11176)** (29 comments, 147 👍)
   The single most upvoted open feature request. Users want a first-party VS Code extension rather than relying on community wrappers. Closely related to #27303 (Copilot BYOK provider).

2. **[#43199 — Tool calls throw errors for Mistral's GLM-5.2](https://github.com/anomalyco/opencode/issues/43199)** (9 comments)
   GLM-5.2 hosted by Mistral works for plain text but breaks as soon as tools are invoked — likely a tool-definition/streaming mismatch with the `mistral` provider adapter.

3. **[#43277 — Sessions permanently stuck during normal use](https://github.com/anomalyco/opencode/issues/43277)** (8 comments)
   Sessions refuse new messages and the stuck state survives full system reboots. High-severity UX regression affecting normal users.

4. **[#47842 — OpenCode in Cursor doesn't work](https://github.com/anomalyco/opencode/issues/47842)** (7 comments, closed)
   `ERROR_PROVIDER_ERROR` / "model channel not available" when invoked from Cursor; closed but useful context for users integrating OpenCode as a backend.

5. **[#17044 — Update installs to APPDATA regardless of install location](https://github.com/anomalyco/opencode/issues/17044)** (7 comments, closed)
   A long-standing Windows pain point: updates always land in `%LOCALAPPDATA%` even when OpenCode is installed elsewhere, polluting per-user state.

6. **[#27303 — Official Go/Zen BYOK provider extension for VSCode Copilot](https://github.com/anomalyco/opencode/issues/27303)** (6 comments)
   Sibling of #11176; users want OpenCode's Go/Zen models exposed through VS Code's BYOK provider extension mechanism.

7. **[#31724 — Expose an OpenAI-compatible endpoint from the local opencode server](https://github.com/anomalyco/opencode/issues/31724)** (6 comments, closed)
   Recurring ask: let `opencode serve` present an OpenAI-compatible `/v1` so external tools (Continue, Cline, etc.) can reuse configured providers.

8. **[#45011 — Web Home never shows CLI/TUI-created sessions](https://github.com/anomalyco/opencode/issues/45011)** (6 comments)
   Web UI's project registry is client-side only, so sessions created from `opencode run`/TUI never appear in `opencode web` until the project is manually added.

9. **[#42938 — Go plan hits 100% but $39.89 Zen balance is never used](https://github.com/anomalyco/opencode/issues/42938)** (6 comments)
   "Use balance" is enabled, but Go doesn't fall back to Zen credit when the monthly plan is exhausted — a billing-integrity bug worth tracking.

10. **[#36241 — gpt-5.6-sol-fast/high repeatedly fails with `reasoning part rs_*:0 not found`](https://github.com/anomalyco/opencode/issues/36241)** (6 comments)
    Streaming reasoning part lookups fail mid-response on macOS, aborting the turn; part of a broader class of streaming-state corruption bugs.

---

## Key PR Progress

1. **[#47848 — fix(session): clear the archived timestamp instead of silently ignoring it](https://github.com/anomalyco/opencode/pull/47848)** (open)
    Restores working "unarchive" semantics rather than dropping the call; closes #47849 and addresses the backend half of #24153.

2. **[#47861 — fix(snapshot): scope revert patches and guard deletions](https://github.com/anomalyco/opencode/pull/47861)** (open)
    The snapshot store is worktree-global but patch listings were not — this scopes patches to the correct worktree and guards against unsafe deletes. Closes #40736, #33940, #46783.

3. **[#41016 — fix(provider): forward agent temperature for config-defined custom models](https://github.com/anomalyco/opencode/pull/41016)** (closed)
    Custom models declared in `opencode.json` defaulted `temperature` capability to `false`, silently dropping agent-level settings.

4. **[#47859 — fix(session-ui): align retry icon with label](https://github.com/anomalyco/opencode/pull/47859)** (open)
    Cleans up a leftover spinner offset now that the retry spinner became a warning icon, plus a regression test for component geometry.

5. **[#47835 — fix(app): keep tab progress visible on hover](https://github.com/anomalyco/opencode/pull/47835)** (closed)
    Removes the hover-only `revealProjectOnHover` option so the busy-progress indicator is always visible on tabs.

6. **[#41145 — fix(tui): preserve legacy Option+Enter newlines](https://github.com/anomalyco/opencode/pull/41145)** (closed)
    Keeps raw/legacy Option+Enter as a newline alias and restricts the default prompt-queue binding to Kitty-reported events, with declarative source selection in the keybind layer.

7. **[#41143 — fix(tui): move debug overlay to devtools](https://github.com/anomalyco/opencode/pull/41143)** (closed)
    Removes the render debug overlay from the global command palette and relocates it under DevTools → Tools alongside other render diagnostics.

8. **[#41135 — feat(app): add message timeline navigation strip](https://github.com/anomalyco/opencode/pull/41135)** (closed)
    Implements a compact, DeepSeek-web-style bead strip for jumping around long sessions — the compact variant requested in #32999.

9. **[#47858 — feat(updates): serve updates under opencode.ai/update](https://github.com/anomalyco/opencode/pull/47858)** (closed)
    Maintainer-driven: mounts the update Worker at `opencode.ai/update` (preserving the original hostname) and adds local-artifact AUR publishing.

10. **[#41132 — fix(acp): emit plan updates for todos](https://github.com/anomalyco/opencode/pull/41132)** (closed)
    Maps OpenCode `todo.updated` events into ACP `session/update` messages with `sessionUpdate: "plan"`, letting ACP clients render live todo plans.

---

## Feature Request Trends

- **Editor/IDE integration** is by far the loudest category: an official VS Code extension (#11176, ~150 👍), a Go/Zen BYOK provider for Copilot (#27303), and a "start with new/old session" desktop option (#47807) all reinforce the same demand.
- **Local-server / API surface expansion**: users want `opencode serve` to expose an OpenAI-compatible endpoint (#31724) and to allow arbitrary tools to consume the configured provider stack.
- **Subagent & permission UX**: bindable "set as default model for this agent" actions (#47836), better auto-mode permission handling (#47545), and the long-running request to disable "Allow always" (#19528, closed) all point to the same friction around agent control.
- **Plugin extensibility**: a reserved **plugin dataflow/metrics panel** (#46156) for per-session data logs and structured metrics, surfaced outside the chat stream.
- **Cross-client session visibility**: making CLI/TUI sessions appear in `opencode web` (#45011, #46444) is a recurring architectural request.

---

## Developer Pain Points

- **Permanent session locks**: multiple reports (#43277, #44747, #37580) describe sessions that go `busy` forever — typically because subagent permission requests or SSE chunks are silently dropped, with stop/interrupt becoming no-ops and the state surviving restarts.
- **Tool-call and repair edge cases**: invalid tool repairs dropping the `tool` field for unnamed calls (#47831) and the `commentary` channel being unimplemented for chat-completions providers (#47168) both end turns prematurely.
- **Provider integration fragility**: regressions on Mistral GLM-5.2 (#43199), next-channel Bedrock (#40663), Tencent WorkBuddy (#47820), and OpenRouter cookie auth (#12436) suggest a difficult matrix of third-party provider quirks.
- **Auto-mode noise**: #47545 calls out repeated false permission notifications because Auto approval is client-side after the server has already emitted permission requests.
- **TUI input on macOS**: intermittent keystroke drops in the full TUI while `--mini` and the shell remain responsive (#37336) — a recurring terminal-stack pain point.
- **Windows install/update hygiene**: APPDATA-only updates (#17044) and pure-white GUI launches (#23949) keep showing up in Windows-specific reports.
- **Go billing correctness**: the Go plan not falling back to Zen balance (#42938) is a trust issue for paying users, even though the feature is documented.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-08

## Today's Highlights

Today's activity is dominated by **provider-routing bug fixes** (Copilot GPT-6 Astra, Claude Fable 5 fallback, OpenRouter `:free` max_tokens) and the first landable layer of the **mid-conversation system-message refactor** (#9116/#9117), which restructures how the coding agent delivers prompt and tool change signals. A long-running reliability issue with `openai-codex` streaming still dominates the issue list by comment volume, while Windows-on-Pi continues to be a top discussion thread.

## Releases

_No new releases in the last 24h._

## Hot Issues

1. **#4945 — openai-codex Connection Reliability Issues** (77 comments, 👍33)
   `gpt-5.5` frequently leaves the interactive TUI stuck mid-turn with no streamed text, no tool call, and no visible error — Escape is the only recovery path. Highest-traffic thread of the day; community is pressing for clearer abort/error surfacing. [Link](https://github.com/earendil-works/pi/issues/4945)

2. **#7547 — How do you use Pi on Windows? What issues are you seeing?** (61 comments)
   A coordinated "share your setup" thread by maintainer petrroll to triage the Windows matrix (WSL, native, terminals, sandboxes). [Link](https://github.com/earendil-works/pi/issues/7547)

3. **#8760 — OpenRouter `:free` models fail with 400 because Pi overshoots `max_tokens`** (5 comments)
   Pi passes the catalog's `maxOutputTokens`, exceeding the provider's hard cap. Affects multiple `:free` models; concrete and easy to validate. [Link](https://github.com/earendil-works/pi/issues/8760)

4. **#5886 — AgentSession settlement/continuation and assistant-tail lifecycle bugs** (11 comments)
   Meta-issue from mitsuhiko covering recurring bugs where post-run logic resumes from a transcript that no longer matches reality. [Link](https://github.com/earendil-works/pi/issues/5886)

5. **#8823 — Esc during active streaming often fails to cancel the in-flight request** (6 comments)
   Abort is registered, but the HTTP request keeps running until the provider finishes, wasting tokens and latency during cancellation. [Link](https://github.com/earendil-works/pi/issues/8823)

6. **#8643 — Bedrock: OpenAI models reject images nested in `toolResult.content`** (5 comments, 👍1)
   Proposes hoisting tool-result images into sibling user blocks for Bedrock-OpenAI parity with `openai-completions.ts`; PR-grade fix is already on a fork. [Link](https://github.com/earendil-works/pi/issues/8643)

7. **#9209 — GitHub Copilot GPT-6 Astra routed to unsupported `/chat/completions`** (5 comments)
   Symptomatic of a broader config-vs-endpoint mismatch issue (now also surfaced as #9277). [Link](https://github.com/earendil-works/pi/issues/9209)

8. **#8826 — Cap agent retry backoff for prolonged transient outages** (4 comments)
   Adds a configurable upper bound to coding-agent's exponential backoff so users on flaky networks don't wait minutes between attempts. [Link](https://github.com/earendil-works/pi/issues/8826)

9. **#9276 — The grep tool with context lines can cause OOM** (2 comments)
   The grep tool reads entire matched files into memory when `context > 0`; causes JavaScript heap OOM in headless SDK usage. Real production impact. [Link](https://github.com/earendil-works/pi/issues/9276)

10. **#6996 — Gemini 3.x models fail during tool use due to missing `thought_signature`** (9 comments, CLOSED)
    Now closed (fixed), but worth tracking as the pattern recurs across Gemini releases — `thought_signature` must survive across turns in history. [Link](https://github.com/earendil-works/pi/issues/6996)

## Key PR Progress

1. **#9116 — feat(ai): add mid-conversation system messages** (mitsuhiko, OPEN)
   First layer of the #8998 split: adds support in `pi-ai` for an explicit `system` role that can be inserted mid-conversation. Foundation for tools/extensions that mutate prompt state. [Link](https://github.com/earendil-works/pi/pull/9116)

2. **#9117 — feat(coding-agent): deliver prompt and tool changes as system message deltas** (mitsuhiko, OPEN)
   Second layer: coding-agent emits prompt/tool-loadout changes as system-message deltas instead of mutating the top-level system prompt. Visible impact on every request after a tool add/remove. [Link](https://github.com/earendil-works/pi/pull/9117)

3. **#9253 — fix(ai): route Copilot GPT models through Responses (fixes astra)** (petrroll, CLOSED)
   Fixes #9209 by switching Copilot GPT models from `/chat/completions` to `/responses`; cleans up legacy `gpt-4*` references. [Link](https://github.com/earendil-works/pi/pull/9253)

4. **#9297 — fix(ai): remove invalid Fable 5 fallback target** (petrroll, OPEN)
   Drops `claude-opus-4-8` from `claude-fable-5`'s `allowedFallbackModels` (API now rejects it) and locks in tests covering generated fallback metadata, including Fable 5.1. [Link](https://github.com/earendil-works/pi/pull/9297)

5. **#9301 — feat(coding-agent): confirm device-code browser and clipboard actions** (petrroll, OPEN)
   Fixes #9282: restores opt-in auto-open of the device-code verification page and clipboard copy on best-effort basis (default off; opt-in for Copilot). [Link](https://github.com/earendil-works/pi/pull/9301)

6. **#7742 — feat(ai): Ollama Cloud support** (ParthSareen, OPEN)
   Adds Ollama Cloud as a provider, sourced from `OLLAMA_API_KEY` and `models.dev`. Local Ollama flow preserved; follows existing provider patterns. [Link](https://github.com/earendil-works/pi/pull/7742)

7. **#9292 — feat(coding-agent): add manual retry api/command** (jwueller, CLOSED)
   Adds an explicit user-triggered retry path for cases where auto-retry gives up too early. [Link](https://github.com/earendil-works/pi/pull/9292)

8. **#8744 — feat(tui): add opt-in overlay selection exclusion** (wutongyuonce, OPEN)
   Lets overlays opt out of fullscreen text-selection capture so copied text always comes from the underlying transcript. [Link](https://github.com/earendil-works/pi/pull/8744)

9. **#8615 — fix(coding-agent): preserve interleaved user content** (wutongyuonce, CLOSED)
   Preserves text/image block order through `sendUserMessage()`, idle prompts, and streaming steer/follow-up delivery; covers interleaved extension inputs. [Link](https://github.com/earendil-works/pi/pull/8615)

10. **#9272 — fix(coding-agent): allow extensions to stream from custom providers** (rwachtler, CLOSED)
    Exposes `stream(...)` and `streamSimple(...)` alongside `complete(...)` so extensions can stream from custom providers. Fixes #8964. [Link](https://github.com/earendil-works/pi/pull/9272)

## Hot Discussions

_Discussion data was not provided in the source set — this section is omitted._

## Feature Request Trends

- **Mid-conversation prompt/tool mutation** — The #9116/#9117 split is the structural fix users have been asking for, enabling extensions to update tool sets and prompt fragments without restarting sessions.
- **Bounded retry / cancellation control** — Multiple issues (#8826 retry cap, #8823 Esc-during-stream, #9292 manual retry) point to users wanting more deterministic control over runaway or stuck requests.
- **Provider parity and routing correctness** — Recurring demand for clean provider→endpoint routing (#9209, #9277, #9253, #8760, #8643, #9294, #9298). Users want Pi to stop sending wrong-API requests when models are added or updated.
- **Windows as a first-class target** — #7547 is the maintainers explicitly asking how to invest in Windows; clipboard behavior (#7973), fullscreen image rendering (#9169), and TUI compatibility all surface here.
- **Custom streaming for extensions** — #9272 / #8964 show users want first-class streaming APIs on `modelRegistry` to build custom providers.
- **Performance budgets and headless SDK reliability** — #7739 (startup budget), #9055 (EventStream O(n²)), #9063 (tool-call arg re-parse O(n²)), #9267 (fuzzy scan), #9276 (grep OOM) all cluster around long-running/headless use cases.
- **Usability regressions** — #9273 (manual model/thinking no longer auto-persists since 0.84.3) is a regression users are keen to see reverted.

## Developer Pain Points

- **Streaming hangs and silent aborts** — #4945 and #8823 both describe situations where Escape doesn't actually stop work, leaving users unsure whether the model is still running or wedged.
- **Provider-catalog drift** — Almost every closed issue today is a model that changed endpoints or pricing (Copilot, Grok, Fable 5, Gemini, OpenRouter free tier). The catalog layer needs a faster feedback loop with `models.dev` and provider release notes.
- **Headless SDK stability** — OOM from the grep tool (#9276), quadratic streaming buffers (#9055, #9063), and missing `x-opencode-session` headers (#9290, #9237) are the everyday failures of users running Pi in server-side or CI contexts.
- **Windows-specific friction** — #7547 + #9169 + #7771 paint a picture of Windows still being a "best-effort" target: install errors, image rendering in fullscreen mode, and a wide matrix of terminal/WSL configurations.
- **Extension surface gaps** — Extension authors are repeatedly hitting the same omissions (no `stream` API, no `allowCommands`, no `x-opencode-session` injection, no opt-in overlay exclusion), forcing workarounds.
- **Tool-result shape mismatches across providers** — #8643 (Bedrock-OpenAI images) and #6996 (Gemini `thought_signature`) suggest Pi's normalization layer still has provider-specific holes that show up late.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-08

## Today's Highlights
The v0.23.1-preview.2 and a new nightly (v0.23.0-nightly.20260907) ship alongside the most concrete preview work yet on the **OpenTUI migration tracking issue (#8662)**, which has now crossed 32 comments and signals the project's intent to leave its heavily-patched ink 7 + React 19 renderer behind. Web Shell continues to be the dominant surface for active development, with cross-cutting PRs covering split-view navigation, web previews, context-usage sidebar, git remote management, and shell/monitor output rendering, while a separate line of fixes targets **daemon session reclaim bugs** (`activeWork` recovery in #8586, background-shell drop in #11119, and busy/idle reconciliation in #11118).

## Releases
- **[v0.23.1-preview.2](https://github.com/QwenLM/qwen-code/releases)** — adds web-shell visualization/management for dynamic workflow runs and derives the session workflow project ([#10594](https://github.com/QwenLM/qwen-code/pull/10594) by @qqqys).
- **[v0.23.0-nightly.20260907.f1ed3bc31a](https://github.com/QwenLM/qwen-code/releases)** — same workflow-run surface as the preview; carried forward into the nightly channel.
- **[cua-driver-rs v0.20.4](https://github.com/QwenLM/qwen-code/releases)** — CUA driver prebuilts for macOS (codesigned + notarized universal binary + `QwenCuaDriver.app`), Linux (x86_64 + arm64, glibc ≥ 2.31), and Windows (UIAccess worker + native SDK for x86_64 + arm64).

## Hot Issues
1. **[#8662 — Migrate TUI rendering layer from ink to OpenTUI (tracking)](https://github.com/QwenLM/qwen-code/issues/8662)** — 32 comments, highest engagement on the board. Documents the structural cost of a ~1037-line ink patch (flicker, viewport bugs) and frames the migration as the strategic answer. Important as a roadmap signal.
2. **[#44 — 百炼收费陷阱](https://github.com/QwenLM/qwen-code/issues/44)** — 20 comments, still being updated. A long-running user complaint about unexpected billing on 百炼 (Bailian) for trivial queries — reflective of trust issues with the hosted path, not a code bug.
3. **[#8586 — Track `activeWork` and background Agent recovery](https://github.com/QwenLM/qwen-code/issues/8586)** — 9 comments. Asks for an explicit `activeWork` fact in deep-daemon health plus a five-layer recovery path for background agents that outlive their foreground prompt. Strategic for daemon-hosted Web Shell.
4. **[#11119 — `serve`: background shell output and wake notifications silently dropped](https://github.com/QwenLM/qwen-code/issues/11119)** — 8 comments, P1. In `qwen serve`, a background shell keeps producing output but the daemon session wedges once the turn that started it recycles. Directly motivates the #8586 work.
5. **[#11303 — Windows `qwen-cli` (VS Code Companion) leaks headless conhost.exe ConPTY processes](https://github.com/QwenLM/qwen-code/issues/11303)** — 6 comments. After ~12h of uptime, a single qwen-cli instance accumulates 347 conhost children holding ~2.8 GB. A concrete, high-impact Windows reliability regression.
6. **[#10530 — 400 "Failed to initialize samplers: failed to parse grammar" in 0.22.3](https://github.com/QwenLM/qwen-code/issues/10530)** — 6 comments. Qwen 3.8 27b / Qwen 3.6 35b through llama-server start failing with a grammar-parse error that didn't exist in earlier versions. Pi and OpenCode are unaffected — pointing at a qwen-code-side request payload change.
7. **[#3361 — Agent misinterprets shell output as empty despite successful execution](https://github.com/QwenLM/qwen-code/issues/3361)** — 6 comments, long-standing. With OpenAI-compatible APIs, the model claims `pwd && git rev-parse --show-toplevel` returned nothing despite UI-visible output.
8. **[#10435 — New version crashes inference on local llama-server](https://github.com/QwenLM/qwen-code/issues/10435)** — 5 comments, duplicate of #10530. Reinforces the local-inference regression as a top concern.
9. **[#8835 — [repo-hygiene] 2026-W33 report-only findings (8 items)](https://github.com/QwenLM/qwen-code/issues/8835)** — 5 comments. Automated security/code-hygiene sweep, including the same `startsWith('..')` containment bug class in ACP session cwd / worktree sidecar paths.
10. **[#10865 — `perf(web-shell)`: session workflow projection derived three times per render](https://github.com/QwenLM/qwen-code/issues/10865)** — 5 comments. Follow-up to the merged #8583. Highlights re-derivation of an index designed to be built once, in `SessionWorkflowCockpit.tsx`.

## Key PR Progress
1. **[#11003 — Delegate a subagent turn to an external agent over ACP (Claude Code first)](https://github.com/QwenLM/qwen-code/pull/11003)** — A subagent definition can declare an `executor` block; the turn runs in another process over ACP and is re-published into the same stream. The headline interop feature of the cycle.
2. **[#11289 — `fix(web-shell)`: keep mid-turn messages the daemon rejects at idle](https://github.com/QwenLM/qwen-code/pull/11289)** — Typing during a running turn that races into an idle session is now re-delivered as an ordinary prompt instead of returning a bare refusal.
3. **[#11250 — `feat(web-shell)`: improve split-view session navigation](https://github.com/QwenLM/qwen-code/pull/11250)** — Reuses the sidebar session-details popover for titles, adds a thin header indicator for the last interacted pane, and a toolbar button to cycle panes awaiting approval or user input.
4. **[#11086 — `feat(serve)`: scope extensions to workspace runtimes](https://github.com/QwenLM/qwen-code/pull/11086)** — Global extension catalog is reconciled into per-workspace live runtimes; updates extension management, the composer add menu, and `@` resolution.
5. **[#11276 — `feat(web-shell)`: web previews with saved delivery history](https://github.com/QwenLM/qwen-code/pull/11276)** — Web preview panel for browser-reachable dev URLs with desktop/mobile widths, refresh, and external opening; URL/width remembered per session.
6. **[#9305 — `fix(ui)`: bottom-align short VP content](https://github.com/QwenLM/qwen-code/pull/9305)** — Closes the cosmetic gap above the composer when a conversation fits inside the viewport (VP mode).
7. **[#10347 — `feat(core)`: auto-retry transient network errors (EOF) where Ctrl+Y is unavailable](https://github.com/QwenLM/qwen-code/pull/10347)** — Reclassifies wrapped transport errors (e.g. `400 network error ... EOF`) as retryable so the existing bounded retry applies in channels.
8. **[#10455 — `fix(cli)`: don't crash startup when the output-language file is unwritable](https://github.com/QwenLM/qwen-code/pull/10455)** — Hardens the global-config write so a read-only home directory (e.g. shared runners) no longer aborts startup.
9. **[#10938 — `feat(web-shell)`: make Session Workflow dependencies navigable and quiet its chrome](https://github.com/QwenLM/qwen-code/pull/10938)** — Closes navigation, shape and documentation gaps from #8583; the plan DAG now leads with the step, not its status.
10. **[#11206 — `feat(mesh)`: persistent shared-thread agent collaboration](https://github.com/QwenLM/qwen-code/pull/11206)** — Workspace agents with identities that collaborate on shared threads: assign work, interject mid-run, inspect attributed results, cancel, resolve blockers, and mark reviewed.
11. **[#11308 — `fix(channels)`: restore worktree-task routes through the managed load path](https://github.com/QwenLM/qwen-code/pull/11308)** — Channel worker cold-start now re-attaches persisted worktree-task routes via the managed load path (workspace root + daemon worktree attestation).
12. **[#11070 — `fix(acp)`: preserve approval mode across cold resume](https://github.com/QwenLM/qwen-code/pull/11070)** — A daemon session's approval mode (including Plan return mode) now survives ACP child reaping and cold load/resume.

## Feature Request Trends
Aggregating across issues and PRs, the dominant directions are:

- **Web Shell as the primary client surface.** Half of the active PRs target it: split-view navigation, web previews, context-usage tab, git remote management, monitor/shell task output, workflow-cockpit polish. Web Shell is becoming a long-running work IDE, not just a thin CLI frontend.
- **Multi-agent orchestration.** Two big bets — external ACP delegation to other coding agents (#11003), and an in-product multi-agent mesh with shared threads (#11206) — show a clear shift from "one model + one user" to "one user + N agents + cross-tool delegation."
- **Daemon/session lifecycle resilience.** `activeWork` recovery (#8586), background-shell drop (#11119), session reclaim when cron/goal/monitor is busy (#11118), approval-mode durability (#11070), channel worktree route restoration (#11308). All point to one theme: long-lived, multi-turn hosted sessions must survive idle, reap, and cold resume.
- **OpenTUI over ink.** With #8662 surfaced as the tracking issue and several CI failure PRs explicitly referencing "E2E Interactive - OpenTUI renderer (bun)", the renderer migration is now an in-flight constraint on the test matrix.
- **First-class local / OpenAI-compatible inference.** Recurring ask: better sampler/grammar compatibility with llama-server (#10530, #10435), `/effort` propagation to generic backends (#11227), `customHeaders` template expansion for per-session routing (#10995), semantic memory MCP for local hosts (#10684).

## Developer Pain Points
- **Local-inference regressions in 0.22.3.** Multiple users (Qwen 3.8 27b, Qwen 3.6 35b via llama-server) now hit `400 Failed to initialize samplers: failed to parse grammar`, which Pi and OpenCode don't trigger — strongly suggests a request-payload or grammar-format change in qwen-code.
- **`/effort` silently dropped on OpenAI-compatible backends.** The UI updates but the value never reaches the HTTP request (#11227), making reasoning-effort controls unreliable outside Alibaba-hosted endpoints.
- **Windows / VS Code Companion stability.** The conhost.exe leak in #11303 (347 children, ~2.8 GB after 12 h) is the kind of regression that breaks trust quickly on the Windows path; a single Windows reliability user story now dominates a long comment thread.
- **Daemon-hosted Web Shell wedging.** Background shells that legitimately produce output are dropped as the session recycles (#11119), and sessions running cron/goal/monitor/history work can't be reclaimed (#11118) — together these make `qwen serve` feel unreliable for any non-trivial workflow.
- **Shell-output misread by the agent (#3361).** With OpenAI-compatible APIs, the model claims commands returned empty despite visible output — a recurring signal that tool-result handling is not consistent across backends.
- **Channel / DingTalk lifecycle visibility (#10504 PR).** The need for localized reactions like Thinking / Reading / Searching / Running / Editing / Retrying shows users want real-time, sanitized lifecycle cues inside chat surfaces — raw tool output isn't enough.
- **CI flake vs. real bug noise.** A long tail of `qwen-main-ci-failure` issues (#11197, #11203, #11210, #11219, #11231, #11249, #11040, #11307) — mostly E2E Interactive OpenTUI shards — suggests the renderer migration is currently a tax on signal-to-noise in main CI, not yet a tax on users.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*