# Registro de fallos y resoluciones

Cada entrada incluye fecha, síntoma, causa, resolución y prevención.

## 2026-07-13 — Acceso sandbox a carpetas internas

- **Síntoma**: `apply_patch` no podía leer archivos existentes por fallo ACL.
- **Causa**: helper Windows devolvió `apply deny-read ACLs`.
- **Resolución**: parches prepararon archivos/migraciones en ruta permitida; copia y ejecución validadas fuera del helper defectuoso.
- **Prevención**: validar contexto y abortar migraciones si no coincide.

## 2026-07-13 — Council rechazó modelo plano

- **Síntoma**: inferencias mezclaban carga, conectividad, inhibidores y fallos.
- **Causa**: precedencia única perdía señales simultáneas.
- **Resolución**: modelo por ejes, señales trivalentes, 11 SVG exactos y badges secundarios.
- **Prevención**: probar contradicciones y entidades ausentes antes de UI.

## 2026-07-13 — Minificador no disponible en Vite 8

- **Síntoma**: build falló con `minify: "esbuild"`.
- **Causa**: Vite 8 no incluye esbuild como dependencia implícita.
- **Resolución**: `minify: "oxc"`; smoke verifica bundle único.
- **Prevención**: declarar minificador y comprobar artefacto.

## 2026-07-13 — pnpm anidado usó otra versión

- **Síntoma**: script usó pnpm global 11.4.
- **Causa**: `check` invocaba otros comandos pnpm.
- **Resolución**: `check` ejecuta directamente `tsc`, `vitest`, `vite` y smoke.
- **Prevención**: no anidar pnpm con Corepack fijado.

## 2026-07-13 — BOM inválido en package.json

- **Síntoma**: `Invalid package.json`.
- **Causa**: PowerShell añadió BOM.
- **Resolución**: UTF-8 sin BOM y validación inmediata.
- **Prevención**: escrituras explícitas UTF-8 sin BOM.

## 2026-07-13 — Navegador visual bloqueado

- **Síntoma**: navegador integrado no abrió demo por ACL.
- **Causa**: runtime visual sin acceso al proceso local.
- **Resolución**: DOM, accesibilidad, responsive CSS, build y HTTP verificados; demo permite revisión manual.
- **Prevención**: revisar matriz visual antes de release estable.

## 2026-07-13 — Parche Git rechazado por BOM/contexto

- **Síntoma**: `git apply` no aceptó parche multiarchivo.
- **Causa**: archivos mezclaban BOM y contextos con codificación heredada.
- **Resolución**: migración determinista con reemplazos exactos y aborto ante contexto ausente.
- **Prevención**: normalizar UTF-8 sin BOM y mantener CI.

## 2026-07-13 — Defaults insertados también en stub

- **Síntoma**: TypeScript encontró `config` fuera de alcance en `stubConfig`.
- **Causa**: reemplazo global coincidió con dos objetos que compartían `type`.
- **Resolución**: stub usa literales `auto` y `standard`; prueba de tipos ejecutada antes de commit.
- **Prevención**: acotar reemplazos con contexto de función.

## 2026-07-13 — GitHub Actions no encontró pnpm

- **Síntoma**: CI falló en `actions/setup-node` con `Unable to locate executable file: pnpm`.
- **Causa**: caché pnpm se configuró antes de activar pnpm con Corepack.
- **Resolución**: `pnpm/action-setup@v4` instala pnpm 11.5.1 antes de `setup-node`.
- **Prevención**: el gestor debe existir antes de habilitar su caché en `setup-node`.

## 2026-07-13 — Overflow responsive detectado en capturas

- **Síntoma**: slider y botón salían por la derecha en compacto y ultracompacto.
- **Causa**: controles en dos columnas dentro de contenedores estrechos y ancho intrínseco del rango.
- **Resolución**: controles apilados por defecto, dos columnas solo en estándar desde 520 px y `min-width: 0` en rango.
- **Prevención**: capturas headless a 280, 320 y 520 px antes de cada release visual.

## 2026-07-13 — Typecheck en prueba de orden DOM

- **Síntoma**: TS2532 al combinar optional chaining con máscara `DOCUMENT_POSITION_FOLLOWING`.
- **Causa**: el resultado podía ser `undefined` antes de la operación binaria.
- **Resolución**: asserts explícitos y guard clause antes de comparar nodos.
- **Prevención**: ejecutar typecheck además de Vitest; las pruebas podían pasar en runtime.

## 2026-07-13 — URL con espacios en migración Node

- **Síntoma**: la migración no encontró los SVG y buscó una ruta con `V2c%20dashboard`.
- **Causa**: se usó `URL.pathname` directamente como ruta Windows.
- **Resolución**: conversión con `fileURLToPath()` antes de combinar rutas.
- **Prevención**: no convertir URL de archivo a ruta mediante recortes o decodificación manual.

## 2026-07-13 — Interpolación accidental en migración Lit

- **Síntoma**: el script lanzó `TypeError` al intentar leer `this.config`.
- **Causa**: un template literal del migrador evaluó la interpolación destinada al componente Lit.
- **Resolución**: segundo paso acotado con cadena literal y contextos exactos.
- **Prevención**: usar cadenas entre comillas o escapar interpolaciones al generar plantillas Lit.

## 2026-07-13 — URL de módulo transformada en Vitest

- **Síntoma**: `fileURLToPath(import.meta.url)` falló en una prueba ejecutada por Vite.
- **Causa**: el transformador sustituyó la URL de módulo por un identificador no `file:`.
- **Resolución**: fuentes de prueba resueltas desde `process.cwd()`.
- **Prevención**: no depender de `import.meta.url` para archivos del workspace dentro de Vitest/Vite.

## 2026-07-13 — Demo visual retenía 520 px

- **Síntoma**: capturas estrechas mostraban `style="width: 280px"`, pero el host seguía midiendo 520 px.
- **Causa**: mínimo intrínseco del ítem Grid y transición de anchura congelada por el reloj virtual de Edge.
- **Resolución**: `min-width: 0` en stage/preview, card al 100 % y transición desactivada solo en modo captura.
- **Prevención**: medir `clientWidth` y `scrollWidth` en la matriz visual; no validar responsive únicamente por dimensiones del PNG.

## 2026-07-13 — Dos puntos tras variable PowerShell

- **Síntoma**: el comando de matriz no llegó a ejecutarse por una referencia de variable inválida.
- **Causa**: PowerShell interpretó `$id:` como nombre con ámbito.
- **Resolución**: delimitación explícita `${id}:`.
- **Prevención**: delimitar variables interpoladas cuando van seguidas de `:`.
## 2026-07-13 — Edición TypeScript con saltos literales

- **Síntoma**: editor no compilaba por marcador `` `n`` literal.
- **Causa**: reemplazo PowerShell conservó escapes.
- **Resolución**: normalizar saltos y ejecutar typecheck antes de pruebas.
- **Prevención**: validar cada edición con typecheck y Vitest.

## 2026-07-13 — Control visible antes de resolver entidades

- **Síntoma**: override podía aparecer antes de validar discovery.
- **Causa**: card inicializaba entidades directamente desde YAML.
- **Resolución**: resolución síncrona por dominio/dispositivo al configurar y resolución asíncrona posterior.
- **Prevención**: nunca llamar servicios desde entidades no resueltas.
## 2026-07-13 — Personalización 0.4.0 poco visible y sin traducir

- **Síntoma**: secciones del editor quedaban en inglés; XXL, layouts y radio parecían no actuar; listas CSV no explicaban valores.
- **Causa**: textos hardcoded, ausencia de CSS XXL, Hero con un solo hijo de grid y controles de texto técnico.
- **Resolución**: catálogo visual en diez idiomas, Hero con arte/copia separados, reglas responsive y controles visuales accesibles.
- **Prevención**: pruebas interactivas del editor, contratos CSS y matriz de 14 capturas antes de release.
## 2026-07-13 — `spawn EINVAL` en capturas Windows

- **Síntoma**: `docs:capture` no iniciaba Vite al ejecutar `corepack.cmd` directamente.
- **Causa**: Node 24 rechazó el wrapper CMD sin intérprete.
- **Resolución**: iniciar comando fijo mediante `ComSpec` y cerrar el árbol de procesos al terminar.
- **Prevención**: probar el script de capturas completo antes de publicar.

## 2026-07-14 — SVG con idioma y lecturas ficticias

- **Síntoma**: las pantallas internas permanecían en español y mostraban 3.9 kW, 17 A, 233 V o 12.46 kWh estáticos.
- **Causa**: cada SVG contenía dos nodos `<text>` y `aria-label` en español.
- **Resolución**: SVG decorativos sin texto; LCD HTML localizada con valores reales y fallback traducido.
- **Prevención**: prueba sobre los 11 SVG prohíbe texto, etiquetas de idioma y lecturas de muestra.

## 2026-07-14 — Defaults y ultracompacto incoherentes

- **Síntoma**: ultra seguía mostrando el cargador y el flujo energético aparecía sin solicitarlo.
- **Causa**: render dependía solo de `show_charger`; `show_energy_flow` normalizaba a `true`.
- **Resolución**: ultra fuerza arte oculto sin borrar YAML; flujo pasa a opt-in.
- **Prevención**: contratos de normalización, DOM y editor cubren ambos comportamientos.

## 2026-07-14 — Datos ausentes formateados como cero

- **Síntoma**: valores `null` podían mostrarse como 0 kWh, 00:00, 0 A o 0 V.
- **Causa**: `Number(null)` produce cero.
- **Resolución**: guardas explícitas para nulo/vacío; LCD usa fallback.
- **Prevención**: pruebas de formateo y LCD sin datos.

## 2026-07-14 — Rechazo de discovery no controlado

- **Síntoma**: un fallo de WebSocket del registro podía generar una promesa rechazada sin manejar.
- **Causa**: `updated()` invocaba discovery con `void` sin captura interna.
- **Resolución**: captura del fallo y reinicio de clave para permitir reintento.
- **Prevención**: discovery nunca propaga errores de transporte al ciclo Lit.

## 2026-07-14 — `apply_patch` bloqueado por ACL

- **Síntoma**: helper falló incluso en la raíz visual permitida con `apply deny-read ACLs`.
- **Causa**: ACL del sandbox Windows, no contenido del repositorio.
- **Resolución**: reemplazos exactos con aborto por contexto y escritura UTF-8 sin BOM; typecheck tras cada bloque.
- **Prevención**: mantener ediciones acotadas y validar diff/suite inmediatamente.

## 2026-07-14 — Smoke rechazó el checksum de release

- **Síntoma**: build y pruebas pasaban, pero smoke fallaba al encontrar dos artefactos en `dist`.
- **Causa**: el contrato anterior exigía únicamente el bundle JavaScript.
- **Resolución**: smoke exige JS + SHA-256 y vuelve a calcular el hash antes de aprobar.
- **Prevención**: validar el conjunto exacto de assets de release, no sólo su cantidad.

## 2026-07-14 — Actions ejecutadas con runtime Node 20 obsoleto

- **Síntoma**: CI era verde, pero GitHub advertía que forzaba tres Actions v4 a Node 24.
- **Causa**: `checkout`, `setup-node` y `pnpm/action-setup` usaban majors con runtime Node 20.
- **Resolución**: actualización a `checkout@v7`, `setup-node@v6` y `pnpm/action-setup@v6`.
- **Prevención**: revisar avisos del runner y majors oficiales en cada release.

## 2026-07-15 — Capturas con fondo sobrante

- **Síntoma**: las 33 capturas conservaban lienzos fijos de 1200, 1300 o 1400 px, dejando grandes áreas negras o blancas tras la tarjeta.
- **Causa**: el modo de captura forzaba una altura mínima de viewport y el generador guardaba el PNG completo; en tema claro, Chrome podía pintar el área exterior con un segundo fondo oscuro.
- **Resolución**: eliminar la altura mínima sólo en captura, medir contenido por diferencia RGB contra el fondo de cada fila, ignorar píxeles aislados, conservar sombras y recortar con 16 px finales.
- **Prevención**: manifiesto reproducible para 33 PNG y pruebas sintéticas de fondos claros/oscuros, sombras, artefactos aislados y margen máximo.
## 2026-07-15 — Test documental fijado a dos GIF

- **Síntoma**: la suite rechazó el generador correcto porque esperaba literalmente dos GIF.
- **Causa**: el contrato de la demo no se actualizó al añadir las dos secuencias localizadas.
- **Resolución**: actualizar la expectativa al total exacto de cuatro GIF; el validador comprueba además sus nombres, ancho y peso.
- **Prevención**: mantener cantidad y nombres en una única revisión cuando cambie la matriz multimedia.

## 2026-07-15 — Markdown enriquecido copiado con enlaces rotos

- **Síntoma**: el borrador español contenía enlaces anidados, URL convertidas dos veces y afirmaciones ambiguas sobre SVG, datos y descubrimiento.
- **Causa**: un editor enriquecido transformó Markdown ya enlazado al copiarlo.
- **Resolución**: integrar las ideas sobre la estructura existente, reconstruir los enlaces y mantener paridad bilingüe con afirmaciones verificables.
- **Prevención**: no pegar Markdown transformado directamente; ejecutar <code>docs:check</code>, revisar el diff renderizado y comprobar enlaces y textos alternativos.
## 2026-07-15 — Voz personal diluida al pulir el README

- **Síntoma**: el README correcto en términos técnicos sonaba demasiado genérico y no reflejaba suficientemente la historia personal de Marc.
- **Causa**: la revisión priorizó formulación editorial y SEO sobre el texto fuente y el tono en primera persona.
- **Resolución**: tomar el texto personal de Marc como base, corregir únicamente claridad, idioma y enlaces rotos, y traducir esa voz al inglés.
- **Prevención**: en textos de autor, conservar la primera persona y validar el tono con el propietario antes de publicar.

## 2026-07-19 - Descubrimiento global y cache de metadata

- **Sintoma**: una card podia considerar entidades de otro cargador tras cambios de registro con el mismo numero de entidades.
- **Causa**: cache mutable por semilla y fallback de escaneo global.
- **Resolucion**: resolver puro limitado al device_id V2C, con estado vivo desde hass.states y ambiguedad explicita.
- **Prevencion**: no usar cantidad de registros como clave de invalidacion ni lanzar callWS desde la card.

## 2026-07-19 - Override externo inexistente aceptado

- **Sintoma**: una entidad externa configurada pero ausente podia aceptarse como lectura de potencia.
- **Causa**: validacion trataba ausencia de estado como disponibilidad transitoria.
- **Resolucion**: entidad ausente se rechaza; solo unknown y unavailable se toleran cuando entidad existe.
- **Prevencion**: cubrir entidad ausente y rangos invalidos en pruebas de seguridad.

## 2026-08-14 - LCD de no disponible mostraba sin vehiculo

- **Fallo**: el estado principal usaba `states.unavailable`, pero el LCD recibia la clave visual `disconnected`.
- **Causa**: el resolver reutiliza de forma segura el SVG desconectado para la fase no disponible y el LCD no consultaba la marca `unavailable`.
- **Resolucion**: separar el estado de copia del LCD del SVG; el arte sigue siendo local y el LCD usa `states.unavailable` y `details.unavailable`.
- **Prevencion**: matriz DOM de 10 idiomas por 12 condiciones, incluida indisponibilidad completa.

## 2026-08-14 - Voltaje externo valido rechazado

- **Fallo**: `sensor.v2c_trydan_voltage` no podia configurarse porque solo se permitian medidas externas de potencia.
- **Causa**: la validacion externa era una funcion especifica de W/kW/MW.
- **Resolucion**: validar medidas externas por tipo; voltaje admite solo sensor numerico/unknown/unavailable con unidad V y device_class voltage compatibles.
- **Prevencion**: fixture HA 2026.7 prueba valores validos, no numericos, unidad incorrecta y device_class incorrecta.

## 2026-09-02 - Override de pausa podia apuntar al bloqueo

- **Fallo**: dos controles con el mismo dominio, dispositivo y plataforma podían intercambiarse mediante YAML manual.
- **Causa**: la validación comprobaba dispositivo, plataforma y dominio, pero no la función exacta declarada por `translation_key` o sufijo legacy.
- **Resolución**: los roles de escritura exigen coincidencia funcional exacta, rechazan overrides duplicados y se vuelven a validar al pulsar; sin registro se falla cerrado.
- **Prevención**: pruebas de roles cruzados, IDs renombrados, sufijos solapados, metadatos engañosos y mutación del rol o dispositivo semilla antes del clic.

## 2026-09-02 - Color CSS sin normalizar en el editor

- **Fallo**: un `accent_color` malicioso podía llegar al atributo `style` de la muestra del editor antes de normalizar la configuración de la tarjeta.
- **Causa**: el editor clonaba el YAML recibido y construía `--swatch` con el valor original.
- **Resolución**: normalizador compartido que solo admite `#RRGGBB`; los valores no válidos se eliminan y la paleta vuelve a monocromo.
- **Prevención**: prueba DOM con `url(...)` que comprueba tanto el HTML renderizado como la configuración emitida.

## 2026-09-02 - CI regeneraba dist sin comparar procedencia

- **Fallo**: un bundle versionado obsoleto podía quedar oculto porque `pnpm check` lo sobrescribía durante CI.
- **Causa**: no se comparaba el artefacto recién construido con el `dist` confirmado.
- **Resolución**: CI compara JavaScript y SHA después del build; el flujo de beta repite la comparación desde el commit exacto del tag y publica procedencia.
- **Prevención**: no publicar artefactos construidos fuera del tag y verificar checksum tras descargar la release.

## 2026-09-02 - Smoke leia el bundle en varias operaciones

- **Fallo**: CodeQL detectó dos ventanas de carrera entre tamaño, contenido y hash del mismo bundle.
- **Causa**: el smoke abría el archivo por separado para cada comprobación.
- **Resolución**: una única lectura inmutable alimenta tamaño, validación y SHA-256.
- **Prevención**: toda comprobación de procedencia deriva de los mismos bytes.

## 2026-09-02 - CodeQL señalo una expresion interna de Lit

- **Fallo aparente**: CodeQL marcó una expresión regular dentro del bundle minificado generado.
- **Causa**: el código pertenece al runtime interno de Lit empaquetado y no recibe un patrón controlado por YAML, estado de Home Assistant ni entrada del editor.
- **Resolución**: conservar la dependencia oficial y documentar la traza fuente como falso positivo sin silenciar la regla global. Al regenerar el bundle, GitHub marcó la alerta como corregida antes de que pudiera aplicarse un descarte manual.
- **Prevención**: revisar de nuevo el origen al actualizar Lit y no editar manualmente el bundle generado.

## 2026-09-02 - Catalan incompleto en auto y decimales

- **Fallo**: `ca` existía parcialmente, pero el editor no resolvía bien `language: auto` y el formateador no usaba `ca-ES`.
- **Causa**: se pasaba el locale como valor principal en vez de fallback y faltaba la tabla regional catalana.
- **Resolución**: fallback correcto de Home Assistant, locale `ca-ES`, erratas corregidas y pruebas específicas.
- **Prevención**: contrato de `ca-ES`, editor automático, comas decimales y punto fijo en la LCD auténtica.

## 2026-09-02 - jsdom 30 incompatible con Node 20

- **Fallo**: aceptar el major automático habría roto el runtime mínimo declarado.
- **Causa**: jsdom 30 exige Node 22.22.2, mientras el proyecto conserva compatibilidad con Node 20.
- **Resolución**: mantener jsdom 29.1.1, fijar el mínimo real en Node 20.19.0 y probar también Node 22.22.2; Undici se actualiza por override sin adoptar el major incompatible.
- **Prevención**: revisar motores transitivos antes de fusionar majors de Dependabot.

## 2026-09-02 - pnpm 11.5.1 no arranca sobre Node 20

- **Fallo**: el primer check del PR beta falló antes de instalar al ejecutar pnpm 11.5.1 con Node 20.19.0.
- **Causa**: pnpm 11.5.1 requiere Node 22.13 o posterior y carga `node:sqlite`, inexistente en Node 20.
- **Resolución**: CI instala con pnpm 11.5.1 bajo Node 22.22.2, cambia después a Node 20.19.0 y ejecuta directamente TypeScript, Vitest, documentación, Vite, checksum y smoke.
- **Prevención**: separar la versión necesaria para ejecutar el gestor de paquetes del mínimo compatible del proyecto y no declarar combinaciones de herramientas imposibles.
