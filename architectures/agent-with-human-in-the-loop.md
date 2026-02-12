# Agent with Human-in-the-Loop

An [agent](../concepts/agent.md) where [human-in-the-loop](../concepts/human-in-the-loop.md) review - primarily [tool execution approval](../concepts/tool-execution-approval.md) - is a core architectural component that gates tool execution, making the agent's control flow a propose-review-execute loop rather than a fully autonomous decide-execute cycle.

## Details

This architecture overlays a human approval gate onto any tool-using agent (whether it uses [API-style tools](./agent-with-api-style-tools.md), a [colocated filesystem](./agent-with-colocated-filesystem.md), or [computer use](./computer-use-agent.md)). The agent proposes an action, the [agent runtime](../concepts/agent-runtime.md) pauses execution and presents it to a human reviewer, and the reviewer approves, rejects, or modifies the action before the runtime executes it. This propose-review-execute loop is the defining structural difference from other agent architectures where human review is an optional [guardrail](../concepts/guardrail.md) rather than a required control flow step.

Approval gates are typically calibrated by risk level: low-risk, reversible actions (file reads, searches) may auto-approve, while high-risk or irreversible actions (file writes, shell commands, external API calls, deployments) require explicit confirmation. A common calibration heuristic crosses stakes (low/high) with reversibility (easy/hard) to determine where on the autonomy spectrum each action falls. The result is a system where the agent's theoretical capabilities (defined by its tools) differ from its effective capabilities (bounded by what the human approves). [Copilot interfaces](../concepts/copilot-interface.md) are a common UI pattern for this architecture, embedding the approval flow into the user's existing workspace.

The human reviewer is both the architecture's primary defense and its primary vulnerability. The reviewer catches [tool misuse](../threats/tool-misuse.md), [goal manipulation](../threats/goal-manipulation.md), and [data exfiltration](../threats/data-exfiltration.md) attempts that automated guardrails miss - but review quality degrades under volume, complexity, or time pressure. This makes [human approval fatigue exploitation](../threats/human-approval-fatigue-exploitation.md) the architecture-specific threat: an attacker who degrades reviewer attentiveness effectively converts a human-supervised system into an unsupervised one without bypassing any technical control.

## Trust boundaries

The human approval gate is the primary trust boundary between agent decisions and real-world effects. The agent's tool capabilities define what it can request; the human's approval defines what actually executes. This creates two nested boundaries: the tool/permission boundary (what the agent is technically allowed to request) and the approval boundary (what the human actually permits).

The underlying tool capabilities (API calls, filesystem access, shell commands, GUI actions) determine the capability boundary - identical to whichever base architecture the agent uses. The human review layer sits inside this boundary, further constraining effective access. Auto-approved actions bypass the human boundary and have the same trust model as the corresponding fully autonomous architecture. The agent's context (including tool outputs from previous steps) accumulates across the approval loop, and the human typically does not review context content - only proposed actions.

## Applicable threats

- [Prompt injection](../threats/prompt-injection.md) - untrusted input in context or tool results can influence proposed actions; the human reviewer may not recognize injection-driven proposals as malicious
- [Hallucination exploitation](../threats/hallucination-exploitation.md) - crafted inputs that trigger confident but false outputs, leading to plausible but harmful action proposals
- [Guardrail bypass](../threats/guardrail-bypass.md) - techniques that circumvent safety constraints, including manipulating auto-approval thresholds
- [System prompt extraction](../threats/system-prompt-extraction.md) - tricking the model into revealing its instructions
- [User manipulation](../threats/user-manipulation.md) - exploiting the reviewer's trust in the agent's outputs, particularly when the agent presents confident justifications for harmful actions
- [Misaligned model behaviors](../threats/misaligned-model-behaviors.md) - intrinsic model tendencies that degrade output quality or produce subtly harmful proposals
- [Training data poisoning](../threats/training-data-poisoning.md) - compromised training data affecting the model's behavior
- [Tool misuse](../threats/tool-misuse.md) - authorized but harmful tool calls; attenuated by human review but not eliminated, especially when the harm is subtle or the reviewer lacks domain context
- [Tool output poisoning](../threats/tool-output-poisoning.md) - malicious data in tool responses that influences subsequent proposals the human reviews
- [Data exfiltration](../threats/data-exfiltration.md) - sensitive data extracted through approved tool calls when the reviewer does not recognize the exfiltration pattern
- [Denial of service](../threats/denial-of-service.md) - unbounded tool-call proposals or expensive auto-approved actions that exhaust resources
- [Goal manipulation](../threats/goal-manipulation.md) - redirected agent objectives; the human may catch goal drift if reviewing individual actions but miss gradual shifts across many steps
- [Privilege compromise](../threats/privilege-compromise.md) - over-scoped tool credentials granting broader access than intended, bypassing the value of human review
- [Human approval fatigue exploitation](../threats/human-approval-fatigue-exploitation.md) - degrading review quality through high volumes, complexity, or urgency to make the reviewer rubber-stamp harmful actions

## Examples

- A [coding agent](../concepts/coding-agent.md) in a [copilot interface](../concepts/copilot-interface.md) that proposes file edits and shell commands for the developer to accept, reject, or modify before execution.
- An [agent](../concepts/agent.md) that auto-approves read-only database queries but pauses for human confirmation before any write or delete operations.
- A deployment agent that generates infrastructure changes and requires explicit human sign-off before applying them to production.
- OpenAI Operator requiring user confirmation for sensitive actions (purchases, logins, form submissions) while auto-executing low-risk browsing actions.
