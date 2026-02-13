# Semantic Caching

Semantic caching is an application-side optimization that stores [LLM](./llm.md) responses keyed by the semantic meaning of the input query, so that subsequent requests with similar meaning (determined by [embedding](./embedding.md) similarity) can return a cached response without invoking [inference](./inference.md).

## Details

A semantic cache converts each incoming query into an [embedding](./embedding.md) using an [embedding model](./embedding-model.md), then performs an approximate nearest-neighbor lookup (typically backed by a [vector database](./vector-database.md) or in-memory index) against previously cached query-response pairs. If a cached query exceeds a configurable similarity threshold, the stored response is returned directly, bypassing the [LLM](./llm.md) entirely. This eliminates both the [inference cost](./inference-cost.md) and [latency](./latency.md) of a full model call for cache hits.

Semantic caching is distinct from [prompt caching](./prompt-caching.md), which is a provider-side optimization that reuses intermediate computation (KV-cache) for requests sharing an exact [token](./token.md)-level prefix. Prompt caching reduces the cost of the prefill phase; semantic caching skips inference altogether. The two are complementary - prompt caching applies on cache misses that still require inference, while semantic caching intercepts requests before they reach the [inference provider](./inference-provider.md).

The similarity threshold is the core tuning parameter. A high threshold (requiring near-identical queries) produces fewer but more accurate cache hits. A lower threshold increases hit rates but risks returning responses that do not match the user's actual intent, effectively introducing a form of [hallucination](./hallucination.md) where the system confidently returns an answer to a different question. Cache invalidation is another challenge: when underlying data or model behavior changes, cached responses become stale.

Semantic caching is most effective for workloads with high query repetition and tolerance for approximate matching, such as customer support, FAQ-style interactions, or search. It is less effective for [agentic workloads](./agentic-workloads.md) where queries are diverse and context-dependent. In multi-tenant environments, caches that match on embedding similarity without tenant-scoped filtering risk [cross-tenant data leakage](../threats/cross-tenant-data-leakage.md). [AI gateways](./ai-gateway.md) sometimes include semantic caching as a built-in capability.

## Examples

- A customer support chatbot where variations of "How do I reset my password?" all return the same cached response instead of making separate LLM calls.
- An [AI gateway](./ai-gateway.md) that intercepts requests, checks a vector index of recent query-response pairs, and returns cached responses for queries above a 0.95 cosine similarity threshold.
- A semantic cache returning a stale response after a product's return policy changed, because the cached answer was generated before the policy update.

## Synonyms

LLM response caching, similarity-based caching, embedding cache
