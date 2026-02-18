# Harness Engineering

Harness engineering is the discipline of designing the environments, tooling, constraints, and feedback loops that enable [coding agents](./coding-agent.md) to produce and maintain software reliably at scale. Where [context engineering](./context-engineering.md) focuses on what information reaches the model, harness engineering encompasses the full surrounding infrastructure - deterministic enforcement, architectural constraints, repository knowledge bases, application legibility, and agent-driven maintenance processes.

## Details

A harness combines three categories of infrastructure. Deterministic architectural constraints - custom linters, structural tests, dependency-direction enforcement, naming conventions - mechanically prevent classes of error without relying on the agent to remember rules. [Context engineering](./context-engineering.md) provides the agent with the knowledge it needs: structured documentation, [skills](./skill.md), [observability](./observability.md) data, and browser access so the agent can inspect application behavior directly. Agent-driven maintenance ("garbage collection") uses recurring background [coding agent](./coding-agent.md) runs to detect drift, update quality scores, and open targeted refactoring pull requests, preventing entropy from compounding (see [continuous agent-driven refactoring](../ideas/continuous-agent-driven-refactoring.md)).

The central feedback loop is diagnostic: when an agent struggles with a task, the team treats the failure as a signal that some capability is missing - a tool, a [guardrail](./guardrail.md), documentation, or an abstraction - and feeds it back into the harness, typically by having the agent itself write the fix. This makes the harness self-improving: each failure mode encountered becomes a permanent improvement to the environment rather than a one-off correction.

Mechanical enforcement is preferred over prose documentation. Invariants encoded as linters and structural tests apply everywhere at once and produce error messages that inject remediation instructions directly into agent context. Documentation alone drifts, becomes stale, and competes with task-relevant context for the agent's limited [context](./context.md) window. Encoding a constraint in code makes it both verifiable and self-documenting.

Harness engineering constrains the solution space - specific architectural patterns, enforced module boundaries, standardized structures - to increase agent reliability and output trust. This trades "generate anything" flexibility for predictable, maintainable results. The constraint is the enabling condition: rigid architecture allows speed without decay, much as strict type systems enable safe refactoring at scale.

## Examples

- Custom linters that enforce dependency directions between architectural layers (Types -> Config -> Repo -> Service -> Runtime -> UI), with error messages written as agent-readable remediation instructions.
- A structured `docs/` directory treated as the system of record, with a short AGENTS.md serving as a table of contents pointing to deeper sources (see [progressive context disclosure](../ideas/progressive-context-disclosure.md)).
- Wiring browser automation (Chrome DevTools Protocol) and a local observability stack (logs via LogQL, metrics via PromQL) into the agent runtime so the agent can validate UI behavior and performance directly.
- Recurring background agent tasks that scan for deviations from "golden principles," update quality grades per domain, and open fix-up pull requests that can be reviewed in under a minute.
- [Evals](./evals.md) and structural tests that validate the harness itself - checking documentation freshness, cross-link integrity, and coverage of architectural rules.

## External references

- <https://openai.com/index/harness-engineering/>
- <https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html>
