/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Skeleton, TextSkeleton, Divider } from '@/components';
import { arrayOf } from '@/utils/helpers';

export default function Loading() {
  return (
    <div className="overflow-hidden">
      <TextSkeleton type="heading" length="medium" className="mb-2.5 md:mb-4" />
      <Divider className="my-[15px]" />
      <div className="flex flex-col gap-3 md:gap-4">
        {arrayOf(3).map((_, i) => (
          <div key={i}>
            <div className="flex gap-2 md:gap-8">
              <div className="w-full max-w-[35%] md:max-w-[200px]">
                <Skeleton className="aspect-product w-full" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="mb-[5px] md:mb-[10px]">
                  <TextSkeleton type="text" length="medium" />
                </div>

                <div className="flex justify-between">
                  <TextSkeleton
                    type="text"
                    length="short"
                    className="mb-2.5 md:mb-4"
                  />
                  <div className="flex flex-col lg:gap-6 items-end gap-2 justify-end lg:items-baseline lg:flex-row">
                    <TextSkeleton type="text" length="shorter" />
                    <TextSkeleton type="text" length="short" />
                    <TextSkeleton type="text" length="shorter" />
                  </div>
                </div>
              </div>
            </div>
            <Divider className="mt-[20px]" />
          </div>
        ))}
      </div>
      <div className="mt-[20px] flex flex-col items-end">
        <TextSkeleton type="text" length="shorter" className="mb-[10px]" />
        <TextSkeleton type="text" length="short" className="mb-[12px]" />
        <TextSkeleton type="text" length="shorter" />
      </div>
    </div>
  );
}
