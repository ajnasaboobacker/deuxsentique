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
            Last Updated: {currentPolicy.lastUpdated} Deuxsentique Ltd
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
                  {renderContent(sec.paragraphs)}
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

const renderContent = (paragraphs: string[]) => {
  // Step 1: Merge bullets and split sentences
  const cleaned: string[] = [];
  for (let i = 0; i < paragraphs.length; i++) {
    let p = paragraphs[i].trim();
    if (!p) continue;

    // If it's a standalone bullet marker
    if ((p === "•" || p === "—" || p === "-") && i + 1 < paragraphs.length) {
      cleaned.push("• " + paragraphs[i + 1].trim());
      i++;
      continue;
    }

    // Check if it's a split sentence
    const sentenceTerminators = [".", "?", "!", ":", "—"];
    const lastChar = p.slice(-1);
    const isTerminated = sentenceTerminators.includes(lastChar);
    
    if (p.length >= 40 && !isTerminated && i + 1 < paragraphs.length) {
      const nextP = paragraphs[i + 1].trim();
      const isNextBullet = nextP.startsWith("•") || nextP.startsWith("—") || nextP.startsWith("-");
      if (!isNextBullet) {
        // Merge them!
        p = p + " " + nextP;
        i++; // skip next
      }
    }

    cleaned.push(p);
  }

  // Step 2: Group consecutive address lines / short lines together
  const blocks: React.ReactNode[] = [];
  let currentGroup: string[] = [];

  const renderGroup = (group: string[], key: string) => {
    if (group.length === 0) return null;
    if (group.length === 1) {
      const p = group[0];
      // Check for email
      if (p.includes("@deuxsentique.com")) {
        return (
          <p key={key} className="font-medium text-primary py-0.5">
            <a href={`mailto:${p}`} className="underline hover:underline-offset-4 hover:opacity-80 transition-all">
              {p}
            </a>
          </p>
        );
      }
      // Check for link
      if (p.startsWith("https://")) {
        return (
          <p key={key} className="font-medium text-primary py-0.5">
            <a href={p} target="_blank" rel="noopener noreferrer" className="underline hover:underline-offset-4 hover:opacity-80 transition-all">
              {p}
            </a>
          </p>
        );
      }
      // Check for bold sections/subheadings
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
          <p key={key} className="font-display font-semibold text-primary pt-3 pb-1 text-[15px] sm:text-base tracking-wide">
            {p}
          </p>
        );
      }

      // Check if it ends with a colon (like a details label)
      if (p.endsWith(":")) {
        return (
          <p key={key} className="font-semibold text-primary/95 mt-2 mb-1">
            {p}
          </p>
        );
      }

      return (
        <p key={key} className="text-on-background/80 leading-relaxed font-body">
          {p}
        </p>
      );
    }

    // It's a sequence of short items (likely an address or details card)
    return (
      <div key={key} className="my-4 bg-primary/5 border border-primary/15 p-5 rounded-2xl space-y-1.5 max-w-[420px] shadow-sm">
        {group.map((item, idx) => {
          if (item.includes("@deuxsentique.com")) {
            return (
              <p key={idx} className="text-xs sm:text-sm font-medium text-primary">
                <a href={`mailto:${item}`} className="underline hover:underline-offset-4 hover:opacity-80 transition-all">
                  {item}
                </a>
              </p>
            );
          }
          if (item.endsWith(":")) {
            return (
              <p key={idx} className="text-xs sm:text-sm font-semibold text-primary/95 mt-1.5 first:mt-0">
                {item}
              </p>
            );
          }
          return (
            <p key={idx} className="text-xs sm:text-sm text-on-background/80 font-normal leading-relaxed">
              {item}
            </p>
          );
        })}
      </div>
    );
  };

  for (let i = 0; i < cleaned.length; i++) {
    const p = cleaned[i];

    // Check if it's a bullet point
    if (p.startsWith("•") || p.startsWith("—") || p.startsWith("-")) {
      // Flush any active group first
      if (currentGroup.length > 0) {
        blocks.push(renderGroup(currentGroup, `g-${i}`));
        currentGroup = [];
      }

      // Collect consecutive bullet items into a single list
      const listItems: string[] = [];
      let j = i;
      while (j < cleaned.length && (cleaned[j].startsWith("•") || cleaned[j].startsWith("—") || cleaned[j].startsWith("-"))) {
        listItems.push(cleaned[j].replace(/^[•—\-]\s*/, ""));
        j++;
      }
      i = j - 1; // update loop counter

      blocks.push(
        <ul key={`list-${i}`} className="my-4 space-y-2.5 pl-5 list-disc marker:text-primary/70">
          {listItems.map((item, itemIdx) => (
            <li key={itemIdx} className="text-sm md:text-[14px] leading-relaxed text-on-background/85 pl-1 font-body">
              {item}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Check if it's a short details line (does not end with sentence terminators)
    const isGroupable = !p.endsWith(".") && !p.endsWith("?") && !p.endsWith("!");
    if (isGroupable) {
      currentGroup.push(p);
    } else {
      // Flush active group
      if (currentGroup.length > 0) {
        blocks.push(renderGroup(currentGroup, `g-${i}`));
        currentGroup = [];
      }
      blocks.push(renderGroup([p], `p-${i}`));
    }
  }

  // Flush remaining group
  if (currentGroup.length > 0) {
    blocks.push(renderGroup(currentGroup, "g-last"));
  }

  return <div className="space-y-3">{blocks}</div>;
};
