// ==========================================================
// DYCINE PHARMA — interactions & animations  (v3)
// ==========================================================

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

// ----------------------------------------------------------
// 1) Side nav: highlight active section + smooth scroll
// ----------------------------------------------------------
const navLinks = $$('.sidenav a');
const sections = $$('section[id]');

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  const isDark = theme === 'dark';
  const nav = document.querySelector('.sidenav');
  if (nav) nav.style.color = isDark ? '#FAFAFA' : '#03045E';
}

function updateActiveNav() {
  const y = window.scrollY + window.innerHeight * 0.4;
  let active = sections[0];
  for (const s of sections) {
    if (s.offsetTop <= y) active = s;
  }
  navLinks.forEach(a => a.classList.toggle('is-active', a.dataset.target === active.id));
  // Toggle top-nav transparent style when in hero
  const topNav = document.querySelector('.top-nav');
  if (topNav) {
    topNav.classList.toggle('is-hero', active.id === 'hero');
  }
  // Toggle logo card between white (hero) and colored (other sections)
  const logoCard = document.querySelector('.logo-card');
  if (logoCard) {
    logoCard.classList.toggle('is-hero', active.id === 'hero');
  }
  const theme = active.dataset.theme || 'light';
  setTheme(theme);
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
navLinks.forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  const t = document.getElementById(a.dataset.target);
  if (t) window.scrollTo({ top: t.offsetTop, behavior: 'smooth' });
}));

// Top nav: hamburger toggle + Sign In dropdown
$('.nav-burger')?.addEventListener('click', e => {
  e.stopPropagation();
  $('.top-nav')?.classList.toggle('is-open');
});
$('.nav-dropdown-trigger')?.addEventListener('click', e => {
  e.stopPropagation();
  e.preventDefault();
  $('.nav-dropdown')?.classList.toggle('is-open');
});
document.addEventListener('click', e => {
  const nav = $('.top-nav');
  if (nav && !nav.contains(e.target)) nav.classList.remove('is-open');
  const dd = $('.nav-dropdown');
  if (dd && !dd.contains(e.target)) dd.classList.remove('is-open');
});

// ----------------------------------------------------------
// 2) Hero rotating phrase — ghost-sizer approach
// ----------------------------------------------------------
const ROTATOR_WORDS = ['save lives', 'improve health', 'make cures'];

function initRotator() {
  const r = document.querySelector('.rotator');
  if (!r) return;

  // Ghost sizer — invisible but occupies space, sets rotator width + height
  const widest = ROTATOR_WORDS.reduce((a, b) => a.length > b.length ? a : b);
  const ghost = document.createElement('span');
  ghost.textContent = widest;
  ghost.className = 'rotator-ghost';
  ghost.setAttribute('aria-hidden', 'true');
  r.appendChild(ghost);

  // Animated word spans
  const spans = ROTATOR_WORDS.map(w => {
    const s = document.createElement('span');
    s.textContent = w;
    r.appendChild(s);
    return s;
  });

  let idx = 0;
  let prev = -1;

  function render() {
    spans.forEach((s, k) => {
      if (k === idx) {
        s.style.transition = 'transform 0.9s cubic-bezier(.2,.7,.2,1), opacity 0.6s';
        s.style.transform = 'translateY(0)';
        s.style.opacity = '1';
      } else if (k === prev) {
        s.style.transition = 'transform 0.9s cubic-bezier(.2,.7,.2,1), opacity 0.6s';
        s.style.transform = 'translateY(-120%)';
        s.style.opacity = '0';
      } else {
        s.style.transition = 'none';
        s.style.transform = 'translateY(120%)';
        s.style.opacity = '0';
      }
    });
  }
  render();
  setInterval(() => {
    prev = idx;
    idx = (idx + 1) % spans.length;
    render();
  }, 2600);
}

// ----------------------------------------------------------
// 3) GSAP scroll-triggered animations + parallax
// ----------------------------------------------------------
window.addEventListener('load', () => {
  initRotator();

  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);

  // ---- Utility: split text into chars for animation ----
  // Groups chars into word-level wrappers to prevent mid-word line breaks
  function splitChars(selector) {
    const els = document.querySelectorAll(selector);
    els.forEach(el => {
      if (el.dataset.split) return;
      const frag = document.createDocumentFragment();

      function wrapWords(text, parent) {
        const tokens = text.split(/(\s+)/);
        tokens.forEach(token => {
          if (/^\s*$/.test(token)) {
            if (token) parent.appendChild(document.createTextNode(token));
          } else {
            const w = document.createElement('span');
            w.className = 'word';
            w.style.whiteSpace = 'nowrap';
            token.split('').forEach(c => {
              const s = document.createElement('span');
              s.className = 'char';
              s.style.display = 'inline-block';
              s.textContent = c;
              w.appendChild(s);
            });
            parent.appendChild(w);
          }
        });
      }

      el.childNodes.forEach(node => {
        if (node.nodeType === 3) {
          wrapWords(node.textContent, frag);
        } else if (node.nodeType === 1) {
          const clone = node.cloneNode(false);
          node.childNodes.forEach(child => {
            if (child.nodeType === 3) {
              wrapWords(child.textContent, clone);
            } else {
              clone.appendChild(child.cloneNode(true));
            }
          });
          frag.appendChild(clone);
        }
      });
      el.innerHTML = '';
      el.appendChild(frag);
      el.dataset.split = '1';
    });
  }

  // ========== TOP NAV ==========
  gsap.from('.top-nav', { y: -24, opacity: 0, duration: 1, delay: 0.2, ease: 'expo.out' });

  // ========== HERO ==========
  const heroTL = gsap.timeline({ defaults: { ease: 'expo.out' } });
  heroTL
    .from('.hero h1.display', { y: 100, opacity: 0, duration: 1.6 }, 0.1)
    .from('.hero-eyebrow-row > *', { y: 20, opacity: 0, duration: 1, stagger: 0.12 }, 0)
    .from('.hero-bottom .lede', { y: 30, opacity: 0, duration: 1.1 }, 0.45)
    .from('.hero-bottom .cta-row > *', { y: 24, opacity: 0, duration: 1, stagger: 0.12 }, 0.6)
    .from('.hero-stats .s', { y: 60, opacity: 0, duration: 1.4, stagger: 0.25 }, 0.95)
    .from('.hero-video-wrap', { scale: 0.75, opacity: 0, duration: 1.8, ease: 'power3.out' }, 0)
    .from('.hero-meta-strip', { y: 20, opacity: 0, duration: 0.9 }, 1)
    .add(() => {
      document.querySelectorAll('.hero-stats .num').forEach(el => {
        const text = el.textContent.trim();
        const m = text.match(/^(\d+)/);
        if (!m) return;
        const target = parseInt(m[1]);
        const suffix = text.replace(/^\d+/, '');
        el.textContent = '0' + suffix;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 2.2, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; }
        });
      });
    }, 1.15);

  // Hero parallax layers
  gsap.to('.hero-video-wrap', {
    yPercent: 12,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
  });
  gsap.to('.hero-inner', {
    yPercent: -6,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
  });
  gsap.to('.hero-meta-strip', {
    yPercent: 30,
    opacity: 0,
    scrollTrigger: { trigger: '.hero', start: '60% top', end: 'bottom top', scrub: 1 },
  });

  // ========== ABOUT ==========
  // Heading char-by-char reveal
  splitChars('.about h2');
  gsap.from('.about h2 .char', {
    y: 40, opacity: 0, rotateX: -40,
    duration: 0.7, stagger: 0.018, ease: 'back.out(1.4)',
    scrollTrigger: { trigger: '.about h2', start: 'top 82%' }
  });
  gsap.from('.about .eyebrow', {
    x: -40, opacity: 0, duration: 0.9, ease: 'expo.out',
    scrollTrigger: { trigger: '.about .eyebrow', start: 'top 88%' }
  });
  gsap.from('.about p.lede', {
    y: 36, opacity: 0, duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: '.about p.lede', start: 'top 88%' }
  });
  // Globe entrance + parallax
  gsap.from('.globe-wrap', {
    scale: 0.8, opacity: 0, rotation: -8, duration: 1.6, ease: 'expo.out',
    scrollTrigger: { trigger: '.globe-wrap', start: 'top 85%' }
  });
  gsap.to('.globe-wrap', {
    yPercent: -10,
    scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true },
  });
  // Presence card entrance
  gsap.from('.presence-card', {
    y: 50, opacity: 0, scale: 0.95, duration: 1.1, ease: 'expo.out',
    scrollTrigger: { trigger: '.presence-card', start: 'top 88%' }
  });
  // Country items stagger with slide
  gsap.from('.country-list li', {
    x: -30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'expo.out',
    scrollTrigger: { trigger: '.country-list', start: 'top 85%' }
  });
  // Stat numbers stagger
  gsap.from('.stat-row .s', {
    y: 24, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'expo.out',
    scrollTrigger: { trigger: '.stat-row', start: 'top 90%' }
  });
  // About section parallax background shift
  gsap.to('.about', {
    backgroundPosition: '50% 30%',
    scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true }
  });

  // ========== PRODUCTS ==========
  splitChars('.products h2');
  gsap.from('.products h2 .char', {
    y: 50, opacity: 0, rotateX: -50,
    duration: 0.6, stagger: 0.015, ease: 'back.out(1.4)',
    scrollTrigger: { trigger: '.products h2', start: 'top 82%' }
  });
  gsap.from('.products .eyebrow', {
    x: -40, opacity: 0, duration: 0.9, ease: 'expo.out',
    scrollTrigger: { trigger: '.products .eyebrow', start: 'top 88%' }
  });
  gsap.from('.product-stage', {
    y: 80, opacity: 0, scale: 0.92, duration: 1.4, ease: 'expo.out',
    scrollTrigger: { trigger: '.product-stage', start: 'top 85%' }
  });
  gsap.from('.carousel-controls', {
    y: 30, opacity: 0, duration: 0.9, ease: 'expo.out',
    scrollTrigger: { trigger: '.carousel-controls', start: 'top 92%' }
  });
  // Products section parallax
  gsap.to('.product-stage', {
    yPercent: -4,
    scrollTrigger: { trigger: '.products', start: 'top bottom', end: 'bottom top', scrub: true }
  });

  // ========== CONTACT ==========
  splitChars('.contact h2');
  gsap.from('.contact h2 .char', {
    y: 40, opacity: 0, rotateX: -40,
    duration: 0.7, stagger: 0.02, ease: 'back.out(1.4)',
    scrollTrigger: { trigger: '.contact h2', start: 'top 82%' }
  });
  gsap.from('.contact .eyebrow', {
    x: -40, opacity: 0, duration: 0.9, ease: 'expo.out',
    scrollTrigger: { trigger: '.contact .eyebrow', start: 'top 88%' }
  });
  gsap.from('.contact p.lede', {
    y: 30, opacity: 0, duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: '.contact p.lede', start: 'top 88%' }
  });
  gsap.from('.contact-block', {
    y: 28, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'expo.out',
    scrollTrigger: { trigger: '.contact-info', start: 'top 80%' }
  });
  gsap.from('.map-card', {
    y: 60, opacity: 0, scale: 0.93, duration: 1.4, ease: 'expo.out',
    scrollTrigger: { trigger: '.map-card', start: 'top 85%' }
  });
  // Map parallax
  gsap.to('.map-card', {
    yPercent: -6,
    scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: true }
  });

  // ========== PARTNERS ==========
  splitChars('.partners h2');
  gsap.from('.partners h2 .char', {
    y: 40, opacity: 0, rotateX: -40,
    duration: 0.7, stagger: 0.018, ease: 'back.out(1.4)',
    scrollTrigger: { trigger: '.partners h2', start: 'top 82%' }
  });
  gsap.from('.partners .eyebrow', {
    x: -40, opacity: 0, duration: 0.9, ease: 'expo.out',
    scrollTrigger: { trigger: '.partners .eyebrow', start: 'top 88%' }
  });
  gsap.from('.marquee-wrap', {
    y: 40, opacity: 0, duration: 1.2, ease: 'expo.out',
    scrollTrigger: { trigger: '.marquee-wrap', start: 'top 90%' }
  });

  // Partners — no clip-path, seamless dark join

  // ========== FOOTER ==========
  gsap.from('.footer .flogo-wrap', {
    y: 30, opacity: 0, scale: 0.9, duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: '.footer-grid', start: 'top 88%' }
  });
  gsap.from('.footer-grid > div:not(:first-child)', {
    y: 36, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'expo.out',
    scrollTrigger: { trigger: '.footer-grid', start: 'top 82%' }
  });
  gsap.from('.footer .ftag', {
    y: 20, opacity: 0, duration: 0.9, delay: 0.2, ease: 'expo.out',
    scrollTrigger: { trigger: '.footer .ftag', start: 'top 90%' }
  });
  gsap.from('.footer-massive', {
    scale: 0.85, opacity: 0, duration: 1.8, ease: 'expo.out',
    scrollTrigger: { trigger: '.footer-massive', start: 'top 95%' }
  });
  gsap.from('.footer-bottom > div', {
    y: 16, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'expo.out',
    scrollTrigger: { trigger: '.footer-bottom', start: 'top 95%' }
  });

  // ========== SECTION TRANSITIONS ==========
  // Clean section joins — no clip-path or text parallax

  // ========== STAT NUMBER COUNT-UP ==========
  $$('.stat-row .num').forEach(el => {
    const text = el.textContent.trim();
    const match = text.match(/^(\d+)/);
    if (!match) return;
    const target = parseInt(match[1]);
    const suffix = text.replace(/^\d+/, '');
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; }
    });
  });

  updateActiveNav();
});

// ----------------------------------------------------------
// 4) Carousel + mobile swipe + dots
// ----------------------------------------------------------
const slides = $$('.product-stage .slide');
let curIdx = 0;
let carTimer = null;

// Product names + icons for tabs
const PRODUCT_NAMES = [
  { name: 'Epregress Syrup', icon: 'fa-solid fa-prescription-bottle' },
  { name: 'ASV Tablet', icon: 'fa-solid fa-tablets' },
  { name: 'ASV Testing Kit', icon: 'fa-solid fa-vial' },
];

// Build product name tabs
const tabsWrap = $('.product-tabs');
const tabs = [];
if (tabsWrap && slides.length) {
  PRODUCT_NAMES.forEach((p, i) => {
    const btn = document.createElement('button');
    btn.className = 'product-tab' + (i === 0 ? ' is-active' : '');
    btn.innerHTML = `<i class="${p.icon}"></i>${p.name}`;
    btn.addEventListener('click', () => setSlide(i));
    tabsWrap.appendChild(btn);
    tabs.push(btn);
  });
}

// Build dot indicators
const dotsWrap = $('.carousel-dots');
const dots = [];
if (dotsWrap && slides.length) {
  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'cdot' + (i === 0 ? ' is-active' : '');
    d.addEventListener('click', () => setSlide(i));
    dotsWrap.appendChild(d);
    dots.push(d);
  });
}

function setSlide(i) {
  curIdx = (i + slides.length) % slides.length;
  slides.forEach((s, k) => s.classList.toggle('is-active', k === curIdx));
  dots.forEach((d, k) => d.classList.toggle('is-active', k === curIdx));
  tabs.forEach((t, k) => t.classList.toggle('is-active', k === curIdx));
  const stg = $('.product-stage');
  if (stg) stg.style.transform = `translateX(-${curIdx * 100}%)`;
  resetCarTimer();
}
function resetCarTimer() {
  clearInterval(carTimer);
  carTimer = setInterval(() => setSlide(curIdx + 1), 7000);
}
$('.car-prev')?.addEventListener('click', () => setSlide(curIdx - 1));
$('.car-next')?.addEventListener('click', () => setSlide(curIdx + 1));

// Touch swipe on product stage
const stage = $('.product-stage');
if (stage) {
  let sx = 0, sy = 0, swiping = false;
  stage.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; swiping = true; }, { passive: true });
  stage.addEventListener('touchmove', e => {
    if (!swiping) return;
    const dx = e.touches[0].clientX - sx;
    const dy = e.touches[0].clientY - sy;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) setSlide(curIdx + 1); else setSlide(curIdx - 1);
      swiping = false;
    }
  }, { passive: true });
  stage.addEventListener('touchend', () => { swiping = false; }, { passive: true });
}
if (slides.length) { setSlide(0); }

// ----------------------------------------------------------
// 5) Realistic 3D Earth globe (three.js + three-globe)
// ----------------------------------------------------------
function initGlobe() {
  const container = document.querySelector('.globe-wrap');
  if (!container || !window.THREE || !window.ThreeGlobe) return;

  const W = container.clientWidth;
  const H = container.clientHeight;

  const cities = [
    { name: 'India · HQ',    lat: 17.49,  lng: 78.57, size: 0.7, flag: 'assets/flag-india.png' },
    { name: 'United Kingdom', lat: 51.50,  lng: -0.12, size: 0.55, flag: 'assets/flag-uk.png' },
    { name: 'United States',  lat: 39.83,  lng: -98.58, size: 0.55, flag: 'assets/flag-us.png' },
    { name: 'Australia',      lat: -33.86, lng: 151.20, size: 0.55, flag: 'assets/flag-australia.png' },
    { name: 'Germany · EU',   lat: 50.11,  lng: 8.68,  size: 0.55, flag: 'assets/flag-eu.png' },
    { name: 'France',         lat: 48.85,  lng: 2.35,  size: 0.45 },
    { name: 'Spain',          lat: 40.42,  lng: -3.70, size: 0.45 },
    { name: 'Italy',          lat: 41.90,  lng: 12.49, size: 0.45 },
    { name: 'Netherlands',    lat: 52.37,  lng: 4.90,  size: 0.45 },
  ];
  const flagCities = cities.filter(c => c.flag);
  const HQ = cities[0];
  const arcs = cities.slice(1).map(c => ({
    startLat: HQ.lat, startLng: HQ.lng,
    endLat: c.lat, endLng: c.lng,
    color: ['#00B4D8', '#90E0EF']
  }));

  const Globe = new ThreeGlobe()
    .globeImageUrl('https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg')
    .bumpImageUrl('https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png')
    .showAtmosphere(true)
    .atmosphereColor('#00B4D8')
    .atmosphereAltitude(0.18)
    .pointsData(cities)
    .pointAltitude(0.012)
    .pointRadius(0.55)
    .pointColor(() => '#00B4D8')
    .pointResolution(12)
    .labelsData(cities)
    .labelText('name')
    .labelLat('lat')
    .labelLng('lng')
    .labelSize(0.7)
    .labelColor(() => '#ffffff')
    .labelDotRadius(0.4)
    .labelAltitude(0.012)
    .labelResolution(2)
    .arcsData(arcs)
    .arcColor('color')
    .arcDashLength(0.5)
    .arcDashGap(1.2)
    .arcDashAnimateTime(2200)
    .arcStroke(0.45)
    .arcAltitudeAutoScale(0.6)
    .customLayerData(flagCities)
    .customThreeObject(d => {
      const group = new THREE.Group();
      const texture = new THREE.TextureLoader().load(d.flag);
      texture.colorSpace = THREE.SRGBColorSpace;
      const mat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
      const sprite = new THREE.Sprite(mat);
      const isHQ = d.name.includes('HQ');
      const w = isHQ ? 7 : 5;
      const h = isHQ ? 4.7 : 3.3;
      sprite.scale.set(w, h, 1);
      sprite.position.y = h / 2 + 1.5;
      group.add(sprite);
      // Pin stem
      const stemGeo = new THREE.CylinderGeometry(0.15, 0.15, 1.5, 4);
      const stemMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.y = 0.75;
      group.add(stem);
      // Glow dot at base
      const dotGeo = new THREE.SphereGeometry(0.5, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0x00B4D8, transparent: true, opacity: 0.8 });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      group.add(dot);
      return group;
    })
    .customThreeObjectUpdate((obj, d) => {
      Object.assign(obj.position, Globe.getCoords(d.lat, d.lng, 0.02));
    });

  const globeMat = Globe.globeMaterial();
  globeMat.color = new THREE.Color('#0a1f4a');
  globeMat.emissive = new THREE.Color('#02134f');
  globeMat.emissiveIntensity = 0.12;
  globeMat.shininess = 0.7;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.add(Globe);
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const dir = new THREE.DirectionalLight(0xffffff, 1.1);
  dir.position.set(-200, 200, 250);
  scene.add(dir);
  const rim = new THREE.DirectionalLight(0x00b4d8, 0.5);
  rim.position.set(200, -100, -200);
  scene.add(rim);

  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 2000);
  camera.position.set(0, 60, 270);
  camera.lookAt(0, 0, 0);

  let userRotY = 0, userRotX = 0, autoRot = 0;
  const velocity = 0.0014;
  let dragging = false, lastX = 0, lastY = 0;
  const dom = renderer.domElement;

  function onDown(x, y) { dragging = true; lastX = x; lastY = y; container.classList.add('is-dragging'); }
  function onMove(x, y) {
    if (!dragging) return;
    userRotY += (x - lastX) * 0.006;
    userRotX += (y - lastY) * 0.006;
    const maxX = Math.PI / 2 * 0.95;
    userRotX = Math.max(-maxX, Math.min(maxX, userRotX));
    lastX = x; lastY = y;
  }
  function onUp() { dragging = false; container.classList.remove('is-dragging'); }

  dom.addEventListener('mousedown', e => { e.preventDefault(); onDown(e.clientX, e.clientY); });
  window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
  window.addEventListener('mouseup', onUp);
  dom.addEventListener('touchstart', e => onDown(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  window.addEventListener('touchmove', e => { if (dragging) onMove(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
  window.addEventListener('touchend', onUp);

  const pivot = new THREE.Group();
  scene.remove(Globe);
  pivot.add(Globe);
  scene.add(pivot);
  Globe.rotation.z = (23.5 * Math.PI) / 180;

  function animate() {
    if (!dragging) autoRot += velocity;
    Globe.rotation.y = autoRot + userRotY;
    pivot.rotation.x = userRotX;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = container.clientWidth, h = container.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });

  const ldg = container.querySelector('.globe-loading');
  if (ldg) ldg.style.display = 'none';
}

function waitGlobeLibs() {
  if (window.THREE && window.ThreeGlobe) initGlobe();
  else setTimeout(waitGlobeLibs, 100);
}
window.addEventListener('load', waitGlobeLibs);

// ----------------------------------------------------------
// 6) Scroll-driven vector graphics
// ----------------------------------------------------------
function initScrollVectors() {
  const svg = document.querySelector('.scroll-vectors');
  if (!svg || !window.gsap) return;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const totalH = document.body.scrollHeight;

  // Build helix path that spans the full page height
  const helixPath = svg.querySelector('.sv-helix');
  if (helixPath) {
    helixPath.remove();
  }

  // Floating molecule nodes — drift down with scroll
  const mols = svg.querySelectorAll('.sv-mol');
  mols.forEach((mol, i) => {
    const startX = vw * (0.06 + i * 0.04);
    const startY = vh * (0.3 + i * 0.2);
    mol.setAttribute('cx', startX);
    mol.setAttribute('cy', startY);
    gsap.to(mol, {
      attr: { cy: startY + totalH * 0.6, cx: startX + Math.sin(i * 2) * 120 },
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 2 + i * 0.5 }
    });
  });

  // Medical cross — rotates + drifts
  const cross = svg.querySelector('.sv-cross');
  if (cross) {
    const cx = vw * 0.88;
    const cy = vh * 1.8;
    cross.setAttribute('transform', `translate(${cx},${cy})`);
    gsap.to(cross, {
      attr: { transform: `translate(${cx - 60},${cy - totalH * 0.4}) rotate(180)` },
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 2 }
    });
  }

  // Hexagon — drifts from right side
  const hex = svg.querySelector('.sv-hex');
  if (hex) {
    const hx = vw * 0.08;
    const hy = vh * 2.5;
    hex.setAttribute('transform', `translate(${hx},${hy})`);
    gsap.to(hex, {
      attr: { transform: `translate(${hx + 40},${hy - totalH * 0.35}) rotate(90)` },
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 3 }
    });
  }

  // Floating plus signs
  const pluses = svg.querySelectorAll('.sv-plus');
  pluses.forEach((p, i) => {
    const px = vw * (0.1 + i * 0.78);
    const py = vh * (1.2 + i * 1.6);
    p.setAttribute('transform', `translate(${px},${py})`);
    gsap.to(p, {
      attr: { transform: `translate(${px + (i % 2 === 0 ? 50 : -50)},${py - totalH * 0.3}) rotate(${90 + i * 45})` },
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 2.5 }
    });
  });

  // DNA dots trail
  const dnaDots = svg.querySelectorAll('.sv-dot');
  dnaDots.forEach((dot, i) => {
    const dx = vw * (0.94 - i * 0.005);
    const dy = vh * (0.1 + i * 0.15);
    dot.setAttribute('cx', dx);
    dot.setAttribute('cy', dy);
    gsap.to(dot, {
      attr: {
        cy: dy + totalH * (0.5 + i * 0.1),
        cx: dx + Math.cos(i * 1.5) * 80
      },
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1.8 + i * 0.4 }
    });
  });
}

window.addEventListener('load', () => {
  setTimeout(initScrollVectors, 300);
});
