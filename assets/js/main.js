/* =================================================================
   THABISO MAKHOBO — DEVELOPER PORTFOLIO
   Modular vanilla JS: each feature is self-contained and initialised
   from the bottom of the file once the DOM is ready.
================================================================= */

'use strict';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* -----------------------------------------------------------------
   Mobile navigation drawer
----------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (!toggle || !sidebar || !overlay) return;

  const closeDrawer = () => {
    sidebar.dataset.state = 'closed';
    overlay.classList.remove('is-visible');
    toggle.setAttribute('aria-expanded', 'false');
  };

  const openDrawer = () => {
    sidebar.dataset.state = 'open';
    overlay.classList.add('is-visible');
    toggle.setAttribute('aria-expanded', 'true');
  };

  toggle.addEventListener('click', () => {
    const isOpen = sidebar.dataset.state === 'open';
    isOpen ? closeDrawer() : openDrawer();
  });

  overlay.addEventListener('click', closeDrawer);

  sidebar.querySelectorAll('.nav-link, .sidebar__card a').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
}

/* -----------------------------------------------------------------
   Scrollspy: highlight the active sidebar nav link
----------------------------------------------------------------- */
function initScrollSpy() {
  const links = document.querySelectorAll('.nav-link');
  if (!links.length) return;

  const sections = Array.from(links)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* -----------------------------------------------------------------
   Scroll reveal: fade/slide elements into view once
----------------------------------------------------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (prefersReducedMotion) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  targets.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 0.08}s`;
    observer.observe(el);
  });
}

/* -----------------------------------------------------------------
   Animated stat counters (hero section)
----------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix || '';

    if (prefersReducedMotion) {
      el.textContent = target + suffix;
      return;
    }

    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* -----------------------------------------------------------------
   Skill / learning progress bars
----------------------------------------------------------------- */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bars__fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.width = `${el.dataset.width}%`;
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

/* -----------------------------------------------------------------
   Hero terminal card: typewriter effect
----------------------------------------------------------------- */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const snippet = `const developer = {
  name: "Thabiso Makhobo",
  role: "Backend Developer",
  stack: ["C#", "SQL", "ASP.NET"],
  status: "available"
};`;

  if (prefersReducedMotion) {
    el.textContent = snippet;
    return;
  }

  let i = 0;
  const speed = 28;

  const type = () => {
    if (i <= snippet.length) {
      el.textContent = snippet.slice(0, i);
      i += 1;
      setTimeout(type, speed);
    }
  };
  type();
}

/* -----------------------------------------------------------------
   Ambient hero particles (lightweight canvas)
----------------------------------------------------------------- */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container || prefersReducedMotion) return;

  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let width, height, particles;

  const palette = ['rgba(37,99,235,0.6)', 'rgba(56,189,248,0.6)', 'rgba(125,211,252,0.5)'];

  function resize() {
    width = canvas.width = container.offsetWidth;
    height = canvas.height = container.offsetHeight;
  }

  function createParticles() {
    const count = Math.min(Math.floor((width * height) / 24000), 70);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      color: palette[Math.floor(Math.random() * palette.length)],
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }

  resize();
  createParticles();
  tick();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      createParticles();
    }, 200);
  });
}

/* -----------------------------------------------------------------
   Contact form: client-side validation + mailto handoff
   (No backend is available, so we compose a pre-filled email.)
----------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.style.color = '#f87171';
      status.textContent = 'Please fill in every field before sending.';
      return;
    }

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:shaunmakhobo@gmail.com?subject=${subject}&body=${body}`;

    status.style.color = '#8ef0b5';
    status.textContent = 'Opening your email client…';
    form.reset();
  });
}

/* -----------------------------------------------------------------
   Back-to-top button
----------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 600);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}

/* -----------------------------------------------------------------
   Footer year
----------------------------------------------------------------- */
function initFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* -----------------------------------------------------------------
   Bootstrap
----------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollSpy();
  initScrollReveal();
  initCounters();
  initSkillBars();
  initTypewriter();
  initParticles();
  initContactForm();
  initBackToTop();
  initFooterYear();
});
