# Evals

Evals (evaluations) are systematic tests used to measure and monitor [LLM](./llm.md) or system performance on specific tasks. Unlike conventional software tests that assert binary pass/fail on deterministic outputs, evals handle non-deterministic model behavior and typically use statistical or qualitative scoring (e.g., accuracy rates, human preference rankings). They are used to compare variants, catch regressions, and track metrics like accuracy, safety, and robustness.

## Details

Eval approaches include automated metrics (exact match, similarity scores), [model-as-a-judge](./model-as-a-judge.md) (using an LLM to grade outputs), and human evaluation. Standardized [benchmarks](./benchmarks.md) are a subset of evals designed for repeatable comparisons, often with fixed datasets and scoring. Evals can run offline (on curated datasets before deployment) or online (against live traffic in production).

Evals are commonly built from real user traffic and failure cases surfaced by [observability](./observability.md) telemetry, and they are often used as release gates when changing [prompts](./prompt.md), tools, [LLMs](./llm.md), or [infrastructure](./ai-infrastructure.md). An [eval runner](./eval-runner.md) is the software component that orchestrates eval execution end-to-end.

### Metrics

Eval metrics fall into three categories: deterministic metrics computed directly from outputs, model-based metrics that use an [LLM](./llm.md) as a judge, and operational metrics that track system-level performance.

Deterministic metrics compare model output against reference answers without requiring additional model inference. Exact match checks whether the output is identical to the reference - standard for classification, extraction, and short-answer tasks. F1 score measures token-level overlap between output and reference, balancing precision (fraction of output tokens found in the reference) and recall (fraction of reference tokens found in the output), and is common in question-answering evals. BLEU and ROUGE measure n-gram overlap from complementary angles: BLEU emphasizes precision and is standard in translation evals, while ROUGE emphasizes recall and is standard for summarization. Pass@k estimates the probability that at least one of k generated samples passes a test suite, widely used in code generation [benchmarks](./benchmarks.md) like HumanEval. Semantic similarity computes [embedding](./embedding.md) cosine similarity between output and reference, capturing meaning-level equivalence that string-matching metrics miss. Perplexity, derived from [logprobs](./logprobs.md), measures how well a model predicts a reference text (lower is better), though it measures distributional fit rather than task correctness.

Model-based metrics use a [model-as-a-judge](./model-as-a-judge.md) to evaluate dimensions that lack computable ground truth, such as helpfulness, coherence, safety, and factual accuracy. Common formats include Likert-scale scoring (e.g., rating helpfulness 1-5 against a rubric), binary classification (safe/unsafe, on-topic/off-topic), and pairwise comparison where the judge selects the better of two outputs. Win rate aggregates pairwise comparisons across an eval set, and Elo ratings derive relative model rankings from many pairwise matchups (as in Chatbot Arena). Model-based metrics are the primary tool for evaluating open-ended generation where deterministic metrics are unreliable.

Operational metrics track system behavior beyond output quality: [latency](./latency.md), [inference cost](./inference-cost.md), token usage, and error rates. These are typically measured alongside quality metrics to evaluate tradeoffs - a model swap that improves accuracy but doubles latency or cost may not be a net improvement.

Eval distributions can inadvertently influence [reinforcement learning](./reinforcement-learning.md) training when teams design training environments to match the [benchmarks](./benchmarks.md) they want to perform well on, creating a feedback loop that inflates benchmark scores without improving real-world utility (see [eval-reality gap](./eval-reality-gap.md) and [reward hacking](./reward-hacking.md)).

## Examples

- A regression suite that checks whether prompt changes break known-good outputs.
- A [model-as-a-judge](./model-as-a-judge.md) pipeline that scores helpfulness and safety on sampled production requests.
- Human reviewers rating output quality on a labeled dataset before a model swap.

## Synonyms

evaluations
