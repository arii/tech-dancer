import { useEffect, useRef } from 'react';

const BAR_COUNT = 28;

function getBarColor(index: number, total: number): string {
  const t = index / (total - 1);
  if (t < 0.5) {
    const u = t * 2;
    const r = Math.round(0 + u * 100);
    const g = Math.round(229 - u * 100);
    const b = 255;
    return `rgb(${r},${g},${b})`;
  }
  const u = (t - 0.5) * 2;
  const r = Math.round(100 + u * 155);
  const g = Math.round(129 - u * 129);
  const b = Math.round(255 - u * 100);
  return `rgb(${r},${g},${b})`;
}

function withAlpha(color: string, alpha: string): string {
  return color.replace('rgb(', 'rgba(').replace(')', `,${alpha})`);
}

export function NeonEqualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const phases = Array.from({ length: BAR_COUNT }, () => Math.random() * Math.PI * 2);
    const speeds = Array.from({ length: BAR_COUNT }, () => 0.6 + Math.random() * 1.2);
    const baseHeights = Array.from({ length: BAR_COUNT }, (_, i) => {
      const center = BAR_COUNT / 2;
      const dist = Math.abs(i - center) / center;
      return 0.35 + (1 - dist) * 0.45;
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const draw = (timestamp: number) => {
      const t = timestamp / 1000;
      const W = canvas.getBoundingClientRect().width;
      const H = canvas.getBoundingClientRect().height;

      ctx.clearRect(0, 0, W, H);

      const floorY = H * 0.72;
      const barW = Math.max(6, (W / BAR_COUNT) * 0.55);
      const gap = W / BAR_COUNT;

      for (let i = 0; i < BAR_COUNT; i++) {
        const x = gap * i + gap / 2;
        const color = getBarColor(i, BAR_COUNT);

        const wave1 = Math.sin(t * speeds[i] + phases[i]);
        const wave2 = Math.sin(t * speeds[i] * 0.7 + phases[i] + 1.3);
        const wave3 = Math.sin(t * speeds[i] * 1.4 + phases[i] + 2.7);
        const height = (baseHeights[i] + (wave1 * 0.25 + wave2 * 0.12 + wave3 * 0.08)) * floorY;
        const barH = Math.max(8, height);
        const y1 = floorY - barH;

        ctx.save();
        ctx.shadowColor = color;
        ctx.shadowBlur = 14;

        const grad = ctx.createLinearGradient(x, y1, x, floorY);
        grad.addColorStop(0, color);
        grad.addColorStop(0.6, withAlpha(color, '0.66'));
        grad.addColorStop(1, withAlpha(color, '0.12'));
        ctx.fillStyle = grad;
        ctx.fillRect(x - barW / 2, y1, barW, barH);

        ctx.shadowBlur = 28;
        ctx.fillStyle = withAlpha(color, '0.2');
        ctx.fillRect(x - barW, y1, barW * 2, barH);
        ctx.restore();
      }

      const ringColors = [
        { r: 0.78, opacity: 0.5 },
        { r: 0.88, opacity: 0.3 },
        { r: 0.97, opacity: 0.15 },
      ];

      const cx = W / 2;
      const maxR = W * 0.52;

      ringColors.forEach(({ r, opacity }) => {
        const radius = maxR * r;
        const pulse = 1 + Math.sin(t * 0.8) * 0.012;
        const finalR = radius * pulse;

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(cx, floorY, finalR, finalR * 0.22, 0, 0, Math.PI * 2);
        const ringGrad = ctx.createLinearGradient(cx - finalR, floorY, cx + finalR, floorY);
        ringGrad.addColorStop(0, `rgba(0,229,255,${opacity})`);
        ringGrad.addColorStop(0.5, `rgba(155,93,229,${opacity * 0.7})`);
        ringGrad.addColorStop(1, `rgba(255,0,200,${opacity * 0.5})`);
        ctx.strokeStyle = ringGrad;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} aria-hidden="true" />;
}
