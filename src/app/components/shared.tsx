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

export function PageHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-24 py-6 md:py-8 z-[100] bg-[#1A1916]/90 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-display text-lg md:text-2xl tracking-[0.4em] uppercase text-[#fec6a1] hover:text-primary transition-colors">
            Deuxsentique
          </Link>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:block">
          <img
            src="/icon.png"
            alt="Deuxsentique Logo"
            className="h-16 md:h-20 w-auto object-contain brightness-110 contrast-110 drop-shadow-[0_0_15px_rgba(196,145,58,0.7)]"
          />
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
          <Link
            href="/#section-6"
            className="hidden md:inline-block font-body text-[10px] uppercase tracking-[0.3em] border border-primary/40 text-primary px-8 py-3 hover:bg-primary hover:text-[#1A1916] transition-all duration-700 hover:shadow-[0_0_15px_rgba(196,145,58,0.3)] hover:-translate-y-0.5 cursor-pointer"
          >
            Request Invitation
          </Link>
 
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] cursor-pointer p-2 focus:outline-none"
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
        <Link
          href="/#section-6"
          onClick={() => setMenuOpen(false)}
          className="font-body text-[10px] uppercase tracking-[0.4em] border border-primary/40 text-primary px-10 py-4 hover:bg-primary hover:text-background transition-all duration-700 mt-4"
        >
          Request Invitation
        </Link>
      </div>
    </>
  );
}
