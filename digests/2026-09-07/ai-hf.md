# Hugging Face 热门模型周报 2026-09-07

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-07 13:28 UTC

---

# 🤗 Hugging Face 热门模型速递
**日期：2026-09-07**

---

## 🌟 今日亮点

Qwen 3.8 系列本周强势霸榜趋势榜，**Qwen3.8-27B** 旗舰模型、**Qwen3.8-Flash-Next** 以及大量社区 GGUF 与去审查微调同时上榜——这清晰表明 Qwen 已成下游工作的默认开源基座。智谱 AI 的 **GLM-5.3** 与 **GLM-5.3-Flash** 也闯入前十，预示着开放对话模型领域竞争白热化。生成模型方面，**MiniMax-H3** 凭借近 500 万下载量继续在文生视频领域高歌猛进，而 **DeepSeek-V4-Flash-Vision-Exp** 将 DeepSeek 路线带入原生多模态时代。GPT-2、BERT、CLIP、MiniLM 等老牌经典凭借庞大的下载量依然长青——这提醒我们，整个生态系统中仍有相当一部分运行在基础模型之上。

---

## 📊 各类别热门模型

### 🧠 语言模型

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,196 | 6,416,358 | 本周期 Qwen 旗舰级多模态发布，凭借图文到文本能力与强劲对话表现，以 1.4 万+ 周点赞和超 600 万下载量登顶趋势榜。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 4,964 | 474,693 | 面向吞吐量优化的轻量版 Qwen3.8 变体，隶属 qwen4_exp 系列，以多模态对话设计收获近 5 千点赞。 |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,123 | 784,005 | 智谱 GLM-5.3 系列的轻量姊妹版本，提供 Flash 级别延迟下的多模态对话能力，周点赞超过 2 千。 |
| [zai-org/GLM-5.3](https://huggingface.co/zai-org/GLM-5.3) | zai-org | 1,744 | 442,064 | 智谱全量级 GLM-5.3 MoE/DSA 文本生成模型，作为中国开源权重阵营对抗 Qwen3.8 的主力而强势上榜。 |
| [XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 659 | 7,216 | 紧凑型 4B Spark 2.5 LLM，凭借小巧的文本生成定位获得关注，点赞与下载比例突出，显示社区兴趣浓厚。 |
| [IFM/K2-Horizon-MoVA-36B-A4B](https://huggingface.co/IFM/K2-Horizon-MoVA-36B-A4B) | IFM | 193 | 2,226 | K2 Horizon 系列下的 36B MoE（激活 4B）文本生成模型，作为密集旗舰 LLM 的稀疏激活替代方案而上榜。 |

### 🎨 多模态与生成

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,990 | 4,990,034 | 旗舰级文生视频与图生视频扩散模型，下载量已突破约 500 万，是 Hub 上访问量最高的生成式视频模型之一。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 3,017 | 1,584,382 | 最新单文件扩散模型，支持图生视频、文生视频、视频生视频管线，凭借多任务视频通用性收获 3 千+ 点赞。 |
| [deepseek-ai/DeepSeek-V4-Flash-Vision-Exp](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp) | deepseek-ai | 782 | 251,611 | DeepSeek V4 Flash 的实验性视觉版本，是 DeepSeek V4 系列首个具备原生图文到文本能力的成员，因此上榜。 |
| [BreezeBlue/Breeze-TTS-2](https://huggingface.co/BreezeBlue/Breeze-TTS-2) | BreezeBlue | 468 | 6,754 | Breeze 家族的文生语音模型，基于 transformers 的语音合成能力让其在下载量尚低的情况下仍受追捧。 |
| [WarmBloodAban/Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 126 | 26,731 | 基于 MiniMax-H3 的社区微调版本，强化视频生视频与图生视频能力，在高级视频生成工作流中崭露头角。 |
| [OpenVDN/vdn-minimax-h3](https://huggingface.co/OpenVDN/vdn-minimax-h3) | OpenVDN | 218 | 0 | 基于 MiniMax-H3 的文生视频微调基座，尽管下载量为零仍冲上趋势榜——充分体现社区好奇心。 |
| [microsoft/VibeVoice-ASR-Streaming-7B](https://huggingface.co/microsoft/VibeVoice-ASR-Streaming-7B) | microsoft | 134 | 1,144 | 微软 7B 流式自动语音识别模型，VibeVoice 系列新成员，瞄准低延迟转写场景。 |
| [facebook/mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 264 | 12,213 | Meta 的 3 亿参数 wav2vec2 MMS 预训练检查点，作为多语言语音表征学习的基础设施上榜。 |

### 🔧 专用模型

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,576 | 251,367,312 | 经久不衰的句子相似度主力模型，下载量突破 2.51 亿次——Hub 上下载量最高的嵌入模型，几乎是每个 RAG 管线的标配。 |
| [openai-community/gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 3,711 | 14,629,637 | 2019 年的初代 GPT-2 仍保持周均 3.7 千点赞与 1400 万+ 下载，作为教学与原型参考模型展现出惊人的生命力。 |
| [google-bert/bert-base-uncased](https://huggingface.co/google-bert/bert-base-uncased) | google-bert | 2,991 | 50,747,373 | 经典的 BERT base 模型持续充当事实上的编码器骨干，累计 5000 万+ 下载支撑其顶级点赞数。 |
| [openai/clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32) | openai | 1,211 | 20,496,047 | OpenAI 的 CLIP ViT-B/32 零样本图像分类器仍是首选的视觉-语言编码器，累计 2000 万+ 下载，覆盖 PyTorch、TF、JAX 和 ONNX。 |
| [distilbert/distilbert-base-uncased](https://huggingface.co/distilbert/distilbert-base-uncased) | distilbert | 1,156 | 7,041,011 | 紧凑版蒸馏 BERT 保持 700 万+ 下载和 1.1 千周点赞，是生产管线中轻量级 fill-mask 编码器的首选。 |
| [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 543 | 271,713 | 谷歌第三代 TimesFM 时序预测基础模型，作为跨领域零样本预测的预训练骨干上榜。 |

### 📦 微调与量化

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 3,620 | 10,479,045 | Unsloth 出品的 Qwen3.8-27B 量化 GGUF 版本，凭借 1000 万+ 下载量成为消费级推理格式的王者。 |
| [OBLITERATUS/Qwen3.8-27B-OBLITERATED](https://huggingface.co/OBLITERATUS/Qwen3.8-27B-OBLITERATED) | OBLITERATUS | 1,117 | 1,024,582 | 移除拒绝机制的 Qwen3.8-27B 去审查版本，提供 MLX、safetensors 和 GGUF 格式，下载量超 100 万。 |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 988 | 1,629,754 | Qwen3.8-27B 的激进版多模态无审查 GGUF 微调，凭借支持视觉的无过滤行为收获近千点赞。 |
| [nvidia/Qwen3.8-Flash-Next-NVFP4](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-NVFP4) | nvidia | 129 | 18,068 | NVIDIA 通过 ModelOpt 优化的 NVFP4 量化版 Qwen3.8-Flash-Next，面向 Blackwell 级别 GPU 展示下一代 4-bit 精度。 |
| [orcarouter/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 769 | 292,633 | Qwen3.8 生态下的 Qwen3.8-27B 去审查 GGUF，是层出不穷的"无审查"社区微调中的又一力作。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 494 | 403,292 | 学术级 GSQ + RCO 混合精度 GGUF 量化版 Qwen3.8-27B，以 40.3 万下载量和研究级量化方案著称。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 273 | 258,896 | Qwen3.8-27B 的 Turbo 模式 MTP 微调，融合 "Heretic" 无审查配方与 NEO-CODER MAX 编程倾向，是长名复合微调的典型代表。 |
| [Jackrong/Qwopus3.8-27B-Flash-GGUF](https://huggingface.co/Jackrong/Qwopus3.8-27B-Flash-GGUF) | Jackrong | 134 | 60,343 | 兼容 llama.cpp 的 Qwen3.8-27B-Flash 视觉调优 GGUF 版本，面向消费级硬件上的多模态本地推理。 |
| [dealignai/GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8) | dealignai | 240 | 18,602 | 面向网络安全领域、采用 FP8 精度的 GLM-5.3 去审查版本，在安全 LLM 利基赛道中脱颖而出。 |

---

## 🛰️ 生态信号

Qwen 3.8 生态本周实际上已成为开源权重的核心底座：Qwen3.8-27B 与 Qwen3.8-Flash-Next 双旗舰霸占榜单头部，蜂拥而出的衍生 GGUF、去审查版本、NVFP4 量化及领域微调（网络安全、无审查、编程、MTP）印证了下游社区的蓬勃生机。智谱 GLM-5.3 是最有力的反向趋势——它开辟出平行的旗舰通道，并催生了自己专属的微调生态（网络安全 FP8、去审查版本）。与此同时，开源权重的势头明显分化成两条赛道：（1）来自中国头部实验室（Qwen、GLM、DeepSeek、K2-Horizon）规模更大、效率更高的旗舰模型；（2）充满活力的草根微调与量化层——Unsloth、ISTA-DASLab、NVIDIA ModelOpt、OBLITERATUS 以及众多社区作者——在每个旗舰发布数天内就将其转化为面向消费级 GPU 的、风格化变体。2019–2021 年的经典模型（GPT-2、BERT、CLIP、MiniLM）由于深度嵌入生产环境而依旧黏性十足；而生成式视频（MiniMax-H3、LTX-2.5）则是 LLM 之外最耀眼的新兴模态。

---

## ✨ 值得探索

1. **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)** —— 当前开源权重多模态 LLM 的明珠。凭借 1.4 万+ 周点赞和海量下游衍生模型，它是本周期最具影响力的基座模型，也是研究 27B 规模下现代多模态训练的最佳起点。

2. **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)** —— 接近 500 万下载的生产级文生视频基础模型。研究其架构、条件机制以及快速扩张的微调生态（例如 `WarmBloodAban/Minimax-h3_Singularity`、`OpenVDN/vdn-minimax-h3`），是掌握当前开放生成式视频领域最快捷的途径。

3. **[google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch)** —— LLM 与视频主流之外难得上榜的"异类"。谷歌第三代 TimesFM 是面向时序预测的基础模型，精彩展示了"基础模型"范式如何从文本和图像拓展至表格与序列领域。

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*