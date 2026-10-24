/**
 * AppHeader - Web Component para el header de navegación
 * Componente reutilizable que maneja el header con logo, navegación y scroll behavior
 */
class AppHeader extends HTMLElement {
  connectedCallback() {
    this.render();
    // Usar requestAnimationFrame para asegurar que el DOM esté completamente renderizado
    requestAnimationFrame(() => {
      this.setupScrollBehavior();
      this.setupMobileMenu();
    });
  }

  render() {
    // Detectar la página actual
    const currentPath = window.location.pathname;
    const isHome = currentPath === '/' || currentPath.includes('index.html');
    const isSobreNosotros = currentPath.includes('sobre-nosotros.html');
    const isDomicilios = currentPath.includes('domicilios.html');
    const isSoftware = currentPath.includes('software.html');
    const isServicios = currentPath.includes('servicios.html');

    this.innerHTML = `
      <style>
        .nav-link-item.active {
          color: white !important;
          font-weight: 600;
          position: relative;
        }
        .nav-link-item.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: white;
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
        }
        #main-nav.is-light .nav-link-item.active {
          color: #2ebaf8 !important;
        }
        #main-nav.is-light .nav-link-item.active::after {
          background: #2ebaf8;
          box-shadow: 0 0 8px rgba(46, 186, 248, 0.6);
        }
        
        /* Mobile menu */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 5rem;
          left: 0.5rem;
          right: 0.5rem;
          background: rgba(10, 22, 40, 0.98);
          backdrop-filter: blur(20px);
          border-radius: 1.5rem;
          padding: 1rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 98;
        }
        
        .mobile-menu.open {
          display: block;
          animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .mobile-menu a {
          display: block;
          padding: 1rem 1.25rem;
          color: white;
          text-decoration: none;
          border-radius: 0.875rem;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        
        .mobile-menu a:last-child {
          margin-bottom: 0;
        }
        
        .mobile-menu a:hover {
          background: rgba(46, 186, 248, 0.15);
          color: #2ebaf8;
          transform: translateX(4px);
        }
        
        .mobile-menu a.active {
          background: rgba(46, 186, 248, 0.2);
          color: #2ebaf8;
          font-weight: 600;
          box-shadow: 0 0 20px rgba(46, 186, 248, 0.2);
        }
        
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 0.375rem;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 101;
          background: transparent;
          border: none;
          position: relative;
          width: 2.5rem;
          height: 2.5rem;
          align-items: center;
          justify-content: center;
        }
        
        .hamburger span {
          width: 1.5rem;
          height: 2px;
          background: white;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: block;
          position: absolute;
        }
        
        .hamburger span:nth-child(1) {
          top: 0.625rem;
        }
        
        .hamburger span:nth-child(2) {
          top: 50%;
          transform: translateY(-50%);
        }
        
        .hamburger span:nth-child(3) {
          bottom: 0.625rem;
        }
        
        .hamburger.open span:nth-child(1) {
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
        }
        
        .hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: translateX(1rem);
        }
        
        .hamburger.open span:nth-child(3) {
          bottom: 50%;
          transform: translateY(50%) rotate(-45deg);
        }
        
        #main-nav.is-light .hamburger span {
          background: #0a1628;
        }
        
        /* Hover effect on hamburger */
        .hamburger:hover span {
          background: #2ebaf8;
        }
        
        #main-nav.is-light .hamburger:hover span {
          background: #2ebaf8;
        }
        
        /* Mobile responsive header */
        @media (max-width: 1023px) {
          .hamburger {
            display: flex;
          }
          
          #main-nav {
            padding: 0.875rem 1.25rem !important;
            top: 0.5rem !important;
            left: 0.5rem !important;
            right: 0.5rem !important;
          }
          
          #main-nav .logo-text {
            font-size: 1.125rem !important;
          }
          
          #main-nav .logo-container img {
            width: 2rem !important;
            height: 2rem !important;
          }
        }
        
        @media (max-width: 640px) {
          .mobile-menu {
            top: 4.5rem;
            border-radius: 1.25rem;
            padding: 0.75rem;
          }
          
          .mobile-menu a {
            padding: 0.875rem 1rem;
            font-size: 0.9375rem;
          }
        }
        
        @media (max-width: 480px) {
          #main-nav .logo-text {
            font-size: 1rem !important;
          }
          
          #main-nav {
            padding: 0.75rem 1rem !important;
          }
          
          .hamburger {
            width: 2.25rem;
            height: 2.25rem;
          }
          
          .hamburger span {
            width: 1.375rem;
          }
          
          .mobile-menu {
            top: 4rem;
          }
        }
      </style>
      <header class="fixed top-4 left-4 right-4 w-auto z-[100] flex items-center justify-between px-6 sm:px-10 py-4 sm:py-6 backdrop-blur-md bg-white/10 rounded-full border border-white/20 shadow-xl" 
              id="main-nav">
        <div class="flex items-center gap-6 sm:gap-12">
          <a class="flex items-center gap-2 sm:gap-3 group" href="/">
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300 logo-container">
              <img src="/Assets/1_1_Logo_Semper_Fi_Con_Fondo_Degradado.png" 
                   alt="Semper Fi Logo" 
                   class="w-full h-full object-cover" />
            </div>
            <span class="text-lg sm:text-xl font-bold tracking-tight text-white transition-colors duration-300 logo-text drop-shadow-lg">
              Semper Fi
            </span>
          </a>
          <nav class="hidden lg:flex items-center gap-6 xl:gap-8">
            <a class="text-sm font-medium text-white/80 hover:text-white nav-link-item transition-colors ${isSobreNosotros ? 'active' : ''}" 
               href="/sobre-nosotros.html">
              Sobre nosotros
            </a>
            <a class="text-sm font-medium text-white/80 hover:text-white nav-link-item transition-colors ${isDomicilios ? 'active' : ''}" 
               href="/domicilios.html">
              Domicilios
            </a>
            <a class="text-sm font-medium text-white/80 hover:text-white nav-link-item transition-colors ${isSoftware ? 'active' : ''}" 
               href="/software.html">
              Software
            </a>
            <a class="text-sm font-medium text-white/80 hover:text-white nav-link-item transition-colors ${isServicios ? 'active' : ''}" 
               href="/servicios.html">
              Servicios
            </a>
          </nav>
        </div>
        
        <!-- Hamburger menu button -->
        <button class="hamburger lg:hidden" id="hamburger-btn" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div class="flex items-center gap-4" style="display: none;">
          <a class="px-5 py-2.5 rounded-full bg-white/20 text-white text-sm font-semibold hover:bg-white hover:text-[#2ebaf8] transition-all duration-300 backdrop-blur-sm border border-white/30 nav-btn-signin" 
             href="#">
            Iniciar sesión
          </a>
          <a class="px-5 py-2.5 rounded-full bg-[#2ebaf8] text-white text-sm font-semibold hover:bg-white hover:text-[#2ebaf8] transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white/50 nav-btn-demo" 
             href="#">
            Únete ahora
          </a>
        </div>
      </header>
      
      <!-- Mobile menu -->
      <nav class="mobile-menu" id="mobile-menu">
        <a href="/sobre-nosotros.html" class="${isSobreNosotros ? 'active' : ''}">Sobre nosotros</a>
        <a href="/domicilios.html" class="${isDomicilios ? 'active' : ''}">Domicilios</a>
        <a href="/software.html" class="${isSoftware ? 'active' : ''}">Software</a>
        <a href="/servicios.html" class="${isServicios ? 'active' : ''}">Servicios</a>
      </nav>
    `;
    
    // Setup mobile menu toggle
    this.setupMobileMenu();
  }
  
  setupMobileMenu() {
    // Usar setTimeout para asegurar que el DOM esté listo
    setTimeout(() => {
      // Buscar en todo el documento, no solo en this
      const hamburger = document.querySelector('#hamburger-btn');
      const mobileMenu = document.querySelector('#mobile-menu');
      
      console.log('Setup mobile menu:', { hamburger, mobileMenu });
      
      if (hamburger && mobileMenu) {
        // Limpiar eventos previos
        hamburger.replaceWith(hamburger.cloneNode(true));
        const newHamburger = document.querySelector('#hamburger-btn');
        
        newHamburger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Hamburger clicked!');
          newHamburger.classList.toggle('open');
          mobileMenu.classList.toggle('open');
        });
        
        // Close menu when clicking on a link
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
          link.addEventListener('click', () => {
            newHamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
          });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
          if (!newHamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            newHamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
          }
        });
      } else {
        console.error('Hamburger or mobile menu not found!', { hamburger, mobileMenu });
      }
    }, 200);
  }

  setupScrollBehavior() {
    const header = this.querySelector('#main-nav');
    if (!header) return;

    // Determinar si la página inicial debe tener el header claro
    const currentPage = window.location.pathname;
    const lightPages = ['/sobre-nosotros.html', '/domicilios.html', '/software.html', '/servicios.html'];
    
    // Si es una página de contenido, iniciar con estilo claro
    if (lightPages.some(page => currentPage.includes(page))) {
      header.classList.add('is-light');
    }

    // Manejar el cambio de estilo al hacer scroll
    let ticking = false;
    
    const updateHeader = () => {
      const scrollY = window.scrollY;
      const shouldBeLight = scrollY > 100;
      
      if (shouldBeLight && !header.classList.contains('is-light')) {
        header.classList.add('is-light');
      } else if (!shouldBeLight && header.classList.contains('is-light') && !lightPages.some(page => currentPage.includes(page))) {
        header.classList.remove('is-light');
      }
      
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });
  }
}

// Registrar el custom element
customElements.define('app-header', AppHeader);

export default AppHeader;
