"use client";

import { useState, useEffect } from "react";
import { PageHeader, Footer } from "../components/shared";

export default function FirstEmbracePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "first-embrace" }),
      });
    } catch (err) {
      console.warn("Failed to post email to API:", err);
    }
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader />

      <main className="inner-page page-fade-in flex flex-col justify-center items-center min-h-[90vh]">
        <section className="text-center max-w-[640px] flex flex-col items-center justify-center">
          <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-6 font-body">
            The Founding Edition
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-on-background">
            First Embrace
          </h1>
          <div className="gold-divider"></div>
          
          <p className="lead mb-8">
            Our inaugural fragrance is currently maturing, distilled in quiet contemplation.
          </p>
          
          <p className="text-on-background/70 mb-12 max-w-md font-body font-light italic text-[14px] md:text-[15px] leading-relaxed">
            A composition designed to stay close, capturing the warmth and intimacy of a first encounter. The first chapter of our story is being prepared.
          </p>

          {!submitted ? (
            mounted ? (
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 md:gap-8 max-w-md mx-auto items-center" id="waitlist-form">
                {/* Clean Editorial Email Input Field */}
                <div className="w-full relative px-2">
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL ADDRESS"
                    className="w-full bg-transparent border-b border-primary/40 focus:border-primary pb-3 pt-2 text-on-background text-[12px] sm:text-[13px] tracking-[0.25em] text-center uppercase placeholder:text-on-background/50 placeholder:tracking-[0.20em] transition-all duration-300 focus:outline-none font-display font-medium"
                  />
                </div>

                {/* Authentic Parchment Scroll Request Invitation Submit Button */}
                <button
                  type="submit"
                  className="relative group cursor-pointer border-none bg-transparent p-0 transition-all duration-500 hover:scale-[1.03] active:scale-[0.97] focus:outline-none flex items-center justify-center my-1 select-none"
                  aria-label="Request Invitation"
                >
                  <img
                    src="/Assets/scroll_request_invitation.png"
                    alt="Request Invitation"
                    className="w-full max-w-[300px] sm:max-w-[340px] md:max-w-[360px] h-auto object-contain drop-shadow-[0_8px_20px_rgba(40,20,5,0.20)] group-hover:drop-shadow-[0_12px_28px_rgba(196,145,58,0.30)] transition-all duration-500"
                  />
                </button>
              </form>
            ) : (
              <div className="h-32 flex items-center justify-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-on-background/25">Loading Form...</span>
              </div>
            )
          ) : (
            <div className="text-center max-w-md mx-auto transition-all duration-1000 animate-fadeIn" id="success-state">
              <p className="text-primary text-[12px] uppercase tracking-[0.6em] mb-4">
                You&rsquo;re now part of the Deuxsentique circle.
              </p>
              <p className="text-on-background/70 text-[13px] leading-relaxed font-body font-light">
                From here, we&rsquo;ll keep you close to new releases, private moments and what comes next.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
