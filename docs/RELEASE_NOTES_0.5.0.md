# V2C Trydan Card 0.5.0

Stable release of resilient entity discovery tested against Home Assistant 2026.7 entity contracts and real Trydan entity IDs.

## Highlights

- Resolves V2C entities from the entity registry by device and official `translation_key`.
- Reads live values directly from `hass.states` and renders only watched entity changes.
- Keeps local SVG assets bundled with the card.
- Revalidates writable V2C targets immediately before every service call.
- Supports validated manual power and voltage measurements without scanning unrelated devices.

## State and language verification

- 10 languages.
- 11 visual states plus unavailable: 120 rendered combinations.
- 20 full charger cycles per language: 1,200 live DOM transitions.
- Italian disconnected state verified as `Nessun veicolo`.
- Unavailable main status and LCD now agree in every language.
- Charging, complete, timer, errors, Wi-Fi, badges and contradictory evidence covered.

## Home Assistant 2026.7 fixture

Tests include the 22 supplied entities: connected, charging, ready, charging metrics, house/PV power, intensity limits, session controls, logo LED, external solar/grid/battery/voltage sensors and the HACS update entity.

The HACS update entity is intentionally ignored by charger discovery. External readings remain explicit configuration overrides.

## Compatibility

No breaking YAML changes. Existing configurations continue to work. Home Assistant registry metadata is preferred; legacy entity suffixes remain as fallback.

## Verification

- `corepack pnpm typecheck`
- `corepack pnpm test`: 75/75
- Five repeated full-suite runs
- `corepack pnpm check`
- HACS and GitHub Actions validation
