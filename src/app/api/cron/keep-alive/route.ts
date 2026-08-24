import { NextResponse } from "next/server";
import { checkIsSupabaseConfigured, getSupabaseClient } from "@/lib/supabase";

export const revalidate = 0;

/**
 * Lightweight keep-alive endpoint to prevent Supabase database auto-pausing.
 * Can be triggered via Vercel Cron, GitHub Actions, cron-job.org, or external pings.
 */
export async function GET() {
  const isConfigured = checkIsSupabaseConfigured();

  if (!isConfigured) {
    return NextResponse.json({
      success: true,
      mode: "local-memory",
      message: "Supabase not configured. Operating in local memory fallback mode.",
      timestamp: new Date().toISOString(),
    });
  }

  try {
    const supabase = getSupabaseClient();
    // Perform a lightweight count query to touch the Supabase DB
    const { count, error } = await supabase
      .from("invitations")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Supabase keep-alive ping error:", error);
      return NextResponse.json(
        { success: false, error: error.message, timestamp: new Date().toISOString() },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      mode: "supabase",
      message: "Database ping successful. Activity refreshed.",
      count: count ?? 0,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Keep-alive route failure:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Unknown error", timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
