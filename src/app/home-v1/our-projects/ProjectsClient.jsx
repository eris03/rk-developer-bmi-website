"use client";

import { useState } from "react";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  AnimatePresence,
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

/* ─── NAV MENUS ─── */
const NAV_MENUS = {
  projects: [
    { label: "BMI Garden City",      sub: "Off NH 207, Devanahalli",        href: "#garden-city" },
    { label: "BMI North Metro City", sub: "Adjacent to Amity University",   href: "#north-metro-city" },
    { label: "Upcoming Projects",    sub: "Coming soon — North Bengaluru",  href: "#" },
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
          className="w-full flex flex-col gap-0.5 px-4 py-3.5 text-left hover:bg-green-50 transition-colors group border-b last:border-b-0"
          style={{ borderColor: C.border, display: "block" }}>
          <span className="text-[13px] font-semibold group-hover:text-green-700 transition-colors" style={{ color: C.text }}>{item.label}</span>
          <span className="text-[11px]" style={{ color: C.muted }}>{item.sub}</span>
        </a>
      ))}
    </motion.div>
  );
}

/* ─── ORBITAL LOGO ─── */
function OrbitalLogo() {
  return (
    <div className="relative w-72 h-72 lg:w-[26rem] lg:h-[26rem] mx-auto select-none">
      {/* Outer glow */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.06, 0.18] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(34,197,94,0.35) 0%, transparent 65%)" }}
      />

      {/* Ring 1 — slow clockwise with green dot */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{ border: "1.5px dashed rgba(34,197,94,0.35)" }}
      >
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full"
          style={{ background: C.greenMid, boxShadow: `0 0 14px ${C.greenMid}, 0 0 28px ${C.greenMid}66` }} />
      </motion.div>

      {/* Ring 2 — counter-clockwise with yellow dot */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8 rounded-full"
        style={{ border: `1px solid rgba(217,119,6,0.3)` }}
      >
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
          style={{ background: C.yellow, boxShadow: `0 0 10px ${C.yellow}` }} />
      </motion.div>

      {/* Ring 3 — fast clockwise, white */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        className="absolute inset-14 rounded-full"
        style={{ border: "1px solid rgba(255,255,255,0.12)" }}
      >
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/50" />
      </motion.div>

      {/* Center logo */}
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
        <img
          src="https://www.bmihousing.com/wp-content/uploads/2023/07/11111-1024x1024.png"
          alt="BMI Official Seal"
          className="w-full h-full object-contain p-3"
        />
      </motion.div>
    </div>
  );
}

/* ─── WHY CARD (3D tilt + glare + animated border) ─── */
function WhyCard({ icon, title, desc, delay = 0 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(sy, [-55, 55], [9, -9]);
  const rotateY = useTransform(sx, [-55, 55], [-9, 9]);
  const glareX = useTransform(sx, [-55, 55], ["20%", "80%"]);
  const glareY = useTransform(sy, [-55, 55], ["20%", "80%"]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 44, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left - r.width / 2);
        y.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative p-8 rounded-2xl bg-white group cursor-default overflow-hidden flex flex-col items-center text-center"
      style={{ border: `1px solid ${C.borderGray}`, boxShadow: C.shadowMd }}
    >
      {/* Animated top border */}
      <motion.div
        className="absolute top-0 left-0 h-[2.5px] rounded-t-2xl"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.45 }}
        style={{ background: `linear-gradient(90deg, ${C.green}, ${C.greenMid}, ${C.yellow})` }}
      />
      {/* Glare */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(34,197,94,0.1) 0%, transparent 55%)` }}
      />
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.15, rotate: [0, -8, 8, -4, 0] }}
        transition={{ duration: 0.5 }}
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shrink-0"
        style={{ background: C.greenLight, color: C.green }}
      >
        {icon}
      </motion.div>
      <h3 className="font-bold text-[16px] mb-3" style={{ color: C.text }}>{title}</h3>
      <p className="text-[13px] leading-relaxed" style={{ color: C.body }}>{desc}</p>
    </motion.div>
  );
}

/* ─── BETTER CARD (3D tilt) ─── */
function BetterCard({ icon, title, desc, accent, delay = 0 }) {
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
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left - r.width / 2);
        y.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative p-7 rounded-2xl bg-white overflow-hidden group cursor-default"
      style={{ border: `1px solid ${C.borderGray}`, boxShadow: C.shadowMd }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}10 0%, transparent 60%)` }}
      />
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: [-3, 3, -3, 0] }}
        transition={{ duration: 0.4 }}
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${accent}15`, color: accent }}
      >
        {icon}
      </motion.div>
      <h3 className="font-bold text-[15px] mb-2" style={{ color: C.text }}>{title}</h3>
      <p className="text-[13px] leading-relaxed" style={{ color: C.body }}>{desc}</p>
    </motion.div>
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
      <span
        className={`font-bold text-[15px] ${mono ? "font-mono tracking-wider" : ""}`}
        style={{ color: C.text }}
      >
        {value}
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════ */
export default function ProjectsClient() {
  return (
    <div style={{ background: C.bg }}>
      <NavBar activePage="projects" />

      {/* Spacer for fixed nav */}
      <div style={{ height: "88px" }} />

      {/* ════════════════════════════════════
          SECTION 1 — ABOUT US
      ════════════════════════════════════ */}
      <section id="about" className="relative overflow-hidden py-28"
        style={{ background: `linear-gradient(135deg, ${C.bgDark} 0%, #0d2818 50%, ${C.bgDark2} 100%)` }}>

        {/* Animated blobs */}
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

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-px" style={{ background: C.greenMid }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.greenMid }}>About Us</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="font-extrabold text-3xl md:text-4xl lg:text-[2.7rem] leading-[1.15] mb-4"
              style={{ color: "#ffffff" }}
            >
              Bengaluru Metro City{" "}
              <span style={{ background: `linear-gradient(90deg, ${C.greenMid}, #86efac)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Infrastructure
              </span>
              <br />
              Housing Co-Operative{" "}
              <span style={{ background: `linear-gradient(90deg, ${C.yellow}, #fbbf24)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Society LTD.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14, duration: 0.7 }}
              className="kannada text-lg mb-6 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              ಬೆಂಗಳೂರು ಮೆಟ್ರೋ ಸಿಟಿ ಇನ್‌ಫ್ರಾಸ್ಟ್ರಕ್ಚರ್ ಹೌಸಿಂಗ್ ಕೋ-ಆಪರೇಟಿವ್ ಸೊಸೈಟಿ ಲಿ.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-[15px] leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              We were formed with an ambition to provide residential plots with all amenities at an
              affordable price to the general public with a focus in Bangalore. With a decade of experience
              in providing Bangaloreans affordable quality residential plots.
            </motion.p>

            {/* Reg No badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.26, duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl mb-8 cursor-default"
              style={{
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.3)",
                backdropFilter: "blur(8px)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 shrink-0" style={{ color: C.greenMid }}>
                <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth={2}/>
                <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-bold text-[14px] tracking-wide" style={{ color: C.greenMid }}>
                Reg No. JRB/RGN/CR-13/51578/2022-23
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.32 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 10px 30px ${C.green}55` }}
                whileTap={{ scale: 0.96 }}
                className="px-8 py-3.5 rounded-xl text-[14px] font-bold text-white relative overflow-hidden group"
                style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(135deg, transparent, rgba(255,255,255,0.15), transparent)" }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.5 }}
                />
                Read More →
              </motion.button>
            </motion.div>
          </div>

          {/* Right: Orbital logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <OrbitalLogo />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SECTION 2 — PROJECT SHOWCASE CARDS
      ════════════════════════════════════ */}
      <section id="projects" className="px-6 lg:px-10 py-24" style={{ background: C.bgWhite }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: C.green }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.green }}>Explore</span>
              <span className="w-8 h-px" style={{ background: C.green }} />
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight" style={{ color: C.bgDark2 }}>
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
            {/* Garden City Card */}
            <motion.a
              href="/home-v1/our-projects/garden-city"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, boxShadow: `0 24px 60px rgba(22,163,74,0.18)` }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer block"
              style={{ boxShadow: C.shadowLg, textDecoration: "none" }}
            >
              {/* Image */}
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
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                  style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                  →
                </div>
              </div>
              {/* Content */}
              <div className="p-7" style={{ background: "#ffffff", borderTop: `3px solid ${C.green}` }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-extrabold text-2xl mb-1" style={{ color: C.text }}>BMI Garden City</h3>
                    <p className="text-[13px]" style={{ color: C.muted }}>North Bengaluru · RERA Approved</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold" style={{ background: C.greenLight, color: C.greenDark }}>
                    ₹1,175/sqft
                  </span>
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

            {/* North Metro City Card */}
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
              {/* Image */}
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
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                  style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                  →
                </div>
              </div>
              {/* Content */}
              <div className="p-7" style={{ background: "#ffffff", borderTop: "3px solid #ea580c" }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-extrabold text-2xl mb-1" style={{ color: C.text }}>BMI North Metro City</h3>
                    <p className="text-[13px]" style={{ color: C.muted }}>North Bengaluru · RERA Approved</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold" style={{ background: "#ffedd5", color: "#c2410c" }}>
                    ₹1,199/sqft
                  </span>
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
        </div>
      </section>

      {/* ════════════════════════════════════
          SECTION 4 — WHAT MAKES US BETTER
      ════════════════════════════════════ */}
      <section id="better" className="px-6 lg:px-10 py-24" style={{ background: C.bgWhite }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: C.green }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.green }}>Our Advantages</span>
              <span className="w-8 h-px" style={{ background: C.green }} />
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight" style={{ color: C.bgDark2 }}>
              What Makes Us{" "}
              <span style={{ background: `linear-gradient(90deg, ${C.green}, ${C.greenMid})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Better
              </span>
            </h2>
            <p className="mt-4 text-[15px] max-w-2xl mx-auto" style={{ color: C.body }}>
              Six key pillars that set BMI Housing apart from the rest.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BetterCard delay={0} accent={C.green} title="RERA Approved"
              desc="All our layouts are RERA, DTCP & BMRDA approved. 100% legal with government-registered co-operative society."
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>}
            />
            <BetterCard delay={0.07} accent={C.blue} title="Bank Loan up to 90%"
              desc="Partner banks offer home loans up to 90% of plot value making ownership accessible to everyone."
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>}
            />
            <BetterCard delay={0.14} accent={C.yellow} title="4-EMI Payment Plan"
              desc="Pay in 4 easy progressive instalments — no financial pressure, flexible schedule."
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
            />
            <BetterCard delay={0.21} accent={C.red} title="Prime Locations Only"
              desc="Every project is strategically located near tech parks, universities, and major roads in North Bengaluru."
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
            />
            <BetterCard delay={0.28} accent={C.green} title="Transparent Pricing"
              desc="Starting at just ₹1,399/sqft — clear pricing with no hidden costs. What you see is what you pay."
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>}
            />
            <BetterCard delay={0.35} accent={C.blue} title="Expert Team"
              desc="A decade of experience delivering quality layouts. Our team guides you at every step from booking to registration."
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SECTION 3 — WHY CHOOSE US
      ════════════════════════════════════ */}
      <section id="why-us" className="px-6 lg:px-10 py-24" style={{ background: C.bgSection }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: C.green }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.green }}>Our Values</span>
              <span className="w-8 h-px" style={{ background: C.green }} />
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight" style={{ color: C.bgDark2 }}>
              Why{" "}
              <span style={{ background: `linear-gradient(90deg, ${C.green}, ${C.greenMid})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Choose Us
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <WhyCard delay={0} title="Trustworthy" desc="We believe that trust is the highest form of human motivation. It brings out the very best in people."
              icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>}
            />
            <WhyCard delay={0.08} title="Values & Ethics" desc="It is easy to dodge our responsibilities, but we cannot dodge the consequences of dodging our responsibilities."
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
            />
            <WhyCard delay={0.16} title="Committed" desc="The biggest commitment we keep is our commitment to ourselves — to deliver every project on time, every time."
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7"><circle cx="12" cy="8" r="5"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></svg>}
            />
            <WhyCard delay={0.24} title="Trained Workers" desc="The way our employees feel is the way our customers will feel. We invest in our people because it matters."
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>}
            />
            <WhyCard delay={0.32} title="Customer Satisfaction" desc="Quick and positive response makes businesses run smoother, gain trust, and create lasting relationships."
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>}
            />
            <WhyCard delay={0.4} title="Quick Response" desc="We believe that quick and positive response makes businesses run smoother and gain the trust they deserve."
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.87 2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.5a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SECTION 4 — BANK DETAILS
      ════════════════════════════════════ */}
      <section id="bank" className="px-6 lg:px-10 py-24 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, #f0fff4, #ecfdf5, #f0faf0)` }}>

        {/* Subtle dot pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: `radial-gradient(circle, ${C.green}22 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />

        <div className="relative max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
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

          {/* Glass card with animated gradient border */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(20px)", boxShadow: "0 20px 60px rgba(22,163,74,0.12), 0 4px 16px rgba(0,0,0,0.06)" }}
          >
            {/* Animated gradient border */}
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

              {/* QR + button row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55 }}
                className="mt-6 flex flex-col sm:flex-row items-center gap-6 pt-6"
                style={{ borderTop: `1px solid ${C.border}` }}
              >
                {/* QR placeholder */}
                <div className="w-24 h-24 rounded-xl flex items-center justify-center shrink-0"
                  style={{ border: `2px dashed ${C.border}`, background: C.bgSection }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth={1.5} className="w-8 h-8">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                    <path d="M14 14h3v3h-3z"/><path d="M17 17h3v3h-3z"/><path d="M14 17h0"/><path d="M17 14h0"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[13px] mb-4" style={{ color: C.body }}>
                    Scan the QR code with any UPI app or use the bank details above to transfer funds directly.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: `0 8px 24px ${C.green}44` }}
                    whileTap={{ scale: 0.96 }}
                    className="relative flex items-center gap-2 px-6 py-2.5 rounded-lg text-[12px] font-bold text-white overflow-hidden group"
                    style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}
                  >
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)" }}
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                    />
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 shrink-0">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download Scanner
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />

      {/* LEGACY FOOTER REMOVED — replaced by SiteFooter */}
      {false && <footer style={{ background: C.greenFoot }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
          <div className="grid md:grid-cols-3 gap-10">

            {/* Col 1: Logo + address + social */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://www.bmihousing.com/wp-content/uploads/2023/07/11111-1024x1024.png"
                  alt="BMI" className="w-14 h-14 rounded-full object-contain bg-white p-1"
                  style={{ border: "2px solid rgba(255,255,255,0.6)" }} />
                <div>
                  <div className="font-bold text-[15px]" style={{ color: C.greenDark }}>BMI Housing</div>
                  <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "#3a6b3a" }}>Co-Op Society</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-bold text-[14px] mb-2.5" style={{ color: C.greenDark }}>Office Location</h4>
                <p className="text-[13px] leading-relaxed" style={{ color: "#2d4a2d" }}>
                  #28/1, 2nd floor, 1st cross, 15th main E-block,<br />
                  Sahakar nagar, Bangalore- 560092
                </p>
              </div>

              <div className="flex flex-col gap-1.5 mb-6 text-[13px]" style={{ color: "#2d4a2d" }}>
                <div>Mobile: <strong>7710556677</strong></div>
                <div>Landline: <strong>080 66469061</strong></div>
                <div>Mail: <a href="mailto:info@bmihousing.com" className="hover:underline"><strong>info@bmihousing.com</strong></a></div>
              </div>

              <div className="flex items-center gap-3">
                {[
                  { label: "Facebook",  icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                  { label: "Twitter",   icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg> },
                  { label: "Instagram", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                ].map((s) => (
                  <motion.a key={s.label} href="#" aria-label={s.label}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.12)", color: "#1a1a1a" }}>
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Col 2: Important links */}
            <div>
              <h4 className="font-bold text-[16px] mb-5" style={{ color: C.greenDark }}>Important Links</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Home",                    href: "/home-v1" },
                  { label: "E Brochure",              href: "/home-v1/e-brochure" },
                  { label: "About Us",                href: "#about" },
                  { label: "Membership Registration", href: "/home-v1/membership" },
                  { label: "Contact",                 href: "#" },
                ].map((l, i) => (
                  <motion.a key={l.label} href={l.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ x: 6, color: C.greenDark }}
                    className="text-[14px] flex items-center gap-2 transition-colors"
                    style={{ color: "#2d4a2d" }}>
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: C.green }} />
                    {l.label}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Col 3: Office map */}
            <div>
              <h4 className="font-bold text-[16px] mb-5 flex items-center gap-2" style={{ color: C.greenDark }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Office Map
              </h4>
              <div className="rounded-xl overflow-hidden"
                style={{ border: "2px solid rgba(255,255,255,0.5)", boxShadow: "0 4px 14px rgba(0,0,0,0.12)" }}>
                <iframe
                  title="BMI Housing Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.6153578065257!2d77.57426731482207!3d13.057729990797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17c7b2da4a5b%3A0x5e21dd44d7f0e0e5!2sSahakar%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560092!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.4)" }}>
            <div className="text-[11px] tracking-[0.15em]" style={{ color: "rgba(20,50,20,0.6)" }}>
              © 2024–2025 BMI Housing Co-Operative Society. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-[11px]" style={{ color: "rgba(20,50,20,0.6)" }}>
              <a href="#" className="hover:text-green-900 transition-colors">Disclaimer</a>
              <span>/</span>
              <a href="#" className="hover:text-green-900 transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>}

    </div>
  );
}
