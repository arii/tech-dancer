import { Text, TextProps } from '../../layouts/Primitives';
import { cn } from '../../lib/utils';

export type WordmarkVariant = "default" | "hero" | "navigation" | "nav";

export interface WordmarkProps extends Omit<TextProps, 'variant'> {
  variant?: WordmarkVariant;
}

const VARIANT_MAP: Record<WordmarkVariant, TextProps["variant"]> = {
  default: "sans",
  hero: "display",
  navigation: "sans",
  nav: "sans", // Legacy alias for navigation
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
  variant = "navigation",
  size,
  weight,
  ...props
}: WordmarkProps) {
  const isHero = variant === "hero";
  const isNav = variant === "navigation" || variant === "nav";

  return (
    <Text
      variant={VARIANT_MAP[variant]}
      color="white"
      size={size || (isHero ? undefined : (isNav ? "sm" : "base"))}
      weight={weight || "font-extrabold"}
      className={cn("leading-none", VARIANT_CLASSES[variant], className)}
      style={style}
      tracking="wordmark"
      {...props}
    >
      boom
      <span className="text-accent">tick</span>
      <Text
        as="span"
        color="body"
        weight="font-light"
        opacityVariant="heavy"
      >
        .blog
      </Text>
    </Text>
  );
}
