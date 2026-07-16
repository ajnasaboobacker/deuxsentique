import type { Metadata } from "next";
import { Bodoni_Moda, Work_Sans } from "next/font/google";
import "./globals.css";
import CursorEffect from "./components/cursor-effect";

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
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${bodoniModa.variable} ${workSans.variable} bg-background text-on-background font-body antialiased`}>
        {/* Visual depth layers — shared across all pages */}
        <div className="film-grain"></div>
        <div className="vignette"></div>
        <div className="ambient-glow"></div>
        <div className="ambient-glow-bottom"></div>

        {/* Custom cursor — shared across all pages */}
        <CursorEffect />

        {/* Brand watermarks */}
        <div className="brand-watermark-left">Two Souls. One Essence.</div>
        <div className="brand-watermark-right">Deuxsentique House. London.</div>

        {children}
      </body>
    </html>
  );
}
