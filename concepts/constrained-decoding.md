# Constrained Decoding

Constrained decoding is an [inference](./inference.md)-time technique that restricts [token](./token.md) generation at each step to only those tokens that would produce syntactically valid output according to a formal grammar or schema.

## Details

During standard [LLM](./llm.md) generation, the model produces a probability distribution over its full vocabulary at each step, and [sampling parameters](./sampling-parameters.md) shape this distribution before a token is selected. Constrained decoding adds an additional filtering layer: at each generation step, a grammar-derived mask zeroes out the probabilities of all tokens that would lead to an invalid partial output, then sampling proceeds over the remaining valid tokens. The grammar is typically derived from a JSON Schema or a context-free grammar specification (e.g., GBNF) and compiled into a finite-state automaton or pushdown automaton that tracks which continuations are valid given the tokens generated so far.

This guarantees that completed outputs are syntactically valid against the schema - every generated JSON object will parse, every enum value will match one of the allowed options. However, constrained decoding only enforces syntactic compliance, not semantic correctness: by forcing the model away from its preferred token distribution, it can push generation into low-probability regions, producing outputs that parse correctly but contain nonsensical, hallucinated, or low-quality field values. This quality degradation is more pronounced when the schema tightly constrains the output space or when the model's [training](./training.md) distribution does not align well with the required format. A notable limitation is max-token truncation: if generation hits the token limit before the structure is closed, the output may be syntactically incomplete even under constrained decoding.

[Inference providers](./inference-provider.md) that offer constrained decoding typically accept a JSON Schema alongside the request and guarantee parseability for non-truncated outputs. Some providers combine constrained decoding with [post-training](./post-training.md) to improve both syntactic compliance and semantic quality of [structured output](./structured-output.md). Constrained decoding is foundational for reliable [tool](./tools.md) calling, [agent](./agent.md) systems, and any application where downstream code must parse model outputs.

## Examples

- An inference API that accepts a JSON Schema and masks invalid tokens at each generation step, guaranteeing the response parses against the schema.
- A local inference engine using GBNF grammars to constrain generation to valid SQL syntax.
- An enum-constrained generation where only tokens forming one of the allowed values can be selected.

## Synonyms

guided generation, grammar-based decoding, grammar-constrained decoding, structured generation
