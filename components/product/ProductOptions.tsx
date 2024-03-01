'use client';

import React from 'react';
import clsx from 'clsx';
import type { ProductOption } from '@/types/storefront';
import { useProduct } from '@/contexts/Product';
import { variantOptionsToObject } from '@/utils/helpers';
import { Button } from '@/components/ui';

type OptionProps = {
  name: string;
  value: string;
  currentSelectedOptions: {
    [key: string]: string;
  };
};

const Option: React.FC<OptionProps> = ({
  name,
  value,
  currentSelectedOptions,
}) => {
  const { handleOptionChange, availableOptions } = useProduct();
  const checked = currentSelectedOptions[name] === value;
  const disabled =
    availableOptions[name] !== null && !availableOptions[name]!.includes(value);
  return (
    <Button
      isUnstyled
      onClick={() => handleOptionChange(name, value)}
      disabled={disabled}
      className={clsx(
        'rounded-[4px] border-2 px-[15px] py-[7.5px] text-sm md:text-base',
        checked ? 'border-primary bg-suaveGrey text-primary' : 'border-body',
        disabled && 'opacity-20'
      )}
    >
      <span>{value}</span>
    </Button>
  );
};

type ProductOptionsProps = {
  options: ProductOption[];
};
const ProductOptions: React.FC<ProductOptionsProps> = ({ options }) => {
  const { selectedVariant } = useProduct();
  const productOptions = options.filter(
    (option) =>
      option.values.length >= 1 && !option.values.includes('Default Title')
  );

  const currentSelectedOptions = variantOptionsToObject(
    selectedVariant?.selectedOptions ?? []
  );
  return (
    <div>
      {productOptions.map((option) => (
        <div className="mb-5" key={option.id}>
          <h3 className="mb-2.5 text-[18px] font-bold uppercase text-tertiary lg:text-[20px] lg:leading-normal">
            {option.name}
          </h3>
          <ul className="flex flex-wrap gap-[10px]">
            {option.values.map((value) => (
              <li key={value}>
                <Option
                  name={option.name}
                  value={value}
                  currentSelectedOptions={currentSelectedOptions}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProductOptions;
