# Reinforcement Learning

Reinforcement learning (RL) is a [training](./training.md) paradigm where an agent learns to select actions that maximize cumulative reward through trial-and-error interaction with an environment, rather than learning from labeled examples.

In the context of [LLMs](./llm.md), RL is primarily applied during [post-training](./post-training.md) to shape model behavior using reward signals. [RLHF](./rlhf.md) is the most prominent application: a reward model trained on human preference data provides the signal, and RL optimization (commonly PPO) updates the LLM's policy to produce outputs that score higher on that reward model. This is a core mechanism for [alignment](./alignment.md) and [instruction following](./instruction-following.md). RL has also been used to train [reasoning](./reasoning.md) capabilities directly, where the reward signal comes from verifiable outcomes (e.g., correct answers to math or code problems) rather than human preferences, enabling models to develop chain-of-thought strategies through exploration.

## Examples

- PPO optimization of an LLM policy against a reward model trained on human comparisons ([RLHF](./rlhf.md))
- RL with verifiable rewards to train a model to produce step-by-step reasoning for math problems
- GRPO (group relative policy optimization) as a variant that compares groups of sampled outputs rather than relying on a separate reward model
- Using RL to improve a coding model's ability to generate correct solutions by rewarding passing test cases

## Synonyms

RL
