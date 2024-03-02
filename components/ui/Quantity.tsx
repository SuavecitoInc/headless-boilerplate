'use client';

import React, { useCallback } from 'react';
import clsx from 'clsx';
import Button from './Button';
import { IconPlus, IconMinus } from './Icons';

const MAX_QUANTITY = 30;

type QuantityProps = {
  currentQuantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
};

const Quantity: React.FC<QuantityProps> = ({
  currentQuantity,
  setQuantity,
  className = '',
}) => {
  const increment = useCallback(() => {
    if (currentQuantity < MAX_QUANTITY) {
      setQuantity(currentQuantity + 1);
    } else {
      setQuantity(MAX_QUANTITY);
    }
  }, [currentQuantity, setQuantity]);

  const decrement = useCallback(() => {
    if (currentQuantity > 1) {
      setQuantity(currentQuantity - 1);
    } else {
      setQuantity(1);
    }
  }, [currentQuantity, setQuantity]);

  return (
    <div className="flex">
      <div
        className={clsx(
          'flex [&>*:nth-child(odd)]:p-2 items-center border rounded-[4px] border-primary',
          className
        )}
      >
        <div className="border-r border-primary">
          <Button
            isUnstyled
            onClick={decrement}
            aria-label="Decrement quantity"
          >
            <IconMinus size="14" />
          </Button>
        </div>
        <div className="min-w-[45px] mx-auto text-center w-full">
          <span className="px-2.5 text-sm">{currentQuantity}</span>
        </div>
        <div className="border-l border-primary">
          <Button
            isUnstyled
            onClick={increment}
            aria-label="Increment quantity"
          >
            <IconPlus size="14" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quantity;
