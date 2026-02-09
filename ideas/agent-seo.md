# Agent SEO

Agent SEO is the idea that [agent](../concepts/agent.md) awareness of [tools](../concepts/tools.md) is a scarce resource, and that an emerging market exists for making tools discoverable and familiar to agents -- analogous to how search engine optimization makes websites discoverable to humans.

For an agent to choose a tool, it first has to know the tool exists, understand what it offers, and prefer it over alternatives. This "awareness cost" can be paid in several ways: organically (the tool becomes popular enough that usage data enters [training](../concepts/training.md) sets), through documentation optimized for agent consumption at [inference](../concepts/inference.md) time (loaded into [context](../concepts/context.md)), or through direct commercial engagement with [model developers](../concepts/model-developer.md) to influence training. One specific mechanism is [library evals for model training](./library-evals-for-model-training.md), where vendors create [evals](../concepts/evals.md) that teach models to use their tools correctly.

Awareness alone is not sufficient -- a tool also needs low friction to stay selected. [Agent UX](./agent-ux.md) (designing intuitive interfaces) complements agent SEO (making the tool known) as two sides of the same adoption problem. In Yegge's framing, awareness is the "pre-sales" problem and friction is the "post-sales" problem.

In crowded tool domains, awareness cost rises because agents have limited attention. A useful but unknown tool can lose to a mediocre but familiar one. This creates competitive dynamics around agent attention similar to the algorithmic attention economy in human-facing platforms.

## Examples

- A tool vendor working with a frontier lab to get their tool into model training data so that agents are pre-trained to recognize and prefer it.
- Producing highly information-dense, token-efficient documentation designed for agent consumption rather than human reading.
- An aggregator or discovery service that helps agents find the right tool for a task, analogous to app stores or search engines.

## External references

- https://steve-yegge.medium.com/software-survival-3-0-97a2a6255f7b
