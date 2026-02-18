# Agent Legibility

Agent legibility is the idea that codebases, tools, and development environments should be optimized for [agent](../concepts/agent.md) comprehension first, treating machine readability as a primary design constraint rather than a secondary benefit.

## Details

From a [coding agent's](../concepts/coding-agent.md) perspective, anything it cannot access in-context while running effectively does not exist. Knowledge that lives in chat threads, shared documents, video calls, or people's heads is invisible to the agent and therefore cannot influence its output. This reframes a central design question: instead of "is this codebase readable by humans?", the question becomes "can an agent reason about the full business domain directly from the repository itself?"

The principle has several practical consequences. All decisions, architectural patterns, and team agreements must be pushed into versioned, repository-local artifacts - code, markdown, schemas, configuration - because those are the only artifacts agents can see. Technologies described as "boring" (composable, stable APIs, well-represented in training data) are favored because agents can model them more reliably than novel or opaque abstractions. In some cases, reimplementing a small subset of a dependency's functionality directly in the repository is cheaper than working around upstream behavior the agent cannot inspect - the in-repo version is tightly integrated, fully tested, and legible to future agent runs (see [dependency-free software](./dependency-free-software.md)).

Agent legibility extends beyond code to the application itself. Making logs, metrics, traces, and UI state directly accessible to the agent - through local observability stacks, browser automation, or DevTools integration - turns runtime behavior into inspectable context. This enables agents to validate fixes, reproduce bugs, and reason about performance without relying on human QA capacity, which becomes the bottleneck as code throughput increases (see [harness engineering](../concepts/harness-engineering.md)).

## Counterarguments

- Human readability still matters wherever humans remain in the loop for oversight, debugging, or strategic decisions. Optimizing for agent comprehension at the expense of human understanding risks creating systems that are productive but opaque to the people accountable for them - amplifying [cognitive debt](./cognitive-debt.md).
- The preference for "boring" technology may primarily reflect current [LLM](../concepts/llm.md) training data distributions rather than an inherent advantage. As models improve and training data broadens, the penalty for novel or complex technologies may diminish, making today's legibility-driven technology choices unnecessarily conservative.
- Pushing all organizational context into the repository creates a significant maintenance burden. Documentation that must be kept current for agents to function correctly is documentation that rots the moment it falls behind, and the cost of maintaining that freshness at scale is non-trivial.

## Confidence

**Medium.** The core observation - that agents can only use what they can access in-context - is definitionally true. The practical consequences (repository-local knowledge, boring technology, application observability) are emerging from real projects and are directionally sound. However, the degree to which agent legibility should override human readability remains an open question, and the maintenance cost of repository-as-sole-source-of-truth is underexplored.

## External references

- <https://openai.com/index/harness-engineering/>
