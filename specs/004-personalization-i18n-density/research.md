# Research: Personalización, densidad e idiomas

## Decisiones

### Contrato único de configuración

**Decision**: Normalizar cada opción pública una vez antes de renderizar.
**Rationale**: YAML/editor muestran mismo resultado; impide CSS o servicio con valores inválidos.
**Alternatives**: Validar disperso en componentes — rechazado: divergencia y tests frágiles.

### Localización tipada sin herencia

**Decision**: Un archivo completo y tipado por idioma, validado por paridad profunda.
**Rationale**: Impide fallback inglés y casts inseguros.
**Alternatives**: Base inglesa con `Partial` — rechazado por ocultar traducciones ausentes.

### Discovery efímero y seguro

**Decision**: Overrides YAML sólo ganan si válidos; discovery queda en memoria y expone estado.
**Rationale**: No muta configuración ni controla entidad errónea.
**Alternatives**: Guardar entidades halladas — rechazado: congela autodiscovery y ensucia YAML.

### Layout por atributos + container queries

**Decision**: Card mantiene DOM por secciones; CSS resuelve `auto`/forzado según ancho.
**Rationale**: Orden accesible coincide con visual y funciona en columnas HA.
**Alternatives**: Duplicar DOM por layout — rechazado: lectores de pantalla y mantenimiento.
