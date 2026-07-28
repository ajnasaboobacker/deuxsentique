"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  rotation: number;
  spin: number;
}

export default function SmokeQuote({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const particles: Particle[] = [];
    const particleCount = 35;

    const createParticle = (initial = false): Particle => {
      const maxLife = 180 + Math.random() * 220;
      return {
        // Spawn smoke centered tightly around the text area
        x: width * 0.05 + Math.random() * (width * 0.9),
        y: initial
          ? height * 0.2 + Math.random() * (height * 0.7)
          : height * 0.6 + Math.random() * (height * 0.3),
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.2 - Math.random() * 0.35,
        radius: 20 + Math.random() * 20,
        maxRadius: 75 + Math.random() * 55,
        alpha: 0,
        maxAlpha: 0.08 + Math.random() * 0.1, // Subtle, soft smoke density
        life: initial ? Math.random() * maxLife : 0,
        maxLife,
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.005,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        p.x += p.vx + Math.sin(p.life * 0.02) * 0.3; // Organic wavy smoke drift
        p.y += p.vy;
        p.rotation += p.spin;

        const lifeRatio = p.life / p.maxLife;
        const currentRadius = p.radius + (p.maxRadius - p.radius) * lifeRatio;

        // Base opacity curve based on particle life
        let baseAlpha = 0;
        if (lifeRatio < 0.25) {
          baseAlpha = (lifeRatio / 0.25) * p.maxAlpha;
        } else {
          baseAlpha = (1 - (lifeRatio - 0.25) / 0.75) * p.maxAlpha;
        }

        // Mathematical sine feathering at edges guarantees ZERO hard rectangular borders
        const normX = Math.max(0, Math.min(1, p.x / width));
        const normY = Math.max(0, Math.min(1, p.y / height));
        const edgeFadeX = Math.sin(Math.PI * normX);
        const edgeFadeY = Math.sin(Math.PI * normY);

        const renderAlpha = baseAlpha * edgeFadeX * edgeFadeY;

        if (p.life >= p.maxLife || p.y < -p.maxRadius || renderAlpha <= 0.001) {
          particles[i] = createParticle(false);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, currentRadius);
        // Pure soft white & warm cream smoke that dissolves to 100% transparent
        grad.addColorStop(0, `rgba(255, 255, 255, ${renderAlpha * 1.2})`);
        grad.addColorStop(0.4, `rgba(250, 240, 225, ${renderAlpha * 0.75})`);
        grad.addColorStop(0.7, `rgba(235, 205, 160, ${renderAlpha * 0.25})`);
        grad.addColorStop(1, "rgba(235, 205, 160, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative py-4 my-4 bg-transparent border-none">
      {/* 100% Edge-Feathered Canvas (No Box, No Edges) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />
      <div className="relative z-10 border-l border-[#C4913A]/40 pl-6">{children}</div>
    </div>
  );
}
