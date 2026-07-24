"use client";

import { useState } from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background w-full py-20 md:py-28 px-8 md:px-16 flex flex-col items-center justify-center gap-6 border-t border-on-background/10 relative z-[100]">
      <div className="flex items-center justify-center mb-2">
        <img src="/icon.png" alt="Deuxsentique Logo" className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_14px_rgba(196,145,58,0.35)]" />
      </div>
      <div className="font-display text-xl tracking-[0.4em] uppercase text-on-background">
        Deuxsentique
      </div>
      <nav className="flex flex-wrap justify-center gap-6 md:gap-12 text-[9px] uppercase tracking-[0.3em] text-on-background/50">
        <Link className="hover:text-on-background transition-colors" href="/about">Our Story</Link>
        <Link className="hover:text-on-background transition-colors" href="/first-embrace">First Embrace</Link>
        <Link className="hover:text-on-background transition-colors" href="#">Privacy</Link>
        <Link className="hover:text-on-background transition-colors" href="#">Terms</Link>
        <Link className="hover:text-on-background transition-colors" href="#">Contact</Link>
      </nav>
      <div className="text-[9px] tracking-[0.2em] text-on-background/30">
        © MMXXIV. LONDON.
      </div>
    </footer>
  );
}

interface PageHeaderProps {
  showSoundscape?: boolean;
  audioPlaying?: boolean;
  toggleAmbientAudio?: () => void;
  fadeLogoOnScroll?: boolean;
  isScrolled?: boolean;
  scrollToSection?: (id: string) => void;
}

export function PageHeader({
  showSoundscape = false,
  audioPlaying = false,
  toggleAmbientAudio,
  fadeLogoOnScroll = false,
  isScrolled = false,
  scrollToSection,
}: PageHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-24 py-6 md:py-8 z-[100] bg-[#1A1916]/90 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center gap-6">
          {scrollToSection ? (
            <button
              onClick={() => scrollToSection("section-1")}
              className="font-display text-lg md:text-2xl tracking-[0.4em] uppercase text-[#1A1A1A] hover:text-[#1A1A1A] transition-colors cursor-pointer focus:outline-none bg-transparent border-none p-0 font-semibold"
            >
              Deuxsentique
            </button>
          ) : (
            <Link href="/" className="font-display text-lg md:text-2xl tracking-[0.4em] uppercase text-[#1A1A1A] hover:text-[#1A1A1A] transition-colors font-semibold">
              Deuxsentique
            </Link>
          )}
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          {fadeLogoOnScroll ? (
            <img
              src="/icon.png"
              alt="Deuxsentique Logo"
              className={`h-16 md:h-20 w-auto object-contain transition-all duration-700 brightness-110 contrast-110 drop-shadow-[0_0_15px_rgba(196,145,58,0.7)] ${
                isScrolled ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
              }`}
            />
          ) : (
            <img
              src="/icon.png"
              alt="Deuxsentique Logo"
              className="h-16 md:h-20 w-auto object-contain brightness-110 contrast-110 drop-shadow-[0_0_15px_rgba(196,145,58,0.7)] hidden md:block"
            />
          )}
        </div>

        <nav className="flex items-center gap-4 md:gap-6">
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
          {showSoundscape && toggleAmbientAudio && (
            <button
              onClick={toggleAmbientAudio}
              className="hidden md:flex items-center gap-3 cursor-pointer text-[9px] uppercase tracking-[0.3em] text-[#fec6a1]/60 hover:text-primary transition-colors focus:outline-none bg-transparent border-none p-0"
            >
              <span>Sound</span>
              <div className="flex gap-[2px] items-end h-3 w-4">
                <span className={`w-[2px] bg-primary transition-all duration-300 ${audioPlaying ? "animate-[pulse_1s_infinite_0s] h-3" : "h-1"}`}></span>
                <span className={`w-[2px] bg-primary transition-all duration-300 ${audioPlaying ? "animate-[pulse_1s_infinite_0.2s] h-2" : "h-[2px]"}`}></span>
                <span className={`w-[2px] bg-primary transition-all duration-300 ${audioPlaying ? "animate-[pulse_1s_infinite_0.4s] h-3" : "h-[1.5px]"}`}></span>
              </div>
            </button>
          )}

          {scrollToSection ? (
            <button
              className="hidden md:inline-block font-body text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] border border-primary/40 text-primary px-4 md:px-8 py-2.5 md:py-3 hover:bg-primary hover:text-[#1A1916] transition-all duration-700 hover:shadow-[0_0_15px_rgba(196,145,58,0.3)] hover:-translate-y-0.5 cursor-pointer bg-transparent"
              onClick={() => scrollToSection("section-6")}
            >
              Request Invitation
            </button>
          ) : (
            <Link
              href="/#section-6"
              className="hidden md:inline-block font-body text-[10px] uppercase tracking-[0.3em] border border-primary/40 text-primary px-8 py-3 hover:bg-primary hover:text-[#1A1916] transition-all duration-700 hover:shadow-[0_0_15px_rgba(196,145,58,0.3)] hover:-translate-y-0.5 cursor-pointer"
            >
              Request Invitation
            </Link>
          )}
 
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] cursor-pointer p-2 focus:outline-none bg-transparent border-none"
            aria-label="Menu"
          >
            <span className={`block w-5 h-px bg-[#fec6a1] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`}></span>
            <span className={`block w-5 h-px bg-[#fec6a1] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`}></span>
          </button>
        </nav>
      </header>
 
      {/* Mobile overlay menu */}
      <div className={`fixed inset-0 z-[99] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 transition-all duration-500 md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <Link href="/about" onClick={() => setMenuOpen(false)} className="font-display text-2xl tracking-[0.3em] uppercase text-on-background hover:text-primary transition-colors">
          Our Story
        </Link>
        <Link href="/first-embrace" onClick={() => setMenuOpen(false)} className="font-display text-2xl tracking-[0.3em] uppercase text-on-background hover:text-primary transition-colors">
          First Embrace
        </Link>
        {scrollToSection ? (
          <button
            onClick={() => { setMenuOpen(false); scrollToSection("section-6"); }}
            className="font-body text-[10px] uppercase tracking-[0.4em] border border-primary/40 text-primary px-10 py-4 hover:bg-primary hover:text-[#1A1916] transition-all duration-700 mt-4 cursor-pointer bg-transparent"
          >
            Request Invitation
          </button>
        ) : (
          <Link
            href="/#section-6"
            onClick={() => setMenuOpen(false)}
            className="font-body text-[10px] uppercase tracking-[0.4em] border border-primary/40 text-primary px-10 py-4 hover:bg-primary hover:text-background transition-all duration-700 mt-4"
          >
            Request Invitation
          </Link>
        )}
      </div>
    </>
  );
}
