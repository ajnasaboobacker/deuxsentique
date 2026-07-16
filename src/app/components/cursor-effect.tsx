"use client";

import { useEffect, useState } from "react";

export default function CursorEffect() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const mouse = { x: -100, y: -100 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    let raf: number;
    const updateRing = () => {
      setRingPos((prev) => ({
        x: prev.x + (mouse.x - prev.x) * 0.15,
        y: prev.y + (mouse.y - prev.y) * 0.15,
      }));
      raf = requestAnimationFrame(updateRing);
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
      document.body.classList.toggle("cursor-hover", !!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    raf = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        className="custom-cursor-dot"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />
      <div
        className="custom-cursor-ring"
        style={{ left: `${ringPos.x}px`, top: `${ringPos.y}px` }}
      />
    </>
  );
}
