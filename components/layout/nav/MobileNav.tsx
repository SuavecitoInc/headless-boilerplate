'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useClickAway } from 'react-use';
import { IconMenu, Button, IconChevron, IconClose } from '@/components/ui';
import { Menu as MenuType, MenuItem } from '@/types/storefront';
import { motion, AnimatePresence } from 'framer-motion';
import { getRelativeUrl, isActiveLink } from '@/utils/helpers';

type MenuLinkProps = {
  item: MenuItem;
  closeMenu: () => void;
};
const MenuLink: React.FC<MenuLinkProps> = ({ item, closeMenu }) => {
  const router = useRouter();
  const relUrl = getRelativeUrl(item.url);
  const isActive = isActiveLink(usePathname(), relUrl);
  const hasSubMenu = item.items && item.items.length > 0;
  const [showSubMenu, setShowSubMenu] = useState(false);
  const navigate = () => {
    closeMenu();
    router.push(relUrl);
  };
  const styles = 'flex justify-left border border-solid text-sm py-1.5';
  return !hasSubMenu ? (
    <Button isUnstyled onClick={navigate} className={styles}>
      <span>{item.title}</span>
    </Button>
  ) : (
    // Sub Menu
    <div className={styles}>
      <span>{item.title}</span>
      <IconChevron direction="right" />
    </div>
  );
};

type MobileMenuProps = {
  items: MenuItem[];
  showMenu: boolean;
  closeMenu: () => void;
};
const MobileMenu: React.FC<MobileMenuProps> = ({
  items,
  showMenu,
  closeMenu,
}) => {
  console.log();
  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <MenuLink key={item.id} item={item} closeMenu={closeMenu} />
      ))}
    </div>
  );
};

type MobileNavProps = {
  menu: MenuType;
  cartCount: number;
  logo: StaticImageData;
};
const MobileNav: React.FC<MobileNavProps> = ({ menu, cartCount, logo }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  return (
    <div ref={ref}>
      <div className="flex justify-between">
        <Link href="/">
          <div className="aspect-video relative max-h-[50px]">
            <Image
              src={logo}
              alt="logo"
              priority
              sizes="(min-width: 768px) 50vw, 90vw"
              placeholder="blur"
            />
          </div>
        </Link>
        <Button isUnstyled onClick={toggleMenu}>
          {showMenu ? <IconClose /> : <IconMenu />}
        </Button>
      </div>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            key="header-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: showMenu ? 'auto' : 0,
              opacity: showMenu ? 1 : 0,
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <MobileMenu
              items={menu.items}
              showMenu={showMenu}
              closeMenu={closeMenu}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
