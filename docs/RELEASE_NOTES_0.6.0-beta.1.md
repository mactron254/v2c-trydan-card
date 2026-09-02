# v0.6.0-beta.1 — beta comunitaria

Esta versión es preliminar. `v0.5.0` continúa siendo la versión estable y no habrá promoción automática a `v0.6.0` hasta conocer el resultado de las pruebas comunitarias.

## Gracias, Pere

Gracias especialmente a **Pere Montpeó** ([@pmontp19](https://github.com/pmontp19)) por iniciar la mejora en #21 y aportar el refactor de #22, el nuevo arte por capas y el conector de #24, y la traducción catalana de #25. Sus fotografías, WebP, vectores, geometría y documentación de procedencia se conservan en esta beta.

## Qué probar

- Los encuadres `focus`, `mid` y `full`, con y sin conector.
- Todos los estados del cargador, las animaciones, la LCD y los temas claro/oscuro.
- Catalán manual con `language: ca` y automático con Home Assistant configurado en `ca-ES`.
- Intensidad, pausa, bloqueo, temporizador, modulación dinámica, luces y modo de carga.
- Configuraciones YAML existentes: no se ha retirado ninguna opción pública.

Los controles manuales ahora solo aceptan una entidad V2C de su función exacta, rechazan duplicados y vuelven a comprobar el rol al pulsar. Los colores personalizados solo admiten `#RRGGBB`.

## Instalar mediante HACS

Activa las versiones preliminares para este repositorio y selecciona `v0.6.0-beta.1`. HACS mantiene las versiones preliminares desactivadas por defecto; consulta su [documentación oficial](https://www.hacs.xyz/docs/use/entities/switch/).

Si encuentras un fallo, deja los pasos y el estado probado en [el issue #21](https://github.com/mactron254/v2c-trydan-card/issues/21). Antes de publicar capturas o registros, elimina IDs de entidad, ubicaciones, SSID, IP, tokens y datos personales.

La release incluye `v2c-trydan-card.js`, su SHA-256 y un registro JSON de procedencia generado desde el commit exacto del tag.
