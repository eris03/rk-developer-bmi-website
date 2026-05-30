import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { name, phone, email, subject, message, project } = body;

    const html = `
      <div style="font-family:Georgia,serif;max-width:680px;margin:0 auto;color:#1a1a1a;">
        <div style="background:linear-gradient(135deg,#14532d,#0d2818);padding:28px 36px;">
          <h1 style="color:#86efac;font-size:22px;margin:0;letter-spacing:0.06em;">BMI HOUSING CO-OP SOCIETY</h1>
          <p style="color:rgba(255,255,255,0.55);font-size:11px;margin:6px 0 0;letter-spacing:0.3em;text-transform:uppercase;">New Contact / Site Visit Enquiry</p>
        </div>
        <div style="padding:28px 36px;background:#ffffff;border:1px solid #e5e7eb;border-top:none;">
          <p style="color:#16a34a;font-size:13px;font-weight:bold;margin-bottom:16px;">📩 New contact enquiry received from the website</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#888;font-size:12px;width:160px;">Name</td><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;font-weight:bold;">${name || "—"}</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#888;font-size:12px;">Phone</td><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${phone || "—"}</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#888;font-size:12px;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;"><a href="mailto:${email}" style="color:#16a34a;">${email || "—"}</a></td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#888;font-size:12px;">Project Interest</td><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${project || "—"}</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#888;font-size:12px;">Subject</td><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${subject || "—"}</td></tr>
            <tr><td style="padding:8px 12px;color:#888;font-size:12px;vertical-align:top;">Message</td><td style="padding:8px 12px;font-size:13px;line-height:1.6;">${(message || "—").replace(/\n/g, "<br/>")}</td></tr>
          </table>
          <div style="margin-top:24px;padding:16px 20px;background:#f0fdf4;border-left:4px solid #16a34a;border-radius:4px;">
            <p style="margin:0;font-size:12px;color:#14532d;">Please follow up with <strong>${name || "the enquirer"}</strong>${phone ? ` at <strong>${phone}</strong>` : ""}${email ? ` or <strong>${email}</strong>` : ""}.</p>
          </div>
        </div>
        <div style="padding:14px 36px;text-align:center;color:#9ca3af;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;background:#f9fafb;border:1px solid #e5e7eb;border-top:none;">
          BMI Housing Co-Operative Society Ltd · Bengaluru 560092
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "BMI Housing <onboarding@resend.dev>",
      to: ["info@bmihousing.com"],
      replyTo: email || undefined,
      subject: `New Enquiry: ${subject || "Contact / Site Visit"} — ${name || "Visitor"}`,
      html,
    });

    if (error) {
      console.error("Resend contact error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
