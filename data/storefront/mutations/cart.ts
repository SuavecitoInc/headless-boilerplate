import { CART_FRAGMENT } from '../fragments';

export const CART_CREATE_QUERY = `#graphql
  ${CART_FRAGMENT}
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ...Cart
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_ADD_QUERY = `#graphql
  ${CART_FRAGMENT}
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...Cart
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_UPDATE_QUERY = `#graphql
  ${CART_FRAGMENT}
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...Cart
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_REMOVE_QUERY = `#graphql
  ${CART_FRAGMENT}
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...Cart
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_DISCOUNT_CODES_UPDATE_QUERY = `#graphql
  ${CART_FRAGMENT}
  mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]!) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
        ...Cart
      }
      userErrors {
        field
        message
      }
    }
  }
`;
