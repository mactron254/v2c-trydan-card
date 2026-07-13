# Research: V2C Trydan Charger Card

## Decision 1: Lit 3 + TypeScript + Vite library mode

**Decision**: Componente Web Lit 3, TypeScript estricto y bundle único con Vite.

**Rationale**: Lit encaja con frontend Home Assistant, conserva actualización reactiva y
permite un custom element autocontenido. Vite importa SVG como texto y genera un módulo.

**Alternatives considered**: JavaScript sin tipos; React; copiar helpers de otra card.

## Decision 2: Descubrimiento por registro y `translation_key`

**Decision**: Resolver dispositivo desde entidad semilla; emparejar roles por
`translation_key`, luego `unique_id`/sufijo y clase de dispositivo. Override manual gana.

**Rationale**: `translation_key` oficial sobrevive idioma y renombrados. Fallback permite
demo y sistemas que no entreguen metadatos completos.

**Alternatives considered**: IDs fijos; nombres amigables; exigir todas las entidades.

## Decision 3: Estado visual puro con override externo

**Decision**: Función pura aplica tabla de precedencia. `status_entity` opcional selecciona
cualquiera de 11 SVG; si falta, se infieren solo estados respaldados. Errores de medidor
se ignoran cuando control dinámico está apagado.

**Rationale**: Integración no expone actualización, Control Pilot o color físico del logo.
Inferirlos sin evidencia sería engañoso. Override conserva cobertura completa.

**Alternatives considered**: error de medidor siempre global; SVG único; heurísticas sin evidencia.

## Decision 4: Acciones idempotentes desde cambio confirmado

**Decision**: Rango actualiza visualmente durante arrastre y llama `number.set_value` solo
en `change`. Switches usan servicios estándar; rol queda pendiente hasta confirmación o timeout.

**Rationale**: Evita inundar API y dobles clics. Home Assistant sigue como fuente de verdad.

**Alternatives considered**: llamada por cada `input`; UI optimista persistente; servicios privados.

## Decision 5: Diseño “Carbon Flow” específico de V2C

**Decision**: Carbono + naranja oficial, datos monoespaciados, Trydan real y rail funcional.

**Rationale**: Reconocible, elegante en claro/oscuro y no parece plantilla genérica.

**Alternatives considered**: glassmorphism azul; tarjetas métricas repetidas; clon Lektrico.

## Evidence

- Integración oficial actual: binary sensors, potencia/energía/tiempo/casa/FV/batería,
  intensidad, luces, switches y selector de modo.
- Entidades reales aportadas incluyen red, solar, batería y voltaje externos.
- Lektrico demuestra valor de autodescubrimiento, editor, responsive y SVG; diseño será propio.
- Web pública V2C usa repetidamente negro, blanco y naranja `#FF8001`.
