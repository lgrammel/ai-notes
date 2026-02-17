# Agent Hosting Platform

A hosted platform for deploying, running, and managing [agents](./agent.md) in production - handling containerized deployment, task lifecycle, versioning, filesystem orchestration, and operational concerns ([secrets](./agent-credential-management.md), logs, environments) so teams ship agents without building custom infrastructure.

## Details

They sit above [sandbox services](./sandbox.md) (which provision isolated execution environments) and [inference providers](./inference-provider.md) (which handle model calls): the hosting platform adds deployment, version management, task routing, filesystem mounting, and production tooling (rollbacks, preview environments, [observability](./observability.md)) around the [agent runtime](./agent-runtime.md).

Common capabilities include containerized agent packaging (typically Docker), event-based task lifecycle handlers (create/event/complete), per-task filesystem configuration with read/write controls, in-flight task migration across agent versions, [agent checkpointing](./agent-checkpointing.md), built-in messaging layers with persistence and streaming, and multi-tenant namespace isolation for B2B use cases.

## Examples

- [Terminal Use](https://www.terminaluse.com/) - purpose-built hosting for long-running agents that need filesystem access, with namespace-based multi-tenancy and Vercel AI SDK integration.
- General-purpose compute platforms (Modal, Render, Railway) adapted for agent workloads with container orchestration and persistent storage.

## Synonyms

agent hosting, agent deployment platform
