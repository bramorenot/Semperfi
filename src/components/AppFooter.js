/**
 * AppFooter - Web Component para el footer del sitio
 * Componente reutilizable con información de la empresa, enlaces y secciones
 */
class AppFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer class="w-full bg-[#f9f8f6] py-12 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-10 border-t border-black/5">
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-col lg:flex-row justify-between gap-12 sm:gap-16 lg:gap-24">
            <!-- Logo y copyright -->
            <div class="lg:max-w-sm">
              <div class="flex items-center gap-3 mb-6 sm:mb-8 lg:mb-12">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                  <img src="/Assets/1_1_Logo_Semper_Fi_Con_Fondo_Degradado.png" 
                       alt="Semper Fi Logo" 
                       class="w-full h-full object-cover" />
                </div>
                <span class="text-2xl sm:text-3xl font-semibold tracking-tight">Semper Fi</span>
              </div>
              <p class="text-[#70706f] text-sm sm:text-base leading-relaxed">
                © 2026 Semper Fi. Popayán, Cauca, Colombia.
                <br/>
                Org.nr: 5595734681
              </p>
            </div>
            
            <!-- Enlaces del footer -->
            <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 lg:gap-16 flex-1">
              <!-- Producto -->
              <div>
                <h5 class="text-[10px] sm:text-[11px] font-mono text-gray-400 mb-4 sm:mb-6 lg:mb-8 uppercase tracking-widest">Producto</h5>
                <ul class="space-y-3 sm:space-y-4">
                  <li><a class="font-serif text-base sm:text-lg lg:text-xl hover:text-gray-500 transition-colors block" href="#">Precios</a></li>
                  <li><a class="font-serif text-base sm:text-lg lg:text-xl hover:text-gray-500 transition-colors block" href="/domicilios.html">Domicilios</a></li>
                  <li><a class="font-serif text-base sm:text-lg lg:text-xl hover:text-gray-500 transition-colors block" href="/software.html">Software</a></li>
                </ul>
              </div>
              
              <!-- Compañía -->
              <div>
                <h5 class="text-[10px] sm:text-[11px] font-mono text-gray-400 mb-4 sm:mb-6 lg:mb-8 uppercase tracking-widest">Compañía</h5>
                <ul class="space-y-3 sm:space-y-4">
                  <li><a class="font-serif text-base sm:text-lg lg:text-xl hover:text-gray-500 transition-colors block" href="/sobre-nosotros.html">Sobre nosotros</a></li>
                </ul>
              </div>
              
              <!-- Contacto -->
              <div>
                <h5 class="text-[10px] sm:text-[11px] font-mono text-gray-400 mb-4 sm:mb-6 lg:mb-8 uppercase tracking-widest">Contacto</h5>
                <ul class="space-y-3 sm:space-y-4">
                  <li><a class="font-serif text-base sm:text-lg lg:text-xl hover:text-gray-500 transition-colors break-words block" href="mailto:info@semperfi.app">info@semperfi.app</a></li>
                </ul>
              </div>
              
              <!-- Legal -->
              <div class="col-span-2 sm:col-span-2 md:col-span-1">
                <h5 class="text-[10px] sm:text-[11px] font-mono text-gray-400 mb-4 sm:mb-6 lg:mb-8 uppercase tracking-widest">Legal</h5>
                <ul class="space-y-3 sm:space-y-4">
                  <li><a class="font-serif text-base sm:text-lg lg:text-xl hover:text-gray-500 transition-colors block" href="#">Términos y condiciones</a></li>
                  <li><a class="font-serif text-base sm:text-lg lg:text-xl hover:text-gray-500 transition-colors block" href="#">Acuerdo de aliados</a></li>
                  <li><a class="font-serif text-base sm:text-lg lg:text-xl hover:text-gray-500 transition-colors block" href="#">Política de privacidad</a></li>
                  <li><a class="font-serif text-base sm:text-lg lg:text-xl hover:text-gray-500 transition-colors block" href="#">DPA</a></li>
                  <li><a class="font-serif text-base sm:text-lg lg:text-xl hover:text-gray-500 transition-colors block" href="#">Política de cookies</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

// Registrar el custom element
customElements.define('app-footer', AppFooter);

export default AppFooter;
