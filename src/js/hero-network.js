// Red de nodos "Popayán conectado" — Three.js importado dinámicamente.
// Pausa fuera de pantalla / pestaña oculta, DPR ≤ 1.5 en móvil, menos nodos en gama baja.
import {
  WebGLRenderer, Scene, PerspectiveCamera, BufferGeometry, Float32BufferAttribute,
  Points, PointsMaterial, LineSegments, LineBasicMaterial, AdditiveBlending, Color,
} from 'three';

export function mountNetwork(host, { isMobile }) {
  const lowEnd = (navigator.hardwareConcurrency || 4) <= 4 || (navigator.deviceMemory || 4) <= 4;
  const COUNT = isMobile ? (lowEnd ? 40 : 60) : (lowEnd ? 80 : 130);
  const MAX_DIST = isMobile ? 1.5 : 1.25;

  const renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  canvas.className = 'absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000';
  host.append(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(55, 1, 0.1, 50);
  camera.position.z = 7;

  // Nodos en un disco irregular (como un plano de ciudad)
  const pos = [];
  for (let i = 0; i < COUNT; i++) {
    const r = Math.sqrt(Math.random()) * 5.2;
    const a = Math.random() * Math.PI * 2;
    pos.push(Math.cos(a) * r * 1.35, Math.sin(a) * r * 0.75, (Math.random() - 0.5) * 2.2);
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pos, 3));
  const points = new Points(g, new PointsMaterial({ color: new Color('#5dcbfb'), size: isMobile ? 0.07 : 0.055, transparent: true, opacity: 0.9, blending: AdditiveBlending, depthWrite: false }));

  const lines = [];
  for (let i = 0; i < COUNT; i++) for (let j = i + 1; j < COUNT; j++) {
    const dx = pos[i * 3] - pos[j * 3], dy = pos[i * 3 + 1] - pos[j * 3 + 1], dz = pos[i * 3 + 2] - pos[j * 3 + 2];
    if (dx * dx + dy * dy + dz * dz < MAX_DIST * MAX_DIST) lines.push(...pos.slice(i * 3, i * 3 + 3), ...pos.slice(j * 3, j * 3 + 3));
  }
  const lg = new BufferGeometry();
  lg.setAttribute('position', new Float32BufferAttribute(lines, 3));
  const seg = new LineSegments(lg, new LineBasicMaterial({ color: new Color('#2ebaf8'), transparent: true, opacity: 0.18, blending: AdditiveBlending, depthWrite: false }));

  scene.add(points, seg);

  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  resize();
  new ResizeObserver(resize).observe(host);

  let mx = 0, my = 0;
  window.addEventListener('pointermove', (e) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; }, { passive: true });

  let running = false, raf = 0, t = 0;
  const loop = () => {
    t += 0.0016;
    scene.rotation.z = t;
    scene.rotation.x += ((my * 0.25) - scene.rotation.x) * 0.04;
    scene.rotation.y += ((mx * 0.35) - scene.rotation.y) * 0.04;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  };
  const play = () => { if (!running && !document.hidden) { running = true; raf = requestAnimationFrame(loop); } };
  const pause = () => { running = false; cancelAnimationFrame(raf); };

  let inView = true;
  new IntersectionObserver(([e]) => { inView = e.isIntersecting; inView ? play() : pause(); }).observe(host);
  document.addEventListener('visibilitychange', () => (document.hidden ? pause() : inView && play()));

  renderer.render(scene, camera);
  const poster = host.querySelector('svg');
  if (poster) poster.style.transition = 'opacity 1s';
  requestAnimationFrame(() => { canvas.style.opacity = '1'; if (poster) poster.style.opacity = '0'; });
  play();
}
