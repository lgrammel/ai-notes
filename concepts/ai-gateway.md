# AI Gateway

A service layer between an application/[agent](./agent.md) and one or more [model providers](./inference-provider.md) that standardizes access to models and centralizes operational controls.

## Details

Unlike a generic API gateway, an AI gateway is model-aware: it supports token-based [rate limiting](./rate-limiting.md), [model routing](./model-routing.md), [prompt caching](./prompt-caching.md), and LLM-specific [observability](./observability.md). Typical capabilities include [model routing](./model-routing.md) (model selection, fallbacks), unified auth and key management, [rate limiting](./rate-limiting.md)/[quotas](./quota-management.md), retries/timeouts, cost controls, caching, and logging/metrics (often with PII redaction).

## Examples

- OpenRouter
- Vercel AI Gateway

## Synonyms

model gateway, LLM gateway
