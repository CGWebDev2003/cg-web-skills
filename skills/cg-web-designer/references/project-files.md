# Project files

Durable project knowledge lives in files, not in the conversation. Later sessions, other skills and other people then start from the truth instead of re-asking or guessing.

Two files matter most and are kept separate on purpose:

- **`PRODUCT.md`** holds product truth: who, why, what, evidence, constraints. It changes rarely.
- **`DESIGN.md`** holds the visual system: the world, tokens, components and rules. It changes when the design changes.

Keep visual decisions out of `PRODUCT.md` and business facts out of `DESIGN.md`. A redesign replaces `DESIGN.md` but keeps `PRODUCT.md`.

Before writing, check whether either file already exists. Update it; never create a competing file or silently overwrite one. Write only confirmed facts, mark open decisions explicitly, and leave out sections that don't apply instead of filling them with generic prose.

## `PRODUCT.md`

```markdown
# Product

## Summary
One sentence: what the company does, for whom.

## Platform and stack
web | framework | CMS | hosting | (or "delegated to designer")

## Users
Primary audience: situation, state of mind, job to be done.
Secondary audiences.

## Purpose and goals
What the website must achieve. Primary conversion. Secondary actions. Success metrics (no invented targets).

## Positioning
What is different and why it matters. Competitive alternatives.
What is uniquely true here.

## Evidence on hand
Verified facts, numbers, references, certifications, testimonials, with their source.
Claims that still need evidence.

## Voice
Words to use. Words to avoid. Tone.

## Brand commitments
Assets, colours, fonts or conventions that must stay. Standing preferences
(for example "keep the category standard look").

## Constraints
Legal, privacy, accessibility (WCAG 2.2 AA, BFSG), performance, technical, deadline.

## Open decisions
Questions not yet answered, with the owner.
```

## `DESIGN.md`

```markdown
# Design

## World
Aesthetic thesis (one paragraph). 3–5 concrete adjectives.
Visual source material: where the language comes from.
Visitor mode per key surface (Persuade / Operate / Read / Experience).

## Composition
Grid, alignment, density, whitespace, image treatment, layering rules,
signature composition choice.

## Typography
Families and sources, weights, role scale (token, size, line height, tracking),
measure, casing rules, numerals.

## Colour
Primitives and semantic roles (token, value, use). Light and dark themes.
Contrast-checked pairs.

## Shape and elevation
Radius scale and rules, border and shadow philosophy, elevation tokens.

## Iconography and imagery
Icon set, stroke weight, sizes. Photo and illustration direction, crops,
aspect ratios.

## Motion
Motion thesis, signature moment, duration and easing tokens, component
patterns, reduced-motion behaviour.

## Components
Shared components, variants and required states.

## Rules
Do and don't for this project, including anti-slop decisions taken
("no eyebrow labels", "cards only for case studies").
```

## Other working documents

For non-trivial projects, keep these when they hold real decisions. Don't create empty documents for ceremony.

```text
01-discovery.md        Discovery Summary
02-strategy.md         Website Strategy
03-content-inventory.md
04-sitemap.md          IA, navigation, naming
05-user-flows.md       Journeys and states
06-wireframes.md
07-design-direction.md Direction brief and the alternatives considered
08-design-system.md    (or DESIGN.md)
09-content.md          Final copy
10-qa.md               Review reports and scores
11-launch.md           Launch checklist and handoff
```

Save review reports (critique scores, audit health scores) in `10-qa.md` with the date, so later reviews can show the trend.
