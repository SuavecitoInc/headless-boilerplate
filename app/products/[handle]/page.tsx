import React from 'react';
import type { Metadata } from 'next';
import { title as siteTitle } from '@/data/shop';
import { fetchStorefront } from '@/utils/server';
import { PRODUCT_PAGE_QUERY, PRODUCT_SEO_QUERY } from '@/data/storefront';
import { Product as ProductType, ProductVariant } from '@/types/storefront';
import { Product as ProductTemplate } from '@/components/templates';
import { ProductProvider } from '@/contexts/Product';
import { notFound } from 'next/navigation';
import { flattenConnection } from '@/utils/helpers';

export const dynamic = 'force-dynamic';

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  try {
    const { handle } = params;
    const { data } = await fetchStorefront({
      query: PRODUCT_SEO_QUERY,
      variables: { handle },
    });
    const { product }: { product: ProductType } = data;
    if (!product) {
      return {};
    }
    const { title, description } = product;
    return {
      title: `${title} | ${siteTitle}`,
      description,
      // openGraph: {
      //   title: `${title} | ${siteTitle!}`,
      //   description,
      //   images: product.featuredImage
      //     ? [{ url: product.featuredImage.url }]
      //     : [],
      // },
    };
  } catch (error) {
    return {};
  }
};

const getData = async (handle: string) => {
  try {
    const { data } = await fetchStorefront({
      query: PRODUCT_PAGE_QUERY,
      variables: { handle },
    });
    const { product }: { product: ProductType } = data;
    if (!product) {
      return null;
    }
    return product;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error', error);
    return null;
  }
};

type PageProps = {
  params: {
    handle: string;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function Page({ params, searchParams }: PageProps) {
  const { handle } = params;
  const data = await getData(handle);
  if (!data) return notFound();
  const productVariants = flattenConnection(data.variants) as ProductVariant[];
  let initialVariant = productVariants[0];
  const variantId = searchParams.variant;
  if (searchParams.variant) {
    const foundVariant = productVariants.find((v) => {
      const legacyId = v.id.replace('gid://shopify/ProductVariant/', '');
      return legacyId === variantId;
    });
    if (foundVariant) initialVariant = foundVariant;
  }

  return (
    <main>
      <ProductProvider
        initialVariant={initialVariant}
        options={data.options}
        variants={productVariants}
      >
        <ProductTemplate data={data} />
      </ProductProvider>
    </main>
  );
}
