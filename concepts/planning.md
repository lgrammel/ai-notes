# Planning

Planning is the capability of an [agent](./agent.md) to decompose a complex task into a sequence of steps and determine the order in which to execute them. It is an application of [reasoning](./reasoning.md) focused specifically on structuring future actions rather than analyzing information or producing a final answer.

## Details

Planning differs from [reasoning](./reasoning.md) in scope: reasoning is the general capability exercised at each step of the agent loop (evaluating context, selecting a tool call, judging completeness), while planning specifically concerns the generation and maintenance of a multi-step execution strategy before or during action. An agent can reason without planning (reactive step-by-step execution) but cannot plan without reasoning.

Planning also differs from [AI workflows](./ai-workflow.md), where the step sequence is fixed at design time by a developer. A plan is generated at runtime by the model, allowing the agent to adapt its approach to novel inputs. This flexibility comes with a cost: plans can be wrong, incomplete, or manipulated, while workflows execute a known-good sequence deterministically.

### Explicit vs implicit planning

Some agents produce an explicit plan - a structured list of steps emitted as text or [structured output](./structured-output.md) before execution begins. The plan may be stored in the [context](./context.md), written to a file, or returned to the user for approval. Explicit plans are inspectable, revisable, and can serve as a progress-tracking mechanism when combined with [agent checkpointing](./agent-checkpointing.md). Other agents plan implicitly: the model's [reasoning](./reasoning.md) trace determines the next action without surfacing a complete step sequence. Implicit planning is simpler to implement but harder to debug, audit, or interrupt mid-execution.

### Plan-then-execute vs interleaved planning

In a plan-then-execute pattern, the agent generates a full plan upfront, then executes each step in order. This works well for tasks with predictable structure but becomes brittle when intermediate results invalidate later steps. Interleaved planning addresses this by allowing the agent to revise the remaining plan after each step, incorporating new information from [tool](./tools.md) outputs or environmental changes. Most production agents use some form of interleaved planning, even if only implicitly through the [reasoning](./reasoning.md) at each loop iteration.

### Planning and task decomposition

Planning is the mechanism behind task decomposition in [multi-agent systems](./multi-agent-system.md). A parent agent plans by identifying subtasks, then delegates each to a [subagent](./subagent.md) with scoped [context](./context.md) and [tools](./tools.md). The quality of the decomposition - whether subtasks are independent, correctly scoped, and complete - depends directly on the planning capability of the parent agent.

Because plans govern what an agent attempts and in what order, they are a target for [goal manipulation](../threats/goal-manipulation.md) attacks that redirect objectives by influencing the planning phase. Explicit plans are particularly sensitive: if an attacker can modify a stored plan (through [context poisoning](../threats/context-poisoning.md) or [prompt injection](../threats/prompt-injection.md)), subsequent execution follows the corrupted plan faithfully.

## Examples

- A [coding agent](./coding-agent.md) that generates an implementation plan (files to create, tests to write, dependencies to add) before making any edits, then executes each step and revises the plan when tests fail.
- A [deep research agent](../example-systems/deep-research-agent.md) that decomposes a research query into sub-questions, plans a search strategy, and refines the plan as it discovers relevant sources.
- A parent agent that plans a task decomposition, assigns each subtask to a [subagent](./subagent.md), and re-plans when a subagent returns unexpected results.

## Synonyms

task planning, plan generation, action planning
