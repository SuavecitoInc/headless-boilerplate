import React from 'react';
import { getCartCount } from '@/app/cart/actions';
import { getMenu } from '@/app/actions';
import Navbar from './Navbar';

const Header: React.FC = async () => {
  const cartCount = await getCartCount();
  const menu = await getMenu();
  if (!menu) return null;
  return (
    <header className="border-b border-b-body">
      <Navbar cartCount={cartCount} menu={menu} />
    </header>
  );
};

export default Header;
