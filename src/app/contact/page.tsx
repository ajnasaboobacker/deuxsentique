"use client";

import { useState, useEffect, useRef } from "react";
import { PageHeader, Footer } from "../components/shared";
import { LuxuryAnimatedButton } from "@/components/ui/luxury-animated-button";

const INQUIRY_TYPES = [
  "General Inquiry",
  "Bespoke Creations",
  "Wholesale & Retail",
  "Press & Media",
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);
  const [message, setMessage] = useState("");
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!message.trim()) {
      setErrorMessage("Please enter your message.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, inquiryType, message }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Failed to post message:", err);
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader />

      {/* Cinematic Header Cover Banner */}
      <div className="w-full h-[250px] sm:h-[320px] md:h-[400px] relative overflow-hidden mt-[76px] md:mt-[96px] z-10 shadow-lg page-fade-in">
        <img
          src="/Assets/contact_cinematic_banner.jpg"
          alt="Cinematic Perfume Bottle Banner"
          className="w-full h-full object-cover filter contrast-[0.98] brightness-[1.02] animate-cinematic-zoom"
        />
        {/* Soft top gradient to blend with the header and bottom gradient to blend with page theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1916]/50 via-transparent to-[#fec6a1]"></div>
      </div>

      <main className={`inner-page page-fade-in pb-20 px-4 md:px-8 max-w-[1200px] mx-auto z-10 relative pt-12 md:pt-16 ${mounted ? "active" : ""}`}>
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start mt-8">
          
          {/* Editorial Info Panel (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left reveal-frame lg:sticky lg:top-32">
            <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-4 font-body">
              Dialogues
            </p>
            <h1 className="font-display text-4xl sm:text-5xl mb-6 leading-tight text-on-background">
              Reach the Essence
            </h1>
            <div className="gold-divider !mx-0 mb-8 max-w-[200px]"></div>
            
            <p className="lead mb-8 text-[#3A2418]/90 font-light italic leading-relaxed text-[15px]">
              Every creation begins as a whisper, a story shared. We invite your thoughts, enquiries, and expressions.
            </p>

            <div className="flex flex-col gap-6 font-body text-[12px] text-on-background/85 leading-relaxed tracking-wide">
              <div>
                <p className="uppercase text-[9px] tracking-[0.25em] text-secondary font-semibold mb-1">General Dialogues</p>
                <a href="mailto:customer-service@deuxsentique.com" className="hover:text-primary transition-colors text-[13px] font-medium tracking-[0.05em]">
                  customer-service@deuxsentique.com
                </a>
              </div>
              
              <div>
                <p className="uppercase text-[9px] tracking-[0.25em] text-secondary font-semibold mb-1">Bespoke Fragrance Consultation</p>
                <a href="mailto:bespoke@deuxsentique.com" className="hover:text-primary transition-colors text-[13px] font-medium tracking-[0.05em]">
                  bespoke@deuxsentique.com
                </a>
              </div>

              <div>
                <p className="uppercase text-[9px] tracking-[0.25em] text-secondary font-semibold mb-1">Press &amp; Wholesale Inquiries</p>
                <a href="mailto:wholesale@deuxsentique.com" className="hover:text-primary transition-colors text-[13px] font-medium tracking-[0.05em]">
                  wholesale@deuxsentique.com
                </a>
              </div>
            </div>

            {/* Subtle Decorative Flourish */}
            <div className="mt-12 opacity-40 hidden lg:block select-none">
              <svg viewBox="0 0 240 30" className="w-44" fill="none" stroke="#8C5832" strokeWidth="1.2" strokeLinecap="round">
                <path d="M 10 15 H 85 C 105 15 100 4 85 7 C 72 10 77 24 98 20 C 112 17 116 12 120 15 C 124 12 128 17 142 20 C 163 24 168 10 155 7 C 140 4 135 15 155 15 H 230" />
              </svg>
            </div>
          </div>

          {/* Fully Interactive Contact Form Panel (Right) */}
          <div className="lg:col-span-7 w-full flex justify-center">
            <div className="glass-editorial-panel w-full max-w-[620px] p-8 md:p-12 reveal-frame relative z-20 overflow-visible">
              
              {!submitted ? (
                mounted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full" id="contact-form" noValidate>
                    
                    {/* Error message card */}
                    {errorMessage && (
                      <div className="bg-[#E53E3E]/10 border border-[#E53E3E]/40 text-[#C53030] text-[11px] uppercase tracking-[0.2em] py-3.5 px-4 rounded-xl font-body text-center animate-fadeIn">
                        {errorMessage}
                      </div>
                    )}

                    {/* Name Input */}
                    <div className="flex flex-col gap-2 relative">
                      <label htmlFor="name" className="text-[10px] uppercase tracking-[0.3em] text-[#8C5832] font-semibold">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="ENTER YOUR FULL NAME"
                        className="w-full bg-transparent border-b border-[#C4913A]/30 focus:border-[#C4913A] pb-3 pt-2 text-[#2D1F1D] text-[12px] sm:text-[13px] tracking-[0.2em] placeholder:text-[#4A3B32]/40 transition-all duration-300 focus:outline-none font-display font-medium uppercase"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-2 relative">
                      <label htmlFor="email" className="text-[10px] uppercase tracking-[0.3em] text-[#8C5832] font-semibold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ENTER YOUR EMAIL ADDRESS"
                        className="w-full bg-transparent border-b border-[#C4913A]/30 focus:border-[#C4913A] pb-3 pt-2 text-[#2D1F1D] text-[12px] sm:text-[13px] tracking-[0.2em] placeholder:text-[#4A3B32]/40 transition-all duration-300 focus:outline-none font-display font-medium uppercase"
                      />
                    </div>

                    {/* Custom Luxury Inquiry Dropdown Selector */}
                    <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
                      <label className="text-[10px] uppercase tracking-[0.3em] text-[#8C5832] font-semibold">
                        Inquiry Nature
                      </label>
                      
                      {/* Trigger Button */}
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-transparent border-b border-[#C4913A]/30 focus:border-[#C4913A] pb-3 pt-2 text-left text-[#2D1F1D] text-[12px] sm:text-[13px] tracking-[0.2em] uppercase transition-all duration-300 focus:outline-none flex justify-between items-center cursor-pointer select-none font-display font-medium"
                      >
                        <span>{inquiryType}</span>
                        <svg
                          className={`w-3.5 h-3.5 text-[#C4913A] transition-transform duration-500 ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>

                      {/* Dropdown Options List Overlay */}
                      {isDropdownOpen && (
                        <div className="absolute left-0 right-0 top-full mt-2 bg-[#EADBBF] border border-[#C4913A]/45 rounded-2xl shadow-xl overflow-hidden z-[999] transition-all duration-300 animate-fadeIn">
                          <div className="py-1 flex flex-col">
                            {INQUIRY_TYPES.map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => {
                                  setInquiryType(type);
                                  setIsDropdownOpen(false);
                                }}
                                className={`w-full text-left px-6 py-3.5 text-[11px] sm:text-[12px] uppercase tracking-[0.2em] transition-colors cursor-pointer font-display font-medium ${
                                  inquiryType === type
                                    ? "bg-[#C4913A] text-[#FAF4EA]"
                                    : "text-[#3A2418] hover:bg-[#C4913A]/10 hover:text-primary"
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Message Textarea */}
                    <div className="flex flex-col gap-2 relative">
                      <label htmlFor="message" className="text-[10px] uppercase tracking-[0.3em] text-[#8C5832] font-semibold">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="EXPRESS YOUR THOUGHTS OR ENQUIRIES"
                        className="w-full bg-transparent border-b border-[#C4913A]/30 focus:border-[#C4913A] pb-3 pt-2 text-[#2D1F1D] text-[12px] sm:text-[13px] tracking-[0.2em] placeholder:text-[#4A3B32]/40 transition-all duration-300 focus:outline-none font-display font-medium uppercase resize-none leading-relaxed"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-6">
                      <LuxuryAnimatedButton
                        type="submit"
                        label={isSubmitting ? "Sealing Message..." : "Send Message"}
                        disabled={isSubmitting}
                      />
                    </div>
                  </form>
                ) : (
                  <div className="h-64 flex items-center justify-center">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-on-background/25">Loading dialogue form...</span>
                  </div>
                )
              ) : (
                /* Success Parchment Scroll State */
                <div className="w-full bg-[#EADBBF]/95 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center text-center border border-[#8C5832] transition-all duration-1000 animate-fadeIn" id="contact-success">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#8C5832] mb-5 text-[#8C5832] bg-[#8C5832]/10 shadow-[0_2px_8px_rgba(140,88,50,0.1)] animate-pulse">
                    <span className="text-lg">✓</span>
                  </div>
                  <h3 className="text-[#8C5832] text-[12px] sm:text-[13px] uppercase tracking-[0.55em] mb-3 font-display font-semibold">
                    Message Sealed &amp; Sent
                  </h3>
                  <p className="text-[#23150D] text-[13px] leading-relaxed font-body font-light italic max-w-sm">
                    Thank you, {name.split(" ")[0]}. Your message has been sealed and sent to our perfume house.<br /><br />
                    We will reflect on your request and connect with you shortly.
                  </p>
                </div>
              )}

            </div>
          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}
