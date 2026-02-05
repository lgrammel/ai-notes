# Fine-tuning

Further training of an existing model on a narrower dataset to change or improve its behavior (for example instruction-following, style, safety, or domain expertise). Fine-tuning is typically cheaper than pretraining from scratch.

In practice, fine-tuning targets concrete failures measured by evals, often using training examples sourced or prioritized from production telemetry. After fine-tuning, you typically re-run evals and monitor telemetry to confirm improvements and catch regressions.
