"use client";

import { useEffect, useRef } from "react";

export default function CursorEffect() {
  const pointerRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run custom cursor on desktop pointer devices
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    document.documentElement.classList.add("hide-default-cursor");

    const mouse = { x: -100, y: -100 };
    const aura = { x: -100, y: -100 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (pointerRef.current) {
        pointerRef.current.style.left = `${mouse.x}px`;
        pointerRef.current.style.top = `${mouse.y}px`;
      }
    };

    let raf: number;
    const updateAura = () => {
      // Smooth fluid interpolation for the lingering fragrance aura
      aura.x += (mouse.x - aura.x) * 0.12;
      aura.y += (mouse.y - aura.y) * 0.12;

      if (auraRef.current) {
        auraRef.current.style.left = `${aura.x}px`;
        auraRef.current.style.top = `${aura.y}px`;
      }

      raf = requestAnimationFrame(updateAura);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer");

      const isDarkSection =
        !!target.closest("header") ||
        !!target.closest("footer") ||
        !!target.closest(".bg-surface") ||
        !!target.closest(".invite-card-animated") ||
        !!target.closest(".h-screen") ||
        !!target.closest("video") ||
        !!target.closest("[class*='bg-[#11100E]']") ||
        !!target.closest("[class*='bg-black']");

      document.body.classList.toggle("cursor-hover", !!isInteractive);
      document.body.classList.toggle("cursor-dark-bg", isDarkSection);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    raf = requestAnimationFrame(updateAura);

    return () => {
      document.documentElement.classList.remove("hide-default-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Scent Droplet Pointer */}
      <div ref={pointerRef} className="custom-cursor-drop">
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="scent-drop-svg"
        >
          <path
            d="M10 1C10 1 2 11 2 16.5C2 20.6421 5.58172 23 10 23C14.4183 23 18 20.6421 18 16.5C18 11 10 1 10 1Z"
            className="scent-drop-fill"
          />
          <path
            d="M10 1C10 1 2 11 2 16.5C2 20.6421 5.58172 23 10 23C14.4183 23 18 20.6421 18 16.5C18 11 10 1 10 1Z"
            className="scent-drop-stroke"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      {/* Fragrance Diffuser Ambient Aura */}
      <div ref={auraRef} className="custom-cursor-aura" />
    </>
  );
}
