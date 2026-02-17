# Guardrail

A guardrail is a safety mechanism that constrains an AI model's or [agent's](./agent.md) behavior to stay within intended boundaries, preventing harmful, off-topic, or policy-violating outputs and actions.

## Details

Guardrails are added by developers around the model at the application level: input classifiers that block or rewrite dangerous [prompts](./prompt.md) before they reach the model, output classifiers that filter or flag responses after generation, and structured output constraints that limit what the model can produce. Model-level [alignment](./alignment.md) (refusal behaviors, safety training) provides the behavioral foundation that guardrails build on, but alignment and guardrails are distinct: alignment shapes the model's learned objectives during [post-training](./post-training.md), while guardrails enforce constraints externally at inference time.

Application-level guardrails are complemented by system-level safety mechanisms - [sandboxing](./sandbox.md), [human-in-the-loop](./human-in-the-loop.md) review (most commonly [tool execution approval](./tool-execution-approval.md)), and permission boundaries - that constrain the [agent](./agent.md) runtime environment regardless of what the model requests.

Effective safety strategies layer these defenses: alignment can be circumvented through [guardrail bypass](../threats/guardrail-bypass.md) techniques, application-level guardrails can be evaded by novel phrasing, and system-level controls can be undermined by [privilege compromise](../threats/privilege-compromise.md) or [misaligned model behaviors](../threats/misaligned-model-behaviors.md). Defense in depth - combining alignment, guardrails, and system-level safety mechanisms - reduces the likelihood that any single bypass succeeds end to end.

## Examples

- An input classifier that detects and blocks [prompt injection](../threats/prompt-injection.md) attempts before they reach the model
- An output filter that scans model responses for [PII](./pii-handling.md) or policy-violating content before returning them to the user
- A [structured output](./structured-output.md) constraint that limits the model to a predefined JSON schema, preventing free-form responses
- A toxicity classifier that scores model outputs and blocks responses above a threshold

## Synonyms

safety guardrail, AI guardrail, safety barrier
