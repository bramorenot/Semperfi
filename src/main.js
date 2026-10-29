// Punto de entrada compartido por todas las páginas.
import './styles/main.css';
import './components/AppHeader.js';
import './components/AppFooter.js';
import { initMotion } from './js/motion.js';

document.documentElement.classList.remove('no-js');
initMotion();
