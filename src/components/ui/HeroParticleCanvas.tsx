import { useEffect, useRef } from 'react';
import { debounce } from 'throttle-debounce';
import { HERO_CONFIG } from '@/config/hero';

interface Particle {
  x: number; y: number; r: number;
  vx: number; vy: number;
  alpha: number; hue: number;
}

export function HeroParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    const debouncedResize = debounce(200, resize);

    resize();
    window.addEventListener('resize', debouncedResize);

    // Build particles
    const particles: Particle[] = Array.from({ length: HERO_CONFIG.PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * (HERO_CONFIG.PARTICLE_RADIUS_MAX - HERO_CONFIG.PARTICLE_RADIUS_MIN) + HERO_CONFIG.PARTICLE_RADIUS_MIN,
      vx: (Math.random() - 0.5) * HERO_CONFIG.PARTICLE_VELOCITY_FACTOR,
      vy: (Math.random() - 0.5) * HERO_CONFIG.PARTICLE_VELOCITY_FACTOR,
      alpha: Math.random() * (HERO_CONFIG.PARTICLE_ALPHA_MAX - HERO_CONFIG.PARTICLE_ALPHA_MIN) + HERO_CONFIG.PARTICLE_ALPHA_MIN,
      hue: Math.random() > 0.5 ? HERO_CONFIG.PARTICLE_HUES[0] : HERO_CONFIG.PARTICLE_HUES[1],
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
      window.removeEventListener('resize', debouncedResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}
