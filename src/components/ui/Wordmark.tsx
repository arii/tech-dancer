import { Text, TextProps } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface WordmarkProps extends Omit<TextProps, 'variant'> {
  /**
   * nav: Standard branding used in Sidebar and Mobile Header (Albert Sans)
   * hero: Bold display branding used in the Hero section (Bricolage Grotesque)
   */
  variant?: "nav" | "hero";
}

const VARIANT_MAP: Record<NonNullable<WordmarkProps["variant"]>, TextProps["variant"]> = {
  nav: "wordmark",
  hero: "wordmarkHero",
};

/**
 * Reusable BoomTick Wordmark component.
 * Enforces brand typography and color rules while allowing standard layout overrides.
 */
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
