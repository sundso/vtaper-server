# V-Taper Design System

The app is skinned entirely through **CSS custom properties (design tokens)** declared once
on `.tracker-root` in `index.html`. Every surface reads from tokens — never a raw hex,
radius, or font — so the whole app stays visually consistent as it grows.

There is a **single theme**: a dark, color-blocked look inspired by modern fitness-app UI —
near-black canvas, bold rounded cards, a saturated purple primary, pill-shaped buttons and
nav, and a small set of semantic accent colors instead of literal color names.

```
.tracker-root   ← the entire token contract + values (no data-theme switching)
```

---

## Token contract

Components only ever reference these names — never a raw hex, radius, or font.

### Color
| Token | Value | Role |
|---|---|---|
| `--bg` | `#000000` | App canvas behind everything |
| `--panel` | `#17171b` | Primary surface (cards, header) |
| `--panel-2` | `#1f1f25` | Recessed surface (inputs, chips, tab track) |
| `--panel-3` | `#2c2c33` | Tertiary fills, dividers |
| `--text` | `#f5f5f7` | Primary text / ink |
| `--text-muted` | `#8d8d96` | Secondary text, captions |
| `--accent-primary` | `#8b7ff5` | **Primary** — active states, links, primary buttons, numbers |
| `--accent-secondary` | `#f3a94e` | Highlight/informational — warm-up cues, "+1 set" badges |
| `--accent-success` | `#3ecf8e` | Success / "done" (save toast, completed timer) |
| `--accent-danger` | `#ff5c72` | Destructive / error / deload signal |

### Type
| Token | Value | Role |
|---|---|---|
| `--font-display` | Manrope (700/800) | Titles, brand, phase name |
| `--font-body` | Inter | All UI text, buttons, labels |
| `--font-mono` | JetBrains Mono | Numbers: reps, weights, set #, timers |

### Shape
| Token | Value | Role |
|---|---|---|
| `--radius-card` | `24px` | Cards, phase banner, confirm panels |
| `--radius-ctl` | `14px` | Inputs, selects, small controls |
| `--radius-pill` | `999px` | Buttons, day chips, nav, badges |
| `--border-w` | `1px` | Reserved for focus rings — most surfaces are borderless, separated by color/elevation instead |
| `--shadow-card` | `0 10px 30px rgba(0,0,0,0.45)` | Card elevation off the black canvas |

---

## Rules of the road

- **Never hardcode** a color, radius, font, or border in a component. Add/consume a token.
- **Numbers use `--font-mono`** — reps, weights, timers, set numbers. Text uses `--font-body`.
- **`--accent-primary` = the single primary color.** Active tabs, active day, primary buttons,
  focused inputs, chart line, set numbers all use it. Don't introduce a second "primary."
- **`--accent-secondary` = highlight, not danger.** Warm-up cues, informational badges —
  things worth noticing but not destructive.
- **`--accent-danger` = destructive/error only.** Reset, logout confirm, delete, login error,
  deload banner.
- **Cards are mostly borderless.** Distinguish surfaces with `--panel`/`--panel-2`/`--panel-3`
  background contrast and `--shadow-card`, not borders. Reach for a tinted background
  (e.g. `rgba(243,169,78,0.12)` for a secondary-accent card) rather than a colored border.
- If a new surface needs a shape not covered, add a *new token* to the contract rather than
  inlining a value — e.g. `--radius-xl` if something needs to be rounder than a card.

## Extending the palette

If a feature needs another semantic color (e.g. an "info" accent), add it as
`--accent-<role>` describing what it *means*, not what it looks like — matches
`--accent-primary` / `--accent-secondary` / `--accent-success` / `--accent-danger`. Document
it in the table above.
