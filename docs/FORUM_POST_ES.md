# Borrador para el foro — español

## Título sugerido

**⚡ V2C Trydan Card — control visual multilingüe para cargadores Trydan**

## Categoría y etiquetas

Share your Projects! → Dashboards & Frontend
Etiquetas: lovelace, cards, hacs, ev-charging, v2c

## Cuerpo

Hola, comunidad de Home Assistant 👋

Creé **V2C Trydan Card** como proyecto personal para mi propio cargador. Al buscar una tarjeta para Trydan no encontré una alternativa moderna y mantenida que me ofreciera la visualización y los controles que quería. La hice para mi dashboard y ahora la comparto por si también ayuda a otros usuarios de vehículo eléctrico.

Es un proyecto comunitario independiente; no está afiliado ni respaldado por V2C.

![V2C Trydan cambiando de sin vehículo a conectado y cargando](https://raw.githubusercontent.com/mactron254/v2c-trydan-card/main/docs/media/vehicle-connection-es.gif)

### ✨ Características

- 🎛️ Intensidad, presets, pausa, bloqueo, temporizador, control dinámico y luces.
- 🌍 Editor visual y LCD del cargador traducidos a 10 idiomas.
- 📐 Densidades XXL, estándar, compacta y ultracompacta.
- 🖥️ Layout automático, centrado, dividido y en línea.
- ⚡ Potencia, intensidad, voltaje y energía de sesión reales.
- ☀️ Flujo energético opcional y desactivado por defecto.
- ♿ Teclado, foco visible y movimiento reducido.

Ultracompacto oculta intencionadamente la ilustración, pero conserva estado, lecturas y controles esenciales.

![V2C Trydan Card con layout dividido y tema oscuro](https://raw.githubusercontent.com/mactron254/v2c-trydan-card/main/docs/screenshots/v042/layout-split-dark.png)

### 🤖 Ayuda de IA transparente

Yo concebí, dirigí y revisé el proyecto. Codex / OpenAI ayudó en el desarrollo, las pruebas, la documentación y las capturas/GIF reproducibles. Las decisiones de producto y la aceptación final siguen bajo dirección humana.

### 📦 Instalación

[![Abrir V2C Trydan Card en HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=mactron254&repository=v2c-trydan-card&category=plugin)

Si hace falta, añade <code>https://github.com/mactron254/v2c-trydan-card</code> como repositorio personalizado de tipo **Dashboard** en HACS.

~~~yaml
type: custom:v2c-trydan-card
entity: binary_sensor.garaje_v2c_cargador_conectado
~~~

Flujo energético opcional:

~~~yaml
show_energy_flow: true
~~~

### 📚 Documentación y soporte

- Repositorio: https://github.com/mactron254/v2c-trydan-card
- Configuración: https://github.com/mactron254/v2c-trydan-card/blob/main/docs/CONFIGURATION.es.md
- Guía visual: https://github.com/mactron254/v2c-trydan-card/blob/main/docs/VISUAL_GUIDE.es.md
- Fallos: https://github.com/mactron254/v2c-trydan-card/issues

La tarjeta v0.4.2 incluye LCD traducida, lecturas reales, ilustración oculta en ultra y defaults más seguros. La documentación del repositorio contiene 33 capturas reproducibles bien recortadas y cuatro GIF optimizados.

Agradezco pruebas con distintas versiones de firmware e idiomas de entidades. Antes de compartir YAML o capturas, elimina IDs privados, SSID e IP.
