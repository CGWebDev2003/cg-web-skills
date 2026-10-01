# States and hardening

A design that only works with perfect content on a fast connection is a mock-up. Hardening makes it survive real content, real languages, real errors and real users.

## 1. Assess

For each surface, list what can actually happen: content ranges (shortest and longest), languages, user roles, slow or failing networks, empty data, permission limits, and input methods (mouse, keyboard, touch, screen reader). Fix what the product can really encounter, not hypothetical extremes.

## 2. Every interactive state

Every control needs, where applicable:

| State | Requirement |
| --- | --- |
| Default | clearly recognisable as interactive |
| Hover | subtle change, only on hover-capable devices |
| Focus-visible | strong, on-brand, 3:1 contrast, never removed |
| Active / pressed | immediate feedback |
| Disabled | visibly inactive, with a reason nearby when it isn't obvious; prefer explaining over disabling |
| Loading | the control shows progress and cannot be triggered twice |
| Error | message next to the problem, with the way out |
| Success | confirmation of what happened and what comes next |

## 3. Page and data states

- **Loading:** skeletons that match the final layout (no shift), or a spinner with text when the wait is long. Avoid flashing a loader for very short waits.
- **Empty:** explain why it is empty and offer the next action. A first-time empty state is an onboarding moment, not a blank.
- **Error:** what went wrong, whether data was lost, and how to retry. Keep the user's input.
- **Partial:** some content loaded, some failed. Show what you have.
- **Offline or slow:** forms that fail gracefully, no infinite spinners.
- **404 and 500 pages:** designed, on-brand, with navigation and a search or useful links.

## 4. Text overflow and wrapping

- Test the longest realistic headline, name, button label and navigation item at the narrowest width.
- Use `min-width: 0` on flex and grid children that contain text, so they can shrink.
- Truncate only where the full text is available elsewhere (tooltip, detail page). Use `line-clamp` for previews, never for essential content.
- `overflow-wrap: anywhere` for user content, URLs and email addresses; `hyphens: auto` with the correct `lang` for German.
- Buttons and navigation must survive a label twice as long as the design copy.

## 5. Internationalisation

- German text runs roughly 30 % longer than English and contains long compound words; other languages can run 40 % longer.
- Use logical CSS properties (`margin-inline-start`, `padding-block`) so right-to-left layouts work if they are ever needed.
- Format dates, numbers, currencies and phone numbers with `Intl` for the locale (`1.234,56 €` in Germany).
- Never bake text into images, and never build sentences by concatenating fragments.
- Set `lang` on the document and on passages in other languages.

## 6. Forms

- Visible labels, programmatically linked. Placeholders are examples only.
- Correct `type`, `inputmode` and `autocomplete` attributes so mobile keyboards and password managers help.
- Validate on submit and on blur, not on every keystroke. Show errors next to the field and summarise them at the top for long forms, moving focus to the summary.
- Never clear the form on error. Prevent double submission.
- Explain why sensitive data is needed and link the privacy policy where data is collected.
- Confirm success on the page, with what happens next.

## 7. Edge cases and resilience

- Images that fail to load: alt text plus a reserved, tidy space.
- Missing optional content (no photo, no description): the layout still holds.
- One item, many items, no items.
- Very large numbers, negative numbers, zero.
- JavaScript disabled or failed: content still visible, links still work, forms degrade sensibly.
- 200 % zoom and 400 % reflow, Windows high-contrast mode (`forced-colors`), increased text spacing.
- Third-party failures (maps, booking widgets, embeds) don't break the page.

## 8. Verify

Walk each critical path with long content, no content, a slow network (DevTools throttling), keyboard only and at the narrowest width. Every state listed above should be reachable and look designed, not accidental.
