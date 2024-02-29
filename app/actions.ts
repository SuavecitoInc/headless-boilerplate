'use server';

import { fetchStorefront } from '@/utils/server';
import { Menu as MenuType } from '@/types/storefront';
import { MENU_QUERY } from '@/data/storefront';

export const getMenu = async (): Promise<MenuType | null> => {
  try {
    const menuName = 'main-menu';
    const { data } = await fetchStorefront({
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
