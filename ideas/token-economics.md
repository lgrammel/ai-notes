# Token Economics

Token economics is the idea that [inference cost](../concepts/inference-cost.md) is a primary architectural constraint in [LLM](../concepts/llm.md) systems, shaping decisions from [model](../concepts/llm.md) selection to user-facing access controls. Because every [token](../concepts/token.md) of [inference](../concepts/inference.md) costs money, cost pressure drives a set of recurring design patterns aimed at reducing token volume, shifting work to cheaper execution modes, or limiting who spends tokens and when.

## Details

The most direct lever is [model routing](../concepts/model-routing.md): directing requests to the cheapest model that can handle them. Simple tasks go to [small language models](../concepts/small-language-model.md) or [distilled](../concepts/distillation.md) variants; complex tasks escalate to frontier models. The cost gap between tiers is large enough that routing even a fraction of traffic to cheaper models produces significant savings.

[Reasoning](../concepts/reasoning.md) tokens are a particularly expensive cost category because reasoning traces can be many times longer than the visible output. This creates pressure to avoid reasoning models for tasks that do not require multi-step deduction, to cap reasoning effort via model parameters where available, or to use [distillation](../concepts/distillation.md) to bake reasoning patterns into cheaper non-reasoning models.

Token volume reduction is another recurring pattern. [Prompt compaction](../concepts/prompt-compaction.md) condenses context to use fewer input tokens. [Prompt caching](../concepts/prompt-caching.md) reduces the compute cost of repeated prefixes. Structuring prompts so that stable content (system instructions, [tool](../concepts/tools.md) definitions) sits at the front maximizes cache reuse across requests.

Offloading work from inference to [tools](../concepts/tools.md) is a cost optimization with structural consequences. CPU-based computation (arithmetic, text search, data retrieval, code execution) is orders of magnitude cheaper per unit of work than GPU-based inference. An [agent](../concepts/agent.md) that delegates arithmetic to a calculator or data processing to a code execution runtime spends a small number of tokens orchestrating the tool call instead of many tokens reasoning through the answer. Tools with high savings-to-overhead ratios (the tokens saved by delegating vs. the tokens spent on tool schemas and call formatting) become permanent infrastructure. (This inference-vs-tool cost boundary is explored in depth by Steve Yegge's "Software Survival 3.0" framing, which argues that tools encoding hard-won domain knowledge - git, databases, compilers - survive because re-deriving that knowledge through inference is prohibitively expensive.)

On the operational side, cost pressure drives user-facing controls: per-user or per-tenant budgets, usage tiers, rate limiting, and throttling. These are typically enforced through [AI gateways](../concepts/ai-gateway.md) or application-level logic. [Observability](../concepts/observability.md) systems track token-level cost per request, per user, and per model to detect cost anomalies and inform optimization. Without these controls, [denial of service](../threats/denial-of-service.md) attacks (including "denial of wallet" variants) can inflict significant financial damage.

The overall effect is that token cost acts as a selection pressure on system design: architectures that minimize unnecessary inference survive, while those that burn tokens on work better handled by cheaper execution modes or smaller models face cost scaling problems.

## Examples

- A coding agent using a fast, cheap model for file reads and reformatting, and a reasoning model only for architectural decisions.
- Capping reasoning effort to "low" for classification tasks where chain-of-thought adds cost without improving accuracy.
- An agent using a calculator tool for arithmetic instead of spending tokens on multi-step multiplication via inference.
- A SaaS product offering tiered access where free users get a small model and paying users get a frontier model.
- Structuring all prompts with a stable system prefix to maximize [prompt caching](../concepts/prompt-caching.md) hit rates across requests.

## External references

- https://steve-yegge.medium.com/software-survival-3-0-97a2a6255f7b
- https://arxiv.org/abs/2511.17006
