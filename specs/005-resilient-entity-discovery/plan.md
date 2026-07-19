# Plan técnico

1. Sustituir caché y discovery mutable por resolver puro sobre hass.entities.
2. Guardar solo el mapa role -> entity_id resuelto; obtener valores en hass.states.
3. Aplicar shouldUpdate sobre IDs observados y cambios de registry/idioma.
4. Restringir servicios a entidades V2C vigentes del mismo dispositivo.
5. Exponer estado de resolución en editor y metadatos de grid/sugerencia.
6. Cubrir aislamiento, ambigüedad, overrides, seguridad y render con Vitest.
