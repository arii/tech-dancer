
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
    // Construct a URL with a dummy base to reliably extract the protocol even for relative paths
    const parsed = new URL(url, 'http://localhost');
    return ['http:', 'https:', 'blob:'].includes(parsed.protocol);
  } catch {
    // If it still fails parsing, it's completely malformed
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
 * TODO: Keep this synchronized with BoxProps in `src/layouts/Box.tsx`.
 * If new props are added to Box, they must be added here to avoid layout regressions.
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
  objectPosition?: string;
}

/**
 * A security-hardened image component that enforces protocol whitelisting,
 * prop filtering, and external asset policies by default.
 */
export const SafeImage = React.forwardRef<HTMLImageElement, SafeImageProps>(
  ({ src, alt, fallbackSrc, objectFit, objectPosition, className, style, crossOrigin, ...boxProps }, ref) => {
    const [hasError, setHasError] = React.useState(false);
    const normalizedSrc = normalizeAsset(src || '');
    const isSafe = normalizedSrc ? isSafeUrl(normalizedSrc) : false;

    // If the URL is unsafe, or if a load error occurred and a fallback exists
    const finalSrc = (!isSafe || hasError) ? fallbackSrc : normalizedSrc;

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
      objectPosition: objectPosition,
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

    const handleError = () => {
      if (!hasError) setHasError(true);
    };

    // If we have an error and no fallback, we return null to avoid showing a broken image icon
    if (hasError && !fallbackSrc) {
      return null;
    }

    return (
      <Box
        ref={ref}
        as="img"
        src={finalSrc}
        alt={alt}
        className={className}
        style={finalStyle}
        onError={handleError}
        {...externalPolicies}
        {...layoutProps}
        {...imgAttributes}
      />
    );
  }
);

SafeImage.displayName = 'SafeImage';
