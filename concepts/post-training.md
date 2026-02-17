# Post-training

Post-training is an umbrella term for all [training](./training.md) phases applied to a base model after [pretraining](./pretraining.md), with the goal of shaping the model's behavior for specific tasks, formats, safety constraints, or interaction styles.

## Details

Common post-training techniques include supervised [fine-tuning](./fine-tuning.md) (for example instruction tuning), [reinforcement learning](./reinforcement-learning.md)-based methods (for example [RLHF](./rlhf.md), DPO), and safety training. These stages typically use smaller, more curated datasets than pretraining.

Post-training is what turns a base model into a deployable [instruction following](./instruction-following.md) model with appropriate [alignment](./alignment.md), and is a key part of what [model developers](./model-developer.md) do to prepare models for [inference](./inference.md). Safety training in particular establishes model-level [alignment](./alignment.md) such as refusal behaviors and content-policy adherence.

The boundary between post-training techniques is fluid: some taxonomies treat instruction tuning and preference-based alignment as distinct stages, while others group them together under fine-tuning or post-training depending on context.

## Examples

- Instruction tuning a base model on prompt-response pairs to improve [instruction following](./instruction-following.md)
- Applying RLHF (reinforcement learning from human feedback) to align a model with human preferences
- DPO (direct preference optimization) as a simpler alternative to RLHF for preference-based alignment
- Safety training to reduce harmful or policy-violating outputs
- [Fine-tuning](./fine-tuning.md) on [tool](./tools.md)-call data to teach structured tool use
