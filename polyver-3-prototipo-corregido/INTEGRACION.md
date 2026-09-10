# Coordinación con Polyver 3.1

Esta carpeta entrega la interfaz visual de Polyver 3.2. El motor conversacional, el analizador y el cliente móvil se desarrollan en `blasetlucas/Polyver`, rama `codex/12-dioses-prototipo`, carpeta `chatbot/12-dioses`. La integración real está pendiente; la publicación de este sitio usa respuestas de ejemplo.

## Puntos de unión

Los identificadores de las 12 deidades coinciden con `characters/catalog.json` del motor: `dioniso`, `atenea`, `venus`, `hercules`, `persefone`, `apolo`, `dike`, `eleutheria`, `mercurio`, `marte`, `artemisa` y `hefesto`.

`dist/chat-model.js` reúne los perfiles de muestra y el proveedor de respuestas local. `dist/chat.js` gestiona mensajes, conversaciones, selección de persona y cambios de deidad. Una respuesta en curso se vincula a su conversación original; no se dibuja sobre otra conversación al cambiar de perfil o deidad.

## Contrato observado en server.py

- `GET /api/config`: catálogo y configuración.
- `POST /api/session`: crear sesión con `adult_confirmed`.
- `POST /api/persona`: seleccionar `persona_id` dentro de `session_id`.
- `POST /api/chat`: enviar `session_id`, `message` y, cuando corresponde, `answer`.
- `POST /api/oracle`: recomendación desde `session_id` y `message`.
- Perséfone utiliza rutas separadas `/api/persephone/setup`, `/unlock`, `/lock`, `/chat` y `/profile`. Las operaciones privadas requieren los mecanismos de desbloqueo definidos por el motor.

Verificar el contrato final en la documentación del motor antes de conectar un cliente; esta lista es una referencia de coordinación, no una integración activa.

## Límites de esta entrega

No se conecta el sitio hospedado al servidor local de LM Studio. No se publican sesiones, claves, PIN, tokens ni datos íntimos. La foto de Perséfone en el selector visual no implementa un bloqueo de seguridad: su espacio privado real pertenece al cliente y al motor de Polyver 3.1. El sitio indica que se trata de una demostración y no extrae datos del usuario.

La futura integración debe conservar la separación del perfil general y el ámbito privado, el bloqueo al salir y la invalidación de respuestas atrasadas descritos por el motor. No se debe simular biometría ni solicitar el código de bloqueo del teléfono dentro de un formulario web.

## Backend de cuentas · Polyver 3.3

La tarea Polyver 3.3 desarrolla el backend de cuentas, sesiones, perfil visible y elección de Cupido en TypeScript/Fastify/PostgreSQL, dentro de `Polyver/backend`. Para la siguiente integración, el backend relacionará la cuenta autenticada con la sesión del motor; el motor de Polyver 3.1 conservará inicialmente la escritura de la entrevista, el perfil extraído y el espacio privado de Perséfone.

La interfaz necesitará identidad de usuario, nombre/foto, deidad seleccionada y conversaciones de esa cuenta. La preferencia visual `polyver-appearance` es local al navegador. No se ha conectado la demo visual al backend. El contrato final se coordina con Polyver 3.3 antes de sustituir los perfiles y respuestas de muestra.

Contrato de Polyver 3.1 guardado: https://github.com/blasetlucas/Polyver/blob/codex/12-dioses-prototipo/chatbot/12-dioses/docs/API.md
