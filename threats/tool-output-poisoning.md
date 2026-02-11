# Tool Output Poisoning

Tool output poisoning is an attack where malicious or manipulated content is injected into the results returned by a [tool](../concepts/tools.md) to an AI [agent](../concepts/agent.md), influencing the agent's subsequent [reasoning](../concepts/reasoning.md) and actions.

## Details

When an agent calls a tool, the returned output is incorporated into its [context](../concepts/context.md) and treated as factual input for the next reasoning step. If an attacker can control or influence the data a tool returns - by compromising the external service, crafting content on a fetched resource, or intercepting the response - they can inject [prompt injection](./prompt-injection.md) payloads, false data, or misleading instructions that the agent processes as trusted information.

Tool output poisoning is a specific form of [context poisoning](./context-poisoning.md) that targets the tool call results within the agent loop. It functions as a vector for indirect [prompt injection](./prompt-injection.md): the injected content arrives not through user input but through data the agent retrieves via its own tool calls. Because agents typically trust their tool outputs more than arbitrary user input, this vector can bypass [guardrails](../concepts/guardrail.md) that focus on screening user messages.

The threat is amplified in multi-step agent workflows where the output of one tool call feeds into subsequent reasoning and further tool calls, allowing a single poisoned result to cascade through the entire execution chain. [MCP](../concepts/mcp.md) servers and other third-party tool providers expand the attack surface by introducing external services whose responses the agent cannot independently verify.

## Examples

- A web page contains hidden prompt injection text that a [web search tool](../concepts/web-search-tool.md) returns to the agent, causing it to follow attacker instructions instead of completing the user's task.
- A compromised API endpoint returns crafted JSON that includes instructions to exfiltrate sensitive data from the agent's context via a subsequent tool call ([data exfiltration](./data-exfiltration.md)).
- A malicious [MCP](../concepts/mcp.md) server returns tool results containing embedded instructions that redirect the agent's [goal](./goal-manipulation.md).
- A code execution tool returns output that includes injected instructions disguised as error messages, causing the agent to execute attacker-specified follow-up actions ([tool misuse](./tool-misuse.md)).

## Mitigations

- Treating tool outputs as untrusted data and applying input sanitization before incorporating them into the agent's context
- [Context engineering](../concepts/context-engineering.md) to clearly separate tool outputs from trusted instructions
- Output validation that checks tool results against expected schemas and content patterns
- Limiting the scope of actions an agent can take based on tool output content ([tool execution approval](../concepts/tool-execution-approval.md))
- [Sandboxing](../concepts/sandbox.md) tool execution and restricting which tools can be invoked in sequence
- [Monitoring](../concepts/observability.md) tool outputs for anomalous content patterns, injection signatures, or unexpected instructions
