import { MEDIA_FRAGMENT } from '../fragments';

export const PRODUCT_PAGE_QUERY = `#graphql
  ${MEDIA_FRAGMENT}
  query getProductPageData($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      productType
      availableForSale
      tags
      featuredImage {
        url
        altText
      }
      options {
        id
        name
        values
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      media(first: 100) {
        nodes {
          ...Media
        }
      }
      variants(first: 100) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

export const PRODUCT_SEO_QUERY = `#graphql
  query getProductSEO($handle: String!) {
    product(handle: $handle) {
      title
      description
      featuredImage {
        url
      }
    }
  }`;
