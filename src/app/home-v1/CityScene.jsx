"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ─── Deterministic seeded random (no randomness on re-render) ─── */
function sr(seed) {
  const x = Math.sin(seed + 1) * 43758.5453;
  return x - Math.floor(x);
}

/* ─── Individual building ─── */
function Building({ pos, height, width, isGold }) {
  const meshRef = useRef();
  const color = isGold ? "#f59e0b" : "#3b82f6";

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.material.emissiveIntensity =
        0.18 + Math.sin(t * 0.6 + pos[0] * 1.3) * 0.06;
    }
  });

  return (
    <group position={pos}>
      {/* Main body */}
      <mesh ref={meshRef} position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[width, height, width]} />
        <meshStandardMaterial
          color="#03030c"
          emissive={color}
          emissiveIntensity={0.2}
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Rooftop beacon */}
      <mesh position={[0, height + 0.03, 0]}>
        <boxGeometry args={[width * 0.4, 0.06, width * 0.4]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

/* ─── City of 80 procedural buildings ─── */
function Buildings() {
  const data = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => {
      const angle = sr(i * 3.71) * Math.PI * 2;
      const radius = sr(i * 5.31) * 6.5 + 1.2;
      return {
        pos: [Math.cos(angle) * radius, -0.5, Math.sin(angle) * radius],
        height: sr(i * 7.11) * 2.8 + 0.3,
        width: sr(i * 11.31) * 0.3 + 0.1,
        isGold: sr(i * 13.71) > 0.6,
      };
    }), []);

  return (
    <>
      {data.map((b, i) => (
        <Building key={i} pos={b.pos} height={b.height} width={b.width} isGold={b.isGold} />
      ))}
    </>
  );
}

/* ─── Metro lines ─── */
function MetroLines() {
  const lines = useMemo(() => [
    { pts: [[-9,0.04,-9],[-4,0.04,-2],[0,0.04,0],[4,0.04,2],[9,0.04,9]],  color:"#f59e0b", w:2.5 },
    { pts: [[-9,0.04, 9],[-4,0.04, 4],[0,0.04,0],[4,0.04,-4],[9,0.04,-9]], color:"#f59e0b", w:2.5 },
    { pts: [[-9,0.04, 0],[0,0.04,0],[9,0.04,0]], color:"#60a5fa", w:1.5 },
    { pts: [[0,0.04,-9],[0,0.04,0],[0,0.04,9]], color:"#60a5fa", w:1.5 },
  ], []);

  return (
    <>
      {lines.map((l, i) => (
        <Line key={i} points={l.pts} color={l.color} lineWidth={l.w} transparent opacity={0.85} />
      ))}
    </>
  );
}

/* ─── Pulsing center orb (metro hub) ─── */
function CentralOrb() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.material.emissiveIntensity = 0.9 + Math.sin(t * 2.1) * 0.35;
    ref.current.scale.setScalar(1 + Math.sin(t * 1.8) * 0.06);
  });
  return (
    <mesh ref={ref} position={[0, 0.4, 0]}>
      <sphereGeometry args={[0.45, 32, 32]} />
      <meshStandardMaterial
        color="#050515"
        emissive="#f59e0b"
        emissiveIntensity={1}
        metalness={1}
        roughness={0}
      />
    </mesh>
  );
}

/* ─── Gold particle field ─── */
function Particles() {
  const { positions, colors } = useMemo(() => {
    const count = 2400;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (sr(i * 1.13) - 0.5) * 38;
      pos[i * 3 + 1] = sr(i * 2.37) * 22 - 3;
      pos[i * 3 + 2] = (sr(i * 3.71) - 0.5) * 38;
      const isBlue = sr(i * 5.13) > 0.75;
      col[i * 3]     = isBlue ? 0.376 : 0.965;
      col[i * 3 + 1] = isBlue ? 0.647 : 0.620;
      col[i * 3 + 2] = isBlue ? 0.980 : 0.043;
    }
    return { positions: pos, colors: col };
  }, []);

  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={2400} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={2400} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

/* ─── Ground plane + grid ─── */
function Ground() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[35, 35]} />
        <meshStandardMaterial color="#02020b" transparent opacity={0.97} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.49, 0]}>
        <planeGeometry args={[35, 35, 35, 35]} />
        <meshBasicMaterial color="#141428" wireframe transparent opacity={0.28} />
      </mesh>
    </>
  );
}

/* ─── Horizontal rings (city layers) ─── */
function CityRings() {
  const rings = useMemo(() => [
    { r: 3.5, y: 0.04 },
    { r: 6,   y: 0.04 },
    { r: 8.5, y: 0.04 },
  ], []);

  return (
    <>
      {rings.map((ring, i) => {
        const pts = Array.from({ length: 65 }, (_, j) => {
          const a = (j / 64) * Math.PI * 2;
          return [Math.cos(a) * ring.r, ring.y, Math.sin(a) * ring.r];
        });
        return (
          <Line
            key={i}
            points={pts}
            color={i === 1 ? "#f59e0b" : "#1e3a5f"}
            lineWidth={i === 1 ? 1.2 : 0.6}
            transparent
            opacity={i === 1 ? 0.5 : 0.25}
          />
        );
      })}
    </>
  );
}

/* ─── Camera + scene animation driven by scroll ─── */
function Scene({ scrollRef }) {
  const cityRef = useRef();
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t   = clock.getElapsedTime();
    const scr = Math.min(scrollRef.current, 1);

    /* City group rotation */
    if (cityRef.current) {
      cityRef.current.rotation.y = t * 0.04 + scr * Math.PI * 1.6;
      cityRef.current.rotation.x = scr * 0.35 - 0.08;
    }

    /* Camera sweeps in/up as user scrolls */
    const camR = 14 - scr * 5.5;
    const camY = 8  - scr * 4.5;
    camera.position.set(
      Math.sin(t * 0.04) * camR * 0.45,
      camY,
      camR
    );
    camera.lookAt(0, scr * 0.5, 0);
  });

  return (
    <group ref={cityRef}>
      <Ground />
      <CityRings />
      <Buildings />
      <MetroLines />
      <CentralOrb />
      <Particles />

      {/* Lighting */}
      <ambientLight intensity={0.12} color="#08082f" />
      <hemisphereLight skyColor="#05050f" groundColor="#000000" intensity={0.4} />
      <pointLight position={[0, 6, 0]}   intensity={3.5} color="#f59e0b" distance={22} decay={2} />
      <pointLight position={[-7, 4, -7]} intensity={2.2} color="#3b82f6" distance={18} decay={2} />
      <pointLight position={[7, 3,  7]}  intensity={1.8} color="#f59e0b" distance={16} decay={2} />
      <pointLight position={[0, -1, 0]}  intensity={0.8} color="#1e40af" distance={10} decay={2} />
    </group>
  );
}

/* ─── Exported canvas ─── */
export default function CityScene({ scrollProgressRef }) {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.35,
      }}
      camera={{ fov: 42, near: 0.1, far: 120 }}
      style={{ background: "#050508" }}
    >
      <color attach="background" args={["#050508"]} />
      <fog attach="fog" args={["#050508", 20, 45]} />
      <Scene scrollRef={scrollProgressRef} />
      <Stars radius={65} depth={50} count={1800} factor={2.2} saturation={0.1} fade speed={0.25} />
    </Canvas>
  );
}
