# AI-Favored Programming Languages

The idea that AI as the primary code producer shifts programming language selection criteria from human ergonomics toward formal properties - strong type systems, verifiability, and performance - and may ultimately favor languages that look nothing like what humans converged on.

## Details

Programming language adoption has historically been driven by human psychology and social dynamics: ease of learning, simplicity of writing correct code, community size, ecosystem breadth, and how welcoming a community is to newcomers. These factors shaped which languages grew fastest and which ecosystems became dominant. Fundamental properties like provable correctness, formal verification, and the balance between dynamic and static checking mattered, but were secondary to human adoption dynamics.

As [coding agents](../concepts/coding-agent.md) write an increasing share of production code, this balance shifts. Languages with strong type systems and formal verifiability become more attractive because they suit LLMs' strengths: type checkers and compilers provide immediate, structured feedback that functions as a reinforcement learning signal, and formal properties constrain the output space in ways that reduce hallucination risk. Languages that are harder for humans to learn but offer stronger correctness guarantees - Rust, Haskell, dependently typed languages - face fewer adoption barriers when the primary author is a machine.

A separate axis favors languages based on runtime concurrency properties rather than type system strength. When the primary challenge is running thousands of concurrent, long-lived, failure-prone [agent](../concepts/agent.md) sessions, process isolation, supervision trees, preemptive scheduling, and fault tolerance become the dominant selection criteria. Erlang/Elixir (BEAM VM) is the canonical example - designed for telecom workloads with requirements nearly identical to [multi-agent systems](../concepts/multi-agent-system.md).

In the longer term, AI may not share the tradeoffs that shaped human language design: expressiveness vs. simplicity, safety vs. control, performance vs. abstraction, compile time vs. runtime, explicitness vs. conciseness. An optimal LLM programming language could diverge significantly from human-designed languages, potentially optimizing for machine verifiability, token efficiency, or properties humans never prioritized. The reasons to create new programming languages would shift from human productivity to machine productivity.

## Counterarguments

- Current evidence (2026) shows LLMs performing best on languages with the most training data (Python, TypeScript) rather than the most formally verifiable (Rust, Haskell, Idris). Training data volume may matter more than formal properties for LLM code generation quality, and this advantage compounds: more usage generates more training data.
- AI-generated code still needs human review, debugging, and maintenance in most workflows. Human readability remains a hard constraint as long as humans are in the loop, limiting how far language design can diverge from human ergonomics.
- New languages face a bootstrapping problem: LLMs need training data in the language to generate it well, but training data requires an existing ecosystem of code written in that language. A language designed purely for LLMs would lack this ecosystem initially.
- Ecosystem network effects - tooling, libraries, CI/CD integrations, and hiring pipelines - create switching costs that dominate language choice even when the primary author is a machine. An agent writing Rust still needs the Rust ecosystem (crates, build tooling, deployment infrastructure) to be healthy.

## Confidence

**Low.** The near-term claim about strongly typed languages contradicts current evidence of LLM performance correlating with training data volume rather than type system strength. The long-term claim about novel LLM-optimized languages is highly speculative and faces the bootstrapping problem. The underlying logic - that removing human factors from adoption changes which properties dominate - is sound, but the specific predictions are unsubstantiated.

## External references

- <https://x.com/Thom_Wolf/status/2023387043967959138>
