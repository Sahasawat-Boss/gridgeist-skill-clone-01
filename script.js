const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(pointer: fine)');

/* Hero coordinate tracking ------------------------------------------------ */
const hero = document.querySelector('.hero');
const coordinate = document.querySelector('.coordinate');

const updateHeroAxes = (event) => {
  const bounds = hero.getBoundingClientRect();
  const x = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
  const y = Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100));
  hero.style.setProperty('--pointer-x', `${x}%`);
  hero.style.setProperty('--pointer-y', `${y}%`);
  if (coordinate) coordinate.textContent = `X ${Math.round(x).toString().padStart(2, '0')} / Y ${Math.round(y).toString().padStart(2, '0')}`;
};

const syncHeroTracking = () => {
  hero?.removeEventListener('pointermove', updateHeroAxes);
  if (!hero) return;
  if (!reducedMotion.matches && finePointer.matches) {
    hero.addEventListener('pointermove', updateHeroAxes);
    return;
  }
  hero.style.removeProperty('--pointer-x');
  hero.style.removeProperty('--pointer-y');
  if (coordinate) coordinate.textContent = 'X 00 / Y 00';
};

syncHeroTracking();
reducedMotion.addEventListener?.('change', syncHeroTracking);
finePointer.addEventListener?.('change', syncHeroTracking);

/* Live UTC clock ---------------------------------------------------------- */
const clock = document.querySelector('[data-clock]');
if (clock) {
  const tick = () => {
    const now = new Date();
    const hh = String(now.getUTCHours()).padStart(2, '0');
    const mm = String(now.getUTCMinutes()).padStart(2, '0');
    const ss = String(now.getUTCSeconds()).padStart(2, '0');
    clock.textContent = `${hh}:${mm}:${ss} UTC`;
  };
  tick();
  window.setInterval(tick, 1000);
}

/* Diagnostic before/after toggle ------------------------------------------ */
const demo = document.querySelector('.demo');
const viewButtons = document.querySelectorAll('[data-view]');

viewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const view = button.dataset.view;
    demo.dataset.state = view;
    viewButtons.forEach((candidate) => candidate.setAttribute('aria-pressed', String(candidate === button)));
    demo.querySelector('.demo-before').setAttribute('aria-hidden', String(view !== 'before'));
    demo.querySelector('.demo-after').setAttribute('aria-hidden', String(view !== 'after'));
    document.querySelector('.demo-status').textContent = view === 'after' ? 'SIGNAL' : 'NOISE';
  });
});

/* Reveal on scroll -------------------------------------------------------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));

/* Count-up for the evidence figure ---------------------------------------- */
const counter = document.querySelector('[data-count-to]');
if (counter) {
  const target = Number(counter.dataset.countTo) || 0;
  const format = (value) => value.toLocaleString('en-US');
  const settle = () => { counter.textContent = format(target); };

  if (reducedMotion.matches) {
    settle();
  } else {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        countObserver.unobserve(entry.target);
        counter.textContent = format(0);
        const duration = 1400;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = format(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(step);
          else settle();
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    countObserver.observe(counter);
  }
}

/* Copy-to-clipboard ------------------------------------------------------- */
document.querySelectorAll('[data-copy], [data-copy-target]').forEach((button) => {
  button.setAttribute('aria-live', 'polite');
  button.addEventListener('click', async () => {
    const target = button.dataset.copyTarget ? document.getElementById(button.dataset.copyTarget) : null;
    const text = target?.textContent.trim() || button.dataset.copy || '';
    const originalLabel = button.textContent;
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = button.dataset.copiedLabel || 'Copied';
      button.classList.add('copied');
      window.setTimeout(() => {
        button.textContent = originalLabel;
        button.classList.remove('copied');
      }, 1800);
    } catch {
      button.textContent = button.dataset.fallbackLabel || 'Select command';
    }
  });
});

/* Mobile menu dismissal --------------------------------------------------- */
document.querySelectorAll('.mobile-menu a').forEach((link) => {
  link.addEventListener('click', () => link.closest('details')?.removeAttribute('open'));
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('.mobile-menu[open]').forEach((menu) => {
    menu.removeAttribute('open');
    menu.querySelector('summary')?.focus();
  });
});
