# Agent Instructions

This repository is a lightweight knowledge base of my notes on **AI** and **security for AI systems**. The content is intentionally short and “definition-first”: each note captures a concept, role, or practice in a way that’s easy to reference while designing, building, or reviewing AI products.

## How agents should reason (use the repo’s definitions)

- Treat `concepts/` as the **canonical source of truth** for terminology and definitions in this repo.
- Don’t invent new definitions in-line. If you need a definition that’s missing/unclear, **update or add a note under `concepts/`**, then proceed using it.

## What you’ll find here

- **`concepts/`**: bite-sized markdown notes defining core terms (e.g. LLMs, evals, fine-tuning, inference providers, observability/telemetry).
- **Occasional artifacts**: as the repo grows, it may also include small scripts, JSON, or other files that support the notes (examples, snippets, checklists, etc.).

## How to use it

- Start with `concepts/` when you need a shared definition for a discussion, design doc, or review.
- Treat the notes as a living glossary: update entries as understanding changes or best practices evolve.

## Conventions for new notes

- Keep notes **short** and **practical** (one screen when possible).
- Prefer **clear definitions** plus 1–2 sentences on why it matters in production.
- Put **term definitions** in `concepts/`. In other files, reference/link to the relevant concept note rather than duplicating definitions.
- When relevant, connect concepts (e.g. how **telemetry** feeds **evals**, how **evals** gate releases, how **observability** catches regressions).
