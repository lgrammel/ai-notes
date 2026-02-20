# Supervisory Engineering

Supervisory engineering is the emerging practice of directing, evaluating, and correcting the output of [coding agents](../concepts/coding-agent.md) - a middle loop of work between inner-loop coding (write/test/debug) and outer-loop delivery (CI/CD/deploy/operate).

## Details

The middle loop requires a different skill set from writing code directly. Practitioners decompose problems into agent-sized work packages, calibrate trust in agent output, recognize plausible-but-incorrect results, and maintain architectural coherence across parallel streams of agent-generated work. Those who excel think in terms of delegation and orchestration rather than direct implementation, hold strong mental models of system architecture, and can rapidly assess output quality without reading every line.

As [cloud coding agents](../example-systems/cloud-coding-agent.md) handle more implementation work, the bottleneck shifts from coding capacity to supervisory capacity. The volume of agent-generated changes can exceed a team's ability to review meaningfully, creating [approval fatigue](../threats/approval-fatigue-exploitation.md) risk. Effective supervisory engineering mitigates this by combining [risk-tiered verification](./risk-tiered-verification.md) (focusing human attention where blast radius is highest), [TDD as agent constraint](./tdd-as-agent-constraint.md) (making each agent step independently verifiable), and [harness engineering](../concepts/harness-engineering.md) (mechanically enforcing invariants the supervisor would otherwise check manually).

The shift creates a career identity challenge for developers who entered the profession to write code. The historical parallel is computer graphics: in 1992, engineers hand-coded polygon rendering algorithms; by 1994, that work had been pushed into hardware, and the job became animation and lighting. Each time the abstraction layer rose, engineers who identified with the previous layer's work struggled to adapt. The same dynamic applies to code production - the new work demands different aptitudes and different sources of professional satisfaction.

## Examples

- An engineer reviewing an agent's implementation [plan](../concepts/planning.md) and restructuring the task decomposition before the agent writes any code, catching an architectural mistake that would have propagated across multiple files.
- A staff engineer running five parallel [cloud coding agent](../example-systems/cloud-coding-agent.md) sessions on different features, spending most of their time assessing outputs and re-prompting rather than writing code directly.
- A team lead who identifies that an agent's refactoring PR introduces a subtle [cognitive debt](./cognitive-debt.md) risk - the code is correct but organizes modules in a way no team member understands - and rejects it with a more constrained specification.

## Counterarguments

- The skills described - problem decomposition, trust calibration, architectural judgment - are not new; they are what staff and principal engineers already do when delegating to junior developers. Supervisory engineering may be experienced senior engineering under a new label, and naming it separately risks creating artificial specialization around a transitional workflow.
- If agent reliability improves enough that agents can self-supervise (through [multi-agent systems](../concepts/multi-agent-system.md) with review agents, or through improved [planning](../concepts/planning.md) and self-correction), the middle loop may shrink to a narrow verification step rather than a full engineering discipline. The concept could describe a temporary skill gap rather than a permanent role.
- Formalizing supervisory engineering as a distinct practice risks devaluing direct implementation skill prematurely. Teams that over-invest in supervision and under-invest in hands-on coding capability may lose the deep system understanding that makes effective supervision possible in the first place.

## Confidence

**Medium.** The middle loop is widely observed by practitioners working with coding agents, and the skill set it requires is genuinely distinct from both writing code and managing delivery. However, it is not yet clear whether this stabilizes as a permanent engineering discipline or contracts as agent capabilities improve.

## Synonyms

middle loop engineering, agent supervision

## External references

- <https://www.thoughtworks.com/content/dam/thoughtworks/documents/report/tw_future%20_of_software_development_retreat_%20key_takeaways.pdf>
