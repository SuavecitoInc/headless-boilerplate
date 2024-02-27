export const COLLECTION_QUERY = `#graphql
  query getCollectionByHandle($handle: String!, $pageBy: Int!, $cursor: String) {
    collection(handle: $handle) {
      id
      title
      handle
      products(first: $pageBy, after: $cursor) {
        nodes {
          id
          title
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
