# Guía visual de V2C Trydan Card — v0.4.2

[English](VISUAL_GUIDE.md) · [Configuración](CONFIGURATION.es.md)

Todas las imágenes se generan con `corepack pnpm@11.5.1 docs:capture`. Usan la demo, la ilustración incluida y datos simulados; no capturan credenciales ni entidades privadas.

> Las capturas y GIF de abajo se hicieron antes del rediseño de la ilustración del cargador y todavía muestran las ilustraciones antiguas por estado. Se recapturarán más adelante; hasta entonces, úsalas como referencia de maquetación y densidad, no de cómo se ve el cargador ahora mismo. Consulta [Ilustración del cargador](#ilustración-del-cargador) más abajo para ver qué se muestra realmente.

Cada PNG se recorta automáticamente comparando el fondo real de cada fila. Conserva sombras, ignora píxeles aislados y deja como máximo 16 px tras el último contenido. El manifiesto de capturas registra las dimensiones exactas.

![Recorrido animado por densidades, layouts y apartados del editor](media/trydan-card-tour.gif)

## Ciclo de conexión del vehículo

![Cargador V2C Trydan cambiando de sin vehículo a vehículo conectado y cargando](media/vehicle-connection-es.gif)

Los tres fotogramas usan estados visuales reales: **Sin vehículo → Vehículo conectado → Cargando**.

## Densidades

| Densidad | Claro | Oscuro |
|---|---|---|
| XXL | ![Densidad XXL en claro](screenshots/v042/density-xxl-light.png) | ![Densidad XXL en oscuro](screenshots/v042/density-xxl-dark.png) |
| Estándar | ![Densidad estándar en claro](screenshots/v042/density-standard-light.png) | ![Densidad estándar en oscuro](screenshots/v042/density-standard-dark.png) |
| Compacta | ![Densidad compacta en claro](screenshots/v042/density-compact-light.png) | ![Densidad compacta en oscuro](screenshots/v042/density-compact-dark.png) |
| Ultracompacta | ![Ultracompacta sin cargador en claro](screenshots/v042/density-ultra_compact-light.png) | ![Ultracompacta sin cargador en oscuro](screenshots/v042/density-ultra_compact-dark.png) |

Ultracompacto elimina intencionadamente la ilustración del cargador. Conserva estado, potencia y controles esenciales.

## Distribuciones

| Automática | Centrada |
|---|---|
| ![Layout automático responsive](screenshots/v042/layout-auto-dark.png) | ![Layout vertical centrado](screenshots/v042/layout-centered-dark.png) |

| Dividida | En línea |
|---|---|
| ![Layout dividido con cargador y estado](screenshots/v042/layout-split-dark.png) | ![Layout horizontal reducido](screenshots/v042/layout-inline-dark.png) |

`split` e `inline` vuelven a centrado por debajo de 400 px. `auto` cambia desde 520 px.

## Editor visual — español

| Apartado | Captura |
|---|---|
| General | ![Apartado General en español](screenshots/v042/editor-es-general.png) |
| Apariencia | ![Apartado Apariencia en español](screenshots/v042/editor-es-appearance.png) |
| Contenido y orden | ![Apartado Contenido y orden en español](screenshots/v042/editor-es-content.png) |
| Avanzado | ![Apartado Avanzado en español](screenshots/v042/editor-es-advanced.png) |
| Entidades | ![Apartado Entidades en español](screenshots/v042/editor-es-entities.png) |

## Editor visual — inglés

| Apartado | Captura |
|---|---|
| General | ![General en inglés](screenshots/v042/editor-en-general.png) |
| Appearance | ![Appearance en inglés](screenshots/v042/editor-en-appearance.png) |
| Content and order | ![Content and order en inglés](screenshots/v042/editor-en-content.png) |
| Advanced | ![Advanced en inglés](screenshots/v042/editor-en-advanced.png) |
| Entities | ![Entities en inglés](screenshots/v042/editor-en-entities.png) |

## Ilustración del cargador

Los once estados visuales de abajo ya no alternan entre ilustraciones independientes. El cargador es una sola imagen fotográfica -dos capas WebP transparentes recortadas de la propia fotografía del press kit de V2C- con el logo iluminado y la LCD de 16x2 dibujados como SVG encima, para poder recolorearlos y animarlos según el estado. La procedencia completa, las medidas y las notas de licencia están en [`docs/artwork/README.md`](artwork/README.md).

Qué cambia por estado y qué no:

- **Color del LED**: cada estado tiñe el logo con el color de las propias [instrucciones de iluminación LED](https://v2charge.com/support/trydan/led-lighting-instructions) de V2C. Esa tabla documenta exactamente dos comportamientos, fijo e intermitente; no existe un "pulso" o "respiración" en el hardware, y la tarjeta no inventa ninguno.
- **Resplandor**: el resplandor suave alrededor del logo es una decisión de diseño de esta tarjeta, no algo que haga el LED físico. Está ahí por legibilidad en un dashboard, no como afirmación sobre el aparato real.
- **Velocidad del parpadeo**: al cargar, el logo parpadea más rápido con más amperios y más despacio con menos, igual que hace el propio hardware; es el único comportamiento animado con base real en el hardware.

`charger_art` (`focus` / `mid` / `full`) controla cuánto se ve de la ilustración y `show_connector` activa el cable del conector; consulta [Configuración](CONFIGURATION.es.md#encuadre-de-la-ilustración-del-cargador).

## Once estados

![Secuencia animada de los once estados localizados](media/charger-states.gif)

| Estado | Captura |
|---|---|
| Sin vehículo | ![Sin vehículo con LCD localizada](screenshots/v042/state-disconnected-dark.png) |
| Cargando | ![Carga con potencia intensidad y voltaje reales](screenshots/v042/state-charging-dark.png) |
| Carga completa | ![Carga completa con energía real](screenshots/v042/state-complete-dark.png) |
| Temporizador | ![Carga programada](screenshots/v042/state-timer-dark.png) |
| Actualizando | ![Actualización del cargador](screenshots/v042/state-updating-dark.png) |
| Control Pilot | ![Error Control Pilot](screenshots/v042/state-control_pilot-dark.png) |
| Load Balancing | ![Error Load Balancing](screenshots/v042/state-load_balancing-dark.png) |
| Error | ![Error genérico](screenshots/v042/state-error-dark.png) |
| Esperando potencia | ![Vehículo esperando potencia](screenshots/v042/state-waiting_power-dark.png) |
| Wi-Fi conectado | ![Wi-Fi conectado](screenshots/v042/state-wifi_connected-dark.png) |
| Conectando Wi-Fi | ![Conectando Wi-Fi](screenshots/v042/state-wifi_connecting-dark.png) |

La ilustración no contiene texto propio de un idioma: el logo es una marca trazada y la LCD es una rejilla de puntos dibujada como trazados SVG, no texto renderizado. Las líneas mostradas se reflejan en un atributo `data-lcd`, siguen el idioma de la tarjeta y reducen su tamaño en traducciones largas.