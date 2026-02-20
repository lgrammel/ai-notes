# Agent SEO

Agent SEO is the idea that as [AI-powered search engines](../example-systems/ai-powered-search-engine.md), [deep research agents](../example-systems/deep-research-agent.md), and agentic shopping assistants replace traditional search for an increasing share of queries, content and web presence must be optimized for agent discovery and ranking rather than human browsing behavior.

## Details

Traditional SEO optimizes for search engine ranking algorithms that return a list of links for humans to evaluate. When the search layer is an [LLM](../concepts/llm.md) that synthesizes answers from retrieved sources, the optimization target changes fundamentally. An agent does not present ten blue links - it constructs a response, citing some sources and ignoring others. Content that agents cannot parse, do not find, or do not favor effectively does not exist for users who rely on agent-mediated search.

The optimization surface spans multiple points. At [inference](../concepts/inference.md) time, content structure matters: machine-parseable formats, structured data, clear headings, and token-efficient prose help agents extract and cite information. [Model familiarity bias](../concepts/model-familiarity-bias.md) means agents systematically favor well-represented offerings in their [training](../concepts/training.md) data, so in crowded domains a useful but unknown product can lose to a mediocre but familiar one regardless of content quality. At training time, commercial engagement with [model developers](../concepts/model-developer.md) can influence agent preferences directly - for instance, tool and library vendors work with frontier labs to create [eval](../concepts/evals.md) suites that demonstrate correct usage of their products, effectively baking familiarity into model weights. This creates a potential asymmetry: well-funded vendors can pay for training influence while smaller alternatives rely on organic data. It also introduces a [supply chain](../threats/supply-chain-attack.md) consideration - if model training can be commercially influenced to favor specific offerings, the integrity of that influence channel becomes security-relevant.

Agent SEO addresses discovery and ranking; [agent UX](./agent-ux.md) addresses the complementary problem of making an offering easy to use correctly once discovered.

## Examples

- An e-commerce business restructuring its product pages with structured data, clear specifications, and machine-parseable pricing so that agentic shopping assistants can discover and recommend its products over competitors with richer but less parseable content.
- A SaaS company optimizing its documentation and marketing content for citation by [deep research agents](../example-systems/deep-research-agent.md) and [AI-powered search engines](../example-systems/ai-powered-search-engine.md), treating agent-synthesized answers as the primary discovery channel rather than organic search traffic.
- A tool vendor working with a frontier lab to build evals demonstrating correct and incorrect tool invocations, baking tool familiarity into model weights so that agents recommend the tool in search and coding contexts.
- A database vendor creating eval suites that teach models to generate correct queries for their specific SQL dialect, ensuring agents suggest their product when users search for database solutions.

## Counterarguments

- Model retraining cycles may invalidate training-time SEO investments faster than they pay off. A vendor who pays to get into one model version's training data may find the next version trained on different data, requiring ongoing investment with uncertain returns.
- Context-time information ([RAG](../concepts/rag.md), [MCP](../concepts/mcp.md) tool descriptions, documentation loaded into [context](../concepts/context.md)) may dominate over training-time knowledge for agent recommendations. If agents increasingly rely on runtime retrieval rather than parametric knowledge, the optimization problem shifts from training influence to content quality and retrievability - a more level playing field.
- The analogy to traditional SEO may overstate the manipulability of agent preferences. Unlike web search engines where ranking algorithms are fixed between updates, [LLM](../concepts/llm.md) outputs are influenced by the full context window, making it harder to reliably game agent behavior through any single channel.
- Model developers have strong incentives to resist vendor-specific training influence that could compromise model generality. A model trained to favor one product over equivalent alternatives becomes less useful for the broader user base, creating tension between vendor revenue and model quality.
- The asymmetry between funded vendors and open-source alternatives may be offset by organic adoption. If offerings generate enough public usage data (Stack Overflow posts, GitHub repositories, reviews, tutorials), they may achieve comparable training-time awareness without paid partnerships, limiting the practical advantage of the paid channel.
- If agents become primary recommenders, paid training influence is essentially undisclosed advertising embedded in model weights. This raises transparency and regulatory questions analogous to search engine marketing disclosure requirements - users may not know that an agent's recommendation reflects commercial influence rather than merit.
- If all vendors invest in agent SEO, the competitive advantage neutralizes and the primary effect is raised costs for everyone - analogous to how universal traditional SEO investment raised marketing spend without proportional benefit.
- If the ecosystem shifts toward locally deployed open-weight models, organizations control their own training data and fine-tuning. The paid training influence channel does not apply when the model consumer is also the model trainer, narrowing the scope of agent SEO to proprietary API-served models.
- If agents consistently surface the same well-ranked offerings, ecosystem diversity and innovation decline. New entrants face an ever-higher discovery barrier as established offerings compound their training-data advantage, creating a rich-get-richer dynamic that entrenches incumbents regardless of relative quality.

## Confidence

**Medium.** The dynamic is real - agent-mediated search changes how content is discovered and ranked, and paid training influence exists. However, the counterarguments about model retraining cycles and context-time dominance leave the durability of training-time optimization uncertain. The broader problem of optimizing for agent-mediated discovery is likely to persist even if the specific mechanisms shift.

## External references

- https://steve-yegge.medium.com/software-survival-3-0-97a2a6255f7b
