import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import MemberPortalClient from "./MemberPortalClient";

function getSecret() {
  const secret = process.env.SESSION_SECRET || "bmi_housing_secret_2026";
  return new TextEncoder().encode(secret);
}

export const metadata = {
  title: "Member Portal — BMI Housing",
  description: "Exclusive member area for BMI Housing Co-Op Society members.",
};

export default async function MemberPortalPage() {
  // Server-side auth check
  const cookieStore = await cookies();
  const token = cookieStore.get("bmi_session")?.value;

  if (!token) {
    redirect("/?login=1");
  }

  let payload;
  try {
    const { payload: p } = await jwtVerify(token, getSecret());
    payload = p;
  } catch {
    redirect("/?login=1");
  }

  return <MemberPortalClient name={payload.name} phone={payload.phone} />;
}
