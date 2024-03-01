import { createContext } from 'react';
import type { ProductVariant } from '@/types/storefront';
import type { ProductContextType } from './types';

const defaultContext: ProductContextType = {
  availableOptions: {},
  selectedVariant: {} as ProductVariant,
  optionNames: [],
  handleOptionChange: (_name, _value) => {},
};

export const ProductContext = createContext(defaultContext);
export default ProductContext;
