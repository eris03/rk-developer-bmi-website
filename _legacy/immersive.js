/* ============================================================
   BMI HOUSING - Immersive 3D Layout
   Procedural site plan rendered with Three.js, animated by GSAP.
   - Hover-to-inspect (slight rotation toward cursor)
   - Assembles when its zoom-section becomes active
   - Disassembles cleanly when you scroll away
   - Mobile-aware: lower DPR, reduced shadows on small screens
   ============================================================ */

(function () {
  "use strict";

  if (typeof THREE === "undefined") {
    console.warn("[immersive] THREE not loaded");
    return;
  }
  var hasGsap = typeof gsap !== "undefined";

  var IMMERSIVE_INDEX = 3;          // matches data-index on the section
  var SECTION_FUZZ    = 0.55;       // how close viewPos must be to count as "in section"

  var canvas, scene, camera, renderer, group;
  var elements = [];                // animated assets
  var assembled = false;
  var sectionEl = null;
  var mouseX = 0, mouseY = 0;
  var targetRotY = 0, targetRotX = 0;
  var clock;
  var isMobile = window.matchMedia("(max-width: 1024px)").matches;

  function init() {
    canvas = document.getElementById("immersiveCanvas");
    sectionEl = document.getElementById("immersive");
    if (!canvas) return;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xfff9f3, 18, 38);

    var w = canvas.clientWidth || window.innerWidth;
    var h = canvas.clientHeight || window.innerHeight;
    camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(11, 8, 11);
    camera.lookAt(0, 0.5, 0);

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(w, h, false);
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding || 3001;
    renderer.toneMapping = THREE.ACESFilmicToneMapping || 4;
    renderer.toneMappingExposure = 1.05;

    addLighting();

    group = new THREE.Group();
    scene.add(group);

    buildSitePlan();
    setInitialState();

    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });

    clock = new THREE.Clock();
    animate();
  }

  function addLighting() {
    var amb = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(amb);

    var hemi = new THREE.HemisphereLight(0xa8e6cf, 0xff8c42, 0.45);
    hemi.position.set(0, 10, 0);
    scene.add(hemi);

    var dir = new THREE.DirectionalLight(0xffffff, 1.15);
    dir.position.set(8, 12, 6);
    if (!isMobile) {
      dir.castShadow = true;
      dir.shadow.mapSize.set(1024, 1024);
      dir.shadow.camera.near = 1;
      dir.shadow.camera.far = 40;
      dir.shadow.camera.left = -12;
      dir.shadow.camera.right = 12;
      dir.shadow.camera.top = 12;
      dir.shadow.camera.bottom = -12;
      dir.shadow.bias = -0.0005;
    }
    scene.add(dir);

    // Soft fill from opposite side
    var fill = new THREE.DirectionalLight(0xffd3b6, 0.3);
    fill.position.set(-6, 4, -8);
    scene.add(fill);
  }

  function mat(color, roughness, metalness) {
    return new THREE.MeshStandardMaterial({
      color: color,
      roughness: roughness == null ? 0.6 : roughness,
      metalness: metalness == null ? 0.05 : metalness
    });
  }

  function buildSitePlan() {
    // ---- Ground ----
    var ground = new THREE.Mesh(
      new THREE.CircleGeometry(11, 64),
      mat(0xfff9f3, 0.85, 0.0)
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = !isMobile;
    group.add(ground);

    // ---- Cross paths ----
    var pathMat = mat(0xeae3da, 0.7, 0.0);
    var pathH = new THREE.Mesh(new THREE.BoxGeometry(20, 0.03, 1.4), pathMat);
    pathH.position.y = 0.015;
    pathH.receiveShadow = !isMobile;
    group.add(pathH);
    var pathV = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.03, 20), pathMat);
    pathV.position.y = 0.015;
    pathV.receiveShadow = !isMobile;
    group.add(pathV);

    // ---- Plot markers (orange pillars + gold caps) ----
    var plotPositions = [
      [-5.5, -5.5], [-5.5, -2], [-5.5, 2], [-5.5, 5.5],
      [-2,   -5.5], [-2,    5.5],
      [ 2,   -5.5], [ 2,    5.5],
      [ 5.5, -5.5], [ 5.5, -2], [ 5.5, 2], [ 5.5, 5.5]
    ];
    var plotGeo = new THREE.BoxGeometry(0.32, 1.1, 0.32);
    var capGeo  = new THREE.SphereGeometry(0.18, 18, 18);
    var plotMatBase = mat(0xffb88c, 0.4, 0.15);
    var capMat = new THREE.MeshStandardMaterial({
      color: 0xe8c074,
      roughness: 0.18,
      metalness: 0.85
    });
    plotPositions.forEach(function (p) {
      var pillar = new THREE.Mesh(plotGeo, plotMatBase.clone());
      pillar.position.set(p[0], 0.55, p[1]);
      pillar.castShadow = !isMobile;
      group.add(pillar);
      elements.push({ mesh: pillar, type: "plot", restY: 0.55 });

      var cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(p[0], 1.22, p[1]);
      cap.castShadow = !isMobile;
      group.add(cap);
      elements.push({ mesh: cap, type: "cap", restY: 1.22 });
    });

    // ---- Trees (low-poly cone + cylinder) ----
    var treePositions = [
      [-3.5, -3.8], [-3.5, 3.8], [3.5, -3.8], [3.5, 3.8],
      [-7.5, 0],    [7.5, 0],    [0, -7.5],   [0, 7.5],
      [-1.6, 1.6],  [1.6, -1.6], [-2, -2.2],  [2.2, 2]
    ];
    var trunkGeo = new THREE.CylinderGeometry(0.09, 0.12, 0.6, 8);
    var foliageGeo = new THREE.ConeGeometry(0.45, 1.15, 12);
    var trunkMat = mat(0xb88a5e, 0.95, 0.0);
    var foliageMat = mat(0x88d8a3, 0.55, 0.0);
    treePositions.forEach(function (p) {
      var tree = new THREE.Group();
      var trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 0.3;
      trunk.castShadow = !isMobile;
      tree.add(trunk);

      var foliage = new THREE.Mesh(foliageGeo, foliageMat.clone());
      foliage.position.y = 1.05;
      foliage.castShadow = !isMobile;
      tree.add(foliage);

      tree.position.set(p[0], 0, p[1]);
      tree.rotation.y = Math.random() * Math.PI;
      group.add(tree);
      elements.push({ mesh: tree, type: "tree", restY: 0 });
    });

    // ---- Central pavilion (clubhouse) ----
    var pavilion = new THREE.Group();
    var base = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 0.9, 1.9),
      mat(0xffffff, 0.35, 0.05)
    );
    base.position.y = 0.45;
    base.castShadow = !isMobile;
    base.receiveShadow = !isMobile;
    pavilion.add(base);

    var roof = new THREE.Mesh(
      new THREE.BoxGeometry(2.85, 0.12, 2.15),
      new THREE.MeshStandardMaterial({ color: 0xe8c074, roughness: 0.2, metalness: 0.78 })
    );
    roof.position.y = 0.96;
    roof.castShadow = !isMobile;
    pavilion.add(roof);

    // gold pillars around base
    var pillarMat = new THREE.MeshStandardMaterial({ color: 0xe8c074, metalness: 0.78, roughness: 0.18 });
    var pillarGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.9, 12);
    [[-1.18, 0.85], [1.18, 0.85], [-1.18, -0.85], [1.18, -0.85]].forEach(function (p) {
      var pl = new THREE.Mesh(pillarGeo, pillarMat);
      pl.position.set(p[0], 0.45, p[1]);
      pl.castShadow = !isMobile;
      pavilion.add(pl);
    });

    // pavilion glow / pool below
    var pool = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 1.4),
      new THREE.MeshStandardMaterial({ color: 0xa8e6cf, roughness: 0.1, metalness: 0.6, transparent: true, opacity: 0.85 })
    );
    pool.rotation.x = -Math.PI / 2;
    pool.position.y = 0.02;
    pool.position.z = 1.6;
    pavilion.add(pool);

    pavilion.position.set(0, 0, 0);
    group.add(pavilion);
    elements.push({ mesh: pavilion, type: "pavilion", restY: 0 });

    // ---- Boundary walls ----
    var wallMat = mat(0xfafafa, 0.7, 0.05);
    var wallH = 0.45;
    var wallSpec = [
      { x: 0,  z: 9,  w: 18, d: 0.18 },
      { x: 0,  z: -9, w: 18, d: 0.18 },
      { x: 9,  z: 0,  w: 0.18, d: 18 },
      { x: -9, z: 0,  w: 0.18, d: 18 }
    ];
    wallSpec.forEach(function (s) {
      var wall = new THREE.Mesh(new THREE.BoxGeometry(s.w, wallH, s.d), wallMat);
      wall.position.set(s.x, wallH / 2, s.z);
      wall.castShadow = !isMobile;
      wall.receiveShadow = !isMobile;
      group.add(wall);
      elements.push({ mesh: wall, type: "wall", restY: wallH / 2 });
    });

    // ---- Decorative gateway ----
    var gateway = new THREE.Group();
    [-2, 2].forEach(function (x) {
      var post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.22, 1.6, 12),
        mat(0xffffff, 0.5, 0.1)
      );
      post.position.set(x, 0.8, 9);
      post.castShadow = !isMobile;
      gateway.add(post);
    });
    var arch = new THREE.Mesh(
      new THREE.BoxGeometry(4.4, 0.15, 0.3),
      new THREE.MeshStandardMaterial({ color: 0xe8c074, metalness: 0.78, roughness: 0.18 })
    );
    arch.position.set(0, 1.65, 9);
    gateway.add(arch);
    group.add(gateway);
    elements.push({ mesh: gateway, type: "gateway", restY: 0 });
  }

  function setInitialState() {
    elements.forEach(function (el) {
      el.mesh.scale.set(0.001, 0.001, 0.001);
      el.mesh.position.y = el.restY + 6; // start floating above
    });
  }

  function assemble() {
    if (assembled) return;
    assembled = true;
    if (sectionEl) sectionEl.classList.add("appear");

    if (!hasGsap) {
      // Fallback: snap into place
      elements.forEach(function (el) {
        el.mesh.scale.set(1, 1, 1);
        el.mesh.position.y = el.restY;
      });
      return;
    }

    elements.forEach(function (el, idx) {
      var delay = idx * 0.035;
      gsap.to(el.mesh.scale, {
        x: 1, y: 1, z: 1,
        duration: 1.0 + Math.random() * 0.25,
        delay: delay,
        ease: "back.out(1.5)"
      });
      gsap.to(el.mesh.position, {
        y: el.restY,
        duration: 1.1,
        delay: delay,
        ease: "power3.out"
      });
    });
  }

  function disassemble() {
    if (!assembled) return;
    assembled = false;
    if (sectionEl) sectionEl.classList.remove("appear");

    if (!hasGsap) {
      setInitialState();
      return;
    }

    elements.forEach(function (el, idx) {
      var delay = idx * 0.015;
      gsap.to(el.mesh.scale, {
        x: 0.001, y: 0.001, z: 0.001,
        duration: 0.55,
        delay: delay,
        ease: "power2.in"
      });
      gsap.to(el.mesh.position, {
        y: el.restY + 6,
        duration: 0.65,
        delay: delay,
        ease: "power2.in"
      });
    });
  }

  function onResize() {
    if (!canvas) return;
    var w = canvas.clientWidth || window.innerWidth;
    var h = canvas.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }

  function onMouseMove(e) {
    var rect = canvas.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
    mouseY = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
  }
  function onTouchMove(e) {
    if (!e.touches || !e.touches[0]) return;
    var rect = canvas.getBoundingClientRect();
    var t = e.touches[0];
    mouseX = ((t.clientX - rect.left) / rect.width  - 0.5) * 2;
    mouseY = ((t.clientY - rect.top)  / rect.height - 0.5) * 2;
  }
  function onMouseLeave() { mouseX = 0; mouseY = 0; }

  function checkSectionState() {
    if (!window.BMI || !window.BMI.getPos) return;
    var pos = window.BMI.getPos();
    var inSection = Math.abs(pos - IMMERSIVE_INDEX) < SECTION_FUZZ;
    if (inSection && !assembled)  assemble();
    if (!inSection && assembled) disassemble();
  }

  function animate() {
    requestAnimationFrame(animate);
    checkSectionState();

    // Skip render when far from this section (perf)
    if (window.BMI && window.BMI.getPos) {
      var pos = window.BMI.getPos();
      if (Math.abs(pos - IMMERSIVE_INDEX) > 1.05) {
        return; // don't render, save GPU
      }
    }

    var dt = clock.getDelta();

    // Hover-to-inspect (smooth tween toward mouse)
    targetRotY += (mouseX * 0.45 - targetRotY) * 0.06;
    targetRotX += (-mouseY * 0.18 - targetRotX) * 0.06;
    group.rotation.y = targetRotY + 0.35; // slight base rotation
    group.rotation.x = targetRotX;

    // Gentle camera orbit
    var t = performance.now() * 0.00018;
    camera.position.x = Math.cos(t) * 12.5;
    camera.position.z = Math.sin(t) * 12.5;
    camera.position.y = 8 + Math.sin(t * 1.3) * 0.6;
    camera.lookAt(0, 0.5, 0);

    renderer.render(scene, camera);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
