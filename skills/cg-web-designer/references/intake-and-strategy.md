# Intake, discovery and strategy

Load this at the start of a new project, a redesign, or whenever durable product context is missing. The output is product truth: who the site is for, what it must achieve and what evidence it can carry. Visual decisions come later, in `design-direction.md`.

## 1. Inspect before asking

If the user supplied files, URLs, a repository, screenshots, brand assets or an existing website, inspect those first. Scan product docs and copy, package and config files, routes and features, names, logos, legal and proof assets, and accessibility signals. Treat what you find as a hypothesis to confirm, not as approval.

If a `PRODUCT.md` exists (see `project-files.md`), read it and ask only about what is stale or missing. Never reopen confirmed facts without a reason.

## 2. The internal project brief

Fill in what you can from evidence. Leave the rest as explicit open decisions; do not invent.

### Business

- Company or project name
- What the company does, in one clear sentence
- Products, services, offers
- Business model, geographic market, industry
- Company stage or size, if relevant
- Main commercial goal for the website

### Audience

- Primary audience, described concretely (situation, state of mind, job to be done), not as a demographic stereotype
- Secondary audiences
- Pain points, objections and trust barriers
- What the visitor already knows
- What the visitor must understand before acting

### Website goals

- Primary website goal and primary conversion
- Secondary actions
- Business KPIs and the user's success criterion
- Pages or flows that matter most

### Positioning

- Why the company exists and what makes it different
- Competitive alternatives
- Strongest proof points, and which claims still need evidence
- Brand personality, words to use, words to avoid
- What is uniquely true here that a neighbouring company or a generic template could not claim

### Content

Existing pages, copy, documents, product and service information, FAQs, case studies, testimonials, team information, certifications and awards, pricing, legal content, downloads and media assets.

### Brand

Logo or wordmark, brand colours, typography, guidelines, photography or illustration direction, an existing design system, other digital products, and assets that must not change.

### Visual references

- 3–5 websites or references the client likes, and what exactly they like about each (type, density, layout, colour, imagery, motion, tone, composition, navigation)
- 1–3 references they dislike, when useful
- The desired emotional impression
- Industry conventions to preserve and clichés to avoid

Never copy references. Extract principles and translate them into project-specific decisions.

### Technical

Repository and framework, CMS or data source, hosting and domain, analytics, forms and CRM, payments, authentication, APIs, email, search, multilingual needs, browser and device requirements, performance, deployment and maintenance expectations.

If there is no codebase yet and the request implies building, the stack is the user's decision: ask once whether they want plain HTML/CSS, a specific framework, or your recommendation, and record the answer.

### Compliance and risk

Privacy, cookies and consent, accessibility expectations, industry-specific rules, legal pages, security, data processing and third parties.

### Delivery

Deadline, stakeholders, approval process, content owner, technical owner, required deliverables and existing limitations.

## 3. Intake questions

Ask in small grouped rounds, two or three questions at a time, in this order. Skip anything the evidence already answers.

**Round A: business and goal**

- What exactly does the company or product do, and for whom?
- What is the single most important thing the website should accomplish, and what is the primary action?
- What makes the company meaningfully different from alternatives?

**Round B: offer, proof and content**

- Which facts, numbers, prices and claims are verified?
- What proof exists: case studies, testimonials, certifications, references, results?
- Which content and assets already exist, and which must be created?

**Round C: brand and references**

- What should the brand feel like, and which references do you like (and why)?
- What should definitely be avoided?
- Are there brand guidelines, colours, fonts or a design system?

**Round D: structure and function**

- Which pages and flows must work end to end?
- Are there forms, logins, search, booking, payments, integrations or dynamic content?
- What stack and deployment environment apply?

**Round E: constraints**

- What is non-negotiable or must not change?
- Which accessibility, legal, privacy or performance constraints apply?
- Who approves the result, and what does "done" mean?

If critical answers are missing, ask. If the uncertainty is minor, make a reasonable assumption, state it briefly, and continue.

## 4. Discovery

Use a Double Diamond mindset: **Discover → Define → Develop → Deliver**. Discovery understands the problem instead of assuming it; definition turns findings into a precise design challenge.

Do not perform fake research. Research only what can change a design or business decision.

Inspect, where available: the current site and its important pages, analytics and search data, customer language, competitor sites, brand materials, product documents, reviews, sales material, support questions, existing conversion paths, SEO data and existing accessibility or performance findings.

For competitors, do not copy aesthetics. Analyse positioning, information hierarchy, navigation, proof patterns, conversion paths, content depth, trust mechanisms, interaction models, visual conventions, and the gaps you can own. Note the page this category always ships: it is the rut to avoid by default (see `design-direction.md`).

Produce a short **Discovery Summary**: user needs, business needs, current problems, opportunities, constraints, evidence, open questions and the design challenge.

## 5. Strategy

Write a concise **Website Strategy**:

- **One-sentence purpose:** what the website exists to help the business and the user accomplish.
- **Primary audience:** concrete, not a demographic.
- **Primary user intent:** what the visitor came to do, understand or decide.
- **Primary conversion:** the single action that matters most.
- **Value proposition:** why this offer is relevant and different.
- **Trust model:** what evidence the visitor needs before acting.
- **Content strategy:** what is essential, optional, secondary or unnecessary.
- **Visitor mode per key surface:** Persuade, Operate, Read or Experience (see `SKILL.md`).
- **Success metrics:** tied to the purpose, such as qualified leads, completed applications, booked appointments, purchases or task success. Never invent target numbers without evidence.

### Strategy gate

Do not proceed to visual design until audience, user intent, primary business goal, primary CTA, value proposition, differentiator and major trust requirements are clear. Record them in `PRODUCT.md` (see `project-files.md`).
