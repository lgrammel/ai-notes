# Batch Inference

Batch inference is an [inference](./inference.md) mode where multiple requests are submitted together as a group and processed asynchronously, trading [latency](./latency.md) for lower [inference cost](./inference-cost.md).

## Details

Unlike real-time inference where each request is processed individually with low-latency expectations, batch inference allows [inference providers](./inference-provider.md) to schedule work flexibly - filling idle GPU capacity, optimizing memory usage, and processing requests during off-peak periods. This scheduling flexibility is the primary reason providers offer batch pricing at a significant discount (often 50% or more) compared to synchronous API calls.

Batch inference is suited to workloads where results are not needed immediately: running [evals](./evals.md) across large datasets, generating [synthetic data](./synthetic-data.md), bulk classification or extraction tasks, pre-computing [embeddings](./embedding.md), and offline analysis. Turnaround times are typically measured in hours rather than milliseconds, with providers committing to completion within a defined window (e.g. 24 hours). Requests within a batch are independent - each has its own prompt and parameters - but they are submitted and tracked as a single job.

Most major inference providers expose batch APIs (OpenAI Batch API, Anthropic Message Batches, Google Gemini batch endpoints) that accept a file or list of requests and return results asynchronously. These APIs support the same model capabilities as their real-time counterparts ([structured output](./structured-output.md), [tool](./tools.md) definitions, vision inputs) but do not support [streaming](./streaming.md).

## Examples

- Running an eval suite across thousands of test cases overnight at half the per-token cost.
- Generating synthetic training data by processing a large prompt set in a single batch job.
- Pre-computing embeddings for a document corpus before indexing into a [vector database](./vector-database.md).
- Bulk-classifying support tickets using an [LLM](./llm.md) where results are needed within hours, not seconds.

## Synonyms

batch API, batch processing, offline inference, asynchronous inference
