// Lógica exclusiva de la home.
import { gsap, ScrollTrigger, reduced, splitWords, scramble, lenis } from './motion.js';

/* ---------- Preloader corto y saltable (solo primera visita) ---------- */
function initPreloader() {
  const pre = document.getElementById('preloader');
  if (!pre) return Promise.resolve();
  const show = document.documentElement.classList.contains('show-pre');
  if (!show || reduced) { pre.remove(); return Promise.resolve(); }
  try { sessionStorage.setItem('sf-pre', '1'); } catch (_) {}
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return; done = true;
      pre.classList.add('is-done');
      setTimeout(() => pre.remove(), 520);
      resolve();
    };
    pre.querySelector('[data-skip]')?.addEventListener('click', finish);
    document.addEventListener('keydown', (e) => e.key === 'Escape' && finish(), { once: true });
    import('animejs').then(({ animate }) => {
      animate(pre.querySelector('[data-pre-logo]'), { scale: [0.7, 1], opacity: [0, 1], duration: 650, ease: 'outBack(1.6)' });
      animate(pre.querySelector('[data-pre-bar]'), { scaleX: [0, 1], duration: 1000, ease: 'inOutQuad' });
    }).catch(() => {});
    setTimeout(finish, 1150);
  });
}

/* ---------- Hero ---------- */
function heroIntro() {
  const h1 = document.querySelector('[data-hero-title]');
  const words = splitWords(h1);
  if (reduced) return;
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.from(words, { yPercent: 110, duration: 0.9, stagger: 0.045 })
    .from('[data-hero-fade]', { y: 20, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.55')
    .from('[data-float]', { y: 30, opacity: 0, scale: 0.9, duration: 0.8, stagger: 0.07 }, '-=0.7');

  // Parallax de las categorías flotantes (solo transform)
  gsap.utils.toArray('[data-float]').forEach((el, i) => {
    gsap.to(el, {
      yPercent: -40 - (i % 3) * 25, ease: 'none',
      scrollTrigger: { trigger: '#inicio', start: 'top top', end: 'bottom top', scrub: true },
    });
  });
  gsap.to('[data-hero-phone]', {
    yPercent: 8, ease: 'none',
    scrollTrigger: { trigger: '#inicio', start: 'top top', end: 'bottom top', scrub: true },
  });
}

/* ---------- Red de nodos Three.js (lazy, opcional) ---------- */
function initNetwork() {
  const host = document.querySelector('[data-network]');
  if (!host || reduced) return;
  const conn = navigator.connection;
  if (conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))) return;
  const c = document.createElement('canvas');
  if (!(c.getContext('webgl2') || c.getContext('webgl'))) return;

  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  let started = false;
  const start = () => {
    if (started) return; started = true;
    import('./hero-network.js').then(({ mountNetwork }) => mountNetwork(host, { isMobile })).catch(() => {});
  };
  // Móvil: solo tras la primera interacción. Escritorio: también en idle.
  ['pointerdown', 'touchstart', 'scroll', 'keydown'].forEach((ev) => window.addEventListener(ev, start, { once: true, passive: true }));
  if (!isMobile) {
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1));
    window.addEventListener('load', () => setTimeout(() => idle(start, { timeout: 2000 }), 2500), { once: true });
  }
}

/* ---------- 4 células: scroll horizontal pinned (desktop) ---------- */
function initCells() {
  const section = document.querySelector('[data-cells]');
  const track = document.querySelector('[data-cells-track]');
  if (!section || !track) return;
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    const distance = () => track.scrollWidth - window.innerWidth + 80;
    const tween = gsap.to(track, {
      x: () => -distance(), ease: 'none',
      scrollTrigger: {
        trigger: section, start: 'top top', end: () => '+=' + distance(),
        pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: (self) => gsap.set('[data-cells-progress]', { scaleX: self.progress }),
      },
    });
    gsap.utils.toArray('[data-cell]').forEach((card) => {
      gsap.from(card.querySelector('[data-cell-icon]'), {
        rotate: -12, scale: 0.8, ease: 'none',
        scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'center center', scrub: true },
      });
    });
    return () => gsap.set(track, { clearProps: 'transform' });
  });
}

/* ---------- Dashboard animado (reemplaza el mock JSON) ---------- */
function initDashboard() {
  const dash = document.querySelector('[data-dashboard]');
  if (!dash) return;
  const bars = dash.querySelectorAll('[data-bar]');
  const counters = dash.querySelectorAll('[data-count]');
  const run = () => {
    counters.forEach((el) => {
      const to = parseFloat(el.dataset.count);
      const dec = (el.dataset.count.split('.')[1] || '').length;
      if (reduced) { el.textContent = to.toFixed(dec); return; }
      const obj = { v: 0 };
      gsap.to(obj, { v: to, duration: 1.6, ease: 'power3.out', onUpdate: () => { el.textContent = obj.v.toFixed(dec).replace('.', ','); } });
    });
    if (!reduced) {
      gsap.fromTo(bars, { scaleY: 0 }, { scaleY: 1, duration: 1.1, ease: 'power3.out', stagger: 0.06 });
      gsap.fromTo(dash.querySelectorAll('[data-row]'), { x: 24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.12, delay: 0.3 });
      gsap.fromTo(dash.querySelector('[data-line]'), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'power2.inOut', transformOrigin: 'left center' });
    }
    dash.querySelectorAll('[data-scramble]').forEach((el) => !reduced && scramble(el));
  };
  ScrollTrigger.create({ trigger: dash, start: 'top 75%', once: true, onEnter: run });

  // Simulación "en vivo": pulsos de pedidos nuevos (solo opacity/transform)
  if (reduced) return;
  const feed = dash.querySelector('[data-feed]');
  let visible = false;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(dash);
  setInterval(() => {
    if (!visible || !feed) return;
    const first = feed.firstElementChild;
    gsap.to(first, { opacity: 0, y: -12, duration: 0.35, onComplete: () => {
      feed.append(first);
      gsap.fromTo(first, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45 });
    } });
  }, 2600);
}

/* ---------- Video de marca: se carga y reproduce solo en viewport ---------- */
function initBrandVideo() {
  const v = document.querySelector('[data-brand-video]');
  if (!v) return;
  if (reduced) { v.removeAttribute('autoplay'); return; }
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      if (!v.src) { v.src = v.dataset.src; }
      v.play().catch(() => {});
    } else v.pause();
  }, { rootMargin: '200px' }).observe(v);
}

/* ---------- Titular gigante editorial ---------- */
function initGiant() {
  if (reduced) return;
  gsap.utils.toArray('[data-giant]').forEach((el) => {
    gsap.fromTo(el, { xPercent: 6 }, { xPercent: -6, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

initPreloader();
heroIntro();
initNetwork();
initCells();
initDashboard();
initBrandVideo();
initGiant();
void lenis;
