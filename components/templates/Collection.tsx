'use client';

import React, { useState } from 'react';
import { Spinner } from '@/components/ui';
import InfiniteScroll from 'react-infinite-scroll-component';
import { flattenConnection } from '@/utils/helpers';
import type { Collection as CollectionType } from '@/types/storefront';
import { getMoreProducts } from '@/app/collections/actions';
import { ProductCard } from '@/components/collection';

type CollectionProps = {
  data: CollectionType;
};

const Collection: React.FC<CollectionProps> = ({ data }) => {
  const { handle } = data;
  const [collection, setCollection] = useState({
    products: flattenConnection(data.products),
    endCursor: data.products.pageInfo.endCursor,
    hasNextPage: data.products.pageInfo.hasNextPage,
  });

  const loadMore = async () => {
    const newProducts = await getMoreProducts(handle, collection.endCursor!);
    if (!newProducts) return;
    const { products, hasNextPage, endCursor } = newProducts;
    setCollection({
      products: collection.products.concat(products),
      endCursor,
      hasNextPage,
    });
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={collection.products.length}
        next={loadMore}
        hasMore={collection.hasNextPage}
        loader={<Spinner />}
        style={{ overflow: 'hidden' }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {collection.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Collection;
