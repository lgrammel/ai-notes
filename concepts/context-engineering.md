# Context Engineering

Context engineering is the practice of selecting, structuring, and maintaining the [context](./context.md) given to an [LLM](./llm.md) so it reliably performs the desired task within a fixed [context size](./context.md).

## Details

The core challenge is fitting the right information into a limited context window while keeping it useful for the model. Selecting what to include involves [retrieval](./retrieval.md) and ranking (see [RAG](./rag.md)), [in-context learning](./in-context-learning.md) example selection, and [prompt compaction](./prompt-compaction.md) and [memory](./agent-memory.md) to manage what persists across turns. Structuring the selected content - [prompt engineering](./prompt-engineering.md) for instructions and examples, formatting of tool outputs - determines how effectively the model can use what it receives. Protecting context integrity through [PII redaction](./pii-handling.md) (to reduce [data exfiltration](../threats/data-exfiltration.md) risk) and provenance cues that help the model distinguish instructions from untrusted content mitigates [prompt injection](../threats/prompt-injection.md) and [context poisoning](../threats/context-poisoning.md).

In [multi-agent systems](./multi-agent-system.md), context engineering extends to designing what crosses [context isolation](./context-isolation.md) boundaries: choosing which information a parent agent passes to a [subagent](./subagent.md) and how the subagent's result is formatted before re-entering the parent's context.

## Examples

- RAG pipelines that retrieve and compress relevant passages before generating.
- Summarizing a long chat history into a short "state" block.
- Putting tool outputs in a strict schema and separating them from instructions.
- [Skills](./skill.md) that inject task-specific instructions into an agent's context only when relevant, keeping the base prompt lean.
- Curating the task description and inputs passed across a [context isolation](./context-isolation.md) boundary to a [subagent](./subagent.md), balancing focus against information loss.

## Synonyms

context management
