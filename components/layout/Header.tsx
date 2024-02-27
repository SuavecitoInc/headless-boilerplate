import React from 'react';
import { getCartCount } from '@/app/cart/actions';
import { CartIcon } from '@/components/cart';

const Header: React.FC = async () => {
  const cartCount = await getCartCount();
  return (
    <header>
      <div className="flex">
        <span>Header</span>
        <CartIcon count={cartCount} />
      </div>
    </header>
  );
};

export default Header;
