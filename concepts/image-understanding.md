# Image Understanding

Image understanding is a capability where a [multimodal model](./multimodal-model.md) processes images as input and reasons about their visual content alongside text, enabling tasks like image description, visual question answering, and document analysis.

## Details

In [AI engineering](./ai-engineering.md), image understanding is typically accessed by including images in API requests alongside text [prompts](./prompt.md). The model's vision encoder converts the image into token-like representations that are processed alongside text tokens, allowing the model to describe image contents, answer questions about visual elements, extract text from screenshots or documents, and reason about spatial relationships.

Image understanding introduces a distinct [prompt injection](../threats/prompt-injection.md) surface: adversarial content can be embedded directly in images (as visible or near-invisible text, QR codes, or steganographic patterns) that the model processes as instructions. This visual prompt injection is particularly concerning because images appear benign to human reviewers while containing instructions that redirect model behavior. In [agent](./agent.md) systems where images enter the [context](./context.md) from untrusted sources (user uploads, web pages, screenshots), this creates an injection vector that bypasses text-based input filters.

## Examples

- A model describing the contents of a user-uploaded photograph.
- A model extracting structured data from a screenshot of a table or form.
- A model answering questions about a diagram or chart.
- An adversarial image containing near-invisible text that instructs the model to ignore previous instructions.

## Synonyms

vision, visual understanding, image analysis, visual reasoning
