import { NextResponse } from "next/server";
import { addContactMessage } from "@/lib/supabase";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(ip, 5, 10 * 60 * 1000);

    if (!rateLimit.success) {
      return NextResponse.json(
        { success: false, error: "Too many messages sent. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, inquiryType = "General Inquiry", message, hp } = body;

    // Honeypot check: If bot filled the hidden honeypot field, silently discard
    if (hp) {
      return NextResponse.json({ success: true, message: "Message delivered." });
    }

    // Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter your message." },
        { status: 400 }
      );
    }

    // Save message
    const result = await addContactMessage(name, email, inquiryType, message);
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
