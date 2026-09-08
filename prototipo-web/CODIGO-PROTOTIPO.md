# Polyver 2.0 · Documento de código del prototipo

Origen: https://polyver-2-prototipo-corregido.lucasblaset.chatgpt.site/

Versión 4 de Sites; commit de origen: `9fefe3105d5e3bbb28817058e0b2a44a5a0c9116`. Recuperado y documentado el 8 de septiembre de 2026.

Este documento reproduce los archivos editables principales de la copia recuperada. La interfaz base también utiliza JavaScript y CSS ya compilados en `public/assets/`; esos archivos se conservan completos en el repositorio, pero no se presentan aquí como componentes originales sin compilar. Las imágenes están en `public/`. El documento no sustituye a la carpeta completa para ejecutar el proyecto.

## Archivos incluidos

- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `public/prototype/index.html`
- `public/enhancements.js`
- `public/enhancements.css`
- `package.json`
- `vite.config.ts`
- `next.config.ts`
- `tsconfig.json`
- `eslint.config.mjs`
- `pnpm-workspace.yaml`

## app/page.tsx

````tsx
export default function Home() {
  return (
    <main className="site-shell">
      <iframe
        className="prototype-frame"
        src="/prototype/index.html"
        title="Prototipo interactivo de Polyver"
        allow="geolocation; clipboard-read; clipboard-write"
      />
    </main>
  );
}
````

## app/layout.tsx

````tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Polyver · I-Citas',
  description:
    'La infraestructura urbana de encuentros que convierte compatibilidad, agenda y ciudad en citas presenciales reales.',
  applicationName: 'Polyver',
  icons: {
    icon: '/polyver-logo.jpeg',
    apple: '/polyver-logo.jpeg',
  },
  openGraph: {
    title: 'Polyver · La cita es el producto',
    description: 'Menos chat. Más vida real.',
    siteName: 'Polyver',
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: '/og-polyver.png',
        width: 1728,
        height: 896,
        alt: 'Polyver · La cita es el producto',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Polyver · I-Citas',
    description: 'La forma inteligente de conocer el amor.',
    images: ['/og-polyver.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
  colorScheme: 'dark light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
````

## app/globals.css

````css
@import 'tailwindcss';

:root {
  color-scheme: light;
  background: #ffffff;
}

* {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  min-width: 320px;
  height: 100%;
  margin: 0;
  overflow: hidden;
  background: #ffffff;
}

.site-shell {
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background: #ffffff;
}

.prototype-frame {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  background: #ffffff;
}
````

## public/prototype/index.html

````html
<!DOCTYPE html><html lang="es"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="preload" as="image" href="/polyver-logo.jpeg"/><link rel="stylesheet" href="/assets/index-DgVfIqgM.css" data-rsc-css-href="/assets/index-DgVfIqgM.css" data-precedence="vite-rsc/importer-resources"/><link rel="modulepreload" href="/assets/layout-segment-context-Na2chX6T.js" crossorigin=""/><link rel="modulepreload" href="/assets/rolldown-runtime-S-ySWqyJ.js" crossorigin=""/><link rel="modulepreload" href="/assets/index-Bvdw6A10.js" crossorigin=""/><link rel="modulepreload" href="/assets/framework-DjPHiq1u.js" crossorigin=""/><link rel="modulepreload" href="/assets/page-DcBYk7Ef.js" crossorigin=""/><title>Polyver · I-Citas</title><meta name="description" content="La infraestructura urbana de encuentros que convierte compatibilidad, agenda y ciudad en citas presenciales reales."/><meta name="application-name" content="Polyver"/><meta name="keywords" content="Polyver,I-Citas,compatibilidad,experiencias,Santiago"/><meta property="og:title" content="Polyver · La cita es el producto"/><meta property="og:description" content="Menos chat. Más vida real."/><meta property="og:site_name" content="Polyver"/><meta property="og:type" content="website"/><meta property="og:locale" content="es_CL"/><meta property="og:image" content="/og-polyver.png"/><meta property="og:image:width" content="1728"/><meta property="og:image:height" content="896"/><meta property="og:image:alt" content="Polyver · La cita es el producto"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="Polyver · I-Citas"/><meta name="twitter:description" content="La forma inteligente de conocer el amor."/><meta name="twitter:image" content="/og-polyver.png"/><link rel="shortcut icon" href="/polyver-logo.jpeg"/><link rel="icon" href="/polyver-logo.jpeg"/><link rel="apple-touch-icon" href="/polyver-logo.jpeg"/><meta name="theme-color" content="#ffffff"/><meta name="color-scheme" content="dark light"/><script>self.__VINEXT_RSC_PARAMS__={}</script><script>self.__VINEXT_RSC_NAV__={"pathname":"/","searchParams":[]}</script><link rel="modulepreload" href="/assets/index-Bvdw6A10.js" />
<link rel="stylesheet" href="/enhancements.css"/></head><body><main class="prototype"><aside class="story-panel"><div><div class="brand"><img src="/polyver-logo.jpeg" alt="Logo oficial de Polyver"/><div><b>POLYVER</b><span>I-CITAS · SANTIAGO</span></div></div><p class="eyebrow">PRESENTACIÓN PARA INVERSIÓN</p><h1>El match es el medio.<br/><em>La cita es el producto.</em></h1><p>Compatibilidad, agenda y partners convertidos en una I-Cita verificable.</p></div><div class="story-steps"><button><span>01</span><b>Onboarding</b><small>Identidad y contexto</small></button><button><span>02</span><b>Oráculo</b><small>12 Cupidos</small></button><button><span>03</span><b>Loov</b><small>Afinidad explicable</small></button><button><span>04</span><b>Loover</b><small>Persona + lugar + hora</small></button><button><span>05</span><b>Partner</b><small>QR y atribución</small></button></div><div class="story-actions"><button>Abrir portal Partner</button><button>Reiniciar demo</button></div><small class="screen-count">31 escenas · emulación iPhone 13 · datos simulados</small></aside><section class="device-stage"><div class="phone" aria-label="Emulación interactiva de un iPhone 13"><div class="speaker" aria-hidden="true"></div><div class="ios-status" aria-hidden="true"><span>9:41</span><span class="ios-icons">▮▮▮ ᯤ ▰</span></div><div class="phone-content"><div class="intro campaign-screen"><div class="brand compact"><img src="/polyver-logo.jpeg" alt="Logo oficial de Polyver"/><div><b>POLYVER</b></div></div><div class="campaign-visual"><div class="campaign-rings"></div><img src="/polyver-logo.jpeg" alt="Símbolo oficial de Polyver"/><span class="campaign-badge">I-DATING · ENCUENTROS REALES</span></div><div class="campaign-copy"><p class="eyebrow">POLYVER · SANTIAGO</p><h1>Conecta sin límites.<br/><em>Vive la cita.</em></h1><p>Compatibilidad, agenda y experiencias seleccionadas para que el vínculo pase a la vida real.</p><div class="campaign-proof"><div><b>12</b><small>Cupidos</small></div><div><b>1</b><small>Loov explicable</small></div><div><b>100%</b><small>En vivo</small></div></div><button class="primary ">Ver en App Store</button></div></div></div></div><div class="scene-nav"><button aria-label="Pantalla anterior">‹</button><span>campaign</span><button aria-label="Pantalla siguiente">›</button></div></section></main><script id="_R_">import("/assets/index-Bvdw6A10.js")</script><script>(function(){function c(){var b=a.contentDocument||(a.contentWindow&&a.contentWindow.document);if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'a304316d4a771821',t:'MTc4NzU5Mzc2MA=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script><script src="/enhancements.js" defer></script></body></html><script>self.__VINEXT_RSC_CHUNKS__=self.__VINEXT_RSC_CHUNKS__||[];self.__VINEXT_RSC_CHUNKS__.push("2:I[\"8c0f216c4604\",[],\"Children\",1]\n3:I[\"15c18cfaeeff\",[],\"LayoutSegmentProvider\",1]\n4:I[\"8c0f216c4604\",[],\"Slot\",1]\n5:I[\"593f344dc510\",[],\"RedirectBoundary\",1]\n:HL[\"/assets/index-DgVfIqgM.css\",\"style\"]\n")</script><script>self.__VINEXT_RSC_CHUNKS__=self.__VINEXT_RSC_CHUNKS__||[];self.__VINEXT_RSC_CHUNKS__.push("0:{\"__route\":\"route:/\",\"__interceptionContext\":null,\"__layoutIds\":[\"layout:/\"],\"__rootLayout\":\"/\",\"page:/\":\"$L1\",\"layout:/\":[[[[\"$\",\"link\",\"css:/assets/index-DgVfIqgM.css\",{\"rel\":\"stylesheet\",\"precedence\":\"vite-rsc/importer-resources\",\"href\":\"/assets/index-DgVfIqgM.css\",\"data-rsc-css-href\":\"/assets/index-DgVfIqgM.css\"}],\"$undefined\"],[\"$\",\"html\",null,{\"lang\":\"es\",\"children\":[\"$\",\"body\",null,{\"children\":[\"$\",\"$L2\",null,{}]}]}]],null],\"route:/\":[[[\"$\",\"meta\",null,{\"charSet\":\"utf-8\"}],[[\"$\",\"title\",\"0\",{\"children\":\"Polyver · I-Citas\"}],[\"$\",\"meta\",\"1\",{\"name\":\"description\",\"content\":\"La infraestructura urbana de encuentros que convierte compatibilidad, agenda y ciudad en citas presenciales reales.\"}],[\"$\",\"meta\",\"2\",{\"name\":\"application-name\",\"content\":\"Polyver\"}],[\"$\",\"meta\",\"3\",{\"name\":\"keywords\",\"content\":\"Polyver,I-Citas,compatibilidad,experiencias,Santiago\"}],[\"$\",\"meta\",\"4\",{\"property\":\"og:title\",\"content\":\"Polyver · La cita es el producto\"}],[\"$\",\"meta\",\"5\",{\"property\":\"og:description\",\"content\":\"Menos chat. Más vida real.\"}],[\"$\",\"meta\",\"6\",{\"property\":\"og:site_name\",\"content\":\"Polyver\"}],[\"$\",\"meta\",\"7\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"$\",\"meta\",\"8\",{\"property\":\"og:locale\",\"content\":\"es_CL\"}],[\"$\",\"meta\",\"9\",{\"property\":\"og:image\",\"content\":\"/og-polyver.png\"}],[\"$\",\"meta\",\"10\",{\"property\":\"og:image:width\",\"content\":\"1728\"}],[\"$\",\"meta\",\"11\",{\"property\":\"og:image:height\",\"content\":\"896\"}],[\"$\",\"meta\",\"12\",{\"property\":\"og:image:alt\",\"content\":\"Polyver · La cita es el producto\"}],[\"$\",\"meta\",\"13\",{\"name\":\"twitter:card\",\"content\":\"summary_large_image\"}],[\"$\",\"meta\",\"14\",{\"name\":\"twitter:title\",\"content\":\"Polyver · I-Citas\"}],[\"$\",\"meta\",\"15\",{\"name\":\"twitter:description\",\"content\":\"La forma inteligente de conocer el amor.\"}],[\"$\",\"meta\",\"16\",{\"name\":\"twitter:image\",\"content\":\"/og-polyver.png\"}],[\"$\",\"link\",\"17\",{\"rel\":\"shortcut icon\",\"href\":\"/polyver-logo.jpeg\"}],[\"$\",\"link\",\"18\",{\"rel\":\"icon\",\"href\":\"/polyver-logo.jpeg\"}],[\"$\",\"link\",\"19\",{\"rel\":\"apple-touch-icon\",\"href\":\"/polyver-logo.jpeg\"}]],[[\"$\",\"meta\",\"0\",{\"name\":\"viewport\",\"content\":\"width=device-width, initial-scale=1\"}],[\"$\",\"meta\",\"1\",{\"name\":\"theme-color\",\"content\":\"#ffffff\"}],[\"$\",\"meta\",\"2\",{\"name\":\"color-scheme\",\"content\":\"dark light\"}]]],[\"$\",\"$L3\",null,{\"segmentMap\":{\"children\":[]},\"children\":[\"$\",\"$L4\",null,{\"id\":\"layout:/\",\"parallelSlots\":\"$undefined\",\"children\":[\"$\",\"$L5\",null,{\"children\":[\"$\",\"$L3\",null,{\"segmentMap\":{\"children\":[]},\"children\":[\"$\",\"$L4\",null,{\"id\":\"page:/\"}]}]}]}]}]],\"__layoutFlags\":{\"layout:/\":\"s\"},\"__artifactCompatibility\":{\"schemaVersion\":1,\"graphVersion\":\"app-route-graph:4uhn5s1wvoptc\",\"deploymentVersion\":\"144093d1-5e31-4289-836a-7793e14aec87\",\"appElementsSchemaVersion\":1,\"rscPayloadSchemaVersion\":1,\"rootBoundaryId\":\"/\",\"renderEpoch\":null}}\n6:I[\"6efdf509a785\",[],\"default\",1]\n1:[\"$\",\"$L6\",null,{\"params\":\"$@7\",\"searchParams\":\"$@8\"}]\n7:{}\n8:{}\n")</script><script>self.__VINEXT_RSC_DONE__=true</script>
````

## public/enhancements.js

````javascript
(() => {
  const photoState = (window.__polyverProfilePhotos ??= [null, null, null, null]);

  function resetPrototype() {
    for (const key of ['polyver-demo', 'polyver-location']) {
      localStorage.removeItem(key);
    }

    for (let index = 0; index < photoState.length; index += 1) {
      if (photoState[index]?.startsWith('blob:')) {
        URL.revokeObjectURL(photoState[index]);
      }
      photoState[index] = null;
    }

    window.location.href = window.location.pathname;
  }

  function addResetWheel() {
    if (document.querySelector('.polyver-reset-wheel')) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'polyver-reset-wheel';
    button.setAttribute('aria-label', 'Volver a cero y reiniciar el prototipo');
    button.title = 'Volver a cero';

    const icon = document.createElement('span');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '↻';
    button.append(icon);
    button.addEventListener('click', resetPrototype);

    document.body.append(button);
  }

  function createPhotoEditor() {
    const editor = document.createElement('section');
    editor.className = 'profile-photo-editor';
    editor.dataset.polyverEnhancement = 'photos';
    editor.setAttribute('aria-label', 'Fotos del perfil de Luciano');

    const heading = document.createElement('div');
    heading.className = 'profile-photo-editor__heading';

    const copy = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = 'Mis fotos';
    const description = document.createElement('p');
    description.textContent =
      'Las cuatro fotos de Luciano aparecen por defecto. Toca cualquiera para reemplazarla.';
    copy.append(title, description);

    const badge = document.createElement('span');
    badge.className = 'profile-photo-editor__badge';
    badge.textContent = '4 fotos';
    heading.append(copy, badge);

    const grid = document.createElement('div');
    grid.className = 'profile-photo-grid';

    const restore = document.createElement('button');
    restore.type = 'button';
    restore.className = 'profile-photo-editor__restore';
    restore.textContent = 'Restaurar fotos de Luciano';

    function renderGrid() {
      grid.replaceChildren();

      for (let index = 0; index < 4; index += 1) {
        const slot = document.createElement('label');
        slot.className = 'profile-photo-slot';
        slot.dataset.slot = String(index);
        slot.title = `Cambiar foto ${index + 1}`;

        const visual = document.createElement('span');
        visual.className = 'profile-photo-slot__visual';
        if (photoState[index]) {
          visual.style.backgroundImage = 'none';
          const image = document.createElement('img');
          image.src = photoState[index];
          image.alt = `Foto ${index + 1} cargada para el perfil de Luciano`;
          visual.append(image);
        }

        const number = document.createElement('span');
        number.className = 'profile-photo-slot__index';
        number.textContent = String(index + 1);

        const edit = document.createElement('span');
        edit.className = 'profile-photo-slot__edit';
        edit.textContent = photoState[index] ? 'Cambiar' : 'Subir';

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.setAttribute('aria-label', `Subir la foto ${index + 1} del perfil`);
        input.addEventListener('change', () => {
          const [file] = input.files ?? [];
          if (!file) return;

          if (photoState[index]?.startsWith('blob:')) {
            URL.revokeObjectURL(photoState[index]);
          }
          photoState[index] = URL.createObjectURL(file);
          renderGrid();
        });

        slot.append(visual, number, edit, input);
        grid.append(slot);
      }
    }

    restore.addEventListener('click', () => {
      for (let index = 0; index < photoState.length; index += 1) {
        if (photoState[index]?.startsWith('blob:')) {
          URL.revokeObjectURL(photoState[index]);
        }
        photoState[index] = null;
      }
      renderGrid();
    });

    renderGrid();
    editor.append(heading, grid, restore);
    return editor;
  }

  function setBuilderPhoto(button, index) {
    if (photoState[index]) {
      button.style.backgroundImage = `linear-gradient(#0000, #00000040), url("${photoState[index]}")`;
      button.style.backgroundPosition = 'center';
      button.style.backgroundSize = 'cover';
    } else {
      button.style.removeProperty('background-image');
      button.style.removeProperty('background-position');
      button.style.removeProperty('background-size');
    }
  }

  function enhanceProfileBuilder() {
    const grid = document.querySelector('.profile-builder .photo-grid');
    if (!grid) return;

    [...grid.querySelectorAll('.photo')].slice(0, 4).forEach((button, index) => {
      if (button.dataset.polyverPhotoSlot) {
        setBuilderPhoto(button, index);
        return;
      }

      button.type = 'button';
      button.dataset.polyverPhotoSlot = String(index + 1);
      button.setAttribute(
        'aria-label',
        `${index === 0 ? 'Foto principal' : `Foto ${index + 1}`} de Luciano. Tocar para cambiar`,
      );

      const edit = document.createElement('span');
      edit.className = 'polyver-photo-change';
      edit.textContent = 'Cambiar';

      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.tabIndex = -1;
      input.setAttribute('aria-hidden', 'true');
      input.addEventListener('click', (event) => event.stopPropagation());
      input.addEventListener('change', () => {
        const [file] = input.files ?? [];
        if (!file) return;
        if (photoState[index]?.startsWith('blob:')) URL.revokeObjectURL(photoState[index]);
        photoState[index] = URL.createObjectURL(file);
        setBuilderPhoto(button, index);
      });

      button.addEventListener('click', () => input.click());
      button.append(edit, input);
      setBuilderPhoto(button, index);
    });
  }

  function enhanceProfile() {
    const profileProgress = document.querySelector('.profile-progress');
    if (!profileProgress) return;

    const content = profileProgress.closest('.content');
    if (!content || content.querySelector('[data-polyver-enhancement="photos"]')) return;

    profileProgress.insertAdjacentElement('afterend', createPhotoEditor());
  }

  const kawaiiScenes = {
    'Te enviamos un código': {
      id: 'verification',
      asset: '/official/kawaii/triad-marte-venus-mercurio.png',
      names: 'Marte · Venus · Mercurio',
      label: 'Seguridad · afecto · agilidad',
    },
    '¿Dónde quieres conectar?': {
      id: 'location',
      asset: '/official/kawaii/triad-marte-venus-mercurio.png',
      names: 'Mercurio kawaii',
      label: 'Cercanía ágil y sin fricción',
    },
    'Nos enfocamos en ti': {
      id: 'privacy',
      asset: '/official/kawaii/triad-persefone-hercules-apolo.png',
      names: 'Perséfone · Hércules · Apolo',
      label: 'Profundidad · constancia · creatividad',
    },
    'Primero, una presentación': {
      id: 'identity',
      asset: '/official/kawaii/triad-hefesto-atenea-artemisa.png',
      names: 'Atenea · Artemisa · Hefesto',
      label: 'Cooperación · estrategia · selectividad',
    },
    'Muestra quién eres': {
      id: 'photos',
      asset: '/official/kawaii/triad-marte-venus-mercurio.png',
      names: 'Venus kawaii',
      label: 'Presentación auténtica y afectividad',
    },
  };

  function enhancePreselectionKawaii() {
    document.querySelectorAll('.form-screen .kawaii-guide').forEach((guide) => {
      if (guide.dataset.polyverKawaiiScene) return;

      const screen = guide.closest('.form-screen');
      const heading = screen?.querySelector('h2')?.textContent?.trim();
      const scene = kawaiiScenes[heading];
      if (!scene) return;

      guide.dataset.polyverKawaiiScene = scene.id;
      guide.classList.add('polyver-kawaii-scene');
      guide.setAttribute('aria-label', `Cupidos kawaii: ${scene.names}. ${scene.label}.`);

      const image = document.createElement('img');
      image.className = 'polyver-kawaii-scene__image';
      image.src = scene.asset;
      image.alt = `Versiones kawaii de ${scene.names}`;

      const copy = guide.querySelector('span:not(.kawaii-avatar)');
      const small = copy?.querySelector('small');
      if (small) small.textContent = scene.names;

      const label = document.createElement('em');
      label.className = 'polyver-kawaii-scene__label';
      label.textContent = scene.label;
      copy?.append(label);

      guide.prepend(image);
    });
  }

  function changeCupid(direction) {
    const select = document.querySelector('#cupid-selector');
    if (!select || select.options.length < 2) return;

    const current = Math.max(0, select.selectedIndex);
    const next = (current + direction + select.options.length) % select.options.length;
    const valueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLSelectElement.prototype,
      'value',
    )?.set;
    valueSetter?.call(select, select.options[next].value);
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function addCupidCarousel() {
    const screen = document.querySelector('.reveal-screen');
    const select = screen?.querySelector('#cupid-selector');
    if (!screen || !select || screen.querySelector('.polyver-cupid-carousel')) return;

    const controls = document.createElement('div');
    controls.className = 'polyver-cupid-carousel';
    controls.setAttribute('aria-label', 'Ver otros dioses modernos');

    const previous = document.createElement('button');
    previous.type = 'button';
    previous.className = 'polyver-cupid-carousel__arrow';
    previous.setAttribute('aria-label', 'Ver el dios moderno anterior');
    previous.textContent = '‹';

    const counter = document.createElement('span');
    counter.className = 'polyver-cupid-carousel__counter';
    counter.textContent = `${select.selectedIndex + 1} / ${select.options.length}`;

    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'polyver-cupid-carousel__arrow';
    next.setAttribute('aria-label', 'Ver el siguiente dios moderno');
    next.textContent = '›';

    previous.addEventListener('click', () => changeCupid(-1));
    next.addEventListener('click', () => changeCupid(1));
    screen.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') changeCupid(-1);
      if (event.key === 'ArrowRight') changeCupid(1);
    });

    controls.append(previous, counter, next);
    screen.append(controls);
  }

  let activeScrollTarget = null;
  let activeScrollListener = null;

  function findScrollTarget(phone) {
    const preferred = [
      phone.querySelector('.app-scroll'),
      phone.querySelector('.intro'),
      phone.querySelector('.chat-view'),
      phone.querySelector('.partner-portal'),
    ].filter(Boolean);
    const candidates = preferred.length ? preferred : [...phone.querySelectorAll('*')];

    return (
      candidates
        .filter((element) => element.scrollHeight > element.clientHeight + 6)
        .sort(
          (left, right) =>
            right.scrollHeight - right.clientHeight - (left.scrollHeight - left.clientHeight),
        )[0] ?? null
    );
  }

  function updateScrollRail() {
    const phone = document.querySelector('.phone');
    const rail = phone?.querySelector('.polyver-scroll-rail');
    if (!phone || !rail) return;

    const nextTarget = findScrollTarget(phone);
    if (nextTarget !== activeScrollTarget) {
      if (activeScrollTarget && activeScrollListener) {
        activeScrollTarget.removeEventListener('scroll', activeScrollListener);
      }
      activeScrollTarget = nextTarget;
      activeScrollListener = updateScrollRail;
      activeScrollTarget?.addEventListener('scroll', activeScrollListener, { passive: true });
    }

    const up = rail.querySelector('[data-direction="up"]');
    const down = rail.querySelector('[data-direction="down"]');
    const thumb = rail.querySelector('.polyver-scroll-rail__thumb');
    const track = rail.querySelector('.polyver-scroll-rail__track');
    const hasOverflow = Boolean(activeScrollTarget);
    rail.classList.toggle('is-idle', !hasOverflow);
    up.disabled = !hasOverflow || activeScrollTarget.scrollTop <= 1;
    down.disabled =
      !hasOverflow ||
      activeScrollTarget.scrollTop + activeScrollTarget.clientHeight >=
        activeScrollTarget.scrollHeight - 1;

    if (!hasOverflow || !track.clientHeight) {
      thumb.style.height = '100%';
      thumb.style.transform = 'translateY(0)';
      return;
    }

    const ratio = activeScrollTarget.clientHeight / activeScrollTarget.scrollHeight;
    const thumbHeight = Math.max(18, Math.round(track.clientHeight * ratio));
    const maxThumbTravel = Math.max(0, track.clientHeight - thumbHeight);
    const maxScroll = activeScrollTarget.scrollHeight - activeScrollTarget.clientHeight;
    const thumbTop = maxScroll ? (activeScrollTarget.scrollTop / maxScroll) * maxThumbTravel : 0;
    thumb.style.height = `${thumbHeight}px`;
    thumb.style.transform = `translateY(${thumbTop}px)`;
  }

  function scrollActiveView(direction) {
    const phone = document.querySelector('.phone');
    if (!phone) return;
    const target = findScrollTarget(phone);
    if (!target) return;

    target.scrollBy({
      top: direction * Math.max(150, target.clientHeight * 0.68),
      behavior: 'smooth',
    });
  }

  function addScrollRail() {
    const phone = document.querySelector('.phone');
    if (!phone) return;

    let rail = phone.querySelector('.polyver-scroll-rail');
    if (!rail) {
      rail = document.createElement('div');
      rail.className = 'polyver-scroll-rail is-idle';
      rail.setAttribute('aria-label', 'Controles para subir y bajar en la pantalla');

      const up = document.createElement('button');
      up.type = 'button';
      up.dataset.direction = 'up';
      up.setAttribute('aria-label', 'Subir en esta pantalla');
      up.textContent = '⌃';

      const track = document.createElement('button');
      track.type = 'button';
      track.className = 'polyver-scroll-rail__track';
      track.setAttribute('aria-label', 'Ir a otra parte de esta pantalla');
      const thumb = document.createElement('span');
      thumb.className = 'polyver-scroll-rail__thumb';
      track.append(thumb);

      const down = document.createElement('button');
      down.type = 'button';
      down.dataset.direction = 'down';
      down.setAttribute('aria-label', 'Bajar en esta pantalla');
      down.textContent = '⌄';

      up.addEventListener('click', () => scrollActiveView(-1));
      down.addEventListener('click', () => scrollActiveView(1));
      track.addEventListener('click', (event) => {
        const target = findScrollTarget(phone);
        if (!target) return;
        const bounds = track.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
        target.scrollTo({
          top: ratio * (target.scrollHeight - target.clientHeight),
          behavior: 'smooth',
        });
      });

      rail.append(up, track, down);
      phone.append(rail);
    }

    window.requestAnimationFrame(updateScrollRail);
  }

  addResetWheel();
  enhanceProfile();
  enhanceProfileBuilder();
  enhancePreselectionKawaii();
  addCupidCarousel();
  addScrollRail();

  const observer = new MutationObserver(() => {
    addResetWheel();
    enhanceProfile();
    enhanceProfileBuilder();
    enhancePreselectionKawaii();
    addCupidCarousel();
    addScrollRail();
  });
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('resize', updateScrollRail, { passive: true });
})();
````

## public/enhancements.css

````css
:root {
  --polyver-phone-width: min(
    390px,
    calc((100dvh - 28px) * 390 / 844),
    calc(100vw - 28px)
  );
}

.prototype {
  position: relative;
}

.device-stage {
  position: relative;
  padding: 14px;
}

.phone {
  width: var(--polyver-phone-width) !important;
  max-height: calc(100dvh - 28px);
}

.polyver-scroll-rail {
  position: absolute;
  z-index: 210;
  top: 46px;
  right: 4px;
  bottom: 29px;
  display: flex;
  width: 20px;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  pointer-events: none;
  transition: opacity 180ms ease;
}

.polyver-scroll-rail > button {
  pointer-events: auto;
}

.polyver-scroll-rail > button:not(.polyver-scroll-rail__track) {
  display: grid;
  width: 19px;
  height: 19px;
  flex: 0 0 19px;
  padding: 0 0 2px;
  place-items: center;
  border: 1px solid #e4b66370;
  border-radius: 50%;
  color: #f8dca8;
  background: #100c12d9;
  box-shadow: 0 3px 10px #0008;
  font-size: 13px;
  font-weight: 800;
  line-height: 1;
  backdrop-filter: blur(8px);
  transition:
    opacity 150ms ease,
    color 150ms ease,
    background 150ms ease;
}

.polyver-scroll-rail > button:not(.polyver-scroll-rail__track):hover:not(:disabled) {
  color: #fff8e8;
  background: #75239ae8;
}

.polyver-scroll-rail > button:disabled {
  opacity: 0.28;
  cursor: default;
}

.polyver-scroll-rail__track {
  position: relative;
  width: 11px;
  min-height: 42px;
  flex: 1 1 auto;
  padding: 0;
  border: 0;
  background: transparent;
}

.polyver-scroll-rail__track::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  border-radius: 999px;
  background: #f0c4772e;
  transform: translateX(-50%);
}

.polyver-scroll-rail__thumb {
  position: absolute;
  top: 0;
  left: calc(50% - 1.5px);
  width: 3px;
  min-height: 18px;
  border-radius: 999px;
  background: linear-gradient(#f5d99e, #b35ade);
  box-shadow: 0 0 8px #c765f2a6;
  transition:
    height 120ms ease,
    transform 80ms linear;
}

.polyver-scroll-rail.is-idle {
  opacity: 0.22;
}

.kawaii-guide.polyver-kawaii-scene {
  position: relative;
  isolation: isolate;
  display: flex;
  min-height: 152px;
  align-items: flex-end;
  overflow: hidden;
  margin: 0 0 18px;
  padding: 86px 13px 12px;
  border: 0;
  border-radius: 18px;
  background:
    radial-gradient(circle at 50% 42%, #9c3bcf26, transparent 62%),
    #050506;
  box-shadow: none;
}

.kawaii-guide.polyver-kawaii-scene::after {
  content: '';
  position: absolute;
  z-index: 1;
  inset: 0;
  background:
    linear-gradient(90deg, #05050626, transparent 28%, transparent 72%, #05050626),
    linear-gradient(180deg, transparent 36%, #050506a8 72%, #050506 100%);
  pointer-events: none;
}

.polyver-kawaii-scene .kawaii-avatar {
  display: none;
}

.polyver-kawaii-scene__image {
  position: absolute;
  z-index: 0;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 36%;
  filter: saturate(1.12) contrast(1.04);
}

.polyver-kawaii-scene[data-polyver-kawaii-scene='location'] .polyver-kawaii-scene__image {
  object-position: center 35%;
  transform: scale(2.2);
  transform-origin: 88% 36%;
}

.polyver-kawaii-scene[data-polyver-kawaii-scene='privacy'] {
  background:
    radial-gradient(circle at 35% 38%, #7d28552e, transparent 64%),
    #050506;
}

.polyver-kawaii-scene[data-polyver-kawaii-scene='privacy'] .polyver-kawaii-scene__image {
  object-position: center 38%;
  transform: scale(1.03);
}

.polyver-kawaii-scene[data-polyver-kawaii-scene='privacy'] > span:not(.kawaii-avatar) {
  text-align: right;
}

.polyver-kawaii-scene[data-polyver-kawaii-scene='identity'] {
  background:
    radial-gradient(circle at 60% 38%, #315a8c33, transparent 64%),
    #050506;
}

.polyver-kawaii-scene[data-polyver-kawaii-scene='identity'] .polyver-kawaii-scene__image {
  object-position: center 40%;
  transform: scale(1.04);
}

.polyver-kawaii-scene[data-polyver-kawaii-scene='photos'] .polyver-kawaii-scene__image {
  object-position: center 34%;
  transform: scale(2.2);
  transform-origin: 50% 35%;
}

.polyver-kawaii-scene[data-polyver-kawaii-scene='photos'] {
  background:
    radial-gradient(circle at 50% 36%, #b43d8238, transparent 62%),
    #050506;
}

.polyver-kawaii-scene > span:not(.kawaii-avatar) {
  position: relative;
  z-index: 2;
  display: block;
  width: 100%;
  text-shadow: 0 2px 8px #000;
}

.polyver-kawaii-scene > span:not(.kawaii-avatar) small {
  color: #f1c985;
  font-size: 11px;
  letter-spacing: 0.035em;
}

.polyver-kawaii-scene > span:not(.kawaii-avatar) b {
  max-width: 270px;
  margin-top: 3px;
  color: #f7f0f4;
  font-size: 9px;
  line-height: 1.35;
}

.polyver-kawaii-scene__label {
  display: block;
  margin-top: 4px;
  color: #a79fa9;
  font-size: 8px;
  font-style: normal;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.reveal-screen > img {
  height: 62%;
  object-position: center 30%;
  transform: scale(1.36);
  transform-origin: 50% 30%;
}

.reveal-screen::after {
  background: linear-gradient(transparent 39%, #050506 66%);
}

.reveal-card {
  margin-top: -88px;
}

.polyver-cupid-carousel {
  position: absolute;
  z-index: 8;
  top: 27%;
  right: 30px;
  left: 12px;
  display: grid;
  grid-template-columns: 34px 1fr 34px;
  align-items: center;
  pointer-events: none;
}

.polyver-cupid-carousel__arrow {
  display: grid;
  width: 34px;
  height: 34px;
  padding: 0 0 3px;
  place-items: center;
  border: 1px solid #f0c67999;
  border-radius: 50%;
  color: #fff1d2;
  background: #09070abf;
  box-shadow:
    0 8px 20px #0009,
    0 0 0 4px #d59b4c12;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 28px;
  line-height: 1;
  pointer-events: auto;
  backdrop-filter: blur(10px);
  transition:
    transform 150ms ease,
    background 150ms ease;
}

.polyver-cupid-carousel__arrow:last-child {
  justify-self: end;
}

.polyver-cupid-carousel__arrow:hover {
  background: #742397e6;
  transform: scale(1.08);
}

.polyver-cupid-carousel__counter {
  justify-self: center;
  padding: 5px 8px;
  border: 1px solid #ffffff24;
  border-radius: 999px;
  color: #f4dab0;
  background: #09070aa8;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.08em;
  backdrop-filter: blur(8px);
}

.app-shell .drawer-glyph.kawaii {
  background-image: none !important;
  box-shadow: inset 0 0 16px #0007;
}

.app-shell .drawer-glyph.kawaii i {
  position: static;
  width: auto;
  height: auto;
  overflow: visible;
  clip-path: none;
}

.app-shell .kawaii-guide .kawaii-avatar {
  display: none;
}

.app-shell .kawaii-guide {
  grid-template-columns: 1fr;
  min-height: 0;
  padding: 10px 12px;
}

.profile-builder .photo {
  position: relative;
  overflow: hidden;
  background-image: url('/luciano-profile-reference.jpeg');
  background-repeat: no-repeat;
  background-size: 494% 642%;
}

.profile-builder .photo[data-polyver-photo-slot='1'] {
  background-position: 33.4% 35.2%;
}

.profile-builder .photo[data-polyver-photo-slot='2'] {
  background-position: 61% 35.2%;
}

.profile-builder .photo[data-polyver-photo-slot='3'] {
  background-position: 33.4% 54.8%;
}

.profile-builder .photo[data-polyver-photo-slot='4'] {
  background-position: 61% 54.8%;
}

.profile-builder .photo > span:not(.polyver-photo-change) {
  display: none;
}

.profile-builder .photo .polyver-photo-change {
  position: absolute;
  right: 7px;
  bottom: 7px;
  display: block;
  padding: 4px 7px;
  border: 1px solid #ffffff2b;
  border-radius: 999px;
  color: #fff7e8;
  background: #09070abd;
  font-size: 8px;
  font-weight: 800;
  line-height: 1;
  backdrop-filter: blur(7px);
}

.profile-builder .photo input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.polyver-reset-wheel {
  position: fixed;
  z-index: 250;
  top: 50%;
  left: calc(50% + (var(--polyver-phone-width) / 2) + 18px);
  display: grid;
  width: 52px;
  height: 52px;
  padding: 0;
  place-items: center;
  border: 1px solid #b5792f;
  border-radius: 50%;
  color: #f8dca8;
  background:
    radial-gradient(circle at 35% 25%, #6c257f 0 18%, transparent 19%),
    linear-gradient(145deg, #251029, #09080b 72%);
  box-shadow:
    0 14px 32px #210b2b3d,
    inset 0 0 0 1px #ffffff14;
  transform: translateY(-50%);
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    border-color 160ms ease;
}

.polyver-reset-wheel:hover {
  border-color: #f2c97f;
  box-shadow:
    0 16px 38px #5f1d784d,
    0 0 0 5px #d59b4c14;
  transform: translateY(-50%) rotate(-14deg) scale(1.05);
}

.polyver-reset-wheel:active {
  transform: translateY(-50%) rotate(-70deg) scale(0.96);
}

.polyver-reset-wheel span {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 31px;
  line-height: 1;
}

.polyver-reset-wheel::after {
  content: 'Volver a cero';
  position: absolute;
  left: calc(100% + 10px);
  top: 50%;
  width: max-content;
  padding: 7px 10px;
  border: 1px solid #d59b4c3d;
  border-radius: 999px;
  color: #5d394d;
  background: #fffaf4;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-50%) translateX(-4px);
  transition: 150ms ease;
}

.polyver-reset-wheel:hover::after,
.polyver-reset-wheel:focus-visible::after {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

.profile-photo-editor {
  padding: 15px;
  border: 1px solid #d59b4c3d;
  border-radius: 20px;
  background:
    radial-gradient(circle at 100% 0, #8927d41f, transparent 42%),
    linear-gradient(145deg, #19121e, #0b090d);
  box-shadow: inset 0 1px 0 #ffffff0a;
}

.profile-photo-editor__heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
}

.profile-photo-editor__heading h3 {
  margin: 0 0 3px;
  color: #f5dfb5;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 19px;
  font-weight: 500;
}

.profile-photo-editor__heading p {
  margin: 0;
  color: #a9a1ad;
  font-size: 11px;
  line-height: 1.35;
}

.profile-photo-editor__badge {
  flex: 0 0 auto;
  padding: 5px 7px;
  border: 1px solid #c269ff42;
  border-radius: 999px;
  color: #d8a7ff;
  background: #8927d412;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.profile-photo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
}

.profile-photo-slot {
  position: relative;
  display: block;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border: 1px solid #d59b4c66;
  border-radius: 15px;
  cursor: pointer;
  background: #080709;
  transition:
    transform 150ms ease,
    border-color 150ms ease,
    box-shadow 150ms ease;
}

.profile-photo-slot:hover {
  border-color: #f0c77f;
  box-shadow: 0 0 0 4px #d59b4c12;
  transform: translateY(-2px);
}

.profile-photo-slot__visual {
  position: absolute;
  inset: 0;
  background-image: url('/luciano-profile-reference.jpeg');
  background-repeat: no-repeat;
  background-size: 494% 642%;
}

.profile-photo-slot[data-slot='0'] .profile-photo-slot__visual {
  background-position: 33.4% 35.2%;
}

.profile-photo-slot[data-slot='1'] .profile-photo-slot__visual {
  background-position: 61% 35.2%;
}

.profile-photo-slot[data-slot='2'] .profile-photo-slot__visual {
  background-position: 33.4% 54.8%;
}

.profile-photo-slot[data-slot='3'] .profile-photo-slot__visual {
  background-position: 61% 54.8%;
}

.profile-photo-slot__visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-photo-slot__index {
  position: absolute;
  top: 8px;
  left: 8px;
  display: grid;
  width: 23px;
  height: 23px;
  place-items: center;
  border: 1px solid #ffffff29;
  border-radius: 50%;
  color: #fff7e8;
  background: #070508b8;
  font-size: 10px;
  font-weight: 800;
  backdrop-filter: blur(8px);
}

.profile-photo-slot__edit {
  position: absolute;
  right: 7px;
  bottom: 7px;
  padding: 5px 8px;
  border: 1px solid #ffffff24;
  border-radius: 999px;
  color: #fff8ed;
  background: #08060abf;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.04em;
  backdrop-filter: blur(8px);
}

.profile-photo-slot input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.profile-photo-editor__restore {
  width: 100%;
  margin-top: 10px;
  padding: 9px 12px;
  border: 1px solid #ffffff17;
  border-radius: 12px;
  color: #c8becb;
  background: #ffffff08;
  font-size: 10px;
  font-weight: 750;
}

.profile-photo-editor__restore:hover {
  color: #f2d9aa;
  border-color: #d59b4c4f;
}

@media (max-width: 560px) {
  :root {
    --polyver-phone-width: min(
      390px,
      calc((100dvh - 28px) * 390 / 844),
      calc(100vw - 104px)
    );
  }

  .polyver-reset-wheel {
    left: calc(50% + (var(--polyver-phone-width) / 2) + 8px);
    width: 44px;
    height: 44px;
  }

  .polyver-reset-wheel span {
    font-size: 27px;
  }

  .polyver-reset-wheel::after {
    display: none;
  }
}

@media (max-height: 620px) {
  .phone {
    border-width: 5px;
    border-radius: 42px;
  }

  .speaker {
    top: 5px;
  }
}
````

## package.json

````json
{
  "name": "sites-project",
  "version": "0.1.0",
  "private": true,
  "engines": {
    "node": ">=22.13.0"
  },
  "scripts": {
    "dev": "vinext dev",
    "build": "vinext build",
    "start": "vinext start",
    "lint": "eslint . --ignore-pattern dist --ignore-pattern .next"
  },
  "dependencies": {
    "next": "16.2.6",
    "react": "19.2.6",
    "react-dom": "19.2.6"
  },
  "devDependencies": {
    "@cloudflare/vite-plugin": "1.37.1",
    "@cloudflare/workers-types": "4.20260515.1",
    "@openai/sites-vite-plugin": "^0.1.0 || ^0.2.0",
    "@tailwindcss/postcss": "4.2.1",
    "@types/node": "22.19.19",
    "@types/react": "19.2.14",
    "@types/react-dom": "19.2.3",
    "@vitejs/plugin-react": "6.0.2",
    "@vitejs/plugin-rsc": "0.5.26",
    "eslint": "9.39.4",
    "eslint-config-next": "16.2.6",
    "react-server-dom-webpack": "19.2.6",
    "tailwindcss": "4.2.1",
    "typescript": "5.9.3",
    "vinext": "1.0.0-beta.3",
    "vite": "8.0.13",
    "wrangler": "4.92.0"
  },
  "type": "module"
}
````

## vite.config.ts

````typescript
import { sites } from '@openai/sites-vite-plugin';
import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';
import hostingConfig from './.openai/hosting.json';

const SITE_CREATOR_PLACEHOLDER_DATABASE_ID =
  '00000000-0000-4000-8000-000000000000';

const { d1, r2 } = hostingConfig;

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === 'seatbelt';

const localBindingConfig = {
  main: 'vinext/server/app-router-entry',
  compatibility_flags: ['nodejs_compat'],
  d1_databases: d1
    ? [
        {
          binding: d1,
          database_name: 'site-creator-d1',
          database_id: SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
        },
      ]
    : [],
  r2_buckets: r2
    ? [
        {
          binding: r2,
          bucket_name: 'site-creator-r2',
        },
      ]
    : [],
};

export default defineConfig(async () => {
  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= 'false';
  process.env.WRANGLER_LOG_PATH ??= '.wrangler/logs';
  process.env.MINIFLARE_REGISTRY_PATH ??= '.wrangler/registry';

  // Wrangler snapshots its log path while the Cloudflare plugin is imported.
  const { cloudflare } = await import('@cloudflare/vite-plugin');

  return {
    css: { postcss: { plugins: [tailwindcss()] } },
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinext(),
      sites(),
      cloudflare({
        viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] },
        config: localBindingConfig,
      }),
    ],
  };
});
````

## next.config.ts

````typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {};

export default nextConfig;
````

## tsconfig.json

````json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "types": ["node", "@cloudflare/workers-types"],
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
````

## eslint.config.mjs

````javascript
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
````

## pnpm-workspace.yaml

````yaml
packages:
  - "."

allowBuilds:
  esbuild: true
  sharp: true
  unrs-resolver: true
  workerd: true
````
