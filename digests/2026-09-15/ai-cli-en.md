# AI CLI Tools Community Digest 2026-09-15

> Generated: 2026-09-14 23:30 UTC | Tools covered: 7

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

The AI CLI tool space has clearly exited its "coding assistant" phase and entered a platform-consolidation phase: the week's dominant themes across all seven tracked tools are extensibility frameworks (Claude Code's Mods, OpenCode extension hooks, Qwen's extension store), security policy engines, and long-horizon/multi-session orchestration. Windows has emerged as the shared quality battleground — Windows-specific defects appear in six of seven trackers, an unmistakable signal of enterprise adoption. Two trust-related undercurrents cut across communities: billing/quota opacity (Claude Code, Codex, Pi) and session/resume integrity (nearly everyone). Meanwhile, raw capability is no longer the differentiator; durability, observability, and provider-agnostic fidelity are.

## 2. Activity Comparison

| Tool | Issues (24h) | PRs (24h) | Discussions (24h) | Release status |
|---|---|---|---|---|
| **Claude Code** | 10 hot; top thread 851 comments / 476 👍 (#38335) | 5 updated | Referenced in trends; count not reported | v2.1.271 shipped (stable) |
| **Codex** | 15 (10 hot + 5 mentions) | **50 merged** (bot-driven) | 9 (3 ideas, 1 general, 5 show-and-tell) | 2 alphas (0.155.0-alpha.4 / -alpha.2.4) |
| **Gemini CLI** | 10 hot | 10 | Not reported in digest | Routine nightly (v0.61.0) |
| **Copilot CLI** | 21 new filed; 10 highlighted | 0 ("no PRs updated") | No data provided | 2 consecutive patches (v1.0.84-6/-7) |
| **OpenCode** | 10 hot (from ~50 active items) | 10 (from ~50 active items) | Not reported in digest | v1.18.31 bugfix |
| **Pi** | 10 hot | 10 | 1 (show-and-tell) | None |
| **Qwen Code** | 10 hot | 10 | Not reported in digest | v0.23.4 + nightly + 2 CUA driver binaries (4 total) |

*Note: No digest indicated upstream-disabled Issues/PRs; "not reported" reflects absence of data in that channel for the period, not confirmed inactivity. Codex's 50 merges were all from `copyberry[bot]`, indicating an automated/internal pipeline rather than community contribution flow.*

## 3. Shared Feature Directions

- **First-class extensibility (plugins/hooks/mods)** — Claude Code Mods framework (#91870, 104 👍; first `mods/diff` PRs already merged); OpenCode restoring the `permission.ask` hook (#42633) amid a wave of extension-API requests; Copilot CLI marketplace registration gaps (#4556); Qwen extension-store hardening (#11883/#11831); Codex configurable Guardian prompt template (#45516).
- **Windows platform quality** — Claude Code Cowork/Plan9 breakage after KB5124008 (#92984) and 154s PowerShell stalls (#94344); Codex has ~half its top-15 queue on Windows (screenshot #25178, lsass leak #33356, AppX #35347); Qwen `EPERM` on extension rename (#11883) and NTFS file-ID breakage (#11848); Pi orphaned pipeline processes (#9129); OpenCode Defender false positive (#49047); Copilot flashing console windows (#4549).
- **Session persistence & resume integrity** — Claude Code transcript corruption into permanent 400s (#86198) and 12.4 GB OOM on `--resume` (#79196); Copilot stale connection IDs after `/resume` (#4505); Codex restoring mode on thread resume (#45519); Gemini `/compress` not surviving resume (#21335); OpenCode's v1.18.31 exists specifically to fix ACP session-state loss. Pi's "mid conversation system messages" PR (#9548) is the most architectural response: transcript-as-source-of-truth.
- **Usage/billing transparency & cost attribution** — Claude Code #38335 (most-upvoted issue in repo, labeled invalid); Codex Pro 20x throttled as 5x (#38157), double-counted remote usage (#44719), and a community open letter (#45211); Pi overcharging via unnormalized Bedrock `usage.input` (#8752) and mispriced 1h cache writes (#9457, #9210). Codex #17827 (182 👍 status line) and OpenCode's agent fleet sparklines (#49066) show demand for in-session cost HUDs.
- **Remote, multi-session, long-horizon workflows** — Codex remote control from ChatGPT app is the board's top idea (#9200, 190 👍) plus Daybreak persistence work; Claude Code shipping remote fast-mode parity; Qwen building a normative daemon protocol (#11867) and remote web-shell connections (#11548); OpenCode users demanding multi-project tab workflows back (#37077).
- **Sandboxing as policy engine** — Gemini CLI converting `--yolo` into wildcard policy (#29287) and vetting policy-directory permissions (#29333/#29336); Copilot fail-closed pre-auth vs. `--yolo` conflict (#4844) and dev-tool policy bypass (#4846); Qwen shell-separator security bypass (#11851) and containerized subagents (#11711); Codex hardening Windows sandbox identity (#45533/#45542).
- **Multi-model / provider-agnostic fidelity** — Copilot hitting tool-count ceilings (Grok 4.5) and schema 400s (Gemini Flash, Deepseek BYOK) with opaque diagnostics (#4835/#4836/#4840); OpenCode Gemini nullable-array rejection (#48073); Qwen's metadata injection breaking non-Qwen models (#11590); Pi preserving `thoughtSignature`/`reasoning_content` across providers (#9444/#8732).

## 4. Differentiation Analysis

| Tool | Center of gravity | Distinctive bet |
|---|---|---|
| Claude Code | Enterprise product polish; extensibility roadmap | Mods plugin framework; Cowork desktop; but IDE (VS Code) integration lags CLI/TUI, and billing trust is the open wound |
| Codex | Highest engineering throughput | App-server architecture, Guardian auto-review, Daybreak long-horizon goals, Computer Use; heavy Windows sandbox investment |
| Gemini CLI | Core-loop hardening | Security vetting of policy dirs, sandbox round-bounding, AST-aware context engineering research (#22745) |
| Copilot CLI | GitHub-native enterprise | Org-level agents, managed marketplaces, fail-closed policy posture; multi-model hub (Claude/Grok/Gemini/Deepseek) rather than single-vendor |
| OpenCode | Open, provider-agnostic | Zen gateway breadth, observability (W3C traceparent), community-driven roadmap — currently spending capital on the V2 UI revolt |
| Pi | Minimalist, architecturally rigorous | Transcript-as-history (#9548), exact cost accounting, startup performance; expert-niche appeal |
| Qwen Code | Multi-host orchestration | Daemon protocol spec, ACP contract, containerized subagents, CUA driver binaries; DashScope/vendor-compat focus |

Target users diverge accordingly: Claude Code and Codex court professional/enterprise developers (with remote and policy features); Copilot CLI leverages the GitHub enterprise funnel; OpenCode and Pi serve self-hosting, multi-provider power users; Gemini CLI targets the Google-cloud mainstream; Qwen Code is carving out a cross-host/daemon niche with strong non-Western vendor support.

## 5. Community Momentum & Maturity

- **Velocity leader: Codex** — 50 merges/day (albeit bot-automated), 9 active discussions, the single most-upvoted idea in the set (#9200, 190 👍), and dual alpha tracks approaching 0.155.0 freeze.
- **Engagement leader: Claude Code** — unmatched reaction concentration (851-comment thread; 476 👍 on one issue) but only 5 external PR updates, confirming a product-led, low external-contribution model. Community pressure on billing remains unaddressed and is compounding.
- **Most reactive OSS governance: OpenCode** — ~50 active items/day and maintainers actively engaging a UI backlash (5+ issues, 50+ combined 👍); healthy signal, but the churn indicates roadmap/community misalignment risk.
- **Disciplined hardening: Gemini CLI and Qwen Code** — steady nightly/release trains; Qwen is shipping platform primitives (CUA driver, container backends, protocol specs) rather than firefighting only.
- **Smallest but deepest: Pi** — low volume, high signal; threads from core contributors (mitsuhiko) on foundational transcript architecture.
- **Shipping fast, listening less: Copilot CLI** — two same-day patches but zero PR updates and no discussion data; community channel volume is the weakest of the seven.

Maturity readout: all seven are converging on stability/security work over headline capability — a classic maturation signal. The frontier has moved to orchestration (plugins, remote control, long-horizon goals).

## 6. Trend Signals

1. **Windows is the enterprise adoption tax.** With six of seven trackers logging Windows-specific top issues (sandboxing, Plan9, AppX, PowerShell, Defender, NTFS), any team targeting enterprise rollouts should treat Windows CI as a first-class investment, not a port.
2. **Billing transparency is now a trust moat, not a support ticket.** The two largest engagement threads in the ecosystem (Claude Code #38335, Codex #38157/#45211) are about quota/cost accounting. Vendors that ship auditable, per-model/per-subagent cost attribution first will convert distrust into loyalty.
3. **The transcript is becoming the source of truth.** Pi's #9548 and the prevalence of resume/corruption bugs elsewhere point to a clear architectural direction: persist system-prompt deltas, tool-set changes, and reasoning state as first-class transcript records for resumability and cache preservation.
4. **Permission prompts are giving way to policy engines.** Gemini's policy-directory vetting, Copilot's fail-closed posture, Qwen's container isolation, and Codex's sandbox identity work all point to declarative, org-manageable policy as the enterprise security model.
5. **Observability is the next differentiator.** Token burn-rate HUDs (Codex #17827), trace-context propagation (OpenCode #49046), per-agent cost dashboards (#49066), and context-usage telemetry (Qwen #10015) reflect demand for agent-workload observability comparable to APM for services.
6. **Multi-model routing is a commodity; provider fidelity is table stakes.** The bug clusters (schema validation, cache pricing, reasoning-content preservation) show tools are now judged on cross-provider correctness, not model access.
7. **Remote/mobile control is the next UX frontier.** Codex's top community idea (190 👍) explicitly benchmarks Claude Code; expect headless daemon + mobile companion patterns to become a standard competitive axis within quarters.

**Bottom line for decision-makers:** for enterprise Windows environments, none of the seven is pain-free today — budget for sandbox and platform workarounds. For plugin ecosystems, Claude Code (Mods) and OpenCode are the near-term bets. For cost-sensitive multi-provider workloads, Pi and OpenCode offer the deepest control; for managed long-horizon orchestration, Codex and Claude Code are pulling ahead.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
*Data as of 2026-09-15 · Source: github.com/anthropics/skills*

> **Note on data quality:** The PR list indicates "Comments: undefined" and zero reactions across all 20 entries, so PR ranking below is derived from issue cross-references, update recency, and stated impact. Issue ranking uses verified comment counts.

---

## 1. Top Skills Ranking (by community attention)

### 1. skill-creator eval loop fix — `run_eval.py` 0% recall bug
**PR [#1298](https://github.com/anthropics/skills/pull/1298)** · Status: OPEN
Fixes the eval harness that has been silently reporting `recall=0%` for every skill description (10+ independent reproductions tracked in [Issue #556](https://github.com/anthropics/skills/issues/556), 12 comments). Because `run_loop.py` and `improve_description.py` consume this signal, the entire description-optimization loop is currently optimizing against noise. Also addresses Windows stream reading, trigger detection, and parallel workers.
*Why it tops the list:* breaks the foundation of skill authoring itself.

### 2. claude-api skill accuracy — retired model IDs & token bloat
**PR [#1607](https://github.com/anthropics/skills/pull/1607)** · Status: OPEN · Related: [Issue #1487](https://github.com/anthropics/skills/issues/1487)
Marks `claude-opus-4-1`, `claude-sonnet-4-0`, `claude-opus-4-0`, and `claude-3-haiku-20240307` as retired in `skills/claude-api/shared/models.md`. Separately, Issue #1487 (4 comments) flags that the same skill eagerly injects ~156k tokens and exhausts context in a single tool call — a critical correctness *and* efficiency problem for the bundled skill.

### 3. mcp-builder compatibility — `mcp>=2` streamable HTTP client
**PR [#1742](https://github.com/anthropics/skills/pull/1742)** · Status: OPEN · Fixes [#1668](https://github.com/anthropics/skills/issues/1668)
Adapts to upstream renaming (`streamablehttp_client` → `streamable_http_client`) and the new `create_mcp_http_client` / `http_client` header injection path. Without this, every mcp-builder user on `mcp>=2.0.0` gets a broken skill.
*Companion issue:* [#1390](https://github.com/anthropics/skills/issues/1390) — `evaluation.py` scores 0/N against any real MCP server because `TextContent` is not JSON-serializable (errors are silently fabricated).

### 4. mcp-builder default model refresh
**PR [#1724](https://github.com/anthropics/skills/pull/1724)** · Status: OPEN
Promotes the default in `scripts/evaluation.py` and `reference/evaluation.md` from `claude-3-7-sonnet-20250219` to `claude-sonnet-5`. Routine but expected.

### 5. Document-format quality suite — typography, ODT, DOCX, PDF, UTF-8
Cluster of complementary PRs improving the office-document skills:
- **[#514](https://github.com/anthropics/skills/pull/514)** — `document-typography` skill (orphan/widow/numbering alignment). Long-pending, raised March 2026.
- **[#486](https://github.com/anthropics/skills/pull/486)** — `odt` skill (create/fill/read ODT & ODS).
- **[#538](https://github.com/anthropics/skills/pull/538)** — PDF `SKILL.md` case-sensitive file references (8 fixes).
- **[#541](https://github.com/anthropics/skills/pull/541)** — DOCX tracked-change `w:id` collisions with bookmarks (corruption bug).
- **[#1765](https://github.com/anthropics/skills/pull/1765)** — Decode `git diff` as UTF-8 in DOCX/PPTX/XLSX redlining validators. Fixes [#1707](https://github.com/anthropics/skills/issues/1707).

### 6. Multi-agent orchestration — Hivemind
**PR [#1628](https://github.com/anthropics/skills/pull/1628)** · Status: OPEN
Delegates mechanical work from Claude Code to headless [opencode](https://opencode.ai) workers on free models while keeping Claude Code as planner/reviewer/merger. Aligns directly with the broader demand signal for zero-cost scaling.

### 7. Creative pipelines — md2video-audio
**PR [#1703](https://github.com/anthropics/skills/pull/1703)** · Status: OPEN
Markdown → Marp slides → MP4 with synthesized voiceover. Zero-cost, end-to-end content pipeline.

### 8. Domain-specific & meta skills
- **[#1615](https://github.com/anthropics/skills/pull/1615)** `scnet-hpc` — SCNet HPC cluster workflows (SSH/Slurm/accelerators).
- **[#525](https://github.com/anthropics/skills/pull/525)** `pyxel` — retro/pixel-art 8-bit game development via `pyxel-mcp`.
- **[#83](https://github.com/anthropics/skills/pull/83)** `skill-quality-analyzer` + `skill-security-analyzer` — meta-skills for scoring and hardening other skills (still open since Nov 2025).
- **[#210](https://github.com/anthropics/skills/pull/210)** Improved `frontend-design` clarity/actionability.
- **[#539](https://github.com/anthropics/skills/pull/539)** `quick_validate.py` YAML-frontmatter hardening (unquoted `:` truncation).
- **[#1627](https://github.com/anthropics/skills/pull/1627)** `buffer-api` — Buffer GraphQL scheduling.
- **[#1595](https://github.com/anthropics/skills/pull/1595)** UIZZE partner-skill listing.

---

## 2. Community Demand Trends (from Issues)

| Theme | Evidence | Direction |
|---|---|---|
| **Distribution & governance of skills** | [#492 (43 comments)](https://github.com/anthropics/skills/issues/492) — trust-boundary abuse via `anthropic/` namespace; [#228 (16)](https://github.com/anthropics/skills/issues/228) — org-wide sharing; [#62 (10)](https://github.com/anthropics/skills/issues/62) — skills vanishing on rename | Strongest single demand. Users want a verified-official channel and admin-level sharing. |
| **Reliable evaluation infrastructure** | [#556 (12)](https://github.com/anthropics/skills/issues/556) — 0% trigger; [#1390 (4)](https://github.com/anthropics/skills/issues/1390) — 0/N scoring; [#1487 (4)](https://github.com/anthropics/skills/issues/1487) — 156k token injection | Until `skill-creator`'s harness is trustworthy, all skill-quality work is guesswork. |
| **Reasoning quality & safety patterns** | [#1385 (4)](https://github.com/anthropics/skills/issues/1385) — three-gate pipeline; [#412 (6, CLOSED)](https://github.com/anthropics/skills/issues/412) — agent-governance skill; [#1175 (4, CLOSED)](https://github.com/anthropics/skills/issues/1175) — SharePoint security | Demand for skills that constrain and verify Claude's behavior, not just execute it. |
| **Memory & compact state** | [#1329 (9)](https://github.com/anthropics/skills/issues/1329) — `compact-memory` symbolic notation | Long-context agents need their own compression layer. |
| **Multi-agent / orchestration primitives** | [#1385](https://github.com/anthropics/skills/issues/1385), [#16 (4)](https://github.com/anthropics/skills/issues/16) "Skills as MCPs" | Skills increasingly want to *delegate* to sub-agents and external MCPs. |
| **Platform integration gaps** | [#29 (4)](https://github.com/anthropics/skills/issues/29) — AWS Bedrock; [#189 (6)](https://github.com/anthropics/skills/issues/189) — duplicate-skill install | Skills are not yet first-class outside Claude Code. |
| **Packaging & reproducibility** | [#1362 (3)](https://github.com/anthropics/skills/issues/1362) — `web-artifacts-builder` on pnpm ≥10.1 | Toolchain drift is silently breaking skill bundles. |

---

## 3. High-Potential Pending Skills (active, not yet merged)

These PRs are recent, address real failures, and are most likely to land first:

1. **[#1298](https://github.com/anthropics/skills/pull/1298)** — `skill-creator` eval-loop repair. Highest-leverage fix in the repo right now.
2. **[#1742](https://github.com/anthropics/skills/pull/1742)** — mcp-builder `mcp>=2` import + custom headers. Unblocks all mcp-builder users.
3. **[#1765](https://github.com/anthropics/skills/pull/1765)** — UTF-8 redlining diffs. Small, targeted, regression-class fix.
4. **[#1724](https://github.com/anthropics/skills/pull/1724)** — Default-model bump to `claude-sonnet-5`.
5. **[#1607](https://github.com/anthropics/skills/pull/1607)** — claude-api retired-model cleanup.
6. **[#539](https://github.com/anthropics/skills/pull/539)** + **[#541](https://github.com/anthropics/skills/pull/541)** — DOCX/PDF/SKILL.md hardening (small, low-risk).
7. **[#1703](https://github.com/anthropics/skills/pull/1703)** `md2video-audio` — high-visibility creative capability.
8. **[#1628](https://github.com/anthropics/skills/pull/1628)** `Hivemind` — taps the multi-agent demand signal directly.
9. **[#1615](https://github.com/anthropics/skills/pull/1615)** `scnet-hpc` — fills an unmet niche for HPC users.

**Long-tail but worth watching:** [#486](https://github.com/anthropics/skills/pull/486) ODT, [#525](https://github.com/anthropics/skills/pull/525) pyxel, [#1627](https://github.com/anthropics/skills/pull/1627) buffer-api — niche but coherent.

---

## 4. Skills Ecosystem Insight

> **The community's most concentrated demand is for a trustworthy Skills substrate — verifiable authorship/namespacing, reliable evaluation harnesses, and first-class distribution/sharing — so that the rapidly growing library of niche skills (HPC, retro games, social APIs, document formats) can be safely consumed at enterprise scale.**

---

# Claude Code Community Digest — 2026-09-15

## Today's Highlights
**v2.1.271 ships fast-mode for Remote sessions** (cloud and self-hosted runners), bringing parity between local `/fast` and remote workflows. The community is also rallying around the upcoming **"Mods" extensibility framework** (Issue #91870, 170 comments / 104 👍), which promises function-hook–level plugin customization — Anthropic has committed to shipping it "in weeks." Meanwhile, the long-running **Max plan session-limit thread** (#38335) has crossed **851 comments and 476 👍**, signaling an unresolved billing/usage concern that remains the most-upvoted issue on the tracker.

## Releases
**v2.1.271** ([release](https://github.com/anthropics/claude-code/releases/tag/v2.1.271))
- **Fast mode in Remote sessions**: cloud and self-hosted runners now respect the host's `fast-mode` setting or in-session `/fast` toggle (subject to org policy).
- **Mouse support for `/config` in fullscreen**: the scroll wheel now navigates the settings panel — a small but long-requested TUI ergonomics fix.

## Hot Issues

1. **[#38335](https://github.com/anthropics/claude-code/issues/38335) — Max plan session limits exhausted abnormally fast since 2026-03-23**
   *851 comments · 476 👍 · OPEN (marked invalid)*. The single highest-volume thread in the repo. Users on Max/Pro report session budgets draining far below documented thresholds on CLI usage. Despite the volume and reaction count, the issue is labeled `invalid` — strong community signal that Anthropic's billing telemetry for CLI quotas needs a public audit.

2. **[#91870](https://github.com/anthropics/claude-code/issues/91870) — Mods: make Claude 10x more extensible**
   *170 comments · 104 👍*. The most-requested enhancement right now. Proposes a first-class plugin/hook system. Anthropic's Sep 9 update confirms **function hooks are committed**, with a "weeks not days" timeline. This effectively defines the next major surface area for power users.

3. **[#92984](https://github.com/anthropics/claude-code/issues/92984) — Cowork (Windows): Plan9 shares fail after KB5124008**
   *112 comments · 58 👍 · data-loss-adjacent*. Windows Update KB5124008 (26200.9445) breaks all Plan9 drive shares in Cowork; uninstalling the KB restores them. High-priority platform compatibility regression affecting enterprise Windows users.

4. **[#36146](https://github.com/anthropics/claude-code/issues/36146) — VS Code: first user message stays pinned**
   *29 comments · 43 👍 · 6 months open*. A long-standing VS Code extension UI defect where the first user message in the chat panel cannot be scrolled past. The thumbs-up ratio (43/29) is unusually high, indicating broad developer frustration with the IDE UX.

5. **[#74715](https://github.com/anthropics/claude-code/issues/74715) — Chrome extension "Always allow" persisted as `duration:"once"`**
   *18 comments · 5 👍 · has repro*. Approved site permissions are silently downgraded to one-shot, so users must re-approve every browser action. A correctness bug in the Chrome extension's permission model.

6. **[#93071](https://github.com/anthropics/claude-code/issues/93071) — Cowork Windows 10: `sandbox-helper: no Plan9 drive shares mounted`**
   *5 comments · 0 👍 · sandbox impact*. Companion to #92984 but on Windows 10 22H2. The `device_bash` tool is fully inoperative since 2026-09-08; restart/reinstall don't help.

7. **[#86198](https://github.com/anthropics/claude-code/issues/86198) — `/effort` during in-flight `advisor` permanently 400s the session**
   *4 comments · 0 👍 · data integrity*. Typing any slash command while a server-side tool call is still pending corrupts the transcript — `local_command` records are injected inside an open assistant message, breaking server-tool pairing. Documented with full repro.

8. **[#93646](https://github.com/anthropics/claude-code/issues/93646) — `--model sonnet` resolves to Sonnet 4.5, not Sonnet 5**
   *2 comments · 0 👍 · API consistency*. The CLI's shorthand model resolution diverges from the `/model` picker on v2.1.270+. Bedrock users hit this immediately. Signals a sloppy alias-map update on the Sonnet 5 rollout.

9. **[#93046](https://github.com/anthropics/claude-code/issues/93046) — Usage-limit warning names parent model, not subagent's**
   *2 comments · 0 👍 · agent correctness*. When a subagent on `fable` exhausts its budget, the banner reports the *parent* (Opus) model as the consumer. Users have no reliable way to attribute per-model spend from in-session warnings.

10. **[#94344](https://github.com/anthropics/claude-code/issues/94344) — Desktop app: every PowerShell tool call waits ~154 s**
    *2 comments · 0 👍 · perf*. On Windows desktop, PowerShell invocations stall ~2.5 minutes before execution; Bash runs instantly in the same session. Dialog/permissions/IPC have been ruled out — points to a host-shell bootstrap regression.

## Key PR Progress

1. **[#94184](https://github.com/anthropics/claude-code/pull/94184) — `mods/diff`: pinned header with body-only scroll**
   *Closed · poteat*. The docked diff pane now matches the built-in `/diff` panel frame-for-frame: pinned header, base line, and 8-row file list; wheel scrolls hunks 3 rows/tick (1 file/tick over an overflowing list). Notable because it's the first concrete `mods/` deliverable on the extensibility roadmap.

2. **[#93951](https://github.com/anthropics/claude-code/pull/93951) — `mods`: relocate tests next to the mods**
   *Closed · poteat*. Behavior tests for `diff`, `sec-default`, and `telemetry` mods now live under `mods/<mod>/tests/`, runnable via `claude plugin test`. Signals a stable plugin test harness is landing alongside Mods.

3. **[#87079](https://github.com/anthropics/claude-code/pull/87079) — `fix(security-guidance)`: make `**` glob match zero-depth paths**
   *Open · anishsamant*. Currently `security-patterns.json` rules using `**/*.ts` silently exclude top-level files because `glob_match` delegates to `fnmatch`, where a bare `*` already crosses `/`. The PR aligns runtime with the documented "** matches any depth" semantics — a quiet but real security-rule correctness fix.

4. **[#71627](https://github.com/anthropics/claude-code/pull/71627) — `docs(sandbox)`: note prompt-approved hosts are session-scoped**
   *Open · mahirhir*. Adds one bullet to `examples/settings/README.md` clarifying that network hosts approved at the sandbox prompt are lost on resume. Documents a non-obvious behavior change with the sandbox network policy.

5. **[#83890](https://github.com/anthropics/claude-code/pull/83890) — Create pylint.yml**
   *Closed · KrypticKode007*. CI lint workflow addition; closed without merge — likely replaced or rejected in favor of an internal config.

*(Note: only 5 PRs updated in the last 24h; all are listed above.)*

## Feature Request Trends

Across Issues and Discussions, three directions dominate:

- **First-class plugin / Mods ecosystem** — the clear #1. [#91870](https://github.com/anthropics/claude-code/issues/91870) is the focal point; sub-threads request hookable lifecycle events, scoped permissions, and a plugin marketplace.
- **A "Discussion" / read-only conversational mode** — requested independently in [#85848](https://github.com/anthropics/claude-code/issues/85848) and [#91301](https://github.com/anthropics/claude-code/issues/91301). The pitch: a mode between Chat and Plan where Claude reads, searches, and explains but cannot edit or even *propose* a plan — useful for code review and onboarding.
- **Per-model / per-subagent attribution** — model limits, cost tracking, and usage warnings should be attributed to the actual consuming model, not the parent's. [#93046](https://github.com/anthropics/claude-code/issues/93046) and [#76484](https://github.com/anthropics/claude-code/issues/76484) (closed) show users are tired of opaque, parent-attributed telemetry.

Secondary signals: better remote/multi-session UX in the desktop app (multi-pane, persistent tab groups), and Windows sandbox/Plan9 hardening.

## Developer Pain Points

- **Billing & quota transparency on Max plans** — [#38335](https://github.com/anthropics/claude-code/issues/38335) shows deep, unresolved mistrust around how CLI session budgets are counted. Any work here is a trust lever.
- **Windows-platform regressions are clustering** — three top issues (#92984, #93071, #94344, #93482) involve Cowork/Plan9/PowerShell on Windows. PowerShell specifically has a known bootstrap issue dating back to #57960 that remains open.
- **VS Code extension UX debt** — [#36146](https://github.com/anthropics/claude-code/issues/36146) (pinned message), [#72707](https://github.com/anthropics/claude-code/issues/72707) (uncollapsible prompts), [#62804](https://github.com/anthropics/claude-code/issues/62804) (inline-vs-code-block rendering). The IDE integration lags the CLI/TUI.
- **Silent state corruption in transcripts** — [#86198](https://github.com/anthropics/claude-code/issues/86198) and [#92509](https://github.com/anthropics/claude-code/issues/92509) show that interleaving local commands with in-flight server tools can corrupt sessions into permanent 400s. Developers want resumability guarantees.
- **Memory and recovery regressions on headless `--resume`** — [#79196](https://github.com/anthropics/claude-code/issues/79196) documents a 12.4 GB OOM when reifying transcripts; [#85983](https://github.com/anthropics/claude-code/issues/85983) shows `max_tokens` recovery invalidates caches and drops thinking output. Both undermine the headless/CI workflow that power users depend on.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-15

## Today's Highlights

- Two alpha builds of **0.155.0** were published overnight (`rust-v0.155.0-alpha.4` and `rust-v0.155.0-alpha.2.4`), suggesting the team is closing in on a feature freeze for the next CLI release.
- The most upvoted open issue remains **#17827 (Customizable status line, 182 👍)**, while the most-discussed thread is **#25178 (Windows Computer Use screenshot failure, 58 comments)** — Windows platform quality is once again the dominant theme across issues, PRs, and discussions.
- A wave of infrastructure work (50 closed PRs, mostly by `copyberry[bot]`) consolidates the Windows sandbox service, Guardian reviewer lifecycle, and the app-server's collaboration/Daybreak state machine.

## Releases

- [`rust-v0.155.0-alpha.4`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.4) — latest alpha
- [`rust-v0.155.0-alpha.2.4`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.2.4) — backport refresh on the alpha.2 line

Both are cut from the `rust-v0.155.x` series; no published changelog was provided in the data, so treat them as routine pre-release builds.

## Hot Issues

1. **[#25178 — Windows Computer Use screenshot fails on Win10 22H2](https://github.com/openai/codex/issues/25178)** — `SetIsBorderRequired` returns `0x80004002` before any capture, breaking `get_window_state`. 58 comments / 25 👍. Top platform blocker for the new Computer Use feature.
2. **[#17827 — Customizable status line](https://github.com/openai/codex/issues/17827)** — 45 comments / 182 👍, the highest-liked open issue. Requests Claude-Code-style status scripts (token use, rate limits, model, git branch) in the TUI.
3. **[#40060 — Windows execpolicy false positive on `Start-Process` + URL](https://github.com/openai/codex/issues/40060)** — Classifier in 0.146–0.149+ misreads mixed PowerShell. 17 comments. Concrete reproducer attached; affects security UX.
4. **[#25826 — Maximized Codex window spills across monitors](https://github.com/openai/codex/issues/25826)** — 16 comments / 18 👍. Multi-monitor Windows UX regression.
5. **[#35347 — Codex AppX stuck in "Modified, NeedsRemediation"](https://github.com/openai/codex/issues/35347)** — 15 comments. Microsoft Store path on Win11 25H2; setup never reaches UAC.
6. **[#33356 — `lsass` handle leak in Windows sandboxed exec](https://github.com/openai/codex/issues/33356)** — 13 comments. 3–5 handles per command, OS-level degradation over long sessions. High-severity perf/correctness bug.
7. **[#17401 — `@include` directive for composable `AGENTS.md`](https://github.com/openai/codex/issues/17401)** — 12 comments / 21 👍. Would let repos split context into reusable, modular files; strongly aligns with long-horizon workflows.
8. **[#28361 — `codex mcp-server` / `app-server` children never reaped on Windows](https://github.com/openai/codex/issues/28361)** — 11 comments. Process leak to "hundreds over time" when hosted by Claude Code.
9. **[#30271 — False "Cyber Abuse" flag on legitimate reverse engineering](https://github.com/openai/codex/issues/30271)** — 10 comments. Policy/safety false-positive on verified users; blocks a legitimate workflow.
10. **[#38157 — Pro (20x) accounts throttled as 5x](https://github.com/openai/codex/issues/38157)** — 10 comments / 5 👍. Plan/capacity mismatch for paying customers.

**Honorable mentions:** [#42739 (sidebar projects vanish after Windows update)](https://github.com/openai/codex/issues/42739), [#45444 (regression: turn aborted mid-task on usage limit)](https://github.com/openai/codex/issues/45444), [#36973 (multi-agent prompt contains conflicting delegation guidance)](https://github.com/openai/codex/issues/36973), [#45003 (Windows setup fails before UAC)](https://github.com/openai/codex/issues/45003), [#45068 (`/copy` routes to host clipboard in remote tmux — closed)](https://github.com/openai/codex/issues/45068).

## Key PR Progress

> All 50 closed PRs in the window are by `copyberry[bot]` and are now merged.

1. **[#45543 — Refactor image content to use shared `ImageReference`](https://github.com/openai/codex/pull/45543)** — Flattens `image_url` wire format into a single type used by `ContentItem` and `FunctionCallOutputContentItem`; regens app-server JSON schema. Foundational cleanup for image handling.
2. **[#45542 — Service-managed package registration for Windows sandbox accounts](https://github.com/openai/codex/pull/45542)** — Adds an explicit `registered_core` provisioning mode authenticating callers against the service's package family.
3. **[#45537 — Move Guardian reviewer lifecycle into the extension](https://github.com/openai/codex/pull/45537)** — Ensures Guardian reviews terminate cleanly with their parent, including the rate-limit-retry edge case.
4. **[#45534 — Honor explicit Unix socket grants in Linux managed sandbox](https://github.com/openai/codex/pull/45534)** — Fixes a regression where `dangerously_allow_all_unix_sockets` was ignored for standalone sockets.
5. **[#45533 — Harden and share Windows sandbox identity helpers](https://github.com/openai/codex/pull/45533)** — Bounds token-query sizes, validates SID pointers/revisions, centralizes the lookup path in `codex_windows_sandbox`.
6. **[#45529 — Expose selected workspace routing in `account/read`](https://github.com/openai/codex/pull/45529)** — Adds experimental `account/read.workspaceRouting` (workspace ID, origin, `us` / `us_cr` / `NO_CONSTRAINT` override) for app-server clients.
7. **[#45524 — Enable MXC TTY launches and managed networking in the exec server](https://github.com/openai/codex/pull/45524)** — Reports `windows_mxc`, allows MXC TTY launches without the shared-ingress restricting SID.
8. **[#45519 — Restore collaboration mode when resuming threads](https://github.com/openai/codex/pull/45519)** — Bug fix: resumed threads no longer lose their saved Plan mode and developer instructions.
9. **[#45518 — Route Guardian reviewers through ThreadManager for inline parents](https://github.com/openai/codex/pull/45518)** — Captures parent identity/auth/sharing so inline delegates can spawn reviewers without registry lookups.
10. **[#45516 — Allow configuring the Guardian prompt template](https://github.com/openai/codex/pull/45516)** — New `auto_review.experimental_policy_template` in `config.toml`, override beats the model-catalog template.

**Other notable merges:** [#45513 (`daybreakEnabled` at `thread/start`)](https://github.com/openai/codex/pull/45513), [#45509 (share MCP tool specs via `Arc<ToolSpec>`)](https://github.com/openai/codex/pull/45509), [#45506 (background persistence for steered user input)](https://github.com/openai/codex/pull/45506), [#45521 (Guardian reviewer startup callback in pool)](https://github.com/openai/codex/pull/45521), [#45528 (compress larger Windows artifacts first)](https://github.com/openai/codex/pull/45528).

## Hot Discussions

### Ideas
- **[#9200 — Remote control Codex from the ChatGPT app](https://github.com/openai/codex/discussions/9200)** — 47 comments / 190 👍. Most-upvoted idea on the board: a headless daemon mode plus a real mobile UI, replacing the current Tailscale + SSH workaround.
- **[#14595 — Remote control: wen?](https://github.com/openai/codex/discussions/14595)** — 6 comments / 18 👍. Asks for a roadmap signal; positions Claude Code's remote control as the bar to clear.
- **[#13287 — Use cases for long-horizon, multi-session development](https://github.com/openai/codex/discussions/13287)** — 12 comments / 2 👍. Companion to issue #13241; the author offers a concrete approach and seeks broader validation.

### General
- **[#45211 — Reopen Pro 20X access, address Korean-language quality, clarify reset policy](https://github.com/openai/codex/discussions/45211)** — Community open letter to OpenAI leadership about plan availability and locale-specific quality regressions.

### Show and tell
- **[#45392 — Reading Codex rollout files: hits and workarounds](https://github.com/openai/codex/discussions/45392)** — Author of **Fishbowl** (a local read-only viewer for coding-agent sessions) summarizes gaps in parsing `~/.codex/sessions/.../rollout-*.jsonl`.
- **[#45486 — UI Design Agent Kit](https://github.com/openai/codex/discussions/45486)** — Skill that forces a research → plan → design-contract → browser-verified UI loop. 11 demos, 2 playable 3D.
- **[#45474 — CoCo, the Codex Coordinator, can FART now](https://github.com/openai/codex/discussions/45474)** — Local CLI + MCP interface for parallel Codex agents across terminals and repos, each with its own Git worktree.
- **[#45382 — codex-sdlc](https://github.com/openai/codex/discussions/45382)** — Open-source plugin/repo framework that walks a feature request through requirements → implementation → independent QC.
- **[#44618 — Wayfinder: a visual voyage map of Codex work](https://github.com/openai/codex/discussions/44618)** — Local-first desktop app that turns session history into a navigable timeline.
- **[#45329 — SCOUT: a custom pet for Codex](https://github.com/openai/codex/discussions/45329)** — Belgian-Malinois-themed custom pet with 9 animated work states and 16 look directions.

## Feature Request Trends

- **Rich TUI/HUD ergonomics** — customizable status lines (#17827), token/quota burn-rate "speedometers" (#45427), and clearer "what is the model actually doing" indicators.
- **Long-horizon, multi-session workflows** — composable `AGENTS.md` via `@include` (#17401), long-horizon/multi-session use cases (#13287, #13241), and improvements to Daybreak/collaboration persistence (#45513, #45519).
- **Remote & mobile control** — multiple high-engagement threads (#9200, #14595, #30417) all want first-class remote/mobile control, and a few are surfacing bugs in what's already there (e.g., usage double-counting on remote #44719).
- **Image-generation transparency** — exposing the effective image model and a model selector for built-in `image_gen` (#43965).
- **Plan & subscription clarity** — Pro 20X availability, capacity reporting, and rate-limit UX are recurring pain points (#38157, #45211, #45444, #44909).
- **Modular agent design** — requests for more controllable subagent delegation and clearer prompt contracts (#36973, Guardian prompt template override #45516).

## Developer Pain Points

- **Windows platform regressions dominate the queue.** Across the top 15 most-active issues, roughly half are Windows-specific: setup failures (#45003, #35347), AppX/MSIX update problems (#25770), multi-monitor layouts (#25826), RTL UI (#41624), and the chronic Auto-Scrolling / viewport bugs (#45479).
- **Windows sandboxing has both correctness and performance bugs.** lsass handle leaks (#33356), MCP/app-server process leaks (#28361), execpolicy false positives (#40060), and Computer Use screenshot failures (#25178) all converge on the same theme: the Windows sandbox/identity surface is brittle.
- **Usage accounting is confusing and inconsistent.** Plan tier showing 5x instead of 20x (#38157), double-counted usage on Windows→Linux remote (#44719), long-running turns being aborted instead of finished on limit hit (#45444), and an estimated 3,808 sessions wasted on "false" goal continuations (#44909).
- **TUI / terminal friction.** `/copy` routes to the host clipboard when running inside an SSH-spawned tmux (#45068); status-line customizability is still missing despite demand (#17827).
- **Safety/policy false positives hurt real workflows.** Cyber Abuse triggers on legitimate reverse engineering (#30271) and Daybreak false positives stall active goals (#44848) — both are correctness issues masquerading as policy.
- **App-server state management has visible bugs.** Queued follow-ups disappearing (#45019), "Waiting for worktree setup…" stuck states (#40253), and projects vanishing from the sidebar after a Windows update (#42739) point to fragile client/server synchronization.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-15

## Today's Highlights
The past 24 hours were dominated by a concentrated hardening push around the agent loop, sandboxing, and policy directory security. A nightly release (`v0.61.0-nightly.20260914`) shipped alongside a cluster of `fix(core)` and `fix(a2a-server)` PRs that address React StrictMode purity violations, sandbox expansion recursion, MCP OAuth issuer validation, and policy directory write-permission vetting. On the issue side, subagent lifecycle bugs (MAX_TURNS misreporting, generalist agent hangs, browser subagent failures on Wayland) remain the loudest source of community pain.

## Releases
- **v0.61.0-nightly.20260914.g9c1b0a610** — Routine automated nightly. Full diff vs. previous nightly is a one-commit bump generated by the release bot ([changelog](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260913.g9c1b0a610...v0.61.0-nightly.20260914.g9c1b0a610)).

## Hot Issues
1. **#22323 — Subagent recovery after MAX_TURNS is reported as GOAL success (p1, bug, 13 comments)** — The `codebase_investigator` subagent silently logs `status: "success"` with `Termination Reason: "GOAL"` even when it hit the turn limit before doing any analysis, masking real interruptions from the user. ([link](https://github.com/google-gemini/gemini-cli/issues/22323))
2. **#21409 — Generalist agent hangs (p1, bug, 8 comments, 8 👍)** — `gemini-cli` hangs indefinitely when it defers to the generalist subagent, even for trivial tasks like creating a folder; the workaround is to explicitly forbid subagent delegation. High upvote count signals broad user impact. ([link](https://github.com/google-gemini/gemini-cli/issues/21409))
3. **#19873 — Zero-Dependency OS Sandboxing & Post-Execution Intent Routing (p2, enhancement, 9 comments)** — Strategic proposal to align Gemini CLI with Gemini 3's native bash affinity via OS-level sandboxing plus post-execution intent routing, rather than restricting tool surfaces. ([link](https://github.com/google-gemini/gemini-cli/issues/19873))
4. **#22745 — Assess the impact of AST-aware file reads, search, and mapping (p2, feature, 7 comments)** — EPIC tracking whether AST-aware tooling (precise method reads, navigable code graphs) can cut wasted tokens and turns relative to current file-firehose reads. ([link](https://github.com/google-gemini/gemini-cli/issues/22745))
5. **#21968 — Gemini does not use skills and sub-agents enough (p2, bug, 6 comments)** — Even with clearly-described custom skills (e.g., `gradle`, `git`), the model won't invoke them autonomously unless explicitly told to. A behavioral gap rather than a tool gap. ([link](https://github.com/google-gemini/gemini-cli/issues/21968))
6. **#25166 — Shell command execution stuck on "Waiting input" after completion (p1, bug, 3 👍)** — After a simple CLI command finishes, the CLI hangs with the command still marked active and "Awaiting user input". Affects non-interactive commands, suggesting a stdin/pipe handling regression. ([link](https://github.com/google-gemini/gemini-cli/issues/25166))
7. **#26525 — Add deterministic redaction and reduce Auto Memory logging (p2, security bug, 5 comments)** — Auto Memory currently relies on the model to redact secrets in its extraction prompt, meaning sensitive transcript content already reaches model context before redaction occurs. ([link](https://github.com/google-gemini/gemini-cli/issues/26525))
8. **#21983 — Browser subagent fails on Wayland (p1, bug, 4 comments)** — Browser Agent terminates with `Termination Reason: GOAL` immediately on Wayland sessions; reproduces on common Linux desktop environments. ([link](https://github.com/google-gemini/gemini-cli/issues/21983))
9. **#24246 — 400 error when > 128 tools are available (p2, bug, 3 comments)** — When the tool registry exceeds the model's tool schema limit the request 400s outright; the agent should curate its own tool scope. ([link](https://github.com/google-gemini/gemini-cli/issues/24246))
10. **#22672 — Agent should stop / discourage destructive behavior (p2, customer issue)** — The model occasionally falls back to `git reset --force` or destructive DB commands when safer alternatives exist; needs prompt-level and policy-level guardrails. ([link](https://github.com/google-gemini/gemini-cli/issues/22672))

## Key PR Progress
1. **#29333 — fix(core): vet the permissions of policy directories found by convention** — Extends `isDirectorySecure` beyond the system tier so that user and workspace policy directories are actually checked for hostile write permissions, not just trusted because the CLI looks there. ([PR](https://github.com/google-gemini/gemini-cli/pull/29333))
2. **#29336 — fix(core): secure non-system policy directories against write permissions (#29311)** — Moves the security check outside the system-only branch and adds an `allowUserOwnership` opt-in for default/user/workspace dirs on POSIX and Windows. ([PR](https://github.com/google-gemini/gemini-cli/pull/29336))
3. **#29332 — fix(core): bound how often one call may expand the sandbox** — Patches a fatal OOM loop where a tool returning `sandbox_expansion_required` every turn recursed into `_execute` without a round counter. ([PR](https://github.com/google-gemini/gemini-cli/pull/29332))
4. **#29335 — fix(core): preserve AgentLoopContext properties across object spread (p1)** — Replaces fragile prototype getters on `Config` with explicit fields so `config`, `promptId`, `toolRegistry`, `messageBus`, `geminiClient`, `sandboxManager`, `promptRegistry`, and `resourceRegistry` survive spread operations. ([PR](https://github.com/google-gemini/gemini-cli/pull/29335))
5. **#29328 — fix(a2a-server): honour LOG_LEVEL and keep credentials out of the log (p1, security)** — The A2A server had `LOG_LEVEL` allow-listed in `process.env` but then hardcoded `level: 'info'`; also scrubs credentials from log output. ([PR](https://github.com/google-gemini/gemini-cli/pull/29328))
6. **#29330 — fix(cli): keep input typed before the logger answers, and read it once** — Fixes a React StrictMode purity violation where `setPastSessionMessages` was called from inside the `setCurrentSessionMessages` updater, plus a related stdin race. ([PR](https://github.com/google-gemini/gemini-cli/pull/29330))
7. **#29329 — fix(cli): pause stdin after truncation, and say when it gives up on it** — Stops calling `process.stdin.destroy()` (which permanently kills later readers) and instead pauses stdin, with a user-visible message when input is dropped. ([PR](https://github.com/google-gemini/gemini-cli/pull/29329))
8. **#29327 — fix(sdk): honour AgentShellOptions env and timeoutSeconds** — `SdkAgentShell.exec` previously ignored both `env` and `timeoutSeconds`, so `exec('sleep 30', { timeoutSeconds: 1 })` waited the full 30 seconds and non-returning commands hung forever. ([PR](https://github.com/google-gemini/gemini-cli/pull/29327))
9. **#29287 — feat(policy): map --yolo to allowedTools wildcard policy** — Removes the special `ApprovalMode.YOLO` state entirely and expresses it as a normal wildcard `allowedTools: ["*"]` policy, closing #11303. ([PR](https://github.com/google-gemini/gemini-cli/pull/29287))
10. **#29117 — fix(core): enforce RFC 9207 issuer identification in MCP OAuth** — Adds the optional `iss` parameter to MCP OAuth responses and validates response origin consistency, preventing unintended token routing in the MCP OAuth flow. ([PR](https://github.com/google-gemini/gemini-cli/pull/29117))

## Feature Request Trends
- **AST-aware code navigation.** The strongest design-thread direction this week, anchored by EPIC #22745 and follow-ups #22746 and #19561, all arguing for surgical, AST-bounded reads (`grep → AST slice → symbol scope`) instead of full-file dumps that consume 15k+ tokens per turn.
- **Sandbox & intent routing overhaul.** #19873 proposes OS-level zero-dependency sandboxing plus post-execution intent routing to align the CLI with Gemini 3's native bash training, suggesting the team is reconsidering how much tool surface the model should see.
- **Memory system hardening.** A coordinated cluster (#26516, #26522, #26523, #26525) asks for deterministic redaction, inbox quarantine for invalid patches, and bounded retry semantics in Auto Memory — the implicit ask is to treat memory as a security-sensitive subsystem rather than a freeform extraction pipeline.
- **Subagent observability and lifecycle clarity.** Trajectory sharing via `/chat share` (#22598), subagent context in `/bug` reports (#21763), and accurate termination semantics (#22323) all push toward making subagent behavior reviewable and debuggable.
- **Browser agent robustness.** Lock recovery (#22232), Wayland support (#21983), and `settings.json` override compliance (#22267) form a coherent "browser agent must work unattended" wishlist.
- **Persistent, file-based task tracking.** Replacing `WriteToDo` with on-disk CRUD (#18836) is a recurring ask, driven by context-rot and memory-loss problems with in-context todos.
- **Self-awareness of CLI internals.** #21432 wants the agent to know its own flags, hotkeys, and command grammar accurately so it can act as a self-guide.

## Developer Pain Points
- **Subagent reliability and observability.** The single loudest theme — generalist agent hangs (#21409), Wayland browser failures (#21983), MAX_TURNS misreported as GOAL (#22323), missing subagent context in `/bug` (#21763), and under-utilized skills/subagents (#21968) — together paint a picture of subagents that are too fragile to trust unattended.
- **Tool registry scale.** Hitting a 400 error past ~128 tools (#24246) breaks any workflow that pulls in many MCP servers or local skill packs; users want automatic tool curation.
- **Stdin / shell lifecycle.** The "Waiting input" hang (#25166) plus the recent stdin-truncation fixes (#29329, #29330) point to a class of bugs where the CLI treats finished processes as still awaiting input, particularly after `process.stdin.destroy()`.
- **Auto Memory semantics.** Low-signal sessions retried indefinitely (#26522), invalid patches silently dropped (#26523), secrets redacted only in the prompt (#26525) — all of these make Auto Memory feel like a leaky abstraction that needs a clearer contract.
- **Sandbox expansion without bound.** #29332's description of a tool that triggers `sandbox_expansion_required` on every attempt and kills the process highlights how missing round-counters in security-critical paths can escalate into OOM crashes.
- **Policy directory trust.** #29333/#29336 confirm that user- and workspace-tier policy directories were being trusted on name alone, a latent supply-chain risk that is now being closed.
- **Session persistence gaps.** `/compress` not surviving a session resume (#21335) and WriteToDo's purely in-context state (#18836) both reflect a wider gap between in-memory and on-disk session state.
- **Agent hygiene.** Randomly-scattered tmp scripts (#23571) and destructive command choices (#22672) cause cleanup and safety friction even when the agent's "answer" is correct.
- **Terminal UX.** Resize flicker and re-render churn (#21924) remain a long-standing ink/React rendering pain point.
- **Symlink ergonomics.** `~/.gemini/agents/*.md` not being recognized when it's a symlink (#20079) is a small but recurring annoyance for users who dotfile-manage their agents.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-15

## Today's Highlights

The Copilot CLI team shipped two consecutive patch releases (`v1.0.84-7` and `v1.0.84-6`) addressing Claude adaptive-thinking shapes and adding a `/config` sidebar plus network allow/deny rules for sandboxes. Issue #4525, a long-standing MCP dual-era initialization bug affecting Python MCP SDK 2.0.0 servers, was closed — a notable signal of progress on MCP compatibility. However, the 24h issue intake (21 items) is dominated by fresh triage reports on sandbox policy gaps, plugin activation edge cases, and cross-model compatibility (Grok, Gemini Flash, Deepseek), suggesting v1.0.83/84 is exposing several new regression surfaces.

## Releases

- **v1.0.84-7** — Fixed the thinking shape sent to Claude models classified as adaptive-only (they now stay adaptive instead of failing, and reasoning effort is capped at `high` when thinking is disabled); sessionEnd hooks now run when `/clear` closes a session.
- **v1.0.84-6** — Added `/config` to open a sidebar configuration screen in the CLI; added `/sandbox` Network host allow/deny rules without replacing the configured upstream proxy; managed Edit/Write rules now apply to recognized native shell redirections and supported in-place `sed` operations.

## Hot Issues

1. **[#4525](https://github.com/github/copilot-cli/issues/4525) — CLOSED · MCP dual-era `initialize` after `server/discover` (-32022)** (👍 3, 7 comments)  
   CLI 1.0.81-1 sent a legacy `initialize` request after a successful modern `server/discover` probe, breaking Python MCP SDK 2.0.0 servers. Closed today — important signal that MCP protocol-version negotiation is being hardened.

2. **[#4725](https://github.com/github/copilot-cli/issues/4725) — OPEN · Frequent JavaScript heap OOM on Linux** (👍 1, 5 comments)  
   Recurring V8 OOM crashes every few minutes, with peak resident sets near 3.9 GB. Critical stability issue affecting long-running Linux sessions.

3. **[#4505](https://github.com/github/copilot-cli/issues/4505) — OPEN · Resumed session retains stale connection item IDs** (👍 3, 4 comments)  
   After `/resume`, every prompt fails with `CAPIError: 400 input item ID does not belong to this connection`; `/fork` does not recover. High-impact data-integrity bug for long-running workflows.

4. **[#4549](https://github.com/github/copilot-cli/issues/4549) — OPEN · Windows: every shell command flashes a PowerShell console window** (👍 1, 2 comments)  
   Each agent shell command spawns a visible `conhost` window instead of running hidden. Significant Windows UX regression.

5. **[#4556](https://github.com/github/copilot-cli/issues/4556) — OPEN · Server-managed `extraKnownMarketplaces` never registers a marketplace** (👍 2, 2 comments)  
   Fetch succeeds and parses, but the entries never reach the plugin/marketplace code path. Affects enterprise-managed plugin catalogs.

6. **[#3572](https://github.com/github/copilot-cli/issues/3572) — OPEN · Org-level custom agents invisible without a GitHub-hosted remote in cwd** (👍 3, 2 comments)  
   Custom agents from `.github-private` only load when cwd has a git remote belonging to the org. Long-standing enterprise usability gap.

7. **[#4843](https://github.com/github/copilot-cli/issues/4843) — OPEN · Colors don't respect Warp terminal theme on macOS** (👍 0, 1 comment)  
   CLI keys off OS light/dark mode instead of the active Warp theme, producing unreadable text when they disagree.

8. **[#4841](https://github.com/github/copilot-cli/issues/4841) — OPEN · Custom agent plan-mode leaves Plan panel blank** (👍 0, 1 comment)  
   When a non-inferred, user-selected custom agent calls `exit_plan_mode`, the panel renders bubbles but no plan body (`plan_content` empty while summary is populated).

9. **[#4846](https://github.com/github/copilot-cli/issues/4846) — OPEN · Sandbox filesystem policies ignored with "allow dev tool access"** (👍 0, 0 comments)  
   Enabling dev-tool access bypasses user filesystem policies for tools like `python`. A meaningful security-policy regression in 1.0.83.

10. **[#4844](https://github.com/github/copilot-cli/issues/4844) — OPEN · `--yolo` swallowed by the pre-auth fail-closed bypass cap** (👍 0, 0 comments)  
    During the pre-auth window, the fail-closed posture disables bypass mode before server policy arrives, and `--yolo` is never re-applied once policy resolves. Enterprise posture vs. user intent conflict.

## Key PR Progress

No pull requests were updated in the last 24 hours.

## Hot Discussions

No discussion data was provided for this period.

## Feature Request Trends

- **MCP protocol modernization (#4834, #4525)** — Strong demand for MCP `2026-07-28` Multi Round-Trip Requests (`input_required`) and proper `server/discover` semantics. Modernization is the single largest theme in the issue stream.
- **Sandbox policy granularity (#4783, #4844, #4846)** — Multiple requests for a separate enterprise policy scope for CLI sandbox `yolo` mode, better `--yolo` handling under fail-closed startup, and consistent enforcement of filesystem rules when dev-tool access is on.
- **Enterprise / org agent discovery (#3572)** — Org-level custom agents should be discoverable regardless of cwd repository.
- **Terminal / OS integration polish (#4549, #4839, #4843)** — Hide spawned console windows on Windows, disable taskbar icon, respect per-terminal themes (Warp).
- **Model compatibility ceilings (#4835, #4836, #4840)** — Tool-count ceilings (Grok 4.5: 350), schema validation errors (Gemini Flash MCP array enums), and BYOK regressions (Deepseek `custom` tool type) all point to a need for pre-flight model/tool schema validation.

## Developer Pain Points

- **Session lifecycle fragility** — Stale connection item IDs after `/resume` (#4505) and sessions permanently stuck in "In use" state (#4845) make long-running workflows unreliable.
- **Linux memory stability** — Recurring V8 OOM crashes (#4725) suggest no memory ceiling or regression suite catches runaway heap growth.
- **Plugin activation under policy** — `#4837` (installed but `enabled: false`) and `#4556` (marketplace fetch but no registration) are symptoms of a fragile plugin/policy merge path.
- **Pre-auth / fail-closed UX cliff** — `--yolo` loss (#4844) and intermittent headless skill resolution (#4838) show interactive vs. headless paths diverging in the brief pre-auth window.
- **Cross-model error masking** — Both Grok 4.5 and Gemini Flash surface opaque HTTP 400s instead of actionable diagnostics (#4835, #4836), forcing users to guess which schema or limit was violated.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-15

## Today's Highlights

The standout story today is strong community backlash against the forced V2 sidebar redesign — at least five separate issues (#48882, #48953, #48837, #49021, #49031, #38230) with combined upvotes of 50+ demand restoration of the legacy two-panel layout, prompting an active maintainer conversation. Concurrently, **v1.18.31** shipped a targeted ACP session-state bugfix, while the Zen gateway is experiencing an outage on DeepSeek V4.1 Flash and intermittent `reasoning encrypted_content` errors for Muse Spark family models.

---

## Releases

### v1.18.31 — Bugfix release

- **Core**: Restored ACP session model, effort, mode, and reasoning chunk boundaries when loading, resuming, or forking sessions. ([@JacobNWolf](https://github.com/anomalyco/opencode/releases/tag/v1.18.31))
- **TUI**: Surfaces remote-config authentication errors during startup and exits with a failure status (previously these errors were silently swallowed).
- **Extensions**: Improvements section truncated in release notes.

---

## Hot Issues

1. **[#13984 — Copy/paste broken in CLI](https://github.com/anomalyco/opencode/issues/13984)** *(59 comments, 32 👍, OPEN)*
   The highest-traffic open issue: "copied to clipboard" appears, but `Ctrl+V` pastes nothing. Persistent across many users over multiple months — a basic UX blocker.

2. **[#48741 — Zen critical errors on Muse Spark family](https://github.com/anomalyco/opencode/issues/48741)** *(26 comments, OPEN)*
   New error `reasoning encrypted_content was not issued to this caller` blocks all Muse Spark models on Zen. High blast radius for paying users.

3. **[#48882 — Restore legacy UI with persistent left sidebar](https://github.com/anomalyco/opencode/issues/48882)** *(14 comments, 20 👍, OPEN)*
   The canonical "bring back the old UI" thread. Calls out that the recent sidebar redesign (#20242) removed the two-panel layout with no toggle.

4. **[#17318 — SSE read timed out](https://github.com/anomalyco/opencode/issues/17318)** *(47 comments, 37 👍, CLOSED)*
   Long-running file-write streams abort. Resolved, but a sign of streaming reliability issues across multiple provider integrations.

5. **[#26602 — Desktop 5-minute headers timeout](https://github.com/anomalyco/opencode/issues/26602)** *(13 comments, OPEN)*
   Desktop client enforces a hard 5-minute headers deadline on local OpenAI-compatible providers, ignoring `"timeout": false`. Blocks slow local inference setups.

6. **[#5391 — Multiple auth profiles per provider](https://github.com/anomalyco/opencode/issues/5391)** *(13 comments, 41 👍, OPEN)*
   Highest-upvoted feature request in the set. Users want to swap between personal/work/api-key accounts without editing config.

7. **[#49041 — DeepSeek V4.1 Flash down on Zen](https://github.com/anomalyco/opencode/issues/49041)** *(7 comments, OPEN)*
   Model spins forever with no output, while V4 Pro works fine. Started within the last hour — fresh outage.

8. **[#48953 — "Why do we have to use the new layout?"](https://github.com/anomalyco/opencode/issues/48953)** *(8 comments, 12 👍, CLOSED)*
   The V2 redesign has lost the layout toggle entirely. Representative thread of the broader UI revolt.

9. **[#48811 — macOS: every prompt fails `undefined is not an object`](https://github.com/anomalyco/opencode/issues/48811)** *(6 comments, 29 👍, OPEN)*
   Total macOS breakage traced to `SystemPrompt.environment`. 29 upvotes is a strong signal of widespread impact.

10. **[#49047 — Windows Defender flags OpenCode as Trojan](https://github.com/anomalyco/opencode/issues/49047)** *(6 comments, CLOSED)*
    Antivirus false-positive — a trust/UX concern for new Windows users.

---

## Key PR Progress

1. **[#49046 — propagate W3C traceparent on outbound LLM requests](https://github.com/anomalyco/opencode/pull/49046)** *(OPEN)*
   Closes #49038. Lets OTLP-capable gateways/proxies correlate traces end-to-end across OpenCode → LLM provider. Important for observability stacks.

2. **[#49071 — use allowlist for OpenAI prompt cache key](https://github.com/anomalyco/opencode/pull/49071)** *(OPEN)*
   Closes #45113. `lowerOptions` was unconditionally lowering `promptCacheKey`; restricts the rename to supported providers only.

3. **[#49069 — surface persistent service startup failures](https://github.com/anomalyco/opencode/pull/49069)** *(OPEN)*
   Closes #49034. When two background-service contenders overlap, the first's startup error was discarded. Replaces a silent timeout with a clear failure message — closes an issue cluster also touched by #41746 and #41696.

4. **[#48990 — TUI skip instance disposal on SIGUSR2 reload](https://github.com/anomalyco/opencode/pull/48990)** *(OPEN)*
   Closes #42621. Theme-switch SIGUSR2 signals were aborting in-flight model requests; now skipped when config is unchanged.

5. **[#48943 — refactor model resolving logic, fix missing variant logic](https://github.com/anomalyco/opencode/pull/48943)** *(CLOSED)*
   Internal cleanup of model-variant resolution — likely unblocks multiple downstream provider bugs.

6. **[#49068 — add protocol body extensions](https://github.com/anomalyco/opencode/pull/49068)** *(CLOSED)*
   Adds `Protocol.withBody` for typed request-body dialects; migrates Alibaba and Z.AI Messages dialects. Foundation for cleaner provider-specific extensions.

7. **[#49052 — add Azure Foundry message discriminators](https://github.com/anomalyco/opencode/pull/49052)** *(CLOSED)*
   Distinguishes `*.services.ai.azure.com/api/projects/...` endpoints as a typed `azure-responses` dialect with explicit `type: "message"` discriminators.

8. **[#49065 — cross Set/RegExp/URLSearchParams to host in codemode](https://github.com/anomalyco/opencode/pull/49065)** *(CLOSED)*
   Stops `JSON.stringify`-induced data loss at the tool/result boundary — `new Set([1,2])` no longer arrives as `{}`.

9. **[#49066 — agents fleet tab with token sparklines](https://github.com/anomalyco/opencode/pull/49066)** *(OPEN)*
   New cross-project Agents view: status pulse, stage chips (SPEC/PLAN/BUILD/GATE/REVIEW), in/out tokens, rolling tok/s, cache%, $est, TTFT, and a 64-bucket output-token sparkline per agent.

10. **[#42633 — restore permission ask hook safely](https://github.com/anomalyco/opencode/pull/42633)** *(CLOSED)*
    Closes #7006. Restores the declared `permission.ask` plugin hook before OpenCode creates an interactive permission request — fills a long-standing plugin-API gap.

---

## Feature Request Trends

Distilled from the 50 issues and PRs active in the last 24h:

- **Legacy UI / two-panel sidebar restoration** — *the* dominant theme (#48882, #48953, #48837, #49021, #49031, #38230). Users with 20+ sessions report the V2 tabbed layout as a productivity regression, and want a permanent toggle in Desktop *and* Web.
- **Multi-account authentication per provider** (#5391, 41 👍) — swap between personal/work/API-key profiles without editing config files.
- **Trace-context propagation** (#49038, PR #49046) — W3C `traceparent` on outbound LLM HTTP for distributed tracing parity with MCP `tools/call` (SEP-414).
- **Tab shortcuts** (#37077) — `Ctrl+T`/`Ctrl+W`/`Ctrl+Tab` to switch tabs, reinforcing the "give us back multi-project workflows" sentiment.
- **Configurable timeouts** (#26602, #49044) — Desktop's hard 5-minute headers timeout and client SDK's 300 s undici headers timeout both need override hooks.
- **Cross-model tool fallback** (#49026) — invoke a configured image-generation model when the active chat model can't read images.

---

## Developer Pain Points

1. **Forced UI redesign without an escape hatch.** The single loudest community complaint this week. Power users managing many concurrent sessions feel the V2 tabbed layout breaks their workflow, and there is no settings-level toggle to revert.

2. **Zen gateway instability.** Within the same 24h window: DeepSeek V4.1 Flash hangs (#49041), DeepSeek V4 Flash (New) route hangs on zen gateway (#40479), and the Muse Spark family fails with `reasoning encrypted_content` errors (#48741). The gateway appears to be a single point of failure across multiple model families.

3. **macOS baseline breakage.** Issues #48811 and #48372 (combined 48 👍) show *every* prompt failing on macOS with the same `undefined is not an object` error in `SystemPrompt.environment`. Effectively blocks the platform.

4. **Streaming/reliability failures.** SSE read timeouts (#17318), 5-minute Desktop headers timeout (#26602), models stuck on "Thinking" indefinitely after hours of use (#49033), and the client SDK's 300 s undici headers timeout (#49044) all point to weak long-running-stream handling.

5. **Trust signals on Windows.** Windows Defender flagging the executable as a Trojan (#49047) — a friction point during onboarding and updates.

6. **CLI copy/paste is broken.** Top-comment issue #13984 has been open since February with no resolution, suggesting low-priority UI ergonomics issues linger in the backlog.

7. **Provider schema mismatch.** Gemini rejects MCP tools with nullable array schemas (#48073) — one bad tool declaration breaks the entire request, since Gemini validates all declarations up front.

8. **Session-state regressions.** `session_message.seq NOT NULL constraint failed` (#31204) on agent-switched sessions, and "old sessions/projects not visible after update" (#49029) — both indicate migration fragility in v2 schema changes.

---

*Generated from GitHub activity for anomalyco/opencode, 2026-09-15.*

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-15

## Today's Highlights
A burst of Bedrock cost-accounting bugs dominated the issue tracker this week — `usage.input` normalization and 1h cache-write billing both surfaced as paid-too-much incidents — while mitsuhiko's "mid conversation system messages" PR moved toward landing as a foundational change to how Pi records prompt and tool history in the transcript.

## Releases
No new releases in the last 24 hours.

## Hot Issues

1. **#8752 — bedrock-converse: `usage.input` not normalized across model families** (5 👍, OPEN)
   Anthropic reports `input` net of cache, OpenAI-family reports it gross; Pi passes the raw value through, producing false cache-miss notices and doubled input cost on Bedrock. Concrete financial impact, hence the thumbs.
   https://github.com/earendil-works/pi/issues/8752

2. **#9457 — bedrock-converse: 1h cache writes bill at the 5m rate** (4 👍, OPEN)
   The stream path never sets `cacheWrite1h` from `cacheDetails`, so every 1h prompt-cache write is mispriced. A complementary symptom of #8752's normalization gap.
   https://github.com/earendil-works/pi/issues/9457

3. **#9210 — Anthropic via Vercel AI Gateway: `cacheWrite1h` never set**
   With `PI_CACHE_RETENTION=long` through Vercel, the 1h TTL is honored upstream but Pi bills at the 5m rate (1.25×). A second instance of the cache-pricing pattern that #9457 names for Bedrock.
   https://github.com/earendil-works/pi/issues/9210

4. **#9211 — `vercelGatewayRouting` is inert on the `vercel-ai-gateway` provider**
   The documented "Vercel AI Gateway routing config" option is only wired into `openai-completions.js`, but every model in the built-in catalog uses `anthropic-messages` — so the documented feature does nothing.
   https://github.com/earendil-works/pi/issues/9211

5. **#9391 — Stale signed thinking blocks replayed after compaction**
   After a manual compaction, the same 15 `prefix_binding_mismatch` paths fire on every subsequent Anthropic request. Signed thinking blocks aren't being dropped/replaced when context is summarized.
   https://github.com/earendil-works/pi/issues/9391

6. **#9306 — Aborted/error turns leave unmatched `toolCall` blocks in context**
   When an agent turn ends with `stopReason: "error"` or `"aborted"`, tool calls already streamed into the assistant message never get a matching tool result; the next `runAgentLoopContinue` is rejected by the provider.
   https://github.com/earendil-works/pi/issues/9306

7. **#9129 — Windows bash timeout leaves pipeline processes orphaned**
   `taskkill /F /T /PID <bash>` doesn't reach MSYS2 pipeline intermediaries, so each pipeline stage continues running after the timeout. Real Windows usability regression.
   https://github.com/earendil-works/pi/issues/9129

8. **#9440 — `--session-id` with a fresh id scans all transcripts**
   A user with 4k+ transcripts reports ~16s startup even with `-ne`, because Pi still does a full scan to find "no existing match." Extension authors are blocked from cheap session-id precomputation.
   https://github.com/earendil-works/pi/issues/9440

9. **#9354 — Prompt templates with invalid frontmatter are silently dropped**
   Skills warn on a YAML parse failure; prompt templates in `prompts/*.md` just vanish from `/` autocomplete and `/resources` with no diagnostic. Asymmetry between two near-identical code paths.
   https://github.com/earendil-works/pi/issues/9354

10. **#9444 — `openai-completions` drops Gemini `thoughtSignature` on streamed `tool_calls`**
    Multi-turn tool use against Gemini behind an OpenAI-compatible gateway fails on request #2 because the signature on the assistant message is never captured; pi-side fix expected.
    https://github.com/earendil-works/pi/issues/9444

## Key PR Progress

1. **#9548 — Mid conversation system messages** (mitsuhiko, OPEN)
    Surfaces system-prompt text and tool-set changes as recorded transcript entries instead of silent prefix rewrites, enabling branch navigation, resume fidelity, and cached-prompt preservation across resumption.
    https://github.com/earendil-works/pi/pull/9548

2. **#9601 — Avoid transcript scans for exact session IDs** (metaist, OPEN)
    Direct fix for #9440: looks up session headers without loading the whole transcript, sync instead of async. Microbench shows a meaningful startup win.
    https://github.com/earendil-works/pi/pull/9601

3. **#9594 — Add Gemini-only Antigravity provider** (a209m, CLOSED)
    Restores subscription-backed Gemini access via a first-class OAuth provider, adapting the dedicated Antigravity transport and OAuth flow into the current provider architecture.
    https://github.com/earendil-works/pi/pull/9594

4. **#8474 — Bundle Node runtime into `pi-coding-agent`** (mitsuhiko, CLOSED)
    Drastically fewer files at load time; motivated by Windows + Defender startup pain. Note: marked closed today, but flagged as "needs more tests and optimizations."
    https://github.com/earendil-works/pi/pull/8474

5. **#8732 — Preserve `reasoning_content` on cross-model replay into DeepSeek-family endpoints** (CLOSED)
    Repairs multi-turn thinking-mode behavior on DeepSeek, B.AI / SenseNova, and OpenRouter-hosted DeepSeek models by carrying `reasoning_content` through to the destination request.
    https://github.com/earendil-works/pi/pull/8732

6. **#9274 — Preserve indentation in rendered diffs** (dannote, OPEN)
    The edit tool's intra-line renderer dropped indentation from removed lines when text was inserted before otherwise unchanged content; renderer now keeps surrounding whitespace intact.
    https://github.com/earendil-works/pi/pull/9274

7. **#9589 — Type user input items in the Responses API** (Clmzz-gra, CLOSED)
    Two related bugs both produced `unsupported input item type:` 400s on strict Responses endpoints; fix tags user-input items correctly.
    https://github.com/earendil-works/pi/pull/9589

8. **#9351 — Fix edit preview flicker on remote edits** (terrorobe, OPEN)
    The edit tool row was flashing a local "Could not edit file" error before the remote operation replaced it; preview now updates atomically with the remote diff.
    https://github.com/earendil-works/pi/pull/9351

9. **#9570 — Map `TOO_MANY_TOOL_CALLS` to an error stop reason** (rsaryev, OPEN)
    `@google/genai@2.21.0` added the new FinishReason; the exhaustive switch in `google-shared.ts` was throwing `Unhandled stop reason`. Adds the mapping so Gemini-side throttle responses are graceful.
    https://github.com/earendil-works/pi/pull/9570

10. **#9581 — Warn when prompt template frontmatter fails to parse** (gvkhosla, CLOSED)
    Fix for #9354: malformed `prompts/*.md` now produce the same diagnostic prompt-collision warnings skills already emit, instead of vanishing silently.
    https://github.com/earendil-works/pi/pull/9581

## Hot Discussions

**Show and tell**
- **#1558 — CursorAI Agent CLI custom provider for the Pi Coding Agent** (9 👍, 3 comments)
  netandreus released `@netandreus/pi-cursor-provider` on npm — a community provider letting Pi drive the Cursor CLI — and is asking for a mention alongside Claude Code / OpenAI Codex providers. https://github.com/earendil-works/pi/discussions/1558

## Feature Request Trends

- **Cost / cache fidelity on gateways.** Bedrock, Vercel AI Gateway, and Anthropic caching semantics all surfaced pricing bugs this week — users want per-provider normalization of `cacheWrite1h`, `cacheRead`, and `usage.input`, with the option surfaced as a first-class compat flag rather than a hardcoded constant.
- **Provider breadth and parity.** Demand for `opencode-go`, Antigravity, and per-conversation `SessionAffinityFormat` variants is rising; users want a documented catalog path for non-OpenAI/Anthropic providers without forking.
- **Transcript-as-history.** Two threads (#9548, #9432, #9441) converge on "record more into the transcript, less into implicit session state" — system prompt deltas, tool changes, and selection markers all want first-class representation so resume/branch/CX caching work.
- **Extension API ergonomics.** `#7824`, `#9434`, `#9578` all propose new extension hooks — turn termination from tool results, prompt appenders, and atomic interrupt+pending-message delivery — suggesting a wave of extension authors outgrowing the current surface.
- **Better diagnostics, not just fixes.** `#9354`, `#9453`, `#9585`, `#9599` all ask for clearer signals (warnings surfaced in `/resources`, macOS Local Network Privacy UX, retryable-error taxonomy, listener-throw guard rails) over silent failures.

## Developer Pain Points

- **Silent failure modes.** Corrupt base64 image blocks surviving across requests (#9590), prompt templates disappearing on a YAML typo (#9354), tool calls orphaned on error stops (#9306), signed thinking blocks replaying forever after compaction (#9391) — the dominant complaint is "I had no warning."
- **Cross-model fragility.** Replay into a new model family still leaks prior-model reasoning, signatures, or unbounded thinking text (#9433, #9444, #9391) — a recurring source of opaque 400s.
- **Windows is a second-class citizen.** Orphaned bash pipeline processes (#9129), shell-resolution inconsistency (#9501/#9504), Local Network Privacy denials tied to Pi's process (#9453), and the bundling change motivated by Defender scans (#8474) all underline real Windows DX gaps.
- **Gateway billing trust.** Across Bedrock and Vercel AI Gateway, users have been overpaying without knowing; multiple concurrent bugs suggest the cost pipeline needs a unified normalization layer, not per-provider patches.
- **Concurrency & session integrity.** Concurrent `pi -c` runs append into a single file with no lock (#9596); `--session-id` triggers full directory scans on startup (#9440). Both indicate session-file handling wasn't designed for parallel use.
- **Extension surface gaps.** Multiple long-standing requests (#7824, #9434, #9578) suggest extensions routinely patch prototypes at runtime — a signal that the documented API needs an extension-point review.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-15

## Today's Highlights

The v0.23.4 release ships a breaking change that removes configurable message-prefix filtering from channels, alongside two new cua-driver-rs binaries (v0.20.8 and v0.20.7) for the Computer-Use driver. The community remains heavily focused on triaging **TUI crashes triggered by React error #185** (three separate issues tracking the same Ink `useBoxMetrics` loop) and a cluster of **Windows-specific filesystem and security bugs** surfacing in extensions, hooks, and identity comparators.

## Releases

- **[v0.23.4](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.4)** — Removes configurable message-prefix filtering from channels; eligible messages now follow normal sender/group/mention/pairing policies. (#11571)
- **[v0.23.4-nightly.20260914](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.4-nightly.20260914.f024b37689)** — Test infra improvements on Windows inode gates (#11853) and a CUA driver fix.
- **[cua-driver-rs v0.20.8](https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.20.8)** & **[v0.20.7](https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.20.7)** — Prebuilt CUA Driver binaries (macOS codesigned + notarized; Linux x86_64/arm64 glibc 2.31+; Windows UIAccess + SDK payload).

## Hot Issues

1. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500)** — **TUI exits silently with React error #185** when multiple background subagents complete concurrently. The Ink `useBoxMetrics` layout-listener triggers a `setState` loop that exceeds React's maximum update depth, killing the process without rendering an error. (13 comments, P1)
2. **[#11590](https://github.com/QwenLM/qwen-code/issues/11590)** — Qwen Code auto-injects a top-level `metadata` object into OpenAI-compatible requests routed through DashScope, which breaks **all non-Qwen models** (e.g. GLM-5.3-Flash) with HTTP 400 errors. Marked **CLOSED** as ready-for-human. (8 comments, P1)
3. **[#11834](https://github.com/QwenLM/qwen-code/issues/11834)** — Chinese-character greetings fail with `API Error: 400 invalid params, function parameters is empty (2013)` on 0.23.3, even though `/update` reports it as the latest. (6 comments, P1)
4. **[#11556](https://github.com/QwenLM/qwen-code/issues/11556)** — **vscode-ide-companion 0.23.1 webview hangs** under Remote-SSH (VSCode 1.137.0 server / 1.133.0 client). Reproducible across mixed-arch setups. (6 comments, P1)
5. **[#11849](https://github.com/QwenLM/qwen-code/issues/11849)** — Intermittent silent crashes on 0.23.3 closely tracking #11500, more frequent after long sessions; session resume shows no error trail. (5 comments, P1)
6. **[#11795](https://github.com/QwenLM/qwen-code/issues/11795)** — **Permission queue is keyed on the ACP connection**: one idle session's unanswered prompt silently blocks every other session on the daemon. Partial fix in #11802 (serialization scope); queue-visibility and TTL fixes remain. (5 comments, P1)
7. **[#11887](https://github.com/QwenLM/qwen-code/issues/11887)** — `qwen --acp` **ignores approval modes entirely**: tools auto-execute without ever sending `session/request_permission` to the ACP client, defeating the safety contract. (4 comments, P2)
8. **[#11851](https://github.com/QwenLM/qwen-code/issues/11851)** — **Security**: `isAsyncOperator` treats `\r`, `\v`, `\f`, `\u00a0` as bash word separators, allowing a Bash allow rule to silently cover a second, attacker-injected command. (3 comments, P1)
9. **[#11872](https://github.com/QwenLM/qwen-code/issues/11872)** — Web Terminal reports `[Error: PTY not available]` because `@lydell/node-pty` is declared but not bundled; macOS code signing also blocks locally installed prebuilds. (3 comments, P1)
10. **[#11883](https://github.com/QwenLM/qwen-code/issues/11883)** — On Windows, **extension update and uninstall fail with `EPERM`** because the store relies on a single directory rename that Windows locks. (2 comments, P1)

## Key PR Progress

1. **[#11821](https://github.com/QwenLM/qwen-code/pull/11821)** — Teaches `splitCompoundCommandSegments` about `#` comments so trailing comments no longer split compound commands and trigger spurious permission prompts.
2. **[#11711](https://github.com/QwenLM/qwen-code/pull/11711)** — Adds **container execution for subagents** on Unix (`QWEN_AGENT_EXECUTION_BACKEND=docker|podman`), with per-agent and project-level opt-in.
3. **[#11889](https://github.com/QwenLM/qwen-code/pull/11889)** — Fixes the Windows extension-store `EPERM` (see #11883) by falling back to copy-then-swap when the directory rename is refused.
4. **[#11842](https://github.com/QwenLM/qwen-code/pull/11842)** — Restores the `parameters` key on the chat-completions wire for MiniMax routing, fixing #11834's empty-tool-call regression.
5. **[#11778](https://github.com/QwenLM/qwen-code/pull/11778)** — Resolves Windows command hooks via `cmd.exe → PowerShell` fallback (breaking change for hook authors targeting raw `cmd`).
6. **[#11857](https://github.com/QwenLM/qwen-code/pull/11857)** — Skips automatic re-review on pushes whose diff is byte-identical to an already-reviewed head (cuts redundant CI on "Update branch").
7. **[#11893](https://github.com/QwenLM/qwen-code/pull/11893)** — Mocks `realpathSync` in the review cleanup suite so the cwd-call-count witness is stable on Windows.
8. **[#11879](https://github.com/QwenLM/qwen-code/pull/11879)** — Hardens standalone-archive downloads in the release pipeline with 120s fetch timeouts and 3× exponential retries (#11870).
9. **[#11466](https://github.com/QwenLM/qwen-code/pull/11466)** — Re-arms MCP server connections after a user-cancelled tool call, since the current cancellation path also skips reconnect logic.
10. **[#11831](https://github.com/QwenLM/qwen-code/pull/11831)** — Resolves skill identity from the authoritative catalog before evaluating higher-scope disablement guards (now **CLOSED/MERGED**).

## Feature Request Trends

- **Cross-host agent orchestration** — container execution for subagents (#11711), connecting Web Shell to a selected remote daemon (#11548), and a normative daemon protocol spec with conformance gating (#11867) point to a maturing multi-host story.
- **Cost & safety caps on tools** — per-session `web_search` call caps mirroring Claude Code (#11846) suggests demand for tool-level rate limiting.
- **Telemetry depth for context engineering** — exposing a versioned `qwen-code.context.usage` breakdown on `qwen-code.llm_request` spans (#10015) to enable context-window observability.
- **Worktree ergonomics** — smart conditional `node_modules` symlinking for worktrees based on dependency diffs (#5790) to reclaim ~1 GB per worktree.
- **Web Shell workspace management** — in-UI git remote management (#11163) and footnote previews with per-turn sources (#11480).

## Developer Pain Points

- **TUI instability under concurrency** — The recurring React #185 crash on multi-subagent completion (#11500, #11849, #11873) is the single most-discussed reliability bug.
- **Windows filesystem quirks** — `EPERM` on extension rename (#11883), 64-bit NTFS file IDs breaking `isSameFile` (#11848/#11877), and PTY/code-signing blockers (#11872) form a recurring Windows tax.
- **Shell-parsing security gaps** — `\r/\v/\f/\u00a0` shell-word-separator bypass (#11851) and the duplicated `splitCompoundCommandSegments` parser (#11882) highlight a fragmented, hand-rolled shell parser.
- **ACP protocol edge cases** — Approval-mode bypass (#11887) and per-connection permission-queue contention (#11795) expose gaps in the ACP safety contract.
- **CI flakiness & infrastructure churn** — Intermittent `SIGTERM` on green test suites (#11777), stale ECS runner fleets (#11633), and macOS E2E shard deaths (#11134) consume maintainer time.
- **Model-vendor compatibility** — Top-level `metadata` field breaking non-Qwen vendors (#11590) and the MiniMax wire regression (#11842) point to fragile OpenAI-compatible serialization assumptions.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*