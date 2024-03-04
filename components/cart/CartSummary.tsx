import React from 'react';
import clsx from 'clsx';
import { Money } from '@/components/ui';
import { buttonClasses } from '@/components/ui/Button';
import type { Cart as CartType } from '@/types/storefront';

type CartSummaryProps = {
  cart: CartType;
};
const CartSummary: React.FC<CartSummaryProps> = ({ cart }) => {
  const { checkoutUrl } = cart;
  const subtotal = cart.cost.subtotalAmount;
  return (
    <div className="mt-[20px] flex flex-col items-end">
      <div className="mb-[10px] text-[22px] leading-normal md:text-[26px] md:leading-[39px]">
        <span className="leading-normal">Subtotal:</span>
        <Money data={subtotal} className="ml-5 font-bold leading-normal" />
      </div>
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
