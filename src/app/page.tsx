"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Lenis from "lenis";
import { PageHeader, Footer } from "./components/shared";
import { LuxuryAnimatedButton } from "@/components/ui/luxury-animated-button";

interface Chapter {
  id: string;
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
    title: "Two Souls. One Essence.",
    desc: "A Storytelling Perfume House",
    imageUrl: "/chapters/ch02_painting.png",
    bgImageUrl: "/chapters/ch02_painting.png",
    imageAlt: "Deuxsentique Logo",
    layout: "hero",
  },
  {
    id: "section-2",
    title: "Every Story Deserves an Essence.",
    desc: "Behind every fragrance is a real human story.\n\nEverything else begins from there.",
    imageUrl: "/Assets/Section2.jpeg",
    bgImageUrl: "/chapters/ch02_painting.png",
    imageAlt: "Brand Introduction",
    layout: "right-panel",
  },
  {
    id: "section-3",
    title: "Our Creative Philosophy",
    desc: "",
    imageUrl: "/Assets/Section3.jpeg",
    bgImageUrl: "/chapters/ch08_painting.png",
    imageAlt: "Our Creative Philosophy",
    layout: "philosophy",
  },
  {
    id: "section-4",
    title: "",
    desc: "Some fragrances fill a room.\nOurs are created to become part of yours.\nDesigned to remain close.\nCreated for meaningful moments.\nDiscovered only by those nearest to you.",
    imageUrl: "/Assets/Section4.jpeg",
    bgImageUrl: "/chapters/ch05_painting.png",
    imageAlt: "Section IV",
    layout: "asymmetric",
  },
  {
    id: "section-5",
    title: "What We Believe",
    desc: "",
    imageUrl: "/Assets/Section5.jpeg",
    bgImageUrl: "/chapters/ch10_painting.png",
    imageAlt: "What We Believe",
    layout: "believe",
  },
  {
    id: "section-6",
    title: "Begin Your Journey",
    desc: "Request your invitation to enter the world of Deuxsentique.\n\nDiscover intimate brand stories, early access and thoughtfully selected news from the house.",
    imageUrl: "/chapters/ch100_seamless.png",
    bgImageUrl: "/chapters/ch100_seamless.png",
    imageAlt: "Begin Your Journey",
    layout: "invite",
  },
  {
    id: "section-7",
    title: "Continue the Journey",
    desc: "",
    imageUrl: "/chapters/ch09_painting.png",
    bgImageUrl: "/chapters/ch09_painting.png",
    imageAlt: "Continue the Journey",
    layout: "socials",
  },
];

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

function getImageClassName(imageUrl: string) {
  if (imageUrl.includes("Section") || imageUrl.endsWith(".jpeg") || imageUrl.endsWith(".jpg")) {
    return "w-full aspect-[4/3] md:aspect-[5/4] object-cover rounded-2xl border border-primary/25 shadow-[0_25px_60px_rgba(140,88,50,0.18)] hover:shadow-[0_30px_70px_rgba(196,145,58,0.25)] max-h-[60vh] transition-all duration-700 hover:scale-[1.025]";
  }
  return "w-full h-auto object-contain max-h-[65vh] blend-painting";
}

function ScrollRollerHandle({ side }: { side: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 28 90"
      className={`absolute ${
        side === "left" ? "left-[-14px]" : "right-[-14px] scale-x-[-1]"
      } top-1/2 -translate-y-1/2 h-[86px] w-[26px] z-20 pointer-events-none drop-shadow-[2px_2px_5px_rgba(0,0,0,0.35)]`}
    >
      <defs>
        <linearGradient id={`woodKnob_${side}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4A2E12" />
          <stop offset="40%" stopColor="#8C5C29" />
          <stop offset="70%" stopColor="#A47239" />
          <stop offset="100%" stopColor="#36200A" />
        </linearGradient>
        <linearGradient id={`brassCollar_${side}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5C3F14" />
          <stop offset="50%" stopColor="#D4A34B" />
          <stop offset="100%" stopColor="#4A3010" />
        </linearGradient>
        <linearGradient id={`paperRoll_${side}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7A562D" />
          <stop offset="25%" stopColor="#E0CDAF" />
          <stop offset="60%" stopColor="#F5E8D3" />
          <stop offset="85%" stopColor="#C9B18C" />
          <stop offset="100%" stopColor="#63431E" />
        </linearGradient>
      </defs>

      {/* Top Wooden Knob */}
      <path d="M 9 2 C 14 0 19 0 24 2 C 26 4 26 7 24 9 C 19 11 14 11 9 9 C 7 7 7 4 9 2 Z" fill={`url(#woodKnob_${side})`} stroke="#2E1B09" strokeWidth="0.8" />
      <path d="M 7 9 C 13 8 20 8 26 9 L 24 14 C 18 15 11 15 7 14 Z" fill={`url(#brassCollar_${side})`} stroke="#2E1B09" strokeWidth="0.6" />
      <path d="M 10 14 C 14 14 19 14 22 14 L 21 17 C 17 17 13 17 10 17 Z" fill="#2E1D0A" />

      {/* Vertical Paper Scroll Roll */}
      <rect x="5" y="17" width="20" height="56" rx="2" fill={`url(#paperRoll_${side})`} stroke="#4A3010" strokeWidth="1" />
      <line x1="6" y1="24" x2="24" y2="24" stroke="#4A3010" strokeWidth="0.5" opacity="0.3" />
      <line x1="6" y1="36" x2="24" y2="36" stroke="#4A3010" strokeWidth="0.5" opacity="0.3" />
      <line x1="6" y1="48" x2="24" y2="48" stroke="#4A3010" strokeWidth="0.5" opacity="0.3" />
      <line x1="6" y1="60" x2="24" y2="60" stroke="#4A3010" strokeWidth="0.5" opacity="0.3" />

      {/* Bottom Wooden Knob */}
      <path d="M 10 73 C 14 73 19 73 22 73 L 21 76 C 17 76 13 76 10 76 Z" fill="#2E1D0A" />
      <path d="M 7 76 C 13 75 20 75 26 76 L 24 81 C 18 82 11 82 7 81 Z" fill={`url(#brassCollar_${side})`} stroke="#2E1B09" strokeWidth="0.6" />
      <path d="M 9 81 C 14 79 19 79 24 81 C 26 83 26 86 24 88 C 19 90 14 90 9 88 C 7 86 7 83 9 81 Z" fill={`url(#woodKnob_${side})`} stroke="#2E1B09" strokeWidth="0.8" />
    </svg>
  );
}

export default function Home() {
  const [activeChapter, setActiveChapter] = useState("section-1");
  const [email, setEmail] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
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

  // Track visited chapters to persist scroll reveal animations across React renders
  const [visitedChapters, setVisitedChapters] = useState<Record<string, boolean>>({
    "section-1": true, // First section is visible by default
  });

  const [mounted, setMounted] = useState(false);
  const section6VideoRef = useRef<HTMLVideoElement>(null);

  // Trigger Section 6 video playback when user scrolls to Section 6, freezing on the last frame
  useEffect(() => {
    if (activeChapter === "section-6" && section6VideoRef.current) {
      const vid = section6VideoRef.current;
      vid.currentTime = 0;
      vid.play().catch((err) => console.log("Section 6 video play error:", err));
    }
  }, [activeChapter]);

  useEffect(() => {
    setMounted(true);

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

  // Web Audio Context cleanup on page unmount
  useEffect(() => {
    return () => {
      if (audioCtx) {
        audioCtx.close().catch(() => {});
      }
    };
  }, [audioCtx]);

  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Buttery Smooth Scroll Engine on the Window context for native smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Window scroll event listener and section intersection observer
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const sections = document.querySelectorAll(".chapter-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Update visited state based on whether the section is currently intersecting (on-screen)
          setVisitedChapters((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));

          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        });
      },
      { threshold: 0.15 } // Omit root to default to the viewport/window context
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, marketingConsent, source: "homepage" }),
      });
    } catch (err) {
      console.warn("Failed to post email to API, showing success state:", err);
    }
    setSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, {
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // ponytail: Procedural Nature Soundscape via Web Audio API (Gentle Wind, Soft Stream, Forest Bird Trills)
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

        const sampleRate = ctx.sampleRate;
        const bufferSize = 4 * sampleRate;

        // --- LAYER 1: Gentle Forest Wind & Breeze (Filtered Pink Noise with Slow Gusts) ---
        const windBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
        const windData = windBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          windData[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }

        const windSource = ctx.createBufferSource();
        windSource.buffer = windBuffer;
        windSource.loop = true;

        const windFilter = ctx.createBiquadFilter();
        windFilter.type = "lowpass";
        windFilter.frequency.value = 350;

        // LFO for organic wind gusts (0.15 Hz slow sine modulation)
        const windLfo = ctx.createOscillator();
        windLfo.frequency.value = 0.15;
        const windLfoGain = ctx.createGain();
        windLfoGain.gain.value = 150;
        windLfo.connect(windLfoGain);
        windLfoGain.connect(windFilter.frequency);

        const windGain = ctx.createGain();
        windGain.gain.value = 0.08;

        windSource.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(ctx.destination);

        windSource.start();
        windLfo.start();

        // --- LAYER 2: Soft Stream & Water Rustle (Bandpass High-Density Droplets) ---
        const streamBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
        const streamData = streamBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          streamData[i] = (Math.random() * 2 - 1) * 0.03;
        }

        const streamSource = ctx.createBufferSource();
        streamSource.buffer = streamBuffer;
        streamSource.loop = true;

        const streamFilter = ctx.createBiquadFilter();
        streamFilter.type = "bandpass";
        streamFilter.frequency.value = 950;
        streamFilter.Q.value = 0.7;

        const streamGain = ctx.createGain();
        streamGain.gain.value = 0.04;

        streamSource.connect(streamFilter);
        streamFilter.connect(streamGain);
        streamGain.connect(ctx.destination);

        streamSource.start();

        // --- LAYER 3: Distant Soft Bird Chimes (Organic Pentatonic Chirps) ---
        const playBirdChime = () => {
          if (!ctx || ctx.state !== "running") return;
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();

          const baseFreq = [1318.51, 1567.98, 1760.00, 1975.53, 2349.32, 2637.02][Math.floor(Math.random() * 6)];
          osc.type = "sine";
          osc.frequency.setValueAtTime(baseFreq, now);
          osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.12, now + 0.08);
          osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.95, now + 0.22);

          noteGain.gain.setValueAtTime(0.0001, now);
          noteGain.gain.linearRampToValueAtTime(0.025, now + 0.04);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

          osc.connect(noteGain);
          noteGain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.4);
        };

        setInterval(() => {
          if (Math.random() < 0.7) {
            playBirdChime();
            setTimeout(() => {
              if (Math.random() < 0.6) playBirdChime();
            }, 180 + Math.random() * 140);
          }
        }, 3500);
      }
      ctx.resume();
      setAudioPlaying(true);
    }
  };

  return (
    <>
      {/* Fixed Background Images & Videos for Scroll-snapping Cross-dissolves */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {chapters.map((chapter) => (
          <div
            key={`bg-${chapter.id}`}
            className={`absolute inset-0 transition-opacity duration-[750ms] ease-out ${
              activeChapter === chapter.id
                ? chapter.id === "section-1"
                  ? "opacity-60"
                  : "opacity-25"
                : "opacity-0"
            }`}
          >
            {chapter.id === "section-1" ? (
              <video
                src="/Assets/hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter contrast-[0.95] brightness-[1.05] mix-blend-multiply"
              />
            ) : (
              <img
                src={chapter.bgImageUrl}
                alt={chapter.imageAlt}
                className="w-full h-full object-cover filter grayscale contrast-[0.9] brightness-[1.05] mix-blend-multiply"
              />
            )}
            {/* Smooth top and bottom gradients to blend background images with the page background color (#fec6a1) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#fec6a1] via-transparent to-[#fec6a1] opacity-95"></div>
            {/* Subtle side vignettes to soften horizontal transitions */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#fec6a1]/20 via-transparent to-[#fec6a1]/20"></div>
            <div className="image-overlay"></div>
          </div>
        ))}
      </div>

      {/* Floating Left Vertical Timeline Track */}
      <div className="timeline-track hidden md:flex">
        {chapters.map((chapter) => (
          <button
            key={`dot-${chapter.id}`}
            onClick={() => scrollToSection(chapter.id)}
            className={`timeline-dot cursor-pointer focus:outline-none ${
              activeChapter === chapter.id ? "active" : ""
            }`}
          ></button>
        ))}
      </div>

      {/* Unified PageHeader Component */}
      <PageHeader
        showSoundscape
        audioPlaying={audioPlaying}
        toggleAmbientAudio={toggleAmbientAudio}
        fadeLogoOnScroll
        isScrolled={isScrolled}
        scrollToSection={scrollToSection}
      />

      {/* Main Snap Scroll Container */}
      <div ref={containerRef} className="scroll-container">
        {chapters.map((chapter) => {
          const isActive = activeChapter === chapter.id;

          return (
            <section
              key={chapter.id}
              id={chapter.id}
              className={`chapter-section ${isActive ? "active" : ""} ${
                visitedChapters[chapter.id] ? "visited" : ""
              }`}
            >
              {chapter.layout === "invite" && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                  {/* Seamless Masked Video — Plays once on scroll into Section 6 and freezes on final static frame */}
                  <video
                    ref={section6VideoRef}
                    muted
                    playsInline
                    className="absolute right-0 top-0 h-full w-full max-w-[960px] object-cover object-right opacity-80 mix-blend-multiply pointer-events-none"
                    style={{
                      WebkitMaskImage: "radial-gradient(ellipse at 80% 55%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 90%)",
                      maskImage: "radial-gradient(ellipse at 80% 55%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 90%)",
                    }}
                  >
                    <source src="/Assets/begin.mp4" type="video/mp4" />
                  </video>

                  {/* Soft Vignettes & Golden Ambient Lighting Glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#fec6a1]/40 via-transparent to-[#fec6a1]/40 pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C4913A]/10 rounded-full blur-3xl pointer-events-none" />
                </div>
              )}
              <div className="relative z-auto w-full max-w-[1440px] px-6 md:px-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
                
                {chapter.layout === "hero" && (
                  <div className="md:col-span-12 flex justify-center text-center">
                    <div className="glass-editorial-panel w-full max-w-[1000px] flex flex-col items-center justify-center reveal-frame">
                      <div className="flex justify-center mb-8 reveal-subtitle">
                        <img
                          src="/Assets/logo/ICON blk trnsprnt.png"
                          alt="Deuxsentique Logo"
                          className="h-28 md:h-40 w-auto object-contain hero-logo-float drop-shadow-[0_0_20px_rgba(196,145,58,0.4)]"
                        />
                      </div>
                      <h1 className="font-display text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 md:mb-8 tracking-[0.05em] leading-tight text-on-background whitespace-nowrap">
                        {renderTitle(chapter.title)}
                      </h1>
                      <p className="max-w-xl mx-auto text-on-background/70 leading-relaxed text-[16px] md:text-[18px] tracking-[0.2em] uppercase font-body font-light reveal-desc">
                        {chapter.desc}
                      </p>
                    </div>
                  </div>
                )}

                {chapter.layout === "left-panel" && (
                  <>
                    <div className="md:col-span-6 flex justify-start">
                      <div className="glass-editorial-panel w-full max-w-[580px] reveal-frame">
                        <h2 className="font-display text-2xl md:text-4xl lg:text-5xl mb-6 md:mb-8 leading-tight text-on-background whitespace-pre-line">
                          {renderTitle(chapter.title)}
                        </h2>
                        <p className="text-on-background/95 leading-relaxed text-[16px] md:text-[18px] lg:text-[19px] font-body font-normal italic reveal-desc whitespace-pre-line">
                          {chapter.desc}
                        </p>
                      </div>
                    </div>
                    <div className="md:col-span-6 hidden md:flex justify-end reveal-frame">
                      <div className="cinematic-frame w-full max-w-[480px]">
                        <img
                          src={chapter.imageUrl}
                          alt={chapter.imageAlt}
                          className={getImageClassName(chapter.imageUrl)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {chapter.layout === "right-panel" && (
                  <>
                    <div className="md:col-span-6 hidden md:flex justify-start reveal-frame">
                      <div className="cinematic-frame w-full max-w-[480px]">
                        <img
                          src={chapter.imageUrl}
                          alt={chapter.imageAlt}
                          className={getImageClassName(chapter.imageUrl)}
                        />
                      </div>
                    </div>
                    <div className="md:col-span-6 flex justify-end">
                      <div className="glass-editorial-panel w-full max-w-[580px] reveal-frame">
                        <h2 className="font-display text-2xl md:text-4xl lg:text-5xl mb-6 md:mb-8 leading-tight text-on-background whitespace-pre-line">
                          {renderTitle(chapter.title)}
                        </h2>
                        <p className="text-on-background/95 leading-relaxed text-[16px] md:text-[18px] lg:text-[19px] font-body font-normal italic reveal-desc whitespace-pre-line">
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
                    <div className="md:col-span-6 hidden md:flex justify-end reveal-frame">
                      <div className="cinematic-frame w-full max-w-[480px]">
                        <img
                          src={chapter.imageUrl}
                          alt={chapter.imageAlt}
                          className={getImageClassName(chapter.imageUrl)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {chapter.layout === "asymmetric" && (
                  <>
                    <div className="md:col-span-7 flex justify-start">
                      <div className="glass-editorial-panel w-full max-w-[620px] reveal-frame">
                        {chapter.title && (
                          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl mb-6 md:mb-8 leading-tight text-on-background whitespace-pre-line">
                            {renderTitle(chapter.title)}
                          </h2>
                        )}
                        {/* Large Editorial Quote */}
                        <div className="border-l border-primary/20 pl-6 md:pl-8 mb-8">
                          <p className="font-display text-2xl md:text-3xl lg:text-4xl italic leading-relaxed text-on-background">
                            &ldquo;Ours are created to become part of your story.&rdquo;
                          </p>
                        </div>
                        <p className="text-on-background/95 leading-relaxed text-[16px] md:text-[18px] lg:text-[19px] font-body font-normal italic reveal-desc whitespace-pre-line">
                          {chapter.desc}
                        </p>
                      </div>
                    </div>
                    <div className="md:col-span-5 hidden md:flex justify-center reveal-frame">
                      <div className="cinematic-frame w-full max-w-[380px] -translate-y-8">
                        <img
                          src={chapter.imageUrl}
                          alt={chapter.imageAlt}
                          className={getImageClassName(chapter.imageUrl)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {chapter.layout === "believe" && (
                  <>
                    <div className="md:col-span-6 hidden md:flex justify-start reveal-frame">
                      <div className="cinematic-frame w-full max-w-[480px]">
                        <img
                          src={chapter.imageUrl}
                          alt={chapter.imageAlt}
                          className={getImageClassName(chapter.imageUrl)}
                        />
                      </div>
                    </div>
                    <div className="md:col-span-6 flex justify-end">
                      <div className="glass-editorial-panel w-full max-w-[580px] reveal-frame">
                        <h2 className="font-display text-2xl md:text-4xl lg:text-5xl mb-12 leading-tight text-on-background">
                          {renderTitle(chapter.title)}
                        </h2>
                        <div className="h-24 flex items-center reveal-desc">
                          <span className="font-display text-4xl md:text-6xl tracking-wide text-primary transition-all duration-700 ease-in-out">
                            {["Emotion First", "Authenticity", "Craftsmanship", "Connection", "Quiet Luxury", "Timelessness"][beliefIdx]}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-6 text-[10px] uppercase tracking-[0.3em] text-on-background/30 font-body reveal-desc">
                          {["Emotion First", "Authenticity", "Craftsmanship", "Connection", "Quiet Luxury", "Timelessness"].map((word, idx) => (
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
                  <div className="md:col-span-12 flex flex-col items-center justify-center text-center relative z-10 min-h-screen w-full py-12 md:py-16 px-4 sm:px-6 overflow-hidden">
                    
                    {/* Native Content Stack positioned in alignment with reference design */}
                    <div className="relative z-10 w-full max-w-[580px] mx-auto flex flex-col items-center text-center my-auto pt-4 md:pt-8">
                      
                      {/* Brand Name */}
                      <div className="font-display text-[16px] sm:text-[18px] md:text-[22px] tracking-[0.55em] text-[#8C5832] uppercase mb-3 reveal-subtitle select-none font-medium">
                        Deuxsentique
                      </div>

                      {/* Black Brand Logo & Side Flourishes */}
                      <div className="flex items-center justify-center gap-3 sm:gap-4 my-2 sm:my-3 select-none reveal-subtitle">
                        {/* Left Flourish Swirl SVG */}
                        <svg
                          viewBox="0 0 140 40"
                          className="w-[80px] sm:w-[120px] md:w-[140px] h-auto text-[#8C5832]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        >
                          <path d="M 10 20 H 55 C 80 20 75 5 50 8 C 32 12 38 32 68 27 C 92 23 105 16 130 20" />
                          <path d="M 122 8 C 112 0 102 2 106 12 C 110 22 122 19 130 20" strokeWidth="1.2" />
                        </svg>

                        {/* Black Brand Logo */}
                        <img
                          src="/Assets/logo/ICON blk trnsprnt.png"
                          alt="Deuxsentique Logo"
                          className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-[0_2px_8px_rgba(140,88,50,0.18)]"
                        />

                        {/* Right Flourish Swirl SVG */}
                        <svg
                          viewBox="0 0 140 40"
                          className="w-[80px] sm:w-[120px] md:w-[140px] h-auto text-[#8C5832] scale-x-[-1]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        >
                          <path d="M 10 20 H 55 C 80 20 75 5 50 8 C 32 12 38 32 68 27 C 92 23 105 16 130 20" />
                          <path d="M 122 8 C 112 0 102 2 106 12 C 110 22 122 19 130 20" strokeWidth="1.2" />
                        </svg>
                      </div>

                      {/* Matching Luxury Editorial Title */}
                      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#23150D] tracking-wider font-normal leading-tight mb-4 drop-shadow-sm reveal-title">
                        {renderTitle("Begin Your Journey")}
                      </h2>

                      {/* Animated Supporting Description Sentences */}
                      <div className="max-w-[540px] mx-auto mb-8 font-body font-light italic leading-relaxed text-[#3A2418]/90 text-[13px] sm:text-[14px] md:text-[15px]">
                        <p className="reveal-desc mb-2" style={{ transitionDelay: "600ms" }}>
                          Request your invitation to enter the world of Deuxsentique.
                        </p>
                        <p className="reveal-desc" style={{ transitionDelay: "900ms" }}>
                          Discover intimate brand stories, early access and thoughtfully selected news from the house.
                        </p>
                      </div>

                      {/* Fully Interactive Native HTML Form */}
                      {!submitted ? (
                        mounted ? (
                          <form onSubmit={handleSubmit} className="w-full max-w-[480px] flex flex-col items-center gap-6 mx-auto relative z-20 reveal-frame" id="waitlist-form">
                            
                            {/* Clean Editorial Email Input Field */}
                            <div className="w-full max-w-[420px] relative px-2">
                              <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ENTER YOUR EMAIL ADDRESS"
                                className="w-full bg-transparent border-b border-[#8C5832]/40 focus:border-[#8C5832] pb-3 pt-2 text-[#3A2418] text-[12px] sm:text-[13px] tracking-[0.25em] text-center placeholder:text-[#633A18]/60 placeholder:tracking-[0.20em] transition-all duration-300 focus:outline-none font-display font-medium"
                              />
                            </div>

                            {/* GDPR Marketing Consent Checkbox */}
                            <label className="flex items-start gap-3 cursor-pointer group px-2 max-w-[440px] text-left">
                              <input
                                type="checkbox"
                                checked={marketingConsent}
                                onChange={(e) => setMarketingConsent(e.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-2 border-[#8C5832]/60 text-[#8C5832] focus:ring-[#8C5832] accent-[#8C5832] bg-transparent cursor-pointer"
                              />
                              <span className="text-[11px] text-[#3A2418]/85 leading-relaxed font-body font-light group-hover:text-[#23150D] transition-colors select-none">
                                I would like to receive stories, launch updates and exclusive invitations from Deuxsentique. I understand I can unsubscribe at any time.
                              </span>
                            </label>

                            {/* Animated Luxury Theme Button */}
                            <LuxuryAnimatedButton type="submit" label="Request Invitation" />
                          </form>
                        ) : null
                      ) : (
                        /* Success State Overlay styled as parchment scroll */
                        <div className="w-full max-w-[480px] bg-[#EADBBF]/95 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl border border-[#8C5832] transition-all duration-1000 animate-fadeIn" id="success-state">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#8C5832] mb-3 text-[#8C5832] bg-[#8C5832]/10">
                            <span className="text-lg">✓</span>
                          </div>
                          <p className="text-[#8C5832] text-[11px] md:text-[12px] uppercase tracking-[0.5em] mb-2 font-body font-semibold">
                            You&rsquo;re now part of the Deuxsentique circle.
                          </p>
                          <p className="text-[#23150D] text-[12px] md:text-[13px] leading-relaxed font-body font-light italic">
                            From here, we&rsquo;ll keep you close to new releases, private moments and what comes next.
                          </p>
                        </div>
                      )}

                      {/* Bottom Decorative Flourish matching reference image */}
                      <div className="mt-8 flex justify-center opacity-80 select-none reveal-desc">
                        <svg viewBox="0 0 240 30" className="w-44 sm:w-52 h-auto" fill="none" stroke="#8C5832" strokeWidth="1.4" strokeLinecap="round">
                          <path d="M 10 15 H 85 C 105 15 100 4 85 7 C 72 10 77 24 98 20 C 112 17 116 12 120 15 C 124 12 128 17 142 20 C 163 24 168 10 155 7 C 140 4 135 15 155 15 H 230" />
                          <polygon points="120,18 116,24 120,30 124,24" fill="#8C5832" stroke="none" />
                        </svg>
                      </div>

                    </div>

                  </div>
                )}

                {chapter.layout === "socials" && (
                  <div className="md:col-span-12 flex justify-center text-center">
                    <div className="glass-editorial-panel w-full max-w-[580px] flex flex-col items-center reveal-frame">
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

      {/* Floating Scroll Indicator (Only in Hero section, disappears as soon as user scrolls) */}
      <div
        className={`scroll-indicator transition-all duration-700 pointer-events-none ${
          activeChapter === "section-1" && !isScrolled
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <span className="font-body text-[9px] uppercase tracking-[0.4em]">Scroll</span>
        <div className="scroll-indicator-line"></div>
      </div>
    </>
  );
}
