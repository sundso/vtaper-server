# V-Taper Design System

The app is skinned entirely through **CSS custom properties (design tokens)** declared on
`.tracker-root` in `index.html`. Every surface reads from tokens, so switching the
`data-theme` attribute on the root reskins the whole app — no per-component rewrites.

There are currently **three themes**: `sundso` (default), `8bit`, and `dark`. Adding more
is a copy-paste of one token block (see [Adding a theme](#adding-a-theme)).

```
.tracker-root                     ← token contract + defaults (= "sundso" theme)
.tracker-root[data-theme="8bit"]  ← override block for the 8-bit theme
.tracker-root[data-theme="dark"]  ← override block for dark mode (color only)
```

The active theme lives in React state (`theme`), is persisted to
`localStorage["vtaper_theme"]`, and is applied as `data-theme={theme}` on every
`.tracker-root`. The header button cycles through `THEMES` (`cycleTheme`) and shows the
current theme's icon (🛋 / 🎮 / 🌙).

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

## Theme: `sundso` (default) — IKEA-inspired

White surfaces on a light canvas, blue + yellow accents, soft rounded corners, soft shadows.

| Token | Value |
|---|---|
| bg / panel / panel-2 / panel-3 | `#f5f5f5` / `#ffffff` / `#f2f2f3` / `#dedede` |
| text / text-muted | `#111111` / `#6b6b6b` |
| brass / green / rust / yellow | `#0058a3` / `#0a8a00` / `#cc0008` / `#ffdb00` |
| fonts | Noto Sans (display+body) / Noto Sans Mono |
| radius card/ctl/pill | `12px` / `6px` / `22px` |
| border-w | `1px` |
| shadow-card | `0 1px 3px rgba(0,0,0,0.06)` |

## Theme: `8bit` — Pixel Gamer

Sky-blue canvas, cream panels, brown ink, arcade fonts, **zero radius**, thick borders,
hard "pixel" offset shadows, uppercase titles, tactile press effect on buttons.

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

## Theme: `dark`

Same IKEA shape/type language as `sundso`, inverted palette. Demonstrates a **color-only**
theme — it overrides just the color tokens and `--shadow-card`, inheriting every shape and
font default from the contract.

| Token | Value |
|---|---|
| bg / panel / panel-2 / panel-3 | `#0f1115` / `#1a1d23` / `#242832` / `#363b47` |
| text / text-muted | `#e8eaed` / `#9aa0ac` |
| brass / green / rust / yellow | `#4a9eff` / `#3ecf8e` / `#ff5c5c` / `#ffd34e` |
| fonts / shape | inherited from contract (Noto Sans, rounded) |
| shadow-card | `0 1px 3px rgba(0,0,0,0.4)` |

> **Font note:** the reference "Pixel Gamer" font is a paid Ditatype font. These are the
> closest free Google Fonts. Press Start 2P is tall/wide, so the 8-bit block shrinks the
> arcade headings (`.tracker-onboard-title`, `.tracker-brand`, `.tracker-phase-name`) and
> bumps `--font-mono` (VT323) up a couple px to stay legible.

---

## Rules of the road

- **Never hardcode** a color, radius, font, or border in a component. Add/consume a token.
- **Numbers use `--font-mono`** — reps, weights, timers, set numbers. Text uses `--font-body`.
- **`--accent-brass` = the single primary color.** Active tabs, active day, primary buttons,
  focused inputs, chart line all use it. Don't introduce a second "primary."
- **`--accent-rust` = destructive/warning only.** Reset, logout confirm, deload banner.
- If a new surface needs a shape not covered, add a *new token* (e.g. `--radius-xl`) to the
  contract and define it in **both** themes — don't one-off a raw value.

## Adding a theme

1. Copy the `.tracker-root[data-theme="8bit"]` block, rename to your theme id.
2. Override every token in the [contract](#token-contract). If a font isn't already in the
   `@import` at the top of the `<style>`, add it there.
3. Add the id to `cycleTheme` in `index.html` (or make it a select if you go past two).
4. Add font-size overrides only if your display font overflows (like the 8-bit block does).
5. Document it here with a token table.
