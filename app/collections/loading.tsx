/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Skeleton, TextSkeleton } from '@/components';
import { arrayOf } from '@/utils/helpers';

export default function Loading() {
  return (
    <div className="overflow-hidden">
      <TextSkeleton type="heading" length="medium" className="mb-2.5 md:mb-4" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-5 md:gap-y-6 md:gap-x-8 lg:gap-y-8 lg:gap-x-12">
        {arrayOf(8).map((_, i) => (
          <div key={i}>
            <Skeleton className="w-full aspect-product mb-2.5 md:mb-4" />
            <TextSkeleton
              type="text"
              length="medium"
              className="mb-2.5 md:mb-4 !w-24 md:!w-48"
            />
            <TextSkeleton
              type="text"
              length="short"
              className="mb-2.5 md:mb-4 !w-16 md:!w-24"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
