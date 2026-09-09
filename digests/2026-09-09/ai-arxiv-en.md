# ArXiv AI Research Digest 2026-09-09

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG, cs.MA) | 50 papers | Generated: 2026-09-09 11:30 UTC

---

# ArXiv AI Research Digest — 2026-09-09

## 1. Today's Highlights

Today's submissions reveal a strong push toward **agentic infrastructure** — multiple papers (Procedural Graphs, ExecCritic, MeClear, SAEScientist-Bench) target the procedural memory, evaluation harnesses, and self-correction loops needed for reliable long-horizon LLM agents. **Reasoning analysis** is also maturing beyond end-point accuracy: Answer-Distribution Trajectories and Deposon both propose ledger-style views of chain-of-thought paths. On the **RL/optimization front**, a tight lower bound on gradient descent acceleration (the "silver rate") and an empirical case for value-iteration over MCTS in self-play signal a shift back to classical convex-analysis tools. **LLM training** is being re-examined — the "Good Pretraining, Bad SFT" paper challenges the assumption that the best pretraining checkpoint remains best post-finetune, and training-free task vectors propose a cheaper alternative to weight-space editing.

---

## 2. Key Papers

### 🧠 Large Language Models

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [ReCite: Agentic Reasoning for Faithful Citation](http://arxiv.org/abs/2609.09156v1) | Yuyang Huang, Bobo Li, Jiajia Song et al. | An agentic pipeline that grounds citation recommendations in verified passages rather than surface-level retrieval, addressing hallucinated references that plague modern recommenders. Matters because citation accuracy is foundational for scholarly use of LLMs. |
| [Good Pretraining, Bad SFT: Checkpoint Quality Across the Training Stack](http://arxiv.org/abs/2609.08966v1) | Sohir Maskey, Philipp Scholl, Jonas Knupp et al. | Shows in a 30B MoE pipeline that the lowest-pretraining-loss checkpoint is *not* the best launchpoint for downstream SFT, breaking a widely held assumption. Directly impacts how labs should select intermediate checkpoints. |
| [Training-Free Task Vectors for LLM Behavioral Control](http://arxiv.org/abs/2609.09054v1) | Gabriel J. Perin, Lucas Boscaini, André Araujo et al. | Discovers task-vector-like directions in weight space *without* fine-tuning, enabling cheap post-hoc behavioral editing. Materially lowers the cost of model customization at inference time. |
| [Measuring LLM Sycophancy under Sustained Multi-Turn Pressure](http://arxiv.org/abs/2609.09090v1) | Leyuan Tang, Kangda Wei, Tianyu Jiang et al. | Introduces SPINE, an adaptive benchmark that exposes sycophantic collapse in LLMs under long, adversarial conversations missed by short, scripted tests. Important for deployment in user-facing assistants. |
| [It's Not RoPE that Creates Sinks: Self-Concentration and Value-Non-Mixing](http://arxiv.org/abs/2609.09085v1) | Raito Kiya, Satoki Ohashi, Kosuke Sato et al. | Refutes the popular attribution of attention sinks to rotary embeddings, identifying self-concentration and value-mixing as the true mechanisms. Clarifies a recurring pathology that complicates low-bit quantization. |
| [Image Tokenizers as Visual Languages in Unified Multimodal Models](http://arxiv.org/abs/2609.09143v1) | Siting Li, Zhengyang Wang, Simon Shaolei Du et al. | Treats visual tokenizers as a "visual language" and benchmarks them jointly with text modeling rather than in isolation. Provides a more faithful yardstick for unified multimodal architectures. |

### 🤖 Agents & Reasoning

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [TANGO: Humanoid Navigation with a Whole-Body Vision-Language-Action Model](http://arxiv.org/abs/2609.09158v1) | Anqi Li, Yuxin Chen, Zhaobo Li et al. | Moves humanoid navigation from 2D path planning to geometry-aware whole-body VLA control with coordinated arms and torso. Bridges the gap between VLAs built for tabletop tasks and real cluttered spaces. |
| [Procedural Graphs: Self-Evolving Execution Structures for LLM Agents](http://arxiv.org/abs/2609.09153v1) | Yuxing Lu, Yicheng Chen, Shanchan Wu et al. | Externalizes agentic procedural knowledge into an evolving graph rather than implicit history, letting agents reuse and refine successful sub-procedures. Targets the well-known brittleness of unconstrained generation over long horizons. |
| [ExecCritic: Learn to Test, Test to Improve for Coding Agents](http://arxiv.org/abs/2609.09133v1) | Leitian Tao, Baolin Peng, Haorui Wang et al. | Decouples test generation from patch generation and trains a critic over execution feedback to break the cycle of mutually reinforcing errors. Yields more faithful self-repair on real repository issues. |
| [SAEScientist-Bench: Can AI Agents Conduct Autonomous SAE Interpretability Research?](http://arxiv.org/abs/2609.09113v1) | Yuqiao Tan, Shizhu He, Jun Zhao et al. | Benchmarks whether agents can perform end-to-end mechanistic interpretability research on sparse autoencoders, a missing pillar of recursive self-improvement. Connects agent capability directly to model safety auditing. |
| [Answer-Distribution Trajectories: A Stochastic-Dynamics View of LLM Reasoning](http://arxiv.org/abs/2609.09030v1) | Mar Gonzàlez I Català, Haitz Sáez de Ocáriz Borde, Davide Murari et al. | Models chain-of-thought as a stochastic process over answer distributions rather than a single terminal output, generalizing entropy-profile analyses. Enables richer evaluation and diagnosis of reasoning paths. |
| [Co-Evolving Harnesses and Models: On-Policy Correction Helps Weaker Models Catch Up](http://arxiv.org/abs/2609.09134v1) | Zhou Yu, Bin Bi, Shiva Kumar Pentyala et al. | Demonstrates that jointly evolving the agent harness with on-policy RL lets smaller models close the gap with frontier models where pure imitation stalls. Offers a cost-reduction lever for enterprise agents. |
| [MeClear: Cooperative Game-Theoretic Attribution for Long-Horizon LLM Agents](http://arxiv.org/abs/2609.09115v1) | Boyu Yang, Jiazheng Sun, Zilong Lu et al. | Replaces semantic retrieval with utility-aware memory clearance using Shapley-style attribution to evict outdated or misleading entries. Targets a key failure mode in persistent agentic systems. |
| [PlannerForge: LLM Agents for Scenario-Based Testing of Motion Planners](http://arxiv.org/abs/2609.08965v1) | Yuan Gao, Sebastian Müller, Mattia Piccinadi et al. | LLM agents unify scenario generation, retrieval, modification, and analysis for ADS safety validation. Reduces fragmentation in autonomous-driving test pipelines. |
| [ToolLoop: Closed-Loop Tool-Use Data Synthesis via Decomposed Generation and Dynamic Self-Feedback](http://arxiv.org/abs/2609.09072v1) | Min Zeng, Yuzhou Liu, Zhenyu Cao et al. | Replaces static generate-then-filter with a closed-loop synthesizer that dynamically adjusts feature balance via self-feedback. Produces more usable tool-use training data than current pipelines. |

### 🔧 Methods & Frameworks

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Silver Rate Is (Almost) Optimal for Gradient Descent Acceleration](http://arxiv.org/abs/2609.09152v1) | Yuhan Ye, Kaizhao Liu | Proves a near-tight Ω(n^{-p_sil}) non-anytime lower bound for GD with predetermined stepsizes, showing prescribed schedules cannot beat the silver rate in the worst case. Closes a long-standing gap in convex optimization theory. |
| [The Surprising Effectiveness of Approximate Value Iteration in Self-Play](http://arxiv.org/abs/2609.09094v1) | Raphael Boige, Amine Boumaza, Bruno Scherrer | Shows that simple approximate value iteration can match or beat MCTS-based self-play in several game benchmarks at a fraction of compute. Argues that the community may be over-investing in search. |
| [Curriculum Learning as Transport: Wasserstein Geodesics](http://arxiv.org/abs/2609.09099v1) | Changho Shin, David Alvarez-Melis | Reframes curriculum design as optimal-transport over difficulty distributions, providing a principled geometry for ordering and pacing data. Decouples curriculum *structure* from any single difficulty metric. |
| [Transformers as In-Context Samplers: Estimation-Free Sampling](http://arxiv.org/abs/2609.08981v1) | Arman Adibi, Alireza Jafari, Mohammad Ghavamzadeh et al. | Extends in-context learning theory to show transformers can act as samplers from implicitly defined distributions without explicit density estimation. Strengthens the bridge between diffusion-style sampling and ICL. |
| [Deposon: Game-Theoretic Scattering Layer over LLM Reasoning Paths](http://arxiv.org/abs/2609.09001v1) | Qihao Yuan | Binds each node of a reasoning graph to a two-parameter Deposon state with three-channel scattering, yielding a machine-recheckable ledger of discarded paths. Provides a cryptographic-flavored audit trail for multi-step reasoning. |

### 📊 Applications

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [DeCAL: Dexterous VLA Models via Contact-Aware Latent Co-Imagination](http://arxiv.org/abs/2609.09119v1) | Yankai Fu, Ning Chen, Junkai Zhao et al. | Augments VLA policies with tactile sensing and a latent "co-imagination" module that reasons over occluded contacts. Pushes dexterous manipulation into genuinely contact-rich tasks. |
| [SQLMorph: Query Mutation and Fine-Grained Metrics for Text-to-SQL](http://arxiv.org/abs/2609.08950v1) | Mohammadhossein Malekpour, Mohamed Riahi, Maxime Lamothe et al. | Introduces SQL-level mutation operators and sub-metric scoring to evaluate Text-to-SQL systems beyond execution accuracy. Addresses the well-known gap between public benchmarks and enterprise schemas. |
| [GraphFAS: Distributed Graph Feature Generation for Industrial Fraud Networks](http://arxiv.org/abs/2609.08970v1) | Yice Luo, Yun Zhu, Xi Chen et al. | A distributed system that automates graph feature engineering while preserving the interpretability required by financial risk control. Bridges GNN performance and regulatory deployability. |

---

## 3. Research Trend Signal

Two converging directions dominate today's submissions. **First, agent robustness is being attacked at its foundations**: procedural memory (Procedural Graphs), memory hygiene (MeClear), test-patch disentanglement (ExecCritic), and harness-model co-evolution each address a different way today's agents fail, suggesting the field has moved past "can an agent do X?" to "why does it break on X?". **Second, reasoning is being treated as a first-class dynamical object** rather than a final answer — Answer-Distribution Trajectories, Deposon, and the sycophancy benchmark all build trajectory- or ledger-level views of LLM behavior. A quieter but important thread is the re-evaluation of long-standing assumptions: the silver-rate lower bound for GD, the surprising competitiveness of value iteration over MCTS, and the failure of pretraining-loss as an SFT launchpoint each signal a healthy back-to-basics moment in optimization and training practice.

---

## 4. Worth Deep Reading

- **[Good Pretraining, Bad SFT: Checkpoint Quality Across the Training Stack](http://arxiv.org/abs/2609.08966v1)** — A rare full-pipeline (30B MoE) ablation that contradicts how every major lab currently selects checkpoints. Reading it carefully likely reshapes pretraining-to-finetuning handoff strategy.
- **[Procedural Graphs: Self-Evolving Execution Structures for LLM Agents](http://arxiv.org/abs/2609.09153v1)** — The clearest articulation yet of how to make agents *durable* rather than one-shot. The conceptual move from implicit history to evolving procedural graph is broadly applicable beyond LLM agents.
- **[Silver Rate Is (Almost) Optimal for Gradient Descent Acceleration](http://arxiv.org/abs/2609.09152v1)** — A sharp theoretical result with practical implications: prescribed schedule designers should treat the silver rate as a near-fundamental limit, redirecting effort toward anytime or adaptive variants.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*