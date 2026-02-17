# PII Handling

PII handling is the set of techniques for detecting, redacting, masking, and controlling access to personally identifiable information as it flows through an AI system's [context](./context.md), [tools](./tools.md), logs, and stored outputs. It addresses the risk that [LLMs](./llm.md) can memorize, reproduce, or route sensitive data in ways that violate privacy regulations or user trust.

## Details

Traditional applications control PII at well-defined storage and API boundaries. AI systems introduce additional surfaces: PII can enter the model's [context](./context.md) from user messages, [retrieval](./retrieval.md) results, tool outputs, or [agent memory](./agent-memory.md), and the model may echo, paraphrase, or combine it in unpredictable ways across its response, tool calls, or downstream logs. [Multi-turn conversations](./multi-turn-conversation.md) compound the problem because PII accumulates across turns, expanding the blast radius if the context is later compromised by [prompt injection](../threats/prompt-injection.md) or [data exfiltration](../threats/data-exfiltration.md).

PII handling operates at multiple points in the pipeline. Pre-inference redaction strips or masks sensitive fields before they enter the model's context - a [context engineering](./context-engineering.md) concern that reduces what the model can leak. Post-inference filtering scans model outputs for PII patterns before they reach the user, functioning as an output [guardrail](./guardrail.md). [AI gateways](./ai-gateway.md) can centralize both stages, applying consistent redaction policies across all model calls rather than relying on each service to implement its own. [Observability](./observability.md) pipelines require field-level redaction so that prompt/response logs capture operational signals without retaining raw PII.

Detection typically uses a combination of named-entity recognition, regex patterns, and purpose-built classifiers to identify categories such as names, email addresses, phone numbers, government IDs, and financial account numbers. Masking strategies range from full removal to tokenized replacement (substituting a reversible placeholder so downstream logic can re-identify the entity without exposing the raw value) to differential privacy noise injection for aggregate analytics. The choice depends on whether the model needs the semantic content of the field to complete its task or merely needs to know a field exists.

Regulatory frameworks such as GDPR and CCPA impose specific obligations around PII - data minimization, purpose limitation, right to deletion, and breach notification - that shape how AI systems must handle personal data. These requirements affect not only runtime redaction but also training data curation, log retention policies, and the design of [agent memory](./agent-memory.md) systems that persist user information across sessions.

## Examples

- An [AI gateway](./ai-gateway.md) that scans every prompt for email addresses and government IDs, replacing them with tokens before forwarding to the [inference provider](./inference-provider.md), then re-hydrates the tokens in the response for the calling service.
- A [customer support agent](../example-systems/customer-support-agent.md) that loads account data from a CRM but masks payment details in the model's context, passing only the last four digits needed for verification.
- A logging pipeline that redacts all PII from prompt/response pairs before writing to the [observability](./observability.md) store, retaining only hashed identifiers for correlation.
- An output [guardrail](./guardrail.md) that blocks responses containing patterns matching social security numbers or credit card numbers before they reach the end user.

## Synonyms

PII redaction, PII filtering, data redaction, personal data handling
