# ⚡ V2C Trydan Card

[English](README.md) · [Configuración](docs/CONFIGURATION.es.md) · [Guía visual](docs/VISUAL_GUIDE.es.md) · [Preguntas frecuentes](docs/FAQ.es.md)

[![Última release](https://img.shields.io/github/v/release/mactron254/v2c-trydan-card?label=release)](https://github.com/mactron254/v2c-trydan-card/releases/latest)
[![CI](https://github.com/mactron254/v2c-trydan-card/actions/workflows/ci.yml/badge.svg)](https://github.com/mactron254/v2c-trydan-card/actions/workflows/ci.yml)
[![Validación HACS](https://github.com/mactron254/v2c-trydan-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/mactron254/v2c-trydan-card/actions/workflows/hacs.yml)
[![Licencia MIT](https://img.shields.io/github/license/mactron254/v2c-trydan-card)](LICENSE)
[![Proyecto asistido con IA](https://img.shields.io/badge/IA_asistida-Codex%20%2F%20OpenAI-412991)](#-hecha-con-ia)

Una **Home Assistant V2C Trydan card** moderna para visualizar y controlar un cargador Trydan desde Lovelace. Utiliza las entidades expuestas por la [integración oficial V2C de Home Assistant](https://www.home-assistant.io/integrations/v2c/) y reúne un editor visual traducido, controles adaptables y lecturas reales en un **EV charger dashboard** claro. Puede instalarse mediante **HACS** o manualmente como Lovelace EV charger card.

> Este es un proyecto comunitario independiente. No está afiliado ni respaldado por V2C y no sustituye la integración oficial de Home Assistant.
>
> ⚠️ **Uso bajo tu responsabilidad.** Este software comunitario se proporciona sin garantías. Revisa cada asociación de entidades y prueba los controles del cargador con seguridad antes de confiar en ellos. Dentro de lo permitido por la ley, los autores y colaboradores no asumen responsabilidad por daños, pérdidas, interrupciones o comportamientos inesperados. Consulta la [licencia MIT](LICENSE).

![V2C Trydan Card mostrando el layout dividido en un dashboard oscuro de Home Assistant](docs/screenshots/v042/layout-split-dark.png)

## ✨ Características

- 🎛️ Monitoriza la carga y controla intensidad, pausa, bloqueo, temporizador, potencia dinámica y luces.
- 🌍 Usa el editor visual y la LCD localizada del cargador en 10 idiomas.
- 📐 Elige densidad XXL, estándar, compacta o ultracompacta.
- 🖥️ Cambia entre layouts automático, centrado, dividido y en línea.
- ⚡ Muestra potencia, intensidad, voltaje y energía de sesión reales cuando existen entidades válidas.
- ☀️ Activa el resumen de flujo energético sólo si lo necesitas; viene desactivado.
- 🔎 Descubre entidades mediante metadatos del registro de dispositivos de Home Assistant, aunque cambien sus nombres visibles.
- 🎨 Elige colores predefinidos o define un color HEX personalizado y sincronizado.
- ♿ Navega con teclado, foco visible, movimiento reducido y soporte de 280 a 768 px.

## 📐 Cuatro densidades

<table>
  <tr>
    <th>XXL</th>
    <th>Estándar</th>
    <th>Compacta</th>
    <th>Ultracompacta</th>
  </tr>
  <tr>
    <td><img src="docs/screenshots/v042/density-xxl-light.png" width="180" alt="Densidad XXL de V2C Trydan Card en tema claro"></td>
    <td><img src="docs/screenshots/v042/density-standard-light.png" width="180" alt="Densidad estándar de V2C Trydan Card en tema claro"></td>
    <td><img src="docs/screenshots/v042/density-compact-light.png" width="180" alt="Densidad compacta de V2C Trydan Card en tema claro"></td>
    <td><img src="docs/screenshots/v042/density-ultra_compact-light.png" width="180" alt="Densidad ultracompacta sin ilustración del cargador"></td>
  </tr>
</table>

Ultracompacta conserva estado, lecturas y controles esenciales, pero oculta intencionadamente la ilustración del cargador. Compara todos los modos claros y oscuros en la [guía visual](docs/VISUAL_GUIDE.es.md#densidades).

## 🚗 De vehículo desconectado a cargando

![Animación del cargador V2C Trydan cambiando de sin vehículo a vehículo conectado y cargando en español](docs/media/vehicle-connection-es.gif)

La LCD localizada sigue la secuencia real: **Sin vehículo → Vehículo conectado → Cargando**.

## 🌍 Idiomas

🇬🇧 Inglés · 🇮🇹 Italiano · 🇩🇪 Alemán · 🇫🇷 Francés · 🇳🇱 Neerlandés · 🇸🇪 Sueco · 🇩🇰 Danés · 🇳🇴 Noruego · 🇷🇴 Rumano · 🇪🇸 Español

## 💡 Por qué nació este proyecto

Creé V2C Trydan Card como proyecto personal para Home Assistant. Cuando busqué una tarjeta genérica para el cargador de mi propio Trydan, las opciones que encontré no cubrían la monitorización visual y los controles que necesitaba o parecían desactualizadas. Con ayuda de IA construí una tarjeta para mi dashboard que me permite monitorizar y controlar el cargador con claridad. Ahora que funciona en mi instalación, la comparto por si también ayuda a otros usuarios de vehículo eléctrico.

— Marc ([@mactron254](https://github.com/mactron254))

## 🤖 Hecha con IA

Este proyecto explica de forma transparente cómo se ha creado:

- **Marc** concibió el proyecto, marcó su dirección, lo probó con una instalación Trydan real y toma las decisiones de aceptación final.
- **Codex / OpenAI** ha sido la principal herramienta de desarrollo, transformando los requisitos de Marc en implementación, pruebas, documentación y material reproducible.
- El producto sigue bajo dirección humana: la ayuda de IA se documenta, no se oculta.

Consulta el registro de autoría en [CONTRIBUTORS.md](CONTRIBUTORS.md).

## 📦 Instalación con HACS

[![Abrir Home Assistant y añadir V2C Trydan Card mediante HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=mactron254&repository=v2c-trydan-card&category=plugin)

Si aún no aparece en el catálogo, añade <code>https://github.com/mactron254/v2c-trydan-card</code> como repositorio personalizado de tipo **Dashboard**. Instálala, recarga el navegador y añade la tarjeta desde el editor.

### Instalación manual

1. Descarga <code>v2c-trydan-card.js</code> desde la [última release](https://github.com/mactron254/v2c-trydan-card/releases/latest).
2. Copia el archivo en <code>/config/www/v2c-trydan-card.js</code>.
3. Añade <code>/local/v2c-trydan-card.js</code> como recurso JavaScript de tipo módulo.
4. Recarga Home Assistant.

## ⚙️ Configuración

Empieza con cualquier entidad perteneciente al dispositivo V2C. La tarjeta descubre los roles compatibles mediante metadatos estables del registro de dispositivos.

~~~yaml
type: custom:v2c-trydan-card
entity: binary_sensor.garaje_v2c_cargador_conectado
~~~

El editor visual incluye:

- **General:** dispositivo, idioma y comportamiento principal.
- **Apariencia:** tema, densidad, layout, color, escala y radio.
- **Contenido y orden:** métricas visibles, fuentes y orden de secciones.
- **Entidades:** descubrimiento mediante el registro de dispositivos o asignación manual.
- **Avanzado:** presets de amperaje, servicios y flujo energético opcional.

Activa el resumen energético sólo cuando lo quieras:

~~~yaml
show_energy_flow: true
~~~

El YAML existente desde v0.4.0 sigue siendo compatible. Ultracompacta conserva <code>show_charger</code> para que la ilustración vuelva al seleccionar otra densidad.

## 💬 Comunidad, feedback y soporte

- Usa [GitHub Discussions](https://github.com/mactron254/v2c-trydan-card/discussions) para ideas, preguntas, votaciones y ejemplos de dashboards.
- Abre una [Issue](https://github.com/mactron254/v2c-trydan-card/issues/new?template=bug_report.yml) para un error reproducible. Las ideas maduras de Discussions podrán convertirse después en Issues.
- Informa de vulnerabilidades de forma privada mediante [GitHub Security Advisories](https://github.com/mactron254/v2c-trydan-card/security/advisories/new).

Se agradecen el feedback, las propuestas de funciones y las correcciones. Elimina identificadores de entidad, ubicaciones, SSID, direcciones IP privadas, tokens y cualquier otro dato personal antes de compartir registros o capturas.

## 📚 Documentación

- [Referencia completa de configuración](docs/CONFIGURATION.es.md)
- [Guía visual con 33 capturas reproducibles y cuatro GIF](docs/VISUAL_GUIDE.es.md)
- [FAQ y resolución de problemas](docs/FAQ.es.md)
- [Historial de cambios](CHANGELOG.md)
- [Guía para colaborar](CONTRIBUTING.md)
- [Borrador del foro en español](docs/FORUM_POST_ES.md) · [Borrador en inglés](docs/FORUM_POST_EN.md)

## 🧰 Desarrollo

Necesita Node.js 20+ y pnpm 11+. El repositorio está fijado a pnpm 11.5.1.

~~~powershell
corepack pnpm@11.5.1 install
corepack pnpm@11.5.1 check
corepack pnpm@11.5.1 docs:capture
~~~

## 📄 Créditos y licencia

La colaboración técnica se acredita a **Codex**, seguido del responsable del producto **Marc** ([@mactron254](https://github.com/mactron254)). Publicado con [licencia MIT](LICENSE).
