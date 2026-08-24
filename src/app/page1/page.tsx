"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { PageHeader, Footer } from "../components/shared";
import ScrollReveal from "../components/scroll-reveal";
import SmokeQuote from "../components/smoke-quote";
import { LuxuryAnimatedButton } from "@/components/ui/luxury-animated-button";

export default function Page1() {
  const [email, setEmail] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [philosophyIdx, setPhilosophyIdx] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Slow motion playback
    }

    const handleScroll = () => {
      const scrollPos = Math.max(
        window.scrollY || 0,
        document.body ? document.body.scrollTop || 0 : 0,
        document.documentElement ? document.documentElement.scrollTop || 0 : 0
      );
      setIsScrolled(scrollPos > 150);
    };

    window.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    document.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    if (document.body) {
      document.body.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    }
    handleScroll();

    const philosophyInterval = setInterval(() => {
      setPhilosophyIdx((prev) => (prev + 1) % 5);
    }, 2500);

    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
      document.removeEventListener("scroll", handleScroll, { capture: true });
      if (document.body) {
        document.body.removeEventListener("scroll", handleScroll, { capture: true });
      }
      clearInterval(philosophyInterval);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, marketingConsent, source: "page1" }),
      });
    } catch (err) {
      console.warn("Failed to post email to API, showing success state:", err);
    }
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader
        fadeLogoOnScroll
        isScrolled={isScrolled}
        brandTitleClassName="text-[#000000] hover:text-[#C4913A] font-semibold drop-shadow-[0_0_10px_rgba(196,145,58,0.7)] [text-shadow:_0_0_8px_rgba(254,198,161,0.6)]"
      />

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
              src="/Assets/logo/ICON blk trnsprnt.png"
              alt="Deuxsentique Logo"
              className="h-28 md:h-36 w-auto object-contain hero-logo-float drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* Animated Luxury Serif Hero Title for Page1 */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 tracking-[0.08em] leading-tight text-[#FAF6F0] drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)] flex flex-wrap justify-center items-center gap-x-3 md:gap-x-4 gap-y-2">
            <span
              className="inline-block hero-title-word hover:scale-105 transition-transform duration-500 cursor-default font-normal uppercase"
              style={{ animationDelay: "0.2s" }}
            >
              Two
            </span>
            <span
              className="inline-block hero-title-shimmer text-[#C4913A] italic font-serif font-normal hover:scale-105 transition-transform duration-500 cursor-default"
              style={{ animationDelay: "0.5s" }}
            >
              Souls.
            </span>
            <span
              className="inline-block hero-title-word hover:scale-105 transition-transform duration-500 cursor-default font-normal uppercase"
              style={{ animationDelay: "0.8s" }}
            >
              One
            </span>
            <span
              className="inline-block hero-title-shimmer text-[#C4913A] italic font-serif font-normal hover:scale-105 transition-transform duration-500 cursor-default"
              style={{ animationDelay: "1.1s" }}
            >
              Essence.
            </span>
          </h1>

          <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-[#C4913A] to-transparent my-6 shadow-[0_0_12px_#C4913A]"></div>

          <p className="text-[#E8DDCB] max-w-2xl mx-auto leading-relaxed text-[13px] sm:text-[15px] md:text-[17px] tracking-[0.55em] md:tracking-[0.65em] uppercase font-body font-light drop-shadow-md mt-4">
            A Storytelling Perfume House
          </p>
        </div>

        {/* Floating Scroll Indicator (Only in Hero, fades on scroll) */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-all duration-700 pointer-events-none ${isScrolled ? "opacity-0 translate-y-4" : "opacity-80 translate-y-0 animate-bounce"}`}>
          <span className="text-[#E8DDCB] text-[9px] uppercase tracking-[0.4em] font-body">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#C4913A] to-transparent"></div>
        </div>
      </section>

      <main className="inner-page page-fade-in !pt-0">
        <ScrollReveal />

        {/* Section II: Introduction */}
        <section className="!max-w-[1200px] mx-auto my-28 md:my-44 pt-12 md:pt-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-6 flex flex-col justify-center text-left">
              <h2 className="!mt-0">Every Story Deserves an Essence.</h2>
              <p>
                Behind every fragrance is a real human story.
              </p>
              <p>
                Everything else begins from there.
              </p>
            </div>
            <div className="md:col-span-6 flex justify-end">
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

        <div className="gold-divider opacity-60 my-16 md:my-28"></div>

        {/* Section III: Philosophy */}
        <section className="!max-w-[1200px] mx-auto my-28 md:my-44">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-6 flex justify-start">
              <div className="w-full max-w-[480px] animate-float-fast relative p-4 rounded-3xl bg-gradient-to-b from-[#FFFDF9]/85 to-[#FBF5ED]/60 shadow-[0_12px_45px_rgba(196,145,58,0.15)] border border-[#C4913A]/25 backdrop-blur-sm">
                <img
                  src="/chapters/ch08_painting.png"
                  alt="Our Creative Philosophy"
                  className="w-full h-auto object-contain max-h-[60vh] rounded-2xl filter contrast-[1.05] brightness-[1.02]"
                />
              </div>
            </div>
            <div className="md:col-span-6 flex flex-col justify-center text-left">
              <h2 className="!mt-0">Our Creative Philosophy</h2>
              <div className="h-20 flex items-center my-2">
                <span className="font-display text-4xl md:text-5xl tracking-wide text-[#000000] font-normal drop-shadow-[0_0_12px_rgba(196,145,58,0.4)] transition-all duration-700 ease-in-out">
                  {["Story", "Emotion", "Notes", "Scent", "Memory"][philosophyIdx]}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-body">
                {["Story", "Emotion", "Notes", "Scent", "Memory"].map((word, idx) => (
                  <span
                    key={word}
                    className={`transition-all duration-500 ${
                      idx === philosophyIdx
                        ? "text-[#000000] font-bold border-b border-[#C4913A] pb-0.5"
                        : "text-[#1A1916]/40"
                    }`}
                  >
                    {word} {idx < 4 && <span className="ml-3 text-[#1A1916]/20">→</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="gold-divider opacity-60 my-16 md:my-28"></div>

        {/* Section IV: Asymmetric / Stay Close */}
        <section className="!max-w-[1200px] mx-auto my-28 md:my-44">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-7 flex flex-col justify-center text-left order-2 md:order-1">
              <h2 className="!mt-0">Designed to Stay Close</h2>
              <SmokeQuote>
                <p className="font-display text-xl md:text-2xl lg:text-3xl italic text-[#1A1916] leading-relaxed">
                  &ldquo;The fragrance is discovered, not announced.&rdquo;
                </p>
              </SmokeQuote>
              <p>
                Some fragrances fill a room. Ours are created to become part of yours.
              </p>
              <p>
                Designed to remain close. Created for meaningful moments. Discovered only by those nearest to you.
              </p>
            </div>
            <div className="md:col-span-5 flex justify-center order-1 md:order-2">
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

        <div className="gold-divider opacity-60 my-16 md:my-28"></div>

        {/* Section V: Beliefs */}
        <section className="!max-w-[1200px] mx-auto my-28 md:my-44">
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

        <div className="gold-divider opacity-60 my-16 md:my-28"></div>

        {/* Section VI: Begin Your Journey (Light Warm Luxury Redesign) */}
        <section className="relative w-full min-h-[85vh] py-20 md:py-32 px-4 flex items-center justify-center overflow-hidden my-20 md:my-32">
          {/* Warm Light Atelier Background Image with Seamless Page Blending */}
          <div className="absolute inset-0 z-0">
            <img
              src="/section6_warm_light_bg.png"
              alt="Deuxsentique Atelier"
              className="w-full h-full object-cover filter brightness-[0.95] contrast-[0.98] animate-cinematic-zoom"
            />
            {/* Soft Warm Gradient Blending Seamlessly into Page Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#fec6a1] via-[#FAF6F0]/40 to-[#fec6a1]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,253,249,0.6)_0%,_transparent_75%)]"></div>
          </div>

          {/* Floating Light Frosted Glass Invitation Card */}
          <div className="relative z-10 bg-[#FFFDF9]/85 backdrop-blur-2xl border border-[#C4913A]/40 p-8 md:p-14 w-full max-w-[620px] flex flex-col items-center justify-center rounded-3xl shadow-[0_20px_50px_rgba(196,145,58,0.15)] text-center animate-invitation-float">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C4913A]/60 rounded-tl-3xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C4913A]/60 rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C4913A]/60 rounded-bl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C4913A]/60 rounded-br-3xl"></div>

            <img
              src="/Assets/logo/ICON blk trnsprnt.png"
              alt="Deuxsentique Seal"
              className="h-14 w-auto mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
            />
            <h2 className="font-display text-3xl md:text-4xl mb-3 text-[#2D1F1D] tracking-wide">
              Begin Your Journey
            </h2>
            <p className="text-[#4A3B32]/90 mb-8 text-[13px] md:text-[14px] font-body font-light leading-relaxed max-w-md">
              Request your invitation to enter the world of Deuxsentique. Receive exclusive stories, early access and carefully curated updates as our journey unfolds.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 max-w-md text-left items-center">
                {/* Clean Editorial Email Input Field */}
                <div className="w-full relative px-2">
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL ADDRESS"
                    className="w-full bg-transparent border-b border-[#C4913A]/40 focus:border-[#C4913A] pb-3 pt-2 text-[#2D1F1D] text-[12px] sm:text-[13px] tracking-[0.25em] text-center uppercase placeholder:text-[#4A3B32]/60 placeholder:tracking-[0.20em] transition-all duration-300 focus:outline-none font-display font-medium"
                  />
                </div>

                {/* GDPR Marketing Consent Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer group px-1">
                  <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-[#C4913A]/50 text-[#C4913A] focus:ring-[#C4913A] accent-[#C4913A] bg-transparent cursor-pointer"
                  />
                  <span className="text-[11px] text-[#4A3B32]/85 leading-relaxed font-body font-light group-hover:text-[#2D1F1D] transition-colors select-none">
                    I would like to receive stories, launch updates and exclusive invitations from Deuxsentique. I understand I can unsubscribe at any time.
                  </span>
                </label>

                {/* Animated Luxury Theme Button */}
                <LuxuryAnimatedButton type="submit" label="Request Invitation" />

                {/* Privacy Text */}
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#8C7A6B] font-body font-light text-center mt-1">
                  Strictly Private Access. We Value Your Privacy.
                </p>
              </form>
            ) : (
              <div className="text-center max-w-md py-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#C4913A] mb-4 text-[#C4913A] bg-[#C4913A]/10">
                  ✓
                </div>
                <p className="text-[#C4913A] text-[12px] uppercase tracking-[0.6em] mb-2 font-semibold">
                  Invitation Requested
                </p>
                <p className="text-[#4A3B32]/90 text-[13px] leading-relaxed">
                  Your journey with Deuxsentique begins here.<br />
                  We will share stories, updates and exclusive access as our first collection unfolds.
                </p>
              </div>
            )}
          </div>
        </section>

        <div className="gold-divider opacity-60 my-16 md:my-28"></div>

        {/* Section VII: Socials */}
        <section className="!max-w-[1200px] mx-auto my-28 md:my-44 text-center">
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

      <Footer logoSrc="/Assets/logo/ICON blk trnsprnt.png" />
    </>
  );
}
