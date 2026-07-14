# Public configuration contract v0.4.0

```yaml
display_mode: standard # xxl | standard | compact | ultra_compact
layout: auto # auto | centered | split | inline
color_scheme: monochrome # monochrome | v2c_blue | teal | green | violet | custom
accent_color: "#0067D9" # sólo custom
surface_style: solid # solid | tinted | transparent
hero_scale: 1 # 0.75..1.25
card_radius: 20 # 0..40, omitido tema HA
metrics: [power, energy, time]
energy_sources: [solar, grid, home, battery, charger]
intensity_control: both # slider | presets | both
section_order: [hero, metrics, controls, energy, advanced]
show_header: true
show_badges: true
show_presets: true
advanced_open: false
language: auto
```

Valores desconocidos no sobreviven normalización. `show_presets` default es `false` en ultra y `true` en resto. Color custom inválido usa monocromo y aviso localizado.
