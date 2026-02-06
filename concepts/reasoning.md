# Reasoning

Reasoning is a distinct step or output stream (often produced before the final answer) where an [LLM](./llm.md) works through intermediate inferences used to produce a user-facing response.

In tool-using systems, reasoning is often implemented as a loop: reasoning over the current context, making a tool call, reasoning over the tool result, and only then producing the user-facing output. Some inference APIs expose a separate reasoning channel distinct from the final text output, while in others it remains implicit.

## Examples

- Multi-step arithmetic or unit conversion (for example "If A costs X and B costs Y, what is the total?")
- Following a set of constraints to derive a consistent answer (logic puzzles, scheduling)
- Choosing and sequencing tool calls in an [agent](./agent.md)
- Returning a separate reasoning trace alongside a final answer in an inference API

## Synonyms

thinking
