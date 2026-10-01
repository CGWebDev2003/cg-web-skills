# Engineering quality: design system, accessibility, performance, SEO, architecture

Design quality includes what happens in the browser. This reference covers the system that keeps the design consistent and the baseline checks every site must pass. For deep work, hand off to the sibling skills: `cg-web-accessibility`, `cg-web-lighthouse-optimizer`, `cg-web-seo` and `cg-web-geo`.

## 1. Design system and tokens

Before building many pages or components, establish reusable rules. Record them in `DESIGN.md` (see `project-files.md`).

A lightweight project-specific system contains:

- colour tokens (primitives plus semantic roles, see `color.md`);
- typography tokens (roles, scale, line heights, see `typography.md`);
- spacing scale and container widths (see `layout-and-responsive.md`);
- breakpoints chosen from content;
- radii, borders and elevation (see `surfaces-and-details.md`);
- z-index layers where required;
- motion durations and easings (see `interaction-and-motion.md`);
- component states.

Don't over-systematise early. Tokenise repeated decisions, not every one-off. When the same value appears in three places, it's a token; when it appears once, it's a decision.

### Components

Components have a clear semantic purpose, predictable variants, responsive behaviour, accessible states, support for real content and sensible behaviour with long and short content. Don't use a component merely because a library provides it. When polishing, classify drift before fixing it:

- **missing token:** the system needs a reusable value;
- **one-off implementation:** an existing shared component should replace it;
- **conceptual mismatch:** the flow or hierarchy differs from comparable areas;
- **local defect:** the implementation is simply incomplete.

Fix the cause at the narrowest correct level.

## 2. Accessibility

Treat WCAG 2.2 AA as the baseline unless the project needs more. In Germany and the EU, the BFSG and EN 301 549 may make it a legal requirement.

### Semantic structure

- Correct HTML elements, one `h1`, logical heading hierarchy, meaningful landmarks (`header`, `nav`, `main`, `footer`).
- Real `<button>` and `<a>` elements instead of clickable `<div>`s.
- Labelled form fields, useful link text, a skip link.

### Keyboard

- Everything interactive is reachable and operable by keyboard, in a sensible order, with no traps.
- Visible `:focus-visible` styles everywhere (see `surfaces-and-details.md`).
- Dialogs move focus in, trap it while open, close on Escape and return focus to the trigger. Use the native `<dialog>` element where possible.
- Focused elements are not hidden behind sticky headers (WCAG 2.2 Focus Not Obscured).

### Visual

- Contrast as in `color.md`; information never conveyed by colour alone.
- Text remains usable at 200 % zoom; content reflows at 320px width without two-dimensional scrolling.
- Respect increased text spacing and `forced-colors` mode.

### Interaction

- Targets at least 24×24px (WCAG 2.2), preferably 44×44px on touch.
- Hover-only information has a keyboard and touch equivalent.
- Drag interactions have a single-pointer alternative.
- `prefers-reduced-motion` is respected; nothing flashes more than three times per second.

### Media

- Meaningful alt text; decorative images with empty `alt=""`.
- Captions and transcripts for video and audio; no autoplaying sound.

Never claim WCAG compliance without testing the relevant success criteria. Automated tools catch only part of the problems; add a keyboard pass, a zoom pass and a screen-reader spot check.

## 3. Performance

Performance is part of design quality. Aim for good field results on mobile, measured at the 75th percentile:

| Metric | Good |
| --- | --- |
| LCP (Largest Contentful Paint) | ≤ 2.5 s |
| INP (Interaction to Next Paint) | ≤ 200 ms |
| CLS (Cumulative Layout Shift) | ≤ 0.1 |

Rules:

- Serve images at the right size and in modern formats (AVIF/WebP) with `srcset` and `sizes`; reserve their dimensions.
- Never lazy-load the LCP image; give it `fetchpriority="high"`. Lazy-load below-the-fold media.
- Minimise JavaScript; avoid client-side rendering for static content.
- Reduce render-blocking resources; preload only genuinely critical files.
- Load fonts carefully (see `typography.md`).
- Avoid unnecessary third-party scripts; load the necessary ones late and with consent.
- Test the production build on realistic mobile hardware and network conditions, not only localhost.

Don't add a library for an effect CSS or a little code can handle.

## 4. SEO and findability

SEO starts in information architecture and content, not at the end. Validate:

- unique, descriptive page titles and useful meta descriptions;
- a logical heading structure and readable URLs;
- descriptive link text and crawlable internal links;
- canonical handling, `sitemap.xml` and `robots.txt` where appropriate;
- structured data only where it truly describes the content;
- indexability of important pages, and `noindex` where intended;
- `lang`, `hreflang` for multilingual sites, Open Graph and social previews.

Write for users first. Avoid search-engine-first copy.

## 5. Technical architecture

Choose technology for the project, not for fashion. Before implementation define the framework and runtime, rendering strategy (static where possible), data model, CMS or content source, integrations, form handling, authentication if needed, analytics (with consent), deployment, environment variables and secrets, caching, error handling, monitoring, and a backup or rollback plan.

Prefer the simplest architecture that meets the real requirements. Avoid lock-in that gives no user or business benefit.

## 6. Build in vertical slices

Don't build thirty polished components before one real user journey works. Build in slices:

1. Homepage or primary entry path
2. Primary conversion flow
3. Core supporting pages
4. Secondary states and edge cases
5. Remaining content and templates

After each slice: run it, inspect it visually, test the interactions, test responsive behaviour and fix defects before expanding the surface area (see "Verify in bounded passes" in `SKILL.md`).

## 7. Prototype and user testing

When the risk justifies it, test before production polish, with the lightest prototype that answers the question: a sketch for concept, a wireframe for structure, a clickable prototype for flow, a coded prototype for real interaction and performance.

Test tasks, not taste:

- Where would you click to find X?
- What do you think this company offers?
- What would you do next?
- What would make you hesitate?
- Can you find the pricing, contact or booking information?
- What do you expect to happen when you click this?

Don't rely on "Do you like this?". Record observed behaviour and uncertainty.
