# Library Evals for Model Training

Library evals for model training is the idea that [tool](../concepts/tools.md) and library vendors can work directly with frontier [model developers](../concepts/model-developer.md) to create [evals](../concepts/evals.md) that demonstrate correct usage of their tools, which are then used to adjust model [training](../concepts/training.md) to improve those eval scores.

This is a specific, paid mechanism for reducing the "awareness cost" described in [Agent SEO](./agent-seo.md). Rather than waiting for organic adoption to generate public training data, vendors proactively create eval suites that show how (and how not) to use their tool. The model developer's researchers then tune [training](../concepts/training.md) to score well on these evals, effectively baking tool familiarity into the model's weights.

The result is that agents using models trained this way have built-in knowledge of the tool's semantics, expected inputs/outputs, and common patterns -- similar to how [provider-defined tools](../concepts/tools.md) have model-level training, but applied to third-party tools via a commercial relationship rather than a first-party integration.

This creates a potential asymmetry: well-funded tool vendors can pay for training influence, while smaller or open-source tools rely on organic training data. It also introduces a [supply chain](../threats/supply-chain-compromise.md) consideration -- if model training can be commercially influenced to favor specific tools, the integrity of that influence channel becomes security-relevant.

## Examples

- An OpenAI employee working with a tool vendor to build evals demonstrating correct and incorrect tool invocations, then using those evals to adjust training.
- A database vendor creating eval suites that teach models to generate correct queries for their specific SQL dialect.

## External references

- https://steve-yegge.medium.com/software-survival-3-0-97a2a6255f7b
