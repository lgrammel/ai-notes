# Agent SEO

Agent SEO is the idea that [agent](../concepts/agent.md) awareness and preference is a scarce resource, and that an emerging market exists for making offerings -- [tools](../concepts/tools.md), websites, software libraries, products, services -- discoverable and favored by agents. This is analogous to how search engine optimization makes websites discoverable to humans via search engines, but applied to AI agents that act on behalf of users.

The concept spans several domains:

- **Commerce and services**: As users increasingly delegate purchasing and research tasks to agentic [chatbots](../concepts/chatbot.md), businesses need agents to know about, understand, and recommend their offerings. A restaurant, retailer, or service provider that is invisible to the agents users rely on loses access to those customers -- much like being absent from search engine results today.
- **Software libraries**: [Coding agents](../concepts/coding-agent.md) select libraries and dependencies when building software. A library that agents don't know about or can't use correctly gets passed over in favor of better-known alternatives, regardless of technical merit. [Library evals for model training](./library-evals-for-model-training.md) is one specific mechanism for influencing this.
- **Tools and APIs**: Agents that use [tools](../concepts/tools.md) must choose which tools to invoke for a given task. A tool that agents don't recognize or understand loses to one they're familiar with.

For an agent to choose any of these, it first has to know the offering exists, understand what it provides, and prefer it over alternatives. This "awareness cost" can be paid in several ways: organically (the offering becomes popular enough that usage data enters [training](../concepts/training.md) sets), through content optimized for agent consumption at [inference](../concepts/inference.md) time (loaded into [context](../concepts/context.md)), or through direct commercial engagement with [model developers](../concepts/model-developer.md) to influence training.

Awareness alone is not sufficient -- an offering also needs low friction to stay selected. [Agent UX](./agent-ux.md) (designing intuitive interfaces for agent interaction) complements agent SEO (making the offering known) as two sides of the same adoption problem. In Yegge's framing, awareness is the "pre-sales" problem and friction is the "post-sales" problem.

In crowded domains, awareness cost rises because agents have limited attention. A useful but unknown offering can lose to a mediocre but familiar one. This creates competitive dynamics around agent attention similar to the algorithmic attention economy in human-facing platforms.

## Examples

- A tool vendor working with a frontier lab to get their tool into model training data so that agents are pre-trained to recognize and prefer it.
- An e-commerce business optimizing its web presence so that agentic shopping assistants can discover, understand, and recommend its products to users.
- A software library maintainer producing highly information-dense, token-efficient documentation designed for [coding agent](../concepts/coding-agent.md) consumption rather than human reading.
- An aggregator or discovery service that helps agents find the right tool, product, or library for a task, analogous to app stores or search engines.

## External references

- https://steve-yegge.medium.com/software-survival-3-0-97a2a6255f7b
