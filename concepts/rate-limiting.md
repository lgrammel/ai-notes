# Rate Limiting

Rate limiting is a control mechanism that restricts the frequency or volume of requests to an AI system within a defined time window, preventing abuse, controlling costs, and ensuring fair resource distribution across consumers.

## Details

In AI engineering, rate limits are commonly expressed in both requests-per-minute and [tokens](./token.md)-per-minute, reflecting the token-based cost structure of [LLM](./llm.md) [inference](./inference.md). A single large request can consume far more resources than many small ones, so token-based rate limiting provides a more accurate proxy for actual resource consumption than request counting alone.

Rate limiting is enforced at multiple layers. [Inference providers](./inference-provider.md) impose per-API-key or per-organization limits on their model endpoints. [AI gateways](./ai-gateway.md) add a centralized enforcement point where operators can apply rate limits across multiple providers, with model-aware policies that account for token volume and model pricing tier. Application-level and [agent runtime](./agent-runtime.md) rate limiting adds finer-grained controls such as per-user or per-feature limits.

[Agentic workloads](./agentic-workloads.md) challenge traditional rate limiting designs. Agent traffic is bursty, high-concurrency, and machine-speed, with request patterns that resemble automated attacks rather than human browsing. Rate limiting built around human signals (session cookies, CAPTCHAs) or fixed integration patterns becomes ineffective against agent traffic. Agent-aware rate policies - using API keys, OAuth scopes, or agent identity metadata - are a common adaptation.

Rate limiting is distinct from [quota management](./quota-management.md), which enforces resource budgets over longer periods (daily, monthly, billing cycle). Rate limiting controls throughput within short time windows; quotas control cumulative consumption. Both are often enforced together - a user may have a tokens-per-minute rate limit and a tokens-per-month quota.

## Examples

- An [inference provider](./inference-provider.md) enforcing 100,000 tokens-per-minute per API key, returning HTTP 429 responses when the limit is exceeded.
- An [AI gateway](./ai-gateway.md) applying different rate limits per model tier, with higher limits for cheaper models and stricter limits for frontier models.
- An [eval runner](./eval-runner.md) implementing rate-limit backoff to avoid exceeding provider limits during large evaluation runs.
- A web service blocking legitimate [agent](./agent.md) access because agent request patterns trigger abuse detection designed for human traffic.

## Synonyms

throttling, request throttling
