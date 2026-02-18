# Continuous Agent-Driven Refactoring

Continuous agent-driven refactoring is the idea that background [coding agents](../concepts/coding-agent.md) running on a recurring cadence can manage codebase entropy, functioning as garbage collection for agent-generated code. These agents detect architectural drift, enforce "golden principles," update quality grades, and open targeted refactoring pull requests.

## Details

When [coding agents](../concepts/coding-agent.md) generate code at high throughput, they replicate patterns that already exist in the repository, including suboptimal or inconsistent ones. Over time, this pattern replication causes drift: naming conventions diverge, deprecated patterns spread, and architectural boundaries erode. Manual cleanup does not scale - one team reported spending 20% of engineering time on weekly cleanup of "AI slop" before automating the process.

The alternative is encoding opinionated, mechanical rules ("golden principles") directly into the repository and running background agent tasks that scan for deviations on a regular cadence. These agents open small, focused refactoring pull requests - each reviewable in under a minute and often eligible for automerge. Quality grades per product domain and architectural layer track gaps over time, giving both agents and humans visibility into where drift is accumulating.

This approach treats technical debt as a continuous maintenance concern rather than a periodic cleanup project. Small, frequent corrections prevent bad patterns from compounding across the codebase over days or weeks. The economics favor this model when agent throughput is high: the cost of a background refactoring run is low relative to the cost of a large manual cleanup, and each correction captured as a golden principle applies to all future code automatically.

Continuous agent-driven refactoring differs from [cognitive debt](./cognitive-debt.md), which describes erosion of human understanding. Here the concern is codebase-level entropy - the code itself drifts from intended patterns regardless of whether humans understand it. Both problems compound with agent throughput, but they require different mitigations: cognitive debt requires deliberate human comprehension, while codebase entropy can be addressed mechanically through automated agents operating within a [harness](../concepts/harness-engineering.md).

## Counterarguments

- Background refactoring agents may introduce their own drift if their understanding of "golden principles" is imprecise or if the principles themselves are poorly specified. An agent enforcing a subtly wrong interpretation of a rule could systematically degrade the codebase while appearing to improve it.
- Quality grading is inherently subjective. Automated scores risk creating a false sense of health - a codebase can score well on measurable dimensions while harboring deeper structural problems that no lint rule captures. Teams may over-index on metric improvement at the expense of harder-to-measure qualities.
- The approach assumes high agent reliability for maintenance tasks. If the refactoring agents themselves produce flawed changes at a meaningful rate, the volume of low-quality PRs could overwhelm reviewers rather than relieving them - shifting the entropy problem from the codebase to the review queue.
- Refactoring agents modifying code that other agents are actively working on creates merge conflicts and can invalidate in-progress work, requiring coordination mechanisms that add complexity to the background automation.
- Golden principles may be premature for fast-evolving codebases where the "right" pattern has not yet stabilized. Encoding opinionated rules too early locks in conventions that the team may need to revise, turning the refactoring agent into an obstacle rather than an aid.

## Confidence

**Medium.** The pattern is grounded in a concrete case study and the underlying economics are sound: continuous small corrections are cheaper than periodic large cleanups when agent throughput is high. However, the approach is demonstrated in a single team's experience with a single agent platform, and the risks of compounding automated errors through background agents are not yet well-characterized.

## External references

- <https://openai.com/index/harness-engineering/>
