import React from 'react';
import Link from 'next/link';
import { IconEmptyCart } from '@/components/ui';
import { buttonClasses } from '@/components/ui/Button';

const CartEmpty: React.FC = () => (
  <div>
    <div className="flex flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-[500px]">
        <IconEmptyCart className="h-full w-full" />
      </div>
      <div className="-mt-5">
        <span className="text-center text-[20px] font-bold">
          Your cart is currently empty
        </span>
      </div>
      <div className="mt-[20px] flex items-center">
        <Link className={buttonClasses} href="/collections">
          <span className="uppercase">Continue Shopping</span>
        </Link>
      </div>
    </div>
  </div>
);

export default CartEmpty;
