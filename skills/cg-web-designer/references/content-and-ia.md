# Content, information architecture, flows and UX copy

Content and structure come before visual composition. If the words and the order are wrong, no visual treatment will save the page.

## 1. Content before composition

Treat copy as part of UX, not decoration added after design. People scan web pages: prefer clarity, short direct sentences and the user's own vocabulary.

For every page define its purpose, audience, the primary question it answers, key evidence, primary and secondary CTAs, required media, SEO intent, internal links and legal or compliance requirements.

Build a content inventory:

| Content | Source | Status | Owner | Required? | Evidence needed? |
| ------- | ------ | ------ | ----- | --------- | ---------------- |
|         |        |        |       |           |                  |

Do not write filler such as "Innovative solutions for a changing world", "Empowering businesses to unlock their full potential" or "Your trusted partner for excellence" unless the client has a real reason and the wording is backed by specifics. Prefer language that says what the organisation actually does, for whom, and why it matters.

### Content quality test

Every important section should answer at least one of these questions. If a section answers none, question whether it belongs.

- What is this?
- Who is it for?
- Why does it matter?
- How does it work?
- Why should I trust you?
- What does it cost, and what happens next?
- What should I do now?

## 2. Information architecture

IA is the organisation and naming of content and navigation. A sitemap is one representation of it, not the whole thing.

Create a page inventory, sitemap, primary navigation, secondary and footer navigation, page hierarchy, naming conventions and the key user flows. Use labels users understand, not internal language.

Check:

- Can users predict what each navigation item contains?
- Can they find important content without hunting?
- Are the categories distinct and understandable?
- Are there unnecessary levels?
- Does every important page have an obvious route to it?
- Can a visitor landing on an inner page tell where they are?

Use card sorting or tree testing when the structure is uncertain and the project justifies it.

**IA gate:** someone could explain where important content lives without seeing the final design.

## 3. UX flows

Define critical journeys before polishing the UI:

```text
Entry → Context → Decision → Action → Confirmation / next step
```

For each journey list the states it can reach (see `states-and-hardening.md`): default, loading, empty, success, error, disabled, validation, long content, missing content and mobile constraints. Realistic minimum, typical and maximum content ranges belong here too: the shortest and longest headline, a service with no image, a list with one item and with fifty.

## 4. Wireframes

Start low fidelity. A wireframe answers what appears, in what order, with what hierarchy, what the user can do, what the CTA is and what content is needed. Do not spend time on colour and shadows at this stage.

For a homepage, set a deliberate information sequence. One possible structure:

```text
orientation → value → proof → explanation → differentiation → objection handling → CTA
```

Do not force this formula when the product or audience calls for another. An Experience surface may lead with the work itself; a Read surface may lead with the answer.

**Wireframe gate:** the page makes sense in greyscale without imagery, gradients and motion. If removing them makes it incomprehensible, the UX is not resolved.

## 5. UX copy (clarify)

Microcopy is design material. Audit and rewrite it by function.

### Message hierarchy

Before rewriting, decide for each screen: what the user must notice first, what they need to decide, and what they can safely ignore. Copy should follow that order.

### Actions and navigation

- Buttons and links name the outcome: "Book a consultation", "Request a quote", "View the machines", "Start the application". Avoid "Get started", "Submit", "Learn more" and "Click here" when a specific label is possible.
- Use the same verb for the same action everywhere. Don't mix "Delete", "Remove" and "Discard" for one operation.
- Link text makes sense out of context, for screen-reader link lists and for scanning.

### Forms

- Every field has a visible label. Placeholders are examples, never labels.
- Say what format is expected before the user gets it wrong.
- Mark optional fields rather than required ones when most fields are required, and be consistent.

### Errors and permissions

- Name the problem and the way out: "The card number is too short. Check the 16 digits on the front." not "Invalid input".
- Never blame the user, never use technical codes as the message, never use humour in an error that costs the user something.
- Keep the user's input after an error.

### Loading, empty and success states

- Loading copy says what is happening when it takes longer than a moment.
- Empty states explain why it is empty and what to do next, ideally with the action right there.
- Success messages confirm what happened and what comes next ("We'll reply within two working days").

### Voice, accessibility and localisation

- One voice across the site, adapted in tone to the moment (calm in errors, warm in confirmations).
- Avoid idioms, ambiguous abbreviations and text baked into images; they break translation and assistive technology.
- Allow for 30–40 % text expansion in German and other languages (see `states-and-hardening.md`).
- Ask before changing factual copy or adding claims. Rewriting for clarity is in scope; changing what the company promises is not.

### Verify

Read every primary path aloud. Each control should say what it does, each error should say how to recover, and no screen should need a second reading to understand the next step.
