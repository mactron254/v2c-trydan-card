# Guía visual de V2C Trydan Card — v0.4.2

[English](VISUAL_GUIDE.md) · [Configuración](CONFIGURATION.es.md)

Todas las imágenes se generan con `corepack pnpm@11.5.1 docs:capture`. Usan la demo, SVG locales y datos simulados; no capturan credenciales ni entidades privadas.

![Recorrido animado por densidades, layouts y apartados del editor](media/trydan-card-tour.gif)

## Densidades

| Densidad | Claro | Oscuro |
|---|---|---|
| XXL | ![Densidad XXL en claro](screenshots/v042/density-xxl-light.png) | ![Densidad XXL en oscuro](screenshots/v042/density-xxl-dark.png) |
| Estándar | ![Densidad estándar en claro](screenshots/v042/density-standard-light.png) | ![Densidad estándar en oscuro](screenshots/v042/density-standard-dark.png) |
| Compacta | ![Densidad compacta en claro](screenshots/v042/density-compact-light.png) | ![Densidad compacta en oscuro](screenshots/v042/density-compact-dark.png) |
| Ultracompacta | ![Ultracompacta sin cargador en claro](screenshots/v042/density-ultra_compact-light.png) | ![Ultracompacta sin cargador en oscuro](screenshots/v042/density-ultra_compact-dark.png) |

Ultracompacto elimina intencionadamente el SVG. Conserva estado, potencia y controles esenciales.

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

Los SVG no contienen texto. La LCD superpuesta es HTML seguro, sigue el idioma activo y reduce su fuente en traducciones largas.