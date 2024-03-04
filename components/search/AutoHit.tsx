'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import Image from 'next/image';
import { ProductHit } from '@/types/algolia';
import { useAutocomplete } from '@/contexts/Autocomplete';
import { formatMoney } from '@/utils/helpers';

type Props = {
  hit: ProductHit;
};

const AutoHit: React.FC<Props> = ({ hit }) => {
  const variantId = hit.objectID;
  const { setShowSearch } = useAutocomplete();
  const router = useRouter();
  const link = `/products/${hit.handle}?variant=${variantId}`;

  const handleClick = () => {
    setShowSearch(false);
    router.push(link);
  };

  return (
    <Button isUnstyled className="w-full" onClick={handleClick}>
      <div className="flex flex-col p-1">
        <div className="flex">
          {hit.image && (
            <div className="relative mb-2 aspect-product w-full">
              <Image
                src={hit.image}
                alt={hit.title ?? 'Product Image'}
                fill
                sizes="(max-width: 768px) 300px, 40vw"
                className="h-auto w-auto object-contain"
              />
            </div>
          )}
        </div>
        <div className="aa-ItemTitle md:text-md mb-2 text-base font-bold leading-normal text-primary">
          <span>{hit.title}</span>
        </div>
        <div className="aa-ItemDescription text-base leading-tight mb-2">
          {hit.options && (
            <div>
              {Object.entries(hit.options).map(([key, value]) => (
                <div key={key} className="text-sm md:text-base">
                  <span className="capitalize">{key}: </span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <span className="text-base font-bold leading-normal">
            ${formatMoney(String(hit.price))}
          </span>
        </div>
      </div>
    </Button>
  );
};

export default AutoHit;
