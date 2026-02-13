# RLHF

RLHF (reinforcement learning from human feedback) is a [post-training](./post-training.md) technique that uses human preference judgments to [fine-tune](./fine-tuning.md) an [LLM](./llm.md), steering it toward outputs that humans rate as more helpful, honest, or safe. It is a primary mechanism for establishing [instruction following](./instruction-following.md) behavior and model-level [alignment](./alignment.md).

## Details

The core idea is to train a reward model on human comparisons of model outputs, then optimize the LLM's policy against that reward model using [reinforcement learning](./reinforcement-learning.md). A family of alternatives skip the explicit reward model by optimizing directly on preference pairs: DPO (direct preference optimization), GRPO (group relative policy optimization), ORPO (odds ratio preference optimization), and others, each reducing complexity at different tradeoffs in stability and sample efficiency. These preference-based methods are typically applied after supervised [fine-tuning](./fine-tuning.md) and before deployment.

RLHF and its variants are one of two major [RL](./reinforcement-learning.md) paradigms in current [post-training](./post-training.md). The other is RL with verifiable rewards, where the reward signal comes from objectively checkable outcomes (correct math answers, passing test cases) rather than human preferences. This approach has been central to training [reasoning](./reasoning.md) capabilities in models like DeepSeek-R1 and OpenAI's o-series. The two paradigms complement each other: preference-based RL shapes style, helpfulness, and safety; verifiable-reward RL shapes problem-solving and [reasoning](./reasoning.md) depth.

Because the reward model in RLHF is a learned proxy for human preferences, RLHF is susceptible to [reward hacking](./reward-hacking.md) - the model may learn to exploit the reward signal (for example producing sycophantic or verbose outputs) rather than genuinely improving on the intended objective. RL with verifiable rewards is less susceptible to this specific failure mode (correct answers are not gameable in the same way), but can still produce models that are narrowly optimized for the task distributions they were trained on (see [eval-reality gap](./eval-reality-gap.md)).

## Synonyms

reinforcement learning from human feedback, preference-based alignment
