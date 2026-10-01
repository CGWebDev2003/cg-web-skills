# QA, final audit, launch and handoff

## 1. QA: test the real product

Before launch, run a full QA pass on the production build.

### Functional

Every navigation link, CTA, form, validation rule, success and error state, menu, dialog, accordion, search, integration, redirect, download and external link.

### Content

Spelling, grammar, names, prices, dates, contact details, addresses, legal references, captions and alt text, leftover placeholder text and duplicated content.

### Visual

Compare across viewport sizes and look for inconsistent spacing or type scale, mismatched or non-concentric radii, broken alignment, strange line wraps, awkward empty space, over-dense sections, weak hierarchy, visual repetition, generic-looking sections, broken imagery, excessive decoration and unthemed browser surfaces.

### Interaction

Every state from `states-and-hardening.md` reachable and designed. Motion reviewed at 10 % speed, reduced-motion path checked.

### Accessibility

Keyboard pass, focus pass, contrast pass, semantic inspection, zoom and reflow pass, and assistive-technology spot checks where the scope warrants them. Use `cg-web-accessibility` for full remediation.

### Performance

Production performance tests, and Core Web Vitals field data where available. Use `cg-web-lighthouse-optimizer` for Lighthouse reports.

### Security and privacy

Exposed secrets, third-party scripts, forms and data flows, cookie and consent requirements, HTTPS, permissions and environment configuration. Use `cg-web-privacy` and `cg-web-imprint` for the legal pages.

## 2. Final anti-slop audit

Before declaring the design complete, audit it deliberately. Use the lists in `anti-slop.md`.

**Specificity**

- Could this website belong to a completely different company without much change?
- Are the visual choices tied to the subject matter?
- Are there real assets and real evidence? Does the copy contain concrete facts?

**Layout**

- Is the hero formula justified?
- Did we use cards because the content is naturally card-shaped, or because AI defaults to cards?
- Are identical modules overused? Are there unnecessary pills, gradients, glass panels, eyebrows or bento grids?

**Typography**

- Was the typeface chosen intentionally? Do sizes serve hierarchy?
- Are uppercase labels, monospace metadata or accented words actually needed?

**Motion**

- Does each animation communicate something?
- Would removing half of them improve the experience?

**Content**

- Could each headline belong to another company?
- Are claims specific and verifiable? Are testimonials, metrics and logos real?
- Is any copy obviously filler?

**Restraint**

- What can be removed without harming comprehension?
- Is there one clear, memorable design idea rather than ten competing tricks?

**Human quality**

- Does anything feel mechanically generated?
- Are details consistent across pages?
- Do awkward edge cases get the same care as the hero?

### Exit criterion

Don't approve because the site "looks cool". Approve when the visual direction can be explained from the brief, the hierarchy is clear, the content is specific, defaults have been challenged, every major decorative decision has a reason, responsive behaviour is intentional, interactions are coherent, the implementation works, accessibility and performance risks are addressed, and the result could not reasonably be described as a generic template with a new logo.

## 3. Launch checklist

- [ ] Production build passes
- [ ] Environment variables are correct; no secrets in client code
- [ ] Forms tested end to end, including notifications
- [ ] Analytics verified, and only loaded with consent where required
- [ ] SEO metadata, robots and sitemap checked
- [ ] Canonical URLs and redirects from old URLs checked
- [ ] Favicon, app icons, theme colour and social previews present
- [ ] Imprint and privacy policy linked from every page
- [ ] 404 and error pages designed and working
- [ ] HTTPS active
- [ ] Image optimisation verified
- [ ] Performance tested on mobile
- [ ] Accessibility tested
- [ ] Major browser and device checks complete
- [ ] Backup and rollback path understood
- [ ] Client content final, or explicitly marked as pending

## 4. Handoff

Deliver:

- production code;
- environment and configuration documentation;
- `DESIGN.md` with tokens and component rules, and `PRODUCT.md` (see `project-files.md`);
- content ownership information;
- deployment instructions;
- analytics information;
- the process for integration credentials (never put secrets in documentation);
- known limitations and recommended next improvements.

## 5. Maintenance

A website is not finished because deployment succeeded. Monitor real usage, Core Web Vitals, form conversions and search data, and improve from evidence. Keep `PRODUCT.md` and `DESIGN.md` current so later work starts from the truth instead of re-deriving it.
