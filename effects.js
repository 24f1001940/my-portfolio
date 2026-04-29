(function initGlobalEffects() {
  function addGlobalEffects() {
    if (document.querySelector('.global-fx-orb')) {
      return;
    }

    const orb = document.createElement('div');
    orb.className = 'global-fx-orb';
    document.body.appendChild(orb);
    document.body.classList.add('global-fx-reveal');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let frameId = null;
    window.addEventListener('mousemove', (event) => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 22;
        const y = (event.clientY / window.innerHeight - 0.5) * 16;
        orb.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addGlobalEffects);
  } else {
    addGlobalEffects();
  }
})();
