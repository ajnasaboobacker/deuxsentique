import { createClient } from "@supabase/supabase-js";

// Retrieve environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Check if valid Supabase configuration exists
export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !supabaseUrl.includes("your-project-id") &&
  !supabaseAnonKey.includes("your-actual-anon-key");

// Export Supabase Client instance (singleton)
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : "https://placeholder-project.supabase.co",
  isSupabaseConfigured ? supabaseAnonKey : "placeholder-key"
);

export interface Invitation {
  id: string;
  email: string;
  status: "active" | "archived";
  source: "homepage" | "first-embrace" | "admin";
  created_at: string;
}

// In-memory fallback cache for local dev / preview when Supabase env vars are not set
const memoryStorage: Invitation[] = [
  {
    id: "sample-1",
    email: "victoria.montclair@haute-perfumery.com",
    status: "active",
    source: "homepage",
    created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },
  {
    id: "sample-2",
    email: "julien.dupris@parfums-journal.fr",
    status: "active",
    source: "first-embrace",
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "sample-3",
    email: "elena.rostrum@vogue-elegance.co.uk",
    status: "active",
    source: "homepage",
    created_at: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
];

/**
 * Add a new email invitation directly to database or fallback storage
 */
export async function addInvitation(email: string, source: "homepage" | "first-embrace" = "homepage") {
  const cleanEmail = email.trim().toLowerCase();

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("invitations")
        .insert([{ email: cleanEmail, source, status: "active" }])
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          return { success: true, message: "Email already registered.", duplicate: true };
        }
        console.error("Supabase insert error:", error);
        throw error;
      }
      return { success: true, data };
    } catch (err) {
      console.warn("Falling back to local storage due to Supabase error:", err);
    }
  }

  // Memory fallback
  const existing = memoryStorage.find((item) => item.email === cleanEmail);
  if (existing) {
    return { success: true, message: "Email already registered.", duplicate: true };
  }

  const newInvitation: Invitation = {
    id: `inv-${Date.now()}`,
    email: cleanEmail,
    status: "active",
    source,
    created_at: new Date().toISOString(),
  };
  memoryStorage.unshift(newInvitation);
  return { success: true, data: newInvitation };
}

/**
 * Fetch all email invitations
 */
export async function getInvitations(): Promise<Invitation[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("invitations")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data as Invitation[];
      }
      console.error("Supabase fetch error:", error);
    } catch (err) {
      console.warn("Falling back to local storage due to Supabase error:", err);
    }
  }

  return memoryStorage;
}

/**
 * Update invitation status (active vs archived)
 */
export async function updateInvitationStatus(id: string, status: "active" | "archived") {
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase
        .from("invitations")
        .update({ status })
        .eq("id", id);

      if (!error) return { success: true };
      console.error("Supabase update error:", error);
    } catch (err) {
      console.warn("Falling back to local storage update:", err);
    }
  }

  const target = memoryStorage.find((item) => item.id === id);
  if (target) {
    target.status = status;
    return { success: true };
  }
  return { success: false, error: "Invitation not found" };
}

/**
 * Delete invitation by ID
 */
export async function deleteInvitation(id: string) {
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase
        .from("invitations")
        .delete()
        .eq("id", id);

      if (!error) return { success: true };
      console.error("Supabase delete error:", error);
    } catch (err) {
      console.warn("Falling back to local storage delete:", err);
    }
  }

  const index = memoryStorage.findIndex((item) => item.id === id);
  if (index !== -1) {
    memoryStorage.splice(index, 1);
    return { success: true };
  }
  return { success: false, error: "Invitation not found" };
}
