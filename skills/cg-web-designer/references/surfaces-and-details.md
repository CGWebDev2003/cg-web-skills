# Surfaces and details

Great interfaces rarely come from one big idea alone. They come from many small details that compound. This reference covers the details that make a page feel built rather than assembled: radii, elevation, images, alignment, hit areas, icons and the browser surfaces nobody draws.

Express every fix in the project's existing styling system (plain CSS, Tailwind, CSS Modules, CSS-in-JS). Never introduce a second styling system to apply a polish fix.

## 1. Shape language

### Choose radii deliberately

Decide a radius philosophy in the design direction: sharp, softly rounded, or round. Then apply it by component size; a large radius on a small control looks like a pill, a small radius on a large panel looks timid. Typical: small controls 4–8px, cards 8–16px, pills only for small controls such as tags and segmented toggles.

### Concentric radii

When rounded surfaces nest, the outer radius equals the inner radius plus the padding between them:

```text
outer radius = inner radius + padding
```

```css
.card       { border-radius: 20px; padding: 8px; }  /* 12 + 8 */
.card-media { border-radius: 12px; }
```

Equal radii on nested surfaces make the inner corner look pinched; this is one of the most common reasons an interface "feels off". When the padding is large (above roughly 24px), the layers read as separate surfaces and each radius can be chosen on its own.

## 2. Elevation: borders or shadows

- **Borders communicate structure:** dividers, table cells, list separators, form inputs (keep them for accessibility), selected and focus states.
- **Shadows communicate elevation:** cards that lift, dropdowns, popovers, dialogs, buttons with depth.
- **Declare elevation once.** A 1px border *and* a wide soft shadow on the same card is the "ghost card" and reads as indecision.
- When a border exists only to separate an element from varied backgrounds, a transparent ring shadow adapts better than a solid border colour.

A layered shadow that reads as a crisp edge plus soft depth:

```css
:root {
  --elevation-1:
    0 0 0 1px oklch(0 0 0 / 0.07),
    0 1px 2px -1px oklch(0 0 0 / 0.08),
    0 3px 6px -2px oklch(0 0 0 / 0.05);
}
@media (prefers-color-scheme: dark) {
  :root { --elevation-1: 0 0 0 1px oklch(1 0 0 / 0.09); }
}
```

In dark mode, layered depth shadows barely show; a faint light ring and a lighter surface carry elevation instead. Real shadows have an offset and a soft blur; a zero-offset coloured glow is decoration, not depth.

## 3. Images

- Reserve space with `width`/`height` or `aspect-ratio` so nothing shifts.
- Give images a very faint inset outline so their edges stay crisp on similar backgrounds: neutral black at about 10 % opacity on light surfaces, neutral white at about 10 % on dark ones, with `outline-offset: -1px` so the size doesn't change. Use pure black or white, not a tinted palette neutral, which reads as dirt on the edge.
- Don't animate images on hover when the image is not the action; give the container the feedback.
- Never use geometric masks to fake a subject's contour. Use a real cut-out or skip the effect.

## 4. Optical alignment

When geometric centring looks wrong, align by eye.

- **Text + icon buttons:** the icon side needs slightly less padding than the text side (about 2px less), or the icon looks pushed away.
- **Play triangles** sit visually left of centre; nudge them right by 1–2px.
- **Asymmetric icons** (stars, arrows, carets): fix the SVG's viewBox or path so components don't need magic margins. Use a margin only as a fallback.
- **Large headings** often need a small negative indent so the first letter's side bearing lines up with body text below.
- **Icons beside text** should centre on the x-height or cap height, not on the line box.

## 5. Hit areas

- WCAG 2.2 requires at least 24×24 CSS px (or enough spacing). Aim for 44×44px on touch and mobile, and at least 40×40px in dense desktop UI.
- If the visible control is smaller (a 20px checkbox, an icon button), extend the hit area with a pseudo-element instead of enlarging the visual:

```css
.icon-button { position: relative; }
.icon-button::after {
  content: "";
  position: absolute;
  inset: 50% auto auto 50%;
  width: 44px;
  height: 44px;
  translate: -50% -50%;
}
```

- Hit areas of two controls must never overlap. If they would, shrink the pseudo-element as far as needed and no further.

## 6. Icons

- **One library or one authored set per site**, one stroke weight, one corner style. Never mix libraries on one surface.
- **Match stroke to the adjacent text weight** on a 24px grid: about 1.5px beside regular text, 2px beside medium or semibold, 2.5px beside bold or as an emphasised standalone icon.
- **Size inline icons from the text**, typically 1em–1.25em, and design at the smallest size they render (often 16px). Use the set's native grid sizes (16, 20, 24) rather than fractional scales.
- **One SVG, recoloured per state.** Draw with `currentColor`, strip hard-coded fills and strokes, and let CSS colour and opacity handle hover, selected and disabled.
- **Outline by default, fill for active.** The selected tab, the toggled bookmark, the liked heart use the filled variant; swap with the icon cross-fade in `interaction-and-motion.md`.
- **Right-to-left:** flip directional icons (back/forward, chevrons, send) and keep logos, checkmarks, clocks and media controls as they are.
- **Accessibility:** icon-only controls need an accessible name; purely decorative icons get `aria-hidden="true"`.

## 7. Browser surfaces

The parts you didn't draw still carry the design. Leaving them on browser defaults is the cheapest tell that a page was assembled rather than built.

- `::selection` background and text colour from the palette.
- Focus rings: a visible, on-brand `:focus-visible` style with enough contrast (3:1) and an offset, on every interactive element. Never remove outlines without a replacement.
- `caret-color` in inputs, `accent-color` for native checkboxes, radios, range and progress.
- Scrollbars inside scrolling panels (`scrollbar-color`, `scrollbar-width`), when the panel is part of the design.
- `text-underline-offset` and decoration thickness for links.
- Tabular numerals in tables and changing numbers (see `typography.md`).
- `color-scheme` set correctly so native form controls and scrollbars match light and dark themes.
- Favicon, app icons, theme colour and social preview images.

## 8. Common mistakes

| Mistake | Fix |
| --- | --- |
| Same radius on parent and child | outer radius = inner radius + padding |
| Icon looks off-centre | Correct optically, ideally in the SVG |
| Border used only to fake depth | Layered transparent shadow; keep structural and state borders |
| Border plus wide soft shadow on one card | Choose one elevation signal |
| Tiny hit areas | Extend with a pseudo-element to 44×44 (touch) or 40×40 (dense desktop) |
| Hairline icon beside bold text | Match stroke to text weight |
| Separate icon files per state | One `currentColor` SVG, states in CSS |
| Filled icons everywhere | Outline default, fill only for the active state |
| Default blue selection and focus rings | Theme them from the palette |
