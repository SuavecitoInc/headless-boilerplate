import React from 'react';
import clsx from 'clsx';
import { Money } from '@/components/ui';
import { buttonClasses } from '@/components/ui/Button';
import type { Cart as CartType } from '@/types/storefront';
import { formatMoney } from '@/utils/helpers';

type CartSummaryProps = {
  cart: CartType;
};
const CartSummary: React.FC<CartSummaryProps> = ({ cart }) => {
  const { checkoutUrl, discountAllocations } = cart;
  const subtotal = cart.cost.subtotalAmount;
  const total = cart.cost.totalAmount;
  const hasDiscounts = discountAllocations && discountAllocations.length > 0;
  const totalDiscountAmount = discountAllocations.reduce(
    (acc, discountAllocation) =>
      acc + Number(discountAllocation.discountedAmount.amount),
    0
  );
  return (
    <div className="mt-[20px] flex flex-col items-end">
      <div className="mb-[10px] text-[22px] leading-normal md:text-[26px] md:leading-[39px]">
        <span className="leading-normal">Subtotal:</span>
        <Money data={subtotal} className="ml-5 font-bold leading-normal" />
      </div>
      {hasDiscounts && totalDiscountAmount > 0 && (
        <>
          <div className="mb-[10px] text-[22px] leading-normal md:text-[26px] md:leading-[39px]">
            <span className="leading-normal">Discounts:</span>
            <Money
              isNegative
              data={{
                amount: formatMoney(String(totalDiscountAmount)),
                currencyCode: total.currencyCode,
              }}
              className="ml-5 font-bold leading-normal"
            />
          </div>
          <div className="mb-[10px] text-[22px] leading-normal md:text-[26px] md:leading-[39px]">
            <span className="leading-normal">Total:</span>
            <Money data={total} className="ml-5 font-bold leading-normal" />
          </div>
        </>
      )}
      <span className="mb-[12px] text-sm italic leading-normal md:text-base">
        Shipping &amp; taxes calculated at checkout
      </span>
      <div className="flex">
        {checkoutUrl !== '' && (
          <a
            className={clsx(buttonClasses, 'px-9 text-[18px]')}
            href={checkoutUrl}
          >
            <span className="uppercase">Checkout</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
