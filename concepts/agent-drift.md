# Agent Drift

Agent drift is the divergence in behavior, patterns, and preferences that occurs when identical [agents](./agent.md) accumulate different local context over time - analogous to team-specific norms in human organizations but on an accelerated timeline.

## Details

Agents deployed across multiple teams or codebases learn from their environment: code patterns, naming conventions, architectural decisions, and review feedback shape how the agent approaches subsequent tasks. Even starting from identical configurations, agents working on different systems accumulate different tacit assumptions through [agent memory](./agent-memory.md), [skills](./skill.md), and the codebase conventions they absorb during each session. A database agent working on an e-commerce backend develops different patterns than the same agent working on an ERP system, despite sharing the same underlying [LLM](./llm.md) and initial configuration.

Drift is distinct from model updates - it occurs with the same underlying model when the agent's accumulated context (memory, project-specific instructions, learned conventions) diverges across deployments. The divergence mirrors how human teams develop local norms, but the timeline is compressed: agents accumulate context-driven habits over days or weeks rather than months or years.

Whether to manage drift (standardize agent behavior across deployments, analogous to cross-team consistency efforts) or embrace it (let agents optimize locally, analogous to team autonomy) is an open design question. Standardization reduces coordination friction in [multi-agent systems](./multi-agent-system.md) where agents from different deployments interact, but local optimization may produce better results within each specific context. Detection requires [observability](./observability.md) that compares agent behavior across deployments - tracking which patterns agents adopt, which conventions they follow, and where outputs diverge from a shared baseline.

## Examples

- A database agent on the e-commerce backend that learns to use batch inserts for performance, while the same agent on the analytics system learns to favor streaming writes - each locally optimal but incompatible if the agents later need to coordinate on a shared data pipeline.
- A coding agent that absorbs a project's custom abstraction layer and begins applying it in contexts where simpler approaches would be more appropriate, having internalized a local pattern as a general best practice.
- Two instances of the same review agent developing different strictness thresholds based on the teams they work with - one becomes lenient after repeated overrides, the other becomes stricter after working with a team that values thorough review.
