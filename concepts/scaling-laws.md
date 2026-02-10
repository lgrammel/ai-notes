# Scaling Laws

Scaling laws are empirical power-law relationships between compute, dataset size, model parameters, and model performance (typically measured as loss), describing how predictably a model improves as these resources increase.

## Details

The discovery of reliable scaling laws for [pretraining](./pretraining.md) -- notably that loss decreases as a smooth power law of compute, data, and parameters -- shifted the field from experiment-driven research toward compute-driven investment (~2020-2025). During this period, the dominant strategy was to scale up the [pretraining](./pretraining.md) recipe: more data, more compute, larger models. Companies favored scaling because it offered a low-risk, predictable return on investment compared to open-ended research.

Scaling laws for [pretraining](./pretraining.md) face a hard constraint: [training](./training.md) data is finite. As available text data approaches exhaustion, the pretraining scaling recipe yields diminishing returns, shifting the bottleneck from compute back to ideas. The field has since expanded scaling efforts to [reinforcement learning](./reinforcement-learning.md) (long rollouts, RL environments), though RL scaling is less predictable and involves more design choices than pretraining scaling.

## Examples

- The Chinchilla scaling laws showing the compute-optimal ratio between model parameters and training tokens
- GPT-3 demonstrating that scaling a single [pretraining](./pretraining.md) recipe from 125M to 175B parameters yields consistent capability improvements
- The transition from pretraining-dominated scaling to RL-dominated scaling as pretraining data becomes a constraint

## Synonyms

neural scaling laws
