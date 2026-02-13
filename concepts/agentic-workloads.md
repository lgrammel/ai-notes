# Agentic Workloads

Agentic workloads are [agent](./agent.md)-driven traffic patterns that differ from both human-driven and traditional API workloads in their burstiness, concurrency, and parameter diversity. Where conventional integrations call fixed endpoints with predictable inputs, agents explore the full breadth of an API surface at machine speed - rare parameter combinations, edge-case filters, and novel query compositions - creating load profiles that existing [infrastructure](./ai-infrastructure.md) was rarely designed or tested for.

## Details

Compared to human-driven traffic, agentic workloads favor structured machine-readable responses over rendered pages. At the more experimental end, agents generate declarative code (SQL, GraphQL, infrastructure-as-code) for execution, making the request space effectively unbounded.

These patterns affect multiple infrastructure layers. Caching and database indexes tuned for common query shapes degrade against the long tail of agent-generated requests. [Rate limiting](./rate-limiting.md) and abuse detection built around human signals (session cookies, CAPTCHAs) or fixed integration patterns become ineffective; [AI gateways](./ai-gateway.md) and agent-aware rate policies are common adaptations. Autoscaling also shifts: agent-driven traffic can spike abruptly as automated workflows trigger in parallel, compounding [inference](./inference.md) costs with tool execution costs, unlike the predictable curves of human or traditional integration traffic.

## Examples

- A web service shifting from browser requests to agent API calls, requiring structured JSON endpoints instead of server-rendered HTML.
- An agent generating SQL queries on the fly, submitting novel joins and filter combinations that bypass predefined query templates.
- Cloud autoscaling policies failing under bursty, high-concurrency agent workloads that differ from gradual human traffic curves.
- [Rate limiting](./rate-limiting.md) systems blocking legitimate agent access because request patterns resemble automated attacks.
