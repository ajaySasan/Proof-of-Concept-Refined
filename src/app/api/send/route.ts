import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "../../../components/password-email/EmailTemplate"

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    const body = await request.json();
    console.log("body", body)
    const {pass, email} = body;
    const data = await resend.emails.send({
      from: "ajay.sasan@blackdice.ai",
      to: email,
      subject: "Thanks for signing up with BlackDice Cyber",
      react: EmailTemplate({ pass: pass }),
    });
    return NextResponse.json({data});
  } catch (error) {
    return NextResponse.json({ error });
  }
}

