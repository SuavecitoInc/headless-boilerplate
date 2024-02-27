import React from 'react';
import { fetchStorefront } from '@/utils/server';
import { PRODUCT_PAGE_QUERY } from '@/data/storefront';
import { Product as ProductType, ProductVariant } from '@/types/storefront';
import { Product as ProductTemplate } from '@/components/templates';
import { ProductProvider } from '@/contexts/Product';
import { notFound } from 'next/navigation';
import { flattenConnection } from '@/utils/helpers';

export const dynamic = 'force-dynamic';

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
    return { product };
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
  if (!data || !data.product) return notFound();
  const productVariants = flattenConnection(
    data.product.variants
  ) as ProductVariant[];
  const getInitialVariant = (): ProductVariant => {
    try {
      if (!searchParams.variant) return productVariants[0];
      const foundVariant = productVariants.find(
        (variant) => variant.id === searchParams.variant
      );
      if (foundVariant) return foundVariant;
      return productVariants[0];
    } catch (error) {
      return productVariants[0];
    }
  };
  return (
    <main>
      <ProductProvider
        initialVariant={getInitialVariant()}
        options={data.product.options}
        variants={productVariants}
      >
        <ProductTemplate data={data.product} variantId={searchParams.variant} />
      </ProductProvider>
    </main>
  );
}
