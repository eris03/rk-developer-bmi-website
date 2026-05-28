"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import NavBar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";

/* ─── COLOR TOKENS ─── */
const C = {
  bg:         "#f0faf0",
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

/* ─── ORBITAL LOGO ─── */
function OrbitalLogo() {
  return (
    <div className="relative w-72 h-72 lg:w-[26rem] lg:h-[26rem] mx-auto select-none">
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.06, 0.18] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(34,197,94,0.35) 0%, transparent 65%)" }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{ border: "1.5px dashed rgba(34,197,94,0.35)" }}
      >
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full"
          style={{ background: C.greenMid, boxShadow: `0 0 14px ${C.greenMid}, 0 0 28px ${C.greenMid}66` }} />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8 rounded-full"
        style={{ border: `1px solid rgba(217,119,6,0.3)` }}
      >
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
          style={{ background: C.yellow, boxShadow: `0 0 10px ${C.yellow}` }} />
      </motion.div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        className="absolute inset-14 rounded-full"
        style={{ border: "1px solid rgba(255,255,255,0.12)" }}
      >
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/50" />
      </motion.div>
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        whileHover={{ scale: 1.04 }}
        className="absolute rounded-full bg-white overflow-hidden flex items-center justify-center"
        style={{
          inset: "5.5rem",
          boxShadow: `0 0 0 3px rgba(34,197,94,0.25), 0 0 50px rgba(34,197,94,0.18), 0 24px 64px rgba(0,0,0,0.4)`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bmi-logo.png" alt="BMI Official Seal" className="w-full h-full object-contain p-3" />
      </motion.div>
    </div>
  );
}

/* ─── BANK DETAIL ROW ─── */
function BankRow({ label, value, mono = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-1"
      style={{ borderBottom: `1px solid ${C.border}` }}
    >
      <span className="text-[12px] tracking-[0.2em] uppercase font-semibold" style={{ color: C.muted }}>{label}</span>
      <span className={`font-bold text-[15px] ${mono ? "font-mono tracking-wider" : ""}`} style={{ color: C.text }}>
        {value}
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   UNIFIED "WHAT MAKES US BETTER" DATA
   (merges BETTER_ITEMS + WHY_CARDS)
═══════════════════════════════════════ */
const UNIFIED_ITEMS = [
  {
    name: "Govt. Registered Society",
    tagline: "Legal & Compliance",
    desc: "100% legal government-registered co-operative society. Layouts approved by DTCP & BMRDA with complete title documentation. Your investment is protected by the full weight of Karnataka law.",
    src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop&auto=format&q=80",
    icon: "🏛️",
  },
  {
    name: "Transparent Pricing",
    tagline: "No Hidden Costs",
    desc: "Starting at ₹1,249/sqft with clear breakdowns and zero hidden charges. The price you see on day one is the price you pay on registration day — always.",
    src: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=600&fit=crop&auto=format&q=80",
    icon: "✅",
  },
  {
    name: "Prime Location",
    tagline: "North Bengaluru",
    desc: "Every BMI project sits minutes from tech corridors, Amity University, and the upcoming Bengaluru North Metro — positioned exactly where the city is growing next.",
    src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop&auto=format&q=80",
    icon: "📍",
  },
  {
    name: "World-Class Amenities",
    tagline: "Premium Infrastructure",
    desc: "Club house, swimming pool, theme parks, 60ft roads, underground drainage and street lighting — every layout is designed for a complete modern lifestyle, not just a plot of land.",
    src: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&h=600&fit=crop&auto=format&q=80",
    icon: "🏊",
  },
  {
    name: "Easy 4-EMI Plan",
    tagline: "Payment Flexibility",
    desc: "Our 4-EMI payment plan breaks your investment into comfortable instalments — no large upfront burden. Premium plot ownership is now within reach for every family.",
    src: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop&auto=format&q=80",
    icon: "💳",
  },
  {
    name: "Trustworthy",
    tagline: "Our Core Promise",
    desc: "Trust is the highest form of human motivation. Every commitment we make, we keep — on time, every time. 2,500+ families trust BMI Housing with their most important investment.",
    src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop&auto=format&q=80",
    icon: "🤝",
  },
  {
    name: "Committed to Delivery",
    tagline: "On-Time, Every Time",
    desc: "Delivering every project on time, every time. Our word is our bond — from booking to final registration. We cannot dodge the consequences of missing our responsibilities.",
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop&auto=format&q=80",
    icon: "🔨",
  },
  {
    name: "Customer Satisfaction",
    tagline: "2,500+ Happy Families",
    desc: "Happy families, lasting relationships — built with every member we serve across Bengaluru. The way our team feels is the way our customers feel. We invest in both.",
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop&auto=format&q=80",
    icon: "😊",
  },
  {
    name: "Expert Guidance",
    tagline: "End-to-End Support",
    desc: "Our experienced team walks with you from site visit to final registration. Every document, every step — explained clearly so you invest with complete confidence and zero confusion.",
    src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop&auto=format&q=80",
    icon: "🧑‍💼",
  },
];

/* ─── BETTER IMAGE CARD ─── */
function BetterImageCard({ item, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.02, boxShadow: "0 20px 50px rgba(0,0,0,0.22)" }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{ height: "280px", boxShadow: "0 6px 24px rgba(0,0,0,0.12)" }}
    >
      {/* Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Gradient */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0.58) 100%)" }} />
      {/* Green hover tint */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(135deg, rgba(22,163,74,0.28) 0%, transparent 65%)" }} />
      {/* Green glow border on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: "inset 0 0 0 2px rgba(34,197,94,0.6)" }} />

      {/* Top content */}
      <div className="absolute top-0 left-0 right-0 p-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-2"
          style={{ background: "rgba(34,197,94,0.22)", border: "1px solid rgba(34,197,94,0.45)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-green-300">BMI Housing</span>
        </div>
        <h3 className="font-extrabold text-[16px] text-white leading-tight drop-shadow-md">{item.name}</h3>
        <p className="text-[11px] mt-0.5 font-semibold" style={{ color: "rgba(134,239,172,0.9)" }}>{item.tagline}</p>
      </div>

      {/* Bottom hover hint */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <span className="text-[11px] font-medium text-white/60">Tap to view details</span>
        <div className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: "rgba(34,197,94,0.35)", border: "1px solid rgba(34,197,94,0.55)" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth={2.5} className="w-3.5 h-3.5">
            <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── UNIFIED GRID MODAL ─── */
function UnifiedGridModal({ items, activeIndex, setActiveIndex, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const active = items[activeIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[999] flex items-center justify-center p-3 md:p-8"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-6xl max-h-[93vh] overflow-y-auto rounded-3xl"
        style={{ background: "#ffffff", boxShadow: "0 60px 180px rgba(0,0,0,0.55)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Sticky header ── */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-7 py-5 rounded-t-3xl"
          style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(14px)", borderBottom: `1px solid ${C.border}` }}>
          <div>
            <div className="text-[10px] tracking-[0.45em] uppercase font-bold mb-0.5" style={{ color: C.green }}>Our Advantages</div>
            <h3 className="font-extrabold text-xl md:text-2xl" style={{ color: C.bgDark2 }}>
              What Makes Us{" "}
              <span style={{ background: `linear-gradient(90deg, ${C.green}, ${C.greenMid})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Better
              </span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            style={{ background: "#f0fdf4", border: `1px solid ${C.border}` }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.greenDark} strokeWidth={2.5}>
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="p-5 md:p-8">
          {/* ── Active item — hero card ── */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl overflow-hidden mb-8"
            style={{
              border: `2px solid ${C.greenMid}`,
              boxShadow: `0 16px 50px rgba(22,163,74,0.22)`,
            }}
          >
            <div className="relative overflow-hidden" style={{ height: "260px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.src} alt={active.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(7,26,14,0.9) 0%, rgba(7,26,14,0.3) 50%, transparent 100%)" }} />
              <div className="absolute bottom-5 left-6 right-6">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-2xl">{active.icon}</span>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase px-3 py-1 rounded-full"
                    style={{ background: "rgba(34,197,94,0.25)", border: "1px solid rgba(34,197,94,0.5)", color: "#86efac" }}>
                    {active.tagline}
                  </span>
                </div>
                <h4 className="font-extrabold text-2xl md:text-3xl text-white leading-tight">{active.name}</h4>
              </div>
            </div>
            <div className="px-7 py-6" style={{ background: "#f8fef8" }}>
              <p className="text-[15px] leading-relaxed" style={{ color: C.body }}>{active.desc}</p>
            </div>
          </motion.div>

          {/* ── All 9 items grid ── */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px" style={{ background: C.green }} />
              <span className="text-[10px] tracking-[0.35em] uppercase font-bold" style={{ color: C.muted }}>
                All Advantages — click any to explore
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item, i) => {
                const isActive = i === activeIndex;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.38 }}
                    whileHover={!isActive ? { y: -3, boxShadow: "0 10px 28px rgba(22,163,74,0.16)" } : {}}
                    onClick={() => setActiveIndex(i)}
                    className="rounded-xl overflow-hidden cursor-pointer group"
                    style={{
                      border: isActive ? `2px solid ${C.greenMid}` : `1px solid ${C.border}`,
                      boxShadow: isActive ? `0 8px 28px rgba(22,163,74,0.2)` : "0 2px 8px rgba(0,0,0,0.05)",
                      transition: "border 0.2s, box-shadow 0.2s",
                    }}
                  >
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden" style={{ height: "120px" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src} alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(7,26,14,0.7) 0%, transparent 55%)" }} />
                      {isActive && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: C.greenMid, boxShadow: `0 2px 8px ${C.greenMid}66` }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-3 h-3">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    {/* Text */}
                    <div className="p-3.5">
                      <div className="flex items-start gap-2">
                        <span className="text-[17px] leading-none mt-0.5">{item.icon}</span>
                        <div>
                          <div className="font-bold text-[13px] leading-snug"
                            style={{ color: isActive ? C.greenDark : C.bgDark2 }}>
                            {item.name}
                          </div>
                          <div className="text-[10px] font-semibold mt-0.5" style={{ color: C.green }}>
                            {item.tagline}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════ */
export default function ProjectsClient() {
  const [showGrid, setShowGrid]     = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div style={{ background: C.bg }}>
      <NavBar activePage="projects" />
      <div style={{ height: "88px" }} />

      {/* ════════════════════════════════════
          SECTION 1 — ABOUT US
      ════════════════════════════════════ */}
      <section id="about" className="relative overflow-hidden py-28"
        style={{ background: `linear-gradient(135deg, ${C.bgDark} 0%, #0d2818 50%, ${C.bgDark2} 100%)` }}>

        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[30rem] h-[30rem] rounded-full pointer-events-none"
          style={{ background: C.green, opacity: 0.07, filter: "blur(90px)" }}
        />
        <motion.div
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0], scale: [1, 0.85, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-20 -right-20 w-[35rem] h-[35rem] rounded-full pointer-events-none"
          style={{ background: C.yellow, opacity: 0.06, filter: "blur(100px)" }}
        />
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px" style={{ background: C.greenMid }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.greenMid }}>About Us</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.08 }}
              className="font-extrabold text-2xl md:text-3xl leading-snug mb-2"
              style={{ color: "#86efac" }}>
              ಬೆಂಗಳೂರು ಮೆಟ್ರೋ ಸಿಟಿ ಇನ್‌ಫ್ರಾಸ್ಟ್ರಕ್ಚರ್ ಹೌಸಿಂಗ್<br />
              ಕೋ-ಆಪರೇಟಿವ್ ಸೊಸೈಟಿ ಲಿ.
            </motion.h2>

            <motion.h3
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.14 }}
              className="font-extrabold text-xl md:text-2xl lg:text-[1.8rem] leading-[1.15] mb-4"
              style={{ color: "#ffffff" }}>
              Bengaluru Metro City{" "}
              <span style={{ background: `linear-gradient(90deg, ${C.greenMid}, #86efac)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Infrastructure
              </span>
              <br />
              Housing Co-Operative{" "}
              <span style={{ background: `linear-gradient(90deg, ${C.yellow}, #fbbf24)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Society LTD.
              </span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.14, duration: 0.7 }}
              className="kannada text-lg mb-6 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}>
              ಬೆಂಗಳೂರು ಮೆಟ್ರೋ ಸಿಟಿ ಇನ್‌ಫ್ರಾಸ್ಟ್ರಕ್ಚರ್ ಹೌಸಿಂಗ್ ಕೋ-ಆಪರೇಟಿವ್ ಸೊಸೈಟಿ ಲಿ.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}
              className="text-[15px] leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.65)" }}>
              We were formed with an ambition to provide residential plots with all amenities at an
              affordable price to the general public with a focus in Bangalore. With a decade of experience
              in providing Bangaloreans affordable quality residential plots.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.26, duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl mb-8 cursor-default"
              style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", backdropFilter: "blur(8px)" }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 shrink-0" style={{ color: C.greenMid }}>
                <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth={2}/>
                <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-bold text-[14px] tracking-wide" style={{ color: C.greenMid }}>
                Reg No. JRB/RGN/CR-13/51578/2022-23
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <OrbitalLogo />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SECTION 2 — WHAT MAKES US BETTER
          (unified grid — click to expand)
      ════════════════════════════════════ */}
      <section id="better" className="px-6 lg:px-10 py-24" style={{ background: C.bgWhite }}>
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: C.green }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.green }}>Our Advantages</span>
              <span className="w-8 h-px" style={{ background: C.green }} />
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4" style={{ color: C.bgDark2 }}>
              What Makes Us{" "}
              <span style={{ background: `linear-gradient(90deg, ${C.green}, ${C.greenMid})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Better
              </span>
            </h2>
            <p className="text-[15px] max-w-2xl mx-auto" style={{ color: C.body }}>
              Nine pillars that set BMI Housing apart — from legal compliance and transparent pricing to genuine customer care. Click any card to explore.
            </p>
          </motion.div>

          {/* 3 × 3 image grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {UNIFIED_ITEMS.map((item, i) => (
              <BetterImageCard
                key={item.name}
                item={item}
                index={i}
                onClick={() => { setActiveItem(i); setShowGrid(true); }}
              />
            ))}
          </div>

          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="text-center mt-10">
            <motion.button
              onClick={() => { setActiveItem(0); setShowGrid(true); }}
              whileHover={{ scale: 1.05, boxShadow: `0 14px 40px ${C.green}44` }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl text-[14px] font-bold text-white relative overflow-hidden group"
              style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, boxShadow: `0 4px 20px ${C.green}33` }}>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.5 }}
              />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4.5 h-4.5 shrink-0 w-5 h-5">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
              View All 9 Advantages
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SECTION 3 — BANK DETAILS
      ════════════════════════════════════ */}
      <section id="bank" className="px-6 lg:px-10 py-24 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, #f0fff4, #ecfdf5, #f0faf0)` }}>

        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: `radial-gradient(circle, ${C.green}22 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />

        <div className="relative max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: C.green }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.green }}>Payment Details</span>
              <span className="w-8 h-px" style={{ background: C.green }} />
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight" style={{ color: C.text }}>
              Bank{" "}
              <span style={{ background: `linear-gradient(90deg, ${C.green}, ${C.greenMid})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Details
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(20px)", boxShadow: "0 20px 60px rgba(22,163,74,0.12), 0 4px 16px rgba(0,0,0,0.06)" }}>
            <motion.div
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `linear-gradient(90deg, ${C.green}, ${C.greenMid}, ${C.yellow}, ${C.green})`,
                backgroundSize: "300% 100%",
                padding: "1.5px",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <div className="relative p-8">
              <BankRow label="Account Name" value="BENGALURU METRO CITY INFRASTRUCTURE HOUSING" delay={0} />
              <BankRow label="Bank Name" value="BANK OF BARODA" delay={0.1} />
              <BankRow label="Account Number" value="73750200003586" mono delay={0.2} />
              <BankRow label="Branch" value="GANGA NAGAR" delay={0.3} />
              <BankRow label="IFSC Code" value="BARB0VJGANG" mono delay={0.4} />
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.55 }}
                className="mt-6 pt-6" style={{ borderTop: `1px solid ${C.border}` }}>
                <p className="text-[13px] text-center" style={{ color: C.muted }}>
                  Use the bank details above to transfer funds directly via NEFT / RTGS / UPI.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />

      {/* ── Unified Grid Modal ── */}
      <AnimatePresence>
        {showGrid && (
          <UnifiedGridModal
            items={UNIFIED_ITEMS}
            activeIndex={activeItem}
            setActiveIndex={setActiveItem}
            onClose={() => setShowGrid(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
