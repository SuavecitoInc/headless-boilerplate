'use server';

import type {
  Collection as CollectionType,
  ProductConnection,
} from '@/types/storefront';
import { COLLECTION_QUERY } from '@/data/storefront';
import { fetchStorefront } from '@/utils/server';
import { PAGINATION_SIZE } from '@/data/consts';
import { flattenConnection } from '@/utils/helpers';

export const getMoreProducts = async (
  handle: string,
  cursor: string | null
) => {
  try {
    const { data } = await fetchStorefront({
      query: COLLECTION_QUERY,
      variables: { handle, pageBy: PAGINATION_SIZE, cursor },
    });
    const { collection }: { collection: CollectionType } = data;
    const { products }: { products: ProductConnection } = collection;
    console.log('products', products);

    if (!products) {
      return null;
    }
    return {
      products: flattenConnection(products),
      endCursor: products.pageInfo.endCursor,
      hasNextPage: products.pageInfo.hasNextPage,
    };
  } catch (error) {
    // captureError(error);
    return null;
  }
};
