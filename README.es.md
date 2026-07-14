# V2C Trydan Card

[English](README.md) · [Configuración](docs/CONFIGURATION.es.md) · [Guía visual](docs/VISUAL_GUIDE.es.md) · [Preguntas frecuentes](docs/FAQ.es.md)

Card Lovelace moderna para monitorizar y controlar cargadores V2C Trydan desde Home Assistant. Incluye editor visual traducido, cuatro densidades, layouts responsive y once estados con pantalla LCD localizada.

> Proyecto comunitario independiente; no afiliado ni respaldado por V2C.

![V2C Trydan Card con layout dividido y tema oscuro](docs/screenshots/v042/layout-split-dark.png)

## Funciones principales

- Editor visual en 10 idiomas.
- Densidades XXL, estándar, compacta y ultracompacta.
- Layout automático, centrado, dividido y en línea.
- Once estados del cargador con LCD traducida.
- Potencia, intensidad, voltaje y energía reales; sin cifras ficticias.
- Controles seguros de intensidad, pausa, bloqueo, temporizador, energía dinámica y luces.
- Descubrimiento por registro de dispositivo, resistente a renombrados.
- Flujo energético opcional y desactivado por defecto desde v0.4.2.
- Teclado, foco visible, movimiento reducido y anchos de 280–768 px.

![Recorrido animado por densidades, layouts y editor](docs/media/trydan-card-tour.gif)

## Instalación con HACS

[![Abrir V2C Trydan Card en HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=mactron254&repository=v2c-trydan-card&category=plugin)

También puedes añadir `https://github.com/mactron254/v2c-trydan-card` como repositorio personalizado de tipo **Dashboard**. Instala, recarga el navegador y añade la tarjeta desde el editor.

## Instalación manual

1. Descarga `v2c-trydan-card.js` de la última release.
2. Copia el archivo en `/config/www/v2c-trydan-card.js`.
3. Añade `/local/v2c-trydan-card.js` como recurso JavaScript de tipo módulo.
4. Recarga Home Assistant.

## Configuración mínima

```yaml
type: custom:v2c-trydan-card
entity: binary_sensor.garaje_v2c_cargador_conectado
```

Para activar el flujo energético:

```yaml
show_energy_flow: true
```

El modo ultracompacto oculta siempre el cargador, pero conserva `show_charger` para el resto de densidades.

## Documentación

- [Referencia completa](docs/CONFIGURATION.es.md)
- [Guía visual con 33 capturas](docs/VISUAL_GUIDE.es.md)
- [FAQ y fallos comunes](docs/FAQ.es.md)
- [Historial de cambios](CHANGELOG.md)
- [Borrador del foro en español](docs/FORUM_POST_ES.md)

## Desarrollo

```powershell
corepack pnpm@11.5.1 install
corepack pnpm@11.5.1 check
corepack pnpm@11.5.1 docs:capture
```

Colaboración técnica: **Codex**, seguido de **Marco** ([@mactron254](https://github.com/mactron254)). Licencia MIT.