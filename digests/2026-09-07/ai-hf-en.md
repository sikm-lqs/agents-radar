# Hugging Face Trending Models Weekly 2026-09-07

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-09-07 01:16 UTC

---

# 🤗 Hugging Face Trending Models Digest — 2026-09-07

## 1. Today's Highlights

The Qwen3.8 family from Alibaba continues to dominate the trending list, with **Qwen3.8-27B** (14,132 likes) and **Qwen3.8-Flash-Next** (4,943 likes) leading both like counts and downloads, spawning an entire ecosystem of GGUF, NVFP4, and "abliterated" community derivatives. Chinese open-weight labs — DeepSeek, Zhipu (GLM), Tencent (Hunyuan), MiniMax (Hailuo), and Xunzi/Spark — collectively occupy the chart, signaling a clear shift away from U.S.-centric frontier models on the open hub. Meanwhile, video generation surges with **MiniMaxAI/MiniMax-H3** (4,968 likes) and **Lightricks/LTX-2.5** (2,968 likes) racing toward the top, while NVIDIA's new **NVFP4** quantization format debuts on the leaderboard alongside mature GGUF variants from unsloth.

## 2. Trending Models

### 🧠 Language Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,132 | 6,190,807 | Flagship multimodal chat model from Alibaba with image-text-to-text support, currently the most-liked model on the hub. Its release has driven a wave of community quantizations and uncensored forks. |
| [Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 4,943 | 432,966 | Experimental "Flash" generation built on the new qwen4_exp architecture, optimized for speed while retaining multimodal capabilities. Heavy early traction despite being a preview release. |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,968 | 4,986,349 | *(video generation — see Multimodal table)* |
| [GPT-2](https://huggingface.co/openai-community/gpt2) | openai-community | 3,707 | 14,612,342 | The historic OpenAI 1.5B autoregressive model, still ranking among the top downloads as an enduring baseline and educational reference. A testament to community longevity. |
| [GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,099 | 761,364 | Zhipu's lightweight multimodal chat model on the glm5_next architecture, designed as a fast counterpart to the larger GLM-5.3. Strong downloads indicate production adoption. |
| [GLM-5.3](https://huggingface.co/zai-org/GLM-5.3) | zai-org | 1,738 | 410,074 | Zhipu's flagship text-generation model using the glm_moe_dsa (MoE with dense-shared architecture), targeted at conversational workloads. Trending thanks to its open weights and competitive benchmarks. |
| [Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 602 | 5,477 | Compact 4B text-generation model from the Spark family, notable for fitting aggressive inference budgets while retaining conversational quality. Trending as a small-footprint alternative to 20B+ models. |
| [Hy4-preview](https://huggingface.co/tencent/Hy4-preview) | tencent | 445 | 6,441 | Tencent's preview of the next-generation Hunyuan model on the hy_v4 architecture. Early preview release is generating buzz for Hunyuan's continued open-weight cadence. |
| [K2-Horizon-MoVA-36B-A4B](https://huggingface.co/IFM/K2-Horizon-MoVA-36B-A4B) | IFM | 186 | 1,723 | Mixture-of-Variants architecture with 36B total parameters and ~4B active — combining routing innovations from the K2-Horizon family. Trending as an experimental MoE design study. |

### 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [DeepSeek-V4-Flash-Vision-Exp](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp) | deepseek-ai | 747 | 209,191 | Experimental vision-augmented variant of DeepSeek's V4 Flash line, integrating image-text-to-text capabilities into the V4 family. Trending for bringing frontier multimodal reasoning into the Flash tier. |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 2,968 | 1,526,928 | Unified image-to-video, text-to-video, and video-to-video diffusion model from Lightricks, distributed as a single-file checkpoint. Top trending video model with over 1.5M downloads. |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,968 | 4,986,349 | Hailuo's flagship image-and-text-to-video generation model, ranking 4th in weekly likes. Its strong like-to-download ratio signals creators are actively using it for short-form video synthesis. |
| [CLIP-ViT-Base-Patch32](https://huggingface.co/openai/clip-vit-base-patch32) | openai | 1,211 | 20,579,479 | Foundational zero-shot image-classification model pairing ViT with contrastive language pretraining. Remains a backbone for countless downstream vision pipelines, with 20M+ downloads. |
| [Breeze-TTS-2](https://huggingface.co/BreezeBlue/Breeze-TTS-2) | BreezeBlue | 460 | 6,357 | Second-generation text-to-speech model from the Breeze line, combining text-generation and TTS pipelines. Trending as a fresh open TTS option amid a crowded commercial landscape. |
| [VibeVoice-ASR-Streaming-7B](https://huggingface.co/microsoft/VibeVoice-ASR-Streaming-7B) | microsoft | 115 | 889 | Microsoft's 7B streaming automatic speech recognition model targeting real-time transcription workloads. Low downloads but trending as one of the few open streaming-ASR options at this scale. |

### 🔧 Specialized Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,568 | 253,029,336 | Compact sentence-similarity embedding model that is the single most-downloaded model on the list at over 253M downloads. Trending for its ubiquity in RAG and semantic-search pipelines. |
| [bert-base-uncased](https://huggingface.co/google-bert/bert-base-uncased) | google-bert | 2,989 | 52,338,347 | The canonical bidirectional encoder from Google, still widely used for fill-mask pretraining and as a backbone. A "classic" pick that has aged remarkably well in download volume. |
| [distilbert-base-uncased](https://huggingface.co/distilbert/distilbert-base-uncased) | distilbert | 1,156 | 7,054,316 | Distilled BERT offering ~97% of BERT's quality at 60% of the size, optimized for edge inference. Remains a default lightweight encoder in production NLP stacks. |
| [timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 505 | 144,455 | Google's third-generation time-series foundation model for zero-shot forecasting. Rare open release from a frontier lab dedicated to temporal prediction tasks. |
| [mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 263 | 12,464 | Meta's 300M-parameter Massively Multilingual Speech wav2vec2 pretraining checkpoint covering 1,000+ languages. Trending as a multilingual speech-feature backbone for low-resource languages. |

### 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-27B-GGUF (unsloth)](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 3,589 | 10,311,462 | Unsloth's GGUF quantization of Qwen3.8-27B, currently the most-downloaded Qwen3.8 artifact at 10M+. Trending as the de-facto local-inference packaging for the new Qwen flagship. |
| [Qwen3.8-27B-OBLITERATED](https://huggingface.co/OBLITERATUS/Qwen3.8-27B-OBLITERATED) | OBLITERATUS | 1,107 | 995,160 | Abliterated (refusal-removed) Qwen3.8-27B distributed in MLX, safetensors, and GGUF formats. Highest-liked "uncensored" fine-tune on the list, with nearly 1M downloads. |
| [Qwen3.8-Flash-Next-GGUF (unsloth)](https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF) | unsloth | 810 | 823,733 | GGUF quantization of the experimental Qwen3.8-Flash-Next, extending local-inference coverage to the qwen4_exp architecture. Critical for testing the new architecture on consumer hardware. |
| [Qwen3.8-27B-Uncensored (orcarouter)](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 751 | 287,720 | Abliterated GGUF variant of Qwen3.8-27B emphasizing safety-filter removal. Trending alongside other uncensored forks as a parallel micro-genre within Qwen3.8 derivatives. |
| [Qwen3.8-27B-Uncensored-HauhauCS-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 981 | 1,568,315 | "Aggressive" multimodal MTP-trained Qwen3.8-27B fine-tune in GGUF. Among the most-downloaded community fine-tunes of the week, signaling strong demand for image-aware uncensored models. |
| [Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 469 | 348,389 | Research-grade GSQ (gradient-scaled quantization) combined with RCO (rate-constrained optimization) for Qwen3.8-27B. Trending for demonstrating mixed-precision quantization techniques from ISTA-DASLab. |
| [Qwen3.8-27B-TURBO-Cold-Fusion-Heretic-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 248 | 211,018 | Stacked-merge Qwen3.8-27B variant blending "Cold Fusion", "Heretic", and "NEO-CODER MAX" recipes for aggressive coding and uncensored tasks. Representative of the multi-tag fine-tune culture. |
| [Qwen3.8-Flash-Next-NVFP4](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-NVFP4) | nvidia | 114 | 13,321 | NVIDIA's NVFP4-quantized Qwen3.8-Flash-Next built with NVIDIA Model Optimizer. Trending as the launch vehicle for the new NVFP4 format on the hub. |
| [GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8) | dealignai | 163 | 15,648 | Abliterated, refusal-removed GLM-5.3 fine-tune targeting cybersecurity use-cases in FP8 precision. Niche but notable as a domain-specialized fork. |
| [Qwopus3.8-27B-Flash-GGUF](https://huggingface.co/Jackrong/Qwopus3.8-27B-Flash-GGUF) | Jackrong | 130 | 22,128 | llama.cpp-built GGUF quantization of a 27B "Flash" variant, packaged for efficient local inference. Trending as part of the broader 27B-class local stack. |
| [vdn-minimax-h3](https://huggingface.co/OpenVDN/vdn-minimax-h3) | OpenVDN | 209 | 0 | First public fine-tune of MiniMax-H3 for text-to-video. Trending on reputation alone — 0 downloads yet — making it a pure hype-and-curiosity signal. |

## 3. Ecosystem Signal

The Qwen3.8 family has effectively become the **Linux of foundation models** on Hugging Face — the default base for community experimentation. Eight of the thirty trending entries are Qwen3.8 derivatives (Qwen, unsloth, DavidAU, OBLITERATUS, HauhauCS, orcarouter, ISTA-DASLab, NVIDIA, Jackrong), and that doesn't count the count of multimodal flash variants. Chinese open-weight labs — Qwen, DeepSeek, Zhipu, Tencent, MiniMax, and Spark — collectively command the upper half of the chart, a stark shift from the GPT/Llama-dominated landscape of 2024–2025.

**Quantization is now a first-class delivery channel.** Unsloth alone accounts for two of the top entries, and NVIDIA's introduction of **NVFP4** (model-opt) signals that FP4-class formats are entering the mainstream for next-gen architectures. The "abliterated" / "uncensored" sub-genre has consolidated into its own micro-trend — OBLITERATUS, orcarouter, and HauhauCS each crossed 1k likes — pointing to a durable community segment that prefers open-weight safety-filter removal over commercial uncensored offerings. Meanwhile, video generation is the **hottest modality** right now: MiniMax-H3 and LTX-2.5 together pulled 7,936 likes, more than any single LLM besides Qwen3.8-27B itself.

## 4. Worth Exploring

1. **[Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)** — Built on the experimental `qwen4_exp` architecture, this is the closest thing the open hub has to a peek at the Qwen4 generation. Worth studying because it sets the architectural baseline for what will likely be Alibaba's next flagship, and at 4,943 likes it's already one of the most discussed models of the week.

2. **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)** — The clear top open-weight video model right now (4,968 likes, 4.9M downloads) and the basis of an emerging fine-tune ecosystem (OpenVDN). Worth trying if you need short-form text/image-to-video generation without paying for closed APIs like Sora or Veo.

3. **[nvidia/Qwen3.8-Flash-Next-NVFP4](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-NVFP4)** — A launch artifact for NVIDIA's new **NVFP4** quantization format via the Model Optimizer toolkit. Worth studying because NVFP4 will likely become the default 4-bit precision for next-generation consumer and datacenter GPUs, and this is the canonical reference implementation to learn from.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*