/* ============================================================
   script.js — Wedding Invitation
   Ashfaqu MA & Fathima Sahva · 06 February 2027
   ============================================================ */

/* ── Scroll Fade-In (Intersection Observer) ── */
(function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          /* unobserve after first reveal for performance */
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-up').forEach((el) => {
    /* Hero elements fire immediately on load */
    if (el.closest('.hero')) return;
    observer.observe(el);
  });

  /* Trigger hero animations on page load */
  document.querySelectorAll('.hero .fade-up').forEach((el) => {
    /* stagger already baked in via CSS transition-delay */
    requestAnimationFrame(() => {
      setTimeout(() => el.classList.add('visible'), 80);
    });
  });
})();


/* ── Countdown Timer ── */
(function initCountdown() {
  /* Target: 06 Feb 2027, 12:00 PM IST (UTC+5:30) */
  const TARGET = new Date('2027-02-06T12:00:00+05:30').getTime();

  const $days    = document.getElementById('cd-days');
  const $hours   = document.getElementById('cd-hours');
  const $minutes = document.getElementById('cd-minutes');
  const $seconds = document.getElementById('cd-seconds');

  if (!$days) return;

  function pad(n, width) {
    return String(n).padStart(width, '0');
  }

  function tick() {
    const diff = TARGET - Date.now();

    if (diff <= 0) {
      [$days, $hours, $minutes, $seconds].forEach((el) => (el.textContent = '00'));
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    /* Only update DOM if value changed (avoid layout thrash) */
    const dStr = pad(d, d >= 100 ? 3 : 2);
    const hStr = pad(h, 2);
    const mStr = pad(m, 2);
    const sStr = pad(s, 2);

    if ($days.textContent    !== dStr) $days.textContent    = dStr;
    if ($hours.textContent   !== hStr) $hours.textContent   = hStr;
    if ($minutes.textContent !== mStr) $minutes.textContent = mStr;
    if ($seconds.textContent !== sStr) $seconds.textContent = sStr;
  }

  tick();
  setInterval(tick, 1000);
})();


/* ── Smooth Anchor Scrolling (fallback for older browsers) ── */
(function initSmoothScroll() {
  if ('scrollBehavior' in document.documentElement.style) return; /* native support */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
