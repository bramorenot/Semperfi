/** <app-footer> — footer semántico con páginas, contacto y legal. */
class AppFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    this.innerHTML = `
      <footer class="relative overflow-hidden bg-night text-white">
        <div class="container-x grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <a href="/" class="inline-flex items-center gap-3" aria-label="Semper Fi, ir al inicio">
              <picture>
                <source srcset="/img/logo-96.avif" type="image/avif" />
                <img src="/img/logo-96.webp" width="44" height="44" alt="" class="h-11 w-11" loading="lazy" decoding="async" />
              </picture>
              <span class="font-display text-2xl font-semibold">Semper Fi</span>
            </a>
            <p class="mt-3 font-mono text-xs uppercase tracking-[0.25em] text-semperfi-400">Siempre fiel</p>
            <p class="mt-6 max-w-xs text-sm leading-relaxed text-white/65">Ecosistema digital inteligente hecho en Popayán, Cauca, Colombia.</p>
          </div>
          <div class="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <nav aria-label="Producto">
              <h2 class="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">Producto</h2>
              <ul class="space-y-3 text-[15px]">
                <li><a class="text-white/85 hover:text-semperfi-400" href="/domicilios.html">Domicilios</a></li>
                <li><a class="text-white/85 hover:text-semperfi-400" href="/servicios.html">Servicios</a></li>
                <li><a class="text-white/85 hover:text-semperfi-400" href="/software.html">Software / Stock</a></li>
                <li><a class="text-white/85 hover:text-semperfi-400" href="/#descargar">Descargar app</a></li>
              </ul>
            </nav>
            <nav aria-label="Compañía">
              <h2 class="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">Compañía</h2>
              <ul class="space-y-3 text-[15px]">
                <li><a class="text-white/85 hover:text-semperfi-400" href="/sobre-nosotros.html">Sobre nosotros</a></li>
                <li><a class="text-white/85 hover:text-semperfi-400" href="/#celulas">Nuestras células</a></li>
                <li><a class="text-white/85 hover:text-semperfi-400" href="/#faq">Preguntas frecuentes</a></li>
              </ul>
            </nav>
            <div>
              <h2 class="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">Contacto</h2>
              <ul class="space-y-3 text-[15px]">
                <li><a class="break-words text-white/85 hover:text-semperfi-400" href="mailto:info@semperfi.app">info@semperfi.app</a></li>
                <li><a class="text-white/85 hover:text-semperfi-400" href="mailto:info@semperfi.app?subject=Documentos%20legales%20Semper%20Fi">Términos y privacidad</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="border-t border-white/10">
          <div class="container-x flex flex-col gap-2 py-6 text-xs text-white/55 sm:flex-row sm:justify-between">
            <p>© ${year} Semper Fi. Popayán, Cauca, Colombia.</p>
            <p>Hecho con orgullo payanés.</p>
          </div>
        </div>
      </footer>`;
  }
}

customElements.define('app-footer', AppFooter);
export default AppFooter;
