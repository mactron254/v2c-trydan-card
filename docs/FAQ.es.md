# Preguntas frecuentes de V2C Trydan Card

## ¿Sustituye la integración oficial de V2C?

No. La tarjeta es una interfaz de dashboard y necesita las entidades V2C de Home Assistant. Es un proyecto independiente.

## ¿Qué entidad debo configurar?

Cualquier entidad del dispositivo V2C Trydan. El sensor binario de conexión es una buena semilla. La tarjeta descubre el resto mediante metadatos del registro.

## ¿Por qué no aparece el flujo energético?

Desde v0.4.2 está desactivado por defecto:

```yaml
show_energy_flow: true
```

Después selecciona fuentes y asocia manualmente las que discovery no encuentre.

## ¿Por qué ultracompacto no muestra el cargador?

Es intencionado. Prioriza estado, potencia y controles esenciales. `show_charger` se conserva y vuelve a actuar en compacto, estándar o XXL.

## ¿Por qué cambia el idioma de la LCD?

Sigue `language`. Con `auto`: configuración, locale/idioma de Home Assistant, navegador e inglés como fallback.

## ¿Los valores de la LCD son ejemplos?

No. Durante carga usa potencia, intensidad y voltaje resueltos. Al completar usa energía de sesión. Si faltan datos muestra texto traducido.

## ¿Por qué faltan controles?

Solo se habilitan con entidades válidas del dominio esperado. Añade un override en `entities` y revisa el estado del apartado Entidades.

## ¿Qué significa entidad ambigua?

Hay varios candidatos para el mismo rol. La tarjeta no adivina para evitar servicios sobre otra entidad. Selecciona la correcta manualmente.

## ¿Por qué una flecha energética está invertida?

Usa `invert_grid_power`, `invert_battery_power` o `invert_solar_power`. Consulta las convenciones en la guía de configuración.

## La tarjeta no aparece después de actualizar

Recarga el navegador, limpia caché y confirma que el recurso es un módulo JavaScript. En HACS usa Redownload y vuelve a cargar Home Assistant.

## ¿Qué versión de Home Assistant se admite?

El manifiesto HACS declara Home Assistant 2024.1.0 o posterior.

## ¿Cómo informo de un fallo?

Abre una issue con versiones, navegador, YAML anonimizado, error de consola y captura. No publiques tokens, URL pública, SSID ni IP privada.