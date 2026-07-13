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
