# Agent Credential Management

Agent credential management is the set of patterns for securely providing credentials to [agents](./agent.md) so they can authenticate to external systems (websites, APIs, databases) without unnecessarily exposing secrets in the agent's [context](./context.md) or to intermediary infrastructure.

## Details

Agents frequently need to authenticate on behalf of users - signing in to websites, calling authenticated APIs, or accessing protected resources. How credentials reach the agent determines the attack surface for [privilege compromise](../threats/privilege-compromise.md) and [data exfiltration](../threats/data-exfiltration.md).

Common approaches form a spectrum from least to most secure:

- **Credentials in agent context**: Secrets passed as plaintext environment variables, system prompt content, or tool parameters. The agent (and anything that can read its context) has direct access to raw credentials. Maximally convenient but creates broad exposure to exfiltration via [prompt injection](../threats/prompt-injection.md), [tool output poisoning](../threats/tool-output-poisoning.md), or logging.
- **Platform-level secrets injection**: The [agent hosting platform](./agent-hosting-platform.md) or [sandbox](./sandbox.md) service injects secrets into the execution environment (e.g., environment variables in a container) without the agent explicitly requesting them. The agent's code can read secrets, but they are not part of the model's context. Limits exposure to the execution environment rather than the model's reasoning trace.
- **Vault integration**: The agent calls a secrets management API (e.g., HashiCorp Vault, cloud KMS) at runtime to retrieve scoped, short-lived credentials. Adds audit logging, access policies, and credential rotation, but the agent still receives and handles raw credentials transiently.
- **Credential brokering**: A trusted credential manager mediates authentication directly - the agent requests "sign me in" and a separate system performs the credential injection (e.g., autofilling a login form) without the agent ever seeing the secret. The agent orchestrates the authentication flow but never handles raw credentials.

Credential brokering provides the strongest isolation because secrets never enter the agent's context, execution environment, or tool outputs. Key properties of this pattern include per-use [human-in-the-loop](./human-in-the-loop.md) approval (each credential access triggers an explicit confirmation), end-to-end encryption between the credential store and the target (bypassing all intermediaries), minimal data exposure (only the required fields are injected), and audit logging of every credential access.

Credential brokering is particularly relevant for [computer use agents](./computer-use-agent.md) that interact with web login forms, where the broad GUI action space makes credential exposure especially risky.

## Examples

- 1Password Agentic Autofill: a credential brokering integration where 1Password autofills login forms in a headless browser (via Browserbase) over an end-to-end encrypted channel, with per-use approval from the user's 1Password app. The agent never sees the credentials.
- [Sandbox](./sandbox.md) services that mount secrets as environment variables in an isolated container, accessible to the agent's code but not part of the model's context window.
- Agents that call a secrets API to retrieve short-lived OAuth tokens scoped to a specific service, with automatic rotation and revocation.

## External references

- <https://developer.1password.com/docs/agentic-autofill/>
