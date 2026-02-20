# Observability

Observability is the set of tools and practices for understanding and operating AI systems in production by collecting and correlating signals like logs (e.g., [prompts](./prompt.md)/outputs), traces, metrics, [LLM](./llm.md)/version metadata, and user feedback.

## Details

AI observability extends general software observability with concerns specific to non-deterministic model outputs: prompt/response logging, token-level cost tracking (see [inference cost](./inference-cost.md)), [latency](./latency.md) monitoring, and drift detection across model versions.

[Eval runners](./eval-runner.md) often integrate with observability to trace and log each eval step, and production telemetry provides the raw material for building new evals (representative inputs, edge cases, failure patterns). After changes (including [fine-tuning](./fine-tuning.md)), observability helps validate real-world impact and catch regressions.

In [agent](./agent.md) systems, observability is also essential for security: structured traces that link reasoning steps to tool invocations help detect threats like [tool misuse](../threats/tool-misuse.md), [denial of service](../threats/denial-of-service.md), [misaligned model behaviors](../threats/misaligned-model-behaviors.md), and [persistence attacks](../threats/persistence-attacks.md) in production, and audit trails can support reliable attribution and reconstruction of agent actions, particularly when backed by append-only storage and access controls.

When [coding agents](./coding-agent.md) change code faster than humans can review it line-by-line, observability tools extend beyond production monitoring into continuous comprehension - maintaining developer understanding of an evolving system. AI-assisted code comprehension tools that generate system overviews on demand, architecture retrospectives informed by trace and dependency data, and automated change summaries help teams sustain the shared mental model that traditional code review once provided. This application of observability is a mitigation for [cognitive debt](../ideas/cognitive-debt.md) and supports [supervisory engineering](../ideas/supervisory-engineering.md) by giving engineers the system-level visibility needed to assess agent output without reading every line.

## Examples

- A trace viewer that links each [agent](./agent.md) reasoning step to its tool invocations, showing [latency](./latency.md) and token cost at each node.
- A dashboard that tracks per-model [inference cost](./inference-cost.md) and [latency](./latency.md) percentiles across model versions, alerting on regressions after a provider or [prompt](./prompt.md) change.
- A logging pipeline that captures prompt/response pairs with [PII redaction](./pii-handling.md), feeding flagged interactions into an [eval](./evals.md) review queue.
- An audit-trail system backed by append-only storage that records every tool call an [agent](./agent.md) executes, supporting post-incident reconstruction.
