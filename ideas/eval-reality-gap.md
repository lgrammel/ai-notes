# Eval-Reality Gap

The eval-reality gap is the disconnect between strong [eval](../concepts/evals.md) performance and weak real-world utility, where models ace hard [benchmarks](../concepts/benchmarks.md) but fail at basic tasks in practical deployment.

## Details

One explanation is that [RL](../concepts/reinforcement-learning.md) environment design is inadvertently shaped by evals: teams create training environments inspired by the benchmarks they want to perform well on, producing models that are highly specialized for eval-like distributions. This is compounded by inadequate generalization - because models do not transfer skills robustly, narrow RL training on benchmark-like tasks does not translate into broad real-world capability, even when the underlying knowledge is present. A model trained on every competitive programming problem does not necessarily maintain a real codebase without oscillating between bugs.

This is a form of systemic [reward hacking](../concepts/reward-hacking.md): not the model exploiting its reward signal, but the human researchers inadvertently optimizing the training pipeline for eval scores rather than real-world performance.

## Examples

- A model that scores in the top percentile on coding benchmarks but alternates between introducing and reintroducing bugs when fixing real code
- A model that solves hard math competition problems but makes basic errors in applied settings with unfamiliar framing
- An RL-trained model whose training environments were designed to match specific eval distributions, producing high benchmark scores that do not predict deployment quality

## Counterarguments

- The gap may be transient rather than structural. As [benchmarks](../concepts/benchmarks.md) improve (more diverse, more realistic, harder to overfit) and training pipelines mature, the disconnect between eval scores and real-world performance may narrow without requiring a fundamentally different approach to generalization. Previous generation gaps (e.g., early ImageNet overfitting) did close over time.
- Poor real-world performance could reflect insufficient scale, training data gaps, or inadequate [post-training](../concepts/post-training.md) rather than a fundamental generalization failure. Models that score well on benchmarks may also perform well in deployment once the deployment environment is better understood and the right [context engineering](../concepts/context-engineering.md) is applied.
- The framing implies that benchmark optimization is wasted effort, but benchmarks remain one of the few standardized signals available for model comparison. The alternative - evaluating every model on bespoke real-world tasks - is expensive and does not scale. The practical solution may be better benchmarks rather than abandoning benchmark-driven development.

## External references

- https://www.dwarkesh.com/p/ilya-sutskever-2
