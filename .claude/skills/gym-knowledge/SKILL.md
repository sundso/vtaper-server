---
name: gym-knowledge
description: Use before adding/editing exercises in EXERCISE_LIBRARY, changing sets/reps/rest/RPE in PROGRAM, or touching the 24-week phase cycle in index.html. Encodes the training logic behind the split, periodization, and exercise-substitution scoring so changes stay consistent with the rest of the program.
---

# Gym Knowledge

The workout program, periodization, and exercise-substitution scoring in
`index.html` encode real training decisions, not arbitrary defaults. Read
[GYM_KNOWLEDGE.md](../../../GYM_KNOWLEDGE.md) in full before changing any of
`PROGRAM`, `EXERCISE_LIBRARY`, or `getPhaseInfo`.

## Quick checks before editing

- **Split**: 4-day Upper/Lower, rotated `Upper A → Lower A → Upper B → Lower B`.
  A/B variants vary equipment/angle for the *same* muscles — don't just double
  the exercise count. Pump/Recovery is a 5th, optional, low-fatigue day that
  never shifts the A/B rotation.
- **Phase cycle**: 24 weeks, table in GYM_KNOWLEDGE.md. Week 25+ restarts at
  Progressive-Overload intensity, not Foundation.
- **Rep/rest ranges by `type`**:
  - `compound` (true multi-joint lifts): 6-8 reps, 2-2.5min rest.
  - other compound-pattern/machine work: 10-15 reps, 90-120s rest.
  - `isolation` / small muscles: 12-20 reps, 60-90s rest (abs 45-60s).
  - Rest is a floor, not a ceiling.
- **`priority: true`**: marks the exercise(s) per day that drive visible
  progress — first 3-4 compound-ish movements, always including the side-delt
  exercise. Volume Phase (wk 10-14) adds a set to priority exercises;
  Intensification (wk 15-18) pushes their last set hardest.
- **Adding to `EXERCISE_LIBRARY`**: the `target` string must exactly match an
  existing `PROGRAM` target (see the table at the bottom of GYM_KNOWLEDGE.md).
  Set `type: "compound" | "isolation"` by joint count / breathing-vs-muscle
  fatigue signal (see the "Why some compounds are 6-8 reps" section). This
  `type` drives `TYPE_DEFAULTS` rep/rest targets when a library pick is
  swapped into a program slot.
- **Substitution scoring (1-5)** is a heuristic based on range-of-motion under
  load, how directly the exercise loads the target muscle, and resistance-curve
  stability — a sensible default ordering, not a verdict. Any UI surfacing it
  should say so explicitly.

## After editing

Confirm new/changed entries: match an existing `target` string, carry a `type`,
and (for `PROGRAM` entries) carry `sets`/`reps`/`rpe`/`rest`/`restLabel`
consistent with the conventions above.
