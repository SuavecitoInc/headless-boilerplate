import React from 'react';
import { notFound } from 'next/navigation';
import { Collection as CollectionTemplate } from '@/components';
import { COLLECTION_QUERY } from '@/data/storefront';
import { PAGINATION_SIZE } from '@/data/consts';
import type { Collection as CollectionType } from '@/types/storefront';
import { fetchStorefront } from '@/utils/server';

export const dynamic = 'force-dynamic';

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
      <CollectionTemplate data={data} />
    </main>
  );
}
