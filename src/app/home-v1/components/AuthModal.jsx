"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const C = {
  green:      "#16a34a",
  greenDark:  "#14532d",
  greenLight: "#dcfce7",
  greenMid:   "#22c55e",
  muted:      "#6b7280",
  text:       "#1c3a1c",
  error:      "#dc2626",
  bg:         "#f0fdf4",
};

function Input({ label, type = "text", value, onChange, placeholder, autoComplete }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block text-[12px] font-semibold mb-1.5" style={{ color: C.text }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full px-4 py-3 rounded-xl border-2 text-[14px] outline-none transition-all bg-white"
        style={{
          borderColor: focused ? C.green : "#e5e7eb",
          color: C.text,
          boxShadow: focused ? `0 0 0 3px ${C.green}18` : "none",
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

function PhoneInput({ value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block text-[12px] font-semibold mb-1.5" style={{ color: C.text }}>
        Mobile Number
      </label>
      <div
        className="flex rounded-xl border-2 overflow-hidden transition-all bg-white"
        style={{
          borderColor: focused ? C.green : "#e5e7eb",
          boxShadow: focused ? `0 0 0 3px ${C.green}18` : "none",
        }}
      >
        <div
          className="shrink-0 flex items-center gap-1.5 px-3 text-[13px] font-medium border-r"
          style={{ color: C.muted, background: "#f9fafb", borderColor: "#e5e7eb" }}
        >
          🇮🇳 +91
        </div>
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
          placeholder="10-digit number"
          autoComplete="tel"
          className="flex-1 px-4 py-3 text-[14px] outline-none bg-transparent"
          style={{ color: C.text }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
    </div>
  );
}

function ErrorBox({ msg }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-[12px] px-3 py-2.5 rounded-lg"
          style={{ color: C.error, background: "#fef2f2", border: "1px solid #fecaca" }}
        >
          ⚠ {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function SpinnerIcon() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

/* ── Main Modal ── */
export default function AuthModal({ open, onClose }) {
  const router = useRouter();

  const [step, setStep]       = useState("form");   // "form" | "success"

  // Login fields
  const [lName, setLName]     = useState("");
  const [lPhone, setLPhone]   = useState("");
  const [lPass, setLPass]     = useState("");
  const [lError, setLError]   = useState("");
  const [lLoading, setLLoading] = useState(false);
  const [showLPass, setShowLPass] = useState(false);

  // Reset on open
  useEffect(() => {
    if (open) {
      setStep("form");
      setLName(""); setLPhone(""); setLPass(""); setLError("");
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);

  /* ── Login Submit ── */
  async function handleLogin(e) {
    e?.preventDefault();
    setLError("");
    if (!lName.trim())           return setLError("Please enter your full name.");
    if (!lPhone.trim())          return setLError("Please enter your mobile number.");
    if (lPhone.length !== 10)    return setLError("Enter a valid 10-digit number.");
    if (!lPass.trim())           return setLError("Please enter your password.");
    setLLoading(true);
    try {
      const res  = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: lName.trim(), phone: lPhone, password: lPass }),
      });
      const data = await res.json();
      if (!res.ok) return setLError(data.error || "Login failed. Please try again.");
      setStep("success");
      setTimeout(() => router.push("/member-portal"), 1800);
    } catch {
      setLError("Network error. Please try again.");
    } finally {
      setLLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 32 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 340, damping: 26 }}
            className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: "#fff" }}
          >
            {/* ── Green Header ── */}
            <div
              className="px-7 pt-7 pb-5 text-center"
              style={{ background: `linear-gradient(135deg, ${C.greenDark}, ${C.green})` }}
            >
              <div className="flex justify-center mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/bmi-logo.png" alt="BMI" className="w-14 h-14 rounded-full object-contain bg-white/20 p-1" />
              </div>
              <h2 className="font-extrabold text-white text-xl leading-tight">
                {step === "success" ? "Welcome! 🎉" : "BMI Member Portal"}
              </h2>
              <p className="text-green-200 text-[12px] mt-1">
                {step === "success"
                  ? "Login successful — redirecting…"
                  : "Sign in to access your documents"}
              </p>
            </div>

            {/* ── Close ── */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-colors text-lg font-bold"
            >
              ✕
            </button>

            {/* ── Body ── */}
            <div className="px-7 py-6">
              <AnimatePresence mode="wait">

                {/* SUCCESS */}
                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-4 flex flex-col items-center gap-4 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 280, damping: 16, delay: 0.1 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                      style={{ background: C.greenLight }}
                    >
                      ✓
                    </motion.div>
                    <p className="font-bold text-[16px]" style={{ color: C.greenDark }}>Login Successful!</p>
                    <p className="text-[13px]" style={{ color: C.muted }}>Redirecting to your member portal…</p>
                    <div className="flex gap-1.5 mt-1">
                      {[0,1,2].map((i) => (
                        <motion.div key={i} className="w-2 h-2 rounded-full" style={{ background: C.green }}
                          animate={{ scale: [1,1.5,1], opacity: [1,0.4,1] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* LOGIN FORM */}
                {step === "form" && (
                  <motion.form
                    key="login"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleLogin}
                    className="space-y-4"
                  >
                    <Input
                      label="Full Name"
                      value={lName}
                      onChange={(e) => setLName(e.target.value)}
                      placeholder="Enter your full name"
                      autoComplete="name"
                    />
                    <PhoneInput value={lPhone} onChange={setLPhone} />
                    <div className="relative">
                      <Input
                        label="Password"
                        type={showLPass ? "text" : "password"}
                        value={lPass}
                        onChange={(e) => setLPass(e.target.value)}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLPass(!showLPass)}
                        className="absolute right-3 bottom-3 text-[11px] font-semibold"
                        style={{ color: C.muted }}
                      >
                        {showLPass ? "Hide" : "Show"}
                      </button>
                    </div>

                    <ErrorBox msg={lError} />

                    <motion.button
                      type="submit"
                      onClick={handleLogin}
                      disabled={lLoading}
                      whileHover={!lLoading ? { scale: 1.02, boxShadow: `0 8px 22px ${C.green}40` } : {}}
                      whileTap={!lLoading ? { scale: 0.97 } : {}}
                      className="w-full py-3.5 rounded-xl font-bold text-white text-[14px] flex items-center justify-center gap-2"
                      style={{ background: lLoading ? "#9ca3af" : `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}
                    >
                      {lLoading ? <><SpinnerIcon />&nbsp;Signing in…</> : "Sign In →"}
                    </motion.button>
                  </motion.form>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
