---
name: design-system
description: Use before writing or reviewing ANY UI/CSS change in index.html — new components, restyled elements, new colors, radii, or fonts. Enforces the token-based design system so nothing gets hardcoded outside the token contract.
---

# Design System

V-Taper Log has dark (default) and light themes, driven entirely by CSS
custom-property tokens declared once on `.tracker-root` in `index.html` and
overridden per-theme via `html[data-theme="light"] .tracker-root`. Read the
full contract in [DESIGN_SYSTEM.md](../../../DESIGN_SYSTEM.md) before
touching any UI.

## Before writing UI code

1. Open `DESIGN_SYSTEM.md` and check the token contract (color / type / type
   scale / spacing / shape tables).
2. Never hardcode a hex color, border-radius, font, font-size, font-weight, or
   card/page padding — consume the matching `--bg`, `--panel*`, `--text*`,
   `--accent-*`, `--font-*`, `--text-{2xs,xs,sm,md,base,lg,xl,2xl}`,
   `--weight-{semibold,bold,black}`, `--space-{card,page}`, or `--radius-*`
   token.
3. Numbers (reps, weights, set #, timers) use `--font-mono`; all other UI text
   uses `--font-body`.
4. `--accent-primary` is the *only* primary color — don't introduce a second one.
   `--accent-secondary` is highlight/informational, not danger. `--accent-danger`
   is destructive/error only.
5. Prefer background contrast (`--panel` / `--panel-2` / `--panel-3` +
   `--shadow-card`) over borders to separate surfaces.
6. Card padding is `--space-card` (12px); page/section padding is
   `--space-page` (16px). A card with no `.tracker-card-head` above its body
   needs `.tracker-card-body-standalone` for top padding — don't inline a
   `paddingTop`.
7. If nothing in the contract covers the shape/color/size you need, **add a
   new token** to the contract in `DESIGN_SYSTEM.md` (e.g. `--radius-xl`,
   `--accent-<role>`, a new `--text-*` rung) rather than inlining a raw value.
8. New CSS classes for components are prefixed `tracker-`.
9. The header (`.tracker-header`) is `position: sticky` — brand row, tabs,
   and the day-type select live there and stay pinned on scroll. The week
   calendar and phase banner live in `.tracker-scroll-top` right below it and
   scroll away normally; don't move them back into the sticky header.
10. `.tracker-root` must never get `overflow-x: hidden` (or any non-`visible`
    overflow) back — an ancestor with non-visible overflow silently breaks
    `position: sticky` for everything inside it. The horizontal clip lives on
    `body` instead, where overflow propagates to the viewport.
11. Theme (dark/light) lives in exactly two places: the `.tracker-root` token
    block (dark values) and `html[data-theme="light"] .tracker-root` right
    after it (light overrides), plus `html[data-theme="light"] body` for the
    backdrop outside the 480px column. Only `--bg`, `--panel*`, `--text*`, and
    `--shadow-card` differ per theme — never fork `--accent-*` or `--avatar-*`.
    Don't add `data-theme` selectors anywhere else.

## After writing UI code

Grep the diff for raw hex codes (`#[0-9a-fA-F]{3,6}`), raw `px` font-sizes/
padding on cards or pages, numeric `font-weight` values, and literal
font-family names outside the token declarations — any hit is a bug, except
inside the two theme-token blocks described in rule 11 (that's where hex
values belong).
