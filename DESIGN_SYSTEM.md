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
| `--avatar-bg` | `#e8e8ec` | Light circle behind exercise movement icons — the one deliberate light surface against the dark canvas |
| `--avatar-fg` | `#17171b` | Stroke/fill of the movement icon on `--avatar-bg` |

### Type
| Token | Value | Role |
|---|---|---|
| `--font-display` | Manrope (700/800) | Titles, brand, phase name |
| `--font-body` | Inter | All UI text, buttons, labels |
| `--font-mono` | JetBrains Mono | Numbers: reps, weights, set #, timers |

### Type scale

A standard 8-step size scale plus 3 weights. Every `font-size`/`font-weight` in the app reads
from one of these — never a raw `px` or numeric weight.

| Token | Value | Role |
|---|---|---|
| `--text-2xs` | `10px` | Micro uppercase labels (set-row head, day-of-week), tiny badges |
| `--text-xs` | `11px` | Captions — muted secondary lines, hints, timestamps |
| `--text-sm` | `12px` | Default secondary/support text — notes, descriptions, list rows |
| `--text-md` | `13px` | Emphasized secondary text — tab labels, alt-row labels, info titles |
| `--text-base` | `14px` | Primary body & control text — buttons, inputs, card titles, selects |
| `--text-lg` | `16px` | Headings — brand wordmark, sheet titles |
| `--text-xl` | `20px` | Section titles — phase name |
| `--text-2xl` | `26px` | Display/hero text — onboarding title |

| Token | Value | Role |
|---|---|---|
| `--weight-semibold` | `600` | Tabs, secondary emphasis, labels |
| `--weight-bold` | `700` | Buttons, card titles, badges |
| `--weight-black` | `800` | Display/heading text — always paired with `--font-display` |

### Spacing

| Token | Value | Role |
|---|---|---|
| `--space-page` | `16px` | Outer/section padding — header, body, sheets, banners |
| `--space-card` | `12px` | Internal card padding — card head/body, confirm panels |

### Shape
| Token | Value | Role |
|---|---|---|
| `--radius-card` | `24px` | Cards, phase banner, confirm panels |
| `--radius-ctl` | `14px` | Inputs, selects, small controls |
| `--radius-pill` | `999px` | Buttons, day chips, nav, badges |
| `--border-w` | `1px` | Reserved for focus rings — most surfaces are borderless, separated by color/elevation instead |
| `--shadow-card` | `0 10px 30px rgba(0,0,0,0.45)` | Card elevation off the black canvas |

### Exercise movement icons

Every exercise card and library row shows a small round avatar (`.tracker-ex-avatar`,
`--avatar-bg`/`--avatar-fg`) with a line-art pictogram of the movement. There is no
photo/illustration library to draw from, so icons are per **movement pattern**
(`MOVEMENT_ICON_SHAPES` in `index.html` — press-incline, row, curl, squat, hip-hinge,
etc.), not per exercise name — dozens of named variations share a pattern and so share
an icon. `getExerciseIcon(name, target)` maps a name/target to one of these; it checks
name keywords that cut across muscle groups first (a squat is a squat whether it's
tagged Quads, Glutes, or Adductors), then falls back to a per-target default. Adding a
new exercise needs no icon work unless it's a genuinely new movement pattern — extend
`MOVEMENT_ICON_SHAPES` and `getExerciseIcon`'s heuristic in that case, matching the
existing pictograms' style (24×24 viewBox, `currentColor`-independent stroke via
`--avatar-fg`, ~5-7 line/circle primitives).

---

## Rules of the road

- **Never hardcode** a color, radius, font, font-size, font-weight, border, or padding in a
  component. Add/consume a token.
- **Numbers use `--font-mono`** — reps, weights, timers, set numbers. Text uses `--font-body`.
- **Type scale is semantic, not literal.** Pick a `--text-*` token by the role the text plays
  (body vs. caption vs. heading), not by eyeballing a pixel size. If nothing fits, add a new
  rung to the scale rather than inlining a size.
- **Card padding is `--space-card` (12px), page/section padding is `--space-page` (16px).**
  A card without a `.tracker-card-head` above its body needs `.tracker-card-body-standalone`
  for top padding — don't inline a `paddingTop`.
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
