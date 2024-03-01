'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Divider, Placeholder } from '@/components/ui';
import { CartLine } from '@/types/storefront';
import CartQuantity from './CartQuantity';
import CartRemove from './CartRemove';

type CartLineItemProps = {
  lineItem: CartLine;
};
const CartLineItem: React.FC<CartLineItemProps> = ({ lineItem }) => {
  const { merchandise } = lineItem;
  const variantId = merchandise.id.replace('gid://shopify/ProductVariant/', '');
  const link = `/products/${merchandise.product.handle}?variant=${variantId}`;
  return (
    <div className="flex gap-2 md:gap-8">
      <Link
        href={link}
        className="relative aspect-product h-full w-full max-w-[35%] md:max-w-[200px] hover:opacity-hover"
      >
        {merchandise.image ? (
          <Image
            fill
            className="h-auto w-auto object-contain"
            src={merchandise.image.url}
            alt={merchandise.image.altText ?? 'Line Item'}
          />
        ) : (
          <Placeholder />
        )}
      </Link>
      <div className="flex flex-col flex-1">
        <div className="mb-[5px] md:mb-[10px]">
          <Link href={link}>
            <span className="text-copy font-bold leading-normal md:text-[22px] hover:opacity-hover">
              {merchandise.product.title}
            </span>
          </Link>
        </div>
        <div className="flex justify-between">
          <div>
            <div className="mb-[10px] flex flex-col gap-[1px] leading-tight md:gap-1 md:text-[18px]">
              {merchandise.selectedOptions
                .filter(
                  (option) =>
                    option.name !== 'Title' && option.value !== 'Default Title'
                )
                .map((option) => (
                  <div key={option.name}>
                    <span>
                      {option.name}: {option.value}
                    </span>
                  </div>
                ))}
            </div>

            <CartRemove lineItem={lineItem} />
          </div>
          <div className="flex flex-col lg:gap-6 items-end gap-2 justify-end lg:items-baseline lg:flex-row">
            <div className="leading-normal md:text-[18px]">
              <span>${lineItem.cost.amountPerQuantity.amount}</span>
            </div>
            <CartQuantity lineItem={lineItem} />
            <div className="font-bold leading-normal md:text-[18px]">
              <span>${lineItem.cost.subtotalAmount.amount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type CartLinesProps = {
  lineItems: CartLine[];
};
const CartLines: React.FC<CartLinesProps> = ({ lineItems }) => (
  <div className="flex flex-col gap-3 md:gap-4">
    {lineItems.map((lineItem) => (
      <div key={lineItem.id}>
        <CartLineItem lineItem={lineItem} />
        <Divider className="mt-[20px]" />
      </div>
    ))}
  </div>
);

export default CartLines;
