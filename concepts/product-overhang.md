# Product Overhang

Product overhang is the gap between what [foundation models](./llm.md) can do and what shipping products actually use them for - latent model capabilities that no product has yet harnessed.

## Details

Product overhang arises because model capabilities advance faster than product design, UX patterns, and integration architectures can absorb them. A model may gain the ability to reason over long documents, use [tools](./tools.md) reliably, or maintain coherent multi-step plans, but products built on earlier capability assumptions do not expose these abilities to users. The bottleneck shifts from "can the model do this?" to "has anyone built the right product surface for it?"

This is distinct from the [eval-reality gap](./eval-reality-gap.md), where models score well on [benchmarks](./benchmarks.md) but fail in practice. Product overhang describes cases where the capability is genuinely present and usable but no product has built the right interface, workflow, or integration to unlock it.

The overhang creates opportunity for [AI engineers](./ai-engineering.md): identifying underexploited capabilities and building products around them is a primary source of new product value. Upgrading the underlying model in an existing product can unlock features that were previously impossible, though realizing the full benefit typically requires rethinking the product design rather than just swapping in a better model.

## Examples

- Models capable of reliably orchestrating dozens of [tools](./tools.md) in sequence, while most products only expose simple single-tool interactions
- Long-context models that can reason over entire codebases, while most coding tools still operate file-by-file
- [Multimodal models](./multimodal-model.md) that can understand video, while few products integrate video understanding into workflows
