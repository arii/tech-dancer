import { useEffect, useRef } from 'react';
import { HERO_CONFIG } from '@/config/hero';
import { useResizeObserver } from '@/hooks/useResizeObserver';

interface Particle {
  x: number; y: number; r: number;
  vx: number; vy: number;
  alpha: number; hue: number;
}

interface HeroParticleCanvasProps {
  particleCount?: number;
  radiusMin?: number;
  radiusMax?: number;
  velocityFactor?: number;
  alphaMin?: number;
  alphaMax?: number;
  hues?: number[];
  seeds?: typeof HERO_CONFIG.SEEDS;
}

export function HeroParticleCanvas({
  particleCount = HERO_CONFIG.PARTICLE_COUNT,
  radiusMin = HERO_CONFIG.PARTICLE_RADIUS_MIN,
  radiusMax = HERO_CONFIG.PARTICLE_RADIUS_MAX,
  velocityFactor = HERO_CONFIG.PARTICLE_VELOCITY_FACTOR,
  alphaMin = HERO_CONFIG.PARTICLE_ALPHA_MIN,
  alphaMax = HERO_CONFIG.PARTICLE_ALPHA_MAX,
  hues = HERO_CONFIG.PARTICLE_HUES,
  seeds = HERO_CONFIG.SEEDS,
}: HeroParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { elementRef: containerRef, width, height } = useResizeObserver<HTMLDivElement>();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas || width === 0 || height === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      x: ((i * seeds.PARTICLE_X) % 1) * width,
      y: ((i * seeds.PARTICLE_Y) % 1) * height,
      r: ((i * seeds.PARTICLE_R) % 1) * (radiusMax - radiusMin) + radiusMin,
      vx: (((i * seeds.PARTICLE_VX) % 1) - 0.5) * velocityFactor,
      vy: (((i * seeds.PARTICLE_VY) % 1) - 0.5) * velocityFactor,
      alpha: ((i * seeds.PARTICLE_ALPHA) % 1) * (alphaMax - alphaMin) + alphaMin,
      hue: i % 2 === 0 ? hues[0] : hues[1],
    }));

    let rafId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [width, height, particleCount, radiusMin, radiusMax, velocityFactor, alphaMin, alphaMax, hues, seeds]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block pointer-events-none"
      />
    </div>
  );
}
