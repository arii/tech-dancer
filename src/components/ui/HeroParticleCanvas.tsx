import { useEffect, useRef } from 'react';
import { HERO_CONFIG } from '@/config/hero';
import { useResizeObserver } from '@/hooks/useResizeObserver';

interface Particle {
  x: number; y: number; r: number;
  vx: number; vy: number;
  alpha: number; hue: number;
  fillStyle: string;
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
  const { elementRef: containerRef, width, height } = useResizeObserver<HTMLDivElement>(HERO_CONFIG.RESIZE_DEBOUNCE_MS);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas || width === 0 || height === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Sync canvas resolution with container size
    canvas.width = width;
    canvas.height = height;

    // Build particles deterministically for visual regression testing
    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
      const alpha = ((i * seeds.PARTICLE_ALPHA) % 1) * (alphaMax - alphaMin) + alphaMin;
      const hue = i % 2 === 0 ? hues[0] : hues[1];
      return {
        x: ((i * seeds.PARTICLE_X) % 1) * width,
        y: ((i * seeds.PARTICLE_Y) % 1) * height,
        r: ((i * seeds.PARTICLE_R) % 1) * (radiusMax - radiusMin) + radiusMin,
        vx: (((i * seeds.PARTICLE_VX) % 1) - 0.5) * velocityFactor,
        vy: (((i * seeds.PARTICLE_VY) % 1) - 0.5) * velocityFactor,
        alpha,
        hue,
        fillStyle: `hsla(${hue}, 100%, 70%, ${alpha})`,
      };
    });

    let rafId: number;
    let lastFrameTime = 0; // Set to 0 to ensure the first frame is rendered immediately
    const frameInterval = 1000 / HERO_CONFIG.TARGET_FPS;

    const draw = (currentTime: number) => {
      rafId = requestAnimationFrame(draw);

      // Calculate delta since last frame
      const deltaTime = currentTime - lastFrameTime;

      // Throttle to target FPS, using a small buffer to handle slight timing jitter
      if (lastFrameTime !== 0 && deltaTime < frameInterval - HERO_CONFIG.FRAME_JITTER) return;

      lastFrameTime = currentTime - (lastFrameTime === 0 ? 0 : deltaTime % frameInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.fillStyle;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
    };
    
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const startAnimation = () => {
      rafId = requestAnimationFrame(draw);
    };

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(() => startAnimation(), { timeout: 1000 });
    } else {
      timeoutId = setTimeout(startAnimation, 300);
    }

    return () => {
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
      if (rafId) cancelAnimationFrame(rafId);
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
