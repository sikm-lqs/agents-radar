# Hugging Face 热门模型周报 2026-09-14

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-13 23:30 UTC

---

# 🤗 Hugging Face 热门模型周报 — 2026-09-14

---

## 1. 今日聚焦

Qwen3.8 本周继续领跑,其中 **Qwen3.8-27B** 以惊人的 14,969 周点赞和超过 770 万次下载量高居榜首——成为 Hub 上互动量最高的单一模型。实验性的 **Qwen3.8-Flash-Next**(带有 `qwen4_exp` 标签)同样热度飙升,预示着阿里正在预览下一代架构方向。**Lightricks/LTX-2.5** 和 **MiniMaxAI/MiniMax-H3** 引领新一轮高质量视频生成模型的发布浪潮,而像 **Edge0-35B-A3B-preview** 这类面向边缘推理的 MoE 模型,则反映出对本地可部署推理能力日益增长的需求。围绕 Qwen3.8-27B 的量化活动十分活跃,unsloth 和 ISTA-DASLab 的 GGUF 变体与基础模型一同获得了四位数级别的点赞量。

---

## 2. 热门模型

### 🧠 语言模型

| 模型 | 作者 | 点赞 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,969 | 7,768,964 | Qwen3.8 的旗舰发布版本——一款 27B 多模态对话模型,以本周 14,969 次周点赞的成绩一骑绝尘。其对话质量和广泛的指令遵循能力,使其成为当前一代对话负载事实上的开源基线。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,164 | 624,390 | 较小的 "Flash" 变体,带有 `qwen4_exp` 标签,预示着下一代 Qwen 架构的演进方向。凭借出色的速度/成本表现和社区早期尝鲜的好奇心,热度持续攀升。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 2,200 | 244,457 | DeepSeek 的 V4.1 "Flash" 级别——一款面向吞吐量优化的紧凑型图文转文本模型。作为预算敏感型多模态部署场景中强劲的开源权重替代方案,热度持续走高。 |
| [TokenRhythm/NeoHorse-1-4B](https://huggingface.co/TokenRhythm/NeoHorse-1-4B) | TokenRhythm | 1,737 | 7,979 | 基于 qwen3_5_text 骨干构建的 4B 智能体文本模型,因其工具调用聚焦而受到关注。热度来自小型智能体模型的稀缺性,以及不断攀升的下载/点赞比。 |
| [openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,339 | 150,110 | MiniCPM5 的 2B 配置版本——一款高效的小型 LLM。凭借其类 llama 架构和出色的参数性价比,成为边缘设备上的首选基线模型,热度持续走高。 |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,304 | 1,576,209 | 智谱 AI 的 GLM-5.3 Flash——搭载全新 `glm5_next` 架构标签的多模态对话模型。在 Flash 级别推动图文推理的开源权重质量上限,因此热度不断攀升。 |
| [XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 1,154 | 21,336 | Spark2.5 系列下的 4B 文本模型,定位为轻量级通用 LLM。在亚洲语言生态中因低参数下的多语言覆盖能力而广受追捧。 |
| [Edge0/Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview) | Edge0 | 1,026 | 3,552 | 基于 qwen3_5_moe 构建的 35B 参数 MoE 模型,激活参数 3B,专为 MLX 边缘推理打包。作为首批明确面向 Apple Silicon / 本地 MoE 服务的预览模型之一,热度持续走高。 |
| [Agnes-AI/Agnes-3.0-Flash](https://huggingface.co/Agnes-AI/Agnes-3.0-Flash) | Agnes-AI | 138 | 474 | Agnes-3.0 Flash 的早期版本——来自新晋厂商的多模态文本生成模型。尽管绝对下载量较低,仍凭借新鲜感上榜,反映出社区对新兴实验室的关注。 |
| [nex-agi/Nex-N2.5-mini](https://huggingface.co/nex-agi/Nex-N2.5-mini) | nex-agi | 755 | 3,970 | 基于 qwen3_5_moe 构建、具备图文转文本能力的 mini MoE 模型。作为新兴 Nex 家族中性价比突出的多模态基线,热度持续攀升。 |
| [nex-agi/Nex-N2.5-Pro](https://huggingface.co/nex-agi/Nex-N2.5-Pro) | nex-agi | 623 | 30,289 | Nex-N2.5 中的 Pro 级版本,同样基于 qwen3_5_moe 并支持多模态。在参数规模有竞争力的情况下提供更高质量的输出,因此热度持续走高。 |
| [openai-community/gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 4,030 | 15,158,496 | 经典的 GPT-2——凭借其作为教学和基准测试工具的角色,每周仍能获得数千次点赞。其持久的存在印证了 HF Hub 作为基础模型归档库的价值。 |

### 🎨 多模态与生成

| 模型 | 作者 | 点赞 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,237 | 4,819,845 | 旗舰级图文转视频生成模型——本周以 5,237 次点赞成为最热门的视频发布版本。凭借在文生视频和图生视频两种模式下出色的提示词遵循能力而热度持续走高。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 3,738 | 1,548,442 | LTX-2.5 是一款扩散单文件模型,在同一权重中支持图生视频、文生视频和视频生视频。凭借统一多种视频管线并以单一可部署文件发布而热度持续走高。 |
| [WarmBloodAban/Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 371 | 123,491 | Minimax-h3 视频模型的社区调优变体,品牌名为 "Singularity"。在视频生成爱好者中因在基础架构上突破风格化边界而受到追捧。 |
| [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 402 | 3,707 | 专攻音乐生成的 3B 文生音频模型,具备符号化规划和智能体编辑功能。作为少有的兼具长篇音乐生成与可控编辑能力的开源模型,热度持续攀升。 |
| [tencent/AuK](https://huggingface.co/tencent/AuK) | tencent | 189 | 1,202 | 腾讯的 AuK——支持声音克隆的零样本 TTS 系统。凭借以较小下载足迹为开源社区带来工业级声音克隆质量而热度持续走高。 |
| [Viggle/Viggle-Animate](https://huggingface.co/Viggle/Viggle-Animate) | Viggle | 215 | 0 | 聚焦角色替换和动画编辑的视频生视频管线。凭借新鲜感以及零初始下载量,显示出视频编辑开发者的发布前预热热度。 |

### 🔧 专业模型

| 模型 | 作者 | 点赞 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,927 | 252,928,721 | 经典紧凑型句向量模型,支持跨框架(PyTorch、TF、Rust、ONNX)。凭借约 2.53 亿次下载量持续走红——成为 Hub 上下载量最高的模型,遥遥领先。 |
| [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 774 | 797,832 | Google 的 TimesFM 3.0——一款预训练时间序列基础模型,提供 PyTorch 移植版本。作为生产规模预测领域少数可信的开源基础模型之一,热度持续走高。 |
| [Qwen/Qwen-Drive-1.0-4B](https://huggingface.co/Qwen/Qwen-Drive-1.0-4B) | Qwen | 196 | 4,119 | 专为自动驾驶运动规划打造的 4B 模型,隶属 `qwen_drive` 家族。作为端到端驾驶策略研究中罕见开源权重版本,热度持续走高。 |
| [facebook/mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 526 | 12,880 | Meta 的 300M 参数多语言语音(wav2vec2)预训练检查点,覆盖 1,000+ 种语言。作为低资源语音研究的基础资源,热度持续走高。 |
| [google-bert/bert-base-uncased](https://huggingface.co/google-bert/bert-base-uncased) | google-bert | 3,300 | 46,513,338 | 经典的 BERT base——一款至今仍定义 NLP 教学范式的填空编码器。凭借 4600 万+ 次下载量,成为编码器微调和探针研究的事实标准基线。 |
| [distilbert/distilbert-base-uncased](https://huggingface.co/distilbert/distilbert-base-uncased) | distilbert | 1,433 | 7,325,282 | 蒸馏版 BERT——以 60% 的体积保留约 97% 的 BERT 质量。作为生产 NLP 管线的标准轻量级编码器,热度持续走高。 |
| [openai/clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32) | openai | 1,499 | 21,331,361 | OpenAI 的 CLIP ViT-B/32——零样本图像分类的视觉-语言编码器。凭借其在检索、字幕生成和现代多模态研究中的基础性地位而热度持续走高。 |

### 📦 微调与量化

| 模型 | 作者 | 点赞 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,009 | 11,005,880 | unsloth 提供的 Qwen3.8-27B 社区标准 GGUF 量化版本。凭借 1100 万+ 次下载量成为主要交付格式,服务于本地运行 Qwen3.8 的 llama.cpp / Ollama 用户,热度极高。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 969 | 769,557 | 采用 GSQ 和 RCO 混合精度量化的 Qwen3.8-27B GGUF 变体。凭借在保持精度的前提下推动低位压缩,吸引了进行量化技术基准测试的研究人员,热度持续走高。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 632 | 750,591 | 命名激进的 Qwen3.8-27B 社区微调版本,搭载 MTP(多 token 预测)并强化去审查 / 代码能力。在角色扮演与编程微调生态中凭借 turbo/MTP 卖点而热度持续走高。 |
| [openbmb/MiniCPM5-2B-GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF) | openbmb | 216 | 99,716 | MiniCPM5-2B 的官方 GGUF 量化版本。作为消费级硬件上 MiniCPM5 系列的标准本地部署格式,热度持续走高。 |
| [dealignai/GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8) | dealignai | 431 | 30,310 | 面向网络安全任务微调的 GLM-5.3 衍生版本,移除拒绝机制并采用 FP8 权重。在安全研究人员中凭借提供内存友好的领域专用开源模型而热度持续走高。 |

---

## 3. 生态信号

Qwen3.8 家族无可争议地成为本周 Hub 的引力中心——**按下载量排名的前 5 名**全部是 Qwen3.8 本身或其衍生版本,而带有 `qwen4_exp` 标签的实验性 **Qwen3.8-Flash-Next** 暗示着即将到来的架构演进。三家独立 GGUF 量化方(unsloth、ISTA-DASLab、DavidAU)加上官方权重,共同彰显了一个健壮的**开源权重生态**:第三方在闭源厂商能够追赶生态势头之前,已放心地将基础设施押注在 Qwen 之上。

边缘推理 MoE 是另一条清晰的叙事线。**Edge0-35B-A3B-preview** 和基于 qwen3_5_moe 的 Nex-N2.5 模型,标志着稀疏架构针对消费级 GPU 和 Apple Silicon 的成熟——这相较于 2024–25 年间 70B+ 稠密模型的范式是一个显著转变。结合 unsloth/ISTA-DASLab 的量化产出,"本地可运行强模型"的实用门槛持续下探。

垂直微调日趋多元:网络安全(dealignai)、智能体/编程(DavidAU、TokenRhythm)、自动驾驶(Qwen-Drive)和音乐(YuE2)纷纷登场,预示着下一条竞争主轴是**领域专业化**而非单纯的原始能力。与此同时,视频生成已分化为重量级扩散管线(Lightricks/LTX-2.5、MiniMaxAI/MiniMax-H3)和更轻量的编辑聚焦工具(Viggle),巨大的下载量印证了商业需求的真实性。

---

## 4. 值得探索

- **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)** — 凭借 14,969 次周点赞和 770 万次下载量,这是评估当前开源权重前沿对话质量的最佳单一基线。其多模态能力也使其成为视觉-语言原型设计的一站式模型。

- **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)** — 本周领先的开源视频生成模型。鉴于其下载速度与 Lightricks 的竞争中表现强势,值得研究其提示词遵循度以及图生视频/文生视频的双重支持。

- **[Edge0/Edge0-

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*