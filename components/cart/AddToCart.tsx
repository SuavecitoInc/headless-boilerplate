'use client';

import React, { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { addToCart } from '@/app/cart/actions';
import { CartLine } from '@/types/storefront';
import Button, { ButtonProps } from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { CartToast } from '@/components/toast';

type AddToCartButtonProps = Omit<ButtonProps, 'children'> & {
  disabled: boolean;
};
const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  disabled,
  ...props
}) => {
  const { pending } = useFormStatus();

  const buttonText = disabled ? 'Sold Out' : 'Add To Cart';
  return (
    <Button
      {...props}
      disabled={disabled}
      isSubmit
      className="inline-flex items-center justify-center min-w-[120px] h-[40px]"
    >
      {pending ? (
        <Spinner size="tiny" />
      ) : (
        <span className="uppercase">{buttonText}</span>
      )}
    </Button>
  );
};

type AddToCartProps = Omit<ButtonProps, 'children' | 'isSubmit'> & {
  merchandiseId: string;
  quantity?: number;
  availableForSale: boolean;
};

const AddToCart: React.FC<AddToCartProps> = ({
  merchandiseId,
  quantity = 1,
  availableForSale,
  ...props
}) => {
  const [addedProduct, setAddedProduct] = useState<CartLine | null>(null);
  const cartInput = [{ merchandiseId, quantity }];

  const disabled = props.disabled || !availableForSale;
  return (
    <>
      <CartToast
        addedProduct={addedProduct}
        setAddedProduct={setAddedProduct}
      />
      <form
        action={async () => {
          const added = await addToCart(cartInput);
          setAddedProduct(added);
        }}
      >
        <AddToCartButton {...props} disabled={disabled} />
      </form>
    </>
  );
};

export default AddToCart;
