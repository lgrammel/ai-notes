# Agent Legibility

Agent legibility is the idea that codebases and development environments should be optimized for [agent](../concepts/agent.md) comprehension first, treating machine readability as a primary design constraint rather than a secondary benefit.

## Details

From a [coding agent's](../concepts/coding-agent.md) perspective, anything it cannot access in-context while running effectively does not exist. Knowledge that lives in chat threads, shared documents, video calls, or people's heads is invisible to the agent and therefore cannot influence its output. This reframes a central design question: instead of "is this codebase readable by humans?", the question becomes "can an agent reason about the full business domain directly from the repository itself?"

The principle has several practical consequences. All decisions, architectural patterns, and team agreements must be pushed into versioned, repository-local artifacts - code, markdown, schemas, configuration - because those are the only artifacts agents can see. Technologies described as "boring" (composable, stable APIs, well-represented in training data) are favored because [model familiarity bias](../concepts/model-familiarity-bias.md) means agents model them more reliably than novel or opaque abstractions - a preference that is in tension with the [AI-favored programming languages](./ai-favored-programming-languages.md) thesis, which argues that formal properties like strong type systems will eventually matter more than training data representation as agents improve. In some cases, reimplementing rather than importing dependencies improves legibility because the in-repo version is fully inspectable by future agent runs (see [reduced software persistence](./reduced-software-persistence.md)).

Agent legibility extends beyond code to the application itself. Making logs, metrics, traces, and UI state directly accessible to the agent - through local observability stacks, browser automation, or DevTools integration - turns runtime behavior into inspectable context. This enables agents to validate fixes, reproduce bugs, and reason about performance without relying on human QA capacity, which becomes the bottleneck as code throughput increases (see [harness engineering](../concepts/harness-engineering.md)).

### Progressive context disclosure

A specific pattern for achieving agent legibility in repository-level knowledge: agent instructions should follow a "map, not a manual" structure - a short, stable entry point that teaches the agent where to look, pointing to deeper structured knowledge elsewhere in the repository, rather than front-loading all instructions in a single monolithic file.

The pattern structures repository knowledge as a layered hierarchy. A concise top-level file (e.g., a ~100-line AGENTS.md) serves as a table of contents: it names the key domains, points to deeper documentation, and establishes the small set of invariants that apply everywhere. Deeper sources - architecture docs, design documents, execution plans, domain-specific guides - live in a structured directory and are consulted by the agent only when a task touches that area.

The "one big AGENTS.md" approach fails in predictable ways: a monolithic file is hard to verify mechanically, rots quickly as stale rules accumulate, crowds out task-relevant content from the agent's limited [context](../concepts/context.md) window, and eliminates priority signals when everything is marked as important. Progressive disclosure enables mechanical validation - individual documents can be checked for freshness, cross-link integrity, and structural correctness using dedicated linters and CI jobs, and recurring "doc-gardening" agents can scan for stale documentation and open fix-up pull requests.

The pattern relates to [context engineering](../concepts/context-engineering.md) but operates at a different level: context engineering is the general discipline of selecting and structuring what reaches the model's context window, while progressive context disclosure shapes what is available to be selected. It is one component of a broader [harness](../concepts/harness-engineering.md).

## Counterarguments

- Human readability still matters wherever humans remain in the loop for oversight, debugging, or strategic decisions. Optimizing for agent comprehension at the expense of human understanding risks creating systems that are productive but opaque to the people accountable for them - amplifying [cognitive debt](./cognitive-debt.md).
- The preference for "boring" technology may primarily reflect current [LLM](../concepts/llm.md) training data distributions rather than an inherent advantage. As models improve and training data broadens, the penalty for novel or complex technologies may diminish, making today's legibility-driven technology choices unnecessarily conservative.
- Pushing all organizational context into the repository creates a significant maintenance burden. Documentation that must be kept current for agents to function correctly is documentation that rots the moment it falls behind, and the cost of maintaining that freshness at scale is non-trivial.
- Progressive context disclosure requires agents to reliably follow pointers - reading the map, then navigating to the right deeper document, then extracting relevant information. Each hop introduces a chance of missed references. A flat file, while noisier, guarantees that all instructions are seen.
- The "right" depth of disclosure varies by task complexity and agent capability. A simple bug fix may not need architectural context, while a cross-cutting refactor may need most of the knowledge base. Designing a hierarchy that serves both cases well is a non-trivial information architecture problem.
- For small repositories with limited documentation needs, maintaining a structured knowledge base with mechanical validation imposes overhead that exceeds the benefit. The monolithic approach may fail at scale but work fine for projects below a certain complexity threshold.
- Optimizing a codebase for a specific agent's comprehension patterns - repository structure, documentation format, technology choices - creates dependence on that agent's capabilities. If agent tooling changes or the team switches providers, legibility investments shaped by one agent's strengths may not transfer, creating a form of vendor lock-in at the development methodology level. More broadly, the legibility patterns agents find useful will likely change as models improve, so heavy investment in current-model legibility may age poorly - a form of premature optimization at the methodology level where today's best practices become tomorrow's unnecessary constraints.

## Confidence

**Medium.** The core observation - that agents can only use what they can access in-context - is definitionally true. The practical consequences (repository-local knowledge, boring technology, application observability) are emerging from real projects and are directionally sound. However, the degree to which agent legibility should override human readability remains an open question, and the maintenance cost of repository-as-sole-source-of-truth is underexplored.

## External references

- <https://openai.com/index/harness-engineering/>
