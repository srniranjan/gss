(function () {
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const hero = document.querySelector('.hero');
  if (hero) {
    new IntersectionObserver(([entry]) => {
      header.classList.toggle('over-hero', entry.isIntersecting);
    }, { rootMargin: '-80px 0px 0px 0px', threshold: 0.35 }).observe(hero);
  }

  const toggle = document.querySelector('.menu-toggle');
  const setMenu = (open) => {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setMenu(!header.classList.contains('nav-open')));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  document
    .querySelectorAll('main.page .officer, main.page .member, main.page .activity, main.page .objectives li, main.page .table-wrap')
    .forEach((el) => el.classList.add('reveal'));

  document.querySelectorAll('.copy').forEach((button) => {
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(button.dataset.copy).then(() => {
        button.textContent = 'Copied';
        setTimeout(() => { button.textContent = 'Copy'; }, 2000);
      });
    });
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function countUp(el) {
    const target = Number(el.dataset.count);
    const from = Number(el.dataset.from || 0);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) {
      el.textContent = prefix + target + suffix;
      return;
    }
    const start = performance.now();
    const duration = 1400;
    (function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.round(from + (target - from) * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    })(start);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      entry.target.querySelectorAll('[data-count]').forEach(countUp);
      setTimeout(() => entry.target.classList.remove('reveal', 'in'), 1300);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();
