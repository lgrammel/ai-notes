# Agent Runtime

An agent runtime is the software layer that executes an [agent](./agent.md) loop around an [LLM](./llm.md): it assembles inputs from state/[context](./context.md), interprets model outputs (messages and [tool](./tools.md) calls), runs tools, updates state, and stops when a termination condition is met.

## Details

The runtime is the infrastructure and orchestration layer, distinct from the [agent](./agent.md) itself (the logical entity with goals and decisions) and from an [inference provider](./inference-provider.md) (which handles model inference only). Agent runtimes often handle orchestration concerns such as tool routing, retries, concurrency, memory/persistence, timeouts/cancellation, [tool execution approval](./tool-execution-approval.md), and integration with a [sandbox](./sandbox.md) and [observability](./observability.md).

As agents take on longer-running, higher-stakes work, runtimes face emerging "agentic operating system" concerns beyond basic orchestration: agent identity and permission management (authenticating agents and scoping their access), memory and [context](./context.md)-window management across sessions, work ledgers that track future, current, and past work with attributes like required skills, acceptance criteria, SLOs, and cost constraints, and governance paths through a graph of agent capabilities and compliance requirements. An agent is more than its persona or current context - it includes the history of work it has performed. While [LLMs](./llm.md) are fungible within an agent (one model can be swapped for another), changing a model fundamentally alters the agent's behavior and must be tracked, both for auditability and to manage [agent drift](./agent-drift.md). [Fitness functions](./fitness-function.md) define machine-readable health targets that the runtime can evaluate to determine whether agent actions are improving or degrading the systems they operate on.

## Examples

- A local agent runner embedded in an IDE that can edit files and run [shell](./shell-tool.md) commands (a [filesystem agent](./filesystem-agent.md)).
- A hosted service that executes agent loops and manages tool credentials and [rate limits](./rate-limiting.md).
- An agent framework/runtime library that provides a state machine, tool calling, and [checkpointing](./agent-checkpointing.md).

## Synonyms

agent runner, agent orchestrator, agent engine
