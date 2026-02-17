# AI Workflow

An AI workflow is a predefined sequence of steps - typically structured as a directed acyclic graph (DAG) - that interleaves [LLM](./llm.md) calls with programmatic logic (data retrieval, transformations, conditional branching) to accomplish a task. The control flow is fixed at design time rather than decided by a model at runtime, though workflow outputs can still be non-deterministic when steps include LLM [inference](./inference.md).

## Details

A developer defines which steps execute, in what order, and how data flows between them. Individual steps may involve LLM calls (e.g. summarization, classification, extraction), but the model does not choose which step runs next. This makes workflows more predictable, easier to test, and simpler to debug than [agent](./agent.md) loops, at the cost of flexibility - they cannot adapt their execution path to unexpected inputs.

Common patterns include sequential chains, parallel fan-out/fan-in, conditional branching (route to different steps based on a prior step's output), map-reduce over collections, and [human-in-the-loop](./human-in-the-loop.md) review checkpoints at any point in the graph. [RAG](./rag.md) pipelines are a common example: retrieve, then generate, with optional [reranking](./reranking.md) in between.

Workflows and agents are complementary. An [agent](./agent.md) may invoke a workflow as a single tool call to handle a well-understood subtask, and a workflow step may launch an agent when the subtask requires dynamic decision-making. [Multi-agent systems](./multi-agent-system.md) sometimes embed workflow-like coordination patterns (e.g. pipelines) where each stage is handled by a different agent.

## Examples

- A content moderation pipeline that classifies input, extracts flagged segments, and generates a review summary in three fixed steps.
- A document processing workflow that splits a PDF into pages, summarizes each page in parallel, then produces a combined report.
- An [eval](./evals.md) pipeline run by an [eval runner](./eval-runner.md) that generates outputs, scores them, and aggregates metrics in a fixed sequence.

## Synonyms

AI pipeline, LLM pipeline, LLM workflow, workflow orchestration
