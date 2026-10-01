# Design direction

This is the primary anti-generic phase. Its output is a written **Design Direction Brief** that the client approves before implementation, and that later becomes `DESIGN.md` (see `project-files.md`).

## 1. Decide what is already true

Before inventing anything, read the existing site, code, tokens, components, brand assets and any `DESIGN.md`.

- **Established world:** a coherent identity already exists in code or brand material. Inherit it. A missing `DESIGN.md` does not make a project greenfield; document the existing identity instead of replacing it.
- **Incomplete brand:** a logo and a colour but no system. Keep the confirmed assets and recognisable traits, and expand the system with the client.
- **Redesign:** keep product truth, content, function, constraints and explicit brand commitments. Replace the visual world rather than polishing it. The old look tells you what the subject is, not what it must become.
- **No visual authority:** create a new world with the client.

A section, component or state inside an established site inherits that site. Never turn a local addition into a new identity exercise.

## 2. Find the world before choosing the style

Generic design comes from choosing a style first ("minimal", "bold", "editorial") and then pouring the content into it. Derive the visual world from the subject instead.

1. **Name the essentials.** In one sentence each: the product's unique mechanism, the audience's real scene (who, where, under what light, in what mood), its cultural home, and what this first surface must prove.
2. **Name the rut.** Write down the page this category always ships (the SaaS gradient hero, the law firm in navy and gold, the architect in white space and thin grey sans) and its predictable opposite. Both are off the candidate list by default.
3. **List seven candidates from the audience's world.** Concrete visual systems, artefacts, places or rituals the audience knows by heart: their printed matter, signage, tools, publications, notation, data graphics, identity programmes, buildings, materials, the way their world looked before the web. One line each on why it resonates and how it could carry the product's message.
   - Count near-duplicates once.
   - If more than three candidates come from the same material family, you stopped at the most obvious artefact; keep digging until the list spans at least three families.
   - A brief that paints its own picture (a product name, a governing metaphor) may spend at most one candidate on its literal reading.
   - On Operate and Read surfaces, do not turn the audience's tools into a costume. A terminal look for a developer tool or a control-panel look for an engineering firm is the obvious costume, not a world.
4. **Turn the strongest candidates into complete directions.** Each joins a reusable visual world to a concrete first viewport.
5. **Present one direction fully committed, plus one or two real alternatives.** For each: thesis, palette, type character, materials, first viewport, signature interaction and an honest risk. Always also offer the quiet standing exit: the category standard, done well. Never recommend it yourself, but when the client chooses it, execute convention at full craft, measured against two or three named products it should sit alongside.

The client's choice and any pinned constraints always beat your ranking. If a pinned brand colour or font collides with a direction, translate the direction around the constraint and say so.

## 3. The Design Direction Brief

### Aesthetic thesis

One paragraph: what the site visually communicates and why it fits the subject.

### 3–5 design adjectives

Concrete and non-generic.

- Bad: *modern, clean, premium*
- Better: *industrial precision, quiet confidence, engineered, tactile, editorial*

### Visual source material

Where the language comes from: materials, architecture, tools, environment, industry typography, photography style, product geometry, cultural and historical references, physical artefacts, existing brand assets.

### Composition

Primary alignment, grid approach, column behaviour, density, whitespace strategy, image treatment, overlap and layering rules, the focal point, and one unusual but purposeful composition choice.

### Typography

Display and body families, weights, type scale, line height, tracking, maximum line length and casing rules. Details in `typography.md`. Avoid choosing a common font merely because it is the default. If a brand font is mandatory, use it.

### Colour

Four to six named roles: background, primary text, secondary text, brand, accent and utility surfaces. Light or dark is chosen from the use scene, not from the category. Details in `color.md`.

### Shape language

Radius philosophy, border philosophy, shadow philosophy, surface treatment and icon style. Do not put the same large radius on every component. Details in `surfaces-and-details.md`.

### Motion

Prominent or restrained, the one signature motion moment, hover and press behaviour, scroll behaviour and the reduced-motion path. Details in `interaction-and-motion.md`.

### Imagery

Subject treatment, crop rules, aspect ratios, lighting, colour treatment, art direction, illustration style and image priority. Prefer real client assets when they strengthen authenticity. Do not replace genuine photography, product renders or important brand material with generic AI imagery without a deliberate reason and explicit approval.

### First viewport

Describe exactly what the visitor sees before scrolling on desktop and on mobile: the message, the focal element, the action, and what of the next section peeks in.

## 4. Anti-default review

Before coding, challenge the brief:

> If another developer received the same vague prompt, would they plausibly generate something similar?

If yes, find the decisions that are still generic and replace them with project-specific ones. Then run the checklist in `anti-slop.md`.

Remember the opposite failure too: a minimal website can be completely original when its typography, content hierarchy, imagery, spacing and composition are clearly derived from the subject. The goal is **specificity, restraint and rationale**, not strangeness.

## 5. Direction gate

Proceed to the design system and visual design only when the brief is written, derived from the subject, approved (or its assumptions are labelled) and survives the anti-default review.
