// Yousaf Aluminium & Glass Works Lahore - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollAnimations();
  initCounters();
  initTestimonialCarousel();
  initSmoothScroll();
  setActiveNavLink();
});

// ── Mobile Menu Toggle ──
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    const icon = toggle.querySelector('svg');
    if (menu.classList.contains('open')) {
      toggle.setAttribute('aria-expanded', 'true');
    } else {
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Scroll Animations (Intersection Observer) ──
function initScrollAnimations() {
  const elements = document.querySelectorAll('.scroll-animate');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const animation = el.dataset.animation || 'animate-fadeInUp';
        el.classList.add('animated', animation);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ── Counter Animation ──
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.counter, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quad
    const eased = 1 - (1 - progress) * (1 - progress);
    const current = Math.floor(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// ── Testimonial Carousel ──
function initTestimonialCarousel() {
  const track = document.querySelector('.testimonial-track');
  if (!track) return;

  const slides = track.querySelectorAll('.testimonial-slide');
  if (slides.length <= 1) return;

  let current = 0;
  const total = slides.length;

  // Auto-play
  setInterval(() => {
    current = (current + 1) % total;
    track.style.transform = `translateX(-${current * 100}%)`;

    // Update dots
    updateDots(current);
  }, 5000);

  // Dots navigation
  const dotsContainer = document.querySelector('.testimonial-dots');
  if (dotsContainer) {
    dotsContainer.querySelectorAll('button').forEach((dot, i) => {
      dot.addEventListener('click', () => {
        current = i;
        track.style.transform = `translateX(-${current * 100}%)`;
        updateDots(current);
      });
    });
  }
}

function updateDots(current) {
  const dots = document.querySelectorAll('.testimonial-dots button');
  dots.forEach((dot, i) => {
    if (i === current) {
      dot.classList.add('bg-primary');
      dot.classList.remove('bg-gray-300');
    } else {
      dot.classList.remove('bg-primary');
      dot.classList.add('bg-gray-300');
    }
  });
}

// ── Smooth Scroll ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── Active Nav Link ──
function setActiveNavLink() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === filename || (filename === '' && href === 'index.html')) {
      link.classList.add('text-primary');
    }
  });
}

// ── Form Validation (Web3Forms handles submission) ──
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const inputs = form.querySelectorAll('[required]');
      let valid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.classList.add('border-red-500');
          e.preventDefault();
        } else {
          input.classList.remove('border-red-500');
        }
      });
    });
  });
}

// ── Newsletter Form ──
document.addEventListener('DOMContentLoaded', () => {
  // Forms now handled by Web3Forms POST - no JS override needed
});
