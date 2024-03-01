import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Placeholder, Money } from '@/components/ui';
import type { Product as ProductType } from '@/types/storefront';

type Props = {
  product: ProductType;
};
const ProductCard: React.FC<Props> = ({ product }) => {
  const { title, featuredImage, priceRange, handle } = product;
  return (
    <div>
      <Link
        className="relative aspect-product block hover:opacity-hover"
        href={`/products/${handle}`}
      >
        {featuredImage ? (
          <Image
            src={featuredImage.url}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <Placeholder />
        )}
      </Link>
      <Link
        href={`/products/${handle}`}
        className="text-primary hover:underline"
      >
        <span>{title}</span>
      </Link>
      <div>
        <span>from </span>
        <Money data={priceRange.minVariantPrice} />
      </div>
    </div>
  );
};

export default ProductCard;
