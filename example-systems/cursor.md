# Cursor

Cursor is a [coding agent](../concepts/coding-agent.md) operating as a [copilot](../concepts/copilot-interface.md) inside a developer's IDE, combining a [multi-turn](../concepts/multi-turn-conversation.md) [agent](../concepts/agent.md) loop with [filesystem](../concepts/filesystem-agent.md) and [shell](../concepts/shell-tool.md) access, [subagent](../concepts/subagent.md) delegation, [human-in-the-loop](../concepts/human-in-the-loop.md) approval, and [skills](../concepts/skill.md) loaded from the workspace.

## Capabilities

- [Multi-turn conversation](../concepts/multi-turn-conversation.md)
- [Agent](../concepts/agent.md) loop with [tool](../concepts/tools.md) calling
- [Filesystem agent](../concepts/filesystem-agent.md) (read/write access to workspace files)
- [Shell tool](../concepts/shell-tool.md) (arbitrary command execution)
- [Subagents](../concepts/subagent.md) (parallel task delegation)
- [Human-in-the-loop](../concepts/human-in-the-loop.md) ([tool execution approval](../concepts/tool-execution-approval.md))
- [Skills](../concepts/skill.md) (instruction files loaded from workspace)
- [Copilot interface](../concepts/copilot-interface.md) (embedded in IDE)
- [MCP](../concepts/mcp.md) (external tool server connections)

## Trust analysis

Cursor runs unsandboxed in the developer's local environment with the developer's full permissions. There is no [sandbox](../concepts/sandbox.md) boundary - the agent can access anything the developer can, including credentials, SSH keys, and other projects on the filesystem. This makes [human-in-the-loop](../concepts/human-in-the-loop.md) approval the primary safety mechanism rather than technical containment.

The filesystem is both workspace and instruction source: [skill](../concepts/skill.md) files and rule files (e.g., `AGENTS.md`, `.cursor/rules/`) are discovered and loaded into the agent's [context](../concepts/context.md) by the [agent runtime](../concepts/agent-runtime.md). A compromised repository can alter the agent's behavioral instructions before the developer even interacts with it, through [context poisoning](../threats/context-poisoning.md) via crafted skill or rule files.

The agent proposes file edits and shell commands for the developer to accept, reject, or modify. The developer reviews actions in the [copilot interface](../concepts/copilot-interface.md), but the volume and complexity of proposed changes - especially during extended coding sessions - creates [human approval fatigue exploitation](../threats/human-approval-fatigue-exploitation.md) risk. Auto-approved actions (such as file reads and searches) bypass the human boundary entirely.

[Subagents](../concepts/subagent.md) run with their own context but share the same unsandboxed environment. A subagent that encounters [prompt injection](../threats/prompt-injection.md) in a file can return poisoned results that influence the parent agent's subsequent edits. [MCP](../concepts/mcp.md) connections extend the capability surface to external tool servers, introducing additional trust boundaries around tool server authentication and behavior.

## Interaction effects

- **Filesystem + shell + no sandbox**: The agent can install and execute arbitrary dependencies under the developer's identity, opening a [supply chain attack](../threats/supply-chain-attack.md) surface. A malicious package installed via shell can execute during builds, tests, or agent operations with the developer's full permissions.
- **Skills + filesystem write access**: The agent reads skill files to shape its behavior and has write access to the same filesystem where skills live. A compromised agent session can modify skill files to influence future sessions - a [persistence attack](../threats/persistence-attacks.md) that survives beyond the current interaction.
- **Subagents + filesystem**: Subagents search and read files in parallel, then return results to the parent. If a repository contains [prompt injection](../threats/prompt-injection.md) payloads in source files or documentation, a search subagent can propagate the payload into the parent's context, influencing subsequent edits across the codebase.
- **Human-in-the-loop + high action volume**: Extended coding sessions produce dozens of file edits and shell commands. The propose-review-execute loop is the primary defense, but its effectiveness degrades as the developer's review attention diminishes over a long session.
- **MCP + no sandbox**: External MCP tool servers can expose capabilities that interact with the unsandboxed environment. A malicious or compromised MCP server can influence agent behavior through [tool output poisoning](../threats/tool-output-poisoning.md), and the agent can act on that influence with the developer's full system access.

## Threats

- [Prompt injection](../threats/prompt-injection.md) - untrusted content in workspace files (source code, documentation, dependencies), tool outputs, or conversation history can override instructions and direct file edits or shell commands
- [Hallucination exploitation](../threats/hallucination-exploitation.md) - crafted inputs that trigger confident but false outputs, leading to incorrect code edits, wrong dependency choices, or flawed architectural decisions
- [Guardrail bypass](../threats/guardrail-bypass.md) - techniques that circumvent safety constraints on code generation or command execution, including multi-turn jailbreaking across extended coding sessions
- [System prompt extraction](../threats/system-prompt-extraction.md) - tricking the model into revealing its system instructions or loaded skill/rule file contents through conversation or tool interactions
- [User manipulation](../threats/user-manipulation.md) - exploiting developer trust in agent-proposed code changes and explanations, particularly when the agent presents confident justifications for subtly harmful edits
- [Misaligned model behaviors](../threats/misaligned-model-behaviors.md) - intrinsic model tendencies (sycophancy, shortcut-taking) that degrade code quality or produce subtly harmful changes the developer may not catch during review
- [Training data poisoning](../threats/training-data-poisoning.md) - compromised training data affecting the model's code generation patterns, security practices, or dependency recommendations
- [Context poisoning](../threats/context-poisoning.md) - manipulated workspace files, skill files, or rule files (e.g., `AGENTS.md`, `.cursor/rules/`) that alter agent behavior when loaded into context, enabling an attacker to control the agent through a compromised repository
- [Tool misuse](../threats/tool-misuse.md) - authorized but harmful file edits or shell commands, such as deleting files, running destructive commands, modifying unrelated projects, or overwriting critical configuration
- [Tool output poisoning](../threats/tool-output-poisoning.md) - malicious data in command outputs, file contents, or MCP tool responses that hijacks subsequent agent reasoning and directs further harmful actions
- [Data exfiltration](../threats/data-exfiltration.md) - sensitive data (credentials, SSH keys, API tokens, proprietary source code) extracted through shell commands, network requests, or MCP tool calls, leveraging the developer's full system permissions
- [Denial of service](../threats/denial-of-service.md) - fork bombs, resource-exhausting commands, unbounded tool-call loops, or excessive file generation that degrades the developer's local environment
- [Goal manipulation](../threats/goal-manipulation.md) - injected instructions in workspace files or tool outputs that redirect the agent's objectives, causing it to make edits that serve attacker goals rather than the developer's intent
- [Unauthorized code execution](../threats/unauthorized-code-execution.md) - injected shell commands or scripts executed through the agent's shell access, running with the developer's full system permissions
- [Persistence attacks](../threats/persistence-attacks.md) - backdoors planted in source code, CI/CD configuration, skill files, git hooks, or cron jobs that survive beyond the compromised session and affect future development or deployments
- [Supply chain attack](../threats/supply-chain-attack.md) - malicious dependencies installed via shell (packages, tools, MCP servers) that execute during builds, tests, or agent operations with the developer's full permissions
- [Privilege compromise](../threats/privilege-compromise.md) - no sandbox boundary exists; the agent operates with the developer's full system permissions, making any successful attack vector immediately high-impact
- [Human approval fatigue exploitation](../threats/human-approval-fatigue-exploitation.md) - high volumes of proposed file edits and shell commands during extended coding sessions that degrade the developer's review attentiveness, effectively converting the supervised system into an unsupervised one
- [Multi-agent system threats](../threats/multi-agent-system-threats.md) - subagent delegation chains enabling injection propagation, where a compromised subagent returns poisoned results that influence the parent agent's subsequent edits across the codebase
