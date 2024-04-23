'use server';

import { fetchStorefront } from '@/utils/server';
import { headerHandle } from '@/data/shop';
import { Menu as MenuType } from '@/types/storefront';
import { MENU_QUERY } from '@/data/storefront';

export const getMenu = async (): Promise<MenuType | null> => {
  try {
    const menuName = headerHandle ?? 'main-menu';
    const { data } = await fetchStorefront<{
      menu: MenuType;
    }>({
      query: MENU_QUERY,
      variables: { handle: menuName },
    });
    const { menu } = data;
    return menu;
  } catch (error) {
    // captureError(error);
    return null;
  }
};
