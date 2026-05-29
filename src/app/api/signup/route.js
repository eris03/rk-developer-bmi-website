import { NextResponse } from "next/server";
import { createHash, randomBytes } from "crypto";
import nodemailer from "nodemailer";

/* ── In-memory user store ── */
const users = global._bmiUsers ?? (global._bmiUsers = new Map());

function hashPassword(password, salt) {
  return createHash("sha256")
    .update(salt + password + "bmi_housing_secure_2026")
    .digest("hex");
}

function cleanPhone(raw) {
  let p = raw.replace(/\D/g, "");
  if (p.length === 12 && p.startsWith("91")) p = p.slice(2);
  else if (p.length === 11 && p.startsWith("0")) p = p.slice(1);
  return p.slice(-10);
}

async function notifyAdmin(name, phone) {
  const gmailUser  = process.env.GMAIL_USER;
  const gmailPass  = process.env.GMAIL_PASS;
  const adminEmail = process.env.ADMIN_EMAIL || "info@bmihousing.com";

  if (!gmailUser || !gmailPass) {
    console.warn("GMAIL_USER / GMAIL_PASS not configured — skipping email notification.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  const now = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });

  await transporter.sendMail({
    from: `"BMI Housing Portal" <${gmailUser}>`,
    to:   adminEmail,
    subject: `New Member Registration — ${name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;border:1px solid #d1fae5;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#14532d,#16a34a);padding:24px 28px;">
          <h2 style="margin:0;color:#fff;font-size:20px;">New Member Registration</h2>
          <p style="margin:4px 0 0;color:#bbf7d0;font-size:13px;">BMI Housing Co-Op Society — Member Portal</p>
        </div>
        <div style="padding:24px 28px;background:#fff;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr>
              <td style="padding:10px 0;color:#6b7280;font-weight:600;width:40%;">Full Name</td>
              <td style="padding:10px 0;color:#1c3a1c;font-weight:700;">${name}</td>
            </tr>
            <tr style="background:#f0fdf4;">
              <td style="padding:10px 8px;color:#6b7280;font-weight:600;">Mobile Number</td>
              <td style="padding:10px 8px;color:#1c3a1c;font-weight:700;">+91 ${phone}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#6b7280;font-weight:600;">Registered At</td>
              <td style="padding:10px 0;color:#1c3a1c;">${now} IST</td>
            </tr>
          </table>
          <div style="margin-top:20px;padding:12px 16px;background:#fefce8;border-left:3px solid #f59e0b;border-radius:4px;font-size:12px;color:#92400e;">
            This member has created an account on the BMI Housing Member Portal. Please verify and grant document access if required.
          </div>
        </div>
        <div style="padding:14px 28px;background:#f0fdf4;font-size:11px;color:#9ca3af;text-align:center;">
          © BMI Housing Co-Operative Society · Auto-notification
        </div>
      </div>
    `,
  });
}

export async function POST(req) {
  try {
    const { name, phone, password } = await req.json();

    /* ── Validation ── */
    if (!name?.trim())     return NextResponse.json({ error: "Please enter your full name."        }, { status: 400 });
    if (!phone?.trim())    return NextResponse.json({ error: "Please enter your mobile number."    }, { status: 400 });
    if (!password?.trim()) return NextResponse.json({ error: "Please enter a password."            }, { status: 400 });

    const clean = cleanPhone(phone);
    if (!/^\d{10}$/.test(clean)) {
      return NextResponse.json({ error: "Enter a valid 10-digit mobile number." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }

    if (users.has(clean)) {
      return NextResponse.json(
        { error: "This number is already registered. Please sign in instead." },
        { status: 400 }
      );
    }

    /* ── Store user ── */
    const salt = randomBytes(16).toString("hex");
    const hash = hashPassword(password, salt);
    users.set(clean, {
      name:      name.trim(),
      phone:     clean,
      salt,
      hash,
      createdAt: new Date().toISOString(),
    });

    /* ── Notify admin (non-blocking) ── */
    notifyAdmin(name.trim(), clean).catch((err) =>
      console.error("Admin email failed:", err.message)
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("signup error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
