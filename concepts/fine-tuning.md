# Fine-tuning

Further training of an existing [model](./large-language-model.md) on a narrower dataset to change or improve its behavior (for example instruction-following, style, safety, or domain expertise). Fine-tuning is typically cheaper than pretraining from scratch.

In practice, fine-tuning targets concrete failures measured by [evals](./evaluations-evals.md), often using training examples sourced or prioritized from production [telemetry](./observability-tools.md). After fine-tuning, you typically re-run [evals](./evaluations-evals.md) and monitor [telemetry](./observability-tools.md) to confirm improvements and catch regressions.
