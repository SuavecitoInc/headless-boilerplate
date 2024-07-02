'use client';

import React, { useState } from 'react';
import { useProduct } from '@/contexts/Product';
import { Quantity, Money } from '@/components/ui';
import { AddToCart } from '@/components/cart';
import { isDiscounted } from '@/utils/helpers';

const ProductForm: React.FC = () => {
  const { selectedVariant } = useProduct();
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div>
      <div className="mb-2.5 flex flex-wrap gap-x-2 gap-y-1">
        <Money
          className="text-[26px] font-bold md:text-[30px]"
          data={selectedVariant.price}
        />
        {selectedVariant.compareAtPrice &&
          isDiscounted(
            selectedVariant.price,
            selectedVariant.compareAtPrice
          ) && (
            <Money
              className="text-[26px] font-bold text-zinc-400 line-through md:text-[30px]"
              data={selectedVariant.compareAtPrice}
            />
          )}
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
