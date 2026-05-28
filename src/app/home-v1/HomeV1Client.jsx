"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import SideActions from "../components/SideActions";
import NavBar from "./components/NavBar";
import SiteFooter from "./components/SiteFooter";
import { Perspective, Highlight } from "@/components/ui/perspective-highlight";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ─── COLOR TOKENS ─── */
const C = {
  bg:         "#ffffff",
  bgSection:  "#f8fef8",
  bgDark:     "#030d07",
  bgDark2:    "#071a0e",
  green:      "#16a34a",
  greenDark:  "#14532d",
  greenLight: "#dcfce7",
  greenMid:   "#22c55e",
  yellow:     "#d97706",
  orange:     "#ea580c",
  red:        "#dc2626",
  text:       "#1c3a1c",
  body:       "#374151",
  muted:      "#6b7280",
  border:     "#d1fae5",
  borderGray: "#e5e7eb",
};

/* ═══════════════════════════════════════
   3D PROJECT CARD  — Perspective Highlight edition
   highlightColor: "green" | "orange" | "yellow" | "red"
═══════════════════════════════════════ */
function ProjectCard3D({ href, image, locationTag, nameEnglish, price, tags, accentColor, highlightColor = "green", ctaLabel, delay = 0 }) {
  return (
    /* Perspective wraps the full card so --rx/--ry/--lift are set here */
    <Perspective
      maxRotateX={9}
      maxRotateY={14}
      smoothing={0.09}
      className="rounded-[28px] overflow-hidden group cursor-pointer"
      cardClassName="relative w-full h-full will-change-transform"
      style={{ height: "420px", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}
    >
      {/* Entry animation wrapper */}
      <motion.a
        href={href}
        initial={{ opacity: 0, y: 70, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
        style={{ textDecoration: "none" }}
      >
        {/* ── Background image with zoom ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={nameEnglish}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* ── Multi-layer gradient overlays ── */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.1) 75%, transparent 100%)" }} />
        {/* Colored tint on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${accentColor}25 0%, transparent 60%)` }}
        />

        {/* ── Glowing border ring on hover ── */}
        <div
          className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 2px ${accentColor}99, 0 0 80px ${accentColor}33` }}
        />

        {/* ── Location badge (top-left) ── */}
        <div
          className="absolute top-5 left-5 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-white z-10"
          style={{
            background: `${accentColor}dd`,
            backdropFilter: "blur(10px)",
            boxShadow: `0 4px 16px ${accentColor}55`,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          {locationTag}
        </div>

        {/* ── Arrow button (top-right) ── */}
        <div
          className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white text-[16px] font-bold opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 z-10"
          style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.3)" }}
        >
          →
        </div>

        {/* ── Content panel (bottom) ── */}
        <div className="absolute bottom-0 left-0 right-0 p-7 translate-y-1 group-hover:translate-y-0 transition-transform duration-300 z-10">
          {/* Price badge — floats on Highlight */}
          <div className="mb-4">
            <Highlight color={highlightColor} className="inline-flex items-center gap-1.5 text-[12px] font-extrabold px-3 py-1.5 rounded-full">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5 shrink-0">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
              {price}
            </Highlight>
          </div>

          {/* English name — floats on Highlight */}
          <h3 className="font-extrabold text-[22px] md:text-[26px] mb-3 leading-tight">
            <Highlight color={highlightColor} className="text-[22px] md:text-[26px] font-extrabold leading-tight px-2 py-1 rounded-[6px]">
              {nameEnglish}
            </Highlight>
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.82)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(6px)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 font-bold text-[14px] group-hover:gap-3 transition-all duration-300" style={{ color: accentColor }}>
          {ctaLabel}
          <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>→</motion.span>
        </div>
      </div>
      </motion.a>
    </Perspective>
  );
}

/* ─── FEATURE CARD (3D tilt) ─── */
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
        boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}0a 0%, transparent 65%)` }}
      />
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
      <motion.div whileHover={{ x: 4 }} className="mt-5 text-[10px] tracking-[0.25em] uppercase font-bold flex items-center gap-1" style={{ color: accent }}>
        Learn More →
      </motion.div>
    </motion.div>
  );
}

/* ─── STAT BADGE ─── */
function StatBadge({ value, label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center px-6 py-4 rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.2)",
        minWidth: "110px",
      }}
    >
      <span className="font-extrabold text-2xl text-white leading-none">{value}</span>
      <span className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.65)" }}>{label}</span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN
═══════════════════════════════════════════ */
export default function HomeV1Client() {
  const scrollProgressRef = useRef(0);
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change", (v) => { scrollProgressRef.current = v; });

  const [navHeight, setNavHeight] = useState(148);
  useLayoutEffect(() => {
    const el = document.getElementById("site-navbar");
    if (!el) return;
    // ResizeObserver fires whenever the navbar changes height (ticker appears, window resize, etc.)
    const ro = new ResizeObserver(() => {
      setNavHeight(el.offsetHeight + 8); // +8px breathing room
    });
    ro.observe(el);
    setNavHeight(el.offsetHeight + 8); // immediate read
    return () => ro.disconnect();
  }, []);

  return (
    <div style={{ background: C.bg }}>
      <SideActions />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left"
        style={{ scaleX: scrollYProgress, background: `linear-gradient(90deg, ${C.green}, ${C.greenMid}, ${C.yellow})` }}
      />

      <NavBar activePage="home" showTicker={true} />

      {/* ── Spacer = dynamic navbar height ── */}
      <div style={{ height: navHeight }} />

      {/* ════════════════════════════════════
          HERO — fullscreen video
      ════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden" style={{ height: "calc(100svh - 134px)" }}>
        <video src="/hero.mp4" autoPlay loop muted playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(3,13,7,0.55) 0%, rgba(3,13,7,0.35) 40%, rgba(3,13,7,0.72) 100%)" }} />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center" style={{ paddingTop: "20px" }}>
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-bold mb-6"
            style={{ background: "rgba(34,197,94,0.18)", border: "1px solid rgba(34,197,94,0.4)", color: "#86efac" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
            North Bengaluru&apos;s #1 Co-Op Society
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-extrabold text-4xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-white leading-[1.08] mb-6 max-w-5xl">
            Your Dream Plot in{" "}
            <span style={{ background: "linear-gradient(90deg, #22c55e, #86efac)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              North Bengaluru
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-[16px] md:text-[18px] max-w-2xl mb-10 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)" }}>
            Premium residential plots starting at ₹1,249/sqft — near Kempegowda Airport, ITIR Tech Park &amp; top universities.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <motion.a href="/our-projects"
              whileHover={{ scale: 1.06, boxShadow: "0 12px 36px rgba(22,163,74,0.55)" }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-bold text-white relative overflow-hidden group"
              style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}>
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)" }}
                animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.7 }} />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4 shrink-0">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Explore Projects
            </motion.a>
            <motion.a href="/membership"
              whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.18)" }} whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-bold text-white"
              style={{ background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.35)", backdropFilter: "blur(8px)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4 shrink-0">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
              </svg>
              Apply Now
            </motion.a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-3">
            <StatBadge value="2,500+" label="Members"       delay={1.05} />
            <StatBadge value="2"     label="Projects"       delay={1.12} />
            <StatBadge value="Govt." label="Registered"     delay={1.19} />
            <StatBadge value="₹1,249" label="Starting/sqft" delay={1.26} />
          </motion.div>
        </div>

      </section>

      {/* ════════════════════════════════════
          OUR PROJECTS — 3D SHOWCASE
      ════════════════════════════════════ */}
      <section className="relative py-28 px-6 lg:px-10 overflow-hidden"
        style={{ background: `linear-gradient(180deg, #050a1a 0%, #0b1535 50%, #050a1a 100%)` }}>

        {/* ── Animated background mesh ── */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{ backgroundImage: "linear-gradient(rgba(34,197,94,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.6) 1px, transparent 1px)", backgroundSize: "70px 70px" }} />

        {/* ── Floating blobs ── */}
        {[
          { top: "-8%",  left: "-5%",  size: 500, color: C.greenMid, dur: 16 },
          { top: "40%",  left: "70%",  size: 420, color: C.yellow,   dur: 22 },
          { top: "70%",  left: "5%",   size: 380, color: C.green,    dur: 18 },
          { top: "15%",  left: "45%",  size: 300, color: "#6366f1",  dur: 24 },
        ].map((b, i) => (
          <motion.div key={i}
            animate={{ x: [0, 25*(i%2===0?1:-1), -15, 0], y: [0, -20*(i%2===0?1:-1), 15, 0] }}
            transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
            style={{
              position: "absolute", top: b.top, left: b.left,
              width: b.size, height: b.size, borderRadius: "50%",
              background: b.color, opacity: 0.07, filter: "blur(80px)",
              pointerEvents: "none", zIndex: 0,
            }}
          />
        ))}

        {/* ── Rotating rings (decorative) ── */}
        {[
          { size: 480, dur: 28, top: "10%", left: "2%", dir: 1 },
          { size: 320, dur: 20, top: "55%", left: "75%", dir: -1 },
        ].map((r, i) => (
          <motion.div key={i}
            animate={{ rotate: r.dir * 360 }}
            transition={{ duration: r.dur, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute", top: r.top, left: r.left,
              width: r.size, height: r.size, borderRadius: "50%",
              border: "1px dashed rgba(34,197,94,0.15)",
              pointerEvents: "none", zIndex: 0,
            }}
          />
        ))}

        <div className="relative max-w-7xl mx-auto z-10">

          {/* ── Section heading ── */}
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-center mb-16">
            <Perspective maxRotateX={10} maxRotateY={18} className="inline-block w-full max-w-3xl">
              <div className="text-center px-8 py-10 rounded-3xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(34,197,94,0.1)" }}>

                <div className="flex items-center justify-center gap-3 mb-5">
                  <span className="w-10 h-px" style={{ background: "rgba(34,197,94,0.5)" }} />
                  <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.greenMid }}>
                    ನಮ್ಮ ಯೋಜನೆಗಳು · Our Projects
                  </span>
                  <span className="w-10 h-px" style={{ background: "rgba(34,197,94,0.5)" }} />
                </div>

                {/* Kannada — large */}
                <h2 className="font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-snug mb-3"
                  style={{ background: "linear-gradient(90deg, #86efac, #22c55e, #86efac)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  ನಿಮ್ಮ ಕನಸಿನ ನಿವೇಶನ ಆಯ್ಕೆ ಮಾಡಿ
                </h2>

                {/* English — with Highlight */}
                <h3 className="font-extrabold text-2xl md:text-3xl text-white tracking-tight mb-5">
                  Choose Your{" "}
                  <Highlight color="green">Dream Plot</Highlight>
                </h3>

                <p className="text-[15px] max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Two premium layouts in North Bengaluru&apos;s fastest-growing corridors — starting at{" "}
                  <Highlight color="yellow">₹1,249/sqft</Highlight>
                </p>
              </div>
            </Perspective>
          </motion.div>

          {/* ── 3D Project Cards ── */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            <ProjectCard3D
              href="/our-projects/garden-city"
              image="/garden-overview.png"
              locationTag="Off NH 648, Devanahalli"
              nameEnglish="BMI Garden City"
              price="₹1,249/sqft"
              accentColor={C.greenMid}
              highlightColor="green"
              ctaLabel="Explore Garden City"
              tags={["4-EMI Plan", "60ft Road", "Club House", "Pool", "Govt. Registered"]}
              delay={0}
            />
            <ProjectCard3D
              href="/our-projects/north-metro-city"
              image="/north-metro-overview.png"
              locationTag="Adjacent to Amity University"
              nameEnglish="BMI North Metro City"
              price="₹1,399/sqft"
              accentColor="#fb923c"
              highlightColor="orange"
              ctaLabel="Explore North Metro City"
              tags={["4-EMI Plan", "60ft Road", "Near Airport", "Amity Univ", "Govt. Registered"]}
              delay={0.15}
            />
          </div>

          {/* ── Bottom CTA strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-14 text-center"
          >
            <motion.a
              href="/our-projects"
              whileHover={{ scale: 1.05, boxShadow: `0 16px 48px ${C.green}55` }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-[15px] font-bold text-white relative overflow-hidden group"
              style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, boxShadow: `0 4px 24px ${C.green}44` }}
            >
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)" }}
                animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.6 }} />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 shrink-0">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              View All Projects &amp; Details
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════
          WHY BMI HOUSING — Feature Cards
      ════════════════════════════════════ */}
      <section className="relative px-6 lg:px-10 py-28 overflow-hidden" style={{ background: C.bgSection }}>
        {/* Rotating wireframe rings */}
        {[
          { top: "8%",  left: "4%",  w: 320, dur: 22, rx: [0, 360], ry: [0, 180], delay: 0 },
          { top: "60%", left: "72%", w: 260, dur: 18, rx: [0, -360], ry: [0, 360], delay: 1.5 },
          { top: "20%", left: "82%", w: 180, dur: 30, rx: [0, 180], ry: [0, 360], delay: 0.8 },
          { top: "70%", left: "10%", w: 200, dur: 35, rx: [0, 360], ry: [0, -180], delay: 2 },
        ].map((s, i) => (
          <motion.div key={i}
            animate={{ rotateX: s.rx, rotateY: s.ry }}
            transition={{ duration: s.dur, repeat: Infinity, ease: "linear", delay: s.delay }}
            style={{
              position: "absolute", top: s.top, left: s.left,
              width: s.w, height: s.w, borderRadius: "50%",
              border: "1px solid rgba(22,163,74,0.10)",
              pointerEvents: "none", transformStyle: "preserve-3d",
            }}
          />
        ))}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(22,163,74,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(22,163,74,0.4) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px" style={{ background: C.green }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.green }}>ಬಿಎಂಐ ಹೌಸಿಂಗ್ ಏಕೆ? / Why BMI Housing</span>
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-snug mb-2" style={{ color: C.green }}>
              ನಗರ ಜೀವನದ ಭವಿಷ್ಯಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ
            </h2>
            <h3 className="font-extrabold text-xl md:text-2xl lg:text-3xl tracking-tight" style={{ color: C.text }}>
              Built for the Future of{" "}
              <span style={{ background: `linear-gradient(90deg, ${C.green}, ${C.greenMid})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Urban Living
              </span>
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard delay={0} accent={C.greenMid} title="Metro Connectivity"
              desc="Adjacent to ITIR Tech Park (12,000 acres), Amity & Gitam Universities, Harrow International School, and minutes from Kempegowda International Airport."
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7"><rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><circle cx="8.5" cy="17" r="1"/><circle cx="15.5" cy="17" r="1"/><path d="M7.5 21l1.5-2 1.5 2 1.5-2 1.5 2 1.5-2 1.5 2"/></svg>}
            />
            <FeatureCard delay={0.12} accent={C.yellow} title="Smart-Home Ready"
              desc="Underground electricity, 24/7 water supply, 60ft wide roads, themed clubhouse & swimming pool — infrastructure for tomorrow's lifestyle."
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
            />
            <FeatureCard delay={0.24} accent={C.red} title="Secure Co-Op Investment"
              desc="Government-registered co-operative society. Flexible 4-EMI payment plan. Layouts approved by DTCP &amp; BMRDA in North Bengaluru's fastest-appreciating zone."
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>}
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
