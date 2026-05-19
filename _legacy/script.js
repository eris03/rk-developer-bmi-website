/* ============================================================
   BMI HOUSING - Progressive Zoom-Out Engine
   Scroll progress is continuous (not per-click).
   Current page only fully disappears when fully zoomed out.
   Slow & smooth - eased lerp + low wheel sensitivity.
   ============================================================ */

(function () {
  "use strict";

  var scenes       = Array.prototype.slice.call(document.querySelectorAll(".scene"));
  var navLinks     = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var drawerLinks  = Array.prototype.slice.call(document.querySelectorAll(".mobile-drawer a"));
  var dots         = Array.prototype.slice.call(document.querySelectorAll(".progress-dots li"));
  var progressFill = document.getElementById("progressFill");
  var topNav       = document.getElementById("topNav");
  var flash        = document.getElementById("transitionFlash");
  var splash       = document.getElementById("splash");
  var hamburger    = document.getElementById("hamburger");
  var drawer       = document.getElementById("mobileDrawer");

  var TOTAL = scenes.length;

  var viewPos = 0;
  var target  = 0;
  var lastBaseIdx = 0;

  var WHEEL_SENS    = 0.0020;   // each wheel tick moves ~0.2 of a section
  var TOUCH_SENS    = 0.0080;
  var LERP          = 0.060;    // a touch faster so the zoom stays in sync with the wheel
  var SNAP_LERP     = 0.085;    // glide for click navigation
  var SCALE_OUT     = 0.30;
  var SCALE_IN_FROM = 1.55;
  var BLUR_MAX      = 9;
  var FADE_MULT     = 1.25;

  window.addEventListener("load", function () {
    setTimeout(function () { if (splash) splash.classList.add("hide"); }, 1500);
  });

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function ease(t)        { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  function applyTransforms() {
    for (var i = 0; i < scenes.length; i++) {
      var s = scenes[i];
      var d  = viewPos - i;
      var ad = Math.abs(d);

      if (ad >= 1.05) {
        s.style.opacity = 0;
        s.style.pointerEvents = "none";
        s.style.transform = "scale(" + (d > 0 ? SCALE_OUT : SCALE_IN_FROM) + ")";
        s.style.filter = "blur(" + BLUR_MAX + "px)";
        s.style.zIndex = 1;
        continue;
      }

      var t = ease(ad);
      var scale, opacity, blur, z;

      if (d >= 0) {
        scale   = 1 - (1 - SCALE_OUT) * t;
        opacity = clamp(1 - t * FADE_MULT, 0, 1);
        blur    = t * BLUR_MAX;
        z       = 10 - i;
      } else {
        scale   = 1 + (SCALE_IN_FROM - 1) * t;
        opacity = clamp(1 - t * FADE_MULT, 0, 1);
        blur    = t * BLUR_MAX;
        z       = 5;
      }

      s.style.opacity = opacity;
      s.style.transform = "scale(" + scale + ")";
      s.style.filter = "blur(" + blur + "px)";
      s.style.zIndex = z;
      s.style.pointerEvents = ad < 0.25 ? "auto" : "none";
    }

    var baseIdx = Math.round(viewPos);
    if (baseIdx !== lastBaseIdx) {
      lastBaseIdx = baseIdx;
      syncIndicators(baseIdx);
    }

    var frac = viewPos - Math.floor(viewPos);
    if (flash) {
      flash.style.setProperty("--zp", (frac * 100).toFixed(1) + "%");
      var showFlash = frac > 0.02 && frac < 0.98;
      flash.classList.toggle("flash", showFlash);
    }
  }

  function syncIndicators(idx) {
    navLinks.forEach(function (l) {
      l.classList.toggle("active", parseInt(l.getAttribute("data-jump"), 10) === idx);
    });
    drawerLinks.forEach(function (l) {
      l.classList.toggle("active", parseInt(l.getAttribute("data-jump"), 10) === idx);
    });
    dots.forEach(function (d, i) { d.classList.toggle("active", i === idx); });
    if (progressFill) {
      var pct = (viewPos / (TOTAL - 1)) * 100;
      progressFill.style.setProperty("--pf", clamp(pct, 0, 100) + "%");
    }
    if (idx > 0) topNav.classList.add("shrink"); else topNav.classList.remove("shrink");
  }

  function tick() {
    var near = Math.round(target);
    var isAtInteger = Math.abs(target - near) < 0.001;
    var k = isAtInteger ? SNAP_LERP : LERP;

    viewPos += (target - viewPos) * k;
    if (Math.abs(target - viewPos) < 0.0008) viewPos = target;

    applyTransforms();
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  function canInnerScroll(deltaY) {
    if (Math.abs(viewPos - Math.round(viewPos)) > 0.02) return false;
    var idx = Math.round(viewPos);
    var sc  = scenes[idx] && scenes[idx].querySelector(".scene-content");
    if (!sc) return false;
    if (deltaY > 0) return sc.scrollTop + sc.clientHeight < sc.scrollHeight - 2;
    return sc.scrollTop > 2;
  }

  // No auto-snap. Each wheel tick moves target by a small amount.
  // viewPos lerps toward target. If user stops mid-zoom, it stays mid-zoom
  // until they scroll more. The current page only fully disappears when
  // they have scrolled enough to fully zoom out into the next.
  window.addEventListener("wheel", function (e) {
    if (canInnerScroll(e.deltaY)) return;
    e.preventDefault();
    target = clamp(target + e.deltaY * WHEEL_SENS, 0, TOTAL - 1);
  }, { passive: false });

  var touchY = null;
  var touchLast = 0;

  window.addEventListener("touchstart", function (e) {
    touchY = e.touches[0].clientY;
    touchLast = touchY;
  }, { passive: true });

  window.addEventListener("touchmove", function (e) {
    if (touchY == null) return;
    var y  = e.touches[0].clientY;
    var dy = touchLast - y;
    touchLast = y;
    if (canInnerScroll(dy)) return;
    target = clamp(target + dy * TOUCH_SENS, 0, TOTAL - 1);
  }, { passive: true });

  // Touch release: only finish/revert if we're VERY close to a section
  // edge. Otherwise leave the zoom state where the user left it.
  window.addEventListener("touchend", function () {
    var base = Math.floor(target);
    var frac = target - base;
    if (frac > 0.92) target = base + 1;       // basically arrived - finish
    else if (frac < 0.08) target = base;      // basically still home - revert
    target = clamp(target, 0, TOTAL - 1);
    touchY = null;
  });

  window.addEventListener("keydown", function (e) {
    if (["ArrowDown", "PageDown", "Space"].indexOf(e.code) !== -1) {
      e.preventDefault();
      target = clamp(Math.floor(target) + 1, 0, TOTAL - 1);
    }
    if (["ArrowUp", "PageUp"].indexOf(e.code) !== -1) {
      e.preventDefault();
      target = clamp(Math.ceil(target) - 1, 0, TOTAL - 1);
    }
    if (e.code === "Home") { e.preventDefault(); target = 0; }
    if (e.code === "End")  { e.preventDefault(); target = TOTAL - 1; }
  });

  document.body.addEventListener("click", function (e) {
    var jumpEl = e.target.closest("[data-jump]");
    if (!jumpEl) return;
    var idx = parseInt(jumpEl.getAttribute("data-jump"), 10);
    if (isNaN(idx)) return;
    e.preventDefault();
    target = clamp(idx, 0, TOTAL - 1);
    if (drawer && drawer.classList.contains("open")) {
      drawer.classList.remove("open");
      if (hamburger) hamburger.classList.remove("open");
    }
  });

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("open");
      if (drawer) drawer.classList.toggle("open");
    });
  }

  var aiBtn   = document.getElementById("aiBtn");
  var aiInput = document.getElementById("aiInput");
  var aiSend  = document.getElementById("aiSend");
  var aiChat  = document.getElementById("aiChat");

  function openPopup(id)  { document.getElementById(id).classList.add("show"); }
  function closePopup(id) { document.getElementById(id).classList.remove("show"); }
  if (aiBtn) aiBtn.addEventListener("click", function () { openPopup("aiPopup"); });

  document.querySelectorAll("[data-close]").forEach(function (b) {
    b.addEventListener("click", function () { closePopup(b.getAttribute("data-close")); });
  });
  document.querySelectorAll(".popup").forEach(function (p) {
    p.addEventListener("click", function (e) { if (e.target === p) p.classList.remove("show"); });
  });

  var aiKB = [
    { k: ["price","cost","rate","budget"],    r: "BMI plots start from Rs.35 lakhs and go up to Rs.1.8 crores depending on size and location. Want project-specific pricing?" },
    { k: ["location","where","place","area"], r: "We have premium layouts in Devanahalli, Sarjapur, Whitefield and Hoskote - all near major IT corridors and metro lines." },
    { k: ["loan","emi","finance","bank"],     r: "Yes! We have tie-ups with HDFC, SBI, ICICI and Axis for instant loans up to 90% of property value." },
    { k: ["legal","approval","rera","dtcp"],  r: "All BMI layouts are RERA, DTCP and BMRDA approved with clear titles. Documentation is 100% transparent." },
    { k: ["site","visit","tour"],             r: "Absolutely - we offer free site visits with pickup and drop! Drop your contact via the form and we will arrange it." },
    { k: ["villa","house","home"],            r: "BMI Sunshine Villas offers 3 and 4 BHK gated villas with clubhouse, gym and pool. Starting from Rs.95 lakhs." },
    { k: ["plot","land"],                     r: "We have plot sizes from 1200 to 4000 sqft across our 4 active layouts. Shall I shortlist some for you?" },
    { k: ["hi","hello","hey"],                r: "Hello! I am BMI AI. How can I help you find your dream home today?" },
    { k: ["thanks","thank you"],              r: "You are most welcome! Feel free to ask anything else." },
    { k: ["contact","call","phone"],          r: "You can reach us at +91 99999 99999 (Mon-Sat 9:30-7) or fill the contact form on this page." }
  ];

  function aiReply(question) {
    var q = question.toLowerCase();
    for (var i = 0; i < aiKB.length; i++) {
      var item = aiKB[i];
      for (var j = 0; j < item.k.length; j++) {
        if (q.indexOf(item.k[j]) !== -1) return item.r;
      }
    }
    return "Great question! Let me connect you with one of our advisors. Drop your number in the contact form and we will call within an hour.";
  }

  function pushMsg(text, who) {
    var div = document.createElement("div");
    div.className = "msg " + (who || "user");
    div.textContent = text;
    aiChat.appendChild(div);
    aiChat.scrollTop = aiChat.scrollHeight;
  }

  function sendAi() {
    var q = aiInput.value.trim();
    if (!q) return;
    pushMsg(q, "user");
    aiInput.value = "";
    setTimeout(function () { pushMsg(aiReply(q), "bot"); }, 600);
  }
  if (aiSend)  aiSend.addEventListener("click", sendAi);
  if (aiInput) aiInput.addEventListener("keydown", function (e) { if (e.key === "Enter") sendAi(); });

  var msgBtn  = document.getElementById("msgBtn");
  var msgForm = document.getElementById("msgForm");
  if (msgBtn) msgBtn.addEventListener("click", function () { openPopup("msgPopup"); });
  if (msgForm) {
    msgForm.addEventListener("submit", function (e) {
      e.preventDefault();
      msgForm.innerHTML = '<div style="text-align:center;padding:30px 0;color:#5cb88a;"><i class="fa-solid fa-circle-check" style="font-size:42px;margin-bottom:14px;"></i><br><b>Message sent!</b><br><span style="color:#718096;font-size:13px;">We will get back within 24 hours.</span></div>';
      setTimeout(function () { closePopup("msgPopup"); }, 2200);
    });
  }

  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector("button[type=submit]");
      btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Sent! We will be in touch';
      btn.style.background = "linear-gradient(135deg,#88d8a3,#5cb88a)";
      btn.style.color = "#fff";
      setTimeout(function () { contactForm.reset(); }, 200);
    });
  }

  var shapes = document.querySelectorAll(".floating-shape");
  document.addEventListener("mousemove", function (e) {
    if (Math.round(viewPos) !== 0) return;
    var x = (e.clientX / window.innerWidth - 0.5) * 30;
    var y = (e.clientY / window.innerHeight - 0.5) * 30;
    shapes.forEach(function (s, i) {
      var k = (i + 1) * 0.4;
      s.style.transform = "translate(" + (x * k) + "px, " + (y * k) + "px)";
    });
  });

  syncIndicators(0);
  applyTransforms();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    scenes.forEach(function (s) { s.style.filter = "none"; });
  }

  window.BMI = {
    jumpTo: function (i) { target = clamp(i, 0, TOTAL - 1); },
    getPos: function () { return viewPos; }
  };

})();
