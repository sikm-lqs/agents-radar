# Hugging Face Trending Models Weekly 2026-09-14

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-09-13 23:30 UTC

---

# 🤗 Hugging Face Trending Models Digest — 2026-09-14

---

## 1. Today's Highlights

Qwen3.8 continues its dominance this week, with **Qwen3.8-27B** amassing an extraordinary 14,969 weekly likes and over 7.7M downloads — the single most-engaged model on the Hub. The experimental **Qwen3.8-Flash-Next** (tagged `qwen4_exp`) is also surging, suggesting Alibaba is previewing next-gen architecture directions. **Lightricks/LTX-2.5** and **MiniMaxAI/MiniMax-H3** lead a renewed wave of high-quality video generation releases, while edge-inference MoE models like **Edge0-35B-A3B-preview** point to a growing demand for locally-deployable reasoning. Quantization activity around Qwen3.8-27B is intense, with unsloth and ISTA-DASLab GGUF variants each clearing 4-figure like counts alongside the base model.

---

## 2. Trending Models

### 🧠 Language Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,969 | 7,768,964 | The flagship Qwen3.8 release — a 27B multimodal-chat model and this week's runaway leader with 14,969 weekly likes. Its conversational quality and broad instruction-following make it the de-facto open baseline for current-generation chat workloads. |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,164 | 624,390 | A smaller "Flash" variant tagged `qwen4_exp`, hinting at the next Qwen architecture iteration. Trending strongly thanks to its speed/cost profile and early-access curiosity from the community. |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 2,200 | 244,457 | DeepSeek's V4.1 "Flash" tier — a compact image-text-to-text model optimized for throughput. It's trending as a strong open-weight alternative for budget-conscious multimodal deployments. |
| [TokenRhythm/NeoHorse-1-4B](https://huggingface.co/TokenRhythm/NeoHorse-1-4B) | TokenRhythm | 1,737 | 7,979 | A 4B agentic text model built on the qwen3_5_text backbone, gaining attention for its tool-use focus. Trending because small agentic models are scarce and the downloads-per-like ratio is rising fast. |
| [openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,339 | 150,110 | MiniCPM5 in its 2B configuration — a highly efficient small LLM. It's trending as a go-to edge-device baseline thanks to its llama-derived architecture and strong benchmark-per-parameter ratio. |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,304 | 1,576,209 | Zhipu AI's GLM-5.3 Flash — a multimodal-chat model with the new `glm5_next` architecture tag. Trending for pushing open-weight quality on image-text reasoning at the flash tier. |
| [XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 1,154 | 21,336 | A 4B text model from the Spark2.5 family, positioned as a lightweight general-purpose LLM. Trending in the Asian-language ecosystem for its multilingual coverage at low parameter count. |
| [Edge0/Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview) | Edge0 | 1,026 | 3,552 | A 35B-parameter MoE with 3B active — built on qwen3_5_moe and packaged for MLX edge inference. Trending as one of the first preview models explicitly targeting Apple Silicon / local MoE serving. |
| [Agnes-AI/Agnes-3.0-Flash](https://huggingface.co/Agnes-AI/Agnes-3.0-Flash) | Agnes-AI | 138 | 474 | An early Agnes-3.0 flash release — a multimodal text-generation model from a newer entrant. Trending on novelty despite low absolute downloads, signaling community interest in emerging labs. |
| [nex-agi/Nex-N2.5-mini](https://huggingface.co/nex-agi/Nex-N2.5-mini) | nex-agi | 755 | 3,970 | A mini MoE built on qwen3_5_moe with image-text-to-text capability. Trending as a cost-efficient multimodal baseline in the emerging Nex family. |
| [nex-agi/Nex-N2.5-Pro](https://huggingface.co/nex-agi/Nex-N2.5-Pro) | nex-agi | 623 | 30,289 | The Pro-tier counterpart in Nex-N2.5, also qwen3_5_moe-based with multimodal support. Trending for offering higher-quality outputs at competitive parameter counts. |
| [openai-community/gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 4,030 | 15,158,496 | The classic GPT-2 — still pulling thousands of weekly likes thanks to its role as a teaching and benchmarking artifact. Its enduring presence confirms HF Hub's archival role for foundational models. |

### 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,237 | 4,819,845 | A flagship image-text-to-video generation model — the dominant video release this week with 5,237 likes. Trending for its strong prompt-following across both text-to-video and image-to-video modes. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 3,738 | 1,548,442 | LTX-2.5 is a diffusion single-file model supporting image-to-video, text-to-video, and video-to-video in one weight. Trending for unifying multiple video pipelines and shipping as a single deployable file. |
| [WarmBloodAban/Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 371 | 123,491 | A community-tuned variant of the Minimax-h3 video model branded "Singularity." Trending among video-generation enthusiasts for pushing stylistic boundaries on the base architecture. |
| [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 402 | 3,707 | A 3B text-to-audio model specialized for music generation with symbolic planning and agentic editing features. Trending as a rare open model that combines long-form music generation with controllable editing hooks. |
| [tencent/AuK](https://huggingface.co/tencent/AuK) | tencent | 189 | 1,202 | Tencent's AuK — a zero-shot TTS system with voice cloning. Trending for bringing industrial-grade voice-cloning quality to the open community at a small download footprint. |
| [Viggle/Viggle-Animate](https://huggingface.co/Viggle/Viggle-Animate) | Viggle | 215 | 0 | A video-to-video pipeline focused on character replacement and animation editing. Trending on novelty and zero initial downloads suggest pre-launch hype among video-editing developers. |

### 🔧 Specialized Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,927 | 252,928,721 | The canonical compact sentence-embedding model with cross-framework support (PyTorch, TF, Rust, ONNX). Trending perpetually thanks to ~253M downloads — by far the most-downloaded model on the Hub. |
| [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 774 | 797,832 | Google's TimesFM 3.0 — a pretrained time-series foundation model with a PyTorch port. Trending as one of the few credible open foundation models for forecasting at production scale. |
| [Qwen/Qwen-Drive-1.0-4B](https://huggingface.co/Qwen/Qwen-Drive-1.0-4B) | Qwen | 196 | 4,119 | A 4B model purpose-built for autonomous driving motion planning under the `qwen_drive` family. Trending as a rare open-weights release for end-to-end driving policy research. |
| [facebook/mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 526 | 12,880 | Meta's 300M-parameter multilingual speech (wav2vec2) pretraining checkpoint covering 1,000+ languages. Trending as a foundational resource for low-resource speech research. |
| [google-bert/bert-base-uncased](https://huggingface.co/google-bert/bert-base-uncased) | google-bert | 3,300 | 46,513,338 | The original BERT base — a fill-mask encoder still defining NLP pedagogy. Trending with 46M+ downloads as the de-facto baseline for encoder fine-tuning and probing studies. |
| [distilbert/distilbert-base-uncased](https://huggingface.co/distilbert/distilbert-base-uncased) | distilbert | 1,433 | 7,325,282 | The distilled BERT — offering ~97% of BERT's quality at 60% of the size. Trending as the standard lightweight encoder for production NLP pipelines. |
| [openai/clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32) | openai | 1,499 | 21,331,361 | OpenAI's CLIP ViT-B/32 — a zero-shot image-classification vision-language encoder. Trending for its foundational role in retrieval, captioning, and modern multimodal research. |

### 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,009 | 11,005,880 | The community-standard GGUF quantization of Qwen3.8-27B from unsloth. Trending massively (11M+ downloads) as the primary delivery format for llama.cpp / Ollama users running Qwen3.8 locally. |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 969 | 769,557 | A Qwen3.8-27B GGUF variant using GSQ and RCO mixed-precision quantization. Trending for pushing accuracy-preserving low-bit compression, attractive for researchers benchmarking quant techniques. |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 632 | 750,591 | An aggressively-named community fine-tune of Qwen3.8-27B with MTP (multi-token prediction) and uncensored / coding emphasis. Trending in the roleplay-and-coder fine-tune ecosystem for its turbo/MTP claims. |
| [openbmb/MiniCPM5-2B-GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF) | openbmb | 216 | 99,716 | The official GGUF quantization of MiniCPM5-2B. Trending as the canonical local-deploy format for the MiniCPM5 line on consumer hardware. |
| [dealignai/GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8) | dealignai | 431 | 30,310 | A GLM-5.3 derivative fine-tuned for cybersecurity tasks, with refusals removed and FP8 weights. Trending among security researchers for offering a domain-specialized open model in a memory-friendly precision. |

---

## 3. Ecosystem Signal

The Qwen3.8 family is unambiguously the gravitational center of this week's Hub — **every** top-5 model by downloads is either Qwen3.8 directly or a derivative, and the experimental **Qwen3.8-Flash-Next** with `qwen4_exp` tags hints at imminent architectural evolution. The presence of three independent GGUF quantizers (unsloth, ISTA-DASLab, DavidAU) plus the official weights underscores a robust **open-weight ecosystem**: third parties are confidently betting infrastructure around Qwen before proprietary incumbents can match ecosystem momentum.

Edge-inference MoE is the other clear story. **Edge0-35B-A3B-preview** and the qwen3_5_moe-based Nex-N2.5 models suggest a maturation of sparse architectures tuned for consumer GPUs and Apple Silicon — a notable shift from the 70B+ dense paradigm of 2024–25. Combined with unsloth/ISTA-DASLab quantization throughput, the practical floor for "locally-runnable strong model" keeps dropping.

Vertical fine-tunes are diversifying: cybersecurity (dealignai), agentic/coding (DavidAU, TokenRhythm), autonomous driving (Qwen-Drive), and music (YuE2) all appear, suggesting the next competitive axis is **domain specialization** rather than raw capability. Meanwhile, video generation has bifurcated into heavyweight diffusion pipelines (Lightricks/LTX-2.5, MiniMaxAI/MiniMax-H3) and lighter editing-focused tools (Viggle), with massive download counts validating commercial demand.

---

## 4. Worth Exploring

- **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)** — With 14,969 weekly likes and 7.7M downloads, this is the single best baseline for evaluating where open-weight frontier chat-quality sits right now. Its multimodal capabilities also make it a one-stop model for vision-language prototyping.

- **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)** — The leading open video generation model of the week. Worth studying for its prompt adherence and dual image-to-video / text-to-video support, especially given its competitive download velocity against Lightricks.

- **[Edge0/Edge0-

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*