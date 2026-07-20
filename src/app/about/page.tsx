import type { Metadata } from "next";
import { PageHeader, Footer } from "../components/shared";
import ScrollReveal from "../components/scroll-reveal";

export const metadata: Metadata = {
  title: "Our Story | Deuxsentique",
  description: "Two souls. One essence. The story of Resten and Jiji — how a love story became a fragrance house built on real emotion, memory, and craft.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader />

      <main className="inner-page page-fade-in">
        <ScrollReveal />
        {/* Hero */}
        <section className="text-center" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
          <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-6 font-body animate-hero-subtitle">
            Our Story
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-on-background animate-hero-title">
            Two people who dared<br />to listen.
          </h1>
          <div className="gold-divider animate-hero-divider"></div>
          <p className="lead max-w-2xl mx-auto animate-hero-desc">
            Deuxsentique was not born from a business plan. It was born from a conversation between two people who believed that the most powerful stories are the ones we carry on our skin.
          </p>
        </section>

        {/* Origin */}
        <section className="!max-w-[1200px] mx-auto my-16 md:my-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-6 flex flex-col justify-center text-left">
              <h2 className="!mt-0">The Beginning</h2>
              <p>
                It began with handwritten notes, the scent of books and fabrics, and quiet mornings together. Two kindred spirits — a storyteller and a chemist — started gifting perfumes to each other. Testing fragrances on skin. Waiting for the drydown. Breathing in the lingering trace on each other&apos;s necks.
              </p>
              <p>
                These small, intimate rituals became the brand&apos;s first lesson: perfume is not just worn — it is experienced, remembered, and shared.
              </p>
              <p>
                From this, Deuxsentique was born: two creators, one shared essence.
              </p>
            </div>
            <div className="md:col-span-6 flex justify-end mix-blend-multiply scroll-reveal-container">
              <div className="cinematic-frame w-full max-w-[480px] animate-float-slow">
                <img
                  src="/about_beginning.png"
                  alt="The Beginning of Deuxsentique"
                  className="w-full h-auto object-contain max-h-[60vh] blend-painting"
                />
              </div>
            </div>
          </div>
        </section>

        {/* The Founders */}
        <section className="!max-w-[1200px] mx-auto my-16 md:my-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-7 flex flex-col justify-center text-left order-2 md:order-1">
              <h2 className="!mt-0">The Founders</h2>
              <div className="values-grid">
                <div className="value-card">
                  <h3>Resten</h3>
                  <p>
                    A storyteller with a gift for turning life into narrative. A dreamer with structured vision. He sees the invisible threads connecting past and present, and weaves them into brand, philosophy, and legacy.
                  </p>
                </div>
                <div className="value-card">
                  <h3>Jiji</h3>
                  <p>
                    A chemist with deep knowledge of molecules and memory, able to turn science into soul. She understands the invisible bonds between scent and emotion, bringing technical mastery into harmony with feeling.
                  </p>
                </div>
              </div>
              <p style={{ marginTop: "2rem" }}>
                Where chemistry meets soul: Jiji ensures precision, safety, and authenticity. Resten shapes each perfume as a living story — a bottle of memory. Together they create fragrances that are technically balanced and emotionally profound.
              </p>
            </div>
            <div className="md:col-span-5 flex justify-center mix-blend-multiply order-1 md:order-2 scroll-reveal-container">
              <div className="cinematic-frame w-full max-w-[380px] animate-float-slower">
                <img
                  src="/about_founders.png"
                  alt="Resten and Jiji"
                  className="w-full h-auto object-contain max-h-[60vh] blend-painting"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="!max-w-[1200px] mx-auto my-16 md:my-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-6 flex justify-start mix-blend-multiply scroll-reveal-container">
              <div className="cinematic-frame w-full max-w-[480px] animate-float-fast">
                <img
                  src="/about_philosophy.png"
                  alt="Our Philosophy"
                  className="w-full h-auto object-contain max-h-[60vh] blend-painting"
                />
              </div>
            </div>
            <div className="md:col-span-6 flex flex-col justify-center text-left">
              <h2 className="!mt-0">Our Philosophy</h2>
              <p className="text-primary font-display text-xl md:text-2xl tracking-wide mb-6" style={{ lineHeight: 1.4 }}>
                Story → Emotion → Notes → Perfume.
              </p>
              <p>
                Every Deuxsentique fragrance begins with a real, lived experience. Not a marketing brief, not a trend forecast — a genuine moment from the lives of its founders. That moment is distilled into its core emotion. The emotion guides the selection of notes. The notes become perfume.
              </p>
              <p>
                This is the method. This is the promise. Every bottle carries a truth.
              </p>
            </div>
          </div>
        </section>

        {/* Cultural DNA */}
        <section className="!max-w-[1200px] mx-auto my-16 md:my-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-7 flex flex-col justify-center text-left order-2 md:order-1">
              <h2 className="!mt-0">Cultural DNA</h2>
              <p>
                Founded in the United Kingdom, drawing poetic influence from French perfumery and culture. French elegance — timeless, romantic, poetic — balanced with British minimalism — refined, clean, honest. Modern and timeless, emotional and precise at once.
              </p>
              <p className="lead !mb-0">
                &ldquo;Deuxsentique is not built to compete. It is built to endure.&rdquo;
              </p>
            </div>
            <div className="md:col-span-5 flex justify-center mix-blend-multiply order-1 md:order-2 scroll-reveal-container">
              <div className="cinematic-frame w-full max-w-[380px] animate-float-slow">
                <img
                  src="/about_dna.png"
                  alt="Cultural DNA"
                  className="w-full h-auto object-contain max-h-[60vh] blend-painting"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="!max-w-[1200px] mx-auto my-16 md:my-24">
          <h2 style={{ textAlign: "center", marginBottom: "3rem" }}>What We Stand For</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Emotion First</h3>
              <p>Every perfume begins with a lived story. Authenticity is the foundation.</p>
            </div>
            <div className="value-card">
              <h3>Quietly Luxurious</h3>
              <p>Small-batch, hand-finished creations reflecting detail, integrity, and soulful refinement.</p>
            </div>
            <div className="value-card">
              <h3>Authentic Connection</h3>
              <p>Perfumes that whisper rather than shout, designed to touch the soul, not follow trends.</p>
            </div>
            <div className="value-card">
              <h3>Ethical Elegance</h3>
              <p>Cruelty-free, vegan-conscious, with responsible sourcing at the heart of the craft.</p>
            </div>
            <div className="value-card">
              <h3>Legacy of Storytelling</h3>
              <p>Building a house of memories, a legacy of emotion preserved in scent.</p>
            </div>
            <div className="value-card">
              <h3>Inclusive &amp; Unisex</h3>
              <p>Every fragrance crafted for all souls, beyond gender, beyond borders.</p>
            </div>
          </div>
        </section>

        {/* Craft */}
        <section className="!max-w-[1200px] mx-auto my-16 md:my-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-6 flex justify-start mix-blend-multiply scroll-reveal-container">
              <div className="cinematic-frame w-full max-w-[480px] animate-float-slower">
                <img
                  src="/about_craft.png"
                  alt="The Craft"
                  className="w-full h-auto object-contain max-h-[60vh] blend-painting"
                />
              </div>
            </div>
            <div className="md:col-span-6 flex flex-col justify-center text-left">
              <h2 className="!mt-0">The Craft</h2>
              <p>
                Principle over scale, craft over convenience. Hand-poured, hand-assembled, finished with care, produced in carefully controlled small batches. Even when collaborating with international artisans, every bottle is inspected, perfected, and treated as an individual piece of art.
              </p>
              <p>
                What perfume means here: not a product, but emotion made wearable — a memory made physical, a feeling of love, intimacy, and connection preserved in liquid form.
              </p>
            </div>
          </div>
          <div className="gold-divider"></div>
          <p className="lead" style={{ textAlign: "center" }}>
            Emotion over fashion. Craftsmanship over mass production.<br />
            Connection over slogans. Quiet luxury over noise.
          </p>
        </section>

        <div style={{ height: "4rem" }}></div>
      </main>

      <Footer />
    </>
  );
}
