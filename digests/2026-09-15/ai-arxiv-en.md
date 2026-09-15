# ArXiv AI Research Digest 2026-09-15

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG, cs.MA) | 50 papers | Generated: 2026-09-15 11:30 UTC

---

# ArXiv AI Research Digest — 2026-09-15

---

## 1. Today's Highlights

Today's submissions paint a clear picture of where the field is heading: **agentic reasoning at scale** dominates the landscape, with several papers tackling long-horizon research (Stellar Colosseum), hypothesis discovery (HypoEvolve), and related-work generation (CREW). **Reinforcement learning for LLM reasoning** remains a hot vein, exemplified by Bellman Policy Optimization's critic-free derivation from Policy Mirror Descent. Equally notable is the rise of **safety, alignment, and verifiability** as first-class concerns — papers on misaligned agent authorization, backdoor attacks on world models, and citation-grounded clinical QA all push toward making autonomous systems trustworthy. Underneath these themes, foundational work on diffusion, transport models, and representation geometry continues to mature the methodological substrate.

---

## 2. Key Papers

### 🧠 Large Language Models

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [**Bellman Policy Optimization**](http://arxiv.org/abs/2609.15987v1) | Zhuoqing Song, Haotian Xu, Xikun Zhang et al. | Introduces a **critic-free RLVR method** derived from Policy Mirror Descent that uses only terminal rewards for autoregressive LLM generation. It matters because it eliminates the cost of training a value network while retaining strong reasoning improvements over PPO-style baselines. |
| [**Discovery Foundation Models**](http://arxiv.org/abs/2609.15973v1) | Ling Yang, Zhenfei Yin, Yingcheng Wu et al. | Argues the next LLM frontier is moving from solving human-specified problems to **participating in open-ended discovery**. The paper sketches a research agenda for foundation models that generate hypotheses, design experiments, and act as scientific collaborators. |
| [**Mind2Dialogue**](http://arxiv.org/abs/2609.15972v1) | Zixuan Wang, Yufan Zhou, Jinzhou Tang et al. | Addresses the **supervision gap in training human-aware LLMs** by simulating user mental states to generate interaction data. Important for long-term collaborative assistants where understanding the user's evolving mental context matters as much as task completion. |
| [**Inoculation Midtraining with Learned Neologisms**](http://arxiv.org/abs/2609.15886v1) | Kyle O'Brien, Edward James Young, Puria Radmard et al. | Proposes **midtraining as a control point** to shape which properties propagate from post-training into broader behavior. By teaching the base model to treat invented terms as "undesirable," the technique steers downstream generalization. |
| [**Learning to Coach for Experiential Learning**](http://arxiv.org/abs/2609.15851v1) | Guanheng Chen, Tianzhu Ye, Li Dong et al. | Trains a dedicated **LLM-as-a-Coach** to distills actionable lessons from an actor model's raw solution trajectories. Distills experiential knowledge into compact guidance, reducing wasted exploration in iterative self-improvement loops. |
| [**Look Before You Leap: Factual Decoding with Internal Attribution Signals**](http://arxiv.org/abs/2609.15745v1) | Hayeong Ryu, JungMin Yun, Byeonggeuk Lim et al. | **DescaPE** preempts hallucination snowballing by steering generation using internal attribution signals before early factual errors compound. A promising step beyond post-hoc correction toward inference-time hallucination prevention. |

### 🤖 Agents & Reasoning

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [**Stellar Colosseum**](http://arxiv.org/abs/2609.15983v1) | Honghao Lin, David P. Woodruff, Yuan Deng et al. | A **many-agent harness** that allocates inference across long-horizon mathematical and TCS research where short proofs are unreliable. It is model-agnostic and explicitly targets the multi-step, interdependent-decision regime where current LMs struggle. |
| [**The Router Within**](http://arxiv.org/abs/2609.15982v1) | Ruishuo Chen, Xun Wang, Yu Chen et al. | **Elicits native skill routing from a frozen LLM** instead of preloading skill metadata into context, which caps library size. The approach addresses a real scalability bottleneck in skill-augmented LLM agents. |
| [**HypoEvolve**](http://arxiv.org/abs/2609.15938v1) | Jieyuan Liu, Mengzhou Hu, Jefferson Chen et al. | Uses **genetic algorithms to drive multi-agent LLM collaboration** for scientific hypothesis discovery through critique, comparison, and revision. Provides a principled study of how different collaboration topologies affect hypothesis quality. |
| [**Delegating Authorization to Misaligned Agents**](http://arxiv.org/abs/2609.15803v1) | Natalie Collina, Surbhi Goel, Aaron Roth et al. | Formalizes **coalitional alignment and safe control** for long-running agents whose actions recursively shape future states. A theoretical contribution that defines when pre-approval of consequential actions is necessary for safety. |
| [**EvoOntology: A Self-Evolving Ontology Layer for Data Agents**](http://arxiv.org/abs/2609.15779v1) | Meiduo Chong, Shaolei Zhang, Ju Fan et al. | Tackles the **agent-data gap** by giving data agents an evolving ontology that mediates between heterogeneous tables, files, and DBs. Reduces friction when agents must operate over schemas they did not see at training time. |
| [**Assembling the CREW**](http://arxiv.org/abs/2609.15721v1) | Hai-Dang Dang, Bao-Yen Pham, Bao Nguyen et al. | A **collaborative multi-agent RL framework** for automated related-work generation that learns the workflow itself rather than relying on a predefined agent pipeline. Targets an end-to-end task that has traditionally required heavy manual orchestration. |
| [**RESKILL**](http://arxiv.org/abs/2609.15684v1) | Mengyi Deng, Xin Li, Duyi Pan et al. | Replaces opaque one-shot reflection with **explicit failure attribution and structured repair** for interactive language agents. Improves skill patching by making failure-to-repair mappings and retest feedback explicit. |
| [**When Should a World Model Move?**](http://arxiv.org/abs/2609.15801v1) | Jintao Xu, Zhengyu Chen, Ben Zhang et al. | Introduces **loss-conditioned state execution**, a model-agnostic criterion for deciding when to advance a world model's state versus retain the current one. Separates predictive informativeness from downstream loss reduction. |

### 🔧 Methods & Frameworks

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [**Discrete Beckmann Transport Models**](http://arxiv.org/abs/2609.15903v1) | Sophia Tang, Shiyi Wang | A **discrete flow/diffusion alternative to autoregressive LMs** that compresses many-step sampling into one step without teacher distillation. Removes the quality ceiling and costly two-stage pipeline imposed by current distillation approaches. |
| [**Backward SDEs-based Diffusion for Physics-Constrained Generation**](http://arxiv.org/abs/2609.15702v1) | Zihao Wang | Replaces heuristic guidance in score-based diffusion with a **BSDE-based framework** that enforces physics/measurement consistency with end-of-pipe feasibility guarantees. Strengthens the theoretical footing of diffusion-based inverse-problem solvers. |
| [**Safe Meta-Reinforcement Learning via Information Space Reachability**](http://arxiv.org/abs/2609.15915v1) | Zeyang Li, Sunbochen Tang, Navid Azizan | A **safe meta-RL framework** that uses information-space reachability to handle safety constraints across unseen tasks. Fills an underexplored gap between meta-RL's adaptability and real-world safety requirements. |
| [**CiteGuard-RAG**](http://arxiv.org/abs/2609.15830v1) | Sumit Barua, Guan Hong, Halil Dursunoglu et al. | A **validation-centered RAG system** that enforces evidence grounding, citation validity, and appropriate refusal. Targets the operational gap between retrieval quality and answer trustworthiness. |
| [**Per-Matrix Optimality Is Not Enough**](http://arxiv.org/abs/2609.15838v1) | Huicheng Zhang, Xiyao Feng, Ze-Tong Li et al. | Shows **Eckart-Young-optimal per-matrix SVD truncations compound errors** through the block's nonlinear forward pass, motivating three-level optimization. Important practical guidance for low-rank LLM compression. |
| [**Verifiable by Construction: Claim-Level Evaluation of Verbatim Citation in Clinical QA**](http://arxiv.org/abs/2609.15964v1) | Jiashuo Zhang, Yuling Chen, Yvonne Commodore-Mensah et al. | Introduces **claim-level verbatim citation evaluation** so clinicians can rapidly verify LLM-cited clinical answers. A concrete step toward LLM answers that are auditable in time-pressured settings. |

---

## 3. Research Trend Signal

The dominant theme today is **agentic systems operating over long horizons and uncertain decision chains** — Stellar Colosseum, HypoEvolve, CREW, RESKILL, and EvoOntology all target workflows where a single decision affects many downstream ones. Closely tied is a wave of work on **safety and verifiability of autonomous agents** (Coalitional Alignment, Backdoor Attacks on World Models, Look Before You Leap, CiteGuard-RAG), suggesting the field is maturing past capability benchmarks toward deployability. **RL for LLM reasoning** continues to evolve toward critic-free and theoretically grounded variants (Bellman Policy Optimization, Safe Meta-RL). Finally, methodological papers — discrete transport models, BSDE-based diffusion physics constraints, SVD-aware compression — point to a quiet but persistent drive to replace heuristics with principled, end-to-end guarantees across generative modeling and optimization.

---

## 4. Worth Deep Reading

- **[Bellman Policy Optimization](http://arxiv.org/abs/2609.15987v1)** — A clean theoretical derivation from Policy Mirror Descent that drops the critic, with immediate implications for the cost and stability of RLVR pipelines. Anyone training reasoning models should read this.

- **[Stellar Colosseum](http://arxiv.org/abs/2609.15983v1)** — A timely harness for stress-testing agents on long-horizon research problems where current single-shot LM proofs fail. It defines a much-needed evaluation regime for the next generation of research assistants.

- **[Discovery Foundation Models](http://arxiv.org/abs/2609.15973v1)** — A forward-looking position paper arguing for foundation models that participate in scientific discovery rather than merely solve prescribed problems. Useful for framing one's own research agenda around open-ended discovery intelligence.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*