# AI Gateway

Also called: model gateway, LLM gateway.

A service layer between an application/agent and one or more model providers that standardizes access to models and centralizes operational controls.

Typically provides request routing (model selection, fallbacks), unified auth and key management, rate limiting/quotas, retries/timeouts, cost controls, caching, and logging/metrics (often with PII redaction).

Why it matters: reduces provider lock-in, makes it easier to enforce org-wide policy (safety, data handling), and improves reliability and observability across model calls.

Examples: OpenRouter, Vercel AI Gateway.
