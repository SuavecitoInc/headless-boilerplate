'use client';

import React from 'react';
import { Menu as MenuType } from '@/types/storefront';
import logo from '@/public/logo.png';
import { AutocompleteProvider, useAutocomplete } from '@/contexts/Autocomplete';
import { Autocomplete } from '@/components/search';
import DesktopNav from './nav/DesktopNav';
import MobileNav from './nav/MobileNav';

type Props = {
  cartCount: number;
  menu: MenuType;
};

const NavContent: React.FC<Props> = ({ cartCount, menu }) => {
  const { showSearch, instance } = useAutocomplete();
  return (
    <>
      {showSearch && (
        <div className="fixed z-50 w-screen bg-white py-9 border-b border-b-body">
          {instance}
        </div>
      )}
      <nav className="mx-auto max-w-screen-2xl md:px-9 lg:px-12">
        <div className="md:hidden block">
          <MobileNav menu={menu} cartCount={cartCount} logo={logo} />
        </div>
        <div className="hidden md:block">
          <DesktopNav menu={menu} cartCount={cartCount} logo={logo} />
        </div>
      </nav>
    </>
  );
};

const Navbar: React.FC<Props> = ({ cartCount, menu }) => (
  <AutocompleteProvider instance={<Autocomplete />}>
    <NavContent cartCount={cartCount} menu={menu} />
  </AutocompleteProvider>
);

export default Navbar;
