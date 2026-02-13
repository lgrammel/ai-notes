# Image Generation

Image generation is a capability where a [multimodal model](./multimodal-model.md) or specialized model produces images from text descriptions (text-to-image) or transforms existing images based on text instructions (image editing).

## Details

In [AI engineering](./ai-engineering.md), image generation is typically accessed through APIs that accept text [prompts](./prompt.md) and return generated images. Models like DALL-E, Stable Diffusion, and Midjourney produce photorealistic or stylized images from natural language descriptions. When integrated into [agent](./agent.md) systems, image generation becomes a [tool](./tools.md) the model can invoke, producing visual content as part of a conversation or workflow.

Image generation introduces distinct trust concerns: generated images can be photorealistic enough to create convincing but fabricated visual content, and the model's interpretation of ambiguous prompts may produce unexpected or harmful outputs. [Guardrails](./guardrail.md) typically operate at both the prompt level (rejecting requests for harmful content) and the output level (filtering generated images), but these are probabilistic and can be circumvented through [guardrail bypass](../threats/guardrail-bypass.md) techniques.

## Examples

- A chatbot generating a diagram or illustration in response to a user request.
- An agent producing photorealistic images that could be mistaken for photographs.
- An image editing tool that modifies existing images based on text instructions.

## Synonyms

text-to-image generation, AI image generation, image synthesis
