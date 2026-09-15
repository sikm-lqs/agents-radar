# ArXiv AI 研究日报 2026-09-15

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG, cs.MA) | 共 50 篇论文 | 生成时间: 2026-09-15 11:30 UTC

---

# ArXiv AI 研究速览 — 2026-09-15

---

## 1. 今日亮点

今天的投稿清晰地描绘出领域的发展方向：**规模化智能体推理**成为主旋律，多篇论文聚焦于长周期研究（Stellar Colosseum）、假设发现（HypoEvolve）以及相关工作生成（CREW）。**面向 LLM 推理的强化学习**依旧是热门方向，Bellman Policy Optimization 从策略镜像下降（Policy Mirror Descent）出发推导出无评论家（critic-free）方法即为代表。同样值得关注的是，**安全、对齐与可验证性**正上升为一类核心议题 —— 关于错位智能体授权、世界模型后门攻击以及引文驱动的临床问答的论文，都在致力于让自主系统变得可信赖。在这些主题之下，关于扩散模型、传输模型与表征几何的基础研究也在持续夯实方法论根基。

---

## 2. 重点论文

### 🧠 大语言模型

| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [**Bellman Policy Optimization**](http://arxiv.org/abs/2609.15987v1) | Zhuoqing Song, Haotian Xu, Xikun Zhang 等 | 提出一种从策略镜像下降推导而来的**无评论家 RLVR 方法**，自回归 LLM 生成仅使用末端奖励。其重要性在于消除了训练价值网络的成本，同时在推理能力提升上仍优于 PPO 类基线。 |
| [**Discovery Foundation Models**](http://arxiv.org/abs/2609.15973v1) | Ling Yang, Zhenfei Yin, Yingcheng Wu 等 | 主张 LLM 的下一前沿正在从解决人类指定的问题转向**参与开放式发现**。论文勾勒出一份关于基础模型的研究路线图：生成假设、设计实验，并充当科研合作者。 |
| [**Mind2Dialogue**](http://arxiv.org/abs/2609.15972v1) | Zixuan Wang, Yufan Zhou, Jinzhou Tang 等 | 通过模拟用户心智状态来生成交互数据，弥合训练**具备人类感知能力的 LLM** 的监督鸿沟。对长期协作型助手至关重要 —— 在这类场景中，理解用户不断演化的心智上下文与完成任务同等重要。 |
| [**Inoculation Midtraining with Learned Neologisms**](http://arxiv.org/abs/2609.15886v1) | Kyle O'Brien, Edward James Young, Puria Radmard 等 | 提出**将 midtraining 作为控制点**，用以塑造哪些属性从后训练传播到更广泛的行为中。通过教会基础模型将人造新词视为"不受欢迎的"，该技术引导了下游泛化方向。 |
| [**Learning to Coach for Experiential Learning**](http://arxiv.org/abs/2609.15851v1) | Guanheng Chen, Tianzhu Ye, Li Dong 等 | 训练一个专门的 **LLM-as-a-Coach**，从执行模型原始解题轨迹中提炼可操作的教训。将经验知识蒸馏为精炼的指引，减少迭代自我改进循环中浪费的探索。 |
| [**Look Before You Leap: Factual Decoding with Internal Attribution Signals**](http://arxiv.org/abs/2609.15745v1) | Hayeong Ryu, JungMin Yun, Byeonggeuk Lim 等 | **DescaPE** 通过在早期事实性错误累积之前，利用内部归因信号引导生成，从而预防幻觉滚雪球。从事后修正迈向推理时幻觉预防的颇具前景的一步。 |

### 🤖 智能体与推理

| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [**Stellar Colosseum**](http://arxiv.org/abs/2609.15983v1) | Honghao Lin, David P. Woodruff, Yuan Deng 等 | 一个**多智能体调度框架**，在短证明不可靠的长周期数学与 TCS 研究中分配推理资源。该框架与模型无关，精准针对当前语言模型难以胜任的多步、相互依赖决策场景。 |
| [**The Router Within**](http://arxiv.org/abs/2609.15982v1) | Ruishuo Chen, Xun Wang, Yu Chen 等 | 从冻结的 LLM 中**激发原生技能路由**，而非将技能元数据预加载到上下文中（这种方式会限制库规模）。该方法解决了技能增强型 LLM 智能体的真实可扩展性瓶颈。 |
| [**HypoEvolve**](http://arxiv.org/abs/2609.15938v1) | Jieyuan Liu, Mengzhou Hu, Jefferson Chen 等 | 使用**遗传算法驱动多智能体 LLM 协作**，通过批判、对比与修订实现科学假设发现。对不同协作拓扑如何影响假设质量提供了一项原则性研究。 |
| [**Delegating Authorization to Misaligned Agents**](http://arxiv.org/abs/2609.15803v1) | Natalie Collina, Surbhi Goel, Aaron Roth 等 | 针对长时间运行的智能体（其行为递归地塑造未来状态）形式化了**联盟对齐（coalitional alignment）与安全控制**。这是一项理论贡献，明确定义了何时需对重大决策进行预审批以保证安全性。 |
| [**EvoOntology: A Self-Evolving Ontology Layer for Data Agents**](http://arxiv.org/abs/2609.15779v1) | Meiduo Chong, Shaolei Zhang, Ju Fan 等 | 通过为数据智能体提供一层可在异构表、文件与数据库之间调停的自演化本体，应对**智能体与数据之间的鸿沟**。减少了智能体在训练时未见的模式上操作时的摩擦。 |
| [**Assembling the CREW**](http://arxiv.org/abs/2609.15721v1) | Hai-Dang Dang, Bao-Yen Pham, Bao Nguyen 等 | 一个用于自动化相关工作生成的**协作式多智能体强化学习框架**，让工作流本身被学习到，而非依赖预定义的智能体流水线。瞄准传统上需要大量人工编排的端到端任务。 |
| [**RESKILL**](http://arxiv.org/abs/2609.15684v1) | Mengyi Deng, Xin Li, Duyi Pan 等 | 用**显式失败归因与结构化修复**取代不透明的单次反思，面向交互式语言智能体。通过显式化失败到修复的映射以及重测反馈，提升技能修补效果。 |
| [**When Should a World Model Move?**](http://arxiv.org/abs/2609.15801v1) | Jintao Xu, Zhengyu Chen, Ben Zhang 等 | 提出**损失条件化的状态执行（loss-conditioned state execution）**，作为一种与模型无关的判定准则，用于决定何时推进世界模型状态、何时保留当前状态。将预测信息量与下游损失降低解耦。 |

### 🔧 方法与框架

| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [**Discrete Beckmann Transport Models**](http://arxiv.org/abs/2609.15903v1) | Sophia Tang, Shiyi Wang | 一种**自回归 LM 的离散流/扩散替代方案**，无需教师蒸馏即可将多步采样压缩为一步。消除了现有蒸馏方法所施加的质量上限与昂贵两阶段流水线。 |
| [**Backward SDEs-based Diffusion for Physics-Constrained Generation**](http://arxiv.org/abs/2609.15702v1) | Zihao Wang | 用**基于 BSDE 的框架**取代基于分数的扩散中的启发式引导，从而以端到端可行性保证来强制物理/测量一致性。强化了基于扩散的反问题求解器的理论基础。 |
| [**Safe Meta-Reinforcement Learning via Information Space Reachability**](http://arxiv.org/abs/2609.15915v1) | Zeyang Li, Sunbochen Tang, Navid Azizan | 一个**安全元强化学习框架**，借助信息空间可达性处理未见任务上的安全约束。填补了元强化学习的适应性与现实世界安全要求之间的一块被低估的空白。 |
| [**CiteGuard-RAG**](http://arxiv.org/abs/2609.15830v1) | Sumit Barua, Guan Hong, Halil Dursunoglu 等 | 一个**以验证为中心的 RAG 系统**，强制证据落地、引文有效以及合理拒答。瞄准检索质量与答案可信度之间的运行鸿沟。 |
| [**Per-Matrix Optimality Is Not Enough**](http://arxiv.org/abs/2609.15838v1) | Huicheng Zhang, Xiyao Feng, Ze-Tong Li 等 | 指出**Eckart-Young 最优的逐矩阵 SVD 截断会在块非线性前向传播中累积误差**，由此引出三层优化。对低秩 LLM 压缩具有重要的实践指导意义。 |
| [**Verifiable by Construction: Claim-Level Evaluation of Verbatim Citation in Clinical QA**](http://arxiv.org/abs/2609.15964v1) | Jiashuo Zhang, Yuling Chen, Yvonne Commodore-Mensah 等 | 提出**声明级逐字引文评估**，使临床医生能在时间紧迫的场景中快速验证 LLM 引用的临床答案。是让 LLM 答案具备可审计性的具体一步。 |

---

## 3. 研究趋势信号

今天的主旋律是**在长周期与不确定决策链上运行的智能体系统** —— Stellar Colosseum、HypoEvolve、CREW、RESKILL 与 EvoOntology 都瞄准单一决策影响众多下游决策的工作流。与之紧密交织的是一波围绕**自主智能体的安全性与可验证性**的工作（Coalitional Alignment、Backdoor Attacks on World Models、Look Before You Leap、CiteGuard-RAG），表明领域正从能力基准测试迈向部署可用性的成熟阶段。**面向 LLM 推理的强化学习**持续朝着无评论家与理论严谨的变体演进（Bellman Policy Optimization、Safe Meta-RL）。最后，方法论层面的论文 —— 离散传输模型、基于 BSDE 的扩散物理约束、感知 SVD 的压缩 —— 昭示着一场静默却持续的演进：在生成建模与优化中，用有原则的端到端保证取代启发式方法。

---

## 4. 值得深入阅读

- **[Bellman Policy Optimization](http://arxiv.org/abs/2609.15987v1)** — 从策略镜像下降出发干净利落地推导出无需评论家的方法，对 RLVR 流水线的成本与稳定性具有直接意义。任何训练推理模型的人都应一读。

- **[Stellar Colosseum](http://arxiv.org/abs/2609.15983v1)** — 一个在长周期研究问题（当前单次 LM 证明在此失效）上对智能体进行压力测试的及时框架。它为下一代研究助手定义了一项亟需的评估范式。

- **[Discovery Foundation Models](http://arxiv.org/abs/2609.15973v1)** — 一份具有前瞻立场的论文，主张基础模型应参与科学发现，而不仅仅是求解预设问题。对围绕开放式发现智能来规划自身研究方向很有帮助。

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*