export const MEDIA_FRAGMENT = `#graphql
  fragment Media on Media {
    __typename
    mediaContentType
    alt
    previewImage {
      url
    }
    ... on MediaImage {
      id
      alt
      image {
        url
        width
        height
        altText
      }
    }
    ... on Video {
      id
      sources {
        mimeType
        url
      }
    }
    ... on Model3d {
      id
      sources {
        mimeType
        url
      }
    }
    ... on ExternalVideo {
      id
      embedUrl
      host
    }
  }
`;

export const CART_FRAGMENT = `#graphql
  fragment Cart on Cart {
    id
    createdAt
    updatedAt
    checkoutUrl
    totalQuantity
    discountAllocations {
      discountedAmount {
        amount
        currencyCode
      }
      ... on CartDiscountAllocation {
        discountedAmount {
          amount
          currencyCode
        }
      }
    }
    lines(first: 250) {
      edges {
        node {
          id
          merchandise {
            ... on ProductVariant {
              id
              quantityAvailable
              selectedOptions {
                name
                value
              }
              image {
                altText
                height
                id
                url
                width
              }
              product {
                handle
                title
              }
            }
          }
          discountAllocations {
            discountedAmount {
              amount
              currencyCode
            }
            ... on CartDiscountAllocation {
              discountedAmount {
                amount
                currencyCode
              }
            }
          }
          cost {
            amountPerQuantity {
              amount
              currencyCode
            }
            compareAtAmountPerQuantity {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
          quantity
          attributes {
            key
            value
          }
        }
      }
    }
    # The estimated total cost of all merchandise that the customer will pay at checkout.
    cost {
      totalAmount {
        amount
        currencyCode
      }
      # The estimated amount, before taxes and discounts, for the customer to pay at checkout.
      subtotalAmount {
        amount
        currencyCode
      }
      # The estimated tax amount for the customer to pay at checkout.
      totalTaxAmount {
        amount
        currencyCode
      }
      # The estimated duty amount for the customer to pay at checkout.
      totalDutyAmount {
        amount
        currencyCode
      }
    }
  }
`;

export const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    handle
    featuredImage {
      url
      altText
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
    variants(first: 1) {
      nodes {
        id
        price {
          amount
          currencyCode
        }
      }
    }
  }
`;
