/* ================================================================
   script.js – Portfolio Marcus Schmidt
   ================================================================
   Enthält:
   1. Theme Toggle (Dark / Light Mode)
   2. Typing-Effekt im Hero
   3. Scroll Fade-In Animation
================================================================ */


/* ─── 1. THEME TOGGLE ────────────────────────────────────────── */
function toggleTheme() {
  const html    = document.documentElement;
  const isDark  = html.getAttribute('data-theme') === 'dark';

  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('theme-icon').textContent  = isDark ? '🌙' : '☀️';
  document.getElementById('theme-label').textContent = isDark ? 'Dark' : 'Light';
}


/* ─── 2. TYPING-EFFEKT ───────────────────────────────────────── */
/*
  Möchtest du die Texte ändern?
  Einfach die Einträge im Array unten anpassen.
  Jeder String wird nacheinander getippt und wieder gelöscht.
*/
const phrases = [
  'C# · .NET · Desktop-Entwicklung',
  'Rust · C++ · Hardwarenahe Programmierung',
  'Flutter + Rust Bridge · Cross-Platform',
  'Gerätetreiber & Systementwicklung',
  'Fachinformatiker Anwendungsentwicklung ✓'
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;

const typedEl = document.getElementById('typed-text');

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 40 : 65;

  if (!isDeleting && charIndex === current.length) {
    // Phrase vollständig – kurz warten, dann löschen
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Phrase gelöscht – zur nächsten wechseln
    isDeleting  = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay       = 300;
  }

  setTimeout(type, delay);
}

// Starten sobald die Seite geladen ist
document.addEventListener('DOMContentLoaded', type);


/* ─── 4. PROJEKT-SCREENSHOT SLIDER ──────────────────────────── */
/*
  Wird verwendet wenn eine Projektkarte mehrere Screenshots hat.
  Aufruf über onclick="setSlide(this, index)" auf den Dot-Elementen.
*/
function setSlide(dotEl, index) {
  // Elternelement der Dots finden
  const dotsWrap = dotEl.parentElement;
  const card     = dotsWrap.closest('.project-screenshot-wrap');
  const slides   = card.querySelectorAll('.slide');
  const dots     = dotsWrap.querySelectorAll('.dot');

  slides.forEach((s, i) => s.classList.toggle('active', i === index));
  dots.forEach((d, i)   => d.classList.toggle('active', i === index));
}

/* Automatischer Wechsel alle 3 Sekunden pro Slider */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-screenshot-wrap').forEach(wrap => {
    const slides = wrap.querySelectorAll('.slide');
    const dots   = wrap.querySelectorAll('.dot');
    if (slides.length <= 1) return; // kein Auto-Slide bei Einzelbild

    let current = 0;
    setInterval(() => {
      current = (current + 1) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('active', i === current));
      dots.forEach((d, i)   => d.classList.toggle('active', i === current));
    }, 3000);
  });
});
/*
  Alle Elemente mit der Klasse "fade-in" werden beim Scrollen
  sichtbar eingeblendet, sobald sie in den Viewport kommen.
*/
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target); // nur einmal animieren
    }
  });
}, { threshold: 0.12 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
});
