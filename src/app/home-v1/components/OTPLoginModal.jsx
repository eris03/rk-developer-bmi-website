"use client";

import { useState, useEffect, useRef } from "react";
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

/* ── individual OTP digit box ── */
function OTPInput({ value, onChange, onKeyDown, inputRef, filled }) {
  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="w-11 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all duration-150 caret-transparent"
      style={{
        borderColor: filled ? C.green : "#d1d5db",
        background:  filled ? C.greenLight : "#fff",
        color:       C.text,
        boxShadow:   filled ? `0 0 0 3px ${C.green}22` : "none",
      }}
    />
  );
}

export default function OTPLoginModal({ open, onClose }) {
  const router = useRouter();

  const [step, setStep]         = useState("info");   // "info" | "otp" | "success"
  const [name, setName]         = useState("");
  const [phone, setPhone]       = useState("");
  const [digits, setDigits]     = useState(["", "", "", "", "", ""]);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [demoOtp, setDemoOtp]   = useState(null); // shown in demo mode

  const digitRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  // Reset state when modal opens/closes
  useEffect(() => {
    if (open) { setStep("info"); setError(""); setDigits(["","","","","",""]); }
  }, [open]);

  // Countdown for resend
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // ESC to close
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);

  async function handleSendOTP(e) {
    e?.preventDefault();
    setError("");
    if (!name.trim()) return setError("Please enter your name.");
    // Clean phone the same way the API does — strip country code only if > 10 digits
    let digits = phone.replace(/\D/g, "");
    if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
    else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
    digits = digits.slice(-10);
    if (!/^\d{10}$/.test(digits)) return setError("Enter a valid 10-digit mobile number.");

    setLoading(true);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error || "Failed to send OTP.");
      setStep("otp");
      setCountdown(30);
      if (data.demoOtp) setDemoOtp(data.demoOtp);
      setTimeout(() => digitRefs[0].current?.focus(), 100);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOTP(e) {
    e?.preventDefault();
    const otp = digits.join("");
    if (otp.length !== 6) return setError("Please enter the complete 6-digit OTP.");
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error || "Invalid OTP.");
      setStep("success");
      setTimeout(() => router.push("/member-portal"), 1800);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleDigitChange(idx, val) {
    const ch = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[idx] = ch;
    setDigits(next);
    setError("");
    if (ch && idx < 5) digitRefs[idx + 1].current?.focus();
  }

  function handleDigitKey(idx, e) {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      const next = [...digits];
      next[idx - 1] = "";
      setDigits(next);
      digitRefs[idx - 1].current?.focus();
    }
    if (e.key === "Enter") handleVerifyOTP();
  }

  function handlePaste(e) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(""));
      digitRefs[5].current?.focus();
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
            animate={{ scale: 1,    opacity: 1, y: 0  }}
            exit={{   scale: 0.92,  opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 340, damping: 26 }}
            className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: "#fff" }}
          >
            {/* ── Green header bar ── */}
            <div className="px-7 pt-8 pb-6 text-center"
              style={{ background: `linear-gradient(135deg, ${C.greenDark}, ${C.green})` }}>
              {/* Logo */}
              <div className="flex justify-center mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/bmi-logo.png" alt="BMI" className="w-14 h-14 rounded-full object-contain bg-white/20 p-1" />
              </div>
              <h2 className="font-extrabold text-white text-xl leading-tight">
                {step === "success" ? "Welcome! 🎉" : "Member Sign In"}
              </h2>
              <p className="text-green-200 text-[12px] mt-1">
                {step === "info"    && "Enter your details to receive OTP"}
                {step === "otp"     && `OTP sent to +91 ${phone}`}
                {step === "success" && `Welcome, ${name}! Redirecting…`}
              </p>
            </div>

            {/* ── Close button ── */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-colors text-lg"
            >
              ✕
            </button>

            {/* ── Body ── */}
            <div className="px-7 py-7">
              <AnimatePresence mode="wait">

                {/* ─── STEP 1: Name + Phone ─── */}
                {step === "info" && (
                  <motion.form
                    key="info"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x:  0 }}
                    exit={{   opacity: 0, x:  20 }}
                    onSubmit={handleSendOTP}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[12px] font-semibold mb-1.5" style={{ color: C.text }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none transition-all"
                        style={{
                          borderColor: "#d1d5db",
                          color: C.text,
                        }}
                        onFocus={(e) => (e.target.style.borderColor = C.green)}
                        onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold mb-1.5" style={{ color: C.text }}>
                        Mobile Number
                      </label>
                      <div className="flex gap-2">
                        <div className="shrink-0 flex items-center gap-1.5 px-3 rounded-xl border text-[13px] font-medium"
                          style={{ borderColor: "#d1d5db", color: C.muted, background: "#f9fafb" }}>
                          🇮🇳 +91
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          placeholder="10-digit number"
                          className="flex-1 px-4 py-3 rounded-xl border text-[14px] outline-none transition-all"
                          style={{ borderColor: "#d1d5db", color: C.text }}
                          onFocus={(e) => (e.target.style.borderColor = C.green)}
                          onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                        />
                      </div>
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{   opacity: 0, height: 0 }}
                          className="text-[12px] px-3 py-2 rounded-lg"
                          style={{ color: C.error, background: "#fef2f2" }}
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={!loading ? { scale: 1.02 } : {}}
                      whileTap={!loading ? { scale: 0.97 } : {}}
                      className="w-full py-3.5 rounded-xl font-bold text-white text-[14px] flex items-center justify-center gap-2"
                      style={{ background: loading ? "#9ca3af" : `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}
                    >
                      {loading ? (
                        <><SpinnerIcon />&nbsp;Sending OTP…</>
                      ) : (
                        <>Send OTP <span className="opacity-70 text-[12px]">(WhatsApp + SMS)</span></>
                      )}
                    </motion.button>

                    <p className="text-center text-[11px]" style={{ color: C.muted }}>
                      OTP will be sent via WhatsApp &amp; SMS to your number
                    </p>
                  </motion.form>
                )}

                {/* ─── STEP 2: OTP Entry ─── */}
                {step === "otp" && (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x:  0 }}
                    exit={{   opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="text-center">
                      <p className="text-[13px] font-medium mb-1" style={{ color: C.text }}>
                        Enter the 6-digit OTP sent to
                      </p>
                      <p className="text-[15px] font-bold" style={{ color: C.green }}>
                        +91 {phone}
                      </p>
                    </div>

                    {/* Demo mode OTP hint */}
                    {demoOtp && (
                      <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold"
                        style={{ background: "#fef9c3", border: "1px solid #fde68a", color: "#92400e" }}>
                        🔧 Demo OTP:&nbsp;
                        <button
                          onClick={() => setDigits(demoOtp.split(""))}
                          className="font-extrabold tracking-widest underline underline-offset-2 hover:opacity-70"
                          style={{ color: "#b45309", letterSpacing: "0.15em" }}
                        >{demoOtp}</button>
                        <span className="text-[10px] opacity-60">(tap to fill)</span>
                      </div>
                    )}

                    {/* OTP digit boxes */}
                    <div className="flex justify-center gap-2" onPaste={handlePaste}>
                      {digits.map((d, i) => (
                        <OTPInput
                          key={i}
                          value={d}
                          filled={!!d}
                          inputRef={digitRefs[i]}
                          onChange={(e) => handleDigitChange(i, e.target.value)}
                          onKeyDown={(e) => handleDigitKey(i, e)}
                        />
                      ))}
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{   opacity: 0, height: 0 }}
                          className="text-[12px] px-3 py-2 rounded-lg text-center"
                          style={{ color: C.error, background: "#fef2f2" }}
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <motion.button
                      onClick={handleVerifyOTP}
                      disabled={loading || digits.join("").length < 6}
                      whileHover={!loading ? { scale: 1.02 } : {}}
                      whileTap={!loading ? { scale: 0.97 } : {}}
                      className="w-full py-3.5 rounded-xl font-bold text-white text-[14px] flex items-center justify-center gap-2"
                      style={{
                        background: loading || digits.join("").length < 6
                          ? "#9ca3af"
                          : `linear-gradient(135deg, ${C.green}, ${C.greenDark})`,
                      }}
                    >
                      {loading ? <><SpinnerIcon />&nbsp;Verifying…</> : "Verify & Sign In"}
                    </motion.button>

                    <div className="flex items-center justify-between text-[12px]">
                      <button
                        onClick={() => setStep("info")}
                        className="hover:underline"
                        style={{ color: C.muted }}
                      >
                        ← Change number
                      </button>
                      {countdown > 0 ? (
                        <span style={{ color: C.muted }}>Resend in {countdown}s</span>
                      ) : (
                        <button
                          onClick={handleSendOTP}
                          className="font-semibold hover:underline"
                          style={{ color: C.green }}
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ─── STEP 3: Success ─── */}
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
                    <p className="font-bold text-[16px]" style={{ color: C.greenDark }}>
                      Login Successful!
                    </p>
                    <p className="text-[13px]" style={{ color: C.muted }}>
                      Redirecting you to the member portal…
                    </p>
                    <div className="flex gap-1.5 mt-1">
                      {[0,1,2].map((i) => (
                        <motion.div key={i} className="w-2 h-2 rounded-full"
                          style={{ background: C.green }}
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }} />
                      ))}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SpinnerIcon() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
    </svg>
  );
}
