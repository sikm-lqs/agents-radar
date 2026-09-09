# ArXiv AI 研究日报 2026-09-10

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG, cs.MA) | 共 50 篇论文 | 生成时间: 2026-09-09 23:30 UTC

---

# ArXiv AI 研究简报 — 2026-09-10

## 📌 今日亮点

今日投稿呈现明显的**智能体基础设施与自我改进**汇聚趋势：多篇论文聚焦于 LLM 智能体周边的过程性脚手架（过程图、外壳协同进化、记忆清理、工具使用数据合成），而非基础模型本身，表明该领域已将智能体循环视为新的优化面。第二条主线是**测试时与在策略学习**：关于零 rollout 难度先验、面向代码的熵正则化 TTRL，以及价值迭代自博弈的论文，揭示出一套日趋成熟的工具集，使模型能在推理阶段实现改进而无需昂贵的重训。此外，机制可解释性正借助 SAE 驱动的科研智能体迈向自主化；而对训练阶段检查点的可解释性（Good Pretraining, Bad SFT）及推理病理学（谄媚性、注意力汇聚、审计工具效应）的研究，则共同指向对*训练与评估流程本身*的再度关注。

---

## 🧠 大语言模型

| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [Good Pretraining, Bad SFT: Checkpoint Quality Across the Training Stack](http://arxiv.org/abs/2609.08966v1) | Sohir Maskey, Philipp Scholl, Jonas Knupp 等 | 在 30B MoE 流水线中证明，预训练损失最优的检查点未必是最佳 SFT 起点，挑战了模型选择中被广泛接受的假设，强调需要具备阶段感知能力的检查点选择机制。 |
| [Learning Length-Extrapolatable Recurrent Models](http://arxiv.org/abs/2609.09157v1) | Hanwen Jiang | 认为驱动循环模型超出训练长度后失效的是逐 token 稠密损失，而非梯度消失，并提出实现真正长度外推的改进方法，对所有长上下文循环架构具有参考价值。 |
| [It's Not RoPE that Creates Sinks: The Role of Self-Concentration and Value-Non-Mixing in Attention](http://arxiv.org/abs/2609.09085v1) | Raito Kiya, Satoki Ohashi, Kosuke Sato 等 | 拆解注意力汇聚与巨量激活现象背后的因果因素，将其归因于 value 动态而非位置编码，对低比特量化具有启示意义。 |
| [Training-Free Task Vectors for LLM Behavioral Control](http://arxiv.org/abs/2609.09054v1) | Gabriel J. Perin, Lucas Boscaini, André Araujo 等 | 在无需微调的前提下提取语义化的任务向量，实现廉价的训练后行为编辑，降低模型引导的成本。 |
| [Everything in Moderation: Per-Domain Coverage Optima and Alignment-Resistant Domain Gaps in Multi-Domain Mid-Training](http://arxiv.org/abs/2609.09081v1) | Yunpeng Xu, Kun Zheng | 表明中间训练的数据构成选择会留下对齐阶段无法完全消除的领域差距，主张在受控逻辑推理场景中进行原则化的中间训练设计。 |
| [Measuring LLM Sycophancy under Sustained Multi-Turn Pressure](http://arxiv.org/abs/2609.09090v1) | Leyuan Tang, Kangda Wei, Tianyu Jiang 等 | 提出 SPINE 协议，用于在适应性多轮分歧下测量谄媚性，揭示单轮评估所遗漏的失效模式。 |

## 🤖 智能体与推理

| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [Procedural Graphs: Self-Evolving Execution Structures for LLM Agents](http://arxiv.org/abs/2609.09153v1) | Yuxing Lu, Yicheng Chen, Shanchan Wu 等 | 用显式、可演化的过程图取代无约束的动作生成，刻画顺序与条件，为长程智能体提供可学习的执行基底。 |
| [Co-Evolving Harnesses and Models: On-Policy Correction Helps Weaker Models Catch Up Where Imitation Fails](http://arxiv.org/abs/2609.09134v1) | Zhou Yu, Bin Bi, Shiva Kumar Pentyala 等 | 证明将智能体外壳与模型联合优化并辅以在策略修正，可让较小模型与前沿模型在领域任务上比肩，将外壳设计重构为一阶优化目标。 |
| [MeClear: Cooperative Game-Theoretic Attribution and Risk-Aware Memory Clearance for Long-Horizon LLM Agents](http://arxiv.org/abs/2609.09115v1) | Boyu Yang, Jiazheng Sun, Zilong Lu 等 | 借助合作博弈论按下游效用对记忆条目打分并剪除误导项，应对长程智能体的核心可靠性瓶颈。 |
| [SAEScientist-Bench: Can AI Agents Conduct Autonomous SAE Interpretability Research?](http://arxiv.org/abs/2609.09113v1) | Yuqiao Tan, Shizhu He, Jun Zhao 等 | 在稀疏自编码器可解释性研究上对自主智能体进行基准测试，指出 RSI 不仅需要训练自动化，还需要审计与监控自动化。 |
| [PlannerForge: LLM Agents for Scenario-Based Testing of Motion Planners in Autonomous Driving](http://arxiv.org/abs/2609.08965v1) | Yuan Gao, Sebastian Müller, Mattia Piccinari 等 | 将碎片化的场景化测试流水线（生成、检索、执行、分析）统一到 LLM 智能体框架下，服务于更安全的自动驾驶验证。 |
| [ToolLoop: Closed-Loop Tool-Use Data Synthesis via Decomposed Generation and Dynamic Self-Feedback](http://arxiv.org/abs/2609.09072v1) | Min Zeng, Yuzhou Liu, Zhenyu Cao 等 | 以分解式生成与动态自反馈取代静态的"先生成再过滤"流水线，产出更高质量、更均衡的工具使用训练数据。 |
| [Copying explains the collective behavior of AI agents in the wild](http://arxiv.org/abs/2609.09150v1) | Giordano De Marzo, Nicola Alboré, David Garcia | 用简单的复制动力学建模数千个短生命周期智能体在共同维基上的涌现协作，为野外多智能体行为提供统计力学层面的解释。 |

## 🔧 方法与框架

| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [Silver Rate Is (Almost) Optimal for Gradient Descent Acceleration](http://arxiv.org/abs/2609.09152v1) | Yuhan Ye, Kaizhao Liu | 证明了一个近乎紧界的非任意时刻下界，与光滑凸问题上的预定步长梯度下降的 silver 速率收敛匹配，弥合了一项长期悬而未决的理论缺口。 |
| [Entropy-Regularized Rank-Masked Policy Optimization for Test-Time Reinforcement Learning in Code Generation](http://arxiv.org/abs/2609.09135v1) | Jiacheng Xu, Feng Chen, Xiuneng Xu 等 | 将测试时强化学习拓展至代码任务，用秩掩码、熵正则化的奖励替代答案级自投票，直接作用于可执行程序而非表层形式。 |
| [ThinkPrior: Zero-Rollout Difficulty Priors for Cold-Start Prompt Selection in RLVR](http://arxiv.org/abs/2609.09075v1) | Tommy Sha, Skylar Zhai, Siqi Zhao | 在 GRPO/RLVR 中以零 rollout 难度估计对 prompt 进行预过滤，避免零优势组，提升冷启动阶段的样本效率。 |
| [The Surprising Effectiveness of Approximate Value Iteration in Self-Play](http://arxiv.org/abs/2609.09094v1) | Raphael Boige, Amine Boumaza, Bruno Scherrer | 论证近似价值迭代能够以显著更少的算力与基于 MCTS 的自博弈相抗衡，提示一种面向竞技博弈智能体的更轻量范式。 |
| [Transformers as In-Context Samplers: From Closed-Form Diffusion to Estimation-Free Sampling](http://arxiv.org/abs/2609.08981v1) | Arman Adibi, Alireza Jafari, Mohammad Ghavamzadeh 等 | 打通闭式扩散采样与上下文学习，证明 Transformer 仅凭提示样本即可实现免估计的采样器。 |

## 📊 应用

| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [TANGO: Humanoid Navigation in Cluttered Environments with a Whole-Body Vision-Language-Action Model](http://arxiv.org/abs/2609.09158v1) | Anqi Li, Yuxin Chen, Zhaobo Li 等 | 将人形机器人导航由二维路径规划推进到具备几何感知的全身 VLA 控制，在杂乱室内场景中实现协调的臂–腿行为。 |
| [DeCAL: Towards Physically-Grounded Dexterous VLA Models via Contact-Aware Latent Co-Imitation](http://arxiv.org/abs/2609.09119v1) | Yankai Fu, Ning Chen, Junkai Zhao 等 | 在遮挡场景下，通过在接触感知空间中协同想象触觉与视觉潜变量，解决灵巧操作难题，提升 VLA 在富接触任务上的表现。 |
| [Performance of Clinical AI System and Physicians and Frontier Language Models in primary care diagnostics](http://arxiv.org/abs/2609.09070v1) | Andy Nkansah, Hanna Plotnitskaya, Stanislau Salavei 等 | 在 150 例波兰语合成初级保健病例中，临床 AI "Doctorina" 取得 82.0% 的 Top-1 诊断一致率，实质性优于医师及独立前沿 LLM。 |

---

## 📈 研究趋势信号

今日主导信号是**"智能体即系统"的转向**：研究者不再一味扩展基础模型，而是围绕其优化外壳、执行图、记忆与工具使用数据（#4、#11、#18、#28、#47）。与此同时，**测试时与在策略自适应**正固化为一个具有可复用原语的子领域——难度先验（#27）、秩掩码代码奖励（#10）、价值迭代自博弈（#21）、上下文采样器（#43）——皆旨在以更少重训换取更强能力。第三条线索是**在真实压力下进行诚实评估**：在持续对抗下的谄媚性（#22）、审计工具对偏置的影响（#34）、训练全栈的检查点质量（#46），以及将机制可解释性作为基准（#19），共同倡导更丰富、面向过程的测量，而非单一的端点精度。综合来看，2026 年的研究重心正从"更大的预训练"转向"更好的脚手架、推理时自适应与审计"。

---

## 📚 值得深读

1. **[Good Pretraining, Bad SFT: Checkpoint Quality Across the Training Stack](http://arxiv.org/abs/2609.08966v1)** — 一项全规模的 30B MoE 研究，推翻了模型开发中的常规假设，有望改变业界检查点选择的实践。
2. **[Co-Evolving Harnesses and Models: On-Policy Correction Helps Weaker Models Catch Up Where Imitation Fails](http://arxiv.org/abs/2609.09134v1)** — 将外壳设计重构为与模型的协同优化问题，对小模型的高性价比领域化部署具有切实意义。
3. **[Procedural Graphs: Self-Evolving Execution Structures for LLM Agents](http://arxiv.org/abs/2609.09153v1)** — 提供了一条替代无约束动作生成的原则化路径，有望成为长程、工具使用型智能体的基础原语。

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*