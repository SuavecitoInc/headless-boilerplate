import React from 'react';
import Script from 'next/script';
import type { Product as ProductType } from '@/types/storefront';

type JsonLdProps = {
  product: ProductType;
};
const ProductJsonLd: React.FC<JsonLdProps> = ({ product }) => {
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage ? product.featuredImage.url : '',
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <Script id={product.id} type="application/ld+json">
      {JSON.stringify(payload)}
    </Script>
  );
};

export default ProductJsonLd;
