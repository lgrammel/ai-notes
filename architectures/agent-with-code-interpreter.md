# Agent with Code Interpreter

An [agent](../concepts/agent.md) whose primary tool is a [code execution tool](../concepts/code-execution-tool.md) that runs model-generated code in an ephemeral [sandbox](../concepts/sandbox.md), producing computation results, data analysis, visualizations, and file transformations that feed back into the agent's [context](../concepts/context.md).

## Details

The agent operates a generate-execute-observe loop: it writes code (typically Python), the [agent runtime](../concepts/agent-runtime.md) executes it in a sandboxed environment, and the output (stdout, stderr, generated files, rendered images) returns as [context](../concepts/context.md) for the next reasoning step. This closes the loop between code generation and observing effects, making the architecture effective for tasks that require precise computation, data manipulation, or iterative exploration - areas where pure text generation is unreliable.

The sandbox is typically ephemeral and restricted: a session-scoped filesystem (files persist within a session but are discarded after), restricted or no network access, CPU/memory/time limits, and a curated set of pre-installed libraries. User-uploaded files are mounted into the sandbox, giving the agent data to operate on. This differs from an [Agent with Colocated Filesystem](./agent-with-colocated-filesystem.md) in several ways: the sandbox is ephemeral rather than a persistent workspace, code execution is the primary capability rather than codebase editing, there is typically no [shell](../concepts/shell-tool.md) access or [skill](../concepts/skill.md) loading beyond what the code interpreter provides, and the agent does not read or modify files that influence its own behavior.

The unique trust property of this architecture is that the agent's text output (generated code) is directly executed as instructions to the runtime. Unlike [API-style tools](./agent-with-api-style-tools.md) where tool schemas constrain what the agent can request, generated code can do anything the sandbox permits - there is no schema boundary between the agent's output and the executed action. This makes the quality of sandbox isolation the critical security control: the sandbox must contain any harmful code the agent might generate, whether from [hallucination](../concepts/hallucination.md), [prompt injection](../threats/prompt-injection.md), or [misaligned model behavior](../threats/misaligned-model-behaviors.md).

## Trust boundaries

The sandbox is the outer boundary, separating code execution from the host system. Sandbox controls (filesystem scoping, network restrictions, resource limits, process isolation) define what generated code can reach. Within the sandbox, the agent's generated code runs with full permissions - it can read and write files, import any available library, and perform any computation the sandbox allows. There is no schema or argument validation between the agent and code execution; the code itself is the action.

User-uploaded files enter the sandbox and become part of the agent's operating environment. Their content can influence the agent's reasoning (through the context) and be operated on by generated code. Code execution outputs (stdout, stderr, files, images) cross back into the agent's context as tool results. The ephemeral nature of the sandbox limits persistence: generated files and state are discarded after the session, reducing the risk of [persistence attacks](../threats/persistence-attacks.md) compared to architectures with persistent filesystems.

## Applicable threats

- [Prompt injection](../threats/prompt-injection.md) - untrusted input in the context (user messages, uploaded file contents) can influence code generation, causing the agent to write and execute malicious code
- [Hallucination exploitation](../threats/hallucination-exploitation.md) - crafted inputs that trigger confident but false outputs, leading to incorrect computations or analysis
- [Guardrail bypass](../threats/guardrail-bypass.md) - techniques that circumvent safety constraints on code generation
- [System prompt extraction](../threats/system-prompt-extraction.md) - tricking the model into revealing its instructions
- [User manipulation](../threats/user-manipulation.md) - exploiting user trust in computation results that appear authoritative
- [Misaligned model behaviors](../threats/misaligned-model-behaviors.md) - intrinsic model tendencies that lead to incorrect or harmful code generation
- [Training data poisoning](../threats/training-data-poisoning.md) - compromised training data affecting the model's code generation behavior
- [Tool misuse](../threats/tool-misuse.md) - generated code that performs authorized but harmful operations within the sandbox (e.g., deleting user-uploaded files, producing misleading analysis)
- [Tool output poisoning](../threats/tool-output-poisoning.md) - code execution results containing content that hijacks subsequent agent reasoning
- [Data exfiltration](../threats/data-exfiltration.md) - generated code that transmits sensitive data outside the sandbox through network requests (if permitted), encoded outputs, or side channels
- [Denial of service](../threats/denial-of-service.md) - generated code that causes expensive computation, infinite loops, memory exhaustion, or excessive file generation within the sandbox
- [Goal manipulation](../threats/goal-manipulation.md) - untrusted input redirecting the agent's objectives, causing it to generate code that serves attacker goals
- [Unauthorized code execution](../threats/unauthorized-code-execution.md) - the primary architecture-specific threat; generated code is the attack surface, and sandbox quality is the sole mitigation boundary
- [Privilege compromise](../threats/privilege-compromise.md) - sandbox escape or misconfiguration granting code execution access to host resources beyond the intended boundary

## Examples

- ChatGPT Code Interpreter / Advanced Data Analysis: runs Python in a server-side sandbox during conversation, producing charts, file transformations, and computation results.
- Gemini code execution: executes model-generated Python in Google's sandboxed runtime and returns results inline.
- Custom data analysis agents that wrap a Python runtime in a Docker container or [sandbox service](../concepts/sandbox-service.md), accepting user-uploaded CSVs and producing statistical analysis, visualizations, and cleaned datasets.
