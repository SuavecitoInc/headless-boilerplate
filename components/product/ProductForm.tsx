'use client';

import React, { useState } from 'react';
import { useProduct } from '@/contexts/Product';
import { AddToCart, Quantity, Money } from '@/components/ui';

const ProductForm: React.FC = () => {
  const { selectedVariant } = useProduct();
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div>
      <div className="mb-2.5">
        <Money
          className="text-[26px] font-bold md:text-[30px]"
          data={selectedVariant.price}
        />
      </div>
      <Quantity
        currentQuantity={quantity}
        setQuantity={setQuantity}
        className="mb-2.5"
      />
      <AddToCart
        availableForSale={selectedVariant.availableForSale}
        merchandiseId={selectedVariant.id}
        quantity={quantity}
      />
    </div>
  );
};

export default ProductForm;
