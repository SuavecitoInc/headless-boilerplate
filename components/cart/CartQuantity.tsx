'use client';

import React, { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import clsx from 'clsx';
import { Button, IconMinus, IconPlus } from '@/components/ui';
import { updateCart } from '@/app/cart/actions';
import type { CartLine } from '@/types/storefront';

type QuantityButtonProps = {
  type: 'minus' | 'plus';
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const QuantityButton: React.FC<QuantityButtonProps> = ({
  type,
  setIsLoading,
}) => {
  const { pending } = useFormStatus();
  useEffect(() => {
    setIsLoading(pending);
  }, [pending, setIsLoading]);
  return (
    <Button
      className="hover:opacity-hover p-2"
      isSubmit
      isUnstyled
      disabled={pending}
    >
      {type === 'minus' ? <IconMinus size="13" /> : <IconPlus size="13" />}
    </Button>
  );
};

type QuantityProps = {
  lineItem: CartLine;
};
const Quantity: React.FC<QuantityProps> = ({ lineItem }) => {
  const { quantity } = lineItem;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className={clsx(
        'flex items-center border rounded-[4px] border-primary',
        isLoading && 'cursor-not-allowed'
      )}
    >
      <form
        className="flex border-primary border-r"
        action={() => {
          updateCart([{ id: lineItem.id, quantity: quantity - 1 }]);
        }}
      >
        <QuantityButton type="minus" setIsLoading={setIsLoading} />
      </form>
      <div className="px-2 text-sm">
        <span>{quantity}</span>
      </div>

      <form
        className="flex border-primary border-l"
        action={() => {
          updateCart([{ id: lineItem.id, quantity: quantity + 1 }]);
        }}
      >
        <QuantityButton type="plus" setIsLoading={setIsLoading} />
      </form>
    </div>
  );
};

export default Quantity;
