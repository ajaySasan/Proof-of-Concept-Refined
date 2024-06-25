import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "../../../components/password-email/EmailTemplate";
// import EmailTemplate from "@src/components/password-email/EmailTemplate";

export async function GET(request: Request) {
  const RESEND_API_KEY="re_KPjuHRTv_Jv5BzPnEtshPsccoCMgxefnR"
  const resend = new Resend(RESEND_API_KEY);

  try {
    const body = await request.json();
    console.log("body", body);
    const { pass, email } = body;
    const data = await resend.emails.send({
      from: "noreply@blackdice.ai",
      to: email,
      subject: "Thanks for signing up with BlackDice Cyber",
      react: EmailTemplate({ pass: pass }),
      // html: "<h1>pass</h1>"
    });
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
