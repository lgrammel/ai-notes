# Human-in-the-Loop

Human-in-the-loop is a design pattern where human review, approval, or correction is integrated into an AI or [agent](./agent.md) workflow, giving a person the opportunity to inspect, modify, or override system decisions before they take effect.

## Details

Human-in-the-loop operates on a spectrum from fully autonomous (no human involvement) to fully supervised (every action reviewed). In [agent](./agent.md) systems, the most common form is [tool execution approval](./tool-execution-approval.md), where high-risk [tool](./tools.md) calls are paused for human confirmation while low-risk actions proceed automatically. Beyond tool approval, human-in-the-loop encompasses review checkpoints (a human reviews agent output before it is published or deployed), escalation triggers (the agent hands off to a human when confidence is low or the task exceeds its scope), and feedback loops (human corrections are used to improve future behavior via [fine-tuning](./fine-tuning.md) or [evals](./evals.md)).

In [agent](./agent.md) systems with human-in-the-loop approval, the agent's [tool](./tools.md) capabilities define what it can request, but the human's approval defines what actually executes. This creates a gap between the agent's theoretical capabilities (bounded by its tools) and its effective capabilities (bounded by what the human permits). The human reviewer is both the primary defense and the primary vulnerability of this pattern.

Human-in-the-loop acts as a system-level [guardrail](./guardrail.md): it catches errors, [hallucinations](./hallucination.md), and [tool misuse](../threats/tool-misuse.md) that automated checks miss. The tradeoff is reduced autonomy and throughput - every review step adds latency and requires human attention. This makes all forms of human-in-the-loop review - tool approval, code review, content sign-off - vulnerable to [approval fatigue exploitation](../threats/approval-fatigue-exploitation.md), where high volumes or complexity of requests degrade reviewer attentiveness and allow harmful actions to slip through.

### Centaur and cyborg patterns

Two collaboration patterns describe how practitioners navigate the [jagged frontier](../ideas/jagged-frontier.md) of AI capability within human-in-the-loop workflows. Centaur work maintains a clear boundary between human and AI responsibility: the practitioner identifies which tasks fall inside the AI's capability frontier and delegates those entirely, while retaining tasks that require human judgment or fall outside the frontier. This maps to delegation models like [cloud coding agents](./coding-agent.md) where a developer specifies a task, the agent implements it, and the developer reviews the result. [Supervisory engineering](../ideas/supervisory-engineering.md) formalizes the skill set this pattern demands. Cyborg work interleaves human and AI contributions at the sub-task level, with the practitioner moving back and forth across the capability boundary within a single task - initiating a direction, letting the AI extend it, correcting course, and iterating. This maps to copilot interfaces and local [coding agents](./coding-agent.md) operating in a pair-programming model. Both patterns produce better outcomes than unstructured AI use, but they place different demands on the practitioner: centaur work requires accurate task-level judgment about what AI can handle, while cyborg work requires continuous micro-evaluation of AI output within a shared workflow.

## Examples

- A local [coding agent](./coding-agent.md) working in a pair-programming model where the developer reviews each proposed change before it is applied.
- A content generation pipeline where a human editor reviews and approves agent-drafted articles before publication.
- A [multi-agent system](./multi-agent-system.md) that escalates to a human operator when agents disagree or encounter ambiguous instructions.
- A customer support agent that handles routine queries autonomously but routes complex or sensitive cases to a human representative.

## Synonyms

HITL, human oversight, human review, human supervision
