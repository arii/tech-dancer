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

  // At this point, imageList.length >= 2. We want to show both sides.
  // Find the primary image that matches the requested featuredSide (or default to the first image)
  const primary = imageList.find(
    (img) => img.label.toLowerCase() === primaryViewSide
  ) ?? imageList[0];

  // Find the secondary image (the other image)
  const secondary = imageList.find((img) => img.src !== primary.src) ?? imageList[1];

  // If displayMode is 'pair', keep 'pair' but use our primary and secondary (which respects featuredSide).
  // If displayMode is 'featured', use 'featured'.
  // If displayMode is 'single' (or undefined), upgrade it to 'featured' to show both sides.
  const resolvedDisplayMode = displayMode === 'pair' ? 'pair' : 'featured';

  return {
    primary,
    secondary,
    displayMode: resolvedDisplayMode,
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

export interface MerchCardImageConfig {
  primaryImage: { src: string; label: string; alt: string };
  secondaryImage?: { src: string; label: string; alt: string };
}

/**
 * Resolve display images for card layout.
 * Grid cards show a large primary image and a small inset secondary image.
 */
export function getMerchCardImageConfig(
  imageUrl: string,
  imageBack?: string,
  displayMode?: MerchDisplayMode | string,
  featuredSide?: MerchFeaturedSide | string,
): MerchCardImageConfig {
  const primarySide = featuredSide || 'front';
  const showInset = displayMode ? (displayMode !== 'single') : !!imageBack;

  const frontView = {
    src: imageUrl,
    label: 'Front',
    alt: 'Front view',
  };

  const backView = imageBack ? {
    src: imageBack,
    label: 'Back',
    alt: 'Back view',
  } : undefined;

  if (primarySide.toLowerCase() === 'back' && backView) {
    return {
      primaryImage: backView,
      secondaryImage: showInset ? frontView : undefined,
    };
  }

  return {
    primaryImage: frontView,
    secondaryImage: showInset ? backView : undefined,
  };
}
