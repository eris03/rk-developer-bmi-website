"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

/**
 * Immersive3D - 100vh section with a procedural Three.js site plan.
 * The actual canvas/scene is dynamically imported (ssr:false) so
 * three.js never lands in the server bundle.
 */
const Canvas3D = dynamic(() => import("./Immersive3DCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />
});

export default function Immersive3D() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-deep via-slate to-slate-deep" />
      {/* gold haze */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.07] blur-3xl pointer-events-none" />

      <Canvas3D />

      <div className="relative z-10 text-center px-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="pointer-events-auto"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold tracking-[0.4em] uppercase text-[10px]">Immersive Layout</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.01em]">
            Step inside your <em className="text-gold not-italic">future home</em>.
          </h2>
          <p className="mt-6 text-pearl/55 font-light text-[15px] max-w-xl mx-auto">
            A 3D rendering of the masterplan. Hover anywhere to inspect.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-3 pointer-events-auto"
        >
          {[
            { l: "Plot Sizes", v: "1,200 – 4,000 sqft" },
            { l: "Starting at", v: "₹ 1,899 / sq.ft." },
            { l: "Open Space", v: "60% Greenery" }
          ].map((c) => (
            <div
              key={c.l}
              className="glass-light rounded-sm px-5 py-3 min-w-[180px] text-left"
            >
              <div className="text-gold/80 text-[9px] tracking-[0.35em] uppercase">{c.l}</div>
              <div className="font-serif text-base text-pearl mt-1">{c.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
