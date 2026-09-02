"use client";

import { useState } from "react";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";

export function Footer({ logoSrc = "/Assets/logo/ICON blk trnsprnt.png" }: { logoSrc?: string }) {
  return (
    <footer className="bg-background w-full py-20 md:py-28 px-8 md:px-16 flex flex-col items-center justify-center gap-6 border-t border-on-background/10 relative z-[100]">
      <div className="flex items-center justify-center mb-2">
        <img src={logoSrc} alt="Deuxsentique Logo" className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_14px_rgba(196,145,58,0.35)]" />
      </div>
      <div className="font-display text-xl tracking-[0.4em] uppercase text-on-background">
        Deuxsentique
      </div>
      <nav className="flex flex-wrap justify-center gap-6 md:gap-12 text-[9px] uppercase tracking-[0.3em] text-on-background/50">
        <Link className="hover:text-on-background transition-colors" href="/about">Our Story</Link>
        <Link className="hover:text-on-background transition-colors" href="/first-embrace">First Embrace</Link>
        <Link className="hover:text-on-background transition-colors" href="/terms">Privacy &amp; Terms</Link>
        <Link className="hover:text-on-background transition-colors" href="/contact">Contact</Link>
      </nav>
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
  brandTitleClassName?: string;
}

export function PageHeader({
  showSoundscape = false,
  audioPlaying = false,
  toggleAmbientAudio,
  fadeLogoOnScroll = false,
  isScrolled = false,
  scrollToSection,
  brandTitleClassName = "text-[#fec6a1] hover:text-primary",
}: PageHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-24 py-6 md:py-8 z-[100] bg-[#1A1916]/90 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center gap-6">
          {scrollToSection ? (
            <button
              onClick={() => scrollToSection("section-1")}
              className={`font-display text-lg md:text-2xl tracking-[0.4em] uppercase transition-colors cursor-pointer focus:outline-none bg-transparent border-none p-0 ${brandTitleClassName}`}
            >
              Deuxsentique
            </button>
          ) : (
            <Link href="/" className={`font-display text-lg md:text-2xl tracking-[0.4em] uppercase transition-colors ${brandTitleClassName}`}>
              Deuxsentique
            </Link>
          )}
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          {fadeLogoOnScroll ? (
            <img
              src="/Assets/logo/icon.png"
              alt="Deuxsentique Logo"
              className={`h-16 md:h-20 w-auto object-contain transition-all duration-700 brightness-110 contrast-110 drop-shadow-[0_0_15px_rgba(196,145,58,0.7)] ${
                isScrolled ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
              }`}
            />
          ) : (
            <img
              src="/Assets/logo/icon.png"
              alt="Deuxsentique Logo"
              className="h-16 md:h-20 w-auto object-contain brightness-110 contrast-110 drop-shadow-[0_0_15px_rgba(196,145,58,0.7)] hidden md:block"
            />
          )}
        </div>

        <nav className="flex items-center gap-4 md:gap-6">
          <Link
            href="/about"
            className="hidden md:inline-block font-body text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#fec6a1]/70 hover:text-primary transition-colors font-medium"
          >
            Our Story
          </Link>
          <Link
            href="/first-embrace"
            className="hidden md:inline-block font-body text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#fec6a1]/70 hover:text-primary transition-colors font-medium"
          >
            First Embrace
          </Link>
          <Link
            href="/contact"
            className="hidden md:inline-block font-body text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#fec6a1]/70 hover:text-primary transition-colors font-medium"
          >
            Contact
          </Link>

          {/* Soundscape icon toggle */}
          {showSoundscape && toggleAmbientAudio && (
            <button
              onClick={toggleAmbientAudio}
              aria-label={audioPlaying ? "Mute audio soundscape" : "Turn sound on"}
              title={audioPlaying ? "Mute sound" : "Turn sound on"}
              className="hidden md:flex items-center justify-center p-2 rounded-full text-[#fec6a1]/70 hover:text-primary hover:bg-white/5 transition-all duration-300 cursor-pointer focus:outline-none bg-transparent border-none"
            >
              {audioPlaying ? (
                <Volume2 className="w-4 h-4 text-primary animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#fec6a1]/60 hover:text-primary" />
              )}
            </button>
          )}

          {scrollToSection ? (
            <button
              className="group relative overflow-hidden hidden md:inline-flex items-center justify-center font-body text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] border border-primary/40 text-primary px-4 md:px-8 py-2.5 md:py-3 transition-all duration-500 ease-out hover:border-primary hover:text-[#1A1916] hover:bg-primary hover:shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95 backdrop-blur-sm cursor-pointer bg-transparent before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
              onClick={() => scrollToSection("section-6")}
            >
              {/* ponytail: subtle glow effect and border pulse animation adapted from subtle-button */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 transition-all duration-500 animate-pulse opacity-0 group-hover:opacity-100 pointer-events-none"></div>
              <span className="relative z-10">Request Invitation</span>
            </button>
          ) : (
            <Link
              href="/#section-6"
              className="group relative overflow-hidden hidden md:inline-flex items-center justify-center font-body text-[10px] uppercase tracking-[0.3em] border border-primary/40 text-primary px-8 py-3 transition-all duration-500 ease-out hover:border-primary hover:text-[#1A1916] hover:bg-primary hover:shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95 backdrop-blur-sm cursor-pointer before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
            >
              {/* ponytail: subtle glow effect and border pulse animation adapted from subtle-button */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 transition-all duration-500 animate-pulse opacity-0 group-hover:opacity-100 pointer-events-none"></div>
              <span className="relative z-10">Request Invitation</span>
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
        <Link href="/contact" onClick={() => setMenuOpen(false)} className="font-display text-2xl tracking-[0.3em] uppercase text-on-background hover:text-primary transition-colors">
          Contact
        </Link>

        {showSoundscape && toggleAmbientAudio && (
          <button
            onClick={toggleAmbientAudio}
            aria-label={audioPlaying ? "Mute audio soundscape" : "Turn sound on"}
            className="flex items-center gap-3 font-display text-xl tracking-[0.2em] uppercase text-on-background/80 hover:text-primary transition-colors cursor-pointer bg-transparent border-none"
          >
            {audioPlaying ? (
              <>
                <Volume2 className="w-5 h-5 text-primary animate-pulse" />
                <span>Sound On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-5 h-5 text-on-background/50" />
                <span>Sound Off</span>
              </>
            )}
          </button>
        )}
        {scrollToSection ? (
          <button
            onClick={() => { setMenuOpen(false); scrollToSection("section-6"); }}
            className="group relative overflow-hidden font-body text-[10px] uppercase tracking-[0.4em] border border-primary/40 text-primary px-10 py-4 transition-all duration-500 ease-out hover:border-primary hover:text-[#1A1916] hover:bg-primary hover:shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95 backdrop-blur-sm mt-4 cursor-pointer bg-transparent before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
          >
            {/* ponytail: subtle glow effect and border pulse animation adapted from subtle-button */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 transition-all duration-500 animate-pulse opacity-0 group-hover:opacity-100 pointer-events-none"></div>
            <span className="relative z-10">Request Invitation</span>
          </button>
        ) : (
          <Link
            href="/#section-6"
            onClick={() => setMenuOpen(false)}
            className="group relative overflow-hidden font-body text-[10px] uppercase tracking-[0.4em] border border-primary/40 text-primary px-10 py-4 transition-all duration-500 ease-out hover:border-primary hover:text-background hover:bg-primary hover:shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95 backdrop-blur-sm mt-4 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
          >
            {/* ponytail: subtle glow effect and border pulse animation adapted from subtle-button */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 transition-all duration-500 animate-pulse opacity-0 group-hover:opacity-100 pointer-events-none"></div>
            <span className="relative z-10">Request Invitation</span>
          </Link>
        )}
      </div>
    </>
  );
}
