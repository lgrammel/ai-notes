# Token Economics of Tool Use

Token economics of tool use is the idea that [agents](../concepts/agent.md) rationally prefer [tools](../concepts/tools.md) that move computation from expensive GPU [inference](../concepts/inference.md) to cheaper CPU-based execution, and that this cost differential is the primary economic driver behind tool selection and survival.

[Inference](../concepts/inference.md) costs [tokens](../concepts/token.md), which cost energy, which cost money. When an agent performs a task purely through inference -- such as multiplying large numbers via pattern matching, or searching text by reasoning over it token by token -- it uses an extremely expensive compute substrate (GPUs). The same tasks done via a tool call to a CPU-based program (a calculator, grep, a parser) cost orders of magnitude less. An agent that delegates to tools when possible is therefore more resource-efficient than one that does everything through inference.

This framing suggests that tool adoption follows an economic logic: a tool tends to get used when the [tokens](../concepts/token.md) saved by delegating to it exceed the tokens spent on knowing about it (awareness cost) and operating it (friction cost). Tools with very high savings-to-cost ratios (e.g., grep, calculators, compilers) become effectively permanent infrastructure. Tools where the ratio is marginal get replaced when agents can synthesize equivalent functionality cheaply enough.

The substrate tradeoff also implies that "insight-dense" tools -- those encoding hard-won domain knowledge that would be expensive to re-derive through inference (e.g., git, databases, workflow engines) -- have strong survival characteristics, because the token cost of re-synthesizing them from first principles is prohibitive.

## Examples

- An agent using a calculator tool for arithmetic rather than performing multiplication via inference, because CPU computation is orders of magnitude cheaper than GPU token generation for this task.
- grep surviving as permanent infrastructure because CPU-based pattern matching over text outperforms GPU inference by orders of magnitude for search tasks.
- A database query engine persisting because encoding decades of query optimization research into inference would burn far more tokens than a tool call.

## External references

- https://steve-yegge.medium.com/software-survival-3-0-97a2a6255f7b
