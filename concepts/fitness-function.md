# Fitness Function

A fitness function is a quantitative measure that defines what "healthy" means for a software system in terms an [agent](./agent.md) can evaluate, enabling automated assessment of system quality without human interpretation.

## Details

The concept is borrowed from evolutionary architecture and applied to agent-driven operations. Fitness functions make quality attributes machine-readable: response time percentiles, error rates, dependency health, schema conformance, test coverage thresholds, and architectural constraint compliance. Each function encodes a specific aspect of system health as a computable check with a clear pass/fail or numeric result.

Fitness functions are a prerequisite for self-healing systems (agents returning a system to a known good state after degradation) and self-improving systems (agents evolving non-functional qualities like performance and reliability over time). Without machine-readable definitions of "healthy," agents cannot assess whether an intervention improved the system or degraded it. The latent knowledge problem - senior engineers' undocumented pattern-matching about what "healthy" looks like for a specific system - must be encoded into fitness functions before agents can replicate that judgment.

Fitness functions are distinct from [evals](./evals.md), which measure model or system output quality (did the agent produce a good response?). Fitness functions measure the health of the system the agent operates on (is the software system in a good state?). They complement [harness engineering](./harness-engineering.md) by defining the target state that mechanical enforcement aims to maintain - linters and structural tests enforce invariants, while fitness functions assess whether the overall system remains within acceptable operational bounds. They also complement [observability](./observability.md), which provides the raw signals (metrics, traces, logs) that fitness functions evaluate.

## Examples

- An SLO-based fitness function that defines "healthy" as p99 latency under 200ms and error rate below 0.1%, evaluated by an agent querying a metrics API after each deployment.
- A structural fitness function that checks dependency directions between architectural layers (e.g., UI may depend on Service but not vice versa), run as part of a [harness engineering](./harness-engineering.md) pipeline.
- A data quality fitness function that validates schema conformance, referential integrity, and data freshness across pipeline outputs, enabling an agent to detect and remediate data degradation automatically.
- A security fitness function that verifies no public endpoints were added without authentication middleware, checked by an agent scanning route configurations after each change.
