/* ============================================
   FINTRACK — main.js
   ============================================ */

// ---------- HEADER SCROLL ----------
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---------- HAMBURGER MENU ----------
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
});
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
  });
});

// ---------- SIMULADOR DE CRÉDITO ----------
const montoSlider  = document.getElementById('montoSlider');
const scoreSlider  = document.getElementById('scoreSlider');
const montoDisplay = document.getElementById('montoDisplay');
const mesesDisplay = document.getElementById('mesesDisplay');
const scoreDisplay = document.getElementById('scoreDisplay');
const cuotaResult  = document.getElementById('cuotaResult');
const tnaDisplay   = document.getElementById('tnaDisplay');
const teaDisplay   = document.getElementById('teaDisplay');
const totalDisplay = document.getElementById('totalDisplay');
const mesBtns      = document.querySelectorAll('.sim-mes-btn');

let mesesSeleccionados = 12;

// Tasa base BCRA de referencia (TNA) — actualizar mensualmente
const TASA_BASE_TNA = 0.42; // 42% TNA base
const SCORE_DESCUENTO_MAX = 0.08; // hasta 8 puntos menos con score 10

function calcularTNA(score) {
  const descuento = ((score - 1) / 9) * SCORE_DESCUENTO_MAX;
  return Math.max(TASA_BASE_TNA - descuento, 0.28);
}

function calcularInteresAdicional(meses) {
  // +3.5% cada 12 meses (acumulativo)
  const periodos = Math.floor(meses / 12);
  return periodos * 0.035;
}

function formatARS(val) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
}

function actualizarSimulador() {
  const monto = parseInt(montoSlider.value);
  const score = parseFloat(scoreSlider.value);
  const meses = mesesSeleccionados;

  const tnaSinAjuste = calcularTNA(score);
  const adicional    = calcularInteresAdicional(meses);
  const tnaFinal     = tnaSinAjuste + adicional;
  const tea          = Math.pow(1 + tnaFinal / 12, 12) - 1;
  const tasaMensual  = tnaFinal / 12;

  // Cuota sistema francés
  const cuota = monto * (tasaMensual * Math.pow(1 + tasaMensual, meses)) /
                        (Math.pow(1 + tasaMensual, meses) - 1);
  const totalPagado = cuota * meses;

  montoDisplay.textContent = formatARS(monto);
  mesesDisplay.textContent = `${meses} meses`;
  scoreDisplay.textContent = `${score.toFixed(1)} / 10`;
  cuotaResult.textContent  = formatARS(cuota);
  tnaDisplay.textContent   = `${(tnaFinal * 100).toFixed(1)}%`;
  teaDisplay.textContent   = `${(tea * 100).toFixed(1)}%`;
  totalDisplay.textContent = formatARS(totalPagado);
}

montoSlider.addEventListener('input', actualizarSimulador);
scoreSlider.addEventListener('input', actualizarSimulador);

mesBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    mesBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    mesesSeleccionados = parseInt(btn.dataset.meses);
    actualizarSimulador();
  });
});

actualizarSimulador();

// ---------- ROTADOR DE PALABRAS ----------
const rotator = document.getElementById('rotator');
const palabras = ['pymes', 'empresas', 'emprendimientos', 'negocios'];
let idx = 0;

function rotar() {
  rotator.style.opacity = '0';
  setTimeout(() => {
    idx = (idx + 1) % palabras.length;
    rotator.textContent = palabras[idx];
    rotator.style.opacity = '1';
  }, 300);
}

setInterval(rotar, 2200);

// ---------- FAQ ACORDEÓN ----------
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    // Cerrar todos
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      i.querySelector('.faq-answer').style.maxHeight = null;
    });

    // Abrir si estaba cerrado
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ---------- FORMULARIO CONTACTO ----------
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Enviando…';
  btn.disabled = true;

  // Simular envío (reemplazar por fetch a tu endpoint)
  setTimeout(() => {
    form.reset();
    formSuccess.style.display = 'block';
    btn.textContent = 'Enviar mensaje';
    btn.disabled = false;
    setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
  }, 1200);
});

// ---------- SCROLL REVEAL ----------
const revealTargets = document.querySelectorAll(
  '.review-card, .valor__card, .pf-card, .faq-item'
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.06}s, transform 0.55s ease ${i * 0.06}s`;
  revealObserver.observe(el);
});
