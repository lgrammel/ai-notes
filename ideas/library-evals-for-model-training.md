# Library Evals for Model Training

Library evals for model training is the idea that [tool](../concepts/tools.md) and library vendors can work directly with frontier [model developers](../concepts/model-developer.md) to create [evals](../concepts/evals.md) that demonstrate correct usage of their tools, which are then used to adjust model [training](../concepts/training.md) to improve those eval scores.

## Details

This is a paid mechanism for reducing the awareness cost described in [Agent SEO](./agent-seo.md). Rather than waiting for organic adoption to generate public training data, vendors create eval suites that show how (and how not) to use their tool, and model developers tune training to score well on these evals - effectively baking tool familiarity into the model's weights.

This creates a potential asymmetry: well-funded vendors can pay for training influence, while smaller or open-source tools rely on organic data. It also introduces a [supply chain](../threats/supply-chain-attack.md) consideration - if model training can be commercially influenced to favor specific tools, the integrity of that influence channel becomes security-relevant.

## Examples

- A tool vendor collaborating with a frontier lab to build evals demonstrating correct and incorrect tool invocations, then using those evals to adjust training.
- A database vendor creating eval suites that teach models to generate correct queries for their specific SQL dialect.

## Counterarguments

- Model developers have strong incentives to resist vendor-specific training influence that could compromise model generality. A model trained to favor one database's SQL dialect over equivalent alternatives becomes less useful for the broader user base, creating tension between vendor revenue and model quality.
- The mechanism assumes that eval-driven training produces durable familiarity. In practice, model knowledge of specific libraries may be fragile - shifting with each training run, new data mixture, or architecture change - making the return on eval investment unpredictable across model versions.
- The asymmetry between funded vendors and open-source tools may be offset by organic adoption. If open-source tools generate enough public usage data (Stack Overflow posts, GitHub repositories, tutorials), they may achieve comparable training-time awareness without paid eval partnerships, limiting the practical advantage of the paid channel.

## External references

- https://steve-yegge.medium.com/software-survival-3-0-97a2a6255f7b
