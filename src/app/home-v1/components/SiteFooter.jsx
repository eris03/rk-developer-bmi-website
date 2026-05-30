"use client";

import { motion } from "framer-motion";

const C = {
  green:      "#16a34a",
  greenDark:  "#14532d",
  greenLight: "#dcfce7",
  greenMid:   "#22c55e",
  greenFoot:  "#a8d5a2",
  text:       "#1c3a1c",
  muted:      "#6b7280",
  border:     "#d1fae5",
  body:       "#374151",
};

export default function SiteFooter() {
  return (
    <footer style={{ background: C.greenFoot }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid md:grid-cols-3 gap-10">

          {/* ── Col 1: Logo + Address + Social ── */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="w-14 h-14 rounded-full bg-white shrink-0 flex items-center justify-center overflow-hidden"
                style={{ border: "2px solid rgba(255,255,255,0.65)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/bmi-logo.png" alt="BMI Housing" className="w-full h-full object-contain scale-[1.28]" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="font-bold text-[15px]" style={{ color: C.greenDark }}>BMI Housing</div>
                <div className="text-[10px] tracking-[0.22em] uppercase" style={{ color: "#3a6b3a" }}>Co-Op Society</div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-bold text-[14px] mb-2" style={{ color: C.greenDark }}>Office Location</h4>
              <p className="text-[13px] leading-relaxed" style={{ color: "#2d4a2d" }}>
                1st Cross, 15th Main E Block, Beside Nandana Palace,<br />
                Sahakarnagar, Bengaluru-560092
              </p>
            </div>

            <div className="flex flex-col gap-1.5 mb-6 text-[13px]" style={{ color: "#2d4a2d" }}>
              <div>
                Mobile:&nbsp;
                <a href="tel:7710556677" className="font-bold hover:underline">7710556677</a>
              </div>
              <div>
                Landline:&nbsp;
                <a href="tel:08066469061" className="font-bold hover:underline">080 66469061</a>
              </div>
              <div>
                Email:&nbsp;
                <a href="mailto:info@bmihousing.com" className="font-bold hover:underline">info@bmihousing.com</a>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                {
                  label: "Facebook",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  ),
                },
                {
                  label: "YouTube",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                    </svg>
                  ),
                },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.12)", color: "#1a1a1a" }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Important Links ── */}
          <div>
            <h4 className="font-bold text-[16px] mb-5" style={{ color: C.greenDark }}>Important Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Home",                     href: "/" },
                { label: "E Brochure",               href: "/e-brochure" },
                { label: "Our Projects",              href: "/our-projects" },
                { label: "BMI Garden City",           href: "/our-projects/garden-city" },
                { label: "BMI North Metro City",      href: "/our-projects/north-metro-city" },
                { label: "About Us",                  href: "/our-projects#about" },
                { label: "Membership Registration",   href: "/membership" },
                { label: "Application Registration",  href: "/application-registration" },
                { label: "Contact Us",                href: "/home-v1/contact" },
              ].map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 6 }}
                  className="text-[13px] flex items-center gap-2 transition-colors hover:text-green-900"
                  style={{ color: "#2d4a2d" }}
                >
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ background: C.green }} />
                  {l.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Col 3: Map ── */}
          <div>
            <h4 className="font-bold text-[16px] mb-5 flex items-center gap-2" style={{ color: C.greenDark }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Office Location
            </h4>
            <a
              href="https://maps.app.goo.gl/uSXL9N2KSsUHkz5o7"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl overflow-hidden mb-3 group relative"
              style={{ border: "2px solid rgba(255,255,255,0.55)", boxShadow: "0 4px 14px rgba(0,0,0,0.12)" }}
            >
              <iframe
                title="BMI Housing Office"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.6153578065257!2d77.57426731482207!3d13.057729990797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17c7b2da4a5b%3A0x5e21dd44d7f0e0e5!2sSahakar%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560092!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="180"
                style={{ border: 0, display: "block", pointerEvents: "none" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="px-3 py-1.5 rounded-full text-white text-[11px] font-bold" style={{ background: "rgba(22,163,74,0.85)", backdropFilter: "blur(6px)" }}>
                  Open in Google Maps ↗
                </span>
              </div>
            </a>
            <motion.a
              href="https://maps.app.goo.gl/uSXL9N2KSsUHkz5o7"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-bold mb-3"
              style={{ background: "rgba(22,163,74,0.12)", border: "1px solid rgba(22,163,74,0.35)", color: "#16a34a" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Get Directions
            </motion.a>

            {/* Quick-call CTA */}
            <motion.a
              href="tel:7710556677"
              whileHover={{ scale: 1.03, boxShadow: `0 8px 20px rgba(22,163,74,0.35)` }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[14px] font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.91 19.79 19.79 0 0 1 1.61 4.28 2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.7a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Call Now: 7710556677
            </motion.a>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.4)" }}
        >
          <div className="text-[11px] tracking-[0.12em]" style={{ color: "rgba(20,50,20,0.65)" }}>
            © 2024–2025 Bengaluru Metro City Infrastructure (BMI) Housing Co-Operative Society. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]" style={{ color: "rgba(20,50,20,0.65)" }}>
            <a href="/disclaimer" className="hover:text-green-900 transition-colors">Disclaimer</a>
            <span>/</span>
            <a href="/disclaimer" className="hover:text-green-900 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
