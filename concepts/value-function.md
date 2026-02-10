# Value Function

A value function is a learned estimator that predicts the expected cumulative reward from an intermediate state in a [reinforcement learning](./reinforcement-learning.md) trajectory, enabling training signals before the final outcome is known.

## Details

In current [LLM](./llm.md) RL (such as o1 or R1), the standard approach is outcome-based: the model produces a complete solution, the solution is graded, and the score provides a training signal for every action in the trajectory. This means no learning occurs until the trajectory completes, which is inefficient for long trajectories. A value function short-circuits this by estimating whether an intermediate state is promising or not -- for example, recognizing that a particular solution direction is unpromising after a thousand steps of [reasoning](./reasoning.md), and propagating that signal back to the decision point where that direction was chosen.

Value functions are more useful in domains where intermediate progress is assessable (chess: losing a piece is immediately recognizable as bad) and harder to learn in domains where the trajectory space is vast and non-monotonic (coding: a wrong approach can be abandoned and corrected mid-trajectory). Despite these challenges, value functions are expected to make RL training substantially more efficient by reducing the amount of wasted compute on unpromising trajectories.

## Examples

- A chess engine's position evaluator that estimates win probability from any board state without playing to checkmate
- An RL-trained [reasoning](./reasoning.md) model that learns to recognize when a proof direction is unlikely to succeed, providing a reward signal to earlier decisions
- LLM-as-a-Judge setups that provide intermediate quality assessments during long generation trajectories
