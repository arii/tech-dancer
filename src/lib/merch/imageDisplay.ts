/**
 * Merch image display utilities for flexible product layouts.
 * Supports single, pair, and featured display modes.
 */

import { MerchImageView, MerchDisplayMode, MerchFeaturedSide } from '@/lib/types/content';

export interface MerchImageConfig {
  primary?: MerchImageView;
  secondary?: MerchImageView;
  displayMode: MerchDisplayMode;
  featuredSide: MerchFeaturedSide;
}

/**
 * Determine the best display mode and layout for merch product images.
 *
 * Rules:
 * - "single": One image only (front-only or back-only products)
 * - "pair": Two equally important images side by side (both front and back matter)
 * - "featured": Primary image large, secondary as small inset thumbnail
 */
export function getMerchImageConfig(
  images?: MerchImageView[],
  displayMode?: MerchDisplayMode,
  featuredSide?: MerchFeaturedSide,
): MerchImageConfig {
  const primaryViewSide = featuredSide || 'front';
  const imageList = images ?? [];

  // If display mode is explicitly set, respect it
  if (displayMode === 'pair' && imageList.length >= 2) {
    return {
      primary: imageList[0],
      secondary: imageList[1],
      displayMode: 'pair',
      featuredSide: primaryViewSide,
    };
  }

  // If display mode is explicitly set to featured or single, respect it
  if (displayMode === 'featured' || displayMode === 'single') {
    const primary = imageList.find(
      (img) => img.label.toLowerCase() === primaryViewSide
    ) ?? imageList[0];

    const secondary = imageList.find((img) => img.src !== primary?.src);

    return {
      primary,
      secondary: displayMode === 'featured' ? secondary : undefined,
      displayMode,
      featuredSide: primaryViewSide,
    };
  }

  // Auto-detect display mode based on available images
  if (imageList.length === 0) {
    return {
      displayMode: 'single',
      featuredSide: primaryViewSide,
    };
  }

  if (imageList.length === 1) {
    return {
      primary: imageList[0],
      displayMode: 'single',
      featuredSide: primaryViewSide,
    };
  }

  // Multiple images available
  const primary = imageList.find((img) => img.label.toLowerCase() === primaryViewSide) ?? imageList[0];
  const secondary = imageList.find((img) => img.src !== primary?.src);

  // If both front and back are present, decide between "pair" or "featured"
  if (imageList.length >= 2) {
    // By default, use "featured" (primary large + secondary small inset)
    // unless explicitly set to "pair"
    return {
      primary,
      secondary,
      displayMode: 'featured',
      featuredSide: primaryViewSide,
    };
  }

  return {
    primary,
    secondary,
    displayMode: 'single',
    featuredSide: primaryViewSide,
  };
}

/**
 * Get CSS class name for the container based on display mode.
 */
export function getMerchImageContainerClass(displayMode: MerchDisplayMode): string {
  switch (displayMode) {
    case 'single':
      return 'merch-image-single';
    case 'pair':
      return 'merch-image-pair';
    case 'featured':
      return 'merch-image-featured';
    default:
      return 'merch-image-single';
  }
}

/**
 * Fallback for products using old `image` and `imageBack` fields.
 * Converts legacy format to new MerchImageView[] format.
 */
export function legacyImageToMerchImages(
  image?: string,
  imageBack?: string
): MerchImageView[] {
  const images: MerchImageView[] = [];

  if (image) {
    images.push({
      src: image,
      label: 'Front',
      alt: 'Front view',
    });
  }

  if (imageBack) {
    images.push({
      src: imageBack,
      label: 'Back',
      alt: 'Back view',
    });
  }

  return images;
}
