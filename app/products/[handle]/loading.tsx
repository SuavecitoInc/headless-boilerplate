/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Skeleton, TextSkeleton } from '@/components';
import { arrayOf } from '@/utils/helpers';

export default function Loading() {
  return (
    <div className="overflow-hidden">
      <div className="flex flex-col md:flex-row md:gap-x-[50px] gap-y-3">
        <div className="w-full md:w-1/2">
          <Skeleton className="w-full aspect-product" />
          <div className="mt-5 grid grid-cols-4 gap-x-2 gap-y-3">
            {arrayOf(4).map((_, i) => (
              <Skeleton key={i} className="w-full aspect-product" />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <TextSkeleton type="heading" className="mb-2.5" />
          <div className="mb-2.5">
            <TextSkeleton length="medium" type="text" className="mb-2.5" />
          </div>
          <div className="flex flex-wrap gap-[10px] mb-5">
            {arrayOf(4).map((_, i) => (
              <Skeleton key={i} className="w-[100px] aspect-product h-[40px]" />
            ))}
          </div>
          <Skeleton className="w-[90px] h-[40px] mb-2" />
          <Skeleton className="w-[120px] h-[40px] mb-2" />
          <Skeleton className="w-[140px] h-[40px] mb-2" />
          <Skeleton className="w-full h-[90px] mb-2" />
        </div>
      </div>
    </div>
  );
}
