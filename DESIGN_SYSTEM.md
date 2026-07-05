# V-Taper Design System

The app is skinned entirely through **CSS custom properties (design tokens)** declared on
`.tracker-root` in `index.html`. Every surface reads from tokens, so switching the
`data-theme` attribute on the root reskins the whole app — no per-component rewrites.

There are **two themes**: `8bit` (default) and `dark`. Adding more is a copy-paste of one
token block (see [Adding a theme](#adding-a-theme)).

```
.tracker-root                     ← token contract + defaults (= "8bit" theme)
.tracker-root[data-theme="dark"]  ← self-contained override block for dark mode
```

The active theme lives in React state (`theme`), is persisted to
`localStorage["vtaper_theme"]`, and is applied as `data-theme={theme}` on every
`.tracker-root`. The header button cycles through `THEMES` (`cycleTheme`) and shows the
current theme's icon (🎮 / 🌙).

---

## Token contract

Every theme MUST define all of these. Components only ever reference these names —
never a raw hex, radius, or font.

### Color
| Token | Role |
|---|---|
| `--bg` | App canvas behind panels |
| `--panel` | Primary surface (cards, header) |
| `--panel-2` | Recessed surface (inputs, chips, banners) |
| `--panel-3` | Borders + tertiary fills |
| `--text` | Primary text / ink |
| `--text-muted` | Secondary text, captions |
| `--accent-brass` | **Primary** action + links + active state |
| `--accent-green` | Success / "done" (completed sets, running→done) |
| `--accent-rust` | Danger / destructive / deload signal |
| `--accent-yellow` | Decorative accent (header underline stripe) |

### Type
| Token | Role |
|---|---|
| `--font-display` | Titles, brand, phase name |
| `--font-body` | All UI text, buttons, labels |
| `--font-mono` | Numbers: reps, weights, set #, timers |
| `--title-transform` | `text-transform` for titles (`none` / `uppercase`) |
| `--title-spacing` | `letter-spacing` for the big onboard title |

### Shape
| Token | Role |
|---|---|
| `--radius-card` | Cards, banners, confirm panels |
| `--radius-ctl` | Inputs, icon buttons, selects, small controls |
| `--radius-pill` | Primary button, day buttons, preset chips |
| `--border-w` | Standard border width |
| `--shadow-card` | Card elevation |
| `--btn-shadow` | Primary-button shadow (hard offset in 8-bit) |
| `--btn-press` | `transform` applied on `:active` (8-bit press effect) |

---

## Theme: `8bit` (default) — Pixel Gamer

Sky-blue canvas, cream panels, brown ink, arcade fonts, **zero radius**, thick borders,
hard "pixel" offset shadows, uppercase titles, tactile press effect on buttons.
Lives directly on `.tracker-root` (it's the default block).

| Token | Value |
|---|---|
| bg / panel / panel-2 / panel-3 | `#86c5e0` / `#f6ecd0` / `#ece0be` / `#c9b78d` |
| text / text-muted | `#3d2b23` / `#866b58` |
| brass / green / rust / yellow | `#2f6f97` / `#6a8f3c` / `#d1544a` / `#f4c542` |
| fonts | Press Start 2P (display) / Pixelify Sans (body) / VT323 (mono) |
| radius card/ctl/pill | `0` / `0` / `0` |
| border-w | `2px` |
| shadow-card / btn-shadow | `3px 3px 0 var(--text)` |
| titles | `uppercase` |

> **Font note:** the reference "Pixel Gamer" font is a paid Ditatype font. These are the
> closest free Google Fonts. Press Start 2P is tall/wide, so
> `.tracker-root:not([data-theme="dark"])` rules shrink the arcade headings
> (`.tracker-onboard-title`, `.tracker-brand`, `.tracker-phase-name`) and bump
> `--font-mono` (VT323) up a couple px to stay legible.

## Theme: `dark` — clean modern dark mode

Self-contained: rounded corners, soft shadows, Noto Sans. Overrides the pixel defaults
completely (color **and** shape **and** type), so nothing 8-bit leaks through.

| Token | Value |
|---|---|
| bg / panel / panel-2 / panel-3 | `#0f1115` / `#1a1d23` / `#242832` / `#363b47` |
| text / text-muted | `#e8eaed` / `#9aa0ac` |
| brass / green / rust / yellow | `#4a9eff` / `#3ecf8e` / `#ff5c5c` / `#ffd34e` |
| fonts | Noto Sans / Noto Sans Mono |
| radius card/ctl/pill | `12px` / `6px` / `22px` |
| border-w / shadow-card | `1px` / `0 1px 3px rgba(0,0,0,0.4)` |
| titles | normal case |

---

## Rules of the road

- **Never hardcode** a color, radius, font, or border in a component. Add/consume a token.
- **Numbers use `--font-mono`** — reps, weights, timers, set numbers. Text uses `--font-body`.
- **`--accent-brass` = the single primary color.** Active tabs, active day, primary buttons,
  focused inputs, chart line all use it. Don't introduce a second "primary."
- **`--accent-rust` = destructive/warning only.** Reset, logout confirm, deload banner.
- If a new surface needs a shape not covered, add a *new token* (e.g. `--radius-xl`) to the
  contract and define it in **every** theme block.

## Adding a theme

1. Copy the `.tracker-root[data-theme="dark"]` block (it's a full, self-contained override —
   the safest starting point) and rename to your theme id.
2. Override every token in the [contract](#token-contract). If a font isn't already in the
   `@import` at the top of the `<style>`, add it there.
3. Add the id to the `THEMES` array and `THEME_ICON` map in `index.html` (`App` component).
4. Add font-size overrides only if your display font overflows (like the 8-bit `:not([dark])`
   rules do).
5. Document it here with a token table.

> The **default** theme is whatever sits directly on `.tracker-root`. To change the default,
> move those token values; keep the others as `[data-theme="…"]` override blocks.
