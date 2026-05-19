"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    num: "01",
    color: "#22c55e",
    title: "Trustworthy & Transparent",
    desc: "Registered Co-operative Society (Reg. No: JRB/RGN/CR-13/51578/2022-23). All payments accepted only via Cheque, RTGS, NEFT or IMPS — no cash dealings, ever.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    num: "02",
    color: "#f59e0b",
    title: "Ideal Locations",
    desc: "Our layouts in Devanahalli and North Bengaluru sit adjacent to ITIR Tech Park (12,000 acres), Amity University, and Harrow International School — prime corridors with guaranteed appreciation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    num: "03",
    color: "#6366f1",
    title: "Affordable & Easy Finance",
    desc: "Starting at ₹1,399 per sqft with a convenient 4-installment payment plan. We work closely with banks to facilitate loan approvals for eligible members.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
  },
];

const stats = [
  { val: "1,000+", label: "Happy Members" },
  { val: "10+",    label: "Active Projects" },
  { val: "2022",   label: "Established" },
];

export default function Trust() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Bg glow */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)" }} />

      <div className="scene-content">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ── Left Column ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold tracking-[0.4em] uppercase text-[10px]">About Us</span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.06] tracking-[-0.01em] mb-5">
              Built on <em className="text-gold not-italic">trust</em>,<br />
              driven by <em className="not-italic" style={{ color: "#86efac" }}>community</em>.
            </h2>

            <p className="text-pearl/60 leading-relaxed font-light text-[14px] mb-8 max-w-md">
              BMI Housing was formed with one ambition — to provide residential plots with all amenities
              at an affordable price to the general public, with a focus on Bengaluru&apos;s fastest-growing regions.
            </p>

            {/* Big stat numbers */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((s) => (
                <div key={s.label} className="p-4 rounded-xl border border-pearl/10 bg-slate-deep/60 text-center">
                  <div className="font-serif text-2xl text-gold font-semibold leading-none mb-1">{s.val}</div>
                  <div className="text-pearl/45 text-[9px] tracking-[0.2em] uppercase">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Value chips */}
            <div className="flex flex-wrap gap-2">
              {["Trustworthiness", "Dedication", "Customer Focus", "Responsiveness"].map((v) => (
                <span
                  key={v}
                  className="px-3 py-1.5 rounded-full border border-gold/25 text-gold text-[9px] tracking-[0.2em] uppercase bg-gold/5"
                >
                  {v}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Right Column: Pillar Cards ── */}
          <div className="lg:col-span-7 space-y-4">
            {pillars.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.14 }}
                className="group relative flex gap-5 p-5 rounded-xl border border-pearl/10 bg-slate-deep/40 hover:bg-slate-deep/70 hover:border-pearl/20 transition-all duration-400"
                style={{ borderLeft: `3px solid ${p.color}40` }}
              >
                {/* Left accent bar on hover */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: p.color }}
                />

                {/* Number + Icon */}
                <div className="shrink-0 flex flex-col items-center gap-3 pt-1">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}30` }}
                  >
                    {p.icon}
                  </div>
                  <span
                    className="font-serif text-[11px] font-bold tracking-widest"
                    style={{ color: `${p.color}80` }}
                  >
                    {p.num}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3
                    className="font-serif text-[1.05rem] mb-2 font-semibold transition-colors duration-400"
                    style={{ color: "var(--pearl)" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-pearl/55 leading-relaxed font-light text-[13px]">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Registration notice */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-pearl/8 bg-slate-deep/30"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
              <p className="text-pearl/40 text-[11px] tracking-wide">
                Registered under Karnataka Co-Operative Society Act · Reg. No: JRB/RGN/CR-13/51578/2022-23
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
