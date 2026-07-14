# V2C Trydan Card v0.4.2

Release date: 2026-07-14

## English

- Ultra compact now hides charger artwork and keeps essential information.
- Energy flow is disabled by default; set `show_energy_flow: true` to enable it.
- Charger LCD follows all 10 supported languages and all 11 visual states.
- Charging and completion screens use real power, current, voltage and energy.
- Status spacing is corrected for long labels and 200% zoom.
- Added bilingual documentation, 33 screenshots, 2 GIFs, FAQ and forum drafts.
- Added official HACS validation and extra runtime hardening.

## Español

- Ultracompacto oculta el cargador y conserva la información esencial.
- El flujo energético viene desactivado; usa `show_energy_flow: true` para activarlo.
- La LCD se traduce en los 10 idiomas y 11 estados.
- Carga y finalización usan potencia, intensidad, voltaje y energía reales.
- Corregida la separación del estado con etiquetas largas y zoom 200 %.
- Añadida documentación bilingüe, 33 capturas, 2 GIF, FAQ y borradores del foro.
- Añadida validación oficial HACS y endurecimiento de runtime.

## Compatibility / Compatibilidad

No public YAML key was removed. Existing v0.4.x configurations remain valid. The two default/ultra behavior changes are documented in the migration guide.

## Verification / Verificación

- `corepack pnpm@11.5.1 audit --audit-level moderate`
- `corepack pnpm@11.5.1 check`
- 33 headless screenshots and 2 optimized GIFs