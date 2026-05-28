import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const otpStore = global._bmiOtpStore ?? (global._bmiOtpStore = new Map());

function getSecret() {
  const secret = process.env.SESSION_SECRET || "bmi_housing_secret_2026";
  return new TextEncoder().encode(secret);
}

export async function POST(req) {
  try {
    const { phone, otp } = await req.json();

    if (!phone?.trim() || !otp?.trim()) {
      return NextResponse.json({ error: "Phone and OTP are required." }, { status: 400 });
    }

    let cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length === 12 && cleanPhone.startsWith("91")) cleanPhone = cleanPhone.slice(2);
    else if (cleanPhone.length === 11 && cleanPhone.startsWith("0")) cleanPhone = cleanPhone.slice(1);
    cleanPhone = cleanPhone.slice(-10);
    const record = otpStore.get(cleanPhone);

    if (!record) {
      return NextResponse.json({ error: "No OTP found for this number. Please request a new OTP." }, { status: 400 });
    }

    if (Date.now() > record.expires) {
      otpStore.delete(cleanPhone);
      return NextResponse.json({ error: "OTP has expired. Please request a new one." }, { status: 400 });
    }

    if (record.otp !== otp.trim()) {
      return NextResponse.json({ error: "Incorrect OTP. Please try again." }, { status: 400 });
    }

    // OTP verified — clear it and issue a session token
    const name = record.name;
    otpStore.delete(cleanPhone);

    // Create a signed JWT valid for 24 hours
    const token = await new SignJWT({ name, phone: cleanPhone })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(getSecret());

    const response = NextResponse.json({
      success: true,
      name,
      redirectTo: "/member-portal",
    });

    // Set session cookie (httpOnly, 24h)
    response.cookies.set("bmi_session", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

    return response;
  } catch (err) {
    console.error("verify-otp error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
