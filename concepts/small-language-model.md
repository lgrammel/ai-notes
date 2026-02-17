# Small Language Model

A small language model (SLM) is an [LLM](./llm.md) with a relatively compact parameter count, designed for lower-cost [inference](./inference.md), reduced [latency](./latency.md), and deployment in resource-constrained environments.

## Details

The boundary between "small" and "large" is not precisely defined and shifts as hardware and techniques advance - what counts as "small" trends upward over time. The distinguishing characteristic is that SLMs prioritize efficiency and deployability over maximum capability. They are commonly produced through [distillation](./distillation.md) from larger teacher models, often combined with pruning, though they can also be pretrained from scratch at smaller scale. Cascade [distillation](./distillation.md) can produce an entire model family from a single parent efficiently. [Model quantization](./model-quantization.md) and [fine-tuning](./fine-tuning.md) are frequently applied to SLMs to further reduce resource requirements or specialize them for specific tasks.

SLMs are frequently released as [open-weight models](./open-weight-model.md), since their primary value proposition - efficient deployment on constrained hardware - requires weight access. They are practical for on-device and edge deployment, local inference without cloud dependencies, high-throughput serving where per-request [inference cost](./inference-cost.md) matters, and as draft models in [speculative decoding](./speculative-decoding.md) where they propose candidate tokens that a larger target model verifies in parallel. In [model routing](./model-routing.md) configurations, SLMs typically handle simpler requests while frontier models are reserved for complex tasks. The tradeoff is reduced capability on tasks requiring broad knowledge or complex [reasoning](./reasoning.md), making [evals](./evals.md) important for validating that an SLM meets quality requirements for a given use case.

## Examples

- On-device inference on mobile devices using models in the 1-4B parameter range.
- A high-throughput serving deployment using a distilled small model to keep per-request inference cost low.
- A coding assistant using a small model for code completion where low latency matters more than handling complex architectural questions.
- An enterprise deploying a fine-tuned small model for a narrow classification task, avoiding the cost of a frontier model API.

## Synonyms

SLM, small model
