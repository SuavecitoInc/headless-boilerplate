import type { MoneyV2 } from '@/types/storefront';

// global utils
interface NodeItem {
  node: any;
}

interface ConItem {
  edges?: NodeItem[];
  nodes?: any[];
}

export const flattenConnection = (connectionArray: ConItem) => {
  if (
    !Array.isArray(connectionArray.edges) &&
    !Array.isArray(connectionArray.nodes)
  ) {
    return [];
  }
  if (connectionArray.edges) {
    return connectionArray.edges.map((el) => ({ ...el.node }));
  }
  if (connectionArray.nodes) {
    return connectionArray.nodes.map((el) => el);
  }
  return [];
};

// determines whether a product is discounted for on sale
export const isDiscounted = (price: MoneyV2, compareAtPrice: MoneyV2) => {
  if (Number(compareAtPrice?.amount) > Number(price?.amount)) {
    return true;
  }
  return false;
};

/**
 * Takes in variant selected options and returns an object
 * @param variantOptions
 * @returns `{ option1: value, option2: value, option3: value }
 */
export const variantOptionsToObject = (
  variantOptions: { name: string; value: string }[]
) => {
  const currentSelectedOptions: { [key: string]: string } = {};
  variantOptions.forEach((option: { name: string; value: string }) => {
    currentSelectedOptions[option.name] = option.value;
  });
  return currentSelectedOptions;
};

// Utitlity functions for navigation
export const getRelativeUrl = (url: string) => {
  const urlObj = new URL(url);
  if (url.includes('#')) {
    const { hash } = urlObj;
    return `/${hash}`;
  }
  return urlObj.pathname;
};

export const isActiveLink = (pathname: string, relativeUrl: string) =>
  pathname === relativeUrl;
