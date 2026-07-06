
import * as React from 'react';
import { Box, BoxProps } from '@/layouts/Primitives';
import { normalizeAsset } from '@/lib/content';

/**
 * Validates if a URL is safe based on a protocol whitelist.
 * Allows only http:, https:, or relative paths.
 */
const isSafeUrl = (url: string): boolean => {
  if (!url) return false;
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../') || url.startsWith('blob:')) return true;

  // Basic check for common dangerous protocols
  const lowerUrl = url.toLowerCase().trim();
  if (lowerUrl.startsWith('javascript:') || lowerUrl.startsWith('data:') || lowerUrl.startsWith('vbscript:')) {
    return false;
  }

  try {
    // If it's a valid absolute URL, check the protocol
    const parsed = new URL(url);
    return ['http:', 'https:', 'blob:'].includes(parsed.protocol);
  } catch {
    // If URL parsing fails, it's likely a relative path (e.g., "image.jpg").
    // We consider it safe if it doesn't contain a protocol-like colon before a slash.
    const colonIndex = url.indexOf(':');
    const slashIndex = url.indexOf('/');

    // Relative paths won't have a colon before the first slash (if any)
    // e.g., "path/to/img.jpg" -> colon -1, slash 4 -> safe
    // e.g., "img.jpg" -> colon -1, slash -1 -> safe
    // e.g., "http://bad" -> colon 4, slash 5 -> unsafe (but handled by URL constructor)
    // e.g., "javascript:alert" -> colon 10, slash -1 -> unsafe
    if (colonIndex === -1) return true;
    if (slashIndex !== -1 && colonIndex > slashIndex) return true;

    return false;
  }
};

/**
 * Whitelist of standard HTML <img> attributes to prevent event handler injection.
 * Includes style and className to allow Primitives to work correctly.
 */
const SAFE_IMAGE_ATTRS = new Set([
  'src', 'alt', 'title', 'loading', 'srcSet', 'sizes', 'useMap', 'width', 'height', 'crossOrigin', 'referrerPolicy', 'style', 'className'
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
  ({ src, alt, fallbackSrc, objectFit, ...boxProps }, ref) => {
    const normalizedSrc = normalizeAsset(src || '');
    const isSafe = normalizedSrc ? isSafeUrl(normalizedSrc) : false;
    const finalSrc = isSafe ? normalizedSrc : fallbackSrc;

    const isExternal = finalSrc?.startsWith('http');

    // Separate whitelisted attributes from layout props
    const imgAttributes: Record<string, unknown> = {};
    const layoutProps: Record<string, unknown> = {};

    Object.entries(boxProps).forEach(([key, value]) => {
      // Handle crossOrigin and style specifically below to avoid lint issues and ensure correct behavior
      if (key === 'crossOrigin' || key === 'style') return;

      if (SAFE_IMAGE_ATTRS.has(key)) {
        imgAttributes[key] = value;
      } else if (PRIMITIVE_PROPS.has(key)) {
        layoutProps[key] = value;
      }
      // Any other props (like 'onerror') are dropped
    });

    const finalStyle: React.CSSProperties = {
      objectFit: objectFit || 'contain',
      ...(boxProps.style as React.CSSProperties)
    };

    // Determine external asset policies
    const externalPolicies: Record<string, unknown> = {};
    if (isExternal) {
      externalPolicies.referrerPolicy = "no-referrer";

      // Default to anonymous for external, but allow explicit override (including null to disable)
      if (boxProps.crossOrigin !== null) {
        externalPolicies.crossOrigin = (boxProps.crossOrigin as SafeImageProps['crossOrigin']) || "anonymous";
      }
    }

    return (
      <Box
        ref={ref}
        as="img"
        src={finalSrc}
        alt={alt}
        {...externalPolicies}
        {...layoutProps}
        {...imgAttributes}
        style={finalStyle}
      />
    );
  }
);

SafeImage.displayName = 'SafeImage';
