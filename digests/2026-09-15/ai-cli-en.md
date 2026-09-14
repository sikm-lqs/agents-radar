# AI CLI Tools Community Digest 2026-09-15

> Generated: 2026-09-14 17:02 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report: AI CLI Ecosystem — 2026-09-15

## 1. Ecosystem Overview

The AI CLI tooling landscape has consolidated around seven actively competing products spanning corporate giants (Anthropic, OpenAI, Google, GitHub/Alibaba) and independents (OpenCode/anomalyco, earendil-works). Competition has shifted from core code-generation capability toward **agent orchestration reliability, session integrity, cost transparency, and enterprise manageability** — today's issue queues are dominated not by "the model is bad" but by "the harness broke." A second clear pattern: as tools mature, their communities increasingly demand *verifiability* (auditable spend, replayable transcripts, inspectable subagents) rather than raw capability. Meanwhile, cross-platform gaps — especially Windows — and multi-provider routing (BYOK, OpenAI-compatible gateways) remain systemic weak points across the entire ecosystem.

## 2. Activity Comparison

*Counts reflect items surfaced in each 24h digest (curated, not raw repo totals); channels with no data in the feed are marked N/A.*

| Tool | Hot Issues | PRs | Discussions | Release (24h) |
|---|---|---|---|---|
| **Claude Code** | 10 (top: #69044, 50 💬) | ~4, all closed; no open PRs beyond docs/test infra | None reported | None |
| **OpenAI Codex** | 10 (top: #44720, 36 💬) | 10, all closed (sandbox/MCP/proxy engineering) | ~9 (incl. #9200: 190 👍) | rust-v0.155.0-alpha.4 |
| **Gemini CLI** | 10 (P1/P2 triaged) | 10 | N/A — no data in feed | v0.61.0-nightly (nightly cadence) |
| **Copilot CLI** | 11 (incl. closed #1029) | 0 — explicitly none updated in 24h | None reported | v1.0.84-6 |
| **OpenCode** | 10 (top: #48811, 24 👍) | 12 | N/A — no data in feed | None |
| **Pi** | 12 (digest reports 50 issues / 30 PRs touched in 24h) | 12 | 1 | None |
| **Qwen Code** | 10 | 10 | N/A — no data in feed | v0.23.4 stable + v0.23.3-nightly + CUA driver prebuilts |

**Read:** Codex shows the highest absolute engagement and PR throughput; Pi the highest velocity relative to project size (50 issues/30 PRs touched); Qwen Code the most structured release engineering (stable + nightly + vendored binaries); Copilot CLI the only tool with zero PR movement, despite shipping a release.

## 3. Shared Feature Directions

1. **Subagent/agent reliability & observability** — *Gemini CLI, Claude Code, Codex, Qwen Code, OpenCode*. Gemini's #22323 (subagent reports "success" after MAX_TURNS exhaustion) and #21409 (generalist hangs); Claude Code's #77798 (hidden mid-turn messages) and #93996 (orphaned subprocesses); Codex's #43468 (`read_thread` returns empty for visible turns) and #44088 (no edit cards for shell writes); Qwen's #11500 crash cluster; OpenCode's #49008 self-reply loop. Uniform demand: *termination reasons must be explicit and inspectable.*
2. **Cost / rate-limit transparency** — *Claude Code, Codex, Pi, Qwen Code, OpenCode*. Claude Code's four-issue accounting cluster (#94339/37/42/30); Codex's 5h-window exhaustion (#43341, #45411) and Pro 20X pause backlash (#45211); Pi's cache-TTL billing bugs (#9457, #9210); Qwen's batch API and per-session search caps (#11874, #11846); OpenCode's unresolved billing thread (#45278, 17 💬).
3. **Shell-permission parsing security** — *Claude Code, Qwen Code*. Claude #94314 (`;`/`&&` not split before allow-rule matching) vs. Qwen #11851 (`\s` separators smuggle async operators) and #11882 (two splitters disagreeing on `#` comments). Identical bug class, independently discovered — strong signal for a shared, tested command-parsing standard.
4. **Session persistence & resume integrity** — *all seven tools*. Claude #94336 (silent data loss); Copilot #4505 (stale connection IDs bricking resumed sessions); Pi #9306/#9391/#9590 (orphaned tool calls, stale signed thinking, corrupted base64); OpenCode #42735/#45839 (replay rejections); Codex #43468. The single most universal pain point in the digest set.
5. **Remote / headless / daemon operation** — *Codex, Qwen Code, OpenCode, Claude Code*. Codex's #9200 (190 👍, remote control from ChatGPT — explicitly benchmarked against Claude Code) plus #20312 (event-driven wake); Qwen's daemon protocol cluster (#11866–69) and remote web shell (#11548); OpenCode's background server (#41696).
6. **Enterprise policy plumbing** — *Copilot CLI, Codex, Claude Code*. Copilot's #4556/#4837/#3572 (plugins install-but-stay-disabled, marketplaces never register, org agents invisible); Codex's IdP-aware MCP catalog (#45459); Claude's Cowork git proxy over-blocking (#76248) and JWT egress gap (#34690).
7. **BYOK / multi-provider routing** — *Copilot CLI, Qwen Code, OpenCode, Pi*. Copilot's three same-day provider regressions (#4840 Deepseek, #4836 Grok tool limits, #4835 Gemini schema); Qwen #11590 (auto-injected `metadata` breaks all third-party models via DashScope); Pi's multi-account OAuth ask (#1391, #7814).

## 4. Differentiation Analysis

- **Claude Code** — Deepest *governance* focus: CLAUDE.md contract adherence (#90542), sandbox rule semantics, Cowork allow-lists. Polished UX work continues (#94184 diff pane), but release quality is eroding trust (three consecutive TUI regressions across 2.1.247/269/270). Closed-source core means PR surface is limited to docs/plugins/tests.
- **OpenAI Codex** — Investing heavily in a **Rust core + Desktop app + ChatGPT integration** stack; today's PRs are pure platform engineering (Windows sandbox modularization #45455/#45312, managed proxy isolation #45463, MCP memory/perf #45439/#45440). Community pressure is consumer-continuity-shaped (mobile remote control), not enterprise policy.
- **Gemini CLI** — Most *research-forward*: zero-dependency OS sandboxing via native bash affinity (#19873) and AST-aware tooling to cut token noise (#22745). Distinctive triage discipline (P1/P2 labels, maintainer-led Auto Memory hardening).
- **Copilot CLI** — **GitHub-native enterprise** positioning: org agents, MDM policy, managed marketplaces. Shipping end-user config UX (`/config`, `/sandbox`), but today's issue queue shows the enterprise path is leaking at every joint.
- **OpenCode** — Most *contributor-driven*: labeled contributor PRs (i18n, autocomplete, skill settings) alongside architecture work (provider/model registry split #48901, codemode host-class exposure #48941). Unique self-inflicted crisis: forced V2 layout sunset with no multi-worktree parity — a process maturity warning.
- **Pi** — The *harness-engineering* project: replayable transcript architecture (#9548 records system-prompt/tool changes mid-conversation), extension API primitives (RFC 54 developer role), precise per-adapter cost accounting. Smallest audience, highest technical density per PR.
- **Qwen Code** — Broadest **surface expansion**: CUA driver (macOS notarized, Windows UIAccess), web shell as PWA/Android product, DashScope batch integration, DingTalk channels. Corporate-coordinated feature clusters (the @wenshao daemon protocol series) rather than reactive fixes.

## 5. Community Momentum & Maturity

- **Fastest iterating:** **Codex** (10 closed engineering PRs + alpha release + 190-👍 discussion) and **Qwen Code** (stable + nightly + binary vendoring on one day). **Pi** punches far above its weight (50 issues/30 PRs touched; maintainers bulk-closing triage overflow).
- **Highest engagement quality:** **Claude Code** (50-comment longitudinal failure catalogue in #69044) and **OpenCode** (13-comment layout debate with workflow evidence) — signs of invested power users, though OpenCode's is currently adversarial.
- **Most process-mature:** **Gemini CLI** (nightly cadence, severity labels, named maintainer workstreams) and **Qwen Code** (structured release trains).
- **At-risk signals:** Claude Code's consecutive regressions on "latest" versions are eroding auto-update trust; Copilot CLI's zero-PR day amid a hot issue queue suggests engineering happens behind closed doors or is lagging triage; OpenCode's billing thread (#45278) and forced-redesign backlash show support and release-management gaps.

## 6. Trend Signals

1. **"Silent failure" is the #1 trust killer.** False subagent success (Gemini #22323), hidden messages (Claude #77798), no-error TUI death (Qwen #11500), mislabeled provider errors (Pi #9298). *Reference value:* build explicit termination-reason propagation and crash-surfacing before adding features.
2. **Permission parsing needs an industry standard.** Two vendors independently shipped allowlist bypasses via compound-command/whitespace semantics this week. A shared, fuzz-tested shell-grammar library is an open opportunity.
3. **Cost accounting is becoming a product feature, not telemetry.** Cache-TTL billing bugs (Pi), 5h-window exhaustion (Codex), batch pacing caveats (Claude) all drew disproportionate community heat.
4. **Remote control / event-driven wake is the next battleground**, with Claude Code as the benchmark Codex users cite (190 👍). Headless daemons + mobile UI will likely be table stakes within two quarters.
5. **The replayable transcript is emerging as the canonical session architecture** (Pi #9548, OpenCode's replay fixes, universal resume-corruption complaints) — durable, replay-safe session state is a differentiator for anyone building agent harnesses.
6. **Windows remains systematically underserved** across five of seven tools (conhost flashes, orphaned process trees, sandbox regressions, UTF-8 mojibake) — a concrete differentiation opening.
7. **BYOK amplifies schema-fragility failures** — every tool routing through OpenAI-compatible gateways hit opaque 400s; pre-flight provider-capability validation (tool-count limits, schema shapes) is a low-cost, high-goodwill fix.

---
*Sources: per-tool community digests for 2026-09-15 as provided; issue/PR references link to the respective repositories.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
*Data as of 2026-09-15 | Source: github.com/anthropics/skills*

> **Note on data:** PR comment counts were undefined in the source data; the "Top Skills Ranking" below uses indirect attention signals (related issue discussion volume, 👍 reactions, criticality, and update recency) to identify the most actively discussed PRs.

---

## 1. Top Skills Ranking

The following PRs generated the strongest community attention, primarily because they address widely reproduced failures in core tooling rather than adding new skills.

### 1. [#1298 — fix(skill-creator): run_eval.py always reports 0% recall](https://github.com/anthropics/skills/pull/1298)
- **Author:** MartinCajiao | **Status:** OPEN | **Updated:** 2026-09-14
- **Functionality:** Repairs the evaluation harness used by `skill-creator`. Without this fix, `run_loop.py` and `improve_description.py` are optimizing against noise — every skill description scores 0% recall regardless of content.
- **Why it's hot:** Directly linked to [Issue #556](https://github.com/anthropics/skills/issues/556) (**12 comments, 7 👍**) with 10+ independent reproductions, making it arguably the most-validated bug in the repo. Also installs the eval artifact as a real skill and fixes Windows stream reading and parallel worker stability.

### 2. [#1742 — fix(mcp-builder): mcp>=2 streamable_http_client import & custom headers](https://github.com/anthropics/skills/pull/1742)
- **Author:** Kuldeeep18 | **Status:** OPEN | **Updated:** 2026-09-13
- **Functionality:** Restores compatibility with the `mcp>=2.0.0` SDK, where `streamable_http_client` was renamed and custom HTTP headers must now be configured via `create_mcp_http_client`. Without this fix, `connections.py` is broken on the current SDK.
- **Discussion highlights:** Fixes [Issue #1668](https://github.com/anthropics/skills/issues/1668); part of a cluster of mcp-builder reliability fixes that dominated recent activity.

### 3. [#1602 — fix: evaluation serialization, benchmark metrics, encoding, script stability](https://github.com/anthropics/skills/pull/1602)
- **Author:** AbhiPra24 | **Status:** OPEN | **Updated:** 2026-08-24
- **Functionality:** Sweeping reliability patch touching **mcp-builder** (extracting `TextContent` blocks before serialization), encoding fixes, and benchmark metric corrections.
- **Why it's hot:** Directly resolves [Issue #1390](https://github.com/anthropics/skills/issues/1390) (**4 comments**), where `evaluation.py` silently fabricated a tool-execution error for **every** call against a real MCP server, scoring 0/N.

### 4. [#1724 — mcp-builder: update evaluation.py default model to claude-sonnet-5](https://github.com/anthropics/skills/pull/1724)
- **Author:** ExpertVagabond | **Status:** OPEN | **Updated:** 2026-09-07
- **Functionality:** Refreshes the eval model from the deprecated `claude-3-7-sonnet-20250219` snapshot to `claude-sonnet-5` in both the `run_evaluation()` signature and the `-m/--model` argparse option.
- **Discussion highlights:** Reflects community frustration with stale model references — see also [PR #1607](https://github.com/anthropics/skills/pull/1607) doing the same for the `claude-api` skill (marking four retired model IDs as retired).

### 5. [#538 — fix(pdf): correct case-sensitive file references in SKILL.md](https://github.com/anthropics/skills/pull/538)
- **Author:** Lubrsy706 | **Status:** OPEN | **Updated:** 2026-04-29
- **Functionality:** Patches 8 case-sensitivity mismatches (`REFERENCE.md` → `reference.md`, `FORMS.md` → `forms.md`) that break the `pdf` skill on case-sensitive filesystems (Linux/macOS).
- **Why it's hot:** A textbook "small fix, big blast radius" — a one-character mistake silently breaks skill loading on every non-Windows user.

### 6. [#541 — fix(docx): prevent tracked-change w:id collision with existing bookmarks](https://github.com/anthropics/skills/pull/541)
- **Author:** Lubrsy706 | **Status:** OPEN | **Updated:** 2026-04-16
- **Functionality:** Fixes document corruption when the DOCX skill adds tracked changes to documents that already contain bookmarks — the hardcoded low `w:id` values (1, 2, 3) collided with the shared OOXML ID space.
- **Why it's hot:** Silent data corruption is the most expensive class of bug; affects every user who edits real-world DOCX files.

### 7. [#539 — fix(skill-creator): warn on unquoted description with YAML special characters](https://github.com/anthropics/skills/pull/539)
- **Author:** Lubrsy706 | **Status:** OPEN | **Updated:** 2026-04-16
- **Functionality:** Adds pre-parse validation in `quick_validate.py` to catch unquoted `description` fields containing `:` *before* `yaml.safe_load()` silently truncates them.
- **Why it's hot:** Frictionless DX — converts a confusing "my skill description got eaten" failure into a clear warning at the right time.

### 8. [#1765 — fix(office): decode redlining diffs as UTF-8](https://github.com/anthropics/skills/pull/1765)
- **Author:** 00200200 | **Status:** OPEN | **Updated:** 2026-09-14
- **Functionality:** Decodes `git diff` output as UTF-8 in the DOCX/PPTX/XLSX redlining validators, fixing broken tracked-change diffs for non-ASCII content on Windows and non-UTF-8 locales.
- **Why it's hot:** Fixes [Issue #1707](https://github.com/anthropics/skills/issues/1707); verified against Polish and other non-Latin scripts.

---

## 2. Community Demand Trends (from Issues)

The Issues stream reveals three converging demands:

### 🔒 Trust & Security (highest volume)
- **[#492 — Community skills under `anthropic/` namespace enable trust-boundary abuse](https://github.com/anthropics/skills/issues/492)** — **43 comments, 2 👍**. The single most-discussed thread in the dataset. Community-made skills distributed under the official namespace impersonate Anthropic skills and can inherit elevated user trust. Strong appetite for a verified-publisher or namespace-segregation model.

### 🏢 Enterprise Distribution
- **[#228 — Enable org-wide skill sharing in Claude.ai](https://github.com/anthropics/skills/issues/228)** — **16 comments, 8 👍** (highest 👍 ratio in the dataset). Users want a shared library / direct share link instead of manually downloading `.skill` files and uploading them one by one.
- **[#1175 — SharePoint Online via Agent Skills](https://github.com/anthropics/skills/issues/1175)** — **4 comments** (CLOSED). Early scoping discussion for SKILL.md-based access control in enterprise document systems.
- **[#29 — Usage with AWS Bedrock](https://github.com/anthropics/skills/issues/29)** — **4 comments** (still OPEN since 2025-10). Long-running enterprise integration gap.

### 🧠 Memory, Reasoning & Agent Quality
- **[#1329 — compact-memory skill proposal](https://github.com/anthropics/skills/issues/1329)** — **9 comments**. Symbolic notation for compact agent state; reduces context spend on long-running agent notes.
- **[#1385 — Reasoning Quality Gate Pipeline](https://github.com/anthropics/skills/issues/1385)** — **4 comments, 1 👍**. Pre-task calibration → adversarial review → delivery verification as composable skills.
- **[#412 — agent-governance skill](https://github.com/anthropics/skills/issues/412)** — **6 comments** (CLOSED). Policy enforcement, threat detection, trust scoring, audit trails.
- **[#16 — Expose Skills as MCPs](https://github.com/anthropics/skills/issues/16)** — **4 comments** (OPEN since 2025-10). Stable, long-standing request for first-class MCP exposure of skill APIs.

### 🛠 Skill Reliability & Quality
- **[#556 — `run_eval.py` 0% trigger rate](https://github.com/anthropics/skills/issues/556)** — **12 comments, 7 👍**. Same root cause as PR #1298.
- **[#62 — Skills disappearing](https://github.com/anthropics/skills/issues/62)** — **10 comments, 2 👍**. Persistence/visibility bug affecting user trust.
- **[#189 — `document-skills` & `example-skills` install identical content](https://github.com/anthropics/skills/issues/189)** — **6 comments, 9 👍**. Plugin packaging duplicates cause context-window bloat.
- **[#1487 — `claude-api` skill injects ~156k tokens in one tool call](https://github.com/anthropics/skills/issues/1487)** — **4 comments**. Eager content loading exhausts context.
- **[#1362 — web-artifacts-builder pnpm ≥10.1 breakage](https://github.com/anthropics/skills/issues/1362)** — **3 comments**. Toolchain drift.

---

## 3. High-Potential Pending Skills

These PRs are still OPEN but active, addressing critical bugs or widely-requested features — likely to land soon:

| # | PR | Skill / Area | Why it will likely merge |
|---|----|--------------|--------------------------|
| 1 | [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator eval fix | 10+ reproductions of #556; addresses core authoring loop |
| 2 | [#1742](https://github.com/anthropics/skills/pull/1742) | mcp-builder SDK compat | Restores functionality on `mcp>=2.0.0` — merge-blocker for the entire mcp-builder workflow |
| 3 | [#1602](https://github.com/anthropics/skills/pull/1602) | mcp-builder eval serialization | Resolves 0/N scoring on real MCP servers (#1390) |
| 4 | [#1724](https://github.com/anthropics/skills/pull/1724) | mcp-builder model refresh | Aligns default eval model with current Sonnet generation |
| 5 | [#538](https://github.com/anthropics/skills/pull/538) | pdf skill case fix | Trivial, high-blast-radius Linux/macOS fix |
| 6 | [#541](https://github.com/anthropics/skills/pull/541) | docx tracked-change IDs | Prevents silent DOCX corruption |
| 7 | [#539](https://github.com/anthropics/skills/pull/539) | skill-creator YAML validation | Better DX for all skill authors |
| 8 | [#1765](https://github.com/anthropics/skills/pull/1765) | office redlining UTF-8 | Restores i18n support for tracked-change diffs |

---

## 4. Skills Ecosystem Insight

> **The community's most concentrated demand is making the skill-authoring loop itself trustworthy — fixing the broken evaluation harness (`skill-creator`) and the broken evaluation harness (`mcp-builder`) so that skill descriptions, MCP servers, and redlining workflows can be measured instead of guessed, while simultaneously preventing community skills from impersonating official ones via the `anthropic/` namespace.**

---

*Generated 2026-09-15 | Sources: 50 PRs and 15 Issues from anthrop

---

# Claude Code Community Digest — 2026-09-15

## Today's Highlights

The community signal is dominated by **session integrity and cost/billing reliability bugs**, especially under newer releases (2.1.269, 2.1.270). The most prominent thread — [#69044](https://github.com/anthropics/claude-code/issues/69044) — is a months-long catalogue of recurring errors from a daily user, while several fresh macOS/Bedrock reports ([#94252](https://github.com/anthropics/claude-code/issues/94252), [#94335](https://github.com/anthropics/claude-code/issues/94335)) describe sessions hanging permanently after `tool_result` delivery. On the positive side, PR [#94184](https://github.com/anthropics/claude-code/pull/94184) lands a polished `/diff` docked pane, and PR [#87079](https://github.com/anthropics/claude-code/pull/87079) fixes a silent security-rule matching gap.

## Releases

_No releases in the last 24 hours._

## Hot Issues

1. **[#69044 — Recurring errors documented over months of daily Claude Code use](https://github.com/anthropics/claude-code/issues/69044)** — A daily power user has compiled a structured, months-long catalogue of failure modes. Highest-comment thread on the board (50 comments); signals broad, persistent friction rather than a one-off regression.
2. **[#76248 — Cowork git proxy now blocks all pushes outside the authorized repo set](https://github.com/anthropics/claude-code/issues/76248)** — A mid-session change in Cowork broke push for any repo not on the session allow-list, including legitimate fine-grained PATs. 35 comments / 15 👍; tied to a suspected `CCR_TEST_GITPROXY` rollout.
3. **[#51847 — Windows "Another program is currently using this file" after update](https://github.com/anthropics/claude-code/issues/51848)** — Classic Windows file-handle lock preventing updates; closed, indicating a fix landed. 17 👍 reflect how widespread this update-blocking bug was on Windows.
4. **[#90542 — A 700-line CLAUDE.md was completely ignored across a 4.5h session](https://github.com/anthropics/claude-code/issues/90542)** — User followed all contract rules and saw every one violated, including ones the model quoted back. High-stakes failure for power users who rely on system-prompt governance.
5. **[#34690 — "Allow network egress – All domains" not reflected in session proxy JWT](https://github.com/anthropics/claude-code/issues/34690)** — Setting is silently ignored at runtime, blocking web/Cowork egress users expect. 20 👍, suggesting many confirm the gap.
6. **[#90067 — Shifted punctuation arrives unshifted in WezTerm (2.1.247 regression)](https://github.com/anthropics/claude-code/issues/90067)** — `Shift+/` produces `/` instead of `?`; root-cause traced to kitty keyboard protocol flag changes. Closed, but a textbook example of recent TUI input regressions.
7. **[#93782 — Dictation paste broken in VS Code WSL terminal after 2.1.269](https://github.com/anthropics/claude-code/issues/93782)** — Wispr Flow paste silently swallowed; 2.1.268 works. Tight repro range makes this actionable.
8. **[#94252 — Bedrock: Read `tool_result` never delivered, session wedges in `kevent64`](https://github.com/anthropics/claude-code/issues/94252)** — Mac/Bedrock users hit a permanent hang on tool result, impacting production reliability.
9. **[#77798 — Fable mid-turn messages hidden; long text emitted as a thinking block](https://github.com/anthropics/claude-code/issues/77798)** — Affects operator visibility into long assistant turns; ties to a cluster of related session-persistence reports.
10. **[#94314 — Bash allow-rules don't split on `;`/`&&` before matching](https://github.com/anthropics/claude-code/issues/94314)** — Compound-command smuggling bypasses scoped allowlists despite the docs saying otherwise. High-impact security concern for sandboxed users.

## Key PR Progress

1. **[#94184 — Docked `/diff` pane with pinned header, body-only scroll, wheel routing](https://github.com/anthropics/claude-code/pull/94184)** — Closes the visual gap with the built-in diff panel. *Closed.*
2. **[#71627 — Docs: note that prompt-approved hosts are session-scoped](https://github.com/anthropics/claude-code/pull/71627)** — Clarifies a behavior that previously surprised sandbox users losing host approvals on resume.
3. **[#93951 — Move diff/sec-default/telemetry tests next to the mods](https://github.com/anthropics/claude-code/pull/93951)** — Co-locates unit tests under `mods/<mod>/tests/`, runnable via `claude plugin test`. *Closed.*
4. **[#87079 — Make `**` glob match zero-depth paths in security guidance](https://github.com/anthropics/claude-code/pull/87079)** — Fixes a silent non-coverage bug where `**/*.ts` rules skipped top-level files; important because these are security rules where silent misses are dangerous.
5. **[#93782 — (Tracking) Regression in 2.1.269 dictation paste](https://github.com/anthropics/claude-code/issues/93782)** — Documented above; PR for the fix not yet visible.
6. **[#93951 — Mods test relocation](https://github.com/anthropics/claude-code/pull/93951)** — Listed above; helps plugin authors.
7. **[#94184 — Diff pane polish](https://github.com/anthropics/claude-code/pull/94184)** — Listed above.
8. *No additional open PRs in the last 24h.* The remaining items in the 24h window are documentation clarifications and test infrastructure moves rather than user-facing features.

## Feature Request Trends

- **Reliable session accounting**: Multiple issues ([#94339](https://github.com/anthropics/claude-code/issues/94339), [#94337](https://github.com/anthropics/claude-code/issues/94337), [#94342](https://github.com/anthropics/claude-code/issues/94342), [#94330](https://github.com/anthropics/claude-code/issues/94330)) converge on a single ask: predictable, auditable token/spend reporting — including across interrupts, tool-result persistence, and MCP batch pacing.
- **Better MCP ergonomics**: [#78041](https://github.com/anthropics/claude-code/issues/78041) calls out opaque/inconsistent tool namespaces; [#85908](https://github.com/anthropics/claude-code/issues/85908) wants Desktop Chat to be a wakeable orchestrator.
- **Cleaner prompt governance**: [#90542](https://github.com/anthropics/claude-code/issues/90542) underscores the need for verifiable adherence to `CLAUDE.md` contracts.
- **Cross-surface feature parity**: [#92031](https://github.com/anthropics/claude-code/issues/92031) (account-level plugins not syncing to web) and [#94309](https://github.com/anthropics/claude-code/issues/94309) (Cowork slash-command picker behavior) both push for consistency between Desktop, Cowork, and Web.

## Developer Pain Points

- **TUI/input regressions bite power users**: Two consecutive releases (2.1.247, 2.1.269) broke shifted-punctuation and dictation paste respectively. Together with [#85776](https://github.com/anthropics/claude-code/issues/85776) (blanked terminal title on exit corrupts tmux-resurrect), terminal-state handling is a clear weak spot.
- **"Latest version" doesn't mean "stable version"**: Several threads explicitly verify the bug reproduces on the newest release (2.1.269/270), eroding trust in auto-updates — especially on Windows and macOS Bedrock.
- **Sandbox & permission semantics are under-documented**: [#94314](https://github.com/anthropics/claude-code/issues/94314) shows the documented compound-command splitting doesn't actually happen, turning scoped allowlists into a false sense of security.
- **Orphaned subprocesses on session termination** ([#93996](https://github.com/anthropics/claude-code/issues/93996)): `tsc`/`vitest` left running unsupervised after a Claude Code crash wastes compute and pollutes state.
- **Session-loss / silent data loss**: [#94336](https://github.com/anthropics/claude-code/issues/94336) reports between-tool assistant text being replaced by a summary on disk — a regression from display-only summarization, and a serious durability concern.
- **Cost transparency**: Users want batch-level caveats once, not per-tool-result ([#94338](https://github.com/anthropics/claude-code/issues/94338)); want pre-flight spend checkpoints for "freely explore" tasks ([#94342](https://github.com/anthropics/claude-code/issues/94342)); and want bash outputs not silently persisted to `~/.claude` then re-read ([#94337](https://github.com/anthropics/claude-code/issues/94337)).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-15

## Today's Highlights

Today's activity is dominated by a heavy influx of closed/refactoring PRs from the `copyberry[bot]` automation (Guardian/MCP/Windows sandbox housekeeping) and a fresh `rust-v0.155.0-alpha.4` pre-release, alongside a steady stream of high-comment Windows Desktop bug reports (queueing, follow-up messages, app-server daemon). Community demand remains strong for **remote control from the ChatGPT app** and a **native event-driven session-wake primitive**.

## Releases

- **rust-v0.155.0-alpha.4** — New Rust CLI alpha published; no changelog body was published beyond the version tag. Watch for follow-up notes once 0.155.0 stabilizes.
  [Release](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.4)

## Hot Issues

1. **#44781 — Codex Desktop: editing and resending a queued message triggers "App-server queued follow-up no longer exists"** (28 comments, 34 👍). The most reacted Windows Desktop thread of the day — directly blocks a common iteration loop. [Link](https://github.com/openai/codex/issues/44781)
2. **#44720 — ChatGPT hit a snag bug reproduce (macOS, 26.908.31457)** (36 comments). The top-volume thread; closed, but the regression pattern feeds several follow-ups below. [Link](https://github.com/openai/codex/issues/44720)
3. **#45069 — Codex Desktop (Windows): follow-up messages in existing threads never send** (7 comments). Open, fresh on `26.908.40834` — a broken reply path makes threads effectively read-only. [Link](https://github.com/openai/codex/issues/45069)
4. **#43468 — `[desktop] read_thread/wait_threads returns items=[]` for completed turns visible in UI** (8 comments). App-server semantic gap that breaks programmatic session inspection. [Link](https://github.com/openai/codex/issues/43468)
5. **#45119 — macOS 14.2: sandbox startup fails with unbound variable `TIOCSTI`** (10 comments). Sandbox regression on older macOS; affects `0.154.0-alpha.6.2` and current `main`. [Link](https://github.com/openai/codex/issues/45119)
6. **#44743 — macOS app 26.908.31748: blank window — `r is not a function` (circular import)** (10 comments). Closed via rollback to `26.901.51231`; useful as a regression marker. [Link](https://github.com/openai/codex/issues/44743)
7. **#44088 — Codex desktop: shell/Python writes lack per-file edit cards** (11 comments). A real trust/safety gap: file edits done via shell bypass the visible review surface. [Link](https://github.com/openai/codex/issues/44088)
8. **#44736 — Windows: ChatGPT project prewarming locks local mirrors; startup erases `node_repl` workaround** (7 comments). Long-lived unresolved thread (refs #42215, #34499) with user-confirmed workaround. [Link](https://github.com/openai/codex/issues/44736)
9. **#44768 — Windows app-server daemon opens a visible console window for every hook and shell command** (2 comments). UX-breaking side effect of `codex app-server daemon start` on Windows. [Link](https://github.com/openai/codex/issues/44768)
10. **#45411 — Codex 0.154.0 / Plus / GPT-5.6 Sol High exhausts two consecutive 5h windows on the same task** (2 comments, 1 👍). Continues the rate-limit debate; pairs with #43341. [Link](https://github.com/openai/codex/issues/45411)

## Key PR Progress

1. **#45463 — Allow dedicated listeners for managed network proxies** (closed). Adds `ManagedProxyRouting` to `NetworkProxyBuilder` so sandboxed endpoints get their own loopback ports instead of shared SID-attributed ingress. [Link](https://github.com/openai/codex/pull/45463)
2. **#45457 — Fix clipboard routing for tmux and SSH sessions** (closed). Closes the source of issue #45068: persistent tmux sessions that gain remote clients now correctly forward terminal copies. [Link](https://github.com/openai/codex/pull/45457)
3. **#45455 — Refactor Windows sandbox setup and service helpers** (closed). Modularizes helper copying, token-user SID queries, pipe ownership, and service runtime lifecycle on Windows. [Link](https://github.com/openai/codex/pull/45455)
4. **#45312 — Extract Windows sandbox configuration preparation into a helper** (closed). Introduces `prepare_windows_sandbox_config` and `PreparedWindowsSandboxConfig`, separating configured mode from effective sandbox layer. [Link](https://github.com/openai/codex/pull/45312)
5. **#45459 — Resolve enterprise-managed MCP registrations in the catalog** (closed). Enterprise IdP-aware MCP catalog binding gated by `features.use_xaa`. [Link](https://github.com/openai/codex/pull/45459)
6. **#45440 — Share Apps tool catalogs without retaining unused snapshots** (closed). Stops idle Apps clients from holding replaced tool definitions and invalidates prepared calls only when actually needed. [Link](https://github.com/openai/codex/pull/45440)
7. **#45439 — Share tool output schemas and defer MCP envelope construction** (closed). Lazy `ToolOutputSchema` plus deferred call-result envelope — meaningful MCP perf and memory win. [Link](https://github.com/openai/codex/pull/45439)
8. **#45445 — Attribute command and plugin analytics to the invoking model** (closed). Analytics now correctly attribute execution to the step that invoked the command, even after model settings change. [Link](https://github.com/openai/codex/pull/45445)
9. **#45441 — Preserve Guardian parent response IDs across sampling requests** (closed). Prevents Guardian reviews from losing `parent_response_id` when issued between response turns. [Link](https://github.com/openai/codex/pull/45441)
10. **#45399 — Cancel code-mode timer tasks when cleared or the cell finishes** (closed). Replaces per-`setTimeout` threads with `AbortOnDropHandle`, eliminating leaked sleepers. [Link](https://github.com/openai/codex/pull/45399)

## Hot Discussions

### Ideas
- **#9200 — Remote control Codex from the ChatGPT app** (190 👍). By far the most upvoted open idea; the community wants a first-class headless/daemon Codex controllable from the ChatGPT mobile UI. [Link](https://github.com/openai/codex/discussions/9200)
- **#14595 — Remote control wen?** (18 👍). Roadmap pressure on remote control, citing Claude Code's implementation as a benchmark. [Link](https://github.com/openai/codex/discussions/14595)
- **#13287 — Use cases for long-horizon, multi-session development support** (12 comments). Companion to issue #13241; long-lived agents across many sessions. [Link](https://github.com/openai/codex/discussions/13287)
- **#45284 — Optional persistent Codex session per GitHub pull request** (1 👍). Avoids fragmenting context across iterative `@codex` review cycles. [Link](https://github.com/openai/codex/discussions/45284)

### General
- **#45211 — Open statement: reopen Pro 20X access, address Korean-language quality issues, and clarify reset policy.** Cohesive user feedback on Pro 20X signup/upgrade pause and Korean mixing. [Link](https://github.com/openai/codex/discussions/45211)

### Show and tell
- **#44843 — SKILL.md → Codex plugin bundle converter (MIT, stdlib-only).** Reference tooling for the marketplace/agent-skills ecosystem. [Link](https://github.com/openai/codex/discussions/44843)
- **#45392 — Reading Codex rollout files: what I hit, what I worked around.** Field report from the Fishbowl viewer author — useful signals about rollout schema stability. [Link](https://github.com/openai/codex/discussions/45392)
- **#45382 — codex-sdlc: requirements → implementation → independent QC.** A repeatable multi-role workflow on top of Codex. [Link](https://github.com/openai/codex/discussions/45382)
- **#44618 — Wayfinder: trace Codex work as a visual voyage map.** Local-first visualization of Codex sessions. [Link](https://github.com/openai/codex/discussions/44618)
- **#45278 — Polter: one Codex supervising other AI CLIs.** Fork of Ghostty + supervisor pattern to keep sub-agents accountable. [Link](https://github.com/openai/codex/discussions/45278)

## Feature Request Trends

- **First-class remote control from ChatGPT/mobile.** #9200, #14595 — the dominant thread in the community.
- **Event-driven / push-based session wake.** #20312 ("native event-driven session wake primitive") + #9200 — turning turn-driven Codex into a reactive agent.
- **Long-horizon, multi-session continuity.** #13287, #13241 — persistent context across sessions and PRs (#45284).
- **Visibility into agent-spawned processes.** #42244 (dev servers/background processes surfaced in Desktop) and #44088 (per-file edit cards even for shell-driven writes) — both push toward a more transparent agent execution surface.
- **Cost/rate-limit transparency and predictability.** #43341, #45411 — users want quotas to reflect actual work, not headroom consumed by overhead.

## Developer Pain Points

- **Windows Desktop regressions are clustering:** queueing/follow-up messages (#44781, #45069), app-server daemon opening console windows (#44768), NUL-corrupted state wiping projects (#38757), Composer disabled after first turn (#40872), and read-only sandbox blocking Node/WSL/pip (#21470).
- **macOS sandbox instability on older releases:** `TIOCSTI` failure (#45119) and the `26.908.31748` blank-window regression (#44743, #44738, #44886, #44818) — together a "ChatGPT hit a snag" wave that is now mostly closed via rollbacks but indicates fragile renderer imports.
- **App-server semantics don't match UI state:** `read_thread`/`wait_threads` returning empty arrays for visible turns (#43468), and tool-output ordering causing "No tool output found for tool call X" (#44604) — both break programmatic/automation flows.
- **Cross-platform reliability friction:** elevated Windows sandbox lacks credential context for private Git (#42621), and Windows desktop startup erodes known workarounds (#44736). Trust in long-lived workarounds is eroding.
- **Rate-limit trust deficit:** Plus users on GPT-5.6/6-tier reasoning report exhausting 5-hour windows on a single task (#43341, #45411); the Pro 20X pause compounds the perception (#45211).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-15

## Today's Highlights

The Gemini CLI community is heavily focused on **agent reliability and observability**: multiple P1 bugs involve subagents reporting false success after hitting MAX_TURNS (issue #22323), the generalist agent hanging indefinitely on simple tasks (#21409), and shell commands getting stuck on "Waiting input" (#25166). A parallel track around **Auto Memory hardening** is consolidating under maintainer SandyTao520, addressing redaction, retry loops, and invalid patch handling. On the release side, the project pushed a routine nightly v0.61.0-nightly.20260914 and landed substantive fixes around MCP OAuth (RFC 9207), nested `.gitignore` handling, and settings-editor overflow protection.

## Releases

- **v0.61.0-nightly.20260914.g9c1b0a610** — Automated nightly bump ([#29321](https://github.com/google-gemini/gemini-cli/pull/29321)). Full diff: [compare link](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260913.g9c1b0a610...v0.61.0-nightly.20260914.g9c1b0a610).

## Hot Issues

1. **[#22323 — Subagent recovery after MAX_TURNS reports GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** · P1, agent · 13 comments, 👍2. The `codebase_investigator` reports `status: "success"` with `Termination Reason: "GOAL"` even after exhausting its turn budget before doing any analysis — silently hiding interruption. Critical for trust in subagent output.

2. **[#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)** · P1, agent · 8 comments, 👍8. Deferring to the generalist agent causes hangs on trivial operations like folder creation; user workaround is explicit "don't use subagents." High community impact given the 👍 count.

3. **[#19873 — Zero-Dependency OS Sandboxing & Post-Execution Intent Routing](https://github.com/google-gemini/gemini-cli/issues/19873)** · P2, enhancement · 9 comments, 👍1. Ambitious proposal to exploit Gemini 3's native POSIX-bash affinity (chained `grep`/`sed`/`awk`) under OS-level sandboxing. Large effort but strategically significant for security UX.

4. **[#22745 — Assess AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)** · P2, feature · 7 comments, 👍1. Epic exploring AST-aware tooling to reduce token noise and misaligned reads (e.g., method-bound reads in one call).

5. **[#21968 — Gemini doesn't use skills and sub-agents proactively](https://github.com/google-gemini/gemini-cli/issues/21968)** · P2, agent · 6 comments. Anecdotal but resonant: users observe the model only invokes custom skills/sub-agents when explicitly prompted, undermining their value.

6. **[#25166 — Shell command stuck on "Waiting input"](https://github.com/google-gemini/gemini-cli/issues/25166)** · P1, core · 4 comments, 👍3. After simple CLI invocations, the shell hangs in "Awaiting user input" state despite the command already completing. A clear UX regression.

7. **[#26525 — Deterministic redaction & reduced Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)** · P2, security · 5 comments. Auto Memory sends transcript content to the extraction model *before* redaction, and skill service may log secrets. Security-sensitive.

8. **[#26522 — Stop Auto Memory retrying low-signal sessions](https://github.com/google-gemini/gemini-cli/issues/26522)** · P2, agent · 4 comments. Sessions the extraction agent skips remain "unprocessed" and can resurface indefinitely — a persistence bug in the memory pipeline.

9. **[#21983 — Browser subagent fails on Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** · P1, agent/browser · 4 comments. Browser agent terminates with `GOAL` but produces no output on Wayland; reproducibility blocker for Linux desktop users.

10. **[#22267 — Browser Agent ignores `settings.json` overrides (e.g., `maxTurns`)](https://github.com/google-gemini/gemini-cli/issues/22267)** · P2, agent · 3 comments. `BrowserManager` bypasses user-configured agent settings — a configuration correctness gap that affects power users.

## Key PR Progress

1. **[#29117 — Enforce RFC 9207 issuer identification in MCP OAuth flow](https://github.com/google-gemini/gemini-cli/pull/29117)** · size/m. Adds `iss` validation to `OAuthAuthorizationResponse` to prevent unintended token routing — important MCP hardening.

2. **[#29287 — Map `--yolo` to `allowedTools` wildcard policy](https://github.com/google-gemini/gemini-cli/pull/29287)** · size/xl, closed. Refactors the legacy `ApprovalMode.YOLO` into a wildcard `allowedTools` policy, unifying the trust model. (Now closed — may have been reworked.)

3. **[#29229 — Reject non-finite numbers in settings editor](https://github.com/google-gemini/gemini-cli/pull/29229)** · size/s. `parseEditedValue('number', ...)` accepted `1e309` (parsed as `Infinity`) and silently serialized to `null`, corrupting settings; now uses `Number.isFinite`.

4. **[#29323 — Trailing-slash patterns in nested `.gitignore`](https://github.com/google-gemini/gemini-cli/pull/29323)** · size/l, and the minimal [**#29324**](https://github.com/google-gemini/gemini-cli/pull/29324). Two competing fixes for #29290: `build/` in `pkg/.gitignore` should match at any depth below, not only at the file's own directory.

5. **[#29132 / #29131 — Normalize line endings in diff context snippets](https://github.com/google-gemini/gemini-cli/pull/29132)** · size/s. Prevents `getDiffContextSnippet` from dumping the entire file when LF vs. CRLF mismatch produces a full-file diff — a Windows pain point.

6. **[#29134 — Protect current session from deletion](https://github.com/google-gemini/gemini-cli/pull/29134)** · size/m, closed. Threads the active session ID through `--list-sessions` / `--delete-session` so the user can't accidentally delete their own session.

7. **[#29326 — Fix missing loop in `unassign-inactive-assignees`](https://github.com/google-gemini/gemini-cli/pull/29326)** · size/xs. Workflow script body was indented as a loop but the `for` header was missing — `continue` never executed, defeating the unassign logic.

8. **[#29230 — Fix dead anchors across guides](https://github.com/google-gemini/gemini-cli/pull/29230)** · size/s. Seven doc pages had stale in-page anchors (notably `plan-mode.md` after heading renumbering); verified against actual headings.

9. **[#29231 — Fix stale JSDoc parameter names](https://github.com/google-gemini/gemini-cli/pull/29231)** · size/xs. Removes documentation for `basePath` and `agentCardUrl` parameters that no longer exist on `addDirectory` and `loadAgent`.

10. **[#29137 — Dependabot: bump npm-dependencies group (77 updates)](https://github.com/google-gemini/gemini-cli/pull/29137)** · size/xl. Notable bumps: `simple-git` 3.28 → 3.36 and `@modelcontextprotocol/sdk` (1.x → current). Worth a security audit before merge.

## Feature Request Trends

- **AST-aware tooling for codebase navigation.** Issues #22745 and #22746 push toward precise method-level reads/search and AST-driven mapping (candidates `tilth`, `glyph`) to cut token usage and misaligned reads.
- **Auto Memory as a first-class subsystem.** A coordinated cluster (#26525, #26522, #26523, #26516) asks for deterministic redaction, retry bounds, invalid-patch quarantine, and a tracking epic — indicating Auto Memory is moving from prototype to productized.
- **Subagent transparency & traversal.** Feature requests for subagent trajectory visibility via `/chat share` (#22598), bug-report subagent context (#21763), and skills/subagent proactive invocation (#21968) all point to one direction: *make multi-agent behavior inspectable and discoverable.*
- **Browser agent resilience.** #22232 (session takeover/lock recovery), #22267 (respect `settings.json`), and #21983 (Wayland) collectively call for hardened browser-agent lifecycle management.
- **Safer destructive defaults.** #22672 requests the agent avoid `git reset`/`--force` when alternatives exist, aligning with broader "agent self-awareness" goals in #21432.
- **Telemetry standardization.** #11802 requests OTLP header support for authenticating to OTEL Collectors.

## Developer Pain Points

- **Subagents silently fail or hang.** The #22323 false-success bug, #21409 generalist hangs, and #22267 settings-override ignore share a theme: multi-agent orchestration is *under-observable and under-controllable*. Developers can't reliably tell whether a subagent finished or got stuck.
- **Interactive shell and CLI prompt stalls.** #25166 ("Waiting input" after completion) and #22465 (Vite interactive prompt stuck) are the same class of bug at different layers — the agent doesn't reliably detect non-interactive command completion.
- **Token / tool-count ceilings.** #24246 surfaces 400 errors past ~128 tools, and #12214 (now closed) on token-count overflow — together signaling that current `enabled-tools` and context-window heuristics are too naive.
- **Auto Memory noise and risk.** Four related issues (#26516/22/23/25) describe unprocessed-session retry loops, invalid patches silently dropped, secrets reaching the extraction model pre-redaction, and skill-service secret logging. This is the highest-density pain area in the current backlog.
- **Filesystem edge cases.** #20079 (symlinks in `~/.gemini/agents/` not loaded) and #29323/#29324 (nested `.gitignore` trailing-slash anchoring) reflect gaps in path/ignore handling that bite users on cross-platform setups.
- **Symptom: agent self-knowledge gaps.** #21432 ("agent should accurately describe its own flags and hotkeys") and #22598 (subagent trajectories opaque) show developers want the agent to be a more credible guide and a more debuggable collaborator.

> **Note:** No GitHub Discussions data was provided for this snapshot — the Hot Discussions section is intentionally omitted.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-15

## Today's Highlights

The CLI shipped **v1.0.84-6**, adding the `/config` sidebar configuration screen and per-host `/sandbox` network allow/deny rules that preserve any upstream proxy. The issue queue is dominated by **BYOK regressions** across Deepseek, Grok 4.5, and Gemini Flash, alongside a cluster of **plugin/marketplace and enterprise-agent** bugs that block managed deployments. A long-standing pain point — Windows spawning visible PowerShell windows for every shell command — remains open with community pressure building.

---

## Releases

### [v1.0.84-6](https://github.com/github/copilot-cli/releases/tag/v1.0.84-6)

**Added**
- `/config` — opens a sidebar configuration screen directly inside the CLI.
- `/sandbox` — network host allow/deny rules that no longer overwrite a user-configured upstream proxy.

**Improved**
- Managed `Edit` and `Write` rules now apply to recognized native shell redirections (e.g. `>`, `>>`, `2>&1`) and to supported in-place `sed -i` operations.

---

## Hot Issues

1. **[#4505 — Resumed session retains stale connection item IDs](https://github.com/github/copilot-cli/issues/4505)** *(Adamkadaban, 👍 3, 💬 4)*
   Every prompt after `/resume` fails with `400 input item ID does not belong to this connection`; even `/fork` cannot recover the session. High engagement makes this the most-tracked reliability bug of the cycle.

2. **[#3572 — Org-level custom agents invisible outside GitHub-hosted repos](https://github.com/github/copilot-cli/issues/3572)** *(cmpl-giedriusk, 👍 3, 💬 2)*
   Custom agents from the org's `.github-private` repo only appear when the CWD contains a git remote pointing at that org — a blocker for enterprise users working in local or non-GitHub repos.

3. **[#4556 — `extraKnownMarketplaces` fetched but never registered](https://github.com/github/copilot-cli/issues/4556)** *(loganvolkers, 👍 2, 💬 2)*
   Server-managed marketplace entries parse successfully yet never enter the plugin code path, silently breaking policy-driven extension catalogs in enterprise installs.

4. **[#4549 — PowerShell console window flashes on every shell command (Windows)](https://github.com/github/copilot-cli/issues/4549)** *(siramk2022, 👍 1, 💬 2)*
   On Windows, `conhost` flashes for each sub-process, stealing focus repeatedly during agent runs. Persistent UX complaint that materially hurts the Windows developer experience.

5. **[#4841 — Custom agent plan-mode leaves Plan panel blank](https://github.com/github/copilot-cli/issues/4841)** *(dylanwhite-velocity, 👍 0, 💬 1)*
   When a user-selected custom agent (`disable-model-invocation: true`, `infer: false`) calls `exit_plan_mode`, the panel renders action bubbles but no plan text — a hard regression on the new agentic UX.

6. **[#4837 — Policy-driven `enabledPlugins` installs but persists `enabled: false`](https://github.com/github/copilot-cli/issues/4837)** *(jozsurf, 👍 0, 💬 1)*
   MDM/device and repo-level policies that enable plugins leave them disabled on disk; skills never activate and state does not self-correct. Reproduces on 1.0.83 and threatens managed rollouts.

7. **[#4840 — BYOK broken with Deepseek](https://github.com/github/copilot-cli/issues/4840)** *(Bude2408, 👍 0)*
   GPT5.4 selected via BYOK against Deepseek returns `400 Failed to deserialize the JSON body… unknownvariant 'custom', expected 'function'`. Another hit in the growing BYOK-provider regression set.

8. **[#4836 — Grok 4.5: 351 tools fail with opaque HTTP 400](https://github.com/github/copilot-cli/issues/4836)** *(kondv, 👍 0)*
   Crossing the ~350-tool advertised limit to Grok 4.5 produces an unsignaled 400 instead of a clear model-side limit error, hiding the real cause from users.

9. **[#4835 — Gemini Flash: a single MCP enum-on-array breaks every prompt](https://github.com/github/copilot-cli/issues/4835)** *(kondv, 👍 0)*
   One MCP tool with an `integer enum` directly on an array property silently invalidates the entire request batch — a fragility in tool-schema validation that BYOK users feel first.

10. **[#4838 — `skill` tool intermittently fails in headless `-p` mode](https://github.com/github/copilot-cli/issues/4838)** *(armannjo, 👍 0)*
    Despite the same skill being listed in the request's `<available_skills>` block, headless mode occasionally reports "No model-invocable skills available". Breaks CI/automation flows that depend on consistent skill resolution.

> Also worth noting: [#1029 — Reject/feedback should trigger replanning for *all* tool calls](https://github.com/github/copilot-cli/issues/1029) was **closed** without a merge — a longstanding workflow request that the community is likely to re-open.

---

## Key PR Progress

No pull requests were updated in the last 24 hours. Activity on `github/copilot-cli` is concentrated in the issue tracker today; expect PR movement to follow once the BYOK and plugin/marketplace regressions are triaged.

---

## Feature Request Trends

- **Modern MCP protocol support** — [#4834](https://github.com/github/copilot-cli/issues/4834) calls for the 2026-07-28 Multi Round-Trip Requests (`input_required`) protocol so servers can stop relying on legacy fallbacks during URL elicitation.
- **Granular UI control** — [#4839](https://github.com/github/copilot-cli/issues/4839) requests a switch to disable the taskbar icon, citing clutter from multi-session workflows.
- **Smarter plan-mode replanning** — [#1029](https://github.com/github/copilot-cli/issues/1029) (closed) shows ongoing demand for feedback on one tool call to propagate as a replanning trigger across the whole batch, not just the rejected call.
- **Pre-flight tool-count checks for BYOK providers** — recurring across #4836 (Grok) and adjacent reports, users want the CLI to surface provider tool limits *before* the upstream returns an opaque 400.
- **Tighter enterprise policy hooks** — the cluster around #4556, #4837, and #3572 points to a unified request: first-class support for server- and MDM-driven configuration that *actually applies* without silent drop-outs.

---

## Developer Pain Points

- **BYOK provider regressions are the #1 theme today.** Deepseek (#4840), Grok 4.5 (#4836), and Gemini Flash (#4835) all surface as opaque HTTP 400s for distinct reasons (custom tool variants, tool-count limits, MCP enum shapes), giving BYOK users very little actionable feedback.
- **Windows ergonomics continue to lag.** The visible-`conhost` problem (#4549) is the loudest single complaint, and it amplifies the pain of every other command the agent runs.
- **Session persistence is fragile.** Resumed sessions losing connection-item IDs (#4505) means a crash or interrupted response can render an entire session unusable, including after `/fork`.
- **Enterprise/marketplace plumbing is leaking.** Plugins install but stay disabled (#4837), managed marketplaces never register (#4556), and org-level agents only appear in specific working directories (#3572) — three separate paths through the same underlying policy/state bug surface.
- **Headless automation is brittle.** Headless `-p` mode intermittently loses access to skills (#4838), and Plan mode renders empty for custom agents (#4841), making scripted/agentic CI workflows unreliable.
- **Custom-agent authoring UX is under-served.** The blank Plan panel (#4841) and the absence of a feedback-propagates-replan primitive (#1029) both point to a gap between "the agent runs" and "the agent re-plans correctly".

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-15

## 1. Today's Highlights

The OpenCode community is in uproar over the **forced retirement of the legacy desktop layout** (sunset 2026-09-14): nearly a dozen issues from power users are demanding the persistent left sidebar be restored as an opt-in, especially because the new V2 layout lacks multi-worktree support. Compounding the friction, a **widespread `TypeError: undefined is not an object (evaluating 'a.name')` regression in v1.18.30** is breaking every prompt via `SystemPrompt.environment`, leaving affected users stuck on 1.18.20.

## 2. Releases

_No new releases in the last 24 hours._

## 3. Hot Issues

1. **[#48811](https://github.com/anomalyco/opencode/issues/48811)** — *macOS: every prompt fails with "undefined is not an object (evaluating 'a.name')"* (24 👍, 5 comments). Top-voted bug of the day; the v1.18.30 regression is fully reproducible on macOS and blocks all prompting.
2. **[#48882](https://github.com/anomalyco/opencode/issues/48882)** — *[FEATURE] Restore the legacy UI with the persistent left sidebar as an option* (14 👍, 13 comments). The flagship complaint about the V2 layout rollout, with 13 active commenters trading workflow screenshots.
3. **[#45278](https://github.com/anomalyco/opencode/issues/45278)** — *Payment Declined After 3 Months Despite No Issue With Card or Bank* (17 comments, 5 👍). Long-standing subscription billing failure with no resolution; notable for the high comment count vs. upvotes, suggesting an unsatisfying support thread.
4. **[#48837](https://github.com/anomalyco/opencode/issues/48837)** — *[UI feedback] Forced V2 interface destroys productivity for multi-project/multi-agent workflows (20+ sessions)* (11 👍). Detailed workflow-impact writeup from a heavy user with 20+ concurrent sessions.
5. **[#48645](https://github.com/anomalyco/opencode/issues/48645)** — *Regression in 1.18.30: every prompt crashes with TypeError in SystemPrompt.environment ("a.name")* (10 👍). Confirms the v1.18.20 → 1.18.30 breakage; the post even notes a successful A/B downgrade.
6. **[#48835](https://github.com/anomalyco/opencode/issues/48835)** — *[UI/UX] Old layout removed but new layout does not support multiple worktrees* (9 👍). The single sharpest technical case against the V2-only rollout.
7. **[#48958](https://github.com/anomalyco/opencode/issues/48958)** — *New layout makes the UI unusable* (7 👍). Concise user testimony that the redesign breaks basic project switching.
8. **[#41696](https://github.com/anomalyco/opencode/issues/41696)** — *[2.0] opencode2 became stuck starting its managed background server* (6 comments). Lingering 2.0 blocker where `serve --service` silently fails.
9. **[#49008](https://github.com/anomalyco/opencode/issues/49008)** — *OpenCode infinitely spams messages in a loop and responds to its' messages* (4 comments). Loop bug triggered by a custom GLM-5.3-Flash provider — relevant to anyone routing through third-party gateways.
10. **[#48964](https://github.com/anomalyco/opencode/issues/48964)** — *Request fails with reasoning `encrypted_content` was not issued to this caller* (3 comments, closed). A wave of identical "second request fails" reports — tied to Anthropic-style reasoning caching on Zen.

## 4. Key PR Progress

1. **[#49015](https://github.com/anomalyco/opencode/pull/49015)** — *test(app): retire legacy layout e2e coverage* (open). Hardens the V2-only future by removing legacy route tests, formalising the 2026-09-14 sunset.
2. **[#49012](https://github.com/anomalyco/opencode/pull/49012)** — *fix/windows powershell utf8* (open). Resolves Chinese-character mojibake in Windows PowerShell shells (closes #30205, #30055) — important for non-ASCII users on Windows.
3. **[#49010](https://github.com/anomalyco/opencode/pull/49010)** — *fix(core): normalise absolute plugin paths before dedupe* (open). Fixes plugin dedup for absolute `C:/Users/...` paths (closes #48706).
4. **[#48941](https://github.com/anomalyco/opencode/pull/48941)** — *feat(codemode): expose host classes and functions through extensions* (open). A significant codemode capability: programs can now call into real host-side classes/functions behind a value-copy boundary.
5. **[#48901](https://github.com/anomalyco/opencode/pull/48901)** — *refactor(core): split provider and model registries* (closed). Internal cleanup by `thdxr` that splits `Catalog` into `Provider` and `Model` — reduces per-location model catalog duplication.
6. **[#48731](https://github.com/anomalyco/opencode/pull/48731)** — *[contributor] feat/tui i18n* (open). TUI internationalization groundwork.
7. **[#48638](https://github.com/anomalyco/opencode/pull/48638)** — *fix(core): eliminate durable event write amplification from turn diffs* (open). Stops full git patches from being re-forked onto every user message's `summary.diffs` (closes #48641) — big perf win for long sessions.
8. **[#48551](https://github.com/anomalyco/opencode/pull/48551)** — *[contributor] feat(tui): label mention autocomplete options* (open). Adds Skill/Agent/File/Dir/Reference labels with theme colors to TUI autocomplete.
9. **[#47595](https://github.com/anomalyco/opencode/pull/47595)** — *[contributor] feat: add skill activation settings* (open). Persistent, server-wide skill enable/disable toggles in TUI + desktop/web settings (related #43536).
10. **[#42735](https://github.com/anomalyco/opencode/pull/42735)** — *fix(core): replay thinking safely and drop unsettled tool calls from errored messages* (closed). Multi-turn Anthropic thinking + tool-use conversations no longer break after interrupt/failure (closes #38620).
11. **[#45839](https://github.com/anomalyco/opencode/pull/45839)** — *fix(opencode): drop assistant turns without model-visible content from replay* (open). Stops strict providers (Moonshot, DeepSeek, Azure, litellm) from rejecting replays because of empty assistant turns.
12. **[#48998](https://github.com/anomalyco/opencode/pull/48998)** — *feat(tui): add last turn source to diff viewer* (open). TUI diff viewer gains a "Last turn" source backed by `session.diff` (#47821) — files changed since the last prompt.

## 5. Hot Discussions

_No discussion data was provided — section omitted._

## 6. Feature Request Trends

- **Layout / UI escape hatch (very high demand):** Bring back the persistent left sidebar as an opt-in toggle, expose both UIs in desktop + web, and reintroduce multi-worktree support. Repeatedly raised in #48882, #48835, #48972, #48958, #48951, #48837, #48980, and the closed #38230.
- **Better session/tab ergonomics:** Keyboard shortcuts for tab switching (#37077), drag-and-drop reordering of session tabs (#48982), and a "Last turn" diff view (#48998).
- **Attachment & input helpers:** Convert large pasted text into a virtual file (#40312); allow customising the input-box font (#49003).
- **Sticky navigation aids:** A Medium-style sticky table of contents for sessions (#48979).
- **TUI i18n and i18n-aware themes:** Theme command restore in `opencode web` (#48977) and TUI i18n (#48731).
- **Provider flexibility:** Dynamic model discovery for custom OpenAI-compatible providers (#42660, closes 6 long-standing issues).
- **Skill/agent settings:** Persistent, server-wide skill activation settings (#47595).

## 7. Developer Pain Points

- **v1.18.30 prompt-killing regression:** A `TypeError` deep inside `SystemPrompt.environment` ("a.name") breaks every prompt for many users (#48811, #48645, #48803, #48996). Workaround is pinning to 1.18.20.
- **Forced UI redesign:** The V2 layout is now the only option, removing a long-standing toggle (#38230) and breaking workflows that depended on persistent sidebar + multi-worktree + many concurrent sessions.
- **Opaque error masking:** Provider-side 429s and `encrypted_content` errors are surfaced as generic "Unexpected server error" / `TypeError`, hiding the real cause (#48988, #48964, #48989).
- **Background service reliability:** The managed service can hang silently or report only a generic timeout when the port is already in use (#41696, #49009).
- **Stale `session.time_updated`:** Active streaming sessions drop out of recency sort because `time_updated` only advances on a small set of projected events (#36893).
- **Custom-provider loop bugs:** Routing through third-party gateways (e.g., GLM-5.3-Flash via llmapi.ai) can trigger infinite self-reply loops (#49008).
- **Windows locale issues:** PowerShell UTF-8 mojibake still hits non-ASCII users, only now being patched (#49012).
- **Plugin path resolution:** Absolute Windows-style plugin paths bypass the `./`/`../` resolver and get duplicated (#49010).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-15

## Today's Highlights

Activity on `earendil-works/pi` remains high with 50 issues and 30 PRs touched in 24h, but no new releases shipped. Maintainers closed many untriaged reports after triage, while an in-progress fix for orphaned tool-call blocks (#9306) and a wave of provider cost-accuracy bugs (Bedrock, Vercel AI Gateway, OpenAI-compatible) shaped the day's discussion. Notable PRs include the Antigravity Gemini provider (#9594) and the Node-runtime bundling rework (#8474) intended to ease Windows cold-start pain.

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. **[#9298](https://github.com/earendil-works/pi/issues/9298)** — *Closed* — Grok 403s surfaced through the OpenAI-compatible Responses client are mislabeled as "OpenAI API error" by the `openai-responses` formatter, making provider credit/subscription errors hard to attribute. (7 comments)
2. **[#9211](https://github.com/earendil-works/pi/issues/9211)** — *Open* — `compat.vercelGatewayRouting` is only applied in `openai-completions.js`, yet every built-in `vercel-ai-gateway` catalog model uses `anthropic-messages`, so documented routing config is effectively dead. (5 comments)
3. **[#9306](https://github.com/earendil-works/pi/issues/9306)** — *Open / in-progress* — Aborted or errored turns leave streamed `toolCall` blocks unmatched, causing the next `runAgentLoopContinue` to be rejected by the provider. Important for reliability of long agent runs. (4 comments)
4. **[#9129](https://github.com/earendil-works/pi/issues/9129)** — *Open* — On Windows, `killProcessTree` via `taskkill /F /T` orphans downstream pipeline processes under MSYS2 bash, since each pipeline stage runs through a short-lived intermediate. (4 comments)
5. **[#9457](https://github.com/earendil-works/pi/issues/9457)** — *Open* — `bedrock-converse-stream` never sets `cacheWrite1h` from `cacheDetails`, so 1-hour cache writes bill at the 5-minute rate — a real money bug. (4 👍)
6. **[#9210](https://github.com/earendil-works/pi/issues/9210)** — *Open* — Twin to #9457 for Vercel AI Gateway + Anthropic Messages transport: 1h cache-write counts are zeroed out, costing users at the cheaper 5m rate. (3 comments)
7. **[#9391](https://github.com/earendil-works/pi/issues/9391)** — *Open* — After manual compaction, stale signed thinking blocks replay every turn and Anthropic rejects them with `prefix_binding_mismatch`, polluting logs and wasting retries. (3 comments, 1 👍)
8. **[#9354](https://github.com/earendil-works/pi/issues/9354)** — *Open* — Prompt templates with invalid frontmatter are silently dropped, while Skills already warn — an inconsistency that frustrates template authors. (3 comments)
9. **[#9444](https://github.com/earendil-works/pi/issues/9444)** — *Open* — `openai-completions.ts` strips Gemini `thoughtSignature` from streamed `tool_calls`, breaking multi-turn tool use when Gemini is served via an OpenAI-compatible gateway. (2 comments)
10. **[#9595](https://github.com/earendil-works/pi/issues/9595)** — *Closed / untriaged* — Agent-level retry ignores `Retry-After` on HTTP 429, hammering providers within seconds of a quota hit instead of waiting the advertised interval.
11. **[#9590](https://github.com/earendil-works/pi/issues/9590)** — *Closed / untriaged* — Resuming sessions with many multi-MB image tool results corrupts base64 (length ≡ 1 mod 4), and the bad bytes persist in context, breaking every subsequent request.
12. **[#9455](https://github.com/earendil-works/pi/issues/9455)** — *Open* — `gemini-3.8-flash` via Google GenAI returns 400 when `thinkingLevel: "MINIMAL"` is passed while thinking is disabled — a default/threshold mismatch.

## Key PR Progress

1. **[#9594](https://github.com/earendil-works/pi/pull/9594)** — *Closed* — Adds **Google Antigravity** as a first-class OAuth provider in `pi-ai`, restoring subscription-backed Gemini access adapted from earlier upstream work (#9529).
2. **[#8474](https://github.com/earendil-works/pi/pull/8474)** — *Closed* — `pi-coding-agent` now bundles the Node runtime, dramatically reducing file count at startup. Aimed squarely at Windows Defender / slow-IO cold starts.
3. **[#9274](https://github.com/earendil-works/pi/pull/9274)** — *Open* — Fixes the edit-tool renderer dropping leading whitespace on removed lines when text is inserted before otherwise unchanged content — corrects misleading diffs.
4. **[#9351](https://github.com/earendil-works/pi/pull/9351)** — *Open* — Eliminates the red "Could not edit file" flicker on remote-edit tool rows by deferring error display until the remote operation has actually returned.
5. **[#6534](https://github.com/earendil-works/pi/pull/6534)** — *Open* — Experimental addition of a **developer message role** referenced by RFC 54; foundational for future prompt-cache and instruction-routing work.
6. **[#9548](https://github.com/earendil-works/pi/pull/9548)** — *Open* — Moves mid-conversation system-prompt and tool-set changes into the **transcript itself** so they can be replayed on resume/branch and preserve cached prompt prefixes.
7. **[#9581](https://github.com/earendil-works/pi/pull/9581)** — *Closed* — Fixes #9354: prompt templates with malformed YAML frontmatter now produce a startup warning via the same diagnostic path used for prompt collisions.
8. **[#9570](https://github.com/earendil-works/pi/pull/9570)** — *Open* — Maps Gemini's new `TOO_MANY_TOOL_CALLS` `FinishReason` to an error stop reason instead of throwing `Unhandled stop reason`.
9. **[#9569](https://github.com/earendil-works/pi/pull/9569)** — *Open* — `validateToolArguments` now recovers tool arguments delivered as JSON-encoded strings for `object`/`array` parameters, fixing models that double-encode.
10. **[#9329](https://github.com/earendil-works/pi/pull/9329)** — *Open* — Treats `TERM_PROGRAM=Orca` as Kitty-image capable so image components render inline rather than degrading to text in the Orca terminal.
11. **[#9441](https://github.com/earendil-works/pi/pull/9441)** — *Open* — Stops APC cursor markers from leaking across selection slices and rendering passes — fixes stray markers in the full-screen TUI.
12. **[#9501](https://github.com/earendil-works/pi/pull/9501)** — *Open* — Unifies and documents how `pi` locates Windows shell binaries (pwsh, cmd, bash) so installs in non-default directories are actually discovered.

## Hot Discussions

**Show and tell**
- **[#1558](https://github.com/earendil-works/pi/discussions/1558)** — *netandreus* announces **[Pi Cursor Provider](https://www.npmjs.com/package/@netandreus/pi-cursor-provider)**, an npm-published extension that lets the Pi Coding Agent drive CursorAI's CLI. The author asks for inclusion alongside the Claude Code and OpenAI Codex providers. (9 👍, 3 comments)

## Feature Request Trends

- **Multi-account OAuth per provider** is a recurring ask across #1391 and #7814 — users with multiple ChatGPT Plus / Claude / Copilot subscriptions want labeled credentials rather than duplicated provider extensions.
- **Broader, more accurate provider coverage**: Antigravity (#9594 PR), Wallaby/Kimi K3 (#9597), `opencode-go` session affinity (#9437), and GitHub Copilot SDK tokens (#9454) all want first-class support.
- **Stronger diagnostic surface**: parity warnings for malformed skill *and* prompt-template frontmatter (#9354 → #9581), recognition of more retryable network errors (#9585), and `Retry-After` honoring (#9595).
- **UI/styling knobs**: configurable tool-call borders (#9598) and `wheelScrollLines` for the TUI (#9447) point toward a more user-tweakable visual layer.
- **Extension API maturation**: atomic interrupt + lossless message delivery (#9578), append-only session system-prompt contributions (#9434 → PR), and tool-side turn termination (#7824) signal that extension authors want first-class primitives rather than prototype patching.
- **Transcript-aware context**: mid-conversation system-prompt and tool changes recorded in the transcript (#9548 PR) and cleaner compaction replay (#9391) suggest a wider push toward a first-class, replayable session history.

## Developer Pain Points

- **Cost-accounting drift**: cache-write TTLs are mishandled across at least three adapters (Bedrock #9457, Vercel AI Gateway/Anthropic #9210, plus provider-specific pricing), producing silently inflated bills.
- **Windows hostility**: bash timeouts orphan children (#9129), shell discovery is inconsistent (#9501 PR), Windows Store shims mis-detect (#9504 PR), and Node-runtime cold starts are slowed by antivirus scanning (#8474 PR).
- **macOS sandboxing surprises**: the Local Network Privacy gate attaches to `pi`'s process and blocks LAN tool calls even when the same binary works outside (#9453).
- **Resume/scaling hazards**: corrupted base64 images on resume (#9590), 16-second startup with 4K+ transcripts even with `-ne` (#9440), and concurrent `pi -c` runs interleaving into one session file (#9596) all bite power users.
- **Provider reliability quirks**: Gemini-specific signature stripping (#9444), new Gemini stop-reason throwing (#9570 PR), `fail to touch upstream` not classified retryable (#9585), and `Retry-After` ignored (#9595) make long agent runs fragile.
- **Context hygiene after interrupts**: aborted turns leaving unmatched tool calls (#9306) and stale signed thinking blocks replaying after compaction (#9391) force users to babysit error recovery.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-15

## Today's Highlights
Today's release of **v0.23.4** ships alongside updated `cua-driver-rs` prebuilts (v0.20.8/v0.20.7), while the community has been hammering on the **silent TUI crash (`Minified React error #185`)** triggered when multiple background agents complete — at least four related issues (#11500, #11849, #11873, #11858) and two PRs (#11835, #11817) are converging on the same `useBoxMetrics` layout-listener loop in Ink. Cross-vendor model compatibility is also surfacing as a second major pain point, with #11590 documenting how Qwen Code's auto-injected `metadata` field breaks third-party models routed through DashScope's OpenAI-compatible gateway.

---

## Releases

### v0.23.4 (stable)
Latest stable release. See project release notes for the complete change list. Notable follow-up updates bundled in this window:
- **CUA Driver v0.20.8 & v0.20.7** — prebuilt binaries vendored under `packages/cua-driver`:
  - **macOS**: codesigned + notarized universal binary + `QwenCuaDriver.app`
  - **Linux**: unsigned x86_64 + arm64 (glibc 2.31 floor)
  - **Windows**: unsigned UIAccess worker + native SDK payload (x86_64 + arm64)

### v0.23.3-nightly.20260913.faa395885e
Nightly cut with the OpenTUI parity closeout. Highlights:
- **`refactor(dingtalk)`** — removes obsolete background response aggregation ([#11570](https://github.com/QwenLM/qwen-code/pull/11570))
- **`feat(channels)!` — BREAKING** — removes configurable message-prefix filtering from channels. Eligible messages now follow standard sender / group / mention / pairing policies without a prefix. ([#11571](https://github.com/QwenLM/qwen-code/pull/11571))

> **Action item for channel integrators**: review your message-handling assumptions if you relied on prefix gating.

---

## Hot Issues

1. **#11500 — TUI exits silently with React #185 during background-agent completion** — *13 comments, P1*
   The interactive TUI dies with an uncaught "Maximum update depth exceeded" when multiple background subagents finish in close succession, dropping the user to a bare shell prompt with no error rendered. This is the canonical issue in what has become a multi-PR fix cluster. [Link](https://github.com/QwenLM/qwen-code/issues/11500)

2. **#11590 — Auto-injected `metadata` breaks non-Qwen vendor models on DashScope OpenAI-compatible endpoint** — *8 comments, P1, CLOSED*
   Qwen Code injects a top-level `metadata` object into every request, which DashScope's aggregate gateway forwards verbatim to third-party backends (e.g. ZHIPU/GLM-5.3-Flash) where `metadata` is typed as `string` — resulting in universal `400` errors and full unavailability of those models. [Link](https://github.com/QwenLM/qwen-code/issues/11590)

3. **#11834 — `[API Error: 400 invalid params, function parameters is empty (2013)]` on simple greetings** — *6 comments, P1*
   Brand-new report on 0.23.3 where a trivial "你好" round-trip fails with function-parameter deserialization errors even after `/update` confirms the binary is current. [Link](https://github.com/QwenLM/qwen-code/issues/11834)

4. **#11556 — vscode-ide-companion 0.23.1 webview stuck loading over Remote-SSH (arm64 server)** — *6 comments, P1*
   The companion extension's webview never finishes loading when VSCode Client 1.133 (linux-x64) is connected to a VSCode Server 1.137 on linux-arm64 over Remote-SSH. [Link](https://github.com/QwenLM/qwen-code/issues/11556)

5. **#11849 — Intermittent silent crash on 0.23.3 (suspected background shell / subagent)** — *5 comments, P1*
   Author explicitly cross-links #11500; crash frequency increases after long sessions, and resume reports no error. [Link](https://github.com/QwenLM/qwen-code/issues/11849)

6. **#11777 — CI `Test` job SIGTERMs at workspace→scripts handoff with all tests green** — *5 comments, P3, CLOSED*
   External `SIGTERM` kills `npm run test:ci` after every vitest suite has passed cleanly. Reliability hazard for the required CI gate. [Link](https://github.com/QwenLM/qwen-code/issues/11777)

7. **#11795 — Permission queue keyed on ACP connection blocks every daemon session indefinitely** — *5 comments, P1*
   A single idle session with an unanswered permission prompt blocks *all* other sessions on the daemon. Partial fix shipped via PR #11802 (serialization scope); remaining issues keep the bug open. [Link](https://github.com/QwenLM/qwen-code/issues/11795)

8. **#11872 — Web Terminal shows `[Error: PTY not available]` — `@lydell/node-pty` declared but not bundled** — *3 comments, P1*
   macOS code signing also blocks locally installed prebuilds, compounding the runtime failure. Tracks PR #11881. [Link](https://github.com/QwenLM/qwen-code/issues/11872)

9. **#11851 — Security: bash allow rule can cover a second command via `\r/\v/\f/\u00a0` word separators** — *3 comments, P1, security*
   `isAsyncOperator` uses JS `\s` to scan backward, so a Bash allow rule that looks like a single command can actually authorize an async-piped second command. [Link](https://github.com/QwenLM/qwen-code/issues/11851)

10. **#11882 — Shell comment semantics: scope decision on the two compound-command splitters** — *2 comments, P1, needs discussion*
    After #11821 added `#` comment handling to the permission-side splitter, the sibling `splitCompoundCommandSegments` still has no `#` state — they now disagree on the same input. [Link](https://github.com/QwenLM/qwen-code/issues/11882)

---

## Key PR Progress

1. **#11844 — `feat(web-shell)`: slide the active pill between tabs** ([Link](https://github.com/QwenLM/qwen-code/pull/11844))
   Adds a 200ms sliding pill highlight to sidebar tab switches (Tasks/Channels, MCP/Plugins/Agents/Extensions, skill install, settings) — pure UX polish, broad surface area.

2. **#11835 — `fix(cli)`: make the Ink `useBoxMetrics` loop guard machine-speed independent** ([Link](https://github.com/QwenLM/qwen-code/pull/11835))
   Switches the guard from a 16ms wall-clock refill to a per-commit count, addressing the root cause of the React #185 cluster. Reviewed as R1-2 follow-up #11858.

3. **#11874 — `feat(cli)`: `qwen batch` command for DashScope Batch API jobs** ([Link](https://github.com/QwenLM/qwen-code/pull/11874))
   Adds `submit` / `status` / `fetch` / `cancel` subcommands; bills at half realtime price on its own quota. Credentials reuse the existing resolver path.

4. **#11881 — `fix(standalone)`: bundle `@lydell/node-pty` prebuilds so web terminal works** ([Link](https://github.com/QwenLM/qwen-code/pull/11881))
   Standalone archives declared six `@lydell/node-pty*` packages in `optionalDependencies` but shipped none. Fixes the standalone path of #11872.

5. **#11871 — `fix(core)`: keep escaped trailing whitespace when trimming hook matchers** ([Link](https://github.com/QwenLM/qwen-code/pull/11871))
   Resolves the "invalid regex" failure for matchers like `\.env\ ` that ended in an escaped space; closes the root cause of #11862.

6. **#11821 — `fix(core)`: treat a word-initial `#` as a comment when splitting shell commands** ([Link](https://github.com/QwenLM/qwen-code/pull/11821))
   Adds a `comment` state to `splitCompoundCommandSegments`, fixing the permission-side compound-command splitter (#11815). Follow-up scope decision tracked in #11882.

7. **#11856 — `feat(core)`: support external reasoning profiles and defaults** ([Link](https://github.com/QwenLM/qwen-code/pull/11856))
   Consumers can override a model's reasoning profile, supported efforts, and defaults via `modelProviders[].capabilities.reasoning`. Known built-in endpoints accept partial defaults; new aliases pick one of ten existing wirings.

8. **#11548 — `feat(web-shell)`: connect to a selected remote daemon** ([Link](https://github.com/QwenLM/qwen-code/pull/11548))
   Standalone Web Shell can now target an explicit remote daemon via address + optional bearer token entered in the connection gate or Daemon Status. Switching targets starts a fresh page context.

9. **#11859 — `ci(pnpm)`: install with pnpm everywhere and retire `package-lock.json`** ([Link](https://github.com/QwenLM/qwen-code/pull/11859))
   Closes Stages 2 & 3 of #10444; CI now tests the same dependency graph that release ships.

10. **#11658 — `fix(cli)`: keep expanded OpenTUI confirmations inside the viewport (#11654)** ([Link](https://github.com/QwenLM/qwen-code/pull/11658))
    Repairs the OpenTUI E2E CI leg that's been red since the parity closeout — hook-forced confirmations with long payloads overflow when expanded with ctrl-s.

---

## Hot Discussions
*No GitHub Discussions data was provided in this feed. Section omitted.*

---

## Feature Request Trends

- **Multi-agent / `serve` daemon maturation** — A coordinated cluster from `@wenshao` (#11866, #11867, #11868, #11869) pushes toward a normative daemon protocol spec, bridge.ts splitting along control-plane/harness boundaries, an externalized event/journal data plane, and a Java control-plane vertical slice.
- **Web Shell as a full product surface** — PWA installability + Android dev shell (#11722), remote daemon connection (#11548), footnote previews & per-turn sources (#11480), and tab-pill motion (#11844) indicate the web shell is on a feature-acceleration path.
- **Cost & quota engineering** — `qwen batch` for DashScope Batch API (#11874) and per-session `web_search` caps (#11846) reflect user demand for first-class cost controls.
- **Smarter monorepo / worktree ergonomics** — Conditional `node_modules` symlinking based on dependency-change detection (#5790) and pnpm-everywhere CI (#11859) round out a developer-experience wave.
- **Telemetry depth** — Context-window usage breakdown on LLM spans (#10015) continues the observability push.

---

## Developer Pain Points

- **Silent TUI death on long sessions with background work** — The `useBoxMetrics` React #185 loop is now a four-issue / two-PR cluster (#11500, #11849, #11873, #11858 / #11835, #11817). Users report the process drops with no error message and a cold resume, making the crash hard to reproduce or even notice.
- **Cross-vendor model breakage via auto-injected `metadata`** — Any non-Qwen model served through DashScope's OpenAI-compatible gateway is unusable out-of-the-box (#11590, #11571). Compounded by generic `function parameters is empty (2013)` errors on fresh installs (#11834).
- **Hook & shell-parsing inconsistencies** — Matchers with escaped trailing whitespace throw cryptic "invalid regex" errors (#11862 → #11871); the two compound-command splitters disagree on `#` comments (#11815 → #11821 → #11882); `isAsyncOperator` permits `\r/\v/\f/\u00a0` as word separators, weakening Bash allow rules (#11851).
- **Standalone packaging gaps** — Web terminal PTY prebuilds declared but not bundled (#11872 → #11881); macOS code-signing blocks locally installed fallback binaries.
- **CI flakiness** — Scripts-lane test SIGTERMs with green suites (#11777); Windows + CI load deterministically fail the new loop-guard tests (#11817, #11850); all-green macOS E2E shard deaths (#11134).
- **VSCode Remote-SSH friction** — Companion webview stuck loading on cross-arch Remote-SSH (#11556); ECS runner fleet stale after release bumps (#11633).
- **Daemon session fairness** — A single idle session's unanswered permission prompt blocks every other ACP session indefinitely and silently (#11795).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*