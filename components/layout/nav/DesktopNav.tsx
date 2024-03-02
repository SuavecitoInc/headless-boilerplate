'use client';

import React, { useState, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useClickAway } from 'react-use';
import clsx from 'clsx';
import { Button, IconChevron } from '@/components/ui';
import { CartIcon } from '@/components/cart';
import { SearchIcon } from '@/components/search';
import { Menu as MenuType, MenuItem } from '@/types/storefront';
import { getRelativeUrl, isActiveLink } from '@/utils/helpers';

type SubMenuLinkProps = {
  item: MenuItem;
  setShowSubMenu: (show: boolean) => void;
};
const SubMenuLink: React.FC<SubMenuLinkProps> = ({ item, setShowSubMenu }) => {
  const router = useRouter();
  const relUrl = getRelativeUrl(item.url);
  const handleClick = () => {
    router.prefetch(relUrl);
    setShowSubMenu(false);
    router.push(relUrl);
  };
  return (
    <Button className="text-left" isUnstyled onClick={handleClick}>
      <span>{item.title}</span>
    </Button>
  );
};

type SubMenuProps = {
  title: string;
  items: MenuItem[];
  showSubMenu: boolean;
  setShowSubMenu: (show: boolean) => void;
};
const SubMenu: React.FC<SubMenuProps> = ({
  title,
  items,
  showSubMenu,
  setShowSubMenu,
}) => {
  const ref = useRef(null);
  const pathname = usePathname();
  const isActive = items.some((item) =>
    isActiveLink(pathname, getRelativeUrl(item.url))
  );
  useClickAway(ref, () => setShowSubMenu(false));
  return (
    <div className="font-bold" ref={ref}>
      <Button
        className="flex items-center"
        isUnstyled
        onClick={() => setShowSubMenu(!showSubMenu)}
      >
        <span className={clsx(isActive && 'underline')}>{title}</span>
        <span className="ml-1.5">
          {showSubMenu ? (
            <IconChevron size="20" direction="up" />
          ) : (
            <IconChevron size="20" />
          )}
        </span>
      </Button>
      {showSubMenu && (
        <div className="absolute z-40 flex flex-col gap-1 bg-white px-4 py-3 shadow-md">
          {items.map((item: MenuItem) => (
            <SubMenuLink
              key={item.id}
              item={item}
              setShowSubMenu={setShowSubMenu}
            />
          ))}
        </div>
      )}
    </div>
  );
};

type MenuLinkProps = {
  item: MenuItem;
  showSubMenu: boolean;
  setShowSubMenu: (show: boolean) => void;
};
const MenuLink: React.FC<MenuLinkProps> = ({
  item,
  showSubMenu,
  setShowSubMenu,
}) => {
  const relUrl = getRelativeUrl(item.url);
  const isActive = isActiveLink(usePathname(), relUrl);
  const hasSubMenu = item.items && item.items.length > 0;
  return (
    <div>
      {!hasSubMenu ? (
        <Link
          className={clsx(isActive && 'underline', 'font-bold')}
          href={relUrl}
        >
          <span>{item.title}</span>
        </Link>
      ) : (
        <SubMenu
          title={item.title}
          items={item.items}
          showSubMenu={showSubMenu}
          setShowSubMenu={setShowSubMenu}
        />
      )}
    </div>
  );
};

type DesktopMenuProps = {
  items: MenuItem[];
  showSubMenu: boolean;
  setShowSubMenu: (show: boolean) => void;
};
const DesktopMenu: React.FC<DesktopMenuProps> = ({
  items,
  showSubMenu,
  setShowSubMenu,
}) => (
  <div className="flex flex-1 flex-row justify-center gap-7">
    {items.map((item: MenuItem) => (
      <MenuLink
        key={item.id}
        item={item}
        showSubMenu={showSubMenu}
        setShowSubMenu={setShowSubMenu}
      />
    ))}
  </div>
);

type DesktopNavProps = {
  cartCount: number;
  menu: MenuType;
  logo: StaticImageData;
};

const DesktopNav: React.FC<DesktopNavProps> = ({ menu, cartCount, logo }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  return (
    <div className="flex items-center text-primary justify-between">
      <Link href="/">
        <div className="aspect-video relative max-h-[70px]">
          <Image
            src={logo}
            alt="logo"
            priority
            sizes="(min-width: 768px) 50vw, 90vw"
            placeholder="blur"
          />
        </div>
      </Link>
      <div className="flex flex-grow justify-center">
        <DesktopMenu
          items={menu.items}
          showSubMenu={showSubMenu}
          setShowSubMenu={setShowSubMenu}
        />
      </div>
      <div className="flex gap-2.5">
        <SearchIcon />
        <CartIcon count={cartCount} />
      </div>
    </div>
  );
};

export default DesktopNav;
