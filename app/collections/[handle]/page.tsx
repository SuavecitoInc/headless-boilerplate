import React from 'react';
import { notFound } from 'next/navigation';
import { COLLECTION_QUERY } from '@/data/storefront/queries/collection';
import type { Collection as CollectionType } from '@/types/storefront';
import { fetchStorefront } from '@/utils/server';

export const dynamic = 'force-dynamic';

const PAGINATION_SIZE = 24;

type PageProps = {
  params: {
    handle: string;
  };
};

const getData = async (handle: string) => {
  try {
    const { data } = await fetchStorefront({
      query: COLLECTION_QUERY,
      variables: { handle, pageBy: PAGINATION_SIZE, cursor: null },
    });
    const { collection }: { collection: CollectionType } = data;

    if (!collection) {
      return null;
    }
    return collection;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default async function Page({ params }: PageProps) {
  const { handle } = params;
  const data = await getData(handle);
  if (!data) return notFound();
  return (
    <main>
      <h1>Collections</h1>
      <h2>{handle}</h2>
    </main>
  );
}
