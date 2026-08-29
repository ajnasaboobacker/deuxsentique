import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Footer } from "../components/shared";
import ScrollReveal from "../components/scroll-reveal";

export const metadata: Metadata = {
  title: "Our Story | Deuxsentique",
  description: "Two souls. One essence. The story of Resten and Jiji — how an experience became a fragrance house built on real emotion, memory, and craft.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader />

      {/* Cinematic Header Cover Banner */}
      <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] relative overflow-hidden mt-[76px] md:mt-[96px] z-10 shadow-lg page-fade-in">
        <img
          src="/Assets/about_cinematic_banner.jpg"
          alt="Our Story Cinematic Banner"
          className="w-full h-full object-cover filter contrast-[0.98] brightness-[1.02] animate-cinematic-zoom"
        />
        {/* Soft top gradient to blend with the header and bottom gradient to blend with page theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1916]/50 via-transparent to-[#fec6a1]"></div>
      </div>

      <main className="inner-page page-fade-in active">
        <ScrollReveal />

        {/* Hero Section */}
        <section className="text-center pt-12 pb-16 md:pt-16 md:pb-24 max-w-[1200px] mx-auto px-4">
          <div className="flex justify-center mb-6 reveal-frame">
            <img
              src="/Assets/logo/ICON blk trnsprnt.png"
              alt="Deuxsentique Logo"
              className="h-20 md:h-28 w-auto object-contain hero-logo-float drop-shadow-[0_0_15px_rgba(196,145,58,0.35)]"
            />
          </div>
          <p className="text-secondary text-[10px] uppercase tracking-[0.6em] mb-6 font-body animate-hero-subtitle">
            Our Story
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-on-background animate-hero-title">
            Two people who dared<br />to listen.
          </h1>
          <div className="gold-divider animate-hero-divider mb-8"></div>
          <p className="lead max-w-2xl mx-auto animate-hero-desc">
            Deuxsentique was not born from a business plan. It began with one unforgettable experience that grew into a shared vision—to create fragrances that preserve emotion, memory, and the stories we carry with us.
          </p>
        </section>

        <div className="gold-divider max-w-[800px] mx-auto my-16 opacity-60"></div>

        {/* Chapter I: A Scent That Stayed */}
        <section className="!max-w-[1200px] mx-auto my-28 md:my-44 px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-6 flex flex-col justify-center text-left">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs font-bold text-primary/70 bg-primary/10 px-2.5 py-1 rounded-md tracking-wider">
                  CHAPTER I
                </span>
              </div>
              <h2 className="!mt-0 mb-6 font-display text-3xl md:text-4xl">A Scent That Stayed</h2>
              <p className="mb-4 text-on-background/85 leading-relaxed font-body">
                Perfume was never part of everyday life. It belonged to special occasions, carefully kept away until the moment felt right, making every spray feel rare and meaningful.
              </p>
              <p className="mb-4 text-on-background/85 leading-relaxed font-body">
                Years later, fragrance found its way back through a simple gift, followed by an experience that quietly changed everything. A scent card, tucked inside a purse, continued to carry its fragrance long after the moment had passed. Every time it was opened, the scent returned with it—a feeling, a memory, and a reminder that some moments never truly leave us.
              </p>
              <p className="text-on-background/85 leading-relaxed font-body">
                It was this quiet experience that planted the very first seed of what would one day become Deuxsentique.
              </p>
            </div>
            <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center scroll-reveal-container">
              <div className="cinematic-frame animate-float-slow">
                <img
                  src="/about_philosophy.png"
                  alt="A Scent That Stayed Vintage Painting"
                  className="w-full h-auto object-contain max-h-[50vh] blend-painting"
                />
              </div>
              <div className="cinematic-frame animate-float-slower">
                <img
                  src="/chapters/art_ch01_scent_stayed.png"
                  alt="A Scent That Stayed Gold Line-Art"
                  className="w-full h-auto object-contain max-h-[50vh] blend-painting"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="gold-divider max-w-[800px] mx-auto my-20 opacity-60"></div>

        {/* Chapter II: The Moment Everything Changed */}
        <section className="!max-w-[1200px] mx-auto my-28 md:my-44 px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-6 flex justify-center order-2 md:order-1 scroll-reveal-container">
              <div className="cinematic-frame w-full max-w-[420px] animate-float-slow">
                <img
                  src="/about_beginning.png"
                  alt="The Moment Everything Changed Vintage Painting"
                  className="w-full h-auto object-contain max-h-[50vh] blend-painting"
                />
              </div>
            </div>
            <div className="md:col-span-6 flex flex-col justify-center text-left order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs font-bold text-primary/70 bg-primary/10 px-2.5 py-1 rounded-md tracking-wider">
                  CHAPTER II
                </span>
              </div>
              <h2 className="!mt-0 mb-6 font-display text-3xl md:text-4xl">The Moment Everything Changed</h2>
              <p className="mb-4 text-on-background/85 leading-relaxed font-body">
                Wearing fragrance gradually became more than a daily ritual. It quietly changed the way life was experienced. There was a growing sense of confidence, conversations felt more natural, and everyday moments carried a little more presence. It wasn&apos;t the fragrance itself that created those changes, but the feeling it awakened from within.
              </p>
              <p className="italic font-display text-lg text-primary my-3">
                That experience led to a simple yet powerful question:
              </p>
              <div className="border-l-2 border-primary/50 pl-5 my-4 bg-primary/5 py-4 pr-4 rounded-r-lg">
                <p className="font-display text-xl leading-relaxed text-on-background">
                  &ldquo;What if a fragrance could do more than simply smell beautiful? What if it could remind someone of their confidence, reconnect them with a meaningful memory, or become part of their own story?&rdquo;
                </p>
              </div>
              <p className="mt-2 text-on-background/85 leading-relaxed font-body">
                That single question became the foundation of what would one day become Deuxsentique.
              </p>
            </div>
          </div>
        </section>

        <div className="gold-divider max-w-[800px] mx-auto my-20 opacity-60"></div>

        {/* Chapter III: Two Souls. One Essence. */}
        <section className="!max-w-[1200px] mx-auto my-28 md:my-44 px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex justify-center mb-4">
              <span className="font-mono text-xs font-bold text-primary/70 bg-primary/10 px-2.5 py-1 rounded-md tracking-wider">
                CHAPTER III
              </span>
            </div>
            <h2 className="mb-6 font-display text-3xl md:text-4xl">Two Souls. One Essence.</h2>
            <p className="text-on-background/85 leading-relaxed text-lg font-body">
              Every meaningful creation begins with balance. Story and science. Emotion and precision. Creativity and craftsmanship. What began as one unforgettable experience soon became a shared vision, bringing together two different strengths with one common purpose—to create fragrances that preserve emotion, memory and human connection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center my-12">
            <div className="md:col-span-5 flex justify-center scroll-reveal-container">
              <div className="cinematic-frame w-full max-w-[420px] animate-float-slow">
                <img
                  src="/about_founders.png"
                  alt="Resten & Jiji Founders Vintage Painting"
                  className="w-full h-auto object-contain max-h-[60vh] blend-painting"
                />
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col justify-center">
              <div className="values-grid gap-6">
                <div className="border-t border-primary/20 py-6 px-4 sm:px-6 relative text-left hover:bg-primary/[0.02] transition-colors rounded-xl">
                  <h3 className="font-display text-xl text-primary mb-2">Resten</h3>
                  <p className="text-sm text-on-background/80 leading-relaxed font-body">
                    A storyteller with a passion for transforming real experiences into meaningful narratives. Guided by creativity, vision and thoughtful direction, he believes every memorable moment deserves to be preserved, shaping each fragrance with purpose before it is brought to life.
                  </p>
                </div>
                <div className="border-t border-primary/20 py-6 px-4 sm:px-6 relative text-left hover:bg-primary/[0.02] transition-colors rounded-xl">
                  <h3 className="font-display text-xl text-primary mb-2">Jiji</h3>
                  <p className="text-sm text-on-background/80 leading-relaxed font-body">
                    A chemist with a deep understanding of ingredients, quality and precision. She combines scientific knowledge with thoughtful craftsmanship, ensuring every fragrance is developed with care while remaining true to the emotion behind each story.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center my-12">
            <div className="md:col-span-7 flex flex-col justify-center text-left order-2 md:order-1">
              <h3 className="font-display text-2xl text-primary mb-4">One Essence</h3>
              <p className="text-on-background/85 leading-relaxed text-base md:text-lg font-body">
                Together, they bring story and science into harmony, transforming real human experiences into fragrances that are not only worn, but felt, remembered and shared. Every creation reflects their shared belief that perfume can preserve emotion, strengthen human connection, and become part of the stories people carry with them long after the moment has passed.
              </p>
            </div>
            <div className="md:col-span-5 flex justify-center order-1 md:order-2 scroll-reveal-container">
              <div className="cinematic-frame w-full max-w-[380px] animate-float-slower">
                <img
                  src="/chapters/art_ch03_two_souls.png"
                  alt="Two Souls Gold Line-Art"
                  className="w-full h-auto object-contain max-h-[50vh] blend-painting"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="gold-divider max-w-[800px] mx-auto my-20 opacity-60"></div>

        {/* Chapter IV: From Story to Scent */}
        <section className="!max-w-[1200px] mx-auto my-28 md:my-44 px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex justify-center mb-4">
              <span className="font-mono text-xs font-bold text-primary/70 bg-primary/10 px-2.5 py-1 rounded-md tracking-wider">
                CHAPTER IV
              </span>
            </div>
            <h2 className="mb-4 font-display text-3xl md:text-4xl">From Story to Scent</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center my-10">
            <div className="border-t border-primary/20 py-6 px-4 flex flex-col justify-between relative hover:bg-primary/[0.02] transition-colors rounded-xl">
              <div>
                <h3 className="text-primary font-display text-lg mb-3">1. Story</h3>
                <p className="text-[13px] text-on-background/80 leading-relaxed font-body">Every fragrance begins with a real human story—a memory, a relationship, or a meaningful moment that deserves to be remembered.</p>
              </div>
            </div>
            <div className="border-t border-primary/20 py-6 px-4 flex flex-col justify-between relative hover:bg-primary/[0.02] transition-colors rounded-xl">
              <div>
                <h3 className="text-primary font-display text-lg mb-3">2. Emotion</h3>
                <p className="text-[13px] text-on-background/80 leading-relaxed font-body">Every story holds a feeling. Before creating a fragrance, we take time to understand the emotions that gave the moment its meaning.</p>
              </div>
            </div>
            <div className="border-t border-primary/20 py-6 px-4 flex flex-col justify-between relative hover:bg-primary/[0.02] transition-colors rounded-xl">
              <div>
                <h3 className="text-primary font-display text-lg mb-3">3. Notes</h3>
                <p className="text-[13px] text-on-background/80 leading-relaxed font-body">Those emotions are carefully translated into fragrance notes, with each note chosen to express a feeling, a memory, or a moment.</p>
              </div>
            </div>
            <div className="border-t border-primary/20 py-6 px-4 flex flex-col justify-between relative hover:bg-primary/[0.02] transition-colors rounded-xl">
              <div>
                <h3 className="text-primary font-display text-lg mb-3">4. Scent</h3>
                <p className="text-[13px] text-on-background/80 leading-relaxed font-body">The notes are brought together to create a fragrance that captures the emotional essence of the original story, allowing it to be experienced through scent.</p>
              </div>
            </div>
            <div className="border-t border-primary/20 py-6 px-4 flex flex-col justify-between relative hover:bg-primary/[0.02] transition-colors rounded-xl">
              <div>
                <h3 className="text-primary font-display text-lg mb-3">5. Memory</h3>
                <p className="text-[13px] text-on-background/80 leading-relaxed font-body">With time, the fragrance becomes part of the wearer&apos;s own journey, creating new memories while quietly preserving the old.</p>
              </div>
            </div>
          </div>

          <p className="text-center max-w-3xl mx-auto text-on-background/85 leading-relaxed font-body mt-8">
            Every Deuxsentique fragrance follows the same creative journey. It begins with a real story, unfolds through emotion, is expressed through carefully chosen notes, and comes to life as a fragrance. As it becomes part of the wearer&apos;s own experiences, the story continues—creating new memories while honouring the ones that inspired it.
          </p>
        </section>

        <div className="gold-divider max-w-[800px] mx-auto my-20 opacity-60"></div>

        {/* Chapter V: Quiet Luxury */}
        <section className="!max-w-[1200px] mx-auto my-28 md:my-44 px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-6 flex justify-center scroll-reveal-container">
              <div className="cinematic-frame w-full max-w-[420px] animate-float-slow">
                <img
                  src="/about_dna.png"
                  alt="Quiet Luxury Perfume Bottle Vintage Painting"
                  className="w-full h-auto object-contain max-h-[50vh] blend-painting"
                />
              </div>
            </div>
            <div className="md:col-span-6 flex flex-col justify-center text-left">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs font-bold text-primary/70 bg-primary/10 px-2.5 py-1 rounded-md tracking-wider">
                  CHAPTER V
                </span>
              </div>
              <h2 className="!mt-0 mb-4 font-display text-3xl md:text-4xl">Quiet Luxury</h2>
              <p className="text-primary font-display text-xl tracking-wide mb-6">
                &ldquo;Designed to stay close.&rdquo;
              </p>
              <p className="mb-4 text-on-background/85 leading-relaxed font-body">
                To us, luxury is not defined by being seen, but by the meaning it carries. It is found in the details, the emotions we hold, and the moments that quietly stay with us.
              </p>
              <p className="mb-6 text-on-background/85 leading-relaxed font-body">
                Our fragrances are created to remain close to the wearer, revealing themselves naturally through meaningful moments rather than asking to be noticed. They become part of a conversation, a quiet embrace, a shared smile, or a memory that lingers long after the moment has passed.
              </p>
              <div className="border-l-2 border-primary/50 pl-6 my-4 bg-primary/5 py-4 pr-4 rounded-r-lg">
                <p className="font-display text-2xl md:text-3xl text-on-background leading-snug">
                  Because true luxury isn&apos;t about being noticed.<br />
                  <span className="text-primary italic">It&apos;s about being remembered.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="gold-divider max-w-[800px] mx-auto my-20 opacity-60"></div>

        {/* Chapter VI: What We Stand For */}
        <section className="!max-w-[1200px] mx-auto my-28 md:my-44 px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center mb-4">
              <span className="font-mono text-xs font-bold text-primary/70 bg-primary/10 px-2.5 py-1 rounded-md tracking-wider">
                CHAPTER VI
              </span>
            </div>
            <h2 className="mb-4 font-display text-3xl md:text-4xl">What We Stand For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-12">
            <div className="md:col-span-7">
              <div className="values-grid gap-6 md:gap-8">
                <div className="border-t border-primary/20 py-6 px-4 sm:px-6 relative hover:bg-primary/[0.02] transition-colors rounded-xl">
                  <h3 className="font-display text-xl text-primary mb-3">Emotion First</h3>
                  <p className="text-sm text-on-background/80 leading-relaxed font-body">Every fragrance begins with a feeling before it becomes a scent. We believe emotion gives every story its meaning and every fragrance its soul.</p>
                </div>
                <div className="border-t border-primary/20 py-6 px-4 sm:px-6 relative hover:bg-primary/[0.02] transition-colors rounded-xl">
                  <h3 className="font-display text-xl text-primary mb-3">Authenticity</h3>
                  <p className="text-sm text-on-background/80 leading-relaxed font-body">We create from real human experiences, never from trends or imitation. Every creation is rooted in genuine moments, allowing each fragrance to tell a story that is honest and timeless.</p>
                </div>
                <div className="border-t border-primary/20 py-6 px-4 sm:px-6 relative hover:bg-primary/[0.02] transition-colors rounded-xl">
                  <h3 className="font-display text-xl text-primary mb-3">Craftsmanship</h3>
                  <p className="text-sm text-on-background/80 leading-relaxed font-body">Every detail is shaped with patience, precision and care. From the first idea to the final bottle, we believe true quality is found in thoughtful craftsmanship.</p>
                </div>
                <div className="border-t border-primary/20 py-6 px-4 sm:px-6 relative hover:bg-primary/[0.02] transition-colors rounded-xl">
                  <h3 className="font-display text-xl text-primary mb-3">Connection</h3>
                  <p className="text-sm text-on-background/80 leading-relaxed font-body">Our fragrances are created to bring people closer—to memories, emotions and one another. We hope every fragrance becomes a quiet reminder of the people, places and moments that matter most.</p>
                </div>
                <div className="border-t border-primary/20 py-6 px-4 sm:px-6 relative hover:bg-primary/[0.02] transition-colors rounded-xl">
                  <h3 className="font-display text-xl text-primary mb-3">Quiet Luxury</h3>
                  <p className="text-sm text-on-background/80 leading-relaxed font-body">We believe true luxury is found in intention, meaning and timeless craftsmanship, never in excess. Our creations are designed to be discovered naturally, leaving a lasting impression through emotion rather than volume.</p>
                </div>
                <div className="border-t border-primary/20 py-6 px-4 sm:px-6 relative hover:bg-primary/[0.02] transition-colors rounded-xl">
                  <h3 className="font-display text-xl text-primary mb-3">Timelessness</h3>
                  <p className="text-sm text-on-background/80 leading-relaxed font-body">We create fragrances designed to remain meaningful long after the moment has passed. Our goal is to create fragrances that can be treasured today, remembered tomorrow, and passed through generations.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col gap-6 justify-center scroll-reveal-container">
              <div className="cinematic-frame w-full max-w-[420px] animate-float-slow mx-auto">
                <img
                  src="/chapters/ch10_painting.png"
                  alt="What We Stand For Vintage Painting"
                  className="w-full h-auto object-contain max-h-[45vh] blend-painting"
                />
              </div>
              <div className="cinematic-frame w-full max-w-[420px] animate-float-slower mx-auto">
                <img
                  src="/chapters/art_ch06_what_we_stand_for.png"
                  alt="What We Stand For Crest Gold Line-Art"
                  className="w-full h-auto object-contain max-h-[45vh] blend-painting"
                />
              </div>
            </div>
          </div>

          <p className="text-center max-w-2xl mx-auto mt-14 text-on-background/80 font-display italic text-lg md:text-xl">
            These beliefs guide every decision we make, every story we choose to tell, and every fragrance we bring to life.
          </p>
        </section>

        <div className="gold-divider max-w-[800px] mx-auto my-20 opacity-60"></div>

        {/* Chapter VII: Crafted With Intention */}
        <section className="!max-w-[1200px] mx-auto my-28 md:my-44 px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-6 flex justify-center scroll-reveal-container">
              <div className="cinematic-frame w-full max-w-[420px] animate-float-slow">
                <img
                  src="/about_craft.png"
                  alt="Crafted With Intention Perfume Crafting Vintage Painting"
                  className="w-full h-auto object-contain max-h-[50vh] blend-painting"
                />
              </div>
            </div>
            <div className="md:col-span-6 flex flex-col justify-center text-left">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs font-bold text-primary/70 bg-primary/10 px-2.5 py-1 rounded-md tracking-wider">
                  CHAPTER VII
                </span>
              </div>
              <h2 className="!mt-0 mb-6 font-display text-3xl md:text-4xl">Crafted With Intention</h2>
              <p className="mb-4 text-on-background/85 leading-relaxed font-body">
                What began as an emotional idea soon became a responsibility. As our understanding of perfumery grew, we realised that creating a meaningful fragrance required far more than inspiration alone. It called for knowledge, precision, patience and genuine care.
              </p>
              <p className="mb-6 text-on-background/85 leading-relaxed font-body">
                Rather than taking shortcuts, we chose to build Deuxsentique the right way—working with experienced specialists and giving every detail the attention it deserves. From fragrance development and quality to the finishing touches of every bottle, each decision is made with intention and respect for the stories we are privileged to tell.
              </p>
              <div className="border-l-2 border-primary/50 pl-5 my-4 bg-primary/5 py-4 pr-4 rounded-r-lg">
                <p className="font-display text-lg md:text-xl text-on-background">
                  Because every story deserves true craftsmanship.<br />
                  <span className="text-primary italic">And every person who wears our fragrance deserves the same care with which it was created.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="gold-divider max-w-[800px] mx-auto my-20 opacity-60"></div>

        {/* Chapter VIII: The Journey Continues */}
        <section className="!max-w-[1000px] mx-auto my-28 md:my-44 text-center px-4">
          <div className="flex justify-center mb-4">
            <span className="font-mono text-xs font-bold text-primary/70 bg-primary/10 px-2.5 py-1 rounded-md tracking-wider">
              CHAPTER VIII
            </span>
          </div>
          <h2 className="mb-8 font-display text-3xl md:text-4xl">The Journey Continues</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center items-center mb-10 max-w-[800px] mx-auto scroll-reveal-container">
            <div className="cinematic-frame animate-float-slow">
              <img
                src="/chapters/ch09_painting.png"
                alt="Open Storybook Vintage Painting"
                className="w-full h-auto object-contain max-h-[45vh] blend-painting"
              />
            </div>
            <div className="cinematic-frame animate-float-slower">
              <img
                src="/chapters/art_ch08_journey_continues.png"
                alt="The Journey Continues Gold Line-Art"
                className="w-full h-auto object-contain max-h-[45vh] blend-painting"
              />
            </div>
          </div>

          <div className="max-w-xl mx-auto space-y-5 text-on-background/85 text-lg md:text-xl font-display leading-relaxed">
            <p>Every story begins somewhere.</p>
            <p className="text-primary font-medium">Ours began with a scent that stayed.</p>
            <p>Today, that journey continues through every fragrance we create—carrying emotion, memory and human connection into every new chapter.</p>
            <p className="pt-6 text-2xl md:text-3xl text-on-background italic">
              The next chapter is no longer ours alone.<br />
              <span className="text-primary font-normal font-display">It&apos;s waiting to become part of yours.</span>
            </p>
          </div>

          <div className="gold-divider my-12"></div>

          <Link
            href="/first-embrace"
            className="group relative overflow-hidden inline-flex items-center justify-center font-body text-[11px] uppercase tracking-[0.35em] border border-primary text-primary px-10 py-4 transition-all duration-500 hover:bg-primary hover:text-[#1A1916] hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Discover the Founding Edition</span>
          </Link>
        </section>

        <div style={{ height: "4rem" }}></div>
      </main>

      <Footer />
    </>
  );
}
