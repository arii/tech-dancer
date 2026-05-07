import { Text, TextProps } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

interface WordmarkProps extends TextProps {
  dotBlogClassName?: string;
  dotBlogStyle?: CSSProperties;
}

export function Wordmark({
  dotBlogClassName,
  dotBlogStyle,
  className,
  style,
  variant = "sans",
  size = "sm",
  weight = "font-extrabold",
  ...props
}: WordmarkProps) {
  return (
    <Text
      variant={variant}
      size={size}
      weight={weight}
      className={cn("leading-none text-white", className)}
      style={{ letterSpacing: '0.05em', ...style }}
      {...props}
    >
      boom
      <span className="text-accent">tick</span>
      <span
        className={cn("text-white/60 font-light", dotBlogClassName)}
        style={dotBlogStyle}
      >
        .blog
      </span>
    </Text>
  );
}
