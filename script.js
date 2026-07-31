const c = document.getElementById('cur');
const r = document.getElementById('ring');
const orb = document.getElementById('orb');
const orb2 = document.getElementById('orb2');

let mx = 0, my = 0, rx = 0, ry = 0, ox = 0, oy = 0, o2x = 0, o2y = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  c.style.left = (mx - 4) + 'px';
  c.style.top = (my - 4) + 'px';
});

function anim() {
  rx += (mx - rx) * 0.08;
  ry += (my - ry) * 0.08;
  r.style.left = (rx - 22) + 'px';
  r.style.top = (ry - 22) + 'px';

  ox += (mx - ox) * 0.015;
  oy += (my - oy) * 0.015;
  orb.style.left = (ox - 250) + 'px';
  orb.style.top = (oy + window.scrollY * 0.25 - 250) + 'px';

  o2x += (mx - o2x) * 0.01;
  o2y += (my - o2y) * 0.01;
  orb2.style.left = (o2x - 175) + 'px';
  orb2.style.top = (o2y + window.scrollY * 0.18 - 175) + 'px';

  requestAnimationFrame(anim);
}
anim();

document.querySelectorAll('a, .btn, .s-pill, .edu-card, .mis-link-btn, .proj, .life-block, .life-img, .contact-item, .mis-team-img, .mis-app-img, .hero-photo').forEach(el => {
  el.addEventListener('mouseenter', () => r.classList.add('h'));
  el.addEventListener('mouseleave', () => r.classList.remove('h'));
});

document.querySelectorAll('.proj, .life-block, .edu-card').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
    el.style.setProperty('--my', (e.clientY - rect.top) + 'px');
  });
});

document.querySelectorAll('.proj-media').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
    el.style.setProperty('--my', (e.clientY - rect.top) + 'px');
  });
});

document.querySelectorAll('[data-tilt]').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `perspective(900px) rotateY(${cx * 0.01}deg) rotateX(${-cy * 0.01}deg) translateY(-6px) scale(1.01)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
});

document.querySelectorAll('.s-pill').forEach(pill => {
  pill.addEventListener('mousemove', e => {
    const rect = pill.getBoundingClientRect();
    pill.style.setProperty('--px', (e.clientX - rect.left) + 'px');
    pill.style.setProperty('--py', (e.clientY - rect.top) + 'px');
  });
});

document.querySelectorAll('.edu-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
  });
});

const prog = document.getElementById('prog');
const nav = document.getElementById('nav');
let ls = 0;

window.addEventListener('scroll', () => {
  const s = window.scrollY;
  const m = document.documentElement.scrollHeight - window.innerHeight;
  prog.style.width = (s / m * 100) + '%';
  if (s > ls && s > 80) {
    nav.classList.add('hide');
  } else {
    nav.classList.remove('hide');
  }
  ls = s;
});

const ob = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('active');
  });
}, { threshold: 0.04, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => ob.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    const t = document.querySelector(this.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});
