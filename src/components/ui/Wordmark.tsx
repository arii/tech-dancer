import { Text, TextProps } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

export type WordmarkVariant = "default" | "hero" | "navigation" | "nav";

export interface WordmarkProps extends Omit<TextProps, 'variant'> {
  variant?: WordmarkVariant;
}

const VARIANT_MAP: Record<WordmarkVariant, TextProps["variant"]> = {
  default: "wordmark",
  hero: "wordmarkHero",
  navigation: "wordmark",
  nav: "wordmark", // Legacy alias for navigation
};

const DEFAULT_SIZE_MAP: Record<WordmarkVariant, TextProps["size"]> = {
  default: "base",
  hero: undefined,
  navigation: "sm",
  nav: "sm",
};

const VARIANT_CLASSES: Record<WordmarkVariant, string> = {
  default: "",
  hero: "wordmark-hero",
  navigation: "wordmark-nav",
  nav: "wordmark-nav",
};

export function Wordmark({
  className,
  style,
  variant = "default",
  size,
  weight,
  ...props
}: WordmarkProps) {
  return (
    <Text
      variant={VARIANT_MAP[variant] || VARIANT_MAP.default}
      size={size || DEFAULT_SIZE_MAP[variant] || DEFAULT_SIZE_MAP.default}
      weight={weight || "font-extrabold"}
      className={cn(VARIANT_CLASSES[variant] || VARIANT_CLASSES.default, className)}
      style={style}
      tracking="wordmark"
      {...props}
    >
      boom
      <span className="text-accent">tick</span>
      <span
        className="text-text-body font-light opacity-70"
      >
        .blog
      </span>
    </Text>
  );
}
