# ArXiv AI Research Digest 2026-09-11

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG, cs.MA) | 50 papers | Generated: 2026-09-10 23:30 UTC

---

# ArXiv AI Research Digest — 2026-09-11

## 🔥 Today's Highlights

Today's submissions show a strong push toward **agentic AI systems** moving from research prototypes to real workflows: VLM-based robots, cross-device GUI agents, and LLM orchestrators for scientific pipelines are all converging on production-grade evaluation. **Memory and long-context handling** for LLMs remains a dominant theme, with new architectures (ConvMem), lifecycle management (Fortunate Recall), and parameter-efficient designs (RiLM) addressing the same bottleneck from different angles. There is also notable work on **agentic reasoning with RL** (TRACE for causal exploration, multi-agent UAV wildfire response) and on **trustworthy deployment**—robustness benchmarks, unlearning, content moderation, and verifiable legal claim auditing round out the day.

---

## 📑 Key Papers

###  Agents & Reasoning

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [**Show-Harness: Just a VLM Agent Can Play Robots**](http://arxiv.org/abs/2609.10522v1) | Yanzhe Chen, Zechen Bai et al. | A compact semantic-interface harness lets a single VLM act as a robot controller, decoupling perception from action and avoiding task-specific fine-tuning. It advances the goal of plug-and-play foundation-model robotics. |
| [**JarvisGUI: Towards Cross-Device GUI Agents with Dynamic Task Composition**](http://arxiv.org/abs/2609.10451v1) | Zixiang Chen, Yuheng Lu et al. | Proposes a benchmark and framework for GUI agents operating across heterogeneous devices, requiring them to transfer state and coordinate workflows. Directly addresses a key gap in single-device GUI evaluations. |
| [**TRACE: Training Reasoning Agents for Causal Exploration with Synthesized Rewards**](http://arxiv.org/abs/2609.10315v1) | Rui Sun, Zhan Shi et al. | Extends RLVR-style training to diagnostic/causal reasoning by synthesizing verifiable reward signals, where ground truth is otherwise expensive. A step toward language agents that perform structured exploration, not just math/code. |
| [**Avatar: Toward Autonomous End-to-End Orchestration of Scientific Workflows using LLMs**](http://arxiv.org/abs/2609.10509v1) | Suman Raj, Hai Duc Nguyen et al. | An LLM-driven orchestration layer for scientific WMSs with bounded-risk agentic reasoning, replacing hand-tuned rules. Clarifies *where* agentic reasoning actually helps in complex HPC workflows. |
| [**Glyph: A Multi-Strategy Agentic System for Column Description and Sensitivity-Ontology Tagging**](http://arxiv.org/abs/2609.10430v1) | Kostia Kudriavtsev, Parvez Rafi et al. | A production multi-agent system that auto-documents enterprise data lakes with multi-strategy coordination. Demonstrates practical scaling of agentic design in real governance pipelines. |
| [**PACE: Perceived-Latency-Aware Cascading Service Routing for Retrieval-Augmented Dialogue**](http://arxiv.org/abs/2609.10372v1) | Lin Huang, Yujuan Tan et al. | A QoE-aware routing and filler-control framework for retrieval-augmented dialogue serving that jointly optimizes perceived time-to-first-response and quality. Relevant to deploying agents and assistants under tight latency budgets. |

### 🧠 Large Language Models

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [**ConvMem: Convolutional Memory for Long-Context Reasoning**](http://arxiv.org/abs/2609.10441v1) | Hongming Zhang, Zhaozhen Gu et al. | A convolutional memory layer lets LLMs iteratively compress and reread long streams while keeping inference cost bounded. Improves over prior segment-readers by exploiting sequential structure in memory updates. |
| [**Forgetting Only What Matters: Layer-Selective Unlearning toward Robust LLMs**](http://arxiv.org/abs/2609.10439v1) | Ravi Ranjan, Olivera Kotevska et al. | Targets machine unlearning at specific transformer layers rather than the full model, preserving utility while removing sensitive/memorized content. A more surgical alternative to broad unlearning heuristics. |
| [**Building Multilingual Bridges: Data Mixing for In-Language Reasoning**](http://arxiv.org/abs/2609.10445v1) | Mehrnaz Mofakhami, Ananya Sahu et al. | Shows that data-mixing ratios are the primary lever for unlocking non-English reasoning, which currently collapses to English even for non-English prompts. Directly addresses equity of access to reasoning models. |
| [**RiLM: Parameter-Efficient Language Modeling via Geodesic Decoding**](http://arxiv.org/abs/2609.10305v1) | Fang Li | A Riemannian decoding scheme that shrinks the dominant output matrix in sub-1M-parameter LMs, freeing capacity for the rest of the model. Targets edge deployment and reproducible small-model research. |
| [**Fortunate Recall: Ontology-Driven Memory Lifecycle Management for Persistent Coherence**](http://arxiv.org/abs/2609.10413v1) | Ansuman Mullick, Eray Tüzün | Treats LLM memory as a typed lifecycle problem—persist, replace, decay conditioned on fact type—rather than as an undifferentiated append-only store. Crucial for long-running assistants that must avoid unbounded growth and stale facts. |
| [**GANDR: Claim Auditing for Verifiable Legal Answer Generation**](http://arxiv.org/abs/2609.10293v1) | Chen Qian, Yimeng Wang et al. | Audits each *individual claim* of a generated legal answer against cited sources, rather than scoring the answer holistically. Raises the bar for grounded generation in high-stakes domains. |

### 🔧 Methods & Frameworks

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [**IdeaAMBIG: Benchmarking Implementation-Critical Gaps in Research-Idea Specifications**](http://arxiv.org/abs/2609.10539v1) | Yiling Ma, Yilun Zhao et al. | Diagnoses where research-idea writeups leave critical implementation choices underspecified, and benchmarks codification readiness. A timely audit tool as LLM research-idea agents proliferate. |
| [**IBIB: A Protocol for Measuring Enterprise AI Systems by Serving Route, Not Model Identifier**](http://arxiv.org/abs/2609.10494v1) | Blake Stenstrom, Charangan Vasantharajan et al. | Argues that 18 current benchmarks systematically mis-measure enterprise systems by scoring model IDs instead of the full serving stack (precision, harness, route). A deployment-first measurement protocol. |
| [**One Loop, Two Gains: Can Active Learning win the Lottery for Free?**](http://arxiv.org/abs/2609.10311v1) | Benedikt Tscheschner, Eduardo Veas et al. | Shows that active learning can jointly discover lottery-ticket subnetworks and improve accuracy in the same pruning loop, eliminating an extra fine-tuning stage. A practical efficiency gain for sparse training. |
| [**Training Trajectories Determine Circuit Removability in Annealable Soft-Prior Transformers**](http://arxiv.org/abs/2609.10287v1) | Zonglin Yang, Ziming Zhao et al. | Demonstrates that *when* you anneal soft positional priors—not just *whether*—governs whether learned retrieval circuits survive the prior's removal. Important for mechanistic interpretability and modular training. |

###  Applications

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [**Multi-Agent Reinforcement Learning for Autonomous UAV Exploration in Wildfire Response**](http://arxiv.org/abs/2609.10433v1) | Caden Chandra, Jerry Ng | A deep RL framework for coordinated UAV surveillance in simulated wildfire environments, demonstrating convergent, stable multi-agent behaviors. Concrete evidence that MARL is viable for safety-critical monitoring. |
| [**Rosetta at AlexandriaX-2026: LoRA-Adapted NileChat for Dialectal Arabic Dialogue**](http://arxiv.org/abs/2609.10395v1) | Nada Esmaeil, Fathima Rena et al. | A LoRA-tuned 3B model that handles context-aware English→Dialectal Arabic translation in both constrained and unconstrained tracks. Showcases efficient adaptation for low-resource dialects. |
| [**On-Policy Distillation for VLM Adaptation on Low-Quality Multimodal Data**](http://arxiv.org/abs/2609.10321v1) | Hongyuan Zhang, Xianda Guo et al. | Replaces uniform teacher-signal distillation with an on-policy, sample-adaptive training target, robust to noisy multimodal data. Directly targets a common bottleneck when adapting VLMs to real-world inputs. |
| [**A traffic management system for large and heterogeneous vehicles in narrow industrial environments**](http://arxiv.org/abs/2609.10400v1) | Alessandro Bonetti, Silvia Proia et al. | A multi-agent coordination system for AGVs in dense Logistics 4.0 settings, avoiding negotiation-based priority bottlenecks. Practical robotics + multi-agent systems deployment contribution. |

---

##  Research Trend Signal

Three convergent directions stand out in today's submissions. **First, agents are being stress-tested in production-shaped settings** — cross-device GUIs, scientific workflow orchestrators, enterprise data catalogs, and robot control all emphasize *where* agentic reasoning helps and how to bound its risk. **Second, memory and context management** for LLMs is fragmenting into specialized subfields: long-context architectures, lifecycle-aware stores, parameter-efficient small LMs, and semantic decoding each tackle the same scaling wall. **Third, deployment-time trustworthiness is becoming a first-class research target**, with claim-level auditing for legal outputs, layer-selective unlearning, enterprise-serving-route benchmarking, and contamination-resistant time-series evaluation together signaling a shift from capability to *measurable reliability*. RL is increasingly applied beyond games—wildfire response and particle-physics searches—while benchmark audits (IdeaAMBIG, IBIB) hint at growing skepticism toward leaderboard-driven evaluation.

---

##  Worth Deep Reading

1. [**Show-Harness: Just a VLM Agent Can Play Robots**](http://arxiv.org/abs/2609.10522v1) — A clean, well-motivated design that likely has outsized influence on embodied-VLM research; the semantic-interface framing is broadly applicable beyond robotics.
2. [**TRACE: Training Reasoning Agents for Causal Exploration with Synthesized Rewards**](http://arxiv.org/abs/2609.10315v1) — Generalizes RLVR to domains without cheap verifiers, which is precisely where most real-world reasoning agents will need to operate.
3. [**ConvMem: Convolutional Memory for Long-Context Reasoning**](http://arxiv.org/abs/2609.10441v1) — A simple architectural idea with clear empirical wins that could be adopted across the long-context literature; worth studying for the design rationale and ablations.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*