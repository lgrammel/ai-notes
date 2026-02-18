# Progressive Context Disclosure

Progressive context disclosure is the idea that agent instructions should follow a "map, not a manual" pattern - a short, stable entry point that teaches the agent where to look, pointing to deeper structured knowledge elsewhere in the repository, rather than front-loading all instructions in a single monolithic file.

## Details

The pattern structures repository knowledge as a layered hierarchy. A concise top-level file (e.g., a ~100-line AGENTS.md) serves as a table of contents: it names the key domains, points to deeper documentation, and establishes the small set of invariants that apply everywhere. Deeper sources - architecture docs, design documents, execution plans, domain-specific guides - live in a structured directory and are consulted by the agent only when a task touches that area.

This contrasts with the "one big AGENTS.md" approach, which fails in predictable ways. A monolithic instruction file is hard to verify mechanically because a single blob does not lend itself to coverage checks, freshness validation, or ownership tracking. It rots quickly - stale rules accumulate and agents cannot distinguish current guidance from outdated entries. When everything is marked as important, nothing is, and agents end up pattern-matching locally instead of navigating intentionally. A large instruction file also competes with the actual task, code, and relevant documentation for the agent's limited [context](../concepts/context.md) window, crowding out what matters most.

Progressive disclosure enables mechanical validation of the knowledge base. Individual documents can be checked for freshness, cross-link integrity, and structural correctness using dedicated linters and CI jobs. Recurring "doc-gardening" agents can scan for stale or obsolete documentation and open fix-up pull requests. This is harder to achieve with a monolithic file where everything is interleaved.

The pattern relates to [context engineering](../concepts/context-engineering.md) but operates at a different level. Context engineering is the general discipline of selecting and structuring what reaches the model's context window. Progressive context disclosure is a specific structural pattern for how to organize the repository-level knowledge that [coding agents](../concepts/coding-agent.md) draw from - it shapes what is available to be selected, not the selection mechanism itself. It is one component of a broader [harness](../concepts/harness-engineering.md).

## Counterarguments

- The pattern requires agents to reliably follow pointers - reading the map, then navigating to the right deeper document, then extracting relevant information. Each hop introduces a chance of missed references, especially for agents with limited tool-use reliability or context budgets. A flat file, while noisier, guarantees that all instructions are seen.
- The "right" depth of disclosure varies by task complexity and agent capability. A simple bug fix may not need architectural context, while a cross-cutting refactor may need most of the knowledge base. Designing a hierarchy that serves both cases well is a non-trivial information architecture problem.
- For small repositories with limited documentation needs, maintaining a structured knowledge base with mechanical validation imposes overhead that exceeds the benefit. The monolithic approach may fail at scale but work fine for projects below a certain complexity threshold.

## Confidence

**High.** The failure modes of monolithic instruction files are well-documented and widely experienced by teams using coding agents. The hierarchical alternative is grounded in a concrete, large-scale case study and aligns with established information architecture principles (progressive disclosure is a well-known UX pattern). The counterarguments identify real trade-offs but do not undermine the core thesis for repositories of meaningful size.

## External references

- <https://openai.com/index/harness-engineering/>
