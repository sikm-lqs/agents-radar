# Hugging Face Trending Models Weekly 2026-09-07

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-09-07 01:51 UTC

---

# Hugging Face Trending Models Digest — 2026-09-07

## 1. Today's Highlights

The Qwen3.8 family overwhelmingly dominates the trending list, with Alibaba's flagship appearing in at least eight entries spanning the base model, the "Flash-Next" experimental variant, and a wave of community quantizations and "uncensored" fine-tunes. Chinese open-weight providers — Qwen, DeepSeek, Zhipu (GLM), Tencent (Hunyuan), MiniMaxAI, and ISTA-DASLab — continue to shape the leaderboard, while proprietary Western releases are absent from today's top 30. Video generation is the second hottest vertical, led by MiniMaxAI/MiniMax-H3 and Lightricks/LTX-2.5, each pulling multi-million downloads. Specialized audio (Breeze-TTS-2, VibeVoice-ASR, MMS-300M) and time-series forecasting (TimesFM 3.0) round out a notably broad, multimodal snapshot of the ecosystem.

---

## 2. Trending Models

### 🧠 Language Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,135 | 6,190,807 | Alibaba's flagship multimodal LLM with conversational and image-text-to-text capabilities. It tops the trending board by likes, signaling strong developer adoption of the Qwen3.8 generation. |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 4,943 | 432,966 | An experimental "Flash-Next" variant under Qwen4_exp tag, designed for fast multimodal inference. Its 4,943 weekly likes point to unusually high curiosity around the Qwen roadmap. |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,099 | 761,364 | Zhipu's efficient Flash-tier multimodal LLM built on the GLM5_next stack. Trending for combining vision-language support with low-latency deployment appeal. |
| [zai-org/GLM-5.3](https://huggingface.co/zai-org/GLM-5.3) | zai-org | 1,739 | 410,074 | Zhipu's flagship GLM-5.3 text LLM, notable for its MoE-DSA design. It is gaining traction as a serious open-weight alternative to closed frontier models. |
| [openai-community/gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 3,707 | 14,612,342 | The classic 2019 OpenAI GPT-2 still surfaces on trending lists, a reminder that foundational transformer checkpoints remain heavily downloaded for teaching and benchmarking. |
| [tencent/Hy4-preview](https://huggingface.co/tencent/Hy4-preview) | tencent | 445 | 6,441 | Tencent's preview of its Hunyuan v4 LLM (Hy_v4 stack). It is trending on novelty as one of the first public glimpses of the next Hunyuan generation. |
| [XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 615 | 5,477 | A compact 4B text-generation LLM on the Spark2.5 stack. Trending as a lightweight option for edge or local experimentation. |
| [IFM/K2-Horizon-MoVA-36B-A4B](https://huggingface.co/IFM/K2-Horizon-MoVA-36B-A4B) | IFM | 186 | 1,723 | A 36B/A4B MoE text-generation model on the K2-Horizon stack. Trending for its mixed active-parameter design that promises strong compute efficiency. |

### 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,968 | 4,986,349 | A text-to-video / image-to-video diffusion model that has already passed ~5M downloads. It is one of the most adopted open video generators on the Hub this cycle. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 2,970 | 1,526,928 | Lightricks' unified image-to-video / text-to-video / video-to-video diffusion model shipped as one file. Its single-file packaging is driving rapid developer uptake. |
| [deepseek-ai/DeepSeek-V4-Flash-Vision-Exp](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp) | deepseek-ai | 747 | 209,191 | DeepSeek's experimental vision-augmented Flash model on the DeepSeek v4 stack. Trending as an early peek into DeepSeek's multimodal direction. |
| [BreezeBlue/Breeze-TTS-2](https://huggingface.co/BreezeBlue/Breeze-TTS-2) | BreezeBlue | 461 | 6,357 | A transformer-based text-to-speech model in the Breeze family. Trending as one of the few open conversational TTS releases surfacing this week. |
| [microsoft/VibeVoice-ASR-Streaming-7B](https://huggingface.co/microsoft/VibeVoice-ASR-Streaming-7B) | microsoft | 116 | 889 | Microsoft's 7B streaming automatic speech recognition model on the VibeVoice stack. Trending as a rare open-weight enterprise-grade streaming ASR. |
| [openai/clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32) | openai | 1,211 | 20,579,479 | The enduring OpenAI vision-language backbone for zero-shot classification. It continues to trend thanks to its ubiquity as a multimodal foundation. |
| [facebook/mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 263 | 12,464 | Meta's 300M-parameter wav2vec2 multilingual speech pretraining checkpoint. Trending as a foundational audio pretraining resource for low-resource languages. |

### 🔧 Specialized Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,568 | 253,029,336 | The de-facto sentence-similarity embedding model with 253M+ downloads. It remains one of the most-used models on the Hub for retrieval and RAG pipelines. |
| [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 507 | 144,455 | Google's third-generation time-series foundation model. Trending as a rare production-grade open release for general forecasting workloads. |
| [google-bert/bert-base-uncased](https://huggingface.co/google-bert/bert-base-uncased) | google-bert | 2,989 | 52,338,347 | The canonical BERT base checkpoint for fill-mask and downstream NLP. Its 52M+ downloads reflect its persistent role as an academic and industrial baseline. |
| [distilbert/distilbert-base-uncased](https://huggingface.co/distilbert/distilbert-base-uncased) | distilbert | 1,156 | 7,054,316 | The lightweight distilled BERT for efficient NLP tasks. Trending as a go-to compact encoder for production pipelines. |

### 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 3,590 | 10,311,462 | Unsloth's GGUF quantization of Qwen3.8-27B with 10M+ downloads, by far the most-downloaded model on today's board. It dominates local llama.cpp deployments of Qwen3.8. |
| [OBLITERATUS/Qwen3.8-27B-OBLITERATED](https://huggingface.co/OBLITERATUS/Qwen3.8-27B-OBLITERATED) | OBLITERATUS | 1,107 | 995,160 | An abliterated (refusal-removed) Qwen3.8-27B released in MLX, safetensors, and GGUF formats. Trending as one of the most popular "abliterated" variants. |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 982 | 1,568,315 | An aggressive "uncensored" GGUF fine-tune of Qwen3.8-27B with MTP speculative decoding. Its high download count reflects strong demand for unfiltered local models. |
| [unsloth/Qwen3.8-Flash-Next-GGUF](https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF) | unsloth | 810 | 823,733 | Unsloth's GGUF quantization of the Qwen3.8-Flash-Next experimental model. Trending alongside its base model as the canonical local format. |
| [orcarouter/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 751 | 287,720 | Another abliterated GGUF variant of Qwen3.8-27B. Trending as part of the broader wave of "uncensored" Qwen derivatives. |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 469 | 348,389 | An experimental GSQ+RCO mixed-precision GGUF quantization of Qwen3.8-27B. Trending as a research-grade compression of the Qwen flagship. |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 248 | 211,018 | A heavily branded "Heretic uncensored coder" fine-tune of Qwen3.8-27B in GGUF format. Trending as a long-form demonstration of community prompt-branding trends. |
| [dealignai/GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8) | dealignai | 165 | 15,648 | An FP8-quantized, refusal-removed cybersecurity fine-tune of GLM-5.3. Trending as a niche domain specialization on top of an MoE-DSA base. |
| [nvidia/Qwen3.8-Flash-Next-NVFP4](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-NVFP4) | nvidia | 114 | 13,321 | NVIDIA's NVFP4-optimized Qwen3.8-Flash-Next checkpoint, produced via NVIDIA Model Optimizer. Trending as an early showcase of NVFP4 deployment viability. |
| [Jackrong/Qwopus3.8-27B-Flash-GGUF](https://huggingface.co/Jackrong/Qwopus3.8-27B-Flash-GGUF) | Jackrong | 130 | 22,128 | A llama.cpp-targeted GGUF variant of a Qwen3.8-27B Flash vision fine-tune. Trending in the experimental multimodal-local deployment niche. |
| [OpenVDN/vdn-minimax-h3](https://huggingface.co/OpenVDN/vdn-minimax-h3) | OpenVDN | 209 | 0 | A freshly fine-tuned text-to-video derivative of MiniMaxAI/MiniMax-H3. Trending on novelty despite zero downloads, indicating strong anticipation. |

---

## 3. Ecosystem Signal

The Qwen3.8 family is the unambiguous gravitational center of this week's Hugging Face trends, occupying nearly a third of the entire board and producing both the most-liked (Qwen3.8-27B, 14,135 likes) and most-downloaded (Unsloth's GGUF, 10.3M downloads) entries. Chinese open-weight labs — Alibaba (Qwen), DeepSeek, Zhipu (GLM), Tencent (Hunyuan), MiniMaxAI, and ISTA-DASLab — collectively dominate the leaderboard, while no Western proprietary model appears, reflecting the open-weights gap that has widened through 2026. Quantization is unusually active and diverse: GGUF (Unsloth, DavidAU, HauhauCS), FP8 (dealignai), NVFP4 (NVIDIA), and GSQ+RCO mixed-precision (ISTA-DASLab) all surface, suggesting the community is stress-testing multiple compression regimes on the same base. A second clear pattern is the rise of "abliterated" and "uncensored" fine-tunes (OBLITERATUS, HauhauCS, orcarouter, DavidAU), which now command substantial downloads and have effectively become a sub-genre of open LLM distribution. Meanwhile, video generation has matured into a first-class category with two models — MiniMax-H3 and LTX-2.5 — pulling multi-million downloads each.

---

## 4. Worth Exploring

- **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)** — Worth studying as the canonical reference implementation of the Qwen3.8 multimodal stack; its 14,135 weekly likes and 6.19M downloads make it the most community-validated open LLM of the moment, ideal for benchmarking new training recipes or fine-tuning pipelines.
- **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)** — The strongest candidate for exploring state-of-the-art open video synthesis: a single backbone handling text-to-video, image-to-video, and image-text-to-video with nearly 5M downloads and a clean diffusers integration.
- **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** — The de-facto local-deployment reference for Qwen3.8-27B; with 10.3M downloads it is the most-used quantized LLM on the Hub, making it the best starting point for studying llama.cpp workflows, speculative decoding, and on-device inference patterns.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*