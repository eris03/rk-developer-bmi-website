import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { SignJWT } from "jose";

/* ── Same in-memory store as signup ── */
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

function getSecret() {
  return new TextEncoder().encode(
    process.env.SESSION_SECRET || "bmi_housing_secret_2026"
  );
}

export async function POST(req) {
  try {
    const { phone, password } = await req.json();

    if (!phone?.trim() || !password?.trim()) {
      return NextResponse.json({ error: "Phone and password are required." }, { status: 400 });
    }

    const clean = cleanPhone(phone);
    if (!/^\d{10}$/.test(clean)) {
      return NextResponse.json({ error: "Enter a valid 10-digit mobile number." }, { status: 400 });
    }

    const user = users.get(clean);
    if (!user) {
      return NextResponse.json(
        { error: "Number not registered. Please sign up first." },
        { status: 400 }
      );
    }

    const hash = hashPassword(password, user.salt);
    if (hash !== user.hash) {
      return NextResponse.json({ error: "Incorrect password. Please try again." }, { status: 400 });
    }

    /* ── Issue JWT session ── */
    const token = await new SignJWT({ name: user.name, phone: clean })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(getSecret());

    const response = NextResponse.json({
      success:    true,
      name:       user.name,
      redirectTo: "/member-portal",
    });

    response.cookies.set("bmi_session", token, {
      httpOnly: true,
      path:     "/",
      maxAge:   60 * 60 * 24,
      sameSite: "lax",
    });

    return response;
  } catch (err) {
    console.error("login error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
