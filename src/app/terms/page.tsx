"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PageHeader, Footer } from "../components/shared";
import { POLICIES_DATA, PolicyDocument, PolicySection } from "./policy-data";

const TABS = [
  { id: "terms", label: "Terms & Conditions", short: "Terms" },
  { id: "privacy", label: "Privacy Policy", short: "Privacy" },
  { id: "shipping", label: "Shipping & Delivery", short: "Shipping" },
  { id: "returns", label: "Returns & Refund", short: "Returns" },
];

export default function TermsPage() {
  const [activeTab, setActiveTab] = useState<string>("terms");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    // Check URL hash on mount
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (hash && TABS.some((t) => t.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  const currentPolicy: PolicyDocument = POLICIES_DATA[activeTab] || POLICIES_DATA["terms"];

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setSearchQuery("");
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredSections = searchQuery.trim()
    ? currentPolicy.sections.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.paragraphs.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : currentPolicy.sections;

  return (
    <>
      <PageHeader />

      <main className="inner-page page-fade-in active min-h-screen pt-24 md:pt-32 pb-24 px-4 sm:px-6 md:px-12 max-w-[1280px] mx-auto">
        {/* Header Banner */}
        <section className="text-center pt-8 pb-12 md:pb-16 max-w-3xl mx-auto">
          <div className="flex justify-center mb-6 reveal-frame">
            <img
              src="/Assets/logo/ICON blk trnsprnt.png"
              alt="Deuxsentique Logo"
              className="h-16 md:h-20 w-auto object-contain hero-logo-float drop-shadow-[0_0_15px_rgba(196,145,58,0.35)]"
            />
          </div>
          <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-3 font-body">
            Legal &amp; Policies
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-3 leading-tight text-on-background">
            Privacy &amp; Terms
          </h1>
          <p className="text-primary font-display text-xl sm:text-2xl tracking-wide mb-4">
            {currentPolicy.title}
          </p>
          <div className="gold-divider max-w-[300px] mx-auto my-6 opacity-75"></div>
          <p className="text-on-background/70 text-xs sm:text-sm font-body tracking-wider uppercase">
            Last Updated: {currentPolicy.lastUpdated} &bull; Deuxsentique Ltd
          </p>
        </section>

        {/* Policy Navigation Tabs */}
        <div className="flex justify-center mb-10 md:mb-14 overflow-x-auto py-2 px-2 no-scrollbar">
          <div className="inline-flex bg-primary/10 p-1.5 rounded-2xl border border-primary/20 backdrop-blur-sm shadow-inner gap-1 sm:gap-2">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-body text-[10px] sm:text-[11px] uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-background font-semibold shadow-md scale-100"
                      : "text-on-background/70 hover:text-on-background hover:bg-primary/10"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Layout: Sidebar + Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Table of Contents Sticky Sidebar */}
          <aside className="lg:col-span-4 sticky top-28 hidden lg:block bg-primary/5 p-6 rounded-2xl border border-primary/15 backdrop-blur-sm max-h-[80vh] overflow-y-auto">
            <h2 className="font-display text-lg text-primary mb-4 pb-2 border-b border-primary/20">
              Table of Contents
            </h2>
            <nav className="space-y-1">
              {currentPolicy.sections.map((sec) => (
                <a
                  key={sec.number}
                  href={`#sec-${sec.number}`}
                  className="block text-xs font-body text-on-background/70 hover:text-primary hover:translate-x-1 py-1.5 transition-all leading-snug"
                >
                  <span className="text-primary/60 mr-2 font-mono">{sec.number}.</span>
                  {sec.title}
                </a>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-primary/20 text-center">
              <p className="text-[11px] text-on-background/60 font-body mb-3">
                Need direct assistance with our policies?
              </p>
              <a
                href="mailto:customer-service@deuxsentique.com"
                className="inline-block text-[10px] font-body uppercase tracking-[0.2em] bg-primary/15 hover:bg-primary text-primary hover:text-background px-4 py-2 rounded-lg border border-primary/30 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </aside>

          {/* Main Legal Content */}
          <div className="lg:col-span-8 space-y-8 md:space-y-10">
            {/* Intro text if present */}
            {currentPolicy.intro && currentPolicy.intro.length > 0 && (
              <div className="bg-primary/5 border-l-2 border-primary p-6 rounded-r-xl space-y-3">
                {currentPolicy.intro.map((p, idx) => (
                  <p key={idx} className="text-on-background/85 font-body leading-relaxed text-sm md:text-base">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {/* Sections Accordion / Cards */}
            {filteredSections.map((sec) => (
              <article
                key={sec.number}
                id={`sec-${sec.number}`}
                className="bg-primary/[0.03] hover:bg-primary/[0.05] border border-primary/15 p-6 sm:p-8 rounded-2xl transition-all duration-300 scroll-mt-28"
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-xs sm:text-sm font-bold text-primary/70 bg-primary/10 px-2.5 py-1 rounded-md">
                    {sec.number.toString().padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl text-on-background tracking-wide">
                    {sec.title}
                  </h3>
                </div>

                <div className="space-y-3 font-body text-on-background/80 text-sm md:text-[15px] leading-relaxed pl-1 sm:pl-2">
                  {sec.paragraphs.map((p, pIdx) => {
                    // Check for bullet lists
                    if (p.startsWith("•") || p.startsWith("—") || p.startsWith("-")) {
                      return (
                        <div key={pIdx} className="flex items-start gap-2.5 my-1.5 pl-2">
                          <span className="text-primary text-xs mt-1">&bull;</span>
                          <p className="flex-1">{p.replace(/^[•—\-]\s*/, "")}</p>
                        </div>
                      );
                    }

                    // Check for email address
                    if (p.includes("@deuxsentique.com")) {
                      return (
                        <p key={pIdx} className="font-medium text-primary py-1">
                          <a
                            href={`mailto:${p.trim()}`}
                            className="underline hover:opacity-80 transition-opacity"
                          >
                            {p}
                          </a>
                        </p>
                      );
                    }

                    // Check for external link (ICO)
                    if (p.includes("https://")) {
                      return (
                        <p key={pIdx} className="font-medium text-primary py-1">
                          <a
                            href={p.trim()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:opacity-80 transition-opacity"
                          >
                            {p}
                          </a>
                        </p>
                      );
                    }

                    // Bold headers/titles like "Customer Service Email", "Working Hours"
                    if (
                      p.length < 40 &&
                      (p.includes("Hours") ||
                        p.includes("Email") ||
                        p.includes("Time") ||
                        p.includes("Days") ||
                        p.includes("Personal Information") ||
                        p.includes("Order Information") ||
                        p.includes("Website Usage Information") ||
                        p.includes("Marketing Preferences") ||
                        p.includes("Closing Note"))
                    ) {
                      return (
                        <p key={pIdx} className="font-display font-semibold text-primary pt-2 text-base">
                          {p}
                        </p>
                      );
                    }

                    return <p key={pIdx}>{p}</p>;
                  })}
                </div>
              </article>
            ))}

            {/* Support & Brand Footer Callout */}
            <div className="bg-primary/10 border border-primary/30 p-8 rounded-2xl text-center space-y-4 my-12">
              <h4 className="font-display text-2xl text-primary">Two Souls. One Essence.</h4>
              <p className="text-on-background/75 font-body text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                Deuxsentique exists to transform real stories, emotions, and memories into timeless fragrances. These policies reflect our steadfast commitment to transparency, honesty, and care.
              </p>
              <div className="pt-2">
                <a
                  href="mailto:customer-service@deuxsentique.com"
                  className="inline-flex items-center gap-2 text-[11px] font-body uppercase tracking-[0.25em] bg-primary text-background px-6 py-3 rounded-xl hover:opacity-90 transition-opacity font-medium"
                >
                  <span>customer-service@deuxsentique.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
