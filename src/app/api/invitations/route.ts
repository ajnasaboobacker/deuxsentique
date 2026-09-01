import { NextResponse } from "next/server";
import {
  addInvitation,
  getInvitations,
  updateInvitationStatus,
  deleteInvitation,
  checkIsSupabaseConfigured,
} from "@/lib/supabase";

const ADMIN_PASSCODE =
  process.env.ADMIN_PASSCODE ||
  process.env.NEXT_PUBLIC_ADMIN_PASSCODE ||
  "deuxsentique2026";

function verifyAdminSession(request: Request): boolean {
  const token = request.headers.get("x-admin-token");
  const authHeader = request.headers.get("authorization");

  const expectedSignature = Buffer.from(
    `dsq_admin_${ADMIN_PASSCODE}_${new Date().toDateString()}`
  ).toString("base64");

  if (token === expectedSignature || token === ADMIN_PASSCODE) {
    return true;
  }

  if (authHeader === `Bearer ${expectedSignature}` || authHeader === `Bearer ${ADMIN_PASSCODE}`) {
    return true;
  }

  return false;
}

export async function GET(request: Request) {
  if (!verifyAdminSession(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized administrative access." },
      { status: 401 }
    );
  }

  try {
    const list = await getInvitations();
    const total = list.length;
    const active = list.filter((item) => item.status === "active").length;
    const archived = list.filter((item) => item.status === "archived").length;

    return NextResponse.json({
      success: true,
      data: list,
      stats: { total, active, archived },
      isSupabaseConfigured: checkIsSupabaseConfigured(),
    });
  } catch (error) {
    console.error("GET /api/invitations error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch invitations" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source = "homepage", hp } = body;

    // Honeypot check: If the hidden bot field 'hp' is filled, silently discard
    if (hp) {
      return NextResponse.json({ success: true, message: "Registered." });
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const result = await addInvitation(email, source);
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/invitations error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to register email invitation." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  if (!verifyAdminSession(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized administrative access." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !["active", "archived"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status parameters provided." },
        { status: 400 }
      );
    }

    const result = await updateInvitationStatus(id, status);
    return NextResponse.json(result);
  } catch (error) {
    console.error("PATCH /api/invitations error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update status." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!verifyAdminSession(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized administrative access." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Invitation ID is required." },
        { status: 400 }
      );
    }

    const result = await deleteInvitation(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("DELETE /api/invitations error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete invitation." },
      { status: 500 }
    );
  }
}
