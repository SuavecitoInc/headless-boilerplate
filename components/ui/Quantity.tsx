'use client';

import React, { useCallback } from 'react';
import Button from './Button';
import { IconPlus, IconMinus } from './Icons';

const MAX_QUANTITY = 30;

type QuantityProps = {
  currentQuantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

const Quantity: React.FC<QuantityProps> = ({
  currentQuantity,
  setQuantity,
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
    <div className="flex items-center gap-4">
      <Button isUnstyled onClick={decrement} aria-label="Decrement quantity">
        <IconMinus />
      </Button>
      <span>{currentQuantity}</span>
      <Button isUnstyled onClick={increment} aria-label="Increment quantity">
        <IconPlus />
      </Button>
    </div>
  );
};

export default Quantity;
