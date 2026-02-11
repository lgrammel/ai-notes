# Small Language Model

A small language model (SLM) is an [LLM](./llm.md) with a relatively compact parameter count - typically under roughly 10 billion parameters - designed for lower-cost [inference](./inference.md), reduced [latency](./latency.md), and deployment in resource-constrained environments.

## Details

The boundary between "small" and "large" is not precisely defined and shifts as hardware and techniques advance; the distinguishing characteristic is that SLMs prioritize efficiency and deployability over maximum capability. They are commonly produced through [distillation](./distillation.md) from larger teacher models, often combined with pruning (removing less-important parameters such as layers that contribute least to their input), though they can also be pretrained from scratch at smaller scale. Cascade distillation - alternately pruning and distilling a parent model into progressively smaller variants - can produce an entire model family from a single parent at a fraction of the training cost of pretraining each size independently. [Model quantization](./model-quantization.md) and [fine-tuning](./fine-tuning.md) are frequently applied to SLMs to further reduce resource requirements or specialize them for specific tasks.

SLMs are practical for on-device and edge deployment, local inference without cloud dependencies, and high-throughput serving where per-request cost matters. In [model routing](./model-routing.md) configurations, SLMs typically handle simpler requests while frontier models are reserved for complex tasks. The tradeoff is reduced capability on tasks requiring broad knowledge or complex [reasoning](./reasoning.md), making [evals](./evals.md) important for validating that an SLM meets quality requirements for a given use case.

## Examples

- Phi-3 Mini (3.8B parameters) and Gemma 2B running on mobile devices for on-device inference.
- Mistral's Ministral 3 family (3B, 8B, 14B parameters), cascade-distilled from a single 24B-parameter parent using 1-3 trillion training tokens compared to 15-36 trillion tokens for comparable models trained from scratch.
- A coding assistant using a 7B-parameter model for code completion where low latency matters more than handling complex architectural questions.
- An enterprise deploying a fine-tuned 3B-parameter model for a narrow classification task, avoiding the cost of a frontier model API.

## Synonyms

SLM, small model
