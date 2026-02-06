# Agent

An agent is a system that uses an [LLM](./llm.md) as a decision-making policy to run [tools](./tools.md) in a loop: observe context/state, choose an action (tool call or message), execute it, incorporate the result, and repeat until a stop condition is met.

This loop is typically implemented and operated by an [agent runtime](./agent-runtime.md).

Some agents are [workspace agents](./workspace-agent.md), meaning their tool use is centered on a longer-lived project/workspace state (often a filesystem in a sandbox).

## Synonyms

AI agent, LLM agent, tool-using agent (sometimes "autonomous agent").
