# V2C Trydan Card visual guide — v0.4.2

[Español](VISUAL_GUIDE.es.md) · [Configuration](CONFIGURATION.md)

All images are generated locally with `corepack pnpm@11.5.1 docs:capture`. They use the demo, bundled SVGs and mock data; no Home Assistant credentials or private entities are captured.

![Animated tour showing card densities, layouts and editor sections](media/trydan-card-tour.gif)

## Densities

| Density | Light | Dark |
|---|---|---|
| XXL | ![XXL density in light theme](screenshots/v042/density-xxl-light.png) | ![XXL density in dark theme](screenshots/v042/density-xxl-dark.png) |
| Standard | ![Standard density in light theme](screenshots/v042/density-standard-light.png) | ![Standard density in dark theme](screenshots/v042/density-standard-dark.png) |
| Compact | ![Compact density in light theme](screenshots/v042/density-compact-light.png) | ![Compact density in dark theme](screenshots/v042/density-compact-dark.png) |
| Ultra compact | ![Ultra compact density without charger artwork in light theme](screenshots/v042/density-ultra_compact-light.png) | ![Ultra compact density without charger artwork in dark theme](screenshots/v042/density-ultra_compact-dark.png) |

Ultra compact intentionally removes the SVG. The state, power and essential controls remain visible.

## Layouts

| Automatic | Centered |
|---|---|
| ![Automatic responsive layout](screenshots/v042/layout-auto-dark.png) | ![Centered vertical layout](screenshots/v042/layout-centered-dark.png) |

| Split | Inline |
|---|---|
| ![Split layout with charger left and state right](screenshots/v042/layout-split-dark.png) | ![Inline reduced horizontal layout](screenshots/v042/layout-inline-dark.png) |

`split` and `inline` safely fall back below 400 px. `auto` switches at 520 px.

## Visual editor — Spanish

| Section | Screenshot |
|---|---|
| General | ![Spanish General editor section](screenshots/v042/editor-es-general.png) |
| Appearance | ![Spanish Appearance editor section](screenshots/v042/editor-es-appearance.png) |
| Content and order | ![Spanish Content and order editor section](screenshots/v042/editor-es-content.png) |
| Advanced | ![Spanish Advanced editor section](screenshots/v042/editor-es-advanced.png) |
| Entities | ![Spanish Entities editor section](screenshots/v042/editor-es-entities.png) |

## Visual editor — English

| Section | Screenshot |
|---|---|
| General | ![English General editor section](screenshots/v042/editor-en-general.png) |
| Appearance | ![English Appearance editor section](screenshots/v042/editor-en-appearance.png) |
| Content and order | ![English Content and order editor section](screenshots/v042/editor-en-content.png) |
| Advanced | ![English Advanced editor section](screenshots/v042/editor-en-advanced.png) |
| Entities | ![English Entities editor section](screenshots/v042/editor-en-entities.png) |

## Eleven charger states

![Animated sequence of the eleven localized V2C Trydan charger states](media/charger-states.gif)

| State | Screenshot |
|---|---|
| No vehicle | ![No vehicle state with localized LCD](screenshots/v042/state-disconnected-dark.png) |
| Charging | ![Charging state with real power current and voltage](screenshots/v042/state-charging-dark.png) |
| Charge complete | ![Charge complete state with real session energy](screenshots/v042/state-complete-dark.png) |
| Timer | ![Scheduled charge timer state](screenshots/v042/state-timer-dark.png) |
| Updating | ![Charger updating state](screenshots/v042/state-updating-dark.png) |
| Control Pilot | ![Control Pilot error state](screenshots/v042/state-control_pilot-dark.png) |
| Load Balancing | ![Load Balancing error state](screenshots/v042/state-load_balancing-dark.png) |
| Error | ![Generic charger error state](screenshots/v042/state-error-dark.png) |
| Waiting for power | ![Vehicle waiting for power state](screenshots/v042/state-waiting_power-dark.png) |
| Wi-Fi connected | ![Wi-Fi connected state](screenshots/v042/state-wifi_connected-dark.png) |
| Wi-Fi connecting | ![Wi-Fi connecting state](screenshots/v042/state-wifi_connecting-dark.png) |

The SVG contains no language-specific text. The overlaid LCD is safe HTML, localized with the card and scaled for long translations.