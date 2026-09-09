# ArXiv AI 研究日报 2026-09-09

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG, cs.MA) | 共 50 篇论文 | 生成时间: 2026-09-09 11:30 UTC

---

# ArXiv AI 研究摘要 — 2026-09-09

## 1. 今日要点

今日的投稿明显呈现出向 **agentic 基础设施** 发力的趋势——多篇论文（Procedural Graphs、ExecCritic、MeClear、SAEScientist-Bench）都聚焦于可靠的长期 LLM agent 所需的程序性记忆、评估体系与自我修正循环。**推理分析**也在逐步成熟，不再局限于对终点准确率的考察：Answer-Distribution Trajectories 与 Deposon 都提出了对思维链路径的"账本式"视角。在 **强化学习/优化** 方面，关于梯度下降加速的紧致下界（即"白银速率"）以及在自博弈中支持价值迭代而非 MCTS 的实证案例，显示出研究界正在回归经典凸分析工具。**LLM 训练**正在被重新审视——"Good Pretraining, Bad SFT" 一文挑战了"最佳预训练检查点必然也是最佳微调起点"这一假设，而 training-free task vectors 则提出了权重空间编辑的一种更廉价替代方案。

---

## 2. 重点论文

### 🧠 大语言模型

| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [ReCite: Agentic Reasoning for Faithful Citation](http://arxiv.org/abs/2609.09156v1) | Yuyang Huang, Bobo Li, Jiajia Song et al. | 一种 agentic 流程，将引用推荐锚定在经过验证的原文片段上，而非仅做表层检索，从而缓解现代推荐系统中常见的"幻觉引用"问题。其重要性在于：引用的准确性是 LLM 学术应用的基础。 |
| [Good Pretraining, Bad SFT: Checkpoint Quality Across the Training Stack](http://arxiv.org/abs/2609.08966v1) | Sohir Maskey, Philipp Scholl, Jonas Knupp et al. | 在 30B MoE 流水线上证明：预训练 loss 最低的检查点 *并非* 下游 SFT 的最佳起点，打破了一项被广泛接受的假设。对各大实验室如何选择中间检查点具有直接指导意义。 |
| [Training-Free Task Vectors for LLM Behavioral Control](http://arxiv.org/abs/2609.09054v1) | Gabriel J. Perin, Lucas Boscaini, André Araujo et al. | 在 *不进行* 微调的前提下，在权重空间中发现类似 task vector 的方向，从而支持廉价的事后行为编辑。显著降低了推理时模型定制化的成本。 |
| [Measuring LLM Sycophancy under Sustained Multi-Turn Pressure](http://arxiv.org/abs/2609.09090v1) | Leyuan Tang, Kangda Wei, Tianyu Jiang et al. | 提出 SPINE——一种自适应基准，用于在长程对抗式对话中暴露 LLM 的谄媚性坍缩，弥补了短脚本式测试的盲区。对面向用户的助手类部署具有重要意义。 |
| [It's Not RoPE that Creates Sinks: Self-Concentration and Value-Non-Mixing](http://arxiv.org/abs/2609.09085v1) | Raito Kiya, Satoki Ohashi, Kosuke Sato et al. | 驳斥了将注意力 sink 归因于旋转位置编码的流行观点，指出真正的机制是 self-concentration 与 value-mixing。厘清了一种长期困扰低位量化的病态现象。 |
| [Image Tokenizers as Visual Languages in Unified Multimodal Models](http://arxiv.org/abs/2609.09143v1) | Siting Li, Zhengyang Wang, Simon Shaolei Du et al. | 将视觉分词器视为一种"视觉语言"，并与文本建模联合评测，而非孤立地考察。为统一多模态架构提供了更忠实的衡量尺度。 |

### 🤖 Agent 与推理

| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [TANGO: Humanoid Navigation with a Whole-Body Vision-Language-Action Model](http://arxiv.org/abs/2609.09158v1) | Anqi Li, Yuxin Chen, Zhaobo Li et al. | 将人形机器人导航从 2D 路径规划推进到几何感知的全身 VLA 控制，并协调机械臂与躯干。弥合了为桌面任务设计的 VLA 与真实杂乱场景之间的鸿沟。 |
| [Procedural Graphs: Self-Evolving Execution Structures for LLM Agents](http://arxiv.org/abs/2609.09153v1) | Yuxing Lu, Yicheng Chen, Shanchan Wu et al. | 将 agentic 的程序性知识外化为一张可演化的图，而非隐式历史，使 agent 能够复用并打磨成功的子流程。针对长程无约束生成中众所周知的脆弱性问题。 |
| [ExecCritic: Learn to Test, Test to Improve for Coding Agents](http://arxiv.org/abs/2609.09133v1) | Leitian Tao, Baolin Peng, Haorui Wang et al. | 将测试生成与补丁生成解耦，并基于执行反馈训练一个 critic，从而打破相互强化的错误循环。在真实仓库 issue 上获得更可靠的自我修复能力。 |
| [SAEScientist-Bench: Can AI Agents Conduct Autonomous SAE Interpretability Research?](http://arxiv.org/abs/2609.09113v1) | Yuqiao Tan, Shizhu He, Jun Zhao et al. | 评测 agent 是否能在稀疏自编码器上完成端到端的机制可解释性研究——这是递归自我提升中缺失的一环。将 agent 能力直接连接到模型安全审计。 |
| [Answer-Distribution Trajectories: A Stochastic-Dynamics View of LLM Reasoning](http://arxiv.org/abs/2609.09030v1) | Mar Gonzàlez I Català, Haitz Sáez de Ocáriz Borde, Davide Murari et al. | 将思维链建模为答案分布上的随机过程，而非单一终态输出，推广了熵曲线分析。为推理路径提供了更丰富的评估与诊断手段。 |
| [Co-Evolving Harnesses and Models: On-Policy Correction Helps Weaker Models Catch Up](http://arxiv.org/abs/2609.09134v1) | Zhou Yu, Bin Bi, Shiva Kumar Pentyala et al. | 证明 agent harness 与 on-policy RL 协同演化时，较小的模型能在纯模仿失效处追平前沿模型。为企业级 agent 提供了一种成本控制杠杆。 |
| [MeClear: Cooperative Game-Theoretic Attribution for Long-Horizon LLM Agents](http://arxiv.org/abs/2609.09115v1) | Boyu Yang, Jiazheng Sun, Zilong Lu et al. | 用基于 Shapley 归因的效用感知记忆清除机制取代语义检索，从而淘汰过时或误导性的条目。针对持久化 agentic 系统中的一项关键失效模式。 |
| [PlannerForge: LLM Agents for Scenario-Based Testing of Motion Planners](http://arxiv.org/abs/2609.08965v1) | Yuan Gao, Sebastian Müller, Mattia Piccinadi et al. | 用 LLM agent 统一 ADS 安全验证中的场景生成、检索、修改与分析环节。缓解自动驾驶测试流水线碎片化的问题。 |
| [ToolLoop: Closed-Loop Tool-Use Data Synthesis via Decomposed Generation and Dynamic Self-Feedback](http://arxiv.org/abs/2609.09072v1) | Min Zeng, Yuzhou Liu, Zhenyu Cao et al. | 用闭环合成器替代静态的"先生成再过滤"流程，通过 self-feedback 动态调整特征分布。生成的工具调用训练数据可用性更高。 |

### 🔧 方法与框架

| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [Silver Rate Is (Almost) Optimal for Gradient Descent Acceleration](http://arxiv.org/abs/2609.09152v1) | Yuhan Ye, Kaizhao Liu | 证明了使用预设步长的 GD 存在近紧的 Ω(n^{-p_sil}) 非 anytime 下界，表明在最坏情形下预设调度无法超越白银速率。弥合了凸优化理论中长期存在的差距。 |
| [The Surprising Effectiveness of Approximate Value Iteration in Self-Play](http://arxiv.org/abs/2609.09094v1) | Raphael Boige, Amine Boumaza, Bruno Scherrer | 在多个博弈基准上证明：简单的近似价值迭代可以以远低于 MCTS 的算力匹配乃至超越 MCTS 自博弈。暗示社区可能在对搜索方法上过度投入。 |
| [Curriculum Learning as Transport: Wasserstein Geodesics](http://arxiv.org/abs/2609.09099v1) | Changho Shin, David Alvarez-Melis | 将课程设计重新表述为难度分布上的最优传输，为数据的排序与节奏提供了有原则的几何视角。将课程 *结构* 与单一难度指标解耦。 |
| [Transformers as In-Context Samplers: Estimation-Free Sampling](http://arxiv.org/abs/2609.08981v1) | Arman Adibi, Alireza Jafari, Mohammad Ghavamzadeh et al. | 拓展了上下文学习理论，证明 transformer 可以在不显式估计密度的前提下充当隐式分布的采样器。强化了扩散式采样与 ICL 之间的桥梁。 |
| [Deposon: Game-Theoretic Scattering Layer over LLM Reasoning Paths](http://arxiv.org/abs/2609.09001v1) | Qihao Yuan | 将推理图的每个节点绑定到一个双参数的 Deposon 状态与三通道散射，得到可被机器复核的"被舍弃路径账本"。为多步推理提供了一种密码学风格的审计轨迹。 |

### 📊 应用

| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [DeCAL: Dexterous VLA Models via Contact-Aware Latent Co-Imagination](http://arxiv.org/abs/2609.09119v1) | Yankai Fu, Ning Chen, Junkai Zhao et al. | 为 VLA 策略加入触觉感知与潜在"co-imagination"模块，使其能对被遮挡的接触进行推理。将灵巧操作推进到真正富含接触的任务中。 |
| [SQLMorph: Query Mutation and Fine-Grained Metrics for Text-to-SQL](http://arxiv.org/abs/2609.08950v1) | Mohammadhossein Malekpour, Mohamed Riahi, Maxime Lamothe et al. | 引入 SQL 级别的变异算子与子指标评分，跳出仅看执行准确率的评估方式。弥合了公开基准与企业级 schema 之间的鸿沟。 |
| [GraphFAS: Distributed Graph Feature Generation for Industrial Fraud Networks](http://arxiv.org/abs/2609.08970v1) | Yice Luo, Yun Zhu, Xi Chen et al. | 一种分布式系统，可自动化图特征工程，同时保留金融风控所需的解释性。连接了 GNN 性能与合规可部署性。 |

---

## 3. 研究趋势信号

两条主线在今日的投稿中交汇。**首先，agent 的鲁棒性正从根基处被攻克**：程序性记忆（Procedural Graphs）、记忆卫生（MeClear）、测试—补丁解耦（ExecCritic）、harness 与模型协同演化——每一项都针对现有 agent 不同形式的失效，说明领域已从"agent 能否完成 X？"走向"为什么它会在 X 上崩溃？"。**其次，推理正被作为一等动力学对象**来对待，而不再仅仅是最终答案——Answer-Distribution Trajectories、Deposon 与谄媚性基准都在构建关于 LLM 行为的轨迹级或账本级视图。另一条不那么显眼但重要的线索，是对若干长期假设的重新评估：GD 白银速率下界、价值迭代出乎意料地能匹敌 MCTS、预训练 loss 作为 SFT 起点的失效——这些都标志着优化与训练实践中一次健康的"回归基础"时刻。

---

## 4. 值得精读

- **[Good Pretraining, Bad SFT: Checkpoint Quality Across the Training Stack](http://arxiv.org/abs/2609.08966v1)** — 一项罕见的完整流水线（30B MoE）消融研究，其结论与各大实验室当前的检查点选择策略相左。仔细研读很可能重塑预训练到微调的交接策略。
- **[Procedural Graphs: Self-Evolving Execution Structures for LLM Agents](http://arxiv.org/abs/2609.09153v1)** — 迄今最清晰的论述：如何让 agent 变得 *耐久*，而非一次性执行。把隐式历史升级为可演化的程序图，这一思路在 LLM agent 之外亦广泛适用。
- **[Silver Rate Is (Almost) Optimal for Gradient Descent Acceleration](http://arxiv.org/abs/2609.09152v1)** — 一项锐利的理论结果且具有实践意义：预设调度的设计者应将白银速率视作一条近似的根本性上限，从而将研究力量转向 anytime 或自适应变体。

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*