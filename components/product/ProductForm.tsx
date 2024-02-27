'use client';

import React, { useState } from 'react';
import { useProduct } from '@/contexts/Product';
import { AddToCart, Quantity } from '@/components/ui';

const ProductForm: React.FC = () => {
  const { selectedVariant } = useProduct();
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div>
      <Quantity currentQuantity={quantity} setQuantity={setQuantity} />
      <AddToCart
        availableForSale={selectedVariant.availableForSale}
        merchandiseId={selectedVariant.id}
        quantity={quantity}
      />
    </div>
  );
};

export default ProductForm;
