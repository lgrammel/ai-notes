# Skill Leveling

Skill leveling is the observed effect where AI assistance disproportionately boosts lower-performing workers, compressing the performance distribution toward the top. The result is that individual skill differences matter less for tasks inside the AI's capability boundary, shifting what organizations need to select and develop for.

## Details

A 2023 BCG experiment with 758 consultants found that bottom-half performers improved by 43% when using GPT-4, while top performers improved less. The mechanism is straightforward: AI provides a performance floor by handling the subtasks where less-skilled workers struggle most - structured analysis, clear writing, comprehensive enumeration - while top performers already execute these competently and gain less marginal benefit. For tasks inside the [jagged frontier](./jagged-frontier.md), the gap between a junior and senior practitioner narrows because the AI compensates for exactly the skills the junior lacks.

The organizational implications are significant. If implementation skill is compressed, the differentiating skills shift toward problem decomposition, output evaluation, and architectural judgment - the capabilities described by [supervisory engineering](./supervisory-engineering.md). Hiring and development strategies that optimize for raw implementation ability may misallocate investment when AI handles the execution layer; the scarce resource becomes the ability to direct AI effectively and recognize when its output is wrong. This creates a tension with [cognitive debt](./cognitive-debt.md): leveled-up performance may come with leveled-down understanding, as workers who reach top-tier output via AI assistance may not build the deep mental models that make them effective when AI fails or when tasks fall outside the frontier.

A partial historical parallel is the steam shovel: once mechanized digging existed, differences in manual digging ability stopped mattering - though digging is pure execution, while knowledge work involves judgment that resists mechanical substitution. AI is not yet at that threshold for knowledge work, but the compression effect is already measurable for well-defined tasks within the frontier. The open question is whether the effect extends to less-structured domains like software architecture, system design, and cross-cutting technical decisions, where the performance gap between junior and senior practitioners reflects qualitatively different reasoning rather than execution speed.

## Counterarguments

- The BCG study tested consulting tasks (market analysis, writing, idea generation), not engineering. Skill compression may not hold for deep technical domains where the gap between junior and senior practitioners reflects fundamentally different mental models rather than execution proficiency - architecting a distributed system is qualitatively different from writing a market analysis, and AI may not compress that gap the same way.
- Top performers may retain a durable edge in supervisory and architectural work that the study did not measure. The study evaluated task-level output quality, not the ability to decompose ambiguous problems, sequence work, or recognize subtle errors in AI output - skills where the gap between experienced and inexperienced practitioners may widen rather than narrow with AI adoption.
- If AI levels everyone to "good enough" output quality, organizations may under-invest in developing the deep expertise needed for tasks outside the [jagged frontier](./jagged-frontier.md). When the frontier shifts or AI fails on an edge case, the organization discovers it has compressed away the skill diversity it needs to recover.
- Skill leveling measured at the individual task level may not aggregate to organizational leveling. Teams depend on complementary skills, institutional knowledge, and coordination capacity that are not captured by measuring individual output quality on isolated tasks.

## Confidence

**Medium.** The BCG experiment provides strong evidence for the core effect on well-defined knowledge work tasks. Generalizability to AI engineering specifically is unproven, and the effect size likely varies substantially by task type - strongest for execution-heavy tasks inside the frontier, weakest for judgment-heavy tasks that require deep domain models.

## External references

- <https://www.oneusefulthing.org/p/centaurs-and-cyborgs-on-the-jagged>
