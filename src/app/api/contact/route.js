import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, phone, email, interest, range, message } = await req.json();

    if (!name || !phone || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"BMI Housing Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `New Membership Enquiry — ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #1a1a1a; padding: 24px 32px;">
            <h1 style="color: #c5a059; font-size: 20px; margin: 0; letter-spacing: 0.1em;">BMI HOUSING</h1>
            <p style="color: #888; font-size: 11px; margin: 4px 0 0; letter-spacing: 0.3em; text-transform: uppercase;">New Membership Enquiry</p>
          </div>
          <div style="padding: 32px; border: 1px solid #e0e0e0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 12px; width: 140px;">Full Name</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px;">${name}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 12px;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px;">${phone}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 12px;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px;"><a href="mailto:${email}" style="color: #c5a059;">${email}</a></td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 12px;">Interest</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px;">${interest || "—"}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 12px;">Budget Range</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px;">${range || "—"}</td></tr>
              <tr><td style="padding: 10px 0; color: #888; font-size: 12px; vertical-align: top; padding-top: 16px;">Message</td><td style="padding: 10px 0; font-size: 14px; padding-top: 16px;">${message || "—"}</td></tr>
            </table>
            <div style="margin-top: 32px; padding: 16px; background: #fffbf5; border-left: 3px solid #c5a059;">
              <p style="margin: 0; font-size: 12px; color: #888;">Reply directly to this email to contact <strong style="color: #1a1a1a;">${name}</strong> at ${email}</p>
            </div>
          </div>
          <div style="padding: 16px 32px; text-align: center; color: #bbb; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">BMI Housing Co-Operative Society · Bengaluru</div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }
}
