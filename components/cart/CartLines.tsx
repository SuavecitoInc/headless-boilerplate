'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Divider, Placeholder, Money } from '@/components/ui';
import { CartLine } from '@/types/storefront';
import { formatMoney, isDiscounted } from '@/utils/helpers';
import CartQuantity from './CartQuantity';
import CartRemove from './CartRemove';

type CartLineItemProps = {
  lineItem: CartLine;
};
const CartLineItem: React.FC<CartLineItemProps> = ({ lineItem }) => {
  const { merchandise, discountAllocations } = lineItem;
  const variantId = merchandise.id.replace('gid://shopify/ProductVariant/', '');
  const link = `/products/${merchandise.product.handle}?variant=${variantId}`;
  const hasOptions =
    merchandise.selectedOptions && merchandise.selectedOptions.length > 0;
  const hasDiscounts = discountAllocations && discountAllocations.length > 0;
  const compareAtTotal = lineItem.cost.compareAtAmountPerQuantity
    ? Number(
        lineItem.cost.compareAtAmountPerQuantity.amount * lineItem.quantity
      )
    : 0;
  return (
    <div className="flex gap-2 md:gap-8">
      <Link
        href={link}
        className="relative aspect-product h-full w-full max-w-[35%] hover:opacity-hover md:max-w-[200px]"
      >
        {merchandise.image ? (
          <Image
            fill
            className="h-auto w-auto object-contain"
            src={merchandise.image.url}
            alt={merchandise.image.altText ?? 'Line Item'}
            sizes="(max-width: 768px) 300px, 40vw"
          />
        ) : (
          <Placeholder />
        )}
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="mb-[5px] md:mb-[10px]">
          <Link href={link}>
            <span className="text-copy font-bold leading-normal hover:opacity-hover md:text-[22px]">
              {merchandise.product.title}
            </span>
          </Link>
        </div>
        <div className="flex justify-between">
          <div>
            {hasOptions && (
              <div className="mb-[10px] flex flex-col gap-[1px] leading-tight md:gap-1 md:text-[18px]">
                {merchandise.selectedOptions
                  .filter(
                    (option) =>
                      option.name !== 'Title' &&
                      option.value !== 'Default Title'
                  )
                  .map((option) => (
                    <div key={option.name}>
                      <span>
                        {option.name}: {option.value}
                      </span>
                    </div>
                  ))}
              </div>
            )}
            <CartRemove lineItem={lineItem} />
          </div>
          <div className="flex flex-col items-end justify-end gap-2 lg:flex-row lg:items-baseline lg:gap-6">
            <div className="flex items-center justify-center gap-1 leading-normal md:text-[18px]">
              {hasDiscounts ? (
                <>
                  <Money data={discountAllocations[0].discountedAmount} />
                  <Money
                    data={lineItem.cost.amountPerQuantity}
                    strikethrough
                    className="text-tertiary"
                  />
                </>
              ) : (
                <>
                  <Money data={lineItem.cost.amountPerQuantity} />
                  {lineItem.cost.compareAtAmountPerQuantity &&
                    isDiscounted(
                      lineItem.cost.amountPerQuantity,
                      lineItem.cost.compareAtAmountPerQuantity
                    ) && (
                      <Money
                        data={lineItem.cost.compareAtAmountPerQuantity}
                        strikethrough
                        className="text-tertiary"
                      />
                    )}
                </>
              )}
            </div>
            <CartQuantity lineItem={lineItem} />
            <div className="flex items-center gap-1 font-bold leading-normal md:text-[18px]">
              {Number(lineItem.cost.totalAmount.amount) <
              Number(lineItem.cost.subtotalAmount.amount) ? (
                <>
                  <Money data={lineItem.cost.totalAmount} />
                  <Money
                    data={lineItem.cost.subtotalAmount}
                    strikethrough
                    className="text-tertiary"
                  />
                </>
              ) : (
                <>
                  <Money data={lineItem.cost.subtotalAmount} />
                  {compareAtTotal > 0 &&
                    compareAtTotal >
                      Number(lineItem.cost.subtotalAmount.amount) && (
                      <Money
                        data={{
                          amount: formatMoney(String(compareAtTotal)),
                          currencyCode:
                            lineItem.cost.subtotalAmount.currencyCode,
                        }}
                        strikethrough
                        className="text-tertiary"
                      />
                    )}
                </>
              )}
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
