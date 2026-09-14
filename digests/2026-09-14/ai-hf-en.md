# Hugging Face Trending Models Weekly 2026-09-14

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-09-14 11:30 UTC

---

# 🤗 Hugging Face Trending Models Digest — 2026-09-14

---

## 🌟 Today's Highlights

The **Qwen3.8 family** is the clear headline of the week, with the flagship `Qwen3.8-27B` alone racking up **15,071 weekly likes** and **7.7M downloads**, complemented by `Qwen3.8-Flash-Next` and a wave of community GGUFs from Unsloth, ISTA-DASLab, and DavidAU. **Video generation** continues its breakout, led by `MiniMaxAI/MiniMax-H3` (5,266 likes) and a new ComfyUI LoRA ecosystem, alongside `Lightricks/LTX-2.5` and the `Minimax-h3_Singularity` variant. **MoE architectures** are visibly on the rise, with `Edge0-35B-A3B` and the `Nex-N2.5` series built on `qwen3_5_moe`. Meanwhile, **audio/music generation** is gaining ground via `YuE2-3B` and Tencent's `AuK` zero-shot TTS, and time-series forecasting gets a major boost from Google's `timesfm-3.0`.

---

## 🧠 Language Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 15,071 | 7,703,400 | The flagship Qwen3.8 generation model leading the chart this week with conversational and image-text-to-text capabilities. Its 7.7M downloads and 15K likes signal broad community adoption as a base for downstream work. |
| [Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct) | meta-llama | 7,592 | 5,620,539 | Meta's instruction-tuned 8B model remains a community favorite, riding sustained interest in the Llama 3.1 lineage. Strong download numbers reflect its role as a default open-weight baseline. |
| [Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,198 | 645,881 | A faster experimental Qwen3.8 variant (`qwen4_exp` family) optimized for low-latency conversational use. Trending thanks to its image-text-to-text flexibility and "Flash" positioning. |
| [DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 2,333 | 288,414 | DeepSeek's latest Flash release extends image-text-to-text generation with the new `deepseek_v41` architecture. Trending as a cost-effective multimodal option from a top-tier open-weight lab. |
| [GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,319 | 1,770,038 | The newest "Flash" entry in Zhipu's GLM-5.3 lineup, supporting image-text-to-text and conversational tasks. Its 1.77M downloads show GLM's continued expansion in the open-weight LLM space. |
| [NeoHorse-1-4B](https://huggingface.co/TokenRhythm/NeoHorse-1-4B) | TokenRhythm | 1,754 | 9,520 | A compact agentic text model built on the `qwen3_5_text` backbone, designed for tool-using workflows. Trending due to its small footprint and agentic positioning. |
| [Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview) | Edge0 | 1,468 | 8,109 | A 35B-parameter MoE with only ~3B active, packaged in MLX format and tagged "edge-inference". It highlights the push toward efficient MoE deployments on consumer hardware. |
| [MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,367 | 206,774 | The 5th-generation MiniCPM small model from OpenBMB, offering strong performance at 2B parameters. Trending for its balance of efficiency and capability in the Llama-derived lineup. |
| [bert-base-uncased](https://huggingface.co/google-bert/bert-base-uncased) | google-bert | 3,337 | 46,435,111 | A classic encoder still pulling massive downloads (46M+) thanks to its role as a default NLP backbone. The 3,337 weekly likes reflect its enduring educational and research relevance. |
| [distilbert-base-uncased](https://huggingface.co/distilbert/distilbert-base-uncased) | distilbert | 1,439 | 7,294,014 | The distilled BERT remains a go-to lightweight encoder for production pipelines. Continued downloads highlight its role in efficient NLP infrastructure. |
| [gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 4,071 | 15,182,177 | OpenAI's original GPT-2 still trends on weekly likes (4,071), a testament to its foundational status. Its 15M downloads make it a perennial "hello world" of HF. |
| [Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 1,163 | 24,084 | A 4B text-generation model in the `spark2_5` family from XHToken. Trending thanks to active development in the Spark small-model ecosystem. |
| [Nex-N2.5-mini](https://huggingface.co/nex-agi/Nex-N2.5-mini) | nex-agi | 775 | 4,543 | A compact MoE model from nex-agi on the `qwen3_5_moe` backbone supporting image-text-to-text. Early traction reflects the lab's push into multimodal MoE variants. |
| [Nex-N2.5-Pro](https://huggingface.co/nex-agi/Nex-N2.5-Pro) | nex-agi | 630 | 30,489 | The larger sibling in the Nex-N2.5 family, also built on `qwen3_5_moe` with multimodal support. Its 30K downloads show stronger early production interest than the mini variant. |
| [Agnes-3.0-Flash](https://huggingface.co/Agnes-AI/Agnes-3.0-Flash) | Agnes-AI | 150 | 736 | A new image-text-to-text "Flash" release from Agnes-AI, marking the lab's third-generation debut. Early-stage traction with high like-to-download ratio signals curious experimentation. |

## 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,266 | 4,827,156 | A flagship image-text-to-video model and the anchor of the H3 ecosystem, achieving 4.8M downloads in its first weeks. Its 5,266 weekly likes make it the most-liked video model on the chart. |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 3,807 | 1,559,653 | Lightricks' updated video diffusion model supporting image-to-video, text-to-video, and video-to-video in a single-file pipeline. Trending as a strong open competitor in the video-generation space. |
| [clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32) | openai | 1,528 | 21,349,787 | OpenAI's classic CLIP ViT-B/32 continues to dominate zero-shot image classification use cases. Its 21M+ downloads make it one of the most-used vision-language models ever. |
| [mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 535 | 19,486 | Meta's 300M-parameter Massively Multilingual Speech (MMS) pretrained wav2vec2 model. Trending as a foundation for multilingual speech recognition across 1,000+ languages. |
| [Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 387 | 141,057 | A community-tuned variant of the H3 video model with a creative "Singularity" branding. 141K downloads show the breadth of derivative demand around the H3 base. |
| [YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 433 | 5,186 | A 3B music-generation model from the m-a-p team supporting symbolic planning and agentic editing. Trending as a niche but high-engagement entry in the AI music space. |
| [AuK](https://huggingface.co/tencent/AuK) | tencent | 208 | 1,928 | Tencent's zero-shot text-to-speech model with voice-cloning capabilities. Trending as one of the few major-lab releases in the open TTS space this cycle. |

## 🔧 Specialized Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,958 | 252,806,720 | The de-facto default sentence embedding model, with a staggering 252M+ downloads. Its 5,958 weekly likes reflect continued dominance in semantic search and RAG pipelines. |
| [timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 784 | 826,017 | Google's 3rd-generation time-series foundation model for forecasting. Trending as the most prominent open release from a major lab in the time-series domain. |

## 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,056 | 10,077,938 | Unsloth's official GGUF quantization of Qwen3.8-27B, breaking 10M downloads. Trending as the primary distribution channel for running Qwen3.8 on local hardware. |
| [Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 993 | 819,784 | An experimental mixed-precision GGUF using GSQ (Gradient-Scaled Quantization) and RCO techniques. Trending as a research-grade alternative to standard Q4/Q5 GGUFs. |
| [Qwen3.8-27B-TURBO-Fable-Cold-Fusion-…-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 658 | 875,703 | A heavily customized Qwen3.8-27B derivative combining Unsloth + Heretic + uncensored fine-tunes. Trending as a one-stop "uncensored coder" GGUF with 875K downloads. |
| [GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8) | dealignai | 438 | 30,502 | A domain-specialized FP8 GLM-5.3 variant targeted at cybersecurity tasks, with abliteration and refusal-removal. Trending as a verticalized open-weight model in security AI. |
| [MiniCPM5-2B-GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF) | openbmb | 223 | 108,471 | The official GGUF build of MiniCPM5-2B for llama.cpp and local inference. Trending alongside the base model's release to enable edge deployment. |
| [Minimax-H3-ComfyUI](https://huggingface.co/Alissonerdx/Minimax-H3-ComfyUI) | Alissonerdx | 149 | 13,295 | A ComfyUI-compatible LoRA wrapper for the H3 video model. Trending as one of the first community adapters bringing H3 into node-based workflows. |

---

## 📈 Ecosystem Signal

The week's trending list is dominated by the **Qwen3.8 family** from Alibaba, which appears in six of the top 30 entries spanning the base model, Flash-Next, and four quantization/fine-tune variants — a clear sign of Qwen's current gravitational pull in the open-weight ecosystem. The **MiniMaxAI/MiniMax-H3 video generation stack** has rapidly built its own flywheel, with a base model, an experimental "Singularity" fork, and a ComfyUI LoRA all trending within weeks of release. **MoE architectures** (`qwen3_5_moe` derivatives from Edge0 and nex-agi) and **edge/efficient inference** are clearly accelerating, reflecting community demand for high-quality but small active-parameter models. The quantization ecosystem remains robust: Unsloth's GGUFs are now consistently crossing 10M downloads, and

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*