// Motion compartido: Lenis + GSAP/ScrollTrigger (npm, tree-shaken) y
// microinteracciones con Anime.js cargado bajo demanda.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export let lenis = null;
export { gsap, ScrollTrigger };

/** Divide el texto de un elemento en palabras enmascaradas (sin romper la accesibilidad). */
export function splitWords(el) {
  if (el.dataset.splitDone) return el.querySelectorAll('.word');
  const label = el.textContent.replace(/\s+/g, ' ').trim();
  el.setAttribute('aria-label', label);
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(' '); return; }
          const mask = document.createElement('span');
          mask.className = 'word-mask';
          mask.setAttribute('aria-hidden', 'true');
          const w = document.createElement('span');
          w.className = 'word';
          w.textContent = part;
          mask.append(w);
          frag.append(mask);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1 && !child.matches('br')) {
        walk(child);
      }
    });
  };
  walk(el);
  el.dataset.splitDone = '1';
  return el.querySelectorAll('.word');
}

/** Scramble de cifras (inspiración FabSoft): solo para números reales del contenido. */
export function scramble(el, duration = 900) {
  const final = el.dataset.scramble || el.textContent;
  const chars = '0123456789';
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min(1, (now - start) / duration);
    const settled = Math.floor(p * final.length);
    el.textContent = [...final].map((c, i) => (i < settled || !/[0-9]/.test(c) ? c : chars[(Math.random() * 10) | 0])).join('');
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function initReveals() {
  const els = gsap.utils.toArray('.js-reveal, .reveal-up');
  if (reduced) { gsap.set(els, { opacity: 1, y: 0 }); return; }
  ScrollTrigger.batch(els, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true }),
  });

  gsap.utils.toArray('[data-split]').forEach((el) => {
    const words = splitWords(el);
    if (reduced) return;
    gsap.from(words, {
      yPercent: 110, duration: 0.9, ease: 'power4.out', stagger: 0.04,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });

  gsap.utils.toArray('[data-scramble]').forEach((el) => {
    if (reduced) return;
    ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => scramble(el) });
  });
}

function initLenis() {
  if (reduced) return;
  lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  // Anclas internas con Lenis
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"], a[href^="/#"]');
    if (!a) return;
    const hash = a.getAttribute('href').replace(/^\//, '');
    if (a.getAttribute('href').startsWith('/#') && location.pathname !== '/' && !location.pathname.endsWith('index.html')) return;
    const target = hash.length > 1 && document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -90 });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    history.pushState(null, '', hash);
  });
}

/** Microinteracción magnética en CTAs: Anime.js se descarga al primer puntero. */
function initMagnetic() {
  if (reduced || !window.matchMedia('(hover: hover)').matches) return;
  let animate;
  const load = async () => {
    ({ animate } = await import('animejs'));
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        animate(el, { x: (e.clientX - r.left - r.width / 2) * 0.18, y: (e.clientY - r.top - r.height / 2) * 0.25, duration: 400, ease: 'outQuad' });
      });
      el.addEventListener('pointerleave', () => animate(el, { x: 0, y: 0, duration: 700, ease: 'outElastic(1, .5)' }));
    });
  };
  window.addEventListener('pointermove', load, { once: true, passive: true });
}

export function initMotion() {
  if (reduced) document.documentElement.classList.add('reduced');
  initLenis();
  initReveals();
  initMagnetic();
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
