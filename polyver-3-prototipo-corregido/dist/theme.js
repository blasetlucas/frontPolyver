/* Polyver starts in night mode, independently of the device's appearance. */
(() => {
  const key = 'polyver-appearance';
  const root = document.documentElement;
  const icons = {
    day: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/>',
    night: '<path d="M20.4 14.5A9 9 0 0 1 9.5 3.6 9 9 0 1 0 20.4 14.5Z"/>'
  };
  let mode = 'night';
  try { if (localStorage.getItem(key) === 'day') mode = 'day'; } catch { /* Private browsing may disallow storage. */ }

  function apply() {
    root.dataset.theme = mode;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = mode === 'night' ? '#0c0a10' : '#faf9fc';
    const next = mode === 'night' ? 'day' : 'night';
    const label = next === 'day' ? 'Modo día' : 'Modo noche';
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      button.setAttribute('aria-label', `Activar ${label.toLowerCase()}`);
      button.title = `Activar ${label.toLowerCase()}`;
      const text = button.querySelector('[data-theme-label]');
      if (text) text.textContent = label;
      const icon = button.querySelector('[data-theme-icon]');
      if (icon) icon.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[next]}</svg>`;
    });
  }
  apply();
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      button.addEventListener('click', () => {
        mode = mode === 'night' ? 'day' : 'night';
        try { localStorage.setItem(key, mode); } catch { /* Switching still works without persistence. */ }
        apply();
      });
    });
  });
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) {
      mode = event.newValue === 'day' ? 'day' : 'night';
      apply();
    }
  });
})();
