"use client";

import { motion } from "framer-motion";

const images = [
  { src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80", label: "Premium Villa", col: "col-span-1 row-span-2" },
  { src: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80", label: "Landscape View", col: "" },
  { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", label: "Interior Design", col: "" },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", label: "Modern Kitchen", col: "col-span-2" },
  { src: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80", label: "Living Space", col: "" },
  { src: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80", label: "Garden Area", col: "col-span-1 row-span-2" },
  { src: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80", label: "Master Bedroom", col: "" },
  { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80", label: "Amenities", col: "col-span-2" },
];

export default function Gallery() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="scene-content">
        {/* Header */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-2"
            >
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold tracking-[0.4em] uppercase text-[10px]">Gallery</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl leading-tight"
            >
              A Glimpse Inside{" "}
              <em className="text-gold not-italic">BMI Communities</em>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex items-center gap-2 text-pearl/40 text-[10px] tracking-[0.25em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Live Photos
          </motion.div>
        </div>

        {/* Masonry-style grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-2.5"
          style={{ height: "calc(100vh - 210px)", minHeight: 320 }}
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-xl cursor-pointer ${img.col}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${img.src}')` }}
              />
              {/* Default overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              {/* Hover: label reveal from bottom */}
              <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400 bg-gradient-to-t from-black/70 to-transparent">
                <span className="text-white text-[10px] tracking-[0.2em] uppercase font-medium">{img.label}</span>
              </div>
              {/* Gold border on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/30 rounded-xl transition-colors duration-400" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
