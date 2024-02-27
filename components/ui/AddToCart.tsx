import React from 'react';
import { useFormStatus } from 'react-dom';
import Button, { ButtonProps } from './Button';
import Spinner from './Spinner';

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
    <Button disabled={disabled} isSubmit {...props}>
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cartInput = [{ merchandiseId, quantity }];

  const disabled = props.disabled || !availableForSale;
  return (
    <form>
      <AddToCartButton {...props} disabled={disabled} />
    </form>
  );
};

export default AddToCart;
