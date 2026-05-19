"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SideActions from "../components/SideActions";
import NavBar from "./components/NavBar";
import SiteFooter from "./components/SiteFooter";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

const CityScene = dynamic(() => import("./CityScene"), { ssr: false });

/* ─── COLOR TOKENS ─── */
const C = {
  bg:         "#ffffff",
  bgSection:  "#f8fef8",
  bgGray:     "#f3f4f6",
  bgDark:     "#071a0e",
  green:      "#16a34a",
  greenDark:  "#14532d",
  greenLight: "#dcfce7",
  greenMid:   "#22c55e",
  yellow:     "#d97706",
  yellowLight:"#fef9c3",
  red:        "#dc2626",
  blue:       "#1e3a8a",
  text:       "#1c3a1c",
  body:       "#374151",
  muted:      "#6b7280",
  border:     "#d1fae5",
  borderGray: "#e5e7eb",
  shadowMd:   "0 4px 12px rgba(0,0,0,0.08)",
  shadowLg:   "0 10px 30px rgba(0,0,0,0.12)",
};

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

/* ─── CONTACT ITEM ─── */
function ContactItem({ icon, label, value, href, delay = 0 }) {
  return (
    <motion.a
      href={href || "#"}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, boxShadow: `0 16px 40px rgba(22,163,74,0.2)` }}
      className="flex flex-col items-center text-center p-8 rounded-2xl group transition-all duration-300"
      style={{ background: "#ffffff", border: `1px solid ${C.border}`, boxShadow: C.shadowMd, textDecoration: "none" }}
    >
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
        style={{ background: C.greenLight, color: C.green }}>
        {icon}
      </div>
      <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-1" style={{ color: C.muted }}>{label}</p>
      <p className="font-bold text-[15px]" style={{ color: C.text }}>{value}</p>
    </motion.a>
  );
}

/* ═══════════════════════════════════════════
   MAIN
═══════════════════════════════════════════ */
export default function HomeV1Client() {
  const scrollProgressRef = useRef(0);
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change", (v) => { scrollProgressRef.current = v; });

  return (
    <div style={{ background: C.bg }}>
      <SideActions />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left"
        style={{ scaleX: scrollYProgress, background: `linear-gradient(90deg, ${C.green}, ${C.greenMid}, ${C.yellow})` }}
      />

      {/* ── Shared Nav ── */}
      <NavBar activePage="home" />

      {/* ════════════════════════════════════
          HERO — fullscreen video + overlay
      ════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden" style={{ height: "100svh" }}>
        {/* Video */}
        <video
          src="/hero.mp4"
          autoPlay loop muted playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(3,13,7,0.55) 0%, rgba(3,13,7,0.35) 40%, rgba(3,13,7,0.72) 100%)" }} />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center" style={{ paddingTop: "100px" }}>
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-bold mb-6"
            style={{ background: "rgba(34,197,94,0.18)", border: "1px solid rgba(34,197,94,0.4)", color: "#86efac" }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
            North Bengaluru's #1 Co-Op Society
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-extrabold text-4xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-white leading-[1.08] mb-6 max-w-5xl"
          >
            Your Dream Plot in{" "}
            <span style={{ background: "linear-gradient(90deg, #22c55e, #86efac)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              North Bengaluru
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-[16px] md:text-[18px] max-w-2xl mb-10 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Premium RERA-approved residential plots starting at ₹1,175/sqft — near Kempegowda Airport, ITIR Tech Park & top universities.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14"
          >
            <motion.a
              href="/home-v1/our-projects"
              whileHover={{ scale: 1.06, boxShadow: "0 12px 36px rgba(22,163,74,0.55)" }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-bold text-white relative overflow-hidden group"
              style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.7 }}
              />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4 shrink-0">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Explore Projects
            </motion.a>
            <motion.a
              href="/home-v1/membership"
              whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.18)" }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-bold text-white"
              style={{ background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.35)", backdropFilter: "blur(8px)" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4 shrink-0">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
              </svg>
              Apply Now
            </motion.a>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <StatBadge value="500+"  label="Members"      delay={1.05} />
            <StatBadge value="2"     label="Projects"      delay={1.12} />
            <StatBadge value="90%"   label="Bank Loan"     delay={1.19} />
            <StatBadge value="RERA"  label="Approved"      delay={1.26} />
            <StatBadge value="₹1,175" label="Starting/sqft" delay={1.33} />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-9 rounded-full flex items-start justify-center p-1.5"
            style={{ border: "2px solid rgba(255,255,255,0.35)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </motion.div>
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>Scroll</span>
        </motion.div>
      </section>

      {/* ════════════════════════════════════
          FEATURE CARDS
      ════════════════════════════════════ */}
      <section className="relative px-6 lg:px-10 py-28 overflow-hidden" style={{ background: C.bgSection }}>
        {/* Rotating wireframe circles */}
        {[
          { top: "8%",  left: "4%",  w: 320, dur: 22, rx: [0, 360], ry: [0, 180], delay: 0 },
          { top: "60%", left: "72%", w: 260, dur: 18, rx: [0, -360], ry: [0, 360], delay: 1.5 },
          { top: "20%", left: "82%", w: 180, dur: 30, rx: [0, 180], ry: [0, 360], delay: 0.8 },
          { top: "70%", left: "10%", w: 200, dur: 35, rx: [0, 360], ry: [0, -180], delay: 2 },
        ].map((s, i) => (
          <motion.div
            key={i}
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
            <FeatureCard delay={0} accent={C.greenMid} title="Metro Connectivity"
              desc="Adjacent to ITIR Tech Park (12,000 acres), Amity & Gitam Universities, Harrow International School, and minutes from Kempegowda International Airport."
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7"><rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><circle cx="8.5" cy="17" r="1"/><circle cx="15.5" cy="17" r="1"/><path d="M7.5 21l1.5-2 1.5 2 1.5-2 1.5 2 1.5-2 1.5 2"/></svg>}
            />
            <FeatureCard delay={0.12} accent={C.yellow} title="Smart-Home Ready"
              desc="Underground electricity, 24/7 water supply, 60ft wide roads, themed clubhouse & swimming pool — infrastructure for tomorrow's lifestyle."
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
            />
            <FeatureCard delay={0.24} accent={C.red} title="Secure Co-Op Investment"
              desc="Government-registered co-operative society. Bank loans up to 90%. RERA, DTCP & BMRDA approved layouts in North Bengaluru's fastest-appreciating zone."
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          PROJECT TEASER CARDS
      ════════════════════════════════════ */}
      <section className="px-6 lg:px-10 py-24" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: C.green }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.green }}>Explore</span>
              <span className="w-8 h-px" style={{ background: C.green }} />
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight" style={{ color: C.text }}>
              Our{" "}
              <span style={{ background: `linear-gradient(90deg, ${C.green}, ${C.greenMid})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Projects
              </span>
            </h2>
            <p className="mt-4 text-[15px] max-w-xl mx-auto" style={{ color: C.body }}>
              Click on a project to explore full details, pricing, amenities and more.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Garden City */}
            <motion.a
              href="/home-v1/our-projects/garden-city"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(22,163,74,0.18)" }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer block"
              style={{ boxShadow: C.shadowLg, textDecoration: "none" }}
            >
              <div className="relative h-64 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://www.bmihousing.com/wp-content/uploads/2023/07/Garden-City.jpg"
                  alt="BMI Garden City"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"; }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,26,14,0.85) 0%, transparent 50%)" }} />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[11px] font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}>
                  Off NH 207, Devanahalli
                </div>
              </div>
              <div className="p-7" style={{ background: "#ffffff", borderTop: `3px solid ${C.green}` }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-extrabold text-2xl mb-1" style={{ color: C.text }}>BMI Garden City</h3>
                    <p className="text-[13px]" style={{ color: C.muted }}>North Bengaluru · RERA Approved</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold" style={{ background: C.greenLight, color: C.greenDark }}>₹1,175/sqft</span>
                </div>
                <p className="text-[13px] leading-relaxed mb-5" style={{ color: C.body }}>
                  Premium plots near Kempegowda Airport, ITIR Tech Park, Metro Phase 2A and top educational institutions.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Bank Loan 90%", "4-EMI Plan", "80ft Road", "Club House"].map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-[11px]"
                      style={{ background: C.bgSection, color: C.body, border: `1px solid ${C.border}` }}>{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 font-bold text-[14px] group-hover:gap-3 transition-all" style={{ color: C.green }}>
                  Explore Garden City
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>→</motion.span>
                </div>
              </div>
            </motion.a>

            {/* North Metro City */}
            <motion.a
              href="/home-v1/our-projects/north-metro-city"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(234,88,12,0.18)" }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer block"
              style={{ boxShadow: C.shadowLg, textDecoration: "none" }}
            >
              <div className="relative h-64 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://www.bmihousing.com/wp-content/uploads/2023/07/North-Metro-City.jpg"
                  alt="BMI North Metro City"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"; }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(67,20,7,0.85) 0%, transparent 50%)" }} />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[11px] font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #ea580c, #c2410c)" }}>
                  Adjacent to Amity University
                </div>
              </div>
              <div className="p-7" style={{ background: "#ffffff", borderTop: "3px solid #ea580c" }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-extrabold text-2xl mb-1" style={{ color: C.text }}>BMI North Metro City</h3>
                    <p className="text-[13px]" style={{ color: C.muted }}>North Bengaluru · RERA Approved</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold" style={{ background: "#ffedd5", color: "#c2410c" }}>₹1,199/sqft</span>
                </div>
                <p className="text-[13px] leading-relaxed mb-5" style={{ color: C.body }}>
                  Prime plots adjacent to Amity University, Harrow International School, ITIR Tech Park and Padukone-Dravid Academy.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Bank Loan 90%", "4-EMI Plan", "60ft Road", "Swimming Pool"].map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-[11px]"
                      style={{ background: "#fff7ed", color: C.body, border: "1px solid #fed7aa" }}>{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 font-bold text-[14px] group-hover:gap-3 transition-all" style={{ color: "#ea580c" }}>
                  Explore North Metro City
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}>→</motion.span>
                </div>
              </div>
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-10"
          >
            <motion.a
              href="/home-v1/our-projects"
              whileHover={{ scale: 1.05, boxShadow: `0 10px 30px ${C.green}40` }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-[14px] font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}
            >
              View All Projects &amp; Details →
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════
          3D CITY
      ════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ height: "100vh", background: "#030d07" }}>
        <div className="absolute inset-0">
          <CityScene scrollProgressRef={scrollProgressRef} />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-8 left-6 lg:left-10 z-10 px-6 py-4 rounded-2xl"
          style={{ background: "rgba(3,13,7,0.65)", backdropFilter: "blur(16px)", border: "1px solid rgba(34,197,94,0.2)", boxShadow: "0 4px 32px rgba(0,0,0,0.4)" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-5 h-px" style={{ background: "#22c55e" }} />
            <span className="text-[9px] tracking-[0.5em] uppercase font-semibold" style={{ color: "#22c55e" }}>Interactive 3D</span>
          </div>
          <h2 className="font-extrabold text-xl md:text-2xl text-white leading-tight">
            Visualise the{" "}
            <span style={{ background: `linear-gradient(90deg, ${C.yellow}, #fbbf24)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              City of Tomorrow
            </span>
          </h2>
          <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>Drag to rotate · scroll to zoom</p>
        </motion.div>
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
            transition={{ delay: b.delay, duration: 0.6 }}
            style={{ position: "absolute", top: b.top, right: b.right, zIndex: 10 }}
          >
            <motion.div
              animate={{ y: b.dy }}
              transition={{ duration: 3 + b.delay, repeat: Infinity, ease: "easeInOut" }}
              className="px-4 py-2 rounded-full text-[11px] font-semibold text-white"
              style={{ background: "rgba(3,13,7,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(34,197,94,0.3)", boxShadow: "0 0 16px rgba(34,197,94,0.15)" }}
            >
              <span style={{ color: "#22c55e" }} className="mr-1.5">●</span>
              {b.label}
            </motion.div>
          </motion.div>
        ))}
      </section>

      {/* ════════════════════════════════════
          CONTACT US SECTION
      ════════════════════════════════════ */}
      <section id="contact" className="px-6 lg:px-10 py-24" style={{ background: C.bgSection }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: C.green }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.green }}>Get In Touch</span>
              <span className="w-8 h-px" style={{ background: C.green }} />
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight" style={{ color: C.text }}>
              Contact{" "}
              <span style={{ background: `linear-gradient(90deg, ${C.green}, ${C.greenMid})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Us
              </span>
            </h2>
            <p className="mt-4 text-[15px] max-w-xl mx-auto" style={{ color: C.body }}>
              Have questions? We are here to help. Reach us by phone, email, or visit our office.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <ContactItem delay={0}    label="Call Us"     value="7710556677"            href="tel:7710556677"
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.91 19.79 19.79 0 0 1 1.61 4.28 2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.7a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
            />
            <ContactItem delay={0.08} label="Landline"    value="080 66469061"          href="tel:08066469061"
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.91 19.79 19.79 0 0 1 1.61 4.28 2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.7a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
            />
            <ContactItem delay={0.16} label="Email"       value="info@bmihousing.com"   href="mailto:info@bmihousing.com"
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
            />
            <ContactItem delay={0.24} label="Visit Us"    value="Sahakar Nagar, Bengaluru" href="https://maps.google.com/?q=Sahakar+Nagar+Bangalore"
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
            />
          </div>

          {/* Map + CTA row */}
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl overflow-hidden"
              style={{ boxShadow: C.shadowLg, border: `1px solid ${C.border}`, minHeight: "280px" }}
            >
              <iframe
                title="BMI Housing Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.6153578065257!2d77.57426731482207!3d13.057729990797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17c7b2da4a5b%3A0x5e21dd44d7f0e0e5!2sSahakar%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560092!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0, display: "block", minHeight: "280px" }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl p-8 flex flex-col justify-center"
              style={{ background: `linear-gradient(135deg, ${C.greenDark}, #0d2818)`, boxShadow: C.shadowLg }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-px" style={{ background: "#22c55e" }} />
                <span className="text-[10px] tracking-[0.5em] uppercase font-bold" style={{ color: "#22c55e" }}>Office Address</span>
              </div>
              <h3 className="font-extrabold text-2xl text-white mb-4 leading-snug">
                Visit Our Office in<br />
                <span style={{ color: "#86efac" }}>Sahakar Nagar, Bangalore</span>
              </h3>
              <p className="text-[14px] mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                #28/1, 2nd floor, 1st cross, 15th main E-block,<br />
                Sahakar Nagar, Bangalore – 560 092
              </p>
              <div className="flex flex-col gap-3">
                <motion.a
                  href="tel:7710556677"
                  whileHover={{ scale: 1.04, boxShadow: "0 10px 30px rgba(22,163,74,0.45)" }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[14px] font-bold text-white relative overflow-hidden group"
                  style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}
                >
                  <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)" }}
                    animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.7 }} />
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.91 19.79 19.79 0 0 1 1.61 4.28 2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.7a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  Call: 7710556677
                </motion.a>
                <motion.a
                  href="mailto:info@bmihousing.com"
                  whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[14px] font-bold text-white"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.2)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  info@bmihousing.com
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Shared Footer ── */}
      <SiteFooter />
    </div>
  );
}
