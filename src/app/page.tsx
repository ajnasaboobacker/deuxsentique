"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Footer } from "./components/shared";

interface Chapter {
  id: string;
  num: string;
  title: string;
  desc: string;
  imageUrl: string;
  bgImageUrl: string;
  imageAlt: string;
  layout: "hero" | "left-panel" | "right-panel" | "philosophy" | "asymmetric" | "believe" | "invite" | "socials";
}

const chapters: Chapter[] = [
  {
    id: "section-1",
    num: "Section I",
    title: "Two Souls. One Essence.",
    desc: "A Storytelling Perfume House",
    imageUrl: "/chapters/ch02_painting.png",
    bgImageUrl: "/chapters/ch02_painting.png",
    imageAlt: "Deuxsentique Logo",
    layout: "hero",
  },
  {
    id: "section-2",
    num: "Section II",
    title: "Every fragrance begins with a story.",
    desc: "Some stories are remembered.\n\nSome quietly become part of who we are.\n\nAt Deuxsentique, we transform genuine human stories into fragrances that carry emotion, meaning and memory.\n\nEvery creation begins long before the bottle.\n\nEvery story has an essence.",
    imageUrl: "/chapters/ch04_painting.png",
    bgImageUrl: "/chapters/ch04_painting.png",
    imageAlt: "Brand Introduction",
    layout: "right-panel",
  },
  {
    id: "section-3",
    num: "Section III",
    title: "Our Creative Philosophy",
    desc: "",
    imageUrl: "/chapters/ch08_painting.png",
    bgImageUrl: "/chapters/ch08_painting.png",
    imageAlt: "Our Creative Philosophy",
    layout: "philosophy",
  },
  {
    id: "section-4",
    num: "Section IV",
    title: "Designed to Stay Close",
    desc: "Some fragrances fill a room.\n\nOurs are created to become part of yours.\n\nDesigned to remain close.\n\nCreated for meaningful moments.\n\nDiscovered only by those nearest to you.",
    imageUrl: "/chapters/ch05_painting.png",
    bgImageUrl: "/chapters/ch05_painting.png",
    imageAlt: "Designed to Stay Close",
    layout: "asymmetric",
  },
  {
    id: "section-5",
    num: "Section V",
    title: "What We Believe",
    desc: "",
    imageUrl: "/chapters/ch10_painting.png",
    bgImageUrl: "/chapters/ch10_painting.png",
    imageAlt: "What We Believe",
    layout: "believe",
  },
  {
    id: "section-6",
    num: "Section VI",
    title: "Begin Your Journey",
    desc: "Request your invitation to enter the world of Deuxsentique.\n\nReceive exclusive stories, behind-the-scenes moments and carefully curated updates as our journey unfolds.",
    imageUrl: "/chapters/ch06_painting.png",
    bgImageUrl: "/chapters/ch06_painting.png",
    imageAlt: "Begin Your Journey",
    layout: "invite",
  },
  {
    id: "section-7",
    num: "Section VII",
    title: "Continue the Journey",
    desc: "",
    imageUrl: "/chapters/ch09_painting.png",
    bgImageUrl: "/chapters/ch09_painting.png",
    imageAlt: "Continue the Journey",
    layout: "socials",
  },
];;

/** Split title on \n into lines, then each line into words for the reveal animation */
function renderTitle(title: string) {
  const lines = title.split("\n");
  let wordIndex = 0;
  return lines.map((line, lineIdx) => (
    <span key={lineIdx}>
      {lineIdx > 0 && <br />}
      {line.split(" ").map((word) => {
        const idx = wordIndex++;
        return (
          <span
            key={idx}
            className="inline-block mr-3 reveal-word"
            style={{ transitionDelay: `${300 + idx * 80}ms` }}
          >
            {word}
          </span>
        );
      })}
    </span>
  ));
}

export default function Home() {
  const [activeChapter, setActiveChapter] = useState("section-1");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Philosophy and belief text animation indexes
  const [philosophyIdx, setPhilosophyIdx] = useState(0);
  const [beliefIdx, setBeliefIdx] = useState(0);

  // Header scroll transition state
  const [isScrolled, setIsScrolled] = useState(false);

  // Soundscape Web Audio API states
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  // Olfactory Accord active sub-state (Chapter X)
  const [activeAccord, setActiveAccord] = useState<"top" | "heart" | "base">("top");

  // Mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const philosophyInterval = setInterval(() => {
      setPhilosophyIdx((prev) => (prev + 1) % 5);
    }, 2500);

    const beliefInterval = setInterval(() => {
      setBeliefIdx((prev) => (prev + 1) % 6);
    }, 2500);

    return () => {
      clearInterval(philosophyInterval);
      clearInterval(beliefInterval);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setIsScrolled(container.scrollTop > 50);
    };
    container.addEventListener("scroll", handleScroll);

    const sections = container.querySelectorAll(".chapter-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        });
      },
      { root: container, threshold: 0.4 }
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      container.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ponytail: zero-dependency ambient audio via Web Audio API. Upgrade path: load actual .mp3 assets.
  const toggleAmbientAudio = () => {
    if (audioPlaying) {
      audioCtx?.suspend();
      setAudioPlaying(false);
    } else {
      let ctx = audioCtx;
      if (!ctx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        ctx = new AudioContextClass();
        setAudioCtx(ctx);

        // Low Brownian noise hum
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
        }
        const brownianNoise = ctx.createBufferSource();
        brownianNoise.buffer = noiseBuffer;
        brownianNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 80;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.12;

        brownianNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        brownianNoise.start();

        // Sparse Vinyl Crackling pops
        const crackleBufferSize = 0.5 * ctx.sampleRate;
        const crackleBuffer = ctx.createBuffer(1, crackleBufferSize, ctx.sampleRate);
        const crackleOutput = crackleBuffer.getChannelData(0);
        for (let i = 0; i < crackleBufferSize; i++) {
          crackleOutput[i] = 0;
          if (Math.random() < 0.00025) {
            crackleOutput[i] = Math.random() * 0.3 - 0.15;
          }
        }
        const vinylCrackle = ctx.createBufferSource();
        vinylCrackle.buffer = crackleBuffer;
        vinylCrackle.loop = true;

        const crackleFilter = ctx.createBiquadFilter();
        crackleFilter.type = "bandpass";
        crackleFilter.frequency.value = 1200;
        crackleFilter.Q.value = 1.2;

        const crackleGain = ctx.createGain();
        crackleGain.gain.value = 0.025;

        vinylCrackle.connect(crackleFilter);
        crackleFilter.connect(crackleGain);
        crackleGain.connect(ctx.destination);
        vinylCrackle.start();
      }
      ctx.resume();
      setAudioPlaying(true);
    }
  };

  return (
    <>
      {/* Fixed Background Images for Scroll-snapping Cross-dissolves */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {chapters.map((chapter) => (
          <div
            key={`bg-${chapter.id}`}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
              activeChapter === chapter.id ? "opacity-25" : "opacity-0"
            }`}
          >
            <img
              src={chapter.imageUrl}
              alt={chapter.imageAlt}
              className="w-full h-full object-cover filter grayscale contrast-[0.9] brightness-[1.05] mix-blend-multiply"
            />
            <div className="image-overlay"></div>
          </div>
        ))}
      </div>

      {/* Floating Left Vertical Timeline Track */}
      <div className="timeline-track hidden md:flex">
        {chapters.map((chapter, i) => (
          <button
            key={`dot-${chapter.id}`}
            onClick={() => scrollToSection(chapter.id)}
            className={`timeline-dot cursor-pointer focus:outline-none ${
              activeChapter === chapter.id ? "active" : ""
            }`}
            data-chapter={`0${i + 1}`}
          ></button>
        ))}
      </div>

      {/* Fixed Luxury Header */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-24 py-6 md:py-8 z-[100] bg-[#1A1916]/90 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center gap-6">
          <span className="font-display text-lg md:text-2xl tracking-[0.4em] uppercase text-[#fec6a1]">
            Deuxsentique
          </span>
        </div>

        {/* Centered small navbar logo that fades in on scroll */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <img
            src="/icon.png"
            alt="Deuxsentique Logo"
            className={`h-16 md:h-20 w-auto object-contain transition-all duration-700 brightness-110 contrast-110 drop-shadow-[0_0_15px_rgba(196,145,58,0.7)] ${
              isScrolled ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
            }`}
          />
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/about"
            className="hidden md:inline-block font-body text-[10px] uppercase tracking-[0.3em] text-[#fec6a1]/60 hover:text-primary transition-colors"
          >
            Our Story
          </Link>
          <Link
            href="/first-embrace"
            className="hidden md:inline-block font-body text-[10px] uppercase tracking-[0.3em] text-[#fec6a1]/60 hover:text-primary transition-colors"
          >
            First Embrace
          </Link>

          {/* Soundscape toggle */}
          <button
            onClick={toggleAmbientAudio}
            className="hidden md:flex items-center gap-3 cursor-pointer text-[9px] uppercase tracking-[0.3em] text-[#fec6a1]/60 hover:text-primary transition-colors focus:outline-none"
          >
            <span>Sound</span>
            <div className="flex gap-[2px] items-end h-3 w-4">
              <span className={`w-[2px] bg-primary transition-all duration-300 ${audioPlaying ? "animate-[pulse_1s_infinite_0s] h-3" : "h-1"}`}></span>
              <span className={`w-[2px] bg-primary transition-all duration-300 ${audioPlaying ? "animate-[pulse_1s_infinite_0.2s] h-2" : "h-[2px]"}`}></span>
              <span className={`w-[2px] bg-primary transition-all duration-300 ${audioPlaying ? "animate-[pulse_1s_infinite_0.4s] h-3" : "h-[1.5px]"}`}></span>
            </div>
          </button>

          <button
            className="hidden md:inline-block font-body text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] border border-primary/40 text-primary px-4 md:px-8 py-2.5 md:py-3 hover:bg-primary hover:text-[#1A1916] transition-all duration-700 hover:shadow-[0_0_15px_rgba(196,145,58,0.3)] hover:-translate-y-0.5 cursor-pointer"
            onClick={() => scrollToSection("section-6")}
          >
            Request Invitation
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] cursor-pointer p-2 focus:outline-none"
            aria-label="Menu"
          >
            <span className={`block w-5 h-px bg-[#fec6a1] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`}></span>
            <span className={`block w-5 h-px bg-[#fec6a1] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div className={`fixed inset-0 z-[99] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 transition-all duration-500 md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <Link href="/about" onClick={() => setMenuOpen(false)} className="font-display text-2xl tracking-[0.3em] uppercase text-on-background hover:text-primary transition-colors">
          Our Story
        </Link>
        <Link href="/first-embrace" onClick={() => setMenuOpen(false)} className="font-display text-2xl tracking-[0.3em] uppercase text-on-background hover:text-primary transition-colors">
          First Embrace
        </Link>
        <button
          onClick={() => { setMenuOpen(false); scrollToSection("section-6"); }}
          className="font-body text-[10px] uppercase tracking-[0.4em] border border-primary/40 text-primary px-10 py-4 hover:bg-primary hover:text-background transition-all duration-700 mt-4 cursor-pointer"
        >
          Request Invitation
        </button>
      </div>

      {/* Main Snap Scroll Container */}
      <div ref={containerRef} className="scroll-container">
        {chapters.map((chapter) => {
          const isActive = activeChapter === chapter.id;

          return (
            <section
              key={chapter.id}
              id={chapter.id}
              className={`chapter-section ${isActive ? "active" : ""}`}
            >
              <div className="relative z-auto w-full max-w-[1440px] px-6 md:px-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
                
                {chapter.layout === "hero" && (
                  <div className="md:col-span-12 flex justify-center text-center">
                    <div className="glass-editorial-panel w-full max-w-[700px] flex flex-col items-center justify-center reveal-frame">
                      <div className="flex justify-center mb-8 reveal-subtitle">
                        <img
                          src="/icon.png"
                          alt="Deuxsentique Logo"
                          className="h-28 md:h-40 w-auto object-contain hero-logo-float drop-shadow-[0_0_20px_rgba(196,145,58,0.4)]"
                        />
                      </div>
                      <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 md:mb-8 tracking-[0.05em] leading-tight text-on-background">
                        {renderTitle(chapter.title)}
                      </h1>
                      <p className="max-w-xl mx-auto text-on-background/70 leading-relaxed text-[16px] md:text-[18px] tracking-[0.2em] uppercase font-body font-light reveal-desc">
                        {chapter.desc}
                      </p>
                      {/* Subtle Scroll Indicator Below */}
                      <div className="mt-20 animate-bounce">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-on-background/40">Scroll</span>
                      </div>
                    </div>
                  </div>
                )}

                {chapter.layout === "left-panel" && (
                  <>
                    <div className="md:col-span-6 flex justify-start">
                      <div className="glass-editorial-panel w-full max-w-[580px] reveal-frame">
                        <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-6 md:mb-8 font-body reveal-subtitle">
                          {chapter.num}
                        </p>
                        <h2 className="font-display text-2xl md:text-4xl lg:text-5xl mb-6 md:mb-8 leading-tight text-on-background whitespace-pre-line">
                          {renderTitle(chapter.title)}
                        </h2>
                        <p className="text-on-background/70 leading-relaxed text-[14px] md:text-[15px] font-body font-light italic reveal-desc whitespace-pre-line">
                          {chapter.desc}
                        </p>
                      </div>
                    </div>
                    <div className="md:col-span-6 hidden md:flex justify-end reveal-frame mix-blend-multiply">
                      <div className="cinematic-frame w-full max-w-[480px]">
                        <img
                          src={chapter.imageUrl}
                          alt={chapter.imageAlt}
                          className="w-full h-auto object-contain max-h-[65vh] blend-painting"
                        />
                      </div>
                    </div>
                  </>
                )}

                {chapter.layout === "right-panel" && (
                  <>
                    <div className="md:col-span-6 hidden md:flex justify-start reveal-frame mix-blend-multiply">
                      <div className="cinematic-frame w-full max-w-[480px]">
                        <img
                          src={chapter.imageUrl}
                          alt={chapter.imageAlt}
                          className="w-full h-auto object-contain max-h-[65vh] blend-painting"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-6 flex justify-end">
                      <div className="glass-editorial-panel w-full max-w-[580px] reveal-frame">
                        <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-6 md:mb-8 font-body reveal-subtitle">
                          {chapter.num}
                        </p>
                        <h2 className="font-display text-2xl md:text-4xl lg:text-5xl mb-6 md:mb-8 leading-tight text-on-background whitespace-pre-line">
                          {renderTitle(chapter.title)}
                        </h2>
                        <p className="text-on-background/70 leading-relaxed text-[14px] md:text-[15px] font-body font-light italic reveal-desc whitespace-pre-line">
                          {chapter.desc}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {chapter.layout === "philosophy" && (
                  <>
                    <div className="md:col-span-6 flex justify-start">
                      <div className="glass-editorial-panel w-full max-w-[580px] reveal-frame">
                        <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-6 md:mb-8 font-body reveal-subtitle">
                          {chapter.num}
                        </p>
                        <h2 className="font-display text-2xl md:text-4xl lg:text-5xl mb-12 leading-tight text-on-background">
                          {renderTitle(chapter.title)}
                        </h2>
                        <div className="h-24 flex items-center reveal-desc">
                          <span className="font-display text-4xl md:text-6xl tracking-wide text-primary transition-all duration-700 ease-in-out">
                            {["Story", "Emotion", "Notes", "Scent", "Memory"][philosophyIdx]}
                          </span>
                        </div>
                        {/* Flow tracker below */}
                        <div className="flex items-center gap-4 mt-6 text-[10px] uppercase tracking-[0.3em] text-on-background/30 font-body reveal-desc">
                          {["Story", "Emotion", "Notes", "Scent", "Memory"].map((word, idx) => (
                            <span key={word} className={`transition-colors duration-500 ${idx === philosophyIdx ? "text-primary font-medium" : ""}`}>
                              {word} {idx < 4 && <span className="ml-4 text-on-background/15">→</span>}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-6 hidden md:flex justify-end reveal-frame mix-blend-multiply">
                      <div className="cinematic-frame w-full max-w-[480px]">
                        <img
                          src={chapter.imageUrl}
                          alt={chapter.imageAlt}
                          className="w-full h-auto object-contain max-h-[65vh] blend-painting"
                        />
                      </div>
                    </div>
                  </>
                )}

                {chapter.layout === "asymmetric" && (
                  <>
                    <div className="md:col-span-7 flex justify-start">
                      <div className="glass-editorial-panel w-full max-w-[620px] reveal-frame">
                        <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-6 md:mb-8 font-body reveal-subtitle">
                          {chapter.num}
                        </p>
                        {/* Large Editorial Quote */}
                        <div className="border-l border-primary/20 pl-6 md:pl-8 mb-8">
                          <p className="font-display text-2xl md:text-3xl lg:text-4xl italic leading-relaxed text-on-background">
                            &ldquo;The fragrance is discovered, not announced.&rdquo;
                          </p>
                        </div>
                        <p className="text-on-background/70 leading-relaxed text-[14px] md:text-[15px] font-body font-light italic reveal-desc whitespace-pre-line">
                          {chapter.desc}
                        </p>
                      </div>
                    </div>
                    <div className="md:col-span-5 hidden md:flex justify-center reveal-frame mix-blend-multiply">
                      <div className="cinematic-frame w-full max-w-[380px] -translate-y-8">
                        <img
                          src={chapter.imageUrl}
                          alt={chapter.imageAlt}
                          className="w-full h-auto object-contain max-h-[60vh] blend-painting"
                        />
                      </div>
                    </div>
                  </>
                )}

                {chapter.layout === "believe" && (
                  <>
                    <div className="md:col-span-6 hidden md:flex justify-start reveal-frame mix-blend-multiply">
                      <div className="cinematic-frame w-full max-w-[480px]">
                        <img
                          src={chapter.imageUrl}
                          alt={chapter.imageAlt}
                          className="w-full h-auto object-contain max-h-[65vh] blend-painting"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-6 flex justify-end">
                      <div className="glass-editorial-panel w-full max-w-[580px] reveal-frame">
                        <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-6 md:mb-8 font-body reveal-subtitle">
                          {chapter.num}
                        </p>
                        <h2 className="font-display text-2xl md:text-4xl lg:text-5xl mb-12 leading-tight text-on-background">
                          {renderTitle(chapter.title)}
                        </h2>
                        <div className="h-24 flex items-center reveal-desc">
                          <span className="font-display text-4xl md:text-6xl tracking-wide text-primary transition-all duration-700 ease-in-out">
                            {["Story", "Craftsmanship", "Emotion", "Authenticity", "Connection", "Timelessness"][beliefIdx]}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-6 text-[10px] uppercase tracking-[0.3em] text-on-background/30 font-body reveal-desc">
                          {["Story", "Craftsmanship", "Emotion", "Authenticity", "Connection", "Timelessness"].map((word, idx) => (
                            <span key={word} className={`transition-colors duration-500 ${idx === beliefIdx ? "text-primary font-medium" : ""}`}>
                              {word} {idx < 5 && <span className="ml-4 text-on-background/15">•</span>}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {chapter.layout === "invite" && (
                  <div className="md:col-span-12 flex justify-center text-center">
                    <div className="glass-editorial-panel w-full max-w-[580px] flex flex-col items-center reveal-frame">
                      <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-6 md:mb-8 font-body reveal-subtitle">
                        {chapter.num}
                      </p>
                      <h2 className="font-display text-2xl md:text-4xl lg:text-5xl mb-6 md:mb-8 leading-tight text-on-background whitespace-pre-line">
                        {renderTitle(chapter.title)}
                      </h2>
                      <p className="text-on-background/70 mb-10 md:mb-12 text-[14px] md:text-[15px] font-body font-light italic reveal-desc max-w-lg">
                        {chapter.desc}
                      </p>

                      {!submitted ? (
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 md:gap-8 reveal-desc max-w-md" id="waitlist-form" suppressHydrationWarning>
                          <div className="relative" suppressHydrationWarning>
                            <input
                              type="email"
                              id="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="EMAIL ADDRESS"
                              className="w-full bg-transparent border-0 border-b border-primary/20 text-[#1A1A1A] py-3 text-[11px] tracking-[0.3em] uppercase focus:outline-none focus:border-primary transition-colors text-center"
                              suppressHydrationWarning
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
                        <div className="text-center reveal-desc max-w-md transition-all duration-1000 animate-fadeIn" id="success-state">
                          <p className="text-primary text-[12px] uppercase tracking-[0.6em] mb-4">
                            Thank you for requesting your invitation.
                          </p>
                          <p className="text-on-background/70 text-[13px] leading-relaxed font-body font-light">
                            Your journey with Deuxsentique begins here.<br />
                            We&apos;ll share stories, updates and exclusive moments as we move towards our first collection.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {chapter.layout === "socials" && (
                  <div className="md:col-span-12 flex justify-center text-center">
                    <div className="glass-editorial-panel w-full max-w-[580px] flex flex-col items-center reveal-frame">
                      <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-6 md:mb-8 font-body reveal-subtitle">
                        {chapter.num}
                      </p>
                      <h2 className="font-display text-2xl md:text-4xl lg:text-5xl mb-12 leading-tight text-on-background">
                        {renderTitle(chapter.title)}
                      </h2>
                      <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-4 reveal-desc">
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
                    </div>
                  </div>
                )}

              </div>
            </section>
          );
        })}

        {/* Footer */}
        <Footer />
      </div>

      {/* Floating Scroll Indicator (hidden at section 7) */}
      <div
        className={`scroll-indicator transition-opacity duration-700 ${
          activeChapter === "section-7" ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span className="font-body text-[9px] uppercase tracking-[0.4em]">Scroll</span>
        <div className="scroll-indicator-line"></div>
      </div>
    </>
  );
}
