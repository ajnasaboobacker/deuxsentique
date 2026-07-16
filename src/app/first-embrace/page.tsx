"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader, Footer } from "../components/shared";

export default function FirstEmbracePage() {
  const [activeAccord, setActiveAccord] = useState<"top" | "heart" | "base">("top");

  return (
    <>
      <PageHeader />

      <main className="inner-page page-fade-in">
        {/* Hero */}
        <section>
          <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-6 font-body">
            The Founding Edition
          </p>
          <h1>
            First Embrace.
          </h1>
          <p className="lead" style={{ marginTop: "1.5rem" }}>
            Every story has a beginning. Every memory has a scent.
          </p>
          <div className="gold-divider"></div>
        </section>

        {/* The Story */}
        <section>
          <h2>The Story</h2>
          <p>
            Some stories change us forever.
          </p>
          <p>
            First Embrace was inspired by a real moment that marked the beginning of a meaningful connection. Rather than recreating a memory, this fragrance captures the emotions surrounding it — the anticipation before meeting, the warmth of closeness, the comfort of being understood, and the feeling that remains long after the moment has passed.
          </p>
          <p>
            At Deuxsentique, every fragrance begins with a real story. Through our signature creative philosophy:
          </p>
          <p className="text-primary font-display text-xl md:text-2xl tracking-wide" style={{ lineHeight: 1.4 }}>
            Story → Emotion → Notes → Perfume.
          </p>
          <p>
            Those emotions are transformed into a fragrance that allows others to create memories of their own.
          </p>
        </section>

        {/* The Fragrance */}
        <section>
          <h2>The Fragrance</h2>
          <p>
            First Embrace is an Extrait de Parfum, offering a rich and refined fragrance experience. Created to be intimate rather than overpowering, it unfolds gracefully on the skin, revealing layers of freshness, soft florals, and warm sensuality.
          </p>
          <p className="lead">
            Instead of filling a room, it invites discovery through closeness, making every encounter feel personal and meaningful.
          </p>
        </section>

        {/* Interactive Accord */}
        <section>
          <h2>Fragrance Notes</h2>
          <div className="accord-container" style={{ marginTop: "2rem" }}>
            <div
              className={`accord-item cursor-pointer ${activeAccord === "top" ? "active" : ""}`}
              onClick={() => setActiveAccord("top")}
            >
              <h3 className="accord-title">Top Notes</h3>
              <p className="accord-notes">Bergamot, Mandarin, Jasmine</p>
              <p className="accord-desc">
                A bright, fresh opening of sparkling citrus balanced with the soft,
                ethereal whisper of jasmine petals. The first impression — light, inviting, and alive.
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
                offset by the sweet freshness of lychee. The conversation deepens.
              </p>
            </div>

            <div
              className={`accord-item cursor-pointer ${activeAccord === "base" ? "active" : ""}`}
              onClick={() => setActiveAccord("base")}
            >
              <h3 className="accord-title">Base Notes</h3>
              <p className="accord-notes">Sandalwood, White Musk, Vanilla, Tonka Bean</p>
              <p className="accord-desc">
                A deep, warm finish of woody sandalwood, rich musk, and velvet tonka
                bean that lingers close on the skin. The memory that remains.
              </p>
            </div>
          </div>
        </section>

        {/* How to Wear */}
        <section>
          <h2>How to Wear</h2>
          <p>
            Spray onto pulse points — wrists, neck, behind the ears — from a short distance. Allow the fragrance to settle naturally onto the skin without rubbing, letting the scent evolve throughout the day.
          </p>
          <p className="lead">
            For a more personal experience, wear it close to the skin and allow the fragrance to become part of your own story.
          </p>
        </section>

        {/* Product Lineup */}
        <section>
          <h2>The Collection</h2>
          <p>
            The Founding Edition — our very first collection and the beginning of our journey. Created in limited quantities, it marks the first chapter of a house built on real stories, emotions, and memories.
          </p>

          <div className="product-grid">
            <div className="product-card">
              <h3>Discovery Kit</h3>
              <div className="format">2 × 5 ml · Extrait de Parfum</div>
              <p>
                One bottle for yourself, one for someone meaningful. The belief that stories are best experienced together.
              </p>
            </div>

            <div className="product-card">
              <h3>Roll-On</h3>
              <div className="format">10 ml · Perfume Oil</div>
              <p>
                A quiet luxury ritual, designed to stay close. Non-alcoholic perfume oil for everyday moments and travel.
              </p>
            </div>

            <div className="product-card">
              <h3>Extrait de Parfum</h3>
              <div className="format">30 ml · Signature</div>
              <p>
                The signature expression. A luxury glass bottle carrying the full depth of First Embrace.
              </p>
            </div>

            <div className="product-card">
              <h3>Extrait de Parfum</h3>
              <div className="format">100 ml · Collector</div>
              <p>
                The definitive expression. For those who have already made First Embrace their story.
              </p>
            </div>
          </div>
        </section>

        {/* The First Touch Gift Set */}
        <section>
          <h2>The First Touch</h2>
          <p className="text-secondary text-[10px] uppercase tracking-[0.3em] font-body mb-4">
            Gift Set · 5 ml EdP + 10 ml Roll-On
          </p>
          <p>
            The beginning of every meaningful connection starts with a first touch. This gift set brings together our 5 ml First Embrace Extrait de Parfum and 10 ml Roll-On Perfume Oil — two ways to experience the same story.
          </p>
          <p className="lead">
            Beautifully presented for gifting, travel, or personal discovery.
          </p>
        </section>

        {/* CTA */}
        <section style={{ textAlign: "center", paddingTop: "2rem", paddingBottom: "2rem" }}>
          <div className="gold-divider"></div>
          <p className="lead" style={{ marginBottom: "2rem" }}>
            A fragrance that belongs to you<br />before it belongs to the room.
          </p>
          <p className="text-on-background/40 text-[10px] uppercase tracking-[0.4em] mb-8">
            Two Souls. One Essence.
          </p>
          <Link
            href="/#chapter-11"
            className="inline-block font-body text-[10px] uppercase tracking-[0.4em] border border-primary/50 text-primary px-10 py-4 hover:bg-primary hover:text-background transition-all duration-700 hover:shadow-[0_0_15px_rgba(196,145,58,0.2)]"
          >
            Request Invitation
          </Link>
        </section>

        <div style={{ height: "4rem" }}></div>
      </main>

      <Footer />
    </>
  );
}
