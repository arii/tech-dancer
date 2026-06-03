
import { Box } from '@/layouts/Primitives';
import { ReactNode, ComponentType } from 'react';

interface ArticleCardProps {
  children: ReactNode;
  className?: string;
  as?: string | ComponentType<Record<string, unknown>>;
  [key: string]: unknown;
}

/**
 * Base card component for editorial articles.
 * Standardizes the border, background, and rounded corners.
 */
export function ArticleCard({ children, className = "", as, ...props }: ArticleCardProps) {
  return (
    <Box
      as={as}
      radius="xl"
      border
      className={`border-line/80 bg-bg/60 backdrop-blur-sm ${className}`}
      {...props}
    >
      {children}
    </Box>
  );
}
