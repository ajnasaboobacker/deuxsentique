import type { Metadata } from "next";
import { Bodoni_Moda, Work_Sans } from "next/font/google";
import "./globals.css";
import CursorEffect from "./components/cursor-effect";
import SmoothScroller from "./components/smooth-scroller";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni-moda",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deuxsentique | Two Souls. One Essence.",
  description: "An ultra-luxury niche storytelling fragrance house. Experience First Embrace, our inaugural creation.",
  keywords: ["Deuxsentique", "First Embrace", "luxury perfume", "niche fragrance", "extrait de parfum"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: "Deuxsentique",
    description: "An ultra-luxury niche storytelling fragrance house.",
    url: "https://deuxsentique.com",
    logo: "https://deuxsentique.com/Assets/Perfume%20Bottle%20Mockup%202.png",
    sameAs: [
      "https://www.instagram.com/deuxsentique/?hl=en",
      "https://www.tiktok.com/@deuxsentique?lang=en-GB",
      "https://www.facebook.com/Deuxsentique?locale=en_GB",
      "https://www.youtube.com/@Deuxsentique"
    ]
  };

  return (
    <html lang="en" className={`dark scroll-smooth ${bodoniModa.variable} ${workSans.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-on-background font-body antialiased">
        <SmoothScroller />
        {/* Visual depth layers — shared across all pages */}
        <div className="film-grain"></div>
        <div className="vignette"></div>
        <div className="ambient-glow"></div>
        <div className="ambient-glow-bottom"></div>

        {/* Custom cursor — shared across all pages */}
        <CursorEffect />

        {/* Brand watermarks */}
        <div className="brand-watermark-left">Two Souls. One Essence.</div>
        <div className="brand-watermark-right">Deuxsentique Storytelling Perfume House</div>

        {children}
      </body>
    </html>
  );
}
