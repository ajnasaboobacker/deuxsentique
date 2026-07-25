"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { PageHeader, Footer } from "./components/shared";

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

  const [mounted, setMounted] = useState(false);

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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
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
              className={`chapter-section ${isActive ? "active" : ""}`}
            >
              <div className="relative z-auto w-full max-w-[1440px] px-6 md:px-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
                
                {chapter.layout === "hero" && (
                  <div className="md:col-span-12 flex justify-center text-center">
                    <div className="glass-editorial-panel w-full max-w-[1000px] flex flex-col items-center justify-center reveal-frame">
                      <div className="flex justify-center mb-8 reveal-subtitle">
                        <img
                          src="/icon.png"
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
                  <div className="md:col-span-12 flex justify-center text-center relative z-10">
                    {/* Glowing background aura */}
                    <div className="absolute -inset-6 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-3xl blur-2xl opacity-60 animate-glow-pulse pointer-events-none"></div>

                    <div className="relative bg-surface/50 backdrop-blur-xl border border-primary/30 p-10 md:p-16 w-full max-w-[620px] flex flex-col items-center justify-center reveal-frame rounded-2xl invite-card-animated overflow-hidden">
                      {/* Decorative Gold Corner Borders */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-2xl"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/50 rounded-tr-2xl"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/50 rounded-bl-2xl"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-2xl"></div>
                      
                      {/* Floating Brand Logo Seal */}
                      <div className="flex justify-center mb-6 reveal-subtitle">
                        <img
                          src="/icon.png"
                          alt="Deuxsentique Seal"
                          className="h-16 w-auto object-contain hero-logo-float drop-shadow-[0_0_20px_rgba(196,145,58,0.5)]"
                        />
                      </div>

                      <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-4 font-body reveal-subtitle font-medium">
                        {chapter.num}
                      </p>
                      <h2 className="font-display text-2xl md:text-4xl lg:text-5xl mb-6 leading-tight text-on-background whitespace-pre-line">
                        {renderTitle(chapter.title)}
                      </h2>
                      <p className="text-on-background/80 mb-10 text-[14px] md:text-[15px] font-body font-light italic reveal-desc max-w-md">
                        {chapter.desc}
                      </p>

                      {!submitted ? (
                        mounted ? (
                          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 reveal-desc max-w-sm" id="waitlist-form">
                            <div className="relative">
                              <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ENTER YOUR EMAIL ADDRESS"
                                className="w-full bg-[#1A1A1A]/5 border border-primary/30 text-[#1A1A1A] py-4 px-6 rounded-lg text-[11px] tracking-[0.25em] focus:outline-none input-luxury-focus text-center placeholder-[#1A1A1A]/50 font-body font-light"
                              />
                            </div>
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
                          <div className="h-32 flex items-center justify-center reveal-desc">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-on-background/30">Loading Access Form...</span>
                          </div>
                        )
                      ) : (
                        <div className="text-center reveal-desc max-w-md transition-all duration-1000 animate-fadeIn" id="success-state">
                          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-primary mb-6 text-primary bg-primary/10 shadow-[0_0_20px_rgba(196,145,58,0.2)]">
                            <span className="text-xl">✓</span>
                          </div>
                          <p className="text-primary text-[12px] uppercase tracking-[0.6em] mb-4 font-body font-semibold">
                            Invitation Requested
                          </p>
                          <p className="text-on-background/80 text-[13px] leading-relaxed font-body font-light">
                            Your journey with Deuxsentique begins here.<br />
                            We will share stories, updates and exclusive access as our first collection unfolds.
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
