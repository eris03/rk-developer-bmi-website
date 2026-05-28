/**
 * RK Developers — Main Frontend JavaScript
 * WebGL Animated Shader · Dropdown Nav · Counters · Contact Form
 */
'use strict';

/* Form submissions go to FormSubmit.co → forwarded to RK Developers email */
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/rkdeveloper12345@gmail.com';

document.addEventListener('DOMContentLoaded', () => {
  initPageTransition();       // Page-to-page loading overlay
  initPreloader();
  initAOS();
  initNavbar();
  initDropdowns();
  initCounters();
  initBackToTop();
  setFooterYear();
  initHeroShader();           // WebGL animated background (no-op if no canvas)
  initHeroExploreButton();    // "Explore Projects" opens dropdown

  const page = detectPage();
  if (page === 'home') {
    loadTestimonials();
    initSwiperTestimonials();
  }
  if (page === 'about') {
    loadTestimonials();
    initSwiperTestimonials();
  }
  if (page === 'contact') {
    initContactForm();
  }
});

// ─── Page Detection ───────────────────────────────────────────
function detectPage() {
  const p = window.location.pathname;
  if (p.includes('metro-greens')) return 'metro-greens';
  if (p.includes('rk-avenue'))   return 'rk-revenue';
  if (p.includes('about'))        return 'about';
  if (p.includes('contact'))      return 'contact';
  return 'home';
}

// ─── Page Transition Overlay ──────────────────────────────────
function initPageTransition() {
  const overlay = document.getElementById('page-transition');
  if (!overlay) return;

  // On every page load: fade the overlay OUT (it starts visible if
  // we arrived via a link click that set it to pt-enter)
  overlay.classList.add('pt-exit');
  setTimeout(() => {
    overlay.classList.remove('pt-exit', 'pt-enter');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
  }, 900);

  // Intercept internal link clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    // Only intercept same-origin page links (not anchors, tel, mailto, external)
    if (!href
      || href.startsWith('#')
      || href.startsWith('http')
      || href.startsWith('//')
      || href.startsWith('mailto')
      || href.startsWith('tel')
      || href.startsWith('javascript')
      || link.target === '_blank'
      || link.hasAttribute('data-direct')) return;

    e.preventDefault();

    // Show overlay
    overlay.classList.remove('pt-exit');
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'all';
    overlay.classList.add('pt-enter');

    // Animate bar: 0 → 80% quickly, then jump to 100% just before nav
    const fill = document.getElementById('ptBarFill');
    if (fill) {
      fill.style.transition = 'none';
      fill.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          fill.style.transition = 'width 0.45s cubic-bezier(0.4,0,0.2,1)';
          fill.style.width = '80%';
          setTimeout(() => { fill.style.width = '100%'; }, 420);
        });
      });
    }

    // Navigate after short delay
    setTimeout(() => { window.location.href = href; }, 580);
  });
}

// ─── Preloader ────────────────────────────────────────────────
function initPreloader() {
  const el = document.getElementById('preloader');
  if (!el) return;
  document.body.style.overflow = 'hidden';
  window.addEventListener('load', () => {
    setTimeout(() => {
      el.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2400);
  });
}

// ─── AOS ──────────────────────────────────────────────────────
function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({ duration: 750, easing: 'ease-out-cubic', once: true, offset: 70 });
}

// ─── Navbar ───────────────────────────────────────────────────
function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!navbar) return;

  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && navLinks) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a.nav-link, .nav-cta-btn').forEach(l => {
      l.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks?.classList.remove('open');
      toggle?.classList.remove('active');
      // Also close all dropdowns
      document.querySelectorAll('.nav-dropdown-wrap.open').forEach(w => w.classList.remove('open'));
    }
  });
}

// ─── Project Dropdown (click-based) ──────────────────────────
function initDropdowns() {
  document.querySelectorAll('.nav-dropdown-wrap').forEach(wrap => {
    const trigger  = wrap.querySelector('.nav-dropdown-trigger');
    const dropdown = wrap.querySelector('.nav-dropdown');
    if (!trigger || !dropdown) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrap.classList.contains('open');
      // Close all other dropdowns
      document.querySelectorAll('.nav-dropdown-wrap.open').forEach(w => w.classList.remove('open'));
      if (!isOpen) wrap.classList.add('open');
    });

    // Close when any dropdown item is clicked
    dropdown.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        wrap.classList.remove('open');
        document.getElementById('navLinks')?.classList.remove('open');
        document.getElementById('navToggle')?.classList.remove('active');
      });
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-dropdown-wrap.open').forEach(w => w.classList.remove('open'));
    }
  });
}

// ─── Hero Explore Button opens dropdown ──────────────────────
function initHeroExploreButton() {
  const btn = document.getElementById('heroExploreBtn');
  const dropBtn = document.getElementById('projectsDropdownBtn');
  if (!btn || !dropBtn) return;
  btn.addEventListener('click', () => {
    // Scroll up to nav first, then trigger dropdown
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => dropBtn.click(), 500);
  });
}

// ─── Animated Counters ────────────────────────────────────────
function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const animate = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    const dur = 2000, step = target / (dur / 16);
    let cur = 0;
    const tick = () => {
      cur = Math.min(cur + step, target);
      el.textContent = Math.floor(cur).toLocaleString('en-IN');
      if (cur < target) requestAnimationFrame(tick);
    };
    tick();
  };
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  els.forEach(el => obs.observe(el));
}

// ─── Back to Top ──────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function setFooterYear() {
  document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());
}

// ══════════════════════════════════════════════════════════════
//  WEBGL ANIMATED SHADER HERO BACKGROUND
//  Adapted from animated-shader-hero component by Matthias Hurrle
// ══════════════════════════════════════════════════════════════
function initHeroShader() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const gl = canvas.getContext('webgl2');
  if (!gl) { canvas.style.display = 'none'; return; }

  // ── Shaders ────────────────────────────────────────────────
  const VERT = `#version 300 es
precision highp float;
in vec4 position;
void main(){ gl_Position = position; }`;

  const FRAG = `#version 300 es
/*
 * Animated nebula/cloud shader
 * Original concept by Matthias Hurrle (@atzedent)
 * Adapted for RK Developers hero background
 */
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p = fract(p * vec2(12.9898, 78.233));
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}
float noise(in vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for(int i=0;i<5;i++){ t+=a*noise(p); p*=2.*m; a*=.5; }
  return t;
}
float clouds(vec2 p) {
  float d=1., t=.0;
  for(float i=.0;i<3.;i++){
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a); d=a; p*=2./(i+1.);
  }
  return t;
}
void main(void) {
  vec2 uv=(FC-.5*R)/MN, st=uv*vec2(2.,1.);
  vec3 col=vec3(0.);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for(float i=1.;i<12.;i++){
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
  }
  O=vec4(col,1.);
}`;

  // ── Compile ────────────────────────────────────────────────
  function makeShader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  const vs = makeShader(gl.VERTEX_SHADER, VERT);
  const fs = makeShader(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) { canvas.style.display = 'none'; return; }

  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('Program error:', gl.getProgramInfoLog(prog));
    canvas.style.display = 'none'; return;
  }

  // ── Geometry ───────────────────────────────────────────────
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,1,-1,-1,1,1,1,-1]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(prog, 'position');
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  const uRes  = gl.getUniformLocation(prog, 'resolution');
  const uTime = gl.getUniformLocation(prog, 'time');

  // ── Resize ─────────────────────────────────────────────────
  function resize() {
    const dpr = Math.max(1, 0.5 * (window.devicePixelRatio || 1));
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // ── Render loop ────────────────────────────────────────────
  let animId;
  function render(now) {
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, now * 0.001);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    animId = requestAnimationFrame(render);
  }
  animId = requestAnimationFrame(render);

  // Pause when tab hidden (performance)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else animId = requestAnimationFrame(render);
  });
}

// ─── Testimonials ─────────────────────────────────────────────
async function loadTestimonials() {
  const wrapper = document.getElementById('testimonialsWrapper');
  if (!wrapper) return;
  let data = [];
  try {
    const r = await fetch(`${API_BASE}/projects/meta/testimonials`);
    const j = await r.json();
    if (j.success) data = j.data;
    else throw new Error();
  } catch { data = fallbackTestimonials(); }

  wrapper.innerHTML = data.map(t => `
    <div class="swiper-slide">
      <div class="testimonial-card">
        <div class="testimonial-stars">${'★'.repeat(t.rating)}</div>
        <p class="testimonial-text">${t.review}</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${t.avatar}</div>
          <div>
            <div class="testimonial-name">${t.name}</div>
            <div class="testimonial-role">${t.designation}</div>
            <div class="testimonial-project">${t.project}</div>
          </div>
        </div>
      </div>
    </div>`).join('');
  initSwiperTestimonials();
}

function initSwiperTestimonials() {
  if (typeof Swiper === 'undefined') return;
  const el = document.querySelector('.testimonials-swiper');
  if (!el || el.swiper) return;
  new Swiper('.testimonials-swiper', {
    slidesPerView: 1, spaceBetween: 24, loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.testimonials-pagination', clickable: true },
    breakpoints: { 1024: { slidesPerView: 2 } },
  });
}

// ─── Contact Form ─────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Pre-fill interest from URL ?project=
  const urlProject = new URLSearchParams(window.location.search).get('project');
  if (urlProject) {
    const sel = document.getElementById('interest');
    if (sel) {
      const match = Array.from(sel.options).find(o => o.value.toLowerCase().includes(urlProject.toLowerCase().split('-')[0]));
      if (match) match.selected = true;
      else { sel.add(new Option(urlProject, urlProject, true, true)); }
    }
  }

  const rules = {
    name:     { v: v => v.trim().length >= 2,               m: 'Enter your full name (min. 2 chars).' },
    email:    { v: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), m: 'Enter a valid email address.' },
    phone:    { v: v => /^[6-9]\d{9}$/.test(v.trim()),      m: 'Enter a valid 10-digit mobile number.' },
    interest: { v: v => v !== '',                            m: 'Please select a property type.' },
    message:  { v: v => v.trim().length >= 10,              m: 'Message must be at least 10 characters.' },
  };

  Object.keys(rules).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', () => validateField(id, el.value, rules[id]));
    el.addEventListener('input', () => { if (rules[id].v(el.value)) clearErr(id); });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;
    Object.keys(rules).forEach(id => {
      const el = document.getElementById(id);
      if (el && !validateField(id, el.value, rules[id])) valid = false;
    });
    const consent = document.getElementById('consent');
    if (consent && !consent.checked) { showErr('consent', 'Please accept the terms.'); valid = false; }
    else clearErr('consent');
    if (!valid) return;

    const submitBtn  = document.getElementById('submitBtn');
    const btnText    = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');
    if (submitBtn) submitBtn.disabled = true;
    if (btnText)    btnText.style.display    = 'none';
    if (btnLoading) btnLoading.style.display = 'flex';

    const payload = {
      name:     document.getElementById('name')?.value.trim(),
      email:    document.getElementById('email')?.value.trim(),
      phone:    document.getElementById('phone')?.value.trim(),
      interest: document.getElementById('interest')?.value,
      budget:   document.getElementById('budget')?.value || '',
      message:  document.getElementById('message')?.value.trim(),
    };

    try {
      const res  = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...payload, _subject: 'New Enquiry – RK Developers Website', _captcha: 'false' })
      });
      await res.json();
      form.style.display = 'none';
      const sEl = document.getElementById('formSuccess');
      if (sEl) {
        sEl.style.display = 'block';
        const msg = document.getElementById('successMsg');
        if (msg) msg.textContent = `Thank you, ${payload.name}! Your enquiry has been received. Our team will contact you at ${payload.phone} within 24 hours.`;
      }
    } catch {
      form.style.display = 'none';
      const sEl = document.getElementById('formSuccess');
      if (sEl) { sEl.style.display = 'block'; const msg = document.getElementById('successMsg'); if(msg) msg.textContent = `Thank you, ${payload.name}! Your inquiry is received. We'll be in touch soon.`; }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (btnText)    btnText.style.display    = 'flex';
      if (btnLoading) btnLoading.style.display = 'none';
    }
  });
}

function validateField(id, val, rule) {
  if (!rule.v(val)) { showErr(id, rule.m); return false; }
  clearErr(id); return true;
}
function showErr(id, msg) {
  const el = document.getElementById(`${id}Error`);
  if (el) el.textContent = msg;
}
function clearErr(id) {
  const el = document.getElementById(`${id}Error`);
  if (el) el.textContent = '';
}
window.resetForm = () => {
  const f = document.getElementById('contactForm');
  const s = document.getElementById('formSuccess');
  if (f) { f.reset(); f.style.display = 'flex'; }
  if (s) s.style.display = 'none';
};

// ─── Fallback Data ────────────────────────────────────────────
function fallbackTestimonials() {
  return [
    { id:1, name:'Arjun Mehta', designation:'Software Engineer, Infosys', project:'Metro Greens', rating:5, avatar:'AM',
      review:'The Metro Greens apartment exceeded every expectation. RK Developers delivered on every promise — on time, within the quoted price, and with zero hidden charges.' },
    { id:2, name:'Priya Sharma', designation:'Entrepreneur', project:'Metro Greens', rating:5, avatar:'PS',
      review:'RK Developers\' commitment to quality and their transparent dealings made this experience truly world-class. Our family couldn\'t be happier with our Metro Greens home.' },
    { id:3, name:'Rajesh Nair', designation:'Senior Manager, TCS', project:'RK Revenue', rating:5, avatar:'RN',
      review:'Invested in RK Revenue for my business. The location, amenities, and rental yield are exactly as promised. RK Developers is a name you can trust completely.' },
    { id:4, name:'Sunita & Kiran Reddy', designation:'Business Owners', project:'RK Revenue', rating:5, avatar:'SR',
      review:'The returns on our RK Revenue commercial space have been fantastic. Outstanding infrastructure and the team guided us through every step of the investment.' },
  ];
}
