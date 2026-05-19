"use client";

import { motion } from "framer-motion";
import RevealText from "./RevealText";
import MagnetButton from "./MagnetButton";

const PROP_IMG = "/screenshots/nm-276.jpg";

export default function HeroInfo() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#111a13] to-[#0a0f0d]" />
        {/* Subtle green glow top-right */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(134,239,172,0.07) 0%, transparent 70%)" }}
        />
        {/* Gold glow bottom-left */}
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)" }}
        />
      </div>

      {/* Glow orb */}
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 18, 0], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-[20%] w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%)" }}
      />

      {/* Main content */}
      <div className="scene-content !overflow-hidden flex flex-col justify-center !h-screen">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">

          {/* ── Left: Headline + CTA ── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-3 mb-7"
            >
              <span className="w-12 h-px bg-gold" />
              <span className="text-gold tracking-[0.4em] uppercase text-[11px] font-medium">
                Bengaluru Metro City Infrastructure
              </span>
            </motion.div>

            <h1 className="font-serif font-medium text-white text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] leading-[1.04] tracking-[-0.01em] mb-7">
              <RevealText delay={0}>Imagine Owning</RevealText>
              <RevealText delay={0.15}>
                <span>Your Dream </span>
                <em className="not-italic text-gold">Land in</em>
              </RevealText>
              <RevealText delay={0.28}>
                <em className="not-italic" style={{ color: "#86efac" }}>Bengaluru.</em>
              </RevealText>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-white/65 leading-relaxed text-[15px] mb-9 font-light max-w-lg"
            >
              A government-approved co-operative housing society crafting premium plots &amp; layouts in
              Bengaluru&apos;s fastest-growing corridors — RERA &amp; DTCP approved.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-wrap items-center gap-4"
            >
              <MagnetButton href="#" data-jump="9">Enquire Now</MagnetButton>
              <a
                data-jump="3"
                className="cursor-pointer inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-white/55 hover:text-gold transition-colors px-5 py-3 border border-white/15 rounded-full hover:border-gold/40"
              >
                View Projects <span aria-hidden="true">→</span>
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.7 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              {["RERA Approved", "DTCP Approved", "BMRDA Approved", "Co-Op Society Reg."].map((badge) => (
                <span key={badge} className="px-3 py-1.5 rounded-full bg-white/8 border border-white/15 text-white/50 text-[9px] tracking-[0.2em] uppercase">
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Property info glass card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div
              className="rounded-2xl overflow-hidden border border-white/12"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {/* Property image */}
              <div className="relative h-44 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url('${PROP_IMG}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-ember text-white text-[9px] tracking-[0.2em] uppercase font-semibold">
                    Hot Selling
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="text-white font-serif text-lg font-semibold leading-tight">BMI North Metro City</div>
                  <div className="text-white/65 text-[11px] mt-0.5">Adjacent to Amity University, Vishwanathapura</div>
                </div>
              </div>

              {/* Stats inside card */}
              <div className="p-5">
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { val: "₹1,399", sub: "per sqft" },
                    { val: "10+", sub: "Acres" },
                    { val: "4-EMI", sub: "Payment Plan" },
                  ].map((s) => (
                    <div key={s.sub} className="text-center py-3 rounded-xl bg-white/5 border border-white/8">
                      <div className="font-serif text-lg text-gold font-semibold">{s.val}</div>
                      <div className="text-white/45 text-[9px] tracking-[0.15em] uppercase mt-0.5">{s.sub}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-white/50 text-[11px] mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 text-gold shrink-0">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  Devanahalli · North Bengaluru Corridor
                </div>

                <button
                  data-jump="9"
                  className="w-full py-3 rounded-xl bg-gold text-slate text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-yellow-400 transition-colors cursor-pointer"
                >
                  Register Interest →
                </button>

                <div className="mt-4 pt-4 border-t border-white/10 text-center text-white/30 text-[9px] tracking-[0.2em] uppercase">
                  Price revised to ₹1,399/sqft · Effective Jan 2026
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom metrics bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="mt-10 grid grid-cols-4 divide-x divide-white/10 border border-white/10 rounded-xl overflow-hidden"
          style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(12px)" }}
        >
          {[
            { val: "10+", label: "Active Projects" },
            { val: "10+", label: "Acres Available" },
            { val: "60ft", label: "Wide Main Roads" },
            { val: "24/7", label: "Water & Power" },
          ].map((s) => (
            <div key={s.label} className="px-5 py-3.5 text-center">
              <div className="font-serif text-xl text-gold">{s.val}</div>
              <div className="text-white/40 text-[9px] tracking-[0.2em] uppercase mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
