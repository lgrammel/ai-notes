# Latent Demand Discovery

Latent demand discovery is the idea that [agent](../concepts/agent.md)-native applications can discover what features to build by observing what users ask the agent to do, inverting traditional product development from imagine-build-validate into build a capable foundation, observe, and formalize.

## Details

When an application gives an agent atomic [tools](../concepts/tools.md) and parity with the UI, users inevitably ask for things the developer did not anticipate. The agent either composes tools to accomplish the request or fails, revealing a gap. Both outcomes are signal: successful unanticipated requests indicate patterns worth optimizing with domain-specific tools or dedicated prompts, and failed requests expose missing tools or parity gaps that constrain the agent's usefulness.

Over time, the developer can add domain tools for common patterns (making them faster and more reliable), create dedicated prompts for frequent requests (making them more discoverable), and remove tools that are not being used. The agent becomes a research instrument for understanding what users actually need, grounded in observed behavior rather than upfront feature speculation.

This changes the product development feedback loop. Traditional development requires imagining what users want, building it, and seeing if the guess was right. Agent-native development starts with a capable foundation and learns from what emerges, with the agent mediating between user intent and system capability.

## External references

- https://every.to/guides/agent-native
