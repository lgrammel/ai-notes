# Weakened Lindy Effect

The Lindy effect for software - the principle that long-surviving codebases will continue to survive because replacement cost is prohibitively high - weakens when [coding agents](../concepts/coding-agent.md) can cheaply explore, understand, and rewrite large codebases.

## Details

Two mechanisms drive this shift. First, [coding agents](../concepts/coding-agent.md) reduce the cost of understanding why legacy code exists. The traditional protection of long-standing software relies on an information asymmetry: the codebase embeds years of accumulated decisions, edge-case handling, and implicit contracts that would take a new team months or years to reconstruct. When an agent can explore a legacy codebase without fatigue and surface these embedded decisions on demand, the Chesterton's fence argument - that you should understand why something exists before removing it - loses much of its practical force because understanding becomes cheap.

Second, full rewrites become feasible where humans would have given up. Rewriting a codebase in a new language, restructuring it from first principles, or carefully migrating it component by component are tasks that scale with codebase size in ways that exhaust human teams. Agents face no such limit, making rewrites that were previously uneconomical into viable engineering choices. This connects to [dependency-free software](./dependency-free-software.md): when rewriting is cheap, the incentive to preserve existing software for its integration value also weakens.

## Counterarguments

- Unknown unknowns remain unknown. AI can miss undocumented behaviors, implicit contracts between systems, and edge cases that only surface under rare production conditions. A legacy system's survival often reflects not just its code but the accumulated discovery of these edge cases over years of operation - knowledge that may not be visible in the source.
- Legacy software persists for non-code reasons: regulatory requirements, institutional knowledge embedded in operational procedures, integration contracts with external systems, and organizational inertia. A rewrite does not automatically inherit regulatory certification, vendor agreements, or the operational runbooks built around existing behavior.
- The Lindy effect may weaken for code comprehension cost while persisting for organizational and ecosystem reasons. The bottleneck to replacing legacy software is often not understanding it but coordinating the replacement across teams, contracts, and processes.

## Confidence

**Low.** The mechanism - cheaper understanding and rewriting via coding agents - is real and already observable. However, the thesis understates the non-code reasons legacy software persists: regulatory, organizational, and ecosystem factors that coding agents do not address. The Lindy effect weakens for the technical dimension of legacy software but likely holds for the institutional dimension.

## External references

- <https://x.com/Thom_Wolf/status/2023387043967959138>
