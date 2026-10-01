# Research basis

This skill synthesises the following sources and practitioner evidence. The original sources were checked in September 2026; the design-engineering skills were reviewed in October 2026. Their ideas are restated here in this skill's own words; no code or text libraries were copied.

## Process, research and content

- **Design Council, The Double Diamond:** Discover, Define, Develop, Deliver; an iterative design process.
  <https://www.designcouncil.org.uk/resources/the-double-diamond/>
- **GOV.UK Service Manual, user research:** understand user needs, test continuously, include different abilities and contexts.
  <https://www.gov.uk/service-manual/user-research/how-user-research-improves-service-design>
- **GOV.UK Service Manual, prototyping:** prototype before committing to production; test realistic interactions; iterate.
  <https://www.gov.uk/service-manual/design/making-prototypes>
- **GOV.UK Service Standard:** understand users, keep services simple, make them accessible, iterate, secure the service, define success, choose appropriate technology.
  <https://www.gov.uk/service-manual/service-standard>
- **GOV.UK Service Manual, writing for user interfaces:** short, direct copy, lower cognitive load, clear labels, meaningful link text.
  <https://www.gov.uk/service-manual/design/writing-for-user-interfaces>
- **Nielsen Norman Group, Information Architecture vs. Sitemaps:** IA structures content; a sitemap is one representation.
  <https://www.nngroup.com/articles/information-architecture-sitemaps/>
- **Nielsen Norman Group, Tree Testing:** test the hierarchy before building layouts.
  <https://www.nngroup.com/articles/tree-testing/>
- **Nielsen Norman Group, 10 Usability Heuristics:** the basis of the heuristic scoring in `critique-and-audit.md`.
  <https://www.nngroup.com/articles/ten-usability-heuristics/>
- **Nielsen Norman Group, Visual Design Principles:** scale, hierarchy, balance, contrast and Gestalt.
  <https://www.nngroup.com/articles/principles-visual-design/>

## Accessibility, performance and search

- **W3C, WCAG 2.2:** testable accessibility success criteria.
  <https://www.w3.org/TR/wcag/>
- **W3C, Focus Visible** and **Target Size (Minimum):** visible focus; targets of at least 24×24 CSS px or an exception.
  <https://www.w3.org/WAI/WCAG22/Understanding/focus-visible>
  <https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum>
- **MDN, Responsive Web Design** and **HTML and accessibility.**
  <https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design>
  <https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML>
- **MDN, `text-wrap`, `font-variant-numeric`, `prefers-reduced-motion`, `will-change`:** rendering and motion details.
  <https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap>
  <https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric>
  <https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion>
  <https://developer.mozilla.org/en-US/docs/Web/CSS/will-change>
- **web.dev, Core Web Vitals:** LCP, INP and CLS thresholds at the 75th percentile.
  <https://web.dev/articles/vitals>
- **MDN, JavaScript performance.**
  <https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/JavaScript>
- **Google Search Central, SEO Starter Guide** and **Helpful, Reliable, People-First Content.**
  <https://developers.google.com/search/docs/fundamentals/seo-starter-guide>
  <https://developers.google.com/search/docs/fundamentals/creating-helpful-content>

## Agent skills for frontend design

- **Anthropic, frontend-design skill:** project-specific visual direction, deliberate typography, colour, layout and motion, warning signs for generated defaults, a plan before code, self-critique.
  <https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md>
- **Impeccable (Paul Bakaus, Apache 2.0):** visitor modes; separating product truth (`PRODUCT.md`) from the visual system (`DESIGN.md`); refinement versus redesign; deriving a visual world from the audience's culture and naming the category rut; the craft floor and browser surfaces; question cadence; bounded verification passes; critique with Nielsen scoring, cognitive load and personas; the five-dimension technical audit with P0–P3 severity; named refinement moves (bolder, quieter, distill, delight, polish, harden, clarify).
  <https://github.com/pbakaus/impeccable>
- **Make Interfaces Feel Better (Jakub Krehel, MIT):** concentric radii, optical alignment, shadows for elevation and borders for structure, image outlines, hit areas, icon stroke and state rules, text wrapping, tabular numerals, font smoothing, interruptible transitions, press feedback, motion restraint, and the polish review format with before/after tables, rejected candidates and a verdict.
  <https://github.com/jakubkrehel/make-interfaces-feel-better>
- **transitions.dev (Jakub Antalik):** the idea of a shared motion-token scale matched by usage rather than by nearest number, open/close asymmetry, hover-in versus hover-out, capped stagger, intent delays and a component-to-transition decision table. Only these principles are used here; the transitions.dev snippets and token values are not reproduced. For production-ready transitions, install the transitions.dev skill itself.
  <https://github.com/Jakubantalik/transitions.dev>
- **GSAP official AI skills (GreenSock, MIT):** plugin registration, `gsap.matchMedia()` for breakpoints and reduced motion, `useGSAP()` and context clean-up, ScrollTrigger placement and refresh rules, transform-first performance and `quickTo()`.
  <https://github.com/greensock/gsap-skills>

## AI-generated web sameness

Practitioner analyses reviewed for recurring patterns. They are heuristic evidence, not scientific consensus.

- <https://blog.interfacekit.io/why-vibe-coded-websites-look-the-same>
- <https://www.joshuasnoddy.com/blog/why-ai-websites-look-the-same/>
- <https://shuffle.dev/blog/2026/01/why-do-most-ai-generated-websites-look-the-same/>
- <https://www.acscreative.com/insights/ai-generated-websites-all-look-the-same/>
- <https://viton13.com/research/18-ai-websites-look-the-same>

### Interpretation note

There is no universally accepted scientific taxonomy called "AI slop". The anti-slop rules combine Anthropic's frontend-design guidance, the detector rules and craft floor published by Impeccable, a community report of a measurable pill-button default, and several independent 2026 practitioner analyses. Treat them as risk indicators and review heuristics, not as proof that a website was generated by AI or as a ban on any individual style.
