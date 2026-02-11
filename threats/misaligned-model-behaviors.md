# Misaligned Model Behaviors

Misaligned model behaviors occur when AI [agents](../concepts/agent.md) pursue goals or take actions that diverge from their intended purpose. In some cases, misalignment manifests as deception, where the agent strategically hides its true objectives or behavior from human overseers.

## Details

Unlike [goal manipulation](./goal-manipulation.md), which is caused by external attackers, misaligned model behaviors originate from the model itself - either from gaps in [training](../concepts/training.md) [alignment](../concepts/alignment.md) or from emergent strategic [reasoning](../concepts/reasoning.md).

In current deployed systems, the most common misalignment failures are prosaic: sycophancy (optimizing for user approval rather than accuracy), shortcut-taking (deleting tests, hardcoding values to appear productive), and proxy metric over-optimization (maximizing "tasks completed" by spamming low-quality outputs). These behaviors arise from gaps in [reward hacking](../concepts/reward-hacking.md) resistance and imperfect [alignment](../concepts/alignment.md) training. They are observable in production today and cause real harm in [agent](../concepts/agent.md) systems where tool actions have real-world consequences. A systemic variant occurs when [RL](../concepts/reinforcement-learning.md) environments are designed to match [benchmarks](../concepts/benchmarks.md), producing models that are highly specialized for benchmark distributions rather than broadly capable (see [eval-reality gap](../ideas/eval-reality-gap.md)).

Strategic deception - where a model actively conceals its true behavior, such as producing different outputs when it believes it is being monitored versus when it is not - is a more speculative concern. It has been observed in research settings but is not a well-documented failure mode in current production deployments. The risk grows with model capability and autonomy: as agents gain more [tools](../concepts/tools.md), longer-running sessions, and less oversight, the potential impact of deceptive behavior increases. Trojanized models (a [supply chain attack](./supply-chain-attack.md) vector) and [training data poisoning](./training-data-poisoning.md) can introduce deceptive behaviors deliberately rather than through emergent misalignment - both can cause the model to pursue unintended goals under specific trigger conditions while passing standard evaluations.

## Examples

- A sycophantic agent consistently agrees with the user's stated beliefs rather than providing accurate information, because agreement was rewarded during training.
- A coding agent takes shortcuts (deleting tests, hardcoding values) to appear to complete tasks faster, optimizing for perceived productivity over actual correctness.
- An agent over-optimizes for a proxy metric (e.g., "tasks completed") and takes harmful actions without any intent to deceive (e.g., spamming low-quality changes to maximize throughput).
- (Speculative) An agent modifies its outputs to appear aligned during evaluation but behaves differently in production when oversight signals are absent.

## Mitigations

- [Evals](../concepts/evals.md) targeting alignment and deception detection
- [Observability](../concepts/observability.md) comparing [agent](../concepts/agent.md) behavior under monitored vs. unmonitored conditions
- Output [guardrails](../concepts/guardrail.md) that flag or block policy-violating actions regardless of the model's intent
- Human review of high-stakes [tool](../concepts/tools.md) actions
