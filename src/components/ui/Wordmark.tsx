import { Text } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface WordmarkProps {
  className?: string;
  variant?: 'default' | 'hero' | 'navigation' | 'mobile';
}

export function Wordmark({ className, variant = 'default' }: WordmarkProps) {
  return (
    <Text
      variant="sans"
      size={variant === 'mobile' || variant === 'navigation' ? "sm" : "base"}
      weight="font-extrabold"
      className={cn("leading-none text-white", className)}
      style={{ letterSpacing: '0.05em' }}
    >
      boom
      <span className="text-accent">tick</span>
      <span className="text-white/60 font-light">.blog</span>
    </Text>
  );
}
