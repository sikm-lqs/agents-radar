# Hugging Face 热门模型周报 2026-09-14

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-14 11:30 UTC

---

# 🤗 Hugging Face 热门模型速递 — 2026-09-14

---

## 🌟 今日亮点

**Qwen3.8 系列**毫无悬念地成为本周头条，其中旗舰模型 `Qwen3.8-27B` 一周内便斩获 **15,071 次点赞** 与 **770 万次下载**，辅以 `Qwen3.8-Flash-Next` 以及来自 Unsloth、ISTA-DASLab 和 DavidAU 的大量社区 GGUF 量化版本。**视频生成**领域持续爆发，由 `MiniMaxAI/MiniMax-H3`（5,266 次点赞）和新兴的 ComfyUI LoRA 生态领跑，同期上榜的还有 `Lightricks/LTX-2.5` 以及 `Minimax-h3_Singularity` 变体。**MoE 架构**显著崛起，代表作包括 `Edge0-35B-A3B` 和基于 `qwen3_5_moe` 构建的 `Nex-N2.5` 系列。与此同时，**音频/音乐生成**借助 `YuE2-3B` 与腾讯的零样本 TTS 模型 `AuK` 持续升温；时序预测领域则迎来 Google `timesfm-3.0` 的重磅助力。

---

## 🧠 语言模型

| 模型 | 作者 | 点赞 | 下载 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 15,071 | 7,703,400 | 本周榜首的 Qwen3.8 旗舰生成模型，具备对话与图文到文本能力。770 万次下载与 1.5 万次点赞彰显其在社区中被广泛采用，成为下游工作的基础底座。 |
| [Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct) | meta-llama | 7,592 | 5,620,539 | Meta 指令微调的 8B 模型依然是社区常青树，依托 Llama 3.1 系列持续走高的关注度。强劲的下载量反映出其作为开源权重默认基线模型的地位。 |
| [Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,198 | 645,881 | 更快的 Qwen3.8 实验变体（`qwen4_exp` 系列），专为低延迟对话场景优化。凭借图文到文本的灵活性以及"Flash"定位而走红。 |
| [DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 2,333 | 288,414 | DeepSeek 最新 Flash 版本，基于全新的 `deepseek_v41` 架构扩展图文到文本生成能力。凭借顶级开源实验室的高性价比多模态方案而备受关注。 |
| [GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,319 | 1,770,038 | 智谱 GLM-5.3 系列中最新加入的"Flash"成员，支持图文到文本与对话任务。177 万次下载量印证了 GLM 在开源 LLM 领域的持续扩张。 |
| [NeoHorse-1-4B](https://huggingface.co/TokenRhythm/NeoHorse-1-4B) | TokenRhythm | 1,754 | 9,520 | 基于 `qwen3_5_text` 骨干构建的紧凑型智能体文本模型，专为工具调用工作流设计。凭借小巧体量与智能体定位而上榜。 |
| [Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview) | Edge0 | 1,468 | 8,109 | 35B 参数的 MoE 模型仅激活约 3B 参数，提供 MLX 格式并标注"edge-inference"。体现出面向消费级硬件的高效 MoE 部署趋势。 |
| [MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,367 | 206,774 | OpenBMB 推出的第五代 MiniCPM 小模型，2B 参数下提供强劲性能。在 Llama 衍生路线中以效率与能力的均衡表现而走红。 |
| [bert-base-uncased](https://huggingface.co/google-bert/bert-base-uncased) | google-bert | 3,337 | 46,435,111 | 经典编码器模型，凭借作为 NLP 默认骨干的地位，依然保持 4600 万+ 的庞大下载量。3,337 次周点赞彰显其在教育与科研中经久不衰的价值。 |
| [distilbert-base-uncased](https://huggingface.co/distilbert/distilbert-base-uncased) | distilbert | 1,439 | 7,294,294,014 | 蒸馏版 BERT 仍是生产流水线中轻量级编码器的首选。持续走高的下载量凸显其在高效 NLP 基础设施中的重要角色。 |
| [gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 4,071 | 15,182,177 | OpenAI 的初代 GPT-2 仍以 4,071 次周点赞保持热度，印证了其奠基性地位。1500 万次下载量使其成为 Hugging Face 上永远的"Hello World"。 |
| [Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 1,163 | 24,084 | XHToken 旗下 `spark2_5` 系列中的 4B 文本生成模型。凭借 Spark 小模型生态的活跃迭代而走红。 |
| [Nex-N2.5-mini](https://huggingface.co/nex-agi/Nex-N2.5-mini) | nex-agi | 775 | 4,543 | nex-agi 推出的紧凑型 MoE 模型，基于 `qwen3_5_moe` 骨干构建，支持图文到文本。早期增长反映出该实验室向多模态 MoE 变体拓展的布局。 |
| [Nex-N2.5-Pro](https://huggingface.co/nex-agi/Nex-N2.5-Pro) | nex-agi | 630 | 30,489 | Nex-N2.5 系列的较大版本，同样基于 `qwen3_5_moe` 构建并支持多模态。3 万次下载量表明其在生产场景中的早期关注度高于 mini 版本。 |
| [Agnes-3.0-Flash](https://huggingface.co/Agnes-AI/Agnes-3.0-Flash) | Agnes-AI | 150 | 736 | Agnes-AI 推出的全新图文到文本"Flash"模型，标志着该实验室第三代模型的首次亮相。早期阶段呈现的高点赞下载比体现出社区的探索兴趣。 |

## 🎨 多模态与生成

| 模型 | 作者 | 点赞 | 下载 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,266 | 4,827,156 | 旗舰级图文到视频模型，也是 H3 生态的核心，上线数周即达成 480 万次下载。5,266 次周点赞使其成为榜单中最受欢迎的视频模型。 |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 3,807 | 1,559,653 | Lightricks 推出的新一代视频扩散模型，在单文件流水线中同时支持图生视频、文生视频与视频到视频。作为视频生成领域的强劲开源竞争者而走红。 |
| [clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32) | openai | 1,528 | 21,349,787 | OpenAI 经典 CLIP ViT-B/32 在零样本图像分类场景中依然占据主导地位。2100 万+ 的下载量使其成为史上使用最广泛的视觉语言模型之一。 |
| [mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 535 | 19,486 | Meta 推出的 3 亿参数大规模多语言语音（MMS）wav2vec2 预训练模型。作为覆盖 1000+ 语种的多语言语音识别基础而走红。 |
| [Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 387 | 141,057 | 社区调优版 H3 视频模型变体，以"Singularity"创意品牌命名。14.1 万次下载量反映出围绕 H3 基座的衍生需求十分旺盛。 |
| [YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 433 | 5,186 | m-a-p 团队推出的 3B 音乐生成模型，支持符号化规划与智能体编辑。作为 AI 音乐领域小众但高互动的代表上榜。 |
| [AuK](https://huggingface.co/tencent/AuK) | tencent | 208 | 1,928 | 腾讯推出的零样本 TTS 模型，具备声音克隆能力。作为本周期内少数来自头部实验室的开源 TTS 发布而备受关注。 |

## 🔧 专业模型

| 模型 | 作者 | 点赞 | 下载 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,958 | 252,806,720 | 事实上的默认句向量模型，下载量高达 2.52 亿+。5,958 次周点赞印证了其在语义搜索与 RAG 流水线中的持续统治力。 |
| [timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 784 | 826,017 | Google 第三代时序预测基础模型。作为本周期内头部实验室在时序领域最重磅的开源发布而走红。 |

## 📦 微调与量化

| 模型 | 作者 | 点赞 | 下载 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,056 | 10,077,938 | Unsloth 推出的 Qwen3.8-27B 官方 GGUF 量化版本，下载量突破 1000 万。作为在本地硬件上运行 Qwen3.8 的主要分发渠道而走红。 |
| [Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 993 | 819,784 | 采用 GSQ（梯度缩放量化）与 RCO 技术的实验性混合精度 GGUF。作为标准 Q4/Q5 GGUF 之外的研究级替代方案而走红。 |
| [Qwen3.8-27B-TURBO-Fable-Cold-Fusion-…-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 658 | 875,703 | 深度定制的 Qwen3.8-27B 衍生版本，融合 Unsloth + Heretic + 去审查微调。凭借 87.5 万次下载量，成为一站式"去审查编程"GGUF 方案。 |
| [GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8) | dealignai | 438 | 30,502 | 面向网络安全任务的领域专用 FP8 GLM-5.3 变体，已执行 abliteration 与拒答移除。作为安全 AI 领域的垂直化开源模型而走红。 |
| [MiniCPM5-2B-GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF) | openbmb | 223 | 108,471 | MiniCPM5-2B 的官方 GGUF 构建版本，兼容 llama.cpp 与本地推理。配合基础模型发布同步走红，助力边缘端部署。 |
| [Minimax-H3-ComfyUI](https://huggingface.co/Alissonerdx/Minimax-H3-ComfyUI) | Alissonerdx | 149 | 13,295 | 兼容 ComfyUI 的 H3 视频模型 LoRA 封装。作为首批将 H3 引入节点式工作流的社区适配器之一而走红。 |

---

## 📈 生态信号

本周热门榜单由阿里 **Qwen3.8 系列**主导，其在前 30 名中占据 6 席，涵盖基础模型、Flash-Next 以及四个量化/微调变体——清晰显示出 Qwen 在开源权重生态中的引力效应。**MiniMaxAI/MiniMax-H3 视频生成栈**迅速构建起自身飞轮：基础模型、实验性"Singularity"分支以及 ComfyUI LoRA 三者均在发布数周内同时走红。**MoE 架构**（来自 Edge0 与 nex-agi 的 `qwen3_5_moe` 衍生模型）以及**边缘/高效推理**显著提速，反映出社区对高质量、低激活参数量模型的强烈需求。量化生态依然稳健：Unsloth 的 GGUF 版本下载量持续突破千万，

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*