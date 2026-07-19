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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 md:gap-8 max-w-md mx-auto" id="waitlist-form">
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="EMAIL ADDRESS"
                    className="w-full bg-transparent border-0 border-b border-primary/20 text-[#1A1A1A] py-3 text-[11px] tracking-[0.3em] uppercase focus:outline-none focus:border-primary transition-colors text-center"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full font-body text-[10px] uppercase tracking-[0.3em] border border-primary text-primary py-4 hover:bg-primary hover:text-background transition-all duration-700 cursor-pointer"
                >
                  Request Invitation
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
                Thank you for requesting your invitation.
              </p>
              <p className="text-on-background/70 text-[13px] leading-relaxed font-body font-light">
                Your journey with Deuxsentique begins here.<br />
                We&apos;ll share stories, updates and exclusive moments as we move towards our first collection.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
