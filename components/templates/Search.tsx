'use client';

import React, { useState } from 'react';
import { InstantSearchNext } from 'react-instantsearch-nextjs';
import { Configure, Hits, Pagination } from 'react-instantsearch';
import { AutoHit, SearchFilters } from '@/components/search';
import { Button, Heading, IconFilters, Divider } from '@/components/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { searchClient } from '@/utils/algolia';
import 'instantsearch.css/themes/algolia.css';
import { SEARCH_PAGE_SIZE as PAGE_SIZE } from '@/data/consts';

type Props = {
  query: string;
};

const Search: React.FC<Props> = ({ query }) => {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <InstantSearchNext
      searchClient={searchClient}
      indexName="shopify_products"
      future={{ preserveSharedStateOnUnmount: true }}
    >
      {/* <SearchBox /> */}
      <Configure query={query} />
      <div>
        <div className="flex justify-between">
          <Heading type="h1" className="mb-2 md:mb-4">
            Search
          </Heading>
          <div className="md:hidden block">
            <Button isUnstyled onClick={() => setShowFilters(!showFilters)}>
              <IconFilters size="25" />
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="flex flex-col gap-4"
            >
              <SearchFilters className="block md:hidden" />
            </motion.div>
          )}
        </AnimatePresence>
        <Configure hitsPerPage={PAGE_SIZE} />

        <div className="flex flex-col md:flex-row md:gap-8 mb-3 md:mb-4">
          {/* Filters */}

          <SearchFilters className="md:block hidden" />

          <Divider className="my-6" />
          <div className="flex flex-col justify-center">
            <Hits
              hitComponent={AutoHit}
              classNames={{
                root: '!m-0 w-full md:p-5 md:pt-0',
                list: '!m-0 !grid grid-cols-2 gap-x-3 gap-y-2 lg:gap-x-5 lg:gap-y-4 lg:grid-cols-4',
                item: '!w-full !m-0 !border-primary rounded-[4px]',
              }}
            />
            <div className="pt-7 pb-4 md:pt-4">
              <Pagination
                padding={2}
                classNames={{
                  link: 'text-blue-500',
                  selectedItem: 'text-white',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </InstantSearchNext>
  );
};

export default Search;
