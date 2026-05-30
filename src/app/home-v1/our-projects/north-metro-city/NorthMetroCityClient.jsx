"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../../components/NavBar";
import SiteFooter from "../../components/SiteFooter";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

/* ── Click-to-play video player ── */
function VideoPlayer({ src, poster }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
      {playing ? (
        /* eslint-disable-next-line jsx-a11y/media-has-caption */
        <video
          src={src}
          autoPlay
          playsInline
          controls
          className="absolute inset-0 w-full h-full object-contain"
          style={{ background: "#000" }}
        />
      ) : (
        <div
          className="absolute inset-0 cursor-pointer group"
          onClick={() => setPlaying(true)}
          role="button"
          aria-label="Play virtual tour"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt="Virtual Tour Thumbnail" className="w-full h-full object-cover" />
          {/* dark overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
          {/* play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.94 }}
              className="flex items-center justify-center w-20 h-20 rounded-full"
              style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "2px solid rgba(255,255,255,0.5)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-9 h-9 ml-1.5 drop-shadow">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </motion.div>
          </div>
          {/* label */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full text-[12px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            ▶ Play Virtual Tour
          </div>
        </div>
      )}
    </div>
  );
}

const C = {
  bg:          "#fff7ed",
  bgWhite:     "#ffffff",
  bgSection:   "#fff4e6",
  green:       "#16a34a",
  greenDark:   "#14532d",
  greenLight:  "#dcfce7",
  greenMid:    "#22c55e",
  orange:      "#c2410c",
  orangeMid:   "#ea580c",
  orangeBright:"#f97316",
  orangeLight: "#ffedd5",
  yellow:      "#d97706",
  text:        "#1c1008",
  body:        "#374151",
  muted:       "#6b7280",
  border:      "#fed7aa",
  borderGray:  "#e5e7eb",
  shadowMd:    "0 4px 12px rgba(0,0,0,0.08)",
  shadowLg:    "0 10px 30px rgba(0,0,0,0.12)",
};

/* ── shared nav ── */
function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: "rgba(255,255,255,0.93)", backdropFilter: "blur(16px)", boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}
    >
      <div className="px-6 lg:px-10 py-3 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.div
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0"
            style={{ border: "1.5px solid #fed7aa" }}
            whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bmi-logo.png" alt="BMI" className="w-full h-full object-contain scale-[1.28]" />
          </motion.div>
          <div className="hidden sm:block leading-none">
            <div className="font-bold text-[14px]" style={{ color: C.orange }}>BMI Housing</div>
            <div className="text-[8px] tracking-[0.3em] uppercase mt-0.5" style={{ color: C.muted }}>Co-Op Society</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-0.5">
          {[
            { label: "Home",         href: "/" },
            { label: "Our Projects", href: "/our-projects", active: true },
            { label: "About Us",     href: "/our-projects#about" },
          ].map((lk) => (
            <motion.a
              key={lk.label}
              href={lk.href}
              whileHover={{ backgroundColor: "#fff7ed" }}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors"
              style={{ color: lk.active ? C.orangeMid : C.text }}
            >
              {lk.label}
              {lk.active && <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.orangeBright }} />}
            </motion.a>
          ))}
        </nav>

        <motion.a
          href="/membership"
          whileHover={{ scale: 1.05, boxShadow: `0 6px 20px ${C.orangeMid}50` }}
          whileTap={{ scale: 0.96 }}
          className="shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-[13px] font-bold text-white relative overflow-hidden group"
          style={{ background: `linear-gradient(135deg, ${C.orangeMid}, ${C.orange})` }}
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
        </motion.a>
      </div>
      <div className="px-6 lg:px-10 py-1.5 flex items-center gap-1 text-[11px]"
        style={{ borderTop: `1px solid ${C.border}`, background: C.bgSection }}>
        <a href="/disclaimer" className="hover:underline" style={{ color: C.orangeMid }}>Disclaimer</a>
        <span style={{ color: C.muted }}>/</span>
        <a href="/disclaimer" className="hover:underline" style={{ color: C.orangeMid }}>Privacy Policy</a>
        <span className="ml-auto text-[10px] tracking-[0.2em] uppercase" style={{ color: C.muted }}>
          Reg. No: JRB/RGN/CR-13/51578/2022-23
        </span>
      </div>
    </motion.header>
  );
}

export default function NorthMetroCityClient() {
  const [activeDevIdx, setActiveDevIdx] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // close modal on ESC
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") setSelectedRow(null); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);

  return (
    <div style={{ background: C.bgWhite }}>
      <NavBar activePage="north-metro-city" />
      <div style={{ height: "88px" }} />

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden py-20"
        style={{ background: `linear-gradient(135deg, #431407 0%, #7c2d12 50%, #431407 100%)` }}>
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[28rem] h-[28rem] rounded-full pointer-events-none"
          style={{ background: C.orangeBright, opacity: 0.15, filter: "blur(90px)" }}
        />
        <motion.div
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-20 -right-20 w-[32rem] h-[32rem] rounded-full pointer-events-none"
          style={{ background: C.yellow, opacity: 0.10, filter: "blur(100px)" }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-center">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 text-[12px] mb-6"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            <a href="/our-projects" className="hover:text-orange-300 transition-colors">Our Projects</a>
            <span>/</span>
            <span style={{ color: "#fdba74" }}>North Metro City</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold mb-5"
            style={{ background: "rgba(249,115,22,0.18)", border: "1px solid rgba(249,115,22,0.4)", color: "#fdba74" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#fdba74" }} />
            Adjacent to Amity University
          </motion.div>

          {/* English heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 text-white"
          >
            BMI{" "}
            <span style={{ background: `linear-gradient(90deg, #fdba74, ${C.orangeBright})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              North Metro City
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[16px] max-w-2xl mx-auto mb-10"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Premium residential plots adjacent to Amity University — surrounded by ITIR Tech Park,
            Harrow International School &amp; North Bengaluru's top landmarks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {["BIAAPA Approval", "A Khata", "4-EMI Plan", "₹1,399/sqft"].map((tag) => (
              <span key={tag}
                className="px-4 py-1.5 rounded-full text-[12px] font-semibold text-white"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-20" style={{ background: C.bgWhite }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden"
            style={{ boxShadow: C.shadowLg }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/north-metro-overview.png"
              alt="BMI North Metro City"
              className="w-full h-auto object-cover"
              style={{ minHeight: "320px", display: "block", objectPosition: "20% center" }}
            />
            <div className="absolute bottom-4 left-4 px-4 py-2 rounded-xl text-[12px] font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${C.orangeMid}, ${C.orange})`, boxShadow: `0 4px 14px ${C.orangeMid}66` }}>
              Adjacent to Amity University
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px" style={{ background: C.orangeBright }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.orangeMid }}>Overview</span>
            </div>
            <h2 className="font-extrabold text-3xl mb-5" style={{ color: C.text }}>
              North Bengaluru's{" "}
              <span style={{ background: `linear-gradient(90deg,${C.orangeMid},${C.orangeBright})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Rising Star
              </span>
            </h2>
            <p className="text-[15px] leading-relaxed mb-6" style={{ color: C.body }}>
              North Bangalore has become the prime zone and is in high demand with the rapid development in the area.
              Having the Bangalore International Airport in the north zone and other major Government offices like the
              DC (District Collector) office, government proposals for ITIR are contributing to this rapid growth.
              If you plan to invest on plot/land, now is the best time.
            </p>
            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Price", value: "₹1,399/sqft" },
                { label: "Location", value: "Near Amity Univ." },
                { label: "Payment", value: "4-EMI Plan" },
                { label: "Approval", value: "BIAAPA Approval" },
                { label: "Plot Type", value: "A Khata" },
              ].map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-xl p-4"
                  style={{ background: "#fff7ed", border: `1px solid ${C.border}` }}>
                  <div className="text-[11px] uppercase tracking-[0.15em] font-semibold mb-1" style={{ color: C.muted }}>{s.label}</div>
                  <div className="font-extrabold text-[16px]" style={{ color: C.text }}>{s.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing Table ── */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-20" style={{ background: C.bgSection }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: C.orangeBright }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.orangeMid }}>Pricing</span>
              <span className="w-8 h-px" style={{ background: C.orangeBright }} />
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl" style={{ color: C.text }}>
              Plot Pricing &amp; Payment{" "}
              <span style={{ background: `linear-gradient(90deg,${C.orangeMid},${C.orangeBright})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Schedule
              </span>
            </h2>
          </motion.div>

          {/* ── Full-screen Row Modal ── */}
          <AnimatePresence>
            {selectedRow && (
              <motion.div
                className="fixed inset-0 z-[200] flex items-center justify-center px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedRow(null)}
                style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(10px)" }}
              >
                <motion.div
                  initial={{ scale: 0.82, opacity: 0, y: 40 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.88, opacity: 0, y: 20 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-lg rounded-3xl overflow-hidden"
                  style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)" }}
                >
                  {/* Header */}
                  <div className="px-8 pt-8 pb-6 text-center"
                    style={{ background: `linear-gradient(135deg, #92400e, ${C.orangeMid})` }}>
                    <div className="text-orange-200 text-[11px] tracking-[0.3em] uppercase font-bold mb-2">North Metro City · Plot Details</div>
                    <div className="text-white font-extrabold text-4xl md:text-5xl">{selectedRow.dim}</div>
                    <div className="text-orange-200 text-[14px] mt-1">{selectedRow.sqft}</div>
                    <div className="mt-3 inline-block px-5 py-1.5 rounded-full font-extrabold text-lg"
                      style={{ background: "rgba(255,255,255,0.18)", color: "#fef08a", border: "1px solid rgba(255,255,255,0.25)" }}>
                      ₹ 1399 / sqft
                    </div>
                  </div>
                  {/* Body */}
                  <div className="px-8 py-7" style={{ background: "#fff" }}>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Total Sale Value", value: `₹ ${selectedRow.total}`, highlight: true },
                        { label: "Down Payment (30%)", value: selectedRow.down, highlight: false },
                        { label: "1st Instalment", value: selectedRow.i1, highlight: false },
                        { label: "2nd Instalment", value: selectedRow.i2, highlight: false },
                        { label: "3rd Instalment", value: selectedRow.i3, highlight: false },
                        { label: "Payment Plan", value: "4-EMI Plan", highlight: false },
                      ].map((item) => (
                        <div key={item.label} className="rounded-2xl px-4 py-3.5"
                          style={{ background: item.highlight ? C.orangeLight : "#fffcfa", border: `1.5px solid ${item.highlight ? C.orangeMid : C.border}` }}>
                          <div className="text-[10px] font-bold tracking-[0.15em] uppercase mb-1" style={{ color: C.muted }}>{item.label}</div>
                          <div className="font-extrabold text-[16px]" style={{ color: item.highlight ? "#92400e" : C.text }}>{item.value}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-[12px] font-medium rounded-xl px-4 py-3"
                      style={{ background: "#fff7ed", color: C.orangeMid, border: `1px solid ${C.border}` }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 shrink-0">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      Next to Amity University Chappradakana Main Road, Bengaluru
                    </div>
                    <motion.a href="/application-registration"
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="mt-5 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-[15px]"
                      style={{ background: `linear-gradient(135deg, ${C.orangeMid}, #92400e)`, boxShadow: `0 6px 20px ${C.orangeMid}40` }}>
                      Apply Now →
                    </motion.a>
                  </div>
                  {/* Close */}
                  <button onClick={() => setSelectedRow(null)}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full font-bold text-lg"
                    style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
                    ✕
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── 3D Pricing Poster Card ── */}
          <div style={{ perspective: "1200px" }}>
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 4 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl overflow-hidden"
              style={{
                border: "3px solid #ea580c",
                boxShadow: `
                  0 2px 0 #92400e,
                  0 4px 0 #7c2d12,
                  0 0 0 1px rgba(249,115,22,0.15),
                  0 8px 24px rgba(249,115,22,0.2),
                  0 24px 60px rgba(0,0,0,0.14),
                  0 48px 80px rgba(249,115,22,0.08)
                `,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Gloss shimmer overlay */}
              <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
                style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 55%)" }} />

              {/* Title bar */}
              <div className="relative text-center py-4 font-extrabold text-2xl md:text-3xl tracking-tight" style={{ background: "#ffffff", color: "#111" }}>
                North Metro City
                <div className="absolute inset-x-0 top-0 h-[3px]"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.6), #ea580c, rgba(249,115,22,0.6), transparent)" }} />
              </div>

              {/* Orange divider */}
              <div style={{ background: "linear-gradient(90deg, #92400e, #c2410c, #ea580c, #f97316, #ea580c, #c2410c, #92400e)", height: "6px" }} />

              {/* Price banner */}
              <div className="flex items-center justify-center py-3 text-white font-extrabold text-xl md:text-2xl gap-2"
                style={{ background: "linear-gradient(135deg, #92400e 0%, #c2410c 40%, #ea580c 70%, #f97316 100%)" }}>
                <span>Price</span>
                <span className="text-[#fef08a]">₹</span>
                <span>1399/- Sqft.</span>
              </div>

              {/* Location */}
              <div className="flex items-center justify-center gap-2 py-2.5 text-[13px] font-semibold" style={{ background: "#fff7ed", color: "#92400e" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Next to Amity University Chappradakana Main Road, Bengaluru
              </div>

              {/* Tap hint */}
              <div className="text-center py-1.5 text-[11px] font-semibold tracking-wide" style={{ background: "#ffedd5", color: "#ea580c" }}>
                👆 Tap any row to view full details
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-[12px] md:text-[13px] border-collapse">
                  <thead>
                    <tr style={{ background: "linear-gradient(135deg, #92400e, #ea580c)", color: "#ffffff" }}>
                      {["DIMENSION","PRICE PER SQFT","TOTAL SALE VALUE","DOWN PAYMENT","1st INSTALMENT","2nd INSTALMENT","3rd INSTALMENT"].map((h, hi) => (
                        <th key={h} className="px-3 py-3 font-extrabold text-center"
                          style={{ borderRight: hi < 6 ? "1px solid rgba(255,255,255,0.2)" : "none", whiteSpace: "pre-wrap", lineHeight: "1.3" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { dim: "30×40", sqft: "1200sqft", total: "16,78,800/-", down: "5,03,640",  i1: "3,91,720",  i2: "3,91,720",  i3: "3,91,720"  },
                      { dim: "30×50", sqft: "1500sqft", total: "20,98,500/-", down: "6,29,550",  i1: "4,89,650",  i2: "4,89,650",  i3: "4,89,650"  },
                      { dim: "40×60", sqft: "2400sqft", total: "33,57,600/-", down: "10,07,280", i1: "7,83,440",  i2: "7,83,440",  i3: "7,83,440"  },
                      { dim: "50×80", sqft: "4000sqft", total: "55,96,000/-", down: "16,78,800", i1: "13,05,734", i2: "13,05,734", i3: "13,05,734" },
                    ].map((row, i) => (
                      <motion.tr key={row.dim}
                        whileHover={{ backgroundColor: "#fed7aa", scale: 1.01, x: 3 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedRow(row)}
                        style={{ background: i % 2 === 0 ? "#fff7ed" : "#ffffff", cursor: "pointer",
                          borderBottom: "1px solid #fed7aa", transition: "background 0.2s" }}>
                        <td className="px-3 py-3.5 text-center font-extrabold" style={{ color: "#111", borderRight: "1px solid #fed7aa" }}>
                          {row.dim} <span className="font-normal text-[11px] text-gray-500">({row.sqft})</span>
                        </td>
                        <td className="px-3 py-3.5 text-center font-bold" style={{ color: "#92400e", borderRight: "1px solid #fed7aa" }}>1399/-sqft</td>
                        <td className="px-3 py-3.5 text-center font-bold" style={{ color: "#111", borderRight: "1px solid #fed7aa" }}>{row.total}</td>
                        <td className="px-3 py-3.5 text-center font-bold" style={{ color: "#111", borderRight: "1px solid #fed7aa" }}>{row.down}</td>
                        <td className="px-3 py-3.5 text-center font-medium" style={{ color: "#374151", borderRight: "1px solid #fed7aa" }}>{row.i1}</td>
                        <td className="px-3 py-3.5 text-center font-medium" style={{ color: "#374151", borderRight: "1px solid #fed7aa" }}>{row.i2}</td>
                        <td className="px-3 py-3.5 text-center font-medium" style={{ color: "#374151" }}>{row.i3}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer bar */}
              <div style={{ background: "linear-gradient(90deg, #92400e, #c2410c, #ea580c, #f97316, #ea580c, #c2410c, #92400e)", height: "6px" }} />
            </motion.div>
          </div>

          {/* Depth shadow under card */}
          <div style={{
            height: "16px", marginTop: "2px",
            background: "radial-gradient(ellipse at center, rgba(249,115,22,0.18) 0%, transparent 70%)",
            filter: "blur(6px)",
          }} />
        </div>
      </section>

      {/* ── Documents Required ── */}
      <section className="px-6 lg:px-10 py-20" style={{ background: C.bgWhite }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="font-extrabold text-3xl md:text-4xl" style={{ color: C.text }}>
              Documents{" "}
              <span style={{ background: `linear-gradient(90deg,${C.orangeMid},${C.orangeBright})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Required
              </span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl p-4 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
            style={{ background: C.bgSection, border: `1px solid ${C.border}` }}>
            {/* Kannada — first */}
            <div>
              <h4 className="kannada font-bold text-[18px] mb-5 pb-2" style={{ color: C.orangeMid, borderBottom: `2px solid ${C.border}` }}>
                ಅರ್ಜಿಗೆ ಸೇರಿಸಬೇಕಾದ ಆವಶ್ಯಕ ಆವೃತ್ತಿಗಳು:
              </h4>
              <ol className="flex flex-col gap-3">
                {["ನಾಲ್ಕು (4) ಪಾಸ್‌ಪೋರ್ಟ್ ಗಾತ್ರದ ಫೋಟೋಗಳು","ವಿಳಾಸ ಪ್ರಮಾಣಪತ್ರ","ಸರ್ಕಾರಿ ಗುರುತಿನ ಪ್ರೂಫ್","ನಾಮಿನಿ ಗುರುತಿನ ಪ್ರೂಫ್ ಮತ್ತು 1 ಪಾಸ್‌ಪೋರ್ಟ್ ಗಾತ್ರದ ಫೋಟೋ","ಪಾವತಿ ಮೂಡು: ಚೆಕ್, ಡಿಡಿ, ಎನ್‌ಇಎಫ್‌ಟಿ, ಆರ್‌ಟಿಜಿಎಸ್, ಅಥವಾ ಐಎಂಪಿಎಸ್"].map((doc, i) => (
                  <li key={i} className="kannada flex items-start gap-3 text-[13px]" style={{ color: C.body }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                      style={{ background: C.orangeLight, color: C.orangeMid }}>{i + 1}</span>
                    {doc}
                  </li>
                ))}
              </ol>
              <p className="kannada mt-5 text-[12px]" style={{ color: C.muted }}>
                ಮುಖ್ಯ ವ್ಯಾಜ್ಯ: <strong style={{ color: C.text }}>"ಬೆಂಗಳೂರು ಮೆಟ್ರೋ ಸಿಟಿ ಇನ್‌ಫ್ರಾಸ್ಟ್ರಕ್ಚರ್ ಹೌಸಿಂಗ್ ಕೋ-ಆಪರೇಟಿವ್ ಸೊಸೈಟಿ"</strong>
              </p>
            </div>
            {/* English — second */}
            <div>
              <h4 className="font-bold text-[15px] mb-5 pb-2" style={{ color: C.orangeMid, borderBottom: `2px solid ${C.border}` }}>
                Documents Required:
              </h4>
              <ol className="flex flex-col gap-3">
                {["Four (4) passport-size photographs","Address proof","Government ID Proof","Nominee ID Proof & 1 Passport Size photo","Payment Mode: Cheque, DD, NEFT, RTGS, or IMPS"].map((doc, i) => (
                  <li key={i} className="flex items-start gap-3 text-[13px]" style={{ color: C.body }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                      style={{ background: C.orangeLight, color: C.orangeMid }}>{i + 1}</span>
                    {doc}
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-[12px]" style={{ color: C.muted }}>
                In favor of: <strong style={{ color: C.text }}>"BENGALURU METRO CITY INFRASTRUCTURE HOUSING CO-OPERATIVE SOCIETY"</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Developments ── */}
      <section className="relative px-6 lg:px-10 py-20 overflow-hidden" style={{ background: C.bgWhite }}>

        {/* ── Left side decoration (xl+) ── */}
        <div className="absolute left-0 top-0 bottom-0 w-52 pointer-events-none overflow-hidden hidden xl:block" aria-hidden="true">
          <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle, ${C.orangeMid}55 1.5px, transparent 1.5px)`, backgroundSize:"22px 22px" }} />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease:"linear" }}
            style={{ position:"absolute", top:"14%", left:"-28%", width:200, height:200, borderRadius:"50%", border:`2px dashed ${C.orangeMid}90` }} />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease:"linear" }}
            style={{ position:"absolute", top:"55%", left:"-18%", width:140, height:140, borderRadius:"50%", border:`1.5px dashed ${C.orangeBright}70` }} />
          <motion.div animate={{ scale:[1,1.3,1], opacity:[0.18,0.38,0.18] }} transition={{ duration:5, repeat:Infinity, ease:"easeInOut" }}
            style={{ position:"absolute", top:"50%", left:"0%", width:110, height:110, borderRadius:"50%", background:C.orangeMid, filter:"blur(24px)" }} />
          <motion.div animate={{ y:[0,-12,0] }} transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }}
            style={{ position:"absolute", top:"34%", left:"22%" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={C.orangeBright} strokeWidth={2} style={{ width:36, height:36, opacity:0.7 }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
          </motion.div>
          {[0,1,2,3].map((i) => (
            <motion.div key={i}
              animate={{ y:[0,-(9+i*5),0], opacity:[0.35,0.75,0.35] }}
              transition={{ duration:3.2+i*0.9, repeat:Infinity, ease:"easeInOut", delay:i*0.7 }}
              style={{ position:"absolute", top:`${18+i*17}%`, left:`${10+(i%2)*28}%`, width:7+i*2, height:7+i*2, borderRadius:"50%", background:C.orangeBright }} />
          ))}
        </div>

        {/* ── Right side decoration (xl+) ── */}
        <div className="absolute right-0 top-0 bottom-0 w-52 pointer-events-none overflow-hidden hidden xl:block" aria-hidden="true">
          <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle, ${C.orangeMid}55 1.5px, transparent 1.5px)`, backgroundSize:"22px 22px" }} />
          <motion.div animate={{ rotate:-360 }} transition={{ duration:32, repeat:Infinity, ease:"linear" }}
            style={{ position:"absolute", top:"20%", right:"-26%", width:175, height:175, borderRadius:"50%", border:`2px dashed ${C.orangeBright}85` }} />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease:"linear" }}
            style={{ position:"absolute", top:"58%", right:"-15%", width:130, height:130, borderRadius:"50%", border:`1.5px dashed ${C.orangeMid}60` }} />
          <motion.div animate={{ scale:[1,1.25,1], opacity:[0.18,0.40,0.18] }} transition={{ duration:6, repeat:Infinity, ease:"easeInOut", delay:2 }}
            style={{ position:"absolute", top:"38%", right:"0%", width:120, height:120, borderRadius:"50%", background:C.orangeBright, filter:"blur(26px)" }} />
          <motion.div animate={{ y:[0,-11,0] }} transition={{ duration:5, repeat:Infinity, ease:"easeInOut", delay:0.8 }}
            style={{ position:"absolute", top:"58%", right:"20%" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={C.orangeMid} strokeWidth={2} style={{ width:34, height:34, opacity:0.65 }}>
              <line x1="3" y1="22" x2="21" y2="22"/>
              <rect x="5" y="2" width="14" height="20" rx="1"/>
              <line x1="9" y1="8" x2="15" y2="8"/><line x1="9" y1="13" x2="15" y2="13"/>
            </svg>
          </motion.div>
          {[0,1,2,3].map((i) => (
            <motion.div key={i}
              animate={{ y:[0,-(8+i*4),0], opacity:[0.35,0.72,0.35] }}
              transition={{ duration:3.8+i*0.6, repeat:Infinity, ease:"easeInOut", delay:i*0.5 }}
              style={{ position:"absolute", top:`${14+i*20}%`, right:`${14+(i%2)*22}%`, width:6+i*2, height:6+i*2, borderRadius:"50%", background:C.orangeMid }} />
          ))}
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: C.orangeBright }} />
              <span className="text-[15px] tracking-[0.5em] uppercase font-extrabold" style={{ color: C.orangeMid }}>Nearby</span>
              <span className="w-8 h-px" style={{ background: C.orangeBright }} />
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl" style={{ color: C.text }}>
              <span style={{ background: `linear-gradient(90deg,${C.orangeMid},${C.orangeBright})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Developments
              </span>
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
            style={{ background: C.bgSection, border: `1px solid ${C.border}`, perspective: "1200px" }}>
            {[
              "Devanahalli DC Office",
              "ITIR Tech Park (12,000 Acres)",
              "Amity University",
              "Harrow International School",
              "Gitam University",
              "Doddaballapura Industrial Area",
              "Padukone–Dravid Sport Academy",
              "Vihaan Public School",
              "Cambridge Institute of Technology",
              "Stonehill International School",
              "Kempegowda International Airport",
              "For More Developments →",
            ].map((item, i) => {
              const isActive = activeDevIdx === i;
              const isLinkItem = i === 11;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  {isLinkItem ? (
                    <a href="/home-v1/contact"
                      className="flex items-center gap-3 py-3 px-4 rounded-xl"
                      style={{
                        background: C.orangeLight,
                        border: `1.5px solid ${C.orangeBright}`,
                        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                        cursor: "pointer",
                        userSelect: "none",
                        textDecoration: "none",
                      }}>
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                        style={{ background: C.orangeBright, color: "#ffffff" }}>12</span>
                      <span className="text-[13px] font-bold flex-1" style={{ color: C.orangeMid }}>
                        {item}
                      </span>
                    </a>
                  ) : (
                    <motion.div
                      animate={isActive
                        ? { scale: 1.07, rotateX: -10, rotateY: 2, y: -7 }
                        : { scale: 1,    rotateX: 0,   rotateY: 0, y: 0  }}
                      whileHover={!isActive ? { scale: 1.04, y: -4, rotateX: -5 } : {}}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 320, damping: 22 }}
                      onClick={() => setActiveDevIdx(isActive ? null : i)}
                      className="flex items-center gap-3 py-3 px-4 rounded-xl"
                      style={{
                        background: isActive ? C.orangeLight : "#ffffff",
                        border: isActive ? `1.5px solid ${C.orangeBright}` : `1px solid ${C.border}`,
                        boxShadow: isActive
                          ? `0 20px 45px rgba(234,88,12,0.28), 0 0 0 3px ${C.orangeBright}30`
                          : "0 1px 4px rgba(0,0,0,0.05)",
                        transformStyle: "preserve-3d",
                        cursor: "pointer",
                        userSelect: "none",
                        transition: "background 0.25s, border 0.25s, box-shadow 0.25s",
                      }}>
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                        style={{
                          background: isActive ? C.orangeBright : C.orangeLight,
                          color: isActive ? "#ffffff" : C.orange,
                          transition: "background 0.25s, color 0.25s",
                        }}>{i + 1}</span>
                      <span className="text-[13px] font-semibold flex-1"
                        style={{ color: isActive ? C.orange : C.text, transition: "color 0.25s" }}>
                        {item}
                      </span>
                      {isActive && (
                        <motion.svg
                          initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          viewBox="0 0 24 24" fill="none" stroke={C.orangeBright} strokeWidth={2.5}
                          className="w-4 h-4 shrink-0">
                          <polyline points="20 6 9 17 4 12" />
                        </motion.svg>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Amenities ── */}
      <section className="relative overflow-hidden py-24" style={{ background: "#fff7ed" }}>
        {/* Header */}
        <div className="max-w-3xl mx-auto px-6 mb-14 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.3em] uppercase mb-5"
            style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.35)", color: "#f97316" }}
          >
            Amenities
          </div>
          <h2 className="font-extrabold text-4xl md:text-5xl tracking-tight mb-4" style={{ color: C.text }}>
            Every Comfort,{" "}
            <span style={{ background: "linear-gradient(90deg,#f97316,#fb923c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Thoughtfully Planned
            </span>
          </h2>
          <p className="text-[15px]" style={{ color: C.muted }}>
            BMI North Metro City is equipped with modern infrastructure and world-class amenities for a premium lifestyle.
          </p>
        </div>

        {/* Scrolling columns */}
        <div
          className="flex justify-center gap-5 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
            maxHeight: "700px",
          }}
        >
          <TestimonialsColumn duration={16} testimonials={[
            { name: "60ft Main Road",            role: "Infrastructure", text: "Wide 60-foot roads ensuring smooth traffic flow and easy accessibility throughout the layout.", image: "/amenities/road.jpg", accent: "#f97316" },
            { name: "Water Connection",           role: "Utilities",      text: "24/7 freshwater supply with dedicated pipeline connections to every plot in the layout.", image: "/amenities/water.jpg", accent: "#f97316" },
            { name: "Underground Electricity",    role: "Utilities",      text: "Safe underground electrical cabling eliminating overhead wires for a cleaner, safer environment.", image: "/amenities/electricity.jpg", accent: "#f97316" },
            { name: "Entrance Arch",              role: "Infrastructure", text: "Grand entrance arch with 24/7 security, giving your home a prestigious and welcoming address.", image: "/nmc-amenities-hero.png", accent: "#f97316" },
          ]} />
          <TestimonialsColumn duration={20} className="hidden md:block" testimonials={[
            { name: "Swimming Pool",              role: "Recreation",     text: "Premium swimming pool for residents to relax, exercise, and enjoy leisure time with family.", image: "/amenities/swimming-pool.jpg", accent: "#fb923c" },
            { name: "Club House",                 role: "Recreation",     text: "Modern club house with premium facilities for community gatherings, events, and leisure.", image: "/amenities/clubhouse.jpg", accent: "#fb923c" },
            { name: "Amphitheater",               role: "Community",      text: "Open-air amphitheater for community events, cultural programs, and outdoor entertainment.", image: "/amenities/amphitheater.jpg", accent: "#fb923c" },
            { name: "Theme Park & Gardens",       role: "Recreation",     text: "Landscaped parks with seating, walking paths, and play areas for all ages.", image: "/amenities/park.jpg", accent: "#fb923c" },
          ]} />
          <TestimonialsColumn duration={18} className="hidden lg:block" testimonials={[
            { name: "Street Lights",              role: "Infrastructure", text: "Solar-powered street lights ensuring safety and clear visibility throughout the night.", image: "/amenities/street-lights.jpg", accent: "#f97316" },
            { name: "Underground Sewage",         role: "Sanitation",     text: "Modern underground sewage system ensuring a clean, hygienic, and odour-free environment.", image: "/amenities/sewage.jpg", accent: "#f97316" },
            { name: "Outdoor Gym",                role: "Recreation",     text: "Open-air fitness station with modern equipment for a healthy and active lifestyle.", image: "/amenities/gym.jpg", accent: "#f97316" },
            { name: "CCTV Surveillance",          role: "Security",       text: "24/7 CCTV surveillance across the entire layout for complete peace of mind.", image: "/amenities/cctv.jpg", accent: "#f97316" },
          ]} />
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/home-v1/contact"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-bold text-white"
            style={{ background: "linear-gradient(135deg,#f97316,#c2410c)", boxShadow: "0 6px 24px rgba(249,115,22,0.4)" }}
          >
            Contact for a Site Visit →
          </a>
        </div>
      </section>

      {/* ── Notes ── */}
      <section className="px-6 lg:px-10 pb-16" style={{ background: "#fff7ed" }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl px-8 py-6" style={{ background: "#fef9c3", border: "1px solid #fde68a" }}>
            <h4 className="font-bold text-[12px] tracking-[0.25em] uppercase mb-3" style={{ color: "#92400e" }}>Note:</h4>
            <ul className="flex flex-col gap-2">
              {["Corner sites will be charged extra at the time of Allotment.","Registration Charges should be borne by Members.",'Allotment will be done on "FIRST COME FIRST SERVE BASES".'].map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px]" style={{ color: "#78350f" }}>
                  <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "#d97706" }} />
                  {note}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── Project Video ── */}
      <section className="px-6 lg:px-10 py-20 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #050a1a 0%, #1a0a00 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-10 h-px" style={{ background: "rgba(251,146,60,0.4)" }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.orangeBright }}>
                ಯೋಜನಾ ವಿಡಿಯೋ · Project Video
              </span>
              <span className="w-10 h-px" style={{ background: "rgba(251,146,60,0.4)" }} />
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl text-white mb-3">
              BMI{" "}
              <span style={{ background: `linear-gradient(90deg, ${C.orangeBright}, #fbbf24)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                North Metro City
              </span>{" "}
              — Virtual Tour
            </h2>
            <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.4)" }}>
              Experience the layout, amenities and location of BMI North Metro City
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.6)", border: "1px solid rgba(251,146,60,0.2)", borderRadius: "1rem", overflow: "hidden" }}
          >
            <VideoPlayer src="/north-metro-city.mp4" poster="/north-metro-overview.png" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-[11px] mt-5"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Adjacent to Amity University · North Bengaluru · ₹1,399/sqft
          </motion.p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 lg:px-10 py-16 text-center"
        style={{ background: `linear-gradient(135deg, #431407, #7c2d12)` }}>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="font-extrabold text-3xl text-white mb-4">
          Interested in North Metro City?
        </motion.h2>
        <p className="text-[15px] mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
          Contact us today or explore our other project.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <motion.a href="tel:+917710556677"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            className="px-8 py-3.5 rounded-xl text-[14px] font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${C.orangeMid}, ${C.orange})` }}>
            Call: 7710556677
          </motion.a>
          <motion.a href="/our-projects/garden-city"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            className="px-8 py-3.5 rounded-xl text-[14px] font-bold"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }}>
            View Garden City →
          </motion.a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
