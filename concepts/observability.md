# Observability

Observability is the set of tools and practices for understanding and operating AI systems in production by collecting and correlating signals like logs (e.g., [prompts](./prompt.md)/outputs), traces, metrics, [LLM](./llm.md)/version metadata, and user feedback.

## Details

AI observability extends general software observability with concerns specific to non-deterministic model outputs: prompt/response logging, token-level cost tracking (see [inference cost](./inference-cost.md)), [latency](./latency.md) monitoring, [eval](./evals.md) integration, and drift detection across model versions. [Eval runners](./eval-runner.md) often integrate with observability to trace and log each eval step, and production telemetry provides the raw material for building new evals (representative inputs, edge cases, failure patterns). After changes (including [fine-tuning](./fine-tuning.md)), observability helps validate real-world impact and catch regressions.

In [agent](./agent.md) systems, observability is also essential for security: structured traces that link reasoning steps to tool invocations help detect threats like [tool misuse](../threats/tool-misuse.md), [denial of service](../threats/denial-of-service.md), [misaligned model behaviors](../threats/misaligned-model-behaviors.md), and [persistence attacks](../threats/persistence-attacks.md) in production, and audit trails can support reliable attribution and reconstruction of agent actions, particularly when backed by append-only storage and access controls.

## Examples

- A trace viewer that links each [agent](./agent.md) reasoning step to its tool invocations, showing [latency](./latency.md) and token cost at each node.
- A dashboard that tracks per-model [inference cost](./inference-cost.md) and [latency](./latency.md) percentiles across model versions, alerting on regressions after a provider or [prompt](./prompt.md) change.
- A logging pipeline that captures prompt/response pairs with PII redaction, feeding flagged interactions into an [eval](./evals.md) review queue.
- An audit-trail system backed by append-only storage that records every tool call an [agent](./agent.md) executes, supporting post-incident reconstruction.
