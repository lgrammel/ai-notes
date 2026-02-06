# Prompt

A prompt is the input you send to a [Large Language Model (LLM)](./large-language-model.md) to elicit a desired behavior--typically a combination of **instructions**, **[context](./context.md)**, and **examples** (often structured as system/developer/user messages or a reusable template with variables).

Prompts are part of the product's "behavior layer": changing a prompt can change outputs as much as changing the [model](./large-language-model.md). In practice, prompt changes should be treated like code changes--validated with [evals](./evaluations-evals.md) (including regression tests from production failure cases) and monitored with [observability tools](./observability-tools.md) that capture prompt/template versions, key inputs, outputs, latency, cost, and safety signals to debug issues and detect drift.

Prompting is one input to [context engineering](./context-engineering.md), which manages what goes into the model's context window and how it is structured under a given [context size](./context-size.md).
