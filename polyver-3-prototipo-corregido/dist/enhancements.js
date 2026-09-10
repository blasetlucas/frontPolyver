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
    if (profileProgress.querySelector("img")?.alt !== "Luciano") {
      document.querySelector(".profile-photo-editor")?.remove();
      return;
    }

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
