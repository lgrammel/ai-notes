# Progressive Context Disclosure

Progressive context disclosure is the idea that [agent](../concepts/agent.md) instructions in a repository should follow a "map, not a manual" structure: a short, stable entry point that teaches the agent where to look, pointing to deeper structured knowledge elsewhere in the repository. It replaces front-loading all instructions in a single monolithic file.

## Details

The pattern structures repository knowledge as a layered hierarchy. A concise top-level file (e.g., a ~100-line AGENTS.md) serves as a table of contents: it names the key domains, points to deeper documentation, and establishes the small set of invariants that apply everywhere. Deeper sources - architecture docs, design documents, execution plans, domain-specific guides - live in a structured directory and are consulted by the agent only when a task touches that area.

The "one big AGENTS.md" approach fails in predictable ways: a monolithic file is hard to verify mechanically, rots quickly as stale rules accumulate, crowds out task-relevant content from the agent's limited [context](../concepts/context.md) window, and eliminates priority signals when everything is marked as important. Progressive disclosure enables mechanical validation - individual documents can be checked for freshness, cross-link integrity, and structural correctness using dedicated linters and CI jobs, and recurring "doc-gardening" agents can scan for stale documentation and open fix-up pull requests.

The pattern relates to [context engineering](../concepts/context-engineering.md) but operates at a different level: context engineering is the general discipline of selecting and structuring what reaches the model's context window, while progressive context disclosure shapes what is available to be selected. It is one specific technique for achieving [agent legibility](./agent-legibility.md) in repository-level knowledge and one component of a broader [harness](../concepts/harness-engineering.md).

## Counterarguments

- Progressive context disclosure requires agents to reliably follow pointers - reading the map, then navigating to the right deeper document, then extracting relevant information. Each hop introduces a chance of missed references. A flat file, while noisier, guarantees that all instructions are seen.
- The "right" depth of disclosure varies by task complexity and agent capability. A simple bug fix may not need architectural context, while a cross-cutting refactor may need most of the knowledge base. Designing a hierarchy that serves both cases well is a non-trivial information architecture problem.
- For small repositories with limited documentation needs, maintaining a structured knowledge base with mechanical validation imposes overhead that exceeds the benefit. The monolithic approach may fail at scale but work fine for projects below a certain complexity threshold.
- The optimal hierarchy structure will likely change as models improve and context windows grow. Heavy investment in a specific disclosure structure optimized for current agent capabilities may age poorly - a form of premature optimization at the methodology level.
- Designing the right disclosure hierarchy requires deep system understanding and information architecture skill - deciding what belongs at the top level, how deep to go, and where to draw boundaries between documents. This is a non-trivial design problem, and the people best positioned to solve it are the same senior engineers whose time the pattern is supposed to free up.
- Current models frequently fail to follow pointer chains reliably - reading a top-level file but not navigating to referenced deeper documents, or extracting incomplete information across hops. Multi-hop pointer-following is a known weakness of current LLMs, making the pattern's effectiveness dependent on a capability that is improving but not yet reliable at scale.

## Confidence

**Medium.** The pattern is practical, grounded in real projects, and the failure modes of monolithic instruction files are well-observed. However, the optimal hierarchy depth varies by project and agent capability, and pointer-following reliability across multiple hops is unproven at scale.

## External references

- <https://openai.com/index/harness-engineering/>
