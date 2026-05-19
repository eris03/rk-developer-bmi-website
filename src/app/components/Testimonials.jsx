"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const reviews = [
  {
    quote:
      "Buying my first plot with BMI was the smoothest experience. Transparent, legal, and absolutely zero stress from start to finish.",
    name: "Rohit Sharma",
    role: "Software Engineer, Bengaluru",
    avatar: "https://i.pravatar.cc/100?img=11",
    stars: 5,
    project: "BMI Garden City",
  },
  {
    quote:
      "BMI Garden City is everything they promised — wide roads, beautiful parks, and crystal-clear titles. Highly recommend to anyone.",
    name: "Anita Reddy",
    role: "Doctor, Devanahalli",
    avatar: "https://i.pravatar.cc/100?img=32",
    stars: 5,
    project: "BMI Garden City",
  },
  {
    quote:
      "From site visit to registration, the BMI team handled everything professionally. Truly a 5-star real estate experience.",
    name: "Vikram Iyer",
    role: "Entrepreneur, Whitefield",
    avatar: "https://i.pravatar.cc/100?img=53",
    stars: 5,
    project: "BMI North Metro City",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/[0.04] blur-3xl" />
      </div>

      <div className="scene-content flex flex-col justify-center">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-3"
        >
          <span className="w-8 h-px bg-gold" />
          <span className="text-gold tracking-[0.4em] uppercase text-[10px]">Testimonials</span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Featured quote */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-8 leading-tight">
              Voices of Our <em className="text-gold not-italic">Members</em>
            </h2>

            {/* Big featured quote */}
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Large open-quote */}
              <div
                className="absolute -top-4 -left-3 font-serif text-[80px] leading-none select-none"
                style={{ color: "rgba(245,158,11,0.15)" }}
              >
                &ldquo;
              </div>

              <p className="font-serif text-xl md:text-2xl text-pearl leading-relaxed italic mb-8 relative z-10">
                &ldquo;{reviews[active].quote}&rdquo;
              </p>

              {/* Author row */}
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full bg-cover bg-center border-2 border-gold/30 shrink-0"
                  style={{ backgroundImage: `url('${reviews[active].avatar}')` }}
                />
                <div>
                  <div className="font-semibold text-pearl text-[15px]">{reviews[active].name}</div>
                  <div className="text-pearl/45 text-[12px] mt-0.5">{reviews[active].role}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: reviews[active].stars }).map((_, j) => (
                        <span key={j} className="text-gold text-sm">★</span>
                      ))}
                    </div>
                    <span className="text-pearl/35 text-[10px] tracking-wide">· {reviews[active].project}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Nav dots */}
            <div className="flex items-center gap-3 mt-8">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === active
                      ? "w-8 h-2 bg-gold"
                      : "w-2 h-2 bg-pearl/20 hover:bg-pearl/40"
                  }`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
              <span className="ml-2 text-pearl/30 text-[10px] tracking-[0.3em]">{active + 1} / {reviews.length}</span>
            </div>
          </motion.div>

          {/* Right: All review cards */}
          <div className="lg:col-span-6 space-y-3">
            {reviews.map((r, i) => (
              <motion.button
                key={r.name}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`w-full text-left group p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  i === active
                    ? "border-gold/40 bg-gold/5 shadow-sm"
                    : "border-pearl/10 bg-slate-deep/40 hover:border-pearl/20 hover:bg-slate-deep/60"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-full bg-cover bg-center border shrink-0"
                    style={{
                      backgroundImage: `url('${r.avatar}')`,
                      borderColor: i === active ? "rgba(245,158,11,0.4)" : "rgba(26,26,24,0.1)",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-medium text-pearl text-[13px]">{r.name}</span>
                      <span className="text-pearl/30 text-[10px]">·</span>
                      <span
                        className="text-[9px] tracking-[0.15em] uppercase"
                        style={{ color: i === active ? "#f59e0b" : "rgba(26,26,24,0.35)" }}
                      >
                        {r.project}
                      </span>
                    </div>
                    <p className="text-pearl/55 text-[12px] leading-relaxed line-clamp-2 font-light">
                      &ldquo;{r.quote}&rdquo;
                    </p>
                    <div className="flex gap-0.5 mt-2">
                      {Array.from({ length: r.stars }).map((_, j) => (
                        <span key={j} className="text-gold text-[11px]">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 px-5 py-3 rounded-xl border border-pearl/8 bg-slate-deep/30"
            >
              <div className="text-center">
                <div className="font-serif text-xl text-gold">4.9</div>
                <div className="text-[8px] text-pearl/35 tracking-widest uppercase">Rating</div>
              </div>
              <div className="w-px h-8 bg-pearl/10" />
              <div>
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-gold text-sm">★</span>
                  ))}
                </div>
                <div className="text-pearl/40 text-[10px] tracking-wide">Based on 1,000+ member reviews</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
