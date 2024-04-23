import { PRODUCT_FRAGMENT } from '../fragments';

export const COLLECTION_QUERY = `#graphql
 ${PRODUCT_FRAGMENT}
  query getCollectionByHandle($handle: String!, $pageBy: Int!, $cursor: String) {
    collection(handle: $handle) {
      id
      title
      handle
      products(first: $pageBy, after: $cursor) {
        nodes {
         ...Product
        }
        pageInfo { 
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const COLLECTION_SEO_QUERY = `#graphql
  query getCollectionSEO($handle: String!) {
    collection(handle: $handle) {
      title
      description
      image {
        url
      }
    }
  }`;
