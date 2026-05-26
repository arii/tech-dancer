import { MerchImageView } from '@/lib/types/content';
import styles from './MerchImages.module.css';

interface MerchImageSingleProps {
  image: MerchImageView;
}

export function MerchImageSingle({ image }: MerchImageSingleProps) {
  return (
    <div className={styles.merch_image_single}>
      <img src={image.src} alt={image.alt} width={480} height={480} />
      <span aria-hidden="true">{image.label}</span>
    </div>
  );
}

interface MerchImagePairProps {
  images: MerchImageView[];
}

export function MerchImagePair({ images }: MerchImagePairProps) {
  return (
    <div className={styles.merch_image_pair}>
      {images.slice(0, 2).map((image) => (
        <figure key={image.src}>
          <img src={image.src} alt={image.alt} width={320} height={400} />
          <figcaption>{image.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

interface MerchImageFeaturedProps {
  primary: MerchImageView;
  secondary?: MerchImageView;
}

export function MerchImageFeatured({ primary, secondary }: MerchImageFeaturedProps) {
  return (
    <div className={styles.merch_image_featured}>
      <img src={primary.src} alt={primary.alt} width={480} height={480} />

      {secondary && (
        <div className={styles.merch_image_inset}>
          <img src={secondary.src} alt={secondary.alt} width={160} height={200} />
          <span>{secondary.label}</span>
        </div>
      )}
    </div>
  );
}
