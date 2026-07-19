# Configuración de V2C Trydan Card

[English](CONFIGURATION.md) · [Guía visual](VISUAL_GUIDE.es.md) · [FAQ](FAQ.es.md)

## General

| Clave | Tipo | Default | Editor | Función |
|---|---|---:|:---:|---|
| `entity` | ID de entidad | requerida | Sí | Entidad semilla del dispositivo V2C |
| `name` | texto | `V2C Trydan` | Sí | Título |
| `location` | texto | vacío | Sí | Ubicación secundaria |
| `language` | `auto` o código | `auto` | Sí | Idioma de tarjeta y editor |
| `theme` | `auto`, `light`, `dark` | `auto` | Sí | Tema |
| `display_mode` | densidad | `standard` | Sí | Densidad visual |
| `layout` | distribución | `auto` | Sí | Composición del Hero |

Idiomas: `en`, `it`, `de`, `fr`, `nl`, `sv`, `da`, `no`, `ro`, `es`. Los locales noruegos `nb` y `nn` se asignan a `no`.

## Apariencia

| Clave | Valores | Default | Uso |
|---|---|---:|---|
| `color_scheme` | `monochrome`, `v2c_blue`, `teal`, `green`, `violet`, `custom` | `monochrome` | Color de controles |
| `accent_color` | `#RRGGBB` | `#0067D9` en editor | Solo con `custom` |
| `surface_style` | `solid`, `tinted`, `transparent` | `solid` | Superficie |
| `hero_scale` | `0.75`–`1.25` | `1` | Escala del cargador |
| `card_radius` | `0`–`40` | tema HA | Radio exterior y clipping |
| `show_header` | boolean | `true` | Título y ubicación |
| `show_badges` | boolean | `true` | Insignias secundarias |
| `show_charger` | boolean | `true` | Cargador; siempre oculto en ultra |

Densidades:

- `xxl`: arte de 320–430 px, tipografía y espacios máximos.
- `standard`: arte de 260–340 px y tres métricas.
- `compact`: arte de 210–280 px y controles condensados.
- `ultra_compact`: sin SVG, potencia y controles esenciales.

Layouts:

- `centered`: vertical.
- `split`: arte izquierda y estado derecha desde 400 px.
- `inline`: Hero horizontal reducido desde 400 px.
- `auto`: centrado estrecho y dividido desde 520 px.

## Contenido y orden

| Clave | Tipo/default | Función |
|---|---|---|
| `metrics` | `power, energy, time` | Métricas visibles y su orden |
| `energy_sources` | `solar, grid, home, battery, charger` | Fuentes del flujo |
| `section_order` | `hero, metrics, controls, energy, advanced` | Orden DOM real |
| `show_energy_flow` | `false` | Flujo opcional; actívalo con `true` |
| `show_controls` | `true` | Intensidad y pausa |
| `show_advanced` | `true` | Ajustes plegados |
| `show_presets` | true salvo ultra | Botones rápidos |
| `advanced_open` | `false` | Avanzado abierto al iniciar |
| `intensity_control` | `both` | `slider`, `presets` o `both` |

```yaml
metrics: [power, time]
energy_sources: [solar, grid, charger]
section_order: [hero, metrics, energy, controls, advanced]
show_energy_flow: true
```

## Intensidad y energía

| Clave | Default | Función |
|---|---:|---|
| `current_presets` | `[6,10,13,16,20,25,32]` | Atajos de amperios enteros positivos |
| `flow_threshold_w` | `50` | Reposo por debajo del umbral |
| `invert_grid_power` | `false` | Invierte signo de red |
| `invert_battery_power` | `false` | Invierte signo de batería |
| `invert_solar_power` | `false` | Invierte signo solar |
| `confirm_lock` | `true` | Confirma antes de bloquear |
| `status_entity` | vacío | Estado visual externo opcional |

Convenciones: red positiva = importación; batería positiva = descarga; solar positiva = producción; casa positiva = consumo. `unknown` y `unavailable` nunca se convierten en cero.

## Entidades

Los overrides manuales ganan. Una entidad de dominio/dispositivo inválido no habilita servicios. Si hay varios candidatos, la tarjeta muestra ambigüedad y no adivina.

```yaml
entities:
  connected: binary_sensor.garaje_v2c_conectado
  charging: binary_sensor.garaje_v2c_cargando
  ready: binary_sensor.garaje_v2c_listo
  charge_power: sensor.garaje_v2c_potencia_carga
  charge_energy: sensor.garaje_v2c_energia_carga
  charge_time: sensor.garaje_v2c_tiempo_carga
  house_power: sensor.garaje_v2c_potencia_casa
  fv_power: sensor.garaje_v2c_potencia_solar
  battery_power: sensor.garaje_v2c_potencia_bateria
  grid_power: sensor.garaje_v2c_potencia_red
  voltage: sensor.garaje_v2c_voltaje
  intensity: number.garaje_v2c_intensidad
  paused: switch.garaje_v2c_pausa
  locked: switch.garaje_v2c_bloqueo
  timer: switch.garaje_v2c_temporizador
  dynamic: switch.garaje_v2c_dinamico
  pause_dynamic: switch.garaje_v2c_pausa_dinamica
  logo_led: light.garaje_v2c_logo
  light_led: light.garaje_v2c_luz
  charge_mode: select.garaje_v2c_modo_carga
```

Roles de diagnóstico adicionales: `min_intensity`, `max_intensity`, `meter_error`, `ssid`, `ip_address`, `signal_status`.

## Estados externos

`disconnected`, `charging`, `complete`, `timer`, `updating`, `control_pilot`, `load_balancing`, `error`, `waiting_power`, `wifi_connected`, `wifi_connecting`.

La LCD usa el idioma activo. En carga muestra potencia, intensidad y voltaje reales; al completar usa la energía real. Si faltan datos muestra un fallback traducido, nunca cifras de ejemplo.

## Ejemplo completo

```yaml
type: custom:v2c-trydan-card
entity: binary_sensor.garaje_v2c_conectado
name: Trydan
location: Garaje
language: auto
theme: auto
display_mode: standard
layout: auto
color_scheme: v2c_blue
surface_style: solid
hero_scale: 1
card_radius: 20
metrics: [power, energy, time]
show_energy_flow: true
energy_sources: [solar, grid, home, battery, charger]
intensity_control: both
current_presets: [6, 10, 16, 20, 25, 32]
```

## Migración a v0.4.2

No se elimina ninguna clave pública. Hay dos cambios intencionados:

1. `show_energy_flow` pasa a `false`; añade `true` para mantenerlo.
2. `ultra_compact` oculta siempre el SVG, conservando `show_charger` para otras densidades.
## Diagnosticos de descubrimiento

El editor informa loading, seed_not_found, seed_not_v2c, seed_missing_device y legacy. Corrige primero semilla; descubrimiento automatico nunca cruza otro dispositivo V2C. Coincidencia legacy sigue limitada dispositivo elegido y se muestra para revision.
