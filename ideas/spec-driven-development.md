# Spec-Driven Development

Spec-driven development is the idea that when [coding agents](../concepts/coding-agent.md) generate implementation from specifications, the specification becomes the highest-leverage artifact for catching errors, shifting review effort from code to the plan that precedes it.

## Details

The logic is direct: if an agent generates code from a spec, a bad spec produces bad code at scale. Traditional user stories and informal requirements are too vague for agent consumption - they leave ambiguities that agents resolve silently, often incorrectly. Teams adopting spec-driven development use structured formats that give agents enough precision to produce correct implementations: EARS (Easy Approach to Requirements Syntax), state machines, decision tables, and formal constraint languages. These are not new techniques, but they are being rediscovered because agent-driven development demands specification precision that human-driven development could tolerate lacking.

A key distinction is between specifications and constraints. Specifications describe what should change - the desired behavior or feature. Constraints define bounded contexts in which change is allowed, including what must not be touched. Constraints limit blast radius and let agents work safely across domain boundaries. When a constraint must be broken, it signals a system boundary that needs refactoring rather than a rule to override. This separation gives agents clear scope without requiring them to infer boundaries from code structure alone.

Spec-driven development complements [TDD as agent constraint](./tdd-as-agent-constraint.md) and [harness engineering](../concepts/harness-engineering.md) as part of a layered verification strategy. TDD validates behavioral correctness at the implementation level. Harness constraints enforce structural invariants mechanically. Specifications operate upstream of both, catching design-level errors before any code is generated. The specification also serves as a [context engineering](../concepts/context-engineering.md) artifact - it structures the information the agent receives, reducing the chance of misinterpretation compared to freeform task descriptions.

## Examples

- A team replacing Jira tickets with structured specification documents that include EARS-formatted requirements, state diagrams for complex workflows, and explicit constraint lists ("must not modify the auth module"), which agents consume directly as task input.
- A developer writing a decision table that maps input conditions to expected outputs for a pricing rules engine, then handing the table to a coding agent that generates both the implementation and tests from it.
- A specification that defines a new API endpoint using a formal schema (request/response types, error codes, rate limits) alongside constraints ("must use the existing database client, must not add new dependencies"), giving the agent precise scope.

## Counterarguments

- Specification quality is difficult to verify mechanically, so the approach shifts the "garbage in" problem upstream rather than eliminating it. Reviewing specifications for completeness and correctness requires the same domain expertise as reviewing code - the cognitive burden moves rather than decreases.
- Formal specification methods have been tried repeatedly (formal methods, model-driven development, executable specifications) and adoption remained niche because the overhead of maintaining precise specifications exceeded the benefit for most teams. Agent-driven development may not change this calculus enough to overcome the historical pattern.
- The approach assumes specifications can be made precise enough for agents without becoming so detailed that writing the spec is equivalent to writing the code. For complex, exploratory, or poorly understood domains, the specification itself may need to be discovered iteratively - making upfront spec-driven development premature.
- Specifications and code can drift apart over time. If agents modify code without updating specifications (or vice versa), the specification becomes a misleading artifact that gives false confidence. Maintaining bidirectional consistency between specs and implementation adds ongoing overhead that the [dark software factory](./dark-software-factory.md) model addresses (agents maintain both) but simpler workflows may not.

## Confidence

**Medium.** The logic is sound - bad specs produce bad code at scale, and structured specifications give agents precision that informal requirements lack. However, specification formats that are both agent-precise and human-maintainable are still emerging, and the historical failure of formal specification adoption suggests that the overhead barrier is real.

## External references

- <https://www.thoughtworks.com/content/dam/thoughtworks/documents/report/tw_future%20_of_software_development_retreat_%20key_takeaways.pdf>
