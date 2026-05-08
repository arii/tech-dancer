import { Text, TextProps } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

export type WordmarkVariant = "nav" | "hero";

export interface WordmarkProps extends Omit<TextProps, 'variant'> {
  variant?: WordmarkVariant;
}

const VARIANT_MAP: Record<NonNullable<WordmarkProps["variant"]>, TextProps["variant"]> = {
  nav: "wordmark",
  hero: "wordmarkHero",
};

export function Wordmark({
  className,
  style,
  variant = "nav",
  size,
  weight,
  ...props
}: WordmarkProps) {
  const isHero = variant === "hero";

  return (
    <Text
      variant={VARIANT_MAP[variant]}
      size={size || (isHero ? undefined : "sm")}
      weight={weight || "font-extrabold"}
      className={cn(className)}
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
