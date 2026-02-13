# Conversational Interface

A UI pattern where users interact with AI through natural-language conversation. Conversational interfaces range from standalone chatbots (a dedicated chat window) to copilot interfaces where AI assistance - chat, inline suggestions, autonomous [agent](./agent.md) actions - is embedded directly into a professional tool's workspace.

## Details

**Standalone chatbots** present a dedicated conversational window as the primary interaction surface. They range from simple input-response systems (one [LLM](./llm.md) call per user turn) to chat UIs that front an [agent](./agent.md) and its [agent runtime](./agent-runtime.md), running a tool-using loop before replying. A chatbot may call [tools](./tools.md) (e.g. [RAG](./rag.md)) without being an agent; in this repo, "agent" implies an iterative loop over tool calls and updated state. Because users tend to trust chatbot responses as authoritative, chatbots are a surface for [user manipulation](../threats/user-manipulation.md) attacks.

**Copilot interfaces** embed AI capabilities inside an existing application (IDE, design tool, spreadsheet) rather than in a separate window. Multiple interaction patterns coexist in the same UI: chat panels for open-ended requests, inline completions and suggestions, background agents that perform multi-step tasks, and contextual actions triggered from UI elements. A defining characteristic is shared context: the AI observes the user's current state - open files, cursor position, selected text, terminal output - and tailors assistance accordingly. This enables a [human-in-the-loop](./human-in-the-loop.md) workflow where the user steers, reviews, and overrides AI actions in real time. Copilot interfaces sit between fully manual work and fully autonomous agents on the automation spectrum, most effective for tasks that benefit from human judgment combined with AI speed.

A chatbot may appear as one component within a copilot interface. Both patterns commonly support [multi-turn conversation](./multi-turn-conversation.md), maintaining conversation history across turns.

## Examples

- ChatGPT, Claude: standalone chatbots that front agent loops with tool use.
- Customer support chatbot: a standalone chat window answering questions from a knowledge base.
- Cursor, Windsurf: IDEs with integrated chat, inline completions, and agent modes (copilot interfaces).
- GitHub Copilot in VS Code: inline code suggestions and a chat panel embedded in the editor.
- Microsoft Copilot in Office 365: AI assistance embedded in Word, Excel, and PowerPoint.

## Synonyms

chatbot, chat assistant, copilot interface, AI-augmented interface, copilot UX
