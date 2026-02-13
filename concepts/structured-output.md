# Structured Output

Structured output is an [LLM](./llm.md) capability where the model generates responses that conform to a predefined format or schema (typically JSON, but also XML, YAML, enums, or other constrained formats).

## Details

[Inference](./inference.md) providers implement structured output through [constrained decoding](./constrained-decoding.md) (restricting the model's token generation to only valid outputs given a schema) or through [post-training](./post-training.md) that teaches the model to produce well-formed structured data. Constrained decoding guarantees syntactic schema compliance for completed outputs, while training-based approaches improve but do not guarantee compliance. Some providers combine both techniques. Syntactic compliance does not imply semantic correctness: constrained decoding can degrade output quality by forcing the model into unlikely token paths, producing outputs that parse correctly but contain nonsensical or [hallucinated](./hallucination.md) field values. This distinction matters for [agent](./agent.md) tasks that depend on the meaning of structured fields, not just parseability.

Structured output is foundational for reliable [tool](./tools.md) calling (tool calls are structured by definition), [agent](./agent.md) systems (where downstream code must parse model outputs), and application-level [guardrails](./guardrail.md) (constraining the output space reduces the surface for policy violations). [Evals](./evals.md) for structured output typically verify schema compliance, field correctness, and robustness under adversarial inputs.

## Examples

- An API call that returns a JSON object matching a provided schema, using a [constrained decoding](./constrained-decoding.md) mode that enforces parseability.
- A classification task where the model outputs one of a fixed set of enum values.
- A tool call where the model generates a structured function name and argument object.

## Synonyms

constrained output, JSON mode
