
import * as React from 'react';
import { Box, BoxProps } from '@/layouts/Primitives';
import { normalizeAsset } from '@/lib/content';

/**
 * Validates if a URL is safe based on a protocol whitelist.
 * Allows only http:, https:, or relative paths.
 */
const isSafeUrl = (url: string): boolean => {
  if (!url) return false;

  const lowerUrl = url.toLowerCase().trim();

  // Explicitly block known dangerous protocols immediately
  if (lowerUrl.startsWith('javascript:') ||
      lowerUrl.startsWith('data:') ||
      lowerUrl.startsWith('vbscript:') ||
      lowerUrl.startsWith('file:')) {
    return false;
  }

  // Allow safe relative and local protocols
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../') || url.startsWith('blob:')) {
    return true;
  }

  try {
    // If it's a valid absolute URL, check the protocol
    const parsed = new URL(url);
    return ['http:', 'https:', 'blob:'].includes(parsed.protocol);
  } catch {
    // If URL parsing fails (likely because it's a relative path like "image.jpg"),
    // we check if it contains a protocol-like colon before a slash.
    const colonIndex = url.indexOf(':');
    const slashIndex = url.indexOf('/');

    // Safe if no colon or colon appears after a slash
    if (colonIndex === -1) return true;
    if (slashIndex !== -1 && colonIndex > slashIndex) return true;

    return false;
  }
};

/**
 * Whitelist of standard HTML <img> attributes to prevent event handler injection.
 * Removed width/height to let Box handle layout via Primitives.
 */
const SAFE_IMAGE_ATTRS = new Set([
  'src', 'alt', 'title', 'loading', 'srcSet', 'sizes', 'useMap'
]);

/**
 * Whitelist of layout Primitive props.
 */
const PRIMITIVE_PROPS = new Set([
  'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingX', 'paddingY',
  'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'marginX', 'marginY',
  'gap', 'gapX', 'gapY', 'border', 'borderColor', 'smBorder', 'mdBorder', 'lgBorder', 'xlBorder',
  'surface', 'emphasis', 'radius', 'panel', 'flex', 'wrap', 'layout', 'shadow', 'position', 'inset',
  'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight', 'overflow', 'overflowX', 'overflowY', 'overscroll', 'isolation',
  'noScrollbar', 'pointerEvents', 'zIndex', 'opacity', 'opacityVariant', 'display', 'aspect',
  'shrink', 'self', 'justify', 'align', 'scrollBehavior', 'scrollPaddingTop', 'scrollMarginTop',
  'top', 'right', 'bottom', 'left', 'span', 'cursor', 'flexWrap', 'textAlign', 'bgGradient',
  'initial', 'animate', 'exit', 'transition', 'variants', 'whileHover', 'whileTap', 'whileFocus',
  'whileDrag', 'whileInView', 'viewport', 'layoutId', 'onAnimationStart', 'onAnimationComplete',
  'onUpdate', 'custom'
]);

export interface SafeImageProps extends Omit<BoxProps, 'as'> {
  src?: string;
  alt: string;
  fallbackSrc?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * A security-hardened image component that enforces protocol whitelisting,
 * prop filtering, and external asset policies by default.
 */
export const SafeImage = React.forwardRef<HTMLImageElement, SafeImageProps>(
  ({ src, alt, fallbackSrc, objectFit, className, style, crossOrigin, ...boxProps }, ref) => {
    const normalizedSrc = normalizeAsset(src || '');
    const isSafe = normalizedSrc ? isSafeUrl(normalizedSrc) : false;
    const finalSrc = isSafe ? normalizedSrc : fallbackSrc;

    const isExternal = finalSrc?.startsWith('http');

    // Separate whitelisted attributes from layout props
    const imgAttributes: Record<string, unknown> = {};
    const layoutProps: Record<string, unknown> = {};

    Object.entries(boxProps).forEach(([key, value]) => {
      if (SAFE_IMAGE_ATTRS.has(key)) {
        imgAttributes[key] = value;
      } else if (PRIMITIVE_PROPS.has(key)) {
        layoutProps[key] = value;
      }
    });

    const finalStyle: React.CSSProperties = {
      objectFit: objectFit || 'contain',
      ...style
    };

    // Determine external asset policies
    const externalPolicies: Record<string, string | null> = {};
    if (isExternal) {
      externalPolicies.referrerPolicy = "no-referrer";

      // Default to anonymous for external, but allow explicit override (including null to disable)
      if (crossOrigin !== undefined) {
        externalPolicies.crossOrigin = crossOrigin as string | null;
      } else {
        externalPolicies.crossOrigin = "anonymous";
      }
    }

    return (
      <Box
        ref={ref}
        as="img"
        src={finalSrc}
        alt={alt}
        className={className}
        style={finalStyle}
        {...externalPolicies}
        {...layoutProps}
        {...imgAttributes}
      />
    );
  }
);

SafeImage.displayName = 'SafeImage';
