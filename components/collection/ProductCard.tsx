import React from 'react';
import type { Product as ProductType } from '@/types/storefront';

type Props = {
  product: ProductType;
};
const ProductCard: React.FC<Props> = ({ product }) => {
  const { title } = product;
  return (
    <div>
      <span>{title}</span>
    </div>
  );
};

export default ProductCard;
