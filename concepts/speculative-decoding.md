# Speculative Decoding

Speculative decoding is an [inference](./inference.md) optimization technique that accelerates [token](./token.md) generation by using a fast draft model (typically a [small language model](./small-language-model.md)) to propose multiple candidate tokens, which are then verified in parallel by the target [LLM](./llm.md) in a single forward pass.

## Details

Standard autoregressive decoding generates one [token](./token.md) per forward pass through the model, creating a sequential bottleneck where [latency](./latency.md) scales linearly with output length. Speculative decoding breaks this bottleneck by exploiting the observation that a cheap draft model can correctly predict many of the tokens a larger model would generate - particularly for straightforward continuations like common phrases, boilerplate code, or predictable syntax.

The process works in cycles: the draft model generates a short sequence of candidate tokens (typically 4-8), then the target model evaluates all candidates in a single forward pass. Because the [transformer architecture](./transformer-architecture.md) can process multiple tokens in parallel during the prefill phase, verifying a batch of draft tokens costs roughly the same as generating a single token. Tokens that match what the target model would have produced are accepted; the first rejected token is resampled from the target model's distribution, and the draft sequence restarts from that point. This acceptance-rejection scheme guarantees that the final output distribution is identical to what the target model would produce alone - speculative decoding is a pure latency optimization with no quality loss.

The speedup depends on the draft model's acceptance rate: if most draft tokens are accepted, the target model effectively produces multiple tokens per forward pass. Acceptance rates are highest for predictable text (structured formats, repetitive patterns, common phrases) and lowest for creative or reasoning-heavy generation. In practice, speculative decoding typically achieves 2-3x throughput improvement for code generation and structured output, with smaller gains for open-ended text.

Draft models can be standalone [small language models](./small-language-model.md), [distilled](./distillation.md) variants of the target model, or simplified internal layers of the target model itself (self-speculative decoding). Some [inference providers](./inference-provider.md) apply speculative decoding transparently on the serving side, delivering lower [latency](./latency.md) without any API-level changes for application developers.

## Examples

- An [inference provider](./inference-provider.md) using a 1B-parameter draft model to accelerate a 70B-parameter target model, achieving 2-3x faster token generation for code completion tasks.
- A [coding agent](./coding-agent.md) benefiting from speculative decoding because structured code output has high acceptance rates.
- Self-speculative decoding where early transformer layers serve as the draft mechanism, avoiding the need for a separate draft model.
- [Structured output](./structured-output.md) generation (JSON, XML) achieving high speedups because format-constrained tokens are highly predictable.

## Synonyms

assisted generation, speculative sampling, draft-and-verify decoding
