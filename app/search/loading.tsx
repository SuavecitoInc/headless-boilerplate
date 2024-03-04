/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Skeleton, TextSkeleton, Divider } from '@/components';
import { arrayOf } from '@/utils/helpers';

export default function Loading() {
  return (
    <div className="overflow-hidden">
      <TextSkeleton type="heading" length="medium" className="mb-2.5 md:mb-4" />
      <Skeleton className="h-6 w-full mb-4" />
      <Divider className="my-6 md:hidden" />
      <div className="flex flex-col md:flex-row md:gap-8 mb-3 md:mb-4">
        <div className="md:w-[35%] lg:w-[22%] md:block hidden">
          <TextSkeleton type="text" length="short" className="mb-[12px]" />
          <div className="flex flex-col gap-[6px] mb-4">
            {arrayOf(4).map((_, i) => (
              <TextSkeleton key={i} type="text" length="shorter" />
            ))}
          </div>
          <TextSkeleton type="text" length="short" className="mb-[12px]" />
          <div className="flex flex-col gap-[6px]">
            {arrayOf(4).map((_, i) => (
              <TextSkeleton key={i} type="text" length="shorter" />
            ))}
          </div>
        </div>
        <div className="p-5 w-full">
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 lg:gap-x-5 lg:gap-y-4 lg:grid-cols-4">
            {arrayOf(6).map((_, i) => (
              <div key={i} className="w-full">
                <Skeleton className="aspect-product w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
