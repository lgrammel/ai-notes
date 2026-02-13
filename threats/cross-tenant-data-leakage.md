# Cross-Tenant / Cross-Session Data Leakage

Cross-tenant / cross-session data leakage occurs when one user's data unintentionally becomes accessible to another user through shared caching layers, insufficiently isolated [agent](../concepts/agent.md) sessions, or other multi-tenant infrastructure components in an [LLM](../concepts/llm.md) application.

## Details

LLM applications often share infrastructure across users to reduce cost and latency - [semantic caches](../concepts/semantic-caching.md), [prompt caching](../concepts/prompt-caching.md) layers, vector stores, conversation memory backends, and connection pools. When tenant or session boundaries in these shared components are not strictly enforced, data from one user's interaction can leak into another's context. Unlike [data exfiltration](./data-exfiltration.md), which involves an attacker deliberately extracting information, cross-tenant leakage typically results from engineering oversights in isolation boundaries rather than adversarial manipulation.

Agent sessions are particularly susceptible because they accumulate rich state over multi-step interactions: [tool](../concepts/tools.md) call results, retrieved documents, intermediate reasoning, and user-specific instructions. If session state is stored in a shared backend (e.g. a Redis instance or database) with weak key scoping, a session ID collision or missing tenant prefix can expose one user's full interaction history to another. Shared [semantic caches](../concepts/semantic-caching.md) that match on embedding similarity without filtering by tenant can return cached responses generated from a different user's private data.

The risk scales with system complexity. [Multi-agent systems](../concepts/multi-agent-system.md) with shared memory or tool registries multiply the points where cross-tenant contamination can occur. Background [agent](../concepts/agent.md) workers processing requests from multiple tenants on the same instance can leak state through in-process globals or improperly scoped dependency injection.

## Examples

- A [semantic cache](../concepts/semantic-caching.md) returns a cached LLM response generated from one customer's proprietary documents to a different customer whose query has a similar embedding.
- An agent session store using a flat key namespace serves conversation history from a different user's session after a key collision.
- A shared [RAG](../concepts/rag.md) pipeline retrieves chunks from another tenant's document collection due to missing tenant filters on the vector store query.
- A background agent worker retains tool credentials from a previous tenant's request in a thread-local variable, causing the next tenant's request to execute tools with the wrong permissions.

## Mitigations

- Enforcing strict tenant and session identifiers on all shared storage layers (caches, vector stores, session backends)
- [Context isolation](../concepts/context-isolation.md) between agent sessions, including memory, tool registries, and credential scopes
- Namespace or partition separation in caching and retrieval infrastructure rather than relying on application-level filtering alone
- Automated testing for cross-tenant data visibility as part of integration and security test suites
- [Observability](../concepts/observability.md) and auditing to detect when responses contain data not attributable to the requesting user's context

## Synonyms

cross-tenant leakage, session leakage, tenant isolation failure, cross-user data exposure
