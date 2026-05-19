"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ── Real Unsplash images, one per service ── */
const services = [
  {
    title: "Legal & Approvals",
    desc: "RERA, DTCP & BMRDA approved plots with crystal-clear title documentation.",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
    accent: "#22c55e",
    icon: <LegalIcon />,
  },
  {
    title: "Easy Finance",
    desc: "Bank tie-ups for home loans up to 90% — with a simple 4-instalment plan.",
    img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80",
    accent: "#f59e0b",
    icon: <FinanceIcon />,
  },
  {
    title: "Architectural Design",
    desc: "Custom villa & home designs by award-winning architects, built around your vision.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
    accent: "#6366f1",
    icon: <ArchIcon />,
  },
  {
    title: "Construction",
    desc: "Turnkey home construction with premium-grade materials and strict quality checks.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    accent: "#ef4444",
    icon: <BuildIcon />,
  },
  {
    title: "Resale Support",
    desc: "Hassle-free resale with a verified buyer & seller network and full paperwork assistance.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    accent: "#0ea5e9",
    icon: <ResaleIcon />,
  },
  {
    title: "24 / 7 Member Support",
    desc: "A dedicated relationship manager for every BMI member — always reachable.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
    accent: "#a855f7",
    icon: <SupportIcon />,
  },
];

/* ── Mouse-tracking 3-D tilt card ── */
function Card3D({ children, className = "" }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 260, damping: 28 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 260, damping: 28 });
  const shineX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const leave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={`relative cursor-default ${className}`}
    >
      {children}
      {/* gloss overlay */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: useTransform(
            [shineX, shineY],
            ([x, y]) =>
              `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.18) 0%, transparent 60%)`
          ),
        }}
      />
    </motion.div>
  );
}

export default function Services() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-slate">
      <div className="scene-content">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-2"
        >
          <span className="w-8 h-px bg-gold" />
          <span className="text-gold tracking-[0.4em] uppercase text-[10px]">Services</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="font-serif text-3xl md:text-4xl lg:text-[2.8rem] mb-7 leading-tight text-pearl"
        >
          Why Choose{" "}
          <em className="text-gold not-italic">BMI Housing</em>
        </motion.h2>

        {/* ── 3-D Service Grid ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          style={{ perspective: "1200px" }}
        >
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
            >
              <Card3D className="h-full">
                <div
                  className="relative overflow-hidden rounded-xl border border-black/6 shadow-sm"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-100 hover:scale-105"
                    style={{ backgroundImage: `url('${s.img}')` }}
                  />
                  {/* Gradient overlay — keeps text readable */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/90 to-white/97" />

                  {/* Content — sits above overlay */}
                  <div className="relative z-10 p-5">
                    {/* 3-D icon badge */}
                    <div
                      className="mb-4 w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${s.accent}22 0%, ${s.accent}44 100%)`,
                        boxShadow: `4px 4px 0 ${s.accent}44, 8px 8px 0 ${s.accent}22, 0 12px 24px ${s.accent}22`,
                        transform: "translateZ(20px)",
                        border: `1.5px solid ${s.accent}55`,
                      }}
                    >
                      <div style={{ color: s.accent }} className="w-7 h-7">
                        {s.icon}
                      </div>
                    </div>

                    <h3 className="font-serif text-[1.05rem] text-pearl mb-1.5 font-semibold">
                      {s.title}
                    </h3>
                    <p className="text-pearl/60 text-[12.5px] leading-relaxed font-light">
                      {s.desc}
                    </p>

                    {/* Accent bar */}
                    <div
                      className="mt-4 h-[2px] w-8 rounded-full transition-all duration-500 group-hover:w-full"
                      style={{ background: s.accent }}
                    />
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-7 grid grid-cols-4 divide-x divide-black/8 border border-black/8 rounded-xl overflow-hidden bg-white shadow-sm"
        >
          {[
            { val: "60ft",  label: "Main Roads" },
            { val: "100%",  label: "Underground Utilities" },
            { val: "24/7",  label: "Water & Power" },
            { val: "10+",   label: "Projects" },
          ].map((stat) => (
            <div key={stat.label} className="px-5 py-3.5 text-center">
              <div className="font-serif text-xl text-gold font-semibold">{stat.val}</div>
              <div className="text-pearl/50 text-[9.5px] tracking-[0.22em] uppercase mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════ SVG Icons ══════════════ */
function LegalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  );
}
function FinanceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="16"/>
      <line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
  );
}
function ArchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="12" cy="12" r="3"/>
      <line x1="12" y1="3" x2="12" y2="9"/>
      <line x1="12" y1="15" x2="12" y2="21"/>
      <line x1="3" y1="12" x2="9" y2="12"/>
      <line x1="15" y1="12" x2="21" y2="12"/>
    </svg>
  );
}
function BuildIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="3" y="9" width="18" height="12" rx="1"/>
      <path d="M8 9V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4"/>
      <line x1="12" y1="14" x2="12" y2="17"/>
      <line x1="9" y1="14" x2="9" y2="17"/>
      <line x1="15" y1="14" x2="15" y2="17"/>
    </svg>
  );
}
function ResaleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polyline points="17 1 21 5 17 9"/>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
      <polyline points="7 23 3 19 7 15"/>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  );
}
function SupportIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
    </svg>
  );
}
