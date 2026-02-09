# Agent UX

Agent UX is the idea that software libraries and [tools](../concepts/tools.md) designed for AI [agents](../concepts/agent.md) benefit from being shaped around "desire paths" -- observing what agents naturally try to do and making those patterns work, rather than relying solely on documentation.

The term "desire paths" is borrowed from urban planning, where foot-worn trails reveal the routes people actually prefer. Applied to software libraries and tools, it means watching how agents attempt to use an API, CLI, or library (including [hallucinated](../concepts/hallucination.md) commands, flags, function names, and argument patterns), then implementing whatever they repeatedly try. Over many iterations, this drives the gap between agent expectation and actual behavior toward zero, reducing friction without requiring extensive prompts or documentation.

This approach has a dual-use relationship with [hallucination exploitation](../threats/hallucination-exploitation.md): the same predictability that lets a library or tool author make hallucinated interfaces real also lets an attacker register hallucinated domain names or package names ("hallucination squatting") and serve compromised artifacts. The underlying phenomenon -- that model outputs are consistent enough to anticipate -- is neutral; the intent determines whether it is a design technique or an attack vector.

Agent UX contrasts with documentation-heavy approaches. Loading [context](../concepts/context.md) with usage guides works but consumes [tokens](../concepts/token.md) at [inference](../concepts/inference.md) time. A library or tool that is intuitive to agents because its interface matches their expectations needs less documentation, saving both awareness cost and friction cost.

## Examples

- A CLI tool whose subcommands, flags, and aliases were iteratively added based on what agents hallucinated when trying to use it, until nearly every agent guess is correct.
- A software library whose function names, parameter orders, and module structure mirror the conventions agents expect from similar well-known libraries.
- Naming a tool's operations to match the verbs and patterns agents already use for similar tasks in well-known tools (e.g., mirroring git's command structure).

## External references

- https://steve-yegge.medium.com/software-survival-3-0-97a2a6255f7b
