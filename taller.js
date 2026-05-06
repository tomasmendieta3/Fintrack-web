/* ============================================
   FINTRACK TALLER — taller.js
   ============================================ */

// ---------- HEADER SCROLL ----------
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---------- HAMBURGER ----------
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

// ---------- SCROLL REVEAL ----------
const revealEls = document.querySelectorAll(
  '.encuentro-card, .instructora-card, .ph-item, .vb-item, .resena-card, .vi-stat'
);
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.05}s`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ---------- VIDEO PLACEHOLDER ----------
const videoBox = document.querySelector('.porque__video-box');
if (videoBox) {
  videoBox.addEventListener('click', () => {
    // Reemplazar con el embed real de YouTube/Vimeo cuando esté disponible
    videoBox.innerHTML = `
      <iframe
        style="width:100%;height:100%;border:none;border-radius:24px;"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        allow="autoplay; fullscreen"
        allowfullscreen
      ></iframe>
    `;
  });
}

// ---------- FORMULARIO ----------
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando…';
    btn.disabled = true;
    setTimeout(() => {
      form.reset();
      formSuccess.style.display = 'block';
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Quiero coordinar una llamada`;
      btn.disabled = false;
      setTimeout(() => { formSuccess.style.display = 'none'; }, 6000);
    }, 1200);
  });
}

// ---------- HOVER EN ENCUENTRO CARDS ----------
document.querySelectorAll('.encuentro-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const num = card.querySelector('.encuentro-num');
    num.style.transform = 'scale(1.1)';
    num.style.transition = 'transform 0.3s ease';
  });
  card.addEventListener('mouseleave', () => {
    const num = card.querySelector('.encuentro-num');
    num.style.transform = 'scale(1)';
  });
});
