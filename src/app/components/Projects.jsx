"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "BMI Garden City",
    location: "Off NH 207, Channahalli, Airlines Dhaba Gate, Devanahalli",
    tag: "Active",
    tagColor: "#f59e0b",
    tagBg: "rgba(245,158,11,0.15)",
    features: ["Premium Plots", "40ft Wide Roads", "60% Open Space", "Gated Community"],
    video: "/garden-city.mp4",
    img: "/screenshots/gc-275.jpg",
    desc: "Strategically located in North Bengaluru's fastest-growing zone near Kempegowda International Airport.",
    featured: true,
  },
  {
    title: "BMI North Metro City",
    location: "Adjacent to Amity University, Vishwanathapura",
    tag: "Hot Selling",
    tagColor: "#ef4444",
    tagBg: "rgba(239,68,68,0.15)",
    features: ["₹1,399 / sqft", "Clubhouse & Pool", "Underground Electricity", "4-EMI Plan"],
    video: "/north-metro-city.mp4",
    img: "/screenshots/nm-276.jpg",
    desc: "Adjacent to ITIR Tech Park (12,000 acres), Amity & Gitam University and Harrow International School.",
    featured: false,
  },
  {
    title: "Upcoming Projects",
    location: "North Bengaluru Corridor",
    tag: "Coming Soon",
    tagColor: "#86efac",
    tagBg: "rgba(134,239,172,0.12)",
    features: ["New Layouts", "Prime Locations", "Affordable Pricing", "Register Interest"],
    video: null,
    img: "/screenshots/nm-368.jpg",
    desc: "Exciting new layouts in high-appreciation zones across North Bengaluru. Register your interest today.",
    featured: false,
  },
];

const nearby = [
  "ITIR Tech Park (12,000 acres)",
  "Kempegowda International Airport",
  "Amity University",
  "Gitam University",
  "Harrow International School",
  "Padukone-Dravid Sport Academy",
  "Devanahalli DC Office",
  "Doddaballapura Industrial Area",
];

/* Shared background — video if available, image fallback */
function ProjectBg({ video, img, className = "" }) {
  if (video) {
    return (
      <>
        {/* Poster image shown until video loads */}
        <div
          className={`absolute inset-0 bg-cover bg-center ${className}`}
          style={{ backgroundImage: `url('${img}')` }}
        />
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 1 }}
          onCanPlay={(e) => { e.target.style.opacity = 1; }}
        />
      </>
    );
  }
  return (
    <div
      className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 ${className}`}
      style={{ backgroundImage: `url('${img}')` }}
    />
  );
}

export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(134,239,172,0.05) 0%, transparent 70%)" }}
      />

      <div className="scene-content">
        {/* Section header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-2"
            >
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold tracking-[0.4em] uppercase text-[10px]">Our Projects</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl lg:text-[2.6rem] leading-tight"
            >
              Premium Layouts Across{" "}
              <em className="text-gold not-italic">North Bengaluru</em>
            </motion.h2>
          </div>
          <motion.button
            data-jump="9"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-pearl/45 hover:text-gold transition-colors border border-pearl/15 rounded-full px-4 py-2 hover:border-gold/30 cursor-pointer"
          >
            Enquire <span>→</span>
          </motion.button>
        </div>

        {/* Project grid */}
        <div className="grid lg:grid-cols-12 gap-4 mb-5">

          {/* ── Featured project (large, with video) ── */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 group relative rounded-xl overflow-hidden cursor-pointer"
            style={{ height: "clamp(280px, 38vh, 400px)" }}
          >
            <ProjectBg video={featured.video} img={featured.img} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

            {/* Tag */}
            <div className="absolute top-4 left-4 z-10">
              <span
                className="px-3 py-1.5 rounded-full text-[9px] tracking-[0.2em] uppercase font-semibold"
                style={{ background: featured.tagBg, color: featured.tagColor, border: `1px solid ${featured.tagColor}40`, backdropFilter: "blur(8px)" }}
              >
                {featured.tag}
              </span>
            </div>

            {/* Video badge */}
            {featured.video && (
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-white/15 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white/80 text-[9px] tracking-[0.15em] uppercase">Live Video</span>
              </div>
            )}

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <h3 className="font-serif text-2xl text-white font-semibold mb-1">{featured.title}</h3>
              <div className="flex items-center gap-1.5 text-white/60 text-[11px] mb-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3 text-gold shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {featured.location}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {featured.features.map((f) => (
                  <span key={f} className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white/80 text-[10px] tracking-wide backdrop-blur-sm">
                    {f}
                  </span>
                ))}
              </div>
              <button
                data-jump="9"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-slate text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-yellow-400 transition-colors cursor-pointer"
              >
                Enquire Now →
              </button>
            </div>
          </motion.article>

          {/* ── Stacked smaller cards ── */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {rest.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                className="group relative rounded-xl overflow-hidden flex-1 cursor-pointer"
                style={{ minHeight: "clamp(120px, 17vh, 190px)" }}
              >
                <ProjectBg video={p.video} img={p.img} className="group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

                {/* Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className="px-2.5 py-1 rounded-full text-[8px] tracking-[0.2em] uppercase font-semibold"
                    style={{ background: p.tagBg, color: p.tagColor, border: `1px solid ${p.tagColor}40`, backdropFilter: "blur(8px)" }}
                  >
                    {p.tag}
                  </span>
                </div>

                {/* Video badge */}
                {p.video && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 border border-white/15 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-white/80 text-[8px] tracking-[0.15em] uppercase">Live</span>
                  </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between z-10">
                  <div>
                    <h3 className="font-serif text-base text-white font-semibold mb-0.5">{p.title}</h3>
                    <div className="text-white/55 text-[10px] line-clamp-1">{p.location}</div>
                  </div>
                  <button
                    data-jump="9"
                    className="shrink-0 ml-3 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[9px] tracking-[0.2em] uppercase hover:bg-gold hover:border-gold hover:text-slate transition-all cursor-pointer backdrop-blur-sm"
                  >
                    Enquire →
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Nearby landmarks */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-start gap-4 p-4 rounded-xl border border-pearl/10 bg-slate-deep/40"
        >
          <div className="text-pearl/35 text-[9px] tracking-[0.35em] uppercase whitespace-nowrap pt-0.5">
            Nearby
          </div>
          <div className="flex flex-wrap gap-2">
            {nearby.map((n) => (
              <span
                key={n}
                className="px-2.5 py-1 rounded-full text-[9.5px] tracking-wide border"
                style={{ background: "rgba(134,239,172,0.08)", color: "#86efac", borderColor: "rgba(134,239,172,0.2)" }}
              >
                {n}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
