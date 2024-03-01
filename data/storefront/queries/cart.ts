import { CART_FRAGMENT } from '../fragments';

export const CART_GET_QUERY = `#graphql
  ${CART_FRAGMENT}
  query getCart($id: ID!) {
    cart(id: $id) {
      ...Cart
    }
  }
`;

export const CART_GET_COUNT_QUERY = `#graphql
  query getCartQuantity($id: ID!) {
    cart(id: $id) {
      id
      totalQuantity
    }
  }
`;
