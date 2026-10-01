# Anti-slop rules

AI-generated websites share a recognisable family of defaults. Treat them as warning signs, not universal prohibitions: a style is fine when it is chosen on purpose and justified by the brand or the brief. Reaching for one of these when the decision was free means you were not deciding. When you catch one, rewrite the element; don't just soften it.

Load this before writing UI code and again in every review.

## Hard bans

These have no good default use. Only an explicit client brief earns them back, and even then question it once.

- **Eyebrow labels above every section heading.** The small tracked-out uppercase kicker ("OUR SERVICES", "WHY US") above each H2. The heading should carry its own weight; delete the label.
- **Gradient text** for emphasis. Emphasis comes from weight, size or position.
- **Coloured side-stripe borders** thicker than 1px on cards, list items, callouts or alerts (`border-left: 4px solid var(--accent)`) as a decoration.
- **Nested cards.** A card inside a card is always a structural mistake.
- **Fabricated proof.** Invented testimonials, customers, logos, metrics, team members or awards.
- **Emoji or Unicode glyphs as an icon system.** Icons are drawn from one real library or authored SVG, in one consistent stroke.

## High-risk defaults

### Layout

- A centred hero with headline, subheading and two buttons as the automatic opening composition.
- The hero-metric template: big number, small label, supporting stats, accent colour.
- Three identical feature cards, or repeated 2/3/4-column card grids of icon + heading + two lines of text as the page structure.
- Bento grids used because they look fashionable.
- Every section enclosed in a rounded card; identical section templates repeated down the page.
- Dashboard-like blocks on marketing sites.
- Section numbers (01 / 02 / 03) when the sequence carries no information.
- "Logo row → features → testimonials → pricing → CTA" without a strategic reason.
- A modal for a task that needs neither interruption nor protected focus.

### Styling

- Purple-to-blue gradients, neon glows or zero-offset coloured halos without a subject rationale.
- Glassmorphism and backdrop blur as a substitute for visual direction.
- One large border radius on everything; pill shapes as the universal container.
- Soft grey shadows under every component; a 1px border *and* a wide soft shadow on the same card (the "ghost card").
- Hard offset shadows (`4px 4px 0`) outside a genuinely neo-brutalist world.
- Decorative stripes, grid-paper or noise backgrounds that are not tied to a real canvas, map, blueprint or material in the subject's world.
- The generic black-and-white SaaS palette, or pure `#000`/`#fff` grey ramps chosen by habit.
- Grey text on coloured backgrounds.
- An accent colour sprinkled on random words.
- Light or dark theme picked by category ("tech is dark") instead of by the use scene.

### Typography

- Inter, Arial, Roboto, Space Grotesk or another familiar face used only because it is available.
- A system display face (Arial Black, Impact, the platform sans) as the voice of a branded page.
- An oversized geometric sans headline with no typographic concept.
- Fake "editorial" made of rules, eyebrows and dense metadata.
- One accented word in every headline.
- Monospace as a costume for "technical" instead of for code, data or measurement.
- An arrow character appended to every link and button.

### Components

- Pill buttons as the universal CTA; giant floating CTA pills.
- Identical icon circles or rounded-square icon tiles above every feature.
- Generic sparkle or star icons for "AI" or "quality".
- Stock avatars in identical circular frames.
- Sparklines, progress rings and soft rounded rectangles standing in for content.
- FAQ accordions added just to fill the page.
- Geometric masks (circles, blobs, radial cut-outs) approximating a photographic subject's contour instead of a real cut-out.
- Sketch-style SVG illustrations and doodles pretending to be illustration. Crisp vector geometry, diagrams and real illustration are fine.

### Motion

- Every section fading or sliding up on scroll.
- Every card scaling or lifting on hover; images zooming on hover when the image is not the action.
- Decorative parallax without narrative purpose.
- Several simultaneous entrance effects; staggered entrances on every list.
- Animations that delay access to content, or that hide content when JavaScript fails.
- Bounce and elastic easing used by reflex.
- Motion that breaks or vanishes on mobile.

### Copy

- Vague benefit language: "empowering", "revolutionising", "seamless", "innovative", "unlock", "elevate", "future-ready" without specifics.
- Paragraphs that could describe any company.
- Generic statistics and repeated marketing adjectives.
- "Get started" when a more specific action exists.
- Naming a concept and then winking at it ("No fluff. Just results.").

### Technical

- Excessive client-side JavaScript for static content; animation libraries for effects CSS can do.
- Giant component trees with little semantic structure; every element a `<div>`.
- Inaccessible custom controls.
- Browser defaults left on selection colour, focus rings, scrollbars and numerals.
- Hard-coded placeholder content, unused CSS and dead components.
- Broken links or forms because only the visual layer was tested.

## Do not replace one cliché with another

"Anti-slop" does not mean brutalism everywhere, editorial grids everywhere, unusual fonts everywhere, asymmetry everywhere, animation everywhere or maximalism everywhere. Randomness is not personality, and an anti-slop look applied to every project becomes the next template.

The goal is **specificity + restraint + rationale**.

## Quick self-check

Before showing work, answer honestly:

1. Could this page belong to a completely different company after swapping the logo and copy?
2. Which three decisions here would another model also have made from the same prompt? Are they justified or merely default?
3. Is there one clear, memorable design idea, or ten competing tricks?
4. If I delete every eyebrow label, every gradient, every card wrapper and every scroll animation, does the page get worse? If not, delete them.

The full final audit is in `qa-launch-handoff.md`.
