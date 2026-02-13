# Open-Weight Model

An [LLM](./llm.md) whose trained weights are publicly released, allowing anyone to download, run, [fine-tune](./fine-tuning.md), and build on the model rather than accessing it only through an [inference provider](./inference-provider.md) API.

## Details

"Open-weight" specifically means the model weights are available for download; it does not imply that training data, training code, or full reproducibility are also provided. This distinguishes open-weight releases from fully open-source projects (where all artifacts needed to reproduce the model from scratch are published) and from proprietary models (where weights are never distributed and access is API-only). In practice, most models described as "open-source" in the AI community are technically open-weight: the weights are downloadable but the complete training pipeline is not reproducible.

Open-weight availability unlocks several capabilities that API-only access does not: local or self-hosted [inference](./inference.md) with full control over the serving stack, [fine-tuning](./fine-tuning.md) (including parameter-efficient methods like LoRA/QLoRA) without depending on a provider's fine-tuning API, [model quantization](./model-quantization.md) to run on consumer or edge hardware, and [distillation](./distillation.md) using the model as a teacher. These capabilities make open-weight models central to use cases requiring data sovereignty, offline operation, or deep customization.

Open-weight models are released under varying licenses that determine commercial use, modification rights, and redistribution terms. Some use permissive licenses (such as Apache 2.0), while others impose restrictions on commercial use, derivative models, or use above certain user thresholds. The license terms - not just weight availability - determine what application developers can practically do with a model.

[Model developers](./model-developer.md) release open-weight models for ecosystem adoption, community-driven improvement, and competitive positioning. Many [inference providers](./inference-provider.md) host popular open-weight models alongside proprietary ones, giving application developers the option to switch between self-hosted and API-served deployments of the same model. [Small language models](./small-language-model.md) are frequently released as open-weight, since their primary value proposition - efficient deployment on constrained hardware - requires weight access.

## Examples

- Meta's Llama model family, released under a custom license with usage thresholds.
- Mistral's open-weight models (Mistral, Mixtral) released under Apache 2.0.
- Google's Gemma models, released for local deployment and fine-tuning.
- Alibaba's Qwen model family, released under Apache 2.0.
- DeepSeek's reasoning and general-purpose models, released as open-weight.

## Synonyms

open-source model (common but technically imprecise), open model
