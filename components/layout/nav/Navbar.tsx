import React from 'react';
import { Menu as MenuType } from '@/types/storefront';
import logo from '@/public/logo.png';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

type NavbarProps = {
  cartCount: number;
  menu: MenuType;
};

const Navbar: React.FC<NavbarProps> = ({ cartCount, menu }) => (
  <nav className="mx-auto max-w-screen-2xl md:px-9 lg:px-12">
    <div className="md:hidden block">
      <MobileNav menu={menu} cartCount={cartCount} logo={logo} />
    </div>
    <div className="hidden md:block">
      <DesktopNav menu={menu} cartCount={cartCount} logo={logo} />
    </div>
  </nav>
);

export default Navbar;
