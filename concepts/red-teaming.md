# Red Teaming

Red teaming is the practice of systematically probing an AI system with adversarial inputs, scenarios, and techniques to discover vulnerabilities, safety failures, and unintended behaviors before they occur in production.

## Details

Red teaming goes beyond standard [evals](./evals.md) by simulating realistic attack scenarios: testers (human or automated) attempt [prompt injection](../threats/prompt-injection.md), [guardrail bypass](../threats/guardrail-bypass.md), [hallucination](./hallucination.md) exploitation, and other [threats](../threats/index.md) to find failure modes that conventional test suites miss. Results feed back into [alignment](./alignment.md) improvements, [guardrail](./guardrail.md) tuning, and targeted eval creation.

Automated red teaming uses a separate [LLM](./llm.md) to generate, mutate, and escalate adversarial inputs at scale, covering far more attack surface than manual testing alone. Common techniques include prompt-mutation fuzzing (systematically rewriting known attacks to evade pattern-based filters), multi-turn escalation (gradually steering a conversation toward a policy violation), and classifier-in-the-loop filtering that uses a [model-as-a-judge](./model-as-a-judge.md) to surface only the successful bypasses for human review.

Mature teams integrate red-teaming suites into CI/release pipelines alongside [eval runners](./eval-runner.md), running a battery of known attack patterns as a release gate. Because model updates, new [tool](./tools.md) integrations, and changing threat landscapes can reopen previously mitigated vulnerabilities, continuous automated red teaming complements periodic manual exercises.

## Examples

- A dedicated team crafting adversarial prompts to bypass a model's safety training before release.
- Automated red-teaming pipelines that generate and test thousands of attack variants against guardrails.
- Pre-deployment testing of an agent system for prompt injection, tool misuse, and data exfiltration scenarios.

## Synonyms

adversarial testing, AI red teaming
