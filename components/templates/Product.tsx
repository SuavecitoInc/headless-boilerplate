'use client';

import React from 'react';
import { useProduct } from '@/contexts/Product';
import { Product as ProductType } from '@/types/storefront';
import {
  ProductMedia,
  ProductOptions,
  ProductForm,
} from '@/components/product';

type ProductProps = {
  data: ProductType;
};

const Product: React.FC<ProductProps> = ({ data }) => {
  const { selectedVariant } = useProduct();
  const { title, media, options } = data;
  return (
    <div>
      <div className="flex [&>*]:flex-1">
        <ProductMedia media={media} />
        <div>
          <h1>{title}</h1>
          <p>{selectedVariant.id}</p>
          <ProductOptions options={options} />
          <ProductForm />
        </div>
      </div>
    </div>
  );
};

export default Product;
