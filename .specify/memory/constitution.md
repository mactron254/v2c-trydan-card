<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Added principles: Home Assistant native; Safe controls; Testable state model;
  V2C identity and accessibility; Durable project memory.
- Added sections: Technical constraints; Development workflow and quality gates.
- Removed sections: none (template placeholders replaced).
- Templates: ✅ active feature artifacts; ⚠ generic templates unchanged because
  Windows sandbox denied direct patch access to `.specify/templates/`.
- Deferred items: synchronize generic templates when sandbox ACL allows it.
-->
# V2C Trydan Card Constitution

## Core Principles

### I. Home Assistant Native
The card MUST behave as a native Home Assistant dashboard component: it MUST
respect `hass`, theme variables, entity availability, service semantics and
Lovelace configuration conventions. Runtime network calls, telemetry and remote
assets are forbidden; the distributed card MUST remain self-contained.

### II. Safe, Explicit Controls
Every state-changing control MUST identify its target entity and Home Assistant
service unambiguously. Dangerous or disruptive actions such as locking the EVSE
MUST require confirmation. Missing or unavailable entities MUST disable their
controls and explain why; the UI MUST never imply a successful action before
Home Assistant reports the resulting state.

### III. Testable State Model
State precedence, value formatting, entity discovery and service payloads MUST
be deterministic and covered by automated tests. New behavior starts with an
acceptance scenario or failing test. A release is blocked by failing type-check,
unit, build or smoke checks.

### IV. V2C Identity and Accessible Meaning
Visual language MUST be recognizably V2C Trydan: carbon surfaces, V2C orange,
the supplied charger artwork and authentic LED states. Color or animation MUST
never be the only status cue. Controls MUST support keyboard use, visible focus,
reduced motion and narrow Home Assistant columns down to 280 px.

### V. Durable Project Memory
Source, assets, tests, demo, specifications and documentation MUST live in
purpose-specific folders. `docs/FAILURES.md` MUST record meaningful failures and
their resolutions. `docs/HANDOFF.md` MUST preserve current state, validation,
decisions and next steps so a new chat can continue without reconstructing work.

## Technical Constraints

- Package management MUST use pnpm 11 or newer and pin selected version in `package.json`.
- TypeScript MUST run in strict mode. Public configuration contract MUST be documented.
- Production output MUST be one HACS-compatible JavaScript module without remote dependencies.
- Card MUST support light/dark themes, missing optional entities and unavailable states.
- Supplied SVG artwork MUST be preserved as source assets and bundled locally.

## Development Workflow and Quality Gates

1. Use Spec Kit artifacts in order: constitution, specification, plan, tasks,
   implementation and convergence.
2. Validate material design or architecture choices with independent council review.
3. Run `pnpm typecheck`, `pnpm test`, `pnpm build` and smoke validation before completion.
4. Update README, failure log and handoff whenever behavior or setup changes.
5. GitHub publication, commits, pushes and collaborator changes require explicit
   user scope; when publishing, attribution MUST name Codex first and Marc after.

## Governance

This constitution overrides conflicting project guidance. Amendments MUST state
the reason, update dependent Spec Kit artifacts and follow semantic versioning:
MAJOR for incompatible principle changes, MINOR for new or expanded rules, PATCH
for clarifications. Every implementation and review MUST check all MUST statements;
exceptions require written rationale in active plan.

**Version**: 1.0.0 | **Ratified**: 2026-07-13 | **Last Amended**: 2026-07-13
