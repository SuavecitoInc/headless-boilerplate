import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { title as siteTitle } from '@/data/shop';
import { Collection as CollectionTemplate } from '@/components';
import { COLLECTION_QUERY, COLLECTION_SEO_QUERY } from '@/data/storefront';
import { PAGINATION_SIZE } from '@/data/consts';
import type { Collection as CollectionType } from '@/types/storefront';
import { fetchStorefront } from '@/utils/server';

export const dynamic = 'force-dynamic';

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  try {
    const { handle } = params;
    const { data } = await fetchStorefront<{
      collection: CollectionType;
    }>({
      query: COLLECTION_SEO_QUERY,
      variables: { handle },
    });
    const { collection } = data;
    if (!collection) {
      return {};
    }
    const { title, description } = collection;
    return {
      title: `${title} | ${siteTitle}`,
      description,
      // openGraph: {
      //   title: `${title} | ${siteTitle}`,
      //   description,
      //   images: collection.image ? [{ url: collection.image.url }] : [],
      // },
    };
  } catch (error) {
    return {};
  }
};

const getData = async (handle: string) => {
  try {
    const { data } = await fetchStorefront<{
      collection: CollectionType;
    }>({
      query: COLLECTION_QUERY,
      variables: { handle, pageBy: PAGINATION_SIZE, cursor: null },
    });
    const { collection } = data;

    if (!collection) {
      return null;
    }
    return collection;
  } catch (error) {
    return null;
  }
};

type PageProps = {
  params: {
    handle: string;
  };
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
