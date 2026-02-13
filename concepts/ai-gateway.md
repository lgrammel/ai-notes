# AI Gateway

A service layer between an application/[agent](./agent.md) and one or more [model providers](./inference-provider.md) that standardizes access to models and centralizes operational controls.

## Details

Unlike a generic API gateway, an AI gateway is model-aware: it understands token-based [rate limiting](./rate-limiting.md), [model routing](./model-routing.md) (model selection, fallbacks), [prompt caching](./prompt-caching.md) (including [semantic caching](./semantic-caching.md) for returning stored responses to semantically similar queries), and LLM-specific [observability](./observability.md).

A gateway presents a unified API across multiple [inference providers](./inference-provider.md), decoupling application code from any single provider's API shape. This reduces vendor lock-in and simplifies failover, A/B testing across providers, and migration to [open-weight models](./open-weight-model.md) or self-hosted deployments - the application switches models by changing a routing configuration rather than rewriting integration code.

The operational control surface - unified auth and key management, [quota management](./quota-management.md), cost controls, PII redaction, retries/timeouts, and logging/metrics - becomes critical as the number of models and consuming teams grows, centralizing policies that would otherwise be duplicated across every service that calls a model.

## Examples

- A gateway that normalizes chat-completion APIs across providers so the application switches models by changing a routing config, not application code.
- A centralized key-management layer that rotates per-provider credentials without touching downstream services.
- A cost-control gateway that enforces per-team spend limits and falls back to a cheaper model when a budget threshold is reached.

## Synonyms

model gateway, LLM gateway
