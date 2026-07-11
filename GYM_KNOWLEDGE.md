# Gym Knowledge Reference

The training logic baked into V-Taper Log — program structure, periodization, and the
exercise-substitution scoring — documented here so it stays consistent as the app grows.
This is a reference for extending `PROGRAM` and `EXERCISE_LIBRARY` in `index.html`, not a
standalone training guide.

---

## Program structure

A 4-day **Upper/Lower split**, rotated in order: `Upper A → Lower A → Upper B → Lower B`,
then repeats. Each day hits every major muscle group twice a week — enough frequency for
hypertrophy without needing 5-6 gym days.

- **A/B variants exist to vary the stimulus**, not to double the exercise count. Upper A
  and Upper B train the same muscles with different equipment/angles (e.g. Upper A's
  Incline Machine Press vs. Upper B's Incline DB Press) — same target, different joint
  angle or stability demand, which is its own mild variation stimulus across the week.
- **Pump/Recovery** is a 5th, optional day type — light, high-rep, well short of failure
  (RPE 3-4). It's for extra frequency/blood flow on a day you don't want to add real
  fatigue, not a real training day. It doesn't count in the A/B rotation.
- Auto-advance (`index.html`'s day-rotation effect) always proposes the *next* day in
  `DAY_ORDER` after your last lifting session — Pump/Recovery days don't shift it.

## The 24-week cycle

`getPhaseInfo(week)` in `index.html` drives this. Same shape every 24 weeks — week 25
restarts at Progressive-Overload intensity (`Repeat Cycle`), not back at Foundation, since
by then the base is already built.

| Weeks | Phase | Target RPE | What changes |
|---|---|---|---|
| 1-4 | Foundation | 6-7 | Learn the movements, groove technique. Don't chase weight yet — the point is owning the exercise, not the number on the bar. |
| 5-8 | Progressive Overload | 7-8 | Beat last session on *something* each time — reps first, then weight once you're at the top of the rep range. |
| 9 | Deload | 5-6 | Cut volume ~50%. Planned recovery week for joints and CNS, not a rest week you skip. |
| 10-14 | Volume Phase | 7-8 | Add 1 set to every priority (★) exercise — see below. |
| 15-18 | Intensification | 8-9 last set | Push the *last* set of priority lifts hard; keep 1-2 reps in reserve everywhere else so fatigue doesn't compound too fast. |
| 19 | Deload | 5-6 | Second planned recovery week before the final push. |
| 20-24 | Consolidation | 7-8 | Reassess — compare photos and strength logs against week 1. This is the checkpoint, not just more of the same. |
| 25+ | Repeat Cycle | 7-8 | Back to Progressive-Overload intensity. Good point to rotate out an exercise that's gone stale (diminishing returns, boredom, an injury niggle). |

## Set / rep / RPE / rest conventions

Every `PROGRAM` exercise carries `sets`, `reps`, `rpe`, `rest` (seconds, drives the rest
timer), and `restLabel` (display string). Rough conventions used throughout:

- **10-15 reps** for most compound-ish/machine work — the hypertrophy-relevant range is
  wide (roughly 5-30 reps to failure works, per the current lifting-research consensus),
  this app just picks a consistent band so progression is easy to track.
- **12-20 reps** for smaller/isolation muscles (side delts, rear delts, calves, abs) —
  higher reps, lighter joint stress, easier to feel the target muscle working.
- **Rest scales with how taxing the lift is**: 90-120s for heavier compound-pattern lifts
  (press, pulldown), 60-75s for isolation work, 45-60s for abs. Not a hard rule — the timer
  is a floor, not a ceiling; if you need longer, take it.
- **RPE (Rate of Perceived Exertion)**: how many reps you'd have left in the tank at the
  top set. RPE 7 ≈ 3 reps left, RPE 8 ≈ 2 left, RPE 9 ≈ 1 left. The app's target RPE per
  phase (table above) is the intensity dial across the whole cycle.

## Priority exercises (★)

`priority: true` marks the exercise(s) per day that matter most for visible progress —
usually the first 3-4 compound-ish movements, always including the exercise that targets
side delts (the single biggest lever for the "V-taper" look this app is named for).
Priority exercises are what Volume Phase (weeks 10-14) adds a set to
(`extraSet = phase.name === "Volume Phase" && exercise.priority` in `index.html`) and what
Intensification (weeks 15-18) asks you to push hardest on the last set. Non-priority
exercises still matter — they just aren't where the program concentrates the extra volume.

## Warm-up protocol

Two layers, both in `index.html`:

1. **General warm-up** (shown once per lifting day, above the exercise list): 5 min light
   cardio + dynamic mobility (arm circles, band pull-aparts, hip circles, +leg swings on
   Lower days). Raises core temp and greases the joints you're about to load.
2. **Ramp-up sets** (first exercise of the day only, `isFirst`): ~50% of working weight × 8,
   then ~75% × 5, then straight into working sets. Only the very first exercise needs this —
   by the second exercise you're already warm from the first one's working sets.

## Exercise substitution & the Exercise Library

`ALT_OPTIONS` (derived from each `PROGRAM` exercise's `alt` field) gives 1-3 curated,
same-muscle substitutes with a specific rationale (different equipment, different joint
angle, matches the program's periodization intent). `EXERCISE_LIBRARY` is the broader,
browsable catalog behind the 📚 button — organized by the same muscle-group strings used in
`PROGRAM`'s `target` field, so it stays wired to whatever exercise you're looking at.

**The 1-5 score is a heuristic, not a citation.** It leans on well-established, broadly
agreed-upon resistance-training principles:

- **Range of motion under load** — exercises that load the muscle through a longer stretch
  tend to score higher; partial-ROM/limited-stretch variations score lower.
- **How directly the exercise loads the target muscle** — an isolation movement that can't
  be "cheated" with other muscle groups generally scores higher than a compound movement
  where the target is a secondary mover.
- **Stability of the resistance curve** — cables and machines that keep tension roughly
  constant through the movement score a touch higher than free-weight variations where
  tension drops out at the top or bottom of the rep.

This is a **sensible default ordering, not a verdict** — individual leverages, joint
history, and what you can actually feel working matter more than a static score. Say so
explicitly in any UI that surfaces it (the picker already does).

**Adding to the library**: match the muscle-group key exactly to an existing `target`
string in `PROGRAM` (see the table below) or it won't show up for any exercise. Keep the
`equipment` tag short (what's needed, not a full description).

| `target` values in use |
|---|
| Upper chest · Side delts · Rear delts · Lats · Upper back · Biceps · Triceps · Quads · Hamstrings · Glutes · Calves · Core · Adductors |
