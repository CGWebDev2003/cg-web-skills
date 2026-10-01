# Refinement moves

Named moves for improving a design that already exists. They give the user and you a shared vocabulary: "make the services section bolder", "make the homepage quieter", "distill the pricing page", "polish the contact form".

All moves share three rules:

- **Scope is sovereign.** Touch only the named target. Everything outside it stays as it is: neighbours, system tokens, copy and behaviour.
- **Stay inside the system.** Don't add colours, fonts, radii, shadows or components the site doesn't already own. If the system genuinely can't express what's needed, ask before expanding it, and name the exact addition and its job.
- **Keep content true.** Existing claims stay unless the user supplies replacements. If the move needs evidence that doesn't exist, ask for it.

If the problem is the concept itself, say so and recommend a redesign instead of disguising one as a refinement.

## Bolder: amplify a flat design

A flat section usually opts out of the strongest moves its own system already makes elsewhere. The reflex answer, adding effects, is the opposite of bold.

1. Find what the rest of the site does that this section doesn't: the display type at full strength, the signature motif, the structural devices, the density and pacing.
2. Bring the target up to that level in the system's own vocabulary. The bolder version should look more like the same brand, not less.
3. Commit to one decisive move completely, then quiet everything around it so the move is legible. If every element gets louder, the section gets flatter.
4. Give the section its own rhythm: a peak in the scroll, a change of density or scale, not more of the same.
5. **Skeleton test:** remove the copy and look at the bare structure. If the boldness only exists in large text, it isn't in the design yet.

## Quieter: tone down a loud design

Quiet is harder than loud: subtlety needs precision. Quieter must not mean generic.

1. Find the sources of intensity: saturation, extreme contrast everywhere, too many heavy weights, motion excess, decoration, everything at the same large scale.
2. Decide what stays bold (very little) and what recedes.
3. Reduce:
   - **Colour:** fewer hues, lower chroma, neutrals do more work, accent reserved for action and the one focal moment.
   - **Weight:** step heavy weights down (900 → 600, 700 → 500) where hierarchy survives it.
   - **Decoration:** remove borders, shadows, backgrounds and patterns that don't carry hierarchy or function.
   - **Motion:** remove scroll reveals and hover effects that don't communicate; keep feedback.
   - **Composition:** more air, more alignment, fewer competing focal points.
4. On Persuade and Experience surfaces the point of view stays; only the volume drops. On Operate and Read surfaces the interface should recede into the task.

## Distill: strip to the essence

Simplicity is removing obstacles between users and their goal, not removing features.

1. Name the one primary goal of the surface. Everything else is secondary or removable.
2. Find the complexity: competing actions, repeated information, excessive variation (too many sizes, colours, styles), everything visible at once, unnecessary containers.
3. Edit:
   - **Content:** remove what is said elsewhere; merge what belongs together; move secondary details behind clear progressive disclosure.
   - **Actions:** one primary action, few secondary ones.
   - **Visuals:** fewer colours, fewer type sizes, no wrappers that only add borders; never cards inside cards.
   - **Layout:** prefer a clear linear flow over complex grids when the content is linear.
4. Write down what was removed and why, so it can be restored deliberately if it turns out to be needed.

## Delight: add a moment of character

Delight is product character revealed through a useful interaction or a considered detail, not generic whimsy.

1. Find a moment that earns it: effort worth acknowledging, a wait that can inform, a first-use or empty state, an error that needs empathy, a discovery.
2. Write one sentence: what should the visitor feel, and why does that feeling belong to this product?
3. Choose the smallest means: a precise word, a recognisable transition, a detail from the subject's world, a well-timed confirmation.
4. Protect the experience: never delay or obscure the task, never fake progress, never joke about money, privacy or lost work, keep it pleasant on the hundredth repetition, and respect reduced motion and sound settings.

A neighbouring company should not be able to use the same moment unchanged.

## Polish: the final pass

Polish is refinement, never a hidden redesign.

1. **Establish the system.** Read `DESIGN.md`, tokens and shared components. Classify each drift: missing token, one-off implementation, conceptual mismatch or local defect (see `engineering-quality.md`).
2. **Gather evidence.** Use the page yourself at desktop and mobile widths, with keyboard and touch, with real and extreme content.
3. **Triage in this order:**
   1. broken or blocked tasks, data loss, misleading states, inaccessible paths;
   2. missing loading, empty, error, success and disabled states;
   3. flow, hierarchy, responsive and design-system drift;
   4. visual and motion inconsistencies (`typography.md`, `surfaces-and-details.md`, `interaction-and-motion.md`);
   5. code and asset clean-up.
4. **Polish the whole path,** not one corner. A perfect hero above an unfinished form is not polished.
5. **Finish with the source.** Remove debug output, dead code, unused styles and duplication the pass created. Promote genuinely repeated values to tokens.
6. **Report** in the polish-review format from `critique-and-audit.md`.
