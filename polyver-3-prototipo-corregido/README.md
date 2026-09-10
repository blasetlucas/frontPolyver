# Polyver 3 · Prototipo corregido

**[Abrir el tercer prototipo](https://polyver-3-prototipo-corregido.lucasblaset.chatgpt.site/)**

[Coordinación con el motor de Polyver 3.1](INTEGRACION.md)

Tercer prototipo de Polyver. El chat con la deidad es la interfaz principal: conversación sencilla, nombre y retrato circular junto a cada mensaje, y la fotografía del usuario.

## Apariencia

El modo noche es la apariencia inicial, independientemente del ajuste del dispositivo. En **Inicio (Dioniso)**, a la derecha de «Hola, Luciano», el botón ☀️ activa «Modo día» y 🌙 vuelve a «Modo noche». La elección se guarda únicamente en este navegador; cambiar de perfil o de conversación no la altera.

## Probar el prototipo

- La conversación de muestra comienza con Luciano y Atenea, la selección inicial del prototipo anterior.
- Se puede cambiar entre Luciano, Francisca y Sofía.
- Los 12 Cupidos mantienen sus nombres e imágenes originales.
- Escribir y enviar un mensaje, iniciar otra conversación o volver a una conversación de la misma sesión.
- El chat está integrado en la misma aplicación: Inicio, Chat, Conexiones, Agenda, Explorar y Perfil permanecen disponibles en la barra inferior.
- El menú principal conserva los 12 módulos originales. Inicio y Perfil también permiten abrir la conversación.
- Al cambiar de módulo se conservan mensajes y borradores durante la sesión. La deidad y el perfil elegido se sincronizan con Inicio y Perfil.

Las respuestas son ejemplos locales preparados para mostrar la interfaz. No hay un modelo de IA conectado, autenticación propia ni almacenamiento de mensajes en un servidor. Las conversaciones de esta demostración se reinician al recargar la página.

## Código

`dist/` contiene el sitio estático completo y es código versionado, no una carpeta descartable:

- `dist/index.html`: entrada al prototipo completo, inicialmente en Chat.
- `dist/chat.html`: interfaz del módulo de chat, también utilizable de forma independiente.
- `dist/prototype-chat.js` y `dist/integration-contract.js`: integración del chat con el shell original; mensajes verificados por origen, ventana e identificadores.
- `dist/chat.css`: diseño adaptable a móvil y escritorio; recorte circular de los retratos originales.
- `dist/chat.js`: conversaciones, perfiles, elección de deidad y controles del chat.
- `dist/chat-model.js`: perfiles y respuestas de ejemplo.
- `dist/recorrido.html`: entrada alternativa al mismo prototipo, inicialmente en Inicio.
- `dist/prototype-integration.css` y `dist/prototype-day.css`: navegación unificada y apariencia del prototipo completo.
- `dist/prototype/`, `dist/assets/`, `dist/official/`: recorrido y recursos originales reutilizados.

## Ejecutar localmente

Requiere Node.js 22.13 o superior. El chat estático no necesita instalar dependencias.

```sh
node scripts/serve.mjs
```

Abrir la dirección local que muestra el servidor. Para validar los archivos:

```sh
node scripts/validate.mjs
node --test scripts/integration.test.mjs
```

## Procedencia

Copia del código guardado en [frontPolyver/prototipo-web](https://github.com/blasetlucas/frontPolyver/tree/main/prototipo-web), commit `59cec828aed67d61c3b3306ccaaac019f3b96295`, correspondiente al [segundo prototipo](https://polyver-2-prototipo-corregido.lucasblaset.chatgpt.site/).

Se conservan `app/`, `public/`, la configuración y las dependencias de la versión base como referencia. `CODIGO-PROTOTIPO.md` documenta esa base anterior. Los archivos actuales del chat se encuentran en `dist/`. Los bundles originales se conservan como referencia. `dist/assets/page-polyver3-appearance.js` y `index-polyver3-appearance.js` son las copias adaptadas que integran el chat en la navegación original; el componente nuevo se mantiene legible en `prototype-chat.js`.

El tercer prototipo tiene una publicación independiente. No reemplaza el segundo prototipo ni su carpeta en GitHub.

## Tríadas kawaii del ingreso

Las ilustraciones se renderizan a partir del paso activo, evitando conservar por error la imagen de la pantalla anterior. Marte, Venus y Mercurio aparecen solamente en verificación; Perséfone, Hércules y Apolo, solamente en privacidad; Hefesto, Atenea y Artemisa, solamente en identidad. La única tríada que se repite es Dioniso, Díke y Eleutheria, que acompaña teléfono, ubicación, fotos y Oráculo. Los tres personajes se muestran juntos.

El Oráculo vuelve a ofrecer las cuatro tríadas mediante cuatro circulitos seleccionables. Cada tríada mira una tablet con un racimo de uvas; conserva la escena original de Dioniso, Díke y Eleutheria y añade poses equivalentes para las otras tres. Ubicación y fotos utilizan nuevas poses de estos mismos tres personajes, con un mapa y una selfie, respectivamente. `dist/tablet-scenes.js` centraliza esta presentación y `dist/home-appearance.js` contiene el botón de apariencia junto al saludo de Inicio (Dioniso).

Las escenas kawaii usan el ancho completo de su tarjeta, sin heredar el círculo de los avatares. Los tres nombres permanecen en una sola fila y ajustan su tamaño al ancho de la tarjeta.

La bienvenida reúne a los 12 Cupidos kawaii asomándose desde los cuatro bordes del celular, con caras y manos alrededor del contenido central. Después, cada tríada secundaria tiene un único paso propio; sólo Dioniso, Díke y Eleutheria se repiten en los pasos de acompañamiento.

[Ilustraciones y prompts de creación](IMAGENES.md).

En la App Store simulada, la tarjeta de Marte recorta el interior de la pantalla original: su cara queda más arriba y no aparece la mesa que rodeaba al iPhone.

## Apariencia en Inicio (Dioniso)

A la derecha de «Hola, Luciano» (o el perfil seleccionado) hay un botón pequeño: ☀️ activa el modo día y 🌙 vuelve al modo noche. El control siempre refleja la acción siguiente, también al regresar a Inicio. La elección sigue guardada en el dispositivo y sincronizada entre el prototipo y el chat. Reemplaza el antiguo desplegable que quedaba más abajo en Inicio.

El estado base es siempre noche: sin una elección manual del usuario, nunca se activa el modo día, tampoco por el tema del sistema. Las preferencias de versiones anteriores del prototipo se ignoran. Solo el botón ☀️/🌙 guarda la nueva preferencia manual.
