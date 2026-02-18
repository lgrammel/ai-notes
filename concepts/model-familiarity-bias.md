# Model Familiarity Bias

Model familiarity bias is the tendency of [LLMs](./llm.md) to produce higher-quality outputs for patterns, tools, APIs, and conventions that are well-represented in their [training](./training.md) data, systematically favoring the familiar over the novel regardless of merit.

## Details

The mechanism is statistical: during [pretraining](./pretraining.md), models encounter popular libraries, dominant frameworks, and widely-used API conventions far more often than niche alternatives. This frequency imbalance produces stronger internal representations for familiar patterns - the model predicts their structure, naming, and usage more accurately. A well-known library gets correct function signatures and idiomatic usage; an equally capable but less represented alternative gets [hallucinated](./hallucination.md) APIs and subtly wrong usage patterns.

The bias has a compounding dynamic. Tools and libraries that LLMs use well attract more agent-driven adoption, generating more public code (Stack Overflow answers, GitHub repositories, tutorials), which enters future training sets and reinforces the advantage. Conversely, unfamiliar tools that agents use poorly generate fewer successful examples, keeping them underrepresented. This creates a rich-get-richer effect independent of technical quality.

The same bias is both a design opportunity and an attack surface. Tool authors can exploit predictable model expectations to build interfaces that agents use correctly without extensive documentation (see [agent UX](../ideas/agent-ux.md)). Vendors can invest in training-time influence to increase model familiarity with their products (see [agent SEO](../ideas/agent-seo.md)). But attackers can also exploit predictable hallucination patterns - registering package names that models consistently hallucinate to serve malicious code (see [hallucination exploitation](../threats/hallucination-exploitation.md)).

Model familiarity bias is not static. It shifts across model generations as training data composition changes, and it can be partially overridden at [inference](./inference.md) time by loading documentation, examples, or tool descriptions into [context](./context.md). Whether training-time bias or inference-time context dominates depends on the task and how much contextual information is provided.
