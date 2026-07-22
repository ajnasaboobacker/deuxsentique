"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Invitation } from "@/lib/supabase";

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [stats, setStats] = useState({ total: 0, active: 0, archived: 0 });
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "active" | "archived">("all");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Check existing session auth
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("dsq_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchInvitations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/invitations");
      const json = await res.json();
      if (json.success) {
        setInvitations(json.data || []);
        setStats(json.stats || { total: 0, active: 0, archived: 0 });
        setIsSupabaseConfigured(json.isSupabaseConfigured || false);
      }
    } catch (err) {
      console.error("Failed to load invitations:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchInvitations();
    }
  }, [isAuthenticated, fetchInvitations]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "deuxsentique2026" || passcode.trim() === process.env.NEXT_PUBLIC_ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem("dsq_admin_auth", "true");
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleStatusChange = async (id: string, newStatus: "active" | "archived") => {
    setActionLoadingId(id);
    try {
      const res = await fetch("/api/invitations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        await fetchInvitations();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this email entry?")) return;
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/invitations?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        await fetchInvitations();
      }
    } catch (err) {
      console.error("Failed to delete entry:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleExportCSV = () => {
    if (invitations.length === 0) return;
    const headers = ["ID", "Email Address", "Status", "Source", "Date Registered"];
    const rows = invitations.map((item) => [
      item.id,
      item.email,
      item.status,
      item.source,
      new Date(item.created_at).toLocaleString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((x) => `"${x}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `deuxsentique_waitlist_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered invitations list
  const filteredList = invitations.filter((item) => {
    const matchesSearch = item.email.toLowerCase().includes(searchQuery.toLowerCase().trim());
    const matchesFilter = selectedFilter === "all" || item.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Passcode Security Modal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#11100E] text-[#E8DDCB] flex items-center justify-center px-6 relative overflow-hidden font-body">
        <div className="absolute inset-0 bg-radial from-primary/10 via-transparent to-transparent opacity-40 blur-3xl pointer-events-none"></div>

        <div className="bg-[#1A1916]/90 border border-primary/30 p-10 md:p-14 rounded-2xl max-w-md w-full text-center shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl relative z-10">
          <div className="flex justify-center mb-6">
            <img
              src="/icon.png"
              alt="Deuxsentique Monogram"
              className="h-16 w-auto object-contain drop-shadow-[0_0_20px_rgba(196,145,58,0.5)]"
            />
          </div>

          <p className="text-[#C4913A] text-[10px] uppercase tracking-[0.5em] mb-2 font-body font-medium">
            Restricted Portal
          </p>
          <h1 className="font-display text-2xl md:text-3xl text-[#FAF6F0] mb-6">
            House Command Centre
          </h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="ENTER PASSCODE"
              className="w-full bg-[#11100E] border border-primary/30 text-[#FAF6F0] py-3.5 px-4 rounded-lg text-center tracking-[0.3em] text-[12px] focus:outline-none focus:border-primary transition-all placeholder-white/30"
              autoFocus
            />

            {authError && (
              <p className="text-red-400 text-[11px] tracking-wider font-light">
                Incorrect passcode. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#C4913A] text-[#11100E] font-medium text-[10px] uppercase tracking-[0.3em] py-3.5 rounded-lg hover:bg-[#D4A34B] transition-all cursor-pointer shadow-[0_4px_15px_rgba(196,145,58,0.3)]"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-8">
            <Link
              href="/"
              className="text-[10px] uppercase tracking-[0.3em] text-[#C4913A]/60 hover:text-[#C4913A] transition-colors"
            >
              ← Back to Main Sanctuary
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#11100E] text-[#E8DDCB] font-body pb-16">
      {/* Top Navigation Bar */}
      <header className="border-b border-primary/20 bg-[#1A1916]/80 backdrop-blur-md sticky top-0 z-50 px-6 md:px-16 py-5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/icon.png" alt="Logo" className="h-9 w-auto" />
            <span className="font-display text-lg tracking-[0.3em] text-[#FAF6F0] uppercase">
              Deuxsentique
            </span>
          </Link>
          <span className="hidden md:inline-block text-[9px] uppercase tracking-[0.3em] px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            Admin Console
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Supabase connection indicator */}
          <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-md border border-white/10 bg-white/5">
            <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? "bg-emerald-400" : "bg-amber-400"}`}></span>
            <span className="text-white/70">
              {isSupabaseConfigured ? "DATABASE STATUS ACTIVE" : "Local Storage Mode"}
            </span>
          </div>

          <button
            onClick={() => {
              sessionStorage.removeItem("dsq_admin_auth");
              setIsAuthenticated(false);
            }}
            className="text-[10px] uppercase tracking-[0.25em] text-white/50 hover:text-red-400 border border-white/10 px-4 py-2 rounded-md transition-colors cursor-pointer"
          >
            Lock Portal
          </button>
        </div>
      </header>

      {/* Main Admin Dashboard Container */}
      <main className="max-w-[1280px] mx-auto px-6 md:px-12 pt-10">
        {/* Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-white/10 pb-8">
          <div>
            <p className="text-primary text-[10px] uppercase tracking-[0.5em] mb-2">
              Audience & Waitlist Management
            </p>
            <h1 className="font-display text-3xl md:text-4xl text-[#FAF6F0]">
              Submitted Email List
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchInvitations}
              className="text-[10px] uppercase tracking-[0.25em] bg-white/5 border border-white/15 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>↻</span> Refresh
            </button>
            <button
              onClick={handleExportCSV}
              disabled={invitations.length === 0}
              className="text-[10px] uppercase tracking-[0.25em] bg-primary text-[#11100E] font-medium px-5 py-3 rounded-lg hover:bg-[#D4A34B] transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_15px_rgba(196,145,58,0.2)]"
            >
              <span>↓</span> Export CSV
            </button>
          </div>
        </div>

        {/* Database Config Banner if not configured */}
        {!isSupabaseConfigured && (
          <div className="mb-8 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="text-amber-200 font-medium text-xs uppercase tracking-wider">
                  Supabase Credentials Pending
                </p>
                <p className="text-white/60 text-xs mt-0.5">
                  Currently running in local memory fallback mode. Update your <code className="text-primary">.env.local</code> credentials to persist signups directly to Supabase.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stat Cards Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          <div className="bg-[#1A1916] border border-white/10 p-6 rounded-xl">
            <p className="text-white/50 text-[10px] uppercase tracking-[0.3em] mb-2">Total Signups</p>
            <p className="font-display text-3xl md:text-4xl text-[#FAF6F0]">{stats.total}</p>
          </div>
          <div className="bg-[#1A1916] border border-emerald-500/20 p-6 rounded-xl">
            <p className="text-emerald-400/80 text-[10px] uppercase tracking-[0.3em] mb-2">Active Waitlist</p>
            <p className="font-display text-3xl md:text-4xl text-emerald-300">{stats.active}</p>
          </div>
          <div className="bg-[#1A1916] border border-white/10 p-6 rounded-xl">
            <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] mb-2">Archived</p>
            <p className="font-display text-3xl md:text-4xl text-white/50">{stats.archived}</p>
          </div>
        </div>

        {/* Controls Bar: Search & Status Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by email..."
              className="w-full bg-[#1A1916] border border-white/15 text-white/90 py-3 px-4 pl-10 rounded-lg text-xs focus:outline-none focus:border-primary transition-colors placeholder-white/30"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-xs">🔍</span>
          </div>

          {/* Filter Status Tabs */}
          <div className="flex items-center gap-2 bg-[#1A1916] p-1.5 rounded-lg border border-white/10 self-start md:self-auto">
            {(["all", "active", "archived"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-md text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer ${
                  selectedFilter === filter
                    ? "bg-primary text-[#11100E] font-medium"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-[#1A1916] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="p-16 text-center text-white/40 text-xs uppercase tracking-[0.3em]">
              Loading Email List...
            </div>
          ) : filteredList.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-white/60 text-sm font-light mb-2">No email entries found.</p>
              <p className="text-white/30 text-xs font-light">
                {searchQuery
                  ? `No entries matched "${searchQuery}"`
                  : "New signups submitted on the website will automatically appear here."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white/40 uppercase tracking-[0.2em] text-[9px]">
                    <th className="py-4 px-6">Email Address</th>
                    <th className="py-4 px-6">Origin</th>
                    <th className="py-4 px-6">Submitted Date</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredList.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-medium text-white/90">
                        {item.email}
                      </td>
                      <td className="py-4 px-6">
                        <span className="uppercase text-[9px] tracking-wider text-white/50 px-2.5 py-1 rounded bg-white/5 border border-white/10">
                          {item.source}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-white/50">
                        {new Date(item.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-4 px-6">
                        {item.status === "active" && (
                          <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full font-medium">
                            <span>✓</span> Registered
                          </span>
                        )}
                        {item.status === "archived" && (
                          <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full font-medium">
                            <span>-</span> Archived
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {item.status === "active" ? (
                            <button
                              onClick={() => handleStatusChange(item.id, "archived")}
                              disabled={actionLoadingId === item.id}
                              className="text-[9px] uppercase tracking-wider px-3 py-1.5 rounded border border-white/15 text-white/60 hover:bg-white/10 transition-colors cursor-pointer"
                            >
                              Archive
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusChange(item.id, "active")}
                              disabled={actionLoadingId === item.id}
                              className="text-[9px] uppercase tracking-wider px-3 py-1.5 rounded border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors cursor-pointer"
                            >
                              Restore
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={actionLoadingId === item.id}
                            className="text-[9px] uppercase tracking-wider px-3 py-1.5 rounded border border-red-500/20 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
