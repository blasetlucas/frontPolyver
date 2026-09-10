# Polyver 3 · Prototipo corregido

**[Abrir el tercer prototipo](https://polyver-3-prototipo-corregido.lucasblaset.chatgpt.site/)**

[Coordinación con el motor de Polyver 3.1](INTEGRACION.md)

Tercer prototipo de Polyver. El chat con la deidad es la interfaz principal: conversación sencilla, nombre y retrato circular junto a cada mensaje, y la fotografía del usuario.

## Probar el prototipo

- La conversación de muestra comienza con Luciano y Atenea, la selección inicial del prototipo anterior.
- Se puede cambiar entre Luciano, Francisca y Sofía.
- Los 12 Cupidos mantienen sus nombres e imágenes originales.
- Escribir y enviar un mensaje, iniciar otra conversación o volver a una conversación de la misma sesión.
- «Explorar Polyver» abre el recorrido anterior, con un acceso de regreso al chat.

Las respuestas son ejemplos locales preparados para mostrar la interfaz. No hay un modelo de IA conectado, autenticación propia ni almacenamiento de mensajes en un servidor. Las conversaciones de esta demostración se reinician al recargar la página.

## Código

`dist/` contiene el sitio estático completo y es código versionado, no una carpeta descartable:

- `dist/index.html`: estructura de la interfaz del chat.
- `dist/chat.css`: diseño adaptable a móvil y escritorio; recorte circular de los retratos originales.
- `dist/chat.js`: conversaciones, perfiles, elección de deidad y controles del chat.
- `dist/chat-model.js`: perfiles y respuestas de ejemplo.
- `dist/recorrido.html`: acceso al recorrido completo.
- `dist/prototype/`, `dist/assets/`, `dist/official/`: recorrido y recursos originales reutilizados.

## Ejecutar localmente

Requiere Node.js 22.13 o superior. El chat estático no necesita instalar dependencias.

```sh
node scripts/serve.mjs
```

Abrir la dirección local que muestra el servidor. Para validar los archivos:

```sh
node scripts/validate.mjs
```

## Procedencia

Copia del código guardado en [frontPolyver/prototipo-web](https://github.com/blasetlucas/frontPolyver/tree/main/prototipo-web), commit `59cec828aed67d61c3b3306ccaaac019f3b96295`, correspondiente al [segundo prototipo](https://polyver-2-prototipo-corregido.lucasblaset.chatgpt.site/).

Se conservan `app/`, `public/`, la configuración y las dependencias de la versión base como referencia. `CODIGO-PROTOTIPO.md` documenta esa base anterior. Los archivos actuales del chat se encuentran en `dist/`. El JavaScript y CSS compilados del recorrido base se reutilizan tal como fueron recuperados; no se reconstruyen los componentes originales de ese recorrido.

El tercer prototipo tiene una publicación independiente. No reemplaza el segundo prototipo ni su carpeta en GitHub.
