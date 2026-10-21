'use client';

import { useEffect, useRef } from 'react';

export default function ConfettiEffect({ autoTrigger = true }: { autoTrigger?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

    type ConfettiPiece = {
      x: number;
      y: number;
      w: number;
      h: number;
      color: string;
      speedY: number;
      speedX: number;
      rotation: number;
      rotSpeed: number;
      opacity: number;
    };

    const colors = [
      '#f43f5e', '#ec4899', '#f59e0b', '#fbbf24',
      '#a855f7', '#06b6d4', '#10b981', '#fb7185'
    ];

    let pieces: ConfettiPiece[] = [];
    let animationId: number;

    const fireConfetti = () => {
      const count = Math.min(120, Math.floor(width / 8));
      for (let i = 0; i < count; i++) {
        pieces.push({
          x: width / 2 + (Math.random() - 0.5) * (width * 0.4),
          y: Math.random() * (height * 0.3) - 50,
          w: Math.random() * 8 + 6,
          h: Math.random() * 6 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedY: Math.random() * 3.5 + 2.5,
          speedX: (Math.random() - 0.5) * 4,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 8,
          opacity: 1,
        });
      }
    };

    if (autoTrigger) {
      fireConfetti();
      const interval = setInterval(fireConfetti, 4000);
      return () => {
        clearInterval(interval);
        window.removeEventListener('resize', onResize);
        cancelAnimationFrame(animationId);
      };
    }

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      pieces.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;
        p.opacity -= 0.003;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        if (p.y > height + 20 || p.opacity <= 0) {
          pieces.splice(index, 1);
        }
      });

      animationId = requestAnimationFrame(loop);
    }

    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);
    };
  }, [autoTrigger]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20"
      aria-hidden="true"
    />
  );
}
