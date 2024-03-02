import React from 'react';
import { Divider, Heading } from '@/components/ui';
import { CartEmpty, CartLines, CartSummary } from '@/components/cart';

import type { Cart as CartType } from '@/types/storefront';
import { flattenConnection } from '@/utils/helpers';

type CartTemplateProps = {
  cart: CartType | null;
};
const CartTemplate: React.FC<CartTemplateProps> = ({ cart }) => {
  const lines = !cart ? [] : flattenConnection(cart.lines);
  const isEmpty = !cart || lines.length === 0;

  return (
    <div>
      <Heading type="h1">Your Cart</Heading>
      <Divider className="my-[15px]" />
      <div className="mx-auto max-w-screen-xl md:px-4">
        {isEmpty ? (
          <CartEmpty />
        ) : (
          <>
            <CartLines lineItems={lines} />
            <CartSummary cart={cart} />
          </>
        )}
      </div>
    </div>
  );
};
export default CartTemplate;
