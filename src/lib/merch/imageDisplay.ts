import type { MerchImageDisplayMode, MerchProductImage } from '../../data/products/catalog';

export interface ResolvedMerchImages {
  mode: MerchImageDisplayMode;
  primary?: MerchProductImage;
  secondary?: MerchProductImage;
  equal: MerchProductImage[];
}

export function legacyImageToMerchImages(imageUrl: string, alt: string): MerchProductImage[] {
  return [{ src: imageUrl, side: 'front', alt }];
}

export function resolveMerchImages(args: {
  title: string;
  imageUrl: string;
  images?: MerchProductImage[];
  imageDisplayMode?: MerchImageDisplayMode;
}): ResolvedMerchImages {
  const images = args.images?.length
    ? args.images
    : legacyImageToMerchImages(args.imageUrl, `${args.title} product image`);

  const mode = args.imageDisplayMode ?? 'front-only';
  const front = images.find((image) => image.side === 'front');
  const back = images.find((image) => image.side === 'back');

  if (mode === 'both-equal') {
    const primary = front ?? images[0];
    const secondary = back ?? images.find((image) => image.src !== primary?.src);

    return {
      mode,
      primary,
      secondary,
      equal: [primary, secondary].filter((image): image is MerchProductImage => Boolean(image)).slice(0, 2),
    };
  }

  if (mode === 'back-prominent') {
    return {
      mode,
      primary: back ?? images[0],
      secondary: front,
      equal: [],
    };
  }

  if (mode === 'front-prominent') {
    return {
      mode,
      primary: front ?? images[0],
      secondary: back,
      equal: [],
    };
  }

  if (mode === 'back-only') {
    return {
      mode,
      primary: back ?? images[0],
      secondary: undefined,
      equal: [],
    };
  }

  return {
    mode: 'front-only',
    primary: front ?? images[0],
    secondary: undefined,
    equal: [],
  };
}
