'use client';

import { useEffect, useRef } from 'react';

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    type Particle = {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
      type: 'heart' | 'sparkle' | 'bubble';
      color: string;
      rotation: number;
      rotSpeed: number;
    };

    const colors = [
      'rgba(244, 63, 94, ',   // rose
      'rgba(251, 113, 133, ', // soft rose
      'rgba(245, 158, 11, ',  // warm gold
      'rgba(236, 72, 153, ',  // pink
      'rgba(253, 186, 116, ', // peach
    ];

    const particles: Particle[] = [];
    const count = Math.min(30, Math.floor(width / 35));

    for (let i = 0; i < count; i++) {
      particles.push(createParticle(true));
    }

    function createParticle(randomY = false): Particle {
      const typeChoice = Math.random();
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : height + 20,
        size: Math.random() * 9 + 6,
        speedY: Math.random() * 0.7 + 0.35,
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.25,
        fadeSpeed: (Math.random() - 0.5) * 0.005,
        type: typeChoice > 0.45 ? 'heart' : typeChoice > 0.15 ? 'sparkle' : 'bubble',
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
      };
    }

    function drawHeart(x: number, y: number, size: number, color: string, alpha: number) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = `${color}${alpha})`;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      // bottom left curve
      ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.25);
      // bottom right curve
      ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      // top right curve
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function drawSparkle(x: number, y: number, size: number, color: string, alpha: number, rot: number) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.fillStyle = `${color}${alpha})`;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size);
        ctx.lineTo(
          Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.3),
          Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.3)
        );
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    let lastTime = performance.now();

    function render(currentTime: number) {
      if (!ctx) return;
      const delta = Math.min((currentTime - lastTime) / 16.66, 2);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.y -= p.speedY * delta;
        p.x += p.speedX * delta;
        p.rotation += p.rotSpeed * delta;
        p.opacity += p.fadeSpeed * delta;

        if (p.opacity > 0.75 || p.opacity < 0.15) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.type === 'heart') {
          drawHeart(p.x, p.y, p.size, p.color, p.opacity);
        } else if (p.type === 'sparkle') {
          drawSparkle(p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity * 0.5})`;
          ctx.fill();
        }

        if (p.y < -30 || p.x < -30 || p.x > width + 30) {
          particles[idx] = createParticle(false);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
