# Eval-Reality Gap

The eval-reality gap is the disconnect between strong [eval](./evals.md) performance and weak real-world utility, where models ace hard [benchmarks](./benchmarks.md) but fail at basic tasks in practical deployment.

## Details

One explanation is that [RL](./reinforcement-learning.md) environment design is inadvertently shaped by evals: teams create training environments inspired by the benchmarks they want to perform well on, producing models that are highly specialized for eval-like distributions. This is compounded by inadequate generalization - because models do not transfer skills robustly, narrow RL training on benchmark-like tasks does not translate into broad real-world capability, even when the underlying knowledge is present. A model trained on every competitive programming problem does not necessarily maintain a real codebase without oscillating between bugs.

This is a form of systemic [reward hacking](./reward-hacking.md): not the model exploiting its reward signal, but the human researchers inadvertently optimizing the training pipeline for eval scores rather than real-world performance.

Whether the gap is structural or transient remains an open question. Previous generation gaps (e.g., early ImageNet overfitting) closed over time as benchmarks became more diverse and training pipelines matured. Poor real-world performance may also reflect insufficient [context engineering](./context-engineering.md) or deployment-side gaps rather than a fundamental generalization failure.

## Examples

- A model that scores in the top percentile on coding benchmarks but alternates between introducing and reintroducing bugs when fixing real code
- A model that solves hard math competition problems but makes basic errors in applied settings with unfamiliar framing
- An RL-trained model whose training environments were designed to match specific eval distributions, producing high benchmark scores that do not predict deployment quality

## External references

- https://www.dwarkesh.com/p/ilya-sutskever-2
