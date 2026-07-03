
import * as React from 'react';
import { Box, BoxProps } from '@/layouts/Primitives';
import { normalizeAsset } from '@/lib/content';

/**
 * Validates if a URL is safe based on a protocol whitelist.
 * Allows only http:, https:, or relative paths (starting with /).
 */
const isSafeUrl = (url: string): boolean => {
  if (!url) return false;
  // Allow relative paths, including those without ./ prefix (e.g., "image.jpg")
  if (!url.includes('://') && !url.startsWith('data:')) return true;
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    // If URL parsing fails but it has no protocol, assume it's a complex relative path
    return !url.includes('://');
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

    // Separate layout props from standard HTML image attributes
    const imgAttributes: Record<string, unknown> = {};
    const layoutProps: Record<string, unknown> = {};

    Object.entries(boxProps).forEach(([key, value]) => {
      if (SAFE_IMAGE_ATTRS.has(key)) {
        imgAttributes[key] = value;
      } else {
        layoutProps[key] = value;
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
        {...imgAttributes}
        {...layoutProps} // Primitives filter out non-primitive props from the DOM
      />
    );
  }
);

SafeImage.displayName = 'SafeImage';
