# Interaction and motion

Motion explains state, relationship and hierarchy, or creates one authored moment the surface has earned. Decoration without purpose is animation debt. This reference covers the interaction layer every website needs. For motion systems, scroll choreography, GSAP timelines, View Transitions, Lottie, Rive or WebGL, hand off to `cg-web-animate` when it is installed.

## 1. Find the job first

Motion is justified only where it:

- acknowledges an action (press, submit, toggle);
- makes a state change or spatial relationship legible (open, close, expand, move);
- preserves continuity through navigation or layout change;
- directs attention at a meaningful moment;
- embodies the chosen visual world in one signature moment.

Write a short motion plan before implementing: the **focal moment** (one, if any), the **continuity** changes that need explaining, the **feedback** that needs acknowledging, and the **budget** (what may be expensive and how often it runs). A generic fade-and-rise, hover lift or scroll reveal is not a focal moment.

By visitor mode:

- **Persuade and Experience:** motion may carry the voice. Prefer one rehearsed focal sequence to repeated section reveals.
- **Operate and Read:** motion serves feedback and continuity. Keep it fast and never make users wait through choreography.

## 2. Frequency decides intensity

The more often an interaction happens, the less animation it gets. The attention cost repeats every time.

| Frequency | Examples | Motion |
| --- | --- | --- |
| Constant | typing, row hover, scrolling, tab switching | none, or an instant colour/opacity change ≤ 150ms |
| Frequent | buttons, toggles, dropdowns, accordions | short, quiet, interruptible |
| Occasional | dialogs, drawers, page transitions, form success | a clear but brief transition |
| Rare | first load of the hero, a completed booking, an empty state | may be authored and slightly longer |

Motion is never the only feedback channel. Every animated state change also needs a static cue: colour, icon, label or position.

## 3. Timing and easing

Duration expresses distance and consequence. A sensible default scale (adapt it to the project, but keep one scale):

| Token | Value | Typical use |
| --- | --- | --- |
| `--motion-instant` | 100ms | colour and opacity feedback, press |
| `--motion-quick` | 150ms | closing small surfaces, text and icon swaps, tooltips |
| `--motion-base` | 220–250ms | opening dropdowns and dialogs, tabs, accordions |
| `--motion-slow` | 350–400ms | drawers and panels, page transitions, content reveals |
| `--motion-focal` | 500–800ms | one authored focal entrance |
| `--motion-stagger` | 30–50ms | offset between list items |

Easing:

- **Arrivals and surface motion:** a strong ease-out such as `cubic-bezier(0.22, 1, 0.36, 1)` or `cubic-bezier(0.16, 1, 0.3, 1)`. Things decelerate into place.
- **In-place swaps** (text, icons, content cross-fades): a gentle `ease-in-out`.
- **Loops** (shimmer, spinners): `linear`.
- **Overshoot and bounce:** only for small celebratory entrances on a playful brand. Never on closes, never by reflex.
- Avoid `ease-in` for anything entering; it feels sluggish at the start.

Match tokens on **usage**, not on the nearest number. A 300ms dialog close is wrong because closes should be quick, not because 300 is off-grid.

## 4. Rules that make motion feel right

### Opens and closes are asymmetric

Opening is an invitation; closing should get out of the way. Close faster and quieter than you open: a dialog that opens in 250ms closes in about 150ms; a drawer that opens in 400ms closes in about 300–350ms. The entrance carries the distance and blur; the exit can shrink or drop them.

Some motions are one reversible movement and stay symmetric: tabs and segmented controls, accordions, side-by-side page slides, icon and text swaps.

### Hover in and hover out

Hover in is quick and direct. Hover out may be equally quick or slightly softer. Never delay a hover-out or a close: dismissal must feel instant. On touch devices, guard hover effects with `@media (hover: hover) and (pointer: fine)`.

### Stagger and delay

- Stagger only content that appears as a group on an occasional entrance (a hero's headline, subline and action; an empty state). Split into semantic chunks, offset each by roughly 40–100ms.
- Keep the **total** stagger under about 300ms. For long lists, stagger only the first few items or shrink the offset.
- Use delay only to filter accidental triggers (a tooltip waiting ~80ms so a passing cursor doesn't open it) or to sequence two things. If motion feels late, shorten the duration instead of adding delay.

### Interruptible by default

Use CSS **transitions** for interactive state (hover, open/close, toggle): they retarget mid-flight when the user changes their mind. Reserve **keyframe animations** for one-shot sequences (a first-load entrance, a loader). A keyframe drawer that restarts or snaps when clicked twice feels broken.

### Small distances, small scales

- UI travel distances are small: 4px for in-place text swaps, 8–12px for reveals and page slides, more only for drawers and panels that actually travel. Distances above ~40px on anything but a panel read as sluggish.
- Surfaces scale from close to 1: dialogs from about 0.96, dropdowns from about 0.97, tooltips from about 0.98. Anything below ~0.9 reads as a zoom, not an opening.
- Origin-aware: dropdowns and popovers grow from their trigger (`transform-origin` on the trigger side); dialogs grow from the centre.
- A light blur (2–4px) can soften swaps and slides. Don't blur plain fades or colour changes.

### Press feedback

A subtle `scale(0.96)` on `:active` gives buttons a tactile response. Don't go below 0.95; it looks exaggerated. Provide a way to switch it off for controls where it would distract (large surfaces, drag handles).

### Icon and state swaps

When two icons share a slot (copy → copied, play → pause, menu → close), cross-fade them instead of toggling visibility: scale from about 0.25 to 1, opacity 0 to 1, blur about 4px to 0. Without a motion library, keep both icons in the DOM (one absolutely positioned) and cross-fade with CSS transitions. With Motion/Framer Motion, use a spring with no bounce.

### No animation on first render

Content that is already there on page load should not animate in just because the component mounted (for example `initial={false}` on `AnimatePresence`). Keep content visible in its default state, so failed scripts never hide the page.

## 5. Patterns for common components

| Component | Pattern |
| --- | --- |
| Dropdown, popover, menu | Fade + scale from ~0.97 at the trigger origin; quick close |
| Dialog | Fade + scale from ~0.96 at centre, backdrop fade; quick close; focus moves in and returns on close |
| Drawer, side panel | Slide from its edge with ease-out; slightly quicker close |
| Accordion, disclosure | Animate `grid-template-rows: 0fr → 1fr` (padding on the inner element, not the track); flip the chevron with a transform |
| Tabs, segmented control | A single indicator that slides between options; set the first position without a transition |
| Tooltip | Small delay in, instant or very quick out; travels between adjacent triggers without re-delaying |
| Toast, notification | Rise from the edge with fade; leaves faster than it arrived; pause timers on hover and focus |
| Text or number change | Short swap with a small vertical offset; tabular numerals |
| Form error | Colour, icon and message change; a short shake only as an extra cue, never alone |
| Success | One clear confirmation (check draw, colour change) with text; no full-screen celebration for routine actions |
| Skeleton → content | Pulse the placeholder, then cross-fade to content without layout shift |
| Page or step change | Side-by-side slide for forward/back flows; View Transitions where supported |

Prefer the lower-overhead option when two could fit: a dropdown over a dialog, an inline confirmation over a modal celebration.

## 6. Performance rules

- Animate `transform` and `opacity` by default. Filters, clip-paths, masks and shadows are fine when bounded to small regions and verified smooth.
- Avoid animating layout properties (`width`, `height`, `top`, `left`, `margin`). Use transforms, FLIP or the grid-rows technique.
- **Never `transition: all`** (or Tailwind's `transition-all`). Name the properties that change: `transition-property: opacity, scale`.
- Use `will-change` only on elements that actually animate, only for `transform`, `opacity` or `filter`, and only when you see first-frame stutter. Never `will-change: all`, never on everything.
- Pause or stop non-essential loops when off-screen or in a hidden tab.

## 7. Reduced motion

Every animation needs a designed `prefers-reduced-motion: reduce` path. Reduced motion means less spatial movement, not no feedback: replace slides, zooms, parallax and scroll-linked movement with instant changes or short opacity fades, and keep state changes legible. A global `animation-duration: 0.01ms` kill switch is a fallback, not a design. Respect autoplay and sound preferences, and give any looping or auto-advancing content a pause control.

## 8. If the project uses GSAP

GSAP is free, including all former Club plugins, and is a good choice for timelines, scroll-linked sequences, SVG and text effects. When it is the right tool:

- Register plugins once (`gsap.registerPlugin(ScrollTrigger)`).
- Use `gsap.matchMedia()` for breakpoints **and** `prefers-reduced-motion`, so reduced-motion users get a different animation, not the same one.
- In React, use `useGSAP()` with a scoped ref so everything is reverted on unmount; elsewhere use `gsap.context()` and call `revert()` on teardown.
- Put a ScrollTrigger on a timeline or a top-level tween, never on a child tween inside a timeline. Don't combine `scrub` and `toggleActions` on one trigger.
- Call `ScrollTrigger.refresh()` after layout changes (fonts, images, dynamic content), and kill triggers when leaving a route.
- Animate `x`, `y`, `scale`, `rotation` and `autoAlpha` instead of `left`, `top`, `width` and `height`. Use `gsap.quickTo()` for pointer-following values.
- Remove `markers: true` before shipping.

Do not add GSAP (or any library) for an effect CSS can express cleanly.

## 9. Review motion at 10 % speed

When reviewing, slow animations to 10 % in the browser's Animations panel and walk every state: hover, focus, active, open, close, loading, empty, error. What looks slightly wrong at 10 % is what feels subtly off at full speed. Check that opens and closes are asymmetric, nothing jumps at the start or end, nothing restarts when interrupted, and nothing animates on page load that shouldn't.
