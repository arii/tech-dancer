import { cn } from '@/lib/utils';

export type WordmarkVariant = 'default' | 'hero' | 'navigation' | 'mobile';

interface WordmarkProps {
  variant?: WordmarkVariant;
  className?: string;
}

/**
 * Wordmark component for "boomtick.blog".
 * Uses Tailwind utility classes to ensure consistent styling across navigation, hero, and mobile views.
 */
export function Wordmark({ variant = 'default', className }: WordmarkProps) {
  const isHero = variant === 'hero';
  const isNav = variant === 'navigation';
  const isMobile = variant === 'mobile';

  return (
    <div
      className={cn(
        "wordmark-base",
        isHero && "wordmark-hero",
        isNav && "wordmark-nav",
        isMobile && "wordmark-mobile",
        className
      )}
    >
      boom<span className="text-accent">tick</span>
      <span className={cn("font-light", isHero ? "text-white/70" : "text-white/60")}>
        .blog
      </span>
    </div>
  );
}
