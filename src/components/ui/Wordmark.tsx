// impeccable-ignore-file
import { Text } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface WordmarkProps {
  className?: string;
  variant?: 'default' | 'hero' | 'navigation' | 'mobile';
}

export function Wordmark({ className, variant = 'default' }: WordmarkProps) {
  const isHero = variant === 'hero';
  const isSmall = variant === 'mobile' || variant === 'navigation';

  return (
    <Text
      variant="sans"
      size={isHero ? undefined : (isSmall ? "sm" : "base")}
      weight="font-extrabold"
      className={cn(
        "leading-none text-white wordmark",
        isHero && "wordmark-hero",
        className
      )}
    >
      boom
      <span className="text-accent">tick</span>
      <span className={cn(isHero ? "text-white/70" : "text-white/60", "font-light")}>.blog</span>
    </Text>
  );
}
