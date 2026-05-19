"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SideActions from "../components/SideActions";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";

const CityScene = dynamic(() => import("./CityScene"), { ssr: false });

/* ─── COLOR TOKENS ─── */
const C = {
  bg:         "#030d07",
  bgWhite:    "#ffffff",
  bgSection:  "#f8fef8",
  bgGray:     "#f3f4f6",
  bgDark:     "#071a0e",
  bgDark2:    "#0a1628",
  green:      "#16a34a",
  greenDark:  "#14532d",
  greenLight: "#dcfce7",
  greenMid:   "#22c55e",
  greenFoot:  "#a8d5a2",
  yellow:     "#d97706",
  yellowLight:"#fef9c3",
  red:        "#dc2626",
  redLight:   "#fee2e2",
  blue:       "#1e3a8a",
  blueLight:  "#dbeafe",
  text:       "#1c3a1c",
  body:       "#374151",
  muted:      "#6b7280",
  border:     "#d1fae5",
  borderGray: "#e5e7eb",
  shadow:     "0 1px 3px rgba(0,0,0,0.08)",
  shadowMd:   "0 4px 12px rgba(0,0,0,0.08)",
  shadowLg:   "0 10px 30px rgba(0,0,0,0.12)",
};

/* ─── NAV MENUS ─── */
const NAV_MENUS = {
  projects: [
    { label: "BMI Garden City",      sub: "Off NH 207, Devanahalli",       href: "/home-v1/our-projects/garden-city" },
    { label: "BMI North Metro City", sub: "Adjacent to Amity University",  href: "/home-v1/our-projects/north-metro-city" },
    { label: "Upcoming Projects",    sub: "Coming soon — North Bengaluru", href: "/home-v1/our-projects" },
  ],
  apply: [
    { label: "Membership Registration",  sub: "Join the co-operative society",  href: "/home-v1/membership" },
    { label: "Application Registration", sub: "Submit your application form",   href: "/home-v1/application-registration" },
  ],
};

/* ─── DROPDOWN PANEL ─── */
function DropdownPanel({ items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.16 }}
      className="absolute top-full left-0 mt-2 w-64 rounded-xl overflow-hidden z-50"
      style={{ background: C.bgWhite, border: `1px solid ${C.border}`, boxShadow: C.shadowLg }}
    >
      {items.map((item) => (
        <a key={item.label} href={item.href || "#"}
          className="flex flex-col gap-0.5 px-4 py-3.5 text-left hover:bg-green-50 transition-colors group border-b last:border-b-0"
          style={{ borderColor: C.border, display: "block" }}>
          <span className="text-[13px] font-semibold group-hover:text-green-700 transition-colors" style={{ color: C.text }}>{item.label}</span>
          <span className="text-[11px]" style={{ color: C.muted }}>{item.sub}</span>
        </a>
      ))}
    </motion.div>
  );
}

/* ─── LIGHT FEATURE CARD (3D tilt) ─── */
function FeatureCard({ icon, title, desc, accent, delay = 0 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(sy, [-55, 55], [8, -8]);
  const rotateY = useTransform(sx, [-55, 55], [-8, 8]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left - r.width / 2);
        y.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative p-7 rounded-2xl overflow-hidden group cursor-default"
      style={{
        background: "#ffffff",
        border: `1px solid ${accent}22`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)`,
      }}
    >
      {/* Top accent glow bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}0a 0%, transparent 65%)` }}
      />
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: [-3, 3, -3, 0] }}
        transition={{ duration: 0.4 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}25` }}
      >
        {icon}
      </motion.div>
      <h3 className="font-bold text-lg mb-3" style={{ color: C.text }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: C.body }}>{desc}</p>
      <motion.div
        whileHover={{ x: 4 }}
        className="mt-5 text-[10px] tracking-[0.25em] uppercase font-bold flex items-center gap-1"
        style={{ color: accent }}
      >
        Learn More →
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════ */
export default function HomeV1Client() {
  const scrollProgressRef = useRef(0);
  const [openMenu, setOpenMenu] = useState(null);

  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change", (v) => { scrollProgressRef.current = v; });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  /* Mouse parallax */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  /* Layer transforms */
  const l1x = useTransform(springX, [-1, 1], [-12, 12]);
  const l1y = useTransform(springY, [-1, 1], [-12, 12]);
  const l2x = useTransform(springX, [-1, 1], [-28, 28]);
  const l2y = useTransform(springY, [-1, 1], [-28, 28]);
  const l3x = useTransform(springX, [-1, 1], [-45, 45]);
  const l3y = useTransform(springY, [-1, 1], [-45, 45]);

  function handleHeroMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width * 2 - 1;
    const ny = (e.clientY - rect.top) / rect.height * 2 - 1;
    mouseX.set(nx);
    mouseY.set(ny);
  }

  return (
    <div style={{ background: "#ffffff" }} onClick={() => setOpenMenu(null)}>

      {/* ── Floating side actions ── */}
      <SideActions />

      {/* ── Scroll progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left"
        style={{ scaleX: scrollYProgress, background: `linear-gradient(90deg, ${C.green}, ${C.greenMid}, ${C.yellow})` }}
      />

      {/* ════════════════════════════════════
          NAVIGATION
      ════════════════════════════════════ */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}
      >
        {/* Main row */}
        <div className="px-6 lg:px-10 py-3 flex items-center justify-between gap-4">
          <a href="/home-v1" className="flex items-center gap-2.5 shrink-0 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src="https://www.bmihousing.com/wp-content/uploads/2023/07/11111-1024x1024.png"
              alt="BMI" className="w-10 h-10 rounded-full object-contain"
              whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="hidden sm:block leading-none">
              <div className="font-bold text-[14px]" style={{ color: C.greenDark }}>BMI Housing</div>
              <div className="text-[8px] tracking-[0.3em] uppercase mt-0.5" style={{ color: C.muted }}>Co-Op Society · Est. 2022</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-0.5">
            {[
              { label: "Home",         href: "/home-v1" },
              { label: "E Brochure",   href: "/home-v1/e-brochure" },
              { label: "Our Projects", href: "/home-v1/our-projects", menu: "projects" },
              { label: "About Us",     href: "/home-v1/our-projects#about" },
            ].map((lk) => (
              <div key={lk.label} className="relative" onClick={lk.menu ? (e) => e.stopPropagation() : undefined}>
                {lk.menu ? (
                  <motion.button
                    onClick={() => setOpenMenu(openMenu === lk.menu ? null : lk.menu)}
                    whileHover={{ backgroundColor: "#f0fdf4" }}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors hover:text-green-700"
                    style={{ color: C.text }}
                  >
                    {lk.label}
                    <motion.svg
                      animate={{ rotate: openMenu === lk.menu ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </motion.svg>
                  </motion.button>
                ) : (
                  <motion.a
                    href={lk.href}
                    whileHover={{ backgroundColor: "#f0fdf4" }}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors hover:text-green-700"
                    style={{ color: lk.label === "Home" ? C.green : C.text }}
                  >
                    {lk.label}
                  </motion.a>
                )}
                <AnimatePresence>
                  {lk.menu && openMenu === lk.menu && <DropdownPanel items={NAV_MENUS[lk.menu]} />}
                </AnimatePresence>
              </div>
            ))}

            {/* Apply Now — dropdown with both forms */}
            <div className="relative ml-2" onClick={(e) => e.stopPropagation()}>
              <motion.button
                onClick={() => setOpenMenu(openMenu === "apply" ? null : "apply")}
                whileHover={{ scale: 1.04, boxShadow: `0 6px 20px ${C.green}40` }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-bold text-white relative overflow-hidden group"
                style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)" }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.6 }}
                />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5 shrink-0">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                </svg>
                Apply Now
                <motion.svg
                  animate={{ rotate: openMenu === "apply" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                >
                  <path d="M6 9l6 6 6-6" />
                </motion.svg>
              </motion.button>
              <AnimatePresence>
                {openMenu === "apply" && <DropdownPanel items={NAV_MENUS.apply} />}
              </AnimatePresence>
            </div>
          </nav>

          <motion.button
            whileHover={{ scale: 1.04, boxShadow: `0 8px 24px ${C.green}55` }}
            whileTap={{ scale: 0.96 }}
            className="shrink-0 px-6 py-2.5 rounded-lg text-[13px] font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, boxShadow: `0 2px 10px ${C.green}33` }}
          >
            Contact Us
          </motion.button>
        </div>

        {/* Sub-row */}
        <div className="px-6 lg:px-10 py-1.5 flex items-center gap-1 text-[11px]"
          style={{ borderTop: `1px solid ${C.border}`, background: C.bgSection }}>
          <a href="#" className="hover:underline" style={{ color: C.green }}>Disclaimer</a>
          <span style={{ color: C.muted }}>/</span>
          <a href="#" className="hover:underline" style={{ color: C.green }}>Privacy Policy</a>
          <span className="ml-auto text-[10px] tracking-[0.2em] uppercase" style={{ color: C.muted }}>
            Reg. No: JRB/RGN/CR-13/51578/2022-23
          </span>
        </div>
      </motion.header>

      {/* ════════════════════════════════════
          HERO — fullscreen video + mouse parallax
      ════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "100svh" }}
      >
        <video
          src="/hero.mp4"
          autoPlay loop muted playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      {/* ════════════════════════════════════
          FEATURE CARDS — dark bg with 3D wireframe bg
      ════════════════════════════════════ */}
      <section
        className="relative px-6 lg:px-10 py-28 overflow-hidden"
        style={{ background: "#f8fef8" }}
      >
        {/* 3D wireframe rotating shapes */}
        {[
          { top: "8%",  left: "4%",  w: 320, dur: 22, rx: [0, 360], ry: [0, 180], delay: 0 },
          { top: "60%", left: "72%", w: 260, dur: 18, rx: [0, -360], ry: [0, 360], delay: 1.5 },
          { top: "20%", left: "82%", w: 180, dur: 30, rx: [0, 180], ry: [0, 360], delay: 0.8 },
          { top: "70%", left: "10%", w: 200, dur: 35, rx: [0, 360], ry: [0, -180], delay: 2 },
          { top: "42%", left: "45%", w: 150, dur: 26, rx: [0, -180], ry: [0, 360], delay: 1 },
        ].map((s, i) => (
          <motion.div
            key={i}
            animate={{ rotateX: s.rx, rotateY: s.ry }}
            transition={{ duration: s.dur, repeat: Infinity, ease: "linear", delay: s.delay }}
            style={{
              position: "absolute",
              top: s.top,
              left: s.left,
              width: s.w,
              height: s.w,
              borderRadius: "50%",
              border: "1px solid rgba(22,163,74,0.10)",
              pointerEvents: "none",
              transformStyle: "preserve-3d",
            }}
          />
        ))}

        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(22,163,74,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(22,163,74,0.4) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px" style={{ background: C.green }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.green }}>Why BMI Housing</span>
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight" style={{ color: C.text }}>
              Built for the Future of{" "}
              <span style={{ background: `linear-gradient(90deg, ${C.green}, ${C.greenMid})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Urban Living
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 — Metro Connectivity */}
            <FeatureCard
              delay={0}
              accent={C.greenMid}
              title="Metro Connectivity"
              desc="Adjacent to ITIR Tech Park (12,000 acres), Amity & Gitam Universities, Harrow International School, and minutes from Kempegowda International Airport."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7">
                  <rect x="4" y="3" width="16" height="16" rx="2"/>
                  <path d="M4 11h16"/>
                  <path d="M12 3v8"/>
                  <circle cx="8.5" cy="17" r="1"/>
                  <circle cx="15.5" cy="17" r="1"/>
                  <path d="M7.5 21l1.5-2 1.5 2 1.5-2 1.5 2 1.5-2 1.5 2"/>
                </svg>
              }
            />
            {/* Card 2 — Smart-Home Ready */}
            <FeatureCard
              delay={0.12}
              accent={C.yellow}
              title="Smart-Home Ready"
              desc="Underground electricity, 24/7 water supply, 60ft wide roads, themed clubhouse & swimming pool — infrastructure for tomorrow's lifestyle."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              }
            />
            {/* Card 3 — Secure Co-Op Investment */}
            <FeatureCard
              delay={0.24}
              accent={C.red}
              title="Secure Co-Op Investment"
              desc="Government-registered co-operative society. Bank loans up to 90%. RERA, DTCP & BMRDA approved layouts in North Bengaluru's fastest-appreciating zone."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7">
                  <line x1="3" y1="22" x2="21" y2="22"/>
                  <line x1="6" y1="18" x2="6" y2="11"/>
                  <line x1="10" y1="18" x2="10" y2="11"/>
                  <line x1="14" y1="18" x2="14" y2="11"/>
                  <line x1="18" y1="18" x2="18" y2="11"/>
                  <polygon points="12 2 20 7 4 7"/>
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          3D CITY — full 100vh
      ════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ height: "100vh", background: "#030d07" }}>
        {/* CityScene fills all */}
        <div className="absolute inset-0">
          <CityScene scrollProgressRef={scrollProgressRef} />
        </div>

        {/* Frosted title card top-left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-8 left-6 lg:left-10 z-10 px-6 py-4 rounded-2xl"
          style={{
            background: "rgba(3,13,7,0.65)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(34,197,94,0.2)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
          }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-5 h-px" style={{ background: C.greenMid }} />
            <span className="text-[9px] tracking-[0.5em] uppercase font-semibold" style={{ color: C.greenMid }}>Interactive 3D</span>
          </div>
          <h2 className="font-extrabold text-xl md:text-2xl text-white leading-tight">
            Visualise the{" "}
            <span style={{ background: `linear-gradient(90deg, ${C.yellow}, #fbbf24)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              City of Tomorrow
            </span>
          </h2>
          <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
            Drag to rotate · scroll to zoom
          </p>
        </motion.div>

        {/* Floating info badges */}
        {[
          { label: "80 Buildings",    top: "18%", right: "6%",  delay: 0.5,  dy: [0, -8, 0] },
          { label: "2,400 Particles", top: "38%", right: "4%",  delay: 0.8,  dy: [0, 8, 0] },
          { label: "Interactive 3D",  top: "58%", right: "7%",  delay: 1.1,  dy: [0, -6, 0] },
        ].map((b) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: b.delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            animate={{ y: b.dy }}
            style={{
              position: "absolute",
              top: b.top,
              right: b.right,
              zIndex: 10,
            }}
          >
            <motion.div
              animate={{ y: b.dy }}
              transition={{ duration: 3 + b.delay, repeat: Infinity, ease: "easeInOut" }}
              className="px-4 py-2 rounded-full text-[11px] font-semibold text-white"
              style={{
                background: "rgba(3,13,7,0.7)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${C.greenMid}40`,
                boxShadow: `0 0 16px ${C.greenMid}20`,
              }}
            >
              <span style={{ color: C.greenMid }} className="mr-1.5">●</span>
              {b.label}
            </motion.div>
          </motion.div>
        ))}
      </section>

      {/* ════════════════════════════════════
          FOOTER — minimal dark
      ════════════════════════════════════ */}
      <footer style={{ background: C.bgSection, borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.bmihousing.com/wp-content/uploads/2023/07/11111-1024x1024.png"
              alt="BMI"
              className="w-10 h-10 rounded-full object-contain p-1"
              style={{ background: C.greenLight }}
            />
            <div>
              <div className="font-bold text-[14px]" style={{ color: C.greenDark }}>BMI Housing</div>
              <div className="text-[9px] tracking-[0.25em] uppercase" style={{ color: C.muted }}>Co-Op Society · Est. 2022</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 text-[12px]" style={{ color: C.muted }}>
            <a href="/home-v1" className="hover:text-green-700 transition-colors">Home</a>
            <a href="/home-v1/e-brochure" className="hover:text-green-700 transition-colors">E Brochure</a>
            <a href="/home-v1/our-projects" className="hover:text-green-700 transition-colors">Our Projects</a>
            <a href="/home-v1/our-projects#about" className="hover:text-green-700 transition-colors">About Us</a>
          </div>

          {/* Copyright */}
          <div className="text-[11px]" style={{ color: C.muted }}>
            © 2024–2025 BMI Housing. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
