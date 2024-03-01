import type { ProductVariant } from '@/types/storefront';

export type ProductContextType = {
  availableOptions: { [key: string]: string[] | null };
  selectedVariant: ProductVariant;
  optionNames: string[];
  handleOptionChange: (name: string, value: string) => void;
};
