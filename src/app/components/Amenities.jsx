"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const amenities = [
  { tag: "01 / Recreation",  title: "The Clubhouse",        desc: "14,000 sqft of curated community living. Lounge, library, cafe and co-working - each space designed for slow afternoons.", img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400&q=85" },
  { tag: "02 / Nature",      title: "Green Zones",          desc: "60% open landscape. Native trees, walking trails and meditation gardens woven through every layout.",                  img: "https://images.unsplash.com/photo-1605713288610-00ce42abf26b?w=1400&q=85" },
  { tag: "03 / Wellness",    title: "Wellness Block",       desc: "Olympic pool, gym, yoga deck, spa and a dedicated children pool - wellness as part of everyday rhythm.",                img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1400&q=85" },
  { tag: "04 / Mobility",    title: "Smart Streets",        desc: "40-foot wide internal roads, EV charging at every block and a pedestrian-first internal masterplan.",                  img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=85" },
  { tag: "05 / Future",      title: "Modern Infrastructure",desc: "Underground utilities, fiber-to-the-home, smart drainage and solar-lit walkways - built once, built right.",            img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=85" }
];

export default function Amenities() {
  const [idx, setIdx] = useState(0);
  const a = amenities[idx];
  const next = () => setIdx((i) => (i + 1) % amenities.length);
  const prev = () => setIdx((i) => (i - 1 + amenities.length) % amenities.length);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-slate-deep">
      <div className="scene-content !overflow-hidden flex flex-col !h-screen">
        <div className="flex items-end justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold tracking-[0.4em] uppercase text-[10px]">Amenities</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.05]">
              The art of <em className="text-gold not-italic">everyday luxury</em>.
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-3 text-pearl/45 text-[10px] uppercase tracking-[0.4em]">
            <button onClick={prev} className="w-10 h-10 grid place-items-center rounded-full border border-pearl/20 hover:border-gold hover:text-gold">&#8592;</button>
            <span className="font-serif text-base text-pearl">{String(idx + 1).padStart(2, "0")}<span className="text-pearl/30"> / 0{amenities.length}</span></span>
            <button onClick={next} className="w-10 h-10 grid place-items-center rounded-full border border-pearl/20 hover:border-gold hover:text-gold">&#8594;</button>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-6 items-center flex-1 min-h-0">
          <AnimatePresence mode="wait">
            <motion.article key={a.title}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-7 relative h-[55vh] md:h-[60vh] rounded-sm overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('" + a.img + "')" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-deep via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <span className="text-gold/85 text-[10px] tracking-[0.4em] uppercase">{a.tag}</span>
              </div>
            </motion.article>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div key={"i-" + a.title}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-5">
              <h3 className="font-serif text-3xl md:text-4xl mb-4">{a.title}</h3>
              <p className="text-pearl/65 leading-relaxed font-light text-[15px] max-w-md">{a.desc}</p>
              <div className="mt-6 h-px w-12 bg-gold/60" />
              <div className="mt-6 flex md:hidden gap-3">
                <button onClick={prev} className="w-10 h-10 grid place-items-center rounded-full border border-pearl/25 hover:border-gold">&#8592;</button>
                <button onClick={next} className="w-10 h-10 grid place-items-center rounded-full border border-pearl/25 hover:border-gold">&#8594;</button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {amenities.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={"h-px transition-all duration-300 " + (i === idx ? "bg-gold w-12" : "bg-pearl/25 w-6 hover:bg-pearl/60")} />
          ))}
        </div>
      </div>
    </section>
  );
}
