# Workspace Agent

An [agent](./agent.md) that operates on a longer-lived workspace state (typically a filesystem in a local or remote [sandbox](./sandbox.md)) and uses tools to read/write files, run commands (e.g. shell), and inspect outputs as it iterates.

Workspace agents are common in IDE and coding workflows where multi-step tasks depend on accumulating changes in a repository or project directory over time. A [coding agent](./coding-agent.md) is a specialized workspace agent focused on software engineering tasks.

## Examples

- An IDE-integrated agent that edits project files and runs tests/linters via shell commands.
- A remote sandboxed coding agent that clones a repo, makes commits, and executes build steps.
