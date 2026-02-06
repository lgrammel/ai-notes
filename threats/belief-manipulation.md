# Belief Manipulation

Belief manipulation exploits the trust relationship between a user and an AI [agent](../concepts/agent.md) to spread misinformation, social-engineer the user into revealing sensitive information, or persuade the user to take harmful actions.

Users tend to treat agent responses as authoritative, especially when the agent has demonstrated competence or has access to [tools](../concepts/tools.md) and data the user cannot easily verify. An attacker who gains influence over the agent -- for example through [prompt injection](./prompt-injection.md) or [goal manipulation](./goal-manipulation.md) -- can leverage this trust to turn a nominally human-supervised system into an effectively unsupervised one.

## Examples

- A compromised customer-service agent convinces a user to share their account credentials, claiming it is needed for verification.
- An agent influenced by a prompt injection subtly steers a user toward a specific product by presenting biased comparisons.
- A coding agent confidently recommends an insecure implementation pattern, and the developer trusts the recommendation without review.

## Mitigations

- Transparency indicators distinguishing AI-generated content from verified facts
- Independent verification mechanisms for high-stakes recommendations
- [Observability](../concepts/observability.md) on [agent](../concepts/agent.md) influence patterns
