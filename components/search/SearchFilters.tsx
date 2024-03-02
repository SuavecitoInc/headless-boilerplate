'use client';

import React from 'react';
import clsx from 'clsx';
import {
  ClearRefinements,
  RefinementList,
  HitsPerPage,
} from 'react-instantsearch';
import { SEARCH_PAGE_SIZE as PAGE_SIZE } from '@/data/consts';

type SearchFiltersProps = { className?: string };

const pageItems = [
  {
    value: PAGE_SIZE,
    label: `${PAGE_SIZE} per page`,
    default: true,
  },
  {
    value: PAGE_SIZE * 2,
    label: `${PAGE_SIZE * 2} per page`,
  },
  {
    value: PAGE_SIZE * 3,
    label: `${PAGE_SIZE * 3} per page`,
  },
];

const SearchFilters: React.FC<SearchFiltersProps> = ({ className }) => (
  <div className={clsx('md:w-[35%] lg:w-[22%]', className)}>
    <div className="flex mb-2 md:mb-4">
      <div className="flex items-center justify-center mr-2">
        <span className="text-base md:text-md text-tertiary font-bold">
          Filters
        </span>
      </div>
      <ClearRefinements
        title="Clear all filters"
        classNames={{
          root: 'flex',
          button: '!bg-transparent !text-primary !font-bold',
        }}
      />
    </div>

    <div className="flex flex-col gap-4">
      <div>
        <span className="text-base md:text-md text-tertiary font-bold block">
          Categories
        </span>
        <RefinementList
          attribute="product_type"
          showMore
          classNames={{
            labelText: 'mx-1',
            checkbox:
              'mr-[3px] !w-4 !h-4 !border-gray-300 !rounded !accent-primary',
            count: '!bg-secondary !text-white !rounded-[4px]',
            showMore: '!bg-primary !uppercase',
            list: 'flex flex-col gap-1',
            label: 'flex items-center gap-1',
          }}
        />
      </div>
      <div>
        <span className="text-base md:text-md text-tertiary font-bold block">
          Tags
        </span>
        <RefinementList
          attribute="tags"
          showMore
          classNames={{
            labelText: 'mx-1',
            checkbox:
              'mr-[3px] !w-4 !h-4 !border-gray-300 !rounded !accent-primary',
            count: '!bg-secondary !text-white !rounded-[4px]',
            showMore: '!bg-primary !uppercase',
            list: 'flex flex-col gap-1',
            label: 'flex items-center gap-1',
          }}
        />
      </div>
      <div>
        <span className="text-base md:text-md text-tertiary font-bold block">
          Vendors
        </span>
        <RefinementList
          attribute="vendor"
          showMore
          classNames={{
            labelText: 'mx-1',
            checkbox:
              'mr-[3px] !w-4 !h-4 !border-gray-300 !rounded !accent-primary text-white',
            count: '!bg-secondary !text-white !rounded-[4px]',
            showMore: '!bg-primary !uppercase',
            list: 'flex flex-col gap-1',
            label: 'flex items-center gap-1',
          }}
        />
      </div>
    </div>

    <div className="pt-4">
      <span className="text-base md:text-md text-tertiary font-bold">
        Page by
      </span>
      <HitsPerPage
        items={pageItems}
        classNames={{
          root: '',
          select: '!border-none !text-primary !font-bold',
        }}
      />
    </div>
  </div>
);

export default SearchFilters;
