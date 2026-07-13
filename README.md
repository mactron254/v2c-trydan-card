# V2C Trydan Card

Card Lovelace moderna para monitorizar y controlar cargadores **V2C Trydan** desde Home Assistant.
Diseño Trydan Hero XL sobre Quiet Hardware: SVG de gran formato centrado, resumen energético inteligente, controles seguros y editor visual.

> Proyecto independiente; no afiliado ni respaldado por V2C.

![Trydan Hero XL en tema oscuro](docs/screenshots/v041/density-standard-dark.png)

## Características

- Tema `auto`, claro u oscuro. `auto` sigue Home Assistant y el sistema.
- Responsive real para móvil, tablet y escritorio mediante container queries.
- Cuatro densidades: XXL, estándar, compacta y ultracompacta.
- 10 idiomas: English, Italiano, Deutsch, Français, Nederlands, Svenska, Dansk, Norsk, Română y Español.
- Editor visual traducido para apariencia, color, densidad, layout, contenido, orden, entidades y opciones avanzadas.
- Opciones avanzadas en YAML: overrides, signos, presets, umbrales y estado externo.
- Estado por capas: carga, inhibidores, conectividad y errores no se pisan.
- 11 SVG Trydan locales de 170 a 430 px, con Hero XXL claramente diferenciado; sus LED reales son el único acento cromático ordinario.
- Resumen energético inteligente: actividad, reposo, datos parciales o sin datos.
- Descubrimiento por dispositivo y `translation_key`, resistente a idioma y renombrados.
- Intensidad, pausa, bloqueo, temporizador, control dinámico, luces y modo de carga.
- Teclado, foco visible, texto semántico y movimiento reducido.

## Instalación con HACS

1. Abre HACS → menú de tres puntos → **Repositorios personalizados**.
2. Añade `https://github.com/mactron254/v2c-trydan-card`.
3. Selecciona categoría **Dashboard**.
4. Instala **V2C Trydan Card** y recarga Home Assistant.

HACS acepta el bundle `dist/v2c-trydan-card.js`; el nombre coincide con el repositorio.

## Instalación manual

1. Descarga `v2c-trydan-card.js` desde la última release.
2. Cópialo a `/config/www/v2c-trydan-card.js`.
3. Ajustes → Paneles → Recursos → añade `/local/v2c-trydan-card.js` como módulo JavaScript.
4. Recarga el navegador.

## Configuración mínima

```yaml
type: custom:v2c-trydan-card
entity: binary_sensor.garaje_v2c_cargador_conectado
```

La entidad semilla puede ser cualquier entidad del dispositivo V2C. La card descubre el resto mediante metadatos estables.

## Tema y densidad

```yaml
type: custom:v2c-trydan-card
entity: binary_sensor.garaje_v2c_cargador_conectado
theme: auto                  # auto | light | dark
display_mode: standard       # xxl | standard | compact | ultra_compact
layout: auto                 # auto | centered | split | inline
language: auto               # config > HA locale > HA language > browser > en
language: es                 # normalmente se detecta desde Home Assistant
```

El SVG permanece centrado en las cuatro densidades y nunca desborda tarjetas estrechas. `show_charger: false` elimina el hero sin reservar espacio.

Editor agrupado para apariencia, contenido, orden, entidades y opciones avanzadas.
Configuración completa: [docs/CONFIGURATION.md](docs/CONFIGURATION.md). Galería: [docs/VISUAL_GUIDE.md](docs/VISUAL_GUIDE.md).

![Editor visual en español](docs/screenshots/v041/editor-es.png)

## Desarrollo

Requiere Node.js 20+ y **pnpm 11+**. Proyecto fijado a pnpm 11.5.1.

```powershell
corepack pnpm@11.5.1 install
corepack pnpm@11.5.1 check
corepack pnpm@11.5.1 demo
corepack pnpm@11.5.1 docs:capture
```

## Estructura

- `src/`: card, editor, dominio, servicios, traducciones y SVG.
- `tests/`: estado, discovery, energía, servicios, localización, editor y DOM.
- `demo/`: laboratorio visual responsive sin Home Assistant real.
- `dist/`: bundle único instalable por HACS.
- `docs/`: configuración, fallos resueltos y handoff.
- `specs/`: especificación, contratos, plan y tareas Spec Kit.

## Créditos

Inspiración funcional: [Lektrico Charger Card](https://github.com/naked-head/lektrico-charger-card).
Entidades: integración oficial [Home Assistant V2C](https://github.com/home-assistant/core/tree/dev/homeassistant/components/v2c).

Colaboración principal: **Codex**, seguido de **Marco** ([@mactron254](https://github.com/mactron254)).
Consulta [CONTRIBUTORS.md](CONTRIBUTORS.md).

## Licencia

MIT. Consulta [LICENSE](LICENSE).
