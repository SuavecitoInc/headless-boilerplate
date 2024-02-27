import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { usePathname, useRouter } from 'next/navigation';
import { ProductVariant } from '@/types/storefront';
import { variantOptionsToObject } from '@/utils/helpers';
import { ProductContext } from './context';

type Props = {
  children: ReactNode | ReactNode[];
  initialVariant: ProductVariant;
  options: { name: string; values: string[] }[];
  variants: ProductVariant[];
};

export const ProductProvider: React.FC<Props> = ({
  children,
  initialVariant,
  options,
  variants,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariant>(initialVariant);

  const optionNames = useMemo(
    () => options.map((option) => option.name),
    [options]
  );

  const defaultAvailable = optionNames.reduce(
    (accumulator: { [key: string]: string[] }, value: string) => {
      const arr: string[] = [];
      return { ...accumulator, [value]: arr };
    },
    {}
  );
  // set initial
  const [availableOptions, setAvailableOptions] = useState<{
    [key: string]: string[];
  }>(() => defaultAvailable);

  // filter
  const filterOptions = useCallback(
    (name: string, value: string, masterValue: string) => {
      const defaultAvailableOptions: { [key: string]: string[] } = {};
      options?.forEach((option) => {
        if (option?.name) defaultAvailableOptions[option.name] = [];
      });
      const available: { [key: string]: string[] } = {
        ...defaultAvailableOptions,
      };
      available[name] = [];

      variants?.forEach((variant) => {
        if (!variant?.selectedOptions) return;
        const values = variant?.selectedOptions.filter(
          (option) => option?.value === value
        );

        if (values.length > 0) {
          values.forEach((option) => {
            if (!available[name].includes(option?.value)) {
              available[name].push(option?.value);
            }
          });
        }
      });

      variants?.forEach((variant) => {
        if (!variant?.selectedOptions) return;
        const values = variant?.selectedOptions.filter(
          (option) => option?.value === masterValue
        );

        if (values.length > 0) {
          variant?.selectedOptions.forEach((option) => {
            if (
              option?.name &&
              !available[option?.name].includes(option?.value)
            ) {
              available[option?.name].push(option?.value);
            }
          });
        }
      });
      // set option 1
      if (options) {
        const option1 = options[0];
        available[optionNames[0]] = option1?.values;
      }

      return available;
    },
    [variants, options, optionNames]
  );

  // last option filter
  const filterLastOption = useCallback(
    (
      currentSelectedOptions: {
        [key: string]: string;
      },
      available: {
        [key: string]: string[];
      }
    ) => {
      const firstOption = optionNames[0];
      const secondOption = optionNames[1];
      const thirdOption = optionNames[2];

      // eslint-disable-next-line no-param-reassign
      available[thirdOption] = [];

      const thirdValues: string[] = [];
      variants?.forEach((variant) => {
        if (!variant?.selectedOptions) return;
        const firstValues = variant?.selectedOptions.filter(
          (option) => option?.value === currentSelectedOptions[firstOption]
        );
        // eslint-disable-next-line arrow-body-style
        const secondValues = variant?.selectedOptions.filter((option) => {
          return option?.value === currentSelectedOptions[secondOption];
        });
        if (firstValues.length > 0 && secondValues.length > 0) {
          const thirdValue = variant?.selectedOptions.find(
            (option) => option?.name === thirdOption
          );
          if (thirdValue && !thirdValues.includes(thirdValue.value)) {
            thirdValues.push(thirdValue.value);
          }
        }
      });

      // eslint-disable-next-line no-param-reassign
      available[thirdOption] = thirdValues;

      return available;
    },
    [variants, optionNames]
  );

  // handler
  const handleOptionChange = useCallback(
    (name: string, value: string) => {
      // flatten options
      const currentSelectedOptions: { [key: string]: string } = {};
      selectedVariant.selectedOptions.forEach(
        (option: { name: string; value: string }) => {
          currentSelectedOptions[option.name] = option.value;
        }
      );

      currentSelectedOptions[name] = value;
      // filter
      let currentAvailable = filterOptions(
        name,
        value,
        currentSelectedOptions[optionNames[0]]
      );

      // update new selected options based on filtered
      optionNames.forEach((optionName) => {
        if (optionName !== optionNames[0]) {
          const optionValue = currentAvailable[optionName][0];
          currentSelectedOptions[optionName] = optionValue;
        }
      });
      // update last option based on first two
      if (optionNames.length > 2) {
        currentAvailable = filterLastOption(
          currentSelectedOptions,
          currentAvailable
        );
        // new
        // update last option selection based on new currently available
        const availableLastOption = currentAvailable[optionNames[2]];
        const currentLastOption = currentSelectedOptions[optionNames[2]];
        if (!availableLastOption.includes(currentLastOption))
          // eslint-disable-next-line prefer-destructuring
          currentSelectedOptions[optionNames[2]] =
            currentAvailable[optionNames[2]][0];
      }
      // find variant with selected options
      const foundVariant = variants.find((variant) => {
        const variantOptions = variantOptionsToObject(variant.selectedOptions);
        return (
          JSON.stringify(variantOptions) ===
          JSON.stringify(currentSelectedOptions)
        );
      });

      if (foundVariant) {
        setSelectedVariant(foundVariant);
        const params = new URLSearchParams();
        const id = foundVariant.id.replace('gid://shopify/ProductVariant/', '');

        params.set('variant', id);

        router.replace(`${pathname}?${params.toString()}`, {
          scroll: false,
        });

        setAvailableOptions(currentAvailable);
      }
    },
    [
      filterLastOption,
      filterOptions,
      optionNames,
      pathname,
      router,
      selectedVariant.selectedOptions,
      variants,
    ]
  );

  // initial available options
  useEffect(() => {
    // flatten options
    const currentSelectedOptions: { [key: string]: string } = {};
    initialVariant.selectedOptions.forEach(
      (option: { name: string; value: string }) => {
        currentSelectedOptions[option.name] = option.value;
      }
    );
    const firstValue = currentSelectedOptions[optionNames[0]];
    let available = filterOptions(optionNames[0], firstValue, firstValue);
    if (options.length > 2) {
      available = filterLastOption(currentSelectedOptions, available);
    }

    setAvailableOptions(available);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      availableOptions,
      selectedVariant,
      handleOptionChange,
      optionNames,
    }),
    [availableOptions, selectedVariant, handleOptionChange, optionNames]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductProvider;
