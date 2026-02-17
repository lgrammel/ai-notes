# AI Engineering

AI engineering is the discipline of building, integrating, and operating applications and systems on top of models, primarily through API-based integration rather than model training.

## Details

AI engineering takes pre-trained models as a given and focuses on the application layer: [prompt](./prompt.md) design, [context engineering](./context-engineering.md), [tool](./tools.md) orchestration, [AI workflows](./ai-workflow.md), [RAG](./rag.md) pipelines, [agent](./agent.md) loops, [guardrails](./guardrail.md), [evals](./evals.md), and production concerns like [latency](./latency.md), [observability](./observability.md), and cost management. The core output is a working AI-powered product or system, not a trained model.

This distinguishes it from [ML engineering](./ml-engineering.md), which centers on the model lifecycle - data curation, model architecture design, [training](./training.md), [fine-tuning](./fine-tuning.md), and inference optimization. ML engineering produces models; AI engineering produces systems that use them. The two disciplines overlap at boundaries like fine-tuning and [model quantization](./model-quantization.md), but their day-to-day concerns, toolchains, and deliverables differ substantially.
