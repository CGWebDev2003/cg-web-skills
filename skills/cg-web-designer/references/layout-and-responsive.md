# Layout, spacing and responsive design

Layout turns priority into reading order, grouping, rhythm and usable space. Diagnose the structural problem before moving boxes around.

## 1. Assess

Answer each question with rendered or source evidence:

- **Reading order (squint test):** blur your eyes or the screenshot. Can you still identify the primary element, the secondary element and the major groups, in order?
- **Grouping:** are related items close and distinct groups clearly separated, or are borders and cards compensating for weak proximity?
- **Rhythm:** do tight and generous intervals create a cadence, or is one spacing value repeated until everything weighs the same?
- **Structure:** does the topology match the content? Are repeated cards or columns really equivalent content, or a framework default?
- **Density:** does the amount of information per region fit the visitor mode and how often people use it?
- **Adaptation:** at narrow, intermediate, wide, zoomed and translated states, what reorders, collapses, wraps or scrolls? Do DOM order and focus order still match the visual order?
- **Extremes:** do long content, empty states, overlays, sticky elements, safe areas and small touch targets break anything?

## 2. Set the spatial thesis

Before editing, name the primary reading or task path, what belongs together and what must separate, what leads and what supports, the intended density and rhythm, and how the structure changes across containers and viewports. Then choose the simplest structural model that expresses those relationships.

## 3. Apply

- **Group by meaning.** Use proximity before adding containers, borders or backgrounds.
- **Create rhythm through contrast** between tight and generous intervals. More space above a heading than below it, so the heading belongs to what follows.
- **Use a documented spacing scale.** A 4px base gives useful small steps that an 8-only scale misses (4, 8, 12, 16, 24, 32, 48, 64, 96, 128). Name tokens semantically when they encode a role (`--space-section`, `--space-stack`).
- **Let hierarchy follow priority**, not framework defaults. Do not give equal visual weight to everything.
- **Vary composition only where content changes.** Repetition supports recognition; break it when the content or priority changes, not to look interesting.
- **Use asymmetry, overlap, large negative space or unusual composition** only when it strengthens the design concept.
- **Prefer `gap`** for sibling rhythm, and container queries for components that appear in different contexts.
- **Keep depth for meaning.** Use elevation only to clarify state or hierarchy.
- **Correct optically** after inspecting the rendered result (see `surfaces-and-details.md`).

### Visual hierarchy

Use scale, contrast, balance, spacing and Gestalt principles to guide attention. The first screen must make the site's purpose understandable without decoding. Every page should have an identifiable primary message, supporting explanation, proof and next action.

### Images and icons in layout

Images are content, not decoration. Don't place a generic image to "break up text"; it must reinforce understanding, trust, emotion or brand. Use icons only when they clarify meaning; avoid icon + heading + two lines as the default for every feature.

## 4. Responsive design

Design mobile as its own composition, not a compressed desktop. Use mobile-first thinking where it helps, and choose breakpoints where the *content* needs to change, not at popular device widths.

Test at least: narrow mobile (320–360px), normal mobile (390–430px), tablet or compact laptop, desktop, and large desktop where relevant. Also test 200 % zoom and 400 % reflow.

Check at each size:

- content order and what is hidden or revealed;
- navigation behaviour and CTA reachability (thumb zone on phones);
- line wrapping, long words and URLs, headings that break badly;
- image crops and art direction (`<picture>` with different crops when the subject would be cut off);
- touch targets (see `surfaces-and-details.md`);
- horizontal overflow, tables, forms and code blocks;
- sticky or fixed elements eating the viewport, safe areas on notched devices;
- dynamic content and focus visibility.

Make responsive behaviour structural: reorder, collapse, reflow or reveal based on what remains important, not just shrink.

## 5. Verify

- The squint test still reveals the primary, secondary and major groups at every size.
- Related content groups naturally; unrelated content does not blur together.
- Spacing has a deliberate rhythm.
- Density matches the visitor mode.
- Long text, empty states, translation, zoom and dynamic content do not break the structure.
- Keyboard, touch and assistive-technology order match the visual order.
