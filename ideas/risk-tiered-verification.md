# Risk-Tiered Verification

Risk-tiered verification is the idea that verification investment for AI-generated code should be proportional to business blast radius rather than uniform across all changes, shifting engineering from a craft model (every line hand-reviewed) to a risk management model.

## Details

The core question becomes: "what is the blast radius if this code is wrong, and is our verification proportional to that risk?" Code is tiered by exposure - internal tools, external-facing services, and safety-critical systems carry different risk profiles and warrant different verification strategies. Human review concentrates on high-blast-radius changes where errors have significant business, safety, or security consequences. Low-risk changes rely on automated verification: type systems, linters, test suites, and [code review agents](../concepts/coding-agent.md).

This approach addresses the throughput mismatch between [coding agents](../concepts/coding-agent.md) and human reviewers. As agents generate more changes in parallel, uniform review becomes a bottleneck that either slows delivery or degrades review quality through [approval fatigue](../threats/approval-fatigue-exploitation.md). Risk tiering preserves human attention for decisions where it matters most while letting [harness engineering](../concepts/harness-engineering.md) - mechanical enforcement via linters, structural tests, and dependency rules - handle verification at lower tiers.

The practice complements [TDD as agent constraint](./tdd-as-agent-constraint.md) (behavioral verification at the individual change level) and [spec-driven development](./spec-driven-development.md) (catching errors upstream in specifications). Together, these approaches form a layered verification strategy: specifications catch design errors, TDD catches behavioral errors, harness constraints catch structural errors, and human review catches judgment errors - with each layer's coverage calibrated to the risk tier of the change.

## Examples

- A team that requires full human review for changes to payment processing and authentication code but accepts automated-only verification for internal admin tooling and documentation updates.
- An organization that classifies repositories by blast radius (critical, standard, internal) and configures different CI gate requirements for each tier - critical repos require two human approvals plus security review; internal repos require passing tests and linter checks only.
- A [cloud coding agent](../example-systems/cloud-coding-agent.md) platform that automatically tags PRs with a risk tier based on which files and services are modified, routing high-risk changes to senior reviewers and auto-merging low-risk changes that pass all automated checks.

## Counterarguments

- Blast radius is difficult to assess accurately before a change ships. Subtle bugs in code classified as "low-risk" can cascade through system dependencies in ways that the tiering model does not anticipate, and the classification itself becomes a single point of failure - a miscategorized change bypasses the review that would have caught the problem.
- Risk tiering may create a two-tier quality culture where "low-risk" code accumulates technical and [cognitive debt](./cognitive-debt.md) because no human ever reads it. Over time, the low-tier codebase degrades in ways that are invisible until a low-risk component becomes critical, at which point the accumulated debt is discovered all at once.
- The approach assumes that automated verification (tests, linters, type checks) is sufficient for low-risk code, but the quality of automated verification itself varies. A weak test suite or incomplete linter configuration provides false confidence, and risk tiering removes the human safety net that would otherwise catch these gaps.
- The note does not address who performs the risk classification. If agents classify their own changes, there is a conflict of interest. If humans classify every change, it adds overhead that partially offsets the efficiency gains. Reliable automated classification based on file paths and service boundaries is a prerequisite the approach assumes but does not examine - and miscategorization is a silent failure mode where the consequences only surface after the wrong tier of verification has already been applied.

## Confidence

**Medium.** The principle is sound - uniform review does not scale with agent-driven throughput, and not all code carries equal risk. Informal risk tiering already happens in practice (critical systems get more scrutiny). However, formalizing it requires reliable blast-radius classification, which is an unsolved problem, and the long-term effects of reducing human review on lower tiers are unknown.

## External references

- <https://www.thoughtworks.com/content/dam/thoughtworks/documents/report/tw_future%20_of_software_development_retreat_%20key_takeaways.pdf>
