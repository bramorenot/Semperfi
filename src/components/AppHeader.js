/**
 * <app-header> — header pill glass, nav semántico, menú móvil accesible
 * y CTA de la app siempre visible.
 */
const LINKS = [
  { href: '/domicilios.html', label: 'Domicilios' },
  { href: '/servicios.html', label: 'Servicios' },
  { href: '/software.html', label: 'Software' },
  { href: '/sobre-nosotros.html', label: 'Sobre nosotros' },
];

class AppHeader extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname.replace(/\/$/, '/index.html');
    const isHome = path.endsWith('/index.html') || path === '/';
    const appHref = isHome ? '#descargar' : '/#descargar';
    const link = (l, cls) =>
      `<a class="${cls}" href="${l.href}"${path.endsWith(l.href) ? ' aria-current="page"' : ''}>${l.label}</a>`;

    this.innerHTML = `
      <header class="fixed inset-x-3 top-3 z-[100] sm:inset-x-5 sm:top-4" data-header>
        <div class="mx-auto flex h-[60px] max-w-7xl items-center justify-between gap-4 rounded-full border border-white/10 bg-semperfi-900/75 pl-3 pr-2 shadow-panel backdrop-blur-xl sm:h-[64px] sm:pl-5">
          <a href="/" class="flex items-center gap-2.5 rounded-full" aria-label="Semper Fi, ir al inicio">
            <picture>
              <source srcset="/img/logo-96.avif" type="image/avif" />
              <img src="/img/logo-96.webp" width="36" height="36" alt="" class="h-9 w-9" decoding="async" />
            </picture>
            <span class="whitespace-nowrap font-display text-lg font-semibold tracking-tight text-white">Semper Fi</span>
          </a>
          <nav aria-label="Principal" class="hidden lg:block">
            <ul class="flex items-center gap-1">
              ${LINKS.map((l) => `<li>${link(l, 'nav-link rounded-full px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-white aria-[current=page]:text-semperfi-400')}</li>`).join('')}
            </ul>
          </nav>
          <div class="flex items-center gap-2">
            <a href="/software.html" class="hidden rounded-full px-4 py-2 text-sm font-medium text-white/80 hover:text-white md:inline-flex">Soy comercio</a>
            <a href="${appHref}" class="btn btn-primary !min-h-[44px] !px-5 !text-sm" data-magnetic>
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>
              <span class="sm:hidden">App</span><span class="hidden sm:inline">Descargar app</span>
            </a>
            <button type="button" class="grid h-11 w-11 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden" aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir menú" data-menu-btn>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16" data-icon-open/><path d="M6 6l12 12M18 6 6 18" data-icon-close hidden/></svg>
            </button>
          </div>
        </div>
        <nav id="mobile-menu" aria-label="Menú móvil" hidden class="mx-auto mt-2 max-w-7xl rounded-3xl border border-white/10 bg-semperfi-900/95 p-3 shadow-panel backdrop-blur-xl lg:hidden">
          <ul class="grid gap-1">
            ${LINKS.map((l) => `<li>${link(l, 'block rounded-2xl px-4 py-3.5 text-base font-medium text-white/90 hover:bg-white/5 aria-[current=page]:text-semperfi-400')}</li>`).join('')}
            <li><a class="block rounded-2xl px-4 py-3.5 text-base font-medium text-white/90 hover:bg-white/5" href="/software.html">Soy comercio</a></li>
          </ul>
        </nav>
      </header>`;

    const btn = this.querySelector('[data-menu-btn]');
    const menu = this.querySelector('#mobile-menu');
    const setOpen = (open) => {
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      menu.hidden = !open;
      btn.querySelector('[data-icon-open]').toggleAttribute('hidden', open);
      btn.querySelector('[data-icon-close]').toggleAttribute('hidden', !open);
    };
    btn.addEventListener('click', () => setOpen(menu.hidden));
    menu.addEventListener('click', (e) => e.target.closest('a') && setOpen(false));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.hidden) { setOpen(false); btn.focus(); }
    });
  }
}

customElements.define('app-header', AppHeader);
export default AppHeader;
