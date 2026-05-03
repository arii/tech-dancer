import { Box } from '@/layouts/Primitives';

interface EqualizerProps {
  count?: number;
  compact?: boolean;
  reverse?: boolean;
}

export default function Equalizer({ count = 28, compact = false, reverse = false }: EqualizerProps) {
  const bars = Array.from({ length: count });

  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '4px',
        height: '100%',
        width: '100%',
        padding: '0 32px 32px',
        pointerEvents: 'none'
      }}
    >
      {bars.map((_, i) => {
        const duration = i % 3 === 0 ? '5.6s' : i % 4 === 0 ? '4.2s' : i % 5 === 0 ? '5.1s' : '4.8s';
        const delay = `${-(i * 0.15)}s`;
        
        return (
          <div
            key={i}
            style={{
              flex: 1,
              borderRadius: '4px 4px 0 0',
              background: 'linear-gradient(to top, #00CFFF, #8B2FFF, #FF00C1)',
              minHeight: '8px',
              height: '30%',
              animation: `equalizer-wave ${duration} ease-in-out ${delay} infinite`,
              animationDirection: reverse ? 'reverse' : 'normal',
              boxShadow: '0 0 20px rgba(0, 207, 255, 0.5)',
              opacity: 1
            }}
          />
        );
      })}
      <style>{`
        @keyframes equalizer-wave {
          0%, 100% { height: 28%; }
          25% { height: 72%; }
          50% { height: 46%; }
          75% { height: 86%; }
        }
      `}</style>
    </div>
  );
}
