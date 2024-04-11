import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "../../../components/password-email/EmailTemplate"

export async function POST() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "ajay.sasan@blackdice.ai",
      subject: "Thanks for signing up with BlackDice Cyber",
      react: EmailTemplate({ pass: "PASSWORD3"}),
    });
    return NextResponse.json({data});
  } catch (error) {
    return NextResponse.json({ error });
  }
}

