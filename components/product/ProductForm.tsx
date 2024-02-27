import React from 'react';
import { useProduct } from '@/contexts/Product';
import { AddToCart } from '../ui';

const ProductForm: React.FC = () => {
  const { selectedVariant } = useProduct();
  return (
    <div>
      <div>
        <span>Quantity</span>
      </div>
      <div>
        <AddToCart
          availableForSale={selectedVariant.availableForSale}
          merchandiseId={selectedVariant.id}
        />
      </div>
    </div>
  );
};

export default ProductForm;
