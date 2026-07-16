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
  imageAlt: string;
  layout: "left-panel" | "right-panel" | "center-offset" | "asymmetric";
}

const chapters: Chapter[] = [
  {
    id: "chapter-01",
    num: "Chapter I",
    title: "There is a kind of quiet\nthat only exists before.",
    desc: "The silence of a room holding its breath, a clean slate of air waiting for a story to be written upon it.",
    imageUrl: "/chapters/ch01.jpg",
    imageAlt: "Solitude shadow",
    layout: "center-offset",
  },
  {
    id: "chapter-02",
    num: "Chapter II",
    title: "You didn't plan for this\nevening to matter.",
    desc: "The slow ritual of dressing, the adjustment of a collar, the deliberate pause in front of a mirror that reflects someone you are about to become.",
    imageUrl: "/chapter-two.png",
    imageAlt: "Preparatory gesture",
    layout: "right-panel",
  },
  {
    id: "chapter-03",
    num: "Chapter III",
    title: "And then — someone\nenters the room.",
    desc: "The atmosphere shifts. A molecular change in the space between people. You haven't spoken yet, but the air is already crowded with meaning.",
    imageUrl: "/chapters/ch03.jpg",
    imageAlt: "Shift in light",
    layout: "center-offset",
  },
  {
    id: "chapter-04",
    num: "Chapter IV",
    title: "Some conversations begin\nlong before words are used.",
    desc: "A shared glance that lasts a fraction too long. A magnetic pull that defies the physics of a crowded party. The recognition of a soul you haven't met yet.",
    imageUrl: "/chapters/ch04.jpg",
    imageAlt: "Silhouettes",
    layout: "asymmetric",
  },
  {
    id: "chapter-05",
    num: "Chapter V",
    title: "There is a moment, just after\nthe distance closes.",
    desc: "Where the scent of them becomes the only thing you know. A collision of amber, heat, and the terrifying, beautiful loss of oneself in another.",
    imageUrl: "/chapters/ch05.jpg",
    imageAlt: "Peak intimacy",
    layout: "left-panel",
  },
  {
    id: "chapter-06",
    num: "Chapter VI",
    title: "Moments end. Their\nghosts do not.",
    desc: "Long after the door has closed and the lights have dimmed, the essence of that encounter remains trapped in the fabric of the night. A haunting that feels like home.",
    imageUrl: "/chapters/ch06.jpg",
    imageAlt: "Quiet aftermath",
    layout: "right-panel",
  },
  {
    id: "chapter-07",
    num: "Chapter VII",
    title: "You saw them again,\neven when they weren't there.",
    desc: "The memory of them is triggered by the turn of a season, the smell of rain on hot pavement, the sharp bite of woodsmoke in the winter air.",
    imageUrl: "/chapters/ch07.jpg",
    imageAlt: "Intertwined hands",
    layout: "center-offset",
  },
  {
    id: "chapter-08",
    num: "Chapter VIII",
    title: "This is the moment\nwe chose to keep.",
    desc: "The arduous process of pinning down an emotion and turning it into a sequence of notes. A distillation of longing into chemistry.",
    imageUrl: "/chapters/ch08.jpg",
    imageAlt: "Craft textures",
    layout: "left-panel",
  },
  {
    id: "chapter-09",
    num: "Chapter IX",
    title: "Deuxsentique was built by\ntwo people who dared to listen.",
    desc: "Resten, who captures the narrative. Jiji, who commands the science. A dialogue between the storyteller and the chemist to find a singular truth.",
    imageUrl: "/chapters/ch09.jpg",
    imageAlt: "Founder silhouettes",
    layout: "right-panel",
  },
  {
    id: "chapter-10",
    num: "Chapter X",
    title: "The first chapter of Deuxsentique\ncarries a name: First Embrace.",
    desc: "Our inaugural creation. A study in the physics of attraction. Dark woods, ephemeral florals, and a base of deep, resonant amber that lingers like a secret.",
    imageUrl: "/chapters/ch10.jpg",
    imageAlt: "Negative space",
    layout: "asymmetric",
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

export default function Home() {
  const [activeChapter, setActiveChapter] = useState("chapter-01");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
              activeChapter === chapter.id ? "opacity-35" : "opacity-0"
            }`}
          >
            <img
              src={chapter.imageUrl}
              alt={chapter.imageAlt}
              className="w-full h-full object-cover filter brightness-[0.35]"
            />
            <div className="image-overlay"></div>
          </div>
        ))}
        {/* Chapter 11 Background */}
        <div
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
            activeChapter === "chapter-11" ? "opacity-35" : "opacity-0"
          }`}
        >
          <img
            src="/chapters/ch11.jpg"
            alt="Open light"
            className="w-full h-full object-cover filter brightness-[0.35]"
          />
          <div className="image-overlay"></div>
        </div>
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
        <button
          onClick={() => scrollToSection("chapter-11")}
          className={`timeline-dot cursor-pointer focus:outline-none ${
            activeChapter === "chapter-11" ? "active" : ""
          }`}
          data-chapter="11"
        ></button>
      </div>

      {/* Fixed Luxury Header */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-24 py-6 md:py-8 z-[100] bg-background/25 backdrop-blur-md border-b border-primary/5">
        <div className="flex items-center gap-6">
          <span className="font-display text-lg md:text-2xl tracking-[0.4em] uppercase text-on-background">
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
            className="hidden md:inline-block font-body text-[10px] uppercase tracking-[0.3em] text-on-background/50 hover:text-primary transition-colors"
          >
            Our Story
          </Link>
          <Link
            href="/first-embrace"
            className="hidden md:inline-block font-body text-[10px] uppercase tracking-[0.3em] text-on-background/50 hover:text-primary transition-colors"
          >
            First Embrace
          </Link>

          {/* Soundscape toggle */}
          <button
            onClick={toggleAmbientAudio}
            className="hidden md:flex items-center gap-3 cursor-pointer text-[9px] uppercase tracking-[0.3em] text-on-background/50 hover:text-primary transition-colors focus:outline-none"
          >
            <span>Sound</span>
            <div className="flex gap-[2px] items-end h-3 w-4">
              <span className={`w-[2px] bg-primary transition-all duration-300 ${audioPlaying ? "animate-[pulse_1s_infinite_0s] h-3" : "h-1"}`}></span>
              <span className={`w-[2px] bg-primary transition-all duration-300 ${audioPlaying ? "animate-[pulse_1s_infinite_0.2s] h-2" : "h-[2px]"}`}></span>
              <span className={`w-[2px] bg-primary transition-all duration-300 ${audioPlaying ? "animate-[pulse_1s_infinite_0.4s] h-3" : "h-[1.5px]"}`}></span>
            </div>
          </button>

          <button
            className="hidden md:inline-block font-body text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] border border-primary/40 text-primary px-4 md:px-8 py-2.5 md:py-3 hover:bg-primary hover:text-background transition-all duration-700 hover:shadow-[0_0_15px_rgba(196,145,58,0.3)] hover:-translate-y-0.5 cursor-pointer"
            onClick={() => scrollToSection("chapter-11")}
          >
            Request Invitation
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] cursor-pointer p-2 focus:outline-none"
            aria-label="Menu"
          >
            <span className={`block w-5 h-px bg-on-background transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`}></span>
            <span className={`block w-5 h-px bg-on-background transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`}></span>
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
          onClick={() => { setMenuOpen(false); scrollToSection("chapter-11"); }}
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
              <div className="relative z-10 w-full max-w-[1440px] px-6 md:px-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
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
                        <p className="text-on-background/70 leading-relaxed text-[14px] md:text-[15px] font-body font-light italic reveal-desc">
                          {chapter.desc}
                        </p>
                      </div>
                    </div>
                    <div className="md:col-span-6 hidden md:flex justify-end reveal-frame">
                      <div className="cinematic-frame w-full max-w-[480px]">
                        <img
                          src={chapter.imageUrl}
                          alt={chapter.imageAlt}
                          className="w-full aspect-[4/5] object-cover filter grayscale contrast-125"
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
                          className="w-full aspect-[4/5] object-cover filter grayscale contrast-125"
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
                        <p className="text-on-background/70 leading-relaxed text-[14px] md:text-[15px] font-body font-light italic reveal-desc">
                          {chapter.desc}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {chapter.layout === "center-offset" && (
                  <div className="md:col-span-12 flex justify-center">
                    <div className="glass-editorial-panel w-full max-w-[700px] text-center reveal-frame">
                      {chapter.id === "chapter-01" && (
                        <div className="flex justify-center mb-8 reveal-subtitle">
                          <img
                            src="/icon.png"
                            alt="Deuxsentique Logo"
                            className="h-24 md:h-36 w-auto object-contain hero-logo-float drop-shadow-[0_0_20px_rgba(196,145,58,0.4)]"
                          />
                        </div>
                      )}
                      <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-6 md:mb-8 font-body reveal-subtitle">
                        {chapter.num}
                      </p>
                      <h2 className="font-display text-2xl md:text-4xl lg:text-5xl mb-6 md:mb-8 leading-tight text-on-background whitespace-pre-line">
                        {renderTitle(chapter.title)}
                      </h2>
                      <p className="max-w-xl mx-auto text-on-background/70 leading-relaxed text-[14px] md:text-[15px] font-body font-light italic reveal-desc">
                        {chapter.desc}
                      </p>
                    </div>
                  </div>
                )}

                {chapter.layout === "asymmetric" && (
                  <>
                    <div className="md:col-span-7 flex justify-start">
                      <div className="glass-editorial-panel w-full max-w-[620px] reveal-frame">
                        <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-6 md:mb-8 font-body reveal-subtitle">
                          {chapter.num}
                        </p>
                        <h2 className="font-display text-2xl md:text-4xl lg:text-5xl mb-6 md:mb-8 leading-tight text-on-background whitespace-pre-line">
                          {renderTitle(chapter.title)}
                        </h2>

                        {/* Interactive Olfactory Accord Showcase for Chapter X (First Embrace) */}
                        {chapter.id === "chapter-10" ? (
                          <div className="accord-container reveal-desc mt-6">
                            <div
                              className={`accord-item cursor-pointer ${activeAccord === "top" ? "active" : ""}`}
                              onClick={() => setActiveAccord("top")}
                            >
                              <h3 className="accord-title">Top Notes</h3>
                              <p className="accord-notes">Bergamot, Mandarin, Jasmine</p>
                              <p className="accord-desc">
                                A bright, fresh opening of sparkling citrus balanced with the soft,
                                ethereal whisper of jasmine petals.
                              </p>
                            </div>

                            <div
                              className={`accord-item cursor-pointer ${activeAccord === "heart" ? "active" : ""}`}
                              onClick={() => setActiveAccord("heart")}
                            >
                              <h3 className="accord-title">Heart Notes</h3>
                              <p className="accord-notes">Damask Rose, Peony, Lychee</p>
                              <p className="accord-desc">
                                An intimate, blooming core of rich Damask rose and soft peony
                                offset by the sweet freshness of lychee.
                              </p>
                            </div>

                            <div
                              className={`accord-item cursor-pointer ${activeAccord === "base" ? "active" : ""}`}
                              onClick={() => setActiveAccord("base")}
                            >
                              <h3 className="accord-title">Base Notes</h3>
                              <p className="accord-notes">
                                Sandalwood, White Musk, Amber, Vanilla, Tonka
                              </p>
                              <p className="accord-desc">
                                A deep, warm finish of woody sandalwood, rich musk, and velvet tonka
                                bean that lingers close on the skin.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-on-background/70 leading-relaxed text-[14px] md:text-[15px] font-body font-light italic reveal-desc">
                            {chapter.desc}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-5 hidden md:flex justify-center reveal-frame">
                      <div className="cinematic-frame w-full max-w-[380px] -translate-y-8">
                        <img
                          src={chapter.imageUrl}
                          alt={chapter.imageAlt}
                          className="w-full aspect-[3/4] object-cover filter grayscale contrast-125"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </section>
          );
        })}

        {/* Chapter 11 (The Invitation / Waitlist Form) */}
        <section
          id="chapter-11"
          className={`chapter-section ${activeChapter === "chapter-11" ? "active" : ""}`}
        >
          <div className="relative z-10 w-full max-w-[1440px] px-6 md:px-24 flex justify-center">
            <div className="glass-editorial-panel w-full max-w-[580px] reveal-frame">
              <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-6 md:mb-8 font-body reveal-subtitle">
                Chapter XI
              </p>
              <h2 className="font-display text-2xl md:text-4xl lg:text-5xl mb-6 md:mb-8 leading-tight text-on-background reveal-title">
                We&apos;re not announcing a launch.<br />We&apos;re offering an invitation.
              </h2>
              <p className="text-on-background/70 mb-10 md:mb-12 text-[14px] md:text-[15px] font-body font-light italic reveal-desc">
                To witness the unveiling of something made with intention. Register your presence.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 md:gap-8 reveal-desc" id="waitlist-form">
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-0 border-b border-on-background/25 text-on-background font-body py-4 px-0 focus:ring-0 focus:border-primary focus:outline-none transition-all peer placeholder-transparent"
                      placeholder="Email Address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 top-4 text-[10px] text-on-background/40 transition-all peer-focus:-top-4 peer-focus:text-primary peer-focus:text-[10px] peer-valid:-top-4 peer-valid:text-primary peer-valid:text-[10px] uppercase tracking-[0.2em] pointer-events-none"
                    >
                      Email Address
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full border border-primary/50 text-primary font-body text-[10px] uppercase tracking-[0.4em] py-4 md:py-5 hover:bg-primary hover:text-background transition-all duration-700 hover:shadow-[0_0_15px_rgba(196,145,58,0.2)] cursor-pointer"
                  >
                    Request Invitation
                  </button>
                </form>
              ) : (
                <div className="mt-8 transition-all duration-1000 animate-fadeIn" id="success-state">
                  <p className="text-primary text-[11px] uppercase tracking-[0.6em]">
                    Intent Registered.
                  </p>
                  <p className="text-on-background/60 mt-4 italic text-[14px] font-body">
                    The silence ends soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>

      {/* Floating Scroll Indicator (hidden at chapter 11) */}
      <div
        className={`scroll-indicator transition-opacity duration-700 ${
          activeChapter === "chapter-11" ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span className="font-body text-[9px] uppercase tracking-[0.4em]">Scroll</span>
        <div className="scroll-indicator-line"></div>
      </div>
    </>
  );
}
