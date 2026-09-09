# ArXiv AI Research Digest 2026-09-10

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG, cs.MA) | 50 papers | Generated: 2026-09-09 23:30 UTC

---

# ArXiv AI Research Digest — 2026-09-10

## 📌 Today's Highlights

Today's submissions reveal a strong convergence on **agent infrastructure and self-improvement**: multiple papers target the procedural scaffolding around LLM agents (procedural graphs, harness co-evolution, memory clearance, tool-use data synthesis) rather than the base model itself, signaling that the field views the agent loop as the new optimization surface. A second axis is **test-time and on-policy learning**: papers on zero-rollout difficulty priors, entropy-regularized TTRL for code, and value-iteration self-play suggest a maturing toolkit for letting models improve at inference without expensive retraining. Finally, mechanistic interpretability moves toward autonomy with SAE-driven research agents, while interpretability of training-stage checkpoints (Good Pretraining, Bad SFT) and reasoning pathologies (sycophancy, attention sinks, audit-instrument effects) point to a renewed focus on the *training and evaluation pipeline* itself.

---

## 🧠 Large Language Models

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Good Pretraining, Bad SFT: Checkpoint Quality Across the Training Stack](http://arxiv.org/abs/2609.08966v1) | Sohir Maskey, Philipp Scholl, Jonas Knupp et al. | Demonstrates in a 30B MoE pipeline that the best pretraining-loss checkpoint is not necessarily the best SFT starting point, challenging a widely held assumption in model selection. Highlights the need for stage-aware checkpoint selection. |
| [Learning Length-Extrapolatable Recurrent Models](http://arxiv.org/abs/2609.09157v1) | Hanwen Jiang | Argues that per-token dense losses, rather than vanishing gradients, drive recurrent models' failure beyond training horizons, and proposes remedies for true length extrapolation. Relevant for any long-context recurrent architecture. |
| [It's Not RoPE that Creates Sinks: The Role of Self-Concentration and Value-Non-Mixing in Attention](http://arxiv.org/abs/2609.09085v1) | Raito Kiya, Satoki Ohashi, Kosuke Sato et al. | Disentangles the causal factors behind attention sinks and massive activations, attributing them to value dynamics rather than positional encoding, with implications for low-bit quantization. |
| [Training-Free Task Vectors for LLM Behavioral Control](http://arxiv.org/abs/2609.09054v1) | Gabriel J. Perin, Lucas Boscaini, André Araujo et al. | Extracts semantically meaningful task vectors without fine-tuning, enabling cheap post-training behavioral edits and lowering the cost of model steering. |
| [Everything in Moderation: Per-Domain Coverage Optima and Alignment-Resistant Domain Gaps in Multi-Domain Mid-Training](http://arxiv.org/abs/2609.09081v1) | Yunpeng Xu, Kun Zheng | Shows that mid-training data-composition choices leave domain gaps that alignment cannot fully erase, arguing for principled mid-training design in a controlled logical-reasoning setting. |
| [Measuring LLM Sycophancy under Sustained Multi-Turn Pressure](http://arxiv.org/abs/2609.09090v1) | Leyuan Tang, Kangda Wei, Tianyu Jiang et al. | Introduces SPINE, a protocol for measuring sycophancy under adaptive multi-turn disagreement, exposing failure modes missed by single-turn evaluations. |

## 🤖 Agents & Reasoning

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Procedural Graphs: Self-Evolving Execution Structures for LLM Agents](http://arxiv.org/abs/2609.09153v1) | Yuxing Lu, Yicheng Chen, Shanchan Wu et al. | Replaces unconstrained action generation with explicit, evolving procedural graphs that capture ordering and conditions, giving long-horizon agents a learnable execution substrate. |
| [Co-Evolving Harnesses and Models: On-Policy Correction Helps Weaker Models Catch Up Where Imitation Fails](http://arxiv.org/abs/2609.09134v1) | Zhou Yu, Bin Bi, Shiva Kumar Pentyala et al. | Shows that jointly optimizing the agent harness and the model with on-policy corrections lets smaller models rival frontier models on domain tasks, reframing harness design as a first-class optimization target. |
| [MeClear: Cooperative Game-Theoretic Attribution and Risk-Aware Memory Clearance for Long-Horizon LLM Agents](http://arxiv.org/abs/2609.09115v1) | Boyu Yang, Jiazheng Sun, Zilong Lu et al. | Uses cooperative game theory to score memory entries by downstream utility and prune misleading ones, addressing a core reliability bottleneck for long-horizon agents. |
| [SAEScientist-Bench: Can AI Agents Conduct Autonomous SAE Interpretability Research?](http://arxiv.org/abs/2609.09113v1) | Yuqiao Tan, Shizhu He, Jun Zhao et al. | Benchmarks autonomous agents on Sparse Autoencoder interpretability research, positioning RSI as requiring not just training automation but audit-and-monitoring automation. |
| [PlannerForge: LLM Agents for Scenario-Based Testing of Motion Planners in Autonomous Driving](http://arxiv.org/abs/2609.08965v1) | Yuan Gao, Sebastian Müller, Mattia Piccinari et al. | Unifies the fragmented scenario-based-testing pipeline (generation, retrieval, execution, analysis) under an LLM-agent framework for safer autonomous-driving validation. |
| [ToolLoop: Closed-Loop Tool-Use Data Synthesis via Decomposed Generation and Dynamic Self-Feedback](http://arxiv.org/abs/2609.09072v1) | Min Zeng, Yuzhou Liu, Zhenyu Cao et al. | Replaces static generate-then-filter pipelines with decomposed generation and dynamic self-feedback, producing higher-quality, better-balanced tool-use training data. |
| [Copying explains the collective behavior of AI agents in the wild](http://arxiv.org/abs/2609.09150v1) | Giordano De Marzo, Nicola Alboré, David Garcia | Models emergent cooperation among thousands of short-lived agents editing a shared wiki via simple copying dynamics, offering a statistical-mechanics account of in-the-wild multi-agent behavior. |

## 🔧 Methods & Frameworks

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Silver Rate Is (Almost) Optimal for Gradient Descent Acceleration](http://arxiv.org/abs/2609.09152v1) | Yuhan Ye, Kaizhao Liu | Proves a near-tight non-anytime lower bound matching the silver-rate convergence of predetermined-stepsize GD on smooth convex problems, closing a long-standing theoretical gap. |
| [Entropy-Regularized Rank-Masked Policy Optimization for Test-Time Reinforcement Learning in Code Generation](http://arxiv.org/abs/2609.09135v1) | Jiacheng Xu, Feng Chen, Xiuneng Xu et al. | Extends test-time RL to code by replacing answer-level self-voting with rank-masked, entropy-regularized rewards that work over executable programs rather than surface forms. |
| [ThinkPrior: Zero-Rollout Difficulty Priors for Cold-Start Prompt Selection in RLVR](http://arxiv.org/abs/2609.09075v1) | Tommy Sha, Skylar Zhai, Siqi Zhao | Pre-filters prompts for GRPO/RLVR using zero-rollout difficulty estimates to avoid zero-advantage groups, improving sample efficiency at cold start. |
| [The Surprising Effectiveness of Approximate Value Iteration in Self-Play](http://arxiv.org/abs/2609.09094v1) | Raphael Boige, Amine Boumaza, Bruno Scherrer | Argues that approximate value iteration rivals MCTS-based self-play with substantially less compute, suggesting a lighter paradigm for competitive game-playing agents. |
| [Transformers as In-Context Samplers: From Closed-Form Diffusion to Estimation-Free Sampling](http://arxiv.org/abs/2609.08981v1) | Arman Adibi, Alireza Jafari, Mohammad Ghavamzadeh et al. | Bridges closed-form diffusion sampling and in-context learning, showing transformers can implement estimation-free samplers from prompted examples alone. |

## 📊 Applications

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [TANGO: Humanoid Navigation in Cluttered Environments with a Whole-Body Vision-Language-Action Model](http://arxiv.org/abs/2609.09158v1) | Anqi Li, Yuxin Chen, Zhaobo Li et al. | Moves humanoid navigation from 2D path planning to geometry-aware whole-body VLA control, enabling coordinated arm–leg behaviors in cluttered indoor scenes. |
| [DeCAL: Towards Physically-Grounded Dexterous VLA Models via Contact-Aware Latent Co-Imagination](http://arxiv.org/abs/2609.09119v1) | Yankai Fu, Ning Chen, Junkai Zhao et al. | Tackles dexterous manipulation under occlusion by co-imagining tactile and visual latents in a contact-aware space, improving VLA performance on contact-rich tasks. |
| [Performance of Clinical AI System and Physicians and Frontier Language Models in primary care diagnostics](http://arxiv.org/abs/2609.09070v1) | Andy Nkansah, Hanna Plotnitskaya, Stanislau Salavei et al. | In 150 synthetic Polish-language primary-care cases, the clinical AI "Doctorina" achieved 82.0% Top-1 diagnostic concordance, materially outperforming physicians and standalone frontier LLMs. |

---

## 📈 Research Trend Signal

The dominant signal today is the **"agent as a system" turn**: rather than scaling base models, researchers are optimizing the harness, execution graph, memory, and tool-use data around them (#4, #11, #18, #28, #47). Concurrently, **test-time and on-policy adaptation** is consolidating into a recognizable subfield with reusable primitives—difficulty priors (#27), rank-masked code rewards (#10), value-iteration self-play (#21), and in-context samplers (#43)—all aimed at getting more capability from less retraining. A third thread is **honest evaluation under realistic pressure**: sycophancy under sustained pushback (#22), audit-instrument effects on bias (#34), checkpoint quality across the training stack (#46), and mechanistic-interpretability-as-a-benchmark (#19) collectively argue for richer, process-level measurement rather than endpoint accuracy. Together these trends suggest the center of gravity in 2026 is shifting from "bigger pretraining" to "better scaffolding, inference adaptation, and auditing."

---

## 📚 Worth Deep Reading

1. **[Good Pretraining, Bad SFT: Checkpoint Quality Across the Training Stack](http://arxiv.org/abs/2609.08966v1)** — A full-scale 30B MoE study that overturns a routine assumption in model development; likely to change checkpoint-selection practice across the industry.
2. **[Co-Evolving Harnesses and Models: On-Policy Correction Helps Weaker Models Catch Up Where Imitation Fails](http://arxiv.org/abs/2609.09134v1)** — Reframes harness design as a co-optimization problem with the model, with concrete implications for cost-efficient domain deployment of smaller LLMs.
3. **[Procedural Graphs: Self-Evolving Execution Structures for LLM Agents](http://arxiv.org/abs/2609.09153v1)** — A principled alternative to unconstrained action generation that could become a foundational primitive for long-horizon, tool-using agents.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*