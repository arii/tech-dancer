import { Box, Text } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

export type WordmarkVariant = 'default' | 'hero' | 'navigation' | 'mobile';

interface WordmarkConfig {
  containerClassName?: string;
  containerStyle?: CSSProperties;
  textClassName?: string;
  textStyle?: CSSProperties;
  textSize?: "sm" | "base" | "lg" | "xl" | "tiny" | "micro" | "xs" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";
  textWeight?: string;
  dotBlogClassName?: string;
  dotBlogStyle?: CSSProperties;
}

const VARIANTS: Record<WordmarkVariant, WordmarkConfig> = {
  default: {
    containerClassName: "mt-0.5 leading-none",
    textClassName: "leading-none text-white",
    textSize: "sm",
    textWeight: "font-extrabold",
    textStyle: { letterSpacing: '0.05em' },
    dotBlogClassName: "text-white/60 font-light",
  },
  navigation: {
    containerClassName: "mt-0.5 leading-none",
    textClassName: "leading-none text-white",
    textSize: "sm",
    textWeight: "font-extrabold",
    textStyle: { letterSpacing: '0.05em' },
    dotBlogClassName: "text-white/60 font-light",
  },
  mobile: {
    textClassName: "leading-none text-white",
    textSize: "sm",
    textWeight: "font-extrabold",
    textStyle: { letterSpacing: '0.05em' },
    dotBlogStyle: { color: 'rgba(255,255,255,0.6)', fontWeight: 300 },
  },
  hero: {
    containerClassName: "text-white mt-3 opacity-0 translate-y-2.5",
    containerStyle: {
      fontSize: 'clamp(18px, 4vw, 28px)',
      letterSpacing: '0.05em',
      animation: 'fadeUp 0.7s ease forwards 0.4s',
      fontWeight: 800,
      fontFamily: '"Bricolage Grotesque", "Albert Sans", sans-serif',
    },
    dotBlogStyle: { color: 'rgba(255,255,255,0.7)', fontWeight: 300 },
  }
};

interface WordmarkProps {
  variant?: WordmarkVariant;
  className?: string;
}

/**
 * Wordmark component for "boomtick.blog".
 * Uses predefined variants to ensure consistent styling across navigation, hero, and mobile views.
 */
export function Wordmark({ variant = 'default', className }: WordmarkProps) {
  const config = VARIANTS[variant];

  if (variant === 'hero') {
    return (
      <Box
        className={cn(config.containerClassName, className)}
        style={config.containerStyle}
      >
        boom<span className="text-accent">tick</span><span style={config.dotBlogStyle}>.blog</span>
      </Box>
    );
  }

  const textElement = (
    <Text
      variant="sans"
      size={config.textSize}
      weight={config.textWeight}
      className={cn(config.textClassName)}
      style={config.textStyle}
    >
      boom<span className="text-accent">tick</span><span className={config.dotBlogClassName} style={config.dotBlogStyle}>.blog</span>
    </Text>
  );

  if (config.containerClassName) {
    return (
      <Box paddingY={0} className={cn(config.containerClassName, className)}>
        {textElement}
      </Box>
    );
  }

  return (
    <span className={className}>
      {textElement}
    </span>
  );
}
