# Coding Agent

A [workspace agent](./workspace-agent.md) specialized for software engineering tasks: reading and writing source code, running builds, executing tests and linters, navigating codebases, and committing changes inside a repository or project directory.

Coding agents typically operate in a [sandbox](./sandbox.md) (local or remote) that provides a filesystem with a checked-out repository, a shell for running development [tools](./tools.md), and access to version-control operations. Their tool loop centers on the edit-build-test cycle: make a change, observe compiler/test/lint output, and iterate until the task is complete.

Common capabilities include file reading/writing, shell command execution, code search (e.g. grep, AST-based lookup), test/lint invocation, and git operations. Some coding agents also integrate with external services such as CI pipelines, issue trackers, or code-review platforms.

## Examples

- An IDE-integrated agent that edits project files, runs tests, and proposes diffs in response to user instructions.
- A cloud-hosted agent that picks up a GitHub issue, clones the repo into a remote sandbox, implements the fix, and opens a pull request.
- A CLI-based agent that accepts a task description, modifies local source files, and runs the test suite to verify correctness.

## Synonyms

software engineering agent, SWE agent, AI coding assistant
