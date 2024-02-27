'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Button } from '@/components/ui';
import { useProduct } from '@/contexts/Product';
import { flattenConnection } from '@/utils/helpers';
import type { MediaConnection, MediaImage } from '@/types/storefront';
import Placeholder from '../ui/Placeholder';

type FeaturedMediaProps = {
  featuredMedia: MediaImage;
};
const FeaturedMedia: React.FC<FeaturedMediaProps> = ({ featuredMedia }) => (
  <div className="relative flex aspect-product items-center justify-center">
    {featuredMedia.image && (
      <Image
        priority
        src={featuredMedia.image.url}
        fill
        alt={featuredMedia.image.altText ?? 'Variant Image'}
        className="h-auto w-auto object-contain"
        sizes="(max-width: 768px) 700px, 400px"
      />
    )}
  </div>
);

type ProductMediaProps = {
  media: MediaConnection;
};

const ProductMedia: React.FC<ProductMediaProps> = ({ media }) => {
  const { selectedVariant } = useProduct();
  const mediaImages: MediaImage[] = flattenConnection(media).filter(
    (_media) => _media.mediaContentType === 'IMAGE'
  );
  let initialImage = mediaImages[0];
  if (selectedVariant.image) {
    const selectedImageFromVariant = mediaImages.find(
      (_media) =>
        _media.image &&
        selectedVariant.image &&
        _media.image.url === selectedVariant.image.url
    );
    if (selectedImageFromVariant) {
      initialImage = selectedImageFromVariant;
    }
  }

  const [selectedImage, setSelectedImage] = useState<MediaImage>(initialImage);

  useEffect(() => {
    if (selectedVariant.image) {
      const selectedImageFromVariant = mediaImages.find(
        (_media) =>
          _media.image &&
          selectedVariant.image &&
          _media.image.url === selectedVariant.image.url
      );
      if (selectedImageFromVariant) {
        setSelectedImage(selectedImageFromVariant);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant]);
  return (
    <div>
      <div>
        <FeaturedMedia featuredMedia={selectedImage} />
      </div>
      <div className="mt-5 grid grid-cols-4 gap-x-2 gap-y-3">
        {mediaImages.map((mediaItem) => (
          <Button
            isUnstyled
            className={clsx(
              'relative aspect-product',
              selectedImage.id === mediaItem.id && 'border-4 border-primary'
            )}
            key={mediaItem.id}
            onClick={() => setSelectedImage(mediaItem)}
          >
            {mediaItem.image ? (
              <Image
                fill
                src={mediaItem.image.url}
                alt={mediaItem.image.altText ?? 'Product image'}
                className="h-auto w-auto object-contain"
                sizes="(max-width: 768px) 180px, 120px"
              />
            ) : (
              <Placeholder />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductMedia;
