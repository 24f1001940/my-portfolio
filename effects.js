(function initGlobalEffects() {
  const SHAPE_COUNT = 12;
  const CYCLE_MS = 3000; // each shape visible for ~3s

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function createShapes() {
    if (document.querySelector('.global-fx-container')) return;

    const container = document.createElement('div');
    container.className = 'global-fx-container';
    document.body.appendChild(container);
    document.body.classList.add('global-fx-reveal');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const colors = [
      'rgba(88, 101, 242, 0.9)',
      'rgba(45, 200, 255, 0.9)',
      'rgba(120, 90, 255, 0.9)',
      'rgba(0, 200, 150, 0.9)',
      'rgba(255, 140, 120, 0.9)'
    ];

    const shapes = [];
    for (let i = 0; i < SHAPE_COUNT; i++) {
      const el = document.createElement('div');
      el.className = 'fx-shape';

      // Position jitter so each shape appears in a slightly different spot
      const dx = randomBetween(-40, 40);
      const dy = randomBetween(-40, 40);
      const scale = randomBetween(0.8, 1.25);
      const rotation = randomBetween(-18, 18);

      el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${scale}) rotate(${rotation}deg)`;

      // Choose color and subtle opacity
      const color = colors[i % colors.length];
      el.style.background = `linear-gradient(135deg, ${color} 0%, rgba(255,255,255,0.08) 100%)`;
      el.style.opacity = String(randomBetween(0.04, 0.12));

      // vary border radius with each element for organic shapes
      const br1 = Math.floor(randomBetween(18, 60));
      const br2 = Math.floor(randomBetween(18, 60));
      const br3 = Math.floor(randomBetween(18, 60));
      const br4 = Math.floor(randomBetween(18, 60));
      el.style.borderRadius = `${br1}% ${br2}% ${br3}% ${br4}% / ${br4}% ${br3}% ${br2}% ${br1}%`;

      // attach
      container.appendChild(el);
      shapes.push(el);
    }

    // Cycle shapes one-by-one with fade transitions
    let index = 0;
    function showNext() {
      // clear all active classes
      shapes.forEach((s, i) => s.classList.remove('active'));
      // activate current
      shapes[index].classList.add('active');
      index = (index + 1) % shapes.length;
    }

    showNext();
    const interval = setInterval(showNext, CYCLE_MS);

    // subtle parallax on mouse move
    let raf = null;
    window.addEventListener('mousemove', (e) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cx = (e.clientX / window.innerWidth - 0.5) * 12;
        const cy = (e.clientY / window.innerHeight - 0.5) * 8;
        container.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      });
    });

    // cleanup on navigation (if SPA behavior is used)
    window.addEventListener('beforeunload', () => {
      clearInterval(interval);
      if (raf) cancelAnimationFrame(raf);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createShapes);
  } else {
    createShapes();
  }
})();
