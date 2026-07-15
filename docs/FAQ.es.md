# Preguntas frecuentes de V2C Trydan Card

## ¿Sustituye la integración oficial de V2C?

No. La tarjeta es una interfaz de dashboard independiente que utiliza las entidades expuestas por la [integración oficial V2C de Home Assistant](https://www.home-assistant.io/integrations/v2c/). No sustituye ni modifica esa integración.

## ¿Qué entidad debo configurar?

Cualquier entidad del dispositivo V2C Trydan. El sensor binario de conexión es una buena semilla. La tarjeta descubre el resto mediante metadatos del registro de dispositivos de Home Assistant.

## ¿Por qué no aparece el flujo energético?

Desde v0.4.2 está desactivado por defecto:

~~~yaml
show_energy_flow: true
~~~

Después selecciona fuentes y asocia manualmente las que el descubrimiento no encuentre.

## ¿Por qué ultracompacto no muestra el cargador?

Es intencionado. Prioriza estado, potencia y controles esenciales. <code>show_charger</code> se conserva y vuelve a actuar en compacto, estándar o XXL.

## ¿Por qué cambia el idioma de la LCD?

Sigue <code>language</code>. Con <code>auto</code>, el orden es: configuración de la tarjeta, locale/idioma de Home Assistant, navegador e inglés como fallback. La LCD está localizada; la ilustración SVG no contiene texto incrustado.

## ¿Los valores de la LCD son ejemplos?

No. Durante la carga usa las entidades resueltas de potencia, intensidad y voltaje. Al completar usa la energía de sesión. Las lecturas sólo aparecen si las proporcionan entidades válidas; cuando faltan datos se muestra texto traducido.

## ¿Por qué faltan controles?

Sólo se habilitan con entidades válidas del dominio esperado. Añade una asignación manual en <code>entities</code> y revisa el estado del apartado Entidades.

## ¿Qué significa entidad ambigua?

Hay varios candidatos para el mismo rol. La tarjeta no adivina para evitar servicios sobre otra entidad. Selecciona la correcta manualmente.

## ¿Por qué una flecha energética está invertida?

Usa <code>invert_grid_power</code>, <code>invert_battery_power</code> o <code>invert_solar_power</code>. Consulta las convenciones en la guía de configuración.

## La tarjeta no aparece después de actualizar

Recarga el navegador, limpia la caché y confirma que el recurso es un módulo JavaScript. En HACS usa Redownload y vuelve a cargar Home Assistant.

## ¿Qué versión de Home Assistant se admite?

El manifiesto HACS declara Home Assistant 2024.1.0 o posterior. Las versiones actuales se prueban mediante la demo local y contratos automatizados de la tarjeta.

## ¿Dónde envío feedback?

Usa [GitHub Discussions](https://github.com/mactron254/v2c-trydan-card/discussions) para ideas, preguntas, votaciones y ejemplos de dashboards. Abre una [Issue](https://github.com/mactron254/v2c-trydan-card/issues/new?template=bug_report.yml) para un error reproducible. Informa de vulnerabilidades de forma privada mediante [GitHub Security Advisories](https://github.com/mactron254/v2c-trydan-card/security/advisories/new).

Elimina identificadores de entidad, ubicaciones, SSID, direcciones IP privadas, tokens y otros datos personales antes de publicar.

## ¿Qué responsabilidad asume el proyecto?

V2C Trydan Card es software comunitario independiente, publicado con [licencia MIT](../LICENSE) y proporcionado sin garantías. Lo utilizas bajo tu responsabilidad. Revisa las asociaciones de entidades y prueba cada control del cargador con seguridad antes de confiar en él. Dentro de lo permitido por la ley, los autores y colaboradores no asumen responsabilidad por daños, pérdidas, interrupciones o comportamientos inesperados.
