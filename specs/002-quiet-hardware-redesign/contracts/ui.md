# UI Contract

- El nombre se renderiza una vez dentro de `.card-heading`.
- `.charger-art` precede a `.charger-status` en el DOM.
- `.charger-status` usa `role="status"`.
- `.primary-metrics` contiene potencia, energía y tiempo.
- `.energy-summary` diferencia actividad, cero, parcial y sin datos.
- `show_energy_flow: false` elimina el resumen.
- Configuración YAML existente conserva su significado.
