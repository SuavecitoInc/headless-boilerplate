import React from 'react';
import Link from 'next/link';
import { IconCart } from '@/components/ui';

type CartIconProps = {
  count: number;
};

const CartIcon: React.FC<CartIconProps> = ({ count }) => (
  <Link href="/cart" className="relative hover:opacity-hover">
    {count > 0 && (
      <div className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
        {count}
      </div>
    )}
    <IconCart className="h-[25px] w-[25px]" />
  </Link>
);

export default CartIcon;
