# Agent SEO

Agent SEO is the idea that [agent](../concepts/agent.md) awareness and preference is a scarce resource, and that an emerging market exists for making offerings - [tools](../concepts/tools.md), websites, software libraries, products, services - discoverable and favored by agents.

## Details

This applies across commerce, software libraries, and APIs: in each case, an offering that agents don't know about or can't use correctly loses to a familiar alternative, regardless of merit. [Coding agents](../concepts/coding-agent.md) pass over unknown libraries, agentic [chatbots](../concepts/chatbot.md) skip businesses they can't find, and agents bypass tools they don't recognize.

Awareness can be gained organically (usage data enters [training](../concepts/training.md) sets), through content optimized for agent consumption at [inference](../concepts/inference.md) time (loaded into [context](../concepts/context.md)), or through commercial engagement with [model developers](../concepts/model-developer.md) to influence training. [Library evals for model training](./library-evals-for-model-training.md) is one specific mechanism for the latter. In crowded domains, awareness cost rises because agents have limited attention, and a useful but unknown offering can lose to a mediocre but familiar one.

Awareness alone is not sufficient - an offering also needs low friction to stay selected. [Agent UX](./agent-ux.md) complements agent SEO as two sides of the same adoption problem: making the offering known versus making it easy to use.

## Examples

- A tool vendor working with a frontier lab to get their tool into model training data so that agents are pre-trained to recognize and prefer it.
- An e-commerce business optimizing its web presence so that agentic shopping assistants can discover and recommend its products.
- A software library maintainer producing token-efficient documentation designed for [coding agent](../concepts/coding-agent.md) consumption rather than human reading.

## Counterarguments

- Model retraining cycles may invalidate training-time SEO investments faster than they pay off. A vendor who pays to get into one model version's training data may find the next version trained on different data, requiring ongoing investment with uncertain returns.
- Context-time information ([RAG](../concepts/rag.md), [MCP](../concepts/mcp.md) tool descriptions, documentation loaded into [context](../concepts/context.md)) may dominate over training-time knowledge for tool selection. If agents increasingly rely on runtime context rather than parametric knowledge to choose tools, the "awareness" problem shifts from training influence to documentation quality - a more level playing field.
- The analogy to traditional SEO may overstate the manipulability of agent preferences. Unlike web search engines, where ranking algorithms are fixed between updates, [LLM](../concepts/llm.md) outputs are influenced by the full context window, making it harder to reliably game agent behavior through any single channel.

## External references

- https://steve-yegge.medium.com/software-survival-3-0-97a2a6255f7b
