
import * as React from 'react';
import { Box, BoxProps } from '@/layouts/Primitives';
import { normalizeAsset } from '@/lib/content';

/**
 * Validates if a URL is safe based on a protocol whitelist.
 * Allows only http:, https:, or relative paths (starting with /).
 */
const isSafeUrl = (url: string): boolean => {
  if (!url) return false;
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) return true;
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    // If not a valid URL and not explicitly relative, treat as unsafe
    return false;
  }
};

/**
 * Whitelist of standard HTML <img> attributes to prevent event handler injection.
 */
const SAFE_IMAGE_ATTRS = new Set([
  'src', 'alt', 'title', 'loading', 'srcSet', 'sizes', 'useMap', 'width', 'height', 'crossOrigin', 'referrerPolicy'
]);

export interface SafeImageProps extends Omit<BoxProps, 'as'> {
  src?: string;
  alt: string;
  fallbackSrc?: string;
}

/**
 * A security-hardened image component that enforces protocol whitelisting,
 * prop filtering, and external asset policies by default.
 */
export const SafeImage = React.forwardRef<HTMLImageElement, SafeImageProps>(
  ({ src, alt, fallbackSrc, ...boxProps }, ref) => {
    const normalizedSrc = normalizeAsset(src || '');
    const isSafe = normalizedSrc ? isSafeUrl(normalizedSrc) : false;
    const finalSrc = isSafe ? normalizedSrc : fallbackSrc;

    const isExternal = finalSrc?.startsWith('http');

    // Filter boxProps to separate valid HTML attributes from layout primitive props
    const filteredProps: Record<string, unknown> = {};
    Object.entries(boxProps).forEach(([key, value]) => {
      if (SAFE_IMAGE_ATTRS.has(key)) {
        filteredProps[key] = value;
      }
    });

    return (
      <Box
        ref={ref}
        as="img"
        src={finalSrc}
        alt={alt}
        {...(isExternal ? {
          crossOrigin: "anonymous",
          referrerPolicy: "no-referrer"
        } : {})}
        {...filteredProps}
        {...boxProps} // Box will handle its own layout props and filter them
      />
    );
  }
);

SafeImage.displayName = 'SafeImage';
