# Data Exfiltration

Data exfiltration is the unauthorized extraction or disclosure of sensitive data from a system to an attacker-controlled destination. In [LLM](../concepts/llm.md) applications, this often happens when the model (or its [tools](../concepts/tools.md)) is manipulated into revealing secrets from its [context](../concepts/context.md) or connected systems.

## Details

Data exfiltration can be direct (the model prints the data in its response) or indirect (the [agent](../concepts/agent.md) sends it via a tool call, writes it to a file, embeds it in a URL, or includes it in logs). It is frequently the end goal of [prompt injection](./prompt-injection.md) and [tool misuse](./tool-misuse.md) attacks: the attacker first gains control of the agent's behavior, then uses that control to extract sensitive data. Targets commonly include system prompts (see [system prompt extraction](./system-prompt-extraction.md)), API keys and credentials, retrieved documents, user PII, and database contents.

Beyond overt tool calls, data can leak through channels the application does not treat as outputs: verbose error messages that echo context content, log entries that capture sensitive intermediate state, metadata in API responses (e.g. HTTP headers or filenames), and timing or output-length differences that allow an attacker to infer private data bit by bit. These covert channels are harder to monitor because they bypass output-focused [guardrails](../concepts/guardrail.md).

## Examples

- A [prompt injection](./prompt-injection.md) in a retrieved document causes an agent to send API keys to an attacker via email or a webhook.
- A model reveals a hidden system prompt or a confidential retrieved document in its answer.
- A tool call is coerced into exporting database rows that include PII.
- An agent encodes sensitive data into a URL parameter in a markdown image tag, causing the data to be sent to an external server when the image is rendered.
- An agent's error handler includes the full retrieved document in a stack trace that is written to an application log accessible to a wider audience than the original data source.
- An attacker crafts prompts that cause the model to include or exclude a specific phrase depending on whether a secret value matches a guess, leaking the value one bit at a time through the observable output difference.

## Mitigations

- Network-level restrictions and output filtering on [tool](../concepts/tools.md) calls
- [Sandboxing](../concepts/sandbox.md) to limit data access and egress paths
- [Tool execution approval](../concepts/tool-execution-approval.md) for actions that transmit data externally
- Structured logging with field-level redaction to prevent sensitive context from appearing in error messages or log entries
- Minimizing information in error responses returned to the model (e.g. generic error codes instead of full stack traces)

## Synonyms

exfiltration, data leakage, data theft
