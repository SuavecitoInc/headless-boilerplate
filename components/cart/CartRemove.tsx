import React from 'react';
import { useFormStatus } from 'react-dom';
import clsx from 'clsx';
import { Button } from '@/components/ui';
import { removeCart } from '@/app/cart/actions';
import type { CartLine } from '@/types/storefront';

const RemoveButton: React.FC = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      isSubmit
      className={clsx(
        'text-primary underline hover:opacity-hover',
        pending && 'cursor-not-allowed'
      )}
      isUnstyled
    >
      <span>Remove</span>
    </Button>
  );
};

type CartRemoveProps = {
  lineItem: CartLine;
};
const CartRemove: React.FC<CartRemoveProps> = ({ lineItem }) => (
  <form
    action={async () => {
      await removeCart([lineItem.id]);
    }}
  >
    <RemoveButton />
  </form>
);

export default CartRemove;
