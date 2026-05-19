"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const interests = ["BMI Garden City", "BMI North Metro City", "Upcoming Projects", "General Enquiry"];
const ranges    = ["Under ₹ 20 L", "₹ 20 L – 50 L", "₹ 50 L – 1 Cr", "₹ 1 Cr +"];

export default function Contact() {
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.target;
    const body = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      interest: form.interest.value,
      range: form.range.value,
      message: form.message.value,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send");
      }
      setSent(true);
      form.reset();
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.06]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=80')" }}
        />
        <div className="absolute inset-0" style={{ background: "var(--slate)" }} />
      </div>

      <div className="scene-content">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-2">
          <span className="w-8 h-px bg-gold" />
          <span className="text-gold tracking-[0.4em] uppercase text-[10px]">Contact Us</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ── Left: Info panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-4"
          >
            <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] tracking-[-0.01em] mb-5">
              Let&apos;s build your{" "}
              <em className="text-gold not-italic">dream</em> together.
            </h2>
            <p className="text-pearl/55 leading-relaxed font-light text-[13px] mb-7 max-w-xs">
              Talk to our advisors today. We&apos;ll help you find the perfect plot that matches your vision and budget.
            </p>

            {/* Contact details */}
            <div className="space-y-4 text-sm mb-7">
              <ContactRow
                icon={<MapPinIcon />}
                label="Head Office"
                value="#28/1, 2nd Floor, 1st Cross, 15th Main E-Block, Sahakar Nagar, Bengaluru – 560092"
              />
              <ContactRow
                icon={<PhoneIcon />}
                label="Mobile"
                value="7710556677"
                href="tel:+917710556677"
              />
              <ContactRow
                icon={<PhoneIcon />}
                label="Landline"
                value="080 6646 9061"
                href="tel:08066469061"
              />
              <ContactRow
                icon={<MailIcon />}
                label="Email"
                value="info@bmihousing.com"
                href="mailto:info@bmihousing.com"
              />
            </div>

            {/* Payment notice */}
            <div className="p-4 rounded-xl border border-ember/25 bg-ember/5 text-[11px] text-pearl/55 leading-relaxed mb-5">
              <span className="text-ember font-semibold">Payment Notice: </span>
              Payments accepted via Cheque, Money Order, RTGS, NEFT, or IMPS only. No cash transactions.
            </div>

            {/* Social */}
            <a
              href="https://instagram.com/metrocityblr"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2.5 text-pearl/40 hover:text-gold transition-colors text-[11px] tracking-wide group"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @metrocityblr
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-8 rounded-2xl border border-pearl/10 bg-slate-deep/50 p-6 md:p-8"
            style={{ backdropFilter: "blur(12px)" }}
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-pearl/10">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-pearl/45 text-[10px] tracking-[0.4em] uppercase">Enquiry Form</span>
              <span className="ml-auto text-pearl/30 text-[10px]">We respond within 24 hrs</span>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <Field label="Full Name" name="name" required />
              <Field label="Phone Number" name="phone" type="tel" required />
            </div>
            <div className="mb-5">
              <Field label="Email Address" name="email" type="email" required />
            </div>
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <Select label="Project Interest" name="interest" options={interests} />
              <Select label="Budget Range" name="range" options={ranges} />
            </div>
            <div className="mb-6">
              <Field label="Your Message" name="message" type="textarea" />
            </div>

            {error && (
              <p className="mb-4 text-ember text-[12px] tracking-wide">{error}</p>
            )}

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <p className="text-pearl/30 text-[9px] tracking-[0.3em] uppercase">
                Your information is 100% confidential
              </p>
              <motion.button
                type="submit"
                disabled={loading || sent}
                whileHover={{ scale: loading || sent ? 1 : 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-gold text-slate text-[11px] font-medium tracking-[0.3em] uppercase rounded-full hover:bg-yellow-400 transition-colors min-w-[200px] justify-center disabled:opacity-70 cursor-pointer"
              >
                {sent ? "✓ Enquiry Sent!" : loading ? "Sending…" : "Send Enquiry"}
                {!sent && !loading && (
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>

        {/* Footer strip */}
        <div className="mt-8 pt-5 border-t border-pearl/10 flex flex-col md:flex-row justify-between items-center gap-3 text-pearl/30 text-[9.5px] tracking-[0.25em] uppercase">
          <div>© 2025 BMI Housing Co-Operative Society Ltd. · Reg. JRB/RGN/CR-13/51578/2022-23</div>
          <div className="flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>Bengaluru Metro City Infrastructure</span>
            <span className="w-1 h-1 rounded-full bg-ember" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Sub-components ─── */

function ContactRow({ icon, label, value, href }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-pearl/35 text-[9px] tracking-[0.3em] uppercase mb-0.5">{label}</div>
        {href ? (
          <a href={href} className="text-pearl/75 hover:text-gold transition-colors text-[13px]">{value}</a>
        ) : (
          <div className="text-pearl/75 text-[13px]">{value}</div>
        )}
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", required = false }) {
  return (
    <label className="block">
      <span className="text-pearl/40 text-[9px] tracking-[0.35em] uppercase mb-2 block">{label}</span>
      {type === "textarea" ? (
        <textarea
          name={name}
          rows={3}
          required={required}
          className="w-full bg-white/60 border border-pearl/15 rounded-xl px-4 py-3 text-pearl placeholder-pearl/25 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20 transition-all resize-none text-[13px]"
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          className="w-full bg-white/60 border border-pearl/15 rounded-xl px-4 py-3 text-pearl placeholder-pearl/25 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20 transition-all text-[13px]"
        />
      )}
    </label>
  );
}

function Select({ label, name, options }) {
  return (
    <label className="block">
      <span className="text-pearl/40 text-[9px] tracking-[0.35em] uppercase mb-2 block">{label}</span>
      <select
        name={name}
        className="w-full bg-white/60 border border-pearl/15 rounded-xl px-4 py-3 text-pearl focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20 transition-all appearance-none cursor-pointer text-[13px]"
      >
        <option value="" className="bg-white text-pearl">Select…</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-white text-pearl">{o}</option>
        ))}
      </select>
    </label>
  );
}

/* ─── Icons ─── */
function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.87 2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.5a16 16 0 0 0 6 6z"/>
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}
