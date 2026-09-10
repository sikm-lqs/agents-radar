# ArXiv AI Research Digest 2026-09-10

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG, cs.MA) | 50 papers | Generated: 2026-09-10 11:30 UTC

---

# ArXiv AI Research Digest — September 10, 2026

## 1. Today's Highlights

Today's submissions reveal three dominant trajectories. First, **agentic systems are maturing from demos to production**: Avatar demonstrates LLM-driven end-to-end orchestration of scientific workflows, while JarvisGUI tackles cross-device GUI automation and Glyph deploys multi-strategy agents for enterprise data catalogs. Second, **reasoning and memory architectures are evolving** — ConvMem introduces convolutional memory for long-context LLMs, Fortunate Recall proposes ontology-driven lifecycle management, and TRACE advances diagnostic causal reasoning via RL with synthesized rewards. Third, **benchmarking and reliability** are getting serious attention: IdeaAMBIG exposes gaps in research-idea specifications, IBIB challenges model-identifier-based benchmarking, and cross-model agreement is reframed as a deployment-time reliability signal for medical segmentation.

---

## 2. Key Papers

### 🧠 Large Language Models

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [IdeaAMBIG: Benchmarking Implementation-Critical Gaps in Research-Idea Specifications](http://arxiv.org/abs/2609.10539v1) | Yiling Ma, Yilun Zhao, Sihong Wu et al. | Formalizes "codification readiness" of research methods, showing that even novel, plausible proposals often remain underspecified for faithful implementation — exposes a reproducibility bottleneck in LLM-assisted science. |
| [Building Multilingual Bridges: Data Mixing as the Pillar of Generalization for In-Language Reasoning](http://arxiv.org/abs/2609.10445v1) | Mehrnaz Mofakhami, Ananya Sahu, Alejandro R. Salamanca et al. | Identifies that reasoning models default to English regardless of prompt language, and demonstrates that data-mixing strategies are pivotal for preserving reasoning quality in non-English settings. |
| [Forgetting Only What Matters: Layer-Selective Unlearning toward Robust LLMs](http://arxiv.org/abs/2609.10439v1) | Ravi Ranjan, Olivera Kotevska, Agoritsa Polyzou | Moves beyond broad or fixed-parameter unlearning by targeting specific layers, reducing collateral damage to general capability while scrubbing sensitive or copyrighted content. |
| [RiLM: Parameter-Efficient Language Modeling via Geodesic Decoding](http://arxiv.org/abs/2609.10305v1) | Fang Li | Tackles sub-million-parameter edge deployment by replacing the dominant output matrix with geodesic decoding — meaningful compression for domain adaptation and reproducible research. |
| [On-Policy Distillation for Vision-Language Model Adaptation on Low-Quality Multimodal Data](http://arxiv.org/abs/2609.10321v1) | Hongyuan Zhang, Xianda Guo, Yanlun Peng et al. | Shows that uniform training targets from a teacher are suboptimal for noisy multimodal data, and proposes sample-adaptive on-policy distillation for robust student learning. |

### 🤖 Agents & Reasoning

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Show-Harness: Just a VLM Agent Can Play Robots](http://arxiv.org/abs/2609.10522v1) | Yanzhe Chen, Zechen Bai, Zhijun Cao et al. | Introduces a compact semantic harness that lets off-the-shelf VLMs drive robots without bespoke control stacks — lowering the barrier between foundation-model intelligence and embodied action. |
| [Avatar: Toward Autonomous End-to-End Orchestration of Scientific Workflows using LLMs](http://arxiv.org/abs/2609.10509v1) | Suman Raj, Hai Duc Nguyen, Haochen Pan et al. | Investigates where to insert agentic reasoning in workflow management systems, with explicit bounds on risk and empirical evidence on when LLM orchestration actually outperforms fixed rules. |
| [JarvisGUI: Towards Cross-Device GUI Agents with Dynamic Task Composition](http://arxiv.org/abs/2609.10451v1) | Zixiang Chen, Yuheng Lu, Zihao Cheng et al. | Surfaces the underexplored cross-device workflow problem (state transfer, platform heterogeneity) and proposes dynamic task composition to coordinate GUI agents across devices. |
| [Glyph: A Multi-Strategy Agentic System for Column Description and Sensitivity-Ontology Tagging of Enterprise Data Catalogs](http://arxiv.org/abs/2609.10430v1) | Kostia Kudriavtsev, Parvez Rafi, Sha Sundaram | Production-grade multi-strategy agents that automate documentation debt in enterprise data lakes by generating column descriptions and assigning governance labels. |
| [TRACE: Training Reasoning Agents for Causal Exploration with Synthesized Rewards](http://arxiv.org/abs/2609.10315v1) | Rui Sun, Zhan Shi, Bing He et al. | Extends RLVR-style training to diagnostic causal reasoning, where ground-truth labels are costly, by synthesizing reward signals — opening RL-driven reasoning beyond math/code. |
| [Fortunate Recall: Ontology-Driven Memory Lifecycle Management for Persistent Coherence in LLMs](http://arxiv.org/abs/2609.10413v1) | Ansuman Mullick, Eray Tüzün | Argues that LLM memory systems fail because they treat all facts identically; proposes behavior-type-conditional lifecycle management to bound store growth and preserve retrieval precision. |
| [Multi-Agent Reinforcement Learning for Autonomous UAV Exploration in Wildfire Response](http://arxiv.org/abs/2609.10433v1) | Caden Chandra, Jerry Ng | Trains UAV agents via deep RL to monitor simulated wildfire environments, with converging loss and improved coverage behaviors — concrete multi-agent RL deployment in safety-critical settings. |
| [Learning Intrusion Response Strategies for OT Systems](http://arxiv.org/abs/2609.10298v1) | Duc Huy Le, Rolf Stadler | Formal RL framework for learning automated intrusion-response policies against operational technology, addressing an increasingly important real-world decision-making loop. |

### 🔧 Methods & Frameworks

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [IBIB: A Protocol for Measuring Enterprise AI Systems by Serving Route, Not Model Identifier](http://arxiv.org/abs/2609.10494v1) | Blake Stenstrom, Charangan Vasantharajan, Brian Sathianathan | Treats the disconnect between advertised model checkpoints and deployed capabilities as measurement error, and provides a protocol that scores deployed systems end-to-end. |
| [ConvMem: Convolutional Memory for Long-Context Reasoning](http://arxiv.org/abs/2609.10441v1) | Hongming Zhang, Zhaozhen Gu, Fengshuo Bai et al. | Replaces fixed-size memory vectors with convolutional updates for segmented long-context reading, reducing the information bottleneck that plagues sequential memory approaches. |
| [Beyond One-Size-Fits-All: Sample-Adaptive Strategy Routing for Vision Token Pruning in MLLMs](http://arxiv.org/abs/2609.10346v1) | Haiji Liang, Pengfei Zhou, Zhenglin Wan et al. | Challenges the assumption that a single pruning strategy fits all inputs and routes per-sample strategies to reduce MLLM inference cost without quality loss. |
| [Cross-Model Agreement as a Deployment-Time Reliability Signal for Automatic Polyp Segmentation](http://arxiv.org/abs/2609.10495v1) | Siddharth Gupta, Jitin Singla | Proposes RBQE, a reference-free quality estimation framework for medical segmentation that uses disagreement between independently trained models as an inference-time reliability signal. |
| [A positive resolution of the gap-entropy conjecture](http://arxiv.org/abs/2609.10529v1) | P. M. Aronow, Nathan Kallus, Patrick Lopatto | Proves the gap-entropy conjecture for fixed-confidence best-arm identification, tightening the theoretical characterization of bandit sample complexity. |

### 📊 Applications

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Semigroup-JEPA: Latent Dynamics Consistency for Zero-Shot Physics Generalization](http://arxiv.org/abs/2609.10464v1) | Andy Zeyi Liu, Haoran Sun, Lucas Baker et al. | Extends JEPA world models with semigroup-structured latent dynamics to enforce physical consistency, enabling zero-shot generalization across physics regimes. |
| [GANDR: Claim Auditing for Verifiable Legal Answer Generation](http://arxiv.org/abs/2609.10293v1) | Chen Qian, Yimeng Wang, Yu Chen et al. | Decomposes legal QA into per-claim verification against cited sources, exposing how whole-answer scoring can hide fabrication in high-stakes retrieval-augmented generation. |
| [Rosetta at AlexandriaX-2026: LoRA-Adapted NileChat for Context-Aware Dialectal Arabic Dialogue Translation](http://arxiv.org/abs/2609.10395v1) | Nada Esmaeil, Fathima Rena, Sibi Subhash et al. | A LoRA-tuned NileChat-3B with structured prompting for context-aware English-to-dialectal Arabic translation, illustrating efficient PEFT for low-resource dialectal tasks. |
| [Deep Learning-Based Detection of Electrical Faults and Power Quality Disturbances in Aerospace Power Systems](http://arxiv.org/abs/2609.10479v1) | Ian C. Guzmán, Radu Babiceanu, Berker Peköz | Hardware-aware deep learning for multiclass fault and power-quality detection on high-frequency More Electric Aircraft grids, where conventional 50/60 Hz methods fail. |
| [Cyber-Financial Contagion: Modeling the Propagation of an AI Vendor Compromise Through the Banking System](http://arxiv.org/abs/2609.10350v1) | Alex Leytes | Models how a compromise in a single shared AI vendor propagates across banks via fraud/AML/credit decisioning dependencies — a systems-level view of AI concentration risk. |

---

## 3. Research Trend Signal

A clear pattern emerges around **agentic reliability and orchestration**. Multiple papers (Avatar, JarvisGUI, Glyph, Show-Harness) move beyond single-turn agents toward persistent, multi-step systems that must coordinate across tools, devices, and time — each one surfaces a different failure mode (risk bounds, cross-device state, governance, embodiment). Concurrently, **reasoning beyond math/code** is opening up: TRACE's synthesized-reward RL for causal diagnostics, multilingual reasoning via data mixing, and logical-deduction frameworks for geometry all push RLVR-style training into domains where ground truth is expensive. On the benchmarking side, the field is acknowledging that **model identifiers are no longer the right unit of measurement** — IBIB, IdeaAMBIG, and cross-model agreement signals collectively argue for deployment-route-aware, reference-free evaluation. Finally, **memory and long-context architectures** are quietly consolidating around structured, typed, or compressed representations (ConvMem, Fortunate Recall, semantic-bottleneck speech decoding), suggesting the era of opaque vector stores is ending.

---

## 4. Worth Deep Reading

1. **[TRACE: Training Reasoning Agents for Causal Exploration with Synthesized Rewards](http://arxiv.org/abs/2609.10315v1)** — The most consequential methodological extension today. RLVR has been bottlenecked to domains with cheap verifiers; synthesized rewards for causal diagnostics could unlock RL-trained reasoning across medicine, science, and operations.

2. **[IBIB: A Protocol for Measuring Enterprise AI Systems by Serving Route, Not Model Identifier](http://arxiv.org/abs/2609.10494v1)** — A quiet but high-leverage reframing of evaluation. If the field adopts this, benchmark scores become meaningful again and the gap between leaderboards and deployed quality shrinks — directly relevant to anyone selecting or auditing models.

3. **[ConvMem: Convolutional Memory for Long-Context Reasoning](http://arxiv.org/abs/2609.10441v1)** — The convolutional-memory update is a simple, principled change to a hot problem. Likely to be replicated and extended quickly, and a useful template for thinking about structured memory beyond fixed-size vectors.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*