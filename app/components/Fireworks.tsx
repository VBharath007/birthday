'use client';

import { useEffect, useRef } from 'react';

export default function Fireworks({ active = true }: { active?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    type Spark = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
      decay: number;
      size: number;
    };

    let sparks: Spark[] = [];
    let animationId: number;

    const colors = [
      '#f43f5e', '#ec4899', '#f59e0b', '#fbbf24',
      '#a855f7', '#38bdf8', '#34d399', '#fb7185', '#ffffff'
    ];

    const createBurst = (x: number, y: number) => {
      const count = 60 + Math.floor(Math.random() * 40);
      const baseColor = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 1.5,
          vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 1.5,
          color: Math.random() > 0.3 ? baseColor : '#ffffff',
          alpha: 1,
          decay: Math.random() * 0.015 + 0.012,
          size: Math.random() * 2.5 + 1.5,
        });
      }
    };

    // Auto trigger fireworks
    createBurst(width * 0.3, height * 0.35);
    createBurst(width * 0.7, height * 0.3);

    const interval = setInterval(() => {
      const rx = width * (0.2 + Math.random() * 0.6);
      const ry = height * (0.15 + Math.random() * 0.4);
      createBurst(rx, ry);
    }, 1200);

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.06; // gravity
        s.vx *= 0.98; // drag
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(loop);
    }

    animationId = requestAnimationFrame(loop);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30"
      aria-hidden="true"
    />
  );
}
