# V-Taper Log

Single-file React (CDN + Babel standalone) PWA workout tracker in `index.html`, backed by a
small API (`src/`). Styling is a **token-based, multi-theme design system**.

## Design system — READ BEFORE ANY UI WORK

All styling is driven by CSS custom-property **tokens** on `.tracker-root`, switched via a
`data-theme` attribute. Two themes exist: `8bit` (default, Pixel Gamer) and `dark` (clean
modern dark mode). When adding or changing any UI:

- **Consume tokens, never hardcode** colors/radius/fonts/borders. See the full token
  contract, both palettes, and the "adding a theme" recipe in **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)**.
- Any new shape/color need → add a token and define it in **every** theme block.
- The active theme is React state persisted to `localStorage["vtaper_theme"]`, toggled by the
  header button (`cycleTheme`).

## Conventions
- Component CSS classes are prefixed `tracker-`.
- Numbers (reps/weights/timers) use `--font-mono`; UI text uses `--font-body`.
