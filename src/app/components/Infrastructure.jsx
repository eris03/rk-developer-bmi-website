"use client";

import { motion } from "framer-motion";

const features = [
  { num: "60",  unit: "ft",  label: "Main Road Width",        desc: "Wide internal roads engineered for smooth traffic, emergency access and EV mobility throughout the layout." },
  { num: "100", unit: "%",   label: "Underground Electricity", desc: "No overhead cables or pylons. Clean skylines and zero disruption during storms — wired right from day one." },
  { num: "24",  unit: "/7",  label: "Water & Sewage",          desc: "Dedicated water connection and modern sewage system built into every plot. No dependency on external supply." },
  { num: "100", unit: "%",   label: "Street Lighting",         desc: "Every road and pathway is lit throughout the night, ensuring the safety of residents at all hours." }
];

export default function Infrastructure() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-x-0 top-[80px] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fbbf24 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />

      <div className="scene-content">
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-7 lg:col-start-3 text-center"
          >
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold tracking-[0.4em] uppercase text-[10px]">Infrastructure</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.01em]">
              Built to <em className="text-gold not-italic">last</em>,<br />
              built for <em className="text-ember-light not-italic">life</em>.
            </h2>
            <p className="mt-5 text-pearl/55 font-light leading-relaxed max-w-xl mx-auto text-[15px]">
              Every BMI layout is developed with world-class infrastructure. The bones of a great community — roads, water, power, light — engineered to outlast generations.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group"
            >
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-serif text-5xl md:text-6xl text-gold leading-none">{f.num}</span>
                <span className="text-gold/70 text-xl font-light">{f.unit}</span>
              </div>
              <h3 className="font-serif text-base md:text-lg mb-2 group-hover:text-gold transition-colors duration-500">
                {f.label}
              </h3>
              <p className="text-pearl/50 text-[12px] leading-relaxed font-light">{f.desc}</p>
              <div className="mt-4 h-px w-10 bg-gold/30 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Amenities strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 pt-8 border-t border-pearl/10"
        >
          <div className="text-pearl/35 text-[9px] tracking-[0.4em] uppercase mb-4">Community Amenities</div>
          <div className="flex flex-wrap gap-3">
            {["Clubhouse", "Swimming Pool", "Amphitheater", "Theme Parks", "Gated Security", "Landscaped Parks"].map((a) => (
              <span key={a} className="px-3 py-1.5 rounded border border-gold/20 text-gold/70 text-[10px] tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-colors">
                {a}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
