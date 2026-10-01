# Colour

Colour does three jobs: hierarchy (where to look), meaning (state and action) and atmosphere (the world). A palette is a set of roles, not a bag of swatches. Preserve confirmed brand and semantic conventions; replacing the identity under the guise of "adding colour" belongs to `design-direction.md`.

## 1. Audit before choosing

Read `DESIGN.md`, tokens, brand assets, existing themes and representative states. Identify:

- which colours are confirmed brand commitments;
- the current surface, text, action and semantic roles;
- where greyscale hides hierarchy or state;
- contrast failures and information conveyed by colour alone;
- light/dark and data-visualisation requirements.

## 2. Choose a strategy

Name the emotional temperature, the dominant colour relationship, the contrast range and the dosage before editing. The strategy may be restrained or immersive; it follows the brief and the visual world, not a fixed percentage rule.

- **Persuade and Experience:** colour may carry the voice and own large regions.
- **Operate and Read:** colour mainly encodes action, selection, status and wayfinding. Rarity gives an accent its force.

Choose hues from the product's meaning and its world, never from category clichés (blue for trust, green for eco, purple for AI).

Pick light or dark from the use scene: who uses the site, where, and under what light. A restaurant's evening menu and a building-services firm's on-site spec sheet want different answers.

## 3. Build roles

At minimum:

- canvas and elevated surfaces;
- primary and secondary text;
- action, focus and selection;
- borders and separators;
- success, warning, error and information;
- data categories or scales when the site has charts.

Define primitive values once and map semantic tokens onto them. A theme change should remap semantic roles, not edit components.

### Working in OKLCH

For new web palettes, prefer `oklch()`: lightness and chroma behave predictably, so ramps and dark themes are easier to tune.

- Build ramps by varying lightness, and reduce chroma towards white and black; very saturated near-whites and near-blacks look wrong.
- Tint neutrals slightly toward the brand hue when it creates cohesion. Neutral grey is still valid when it serves the world.
- Prefer explicit colours over stacks of translucent overlays when transparency would make contrast depend on what sits beneath.

## 4. Apply at system scale

- Let the strongest colour own a deliberate region or role instead of scattering small accents.
- Keep the primary action easy to find; don't spend its colour on decoration.
- On coloured surfaces, derive secondary text from the surface or foreground hue. Never put generic grey text on a coloured background.
- Keep semantic meanings consistent while respecting domain conventions.
- In charts, use lightness, shape, labels or patterns as well as hue so colour is never the only code.
- In dark mode, compose surface elevation and contrast deliberately (lighter surfaces for higher elevation). Never mechanically invert the light theme.
- Theme the browser surfaces too: `::selection`, `accent-color` for native controls, `caret-color`, focus rings and scrollbars where appropriate (see `surfaces-and-details.md`).

## 5. Contrast

Verify computed foreground/background pairs, not impressions:

| Content | WCAG 2.2 AA minimum |
| --- | --- |
| Body text | 4.5:1 |
| Large text (≥ 24px, or ≥ 18.66px bold) | 3:1 |
| UI components, icons, focus indicators | 3:1 |

Check every interactive state, overlays, text on images, disabled content and both themes. Simulate common colour-vision deficiencies. Information conveyed by colour also needs text, shape, icon or position.

## 6. Verify

- Every colour has a stable role or a world-specific atmospheric purpose.
- Attention lands on the intended action, content or state.
- The palette works in quiet, dense, interactive, error and empty states.
- Light and dark themes are each composed, not inverted.
- Contrast and non-colour cues pass in every state.
- The result is recognisably this product, not a generic "colourful" treatment.
