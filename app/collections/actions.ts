'use server';

import type {
  Collection as CollectionType,
  ProductConnection,
} from '@/types/storefront';
import { COLLECTION_QUERY } from '@/data/storefront';
import { PAGINATION_SIZE } from '@/data/consts';
import { flattenConnection } from '@/utils/helpers';
import { fetchStorefront } from '@/utils/server';

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
    const { pageInfo } = products;
    const { endCursor, hasNextPage } = pageInfo;

    if (!products) {
      return null;
    }
    return {
      products: flattenConnection(products),
      endCursor,
      hasNextPage,
    };
  } catch (error) {
    // captureError(error);
    return null;
  }
};
