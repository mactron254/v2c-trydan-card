# V2C Trydan Card visual guide — v0.4.2

[Español](VISUAL_GUIDE.es.md) · [Configuration](CONFIGURATION.md)

All images are generated locally with `corepack pnpm@11.5.1 docs:capture`. They use the demo, bundled artwork and mock data; no Home Assistant credentials or private entities are captured.

> The screenshots and GIFs below were captured before the charger-artwork redesign and still show the retired per-state illustrations. They will be recaptured; until then, treat the images as a stand-in for layout and density, not for how the charger itself currently looks. See [Charger artwork](#charger-artwork) below for what actually ships now.

Every PNG is cropped automatically against its real row background. Shadows are preserved, isolated pixels are ignored and the final lower margin is at most 16 px. Exact dimensions are recorded in the reproducible capture manifest.

![Animated tour showing card densities, layouts and editor sections](media/trydan-card-tour.gif)

## Vehicle connection cycle

![V2C Trydan charger changing from no vehicle to vehicle connected and charging](media/vehicle-connection-en.gif)

The three frames use the real visual states: **No vehicle → Vehicle connected → Charging**.

## Densities

| Density | Light | Dark |
|---|---|---|
| XXL | ![XXL density in light theme](screenshots/v042/density-xxl-light.png) | ![XXL density in dark theme](screenshots/v042/density-xxl-dark.png) |
| Standard | ![Standard density in light theme](screenshots/v042/density-standard-light.png) | ![Standard density in dark theme](screenshots/v042/density-standard-dark.png) |
| Compact | ![Compact density in light theme](screenshots/v042/density-compact-light.png) | ![Compact density in dark theme](screenshots/v042/density-compact-dark.png) |
| Ultra compact | ![Ultra compact density without charger artwork in light theme](screenshots/v042/density-ultra_compact-light.png) | ![Ultra compact density without charger artwork in dark theme](screenshots/v042/density-ultra_compact-dark.png) |

Ultra compact intentionally removes the charger artwork. The state, power and essential controls remain visible.

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

## Charger artwork

The eleven visual states below no longer switch between separate illustrations. The charger is one photographic image - two transparent WebP layers cut from V2C's own press-kit photograph - with the illuminated logo and the 16x2 LCD drawn as SVG on top so they can be recoloured and animated per state. Full provenance, measurements and licensing notes live in [`docs/artwork/README.md`](artwork/README.md).

What changes per state, and what does not:

- **LED colour**: each state tints the logo with the colour from V2C's own [LED lighting instructions](https://v2charge.com/support/trydan/led-lighting-instructions). That table documents exactly two behaviours, steady and blinking - there is no "pulsing" or "breathing" in the hardware, and the card does not invent one.
- **Glow**: the soft glow around the logo is this card's own design choice, not something the physical LED does. It is there for legibility on a dashboard, not as a claim about the real unit.
- **Blink rate**: while charging, the logo blinks faster at higher amperage and slower at lower amperage, matching what the hardware itself does - the one animated behaviour with a real hardware basis.

`charger_art` (`focus` / `mid` / `full`) controls how much of the illustration is framed, and `show_connector` toggles the connector cable; see [Configuration](CONFIGURATION.md#charger-artwork-framing).

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

The artwork contains no language-specific text: the logo is a traced wordmark and the LCD is a dot-matrix grid drawn as SVG paths, not rendered text. The lines shown are mirrored onto a `data-lcd` attribute, localized with the card and scaled for long translations.