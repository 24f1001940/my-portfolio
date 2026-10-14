/**
 * EFFECTS.JS — Multi-Mode Three.js 3D WebGL Engine & Interactive UI Physics
 * Works seamlessly with Mohd Saqib's Portfolio (index.html, app.js, chatbot.js)
 */

(function () {
  'use strict';

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. NEON SCROLL PROGRESS BAR
     ========================================================================== */
  function initScrollProgress() {
    let bar = document.getElementById('fx-scroll-progress');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'fx-scroll-progress';
      document.body.prepend(bar);
    }

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ==========================================================================
     2. DUAL-RING MAGNETIC CURSOR & CLICK SPARKS
     ========================================================================== */
  function initCursorAndSparks() {
    if ( prefersReducedMotion ) return;

    // Click Sparks (works on both desktop and mobile)
    const sparkColors = ['#6366f1', '#06b6d4', '#a855f7', '#10b981', '#38bdf8'];
    window.addEventListener('click', (e) => {
      for (let i = 0; i < 8; i++) {
        const spark = document.createElement('span');
        spark.className = 'fx-spark';
        const angle = (Math.PI * 2 * i) / 8 + (Math.random() - 0.5) * 0.4;
        const dist = 24 + Math.random() * 28;
        spark.style.left = `${e.clientX}px`;
        spark.style.top = `${e.clientY}px`;
        spark.style.background = sparkColors[i % sparkColors.length];
        spark.style.boxShadow = `0 0 8px ${sparkColors[i % sparkColors.length]}`;
        spark.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
        spark.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 650);
      }
    }, { passive: true });

    if (isTouchDevice) return;

    const dot = document.createElement('div');
    dot.className = 'fx-cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'fx-cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    }, { passive: true });

    window.addEventListener('mousedown', () => ring.classList.add('fx-cursor-click'));
    window.addEventListener('mouseup', () => ring.classList.remove('fx-cursor-click'));

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const interactiveSel = 'a, button, .btn, input, textarea, select, [role="button"], .project-card, .card, .course-card, .cert-card, .skill-card, .fx-3d-btn';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSel)) ring.classList.add('fx-cursor-hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSel)) ring.classList.remove('fx-cursor-hover');
    });
  }

  /* ==========================================================================
     3. 3D PERSPECTIVE TILT & GLARE FOR PORTFOLIO CARDS
     ========================================================================== */
  function init3DTiltCards() {
    if (isTouchDevice || prefersReducedMotion) return;

    const cardSelectors = [
      '.project-card',
      '.card',
      '.skill-card',
      '.skill-category',
      '.cert-card',
      '.certification-card',
      '.course-card',
      '.experience-card',
      '.timeline-content',
      '.stat-card',
      '.bento-item',
      '.glass-card',
      '.service-card',
      '[data-tilt]'
    ].join(', ');

    const bindCard = (card) => {
      if (card.dataset.fxTiltReady) return;
      card.dataset.fxTiltReady = 'true';
      card.classList.add('fx-tilt-card');

      let glare = card.querySelector('.fx-glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'fx-glare';
        card.appendChild(glare);
      }

      const maxTilt = parseFloat(card.dataset.maxTilt) || 9;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

        const px = (x / rect.width) * 100;
        const py = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255, 255, 255, 0.22) 0%, rgba(6, 182, 212, 0.08) 40%, transparent 70%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    };

    const scanAll = () => {
      document.querySelectorAll(cardSelectors).forEach(bindCard);
      // Also float hero avatar/image containers automatically
      document.querySelectorAll('.hero-image, .hero-avatar, .profile-img-wrapper, .hero-visual').forEach((el) => {
        el.classList.add('fx-float-3d');
      });
    };

    scanAll();
    const observer = new MutationObserver(scanAll);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  /* ==========================================================================
     4. MAGNETIC BUTTON PHYSICS
     ========================================================================== */
  function initMagneticButtons() {
    if (isTouchDevice || prefersReducedMotion) return;

    const btnSelectors = '.btn, .cta-btn, .hero-btn, .social-link, .social-icon, .nav-cta, [data-magnetic]';
    const bindMagnetic = (btn) => {
      if (btn.dataset.fxMagReady) return;
      btn.dataset.fxMagReady = 'true';
      btn.classList.add('fx-magnetic');

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${(x * 0.26).toFixed(1)}px, ${(y * 0.26).toFixed(1)}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    };

    document.querySelectorAll(btnSelectors).forEach(bindMagnetic);
  }

  /* ==========================================================================
     5. 3D SCROLL REVEAL OBSERVER
     ========================================================================== */
  function initScrollReveal3D() {
    if (prefersReducedMotion) return;

    const targets = document.querySelectorAll(
      'section > .container, .section-header, .section-title, .project-card, .skill-category, .cert-card, .course-card, .timeline-item, .stat-card'
    );

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fx-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    targets.forEach((el, idx) => {
      // If element is already above or inside the initial viewport, show immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add('fx-visible');
      } else {
        el.classList.add('fx-reveal');
        el.style.transitionDelay = `${(idx % 4) * 65}ms`;
        io.observe(el);
      }
    });
  }

  /* ==========================================================================
     6. MULTI-MODE THREE.JS 3D WEBGL ENGINE + LIVE HUD SWITCHER
     ========================================================================== */
  function initThreeJSEngine() {
    if (prefersReducedMotion) return;

    if (window.THREE) {
      setup3DWorld();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    script.onload = setup3DWorld;
    document.head.appendChild(script);
  }

  function setup3DWorld() {
    const THREE = window.THREE;
    if (!THREE) return;

    let canvas = document.getElementById('webgl-3d-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'webgl-3d-canvas';
      document.body.prepend(canvas);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Groups for 3 switchable 3D modes
    const coreModeGroup = new THREE.Group();
    const vortexModeGroup = new THREE.Group();
    const gridModeGroup = new THREE.Group();
    scene.add(coreModeGroup, vortexModeGroup, gridModeGroup);

    // --- MODE 1: CYBER CORE (Wireframe Icosahedron + Torus Rings + Starfield) ---
    const pCount = isTouchDevice ? 550 : 1300;
    const pPos = new Float32Array(pCount * 3);
    const pCol = new Float32Array(pCount * 3);
    const colors = [
      new THREE.Color('#6366f1'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#10b981')
    ];

    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 95;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 95;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 70;
      const c = colors[i % colors.length];
      pCol[i * 3] = c.r;
      pCol[i * 3 + 1] = c.g;
      pCol[i * 3 + 2] = c.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const starMesh = new THREE.Points(starGeo, starMat);
    coreModeGroup.add(starMesh);

    const polyGroup = new THREE.Group();
    const icoMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(7.2, 1),
      new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.17 })
    );
    const torusMesh = new THREE.Mesh(
      new THREE.TorusGeometry(11.2, 0.08, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.3 })
    );
    torusMesh.rotation.x = Math.PI / 3;
    const octaMesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(4.0, 0),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: 0.24 })
    );
    polyGroup.add(icoMesh, torusMesh, octaMesh);
    polyGroup.position.x = window.innerWidth > 992 ? 12 : 0;
    coreModeGroup.add(polyGroup);

    // --- MODE 2: QUANTUM VORTEX (3D Spiral Galaxy) ---
    const vCount = isTouchDevice ? 800 : 2000;
    const vPos = new Float32Array(vCount * 3);
    const vCol = new Float32Array(vCount * 3);
    for (let i = 0; i < vCount; i++) {
      const radius = Math.random() * 35;
      const spinAngle = radius * 0.45;
      const branchAngle = ((i % 3) / 3) * Math.PI * 2;
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 3;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 3;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 3;

      vPos[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      vPos[i * 3 + 1] = randomY * 2;
      vPos[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colors[0].clone().lerp(colors[1], radius / 35);
      vCol[i * 3] = mixedColor.r;
      vCol[i * 3 + 1] = mixedColor.g;
      vCol[i * 3 + 2] = mixedColor.b;
    }
    const vortexGeo = new THREE.BufferGeometry();
    vortexGeo.setAttribute('position', new THREE.BufferAttribute(vPos, 3));
    vortexGeo.setAttribute('color', new THREE.BufferAttribute(vCol, 3));
    const vortexMesh = new THREE.Points(
      vortexGeo,
      new THREE.PointsMaterial({ size: 0.2, vertexColors: true, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending })
    );
    vortexMesh.rotation.x = 0.65;
    vortexModeGroup.add(vortexMesh);

    // --- MODE 3: NEURAL WAVE GRID (Interactive 3D Terrain) ---
    const gridGeo = new THREE.PlaneGeometry(90, 60, 48, 32);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    gridMesh.rotation.x = -Math.PI / 2.6;
    gridMesh.position.y = -10;
    gridModeGroup.add(gridMesh);

    // --- MODE SWITCHER HUD ---
    let currentMode = localStorage.getItem('saqib_3d_mode') || 'core';

    function applyMode(mode) {
      currentMode = mode;
      localStorage.setItem('saqib_3d_mode', mode);
      coreModeGroup.visible = mode === 'core';
      vortexModeGroup.visible = mode === 'vortex';
      gridModeGroup.visible = mode === 'grid';
      canvas.style.opacity = mode === 'off' ? '0' : '0.88';

      document.querySelectorAll('.fx-3d-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
      });
    }

    const hud = document.createElement('div');
    hud.className = 'fx-3d-hud';
    hud.innerHTML = `
      <span class="fx-3d-hud-label">3D Scene</span>
      <button type="button" class="fx-3d-btn" data-mode="core">Cyber Core</button>
      <button type="button" class="fx-3d-btn" data-mode="vortex">Galaxy</button>
      <button type="button" class="fx-3d-btn" data-mode="grid">Wave Grid</button>
      <button type="button" class="fx-3d-btn" data-mode="off">Off</button>
    `;
    document.body.appendChild(hud);

    hud.addEventListener('click', (e) => {
      const btn = e.target.closest('.fx-3d-btn');
      if (btn && btn.dataset.mode) {
        applyMode(btn.dataset.mode);
      }
    });

    applyMode(currentMode);

    // --- MOUSE & SCROLL TRACKING ---
    let targetX = 0;
    let targetY = 0;
    let scrollY = window.scrollY;

    window.addEventListener('mousemove', (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
    }, { passive: true });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      polyGroup.position.x = window.innerWidth > 992 ? 12 : 0;
    });

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();
    const gridPosAttr = gridGeo.attributes.position;

    function animate() {
      requestAnimationFrame(animate);
      if (currentMode === 'off') return;

      const t = clock.getElapsedTime();

      if (currentMode === 'core') {
        icoMesh.rotation.y = t * 0.18;
        icoMesh.rotation.x = t * 0.1;
        torusMesh.rotation.z = -t * 0.24;
        octaMesh.rotation.y = -t * 0.35;
        polyGroup.position.y = Math.sin(t * 0.8) * 1.2 - scrollY * 0.006;
        polyGroup.rotation.y += (targetX * 0.6 - polyGroup.rotation.y) * 0.05;
        polyGroup.rotation.x += (targetY * 0.6 - polyGroup.rotation.x) * 0.05;

        starMesh.rotation.y = t * 0.025 + targetX * 0.1;
        starMesh.rotation.x = -scrollY * 0.0003 + targetY * 0.1;
      } else if (currentMode === 'vortex') {
        vortexMesh.rotation.y = t * 0.08 + scrollY * 0.0005;
        vortexModeGroup.rotation.y += (targetX * 0.35 - vortexModeGroup.rotation.y) * 0.05;
        vortexModeGroup.rotation.x += (targetY * 0.35 - vortexModeGroup.rotation.x) * 0.05;
      } else if (currentMode === 'grid') {
        for (let i = 0; i < gridPosAttr.count; i++) {
          const gx = gridPosAttr.getX(i);
          const gy = gridPosAttr.getY(i);
          const wave = Math.sin(gx * 0.18 + t * 1.6) * 1.4 + Math.cos(gy * 0.18 + t * 1.2) * 1.4;
          gridPosAttr.setZ(i, wave);
        }
        gridPosAttr.needsUpdate = true;
        gridMesh.rotation.z = targetX * 0.15;
      }

      renderer.render(scene, camera);
    }

    animate();
  }

  /* ==========================================================================
     BOOT ALL EFFECTS
     ========================================================================== */
  function boot() {
    initScrollProgress();
    initCursorAndSparks();
    init3DTiltCards();
    initMagneticButtons();
    initScrollReveal3D();
    initThreeJSEngine();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();