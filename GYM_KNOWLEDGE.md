# Gym Knowledge Reference

The training logic baked into V-Taper Log — program structure, periodization, and the
exercise-substitution scoring — documented here so it stays consistent as the app grows.
This is a reference for extending `PROGRAM` and `EXERCISE_LIBRARY` in `index.html`, not a
standalone training guide.

---

## Program structure

A 3-day rotation, `Upper A → Upper B → Lower`, then repeats. Upper body gets hit twice
per rotation (via the A/B angle variants); lower body gets one combined, harder session
instead of two lighter ones. This is a deliberate upper-body-priority trade, not the
default — it swaps leg *frequency* for leg *density*: the `Lower` day exists to carry
roughly what two lower-frequency sessions would, in one sitting, so total weekly leg
volume doesn't just quietly get cut when frequency drops. Concretely it still hits
quads (compound + isolation), hamstrings, calves, and adductors every rotation, just
consolidated — expect it to run longer than a single Upper session (6 exercises,
~18 sets vs. Upper's ~24 sets across 8, but back-to-back rather than split across two
days). **Glutes have no dedicated exercise on purpose** — they only get worked as a
secondary mover on the DB Romanian Deadlift, not their own isolation slot, per an
explicit preference for covering the muscle without deliberately growing it. If someone
wants leg growth prioritized instead, go back to a 4-day
`Upper A → Lower A → Upper B → Lower B` split — that's the frequency-first default this
was traded away from, not a broken configuration.

- **A/B variants exist to vary the stimulus**, not to double the exercise count. Upper A
  and Upper B train the same muscles with different equipment/angles (e.g. Upper A's
  Incline Machine Press vs. Upper B's Incline DB Press) — same target, different joint
  angle or stability demand, which is its own mild variation stimulus across the week.
- **Pump/Recovery** is a 5th, optional day type — light, high-rep, well short of failure
  (RPE 3-4). It's for extra frequency/blood flow on a day you don't want to add real
  fatigue, not a real training day. It doesn't count in the rotation.
- Auto-advance (`index.html`'s day-rotation effect) always proposes the *next* day in
  `DAY_ORDER` after your last lifting session — Pump/Recovery days don't shift it. This
  means training frequency isn't hardcoded anywhere; whatever cadence you actually train
  at, the app just proposes the next name in `DAY_ORDER` each time.

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

- **6-8 reps, 2-2.5min rest** for true multi-joint compound lifts (Leg Press, Hack Squat,
  Incline Press variants, Lat Pulldown, rows, Pull-Up, Romanian Deadlift). These are the
  movements most likely to hit *systemic* fatigue (heavy breathing, elevated heart rate)
  before the target muscle is actually mechanically fatigued — see the callout below. Lower
  reps + heavier load + longer rest keeps effort/proximity-to-failure the same while cutting
  the metabolic byproduct that drives that "out of breath before my muscle gives out"
  feeling. Still a fully legitimate hypertrophy rep range, not just a strength one.
- **10-15 reps** for single-joint-ish machine work that isn't very systemically taxing
  (leg curl, leg extension, hip thrust) — the hypertrophy-relevant range is wide (roughly
  5-30 reps to failure works, per the current lifting-research consensus), this band is
  just a consistent default so progression is easy to track.
- **12-20 reps** for smaller/isolation muscles (side delts, rear delts, calves, abs) —
  higher reps, lighter joint stress, easier to feel the target muscle working, and these
  essentially never hit a cardio wall before a muscular one.
- **Rest scales with how taxing the lift is**: 2-2.5min for the compound lifts above,
  90-120s for other compound-pattern/machine work, 60-75s for isolation work, 45-60s for
  abs. Not a hard rule — the timer is a floor, not a ceiling; if you need longer, take it.
- **RPE (Rate of Perceived Exertion)**: how many reps you'd have left in the tank at the
  top set. RPE 7 ≈ 3 reps left, RPE 8 ≈ 2 left, RPE 9 ≈ 1 left. The app's target RPE per
  phase (table above) is the intensity dial across the whole cycle.

### Why some compounds are 6-8 reps instead of 10-15

At 10-15 reps with 60-120s rest, big multi-joint lifts (leg press, squat pattern presses,
pulldowns/rows) accumulate a lot of metabolic byproduct per set — that drives heavy
breathing and an "out of breath" feeling that can arrive well before the target muscle is
actually mechanically fatigued. It's a real, common pattern, not a conditioning failure —
isolation work rarely does this because it's not systemically taxing the same way. Two
levers fix it: **lower reps** (less time under tension per set → less metabolic byproduct)
and **longer rest** (more full recovery before the next set) — both applied here to the
compound lifts. If a compound movement still feels breath-limited rather than muscle-limited
after this change, check breathing technique next (exhale on the hard part, don't hold a
full breath through the whole set) before assuming it needs more programming changes.

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

**Every library entry (and every `PROGRAM` exercise) also carries a `type`:
`"compound"` or `"isolation"`** — the same distinction behind the 6-8 vs. 10-15 rep split
above. Picking a library substitute uses *its* type to set the displayed rep/rest target
(`TYPE_DEFAULTS` in `index.html`: compound → 6-8 reps / 2-2.5min, isolation → 10-15 reps /
90s) — regardless of what the original slot's exercise was. Swap an isolation slot for a
compound library pick and the card switches to compound guidance, and vice versa. This only
applies to library-sourced substitutes; the curated `ALT_OPTIONS` and a free-typed custom
name both keep the original exercise's numbers, since a typed name's type isn't known.

**Adding to the library**: match the muscle-group key exactly to an existing `target`
string in `PROGRAM` (see the table below) or it won't show up for any exercise. Keep the
`equipment` tag short (what's needed, not a full description), and set `type` by joint
count — does the movement meaningfully load more than one joint (compound), or is it
effectively isolated to one (isolation)? When in doubt, ask whether the exercise is likely
to run into breathing/systemic fatigue before the target muscle does — that's the practical
signal `type` is standing in for.

| `target` values in use |
|---|
| Upper chest · Side delts · Rear delts · Lats · Upper back · Biceps · Triceps · Quads · Hamstrings · Glutes · Calves · Core · Adductors |
