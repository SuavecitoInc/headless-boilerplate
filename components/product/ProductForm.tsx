import React from 'react';
import { useProduct } from '@/contexts/Product';
import { AddToCart } from '../ui';

const QuantitySelector: React.FC = () => {
  return (
    <div>
      <span>Quantity</span>
    </div>
  );
};

const ProductForm: React.FC = () => {
  const { selectedVariant } = useProduct();
  return (
    <div>
      <QuantitySelector />
      <AddToCart
        availableForSale={selectedVariant.availableForSale}
        merchandiseId={selectedVariant.id}
      />
    </div>
  );
};

export default ProductForm;
