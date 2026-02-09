# Token Economics of Tool Use

Token economics of tool use is the idea that [agents](../concepts/agent.md) rationally prefer [tools](../concepts/tools.md) that move computation from expensive GPU [inference](../concepts/inference.md) to cheaper CPU-based execution, and that this cost differential is the primary economic driver behind tool selection and survival.

[Inference](../concepts/inference.md) costs [tokens](../concepts/token.md). When an agent performs a task purely through inference, GPU-based token generation is far more expensive than the same task done via a tool call to a CPU-based program. An agent that delegates to tools when possible is therefore more resource-efficient than one that does everything through inference.

Tool adoption follows an economic logic: a tool tends to get used when the tokens saved by delegating to it exceed the tokens spent on knowing about it (awareness cost) and operating it (friction cost). Tools with very high savings-to-cost ratios (e.g., grep, calculators, compilers) become effectively permanent infrastructure. Tools where the ratio is marginal get replaced when agents can synthesize equivalent functionality cheaply enough.

Tools that encode hard-won domain knowledge (e.g., git, databases, workflow engines) have strong survival characteristics, because the token cost of re-deriving that knowledge through inference is prohibitive.

## Examples

- An agent using a calculator tool for arithmetic rather than performing multiplication via inference, because CPU computation is far cheaper than GPU token generation for this task.
- grep surviving as permanent infrastructure because CPU-based pattern matching vastly outperforms inference for text search.
- A database query engine persisting because encoding decades of query optimization research into inference would burn far more tokens than a tool call.

## External references

- https://steve-yegge.medium.com/software-survival-3-0-97a2a6255f7b
