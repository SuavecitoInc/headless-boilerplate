'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  IconMenu,
  Button,
  IconChevron,
  IconClose,
  IconSearch,
} from '@/components/ui';
import { CartIcon } from '@/components/cart';
import { Menu as MenuType, MenuItem } from '@/types/storefront';
import { motion, AnimatePresence } from 'framer-motion';
import { getRelativeUrl, isActiveLink } from '@/utils/helpers';

type SubMenuLinkProps = {
  item: MenuItem;
  closeSubMenu: () => void;
};
const SubMenuLink: React.FC<SubMenuLinkProps> = ({ item, closeSubMenu }) => {
  const handleClick = () => {
    closeSubMenu();
  };
  return (
    <div className="flex flex-col">
      <Button
        isUnstyled
        onClick={handleClick}
        className="flex justify-left border border-solid text-base items-center"
      >
        <div className="border-r p-2.5">
          <IconChevron direction="left" />
        </div>
        <span className="ml-3">{item.title}</span>
      </Button>
      {item.items && (
        <>
          {item.items.map((subItem) => {
            const relUrl = getRelativeUrl(subItem.url);
            return (
              <Link
                className="flex justify-left border border-solid text-base py-2 pl-3.5"
                href={relUrl}
              >
                <span>{subItem.title}</span>
              </Link>
            );
          })}
        </>
      )}
    </div>
  );
};

type MenuLinkProps = {
  item: MenuItem;
  setActiveItem: (item: MenuItem) => void;
};
const MenuLink: React.FC<MenuLinkProps> = ({ item, setActiveItem }) => {
  const relUrl = getRelativeUrl(item.url);
  const isActive = isActiveLink(usePathname(), relUrl);
  const hasSubMenu = item.items && item.items.length > 0;
  const pushSubMenu = () => {
    setActiveItem(item);
  };
  const styles = clsx(
    'flex justify-left border border-solid text-base py-2 px-2.5',
    isActive && 'underline'
  );
  return !hasSubMenu ? (
    <Link className={styles} href={relUrl}>
      <span>{item.title}</span>
    </Link>
  ) : (
    // Sub Menu
    <Button isUnstyled className={styles} onClick={pushSubMenu}>
      <span>{item.title}</span>
      <IconChevron direction="right" />
    </Button>
  );
};

type MobileMenuProps = {
  items: MenuItem[];
  activeItem?: MenuItem | null;
  setActiveItem: (item: MenuItem | null) => void;
};
const MobileMenu: React.FC<MobileMenuProps> = ({
  items,
  activeItem,
  setActiveItem,
}) => {
  const closeSubMenu = () => setActiveItem(null);

  const menuVariants = {
    hidden: {
      x: '-100%',
      opacity: 0,
      transition: { duration: 0.45, ease: [0.29, 0.63, 0.44, 1] },
    },
    visible: {
      x: '0%',
      opacity: 1,
      transition: { duration: 0.45, ease: [0.29, 0.63, 0.44, 1] },
    },
  };

  const activeItemVariants = {
    hidden: {
      x: '100%',
      opacity: 0,
      transition: { duration: 0.45, ease: [0.29, 0.63, 0.44, 1] },
    },
    visible: {
      x: '0%',
      opacity: 1,
      transition: { duration: 0.45, ease: [0.29, 0.63, 0.44, 1] },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {activeItem ? (
        <motion.div
          key="activeItem"
          variants={activeItemVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <SubMenuLink item={activeItem} closeSubMenu={closeSubMenu} />
        </motion.div>
      ) : (
        <motion.div
          key="subMenu"
          variants={menuVariants}
          initial="visible" // Make sure it's visible initially
          animate="visible" // Stay visible when it's the only content
          exit="hidden" // Slide and fade out when exiting
        >
          <div className="flex flex-col">
            {items.map((item) => (
              <MenuLink
                key={item.id}
                item={item}
                setActiveItem={setActiveItem}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

type MobileNavProps = {
  menu: MenuType;
  cartCount: number;
  logo: StaticImageData;
};
const MobileNav: React.FC<MobileNavProps> = ({ menu, cartCount, logo }) => {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const toggleMenu = () => setShowMenu(!showMenu);

  // navigation event for closing the menu on route change
  useEffect(() => {
    if (showMenu) {
      setShowMenu(false);
    }
    if (activeItem) {
      setActiveItem(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div ref={ref}>
      <div className="flex justify-between px-2.5">
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
        <div className="flex items-center gap-3">
          <IconSearch />
          <CartIcon count={cartCount} />
          <Button isUnstyled onClick={toggleMenu}>
            {showMenu ? <IconClose /> : <IconMenu />}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="h-auto text-primary"
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
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
