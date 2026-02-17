# Inference Provider

An inference provider is an organization that runs [LLMs](./llm.md) to generate outputs ([inference](./inference.md)) and exposes them via an API or hosted service. It may serve its own [LLMs](./llm.md) or third-party [LLMs](./llm.md).

## Details

Inference providers sit between [model developers](./model-developer.md) (who create model weights) and application developers (who integrate models into end-user products). Many inference providers host popular [open-weight models](./open-weight-model.md) alongside proprietary ones, offering application developers the flexibility to switch between provider-hosted and self-hosted deployments of the same model.

They typically handle API access, scaling, [rate limiting](./rate-limiting.md), billing, and [latency](./latency.md) optimization. Provider APIs commonly expose [sampling parameters](./sampling-parameters.md), [structured output](./structured-output.md) constraints, [streaming](./streaming.md), [prompt caching](./prompt-caching.md), and [batch inference](./batch-inference.md) endpoints for asynchronous bulk processing at reduced cost. Pricing is typically per-[token](./token.md) with different rates for input and output, making provider choice a key factor in [inference cost](./inference-cost.md).

Note: many organizations are both [model developers](./model-developer.md) and inference providers; these are roles, not mutually exclusive categories.

## Examples

- OpenAI - serves proprietary models (GPT series, o-series); pioneered the chat completions API format widely adopted by other providers.
- Anthropic - serves proprietary Claude models; emphasizes safety-oriented design.
- Google (Gemini API) - serves Gemini models; deep integration with Google Cloud.
- AWS Bedrock - multi-model gateway offering models from Anthropic, Meta, Mistral, and others under a unified AWS API with IAM-based access control.
- Together AI - specializes in hosting [open-weight models](./open-weight-model.md) with performance-optimized inference.
- Fireworks AI - specializes in low-latency inference for [open-weight models](./open-weight-model.md); offers function calling and [structured output](./structured-output.md) optimizations.
