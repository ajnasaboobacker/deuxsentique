"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { PageHeader, Footer } from "../components/shared";
import ScrollReveal from "../components/scroll-reveal";

export default function Page1() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [philosophyIdx, setPhilosophyIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Slow motion playback
    }

    const philosophyInterval = setInterval(() => {
      setPhilosophyIdx((prev) => (prev + 1) % 5);
    }, 2500);

    return () => clearInterval(philosophyInterval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage" }),
      });
    } catch (err) {
      console.warn("Failed to post email to API, showing success state:", err);
    }
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader />

      {/* Full-Screen Hero Section with Background Video */}
      <section className="relative w-full h-screen min-h-[650px] flex items-center justify-center text-center overflow-hidden -mt-[80px] z-10">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
          <video
            ref={videoRef}
            src="/Assets/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter brightness-[0.65] contrast-[1.1]"
          />
          {/* Dark luxury gradient overlay for high contrast text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#fec6a1]"></div>
        </div>

        {/* Foreground Hero Content Over Video */}
        <div className="relative z-10 w-full max-w-[1000px] px-6 flex flex-col items-center justify-center pt-16">
          <div className="flex justify-center mb-6">
            <img
              src="/icon.png"
              alt="Deuxsentique Logo"
              className="h-28 md:h-36 w-auto object-contain hero-logo-float drop-shadow-[0_0_25px_rgba(196,145,58,0.6)]"
            />
          </div>

          <p className="text-[#C4913A] text-[11px] uppercase tracking-[0.6em] mb-4 font-body font-medium drop-shadow-md">
            Section I
          </p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 tracking-[0.06em] leading-tight text-[#FAF6F0] font-normal drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            Two Souls. One Essence.
          </h1>

          <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-[#C4913A] to-transparent my-6 shadow-[0_0_12px_#C4913A]"></div>

          <p className="text-[#E8DDCB] max-w-xl mx-auto leading-relaxed text-[15px] md:text-[18px] tracking-[0.25em] uppercase font-body font-light drop-shadow-md">
            A Storytelling Perfume House
          </p>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-80 animate-bounce">
          <span className="text-[#E8DDCB] text-[9px] uppercase tracking-[0.4em] font-body">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#C4913A] to-transparent"></div>
        </div>
      </section>

      <main className="inner-page page-fade-in !pt-0">
        <ScrollReveal />

        {/* Section II: Introduction */}
        <section className="!max-w-[1200px] mx-auto my-16 md:my-24 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-6 flex flex-col justify-center text-left">
              <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-2 font-body">
                Section II
              </p>
              <h2 className="!mt-0">Every fragrance begins with a story.</h2>
              <p>
                Some stories are remembered. Some quietly become part of who we are.
              </p>
              <p>
                At Deuxsentique, we transform genuine human stories into fragrances that carry emotion, meaning and memory.
              </p>
              <p>
                Every creation begins long before the bottle. Every story has an essence.
              </p>
            </div>
            <div className="md:col-span-6 flex justify-end mix-blend-multiply scroll-reveal-container">
              <div className="cinematic-frame w-full max-w-[480px] animate-float-slow">
                <img
                  src="/chapters/ch04_painting.png"
                  alt="Brand Introduction"
                  className="w-full h-auto object-contain max-h-[60vh] blend-painting"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section III: Philosophy */}
        <section className="!max-w-[1200px] mx-auto my-16 md:my-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-6 flex justify-start mix-blend-multiply scroll-reveal-container">
              <div className="cinematic-frame w-full max-w-[480px] animate-float-fast">
                <img
                  src="/chapters/ch08_painting.png"
                  alt="Our Creative Philosophy"
                  className="w-full h-auto object-contain max-h-[60vh] blend-painting"
                />
              </div>
            </div>
            <div className="md:col-span-6 flex flex-col justify-center text-left">
              <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-2 font-body">
                Section III
              </p>
              <h2 className="!mt-0">Our Creative Philosophy</h2>
              <div className="h-20 flex items-center my-2">
                <span className="font-display text-4xl md:text-5xl tracking-wide text-primary transition-all duration-700 ease-in-out">
                  {["Story", "Emotion", "Notes", "Scent", "Memory"][philosophyIdx]}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-on-background/40 font-body">
                {["Story", "Emotion", "Notes", "Scent", "Memory"].map((word, idx) => (
                  <span key={word} className={`transition-colors duration-500 ${idx === philosophyIdx ? "text-primary font-semibold" : ""}`}>
                    {word} {idx < 4 && <span className="ml-3 text-on-background/20">→</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section IV: Asymmetric / Stay Close */}
        <section className="!max-w-[1200px] mx-auto my-16 md:my-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-7 flex flex-col justify-center text-left order-2 md:order-1">
              <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-2 font-body">
                Section IV
              </p>
              <h2 className="!mt-0">Designed to Stay Close</h2>
              <div className="border-l border-primary/30 pl-6 my-6">
                <p className="font-display text-xl md:text-2xl lg:text-3xl italic text-on-background">
                  &ldquo;The fragrance is discovered, not announced.&rdquo;
                </p>
              </div>
              <p>
                Some fragrances fill a room. Ours are created to become part of yours.
              </p>
              <p>
                Designed to remain close. Created for meaningful moments. Discovered only by those nearest to you.
              </p>
            </div>
            <div className="md:col-span-5 flex justify-center mix-blend-multiply order-1 md:order-2 scroll-reveal-container">
              <div className="cinematic-frame w-full max-w-[380px] animate-float-slow">
                <img
                  src="/chapters/ch05_painting.png"
                  alt="Designed to Stay Close"
                  className="w-full h-auto object-contain max-h-[60vh] blend-painting"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section V: Beliefs */}
        <section className="!max-w-[1200px] mx-auto my-16 md:my-24">
          <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-2 font-body text-center">
            Section V
          </p>
          <h2 style={{ textAlign: "center", marginBottom: "3rem" }}>What We Believe</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Story First</h3>
              <p>Every fragrance begins with a lived narrative, transformed into scent and memory.</p>
            </div>
            <div className="value-card">
              <h3>Craftsmanship</h3>
              <p>Refined formulation with attention to every accord, drydown, and skin chemistry.</p>
            </div>
            <div className="value-card">
              <h3>Emotion</h3>
              <p>Perfumes designed to touch the soul and evoke genuine personal connection.</p>
            </div>
            <div className="value-card">
              <h3>Authenticity</h3>
              <p>No trends or compromises — only genuine creations that carry truth.</p>
            </div>
            <div className="value-card">
              <h3>Connection</h3>
              <p>Creations that invite closeness and shared moments between people.</p>
            </div>
            <div className="value-card">
              <h3>Timelessness</h3>
              <p>Built to endure beyond seasonal fashion, leaving an unforgettable trace.</p>
            </div>
          </div>
        </section>

        {/* Section VI: Begin Your Journey */}
        <section className="!max-w-[1200px] mx-auto my-16 md:my-24 flex justify-center">
          <div className="relative bg-surface/50 backdrop-blur-xl border border-primary/30 p-10 md:p-16 w-full max-w-[640px] flex flex-col items-center justify-center rounded-2xl invite-card-animated overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-2xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/50 rounded-tr-2xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/50 rounded-bl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-2xl"></div>

            <img
              src="/icon.png"
              alt="Deuxsentique Seal"
              className="h-14 w-auto mb-4 drop-shadow-[0_0_15px_rgba(196,145,58,0.5)]"
            />
            <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-2 font-body font-medium">
              Section VI
            </p>
            <h2 className="font-display text-2xl md:text-4xl mb-4 text-on-background">
              Begin Your Journey
            </h2>
            <p className="text-on-background/80 mb-8 text-[14px] md:text-[15px] font-body font-light italic max-w-md">
              Request your invitation to enter the world of Deuxsentique. Receive exclusive stories, behind-the-scenes moments and carefully curated updates.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 max-w-sm">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  className="w-full bg-[#1A1A1A]/5 border border-primary/30 text-[#1A1A1A] py-4 px-6 rounded-lg text-[11px] tracking-[0.25em] focus:outline-none input-luxury-focus text-center placeholder-[#1A1A1A]/50 font-body font-light"
                />
                <button
                  type="submit"
                  className="w-full font-body text-[10px] uppercase tracking-[0.3em] bg-primary text-background font-medium py-4 rounded-lg hover:bg-[#B38029] transition-all duration-500 cursor-pointer shadow-[0_8px_25px_rgba(196,145,58,0.3)] animate-button-shine"
                >
                  Request Invitation
                </button>
                <p className="text-[9px] uppercase tracking-[0.25em] text-on-background/50 font-body font-light">
                  Strictly private access. We value your privacy.
                </p>
              </form>
            ) : (
              <div className="text-center max-w-md">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary mb-4 text-primary bg-primary/10">
                  ✓
                </div>
                <p className="text-primary text-[12px] uppercase tracking-[0.6em] mb-2 font-semibold">
                  Invitation Requested
                </p>
                <p className="text-on-background/80 text-[13px] leading-relaxed">
                  Your journey with Deuxsentique begins here.<br />
                  We will share stories, updates and exclusive access as our first collection unfolds.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Section VII: Socials */}
        <section className="!max-w-[1200px] mx-auto my-16 md:my-24 text-center">
          <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-2 font-body">
            Section VII
          </p>
          <h2 className="font-display text-2xl md:text-4xl mb-8">
            Continue the Journey
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {["Instagram", "TikTok", "Facebook", "LinkedIn", "YouTube"].map((platform) => (
              <Link
                key={platform}
                href="#"
                className="font-body text-[10px] uppercase tracking-[0.3em] text-on-background/50 hover:text-primary transition-colors duration-500"
              >
                {platform}
              </Link>
            ))}
          </div>
        </section>

        <div style={{ height: "4rem" }}></div>
      </main>

      <Footer />
    </>
  );
}
