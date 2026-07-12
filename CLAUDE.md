# V-Taper Log

Single-file React (CDN + Babel standalone) PWA workout tracker in `index.html`, backed by a
small API (`src/`). Styling is a **token-based design system** — dark (default) and light
themes, switched via `data-theme` on `<html>` and a header toggle.

## Design system — READ BEFORE ANY UI WORK

All styling is driven by CSS custom-property **tokens** declared once on `.tracker-root`.
When adding or changing any UI:

- **Consume tokens, never hardcode** colors/radius/fonts/borders. See the full token
  contract and palette in **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)**.
- Any new shape/color need → add a token to the contract, don't inline a raw value.

## Training logic — READ BEFORE TOUCHING PROGRAM OR EXERCISE_LIBRARY

The workout program, periodization, and exercise-substitution scoring encode real training
decisions, not arbitrary defaults. See **[GYM_KNOWLEDGE.md](GYM_KNOWLEDGE.md)** before
adding exercises, changing sets/reps/rest, or extending the phase cycle — it documents the
*why* behind the split, the 24-week phase table, and the exercise-library scoring
methodology so new additions stay consistent with the rest of the program.

## Conventions
- Component CSS classes are prefixed `tracker-`.
- Numbers (reps/weights/timers) use `--font-mono`; UI text uses `--font-body`.
