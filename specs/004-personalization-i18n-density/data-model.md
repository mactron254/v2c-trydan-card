# Data model

## Presentación

| Campo | Valores/regla |
|---|---|
| `display_mode` | `xxl`, `standard`, `compact`, `ultra_compact`; default `standard` |
| `layout` | `auto`, `centered`, `split`, `inline`; fallback centrado si ancho insuficiente |
| `color_scheme` | monocromo, azul V2C, teal, verde, violeta, custom |
| `accent_color` | sólo custom; `#RRGGBB` válido |
| `hero_scale` | 0.75–1.25, clamp |
| `card_radius` | 0–40; inválido usa tema HA |

## Contenido

`metrics`, `energy_sources` y `section_order` mantienen orden aportado; deduplican valores conocidos y completan secciones faltantes. `[]` oculta la sección.

## Resolución de entidad

| Estado | Condición | Uso |
|---|---|---|
| Manual | Override válido compatible | Control permitido |
| Automática | Un candidato del mismo dispositivo | Control permitido |
| Ambigua | Varios candidatos | Sin control |
| Inválida | Override incompatible/inexistente | Sin control |
| No encontrada | Sin candidato | Sin control |

Precedencia: manual válido → translation key mismo dispositivo → sufijo mismo dispositivo → no encontrada.
