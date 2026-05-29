import type {
  MerchImageDisplayMode,
  MerchProductImage,
} from '@/data/products/catalog';

export interface ResolvedMerchImages {
  mode: MerchImageDisplayMode;
  primary?: MerchProductImage;
  secondary?: MerchProductImage;
  equal: MerchProductImage[];
}

export function resolveMerchImages(args: {
  title: string;
  images: MerchProductImage[];
  imageDisplayMode?: MerchImageDisplayMode;
}): ResolvedMerchImages {
  const images = args.images;

  const mode = args.imageDisplayMode ?? 'single';
  const front = images.find((image) => image.side === 'front');
  const back = images.find((image) => image.side === 'back');

  if (mode === 'both-equal') {
    const equalImages = front && back ? [front, back] : images.slice(0, 2);
    return {
      mode,
      primary: undefined,
      secondary: undefined,
      equal: equalImages,
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

  return {
    mode: 'single',
    primary: images[0],
    secondary: undefined,
    equal: [],
  };
}
