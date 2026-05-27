"use client";

import { useRef } from "react";
import SideActions from "../components/SideActions";
import NavBar from "./components/NavBar";
import SiteFooter from "./components/SiteFooter";
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
            Premium residential plots starting at ₹1,175/sqft — near Kempegowda Airport, ITIR Tech Park &amp; top universities.
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
            <StatBadge value="Govt." label="Registered"    delay={1.26} />
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
              desc="Government-registered co-operative society. Bank loans up to 90%. Layouts approved by DTCP &amp; BMRDA in North Bengaluru's fastest-appreciating zone."
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>}
            />
          </div>
        </div>
      </section>

      {/* ── Shared Footer ── */}
      <SiteFooter />
    </div>
  );
}
