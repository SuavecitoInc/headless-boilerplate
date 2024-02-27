'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { fetchStorefront } from '@/utils/server';
import type {
  Cart as CartType,
  CartLineInput,
  CartLineUpdateInput,
  CartLine,
} from '@/types/storefront';
import {
  CART_GET_QUERY,
  CART_CREATE_QUERY,
  CART_LINES_ADD_QUERY,
  CART_LINES_UPDATE_QUERY,
  CART_LINES_REMOVE_QUERY,
  CART_GET_COUNT_QUERY,
} from '@/data/storefront';

const CART_COOKIE_NAME = 'cartId';

export const createCookie = (id: string) => {
  try {
    const cookieStore = cookies();
    cookieStore.set(CART_COOKIE_NAME, id);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error on createCookie', e);
    // captureError(e);
  }
};

export const getCookie = () => {
  try {
    const cookieStore = cookies();
    const cartCookie = cookieStore.get(CART_COOKIE_NAME);
    if (!cartCookie) return undefined;
    const { value } = cartCookie;
    return value;
  } catch (e) {
    // captureError(e);
    return undefined;
  }
};

export const createCart = async (): Promise<CartType | null> => {
  try {
    const { data } = await fetchStorefront({
      query: CART_CREATE_QUERY,
      variables: {
        input: {},
      },
    });
    const { cartCreate } = data;
    const { cart } = cartCreate;
    if (!cart) throw new Error('Cart not created');
    return cart;
  } catch (e) {
    // captureError(e);
    return null;
  }
};

export const initializeCartId = async () => {
  try {
    const cartId = getCookie();
    if (cartId) {
      return cartId;
    }
    const cart = await createCart();
    if (!cart) throw new Error('Cart not created');
    const { id } = cart;
    createCookie(id);
    return id;
  } catch (e) {
    // captureError(e);
    return null;
  }
};

export const getCart = async () => {
  try {
    const id = getCookie();
    if (!id) {
      throw new Error('Cart not found');
    }
    const { data } = await fetchStorefront({
      query: CART_GET_QUERY,
      variables: { id },
      tag: 'cart',
    });
    const { cart } = data;
    return cart;
  } catch (e) {
    // captureError(e);
    return null;
  }
};

export const getCurrentCartQuantity = async (id: string): Promise<number> => {
  try {
    const { data } = await fetchStorefront({
      query: CART_GET_COUNT_QUERY,
      variables: { id },
      tag: 'cart',
    });
    const { cart } = data;
    const { totalQuantity } = cart;
    return totalQuantity;
  } catch (error) {
    return 0;
  }
};

export const getCartCount = async () => {
  try {
    const cartId = getCookie();
    if (!cartId) {
      return 0;
    }
    const count = await getCurrentCartQuantity(cartId);
    return count;
  } catch (e) {
    // captureError(e);
    return 0;
  }
};
