---
name: design-system
description: Use before writing or reviewing ANY UI/CSS change in index.html — new components, restyled elements, new colors, radii, or fonts. Enforces the token-based design system so nothing gets hardcoded outside the token contract.
---

# Design System

V-Taper Log has one dark theme, driven entirely by CSS custom-property tokens
declared once on `.tracker-root` in `index.html`. Read the full contract in
[DESIGN_SYSTEM.md](../../../DESIGN_SYSTEM.md) before touching any UI.

## Before writing UI code

1. Open `DESIGN_SYSTEM.md` and check the token contract (color / type / shape tables).
2. Never hardcode a hex color, border-radius, or font — consume the matching
   `--bg`, `--panel*`, `--text*`, `--accent-*`, `--font-*`, or `--radius-*` token.
3. Numbers (reps, weights, set #, timers) use `--font-mono`; all other UI text
   uses `--font-body`.
4. `--accent-primary` is the *only* primary color — don't introduce a second one.
   `--accent-secondary` is highlight/informational, not danger. `--accent-danger`
   is destructive/error only.
5. Prefer background contrast (`--panel` / `--panel-2` / `--panel-3` +
   `--shadow-card`) over borders to separate surfaces.
6. If nothing in the contract covers the shape/color you need, **add a new
   token** to the contract in `DESIGN_SYSTEM.md` (e.g. `--radius-xl`,
   `--accent-<role>`) rather than inlining a raw value.
7. New CSS classes for components are prefixed `tracker-`.

## After writing UI code

Grep the diff for raw hex codes (`#[0-9a-fA-F]{3,6}`), raw `px` radii, and
literal font-family names outside the token declarations — any hit is a bug.
