# Research: Trydan Hero XL

## Decision 1: One centered composition

**Decision**: Use a vertical centered hero at every width and density.
**Rationale**: The SVG contains meaningful visual detail; a side column reduces logo and LCD legibility.
**Alternative rejected**: Restore a desktop split layout, because it weakens the same hierarchy the feature is intended to establish.

## Decision 2: Crop through viewBox only

**Decision**: Change every root `viewBox` to `24 0 312 480`.
**Rationale**: It removes unused canvas while preserving internal geometry, LED colors and paths.
**Alternative rejected**: Rewrite coordinates, because it increases visual-regression risk without benefit.

## Decision 3: Fluid size with hard bounds

**Decision**: Combine `min(100%, clamp(...))` with density-specific limits.
**Rationale**: The hero grows on tablet/desktop yet cannot exceed narrow cards.
**Alternative rejected**: Fixed pixel widths, because they either underuse wide cards or overflow narrow dashboards.
