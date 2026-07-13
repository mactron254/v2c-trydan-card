# Tasks: V2C Trydan Charger Card

**Input**: Design documents from `specs/001-v2c-trydan-card/`

**Tests**: Required by constitution and acceptance scenarios. Tests precede implementation.

## Phase 1: Setup

- [X] T001 Create pnpm 11.5.1 TypeScript/Lit/Vite project configuration in `package.json`, `tsconfig.json`, `vite.config.ts` and `vitest.config.ts`
- [X] T002 [P] Copy supplied Trydan artwork into `src/assets/trydan/`
- [X] T003 [P] Create distribution metadata in `hacs.json`, `LICENSE` and `.gitignore`
- [X] T004 [P] Create project memory skeleton in `docs/FAILURES.md` and `docs/HANDOFF.md`

## Phase 2: Foundational

- [X] T005 Create Home Assistant, card, role and layered-state types in `src/models/types.ts`
- [X] T006 [P] Add Spanish and English dictionaries in `src/localization/es.ts`, `src/localization/en.ts` and `src/localization/index.ts`
- [X] T007 [P] Write layered state and contradiction tests in `tests/state.test.ts`
- [X] T008 [P] Write W/kW, sign, inversion and unknown-value tests in `tests/energy.test.ts`
- [X] T009 [P] Write discovery metadata, ambiguity and stale-response tests in `tests/discovery.test.ts`
- [X] T010 [P] Write exact service-payload and deduplication tests in `tests/services.test.ts`
- [X] T011 Implement trivalent axes and exact 11-SVG resolver in `src/services/state.ts`
- [X] T012 Implement energy normalization and formatting in `src/services/energy.ts` and `src/services/format.ts`
- [X] T013 Implement revision-safe registry discovery with overrides and ambiguity handling in `src/services/discovery.ts`
- [X] T014 Implement Home Assistant service actions and pending tracker in `src/services/actions.ts`
- [X] T015 Create SVG state map using trusted inline assets in `src/assets/trydan/index.ts`

## Phase 3: User Story 1 - Entender la carga de un vistazo (P1) 🎯 MVP

**Goal**: Estado, sesión, Trydan y energía comprensibles en 3 segundos.

**Independent Test**: Mock HA recorre 11 estados, contradicciones y entidades ausentes sin error.

- [X] T016 [P] [US1] Write card state, metric and missing-entity DOM tests in `tests/card.test.ts`
- [X] T017 [P] [US1] Define Carbon Flow tokens, responsive rules and focus/reduced-motion styles in `src/card/styles.ts`
- [X] T018 [US1] Build semantic header, hero, metrics and decorative Trydan render in `src/card/v2c-trydan-card.ts`
- [X] T019 [US1] Build energy nodes with static arrows, visible direction and accessible names in `src/card/energy-flow.ts`
- [X] T020 [US1] Integrate state badges, meter diagnostics and live status in `src/card/v2c-trydan-card.ts`

## Phase 4: User Story 2 - Controlar una sesión con seguridad (P2)

**Goal**: Ajustar intensidad y pausar/reanudar sin duplicar solicitudes.

**Independent Test**: Un cambio de rango y un botón producen exactamente un servicio cada uno.

- [X] T021 [P] [US2] Add intensity, pause, pending and unavailable-control DOM tests in `tests/card.test.ts`
- [X] T022 [US2] Implement labeled intensity range, presets and min/max/step handling in `src/card/session-controls.ts`
- [X] T023 [US2] Implement pause/resume button with pending, timeout and `aria-live` feedback in `src/card/session-controls.ts`
- [X] T024 [US2] Integrate session controls in `src/card/v2c-trydan-card.ts`

## Phase 5: User Story 3 - Gestionar funciones Trydan avanzadas (P3)

**Goal**: Exponer solo controles avanzados disponibles dentro de disclosure compacto.

**Independent Test**: Cada switch/select/light llama servicio correcto; bloqueo requiere confirmación.

- [X] T025 [P] [US3] Add advanced control and lock-confirmation tests in `tests/card.test.ts`
- [X] T026 [US3] Implement native `details/summary` advanced groups in `src/card/advanced-controls.ts`
- [X] T027 [US3] Implement switches, charge mode, logo brightness and LED controls in `src/card/advanced-controls.ts`
- [X] T028 [US3] Add confirmed lock/unlock flow and pending feedback in `src/card/advanced-controls.ts`

## Phase 6: User Story 4 - Configurar sin nombres locales (P4)

**Goal**: Editor visual, discovery seguro y overrides manuales.

**Independent Test**: Entidad semilla resuelve translation keys; ambigüedad no elige silenciosamente.

- [X] T029 [P] [US4] Add config validation, stub and editor-event tests in `tests/editor.test.ts`
- [X] T030 [US4] Implement defaults and configuration validation in `src/config.ts`
- [X] T031 [US4] Implement visual editor and entity fields in `src/editor/v2c-trydan-card-editor.ts`
- [X] T032 [US4] Add idempotent custom element and `window.customCards` registration in `src/index.ts`
- [X] T033 [US4] Build interactive mock Home Assistant demo in `demo/index.html` and `demo/mock-hass.ts`

## Phase 7: Polish & Cross-Cutting

- [X] T034 Create installation, YAML, entity-role and troubleshooting docs in `README.md` and `docs/CONFIGURATION.md`
- [X] T035 Implement artifact smoke check for one local JS under 300 kB in `scripts/smoke.mjs`
- [X] T036 Configure single-file CSS/SVG-embedded HACS output in `vite.config.ts` and verify `hacs.json`
- [X] T037 Run typecheck, tests, build and smoke; resolve all failures
- [X] T038 Validate 280/320/600/800 px, long ES/EN, keyboard, 200% zoom and reduced-motion matrix via `specs/001-v2c-trydan-card/quickstart.md`
- [X] T039 Record failures/resolutions and final continuation state in `docs/FAILURES.md` and `docs/HANDOFF.md`

## Phase 8: Multilingual, Adaptive & GitHub Delivery

- [X] T040 Add automatic/light/dark theme tokens and explicit theme configuration
- [X] T041 Add standard, compact and ultra-compact responsive layouts
- [X] T042 Add English, Italian, German, French, Dutch, Swedish, Danish, Norwegian, Romanian and Spanish catalogs
- [X] T043 Limit GUI editor to main options while preserving advanced YAML configuration
- [X] T044 Extend responsive demo for theme, width, density and language
- [X] T045 Add localization, editor, theme and density tests
- [X] T046 Add GitHub CI, HACS metadata, collaborators and public installation documentation
- [X] T047 Run pnpm 11.5.1 validation, publish repository and create test release
## Dependencies & Execution Order

- Setup → Foundational → US1 → US2 → US3 → US4 → Polish.
- T007–T010 must fail before T011–T014 implement behavior.
- US1 is MVP; US2–US4 add independent capabilities without changing its state model.
- Council conditions are enforced by T009, T013, T032, T035 and T036.

## Parallel Opportunities

- Setup metadata/docs/assets can proceed independently after T001.
- Foundational tests T007–T010 target separate modules.
- Styles T017 and DOM contract T016 are independent until T018.
- Documentation T034 can start after public config stabilizes at T031.

## Implementation Strategy

Complete pure model and tests first. Deliver informational card as MVP, then session,
advanced controls and editor. End with HACS artifact and durable project memory.
