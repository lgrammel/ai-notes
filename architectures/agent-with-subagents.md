# Agent with Subagents

A [multi-agent system](../concepts/multi-agent-system.md) where a parent [agent](../concepts/agent.md) delegates subtasks to [subagents](../concepts/subagent.md), each running with its own [context](../concepts/context.md), [tools](../concepts/tools.md), and permissions, and returning results that the parent incorporates into its own reasoning.

## Details

The parent agent handles planning, decomposition, and integration: it breaks a complex task into subtasks, spawns a subagent for each, and synthesizes the returned results into a coherent output. Each subagent operates in its own [context](../concepts/context.md) window ([context isolation](../concepts/context-isolation.md)), seeing only the information the parent explicitly passes to it - typically a task description and relevant excerpts rather than the parent's full context. This isolation keeps subagent contexts focused and limits how far a compromise can propagate.

Subagents can differ from the parent and from each other in tools, permissions, and [LLM](../concepts/llm.md) backends ([model routing](../concepts/model-routing.md)). A parent with broad capabilities can spawn subagents with narrower permissions - for example, delegating a web research subtask to a subagent with only [web search](../concepts/web-search-tool.md) access, or a file search subtask to a subagent with read-only filesystem access. This permission scoping reduces the blast radius of [tool misuse](../threats/tool-misuse.md) or [prompt injection](../threats/prompt-injection.md) in any single subagent.

The architectural risk is in the trust transfer at delegation boundaries. The parent typically treats subagent outputs as reliable data and incorporates them directly into its context. A compromised subagent - one that encountered a [prompt injection](../threats/prompt-injection.md) payload in a web page it fetched or a file it read - can return poisoned results that influence the parent's subsequent reasoning and tool calls. The delegation chain also creates a path for privilege escalation: an attacker who can reach only a front-end subagent may craft inputs that propagate through delegation to a back-end agent with access to restricted resources. [Observability](../concepts/observability.md) across agent boundaries is critical for detecting anomalous inter-agent behavior that would be invisible when monitoring any single agent in isolation.

## Trust boundaries

The parent-subagent context boundary is the critical trust surface. The parent controls what enters each subagent's context (task description, curated inputs) and receives structured results back. This boundary is a form of [context isolation](../concepts/context-isolation.md): each subagent's context window is independent, and the parent mediates all information flow. Subagent permissions can be scoped narrower than the parent's, creating nested capability boundaries - a subagent cannot access tools or data that the parent does not grant it.

However, subagent outputs cross back into the parent's context as data that the parent typically trusts. This trust transfer is the primary injection surface: the parent has no reliable mechanism to verify whether a subagent's output reflects its assigned task or has been influenced by adversarial content the subagent encountered. The delegation chain is a trust chain - each link trusts the previous one, and a compromise at any point can propagate forward. When subagents share state (a common workspace, shared memory, or message queue), that shared resource becomes an additional trust boundary that any participating agent can write to and all can be influenced by.

## Applicable threats

- [Prompt injection](../threats/prompt-injection.md) - untrusted input encountered by a subagent (web content, files, tool results) can override its instructions, and injected outputs can propagate through the parent to influence the broader system
- [Hallucination exploitation](../threats/hallucination-exploitation.md) - crafted inputs that trigger confident but false outputs, compounded across multiple agents
- [Guardrail bypass](../threats/guardrail-bypass.md) - techniques that circumvent safety constraints in any agent in the hierarchy
- [System prompt extraction](../threats/system-prompt-extraction.md) - tricking any agent in the hierarchy into revealing its instructions
- [User manipulation](../threats/user-manipulation.md) - exploiting user trust in the system's outputs, which aggregate results from multiple agents
- [Misaligned model behaviors](../threats/misaligned-model-behaviors.md) - intrinsic model tendencies that degrade output quality in any agent in the hierarchy
- [Training data poisoning](../threats/training-data-poisoning.md) - compromised training data affecting any model in the system
- [Tool misuse](../threats/tool-misuse.md) - authorized but harmful tool calls by any agent; permission scoping limits per-subagent blast radius
- [Tool output poisoning](../threats/tool-output-poisoning.md) - malicious data in tool responses that hijacks a subagent's behavior and propagates through its output to the parent
- [Data exfiltration](../threats/data-exfiltration.md) - sensitive data from the parent's context passed to a subagent and extracted through the subagent's tools
- [Denial of service](../threats/denial-of-service.md) - unbounded subagent spawning, recursive delegation, or subagents entering expensive tool-call loops
- [Goal manipulation](../threats/goal-manipulation.md) - redirected objectives in a subagent that propagate misleading results to the parent, or adversarial subagent outputs that shift the parent's goals
- [Privilege compromise](../threats/privilege-compromise.md) - permission inheritance or escalation across delegation chains, where a compromised subagent leverages the parent's broader access
- [Context poisoning](../threats/context-poisoning.md) - subagent outputs, shared state, or shared memory containing manipulated data that alters the parent's or sibling agents' behavior
- [Multi-agent system threats](../threats/multi-agent-system-threats.md) - communication poisoning between agents, delegation chain exploitation, rogue agents operating outside intended boundaries, and agent impersonation

## Examples

- A [coding agent](../concepts/coding-agent.md) that spawns search subagents to find relevant files in parallel, then uses the results to make targeted edits in the parent context.
- An orchestrator agent that breaks a research task into independent queries, delegates each to a subagent with [web search](../concepts/web-search-tool.md) tools, and synthesizes the results into a final report.
- A CI/CD agent that delegates code generation, code review, and testing to separate subagents with different tool permissions and [LLM](../concepts/llm.md) backends.
