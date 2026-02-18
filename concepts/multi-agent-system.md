# Multi-Agent System

A multi-agent system is an architecture in which multiple [agents](./agent.md) collaborate, delegate, or coordinate to accomplish tasks that exceed the scope or capabilities of a single agent.

## Details

Agents in a multi-agent system communicate through shared state, message passing, or direct handoffs and may have different roles, [tools](./tools.md), permissions, and [LLM](./llm.md) backends.

Common patterns include orchestrator-worker hierarchies (a parent agent [plans](./planning.md) a task decomposition and delegates subtasks to [subagents](./subagent.md)), pipelines (agents arranged in a fixed sequence resembling an [AI workflow](./ai-workflow.md), each refining or extending the previous output), and peer-based coordination (agents negotiate or vote on decisions). The [agent runtime](./agent-runtime.md) managing a multi-agent system handles routing, delegation, and coordination alongside the standard single-agent concerns.

[Context isolation](./context-isolation.md) is a common design principle: each agent or subagent operates in its own [context](./context.md) window, receiving only the information explicitly passed to it. This keeps contexts focused and limits how far a compromise can propagate.

Multi-agent systems introduce trust and security surfaces that single-agent systems do not have: agents typically trust messages from peer agents, propagate permissions through delegation chains, and coordinate via shared resources. These seams make multi-agent systems susceptible to [multi-agent system threats](../threats/multi-agent-system-threats.md) such as communication poisoning, delegation chain exploitation, and rogue agents. [Observability](./observability.md) across agent boundaries is critical for detecting anomalous inter-agent behavior.

## Examples

- A parent agent that breaks a complex task into subtasks and delegates each to a specialized [subagent](./subagent.md).
- A research pipeline where one agent retrieves sources, another summarizes them, and a third synthesizes the final report.
- A CI/CD workflow where a coding agent generates changes, a review agent checks them, and a deployment agent rolls them out.
- Multiple specialized agents (coding, security, documentation, testing) operating on the same git repository as [filesystem agents](./filesystem-agent.md), coordinating through branches, commits, and pull requests rather than direct message passing.
