# Tool Misuse

Tool misuse occurs when attackers manipulate AI [agents](../concepts/agent.md) into abusing their integrated [tools](../concepts/tools.md) through deceptive prompts or adversarial data, causing the agent to perform harmful actions while operating within its authorized permissions.

## Details

Tool misuse is distinguished from [privilege compromise](./privilege-compromise.md) (where the attacker gains unauthorized permissions) and from [unauthorized code execution](./unauthorized-code-execution.md) (where the attacker exploits code execution vulnerabilities) by the fact that each action falls within the agent's authorized permissions. Tool misuse is commonly enabled by [prompt injection](./prompt-injection.md).

Because each individual action falls within policy, tool misuse is difficult to detect with permission checks alone. Misuse patterns include: correct tool but wrong target (reading a sensitive file instead of the intended one), correct tool but excessive scope (querying all rows instead of one), and correct tool but harmful sequence (a series of individually benign calls that together achieve an unauthorized objective such as bulk [data exfiltration](./data-exfiltration.md)). Detection often requires behavioral [observability](../concepts/observability.md) - correlating sequences of tool calls against expected task patterns rather than checking each call in isolation.

When tool misuse involves the agent pursuing entirely new objectives (rather than just misapplying a single tool), it overlaps with [goal manipulation](./goal-manipulation.md).

## Examples

- A [prompt injection](./prompt-injection.md) in a retrieved email causes an agent to forward confidential files using its authorized email tool.
- An agent with database access is tricked into running a broad DELETE query that it has permission to execute.
- A coding agent is manipulated into committing and pushing malicious code changes through its authorized git tools.
- An agent with file-system read access is tricked into reading `~/.ssh/id_rsa` instead of the project file it was asked to summarize - the read permission is legitimate, but the target is not.
- A customer-support agent authorized to issue refunds is manipulated into issuing a maximum-value refund for a fabricated complaint.
- An agent executes a sequence of individually harmless API calls - listing users, reading profiles, exporting contacts - that together constitute bulk [data exfiltration](./data-exfiltration.md).

## Mitigations

- [Tool execution approval](../concepts/tool-execution-approval.md) for high-risk actions (effectiveness can be degraded by [approval fatigue exploitation](./approval-fatigue-exploitation.md))
- Least-privilege [tool](../concepts/tools.md) permissions
- [Sandboxing](../concepts/sandbox.md) tool execution environments
- Input validation on tool arguments
