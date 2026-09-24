---
name: cg-web-deslopifier
description: This skill should be used when the user asks to "remove AI slop", "deslopify a website", "make an AI-generated website look human-designed", "make a vibe-coded website look less AI-generated", "remove the AI look", "fix generic AI web design", "make a Claude Code website look custom", or asks to audit and redesign a website for originality, specificity, visual authorship, or anti-template quality. It applies to AI-generated, AI-assisted, vibe-coded, and heavily component-template-driven websites while preserving the existing brand, product goals, content truth, usability, accessibility, performance, and technical architecture unless change is necessary.
version: 1.0.0
---

# CG Web Deslopifier

## Mission

Transform generic, statistically predictable, AI-associated website output into a specific, intentional, brand-led web experience without replacing one template with another.

Treat AI slop as a **design-convergence problem**, not as proof that AI was used. A single gradient, rounded card, or popular typeface is not evidence of AI generation. Diagnose the **combination, repetition, context, and lack of authorship**.

Optimize for these outcomes:

1. **Specificity** — the page should feel made for this business, audience, offer, place, product, or story.
2. **Authorship** — design decisions should communicate a recognizable point of view.
3. **Hierarchy** — visual emphasis should reflect business and user priorities rather than component symmetry.
4. **Restraint** — remove decoration that has no semantic, brand, or interaction purpose.
5. **Realism** — use credible copy, authentic imagery, real product states, and truthful proof.
6. **Usability** — retain or improve clarity, accessibility, responsive behavior, performance, and interaction quality.
7. **Maintainability** — keep the result coherent in the existing framework and component architecture.

Never interpret “less AI” as “make the site weird.” The objective is **intentional design**, not novelty for novelty's sake.

---

## Core Operating Principle: Replace Defaults With Decisions

AI-generated interfaces often become generic when the brief leaves important decisions unspecified. Models then fill gaps with familiar patterns: centered hero + oversized headline + two buttons, soft blue/purple gradients, rounded cards, generic icon grids, badges, testimonials, statistics, bento layouts, and uniform section rhythms.

Do not fight this by banning individual CSS properties. Replace missing decisions with explicit design logic.

For every major design element, establish at least one reason grounded in:

- brand identity
- audience
- content hierarchy
- business objective
- product behavior
- physical environment or industry
- editorial/storytelling concept
- interaction requirement

Use the rule:

> **A visual choice is allowed because it serves a purpose, not because it is fashionable.**

---

# Workflow

## Phase 0 — Inspect Before Editing

Read the project before changing it.

Inspect:

- `CLAUDE.md`, `README`, project documentation, design-system files, and brand guidelines
- framework and package configuration (`package.json`, lockfile, framework config)
- global CSS/tokens/theme files
- layout and route structure
- reusable components
- fonts and font-loading strategy
- image and video assets
- content/data sources
- existing animations
- metadata/SEO implementation
- tests and scripts

Determine:

- framework and rendering model
- existing design language
- brand constraints
- pages affected by the requested work
- whether the site already contains custom visual assets worth preserving
- whether the implementation is componentized or contains repeated one-off markup

Do not rewrite architecture merely to make the design cleaner.

### Preserve First

Keep, unless clearly defective:

- logo and established brand assets
- approved colors
- proprietary imagery
- brand-specific copy and terminology
- existing information architecture
- working integrations
- useful components
- existing accessibility improvements
- SEO-critical markup and metadata
- business claims and legal text

Do not invent testimonials, customer logos, ratings, awards, statistics, certifications, locations, prices, guarantees, or outcomes.

---

## Phase 1 — Run the Anti-Slop Audit

Audit the rendered site and source code separately. Do not diagnose from source code alone. Visual sameness is a rendered-experience problem.

Capture or inspect representative views at minimum:

- desktop wide: approximately 1440px
- desktop/laptop: approximately 1024px
- tablet: approximately 768px
- mobile: approximately 390px

Inspect the homepage and at least one interior page when available.

### A. Visual Surface

Flag combinations of the following patterns when they lack a clear reason:

**Color / effects**

- blue-to-purple/indigo gradient used as generic “modern” decoration
- glowing gradient blobs, orbs, mesh backgrounds, or ambient light behind every section
- glassmorphism used as the primary container language without a product-specific reason
- excessive backdrop blur
- neon accent plus dark “AI/SaaS” canvas on an unrelated brand
- gradient-filled headline text used only for visual excitement
- too many accents competing for attention

**Geometry**

- every element has the same large corner radius
- every section is made from rounded containers
- identical pill-shaped buttons everywhere
- excessive floating/shadowed surfaces
- nested cards (“card inside card inside card”)
- 1px borders around almost every element
- identical padding on visually unrelated modules

**Layout**

- centered hero with badge → H1 → paragraph → two buttons as a default recipe
- hero followed by exactly three equal feature cards
- repeated 3-column or 4-column grids regardless of content
- bento grid inserted because it looks “premium” rather than because the content is heterogeneous
- alternating image/text sections repeated with mechanical regularity
- oversized statistics without meaningful business context
- testimonial slider on a page that does not need one
- “trusted by” logos without verified relevance
- identical section height or rhythm across the whole page
- decorative dividers that carry no information
- excessive center alignment
- symmetrical layout where the subject matter wants asymmetry or editorial composition

**Typography**

- one generic sans-serif doing every job by default
- Inter/Poppins/Roboto/Geist/DM Sans/Space Grotesk used with no brand rationale
- oversized geometric display type as a substitute for hierarchy
- arbitrary italic-serif “accent words” inserted because it looks editorial
- all-caps eyebrow labels repeated on every section
- random monospace labels used to signal “tech”
- too many font weights and sizes
- weak distinction between display, heading, body, metadata, and UI text
- centered long-form body copy when left alignment would read better

Popular choices are not forbidden. They become a problem when they form a predictable bundle with no project-specific rationale.

### B. Components

Identify whether components exist because they represent a real semantic object or merely because the generator knows a component pattern.

For each card, ask:

- Does this content actually need containment?
- Does the card represent a distinct object or destination?
- Would a list, divider, open layout, table, or editorial block communicate faster?
- Are all cards visually identical despite materially different content?
- Is the border/shadow carrying information, or only decoration?

Use cards when grouping or navigation benefits from them. Do not make every block a card.

For repeated component families, inspect:

- same icon treatment
- same title length
- same paragraph length
- same button placement
- same height
- same border/radius/shadow
- same hover animation

A perfectly uniform row can be a sign of template thinking when the content itself is not uniform.

### C. Imagery and Assets

Flag:

- generic stock photography that could belong to any competitor
- uncanny AI-generated people with overly clean environments or synthetic details
- generic abstract 3D blobs used as the only visual identity
- repetitive “startup illustration” scenes with floating UI windows
- random image crops chosen only to fill a rectangle
- decorative images with no narrative relationship to the adjacent copy

Prefer authentic, contextual assets:

- actual team, location, product, work, process, material, architecture, equipment, or customer environment
- art-directed photography tied to the brand
- distinctive diagrams based on the real product/process
- meaningful screenshots
- proprietary illustrations
- real environmental details

Do not generate or substitute assets merely to eliminate whitespace.

### D. Copy / Content Slop

Flag copy that is technically grammatical but interchangeable between industries.

Common signals include:

- “elevate your business”
- “unlock your potential”
- “seamless” / “effortless” used without operational proof
- “cutting-edge”, “innovative”, “next-generation”, “transformative” as unsupported adjectives
- “revolutionize”, “empower”, “harness the power of” without specifics
- “tailored solutions” with no explanation of what is tailored
- repeated three-part slogans such as “Faster. Smarter. Better.”
- generic “we help businesses…” language without audience, mechanism, or outcome
- fake urgency
- fake scarcity
- filler section intros that restate the heading
- testimonials with vague praise but no concrete context
- statistics with no date, source, population, or meaning
- excessive em-dash-driven “AI voice” where the punctuation becomes a stylistic signature

Replace abstraction with:

- named audiences
- concrete verbs
- real nouns
- locations
- timeframes
- numbers
- process details
- constraints
- examples
- direct opinions that are actually held by the business
- first-hand knowledge

Use exact facts from the repository or supplied materials. Never manufacture specificity.

### E. Interaction Slop

Flag:

- animation on every section
- bounce/scale/tilt on every hover
- parallax added without narrative purpose
- scroll-triggered reveals that delay content unnecessarily
- animated gradient backgrounds that run continuously
- decorative cursor effects
- auto-rotating testimonial or content carousels with no clear need
- magnetic buttons and micro-interactions that exist only to signal “premium”
- loading spinners where skeleton/content placeholders are more informative

Motion must have a job: feedback, orientation, continuity, emphasis, or storytelling.

Honor `prefers-reduced-motion` and remove or reduce non-essential motion for users who request it.

### F. Real Product / Real Website Signals

AI-generated prototypes often cover the happy path. Real websites expose real states and edge conditions.

Inspect for:

- empty states
- loading states
- errors
- long labels
- one-item and many-item cases
- missing images or content
- long content
- mobile overflow
- disabled/permission states
- form validation
- unavailable service states
- 404 and other utility pages

Where relevant, improve these states. Authentic state coverage often makes a product feel authored because it reflects real use rather than a static marketing mockup.

### G. Accessibility, Performance, and Code Quality

Treat these as part of the anti-slop pass because visual polish is not a substitute for a production-quality site.

Check:

- semantic HTML
- correct headings and source order
- keyboard operation
- visible focus states
- accessible button/link names
- meaningful alternative text
- form labels and error messaging
- color contrast
- reduced-motion behavior
- responsive behavior
- image sizing/loading
- layout stability
- client-side JavaScript that is actually required
- console errors
- dead styles and dead components
- unnecessary dependencies
- repeated one-off markup that should be a component

Use automation as a first pass, not as proof of accessibility or quality.

---

# Phase 2 — Establish a Design Direction

Before touching many components, define a compact anti-slop design direction.

Write down:

### 1. Brand Character

Select 3–5 concrete traits, for example:

- precise
- warm
- established
- local
- technical
- editorial
- rugged
- understated
- energetic
- premium

Avoid empty adjectives such as “modern,” “clean,” “professional,” or “beautiful” unless they are translated into observable decisions.

### 2. Visual Signature

Choose 1–3 distinctive signatures grounded in the actual brand. Examples:

- a recognizable typographic pairing
- a specific crop philosophy
- a strong editorial grid
- a proprietary line/shape derived from the logo
- an architectural framing system
- photography with a consistent viewpoint
- an unusual but usable navigation treatment
- a recurring material or texture tied to the business

Do not add random “design personality.”

### 3. Design Tokens

Establish or refine tokens for:

- background layers
- text colors
- accent colors
- border colors
- spacing scale
- radius scale
- shadows/elevation
- type scale
- container widths
- motion durations/easings

Avoid a giant token inventory. Prefer a small, coherent system.

A practical default is to keep corner radii, shadows, gradients, and border styles **scarce** rather than applying them to everything.

### 4. Section Logic

Map the page around what the visitor needs, not around a library of components.

For every section define:

- visitor question answered
- proof provided
- desired action
- best visual form

Use the simplest layout that communicates the answer.

---

# Phase 3 — Deslop by Highest-Leverage Changes First

Do not spend an hour tuning shadows while the page still has a generic structure.

Prioritize in this order:

1. **Information architecture** — remove unnecessary sections and reorder around user intent.
2. **Hero composition** — make the opening unmistakably about this business/product.
3. **Typography system** — create meaningful hierarchy and brand voice.
4. **Content specificity** — replace generic copy and unsupported claims.
5. **Imagery** — introduce real, contextual, art-directed assets.
6. **Layout rhythm** — break repetitive section templates with purposeful variation.
7. **Component treatment** — reduce card/border/shadow dependence.
8. **Color/effects** — remove generic gradients/glows and sharpen the palette.
9. **Interaction** — keep only motion that improves feedback or comprehension.
10. **Code cleanup** — consolidate repeated patterns and remove dead implementation.

Never apply all anti-slop techniques simultaneously. The site should gain personality, not become visually noisy.

---

# Visual Transformation Rules

## Hero

Prefer a hero that could only plausibly belong to the subject.

Use:

- real value proposition
- meaningful context
- specific audience
- relevant visual evidence
- distinctive composition

Avoid defaulting to:

`eyebrow → giant centered H1 → generic paragraph → two pill buttons → glowing blob`

unless the existing brand genuinely calls for it.

A strong hero may be editorial, split-screen, image-led, product-led, typographic, asymmetric, architectural, local, data-led, or nearly minimal. Choose based on the subject.

## Typography

Build hierarchy intentionally.

Define roles such as:

- display
- H1/H2/H3
- body
- lead
- metadata
- navigation
- labels
- captions

Control size, line-height, weight, spacing, and alignment as a system.

A custom or less-common typeface can help, but font novelty is not the goal. A familiar font with excellent hierarchy and context is better than an unusual font used badly.

Keep body text legible and restrained. Use expressive display treatment where it supports the communication task rather than making every section “look designed.”

## Color

Start from the business's real palette or establish a restrained palette with clear semantic roles.

Prefer:

- dominant neutral/base
- primary brand tone
- one meaningful accent
- semantic status colors only where required

Use gradients only when they reinforce the concept or brand. Do not introduce a gradient merely because a flat surface feels too empty.

Do not use accent color as a substitute for hierarchy.

## Cards and Containers

Treat card containment as a semantic tool.

Use open layouts, whitespace, dividers, typography, image framing, and alignment before adding another rounded surface.

Avoid the “cardocalypse” pattern where every piece of content becomes an individually boxed object.

## Grids

Choose grid structure from the content.

Examples:

- comparison → aligned columns or table
- sequence → timeline/steps
- categories → navigation/list/grid
- editorial story → variable-width editorial composition
- metrics → structured stat row
- services → list or intentional cards depending on decision needs
- portfolio → image-led archive/grid
- product workflow → diagram/process layout

Do not force every content type into the same three-column card pattern.

## Asymmetry

Use asymmetry when it creates hierarchy, tension, direction, or personality.

Good asymmetry still has an underlying grid.

Do not create arbitrary misalignment simply to avoid looking templated.

## Imagery

Art-direct imagery:

- crop for the actual layout
- control focal point
- consider depth and negative space
- align visual subject with the copy's narrative
- preserve aspect ratios intentionally
- use image treatment consistently

The goal is not “more images.” The goal is **more relevant images**.

## Motion

Keep animation purposeful.

Use short, coherent transitions rather than stacking many effects.

Respect reduced-motion preferences with CSS and/or equivalent runtime behavior. Do not make critical information dependent on animation.

---

# Content Deslopification

Treat copy as a design material.

For each section ask:

- What does the visitor actually need to know here?
- What can only this business truthfully say?
- What evidence supports the claim?
- What specific noun or verb can replace an abstract marketing term?
- Can the sentence be shorter without losing meaning?
- Is this section earning its vertical space?

Prefer:

> “Dachdecker in Leipzig. Reparaturen und Neueindeckungen aus einer Hand.”

over:

> “Wir bieten innovative, maßgeschneiderte Lösungen für nachhaltige und zukunftsorientierte Bauprojekte.”

Prefer evidence over adjective stacking.

When AI-generated copy is present, preserve facts and rewrite for specificity rather than trying to imitate “human imperfections.” Do not deliberately add spelling mistakes, awkward punctuation, fake slang, or random quirks.

---

# Code-Level Deslopification

Do not only alter CSS. Inspect the implementation for signs of prototype-first generation.

Flag and clean where appropriate:

- duplicated JSX/HTML structures
- almost-identical components with different names
- one-off classes for every element
- huge arbitrary pixel-value collections
- repeated inline styles
- unused imports
- unused CSS variables
- dead components
- placeholder text
- placeholder assets
- “TODO” content shipped to users
- fake loading delays
- unnecessary client components
- unnecessary animation libraries
- dependencies used for trivial effects
- inaccessible custom controls replacing native elements
- visual variants encoded through scattered magic numbers

Prefer a small, intelligible design system over a pile of local exceptions.

When working in Next.js, preserve server/client boundaries unless a client component is required. Avoid adding JavaScript solely to reproduce CSS effects.

When working with images, use the framework's supported optimization path where appropriate. In Next.js, prefer `next/image` for ordinary content imagery when the project architecture supports it.

---

# Accessibility and Performance Guardrails

The anti-slop pass must not regress production quality.

## Accessibility

Require, where applicable:

- semantic landmarks
- logical heading hierarchy
- semantic buttons and links
- keyboard operability
- visible focus
- accessible names
- image alternatives
- labeled form controls
- sufficient contrast
- reduced-motion handling
- sensible source order

Use ARIA only when native HTML semantics are insufficient.

Automated tools can identify many issues, but manual review remains necessary.

## Performance

Keep the visual system lightweight.

Check:

- LCP
- INP
- CLS
- image payloads
- font loading
- unnecessary JavaScript
- blocking third-party scripts
- excessive background video
- large decorative effects

Do not trade a slightly more distinctive visual treatment for substantial performance regressions.

---

# Validation Protocol

After implementation, validate at both code and rendered levels.

## Automated

Run the project's existing checks first when available:

```bash
npm run lint
npm run build
npm test
```

Run only the scripts that exist in the project; do not invent a test command if none exists.

When the project already includes accessibility tooling, run it. When an axe/Lighthouse/Playwright setup exists, use it rather than adding duplicate infrastructure.

Inspect the browser console for runtime errors and failed requests.

## Visual

Review at:

- 1440px
- 1024px
- 768px
- 390px

Check:

- first-screen clarity
- visual hierarchy
- distinctive identity
- section rhythm
- spacing consistency
- typography quality
- image crops
- button hierarchy
- hover/focus states
- mobile composition
- overflow
- sticky/fixed elements
- contrast
- motion

### Squint Test

Visually blur or mentally defocus the page.

Ask:

- Does the dominant silhouette still look generic?
- Is the hierarchy obvious?
- Is there one recognizable visual identity?
- Are cards, gradients, and buttons dominating instead of content?

### Cross-Site Test

Compare the page mentally against modern AI-built landing pages. Do not ask “Does this look unusual?” Ask:

- Could this exact structure belong to ten unrelated companies?
- Would removing the logo make the brand difficult to identify?
- Are the same UI motifs repeated simply because the generator likes them?
- Does the page contain evidence that could only belong to this organization?

### Specificity Test

For the five most prominent visual elements, state the reason they exist.

If the reason is only:

- “modern”
- “premium”
- “engaging”
- “looks good”
- “AI generated it this way”

replace or simplify the element.

Do not require every tiny detail to have a written justification; focus on dominant decisions.

---

# Stop Conditions

Stop redesigning when:

- the page has a clear visual hierarchy
- the primary message is unmistakably specific
- the brand is visible without relying on the logo alone
- repeated default motifs have been reduced to intentional uses
- content and imagery feel credible
- mobile and desktop compositions work independently
- accessibility has not regressed
- performance has not materially regressed
- code remains maintainable

Do not continue adding novelty after the problem has been solved.

---

# Failure Modes to Avoid

## Anti-Slop Becomes Another Slop Template

Do not replace purple glass cards with brutalist beige cards, serif headlines, huge margins, red cursor effects, or another fashionable formula simply because it is currently associated with human design.

## Randomness Mistaken for Personality

Do not rotate card heights, break the grid, use random colors, or add asymmetry without communication value.

## Overcorrection

Do not remove all cards, all shadows, all gradients, or all rounded corners by rule. Use them selectively where they fit.

## Rebranding by Accident

Do not change the identity, tone, typography, color, or imagery beyond the project's legitimate scope without evidence that the existing choices are part of the problem.

## Content Fabrication

Do not make a website appear more “real” by inventing case studies, customer names, reviews, numbers, locations, team members, awards, or product behavior.

## AI-Detection Claims

Do not claim that a website is definitively AI-generated or definitively human-generated based on visual patterns. Report **AI-associated / template-associated signals** and the concrete patterns observed.

## Accessibility Theater

Do not add a superficial accessibility widget as a substitute for actual accessible implementation. Fix the underlying HTML, keyboard behavior, contrast, semantics, labels, focus management, and motion behavior.

## Performance Theater

Do not preserve a “premium” visual effect when it produces a material performance regression without a strong business reason.

---

# Recommended Output After a Deslop Pass

Provide a concise implementation report containing:

### Diagnosis

Identify the highest-impact AI-associated patterns found and why they weakened specificity.

### Changes

Summarize the design-system, layout, content, imagery, interaction, and code changes actually made.

### Validation

Report commands/tests run, viewport checks, and any unresolved issues.

### Remaining Risks

State what still looks generic, what depends on missing brand assets/content, and what should be refined later.

Never report a subjective “AI score” as a fact. A qualitative pattern audit is more trustworthy than false precision.

---

# Evidence Base / Research Notes

The following sources inform the skill. Treat practitioner pattern catalogs as observational evidence, and academic/standards sources as stronger evidence for the underlying mechanisms and quality requirements.

## AI / Human-AI Design Homogenization

1. Donghoon Shin, Alice Gao, Rock Yuren Pang, Jaewook Lee, Katharina Reinecke, Emily Tseng — “Interrogating Design Homogenization in Web Vibe Coding” (2026). Examines homogenization in web vibe coding and proposes “productive friction” as a mitigation approach. https://arxiv.org/abs/2603.13036

2. Alwin de Rooij & Michael Mose Biskjaer — “Generative AI Makes Creative Output More Homogeneous” (ECCE 2026 / ACM). Systematic review and three-level meta-analysis of 19 studies and 61 effect sizes; reports a small but statistically significant homogenization effect associated with AI use (d = .334). https://doi.org/10.1145/3822301.3822304

3. Ahmed Fawz, Amjed Tahir, Kelly Blincoe — “Vibe Coding in Practice: Motivations, Challenges, and a Future Outlook — A Grey Literature Review” (2025). Reviews 101 practitioner sources and reports a recurring speed/quality trade-off, overlooked QA, and maintainability/reliability concerns in vibe coding. https://arxiv.org/abs/2510.00328

4. Jie Li et al. — “Vibe Coding for UX Design: Understanding UX Professionals’ Perceptions of AI-Assisted Design and Development” (2025). Reports an ideation → generation → debugging → review workflow and challenges including unreliability, integration issues, over-reliance, and responsibility/trust tensions. https://arxiv.org/abs/2509.10652

5. Thoughtworks — “Can vibe coding produce production-grade software?” (2025). Practical experiments discussing the difference between rapid AI generation and maintainable production software. https://www.thoughtworks.com/en-de/insights/blog/generative-ai/can-vibe-coding-produce-production-grade-software

## Current Practitioner Pattern Reports

6. VisiblePage — “How to Make AI-Generated Pages Look Less Generic” (2026). Observes common defaults such as purple-blue gradients, centered heroes, rounded cards, and single-sans typography, and argues for explicit design direction and tokens. https://visiblepage.com/insights/websites/make-ai-pages-look-less-generic/

7. SmoothUI — “AI Design Slop: Why AI-Generated UI Looks Generic — and the Fix” (2026). Documents repeated patterns including gradients, glass effects, repeated card grids, and self-review failures. https://smoothui.dev/blog/ai-design-slop

8. Joshua Snoddy — “Why Do AI-Generated Websites All Look the Same?” (2026). Provides a practitioner-oriented catalog of recurring AI-website patterns and emphasizes repetition/convergence rather than single-property detection. https://www.joshuasnoddy.com/blog/why-ai-websites-look-the-same/

9. SlopCheckr — “Why AI-built landing pages all look the same” (2026). Reports a small-sample observational scan of 93 sites and convergence in fonts and layout patterns. Use this only as current observational evidence, not as a universal statistic. https://www.slopcheckr.com/blog/why-ai-landing-pages-look-the-same

## Content Quality / Search

10. Google Search Central — “Creating helpful, reliable, people-first content.” Emphasizes original information, first-hand expertise, usefulness, clear sourcing, and avoiding mass-produced low-value content. https://developers.google.com/search/docs/fundamentals/creating-helpful-content

11. Google Search Central — “Google’s guidance on using generative AI content on your website.” States that using generative AI to generate many pages without adding value can violate scaled-content-abuse policies; AI use itself is not the criterion. https://developers.google.com/search/docs/fundamentals/using-gen-ai-content

12. Google Search Central — “Optimizing your website for generative AI features in Google Search” (2026). Recommends valuable, unique, non-commodity content and reiterates people-first SEO foundations. https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

## Interaction / Visual System Quality

13. Material Design — “Cards.” Recommends using cards to provide context and entry points, avoiding unnecessary cards and preserving content hierarchy inside cards. https://m1.material.io/components/cards.html

14. GOV.UK Design System — “Summary list.” Explicitly advises against summary cards when a small amount of related information can be presented directly as a list. https://design-system.service.gov.uk/components/summary-list/

15. U.S. Web Design System — “Card.” Defines cards as containers for content/actions about a single subject and distinguishes them from general page content. https://designsystem.digital.gov/components/card/

16. IBM Carbon Design System — Typography. Describes typography as a hierarchy and information-organization mechanism, with distinct productive/expressive type sets and controlled typography tokens. https://carbondesignsystem.com/elements/typography/overview/

17. MDN — “HTML: A good basis for accessibility.” Recommends semantic HTML, meaningful labels, keyboard accessibility, alt text, and correct source order. https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML

18. MDN — `prefers-reduced-motion`. Documents the standard mechanism for honoring a user's request to reduce non-essential animation. https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion

19. web.dev — “Web Vitals.” Defines Core Web Vitals including LCP, INP, and CLS and provides recommended targets. https://web.dev/articles/vitals

20. Next.js Documentation — Image Optimization. Documents responsive sizing, modern image formats, layout stability, and lazy loading with `next/image`. https://nextjs.org/docs/15/app/getting-started/images

21. W3C WAI — “Evaluating Web Accessibility Overview” and “Selecting Web Accessibility Evaluation Tools.” States that automated tools are useful but cannot determine accessibility by themselves; human evaluation is required. https://www.w3.org/WAI/test-evaluate/ and https://www.w3.org/WAI/test-evaluate/tools/selecting/

22. W3C — WCAG 2.2. Establishes the four accessibility principles: perceivable, operable, understandable, and robust. https://www.w3.org/TR/wcag/

23. WebAIM — The WebAIM Million 2026. Reports that 95.9% of the one million analyzed home pages had automatically detectable WCAG 2 failures in the February 2026 dataset. This is not evidence that AI-generated websites are uniquely inaccessible; use it only as context for why production validation matters. https://webaim.org/projects/million/

## Security / Vibe-Coding Quality Context

24. OWASP Top 10:2025 — “Inappropriate Trust in AI Generated Code (Vibe Coding).” Advises understanding and reviewing AI-generated code rather than trusting it blindly. https://top10.owasp.org/2025/ko/X01_2025-Next_Steps/

---

# Final Principle

**Do not try to make an AI-built website look “less AI.” Make it look more like the result of clear human decisions.**

The desired endpoint is not anti-AI aesthetics. It is a website where the content, visual language, interaction model, and implementation all appear to have been chosen deliberately for the actual organization and its users.
