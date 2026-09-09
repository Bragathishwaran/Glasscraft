/* ============================================
   Glass & Aluminum Fabrication - Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  initTheme();
  initLang();
  initNavbar();
  initSmoothScroll();
  initBackToTop();
  initScrollReveal();
  initHeroParallax();
  initProductFilter();
  setActiveNavLink();
});

/* --- Sticky Navbar --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;

  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  /* Close mobile menu on link click */
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* --- Back to Top --- */
function initBackToTop() {
  var btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- Hero Parallax (Home 1) --- */
function initHeroParallax() {
  var hero = document.querySelector('.hero-section');
  var bg = hero && hero.querySelector('.hero-bg');
  if (!hero || !bg) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var ticking = false;

  function update() {
    var y = window.scrollY;
    if (y > window.innerHeight) {
      ticking = false;
      return;
    }
    bg.style.backgroundPosition = 'center calc(50% + ' + (y * 0.35) + 'px)';
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* --- Scroll Reveal --- */
function initScrollReveal() {
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  function checkReveal() {
    var windowHeight = window.innerHeight;

    reveals.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      if (top < windowHeight - 80) {
        el.classList.add('revealed');
      }
    });
  }

  window.addEventListener('scroll', checkReveal);
  checkReveal();
}

/* --- Product Filtering --- */
function initProductFilter() {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var productCards = document.querySelectorAll('.product-filter-item');

  if (!filterBtns.length || !productCards.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      applyFilter(this.getAttribute('data-filter'));
    });
  });

  /* Auto-select filter from URL hash (#windows, #doors, etc.) */
  var hash = window.location.hash.replace('#', '').trim();
  if (hash) {
    var matchBtn = Array.from(filterBtns).find(function (b) { return b.getAttribute('data-filter') === hash; });
    if (matchBtn) {
      setTimeout(function () {
        applyFilter(hash);
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        matchBtn.classList.add('active');
        document.querySelector('.filter-buttons').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  function applyFilter(filter) {
    productCards.forEach(function (card) {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(function () {
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(function () {
          card.style.display = 'none';
        }, 400);
      }
    });
  }
}

/* --- Active Nav Link --- */
function setActiveNavLink() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --- Theme (Dark / Light) Toggle --- */
function initTheme() {
  var html = document.documentElement;
  var savedTheme = localStorage.getItem('gcp-theme') || 'light';
  applyTheme(savedTheme);

  var themeBtn = document.querySelector('[data-theme-toggle]');
  if (themeBtn) {
    themeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var current = html.classList.contains('dark-mode') ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('gcp-theme', next);
    });
  }
}

function applyTheme(theme) {
  var html = document.documentElement;
  if (theme === 'dark') {
    html.classList.add('dark-mode');
  } else {
    html.classList.remove('dark-mode');
  }
  updateThemeLabel();
}

function updateThemeLabel() {
  var label = document.querySelector('[data-theme-label]');
  var icon = document.querySelector('[data-theme-icon]');
  var isDark = document.documentElement.classList.contains('dark-mode');
  if (label) label.textContent = isDark ? 'Light' : 'Dark';
  if (icon) icon.className = 'bi ' + (isDark ? 'bi-sun' : 'bi-moon-stars');
  updateLangLabel();
}

/* --- Language (RTL / LTR) Toggle --- */
function initLang() {
  var savedLang = localStorage.getItem('gcp-lang') || 'ltr';
  applyLang(savedLang);

  var langBtn = document.querySelector('[data-lang-toggle]');
  if (langBtn) {
    langBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var current = document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
      var next = current === 'rtl' ? 'ltr' : 'rtl';
      applyLang(next);
      localStorage.setItem('gcp-lang', next);
    });
  }
}

function applyLang(lang) {
  var html = document.documentElement;
  if (lang === 'rtl') {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
  } else {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
  }
  updateLangLabel();
}

function updateLangLabel() {
  var label = document.querySelector('[data-lang-label]');
  var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  if (label) label.textContent = isRTL ? 'LTR' : 'RTL';
}
