# Agent Checkpointing

Capturing a snapshot of an [agent's](./agent.md) execution state - typically filesystem contents, conversation history, and tool outputs - at a point in time, enabling resume, rollback, or forking from that snapshot.

## Details

Checkpointing is distinct from [agent memory](./agent-memory.md), which persists selected information across sessions; a checkpoint preserves the full execution context at a specific moment. [Agent runtimes](./agent-runtime.md) manage the state being checkpointed, while [sandbox services](./sandbox.md) often provide the underlying snapshotting primitives (filesystem snapshots, container state capture). Checkpointing is particularly relevant for [filesystem agents](./filesystem-agent.md), which accumulate persistent project state across tool calls and naturally benefit from snapshot/rollback at the filesystem level.

A key application is trajectory forking: branching from a checkpoint to test alternative tool calls, prompts, or recovery strategies without restarting from scratch. This supports iterative debugging (fork from the last good step, fix, and resume), A/B evaluation of agent strategies on identical state, and production recovery (roll back to a known-good checkpoint after a bad tool execution).

For multi-step tasks, checkpointing can be combined with task-level progress tracking - recording individual subtask status (pending, in-progress, completed, failed, skipped) - so that a resumed session knows which steps were completed and can continue from the first incomplete task rather than replaying the entire sequence.

Checkpointing restores only the agent's local execution context; it cannot reverse side effects of non-idempotent tool calls (API mutations, sent messages, deployments). Rolling back to a checkpoint after such actions may leave the agent's restored state inconsistent with external state, making checkpointing most effective for agents whose operations are predominantly local (file edits, shell commands in a [sandbox](./sandbox.md)) rather than those performing irreversible external actions. [Tool execution approval](./tool-execution-approval.md) can mitigate this by gating irreversible actions before they execute.

## Examples

- Snapshotting an agent's workspace filesystem and conversation history after each tool call, allowing rollback if a subsequent step corrupts files.
- Forking from a checkpoint to test two different code-generation approaches on the same repository state.
- An [agent hosting platform](./agent-hosting-platform.md) preserving checkpoints across version migrations so in-flight tasks resume cleanly on updated agent code.
