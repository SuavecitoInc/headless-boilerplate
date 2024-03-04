import React from 'react';
import { Product as ProductType } from '@/types/storefront';
import {
  ProductMedia,
  ProductOptions,
  ProductForm,
  ProductJsonLd,
} from '@/components/product';

type ProductProps = {
  data: ProductType;
};

const Product: React.FC<ProductProps> = ({ data }) => {
  const { title, media, options, descriptionHtml } = data;
  return (
    <div className="flex flex-col md:flex-row md:gap-x-[50px] gap-y-3">
      <ProductJsonLd product={data} />
      <ProductMedia className="w-full md:w-1/2" media={media} />
      <div className="w-full md:w-1/2">
        <h1 className="mb-2.5 text-[26px] font-bold lg:text-[30px] lg:leading-normal">
          {title}
        </h1>
        <ProductOptions options={options} />
        <ProductForm />
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: descriptionHtml,
          }}
          className="product-description mt-[10px] lg:mt-[15px]"
        />
      </div>
    </div>
  );
};

export default Product;
