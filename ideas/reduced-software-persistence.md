# Reduced Software Persistence

Reduced software persistence is the idea that [coding agents](../concepts/coding-agent.md) weaken both the economic case for preserving existing software - libraries and legacy systems alike - and the practical barriers to replacing it, by making code comprehension, generation, and rewriting cheap.

## Details

### Weakened Lindy effect

The Lindy effect for software - the principle that long-surviving codebases will continue to survive because replacement cost is prohibitively high - weakens when coding agents can cheaply explore, understand, and rewrite large codebases. The traditional protection of long-standing software relies on an information asymmetry: the codebase embeds years of accumulated decisions, edge-case handling, and implicit contracts that would take a new team months or years to reconstruct. When an agent can explore a legacy codebase without fatigue and surface these embedded decisions on demand, the Chesterton's fence argument loses much of its practical force because understanding becomes cheap.

Full rewrites also become feasible where humans would have given up. Rewriting a codebase in a new language, restructuring it from first principles, or migrating it component by component are tasks that scale with codebase size in ways that exhaust human teams. Agents face no such limit, making rewrites that were previously uneconomical into viable engineering choices.

### Dependency-free software

The same cost collapse applies to library dependencies. When [coding agents](../concepts/coding-agent.md) - both [local](../example-systems/local-coding-agent.md) and [cloud](../example-systems/cloud-coding-agent.md) - can produce working implementations at negligible cost, the economic rationale for importing a library weakens. Generated implementations offer full control (no opaque internals or versioning constraints), tailoring to the exact use case (no unused features or abstraction layers), and elimination of [supply chain](../threats/supply-chain-attack.md) risk. Rather than generating from scratch, agents can also extract the relevant parts from an existing library into standalone code, working from proven implementations rather than reimplementing from first principles.

At scale, collapsing dependency trees points toward more self-contained applications with smaller attack surfaces, smaller package sizes, and faster boot times. If this trend materializes broadly, it compounds the disruption described in [open-source restructuring](./open-source-restructuring.md): weakened dependency economics erode the practical reason to maintain shared libraries, reinforcing the erosion of community incentives around shared code.

## Examples

- An agent extracting fp8 training functionality from a large library into 150 lines of standalone code that runs 3% faster than the library version, eliminating the library as a project dependency.
- Replacing a utility library dependency with a handful of purpose-built functions that cover only the specific behaviors the project actually uses.

## Counterarguments

- Unknown unknowns remain unknown. AI can miss undocumented behaviors, implicit contracts between systems, and edge cases that only surface under rare production conditions. A legacy system's survival often reflects not just its code but the accumulated discovery of these edge cases over years of operation - knowledge that may not be visible in the source.
- Legacy software persists for non-code reasons: regulatory requirements, institutional knowledge embedded in operational procedures, integration contracts with external systems, and organizational inertia. A rewrite does not automatically inherit regulatory certification, vendor agreements, or the operational runbooks built around existing behavior. The Lindy effect may weaken for code comprehension cost while persisting for organizational and ecosystem reasons.
- Library maintainers continuously fix bugs, patch security vulnerabilities, and adapt to upstream changes. Generated code freezes at a point in time and shifts the maintenance burden entirely to the project owner, who may not notice when the original library addresses a critical issue.
- Widespread adoption of dependency-free software fragments the ecosystem: instead of one well-tested library with thousands of users finding bugs, there are thousands of bespoke implementations each tested only against their own narrow use case.
- Productized services - the same kind of software built repeatedly for many customers around shared domain concepts - invert the economics. A shared library encapsulates domain logic once and propagates fixes across every customer project, while bespoke generated code must be patched, audited, and evolved independently in each instance.

## Confidence

**Low.** The underlying mechanism - cheaper understanding, generation, and rewriting via coding agents - is real and already observable. However, the thesis understates both the non-code reasons legacy software persists (regulatory, organizational, ecosystem factors) and the maintenance burden of dependency-free code (frozen implementations, ecosystem fragmentation, inverted economics of productized services). The idea holds for isolated utility code and technically straightforward rewrites, but overgeneralizes from those narrow cases.

## External references

- <https://x.com/karpathy/status/2021633574089416993>
- <https://x.com/Thom_Wolf/status/2023387043967959138>
