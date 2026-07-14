# Borrador para el foro — español

## Título sugerido

**V2C Trydan Card — editor visual, LCD traducida y dashboard responsive para carga EV**

## Categoría y etiquetas

Share your Projects! → Dashboards & Frontend
Etiquetas: `lovelace`, `cards`, `hacs`, `ev-charging`, `v2c`

## Cuerpo

Hola, comunidad de Home Assistant:

Comparto **V2C Trydan Card**, una tarjeta Lovelace para monitorizar y controlar cargadores V2C Trydan. Usa las entidades disponibles en Home Assistant y puede descubrir la mayoría mediante el registro del dispositivo V2C.

Es un proyecto comunitario independiente; no está afiliado ni respaldado por V2C.

![Recorrido animado por V2C Trydan Card](https://raw.githubusercontent.com/mactron254/v2c-trydan-card/main/docs/media/trydan-card-tour.gif)

### Funciones

- Editor visual traducido a 10 idiomas.
- Densidades XXL, estándar, compacta y ultracompacta.
- Layout automático, centrado, dividido y en línea.
- Once estados inspirados en el cargador real.
- LCD traducida con potencia, intensidad, voltaje y energía reales.
- Intensidad, presets, pausa, bloqueo, temporizador, control dinámico y luces.
- Resumen opcional de solar, red, casa, batería y coche.
- Teclado, foco visible y movimiento reducido.

Ultracompacto elimina intencionadamente la ilustración y conserva estado, potencia y controles esenciales.

![Layout dividido en tema oscuro](https://raw.githubusercontent.com/mactron254/v2c-trydan-card/main/docs/screenshots/v042/layout-split-dark.png)

### Instalación

[![Abrir V2C Trydan Card en HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=mactron254&repository=v2c-trydan-card&category=plugin)

Si el botón no lo añade, usa este repositorio personalizado de tipo Dashboard:

`https://github.com/mactron254/v2c-trydan-card`

Configuración mínima:

```yaml
type: custom:v2c-trydan-card
entity: binary_sensor.garaje_v2c_cargador_conectado
```

El flujo energético es opcional y viene desactivado:

```yaml
show_energy_flow: true
```

### Documentación y soporte

- Repositorio: https://github.com/mactron254/v2c-trydan-card
- Configuración: https://github.com/mactron254/v2c-trydan-card/blob/main/docs/CONFIGURATION.es.md
- Guía visual: https://github.com/mactron254/v2c-trydan-card/blob/main/docs/VISUAL_GUIDE.es.md
- Fallos: https://github.com/mactron254/v2c-trydan-card/issues

La release `v0.4.2` añade LCD traducida, lecturas reales, SVG oculto en ultra, defaults más seguros, 33 capturas y dos GIF reproducibles.

Agradezco pruebas con distintas versiones de firmware e idiomas de entidades. Antes de compartir YAML o capturas, oculta IDs privados, SSID e IP.