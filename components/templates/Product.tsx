'use client';

import React from 'react';
import { Product as ProductType } from '@/types/storefront';

type ProductProps = {
  data: ProductType;
  variantId: string | undefined;
};

const Product: React.FC<ProductProps> = ({ data, variantId }) => {
  const { title } = data;
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default Product;
