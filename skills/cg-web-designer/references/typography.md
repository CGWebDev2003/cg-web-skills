# Typography

Typography carries information, hierarchy and voice. On most websites it is the single largest design decision. Improve it inside the established visual world; replacing families changes the identity and belongs to `design-direction.md`.

## 1. Assess before changing

Answer each question with a file, selector or computed value, not an impression:

- **Authority and fit:** which faces, weights and roles exist? Do they fit the product and its world, or are they unexamined defaults? Is every family necessary?
- **Hierarchy:** can heading, body, label, metadata and data roles be told apart at a glance? Are any adjacent sizes or weights too close to carry different jobs?
- **Scale:** is there a deliberate role scale, or a collection of arbitrary values? Do repeated roles stay identical across pages and states?
- **Reading:** is body copy within 45–75 characters per line? Are line height, paragraph rhythm, contrast and tracking tuned to the actual face and width?
- **Stress:** what happens with long headings, German compound words, translation, 200 % zoom, narrow containers, missing weights and font fallback?
- **Delivery:** are only used files loaded? Do fallbacks and loading avoid invisible text and layout shift?

## 2. Set the system

Before editing, write down the roles the site needs, the contrast between them, the reading measure and density, the authoritative faces and weights, and any performance or localisation constraints.

Use the fewest roles and families that make the hierarchy unmistakable. Combine size, weight, spacing and colour deliberately instead of asking size alone to do all the work. Name tokens by role (`--text-display`, `--text-body`, `--text-meta`), not by value.

### Choosing faces

- Choose from the subject's world, not from the model's habits. Typefaces have histories (industrial grotesques, humanist book faces, Swiss modernism, engraving, signage, typewriters); use the history that fits.
- Avoid the defaults listed in `anti-slop.md` unless the brief or brand requires them.
- One family with a good range of weights is often enough. Add a second only for a role it alone can perform (display voice, long-form reading, data).
- Self-host the chosen files. A missing face is not replaced with "the closest installed font"; source a real one.

### Scale and role guidelines

- Body text at 16px (1rem) as the ordinary web floor. Smaller only for a justified dense role.
- Display sizes on Persuade and Experience surfaces may scale fluidly with `clamp()`. Keep Operate and Read surfaces spatially predictable.
- Keep display sizes at or below roughly 6rem unless the composition is built around it.
- Tracking: tighten large display text slightly (−0.01 to −0.03em usually reads best; stop at −0.04em). Loosen small uppercase labels slightly. Leave body tracking at 0.
- Line height falls as size rises: roughly 1.5–1.7 for body, 1.1–1.25 for large headings. Wider lines need more leading.
- Light text on dark surfaces needs compensation on three axes: a touch more line height, slightly more tracking and, if the face needs it, one weight step heavier.
- Use paragraph spacing *or* first-line indents for paragraph rhythm, not both.

## 3. Rendering details

These small details make text feel finished. Express them in the project's styling system (plain CSS, Tailwind or CSS-in-JS); never add a second system for a polish fix.

### Wrapping

- Headings and short text: `text-wrap: balance`. It evens out line lengths and avoids a single orphaned word. Browsers only balance short blocks (around six lines in Chromium), so it is wasted on paragraphs.
- Paragraphs, captions, list items and descriptions: `text-wrap: pretty`, which prevents a lonely last word without equalising lines.
- Very long text and code: leave the default.
- Use `hyphens: auto` with a correct `lang` attribute for narrow German columns, and check long compound words and URLs at the narrowest width (`overflow-wrap: anywhere` as a safety net).

### Numerals

- `font-variant-numeric: tabular-nums` for anything that updates or aligns: prices that change, counters, timers, table columns, dashboards. It stops layout from jittering.
- Keep proportional numerals for static display numbers, phone numbers, postcodes and version strings.
- Some faces change the shape of the `1` with tabular figures. Check it looks right.
- Use lining or old-style figures, small caps and ligatures deliberately when the face offers them and the content benefits.

### Smoothing

On macOS, text renders heavier than designed. Apply smoothing once at the root, not per element:

```css
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

Other platforms ignore it. It does not replace choosing the right weight.

### Links

Set `text-underline-offset` and `text-decoration-thickness` deliberately so underlines clear descenders and match the weight of the text.

## 4. Loading

- Load only the families, weights, styles and subsets actually used. Variable fonts can replace many static files.
- Use `font-display: swap` (or `optional` for non-critical faces) and preload only the one or two files needed for the first viewport.
- Provide metric-compatible fallbacks (`size-adjust`, `ascent-override`) so the swap does not shift the layout.
- Never block text rendering on a web font.

## 5. Verify

- Primary, secondary, body and metadata roles are recognisable without reading the words.
- Long text stays comfortable across widths and languages.
- The typography belongs to the product and its world.
- Loading causes no invisible text or disruptive reflow.
- Zoom, text scaling, focus and contrast still work.

Answer each point with rendered or source evidence, not a bare "yes".
