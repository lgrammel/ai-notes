# Inference Cost

Inference cost is the monetary cost of running [LLM](./llm.md) requests, determined primarily by [token](./token.md) volume, model pricing tier, and whether tokens are input, output, or [reasoning](./reasoning.md) tokens.

## Details

[Inference providers](./inference-provider.md) typically charge per token, with separate rates for input tokens (the [prompt](./prompt.md)), output tokens (the generated response), and - for [reasoning](./reasoning.md) models - reasoning tokens (intermediate thinking steps that may not appear in the final output). Output tokens are generally more expensive than input tokens, and reasoning tokens can dominate total cost on complex tasks because reasoning traces are often much longer than the visible response. Cached input tokens (via [prompt caching](./prompt-caching.md)) are charged at a reduced rate, creating a direct incentive to structure prompts for cache reuse.

Cost scales with model capability: frontier models are significantly more expensive per token than [small language models](./small-language-model.md) or [distilled](./distillation.md) variants. This creates a cost-quality-[latency](./latency.md) tradeoff triangle that shapes most production architecture decisions. For a given quality target, the goal is to minimize cost and latency; for a given budget, the goal is to maximize quality.

In [agent](./agent.md) systems, inference cost compounds across multi-step loops where each reasoning step, [tool](./tools.md) call interpretation, and result evaluation requires additional token generation. [Observability](./observability.md) systems track token-level cost in production to detect regressions, and [AI gateways](./ai-gateway.md) enforce cost controls such as per-request or per-user [budgets](./quota-management.md).

## Examples

- A reasoning model spending 10x more tokens on its thinking trace than on the visible response, making reasoning tokens the dominant cost factor.
- Cached input tokens costing 90% less than uncached tokens, incentivizing stable prompt prefixes.
- A frontier model costing 30-60x more per token than a small model, making [model routing](./model-routing.md) a primary cost optimization lever.
- An agent loop accumulating costs across dozens of inference calls per user request, making per-request cost monitoring essential.

## Synonyms

token cost, LLM cost, API cost
