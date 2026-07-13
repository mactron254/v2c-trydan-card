# Feature Specification: V2C Trydan Charger Card

**Feature Branch**: `master`

**Created**: 2026-07-13

**Status**: Approved for planning

**Input**: User description: "Crear una card bonita, elegante y moderna para Home Assistant, inspirada en la app y diseño de V2C y en Lektrico Charger Card, usando los SVG Trydan y todas las entidades disponibles."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Entender la carga de un vistazo (Priority: P1)

Como propietario de un Trydan, quiero reconocer el estado del cargador, la potencia
actual y el flujo solar/casa/coche sin abrir otra vista.

**Why this priority**: La lectura instantánea es el valor principal de una card de dashboard.

**Independent Test**: Con estados simulados de desconectado, conectado, cargando,
completo, programado, esperando potencia y error, la card muestra imagen, texto y
métricas coherentes en cada caso.

**Acceptance Scenarios**:

1. **Given** el vehículo está cargando, **When** se muestra la card, **Then** aparecen
   estado "Cargando", potencia de carga, energía y tiempo de sesión, junto al Trydan azul.
2. **Given** el vehículo no está conectado, **When** se muestra la card, **Then** aparece
   "Sin vehículo", potencia cero y el Trydan blanco sin sugerir que existe una avería.
3. **Given** existe un error reconocido, **When** se muestra la card, **Then** aparece un
   mensaje textual de error, color de alerta y la métrica afectada sin depender solo del LED.
4. **Given** hay potencia solar, de casa o batería disponible, **When** cambia cualquiera
   de ellas, **Then** el diagrama energético actualiza valor, dirección y etiqueta.

---

### User Story 2 - Controlar una sesión con seguridad (Priority: P2)

Como usuario, quiero ajustar intensidad y pausar o reanudar la carga desde la card,
viendo siempre el valor actual y evitando acciones accidentales.

**Why this priority**: Son controles diarios y deben permanecer cerca de la información.

**Independent Test**: Con entidades de intensidad y pausa simuladas, mover o elegir una
intensidad envía el valor permitido y pausar/reanudar invoca la acción correspondiente.

**Acceptance Scenarios**:

1. **Given** la intensidad admite de 6 A a 32 A, **When** el usuario elige 18 A,
   **Then** se solicita exactamente 18 A y el control muestra estado pendiente hasta confirmación.
2. **Given** la sesión está activa, **When** el usuario pulsa "Pausar", **Then** se solicita
   la pausa una sola vez y el botón queda temporalmente ocupado.
3. **Given** una entidad está no disponible, **When** el usuario ve el control,
   **Then** el control está deshabilitado y explica "Entidad no disponible".

---

### User Story 3 - Gestionar funciones Trydan avanzadas (Priority: P3)

Como usuario avanzado, quiero gestionar bloqueo, temporizador, modulación dinámica,
modo de carga y luces sin convertir la vista principal en un panel saturado.

**Why this priority**: Amplía control, pero debe quedar subordinado a estado y carga.

**Independent Test**: Abrir ajustes revela solo funciones con entidad disponible;
cada control actualiza su servicio y estado de forma independiente.

**Acceptance Scenarios**:

1. **Given** existen controles avanzados, **When** el usuario abre "Ajustes",
   **Then** aparecen agrupados por carga, energía y cargador.
2. **Given** el usuario intenta bloquear el EVSE, **When** activa el control,
   **Then** se pide confirmación antes de solicitar el bloqueo.
3. **Given** existe selector de modo, **When** se elige una opción válida,
   **Then** se solicita esa opción y la selección se refleja al confirmarla el sistema.

---

### User Story 4 - Configurar sin depender de nombres locales (Priority: P4)

Como administrador de Home Assistant, quiero configurar una entidad del Trydan y que
la card encuentre las relacionadas, pudiendo corregir cualquier asociación desde editor.

**Why this priority**: Evita YAML largo y funciona con entidades renombradas o traducidas.

**Independent Test**: Partiendo de una entidad del dispositivo, la card asocia roles por
metadatos estables; una asociación manual siempre prevalece.

**Acceptance Scenarios**:

1. **Given** las entidades fueron renombradas, **When** comparten el mismo dispositivo,
   **Then** la card las identifica por su rol estable y no por texto visible.
2. **Given** falta una entidad opcional, **When** se carga la card,
   **Then** la zona correspondiente se oculta sin romper el resto.
3. **Given** el usuario define una asociación manual, **When** se vuelve a resolver el
   dispositivo, **Then** se conserva la asociación manual.

### Edge Cases

- La entidad principal o Home Assistant todavía no está disponible durante el arranque.
- Valores numéricos llegan como `unknown`, `unavailable`, texto no numérico o fuera de rango.
- Estados contradictorios aparecen a la vez, por ejemplo `charging=on` y `connected=off`.
- El error de medidor es `waiting_wifi` pero el control dinámico no está en uso.
- La llamada de servicio falla o el estado no confirma el cambio dentro del tiempo esperado.
- La card se renderiza en columnas de 280 px, modo oscuro, modo claro o con movimiento reducido.
- Las entidades opcionales pertenecen a dispositivos externos de red, solar o batería.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La card MUST mostrar nombre, ubicación opcional, disponibilidad y estado Trydan textual.
- **FR-002**: La card MUST representar los estados suministrados mediante el SVG Trydan correspondiente.
- **FR-003**: La card MUST aplicar una precedencia documentada cuando varios indicadores estén activos.
- **FR-004**: La card MUST mostrar potencia de carga, energía y tiempo de sesión cuando existan.
- **FR-005**: La card MUST mostrar flujos disponibles de solar, casa, red y batería con valores legibles.
- **FR-006**: El usuario MUST poder ajustar intensidad dentro del mínimo, máximo y paso publicados.
- **FR-007**: El usuario MUST poder pausar/reanudar, bloquear/desbloquear y cambiar interruptores disponibles.
- **FR-008**: El usuario MUST poder cambiar modo de carga y luces cuando sus controles existan.
- **FR-009**: La card MUST descubrir entidades del mismo dispositivo por metadatos estables y admitir reemplazos manuales.
- **FR-010**: Entidades opcionales ausentes MUST ocultar solo su función, nunca invalidar la card completa.
- **FR-011**: La card MUST ofrecer editor visual para entidad, textos, idioma, tema, densidad y visibilidad; opciones avanzadas MUST permanecer disponibles en YAML.
- **FR-012**: La configuración MUST admitir un sensor de estado externo opcional para estados no expuestos por la integración oficial.
- **FR-013**: La interfaz MUST incluir English, Italian, German, French, Dutch, Swedish, Danish, Norwegian, Romanian y Spanish; locales no soportados usan inglés.
- **FR-014**: El paquete MUST incluir instrucciones de instalación manual, HACS, configuración y resolución de problemas.
- **FR-015**: La card MUST adaptarse a tema automático, claro y oscuro sin perder contraste ni semántica.
- **FR-016**: La card MUST responder entre móvil, tablet y escritorio y ofrecer modos estándar, compacto y ultracompacto.

### Safety & Accessibility Requirements

- **SA-001**: Acciones MUST mostrar estado pendiente y bloquear solicitudes duplicadas.
- **SA-002**: Controles no disponibles MUST quedar deshabilitados con motivo legible.
- **SA-003**: Estado MUST entenderse sin color, animación o capacidad de ver el SVG.
- **SA-004**: Flujos principales MUST funcionar con teclado, foco visible y movimiento reducido.
- **SA-005**: Bloquear EVSE MUST solicitar confirmación antes de ejecutar.

### Key Entities

- **Configuración de card**: Entidad semilla, nombre, ubicación, idioma, visibilidad y asociaciones por rol.
- **Rol de entidad**: Función estable como conectado, cargando, intensidad, potencia, pausa o bloqueo.
- **Estado visual**: Clave normalizada, prioridad, texto, tono LED y SVG asociado.
- **Flujo energético**: Fuente/destino, potencia firmada, unidad, disponibilidad y dirección.
- **Acción pendiente**: Rol, valor solicitado, instante y resultado confirmado o fallido.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un usuario identifica estado, potencia y energía en menos de 3 segundos en todos los escenarios P1.
- **SC-002**: Los 11 estados visuales aportados pueden mostrarse mediante estado inferido o externo y tienen etiqueta textual.
- **SC-003**: El 100% de acciones disponibles envía una sola solicitud válida por interacción.
- **SC-004**: La card permanece utilizable sin solapamientos entre 280 px y 800 px de ancho.
- **SC-005**: Todas las tareas principales pueden completarse solo con teclado y foco visible.
- **SC-006**: La ausencia de cualquier entidad opcional no genera errores de renderizado.
- **SC-007**: Un usuario nuevo instala y obtiene la primera card funcional siguiendo la guía en menos de 10 minutos.
- **SC-008**: Los 10 idiomas muestran estado, acciones, flujos y editor sin claves sin traducir.
- **SC-009**: Tema y densidad cambian desde GUI sin recargar ni duplicar componentes.

## Assumptions

- El usuario ya tiene instalada y configurada la integración oficial V2C.
- Una entidad V2C del dispositivo se usa como semilla; las entidades externas de red,
  solar o batería se asocian manualmente si no pertenecen al mismo dispositivo.
- Los estados que la integración oficial no expone se infieren cuando es seguro; un
  sensor externo opcional permite representar actualización, Control Pilot y otros estados.
- Primera versión prioriza Trydan monofásico/trifásico actual y no controla calendarios internos.
- Distribución se prepara para HACS, pero publicar repositorio o release queda fuera de este alcance.
