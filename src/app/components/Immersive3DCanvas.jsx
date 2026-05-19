"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Procedural 3D site plan rendered with raw Three.js.
 * - Soft slate ground, gold-trimmed pavilion, plot pillars with gold caps,
 *   12 trees, boundary walls, gateway arch.
 * - Mouse-move tilts the layout (hover-to-inspect).
 * - Auto-orbit camera. Cleans up on unmount.
 */
export default function Immersive3DCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x1a1a1a, 18, 36);

    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.set(11, 8, 11);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas, antialias: !isMobile, alpha: true, powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(w, h, false);
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const hemi = new THREE.HemisphereLight(0xc5a059, 0x222222, 0.5);
    hemi.position.set(0, 10, 0);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(8, 12, 6);
    if (!isMobile) {
      dir.castShadow = true;
      dir.shadow.mapSize.set(1024, 1024);
      dir.shadow.camera.near = 1; dir.shadow.camera.far = 40;
      dir.shadow.camera.left = -12; dir.shadow.camera.right = 12;
      dir.shadow.camera.top = 12; dir.shadow.camera.bottom = -12;
      dir.shadow.bias = -0.0005;
    }
    scene.add(dir);
    const fill = new THREE.DirectionalLight(0xc5a059, 0.25);
    fill.position.set(-6, 4, -8);
    scene.add(fill);

    // Materials
    const mat = (color, rough = 0.6, metal = 0.05) =>
      new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal });
    const goldMat   = new THREE.MeshStandardMaterial({ color: 0xc5a059, roughness: 0.18, metalness: 0.85 });
    const slateMat  = mat(0x252525, 0.85);
    const pearlMat  = mat(0xeae8e3, 0.4, 0.1);
    const pathMat   = mat(0x1a1a1a, 0.7);
    const wallMat   = mat(0x303030, 0.7, 0.05);

    // Group
    const group = new THREE.Group();
    scene.add(group);

    // Ground
    const ground = new THREE.Mesh(new THREE.CircleGeometry(11, 64), slateMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = !isMobile;
    group.add(ground);

    // Cross paths
    [[20, 1.4, false], [1.4, 20, true]].forEach(([w, d]) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.03, d), pathMat);
      m.position.y = 0.015;
      m.receiveShadow = !isMobile;
      group.add(m);
    });

    // Plot pillars + gold caps
    const plots = [
      [-5.5,-5.5],[-5.5,-2],[-5.5,2],[-5.5,5.5],
      [-2,-5.5],[-2,5.5],[2,-5.5],[2,5.5],
      [5.5,-5.5],[5.5,-2],[5.5,2],[5.5,5.5]
    ];
    const plotGeo = new THREE.BoxGeometry(0.32, 1.1, 0.32);
    const capGeo  = new THREE.SphereGeometry(0.18, 18, 18);
    const plotMat = mat(0x3a3a3a, 0.45, 0.15);
    plots.forEach(([x, z]) => {
      const p = new THREE.Mesh(plotGeo, plotMat);
      p.position.set(x, 0.55, z); p.castShadow = !isMobile;
      group.add(p);
      const c = new THREE.Mesh(capGeo, goldMat);
      c.position.set(x, 1.22, z); c.castShadow = !isMobile;
      group.add(c);
    });

    // Trees
    const trees = [
      [-3.5,-3.8],[-3.5,3.8],[3.5,-3.8],[3.5,3.8],
      [-7.5,0],[7.5,0],[0,-7.5],[0,7.5],
      [-1.6,1.6],[1.6,-1.6],[-2,-2.2],[2.2,2]
    ];
    const trunkGeo = new THREE.CylinderGeometry(0.09, 0.12, 0.6, 8);
    const folGeo   = new THREE.ConeGeometry(0.45, 1.15, 12);
    const trunkMat = mat(0x4a3324, 0.95);
    const folMat   = mat(0x2a3a2a, 0.6);
    trees.forEach(([x, z]) => {
      const t = new THREE.Group();
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 0.3; trunk.castShadow = !isMobile;
      t.add(trunk);
      const fol = new THREE.Mesh(folGeo, folMat);
      fol.position.y = 1.05; fol.castShadow = !isMobile;
      t.add(fol);
      t.position.set(x, 0, z);
      t.rotation.y = Math.random() * Math.PI;
      group.add(t);
    });

    // Pavilion
    const pavilion = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.9, 1.9), pearlMat);
    base.position.y = 0.45; base.castShadow = !isMobile; base.receiveShadow = !isMobile;
    pavilion.add(base);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(2.85, 0.12, 2.15), goldMat);
    roof.position.y = 0.96; roof.castShadow = !isMobile;
    pavilion.add(roof);
    const pillarGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.9, 12);
    [[-1.18, 0.85],[1.18, 0.85],[-1.18,-0.85],[1.18,-0.85]].forEach(([x, z]) => {
      const pl = new THREE.Mesh(pillarGeo, goldMat);
      pl.position.set(x, 0.45, z); pl.castShadow = !isMobile;
      pavilion.add(pl);
    });
    group.add(pavilion);

    // Walls
    const wallH = 0.45;
    [
      { x: 0,  z: 9,  w: 18, d: 0.18 },
      { x: 0,  z: -9, w: 18, d: 0.18 },
      { x: 9,  z: 0,  w: 0.18, d: 18 },
      { x: -9, z: 0,  w: 0.18, d: 18 }
    ].forEach((s) => {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(s.w, wallH, s.d), wallMat);
      wall.position.set(s.x, wallH / 2, s.z);
      wall.castShadow = !isMobile; wall.receiveShadow = !isMobile;
      group.add(wall);
    });

    // Gateway
    [-2, 2].forEach((x) => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 1.6, 12), pearlMat);
      post.position.set(x, 0.8, 9); post.castShadow = !isMobile;
      group.add(post);
    });
    const arch = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.15, 0.3), goldMat);
    arch.position.set(0, 1.65, 9);
    group.add(arch);

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    let targetRotY = 0, targetRotX = 0;
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      mouseY = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    };
    const onLeave = () => { mouseX = 0; mouseY = 0; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    // Resize
    const onResize = () => {
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H, false);
    };
    window.addEventListener("resize", onResize);

    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      // Ease group rotation toward mouse
      targetRotY += (mouseX * 0.4 - targetRotY) * 0.06;
      targetRotX += (-mouseY * 0.18 - targetRotX) * 0.06;
      group.rotation.y = targetRotY + 0.35;
      group.rotation.x = targetRotX;

      // Slow camera orbit
      const t = performance.now() * 0.00018;
      camera.position.x = Math.cos(t) * 12.5;
      camera.position.z = Math.sin(t) * 12.5;
      camera.position.y = 8 + Math.sin(t * 1.3) * 0.5;
      camera.lookAt(0, 0.5, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose?.();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose?.());
          else obj.material.dispose?.();
        }
      });
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing"
    />
  );
}
