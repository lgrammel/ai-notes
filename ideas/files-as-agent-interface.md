# Files as Agent Interface

Files as agent interface is the idea that the filesystem is the most natural and battle-tested interface for [agents](../concepts/agent.md), because file operations are already well-represented in model [training](../concepts/training.md) data, human-inspectable, portable, and self-documenting.

## Details

The primary evidence is [coding agents](../concepts/coding-agent.md) like Claude Code, where bash combined with a filesystem has proven to be a highly effective agent interface. Agents already know `cat`, `grep`, `mv`, and `mkdir` from training data, so file operations require minimal prompting overhead. Files are also inspectable (users can see what the agent created, edit it, or delete it), portable (export and backup are trivial), and self-documenting (a directory structure like `/projects/acme/notes/` communicates meaning in a way that database queries do not).

A related pattern is the context file: a human-readable file (e.g., `context.md`) that the agent reads at session start and updates as state changes, serving as portable working memory without code changes. The context file typically includes what the agent knows about the user, what exists in the workspace, recent activity, and behavioral guidelines. This is a lightweight form of [agent memory](../concepts/agent-memory.md) that leverages the filesystem rather than a dedicated memory service, and is a [context engineering](../concepts/context-engineering.md) technique that keeps relevant state accessible without embedding it in system prompts.

The general design heuristic is files for legibility, databases for structure. Files work well when scale is small (one user's data, not millions of records), transparency is valued over query speed, and cloud sync (iCloud, Dropbox) can substitute for server infrastructure. Even when a database is needed for performance, a file-based "source of truth" that the agent works with can be synced to the database for the UI. [Workspace agents](../concepts/workspace-agent.md) already operate on this principle, centering their tool use on a persistent filesystem.

When agents and users write to the same files, a conflict model is needed. Approaches range from last-write-wins (simple but lossy) to separate spaces (agent writes to drafts, user promotes) to append-only logs that avoid overwrites entirely.

## External references

- https://every.to/guides/agent-native
