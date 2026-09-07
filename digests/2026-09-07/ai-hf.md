# Hugging Face 热门模型周报 2026-09-07

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-07 01:51 UTC

---

# Hugging Face 热门模型速览 — 2026-09-07

## 1. 今日要点

Qwen3.8 系列在热门榜单上呈现压倒性优势，阿里巴巴的旗舰模型至少在八个条目中亮相，涵盖基础模型、"Flash-Next" 实验变体，以及一波社区量化版和"无审查"微调版本。中国的开源权重厂商——Qwen、DeepSeek、智谱（GLM）、腾讯（混元）、MiniMaxAI 和 ISTA-DASLab——继续主导排行榜，而西方专有模型在今日前 30 名中缺席。视频生成是第二大热门方向，由 MiniMaxAI/MiniMax-H3 和 Lightricks/LTX-2.5 领跑，两者的下载量均达数百万级。专业音频（Breeze-TTS-2、VibeVoice-ASR、MMS-300M）和时间序列预测（TimesFM 3.0）共同构成了一个相当多元、多模态的生态快照。

---

## 2. 热门模型

### 🧠 语言模型

| 模型 | 作者 | 点赞数 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,135 | 6,190,807 | 阿里巴巴的多模态旗舰大语言模型，具备对话和图像-文本到文本能力。它以点赞数高居热门榜首位，标志着开发者对 Qwen3.8 一代的高度采纳。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 4,943 | 432,966 | 归属于 Qwen4_exp 标签的"Flash-Next"实验变体，专为快速多模态推理设计。4,943 的周点赞数显示社区对 Qwen 路线图抱有异常强烈的好奇心。 |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,099 | 761,364 | 智谱在 GLM5_next 架构上构建的高效 Flash 级多模态大语言模型。凭借视觉语言支持与低延迟部署的结合而登上热门。 |
| [zai-org/GLM-5.3](https://huggingface.co/zai-org/GLM-5.3) | zai-org | 1,739 | 410,074 | 智谱的旗舰 GLM-5.3 文本大语言模型，因其 MoE-DSA 设计而备受关注。作为闭源前沿模型的替代方案，它正在赢得可观的开源权重认可度。 |
| [openai-community/gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 3,707 | 14,612,342 | 经典的 2019 年 OpenAI GPT-2 仍会出现在热门榜单上，说明基础 Transformer 检查点在教学与基准测试中依然被大量下载。 |
| [tencent/Hy4-preview](https://huggingface.co/tencent/Hy4-preview) | tencent | 445 | 6,441 | 腾讯对其混元 v4 大语言模型（Hy_v4 架构）的预览版本。作为下一代混元模型的首批公开亮相之一，凭借新鲜感登上热门。 |
| [XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 615 | 5,477 | 基于 Spark2.5 架构的紧凑型 4B 文本生成大语言模型。作为边缘或本地实验的轻量选项登上热门。 |
| [IFM/K2-Horizon-MoVA-36B-A4B](https://huggingface.co/IFM/K2-Horizon-MoVA-36B-A4B) | IFM | 186 | 1,723 | 基于 K2-Horizon 架构的 36B/A4B MoE 文本生成模型。凭借其混合激活参数设计所承诺的高计算效率而登上热门。 |

### 🎨 多模态与生成

| 模型 | 作者 | 点赞数 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,968 | 4,986,349 | 文本到视频/图像到视频扩散模型，下载量已突破约 500 万。它是本周期 Hub 上采用度最高的开源视频生成器之一。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 2,970 | 1,526,928 | Lightricks 推出的统一图像到视频/文本到视频/视频到视频扩散模型，以单一文件形式发布。其单文件封装方式正在加速开发者的采用。 |
| [deepseek-ai/DeepSeek-V4-Flash-Vision-Exp](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp) | deepseek-ai | 747 | 209,191 | DeepSeek 基于 DeepSeek v4 架构推出的实验性视觉增强 Flash 模型。作为 DeepSeek 多模态方向的早期预览而登上热门。 |
| [BreezeBlue/Breeze-TTS-2](https://huggingface.co/BreezeBlue/Breeze-TTS-2) | BreezeBlue | 461 | 6,357 | Breeze 系列中基于 Transformer 的文本转语音模型。作为本周少数登场的开源对话式 TTS 发布之一而登上热门。 |
| [microsoft/VibeVoice-ASR-Streaming-7B](https://huggingface.co/microsoft/VibeVoice-ASR-Streaming-7B) | microsoft | 116 | 889 | 微软基于 VibeVoice 架构的 7B 流式自动语音识别模型。作为罕见的开源权重企业级流式 ASR 而登上热门。 |
| [openai/clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32) | openai | 1,211 | 20,579,479 | 经久不衰的 OpenAI 视觉语言骨干网络，专为零样本分类设计。作为多模态基础模型的普遍存在，它持续保持热度。 |
| [facebook/mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 263 | 12,464 | Meta 的 3 亿参数 wav2vec2 多语言语音预训练检查点。作为低资源语言的基础音频预训练资源而登上热门。 |

### 🔧 专业模型

| 模型 | 作者 | 点赞数 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,568 | 253,029,336 | 事实上的句子相似度嵌入模型，下载量超过 2.53 亿。它仍是 Hub 上用于检索与 RAG 流水线的使用最广泛的模型之一。 |
| [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 507 | 144,455 | 谷歌第三代时间序列基础模型。作为罕见、达到生产级质量的开源发布，用于通用预测工作负载。 |
| [google-bert/bert-base-uncased](https://huggingface.co/google-bert/bert-base-uncased) | google-bert | 2,989 | 52,338,347 | 用于填充掩码和下游 NLP 任务的经典 BERT 基础检查点。其超过 5,200 万的下载量反映了它作为学术与工业基线模型的持久地位。 |
| [distilbert/distilbert-base-uncased](https://huggingface.co/distilbert/distilbert-base-uncased) | distilbert | 1,156 | 7,054,316 | 用于高效 NLP 任务的轻量级蒸馏版 BERT。作为生产流水线中首选的紧凑编码器登上热门。 |

### 📦 微调与量化

| 模型 | 作者 | 点赞数 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 3,590 | 10,311,462 | Unsloth 推出的 Qwen3.8-27B GGUF 量化版本，下载量超过 1,000 万，是今日榜单上下载量最高的模型。它主导着 Qwen3.8 的本地 llama.cpp 部署。 |
| [OBLITERATUS/Qwen3.8-27B-OBLITERATED](https://huggingface.co/OBLITERATUS/Qwen3.8-27B-OBLITERATED) | OBLITERATUS | 1,107 | 995,160 | 移除拒绝行为的 Qwen3.8-27B"abliterated"版本，提供 MLX、safetensors 和 GGUF 三种格式。作为最受欢迎的"abliterated"变体之一登上热门。 |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 982 | 1,568,315 | 带有 MTP 推测解码的激进"无审查"GGUF 微调版本。其高下载量反映了社区对无过滤本地模型的强劲需求。 |
| [unsloth/Qwen3.8-Flash-Next-GGUF](https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF) | unsloth | 810 | 823,733 | Unsloth 对 Qwen3.8-Flash-Next 实验模型的 GGUF 量化版本。作为其基础模型对应的标准本地格式，与基础模型一同登上热门。 |
| [orcarouter/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 751 | 287,720 | 另一款 Qwen3.8-27B 的"abliterated"GGUF 变体。作为更广泛"无审查"Qwen 衍生模型浪潮的一部分登上热门。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 469 | 348,389 | 实验性的 GSQ+RCO 混合精度 GGUF 量化版本。作为 Qwen 旗舰模型的科研级压缩方案登上热门。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 248 | 211,018 | Qwen3.8-27B 的"Heretic 无审查编程"重度品牌化 GGUF 微调版本。作为社区长命名品牌化趋势的典型示例登上热门。 |
| [dealignai/GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8) | dealignai | 165 | 15,648 | 基于 MoE-DSA 底座、移除拒绝行为、FP8 量化的网络安全领域微调版本。作为利基领域的专业化示例登上热门。 |
| [nvidia/Qwen3.8-Flash-Next-NVFP4](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-NVFP4) | nvidia | 114 | 13,321 | NVIDIA 通过 NVIDIA Model Optimizer 产出的 Qwen3.8-Flash-Next NVFP4 优化检查点。作为 NVFP4 部署可行性的早期展示而登上热门。 |
| [Jackrong/Qwopus3.8-27B-Flash-GGUF](https://huggingface.co/Jackrong/Qwopus3.8-27B-Flash-GGUF) | Jackrong | 130 | 22,128 | 面向 llama.cpp 的 Qwen3.8-27B Flash 视觉微调版 GGUF 变体。在实验性的多模态本地部署利基方向登上热门。 |
| [OpenVDN/vdn-minimax-h3](https://huggingface.co/OpenVDN/vdn-minimax-h3) | OpenVDN | 209 | 0 | 基于 MiniMaxAI/MiniMax-H3 的全新文本转视频微调衍生版本。尽管下载量为零，仍凭借新鲜感登上热门，表明社区对其有强烈期待。 |

---

## 3. 生态信号

Qwen3.8 系列是本周 Hugging Face 热门榜无可争议的引力中心，几乎占据整个榜单的三分之一，并同时产生了点赞数最高（Qwen3.8-27B，14,135 点赞）和下载量最高（Unsloth 的 GGUF 版本，1,030 万下载）的条目。中国的开源权重实验室——阿里巴巴（Qwen）、DeepSeek、智谱（GLM）、腾讯（混元）、MiniMaxAI 和 ISTA-DASLab——集体主导排行榜，没有任何西方专有模型出现，这反映出 2026 年以来开源权重与闭源模型之间不断扩大的差距。量化活动异常活跃且形式多样：GGUF（Unsloth、DavidAU、HauhauCS）、FP8（dealignai）、NVFP4（NVIDIA）以及 GSQ+RCO 混合精度（ISTA-DASLab）均悉数登场，表明社区正在同一底座上对多种压缩方案进行压力测试。第二个显著趋势是"abliterated"和"无审查"微调版本的崛起（OBLITERATUS、HauhauCS、orcarouter、DavidAU），它们如今已获得可观的下载量，并事实上成为开源大语言模型分发的一个子类。与此同时，视频生成已成熟为一类核心方向，MiniMax-H3 和 LTX-2.5 两款模型的下载量均达数百万级别。

---

## 4. 值得探索

- **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)** — 值得作为 Qwen3.8 多模态架构的规范参考样本来研究；其 14,135 周点赞和 619 万下载量使其成为当下社区验证度最高的开源大语言模型，非常适合作为新训练方案或微调流水线的基准。
- **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)** — 探索前沿开源视频合成的最强候选：单一骨干网络即可处理文本到视频、图像到视频以及图像-文本到视频，下载量接近 500 万，并与 diffusers 集成良好。
- **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** — 事实上的 Qwen3.8-27B 本地部署参考；凭借 1,030 万下载量，它是 Hub 上使用最广泛的量化大语言模型，也是研究 llama.cpp 工作流、推测解码以及端侧推理模式的最佳起点。

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*