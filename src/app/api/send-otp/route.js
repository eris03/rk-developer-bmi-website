import { NextResponse } from "next/server";

// ── in-memory OTP store ──────────────────────────────────────────────────────
const otpStore = global._bmiOtpStore ?? (global._bmiOtpStore = new Map());

function generateOTP() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// ── Fast2SMS (India SMS) ─────────────────────────────────────────────────────
async function sendSMSFast2SMS(phone, otp, name) {
  const apiKey = process.env.FAST2SMS_API_KEY;
  if (!apiKey || apiKey.startsWith("YOUR_")) return { sms: "not_configured" };

  const message = `Dear ${name}, your BMI Housing OTP is ${otp}. Valid for 5 minutes. Do not share. -BMI Housing`;

  try {
    const url = new URL("https://www.fast2sms.com/dev/bulkV2");
    url.searchParams.set("authorization", apiKey);
    url.searchParams.set("numbers", phone);
    url.searchParams.set("message", message);
    url.searchParams.set("flash", "0");
    url.searchParams.set("route", "q");

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: { "cache-control": "no-cache" },
    });
    const data = await res.json();
    console.log("Fast2SMS response:", data);
    return { sms: data.return === true ? "sent" : `failed: ${JSON.stringify(data.message)}` };
  } catch (e) {
    return { sms: `error: ${e.message}` };
  }
}

// ── Twilio WhatsApp ──────────────────────────────────────────────────────────
async function sendWhatsApp(phone, otp, name) {
  const sid    = process.env.TWILIO_ACCOUNT_SID;
  const token  = process.env.TWILIO_AUTH_TOKEN;
  const waFrom = process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+14155238886";

  if (!sid || sid.startsWith("AC_placeholder") || sid.startsWith("ACxxxxxxx")) {
    return { whatsapp: "not_configured" };
  }

  const message = `Hi ${name}! 👋\n\nYour BMI Housing OTP is:\n*${otp}*\n\nValid for 5 minutes. Do not share with anyone.\n\n— BMI Housing 🏡`;
  const toWA    = `whatsapp:+91${phone}`;

  try {
    const body = new URLSearchParams({ To: toWA, From: waFrom, Body: message });
    const res  = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: "Basic " + Buffer.from(`${sid}:${token}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      }
    );
    const data = await res.json();
    console.log("WhatsApp response:", data);
    return { whatsapp: res.ok ? "sent" : `failed: ${data.message}` };
  } catch (e) {
    return { whatsapp: `error: ${e.message}` };
  }
}

// ── Main handler ─────────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const { name, phone } = await req.json();

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    }

    // Strip country code only when number is longer than 10 digits
    let cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length === 12 && cleanPhone.startsWith("91")) cleanPhone = cleanPhone.slice(2);
    else if (cleanPhone.length === 11 && cleanPhone.startsWith("0")) cleanPhone = cleanPhone.slice(1);
    cleanPhone = cleanPhone.slice(-10);
    if (!/^\d{10}$/.test(cleanPhone)) {
      return NextResponse.json({ error: "Please enter a valid 10-digit Indian mobile number." }, { status: 400 });
    }

    // Rate limit: max 3 OTPs per phone per 10 minutes
    const existing = otpStore.get(cleanPhone);
    if (existing && existing.attempts >= 3 && Date.now() - existing.firstAttempt < 10 * 60 * 1000) {
      return NextResponse.json({ error: "Too many OTP requests. Please wait 10 minutes." }, { status: 429 });
    }

    const otp     = generateOTP();
    const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore.set(cleanPhone, {
      otp,
      name: name.trim(),
      expires,
      attempts:     (existing?.attempts || 0) + 1,
      firstAttempt: existing?.firstAttempt || Date.now(),
    });

    const demoMode = process.env.OTP_DEMO_MODE === "true";

    if (demoMode) {
      console.log(`[BMI OTP DEMO] Phone: ${cleanPhone} | OTP: ${otp} | Name: ${name.trim()}`);
      return NextResponse.json({
        success: true,
        demo: true,
        demoOtp: otp,
        message: "OTP generated (Demo Mode — configure Fast2SMS to send real SMS)",
      });
    }

    // Send real OTP via Fast2SMS (SMS) + Twilio (WhatsApp) in parallel
    const [smsResult, waResult] = await Promise.all([
      sendSMSFast2SMS(cleanPhone, otp, name.trim()),
      sendWhatsApp(cleanPhone, otp, name.trim()),
    ]);

    const delivery = { ...smsResult, ...waResult };
    console.log(`OTP delivery for +91${cleanPhone}:`, delivery);

    const smsSent = delivery.sms === "sent";
    const waSent  = delivery.whatsapp === "sent";

    if (!smsSent && !waSent) {
      // Both failed — surface the demo OTP so the user can still test
      return NextResponse.json({
        success: true,
        demo: true,
        demoOtp: otp,
        message: "SMS service not yet configured. Use the OTP shown below to sign in.",
        delivery,
      });
    }

    return NextResponse.json({
      success: true,
      message: smsSent && waSent
        ? "OTP sent via SMS and WhatsApp ✓"
        : smsSent
        ? "OTP sent via SMS ✓"
        : "OTP sent via WhatsApp ✓",
      delivery,
    });
  } catch (err) {
    console.error("send-otp error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
