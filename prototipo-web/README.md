# Prototipo web de Polyver

Código del [prototipo interactivo de Polyver](https://polyver-2-prototipo-corregido.lucasblaset.chatgpt.site/), correspondiente a la **versión 4** de Sites.

Commit de origen: `9fefe3105d5e3bbb28817058e0b2a44a5a0c9116`.

La copia se recuperó del proyecto local y se verificó contra el commit de origen registrado en Sites. Los 68 archivos originales se conservan sin modificaciones.

## Documento de código

[CODIGO-PROTOTIPO.md](CODIGO-PROTOTIPO.md) reúne los archivos editables principales en un documento de texto. El proyecto completo también conserva sus imágenes, dependencias declaradas y recursos compilados.

## Desarrollo local

Requiere **Node.js 22.13.0 o superior** y **pnpm**.

Desde la raíz del repositorio:

```bash
cd prototipo-web
pnpm install
pnpm dev
```

Para generar la compilación:

```bash
pnpm build
```

## Archivos principales

- `app/page.tsx`: integra el prototipo mediante un iframe.
- `app/layout.tsx`: metadatos y estructura de la página.
- `public/prototype/index.html`: documento del prototipo.
- `public/assets/`: JavaScript y CSS ya compilados del prototipo base; no son los componentes originales anteriores a la compilación.
- `public/enhancements.js` y `public/enhancements.css`: mejoras editables de comportamiento y presentación.
- `public/official/`: recursos visuales del prototipo.

## Alcance

Las pantallas y los flujos utilizan datos simulados. Los campos de acceso de la demostración no implementan autenticación real. Esta importación guarda el código en GitHub; no modifica la publicación de Sites.

La importación se verificó comparando los archivos con el commit de origen. No se modificó ni se volvió a compilar el código durante esta importación.
