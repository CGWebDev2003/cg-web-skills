# Critique, audit and polish review

Use this for every review. There are three kinds; pick the one that matches the request, or run them in order for a full review.

| Review | Question it answers | Output |
| --- | --- | --- |
| **Critique** | Is this the right design for these users and this business? | Specificity verdict, heuristic scores, priority issues |
| **Audit** | Is it technically sound? | Health score across five dimensions, P0–P3 findings |
| **Polish review** | Is it finished down to the details? | Before/after table per principle, verdict |

Reviews report; they don't fix, unless the user asks for fixes too. Always inspect the real thing: the rendered page in a browser at desktop and mobile widths when possible, plus the source.

## Ground rules for every review

- **Evidence, not impressions.** Every finding names a location (`path/to/file:line`, or the page and component) and what you observed.
- **Separate judgement from tools.** Form your design judgement before reading automated tool output (Lighthouse, axe, linters), so the tools don't anchor what you notice. Then use the tools to confirm or add mechanical findings. When you can run sub-agents, a design review and a tool-based review in two independent agents give a less anchored result.
- **Verify before reporting.** No false positives from a tool without checking them in context.
- **Prioritise.** Not everything is P0. Too many low findings bury the important ones.
- **Name what works.** Strengths tell the team what to keep.
- **Never claim a check you didn't run.** Mark it **Not verified** with the reason.

### Severity

- **P0 Blocking:** prevents task completion, loses data, or misleads. Fix immediately.
- **P1 Major:** significant difficulty, WCAG AA failure, or a broken key state. Fix before launch.
- **P2 Minor:** an annoyance with a workaround. Fix in the next pass.
- **P3 Polish:** no real user impact. Fix if time allows.

## 1. Critique

### Design specificity verdict (start here)

Is the composition, interaction and visual language grounded in this product, or could an unrelated company use it unchanged? Answer pass/fail with evidence, using `anti-slop.md`.

### Holistic review

Hierarchy, information architecture, emotional fit, discoverability, composition, typography, colour, accessibility, states, copy and edge cases.

### Nielsen's 10 heuristics, scored 0–4

| # | Heuristic | What to look for |
| --- | --- | --- |
| 1 | Visibility of system status | Feedback for actions, loading, current location, form progress |
| 2 | Match with the real world | The user's language, familiar concepts, logical order |
| 3 | User control and freedom | Back, cancel, undo, close; no dead ends |
| 4 | Consistency and standards | Same words, patterns and positions for the same things; web conventions |
| 5 | Error prevention | Constraints, sensible defaults, confirmation for destructive actions |
| 6 | Recognition rather than recall | Visible options, clear labels, context kept in view |
| 7 | Flexibility and efficiency | Shortcuts for experienced users, sensible defaults, autofill |
| 8 | Aesthetic and minimalist design | Every element earns its place; signal over noise |
| 9 | Help users recover from errors | Plain-language errors with a way out |
| 10 | Help and documentation | Help where it is needed, in context |

Scoring: **0** absent or broken, **1** major problems, **2** partial, **3** good with minor issues, **4** genuinely excellent. Be honest: 4 means excellent, not "fine".

On Persuade and Experience surfaces, heuristics 7 and 10 (and any other that truly can't apply) may be scored `n/a` with a one-line reason. Then report the total against the applicable maximum (for example **24/32**) and read the band from the percentage: 90 %+ excellent, 70 %+ good, 50 %+ acceptable, 30 %+ poor, below that critical.

### Cognitive load

Count failures in this checklist. 0–1 is low load, 2–3 moderate, 4+ high and a priority fix.

- More than about four equally weighted options at a decision point.
- The primary action is not obvious within a few seconds.
- The user must remember information from a previous screen.
- Unfamiliar jargon or internal terminology.
- Related information split across places.
- Visual noise competing with the content (decoration, motion, too many colours).
- Inconsistent patterns for the same kind of thing.
- Long unbroken text without structure.

### Emotional journey

Where are the high-stakes moments (price, contact form, payment, data entry)? Is there reassurance there? Is there a valley of frustration on the main path? How does the experience end? People remember peaks and endings.

### Personas

Walk the primary path as two or three of these and list concrete red flags, not generic descriptions:

| Persona | Profile | Typical red flags |
| --- | --- | --- |
| **The scanner** | In a hurry, reads headings and buttons only | Key information buried in paragraphs, vague CTAs |
| **The sceptic** | Compares providers, looks for proof | Unverifiable claims, no prices, no real references, no contact person |
| **The first-timer** | Doesn't know the domain or jargon | Unexplained terms, assumed knowledge, unclear next step |
| **The mobile visitor** | One thumb, small screen, poor connection | Tiny targets, heavy pages, hidden navigation, unreadable tables |
| **The assistive-tech user** | Screen reader or keyboard only, perhaps low vision | Missing labels, no focus states, wrong heading order, motion without control |

Use real audience information from `PRODUCT.md` to add one or two project-specific personas. Never invent audience details when none exist.

### Critique report

1. **Design specificity verdict** (pass/fail, evidence)
2. **Heuristic scores** (table, total against applicable maximum, band)
3. **Cognitive load** (failures, decision points with too many options)
4. **What works** (2–3 strengths)
5. **Priority issues** (3–5, each with P-level, location, impact, recommendation)
6. **Persona red flags**
7. **Minor observations**
8. **Questions** that would change the design (end the report with these)

## 2. Technical audit

Score five dimensions 0–4:

| # | Dimension | Check | 0 | 4 |
| --- | --- | --- | --- | --- |
| 1 | Accessibility | contrast, keyboard, focus, semantics, labels, alt text, reduced motion | fails WCAG A | WCAG AA fully met |
| 2 | Performance | Core Web Vitals, image sizing, JS weight, layout thrashing, expensive animation, `will-change` misuse | severe issues | fast and lean |
| 3 | Responsive | fixed widths, overflow, touch targets, text scaling, touch gestures | desktop-only | fluid at every size |
| 4 | Theming and tokens | hard-coded values, token consistency, dark mode, browser surfaces | everything hard-coded | complete token system |
| 5 | Implementation integrity | design-system drift, repeated shortcuts, misleading or decorative content, structure interchangeable with another product | systemic drift | coherent and intentional |

Report the **Audit Health Score** out of 20: 18–20 excellent, 14–17 good, 10–13 acceptable, 6–9 poor, 0–5 critical. Then list findings by severity, each with location, category, user impact, the standard it violates (if any) and a specific recommendation. Name systemic patterns ("hard-coded colours in 15 components") separately from one-off defects, and note positive findings.

## 3. Polish review

Use `quick` mode (primary path and high-traffic states, only HIGH and MEDIUM, up to 5 findings) or `full` mode (whole scope, up to 15 findings). Default to `full`.

### Coverage

State the mode, scope, framework and styling system, and show what was actually inspected:

| Category | Evidence inspected | Result |
| --- | --- | --- |
| Typography | files, components, states | findings count, `Clear`, or `Not reviewed` with reason |
| Surfaces | | |
| Interaction and motion | | |
| Icons | | |
| States | | |
| Performance details | | |

### Findings

Group by principle (from `typography.md`, `surfaces-and-details.md`, `interaction-and-motion.md`, `states-and-hardening.md`). One table per principle:

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| MEDIUM | `src/Price.tsx:17` | `<span>{price}</span>` updating live | add `tabular-nums` | proportional digits make the changing value jitter |
| LOW | `src/card.css:11` | 16px radius on card and inner image, 8px padding | card 24px, image 16px | nested radii should be concentric |

- **HIGH:** makes an interaction inaccessible, misleading, unreadable or repeatedly disruptive.
- **MEDIUM:** a noticeable usability or consistency problem.
- **LOW:** isolated polish; `full` mode only.

Consolidate a systemic issue into one row listing all locations. Omit principles with no findings; never pad.

### Considered but rejected

List 1–3 (quick) or 2–5 (full) real candidates you decided not to change, and why. This shows judgement and stops churn. Don't invent filler.

### Verification and verdict

List the exact interactions and checks performed and their results. Review motion at 10 % speed (see `interaction-and-motion.md`). Then give the verdict:

- **Block** if any HIGH finding remains;
- **Needs changes** if only MEDIUM or LOW remain;
- **Approve** only when nothing actionable remains.

List every unverified check beside the verdict.

## After the review

Recommend next steps in priority order and map them to the routes in `SKILL.md` (polish, bolder, quieter, distill, clarify, harden, redesign). Ask the user which to run. Re-run the same review after fixes so scores are comparable.
