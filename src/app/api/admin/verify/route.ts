import { NextResponse } from "next/server";

// Server-side secret passcode (defaults to secure config or fallback)
const ADMIN_PASSCODE =
  process.env.ADMIN_PASSCODE ||
  process.env.NEXT_PUBLIC_ADMIN_PASSCODE ||
  "deuxsentique2026";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passcode } = body;

    if (!passcode || typeof passcode !== "string") {
      return NextResponse.json(
        { success: false, error: "Passcode is required." },
        { status: 400 }
      );
    }

    if (passcode.trim() === ADMIN_PASSCODE.trim()) {
      // Return a temporary bearer token for this administrative session
      // In serverless/stateless Next.js, we encode the auth signature
      const sessionSignature = Buffer.from(
        `dsq_admin_${ADMIN_PASSCODE}_${new Date().toDateString()}`
      ).toString("base64");

      return NextResponse.json({
        success: true,
        token: sessionSignature,
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid administrative passcode." },
      { status: 401 }
    );
  } catch (err) {
    console.error("POST /api/admin/verify error:", err);
    return NextResponse.json(
      { success: false, error: "Authentication verification failed." },
      { status: 500 }
    );
  }
}
