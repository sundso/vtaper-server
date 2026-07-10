# V-Taper Log

Single-file React (CDN + Babel standalone) PWA workout tracker in `index.html`, backed by a
small API (`src/`). Styling is a **token-based design system** — one dark theme, no theme
switching.

## Design system — READ BEFORE ANY UI WORK

All styling is driven by CSS custom-property **tokens** declared once on `.tracker-root`.
When adding or changing any UI:

- **Consume tokens, never hardcode** colors/radius/fonts/borders. See the full token
  contract and palette in **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)**.
- Any new shape/color need → add a token to the contract, don't inline a raw value.

## Conventions
- Component CSS classes are prefixed `tracker-`.
- Numbers (reps/weights/timers) use `--font-mono`; UI text uses `--font-body`.
