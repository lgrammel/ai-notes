# Inference

Inference is running a trained [model](./model.md) on inputs to produce outputs (for example generating tokens from a prompt), without updating the model's weights.

In production, inference is commonly provided via an API by an [inference provider](./inference-provider.md) or run on self-hosted infrastructure; it is distinct from [training](./training.md), which changes the model to alter behavior (for example via [fine-tuning](./fine-tuning.md)).

## Examples

- Calling a chat completion API to generate an answer from a prompt
- Running a local model to generate text for an [agent](./agent.md)

## Synonyms

serving, model serving
