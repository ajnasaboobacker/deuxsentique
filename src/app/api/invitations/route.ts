import { NextResponse } from "next/server";
import {
  addInvitation,
  getInvitations,
  updateInvitationStatus,
  deleteInvitation,
  checkIsSupabaseConfigured,
} from "@/lib/supabase";

export async function GET() {
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
    const { email, source = "homepage" } = body;

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
